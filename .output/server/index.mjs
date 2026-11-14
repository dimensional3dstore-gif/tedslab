globalThis.__nitro_main__ = import.meta.url;
import { n as HTTPError, r as defineLazyEventHandler, t as H3Core } from "./_libs/h3+rou3+srvx.mjs";
import { t as HookableCore } from "./_libs/hookable.mjs";
import { r as FastResponse } from "./_libs/h3-v2+rou3+srvx.mjs";
//#region #nitro-vite-setup
function lazyService(loader) {
	let promise, mod;
	return { fetch(req) {
		if (mod) return mod.fetch(req);
		if (!promise) promise = loader().then((_mod) => mod = _mod.default || _mod);
		return promise.then((mod) => mod.fetch(req));
	} };
}
var services = { ["ssr"]: lazyService(() => import("./_ssr/ssr.mjs")) };
globalThis.__nitro_vite_envs__ = services;
//#endregion
//#region #nitro/virtual/public-assets-data
var public_assets_data_default = {
	"/favicon.png": {
		"type": "image/png",
		"etag": "\"e7c-rpz6kO3Q2jWZGiO7JLjaVb0cRkA\"",
		"mtime": "2026-11-13T22:35:26.844Z",
		"size": 3708,
		"path": "../public/favicon.png"
	},
	"/logo.png": {
		"type": "image/png",
		"etag": "\"71d5-iC+KKvoAskwLdT7EV0YCsHQFXYw\"",
		"mtime": "2026-11-13T22:35:26.844Z",
		"size": 29141,
		"path": "../public/logo.png"
	},
	"/robots.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"ec-3buti6v9Xr+gI3SlCHLfqVwS0tE\"",
		"mtime": "2026-11-13T22:35:26.844Z",
		"size": 236,
		"path": "../public/robots.txt"
	},
	"/assets/AdminPage-5UwFgh9g.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ab8-B87T+hGwj1lwSbpznztzvwNVk3c\"",
		"mtime": "2026-11-13T22:35:24.550Z",
		"size": 2744,
		"path": "../public/assets/AdminPage-5UwFgh9g.js"
	},
	"/assets/ArticleCard-9A1Q7iwz.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"bc3-7XyUAAuu6oRSoxVwyrzTT42txYc\"",
		"mtime": "2026-11-13T22:35:24.551Z",
		"size": 3011,
		"path": "../public/assets/ArticleCard-9A1Q7iwz.js"
	},
	"/assets/ArticleTemplate-BfZn1Lz_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1e79-cmpgiW7l5xJS1rIFS9iOUO2rCII\"",
		"mtime": "2026-11-13T22:35:24.551Z",
		"size": 7801,
		"path": "../public/assets/ArticleTemplate-BfZn1Lz_.js"
	},
	"/assets/AuthForm-D28SZgGN.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"11fc-468yF1qjgWHAlQkT5GHNPeUotY4\"",
		"mtime": "2026-11-13T22:35:24.551Z",
		"size": 4604,
		"path": "../public/assets/AuthForm-D28SZgGN.js"
	},
	"/assets/PlatformPlaceholderPage-C1vagdo2.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"879-c4Oy2AKtO/yWBbdGyM9nZl34aHo\"",
		"mtime": "2026-11-13T22:35:24.551Z",
		"size": 2169,
		"path": "../public/assets/PlatformPlaceholderPage-C1vagdo2.js"
	},
	"/assets/TopicGrid-DysA_CdS.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d06-XFj1msbvGE/xyibl0YpwaS4pepQ\"",
		"mtime": "2026-11-13T22:35:24.551Z",
		"size": 3334,
		"path": "../public/assets/TopicGrid-DysA_CdS.js"
	},
	"/assets/_section._topic-AKm7B1Ro.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9a3-fUc4m3xi2PJiRyM6zez32BgPR2c\"",
		"mtime": "2026-11-13T22:35:24.551Z",
		"size": 2467,
		"path": "../public/assets/_section._topic-AKm7B1Ro.js"
	},
	"/assets/_subject-DBLEc_sJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4c4-uKSesy1jPm3SdzAL4eDx8GmdR8g\"",
		"mtime": "2026-11-13T22:35:24.551Z",
		"size": 1220,
		"path": "../public/assets/_subject-DBLEc_sJ.js"
	},
	"/assets/_subject._section-BWE9jkuY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8a1-AmlESDpfucdyrLGU7O085lTRcFY\"",
		"mtime": "2026-11-13T22:35:24.551Z",
		"size": 2209,
		"path": "../public/assets/_subject._section-BWE9jkuY.js"
	},
	"/assets/_subject._section._topic-EPxQ0QY6.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9b8-9kfyVs87v+2jIswxy4KMb+sfxzo\"",
		"mtime": "2026-11-13T22:35:24.551Z",
		"size": 2488,
		"path": "../public/assets/_subject._section._topic-EPxQ0QY6.js"
	},
	"/assets/add-app-nVI54K6r.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a3-OYX3cwiSVqiRgW7AECjA69UfsU8\"",
		"mtime": "2026-11-13T22:35:24.551Z",
		"size": 419,
		"path": "../public/assets/add-app-nVI54K6r.js"
	},
	"/assets/admin-Dj5yVxBs.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3a84-sdOpml3uUgBvXakup8DY59BkxZk\"",
		"mtime": "2026-11-13T22:35:24.551Z",
		"size": 14980,
		"path": "../public/assets/admin-Dj5yVxBs.js"
	},
	"/assets/admin.articles-DzTNZhgO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"447-Kn9pT5A4yQ/gzE3J3DmZ1yiUpk4\"",
		"mtime": "2026-11-13T22:35:24.551Z",
		"size": 1095,
		"path": "../public/assets/admin.articles-DzTNZhgO.js"
	},
	"/assets/admin.articles.new-CW6fSvye.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"12a7-0QFalJasm1qJpN7v1gE+T2aqCsE\"",
		"mtime": "2026-11-13T22:35:24.551Z",
		"size": 4775,
		"path": "../public/assets/admin.articles.new-CW6fSvye.js"
	},
	"/assets/admin.pages--eR13CN_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a6-Wcev014gLYASzbPp/fQNI7633u8\"",
		"mtime": "2026-11-13T22:35:24.551Z",
		"size": 422,
		"path": "../public/assets/admin.pages--eR13CN_.js"
	},
	"/assets/admin.pages-list-yGzy8O3E.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"16e-d9Sl+qmpO3+QfZL1XyR3ULcI/JA\"",
		"mtime": "2026-11-13T22:35:24.551Z",
		"size": 366,
		"path": "../public/assets/admin.pages-list-yGzy8O3E.js"
	},
	"/assets/admin.sections-CXT_b9lK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"187-mernruySyl4KLDqYYG/rjTKbaUI\"",
		"mtime": "2026-11-13T22:35:24.552Z",
		"size": 391,
		"path": "../public/assets/admin.sections-CXT_b9lK.js"
	},
	"/assets/admin.topics-CB974fb7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"18b-F5eZJCAxbyVBxWC20XbUR/uRR9E\"",
		"mtime": "2026-11-13T22:35:24.552Z",
		"size": 395,
		"path": "../public/assets/admin.topics-CB974fb7.js"
	},
	"/assets/ai-Iv4eGN1K.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4026-BA1W30IWC0nNqNq3l72oxulDAsg\"",
		"mtime": "2026-11-13T22:35:24.552Z",
		"size": 16422,
		"path": "../public/assets/ai-Iv4eGN1K.js"
	},
	"/assets/anatomy-B4h_NcTF.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"27d-VjangBsEcsLk1+rBVo2I/BnnF8g\"",
		"mtime": "2026-11-13T22:35:24.552Z",
		"size": 637,
		"path": "../public/assets/anatomy-B4h_NcTF.js"
	},
	"/assets/annotation-sys-BA85FWuK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"184-9Vz/mSRqEFnz87KCv61g242jA94\"",
		"mtime": "2026-11-13T22:35:24.552Z",
		"size": 388,
		"path": "../public/assets/annotation-sys-BA85FWuK.js"
	},
	"/assets/AppShell-BpiUZrNx.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"98ad7-/NIQMFm6AwpGYtDp7O3DVq7Vz/w\"",
		"mtime": "2026-11-13T22:35:24.550Z",
		"size": 625367,
		"path": "../public/assets/AppShell-BpiUZrNx.js"
	},
	"/assets/articles-CJhOkyaU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"434-FtM+vpzR9tcWp8+P9DEk2BHAS+8\"",
		"mtime": "2026-11-13T22:35:24.552Z",
		"size": 1076,
		"path": "../public/assets/articles-CJhOkyaU.js"
	},
	"/assets/articles-debug-FAC-HAnP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"12f9-TEWXr98dOqbVeTmKHXWKWUd+fCs\"",
		"mtime": "2026-11-13T22:35:24.552Z",
		"size": 4857,
		"path": "../public/assets/articles-debug-FAC-HAnP.js"
	},
	"/assets/articles._slug-Ic1LqsLD.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"248-bHf9a6YyW20RwZ96fhYwKPO7JGQ\"",
		"mtime": "2026-11-13T22:35:24.552Z",
		"size": 584,
		"path": "../public/assets/articles._slug-Ic1LqsLD.js"
	},
	"/assets/articles.cellular-respiration-C7QoP2pD.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1fe1-29FAVaFwgEESxIfF5ufmIZDBpNg\"",
		"mtime": "2026-11-13T22:35:24.552Z",
		"size": 8161,
		"path": "../public/assets/articles.cellular-respiration-C7QoP2pD.js"
	},
	"/assets/articles.enzyme-catalysis-By_jxlov.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e7f-gfOnXnIKe4UXlk+M6BNUtoA61Tk\"",
		"mtime": "2026-11-13T22:35:24.552Z",
		"size": 3711,
		"path": "../public/assets/articles.enzyme-catalysis-By_jxlov.js"
	},
	"/assets/articles.evolution-natural-selection-vHoSZcCB.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ede-gYNhiMortcwjSPHVJj8Ehqzilco\"",
		"mtime": "2026-11-13T22:35:24.552Z",
		"size": 3806,
		"path": "../public/assets/articles.evolution-natural-selection-vHoSZcCB.js"
	},
	"/assets/articles.food-chains-energy-flow-BgTYdlQX.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e99-e4ZJxXjXCL80Wbr6kGy6vHaF3NY\"",
		"mtime": "2026-11-13T22:35:24.552Z",
		"size": 3737,
		"path": "../public/assets/articles.food-chains-energy-flow-BgTYdlQX.js"
	},
	"/assets/articles.human-anatomy-systems-BtQctWN8.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e86-dr0dcs+0dttFL7Kk2bEGUgCOGso\"",
		"mtime": "2026-11-13T22:35:24.552Z",
		"size": 3718,
		"path": "../public/assets/articles.human-anatomy-systems-BtQctWN8.js"
	},
	"/assets/articles.meiosis-gamete-formation-amMZ4km9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e92-Te+QHQmGLFYGZdzm2WE8tdcxVl4\"",
		"mtime": "2026-11-13T22:35:24.552Z",
		"size": 3730,
		"path": "../public/assets/articles.meiosis-gamete-formation-amMZ4km9.js"
	},
	"/assets/articles.mitosis-cell-division-De04lJdA.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ecb-YmukZJ66JyeyGCxKBr4JJrLY9SE\"",
		"mtime": "2026-11-13T22:35:24.552Z",
		"size": 3787,
		"path": "../public/assets/articles.mitosis-cell-division-De04lJdA.js"
	},
	"/assets/articles.photosynthesis-light-reactions-C5D9vkmH.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"eaa-nG4IV7UDWysUIf+ym5tioh41IWo\"",
		"mtime": "2026-11-13T22:35:24.552Z",
		"size": 3754,
		"path": "../public/assets/articles.photosynthesis-light-reactions-C5D9vkmH.js"
	},
	"/assets/auth-BkIX60WD.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"182-mZWLeDx4gl7v3OSU9AHm0OLrv2Y\"",
		"mtime": "2026-11-13T22:35:24.553Z",
		"size": 386,
		"path": "../public/assets/auth-BkIX60WD.js"
	},
	"/assets/auth-w2BNGNBv.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6b09-Uq5gr3xZFyLseqlHgf1Y6zIVbLg\"",
		"mtime": "2026-11-13T22:35:24.553Z",
		"size": 27401,
		"path": "../public/assets/auth-w2BNGNBv.js"
	},
	"/assets/biological-processes-BNvGE6nU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"28a-sa2ONV6c4EgBYNTldU+/H61q5pQ\"",
		"mtime": "2026-11-13T22:35:24.553Z",
		"size": 650,
		"path": "../public/assets/biological-processes-BNvGE6nU.js"
	},
	"/assets/biopedia-data-DJbT4MOb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4c9-y0AzIPFEOC8TKUKvFonQwHo3RbA\"",
		"mtime": "2026-11-13T22:35:24.553Z",
		"size": 1225,
		"path": "../public/assets/biopedia-data-DJbT4MOb.js"
	},
	"/assets/biotechnology-zuTTV0Kd.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"283-5y585eiZI2UNPY/EkQLLvBZ+BOE\"",
		"mtime": "2026-11-13T22:35:24.553Z",
		"size": 643,
		"path": "../public/assets/biotechnology-zuTTV0Kd.js"
	},
	"/assets/button-eo4EVWdK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"79e-uoP+E68zIbpe0U/A77Lswydm0+Y\"",
		"mtime": "2026-11-13T22:35:24.553Z",
		"size": 1950,
		"path": "../public/assets/button-eo4EVWdK.js"
	},
	"/assets/cat-ecology-DbnEUXHR.jpg": {
		"type": "image/jpeg",
		"etag": "\"2da9e-OCrQ+5HxBL/MeFpjI2Ml9mEB6CQ\"",
		"mtime": "2026-11-13T22:35:24.559Z",
		"size": 187038,
		"path": "../public/assets/cat-ecology-DbnEUXHR.jpg"
	},
	"/assets/cat-evolution-CC_w4loO.jpg": {
		"type": "image/jpeg",
		"etag": "\"2fdbd-seNsXnl4XHNUY71qgNreqGrRZEg\"",
		"mtime": "2026-11-13T22:35:24.559Z",
		"size": 196029,
		"path": "../public/assets/cat-evolution-CC_w4loO.jpg"
	},
	"/assets/cat-genetics-C6CBosmo.jpg": {
		"type": "image/jpeg",
		"etag": "\"281ff-qhaiIvZ8BDqFMGgfDXNC3bv5mFo\"",
		"mtime": "2026-11-13T22:35:24.559Z",
		"size": 164351,
		"path": "../public/assets/cat-genetics-C6CBosmo.jpg"
	},
	"/assets/cat-human-BuRMR2jH.jpg": {
		"type": "image/jpeg",
		"etag": "\"23326-4wTTr4zzrFQf89XTkJyXsX8rXHg\"",
		"mtime": "2026-11-13T22:35:24.560Z",
		"size": 144166,
		"path": "../public/assets/cat-human-BuRMR2jH.jpg"
	},
	"/assets/cat-organisms-yXH6lJcJ.jpg": {
		"type": "image/jpeg",
		"etag": "\"2acbe-1G/hL2bGRo8MkA9mSKQX6eYai7o\"",
		"mtime": "2026-11-13T22:35:24.560Z",
		"size": 175294,
		"path": "../public/assets/cat-organisms-yXH6lJcJ.jpg"
	},
	"/assets/cat-plants-Bu_hoilj.jpg": {
		"type": "image/jpeg",
		"etag": "\"3af5b-WyZ9BT5qxBZaWxxjuNNVL7/2IO0\"",
		"mtime": "2026-11-13T22:35:24.560Z",
		"size": 241499,
		"path": "../public/assets/cat-plants-Bu_hoilj.jpg"
	},
	"/assets/catalog-B1y8wtw8.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1384d-bRV7UJeyNFkwxARDsKWejTyR6bo\"",
		"mtime": "2026-11-13T22:35:24.553Z",
		"size": 79949,
		"path": "../public/assets/catalog-B1y8wtw8.js"
	},
	"/assets/categories-kMO1x_EW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3e2-cC4q5uD2ksq6sFVDNl3bOExOSDQ\"",
		"mtime": "2026-11-13T22:35:24.553Z",
		"size": 994,
		"path": "../public/assets/categories-kMO1x_EW.js"
	},
	"/assets/cells-microscopy-ECpeaqC5.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"286-BzdJymW1nUmrfh8I4xfY84ssBIg\"",
		"mtime": "2026-11-13T22:35:24.553Z",
		"size": 646,
		"path": "../public/assets/cells-microscopy-ECpeaqC5.js"
	},
	"/assets/chronos-os-CIIFQw1x.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ee1-YrVL9QPciwJb6wfVW2gdu9t1h50\"",
		"mtime": "2026-11-13T22:35:24.553Z",
		"size": 3809,
		"path": "../public/assets/chronos-os-CIIFQw1x.js"
	},
	"/assets/chronos-os-download-DL3h9tCL.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"67a-eLZwJJLSHHm9f9/bOHR2yOpcMdE\"",
		"mtime": "2026-11-13T22:35:24.553Z",
		"size": 1658,
		"path": "../public/assets/chronos-os-download-DL3h9tCL.js"
	},
	"/assets/client-k3juqDS2.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"341-jtnognX5avNbfZfgW3Um+VkOoVw\"",
		"mtime": "2026-11-13T22:35:24.553Z",
		"size": 833,
		"path": "../public/assets/client-k3juqDS2.js"
	},
	"/assets/communicational-system-C9cIn-MS.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a2-aFvqN2GjyWEb4H+7+7GMxirRlOY\"",
		"mtime": "2026-11-13T22:35:24.553Z",
		"size": 418,
		"path": "../public/assets/communicational-system-C9cIn-MS.js"
	},
	"/assets/createLucideIcon-Dj-b7IgG.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4d2-y9LPMf1peDtmMMfdaSv6TxN4Dcw\"",
		"mtime": "2026-11-13T22:35:24.553Z",
		"size": 1234,
		"path": "../public/assets/createLucideIcon-Dj-b7IgG.js"
	},
	"/assets/custom-lists-C5JjjvHh.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b41-gl+IRL7UOAKpL3aAAFLrjyJT9xg\"",
		"mtime": "2026-11-13T22:35:24.553Z",
		"size": 2881,
		"path": "../public/assets/custom-lists-C5JjjvHh.js"
	},
	"/assets/dashboard-DOX6Hzuh.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"506-E/f3YV3dZsbN2TbXNywiJ2ZokwE\"",
		"mtime": "2026-11-13T22:35:24.554Z",
		"size": 1286,
		"path": "../public/assets/dashboard-DOX6Hzuh.js"
	},
	"/assets/decipher-g_E1ps46.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"16f-vJnnPkCEpTDRyn6ZFlALwbbF3Uo\"",
		"mtime": "2026-11-13T22:35:24.554Z",
		"size": 367,
		"path": "../public/assets/decipher-g_E1ps46.js"
	},
	"/assets/dev-dashboard-V9wL-CnI.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"10ce-NMVmX8kpC30/QwAOgsyFmaBU3Mc\"",
		"mtime": "2026-11-13T22:35:24.554Z",
		"size": 4302,
		"path": "../public/assets/dev-dashboard-V9wL-CnI.js"
	},
	"/assets/dev-tools-C7sqD0G-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1362-yQU9HaRm5wsj1qG6XS7O58i0o9M\"",
		"mtime": "2026-11-13T22:35:24.554Z",
		"size": 4962,
		"path": "../public/assets/dev-tools-C7sqD0G-.js"
	},
	"/assets/discovery-leaf-B4lyAWC2.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3b-my347b2NUKvD+XRT+D6BbNxbmjg\"",
		"mtime": "2026-11-13T22:35:24.554Z",
		"size": 59,
		"path": "../public/assets/discovery-leaf-B4lyAWC2.js"
	},
	"/assets/discovery-leaf-CDLQK6NX.jpg": {
		"type": "image/jpeg",
		"etag": "\"292a2-sl75CS6OW2pQPTWnj52a0F63jwo\"",
		"mtime": "2026-11-13T22:35:24.560Z",
		"size": 168610,
		"path": "../public/assets/discovery-leaf-CDLQK6NX.jpg"
	},
	"/assets/dist-BjBUWv6a2.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2da-WwWt1qZQmGbHdLK9O4pnRIZWhdk\"",
		"mtime": "2026-11-13T22:35:24.554Z",
		"size": 730,
		"path": "../public/assets/dist-BjBUWv6a2.js"
	},
	"/assets/dist-InrptS_j.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b5c-tDOv40nvzeKr7MTjx3bMlHybUro\"",
		"mtime": "2026-11-13T22:35:24.554Z",
		"size": 2908,
		"path": "../public/assets/dist-InrptS_j.js"
	},
	"/assets/download-R5xOK4q6.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"94-oPvdxS06Izwg12Sb8zWGi22/u9s\"",
		"mtime": "2026-11-13T22:35:24.554Z",
		"size": 148,
		"path": "../public/assets/download-R5xOK4q6.js"
	},
	"/assets/downloadable-software-C33YisKb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"46-P5cA7QwegpIdKHY+yN6wzJQltdM\"",
		"mtime": "2026-11-13T22:35:24.554Z",
		"size": 70,
		"path": "../public/assets/downloadable-software-C33YisKb.js"
	},
	"/assets/ecology-environment-DLfg2p-1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"289-hN2leWSUVf7tHYrUo8DaWX/zX5s\"",
		"mtime": "2026-11-13T22:35:24.555Z",
		"size": 649,
		"path": "../public/assets/ecology-environment-DLfg2p-1.js"
	},
	"/assets/eng-grammar-B1tMmnMx.jpg": {
		"type": "image/jpeg",
		"etag": "\"74c1-XK8BNB8ZAYcd/TE7F0EdV/8Ul8I\"",
		"mtime": "2026-11-13T22:35:24.560Z",
		"size": 29889,
		"path": "../public/assets/eng-grammar-B1tMmnMx.jpg"
	},
	"/assets/eng-literature-BajHjXyN.jpg": {
		"type": "image/jpeg",
		"etag": "\"cc62-NF9kB2OyFm1zMZ+Oih1ZHorruYg\"",
		"mtime": "2026-11-13T22:35:24.560Z",
		"size": 52322,
		"path": "../public/assets/eng-literature-BajHjXyN.jpg"
	},
	"/assets/eng-poetry-BQYnMCQa.jpg": {
		"type": "image/jpeg",
		"etag": "\"10239-W3/DnYSqaKLw+1EOhXvOc98a4PU\"",
		"mtime": "2026-11-13T22:35:24.560Z",
		"size": 66105,
		"path": "../public/assets/eng-poetry-BQYnMCQa.jpg"
	},
	"/assets/eng-writing-DkEjUsar.jpg": {
		"type": "image/jpeg",
		"etag": "\"9cc3-ee85EOsBs2794hyQ7ENTiSRcMx8\"",
		"mtime": "2026-11-13T22:35:24.561Z",
		"size": 40131,
		"path": "../public/assets/eng-writing-DkEjUsar.jpg"
	},
	"/assets/evolution-QeCLVUW3.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"27f-NP3eKG+If1fwkyEV9J9UyK6Emu8\"",
		"mtime": "2026-11-13T22:35:24.555Z",
		"size": 639,
		"path": "../public/assets/evolution-QeCLVUW3.js"
	},
	"/assets/extension-tools-upload-xnN_5p1E.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"19b-PQLwL5TmlvPpaWtic0Y09f2zfAc\"",
		"mtime": "2026-11-13T22:35:24.555Z",
		"size": 411,
		"path": "../public/assets/extension-tools-upload-xnN_5p1E.js"
	},
	"/assets/docs-Hq6vIDu6.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"85754-dd7InTQTsA6+/ZBkGG/OVsD6Cu0\"",
		"mtime": "2026-11-13T22:35:24.554Z",
		"size": 546644,
		"path": "../public/assets/docs-Hq6vIDu6.js"
	},
	"/assets/extensions-LuwtREFU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"46-YvE9h4s0Cj2DRmcBvMyYZ6Pj7qU\"",
		"mtime": "2026-11-13T22:35:24.555Z",
		"size": 70,
		"path": "../public/assets/extensions-LuwtREFU.js"
	},
	"/assets/extensions.noter-C6sl8PCZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"46-2hvRo2aw+yatixEA0CqjoDtEVSc\"",
		"mtime": "2026-11-13T22:35:24.555Z",
		"size": 70,
		"path": "../public/assets/extensions.noter-C6sl8PCZ.js"
	},
	"/assets/flashcards-dg5ppSWd.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"44e-ZHgKrYtH3c5Sk5Wy/RcbMWr0XuU\"",
		"mtime": "2026-11-13T22:35:24.555Z",
		"size": 1102,
		"path": "../public/assets/flashcards-dg5ppSWd.js"
	},
	"/assets/genetics-dna-BoaVjPnj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"282-CQWvhEuraNzNG0+eF6AFCXg3dGY\"",
		"mtime": "2026-11-13T22:35:24.555Z",
		"size": 642,
		"path": "../public/assets/genetics-dna-BoaVjPnj.js"
	},
	"/assets/glossary-CyYhykXt.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"36b-LdknwR1wsiaAMV2h4VyNOJNkYoM\"",
		"mtime": "2026-11-13T22:35:24.555Z",
		"size": 875,
		"path": "../public/assets/glossary-CyYhykXt.js"
	},
	"/assets/graphication-BLzNEqkk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"179-mZgQMiMWWBJrc7d54z1/PT8ja7U\"",
		"mtime": "2026-11-13T22:35:24.555Z",
		"size": 377,
		"path": "../public/assets/graphication-BLzNEqkk.js"
	},
	"/assets/help-center-Bk-F63Fv.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"14af-pxUa2M+iUUanr8KN8GpRsrOFmGs\"",
		"mtime": "2026-11-13T22:35:24.555Z",
		"size": 5295,
		"path": "../public/assets/help-center-Bk-F63Fv.js"
	},
	"/assets/hero-cell-BewOnWpW.jpg": {
		"type": "image/jpeg",
		"etag": "\"40c11-gRZUnBDNdykEsTfNLMgxrZ+4OcU\"",
		"mtime": "2026-11-13T22:35:24.561Z",
		"size": 265233,
		"path": "../public/assets/hero-cell-BewOnWpW.jpg"
	},
	"/assets/his-ancient-D_3kmTQu.jpg": {
		"type": "image/jpeg",
		"etag": "\"124b1-VN0HL9ZUiqcfpgKsq+4JPZ2wA70\"",
		"mtime": "2026-11-13T22:35:24.561Z",
		"size": 74929,
		"path": "../public/assets/his-ancient-D_3kmTQu.jpg"
	},
	"/assets/his-medieval-Z1UQ46lz.jpg": {
		"type": "image/jpeg",
		"etag": "\"94dd-hwSoe+zL6tyOotdQvEYv56k0YhM\"",
		"mtime": "2026-11-13T22:35:24.561Z",
		"size": 38109,
		"path": "../public/assets/his-medieval-Z1UQ46lz.jpg"
	},
	"/assets/his-revolutions-BKB1brIf.jpg": {
		"type": "image/jpeg",
		"etag": "\"f396-a6hL0Vst70K1o9x2ypegAAHcKWs\"",
		"mtime": "2026-11-13T22:35:24.561Z",
		"size": 62358,
		"path": "../public/assets/his-revolutions-BKB1brIf.jpg"
	},
	"/assets/his-wars-Dja4_BlN.jpg": {
		"type": "image/jpeg",
		"etag": "\"e5ca-2jcnizpZCZIyPz3NRRyhh6p2aUw\"",
		"mtime": "2026-11-13T22:35:24.561Z",
		"size": 58826,
		"path": "../public/assets/his-wars-Dja4_BlN.jpg"
	},
	"/assets/human-biology-DRfIUQsk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"283-YcTLcDRoVMU9TWfFrlSQHmOw2/Q\"",
		"mtime": "2026-11-13T22:35:24.555Z",
		"size": 643,
		"path": "../public/assets/human-biology-DRfIUQsk.js"
	},
	"/assets/ide-system-aOlPFfnv.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a1-vD399muksNh0TdT1/OCVo1gm+ZU\"",
		"mtime": "2026-11-13T22:35:24.555Z",
		"size": 417,
		"path": "../public/assets/ide-system-aOlPFfnv.js"
	},
	"/assets/images-xGwTEqeS.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6c7-Pk/YMa5itOlpzK6ZTBCO7vItja8\"",
		"mtime": "2026-11-13T22:35:24.555Z",
		"size": 1735,
		"path": "../public/assets/images-xGwTEqeS.js"
	},
	"/assets/index-D1cAEvbP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"60dea-9ymd6ExPa/MLVLMmTLzqHeD+gLo\"",
		"mtime": "2026-11-13T22:35:24.550Z",
		"size": 396778,
		"path": "../public/assets/index-D1cAEvbP.js"
	},
	"/assets/information-use-DGnWf6X0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"413-9wDBBiMX0IxrjUydKtMzKbRgS5k\"",
		"mtime": "2026-11-13T22:35:24.555Z",
		"size": 1043,
		"path": "../public/assets/information-use-DGnWf6X0.js"
	},
	"/assets/input-CYV5x1jB.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"282-NLDJwxTFy0r16g/TR2HUhczkJ/c\"",
		"mtime": "2026-11-13T22:35:24.555Z",
		"size": 642,
		"path": "../public/assets/input-CYV5x1jB.js"
	},
	"/assets/jsx-runtime-Cx0BB4qO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"440-7GwVHNgO4EUMk3cR4Bh6KGJPPX4\"",
		"mtime": "2026-11-13T22:35:24.555Z",
		"size": 1088,
		"path": "../public/assets/jsx-runtime-Cx0BB4qO.js"
	},
	"/assets/label-yo2XPAZT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2e5-tz9C3GHX5eaY553JtdypmOmCRgo\"",
		"mtime": "2026-11-13T22:35:24.556Z",
		"size": 741,
		"path": "../public/assets/label-yo2XPAZT.js"
	},
	"/assets/layout-D4VGb_Gg.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f2-vasyrxhs14hbAWME63KpL5hKZec\"",
		"mtime": "2026-11-13T22:35:24.556Z",
		"size": 242,
		"path": "../public/assets/layout-D4VGb_Gg.js"
	},
	"/assets/link-D9EgcF10.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"496c-BET0AyjJ/l0ct+trLgIFpQJNEbY\"",
		"mtime": "2026-11-13T22:35:24.556Z",
		"size": 18796,
		"path": "../public/assets/link-D9EgcF10.js"
	},
	"/assets/llm-CflI0vLS.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2ec9-klEjAI3oTK+wx3bAnF7CtE23Rqg\"",
		"mtime": "2026-11-13T22:35:24.556Z",
		"size": 11977,
		"path": "../public/assets/llm-CflI0vLS.js"
	},
	"/assets/logo-tedslab-CSGR30te.png": {
		"type": "image/png",
		"etag": "\"7caa0-7zdWgbobOh6pFHVZufJZw3PL3lM\"",
		"mtime": "2026-11-13T22:35:24.561Z",
		"size": 510624,
		"path": "../public/assets/logo-tedslab-CSGR30te.png"
	},
	"/assets/knowledge-atlas-i6l_EuFn.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c98c2-PpoRzKgpUTHidUVdSF3CH5VXPBQ\"",
		"mtime": "2026-11-13T22:35:24.556Z",
		"size": 825538,
		"path": "../public/assets/knowledge-atlas-i6l_EuFn.js"
	},
	"/assets/lost-atlas-nUv6VG7h.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"15d7-lXGeu4PZDk2Xt/MWZuGkGn2dlEM\"",
		"mtime": "2026-11-13T22:35:24.556Z",
		"size": 5591,
		"path": "../public/assets/lost-atlas-nUv6VG7h.js"
	},
	"/assets/lost-atlas._slug-Db0S0TVL.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"166a-IJRuCs8E3wpwzmx7zO0xi+NNWG4\"",
		"mtime": "2026-11-13T22:35:24.556Z",
		"size": 5738,
		"path": "../public/assets/lost-atlas._slug-Db0S0TVL.js"
	},
	"/assets/maps-rch5mdBP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"16e-e8PenhNM6dlk0+XtExTzwe/+KoA\"",
		"mtime": "2026-11-13T22:35:24.557Z",
		"size": 366,
		"path": "../public/assets/maps-rch5mdBP.js"
	},
	"/assets/math-algebra-Bht1HCz8.jpg": {
		"type": "image/jpeg",
		"etag": "\"2d35a-PvVYI2LrpcoD2wanQQ7xOYpbYIE\"",
		"mtime": "2026-11-13T22:35:24.562Z",
		"size": 185178,
		"path": "../public/assets/math-algebra-Bht1HCz8.jpg"
	},
	"/assets/math-calculus-B1M0mWMY.jpg": {
		"type": "image/jpeg",
		"etag": "\"5b9d-bVTaXEAGiT9VR5oaj+FZmqSlB0U\"",
		"mtime": "2026-11-13T22:35:24.562Z",
		"size": 23453,
		"path": "../public/assets/math-calculus-B1M0mWMY.jpg"
	},
	"/assets/math-geometry-SGeNwC3o.jpg": {
		"type": "image/jpeg",
		"etag": "\"2ba46-mIRTtF52sxAW70KWKjzJOualsJs\"",
		"mtime": "2026-11-13T22:35:24.562Z",
		"size": 178758,
		"path": "../public/assets/math-geometry-SGeNwC3o.jpg"
	},
	"/assets/network-B5rrJ7ma.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"172-FlrkqKdepDr6n93bnN7rW/qy0Ug\"",
		"mtime": "2026-11-13T22:35:24.557Z",
		"size": 370,
		"path": "../public/assets/network-B5rrJ7ma.js"
	},
	"/assets/math-statistics-BlqoBDEB.jpg": {
		"type": "image/jpeg",
		"etag": "\"9615-x8xInAeJEUklmLWM3NTCzpQDzVI\"",
		"mtime": "2026-11-13T22:35:24.562Z",
		"size": 38421,
		"path": "../public/assets/math-statistics-BlqoBDEB.jpg"
	},
	"/assets/not-found-i5RsCZif.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"76-Trmr7GZIBZuvfg4uM18tBiRtOXg\"",
		"mtime": "2026-11-13T22:35:24.557Z",
		"size": 118,
		"path": "../public/assets/not-found-i5RsCZif.js"
	},
	"/assets/notebook-DVwvZjJc.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"762-YCwsjVv4pk/yT5UgSLp1p2Um2jY\"",
		"mtime": "2026-11-13T22:35:24.557Z",
		"size": 1890,
		"path": "../public/assets/notebook-DVwvZjJc.js"
	},
	"/assets/organisms-CHVMN3Kj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"27f-PG2HyQ5Fv6xhCZYjnwAWwzAFl2I\"",
		"mtime": "2026-11-13T22:35:24.557Z",
		"size": 639,
		"path": "../public/assets/organisms-CHVMN3Kj.js"
	},
	"/assets/page-BoOASHff.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1408-6xO3OTi+ozpXO7482ngiThyJuj0\"",
		"mtime": "2026-11-13T22:35:24.557Z",
		"size": 5128,
		"path": "../public/assets/page-BoOASHff.js"
	},
	"/assets/page-zLCJ653g.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c0c-xF+gonxla2XBCqbp8UrwHeBNnhE\"",
		"mtime": "2026-11-13T22:35:24.557Z",
		"size": 3084,
		"path": "../public/assets/page-zLCJ653g.js"
	},
	"/assets/pages-NQwmp5Jl.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5d2-hyTPWJ/lDS5cUAReiitc3U0aqvE\"",
		"mtime": "2026-11-13T22:35:24.557Z",
		"size": 1490,
		"path": "../public/assets/pages-NQwmp5Jl.js"
	},
	"/assets/pages._slug-8M0c68mm.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"241-Mx7853tK2ktFA4iHD1nr+Uee2Bg\"",
		"mtime": "2026-11-13T22:35:24.557Z",
		"size": 577,
		"path": "../public/assets/pages._slug-8M0c68mm.js"
	},
	"/assets/pages._slug-DLRtpEJM.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2eb-nLUVPhMtF8aJvSZxS96cl6yEvYo\"",
		"mtime": "2026-11-13T22:35:24.557Z",
		"size": 747,
		"path": "../public/assets/pages._slug-DLRtpEJM.js"
	},
	"/assets/photosynthese-CKXfKiQg.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4f-WoutVNQvqfzOo7yAHfqAJLlsX3A\"",
		"mtime": "2026-11-13T22:35:24.557Z",
		"size": 79,
		"path": "../public/assets/photosynthese-CKXfKiQg.js"
	},
	"/assets/photosynthese-DgVUElvn.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"252f-4nvABe3Sc5AqdOFuT3BfI09ul/A\"",
		"mtime": "2026-11-13T22:35:24.557Z",
		"size": 9519,
		"path": "../public/assets/photosynthese-DgVUElvn.js"
	},
	"/assets/photosynthesis-CKXfKiQg.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4f-WoutVNQvqfzOo7yAHfqAJLlsX3A\"",
		"mtime": "2026-11-13T22:35:24.557Z",
		"size": 79,
		"path": "../public/assets/photosynthesis-CKXfKiQg.js"
	},
	"/assets/plants-BquA8hl4.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"27c-fCHYQZbXtRWCCdxanhbEviYS7qg\"",
		"mtime": "2026-11-13T22:35:24.557Z",
		"size": 636,
		"path": "../public/assets/plants-BquA8hl4.js"
	},
	"/assets/policy-Aag3MvfV.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"414-r67rpETJXS6qdKBkgQG3jEcvMZs\"",
		"mtime": "2026-11-13T22:35:24.557Z",
		"size": 1044,
		"path": "../public/assets/policy-Aag3MvfV.js"
	},
	"/assets/preload-helper-DpD9e4SU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"132d-JVQ3tuBZpFDyNT18nLRAePNcAGw\"",
		"mtime": "2026-11-13T22:35:24.558Z",
		"size": 4909,
		"path": "../public/assets/preload-helper-DpD9e4SU.js"
	},
	"/assets/privacy-BzeG0oV-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"407-6nETjjQJayJ9J2q47uafxmZZj+k\"",
		"mtime": "2026-11-13T22:35:24.558Z",
		"size": 1031,
		"path": "../public/assets/privacy-BzeG0oV-.js"
	},
	"/assets/quizzes-C2--f1Xy.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"91e-Jh5QDmHzlznGtWO7Ia5I7V1hl3E\"",
		"mtime": "2026-11-13T22:35:24.558Z",
		"size": 2334,
		"path": "../public/assets/quizzes-C2--f1Xy.js"
	},
	"/assets/redirect-DmtLUW0N.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"184-TRM49T5nvIhX8okm9YKQe/jdlzE\"",
		"mtime": "2026-11-13T22:35:24.558Z",
		"size": 388,
		"path": "../public/assets/redirect-DmtLUW0N.js"
	},
	"/assets/root-DLTE-HSj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"20-vSYConOtSP6ciwr9zKsPixNwWmc\"",
		"mtime": "2026-11-13T22:35:24.558Z",
		"size": 32,
		"path": "../public/assets/root-DLTE-HSj.js"
	},
	"/assets/routes-CYN_Dr1I.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3f74-uDhEjwBjVGGLFwUZUTxPlOSA4Eo\"",
		"mtime": "2026-11-13T22:35:24.558Z",
		"size": 16244,
		"path": "../public/assets/routes-CYN_Dr1I.js"
	},
	"/assets/saved-BHIt26e9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"548-InWSFYYvjjeHzv0GN/Lr5JxPD0o\"",
		"mtime": "2026-11-13T22:35:24.558Z",
		"size": 1352,
		"path": "../public/assets/saved-BHIt26e9.js"
	},
	"/assets/sci-chemistry-DGer7X6m.jpg": {
		"type": "image/jpeg",
		"etag": "\"e531-uGB6rS2e12MOCOGeglkmNegaRSo\"",
		"mtime": "2026-11-13T22:35:24.562Z",
		"size": 58673,
		"path": "../public/assets/sci-chemistry-DGer7X6m.jpg"
	},
	"/assets/sci-earth-G0pK22sY.jpg": {
		"type": "image/jpeg",
		"etag": "\"db7f-wXmT2IjaOS6hzPumkxA6nP8tkNs\"",
		"mtime": "2026-11-13T22:35:24.562Z",
		"size": 56191,
		"path": "../public/assets/sci-earth-G0pK22sY.jpg"
	},
	"/assets/sci-method-DJPtNKgn.jpg": {
		"type": "image/jpeg",
		"etag": "\"65e5-3SjBWTNfnBOULOyVptfI2A1b/Vc\"",
		"mtime": "2026-11-13T22:35:24.563Z",
		"size": 26085,
		"path": "../public/assets/sci-method-DJPtNKgn.jpg"
	},
	"/assets/sci-physics-egMuwKm5.jpg": {
		"type": "image/jpeg",
		"etag": "\"8002-mpTyuxFNaEQb/wliH6KcUwSpEdA\"",
		"mtime": "2026-11-13T22:35:24.563Z",
		"size": 32770,
		"path": "../public/assets/sci-physics-egMuwKm5.jpg"
	},
	"/assets/settings-BnkuQIUY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7bd-A6fYQjSE/zx/YC2uLTaHeZLShWU\"",
		"mtime": "2026-11-13T22:35:24.558Z",
		"size": 1981,
		"path": "../public/assets/settings-BnkuQIUY.js"
	},
	"/assets/signup-DWdMjBLw.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"18b-UtFvBejuV1MSiSmeeM4xOX4bLX0\"",
		"mtime": "2026-11-13T22:35:24.558Z",
		"size": 395,
		"path": "../public/assets/signup-DWdMjBLw.js"
	},
	"/assets/soft-os-addition-g71pMwmC.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"192-obwJAkT+9dJhM9Brlk6vD8QNO38\"",
		"mtime": "2026-11-13T22:35:24.558Z",
		"size": 402,
		"path": "../public/assets/soft-os-addition-g71pMwmC.js"
	},
	"/assets/species-scan-BlpOatRn.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"18d-7O83hPVqzcoLVJs13iQAWqH/4IM\"",
		"mtime": "2026-11-13T22:35:24.558Z",
		"size": 397,
		"path": "../public/assets/species-scan-BlpOatRn.js"
	},
	"/assets/styles-COq7-I4g.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"1ea36-/N45gXQ7ENvQpw0QyYAQhGKvRdc\"",
		"mtime": "2026-11-13T22:35:24.563Z",
		"size": 125494,
		"path": "../public/assets/styles-COq7-I4g.css"
	},
	"/assets/tech-ai-N3_TfYIB.jpg": {
		"type": "image/jpeg",
		"etag": "\"f480-XFMqfN4HU/xKZCm+qV91Y8qyT6s\"",
		"mtime": "2026-11-13T22:35:24.563Z",
		"size": 62592,
		"path": "../public/assets/tech-ai-N3_TfYIB.jpg"
	},
	"/assets/tech-computing-BxqdUC2U.jpg": {
		"type": "image/jpeg",
		"etag": "\"19004-Vbz9mxUEKBzQVVPKauFw6hj+b+c\"",
		"mtime": "2026-11-13T22:35:24.563Z",
		"size": 102404,
		"path": "../public/assets/tech-computing-BxqdUC2U.jpg"
	},
	"/assets/tech-computing-CtHh0Hcn.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3b-rTsmoL0P1YPRMfLKNXGnFHutF0Y\"",
		"mtime": "2026-11-13T22:35:24.558Z",
		"size": 59,
		"path": "../public/assets/tech-computing-CtHh0Hcn.js"
	},
	"/assets/tech-programming-Cf7Rx_zT.jpg": {
		"type": "image/jpeg",
		"etag": "\"10fd9-Zmup00l2jDFH6bYOkb55tsdWm4A\"",
		"mtime": "2026-11-13T22:35:24.563Z",
		"size": 69593,
		"path": "../public/assets/tech-programming-Cf7Rx_zT.jpg"
	},
	"/assets/tech-security-DpkuyTLX.jpg": {
		"type": "image/jpeg",
		"etag": "\"1198b-ZlcjLSmzw82L+/mv+fDruoW5SQM\"",
		"mtime": "2026-11-13T22:35:24.563Z",
		"size": 72075,
		"path": "../public/assets/tech-security-DpkuyTLX.jpg"
	},
	"/assets/timeline-C_k4XDy6.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3a2-qI9L4PlmxGfX2v4u3XL1jUJ4vP8\"",
		"mtime": "2026-11-13T22:35:24.558Z",
		"size": 930,
		"path": "../public/assets/timeline-C_k4XDy6.js"
	},
	"/assets/translate-FZpwqzex.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1138-qUwjeZkp993/K48WzCWww5z4rvw\"",
		"mtime": "2026-11-13T22:35:24.558Z",
		"size": 4408,
		"path": "../public/assets/translate-FZpwqzex.js"
	},
	"/assets/tutorials-BcIu1lGl.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"abf-D6FDivhCFruL42M780LEyCuKhYg\"",
		"mtime": "2026-11-13T22:35:24.558Z",
		"size": 2751,
		"path": "../public/assets/tutorials-BcIu1lGl.js"
	},
	"/assets/tutorials._slug-B7milg9s.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"aaa-Yn73enf1QZg7BrFsBCoF7mpuK5Q\"",
		"mtime": "2026-11-13T22:35:24.559Z",
		"size": 2730,
		"path": "../public/assets/tutorials._slug-B7milg9s.js"
	},
	"/assets/update-soft-CWiq1VJw.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"191-zycvoppuIkHZut1OhGjqFEzND1M\"",
		"mtime": "2026-11-13T22:35:24.559Z",
		"size": 401,
		"path": "../public/assets/update-soft-CWiq1VJw.js"
	},
	"/assets/use-auth-CCcSqoAJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"38a-m5UukUfSO7zkzsP4dZLIiSjURUg\"",
		"mtime": "2026-11-13T22:35:24.559Z",
		"size": 906,
		"path": "../public/assets/use-auth-CCcSqoAJ.js"
	},
	"/assets/useNavigate-PQZbts4U.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"df-q5rPMp49HTuyyj/rQMFhekFtnOs\"",
		"mtime": "2026-11-13T22:35:24.559Z",
		"size": 223,
		"path": "../public/assets/useNavigate-PQZbts4U.js"
	},
	"/assets/videos-CmPPlJle.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"574-r6mjmVcByr8vAAjfN7+EwqgTAvo\"",
		"mtime": "2026-11-13T22:35:24.559Z",
		"size": 1396,
		"path": "../public/assets/videos-CmPPlJle.js"
	},
	"/assets/videos._slug-CvXNIDYs.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"645-7OEc3rKv7Z1ndchgRmh2E9jiQpA\"",
		"mtime": "2026-11-13T22:35:24.559Z",
		"size": 1605,
		"path": "../public/assets/videos._slug-CvXNIDYs.js"
	},
	"/download logo/tedslab-download.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"186-lFbVj+z0p+x0csdNfeWXqB+VpkI\"",
		"mtime": "2026-11-13T22:35:26.844Z",
		"size": 390,
		"path": "../public/download logo/tedslab-download.txt"
	},
	"/download logo/tedslab.png": {
		"type": "image/png",
		"etag": "\"11ba99-an7wcjiulP40vrDMKyC07RnqWvo\"",
		"mtime": "2026-11-13T22:35:26.845Z",
		"size": 1161881,
		"path": "../public/download logo/tedslab.png"
	}
};
//#endregion
//#region #nitro/virtual/public-assets
var publicAssetBases = {};
function isPublicAssetURL(id = "") {
	if (public_assets_data_default[id]) return true;
	for (const base in publicAssetBases) if (id.startsWith(base)) return true;
	return false;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/route-rules.mjs
var headers = ((m) => function headersRouteRule(event) {
	for (const [key, value] of Object.entries(m.options || {})) event.res.headers.set(key, value);
});
//#endregion
//#region #nitro/virtual/routing
var findRouteRules = /* @__PURE__ */ (() => {
	const $0 = [{
		name: "headers",
		route: "/assets/**",
		handler: headers,
		options: { "cache-control": "public, max-age=31536000, immutable" }
	}];
	return (m, p) => {
		let r = [];
		if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1) || "/";
		let s = p.split("/");
		if (s.length > 1) {
			if (s[1] === "assets") r.unshift({
				data: $0,
				params: { "_": s.slice(2).join("/") }
			});
		}
		return r;
	};
})();
var _lazy_qwUxlz = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
var findRoute = /* @__PURE__ */ (() => {
	const data = {
		route: "/**",
		handler: _lazy_qwUxlz
	};
	return ((_m, p) => {
		return {
			data,
			params: { "_": p.slice(1) }
		};
	});
})();
[].filter(Boolean);
//#endregion
//#region node_modules/nitro/dist/runtime/internal/error/prod.mjs
var errorHandler = (error, event) => {
	const res = defaultHandler(error, event);
	return new FastResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
function defaultHandler(error, event) {
	const unhandled = error.unhandled ?? !HTTPError.isError(error);
	const { status = 500, statusText = "" } = unhandled ? {} : error;
	if (status === 404) {
		const url = event.url || new URL(event.req.url);
		const baseURL = "/";
		if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) return {
			status: 302,
			headers: new Headers({ location: `${baseURL}${url.pathname.slice(1)}${url.search}` })
		};
	}
	const headers = new Headers(unhandled ? {} : error.headers);
	headers.set("content-type", "application/json; charset=utf-8");
	return {
		status,
		statusText,
		headers,
		body: {
			error: true,
			...unhandled ? {
				status,
				unhandled: true
			} : typeof error.toJSON === "function" ? error.toJSON() : {
				status,
				statusText,
				message: error.message
			}
		}
	};
}
//#endregion
//#region #nitro/virtual/error-handler
var errorHandlers = [errorHandler];
async function error_handler_default(error, event) {
	for (const handler of errorHandlers) try {
		const response = await handler(error, event, { defaultHandler });
		if (response) return response;
	} catch (error) {
		console.error(error);
	}
}
//#endregion
//#region #nitro/virtual/app
function createNitroApp() {
	const captureError = (error, errorCtx) => {
		if (errorCtx?.event) {
			const errors = errorCtx.event.req.context?.nitro?.errors;
			if (errors) errors.push({
				error,
				context: errorCtx
			});
		}
	};
	const h3App = createH3App({ onError(error, event) {
		return error_handler_default(error, event);
	} });
	let appHandler = (req) => {
		req.context ||= {};
		req.context.nitro = req.context.nitro || { errors: [] };
		return h3App.fetch(req);
	};
	return {
		fetch: appHandler,
		h3: h3App,
		hooks: void 0,
		captureError
	};
}
function createH3App(config) {
	const h3App = new H3Core(config);
	h3App["~findRoute"] = (event) => findRoute(event.req.method, event.url.pathname);
	h3App["~getMiddleware"] = (event, route) => {
		const pathname = event.url.pathname;
		const method = event.req.method;
		const middleware = [];
		const routeRules = getRouteRules(method, pathname);
		event.context.routeRules = routeRules?.routeRules;
		if (routeRules?.routeRuleMiddleware.length) middleware.push(...routeRules.routeRuleMiddleware);
		if (route?.data?.middleware?.length) middleware.push(...route.data.middleware);
		return middleware;
	};
	return h3App;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/app.mjs
var APP_ID = "default";
function useNitroApp() {
	let instance = useNitroApp._instance;
	if (instance) return instance;
	instance = useNitroApp._instance = createNitroApp();
	globalThis.__nitro__ = globalThis.__nitro__ || {};
	globalThis.__nitro__[APP_ID] = instance;
	return instance;
}
function useNitroHooks() {
	const nitroApp = useNitroApp();
	const hooks = nitroApp.hooks;
	if (hooks) return hooks;
	return nitroApp.hooks = new HookableCore();
}
function getRouteRules(method, pathname) {
	const m = findRouteRules(method, pathname);
	if (!m?.length) return { routeRuleMiddleware: [] };
	const routeRules = {};
	for (const layer of m) for (const rule of layer.data) {
		const currentRule = routeRules[rule.name];
		if (currentRule) {
			if (rule.options === false) {
				delete routeRules[rule.name];
				continue;
			}
			if (typeof currentRule.options === "object" && typeof rule.options === "object") currentRule.options = {
				...currentRule.options,
				...rule.options
			};
			else currentRule.options = rule.options;
			currentRule.route = rule.route;
			currentRule.params = {
				...currentRule.params,
				...layer.params
			};
		} else if (rule.options !== false) routeRules[rule.name] = {
			...rule,
			params: layer.params
		};
	}
	const middleware = [];
	const orderedRules = Object.values(routeRules).sort((a, b) => (a.handler?.order || 0) - (b.handler?.order || 0));
	for (const rule of orderedRules) {
		if (rule.options === false || !rule.handler) continue;
		middleware.push(rule.handler(rule));
	}
	return {
		routeRules,
		routeRuleMiddleware: middleware
	};
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/_module-handler.mjs
function createHandler(hooks) {
	const nitroApp = useNitroApp();
	const nitroHooks = useNitroHooks();
	return {
		async fetch(request, env, context) {
			globalThis.__env__ = env;
			augmentReq(request, {
				env,
				context
			});
			const ctxExt = {};
			const url = new URL(request.url);
			if (hooks.fetch) {
				const res = await hooks.fetch(request, env, context, url, ctxExt);
				if (res) return res;
			}
			return await nitroApp.fetch(request);
		},
		scheduled(controller, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:scheduled", {
				controller,
				env,
				context
			}) || Promise.resolve());
		},
		email(message, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:email", {
				message,
				event: message,
				env,
				context
			}) || Promise.resolve());
		},
		queue(batch, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:queue", {
				batch,
				event: batch,
				env,
				context
			}) || Promise.resolve());
		},
		tail(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:tail", {
				traces,
				env,
				context
			}) || Promise.resolve());
		},
		trace(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:trace", {
				traces,
				env,
				context
			}) || Promise.resolve());
		}
	};
}
function augmentReq(cfReq, ctx) {
	const req = cfReq;
	req.ip = cfReq.headers.get("cf-connecting-ip") || void 0;
	req.runtime ??= { name: "cloudflare" };
	req.runtime.cloudflare = {
		...req.runtime.cloudflare,
		...ctx
	};
	req.waitUntil = ctx.context?.waitUntil.bind(ctx.context);
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/cloudflare-module.mjs
var cloudflare_module_default = createHandler({ fetch(cfRequest, env, context, url) {
	if (env.ASSETS && isPublicAssetURL(url.pathname)) return env.ASSETS.fetch(cfRequest);
} });
//#endregion
export { cloudflare_module_default as default };
