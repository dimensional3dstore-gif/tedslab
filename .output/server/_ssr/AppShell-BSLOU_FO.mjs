import { r as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { _ as Link, u as useRouterState } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as queryOptions, r as useQuery } from "../_libs/tanstack__react-query.mjs";
import { $ as MessageSquare, $t as Bookmark, A as Share2, C as Sun, D as Speaker, Dt as FileQuestionMark, Et as FileText, J as Network, Kt as ChevronRight, Mt as Download, N as Search, O as Sparkles, Ot as FilePenLine, R as Quote, T as Sprout, U as PanelLeftOpen, W as PanelLeftClose, Xt as BrainCircuit, Y as Moon, Zt as Brackets, bt as History, c as User, en as BookOpen, jt as Earth, mt as Layers, nt as Menu, q as NotebookPen, t as lucide_react_exports, vt as House, z as Plus } from "../_libs/lucide-react.mjs";
import { c as PAGES, d as SUBJECTS, f as TOPICS, l as SECTIONS, o as HERO_SLIDES, p as VIDEOS, r as ARTICLES, s as NAV_LINKS, u as SETTINGS } from "./router-Do9_DjQ6.mjs";
import { t as getChronosOSDownloadUrl } from "./chronos-os-download-B3pWPTg4.mjs";
import { t as cn } from "./auth-CLCnuokL.mjs";
import { t as useAuth } from "./use-auth-Ct_UUEWR.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/AppShell-BSLOU_FO.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var fallbackArticles = ARTICLES;
var subjectsQueryOptions = queryOptions({
	queryKey: ["subjects"],
	queryFn: async () => SUBJECTS
});
var sectionsQueryOptions = queryOptions({
	queryKey: ["sections"],
	queryFn: async () => SECTIONS
});
var topicsQueryOptions = queryOptions({
	queryKey: ["topics"],
	queryFn: async () => TOPICS
});
var articlesQueryOptions = queryOptions({
	queryKey: ["articles"],
	queryFn: async () => ARTICLES
});
var heroSlidesQueryOptions = queryOptions({
	queryKey: ["hero_slides"],
	queryFn: async () => HERO_SLIDES
});
var videosQueryOptions = queryOptions({
	queryKey: ["videos"],
	queryFn: async () => VIDEOS
});
var pagesQueryOptions = queryOptions({
	queryKey: ["pages"],
	queryFn: async () => PAGES
});
var navLinksQueryOptions = queryOptions({
	queryKey: ["nav_links"],
	queryFn: async () => NAV_LINKS
});
var settingsQueryOptions = queryOptions({
	queryKey: ["site_settings"],
	queryFn: async () => SETTINGS
});
function useSubjects() {
	return useQuery(subjectsQueryOptions);
}
function useSections() {
	return useQuery(sectionsQueryOptions);
}
function useTopics() {
	return useQuery(topicsQueryOptions);
}
function useArticles() {
	return useQuery(articlesQueryOptions);
}
function useHeroSlides() {
	return useQuery(heroSlidesQueryOptions);
}
function useVideos() {
	return useQuery(videosQueryOptions);
}
function usePages() {
	return useQuery(pagesQueryOptions);
}
function useNavLinks() {
	return useQuery(navLinksQueryOptions);
}
function useSettings() {
	return useQuery(settingsQueryOptions);
}
function Skeleton({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("animate-pulse rounded-md bg-primary/10", className),
		...props
	});
}
var studyTools = [
	{
		label: "AI Tutor",
		icon: BrainCircuit,
		to: "/ai"
	},
	{
		label: "Chronium AI",
		icon: Brackets,
		to: "/llm"
	},
	{
		label: "Notebook",
		icon: NotebookPen,
		to: "/notebook"
	},
	{
		label: "Docs",
		icon: FilePenLine,
		to: "/docs"
	},
	{
		label: "Flashcards",
		icon: Layers,
		to: "/flashcards"
	},
	{
		label: "Saved Content",
		icon: Bookmark,
		to: "/saved"
	},
	{
		label: "Create Custom List",
		icon: Plus,
		to: "/custom-lists"
	},
	{
		label: "Translate",
		icon: Speaker,
		to: "/translate"
	}
];
function resolveIcon(name) {
	if (!name) return Sprout;
	return lucide_react_exports[name] ?? Sprout;
}
function Sidebar({ mobileOpen = false, onCloseMobile }) {
	const { data: subjects, isLoading: subjectsLoading } = useSubjects();
	const { data: sections, isLoading: sectionsLoading } = useSections();
	const { data: articles } = useArticles();
	const { data: navLinks } = useNavLinks();
	const { data: settings } = useSettings();
	const chronosDownloadUrl = getChronosOSDownloadUrl();
	const [expanded, setExpanded] = (0, import_react.useState)(/* @__PURE__ */ new Set());
	const [expandedSections, setExpandedSections] = (0, import_react.useState)(/* @__PURE__ */ new Set());
	const [collapsed, setCollapsed] = (0, import_react.useState)(false);
	const brandName = settings?.["site_name"] ?? "Ted's Lab";
	const brandTagline = settings?.["site_tagline"] ?? "The Learning Encyclopedia";
	const toolLinks = navLinks?.filter((n) => n.group_name === "tools") ?? [];
	const resolvedStudyTools = [
		{
			label: "AI Tutor",
			icon: BrainCircuit,
			to: "/ai"
		},
		...toolLinks.map((n) => ({
			label: n.label,
			icon: resolveIcon(n.icon),
			to: n.href
		})),
		...studyTools.filter((t) => t.to !== "/ai").map((t) => ({
			label: t.label,
			icon: t.icon,
			to: t.to
		}))
	].filter((tool, index, array) => {
		return array.findIndex((item) => item.to === tool.to && item.label === tool.label) === index;
	});
	const sectionsBySubject = /* @__PURE__ */ new Map();
	for (const subject of subjects ?? []) sectionsBySubject.set(subject.id, (sections ?? []).filter((s) => s.subject_id === subject.id).sort((a, b) => (a.sort ?? 0) - (b.sort ?? 0)));
	const toggle = (id) => {
		setExpanded((prev) => {
			const next = new Set(prev);
			if (next.has(id)) next.delete(id);
			else next.add(id);
			return next;
		});
	};
	const toggleSection = (id) => {
		setExpandedSections((previous) => {
			const next = new Set(previous);
			if (next.has(id)) next.delete(id);
			else next.add(id);
			return next;
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [mobileOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		"aria-label": "Close navigation menu",
		title: "Close navigation menu",
		onClick: onCloseMobile,
		className: "fixed inset-0 z-40 bg-black/40 lg:hidden"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
		className: `shrink-0 flex-col border-r border-sidebar-border bg-sidebar transition-[width] duration-200 ${mobileOpen ? "fixed inset-y-0 left-0 z-50 flex w-64 shadow-xl lg:static lg:z-auto lg:shadow-none" : `hidden lg:flex ${collapsed ? "w-16" : "w-64"}`}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: `flex items-center border-b border-sidebar-border py-3 ${collapsed ? "justify-center px-2" : "justify-between gap-2 px-4"}`,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/",
				title: brandName,
				className: `flex min-w-0 items-center ${collapsed ? "justify-center" : "gap-3"}`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: "/logo.png",
					alt: brandName,
					width: 40,
					height: 40,
					className: `${collapsed ? "size-9" : "size-10"} shrink-0 rounded-xl object-cover`
				}), !collapsed && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-lg leading-none font-bold text-primary",
						children: brandName
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs text-muted-foreground",
						children: brandTagline
					})]
				})]
			}), !collapsed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				title: "Collapse sidebar",
				"aria-label": "Collapse sidebar",
				onClick: () => setCollapsed(true),
				className: "grid size-8 shrink-0 place-items-center rounded-md text-muted-foreground hover:bg-secondary hover:text-foreground",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelLeftClose, { className: "size-4" })
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
			className: `flex-1 overflow-y-auto py-3 ${collapsed ? "px-2" : "px-3"}`,
			children: [
				collapsed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					title: "Expand sidebar",
					"aria-label": "Expand sidebar",
					onClick: () => setCollapsed(false),
					className: "mx-auto mb-3 grid size-10 place-items-center rounded-md text-muted-foreground hover:bg-secondary hover:text-foreground",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelLeftOpen, { className: "size-4" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/knowledge-atlas",
					title: "Generate new branch · Open Knowledge Atlas",
					className: `mb-2 flex items-center rounded-lg border border-primary/30 bg-primary/10 font-semibold text-primary transition-colors hover:bg-primary/20 ${collapsed ? "mx-auto size-10 justify-center" : "gap-2 px-3 py-2 text-sm"}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-4 shrink-0" }), !collapsed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "truncate",
						children: "Generate new branch"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "space-y-0.5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavLink, {
							label: "Knowledge Atlas",
							Icon: Network,
							to: "/knowledge-atlas",
							collapsed,
							featured: true
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavLink, {
							label: "Home",
							Icon: House,
							to: "/",
							exact: true,
							collapsed
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavLink, {
							label: "Lost Planet",
							Icon: Earth,
							to: "/lost-atlas"
						}) }),
						subjectsLoading || sectionsLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: "space-y-1 px-3 py-2",
							children: Array.from({ length: 6 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-8 w-full rounded-lg" }, i))
						}) : (subjects ?? []).map((subject) => {
							const subjectSections = sectionsBySubject.get(subject.id) ?? [];
							const isExpanded = expanded.has(subject.id);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => toggle(subject.id),
								title: subject.title,
								"aria-label": `${isExpanded ? "Collapse" : "Expand"} ${subject.title}`,
								className: `group flex w-full items-center rounded-lg py-2 text-sm text-sidebar-foreground transition-colors hover:bg-secondary ${collapsed ? "justify-center px-0" : "gap-3 px-3"}`,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "shrink-0",
										children: (() => {
											const Icon = resolveIcon(subject.icon);
											return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4 text-muted-foreground" });
										})()
									}),
									!collapsed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "flex-1 truncate text-left",
										children: subject.title
									}),
									!collapsed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: `size-4 text-muted-foreground transition-transform ${isExpanded ? "rotate-90" : ""}` })
								]
							}), isExpanded && subjectSections.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
								className: "ml-4 mt-0.5 space-y-0.5 border-l border-sidebar-border pl-2",
								children: [subjectSections.map((section) => {
									const sectionArticles = (articles ?? []).filter((article) => article.published && article.subject_slug === subject.slug && article.section_slug === section.slug);
									const sectionExpanded = expandedSections.has(section.id);
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavLink, {
											label: section.label,
											Icon: resolveIcon(section.icon),
											to: `/${subject.slug}/${section.slug}`,
											collapsed
										}), !collapsed && sectionArticles.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											"aria-label": `${sectionExpanded ? "Collapse" : "Expand"} ${section.label} articles`,
											"aria-expanded": sectionExpanded,
											onClick: () => toggleSection(section.id),
											className: "rounded p-1 text-muted-foreground hover:bg-secondary hover:text-foreground",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: `size-3.5 transition-transform ${sectionExpanded ? "rotate-90" : ""}` })
										})]
									}), !collapsed && sectionExpanded && sectionArticles.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
										className: "ml-7 space-y-0.5 border-l border-sidebar-border pl-2",
										children: sectionArticles.map((article) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
											to: "/articles/$slug",
											params: { slug: article.slug },
											className: "block truncate rounded-md px-2 py-1.5 text-xs text-muted-foreground hover:bg-secondary hover:text-foreground",
											title: article.title,
											children: article.title
										}) }, article.id))
									})] }, section.id);
								}), !collapsed && (articles ?? []).filter((article) => article.published && article.subject_slug === subject.slug && !subjectSections.some((section) => section.slug === article.section_slug)).length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "pt-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground",
										children: "More articles"
									}), (articles ?? []).filter((article) => article.published && article.subject_slug === subject.slug && !subjectSections.some((section) => section.slug === article.section_slug)).map((article) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/articles/$slug",
										params: { slug: article.slug },
										className: "block truncate rounded-md px-2 py-1.5 text-xs text-muted-foreground hover:bg-secondary hover:text-foreground",
										title: article.title,
										children: article.title
									}, article.id))]
								})]
							})] }, subject.id);
						})
					]
				}),
				!collapsed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "px-3 pt-6 pb-2 text-[11px] font-semibold tracking-widest text-primary/80",
					children: "CONTENT"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "space-y-0.5 pb-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavLink, {
							label: "All Articles",
							Icon: BookOpen,
							to: "/articles",
							collapsed
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavLink, {
							label: "All Pages",
							Icon: FileText,
							to: "/pages",
							collapsed
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavLink, {
							label: "Help",
							Icon: FileQuestionMark,
							to: "/help-center",
							collapsed
						}) })
					]
				}),
				!collapsed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "px-3 pt-6 pb-2 text-[11px] font-semibold tracking-widest text-primary/80",
					children: "STUDY TOOLS"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "space-y-0.5 pb-4",
					children: [
						resolvedStudyTools.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavLink, {
							label: item.label,
							Icon: item.icon,
							to: item.to,
							collapsed
						}) }, `${item.label}-${item.to}`)),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavLink, {
							label: "Video Tutorials",
							Icon: BookOpen,
							to: "/tutorials",
							collapsed
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: !collapsed && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: chronosDownloadUrl,
							download: "ChronosOS.dmg",
							className: "group flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-sidebar-foreground transition-colors hover:bg-secondary",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-4 text-muted-foreground group-hover:text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "truncate",
								children: "Download ChronosOS"
							})]
						}) })
					]
				})
			]
		})]
	})] });
}
function NavLink({ label, Icon, to, exact, collapsed = false, featured = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to,
		title: label,
		"aria-label": label,
		activeOptions: { exact: exact ?? false },
		className: `group flex w-full items-center rounded-lg py-2 text-sm text-sidebar-foreground transition-colors hover:bg-secondary data-[status=active]:bg-sidebar-accent data-[status=active]:font-medium data-[status=active]:text-primary ${collapsed ? featured ? "flex-col gap-0.5 px-0 text-[9px]" : "justify-center px-0" : "gap-3 px-3"} ${featured ? "border border-primary/25 bg-primary/10 font-semibold text-primary" : ""}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: `size-4 shrink-0 ${featured ? "text-primary" : "text-muted-foreground group-data-[status=active]:text-primary"}` }), (!collapsed || featured) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "truncate",
			children: collapsed ? "Atlas" : label
		})]
	});
}
function TopBar({ query, onQueryChange, bookmarkCount, compact, onToggleCompact, onToggleSidebar }) {
	const { user } = useAuth();
	const chronosDownloadUrl = getChronosOSDownloadUrl();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "sticky top-0 z-20 flex items-center gap-4 border-b border-border bg-background/90 px-4 py-3 backdrop-blur md:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: onToggleSidebar,
				"aria-label": "Toggle navigation menu",
				title: "Toggle navigation menu",
				className: "grid size-10 shrink-0 place-items-center rounded-md border border-border text-foreground hover:bg-secondary lg:hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-4" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "relative flex-1 max-w-2xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "sr-only",
						children: "Search Ted's Lab"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: query,
						onChange: (e) => onQueryChange(e.target.value),
						placeholder: "Search topics, organisms, processes...",
						className: "h-11 w-full rounded-full border border-border bg-card pr-11 pl-5 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary/60 focus:ring-2 focus:ring-ring/30"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-muted-foreground" })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
				href: chronosDownloadUrl,
				download: "ChronosOS.dmg",
				"aria-label": "Download ChronosOS DMG",
				title: "Download ChronosOS DMG",
				className: "inline-flex h-10 shrink-0 items-center gap-2 rounded-md border border-border px-3 text-sm font-medium text-foreground hover:bg-secondary",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "hidden sm:inline",
					children: "Download DMG"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "ml-auto hidden items-center gap-5 md:flex",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-2 text-sm text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bookmark, { className: "size-4" }),
							"Bookmarks",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "rounded-full bg-secondary px-2 py-0.5 text-xs text-foreground",
								children: bookmarkCount
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-2 text-sm text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(History, { className: "size-4" }), "History"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: onToggleCompact,
						"aria-pressed": compact,
						"aria-label": "Toggle compact reading mode",
						className: "flex h-8 w-14 items-center rounded-full border border-border bg-secondary px-1 transition-colors",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: `flex size-6 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform ${compact ? "translate-x-6" : "translate-x-0"}`,
							children: compact ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Moon, { className: "size-3.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, { className: "size-3.5" })
						})
					}),
					user && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex items-center gap-2 border-l border-border pl-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/dashboard",
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "flex size-9 items-center justify-center rounded-full bg-primary/15",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "size-4 text-primary" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "leading-tight",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm font-medium",
									children: "My dashboard"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "max-w-[10rem] truncate text-xs text-muted-foreground",
									children: user.email
								})]
							})]
						})
					})
				]
			})
		]
	});
}
function QuoteBar() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: "mt-8 flex flex-wrap items-center gap-4 bio-panel px-5 py-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sprout, { className: "size-5 text-primary" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "flex-1 text-sm italic text-foreground",
				children: ["“The study of life is the foundation for understanding our world and our place in it.”", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "ml-3 text-xs not-italic text-muted-foreground",
					children: "– Unknown"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-5 text-sm text-muted-foreground",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Quote, { className: "size-4" }), " Cite"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share2, { className: "size-4" }), " Share"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, { className: "size-4" }), " Feedback"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, { className: "size-4" }), " Copyright 2026. All rights reserved."]
					})
				]
			})
		]
	});
}
var KEY = "biopedia:bookmarks";
function useBookmarks() {
	const [bookmarks, setBookmarks] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		try {
			const raw = localStorage.getItem(KEY);
			if (raw) setBookmarks(JSON.parse(raw));
		} catch {}
	}, []);
	const persist = (0, import_react.useCallback)((next) => {
		setBookmarks(next);
		try {
			localStorage.setItem(KEY, JSON.stringify(next));
		} catch {}
	}, []);
	return {
		bookmarks,
		toggleBookmark: (0, import_react.useCallback)((slug) => setBookmarks((prev) => {
			const next = prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug];
			try {
				localStorage.setItem(KEY, JSON.stringify(next));
			} catch {}
			return next;
		}), []),
		persist
	};
}
function AppShell({ children, rail }) {
	const [query, setQuery] = (0, import_react.useState)("");
	const [compact, setCompact] = (0, import_react.useState)(false);
	const [mobileSidebarOpen, setMobileSidebarOpen] = (0, import_react.useState)(false);
	const { bookmarks } = useBookmarks();
	const pathname = useRouterState({ select: (state) => state.location.pathname });
	(0, import_react.useEffect)(() => {
		setMobileSidebarOpen(false);
	}, [pathname]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-screen bg-background",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sidebar, {
			mobileOpen: mobileSidebarOpen,
			onCloseMobile: () => setMobileSidebarOpen(false)
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex min-w-0 flex-1 flex-col",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TopBar, {
				query,
				onQueryChange: setQuery,
				bookmarkCount: bookmarks.length,
				compact,
				onToggleCompact: () => setCompact((c) => !c),
				onToggleSidebar: () => setMobileSidebarOpen((open) => !open)
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "flex flex-1 flex-col gap-6 p-4 md:p-6 xl:flex-row",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 flex-1",
					children: [typeof children === "function" ? children(query.trim().toLowerCase()) : children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuoteBar, {})]
				}), rail]
			})]
		})]
	});
}
function PageHeader({ title, description }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "bio-panel p-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-3xl font-bold text-foreground",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground",
			children: description
		})]
	});
}
//#endregion
export { useBookmarks as a, useSections as c, useTopics as d, useVideos as f, useArticles as i, useSettings as l, PageHeader as n, useHeroSlides as o, fallbackArticles as r, usePages as s, AppShell as t, useSubjects as u };
