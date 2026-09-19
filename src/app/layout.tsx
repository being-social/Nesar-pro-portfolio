"use client";

import "./globals.css";
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { HermesDrawer } from "@/components/HermesDrawer";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [hermesOpen, setHermesOpen] = useState(false);

  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col justify-between antialiased">
        <Navbar onOpenHermes={() => setHermesOpen(true)} />
        <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-8">{children}</main>
        <Footer />
        <HermesDrawer isOpen={hermesOpen} onClose={() => setHermesOpen(false)} />
      </body>
    </html>
  );
}
