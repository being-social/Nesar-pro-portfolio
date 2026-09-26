CREATE TABLE "public"."data_requests" (
  "id"           uuid                     NOT NULL DEFAULT gen_random_uuid(),
  "user_id"      uuid                     NOT NULL,
  "export_path"  text,
  "note"         text,
  "requested_at" timestamp with time zone NOT NULL DEFAULT now(),
  "completed_at" timestamp with time zone,
  CONSTRAINT "data_requests_pkey" PRIMARY KEY (id),
  CONSTRAINT "data_requests_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE
);

ALTER TABLE "public"."data_requests"
  ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."data_requests"
  ADD COLUMN "kind" public.data_request_kind NOT NULL;

ALTER TABLE "public"."data_requests"
  ADD COLUMN "status" public.data_request_status NOT NULL DEFAULT 'requested'::public.data_request_status;

CREATE POLICY "data_requests_self" ON "public"."data_requests"
  FOR ALL
  TO "authenticated"
  USING ((user_id = auth.uid()))
  WITH CHECK ((user_id = auth.uid()));

CREATE POLICY "platform_admin_all_data_requests" ON "public"."data_requests"
  FOR ALL
  TO "authenticated"
  USING (public.is_platform_admin())
  WITH CHECK (public.is_platform_admin());

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."data_requests" TO "anon", "authenticated", "postgres", "service_role";
