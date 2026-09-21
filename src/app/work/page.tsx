import Link from "next/link";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Selected Work — Nesar",
  description: "Portfolio case studies across engineering and design.",
  alternates: { canonical: "/work" }
};

export default function WorkIndexPage() {
  return (
    <div data-page-root="true" style={{ maxWidth: "1200px", margin: "0 auto", padding: "clamp(120px,18vw,140px) 24px 0" }}>
  <h1 style={{ fontSize: "clamp(32px,6vw,64px)", fontWeight: "500", lineHeight: "110%", letterSpacing: "-.05em", margin: "0", textAlign: "center" }}>Three companies.<br />Three different design problems.</h1>
  <p style={{ fontSize: "20px", fontWeight: "500", lineHeight: "140%", color: "var(--n-graphite)", textAlign: "center", margin: "16px auto 0", maxWidth: "58ch" }}>Each page goes artifact by artifact: what it was, what the problem was, what I did, and how it was built</p>

  <div style={{ display: "grid", gap: "16px", marginTop: "48px" }}>
    <Link href="/work/entelligence" style={{ textAlign: "left", cursor: "pointer", border: "0", borderRadius: "24px", background: "var(--n-paper)", padding: "clamp(24px,4vw,44px)", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(260px,100%),1fr))", gap: "32px", alignItems: "center", textDecoration: "none" }}>
      <div>
        <p style={{ fontSize: "14px", fontWeight: "500", lineHeight: "140%", color: "var(--n-graphite)", margin: "0" }}>Entelligence AI · Founding designer · 2025 to present</p>
        <p style={{ fontSize: "26px", fontWeight: "600", lineHeight: "130%", margin: "12px 0 0" }}>The whole surface of an AI company</p>
        <p style={{ fontSize: "16px", fontWeight: "500", lineHeight: "140%", color: "var(--n-graphite)", margin: "10px 0 0", maxWidth: "54ch" }}>Product experience, brand, the live website in code, launch films, Entelligence Wrapped, the engineering Leaderboard, the design system, and the decks the founders take into fundraising.</p>
      </div>
      <div style={{ borderRadius: "24px", background: "var(--n-ink)", aspectRatio: "4/3", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", left: "10%", right: "10%", top: "22%", bottom: "0", background: "rgba(255,255,255,.12)", border: "1px solid rgba(255,255,255,.26)", borderBottom: "0", borderRadius: "16px 16px 0 0" }}></div>
        <div style={{ position: "absolute", left: "22%", right: "22%", top: "46%", bottom: "0", background: "var(--n-paper-strong)", borderRadius: "12px 12px 0 0" }}></div>
      </div>
    </Link>

    <Link href="/work/composio" style={{ textAlign: "left", cursor: "pointer", border: "0", borderRadius: "24px", background: "var(--n-paper)", padding: "clamp(24px,4vw,44px)", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(260px,100%),1fr))", gap: "32px", alignItems: "center", textDecoration: "none" }}>
      <div>
        <p style={{ fontSize: "14px", fontWeight: "500", lineHeight: "140%", color: "var(--n-graphite)", margin: "0" }}>Composio · Designer · 2024 to 2025</p>
        <p style={{ fontSize: "26px", fontWeight: "600", lineHeight: "130%", margin: "12px 0 0" }}>A year of launches, and the deck behind a $25M Series A</p>
        <p style={{ fontSize: "16px", fontWeight: "500", lineHeight: "140%", color: "var(--n-graphite)", margin: "10px 0 0", maxWidth: "54ch" }}>The only designer at an agentic-AI infrastructure company: SWE-Kit and MCP launch sites, launch films and creatives, the Series A pitch deck, and the company website redesigned and rebuilt.</p>
      </div>
      <div style={{ borderRadius: "24px", background: "var(--n-paper-strong)", border: "1px solid var(--n-line)", aspectRatio: "4/3", display: "grid", placeItems: "center" }}>
        <span style={{ fontSize: "clamp(28px,5vw,56px)", fontWeight: "600", lineHeight: "110%" }}>$25<span style={{ color: "#d4d4d4" }}>M</span></span>
      </div>
    </Link>

    <Link href="/work/contlo" style={{ textAlign: "left", cursor: "pointer", border: "0", borderRadius: "24px", background: "var(--n-paper)", padding: "clamp(24px,4vw,44px)", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(260px,100%),1fr))", gap: "32px", alignItems: "center", textDecoration: "none" }}>
      <div>
        <p style={{ fontSize: "14px", fontWeight: "500", lineHeight: "140%", color: "var(--n-graphite)", margin: "0" }}>Contlo / SuperAGI · Creative / Marketing Design · Apr 2024 to Jun 2024</p>
        <p style={{ fontSize: "26px", fontWeight: "600", lineHeight: "130%", margin: "12px 0 0" }}>Where the AI work started</p>
        <p style={{ fontSize: "16px", fontWeight: "500", lineHeight: "140%", color: "var(--n-graphite)", margin: "10px 0 0", maxWidth: "54ch" }}>Marketing, growth and early product work across an early-stage AI ecosystem: a SuperAGI whitepaper, blog visuals, outreach systems and programmatic SEO.</p>
      </div>
      <div style={{ borderRadius: "24px", background: "var(--n-ink)", aspectRatio: "4/3", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: "24%", border: "1px solid rgba(255,255,255,.4)" }}></div>
        <div style={{ position: "absolute", inset: "36%", background: "linear-gradient(180deg,#fff,#a4a4a5)" }}></div>
      </div>
    </Link>
  </div>

  <div style={{ marginTop: "clamp(56px,9vw,80px)" }}>
    <h2 style={{ fontSize: "clamp(26px,4vw,48px)", fontWeight: "500", lineHeight: "110%", letterSpacing: "-.05em", margin: "0", textAlign: "center" }}>Skills, and where each one was earned</h2>
    <p style={{ fontSize: "16px", fontWeight: "500", lineHeight: "140%", color: "var(--n-graphite)", textAlign: "center", margin: "14px auto 0", maxWidth: "56ch" }}>Not a list of logos. Each skill is tied to the place it was actually used, so you can check it against the work above.</p>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(280px,100%),1fr))", gap: "16px", marginTop: "32px" }}>
      <div style={{ borderRadius: "24px", background: "var(--n-paper)", padding: "clamp(20px,4.5vw,28px)" }}>
        <p style={{ fontSize: "20px", fontWeight: "600", lineHeight: "140%", margin: "0" }}>Product design and UX</p>
        <p style={{ fontSize: "14px", fontWeight: "500", lineHeight: "140%", color: "var(--n-graphite)", margin: "4px 0 0" }}>Entelligence · Composio · Contlo</p>
        <p style={{ fontSize: "16px", fontWeight: "500", lineHeight: "140%", color: "var(--n-graphite)", margin: "12px 0 0" }}>UX research, wireframing, prototyping and high-fidelity screens in Figma. Learned formally through the Google UX certificate track, then used daily on a reliability engine for developers: code review, incident intelligence, dashboards, onboarding, docs. Sub-brand UI and UX at Contlo.</p>
      </div>
      <div style={{ borderRadius: "24px", background: "var(--n-paper)", padding: "clamp(20px,4.5vw,28px)" }}>
        <p style={{ fontSize: "20px", fontWeight: "600", lineHeight: "140%", margin: "0" }}>Motion design and video</p>
        <p style={{ fontSize: "14px", fontWeight: "500", lineHeight: "140%", color: "var(--n-graphite)", margin: "4px 0 0" }}>Entelligence · Composio</p>
        <p style={{ fontSize: "16px", fontWeight: "500", lineHeight: "140%", color: "var(--n-graphite)", margin: "12px 0 0" }}>Launch films for Agent Insights, SWE-Kit and MCP. Entelligence Wrapped. Product explainers and interface motion. After Effects and Premiere Pro for the films, Blender for 3D modelling, rendering and animation.</p>
      </div>
      <div style={{ borderRadius: "24px", background: "var(--n-paper)", padding: "clamp(20px,4.5vw,28px)" }}>
        <p style={{ fontSize: "20px", fontWeight: "600", lineHeight: "140%", margin: "0" }}>Web design and build</p>
        <p style={{ fontSize: "14px", fontWeight: "500", lineHeight: "140%", color: "var(--n-graphite)", margin: "4px 0 0" }}>Entelligence · Composio · UIPEP</p>
        <p style={{ fontSize: "16px", fontWeight: "500", lineHeight: "140%", color: "var(--n-graphite)", margin: "12px 0 0" }}>The live entelligence.ai, designed and coded. The Composio site redesigned, rebuilt and migrated to WordPress. Responsive web design and WordPress development from the UIPEP years, plus Framer and Wix builds along the way.</p>
      </div>
      <div style={{ borderRadius: "24px", background: "var(--n-paper)", padding: "clamp(20px,4.5vw,28px)" }}>
        <p style={{ fontSize: "20px", fontWeight: "600", lineHeight: "140%", margin: "0" }}>Design systems</p>
        <p style={{ fontSize: "14px", fontWeight: "500", lineHeight: "140%", color: "var(--n-graphite)", margin: "4px 0 0" }}>Entelligence</p>
        <p style={{ fontSize: "16px", fontWeight: "500", lineHeight: "140%", color: "var(--n-graphite)", margin: "12px 0 0" }}>Built and maintain the component library and token set used across product and marketing, with motion tokens next to colour and spacing. The system is the deliverable, not a page describing one.</p>
      </div>
      <div style={{ borderRadius: "24px", background: "var(--n-paper)", padding: "clamp(20px,4.5vw,28px)" }}>
        <p style={{ fontSize: "20px", fontWeight: "600", lineHeight: "140%", margin: "0" }}>Pitch decks and brand</p>
        <p style={{ fontSize: "14px", fontWeight: "500", lineHeight: "140%", color: "var(--n-graphite)", margin: "4px 0 0" }}>Composio · Entelligence · Contlo</p>
        <p style={{ fontSize: "16px", fontWeight: "500", lineHeight: "140%", color: "var(--n-graphite)", margin: "12px 0 0" }}>The deck behind Composio's $25M Series A, and the decks Entelligence's founders take into fundraising. Brand and marketing creative at all three, including a SuperAGI whitepaper and a repeatable blog thumbnail system.</p>
      </div>
      <div style={{ borderRadius: "24px", background: "var(--n-paper)", padding: "clamp(20px,4.5vw,28px)" }}>
        <p style={{ fontSize: "20px", fontWeight: "600", lineHeight: "140%", margin: "0" }}>Code, agents and automation</p>
        <p style={{ fontSize: "14px", fontWeight: "500", lineHeight: "140%", color: "var(--n-graphite)", margin: "4px 0 0" }}>Entelligence · Lab</p>
        <p style={{ fontSize: "16px", fontWeight: "500", lineHeight: "140%", color: "var(--n-graphite)", margin: "12px 0 0" }}>Next.js, React, TypeScript, Tailwind, PostgreSQL and Supabase. Shipped the Entelligence site in code, and on the side a multi-tenant academy SaaS, a WhatsApp automation platform, a Claude-powered onboarding tool, and Astra on this site.</p>
      </div>
      <div style={{ borderRadius: "24px", background: "var(--n-paper)", padding: "28px", gridColumn: "1 / -1" }}>
        <p style={{ fontSize: "20px", fontWeight: "600", lineHeight: "140%", margin: "0" }}>Growth, SEO and content</p>
        <p style={{ fontSize: "14px", fontWeight: "500", lineHeight: "140%", color: "var(--n-graphite)", margin: "4px 0 0" }}>Contlo · UIPEP · Versatile Digi · self-employed</p>
        <p style={{ fontSize: "16px", fontWeight: "500", lineHeight: "140%", color: "var(--n-graphite)", margin: "12px 0 0" }}>SEO and e-commerce SEO, programmatic SEO and automated outreach and lead-generation systems at Contlo, Google Analytics, web content writing, social media management and campaigns. Three years of this before design is why the sites I build are structured to be found, not just looked at.</p>
      </div>
    </div>
  </div>

  <div style={{ marginTop: "clamp(56px,9vw,80px)" }}>
    <h2 style={{ fontSize: "clamp(26px,4vw,48px)", fontWeight: "500", lineHeight: "110%", letterSpacing: "-.05em", margin: "0", textAlign: "center" }}>Before design</h2>
    <p style={{ fontSize: "16px", fontWeight: "500", lineHeight: "140%", color: "var(--n-graphite)", textAlign: "center", margin: "14px auto 0", maxWidth: "54ch" }}>Three years in digital marketing. It is where I learned to think about users before pixels, and why SEO still shapes how I structure a site.</p>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(260px,100%),1fr))", gap: "16px", marginTop: "32px" }}>
      <div style={{ borderRadius: "24px", background: "var(--n-paper)", padding: "clamp(20px,4.5vw,28px)" }}>
        <p style={{ fontSize: "14px", fontWeight: "500", lineHeight: "140%", color: "var(--n-graphite)", margin: "0" }}>UIPEP Technologies · Oct 2021 to Jan 2024</p>
        <p style={{ fontSize: "20px", fontWeight: "600", lineHeight: "140%", margin: "10px 0 0" }}>Digital marketing associate</p>
        <p style={{ fontSize: "16px", fontWeight: "500", lineHeight: "140%", color: "var(--n-graphite)", margin: "8px 0 0" }}>Two years and four months across two roles: SEO, content, web and WordPress builds, 3D renders, and digital campaigns. The first job where I had to care what a stranger did on a page, not what it looked like.</p>
      </div>
      <div style={{ borderRadius: "24px", background: "var(--n-paper)", padding: "clamp(20px,4.5vw,28px)" }}>
        <p style={{ fontSize: "14px", fontWeight: "500", lineHeight: "140%", color: "var(--n-graphite)", margin: "0" }}>Versatile Digi · May 2021 to Oct 2021</p>
        <p style={{ fontSize: "20px", fontWeight: "600", lineHeight: "140%", margin: "10px 0 0" }}>Digital marketing</p>
        <p style={{ fontSize: "16px", fontWeight: "500", lineHeight: "140%", color: "var(--n-graphite)", margin: "8px 0 0" }}>Campaigns and content for small businesses. Fast, measurable, and unforgiving about what actually converts.</p>
      </div>
      <div style={{ borderRadius: "24px", background: "var(--n-paper)", padding: "clamp(20px,4.5vw,28px)" }}>
        <p style={{ fontSize: "14px", fontWeight: "500", lineHeight: "140%", color: "var(--n-graphite)", margin: "0" }}>Self-employed · Jun 2021 to present</p>
        <p style={{ fontSize: "20px", fontWeight: "600", lineHeight: "140%", margin: "10px 0 0" }}>Blogging, SEO and 3D experiments</p>
        <p style={{ fontSize: "16px", fontWeight: "500", lineHeight: "140%", color: "var(--n-graphite)", margin: "8px 0 0" }}>Where the WordPress, search and Blender habits come from. Still running on the side.</p>
      </div>
    </div>
  </div>
</div>
  );
}
