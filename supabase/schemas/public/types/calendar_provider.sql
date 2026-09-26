CREATE TYPE "public"."calendar_provider" AS ENUM (
  'google',
  'microsoft'
);

GRANT USAGE ON TYPE "public"."calendar_provider" TO "postgres";
