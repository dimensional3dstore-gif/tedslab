import { r as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { _ as layoutFromArticleBody, d as SUBJECTS, i as DEFAULT_ARTICLE_LAYOUT } from "./router-Cd--I7TM.mjs";
import { n as imageKeys } from "./images-BfzzCxZw.mjs";
import { t as Button } from "./button-D0rYmyz_.mjs";
import { t as Input } from "./input-Ctxrk36z.mjs";
import { t as AdminPage } from "./AdminPage-la9vsNsK.mjs";
import { t as ArticleTemplate } from "./ArticleTemplate-98CWrH13.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.articles.new-BClFmnAY.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var KEY = "tedslab-custom-articles-v1";
function loadCustomArticles() {
	if (typeof window === "undefined") return [];
	try {
		const raw = localStorage.getItem(KEY);
		if (!raw) return [];
		const parsed = JSON.parse(raw);
		return Array.isArray(parsed) ? parsed : [];
	} catch {
		return [];
	}
}
function saveCustomArticles(articles) {
	localStorage.setItem(KEY, JSON.stringify(articles));
}
function upsertCustomArticle(article) {
	const all = loadCustomArticles();
	const idx = all.findIndex((a) => a.id === article.id || a.slug === article.slug);
	if (idx >= 0) all[idx] = article;
	else all.unshift(article);
	saveCustomArticles(all);
	return article;
}
function slugifyTitle(title) {
	return title.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "").slice(0, 80) || "untitled-article";
}
function cloneDefault() {
	return structuredClone(DEFAULT_ARTICLE_LAYOUT);
}
function ArticleCreator({ existing }) {
	const navigate = useNavigate();
	existing || cloneDefault();
	const [title, setTitle] = (0, import_react.useState)(existing?.title ?? "Untitled article");
	const [excerpt, setExcerpt] = (0, import_react.useState)(existing?.excerpt ?? DEFAULT_ARTICLE_LAYOUT.overview[0] ?? "");
	const [subject, setSubject] = (0, import_react.useState)(existing?.subject_slug ?? "biology");
	const [section, setSection] = (0, import_react.useState)(existing?.section_slug ?? "organisms");
	const [imageKey, setImageKey] = (0, import_react.useState)(existing?.image_key ?? "hero-cell");
	const [layout, setLayout] = (0, import_react.useState)(existing ? layoutFromArticleBody(existing.body) ?? cloneDefault() : cloneDefault());
	const [status, setStatus] = (0, import_react.useState)(existing?.published ? "published" : "draft");
	const previewArticle = (0, import_react.useMemo)(() => ({
		id: existing?.id ?? "preview",
		slug: slugifyTitle(title),
		title,
		excerpt,
		body: JSON.stringify(layout),
		minutes: 8,
		tone: "educational",
		subject_slug: subject,
		section_slug: section,
		topic_slug: slugifyTitle(title),
		image_key: imageKey,
		image_url: null,
		video_url: null,
		published: status === "published",
		status,
		sort: 0
	}), [
		existing?.id,
		title,
		excerpt,
		layout,
		subject,
		section,
		imageKey,
		status
	]);
	const save = (publish) => {
		upsertCustomArticle({
			...previewArticle,
			id: existing?.id ?? `custom-${Date.now()}`,
			published: publish,
			status: publish ? "published" : "draft"
		});
		navigate({ to: "/admin/articles" });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-6 xl:grid-cols-[minmax(0,22rem)_1fr]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "bio-panel space-y-4 p-4",
			onSubmit: (e) => {
				e.preventDefault();
				save(true);
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-lg font-semibold",
					children: "Create article"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted-foreground",
					children: "The default encyclopedia layout is already loaded. Edit fields and watch the live preview."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "block space-y-1 text-xs text-muted-foreground",
					children: ["Title", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: title,
						onChange: (e) => setTitle(e.target.value)
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "block space-y-1 text-xs text-muted-foreground",
					children: ["Excerpt", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						className: "min-h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground",
						value: excerpt,
						onChange: (e) => setExcerpt(e.target.value)
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "block space-y-1 text-xs text-muted-foreground",
					children: ["Subject", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
						className: "w-full rounded-md border border-input bg-background px-3 py-2 text-sm",
						value: subject,
						onChange: (e) => setSubject(e.target.value),
						children: SUBJECTS.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: s.slug,
							children: s.title
						}, s.slug))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "block space-y-1 text-xs text-muted-foreground",
					children: ["Section slug", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: section,
						onChange: (e) => setSection(e.target.value)
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "block space-y-1 text-xs text-muted-foreground",
					children: ["Banner image", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
						className: "w-full rounded-md border border-input bg-background px-3 py-2 text-sm",
						value: imageKey,
						onChange: (e) => setImageKey(e.target.value),
						children: imageKeys.map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: k,
							children: k
						}, k))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "block space-y-1 text-xs text-muted-foreground",
					children: ["Overview (one paragraph per line)", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						className: "min-h-28 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground",
						value: layout.overview.join("\n"),
						onChange: (e) => setLayout({
							...layout,
							overview: e.target.value.split("\n").filter(Boolean)
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "block space-y-1 text-xs text-muted-foreground",
					children: ["Tags (comma separated)", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: layout.tags.join(", "),
						onChange: (e) => setLayout({
							...layout,
							tags: e.target.value.split(",").map((t) => t.trim()).filter(Boolean)
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "outline",
							onClick: () => save(false),
							children: "Save draft"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							children: "Publish"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "ghost",
							onClick: () => setLayout(cloneDefault()),
							children: "Reset layout"
						})
					]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0 overflow-auto rounded-2xl border border-border bg-background p-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-3 text-[11px] font-semibold uppercase tracking-widest text-primary",
				children: "Default layout preview"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArticleTemplate, {
				article: previewArticle,
				layoutOverride: layout,
				preview: true
			})]
		})]
	});
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminPage, {
	title: "New article",
	description: "Draft a structured article and verify its reader-facing layout.",
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArticleCreator, {})
});
//#endregion
export { SplitComponent as component };
