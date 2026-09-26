import { ArtifactLayout } from "@/components/ArtifactLayout";

export default function McpLaunchArtifact() {
  return (
    <ArtifactLayout
      backHref="/work/composio"
      backLabel="← Back to Composio Case Study"
      category="COMPOSIO // LAUNCH"
      tag="MCP INTEGRATION"
      title="Model Context Protocol (MCP) Launch Creative"
      subtitle="Launch landing page, kinetic motion sequences, and developer messaging for Composio's MCP release."
    >
      <div className="p-8 rounded-[var(--n-radius-panel)] border border-[var(--n-line)] bg-[var(--n-paper)] space-y-4 shadow-xs font-mono text-xs">
        <p className="text-sm text-[var(--n-graphite)] font-sans leading-relaxed">
          Designed the launch creatives and motion film introducing Composio's support for Anthropic's Model Context Protocol (MCP), connecting LLMs to custom tools and enterprise databases.
        </p>
      </div>
    </ArtifactLayout>
  );
}
