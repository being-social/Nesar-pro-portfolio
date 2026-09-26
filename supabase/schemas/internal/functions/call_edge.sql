CREATE OR REPLACE FUNCTION internal.call_edge (
  p_fn   text,
  p_body jsonb DEFAULT '{}'::jsonb
)
  RETURNS bigint
  LANGUAGE plpgsql
  SECURITY DEFINER
  AS $function$
declare v_url text; v_key text;
begin
  select decrypted_secret into v_url from vault.decrypted_secrets where name = 'edge_base_url';
  select decrypted_secret into v_key from vault.decrypted_secrets where name = 'edge_service_key';
  -- Vault not configured (fresh local stack): skip quietly rather than fail every cron tick.
  if v_url is null or v_key is null then
    raise notice 'call_edge(%): vault secrets edge_base_url/edge_service_key not set', p_fn;
    return null;
  end if;
  return net.http_post(
    url := v_url || '/' || p_fn,
    body := p_body,
    headers := jsonb_build_object('Content-Type','application/json','Authorization','Bearer '||v_key),
    timeout_milliseconds := 25000);
end $function$;

GRANT EXECUTE ON FUNCTION "internal"."call_edge"(text, jsonb) TO "postgres";
