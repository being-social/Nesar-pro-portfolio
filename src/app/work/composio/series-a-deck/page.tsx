import Link from "next/link";
import { Sparkles, CheckCircle2 } from "lucide-react";

export default function ComposioSeriesADeckArtifact() {
  return (
    <div className="space-y-12 py-8 max-w-4xl mx-auto">
      <Link href="/work/composio" className="text-xs font-mono text-[var(--n-playhead)] hover:underline">
        ← Back to Composio Case Study
      </Link>

      <div className="space-y-4">
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

      <div className="p-8 rounded-[var(--n-radius-panel)] border border-[var(--n-line)] bg-[var(--n-paper)] space-y-6 shadow-xs font-mono text-xs">
        <div className="flex justify-between items-center text-[var(--n-muted)] border-b border-[var(--n-line-soft)] pb-4">
          <span>RAISE: $25,000,000</span>
          <span className="text-[var(--n-playhead)] font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> LED BY LIGHTSPEED VENTURE PARTNERS
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
            <li><strong>Sanitized Presentation:</strong> Visual slide system maintaining high visual standards across investor meetings.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
