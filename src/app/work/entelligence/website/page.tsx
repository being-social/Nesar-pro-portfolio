import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { ArtifactLayout, FeatureBulletList } from "@/components/ArtifactLayout";

export default function EntelligenceWebsiteArtifact() {
  const highlights = [
    { label: "Zero-Handoff Execution", text: "Designed directly in Figma, tokenized in CSS variables, and authored in Next.js." },
    { label: "Motion System", text: "Custom 60fps easing curves (cubic-bezier(.16,1,.3,1)) for tab switching, code diff highlights, and hero particle reveals." },
    { label: "Performance Optimization", text: "Sub-second First Contentful Paint, SSG/ISR caching on Vercel edge, and zero layout shift." },
  ];

  return (
    <ArtifactLayout
      backHref="/work/entelligence"
      backLabel="← Back to Entelligence AI Case Study"
      category="ENTELLIGENCE AI // ARTIFACT"
      tag="2025"
      title="The entelligence.ai Website in Code"
      subtitle="Designed and built in code — hero section, fluid motion transitions, interactive code review demos, and design system."
    >
      <div className="p-8 rounded-[var(--n-radius-panel)] border border-[var(--n-line)] bg-[var(--n-paper)] space-y-6 shadow-xs">
        <div className="flex justify-between items-center text-xs font-mono text-[var(--n-muted)] border-b border-[var(--n-line-soft)] pb-4">
          <span>URL: entelligence.ai</span>
          <span className="text-[var(--n-ink)] font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> LIVE IN PRODUCTION
          </span>
        </div>

        <div className="aspect-video rounded-[var(--n-radius-film)] border border-[var(--n-line)] bg-[var(--n-paper-strong)] p-6 flex flex-col justify-between relative overflow-hidden font-mono">
          <div className="text-xs text-[var(--n-ink)]">
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
          className="inline-flex items-center gap-2 text-xs font-mono text-[var(--n-ink)] font-bold hover:underline"
        >
          Visit entelligence.ai live <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
      </div>

      <div className="space-y-6 text-sm text-[var(--n-graphite)] leading-relaxed font-sans">
        <h2 className="text-xl font-bold text-[var(--n-ink)] font-mono">Build Highlights</h2>
        <FeatureBulletList items={highlights} />
      </div>
    </ArtifactLayout>
  );
}
