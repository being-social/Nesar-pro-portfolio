CREATE TABLE "public"."holidays" (
  "id"        uuid    NOT NULL DEFAULT gen_random_uuid(),
  "org_id"    uuid,
  "d"         date    NOT NULL,
  "name"      text    NOT NULL,
  "is_active" boolean NOT NULL DEFAULT true,
  CONSTRAINT "holidays_pkey" PRIMARY KEY (id),
  CONSTRAINT "holidays_org_id_fkey" FOREIGN KEY (org_id) REFERENCES public.organizations(id) ON DELETE CASCADE
);

ALTER TABLE "public"."holidays"
  ENABLE ROW LEVEL SECURITY;

CREATE INDEX holidays_date_idx ON public.holidays USING btree (d)
  WHERE is_active;

CREATE UNIQUE INDEX holidays_org_date_uq ON public.holidays USING btree (COALESCE(org_id, '00000000-0000-0000-0000-000000000000'::uuid), d);

CREATE POLICY "holidays_manage" ON "public"."holidays"
  FOR ALL
  TO "authenticated"
  USING (((org_id IS NOT NULL) AND public.has_org_role(org_id, VARIADIC ARRAY['owner'::public.org_role, 'admin'::public.org_role, 'manager'::public.org_role])))
  WITH CHECK (((org_id IS NOT NULL) AND public.has_org_role(org_id, VARIADIC ARRAY['owner'::public.org_role, 'admin'::public.org_role, 'manager'::public.org_role])));

CREATE POLICY "holidays_read" ON "public"."holidays"
  FOR SELECT
  TO "anon", "authenticated"
  USING (((org_id IS NULL) OR public.is_org_member(org_id)));

CREATE POLICY "platform_admin_all_holidays" ON "public"."holidays"
  FOR ALL
  TO "authenticated"
  USING (public.is_platform_admin())
  WITH CHECK (public.is_platform_admin());

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."holidays" TO "anon", "authenticated", "postgres", "service_role";
