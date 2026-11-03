import { r as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { Bt as CircleQuestionMark, N as Search, an as ArrowUpRight } from "../_libs/lucide-react.mjs";
import { n as PageHeader, t as AppShell } from "./AppShell-CxslfhoC.mjs";
import { t as Input } from "./input-Ctxrk36z.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/help-center-BK0mMw43.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var helpTopics = [
	{
		category: "Getting started",
		title: "Finding an article or subject",
		summary: "Browse by subject or search titles, topics, and article text.",
		details: "Use the sidebar to open a subject and its sections, or visit All Articles for the complete published index.",
		to: "/articles",
		linkLabel: "Browse articles"
	},
	{
		category: "Accounts",
		title: "Signing in and saved work",
		summary: "Your account keeps supported saved-content features associated with your profile.",
		details: "Sign in with the account connected to this deployment. If sign-in is unavailable, confirm the Supabase account service has been configured by the site administrator.",
		to: "/auth",
		linkLabel: "Open sign in"
	},
	{
		category: "Study tools",
		title: "Using Chronium AI with a local model",
		summary: "Connect to a running oMLX server, discover a model, load it, then start chat.",
		details: "The default server address is http://127.0.0.1:8000. The app checks /v1/models and loads a selected model through oMLX before enabling chat. In a normal browser, the oMLX CORS allowlist must include this site's origin; the packaged desktop bridge uses loopback access.",
		to: "/llm",
		linkLabel: "Open Chronium AI"
	},
	{
		category: "Study tools",
		title: "Translation provider setup",
		summary: "Translation requires a compatible provider endpoint configured for the deployment.",
		details: "The translator posts text, source language, and target language to VITE_TRANSLATE_API_URL. If that setting is absent, the page reports that translation is not configured instead of showing a fake result.",
		to: "/translate",
		linkLabel: "Open translator"
	},
	{
		category: "Desktop app",
		title: "Installing ChronosOS on Mac",
		summary: "Download the Apple Silicon DMG and open the disk image on a compatible Mac.",
		details: "The current DMG is unsigned and requires internet access for the hosted sign-in page. macOS may show a first-open security warning. The desktop download is large; if a deployment host rejects it, publish the DMG through an artifact host and update the download URL.",
		to: "/download",
		linkLabel: "Download ChronosOS"
	},
	{
		category: "Reference",
		title: "Reading Lost Planet records",
		summary: "Each species page distinguishes known records from estimates and unresolved causes.",
		details: "Extinction dates can refer to a last confirmed sighting, a final captive animal, or a broad prehistoric interval. The record explains which kind of evidence is available and flags uncertain causes.",
		to: "/lost-atlas",
		linkLabel: "Explore Lost Planet"
	}
];
var categories = ["All topics", ...new Set(helpTopics.map((topic) => topic.category))];
function HelpCenterPage() {
	const [query, setQuery] = (0, import_react.useState)("");
	const [category, setCategory] = (0, import_react.useState)("All topics");
	const search = query.trim().toLowerCase();
	const visibleTopics = helpTopics.filter((topic) => {
		const matchesCategory = category === "All topics" || topic.category === category;
		const matchesSearch = !search || `${topic.title} ${topic.summary} ${topic.details}`.toLowerCase().includes(search);
		return matchesCategory && matchesSearch;
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto w-full max-w-5xl space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				title: "Help Centre",
				description: "Answers for accounts, study tools, the desktop app, and the encyclopedia."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "relative block max-w-2xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "sr-only",
						children: "Search help topics"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: query,
						onChange: (event) => setQuery(event.target.value),
						placeholder: "Search help topics",
						className: "pl-9"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				role: "tablist",
				"aria-label": "Help categories",
				className: "flex flex-wrap gap-1 border-b border-border",
				children: categories.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					role: "tab",
					"aria-selected": category === item,
					onClick: () => setCategory(item),
					className: `border-b-2 px-3 py-2 text-sm ${category === item ? "border-primary font-semibold text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`,
					children: item
				}, item))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				"aria-label": "Help topics",
				className: "divide-y divide-border border-y border-border",
				children: [visibleTopics.map((topic) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
					className: "group py-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("summary", {
						className: "flex cursor-pointer list-none items-start justify-between gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "min-w-0",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block text-[10px] font-semibold uppercase tracking-[0.12em] text-primary",
									children: topic.category
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mt-1 block font-semibold text-foreground",
									children: topic.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mt-1 block text-sm text-muted-foreground",
									children: topic.summary
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleQuestionMark, { className: "mt-1 size-4 shrink-0 text-muted-foreground group-open:text-primary" })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "ml-0 mt-4 max-w-3xl border-l-2 border-primary/30 pl-4 sm:ml-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm leading-relaxed text-muted-foreground",
							children: topic.details
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: topic.to,
							className: "mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline",
							children: [topic.linkLabel, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "size-3.5" })]
						})]
					})]
				}, topic.title)), visibleTopics.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "px-4 py-8 text-center text-sm text-muted-foreground",
					children: "No help topics match that search."
				})]
			})
		]
	}) });
}
var SplitComponent = HelpCenterPage;
//#endregion
export { SplitComponent as component };
