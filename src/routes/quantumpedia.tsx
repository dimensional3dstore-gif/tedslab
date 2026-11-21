import { createFileRoute } from "@tanstack/react-router";
import Base44Quantumpaedia from "@/apps/quantumpaedia/App";
import "@/apps/quantumpaedia/styles.css";

export const Route = createFileRoute("/quantumpedia")({
  component: QuantumPediaPage,
  head: () => ({
    meta: [
      { title: "Quantumpaedia — Ted's Lab" },
      { name: "description", content: "The full Quantumpaedia research and learning environment inside Ted's Lab." },
    ],
  }),
});

function QuantumPediaPage() {
  return (
    <div className="quantumpaedia-root min-h-screen">
      <Base44Quantumpaedia />
    </div>
  );
}
