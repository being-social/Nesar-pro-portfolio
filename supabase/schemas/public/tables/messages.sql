CREATE TABLE "public"."messages" (
  "id"              bigint                   NOT NULL DEFAULT nextval('public.messages_id_seq'::regclass),
  "conversation_id" uuid                     NOT NULL,
  "direction"       text                     NOT NULL,
  "sender_kind"     text                     NOT NULL,
  "body"            text,
  "interactive"     jsonb,
  "wa_message_id"   text,
  "status"          text                     DEFAULT 'sent'::text,
  "booking_id"      uuid,
  "created_at"      timestamp with time zone NOT NULL DEFAULT now(),
  "kind"            text                     NOT NULL DEFAULT 'text'::text,
  "tool_calls"      jsonb,
  CONSTRAINT "messages_booking_id_fkey" FOREIGN KEY (booking_id) REFERENCES public.bookings(id),
  CONSTRAINT "messages_conversation_id_fkey" FOREIGN KEY (conversation_id) REFERENCES public.conversations(id) ON DELETE CASCADE,
  CONSTRAINT "messages_direction_check" CHECK ((direction = ANY (ARRAY['in'::text, 'out'::text]))),
  CONSTRAINT "messages_pkey" PRIMARY KEY (id),
  CONSTRAINT "messages_sender_kind_check" CHECK ((sender_kind = ANY (ARRAY['customer'::text, 'agent'::text, 'staff'::text, 'system'::text])))
);

ALTER TABLE "public"."messages"
  ENABLE ROW LEVEL SECURITY;

ALTER SEQUENCE "public"."messages_id_seq" OWNED BY "public"."messages"."id";

CREATE INDEX messages_conv_idx ON public.messages USING btree (conversation_id, created_at);

CREATE UNIQUE INDEX messages_wa_dedupe_uq ON public.messages USING btree (wa_message_id)
  WHERE (wa_message_id IS NOT NULL);

CREATE TRIGGER messages_touch_conversation
  AFTER INSERT ON public.messages
  FOR EACH ROW
  EXECUTE FUNCTION internal.touch_conversation();

CREATE POLICY "messages_org" ON "public"."messages"
  FOR ALL
  TO "authenticated"
  USING ((EXISTS ( SELECT 1
   FROM public.conversations c
  WHERE ((c.id = messages.conversation_id) AND public.has_org_role(c.org_id, VARIADIC ARRAY['owner'::public.org_role, 'admin'::public.org_role, 'manager'::public.org_role])))));

CREATE POLICY "messages_self" ON "public"."messages"
  FOR SELECT
  TO "authenticated"
  USING ((EXISTS ( SELECT 1
   FROM public.conversations c
  WHERE ((c.id = messages.conversation_id) AND (c.customer_id = auth.uid())))));

CREATE POLICY "platform_admin_all_messages" ON "public"."messages"
  FOR ALL
  TO "authenticated"
  USING (public.is_platform_admin())
  WITH CHECK (public.is_platform_admin());

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."messages" TO "anon", "authenticated", "postgres", "service_role";
