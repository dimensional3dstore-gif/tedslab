import { LegacyArticlePage } from "@/components/biopedia/pages/articles/LegacyArticlePage";

export default function MoonshotK2Article() {
  return (
    <LegacyArticlePage
      title="Kimi K2"
      subject="AI model study"
      summary="Kimi K2 is a Moonshot AI model family discussed for large-scale language reasoning and tool-oriented workflows; capabilities depend on the exact release and serving configuration."
      sections={[
        {
          heading: "Evaluating the model",
          body: "Compare documented context limits, tool use, latency, and benchmark methods against the task at hand. Model names and capabilities can change between releases, so verify current provider documentation before deployment.",
        },
      ]}
    />
  );
}
