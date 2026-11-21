import { articles } from '@/data/articles';
import { disciplines } from '@/data/disciplines';
import { scientists } from '@/data/scientists';
import { experiments } from '@/data/experiments';
import { equations } from '@/data/equations';
import { papers } from '@/data/papers';
import { applications } from '@/data/applications';
import { timeline } from '@/data/timeline';

export const SEARCH_TYPES = ['Article', 'Discipline', 'Scientist', 'Experiment', 'Equation', 'Publication', 'Application', 'Discovery'];

export const searchIndex = [
  ...articles.map((a) => ({
    id: `article:${a.slug}`,
    type: 'Article',
    title: a.title,
    subtitle: a.subtitle,
    body: a.abstract,
    tags: [...a.tags, a.category, a.type],
    to: `/articles/${a.slug}`
  })),
  ...disciplines.map((d) => ({
    id: `discipline:${d.slug}`,
    type: 'Discipline',
    title: d.name,
    subtitle: d.tagline,
    body: d.summary,
    tags: d.researchAreas.map((r) => r.title),
    to: `/knowledge/${d.slug}`
  })),
  ...scientists.map((s) => ({
    id: `scientist:${s.slug}`,
    type: 'Scientist',
    title: s.name,
    subtitle: `${s.field} · ${s.years}`,
    body: s.summary,
    tags: s.contributions,
    to: `/scientists/${s.slug}`
  })),
  ...experiments.map((e) => ({
    id: `experiment:${e.slug}`,
    type: 'Experiment',
    title: e.title,
    subtitle: `${e.field} · ${e.year}`,
    body: e.summary,
    tags: e.people,
    to: `/experiments/${e.slug}`
  })),
  ...equations.map((e) => ({
    id: `equation:${e.id}`,
    type: 'Equation',
    title: e.name,
    subtitle: e.category,
    body: e.interpretation,
    tags: [String(e.year)],
    to: `/mathematics?tab=equations&eq=${e.id}`
  })),
  ...papers.map((p) => ({
    id: `paper:${p.id}`,
    type: 'Publication',
    title: p.title,
    subtitle: `${p.authors[0]}${p.authors.length > 1 ? ' et al.' : ''} · ${p.journal} ${p.year}`,
    body: p.abstract,
    tags: p.keywords,
    to: `/research?tab=publications&paper=${p.id}`
  })),
  ...applications.map((a) => ({
    id: `application:${a.slug}`,
    type: 'Application',
    title: a.title,
    subtitle: a.maturity,
    body: a.summary,
    tags: [a.category],
    to: `/applications?open=${a.slug}`
  })),
  ...timeline.map((t) => ({
    id: `discovery:${t.year}-${t.title}`,
    type: 'Discovery',
    title: t.title,
    subtitle: `${t.year} · ${t.era}`,
    body: t.text,
    tags: t.people,
    to: `/timeline?year=${t.year}`
  }))
];

export function searchAll(query, type = 'All') {
  const q = query.trim().toLowerCase();
  const pool = type === 'All' ? searchIndex : searchIndex.filter((r) => r.type === type);
  if (!q) return pool.slice(0, 24);

  const scored = [];
  for (const item of pool) {
    const title = item.title.toLowerCase();
    const subtitle = (item.subtitle || '').toLowerCase();
    const body = (item.body || '').toLowerCase();
    const tags = item.tags.join(' ').toLowerCase();

    let score = 0;
    if (title === q) score += 40;
    else if (title.startsWith(q)) score += 24;
    else if (title.includes(q)) score += 14;
    if (subtitle.includes(q)) score += 7;
    if (tags.includes(q)) score += 5;
    if (body.includes(q)) score += 2;

    if (score > 0) scored.push({ ...item, score });
  }
  return scored.sort((a, b) => b.score - a.score || a.title.localeCompare(b.title)).slice(0, 40);
}

export function suggestions(query, limit = 6) {
  return searchAll(query).slice(0, limit);
}