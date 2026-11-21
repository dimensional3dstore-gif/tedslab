import { buildAiResponse, buildSearchAiResponse } from "@/ai";

type SearchEvidence = {
  title: string;
  type: string;
  href: string;
  description: string;
  body?: string;
};

export async function POST(request: Request): Promise<Response> {
  const body: unknown = await request.json().catch(() => null);

  if (!body || typeof body !== "object" || !("prompt" in body) || typeof body.prompt !== "string") {
    return Response.json({ error: "A prompt string is required." }, { status: 400 });
  }

  const prompt = body.prompt.trim();
  if (!prompt || prompt.length > 6_000) {
    return Response.json({ error: "Prompt length must be between 1 and 6,000 characters." }, { status: 400 });
  }

  const searchMode = "searchMode" in body && body.searchMode === true;
  if (searchMode) {
    const query = "query" in body && typeof body.query === "string" ? body.query : prompt;
    const evidence = "results" in body && Array.isArray(body.results)
      ? (body.results as SearchEvidence[])
      : [];
    const answer = await buildSearchAiResponse(query, evidence);
    return Response.json({
      answer: answer ?? "",
      grounded: Boolean(answer),
      source: answer ? "openrouter-search" : "offline",
    });
  }

  return Response.json({
    answer: await buildAiResponse(prompt),
    source: "site-study-tutor",
  });
}
