"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";

export function Navbar({ onOpenAstra }: { onOpenAstra: () => void }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const primaryNav = [
    { href: "/", label: "Home" },
    { href: "/work", label: "Work" },
    { href: "/motion", label: "Motion" },
    { href: "/lab", label: "Lab" },
    { href: "/about", label: "About" },
  ];

  // Close menu on escape
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);
  
  // Theme check
  useEffect(() => {
    if (typeof window !== "undefined") {
      const isDarkPref = window.matchMedia("(prefers-color-scheme: dark)").matches;
      if (isDarkPref || document.documentElement.getAttribute("data-theme") === "dark") {
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

  return (
    <div className="fixed top-4 sm:top-6 left-0 right-0 z-40 flex justify-center px-4 pointer-events-none">
      <div className="relative">
        <nav className="flex items-center gap-1 p-2 rounded-full bg-[var(--n-canvas)] bg-opacity-85 max-w-full overflow-hidden backdrop-blur-md shadow-sm border border-[var(--n-line-soft)] pointer-events-auto">
          {/* Brand N Pill */}
          <Link
            href="/"
            className="flex shrink-0 items-center justify-center w-8 h-8 rounded-full bg-[var(--n-ink)] text-[var(--n-canvas)] font-bold text-sm tracking-tight mr-1 sm:mr-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--n-playhead)]"
            aria-label="Home"
          >
            N
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            {primaryNav.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--n-playhead)] ${
                    active ? "bg-[var(--n-ink)] text-[var(--n-canvas)]" : "bg-transparent text-[var(--n-graphite)] hover:text-[var(--n-ink)] hover:bg-[var(--n-paper)]"
                  }`}
                  aria-current={active ? "page" : undefined}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="hidden md:flex items-center justify-center w-8 h-8 rounded-full text-[var(--n-graphite)] hover:text-[var(--n-ink)] hover:bg-[var(--n-paper)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--n-playhead)] transition-colors"
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            aria-pressed={isDark}
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-full bg-transparent text-[var(--n-ink)] hover:bg-[var(--n-paper)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--n-playhead)]"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* Astra Launcher */}
          <button
            onClick={onOpenAstra}
            className="ml-1 sm:ml-2 flex shrink-0 items-center justify-center px-4 py-1.5 rounded-full bg-[var(--n-ink)] text-[var(--n-canvas)] text-sm font-medium hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--n-playhead)]"
          >
            Talk to Astra
          </button>
        </nav>

        {/* Mobile Dropdown Menu */}
        <div
          ref={menuRef}
          aria-hidden={!isOpen}
          inert={!isOpen}
          className={`absolute top-full mt-2 left-0 right-0 p-4 rounded-2xl bg-[var(--n-canvas)] bg-opacity-95 backdrop-blur-md shadow-lg border border-[var(--n-line-soft)] md:hidden transition-all duration-200 pointer-events-auto origin-top ${
            isOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
          }`}
        >
          <div className="flex flex-col gap-2">
            {primaryNav.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`px-4 py-3 rounded-xl text-base font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--n-playhead)] ${
                    active ? "bg-[var(--n-ink)] text-[var(--n-canvas)]" : "bg-[var(--n-paper)] text-[var(--n-ink)] hover:bg-[var(--n-line-soft)]"
                  }`}
                  aria-current={active ? "page" : undefined}
                >
                  {item.label}
                </Link>
              );
            })}
            
            {/* Mobile Theme Toggle */}
            <button
               onClick={toggleTheme}
               className="flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium text-[var(--n-ink)] bg-[var(--n-paper)] hover:bg-[var(--n-line-soft)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--n-playhead)]"
             >
               <span>{isDark ? "Light Mode" : "Dark Mode"}</span>
               {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}
