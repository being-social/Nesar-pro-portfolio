CREATE OR REPLACE FUNCTION test.insert_captured_payment (
  p_booking    uuid,
  p_amount     bigint,
  p_payment_id uuid   DEFAULT gen_random_uuid()
)
  RETURNS uuid
  LANGUAGE plpgsql
  SECURITY DEFINER
  SET search_path TO 'public'
  AS $function$
declare v_org uuid;
begin
  select org_id into v_org from public.bookings where id = p_booking;
  insert into public.payments(id, booking_id, org_id, provider, status, amount, purpose, captured_at)
  values (p_payment_id, p_booking, v_org, 'razorpay', 'captured', p_amount, 'advance', now());
  return p_payment_id;
end $function$;

GRANT EXECUTE ON FUNCTION "test"."insert_captured_payment"(uuid, bigint, uuid) TO "postgres";
