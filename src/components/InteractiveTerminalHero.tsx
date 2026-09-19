"use client";

import { useState, useEffect } from "react";
import { Terminal as TerminalIcon, Play, RefreshCw, CheckCircle } from "lucide-react";

export function InteractiveTerminalHero() {
  const [command, setCommand] = useState("nesar --init");
  const [output, setOutput] = useState<string[]>([
    "✓ System initialized.",
    "Founding Designer @ Entelligence AI",
    "Design Engineer — product, motion, landing pages, AI agents.",
    "Type 'help' or click a command below to explore.",
  ]);

  const runCmd = (cmdStr: string) => {
    setCommand(cmdStr);
    const clean = cmdStr.trim().toLowerCase();
    let newOut: string[] = [];

    if (clean === "nesar status" || clean === "status") {
      newOut = [
        "● Status: Founding Designer @ Entelligence AI",
        "● Location: Bengaluru, India (Pin: 560064)",
        "● Mode: Shipping product UX, motion tokens & AI agents",
      ];
    } else if (clean === "nesar stack" || clean === "stack") {
      newOut = [
        "● Stack: Next.js 15, TypeScript, React 19, Tailwind CSS 4",
        "● Motion: Framer Motion / Motion + GSAP 3.15",
        "● Agents: Python, Node.js, Baileys, OpenAI/Moonshot Kimi Code",
      ];
    } else if (clean === "nesar deck" || clean === "deck") {
      newOut = [
        "★ Composio Series A Pitch Deck ($25M raised, led by Lightspeed)",
        "★ Built end-to-end: story architecture, motion visuals & deck system",
      ];
    } else if (clean === "help") {
      newOut = [
        "Available commands:",
        "  status  - Current role & location",
        "  stack   - Core tech & design stack",
        "  deck    - The $25M Composio Series A story",
        "  clear   - Clear terminal output",
      ];
    } else if (clean === "clear") {
      setOutput([]);
      return;
    } else {
      newOut = [`command not found: ${cmdStr}. Type 'help' for options.`];
    }

    setOutput((prev) => [...prev, `$ ${cmdStr}`, ...newOut]);
  };

  return (
    <div className="w-full max-w-3xl mx-auto my-8 border border-[var(--border-subtle)] rounded-lg overflow-hidden bg-[#0e0e10] text-[#e1e1e6] font-mono text-xs shadow-xl">
      {/* Terminal Bar */}
      <div className="bg-[#18181c] px-4 py-2.5 border-b border-[#26262e] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
          <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
          <span className="ml-2 text-[11px] text-gray-400 flex items-center gap-1.5">
            <TerminalIcon className="w-3.5 h-3.5 text-[var(--accent-electric)]" />
            nesar@build:~
          </span>
        </div>
        <span className="text-[10px] text-emerald-400 flex items-center gap-1">
          <CheckCircle className="w-3 h-3" /> live executable
        </span>
      </div>

      {/* Terminal Content */}
      <div className="p-4 h-64 overflow-y-auto space-y-2 leading-relaxed">
        {output.map((line, idx) => (
          <div
            key={idx}
            className={
              line.startsWith("$")
                ? "text-emerald-400 font-semibold"
                : line.startsWith("★")
                ? "text-amber-300"
                : "text-gray-300"
            }
          >
            {line}
          </div>
        ))}
      </div>

      {/* Interactive Command Presets */}
      <div className="p-3 border-t border-[#26262e] bg-[#121215] flex flex-wrap items-center gap-2 text-[11px]">
        <span className="text-gray-500 font-sans text-xs">Run demo:</span>
        {["status", "stack", "deck", "help"].map((c) => (
          <button
            key={c}
            onClick={() => runCmd(c)}
            className="px-2.5 py-1 rounded bg-[#1e1e24] hover:bg-emerald-900/40 hover:text-emerald-300 border border-[#2e2e38] transition-colors"
          >
            nesar {c}
          </button>
        ))}
      </div>
    </div>
  );
}
