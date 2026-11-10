import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as PageHeader, t as AppShell } from "./AppShell-BSLOU_FO.mjs";
import { t as AuthForm } from "./AuthForm-CKfCrFRg.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-MRcL_HLk.js
var import_jsx_runtime = require_jsx_runtime();
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
	className: "space-y-6",
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: "Sign in",
		description: "Pick up where you left off in the learning encyclopedia."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthForm, { mode: "signin" })]
}) });
//#endregion
export { SplitComponent as component };
