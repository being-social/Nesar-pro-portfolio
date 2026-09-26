CREATE TABLE "public"."organization_invites" (
  "id"          uuid                     NOT NULL DEFAULT gen_random_uuid(),
  "org_id"      uuid                     NOT NULL,
  "phone"       text,
  "email"       extensions.citext,
  "token_hash"  text                     NOT NULL,
  "invited_by"  uuid,
  "expires_at"  timestamp with time zone NOT NULL DEFAULT (now() + '7 days'::interval),
  "accepted_by" uuid,
  "accepted_at" timestamp with time zone,
  "created_at"  timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT "invite_target" CHECK (((phone IS NOT NULL) OR (email IS NOT NULL))),
  CONSTRAINT "organization_invites_pkey" PRIMARY KEY (id),
  CONSTRAINT "organization_invites_token_hash_key" UNIQUE (token_hash),
  CONSTRAINT "organization_invites_org_id_fkey" FOREIGN KEY (org_id) REFERENCES public.organizations(id) ON DELETE CASCADE,
  CONSTRAINT "organization_invites_accepted_by_fkey" FOREIGN KEY (accepted_by) REFERENCES public.profiles(id),
  CONSTRAINT "organization_invites_invited_by_fkey" FOREIGN KEY (invited_by) REFERENCES public.profiles(id)
);

ALTER TABLE "public"."organization_invites"
  ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."organization_invites"
  ADD COLUMN "role" public.org_role NOT NULL;

CREATE POLICY "invites_manage" ON "public"."organization_invites"
  FOR ALL
  TO "authenticated"
  USING (public.has_org_role(org_id, VARIADIC ARRAY['owner'::public.org_role, 'admin'::public.org_role]))
  WITH CHECK (public.has_org_role(org_id, VARIADIC ARRAY['owner'::public.org_role, 'admin'::public.org_role]));

CREATE POLICY "platform_admin_all_organization_invites" ON "public"."organization_invites"
  FOR ALL
  TO "authenticated"
  USING (public.is_platform_admin())
  WITH CHECK (public.is_platform_admin());

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."organization_invites" TO "anon", "authenticated", "postgres", "service_role";
