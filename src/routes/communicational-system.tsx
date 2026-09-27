import { createFileRoute } from "@tanstack/react-router";
import { PlatformPlaceholderPage } from "@/components/PlatformPlaceholderPage";
export const Route = createFileRoute("/communicational-system")({ component: () => <PlatformPlaceholderPage title="Contacts and communication" description="A planned communication workspace for people, teams, and conversations." area="communication system" nextSteps={["Connect contacts and conversations.", "Add notification preferences.", "Add secure messaging workflows."]} /> });
