import { r as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { Mt as Download, an as ArrowUpRight, i as Wifi, ot as LockKeyhole } from "../_libs/lucide-react.mjs";
import { t as tech_computing_default } from "./tech-computing-DpkU6ve8.mjs";
import { t as getChronosOSDownloadUrl } from "./chronos-os-download-B3pWPTg4.mjs";
import { t as AuthForm } from "./AuthForm-CKfCrFRg.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/chronos-os-CRCb6rXY.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ChronosOSLogin() {
	const [now, setNow] = (0, import_react.useState)(() => /* @__PURE__ */ new Date());
	const chronosDownloadUrl = getChronosOSDownloadUrl();
	(0, import_react.useEffect)(() => {
		const timer = window.setInterval(() => setNow(/* @__PURE__ */ new Date()), 3e4);
		return () => window.clearInterval(timer);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "relative flex min-h-dvh flex-col overflow-hidden bg-background",
		style: {
			backgroundImage: `linear-gradient(90deg, rgb(8 14 18 / 82%), rgb(8 14 18 / 56%)), url(${tech_computing_default})`,
			backgroundPosition: "center",
			backgroundSize: "cover"
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "relative z-10 flex h-14 items-center justify-between border-b border-white/10 bg-black/20 px-5 backdrop-blur-md sm:px-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3 text-sm font-semibold tracking-[0.08em] text-white",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "grid size-7 place-items-center rounded-md border border-white/20 bg-white/10 font-display text-xs",
							children: "C"
						}),
						"CHRONOSOS",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "hidden text-xs font-normal tracking-normal text-white/55 sm:inline",
							children: "SESSION GATE"
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 text-xs text-white/75",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wifi, { className: "size-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "SECURE CONNECTION" })]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative z-10 mx-auto grid w-full max-w-6xl flex-1 items-center gap-12 px-5 py-12 md:grid-cols-[1fr_420px] md:px-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "text-white",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-medium uppercase tracking-[0.2em] text-white/65",
							children: now.toLocaleDateString(void 0, {
								weekday: "long",
								month: "long",
								day: "numeric"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 font-display text-6xl font-semibold tabular-nums sm:text-8xl",
							children: now.toLocaleTimeString([], {
								hour: "2-digit",
								minute: "2-digit"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mt-7 max-w-xl font-display text-3xl font-semibold sm:text-4xl",
							children: "Your workspace, in its own time."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 max-w-md text-sm leading-relaxed text-white/70",
							children: "Sign in to continue. ChronosOS keeps this experience focused on secure account access."
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "w-full rounded-xl border border-white/15 bg-background/90 p-5 shadow-2xl backdrop-blur-xl sm:p-7",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-5 flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid size-10 place-items-center rounded-lg bg-primary/10 text-primary",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LockKeyhole, { className: "size-5" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-lg font-semibold text-foreground",
							children: "Sign in to ChronosOS"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: "Use your Ted's Lab account"
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthForm, {
						mode: "signin",
						showSignupLink: false,
						redirectAfterSignIn: false
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
				className: "relative z-10 flex flex-col gap-3 border-t border-white/10 bg-black/20 px-5 py-4 text-xs text-white/65 backdrop-blur-md sm:flex-row sm:items-center sm:justify-between sm:px-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "inline-flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-1.5 rounded-full bg-primary" }), " Ted's Lab account services"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: chronosDownloadUrl,
						download: "ChronosOS.dmg",
						className: "inline-flex items-center gap-1.5 hover:text-white",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-3.5" }), " Download DMG"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/download",
						className: "inline-flex items-center gap-1.5 hover:text-white",
						children: ["Get ChronosOS for Mac ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "size-3.5" })]
					})]
				})]
			})
		]
	});
}
//#endregion
export { ChronosOSLogin as component };
