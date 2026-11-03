import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { g as glossary } from "./router-Dgs_r0rK.mjs";
import { b as description$7 } from "./router-Dgs_r0rK2.mjs";
import { n as PageHeader, t as AppShell } from "./AppShell-CxslfhoC.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/glossary-Cyiciegy.js
var import_jsx_runtime = require_jsx_runtime();
function GlossaryPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: (q) => {
		const items = q ? glossary.filter((g) => `${g.term} ${g.definition}`.toLowerCase().includes(q)) : glossary;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Glossary",
			description: description$7
		}), items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-6 text-sm text-muted-foreground",
			children: "No terms match your search."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
			className: "mt-6 divide-y divide-border bio-panel",
			children: items.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-1 p-4 sm:grid-cols-[10rem_1fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
					className: "text-sm font-semibold text-primary",
					children: g.term
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
					className: "text-sm text-muted-foreground",
					children: g.definition
				})]
			}, g.term))
		})] });
	} });
}
//#endregion
export { GlossaryPage as component };
