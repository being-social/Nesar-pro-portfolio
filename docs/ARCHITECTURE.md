# NESAR.BUILD — ARCHITECTURE + AUTONOMOUS BUILD MASTER
## v1.0 — Canonical AI-agent execution brief
**Companion file:** `NESAR_PORTFOLIO_DESIGN_SYSTEM_v1.md`  
**Primary goal:** Ship a production-grade portfolio foundation that already feels intentional, while leaving room for later art-direction iteration.

---

# 0. READ THIS FIRST

This file tells the implementation agent:

- what to build,
- how the repository should be structured,
- what routes must exist,
- how content is modeled,
- how analytics works,
- how Hermes fits,
- how to work autonomously,
- what the single authorization covers,
- what to do when information or credentials are missing.

The visual source of truth is:

> `NESAR_PORTFOLIO_DESIGN_SYSTEM_v1.md`

If this file and the design file appear to conflict on visual decisions, the design file wins.

If they conflict on architecture or route structure, this file wins.

---

# 1. PRODUCT POSITIONING

The site represents Nesar as:

> **Motion Designer + Product/Design Engineer**

He also:

- codes,
- builds interactive websites,
- works on design systems,
- builds AI agents/automations,
- ships Hermes-like systems.

Those capabilities are **supporting proof**, not the dominant brand.

## Editorial priority

Maintain approximately:

- 55% motion / visual design
- 30% product / design engineering
- 15% code / agents / automation

Do not drift into:

- indie-hacker portfolio
- founder portfolio
- full-stack engineer portfolio
- AI-agent consultancy website

---

# 2. RECOMMENDED STACK

## Framework

- Next.js 16 App Router
- React 19
- TypeScript strict
- Tailwind CSS 4

## Package manager

- Bun

## Motion

Default:

- `motion`

Only add GSAP when a concrete timeline/scroll sequence requires capabilities that Motion does not cleanly provide.

GSAP should not be imported globally.

## Content

- local MDX / typed content
- Zod validation
- no CMS in v1

## Data

- Neon Postgres
- Drizzle ORM

Use database only for persistent app data:

- contact leads
- contact messages
- optional Hermes identities/feedback
- optional internal state

Do not mirror analytics events into Postgres.

## Ephemeral state / abuse controls

- Upstash Redis

Use for:

- rate limits
- Hermes throttles
- idempotency
- temporary locks

## Email

- Resend

## Bot protection

- Cloudflare Turnstile

## Analytics

Primary:

- PostHog

Secondary:

- Vercel Web Analytics
- Vercel Speed Insights

## Hosting

- Vercel

---

# 3. ONE-TIME AUTHORIZATION ENVELOPE

The user wants to grant permission **once**, not be interrupted for routine build steps.

## Exact authorization sentence

The user can send this once to the coding agent:

> **I authorize the complete `NESAR_BUILD_EXECUTION_ENVELOPE` defined in `NESAR_PORTFOLIO_BUILD_MASTER_v1.md` for this portfolio repository. Proceed autonomously to the completion criteria, make reasonable implementation decisions without asking me, and use documented placeholders for non-blocking external dependencies.**

After receiving that authorization, the agent should not ask for routine confirmation again.

## 3.1 Authorized repository actions

The authorization grants permission to:

- inspect the entire portfolio repository
- create files
- modify files
- rename files
- move files
- delete obsolete repository files when replacement is clearly part of the build
- refactor existing code
- initialize or update project configuration
- install/remove/update npm/Bun packages required by this brief
- run Bun/npm scripts
- run development server
- run lint
- run typecheck
- run tests
- run builds
- run formatting
- generate local static assets
- optimize images
- generate posters/thumbnails from user-provided media when tooling is available
- create DB schemas/migrations
- create `.env.example`
- read existing environment variable names
- use already-configured credentials through normal app/runtime mechanisms
- create seed content
- create placeholder media
- create README / architecture docs
- create git branches
- create local git commits
- fix implementation errors
- change internal architecture when required to satisfy the brief
- spawn specialized sub-agents if the environment supports them
- rerun failed checks
- make responsive/accessibility fixes without asking

## 3.2 Authorized development actions

The agent may independently choose:

- component boundaries
- file naming
- internal abstractions
- whether a small interaction uses CSS or Motion
- exact responsive breakpoints
- minor token adjustments within the canonical design spirit
- library alternatives if the specified library fails
- local caching strategy
- test tooling
- image optimization tooling
- code splitting strategy
- loading strategy

The agent should document consequential deviations.

## 3.3 External credentials / unavailable integrations

If a required external secret is missing:

**Do not stop the build.**

Instead:

1. implement the integration behind an adapter;
2. add the required variable to `.env.example`;
3. return a development-safe stub/fallback;
4. add `TODO_EXTERNAL`;
5. continue building everything else.

Examples:

- PostHog key missing → analytics provider no-ops locally.
- Resend key missing → contact route validates and logs a safe dev response.
- Neon missing → repository can boot with mocked/dev adapter.
- Hermes model key missing → return curated dev placeholder.
- Turnstile missing → development bypass only when `NODE_ENV !== production`.

## 3.4 Actions that are NOT silently authorized

This file cannot override a platform’s own security confirmations.

The agent must not silently:

- expose or print secrets
- purchase paid services
- upgrade paid plans
- register a domain
- transfer a domain
- delete cloud accounts
- delete production databases
- overwrite unrelated repositories
- send bulk external email
- publish confidential company files
- modify employer systems
- bypass account security
- disable platform security controls

If the environment itself forces a permission prompt, aggregate actions into the smallest possible number of prompts.

For a blocked external action, mark:

`TODO_EXTERNAL`

and continue all unblocked work.

---

# 4. AGENT OPERATING MODEL

If multi-agent execution is available, use these roles.

## Agent A — Design-system implementer

Owns:

- tokens
- themes
- typography
- primitives
- layout system
- glass material
- accessibility foundations

## Agent B — Information architecture / content

Owns:

- route map
- MDX schemas
- placeholder copy
- project metadata
- cross-linking
- SEO data

## Agent C — Motion systems

Owns:

- motion tokens
- hero entrance
- playhead reveal
- route transition
- reduced motion
- reel behaviors
- motion-card previews

## Agent D — Product frontend

Owns:

- Home
- Work
- Motion
- About
- Now
- Contact
- Lab
- responsive implementation

## Agent E — Backend / analytics

Owns:

- contact endpoint
- DB schema
- PostHog
- rate-limit adapters
- Hermes API scaffold
- privacy implementation

## Agent F — QA

Owns:

- typecheck
- build
- lint
- accessibility audit
- responsive audit
- performance
- dead-code/package audit
- route coverage

### Coordination rule

No agent may invent its own tokens or visual system.

All visual decisions come from the canonical design file.

---

# 5. SITE MAP

## Primary navigation

```text
Work
Motion
Lab
About
```

## Secondary utility

```text
Now
Contact
```

Hermes is a site-wide launcher, not a primary navigation item.

## Routes

```text
/
├── /work
│   ├── /entelligence
│   │   ├── /website
│   │   ├── /agent-insights
│   │   ├── /leaderboard
│   │   ├── /wrapped
│   │   ├── /design-system
│   │   └── /decks
│   │
│   ├── /composio
│   │   ├── /series-a-deck
│   │   ├── /swe-kit
│   │   ├── /mcp-launch
│   │   └── /website
│   │
│   └── /contlo
│       ├── /superagi-whitepaper
│       └── /brand-marketing
│
├── /motion
│   └── /[slug]
│
├── /lab
│   └── /[experiment]
│
├── /about
├── /now
├── /hermes
├── /contact
├── /privacy
└── /404
```

Implementation can use grouped App Router folders.

---

# 6. CONTENT MODEL

## 6.1 Project

```ts
export type Project = {
  slug: string
  company: string
  title: string
  thesis: string
  summary: string
  year: string
  role: string[]
  disciplines: string[]
  featured: boolean
  order: number
  cover: Media
  accent?: string
  publicUrl?: string
  status: "published" | "draft"
}
```

## 6.2 Artifact

```ts
export type Artifact = {
  slug: string
  project: string
  title: string
  summary: string
  type:
    | "website"
    | "motion"
    | "deck"
    | "system"
    | "product"
    | "brand"
  year: string
  cover: Media
  status: "published" | "draft" | "wip"
}
```

## 6.3 Motion piece

```ts
export type MotionPiece = {
  slug: string
  title: string
  project?: string
  client?: string
  year: string
  duration?: string
  fps?: number
  role: string[]
  tools?: string[]
  summary: string
  poster: Media
  video?: Media
  featured: boolean
  order: number
  status: "published" | "draft" | "wip"
}
```

## 6.4 Lab experiment

```ts
export type Experiment = {
  slug: string
  title: string
  summary: string
  category:
    | "motion-system"
    | "ascii"
    | "interface"
    | "hermes"
    | "agent"
    | "tiny-tool"
    | "transition"
  version: string
  status: "stable" | "wip" | "broken" | "archived"
  interactive: boolean
  order: number
}
```

## 6.5 Now

```ts
export type NowEntry = {
  updatedAt: string
  building: string[]
  learning: string[]
  exploring: string[]
}
```

---

# 7. VERIFIED BASE CONTENT

Never invent metrics, quotes, outcomes, or confidential facts.

Use `TODO_CONTENT` whenever support is incomplete.

## Nesar

Core positioning:

> Motion Designer · Design Engineer

Base description:

> Nesar is a designer who builds, with work spanning product design, motion, landing pages, design systems, launch films, and AI-agent experiments.

## Entelligence

Use verified scope:

- Founding Designer
- only designer for first year+
- product
- brand
- marketing
- current website
- motion
- launch videos
- Leaderboard
- Wrapped
- design system/component library
- investor decks

## Composio

Use verified scope:

- Designer
- only designer
- SWE-Kit launch
- MCP launch
- launch videos/creatives
- Series A pitch deck
- website redesign/rebuild

Do not imply design ownership of core Composio engineering features that were not owned.

## Contlo / SuperAGI

Use:

- creative/marketing design
- whitepaper
- blog visuals / thumbnails
- early-stage brand work

---

# 8. HOME PAGE

## 8.1 Hero

Use the canonical design-system hero.

Base copy:

### Label

`MOTION DESIGNER · DESIGN ENGINEER`

### Headline

> **I make things move. Then I make them real.**

### Support

> I’m Nesar — a motion designer and design engineer shaping AI products across product, brand, web, and launch motion. I code when the idea needs to become real.

### Actions

Primary:

`View work`

Secondary motion action:

`Play reel`

## 8.2 Reel proof

Immediately after the hero, show motion proof.

Do not make the visitor scroll past multiple paragraphs to discover that Nesar is a motion designer.

Use:

- poster-first media
- viewport-aware playback
- 4–6 clips max
- no sound autoplay
- reduced-motion fallback

## 8.3 Selected work

Three flagship stories.

Recommended initial set:

1. Entelligence
2. Composio
3. Hermes / design-engineering Lab piece

The third must be visually smaller than the two primary professional projects if it risks making the site feel code-first.

## 8.4 Practice range

Use:

```text
Motion
Product
Web
Systems
```

Not:

```text
Frontend
Backend
AI
DevOps
```

## 8.5 Process

Storyboard-like:

```text
brief → direction → frames → system → motion → build → ship
```

## 8.6 Lab teaser

Three experiments.

## 8.7 Hermes teaser

Small.

Do not allow Hermes to become a homepage product demo.

## 8.8 Now / contact

Compact.

---

# 9. MOTION PAGE

This route is a first-class portfolio surface.

## 9.1 Index behavior

Desktop:

- large clips
- film-strip rhythm
- irregular editorial sizing
- hover previews
- frame metadata

Mobile:

- posters
- tap preview
- one motion asset at a time
- no autoplay wall

## 9.2 Motion detail template

Required chapters:

```text
01 / Final
02 / Why
03 / Storyboard
04 / Styleframes
05 / Timing
06 / Iterations
07 / Final frames
08 / Tools
```

Skip chapters that have no real material.

Do not invent process artifacts.

---

# 10. WORK PAGE

## Work index

Not a Behance masonry wall.

Use:

- editorial project index
- visual cover
- concise thesis
- discipline
- year
- role

Optional filters:

```text
All
Product
Web
Systems
Brand
```

Motion remains separately navigable.

---

# 11. CASE STUDY TEMPLATE

## Project hero

Fields:

- project
- thesis
- role
- year
- disciplines
- public URL if safe
- hero artifact

## Chapters

Preferred:

```text
01 / Context
02 / Direction
03 / Frames
04 / System
05 / Build
06 / Outcome
07 / Reflection
```

## Build chapter

This is where design-engineering credibility appears.

Show:

- implementation constraints
- component/system decisions
- interaction architecture
- performance
- responsive design
- tooling

Do not turn the whole case study into source-code screenshots.

---

# 12. ENTELLIGENCE

## Umbrella route

`/work/entelligence`

Title direction:

> **Designing the surface area of an AI engineering company.**

## Artifact routes

### Website

Emphasize:

- information architecture
- visual direction
- interactive sections
- motion system
- design system
- responsive behavior
- implementation

### Agent Insights

Cross-link to Motion.

Work route:

- product story
- communication challenge
- launch purpose

Motion route:

- script
- storyboard
- styleframes
- scene system
- timing
- final

### Leaderboard

Emphasize:

- data hierarchy
- product/brand crossover
- public-facing interaction
- visual system

### Wrapped

Emphasize:

- turning engineering data into narrative
- shareability
- visual storytelling
- motion

### Design System

Emphasize:

- tokenization
- components
- reuse
- consistency
- motion tokens
- design-to-code link

### Decks

Only sanitized/public-safe.

No confidential fundraising details.

---

# 13. COMPOSIO

## Umbrella route

`/work/composio`

Title direction:

> **Design through a year of launches at an AI infrastructure company.**

## Series A deck

Use:

> **The deck behind a $25M Series A.**

Only if the statement remains accurate and the artifact can be discussed safely.

Show:

- information hierarchy
- narrative
- system
- visual logic
- sanitized layouts

## SWE-Kit

Show:

- launch identity
- developer communication
- site
- motion

## MCP launch

Show:

- launch creative
- landing / motion
- explanation system

Do not claim core platform UX ownership if unsupported.

## Website

Show:

- redesign
- rebuild
- information architecture
- constraints
- result

---

# 14. CONTLO / SUPERAGI

Keep concise.

Routes:

```text
/work/contlo
/work/contlo/superagi-whitepaper
/work/contlo/brand-marketing
```

Purpose:

Show earlier evolution into AI/creative design.

Do not give it equal homepage prominence to Entelligence/Composio.

---

# 15. LAB

Initial entries:

1. Motion easing inspector
2. Playhead route transition
3. ASCII image resolver
4. Optical-glass control study
5. Hermes
6. Motion token playground
7. Design-token visualizer
8. Typography morph
9. Keyframe hover study
10. Tiny agent status panel

## Lab code-splitting

Every experiment must load only on:

- Lab index preview when necessary
- its own route

Do not bundle all experiments into Home.

---

# 16. HERMES

## Role

Hermes proves:

- interaction design
- AI-product thinking
- implementation
- automation range

Hermes does not define Nesar’s primary professional label.

## Architecture

```text
browser
  ↓
/api/hermes
  ↓
validation
  ↓
rate limit
  ↓
scope / safety layer
  ↓
curated public portfolio knowledge
  ↓
hosted model adapter
```

Optional later:

```text
local live Hermes online?
  yes → eligible deep queries can use live adapter
  no  → hosted mode
```

## Knowledge source

Only curated portfolio knowledge.

Never index:

- raw private notes
- Slack dumps
- confidential work files
- secret company metrics
- private colleague information

## Identity

Ask optionally:

- name
- role
- company
- reason for visiting

Email stays optional until contact/handoff.

## Analytics

Do not send raw Hermes message content to PostHog.

Track category only.

---

# 17. CONTACT

Route:

`/contact`

Fields:

- name
- email
- company optional
- reason
- message

Reason values:

```text
role
freelance
collaboration
speaking
hello
```

## Pipeline

```text
form
→ zod validation
→ Turnstile
→ rate limit
→ Neon
→ Resend
→ PostHog identify/event
→ success state
```

Development must work without external credentials.

---

# 18. ANALYTICS

## PostHog event naming

Use `snake_case`.

## Core events

```text
page_viewed
nav_item_selected

project_opened
project_section_viewed
artifact_opened
case_study_completed

motion_index_viewed
motion_piece_opened
motion_preview_started
motion_preview_completed
motion_replayed
timeline_scrubbed

lab_item_opened
experiment_interacted

theme_changed
reduced_motion_detected

contact_opened
contact_started
contact_submitted

hermes_opened
hermes_identity_submitted
hermes_prompt_submitted
hermes_suggestion_selected
hermes_answer_feedback
hermes_contact_handoff
```

## Event properties

Examples:

```text
project_slug
artifact_slug
motion_slug
section_id
source_route
interaction_type
question_category
```

Never send:

- raw message
- private email in generic event properties
- full IP into own DB

## Identity

Anonymous by default.

When a visitor voluntarily submits identifying information:

1. persist allowed lead data,
2. call PostHog identify,
3. associate future behavior,
4. let PostHog merge the anonymous journey according to integration behavior.

---

# 19. PRIVACY

Create:

`/privacy`

Explain plainly:

- analytics used
- replay if enabled
- masking
- what is collected
- when identity is connected
- what user-submitted data is stored
- deletion request method

Do not write fake legal boilerplate.

---

# 20. REVERSE PROXY

PostHog can use a first-party proxy.

Prefer the supported managed/official approach.

Do not build a homegrown proxy merely to be clever.

Do not aggressively proxy large replay traffic through Vercel without checking bandwidth implications.

Implement through an adapter/configuration layer so it can be changed.

---

# 21. DATABASE

## Leads

```text
id
created_at
name
email
company
role
reason
source
posthog_distinct_id
consent_version
```

## Contact messages

```text
id
created_at
lead_id
message
status
```

## Hermes sessions — optional

```text
id
created_at
lead_id nullable
session_token_hash
mode
```

## Hermes feedback

```text
id
created_at
session_id
message_id
rating
reason
```

Do not store the entire anonymous clickstream.

---

# 22. REPOSITORY STRUCTURE

```text
nesar-build/
├── app/
│   ├── (site)/
│   │   ├── page.tsx
│   │   ├── work/
│   │   ├── motion/
│   │   ├── lab/
│   │   ├── about/
│   │   ├── now/
│   │   ├── hermes/
│   │   ├── contact/
│   │   └── privacy/
│   │
│   ├── api/
│   │   ├── contact/
│   │   ├── hermes/
│   │   ├── hermes/status/
│   │   └── lead/
│   │
│   ├── layout.tsx
│   ├── not-found.tsx
│   ├── sitemap.ts
│   ├── robots.ts
│   └── opengraph-image.tsx
│
├── components/
│   ├── primitives/
│   ├── navigation/
│   ├── motion-system/
│   ├── work/
│   ├── motion/
│   ├── lab/
│   ├── hermes/
│   ├── forms/
│   └── analytics/
│
├── content/
│   ├── work/
│   ├── motion/
│   ├── lab/
│   ├── about/
│   ├── now/
│   └── hermes/
│
├── lib/
│   ├── content/
│   ├── analytics/
│   ├── db/
│   ├── email/
│   ├── hermes/
│   ├── rate-limit/
│   ├── seo/
│   └── env/
│
├── styles/
│   ├── tokens.css
│   ├── theme.css
│   ├── motion.css
│   └── globals.css
│
├── db/
│   ├── schema.ts
│   └── migrations/
│
├── public/
│   ├── media/
│   ├── posters/
│   ├── ascii/
│   └── icons/
│
├── tests/
├── docs/
│   ├── DESIGN_SYSTEM.md
│   ├── ARCHITECTURE.md
│   └── ANALYTICS.md
│
├── .env.example
├── next.config.ts
├── package.json
├── tsconfig.json
└── bun.lock
```

---

# 23. COMPONENT ARCHITECTURE

## Primitives

```text
PageShell
Section
Container
Stack
Cluster
Frame
Heading
Text
Meta
Button
TextLink
Chip
Media
Poster
Video
GlassControl
```

## Motion system

```text
Playhead
Keyframe
FrameCounter
Timeline
Reveal
RouteCut
OnionSkin
ScrubProgress
ReducedMotionBoundary
```

## Work

```text
WorkCard
ProjectHero
CaseStudyChapter
ArtifactFrame
ArtifactGallery
BuildNote
OutcomeBlock
NextProject
```

## Motion

```text
MotionCard
MotionReel
MotionPlayer
StoryboardStrip
StyleframeGrid
FrameMetadata
MotionNext
```

## Lab

```text
ExperimentCard
ExperimentStatus
LivePreview
Inspector
AsciiPreview
TokenViewer
```

## Hermes

```text
HermesLauncher
HermesStatus
HermesIntro
HermesComposer
HermesMessage
HermesSuggestions
HermesIdentity
HermesHandoff
```

---

# 24. MOTION IMPLEMENTATION

## Default library

Use `motion`.

## CSS first

Use pure CSS for:

- color hover
- border
- simple opacity
- button press
- focus state

## Motion library for:

- shared layout
- orchestration
- masking
- gesture-aware interactions
- route-level choreography
- view-based reveals

## GSAP only for:

- timeline-heavy scroll sequence
- complex text scene
- frame-scrubbing composition
- specialist SVG/morph sequence

If GSAP is installed, isolate it to those modules.

---

# 25. PERFORMANCE BUDGET

Creative is not an excuse for a slow portfolio.

## Client JavaScript

- server/static by default
- no global GSAP
- no Three.js in base app
- no full Hermes SDK in initial bundle
- no heavy Lab code on Home
- no unnecessary client context providers

## Video

- posters required
- preload hero media only if needed
- below-fold lazy
- pause when offscreen
- no multiple simultaneous mobile autoplay videos

## Images

- AVIF/WebP where appropriate
- preserve quality for portfolio artifacts
- use image optimization carefully for text-heavy screenshots

## Fonts

Self-host variable:

- DM Sans
- Geist Mono

Only needed subsets/weights.

---

# 26. MOBILE

Mobile is its own composition.

Required:

- no pointer-only interactions
- no fake desktop canvas
- no horizontal scroll for core content
- no giant glass overlays
- shorter transitions
- posters before video
- safe text sizes
- touch controls >= 44px

Motion-card hover behavior becomes tap/explicit play.

---

# 27. SEO

Implement:

- root metadata
- per-project metadata
- per-motion metadata
- canonical URLs
- sitemap
- robots
- OG image generation
- social cards

Case studies must contain real semantic HTML text.

Do not hide meaning inside canvas/video only.

---

# 28. ACCESSIBILITY

From the first commit:

- semantic landmarks
- skip link
- visible focus
- correct heading hierarchy
- button vs link correctness
- reduced motion
- form labels/errors
- media labels
- alt text
- keyboard accessible menus
- no color-only state

---

# 29. SECURITY

- validate API input with Zod
- rate-limit public APIs
- Turnstile on abuse-sensitive forms
- server-side secrets only
- no arbitrary Hermes tools
- no arbitrary server file retrieval
- no raw private knowledge base
- security headers
- escape/sanitize user-rendered content
- no production development bypass

---

# 30. INITIAL FILES THE AGENT MUST CREATE

Before page polish, create:

```text
styles/tokens.css
styles/theme.css
styles/motion.css

lib/content/schema.ts
lib/analytics/events.ts
lib/env/index.ts

content/work/...
content/motion/...
content/lab/...

components/primitives/...
components/motion-system/...
```

Do not build ad hoc pages first and tokenize them later.

---

# 31. BUILD ORDER

## Phase 1 — Foundation

- Next.js scaffold
- fonts
- tokens
- theme
- layout
- primitives
- MDX schema
- route skeleton
- responsive shell

## Phase 2 — Home

- hero
- motion proof
- selected work
- practice range
- process
- Lab teaser
- Hermes teaser
- Now/contact

## Phase 3 — Motion

- index
- player
- detail template
- storyboard
- frame metadata
- poster/video behavior

## Phase 4 — Work

- index
- project template
- Entelligence
- Composio
- Contlo base

## Phase 5 — Lab

- index
- 3–5 live experiments
- code split

## Phase 6 — Backend

- contact
- DB adapters
- email adapter
- rate limit
- Turnstile
- analytics

## Phase 7 — Hermes

- launcher
- route
- API
- curated KB adapter
- status
- analytics
- contact handoff

## Phase 8 — Polish

- page transitions
- reduced motion
- dark mode
- mobile
- a11y
- performance
- metadata
- OG
- 404

---

# 32. ACCEPTANCE CRITERIA

The agent is not done until:

## Build

- `bun run build` succeeds
- typecheck succeeds
- lint succeeds
- no obvious console errors

## Routes

All canonical routes return a valid page.

## Design

- one coherent design system
- light mode polished
- dark mode functional
- Playhead Blue remains scarce
- no page looks like a separate template

## Positioning

Within the first screen + first major content block, a visitor can infer:

- motion designer
- design engineer

They should not infer “developer portfolio” first.

## Motion

- hero signature motion
- reduced-motion version
- motion page previews
- route cut or equivalent
- no global performance-heavy loops

## Content

No invented:

- metrics
- quotes
- private numbers
- claims

Use `TODO_CONTENT`.

## Mobile

All major routes checked at common phone widths.

## Accessibility

Keyboard + reduced motion + form semantics function.

## Analytics

Typed event catalog exists.

If keys are present, integration works.

If keys are missing, app still builds.

## External services

Missing integrations do not block local production build unless technically impossible.

---

# 33. FAILURE-RECOVERY RULES

If a package fails:

- use the nearest maintained alternative
- do not stop to ask unless the choice changes product behavior materially

If a design detail is unclear:

- follow the canonical design principles
- prefer restraint
- document the choice

If content is missing:

- `TODO_CONTENT`
- never fabricate

If media is missing:

- use an intentional placeholder frame
- keep aspect ratio documented

If credentials are missing:

- adapter + `.env.example` + `TODO_EXTERNAL`
- continue

If deployment is blocked:

- finish build/test/docs
- report only the deployment blocker

---

# 34. DO NOT DO

Do not add:

- CMS
- auth/accounts
- newsletter
- comments
- WebGL framework in Home
- global smooth scroll
- generic testimonial section
- fake logos
- fake metrics
- skill bars
- percentage circles
- glassmorphism page shells
- giant gradient blobs
- code terminal hero
- animated cursor that blocks normal UX
- “AI-powered portfolio” marketing copy
- “full-stack builder” headline
- three equal capability cards for Design/Code/AI

---

# 35. BASE COPY SEED

## Home hero

**Label**

`MOTION DESIGNER · DESIGN ENGINEER`

**Headline**

> I make things move. Then I make them real.

**Support**

> I’m Nesar — a motion designer and design engineer shaping AI products across product, brand, web, and launch motion. I code when the idea needs to become real.

**Primary**

`View work`

**Secondary**

`Play reel`

## Work intro

> Product, web, launch systems, and the design decisions behind them.

## Motion intro

> Frames, transitions, launch films, interface motion, and the small timing decisions that make everything feel right.

## Lab intro

> Experiments where motion, interface, code, and automation overlap.

## About intro

> I started in mechanical engineering, moved through marketing into design, and eventually got tired of handing ideas off before they were real.

## Hermes teaser

> Hermes knows the public version of my work. Ask him something.

## Contact

> Have something difficult to explain, design, or make move?

---

# 36. README REQUIREMENTS

Create a project README containing:

- product intent
- stack
- local setup
- env variables
- content editing guide
- design-system location
- adding a work project
- adding a motion piece
- adding a Lab experiment
- analytics
- deployment
- external TODOs

---

# 37. AGENT FINAL REPORT FORMAT

When the autonomous build is complete, report:

## Completed

- major routes
- system pieces
- integrations
- motion features
- QA

## Decisions made

Only consequential deviations.

## TODO_CONTENT

Every missing content item.

## TODO_EXTERNAL

Every missing secret/account/deployment step.

## Verification

Exact commands run and whether they passed.

Do not ask the user to reconfirm routine implementation decisions.

---

# 38. SINGLE COPY-PASTE START COMMAND FOR THE AGENT

Use this as the first message to the coding agent:

> Read `NESAR_PORTFOLIO_DESIGN_SYSTEM_v1.md` and `NESAR_PORTFOLIO_BUILD_MASTER_v1.md` in full before modifying the repository. I authorize the complete `NESAR_BUILD_EXECUTION_ENVELOPE` defined in the build master for this portfolio repository. Execute autonomously to the acceptance criteria. Preserve the design-first positioning: motion designer first, design engineer second, code/automation as proof. Do not ask me for routine permissions or implementation choices. When content, credentials, or external access are missing, use `TODO_CONTENT` / `TODO_EXTERNAL`, implement a safe adapter or placeholder, and continue all unblocked work. Do not invent claims, metrics, quotes, or confidential material.

That is the intended one-shot handoff.
