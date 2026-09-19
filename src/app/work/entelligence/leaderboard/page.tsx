import Link from "next/link";

export default function LeaderboardArtifact() {
  return (
    <div className="space-y-12 py-8 max-w-4xl mx-auto">
      <Link href="/work/entelligence" className="text-xs font-mono text-[var(--n-playhead)] hover:underline">
        ← Back to Entelligence AI Case Study
      </Link>

      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs font-mono text-[var(--n-muted)]">
          <span className="text-[var(--n-playhead)] font-semibold">ENTELLIGENCE AI // ARTIFACT</span>
          <span>PUBLIC BRAND & METRICS</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-medium tracking-tight text-[var(--n-ink)]">
          The Engineering Leaderboard
        </h1>
        <p className="text-lg text-[var(--n-graphite)] font-serif italic">
          Turning developer productivity metrics and PR review speed into an engaging public leaderboard visual system.
        </p>
      </div>

      <div className="p-8 rounded-[var(--n-radius-panel)] border border-[var(--n-line)] bg-[var(--n-paper)] space-y-6 shadow-xs font-mono text-xs">
        <div className="space-y-4 text-sm text-[var(--n-graphite)] font-sans leading-relaxed">
          <p>
            The Entelligence Leaderboard highlights top engineering teams, code review response times, and quality scores across public & private repositories.
          </p>
          <h3 className="text-base font-bold text-[var(--n-ink)] font-mono pt-2">Design Engineering Logic:</h3>
          <ul className="list-disc list-inside space-y-2 font-mono text-xs text-[var(--n-graphite)]">
            <li><strong>Data Hierarchy:</strong> Clean row-based grid layout with subtle status pills and real-time rank updates.</li>
            <li><strong>Brand Crossover:</strong> Designed to fit both inside the web application and as shareable social graphics for viral team acquisition.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
