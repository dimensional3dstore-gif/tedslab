import { VIDEOS } from "@/lib/catalog";

export function GET(request: Request): Response {
  const id = new URL(request.url).pathname.split("/").filter(Boolean).at(-1);
  const video = VIDEOS.find((item) => item.id === id || item.slug === id);
  if (!video) return Response.json({ error: "Video not found." }, { status: 404 });
  return Response.json(video, { headers: { "Cache-Control": "public, max-age=60" } });
}
