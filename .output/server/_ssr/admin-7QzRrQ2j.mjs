import { r as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { r as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as supabase } from "./router-uL0v7Ugr.mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as cn } from "./auth-CLCnuokL.mjs";
import { n as TSS_SERVER_FUNCTION, r as getServerFnById, t as createServerFn } from "./ssr.mjs";
import { t as Button } from "./button-D0rYmyz_.mjs";
import { t as AdminPage } from "./AdminPage-B4eN6mKW.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-7QzRrQ2j.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Card = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	ref,
	className: cn("rounded-xl border bg-card text-card-foreground shadow", className),
	...props
}));
Card.displayName = "Card";
var CardHeader = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	ref,
	className: cn("flex flex-col space-y-1.5 p-6", className),
	...props
}));
CardHeader.displayName = "CardHeader";
var CardTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	ref,
	className: cn("font-semibold leading-none tracking-tight", className),
	...props
}));
CardTitle.displayName = "CardTitle";
var CardDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
CardDescription.displayName = "CardDescription";
var CardContent = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	ref,
	className: cn("p-6 pt-0", className),
	...props
}));
CardContent.displayName = "CardContent";
var CardFooter = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	ref,
	className: cn("flex items-center p-6 pt-0", className),
	...props
}));
CardFooter.displayName = "CardFooter";
var badgeVariants = cva("inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2", {
	variants: { variant: {
		default: "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
		secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
		destructive: "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
		outline: "text-foreground"
	} },
	defaultVariants: { variant: "default" }
});
function Badge({ className, variant, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn(badgeVariants({ variant }), className),
		...props
	});
}
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var deployWebsite = createServerFn({ method: "POST" }).handler(createSsrRpc("3100e7ac1e04ef4e3a7a8d4b5bf203e98c3341e32723c505fc8616ff3e66639c"));
async function getDeploymentMetrics() {
	const { count: userCount } = await supabase.from("profiles").select("id", {
		count: "exact",
		head: true
	});
	const { data: settings } = await supabase.from("site_settings").select("key, value");
	const map = Object.fromEntries((settings ?? []).map((item) => [item.key, item.value]));
	return {
		users: userCount ?? 0,
		visits: Number(map.total_visits ?? map.visits ?? 0) || 0,
		downloads: Number(map.total_downloads ?? map.downloads ?? 0) || 0
	};
}
var db = supabase;
async function getContentStats() {
	const stats = [];
	for (const table of [
		{
			name: "articles",
			label: "Articles"
		},
		{
			name: "pages",
			label: "Pages"
		},
		{
			name: "sections",
			label: "Sections"
		},
		{
			name: "topics",
			label: "Topics"
		},
		{
			name: "videos",
			label: "Videos"
		},
		{
			name: "hero_slides",
			label: "Hero Slides"
		}
	]) try {
		const { data: allData } = await db.from(table.name).select("id, published").returns();
		const total = allData?.length ?? 0;
		const published = allData?.filter((item) => item.published).length ?? 0;
		const draft = total - published;
		stats.push({
			table: table.name,
			label: table.label,
			total,
			published,
			draft
		});
	} catch (error) {
		console.error(`Failed to get stats for ${table.name}:`, error);
	}
	return stats;
}
function AdminDashboard() {
	const { data: stats, isLoading } = useQuery({
		queryKey: ["admin-stats"],
		queryFn: getContentStats,
		staleTime: 6e4
	});
	const { data: deploymentMetrics } = useQuery({
		queryKey: ["deployment-metrics"],
		queryFn: getDeploymentMetrics,
		staleTime: 6e4
	});
	const deployMutation = useMutation({ mutationFn: deployWebsite });
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "text-sm text-muted-foreground",
		children: "Loading statistics..."
	});
	const totalContent = stats?.reduce((sum, s) => sum + s.total, 0) ?? 0;
	const totalPublished = stats?.reduce((sum, s) => sum + s.published, 0) ?? 0;
	const totalDraft = stats?.reduce((sum, s) => sum + s.draft, 0) ?? 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 md:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
						className: "p-6",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-sm font-medium text-muted-foreground",
								children: "Total Content"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-3xl font-bold",
								children: totalContent
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
						className: "p-6",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-sm font-medium text-muted-foreground",
								children: "Published"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-3xl font-bold text-green-600",
								children: totalPublished
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
						className: "p-6",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-sm font-medium text-muted-foreground",
								children: "Drafts"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-3xl font-bold text-amber-600",
								children: totalDraft
							})]
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mb-4 text-lg font-semibold",
					children: "Content Breakdown"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-3",
					children: stats?.map((stat) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between rounded-md border border-border p-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium",
								children: stat.label
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-xs text-muted-foreground",
										children: ["Total: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-semibold",
											children: stat.total
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-xs text-green-600",
										children: ["Published: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-semibold",
											children: stat.published
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-xs text-amber-600",
										children: ["Draft: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-semibold",
											children: stat.draft
										})]
									})
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex gap-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
								variant: "outline",
								className: "text-green-700",
								children: [Math.round(stat.published / Math.max(stat.total, 1) * 100), "%"]
							})
						})]
					}, stat.table))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-lg font-semibold",
							children: "Deployment"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							onClick: () => deployMutation.mutate(),
							disabled: deployMutation.isPending,
							children: deployMutation.isPending ? "Deploying..." : "Deploy to Internet"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 md:grid-cols-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-md border border-border bg-secondary/40 p-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs uppercase tracking-[0.12em] text-muted-foreground",
									children: "User board"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-3xl font-bold text-foreground",
									children: deploymentMetrics?.users ?? 0
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-md border border-border bg-secondary/40 p-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs uppercase tracking-[0.12em] text-muted-foreground",
									children: "Visit board"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-3xl font-bold text-foreground",
									children: deploymentMetrics?.visits ?? 0
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-md border border-border bg-secondary/40 p-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs uppercase tracking-[0.12em] text-muted-foreground",
									children: "Download board"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-3xl font-bold text-foreground",
									children: deploymentMetrics?.downloads ?? 0
								})]
							})
						]
					}),
					deployMutation.isSuccess && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 rounded-md border border-green-200 bg-green-50 p-3 text-sm text-green-800",
						children: ["Deployment started successfully. Production URL: ", deployMutation.data?.url]
					}),
					deployMutation.isError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700",
						children: deployMutation.error instanceof Error ? deployMutation.error.message : "Deployment failed."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mb-4 text-lg font-semibold",
					children: "Quick Links"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-2 md:grid-cols-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "/admin/articles",
							className: "rounded-md border border-border p-3 text-sm font-medium hover:bg-accent",
							children: "→ Manage Articles"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "/llm",
							className: "rounded-md border border-border p-3 text-sm font-medium hover:bg-accent",
							children: "→ Import local oMLX model"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "/admin/pages",
							className: "rounded-md border border-border p-3 text-sm font-medium hover:bg-accent",
							children: "→ Manage Pages"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "/admin/sections",
							className: "rounded-md border border-border p-3 text-sm font-medium hover:bg-accent",
							children: "→ Manage Sections"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "/admin/topics",
							className: "rounded-md border border-border p-3 text-sm font-medium hover:bg-accent",
							children: "→ Manage Topics"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "/sitemap.xml",
							className: "rounded-md border border-border p-3 text-sm font-medium hover:bg-accent",
							children: "→ View Sitemap"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "/admin/pages-list",
							className: "rounded-md border border-border p-3 text-sm font-medium hover:bg-accent",
							children: "→ All Pages"
						})
					]
				})]
			})
		]
	});
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminPage, {
	title: "Admin workspace",
	description: "Manage encyclopedia content, local AI, and deployment operations.",
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminDashboard, {})
});
//#endregion
export { SplitComponent as component };
