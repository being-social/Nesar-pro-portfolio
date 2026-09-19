"use client";

import { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // In v1, we mock the submission response as this needs Backend integration
    // which is defined as TODO_EXTERNAL/Adapter layer in the Build Master.
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="max-w-xl mx-auto py-24 text-center space-y-4">
        <CheckCircle2 className="w-12 h-12 text-[var(--n-playhead)] mx-auto" />
        <h1 className="text-2xl font-bold">Message sent.</h1>
        <p className="text-sm text-[var(--n-graphite)] font-mono">
          Nesar usually responds within 24–48 hours if the build is compelling.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto py-12 space-y-8">
      <div className="space-y-2">
        <h1 className="text-2xl font-medium">Get in touch</h1>
        <p className="text-xs text-[var(--n-graphite)] font-mono">
          Have something difficult to explain, design, or make move?
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            required
            placeholder="Name"
            className="w-full p-3 rounded-[var(--n-radius-control)] border border-[var(--n-line)] bg-[var(--n-paper)] text-xs font-mono focus:border-[var(--n-playhead)] outline-none"
          />
          <input
            required
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded-[var(--n-radius-control)] border border-[var(--n-line)] bg-[var(--n-paper)] text-xs font-mono focus:border-[var(--n-playhead)] outline-none"
          />
        </div>
        <input
          placeholder="Company (optional)"
          className="w-full p-3 rounded-[var(--n-radius-control)] border border-[var(--n-line)] bg-[var(--n-paper)] text-xs font-mono focus:border-[var(--n-playhead)] outline-none"
        />
        <select
          className="w-full p-3 rounded-[var(--n-radius-control)] border border-[var(--n-line)] bg-[var(--n-paper)] text-xs font-mono text-[var(--n-graphite)] focus:border-[var(--n-playhead)] outline-none"
        >
          <option value="role">Working together</option>
          <option value="freelance">Freelance</option>
          <option value="collaboration">Collaboration</option>
          <option value="speaking">Speaking</option>
          <option value="hello">Just say hello</option>
        </select>
        <textarea
          required
          rows={5}
          placeholder="Message"
          className="w-full p-3 rounded-[var(--n-radius-control)] border border-[var(--n-line)] bg-[var(--n-paper)] text-xs font-mono focus:border-[var(--n-playhead)] outline-none"
        />
        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-[var(--n-radius-control)] bg-[var(--n-charcoal)] text-[var(--n-paper)] font-mono text-xs font-semibold hover:opacity-90 transition-opacity"
        >
          Send message <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
}
