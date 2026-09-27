export function GET(): Response {
  return Response.json(
    {
      downloads: [
        {
          id: "chronosos-macos",
          name: "ChronosOS for macOS",
          url: "/downloads/ChronosOS.dmg",
          platform: "macOS arm64",
        },
      ],
    },
    { headers: { "Cache-Control": "public, max-age=300" } },
  );
}
