export type AnalyticsEvent =
  | { name: "page_viewed"; properties: { path: string; title?: string } }
  | { name: "nav_item_selected"; properties: { item: string; href: string } }
  | { name: "project_opened"; properties: { project_slug: string; company: string } }
  | { name: "project_section_viewed"; properties: { project_slug: string; section_id: string } }
  | { name: "motion_index_viewed"; properties: { filter?: string } }
  | { name: "motion_piece_opened"; properties: { motion_slug: string; title: string } }
  | { name: "motion_preview_started"; properties: { motion_slug: string } }
  | { name: "motion_replayed"; properties: { motion_slug: string } }
  | { name: "lab_item_opened"; properties: { experiment_slug: string } }
  | { name: "experiment_interacted"; properties: { experiment_slug: string; action: string } }
  | { name: "theme_changed"; properties: { theme: "light" | "dark" } }
  | { name: "reduced_motion_detected"; properties: { enabled: boolean } }
  | { name: "contact_opened"; properties: { source?: string } }
  | { name: "contact_submitted"; properties: { reason: string; has_company: boolean } }
  | { name: "hermes_opened"; properties: { source: string } }
  | { name: "hermes_identity_submitted"; properties: { role_category?: string } }
  | { name: "hermes_prompt_submitted"; properties: { question_category: string } }
  | { name: "hermes_suggestion_selected"; properties: { chip_text: string } };

export function trackEvent(event: AnalyticsEvent) {
  if (typeof window === "undefined") return;

  // PostHog safety stub
  const posthog = (window as unknown as { posthog?: { capture: (name: string, props?: Record<string, unknown>) => void } }).posthog;

  if (posthog && typeof posthog.capture === "function") {
    posthog.capture(event.name, event.properties);
  } else {
    // Development safe logger
    if (process.env.NODE_ENV === "development") {
      console.log(`[Analytics: ${event.name}]`, event.properties);
    }
  }
}
