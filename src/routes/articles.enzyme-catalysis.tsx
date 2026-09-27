import { createFileRoute } from "@tanstack/react-router";
import EnzymeCatalysisPage from "@/components/biopedia/pages/articles/biology/enzyme-catalysis";

export const Route = createFileRoute("/articles/enzyme-catalysis")({
  component: EnzymeCatalysisPage,
});
