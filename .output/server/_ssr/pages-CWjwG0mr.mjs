import { x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { C as description$5 } from "./router-DQlVO8DL.mjs";
import { r as resolveImage } from "./images-BfzzCxZw.mjs";
import { n as PageHeader, s as usePages, t as AppShell } from "./AppShell-8wnhzt2S.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/pages-CWjwG0mr.js
var import_jsx_runtime = require_jsx_runtime();
function PagesListPage() {
	const { data: pages = [], isLoading } = usePages();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: (q) => {
		const filtered = pages.filter((p) => p.published).filter((p) => !q || `${p.title} ${p.description ?? ""}`.toLowerCase().includes(q));
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				title: "All Pages",
				description: description$5
			}),
			isLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-6 text-sm text-muted-foreground",
				children: "Loading pages…"
			}),
			!isLoading && filtered.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-6 text-sm text-muted-foreground",
				children: "No pages match your search."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 space-y-3",
				children: filtered.map((page) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: `/pages/$slug`,
					params: { slug: page.slug },
					className: "flex items-start gap-4 bio-panel p-4 transition-colors hover:border-primary/50",
					children: [page.image_url && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: resolveImage(page.image_url, null),
						alt: page.title,
						loading: "lazy",
						width: 200,
						height: 120,
						className: "h-24 w-32 shrink-0 object-cover rounded-md"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex-1 min-w-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-sm font-semibold text-foreground",
								children: page.title
							}),
							page.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-xs leading-relaxed text-muted-foreground line-clamp-3",
								children: page.description
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-xs text-primary font-semibold",
								children: "Read more →"
							})
						]
					})]
				}, page.id))
			})
		] });
	} });
}
//#endregion
export { PagesListPage as component };
