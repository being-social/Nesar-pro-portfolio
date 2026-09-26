CREATE TYPE "public"."session_kind" AS ENUM (
  'day',
  'night',
  'custom'
);

GRANT USAGE ON TYPE "public"."session_kind" TO "postgres";
