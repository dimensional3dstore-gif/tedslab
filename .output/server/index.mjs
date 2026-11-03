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
		"mtime": "2026-11-03T08:59:29.157Z",
		"size": 3708,
		"path": "../public/favicon.png"
	},
	"/logo.png": {
		"type": "image/png",
		"etag": "\"71d5-iC+KKvoAskwLdT7EV0YCsHQFXYw\"",
		"mtime": "2026-11-03T08:59:29.157Z",
		"size": 29141,
		"path": "../public/logo.png"
	},
	"/robots.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"ec-3buti6v9Xr+gI3SlCHLfqVwS0tE\"",
		"mtime": "2026-11-03T08:59:29.160Z",
		"size": 236,
		"path": "../public/robots.txt"
	},
	"/assets/AdminPage-CzlD4gTB.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ad9-OGyGZSe8VeAPdJERzeiw8nqgsVk\"",
		"mtime": "2026-11-03T08:59:26.766Z",
		"size": 2777,
		"path": "../public/assets/AdminPage-CzlD4gTB.js"
	},
	"/assets/ArticleCard-DofxZf-X.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"bc3-UVJ7TMv4nyvhpXX2qm3MKQgK16o\"",
		"mtime": "2026-11-03T08:59:26.767Z",
		"size": 3011,
		"path": "../public/assets/ArticleCard-DofxZf-X.js"
	},
	"/assets/ArticleTemplate-BBtcMZBt.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1e79-bcG2QdaSYShA/gA7n1auzknGA3M\"",
		"mtime": "2026-11-03T08:59:26.767Z",
		"size": 7801,
		"path": "../public/assets/ArticleTemplate-BBtcMZBt.js"
	},
	"/assets/AuthForm-CWf_wXSP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"120a-nvzXO1nNpvw2LwYGVg3/8PgbuGo\"",
		"mtime": "2026-11-03T08:59:26.767Z",
		"size": 4618,
		"path": "../public/assets/AuthForm-CWf_wXSP.js"
	},
	"/assets/PlatformPlaceholderPage-BQfxe80C.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"862-Ez2MNZQ8fnuz+oClQI9Ouk5zgGo\"",
		"mtime": "2026-11-03T08:59:26.767Z",
		"size": 2146,
		"path": "../public/assets/PlatformPlaceholderPage-BQfxe80C.js"
	},
	"/assets/TopicGrid-ma-o3FPH.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d27-TWNNpAvv6OBKFpfLr1jtZtE2ayg\"",
		"mtime": "2026-11-03T08:59:26.767Z",
		"size": 3367,
		"path": "../public/assets/TopicGrid-ma-o3FPH.js"
	},
	"/assets/_section._topic-DaplAWQM.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9a3-rQmBoR1K1h4d9eDXOTKU8IZK1/k\"",
		"mtime": "2026-11-03T08:59:26.767Z",
		"size": 2467,
		"path": "../public/assets/_section._topic-DaplAWQM.js"
	},
	"/assets/_subject-CBEpbKXh.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4c4-38iHfDcdOIupa+aah2MvFOHjRb0\"",
		"mtime": "2026-11-03T08:59:26.767Z",
		"size": 1220,
		"path": "../public/assets/_subject-CBEpbKXh.js"
	},
	"/assets/_subject._section-BaRZjunX.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8a1-z1qSodVTC6rwqMw9PoKFWmmJbRg\"",
		"mtime": "2026-11-03T08:59:26.767Z",
		"size": 2209,
		"path": "../public/assets/_subject._section-BaRZjunX.js"
	},
	"/assets/add-app-DIhnIBBq.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a3-NMZf5UCdbR6a5VOEWrJtr/YuegU\"",
		"mtime": "2026-11-03T08:59:26.767Z",
		"size": 419,
		"path": "../public/assets/add-app-DIhnIBBq.js"
	},
	"/assets/admin-DvNY6zFL.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3a38-NinCPJybjO/AXbeu2ue3JCzlKHI\"",
		"mtime": "2026-11-03T08:59:26.767Z",
		"size": 14904,
		"path": "../public/assets/admin-DvNY6zFL.js"
	},
	"/assets/admin.articles-B2D7TrBo.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"447-+Eup02ryayTj0JoIXl1qTWr+Y18\"",
		"mtime": "2026-11-03T08:59:26.767Z",
		"size": 1095,
		"path": "../public/assets/admin.articles-B2D7TrBo.js"
	},
	"/assets/admin.articles.new-VTb0gqvH.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"12a2-t9hSb1nhj343CSGxhyRMVfPjLjA\"",
		"mtime": "2026-11-03T08:59:26.767Z",
		"size": 4770,
		"path": "../public/assets/admin.articles.new-VTb0gqvH.js"
	},
	"/assets/admin.pages-Qd3ynH_s.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a6-Ny6+iwYFtY8Eji19rxiRsspJ7KM\"",
		"mtime": "2026-11-03T08:59:26.767Z",
		"size": 422,
		"path": "../public/assets/admin.pages-Qd3ynH_s.js"
	},
	"/assets/admin.pages-list-E5EOXqIx.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"16e-TJIlZ/NfHQaj4O6LEzJpdh1zDK4\"",
		"mtime": "2026-11-03T08:59:26.767Z",
		"size": 366,
		"path": "../public/assets/admin.pages-list-E5EOXqIx.js"
	},
	"/assets/admin.sections-DhLxr3_p.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"187-K360VzxnlWtLuR32nm4lKNWb1T8\"",
		"mtime": "2026-11-03T08:59:26.768Z",
		"size": 391,
		"path": "../public/assets/admin.sections-DhLxr3_p.js"
	},
	"/assets/admin.topics-BI-VMWbd.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"18b-9umlvf70CgF1r82b7gMc33JYqAQ\"",
		"mtime": "2026-11-03T08:59:26.768Z",
		"size": 395,
		"path": "../public/assets/admin.topics-BI-VMWbd.js"
	},
	"/assets/anatomy-DqqlbuZR.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"27d-mjtAVVbu8mmYOPcxweD6NHp6X/g\"",
		"mtime": "2026-11-03T08:59:26.768Z",
		"size": 637,
		"path": "../public/assets/anatomy-DqqlbuZR.js"
	},
	"/assets/annotation-sys-BTSmV29G.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"184-siVpGSZPFLqHSYbBb/iRCpKsNhk\"",
		"mtime": "2026-11-03T08:59:26.768Z",
		"size": 388,
		"path": "../public/assets/annotation-sys-BTSmV29G.js"
	},
	"/assets/ai-Xht39VX0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4012-ZHyvSmK/WP2egw7DSFVgv46vols\"",
		"mtime": "2026-11-03T08:59:26.768Z",
		"size": 16402,
		"path": "../public/assets/ai-Xht39VX0.js"
	},
	"/assets/_subject._section._topic-5U-n6OaG.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9b8-NPsEVH3QE0hWsBbq8FB92tvtXQM\"",
		"mtime": "2026-11-03T08:59:26.767Z",
		"size": 2488,
		"path": "../public/assets/_subject._section._topic-5U-n6OaG.js"
	},
	"/assets/AppShell-CoccfOZb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"98fad-SkpyA/lzHYTtV3Tbo2vSx1A6MJY\"",
		"mtime": "2026-11-03T08:59:26.766Z",
		"size": 626605,
		"path": "../public/assets/AppShell-CoccfOZb.js"
	},
	"/assets/articles-CAFj1BOp.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"434-1/pjocUn7md0IP3EZWnz/NpetoM\"",
		"mtime": "2026-11-03T08:59:26.768Z",
		"size": 1076,
		"path": "../public/assets/articles-CAFj1BOp.js"
	},
	"/assets/articles-debug-zIwlBP9i.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"12f0-1P0UjEhkylacEdZPgkn3K0plCMc\"",
		"mtime": "2026-11-03T08:59:26.768Z",
		"size": 4848,
		"path": "../public/assets/articles-debug-zIwlBP9i.js"
	},
	"/assets/articles._slug-B7hpotIP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"248-kYWRX2TWR6C5T2vvZfjc5bUfOTE\"",
		"mtime": "2026-11-03T08:59:26.768Z",
		"size": 584,
		"path": "../public/assets/articles._slug-B7hpotIP.js"
	},
	"/assets/articles.cellular-respiration-Ce-JNQRg.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1fe1-j9OAL8KmNHq0AnbmsB8FGXP+iAo\"",
		"mtime": "2026-11-03T08:59:26.768Z",
		"size": 8161,
		"path": "../public/assets/articles.cellular-respiration-Ce-JNQRg.js"
	},
	"/assets/articles.enzyme-catalysis-CgVQeD-G.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e7f-ryVh+ycqSEgxlQj3t+SV5eGDJeA\"",
		"mtime": "2026-11-03T08:59:26.768Z",
		"size": 3711,
		"path": "../public/assets/articles.enzyme-catalysis-CgVQeD-G.js"
	},
	"/assets/articles.evolution-natural-selection-DRTK-_KV.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ede-FV7KbdHGHL3gQ0EkdFuzS/R3ptU\"",
		"mtime": "2026-11-03T08:59:26.768Z",
		"size": 3806,
		"path": "../public/assets/articles.evolution-natural-selection-DRTK-_KV.js"
	},
	"/assets/articles.food-chains-energy-flow--b8Ukjup.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e99-s6MtQGUdeRAMDhSSPzL0SUTgZ8Y\"",
		"mtime": "2026-11-03T08:59:26.768Z",
		"size": 3737,
		"path": "../public/assets/articles.food-chains-energy-flow--b8Ukjup.js"
	},
	"/assets/articles.human-anatomy-systems-CcgLiQ-d.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e86-Rx3pa5CGOWjLcosy0G26t2kjIG4\"",
		"mtime": "2026-11-03T08:59:26.768Z",
		"size": 3718,
		"path": "../public/assets/articles.human-anatomy-systems-CcgLiQ-d.js"
	},
	"/assets/articles.meiosis-gamete-formation-BZ0NE93B.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e92-gnL8S+O1Sodyq2c8+7ngj/GhiUo\"",
		"mtime": "2026-11-03T08:59:26.768Z",
		"size": 3730,
		"path": "../public/assets/articles.meiosis-gamete-formation-BZ0NE93B.js"
	},
	"/assets/articles.mitosis-cell-division-RlY3CKcd.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ecb-pL87mv3CfPAF7vVbNPk7NkZOlDo\"",
		"mtime": "2026-11-03T08:59:26.768Z",
		"size": 3787,
		"path": "../public/assets/articles.mitosis-cell-division-RlY3CKcd.js"
	},
	"/assets/articles.photosynthesis-light-reactions-KJEiY0nN.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"eaa-Z4sxNq4+2gdMdRMe0lSxclyWwQI\"",
		"mtime": "2026-11-03T08:59:26.768Z",
		"size": 3754,
		"path": "../public/assets/articles.photosynthesis-light-reactions-KJEiY0nN.js"
	},
	"/assets/auth-Cp2F0MsL.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"182-tSk8+EoB6hGQ9vRIQO3z6fdiEIE\"",
		"mtime": "2026-11-03T08:59:26.768Z",
		"size": 386,
		"path": "../public/assets/auth-Cp2F0MsL.js"
	},
	"/assets/auth-w2BNGNBv.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6b09-Uq5gr3xZFyLseqlHgf1Y6zIVbLg\"",
		"mtime": "2026-11-03T08:59:26.768Z",
		"size": 27401,
		"path": "../public/assets/auth-w2BNGNBv.js"
	},
	"/assets/biological-processes-CEdYk2ME.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"28a-o5TDuiNJI1YCx1qyiK+C5XIumto\"",
		"mtime": "2026-11-03T08:59:26.769Z",
		"size": 650,
		"path": "../public/assets/biological-processes-CEdYk2ME.js"
	},
	"/assets/biopedia-data-DJbT4MOb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4c9-y0AzIPFEOC8TKUKvFonQwHo3RbA\"",
		"mtime": "2026-11-03T08:59:26.769Z",
		"size": 1225,
		"path": "../public/assets/biopedia-data-DJbT4MOb.js"
	},
	"/assets/biotechnology-BPTCXo2d.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"283-U2V8+uT88PCAjid5OdRh20HLEBE\"",
		"mtime": "2026-11-03T08:59:26.769Z",
		"size": 643,
		"path": "../public/assets/biotechnology-BPTCXo2d.js"
	},
	"/assets/button-Be0gWg6o.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"79f-AObJ1SpnH2MEOQwwQYxd0B+6OEM\"",
		"mtime": "2026-11-03T08:59:26.769Z",
		"size": 1951,
		"path": "../public/assets/button-Be0gWg6o.js"
	},
	"/assets/cat-ecology-DbnEUXHR.jpg": {
		"type": "image/jpeg",
		"etag": "\"2da9e-OCrQ+5HxBL/MeFpjI2Ml9mEB6CQ\"",
		"mtime": "2026-11-03T08:59:26.776Z",
		"size": 187038,
		"path": "../public/assets/cat-ecology-DbnEUXHR.jpg"
	},
	"/assets/cat-evolution-CC_w4loO.jpg": {
		"type": "image/jpeg",
		"etag": "\"2fdbd-seNsXnl4XHNUY71qgNreqGrRZEg\"",
		"mtime": "2026-11-03T08:59:26.776Z",
		"size": 196029,
		"path": "../public/assets/cat-evolution-CC_w4loO.jpg"
	},
	"/assets/cat-genetics-C6CBosmo.jpg": {
		"type": "image/jpeg",
		"etag": "\"281ff-qhaiIvZ8BDqFMGgfDXNC3bv5mFo\"",
		"mtime": "2026-11-03T08:59:26.776Z",
		"size": 164351,
		"path": "../public/assets/cat-genetics-C6CBosmo.jpg"
	},
	"/assets/cat-human-BuRMR2jH.jpg": {
		"type": "image/jpeg",
		"etag": "\"23326-4wTTr4zzrFQf89XTkJyXsX8rXHg\"",
		"mtime": "2026-11-03T08:59:26.776Z",
		"size": 144166,
		"path": "../public/assets/cat-human-BuRMR2jH.jpg"
	},
	"/assets/cat-organisms-yXH6lJcJ.jpg": {
		"type": "image/jpeg",
		"etag": "\"2acbe-1G/hL2bGRo8MkA9mSKQX6eYai7o\"",
		"mtime": "2026-11-03T08:59:26.777Z",
		"size": 175294,
		"path": "../public/assets/cat-organisms-yXH6lJcJ.jpg"
	},
	"/assets/cat-plants-Bu_hoilj.jpg": {
		"type": "image/jpeg",
		"etag": "\"3af5b-WyZ9BT5qxBZaWxxjuNNVL7/2IO0\"",
		"mtime": "2026-11-03T08:59:26.777Z",
		"size": 241499,
		"path": "../public/assets/cat-plants-Bu_hoilj.jpg"
	},
	"/assets/catalog-BFqRb66N.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1388c-/nKYY74FNFK3/msZaGByh5HXyRY\"",
		"mtime": "2026-11-03T08:59:26.769Z",
		"size": 80012,
		"path": "../public/assets/catalog-BFqRb66N.js"
	},
	"/assets/categories-B6KM_d_i.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3e2-YwLRYELoct8G5lKDfGSRnT8JSSc\"",
		"mtime": "2026-11-03T08:59:26.769Z",
		"size": 994,
		"path": "../public/assets/categories-B6KM_d_i.js"
	},
	"/assets/cells-microscopy-BmTD5xis.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"286-aCvCJHVg0lPq2nm3X+lC/+HQ1qQ\"",
		"mtime": "2026-11-03T08:59:26.769Z",
		"size": 646,
		"path": "../public/assets/cells-microscopy-BmTD5xis.js"
	},
	"/assets/chronos-os-DV2GWAtL.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"de8-BCY9FdmeoR8JrqWLEhXcnpB3vi4\"",
		"mtime": "2026-11-03T08:59:26.769Z",
		"size": 3560,
		"path": "../public/assets/chronos-os-DV2GWAtL.js"
	},
	"/assets/communicational-system-BZPfYYgl.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a2-ak2TuUl0m4A1aH0leJPvVIZz538\"",
		"mtime": "2026-11-03T08:59:26.769Z",
		"size": 418,
		"path": "../public/assets/communicational-system-BZPfYYgl.js"
	},
	"/assets/createLucideIcon-JuoJIUQ-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4ce-tpxp/7wFcBQQFxNRCh7N1TO9Bb8\"",
		"mtime": "2026-11-03T08:59:26.769Z",
		"size": 1230,
		"path": "../public/assets/createLucideIcon-JuoJIUQ-.js"
	},
	"/assets/custom-lists-DGla8hnr.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b42-9544li48stlXZ5D0DoruAdqHRCA\"",
		"mtime": "2026-11-03T08:59:26.769Z",
		"size": 2882,
		"path": "../public/assets/custom-lists-DGla8hnr.js"
	},
	"/assets/dashboard-DiDtnvc4.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"506-G8wAZPzrXWXE0/PwCxh6z1V6lUQ\"",
		"mtime": "2026-11-03T08:59:26.769Z",
		"size": 1286,
		"path": "../public/assets/dashboard-DiDtnvc4.js"
	},
	"/assets/decipher-DfPuXE6H.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"16f-hJDAaPdpibnnRf6szLgmLXBPePE\"",
		"mtime": "2026-11-03T08:59:26.769Z",
		"size": 367,
		"path": "../public/assets/decipher-DfPuXE6H.js"
	},
	"/assets/dev-dashboard-B4bosFdq.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"10e0-5eA7k62G4LWqo6vMH+bdsUEVAtM\"",
		"mtime": "2026-11-03T08:59:26.769Z",
		"size": 4320,
		"path": "../public/assets/dev-dashboard-B4bosFdq.js"
	},
	"/assets/dev-tools-Sp4b12mD.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"13a7-buhTJ8DL6bhJ8B/VRiLMyBjXfiQ\"",
		"mtime": "2026-11-03T08:59:26.769Z",
		"size": 5031,
		"path": "../public/assets/dev-tools-Sp4b12mD.js"
	},
	"/assets/discovery-leaf-B4lyAWC2.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3b-my347b2NUKvD+XRT+D6BbNxbmjg\"",
		"mtime": "2026-11-03T08:59:26.770Z",
		"size": 59,
		"path": "../public/assets/discovery-leaf-B4lyAWC2.js"
	},
	"/assets/dist-Cq2m6oEo.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b58-XdBtBB9sJADTWO52F4SvjSXw/FE\"",
		"mtime": "2026-11-03T08:59:26.770Z",
		"size": 2904,
		"path": "../public/assets/dist-Cq2m6oEo.js"
	},
	"/assets/dist-D3WHiKOD2.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2da-En0frj9EWI218DTV6qQLTLX4vLg\"",
		"mtime": "2026-11-03T08:59:26.770Z",
		"size": 730,
		"path": "../public/assets/dist-D3WHiKOD2.js"
	},
	"/assets/download-DLAp2Lu1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"105b-WJrc2UoIf913whv+TOZ4hkVWZ7g\"",
		"mtime": "2026-11-03T08:59:26.770Z",
		"size": 4187,
		"path": "../public/assets/download-DLAp2Lu1.js"
	},
	"/assets/downloadable-software-vt_xpwD0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"679-06Pp5TNqTLj5lUumUg0iC0IOnb4\"",
		"mtime": "2026-11-03T08:59:26.770Z",
		"size": 1657,
		"path": "../public/assets/downloadable-software-vt_xpwD0.js"
	},
	"/assets/ecology-environment-45KKKYZX.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"289-i97mhwu3NsP5iUZ4vQsDmtq0Ebk\"",
		"mtime": "2026-11-03T08:59:26.771Z",
		"size": 649,
		"path": "../public/assets/ecology-environment-45KKKYZX.js"
	},
	"/assets/eng-grammar-B1tMmnMx.jpg": {
		"type": "image/jpeg",
		"etag": "\"74c1-XK8BNB8ZAYcd/TE7F0EdV/8Ul8I\"",
		"mtime": "2026-11-03T08:59:26.777Z",
		"size": 29889,
		"path": "../public/assets/eng-grammar-B1tMmnMx.jpg"
	},
	"/assets/eng-literature-BajHjXyN.jpg": {
		"type": "image/jpeg",
		"etag": "\"cc62-NF9kB2OyFm1zMZ+Oih1ZHorruYg\"",
		"mtime": "2026-11-03T08:59:26.778Z",
		"size": 52322,
		"path": "../public/assets/eng-literature-BajHjXyN.jpg"
	},
	"/assets/eng-poetry-BQYnMCQa.jpg": {
		"type": "image/jpeg",
		"etag": "\"10239-W3/DnYSqaKLw+1EOhXvOc98a4PU\"",
		"mtime": "2026-11-03T08:59:26.778Z",
		"size": 66105,
		"path": "../public/assets/eng-poetry-BQYnMCQa.jpg"
	},
	"/assets/eng-writing-DkEjUsar.jpg": {
		"type": "image/jpeg",
		"etag": "\"9cc3-ee85EOsBs2794hyQ7ENTiSRcMx8\"",
		"mtime": "2026-11-03T08:59:26.778Z",
		"size": 40131,
		"path": "../public/assets/eng-writing-DkEjUsar.jpg"
	},
	"/assets/extension-tools-upload-CD6-W02I.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"19b-FqbLYg335daK55U6xCO0wQcscNI\"",
		"mtime": "2026-11-03T08:59:26.771Z",
		"size": 411,
		"path": "../public/assets/extension-tools-upload-CD6-W02I.js"
	},
	"/assets/extensions-Bc1ftCi0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"46-UVuzcE35q0FszMJ/u0Ys5qegY40\"",
		"mtime": "2026-11-03T08:59:26.771Z",
		"size": 70,
		"path": "../public/assets/extensions-Bc1ftCi0.js"
	},
	"/assets/evolution-BLTH6GGL.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"27f-ZD3wVaULIGT1PYlT4q4JvK6Xnuk\"",
		"mtime": "2026-11-03T08:59:26.771Z",
		"size": 639,
		"path": "../public/assets/evolution-BLTH6GGL.js"
	},
	"/assets/extensions.noter-DBez24rf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"46-NZ/Idincmf3hxDKKWDUi3d3M00Y\"",
		"mtime": "2026-11-03T08:59:26.771Z",
		"size": 70,
		"path": "../public/assets/extensions.noter-DBez24rf.js"
	},
	"/assets/docs-CVoiV4Tk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8576f-+czJXxywk2tHcp6/dgOW2C1hqYE\"",
		"mtime": "2026-11-03T08:59:26.770Z",
		"size": 546671,
		"path": "../public/assets/docs-CVoiV4Tk.js"
	},
	"/assets/discovery-leaf-CDLQK6NX.jpg": {
		"type": "image/jpeg",
		"etag": "\"292a2-sl75CS6OW2pQPTWnj52a0F63jwo\"",
		"mtime": "2026-11-03T08:59:26.777Z",
		"size": 168610,
		"path": "../public/assets/discovery-leaf-CDLQK6NX.jpg"
	},
	"/assets/genetics-dna-0wo1Jjem.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"282-UY4ckjln71nIKMoBV2UJsl8qeN4\"",
		"mtime": "2026-11-03T08:59:26.771Z",
		"size": 642,
		"path": "../public/assets/genetics-dna-0wo1Jjem.js"
	},
	"/assets/flashcards-Coxg436Z.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"44f-CN0eWF1tH55ARIfFrTbAmqJLT8E\"",
		"mtime": "2026-11-03T08:59:26.771Z",
		"size": 1103,
		"path": "../public/assets/flashcards-Coxg436Z.js"
	},
	"/assets/glossary-DgAU2y5G.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"36b-A/xuCFqbntMEC722zD64WPGbxd0\"",
		"mtime": "2026-11-03T08:59:26.771Z",
		"size": 875,
		"path": "../public/assets/glossary-DgAU2y5G.js"
	},
	"/assets/graphication-oDqRrjUp.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"179-KBrkr27MISoC0FwtgMwhzmdZSPI\"",
		"mtime": "2026-11-03T08:59:26.771Z",
		"size": 377,
		"path": "../public/assets/graphication-oDqRrjUp.js"
	},
	"/assets/help-center-HTRc9I8T.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"14c1-aYPLeJGk+y/1r0WwaG6+WH5Zc+0\"",
		"mtime": "2026-11-03T08:59:26.771Z",
		"size": 5313,
		"path": "../public/assets/help-center-HTRc9I8T.js"
	},
	"/assets/hero-cell-BewOnWpW.jpg": {
		"type": "image/jpeg",
		"etag": "\"40c11-gRZUnBDNdykEsTfNLMgxrZ+4OcU\"",
		"mtime": "2026-11-03T08:59:26.778Z",
		"size": 265233,
		"path": "../public/assets/hero-cell-BewOnWpW.jpg"
	},
	"/assets/his-ancient-D_3kmTQu.jpg": {
		"type": "image/jpeg",
		"etag": "\"124b1-VN0HL9ZUiqcfpgKsq+4JPZ2wA70\"",
		"mtime": "2026-11-03T08:59:26.778Z",
		"size": 74929,
		"path": "../public/assets/his-ancient-D_3kmTQu.jpg"
	},
	"/assets/his-medieval-Z1UQ46lz.jpg": {
		"type": "image/jpeg",
		"etag": "\"94dd-hwSoe+zL6tyOotdQvEYv56k0YhM\"",
		"mtime": "2026-11-03T08:59:26.778Z",
		"size": 38109,
		"path": "../public/assets/his-medieval-Z1UQ46lz.jpg"
	},
	"/assets/his-revolutions-BKB1brIf.jpg": {
		"type": "image/jpeg",
		"etag": "\"f396-a6hL0Vst70K1o9x2ypegAAHcKWs\"",
		"mtime": "2026-11-03T08:59:26.779Z",
		"size": 62358,
		"path": "../public/assets/his-revolutions-BKB1brIf.jpg"
	},
	"/assets/his-wars-Dja4_BlN.jpg": {
		"type": "image/jpeg",
		"etag": "\"e5ca-2jcnizpZCZIyPz3NRRyhh6p2aUw\"",
		"mtime": "2026-11-03T08:59:26.779Z",
		"size": 58826,
		"path": "../public/assets/his-wars-Dja4_BlN.jpg"
	},
	"/assets/human-biology-D-84iw5X.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"283-U/rUxbYAVba66Oi4gU/BuygzpD0\"",
		"mtime": "2026-11-03T08:59:26.771Z",
		"size": 643,
		"path": "../public/assets/human-biology-D-84iw5X.js"
	},
	"/assets/ide-system-eJaA-Yda.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a1-4mxq+0hRFSzxbSvW23KSXRWUQDo\"",
		"mtime": "2026-11-03T08:59:26.771Z",
		"size": 417,
		"path": "../public/assets/ide-system-eJaA-Yda.js"
	},
	"/assets/images-xGwTEqeS.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6c7-Pk/YMa5itOlpzK6ZTBCO7vItja8\"",
		"mtime": "2026-11-03T08:59:26.771Z",
		"size": 1735,
		"path": "../public/assets/images-xGwTEqeS.js"
	},
	"/assets/index-omLtpVEn.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"600af-YQSKWLJPbsvvweiLcagvYXTqzyo\"",
		"mtime": "2026-11-03T08:59:26.765Z",
		"size": 393391,
		"path": "../public/assets/index-omLtpVEn.js"
	},
	"/assets/information-use-BhkAj_qN.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"413-u2na4b5vQl9KV504v1ymEiqjWXQ\"",
		"mtime": "2026-11-03T08:59:26.771Z",
		"size": 1043,
		"path": "../public/assets/information-use-BhkAj_qN.js"
	},
	"/assets/input-DKsO0Upl.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"283-09KTFpqzw1laSy0r/KHCq26ggXU\"",
		"mtime": "2026-11-03T08:59:26.771Z",
		"size": 643,
		"path": "../public/assets/input-DKsO0Upl.js"
	},
	"/assets/jsx-runtime-Cx0BB4qO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"440-7GwVHNgO4EUMk3cR4Bh6KGJPPX4\"",
		"mtime": "2026-11-03T08:59:26.772Z",
		"size": 1088,
		"path": "../public/assets/jsx-runtime-Cx0BB4qO.js"
	},
	"/assets/label-IUt44KSa.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2e6-MddAMi5zKwcqQ3LOSDZ/RkhK2ig\"",
		"mtime": "2026-11-03T08:59:26.773Z",
		"size": 742,
		"path": "../public/assets/label-IUt44KSa.js"
	},
	"/assets/languages-C_t30eTi.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1f3-FiwLFR33NX1kkURczby1sSonapQ\"",
		"mtime": "2026-11-03T08:59:26.773Z",
		"size": 499,
		"path": "../public/assets/languages-C_t30eTi.js"
	},
	"/assets/layout-BCkFgH_l.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f2-vu0Wt+diTsG2pWMSdT9fCVUPZEY\"",
		"mtime": "2026-11-03T08:59:26.773Z",
		"size": 242,
		"path": "../public/assets/layout-BCkFgH_l.js"
	},
	"/assets/link-rIiCKqw9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"68f4-ZYKsQZ+TV/tZPbaWWWTi5guxZj8\"",
		"mtime": "2026-11-03T08:59:26.773Z",
		"size": 26868,
		"path": "../public/assets/link-rIiCKqw9.js"
	},
	"/assets/llm-D7KnASpD.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2eb5-tPG728oc0bReHqns0wrD88C3Wlo\"",
		"mtime": "2026-11-03T08:59:26.773Z",
		"size": 11957,
		"path": "../public/assets/llm-D7KnASpD.js"
	},
	"/assets/knowledge-atlas-CgGdrUH1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c98bd-J8Z5vcw8KsCUDJg443VzDwZX8ZY\"",
		"mtime": "2026-11-03T08:59:26.772Z",
		"size": 825533,
		"path": "../public/assets/knowledge-atlas-CgGdrUH1.js"
	},
	"/assets/logo-tedslab-CSGR30te.png": {
		"type": "image/png",
		"etag": "\"7caa0-7zdWgbobOh6pFHVZufJZw3PL3lM\"",
		"mtime": "2026-11-03T08:59:26.779Z",
		"size": 510624,
		"path": "../public/assets/logo-tedslab-CSGR30te.png"
	},
	"/assets/lost-atlas-D4PHLmWF.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"15e4-vqV/9bMr3drm0HKQU89heiVh8Fs\"",
		"mtime": "2026-11-03T08:59:26.773Z",
		"size": 5604,
		"path": "../public/assets/lost-atlas-D4PHLmWF.js"
	},
	"/assets/lost-atlas._slug-CLnXQ03j.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"165b-vA0lBKf6Y5ZpZ8xkQ5KSDiFFZTU\"",
		"mtime": "2026-11-03T08:59:26.773Z",
		"size": 5723,
		"path": "../public/assets/lost-atlas._slug-CLnXQ03j.js"
	},
	"/assets/maps-CCDk1s0n.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"16e-BPni7hbJdTUB7GWu9RqNieYiuC4\"",
		"mtime": "2026-11-03T08:59:26.773Z",
		"size": 366,
		"path": "../public/assets/maps-CCDk1s0n.js"
	},
	"/assets/math-algebra-Bht1HCz8.jpg": {
		"type": "image/jpeg",
		"etag": "\"2d35a-PvVYI2LrpcoD2wanQQ7xOYpbYIE\"",
		"mtime": "2026-11-03T08:59:26.779Z",
		"size": 185178,
		"path": "../public/assets/math-algebra-Bht1HCz8.jpg"
	},
	"/assets/math-calculus-B1M0mWMY.jpg": {
		"type": "image/jpeg",
		"etag": "\"5b9d-bVTaXEAGiT9VR5oaj+FZmqSlB0U\"",
		"mtime": "2026-11-03T08:59:26.780Z",
		"size": 23453,
		"path": "../public/assets/math-calculus-B1M0mWMY.jpg"
	},
	"/assets/math-geometry-SGeNwC3o.jpg": {
		"type": "image/jpeg",
		"etag": "\"2ba46-mIRTtF52sxAW70KWKjzJOualsJs\"",
		"mtime": "2026-11-03T08:59:26.780Z",
		"size": 178758,
		"path": "../public/assets/math-geometry-SGeNwC3o.jpg"
	},
	"/assets/math-statistics-BlqoBDEB.jpg": {
		"type": "image/jpeg",
		"etag": "\"9615-x8xInAeJEUklmLWM3NTCzpQDzVI\"",
		"mtime": "2026-11-03T08:59:26.780Z",
		"size": 38421,
		"path": "../public/assets/math-statistics-BlqoBDEB.jpg"
	},
	"/assets/network-D8sAp4Zg.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"172-xNGrtMp/YFlg+dmRqaDQ1ZZs/4g\"",
		"mtime": "2026-11-03T08:59:26.773Z",
		"size": 370,
		"path": "../public/assets/network-D8sAp4Zg.js"
	},
	"/assets/not-found-i5RsCZif.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"76-Trmr7GZIBZuvfg4uM18tBiRtOXg\"",
		"mtime": "2026-11-03T08:59:26.773Z",
		"size": 118,
		"path": "../public/assets/not-found-i5RsCZif.js"
	},
	"/assets/notebook-Bo_z-NCB.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"763-RfgViRgrOYT/0wVpNqsVVuZk9o8\"",
		"mtime": "2026-11-03T08:59:26.773Z",
		"size": 1891,
		"path": "../public/assets/notebook-Bo_z-NCB.js"
	},
	"/assets/organisms-DKvmh2sS.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"27f-6hceqfEi0K3epMPfyl9xvWzIQqY\"",
		"mtime": "2026-11-03T08:59:26.773Z",
		"size": 639,
		"path": "../public/assets/organisms-DKvmh2sS.js"
	},
	"/assets/page-BH0rhSJR.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"13d9-pwZGIqdVAePamm7Cvln2BlQqbew\"",
		"mtime": "2026-11-03T08:59:26.774Z",
		"size": 5081,
		"path": "../public/assets/page-BH0rhSJR.js"
	},
	"/assets/pages-DWJSbsSG.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5d2-Yll3o5Wg0NWqNZkHAtZdEvUGk7g\"",
		"mtime": "2026-11-03T08:59:26.774Z",
		"size": 1490,
		"path": "../public/assets/pages-DWJSbsSG.js"
	},
	"/assets/pages._slug-8M0c68mm.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"241-Mx7853tK2ktFA4iHD1nr+Uee2Bg\"",
		"mtime": "2026-11-03T08:59:26.774Z",
		"size": 577,
		"path": "../public/assets/pages._slug-8M0c68mm.js"
	},
	"/assets/pages._slug-CQy_8NcV.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2eb-FqF8tSwWeGxqc/cUwBwsE9gdNS0\"",
		"mtime": "2026-11-03T08:59:26.774Z",
		"size": 747,
		"path": "../public/assets/pages._slug-CQy_8NcV.js"
	},
	"/assets/photosynthese-BzVLwSbF.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4f-VyevB5RsWNhZYjelpf6q9NhSUIc\"",
		"mtime": "2026-11-03T08:59:26.774Z",
		"size": 79,
		"path": "../public/assets/photosynthese-BzVLwSbF.js"
	},
	"/assets/photosynthese-hp2KrDXh.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"252f-N9rA4a4wmFp7OYqf4noRcsHcAmc\"",
		"mtime": "2026-11-03T08:59:26.774Z",
		"size": 9519,
		"path": "../public/assets/photosynthese-hp2KrDXh.js"
	},
	"/assets/photosynthesis-BzVLwSbF.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4f-VyevB5RsWNhZYjelpf6q9NhSUIc\"",
		"mtime": "2026-11-03T08:59:26.774Z",
		"size": 79,
		"path": "../public/assets/photosynthesis-BzVLwSbF.js"
	},
	"/assets/plants-CZCHBgJ2.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"27c-MJ1BsbuhWqx/QDw85crVfnAwfgI\"",
		"mtime": "2026-11-03T08:59:26.774Z",
		"size": 636,
		"path": "../public/assets/plants-CZCHBgJ2.js"
	},
	"/assets/policy-BT0F2Gfs.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"414-POXGidGirhHqz23iiKJgezjySmw\"",
		"mtime": "2026-11-03T08:59:26.774Z",
		"size": 1044,
		"path": "../public/assets/policy-BT0F2Gfs.js"
	},
	"/assets/privacy-B_fI2iEx.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"407-wwkO/ao1cDUO0i231IV51U5CWRA\"",
		"mtime": "2026-11-03T08:59:26.774Z",
		"size": 1031,
		"path": "../public/assets/privacy-B_fI2iEx.js"
	},
	"/assets/quizzes-CRMl2ID5.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"91f-m0cvNNvySb3UHdeeuSscwDdglv0\"",
		"mtime": "2026-11-03T08:59:26.774Z",
		"size": 2335,
		"path": "../public/assets/quizzes-CRMl2ID5.js"
	},
	"/assets/react-3BKWdGy3.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1d67-7y5khacUeAI0naE7zvk9aPM2omk\"",
		"mtime": "2026-11-03T08:59:26.774Z",
		"size": 7527,
		"path": "../public/assets/react-3BKWdGy3.js"
	},
	"/assets/redirect-Dhm19zUi.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1f4-ePZWCXP5uehkmkGMkMl5xDch+/Y\"",
		"mtime": "2026-11-03T08:59:26.774Z",
		"size": 500,
		"path": "../public/assets/redirect-Dhm19zUi.js"
	},
	"/assets/root-DLTE-HSj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"20-vSYConOtSP6ciwr9zKsPixNwWmc\"",
		"mtime": "2026-11-03T08:59:26.774Z",
		"size": 32,
		"path": "../public/assets/root-DLTE-HSj.js"
	},
	"/assets/routes-DfuKpTFE.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3f8e-lBWPSEt89bpNJOVrbOk3TN2kYus\"",
		"mtime": "2026-11-03T08:59:26.774Z",
		"size": 16270,
		"path": "../public/assets/routes-DfuKpTFE.js"
	},
	"/assets/saved-CqwKM4ma.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"548-5K+5Vt+PDGsiLiSN+J0LNZDhfQ8\"",
		"mtime": "2026-11-03T08:59:26.774Z",
		"size": 1352,
		"path": "../public/assets/saved-CqwKM4ma.js"
	},
	"/assets/sci-chemistry-DGer7X6m.jpg": {
		"type": "image/jpeg",
		"etag": "\"e531-uGB6rS2e12MOCOGeglkmNegaRSo\"",
		"mtime": "2026-11-03T08:59:26.780Z",
		"size": 58673,
		"path": "../public/assets/sci-chemistry-DGer7X6m.jpg"
	},
	"/assets/sci-earth-G0pK22sY.jpg": {
		"type": "image/jpeg",
		"etag": "\"db7f-wXmT2IjaOS6hzPumkxA6nP8tkNs\"",
		"mtime": "2026-11-03T08:59:26.780Z",
		"size": 56191,
		"path": "../public/assets/sci-earth-G0pK22sY.jpg"
	},
	"/assets/sci-method-DJPtNKgn.jpg": {
		"type": "image/jpeg",
		"etag": "\"65e5-3SjBWTNfnBOULOyVptfI2A1b/Vc\"",
		"mtime": "2026-11-03T08:59:26.780Z",
		"size": 26085,
		"path": "../public/assets/sci-method-DJPtNKgn.jpg"
	},
	"/assets/sci-physics-egMuwKm5.jpg": {
		"type": "image/jpeg",
		"etag": "\"8002-mpTyuxFNaEQb/wliH6KcUwSpEdA\"",
		"mtime": "2026-11-03T08:59:26.780Z",
		"size": 32770,
		"path": "../public/assets/sci-physics-egMuwKm5.jpg"
	},
	"/assets/settings-lSRzIonr.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7de-Sgr+/cqLUumSVri3wIdd/lku0NI\"",
		"mtime": "2026-11-03T08:59:26.775Z",
		"size": 2014,
		"path": "../public/assets/settings-lSRzIonr.js"
	},
	"/assets/signup-CddRYCxc.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"18b-kjtze54/p9+sXkJhp2qZ/UFszf4\"",
		"mtime": "2026-11-03T08:59:26.775Z",
		"size": 395,
		"path": "../public/assets/signup-CddRYCxc.js"
	},
	"/assets/soft-os-addition-PA01HnOQ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"192-phlEp05Wc8+z7WU95+m5C65HzKA\"",
		"mtime": "2026-11-03T08:59:26.775Z",
		"size": 402,
		"path": "../public/assets/soft-os-addition-PA01HnOQ.js"
	},
	"/assets/species-scan-p3gRTJIH.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"18d-sLonT4kfKQe5iRiYz6RWVsJYQ1Y\"",
		"mtime": "2026-11-03T08:59:26.775Z",
		"size": 397,
		"path": "../public/assets/species-scan-p3gRTJIH.js"
	},
	"/assets/styles-CSPOQGpI.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"1ea87-lf84BK11CPno2hLfQkANtOl/U3w\"",
		"mtime": "2026-11-03T08:59:26.781Z",
		"size": 125575,
		"path": "../public/assets/styles-CSPOQGpI.css"
	},
	"/assets/tech-ai-N3_TfYIB.jpg": {
		"type": "image/jpeg",
		"etag": "\"f480-XFMqfN4HU/xKZCm+qV91Y8qyT6s\"",
		"mtime": "2026-11-03T08:59:26.781Z",
		"size": 62592,
		"path": "../public/assets/tech-ai-N3_TfYIB.jpg"
	},
	"/assets/tech-computing-BxqdUC2U.jpg": {
		"type": "image/jpeg",
		"etag": "\"19004-Vbz9mxUEKBzQVVPKauFw6hj+b+c\"",
		"mtime": "2026-11-03T08:59:26.781Z",
		"size": 102404,
		"path": "../public/assets/tech-computing-BxqdUC2U.jpg"
	},
	"/assets/tech-computing-CtHh0Hcn.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3b-rTsmoL0P1YPRMfLKNXGnFHutF0Y\"",
		"mtime": "2026-11-03T08:59:26.775Z",
		"size": 59,
		"path": "../public/assets/tech-computing-CtHh0Hcn.js"
	},
	"/assets/tech-programming-Cf7Rx_zT.jpg": {
		"type": "image/jpeg",
		"etag": "\"10fd9-Zmup00l2jDFH6bYOkb55tsdWm4A\"",
		"mtime": "2026-11-03T08:59:26.781Z",
		"size": 69593,
		"path": "../public/assets/tech-programming-Cf7Rx_zT.jpg"
	},
	"/assets/tech-security-DpkuyTLX.jpg": {
		"type": "image/jpeg",
		"etag": "\"1198b-ZlcjLSmzw82L+/mv+fDruoW5SQM\"",
		"mtime": "2026-11-03T08:59:26.781Z",
		"size": 72075,
		"path": "../public/assets/tech-security-DpkuyTLX.jpg"
	},
	"/assets/timeline-BYyu6l9b.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3a2-d51egVwZKGO4M5g5Zfuq5Y1spr0\"",
		"mtime": "2026-11-03T08:59:26.775Z",
		"size": 930,
		"path": "../public/assets/timeline-BYyu6l9b.js"
	},
	"/assets/translate-yBMaM36X.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"111d-e9nYUn4c7EwbnvNZ+6Sg1MLF2AY\"",
		"mtime": "2026-11-03T08:59:26.775Z",
		"size": 4381,
		"path": "../public/assets/translate-yBMaM36X.js"
	},
	"/assets/tutorials-CDOfdiCk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"abf-wgTpkwt23R748LGpPRqiU16hoGE\"",
		"mtime": "2026-11-03T08:59:26.775Z",
		"size": 2751,
		"path": "../public/assets/tutorials-CDOfdiCk.js"
	},
	"/assets/tutorials._slug-DzxX32OS.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"aaa-BryiG9uSlxjLy48EzNxd2gJH0zE\"",
		"mtime": "2026-11-03T08:59:26.775Z",
		"size": 2730,
		"path": "../public/assets/tutorials._slug-DzxX32OS.js"
	},
	"/assets/underline-BYc1r1QU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"35b-a1cTBXbJMWtaiGSmBcpV1SsWmeY\"",
		"mtime": "2026-11-03T08:59:26.775Z",
		"size": 859,
		"path": "../public/assets/underline-BYc1r1QU.js"
	},
	"/assets/update-soft-PVyJ_-v5.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"191-6jLL2dtEJHDccl6yo+OPXWTxXcg\"",
		"mtime": "2026-11-03T08:59:26.775Z",
		"size": 401,
		"path": "../public/assets/update-soft-PVyJ_-v5.js"
	},
	"/assets/use-auth-Cku7PGoB.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"386-913pD9RY0lwQzvbeGEgZbUi9whI\"",
		"mtime": "2026-11-03T08:59:26.775Z",
		"size": 902,
		"path": "../public/assets/use-auth-Cku7PGoB.js"
	},
	"/assets/videos-BvTRZc-r.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"574-6T+5Yh2ZwypT6rC84QVCxFPlGMw\"",
		"mtime": "2026-11-03T08:59:26.775Z",
		"size": 1396,
		"path": "../public/assets/videos-BvTRZc-r.js"
	},
	"/assets/videos._slug-BjPIsITX.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"645-EOv+t8OOvxDjk5lET+BiJciVUYU\"",
		"mtime": "2026-11-03T08:59:26.775Z",
		"size": 1605,
		"path": "../public/assets/videos._slug-BjPIsITX.js"
	},
	"/assets/wifi-DFEI86NU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"422-avpG7kI3wzBCbqV3GvVIT0e3lMY\"",
		"mtime": "2026-11-03T08:59:26.775Z",
		"size": 1058,
		"path": "../public/assets/wifi-DFEI86NU.js"
	},
	"/download logo/tedslab-download.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"186-lFbVj+z0p+x0csdNfeWXqB+VpkI\"",
		"mtime": "2026-11-03T08:59:29.157Z",
		"size": 390,
		"path": "../public/download logo/tedslab-download.txt"
	},
	"/download logo/tedslab.png": {
		"type": "image/png",
		"etag": "\"11ba99-an7wcjiulP40vrDMKyC07RnqWvo\"",
		"mtime": "2026-11-03T08:59:29.158Z",
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
