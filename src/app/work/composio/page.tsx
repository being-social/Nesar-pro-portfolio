import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function ComposioCaseStudy() {
  return (
    <div className="space-y-12 py-12 max-w-4xl mx-auto">
      <Link href="/work" className="text-xs font-mono text-[var(--n-playhead)] hover:underline">
        ← Back to Work
      </Link>

      <div className="space-y-4">
        <h1 className="text-4xl sm:text-5xl font-medium tracking-tight text-[var(--n-ink)]">
          Design Through a Year of Launches at Composio
        </h1>
        <p className="text-lg text-[var(--n-graphite)] font-serif italic">
          Building the pitch deck behind a $25M Series A.
        </p>
      </div>

      <div className="prose prose-sm max-w-none text-[var(--n-graphite)] space-y-6">
        <p>I was the sole designer at Composio, an agentic-AI infrastructure platform. Throughout a year of rapid launches, I designed the public-facing launch experience, built the company's brand identity, and created the narrative assets that defined their fundraising journey.</p>
        
        <h3>01 / Context</h3>
        <p>Composio was moving fast, launching SWE-Kit and MCP (Model Context Protocol) support for agentic AI. The challenge was maintaining a cohesive, studio-quality brand presence while shipping launch after launch for a developer-centric audience.</p>

        <h3>02 / The Build</h3>
        <p>My core contribution was the narrative architecture and visual design for the pitch deck that helped secure their <strong>$25M Series A</strong>, led by Lightspeed Venture Partners. Beyond funding, I redesigned and rebuilt the company website to handle the increased traffic and redesigned the launch creative system from the ground up.</p>

        <h3>03 / Outcome</h3>
        <p>The design system and brand assets I architected provided the visual logic that powered the company's growth through the Series A raise and established a standard for their public-facing developer communications.</p>
      </div>
    </div>
  );
}
