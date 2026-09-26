CREATE OR REPLACE FUNCTION internal.set_updated_at()
  RETURNS TRIGGER
  LANGUAGE plpgsql
  AS $function$
begin new.updated_at := now(); return new; end $function$;

GRANT EXECUTE ON FUNCTION "internal"."set_updated_at"() TO "postgres";
