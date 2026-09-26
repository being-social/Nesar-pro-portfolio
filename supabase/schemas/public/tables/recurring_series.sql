CREATE TABLE "public"."recurring_series" (
  "id"                  uuid                     NOT NULL DEFAULT gen_random_uuid(),
  "org_id"              uuid                     NOT NULL,
  "resource_id"         uuid                     NOT NULL,
  "session_template_id" uuid,
  "customer_id"         uuid,
  "rrule"               text                     NOT NULL,
  "start_date"          date                     NOT NULL,
  "status"              text                     NOT NULL DEFAULT 'active'::text,
  "created_at"          timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT "recurring_series_customer_id_fkey" FOREIGN KEY (customer_id) REFERENCES public.profiles(id),
  CONSTRAINT "recurring_series_org_id_fkey" FOREIGN KEY (org_id) REFERENCES public.organizations(id) ON DELETE CASCADE,
  CONSTRAINT "recurring_series_pkey" PRIMARY KEY (id),
  CONSTRAINT "recurring_series_status_check" CHECK ((status = ANY (ARRAY['active'::text, 'paused'::text, 'ended'::text]))),
  CONSTRAINT "recurring_series_resource_id_fkey" FOREIGN KEY (resource_id) REFERENCES public.resources(id),
  CONSTRAINT "recurring_series_session_template_id_fkey" FOREIGN KEY (session_template_id) REFERENCES public.session_templates(id)
);

ALTER TABLE "public"."recurring_series"
  ENABLE ROW LEVEL SECURITY;

CREATE POLICY "platform_admin_all_recurring_series" ON "public"."recurring_series"
  FOR ALL
  TO "authenticated"
  USING (public.is_platform_admin())
  WITH CHECK (public.is_platform_admin());

CREATE POLICY "series_read" ON "public"."recurring_series"
  FOR SELECT
  TO "authenticated"
  USING (((customer_id = auth.uid()) OR public.is_org_member(org_id)));

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."recurring_series" TO "anon", "authenticated", "postgres", "service_role";
