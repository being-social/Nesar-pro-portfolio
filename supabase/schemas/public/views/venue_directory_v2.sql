CREATE VIEW "public"."venue_directory_v2" AS  SELECT id,
    org_id,
    slug,
    name,
    city,
    COALESCE(area_label, city) AS area_label,
        CASE
            WHEN (location_precision = 'exact'::text) THEN lat
            ELSE (round((lat)::numeric, 2))::double precision
        END AS lat,
        CASE
            WHEN (location_precision = 'exact'::text) THEN lng
            ELSE (round((lng)::numeric, 2))::double precision
        END AS lng,
    ((photos -> 0) ->> 'path'::text) AS cover_photo_url,
    amenities
   FROM public.venues v
  WHERE ((status = 'active'::public.venue_status) AND (deleted_at IS NULL));

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."venue_directory_v2" TO "anon", "authenticated", "postgres", "service_role";
