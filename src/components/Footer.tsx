import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full border-t border-[var(--n-line)] bg-[var(--n-canvas)] py-12 text-xs text-[var(--n-muted)] font-mono">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center md:text-left">
          <p className="font-bold text-[var(--n-ink)]">
            Nesar B — Motion Designer · Design Engineer
          </p>
          <p className="text-[var(--n-graphite)] font-sans">
            "Design that moves. Systems that ship."
          </p>
        </div>

        <div className="flex items-center gap-6">
          <a
            href="https://github.com/being-social"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--n-ink)] transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/nesar24/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--n-ink)] transition-colors"
          >
            LinkedIn
          </a>
          <Link href="/privacy" className="hover:text-[var(--n-ink)] transition-colors">
            Privacy
          </Link>
          <Link href="/hermes" className="text-[var(--n-playhead)] hover:underline">
            ◇ Hermes Agent
          </Link>
        </div>

        <div className="text-[10px] text-[var(--n-muted)]">
          F_001 · 60 FPS · Next.js 16 App Router
        </div>
      </div>
    </footer>
  );
}
