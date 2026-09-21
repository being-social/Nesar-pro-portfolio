import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — Nesar",
  description: "Mechanical engineer to design engineer.",
  alternates: { canonical: "/about" }
};

export default function AboutPage() {
  return (
    <div data-page-root="true" style={{maxWidth: "1200px", margin: "0 auto", padding: "clamp(120px,18vw,140px) 24px 0"}}>
      <h1 style={{fontSize: "clamp(32px,6vw,64px)", fontWeight: "500", lineHeight: "110%", letterSpacing: "-.05em", margin: "0", textAlign: "center"}}>
        Mechanical engineer. Marketer. Designer. Then I stopped waiting for someone else to build it.
      </h1>
      <p style={{fontSize: "20px", fontWeight: "500", lineHeight: "140%", color: "var(--n-graphite)", textAlign: "center", margin: "16px auto 0", maxWidth: "52ch"}}>
        The short version of how a diploma in machines ended up shipping motion and code for AI companies in Bengaluru
      </p>

      <div style={{display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(280px,100%),1fr))", gap: "16px", marginTop: "40px", alignItems: "stretch"}}>
        <div style={{borderRadius: "24px", background: "var(--n-paper)", position: "relative", overflow: "hidden", minHeight: "380px"}}>
          <div style={{position: "absolute", left: "50%", top: "18%", width: "48%", aspectRatio: "1", transform: "translateX(-50%)", borderRadius: "999px", background: "radial-gradient(circle at 38% 32%,var(--n-canvas),var(--n-charcoal) 62%,var(--n-ink))"}}>
          </div>
          <div style={{position: "absolute", left: "18%", right: "18%", top: "56%", bottom: "0", borderRadius: "44px 44px 0 0", background: "var(--n-ink)"}}>
          </div>
          <p style={{position: "absolute", left: "20px", bottom: "16px", fontSize: "14px", fontWeight: "500", lineHeight: "140%", color: "var(--n-graphite)", margin: "0"}}>
            Portrait · AI-generated character goes here
          </p>
        </div>
        <div style={{borderRadius: "24px", background: "var(--n-ink)", color: "var(--n-canvas)", padding: "32px", display: "flex", flexDirection: "column", justifyContent: "center", gap: "18px"}}>
          <p style={{fontSize: "26px", fontWeight: "600", lineHeight: "130%", margin: "0"}}>
            I care less about whether a screen looks pretty and more about whether the thing works for the person using it.
          </p>
          <p style={{fontSize: "16px", fontWeight: "500", lineHeight: "140%", color: "var(--n-graphite)", margin: "0"}}>
            That sentence sounds obvious until the product is AI and the user is a developer with forty tabs open and no
          </p>
          <p style={{fontSize: "14px", fontWeight: "500", lineHeight: "140%", color: "var(--n-graphite)", margin: "0"}}>
            We build the thing and the film and the site. Then we write the code for the parts that have to feel exact.
          </p>
          <p style={{fontSize: "16px", fontWeight: "500", lineHeight: "140%", color: "var(--n-graphite)", margin: "0"}}>
            This is not a portfolio. This is a practice in shipping real work.
          </p>
        </div>
      </div>

      <div style={{marginTop: "48px"}}>
        <h2 style={{fontSize: "clamp(28px,5vw,56px)", fontWeight: "500", lineHeight: "110%", letterSpacing: "-.05em", textAlign: "center"}}>
          I don't hand it off.
        </h2>
        <p style={{fontSize: "20px", fontWeight: "500", lineHeight: "140%", color: "var(--n-graphite)", margin: "16px auto 0", maxWidth: "52ch", textAlign: "center"}}>
          Founding design work at Entelligence AI, previously at Composio. I make the product, the film and the site. Then I write the code for the parts that have to feel exact.
        </p>
      </div>
    </div>
  );
}