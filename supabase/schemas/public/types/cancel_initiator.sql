CREATE TYPE "public"."cancel_initiator" AS ENUM (
  'customer',
  'owner',
  'platform',
  'system',
  'weather'
);

GRANT USAGE ON TYPE "public"."cancel_initiator" TO "postgres";
