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
		"mtime": "2026-11-10T12:09:07.616Z",
		"size": 3708,
		"path": "../public/favicon.png"
	},
	"/robots.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"ec-3buti6v9Xr+gI3SlCHLfqVwS0tE\"",
		"mtime": "2026-11-10T12:09:07.617Z",
		"size": 236,
		"path": "../public/robots.txt"
	},
	"/logo.png": {
		"type": "image/png",
		"etag": "\"71d5-iC+KKvoAskwLdT7EV0YCsHQFXYw\"",
		"mtime": "2026-11-10T12:09:07.616Z",
		"size": 29141,
		"path": "../public/logo.png"
	},
	"/assets/AdminPage-CUCLHOJV.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ab8-niCmQLatfbF43sQMVHqYbwR3fAY\"",
		"mtime": "2026-11-10T12:09:05.676Z",
		"size": 2744,
		"path": "../public/assets/AdminPage-CUCLHOJV.js"
	},
	"/assets/ArticleCard-CjVzeF1X.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"bc3-rh+AiHz7d/btEObHnlHWiNrL2qU\"",
		"mtime": "2026-11-10T12:09:05.676Z",
		"size": 3011,
		"path": "../public/assets/ArticleCard-CjVzeF1X.js"
	},
	"/assets/ArticleTemplate-Dwc0sTuK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1e79-ujdIymLtb0+EnXBhRRXK38N7qg8\"",
		"mtime": "2026-11-10T12:09:05.677Z",
		"size": 7801,
		"path": "../public/assets/ArticleTemplate-Dwc0sTuK.js"
	},
	"/assets/PlatformPlaceholderPage-BbjDHzFG.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"879-eScID8z2O7FVjPYhmlr0dvnXdpM\"",
		"mtime": "2026-11-10T12:09:05.677Z",
		"size": 2169,
		"path": "../public/assets/PlatformPlaceholderPage-BbjDHzFG.js"
	},
	"/assets/TopicGrid-cZknECN-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d06-4w9C2rryWrCRiASd5LoREzcF+38\"",
		"mtime": "2026-11-10T12:09:05.677Z",
		"size": 3334,
		"path": "../public/assets/TopicGrid-cZknECN-.js"
	},
	"/assets/_section._topic-Ra3b3Qzr.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9a3-oVh0rR1uZ5Z3IW/3803kiYQo+Hc\"",
		"mtime": "2026-11-10T12:09:05.677Z",
		"size": 2467,
		"path": "../public/assets/_section._topic-Ra3b3Qzr.js"
	},
	"/assets/_subject-CXoNbww0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4c4-EGpZd/80iv2odFpw+gGU4dl9tQo\"",
		"mtime": "2026-11-10T12:09:05.677Z",
		"size": 1220,
		"path": "../public/assets/_subject-CXoNbww0.js"
	},
	"/assets/_subject._section-CjqSbMsT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8a1-J25r0TmpUvIZugMdj5sgLLAiZ2Y\"",
		"mtime": "2026-11-10T12:09:05.677Z",
		"size": 2209,
		"path": "../public/assets/_subject._section-CjqSbMsT.js"
	},
	"/assets/_subject._section._topic-DKTWmeGT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9b8-h73U9ZWXfUpiWL3gWPimRCIcxes\"",
		"mtime": "2026-11-10T12:09:05.677Z",
		"size": 2488,
		"path": "../public/assets/_subject._section._topic-DKTWmeGT.js"
	},
	"/assets/add-app-CUNborkK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a3-xvppV3D4fik6dZ3QdS0gc7auinI\"",
		"mtime": "2026-11-10T12:09:05.677Z",
		"size": 419,
		"path": "../public/assets/add-app-CUNborkK.js"
	},
	"/assets/AuthForm-D6-5RY30.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"11fb-uREITWGP5jbYn76IMlHywvfPsMU\"",
		"mtime": "2026-11-10T12:09:05.677Z",
		"size": 4603,
		"path": "../public/assets/AuthForm-D6-5RY30.js"
	},
	"/assets/admin.articles-B7N-91Tl.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"447-3a8FMYE36QLoJiVV4s1KZt7nJj8\"",
		"mtime": "2026-11-10T12:09:05.677Z",
		"size": 1095,
		"path": "../public/assets/admin.articles-B7N-91Tl.js"
	},
	"/assets/admin.articles.new-BudIgpH0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"12a1-IW/CiXhTfgxlfjKvaXaQ02s2m2U\"",
		"mtime": "2026-11-10T12:09:05.677Z",
		"size": 4769,
		"path": "../public/assets/admin.articles.new-BudIgpH0.js"
	},
	"/assets/admin.pages-BTIWNxGl.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a6-RoqCY3nKKzudHA9sAtZYa6MnMS8\"",
		"mtime": "2026-11-10T12:09:05.678Z",
		"size": 422,
		"path": "../public/assets/admin.pages-BTIWNxGl.js"
	},
	"/assets/admin.pages-list-Cat2yQXV.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"16e-FSBIifW4Ww1HcYhRuorinNVnimY\"",
		"mtime": "2026-11-10T12:09:05.678Z",
		"size": 366,
		"path": "../public/assets/admin.pages-list-Cat2yQXV.js"
	},
	"/assets/admin.sections-D53_S82L.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"187-FO6OIi8aN7i2o0Cyqpjbo+b/S54\"",
		"mtime": "2026-11-10T12:09:05.678Z",
		"size": 391,
		"path": "../public/assets/admin.sections-D53_S82L.js"
	},
	"/assets/admin.topics-Dp1CQY-t.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"18b-wi7RjEyLxtxZtEnhOOMKqMFPaa0\"",
		"mtime": "2026-11-10T12:09:05.678Z",
		"size": 395,
		"path": "../public/assets/admin.topics-Dp1CQY-t.js"
	},
	"/assets/anatomy-CUA_8WES.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"27d-3rCMRNORIjg4wpmkazVBa9F+F7Q\"",
		"mtime": "2026-11-10T12:09:05.678Z",
		"size": 637,
		"path": "../public/assets/anatomy-CUA_8WES.js"
	},
	"/assets/ai-DcOcKBy_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4026-7nvDqu0WM9TqFyVA20lE7vw7BL4\"",
		"mtime": "2026-11-10T12:09:05.678Z",
		"size": 16422,
		"path": "../public/assets/ai-DcOcKBy_.js"
	},
	"/assets/annotation-sys-NKmRv4RK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"184-nMT+ByLkq/u+koEjTPKjH0lqo1Q\"",
		"mtime": "2026-11-10T12:09:05.678Z",
		"size": 388,
		"path": "../public/assets/annotation-sys-NKmRv4RK.js"
	},
	"/assets/AppShell-BjlMdrBN.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"98c92-pTHgNa32GULbOrCHuMbJM+6doDY\"",
		"mtime": "2026-11-10T12:09:05.676Z",
		"size": 625810,
		"path": "../public/assets/AppShell-BjlMdrBN.js"
	},
	"/assets/admin-CIAsq5gS.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3a3d-Fe4TIPQp6Gmpyspb3MzSn6BSigY\"",
		"mtime": "2026-11-10T12:09:05.677Z",
		"size": 14909,
		"path": "../public/assets/admin-CIAsq5gS.js"
	},
	"/assets/articles-Gw_bJuH9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"434-jtzKIJVLcjaVdJuYSB1IrsblP7M\"",
		"mtime": "2026-11-10T12:09:05.678Z",
		"size": 1076,
		"path": "../public/assets/articles-Gw_bJuH9.js"
	},
	"/assets/articles-debug-CaUPZcI6.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"12f9-t9C+APDbebnYwnHuveFC/GYVaW8\"",
		"mtime": "2026-11-10T12:09:05.678Z",
		"size": 4857,
		"path": "../public/assets/articles-debug-CaUPZcI6.js"
	},
	"/assets/articles._slug-CBIuf0qp.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"248-awepS5GlAyBRTgP9rXD1Bdje1hw\"",
		"mtime": "2026-11-10T12:09:05.678Z",
		"size": 584,
		"path": "../public/assets/articles._slug-CBIuf0qp.js"
	},
	"/assets/articles.cellular-respiration-zoqo80gJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1fe1-fgKBS7R537LhZ5VfY/Wo5HcpFrQ\"",
		"mtime": "2026-11-10T12:09:05.678Z",
		"size": 8161,
		"path": "../public/assets/articles.cellular-respiration-zoqo80gJ.js"
	},
	"/assets/articles.enzyme-catalysis-sQUh-rYz.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e7f-wZkF3CKXt3jp6ZVQrK6mKlVgjwA\"",
		"mtime": "2026-11-10T12:09:05.678Z",
		"size": 3711,
		"path": "../public/assets/articles.enzyme-catalysis-sQUh-rYz.js"
	},
	"/assets/articles.evolution-natural-selection-DkhkfHzT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ede-onS2h9IG+3qq1DvrMSZrQ3JU39Y\"",
		"mtime": "2026-11-10T12:09:05.678Z",
		"size": 3806,
		"path": "../public/assets/articles.evolution-natural-selection-DkhkfHzT.js"
	},
	"/assets/articles.food-chains-energy-flow-DfQ0jS3U.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e99-59yFstK3EZ/SZWX3L1cwvexn8fs\"",
		"mtime": "2026-11-10T12:09:05.679Z",
		"size": 3737,
		"path": "../public/assets/articles.food-chains-energy-flow-DfQ0jS3U.js"
	},
	"/assets/articles.human-anatomy-systems-CG--t7Or.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e86-Bqb/SLWquUcgLcgIgVGqKl8Uh20\"",
		"mtime": "2026-11-10T12:09:05.679Z",
		"size": 3718,
		"path": "../public/assets/articles.human-anatomy-systems-CG--t7Or.js"
	},
	"/assets/articles.meiosis-gamete-formation-B_EY5UpD.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e92-+4GmT6xoSXhEvm9PZRji2H2KXzs\"",
		"mtime": "2026-11-10T12:09:05.679Z",
		"size": 3730,
		"path": "../public/assets/articles.meiosis-gamete-formation-B_EY5UpD.js"
	},
	"/assets/articles.mitosis-cell-division-B1zfADNi.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ecb-unGjoc+mbBvve3ZOzff3eWUgilw\"",
		"mtime": "2026-11-10T12:09:05.679Z",
		"size": 3787,
		"path": "../public/assets/articles.mitosis-cell-division-B1zfADNi.js"
	},
	"/assets/articles.photosynthesis-light-reactions-CasLLyfM.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"eaa-U5nIYLLYnO2N5aOtzmsATp/YYyE\"",
		"mtime": "2026-11-10T12:09:05.679Z",
		"size": 3754,
		"path": "../public/assets/articles.photosynthesis-light-reactions-CasLLyfM.js"
	},
	"/assets/auth-DwFG7kFh.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"182-H37/K6tEo/797f5WL54CjTTiE6k\"",
		"mtime": "2026-11-10T12:09:05.679Z",
		"size": 386,
		"path": "../public/assets/auth-DwFG7kFh.js"
	},
	"/assets/auth-w2BNGNBv.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6b09-Uq5gr3xZFyLseqlHgf1Y6zIVbLg\"",
		"mtime": "2026-11-10T12:09:05.679Z",
		"size": 27401,
		"path": "../public/assets/auth-w2BNGNBv.js"
	},
	"/assets/biological-processes-DxtQrE7c.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"28a-FHhA1T2SEUIMNrInAg7bDSnjPuk\"",
		"mtime": "2026-11-10T12:09:05.679Z",
		"size": 650,
		"path": "../public/assets/biological-processes-DxtQrE7c.js"
	},
	"/assets/biopedia-data-DJbT4MOb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4c9-y0AzIPFEOC8TKUKvFonQwHo3RbA\"",
		"mtime": "2026-11-10T12:09:05.679Z",
		"size": 1225,
		"path": "../public/assets/biopedia-data-DJbT4MOb.js"
	},
	"/assets/biotechnology-BZ_Qv6Uq.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"283-AY+02YLfFc+sTRHwMpVUt1lJNi0\"",
		"mtime": "2026-11-10T12:09:05.679Z",
		"size": 643,
		"path": "../public/assets/biotechnology-BZ_Qv6Uq.js"
	},
	"/assets/button-BM76B0EI.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"79e-Pp1LFDpMzkdvfae78Ma3oMuKMAI\"",
		"mtime": "2026-11-10T12:09:05.679Z",
		"size": 1950,
		"path": "../public/assets/button-BM76B0EI.js"
	},
	"/assets/cat-ecology-DbnEUXHR.jpg": {
		"type": "image/jpeg",
		"etag": "\"2da9e-OCrQ+5HxBL/MeFpjI2Ml9mEB6CQ\"",
		"mtime": "2026-11-10T12:09:05.687Z",
		"size": 187038,
		"path": "../public/assets/cat-ecology-DbnEUXHR.jpg"
	},
	"/assets/cat-evolution-CC_w4loO.jpg": {
		"type": "image/jpeg",
		"etag": "\"2fdbd-seNsXnl4XHNUY71qgNreqGrRZEg\"",
		"mtime": "2026-11-10T12:09:05.687Z",
		"size": 196029,
		"path": "../public/assets/cat-evolution-CC_w4loO.jpg"
	},
	"/assets/cat-genetics-C6CBosmo.jpg": {
		"type": "image/jpeg",
		"etag": "\"281ff-qhaiIvZ8BDqFMGgfDXNC3bv5mFo\"",
		"mtime": "2026-11-10T12:09:05.687Z",
		"size": 164351,
		"path": "../public/assets/cat-genetics-C6CBosmo.jpg"
	},
	"/assets/cat-human-BuRMR2jH.jpg": {
		"type": "image/jpeg",
		"etag": "\"23326-4wTTr4zzrFQf89XTkJyXsX8rXHg\"",
		"mtime": "2026-11-10T12:09:05.687Z",
		"size": 144166,
		"path": "../public/assets/cat-human-BuRMR2jH.jpg"
	},
	"/assets/cat-organisms-yXH6lJcJ.jpg": {
		"type": "image/jpeg",
		"etag": "\"2acbe-1G/hL2bGRo8MkA9mSKQX6eYai7o\"",
		"mtime": "2026-11-10T12:09:05.688Z",
		"size": 175294,
		"path": "../public/assets/cat-organisms-yXH6lJcJ.jpg"
	},
	"/assets/cat-plants-Bu_hoilj.jpg": {
		"type": "image/jpeg",
		"etag": "\"3af5b-WyZ9BT5qxBZaWxxjuNNVL7/2IO0\"",
		"mtime": "2026-11-10T12:09:05.688Z",
		"size": 241499,
		"path": "../public/assets/cat-plants-Bu_hoilj.jpg"
	},
	"/assets/catalog-BW2H-k1O.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1386b-OjNI3O5ivbSggTxgqPAEP4ZIY6I\"",
		"mtime": "2026-11-10T12:09:05.679Z",
		"size": 79979,
		"path": "../public/assets/catalog-BW2H-k1O.js"
	},
	"/assets/categories-CclsnhQL.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3e2-GZ+z4lMJTcFdhAISi7qtt4Ug92Q\"",
		"mtime": "2026-11-10T12:09:05.680Z",
		"size": 994,
		"path": "../public/assets/categories-CclsnhQL.js"
	},
	"/assets/cells-microscopy-BdPamrkK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"286-GFABibf6e7A/QDj3WflELQl4TJ4\"",
		"mtime": "2026-11-10T12:09:05.680Z",
		"size": 646,
		"path": "../public/assets/cells-microscopy-BdPamrkK.js"
	},
	"/assets/chronos-os-DTspvW0w.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ee6-cln3OKwalizd+IXzznFZGNgCJWY\"",
		"mtime": "2026-11-10T12:09:05.680Z",
		"size": 3814,
		"path": "../public/assets/chronos-os-DTspvW0w.js"
	},
	"/assets/chronos-os-download-NgNwS3VV.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5dd-RvZqWNnwrlULO51q4Jux4N8sJQs\"",
		"mtime": "2026-11-10T12:09:05.680Z",
		"size": 1501,
		"path": "../public/assets/chronos-os-download-NgNwS3VV.js"
	},
	"/assets/communicational-system-A9zdLQRP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a2-db7OwUZ4ExfrlPwfC+UlfmhIgxE\"",
		"mtime": "2026-11-10T12:09:05.680Z",
		"size": 418,
		"path": "../public/assets/communicational-system-A9zdLQRP.js"
	},
	"/assets/createLucideIcon-MwRsDkk0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4d2-g6fS2plfoCENWn0hMSz/sI/USgw\"",
		"mtime": "2026-11-10T12:09:05.680Z",
		"size": 1234,
		"path": "../public/assets/createLucideIcon-MwRsDkk0.js"
	},
	"/assets/dashboard-DmuAKTJQ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"506-jPZRZ9JjPyifUOpnyYkQlmqvcEM\"",
		"mtime": "2026-11-10T12:09:05.680Z",
		"size": 1286,
		"path": "../public/assets/dashboard-DmuAKTJQ.js"
	},
	"/assets/custom-lists-Dp757WqO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b41-xCJf9O93k4zN3YXFF8SorSSYX+I\"",
		"mtime": "2026-11-10T12:09:05.680Z",
		"size": 2881,
		"path": "../public/assets/custom-lists-Dp757WqO.js"
	},
	"/assets/dev-dashboard-DcW8BP5n.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"10ce-lC5so1QtvI+dj3/zjtemHZNX7mE\"",
		"mtime": "2026-11-10T12:09:05.680Z",
		"size": 4302,
		"path": "../public/assets/dev-dashboard-DcW8BP5n.js"
	},
	"/assets/decipher-J3FU0qWG.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"16f-5wHvF85VBi3yxf109wX7CkX83dQ\"",
		"mtime": "2026-11-10T12:09:05.680Z",
		"size": 367,
		"path": "../public/assets/decipher-J3FU0qWG.js"
	},
	"/assets/dev-tools-B6vROu_k.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1362-q2k74OF940uClSXFpgu96yu8CJw\"",
		"mtime": "2026-11-10T12:09:05.680Z",
		"size": 4962,
		"path": "../public/assets/dev-tools-B6vROu_k.js"
	},
	"/assets/discovery-leaf-B4lyAWC2.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3b-my347b2NUKvD+XRT+D6BbNxbmjg\"",
		"mtime": "2026-11-10T12:09:05.680Z",
		"size": 59,
		"path": "../public/assets/discovery-leaf-B4lyAWC2.js"
	},
	"/assets/discovery-leaf-CDLQK6NX.jpg": {
		"type": "image/jpeg",
		"etag": "\"292a2-sl75CS6OW2pQPTWnj52a0F63jwo\"",
		"mtime": "2026-11-10T12:09:05.688Z",
		"size": 168610,
		"path": "../public/assets/discovery-leaf-CDLQK6NX.jpg"
	},
	"/assets/dist-CYPCRHGl2.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2b9-lLpvBBDmDlViZX1DmcY5mkUmf5s\"",
		"mtime": "2026-11-10T12:09:05.681Z",
		"size": 697,
		"path": "../public/assets/dist-CYPCRHGl2.js"
	},
	"/assets/download-DZIKMJr6.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1044-bwNewfLz+o1kqxD7wHHeBqgNIQ8\"",
		"mtime": "2026-11-10T12:09:05.681Z",
		"size": 4164,
		"path": "../public/assets/download-DZIKMJr6.js"
	},
	"/assets/dist-LDDY01lQ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b5c-3pQg2ztJbuAcrDRJNjfC/FZHIuI\"",
		"mtime": "2026-11-10T12:09:05.681Z",
		"size": 2908,
		"path": "../public/assets/dist-LDDY01lQ.js"
	},
	"/assets/downloadable-software-BQUxLtK3.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"67b-PV7DWsVdXfhvK9KkuPIUY53n/VE\"",
		"mtime": "2026-11-10T12:09:05.681Z",
		"size": 1659,
		"path": "../public/assets/downloadable-software-BQUxLtK3.js"
	},
	"/assets/ecology-environment-DT0eJYG2.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"289-SCixXCDUCIRApl3snoxqsZB68f4\"",
		"mtime": "2026-11-10T12:09:05.681Z",
		"size": 649,
		"path": "../public/assets/ecology-environment-DT0eJYG2.js"
	},
	"/assets/eng-grammar-B1tMmnMx.jpg": {
		"type": "image/jpeg",
		"etag": "\"74c1-XK8BNB8ZAYcd/TE7F0EdV/8Ul8I\"",
		"mtime": "2026-11-10T12:09:05.689Z",
		"size": 29889,
		"path": "../public/assets/eng-grammar-B1tMmnMx.jpg"
	},
	"/assets/eng-poetry-BQYnMCQa.jpg": {
		"type": "image/jpeg",
		"etag": "\"10239-W3/DnYSqaKLw+1EOhXvOc98a4PU\"",
		"mtime": "2026-11-10T12:09:05.689Z",
		"size": 66105,
		"path": "../public/assets/eng-poetry-BQYnMCQa.jpg"
	},
	"/assets/eng-writing-DkEjUsar.jpg": {
		"type": "image/jpeg",
		"etag": "\"9cc3-ee85EOsBs2794hyQ7ENTiSRcMx8\"",
		"mtime": "2026-11-10T12:09:05.689Z",
		"size": 40131,
		"path": "../public/assets/eng-writing-DkEjUsar.jpg"
	},
	"/assets/eng-literature-BajHjXyN.jpg": {
		"type": "image/jpeg",
		"etag": "\"cc62-NF9kB2OyFm1zMZ+Oih1ZHorruYg\"",
		"mtime": "2026-11-10T12:09:05.689Z",
		"size": 52322,
		"path": "../public/assets/eng-literature-BajHjXyN.jpg"
	},
	"/assets/evolution-D6S_4Oeo.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"27f-IgT3qjP8jUAibqrhXdGQqTRdm+o\"",
		"mtime": "2026-11-10T12:09:05.682Z",
		"size": 639,
		"path": "../public/assets/evolution-D6S_4Oeo.js"
	},
	"/assets/extension-tools-upload-Cgr3IrUK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"19b-iK0uLHaV86Jnrk6Rd57zTN50JNA\"",
		"mtime": "2026-11-10T12:09:05.682Z",
		"size": 411,
		"path": "../public/assets/extension-tools-upload-Cgr3IrUK.js"
	},
	"/assets/extensions-DvyLioOj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"46-WyIKuVibW2452i2mA8dVoJmasSI\"",
		"mtime": "2026-11-10T12:09:05.682Z",
		"size": 70,
		"path": "../public/assets/extensions-DvyLioOj.js"
	},
	"/assets/docs-MANVxiu3.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8572b-fWsADbHdPeoApjA8F34jzj9suxo\"",
		"mtime": "2026-11-10T12:09:05.681Z",
		"size": 546603,
		"path": "../public/assets/docs-MANVxiu3.js"
	},
	"/assets/extensions.noter-CEebgCTe.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"46-yRR31TVy4deXGpfFWDdxgwOVYag\"",
		"mtime": "2026-11-10T12:09:05.682Z",
		"size": 70,
		"path": "../public/assets/extensions.noter-CEebgCTe.js"
	},
	"/assets/flashcards-BOmyH54m.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"44e-XeGam45nQUd5M6Ae3ddXK4FVH7c\"",
		"mtime": "2026-11-10T12:09:05.682Z",
		"size": 1102,
		"path": "../public/assets/flashcards-BOmyH54m.js"
	},
	"/assets/genetics-dna-CQFdJpLB.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"282-FJ8TbxlHzgtoeRdGCDC656w+H3o\"",
		"mtime": "2026-11-10T12:09:05.682Z",
		"size": 642,
		"path": "../public/assets/genetics-dna-CQFdJpLB.js"
	},
	"/assets/glossary-BvbSlfa-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"36b-CtdT8XEReyv8XGR0cs1IcbODlAY\"",
		"mtime": "2026-11-10T12:09:05.682Z",
		"size": 875,
		"path": "../public/assets/glossary-BvbSlfa-.js"
	},
	"/assets/graphication-B1rbrI_Y.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"179-1OIuo3vZB9/3JJAPm2UYk1W6EhQ\"",
		"mtime": "2026-11-10T12:09:05.682Z",
		"size": 377,
		"path": "../public/assets/graphication-B1rbrI_Y.js"
	},
	"/assets/help-center-Be5zbbsz.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"14aa-C8rgB6qHe/u+U1dwl6QjBhH6qW8\"",
		"mtime": "2026-11-10T12:09:05.682Z",
		"size": 5290,
		"path": "../public/assets/help-center-Be5zbbsz.js"
	},
	"/assets/hero-cell-BewOnWpW.jpg": {
		"type": "image/jpeg",
		"etag": "\"40c11-gRZUnBDNdykEsTfNLMgxrZ+4OcU\"",
		"mtime": "2026-11-10T12:09:05.689Z",
		"size": 265233,
		"path": "../public/assets/hero-cell-BewOnWpW.jpg"
	},
	"/assets/his-ancient-D_3kmTQu.jpg": {
		"type": "image/jpeg",
		"etag": "\"124b1-VN0HL9ZUiqcfpgKsq+4JPZ2wA70\"",
		"mtime": "2026-11-10T12:09:05.690Z",
		"size": 74929,
		"path": "../public/assets/his-ancient-D_3kmTQu.jpg"
	},
	"/assets/his-medieval-Z1UQ46lz.jpg": {
		"type": "image/jpeg",
		"etag": "\"94dd-hwSoe+zL6tyOotdQvEYv56k0YhM\"",
		"mtime": "2026-11-10T12:09:05.690Z",
		"size": 38109,
		"path": "../public/assets/his-medieval-Z1UQ46lz.jpg"
	},
	"/assets/his-revolutions-BKB1brIf.jpg": {
		"type": "image/jpeg",
		"etag": "\"f396-a6hL0Vst70K1o9x2ypegAAHcKWs\"",
		"mtime": "2026-11-10T12:09:05.690Z",
		"size": 62358,
		"path": "../public/assets/his-revolutions-BKB1brIf.jpg"
	},
	"/assets/his-wars-Dja4_BlN.jpg": {
		"type": "image/jpeg",
		"etag": "\"e5ca-2jcnizpZCZIyPz3NRRyhh6p2aUw\"",
		"mtime": "2026-11-10T12:09:05.690Z",
		"size": 58826,
		"path": "../public/assets/his-wars-Dja4_BlN.jpg"
	},
	"/assets/human-biology-Dx7NGs4g.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"283-i28/xR1Cm95AWdVEy0K95CQ9PQE\"",
		"mtime": "2026-11-10T12:09:05.682Z",
		"size": 643,
		"path": "../public/assets/human-biology-Dx7NGs4g.js"
	},
	"/assets/images-xGwTEqeS.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6c7-Pk/YMa5itOlpzK6ZTBCO7vItja8\"",
		"mtime": "2026-11-10T12:09:05.682Z",
		"size": 1735,
		"path": "../public/assets/images-xGwTEqeS.js"
	},
	"/assets/ide-system-DcH24P00.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a1-h4fR3fCQgx3xBXnp7aiCDwpcJkI\"",
		"mtime": "2026-11-10T12:09:05.682Z",
		"size": 417,
		"path": "../public/assets/ide-system-DcH24P00.js"
	},
	"/assets/index-6TRWMP5L.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5fdd0-WL0tv0XwwOJHAbnPwMxJmDO6A0A\"",
		"mtime": "2026-11-10T12:09:05.675Z",
		"size": 392656,
		"path": "../public/assets/index-6TRWMP5L.js"
	},
	"/assets/information-use-Bj3CwxTJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"413-TSuXz4OEruc8CgBg6Bnv6XsKuFE\"",
		"mtime": "2026-11-10T12:09:05.682Z",
		"size": 1043,
		"path": "../public/assets/information-use-Bj3CwxTJ.js"
	},
	"/assets/input-goLwXT6h.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"282-bruGzq/tVhchlqjaYE3564V55eM\"",
		"mtime": "2026-11-10T12:09:05.682Z",
		"size": 642,
		"path": "../public/assets/input-goLwXT6h.js"
	},
	"/assets/jsx-runtime-Cx0BB4qO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"440-7GwVHNgO4EUMk3cR4Bh6KGJPPX4\"",
		"mtime": "2026-11-10T12:09:05.683Z",
		"size": 1088,
		"path": "../public/assets/jsx-runtime-Cx0BB4qO.js"
	},
	"/assets/label-ZSAiVTMf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2e5-A9r1Sc5O2J6ad/f4YXBR/lLs7E8\"",
		"mtime": "2026-11-10T12:09:05.684Z",
		"size": 741,
		"path": "../public/assets/label-ZSAiVTMf.js"
	},
	"/assets/layout-CIo4WQnD.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f2-BWVDnkYf1agOgzXkCTglllzDsn0\"",
		"mtime": "2026-11-10T12:09:05.684Z",
		"size": 242,
		"path": "../public/assets/layout-CIo4WQnD.js"
	},
	"/assets/link-Cd8uGbU2.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"860d-NNywEUXGwFoFWbn9JJdbOysSBw4\"",
		"mtime": "2026-11-10T12:09:05.684Z",
		"size": 34317,
		"path": "../public/assets/link-Cd8uGbU2.js"
	},
	"/assets/llm-ClFLm-_T.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2ec9-78XKq4BPJx0qXIS6a4MWkZZcQ3o\"",
		"mtime": "2026-11-10T12:09:05.684Z",
		"size": 11977,
		"path": "../public/assets/llm-ClFLm-_T.js"
	},
	"/assets/logo-tedslab-CSGR30te.png": {
		"type": "image/png",
		"etag": "\"7caa0-7zdWgbobOh6pFHVZufJZw3PL3lM\"",
		"mtime": "2026-11-10T12:09:05.690Z",
		"size": 510624,
		"path": "../public/assets/logo-tedslab-CSGR30te.png"
	},
	"/assets/lost-atlas-CpjPXS3X.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"15d7-7mRQ6Dtb89NLlYbqQfsEeN3VN9c\"",
		"mtime": "2026-11-10T12:09:05.684Z",
		"size": 5591,
		"path": "../public/assets/lost-atlas-CpjPXS3X.js"
	},
	"/assets/knowledge-atlas-CaZpKVKe.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c98c1-D8Ig+SWh1AJXmf+NPKecMJ87oMQ\"",
		"mtime": "2026-11-10T12:09:05.683Z",
		"size": 825537,
		"path": "../public/assets/knowledge-atlas-CaZpKVKe.js"
	},
	"/assets/lost-atlas._slug-Cylip2EF.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"166b-R7RAIt0eJ1w9SpLpNb5e9NnKf/I\"",
		"mtime": "2026-11-10T12:09:05.684Z",
		"size": 5739,
		"path": "../public/assets/lost-atlas._slug-Cylip2EF.js"
	},
	"/assets/maps-Bv7J0ZHK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"16e-i/n7/cUbTuDre9T4idNwV/9KOUA\"",
		"mtime": "2026-11-10T12:09:05.684Z",
		"size": 366,
		"path": "../public/assets/maps-Bv7J0ZHK.js"
	},
	"/assets/math-algebra-Bht1HCz8.jpg": {
		"type": "image/jpeg",
		"etag": "\"2d35a-PvVYI2LrpcoD2wanQQ7xOYpbYIE\"",
		"mtime": "2026-11-10T12:09:05.691Z",
		"size": 185178,
		"path": "../public/assets/math-algebra-Bht1HCz8.jpg"
	},
	"/assets/math-calculus-B1M0mWMY.jpg": {
		"type": "image/jpeg",
		"etag": "\"5b9d-bVTaXEAGiT9VR5oaj+FZmqSlB0U\"",
		"mtime": "2026-11-10T12:09:05.691Z",
		"size": 23453,
		"path": "../public/assets/math-calculus-B1M0mWMY.jpg"
	},
	"/assets/math-geometry-SGeNwC3o.jpg": {
		"type": "image/jpeg",
		"etag": "\"2ba46-mIRTtF52sxAW70KWKjzJOualsJs\"",
		"mtime": "2026-11-10T12:09:05.691Z",
		"size": 178758,
		"path": "../public/assets/math-geometry-SGeNwC3o.jpg"
	},
	"/assets/math-statistics-BlqoBDEB.jpg": {
		"type": "image/jpeg",
		"etag": "\"9615-x8xInAeJEUklmLWM3NTCzpQDzVI\"",
		"mtime": "2026-11-10T12:09:05.692Z",
		"size": 38421,
		"path": "../public/assets/math-statistics-BlqoBDEB.jpg"
	},
	"/assets/network-DYOsYDwD.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"172-bTZ7X3uuB8WeNRHOZLEjN+EWnA4\"",
		"mtime": "2026-11-10T12:09:05.684Z",
		"size": 370,
		"path": "../public/assets/network-DYOsYDwD.js"
	},
	"/assets/not-found-i5RsCZif.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"76-Trmr7GZIBZuvfg4uM18tBiRtOXg\"",
		"mtime": "2026-11-10T12:09:05.684Z",
		"size": 118,
		"path": "../public/assets/not-found-i5RsCZif.js"
	},
	"/assets/notebook-BrRt92w1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"762-ZCDxtE7j+p9HHLbcKZgIoDs+MrA\"",
		"mtime": "2026-11-10T12:09:05.684Z",
		"size": 1890,
		"path": "../public/assets/notebook-BrRt92w1.js"
	},
	"/assets/pages-CMCoTbj_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5d2-S3Z2NTbF0lEfmKlt8xzSV91dP8s\"",
		"mtime": "2026-11-10T12:09:05.685Z",
		"size": 1490,
		"path": "../public/assets/pages-CMCoTbj_.js"
	},
	"/assets/page-CKDkDe8n.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"140d-ygmj0FlWG+6phmj097XbFlfDoQ8\"",
		"mtime": "2026-11-10T12:09:05.685Z",
		"size": 5133,
		"path": "../public/assets/page-CKDkDe8n.js"
	},
	"/assets/organisms-CPYXCzRv.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"27f-lakrl6duSE8DFn32EILDvEbf6eM\"",
		"mtime": "2026-11-10T12:09:05.685Z",
		"size": 639,
		"path": "../public/assets/organisms-CPYXCzRv.js"
	},
	"/assets/pages._slug-8M0c68mm.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"241-Mx7853tK2ktFA4iHD1nr+Uee2Bg\"",
		"mtime": "2026-11-10T12:09:05.685Z",
		"size": 577,
		"path": "../public/assets/pages._slug-8M0c68mm.js"
	},
	"/assets/photosynthese-CW3ebQao.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4f-DBHmbaqLf7KKDgLX6ssHSKJ24w4\"",
		"mtime": "2026-11-10T12:09:05.685Z",
		"size": 79,
		"path": "../public/assets/photosynthese-CW3ebQao.js"
	},
	"/assets/pages._slug-Zh4-_njP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2eb-w7DY9DsADxrgFYLOIsdlSN63A4s\"",
		"mtime": "2026-11-10T12:09:05.685Z",
		"size": 747,
		"path": "../public/assets/pages._slug-Zh4-_njP.js"
	},
	"/assets/photosynthese-DVG2Pmc1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"252f-cZN7ske4tY1OUJNBLaD0RtNZaOw\"",
		"mtime": "2026-11-10T12:09:05.685Z",
		"size": 9519,
		"path": "../public/assets/photosynthese-DVG2Pmc1.js"
	},
	"/assets/photosynthesis-CW3ebQao.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4f-DBHmbaqLf7KKDgLX6ssHSKJ24w4\"",
		"mtime": "2026-11-10T12:09:05.685Z",
		"size": 79,
		"path": "../public/assets/photosynthesis-CW3ebQao.js"
	},
	"/assets/plants-KiWIjYz8.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"27c-yxdKg5p7qtZLtBB8mlof91c7xeA\"",
		"mtime": "2026-11-10T12:09:05.685Z",
		"size": 636,
		"path": "../public/assets/plants-KiWIjYz8.js"
	},
	"/assets/policy-CxNGAgJJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"414-UQozEu7IRi+06qgQVyanW6PHDp8\"",
		"mtime": "2026-11-10T12:09:05.685Z",
		"size": 1044,
		"path": "../public/assets/policy-CxNGAgJJ.js"
	},
	"/assets/privacy-Cit2jQBK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"407-lzM7lSwC1tsGmSECTG4jVBhubkM\"",
		"mtime": "2026-11-10T12:09:05.686Z",
		"size": 1031,
		"path": "../public/assets/privacy-Cit2jQBK.js"
	},
	"/assets/quizzes-C3Tv0yI2.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"91e-+UQ3BDaTjEVAZXJBZg22XotMC9U\"",
		"mtime": "2026-11-10T12:09:05.686Z",
		"size": 2334,
		"path": "../public/assets/quizzes-C3Tv0yI2.js"
	},
	"/assets/redirect-Dhm19zUi.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1f4-ePZWCXP5uehkmkGMkMl5xDch+/Y\"",
		"mtime": "2026-11-10T12:09:05.686Z",
		"size": 500,
		"path": "../public/assets/redirect-Dhm19zUi.js"
	},
	"/assets/root-DLTE-HSj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"20-vSYConOtSP6ciwr9zKsPixNwWmc\"",
		"mtime": "2026-11-10T12:09:05.686Z",
		"size": 32,
		"path": "../public/assets/root-DLTE-HSj.js"
	},
	"/assets/routes-CvdmfHct.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3f70-SQ3x+SLrrI508qIw5HCP/E+kjPM\"",
		"mtime": "2026-11-10T12:09:05.686Z",
		"size": 16240,
		"path": "../public/assets/routes-CvdmfHct.js"
	},
	"/assets/saved-Dgv02aOS.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"548-Q35987TENb/jVKwbO59JWLHxk5k\"",
		"mtime": "2026-11-10T12:09:05.686Z",
		"size": 1352,
		"path": "../public/assets/saved-Dgv02aOS.js"
	},
	"/assets/sci-chemistry-DGer7X6m.jpg": {
		"type": "image/jpeg",
		"etag": "\"e531-uGB6rS2e12MOCOGeglkmNegaRSo\"",
		"mtime": "2026-11-10T12:09:05.692Z",
		"size": 58673,
		"path": "../public/assets/sci-chemistry-DGer7X6m.jpg"
	},
	"/assets/sci-earth-G0pK22sY.jpg": {
		"type": "image/jpeg",
		"etag": "\"db7f-wXmT2IjaOS6hzPumkxA6nP8tkNs\"",
		"mtime": "2026-11-10T12:09:05.692Z",
		"size": 56191,
		"path": "../public/assets/sci-earth-G0pK22sY.jpg"
	},
	"/assets/sci-method-DJPtNKgn.jpg": {
		"type": "image/jpeg",
		"etag": "\"65e5-3SjBWTNfnBOULOyVptfI2A1b/Vc\"",
		"mtime": "2026-11-10T12:09:05.692Z",
		"size": 26085,
		"path": "../public/assets/sci-method-DJPtNKgn.jpg"
	},
	"/assets/sci-physics-egMuwKm5.jpg": {
		"type": "image/jpeg",
		"etag": "\"8002-mpTyuxFNaEQb/wliH6KcUwSpEdA\"",
		"mtime": "2026-11-10T12:09:05.692Z",
		"size": 32770,
		"path": "../public/assets/sci-physics-egMuwKm5.jpg"
	},
	"/assets/settings-H939RghD.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7bd-saaXBSDPUzXDyMdTFmsAHcBt6L4\"",
		"mtime": "2026-11-10T12:09:05.686Z",
		"size": 1981,
		"path": "../public/assets/settings-H939RghD.js"
	},
	"/assets/signup-BOFbzdjZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"18b-nuzVq4BURQ0jsZ7LyUb6nf5GWGg\"",
		"mtime": "2026-11-10T12:09:05.686Z",
		"size": 395,
		"path": "../public/assets/signup-BOFbzdjZ.js"
	},
	"/assets/soft-os-addition-BcOjUrO1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"192-toF4f8ZAZihcrjiAjsaM+tw8Xv0\"",
		"mtime": "2026-11-10T12:09:05.686Z",
		"size": 402,
		"path": "../public/assets/soft-os-addition-BcOjUrO1.js"
	},
	"/assets/species-scan-DK6GOB22.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"18d-GoERnYUsm9p9qCkt2AN+sk10aRM\"",
		"mtime": "2026-11-10T12:09:05.686Z",
		"size": 397,
		"path": "../public/assets/species-scan-DK6GOB22.js"
	},
	"/assets/styles-DHonbaTK.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"1eaa3-GZFw1M9JFdlevC2jDhll2aYW0dg\"",
		"mtime": "2026-11-10T12:09:05.692Z",
		"size": 125603,
		"path": "../public/assets/styles-DHonbaTK.css"
	},
	"/assets/tech-ai-N3_TfYIB.jpg": {
		"type": "image/jpeg",
		"etag": "\"f480-XFMqfN4HU/xKZCm+qV91Y8qyT6s\"",
		"mtime": "2026-11-10T12:09:05.692Z",
		"size": 62592,
		"path": "../public/assets/tech-ai-N3_TfYIB.jpg"
	},
	"/assets/tech-computing-BxqdUC2U.jpg": {
		"type": "image/jpeg",
		"etag": "\"19004-Vbz9mxUEKBzQVVPKauFw6hj+b+c\"",
		"mtime": "2026-11-10T12:09:05.693Z",
		"size": 102404,
		"path": "../public/assets/tech-computing-BxqdUC2U.jpg"
	},
	"/assets/tech-computing-CtHh0Hcn.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3b-rTsmoL0P1YPRMfLKNXGnFHutF0Y\"",
		"mtime": "2026-11-10T12:09:05.686Z",
		"size": 59,
		"path": "../public/assets/tech-computing-CtHh0Hcn.js"
	},
	"/assets/tech-programming-Cf7Rx_zT.jpg": {
		"type": "image/jpeg",
		"etag": "\"10fd9-Zmup00l2jDFH6bYOkb55tsdWm4A\"",
		"mtime": "2026-11-10T12:09:05.693Z",
		"size": 69593,
		"path": "../public/assets/tech-programming-Cf7Rx_zT.jpg"
	},
	"/assets/tech-security-DpkuyTLX.jpg": {
		"type": "image/jpeg",
		"etag": "\"1198b-ZlcjLSmzw82L+/mv+fDruoW5SQM\"",
		"mtime": "2026-11-10T12:09:05.693Z",
		"size": 72075,
		"path": "../public/assets/tech-security-DpkuyTLX.jpg"
	},
	"/assets/timeline-C_AVozm9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3a2-+kDfcknvhvMBqNrBncvvFM9uMpY\"",
		"mtime": "2026-11-10T12:09:05.686Z",
		"size": 930,
		"path": "../public/assets/timeline-C_AVozm9.js"
	},
	"/assets/translate-CX7LIlrn.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1138-TpoGH3zoH1ScbCSKrTeZYO+lgtk\"",
		"mtime": "2026-11-10T12:09:05.686Z",
		"size": 4408,
		"path": "../public/assets/translate-CX7LIlrn.js"
	},
	"/assets/tutorials-BymlHO9q.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"abf-Jf9kFnfyj+Ezz+bhwE3sjkGH3XI\"",
		"mtime": "2026-11-10T12:09:05.686Z",
		"size": 2751,
		"path": "../public/assets/tutorials-BymlHO9q.js"
	},
	"/assets/tutorials._slug-Danf8iZe.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"aaa-qlig9D12ZZAVra1a4KAz9+xIudw\"",
		"mtime": "2026-11-10T12:09:05.686Z",
		"size": 2730,
		"path": "../public/assets/tutorials._slug-Danf8iZe.js"
	},
	"/assets/update-soft-MXE38os6.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"191-JUZk/i5IV5bHwGhUaf4Y6u2Mx88\"",
		"mtime": "2026-11-10T12:09:05.686Z",
		"size": 401,
		"path": "../public/assets/update-soft-MXE38os6.js"
	},
	"/assets/use-auth-DwfOt2mw.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"38a-is5TJnNJQLc7eRivfyhBqzd1gto\"",
		"mtime": "2026-11-10T12:09:05.686Z",
		"size": 906,
		"path": "../public/assets/use-auth-DwfOt2mw.js"
	},
	"/assets/videos-daWbX0Z2.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"574-uL6jRGQ99W0xeuHGqk/qglAsrts\"",
		"mtime": "2026-11-10T12:09:05.687Z",
		"size": 1396,
		"path": "../public/assets/videos-daWbX0Z2.js"
	},
	"/assets/videos._slug-BaLTRpTB.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"645-K40xJWgI7wNTYhjFJf46eRDXmgY\"",
		"mtime": "2026-11-10T12:09:05.687Z",
		"size": 1605,
		"path": "../public/assets/videos._slug-BaLTRpTB.js"
	},
	"/download logo/tedslab-download.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"186-lFbVj+z0p+x0csdNfeWXqB+VpkI\"",
		"mtime": "2026-11-10T12:09:07.614Z",
		"size": 390,
		"path": "../public/download logo/tedslab-download.txt"
	},
	"/download logo/tedslab.png": {
		"type": "image/png",
		"etag": "\"11ba99-an7wcjiulP40vrDMKyC07RnqWvo\"",
		"mtime": "2026-11-10T12:09:07.616Z",
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
