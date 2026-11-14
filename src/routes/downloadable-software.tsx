import { createFileRoute } from "@tanstack/react-router";
import DownloadableSoftwarePage from "@/downloadable-software/page";

export const Route = createFileRoute("/downloadable-software")({
  head: () => ({
    meta: [
      { title: "ChronosOS Releases — Ted's Lab" },
      {
        name: "description",
        content:
          "Download the latest ChronosOS macOS installer, read release notes, and find setup guidance.",
      },
    ],
  }),
  component: DownloadableSoftwarePage,
});
