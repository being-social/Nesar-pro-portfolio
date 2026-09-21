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

  const getPageName = () => {
    if (pathname === "/") return "Home";
    const segment = pathname.split("/")[1];
    if (!segment) return "";
    return segment.charAt(0).toUpperCase() + segment.slice(1);
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);
  
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
    <>
      <div className="fixed top-4 sm:top-6 left-0 right-0 z-40 flex justify-center px-3 sm:px-4 pointer-events-none">
        
        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-[2px] p-1.5 rounded-full bg-[var(--n-canvas)]/80 backdrop-blur-xl border border-[var(--n-line-soft)] shadow-sm pointer-events-auto max-w-[calc(100vw-20px)]">
          
          <Link
            href="/"
            className="flex shrink-0 items-center justify-center w-10 h-10 rounded-full bg-[var(--n-ink)] text-[var(--n-canvas)] font-bold text-sm tracking-tight mr-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--n-playhead)] hover:opacity-90 transition-opacity"
            aria-label="Home"
          >
            N
          </Link>

          {primaryNav.map((item) => {
            const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-4 py-3 rounded-full text-sm font-medium transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--n-playhead)] ${
                  active ? "text-[var(--n-ink)]" : "text-[var(--n-graphite)] hover:text-[var(--n-ink)] hover:bg-[var(--n-paper)]"
                }`}
                aria-current={active ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}

          <button
            onClick={toggleTheme}
            className="flex shrink-0 items-center justify-center w-10 h-10 rounded-full text-[var(--n-graphite)] hover:text-[var(--n-ink)] hover:bg-[var(--n-paper)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--n-playhead)] transition-colors mx-1"
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDark ? <Sun className="w-[18px] h-[18px]" /> : <Moon className="w-[18px] h-[18px]" />}
          </button>

          <button
            onClick={onOpenAstra}
            className="ml-[2px] flex shrink-0 items-center justify-center px-4 py-3 rounded-full bg-[var(--n-ink)] text-[var(--n-canvas)] border border-[var(--n-graphite)] text-sm font-medium hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--n-playhead)] whitespace-nowrap"
          >
            Talk to Astra
          </button>
        </nav>

        {/* MOBILE NAV (stretches full width via flex-1 or w-full) */}
        <nav 
          className={`md:hidden flex flex-col items-stretch gap-0 p-[6px] transition-[border-radius] duration-200 pointer-events-auto bg-[var(--n-canvas)]/85 backdrop-blur-xl border border-[var(--n-line-soft)] shadow-sm w-full max-w-[800px] ${isOpen ? "rounded-[28px]" : "rounded-full"}`}
        >
          <div className="flex items-center justify-between gap-2 w-full">
            <Link
              href="/"
              className="flex shrink-0 items-center justify-center w-[44px] h-[44px] rounded-full bg-[var(--n-ink)] text-[var(--n-canvas)] font-bold text-sm tracking-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--n-playhead)]"
              aria-label="Home"
              onClick={() => setIsOpen(false)}
            >
              N
            </Link>

            <span className="text-sm font-medium text-[var(--n-muted)] flex-1 text-center truncate px-2">
              {getPageName()}
            </span>

            {/* Talk to Astra - MUST BE BEFORE HAMBURGER */}
            <button
              onClick={() => {
                setIsOpen(false);
                onOpenAstra();
              }}
              className="flex shrink-0 items-center gap-2 h-[44px] px-4 rounded-full bg-[var(--n-ink)] text-[var(--n-canvas)] border border-[var(--n-graphite)] text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--n-playhead)] whitespace-nowrap"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--n-canvas)] block"></span>
              Astra
            </button>

            {/* Hamburger - MUST BE LAST */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex shrink-0 items-center justify-center w-[44px] h-[44px] rounded-full bg-[var(--n-paper-strong)] border border-[var(--n-line)] text-[var(--n-ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--n-playhead)]"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {/* Mobile Dropdown Area */}
          <div
            ref={menuRef}
            aria-hidden={!isOpen}
            inert={!isOpen ? true : undefined}
            className={`grid transition-[grid-template-rows] duration-300 ${
              isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
            }`}
          >
            <div className="overflow-hidden min-h-0">
              <div className="pt-[10px] px-0 pb-0 flex flex-col gap-[2px]">
                {primaryNav.map((item) => {
                  const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center px-4 h-[48px] rounded-[14px] text-base font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--n-playhead)] ${
                        active ? "text-[var(--n-playhead)]" : "bg-transparent text-[var(--n-graphite)] hover:text-[var(--n-ink)] hover:bg-[var(--n-paper)]"
                      }`}
                      aria-current={active ? "page" : undefined}
                    >
                      {item.label}
                    </Link>
                  );
                })}
                
                <button
                   onClick={toggleTheme}
                   className="flex items-center justify-between px-4 h-[48px] rounded-[14px] text-base font-medium text-[var(--n-ink)] hover:bg-[var(--n-paper)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--n-playhead)]"
                 >
                   <span>{isDark ? "Light Mode" : "Dark Mode"}</span>
                   {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                 </button>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
