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
var services = { ["ssr"]: lazyService(() => import("./_ssr/ssr.mjs").then((n) => n.i)) };
globalThis.__nitro_vite_envs__ = services;
//#endregion
//#region #nitro/virtual/public-assets-data
var public_assets_data_default = {
	"/favicon.png": {
		"type": "image/png",
		"etag": "\"e7c-rpz6kO3Q2jWZGiO7JLjaVb0cRkA\"",
		"mtime": "2026-11-10T11:32:18.727Z",
		"size": 3708,
		"path": "../public/favicon.png"
	},
	"/logo.png": {
		"type": "image/png",
		"etag": "\"71d5-iC+KKvoAskwLdT7EV0YCsHQFXYw\"",
		"mtime": "2026-11-10T11:32:18.727Z",
		"size": 29141,
		"path": "../public/logo.png"
	},
	"/robots.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"ec-3buti6v9Xr+gI3SlCHLfqVwS0tE\"",
		"mtime": "2026-11-10T11:32:18.727Z",
		"size": 236,
		"path": "../public/robots.txt"
	},
	"/assets/AdminPage-B29PlbCr.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ad9-r9+YIKrUvBpSSkq7lplDy2B1cYM\"",
		"mtime": "2026-11-10T11:32:15.710Z",
		"size": 2777,
		"path": "../public/assets/AdminPage-B29PlbCr.js"
	},
	"/assets/ArticleCard-BZFeyG6k.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"bc3-wkUBrXTmmmoJULSkR5u1t/jvwOA\"",
		"mtime": "2026-11-10T11:32:15.711Z",
		"size": 3011,
		"path": "../public/assets/ArticleCard-BZFeyG6k.js"
	},
	"/assets/ArticleTemplate-DL2FiCVV.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1e79-FwHpH9kUifVdcBwfJGKB08ozFgs\"",
		"mtime": "2026-11-10T11:32:15.711Z",
		"size": 7801,
		"path": "../public/assets/ArticleTemplate-DL2FiCVV.js"
	},
	"/assets/AuthForm-Z2Wvkyhm.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"120a-RhT8Sd4IuYC577qaz8J+MGVI52M\"",
		"mtime": "2026-11-10T11:32:15.711Z",
		"size": 4618,
		"path": "../public/assets/AuthForm-Z2Wvkyhm.js"
	},
	"/assets/PlatformPlaceholderPage-B5jH2wKz.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"862-jZfOTGhOCTd8wd9uGqzL5ILn0TM\"",
		"mtime": "2026-11-10T11:32:15.711Z",
		"size": 2146,
		"path": "../public/assets/PlatformPlaceholderPage-B5jH2wKz.js"
	},
	"/assets/TopicGrid-Dyg7ReWN.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d27-WRQAqbubWnyEGThacZyy+L9LSOg\"",
		"mtime": "2026-11-10T11:32:15.711Z",
		"size": 3367,
		"path": "../public/assets/TopicGrid-Dyg7ReWN.js"
	},
	"/assets/_section._topic--xJOPEXH.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9a3-w+83YPuMISUtYsk7EU3+ukW/N90\"",
		"mtime": "2026-11-10T11:32:15.711Z",
		"size": 2467,
		"path": "../public/assets/_section._topic--xJOPEXH.js"
	},
	"/assets/_subject-CB0ZhmT0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4c4-KPdH7F6jtg2bEOiVjbPnausZgqI\"",
		"mtime": "2026-11-10T11:32:15.711Z",
		"size": 1220,
		"path": "../public/assets/_subject-CB0ZhmT0.js"
	},
	"/assets/_subject._section._topic-CV4k3sJO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9b8-cECGeemf593snktIpfIOMREPgKg\"",
		"mtime": "2026-11-10T11:32:15.711Z",
		"size": 2488,
		"path": "../public/assets/_subject._section._topic-CV4k3sJO.js"
	},
	"/assets/add-app-Dx72iEad.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a3-zNa3erZkBhRiKnTXoonjePIBE2Y\"",
		"mtime": "2026-11-10T11:32:15.711Z",
		"size": 419,
		"path": "../public/assets/add-app-Dx72iEad.js"
	},
	"/assets/_subject._section-DYVNLmvV.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8a1-ByTaUEG0ao75DRARcmXjfRplk0g\"",
		"mtime": "2026-11-10T11:32:15.711Z",
		"size": 2209,
		"path": "../public/assets/_subject._section-DYVNLmvV.js"
	},
	"/assets/admin-Dg-NLTiX.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3a38-MhDHY/H6CylZ+3bJ+DdBcCz+0QQ\"",
		"mtime": "2026-11-10T11:32:15.711Z",
		"size": 14904,
		"path": "../public/assets/admin-Dg-NLTiX.js"
	},
	"/assets/admin.articles-DL0UkKcB.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"447-UYDrM5pOvy8H9piqkRHJgDoqc+k\"",
		"mtime": "2026-11-10T11:32:15.711Z",
		"size": 1095,
		"path": "../public/assets/admin.articles-DL0UkKcB.js"
	},
	"/assets/admin.articles.new-cORDtKKW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"12a2-QSFkIyqeSoTMUm5StP9YjbL9KLQ\"",
		"mtime": "2026-11-10T11:32:15.711Z",
		"size": 4770,
		"path": "../public/assets/admin.articles.new-cORDtKKW.js"
	},
	"/assets/admin.pages-C5_QS7q5.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a6-qKPEGsuFoM+IsWL+uxGndNd56rU\"",
		"mtime": "2026-11-10T11:32:15.711Z",
		"size": 422,
		"path": "../public/assets/admin.pages-C5_QS7q5.js"
	},
	"/assets/admin.pages-list-CZBSPdNL.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"16e-YV6HbOLMTVfYe57VOysGMVsqG1g\"",
		"mtime": "2026-11-10T11:32:15.711Z",
		"size": 366,
		"path": "../public/assets/admin.pages-list-CZBSPdNL.js"
	},
	"/assets/admin.sections-Bt95QNAk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"187-OQn132OtvPK0p0tFQOQqRIb84ko\"",
		"mtime": "2026-11-10T11:32:15.711Z",
		"size": 391,
		"path": "../public/assets/admin.sections-Bt95QNAk.js"
	},
	"/assets/admin.topics-BwqUgcZc.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"18b-jvGhp+cCoOc5CSF0KxH1Zru2u48\"",
		"mtime": "2026-11-10T11:32:15.712Z",
		"size": 395,
		"path": "../public/assets/admin.topics-BwqUgcZc.js"
	},
	"/assets/ai-eB-hdMLE.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4012-iBcdAy4seVIuW7yXrwSXXTDtrZI\"",
		"mtime": "2026-11-10T11:32:15.712Z",
		"size": 16402,
		"path": "../public/assets/ai-eB-hdMLE.js"
	},
	"/assets/anatomy-BS6y092K.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"27d-AKIsb1IPUzxSMyVBVei8N2T0Twc\"",
		"mtime": "2026-11-10T11:32:15.712Z",
		"size": 637,
		"path": "../public/assets/anatomy-BS6y092K.js"
	},
	"/assets/annotation-sys-BKDg7QR4.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"184-xZGRYeiCbafQQ7WVDGyYnD2Tnj8\"",
		"mtime": "2026-11-10T11:32:15.712Z",
		"size": 388,
		"path": "../public/assets/annotation-sys-BKDg7QR4.js"
	},
	"/assets/AppShell-B0ZEVeZK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9916d-72HFl1A6x81SJ0nKA9XL9sZh89s\"",
		"mtime": "2026-11-10T11:32:15.710Z",
		"size": 627053,
		"path": "../public/assets/AppShell-B0ZEVeZK.js"
	},
	"/assets/articles-CkUSm_do.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"434-tZyEbq1KGLCykGMzbGlD74fEsrs\"",
		"mtime": "2026-11-10T11:32:15.712Z",
		"size": 1076,
		"path": "../public/assets/articles-CkUSm_do.js"
	},
	"/assets/articles-debug-BDw0ovi3.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"12f0-4RZiDDYp+AV8EHPNE5KOLIQzWMc\"",
		"mtime": "2026-11-10T11:32:15.712Z",
		"size": 4848,
		"path": "../public/assets/articles-debug-BDw0ovi3.js"
	},
	"/assets/articles._slug-DasjnD8B.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"248-EiXbO3xvFaMuMvHP9ZLHKhqszms\"",
		"mtime": "2026-11-10T11:32:15.712Z",
		"size": 584,
		"path": "../public/assets/articles._slug-DasjnD8B.js"
	},
	"/assets/articles.cellular-respiration-Bf8sVUJL.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1fe1-3mlfkmLOF6iuOPXGS/+QqXjem0I\"",
		"mtime": "2026-11-10T11:32:15.712Z",
		"size": 8161,
		"path": "../public/assets/articles.cellular-respiration-Bf8sVUJL.js"
	},
	"/assets/articles.enzyme-catalysis-BbXdq3q2.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e7f-uDIG9hTX1FiRsVltN77YXsOOLM4\"",
		"mtime": "2026-11-10T11:32:15.712Z",
		"size": 3711,
		"path": "../public/assets/articles.enzyme-catalysis-BbXdq3q2.js"
	},
	"/assets/articles.food-chains-energy-flow--4neubhX.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e99-Rn3bgBjuzt1HA5QIEkFFVtSjqmE\"",
		"mtime": "2026-11-10T11:32:15.712Z",
		"size": 3737,
		"path": "../public/assets/articles.food-chains-energy-flow--4neubhX.js"
	},
	"/assets/articles.human-anatomy-systems-C6CUBBus.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e86-+rTKvgQKBTVIfjokfnW67nPzdms\"",
		"mtime": "2026-11-10T11:32:15.712Z",
		"size": 3718,
		"path": "../public/assets/articles.human-anatomy-systems-C6CUBBus.js"
	},
	"/assets/articles.evolution-natural-selection-FePkgqDc.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ede-2d2hZksOWEePRghfzLKbm0fU5DA\"",
		"mtime": "2026-11-10T11:32:15.712Z",
		"size": 3806,
		"path": "../public/assets/articles.evolution-natural-selection-FePkgqDc.js"
	},
	"/assets/articles.meiosis-gamete-formation-DYMvgJPC.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e92-J15+Zz2z8crVMvxBZ2SJIMwOZIs\"",
		"mtime": "2026-11-10T11:32:15.712Z",
		"size": 3730,
		"path": "../public/assets/articles.meiosis-gamete-formation-DYMvgJPC.js"
	},
	"/assets/articles.mitosis-cell-division-peJ8Wbc2.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ecb-jlREjd0EzOsxHoo0CmY8HB/aV0c\"",
		"mtime": "2026-11-10T11:32:15.712Z",
		"size": 3787,
		"path": "../public/assets/articles.mitosis-cell-division-peJ8Wbc2.js"
	},
	"/assets/articles.photosynthesis-light-reactions-D-s5Pt-7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"eaa-+43PsS5WhC4Oldu7QBOdJ2BAuLM\"",
		"mtime": "2026-11-10T11:32:15.712Z",
		"size": 3754,
		"path": "../public/assets/articles.photosynthesis-light-reactions-D-s5Pt-7.js"
	},
	"/assets/auth-D3_SIkjl.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"182-pP+ejxGxBN/yB98xpsphan7ph1o\"",
		"mtime": "2026-11-10T11:32:15.712Z",
		"size": 386,
		"path": "../public/assets/auth-D3_SIkjl.js"
	},
	"/assets/auth-w2BNGNBv.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6b09-Uq5gr3xZFyLseqlHgf1Y6zIVbLg\"",
		"mtime": "2026-11-10T11:32:15.713Z",
		"size": 27401,
		"path": "../public/assets/auth-w2BNGNBv.js"
	},
	"/assets/biological-processes-C1oLgsh0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"28a-jSMvufrXjK6JFxO/U99J4Xniras\"",
		"mtime": "2026-11-10T11:32:15.713Z",
		"size": 650,
		"path": "../public/assets/biological-processes-C1oLgsh0.js"
	},
	"/assets/biopedia-data-DJbT4MOb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4c9-y0AzIPFEOC8TKUKvFonQwHo3RbA\"",
		"mtime": "2026-11-10T11:32:15.713Z",
		"size": 1225,
		"path": "../public/assets/biopedia-data-DJbT4MOb.js"
	},
	"/assets/button-Be0gWg6o.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"79f-AObJ1SpnH2MEOQwwQYxd0B+6OEM\"",
		"mtime": "2026-11-10T11:32:15.713Z",
		"size": 1951,
		"path": "../public/assets/button-Be0gWg6o.js"
	},
	"/assets/biotechnology-LbKJ7KNs.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"283-26ZpgWxo57vM5C2vBZIckWuMuuE\"",
		"mtime": "2026-11-10T11:32:15.713Z",
		"size": 643,
		"path": "../public/assets/biotechnology-LbKJ7KNs.js"
	},
	"/assets/cat-ecology-DbnEUXHR.jpg": {
		"type": "image/jpeg",
		"etag": "\"2da9e-OCrQ+5HxBL/MeFpjI2Ml9mEB6CQ\"",
		"mtime": "2026-11-10T11:32:15.719Z",
		"size": 187038,
		"path": "../public/assets/cat-ecology-DbnEUXHR.jpg"
	},
	"/assets/cat-evolution-CC_w4loO.jpg": {
		"type": "image/jpeg",
		"etag": "\"2fdbd-seNsXnl4XHNUY71qgNreqGrRZEg\"",
		"mtime": "2026-11-10T11:32:15.719Z",
		"size": 196029,
		"path": "../public/assets/cat-evolution-CC_w4loO.jpg"
	},
	"/assets/cat-genetics-C6CBosmo.jpg": {
		"type": "image/jpeg",
		"etag": "\"281ff-qhaiIvZ8BDqFMGgfDXNC3bv5mFo\"",
		"mtime": "2026-11-10T11:32:15.720Z",
		"size": 164351,
		"path": "../public/assets/cat-genetics-C6CBosmo.jpg"
	},
	"/assets/cat-human-BuRMR2jH.jpg": {
		"type": "image/jpeg",
		"etag": "\"23326-4wTTr4zzrFQf89XTkJyXsX8rXHg\"",
		"mtime": "2026-11-10T11:32:15.720Z",
		"size": 144166,
		"path": "../public/assets/cat-human-BuRMR2jH.jpg"
	},
	"/assets/cat-organisms-yXH6lJcJ.jpg": {
		"type": "image/jpeg",
		"etag": "\"2acbe-1G/hL2bGRo8MkA9mSKQX6eYai7o\"",
		"mtime": "2026-11-10T11:32:15.720Z",
		"size": 175294,
		"path": "../public/assets/cat-organisms-yXH6lJcJ.jpg"
	},
	"/assets/cat-plants-Bu_hoilj.jpg": {
		"type": "image/jpeg",
		"etag": "\"3af5b-WyZ9BT5qxBZaWxxjuNNVL7/2IO0\"",
		"mtime": "2026-11-10T11:32:15.720Z",
		"size": 241499,
		"path": "../public/assets/cat-plants-Bu_hoilj.jpg"
	},
	"/assets/catalog-BFqRb66N.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1388c-/nKYY74FNFK3/msZaGByh5HXyRY\"",
		"mtime": "2026-11-10T11:32:15.713Z",
		"size": 80012,
		"path": "../public/assets/catalog-BFqRb66N.js"
	},
	"/assets/categories-GIyY4AhT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3e2-9jYKCc1H+piWJrBXbUETgptqUW0\"",
		"mtime": "2026-11-10T11:32:15.713Z",
		"size": 994,
		"path": "../public/assets/categories-GIyY4AhT.js"
	},
	"/assets/cells-microscopy-Da3Q--eK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"286-WzAEmyGTZY69RuZA+lmm9tUEIDw\"",
		"mtime": "2026-11-10T11:32:15.713Z",
		"size": 646,
		"path": "../public/assets/cells-microscopy-Da3Q--eK.js"
	},
	"/assets/chronos-os-DbAZMets.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f28-r/aVResuYAKYDuDkeEZrnuss2ec\"",
		"mtime": "2026-11-10T11:32:15.713Z",
		"size": 3880,
		"path": "../public/assets/chronos-os-DbAZMets.js"
	},
	"/assets/communicational-system-BBZUzBFJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a2-TuWBTxXHZ3uYFbgaIlIGnZ1kOqA\"",
		"mtime": "2026-11-10T11:32:15.713Z",
		"size": 418,
		"path": "../public/assets/communicational-system-BBZUzBFJ.js"
	},
	"/assets/createLucideIcon-JuoJIUQ-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4ce-tpxp/7wFcBQQFxNRCh7N1TO9Bb8\"",
		"mtime": "2026-11-10T11:32:15.713Z",
		"size": 1230,
		"path": "../public/assets/createLucideIcon-JuoJIUQ-.js"
	},
	"/assets/custom-lists-BLD_LRa7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b42-YNTEueslQUAlZoqRZR6/Z4f/Lw4\"",
		"mtime": "2026-11-10T11:32:15.713Z",
		"size": 2882,
		"path": "../public/assets/custom-lists-BLD_LRa7.js"
	},
	"/assets/dashboard-BkavHqu1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"506-t4JsT8IvR3gM0wxwIB6rMwzsImA\"",
		"mtime": "2026-11-10T11:32:15.713Z",
		"size": 1286,
		"path": "../public/assets/dashboard-BkavHqu1.js"
	},
	"/assets/decipher-CmiYfY13.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"16f-vR75XywYhn461gWdAK5a0lcCRmE\"",
		"mtime": "2026-11-10T11:32:15.713Z",
		"size": 367,
		"path": "../public/assets/decipher-CmiYfY13.js"
	},
	"/assets/dev-dashboard-ZOdvHcfv.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"10e0-KXV7sER76fOoHs8rQKKX9GgP+dM\"",
		"mtime": "2026-11-10T11:32:15.713Z",
		"size": 4320,
		"path": "../public/assets/dev-dashboard-ZOdvHcfv.js"
	},
	"/assets/dev-tools-BAhms9jx.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"13a7-SK9s54BEiu+qZnWcmaMGdk3Kix0\"",
		"mtime": "2026-11-10T11:32:15.713Z",
		"size": 5031,
		"path": "../public/assets/dev-tools-BAhms9jx.js"
	},
	"/assets/discovery-leaf-B4lyAWC2.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3b-my347b2NUKvD+XRT+D6BbNxbmjg\"",
		"mtime": "2026-11-10T11:32:15.714Z",
		"size": 59,
		"path": "../public/assets/discovery-leaf-B4lyAWC2.js"
	},
	"/assets/discovery-leaf-CDLQK6NX.jpg": {
		"type": "image/jpeg",
		"etag": "\"292a2-sl75CS6OW2pQPTWnj52a0F63jwo\"",
		"mtime": "2026-11-10T11:32:15.720Z",
		"size": 168610,
		"path": "../public/assets/discovery-leaf-CDLQK6NX.jpg"
	},
	"/assets/dist-Cq2m6oEo.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b58-XdBtBB9sJADTWO52F4SvjSXw/FE\"",
		"mtime": "2026-11-10T11:32:15.714Z",
		"size": 2904,
		"path": "../public/assets/dist-Cq2m6oEo.js"
	},
	"/assets/dist-D3WHiKOD2.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2da-En0frj9EWI218DTV6qQLTLX4vLg\"",
		"mtime": "2026-11-10T11:32:15.714Z",
		"size": 730,
		"path": "../public/assets/dist-D3WHiKOD2.js"
	},
	"/assets/download-BBJ_gBSd.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"105a-Kitutt5Wkbb4diVMkblIBgWdTbo\"",
		"mtime": "2026-11-10T11:32:15.715Z",
		"size": 4186,
		"path": "../public/assets/download-BBJ_gBSd.js"
	},
	"/assets/download-Dgk43Q4h.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e8-JaAblApOEIicL3rF4n8l1Wk2i5k\"",
		"mtime": "2026-11-10T11:32:15.715Z",
		"size": 232,
		"path": "../public/assets/download-Dgk43Q4h.js"
	},
	"/assets/downloadable-software-CpxwxFNG.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"67d-OXrh6C8eHX7Xx77Rm+MTwJVKadE\"",
		"mtime": "2026-11-10T11:32:15.715Z",
		"size": 1661,
		"path": "../public/assets/downloadable-software-CpxwxFNG.js"
	},
	"/assets/ecology-environment-pHmgEyyY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"289-fQpBpw7SE0shYBiwfdW4Te+qN5Q\"",
		"mtime": "2026-11-10T11:32:15.715Z",
		"size": 649,
		"path": "../public/assets/ecology-environment-pHmgEyyY.js"
	},
	"/assets/eng-grammar-B1tMmnMx.jpg": {
		"type": "image/jpeg",
		"etag": "\"74c1-XK8BNB8ZAYcd/TE7F0EdV/8Ul8I\"",
		"mtime": "2026-11-10T11:32:15.721Z",
		"size": 29889,
		"path": "../public/assets/eng-grammar-B1tMmnMx.jpg"
	},
	"/assets/eng-literature-BajHjXyN.jpg": {
		"type": "image/jpeg",
		"etag": "\"cc62-NF9kB2OyFm1zMZ+Oih1ZHorruYg\"",
		"mtime": "2026-11-10T11:32:15.721Z",
		"size": 52322,
		"path": "../public/assets/eng-literature-BajHjXyN.jpg"
	},
	"/assets/eng-poetry-BQYnMCQa.jpg": {
		"type": "image/jpeg",
		"etag": "\"10239-W3/DnYSqaKLw+1EOhXvOc98a4PU\"",
		"mtime": "2026-11-10T11:32:15.721Z",
		"size": 66105,
		"path": "../public/assets/eng-poetry-BQYnMCQa.jpg"
	},
	"/assets/eng-writing-DkEjUsar.jpg": {
		"type": "image/jpeg",
		"etag": "\"9cc3-ee85EOsBs2794hyQ7ENTiSRcMx8\"",
		"mtime": "2026-11-10T11:32:15.721Z",
		"size": 40131,
		"path": "../public/assets/eng-writing-DkEjUsar.jpg"
	},
	"/assets/evolution-Br1PHzb_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"27f-HSbtkX48wdZlouzqe9O3U5f+BSo\"",
		"mtime": "2026-11-10T11:32:15.715Z",
		"size": 639,
		"path": "../public/assets/evolution-Br1PHzb_.js"
	},
	"/assets/extension-tools-upload-CmS9Alk7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"19b-UwSRM+l/YT22Fa3MHgpLnf7XApY\"",
		"mtime": "2026-11-10T11:32:15.715Z",
		"size": 411,
		"path": "../public/assets/extension-tools-upload-CmS9Alk7.js"
	},
	"/assets/extensions-mS-4VnT4.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"46-GjA8LGcuYhO/jOC3mAnI4FgIWxM\"",
		"mtime": "2026-11-10T11:32:15.715Z",
		"size": 70,
		"path": "../public/assets/extensions-mS-4VnT4.js"
	},
	"/assets/docs-DiBPECgv.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8576f-CODf1gGr5M3iloKb2aLum7mGpOI\"",
		"mtime": "2026-11-10T11:32:15.714Z",
		"size": 546671,
		"path": "../public/assets/docs-DiBPECgv.js"
	},
	"/assets/extensions.noter-CvVzv6Gw.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"46-kFDTlk+vXAEiGDP/BduU5pJbuuM\"",
		"mtime": "2026-11-10T11:32:15.715Z",
		"size": 70,
		"path": "../public/assets/extensions.noter-CvVzv6Gw.js"
	},
	"/assets/flashcards-41DE7Foh.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"44f-85mdwuGr5YDx/07dwE1/QsU0vB4\"",
		"mtime": "2026-11-10T11:32:15.715Z",
		"size": 1103,
		"path": "../public/assets/flashcards-41DE7Foh.js"
	},
	"/assets/genetics-dna-urZnBOW6.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"282-bHqGuSfTbUpFKXJaSy8KS/AiTCc\"",
		"mtime": "2026-11-10T11:32:15.715Z",
		"size": 642,
		"path": "../public/assets/genetics-dna-urZnBOW6.js"
	},
	"/assets/glossary-Bdjvczp7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"36b-nl98BZKhrWqS3B6nFKcPFSwBZng\"",
		"mtime": "2026-11-10T11:32:15.715Z",
		"size": 875,
		"path": "../public/assets/glossary-Bdjvczp7.js"
	},
	"/assets/graphication-Co0T86j9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"179-+2ScrrGCkJjXI8rO4iU3iZrXAPA\"",
		"mtime": "2026-11-10T11:32:15.715Z",
		"size": 377,
		"path": "../public/assets/graphication-Co0T86j9.js"
	},
	"/assets/help-center-BzT5OjTh.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"14c1-kKZrFqTjcwZjRYsjMSvM+/GEie4\"",
		"mtime": "2026-11-10T11:32:15.715Z",
		"size": 5313,
		"path": "../public/assets/help-center-BzT5OjTh.js"
	},
	"/assets/hero-cell-BewOnWpW.jpg": {
		"type": "image/jpeg",
		"etag": "\"40c11-gRZUnBDNdykEsTfNLMgxrZ+4OcU\"",
		"mtime": "2026-11-10T11:32:15.721Z",
		"size": 265233,
		"path": "../public/assets/hero-cell-BewOnWpW.jpg"
	},
	"/assets/his-ancient-D_3kmTQu.jpg": {
		"type": "image/jpeg",
		"etag": "\"124b1-VN0HL9ZUiqcfpgKsq+4JPZ2wA70\"",
		"mtime": "2026-11-10T11:32:15.721Z",
		"size": 74929,
		"path": "../public/assets/his-ancient-D_3kmTQu.jpg"
	},
	"/assets/his-medieval-Z1UQ46lz.jpg": {
		"type": "image/jpeg",
		"etag": "\"94dd-hwSoe+zL6tyOotdQvEYv56k0YhM\"",
		"mtime": "2026-11-10T11:32:15.721Z",
		"size": 38109,
		"path": "../public/assets/his-medieval-Z1UQ46lz.jpg"
	},
	"/assets/his-revolutions-BKB1brIf.jpg": {
		"type": "image/jpeg",
		"etag": "\"f396-a6hL0Vst70K1o9x2ypegAAHcKWs\"",
		"mtime": "2026-11-10T11:32:15.722Z",
		"size": 62358,
		"path": "../public/assets/his-revolutions-BKB1brIf.jpg"
	},
	"/assets/his-wars-Dja4_BlN.jpg": {
		"type": "image/jpeg",
		"etag": "\"e5ca-2jcnizpZCZIyPz3NRRyhh6p2aUw\"",
		"mtime": "2026-11-10T11:32:15.722Z",
		"size": 58826,
		"path": "../public/assets/his-wars-Dja4_BlN.jpg"
	},
	"/assets/human-biology-Cch9IiiO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"283-SAQNxXOctfnAKcgzSDwQWdeb1bo\"",
		"mtime": "2026-11-10T11:32:15.715Z",
		"size": 643,
		"path": "../public/assets/human-biology-Cch9IiiO.js"
	},
	"/assets/ide-system-DiDCCoKD.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a1-0lpaNSeJeKtyMRNcgWdh/2FpXvw\"",
		"mtime": "2026-11-10T11:32:15.715Z",
		"size": 417,
		"path": "../public/assets/ide-system-DiDCCoKD.js"
	},
	"/assets/images-xGwTEqeS.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6c7-Pk/YMa5itOlpzK6ZTBCO7vItja8\"",
		"mtime": "2026-11-10T11:32:15.715Z",
		"size": 1735,
		"path": "../public/assets/images-xGwTEqeS.js"
	},
	"/assets/index-LICSW9RW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"601be-RTxMSFjEhRx/D412yx8PhrzG45w\"",
		"mtime": "2026-11-10T11:32:15.710Z",
		"size": 393662,
		"path": "../public/assets/index-LICSW9RW.js"
	},
	"/assets/information-use-B00ejIJl.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"413-anVDuWXfOTRzlEq9ynMccyvK+wM\"",
		"mtime": "2026-11-10T11:32:15.716Z",
		"size": 1043,
		"path": "../public/assets/information-use-B00ejIJl.js"
	},
	"/assets/input-DKsO0Upl.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"283-09KTFpqzw1laSy0r/KHCq26ggXU\"",
		"mtime": "2026-11-10T11:32:15.716Z",
		"size": 643,
		"path": "../public/assets/input-DKsO0Upl.js"
	},
	"/assets/jsx-runtime-Cx0BB4qO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"440-7GwVHNgO4EUMk3cR4Bh6KGJPPX4\"",
		"mtime": "2026-11-10T11:32:15.716Z",
		"size": 1088,
		"path": "../public/assets/jsx-runtime-Cx0BB4qO.js"
	},
	"/assets/label-IUt44KSa.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2e6-MddAMi5zKwcqQ3LOSDZ/RkhK2ig\"",
		"mtime": "2026-11-10T11:32:15.716Z",
		"size": 742,
		"path": "../public/assets/label-IUt44KSa.js"
	},
	"/assets/languages-C_t30eTi.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1f3-FiwLFR33NX1kkURczby1sSonapQ\"",
		"mtime": "2026-11-10T11:32:15.716Z",
		"size": 499,
		"path": "../public/assets/languages-C_t30eTi.js"
	},
	"/assets/layout-DzdhFKub.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f2-1do6GGcO3rh3mlALMujrLGjKog4\"",
		"mtime": "2026-11-10T11:32:15.717Z",
		"size": 242,
		"path": "../public/assets/layout-DzdhFKub.js"
	},
	"/assets/link-rIiCKqw9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"68f4-ZYKsQZ+TV/tZPbaWWWTi5guxZj8\"",
		"mtime": "2026-11-10T11:32:15.717Z",
		"size": 26868,
		"path": "../public/assets/link-rIiCKqw9.js"
	},
	"/assets/llm-D52WujOD.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2eb5-IF0xM+W5b8XL13pdtemh4I53nA0\"",
		"mtime": "2026-11-10T11:32:15.717Z",
		"size": 11957,
		"path": "../public/assets/llm-D52WujOD.js"
	},
	"/assets/logo-tedslab-CSGR30te.png": {
		"type": "image/png",
		"etag": "\"7caa0-7zdWgbobOh6pFHVZufJZw3PL3lM\"",
		"mtime": "2026-11-10T11:32:15.722Z",
		"size": 510624,
		"path": "../public/assets/logo-tedslab-CSGR30te.png"
	},
	"/assets/knowledge-atlas-FOkqXgEv.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c98bd-5OaBveCOjk8nFnP75dcmWFtrHTc\"",
		"mtime": "2026-11-10T11:32:15.716Z",
		"size": 825533,
		"path": "../public/assets/knowledge-atlas-FOkqXgEv.js"
	},
	"/assets/lost-atlas-t2ihT81p.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"15e4-hZqXL+ElL0sSjdXqE36cTEQ4M4M\"",
		"mtime": "2026-11-10T11:32:15.717Z",
		"size": 5604,
		"path": "../public/assets/lost-atlas-t2ihT81p.js"
	},
	"/assets/lost-atlas._slug-BLk4K995.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"165b-6AjrVsaMMcrZDw2hIEt5I9Z15EE\"",
		"mtime": "2026-11-10T11:32:15.717Z",
		"size": 5723,
		"path": "../public/assets/lost-atlas._slug-BLk4K995.js"
	},
	"/assets/maps-YBDgbgkM.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"16e-1Mzdu5hqSPlWTquE7OnMQSs50as\"",
		"mtime": "2026-11-10T11:32:15.717Z",
		"size": 366,
		"path": "../public/assets/maps-YBDgbgkM.js"
	},
	"/assets/math-algebra-Bht1HCz8.jpg": {
		"type": "image/jpeg",
		"etag": "\"2d35a-PvVYI2LrpcoD2wanQQ7xOYpbYIE\"",
		"mtime": "2026-11-10T11:32:15.722Z",
		"size": 185178,
		"path": "../public/assets/math-algebra-Bht1HCz8.jpg"
	},
	"/assets/math-calculus-B1M0mWMY.jpg": {
		"type": "image/jpeg",
		"etag": "\"5b9d-bVTaXEAGiT9VR5oaj+FZmqSlB0U\"",
		"mtime": "2026-11-10T11:32:15.723Z",
		"size": 23453,
		"path": "../public/assets/math-calculus-B1M0mWMY.jpg"
	},
	"/assets/math-geometry-SGeNwC3o.jpg": {
		"type": "image/jpeg",
		"etag": "\"2ba46-mIRTtF52sxAW70KWKjzJOualsJs\"",
		"mtime": "2026-11-10T11:32:15.723Z",
		"size": 178758,
		"path": "../public/assets/math-geometry-SGeNwC3o.jpg"
	},
	"/assets/math-statistics-BlqoBDEB.jpg": {
		"type": "image/jpeg",
		"etag": "\"9615-x8xInAeJEUklmLWM3NTCzpQDzVI\"",
		"mtime": "2026-11-10T11:32:15.723Z",
		"size": 38421,
		"path": "../public/assets/math-statistics-BlqoBDEB.jpg"
	},
	"/assets/network-bSX0789O.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"172-HMumIvwcpiZcVP2+dYAqKNiEUmA\"",
		"mtime": "2026-11-10T11:32:15.717Z",
		"size": 370,
		"path": "../public/assets/network-bSX0789O.js"
	},
	"/assets/not-found-i5RsCZif.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"76-Trmr7GZIBZuvfg4uM18tBiRtOXg\"",
		"mtime": "2026-11-10T11:32:15.717Z",
		"size": 118,
		"path": "../public/assets/not-found-i5RsCZif.js"
	},
	"/assets/notebook-BO_mV0tZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"763-bo1OGFzZAZgKZTHjtxkQEXP75Sw\"",
		"mtime": "2026-11-10T11:32:15.717Z",
		"size": 1891,
		"path": "../public/assets/notebook-BO_mV0tZ.js"
	},
	"/assets/organisms-YZoVwL1b.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"27f-lkKplmFuNbhhwhf5objPq+TKm7Q\"",
		"mtime": "2026-11-10T11:32:15.717Z",
		"size": 639,
		"path": "../public/assets/organisms-YZoVwL1b.js"
	},
	"/assets/page-DMdea4Vt.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"13f8-wlmdW3PWoJovznpfqwAH05j2pcY\"",
		"mtime": "2026-11-10T11:32:15.717Z",
		"size": 5112,
		"path": "../public/assets/page-DMdea4Vt.js"
	},
	"/assets/pages-D1t6K2o9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5d2-6xHxgyCP1F6dqCl5EUiI6rWNbBA\"",
		"mtime": "2026-11-10T11:32:15.717Z",
		"size": 1490,
		"path": "../public/assets/pages-D1t6K2o9.js"
	},
	"/assets/pages._slug-8M0c68mm.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"241-Mx7853tK2ktFA4iHD1nr+Uee2Bg\"",
		"mtime": "2026-11-10T11:32:15.717Z",
		"size": 577,
		"path": "../public/assets/pages._slug-8M0c68mm.js"
	},
	"/assets/pages._slug-jScFAmrT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2eb-5F4MddoLznSQtT1kMoh9qytdAqU\"",
		"mtime": "2026-11-10T11:32:15.717Z",
		"size": 747,
		"path": "../public/assets/pages._slug-jScFAmrT.js"
	},
	"/assets/photosynthese-BNVofSst.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"252f-Kp65kjuJF9ObVFx3dTSQ31426Bk\"",
		"mtime": "2026-11-10T11:32:15.717Z",
		"size": 9519,
		"path": "../public/assets/photosynthese-BNVofSst.js"
	},
	"/assets/photosynthese-p5dw6BRv.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4f-+yieBDWFhpN1SHhA6x6KVW59Or8\"",
		"mtime": "2026-11-10T11:32:15.717Z",
		"size": 79,
		"path": "../public/assets/photosynthese-p5dw6BRv.js"
	},
	"/assets/photosynthesis-p5dw6BRv.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4f-+yieBDWFhpN1SHhA6x6KVW59Or8\"",
		"mtime": "2026-11-10T11:32:15.718Z",
		"size": 79,
		"path": "../public/assets/photosynthesis-p5dw6BRv.js"
	},
	"/assets/plants-Du-9ttUM.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"27c-EHvuy2lFJwQ44Ld4dYnsPX7Zb9Q\"",
		"mtime": "2026-11-10T11:32:15.718Z",
		"size": 636,
		"path": "../public/assets/plants-Du-9ttUM.js"
	},
	"/assets/policy-DiLPLHOV.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"414-vhj+zbvhuV6xPVQmkCauTiWm3kk\"",
		"mtime": "2026-11-10T11:32:15.718Z",
		"size": 1044,
		"path": "../public/assets/policy-DiLPLHOV.js"
	},
	"/assets/privacy-BRV6nC9q.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"407-97a+YNTLFU9k9ZfR2o7k4OIrOxU\"",
		"mtime": "2026-11-10T11:32:15.718Z",
		"size": 1031,
		"path": "../public/assets/privacy-BRV6nC9q.js"
	},
	"/assets/quizzes-BInP37Ka.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"91f-Y5dEMabwiq1R1Jhjm6II5R1vB0U\"",
		"mtime": "2026-11-10T11:32:15.718Z",
		"size": 2335,
		"path": "../public/assets/quizzes-BInP37Ka.js"
	},
	"/assets/react-3BKWdGy3.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1d67-7y5khacUeAI0naE7zvk9aPM2omk\"",
		"mtime": "2026-11-10T11:32:15.718Z",
		"size": 7527,
		"path": "../public/assets/react-3BKWdGy3.js"
	},
	"/assets/redirect-Dhm19zUi.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1f4-ePZWCXP5uehkmkGMkMl5xDch+/Y\"",
		"mtime": "2026-11-10T11:32:15.718Z",
		"size": 500,
		"path": "../public/assets/redirect-Dhm19zUi.js"
	},
	"/assets/root-DLTE-HSj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"20-vSYConOtSP6ciwr9zKsPixNwWmc\"",
		"mtime": "2026-11-10T11:32:15.718Z",
		"size": 32,
		"path": "../public/assets/root-DLTE-HSj.js"
	},
	"/assets/saved-BMxYBGzg.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"548-l71nAusVQVM9k0GJuvYl9qbydQw\"",
		"mtime": "2026-11-10T11:32:15.718Z",
		"size": 1352,
		"path": "../public/assets/saved-BMxYBGzg.js"
	},
	"/assets/sci-chemistry-DGer7X6m.jpg": {
		"type": "image/jpeg",
		"etag": "\"e531-uGB6rS2e12MOCOGeglkmNegaRSo\"",
		"mtime": "2026-11-10T11:32:15.723Z",
		"size": 58673,
		"path": "../public/assets/sci-chemistry-DGer7X6m.jpg"
	},
	"/assets/sci-earth-G0pK22sY.jpg": {
		"type": "image/jpeg",
		"etag": "\"db7f-wXmT2IjaOS6hzPumkxA6nP8tkNs\"",
		"mtime": "2026-11-10T11:32:15.723Z",
		"size": 56191,
		"path": "../public/assets/sci-earth-G0pK22sY.jpg"
	},
	"/assets/sci-physics-egMuwKm5.jpg": {
		"type": "image/jpeg",
		"etag": "\"8002-mpTyuxFNaEQb/wliH6KcUwSpEdA\"",
		"mtime": "2026-11-10T11:32:15.724Z",
		"size": 32770,
		"path": "../public/assets/sci-physics-egMuwKm5.jpg"
	},
	"/assets/settings-lSRzIonr.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7de-Sgr+/cqLUumSVri3wIdd/lku0NI\"",
		"mtime": "2026-11-10T11:32:15.718Z",
		"size": 2014,
		"path": "../public/assets/settings-lSRzIonr.js"
	},
	"/assets/sci-method-DJPtNKgn.jpg": {
		"type": "image/jpeg",
		"etag": "\"65e5-3SjBWTNfnBOULOyVptfI2A1b/Vc\"",
		"mtime": "2026-11-10T11:32:15.724Z",
		"size": 26085,
		"path": "../public/assets/sci-method-DJPtNKgn.jpg"
	},
	"/assets/signup-2HhaUAXG.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"18b-m/flFK55hOgb6IsoRM9p2DKtLkw\"",
		"mtime": "2026-11-10T11:32:15.718Z",
		"size": 395,
		"path": "../public/assets/signup-2HhaUAXG.js"
	},
	"/assets/soft-os-addition-B5qAOOGl.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"192-h4up1LXfpTLTh+3nWOs+rqISz00\"",
		"mtime": "2026-11-10T11:32:15.718Z",
		"size": 402,
		"path": "../public/assets/soft-os-addition-B5qAOOGl.js"
	},
	"/assets/species-scan-BnOZUnsh.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"18d-P04nS7pSa0+wm0vho8dg3qnlE3Q\"",
		"mtime": "2026-11-10T11:32:15.718Z",
		"size": 397,
		"path": "../public/assets/species-scan-BnOZUnsh.js"
	},
	"/assets/styles-CSPOQGpI.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"1ea87-lf84BK11CPno2hLfQkANtOl/U3w\"",
		"mtime": "2026-11-10T11:32:15.724Z",
		"size": 125575,
		"path": "../public/assets/styles-CSPOQGpI.css"
	},
	"/assets/tech-ai-N3_TfYIB.jpg": {
		"type": "image/jpeg",
		"etag": "\"f480-XFMqfN4HU/xKZCm+qV91Y8qyT6s\"",
		"mtime": "2026-11-10T11:32:15.724Z",
		"size": 62592,
		"path": "../public/assets/tech-ai-N3_TfYIB.jpg"
	},
	"/assets/tech-computing-BxqdUC2U.jpg": {
		"type": "image/jpeg",
		"etag": "\"19004-Vbz9mxUEKBzQVVPKauFw6hj+b+c\"",
		"mtime": "2026-11-10T11:32:15.724Z",
		"size": 102404,
		"path": "../public/assets/tech-computing-BxqdUC2U.jpg"
	},
	"/assets/tech-computing-CtHh0Hcn.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3b-rTsmoL0P1YPRMfLKNXGnFHutF0Y\"",
		"mtime": "2026-11-10T11:32:15.718Z",
		"size": 59,
		"path": "../public/assets/tech-computing-CtHh0Hcn.js"
	},
	"/assets/tech-programming-Cf7Rx_zT.jpg": {
		"type": "image/jpeg",
		"etag": "\"10fd9-Zmup00l2jDFH6bYOkb55tsdWm4A\"",
		"mtime": "2026-11-10T11:32:15.724Z",
		"size": 69593,
		"path": "../public/assets/tech-programming-Cf7Rx_zT.jpg"
	},
	"/assets/tech-security-DpkuyTLX.jpg": {
		"type": "image/jpeg",
		"etag": "\"1198b-ZlcjLSmzw82L+/mv+fDruoW5SQM\"",
		"mtime": "2026-11-10T11:32:15.724Z",
		"size": 72075,
		"path": "../public/assets/tech-security-DpkuyTLX.jpg"
	},
	"/assets/timeline-B_wyo1r0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3a2-z46l4APQyw8JCL4Ubj31356eng0\"",
		"mtime": "2026-11-10T11:32:15.719Z",
		"size": 930,
		"path": "../public/assets/timeline-B_wyo1r0.js"
	},
	"/assets/translate-yBMaM36X.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"111d-e9nYUn4c7EwbnvNZ+6Sg1MLF2AY\"",
		"mtime": "2026-11-10T11:32:15.719Z",
		"size": 4381,
		"path": "../public/assets/translate-yBMaM36X.js"
	},
	"/assets/tutorials-CmHPrmCC.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"abf-0PTlpqRon1ohZWnq3Cmj34RJ5SM\"",
		"mtime": "2026-11-10T11:32:15.719Z",
		"size": 2751,
		"path": "../public/assets/tutorials-CmHPrmCC.js"
	},
	"/assets/tutorials._slug-DZOWmOdC.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"aaa-nKs61ggxr8cDCkfHmSqVrLvEVzs\"",
		"mtime": "2026-11-10T11:32:15.719Z",
		"size": 2730,
		"path": "../public/assets/tutorials._slug-DZOWmOdC.js"
	},
	"/assets/underline-BdeKrIeT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2b2-JJZS7NaNnKOZdl94ZnFllRZTMhY\"",
		"mtime": "2026-11-10T11:32:15.719Z",
		"size": 690,
		"path": "../public/assets/underline-BdeKrIeT.js"
	},
	"/assets/routes-YArY1TXY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3f8e-Lbh2oSGiJtEEERfaroM112ChGnk\"",
		"mtime": "2026-11-10T11:32:15.718Z",
		"size": 16270,
		"path": "../public/assets/routes-YArY1TXY.js"
	},
	"/assets/use-auth-Cku7PGoB.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"386-913pD9RY0lwQzvbeGEgZbUi9whI\"",
		"mtime": "2026-11-10T11:32:15.719Z",
		"size": 902,
		"path": "../public/assets/use-auth-Cku7PGoB.js"
	},
	"/assets/videos-BjG0TA9x.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"574-iE0BuvWhBSGp+U1wmU1tyUxP910\"",
		"mtime": "2026-11-10T11:32:15.719Z",
		"size": 1396,
		"path": "../public/assets/videos-BjG0TA9x.js"
	},
	"/assets/videos._slug-D1JHGJfR.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"645-saBt5ciswJK9coUqvGEQI8ls9cU\"",
		"mtime": "2026-11-10T11:32:15.719Z",
		"size": 1605,
		"path": "../public/assets/videos._slug-D1JHGJfR.js"
	},
	"/assets/update-soft-DDSXGnJc.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"191-OtHiTPoEzK84qei0jEiaCTUORKA\"",
		"mtime": "2026-11-10T11:32:15.719Z",
		"size": 401,
		"path": "../public/assets/update-soft-DDSXGnJc.js"
	},
	"/assets/wifi-DFEI86NU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"422-avpG7kI3wzBCbqV3GvVIT0e3lMY\"",
		"mtime": "2026-11-10T11:32:15.719Z",
		"size": 1058,
		"path": "../public/assets/wifi-DFEI86NU.js"
	},
	"/download logo/tedslab-download.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"186-lFbVj+z0p+x0csdNfeWXqB+VpkI\"",
		"mtime": "2026-11-10T11:32:18.727Z",
		"size": 390,
		"path": "../public/download logo/tedslab-download.txt"
	},
	"/download logo/tedslab.png": {
		"type": "image/png",
		"etag": "\"11ba99-an7wcjiulP40vrDMKyC07RnqWvo\"",
		"mtime": "2026-11-10T11:32:18.728Z",
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
