CREATE OR REPLACE FUNCTION internal.touch_conversation()
  RETURNS TRIGGER
  LANGUAGE plpgsql
  SECURITY DEFINER
  SET search_path TO 'public'
  AS $function$
begin
  update public.conversations
     set last_message_at = new.created_at,
         message_count = message_count + 1,
         last_inbound_at = case when new.direction = 'in' then new.created_at else last_inbound_at end
   where id = new.conversation_id;
  return new;
end $function$;

GRANT EXECUTE ON FUNCTION "internal"."touch_conversation"() TO "postgres";
