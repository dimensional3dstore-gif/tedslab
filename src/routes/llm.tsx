import { createFileRoute } from "@tanstack/react-router";
import { NexiumAIPage } from "@/llm/components/import-local/page";

export const Route = createFileRoute("/llm")({
  head: () => ({
    meta: [{ title: "Nexium — Ted's Lab" }],
  }),
  component: NexiumAIPage,
});
