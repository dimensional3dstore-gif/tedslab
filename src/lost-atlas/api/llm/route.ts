import { buildAiResponse } from "@/ai";

export async function POST(request: Request): Promise<Response> {
  const body: unknown = await request.json().catch(() => null);
  if (
    !body ||
    typeof body !== "object" ||
    !("question" in body) ||
    typeof body.question !== "string"
  )
    return Response.json({ error: "A question string is required." }, { status: 400 });
  const question = body.question.trim();
  if (!question || question.length > 2_000)
    return Response.json(
      { error: "Question length must be between 1 and 2,000 characters." },
      { status: 400 },
    );
  return Response.json({ answer: await buildAiResponse(question), source: "site-knowledge" });
}
