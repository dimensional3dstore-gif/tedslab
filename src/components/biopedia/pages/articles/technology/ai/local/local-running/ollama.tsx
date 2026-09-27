import { LegacyArticlePage } from "@/components/biopedia/pages/articles/LegacyArticlePage";

export default function OllamaArticle() {
  return (
    <LegacyArticlePage
      title="Ollama"
      subject="Local AI"
      summary="Ollama simplifies downloading and running compatible language models through a local service and command-line interface."
      sections={[
        {
          heading: "Local service boundaries",
          body: "A local endpoint may be reachable by other software on the machine or network depending on configuration. Review bind addresses, model licenses, resource limits, and update practices.",
        },
      ]}
    />
  );
}
