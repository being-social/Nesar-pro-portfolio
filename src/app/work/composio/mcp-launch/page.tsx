import Link from "next/link";

export default function McpLaunchArtifact() {
  return (
    <div className="space-y-12 py-8 max-w-4xl mx-auto">
      <Link href="/work/composio" className="text-xs font-mono text-[var(--n-playhead)] hover:underline">
        ← Back to Composio Case Study
      </Link>

      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs font-mono text-[var(--n-muted)]">
          <span className="text-[var(--n-playhead)] font-semibold">COMPOSIO // LAUNCH</span>
          <span>MCP INTEGRATION</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-medium tracking-tight text-[var(--n-ink)]">
          Model Context Protocol (MCP) Launch Creative
        </h1>
        <p className="text-lg text-[var(--n-graphite)] font-serif italic">
          Launch landing page, kinetic motion sequences, and developer messaging for Composio's MCP release.
        </p>
      </div>

      <div className="p-8 rounded-[var(--n-radius-panel)] border border-[var(--n-line)] bg-[var(--n-paper)] space-y-4 shadow-xs font-mono text-xs">
        <p className="text-sm text-[var(--n-graphite)] font-sans leading-relaxed">
          Designed the launch creatives and motion film introducing Composio's support for Anthropic's Model Context Protocol (MCP), connecting LLMs to custom tools and enterprise databases.
        </p>
      </div>
    </div>
  );
}
