CREATE TABLE "public"."platform_settings" (
  "key"        text                     NOT NULL,
  "value"      jsonb                    NOT NULL,
  "updated_at" timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT "platform_settings_pkey" PRIMARY KEY (key)
);

ALTER TABLE "public"."platform_settings"
  ENABLE ROW LEVEL SECURITY;

CREATE POLICY "platform_admin_all_platform_settings" ON "public"."platform_settings"
  FOR ALL
  TO "authenticated"
  USING (public.is_platform_admin())
  WITH CHECK (public.is_platform_admin());

CREATE POLICY "settings_none" ON "public"."platform_settings"
  FOR SELECT
  TO "authenticated"
  USING (public.is_platform_admin());

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."platform_settings" TO "anon", "authenticated", "postgres", "service_role";
