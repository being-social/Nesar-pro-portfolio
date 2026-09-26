CREATE OR REPLACE FUNCTION public.next_invoice_number (
  p_org  uuid,
  p_date date DEFAULT CURRENT_DATE
)
  RETURNS text
  LANGUAGE plpgsql
  SECURITY DEFINER
  SET search_path TO 'public'
  AS $function$
declare v_fy text := public.fy_label(p_date); v_no int; v_prefix text;
begin
  insert into public.invoice_sequences(org_id, fy) values (p_org, v_fy) on conflict do nothing;
  update public.invoice_sequences set last_no = last_no + 1 where org_id = p_org and fy = v_fy returning last_no into v_no;
  select invoice_prefix into v_prefix from public.organizations where id = p_org;
  return format('%s/%s/%s', coalesce(v_prefix,'GB'), v_fy, lpad(v_no::text, 6, '0'));
end $function$;

GRANT EXECUTE ON FUNCTION "public"."next_invoice_number"(uuid, date) TO "postgres", "service_role";

REVOKE ALL ON FUNCTION "public"."next_invoice_number"(uuid, date) FROM PUBLIC;
