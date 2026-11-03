import { r as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as useAuth } from "./use-auth-Ct_UUEWR.mjs";
import { t as Button } from "./button-D0rYmyz_.mjs";
import { t as Input } from "./input-Ctxrk36z.mjs";
import { t as Label } from "./label-B2t3q3cY.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/settings-BGz82WDu.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SettingsPage() {
	const { user, loading } = useAuth();
	const [displayName, setDisplayName] = (0, import_react.useState)(user?.user_metadata?.display_name ?? "");
	const [email, setEmail] = (0, import_react.useState)(user?.email ?? "");
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "p-6 text-sm text-muted-foreground",
		children: "Loading..."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-2xl space-y-6 p-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "bio-panel p-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-semibold uppercase tracking-[0.12em] text-primary",
					children: "Account"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-2 font-display text-3xl font-bold text-foreground",
					children: "User settings"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Update your profile details and manage the account you use to study."
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "bio-panel space-y-6 p-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "display-name",
						children: "Display name"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "display-name",
						value: displayName,
						onChange: (e) => setDisplayName(e.target.value),
						placeholder: "Your name"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "email",
						children: "Email"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "email",
						value: email,
						onChange: (e) => setEmail(e.target.value),
						type: "email"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "rounded-xl border border-dashed border-border bg-secondary/30 p-4 text-sm text-muted-foreground",
					children: "This is the current account settings view. You can extend it later with password changes, notifications, or profile preferences."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						children: "Save changes"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/dashboard",
							children: "Back to dashboard"
						})
					})]
				})
			]
		})]
	});
}
//#endregion
export { SettingsPage as component };
