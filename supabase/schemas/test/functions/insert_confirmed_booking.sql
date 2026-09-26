CREATE OR REPLACE FUNCTION test.insert_confirmed_booking (
  p_resource uuid,
  p_session  uuid,
  p_date     date,
  p_customer uuid DEFAULT '22222222-2222-2222-2222-222222222222'::uuid
)
  RETURNS uuid
  LANGUAGE plpgsql
  SECURITY DEFINER
  SET search_path TO 'public'
  AS $function$
declare
  v_period tstzrange;
  v_venue uuid;
  v_org uuid;
  v_buffer int;
  v_quote jsonb;
  v_id uuid;
begin
  perform set_config('app.bypass_guard', 'on', true);
  select r.venue_id, r.buffer_minutes, v.org_id
    into v_venue, v_buffer, v_org
  from public.resources r
  join public.venues v on v.id = r.venue_id
  where r.id = p_resource;
  v_period := public.session_period(v_venue, p_session, p_date);
  v_quote := public.quote_price(p_resource, p_session, p_date, 'individual');
  insert into public.bookings (
    org_id, venue_id, resource_id, session_template_id, booking_date, period, buffer_minutes,
    status, source, customer_id, customer_name, customer_phone, customer_type,
    base_amount, convenience_fee, gst_amount, gst_rate_bp, prices_include_gst,
    total_amount, advance_amount, amount_paid, platform_commission,
    price_breakdown, pricing_rule_id, policy_snapshot, session_snapshot, confirmed_at
  )
  select
    v_org, v_venue, p_resource, p_session, p_date, v_period, v_buffer,
    'confirmed', 'web', p_customer, p.full_name, p.phone, p.customer_type,
    (v_quote->>'base_amount')::bigint, (v_quote->>'convenience_fee')::bigint,
    (v_quote->>'gst_amount')::bigint, (v_quote->>'gst_rate_bp')::int,
    (v_quote->>'prices_include_gst')::boolean,
    (v_quote->>'total_amount')::bigint, (v_quote->>'advance_amount')::bigint,
    (v_quote->>'advance_amount')::bigint, (v_quote->>'platform_commission')::bigint,
    v_quote->'breakdown', (v_quote->>'pricing_rule_id')::uuid,
    jsonb_build_object(
      'cancellation', o.cancellation_policy,
      'no_show_grace_minutes', o.no_show_grace_minutes,
      'weather_policy', o.weather_policy
    ),
    (select to_jsonb(st.*) from public.session_templates st where st.id = p_session),
    now()
  from public.profiles p, public.organizations o
  where p.id = p_customer and o.id = v_org
  returning id into v_id;
  perform set_config('app.bypass_guard', 'off', true);
  return v_id;
end $function$;

GRANT EXECUTE ON FUNCTION "test"."insert_confirmed_booking"(uuid, uuid, date, uuid) TO "postgres";
