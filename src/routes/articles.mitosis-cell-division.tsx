import { createFileRoute } from "@tanstack/react-router";
import MitosisCellDivisionPage from "@/components/biopedia/pages/articles/biology/mitosis-cell-division";

export const Route = createFileRoute("/articles/mitosis-cell-division")({
  component: MitosisCellDivisionPage,
});
