CREATE OR REPLACE FUNCTION public.expire_holds()
  RETURNS integer
  LANGUAGE plpgsql
  SECURITY DEFINER
  SET search_path TO 'public'
  AS $function$
declare n int;
begin
  perform set_config('app.bypass_guard', 'on', true);
  with e as (
    update public.bookings
    set status = 'expired'
    where status in ('held', 'pending_payment') and hold_expires_at < now()
    returning id
  )
  select count(*) into n from e;
  return n;
end $function$;

GRANT EXECUTE ON FUNCTION "public"."expire_holds"() TO "postgres", "service_role";

REVOKE ALL ON FUNCTION "public"."expire_holds"() FROM PUBLIC;
