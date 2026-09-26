CREATE OR REPLACE FUNCTION public.request_pay_at_venue (
  p_booking_id uuid
)
  RETURNS jsonb
  LANGUAGE plpgsql
  SECURITY DEFINER
  SET search_path TO 'public'
  AS $function$
declare b public.bookings; o public.organizations; v_active int; v_noshows int;
begin
  perform set_config('app.bypass_guard','on',true);
  select * into b from public.bookings where id = p_booking_id and customer_id = auth.uid() for update;
  if not found then raise exception 'NOT_FOUND'; end if;
  if b.status <> 'held' then raise exception 'INVALID_STATE'; end if;
  select * into o from public.organizations where id = b.org_id;
  if not o.allow_pay_at_venue then raise exception 'PAV_NOT_ALLOWED'; end if;
  select count(*) into v_active from public.bookings
    where customer_id = auth.uid() and org_id = b.org_id and payment_mode = 'pay_at_venue'
      and status in ('held','confirmed') and amount_paid < total_amount;
  if v_active >= o.pav_max_active_per_customer then raise exception 'PAV_LIMIT'; end if;
  select count(*) into v_noshows from public.bookings
    where customer_id = auth.uid() and org_id = b.org_id and status = 'no_show' and amount_paid = 0;
  if v_noshows >= o.pav_block_after_no_shows then raise exception 'PAV_BLOCKED_NO_SHOWS'; end if;

  if o.pav_auto_confirm then
    update public.bookings set payment_mode='pay_at_venue', pav_state='approved',
           status='confirmed', confirmed_at = now(), hold_expires_at = null
      where id = b.id;                     -- history/broadcast via existing triggers
    return jsonb_build_object('state','confirmed','due', b.total_amount);
  else
    update public.bookings set payment_mode='pay_at_venue', pav_state='awaiting_approval',
           hold_expires_at = now() + make_interval(mins => o.pav_approval_sla_min)
      where id = b.id;                     -- still 'held': EXCLUDE keeps protecting the slot
    return jsonb_build_object('state','awaiting_approval','sla_min', o.pav_approval_sla_min);
  end if;
end $function$;

GRANT EXECUTE ON FUNCTION "public"."request_pay_at_venue"(uuid) TO PUBLIC, "anon", "authenticated", "postgres", "service_role";
