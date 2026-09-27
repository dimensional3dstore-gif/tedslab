import { LegacyArticlePage } from "@/components/biopedia/pages/articles/LegacyArticlePage";

export default function GlmCodingArticle() {
  return (
    <LegacyArticlePage
      title="GLM Coding Models"
      subject="Open coding models"
      summary="GLM coding models are a family of code-capable language models from Zhipu AI, with open-weight availability varying by release."
      sections={[
        {
          heading: "Assessing code models",
          body: "Test code generation, repository understanding, and tool-use behavior in a sandbox. Verify the checkpoint, model card, license, and hardware requirements for the specific release.",
        },
      ]}
    />
  );
}
