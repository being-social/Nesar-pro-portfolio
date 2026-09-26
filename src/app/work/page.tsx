import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Selected Work — Nesar",
  description: "Portfolio case studies across engineering and design.",
  alternates: { canonical: "/work" }
};

export default function WorkIndexPage() {
  return (
    <div className="space-y-16 py-8 max-w-6xl mx-auto">
      {/* Editorial Header */}
      <div className="border-b border-[var(--n-line)] pb-8 space-y-4">
        <div className="text-xs font-mono text-[var(--n-graphite)] font-semibold uppercase tracking-wider">
          WORK INDEX
        </div>
        <h1 className="text-5xl sm:text-7xl font-medium tracking-tight text-[var(--n-ink)]">
          Selected Case Studies
        </h1>
        <p className="text-sm text-[var(--n-graphite)] font-mono max-w-xl leading-relaxed">
          Product, brand, motion, and launch systems — the design decisions that made them real. Three flagship studies, each showing the full pipeline from brief to shipped.
        </p>
      </div>

      {/* Project Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Entelligence */}
        <Link
          href="/work/entelligence"
          className="group p-8 rounded-[var(--n-radius-panel)] border border-[var(--n-line)] bg-[var(--n-paper)] hover:border-[var(--n-ink)] transition-colors flex flex-col justify-between space-y-6 shadow-xs"
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-mono text-[var(--n-muted)]">
              <span className="text-[var(--n-ink)] font-semibold">Entelligence AI</span>
              <span>2025 to present</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-[var(--n-ink)]">
              The whole surface of an AI company
            </h2>
            <p className="text-sm text-[var(--n-graphite)] leading-relaxed">
              Product experience, brand, the live website in code, launch films, Entelligence Wrapped, the engineering Leaderboard, the design system, and the decks the founders take into fundraising.
            </p>
          </div>
          <div className="flex items-center text-sm font-medium text-[var(--n-ink)] group-hover:gap-2 gap-1 transition-colors">
            Read the case study
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </Link>

        {/* Composio */}
        <Link
          href="/work/composio"
          className="group p-8 rounded-[var(--n-radius-panel)] border border-[var(--n-line)] bg-[var(--n-paper)] hover:border-[var(--n-ink)] transition-colors flex flex-col justify-between space-y-6 shadow-xs"
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-mono text-[var(--n-muted)]">
              <span className="text-[var(--n-ink)] font-semibold">Composio</span>
              <span>2023 to 2024</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-[var(--n-ink)]">
              Design through a year of launches
            </h2>
            <p className="text-sm text-[var(--n-graphite)] leading-relaxed">
              Design through a year of launches. The pitch deck behind the $25M Series A, the SWE-Kit developer site, the MCP launch creative, and the website redesign.
            </p>
          </div>
          <div className="flex items-center text-sm font-medium text-[var(--n-ink)] group-hover:gap-2 gap-1 transition-colors">
            Read the case study
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </Link>

        {/* Contlo */}
        <Link
          href="/work/contlo"
          className="group p-8 rounded-[var(--n-radius-panel)] border border-[var(--n-line)] bg-[var(--n-paper)] hover:border-[var(--n-ink)] transition-colors flex flex-col justify-between space-y-6 shadow-xs"
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-mono text-[var(--n-muted)]">
              <span className="text-[var(--n-ink)] font-semibold">Contlo</span>
              <span>Apr 2024 - Jun 2024</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-[var(--n-ink)]">
              Creative / Marketing Design
            </h2>
            <p className="text-sm text-[var(--n-graphite)] leading-relaxed">
              Creative / Marketing Design | Apr 2024 - Jun 2024. Marketing design for the brand, early ecosystem visuals, and launch copy across SuperAGI and whitepaper.
            </p>
          </div>
          <div className="flex items-center text-sm font-medium text-[var(--n-ink)] group-hover:gap-2 gap-1 transition-colors">
            Read the case study
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </Link>
      </div>
    </div>
  );
}