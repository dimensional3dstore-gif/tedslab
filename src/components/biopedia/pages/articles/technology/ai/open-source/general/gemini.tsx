import { LegacyArticlePage } from "@/components/biopedia/pages/articles/LegacyArticlePage";

export default function GeminiModelsArticle() {
  return (
    <LegacyArticlePage
      title="Gemini Models"
      subject="AI systems"
      summary="Gemini is Google's family of multimodal AI models, products, and developer interfaces."
      sections={[
        {
          heading: "Multimodal workflows",
          body: "Depending on the release, Gemini interfaces can work across text, images, audio, and other inputs. Confirm each model's actual modalities, context limits, regional availability, and data terms in current documentation.",
        },
      ]}
    />
  );
}
