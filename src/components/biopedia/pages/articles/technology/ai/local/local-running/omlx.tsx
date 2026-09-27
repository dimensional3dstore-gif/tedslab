import { LegacyArticlePage } from "@/components/biopedia/pages/articles/LegacyArticlePage";

export default function OmlxArticle() {
  return (
    <LegacyArticlePage
      title="Ollama and MLX on Apple Silicon"
      subject="Local AI"
      summary="MLX is Apple's array framework for Apple silicon; tools in the MLX ecosystem can run compatible models using unified memory and hardware acceleration."
      sections={[
        {
          heading: "Compatibility matters",
          body: "Install model runners from their current official sources and confirm supported macOS, chip, and model formats. Memory use, quantization, and context length determine which workloads fit on a device.",
        },
      ]}
    />
  );
}
