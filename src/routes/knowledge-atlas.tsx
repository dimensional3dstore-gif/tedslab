import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/biopedia/AppShell";
import { AtlasApp } from "@/components/atlas/AtlasApp";
import { AiAssistPanel } from "@/components/atlas/AiAssist";

export const Route = createFileRoute("/knowledge-atlas")({
  component: KnowledgeAtlasPage,
  head: () => ({
    meta: [
      { title: "Knowledge Atlas — Ted's Lab" },
      {
        name: "description",
        content:
          "Interactive knowledge graph exploring philosophy, physics, biology, mathematics, and more — integrated with BioPedia.",
      },
    ],
  }),
});

function KnowledgeAtlasPage() {
  return (
    <AppShell rail={<AiAssistPanel />}>
      <div className="bio-panel overflow-hidden p-0" style={{ minHeight: "calc(100vh - 10rem)" }}>
        <div className="atlas-theme h-[min(80vh,900px)] min-h-[520px] w-full">
          <AtlasApp />
        </div>
      </div>
    </AppShell>
  );
}
