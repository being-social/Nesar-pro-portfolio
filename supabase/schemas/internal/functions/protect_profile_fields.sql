CREATE OR REPLACE FUNCTION internal.protect_profile_fields()
  RETURNS TRIGGER
  LANGUAGE plpgsql
  SECURITY DEFINER
  SET search_path TO 'public'
  AS $function$
begin
  if new.is_platform_admin is distinct from old.is_platform_admin and auth.uid() is not null and not public.is_platform_admin() then
    raise exception 'FORBIDDEN_FIELD_CHANGE';
  end if;
  return new;
end $function$;

GRANT EXECUTE ON FUNCTION "internal"."protect_profile_fields"() TO "postgres";
