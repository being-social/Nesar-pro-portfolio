CREATE OR REPLACE FUNCTION public.custom_access_token_hook (
  event jsonb
)
  RETURNS jsonb
  LANGUAGE plpgsql
  STABLE
  AS $function$
declare claims jsonb; v_roles jsonb; v_admin boolean;
begin
  select coalesce(jsonb_object_agg(org_id::text, role::text), '{}'::jsonb) into v_roles
  from public.organization_members where user_id = (event->>'user_id')::uuid and removed_at is null;
  select coalesce(is_platform_admin,false) into v_admin from public.profiles where id = (event->>'user_id')::uuid;
  claims := coalesce(event->'claims', '{}'::jsonb);
  claims := jsonb_set(claims, '{org_roles}', v_roles, true);
  claims := jsonb_set(claims, '{app_role}', to_jsonb(case when v_admin then 'platform_admin' else 'user' end), true);
  return jsonb_set(event, '{claims}', claims, true);
end $function$;

GRANT EXECUTE ON FUNCTION "public"."custom_access_token_hook"(jsonb) TO "postgres", "service_role", "supabase_auth_admin";

REVOKE ALL ON FUNCTION "public"."custom_access_token_hook"(jsonb) FROM PUBLIC;
