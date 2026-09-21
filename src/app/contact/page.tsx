"use client";

import { useState, useRef, useEffect } from "react";

type Msg = { text: string; from: "astra" | "user" };

const STARTERS = [
  { id: "work", label: "See the work" },
  { id: "role", label: "I'm hiring" },
  { id: "freelance", label: "Freelance / launch" },
  { id: "email", label: "Just email" },
];

function astraReply(id: string, draft: string): string {
  const t = (id || draft).toLowerCase();
  if (t.includes("email") || t.includes("hello@") || t.includes("nesar@")) {
    return "For a real reply, email nesar@nesar.build. This chat stays on your device — I don't book calls or forward messages from here.";
  }
  if (t.includes("hir") || t.includes("role") || t.includes("job")) {
    return "Nesar is founding designer at Entelligence AI (May 2025–present), previously designer at Composio through the $25M Series A. Email nesar@nesar.build with the role.";
  }
  if (t.includes("work") || t.includes("portfolio") || t.includes("case")) {
    return "Start at /work — Entelligence (founding design), Composio (launches + Series A deck), Contlo (creative / marketing, Apr–Jun 2024). Motion films live under /motion.";
  }
  if (t.includes("freelance") || t.includes("launch") || t.includes("film")) {
    return "Launch motion, product surfaces, and sites in code. Email nesar@nesar.build with the brief. This prototype does not book a calendar.";
  }
  return "This prototype answers from a local knowledge file and keeps the chat on your device. Vendor pitches stop here. For a real reply: nesar@nesar.build.";
}

export default function ContactPage() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [draft, setDraft] = useState("");
  const [step, setStep] = useState("ready");
  const [showQuick, setShowQuick] = useState(true);
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const send = (text: string, id?: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setMessages((m) => [...m, { text: trimmed, from: "user" }]);
    setDraft("");
    setShowQuick(false);
    setStep("reply");
    const reply = astraReply(id || "", trimmed);
    setTimeout(() => {
      setMessages((m) => [...m, { text: reply, from: "astra" }]);
      setStep("ready");
    }, 280);
  };

  const reset = () => {
    setMessages([]);
    setDraft("");
    setShowQuick(true);
    setStep("ready");
  };

  const share = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "https://nesar.build/contact";
    try {
      if (navigator.share) await navigator.share({ title: "Talk to Astra — Nesar", url });
      else await navigator.clipboard.writeText(url);
    } catch {
      /* cancelled */
    }
  };

  return (
    <div style={{ maxWidth: 840, margin: "0 auto", padding: "clamp(120px,18vw,140px) 24px 0" }}>
      <h1 style={{ fontSize: "clamp(28px,5vw,56px)", fontWeight: 500, lineHeight: "110%", letterSpacing: "-.05em", margin: 0, textAlign: "center" }}>
        Talk to Astra first
      </h1>
      <p style={{ fontSize: 20, fontWeight: 500, lineHeight: "140%", color: "var(--n-graphite)", textAlign: "center", margin: "16px auto 0", maxWidth: "50ch" }}>
        Astra is my assistant. This prototype keeps our chat on your device. For a real reply, email nesar@nesar.build directly.
      </p>

      <div style={{ marginTop: 36, borderRadius: 24, background: "var(--n-paper)", overflow: "hidden" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap", padding: "18px clamp(16px,4vw,24px)", borderBottom: "1px solid var(--n-line-soft)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ width: 36, height: 36, borderRadius: 12, background: "var(--n-ink)", display: "grid", placeItems: "center" }}>
              <span style={{ width: 12, height: 12, border: "2px solid var(--n-canvas)", borderRadius: 999, display: "block" }} />
            </span>
            <div>
              <p style={{ fontSize: 16, fontWeight: 600, lineHeight: "140%", margin: 0 }}>Astra</p>
              <p style={{ fontSize: 14, fontWeight: 500, lineHeight: "140%", color: "var(--n-graphite)", margin: 0 }}>Nesar&apos;s assistant · on-device</p>
            </div>
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <span style={{ fontSize: 14, fontWeight: 500, lineHeight: "140%", color: "var(--n-graphite)" }}>{step}</span>
            <button type="button" onClick={share} style={{ cursor: "pointer", borderRadius: 12, padding: "8px 12px", fontSize: 14, fontWeight: 500, lineHeight: "120%", border: "1px solid var(--n-line)", background: "var(--n-paper-strong)", color: "var(--n-ink)" }}>
              Share
            </button>
            <button type="button" onClick={reset} style={{ cursor: "pointer", borderRadius: 12, padding: "8px 12px", fontSize: 14, fontWeight: 500, lineHeight: "120%", border: "1px solid var(--n-line)", background: "var(--n-paper-strong)", color: "var(--n-ink)" }}>
              Start over
            </button>
          </div>
        </div>

        <div ref={chatRef} style={{ padding: "clamp(16px,4vw,24px)", display: "flex", flexDirection: "column", gap: 10, minHeight: 340, maxHeight: "min(460px,55vh)", overflow: "auto" }}>
          {messages.length === 0 && (
            <div style={{ margin: "auto 0", textAlign: "center", padding: "24px 8px" }}>
              <p style={{ fontSize: 20, fontWeight: 600, lineHeight: "140%", margin: 0 }}>Astra, Nesar&apos;s assistant.</p>
              <p style={{ fontSize: 16, fontWeight: 500, lineHeight: "140%", color: "var(--n-graphite)", margin: "6px auto 0", maxWidth: "40ch" }}>
                Pick what you&apos;re here for, or just type. This chat stays on this device.
              </p>
            </div>
          )}
          {messages.map((m, i) => (
            <div
              key={i}
              style={{
                maxWidth: "86%",
                padding: "12px 16px",
                borderRadius: 16,
                fontSize: 16,
                fontWeight: 500,
                lineHeight: "140%",
                whiteSpace: "pre-wrap",
                alignSelf: m.from === "user" ? "flex-end" : "flex-start",
                background: m.from === "user" ? "var(--n-ink)" : "var(--n-paper-strong)",
                color: m.from === "user" ? "var(--n-canvas)" : "var(--n-ink)",
                border: m.from === "user" ? "none" : "1px solid var(--n-line)",
              }}
            >
              {m.text}
            </div>
          ))}
        </div>

        {showQuick && (
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", padding: "0 clamp(16px,4vw,24px) 16px" }}>
            {STARTERS.map((q) => (
              <button
                key={q.id}
                type="button"
                onClick={() => send(q.label, q.id)}
                style={{ cursor: "pointer", borderRadius: 12, padding: "12px 16px", fontSize: 14, fontWeight: 500, lineHeight: "120%", border: "1px solid var(--n-line)", background: "var(--n-paper-strong)", color: "var(--n-ink)" }}
              >
                {q.label}
              </button>
            ))}
          </div>
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            send(draft);
          }}
          style={{ display: "flex", gap: 10, padding: "16px clamp(16px,4vw,24px) clamp(16px,4vw,24px)", borderTop: "1px solid var(--n-line-soft)" }}
        >
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Type a message..."
            style={{ flex: 1, border: "1px solid var(--n-line)", background: "var(--n-paper-strong)", borderRadius: 16, padding: "14px 18px", fontSize: 16, fontWeight: 500, color: "var(--n-ink)", outline: "none", minWidth: 0 }}
          />
          <button type="submit" style={{ cursor: "pointer", background: "var(--n-ink)", color: "var(--n-canvas)", border: "1px solid var(--n-line)", borderRadius: 16, padding: "14px 22px", fontSize: 14, fontWeight: 500, lineHeight: "120%", flex: "none" }}>
            Send
          </button>
        </form>
      </div>

      <p style={{ fontSize: 14, fontWeight: 500, lineHeight: "140%", color: "var(--n-graphite)", textAlign: "center", margin: "18px auto 0", maxWidth: "56ch" }}>
        Astra answers from a knowledge file on this device. Vendor pitches stop here. Prefer email?{" "}
        <a href="mailto:nesar@nesar.build" style={{ color: "var(--n-ink)" }}>nesar@nesar.build</a>
      </p>
    </div>
  );
}
