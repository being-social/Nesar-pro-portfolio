CREATE TABLE "public"."notifications" (
  "id"                  bigint                   NOT NULL DEFAULT nextval('public.notifications_id_seq'::regclass),
  "org_id"              uuid,
  "recipient_id"        uuid,
  "recipient_phone"     text,
  "recipient_email"     extensions.citext,
  "template"            text                     NOT NULL,
  "dedupe_key"          text                     NOT NULL,
  "payload"             jsonb                    NOT NULL DEFAULT '{}'::jsonb,
  "booking_id"          uuid,
  "scheduled_for"       timestamp with time zone NOT NULL DEFAULT now(),
  "attempts"            integer                  NOT NULL DEFAULT 0,
  "next_attempt_at"     timestamp with time zone DEFAULT now(),
  "provider_message_id" text,
  "last_error"          text,
  "sent_at"             timestamp with time zone,
  "delivered_at"        timestamp with time zone,
  "created_at"          timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT "notifications_booking_id_fkey" FOREIGN KEY (booking_id) REFERENCES public.bookings(id) ON DELETE SET NULL,
  CONSTRAINT "notifications_dedupe_key_key" UNIQUE (dedupe_key),
  CONSTRAINT "notifications_pkey" PRIMARY KEY (id),
  CONSTRAINT "notifications_org_id_fkey" FOREIGN KEY (org_id) REFERENCES public.organizations(id) ON DELETE CASCADE,
  CONSTRAINT "notifications_recipient_id_fkey" FOREIGN KEY (recipient_id) REFERENCES public.profiles(id) ON DELETE CASCADE
);

ALTER TABLE "public"."notifications"
  ENABLE ROW LEVEL SECURITY;

ALTER SEQUENCE "public"."notifications_id_seq" OWNED BY "public"."notifications"."id";

ALTER TABLE "public"."notifications"
  ADD COLUMN "channel" public.notif_channel NOT NULL;

ALTER TABLE "public"."notifications"
  ADD COLUMN "status" public.notif_status NOT NULL DEFAULT 'queued'::public.notif_status;

CREATE INDEX notifications_due_idx ON public.notifications USING btree (next_attempt_at)
  WHERE (status = ANY (ARRAY['queued'::public.notif_status, 'failed'::public.notif_status, 'sending'::public.notif_status]));

CREATE TRIGGER notifications_fill_owner
  BEFORE INSERT ON public.notifications
  FOR EACH ROW
  EXECUTE FUNCTION internal.fill_owner_recipient();

CREATE POLICY "notifications_self_read" ON "public"."notifications"
  FOR SELECT
  TO "authenticated"
  USING (((recipient_id = auth.uid()) OR public.has_org_role(org_id, VARIADIC ARRAY['owner'::public.org_role, 'admin'::public.org_role])));

CREATE POLICY "platform_admin_all_notifications" ON "public"."notifications"
  FOR ALL
  TO "authenticated"
  USING (public.is_platform_admin())
  WITH CHECK (public.is_platform_admin());

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."notifications" TO "anon", "authenticated", "postgres", "service_role";
