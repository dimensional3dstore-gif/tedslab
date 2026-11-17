import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/biopedia/AppShell";
import { QuantumPediaHome } from "@/components/quantumpedia/QuantumPediaHome";
import { QuantumPediaShell, type QPSection } from "@/components/quantumpedia/QuantumPediaShell";

export const Route = createFileRoute("/quantumpedia")({
  component: QuantumPediaPage,
  head: () => ({ meta: [{ title: "QuantumPedia — Ted's Lab" }, { name: "description", content: "QuantumPedia knowledge tool for quantum concepts, equations, laboratory simulations and research." }] }),
});

function QuantumPediaPage() {
  const [section, setSection] = useState<QPSection>("overview");
  return <AppShell><QuantumPediaShell section={section} onSectionChange={setSection}><QuantumPediaHome section={section} onSectionChange={setSection} /></QuantumPediaShell></AppShell>;
}
