CREATE TYPE "public"."payout_status" AS ENUM (
  'pending',
  'on_hold',
  'processing',
  'settled',
  'reversed',
  'failed',
  'manual'
);

GRANT USAGE ON TYPE "public"."payout_status" TO "postgres";
