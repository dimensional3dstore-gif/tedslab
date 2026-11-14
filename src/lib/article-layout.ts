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
  tags: ["Scientific reference", "Ted's Lab"],
  facts: [
    { label: "Type", value: "Encyclopedia article" },
    { label: "Level", value: "Introductory" },
    { label: "Read time", value: "8 minutes" },
    { label: "Editorial status", value: "Scientific reference" },
  ],
  overview: [
    "This reference introduces the subject through an evidence-led overview of its definition, scope, principal mechanisms, and significance.",
    "The following sections distinguish established observations from interpretation and identify the concepts required to understand the subject.",
  ],
  equation: {
    formula: "observation + method + evidence → scientific explanation",
    caption: "Editorial principle for Ted's Lab scientific references",
  },
  sections: [
    {
      heading: "Core concepts and terminology",
      cards: [
        {
          title: "Definition",
          text: "State the idea in one precise sentence a learner can reuse.",
        },
        { title: "Mechanism", text: "Name the parts and how they interact." },
        {
          title: "Why it matters",
          text: "Connect the idea to a real system, text, or problem.",
        },
      ],
    },
    {
      heading: "Mechanisms and processes",
      paragraphs: [
        "Define the research question, identify relevant variables, describe the mechanism in sequence, and evaluate the explanation against available observations.",
      ],
      cards: [
        {
          title: "1. Observe",
          text: "What is actually happening, in plain language?",
        },
        {
          title: "2. Name the parts",
          text: "List the actors, forces, or terms that must be kept distinct.",
        },
        {
          title: "3. Follow the sequence",
          text: "Put the process in time. First, then, finally.",
        },
      ],
    },
    {
      heading: "Applications and significance",
      paragraphs: [
        "Scientific understanding depends on precise terminology, coherent causal explanations, and the evaluation of claims against observable evidence.",
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
            Boolean(fact) &&
            typeof fact.label === "string" &&
            typeof fact.value === "string",
        )
      : [],
    overview:
      value.overview?.filter(
        (paragraph): paragraph is string => typeof paragraph === "string",
      ) ?? [],
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
                Boolean(card) &&
                typeof card.title === "string" &&
                typeof card.text === "string",
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

export function layoutFromArticleBody(
  body?: string | null,
): ArticleLayout | null {
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
    if (
      heading !== line ||
      (line.length < 90 && !/[.!?]$/.test(line) && current === null)
    ) {
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
    tags: [subject, section, "Scientific reference"],
    facts: [
      { label: "Subject", value: subject },
      { label: "Section", value: section },
      { label: "Focus", value: title },
      { label: "Level", value: "Core article" },
    ],
    overview: [
      `${title}: ${blurb}`,
      `${title} is examined within ${section} (${subject}). This reference establishes its definition, conceptual boundaries, principal components, and relationship to related topics.`,
      `Interpretive claims should be evaluated against relevant observations, reproducible methods, and the limits of available evidence.`,
    ],
    sections: [
      {
        heading: "Core concepts and terminology",
        cards: [
          {
            title: "What it is",
            text: `${title} refers to the subject described by the following scope: ${blurb}`,
          },
          {
            title: "Where it lives",
            text: `Within ${section}, ${title.toLowerCase()} is related to adjacent concepts in ${subject}. These relationships provide the appropriate disciplinary context.`,
          },
          {
            title: "How to use it",
            text: `A complete account should define ${title.toLowerCase()}, identify its governing principles, and provide an example supported by evidence from ${subject.toLowerCase()}.`,
          },
        ],
      },
      {
        heading: "Mechanisms and analytical approach",
        paragraphs: [
          `Analyse ${title.toLowerCase()} by defining the phenomenon, identifying its constituent components, and evaluating how changes in relevant variables affect the observed outcome.`,
        ],
        cards: [
          {
            title: "1. Frame",
            text: `Formulate a precise question that defines the phenomenon and its scope.`,
          },
          {
            title: "2. Structure",
            text: `Identify the components, variables, and boundary conditions that govern ${title.toLowerCase()}.`,
          },
          {
            title: "3. Test",
            text: `Specify the observations or experimental results that would support or falsify the proposed explanation of ${title.toLowerCase()}.`,
          },
        ],
      },
      {
        heading: "Applications and significance",
        paragraphs: [
          `${title} is significant within ${section} because it contributes to the interpretation of related phenomena and supports further analysis across ${subject}.`,
          `Further study should consider related concepts, primary literature, and relevant empirical findings. Interpret conclusions in light of the scope and limitations of the available evidence.`,
        ],
      },
    ],
  };
}
