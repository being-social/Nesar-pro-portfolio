import Link from "next/link";
import { notFound } from "next/navigation";
import { PROJECTS } from "@/lib/content/data";
import { ArrowUpRight } from "lucide-react";
import type { Metadata } from 'next';

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  
  if (!project) return {};

  return {
    title: `${project.title} — ${project.company} — Nesar`,
    description: project.summary,
    alternates: {
      canonical: `/work/${slug}`,
    }
  };
}

export default async function WorkDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);

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
    <div className="space-y-16 py-16 px-4 sm:px-6 max-w-[1280px] mx-auto">
      <Link href="/work" className="inline-flex min-h-[44px] items-center text-xs font-mono text-[var(--n-playhead)] hover:underline -ml-2 px-2 font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--n-playhead)] rounded-md">
        ← Back to Selected Work
      </Link>

      <div className="space-y-6 max-w-4xl">
        <div className="flex items-center justify-between text-xs font-mono text-[var(--n-muted)]">
          <span className="text-[var(--n-playhead)] font-semibold">{project.company}</span>
          <span>{project.year}</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-medium tracking-tight text-[var(--n-ink)] leading-[1.1]">
          {project.title}
        </h1>
        <p className="text-xl md:text-2xl text-[var(--n-graphite)] font-serif italic max-w-3xl leading-relaxed">
          {project.thesis}
        </p>

        {project.publicUrl && (
          <div className="pt-2">
            <a
              href={project.publicUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center gap-1.5 text-sm font-mono text-[var(--n-playhead)] font-bold hover:underline transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--n-playhead)] px-4 py-2 bg-[var(--n-paper)] border border-[var(--n-line)] rounded-lg"
            >
              Visit Live Site <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        )}
      </div>

      {/* Sub-Artifacts Grid */}
      {artifacts.length > 0 && (
        <div className="space-y-6 pt-12 border-t border-[var(--n-line)]">
          <h3 className="text-xs font-mono text-[var(--n-graphite)] uppercase tracking-wider">
            Project Sub-Artifacts
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {artifacts.map((art, idx) => (
              <Link
                key={idx}
                href={art.href}
                className="group p-6 rounded-[var(--n-radius-card)] border border-[var(--n-line)] bg-[var(--n-paper)] space-y-3 hover:border-[var(--n-playhead)] transition-all min-h-[44px] block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--n-playhead)]"
              >
                <div className="flex items-start justify-between">
                  <h4 className="text-base font-bold text-[var(--n-ink)] group-hover:text-[var(--n-playhead)] transition-colors">{art.title}</h4>
                  <ArrowUpRight className="w-4 h-4 text-[var(--n-muted)] group-hover:text-[var(--n-playhead)] transition-colors" />
                </div>
                <p className="text-sm text-[var(--n-graphite)] leading-relaxed">{art.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Chapter Breakdown */}
      <div className="space-y-8 pt-12 border-t border-[var(--n-line)]">
        <h2 className="text-xs font-mono text-[var(--n-graphite)] uppercase tracking-wider">
          Case Study Chapters
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {chapters.map((ch) => (
            <div key={ch.id} className="p-6 rounded-[var(--n-radius-card)] border border-[var(--n-line)] bg-[var(--n-paper)] space-y-3">
              <span className="text-sm font-mono text-[var(--n-playhead)] font-bold block">{ch.id} / {ch.title}</span>
              <p className="text-sm text-[var(--n-graphite)] leading-relaxed">{ch.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
