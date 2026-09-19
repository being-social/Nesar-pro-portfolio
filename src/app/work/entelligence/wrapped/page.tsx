import Link from "next/link";
import { Film, Play } from "lucide-react";

export default function WrappedArtifact() {
  return (
    <div className="space-y-12 py-8 max-w-4xl mx-auto">
      <Link href="/work/entelligence" className="text-xs font-mono text-[var(--n-playhead)] hover:underline">
        ← Back to Entelligence AI Case Study
      </Link>

      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs font-mono text-[var(--n-muted)]">
          <span className="text-[var(--n-playhead)] font-semibold">ENTELLIGENCE AI // ARTIFACT</span>
          <span>KINETIC MOTION STORYTELLING</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-medium tracking-tight text-[var(--n-ink)]">
          Entelligence Engineering Wrapped
        </h1>
        <p className="text-lg text-[var(--n-graphite)] font-serif italic">
          Turning complex annual engineering activity metrics into a kinetic, shareable motion experience.
        </p>
      </div>

      <div className="p-8 rounded-[var(--n-radius-panel)] border border-[var(--n-line)] bg-[var(--n-paper)] space-y-6 shadow-xs font-mono text-xs">
        <div className="aspect-video bg-[var(--n-paper-strong)] border border-[var(--n-line-soft)] rounded-[var(--n-radius-film)] p-6 flex flex-col justify-between relative overflow-hidden">
          <div className="flex justify-between text-xs text-[var(--n-muted)]">
            <span>WRAPPED_2025.MP4</span>
            <span>60 FPS</span>
          </div>
          <div className="flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-[var(--n-playhead-soft)] flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
              <Play className="w-6 h-6 text-[var(--n-playhead)] fill-[var(--n-playhead)] ml-1" />
            </div>
          </div>
          <div className="text-xs text-[var(--n-playhead)] font-semibold">ENTELLIGENCE MOTION SYSTEM</div>
        </div>

        <div className="space-y-2 text-sm text-[var(--n-graphite)] font-sans">
          <p>
            Designed custom motion cards highlighting total lines reviewed, bugs prevented, and review response speeds, generating viral engagement among CTOs and VP of Engineering leaders on X and LinkedIn.
          </p>
        </div>
      </div>
    </div>
  );
}
