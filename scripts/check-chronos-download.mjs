import fs from "node:fs";

const expectedUrl =
  "https://github.com/dimensional3dstore-gif/tedslab/releases/latest/download/ChronosOS.dmg";
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
  !workflowText.includes("ChronosOS.dmg")
) {
  throw new Error(
    `Release workflow must install optional dependencies, package the app, and publish ChronosOS.dmg.`,
  );
}

const packageJson = JSON.parse(fs.readFileSync(packagePath, "utf8"));
if (
  !packageJson.optionalDependencies?.["create-dmg"] ||
  !packageJson.scripts?.["desktop:download"] ||
  !fs.existsSync(packagingScriptPath)
) {
  throw new Error(
    "Missing create-dmg dependency or macOS download packaging script.",
  );
}

console.log("ChronosOS download configuration verified.");
