import { createFileRoute } from "@tanstack/react-router";
import { PlatformPlaceholderPage } from "@/components/PlatformPlaceholderPage";
export const Route = createFileRoute("/add-app")({ component: () => <PlatformPlaceholderPage title="Upload an app to ChronosOS" description="A future app submission and installation workflow for ChronosOS." area="personal application upload" nextSteps={["Add app manifest validation.", "Connect private upload storage.", "Implement install and update actions."]} /> });
