import { r as EXTINCT_SPECIES } from "./catalog-Du59BVWX.mjs";
import { x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { on as ArrowRight, rt as MapPin, sn as ArrowLeft } from "../_libs/lucide-react.mjs";
import { l as Route$5 } from "./router-DQlVO8DL.mjs";
import { r as resolveImage } from "./images-BfzzCxZw.mjs";
import { t as LostAtlasLayout } from "./layout-BLC-kldk.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/lost-atlas._slug-Dy-nInRN.js
var import_jsx_runtime = require_jsx_runtime();
function SpeciesRecordPage() {
	const { slug } = Route$5.useParams();
	const index = EXTINCT_SPECIES.findIndex((species) => species.slug === slug);
	const species = EXTINCT_SPECIES[index];
	if (!species) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LostAtlasLayout, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
		className: "font-display text-3xl font-bold text-foreground",
		children: "Species record not found"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to: "/lost-atlas",
		className: "text-sm font-medium text-primary hover:underline",
		children: "Return to Lost Planet"
	})] });
	const related = species.related_slugs.map((relatedSlug) => EXTINCT_SPECIES.find((item) => item.slug === relatedSlug)).filter((item) => Boolean(item));
	const previous = EXTINCT_SPECIES[index - 1];
	const next = EXTINCT_SPECIES[index + 1];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LostAtlasLayout, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/lost-atlas",
			className: "inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-3.5" }), " Lost Planet index"]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
			className: "overflow-hidden rounded-lg border border-border bg-card",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "grid md:grid-cols-[minmax(0,1fr)_minmax(260px,0.85fr)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col justify-center p-5 sm:p-8",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap gap-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-primary",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: species.taxonomic_group }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										"aria-hidden": "true",
										children: "·"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: species.extinction_period })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "mt-3 font-display text-4xl font-bold text-foreground",
								children: species.common_name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 font-serif text-lg italic text-muted-foreground",
								children: species.scientific_name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground",
								children: species.summary
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-5 inline-flex items-center gap-2 text-xs text-muted-foreground",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "size-3.5 text-primary" }),
									" ",
									species.region
								]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("figure", {
						className: "relative min-h-56 bg-secondary",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: resolveImage(null, species.image_key),
							alt: `Illustration representing ${species.common_name}`,
							className: "absolute inset-0 size-full object-cover"
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "grid border-y border-border sm:grid-cols-2 lg:grid-cols-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fact, {
							label: "Last record",
							value: species.last_record
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fact, {
							label: "Primary pressure",
							value: species.primary_driver
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fact, {
							label: "Range",
							value: species.region
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-8 p-5 sm:p-8 lg:grid-cols-[minmax(0,1fr)_240px]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-8",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArticleSection, {
								number: "01",
								title: "Habitat and life",
								body: species.habitat
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArticleSection, {
								number: "02",
								title: "Decline",
								body: species.decline_story
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArticleSection, {
								number: "03",
								title: "Evidence and uncertainty",
								body: species.evidence
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArticleSection, {
								number: "04",
								title: "What remains",
								body: species.legacy
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
						className: "h-fit border-l-2 border-primary/40 pl-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-semibold uppercase tracking-[0.12em] text-primary",
								children: "Extinction context"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-sm leading-relaxed text-muted-foreground",
								children: species.primary_driver
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-5 text-xs leading-relaxed text-muted-foreground",
								children: "Dates and causes are presented at the level supported by available records. For uncertain cases, the profile identifies what remains unresolved."
							})
						]
					})]
				})
			]
		}),
		related.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "space-y-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-xl font-semibold text-foreground",
				children: "Related species"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-3 sm:grid-cols-2 xl:grid-cols-3",
				children: related.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/lost-atlas/$slug",
					params: { slug: item.slug },
					className: "rounded-md border border-border p-4 hover:border-primary/50",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "block font-semibold text-foreground",
						children: item.common_name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "mt-1 block text-xs text-muted-foreground",
						children: [
							item.taxonomic_group,
							" · ",
							item.extinction_period
						]
					})]
				}, item.slug))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
			"aria-label": "Species record navigation",
			className: "flex items-center justify-between gap-4 border-t border-border pt-4",
			children: [previous ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/lost-atlas/$slug",
				params: { slug: previous.slug },
				className: "inline-flex min-w-0 items-center gap-2 text-sm text-muted-foreground hover:text-primary",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "truncate",
					children: previous.common_name
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {}), next ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/lost-atlas/$slug",
				params: { slug: next.slug },
				className: "inline-flex min-w-0 items-center gap-2 text-sm text-muted-foreground hover:text-primary",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "truncate",
					children: next.common_name
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4 shrink-0" })]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {})]
		})
	] });
}
function Fact({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-w-0 border-b border-border p-4 last:border-b-0 sm:border-r sm:last:border-r-0",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 text-sm leading-relaxed text-foreground",
			children: value
		})]
	});
}
function ArticleSection({ number, title, body }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "grid gap-3 sm:grid-cols-[44px_1fr]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-mono text-xs text-primary",
			children: number
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-display text-xl font-semibold text-foreground",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 max-w-3xl text-sm leading-7 text-muted-foreground",
			children: body
		})] })]
	});
}
//#endregion
export { SpeciesRecordPage as component };
