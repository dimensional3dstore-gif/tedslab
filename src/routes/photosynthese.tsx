import { createFileRoute } from "@tanstack/react-router";
import PhotosyntheseTopicPage from "@/components/biopedia/pages/articles/biology/photosynthese";

export const Route = createFileRoute("/photosynthese")({
  component: PhotosyntheseTopicPage,
});
