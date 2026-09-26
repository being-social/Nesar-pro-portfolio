CREATE TYPE "public"."data_request_kind" AS ENUM (
  'export',
  'delete'
);

GRANT USAGE ON TYPE "public"."data_request_kind" TO "postgres";
