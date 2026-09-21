"use client";

import { useState } from "react";
import { X, Send, Bot, Sparkles } from "lucide-react";

interface Message {
  sender: "user" | "astra";
  text: string;
}

export function AstraDrawer({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "astra",
      text: "Astra here, Nesar's assistant.",
    },
  ]);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSend = async (textToSend?: string) => {
    const text = textToSend || input;
    if (!text.trim() || loading) return;

    setMessages((prev) => [...prev, { sender: "user", text }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/astra", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
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
    "Just a question"
  ];

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs">
      <div className="w-full max-w-md bg-[var(--n-paper)] h-full border-l border-[var(--n-line)] flex flex-col shadow-2xl animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="p-4 border-b border-[var(--n-line)] flex items-center justify-between">
          <div className="flex items-center gap-2 font-mono text-sm font-semibold">
            <Bot className="w-4 h-4 text-[var(--n-playhead)]" />
            <span className="text-[var(--n-ink)]">Astra</span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close chat"
            className="p-1 rounded hover:bg-[var(--n-line-soft)] transition-colors"
          >
            <X className="w-4 h-4 text-[var(--n-muted)]" />
          </button>
        </div>

        {/* Message Log */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 font-sans text-sm">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
            >
              <div
                className={`max-w-[85%] p-3 rounded-lg leading-relaxed ${
                  msg.sender === "user"
                    ? "bg-[var(--n-ink)] text-[var(--n-canvas)] border border-[var(--n-ink)]"
                    : "bg-[var(--n-paper-strong)] text-[var(--n-ink)] border border-[rgb(232,232,232)]"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {loading && (
            <div className="text-[var(--n-muted)] animate-pulse font-mono text-xs">Astra is typing...</div>
          )}
        </div>

        {/* Chips */}
        <div className="p-3 border-t border-[var(--n-line)] flex gap-2 overflow-x-auto text-[11px] font-mono">
          {chips.map((chip, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(chip)}
              className="whitespace-nowrap px-3 py-1.5 rounded border border-[var(--n-line)] hover:border-[var(--n-playhead)] hover:text-[var(--n-playhead)] transition-colors text-[var(--n-graphite)]"
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Input area */}
        <div className="p-4 border-t border-[var(--n-line)] flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type your message..."
            className="flex-1 bg-[var(--n-paper)] border border-[var(--n-line)] rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[var(--n-playhead)]"
          />
          <button
            onClick={() => handleSend()}
            className="p-2 bg-[var(--n-ink)] text-[var(--n-paper)] rounded-md hover:opacity-90 transition-opacity"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
