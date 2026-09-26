CREATE OR REPLACE FUNCTION internal.protect_org_fields()
  RETURNS TRIGGER
  LANGUAGE plpgsql
  SECURITY DEFINER
  SET search_path TO 'public'
  AS $function$
begin
  if (new.status is distinct from old.status or new.approved_at is distinct from old.approved_at or new.approved_by is distinct from old.approved_by)
     and auth.uid() is not null and not public.is_platform_admin() then
    raise exception 'FORBIDDEN_FIELD_CHANGE';
  end if;
  return new;
end $function$;

GRANT EXECUTE ON FUNCTION "internal"."protect_org_fields"() TO "postgres";
