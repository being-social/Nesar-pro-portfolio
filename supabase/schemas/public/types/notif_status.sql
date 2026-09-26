CREATE TYPE "public"."notif_status" AS ENUM (
  'queued',
  'sending',
  'sent',
  'delivered',
  'failed',
  'skipped',
  'dead'
);

GRANT USAGE ON TYPE "public"."notif_status" TO "postgres";
