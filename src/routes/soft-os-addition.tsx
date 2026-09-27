import { createFileRoute } from "@tanstack/react-router";
import { PlatformPlaceholderPage } from "@/components/PlatformPlaceholderPage";
export const Route = createFileRoute("/soft-os-addition")({ component: () => <PlatformPlaceholderPage title="Add software to the OS" description="Define how software will be registered with ChronosOS." area="OS software registration" nextSteps={["Define OS package metadata.", "Connect installation permissions.", "Add compatibility and health checks."]} /> });
