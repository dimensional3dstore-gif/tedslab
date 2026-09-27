import { LegacyArticlePage } from "@/components/biopedia/pages/articles/LegacyArticlePage";

export default function QwenCodeArticle() {
  return (
    <LegacyArticlePage
      title="Qwen Coding Models"
      subject="Open coding models"
      summary="Qwen includes language and code-focused model releases from Alibaba Cloud, with model weights and terms that differ across variants."
      sections={[
        {
          heading: "Selecting a variant",
          body: "Read the model card for context limits, supported languages, benchmarks, and license. Evaluate generated changes in a sandbox and require tests or review for consequential code.",
        },
      ]}
    />
  );
}
