import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { $t as Bookmark, Kt as ChevronRight, Rt as Clock } from "../_libs/lucide-react.mjs";
import { r as resolveImage } from "./images-BfzzCxZw.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ArticleCard-DOSfw5Q1.js
var import_jsx_runtime = require_jsx_runtime();
function ArticleCard({ article, saved = false, onBookmarkClick, showBookmark = true, showReadTime = true, variant = "default", link, className }) {
	const imageHeight = variant === "featured" ? "h-32" : variant === "compact" ? "h-20" : "h-40";
	const articleSlug = article.slug?.trim();
	const destination = link ?? (articleSlug ? `/articles/${articleSlug}` : "/articles");
	const topicLabel = article.topic_slug?.replace(/-/g, " ") ?? "Article";
	const subjectLabel = article.subject_slug?.replace(/-/g, " ") ?? "General";
	const summary = article.excerpt && article.excerpt.length > 140 ? `${article.excerpt.slice(0, 140).trim()}…` : article.excerpt ?? "";
	const metaLine = [subjectLabel, article.minutes ? `${article.minutes} min` : null].filter(Boolean).join(" • ");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: destination,
		className: `group flex flex-col overflow-hidden bio-panel transition-all duration-200 hover:border-primary/50 hover:shadow-md ${className ?? ""}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative overflow-hidden bg-secondary",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: resolveImage(article.image_url, article.image_key),
				alt: article.title,
				loading: "lazy",
				width: 512,
				height: 288,
				className: `w-full object-cover transition-transform duration-300 group-hover:scale-105 ${imageHeight}`
			}), article.tone && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute top-2 right-2 inline-block px-2 py-1 rounded-md text-xs font-medium bg-black/50 text-white",
				children: article.tone
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-1 flex-col p-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-2 flex items-center justify-between gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "rounded-full border border-primary/20 bg-primary/5 px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.08em] text-primary",
						children: topicLabel
					}), showReadTime && article.minutes && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "inline-flex items-center gap-1 text-[10px] text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "size-3" }),
							article.minutes,
							" min"
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-sm font-semibold leading-snug text-foreground group-hover:text-primary transition-colors",
					children: article.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-1 text-[10px] font-medium uppercase tracking-[0.08em] text-muted-foreground",
					children: metaLine
				}),
				summary && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-xs leading-relaxed text-muted-foreground",
					children: summary
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex items-center justify-between gap-3 border-t border-border/80 pt-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex items-center gap-2 text-[10px] text-muted-foreground",
						children: article.section_slug && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "rounded bg-secondary px-1.5 py-0.5 uppercase tracking-wide",
							children: article.section_slug.replace(/-/g, " ")
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [showBookmark && onBookmarkClick && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: (e) => {
								e.preventDefault();
								e.stopPropagation();
								onBookmarkClick(article.slug);
							},
							"aria-pressed": saved,
							"aria-label": saved ? `Remove bookmark` : `Bookmark`,
							className: `transition-colors ${saved ? "text-primary" : "text-muted-foreground hover:text-foreground"}`,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bookmark, { className: `size-4 ${saved ? "fill-current" : ""}` })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-3.5 text-muted-foreground group-hover:text-primary transition-colors" })]
					})]
				})
			]
		})]
	});
}
//#endregion
export { ArticleCard as t };
