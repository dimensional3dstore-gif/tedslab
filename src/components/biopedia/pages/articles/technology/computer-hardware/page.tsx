import { LegacyArticlePage } from "@/components/biopedia/pages/articles/LegacyArticlePage";

export default function ComputerHardwarePage() {
  return (
    <LegacyArticlePage
      title="Computer Hardware"
      subject="Computing"
      summary="Computer hardware is the physical machinery that executes instructions, stores information, and connects a computer to people and networks."
      sections={[
        {
          heading: "From components to systems",
          body: "Processors, memory, storage, graphics hardware, buses, and power systems interact through defined interfaces. Performance depends on the workload and on bottlenecks across the whole system, not one specification alone.",
        },
      ]}
    />
  );
}
