import { createFileRoute } from "@tanstack/react-router";
import { PlatformPlaceholderPage } from "@/components/PlatformPlaceholderPage";
export const Route = createFileRoute("/network")({ component: () => <PlatformPlaceholderPage title="Networker" description="A planned network and connection workspace for Ted's Lab." area="Networker" nextSteps={["Define network entities.", "Connect communication and discovery.", "Add permissions and presence."]} /> });
