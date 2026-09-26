CREATE TABLE "public"."api_keys" (
  "id"                        uuid                     NOT NULL DEFAULT gen_random_uuid(),
  "org_id"                    uuid                     NOT NULL,
  "name"                      text                     NOT NULL,
  "key_prefix"                text                     NOT NULL,
  "key_hash"                  text                     NOT NULL,
  "rate_limit_per_minute"     integer                  NOT NULL DEFAULT 60,
  "agent_callback_url"        text,
  "agent_callback_secret_enc" bytea,
  "last_used_at"              timestamp with time zone,
  "expires_at"                timestamp with time zone,
  "revoked_at"                timestamp with time zone,
  "created_by"                uuid,
  "created_at"                timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT "api_keys_key_hash_key" UNIQUE (key_hash),
  CONSTRAINT "api_keys_pkey" PRIMARY KEY (id),
  CONSTRAINT "api_keys_org_id_fkey" FOREIGN KEY (org_id) REFERENCES public.organizations(id) ON DELETE CASCADE,
  CONSTRAINT "api_keys_created_by_fkey" FOREIGN KEY (created_by) REFERENCES public.profiles(id)
);

ALTER TABLE "public"."api_keys"
  ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."api_keys"
  ADD COLUMN "scopes" public.api_scope[] NOT NULL;

CREATE TRIGGER audit_api_keys
  AFTER INSERT OR UPDATE ON public.api_keys
  FOR EACH ROW
  EXECUTE FUNCTION internal.audit_row();

CREATE POLICY "api_keys_org" ON "public"."api_keys"
  FOR ALL
  TO "authenticated"
  USING (public.has_org_role(org_id, VARIADIC ARRAY['owner'::public.org_role, 'admin'::public.org_role]))
  WITH CHECK (public.has_org_role(org_id, VARIADIC ARRAY['owner'::public.org_role, 'admin'::public.org_role]));

CREATE POLICY "platform_admin_all_api_keys" ON "public"."api_keys"
  FOR ALL
  TO "authenticated"
  USING (public.is_platform_admin())
  WITH CHECK (public.is_platform_admin());

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."api_keys" TO "anon", "authenticated", "postgres", "service_role";
