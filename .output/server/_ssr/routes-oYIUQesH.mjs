import { r as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { Bt as CirclePlay, Gt as ChevronRight, Ht as CircleCheckBig, Kt as ChevronLeft, Mt as Dna, O as Sparkles, Qt as Bookmark, R as Plus, _t as Hourglass, dt as Leaf, rn as BadgeCheck, s as Video, tn as BookMarked, ut as Lightbulb, z as PenTool } from "../_libs/lucide-react.mjs";
import { t as discovery_leaf_default } from "./discovery-leaf-CqF-kPld.mjs";
import { r as resolveImage, t as hero_cell_default } from "./images-BfzzCxZw.mjs";
import { t as ArticleCard } from "./ArticleCard-DOSfw5Q1.mjs";
import { a as useBookmarks, i as useArticles, l as useSettings, o as useHeroSlides, t as AppShell, u as useSubjects } from "./AppShell-6_41dtv3.mjs";
import { n as quiz, r as timeline } from "./biopedia-data-CPw6dQS_.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-oYIUQesH.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Hero() {
	const { data: slidesData } = useHeroSlides();
	const [index, setIndex] = (0, import_react.useState)(0);
	const slides = (0, import_react.useMemo)(() => (slidesData ?? []).filter((s) => s.active !== false), [slidesData]);
	(0, import_react.useEffect)(() => {
		if (slides.length === 0) return;
		const id = setInterval(() => setIndex((i) => (i + 1) % slides.length), 6e3);
		return () => clearInterval(id);
	}, [slides.length]);
	if (slides.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "relative overflow-hidden rounded-2xl border border-border bio-hero-bg",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid items-center gap-6 md:grid-cols-[1fr_minmax(0,44%)]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-8 md:p-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-4xl font-bold md:text-5xl",
					children: "Welcome"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-xl font-medium text-primary",
					children: "Explore & Learn"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: hero_cell_default,
				alt: "Cross-section render of a living cell with a glowing nucleus and mitochondria",
				width: 1024,
				height: 768,
				className: "h-full w-full object-contain md:max-h-80"
			})]
		})
	});
	const slide = slides[index] ?? slides[0];
	const slideLink = slide.link_to ?? null;
	let exploreLink = "/";
	if (slideLink && !slideLink.startsWith("/components/") && !slideLink.startsWith("/src/") && !slideLink.startsWith("./")) {
		if (slideLink === "/photosynthese" || slideLink === "/s/plants") exploreLink = "/photosynthesis";
		else exploreLink = slideLink;
	} else if (slide.title.toLowerCase().includes("photosynth")) exploreLink = "/photosynthesis";
	const isVideoLink = slideLink && slideLink.includes("/videos") || Boolean(slide.video_url);
	const watchLink = slide.video_url ?? (isVideoLink && slideLink ? slideLink : null);
	if (slide.title.toLowerCase().includes("photosynth")) console.log("Photosynthesis slide detected:", {
		slideLink,
		exploreLink,
		title: slide.title
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "relative overflow-hidden rounded-2xl border border-border bio-hero-bg",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid items-center gap-6 md:grid-cols-[1fr_minmax(0,44%)]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-8 md:p-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-4xl font-bold md:text-5xl",
						children: slide.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-xl font-medium text-primary",
						children: slide.subtitle
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 max-w-md text-sm leading-relaxed text-muted-foreground",
						children: slide.body
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-7 flex flex-wrap gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: exploreLink,
								className: "rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90",
								children: "Explore Topic"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/download",
								className: "rounded-lg border border-border bg-card/60 px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary",
								children: "Download App"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/signup",
								className: "rounded-lg border border-border bg-card/60 px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary",
								children: "Sign up"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/auth",
								className: "rounded-lg border border-border bg-card/60 px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary",
								children: "Log in"
							}),
							watchLink ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: watchLink,
								className: "flex items-center gap-2 rounded-lg border border-border bg-card/60 px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CirclePlay, { className: "size-4" }), "Watch Video"]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								className: "flex items-center gap-2 rounded-lg border border-border bg-card/60 px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CirclePlay, { className: "size-4" }), "Watch Video"]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-8 flex gap-2",
						children: slides.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setIndex(i),
							"aria-label": `Show ${s.title}`,
							className: `size-2.5 rounded-full transition-colors ${i === index ? "bg-primary" : "bg-muted-foreground/40"}`
						}, s.id))
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: resolveImage(slide.image_url, slide.image_key),
				alt: slide.title,
				width: 1024,
				height: 768,
				className: "h-full w-full object-contain md:max-h-80"
			})]
		})
	});
}
function CategoryGrid({ items }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mt-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
			className: "flex items-center gap-1 font-display text-xl font-semibold",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/categories",
				className: "hover:text-primary",
				children: "Explore by Category"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-5 text-muted-foreground" })]
		}), items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-4 text-sm text-muted-foreground",
			children: "No categories match your search."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-6",
			children: items.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: `/${c.slug}`,
				className: "group block cursor-pointer overflow-hidden bio-panel transition-colors hover:border-primary/50",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: resolveImage(c.image_url, c.image_key),
					alt: c.title,
					loading: "lazy",
					width: 512,
					height: 512,
					className: "h-28 w-full object-cover transition-transform duration-500 group-hover:scale-105"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-sm font-semibold",
						children: c.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs leading-snug text-muted-foreground",
						children: c.description
					})]
				})]
			}, c.id))
		})]
	});
}
function FeaturedArticles({ items, bookmarks, onToggleBookmark }) {
	const published = items.filter((a) => a.published);
	const scroller = (0, import_react.useRef)(null);
	const scroll = (direction) => {
		scroller.current?.scrollBy({
			left: direction * 340,
			behavior: "smooth"
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mt-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-xl font-semibold",
				children: "Featured Articles"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => scroll(-1),
					"aria-label": "Scroll featured articles left",
					className: "grid size-9 place-items-center rounded-md border border-border bg-card text-muted-foreground hover:text-foreground",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-4" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => scroll(1),
					"aria-label": "Scroll featured articles right",
					className: "grid size-9 place-items-center rounded-md border border-border bg-card text-muted-foreground hover:text-foreground",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-4" })
				})]
			})]
		}), published.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-4 text-sm text-muted-foreground",
			children: "No articles match your search."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			ref: scroller,
			className: "mt-4 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-3 [scrollbar-width:thin]",
			children: published.map((a) => {
				const saved = bookmarks.includes(a.slug);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArticleCard, {
					className: "w-[min(82vw,17rem)] shrink-0 snap-start",
					article: a,
					saved,
					onBookmarkClick: onToggleBookmark,
					variant: "featured"
				}, a.id);
			})
		})]
	});
}
function RightRail() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
		className: "w-full shrink-0 space-y-4 xl:w-80",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TodaysDiscovery, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BiologyQuiz, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TimelinePanel, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuickFacts, {})
		]
	});
}
function PanelHeader({ icon: Icon, title }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-2 border-b border-border px-4 py-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "text-sm font-semibold",
			children: title
		})]
	});
}
function TodaysDiscovery() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "bio-panel",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelHeader, {
			icon: Leaf,
			title: "Today's Discovery"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex gap-3 p-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: discovery_leaf_default,
				alt: "Sunlit green leaf with water droplets",
				loading: "lazy",
				width: 512,
				height: 512,
				className: "size-24 shrink-0 rounded-lg object-cover"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-sm font-semibold",
					children: "Photosynthesis"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-xs leading-relaxed text-muted-foreground",
					children: "The process plants use to convert light energy into chemical energy."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "mt-3 w-full rounded-md border border-border bg-secondary px-3 py-1.5 text-xs font-medium transition-colors hover:bg-accent",
					children: "Learn More"
				})
			] })]
		})]
	});
}
function BiologyQuiz() {
	const [picked, setPicked] = (0, import_react.useState)(null);
	const [checked, setChecked] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "bio-panel",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelHeader, {
			icon: BadgeCheck,
			title: "Biology Quiz"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-2 p-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm",
					children: quiz.question
				}),
				quiz.options.map((o) => {
					const isPicked = picked === o.key;
					const isCorrect = checked && o.key === quiz.answer;
					const isWrong = checked && isPicked && o.key !== quiz.answer;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => {
							setPicked(o.key);
							setChecked(false);
						},
						className: `flex w-full items-center gap-3 rounded-lg border px-3 py-2 text-left text-sm transition-colors ${isCorrect ? "border-primary bg-primary/15 text-primary" : isWrong ? "border-destructive bg-destructive/15 text-destructive" : isPicked ? "border-primary/60 bg-secondary" : "border-border hover:bg-secondary"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "flex size-6 items-center justify-center rounded-full border border-border text-xs",
							children: o.key
						}), o.label]
					}, o.key);
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					disabled: !picked,
					onClick: () => setChecked(true),
					className: "mt-2 w-full rounded-md border border-border bg-secondary px-3 py-2 text-xs font-medium transition-colors hover:bg-accent disabled:opacity-50",
					children: "Check Answer"
				}),
				checked && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "pt-1 text-xs text-muted-foreground",
					children: picked === quiz.answer ? "Correct — mitochondria generate most of the cell's ATP." : "Not quite. Try again!"
				})
			]
		})]
	});
}
function TimelinePanel() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "bio-panel",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelHeader, {
				icon: Hourglass,
				title: "Timeline of Life"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "space-y-2.5 p-4",
				children: timeline.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex items-center gap-3 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-2.5 shrink-0 rounded-full bg-primary" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "w-16 shrink-0 text-xs text-bio-cyan",
							children: t.when
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs text-foreground",
							children: t.what
						})
					]
				}, t.when))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "px-4 pb-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "w-full rounded-md border border-border bg-secondary px-3 py-2 text-xs font-medium transition-colors hover:bg-accent",
					children: "Explore Timeline"
				})
			})
		]
	});
}
function QuickFacts() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "bio-panel",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelHeader, {
			icon: Sparkles,
			title: "Quick Facts"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-3 p-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dna, { className: "size-7 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm font-semibold",
					children: [
						"~8.7",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs font-normal text-muted-foreground",
							children: "Million"
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted-foreground",
					children: "Species on Earth"
				})] })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fact, {
					label: "Cells in Human Body",
					value: "~37 Trillion"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fact, {
					label: "Human DNA",
					value: "~3.2 Billion Base Pairs"
				})]
			})]
		})]
	});
}
function Fact({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-lg border border-border p-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-sm font-semibold",
			children: value
		})]
	});
}
function Index() {
	const { bookmarks, toggleBookmark } = useBookmarks();
	const { data: subjects } = useSubjects();
	const { data: articles } = useArticles();
	const { data: settings } = useSettings();
	const categories = subjects ?? [];
	const publishedArticles = (articles ?? []).filter((a) => a.published);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		rail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RightRail, {}),
		children: (q) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hero, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CategoryGrid, { items: q ? categories.filter((c) => `${c.title} ${c.description ?? ""}`.toLowerCase().includes(q)) : categories }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FeaturedArticles, {
				items: q ? publishedArticles.filter((a) => `${a.title} ${a.excerpt ?? ""}`.toLowerCase().includes(q)) : publishedArticles,
				bookmarks,
				onToggleBookmark: toggleBookmark
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bio-panel p-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
								className: "flex items-center gap-2 font-display text-lg font-semibold",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "📰" }), "All Articles"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-muted-foreground",
								children: "Browse our complete collection of articles across all subjects."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/articles",
								className: "mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all",
								children: ["View all articles", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-4" })]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bio-panel p-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
								className: "flex items-center gap-2 font-display text-lg font-semibold",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "📄" }), "All Pages"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-muted-foreground",
								children: "Explore all published pages and custom content."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/pages",
								className: "mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all",
								children: ["View all pages", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-4" })]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bio-panel p-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
								className: "flex items-center gap-2 font-display text-lg font-semibold",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Video, { className: "size-5" }), "Videos"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-muted-foreground",
								children: "Watch curated educational videos on all topics."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/videos",
								className: "mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all",
								children: ["Browse videos", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-4" })]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bio-panel p-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
								className: "flex items-center gap-2 font-display text-lg font-semibold",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookMarked, { className: "size-5" }), "Glossary"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-muted-foreground",
								children: "Look up key biology terms and definitions."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/glossary",
								className: "mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all",
								children: ["View glossary", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-4" })]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bio-panel p-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
								className: "flex items-center gap-2 font-display text-lg font-semibold",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheckBig, { className: "size-5" }), "Quizzes"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-muted-foreground",
								children: "Test your knowledge with interactive quizzes."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/quizzes",
								className: "mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all",
								children: ["Start a quiz", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-4" })]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bio-panel p-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
								className: "flex items-center gap-2 font-display text-lg font-semibold",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PenTool, { className: "size-5" }), "Flashcards"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-muted-foreground",
								children: "Study with interactive flashcard sets."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/flashcards",
								className: "mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all",
								children: ["Study flashcards", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-4" })]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bio-panel p-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
								className: "flex items-center gap-2 font-display text-lg font-semibold",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bookmark, { className: "size-5" }), "Saved Content"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-muted-foreground",
								children: "Access all your bookmarked articles and pages."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/saved",
								className: "mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all",
								children: ["View saved content", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-4" })]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bio-panel p-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
								className: "flex items-center gap-2 font-display text-lg font-semibold",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-5" }), "Custom Lists"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-muted-foreground",
								children: "Create your own study lists and organize content."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/custom-lists",
								className: "mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all",
								children: ["Create a list", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-4" })]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bio-panel p-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
								className: "flex items-center gap-2 font-display text-lg font-semibold",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lightbulb, { className: "size-5" }), "Notebook"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-muted-foreground",
								children: "Take notes and organize your learning journey."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/notebook",
								className: "mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all",
								children: ["Open notebook", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-4" })]
							})
						]
					})
				]
			})
		] })
	});
}
//#endregion
export { Index as component };
