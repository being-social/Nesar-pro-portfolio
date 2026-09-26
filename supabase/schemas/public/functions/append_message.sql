CREATE OR REPLACE FUNCTION public.append_message (
  p_conversation_id uuid,
  p_direction       text,
  p_sender_kind     text,
  p_body            text  DEFAULT NULL::text,
  p_kind            text  DEFAULT 'text'::text,
  p_wa_message_id   text  DEFAULT NULL::text,
  p_interactive     jsonb DEFAULT NULL::jsonb,
  p_tool_calls      jsonb DEFAULT NULL::jsonb,
  p_booking_id      uuid  DEFAULT NULL::uuid
)
  RETURNS bigint
  LANGUAGE plpgsql
  SECURITY DEFINER
  SET search_path TO 'public'
  AS $function$
declare v_id bigint;
begin
  insert into public.messages(conversation_id, direction, sender_kind, body, kind,
                              wa_message_id, interactive, tool_calls, booking_id)
  values (p_conversation_id, p_direction, p_sender_kind, p_body, p_kind,
          p_wa_message_id, p_interactive, p_tool_calls, p_booking_id)
  on conflict (wa_message_id) where wa_message_id is not null do nothing
  returning id into v_id;
  return v_id;  -- null means the inbound message was a duplicate
end $function$;

GRANT EXECUTE ON FUNCTION "public"."append_message"(uuid, text, text, text, text, text, jsonb, jsonb, uuid) TO "postgres", "service_role";

REVOKE ALL ON FUNCTION "public"."append_message"(uuid, text, text, text, text, text, jsonb, jsonb, uuid) FROM PUBLIC;
