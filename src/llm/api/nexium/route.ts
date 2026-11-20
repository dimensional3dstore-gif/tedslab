import { buildAiResponse } from "@/ai";

export async function POST(request: Request): Promise<Response> {
  const body: unknown = await request.json().catch(() => null);
  if (!body || typeof body !== "object" || !("messages" in body) || !Array.isArray(body.messages))
    return Response.json({ error: "A messages array is required." }, { status: 400 });

  const messages = body.messages
    .filter((message): message is { role: string; content: string } =>
      typeof message === "object" && message !== null && "role" in message && "content" in message &&
      typeof message.role === "string" && typeof message.content === "string")
    .slice(-16);

  const prompt = messages.map((message) => `${message.role}: ${message.content.trim()}`).filter((message) => message.length > 8).join("\n\n");
  if (!prompt || prompt.length > 12_000)
    return Response.json({ error: "Conversation is empty or too long." }, { status: 400 });

  try {
    return Response.json({
      answer: await buildAiResponse(
        `You are Nexium, the AI study tutor inside Ted's Lab. Answer the learner accurately, clearly, and helpfully. Use the conversation below as context. Prefer concise explanations with headings, examples, and step-by-step reasoning when useful. Do not claim to use a local model or oMLX.\n\n${prompt}`
      ),
      source: "openrouter",
    });
  } catch {
    return Response.json({ error: "Nexium could not generate a response." }, { status: 502 });
  }
}