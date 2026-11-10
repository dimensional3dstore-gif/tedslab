import { g as layoutFromArticleBody } from "./catalog-Du59BVWX.mjs";
import { x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { Ht as CircleCheck, Kt as ChevronRight, O as Sparkles, Z as Microscope, ft as Leaf, g as ThumbsDown, h as ThumbsUp, tn as BookOpenText } from "../_libs/lucide-react.mjs";
import { r as resolveImage } from "./images-BfzzCxZw.mjs";
import { t as ArticleCard } from "./ArticleCard-DOSfw5Q1.mjs";
import { t as AppShell } from "./AppShell-8wnhzt2S.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ArticleTemplate-HA7ELHja.js
var import_jsx_runtime = require_jsx_runtime();
function RelatedArticles({ currentArticle, allArticles, onBookmarkClick, savedArticles = /* @__PURE__ */ new Set() }) {
	const relatedArticles = allArticles.filter((article) => article.topic_slug === currentArticle.topic_slug && article.slug !== currentArticle.slug && article.published).slice(0, 6);
	const sectionArticles = allArticles.filter((article) => article.section_slug === currentArticle.section_slug && article.topic_slug !== currentArticle.topic_slug && article.slug !== currentArticle.slug && article.published).slice(0, 3);
	const allRelated = [...relatedArticles, ...sectionArticles];
	if (allRelated.length === 0) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-6 bio-panel p-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-display text-xl font-bold text-foreground mb-4",
			children: relatedArticles.length > 0 ? "Related Articles" : "More from this Section"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4",
			children: allRelated.map((article) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArticleCard, {
				article,
				saved: savedArticles.has(article.slug),
				onBookmarkClick,
				showBookmark: !!onBookmarkClick,
				variant: "default"
			}, article.slug))
		})]
	});
}
var TABS = [
	"Overview",
	"Key Concepts",
	"Process Steps",
	"Energy Yield",
	"Importance",
	"References"
];
function ArticleTemplate({ article, related = [], preview = false, layoutOverride }) {
	const layout = layoutOverride ?? layoutFromArticleBody(article.body) ?? {
		version: 1,
		tags: [article.subject_slug ?? "Article", article.section_slug ?? "Encyclopedia"].filter(Boolean),
		facts: [{
			label: "Subject",
			value: article.subject_slug ?? "General"
		}, {
			label: "Read time",
			value: article.minutes ? `${article.minutes} min` : "—"
		}],
		overview: [article.excerpt ?? "", article.body ?? ""].filter(Boolean),
		sections: []
	};
	const image = resolveImage(article.image_url, article.image_key);
	const crumbs = [
		"Home",
		article.subject_slug ?? "Library",
		article.section_slug ?? "Articles",
		article.title
	];
	const inner = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "max-w-5xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "flex flex-wrap items-center gap-2 text-xs text-muted-foreground",
				children: crumbs.map((c, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "flex items-center gap-2",
					children: [i > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "›" }), i === crumbs.length - 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-medium text-primary",
						children: c
					}) : i === 1 && article.subject_slug ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: `/${article.subject_slug}`,
						className: "hover:text-foreground",
						children: c
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: c })]
				}, `${c}-${i}`))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "mt-6 overflow-hidden rounded-2xl border border-border bg-card/80",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-6 p-6 md:grid-cols-[1.3fr_1fr] md:items-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "font-display text-4xl font-black tracking-tight text-foreground",
							children: article.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 inline-flex items-center gap-2 rounded-md border border-primary/30 bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-3.5" }), "Reviewed by Experts"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground",
							children: article.excerpt || layout.overview[0]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-5 flex flex-wrap gap-2",
							children: layout.tags.map((tag) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "rounded-full border border-border bg-secondary px-2.5 py-1 text-xs text-muted-foreground",
								children: tag
							}, tag))
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "overflow-hidden rounded-2xl border border-border bg-secondary",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: image,
							alt: article.title,
							className: "h-full min-h-[220px] w-full object-cover"
						})
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 flex flex-wrap gap-2 rounded-2xl border border-border bg-card/80 p-2",
				children: TABS.map((tab, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: preview ? void 0 : `#section-${index}`,
					className: `inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${index === 0 ? "bg-primary/10 text-primary shadow-sm" : "text-muted-foreground hover:bg-secondary hover:text-foreground"}`,
					children: [
						index === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpenText, { className: "size-4" }),
						index === 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Leaf, { className: "size-4" }),
						index === 2 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-4" }),
						index === 3 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Microscope, { className: "size-4" }),
						tab
					]
				}, tab))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				id: "section-0",
				className: "mt-8 rounded-2xl border border-border bg-card/80 p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-3xl font-bold text-foreground",
					children: "Overview"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 space-y-5 text-base leading-relaxed text-muted-foreground",
					children: [layout.overview.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: p }, p.slice(0, 48))), layout.equation && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "overflow-hidden rounded-xl border border-primary/20 bg-primary/5 p-5 text-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-sm font-semibold text-foreground",
							children: layout.equation.formula
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2 text-xs uppercase tracking-[0.12em] text-muted-foreground",
							children: layout.equation.caption
						})]
					})]
				})]
			}),
			layout.sections.map((sec, si) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				id: `section-${si + 1}`,
				className: "mt-8 rounded-2xl border border-border bg-card/80 p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-3xl font-bold text-foreground",
					children: sec.heading
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 space-y-4",
					children: [sec.paragraphs?.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-base leading-relaxed text-muted-foreground",
						children: p
					}, p.slice(0, 40))), sec.cards?.map((card, ci) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-lg border border-border bg-secondary/50 p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-semibold text-foreground",
							children: card.title.startsWith(String(ci + 1)) ? card.title : `${ci + 1}. ${card.title}`
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted-foreground",
							children: card.text
						})]
					}, card.title))]
				})]
			}, sec.heading)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 flex items-center justify-between gap-3 rounded-xl border border-border bg-card/80 p-3 text-sm text-muted-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Was this article helpful?" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: "inline-flex items-center gap-2 rounded-lg border border-border bg-secondary px-3 py-2 text-xs font-medium hover:bg-accent",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThumbsUp, { className: "size-3.5" }), "Yes"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: "inline-flex items-center gap-2 rounded-lg border border-border bg-secondary px-3 py-2 text-xs font-medium hover:bg-accent",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThumbsDown, { className: "size-3.5" }), "No"]
					})]
				})]
			}),
			!preview && related.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RelatedArticles, {
					currentArticle: article,
					allArticles: related
				})
			})
		]
	});
	const rail = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
		className: "w-full shrink-0 space-y-4 xl:w-80",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "bio-panel",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "border-b border-border px-4 py-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "flex items-center gap-2 text-sm font-semibold text-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpenText, { className: "size-4 text-primary" }), "Article Contents"]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "space-y-1 p-2 text-sm",
				children: ["Overview", ...layout.sections.map((s) => s.heading)].map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: preview ? void 0 : `#section-${index}`,
					className: `flex items-center justify-between rounded-md px-3 py-2 transition-colors ${index === 0 ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-secondary hover:text-foreground"}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item }), index !== 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-3.5" })]
				}, item))
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "bio-panel",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "border-b border-border px-4 py-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "flex items-center gap-2 text-sm font-semibold text-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-4 text-primary" }), "Quick Facts"]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-2 gap-3 p-4 text-sm",
				children: layout.facts.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-lg border border-border bg-secondary/50 p-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: f.label
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs font-medium text-foreground",
						children: f.value
					})]
				}, f.label))
			})]
		})]
	});
	if (preview) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-6 xl:flex-row",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "min-w-0 flex-1",
			children: inner
		}), rail]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		rail,
		children: inner
	});
}
//#endregion
export { ArticleTemplate as t };
