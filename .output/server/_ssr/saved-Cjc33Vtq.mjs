import { v as sections } from "./catalog-Du59BVWX.mjs";
import { x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { $t as Bookmark } from "../_libs/lucide-react.mjs";
import { x as description$3 } from "./router-DQlVO8DL.mjs";
import { a as useBookmarks, n as PageHeader, t as AppShell } from "./AppShell-8wnhzt2S.mjs";
import { t as articles } from "./biopedia-data-CPw6dQS_.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/saved-Cjc33Vtq.js
var import_jsx_runtime = require_jsx_runtime();
function label(id) {
	const article = articles.find((a) => a.slug === id);
	if (article) return {
		name: article.title,
		where: "Featured article",
		to: "/"
	};
	const [slug, topic] = id.split("/");
	const section = sections.find((s) => s.slug === slug);
	return {
		name: topic ?? id,
		where: section?.title ?? "Ted's Lab",
		to: `/${slug ?? ""}`
	};
}
function SavedPage() {
	const { bookmarks, toggleBookmark } = useBookmarks();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: "Saved Content",
		description: description$3
	}), bookmarks.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "mt-6 text-sm text-muted-foreground",
		children: "Nothing saved yet — tap the bookmark icon on any topic or article."
	}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "mt-6 space-y-3",
		children: bookmarks.map((id) => {
			const item = label(id);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "flex items-center gap-3 bio-panel p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-semibold",
						children: item.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: item.to,
						className: "text-xs text-primary hover:underline",
						children: item.where
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					"aria-label": `Remove ${item.name}`,
					onClick: () => toggleBookmark(id),
					className: "text-primary",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bookmark, { className: "size-4 fill-current" })
				})]
			}, id);
		})
	})] });
}
//#endregion
export { SavedPage as component };
