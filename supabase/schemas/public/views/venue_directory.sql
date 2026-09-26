CREATE VIEW "public"."venue_directory" AS  SELECT v.id,
    v.slug,
    v.name,
    v.tagline,
    v.city,
    v.state,
    v.pincode,
    v.lat,
    v.lng,
    v.timezone,
    v.amenities,
    v.photos,
    o.display_name AS org_name,
    o.slug AS org_slug,
    o.cancellation_policy,
    o.min_notice_hours,
    o.max_advance_days,
    o.advance_percent,
    o.gst_registered,
    o.prices_include_gst,
    ( SELECT min(p.amount) AS min
           FROM public.pricing_rules p
          WHERE ((p.venue_id = v.id) AND p.is_active AND (p.deleted_at IS NULL) AND (p.scope = 'base'::public.pricing_scope))) AS from_amount,
    ( SELECT array_agg(vs.sport_code) AS array_agg
           FROM public.venue_sports vs
          WHERE (vs.venue_id = v.id)) AS sports
   FROM (public.venues v
     JOIN public.organizations o ON ((o.id = v.org_id)))
  WHERE ((v.status = 'active'::public.venue_status) AND (v.deleted_at IS NULL) AND (o.status = 'active'::public.org_status));

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."venue_directory" TO "anon", "authenticated", "postgres", "service_role";
