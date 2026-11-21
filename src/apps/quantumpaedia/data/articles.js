// Curated article index for Quantumpaedia. Articles are progressively populated
// through the knowledge editor; keep the exported shape stable for all app pages.
export const articles = [];
export const articleBySlug = (slug) => articles.find((article) => article.slug === slug) ?? null;
