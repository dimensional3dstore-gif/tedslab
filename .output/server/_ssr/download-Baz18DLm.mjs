import { x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { Mt as Download, O as Sparkles, k as ShieldCheck, tn as BookOpenText } from "../_libs/lucide-react.mjs";
import { D as description$9 } from "./router-DQlVO8DL.mjs";
import { n as getChronosOSDownloadUrl } from "./chronos-os-download-B2Z6-JA2.mjs";
import { t as AppShell } from "./AppShell-8wnhzt2S.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/download-Baz18DLm.js
var import_jsx_runtime = require_jsx_runtime();
function DownloadPage() {
	const chronosDownloadUrl = getChronosOSDownloadUrl();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "bio-panel overflow-hidden p-6 md:p-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "max-w-2xl",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium uppercase tracking-[0.12em] text-primary",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-3.5" }), "ChronosOS for Mac"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "mt-4 font-display text-3xl font-bold text-foreground md:text-5xl",
								children: "A focused desktop entry to Ted's Lab"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base",
								children: description$9
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-6 flex flex-wrap gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: chronosDownloadUrl,
									download: "ChronosOS.dmg",
									className: "inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90",
									children: ["Download for macOS", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-4" })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/chronos-os",
									className: "inline-flex items-center gap-2 rounded-lg border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary",
									children: "Open web login"
								})]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-3 rounded-2xl border border-border bg-card/80 p-4 text-sm text-muted-foreground shadow-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl bg-secondary p-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs uppercase tracking-[0.12em] text-primary",
								children: "Desktop package"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 font-medium text-foreground",
								children: "macOS DMG installer"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl bg-secondary p-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs uppercase tracking-[0.12em] text-primary",
								children: "Sign-in surface"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 font-medium text-foreground",
								children: "ChronosOS login only"
							})]
						})]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "grid gap-4 md:grid-cols-3",
				children: [
					{
						icon: BookOpenText,
						title: "Curated content",
						description: "Open the ChronosOS login from a native macOS window."
					},
					{
						icon: Sparkles,
						title: "Smarter revision",
						description: "Use the existing Ted's Lab account and Supabase sign-in flow."
					},
					{
						icon: ShieldCheck,
						title: "Secure access",
						description: "The installer is an unsigned desktop wrapper around the hosted login page."
					}
				].map(({ icon: Icon, title: cardTitle, description: cardDescription }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bio-panel p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-4 text-lg font-semibold text-foreground",
							children: cardTitle
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm leading-relaxed text-muted-foreground",
							children: cardDescription
						})
					]
				}, cardTitle))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "bio-panel p-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-4 md:flex-row md:items-center md:justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-semibold uppercase tracking-[0.12em] text-primary",
						children: "ChronosOS login"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-2 text-2xl font-semibold text-foreground",
						children: "Get the desktop app or sign in on the web."
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: chronosDownloadUrl,
							download: "ChronosOS.dmg",
							className: "inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90",
							children: "Download DMG"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/chronos-os",
							className: "inline-flex items-center justify-center rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground hover:bg-secondary",
							children: "Open login"
						})]
					})]
				})
			})
		]
	}) });
}
//#endregion
export { DownloadPage as component };
