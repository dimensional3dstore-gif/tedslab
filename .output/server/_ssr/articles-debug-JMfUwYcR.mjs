import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { i as useArticles, t as AppShell } from "./AppShell-BSLOU_FO.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/articles-debug-JMfUwYcR.js
var import_jsx_runtime = require_jsx_runtime();
function ArticleDebugPage() {
	const { data: articles = [], isLoading, error } = useArticles();
	const published = articles.filter((a) => a.published);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bio-panel p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-2xl font-bold mb-4",
					children: "Article System Diagnostic"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "border border-border rounded-lg p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-semibold mb-2",
							children: "Database Status"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: ["Total articles: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: articles.length })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: ["Published articles: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: published.length })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: ["Loading: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: isLoading ? "Yes" : "No" })] }),
								error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-red-500",
									children: ["Error: ", String(error)]
								})
							]
						})]
					}), published.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "border border-amber-500/30 rounded-lg p-4 bg-amber-50/10",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-semibold text-amber-600 mb-2",
								children: "⚠️ No Articles Found"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted-foreground mb-4",
								children: "You need to generate articles first. Choose one of these methods:"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", {
								className: "text-sm space-y-2 list-decimal list-inside",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Admin Panel (Easiest):" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "ml-5 mt-1",
										children: [
											"Go to",
											" ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
												to: "/admin/articles",
												className: "text-primary hover:underline",
												children: "/admin/articles"
											}),
											" ",
											"and click \"Generate Articles\" button"
										]
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "SQL Script:" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "ml-5 mt-1",
										children: [
											"Run the SQL in",
											" ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
												className: "bg-secondary px-2 py-1 rounded text-xs",
												children: "entitles/seed-articles-comprehensive.sql"
											})
										]
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Node Script:" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "ml-5 mt-1",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
											className: "bg-secondary px-2 py-1 rounded text-xs",
											children: "node scripts/seed-and-verify-articles.mjs"
										})
									})] })
								]
							})
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "border border-green-500/30 rounded-lg p-4 bg-green-50/10",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-semibold text-green-600 mb-4",
							children: "✅ Articles Found!"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-medium text-sm mb-2",
								children: "Sample Articles (First 5):"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "space-y-2",
								children: published.slice(0, 5).map((article) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "border border-border rounded p-3 bg-secondary/20",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-start justify-between gap-4",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex-1 min-w-0",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "font-medium text-sm truncate",
												children: article.title
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs text-muted-foreground font-mono",
												children: article.slug
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
											to: `/articles/${article.slug}`,
											className: "px-3 py-1.5 bg-primary text-primary-foreground rounded text-xs font-medium hover:bg-primary/90 transition-colors flex-shrink-0",
											children: "Open →"
										})]
									})
								}, article.id))
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-medium text-sm mb-2",
								children: "All Articles by Subject:"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "space-y-2",
								children: Object.entries(published.reduce((acc, a) => {
									const subject = a.subject_slug || "unknown";
									acc[subject] = (acc[subject] || 0) + 1;
									return acc;
								}, {})).sort(([, a], [, b]) => b - a).map(([subject, count]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between text-sm p-2 bg-secondary/30 rounded",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-medium",
										children: subject
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-muted-foreground",
										children: [count, " articles"]
									})]
								}, subject))
							})] })]
						})]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bio-panel p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-semibold mb-4",
					children: "Testing"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: "Click the \"Open →\" button above to test article opening."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: "If articles don't open, check:"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
							className: "text-sm space-y-1 list-disc list-inside text-muted-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Browser console (F12) for errors" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Article slug format is correct" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Route /articles/$slug exists" })
							]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "bio-panel p-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/articles",
					className: "inline-block px-4 py-2 bg-primary text-primary-foreground rounded font-medium hover:bg-primary/90 transition-colors",
					children: "Back to All Articles"
				})
			})
		]
	}) });
}
//#endregion
export { ArticleDebugPage as component };
