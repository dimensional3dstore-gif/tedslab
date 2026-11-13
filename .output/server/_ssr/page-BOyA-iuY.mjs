import { r as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { St as Github, jt as Download, kt as ExternalLink } from "../_libs/lucide-react.mjs";
import { t as CHRONOSOS_LATEST_RELEASE_API_URL } from "./chronos-os-download-B2Z6-JA2.mjs";
import { n as PageHeader, t as AppShell } from "./AppShell-6_41dtv3.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/page-BOyA-iuY.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function DownloadableSoftwarePage() {
	const [release, setRelease] = (0, import_react.useState)(null);
	const [status, setStatus] = (0, import_react.useState)("loading");
	(0, import_react.useEffect)(() => {
		const controller = new AbortController();
		async function loadLatestRelease() {
			try {
				const response = await fetch(CHRONOSOS_LATEST_RELEASE_API_URL, {
					headers: { Accept: "application/vnd.github+json" },
					signal: controller.signal
				});
				if (response.status === 404) {
					setStatus("empty");
					return;
				}
				if (!response.ok) throw new Error("GitHub release lookup failed");
				const latestRelease = await response.json();
				setRelease(latestRelease);
				setStatus("available");
			} catch {
				if (!controller.signal.aborted) setStatus("error");
			}
		}
		loadLatestRelease();
		return () => controller.abort();
	}, []);
	const dmg = release?.assets.find((asset) => asset.name === "ChronosOS.dmg") ?? release?.assets.find((asset) => /^ChronosOS.*\.dmg$/i.test(asset.name));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto w-full max-w-4xl space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Software downloads",
			description: "Get the latest ChronosOS installer directly from GitHub Releases."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			"aria-labelledby": "chronosos-release-title",
			className: "border-y border-border py-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "flex items-center gap-2 text-xs font-semibold uppercase text-primary",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Github, { className: "size-4" }), " GitHub Releases"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							id: "chronosos-release-title",
							className: "mt-2 font-display text-2xl font-bold text-foreground",
							children: "ChronosOS for macOS"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted-foreground",
							children: "Native macOS app for the ChronosOS sign-in experience. Apple Silicon build; internet access is required to sign in."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 text-sm text-muted-foreground",
							"aria-live": "polite",
							children: [
								status === "loading" && "Checking GitHub for the latest release...",
								status === "empty" && "No published release yet. The installer will appear here after a release is published.",
								status === "error" && "Could not check the latest release. Browse GitHub Releases for availability.",
								status === "available" && dmg && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									release?.name || release?.tag_name,
									release?.published_at && ` · ${release.published_at.slice(0, 10)}`,
									` · ${(dmg.size / 1024 / 1024).toFixed(1)} MB`
								] }),
								status === "available" && !dmg && "A release is published, but ChronosOS.dmg is not attached yet."
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex shrink-0 flex-wrap gap-3",
					children: [dmg && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: dmg.browser_download_url,
						className: "inline-flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-4" }), " Download DMG"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: release?.html_url ?? "https://github.com/dimensional3dstore-gif/tedslab/releases",
						target: "_blank",
						rel: "noreferrer",
						className: "inline-flex items-center justify-center gap-2 rounded-md border border-border px-4 py-2.5 text-sm font-semibold text-foreground hover:bg-secondary",
						children: [release ? "Release notes" : "Browse releases", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "size-4" })]
					})]
				})]
			})
		})]
	}) });
}
//#endregion
export { DownloadableSoftwarePage as t };
