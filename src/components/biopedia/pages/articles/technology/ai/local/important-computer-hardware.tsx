import { LegacyArticlePage } from "@/components/biopedia/pages/articles/LegacyArticlePage";

export default function LocalAiHardwareArticle() {
  return (
    <LegacyArticlePage
      title="Hardware for Local AI"
      subject="Computing"
      summary="Local model workloads are shaped by compute throughput, memory capacity and bandwidth, storage, cooling, and the software stack."
      sections={[
        {
          heading: "Plan around the workload",
          body: "Parameter count and context length affect memory use, while quantization trades precision for a smaller footprint. Benchmark the exact model and task on the target hardware before buying components.",
        },
      ]}
    />
  );
}
