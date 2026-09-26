CREATE OR REPLACE FUNCTION public.resolve_pricing_rule (
  p_resource_id         uuid,
  p_session_template_id uuid,
  p_date                date,
  p_customer_type       public.customer_type
)
  RETURNS public.pricing_rules
  LANGUAGE sql
  STABLE
  AS $function$
  select r.* from public.pricing_rules r
  join public.resources res on res.id = p_resource_id
  where r.venue_id = res.venue_id and r.is_active and r.deleted_at is null
    and (r.resource_id is null or r.resource_id = p_resource_id)
    and (r.session_template_id is null or r.session_template_id = p_session_template_id)
    and (r.effective_from is null or r.effective_from <= p_date)
    and (r.effective_to   is null or r.effective_to   >= p_date)
    and (r.customer_type  is null or r.customer_type = p_customer_type)
    and r.scope <> 'hour_range'
    and case r.scope
          when 'base'        then true
          when 'day_of_week' then extract(isodow from p_date)::int = any(r.days_of_week)
          when 'date'        then r.date_from = p_date
          when 'date_range'  then p_date between r.date_from and r.date_to
          when 'holiday'     then exists (select 1 from public.holidays h where h.d = p_date and h.is_active and (h.org_id is null or h.org_id = r.org_id))
          when 'customer_type' then true
          else false end
  order by r.priority desc, r.created_at desc
  limit 1
$function$;

GRANT EXECUTE ON FUNCTION "public"."resolve_pricing_rule"(uuid, uuid, date, public.customer_type) TO PUBLIC, "anon", "authenticated", "postgres", "service_role";
