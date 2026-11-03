import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { Mt as Download, X as MonitorDown } from "../_libs/lucide-react.mjs";
import { n as PageHeader, t as AppShell } from "./AppShell-CxslfhoC.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/downloadable-software-Ch-bdwWR.js
var import_jsx_runtime = require_jsx_runtime();
function DownloadableSoftwarePage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto w-full max-w-4xl space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				title: "Software downloads",
				description: "Current desktop software distributed by Ted's Lab."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-semibold uppercase tracking-[0.14em] text-primary",
					children: "Desktop software"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-2 font-display text-3xl font-bold text-foreground",
					children: "ChronosOS"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground",
					children: "A native macOS window for the login-only ChronosOS experience."
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "flex flex-col gap-4 rounded-lg border border-border bg-card p-5 sm:flex-row sm:items-center sm:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MonitorDown, { className: "mt-0.5 size-5 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-semibold text-foreground",
						children: "macOS disk image"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: "Apple Silicon build. Internet access is required to reach the hosted sign-in page."
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: "/downloads/ChronosOS.dmg",
					download: true,
					className: "inline-flex shrink-0 items-center justify-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-4" }), "Download DMG"]
				})]
			})
		]
	}) });
}
var SplitComponent = DownloadableSoftwarePage;
//#endregion
export { SplitComponent as component };
