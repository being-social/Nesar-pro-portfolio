import Link from "next/link";

export default function SweKitArtifact() {
  return (
    <div className="space-y-12 py-8 max-w-4xl mx-auto">
      <Link href="/work/composio" className="text-xs font-mono text-[var(--n-playhead)] hover:underline">
        ← Back to Composio Case Study
      </Link>

      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs font-mono text-[var(--n-muted)]">
          <span className="text-[var(--n-playhead)] font-semibold">COMPOSIO // LAUNCH</span>
          <span>SWE-KIT LAUNCH</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-medium tracking-tight text-[var(--n-ink)]">
          SWE-Kit Launch Website & Motion Film
        </h1>
        <p className="text-lg text-[var(--n-graphite)] font-serif italic">
          Designed the launch site, developer communication, and launch video for SWE-Kit agentic coding infrastructure.
        </p>
      </div>

      <div className="p-8 rounded-[var(--n-radius-panel)] border border-[var(--n-line)] bg-[var(--n-paper)] space-y-4 shadow-xs font-mono text-xs">
        <p className="text-sm text-[var(--n-graphite)] font-sans leading-relaxed">
          SWE-Kit enables software engineering agents to execute code, run tests, and manage repositories. I designed the dedicated launch site, developer onboarding flow, and launch video sequence that launched the product to the AI dev community.
        </p>
      </div>
    </div>
  );
}
