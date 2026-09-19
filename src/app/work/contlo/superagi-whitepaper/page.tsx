import Link from "next/link";

export default function SuperAGIWhitepaperArtifact() {
  return (
    <div className="space-y-12 py-8 max-w-4xl mx-auto">
      <Link href="/work/contlo" className="text-xs font-mono text-[var(--n-playhead)] hover:underline">
        ← Back to Contlo Case Study
      </Link>

      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs font-mono text-[var(--n-muted)]">
          <span className="text-[var(--n-playhead)] font-semibold">CONTLO // EDITORIAL</span>
          <span>SUPERAGI WHITEPAPER</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-medium tracking-tight text-[var(--n-ink)]">
          SuperAGI Whitepaper Design
        </h1>
        <p className="text-lg text-[var(--n-graphite)] font-serif italic">
          Cover design and internal graphic layouts for the SuperAGI whitepaper release.
        </p>
      </div>

      <div className="p-8 rounded-[var(--n-radius-panel)] border border-[var(--n-line)] bg-[var(--n-paper)] space-y-4 shadow-xs font-mono text-xs">
        <p className="text-sm text-[var(--n-graphite)] font-sans leading-relaxed">
          Designed the cover visual direction, internal technical diagrams, and layout formatting for the SuperAGI whitepaper, establishing the visual tone for the open-source agent framework.
        </p>
      </div>
    </div>
  );
}
