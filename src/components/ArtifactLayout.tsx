import Link from "next/link";
import React from "react";

interface ArtifactLayoutProps {
  backHref: string;
  backLabel: string;
  category: string;
  tag: string;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

export function ArtifactLayout({
  backHref,
  backLabel,
  category,
  tag,
  title,
  subtitle,
  children,
}: ArtifactLayoutProps) {
  return (
    <div className="space-y-12 py-8 max-w-4xl mx-auto">
      <Link href={backHref} className="text-xs font-mono text-[var(--n-ink)] hover:underline">
        {backLabel}
      </Link>

      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs font-mono text-[var(--n-muted)]">
          <span className="text-[var(--n-ink)] font-semibold">{category}</span>
          <span>{tag}</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-medium tracking-tight text-[var(--n-ink)]">
          {title}
        </h1>
        <p className="text-lg text-[var(--n-graphite)] font-serif italic">
          {subtitle}
        </p>
      </div>

      {children}
    </div>
  );
}

export function FeatureBulletList({ items }: { items: { label: string; text: string }[] }) {
  return (
    <ul className="list-disc list-inside space-y-2 font-mono text-xs text-[var(--n-graphite)]">
      {items.map((item) => (
        <li key={item.label}>
          <strong>{item.label}:</strong> {item.text}
        </li>
      ))}
    </ul>
  );
}
