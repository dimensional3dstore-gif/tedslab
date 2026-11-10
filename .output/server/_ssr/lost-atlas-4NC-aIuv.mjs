import { r as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { N as Search, an as ArrowUpRight } from "../_libs/lucide-react.mjs";
import { a as EXTINCT_SPECIES } from "./router-uL0v7Ugr.mjs";
import { r as resolveImage } from "./images-BfzzCxZw.mjs";
import { t as Input } from "./input-Ctxrk36z.mjs";
import { t as LostAtlasLayout } from "./layout-C80h9lYV.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/lost-atlas-4NC-aIuv.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function LostAtlasPage() {
	const [query, setQuery] = (0, import_react.useState)("");
	const [group, setGroup] = (0, import_react.useState)("all");
	const groups = [...new Set(EXTINCT_SPECIES.map((species) => species.taxonomic_group))].sort();
	const normalizedQuery = query.trim().toLowerCase();
	const filtered = EXTINCT_SPECIES.filter((species) => {
		const matchesGroup = group === "all" || species.taxonomic_group === group;
		const searchable = [
			species.common_name,
			species.scientific_name,
			species.region,
			species.primary_driver
		].join(" ").toLowerCase();
		return matchesGroup && (!normalizedQuery || searchable.includes(normalizedQuery));
	});
	const featured = EXTINCT_SPECIES[0];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LostAtlasLayout, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "grid gap-6 border-b border-border pb-7 md:grid-cols-[1fr_280px] md:items-end",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-semibold uppercase tracking-[0.16em] text-primary",
					children: "Natural history · extinction records"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-3 font-display text-4xl font-bold text-foreground",
					children: "Lost Planet"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground",
					children: "A field atlas of extinct species: where they lived, what changed, and what the surviving evidence can still tell us."
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "border-l-2 border-primary pl-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-2xl font-bold text-foreground",
						children: EXTINCT_SPECIES.length
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: "species profiles"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "border-l-2 border-bio-cyan pl-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-2xl font-bold text-foreground",
						children: groups.length
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: "taxonomic groups"
					})]
				})]
			})]
		}),
		featured && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "grid overflow-hidden rounded-lg border border-border bg-card md:grid-cols-[1.1fr_0.9fr]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-5 sm:p-7",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-semibold uppercase tracking-[0.14em] text-primary",
						children: "Field note · first profile"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-3 font-display text-2xl font-bold text-foreground",
						children: featured.common_name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 font-serif italic text-sm text-muted-foreground",
						children: featured.scientific_name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground",
						children: featured.summary
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/lost-atlas/$slug",
						params: { slug: featured.slug },
						className: "mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline",
						children: ["Open species record ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "size-4" })]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: resolveImage(null, featured.image_key),
				alt: `Illustration representing ${featured.common_name}`,
				className: "aspect-[16/9] h-full min-h-48 w-full object-cover md:aspect-auto"
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			"aria-label": "Find a species",
			className: "grid gap-3 sm:grid-cols-[1fr_240px]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "relative",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "sr-only",
						children: "Search species, regions, or causes"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: query,
						onChange: (event) => setQuery(event.target.value),
						placeholder: "Search species, regions, or causes",
						className: "pl-9"
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "grid gap-1 text-xs text-muted-foreground",
				children: ["Taxonomic group", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
					value: group,
					onChange: (event) => setGroup(event.target.value),
					className: "h-10 rounded-md border border-input bg-background px-3 text-sm text-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "all",
						children: "All groups"
					}), groups.map((value) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value,
						children: value
					}, value))]
				})]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			"aria-label": "Extinct species records",
			className: "space-y-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-baseline justify-between gap-3 border-b border-border pb-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-xl font-semibold text-foreground",
					children: "Species records"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs text-muted-foreground",
					children: [filtered.length, " shown"]
				})]
			}), filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "rounded-md border border-dashed border-border p-6 text-center text-sm text-muted-foreground",
				children: "No species match those filters."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-3 md:grid-cols-2",
				children: filtered.map((species) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/lost-atlas/$slug",
					params: { slug: species.slug },
					className: "group grid min-w-0 grid-cols-[88px_1fr] overflow-hidden rounded-md border border-border bg-card transition-colors hover:border-primary/50",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: resolveImage(null, species.image_key),
						alt: "",
						loading: "lazy",
						className: "h-full min-h-28 w-full object-cover"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "min-w-0 p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex items-start justify-between gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "block truncate font-semibold text-foreground",
										children: species.common_name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "mt-0.5 block truncate font-serif text-xs italic text-muted-foreground",
										children: species.scientific_name
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "size-4 shrink-0 text-muted-foreground group-hover:text-primary" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mt-2 block truncate text-xs text-primary",
								children: species.region
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mt-1 block line-clamp-2 text-xs leading-relaxed text-muted-foreground",
								children: species.summary
							})
						]
					})]
				}, species.slug))
			})]
		})
	] });
}
var SplitComponent = LostAtlasPage;
//#endregion
export { SplitComponent as component };
