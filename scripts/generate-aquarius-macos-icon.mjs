import { execFileSync } from "node:child_process";
import { mkdir, mkdtemp, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

if (process.platform !== "darwin") {
  throw new Error("Aquarius macOS icon generation requires macOS.");
}

const projectRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);
const sourceSvg = path.join(projectRoot, "public", "aquarius-logo.svg");
const sourceIcon = path.join(temporaryDirectory, "Aquarius-logo.png");
const outputIcon = path.join(projectRoot, "build", "Aquarius.icns");
const temporaryDirectory = await mkdtemp(
  path.join(os.tmpdir(), "aquarius-iconset-"),
);
const iconsetDirectory = path.join(temporaryDirectory, "Aquarius.iconset");

try {
  await mkdir(iconsetDirectory);
  execFileSync("qlmanage", ["-t", "-s", "1024", "-o", temporaryDirectory, sourceSvg], { stdio: "inherit" });
  const renderedSvg = path.join(temporaryDirectory, "aquarius-logo.svg.png");
  execFileSync("sips", ["-s", "format", "png", renderedSvg, "--out", sourceIcon], { stdio: "inherit" });
  const iconSizes = [
    ["icon_16x16.png", 16],
    ["icon_16x16@2x.png", 32],
    ["icon_32x32.png", 32],
    ["icon_32x32@2x.png", 64],
    ["icon_128x128.png", 128],
    ["icon_128x128@2x.png", 256],
    ["icon_256x256.png", 256],
    ["icon_256x256@2x.png", 512],
    ["icon_512x512.png", 512],
    ["icon_512x512@2x.png", 1024],
  ];

  for (const [filename, size] of iconSizes) {
    execFileSync(
      "sips",
      [
        "-z",
        String(size),
        String(size),
        sourceIcon,
        "--out",
        path.join(iconsetDirectory, filename),
      ],
      { stdio: "inherit" },
    );
  }

  await mkdir(path.dirname(outputIcon), { recursive: true });
  execFileSync("iconutil", ["-c", "icns", "-o", outputIcon, iconsetDirectory], {
    stdio: "inherit",
  });
} finally {
  await rm(temporaryDirectory, { recursive: true, force: true });
}
