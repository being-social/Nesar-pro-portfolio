CREATE OR REPLACE FUNCTION public.set_conversation_summary (
  p_conversation_id uuid,
  p_summary         text
)
  RETURNS void
  LANGUAGE sql
  SECURITY DEFINER
  SET search_path TO 'public'
  AS $function$
  update public.conversations
     set summary = p_summary, summary_updated_at = now() where id = p_conversation_id
$function$;

GRANT EXECUTE ON FUNCTION "public"."set_conversation_summary"(uuid, text) TO "postgres", "service_role";

REVOKE ALL ON FUNCTION "public"."set_conversation_summary"(uuid, text) FROM PUBLIC;
