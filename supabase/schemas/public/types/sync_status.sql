CREATE TYPE "public"."sync_status" AS ENUM (
  'pending',
  'synced',
  'failed',
  'needs_reauth',
  'deleted'
);

GRANT USAGE ON TYPE "public"."sync_status" TO "postgres";
