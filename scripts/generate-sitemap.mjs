import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const baseUrl = (process.env.SITE_URL || "https://teds-lab.com").replace(
  /\/$/,
  "",
);
const staticRoutes = [
  "/",
  "/categories",
  "/glossary",
  "/timeline",
  "/flashcards",
  "/quizzes",
  "/videos",
];

const escapeXml = (value) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");

const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...staticRoutes.map(
    (route) =>
      `  <url>\n    <loc>${escapeXml(`${baseUrl}${route}`)}</loc>\n  </url>`,
  ),
  "</urlset>",
  "",
].join("\n");

const outputPath = resolve("public", "sitemap.xml");
await mkdir(resolve("public"), { recursive: true });
await writeFile(outputPath, sitemap, "utf8");
console.log(`Sitemap generated at ${outputPath}`);
