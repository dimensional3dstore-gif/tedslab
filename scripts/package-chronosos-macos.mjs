import { execFileSync } from "node:child_process";
import { copyFile, mkdir, rename, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);
const releaseDirectory = path.join(projectRoot, "release");
const appPath = path.join(releaseDirectory, "mac-arm64", "ChronosOS.app");
const createDmgCli = path.join(projectRoot, "vendor", "create-dmg", "cli.js");
const skipAppBuild = process.argv.includes("--skip-app-build");

await stat(createDmgCli).catch((error) => {
  if (error.code === "ENOENT") {
    throw new Error(
      "Vendored create-dmg source is missing from vendor/create-dmg.",
      { cause: error },
    );
  }
  throw error;
});

if (!skipAppBuild) {
  execFileSync(
    process.execPath,
    [path.join(projectRoot, "scripts", "generate-chronosos-macos-icon.mjs")],
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

execFileSync(
  process.execPath,
  [
    createDmgCli,
    "--overwrite",
    "--no-version-in-filename",
    "--dmg-title=ChronosOS",
    appPath,
    releaseDirectory,
  ],
  { cwd: projectRoot, stdio: "inherit" },
);

const generatedDmgPath = path.join(releaseDirectory, "ChronosOS.dmg");
await stat(generatedDmgPath);
const dmgPath = path.join(releaseDirectory, "Chronos.dmg");
await rename(generatedDmgPath, dmgPath);
const downloadDirectory = path.join(projectRoot, "public", "downloads");
await mkdir(downloadDirectory, { recursive: true });
await copyFile(dmgPath, path.join(downloadDirectory, "Chronos.dmg"));
console.log(
  "Created release/Chronos.dmg with create-dmg and copied it to public/downloads/Chronos.dmg",
);
