import { execFileSync } from "node:child_process";
import { copyFile, mkdir, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const releaseDirectory = path.join(projectRoot, "release");

execFileSync("npm", ["run", "desktop:mac"], { cwd: projectRoot, stdio: "inherit" });

const dmgName = (await readdir(releaseDirectory)).find((name) => name.endsWith(".dmg"));
if (!dmgName) throw new Error("electron-builder completed without producing a DMG.");

const downloadDirectory = path.join(projectRoot, "public", "downloads");
await mkdir(downloadDirectory, { recursive: true });
await copyFile(path.join(releaseDirectory, dmgName), path.join(downloadDirectory, "ChronosOS.dmg"));
console.log("Published installer to public/downloads/ChronosOS.dmg");