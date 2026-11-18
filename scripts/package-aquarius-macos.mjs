import { execFileSync } from "node:child_process";
import { copyFile, mkdir, rename, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const releaseDirectory = path.join(projectRoot, "release");
const appPath = path.join(releaseDirectory, "mac-arm64", "Aquarius.app");
const createDmgCli = path.join(projectRoot, "vendor", "create-dmg", "cli.js");
const skipAppBuild = process.argv.includes("--skip-app-build");
const unsignedDmg = process.env.AQUARIUS_UNSIGNED_DMG === "true";

await stat(createDmgCli).catch((error) => {
  if (error.code === "ENOENT") {
    throw new Error("Vendored create-dmg source is missing from vendor/create-dmg.");
  }
  throw error;
});

if (!skipAppBuild) {
  execFileSync(
    process.execPath,
    [path.join(projectRoot, "scripts", "generate-aquarius-macos-icon.mjs")],
    { cwd: projectRoot, stdio: "inherit" },
  );

  execFileSync("npm", ["run", "desktop:app"], {
    cwd: projectRoot,
    stdio: "inherit",
  });
}

await stat(appPath);

execFileSync("npm", ["rebuild", "macos-alias"], {
  cwd: projectRoot,
  stdio: "inherit",
});

if (unsignedDmg) {
  // Rebuilds can modify native files inside the app bundle, so sign only after all app files are finalized.
  execFileSync("codesign", ["--force", "--deep", "--sign", "-", appPath], { cwd: projectRoot, stdio: "inherit" });
  execFileSync("codesign", ["--verify", "--deep", "--strict", "--verbose=2", appPath], { cwd: projectRoot, stdio: "inherit" });
}

execFileSync(
  process.execPath,
  [
    createDmgCli,
    "--overwrite",
    "--no-version-in-filename",
    "--dmg-title=Aquarius",
    ...(unsignedDmg ? ["--no-code-sign"] : []),
    appPath,
    releaseDirectory,
  ],
  { cwd: projectRoot, stdio: "inherit" },
);

const generatedDmgPath = path.join(releaseDirectory, "Aquarius.dmg");
await stat(generatedDmgPath);
const dmgPath = path.join(releaseDirectory, "Aquarius.dmg");
const downloadDirectory = path.join(projectRoot, "public", "downloads");
await mkdir(downloadDirectory, { recursive: true });
await copyFile(dmgPath, path.join(downloadDirectory, "Aquarius.dmg"));

console.log("Created release/Aquarius.dmg and public/downloads/Aquarius.dmg");
