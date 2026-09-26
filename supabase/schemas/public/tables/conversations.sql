CREATE TABLE "public"."conversations" (
  "id"                 uuid                     NOT NULL DEFAULT gen_random_uuid(),
  "org_id"             uuid,
  "channel"            text                     NOT NULL DEFAULT 'whatsapp'::text,
  "customer_phone"     text,
  "customer_id"        uuid,
  "wa_conversation_id" text,
  "last_inbound_at"    timestamp with time zone,
  "assigned_to"        text                     NOT NULL DEFAULT 'agent'::text,
  "status"             text                     NOT NULL DEFAULT 'open'::text,
  "created_at"         timestamp with time zone NOT NULL DEFAULT now(),
  "updated_at"         timestamp with time zone NOT NULL DEFAULT now(),
  "wa_jid"             text,
  "active_org_id"      uuid,
  "acting_as"          text                     NOT NULL DEFAULT 'personal'::text,
  "flow_state"         jsonb                    NOT NULL DEFAULT '{}'::jsonb,
  "summary"            text,
  "summary_updated_at" timestamp with time zone,
  "last_message_at"    timestamp with time zone,
  "message_count"      integer                  NOT NULL DEFAULT 0,
  CONSTRAINT "conversations_acting_as_check" CHECK ((acting_as = ANY (ARRAY['personal'::text, 'org'::text]))),
  CONSTRAINT "conversations_assigned_to_check" CHECK ((assigned_to = ANY (ARRAY['agent'::text, 'staff'::text]))),
  CONSTRAINT "conversations_channel_check" CHECK ((channel = ANY (ARRAY['whatsapp'::text, 'web'::text, 'api'::text]))),
  CONSTRAINT "conversations_pkey" PRIMARY KEY (id),
  CONSTRAINT "conversations_status_check" CHECK ((status = ANY (ARRAY['open'::text, 'closed'::text]))),
  CONSTRAINT "conversations_active_org_id_fkey" FOREIGN KEY (active_org_id) REFERENCES public.organizations(id),
  CONSTRAINT "conversations_org_id_fkey" FOREIGN KEY (org_id) REFERENCES public.organizations(id) ON DELETE CASCADE,
  CONSTRAINT "conversations_customer_id_fkey" FOREIGN KEY (customer_id) REFERENCES public.profiles(id)
);

ALTER TABLE "public"."conversations"
  ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."conversations"
  ADD COLUMN "identity_key" text GENERATED ALWAYS AS (COALESCE(lower(wa_jid), customer_phone, (customer_id)::text)) STORED;

ALTER TABLE "public"."conversations"
  ADD CONSTRAINT "conversations_identity_check" CHECK ((identity_key IS NOT NULL));

CREATE UNIQUE INDEX conversations_open_identity_uq ON public.conversations USING btree (channel, identity_key)
  WHERE (status = 'open'::text);

CREATE INDEX conversations_wa_jid_idx ON public.conversations USING btree (wa_jid);

CREATE TRIGGER conversations_updated
  BEFORE UPDATE ON public.conversations
  FOR EACH ROW
  EXECUTE FUNCTION internal.set_updated_at();

CREATE POLICY "conversations_org" ON "public"."conversations"
  FOR ALL
  TO "authenticated"
  USING (public.has_org_role(org_id, VARIADIC ARRAY['owner'::public.org_role, 'admin'::public.org_role, 'manager'::public.org_role]))
  WITH CHECK (public.has_org_role(org_id, VARIADIC ARRAY['owner'::public.org_role, 'admin'::public.org_role, 'manager'::public.org_role]));

CREATE POLICY "conversations_self" ON "public"."conversations"
  FOR SELECT
  TO "authenticated"
  USING ((customer_id = auth.uid()));

CREATE POLICY "platform_admin_all_conversations" ON "public"."conversations"
  FOR ALL
  TO "authenticated"
  USING (public.is_platform_admin())
  WITH CHECK (public.is_platform_admin());

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."conversations" TO "anon", "authenticated", "postgres", "service_role";
