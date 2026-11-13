import { r as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { A as Settings2, Jt as Check, M as Search, Nt as Database, Ot as FileCodeCorner, Pt as Copy, en as BookOpenText, r as Workflow } from "../_libs/lucide-react.mjs";
import { r as supabaseAuthConfigured } from "./auth-CLCnuokL.mjs";
import { n as PageHeader, t as AppShell } from "./AppShell-6_41dtv3.mjs";
import { t as Input } from "./input-Ctxrk36z.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dev-tools-BhqoQv-g.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var tools = [
	{
		title: "Article studio",
		category: "Content",
		description: "Create and review encyclopedia articles.",
		path: "/admin/articles",
		icon: BookOpenText
	},
	{
		title: "Page registry",
		category: "Content",
		description: "Manage published pages and their metadata.",
		path: "/admin/pages",
		icon: FileCodeCorner
	},
	{
		title: "Topic structure",
		category: "Content",
		description: "Inspect sections, topics, and their hierarchy.",
		path: "/admin/topics",
		icon: Workflow
	},
	{
		title: "Knowledge atlas",
		category: "Explore",
		description: "Navigate the linked concept graph.",
		path: "/knowledge-atlas",
		icon: Database
	},
	{
		title: "Account settings",
		category: "System",
		description: "Inspect profile and account preferences.",
		path: "/settings",
		icon: Settings2
	}
];
var categories = [
	"All",
	"Content",
	"Explore",
	"System"
];
function DeveloperTools() {
	const [query, setQuery] = (0, import_react.useState)("");
	const [category, setCategory] = (0, import_react.useState)("All");
	const [copyState, setCopyState] = (0, import_react.useState)("idle");
	const filteredTools = (0, import_react.useMemo)(() => {
		const normalizedQuery = query.trim().toLowerCase();
		return tools.filter((tool) => {
			const matchesCategory = category === "All" || tool.category === category;
			const matchesQuery = !normalizedQuery || `${tool.title} ${tool.description} ${tool.path}`.toLowerCase().includes(normalizedQuery);
			return matchesCategory && matchesQuery;
		});
	}, [category, query]);
	const copyDiagnostics = async () => {
		const report = {
			origin: window.location.origin,
			route: window.location.pathname,
			mode: "production",
			online: navigator.onLine,
			authConfigured: supabaseAuthConfigured,
			userAgent: navigator.userAgent,
			capturedAt: (/* @__PURE__ */ new Date()).toISOString()
		};
		try {
			await navigator.clipboard.writeText(JSON.stringify(report, null, 2));
			setCopyState("copied");
		} catch {
			setCopyState("error");
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-7",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				title: "Developer tools",
				description: "A route-indexed workbench for content, system settings, and knowledge exploration."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "bio-panel p-4 sm:p-5",
				"aria-label": "Find developer tools",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative w-full lg:max-w-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: query,
							onChange: (event) => setQuery(event.target.value),
							placeholder: "Search tools or routes",
							className: "pl-9",
							"aria-label": "Search tools or routes"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap gap-1 rounded-md border border-border p-1",
						"aria-label": "Filter by category",
						children: categories.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							"aria-pressed": category === item,
							onClick: () => setCategory(item),
							className: `rounded px-3 py-1.5 text-xs font-medium transition-colors ${category === item ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-secondary hover:text-foreground"}`,
							children: item
						}, item))
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "grid gap-3 md:grid-cols-2",
				"aria-label": "Developer tools list",
				children: [filteredTools.map(({ title, category: toolCategory, description, path, icon: Icon }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: path,
					className: "bio-panel group flex min-w-0 items-start gap-4 p-5 transition-colors hover:border-primary/50 hover:bg-secondary/30",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "grid size-10 shrink-0 place-items-center rounded-md border border-border bg-secondary text-primary",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-5" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "min-w-0 flex-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex flex-wrap items-center justify-between gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold text-foreground",
									children: title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] uppercase tracking-[0.12em] text-muted-foreground",
									children: toolCategory
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mt-1 block text-sm leading-relaxed text-muted-foreground",
								children: description
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mt-3 block truncate font-mono text-xs text-primary",
								children: path
							})
						]
					})]
				}, path)), filteredTools.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "col-span-full rounded-md border border-dashed border-border px-5 py-8 text-center text-sm text-muted-foreground",
					children: "No tools match this search."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "flex flex-col gap-4 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-sm font-semibold text-foreground",
						children: "Runtime diagnostics"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: "Copy browser, route, and auth configuration details for a bug report."
					}),
					copyState === "error" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						role: "alert",
						className: "mt-2 text-xs text-destructive",
						children: "Clipboard access failed. Open this page in a secure browser context and retry."
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: copyDiagnostics,
					className: "inline-flex shrink-0 items-center justify-center gap-2 rounded-md border border-border px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary",
					children: [copyState === "copied" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4 text-primary" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-4" }), copyState === "copied" ? "Copied" : "Copy diagnostics"]
				})]
			})
		]
	}) });
}
//#endregion
export { DeveloperTools as component };
