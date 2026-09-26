CREATE TABLE "public"."feature_flags" (
  "key"        text                     NOT NULL,
  "org_id"     uuid,
  "enabled"    boolean                  NOT NULL DEFAULT false,
  "note"       text,
  "updated_at" timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT "feature_flags_org_id_fkey" FOREIGN KEY (org_id) REFERENCES public.organizations(id) ON DELETE CASCADE
);

ALTER TABLE "public"."feature_flags"
  ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."feature_flags"
  ADD COLUMN "org_key" uuid GENERATED ALWAYS AS (COALESCE(org_id, '00000000-0000-0000-0000-000000000000'::uuid)) STORED NOT NULL;

ALTER TABLE "public"."feature_flags"
  ADD CONSTRAINT "feature_flags_pkey" PRIMARY KEY (key, org_key);

CREATE POLICY "flags_read" ON "public"."feature_flags"
  FOR SELECT
  TO "anon", "authenticated"
  USING (true);

CREATE POLICY "platform_admin_all_feature_flags" ON "public"."feature_flags"
  FOR ALL
  TO "authenticated"
  USING (public.is_platform_admin())
  WITH CHECK (public.is_platform_admin());

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."feature_flags" TO "anon", "authenticated", "postgres", "service_role";
