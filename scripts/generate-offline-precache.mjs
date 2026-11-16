import { readdir, readFile, writeFile } from "node:fs/promises";
import { join, relative, resolve } from "node:path";

const dist = resolve("dist");
const swPath = join(dist, "sw.js");

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) files.push(...await walk(path));
    else files.push(path);
  }
  return files;
}

const files = await walk(dist);
const urls = files
  .map((file) => "/" + relative(dist, file).replaceAll("\\", "/"))
  .filter((url) => url !== "/sw.js")
  .sort();

const source = await readFile(swPath, "utf8");
const injected = source.replace(
  "const PRECACHE_URLS = [];",
  `const PRECACHE_URLS = ${JSON.stringify(urls)};`,
);

if (injected === source) {
  throw new Error("Offline service worker placeholder was not found.");
}

await writeFile(swPath, injected, "utf8");
console.log(`Offline precache: ${urls.length} build files added to ${swPath}`);
