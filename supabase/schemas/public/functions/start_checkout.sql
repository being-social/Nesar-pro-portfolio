CREATE OR REPLACE FUNCTION public.start_checkout (
  p_booking_id uuid,
  p_order_id   text,
  p_terms_ip   inet DEFAULT NULL::inet
)
  RETURNS jsonb
  LANGUAGE plpgsql
  SECURITY DEFINER
  SET search_path TO 'public'
  AS $function$
declare
  b public.bookings%rowtype;
  v_prev text;
begin
  if auth.uid() is null then raise exception 'AUTH_REQUIRED'; end if;
  select * into b from public.bookings where id = p_booking_id and customer_id = auth.uid() for update;
  if not found then raise exception 'BOOKING_NOT_FOUND'; end if;
  if b.status not in ('held', 'pending_payment') then raise exception 'INVALID_STATE'; end if;

  -- Money already in flight: the caller must not be handed a fresh rail that
  -- could collect a second time.
  if exists (
    select 1 from public.payments
    where booking_id = b.id and status in ('authorized', 'captured')
  ) then
    raise exception 'ALREADY_PROCESSED';
  end if;

  v_prev := b.razorpay_order_id;

  perform public.extend_hold(p_booking_id);

  perform set_config('app.bypass_guard','on',true);
  update public.bookings set
    status = 'pending_payment',
    razorpay_order_id = p_order_id,
    terms_accepted_at = coalesce(terms_accepted_at, now()),
    terms_ip = coalesce(p_terms_ip, terms_ip)
  where id = p_booking_id
  returning * into b;

  -- One open `created` row per booking. Switching rails re-points it instead of
  -- leaving orphans for reconcile-payments to chase against a dead reference.
  update public.payments
  set razorpay_order_id = p_order_id, amount = b.advance_amount
  where booking_id = b.id and status = 'created';

  if not found then
    insert into public.payments (booking_id, org_id, provider, status, amount, purpose, razorpay_order_id)
    values (b.id, b.org_id, 'razorpay', 'created', b.advance_amount, 'advance', p_order_id);
  end if;

  return jsonb_build_object(
    'booking_id', b.id,
    'order_id', p_order_id,
    'amount', b.advance_amount,
    'key_id', null,
    -- The caller closes this at Razorpay: two live single-use QRs for one
    -- booking means two captures and one of them stranded.
    'previous_reference', case when v_prev = p_order_id then null else v_prev end
  );
end $function$;

GRANT EXECUTE ON FUNCTION "public"."start_checkout"(uuid, text, inet) TO PUBLIC, "authenticated", "postgres", "service_role";
