CREATE OR REPLACE FUNCTION public.cancel_booking (
  p_booking_id uuid,
  p_initiator  public.cancel_initiator,
  p_reason     text                    DEFAULT NULL::text
)
  RETURNS public.bookings
  LANGUAGE plpgsql
  SECURITY DEFINER
  SET search_path TO 'public'
  AS $function$
declare b public.bookings%rowtype; v_uid uuid := auth.uid(); v_refund bigint; pay public.payments%rowtype;
begin
  perform set_config('app.bypass_guard','on',true);
  select * into b from public.bookings where id = p_booking_id for update;
  if not found then raise exception 'BOOKING_NOT_FOUND'; end if;
  if p_initiator = 'customer' then
    if b.customer_id is distinct from v_uid then raise exception 'FORBIDDEN'; end if;
  elsif p_initiator in ('owner','weather') then
    if not public.has_org_role(b.org_id, 'owner','admin','manager') and not public.is_platform_admin() then raise exception 'FORBIDDEN'; end if;
  elsif p_initiator = 'platform' then
    if not public.is_platform_admin() then raise exception 'FORBIDDEN'; end if;
  end if;
  if b.status in ('cancelled','expired','completed','no_show') then raise exception 'BOOKING_NOT_CANCELLABLE'; end if;
  if b.status = 'checked_in' then raise exception 'BOOKING_IN_PROGRESS'; end if;
  if p_initiator = 'customer' and lower(b.period) < now() then raise exception 'BOOKING_STARTED'; end if;
  v_refund := public.compute_refund(b, p_initiator, now());
  update public.bookings set status = 'cancelled', cancelled_at = now(), cancelled_by = v_uid, cancel_initiator = p_initiator,
         cancel_reason = p_reason, refund_due_amount = v_refund where id = b.id returning * into b;
  if v_refund > 0 then
    select * into pay from public.payments where booking_id = b.id and status = 'captured' and provider = 'razorpay' order by captured_at desc limit 1;
    insert into public.refunds(booking_id, payment_id, org_id, amount, reason, status, requested_by)
    values (b.id, pay.id, b.org_id, v_refund,
            (case p_initiator when 'customer' then 'customer_cancel' when 'weather' then 'weather' else 'owner_cancel' end)::public.refund_reason,
            (case when pay.id is null then 'manual' else 'pending' end)::public.refund_status, v_uid);
  end if;
  return b;
end $function$;

GRANT EXECUTE ON FUNCTION "public"."cancel_booking"(uuid, public.cancel_initiator, text) TO PUBLIC, "authenticated", "postgres", "service_role";
