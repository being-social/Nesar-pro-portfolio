CREATE TABLE "public"."venue_sports" (
  "venue_id"   uuid NOT NULL,
  "sport_code" text NOT NULL,
  CONSTRAINT "venue_sports_pkey" PRIMARY KEY (venue_id, sport_code),
  CONSTRAINT "venue_sports_sport_code_fkey" FOREIGN KEY (sport_code) REFERENCES public.sports(code),
  CONSTRAINT "venue_sports_venue_id_fkey" FOREIGN KEY (venue_id) REFERENCES public.venues(id) ON DELETE CASCADE
);

ALTER TABLE "public"."venue_sports"
  ENABLE ROW LEVEL SECURITY;

CREATE POLICY "platform_admin_all_venue_sports" ON "public"."venue_sports"
  FOR ALL
  TO "authenticated"
  USING (public.is_platform_admin())
  WITH CHECK (public.is_platform_admin());

CREATE POLICY "venue_sports_manage" ON "public"."venue_sports"
  FOR ALL
  TO "authenticated"
  USING ((EXISTS ( SELECT 1
   FROM public.venues v
  WHERE ((v.id = venue_sports.venue_id) AND public.has_org_role(v.org_id, VARIADIC ARRAY['owner'::public.org_role, 'admin'::public.org_role, 'manager'::public.org_role])))));

CREATE POLICY "venue_sports_read" ON "public"."venue_sports"
  FOR SELECT
  TO "anon", "authenticated"
  USING ((EXISTS ( SELECT 1
   FROM public.venues v
  WHERE ((v.id = venue_sports.venue_id) AND (v.status = 'active'::public.venue_status)))));

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."venue_sports" TO "anon", "authenticated", "postgres", "service_role";
