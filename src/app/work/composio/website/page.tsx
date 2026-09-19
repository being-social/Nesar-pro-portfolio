import Link from "next/link";

export default function ComposioWebsiteArtifact() {
  return (
    <div className="space-y-12 py-8 max-w-4xl mx-auto">
      <Link href="/work/composio" className="text-xs font-mono text-[var(--n-playhead)] hover:underline">
        ← Back to Composio Case Study
      </Link>

      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs font-mono text-[var(--n-muted)]">
          <span className="text-[var(--n-playhead)] font-semibold">COMPOSIO // WEB</span>
          <span>WEBSITE REDESIGN</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-medium tracking-tight text-[var(--n-ink)]">
          Composio Website Redesign & Migration
        </h1>
        <p className="text-lg text-[var(--n-graphite)] font-serif italic">
          Redesigned and rebuilt the main company website, migrating it to WordPress for team CMS publishing.
        </p>
      </div>

      <div className="p-8 rounded-[var(--n-radius-panel)] border border-[var(--n-line)] bg-[var(--n-paper)] space-y-4 shadow-xs font-mono text-xs">
        <p className="text-sm text-[var(--n-graphite)] font-sans leading-relaxed">
          Rebuilt the entire Composio company web presence, migrating legacy infrastructure to a clean WordPress CMS architecture that enabled marketing and content teams to publish documentation and blogs independently.
        </p>
      </div>
    </div>
  );
}
