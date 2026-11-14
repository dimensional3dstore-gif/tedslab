import { createFileRoute } from "@tanstack/react-router";
import DownloadableSoftwarePage from "@/downloadable-software/page";

const title = "Download ChronosOS";
const description =
  "Download the latest ChronosOS macOS installer from GitHub Releases.";

export const Route = createFileRoute("/download")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: DownloadPage,
});

function DownloadPage() {
  return <DownloadableSoftwarePage />;
}
