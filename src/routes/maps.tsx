import { createFileRoute } from "@tanstack/react-router";
import { PlatformPlaceholderPage } from "@/components/PlatformPlaceholderPage";
export const Route = createFileRoute("/maps")({ component: () => <PlatformPlaceholderPage title="Maplication" description="A map workspace for geographic and biological exploration." area="Maplication" nextSteps={["Connect map data sources.", "Add layers and search.", "Add export and saved-map actions."]} /> });
