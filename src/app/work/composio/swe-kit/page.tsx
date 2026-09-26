import { ArtifactLayout } from "@/components/ArtifactLayout";

export default function SweKitArtifact() {
  return (
    <ArtifactLayout
      backHref="/work/composio"
      backLabel="← Back to Composio Case Study"
      category="COMPOSIO // LAUNCH"
      tag="SWE-KIT LAUNCH"
      title="SWE-Kit Launch Website & Motion Film"
      subtitle="Designed the launch site, developer communication, and launch video for SWE-Kit agentic coding infrastructure."
    >
      <div className="p-8 rounded-[var(--n-radius-panel)] border border-[var(--n-line)] bg-[var(--n-paper)] space-y-4 shadow-xs font-mono text-xs">
        <p className="text-sm text-[var(--n-graphite)] font-sans leading-relaxed">
          SWE-Kit enables software engineering agents to execute code, run tests, and manage repositories. I designed the dedicated launch site, developer onboarding flow, and launch video sequence that launched the product to the AI dev community.
        </p>
      </div>
    </ArtifactLayout>
  );
}
