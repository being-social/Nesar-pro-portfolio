import Link from "next/link";
import { Play } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Motion Archive — Nesar",
  description: "Motion explorations and launch films.",
  alternates: { canonical: "/motion" }
};

export default function MotionIndexPage() {
  return (
    <div data-page-root="true" style={{maxWidth: "1200px", margin: "0 auto", padding: "clamp(120px,18vw,140px) 24px 0"}}>
      <h1 style={{fontSize: "clamp(32px,6vw,64px)", fontWeight: "500", lineHeight: "110%", letterSpacing: "-.05em", margin: "0", textAlign: "center"}}>
        Films that make software make sense
      </h1>
      <p style={{fontSize: "20px", fontWeight: "500", lineHeight: "140%", color: "var(--n-graphite)", textAlign: "center", margin: "16px auto 0", maxWidth: "56ch"}}>
        Direction, design and animation, and usually the page it ends up on
      </p>

      <div style={{marginTop: "44px", display: "grid", gap: "16px"}}>
        <Link
          href="/motion/agent-insights"
          style={{cursor: "pointer", border: "0", background: "var(--n-paper)", borderRadius: "24px", padding: "clamp(24px,4vw,44px)", textAlign: "left", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(280px,100%),1fr))", gap: "40px", alignItems: "center", textDecoration: "none"}}
        >
          <div style={{position: "relative", aspectRatio: "16/9", borderRadius: "24px", overflow: "hidden", background: "linear-gradient(180deg,var(--n-charcoal),var(--n-ink))"}}>
            <div style={{position: "absolute", inset: "20%", borderRadius: "999px", border: "1px solid rgba(255,255,255,0.3)"}}>
            </div>
            <div style={{position: "absolute", inset: "32%", background: "radial-gradient(circle at 36% 32%,var(--n-canvas),#8f8f8f 60%,var(--n-ink))"}}>
            </div>
            <div style={{position: "absolute", top: "0", bottom: "0", width: "1px", background: "rgba(255,255,255,0.8)", animation: "fRun 5s linear infinite"}}>
            </div>
          </div>
          <div>
            <p style={{fontSize: "26px", fontWeight: "600", lineHeight: "130%", margin: "0"}}>
              Agent Insights launch film
            </p>
            <p style={{fontSize: "16px", fontWeight: "500", lineHeight: "140%", color: "var(--n-graphite)", margin: "10px 0 0"}}>
              Explaining what an agent actually reads before it comments on your pull request.
            </p>
            <p style={{fontSize: "14px", fontWeight: "500", lineHeight: "140%", color: "var(--n-graphite)", margin: "14px 0 0"}}>
              Entelligence · 2025 · D
            </p>
          </div>
        </Link>

        <Link
          href="/work/entelligence/wrapped"
          style={{cursor: "pointer", border: "0", background: "var(--n-paper)", borderRadius: "24px", padding: "clamp(24px,4vw,44px)", textAlign: "left", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(280px,100%),1fr))", gap: "40px", alignItems: "center", textDecoration: "none"}}
        >
          <div style={{position: "relative", aspectRatio: "16/9", borderRadius: "24px", overflow: "hidden", background: "linear-gradient(180deg,var(--n-charcoal),var(--n-ink))"}}>
            <div style={{position: "absolute", inset: "20%", borderRadius: "999px", border: "1px solid rgba(255,255,255,0.3)"}}>
            </div>
            <div style={{position: "absolute", inset: "32%", background: "radial-gradient(circle at 36% 32%,var(--n-canvas),#8f8f8f 60%,var(--n-ink))"}}>
            </div>
            <div style={{position: "absolute", top: "0", bottom: "0", width: "1px", background: "rgba(255,255,255,0.8)", animation: "fRun 5s linear infinite"}}>
            </div>
          </div>
          <div>
            <p style={{fontSize: "26px", fontWeight: "600", lineHeight: "130%", margin: "0"}}>
              Entelligence Wrapped
            </p>
            <p style={{fontSize: "16px", fontWeight: "500", lineHeight: "140%", color: "var(--n-graphite)", margin: "10px 0 0"}}>
              Year-in-review · 2025
            </p>
          </div>
        </Link>

        <Link
          href="/work/composio/swe-kit"
          style={{cursor: "pointer", border: "0", background: "var(--n-paper)", borderRadius: "24px", padding: "clamp(24px,4vw,44px)", textAlign: "left", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(280px,100%),1fr))", gap: "40px", alignItems: "center", textDecoration: "none"}}
        >
          <div style={{position: "relative", aspectRatio: "16/9", borderRadius: "24px", overflow: "hidden", background: "linear-gradient(180deg,var(--n-charcoal),var(--n-ink))"}}>
            <div style={{position: "absolute", inset: "20%", borderRadius: "999px", border: "1px solid rgba(255,255,255,0.3)"}}>
            </div>
            <div style={{position: "absolute", inset: "32%", background: "radial-gradient(circle at 36% 32%,var(--n-canvas),#8f8f8f 60%,var(--n-ink))"}}>
            </div>
            <div style={{position: "absolute", top: "0", bottom: "0", width: "1px", background: "rgba(255,255,255,0.8)", animation: "fRun 5s linear infinite"}}>
            </div>
          </div>
          <div>
            <p style={{fontSize: "26px", fontWeight: "600", lineHeight: "130%", margin: "0"}}>
              SWE-Kit
            </p>
            <p style={{fontSize: "16px", fontWeight: "500", lineHeight: "140%", color: "var(--n-graphite)", margin: "10px 0 0"}}>
              Developer Launch Site · 2023
            </p>
          </div>
        </Link>

        <Link
          href="/work/composio/mcp-launch"
          style={{cursor: "pointer", border: "0", background: "var(--n-paper)", borderRadius: "24px", padding: "clamp(24px,4vw,44px)", textAlign: "left", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(280px,100%),1fr))", gap: "40px", alignItems: "center", textDecoration: "none"}}
        >
          <div style={{position: "relative", aspectRatio: "16/9", borderRadius: "24px", overflow: "hidden", background: "linear-gradient(180deg,var(--n-charcoal),var(--n-ink))"}}>
            <div style={{position: "absolute", inset: "20%", borderRadius: "999px", border: "1px solid rgba(255,255,255,0.3)"}}>
            </div>
            <div style={{position: "absolute", inset: "32%", background: "radial-gradient(circle at 36% 32%,var(--n-canvas),#8f8f8f 60%,var(--n-ink))"}}>
            </div>
            <div style={{position: "absolute", top: "0", bottom: "0", width: "1px", background: "rgba(255,255,255,0.8)", animation: "fRun 5s linear infinite"}}>
            </div>
          </div>
          <div>
            <p style={{fontSize: "26px", fontWeight: "600", lineHeight: "130%", margin: "0"}}>
              MCP Launch
            </p>
            <p style={{fontSize: "16px", fontWeight: "500", lineHeight: "140%", color: "var(--n-graphite)", margin: "10px 0 0"}}>
              Model Context Protocol · 2024
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}