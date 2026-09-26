import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Entelligence AI Case Study — Nesar",
  description: "Founding design work at Entelligence AI.",
  alternates: { canonical: "/work/entelligence" }
};


export default function EntelligenceCaseStudy() {
  return (
    <div className="space-y-12 py-12 max-w-4xl mx-auto">
      <Link href="/work" className="text-xs font-mono text-[var(--n-ink)] hover:underline">
        ← Back to Work
      </Link>

      <div className="space-y-4">
        <h1 className="text-4xl sm:text-5xl font-medium tracking-tight text-[var(--n-ink)]">
          Designing the Surface Area of an AI Engineering Company
        </h1>
        <p className="text-lg text-[var(--n-graphite)] font-serif italic">
          One designer, one year, a whole company's surface area.
        </p>
      </div>

      <div className="prose prose-sm max-w-none text-[var(--n-graphite)] space-y-6">
        <p>I joined Entelligence AI as the founding designer and sole designer for the first year+. My work scope spanned from the very first prototypes of the AI-powered code review tools to the visual system that defines our marketing today.</p>
        
        <h3>01 / Context</h3>
        <p>Entelligence is building a production reliability engine that reviews engineering PRs against historical incident data. The challenge was making highly technical AI engineering output readable, trustworthy, and actionable for engineering leads.</p>

        <h3>02 / The Build</h3>
        <p>This wasn't just UI work. I designed and built the entelligence.ai website from scratch in code (Next.js, Tailwind), implemented a full motion system that matches the company's brand, created all launch assets (Wrapped, Leaderboard, launch films), and maintain our unified design system.</p>

        <h3>03 / Outcome</h3>
        <p>The visual system I built provides the foundation for our entire engineering-leader interface and all public-facing GTM assets, accelerating our design velocity as the team grows.</p>
      </div>
    </div>
  );
}
