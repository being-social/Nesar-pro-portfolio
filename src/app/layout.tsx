import type { Metadata, Viewport } from "next";
import { DM_Sans, Geist_Mono } from "next/font/google";
import { AppLayout } from "@/components/AppLayout";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#F3F4F0",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://nesar.build"),
  title: {
    default: "Nesar B — Motion Designer & Design Engineer",
    template: "%s — Nesar",
  },
  description: "Motion designer and design engineer shaping AI products across product, brand, web, and launch motion.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    title: "Nesar B — Motion Designer & Design Engineer",
    description: "Motion designer and design engineer shipping AI products in code.",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${dmSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <body className="min-h-screen flex flex-col justify-between antialiased">
        <a href="#main-content" className="skip-link">Skip to main content</a>
        <AppLayout>{children}</AppLayout>
      </body>
    </html>
  );
}
