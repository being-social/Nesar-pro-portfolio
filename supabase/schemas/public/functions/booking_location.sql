CREATE OR REPLACE FUNCTION public.booking_location (
  p_booking_id uuid
)
  RETURNS jsonb
  LANGUAGE plpgsql
  SECURITY DEFINER
  SET search_path TO 'public'
  AS $function$
declare b public.bookings; v public.venues; full_access boolean;
begin
  select * into b from public.bookings where id = p_booking_id;
  if not found then raise exception 'NOT_FOUND'; end if;
  select * into v from public.venues where id = b.venue_id;
  full_access := public.is_platform_admin() or public.is_org_member(b.org_id)
                 or (b.customer_id = auth.uid() and b.status in ('confirmed','checked_in','completed'));
  if full_access then
    return jsonb_build_object('precision','exact',
      'address', trim(both ', ' from concat_ws(', ', v.address_line1, v.address_line2, v.city, v.pincode)),
      'lat', v.lat, 'lng', v.lng, 'directions', v.private_directions,
      'maps_url', case when v.lat is not null and v.lng is not null
        then 'https://maps.google.com/?q=' || v.lat || ',' || v.lng else null end);
  end if;
  return jsonb_build_object('precision','area','area_label', coalesce(v.area_label, v.city),
      'lat', case when v.lat is not null then round(v.lat::numeric, 2) else null end,
      'lng', case when v.lng is not null then round(v.lng::numeric, 2) else null end);   -- ~±1 km
end $function$;

GRANT EXECUTE ON FUNCTION "public"."booking_location"(uuid) TO PUBLIC, "anon", "authenticated", "postgres", "service_role";
