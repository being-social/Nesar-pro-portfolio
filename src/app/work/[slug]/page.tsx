import Link from "next/link";
import { notFound } from "next/navigation";
import { PROJECTS } from "@/lib/content/data";
import { ArrowUpRight, CheckCircle, Code, Layers } from "lucide-react";

export default function WorkDetailPage({ params }: { params: { slug: string } }) {
  const project = PROJECTS.find((p) => p.slug === params.slug);

  if (!project) {
    notFound();
  }

  const chapters = [
    { id: "01", title: "Context", text: project.summary },
    { id: "02", title: "Direction", text: "Establishing visual system, typography scale & brand identity." },
    { id: "03", title: "Frames", text: "Keyframes, hero layouts & interface compositions." },
    { id: "04", title: "System", text: "Tokenization, CSS variables, components & design guidelines." },
    { id: "05", title: "Build", text: "Implementation in Next.js, React 19, Tailwind CSS v4 & Motion." },
    { id: "06", title: "Outcome", text: "Shipped to production, used by real engineering & investor audiences." },
    { id: "07", title: "Reflection", text: "Key design-engineering learnings & optimization passes." },
  ];

  const subArtifacts: Record<string, { title: string; desc: string; href: string }[]> = {
    entelligence: [
      { title: "Website in Code", desc: "Live site architecture with custom motion system", href: "/work/entelligence/website" },
      { title: "DeepReviews & Agent Insights", desc: "AI code review interface UX", href: "/work/entelligence/agent-insights" },
      { title: "Engineering Leaderboard", desc: "Public data hierarchy & leaderboard visuals", href: "/work/entelligence/leaderboard" },
      { title: "Entelligence Wrapped", desc: "Data narrative & kinetic motion sequence", href: "/work/entelligence/wrapped" },
      { title: "Design System Tokens", desc: "Reusable token library across web & product", href: "/work/entelligence/design-system" },
      { title: "Investor Decks", desc: "Sanitized fundraising story & deck architecture", href: "/work/entelligence/decks" },
    ],
    composio: [
      { title: "$25M Series A Pitch Deck", desc: "Story architecture & visual deck system", href: "/work/composio/series-a-deck" },
      { title: "SWE-Kit Launch", desc: "Developer launch site & motion film", href: "/work/composio/swe-kit" },
      { title: "MCP Launch", desc: "Model Context Protocol launch creative", href: "/work/composio/mcp-launch" },
      { title: "Website Redesign", desc: "Migration and site design", href: "/work/composio/website" },
    ],
    contlo: [
      { title: "SuperAGI Whitepaper", desc: "Cover and internal layout design", href: "/work/contlo/superagi-whitepaper" },
      { title: "Brand & Marketing", desc: "Blog visuals and early ecosystem design", href: "/work/contlo/brand-marketing" },
    ],
  };

  const artifacts = subArtifacts[project.slug] || [];

  return (
    <div className="space-y-12 py-8 max-w-4xl mx-auto">
      <Link href="/work" className="text-xs font-mono text-[var(--n-playhead)] hover:underline">
        ← Back to Selected Work
      </Link>

      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs font-mono text-[var(--n-muted)]">
          <span className="text-[var(--n-playhead)] font-semibold">{project.company}</span>
          <span>{project.year}</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-medium tracking-tight text-[var(--n-ink)]">
          {project.title}
        </h1>
        <p className="text-lg text-[var(--n-graphite)] font-serif italic">{project.thesis}</p>

        {project.publicUrl && (
          <a
            href={project.publicUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-[var(--n-playhead)] hover:underline pt-2 font-bold"
          >
            Visit Live Site <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        )}
      </div>

      {/* Sub-Artifacts Grid */}
      {artifacts.length > 0 && (
        <div className="space-y-4 pt-6 border-t border-[var(--n-line)]">
          <h3 className="text-xs font-mono text-[var(--n-graphite)] uppercase tracking-wider">
            Project Sub-Artifacts
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {artifacts.map((art, idx) => (
              <div
                key={idx}
                className="p-4 rounded-[var(--n-radius-card)] border border-[var(--n-line)] bg-[var(--n-paper)] space-y-2 hover:border-[var(--n-playhead)] transition-colors"
              >
                <h4 className="text-sm font-bold text-[var(--n-ink)]">{art.title}</h4>
                <p className="text-xs text-[var(--n-graphite)]">{art.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Chapter Breakdown */}
      <div className="space-y-8 pt-8 border-t border-[var(--n-line)]">
        <h2 className="text-xs font-mono text-[var(--n-graphite)] uppercase tracking-wider">
          Case Study Chapters
        </h2>

        <div className="space-y-6">
          {chapters.map((ch) => (
            <div key={ch.id} className="p-6 rounded-[var(--n-radius-card)] border border-[var(--n-line)] bg-[var(--n-paper)] space-y-2">
              <span className="text-xs font-mono text-[var(--n-playhead)] font-bold">{ch.id} / {ch.title}</span>
              <p className="text-sm text-[var(--n-graphite)] leading-relaxed">{ch.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
