import { Lock } from "lucide-react";
import { ArtifactLayout } from "@/components/ArtifactLayout";

export default function InvestorDecksArtifact() {
  return (
    <ArtifactLayout
      backHref="/work/entelligence"
      backLabel="← Back to Entelligence AI Case Study"
      category="ENTELLIGENCE AI // ARTIFACT"
      tag="INVESTOR NARRATIVE"
      title="Fundraising Story & Pitch Deck System"
      subtitle="Narrative architecture and visual slide decks designed for founders to present to VCs during fundraising rounds."
    >
      <div className="p-8 rounded-[var(--n-radius-panel)] border border-[var(--n-line)] bg-[var(--n-paper)] space-y-4 shadow-xs font-mono text-xs">
        <div className="flex items-center gap-2 text-amber-500 font-semibold">
          <Lock className="w-4 h-4" /> SANITIZED / PUBLIC-SAFE VIEW ONLY
        </div>
        <p className="text-sm text-[var(--n-graphite)] font-sans leading-relaxed">
          Designed the slide templates, pitch narrative flow, and financial/product visualization components that the founders take into VC fundraising meetings. Confidential metrics and unannounced terms remain sanitized.
        </p>
      </div>
    </ArtifactLayout>
  );
}
