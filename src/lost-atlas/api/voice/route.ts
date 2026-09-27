export function GET(): Response {
  return Response.json({ available: true, engine: "browser-speech-synthesis", serverAudio: false });
}
