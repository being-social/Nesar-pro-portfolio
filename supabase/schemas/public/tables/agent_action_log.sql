CREATE TABLE "public"."agent_action_log" (
  "id"                    bigint                   NOT NULL DEFAULT nextval('public.agent_action_log_id_seq'::regclass),
  "org_id"                uuid                     NOT NULL,
  "api_key_id"            uuid,
  "action"                text                     NOT NULL,
  "request_id"            text,
  "idempotency_key"       text,
  "input"                 jsonb,
  "output"                jsonb,
  "status_code"           integer,
  "booking_id"            uuid,
  "requires_confirmation" boolean                  NOT NULL DEFAULT false,
  "confirmed_by"          uuid,
  "confirmed_at"          timestamp with time zone,
  "duration_ms"           integer,
  "created_at"            timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT "agent_action_log_pkey" PRIMARY KEY (id),
  CONSTRAINT "agent_action_log_api_key_id_fkey" FOREIGN KEY (api_key_id) REFERENCES public.api_keys(id),
  CONSTRAINT "agent_action_log_booking_id_fkey" FOREIGN KEY (booking_id) REFERENCES public.bookings(id),
  CONSTRAINT "agent_action_log_org_id_fkey" FOREIGN KEY (org_id) REFERENCES public.organizations(id) ON DELETE CASCADE,
  CONSTRAINT "agent_action_log_confirmed_by_fkey" FOREIGN KEY (confirmed_by) REFERENCES public.profiles(id)
);

ALTER TABLE "public"."agent_action_log"
  ENABLE ROW LEVEL SECURITY;

ALTER SEQUENCE "public"."agent_action_log_id_seq" OWNED BY "public"."agent_action_log"."id";

CREATE INDEX aal_org_time_idx ON public.agent_action_log USING btree (org_id, created_at DESC);

CREATE POLICY "agent_log_org" ON "public"."agent_action_log"
  FOR SELECT
  TO "authenticated"
  USING (public.has_org_role(org_id, VARIADIC ARRAY['owner'::public.org_role, 'admin'::public.org_role, 'manager'::public.org_role]));

CREATE POLICY "platform_admin_all_agent_action_log" ON "public"."agent_action_log"
  FOR ALL
  TO "authenticated"
  USING (public.is_platform_admin())
  WITH CHECK (public.is_platform_admin());

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."agent_action_log" TO "anon", "authenticated", "postgres", "service_role";
