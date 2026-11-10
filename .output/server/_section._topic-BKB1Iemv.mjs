import { _ as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { o as require_jsx_runtime } from "./_libs/@radix-ui/react-collection+[...].mjs";
import { r as useQuery } from "./_libs/tanstack__react-query.mjs";
import { sn as ArrowLeft } from "./_libs/lucide-react.mjs";
import { M as topicArticlesQueryOptions$1, O as sectionQueryOptions$2, P as topicQueryOptions$1, a as Route$22 } from "./_ssr/router-BOjcgrMn2.mjs";
import { r as resolveImage } from "./_ssr/images-BfzzCxZw.mjs";
import { t as ArticleCard } from "./_ssr/ArticleCard-DOSfw5Q1.mjs";
import { a as useBookmarks, t as AppShell } from "./_ssr/AppShell-BSLOU_FO.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_section._topic-BKB1Iemv.js
var import_jsx_runtime = require_jsx_runtime();
function TopicDetailPage() {
	const { subject: subjectSlug, section: sectionSlug, topic: topicSlug } = Route$22.useParams();
	const { section: initialSection, topic: initialTopic, articles: initialArticles } = Route$22.useLoaderData();
	const { bookmarks, toggleBookmark } = useBookmarks();
	const { data: section } = useQuery({
		...sectionQueryOptions$2(sectionSlug),
		initialData: initialSection
	});
	const { data: topic } = useQuery({
		...topicQueryOptions$1(sectionSlug, topicSlug),
		initialData: initialTopic
	});
	const { data: articles = [] } = useQuery({
		...topicArticlesQueryOptions$1(topicSlug),
		initialData: initialArticles
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: (q) => {
		const filtered = articles.filter((a) => !q || `${a.title} ${a.excerpt ?? ""}`.toLowerCase().includes(q));
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: `/${subjectSlug}/${sectionSlug}`,
			className: "inline-flex items-center gap-2 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-3.5" }),
				"Back to ",
				section?.title
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
					className: "bio-panel p-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex items-start gap-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex-1 min-w-0",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
									className: "font-display text-3xl font-bold text-foreground break-words",
									children: topic.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground",
									children: topic.blurb
								}),
								section && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-4 flex items-center gap-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: `/${subjectSlug}/${sectionSlug}`,
										className: "inline-block px-2.5 py-1 rounded-md text-xs font-medium bg-primary/10 text-primary hover:bg-primary/20 transition-colors",
										children: section.title
									})
								})
							]
						})
					})
				}),
				topic.image_url && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6 overflow-hidden rounded-lg",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: resolveImage(topic.image_url, null),
						alt: topic.title,
						className: "w-full",
						loading: "eager"
					})
				}),
				topic.body && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6 bio-panel p-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "prose prose-sm max-w-none dark:prose-invert",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { dangerouslySetInnerHTML: { __html: topic.body } })
					})
				}),
				articles.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-8 flex items-center justify-between",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm font-semibold text-foreground",
						children: [
							"Related Articles (",
							filtered.length,
							")"
						]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
					children: filtered.map((article) => {
						const saved = bookmarks.includes(article.slug);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArticleCard, {
							article,
							saved,
							onBookmarkClick: toggleBookmark
						}, article.id);
					})
				})] })
			]
		})] });
	} });
}
//#endregion
export { TopicDetailPage as component };
