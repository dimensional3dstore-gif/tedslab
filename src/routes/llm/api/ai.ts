import { createFileRoute } from "@tanstack/react-router";

type OpenRouterResponse = {
  choices?: Array<{ message?: { content?: string } }>;
  error?: { message?: string };
};

type SearchResult = {
  title?: string;
  type?: string;
  href?: string;
  description?: string;
};

function deterministicFallback(prompt: string) {
  const query = prompt.match(/User query:\s*([^\n]+)/i)?.[1]?.trim() || "this search";
  const resultText = prompt.match(/Search results:\s*([\s\S]*)$/i)?.[1]?.trim() || "";

  if (!resultText || resultText === "(No matching Ted's Lab results were found.)") {
    return "I couldn't find a strong match for “" + query + "” in Ted's Lab. Try a broader term, a subject name, or a different spelling.";
  }

  const lines = resultText
    .split(/\n\n+/)
    .filter(Boolean)
    .slice(0, 3)
    .map((block) => {
      const title = block.match(/^\d+\.\s*(.+?)\s*\[/)?.[1];
      const summary = block.match(/Summary:\s*([\s\S]*)$/)?.[1]?.trim();
      return title && summary ? title + ": " + summary : null;
    })
    .filter(Boolean) as string[];

  if (!lines.length) {
    return "Ted's Lab has relevant material for “" + query + "”. Open the results below to explore the matching articles, subjects, topics, and pages.";
  }

  return "For “" + query + "”, Ted's Lab found " + lines.length + " relevant result" + (lines.length === 1 ? "" : "s") + ". " + lines.join(" ");
}

function normalizeWord(word: string) {
  return word.toLowerCase().replace(/[^a-z0-9]/g, "");
}

function levenshtein(a: string, b: string) {
  const previous = Array.from({ length: b.length + 1 }, (_, i) => i);

  for (let i = 1; i <= a.length; i += 1) {
    let diagonal = previous[0];
    previous[0] = i;

    for (let j = 1; j <= b.length; j += 1) {
      const above = previous[j];
      previous[j] = Math.min(
        previous[j] + 1,
        previous[j - 1] + 1,
        diagonal + (a[j - 1] === b[j - 1] ? 0 : 1),
      );
      diagonal = above;
    }
  }

  return previous[b.length];
}

function spellingSuggestion(query: string, results: SearchResult[]) {
  const words = query.split(/\s+/).filter(Boolean);
  const vocabulary = new Set<string>();

  for (const result of results) {
    for (const text of [result.title, result.description]) {
      if (!text) continue;
      for (const word of text.toLowerCase().split(/[^a-z0-9]+/).filter(Boolean)) {
        vocabulary.add(word);
      }
    }
  }

  for (const phrase of [
    "artificial intelligence",
    "quantum mechanics",
    "mathematics",
    "biology",
    "chemistry",
    "physics",
    "technology",
    "computer",
    "programming",
    "history",
    "philosophy",
    "photosynthesis",
    "respiration",
    "evolution",
    "ecosystem",
    "enzymes",
    "genetics",
  ]) {
    for (const word of phrase.split(" ")) vocabulary.add(word);
  }

  let changed = false;
  const corrected = words.map((word) => {
    const clean = normalizeWord(word);
    if (clean.length < 4 || vocabulary.has(clean)) return word;

    let best = clean;
    let bestDistance = Infinity;

    for (const candidate of vocabulary) {
      if (candidate.length < 3 || Math.abs(candidate.length - clean.length) > 2) continue;
      const distance = levenshtein(clean, candidate);

      if (distance < bestDistance) {
        best = candidate;
        bestDistance = distance;
      }
    }

    const threshold = clean.length <= 5 ? 1 : 2;
    if (best !== clean && bestDistance <= threshold) {
      changed = true;
      return best;
    }

    return word;
  });

  const suggestion = corrected.join(" ");
  return changed && suggestion.toLowerCase() !== query.trim().toLowerCase()
    ? suggestion
    : null;
}

async function requestOpenRouter(apiKey: string, model: string, prompt: string) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 25000);

  try {
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
        model,
        messages: [
          {
            role: "system",
            content:
              "You are Ted's Lab AI Overview engine. Synthesize the supplied Ted's Lab search results. Give a direct answer first, then useful context. Prefer supplied results, never invent facts, and keep the answer concise. If results are empty, explain that no strong Ted's Lab match was found and suggest how to refine the search.",
          },
          { role: "user", content: prompt },
        ],
        temperature: 0.2,
        max_tokens: 700,
        plugins: model.endsWith(":online")
          ? [
              {
                id: "web",
                max_results: 6,
                search_prompt:
                  "Use web results as supporting evidence. Prefer primary and authoritative sources. Cite web sources with markdown links when they are used.",
              },
            ]
          : undefined,
      }),
    });

    const text = await response.text();
    let data: OpenRouterResponse = {};

    try {
      data = JSON.parse(text) as OpenRouterResponse;
    } catch {
      data = {};
    }

    if (!response.ok) {
      console.error("OpenRouter request failed:", response.status, data.error?.message ?? text);
      return null;
    }

    return data.choices?.[0]?.message?.content?.trim() || null;
  } finally {
    clearTimeout(timeout);
  }
}

export const Route = createFileRoute("/llm/api/ai")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = (await request.json()) as {
            prompt?: string;
            query?: string;
            results?: SearchResult[];
          };

          const prompt = body.prompt?.trim();
          const query = body.query?.trim() || "";
          const results = Array.isArray(body.results) ? body.results : [];

          if (prompt && prompt.length > 24000) {
            return Response.json({ error: "Prompt is too large." }, { status: 413 });
          }

          if (!prompt) {
            return Response.json({ error: "A prompt is required." }, { status: 400 });
          }

          const suggestion = spellingSuggestion(query, results);
          const apiKey = process.env.OPENROUTER_API_KEY;

          if (!apiKey) {
            return Response.json({
              answer: deterministicFallback(prompt),
              grounded: false,
              spellingSuggestion: suggestion,
              fallback: true,
            });
          }

          const models = [
            process.env.OPENROUTER_MODEL ?? "openai/gpt-5.2:online",
            "openai/gpt-4o-mini",
          ].filter((model, index, all) => all.indexOf(model) === index);

          let answer: string | null = null;
          let usedOpenRouter = false;

          for (const model of models) {
            try {
              answer = await requestOpenRouter(apiKey, model, prompt);
              if (answer) {
                usedOpenRouter = true;
                break;
              }
            } catch (error) {
              console.error("OpenRouter " + model + " request error:", error);
            }
          }

          if (!answer) {
            answer = deterministicFallback(prompt);
          }

          return Response.json({
            answer,
            grounded: usedOpenRouter,
            spellingSuggestion: suggestion,
            fallback: !usedOpenRouter,
          });
        } catch (error) {
          console.error("Search Lab AI error:", error);
          return Response.json({
            answer: "AI Overview is temporarily unavailable, but the search results below remain available. Try your search again in a moment.",
            grounded: false,
            spellingSuggestion: null,
            fallback: true,
          });
        }
      },
    },
  },
});
