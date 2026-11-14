import { access, readFile } from "node:fs/promises";

const packageJson = JSON.parse(await readFile(new URL("../package.json", import.meta.url), "utf8"));
const required = ["build", "build:prod"];
const missing = required.filter((name) => typeof packageJson.scripts?.[name] !== "string" || !packageJson.scripts[name].trim());

if (missing.length) {
  console.error(`Build configuration invalid. Missing npm scripts: ${missing.join(", ")}`);
  process.exit(1);
}

if (!packageJson.scripts.build.includes("vite build")) {
  console.error('Build configuration invalid: "build" must execute the Vite production build.');
  process.exit(1);
}

if (!packageJson.scripts.build.includes("scripts/generate-sitemap.mjs")) {
  console.error('Build configuration invalid: "build" must generate the sitemap.');
  process.exit(1);
}

await access(new URL("../scripts/generate-sitemap.mjs", import.meta.url));
console.log("Build configuration verified: npm run build is present and includes Vite + sitemap generation.");
