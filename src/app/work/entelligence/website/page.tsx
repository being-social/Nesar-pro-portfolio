import Link from "next/link";
import { ArrowUpRight, CheckCircle2, Code, Layers, Sparkles } from "lucide-react";

export default function EntelligenceWebsiteArtifact() {
  return (
    <div className="space-y-12 py-8 max-w-4xl mx-auto">
      {/* Navigation */}
      <Link href="/work/entelligence" className="text-xs font-mono text-[var(--n-playhead)] hover:underline">
        ← Back to Entelligence AI Case Study
      </Link>

      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs font-mono text-[var(--n-muted)]">
          <span className="text-[var(--n-playhead)] font-semibold">ENTELLIGENCE AI // ARTIFACT</span>
          <span>2025</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-medium tracking-tight text-[var(--n-ink)]">
          The entelligence.ai Website in Code
        </h1>
        <p className="text-lg text-[var(--n-graphite)] font-serif italic">
          Designed and built in code — hero section, fluid motion transitions, interactive code review demos, and design system.
        </p>
      </div>

      {/* Live Preview Box */}
      <div className="p-8 rounded-[var(--n-radius-panel)] border border-[var(--n-line)] bg-[var(--n-paper)] space-y-6 shadow-xs">
        <div className="flex justify-between items-center text-xs font-mono text-[var(--n-muted)] border-b border-[var(--n-line-soft)] pb-4">
          <span>URL: entelligence.ai</span>
          <span className="text-[var(--n-playhead)] font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> LIVE IN PRODUCTION
          </span>
        </div>

        <div className="aspect-video rounded-[var(--n-radius-film)] border border-[var(--n-line)] bg-[var(--n-paper-strong)] p-6 flex flex-col justify-between relative overflow-hidden font-mono">
          <div className="text-xs text-[var(--n-playhead)]">
            [HERO_MOTION_STAGE]
          </div>
          <div className="space-y-2">
            <div className="text-2xl font-bold text-[var(--n-ink)] font-sans">
              "AI Code Review that Reads Your Incident History."
            </div>
            <div className="text-xs text-[var(--n-graphite)] font-sans">
              Interactive split-pane code diffs + automated incident intelligence for dev leads.
            </div>
          </div>
          <div className="flex justify-between text-[10px] text-[var(--n-muted)]">
            <span>FRAME: 001</span>
            <span>NEXT.JS + TAILWIND + FRAMER MOTION</span>
          </div>
        </div>

        <a
          href="https://entelligence.ai"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-xs font-mono text-[var(--n-playhead)] font-bold hover:underline"
        >
          Visit entelligence.ai live <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Details */}
      <div className="space-y-6 text-sm text-[var(--n-graphite)] leading-relaxed font-sans">
        <h2 className="text-xl font-bold text-[var(--n-ink)] font-mono">Build Highlights</h2>
        <ul className="list-disc list-inside space-y-2 font-mono text-xs">
          <li><strong>Zero-Handoff Execution:</strong> Designed directly in Figma, tokenized in CSS variables, and authored in Next.js.</li>
          <li><strong>Motion System:</strong> Custom 60fps easing curves (`cubic-bezier(.16,1,.3,1)`) for tab switching, code diff highlights, and hero particle reveals.</li>
          <li><strong>Performance Optimization:</strong> Sub-second First Contentful Paint, SSG/ISR caching on Vercel edge, and zero layout shift.</li>
        </ul>
      </div>
    </div>
  );
}
