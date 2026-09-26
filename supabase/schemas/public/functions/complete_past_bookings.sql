CREATE OR REPLACE FUNCTION public.complete_past_bookings()
  RETURNS integer
  LANGUAGE plpgsql
  SECURITY DEFINER
  SET search_path TO 'public'
  AS $function$
declare n int;
begin
  with e as (update public.bookings set status = 'completed', completed_at = now()
             where status in ('confirmed','checked_in') and upper(period) + interval '60 minutes' < now() returning id)
  select count(*) into n from e;
  return n;
end $function$;

GRANT EXECUTE ON FUNCTION "public"."complete_past_bookings"() TO "postgres", "service_role";

REVOKE ALL ON FUNCTION "public"."complete_past_bookings"() FROM PUBLIC;
