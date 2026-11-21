// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

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
        if (!importer?.includes("/src/apps/quantumpaedia/") || !source.startsWith("@/")) return null;
        const area = source.slice(2).split("/")[0];
        if (!["components", "data", "lib", "hooks", "utils", "api"].includes(area)) return null;
        return this.resolve(source.replace("@/", "@/apps/quantumpaedia/"), importer, { skipSelf: true });
      }
    }],
  },
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
});
