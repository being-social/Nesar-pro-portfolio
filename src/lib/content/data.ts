import { Project, MotionPiece, Experiment, NowEntry } from "./types";

export const PROJECTS: Project[] = [
  {
    slug: "entelligence",
    company: "Entelligence AI",
    title: "Designing the Surface Area of an AI Engineering Company",
    thesis:
      "One designer, one year, a whole company's surface area — product UX, brand, live site in code, launch videos, Wrapped, engineering Leaderboard & investor decks.",
    summary:
      "Entelligence AI is a production reliability engine for dev teams. As founding designer and sole designer for the first year+, I owned the entire visual & product experience end-to-end.",
    year: "2025–Present",
    role: ["Founding Designer", "Design Engineer"],
    disciplines: ["AI Product Design", "Motion Design", "Design Systems", "Web Engineering", "Investor Decks"],
    featured: true,
    order: 1,
    cover: {
      url: "/media/entelligence-hero.webp",
      alt: "Entelligence AI Code Review Platform",
    },
    publicUrl: "https://entelligence.ai",
    status: "published",
  },
  {
    slug: "composio",
    company: "Composio",
    title: "Design Through a Year of Launches at an AI Infrastructure Company",
    thesis:
      "Built the pitch deck behind Composio's $25M Series A (led by Lightspeed), plus SWE-Kit & MCP launch sites, launch videos, and brand system.",
    summary:
      "As sole designer at Composio, I designed the public-facing launch experience, developer sites, launch films, and the investor deck behind their $25M raise.",
    year: "2024–2025",
    role: ["Designer"],
    disciplines: ["$25M Series A Pitch Deck", "Launch Motion", "Web Redesign", "Brand Systems"],
    featured: true,
    order: 2,
    cover: {
      url: "/media/composio-hero.webp",
      alt: "Composio $25M Series A Pitch Deck & Launch",
    },
    status: "published",
  },
  {
    slug: "contlo",
    company: "Contlo (now SuperAGI Marketing)",
    title: "Early Stage Brand & Whitepaper Design",
    thesis:
      "Creative and brand design across the SuperAGI ecosystem (Contlo, Verk) — whitepapers, blog design, and early brand assets.",
    summary:
      "Creative and marketing design for Contlo and the SuperAGI ecosystem in Bengaluru prior to their US transition.",
    year: "2024",
    role: ["Creative / Marketing Design"],
    disciplines: ["Whitepaper Design", "Brand Design", "Editorial"],
    featured: false,
    order: 3,
    cover: {
      url: "/media/contlo-hero.webp",
      alt: "SuperAGI Whitepaper Design",
    },
    status: "published",
  },
];

export const MOTION_PIECES: MotionPiece[] = [
  {
    slug: "entelligence-agent-insights",
    title: "Entelligence Agent Insights Launch Film",
    project: "Entelligence AI",
    client: "Entelligence AI",
    year: "2025",
    duration: "00:01:14:00",
    fps: 60,
    role: ["Director", "Motion Designer", "3D/2D Compositor"],
    tools: ["After Effects", "Figma", "Premiere Pro"],
    summary:
      "Launch film demonstrating AI-driven code review reading full codebase history and healing production bugs.",
    poster: {
      url: "/media/motion/agent-insights-poster.webp",
      alt: "Entelligence Agent Insights Motion Reel",
    },
    featured: true,
    order: 1,
    status: "published",
  },
  {
    slug: "composio-mcp-launch",
    title: "Composio Model Context Protocol (MCP) Launch Motion",
    project: "Composio",
    client: "Composio",
    year: "2025",
    duration: "00:00:48:12",
    fps: 60,
    role: ["Motion Designer", "Sound Design"],
    tools: ["After Effects", "Figma"],
    summary:
      "Kinetic typography and interface animation introducing Composio's MCP integration for agentic AI.",
    poster: {
      url: "/media/motion/mcp-launch-poster.webp",
      alt: "Composio MCP Launch Motion",
    },
    featured: true,
    order: 2,
    status: "published",
  },
  {
    slug: "entelligence-wrapped-2025",
    title: "Entelligence Engineering Wrapped Motion Sequence",
    project: "Entelligence AI",
    client: "Entelligence AI",
    year: "2025",
    duration: "00:00:52:00",
    fps: 60,
    role: ["Art Director", "Motion Designer"],
    tools: ["After Effects", "Rive", "TypeScript"],
    summary:
      "Turning engineering data, PR review speed, and incident metrics into kinetic, shareable motion visuals.",
    poster: {
      url: "/media/motion/wrapped-poster.webp",
      alt: "Entelligence Wrapped Motion Sequence",
    },
    featured: true,
    order: 3,
    status: "published",
  },
];

export const EXPERIMENTS: Experiment[] = [
  {
    slug: "motion-easing-inspector",
    title: "Global Motion Easing Inspector",
    summary:
      "Interactive visual curve inspector for Nesar's canonical easing tokens: cubic-bezier(.16,1,.3,1).",
    category: "motion-system",
    version: "v1.0",
    status: "stable",
    interactive: true,
    order: 1,
  },
  {
    slug: "playhead-route-transition",
    title: "Playhead 1px Wipe Transition Engine",
    summary:
      "Route transition wiping across the viewport with playhead line mask and Geist Mono timestamps.",
    category: "transition",
    version: "v1.0",
    status: "stable",
    interactive: true,
    order: 2,
  },
  {
    slug: "ascii-image-resolver",
    title: "Onion-Skin ASCII Image Resolver",
    summary:
      "Converts still frames to ASCII grid matrix before resolving to crisp motion visual on hover.",
    category: "ascii",
    version: "v0.9",
    status: "wip",
    interactive: true,
    order: 3,
  },
  {
    slug: "hermes-status-panel",
    title: "Hermes Agent Local/Cloud Status Detector",
    summary:
      "Real-time status bridge showing local agent process heartbeat vs cloud fallback mode.",
    category: "hermes",
    version: "v1.0",
    status: "stable",
    interactive: true,
    order: 4,
  },
];

export const NOW_DATA: NowEntry = {
  updatedAt: "September 2026",
  building: [
    "Wrapping up Series A investor & design surfaces at Entelligence AI",
    "Shipping nesar.build v1.0 Motion Workbench design engineering portfolio",
    "Building Kimi Code CLI & autonomous agent workflows for code review",
  ],
  learning: [
    "GSAP 3.15 timeline scrubbing for multi-scene launch films",
    "Advanced WebGL shader passes for dither/ASCII image transitions",
  ],
  exploring: [
    "Frame-by-frame interface animation in Rive & Motion",
    "Localized WhatsApp agent automation with Baileys & Supabase",
  ],
};
