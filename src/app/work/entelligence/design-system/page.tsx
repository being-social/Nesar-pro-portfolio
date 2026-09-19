import Link from "next/link";
import { Code, Layers } from "lucide-react";

export default function DesignSystemArtifact() {
  return (
    <div className="space-y-12 py-8 max-w-4xl mx-auto">
      <Link href="/work/entelligence" className="text-xs font-mono text-[var(--n-playhead)] hover:underline">
        ← Back to Entelligence AI Case Study
      </Link>

      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs font-mono text-[var(--n-muted)]">
          <span className="text-[var(--n-playhead)] font-semibold">ENTELLIGENCE AI // ARTIFACT</span>
          <span>DESIGN SYSTEM & TOKENS</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-medium tracking-tight text-[var(--n-ink)]">
          The Entelligence Design System & Token Architecture
        </h1>
        <p className="text-lg text-[var(--n-graphite)] font-serif italic">
          Unified token library, motion scales, and React components linking product and marketing surfaces.
        </p>
      </div>

      <div className="p-8 rounded-[var(--n-radius-panel)] border border-[var(--n-line)] bg-[var(--n-paper)] space-y-6 shadow-xs font-mono text-xs">
        <h3 className="text-sm font-bold text-[var(--n-ink)] uppercase tracking-wider">
          Token Architecture
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded border border-[var(--n-line-soft)] bg-[var(--n-paper-strong)] space-y-1">
            <span className="text-[var(--n-playhead)]">Color System</span>
            <p className="text-[11px] text-[var(--n-graphite)] font-sans">Dark-first code editor surfaces + high-contrast alert hues.</p>
          </div>
          <div className="p-4 rounded border border-[var(--n-line-soft)] bg-[var(--n-paper-strong)] space-y-1">
            <span className="text-[var(--n-playhead)]">Motion Tokens</span>
            <p className="text-[11px] text-[var(--n-graphite)] font-sans">150ms micro-interactions, 300ms layout shifts, custom spring easing.</p>
          </div>
          <div className="p-4 rounded border border-[var(--n-line-soft)] bg-[var(--n-paper-strong)] space-y-1">
            <span className="text-[var(--n-playhead)]">Component Bridge</span>
            <p className="text-[11px] text-[var(--n-graphite)] font-sans">Figma component variants mapped 1:1 to React TypeScript components.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
