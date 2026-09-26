import { NOW_DATA } from "@/lib/content/data";

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Now — Nesar",
  description: "What Nesar is doing right now.",
  alternates: { canonical: "/now" }
};

export default function NowPage() {
  return (
    <div className="space-y-12 py-8 max-w-3xl mx-auto">
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs font-mono text-[var(--n-muted)]">
          <span>05 / ALIVE & SHIPPING</span>
          <span className="text-[var(--n-ink)] font-semibold">Updated: {NOW_DATA.updatedAt}</span>
        </div>
        <h1 className="text-4xl font-medium tracking-tight">What I'm Doing Right Now</h1>
        <p className="text-sm text-[var(--n-graphite)] font-mono">
          A monthly snapshot of active projects, focus areas, and experiments.
        </p>
      </div>

      <div className="space-y-8 font-mono text-xs">
        <div className="p-6 rounded-[var(--n-radius-card)] border border-[var(--n-line)] bg-[var(--n-paper)] space-y-3">
          <h3 className="text-sm font-bold text-[var(--n-ink)] uppercase tracking-wider">
            ● Building
          </h3>
          <ul className="list-disc list-inside space-y-2 text-[var(--n-ink)]">
            {NOW_DATA.building.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </div>

        <div className="p-6 rounded-[var(--n-radius-card)] border border-[var(--n-line)] bg-[var(--n-paper)] space-y-3">
          <h3 className="text-sm font-bold text-[var(--n-ink)] uppercase tracking-wider">
            ● Learning & Refining
          </h3>
          <ul className="list-disc list-inside space-y-2 text-[var(--n-ink)]">
            {NOW_DATA.learning.map((l) => (
              <li key={l}>{l}</li>
            ))}
          </ul>
        </div>

        <div className="p-6 rounded-[var(--n-radius-card)] border border-[var(--n-line)] bg-[var(--n-paper)] space-y-3">
          <h3 className="text-sm font-bold text-[var(--n-ink)] uppercase tracking-wider">
            ● Exploring
          </h3>
          <ul className="list-disc list-inside space-y-2 text-[var(--n-ink)]">
            {NOW_DATA.exploring.map((e) => (
              <li key={e}>{e}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
