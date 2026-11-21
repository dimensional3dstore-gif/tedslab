import { access, readdir, readFile, writeFile } from "node:fs/promises";
import { join, relative, resolve } from "node:path";

const staticDirCandidates = [
  resolve(".vercel/output/static"),
  resolve(".output/public"),
];
let staticDir;
for (const candidate of staticDirCandidates) {
  try {
    await access(join(candidate, "sw.js"));
    staticDir = candidate;
    break;
  } catch {
    // Try the next output layout used by the configured Nitro preset.
  }
}
if (!staticDir) {
  throw new Error(`Service worker was not found in: ${staticDirCandidates.join(", ")}`);
}
const swPath = join(staticDir, "sw.js");

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

const files = await walk(staticDir);
const urls = files
  .map((file) => "/" + relative(staticDir, file).replaceAll("\\", "/"))
  .filter((url) => url !== "/sw.js")
  .sort();

const source = await readFile(swPath, "utf8");
const injected = source.replace(
  "const PRECACHE_URLS = [];",
  `const PRECACHE_URLS = ${JSON.stringify(urls)};`,
);

if (injected === source) {
  throw new Error("Offline service worker placeholder was not found in .vercel/output/static/sw.js");
}

await writeFile(swPath, injected, "utf8");
console.log(`Offline precache: ${urls.length} production static files added to ${swPath}`);
