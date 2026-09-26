CREATE OR REPLACE FUNCTION test.future_booking_date (
  p_days integer DEFAULT 7
)
  RETURNS date
  LANGUAGE sql
  STABLE
  AS $function$
  select (current_date + make_interval(days => p_days))::date;
$function$;

GRANT EXECUTE ON FUNCTION "test"."future_booking_date"(integer) TO "postgres";
