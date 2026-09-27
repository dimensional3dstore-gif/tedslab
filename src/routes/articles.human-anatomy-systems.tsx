import { createFileRoute } from "@tanstack/react-router";
import HumanAnatomySystemsPage from "@/components/biopedia/pages/articles/biology/human-anatomy-systems";

export const Route = createFileRoute("/articles/human-anatomy-systems")({
  component: HumanAnatomySystemsPage,
});
