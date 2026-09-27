import { LegacyArticlePage } from "@/components/biopedia/pages/articles/LegacyArticlePage";

export default function LmStudioArticle() {
  return (
    <LegacyArticlePage
      title="LM Studio"
      subject="Local AI"
      summary="LM Studio provides a desktop workflow for discovering, downloading, and running supported language models locally."
      sections={[
        {
          heading: "Local inference",
          body: "Performance depends on model size, quantization, memory, and hardware acceleration. Review the source and license of each model and avoid assuming local execution automatically makes every data flow private.",
        },
      ]}
    />
  );
}
