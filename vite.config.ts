// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import fs from "node:fs";
import path from "node:path";

const quantumpaediaRoot = path.resolve(process.cwd(), "src/apps/quantumpaedia");

function resolveQuantumpaediaImport(source: string) {
  const relativePath = source.slice(2);
  const candidates = [
    path.resolve(quantumpaediaRoot, relativePath),
    ...[".js", ".jsx", ".ts", ".tsx"].map((ext) =>
      path.resolve(quantumpaediaRoot, relativePath + ext),
    ),
    ...["index.js", "index.jsx", "index.ts", "index.tsx"].map((file) =>
      path.resolve(quantumpaediaRoot, relativePath, file),
    ),
  ];

  return candidates.find((candidate) => fs.existsSync(candidate)) ?? null;
}

export default defineConfig({
  define: {
    "import.meta.env.VITE_BUILD_ID": JSON.stringify(process.env.VERCEL_GIT_COMMIT_SHA ?? process.env.VITE_BUILD_ID ?? "dev"),
  },
  vite: {
    envPrefix: ["VITE_", "NEXT_PUBLIC_"],
    plugins: [{
      name: "quantumpaedia-local-aliases",
      enforce: "pre",
      resolveId(source, importer) {
        if (!importer?.includes("apps/quantumpaedia/") || !source.startsWith("@/")) return null;
        const area = source.slice(2).split("/")[0];
        if (!["components", "data", "lib", "hooks", "utils", "api"].includes(area)) return null;

        // Quantumpaedia was imported as a self-contained app under src/apps/quantumpaedia.
        // Its original "@/..." imports must resolve inside that app rather than the
        // Ted's Lab root src directory. Returning an absolute path avoids re-entering
        // the root @ alias and makes this deterministic in Vite/Rolldown production builds.
        // Vite/Rolldown may invoke resolution before its normal extension
        // probing. Resolve the imported file explicitly so production builds do not
        // report Quantumpaedia's original "@/..." imports as unloadable dependencies.
        return resolveQuantumpaediaImport(source);
      },
    }],
  },
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
});
