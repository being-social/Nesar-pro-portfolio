import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Contact Nesar",
  description: "Get in touch for high-impact launch motion and product collaboration.",
  alternates: {
    canonical: "https://nesar.build/contact",
  },
  openGraph: {
    title: "Contact Nesar",
    description: "Get in touch for high-impact launch motion and product collaboration.",
    url: "https://nesar.build/contact",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Nesar",
    description: "Get in touch for high-impact launch motion and product collaboration.",
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
