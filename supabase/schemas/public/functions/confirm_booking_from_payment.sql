CREATE OR REPLACE FUNCTION public.confirm_booking_from_payment (
  p_payment_id uuid
)
  RETURNS jsonb
  LANGUAGE plpgsql
  SECURITY DEFINER
  SET search_path TO 'public'
  AS $function$
declare pay public.payments%rowtype; b public.bookings%rowtype; v_outcome text; v_fee bigint; v_secrets public.organization_secrets%rowtype;
begin
  perform set_config('app.bypass_guard', 'on', true);
  select * into pay from public.payments where id = p_payment_id for update;
  if pay.status <> 'captured' then return jsonb_build_object('outcome','payment_not_captured'); end if;
  select * into b from public.bookings where id = pay.booking_id for update;
  if not found then return jsonb_build_object('outcome','booking_missing'); end if;
  if exists (select 1 from public.ledger_entries where payment_id = pay.id and account = 'customer_payment') then
    return jsonb_build_object('outcome','already_processed');
  end if;
  if pay.amount <> b.advance_amount and pay.amount <> (b.total_amount - b.amount_paid) then
    insert into public.refunds(booking_id, payment_id, org_id, amount, reason, status) values (b.id, pay.id, b.org_id, pay.amount, 'amount_mismatch', 'pending');
    return jsonb_build_object('outcome','amount_mismatch_refunded');
  end if;
  if b.status in ('held','pending_payment') then
    v_outcome := 'confirmed';
  elsif b.status = 'expired' then
    begin
      update public.bookings set status = 'confirmed' where id = b.id;
      v_outcome := 'confirmed_late';
    exception when others then
      insert into public.refunds(booking_id, payment_id, org_id, amount, reason, status) values (b.id, pay.id, b.org_id, pay.amount, 'slot_taken', 'pending');
      return jsonb_build_object('outcome','slot_taken_refunded', 'detail', sqlerrm);
    end;
  elsif b.status in ('confirmed','checked_in') then
    if b.amount_paid >= b.total_amount then
      insert into public.refunds(booking_id, payment_id, org_id, amount, reason, status) values (b.id, pay.id, b.org_id, pay.amount, 'duplicate_payment', 'pending');
      return jsonb_build_object('outcome','duplicate_refunded');
    end if;
    v_outcome := 'balance_paid';
  elsif b.status = 'cancelled' then
    insert into public.refunds(booking_id, payment_id, org_id, amount, reason, status) values (b.id, pay.id, b.org_id, pay.amount, 'other', 'pending');
    return jsonb_build_object('outcome','cancelled_refunded');
  else
    return jsonb_build_object('outcome','ignored', 'status', b.status);
  end if;
  update public.bookings set status = case when status in ('held','pending_payment','expired') then 'confirmed' else status end,
         confirmed_at = coalesce(confirmed_at, now()), amount_paid = amount_paid + pay.amount, hold_expires_at = null
   where id = b.id returning * into b;
  select * into v_secrets from public.organization_secrets where org_id = b.org_id;
  v_fee := coalesce(pay.razorpay_fee,0) + coalesce(pay.razorpay_tax,0);
  insert into public.ledger_entries(org_id, booking_id, payment_id, account, amount, memo) values
    (b.org_id, b.id, pay.id, 'customer_payment', pay.amount, 'razorpay ' || coalesce(pay.razorpay_payment_id,'')),
    (b.org_id, b.id, pay.id, 'gateway_fee', -v_fee, 'razorpay fee+tax'),
    (b.org_id, b.id, pay.id, 'platform_commission', -(case when v_secrets.payment_mode = 'route' then b.platform_commission else 0 end), 'commission'),
    (b.org_id, b.id, pay.id, 'owner_net', pay.amount - v_fee - (case when v_secrets.payment_mode = 'route' then b.platform_commission else 0 end), 'net to owner');
  insert into public.notifications(org_id, recipient_id, recipient_phone, recipient_email, channel, template, dedupe_key, payload, booking_id) values
    (b.org_id, b.customer_id, b.customer_phone, b.customer_email, 'email',    'booking_confirmed', 'booking_confirmed:'||b.id||':email',    jsonb_build_object('booking_id', b.id), b.id),
    (b.org_id, b.customer_id, b.customer_phone, b.customer_email, 'whatsapp', 'booking_confirmed', 'booking_confirmed:'||b.id||':whatsapp', jsonb_build_object('booking_id', b.id), b.id),
    (b.org_id, null, null, null, 'email', 'owner_new_booking', 'owner_new_booking:'||b.id||':email', jsonb_build_object('booking_id', b.id), b.id)
  on conflict (dedupe_key) do nothing;
  insert into public.calendar_event_links(connection_id, booking_id, ical_uid)
    select c.id, b.id, 'booking-' || b.id || '@groundbook' from public.calendar_connections c
    where c.org_id = b.org_id and (c.venue_id is null or c.venue_id = b.venue_id) and c.status <> 'deleted'
  on conflict (connection_id, ical_uid) do update set status = 'pending', next_attempt_at = now();
  return jsonb_build_object('outcome', v_outcome, 'booking_id', b.id);
end $function$;

GRANT EXECUTE ON FUNCTION "public"."confirm_booking_from_payment"(uuid) TO "postgres", "service_role";

REVOKE ALL ON FUNCTION "public"."confirm_booking_from_payment"(uuid) FROM PUBLIC;
