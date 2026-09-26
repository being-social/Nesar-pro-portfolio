import { CheckCircle2 } from "lucide-react";
import type { Metadata } from 'next';
import { ArtifactLayout, FeatureBulletList } from "@/components/ArtifactLayout";

export const metadata: Metadata = {
  title: "$25M Series A Pitch Deck — Composio — Nesar",
  description: "The story architecture and pitch deck visual system that helped secure $25M led by Lightspeed Venture Partners.",
  alternates: {
    canonical: "/work/composio/series-a-deck",
  }
};

export default function ComposioSeriesADeckArtifact() {
  const deckFeatures = [
    { label: "Infrastructure Framing", text: "Positioned Composio as the essential tooling & integration layer for agentic AI framework builders." },
    { label: "Developer Velocity Visuals", text: "Highlighting benchmark performance, tool-calling latencies, and platform adoption." },
    { label: "Sanitized Presentation", text: "Visual slide system maintaining high visual standards across investor meetings while protecting metrics." },
  ];

  return (
    <ArtifactLayout
      backHref="/work/composio"
      backLabel="← Back to Composio Case Study"
      category="COMPOSIO // FLAGSHIP ARTIFACT"
      tag="$25M SERIES A"
      title="The Pitch Deck Behind Composio's $25M Series A"
      subtitle="Built the story architecture and pitch deck visual system that helped secure $25M led by Lightspeed Venture Partners."
    >
      <div className="p-6 md:p-8 rounded-[var(--n-radius-panel)] border border-[var(--n-line)] bg-[var(--n-paper)] space-y-6 shadow-xs font-mono text-xs max-w-4xl">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 text-[var(--n-muted)] border-b border-[var(--n-line-soft)] pb-4">
          <span>RAISE: $25,000,000</span>
          <span className="text-[var(--n-ink)] font-semibold flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4" /> LED BY LIGHTSPEED VENTURE PARTNERS
          </span>
        </div>

        <div className="space-y-4 text-sm text-[var(--n-graphite)] font-sans leading-relaxed">
          <p>
            As sole designer at Composio, I collaborated directly with the founders to structure, design, and refine the pitch deck presented to investors.
          </p>
          <h3 className="text-base font-bold text-[var(--n-ink)] font-mono pt-2">Deck Architecture & Principles:</h3>
          <FeatureBulletList items={deckFeatures} />
        </div>
      </div>
      
      <div className="max-w-4xl pt-8 pb-12 overflow-x-auto snap-x snap-mandatory hide-scrollbar">
         <div className="aspect-[16/9] w-full min-w-[300px] border border-[var(--n-line)] bg-[var(--n-charcoal)] rounded-[var(--n-radius-film)] flex items-center justify-center snap-start text-[var(--n-canvas)] font-mono text-sm max-w-full">
            [SANITIZED PITCH DECK ARTIFACT MEDIA]
         </div>
      </div>
    </ArtifactLayout>
  );
}
