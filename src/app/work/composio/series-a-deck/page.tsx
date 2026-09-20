import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "$25M Series A Pitch Deck — Composio — Nesar",
  description: "The story architecture and pitch deck visual system that helped secure $25M led by Lightspeed Venture Partners.",
  alternates: {
    canonical: "/work/composio/series-a-deck",
  }
};

export default function ComposioSeriesADeckArtifact() {
  return (
    <div className="space-y-12 py-16 px-4 sm:px-6 max-w-[1280px] mx-auto">
      <Link href="/work/composio" className="inline-flex min-h-[44px] items-center text-xs font-mono text-[var(--n-playhead)] hover:underline font-semibold -ml-2 px-2">
        ← Back to Composio Case Study
      </Link>

      <div className="space-y-4 max-w-4xl">
        <div className="flex items-center justify-between text-xs font-mono text-[var(--n-muted)]">
          <span className="text-[var(--n-playhead)] font-semibold">COMPOSIO // FLAGSHIP ARTIFACT</span>
          <span>$25M SERIES A</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-medium tracking-tight text-[var(--n-ink)]">
          The Pitch Deck Behind Composio's $25M Series A
        </h1>
        <p className="text-lg text-[var(--n-graphite)] font-serif italic">
          Built the story architecture and pitch deck visual system that helped secure $25M led by Lightspeed Venture Partners.
        </p>
      </div>

      <div className="p-6 md:p-8 rounded-[var(--n-radius-panel)] border border-[var(--n-line)] bg-[var(--n-paper)] space-y-6 shadow-xs font-mono text-xs max-w-4xl">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 text-[var(--n-muted)] border-b border-[var(--n-line-soft)] pb-4">
          <span>RAISE: $25,000,000</span>
          <span className="text-[var(--n-playhead)] font-semibold flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4" /> LED BY LIGHTSPEED VENTURE PARTNERS
          </span>
        </div>

        <div className="space-y-4 text-sm text-[var(--n-graphite)] font-sans leading-relaxed">
          <p>
            As sole designer at Composio, I collaborated directly with the founders to structure, design, and refine the pitch deck presented to investors.
          </p>
          <h3 className="text-base font-bold text-[var(--n-ink)] font-mono pt-2">Deck Architecture & Principles:</h3>
          <ul className="list-disc list-inside space-y-2 font-mono text-xs text-[var(--n-graphite)]">
            <li><strong>Infrastructure Framing:</strong> Positioned Composio as the essential tooling & integration layer for agentic AI framework builders.</li>
            <li><strong>Developer Velocity Visuals:</strong> Highlighting benchmark performance, tool-calling latencies, and platform adoption.</li>
            <li><strong>Sanitized Presentation:</strong> Visual slide system maintaining high visual standards across investor meetings while protecting metrics.</li>
          </ul>
        </div>
      </div>
      
      {/* Mobile-friendly layout container for the visuals */}
      <div className="max-w-4xl pt-8 pb-12 overflow-x-auto snap-x snap-mandatory hide-scrollbar">
         {/* Placeholder for the real media proof instead of clipped CSS blocks */}
         <div className="aspect-[16/9] w-full min-w-[300px] border border-[var(--n-line)] bg-[var(--n-charcoal)] rounded-[var(--n-radius-film)] flex items-center justify-center snap-start text-[var(--n-glass)] font-mono text-sm max-w-full">
            [SANITIZED PITCH DECK ARTIFACT MEDIA]
         </div>
      </div>
    </div>
  );
}
