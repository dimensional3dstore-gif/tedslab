import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { s as Route$4 } from "./router-BOjcgrMn2.mjs";
import { n as PageHeader, t as AppShell } from "./AppShell-BSLOU_FO.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/pages._slug-Ni4D1yh8.js
var import_jsx_runtime = require_jsx_runtime();
function PageComponent() {
	const { page: initialPage } = Route$4.useLoaderData();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "max-w-4xl mx-auto",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				title: initialPage.title,
				description: initialPage.description ?? ""
			}),
			initialPage.image_url && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: initialPage.image_url,
				alt: initialPage.title,
				loading: "lazy",
				className: "mt-6 w-full rounded-lg border border-border object-cover max-h-96"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 prose prose-sm max-w-none text-foreground",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-sm leading-relaxed text-muted-foreground whitespace-pre-wrap",
					dangerouslySetInnerHTML: { __html: initialPage.body ?? "" }
				})
			})
		]
	}) });
}
//#endregion
export { PageComponent as component };
