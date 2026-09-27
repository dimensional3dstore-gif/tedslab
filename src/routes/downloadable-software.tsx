import { createFileRoute } from "@tanstack/react-router";
import DownloadableSoftwarePage from "@/downloadable-software/page";

export const Route = createFileRoute("/downloadable-software")({
  component: DownloadableSoftwarePage,
});
