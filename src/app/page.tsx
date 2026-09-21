import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nesar B — Motion Designer & Design Engineer",
  description: "Motion designer and design engineer working across AI products, launch motion, web and systems.",
  alternates: { canonical: "/" }
};

export default function HomePage() {
  return (
    <div className="space-y-32">
      {/* 1. Hero Section */}
      <section className="max-w-[1200px] mx-auto pt-44 px-6 text-center">
        <h1 className="text-[clamp(36px,7vw,72px)] leading-[1.1] font-medium text-[var(--n-ink)] tracking-tight">
          From first frame <br /> to shipped code
        </h1>
        <p className="mt-8 text-xl md:text-2xl text-[var(--n-graphite)] font-medium max-w-2xl mx-auto leading-relaxed">
          Designer who builds, for AI products
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mt-10 w-full px-4 sm:px-0">
          <Link
            href="/work"
            className="w-full sm:w-auto px-6 py-4 rounded-[16px] bg-[var(--n-ink)] text-[var(--n-canvas)] font-medium hover:opacity-90 transition-opacity"
          >
            See the work
          </Link>
          <Link
            href="/motion"
            className="w-full sm:w-auto px-6 py-4 rounded-[16px] bg-transparent text-[var(--n-ink)] border border-[var(--n-line)] font-medium hover:bg-[var(--n-ink)] hover:text-[var(--n-canvas)] transition-colors"
          >
            Watch the reel
          </Link>
        </div>

        {/* Hero Visual Abstract */}
        <div className="relative mt-20 rounded-[24px] overflow-hidden bg-gradient-to-b from-[var(--n-paper)] to-[var(--n-ink)] aspect-[16/9] max-w-5xl mx-auto shadow-xl">
          <div className="absolute inset-[16%] rounded-full border border-[rgba(255,255,255,0.25)]"></div>
          <div className="absolute inset-[30%] rounded-full bg-[radial-gradient(circle_at_36%_30%,#fff,#8f8f8f_55%,var(--n-ink))] shadow-2xl"></div>
          <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-[rgba(255,255,255,0.8)] shadow-[0_0_24px_rgba(255,255,255,0.8)] -translate-x-1/2"></div>
        </div>
      </section>

      {/* 2. I don't hand it off */}
      <section className="max-w-[1200px] mx-auto px-6">
        <h2 className="text-[clamp(28px,5vw,56px)] font-medium tracking-tight text-[var(--n-ink)] text-center">
          I don&apos;t hand it off.
        </h2>
        <p className="mt-8 text-base md:text-xl text-[var(--n-graphite)] font-medium max-w-3xl mx-auto leading-relaxed text-center">
          Founding design work at Entelligence AI, previously at Composio. I make the product, the film and the site. Then I write the code for the parts that have to feel exact.
        </p>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-4 lg:gap-6">
          {/* Launch Films Card - Full width on mobile, left column on desktop */}
          <div className="relative rounded-[24px] overflow-hidden bg-[var(--n-ink)] min-h-[420px] md:min-h-[480px] p-8 flex flex-col justify-between">
            <div className="absolute inset-0 grid place-items-center">
              <div className="w-[58%] aspect-square rounded-full bg-[radial-gradient(circle_at_36%_30%,#fff,#8f8f8f_52%,var(--n-ink))]"></div>
            </div>
            <div className="relative z-10">
              <p className="text-xl font-medium text-[var(--n-canvas)] leading-relaxed">
                Launch films that explain what the product actually does
              </p>
            </div>
          </div>

          {/* Right column: Product Design + Websites */}
          <div className="grid gap-4 md:grid-cols-1">
            {/* Product Design */}
            <div className="relative rounded-[24px] overflow-hidden bg-[var(--n-paper)] min-h-[202px] p-6 md:p-8">
              <h3 className="text-xl font-medium leading-relaxed max-w-[22ch]">
                Product design for developer-facing AI
              </h3>
              <div className="absolute right-6 bottom-6 flex gap-2 items-end h-16">
                <span className="w-[14px] rounded-[3px] bg-[var(--n-graphite)]" style={{ height: "40%" }}></span>
                <span className="w-[14px] rounded-[3px] bg-[var(--n-charcoal)]" style={{ height: "70%" }}></span>
                <span className="w-[14px] rounded-[3px] bg-[var(--n-ink)]" style={{ height: "100%" }}></span>
              </div>
            </div>

            {/* Websites */}
            <div className="relative rounded-[24px] overflow-hidden bg-[var(--n-paper)] min-h-[202px] p-6 md:p-8">
              <h3 className="text-xl font-medium leading-relaxed max-w-[22ch]">
                Websites designed and shipped in code
              </h3>
              <div className="absolute right-6 bottom-6 w-[120px] h-[72px] rounded-[12px] bg-[var(--n-paper-strong)] border border-[var(--n-line)] p-4">
                <div className="h-[6px] w-[60%] bg-[var(--n-ink)] rounded-[99px]"></div>
                <div className="mt-[7px] h-[5px] w-[88%] bg-[var(--n-line)] rounded-[99px]"></div>
                <div className="mt-[5px] h-[5px] w-[72%] bg-[var(--n-line)] rounded-[99px]"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Entelligence Case Study - "One designer, a whole company's surface" */}
      <section className="max-w-[1200px] mx-auto px-6">
        <div className="rounded-[24px] bg-[var(--n-paper)] p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <h2 className="text-[clamp(26px,4vw,48px)] font-medium tracking-tight text-[var(--n-ink)]">
              One designer,<br />a whole company&apos;s surface
            </h2>
            
            {/* Section tabs indicator */}
            <div className="mt-8 flex gap-2">
              <div className="flex-1 h-[4px] rounded-[10px] bg-[rgba(0,0,0,0.06)] relative overflow-hidden">
                <div className="absolute inset-0 rounded-[10px] bg-[var(--n-ink)] transform-origin-left w-full" style={{ transformOrigin: "left" }}></div>
              </div>
              <div className="flex-1 h-[4px] rounded-[10px] bg-[rgba(0,0,0,0.06)] relative overflow-hidden">
                <div className="absolute inset-0 rounded-[10px] bg-[var(--n-ink)] w-full"></div>
              </div>
              <div className="flex-1 h-[4px] rounded-[10px] bg-[rgba(0,0,0,0.06)] relative overflow-hidden">
                <div className="absolute inset-0 rounded-[10px] bg-[var(--n-ink)] w-full"></div>
              </div>
            </div>
            
            <div className="mt-5">
              <p className="text-xl font-semibold text-[var(--n-ink)]"></p>
              <p className="mt-2 text-base text-[var(--n-graphite)] leading-relaxed max-w-[46ch]"></p>
            </div>

            <Link
              href="/work/entelligence"
              className="mt-7 inline-flex items-center gap-2 px-5 py-3.5 rounded-[16px] bg-[var(--n-ink)] text-[var(--n-canvas)] border border-[var(--n-line)] text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Read the case study
            </Link>
          </div>

          <div className="relative rounded-[24px] overflow-hidden bg-[var(--n-paper-strong)] border border-[var(--n-line)] aspect-[4/3]">
            <div className="absolute left-[8%] right-[8%] top-[14%] bottom-0 rounded-t-[16px] bg-[var(--n-ink)]"></div>
            <div className="absolute left-[16%] right-[16%] top-[32%] bottom-0 rounded-t-[12px] bg-[var(--n-paper)]"></div>
            <div className="absolute left-[24%] right-[24%] top-[52%] bottom-0 rounded-t-[10px] bg-[var(--n-paper-strong)] border border-[var(--n-line)] border-b-0"></div>
          </div>
        </div>
      </section>

      {/* 4. Lab / Experiments Section */}
      <section className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
          {/* Theta Academy */}
          <Link
            href="/lab/theta"
            className="group text-align-left p-8 rounded-[24px] bg-[var(--n-ink)] text-[var(--n-canvas)] min-h-[220px] flex flex-col justify-between gap-5"
          >
            <div>
              <h3 className="text-xl font-semibold leading-relaxed mb-2">Theta Academy</h3>
              <p className="text-base font-medium text-[var(--n-graphite)] leading-relaxed">
                Multi-tenant SaaS for running cricket academies, branches, coaches, rosters, attendance and fees.
              </p>
            </div>
            <span className="text-sm font-medium text-[var(--n-graphite)]">Next.js · PostgreSQL · live</span>
          </Link>

          {/* MessagebotWP */}
          <Link
            href="/lab/messagebotWP"
            className="group text-align-left p-8 rounded-[24px] bg-[var(--n-paper)] min-h-[220px] flex flex-col justify-between gap-5"
          >
            <div>
              <h3 className="text-xl font-semibold leading-relaxed mb-2">MessagebotWP</h3>
              <p className="text-base font-medium text-[var(--n-graphite)] leading-relaxed">
                WhatsApp automation platform with real users and real ops decisions.
              </p>
            </div>
            <span className="text-sm font-medium text-[var(--n-graphite)]">Next.js · Supabase · Baileys</span>
          </Link>

          {/* AI Onboard */}
          <Link
            href="/lab/ai-onboard"
            className="group text-align-left p-8 rounded-[24px] bg-[var(--n-paper)] min-h-[220px] flex flex-col justify-between gap-5"
          >
            <div>
              <h3 className="text-xl font-semibold leading-relaxed mb-2">AI Onboard</h3>
              <p className="text-base font-medium text-[var(--n-graphite)] leading-relaxed">
                A Claude-powered interview that turns a ten-minute conversation into a personal engagement persona.
              </p>
            </div>
            <span className="text-sm font-medium text-[var(--n-graphite)]">Claude · open source</span>
          </Link>
        </div>
      </section>

      {/* 5. CTA Section */}
      <section className="max-w-[1200px] mx-auto px-6 text-center">
        <div className="w-[100px] h-[100px] mx-auto rounded-[32px] bg-[var(--n-ink)] grid place-items-center">
          <span className="w-[34px] h-[34px] border-3 border-[var(--n-canvas)] rounded-full block"></span>
        </div>
        <h2 className="mt-7 text-[clamp(28px,5vw,56px)] font-medium tracking-tight text-[var(--n-ink)]">
          Let&apos;s make something that moves.
        </h2>
        <p className="mt-4 text-xl text-[var(--n-graphite)] font-medium max-w-[46ch] mx-auto leading-relaxed">
          Roles, freelance, or a launch that needs to land. Astra, my assistant, takes the first conversation
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-4 rounded-[16px] bg-[var(--n-ink)] text-[var(--n-canvas)] border border-[var(--n-line)] font-medium hover:opacity-90 transition-opacity"
          >
            Talk to Astra
          </Link>
        </div>
      </section>
    </div>
  );
}
