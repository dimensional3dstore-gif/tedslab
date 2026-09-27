import { buildAiResponse } from "@/ai";

export async function POST(request: Request): Promise<Response> {
  const body: unknown = await request.json().catch(() => null);
  if (!body || typeof body !== "object" || !("message" in body) || typeof body.message !== "string")
    return Response.json({ error: "A message string is required." }, { status: 400 });
  const message = body.message.trim();
  if (!message || message.length > 2_000)
    return Response.json(
      { error: "Message length must be between 1 and 2,000 characters." },
      { status: 400 },
    );
  return Response.json({ answer: await buildAiResponse(message), stored: false });
}
