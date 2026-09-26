CREATE TYPE "public"."block_kind" AS ENUM (
  'maintenance',
  'private_event',
  'weather',
  'holiday',
  'other'
);

GRANT USAGE ON TYPE "public"."block_kind" TO "postgres";
