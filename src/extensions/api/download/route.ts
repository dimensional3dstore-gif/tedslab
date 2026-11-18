import { AQUARIUS_DOWNLOAD_URL } from "@/lib/chronos-os-download";

export function GET(): Response {
  return Response.json(
    {
      downloads: [
        {
          id: "aquarius-macos",
          name: "Aquarius for macOS",
          url: AQUARIUS_DOWNLOAD_URL,
          platform: "macOS arm64",
        },
      ],
    },
    { headers: { "Cache-Control": "public, max-age=300" } },
  );
}
