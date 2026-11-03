import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as Route$15 } from "./router-Dgs_r0rK2.mjs";
import { i as useArticles, r as fallbackArticles } from "./AppShell-CxslfhoC.mjs";
import { t as ArticleTemplate } from "./ArticleTemplate-Bgz4f0vg.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/articles._slug-COdIzgTk.js
var import_jsx_runtime = require_jsx_runtime();
function ArticleDetailPage() {
	const { slug } = Route$15.useParams();
	const { data: articles = [], isLoading } = useArticles();
	const article = (articles.length > 0 ? articles : fallbackArticles).find((a) => a.slug === slug) ?? fallbackArticles.find((a) => a.slug === slug);
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "p-6 text-sm text-muted-foreground",
		children: "Loading article..."
	});
	if (!article) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "p-6 text-sm text-muted-foreground",
		children: "Article not found."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArticleTemplate, {
		article,
		related: articles
	});
}
//#endregion
export { ArticleDetailPage as component };
