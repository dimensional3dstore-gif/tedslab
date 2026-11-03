import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { p as description$11 } from "./router-Dgs_r0rK2.mjs";
import { c as useSections, n as PageHeader, t as AppShell, u as useSubjects } from "./AppShell-CxslfhoC.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/categories-Bamf3coX.js
var import_jsx_runtime = require_jsx_runtime();
function CategoriesPage() {
	const { data: subjects } = useSubjects();
	const { data: sections } = useSections();
	const items = subjects ?? [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: (q) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: "All Categories",
		description: description$11
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3",
		children: items.filter((s) => !q || `${s.title} ${s.description ?? ""}`.toLowerCase().includes(q)).map((s) => {
			const topicCount = (sections ?? []).filter((sec) => sec.subject_id === s.id).length;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: `/${s.slug}`,
				className: "block bio-panel p-4 transition-colors hover:border-primary/50",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-sm font-semibold",
						children: s.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-xs leading-relaxed text-muted-foreground",
						children: s.description
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-3 text-xs text-primary",
						children: [topicCount, " sections"]
					})
				]
			}, s.id);
		})
	})] }) });
}
//#endregion
export { CategoriesPage as component };
