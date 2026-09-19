export const env = {
  POSTHOG_KEY: process.env.NEXT_PUBLIC_POSTHOG_KEY || "",
  POSTHOG_HOST: process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://app.posthog.com",
  RESEND_API_KEY: process.env.RESEND_API_KEY || "",
  NEON_DATABASE_URL: process.env.DATABASE_URL || "",
  UPSTASH_REDIS_URL: process.env.UPSTASH_REDIS_URL || "",
  UPSTASH_REDIS_TOKEN: process.env.UPSTASH_REDIS_TOKEN || "",
  TURNSTILE_SITE_KEY: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "",
  TURNSTILE_SECRET_KEY: process.env.TURNSTILE_SECRET_KEY || "",
  KIMI_API_KEY: process.env.KIMI_API_KEY || "",
  IS_DEV: process.env.NODE_ENV !== "production",
};
