import { createFileRoute } from "@tanstack/react-router";
import { PlatformPlaceholderPage } from "@/components/PlatformPlaceholderPage";
export const Route = createFileRoute("/annotation-sys")({ component: () => <PlatformPlaceholderPage title="Annotational System" description="A focused workspace for marking, linking, and revisiting evidence." area="annotation system" nextSteps={["Define annotation types.", "Connect article and media targets.", "Add search and export."]} /> });
