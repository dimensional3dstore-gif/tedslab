import { createFileRoute } from "@tanstack/react-router";
import { PlatformPlaceholderPage } from "@/components/PlatformPlaceholderPage";
export const Route = createFileRoute("/update-soft")({ component: () => <PlatformPlaceholderPage title="Update software" description="Manage software releases and update channels when the platform services are connected." area="software updates" nextSteps={["Add release manifests.", "Connect update checks.", "Implement signed package delivery."]} /> });
