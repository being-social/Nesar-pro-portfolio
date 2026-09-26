CREATE TABLE "public"."audit_log" (
  "id"         bigint                   NOT NULL DEFAULT nextval('public.audit_log_id_seq'::regclass),
  "org_id"     uuid,
  "actor_id"   uuid,
  "actor_kind" text                     NOT NULL DEFAULT 'user'::text,
  "action"     text                     NOT NULL,
  "table_name" text,
  "row_id"     text,
  "before"     jsonb,
  "after"      jsonb,
  "ip"         inet,
  "user_agent" text,
  "created_at" timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT "audit_log_pkey" PRIMARY KEY (id)
);

ALTER TABLE "public"."audit_log"
  ENABLE ROW LEVEL SECURITY;

ALTER SEQUENCE "public"."audit_log_id_seq" OWNED BY "public"."audit_log"."id";

CREATE INDEX audit_org_time_idx ON public.audit_log USING btree (org_id, created_at DESC);

CREATE POLICY "audit_org_read" ON "public"."audit_log"
  FOR SELECT
  TO "authenticated"
  USING (public.has_org_role(org_id, VARIADIC ARRAY['owner'::public.org_role, 'admin'::public.org_role]));

CREATE POLICY "platform_admin_all_audit_log" ON "public"."audit_log"
  FOR ALL
  TO "authenticated"
  USING (public.is_platform_admin())
  WITH CHECK (public.is_platform_admin());

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."audit_log" TO "anon", "authenticated", "postgres", "service_role";
