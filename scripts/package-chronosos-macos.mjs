import { execFileSync } from "node:child_process";
import { copyFile, mkdir, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);
const releaseDirectory = path.join(projectRoot, "release");
const appPath = path.join(releaseDirectory, "mac-arm64", "ChronosOS.app");
const createDmgCli = path.join(
  projectRoot,
  "node_modules",
  "create-dmg",
  "cli.js",
);

await stat(createDmgCli).catch((error) => {
  if (error.code === "ENOENT") {
    throw new Error(
      "create-dmg is not installed. Run npm ci --include=optional on macOS before packaging.",
      { cause: error },
    );
  }
  throw error;
});

execFileSync("npm", ["run", "desktop:app"], {
  cwd: projectRoot,
  stdio: "inherit",
});

await stat(appPath);

execFileSync(
  process.execPath,
  [
    createDmgCli,
    "--overwrite",
    "--no-version-in-filename",
    "--no-code-sign",
    appPath,
    releaseDirectory,
  ],
  { cwd: projectRoot, stdio: "inherit" },
);

const dmgPath = path.join(releaseDirectory, "ChronosOS.dmg");
await stat(dmgPath);
const downloadDirectory = path.join(projectRoot, "public", "downloads");
await mkdir(downloadDirectory, { recursive: true });
await copyFile(dmgPath, path.join(downloadDirectory, "ChronosOS.dmg"));
console.log(
  "Created release/ChronosOS.dmg with create-dmg and copied it to public/downloads/ChronosOS.dmg",
);
