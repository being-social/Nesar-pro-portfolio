"use client";

import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AstraDrawer } from "@/components/AstraDrawer";

export function AppLayout({ children }: { children: React.ReactNode }) {
  const [astraOpen, setAstraOpen] = useState(false);

  return (
    <>
      <Navbar onOpenAstra={() => setAstraOpen(true)} />
      <main id="main-content" className="flex-1 w-full mx-auto" tabIndex={-1}>
        {children}
      </main>
      <Footer />
      <AstraDrawer isOpen={astraOpen} onClose={() => setAstraOpen(false)} />
    </>
  );
}
