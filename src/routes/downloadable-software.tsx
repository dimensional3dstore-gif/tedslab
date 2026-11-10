import { createFileRoute } from "@tanstack/react-router";
import DownloadableSoftwarePage from "@/downloadable-software/page";

export const Route = createFileRoute("/downloadable-software")({
  head: () => ({
    meta: [
      { title: "Software Downloads — Ted's Lab" },
      {
        name: "description",
        content: "Download the latest ChronosOS macOS installer from GitHub.",
      },
    ],
  }),
  component: DownloadableSoftwarePage,
});
