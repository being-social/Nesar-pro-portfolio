CREATE TYPE "public"."data_request_status" AS ENUM (
  'requested',
  'processing',
  'completed',
  'rejected'
);

GRANT USAGE ON TYPE "public"."data_request_status" TO "postgres";
