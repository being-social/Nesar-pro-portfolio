import Link from "next/link";
import { Lock } from "lucide-react";

export default function InvestorDecksArtifact() {
  return (
    <div className="space-y-12 py-8 max-w-4xl mx-auto">
      <Link href="/work/entelligence" className="text-xs font-mono text-[var(--n-playhead)] hover:underline">
        ← Back to Entelligence AI Case Study
      </Link>

      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs font-mono text-[var(--n-muted)]">
          <span className="text-[var(--n-playhead)] font-semibold">ENTELLIGENCE AI // ARTIFACT</span>
          <span>INVESTOR NARRATIVE</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-medium tracking-tight text-[var(--n-ink)]">
          Fundraising Story & Pitch Deck System
        </h1>
        <p className="text-lg text-[var(--n-graphite)] font-serif italic">
          Narrative architecture and visual slide decks designed for founders to present to VCs during fundraising rounds.
        </p>
      </div>

      <div className="p-8 rounded-[var(--n-radius-panel)] border border-[var(--n-line)] bg-[var(--n-paper)] space-y-4 shadow-xs font-mono text-xs">
        <div className="flex items-center gap-2 text-amber-500 font-semibold">
          <Lock className="w-4 h-4" /> SANITIZED / PUBLIC-SAFE VIEW ONLY
        </div>
        <p className="text-sm text-[var(--n-graphite)] font-sans leading-relaxed">
          Designed the slide templates, pitch narrative flow, and financial/product visualization components that the founders take into VC fundraising meetings. Confidential metrics and unannounced terms remain sanitized.
        </p>
      </div>
    </div>
  );
}
