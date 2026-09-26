import { ArtifactLayout } from "@/components/ArtifactLayout";

export default function SuperAGIWhitepaperArtifact() {
  return (
    <ArtifactLayout
      backHref="/work/contlo"
      backLabel="← Back to Contlo Case Study"
      category="CONTLO // EDITORIAL"
      tag="SUPERAGI WHITEPAPER"
      title="SuperAGI Whitepaper Design"
      subtitle="Cover design and internal graphic layouts for the SuperAGI whitepaper release."
    >
      <div className="p-8 rounded-[var(--n-radius-panel)] border border-[var(--n-line)] bg-[var(--n-paper)] space-y-4 shadow-xs font-mono text-xs">
        <p className="text-sm text-[var(--n-graphite)] font-sans leading-relaxed">
          Designed the cover visual direction, internal technical diagrams, and layout formatting for the SuperAGI whitepaper, establishing the visual tone for the open-source agent framework.
        </p>
      </div>
    </ArtifactLayout>
  );
}
