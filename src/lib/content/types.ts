export type Media = {
  url: string;
  alt: string;
  width?: number;
  height?: number;
  poster?: string;
  aspectRatio?: string;
};

export type Project = {
  slug: string;
  company: string;
  title: string;
  thesis: string;
  summary: string;
  year: string;
  role: string[];
  disciplines: string[];
  featured: boolean;
  order: number;
  cover: Media;
  accent?: string;
  publicUrl?: string;
  status: "published" | "draft";
};

export type Artifact = {
  slug: string;
  project: string;
  title: string;
  summary: string;
  type: "website" | "motion" | "deck" | "system" | "product" | "brand";
  year: string;
  cover: Media;
  status: "published" | "draft" | "wip";
};

export type MotionPiece = {
  slug: string;
  title: string;
  project?: string;
  client?: string;
  year: string;
  duration?: string;
  fps?: number;
  role: string[];
  tools?: string[];
  summary: string;
  poster: Media;
  video?: Media;
  featured: boolean;
  order: number;
  status: "published" | "draft" | "wip";
};

export type Experiment = {
  slug: string;
  title: string;
  summary: string;
  category:
    | "motion-system"
    | "ascii"
    | "interface"
    | "hermes"
    | "agent"
    | "tiny-tool"
    | "transition";
  version: string;
  status: "stable" | "wip" | "broken" | "archived";
  interactive: boolean;
  order: number;
};

export type NowEntry = {
  updatedAt: string;
  building: string[];
  learning: string[];
  exploring: string[];
};
