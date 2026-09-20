"use client";

import { useState } from "react";
import { Send, Bot, Sparkles, CheckCircle } from "lucide-react";

interface Message {
  sender: "user" | "astra";
  text: string;
}

export default function AstraPage() {
  const [visitorName, setVisitorName] = useState("");
  const [nameCaptured, setNameCaptured] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "astra",
      text: "Welcome to /astra. I'm Astra, Nesar's portfolio assistant. Who am I speaking with? (Recruiter, founder, or just snooping?)",
    },
  ]);
  const [loading, setLoading] = useState(false);

  const handleSend = async (textToSend?: string) => {
    const text = textToSend || input;
    if (!text.trim() || loading) return;

    if (!nameCaptured) {
      setVisitorName(text.trim());
      setNameCaptured(true);
      setMessages((prev) => [
        ...prev,
        { sender: "user", text },
        {
          sender: "astra",
          text: `Got it, ${text.trim()}. Ask me about Nesar's work at Entelligence AI, the $25M Composio deck, his AI agent builds, or his design-engineering stack.`,
        },
      ]);
      setInput("");
      return;
    }

    setMessages((prev) => [...prev, { sender: "user", text }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/astra", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, visitorName }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { sender: "astra", text: data.response || "Something broke." }]);
    } catch {
      setMessages((prev) => [...prev, { sender: "astra", text: "Network glitch. Try asking again." }]);
    } finally {
      setLoading(false);
    }
  };

  const chips = [
    "I'm hiring",
    "I have a project",
    "Book a call",
    "Just a question",
  ];

  return (
    <div className="space-y-8 py-8 max-w-3xl mx-auto">
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono text-[var(--n-playhead)] font-semibold">
          <Bot className="w-4 h-4 text-[var(--n-playhead)]" />
          <span>◇ ASTRA ASSISTANT ROUTE</span>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-[var(--n-playhead-soft)]">
            HOSTED / CLOUD MODE
          </span>
        </div>
        <h1 className="text-4xl font-medium tracking-tight">Ask Astra About Nesar</h1>
        <p className="text-xs font-mono text-[var(--n-graphite)]">
          Scope-locked portfolio assistant. Answers questions about Nesar's work, projects, and design engineering.
        </p>
      </div>

      {/* Main Chat Box */}
      <div className="border border-[var(--n-line)] rounded-[var(--n-radius-panel)] bg-[var(--n-paper)] flex flex-col h-[500px] shadow-sm overflow-hidden font-mono text-xs">
        <div className="p-4 border-b border-[var(--n-line-soft)] bg-[var(--n-paper-strong)] flex justify-between items-center text-[10px] text-[var(--n-muted)]">
          <span>PORTFOLIO_KNOWLEDGE_V1</span>
          <span className="text-[var(--n-playhead)] font-semibold flex items-center gap-1">
            <CheckCircle className="w-3 h-3" /> VERIFIED SCOPE
          </span>
        </div>

        <div className="flex-1 p-6 overflow-y-auto space-y-4">
          {messages.map((msg, i) => (
            <div key={i} className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}>
              <div
                className={`max-w-[85%] p-4 rounded-[var(--n-radius-card)] leading-relaxed font-sans text-sm ${
                  msg.sender === "user"
                    ? "bg-[#1f1e1e] text-[#ffffff] border border-[#1f1e1e]"
                    : "bg-[#ffffff] text-[#1f1e1e] border border-[rgb(232,232,232)]"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {loading && <div className="text-[var(--n-muted)] animate-pulse font-mono text-xs">Astra is typing...</div>}
        </div>

        {nameCaptured && (
          <div className="p-3 border-t border-[var(--n-line-soft)] flex gap-2 overflow-x-auto text-[11px]">
            {chips.map((chip, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(chip)}
                className="whitespace-nowrap px-3 py-1.5 rounded-full border border-[var(--n-line)] hover:border-[var(--n-playhead)] hover:text-[var(--n-playhead)] transition-colors bg-[var(--n-paper-strong)]"
              >
                {chip}
              </button>
            ))}
          </div>
        )}

        <div className="p-4 border-t border-[var(--n-line)] bg-[var(--n-paper-strong)] flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder={nameCaptured ? "Ask about Nesar..." : "Type your name or role..."}
            className="flex-1 bg-[var(--n-paper)] border border-[var(--n-line)] rounded-[var(--n-radius-control)] px-4 py-2.5 text-xs font-mono focus:outline-none focus:border-[var(--n-playhead)]"
          />
          <button
            onClick={() => handleSend()}
            className="px-4 py-2.5 bg-[var(--n-charcoal)] text-[var(--n-paper)] rounded-[var(--n-radius-control)] hover:opacity-90 transition-opacity font-semibold"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
