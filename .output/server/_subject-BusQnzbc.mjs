import { _ as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { o as require_jsx_runtime } from "./_libs/@radix-ui/react-collection+[...].mjs";
import { r as useQuery } from "./_libs/tanstack__react-query.mjs";
import { A as subjectSectionsQueryOptions, k as subjectQueryOptions$2, l as Route$80 } from "./_ssr/router-uL0v7Ugr2.mjs";
import { r as resolveImage } from "./_ssr/images-BfzzCxZw.mjs";
import { n as PageHeader, t as AppShell } from "./_ssr/AppShell-C9zRSJym.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_subject-BusQnzbc.js
var import_jsx_runtime = require_jsx_runtime();
function SubjectPage() {
	const { subject: initialSubject } = Route$80.useLoaderData();
	const { data: subject } = useQuery({
		...subjectQueryOptions$2(initialSubject.slug),
		initialData: initialSubject
	});
	const { data: sections } = useQuery({
		...subjectSectionsQueryOptions(subject.id),
		initialData: Route$80.useLoaderData().sections
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: (q) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: subject.title,
		description: subject.description ?? ""
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3",
		children: (sections ?? []).filter((s) => !q || `${s.title} ${s.description ?? ""}`.toLowerCase().includes(q)).map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: `/${subject.slug}/${s.slug}`,
			className: "block overflow-hidden bio-panel transition-colors hover:border-primary/50",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: resolveImage(s.image_url, s.image_key),
				alt: s.title,
				loading: "lazy",
				width: 512,
				height: 288,
				className: "h-28 w-full object-cover"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-sm font-semibold",
					children: s.title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-xs leading-relaxed text-muted-foreground",
					children: s.description
				})]
			})]
		}, s.id))
	})] }) });
}
//#endregion
export { SubjectPage as component };
