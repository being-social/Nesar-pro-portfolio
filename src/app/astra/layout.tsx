import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Astra Assistant — Nesar",
  description: "Talk to Astra, Nesar's portfolio assistant.",
  alternates: {
    canonical: "https://nesar.build/astra",
  },
  openGraph: {
    title: "Astra Assistant — Nesar",
    description: "Talk to Astra, Nesar's portfolio assistant.",
    url: "https://nesar.build/astra",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Astra Assistant — Nesar",
    description: "Talk to Astra, Nesar's portfolio assistant.",
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
