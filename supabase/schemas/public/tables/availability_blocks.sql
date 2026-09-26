CREATE TABLE "public"."availability_blocks" (
  "id"          uuid                     NOT NULL DEFAULT gen_random_uuid(),
  "org_id"      uuid                     NOT NULL,
  "venue_id"    uuid                     NOT NULL,
  "resource_id" uuid                     NOT NULL,
  "period"      tstzrange                NOT NULL,
  "title"       text,
  "note"        text,
  "created_by"  uuid,
  "deleted_at"  timestamp with time zone,
  "created_at"  timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT "availability_blocks_pkey" PRIMARY KEY (id),
  CONSTRAINT "blocks_no_overlap" EXCLUDE USING gist (resource_id WITH =, period WITH &&) WHERE ((deleted_at IS NULL)),
  CONSTRAINT "availability_blocks_org_id_fkey" FOREIGN KEY (org_id) REFERENCES public.organizations(id) ON DELETE CASCADE,
  CONSTRAINT "availability_blocks_created_by_fkey" FOREIGN KEY (created_by) REFERENCES public.profiles(id),
  CONSTRAINT "availability_blocks_resource_id_fkey" FOREIGN KEY (resource_id) REFERENCES public.resources(id) ON DELETE CASCADE,
  CONSTRAINT "availability_blocks_venue_id_fkey" FOREIGN KEY (venue_id) REFERENCES public.venues(id) ON DELETE CASCADE
);

ALTER TABLE "public"."availability_blocks"
  ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."availability_blocks"
  ADD COLUMN "kind" public.block_kind NOT NULL DEFAULT 'maintenance'::public.block_kind;

CREATE INDEX blocks_resource_idx ON public.availability_blocks USING gist (resource_id, period)
  WHERE (deleted_at IS NULL);

CREATE TRIGGER audit_blocks
  AFTER INSERT OR DELETE OR UPDATE ON public.availability_blocks
  FOR EACH ROW
  EXECUTE FUNCTION internal.audit_row();

CREATE TRIGGER blocks_before_write
  BEFORE INSERT OR UPDATE ON public.availability_blocks
  FOR EACH ROW
  EXECUTE FUNCTION internal.blocks_before_write();

CREATE TRIGGER blocks_broadcast
  AFTER INSERT OR DELETE OR UPDATE ON public.availability_blocks
  FOR EACH ROW
  EXECUTE FUNCTION internal.broadcast_availability();

CREATE POLICY "blocks_member_all" ON "public"."availability_blocks"
  FOR ALL
  TO "authenticated"
  USING (public.is_org_member(org_id))
  WITH CHECK (public.has_org_role(org_id, VARIADIC ARRAY['owner'::public.org_role, 'admin'::public.org_role, 'manager'::public.org_role]));

CREATE POLICY "platform_admin_all_availability_blocks" ON "public"."availability_blocks"
  FOR ALL
  TO "authenticated"
  USING (public.is_platform_admin())
  WITH CHECK (public.is_platform_admin());

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."availability_blocks" TO "anon", "authenticated", "postgres", "service_role";
