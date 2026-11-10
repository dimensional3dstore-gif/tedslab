import fs from "node:fs";

const expectedUrl = "https://github.com/dimensional3dstore-gif/tedslab/releases/latest/download/ChronosOS.dmg";
const configPath = "src/lib/chronos-os-download.ts";
const workflowPath = ".github/workflows/chronosos-release.yml";

const configText = fs.readFileSync(configPath, "utf8");
if (!configText.includes(expectedUrl)) {
  throw new Error(`Missing GitHub release URL in ${configPath}`);
}

if (!fs.existsSync(workflowPath)) {
  throw new Error(`Missing release workflow: ${workflowPath}`);
}

const workflowText = fs.readFileSync(workflowPath, "utf8");
if (!workflowText.includes("ChronosOS.dmg")) {
  throw new Error(`Release workflow does not publish the ChronosOS DMG asset.`);
}

console.log("ChronosOS download configuration verified.");
