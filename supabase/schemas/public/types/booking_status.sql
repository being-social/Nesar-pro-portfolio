CREATE TYPE "public"."booking_status" AS ENUM (
  'held',
  'pending_payment',
  'confirmed',
  'checked_in',
  'completed',
  'cancelled',
  'no_show',
  'expired'
);

GRANT USAGE ON TYPE "public"."booking_status" TO "postgres";
