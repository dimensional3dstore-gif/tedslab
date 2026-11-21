import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/apps/quantumpaedia")({
  component: QuantumpaediaAppAlias,
  head: () => ({
    meta: [
      { title: "Quantumpaedia — Ted's Lab" },
      { name: "description", content: "Quantumpaedia inside Ted's Lab." },
    ],
  }),
});

function QuantumpaediaAppAlias() {
  return <Navigate to="/quantumpedia" />;
}
