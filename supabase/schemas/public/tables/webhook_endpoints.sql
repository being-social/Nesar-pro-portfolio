CREATE TABLE "public"."webhook_endpoints" (
  "id"              uuid                     NOT NULL DEFAULT gen_random_uuid(),
  "org_id"          uuid                     NOT NULL,
  "url"             text                     NOT NULL,
  "secret_enc"      bytea                    NOT NULL,
  "events"          text[]                   NOT NULL,
  "description"     text,
  "is_active"       boolean                  NOT NULL DEFAULT true,
  "failure_count"   integer                  NOT NULL DEFAULT 0,
  "disabled_reason" text,
  "created_by"      uuid,
  "created_at"      timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT "webhook_endpoints_created_by_fkey" FOREIGN KEY (created_by) REFERENCES public.profiles(id),
  CONSTRAINT "webhook_endpoints_org_id_fkey" FOREIGN KEY (org_id) REFERENCES public.organizations(id) ON DELETE CASCADE,
  CONSTRAINT "webhook_endpoints_pkey" PRIMARY KEY (id),
  CONSTRAINT "webhook_url_https" CHECK ((url ~* '^https://'::text))
);

ALTER TABLE "public"."webhook_endpoints"
  ENABLE ROW LEVEL SECURITY;

CREATE POLICY "platform_admin_all_webhook_endpoints" ON "public"."webhook_endpoints"
  FOR ALL
  TO "authenticated"
  USING (public.is_platform_admin())
  WITH CHECK (public.is_platform_admin());

CREATE POLICY "webhooks_org" ON "public"."webhook_endpoints"
  FOR ALL
  TO "authenticated"
  USING (public.has_org_role(org_id, VARIADIC ARRAY['owner'::public.org_role, 'admin'::public.org_role]))
  WITH CHECK (public.has_org_role(org_id, VARIADIC ARRAY['owner'::public.org_role, 'admin'::public.org_role]));

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."webhook_endpoints" TO "anon", "authenticated", "postgres", "service_role";
