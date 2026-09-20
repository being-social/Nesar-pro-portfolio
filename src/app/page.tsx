"use client";

import Link from "next/link";
import { ArrowUpRight, Play, Film, Layers, Code, Sparkles } from "lucide-react";
import { PROJECTS, MOTION_PIECES, EXPERIMENTS } from "@/lib/content/data";

export default function HomePage() {
  const practiceRange = [
    { title: "Motion", desc: "Launch films, interface motion, kinetic typography & 60fps timing passes." },
    { title: "Product", desc: "Developer tools, AI code review surfaces, dashboards & user activation." },
    { title: "Web", desc: "Next.js, TypeScript, React 19, Tailwind v4 & custom transition engines." },
    { title: "Systems", desc: "Tokenization, component libraries, Hermes agents & WhatsApp automation." },
  ];

  const processSteps = [
    { step: "01", name: "brief", detail: "Understand the core strategic goal" },
    { step: "02", name: "direction", detail: "Establish mood, visual hierarchy & motion tone" },
    { step: "03", name: "frames", detail: "Keyframe design & storyboard composition" },
    { step: "04", name: "system", detail: "Build reusable design & motion tokens" },
    { step: "05", name: "motion", detail: "Timing passes, easing curves & fluid transitions" },
    { step: "06", name: "build", detail: "Ship in clean Next.js, React 19 & Tailwind" },
    { step: "07", name: "ship", detail: "Verification, deployment & production validation" },
  ];

  return (
    <div className="space-y-24 py-8">
      {/* HERO SECTION (§12 of Design System) */}
      <section className="space-y-8">
        <div className="flex items-center justify-between text-xs font-mono text-[var(--n-muted)] border-b border-[var(--n-line-soft)] pb-4">
          <span>[00:00:00:00]</span>
          <span className="text-[var(--n-playhead)] font-semibold tracking-wider">
            MOTION DESIGNER · DESIGN ENGINEER
          </span>
          <span className="hidden sm:inline">24 FPS · 1080P</span>
        </div>

        <div className="space-y-6 max-w-4xl">
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-medium tracking-tight leading-[1.05] text-[var(--n-ink)]">
            I make things move. <br />
            Then I make them <span className="text-[var(--n-playhead)] italic font-serif">real.</span>
          </h1>

          <p className="text-lg md:text-xl text-[var(--n-graphite)] max-w-2xl leading-relaxed">
            I’m Nesar — a motion designer and design engineer shaping AI products across product, brand, web, and launch motion. I code when the idea needs to become real.
          </p>

          <div className="flex items-center gap-4 pt-2">
            <Link
              href="/work"
              className="px-6 py-3 rounded-[var(--n-radius-control)] bg-[var(--n-charcoal)] text-[var(--n-paper)] font-medium text-sm hover:opacity-90 transition-opacity shadow-xs"
            >
              View work
            </Link>
            <Link
              href="/motion"
              className="px-6 py-3 rounded-[var(--n-radius-control)] border border-[var(--n-line)] hover:border-[var(--n-playhead)] text-[var(--n-playhead)] font-mono text-sm flex items-center gap-2 transition-colors"
            >
              <Play className="w-4 h-4 fill-[var(--n-playhead)]" /> Play reel
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 2: REEL / MOVING PROOF */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-[var(--n-line)] pb-3">
          <h2 className="text-xs font-mono text-[var(--n-graphite)] uppercase tracking-wider flex items-center gap-2">
            <Film className="w-4 h-4 text-[var(--n-playhead)]" />
            01 / Motion Proof
          </h2>
          <Link href="/motion" className="text-xs font-mono text-[var(--n-playhead)] hover:underline">
            View motion archive →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MOTION_PIECES.map((piece) => (
            <Link
              key={piece.slug}
              href={`/motion/${piece.slug}`}
              className="group p-4 rounded-[var(--n-radius-card)] border border-[var(--n-line)] bg-[var(--n-paper)] hover:border-[var(--n-playhead)] transition-all flex flex-col justify-between space-y-4 shadow-xs"
            >
              <div className="aspect-video bg-[var(--n-paper-strong)] border border-[var(--n-line-soft)] rounded-[var(--n-radius-film)] p-4 flex flex-col justify-between relative overflow-hidden group-hover:shadow-md transition-shadow">
                <div className="flex justify-between text-[10px] font-mono text-[var(--n-muted)] z-10">
                  <span>{piece.duration}</span>
                  <span>{piece.fps} FPS</span>
                </div>
                <div className="flex items-center justify-center z-10">
                  <div className="w-10 h-10 rounded-full bg-[var(--n-playhead-soft)] flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Play className="w-4 h-4 text-[var(--n-playhead)] fill-[var(--n-playhead)]" />
                  </div>
                </div>
                <div className="text-[10px] font-mono text-[var(--n-playhead)] font-semibold z-10">
                  {piece.client}
                </div>
              </div>

              <div className="space-y-1">
                <h3 className="text-base font-bold text-[var(--n-ink)] group-hover:text-[var(--n-playhead)] transition-colors">
                  {piece.title}
                </h3>
                <p className="text-xs text-[var(--n-graphite)] line-clamp-2">{piece.summary}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* SECTION 3: SELECTED WORK */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-[var(--n-line)] pb-3">
          <h2 className="text-xs font-mono text-[var(--n-graphite)] uppercase tracking-wider flex items-center gap-2">
            <Layers className="w-4 h-4 text-[var(--n-playhead)]" />
            02 / Selected Work
          </h2>
          <Link href="/work" className="text-xs font-mono text-[var(--n-playhead)] hover:underline">
            View all work →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PROJECTS.filter((p) => p.featured).map((project) => (
            <Link
              key={project.slug}
              href={`/work/${project.slug}`}
              className="group p-8 rounded-[var(--n-radius-panel)] border border-[var(--n-line)] bg-[var(--n-paper)] hover:border-[var(--n-playhead)] transition-all flex flex-col justify-between space-y-6 shadow-xs"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[var(--n-playhead)] font-semibold">{project.company}</span>
                  <span className="text-[var(--n-muted)]">{project.year}</span>
                </div>
                <h3 className="text-2xl font-medium tracking-tight text-[var(--n-ink)] group-hover:text-[var(--n-playhead)] transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-[var(--n-graphite)] leading-relaxed">{project.thesis}</p>
              </div>

              <div className="flex flex-wrap gap-2 pt-2 border-t border-[var(--n-line-soft)]">
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
      </section>

      {/* SECTION 4: PRACTICE RANGE */}
      <section className="space-y-6">
        <div className="border-b border-[var(--n-line)] pb-3">
          <h2 className="text-xs font-mono text-[var(--n-graphite)] uppercase tracking-wider flex items-center gap-2">
            <Code className="w-4 h-4 text-[var(--n-playhead)]" />
            03 / Across The Frame
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {practiceRange.map((p, i) => (
            <div
              key={i}
              className="p-6 rounded-[var(--n-radius-card)] border border-[var(--n-line)] bg-[var(--n-paper)] space-y-2 shadow-xs"
            >
              <span className="text-xs font-mono text-[var(--n-playhead)] font-bold">0{i + 1}</span>
              <h3 className="text-lg font-medium text-[var(--n-ink)]">{p.title}</h3>
              <p className="text-xs text-[var(--n-graphite)] leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 5: PROCESS STORYBOARD */}
      <section className="space-y-6">
        <div className="border-b border-[var(--n-line)] pb-3">
          <h2 className="text-xs font-mono text-[var(--n-graphite)] uppercase tracking-wider">
            04 / How The Work Gets Made
          </h2>
        </div>

        <div className="flex items-center gap-3 overflow-x-auto pb-4 font-mono text-xs">
          {processSteps.map((s, idx) => (
            <div key={idx} className="flex items-center gap-3 shrink-0">
              <div className="p-4 rounded-[var(--n-radius-card)] border border-[var(--n-line)] bg-[var(--n-paper)] w-48 space-y-1">
                <span className="text-[10px] text-[var(--n-playhead)]">{s.step}</span>
                <h4 className="font-bold text-[var(--n-ink)]">{s.name}</h4>
                <p className="text-[11px] text-[var(--n-muted)] font-sans">{s.detail}</p>
              </div>
              {idx < processSteps.length - 1 && (
                <span className="text-[var(--n-line)] font-bold">→</span>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 6 & 7: LAB & ASTRA TEASERS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <section className="p-8 rounded-[var(--n-radius-panel)] border border-[var(--n-line)] bg-[var(--n-paper)] space-y-4">
          <div className="flex justify-between items-center text-xs font-mono">
            <span className="text-[var(--n-graphite)]">05 / LAB EXPERIMENTS</span>
            <span className="text-[var(--n-playhead)] font-semibold">STABLE / WIP</span>
          </div>
          <h3 className="text-xl font-medium">Visual & Motion Experiments</h3>
          <p className="text-xs text-[var(--n-graphite)] leading-relaxed">
            Easing curve inspectors, playhead transition wipes, ASCII image resolvers, and glass controls.
          </p>
          <Link
            href="/lab"
            className="inline-flex items-center gap-1 text-xs font-mono text-[var(--n-playhead)] hover:underline pt-2 font-semibold"
          >
            Explore the Lab →
          </Link>
        </section>

        <section className="p-8 rounded-[var(--n-radius-panel)] border border-[var(--n-line)] bg-[var(--n-paper)] space-y-4">
          <div className="flex justify-between items-center text-xs font-mono">
            <span className="text-[var(--n-graphite)]">06 / ASTRA AGENT</span>
            <span className="text-[var(--n-playhead)] font-semibold">◇ ONLINE</span>
          </div>
          <h3 className="text-xl font-medium">Ask the Portfolio Agent</h3>
          <p className="text-xs text-[var(--n-graphite)] leading-relaxed">
            Astra knows the public version of Nesar's work, the $25M Composio deck, and AI agent builds.
          </p>
          <Link
            href="/astra"
            className="inline-flex items-center gap-1 text-xs font-mono text-[var(--n-playhead)] hover:underline pt-2 font-semibold"
          >
            Talk to Astra →
          </Link>
        </section>
      </div>

      {/* SECTION 8: NOW & CONTACT */}
      <section className="p-8 rounded-[var(--n-radius-panel)] border border-[var(--n-line)] bg-[var(--n-paper-strong)] flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
        <div className="space-y-2 text-center md:text-left">
          <span className="text-xs font-mono text-[var(--n-playhead)] font-semibold">
            ALIVE & SHIPPING
          </span>
          <h3 className="text-2xl font-medium">Have something difficult to explain, design, or make move?</h3>
          <p className="text-xs text-[var(--n-graphite)] max-w-xl">
            Currently founding designer at Entelligence AI. Open for high-impact launch motion and product collaboration.
          </p>
        </div>

        <Link
          href="/contact"
          className="px-6 py-3 rounded-[var(--n-radius-control)] bg-[var(--n-charcoal)] text-[var(--n-paper)] font-mono text-xs font-medium hover:opacity-90 transition-opacity whitespace-nowrap shadow-xs"
        >
          Get in touch →
        </Link>
      </section>
    </div>
  );
}
