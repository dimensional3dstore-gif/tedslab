import fs from "node:fs";

const expectedUrl =
  "https://github.com/dimensional3dstore-gif/tedslab/releases/latest/download/Aquarius.dmg";
const configPath = "src/lib/chronos-os-download.ts";
const workflowPath = ".github/workflows/aquarius-release.yml";
const packagePath = "package.json";
const packagingScriptPath = "scripts/package-aquarius-macos.mjs";

const configText = fs.readFileSync(configPath, "utf8");
if (!configText.includes(expectedUrl)) {
  throw new Error(`Missing Aquarius GitHub release URL in ${configPath}`);
}

if (!fs.existsSync(workflowPath)) {
  throw new Error(`Missing release workflow: ${workflowPath}`);
}

const workflowText = fs.readFileSync(workflowPath, "utf8");
const requiredWorkflowContent = [
  "npm ci --include=optional",
  "apple-actions/import-codesign-certs@v3",
  "npm run desktop:app",
  "node scripts/package-aquarius-macos.mjs --skip-app-build",
  "notarytool submit",
  "stapler staple release/Aquarius.dmg",
  "codesign --verify",
  "Aquarius.dmg",
];

if (requiredWorkflowContent.some((content) => !workflowText.includes(content))) {
  throw new Error(
    "Release workflow must install dependencies, sign and notarize Aquarius and publish Aquarius.dmg.",
  );
}

const packageJson = JSON.parse(fs.readFileSync(packagePath, "utf8"));
if (
  !packageJson.scripts?.["desktop:download"] ||
  !packageJson.scripts?.["desktop:mac"] ||
  !fs.existsSync(packagingScriptPath) ||
  !fs.existsSync("scripts/generate-aquarius-macos-icon.mjs") ||
  packageJson.build?.productName !== "Aquarius" ||
  packageJson.build?.appId !== "com.tedslab.aquarius" ||
  packageJson.build?.mac?.icon !== "build/Aquarius.icns"
) {
  throw new Error("Incomplete Aquarius desktop packaging configuration.");
}

console.log("Aquarius download configuration verified.");
