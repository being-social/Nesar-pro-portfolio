CREATE TABLE "public"."organization_members" (
  "org_id"     uuid                     NOT NULL,
  "user_id"    uuid                     NOT NULL,
  "title"      text,
  "invited_by" uuid,
  "joined_at"  timestamp with time zone NOT NULL DEFAULT now(),
  "removed_at" timestamp with time zone,
  CONSTRAINT "organization_members_pkey" PRIMARY KEY (org_id, user_id),
  CONSTRAINT "organization_members_org_id_fkey" FOREIGN KEY (org_id) REFERENCES public.organizations(id) ON DELETE CASCADE,
  CONSTRAINT "organization_members_invited_by_fkey" FOREIGN KEY (invited_by) REFERENCES public.profiles(id),
  CONSTRAINT "organization_members_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE
);

ALTER TABLE "public"."organization_members"
  ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."organization_members"
  ADD COLUMN "role" public.org_role NOT NULL;

CREATE INDEX org_members_user_idx ON public.organization_members USING btree (user_id)
  WHERE (removed_at IS NULL);

CREATE POLICY "members_manage" ON "public"."organization_members"
  FOR ALL
  TO "authenticated"
  USING (public.has_org_role(org_id, VARIADIC ARRAY['owner'::public.org_role, 'admin'::public.org_role]))
  WITH CHECK ((public.has_org_role(org_id, VARIADIC ARRAY['owner'::public.org_role, 'admin'::public.org_role]) AND (role <> 'owner'::public.org_role)));

CREATE POLICY "members_read" ON "public"."organization_members"
  FOR SELECT
  TO "authenticated"
  USING ((public.is_org_member(org_id) OR (user_id = auth.uid())));

CREATE POLICY "org_members_auth_admin" ON "public"."organization_members"
  FOR SELECT
  TO "supabase_auth_admin"
  USING (true);

CREATE POLICY "platform_admin_all_organization_members" ON "public"."organization_members"
  FOR ALL
  TO "authenticated"
  USING (public.is_platform_admin())
  WITH CHECK (public.is_platform_admin());

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."organization_members" TO "anon", "authenticated", "postgres", "service_role";

GRANT SELECT ON TABLE "public"."organization_members" TO "supabase_auth_admin";
