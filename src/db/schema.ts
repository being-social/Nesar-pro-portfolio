// DB Schema definition for Neon Postgres / Drizzle ORM
export interface Lead {
  id: string;
  created_at: string;
  name: string;
  email: string;
  company?: string;
  role?: string;
  reason: string;
  source?: string;
  posthog_distinct_id?: string;
  consent_version: string;
}

export interface ContactMessage {
  id: string;
  created_at: string;
  lead_id: string;
  message: string;
  status: "pending" | "sent" | "failed";
}

export interface HermesSession {
  id: string;
  created_at: string;
  lead_id?: string;
  session_token_hash: string;
  mode: "hosted" | "local";
}

export interface HermesFeedback {
  id: string;
  created_at: string;
  session_id: string;
  message_id: string;
  rating: "up" | "down";
  reason?: string;
}
