CREATE OR REPLACE FUNCTION internal.audit_row()
  RETURNS TRIGGER
  LANGUAGE plpgsql
  SECURITY DEFINER
  AS $function$
declare j_new jsonb := case when tg_op <> 'DELETE' then to_jsonb(new) end;
        j_old jsonb := case when tg_op <> 'INSERT' then to_jsonb(old) end;
begin
  -- strip secrets before storing the audit copy
  j_new := j_new - 'razorpay_key_secret_enc' - 'razorpay_webhook_secret_enc' - 'agent_callback_secret_enc' - 'key_hash';
  j_old := j_old - 'razorpay_key_secret_enc' - 'razorpay_webhook_secret_enc' - 'agent_callback_secret_enc' - 'key_hash';
  insert into public.audit_log(org_id, actor_id, actor_kind, action, table_name, row_id, before, after)
  values (coalesce((j_new->>'org_id')::uuid, (j_old->>'org_id')::uuid), auth.uid(), case when auth.uid() is null then 'system' else 'user' end,
          tg_table_name || '.' || lower(tg_op), tg_table_name,
          coalesce(j_new->>'id', j_old->>'id', j_new->>'org_id', j_old->>'org_id'), j_old, j_new);
  return null;
end $function$;

GRANT EXECUTE ON FUNCTION "internal"."audit_row"() TO "postgres";
