import { createFileRoute } from "@tanstack/react-router";
import { DocsEditor } from "@/components/docs/DocsEditor";

export const Route = createFileRoute("/docs")({
  head: () => ({ meta: [{ title: "Docs — Ted's Lab" }] }),
  component: DocsEditor,
});
