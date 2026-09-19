import Link from "next/link";

export default function ContloBrandMarketingArtifact() {
  return (
    <div className="space-y-12 py-8 max-w-4xl mx-auto">
      <Link href="/work/contlo" className="text-xs font-mono text-[var(--n-playhead)] hover:underline">
        ← Back to Contlo Case Study
      </Link>

      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs font-mono text-[var(--n-muted)]">
          <span className="text-[var(--n-playhead)] font-semibold">CONTLO // BRAND</span>
          <span>BRAND & MARKETING</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-medium tracking-tight text-[var(--n-ink)]">
          SuperAGI & Verk Brand Marketing
        </h1>
        <p className="text-lg text-[var(--n-graphite)] font-serif italic">
          WordPress blog visuals, thumbnail graphics, and early-stage brand design across SuperAGI sub-brands.
        </p>
      </div>

      <div className="p-8 rounded-[var(--n-radius-panel)] border border-[var(--n-line)] bg-[var(--n-paper)] space-y-4 shadow-xs font-mono text-xs">
        <p className="text-sm text-[var(--n-graphite)] font-sans leading-relaxed">
          Produced blog thumbnails, social media visual assets, and marketing collateral across the SuperAGI ecosystem (Contlo and Verk) during their early stages in Bengaluru.
        </p>
      </div>
    </div>
  );
}
