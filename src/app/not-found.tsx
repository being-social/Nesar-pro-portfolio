import Link from "next/link";
import { Command } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center py-16 bg-[var(--n-canvas)]">
      <div className="space-y-6 max-w-xl">
        <div className="font-mono text-xs text-[var(--n-playhead)]">
          command not found: <span className="text-[var(--n-graphite)]">that_page</span>
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-medium text-[var(--n-ink)]">Lost?</h1>
          <p className="text-sm text-[var(--n-graphite)]">
            Astra has a few good explanations. Want to ask her something instead?
          </p>
        </div>

        <Link
          href="/astra"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-[var(--n-radius-control)] bg-[var(--n-charcoal)] text-[var(--n-paper)] font-mono text-xs font-semibold hover:opacity-90 transition-opacity shadow-xs"
        >
          <Command className="w-3.5 h-3.5 text-[var(--n-playhead)]" />
          Ask Astra instead
        </Link>

        <div className="pt-8 text-xs font-mono text-[var(--n-muted)]">
          F_404 · 60 FPS · nesar.build
        </div>
      </div>
    </div>
  );
}
