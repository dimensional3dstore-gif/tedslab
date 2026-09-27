import { createFileRoute } from "@tanstack/react-router";
import { PlatformPlaceholderPage } from "@/components/PlatformPlaceholderPage";
export const Route = createFileRoute("/graphication")({ component: () => <PlatformPlaceholderPage title="Graphication" description="A visual workspace for turning data and ideas into connected graphs." area="Graphication" nextSteps={["Connect graph inputs.", "Add layout and editing tools.", "Add export and collaboration."]} /> });
