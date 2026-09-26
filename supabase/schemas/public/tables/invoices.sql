CREATE TABLE "public"."invoices" (
  "id"                uuid                     NOT NULL DEFAULT gen_random_uuid(),
  "org_id"            uuid                     NOT NULL,
  "booking_id"        uuid                     NOT NULL,
  "kind"              text                     NOT NULL DEFAULT 'tax_invoice'::text,
  "number"            text                     NOT NULL,
  "fy"                text                     NOT NULL,
  "issued_on"         date                     NOT NULL DEFAULT CURRENT_DATE,
  "seller_name"       text                     NOT NULL,
  "seller_gstin"      text,
  "seller_address"    text,
  "seller_state_code" character(2),
  "buyer_name"        text                     NOT NULL,
  "buyer_gstin"       text,
  "buyer_state_code"  character(2),
  "sac_code"          text                     NOT NULL DEFAULT '999659'::text,
  "taxable_value"     bigint                   NOT NULL,
  "cgst"              bigint                   NOT NULL DEFAULT 0,
  "sgst"              bigint                   NOT NULL DEFAULT 0,
  "igst"              bigint                   NOT NULL DEFAULT 0,
  "total"             bigint                   NOT NULL,
  "place_of_supply"   text,
  "pdf_path"          text,
  "created_at"        timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT "invoices_booking_id_fkey" FOREIGN KEY (booking_id) REFERENCES public.bookings(id),
  CONSTRAINT "invoices_kind_check" CHECK ((kind = ANY (ARRAY['tax_invoice'::text, 'receipt'::text, 'credit_note'::text, 'commission_invoice'::text]))),
  CONSTRAINT "invoices_org_id_number_key" UNIQUE (org_id, number),
  CONSTRAINT "invoices_pkey" PRIMARY KEY (id),
  CONSTRAINT "invoices_org_id_fkey" FOREIGN KEY (org_id) REFERENCES public.organizations(id)
);

ALTER TABLE "public"."invoices"
  ENABLE ROW LEVEL SECURITY;

CREATE INDEX invoices_booking_idx ON public.invoices USING btree (booking_id);

CREATE UNIQUE INDEX invoices_booking_kind_uq ON public.invoices USING btree (booking_id, kind);

CREATE POLICY "invoices_customer_read" ON "public"."invoices"
  FOR SELECT
  TO "authenticated"
  USING ((EXISTS ( SELECT 1
   FROM public.bookings b
  WHERE ((b.id = invoices.booking_id) AND (b.customer_id = auth.uid())))));

CREATE POLICY "invoices_org_read" ON "public"."invoices"
  FOR SELECT
  TO "authenticated"
  USING (public.has_org_role(org_id, VARIADIC ARRAY['owner'::public.org_role, 'admin'::public.org_role, 'manager'::public.org_role]));

CREATE POLICY "platform_admin_all_invoices" ON "public"."invoices"
  FOR ALL
  TO "authenticated"
  USING (public.is_platform_admin())
  WITH CHECK (public.is_platform_admin());

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."invoices" TO "anon", "authenticated", "postgres", "service_role";
