import { ArtifactLayout } from "@/components/ArtifactLayout";

export default function DesignSystemArtifact() {
  const tokenCards = [
    { title: "Color System", desc: "Dark-first code editor surfaces + high-contrast alert hues." },
    { title: "Motion Tokens", desc: "150ms micro-interactions, 300ms layout shifts, custom spring easing." },
    { title: "Component Bridge", desc: "Figma component variants mapped 1:1 to React TypeScript components." },
  ];

  return (
    <ArtifactLayout
      backHref="/work/entelligence"
      backLabel="← Back to Entelligence AI Case Study"
      category="ENTELLIGENCE AI // ARTIFACT"
      tag="DESIGN SYSTEM & TOKENS"
      title="The Entelligence Design System & Token Architecture"
      subtitle="Unified token library, motion scales, and React components linking product and marketing surfaces."
    >
      <div className="p-8 rounded-[var(--n-radius-panel)] border border-[var(--n-line)] bg-[var(--n-paper)] space-y-6 shadow-xs font-mono text-xs">
        <h3 className="text-sm font-bold text-[var(--n-ink)] uppercase tracking-wider">
          Token Architecture
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {tokenCards.map((card) => (
            <div key={card.title} className="p-4 rounded border border-[var(--n-line-soft)] bg-[var(--n-paper-strong)] space-y-1">
              <span className="text-[var(--n-ink)]">{card.title}</span>
              <p className="text-[11px] text-[var(--n-graphite)] font-sans">{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </ArtifactLayout>
  );
}
