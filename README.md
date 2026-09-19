# nesar.build — Pro Portfolio

Design engineer portfolio for Nesar B. The site itself is the proof.

> "I design it. Then I build it."

## Stack
Next.js · Tailwind · Vercel · Framer Motion · MDX · PostHog

## Structure
```
nesar.build
├── /            Home
├── /work        Selected work → /work/[case-study]
├── /lab         Playground — experiments, motion, agents, WIP
├── /about       The story + how I work
├── /hermes      The agent (also site-wide as a floating launcher)
├── /now         What I'm doing right now
└── /404         Terminal joke
```

## Context docs
`_context/` holds the ideation doc and LinkedIn profile — source of truth for copy, positioning, and architecture decisions.

- [`_context/nesar_build_Portfolio_Ideation.md`](./_context/nesar_build_Portfolio_Ideation.md) — full blueprint: sitemap, Hermes architecture, visual identity, build order
- [`_context/Nesar_LinkedIn_FINAL.md`](./_context/Nesar_LinkedIn_FINAL.md) — locked LinkedIn profile: experience, copy, skills

## Build sessions
1. **Session 1** — Identity tokens + Next.js scaffold + Home hero
2. **Session 2** — /work + Entelligence case study
3. **Session 3** — Hermes v1 (knowledge base, name-gating, scope lock)
4. **Session 4** — Composio + Lab + /about + /now
5. **Session 5** — Polish pass, mobile, 404, OG images, launch
