import { ArtifactLayout, FeatureBulletList } from "@/components/ArtifactLayout";

export default function LeaderboardArtifact() {
  const features = [
    { label: "Data Hierarchy", text: "Clean row-based grid layout with subtle status pills and real-time rank updates." },
    { label: "Brand Crossover", text: "Designed to fit both inside the web application and as shareable social graphics for viral team acquisition." },
  ];

  return (
    <ArtifactLayout
      backHref="/work/entelligence"
      backLabel="← Back to Entelligence AI Case Study"
      category="ENTELLIGENCE AI // ARTIFACT"
      tag="PUBLIC BRAND & METRICS"
      title="The Engineering Leaderboard"
      subtitle="Turning developer productivity metrics and PR review speed into an engaging public leaderboard visual system."
    >
      <div className="p-8 rounded-[var(--n-radius-panel)] border border-[var(--n-line)] bg-[var(--n-paper)] space-y-6 shadow-xs font-mono text-xs">
        <div className="space-y-4 text-sm text-[var(--n-graphite)] font-sans leading-relaxed">
          <p>
            The Entelligence Leaderboard highlights top engineering teams, code review response times, and quality scores across public & private repositories.
          </p>
          <h3 className="text-base font-bold text-[var(--n-ink)] font-mono pt-2">Design Engineering Logic:</h3>
          <FeatureBulletList items={features} />
        </div>
      </div>
    </ArtifactLayout>
  );
}
