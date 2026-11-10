import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { Kt as ChevronRight, Vt as CirclePlay, tn as BookOpenText } from "../_libs/lucide-react.mjs";
import { d as description$1 } from "./router-BOjcgrMn2.mjs";
import { n as PageHeader, t as AppShell } from "./AppShell-BSLOU_FO.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/tutorials-aU_WjurL.js
var import_jsx_runtime = require_jsx_runtime();
var tutorials = [
	{
		slug: "getting-started",
		title: "Getting Started with Ted's Lab",
		duration: "4 min",
		description: "Learn how to browse subjects, save articles, and start your study journey.",
		videoUrl: "https://www.youtube.com/watch?v=ysz5S6PUM-U"
	},
	{
		slug: "using-notes",
		title: "How to Use the Notes Tool",
		duration: "3 min",
		description: "Capture study summaries, quick ideas, and revision reflections in your notebook.",
		videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
	},
	{
		slug: "using-ai-tutor",
		title: "Using the AI Tutor",
		duration: "5 min",
		description: "Ask focused questions, get study explanations, and turn content into revision prompts.",
		videoUrl: "https://www.youtube.com/watch?v=aqz-KE-bpKQ"
	},
	{
		slug: "saving-content",
		title: "Saving and Organizing Study Content",
		duration: "4 min",
		description: "Bookmark articles and build a personal learning library that is easy to revisit.",
		videoUrl: "https://www.youtube.com/watch?v=ScMzIvxBSi4"
	}
];
function TutorialsPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: "Video tutorials",
		description: description$1
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-2",
		children: tutorials.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/videos/$slug",
			params: { slug: item.slug },
			className: "bio-panel flex flex-col overflow-hidden transition-colors hover:border-primary/50",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "aspect-video w-full bg-gradient-to-br from-primary/15 via-secondary to-muted" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute inset-0 flex items-center justify-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex size-14 items-center justify-center rounded-full bg-background/80 text-primary shadow-sm backdrop-blur-sm",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CirclePlay, { className: "size-7" })
					})
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-1 flex-col p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-1 text-[10px] font-medium uppercase tracking-[0.12em] text-primary",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpenText, { className: "size-3" }), "Tutorial"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[11px] text-muted-foreground",
							children: item.duration
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-3 text-lg font-semibold text-foreground",
						children: item.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm leading-relaxed text-muted-foreground",
						children: item.description
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary",
						children: ["Watch tutorial", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-4" })]
					})
				]
			})]
		}, item.slug))
	})] });
}
//#endregion
export { TutorialsPage as component };
