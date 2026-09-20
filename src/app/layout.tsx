"use client";

import "./globals.css";
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AstraDrawer } from "@/components/AstraDrawer";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [astraOpen, setAstraOpen] = useState(false);

  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col justify-between antialiased">
        <Navbar onOpenAstra={() => setAstraOpen(true)} />
        <main className="flex-1 w-full mx-auto">{children}</main>
        <Footer />
        <AstraDrawer isOpen={astraOpen} onClose={() => setAstraOpen(false)} />
      </body>
    </html>
  );
}
