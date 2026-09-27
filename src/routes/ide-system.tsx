import { createFileRoute } from "@tanstack/react-router";
import { PlatformPlaceholderPage } from "@/components/PlatformPlaceholderPage";
export const Route = createFileRoute("/ide-system")({ component: () => <PlatformPlaceholderPage title="Create Ted's Lab software system" description="A starting point for composing the future Ted's Lab software environment." area="software system creation" nextSteps={["Define system manifests.", "Connect build and packaging jobs.", "Add runtime provisioning."]} /> });
