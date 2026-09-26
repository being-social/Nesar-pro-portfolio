CREATE OR REPLACE FUNCTION public.extend_hold (
  p_booking_id uuid
)
  RETURNS public.bookings
  LANGUAGE plpgsql
  SECURITY DEFINER
  SET search_path TO 'public'
  AS $function$
declare b public.bookings%rowtype;
begin
  update public.bookings set hold_expires_at = greatest(hold_expires_at, now() + interval '5 minutes'), hold_extended = true
  where id = p_booking_id and customer_id = auth.uid() and status in ('held','pending_payment') and not hold_extended
  returning * into b;
  if not found then
    select * into b from public.bookings where id = p_booking_id and customer_id = auth.uid();
    if not found then raise exception 'BOOKING_NOT_FOUND'; end if;
  end if;
  return b;
end $function$;

GRANT EXECUTE ON FUNCTION "public"."extend_hold"(uuid) TO PUBLIC, "anon", "authenticated", "postgres", "service_role";
