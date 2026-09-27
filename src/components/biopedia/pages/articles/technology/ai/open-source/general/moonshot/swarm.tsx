import { LegacyArticlePage } from "@/components/biopedia/pages/articles/LegacyArticlePage";

export default function MoonshotSwarmArticle() {
  return (
    <LegacyArticlePage
      title="Multi-agent Swarm Workflows"
      subject="AI systems"
      summary="A model swarm divides a larger task among specialized agents and coordinates their outputs through shared state, delegation, or review."
      sections={[
        {
          heading: "Coordination is the hard part",
          body: "Parallel agents can broaden coverage, but duplicate work, conflicting assumptions, and error propagation require explicit task boundaries, provenance, and a verification step before results are combined.",
        },
      ]}
    />
  );
}
