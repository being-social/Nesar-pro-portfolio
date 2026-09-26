CREATE OR REPLACE FUNCTION public.quote_price (
  p_resource_id         uuid,
  p_session_template_id uuid,
  p_date                date,
  p_customer_type       public.customer_type DEFAULT 'individual'::public.customer_type
)
  RETURNS jsonb
  LANGUAGE plpgsql
  STABLE
  SECURITY DEFINER
  SET search_path TO 'public'
  AS $function$
declare rule public.pricing_rules%rowtype; o public.organizations%rowtype; s public.organization_secrets%rowtype;
        v_base bigint; v_gst bigint := 0; v_taxable bigint; v_fee bigint; v_total bigint; v_adv bigint; v_comm bigint;
begin
  select o2.* into o from public.organizations o2 join public.venues v on v.org_id = o2.id join public.resources r on r.venue_id = v.id where r.id = p_resource_id;
  select * into s from public.organization_secrets where org_id = o.id;
  rule := public.resolve_pricing_rule(p_resource_id, p_session_template_id, p_date, p_customer_type);
  if rule.id is null then return jsonb_build_object('error', 'PRICE_NOT_CONFIGURED'); end if;
  v_base := rule.amount;
  if o.gst_registered then
    if o.prices_include_gst then
      v_taxable := round(v_base * 10000.0 / (10000 + o.gst_rate_bp)); v_gst := v_base - v_taxable;
    else
      v_taxable := v_base; v_gst := round(v_base * o.gst_rate_bp / 10000.0);
    end if;
  else v_taxable := v_base; end if;
  v_fee   := round(v_base * o.convenience_fee_bp / 10000.0);
  v_total := v_base + v_fee + (case when o.gst_registered and not o.prices_include_gst then v_gst else 0 end);
  v_adv   := round(v_total * o.advance_percent / 100.0);
  v_comm  := round(v_base * coalesce(s.platform_commission_bp,0) / 10000.0);
  return jsonb_build_object(
    'base_amount', v_base, 'taxable_value', v_taxable, 'gst_amount', v_gst,
    'gst_rate_bp', case when o.gst_registered then o.gst_rate_bp else 0 end, 'prices_include_gst', o.prices_include_gst,
    'convenience_fee', v_fee, 'total_amount', v_total, 'advance_amount', v_adv, 'balance_amount', v_total - v_adv,
    'advance_percent', o.advance_percent, 'platform_commission', v_comm, 'pricing_rule_id', rule.id,
    'breakdown', jsonb_build_array(jsonb_build_object('label', rule.name, 'scope', rule.scope, 'amount', v_base)));
end $function$;

GRANT EXECUTE ON FUNCTION "public"."quote_price"(uuid, uuid, date, public.customer_type) TO PUBLIC, "anon", "authenticated", "postgres", "service_role";
