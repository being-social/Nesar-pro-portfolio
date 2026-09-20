"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Navbar({ onOpenAstra }: { onOpenAstra: () => void }) {
  const pathname = usePathname();

  const primaryNav = [
    { href: "/", label: "Home" },
    { href: "/work", label: "Work" },
    { href: "/motion", label: "Motion" },
    { href: "/lab", label: "Lab" },
    { href: "/about", label: "About" },
  ];

  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <nav className="flex items-center gap-1 p-2 rounded-full bg-[rgba(252,252,252,0.85)] backdrop-blur-md shadow-sm border border-[rgba(0,0,0,0.06)] pointer-events-auto">
        
        {/* Brand N Pill */}
        <Link 
          href="/" 
          className="flex items-center justify-center w-8 h-8 rounded-full bg-[#1f1e1e] text-white font-bold text-sm tracking-tight mr-2"
        >
          N
        </Link>

        {/* Links */}
        {primaryNav.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                active ? "bg-[#1f1e1e] text-white" : "bg-transparent text-[rgba(0,0,0,0.5)] hover:text-[#1f1e1e] hover:bg-[#f2f2f4]"
              }`}
            >
              {item.label}
            </Link>
          );
        })}

        {/* Astra Launcher */}
        <button
          onClick={onOpenAstra}
          className="ml-2 flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1f1e1e] text-white text-sm font-medium hover:opacity-90 transition-opacity"
        >
          Talk to Astra
        </button>
      </nav>
    </div>
  );
}
