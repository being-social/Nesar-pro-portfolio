CREATE TABLE "public"."notification_preferences" (
  "user_id"    uuid                     NOT NULL,
  "email"      boolean                  NOT NULL DEFAULT true,
  "whatsapp"   boolean                  NOT NULL DEFAULT true,
  "sms"        boolean                  NOT NULL DEFAULT true,
  "push"       boolean                  NOT NULL DEFAULT true,
  "reminders"  boolean                  NOT NULL DEFAULT true,
  "marketing"  boolean                  NOT NULL DEFAULT false,
  "updated_at" timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT "notification_preferences_pkey" PRIMARY KEY (user_id),
  CONSTRAINT "notification_preferences_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE
);

ALTER TABLE "public"."notification_preferences"
  ENABLE ROW LEVEL SECURITY;

CREATE POLICY "notif_prefs_self" ON "public"."notification_preferences"
  FOR ALL
  TO "authenticated"
  USING ((user_id = auth.uid()))
  WITH CHECK ((user_id = auth.uid()));

CREATE POLICY "platform_admin_all_notification_preferences" ON "public"."notification_preferences"
  FOR ALL
  TO "authenticated"
  USING (public.is_platform_admin())
  WITH CHECK (public.is_platform_admin());

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."notification_preferences" TO "anon", "authenticated", "postgres", "service_role";
