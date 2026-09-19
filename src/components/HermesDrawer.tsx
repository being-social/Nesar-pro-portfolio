"use client";

import { useState } from "react";
import { X, Send, Bot, Sparkles } from "lucide-react";

interface Message {
  sender: "user" | "hermes";
  text: string;
}

export function HermesDrawer({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [visitorName, setVisitorName] = useState("");
  const [nameCaptured, setNameCaptured] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "hermes",
      text: "Hey, I'm Hermes — Nesar's portfolio agent. Who am I speaking with? (Recruiter, founder, or just snooping?)",
    },
  ]);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSend = async (textToSend?: string) => {
    const text = textToSend || input;
    if (!text.trim() || loading) return;

    // First interaction captures name/role
    if (!nameCaptured) {
      setVisitorName(text.trim());
      setNameCaptured(true);
      setMessages((prev) => [
        ...prev,
        { sender: "user", text },
        {
          sender: "hermes",
          text: `Got it, ${text.trim()}. Ask me anything about Nesar's work, the $25M Composio deck, Entelligence AI, or his tech stack.`,
        },
      ]);
      setInput("");
      return;
    }

    // Normal message flow
    setMessages((prev) => [...prev, { sender: "user", text }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/hermes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, visitorName }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { sender: "hermes", text: data.response || "Something broke." }]);
    } catch {
      setMessages((prev) => [...prev, { sender: "hermes", text: "Network glitch. Try asking again." }]);
    } finally {
      setLoading(false);
    }
  };

  const chips = [
    "The $25M deck story",
    "What is he building now?",
    "Is he available?",
    "His tech stack",
  ];

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs">
      <div className="w-full max-w-md bg-[var(--bg-paper)] h-full border-l border-[var(--border-subtle)] flex flex-col shadow-2xl animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="p-4 border-b border-[var(--border-subtle)] flex items-center justify-between">
          <div className="flex items-center gap-2 font-mono text-sm font-semibold">
            <Bot className="w-4 h-4 text-[var(--accent-electric)]" />
            <span>Hermes Agent</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-[var(--accent-electric-glow)] text-[var(--accent-electric)]">
              v1.0
            </span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close chat"
            className="p-1 rounded hover:bg-[var(--border-subtle)] transition-colors"
          >
            <X className="w-4 h-4 text-[var(--fg-muted)]" />
          </button>
        </div>

        {/* Message Log */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 font-mono text-xs">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
            >
              <div
                className={`max-w-[85%] p-3 rounded-lg leading-relaxed ${
                  msg.sender === "user"
                    ? "bg-[var(--fg-ink)] text-[var(--bg-paper)]"
                    : "bg-[var(--border-subtle)]/40 border border-[var(--border-subtle)] text-[var(--fg-ink)]"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {loading && (
            <div className="text-[var(--fg-muted)] animate-pulse">Hermes is typing...</div>
          )}
        </div>

        {/* Chips */}
        {nameCaptured && (
          <div className="p-3 border-t border-[var(--border-subtle)] flex gap-2 overflow-x-auto text-[11px] font-mono">
            {chips.map((chip, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(chip)}
                className="whitespace-nowrap px-2.5 py-1 rounded border border-[var(--border-subtle)] hover:border-[var(--accent-electric)] hover:text-[var(--accent-electric)] transition-colors"
              >
                {chip}
              </button>
            ))}
          </div>
        )}

        {/* Input area */}
        <div className="p-4 border-t border-[var(--border-subtle)] flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder={nameCaptured ? "Ask about Nesar..." : "Type your name or role..."}
            className="flex-1 bg-[var(--bg-paper)] border border-[var(--border-subtle)] rounded-md px-3 py-2 text-xs font-mono focus:outline-none focus:border-[var(--accent-electric)]"
          />
          <button
            onClick={() => handleSend()}
            className="p-2 bg-[var(--fg-ink)] text-[var(--bg-paper)] rounded-md hover:opacity-90 transition-opacity"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
