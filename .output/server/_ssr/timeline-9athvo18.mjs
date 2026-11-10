import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { h as fullTimeline } from "./router-uL0v7Ugr.mjs";
import { h as description$2 } from "./router-uL0v7Ugr2.mjs";
import { n as PageHeader, t as AppShell } from "./AppShell-C9zRSJym.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/timeline-9athvo18.js
var import_jsx_runtime = require_jsx_runtime();
function TimelinePage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: (q) => {
		const items = q ? fullTimeline.filter((t) => `${t.when} ${t.what} ${t.detail}`.toLowerCase().includes(q)) : fullTimeline;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Timeline of Life",
			description: description$2
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
			className: "mt-6 space-y-4 border-l border-border pl-6",
			children: items.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "relative",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute -left-[1.9rem] top-1.5 size-3 rounded-full bg-primary" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-semibold tracking-wide text-bio-cyan",
						children: t.when
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-sm font-semibold",
						children: t.what
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs text-muted-foreground",
						children: t.detail
					})
				]
			}, t.when + t.what))
		})] });
	} });
}
//#endregion
export { TimelinePage as component };
