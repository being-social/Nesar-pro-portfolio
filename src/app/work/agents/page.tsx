import { ArtifactLayout } from "@/components/ArtifactLayout";

export default function AgentsCaseStudy() {
  return (
    <ArtifactLayout
      backHref="/work"
      backLabel="← Back to Work"
      category="INTELLIGENCE // AGENTS"
      tag="WHATSAPP & AUTOMATION"
      title="MessagebotWP & Autonomous Agent Systems"
      subtitle="Zero-handoff full-stack design and deployment of autonomous WhatsApp agent platforms."
    >
      <div className="prose prose-sm max-w-none text-[var(--n-graphite)] space-y-6">
        <p>A suite of localized autonomous tools built for real-world operations in Bengaluru, including attendance tracking, batch scheduling, and automated payment collection.</p>
        
        <h3>01 / Context</h3>
        <p>Many traditional businesses require lightweight, resilient automation tools that operate natively on communication channels their users already trust, such as WhatsApp.</p>

        <h3>02 / The Build</h3>
        <p>Built using Next.js, Supabase, Prisma, Baileys, and Kimi Code CLI workflows. Designed specifically for optimal usability by users with limited English proficiency, maintaining high legibility and minimal friction.</p>

        <h3>03 / Outcome</h3>
        <p>Shipped live operational systems used for real-time operations, serving as proof of full-stack design engineering and autonomous AI agent orchestration capability.</p>
      </div>
    </ArtifactLayout>
  );
}
