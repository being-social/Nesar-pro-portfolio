"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Sun, Moon, Bot, Play } from "lucide-react";

export function Navbar({ onOpenAstra }: { onOpenAstra: () => void }) {
  const pathname = usePathname();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const darkPref = window.matchMedia("(prefers-color-scheme: dark)").matches;
      if (darkPref) {
        setIsDark(true);
        document.documentElement.setAttribute("data-theme", "dark");
        document.documentElement.classList.add("dark");
      }
    }
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    if (!isDark) {
      document.documentElement.setAttribute("data-theme", "dark");
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
      document.documentElement.classList.remove("dark");
    }
  };

  const primaryNav = [
    { href: "/work", label: "Work" },
    { href: "/motion", label: "Motion" },
    { href: "/lab", label: "Lab" },
    { href: "/about", label: "About" },
  ];

  const secondaryNav = [
    { href: "/now", label: "Now" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[var(--n-line-soft)] bg-[var(--n-canvas)]/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2 font-mono text-xs font-semibold tracking-tight group">
          <span className="w-2.5 h-2.5 rounded-full bg-[var(--n-playhead)] group-hover:scale-125 transition-transform" />
          <span className="text-[var(--n-ink)] font-bold">nesar.build</span>
          <span className="hidden sm:inline text-[10px] text-[var(--n-muted)] font-mono ml-1">
            [00:00:00:00]
          </span>
        </Link>

        {/* Primary Navigation */}
        <nav className="flex items-center gap-6 text-sm font-medium">
          {primaryNav.map((item) => {
            const active = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`transition-colors relative py-1 ${
                  active
                    ? "text-[var(--n-ink)] font-semibold"
                    : "text-[var(--n-graphite)] hover:text-[var(--n-ink)]"
                }`}
              >
                {item.label}
                {active && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--n-playhead)] rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Secondary + Controls */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-4 text-xs font-mono text-[var(--n-muted)] border-r border-[var(--n-line)] pr-4">
            {secondaryNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="hover:text-[var(--n-ink)] transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Astra Launcher */}
          <button
            onClick={onOpenAstra}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border border-[var(--n-line)] bg-[var(--n-paper)] hover:border-[var(--n-playhead)] text-xs font-mono transition-all shadow-xs"
          >
            <span className="w-2 h-2 rounded-full bg-[var(--n-playhead)] animate-pulse" />
            <span className="text-[var(--n-ink)] font-semibold">◇ ASTRA</span>
          </button>

          {/* Theme Switcher */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-2 rounded-md border border-[var(--n-line)] hover:bg-[var(--n-line-soft)] transition-colors text-[var(--n-graphite)] hover:text-[var(--n-ink)]"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </header>
  );
}
