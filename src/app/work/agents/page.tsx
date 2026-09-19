import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function AgentsCaseStudy() {
  return (
    <div className="space-y-12 py-12 max-w-4xl mx-auto">
      <Link href="/work" className="text-xs font-mono text-[var(--n-playhead)] hover:underline">
        ← Back to Work
      </Link>

      <div className="space-y-4">
        <h1 className="text-4xl sm:text-5xl font-medium tracking-tight text-[var(--n-ink)]">
          MessagebotWP & Autonomous Agent Systems
        </h1>
        <p className="text-lg text-[var(--n-graphite)] font-serif italic">
          Zero-handoff full-stack design and deployment of autonomous WhatsApp agent platforms.
        </p>
      </div>

      <div className="prose prose-sm max-w-none text-[var(--n-graphite)] space-y-6">
        <p>A suite of localized autonomous tools built for real-world operations in Bengaluru, including attendance tracking, batch scheduling, and automated payment collection.</p>
        
        <h3>01 / Context</h3>
        <p>Many traditional businesses require lightweight, resilient automation tools that operate natively on communication channels their users already trust, such as WhatsApp.</p>

        <h3>02 / The Build</h3>
        <p>Built using Next.js, Supabase, Prisma, Baileys, and Kimi Code CLI workflows. Designed specifically for optimal usability by users with limited English proficiency, maintaining high legibility and minimal friction.</p>

        <h3>03 / Outcome</h3>
        <p>Shipped live operational systems used for real-time operations, serving as proof of full-stack design engineering and autonomous AI agent orchestration capability.</p>
      </div>
    </div>
  );
}
