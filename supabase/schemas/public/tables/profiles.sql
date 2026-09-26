CREATE TABLE "public"."profiles" (
  "id"                uuid                     NOT NULL,
  "full_name"         text                     NOT NULL DEFAULT ''::text,
  "email"             extensions.citext,
  "phone"             text,
  "phone_verified_at" timestamp with time zone,
  "organization_name" text,
  "city"              text,
  "avatar_url"        text,
  "is_platform_admin" boolean                  NOT NULL DEFAULT false,
  "consent_version"   text,
  "consented_at"      timestamp with time zone,
  "marketing_opt_in"  boolean                  NOT NULL DEFAULT false,
  "last_seen_at"      timestamp with time zone,
  "deleted_at"        timestamp with time zone,
  "created_at"        timestamp with time zone NOT NULL DEFAULT now(),
  "updated_at"        timestamp with time zone NOT NULL DEFAULT now(),
  "wa_jid"            text,
  CONSTRAINT "profiles_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE,
  CONSTRAINT "profiles_phone_e164" CHECK (((phone IS NULL) OR (phone ~ '^\+[1-9][0-9]{7,14}$'::text))),
  CONSTRAINT "profiles_pkey" PRIMARY KEY (id)
);

ALTER TABLE "public"."profiles"
  ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."profiles"
  ADD COLUMN "customer_type" public.customer_type NOT NULL DEFAULT 'individual'::public.customer_type;

CREATE UNIQUE INDEX profiles_email_uq ON public.profiles USING btree (email)
  WHERE ((email IS NOT NULL) AND (deleted_at IS NULL));

CREATE UNIQUE INDEX profiles_phone_uq ON public.profiles USING btree (phone)
  WHERE ((phone IS NOT NULL) AND (deleted_at IS NULL));

CREATE UNIQUE INDEX profiles_wa_jid_uq ON public.profiles USING btree (wa_jid)
  WHERE (wa_jid IS NOT NULL);

CREATE TRIGGER profiles_protect
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION internal.protect_profile_fields();

CREATE TRIGGER profiles_updated
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION internal.set_updated_at();

CREATE POLICY "platform_admin_all_profiles" ON "public"."profiles"
  FOR ALL
  TO "authenticated"
  USING (public.is_platform_admin())
  WITH CHECK (public.is_platform_admin());

CREATE POLICY "profiles_auth_admin" ON "public"."profiles"
  FOR SELECT
  TO "supabase_auth_admin"
  USING (true);

CREATE POLICY "profiles_self_select" ON "public"."profiles"
  FOR SELECT
  TO "authenticated"
  USING ((id = auth.uid()));

CREATE POLICY "profiles_self_update" ON "public"."profiles"
  FOR UPDATE
  TO "authenticated"
  USING ((id = auth.uid()))
  WITH CHECK ((id = auth.uid()));

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."profiles" TO "anon", "authenticated", "postgres", "service_role";

GRANT SELECT ON TABLE "public"."profiles" TO "supabase_auth_admin";
