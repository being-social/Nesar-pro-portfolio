import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Contlo Case Study — Nesar",
  description: "Marketing design at Contlo.",
  alternates: { canonical: "/work/contlo" }
};


export default function ContloCaseStudy() {
  return (
    <div className="space-y-12 py-12 max-w-4xl mx-auto">
      <Link href="/work" className="text-xs font-mono text-[var(--n-playhead)] hover:underline">
        ← Back to Work
      </Link>

      <div className="space-y-4">
        <h1 className="text-4xl sm:text-5xl font-medium tracking-tight text-[var(--n-ink)]">
          Creative & Brand Design for SuperAGI Ecosystem
        </h1>
        <p className="text-lg text-[var(--n-graphite)] font-serif italic">
          Early-stage creative marketing design across Contlo and SuperAGI.
        </p>
      </div>

      <div className="prose prose-sm max-w-none text-[var(--n-graphite)] space-y-6">
        <p>At Contlo (parent of SuperAGI Marketing), I worked on early-stage brand identity, creative marketing assets, and whitepaper designs for their open-source AI agent ecosystem.</p>
        
        <h3>01 / Context</h3>
        <p>Designing for early-stage AI agent frameworks required distilling complex infrastructure ideas into clear visual representations for developers and product leads.</p>

        <h3>02 / The Build</h3>
        <p>I designed the cover and layout architecture for SuperAGI's flagship whitepaper, managed WordPress visual assets and blog design, and established the creative direction for the sub-brands within the SuperAGI ecosystem.</p>

        <h3>03 / Outcome</h3>
        <p>Delivered foundational marketing assets and design systems that supported early user growth and established the brand's visual language during its early phases.</p>
      </div>
    </div>
  );
}
