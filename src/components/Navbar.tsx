"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { Menu, X } from "lucide-react";

export function Navbar({ onOpenAstra }: { onOpenAstra: () => void }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const primaryNav = [
    { href: "/", label: "Home" },
    { href: "/work", label: "Work" },
    { href: "/motion", label: "Motion" },
    { href: "/lab", label: "Lab" },
    { href: "/about", label: "About" },
  ];

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <div className="fixed top-4 sm:top-6 left-0 right-0 z-40 flex justify-center px-4 pointer-events-none">
      <div className="relative">
        <nav className="flex items-center gap-1 p-2 rounded-full bg-[rgba(252,252,252,0.85)] max-w-full overflow-hidden backdrop-blur-md shadow-sm border border-[rgba(0,0,0,0.06)] pointer-events-auto">
          <Link
            href="/"
            className="flex shrink-0 items-center justify-center w-8 h-8 rounded-full bg-[#1f1e1e] text-white font-bold text-sm tracking-tight mr-1 sm:mr-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--n-playhead)]"
            aria-label="Home"
          >
            N
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {primaryNav.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--n-playhead)] ${
                    active ? "bg-[#1f1e1e] text-white" : "bg-transparent text-[var(--n-graphite)] hover:text-[#1f1e1e] hover:bg-[#f2f2f4]"
                  }`}
                  aria-current={active}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-full bg-transparent text-[#1f1e1e] hover:bg-[#f2f2f4] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--n-playhead)]"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <button
            onClick={onOpenAstra}
            className="ml-1 sm:ml-2 flex shrink-0 items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-[#1f1e1e] text-white text-sm font-medium hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--n-playhead)]"
          >
            Talk to Astra
          </button>
        </nav>

        <div
          ref={menuRef}
          aria-hidden={isOpen ? "true" : "false"}
          inert={!isOpen}
          className={`absolute top-full mt-2 left-0 right-0 p-4 rounded-2xl bg-[rgba(252,252,252,0.95)] backdrop-blur-md shadow-lg border border-[rgba(0,0,0,0.06)] md:hidden transition-all duration-200 pointer-events-auto origin-top ${
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
                    active ? "bg-[#1f1e1e] text-white" : "bg-[#f2f2f4] text-[#1f1e1e] hover:bg-[#e8e8e8]"
                  }`}
                  aria-current={active}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
