import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Motion Detail — Nesar",
  description: "Motion project details.",
  alternates: { canonical: "/motion/[slug]" }
};

export default function MotionDetailPage() {
  return (
    <div data-page-root="true" style={{maxWidth: "1200px", margin: "0 auto", padding: "clamp(120px,18vw,140px) 24px 0"}}>
      <h1 style={{fontSize: "clamp(32px,6vw,64px)", fontWeight: "500", lineHeight: "110%", letterSpacing: "-.05em", margin: "0", textAlign: "center"}}>
        Agent Insights launch film
      </h1>
      <p style={{fontSize: "20px", fontWeight: "500", lineHeight: "140%", color: "var(--n-graphite)", textAlign: "center", margin: "16px auto 0", maxWidth: "56ch"}}>
        Explaining what an agent actually reads before it comments on your pull request.
      </p>
      <p style={{fontSize: "16px", fontWeight: "500", lineHeight: "140%", color: "var(--n-graphite)", margin: "10px 0 0"}}>
        Entelligence · 2025 · D
      </p>

      <div style={{marginTop: "44px", display: "grid", gap: "16px"}}>
        <div style={{position: "relative", aspectRatio: "16/9", borderRadius: "24px", overflow: "hidden", background: "linear-gradient(180deg,var(--n-charcoal),var(--n-ink))"}}>
          <div style={{position: "absolute", inset: "20%", borderRadius: "999px", border: "1px solid rgba(255,255,255,0.3)"}}>
          </div>
          <div style={{position: "absolute", inset: "32%", background: "radial-gradient(circle at 36% 32%,var(--n-canvas),#8f8f8f 60%,var(--n-ink))"}}>
          </div>
          <div style={{position: "absolute", top: "0", bottom: "0", width: "1px", background: "rgba(255,255,255,0.8)", animation: "fRun 5s linear infinite"}}>
          </div>
        </div>
      </div>
    </div>
  );
}