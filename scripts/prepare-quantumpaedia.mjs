import fs from "node:fs";
import path from "node:path";

const root = path.resolve(process.cwd(), "src/apps/quantumpaedia");
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
for (const file of walk(root)) {
  const original = fs.readFileSync(file, "utf8");
  const updated = original.replace(/(["'])@\/([^"']+)\1/g, (match, quote, specifier) => {
    const target = path.resolve(root, specifier);
    if (!isResolvable(target)) return match;
    let relative = path.relative(path.dirname(file), target).replaceAll(path.sep, "/");
    if (!relative.startsWith(".")) relative = "./" + relative;
    return quote + relative + quote;
  });
  if (updated !== original) {
    fs.writeFileSync(file, updated);
    changed++;
  }
}

console.log(`Quantumpaedia import normalization complete: ${changed} files updated.`);
