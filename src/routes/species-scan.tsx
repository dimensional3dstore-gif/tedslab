import { createFileRoute } from "@tanstack/react-router";
import { PlatformPlaceholderPage } from "@/components/PlatformPlaceholderPage";
export const Route = createFileRoute("/species-scan")({ component: () => <PlatformPlaceholderPage title="Species Scan" description="A planned identification workspace for species and field observations." area="Species Scan" nextSteps={["Connect camera and image input.", "Add identification service.", "Store observations and confidence data."]} /> });
