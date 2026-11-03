import { r as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { Ht as CircleCheck, L as Radio, Wt as CircleAlert, an as ArrowUpRight, jt as Earth, ln as Activity, ot as LockKeyhole } from "../_libs/lucide-react.mjs";
import { r as supabaseAuthConfigured } from "./auth-CLCnuokL.mjs";
import { n as PageHeader, t as AppShell } from "./AppShell-CxslfhoC.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dev-dashboard-Cj6JXo6q.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function DeveloperDashboard() {
	const [online, setOnline] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		const updateOnline = () => setOnline(navigator.onLine);
		updateOnline();
		window.addEventListener("online", updateOnline);
		window.addEventListener("offline", updateOnline);
		return () => {
			window.removeEventListener("online", updateOnline);
			window.removeEventListener("offline", updateOnline);
		};
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-7",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-end justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
					title: "Developer dashboard",
					description: "Live checks from this browser session and its configured services."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "mb-1 inline-flex items-center gap-2 rounded-md border border-border px-3 py-2 text-xs text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { className: "size-3.5 text-primary" }), " Client diagnostics"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				"aria-label": "Runtime checks",
				className: "grid gap-3 sm:grid-cols-3",
				children: [
					{
						name: "Browser network",
						detail: online === null ? "Checking connection" : online ? "Browser reports an active connection" : "Browser is offline",
						state: online === null ? "checking" : online ? "ready" : "attention",
						icon: Earth
					},
					{
						name: "Account authentication",
						detail: supabaseAuthConfigured ? "Supabase credentials are configured" : "Supabase credentials are missing",
						state: supabaseAuthConfigured ? "ready" : "attention",
						icon: LockKeyhole
					},
					{
						name: "Application route",
						detail: "Developer dashboard is responding in this browser session",
						state: "ready",
						icon: Radio
					}
				].map(({ name, detail, state, icon: Icon }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "bio-panel min-w-0 p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "grid size-9 place-items-center rounded-md bg-secondary text-foreground",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4" })
							}), state === "ready" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-4 text-primary" }) : state === "attention" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "size-4 text-bio-amber" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-2 animate-pulse rounded-full bg-muted-foreground" })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-5 text-sm font-semibold text-foreground",
							children: name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 min-h-10 text-sm leading-relaxed text-muted-foreground",
							children: detail
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 border-t border-border pt-3 text-[11px] uppercase tracking-[0.12em] text-muted-foreground",
							children: state === "ready" ? "Ready" : state === "attention" ? "Needs attention" : "Checking"
						})
					]
				}, name))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "bio-panel overflow-hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-semibold text-foreground",
						children: "Connected surfaces"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: "Jump to the configured areas this dashboard can verify."
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "font-mono text-xs text-muted-foreground",
						children: ["MODE: ", "production".toUpperCase()]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "divide-y divide-border",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SurfaceRow, {
							title: "ChronosOS sign-in",
							path: "/chronos-os",
							detail: "Login-only OS access surface"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SurfaceRow, {
							title: "Article management",
							path: "/admin/articles",
							detail: "Content authoring and review"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SurfaceRow, {
							title: "Knowledge atlas",
							path: "/knowledge-atlas",
							detail: "Browse linked topics and concepts"
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs leading-relaxed text-muted-foreground",
				children: "These checks reflect this browser and build configuration. They do not represent remote uptime or deployment health."
			})
		]
	}) });
}
function SurfaceRow({ title, path, detail }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: path,
		className: "group flex flex-wrap items-center justify-between gap-3 px-5 py-4 transition-colors hover:bg-secondary/50",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "block text-sm font-medium text-foreground",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "mt-1 block text-xs text-muted-foreground",
			children: detail
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "inline-flex items-center gap-2 font-mono text-xs text-muted-foreground group-hover:text-primary",
			children: [
				path,
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "size-3.5" })
			]
		})]
	});
}
//#endregion
export { DeveloperDashboard as component };
