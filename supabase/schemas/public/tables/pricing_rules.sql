CREATE TABLE "public"."pricing_rules" (
  "id"                  uuid                     NOT NULL DEFAULT gen_random_uuid(),
  "org_id"              uuid                     NOT NULL,
  "venue_id"            uuid                     NOT NULL,
  "resource_id"         uuid,
  "session_template_id" uuid,
  "name"                text                     NOT NULL,
  "days_of_week"        integer[],
  "date_from"           date,
  "date_to"             date,
  "hour_from"           time without time zone,
  "hour_to"             time without time zone,
  "amount"              bigint                   NOT NULL,
  "priority"            integer                  NOT NULL DEFAULT 0,
  "effective_from"      date,
  "effective_to"        date,
  "is_active"           boolean                  NOT NULL DEFAULT true,
  "deleted_at"          timestamp with time zone,
  "created_by"          uuid,
  "created_at"          timestamp with time zone NOT NULL DEFAULT now(),
  "updated_at"          timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT "pricing_rules_amount_check" CHECK ((amount >= 0)),
  CONSTRAINT "pricing_rules_org_id_fkey" FOREIGN KEY (org_id) REFERENCES public.organizations(id) ON DELETE CASCADE,
  CONSTRAINT "pricing_rules_pkey" PRIMARY KEY (id),
  CONSTRAINT "pricing_rules_created_by_fkey" FOREIGN KEY (created_by) REFERENCES public.profiles(id),
  CONSTRAINT "pricing_rules_resource_id_fkey" FOREIGN KEY (resource_id) REFERENCES public.resources(id) ON DELETE CASCADE,
  CONSTRAINT "pricing_rules_session_template_id_fkey" FOREIGN KEY (session_template_id) REFERENCES public.session_templates(id) ON DELETE CASCADE,
  CONSTRAINT "pricing_rules_venue_id_fkey" FOREIGN KEY (venue_id) REFERENCES public.venues(id) ON DELETE CASCADE
);

ALTER TABLE "public"."pricing_rules"
  ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."pricing_rules"
  ADD COLUMN "customer_type" public.customer_type;

ALTER TABLE "public"."pricing_rules"
  ADD COLUMN "scope" public.pricing_scope NOT NULL;

ALTER TABLE "public"."pricing_rules"
  ADD CONSTRAINT "pricing_scope_fields" CHECK (((scope = 'base'::public.pricing_scope) OR ((scope = 'day_of_week'::public.pricing_scope) AND (days_of_week IS
    NOT NULL) AND (array_length(days_of_week, 1) > 0)) OR ((scope = 'date'::public.pricing_scope) AND (date_from IS
    NOT NULL)) OR ((scope = 'date_range'::public.pricing_scope) AND (date_from IS NOT NULL) AND (date_to IS
    NOT NULL) AND (date_to >= date_from)) OR (scope = 'holiday'::public.pricing_scope) OR ((scope = 'customer_type'::public.pricing_scope) AND (customer_type IS
    NOT NULL)) OR ((scope = 'hour_range'::public.pricing_scope) AND (hour_from IS NOT NULL) AND (hour_to IS NOT NULL))));

CREATE INDEX pricing_rules_lookup_idx ON public.pricing_rules USING btree (venue_id, priority DESC)
  WHERE (is_active AND (deleted_at IS NULL));

CREATE TRIGGER audit_pricing_rules
  AFTER INSERT OR DELETE OR UPDATE ON public.pricing_rules
  FOR EACH ROW
  EXECUTE FUNCTION internal.audit_row();

CREATE TRIGGER pricing_rules_updated
  BEFORE UPDATE ON public.pricing_rules
  FOR EACH ROW
  EXECUTE FUNCTION internal.set_updated_at();

CREATE POLICY "platform_admin_all_pricing_rules" ON "public"."pricing_rules"
  FOR ALL
  TO "authenticated"
  USING (public.is_platform_admin())
  WITH CHECK (public.is_platform_admin());

CREATE POLICY "pricing_member_all" ON "public"."pricing_rules"
  FOR ALL
  TO "authenticated"
  USING (public.is_org_member(org_id))
  WITH CHECK (public.has_org_role(org_id, VARIADIC ARRAY['owner'::public.org_role, 'admin'::public.org_role]));

CREATE POLICY "pricing_public_read" ON "public"."pricing_rules"
  FOR SELECT
  TO "anon", "authenticated"
  USING ((is_active AND (deleted_at IS NULL) AND (EXISTS ( SELECT 1
   FROM public.venues v
  WHERE ((v.id = pricing_rules.venue_id) AND (v.status = 'active'::public.venue_status))))));

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."pricing_rules" TO "anon", "authenticated", "postgres", "service_role";
