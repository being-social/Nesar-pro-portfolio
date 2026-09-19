import Link from "next/link";

export default function ArtifactPage({ params }: { params: { [key: string]: string } }) {
  // Simplified for v1 - would use params to determine the specific artifact
  return (
    <div className="space-y-6 py-12 max-w-2xl mx-auto">
      <Link href="/work" className="text-xs font-mono text-[var(--n-playhead)] hover:underline">
        ← Back to Work
      </Link>
      <div className="p-8 rounded-[var(--n-radius-panel)] border border-[var(--n-line)] bg-[var(--n-paper)] space-y-4">
        <h1 className="text-2xl font-bold italic font-serif">Artifact placeholder</h1>
        <p className="text-sm text-[var(--n-graphite)] font-mono">
          Content for this artifact is currently in development.
        </p>
      </div>
    </div>
  );
}
