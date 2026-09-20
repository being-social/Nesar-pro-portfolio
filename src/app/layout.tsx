"use client";

import "./globals.css";
import { useState } from "react";
import { DM_Sans, Geist_Mono } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AstraDrawer } from "@/components/AstraDrawer";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [astraOpen, setAstraOpen] = useState(false);

  return (
    <html lang="en" className={`${dmSans.variable} ${geistMono.variable}`}>
      <body className="min-h-screen flex flex-col justify-between antialiased font-sans bg-[var(--n-canvas)] text-[var(--n-ink)] selection:bg-[var(--n-selection)]">
        <a href="#main-content" className="skip-link font-medium">Skip to main content</a>
        <Navbar onOpenAstra={() => setAstraOpen(true)} />
        <main id="main-content" className="flex-1 w-full mx-auto" tabIndex={-1}>
          {children}
        </main>
        <Footer />
        <AstraDrawer isOpen={astraOpen} onClose={() => setAstraOpen(false)} />
      </body>
    </html>
  );
}
