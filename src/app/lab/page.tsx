import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lab — Nesar",
  description: "Design engineering lab experiments.",
  alternates: { canonical: "/lab" }
};

export default function LabIndexPage() {
  return (
    <div data-page-root="true" style={{maxWidth: "1200px", margin: "0 auto", padding: "clamp(120px,18vw,140px) 24px 0"}}>
      <h1 style={{fontSize: "clamp(32px,6vw,64px)", fontWeight: "500", lineHeight: "110%", letterSpacing: "-.05em", margin: "0", textAlign: "center"}}>
        Things I built on my own
      </h1>
      <p style={{fontSize: "20px", fontWeight: "500", lineHeight: "140%", color: "var(--n-graphite)", textAlign: "center", margin: "16px auto 0", maxWidth: "56ch"}}>
        Personal projects, free tools and open-source work. Nobody asked for any of it, some of it has real users anyway
      </p>

      <div style={{display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(300px,100%),1fr))", gap: "16px", marginTop: "44px"}}>
        <div style={{borderRadius: "24px", background: "var(--n-ink)", color: "var(--n-canvas)", padding: "32px", gridColumn: "1 / -1", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(280px,100%),1fr))", gap: "32px", alignItems: "center"}}>
          <div>
            <p style={{fontSize: "14px", fontWeight: "500", lineHeight: "140%", color: "var(--n-graphite)", margin: "0"}}>
              Product · live with real academies
            </p>
            <p style={{fontSize: "26px", fontWeight: "600", lineHeight: "130%", margin: "12px 0 0", maxWidth: "54ch"}}>
              Theta Academy
            </p>
            <p style={{fontSize: "16px", fontWeight: "500", lineHeight: "140%", color: "var(--n-graphite)", margin: "10px 0 0", maxWidth: "54ch"}}>
              A multi-tenant SaaS for running cricket academies in India, branches, coaches, student rosters, attendance, fees and receipts, with audit logging and role-based access. Designed, built and operated by one person, which is the whole point of the lab.
            </p>
          </div>
          <div style={{display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "18px"}}>
            <span style={{border: "1px solid rgba(255,255,255,.2)", borderRadius: "12px", padding: "8px 14px", fontSize: "14px", fontWeight: "500", lineHeight: "120%"}}>
              Next.js
            </span>
            <span style={{border: "1px solid rgba(255,255,255,.2)", borderRadius: "12px", padding: "8px 14px", fontSize: "14px", fontWeight: "500", lineHeight: "120%"}}>
              PostgreSQL
            </span>
            <span style={{border: "1px solid rgba(255,255,255,.2)", borderRadius: "12px", padding: "8px 14px", fontSize: "14px", fontWeight: "500", lineHeight: "120%"}}>
              Supabase
            </span>
            <span style={{border: "1px solid rgba(255,255,255,.2)", borderRadius: "12px", padding: "8px 14px", fontSize: "14px", fontWeight: "500", lineHeight: "120%"}}>
              Baileys
            </span>
            <span style={{border: "1px solid rgba(255,255,255,.2)", borderRadius: "12px", padding: "8px 14px", fontSize: "14px", fontWeight: "500", lineHeight: "120%"}}>
              Claude
            </span>
            <span style={{border: "1px solid rgba(255,255,255,.2)", borderRadius: "12px", padding: "8px 14px", fontSize: "14px", fontWeight: "500", lineHeight: "120%"}}>
              open source
            </span>
          </div>
        </div>

        <div style={{borderRadius: "24px", background: "var(--n-ink)", color: "var(--n-canvas)", padding: "32px", gridColumn: "1 / -1", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(280px,100%),1fr))", gap: "32px", alignItems: "center"}}>
          <div>
            <p style={{fontSize: "14px", fontWeight: "500", lineHeight: "140%", color: "var(--n-graphite)", margin: "0"}}>
              Agent · live on this site
            </p>
            <p style={{fontSize: "20px", fontWeight: "600", lineHeight: "140%", margin: "10px 0 0"}}>
              Astra
            </p>
            <p style={{fontSize: "16px", fontWeight: "500", lineHeight: "140%", color: "var(--n-graphite)", margin: "8px 0 0"}}>
              My assistant and the front door to this site. Astra asks who you are, answers questions about my work from a curated knowledge file, filters out vendor pitches, and only passes real conversations to my inbox.
            </p>
          </div>
          <Link
            href="/contact"
            style={{marginTop: "18", cursor: "pointer", textDecoration: "none", display: "flex", flexDirection: "column", background: "var(--n-ink)", color: "var(--n-canvas)", border: "1px solid rgb(114,114,114)", borderRadius: "16", padding: "14px 22px", fontSize: "14", fontWeight: "500", lineHeight: "120%"}}
          >
            Talk to Astra
          </Link>
        </div>

        <div style={{borderRadius: "24px", background: "var(--n-paper)", padding: "32px", gridColumn: "1 / -1"}}>
          <p style={{fontSize: "14px", fontWeight: "500", lineHeight: "140%", color: "var(--n-graphite)", margin: "0"}}>
            Free tools · run right here
          </p>
          <p style={{fontSize: "26px", fontWeight: "600", lineHeight: "130%", margin: "12px 0 0"}}>
            Two small things for other designers
          </p>
        </div>
      </div>
    </div>
  );
}