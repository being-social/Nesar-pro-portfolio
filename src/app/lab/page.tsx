import { FlaskConical, Terminal, Film, Cpu } from "lucide-react";

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Lab — Nesar",
  description: "Design engineering lab experiments.",
  alternates: { canonical: "/lab" }
};


export default function LabPage() {
  const experiments = [
    {
      title: "Global Motion & Transition Tokens",
      category: "Motion Study",
      icon: Film,
      desc: "Standardized easing tokens ([0.16, 1, 0.3, 1]) and 150ms-300ms transition scales used across nesar.build.",
      status: "v1.0 live",
    },
    {
      title: "CLI Terminal Hero Component",
      category: "TUI / Web Component",
      icon: Terminal,
      desc: "Interactive executable terminal built into the portfolio hero with command parsing and status evaluation.",
      status: "Shipped",
    },
    {
      title: "Kimi Code AI Agent Workflows",
      category: "Agent Systems",
      icon: Cpu,
      desc: "Integration of Kimi Code OAuth CLI for code improvements, refactoring, and automated code review.",
      status: "Active",
    },
    {
      title: "MessagebotWP WhatsApp Engine",
      category: "Full Stack",
      icon: FlaskConical,
      desc: "Next.js + Baileys + Supabase engine for localized message triggers in Bengaluru.",
      status: "WIP v0.9",
    },
  ];

  return (
    <div className="space-y-12 py-4">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">The Lab</h1>
        <p className="text-sm text-[var(--fg-muted)] max-w-xl font-mono">
          Playground for live experiments, motion studies, CLI heroes, and autonomous AI agents.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {experiments.map((exp, idx) => {
          const IconComponent = exp.icon;
          return (
            <div
              key={idx}
              className="p-6 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-paper)] space-y-4 shadow-xs"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[var(--border-subtle)] text-[var(--fg-ink)]">
                  {exp.category}
                </span>
                <span className="text-[10px] font-mono text-[var(--accent-electric)]">
                  {exp.status}
                </span>
              </div>

              <div className="flex items-start gap-3">
                <IconComponent className="w-5 h-5 text-[var(--accent-electric)] shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h3 className="text-base font-bold">{exp.title}</h3>
                  <p className="text-xs text-[var(--fg-muted)] leading-relaxed">{exp.desc}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
