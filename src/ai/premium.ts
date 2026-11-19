export type PremiumAiMode =
  | "tutor"
  | "course"
  | "research"
  | "exam"
  | "what-if"
  | "atlas"
  | "notebook"
  | "lesson";

const MODE_INSTRUCTIONS: Record<PremiumAiMode, string> = {
  tutor: "Act as Ted's Lab Pro AI Tutor. Teach with a clear explanation, a concrete example, a common misconception, and a short retrieval question. Never pretend the learner knows something they have not demonstrated.",
  course: "Act as a curriculum designer. Build a coherent course with prerequisites, modules, lessons, practice tasks, checkpoints, and a final assessment. Keep the sequence progressive.",
  research: "Act as a research assistant. Produce a balanced research brief with a question, key findings, competing explanations, uncertainties, useful concepts, and suggested primary-source directions. Clearly separate established facts from hypotheses.",
  exam: "Act as an examiner. Create rigorous questions at the requested level, covering recall, application, analysis, and synthesis. Include an answer key and a short marking guide.",
  "what-if": "Act as a scientific scenario modeller. Explore a hypothetical change step by step across immediate, medium-term, and long-term consequences. State assumptions and distinguish confidence levels.",
  atlas: "Act as a knowledge-graph curator. Identify concepts, relationships, prerequisites, contrasts, and useful next topics. Return a compact graph-like structure.",
  notebook: "Act as a study editor. Improve the learner's notes without changing their intended meaning. Add missing structure, definitions, examples, misconceptions, and a short review checklist.",
  lesson: "Act as an instructional designer. Turn the supplied transcript or source text into an interactive lesson with objectives, sections, checks for understanding, flashcards, and a final challenge.",
};

function getKey() {
  if (typeof import.meta !== "undefined") {
    const key = (import.meta as { env?: Record<string, string | undefined> }).env?.VITE_OPENROUTER_API_KEY;
    if (key) return key;
  }
  if (typeof process !== "undefined") return process.env?.OPENROUTER_API_KEY ?? process.env?.VITE_OPENROUTER_API_KEY;
  return undefined;
}

export async function premiumAi(mode: PremiumAiMode, input: string, context = "") {
  const key = getKey();
  if (!key) throw new Error("OpenRouter is not configured. Add OPENROUTER_API_KEY to the server environment.");

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${key}`,
      "HTTP-Referer": "https://tedslab.vercel.app",
      "X-Title": "Ted's Lab Pro",
    },
    body: JSON.stringify({
      model: "openrouter/auto",
      messages: [
        {
          role: "system",
          content: `${MODE_INSTRUCTIONS[mode]} You are part of Ted's Lab, a learning encyclopedia. Prefer accurate, structured, age-appropriate explanations. Do not invent citations or claim to have browsed sources unless a source was supplied.\n\nExisting learner context:\n${context.slice(0, 12000)}`,
        },
        { role: "user", content: input.slice(0, 12000) },
      ],
      temperature: 0.5,
      max_tokens: 1800,
      usage: { include: true },
    }),
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(`OpenRouter request failed (${response.status}). ${message.slice(0, 240)}`);
  }

  const data = (await response.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };
  const answer = data.choices?.[0]?.message?.content?.trim();
  if (!answer) throw new Error("OpenRouter returned an empty response.");
  return answer;
}
