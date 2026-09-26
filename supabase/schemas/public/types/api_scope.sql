CREATE TYPE "public"."api_scope" AS ENUM (
  'venues:read',
  'availability:read',
  'quote:read',
  'holds:write',
  'bookings:read',
  'bookings:cancel_request',
  'payment_links:write',
  'messages:write',
  'webhooks:manage'
);

GRANT USAGE ON TYPE "public"."api_scope" TO "postgres";
