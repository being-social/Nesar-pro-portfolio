CREATE OR REPLACE FUNCTION internal.bookings_guard_pav()
  RETURNS TRIGGER
  LANGUAGE plpgsql
  AS $function$
begin
  if auth.uid() is not null and current_setting('app.bypass_guard', true) is distinct from 'on'
     and (new.payment_mode is distinct from old.payment_mode or new.pav_state is distinct from old.pav_state)
  then raise exception 'USE_BOOKING_FUNCTIONS' using errcode='P0001'; end if;
  return new;
end $function$;

GRANT EXECUTE ON FUNCTION "internal"."bookings_guard_pav"() TO "postgres";
