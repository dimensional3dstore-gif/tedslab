import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { i as useArticles } from "./AppShell-CxslfhoC.mjs";
import { t as AdminPage } from "./AdminPage-jKerhY3g.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.articles-ta2t6A5x.js
var import_jsx_runtime = require_jsx_runtime();
function AdminArticlesPage() {
	const { data: articles = [] } = useArticles();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AdminPage, {
		title: "Manage articles",
		description: "Create and preview consistent encyclopedia articles.",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-muted-foreground",
				children: [articles.length, " catalog articles available."]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/admin/articles/new",
				className: "rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground",
				children: "New article"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-3 md:grid-cols-2",
			children: articles.slice(0, 12).map((article) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/articles/$slug",
				params: { slug: article.slug },
				className: "bio-panel p-4 hover:border-primary/50",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-semibold text-foreground",
					children: article.title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-xs text-muted-foreground",
					children: article.published ? "Published" : "Draft"
				})]
			}, article.id))
		})]
	});
}
//#endregion
export { AdminArticlesPage as component };
