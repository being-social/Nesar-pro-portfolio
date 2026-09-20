import Link from "next/link";
import { Film, Play } from "lucide-react";
import { MOTION_PIECES } from "@/lib/content/data";

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Motion Archive — Nesar",
  description: "Motion explorations and launch films.",
  alternates: { canonical: "/motion" }
};


export default function MotionIndexPage() {
  return (
    <div className="space-y-12 py-8">
      <div className="space-y-4 max-w-2xl">
        <div className="text-xs font-mono text-[var(--n-playhead)] font-semibold">
          01 / MOTION ARCHIVE
        </div>
        <h1 className="text-4xl sm:text-6xl font-medium tracking-tight">Motion</h1>
        <p className="text-sm text-[var(--n-graphite)] font-mono leading-relaxed">
          Frames, transitions, launch films, interface motion, and the small timing decisions that make everything feel right.
        </p>
      </div>

      <div className="space-y-12">
        {MOTION_PIECES.map((piece) => (
          <div
            key={piece.slug}
            className="p-8 rounded-[var(--n-radius-panel)] border border-[var(--n-line)] bg-[var(--n-paper)] space-y-6 shadow-xs"
          >
            <div className="aspect-video bg-[var(--n-paper-strong)] border border-[var(--n-line-soft)] rounded-[var(--n-radius-film)] p-6 flex flex-col justify-between relative overflow-hidden group">
              <div className="flex justify-between text-xs font-mono text-[var(--n-muted)] z-10">
                <span>{piece.duration}</span>
                <span>{piece.fps} FPS</span>
                <span>{piece.year}</span>
              </div>

              <div className="flex items-center justify-center z-10">
                <Link
                  href={`/motion/${piece.slug}`}
                  className="w-16 h-16 rounded-full bg-[var(--n-playhead-soft)] flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
                >
                  <Play className="w-6 h-6 text-[var(--n-playhead)] fill-[var(--n-playhead)] ml-1" />
                </Link>
              </div>

              <div className="flex justify-between text-xs font-mono text-[var(--n-playhead)] font-semibold z-10">
                <span>{piece.client}</span>
                <span>F_001</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              <div className="md:col-span-2 space-y-2">
                <h2 className="text-2xl font-bold">{piece.title}</h2>
                <p className="text-xs text-[var(--n-graphite)] leading-relaxed">{piece.summary}</p>
              </div>

              <div className="space-y-2 text-xs font-mono border-t md:border-t-0 md:border-l border-[var(--n-line-soft)] pt-4 md:pt-0 md:pl-6">
                <div>
                  <span className="text-[var(--n-muted)]">ROLE: </span>
                  <span className="text-[var(--n-ink)]">{piece.role.join(", ")}</span>
                </div>
                <div>
                  <span className="text-[var(--n-muted)]">TOOLS: </span>
                  <span className="text-[var(--n-ink)]">{piece.tools?.join(", ")}</span>
                </div>
                <Link
                  href={`/motion/${piece.slug}`}
                  className="inline-block text-[var(--n-playhead)] font-bold hover:underline pt-2"
                >
                  View full breakdown →
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
