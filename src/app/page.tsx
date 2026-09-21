import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function HomePage() {
  return (
    <div className="space-y-32">
      {/* 1. Hero Section */}
      <section className="max-w-[1200px] mx-auto pt-44 px-6 text-center">
        <h1 className="text-6xl md:text-[clamp(64px,9.5vw,148px)] leading-[1.05] font-semibold text-[var(--n-ink)] tracking-tight">
          From first frame <br /> to shipped code
        </h1>
        <p className="mt-8 text-xl md:text-2xl text-[var(--n-graphite)] font-medium max-w-2xl mx-auto leading-relaxed">
          Designer who builds, for AI products
        </p>

        <div className="flex justify-center gap-4 mt-10">
          <Link
            href="/work"
            className="px-6 py-4 rounded-[16px] bg-[var(--n-ink)] text-[var(--n-canvas)] font-medium hover:opacity-90 transition-opacity"
          >
            See the work
          </Link>
          <Link
            href="/motion"
            className="px-6 py-4 rounded-[16px] bg-transparent text-[var(--n-ink)] border border-[var(--n-ink)] font-medium hover:bg-[var(--n-ink)] hover:text-[var(--n-canvas)] transition-colors"
          >
            Watch the reel
          </Link>
        </div>

        {/* Hero Visual Abstract */}
        <div className="relative mt-20 rounded-[24px] overflow-hidden bg-gradient-to-b from-[#f2f2f4] to-[#1f1e1e] aspect-[16/9] max-w-5xl mx-auto shadow-xl">
          <div className="absolute inset-[16%] rounded-full border border-[rgba(255,255,255,0.25)]"></div>
          <div className="absolute inset-[30%] rounded-full bg-[radial-gradient(circle_at_36%_30%,#fff,#8f8f8f_55%,#1f1e1e)] shadow-2xl"></div>
          <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-[rgba(255,255,255,0.8)] shadow-[0_0_24px_rgba(255,255,255,0.8)] -translate-x-1/2"></div>
        </div>
      </section>

      {/* 2. I don't hand it off */}
      <section className="max-w-[1200px] mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-semibold text-[var(--n-ink)] mb-4">
          I don’t hand it off.
        </h2>
        <p className="text-xl text-[var(--n-graphite)] max-w-3xl mb-12">
          Founding designer at Entelligence AI, previously the only designer at Composio.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Card 1 */}
          <div className="relative rounded-[24px] overflow-hidden bg-[var(--n-ink)] min-h-[420px] p-8 flex flex-col justify-end text-[var(--n-canvas)]">
            <div className="absolute inset-0 grid place-items-center opacity-70">
              <div className="w-[58%] aspect-square rounded-full bg-[radial-gradient(circle_at_36%_30%,#fff,#8f8f8f_52%,#1f1e1e)]"></div>
            </div>
            <div className="relative z-10 text-2xl font-medium max-w-[18ch] leading-tight">
              Launch films that explain what the product actually does
            </div>
          </div>

          <div className="grid gap-4">
            {/* Card 2 */}
            <div className="relative rounded-[24px] overflow-hidden bg-[var(--n-paper)] min-h-[202px] p-8 flex flex-col justify-between">
              <div className="text-2xl font-medium max-w-[18ch] text-[var(--n-ink)] leading-tight">
                Product design for developer-facing AI
              </div>
              <div className="mt-8 flex gap-2">
                <span className="w-12 h-2 bg-[#d4d4d4] rounded-full"></span>
                <span className="w-8 h-2 bg-[#a4a4a5] rounded-full"></span>
                <span className="w-16 h-2 bg-[var(--n-ink)] rounded-full"></span>
              </div>
            </div>

            {/* Card 3 */}
            <div className="relative rounded-[24px] overflow-hidden bg-[var(--n-paper)] min-h-[202px] p-8 flex flex-col justify-between">
              <div className="text-2xl font-medium max-w-[18ch] text-[var(--n-ink)] leading-tight">
                Websites designed and shipped in code
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. The Entelligence Spotlight */}
      <section className="max-w-[1200px] mx-auto px-6">
        <div className="rounded-[24px] bg-[var(--n-paper)] p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-3xl md:text-5xl font-semibold text-[var(--n-ink)] leading-tight mb-6">
              One designer,<br /> a whole company’s surface
            </h3>
            <div className="space-y-6">
              <p className="text-[var(--n-graphite)] text-lg">
                The product experience for a reliability engine, plus the brand it all sits inside. Built by the same person, so they never argued with each other.
              </p>
              <Link
                href="/work/entelligence"
                className="inline-block px-6 py-4 rounded-[16px] bg-[var(--n-ink)] text-[var(--n-canvas)] font-medium hover:opacity-90 transition-opacity"
              >
                Read the case study
              </Link>
            </div>
          </div>
          <div className="rounded-[24px] overflow-hidden bg-[var(--n-paper-strong)] border border-[var(--n-line-soft)] aspect-[4/3] relative">
            <div className="absolute left-[8%] right-[8%] top-[14%] bottom-0 rounded-t-[16px] bg-[var(--n-ink)]"></div>
            <div className="absolute left-[16%] right-[16%] top-[32%] bottom-0 rounded-t-[12px] bg-[var(--n-paper)]"></div>
            <div className="absolute left-[24%] right-[24%] top-[52%] bottom-0 rounded-t-[10px] bg-[var(--n-paper-strong)] border border-[var(--n-line-soft)]"></div>
          </div>
        </div>
      </section>

      {/* 4. What I can do for you */}
      <section className="max-w-[1200px] mx-auto px-6">
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-semibold text-[var(--n-ink)] mb-4">
            What I can do for you
          </h2>
          <p className="text-xl text-[var(--n-graphite)] max-w-2xl">
            Six things, all done by the same person. Nothing gets lost between the idea and the browser.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { title: "Product UI and UX", desc: "Research, wireframes, prototypes and final screens for developer-facing AI products." },
            { title: "Websites", desc: "Marketing sites and landing pages, from information architecture to the live build." },
            { title: "Launch videos", desc: "Films that make a product make sense on launch day: script, storyboard, styleframes, final cut." },
            { title: "Motion graphics", desc: "Product explainers, interface motion, title work, 3D modelling and rendering." },
            { title: "Shipping it in code", desc: "Next.js, React and Tailwind for the pages; design systems with tokens." },
            { title: "SEO and content", desc: "Three years in digital marketing before design. SEO, programmatic SEO, analytics." },
          ].map((item, idx) => (
            <div key={idx} className="bg-[var(--n-paper)] rounded-[24px] p-8">
              <div className="w-10 h-10 rounded-full bg-[var(--n-paper-strong)] border border-[var(--n-line-soft)] flex items-center justify-center mb-6">
                <span className="w-3 h-3 bg-[var(--n-ink)] rounded-sm"></span>
              </div>
              <h3 className="text-xl font-bold text-[var(--n-ink)] mb-2">{item.title}</h3>
              <p className="text-[var(--n-graphite)] leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Selected Work */}
      <section className="max-w-[1200px] mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-semibold text-[var(--n-ink)] mb-12">
          Selected work
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/work/entelligence" className="group rounded-[24px] bg-[var(--n-ink)] p-8 text-[var(--n-canvas)] flex flex-col justify-between min-h-[300px] hover:opacity-95 transition-opacity block">
            <div>
              <h3 className="text-2xl font-semibold mb-2">Entelligence AI</h3>
              <p className="text-[var(--n-muted)] leading-relaxed">
                Founding designer. Product, brand, the live website, launch films, Wrapped, the Leaderboard and the fundraising deck.
              </p>
            </div>
            <div className="text-[var(--n-muted)] text-sm font-mono mt-8">
              2025 to present · 6 artifacts
            </div>
          </Link>

          <div className="grid gap-4 md:col-span-2 grid-cols-1 sm:grid-cols-2">
            <Link href="/work/composio" className="group rounded-[24px] bg-[var(--n-paper)] p-8 border border-transparent hover:border-[rgba(0,0,0,0.1)] transition-colors flex flex-col justify-between block">
              <div>
                <h3 className="text-2xl font-semibold text-[var(--n-ink)] mb-2">Composio</h3>
                <p className="text-[var(--n-graphite)] leading-relaxed">
                  A year of launches and the deck behind a $25M Series A.
                </p>
              </div>
              <div className="text-[var(--n-graphite)] text-sm font-mono mt-8">
                2024 to 2025 · 4 artifacts
              </div>
            </Link>

            <Link href="/work/contlo" className="group rounded-[24px] bg-[var(--n-paper)] p-8 border border-transparent hover:border-[rgba(0,0,0,0.1)] transition-colors flex flex-col justify-between block">
              <div>
                <h3 className="text-2xl font-semibold text-[var(--n-ink)] mb-2">Contlo / SuperAGI</h3>
                <p className="text-[var(--n-graphite)] leading-relaxed">
                  Whitepaper, blog visuals and early brand marketing.
                </p>
              </div>
              <div className="text-[var(--n-graphite)] text-sm font-mono mt-8">
                2024 · 2 artifacts
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* 6. Contact CTA */}
      <section className="max-w-[1200px] mx-auto px-6 pb-24 text-center mt-10">
         <div className="w-[100px] h-[100px] mx-auto rounded-[32px] bg-[var(--n-ink)] flex items-center justify-center mb-8">
             <div className="w-10 h-10 bg-[var(--n-paper-strong)] rounded-full"></div>
         </div>
         <h2 className="text-4xl md:text-5xl font-semibold text-[var(--n-ink)] mb-4">
            Let’s make something that moves.
         </h2>
         <p className="text-xl text-[var(--n-graphite)] max-w-2xl mx-auto mb-10">
            Roles, freelance, or a launch that needs to land. Astra, my assistant, takes the details.
         </p>
         <Link
            href="/astra"
            className="inline-block px-8 py-4 rounded-[16px] bg-[var(--n-ink)] text-[var(--n-canvas)] font-medium hover:opacity-90 transition-opacity"
         >
            Talk to Astra
         </Link>
      </section>
    </div>
  );
}
