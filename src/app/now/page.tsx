import { NOW_DATA } from "@/lib/content/data";

export default function NowPage() {
  return (
    <div className="space-y-12 py-8 max-w-3xl mx-auto">
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs font-mono text-[var(--n-muted)]">
          <span>05 / ALIVE & SHIPPING</span>
          <span className="text-[var(--n-playhead)] font-semibold">Updated: {NOW_DATA.updatedAt}</span>
        </div>
        <h1 className="text-4xl font-medium tracking-tight">What I'm Doing Right Now</h1>
        <p className="text-sm text-[var(--n-graphite)] font-mono">
          A monthly snapshot of active projects, focus areas, and experiments.
        </p>
      </div>

      <div className="space-y-8 font-mono text-xs">
        <div className="p-6 rounded-[var(--n-radius-card)] border border-[var(--n-line)] bg-[var(--n-paper)] space-y-3">
          <h3 className="text-sm font-bold text-[var(--n-playhead)] uppercase tracking-wider">
            ● Building
          </h3>
          <ul className="list-disc list-inside space-y-2 text-[var(--n-ink)]">
            {NOW_DATA.building.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
        </div>

        <div className="p-6 rounded-[var(--n-radius-card)] border border-[var(--n-line)] bg-[var(--n-paper)] space-y-3">
          <h3 className="text-sm font-bold text-[var(--n-playhead)] uppercase tracking-wider">
            ● Learning & Refining
          </h3>
          <ul className="list-disc list-inside space-y-2 text-[var(--n-ink)]">
            {NOW_DATA.learning.map((l, i) => (
              <li key={i}>{l}</li>
            ))}
          </ul>
        </div>

        <div className="p-6 rounded-[var(--n-radius-card)] border border-[var(--n-line)] bg-[var(--n-paper)] space-y-3">
          <h3 className="text-sm font-bold text-[var(--n-playhead)] uppercase tracking-wider">
            ● Exploring
          </h3>
          <ul className="list-disc list-inside space-y-2 text-[var(--n-ink)]">
            {NOW_DATA.exploring.map((e, i) => (
              <li key={i}>{e}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
