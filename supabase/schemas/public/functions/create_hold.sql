CREATE OR REPLACE FUNCTION public.create_hold (
  p_resource_id         uuid,
  p_session_template_id uuid,
  p_booking_date        date,
  p_customer_type       public.customer_type  DEFAULT 'individual'::public.customer_type,
  p_idempotency_key     text                  DEFAULT NULL::text,
  p_source              public.booking_source DEFAULT 'web'::public.booking_source
)
  RETURNS public.bookings
  LANGUAGE plpgsql
  SECURITY DEFINER
  SET search_path TO 'public'
  AS $function$
declare v_uid uuid := auth.uid(); res public.resources%rowtype; v public.venues%rowtype; o public.organizations%rowtype;
        t public.session_templates%rowtype; p public.profiles%rowtype; v_period tstzrange; q jsonb; b public.bookings%rowtype;
        v_now timestamptz := now(); n int;
begin
  if v_uid is null then raise exception 'AUTH_REQUIRED'; end if;
  if p_idempotency_key is not null then
    select * into b from public.bookings where idempotency_key = p_idempotency_key;
    if found then
      if b.customer_id <> v_uid then raise exception 'IDEMPOTENCY_KEY_REUSED'; end if;
      return b;
    end if;
  end if;
  select * into res from public.resources where id = p_resource_id and is_active and deleted_at is null;
  if not found then raise exception 'RESOURCE_NOT_FOUND'; end if;
  select * into v from public.venues where id = res.venue_id and status = 'active' and deleted_at is null;
  if not found then raise exception 'VENUE_NOT_BOOKABLE'; end if;
  select * into o from public.organizations where id = v.org_id and status = 'active' and deleted_at is null;
  if not found then raise exception 'ORG_NOT_BOOKABLE'; end if;
  select * into t from public.session_templates where id = p_session_template_id and venue_id = v.id and is_active and deleted_at is null
     and (resource_ids is null or p_resource_id = any(resource_ids))
     and (active_days is null or extract(isodow from p_booking_date)::int = any(active_days));
  if not found then raise exception 'SESSION_NOT_OFFERED'; end if;
  select * into p from public.profiles where id = v_uid;
  if exists (select 1 from public.blocked_customers bc where bc.org_id = o.id and bc.user_id = v_uid and (bc.until is null or bc.until > v_now)) then
    raise exception 'CUSTOMER_BLOCKED';
  end if;
  v_period := public.session_period(v.id, t.id, p_booking_date);
  if lower(v_period) < v_now + make_interval(hours => o.min_notice_hours) then raise exception 'TOO_SOON'; end if;
  if lower(v_period) > v_now + make_interval(days => o.max_advance_days) then raise exception 'TOO_FAR'; end if;
  select count(*) into n from public.bookings where customer_id = v_uid and status in ('held','pending_payment');
  if n >= o.max_active_holds_per_user then raise exception 'TOO_MANY_HOLDS'; end if;
  select count(*) into n from public.bookings where customer_id = v_uid and status = 'expired' and updated_at > v_now - interval '1 hour';
  if n >= 3 then raise exception 'HOLD_COOLDOWN'; end if;
  select count(*) into n from public.bookings where customer_id = v_uid and org_id = o.id and status in ('confirmed','checked_in') and lower(period) > v_now;
  if n >= o.max_future_bookings_per_customer then raise exception 'TOO_MANY_FUTURE_BOOKINGS'; end if;
  q := public.quote_price(p_resource_id, p_session_template_id, p_booking_date, p_customer_type);
  if q ? 'error' then raise exception '%', q->>'error'; end if;
  begin
    insert into public.bookings (
      org_id, venue_id, resource_id, session_template_id, booking_date, period, buffer_minutes, status, source,
      customer_id, customer_name, customer_phone, customer_email, customer_type, customer_org_name,
      base_amount, convenience_fee, gst_amount, gst_rate_bp, prices_include_gst, total_amount, advance_amount, platform_commission,
      price_breakdown, pricing_rule_id, policy_snapshot, session_snapshot, hold_expires_at, idempotency_key, created_by)
    values (
      o.id, v.id, res.id, t.id, p_booking_date, v_period, res.buffer_minutes, 'held', p_source,
      v_uid, p.full_name, p.phone, p.email, p_customer_type, p.organization_name,
      (q->>'base_amount')::bigint, (q->>'convenience_fee')::bigint, (q->>'gst_amount')::bigint, (q->>'gst_rate_bp')::int, (q->>'prices_include_gst')::boolean,
      (q->>'total_amount')::bigint, (q->>'advance_amount')::bigint, (q->>'platform_commission')::bigint,
      q->'breakdown', (q->>'pricing_rule_id')::uuid,
      jsonb_build_object('cancellation', o.cancellation_policy, 'no_show_grace_minutes', o.no_show_grace_minutes, 'weather_policy', o.weather_policy, 'advance_percent', o.advance_percent),
      to_jsonb(t), v_now + make_interval(mins => o.hold_ttl_minutes), p_idempotency_key, v_uid)
    returning * into b;
  exception when exclusion_violation then
    raise exception 'SLOT_TAKEN';
  end;
  return b;
end $function$;

GRANT EXECUTE ON FUNCTION "public"."create_hold"(uuid, uuid, date, public.customer_type, text, public.booking_source) TO PUBLIC, "authenticated", "postgres", "service_role";
