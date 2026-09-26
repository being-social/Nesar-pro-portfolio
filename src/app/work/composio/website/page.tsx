import { ArtifactLayout } from "@/components/ArtifactLayout";

export default function ComposioWebsiteArtifact() {
  return (
    <ArtifactLayout
      backHref="/work/composio"
      backLabel="← Back to Composio Case Study"
      category="COMPOSIO // WEB"
      tag="WEBSITE REDESIGN"
      title="Composio Website Redesign & Migration"
      subtitle="Redesigned and rebuilt the main company website, migrating it to WordPress for team CMS publishing."
    >
      <div className="p-8 rounded-[var(--n-radius-panel)] border border-[var(--n-line)] bg-[var(--n-paper)] space-y-4 shadow-xs font-mono text-xs">
        <p className="text-sm text-[var(--n-graphite)] font-sans leading-relaxed">
          Rebuilt the entire Composio company web presence, migrating legacy infrastructure to a clean WordPress CMS architecture that enabled marketing and content teams to publish documentation and blogs independently.
        </p>
      </div>
    </ArtifactLayout>
  );
}
