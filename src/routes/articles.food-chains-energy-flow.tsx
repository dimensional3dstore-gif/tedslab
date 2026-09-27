import { createFileRoute } from "@tanstack/react-router";
import FoodChainsEnergyFlowPage from "@/components/biopedia/pages/articles/biology/food-chains-energy-flow";

export const Route = createFileRoute("/articles/food-chains-energy-flow")({
  component: FoodChainsEnergyFlowPage,
});
