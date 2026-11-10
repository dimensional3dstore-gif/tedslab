import { l as useLocation, p as Outlet } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { m as description$12 } from "./router-BOjcgrMn2.mjs";
import { t as ArticleCard } from "./ArticleCard-DOSfw5Q1.mjs";
import { i as useArticles, n as PageHeader, t as AppShell } from "./AppShell-BSLOU_FO.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/articles-D2241V6T.js
var import_jsx_runtime = require_jsx_runtime();
function ArticlesPage() {
	const { pathname } = useLocation();
	const { data: articles = [], isLoading } = useArticles();
	if (pathname !== "/articles") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: (q) => {
		const filtered = articles.filter((a) => a.published).filter((a) => !q || `${a.title} ${a.excerpt ?? ""}`.toLowerCase().includes(q));
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				title: "All Articles",
				description: description$12
			}),
			isLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-6 text-sm text-muted-foreground",
				children: "Loading articles…"
			}),
			!isLoading && filtered.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-6 text-sm text-muted-foreground",
				children: "No articles match your search."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
				children: filtered.map((article) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArticleCard, {
					article,
					showBookmark: false,
					variant: "default"
				}, article.id))
			})
		] });
	} });
}
//#endregion
export { ArticlesPage as component };
