CREATE OR REPLACE FUNCTION test.set_auth (
  p_user uuid
)
  RETURNS void
  LANGUAGE plpgsql
  AS $function$
begin
  perform set_config('role', 'authenticated', true);
  perform set_config('request.jwt.claim.sub', p_user::text, true);
end $function$;

GRANT EXECUTE ON FUNCTION "test"."set_auth"(uuid) TO "postgres";
