CREATE OR REPLACE FUNCTION public.record_offline_payment (
  p_booking_id uuid,
  p_amount     bigint,
  p_provider   public.payment_provider,
  p_reference  text                    DEFAULT NULL::text
)
  RETURNS public.payments
  LANGUAGE plpgsql
  SECURITY DEFINER
  SET search_path TO 'public'
  AS $function$
declare b public.bookings%rowtype; pay public.payments%rowtype;
begin
  perform set_config('app.bypass_guard','on',true);
  select * into b from public.bookings where id = p_booking_id for update;
  if not found then raise exception 'BOOKING_NOT_FOUND'; end if;
  if not public.has_org_role(b.org_id, 'owner','admin','manager','staff') then raise exception 'FORBIDDEN'; end if;
  if p_provider = 'razorpay' then raise exception 'USE_ONLINE_FLOW'; end if;
  if b.status not in ('confirmed','checked_in','completed') then raise exception 'BOOKING_NOT_PAYABLE'; end if;
  if p_amount <= 0 or b.amount_paid + p_amount > b.total_amount then raise exception 'AMOUNT_EXCEEDS_BALANCE'; end if;
  insert into public.payments(booking_id, org_id, provider, status, amount, purpose, method, reference_note, recorded_by, captured_at)
  values (b.id, b.org_id, p_provider, 'captured', p_amount, 'balance', p_provider::text, p_reference, auth.uid(), now()) returning * into pay;
  update public.bookings set amount_paid = amount_paid + p_amount where id = b.id;
  insert into public.ledger_entries(org_id, booking_id, payment_id, account, amount, memo) values
    (b.org_id, b.id, pay.id, 'customer_payment', p_amount, 'balance at ground'),
    (b.org_id, b.id, pay.id, 'owner_net', p_amount, 'balance at ground (offline)');
  return pay;
end $function$;

GRANT EXECUTE ON FUNCTION "public"."record_offline_payment"(uuid, bigint, public.payment_provider, text) TO PUBLIC, "authenticated", "postgres", "service_role";
