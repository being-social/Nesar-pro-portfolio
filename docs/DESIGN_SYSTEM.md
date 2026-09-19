# NESAR.BUILD — DESIGN & EXPERIENCE SYSTEM
## “Motion Workbench” v1.0
**Status:** Canonical design direction  
**Primary identity:** Motion Designer + Product Designer + Design Engineer  
**Secondary proof:** Coding, automation, Hermes, AI systems  
**Theme:** Light-first, dark-supported  
**Purpose:** This file is the single visual and interaction source of truth for `nesar.build`.

---

# 0. NON-NEGOTIABLE POSITIONING

Nesar is **not** being presented as a solo founder, full-stack startup builder, generic frontend engineer, or “AI hacker.”

He is presented as:

> **A motion designer and product/design engineer who can take visual ideas all the way into working software.**

The order matters.

The site should make a visitor notice:

1. taste,
2. motion,
3. visual systems,
4. product thinking,
5. implementation quality,
6. automation / agents.

Not the reverse.

## Content-attention weighting

Use this as a hard editorial bias:

- **55% — Motion / visual communication / launch craft**
- **30% — Product design / web / systems / design engineering**
- **15% — Code / Hermes / automation / agent experiments**

A page may deviate when the project demands it, but the site as a whole must preserve this balance.

---

# 1. SOURCE SYSTEM ANALYSIS

Three reference systems were supplied. We are **not** switching between them page-by-page and we are **not** copying any one of them literally.

## 1.1 Geniestudio — structural reference

Best qualities to retain:

- enormous, confident, mid-weight display typography
- generous daylight canvas
- centered editorial compositions
- quiet interface chrome
- large breathing room
- soft surfaces
- one dense dark action against a light field
- personality carried by visual objects, not by UI decoration

What we reject:

- whimsical clay/3D-object brand language
- 32px radius on every single thing
- excessive pastel-card dependency
- generic AI-startup friendliness

## 1.2 LottieFiles — behavioral reference

Best qualities to retain:

- motion is the content, so the interface stays restrained
- animation/illustration has visual priority over cards
- display typography stays medium-weight, not heavy
- neutral canvas + clean paper surfaces
- predictable spacing discipline
- fast utility transitions and restrained interface motion
- no excessive shadows

What we reject:

- marketplace density
- generic animation-grid visual language
- teal as a copied brand color
- left-copy/right-illustration as a repeating default composition

## 1.3 Paste — restraint reference

Best qualities to retain:

- huge whitespace
- one precious accent used sparingly
- monochrome structure
- product shown as an object in a gallery
- sections separated by composition and surface, not divider spam
- native-feeling clarity

What we reject:

- Apple-product marketing mimicry
- device-mockup dependency
- pill button everywhere
- warm-gradient logo language
- system-font-only personality

---

# 2. THE NEW SYSTEM: “MOTION WORKBENCH”

The portfolio should feel like a combination of:

- an editorial motion studio,
- a clean animation timeline,
- a designer’s workbench,
- a production-ready product interface.

The interface is calm.

The **work moves**.

The signature visual language comes from motion-design concepts rather than generic developer concepts:

- frames
- timestamps
- playheads
- keyframes
- easing curves
- crop marks
- onion-skin ghosts
- timeline ticks
- render states
- scene numbers
- safe areas
- frame counters
- edit points
- loop indicators
- storyboard panels

Code and agent language appears only when it is semantically relevant.

Do **not** turn the homepage into a terminal.

---

# 3. BRAND IDEA

## Core sentence

> **Design that moves. Systems that ship.**

## Hero identity

**Headline**

> **I make things move. Then I make them real.**

**Support**

> I’m Nesar — a motion designer and design engineer shaping AI products across product, brand, web, and launch motion. I code when the idea needs to become real.

This is the default base copy for the first build.

It may be refined later, but the positioning should remain design-first.

## Short identity label

Use:

> Motion Designer · Design Engineer

Do not lead with:

- Full-stack engineer
- Founder
- Solo builder
- AI automation expert
- Prompt engineer

Hermes and automation are proof of range, not the identity headline.

---

# 4. DESIGN PRINCIPLES

## Principle 1 — Motion is the artifact

The interface should not constantly dance.

The work itself should move.

Navigation, filters, cards, and buttons stay precise and quiet so launch films, motion studies, transitions, storyboards, and interactive demos have room to feel important.

## Principle 2 — Typography can be a scene

Large text is not a heading placed above content.

Large text can be the visual composition.

Text can:

- enter on a playhead,
- crop,
- mask,
- resolve,
- shift tracking,
- split across frames,
- temporarily become ASCII/dither,
- move like a title sequence.

## Principle 3 — Show process like a motion designer

Do not represent process as:

`Research → Wireframe → Design → Done`

Represent it using:

- storyboard strips,
- frame progressions,
- version stacks,
- keyframe comparisons,
- timing passes,
- scene breakdowns,
- before/after cuts,
- still → motion → final.

## Principle 4 — Technical details are annotations

Code, framework details, event logs, and Hermes status should appear like production notes.

They should not dominate the visual hierarchy.

## Principle 5 — Empty space is active

Whitespace is part of the composition.

Do not fill every viewport with:

- cards,
- badges,
- metrics,
- blobs,
- icons,
- decorative gradients.

## Principle 6 — One visual system everywhere

Home, Work, Motion, Lab, About, Hermes, Contact, and case studies all use the same:

- typography,
- canvas,
- accent,
- spacing,
- frame language,
- motion behavior,
- glass treatment,
- metadata grammar.

Individual projects may introduce their own brand colors **inside artifact media**, but the portfolio UI around them stays Nesar’s system.

---

# 5. COLOR SYSTEM

The reference systems all use a light canvas with controlled chroma. We keep that principle but create a unique palette.

## 5.1 Light mode

```css
:root {
  --n-canvas: #F3F4F0;
  --n-paper: #FCFCFA;
  --n-paper-strong: #FFFFFF;

  --n-ink: #0B0D0E;
  --n-charcoal: #191C1F;
  --n-graphite: #565D63;
  --n-muted: #8C9399;

  --n-line: #DFE2DF;
  --n-line-soft: #E9EBE8;

  --n-playhead: #315CFF;
  --n-playhead-hover: #214AE8;
  --n-playhead-soft: #E7ECFF;
  --n-playhead-faint: #F1F4FF;

  --n-glass: rgba(255,255,255,.58);
  --n-glass-strong: rgba(255,255,255,.78);

  --n-selection: rgba(49,92,255,.16);
}
```

## 5.2 Dark mode

```css
[data-theme="dark"] {
  --n-canvas: #0D0F10;
  --n-paper: #131618;
  --n-paper-strong: #181B1E;

  --n-ink: #F5F6F2;
  --n-charcoal: #E7E9E6;
  --n-graphite: #A4ABB0;
  --n-muted: #737B82;

  --n-line: #292E32;
  --n-line-soft: #202428;

  --n-playhead: #718BFF;
  --n-playhead-hover: #8EA3FF;
  --n-playhead-soft: #1B254D;
  --n-playhead-faint: #141A2C;

  --n-glass: rgba(22,25,28,.60);
  --n-glass-strong: rgba(22,25,28,.80);

  --n-selection: rgba(113,139,255,.20);
}
```

## 5.3 Why “Playhead Blue”

There is exactly **one portfolio accent**.

It is called **Playhead Blue** because its job is interaction, time, state, and focus.

Use it for:

- active navigation state
- current scene/frame
- links
- selected filter
- timeline playhead
- keyframe focus
- input focus
- tiny progress indicators
- Hermes online indicator
- interaction affordance

Do not use it as:

- a giant page background
- a full hero gradient
- every button on the page
- random decoration
- a glow cloud

## 5.4 Project colors

Project imagery may preserve original brand colors.

Examples:

- Entelligence artifacts can keep Entelligence colors inside screenshots/video.
- Composio artifacts can keep Composio colors inside artifacts.
- Motion pieces may be fully chromatic.

The surrounding portfolio UI remains neutral + Playhead Blue.

This is important because the **work supplies color**.

---

# 6. TYPOGRAPHY

## 6.1 Font family strategy

Use only two families in the actual site foundation.

### Display + body

**DM Sans Variable**

Why:

- supplied reference system already uses it successfully at editorial sizes
- free and easy to self-host
- readable enough for body
- expressive enough for large motion-led headlines
- reduces font overhead compared with a 3-family system

Use weights:

- 400
- 500

Optional 600 only for rare tiny emphasis.

### Technical / metadata

**Geist Mono Variable**

Use only for:

- frame numbers
- timestamps
- code
- tiny production notes
- build metadata
- Hermes system states
- version labels
- timeline ticks
- command hints

Do not use mono for normal paragraph copy.

## 6.2 Type scale

Use fluid CSS with `clamp()`.

```css
--type-meta: 11px;
--type-caption: 12px;
--type-small: 14px;
--type-body: 16px;
--type-body-lg: 18px;
--type-lede: clamp(20px, 1.7vw, 26px);
--type-h3: clamp(28px, 3vw, 44px);
--type-h2: clamp(42px, 5.5vw, 78px);
--type-display: clamp(64px, 9.5vw, 148px);
--type-hero: clamp(72px, 12vw, 184px);
```

## 6.3 Tracking

```css
--track-display: -0.045em;
--track-heading: -0.035em;
--track-body: -0.012em;
--track-meta: -0.02em;
```

## 6.4 Weights

The system should feel carved, not shouted.

- Hero: 500
- Display: 500
- Headings: 500
- Body: 400
- UI: 500
- Mono metadata: 500

Avoid 700/800 display type.

## 6.5 Line length

Body content:

- ideal: 56–70 characters
- maximum case-study prose width: 760px

Do not make 1200px-wide paragraph blocks.

---

# 7. LAYOUT SYSTEM

## 7.1 Grid

Desktop:

- max canvas: 1440px
- content max: 1280px
- 12 columns
- gutter: 24px
- side padding: 40–64px

Tablet:

- 8 columns
- side padding: 28px

Mobile:

- 4 columns
- side padding: 18–20px

## 7.2 Vertical rhythm

```css
--section-xs: 56px;
--section-sm: 80px;
--section-md: 112px;
--section-lg: 152px;
--section-xl: 200px;
```

Homepage hero may use `--section-xl`.

## 7.3 Composition rules

Prefer:

- centered editorial stacks
- asymmetrical artifact layouts
- wide film-strip rows
- staggered still frames
- one large visual object with metadata around it
- full-bleed motion moments
- narrow reading columns against oversized type

Avoid repetitive:

- left text + right screenshot
- 3 equal cards
- 4 equal feature cards
- “icon / title / paragraph” grids
- SaaS comparison tables
- alternating zig-zag sections

---

# 8. SHAPE & SURFACE SYSTEM

The three supplied systems are rounded. We retain softness, but reduce “bubble UI.”

## 8.1 Radius

```css
--radius-control: 8px;
--radius-card: 16px;
--radius-panel: 24px;
--radius-film: 12px;
--radius-pill: 999px;
```

### Usage

- buttons/inputs: 8px or pill only when semantically a compact toggle/chip
- project cards: 16px
- large section panels: 24px
- video / film frames: 12px
- tags: pill

Do not use 32px on everything.

## 8.2 Borders

Most surfaces:

```css
border: 1px solid var(--n-line-soft);
```

Artifact media can be borderless.

## 8.3 Shadows

Cards should mostly use surface contrast and border.

Allowed:

```css
--shadow-float:
  0 1px 2px rgba(10,13,14,.05),
  0 12px 32px rgba(10,13,14,.05);
```

Use only for:

- floating navigation
- glass controls
- media viewer
- temporary overlays

No heavy SaaS shadows.

---

# 9. OPTICAL GLASS SYSTEM

The user explicitly wants glass, but not a glassmorphism website.

Glass is a **material token**, not a page theme.

## 9.1 Allowed glass components

- theme toggle
- playback controls
- tiny floating motion inspector
- Hermes launcher
- filter capsule
- media viewer toolbar
- cursor tooltip
- mobile floating nav control

## 9.2 Glass recipe

```css
background: var(--n-glass);
backdrop-filter: blur(16px) saturate(125%);
-webkit-backdrop-filter: blur(16px) saturate(125%);
border: 1px solid rgba(255,255,255,.48);
box-shadow:
  inset 0 1px 0 rgba(255,255,255,.55),
  0 8px 28px rgba(10,13,14,.08);
```

Dark mode should use the dark glass token.

## 9.3 Glass rules

- max 1–3 glass clusters visible in a viewport
- never wrap normal text sections in glass
- never put the entire navigation inside a huge blurred sheet
- never use neon gradient borders
- never use glass as the project-card default

---

# 10. SIGNATURE MOTION LANGUAGE

This is the most important section of the system.

## 10.1 Motion hierarchy

### A. Micro

Purpose:

- tap
- hover
- focus
- icon response

Duration:

- 100–160ms

### B. Interface

Purpose:

- menu
- filter
- card state
- layout response

Duration:

- 180–320ms

### C. Editorial

Purpose:

- heading reveal
- section entrance
- media reveal
- page transition

Duration:

- 420–620ms

### D. Narrative

Purpose:

- hero
- motion reel
- scroll-scrub sequence
- case-study chapter

Duration:

- 600–1200ms or scroll-bound

## 10.2 Motion tokens

```css
--dur-instant: 100ms;
--dur-fast: 160ms;
--dur-ui: 240ms;
--dur-layout: 320ms;
--dur-reveal: 480ms;
--dur-route: 560ms;
--dur-story: 760ms;

--ease-out: cubic-bezier(.16,1,.3,1);
--ease-standard: cubic-bezier(.22,.61,.36,1);
--ease-snap: cubic-bezier(.2,.9,.25,1);
--ease-linear: linear;
```

## 10.3 Signature effect 1 — Playhead reveal

A 1px Playhead Blue line crosses a bounded frame.

As it passes:

- text mask resolves,
- image sharpens,
- metadata activates,
- or a still becomes motion.

Use on:

- hero entrance
- section chapter introductions
- selected motion thumbnails

Do not use on every card.

## 10.4 Signature effect 2 — Onion-skin hover

On project/motion cards:

- previous frame ghosts left at 8–16px
- next frame ghosts right
- opacity 6–12%
- active frame remains crisp

This communicates “motion” without playing a video immediately.

## 10.5 Signature effect 3 — Keyframe snap

A tiny diamond or square appears at the active interaction point.

Use for:

- active nav link
- selected timeline node
- expanded case-study marker
- hover on motion metadata

Never decorate every button with it.

## 10.6 Signature effect 4 — Frame counter

Motion pages may show:

```text
F_001
00:00:02:12
24 FPS
LOOP
```

This is visual metadata, not fake engineering.

## 10.7 Signature effect 5 — Dither / ASCII resolve

Use sparingly:

- between still and motion
- in Lab
- on 404
- as one hero micro-sequence

Do not make the whole portfolio an ASCII terminal.

## 10.8 Signature effect 6 — Cut transition

Route transitions should feel like editing.

Preferred route behavior:

1. current view becomes a bounded “frame”
2. opacity drops slightly
3. next page cuts/wipes in on the playhead
4. transition completes within ~560ms

No 2-second preloader.

No fake boot terminal.

## 10.9 Signature effect 7 — Scrub line

Long motion case studies can expose a bottom or side timeline.

As the visitor moves through scenes:

- scene number updates
- playhead moves
- chapter metadata changes
- optional thumbnails highlight

This can be a real navigation device.

---

# 11. REDUCED MOTION

`prefers-reduced-motion` is a first-class mode.

When enabled:

- no scrubbing
- no parallax
- no auto-moving marquee
- no onion-skin animation
- no long route wipe
- no pointer-reactive ASCII
- no motion-dependent information

Replace with:

- opacity
- direct state changes
- still posters
- clear focus states

---

# 12. HERO EXPERIENCE

## 12.1 Composition

Do not use a standard 50/50 split.

Desktop hero:

- full-width editorial headline
- motion artifact / reel slice underneath or intersecting the baseline
- frame metadata floating near edges
- one concise subhead
- two actions max
- one tiny live system indicator if useful

### Suggested hierarchy

```text
[00:00:00:00]                     MOTION DESIGNER · DESIGN ENGINEER

I make things move.
Then I make them real.

I’m Nesar — a motion designer and design engineer shaping AI products across
product, brand, web, and launch motion. I code when the idea needs to become real.

[View work]  [Play reel]

────────────── motion frame / storyboard / reactive title sequence ──────────────
```

## 12.2 Hero interaction

Default build:

- pointer movement slightly changes title tracking or frame offset
- a playhead passes once on entrance
- the title briefly exists as rough/ASCII frame data before resolving
- no looping hero animation after resolution

## 12.3 Mobile

On mobile:

- headline 64–84px equivalent
- no cursor behavior
- one short entrance
- still/reel poster with tap-to-play
- metadata compressed to one line

---

# 13. NAVIGATION

Primary navigation:

```text
Work
Motion
Lab
About
```

Secondary:

```text
Now
Contact
```

Hermes is a site-wide launcher and a route, but **not** a primary nav label.

## Desktop nav

- text-first
- low chrome
- can become a compact floating glass strip after scrolling
- active item uses Playhead Blue + tiny keyframe marker
- no giant hamburger on desktop

## Mobile nav

- compact bottom or top overlay
- touch-first
- no hover-dependent behavior
- Hermes can be a separate floating button

---

# 14. HOME PAGE SYSTEM

## Section 1 — Hero

Purpose:

Establish motion-first designer identity.

## Section 2 — Reel / moving proof

A horizontal or full-width motion sequence.

Not a generic carousel.

Possible behavior:

- 4–6 selected clips
- tap/click to expand
- timeline labels
- quiet autoplay only when in view
- muted by default
- poster-first for performance

## Section 3 — Selected work

Exactly 3 flagship stories at launch:

1. Entelligence
2. Composio
3. one design-engineering / Hermes/Lab proof

Cards should vary in composition.

Do not make 3 identical equal cards.

## Section 4 — “Across the frame”

Show capability as real artifacts:

```text
Motion
Product
Web
Systems
```

Each one reveals a work sample.

Code/agents appear inside `Systems`, not as an equal identity pillar.

## Section 5 — How the work gets made

Storyboard-like progression:

```text
brief
direction
frames
system
motion
build
ship
```

This is more authentic than a skills list.

## Section 6 — Lab teaser

Small experimental strip.

## Section 7 — Hermes teaser

One tiny proof:

```text
HERMES / ONLINE
Ask the portfolio something →
```

Do not devote a giant hero-sized section to Hermes.

## Section 8 — Now / contact

A compact alive-and-shipping signal.

---

# 15. /MOTION — FIRST-CLASS ROUTE

This route is essential.

It should make the portfolio obviously belong to a motion designer before a recruiter reads a single resume bullet.

## Content types

- launch films
- product motion
- title cards
- transitions
- interface motion
- explainers
- frame-by-frame studies
- type animation
- storyboard experiments

## Layout

Top:

- “Motion” oversized editorial title
- short statement
- reel control

Then:

- film-strip archive
- large clip
- metadata
- next clip
- occasional process breakdown

## Motion item metadata

```text
TITLE
CLIENT / PROJECT
ROLE
YEAR
DURATION
TOOLS
FPS
TYPE
```

Do not expose fake technical metadata.

## Individual route

`/motion/[slug]`

Structure:

1. final clip
2. why it exists
3. storyboard
4. styleframes
5. timing / transitions
6. iterations
7. final frames
8. tools / implementation if relevant
9. next motion piece

---

# 16. /WORK — PRODUCT & DESIGN CASE STUDIES

Work is for deeper product/design stories.

It should not duplicate Motion.

## Work index

Show:

- project title
- company
- role
- year
- discipline
- one sharp project sentence
- representative artifact

Filters may include:

```text
All
Product
Web
Systems
Brand
```

Motion has its own route, so do not bury it here.

## Case-study chapter grammar

Use an editorial sequence:

```text
01 / Context
02 / Direction
03 / Frames
04 / System
05 / Build
06 / Outcome
07 / Reflection
```

This gives the same visual rhythm to every project without making every project look identical.

---

# 17. ENTELLIGENCE CASE STUDY

Position it as:

> **Designing the surface area of an AI engineering company.**

Primary emphasis:

- product design
- web
- motion
- brand/system
- launch visual communication

Engineering implementation appears as proof inside relevant chapters.

Sub-artifacts:

```text
/work/entelligence/website
/work/entelligence/agent-insights
/work/entelligence/leaderboard
/work/entelligence/wrapped
/work/entelligence/design-system
/work/entelligence/decks
```

### Entelligence / Agent Insights

Can also be cross-linked from `/motion`.

The Motion version focuses on:

- script/narrative
- scene direction
- styleframes
- timing
- transitions
- final film

The Work version focuses on:

- product story
- strategic purpose
- how visuals explained the product

---

# 18. COMPOSIO CASE STUDY

Position it as:

> **Design through a year of launches at an AI infrastructure company.**

Primary emphasis:

- launch design
- pitch narrative
- websites
- motion
- creative systems

Sub-artifacts:

```text
/work/composio/series-a-deck
/work/composio/swe-kit
/work/composio/mcp-launch
/work/composio/website
```

The Series A deck page must be carefully sanitized.

Never fabricate slides or confidential numbers.

---

# 19. /LAB — ENGINEERING PROOF WITHOUT REPOSITIONING THE BRAND

Lab is where code, automation, weird experiments, and Hermes can become more visible.

Initial categories:

```text
Motion Systems
ASCII
Interfaces
Hermes
Agents
Tiny Tools
Transitions
```

## Recommended experiments

- easing inspector
- keyframe editor
- ASCII image resolver
- timeline-based route transition
- glass icon material
- motion-token playground
- typography morph study
- Hermes status panel
- design-token visualizer
- component-to-motion experiment

Lab cards may expose:

```text
v0.3
WIP
BROKEN
STABLE
ARCHIVED
```

That honesty is part of the personality.

---

# 20. HERMES VISUAL ROLE

Hermes should look like a production tool attached to a motion studio.

Not like:

- ChatGPT clone
- Intercom
- green terminal window
- hacker console

## Launcher

A compact optical-glass module.

Example:

```text
◇ HERMES
online
```

## Full route

`/hermes`

Visual language:

- light paper surface
- mono metadata
- DM Sans conversational answer text
- subtle streaming playhead
- suggested prompts as chips
- no speech bubbles unless they improve readability

## Motion

Responses can reveal as a subtle horizontal scan/playhead.

Do not animate each character like a terminal unless explicitly in a special mode.

---

# 21. ASCII

ASCII is an **accent medium**.

Use it for:

- hero pre-resolution
- Lab experiments
- 404
- image transition
- motion poster alternate view
- tiny loading states

Do not use it for:

- all navigation
- every section title
- body text
- every hover

---

# 22. MEDIA RULES

## Images

- full-bleed when the artifact deserves it
- preserve original aspect ratio
- use crop marks / frame label rather than card chrome
- allow artifact color to dominate

## Video

Every video gets:

- poster
- title
- duration
- accessible controls
- lazy loading
- visibility-based pause
- no sound autoplay

## Motion thumbnails

On hover:

- play 1.5–3 sec preview
- or onion-skin preview

On mobile:

- tap to preview
- never auto-play a grid of 10 videos

---

# 23. ICONOGRAPHY

Primary icon language:

- simple 1.5px stroke
- geometric
- low-detail
- no emoji UI icons
- no giant 3D icon library

Glass icons are allowed for:

- play
- pause
- theme
- expand
- Hermes
- frame view
- code view

---

# 24. CURSOR

Desktop-only optional enhancement.

The cursor should not become a giant blob.

Allowed:

- tiny dot + contextual label
- frame number
- `PLAY`
- `OPEN`
- `SCRUB`

Disable for:

- touch
- reduced motion
- low-power preference if detectable

---

# 25. SECTION LABEL SYSTEM

Use mono labels:

```text
01 / SELECTED WORK
02 / MOTION
03 / PROCESS
04 / LAB
```

Case studies:

```text
SCENE_01
SCENE_02
```

Motion:

```text
F_001
F_002
```

Use sparingly.

The site should not feel like a fake film-production dashboard.

---

# 26. COMPONENT LANGUAGE

## Primitive components

```text
PageShell
Section
Container
Stack
Cluster
Frame
FrameLabel
Timeline
Playhead
Keyframe
Heading
Body
Meta
Button
TextLink
Media
Video
Poster
GlassControl
Chip
```

## Portfolio components

```text
WorkCard
MotionCard
MotionReel
StoryboardStrip
StyleframeGrid
BeforeAfter
ProcessSequence
ProjectHero
CaseStudyChapter
ArtifactFrame
BuildNote
OutcomeBlock
NextProject
```

## Lab components

```text
ExperimentCard
ExperimentStatus
LivePreview
Inspector
TokenViewer
AsciiPreview
```

---

# 27. BUTTONS

## Primary

Default:

- charcoal fill
- paper text
- 8px radius
- 44px min height

Use Playhead Blue only for:

- focused/active
- special “Play reel” control
- timeline action
- selected state

This keeps the blue precious.

## Secondary

- transparent
- 1px line
- ink text

## Text action

- no container
- underline appears on hover/focus
- optional tiny arrow/keyframe

Do not make every action a pill.

---

# 28. DARK MODE

Dark mode is designed, not inverted.

## Dark mode character

Think:

- editing room
- not cyberpunk
- not neon
- not glowing terminal

Artifact colors remain true.

Blue accent shifts lighter.

Glass becomes slightly denser.

Shadows reduce.

Borders become more important.

---

# 29. ACCESSIBILITY

Required:

- AA contrast minimum
- keyboard navigation
- visible focus
- skip link
- reduced motion
- controls with text/aria labels
- captions/transcripts for important motion work when practical
- no interaction available only on hover
- no tiny gray text below readable threshold

---

# 30. DESIGN QA CHECKLIST

Before any page is accepted:

- Does it look like the same portfolio as every other route?
- Is motion or visual craft more prominent than code?
- Does the work provide most of the color?
- Is Playhead Blue still scarce?
- Is there enough empty space?
- Did we avoid a generic SaaS card grid?
- Is the composition interesting without relying on gradients?
- Are motion-design concepts real, not fake decoration?
- Does the page work in reduced motion?
- Does it work on mobile without pointer interactions?
- Is there any unnecessary glass?
- Is there any unnecessary 3D?
- Are there too many pills?
- Are there too many mono labels?
- Is the hierarchy still obvious with all motion disabled?

---

# 31. TOKEN STARTER — CSS

```css
:root {
  color-scheme: light;

  --n-canvas: #F3F4F0;
  --n-paper: #FCFCFA;
  --n-paper-strong: #FFFFFF;

  --n-ink: #0B0D0E;
  --n-charcoal: #191C1F;
  --n-graphite: #565D63;
  --n-muted: #8C9399;

  --n-line: #DFE2DF;
  --n-line-soft: #E9EBE8;

  --n-playhead: #315CFF;
  --n-playhead-hover: #214AE8;
  --n-playhead-soft: #E7ECFF;
  --n-playhead-faint: #F1F4FF;

  --n-glass: rgba(255,255,255,.58);
  --n-glass-strong: rgba(255,255,255,.78);

  --n-font-sans: "DM Sans", ui-sans-serif, system-ui, sans-serif;
  --n-font-mono: "Geist Mono", ui-monospace, "SFMono-Regular", monospace;

  --n-radius-control: 8px;
  --n-radius-film: 12px;
  --n-radius-card: 16px;
  --n-radius-panel: 24px;
  --n-radius-pill: 999px;

  --n-section-xs: 56px;
  --n-section-sm: 80px;
  --n-section-md: 112px;
  --n-section-lg: 152px;
  --n-section-xl: 200px;

  --n-dur-instant: 100ms;
  --n-dur-fast: 160ms;
  --n-dur-ui: 240ms;
  --n-dur-layout: 320ms;
  --n-dur-reveal: 480ms;
  --n-dur-route: 560ms;
  --n-dur-story: 760ms;

  --n-ease-out: cubic-bezier(.16,1,.3,1);
  --n-ease-standard: cubic-bezier(.22,.61,.36,1);
  --n-ease-snap: cubic-bezier(.2,.9,.25,1);

  --n-shadow-float:
    0 1px 2px rgba(10,13,14,.05),
    0 12px 32px rgba(10,13,14,.05);
}

[data-theme="dark"] {
  color-scheme: dark;

  --n-canvas: #0D0F10;
  --n-paper: #131618;
  --n-paper-strong: #181B1E;

  --n-ink: #F5F6F2;
  --n-charcoal: #E7E9E6;
  --n-graphite: #A4ABB0;
  --n-muted: #737B82;

  --n-line: #292E32;
  --n-line-soft: #202428;

  --n-playhead: #718BFF;
  --n-playhead-hover: #8EA3FF;
  --n-playhead-soft: #1B254D;
  --n-playhead-faint: #141A2C;

  --n-glass: rgba(22,25,28,.60);
  --n-glass-strong: rgba(22,25,28,.80);
}
```

---

# 32. TAILWIND V4 STARTER

```css
@theme {
  --color-canvas: #F3F4F0;
  --color-paper: #FCFCFA;
  --color-paper-strong: #FFFFFF;

  --color-ink: #0B0D0E;
  --color-charcoal: #191C1F;
  --color-graphite: #565D63;
  --color-muted: #8C9399;

  --color-line: #DFE2DF;
  --color-line-soft: #E9EBE8;

  --color-playhead: #315CFF;
  --color-playhead-hover: #214AE8;
  --color-playhead-soft: #E7ECFF;
  --color-playhead-faint: #F1F4FF;

  --font-sans: "DM Sans", ui-sans-serif, system-ui, sans-serif;
  --font-mono: "Geist Mono", ui-monospace, "SFMono-Regular", monospace;

  --radius-control: 8px;
  --radius-film: 12px;
  --radius-card: 16px;
  --radius-panel: 24px;
}
```

Dark mode semantic values should be defined through CSS custom properties rather than duplicating every Tailwind primitive.

---

# 33. IMPLEMENTATION RULES FOR THE AGENT

The coding agent must:

1. treat this file as canonical for visual decisions;
2. create semantic tokens before building pages;
3. never import the supplied reference tokens directly;
4. never copy reference brand colors/logos/layouts;
5. never create page-specific design systems;
6. never invent a third accent;
7. never add gradients except inside project artifacts that already use them;
8. never add a glass surface without one of the approved glass use cases;
9. never add a motion effect without a reduced-motion fallback;
10. never make code/agents visually outweigh motion/design.

---

# 34. FINAL ART-DIRECTION TEST

If the site is shown to someone with all company names removed, it should still feel like:

> **a motion designer’s portfolio that happens to be extremely well engineered.**

It should **not** feel like:

> an engineer’s portfolio with a few nice animations.

That distinction is the entire point of this system.
