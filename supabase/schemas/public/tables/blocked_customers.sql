CREATE TABLE "public"."blocked_customers" (
  "org_id"     uuid                     NOT NULL,
  "user_id"    uuid                     NOT NULL,
  "reason"     text,
  "until"      timestamp with time zone,
  "created_by" uuid,
  "created_at" timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT "blocked_customers_pkey" PRIMARY KEY (org_id, user_id),
  CONSTRAINT "blocked_customers_org_id_fkey" FOREIGN KEY (org_id) REFERENCES public.organizations(id) ON DELETE CASCADE,
  CONSTRAINT "blocked_customers_created_by_fkey" FOREIGN KEY (created_by) REFERENCES public.profiles(id),
  CONSTRAINT "blocked_customers_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE
);

ALTER TABLE "public"."blocked_customers"
  ENABLE ROW LEVEL SECURITY;

CREATE POLICY "blocked_manage" ON "public"."blocked_customers"
  FOR ALL
  TO "authenticated"
  USING (public.has_org_role(org_id, VARIADIC ARRAY['owner'::public.org_role, 'admin'::public.org_role, 'manager'::public.org_role]))
  WITH CHECK (public.has_org_role(org_id, VARIADIC ARRAY['owner'::public.org_role, 'admin'::public.org_role, 'manager'::public.org_role]));

CREATE POLICY "platform_admin_all_blocked_customers" ON "public"."blocked_customers"
  FOR ALL
  TO "authenticated"
  USING (public.is_platform_admin())
  WITH CHECK (public.is_platform_admin());

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."blocked_customers" TO "anon", "authenticated", "postgres", "service_role";
