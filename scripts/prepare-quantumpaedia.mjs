import fs from "node:fs";
import path from "node:path";

const root = path.resolve(process.cwd(), "src/apps/quantumpaedia");
const tedLabRoot = path.resolve(process.cwd(), "src");
const extensions = [".js", ".jsx", ".ts", ".tsx"];

function isResolvable(target) {
  if (fs.existsSync(target) && fs.statSync(target).isFile()) return true;
  if (fs.existsSync(target) && fs.statSync(target).isDirectory()) {
    return extensions.some((ext) => fs.existsSync(path.join(target, "index" + ext)));
  }
  return extensions.some((ext) => fs.existsSync(target + ext));
}

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return walk(full);
    return /\.(js|jsx|ts|tsx)$/.test(entry.name) ? [full] : [];
  });
}

let changed = 0;
const unresolved = [];

for (const file of walk(root)) {
  const original = fs.readFileSync(file, "utf8");
  const updated = original.replace(/(["'])@\/([^"']+)\1/g, (match, quote, specifier) => {
    const quantumpaediaTarget = path.resolve(root, specifier);
    if (isResolvable(quantumpaediaTarget)) {
      let relative = path.relative(path.dirname(file), quantumpaediaTarget).replaceAll(path.sep, "/");
      if (!relative.startsWith(".")) relative = "./" + relative;
      return quote + relative + quote;
    }

    // Some Quantumpaedia components intentionally reuse Ted's Lab modules.
    // Keep those @/ imports intact when they resolve from the main src tree.
    const tedLabTarget = path.resolve(tedLabRoot, specifier);
    if (!isResolvable(tedLabTarget)) {
      unresolved.push({
        file: path.relative(process.cwd(), file),
        specifier: "@/" + specifier,
      });
    }
    return match;
  });

  if (updated !== original) {
    fs.writeFileSync(file, updated);
    changed++;
  }
}

if (unresolved.length > 0) {
  const details = unresolved
    .map(({ file, specifier }) => `  - ${file}: ${specifier}`)
    .join("\n");
  throw new Error(
    `Unresolvable Quantumpaedia @/ imports detected before Vite build:\n${details}`,
  );
}

console.log(`Quantumpaedia import normalization complete: ${changed} files updated; no unresolved internal aliases remain.`);
