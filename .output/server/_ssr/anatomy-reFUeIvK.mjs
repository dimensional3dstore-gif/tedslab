import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { c as useSections, d as useTopics, n as PageHeader, t as AppShell, u as useSubjects } from "./AppShell-6_41dtv3.mjs";
import { t as TopicGrid } from "./TopicGrid-BQ6SMOqh.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/anatomy-reFUeIvK.js
var import_jsx_runtime = require_jsx_runtime();
var SECTION_SLUG = "anatomy";
function SectionPage() {
	const { data: sections = [] } = useSections();
	const { data: topics = [] } = useTopics();
	const { data: subjects = [] } = useSubjects();
	const section = sections.find((s) => s.slug === SECTION_SLUG);
	const subject = section ? subjects.find((s) => s.id === section.subject_id) : void 0;
	const sectionTopics = section ? topics.filter((t) => t.section_id === section.id) : [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: (q) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: section?.title ?? "",
		description: section?.description ?? ""
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TopicGrid, {
		sectionSlug: SECTION_SLUG,
		subjectSlug: subject?.slug,
		topics: q ? sectionTopics.filter((t) => `${t.title} ${t.blurb ?? ""}`.toLowerCase().includes(q)) : sectionTopics
	})] }) });
}
//#endregion
export { SectionPage as component };
