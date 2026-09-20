import Link from "next/link";
import { ArrowUpRight, Layers } from "lucide-react";
import { PROJECTS } from "@/lib/content/data";

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Selected Work — Nesar",
  description: "Portfolio case studies across engineering and design.",
  alternates: { canonical: "/work" }
};


export default function WorkIndexPage() {
  return (
    <div className="space-y-16 py-8 max-w-6xl mx-auto">
      {/* Editorial Header */}
      <div className="border-b border-[var(--n-line)] pb-8 space-y-4">
        <div className="text-xs font-mono text-[var(--n-playhead)] font-semibold uppercase tracking-wider">
          WORK INDEX
        </div>
        <h1 className="text-5xl sm:text-7xl font-medium tracking-tight text-[var(--n-ink)]">
          Selected Case Studies
        </h1>
        <p className="text-sm text-[var(--n-graphite)] font-mono max-w-xl leading-relaxed">
          Product, brand, motion, and launch systems — the design decisions that made them real. Three flagship studies, each showing the full pipeline from brief to shipped.
        </p>
      </div>

      {/* Project Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {PROJECTS.filter((p) => p.featured).map((project) => (
          <Link
            key={project.slug}
            href={`/work/${project.slug}`}
            className="group p-8 rounded-[var(--n-radius-panel)] border border-[var(--n-line)] bg-[var(--n-paper)] hover:border-[var(--n-playhead)] transition-all flex flex-col justify-between space-y-6 shadow-xs"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-[var(--n-muted)]">
                <span className="text-[var(--n-playhead)] font-semibold">{project.company}</span>
                <span>{project.year}</span>
              </div>

              <h2 className="text-2xl md:text-3xl font-medium tracking-tight text-[var(--n-ink)] group-hover:text-[var(--n-playhead)] transition-colors">
                {project.title}
              </h2>

              <p className="text-sm font-serif italic text-[var(--n-graphite)] leading-relaxed">
                {project.thesis}
              </p>

              <p className="text-sm text-[var(--n-graphite)] leading-relaxed">
                {project.summary}
              </p>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              {project.disciplines.map((d, i) => (
                <span
                  key={i}
                  className="text-[11px] font-mono px-2.5 py-1 rounded-[var(--n-radius-pill)] border border-[var(--n-line)] text-[var(--n-graphite)] bg-[var(--n-paper-strong)]"
                >
                  {d}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>

      {/* Sub-Artifact Preview */}
      <div className="border-t border-[var(--n-line)] pt-12 space-y-6">
        <h2 className="text-xs font-mono text-[var(--n-graphite)] uppercase tracking-wider">
          Deep Dives
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <Link href="/work/entelligence/website" className="group">
            <div className="p-5 rounded-[var(--n-radius-card)] border border-[var(--n-line)] bg-[var(--n-paper)] hover:border-[var(--n-playhead)] transition-all">
              <span className="text-xs font-mono text-[var(--n-graphite)] block mb-1">Entelligence // Website</span>
              <span className="text-sm font-medium text-[var(--n-ink)] group-hover:text-[var(--n-playhead)] transition-colors">
                Live site in code with motion system
              </span>
            </div>
          </Link>
          <Link href="/work/composio/series-a-deck" className="group">
            <div className="p-5 rounded-[var(--n-radius-card)] border border-[var(--n-line)] bg-[var(--n-paper)] hover:border-[var(--n-playhead)] transition-all">
              <span className="text-xs font-mono text-[var(--n-graphite)] block mb-1">Composio // Pitch Deck</span>
              <span className="text-sm font-medium text-[var(--n-ink)] group-hover:text-[var(--n-playhead)] transition-colors">
                The deck behind a $25M Series A
              </span>
            </div>
          </Link>
          <Link href="/work/entelligence/design-system" className="group">
            <div className="p-5 rounded-[var(--n-radius-card)] border border-[var(--n-line)] bg-[var(--n-paper)] hover:border-[var(--n-playhead)] transition-all">
              <span className="text-xs font-mono text-[var(--n-graphite)] block mb-1">Entelligence // Design System</span>
              <span className="text-sm font-medium text-[var(--n-ink)] group-hover:text-[var(--n-playhead)] transition-colors">
                Tokenization & component library
              </span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
