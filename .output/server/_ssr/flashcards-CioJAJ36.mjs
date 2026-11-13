import { r as __toESM } from "../_runtime.mjs";
import { p as flashcards } from "./catalog-Du59BVWX.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { E as description$8 } from "./router-BZHCnLnl.mjs";
import { n as PageHeader, t as AppShell } from "./AppShell-6_41dtv3.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/flashcards-CioJAJ36.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function FlashcardsPage() {
	const [flipped, setFlipped] = (0, import_react.useState)([]);
	const toggle = (front) => setFlipped((p) => p.includes(front) ? p.filter((f) => f !== front) : [...p, front]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: (q) => {
		const items = q ? flashcards.filter((c) => `${c.front} ${c.back}`.toLowerCase().includes(q)) : flashcards;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Flashcards",
			description: description$8
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3",
			children: items.map((c) => {
				const isFlipped = flipped.includes(c.front);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => toggle(c.front),
					className: "flex h-36 flex-col items-center justify-center bio-panel p-4 text-center transition-colors hover:border-primary/50",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: isFlipped ? "text-sm text-muted-foreground" : "text-base font-semibold",
						children: isFlipped ? c.back : c.front
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mt-3 text-xs text-primary",
						children: isFlipped ? "Show term" : "Reveal definition"
					})]
				}, c.front);
			})
		})] });
	} });
}
//#endregion
export { FlashcardsPage as component };
