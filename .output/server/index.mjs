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
		"mtime": "2026-11-10T21:05:04.553Z",
		"size": 3708,
		"path": "../public/favicon.png"
	},
	"/logo.png": {
		"type": "image/png",
		"etag": "\"71d5-iC+KKvoAskwLdT7EV0YCsHQFXYw\"",
		"mtime": "2026-11-10T21:05:04.553Z",
		"size": 29141,
		"path": "../public/logo.png"
	},
	"/robots.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"ec-3buti6v9Xr+gI3SlCHLfqVwS0tE\"",
		"mtime": "2026-11-10T21:05:04.553Z",
		"size": 236,
		"path": "../public/robots.txt"
	},
	"/assets/AdminPage-DAjQd8zy.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ab8-m0pMwy04gZPafmpGLqpxzzWHjdk\"",
		"mtime": "2026-11-10T21:04:59.538Z",
		"size": 2744,
		"path": "../public/assets/AdminPage-DAjQd8zy.js"
	},
	"/assets/ArticleCard-C2T35ZXH.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"bc3-e8Kin4gKoGA/DfYADaM3vWIxKT4\"",
		"mtime": "2026-11-10T21:04:59.539Z",
		"size": 3011,
		"path": "../public/assets/ArticleCard-C2T35ZXH.js"
	},
	"/assets/ArticleTemplate-C2HZ0GQH.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1e79-fCmsSpIkzRm82M/KCyeWkXABY7E\"",
		"mtime": "2026-11-10T21:04:59.539Z",
		"size": 7801,
		"path": "../public/assets/ArticleTemplate-C2HZ0GQH.js"
	},
	"/assets/AuthForm-5F2I472n.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"11fc-/QdpRXunhAy0JuQZ+dOMSUIQHFA\"",
		"mtime": "2026-11-10T21:04:59.539Z",
		"size": 4604,
		"path": "../public/assets/AuthForm-5F2I472n.js"
	},
	"/assets/PlatformPlaceholderPage-uH8EvDrs.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"879-PeZhvyI2S6Si5wb9NJsk/MAHdzI\"",
		"mtime": "2026-11-10T21:04:59.539Z",
		"size": 2169,
		"path": "../public/assets/PlatformPlaceholderPage-uH8EvDrs.js"
	},
	"/assets/TopicGrid-D_oCBnF6.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d06-3mxhmw0N7E7qOIkYMt8YT4WuC5Q\"",
		"mtime": "2026-11-10T21:04:59.539Z",
		"size": 3334,
		"path": "../public/assets/TopicGrid-D_oCBnF6.js"
	},
	"/assets/_section._topic-Cw2DrXih.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9a3-UvRCL+yT0sNf2GxGSD81AFtxr0s\"",
		"mtime": "2026-11-10T21:04:59.539Z",
		"size": 2467,
		"path": "../public/assets/_section._topic-Cw2DrXih.js"
	},
	"/assets/_subject-DaPijy-l.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4c4-J519+MfbpZwB1o2FvorcdnFpOaQ\"",
		"mtime": "2026-11-10T21:04:59.539Z",
		"size": 1220,
		"path": "../public/assets/_subject-DaPijy-l.js"
	},
	"/assets/_subject._section-ChDgCUmk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8a1-3BAmaUvke3sE/mHEfZISOi13tPc\"",
		"mtime": "2026-11-10T21:04:59.539Z",
		"size": 2209,
		"path": "../public/assets/_subject._section-ChDgCUmk.js"
	},
	"/assets/_subject._section._topic-CYpYFKkF.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9b8-lLiOyLSj8lHSIfO4Aki8yxP493I\"",
		"mtime": "2026-11-10T21:04:59.539Z",
		"size": 2488,
		"path": "../public/assets/_subject._section._topic-CYpYFKkF.js"
	},
	"/assets/add-app-BkiVRHRy.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a3-BjsFTTW/gJPwtnz0B7k1rzzuWfo\"",
		"mtime": "2026-11-10T21:04:59.539Z",
		"size": 419,
		"path": "../public/assets/add-app-BkiVRHRy.js"
	},
	"/assets/admin-Dftu4b5O.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3a84-EHQVdDXBdAtgw9BsgwY8lj6NESA\"",
		"mtime": "2026-11-10T21:04:59.539Z",
		"size": 14980,
		"path": "../public/assets/admin-Dftu4b5O.js"
	},
	"/assets/admin.articles-BhvkxJSI.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"447-M8BjaUXCZKMjc1lByv9sNb/f/8g\"",
		"mtime": "2026-11-10T21:04:59.539Z",
		"size": 1095,
		"path": "../public/assets/admin.articles-BhvkxJSI.js"
	},
	"/assets/admin.articles.new-CotjO0wj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"12a7-4Qb202rGSEhJ3JxixohvRg1s5KQ\"",
		"mtime": "2026-11-10T21:04:59.539Z",
		"size": 4775,
		"path": "../public/assets/admin.articles.new-CotjO0wj.js"
	},
	"/assets/admin.pages-CdJtoI6h.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a6-kvfIC1wAzGI0prX8vkZXGb6aTBo\"",
		"mtime": "2026-11-10T21:04:59.539Z",
		"size": 422,
		"path": "../public/assets/admin.pages-CdJtoI6h.js"
	},
	"/assets/admin.pages-list-D3-3ZTWj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"16e-Y4AlGCLKrpba3miOEX6BPY8FJp4\"",
		"mtime": "2026-11-10T21:04:59.539Z",
		"size": 366,
		"path": "../public/assets/admin.pages-list-D3-3ZTWj.js"
	},
	"/assets/admin.sections-B8X5BQaU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"187-yCYNQl7OoV7owmIYQNeJlqqA1Rk\"",
		"mtime": "2026-11-10T21:04:59.539Z",
		"size": 391,
		"path": "../public/assets/admin.sections-B8X5BQaU.js"
	},
	"/assets/admin.topics-DwYo0_j7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"18b-zATkxUmpLgrGiFn7lDTJiKBM0Vc\"",
		"mtime": "2026-11-10T21:04:59.539Z",
		"size": 395,
		"path": "../public/assets/admin.topics-DwYo0_j7.js"
	},
	"/assets/ai-CC8kqyxf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4026-QjPViJNtUUwEVFMw/WAs59KY76E\"",
		"mtime": "2026-11-10T21:04:59.539Z",
		"size": 16422,
		"path": "../public/assets/ai-CC8kqyxf.js"
	},
	"/assets/anatomy-BSxf6uoS.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"27d-v4XmYuQB0TXcXCJqR04PbzGg58c\"",
		"mtime": "2026-11-10T21:04:59.540Z",
		"size": 637,
		"path": "../public/assets/anatomy-BSxf6uoS.js"
	},
	"/assets/annotation-sys-BTv0XX_9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"184-Dggb4yBryjFkEa6Keq+OyHnP8SA\"",
		"mtime": "2026-11-10T21:04:59.540Z",
		"size": 388,
		"path": "../public/assets/annotation-sys-BTv0XX_9.js"
	},
	"/assets/AppShell-D28Yg0hW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"98c92-cdYxkwrOv0wXx79HL8RrQM7uCY8\"",
		"mtime": "2026-11-10T21:04:59.538Z",
		"size": 625810,
		"path": "../public/assets/AppShell-D28Yg0hW.js"
	},
	"/assets/articles-Vf_OIS3x.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"434-Jx6SaDUmlxZ/BXgWOtw9oyWA82E\"",
		"mtime": "2026-11-10T21:04:59.540Z",
		"size": 1076,
		"path": "../public/assets/articles-Vf_OIS3x.js"
	},
	"/assets/articles-debug-D5rVt43I.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"12f9-zl9J7WVwcSpsJqEMPVZ8CT3jorQ\"",
		"mtime": "2026-11-10T21:04:59.540Z",
		"size": 4857,
		"path": "../public/assets/articles-debug-D5rVt43I.js"
	},
	"/assets/articles._slug-Bq00QGI-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"248-mHkYBaqIdHD6/I15RJzmLr/JOFM\"",
		"mtime": "2026-11-10T21:04:59.540Z",
		"size": 584,
		"path": "../public/assets/articles._slug-Bq00QGI-.js"
	},
	"/assets/articles.cellular-respiration-yqwgZlo3.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1fe1-kMmTDqyNX49mFi4dozXM6zszCME\"",
		"mtime": "2026-11-10T21:04:59.542Z",
		"size": 8161,
		"path": "../public/assets/articles.cellular-respiration-yqwgZlo3.js"
	},
	"/assets/articles.enzyme-catalysis-Bhw9E9rp.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e7f-bd9QV4NY3SMDldCRtchEbjDWHEE\"",
		"mtime": "2026-11-10T21:04:59.542Z",
		"size": 3711,
		"path": "../public/assets/articles.enzyme-catalysis-Bhw9E9rp.js"
	},
	"/assets/articles.evolution-natural-selection-b0fsZZW2.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ede-cjJpvjnHwMBNlqS0mPJN0lIqH0I\"",
		"mtime": "2026-11-10T21:04:59.542Z",
		"size": 3806,
		"path": "../public/assets/articles.evolution-natural-selection-b0fsZZW2.js"
	},
	"/assets/articles.food-chains-energy-flow-7RxDJ5F7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e99-yCkjErawSOg7zxwgPxyDq+7iZBQ\"",
		"mtime": "2026-11-10T21:04:59.542Z",
		"size": 3737,
		"path": "../public/assets/articles.food-chains-energy-flow-7RxDJ5F7.js"
	},
	"/assets/articles.human-anatomy-systems-4tuMAmfk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e86-0Fjgt0xmk//PaYDGLZborkDLkXE\"",
		"mtime": "2026-11-10T21:04:59.542Z",
		"size": 3718,
		"path": "../public/assets/articles.human-anatomy-systems-4tuMAmfk.js"
	},
	"/assets/articles.meiosis-gamete-formation-CD2nCT66.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e92-mLopLs2ukRPB9iEZrHYCDvDnYoE\"",
		"mtime": "2026-11-10T21:04:59.542Z",
		"size": 3730,
		"path": "../public/assets/articles.meiosis-gamete-formation-CD2nCT66.js"
	},
	"/assets/articles.mitosis-cell-division-CvZy7tw7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ecb-41MSQT9KuoYsCCGedzkdUrAOI0c\"",
		"mtime": "2026-11-10T21:04:59.542Z",
		"size": 3787,
		"path": "../public/assets/articles.mitosis-cell-division-CvZy7tw7.js"
	},
	"/assets/articles.photosynthesis-light-reactions-DuoxLPO2.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"eaa-+1g3NwykHFDd1TL29MHb5pLD76A\"",
		"mtime": "2026-11-10T21:04:59.542Z",
		"size": 3754,
		"path": "../public/assets/articles.photosynthesis-light-reactions-DuoxLPO2.js"
	},
	"/assets/auth-DtNAFDq_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"182-l/Iry+ABCpFzgbJXqnOT7r4ypwU\"",
		"mtime": "2026-11-10T21:04:59.542Z",
		"size": 386,
		"path": "../public/assets/auth-DtNAFDq_.js"
	},
	"/assets/auth-w2BNGNBv.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6b09-Uq5gr3xZFyLseqlHgf1Y6zIVbLg\"",
		"mtime": "2026-11-10T21:04:59.542Z",
		"size": 27401,
		"path": "../public/assets/auth-w2BNGNBv.js"
	},
	"/assets/biological-processes-DlPIXoy0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"28a-XI4Mllq4U/x3QytV7aaW1pyyU2w\"",
		"mtime": "2026-11-10T21:04:59.542Z",
		"size": 650,
		"path": "../public/assets/biological-processes-DlPIXoy0.js"
	},
	"/assets/biopedia-data-DJbT4MOb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4c9-y0AzIPFEOC8TKUKvFonQwHo3RbA\"",
		"mtime": "2026-11-10T21:04:59.542Z",
		"size": 1225,
		"path": "../public/assets/biopedia-data-DJbT4MOb.js"
	},
	"/assets/biotechnology-Cu1-ofos.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"283-32anwu0eI9hbQgIVYu0RRtHlMic\"",
		"mtime": "2026-11-10T21:04:59.542Z",
		"size": 643,
		"path": "../public/assets/biotechnology-Cu1-ofos.js"
	},
	"/assets/button-eo4EVWdK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"79e-uoP+E68zIbpe0U/A77Lswydm0+Y\"",
		"mtime": "2026-11-10T21:04:59.542Z",
		"size": 1950,
		"path": "../public/assets/button-eo4EVWdK.js"
	},
	"/assets/cat-evolution-CC_w4loO.jpg": {
		"type": "image/jpeg",
		"etag": "\"2fdbd-seNsXnl4XHNUY71qgNreqGrRZEg\"",
		"mtime": "2026-11-10T21:04:59.550Z",
		"size": 196029,
		"path": "../public/assets/cat-evolution-CC_w4loO.jpg"
	},
	"/assets/cat-ecology-DbnEUXHR.jpg": {
		"type": "image/jpeg",
		"etag": "\"2da9e-OCrQ+5HxBL/MeFpjI2Ml9mEB6CQ\"",
		"mtime": "2026-11-10T21:04:59.550Z",
		"size": 187038,
		"path": "../public/assets/cat-ecology-DbnEUXHR.jpg"
	},
	"/assets/cat-genetics-C6CBosmo.jpg": {
		"type": "image/jpeg",
		"etag": "\"281ff-qhaiIvZ8BDqFMGgfDXNC3bv5mFo\"",
		"mtime": "2026-11-10T21:04:59.550Z",
		"size": 164351,
		"path": "../public/assets/cat-genetics-C6CBosmo.jpg"
	},
	"/assets/cat-human-BuRMR2jH.jpg": {
		"type": "image/jpeg",
		"etag": "\"23326-4wTTr4zzrFQf89XTkJyXsX8rXHg\"",
		"mtime": "2026-11-10T21:04:59.550Z",
		"size": 144166,
		"path": "../public/assets/cat-human-BuRMR2jH.jpg"
	},
	"/assets/cat-organisms-yXH6lJcJ.jpg": {
		"type": "image/jpeg",
		"etag": "\"2acbe-1G/hL2bGRo8MkA9mSKQX6eYai7o\"",
		"mtime": "2026-11-10T21:04:59.551Z",
		"size": 175294,
		"path": "../public/assets/cat-organisms-yXH6lJcJ.jpg"
	},
	"/assets/cat-plants-Bu_hoilj.jpg": {
		"type": "image/jpeg",
		"etag": "\"3af5b-WyZ9BT5qxBZaWxxjuNNVL7/2IO0\"",
		"mtime": "2026-11-10T21:04:59.551Z",
		"size": 241499,
		"path": "../public/assets/cat-plants-Bu_hoilj.jpg"
	},
	"/assets/catalog-B1y8wtw8.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1384d-bRV7UJeyNFkwxARDsKWejTyR6bo\"",
		"mtime": "2026-11-10T21:04:59.543Z",
		"size": 79949,
		"path": "../public/assets/catalog-B1y8wtw8.js"
	},
	"/assets/categories-KKOKwcFt.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3e2-ye8YPmIc0hRRY3vCmmxTkHquSIk\"",
		"mtime": "2026-11-10T21:04:59.543Z",
		"size": 994,
		"path": "../public/assets/categories-KKOKwcFt.js"
	},
	"/assets/cells-microscopy-Bu4nBKpi.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"286-xkRZCgKp16RUdbKJ67xJJkI1LUo\"",
		"mtime": "2026-11-10T21:04:59.543Z",
		"size": 646,
		"path": "../public/assets/cells-microscopy-Bu4nBKpi.js"
	},
	"/assets/chronos-os-Bmg7bPlO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ee1-Xjf6p2wyVSO+z2MclCJJcs3GeQY\"",
		"mtime": "2026-11-10T21:04:59.544Z",
		"size": 3809,
		"path": "../public/assets/chronos-os-Bmg7bPlO.js"
	},
	"/assets/chronos-os-download-DL3h9tCL.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"67a-eLZwJJLSHHm9f9/bOHR2yOpcMdE\"",
		"mtime": "2026-11-10T21:04:59.544Z",
		"size": 1658,
		"path": "../public/assets/chronos-os-download-DL3h9tCL.js"
	},
	"/assets/client-k3juqDS2.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"341-jtnognX5avNbfZfgW3Um+VkOoVw\"",
		"mtime": "2026-11-10T21:04:59.544Z",
		"size": 833,
		"path": "../public/assets/client-k3juqDS2.js"
	},
	"/assets/communicational-system-LtIxa_Pg.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a2-JYJDrl+vraTbukRgUVG7ZV7Gf0s\"",
		"mtime": "2026-11-10T21:04:59.544Z",
		"size": 418,
		"path": "../public/assets/communicational-system-LtIxa_Pg.js"
	},
	"/assets/createLucideIcon-Dj-b7IgG.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4d2-y9LPMf1peDtmMMfdaSv6TxN4Dcw\"",
		"mtime": "2026-11-10T21:04:59.544Z",
		"size": 1234,
		"path": "../public/assets/createLucideIcon-Dj-b7IgG.js"
	},
	"/assets/custom-lists-DXOydWJH.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b41-u+RXT1FeZP2IYI0SDLwDjUuHD98\"",
		"mtime": "2026-11-10T21:04:59.544Z",
		"size": 2881,
		"path": "../public/assets/custom-lists-DXOydWJH.js"
	},
	"/assets/dashboard-DZx_rEPa.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"506-UYU06WK+/rMwH8tpOuofL2TlxiU\"",
		"mtime": "2026-11-10T21:04:59.544Z",
		"size": 1286,
		"path": "../public/assets/dashboard-DZx_rEPa.js"
	},
	"/assets/decipher-BFNa7U1l.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"16f-OVUNNYB9yw5BigKwCF7wj1apZ9g\"",
		"mtime": "2026-11-10T21:04:59.544Z",
		"size": 367,
		"path": "../public/assets/decipher-BFNa7U1l.js"
	},
	"/assets/dev-dashboard-C-fKB3b7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"10ce-qnT0tO9Gf4dpErJgRoG1ru1xNxM\"",
		"mtime": "2026-11-10T21:04:59.544Z",
		"size": 4302,
		"path": "../public/assets/dev-dashboard-C-fKB3b7.js"
	},
	"/assets/dev-tools-4vVq1eYU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1362-F0dMcmTVGbp79USpMcPIpgPGP4Y\"",
		"mtime": "2026-11-10T21:04:59.544Z",
		"size": 4962,
		"path": "../public/assets/dev-tools-4vVq1eYU.js"
	},
	"/assets/discovery-leaf-B4lyAWC2.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3b-my347b2NUKvD+XRT+D6BbNxbmjg\"",
		"mtime": "2026-11-10T21:04:59.544Z",
		"size": 59,
		"path": "../public/assets/discovery-leaf-B4lyAWC2.js"
	},
	"/assets/discovery-leaf-CDLQK6NX.jpg": {
		"type": "image/jpeg",
		"etag": "\"292a2-sl75CS6OW2pQPTWnj52a0F63jwo\"",
		"mtime": "2026-11-10T21:04:59.551Z",
		"size": 168610,
		"path": "../public/assets/discovery-leaf-CDLQK6NX.jpg"
	},
	"/assets/dist-BTwB3ywF2.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2da-J4A6teqg3GVmCEDMvJy53SW7ZCA\"",
		"mtime": "2026-11-10T21:04:59.544Z",
		"size": 730,
		"path": "../public/assets/dist-BTwB3ywF2.js"
	},
	"/assets/dist-InrptS_j.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b5c-tDOv40nvzeKr7MTjx3bMlHybUro\"",
		"mtime": "2026-11-10T21:04:59.544Z",
		"size": 2908,
		"path": "../public/assets/dist-InrptS_j.js"
	},
	"/assets/download-Do7y64EH.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1044-8NVcz5haZe7+GHS4l6Odzd2wnwI\"",
		"mtime": "2026-11-10T21:04:59.545Z",
		"size": 4164,
		"path": "../public/assets/download-Do7y64EH.js"
	},
	"/assets/downloadable-software-DjW-Utu0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"be5-GNBBXtanB0HPe/oBsIP8G09kT6I\"",
		"mtime": "2026-11-10T21:04:59.545Z",
		"size": 3045,
		"path": "../public/assets/downloadable-software-DjW-Utu0.js"
	},
	"/assets/ecology-environment-BxPyMnxt.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"289-lHBj8Nu10rViKJJvzZlfD6n5vk0\"",
		"mtime": "2026-11-10T21:04:59.545Z",
		"size": 649,
		"path": "../public/assets/ecology-environment-BxPyMnxt.js"
	},
	"/assets/eng-grammar-B1tMmnMx.jpg": {
		"type": "image/jpeg",
		"etag": "\"74c1-XK8BNB8ZAYcd/TE7F0EdV/8Ul8I\"",
		"mtime": "2026-11-10T21:04:59.551Z",
		"size": 29889,
		"path": "../public/assets/eng-grammar-B1tMmnMx.jpg"
	},
	"/assets/eng-literature-BajHjXyN.jpg": {
		"type": "image/jpeg",
		"etag": "\"cc62-NF9kB2OyFm1zMZ+Oih1ZHorruYg\"",
		"mtime": "2026-11-10T21:04:59.551Z",
		"size": 52322,
		"path": "../public/assets/eng-literature-BajHjXyN.jpg"
	},
	"/assets/eng-poetry-BQYnMCQa.jpg": {
		"type": "image/jpeg",
		"etag": "\"10239-W3/DnYSqaKLw+1EOhXvOc98a4PU\"",
		"mtime": "2026-11-10T21:04:59.552Z",
		"size": 66105,
		"path": "../public/assets/eng-poetry-BQYnMCQa.jpg"
	},
	"/assets/eng-writing-DkEjUsar.jpg": {
		"type": "image/jpeg",
		"etag": "\"9cc3-ee85EOsBs2794hyQ7ENTiSRcMx8\"",
		"mtime": "2026-11-10T21:04:59.552Z",
		"size": 40131,
		"path": "../public/assets/eng-writing-DkEjUsar.jpg"
	},
	"/assets/evolution-C7VhDYJw.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"27f-A4YFXgg8+wz6Ey1iilFbVMRZ4J4\"",
		"mtime": "2026-11-10T21:04:59.545Z",
		"size": 639,
		"path": "../public/assets/evolution-C7VhDYJw.js"
	},
	"/assets/extension-tools-upload-9tOoKcRb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"19b-FL55hadZtc2j2vs1xON74+obU6E\"",
		"mtime": "2026-11-10T21:04:59.545Z",
		"size": 411,
		"path": "../public/assets/extension-tools-upload-9tOoKcRb.js"
	},
	"/assets/docs-DcWlaCti.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"85754-Z3qtA+tZ/Kre92AeL+AEJwxpf4w\"",
		"mtime": "2026-11-10T21:04:59.544Z",
		"size": 546644,
		"path": "../public/assets/docs-DcWlaCti.js"
	},
	"/assets/extensions-k-9Kg-VK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"46-ICYMYbx5xQ0kUxCcOItTLQIt2nY\"",
		"mtime": "2026-11-10T21:04:59.545Z",
		"size": 70,
		"path": "../public/assets/extensions-k-9Kg-VK.js"
	},
	"/assets/extensions.noter-DQ7rVCZb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"46-4cWG1Ho5rQqygfY3FIpGPHu+56Q\"",
		"mtime": "2026-11-10T21:04:59.545Z",
		"size": 70,
		"path": "../public/assets/extensions.noter-DQ7rVCZb.js"
	},
	"/assets/flashcards-CKh36U9_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"44e-tSe3VOP+MKdyvogrRr13SIaDAS4\"",
		"mtime": "2026-11-10T21:04:59.545Z",
		"size": 1102,
		"path": "../public/assets/flashcards-CKh36U9_.js"
	},
	"/assets/genetics-dna-D20a0c1N.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"282-j0knn3t4oyiYgoighRHmQ+9TbyM\"",
		"mtime": "2026-11-10T21:04:59.545Z",
		"size": 642,
		"path": "../public/assets/genetics-dna-D20a0c1N.js"
	},
	"/assets/glossary-BkIfGZUX.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"36b-qfX5nGtJyFJxTbMaIImFp0SO1v8\"",
		"mtime": "2026-11-10T21:04:59.545Z",
		"size": 875,
		"path": "../public/assets/glossary-BkIfGZUX.js"
	},
	"/assets/graphication-D0aytGyu.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"179-7Lz/hx++1jPAufIxIo08Mk5epAw\"",
		"mtime": "2026-11-10T21:04:59.546Z",
		"size": 377,
		"path": "../public/assets/graphication-D0aytGyu.js"
	},
	"/assets/help-center-DzPxaXg1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"14af-vmjNwL6IokcKIZItVfqMZnvO14k\"",
		"mtime": "2026-11-10T21:04:59.546Z",
		"size": 5295,
		"path": "../public/assets/help-center-DzPxaXg1.js"
	},
	"/assets/hero-cell-BewOnWpW.jpg": {
		"type": "image/jpeg",
		"etag": "\"40c11-gRZUnBDNdykEsTfNLMgxrZ+4OcU\"",
		"mtime": "2026-11-10T21:04:59.552Z",
		"size": 265233,
		"path": "../public/assets/hero-cell-BewOnWpW.jpg"
	},
	"/assets/his-ancient-D_3kmTQu.jpg": {
		"type": "image/jpeg",
		"etag": "\"124b1-VN0HL9ZUiqcfpgKsq+4JPZ2wA70\"",
		"mtime": "2026-11-10T21:04:59.552Z",
		"size": 74929,
		"path": "../public/assets/his-ancient-D_3kmTQu.jpg"
	},
	"/assets/his-medieval-Z1UQ46lz.jpg": {
		"type": "image/jpeg",
		"etag": "\"94dd-hwSoe+zL6tyOotdQvEYv56k0YhM\"",
		"mtime": "2026-11-10T21:04:59.552Z",
		"size": 38109,
		"path": "../public/assets/his-medieval-Z1UQ46lz.jpg"
	},
	"/assets/his-revolutions-BKB1brIf.jpg": {
		"type": "image/jpeg",
		"etag": "\"f396-a6hL0Vst70K1o9x2ypegAAHcKWs\"",
		"mtime": "2026-11-10T21:04:59.552Z",
		"size": 62358,
		"path": "../public/assets/his-revolutions-BKB1brIf.jpg"
	},
	"/assets/his-wars-Dja4_BlN.jpg": {
		"type": "image/jpeg",
		"etag": "\"e5ca-2jcnizpZCZIyPz3NRRyhh6p2aUw\"",
		"mtime": "2026-11-10T21:04:59.553Z",
		"size": 58826,
		"path": "../public/assets/his-wars-Dja4_BlN.jpg"
	},
	"/assets/human-biology-OS-9a_1N.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"283-HeJxfVfr+1j5po4rYtu/KMPGaIQ\"",
		"mtime": "2026-11-10T21:04:59.546Z",
		"size": 643,
		"path": "../public/assets/human-biology-OS-9a_1N.js"
	},
	"/assets/ide-system-CaKUZi9b.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a1-L3F+kC4+IG7zOCKNIAV/0B3eYMY\"",
		"mtime": "2026-11-10T21:04:59.546Z",
		"size": 417,
		"path": "../public/assets/ide-system-CaKUZi9b.js"
	},
	"/assets/images-xGwTEqeS.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6c7-Pk/YMa5itOlpzK6ZTBCO7vItja8\"",
		"mtime": "2026-11-10T21:04:59.546Z",
		"size": 1735,
		"path": "../public/assets/images-xGwTEqeS.js"
	},
	"/assets/index-CKMRnLQk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"60dd3-CMeeYPRdol4Tvr3rx/bt8CaUS2c\"",
		"mtime": "2026-11-10T21:04:59.537Z",
		"size": 396755,
		"path": "../public/assets/index-CKMRnLQk.js"
	},
	"/assets/information-use-JZsga4ZA.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"413-2TDslra3RzzfN9u5Fz3U2pyOvSU\"",
		"mtime": "2026-11-10T21:04:59.546Z",
		"size": 1043,
		"path": "../public/assets/information-use-JZsga4ZA.js"
	},
	"/assets/input-CYV5x1jB.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"282-NLDJwxTFy0r16g/TR2HUhczkJ/c\"",
		"mtime": "2026-11-10T21:04:59.546Z",
		"size": 642,
		"path": "../public/assets/input-CYV5x1jB.js"
	},
	"/assets/jsx-runtime-Cx0BB4qO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"440-7GwVHNgO4EUMk3cR4Bh6KGJPPX4\"",
		"mtime": "2026-11-10T21:04:59.546Z",
		"size": 1088,
		"path": "../public/assets/jsx-runtime-Cx0BB4qO.js"
	},
	"/assets/label--M2gLtpv.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2e5-Ayo7Lz/Ge8oPTcTiXv58M2Cp6cQ\"",
		"mtime": "2026-11-10T21:04:59.547Z",
		"size": 741,
		"path": "../public/assets/label--M2gLtpv.js"
	},
	"/assets/layout-Cd4fX1p4.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f2-wioXeu03sTce8OaVO33S60X3nAI\"",
		"mtime": "2026-11-10T21:04:59.547Z",
		"size": 242,
		"path": "../public/assets/layout-Cd4fX1p4.js"
	},
	"/assets/link-D9EgcF10.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"496c-BET0AyjJ/l0ct+trLgIFpQJNEbY\"",
		"mtime": "2026-11-10T21:04:59.547Z",
		"size": 18796,
		"path": "../public/assets/link-D9EgcF10.js"
	},
	"/assets/llm-DkJ-qxn_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2ec9-1XgO/tzcSMQeFrt/VXQapUS6zcA\"",
		"mtime": "2026-11-10T21:04:59.547Z",
		"size": 11977,
		"path": "../public/assets/llm-DkJ-qxn_.js"
	},
	"/assets/logo-tedslab-CSGR30te.png": {
		"type": "image/png",
		"etag": "\"7caa0-7zdWgbobOh6pFHVZufJZw3PL3lM\"",
		"mtime": "2026-11-10T21:04:59.553Z",
		"size": 510624,
		"path": "../public/assets/logo-tedslab-CSGR30te.png"
	},
	"/assets/knowledge-atlas-DwtvmXY4.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c98bf-YDGk3Ek8Ne6u66fTUZJ375fHhWY\"",
		"mtime": "2026-11-10T21:04:59.546Z",
		"size": 825535,
		"path": "../public/assets/knowledge-atlas-DwtvmXY4.js"
	},
	"/assets/lost-atlas-CG1ONxne.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"15d7-jkOU2iyKHziwkEIQcQMbwmIpfL8\"",
		"mtime": "2026-11-10T21:04:59.547Z",
		"size": 5591,
		"path": "../public/assets/lost-atlas-CG1ONxne.js"
	},
	"/assets/lost-atlas._slug-YVpAk2EX.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"166b-1dgAhuPx6eV6FYyG+GXFm6dm2js\"",
		"mtime": "2026-11-10T21:04:59.547Z",
		"size": 5739,
		"path": "../public/assets/lost-atlas._slug-YVpAk2EX.js"
	},
	"/assets/maps-BZi9t6WY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"16e-sc29eoVtoZIri2/0U5n/4/Kn/Hw\"",
		"mtime": "2026-11-10T21:04:59.547Z",
		"size": 366,
		"path": "../public/assets/maps-BZi9t6WY.js"
	},
	"/assets/math-algebra-Bht1HCz8.jpg": {
		"type": "image/jpeg",
		"etag": "\"2d35a-PvVYI2LrpcoD2wanQQ7xOYpbYIE\"",
		"mtime": "2026-11-10T21:04:59.553Z",
		"size": 185178,
		"path": "../public/assets/math-algebra-Bht1HCz8.jpg"
	},
	"/assets/math-calculus-B1M0mWMY.jpg": {
		"type": "image/jpeg",
		"etag": "\"5b9d-bVTaXEAGiT9VR5oaj+FZmqSlB0U\"",
		"mtime": "2026-11-10T21:04:59.554Z",
		"size": 23453,
		"path": "../public/assets/math-calculus-B1M0mWMY.jpg"
	},
	"/assets/math-geometry-SGeNwC3o.jpg": {
		"type": "image/jpeg",
		"etag": "\"2ba46-mIRTtF52sxAW70KWKjzJOualsJs\"",
		"mtime": "2026-11-10T21:04:59.554Z",
		"size": 178758,
		"path": "../public/assets/math-geometry-SGeNwC3o.jpg"
	},
	"/assets/math-statistics-BlqoBDEB.jpg": {
		"type": "image/jpeg",
		"etag": "\"9615-x8xInAeJEUklmLWM3NTCzpQDzVI\"",
		"mtime": "2026-11-10T21:04:59.554Z",
		"size": 38421,
		"path": "../public/assets/math-statistics-BlqoBDEB.jpg"
	},
	"/assets/network-MM9e4uF4.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"172-z0K3fGP0nky5k2FIE9pY0EHnL7Y\"",
		"mtime": "2026-11-10T21:04:59.547Z",
		"size": 370,
		"path": "../public/assets/network-MM9e4uF4.js"
	},
	"/assets/not-found-i5RsCZif.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"76-Trmr7GZIBZuvfg4uM18tBiRtOXg\"",
		"mtime": "2026-11-10T21:04:59.548Z",
		"size": 118,
		"path": "../public/assets/not-found-i5RsCZif.js"
	},
	"/assets/notebook-_Owxwiii.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"762-visqUuc5W4k5/qBynz6bp93Q1j4\"",
		"mtime": "2026-11-10T21:04:59.548Z",
		"size": 1890,
		"path": "../public/assets/notebook-_Owxwiii.js"
	},
	"/assets/organisms-DWHF4hFq.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"27f-gqYvhggiYo2Jsn5lok8ENIZkmkI\"",
		"mtime": "2026-11-10T21:04:59.548Z",
		"size": 639,
		"path": "../public/assets/organisms-DWHF4hFq.js"
	},
	"/assets/page-D3yl_Kr0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1408-nNvJ3ZORoFa63zOKn2GBXyREspc\"",
		"mtime": "2026-11-10T21:04:59.548Z",
		"size": 5128,
		"path": "../public/assets/page-D3yl_Kr0.js"
	},
	"/assets/pages-CW-J0ps3.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5d2-sYiYcgYxOvYeeL//drNy47IsqUA\"",
		"mtime": "2026-11-10T21:04:59.548Z",
		"size": 1490,
		"path": "../public/assets/pages-CW-J0ps3.js"
	},
	"/assets/pages._slug-8M0c68mm.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"241-Mx7853tK2ktFA4iHD1nr+Uee2Bg\"",
		"mtime": "2026-11-10T21:04:59.548Z",
		"size": 577,
		"path": "../public/assets/pages._slug-8M0c68mm.js"
	},
	"/assets/pages._slug-RuMUhZPM.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2eb-U31bDQuybTy141YJ0ENduO9QoWk\"",
		"mtime": "2026-11-10T21:04:59.548Z",
		"size": 747,
		"path": "../public/assets/pages._slug-RuMUhZPM.js"
	},
	"/assets/photosynthese-BcXtXVgE.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4f-qs/s3XwCJbMwWMvC70hh5dTn610\"",
		"mtime": "2026-11-10T21:04:59.548Z",
		"size": 79,
		"path": "../public/assets/photosynthese-BcXtXVgE.js"
	},
	"/assets/photosynthese-DdyxZ3v5.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"252f-SLkcv8xyTgf3b8/9FO3SqB5t+BU\"",
		"mtime": "2026-11-10T21:04:59.548Z",
		"size": 9519,
		"path": "../public/assets/photosynthese-DdyxZ3v5.js"
	},
	"/assets/photosynthesis-BcXtXVgE.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4f-qs/s3XwCJbMwWMvC70hh5dTn610\"",
		"mtime": "2026-11-10T21:04:59.548Z",
		"size": 79,
		"path": "../public/assets/photosynthesis-BcXtXVgE.js"
	},
	"/assets/plants-BULwLbXh.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"27c-1OP0caCGBy/0aME5feq8nhceC/A\"",
		"mtime": "2026-11-10T21:04:59.548Z",
		"size": 636,
		"path": "../public/assets/plants-BULwLbXh.js"
	},
	"/assets/policy-YVeJVvZw.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"414-bOXU6d7femLMCdMuTEFwe/u8w7w\"",
		"mtime": "2026-11-10T21:04:59.548Z",
		"size": 1044,
		"path": "../public/assets/policy-YVeJVvZw.js"
	},
	"/assets/preload-helper-DpD9e4SU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"132d-JVQ3tuBZpFDyNT18nLRAePNcAGw\"",
		"mtime": "2026-11-10T21:04:59.548Z",
		"size": 4909,
		"path": "../public/assets/preload-helper-DpD9e4SU.js"
	},
	"/assets/privacy-CosoUt9u.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"407-YCaI2IIV2uzlGQsC/qXyFx3kuJ4\"",
		"mtime": "2026-11-10T21:04:59.548Z",
		"size": 1031,
		"path": "../public/assets/privacy-CosoUt9u.js"
	},
	"/assets/quizzes-D4nME-uX.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"91e-EXSHo/aIwhNiiJiN/IsU7RQFbY0\"",
		"mtime": "2026-11-10T21:04:59.548Z",
		"size": 2334,
		"path": "../public/assets/quizzes-D4nME-uX.js"
	},
	"/assets/redirect-DmtLUW0N.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"184-TRM49T5nvIhX8okm9YKQe/jdlzE\"",
		"mtime": "2026-11-10T21:04:59.548Z",
		"size": 388,
		"path": "../public/assets/redirect-DmtLUW0N.js"
	},
	"/assets/root-DLTE-HSj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"20-vSYConOtSP6ciwr9zKsPixNwWmc\"",
		"mtime": "2026-11-10T21:04:59.548Z",
		"size": 32,
		"path": "../public/assets/root-DLTE-HSj.js"
	},
	"/assets/routes-CixZkWcJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3f70-KEdM7Vr5A5uT0HiIM7YiC8X1Hcc\"",
		"mtime": "2026-11-10T21:04:59.549Z",
		"size": 16240,
		"path": "../public/assets/routes-CixZkWcJ.js"
	},
	"/assets/saved-CBio6F3C.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"548-Q3uBVMKOj8EjQFvIOpOsl/CeWrE\"",
		"mtime": "2026-11-10T21:04:59.549Z",
		"size": 1352,
		"path": "../public/assets/saved-CBio6F3C.js"
	},
	"/assets/sci-chemistry-DGer7X6m.jpg": {
		"type": "image/jpeg",
		"etag": "\"e531-uGB6rS2e12MOCOGeglkmNegaRSo\"",
		"mtime": "2026-11-10T21:04:59.554Z",
		"size": 58673,
		"path": "../public/assets/sci-chemistry-DGer7X6m.jpg"
	},
	"/assets/sci-earth-G0pK22sY.jpg": {
		"type": "image/jpeg",
		"etag": "\"db7f-wXmT2IjaOS6hzPumkxA6nP8tkNs\"",
		"mtime": "2026-11-10T21:04:59.554Z",
		"size": 56191,
		"path": "../public/assets/sci-earth-G0pK22sY.jpg"
	},
	"/assets/sci-method-DJPtNKgn.jpg": {
		"type": "image/jpeg",
		"etag": "\"65e5-3SjBWTNfnBOULOyVptfI2A1b/Vc\"",
		"mtime": "2026-11-10T21:04:59.554Z",
		"size": 26085,
		"path": "../public/assets/sci-method-DJPtNKgn.jpg"
	},
	"/assets/sci-physics-egMuwKm5.jpg": {
		"type": "image/jpeg",
		"etag": "\"8002-mpTyuxFNaEQb/wliH6KcUwSpEdA\"",
		"mtime": "2026-11-10T21:04:59.554Z",
		"size": 32770,
		"path": "../public/assets/sci-physics-egMuwKm5.jpg"
	},
	"/assets/settings-C7yk_2F-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7bd-rTmA+zfI+SU2xD9CRr0nJ8r+6E8\"",
		"mtime": "2026-11-10T21:04:59.549Z",
		"size": 1981,
		"path": "../public/assets/settings-C7yk_2F-.js"
	},
	"/assets/signup-CQrAjMDQ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"18b-Ir4obb7qSWNxVOGp0BgEfx+p0So\"",
		"mtime": "2026-11-10T21:04:59.549Z",
		"size": 395,
		"path": "../public/assets/signup-CQrAjMDQ.js"
	},
	"/assets/soft-os-addition-B5_sNrTB.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"192-gdg8i5kE6vL02bzXKuej6kM+6tc\"",
		"mtime": "2026-11-10T21:04:59.549Z",
		"size": 402,
		"path": "../public/assets/soft-os-addition-B5_sNrTB.js"
	},
	"/assets/species-scan-B-vFms0r.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"18d-A6WEssM+UBX8vZS6lkIxa5FBegw\"",
		"mtime": "2026-11-10T21:04:59.549Z",
		"size": 397,
		"path": "../public/assets/species-scan-B-vFms0r.js"
	},
	"/assets/styles-DHonbaTK.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"1eaa3-GZFw1M9JFdlevC2jDhll2aYW0dg\"",
		"mtime": "2026-11-10T21:04:59.554Z",
		"size": 125603,
		"path": "../public/assets/styles-DHonbaTK.css"
	},
	"/assets/tech-ai-N3_TfYIB.jpg": {
		"type": "image/jpeg",
		"etag": "\"f480-XFMqfN4HU/xKZCm+qV91Y8qyT6s\"",
		"mtime": "2026-11-10T21:04:59.555Z",
		"size": 62592,
		"path": "../public/assets/tech-ai-N3_TfYIB.jpg"
	},
	"/assets/tech-computing-BxqdUC2U.jpg": {
		"type": "image/jpeg",
		"etag": "\"19004-Vbz9mxUEKBzQVVPKauFw6hj+b+c\"",
		"mtime": "2026-11-10T21:04:59.555Z",
		"size": 102404,
		"path": "../public/assets/tech-computing-BxqdUC2U.jpg"
	},
	"/assets/tech-computing-CtHh0Hcn.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3b-rTsmoL0P1YPRMfLKNXGnFHutF0Y\"",
		"mtime": "2026-11-10T21:04:59.549Z",
		"size": 59,
		"path": "../public/assets/tech-computing-CtHh0Hcn.js"
	},
	"/assets/tech-programming-Cf7Rx_zT.jpg": {
		"type": "image/jpeg",
		"etag": "\"10fd9-Zmup00l2jDFH6bYOkb55tsdWm4A\"",
		"mtime": "2026-11-10T21:04:59.555Z",
		"size": 69593,
		"path": "../public/assets/tech-programming-Cf7Rx_zT.jpg"
	},
	"/assets/tech-security-DpkuyTLX.jpg": {
		"type": "image/jpeg",
		"etag": "\"1198b-ZlcjLSmzw82L+/mv+fDruoW5SQM\"",
		"mtime": "2026-11-10T21:04:59.555Z",
		"size": 72075,
		"path": "../public/assets/tech-security-DpkuyTLX.jpg"
	},
	"/assets/timeline-nPuuUG4S.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3a2-zOMEODDU4OQePejGSaetzobHbIo\"",
		"mtime": "2026-11-10T21:04:59.549Z",
		"size": 930,
		"path": "../public/assets/timeline-nPuuUG4S.js"
	},
	"/assets/translate-iZai8bC0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1138-l7IpqsE1Un9FqrFCbQOSbgzG/l8\"",
		"mtime": "2026-11-10T21:04:59.549Z",
		"size": 4408,
		"path": "../public/assets/translate-iZai8bC0.js"
	},
	"/assets/tutorials-DkpfKn88.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"abf-SokDfl3dBLse092rMisK0hYCnAI\"",
		"mtime": "2026-11-10T21:04:59.549Z",
		"size": 2751,
		"path": "../public/assets/tutorials-DkpfKn88.js"
	},
	"/assets/tutorials._slug-B6-sgaVf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"aaa-QVhRdJOnxOW4bfV7y/YopMdnIzc\"",
		"mtime": "2026-11-10T21:04:59.549Z",
		"size": 2730,
		"path": "../public/assets/tutorials._slug-B6-sgaVf.js"
	},
	"/assets/update-soft-B8bKoo8B.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"191-nDRoqFJ5ExdK8uFfkSZVmVDTAos\"",
		"mtime": "2026-11-10T21:04:59.549Z",
		"size": 401,
		"path": "../public/assets/update-soft-B8bKoo8B.js"
	},
	"/assets/use-auth-CCcSqoAJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"38a-m5UukUfSO7zkzsP4dZLIiSjURUg\"",
		"mtime": "2026-11-10T21:04:59.549Z",
		"size": 906,
		"path": "../public/assets/use-auth-CCcSqoAJ.js"
	},
	"/assets/useNavigate-PQZbts4U.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"df-q5rPMp49HTuyyj/rQMFhekFtnOs\"",
		"mtime": "2026-11-10T21:04:59.549Z",
		"size": 223,
		"path": "../public/assets/useNavigate-PQZbts4U.js"
	},
	"/assets/videos-DCzxXXy9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"574-YbVbug4MAijQHJovUBZJnOuDT0Y\"",
		"mtime": "2026-11-10T21:04:59.549Z",
		"size": 1396,
		"path": "../public/assets/videos-DCzxXXy9.js"
	},
	"/assets/videos._slug-fRWMT9pY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"645-4KvNXIy9gtTRH5ZLxiZmwlTwRp8\"",
		"mtime": "2026-11-10T21:04:59.550Z",
		"size": 1605,
		"path": "../public/assets/videos._slug-fRWMT9pY.js"
	},
	"/download logo/tedslab-download.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"186-lFbVj+z0p+x0csdNfeWXqB+VpkI\"",
		"mtime": "2026-11-10T21:05:04.551Z",
		"size": 390,
		"path": "../public/download logo/tedslab-download.txt"
	},
	"/download logo/tedslab.png": {
		"type": "image/png",
		"etag": "\"11ba99-an7wcjiulP40vrDMKyC07RnqWvo\"",
		"mtime": "2026-11-10T21:05:04.553Z",
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
