import { createFileRoute } from "@tanstack/react-router";
import Base44Quantumpaedia from "@/apps/quantumpaedia/App";

export const Route = createFileRoute("/quantumpedia")({
  component: QuantumPediaPage,
  head: () => ({
    meta: [
      { title: "Quantumpaedia — Ted's Lab" },
      { name: "description", content: "Quantumpaedia inside Ted's Lab." },
    ],
  }),
});

function QuantumPediaPage() {
  return <div className="min-h-screen"><Base44Quantumpaedia /></div>;
}
