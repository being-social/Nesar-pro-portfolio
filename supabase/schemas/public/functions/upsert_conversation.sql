CREATE OR REPLACE FUNCTION public.upsert_conversation (
  p_channel     text,
  p_wa_jid      text DEFAULT NULL::text,
  p_phone       text DEFAULT NULL::text,
  p_customer_id uuid DEFAULT NULL::uuid,
  p_org_id      uuid DEFAULT NULL::uuid
)
  RETURNS public.conversations
  LANGUAGE plpgsql
  SECURITY DEFINER
  SET search_path TO 'public'
  AS $function$
declare c public.conversations%rowtype;
        v_jid text := public.canonical_identity('wa_jid', p_wa_jid);
        v_phone text := public.normalize_phone(p_phone);
        v_key text := coalesce(v_jid, v_phone, p_customer_id::text);
        v_user uuid := p_customer_id;
begin
  if v_key is null then raise exception 'CONVERSATION_IDENTITY_REQUIRED'; end if;
  if v_user is null and v_jid is not null then v_user := public.resolve_wa_user(v_jid, v_phone); end if;
  if v_user is null and v_phone is not null then v_user := public.resolve_identity('phone', v_phone); end if;

  select * into c from public.conversations
   where channel = p_channel and identity_key = v_key and status = 'open' for update;
  if found then
    update public.conversations
       set customer_id = coalesce(v_user, customer_id),
           customer_phone = coalesce(v_phone, customer_phone),
           wa_jid = coalesce(v_jid, wa_jid),
           org_id = coalesce(p_org_id, org_id)
     where id = c.id returning * into c;
    return c;
  end if;
  insert into public.conversations(channel, wa_jid, customer_phone, customer_id, org_id)
  values (p_channel, v_jid, v_phone, v_user, p_org_id)
  returning * into c;
  return c;
end $function$;

GRANT EXECUTE ON FUNCTION "public"."upsert_conversation"(text, text, text, uuid, uuid) TO "postgres", "service_role";

REVOKE ALL ON FUNCTION "public"."upsert_conversation"(text, text, text, uuid, uuid) FROM PUBLIC;
