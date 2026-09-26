CREATE OR REPLACE FUNCTION internal.protect_venue_fields()
  RETURNS TRIGGER
  LANGUAGE plpgsql
  SECURITY DEFINER
  SET search_path TO 'public'
  AS $function$
begin
  if new.status is distinct from old.status
     and new.status = 'active'
     and auth.uid() is not null
     and not public.is_platform_admin() then
    raise exception 'FORBIDDEN_FIELD_CHANGE';
  end if;
  return new;
end $function$;

GRANT EXECUTE ON FUNCTION "internal"."protect_venue_fields"() TO "postgres";
