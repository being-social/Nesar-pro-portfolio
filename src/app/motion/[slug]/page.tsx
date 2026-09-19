import Link from "next/link";
import { notFound } from "next/navigation";
import { MOTION_PIECES } from "@/lib/content/data";
import { Play } from "lucide-react";

export default async function MotionDetailPage({ params }: { params: Promise<{ slug: string }> }) {
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

  return (
    <div className="space-y-12 py-8 max-w-4xl mx-auto">
      <Link href="/motion" className="text-xs font-mono text-[var(--n-playhead)] hover:underline">
        ← Back to Motion Archive
      </Link>

      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs font-mono text-[var(--n-muted)]">
          <span>{piece.client}</span>
          <span>{piece.duration}</span>
          <span>{piece.fps} FPS</span>
        </div>
        <h1 className="text-4xl font-medium tracking-tight text-[var(--n-ink)]">{piece.title}</h1>
        <p className="text-base text-[var(--n-graphite)]">{piece.summary}</p>
      </div>

      {/* Main Video Player Placeholder */}
      <div className="aspect-video bg-[var(--n-paper-strong)] border border-[var(--n-line)] rounded-[var(--n-radius-film)] p-8 flex flex-col justify-between relative shadow-lg">
        <div className="flex justify-between text-xs font-mono text-[var(--n-muted)]">
          <span>FRAME: 001</span>
          <span>PLAYHEAD: 00:00:00:00</span>
        </div>
        <div className="flex flex-col items-center justify-center gap-3">
          <div className="w-20 h-20 rounded-full bg-[var(--n-playhead-soft)] flex items-center justify-center cursor-pointer hover:scale-105 transition-transform">
            <Play className="w-8 h-8 text-[var(--n-playhead)] fill-[var(--n-playhead)] ml-1" />
          </div>
          <span className="text-xs font-mono text-[var(--n-graphite)]">Click to play master render</span>
        </div>
        <div className="flex justify-between text-xs font-mono text-[var(--n-playhead)]">
          <span>REC: 60FPS</span>
          <span>EASING: CUBIC-BEZIER(.16,1,.3,1)</span>
        </div>
      </div>

      {/* Chapter Breakdown */}
      <div className="space-y-8 pt-8 border-t border-[var(--n-line)]">
        <h2 className="text-xs font-mono text-[var(--n-graphite)] uppercase tracking-wider">
          Motion Breakdown Chapters
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
          {chapters.map((ch) => (
            <div
              key={ch.id}
              className="p-4 rounded-[var(--n-radius-card)] border border-[var(--n-line)] bg-[var(--n-paper)] space-y-1"
            >
              <span className="text-[var(--n-playhead)] font-bold">{ch.id} / {ch.title}</span>
              <p className="text-[var(--n-graphite)] font-sans">{ch.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
