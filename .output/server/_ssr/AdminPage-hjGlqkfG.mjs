import { r as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as PageHeader, t as AppShell } from "./AppShell-6_41dtv3.mjs";
import { t as Button } from "./button-D0rYmyz_.mjs";
import { t as Input } from "./input-Ctxrk36z.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/AdminPage-hjGlqkfG.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var SESSION_KEY = "tedslab-admin-session";
var ADMIN_USERNAME = "admin";
function isAdminLoggedIn() {
	if (typeof window === "undefined") return false;
	try {
		return sessionStorage.getItem(SESSION_KEY) === "1";
	} catch {
		return false;
	}
}
function loginAdmin(username, password) {
	const ok = username.trim() === "admin" && password === "TedsLab!26";
	if (ok) sessionStorage.setItem(SESSION_KEY, "1");
	return ok;
}
function logoutAdmin() {
	try {
		sessionStorage.removeItem(SESSION_KEY);
	} catch {}
}
function AdminGate({ children }) {
	const [authed, setAuthed] = (0, import_react.useState)(() => isAdminLoggedIn());
	const [user, setUser] = (0, import_react.useState)("");
	const [pass, setPass] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)("");
	if (!authed) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-[70vh] items-center justify-center p-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "bio-panel w-full max-w-sm space-y-4 p-6",
			onSubmit: (e) => {
				e.preventDefault();
				if (loginAdmin(user, pass)) {
					setAuthed(true);
					setError("");
				} else setError("Wrong username or password.");
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-2xl font-bold",
					children: "Admin sign in"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: "Ted's Lab editorial desk."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "text-xs text-muted-foreground",
						children: "Username"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: user,
						onChange: (e) => setUser(e.target.value),
						autoComplete: "username"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "text-xs text-muted-foreground",
						children: "Password"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						type: "password",
						value: pass,
						onChange: (e) => setPass(e.target.value),
						autoComplete: "current-password"
					})]
				}),
				error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-destructive",
					children: error
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					className: "w-full",
					children: "Sign in"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-[11px] text-muted-foreground",
					children: [
						"Hint: user is ",
						ADMIN_USERNAME,
						"."
					]
				})
			]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-4 flex items-center justify-between",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "text-xs text-muted-foreground",
			children: ["Signed in as ", ADMIN_USERNAME]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			type: "button",
			variant: "outline",
			size: "sm",
			onClick: () => {
				logoutAdmin();
				setAuthed(false);
			},
			children: "Sign out"
		})]
	}), children] });
}
var links = [
	["Overview", "/admin"],
	["Articles", "/admin/articles"],
	["Pages", "/admin/pages"],
	["Sections", "/admin/sections"],
	["Topics", "/admin/topics"]
];
function AdminPage({ title, description, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminGate, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-2 border-b border-border pb-3",
				children: links.map(([label, href]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: href,
					className: "rounded-md border border-border px-3 py-2 text-xs font-medium text-muted-foreground hover:bg-secondary hover:text-foreground",
					children: label
				}, href))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				title,
				description
			}),
			children
		]
	}) }) });
}
//#endregion
export { AdminPage as t };
