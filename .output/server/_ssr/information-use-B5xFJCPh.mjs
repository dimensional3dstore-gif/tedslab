import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as PolicySection, t as PolicyPage } from "./policy-6KTykp2B.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/information-use-B5xFJCPh.js
var import_jsx_runtime = require_jsx_runtime();
function InformationUsePage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PolicyPage, {
		title: "Information use",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PolicySection, {
				title: "Learning features",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Information entered into study tools is used to provide the requested feature. Notes in the Noter extension remain in the browser until exported; account-backed features may use the connected database." })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PolicySection, {
				title: "Model-generated output",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "AI-generated explanations can be incomplete or wrong. Check important claims against reliable sources, and do not use educational tools as a substitute for professional medical, legal, or safety advice." })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PolicySection, {
				title: "Service configuration",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Before relying on this statement, verify deployed provider settings, server logs, database policies, and retention behavior. Feature code alone does not establish production data practices." })
			})
		]
	});
}
var SplitComponent = InformationUsePage;
//#endregion
export { SplitComponent as component };
