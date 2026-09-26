CREATE TABLE "public"."razorpay_webhook_events" (
  "event_id"     text                     NOT NULL,
  "org_id"       uuid,
  "event_type"   text                     NOT NULL,
  "payload"      jsonb                    NOT NULL,
  "received_at"  timestamp with time zone NOT NULL DEFAULT now(),
  "processed_at" timestamp with time zone,
  "status"       text                     NOT NULL DEFAULT 'received'::text,
  "error"        text,
  CONSTRAINT "razorpay_webhook_events_org_id_fkey" FOREIGN KEY (org_id) REFERENCES public.organizations(id),
  CONSTRAINT "razorpay_webhook_events_pkey" PRIMARY KEY (event_id),
  CONSTRAINT "razorpay_webhook_events_status_check" CHECK ((status = ANY (ARRAY['received'::text, 'processed'::text, 'ignored'::text, 'failed'::text])))
);

ALTER TABLE "public"."razorpay_webhook_events"
  ENABLE ROW LEVEL SECURITY;

CREATE INDEX rz_events_unprocessed_idx ON public.razorpay_webhook_events USING btree (received_at)
  WHERE (processed_at IS NULL);

CREATE POLICY "platform_admin_all_razorpay_webhook_events" ON "public"."razorpay_webhook_events"
  FOR ALL
  TO "authenticated"
  USING (public.is_platform_admin())
  WITH CHECK (public.is_platform_admin());

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."razorpay_webhook_events" TO "anon", "authenticated", "postgres", "service_role";
