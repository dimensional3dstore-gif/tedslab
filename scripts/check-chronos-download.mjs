import fs from "node:fs";

const expectedUrl =
  "https://github.com/dimensional3dstore-gif/tedslab/releases/latest/download/Chronos.dmg";
const configPath = "src/lib/chronos-os-download.ts";
const workflowPath = ".github/workflows/chronosos-release.yml";
const packagePath = "package.json";
const packagingScriptPath = "scripts/package-chronosos-macos.mjs";

const configText = fs.readFileSync(configPath, "utf8");
if (!configText.includes(expectedUrl)) {
  throw new Error(`Missing GitHub release URL in ${configPath}`);
}

if (!fs.existsSync(workflowPath)) {
  throw new Error(`Missing release workflow: ${workflowPath}`);
}

const workflowText = fs.readFileSync(workflowPath, "utf8");
if (
  !workflowText.includes("npm ci --include=optional") ||
  !workflowText.includes("npm run desktop:download") ||
  !workflowText.includes("Chronos.dmg")
) {
  throw new Error(
    "Release workflow must install optional dependencies, package the app, and publish Chronos.dmg.",
  );
}

const packageJson = JSON.parse(fs.readFileSync(packagePath, "utf8"));
const vendoredFiles = [
  "vendor/create-dmg/cli.js",
  "vendor/create-dmg/compose-icon",
  "vendor/create-dmg/compose-icon.js",
  "vendor/create-dmg/disk-icon.icns",
  "vendor/create-dmg/license",
  "vendor/create-dmg/package.json",
  "vendor/create-dmg/sla.js",
  "vendor/create-dmg/assets/dmg-background.png",
  "vendor/create-dmg/assets/dmg-background@2x.png",
];
const runtimeDependencies = [
  "execa",
  "icns-lib",
  "meow",
  "ora",
  "plist",
  "tempy",
];
if (
  !packageJson.optionalDependencies?.appdmg ||
  !packageJson.scripts?.["desktop:download"] ||
  !fs.existsSync(packagingScriptPath) ||
  !fs.existsSync("scripts/generate-chronosos-macos-icon.mjs") ||
  !fs.existsSync("vendor/create-dmg/license") ||
  vendoredFiles.some((file) => !fs.existsSync(file)) ||
  runtimeDependencies.some(
    (dependency) => !packageJson.dependencies?.[dependency],
  ) ||
  packageJson.dependencies?.["create-dmg"] ||
  packageJson.optionalDependencies?.["create-dmg"] ||
  packageJson.build?.mac?.icon !== "build/ChronosOS.icns"
) {
  throw new Error(
    "Incomplete vendored create-dmg source, runtime dependencies, ChronosOS icon setup, or macOS packaging script.",
  );
}

console.log("ChronosOS download configuration verified.");
