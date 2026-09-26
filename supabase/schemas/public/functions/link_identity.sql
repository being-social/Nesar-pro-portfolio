CREATE OR REPLACE FUNCTION public.link_identity (
  p_user     uuid,
  p_kind     text,
  p_value    text,
  p_source   text    DEFAULT NULL::text,
  p_verified boolean DEFAULT true
)
  RETURNS public.user_identities
  LANGUAGE plpgsql
  SECURITY DEFINER
  SET search_path TO 'public'
  AS $function$
declare v text := public.canonical_identity(p_kind, p_value); row public.user_identities%rowtype;
begin
  if v is null then raise exception 'IDENTITY_VALUE_REQUIRED'; end if;
  select * into row from public.user_identities where kind = p_kind and value = v;
  if found then
    if row.user_id <> p_user then raise exception 'IDENTITY_TAKEN'; end if;
    update public.user_identities
       set verified_at = case when p_verified then coalesce(verified_at, now()) else verified_at end,
           source = coalesce(p_source, source)
     where id = row.id returning * into row;
  else
    insert into public.user_identities(user_id, kind, value, verified_at, source)
    values (p_user, p_kind, v, case when p_verified then now() end, p_source)
    returning * into row;
  end if;

  -- profiles is the denormalised fast path the rest of the schema reads.
  if p_kind = 'phone' then
    update public.profiles
       set phone = v,
           phone_verified_at = case
             -- a different number starts unverified; the same one keeps its stamp
             when phone is distinct from v then row.verified_at
             else coalesce(phone_verified_at, row.verified_at)
           end
     where id = p_user;
  end if;
  if p_kind = 'wa_jid' then update public.profiles set wa_jid = v where id = p_user; end if;
  if p_kind = 'email'  then update public.profiles set email = v where id = p_user and email is null; end if;
  return row;
end $function$;

GRANT EXECUTE ON FUNCTION "public"."link_identity"(uuid, text, text, text, boolean) TO "postgres", "service_role";

REVOKE ALL ON FUNCTION "public"."link_identity"(uuid, text, text, text, boolean) FROM PUBLIC;
