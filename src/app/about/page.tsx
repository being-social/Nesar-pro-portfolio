import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "About — Nesar",
  description: "Mechanical engineer to design engineer.",
  alternates: { canonical: "/about" }
};


export default function AboutPage() {
  const principles = [
    { num: "01", title: "Motion is the artifact", text: "The interface stays quiet so launch films, motion studies, and transitions have room to feel important." },
    { num: "02", title: "Typography can be a scene", text: "Large text can enter on a playhead, mask, resolve, and move like a title sequence." },
    { num: "03", title: "Obsess over milliseconds", text: "150ms vs 300ms easing curves dictate whether an interface feels crisp or sluggish." },
    { num: "04", title: "No handoffs", text: "I design the thing and then I make the thing in code." },
  ];

  return (
    <div className="space-y-16 py-8 max-w-4xl mx-auto">
      {/* Bio Header */}
      <div className="space-y-6">
        <div className="text-xs font-mono text-[var(--n-playhead)] font-semibold">
          04 / ABOUT NESAR B
        </div>
        <h1 className="text-4xl sm:text-6xl font-medium tracking-tight leading-tight text-[var(--n-ink)]">
          I started in mechanical engineering, moved through marketing into design, and eventually got tired of handing ideas off.
        </h1>
      </div>

      {/* Main Prose Story */}
      <div className="space-y-6 text-base text-[var(--n-graphite)] leading-relaxed font-sans">
        <p>
          I'm the founding designer at <strong>Entelligence AI</strong> (Bengaluru / SF). For over a year I was the only designer, owning product UX, brand, live site in code, launch films, engineering Leaderboards, and investor fundraising decks.
        </p>
        <p>
          Before Entelligence, I was the sole designer at <strong>Composio</strong> (agentic-AI infrastructure, backed by Lightspeed). I built the pitch deck behind their <strong>$25M Series A</strong>, plus developer launch sites and videos for SWE-Kit and MCP.
        </p>
        <p>
          I didn't start in software design. Mechanical engineering diploma → digital marketing → UX design → design engineering & AI agents. Somewhere along the way I stopped waiting for engineering to build my ideas and started shipping them myself: landing pages in code, motion graphics frame-by-frame, and AI agents that do real operational work.
        </p>
      </div>

      {/* Principles Section */}
      <div className="space-y-8 pt-8 border-t border-[var(--n-line)]">
        <h2 className="text-xs font-mono text-[var(--n-graphite)] uppercase tracking-wider">
          How I Work — Principles
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {principles.map((p) => (
            <div
              key={p.num}
              className="p-6 rounded-[var(--n-radius-card)] border border-[var(--n-line)] bg-[var(--n-paper)] space-y-2"
            >
              <span className="text-xs font-mono text-[var(--n-playhead)] font-bold">{p.num}</span>
              <h3 className="text-lg font-bold text-[var(--n-ink)]">{p.title}</h3>
              <p className="text-xs text-[var(--n-graphite)] leading-relaxed">{p.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
