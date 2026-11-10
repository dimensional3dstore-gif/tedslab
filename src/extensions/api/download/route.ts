import { CHRONOSOS_DOWNLOAD_URL } from "@/lib/chronos-os-download";

export function GET(): Response {
  return Response.json(
    {
      downloads: [
        {
          id: "chronosos-macos",
          name: "ChronosOS for macOS",
          url: CHRONOSOS_DOWNLOAD_URL,
          platform: "macOS arm64",
        },
      ],
    },
    { headers: { "Cache-Control": "public, max-age=300" } },
  );
}
