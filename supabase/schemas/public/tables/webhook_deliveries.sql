CREATE TABLE "public"."webhook_deliveries" (
  "id"              bigint                   NOT NULL DEFAULT nextval('public.webhook_deliveries_id_seq'::regclass),
  "endpoint_id"     uuid                     NOT NULL,
  "event"           text                     NOT NULL,
  "event_key"       text                     NOT NULL,
  "payload"         jsonb                    NOT NULL,
  "attempts"        integer                  NOT NULL DEFAULT 0,
  "next_attempt_at" timestamp with time zone DEFAULT now(),
  "last_status"     integer,
  "last_error"      text,
  "delivered_at"    timestamp with time zone,
  "dead_at"         timestamp with time zone,
  "created_at"      timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT "webhook_deliveries_endpoint_id_event_key_key" UNIQUE (endpoint_id, event_key),
  CONSTRAINT "webhook_deliveries_pkey" PRIMARY KEY (id),
  CONSTRAINT "webhook_deliveries_endpoint_id_fkey" FOREIGN KEY (endpoint_id) REFERENCES public.webhook_endpoints(id) ON DELETE CASCADE
);

ALTER TABLE "public"."webhook_deliveries"
  ENABLE ROW LEVEL SECURITY;

ALTER SEQUENCE "public"."webhook_deliveries_id_seq" OWNED BY "public"."webhook_deliveries"."id";

CREATE INDEX wd_pending_idx ON public.webhook_deliveries USING btree (next_attempt_at)
  WHERE ((delivered_at IS NULL) AND (dead_at IS NULL));

CREATE POLICY "platform_admin_all_webhook_deliveries" ON "public"."webhook_deliveries"
  FOR ALL
  TO "authenticated"
  USING (public.is_platform_admin())
  WITH CHECK (public.is_platform_admin());

CREATE POLICY "webhook_deliveries_org" ON "public"."webhook_deliveries"
  FOR SELECT
  TO "authenticated"
  USING ((EXISTS ( SELECT 1
   FROM public.webhook_endpoints e
  WHERE ((e.id = webhook_deliveries.endpoint_id) AND public.has_org_role(e.org_id, VARIADIC ARRAY['owner'::public.org_role, 'admin'::public.org_role])))));

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."webhook_deliveries" TO "anon", "authenticated", "postgres", "service_role";
