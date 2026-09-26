CREATE OR REPLACE FUNCTION public.release_hold (
  p_booking_id uuid
)
  RETURNS void
  LANGUAGE plpgsql
  SECURITY DEFINER
  SET search_path TO 'public'
  AS $function$
begin
  perform set_config('app.bypass_guard','on',true);
  update public.bookings set status = 'expired' where id = p_booking_id and customer_id = auth.uid() and status = 'held';
end $function$;

GRANT EXECUTE ON FUNCTION "public"."release_hold"(uuid) TO PUBLIC, "anon", "authenticated", "postgres", "service_role";
