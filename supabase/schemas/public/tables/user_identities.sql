CREATE TABLE "public"."user_identities" (
  "id"          uuid                     NOT NULL DEFAULT gen_random_uuid(),
  "user_id"     uuid                     NOT NULL,
  "kind"        text                     NOT NULL,
  "value"       text                     NOT NULL,
  "verified_at" timestamp with time zone,
  "source"      text,
  "created_at"  timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT "user_identities_kind_check" CHECK ((kind = ANY (ARRAY['phone'::text, 'email'::text, 'wa_jid'::text, 'google'::text, 'apple'::text]))),
  CONSTRAINT "user_identities_kind_value_key" UNIQUE (kind, VALUE),
  CONSTRAINT "user_identities_pkey" PRIMARY KEY (id),
  CONSTRAINT "user_identities_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE
);

ALTER TABLE "public"."user_identities"
  ENABLE ROW LEVEL SECURITY;

CREATE INDEX user_identities_user_idx ON public.user_identities USING btree (user_id);

CREATE POLICY "platform_admin_all_user_identities" ON "public"."user_identities"
  FOR ALL
  TO "authenticated"
  USING (public.is_platform_admin())
  WITH CHECK (public.is_platform_admin());

CREATE POLICY "user_identities_self" ON "public"."user_identities"
  FOR SELECT
  TO "authenticated"
  USING ((user_id = auth.uid()));

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."user_identities" TO "anon", "authenticated", "postgres", "service_role";
