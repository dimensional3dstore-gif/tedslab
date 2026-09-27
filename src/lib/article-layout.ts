export type ArticleCardBlock = { title: string; text: string };

export type ArticleSectionBlock = {
  heading: string;
  paragraphs?: string[];
  cards?: ArticleCardBlock[];
};

export type ArticleLayout = {
  version: 1;
  tags: string[];
  facts: { label: string; value: string }[];
  overview: string[];
  equation?: { formula: string; caption: string };
  sections: ArticleSectionBlock[];
};

export const DEFAULT_ARTICLE_LAYOUT: ArticleLayout = {
  version: 1,
  tags: ["Encyclopedia", "Study", "Ted's Lab"],
  facts: [
    { label: "Type", value: "Encyclopedia article" },
    { label: "Level", value: "Introductory" },
    { label: "Read time", value: "8 minutes" },
    { label: "Reviewed", value: "Editorial desk" },
  ],
  overview: [
    "This article introduces the topic with a clear first map: what it is, why it matters, and how the pieces fit together.",
    "Read the key concepts, then the process steps. Use the facts rail to lock the essentials before you jump to related articles or the Knowledge Atlas.",
  ],
  equation: {
    formula: "idea + evidence → understanding",
    caption: "A working rule for every Ted's Lab article",
  },
  sections: [
    {
      heading: "Key Concepts",
      cards: [
        {
          title: "Definition",
          text: "State the idea in one precise sentence a learner can reuse.",
        },
        { title: "Mechanism", text: "Name the parts and how they interact." },
        { title: "Why it matters", text: "Connect the idea to a real system, text, or problem." },
      ],
    },
    {
      heading: "Process Steps",
      paragraphs: [
        "Start with the observation or question. Gather the structures involved. Trace cause and effect in order. End with a check: what would change if one part failed?",
      ],
      cards: [
        { title: "1. Observe", text: "What is actually happening, in plain language?" },
        {
          title: "2. Name the parts",
          text: "List the actors, forces, or terms that must be kept distinct.",
        },
        { title: "3. Follow the sequence", text: "Put the process in time. First, then, finally." },
      ],
    },
    {
      heading: "Importance",
      paragraphs: [
        "A well-formed article lets a student teach the idea back. That is the test. If you can explain it to someone else without the page open, the layout did its job.",
      ],
    },
  ],
};

export function parseArticleLayout(body?: string | null): ArticleLayout | null {
  if (!body) return null;
  const trimmed = body.trim();
  if (!trimmed.startsWith("{")) return null;
  try {
    const parsed = JSON.parse(trimmed) as Partial<ArticleLayout>;
    if (parsed && parsed.version === 1 && Array.isArray(parsed.overview)) {
      return normalizeArticleLayout(parsed);
    }
    return null;
  } catch {
    return null;
  }
}

function normalizeArticleLayout(value: Partial<ArticleLayout>): ArticleLayout {
  const equation =
    value.equation &&
    typeof value.equation.formula === "string" &&
    typeof value.equation.caption === "string"
      ? value.equation
      : null;

  return {
    version: 1,
    tags: Array.isArray(value.tags)
      ? value.tags.filter((tag): tag is string => typeof tag === "string")
      : [],
    facts: Array.isArray(value.facts)
      ? value.facts.filter(
          (fact): fact is { label: string; value: string } =>
            Boolean(fact) && typeof fact.label === "string" && typeof fact.value === "string",
        )
      : [],
    overview:
      value.overview?.filter((paragraph): paragraph is string => typeof paragraph === "string") ??
      [],
    ...(equation ? { equation } : {}),
    sections: Array.isArray(value.sections)
      ? value.sections
          .filter(
            (section): section is ArticleSectionBlock =>
              Boolean(section) && typeof section.heading === "string",
          )
          .map((section) => {
            const paragraphs = section.paragraphs?.filter(
              (paragraph): paragraph is string => typeof paragraph === "string",
            );
            const cards = section.cards?.filter(
              (card): card is ArticleCardBlock =>
                Boolean(card) && typeof card.title === "string" && typeof card.text === "string",
            );
            return {
              heading: section.heading,
              ...(paragraphs ? { paragraphs } : {}),
              ...(cards ? { cards } : {}),
            };
          })
      : [],
  };
}

function bodyToPlainText(body: string): string {
  return body
    .replace(/<br\s*\/?\s*>/gi, "\n")
    .replace(/<\/p\s*>/gi, "\n\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .trim();
}

export function layoutFromArticleBody(body?: string | null): ArticleLayout | null {
  if (!body?.trim()) return null;
  const parsed = parseArticleLayout(body);
  if (parsed) return parsed;

  const lines = bodyToPlainText(body).split(/\r?\n/);
  const overview: string[] = [];
  const sections: ArticleSectionBlock[] = [];
  let current: ArticleSectionBlock | null = null;
  let paragraph: string[] = [];

  const flushParagraph = () => {
    const text = paragraph
      .join(" ")
      .replace(/^[-*]\s+/, "")
      .trim();
    if (!text) return;
    if (current) current.paragraphs = [...(current.paragraphs ?? []), text];
    else overview.push(text);
    paragraph = [];
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) {
      flushParagraph();
      continue;
    }
    const heading = line.replace(/^#{1,6}\s+/, "").trim();
    if (heading !== line || (line.length < 90 && !/[.!?]$/.test(line) && current === null)) {
      flushParagraph();
      if (!current && overview.length === 0 && sections.length === 0) continue;
      current = { heading, paragraphs: [] };
      sections.push(current);
      continue;
    }
    paragraph.push(line);
  }
  flushParagraph();

  return {
    version: 1,
    tags: ["Article", "Study"],
    facts: [],
    overview: overview.length > 0 ? overview : [bodyToPlainText(body)],
    sections,
  };
}

export function layoutToExcerpt(layout: ArticleLayout) {
  return layout.overview[0] ?? "";
}

export function buildTopicLayout(opts: {
  title: string;
  blurb: string;
  subject: string;
  section: string;
}): ArticleLayout {
  const { title, blurb, subject, section } = opts;
  return {
    version: 1,
    tags: [subject, section, title],
    facts: [
      { label: "Subject", value: subject },
      { label: "Section", value: section },
      { label: "Focus", value: title },
      { label: "Level", value: "Core article" },
    ],
    overview: [
      `${title}: ${blurb}`,
      `${title} is a core idea in ${section} (${subject}). This article gives a learner-ready map: definition, working parts, and a path into related Ted's Lab entries and the Knowledge Atlas.`,
      `As you read, keep one question in view: what would the system look like if this idea were missing? That question turns a definition into understanding.`,
    ],
    sections: [
      {
        heading: "Key Concepts",
        cards: [
          {
            title: "What it is",
            text: `${title} names a pattern you can recognise again. ${blurb}`,
          },
          {
            title: "Where it lives",
            text: `In ${section}, ${title.toLowerCase()} sits among neighbouring ideas. Follow those neighbours in the sidebar and Atlas graph.`,
          },
          {
            title: "How to use it",
            text: `Explain ${title.toLowerCase()} in one sentence, then give one example from ${subject.toLowerCase()}. If both are solid, you have the concept.`,
          },
        ],
      },
      {
        heading: "A working sequence",
        paragraphs: [
          `Approach ${title.toLowerCase()} in three moves. First, state the phenomenon without jargon. Second, name the parts that must be present. Third, run a mental experiment: change one part and predict the result.`,
        ],
        cards: [
          {
            title: "1. Frame",
            text: `Restate ${title} as a question a curious student would actually ask.`,
          },
          {
            title: "2. Structure",
            text: `List the components, forces, or terms that ${title.toLowerCase()} depends on.`,
          },
          {
            title: "3. Test",
            text: `Ask what evidence would confirm or break your account of ${title.toLowerCase()}.`,
          },
        ],
      },
      {
        heading: "Why it matters",
        paragraphs: [
          `${title} is not trivia. It is a lever inside ${section}: once you hold it, other articles in ${subject} become easier to read because you already know the local grammar of the field.`,
          `Continue with related articles, flashcards, and Atlas neighbours. The encyclopedia is built so each entry is a door, not a dead end.`,
        ],
      },
    ],
  };
}
