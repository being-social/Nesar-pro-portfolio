import { ArtifactLayout } from "@/components/ArtifactLayout";

export default function ContloBrandMarketingArtifact() {
  return (
    <ArtifactLayout
      backHref="/work/contlo"
      backLabel="← Back to Contlo Case Study"
      category="CONTLO // BRAND"
      tag="BRAND & MARKETING"
      title="SuperAGI & Verk Brand Marketing"
      subtitle="WordPress blog visuals, thumbnail graphics, and early-stage brand design across SuperAGI sub-brands."
    >
      <div className="p-8 rounded-[var(--n-radius-panel)] border border-[var(--n-line)] bg-[var(--n-paper)] space-y-4 shadow-xs font-mono text-xs">
        <p className="text-sm text-[var(--n-graphite)] font-sans leading-relaxed">
          Produced blog thumbnails, social media visual assets, and marketing collateral across the SuperAGI ecosystem (Contlo and Verk) during their early stages in Bengaluru.
        </p>
      </div>
    </ArtifactLayout>
  );
}
