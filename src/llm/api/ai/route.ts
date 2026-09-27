import { buildAiResponse } from "@/ai";

export async function POST(request: Request): Promise<Response> {
  const body: unknown = await request.json().catch(() => null);
  if (!body || typeof body !== "object" || !("prompt" in body) || typeof body.prompt !== "string")
    return Response.json({ error: "A prompt string is required." }, { status: 400 });
  const prompt = body.prompt.trim();
  if (!prompt || prompt.length > 2_000)
    return Response.json(
      { error: "Prompt length must be between 1 and 2,000 characters." },
      { status: 400 },
    );
  return Response.json({ answer: await buildAiResponse(prompt), source: "site-study-tutor" });
}
