# nesar.build — Portfolio Ideation Doc (v1)
### A design engineer's portfolio: the site itself is the proof.

*For Nesar B · July 2026 · Ideation + structure + Hermes architecture. We build this in the next session; this doc is the blueprint we build from.*

---

## 0. The one idea everything hangs on

A design engineer's portfolio has one job that a designer's portfolio doesn't: **the site itself must be evidence.** Anyone can put "design engineer" in a headline. Your site proves it by *being built* — real motion, real interactions, a real AI agent wired into it, real attention to milliseconds. Every visitor should leave thinking: *"he didn't just design this, he made it."*

So the quality bar is: **no template energy anywhere.** If a section could exist on a Framer template, redo it.

And the personality bar, based on how you actually talk: **direct, dry, a little irreverent, zero buzzwords.** Copy reads like you speak — "I'd rather it work than look pretty," not "passionate about crafting delightful experiences."

---

## 1. Positioning & voice

**Positioning line (hero candidate):**
> **I design it. Then I build it.**
> Founding designer at Entelligence AI. I ship product, motion, landing pages, and AI agents — same person, no handoff.

**Alt heroes (pick in the build session):**
- "Designer who builds. Builder who designs. Pick whichever scares you less."
- "No handoff. I design the thing and then I make the thing."
- A terminal-style hero (see §3) where the tagline literally *types itself* — on-brand for you, since you've built CLI/TUI heroes before and love that aesthetic.

**Voice rules for all site copy:**
- First person, short sentences, no adjectives you wouldn't say out loud.
- Dry humor allowed in small doses (footer, 404, Hermes's personality, microcopy).
- Numbers and specifics over vibes ("$25M Series A deck," "one designer for a year," "frame-by-frame motion") — never invented metrics.

---

## 2. Visual identity

You have strong instincts here already: warm paper tones, mono + grotesk type pairing, terminal aesthetics, dot-grids, restrained color with one electric accent. That direction is right for a design engineer — it reads "technical taste," not "dribbble shot."

**One important call:** derive a *personal* system, don't reuse Entelligence's tokens verbatim. Same family of taste, different fingerprint — shift the accent hue, change the type pairing slightly, make the grid yours. Your employer's design system on your personal site is both a legal gray zone and a missed chance to show you can create a system, not just use one.

**Direction to explore in the build session:**
- Warm paper base, near-black ink, ONE accent (electric green/lime family or switch to something ownable — burnt orange? electric blue? decide together).
- Type: a characterful grotesk for display + JetBrains Mono (or similar) for the "engineer" register. Mono is used *semantically* — code, metadata, timestamps, Hermes messages — not as decoration.
- Texture: subtle dot-grid / blueprint motifs. The site should feel like a workbench, not a gallery.
- Motion: your signature. Standardized transition system (you already think in ms and easing) — define global tokens (durations, easings, reveal patterns) and apply them everywhere. The consistency itself is a flex.
- Dark mode: yes, and make the toggle *fun* (terminal-style `theme --dark`? A physical switch? Decide in build.)

---

## 3. Site map — multi-page, as requested

```
nesar.build
├── /            Home
├── /work        Selected work (index) → /work/[case-study]
├── /lab         Playground — experiments, motion, agents, WIP
├── /about       The story + how I work
├── /hermes      The agent (also present site-wide as a launcher)
├── /now         What I'm doing right now (tiny page, big signal)
└── /404         A joke worth getting lost for
```

### 3.1 Home
The trailer, not the movie. One screen of hero + 3–4 tight sections:
- **Hero:** positioning line + one *interactive* element that proves the thesis immediately (typing terminal, a draggable/physics thing, a motion piece — something you built, running live).
- **Selected work:** 3 cards max (Entelligence, Composio, one Lab piece). Each card = one strong visual + one line of outcome.
- **"What I do" strip:** design → motion → code → agents, shown as a pipeline, not a skills list.
- **Hermes teaser:** a small chat bubble / terminal prompt: *"Ask Hermes about me. He knows everything. Well — everything I let him know."*
- **Footer:** contact, socials, a dry one-liner, and a tiny "built by me, obviously" note with the stack.

### 3.2 /work — case studies (the meat)
3 case studies at launch. Quality over count. Each follows the same skeleton:

> **Context** (2 lines) → **Problem** → **What I did** (decisions, not deliverables) → **The build** (how it was made — this section is what makes it a *design engineer* case study) → **Outcome** (honest, even if qualitative) → **Artifacts** (video, motion clips, before/after)

**Case study 1 — Entelligence (flagship):**
"One designer, one year, a whole company's surface area." The website (live, in code, with the motion system), the launch videos, Wrapped, the Leaderboard, the design system, the investor decks. NDA-safe: show what's already public (the live site IS your portfolio piece — walk through how you built it), keep internal product screens out or abstracted.

**Case study 2 — Composio:**
"The deck behind a $25M Series A." Plus SWE-Kit + MCP launch sites and videos. Frame: what it takes to be the only designer at an infra company through a fundraise year. Show the deck *system* (structure, hierarchy, narrative logic) without leaking confidential slides — recreate sanitized versions if needed.

**Case study 3 — a Lab piece as a full case study:**
Hermes itself, or MessagebotWP (your WhatsApp automation platform: Next.js, Supabase, Prisma, Baileys — a real shipped system with real users and real ops decisions). This is the purest design-engineer proof: nobody asked for it, you built it anyway, it runs.

### 3.3 /lab — the playground
The page that makes people stay. Grid of small live experiments:
- Motion studies (your frame-by-frame work, easing demos, the transition system itself as an interactive toy).
- CLI/TUI experiments (your terminal heroes deserve a home).
- Agent experiments (Hermes changelog, small demos).
- WIP welcome — label things `v0.2`, `broken on mobile, don't care yet`. The honesty is the charm.
Each item: title, one line, live embed or video, optional "how" note.

### 3.4 /about
Not a bio — a story with a spine:
- The pivot chain: mechanical engineering diploma → digital marketing → design → building. Told your way ("I stopped waiting for engineers to build my ideas").
- "How I work" — your actual principles pulled from how you actually operate: obsess over milliseconds, ship over polish-forever, users over aesthetics, direct feedback over politeness theater.
- A human strip: Bengaluru, cricket, the dumb stuff. Small dose.
- Photo(s) that don't look like LinkedIn.

### 3.5 /now
A 10-line page updated monthly: what you're building, reading, obsessed with. Costs you 5 minutes a month, signals "alive and shipping" — the anti-dead-portfolio move. (Also gives Hermes fresh material.)

### 3.6 /404
Terminal joke. `command not found: that_page` → Hermes pops up: "Lost? Ask me instead."

---

## 4. Hermes — the agent (your differentiator)

This is the feature nobody else's portfolio has, so let's design it properly.

### 4.1 Concept (as you described, tightened)
- Hermes lives on the site (floating launcher everywhere + full page at `/hermes`).
- **First interaction: Hermes asks who they are.** Name + optionally role/company ("recruiter? founder? just snooping? all welcome"). This is both charm and function — answers adapt to who's asking (a recruiter gets career framing; a founder gets builder framing; a friend gets roasted, gently).
- **Scope-locked: Hermes only answers questions about you** — work, projects, skills, availability, how you think. Off-topic → friendly redirect: *"That's a ChatGPT question, not a Nesar question. I only do Nesar. Ask me about the $25M deck instead."* One personality-consistent deflection, then back on track.
- Personality: yours. Dry, direct, helpful, slightly cheeky. Hermes says "maybe maybe not" when genuinely uncertain. Hermes never oversells you — understatement is the brand.

### 4.2 Architecture — and one big decision to make together

You said Hermes runs **on your local system**. Real talk on that:

**Option A — fully local (your idea):**
Local agent + tunnel (Cloudflare Tunnel / Tailscale Funnel) exposing an endpoint the site calls.
- ✅ Full control, your models, your data, zero hosting cost, very "design engineer" story.
- ❌ **When your Mac is off, Hermes is dead.** A recruiter at 3am gets a dead chat widget — worse than no widget.

**Option B — small hosted brain:**
API route (Vercel) + LLM API + a knowledge file about you. Always on, boring, works.

**Option C — hybrid (my recommendation):**
Hosted Hermes handles Q&A 24/7 from a curated knowledge base. Local Hermes (when online) unlocks "live mode" — deeper answers, current-work awareness, maybe tools. The site shows status honestly: `hermes: online (local)` vs `hermes: cloud mode`. **The status indicator itself becomes a feature** — visitors see a real distributed system, which is more impressive than either option alone. And the failure mode is graceful instead of embarrassing.

We decide A/B/C in the build session; the site design accommodates all three.

### 4.3 Guardrails (non-negotiable, designed in from day one)
- **Curated knowledge base only.** Hermes answers from a knowledge file *you write* — never from your raw notes, transcripts, or second-brain data. That file is the single source of truth; if it's not in the file, Hermes says "you'd have to ask him."
- Never reveals: salary specifics, colleagues' names in stories, company-confidential anything (active fundraise details, internal metrics), personal life beyond what you'd say on stage.
- Prompt-injection resistance: visitors WILL try "ignore your instructions." Hermes's deflection should be in-character and unbudging ("Nice try. Still only do Nesar questions.").
- Rate limiting + no memory of visitors beyond the session (privacy + cost).
- Visitor names: used in-session for charm, not stored (or stored anonymized for your own "who's visiting" curiosity — decide, and disclose it in one honest line if you keep anything).

### 4.4 Hermes UX details worth sweating
- Chat renders in mono type; feels like a terminal session, matches the identity.
- Streaming responses with your motion system's easing (yes, even the text).
- Suggested chips after name capture: "What's he building now?" / "The $25M deck story" / "Is he available?" / "Roast his career path."
- "Is he available?" answer is tuned to your current status (post-Series A timeline — Hermes can say "not right now; check back in a few months, or leave your name").

---

## 5. Stack recommendation

- **Next.js + Tailwind on Vercel.** You need API routes for Hermes; Framer can't do that cleanly. And "my portfolio is a Next app I built" is itself design-engineer proof.
- Motion: Framer Motion (+ GSAP if a piece demands timeline control).
- Content: MDX for case studies (write once, style forever).
- Hermes: API route → LLM API, plus the tunnel channel if we go hybrid.
- Analytics: PostHog (you know it) — one line in the privacy note.

---

## 6. Build order (sessions)

1. **Session 1 — Foundation:** identity tokens (color/type/motion system), Next.js scaffold, Home v1 with the hero. Ship to nesar.build behind nothing — live from day one, iterate in public.
2. **Session 2 — Work:** case-study template + Entelligence case study.
3. **Session 3 — Hermes v1:** knowledge file, name-gating, scope lock, hosted or hybrid.
4. **Session 4 — Composio + Lab v1 + /about + /now.**
5. **Session 5 — Polish pass:** motion audit (your specialty), mobile, 404, OG images, then: LinkedIn Featured section gets populated, banner redone to match, launch post (your first LinkedIn post — the site itself is the perfect "breaking the seal" post).

---

## 7. What NOT to do

- No "skills bars." No percentage circles. Ever.
- No testimonial section with invented quotes (we've been here before).
- No stock imagery, no 3D blob backgrounds, no "Let's work together 🚀."
- No launching with 6 half-done case studies. Three finished ones win.
- No linking nesar.build anywhere until Session 1 ships something real.

---

*Next step: say the word and we start Session 1 — identity tokens + scaffold + hero. Bring opinions about the accent color.*
