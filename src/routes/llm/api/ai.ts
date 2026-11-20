import { createFileRoute } from "@tanstack/react-router";

type OpenRouterResponse = {
  choices?: Array<{ message?: { content?: string } }>;
};

export const Route = createFileRoute("/llm/api/ai")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = (await request.json()) as { prompt?: string };
          const prompt = body.prompt?.trim();
          if (prompt && prompt.length > 24000) {
            return Response.json({ error: "Prompt is too large." }, { status: 413 });
          }

          if (!prompt) {
            return Response.json({ error: "A prompt is required." }, { status: 400 });
          }

          const apiKey = process.env.OPENROUTER_API_KEY;
          if (!apiKey) {
            return Response.json({ error: "OpenRouter is not configured." }, { status: 503 });
          }

          const controller = new AbortController();
          const timeout = setTimeout(() => controller.abort(), 30000);

          const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
              Authorization: "Bearer " + apiKey,
              "Content-Type": "application/json",
              "HTTP-Referer": process.env.TEDSLAB_APP_URL ?? "https://tedslab.app",
              "X-Title": "Ted's Lab Search Lab",
            },
            signal: controller.signal,
            body: JSON.stringify({
              model: process.env.OPENROUTER_MODEL ?? "openrouter/auto",
              messages: [
                {
                  role: "system",
                  content:
                    "You are Ted's Lab's search answer engine. Be accurate, concise, and grounded in the supplied search context. Never invent sources or claim to have browsed the web unless the supplied context says so.",
                },
                { role: "user", content: prompt },
              ],
              temperature: 0.2,
              max_tokens: 700,
            }),
          });

          clearTimeout(timeout);

          if (!response.ok) {
            const errorText = await response.text();
            console.error("OpenRouter request failed:", response.status, errorText);
            return Response.json({ error: "OpenRouter request failed." }, { status: 502 });
          }

          const data = (await response.json()) as OpenRouterResponse;
          const answer = data.choices?.[0]?.message?.content?.trim();

          if (!answer) {
            return Response.json({ error: "OpenRouter returned an empty response." }, { status: 502 });
          }

          return Response.json({ answer });
        } catch (error) {
          console.error("Search Lab AI error:", error);
          return Response.json({ error: "Unable to generate an AI answer." }, { status: 500 });
        }
      },
    },
  },
});
