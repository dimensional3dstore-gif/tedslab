import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as PolicySection, t as PolicyPage } from "./policy-CMv0M59x.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/privacy-CsFmSY6U.js
var import_jsx_runtime = require_jsx_runtime();
function PrivacyPolicyPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PolicyPage, {
		title: "Privacy notice",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PolicySection, {
				title: "Information handled",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "When account services are configured, sign-in and profile information is processed through the connected Supabase project. The deployed project configuration determines exact fields and retention." })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PolicySection, {
				title: "AI requests",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Study questions may be sent to a configured hosted AI provider by the tutor. Confirm the active provider, its data controls, and request logging before describing this service as private or local-only." })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PolicySection, {
				title: "Before publication",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Document the production database, analytics, cookies, retention periods, contact method, and applicable user rights here. This draft intentionally avoids making claims that have not been verified." })
			})
		]
	});
}
var SplitComponent = PrivacyPolicyPage;
//#endregion
export { SplitComponent as component };
