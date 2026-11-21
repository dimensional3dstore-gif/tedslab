import { deepeningA } from './partA';
import { deepeningB } from './partB';
import { deepeningC } from './partC';
import { deepeningD } from './partD';
import { deepeningE } from './partE';
import { deepeningF } from './partF';
import { deepeningG } from './partG';
import { deepeningH } from './partH';

/**
 * Additional article material merged into the base records in data/articles.js.
 * Each entry may supply extra sections, glossary terms and quick facts.
 * Parts are combined per slug so several files can extend the same article.
 */
const parts = [deepeningA, deepeningB, deepeningC, deepeningD, deepeningE, deepeningF, deepeningG, deepeningH];

const merged = {};

parts.forEach((part) => {
  Object.entries(part).forEach(([slug, extra]) => {
    const previous = merged[slug] || { sections: [], glossary: [], quickFacts: [] };
    merged[slug] = {
      sections: [...previous.sections, ...(extra.sections || [])],
      glossary: [...previous.glossary, ...(extra.glossary || [])],
      quickFacts: [...previous.quickFacts, ...(extra.quickFacts || [])]
    };
  });
});

export const articleDeepening = merged;