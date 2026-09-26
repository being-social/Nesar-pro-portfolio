CREATE OR REPLACE FUNCTION public.fy_label (
  p_date date
)
  RETURNS text
  LANGUAGE sql
  IMMUTABLE
  AS $function$
  select case when extract(month from p_date) >= 4
    then extract(year from p_date)::int || '-' || right((extract(year from p_date)::int + 1)::text, 2)
    else (extract(year from p_date)::int - 1) || '-' || right(extract(year from p_date)::int::text, 2) end
$function$;

GRANT EXECUTE ON FUNCTION "public"."fy_label"(date) TO PUBLIC, "anon", "authenticated", "postgres", "service_role";
