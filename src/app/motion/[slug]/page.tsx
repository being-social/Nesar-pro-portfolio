import Link from "next/link";
import { notFound } from "next/navigation";
import { MOTION_PIECES } from "@/lib/content/data";
import { Play } from "lucide-react";
import type { Metadata } from 'next';

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const piece = MOTION_PIECES.find((p) => p.slug === slug);
  
  if (!piece) return {};

  return {
    title: `${piece.title} — Nesar`,
    description: piece.summary,
    alternates: {
      canonical: `/motion/${slug}`,
    }
  };
}

export default async function MotionDetailPage({ params }: Props) {
  const { slug } = await params;
  const piece = MOTION_PIECES.find((p) => p.slug === slug);

  if (!piece) {
    notFound();
  }

  const chapters = [
    { id: "01", title: "Final Film", desc: "60 FPS Master Render with timing pass" },
    { id: "02", title: "Why It Exists", desc: "Core product launch narrative & challenge" },
    { id: "03", title: "Storyboard", desc: "Keyframe sequences & scene composition" },
    { id: "04", title: "Styleframes", desc: "Visual language, color palette & typography" },
    { id: "05", title: "Timing & Easing", desc: "Cubic bezier timing curve analysis" },
    { id: "06", title: "Iterations", desc: "Scene revisions & feedback loops" },
    { id: "07", title: "Final Frames", desc: "Selected high-res still captures" },
    { id: "08", title: "Tools & Implementation", desc: "Software, expression scripts & code bridge" },
  ];

  const storyboardFrames = [
    { title: "01. The Problem", desc: "Establishing the core technical or emotional hook." },
    { title: "02. Analysis", desc: "Visualizing the system capabilities." },
    { title: "03. The Fix", desc: "Showing the developer interaction point." },
    { title: "04. Metrics", desc: "Closing the loop with clear data endpoints." }
  ];

  return (
    <div className="space-y-12 py-16 px-4 sm:px-6 max-w-[1280px] mx-auto">
      <Link href="/motion" className="inline-flex min-h-[44px] items-center text-xs font-mono text-[var(--n-playhead)] hover:underline font-semibold -ml-2 px-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--n-playhead)] rounded-md">
        ← Back to Motion Archive
      </Link>

      <div className="space-y-4 max-w-4xl">
        <div className="flex items-center justify-between text-xs font-mono text-[var(--n-muted)]">
          <span>{piece.client}</span>
          <span>{piece.duration}</span>
          <span>{piece.fps} FPS</span>
        </div>
        <h1 className="text-[clamp(32px,8vw,48px)] font-medium leading-[1.05] tracking-tight text-[var(--n-ink)]">{piece.title}</h1>
        <p className="text-base text-[var(--n-graphite)] max-w-3xl leading-relaxed">{piece.summary}</p>
      </div>

      {/* Main Video Player Placeholder */}
      <div className="aspect-video w-full max-w-5xl bg-[var(--n-paper-strong)] border border-[var(--n-line)] rounded-[var(--n-radius-panel)] p-8 flex flex-col justify-between relative shadow-lg mx-auto">
        <div className="flex justify-between text-xs font-mono text-[var(--n-muted)]">
          <span>FRAME: 001</span>
          <span>PLAYHEAD: 00:00:00:00</span>
        </div>
        <div className="flex flex-col items-center justify-center gap-3">
          <div className="w-20 h-20 rounded-full bg-[var(--n-playhead-soft)] flex items-center justify-center cursor-pointer hover:scale-105 transition-transform shadow-md">
            <Play className="w-8 h-8 text-[var(--n-playhead)] fill-[var(--n-playhead)] ml-1" />
          </div>
          <span className="text-xs font-mono text-[var(--n-graphite)]">Click to play master render</span>
        </div>
        <div className="flex justify-between text-xs font-mono text-[var(--n-playhead)]">
          <span>REC: {piece.fps}FPS</span>
          <span>EASING: CUBIC-BEZIER(.16,1,.3,1)</span>
        </div>
      </div>

      {/* Storyboard Container - Fixed for Mobile */}
      <div className="max-w-5xl mx-auto space-y-6 pt-12">
         <h2 className="text-lg font-bold font-mono tracking-tight text-[var(--n-ink)]">03 / Storyboard</h2>
         <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-6 hide-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
            {storyboardFrames.map((frame, i) => (
              <div key={i} className="min-w-[280px] sm:min-w-[320px] w-[80vw] sm:w-[320px] snap-start flex-none flex flex-col gap-3">
                <div className="w-full aspect-[4/3] bg-[var(--n-paper)] border border-[var(--n-line-soft)] rounded-[var(--n-radius-card)] flex items-center justify-center text-xs text-[var(--n-muted)] font-mono shadow-sm hover:border-[var(--n-playhead)] transition-colors">
                  [SCENE {i+1} FRAME]
                </div>
                <div className="pl-1">
                   <h3 className="text-sm font-bold text-[var(--n-ink)]">{frame.title}</h3>
                   <p className="text-xs text-[var(--n-graphite)] mt-1.5 leading-relaxed">{frame.desc}</p>
                </div>
              </div>
            ))}
         </div>
         <p className="text-xs text-[var(--n-muted)] font-mono tracking-tight">Swipe to view storyboard sequence →</p>
      </div>

      {/* Chapter Breakdown */}
      <div className="max-w-5xl mx-auto space-y-8 pt-12 border-t border-[var(--n-line)]">
        <h2 className="text-xs font-mono text-[var(--n-graphite)] uppercase tracking-wider">
          Motion Breakdown Chapters
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 font-mono text-xs">
          {chapters.filter((_, i) => i !== 2).map((ch) => (
            <div
              key={ch.id}
              className="p-5 rounded-[var(--n-radius-card)] border border-[var(--n-line)] bg-[var(--n-paper)] space-y-2 hover:border-[var(--n-playhead)] transition-colors"
            >
              <span className="text-[var(--n-playhead)] font-bold text-sm block">{ch.id} / {ch.title}</span>
              <p className="text-[var(--n-graphite)] font-sans leading-relaxed">{ch.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
