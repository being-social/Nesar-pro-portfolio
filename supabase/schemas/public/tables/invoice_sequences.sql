CREATE TABLE "public"."invoice_sequences" (
  "org_id"  uuid    NOT NULL,
  "fy"      text    NOT NULL,
  "last_no" integer NOT NULL DEFAULT 0,
  CONSTRAINT "invoice_sequences_pkey" PRIMARY KEY (org_id, fy),
  CONSTRAINT "invoice_sequences_org_id_fkey" FOREIGN KEY (org_id) REFERENCES public.organizations(id) ON DELETE CASCADE
);

ALTER TABLE "public"."invoice_sequences"
  ENABLE ROW LEVEL SECURITY;

CREATE POLICY "platform_admin_all_invoice_sequences" ON "public"."invoice_sequences"
  FOR ALL
  TO "authenticated"
  USING (public.is_platform_admin())
  WITH CHECK (public.is_platform_admin());

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."invoice_sequences" TO "anon", "authenticated", "postgres", "service_role";
