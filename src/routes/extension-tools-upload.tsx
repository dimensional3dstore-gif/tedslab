import { createFileRoute } from "@tanstack/react-router";
import { PlatformPlaceholderPage } from "@/components/PlatformPlaceholderPage";
export const Route = createFileRoute("/extension-tools-upload")({ component: () => <PlatformPlaceholderPage title="Post an extension or tool" description="Prepare a controlled submission surface for platform extensions." area="extension publishing" nextSteps={["Add package metadata and validation.", "Connect upload storage.", "Add review, versioning, and rollback."]} /> });
