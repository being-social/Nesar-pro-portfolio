CREATE OR REPLACE FUNCTION public.agent_context (
  p_conversation_id uuid,
  p_limit           integer DEFAULT 10
)
  RETURNS jsonb
  LANGUAGE sql
  STABLE
  SECURITY DEFINER
  SET search_path TO 'public'
  AS $function$
  select jsonb_build_object(
    'conversation', jsonb_build_object(
      'id', c.id, 'channel', c.channel, 'status', c.status,
      'acting_as', c.acting_as, 'active_org_id', c.active_org_id,
      'flow_state', c.flow_state, 'summary', c.summary,
      'message_count', c.message_count, 'last_message_at', c.last_message_at),
    'profile', case when p.id is null then null else jsonb_build_object(
      'id', p.id, 'full_name', p.full_name, 'phone', p.phone,
      'customer_type', p.customer_type, 'is_platform_admin', p.is_platform_admin,
      'consent_version', p.consent_version,
      'orgs', coalesce((select jsonb_agg(jsonb_build_object('org_id', m.org_id, 'name', o.display_name, 'role', m.role))
                          from public.organization_members m
                          join public.organizations o on o.id = m.org_id
                         where m.user_id = p.id and m.removed_at is null), '[]'::jsonb),
      'blocked_in', coalesce((select jsonb_agg(b.org_id) from public.blocked_customers b
                               where b.user_id = p.id and (b.until is null or b.until > now())), '[]'::jsonb))
      end,
    'bookings', coalesce((
      select jsonb_agg(jsonb_build_object(
               'id', b.id, 'code', b.short_code, 'status', b.status,
               'starts_at', lower(b.period), 'ends_at', upper(b.period),
               'venue', v.name, 'total_amount', b.total_amount)
             order by lower(b.period))
        from public.bookings b
        join public.venues v on v.id = b.venue_id
       where b.customer_id = p.id
         and b.status in ('held','pending_payment','confirmed','checked_in')
         and upper(b.period) > now()), '[]'::jsonb),
    'messages', coalesce((
      select jsonb_agg(m order by m.id)
        from (select id, direction, sender_kind, body, kind, interactive, tool_calls, created_at
                from public.messages where conversation_id = c.id
               order by id desc limit greatest(p_limit, 1)) m), '[]'::jsonb),
    'brand', (select jsonb_object_agg(key, value) from public.platform_settings
               where key in ('brand_name','agent_display_name'))
  )
  from public.conversations c
  left join public.profiles p on p.id = c.customer_id
  where c.id = p_conversation_id
$function$;

GRANT EXECUTE ON FUNCTION "public"."agent_context"(uuid, integer) TO "postgres", "service_role";

REVOKE ALL ON FUNCTION "public"."agent_context"(uuid, integer) FROM PUBLIC;
