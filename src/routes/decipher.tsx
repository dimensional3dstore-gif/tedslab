import { createFileRoute } from "@tanstack/react-router";
import { PlatformPlaceholderPage } from "@/components/PlatformPlaceholderPage";
export const Route = createFileRoute("/decipher")({ component: () => <PlatformPlaceholderPage title="Decipher" description="A planned analysis and interpretation workspace." area="Decipher" nextSteps={["Define input formats.", "Connect local and remote analysis engines.", "Add result annotations and export."]} /> });
