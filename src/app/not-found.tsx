import Link from "next/link";
import { Command } from "lucide-react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "404 — Not Found",
  robots: {
    index: false,
    follow: false,
  }
};

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center py-16 bg-[var(--n-canvas)]">
      <div className="space-y-6 max-w-xl px-6">
        <div className="font-mono text-xs text-[var(--n-playhead)] font-semibold">
          command not found: <span className="text-[var(--n-graphite)]">that_page</span>
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-medium text-[var(--n-ink)]">Lost?</h1>
          <p className="text-sm text-[var(--n-graphite)] leading-relaxed">
            The page you requested doesn't exist. Astra has a few good explanations and might be able to help.
          </p>
        </div>

        <Link
          href="/astra"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-[var(--n-radius-control)] bg-[var(--n-charcoal)] text-[var(--n-paper)] font-mono text-xs font-semibold hover:opacity-90 transition-opacity shadow-xs"
        >
          <Command className="w-3.5 h-3.5 text-[var(--n-playhead-faint)]" />
          Ask Astra instead
        </Link>

        <div className="pt-8 text-xs font-mono text-[var(--n-muted)] flex items-center justify-center gap-4">
          <Link href="/" className="hover:text-[var(--n-ink)] transition-colors">Start from Home</Link>
          <Link href="/work" className="hover:text-[var(--n-ink)] transition-colors">View Work</Link>
        </div>
      </div>
    </div>
  );
}
