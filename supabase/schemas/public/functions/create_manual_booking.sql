CREATE OR REPLACE FUNCTION public.create_manual_booking (
  p_resource_id         uuid,
  p_session_template_id uuid,
  p_booking_date        date,
  p_customer_name       text,
  p_customer_phone      text,
  p_customer_email      text                    DEFAULT NULL::text,
  p_customer_type       public.customer_type    DEFAULT 'individual'::public.customer_type,
  p_customer_org_name   text                    DEFAULT NULL::text,
  p_total_amount        bigint                  DEFAULT NULL::bigint,
  p_paid_amount         bigint                  DEFAULT 0,
  p_provider            public.payment_provider DEFAULT 'cash'::public.payment_provider,
  p_reference           text                    DEFAULT NULL::text,
  p_notes               text                    DEFAULT NULL::text
)
  RETURNS public.bookings
  LANGUAGE plpgsql
  SECURITY DEFINER
  SET search_path TO 'public'
  AS $function$
declare v_uid uuid := auth.uid(); res public.resources%rowtype; v public.venues%rowtype; o public.organizations%rowtype;
        t public.session_templates%rowtype; q jsonb; b public.bookings%rowtype; v_period tstzrange;
        v_base bigint; v_fee bigint; v_gst bigint; v_total bigint; v_incl boolean; v_rate int;
begin
  perform set_config('app.bypass_guard','on',true);
  select * into res from public.resources where id = p_resource_id and deleted_at is null;
  if not found then raise exception 'RESOURCE_NOT_FOUND'; end if;
  select * into v from public.venues where id = res.venue_id;
  select * into o from public.organizations where id = v.org_id;
  if not public.has_org_role(o.id, 'owner','admin','manager') then raise exception 'FORBIDDEN'; end if;
  select * into t from public.session_templates where id = p_session_template_id and venue_id = v.id;
  if not found then raise exception 'SESSION_NOT_FOUND'; end if;
  v_period := public.session_period(v.id, t.id, p_booking_date);
  q := public.quote_price(p_resource_id, p_session_template_id, p_booking_date, p_customer_type);
  if p_total_amount is null then
    if q ? 'error' then raise exception 'PRICE_NOT_CONFIGURED'; end if;
    v_base := (q->>'base_amount')::bigint; v_fee := (q->>'convenience_fee')::bigint; v_gst := (q->>'gst_amount')::bigint;
    v_total := (q->>'total_amount')::bigint; v_incl := (q->>'prices_include_gst')::boolean; v_rate := (q->>'gst_rate_bp')::int;
  else
    -- negotiated price: treat it as GST-inclusive, no convenience fee, so bookings_total_consistent holds
    v_base := p_total_amount; v_fee := 0; v_total := p_total_amount; v_incl := true;
    v_rate := case when o.gst_registered then o.gst_rate_bp else 0 end;
    v_gst := case when o.gst_registered then v_base - round(v_base * 10000.0 / (10000 + o.gst_rate_bp)) else 0 end;
  end if;
  begin
    insert into public.bookings (org_id, venue_id, resource_id, session_template_id, booking_date, period, buffer_minutes, status, source,
      customer_name, customer_phone, customer_email, customer_type, customer_org_name, notes,
      base_amount, convenience_fee, total_amount, advance_amount, amount_paid, gst_amount, gst_rate_bp, prices_include_gst,
      price_breakdown, pricing_rule_id, policy_snapshot, session_snapshot, confirmed_at, created_by)
    values (o.id, v.id, res.id, t.id, p_booking_date, v_period, res.buffer_minutes, 'confirmed', 'admin',
      p_customer_name, public.normalize_phone(p_customer_phone), p_customer_email, p_customer_type, p_customer_org_name, p_notes,
      v_base, v_fee, v_total, v_total, least(coalesce(p_paid_amount,0), v_total), v_gst, v_rate, v_incl,
      coalesce(q->'breakdown','[]'::jsonb), (q->>'pricing_rule_id')::uuid,
      jsonb_build_object('cancellation', o.cancellation_policy, 'no_show_grace_minutes', o.no_show_grace_minutes, 'weather_policy', o.weather_policy, 'advance_percent', 100),
      to_jsonb(t), now(), v_uid)
    returning * into b;
  exception when exclusion_violation then raise exception 'SLOT_TAKEN'; end;
  if coalesce(p_paid_amount,0) > 0 then
    if p_provider = 'razorpay' then raise exception 'USE_ONLINE_FLOW'; end if;
    insert into public.payments(booking_id, org_id, provider, status, amount, purpose, method, reference_note, recorded_by, captured_at)
    values (b.id, o.id, p_provider, 'captured', least(p_paid_amount, v_total), case when p_paid_amount >= v_total then 'full' else 'advance' end, p_provider::text, p_reference, v_uid, now());
    insert into public.ledger_entries(org_id, booking_id, account, amount, memo) values (o.id, b.id, 'customer_payment', least(p_paid_amount, v_total), 'manual booking');
    insert into public.ledger_entries(org_id, booking_id, account, amount, memo) values (o.id, b.id, 'owner_net', least(p_paid_amount, v_total), 'manual booking (offline, no gateway fee)');
  end if;
  return b;
end $function$;

GRANT EXECUTE
  ON FUNCTION "public"."create_manual_booking"(uuid, uuid, date, text, text, text, public.customer_type, text, bigint, bigint, public.payment_provider, text, text)
  TO PUBLIC, "authenticated", "postgres", "service_role";
