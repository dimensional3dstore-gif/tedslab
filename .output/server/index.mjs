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
	"/logo.png": {
		"type": "image/png",
		"etag": "\"71d5-iC+KKvoAskwLdT7EV0YCsHQFXYw\"",
		"mtime": "2026-11-10T11:57:11.009Z",
		"size": 29141,
		"path": "../public/logo.png"
	},
	"/robots.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"ec-3buti6v9Xr+gI3SlCHLfqVwS0tE\"",
		"mtime": "2026-11-10T11:57:11.009Z",
		"size": 236,
		"path": "../public/robots.txt"
	},
	"/assets/AdminPage-DoK1G3A3.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ad9-ZzAS/sFDteRg+B/WIQLqS2oqILo\"",
		"mtime": "2026-11-10T11:57:08.615Z",
		"size": 2777,
		"path": "../public/assets/AdminPage-DoK1G3A3.js"
	},
	"/assets/ArticleCard-oai6MN7r.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"bc3-ZUeJJ7ufJFq4ikHB7ey6k4TniBw\"",
		"mtime": "2026-11-10T11:57:08.615Z",
		"size": 3011,
		"path": "../public/assets/ArticleCard-oai6MN7r.js"
	},
	"/assets/ArticleTemplate-CPJ5Icdu.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1e79-+zRs2acF7DVa5y9Kpt3cDd9j9ZA\"",
		"mtime": "2026-11-10T11:57:08.615Z",
		"size": 7801,
		"path": "../public/assets/ArticleTemplate-CPJ5Icdu.js"
	},
	"/assets/AuthForm-CTT84aRY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"120d-0Wd5mbDajxk3lsQmLdQsuChSTjs\"",
		"mtime": "2026-11-10T11:57:08.616Z",
		"size": 4621,
		"path": "../public/assets/AuthForm-CTT84aRY.js"
	},
	"/assets/PlatformPlaceholderPage-BtozQwG7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"865-UlY3//4a7xFrV/ODjnDsCRh/xhE\"",
		"mtime": "2026-11-10T11:57:08.616Z",
		"size": 2149,
		"path": "../public/assets/PlatformPlaceholderPage-BtozQwG7.js"
	},
	"/assets/TopicGrid-DWunptD_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d27-Wpw30geSr1jME8qQq8ZC1TAP+JE\"",
		"mtime": "2026-11-10T11:57:08.616Z",
		"size": 3367,
		"path": "../public/assets/TopicGrid-DWunptD_.js"
	},
	"/assets/_section._topic-CuD-VXHV.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9a3-GpXY+EhF2M1U+uPbKo8XW6FAgGI\"",
		"mtime": "2026-11-10T11:57:08.616Z",
		"size": 2467,
		"path": "../public/assets/_section._topic-CuD-VXHV.js"
	},
	"/assets/_subject-CcYh92fL.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4c4-ETZE+71yzJZsYRy4klyaqydymkY\"",
		"mtime": "2026-11-10T11:57:08.616Z",
		"size": 1220,
		"path": "../public/assets/_subject-CcYh92fL.js"
	},
	"/assets/_subject._section-KDyOyg2M.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8a1-WluLcmRY9O7IWmDhV7mzrEhS9LE\"",
		"mtime": "2026-11-10T11:57:08.616Z",
		"size": 2209,
		"path": "../public/assets/_subject._section-KDyOyg2M.js"
	},
	"/assets/_subject._section._topic-BUwIbQvZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9b8-HKutndKJe+E/9k1FWyoKrDUJ4aE\"",
		"mtime": "2026-11-10T11:57:08.616Z",
		"size": 2488,
		"path": "../public/assets/_subject._section._topic-BUwIbQvZ.js"
	},
	"/assets/add-app-CGUw7Uc8.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a3-x7gwz4xVA0qkTWmYM5oHsamDb/w\"",
		"mtime": "2026-11-10T11:57:08.616Z",
		"size": 419,
		"path": "../public/assets/add-app-CGUw7Uc8.js"
	},
	"/assets/admin-DKTGPXqd.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3a3e-kJVwtEBmZCb8MJfVBPR2eDXTFnU\"",
		"mtime": "2026-11-10T11:57:08.616Z",
		"size": 14910,
		"path": "../public/assets/admin-DKTGPXqd.js"
	},
	"/assets/admin.articles-DBPF64IE.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"447-gn9FdrDk/fQBmZkVWku6kCQqYaI\"",
		"mtime": "2026-11-10T11:57:08.616Z",
		"size": 1095,
		"path": "../public/assets/admin.articles-DBPF64IE.js"
	},
	"/assets/admin.articles.new-BbfS31GV.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"12a2-gDdBAAReaLchmDmDxAVqftSWubY\"",
		"mtime": "2026-11-10T11:57:08.616Z",
		"size": 4770,
		"path": "../public/assets/admin.articles.new-BbfS31GV.js"
	},
	"/assets/admin.pages-Dcvwnzwu.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a6-cWly1lWtnLbzwdcgKdb7tJXBGvc\"",
		"mtime": "2026-11-10T11:57:08.616Z",
		"size": 422,
		"path": "../public/assets/admin.pages-Dcvwnzwu.js"
	},
	"/assets/admin.pages-list-CLXfeJU8.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"16e-KN99OJOVBSxF345Rr9+co2DbopE\"",
		"mtime": "2026-11-10T11:57:08.616Z",
		"size": 366,
		"path": "../public/assets/admin.pages-list-CLXfeJU8.js"
	},
	"/assets/admin.sections-BvDrekdq.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"187-wRp4HGj9dyNCmzF+Y79IZ+pxjk0\"",
		"mtime": "2026-11-10T11:57:08.616Z",
		"size": 391,
		"path": "../public/assets/admin.sections-BvDrekdq.js"
	},
	"/assets/admin.topics-B9wvHrE8.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"18b-C1Yq3Lq7RZFcOSfWvlwEc2fHn/0\"",
		"mtime": "2026-11-10T11:57:08.616Z",
		"size": 395,
		"path": "../public/assets/admin.topics-B9wvHrE8.js"
	},
	"/assets/ai-C6Psjy58.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4018-NeXjqgGUtNBbx80XwM5e++3Ra7E\"",
		"mtime": "2026-11-10T11:57:08.617Z",
		"size": 16408,
		"path": "../public/assets/ai-C6Psjy58.js"
	},
	"/assets/anatomy-qmS6Vy-X.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"27d-g3c9gz14uOtVDoePLGIqsfeULA4\"",
		"mtime": "2026-11-10T11:57:08.617Z",
		"size": 637,
		"path": "../public/assets/anatomy-qmS6Vy-X.js"
	},
	"/assets/annotation-sys-DeJ9-YJy.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"184-7LulfyNUdxW4JDyuCrbrBb9RlaY\"",
		"mtime": "2026-11-10T11:57:08.617Z",
		"size": 388,
		"path": "../public/assets/annotation-sys-DeJ9-YJy.js"
	},
	"/favicon.png": {
		"type": "image/png",
		"etag": "\"e7c-rpz6kO3Q2jWZGiO7JLjaVb0cRkA\"",
		"mtime": "2026-11-10T11:57:11.009Z",
		"size": 3708,
		"path": "../public/favicon.png"
	},
	"/assets/AppShell-Bisoo_CH.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"98919-b0W1yxNj0zTR8eABsUAE3h4sLcM\"",
		"mtime": "2026-11-10T11:57:08.615Z",
		"size": 624921,
		"path": "../public/assets/AppShell-Bisoo_CH.js"
	},
	"/assets/articles-BBgzWZ9y.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"434-7T0Wo8KXWlXvh6uiJD0aYBidIFg\"",
		"mtime": "2026-11-10T11:57:08.617Z",
		"size": 1076,
		"path": "../public/assets/articles-BBgzWZ9y.js"
	},
	"/assets/articles-debug-QADaHtTW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"12f9-6v9bNtajgqJPU06qpKph+OVY93c\"",
		"mtime": "2026-11-10T11:57:08.617Z",
		"size": 4857,
		"path": "../public/assets/articles-debug-QADaHtTW.js"
	},
	"/assets/articles._slug-BLob33rf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"248-cFZPS3MnJALNa3SBRVkIWKRYpV8\"",
		"mtime": "2026-11-10T11:57:08.617Z",
		"size": 584,
		"path": "../public/assets/articles._slug-BLob33rf.js"
	},
	"/assets/articles.cellular-respiration-DimUPWH1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1fe1-+iiTcmG8jVvrM0ahI7qFkHDqCR0\"",
		"mtime": "2026-11-10T11:57:08.617Z",
		"size": 8161,
		"path": "../public/assets/articles.cellular-respiration-DimUPWH1.js"
	},
	"/assets/articles.enzyme-catalysis-D8oHNHGS.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e7f-EFIsec2yxHcqMTq3190C8eAmu68\"",
		"mtime": "2026-11-10T11:57:08.617Z",
		"size": 3711,
		"path": "../public/assets/articles.enzyme-catalysis-D8oHNHGS.js"
	},
	"/assets/articles.evolution-natural-selection-DlU9SCiS.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ede-0Rr/tyaxJG5txrGOFmyrICrOf9A\"",
		"mtime": "2026-11-10T11:57:08.617Z",
		"size": 3806,
		"path": "../public/assets/articles.evolution-natural-selection-DlU9SCiS.js"
	},
	"/assets/articles.food-chains-energy-flow-QkfuVacY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e99-nKY6UuxALdly9jTcqss9Ac/vO8E\"",
		"mtime": "2026-11-10T11:57:08.617Z",
		"size": 3737,
		"path": "../public/assets/articles.food-chains-energy-flow-QkfuVacY.js"
	},
	"/assets/articles.human-anatomy-systems-S4KhbBKd.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e86-IXPP/CL/0oJGg+dVH9eXOM1NJSM\"",
		"mtime": "2026-11-10T11:57:08.617Z",
		"size": 3718,
		"path": "../public/assets/articles.human-anatomy-systems-S4KhbBKd.js"
	},
	"/assets/articles.meiosis-gamete-formation-BaoLpChv.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e92-ZeU6rAEQ4/LL0Gqe2N9tyJScPgM\"",
		"mtime": "2026-11-10T11:57:08.617Z",
		"size": 3730,
		"path": "../public/assets/articles.meiosis-gamete-formation-BaoLpChv.js"
	},
	"/assets/articles.mitosis-cell-division-BZzhOOQW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ecb-GzqGJA+8fRN9+4UAqsIkL9dEkaw\"",
		"mtime": "2026-11-10T11:57:08.617Z",
		"size": 3787,
		"path": "../public/assets/articles.mitosis-cell-division-BZzhOOQW.js"
	},
	"/assets/auth-BywQH7O7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"182-1ONN6iL8RdXrMjztrrt5iDx+Cuo\"",
		"mtime": "2026-11-10T11:57:08.617Z",
		"size": 386,
		"path": "../public/assets/auth-BywQH7O7.js"
	},
	"/assets/auth-w2BNGNBv.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6b09-Uq5gr3xZFyLseqlHgf1Y6zIVbLg\"",
		"mtime": "2026-11-10T11:57:08.617Z",
		"size": 27401,
		"path": "../public/assets/auth-w2BNGNBv.js"
	},
	"/assets/biological-processes-DZQ02nMh.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"28a-SEH0mUUKvsQe6Q1H2Y2KuDXAlos\"",
		"mtime": "2026-11-10T11:57:08.617Z",
		"size": 650,
		"path": "../public/assets/biological-processes-DZQ02nMh.js"
	},
	"/assets/biopedia-data-DJbT4MOb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4c9-y0AzIPFEOC8TKUKvFonQwHo3RbA\"",
		"mtime": "2026-11-10T11:57:08.617Z",
		"size": 1225,
		"path": "../public/assets/biopedia-data-DJbT4MOb.js"
	},
	"/assets/articles.photosynthesis-light-reactions-DugKv2bQ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"eaa-sgp94LuDEU2Xwoc+rcvpWru80ac\"",
		"mtime": "2026-11-10T11:57:08.617Z",
		"size": 3754,
		"path": "../public/assets/articles.photosynthesis-light-reactions-DugKv2bQ.js"
	},
	"/assets/biotechnology-Cg3NAdH3.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"283-nudfBAcjyxRwoxUYMzbjdcx13ao\"",
		"mtime": "2026-11-10T11:57:08.618Z",
		"size": 643,
		"path": "../public/assets/biotechnology-Cg3NAdH3.js"
	},
	"/assets/button-Be0gWg6o.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"79f-AObJ1SpnH2MEOQwwQYxd0B+6OEM\"",
		"mtime": "2026-11-10T11:57:08.618Z",
		"size": 1951,
		"path": "../public/assets/button-Be0gWg6o.js"
	},
	"/assets/cat-ecology-DbnEUXHR.jpg": {
		"type": "image/jpeg",
		"etag": "\"2da9e-OCrQ+5HxBL/MeFpjI2Ml9mEB6CQ\"",
		"mtime": "2026-11-10T11:57:08.624Z",
		"size": 187038,
		"path": "../public/assets/cat-ecology-DbnEUXHR.jpg"
	},
	"/assets/cat-evolution-CC_w4loO.jpg": {
		"type": "image/jpeg",
		"etag": "\"2fdbd-seNsXnl4XHNUY71qgNreqGrRZEg\"",
		"mtime": "2026-11-10T11:57:08.624Z",
		"size": 196029,
		"path": "../public/assets/cat-evolution-CC_w4loO.jpg"
	},
	"/assets/cat-genetics-C6CBosmo.jpg": {
		"type": "image/jpeg",
		"etag": "\"281ff-qhaiIvZ8BDqFMGgfDXNC3bv5mFo\"",
		"mtime": "2026-11-10T11:57:08.624Z",
		"size": 164351,
		"path": "../public/assets/cat-genetics-C6CBosmo.jpg"
	},
	"/assets/cat-human-BuRMR2jH.jpg": {
		"type": "image/jpeg",
		"etag": "\"23326-4wTTr4zzrFQf89XTkJyXsX8rXHg\"",
		"mtime": "2026-11-10T11:57:08.625Z",
		"size": 144166,
		"path": "../public/assets/cat-human-BuRMR2jH.jpg"
	},
	"/assets/cat-organisms-yXH6lJcJ.jpg": {
		"type": "image/jpeg",
		"etag": "\"2acbe-1G/hL2bGRo8MkA9mSKQX6eYai7o\"",
		"mtime": "2026-11-10T11:57:08.625Z",
		"size": 175294,
		"path": "../public/assets/cat-organisms-yXH6lJcJ.jpg"
	},
	"/assets/catalog-BFqRb66N.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1388c-/nKYY74FNFK3/msZaGByh5HXyRY\"",
		"mtime": "2026-11-10T11:57:08.618Z",
		"size": 80012,
		"path": "../public/assets/catalog-BFqRb66N.js"
	},
	"/assets/cat-plants-Bu_hoilj.jpg": {
		"type": "image/jpeg",
		"etag": "\"3af5b-WyZ9BT5qxBZaWxxjuNNVL7/2IO0\"",
		"mtime": "2026-11-10T11:57:08.625Z",
		"size": 241499,
		"path": "../public/assets/cat-plants-Bu_hoilj.jpg"
	},
	"/assets/categories-B13_J04v.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3e2-LxZVYcf/iftlApX2w7ciROArcfY\"",
		"mtime": "2026-11-10T11:57:08.618Z",
		"size": 994,
		"path": "../public/assets/categories-B13_J04v.js"
	},
	"/assets/cells-microscopy-C17jO5F-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"286-LwiD2vsIBtD/4YahSwiuU62krPg\"",
		"mtime": "2026-11-10T11:57:08.618Z",
		"size": 646,
		"path": "../public/assets/cells-microscopy-C17jO5F-.js"
	},
	"/assets/chronos-os-BQHkXLoR.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f27-KlPYrrbqjnesb2zvarXAp1dyTS4\"",
		"mtime": "2026-11-10T11:57:08.618Z",
		"size": 3879,
		"path": "../public/assets/chronos-os-BQHkXLoR.js"
	},
	"/assets/chronos-os-download-CYzyyL1P.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1fa-aa1uJYTyZ1JSzGmOFZaS7zldxOg\"",
		"mtime": "2026-11-10T11:57:08.618Z",
		"size": 506,
		"path": "../public/assets/chronos-os-download-CYzyyL1P.js"
	},
	"/assets/communicational-system-DGa7a1oT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a2-n9YwQ7vGrFhtWMkaahx6F1UUWjE\"",
		"mtime": "2026-11-10T11:57:08.618Z",
		"size": 418,
		"path": "../public/assets/communicational-system-DGa7a1oT.js"
	},
	"/assets/createLucideIcon-JuoJIUQ-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4ce-tpxp/7wFcBQQFxNRCh7N1TO9Bb8\"",
		"mtime": "2026-11-10T11:57:08.618Z",
		"size": 1230,
		"path": "../public/assets/createLucideIcon-JuoJIUQ-.js"
	},
	"/assets/custom-lists-D_UAKp59.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b42-y4w+EIs+Zp8AbhY+a4zefh/tFZY\"",
		"mtime": "2026-11-10T11:57:08.618Z",
		"size": 2882,
		"path": "../public/assets/custom-lists-D_UAKp59.js"
	},
	"/assets/dashboard-vFcn8FyB.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"506-UEHQQ4dCvuWHmnrrbBG03WDP41M\"",
		"mtime": "2026-11-10T11:57:08.618Z",
		"size": 1286,
		"path": "../public/assets/dashboard-vFcn8FyB.js"
	},
	"/assets/decipher-CNkZt4t3.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"16f-ykCSDNm46AVfIgNZxXJ+PP3e4Bw\"",
		"mtime": "2026-11-10T11:57:08.618Z",
		"size": 367,
		"path": "../public/assets/decipher-CNkZt4t3.js"
	},
	"/assets/dev-dashboard-CGhi3HA4.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"10e0-ag1ikT5XYP7PDOwBna7/aqCk99U\"",
		"mtime": "2026-11-10T11:57:08.618Z",
		"size": 4320,
		"path": "../public/assets/dev-dashboard-CGhi3HA4.js"
	},
	"/assets/dev-tools-D_xp6gEz.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"13a7-wZa3jAi2QPfST9ZsfAvio9fmc8o\"",
		"mtime": "2026-11-10T11:57:08.618Z",
		"size": 5031,
		"path": "../public/assets/dev-tools-D_xp6gEz.js"
	},
	"/assets/discovery-leaf-B4lyAWC2.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3b-my347b2NUKvD+XRT+D6BbNxbmjg\"",
		"mtime": "2026-11-10T11:57:08.618Z",
		"size": 59,
		"path": "../public/assets/discovery-leaf-B4lyAWC2.js"
	},
	"/assets/discovery-leaf-CDLQK6NX.jpg": {
		"type": "image/jpeg",
		"etag": "\"292a2-sl75CS6OW2pQPTWnj52a0F63jwo\"",
		"mtime": "2026-11-10T11:57:08.625Z",
		"size": 168610,
		"path": "../public/assets/discovery-leaf-CDLQK6NX.jpg"
	},
	"/assets/dist-Cq2m6oEo.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b58-XdBtBB9sJADTWO52F4SvjSXw/FE\"",
		"mtime": "2026-11-10T11:57:08.618Z",
		"size": 2904,
		"path": "../public/assets/dist-Cq2m6oEo.js"
	},
	"/assets/dist-D3WHiKOD2.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2da-En0frj9EWI218DTV6qQLTLX4vLg\"",
		"mtime": "2026-11-10T11:57:08.618Z",
		"size": 730,
		"path": "../public/assets/dist-D3WHiKOD2.js"
	},
	"/assets/download-DAjXj2Ay.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1044-2hH0vvBJslACPu3iYJ4SqZizLTU\"",
		"mtime": "2026-11-10T11:57:08.619Z",
		"size": 4164,
		"path": "../public/assets/download-DAjXj2Ay.js"
	},
	"/assets/downloadable-software-CPBuXdE6.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"680-2mwYRqvEokjwR7GdKTqHa9j7dog\"",
		"mtime": "2026-11-10T11:57:08.619Z",
		"size": 1664,
		"path": "../public/assets/downloadable-software-CPBuXdE6.js"
	},
	"/assets/ecology-environment-BtBX_EXj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"289-4byzqUy8cCskZLIR84DHgHpQ+8A\"",
		"mtime": "2026-11-10T11:57:08.619Z",
		"size": 649,
		"path": "../public/assets/ecology-environment-BtBX_EXj.js"
	},
	"/assets/eng-grammar-B1tMmnMx.jpg": {
		"type": "image/jpeg",
		"etag": "\"74c1-XK8BNB8ZAYcd/TE7F0EdV/8Ul8I\"",
		"mtime": "2026-11-10T11:57:08.626Z",
		"size": 29889,
		"path": "../public/assets/eng-grammar-B1tMmnMx.jpg"
	},
	"/assets/eng-literature-BajHjXyN.jpg": {
		"type": "image/jpeg",
		"etag": "\"cc62-NF9kB2OyFm1zMZ+Oih1ZHorruYg\"",
		"mtime": "2026-11-10T11:57:08.626Z",
		"size": 52322,
		"path": "../public/assets/eng-literature-BajHjXyN.jpg"
	},
	"/assets/eng-poetry-BQYnMCQa.jpg": {
		"type": "image/jpeg",
		"etag": "\"10239-W3/DnYSqaKLw+1EOhXvOc98a4PU\"",
		"mtime": "2026-11-10T11:57:08.626Z",
		"size": 66105,
		"path": "../public/assets/eng-poetry-BQYnMCQa.jpg"
	},
	"/assets/eng-writing-DkEjUsar.jpg": {
		"type": "image/jpeg",
		"etag": "\"9cc3-ee85EOsBs2794hyQ7ENTiSRcMx8\"",
		"mtime": "2026-11-10T11:57:08.626Z",
		"size": 40131,
		"path": "../public/assets/eng-writing-DkEjUsar.jpg"
	},
	"/assets/evolution-DxZ3RC-V.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"27f-3ZBd4lVnZGo0taRDNj9EbJB4R34\"",
		"mtime": "2026-11-10T11:57:08.619Z",
		"size": 639,
		"path": "../public/assets/evolution-DxZ3RC-V.js"
	},
	"/assets/extension-tools-upload-DQ-KDIYX.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"19b-fS3UmypYivsytdDvMTXOxuN9w1Q\"",
		"mtime": "2026-11-10T11:57:08.619Z",
		"size": 411,
		"path": "../public/assets/extension-tools-upload-DQ-KDIYX.js"
	},
	"/assets/extensions-DcK2lBSW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"46-ZgjQj+RINVNuOSj8x7PT0qHzd6s\"",
		"mtime": "2026-11-10T11:57:08.620Z",
		"size": 70,
		"path": "../public/assets/extensions-DcK2lBSW.js"
	},
	"/assets/docs-C1jAzPIm.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8576f-7hOu50Ljg7HT9Vz4EInn31PfJSA\"",
		"mtime": "2026-11-10T11:57:08.618Z",
		"size": 546671,
		"path": "../public/assets/docs-C1jAzPIm.js"
	},
	"/assets/extensions.noter---vN1N3D.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"46-KnMwgmuSSSaMlXF5EgYRfNuSA4U\"",
		"mtime": "2026-11-10T11:57:08.620Z",
		"size": 70,
		"path": "../public/assets/extensions.noter---vN1N3D.js"
	},
	"/assets/flashcards-DTat6Rmt.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"44f-yyPvUOyR5P8vZV/0VD1Kz5adgzQ\"",
		"mtime": "2026-11-10T11:57:08.620Z",
		"size": 1103,
		"path": "../public/assets/flashcards-DTat6Rmt.js"
	},
	"/assets/glossary-D7BmeVsd.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"36b-ZtvgGheJDEn51sSaxV4gKNBlfqc\"",
		"mtime": "2026-11-10T11:57:08.620Z",
		"size": 875,
		"path": "../public/assets/glossary-D7BmeVsd.js"
	},
	"/assets/genetics-dna-tfFyAWO7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"282-x86ux/rng2YHUsQo/gf1i8kvzec\"",
		"mtime": "2026-11-10T11:57:08.620Z",
		"size": 642,
		"path": "../public/assets/genetics-dna-tfFyAWO7.js"
	},
	"/assets/graphication-Ygs7ge-I.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"179-h6kec7EHckxzHBMXVVqiUSspYRw\"",
		"mtime": "2026-11-10T11:57:08.620Z",
		"size": 377,
		"path": "../public/assets/graphication-Ygs7ge-I.js"
	},
	"/assets/help-center-SZ_TQVf7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"14c1-6s1r50ITjPuvOe9EJ8Vas9YkgVw\"",
		"mtime": "2026-11-10T11:57:08.620Z",
		"size": 5313,
		"path": "../public/assets/help-center-SZ_TQVf7.js"
	},
	"/assets/hero-cell-BewOnWpW.jpg": {
		"type": "image/jpeg",
		"etag": "\"40c11-gRZUnBDNdykEsTfNLMgxrZ+4OcU\"",
		"mtime": "2026-11-10T11:57:08.626Z",
		"size": 265233,
		"path": "../public/assets/hero-cell-BewOnWpW.jpg"
	},
	"/assets/his-ancient-D_3kmTQu.jpg": {
		"type": "image/jpeg",
		"etag": "\"124b1-VN0HL9ZUiqcfpgKsq+4JPZ2wA70\"",
		"mtime": "2026-11-10T11:57:08.627Z",
		"size": 74929,
		"path": "../public/assets/his-ancient-D_3kmTQu.jpg"
	},
	"/assets/his-medieval-Z1UQ46lz.jpg": {
		"type": "image/jpeg",
		"etag": "\"94dd-hwSoe+zL6tyOotdQvEYv56k0YhM\"",
		"mtime": "2026-11-10T11:57:08.627Z",
		"size": 38109,
		"path": "../public/assets/his-medieval-Z1UQ46lz.jpg"
	},
	"/assets/his-revolutions-BKB1brIf.jpg": {
		"type": "image/jpeg",
		"etag": "\"f396-a6hL0Vst70K1o9x2ypegAAHcKWs\"",
		"mtime": "2026-11-10T11:57:08.627Z",
		"size": 62358,
		"path": "../public/assets/his-revolutions-BKB1brIf.jpg"
	},
	"/assets/his-wars-Dja4_BlN.jpg": {
		"type": "image/jpeg",
		"etag": "\"e5ca-2jcnizpZCZIyPz3NRRyhh6p2aUw\"",
		"mtime": "2026-11-10T11:57:08.627Z",
		"size": 58826,
		"path": "../public/assets/his-wars-Dja4_BlN.jpg"
	},
	"/assets/human-biology-BsbSL_fK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"283-+M9LDAqbnTIuqLDbCeikcZUHfFU\"",
		"mtime": "2026-11-10T11:57:08.620Z",
		"size": 643,
		"path": "../public/assets/human-biology-BsbSL_fK.js"
	},
	"/assets/ide-system-Dc7Vm-ub.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a1-D8Q4lMqwSU+E7qOftu4kiN+J5io\"",
		"mtime": "2026-11-10T11:57:08.620Z",
		"size": 417,
		"path": "../public/assets/ide-system-Dc7Vm-ub.js"
	},
	"/assets/images-xGwTEqeS.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6c7-Pk/YMa5itOlpzK6ZTBCO7vItja8\"",
		"mtime": "2026-11-10T11:57:08.620Z",
		"size": 1735,
		"path": "../public/assets/images-xGwTEqeS.js"
	},
	"/assets/index-YOJu0RmE.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"601c9-1/gweuJu9O7pGrBz3U6zfQNScjU\"",
		"mtime": "2026-11-10T11:57:08.614Z",
		"size": 393673,
		"path": "../public/assets/index-YOJu0RmE.js"
	},
	"/assets/information-use-BQxBFuPA.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"413-svOvEfC4MrqFZxnoQIkX32Wr3Vs\"",
		"mtime": "2026-11-10T11:57:08.620Z",
		"size": 1043,
		"path": "../public/assets/information-use-BQxBFuPA.js"
	},
	"/assets/input-DKsO0Upl.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"283-09KTFpqzw1laSy0r/KHCq26ggXU\"",
		"mtime": "2026-11-10T11:57:08.620Z",
		"size": 643,
		"path": "../public/assets/input-DKsO0Upl.js"
	},
	"/assets/jsx-runtime-Cx0BB4qO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"440-7GwVHNgO4EUMk3cR4Bh6KGJPPX4\"",
		"mtime": "2026-11-10T11:57:08.620Z",
		"size": 1088,
		"path": "../public/assets/jsx-runtime-Cx0BB4qO.js"
	},
	"/assets/label-IUt44KSa.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2e6-MddAMi5zKwcqQ3LOSDZ/RkhK2ig\"",
		"mtime": "2026-11-10T11:57:08.621Z",
		"size": 742,
		"path": "../public/assets/label-IUt44KSa.js"
	},
	"/assets/languages-C_t30eTi.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1f3-FiwLFR33NX1kkURczby1sSonapQ\"",
		"mtime": "2026-11-10T11:57:08.621Z",
		"size": 499,
		"path": "../public/assets/languages-C_t30eTi.js"
	},
	"/assets/layout-DXAxwvAe.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f2-8ISpLoa0kd2k0Mr5Ty57sKAspaE\"",
		"mtime": "2026-11-10T11:57:08.621Z",
		"size": 242,
		"path": "../public/assets/layout-DXAxwvAe.js"
	},
	"/assets/link-rIiCKqw9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"68f4-ZYKsQZ+TV/tZPbaWWWTi5guxZj8\"",
		"mtime": "2026-11-10T11:57:08.621Z",
		"size": 26868,
		"path": "../public/assets/link-rIiCKqw9.js"
	},
	"/assets/llm-CjMykHQm.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2ebb-4UCVcKkTjZNfB5z70h7KSLvAVmU\"",
		"mtime": "2026-11-10T11:57:08.622Z",
		"size": 11963,
		"path": "../public/assets/llm-CjMykHQm.js"
	},
	"/assets/logo-tedslab-CSGR30te.png": {
		"type": "image/png",
		"etag": "\"7caa0-7zdWgbobOh6pFHVZufJZw3PL3lM\"",
		"mtime": "2026-11-10T11:57:08.627Z",
		"size": 510624,
		"path": "../public/assets/logo-tedslab-CSGR30te.png"
	},
	"/assets/knowledge-atlas-n4owY-H1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c98c0-MsbPfxDoJ7TUrFZThkSmTijAmG0\"",
		"mtime": "2026-11-10T11:57:08.620Z",
		"size": 825536,
		"path": "../public/assets/knowledge-atlas-n4owY-H1.js"
	},
	"/assets/lost-atlas-CVORu3Qh.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"15e4-6sngmNHyqsNliSO2NWAhE9NVzms\"",
		"mtime": "2026-11-10T11:57:08.622Z",
		"size": 5604,
		"path": "../public/assets/lost-atlas-CVORu3Qh.js"
	},
	"/assets/lost-atlas._slug-KXrzQhqx.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"165b-YWz3WG5ZzTjHoA2+5MOJwP62T1o\"",
		"mtime": "2026-11-10T11:57:08.622Z",
		"size": 5723,
		"path": "../public/assets/lost-atlas._slug-KXrzQhqx.js"
	},
	"/assets/maps-NL83ZVCc.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"16e-5QoLn5OuOU82xmqNv+CYhQROIFU\"",
		"mtime": "2026-11-10T11:57:08.622Z",
		"size": 366,
		"path": "../public/assets/maps-NL83ZVCc.js"
	},
	"/assets/math-algebra-Bht1HCz8.jpg": {
		"type": "image/jpeg",
		"etag": "\"2d35a-PvVYI2LrpcoD2wanQQ7xOYpbYIE\"",
		"mtime": "2026-11-10T11:57:08.628Z",
		"size": 185178,
		"path": "../public/assets/math-algebra-Bht1HCz8.jpg"
	},
	"/assets/math-calculus-B1M0mWMY.jpg": {
		"type": "image/jpeg",
		"etag": "\"5b9d-bVTaXEAGiT9VR5oaj+FZmqSlB0U\"",
		"mtime": "2026-11-10T11:57:08.628Z",
		"size": 23453,
		"path": "../public/assets/math-calculus-B1M0mWMY.jpg"
	},
	"/assets/math-geometry-SGeNwC3o.jpg": {
		"type": "image/jpeg",
		"etag": "\"2ba46-mIRTtF52sxAW70KWKjzJOualsJs\"",
		"mtime": "2026-11-10T11:57:08.628Z",
		"size": 178758,
		"path": "../public/assets/math-geometry-SGeNwC3o.jpg"
	},
	"/assets/math-statistics-BlqoBDEB.jpg": {
		"type": "image/jpeg",
		"etag": "\"9615-x8xInAeJEUklmLWM3NTCzpQDzVI\"",
		"mtime": "2026-11-10T11:57:08.628Z",
		"size": 38421,
		"path": "../public/assets/math-statistics-BlqoBDEB.jpg"
	},
	"/assets/network-g5FCqnHj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"172-6MlFOuiWBiFEKmgk/Xp+rN36TPU\"",
		"mtime": "2026-11-10T11:57:08.622Z",
		"size": 370,
		"path": "../public/assets/network-g5FCqnHj.js"
	},
	"/assets/not-found-i5RsCZif.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"76-Trmr7GZIBZuvfg4uM18tBiRtOXg\"",
		"mtime": "2026-11-10T11:57:08.622Z",
		"size": 118,
		"path": "../public/assets/not-found-i5RsCZif.js"
	},
	"/assets/notebook-Bne9a5dj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"763-zUD6AZhv84JyedzzyH6C8UFdkKk\"",
		"mtime": "2026-11-10T11:57:08.622Z",
		"size": 1891,
		"path": "../public/assets/notebook-Bne9a5dj.js"
	},
	"/assets/organisms-Cs3pJQZA.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"27f-HcuG+NljbXuzyWXRquYTDdmTdAc\"",
		"mtime": "2026-11-10T11:57:08.622Z",
		"size": 639,
		"path": "../public/assets/organisms-Cs3pJQZA.js"
	},
	"/assets/page-MGgh5JXn.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"13fb-DO+CbfG7t/yC/387llBK16v6AYQ\"",
		"mtime": "2026-11-10T11:57:08.622Z",
		"size": 5115,
		"path": "../public/assets/page-MGgh5JXn.js"
	},
	"/assets/pages-BY9rh9_N.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5d2-nZcOh0riJqU0YV31FR2E75uw+DQ\"",
		"mtime": "2026-11-10T11:57:08.622Z",
		"size": 1490,
		"path": "../public/assets/pages-BY9rh9_N.js"
	},
	"/assets/pages._slug-8M0c68mm.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"241-Mx7853tK2ktFA4iHD1nr+Uee2Bg\"",
		"mtime": "2026-11-10T11:57:08.622Z",
		"size": 577,
		"path": "../public/assets/pages._slug-8M0c68mm.js"
	},
	"/assets/pages._slug-vGE-D7zp.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2eb-tkwHFYPyslhSCQf53IyPDDzgBnY\"",
		"mtime": "2026-11-10T11:57:08.622Z",
		"size": 747,
		"path": "../public/assets/pages._slug-vGE-D7zp.js"
	},
	"/assets/photosynthese-CcMzPF9w.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4f-GEZONCCi7UK3RHu1cSWDI3rr3Vs\"",
		"mtime": "2026-11-10T11:57:08.622Z",
		"size": 79,
		"path": "../public/assets/photosynthese-CcMzPF9w.js"
	},
	"/assets/photosynthese-m1ppG_nG.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"252f-4IbK/lzeypDCf/oB3QN6r9XwgDE\"",
		"mtime": "2026-11-10T11:57:08.622Z",
		"size": 9519,
		"path": "../public/assets/photosynthese-m1ppG_nG.js"
	},
	"/assets/photosynthesis-CcMzPF9w.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4f-GEZONCCi7UK3RHu1cSWDI3rr3Vs\"",
		"mtime": "2026-11-10T11:57:08.622Z",
		"size": 79,
		"path": "../public/assets/photosynthesis-CcMzPF9w.js"
	},
	"/assets/plants-CM9T7ZsB.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"27c-lycbb5st5GaDNwnf2HnmYl0xi/g\"",
		"mtime": "2026-11-10T11:57:08.622Z",
		"size": 636,
		"path": "../public/assets/plants-CM9T7ZsB.js"
	},
	"/assets/policy-_RNngbG5.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"414-hTxGDo/b6CLgSZCAzOnZd9K096w\"",
		"mtime": "2026-11-10T11:57:08.622Z",
		"size": 1044,
		"path": "../public/assets/policy-_RNngbG5.js"
	},
	"/assets/privacy-OyYHv8QM.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"407-uL+0AtPv3n8dPG+umv98cSAGlvQ\"",
		"mtime": "2026-11-10T11:57:08.622Z",
		"size": 1031,
		"path": "../public/assets/privacy-OyYHv8QM.js"
	},
	"/assets/quizzes-Cpe2hALK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"91f-QxNopm42iFwRajfJheLl06LzT0E\"",
		"mtime": "2026-11-10T11:57:08.622Z",
		"size": 2335,
		"path": "../public/assets/quizzes-Cpe2hALK.js"
	},
	"/assets/react-3BKWdGy3.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1d67-7y5khacUeAI0naE7zvk9aPM2omk\"",
		"mtime": "2026-11-10T11:57:08.623Z",
		"size": 7527,
		"path": "../public/assets/react-3BKWdGy3.js"
	},
	"/assets/redirect-Dhm19zUi.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1f4-ePZWCXP5uehkmkGMkMl5xDch+/Y\"",
		"mtime": "2026-11-10T11:57:08.623Z",
		"size": 500,
		"path": "../public/assets/redirect-Dhm19zUi.js"
	},
	"/assets/root-DLTE-HSj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"20-vSYConOtSP6ciwr9zKsPixNwWmc\"",
		"mtime": "2026-11-10T11:57:08.623Z",
		"size": 32,
		"path": "../public/assets/root-DLTE-HSj.js"
	},
	"/assets/routes-DomP_g7b.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3f91-0R5zuMJUOx+Dc53izHM+uhkf+DE\"",
		"mtime": "2026-11-10T11:57:08.623Z",
		"size": 16273,
		"path": "../public/assets/routes-DomP_g7b.js"
	},
	"/assets/saved-BXGqsoI0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"548-hbcricwDSRbc6v6e/Wb+FwrWe+c\"",
		"mtime": "2026-11-10T11:57:08.623Z",
		"size": 1352,
		"path": "../public/assets/saved-BXGqsoI0.js"
	},
	"/assets/sci-chemistry-DGer7X6m.jpg": {
		"type": "image/jpeg",
		"etag": "\"e531-uGB6rS2e12MOCOGeglkmNegaRSo\"",
		"mtime": "2026-11-10T11:57:08.628Z",
		"size": 58673,
		"path": "../public/assets/sci-chemistry-DGer7X6m.jpg"
	},
	"/assets/sci-earth-G0pK22sY.jpg": {
		"type": "image/jpeg",
		"etag": "\"db7f-wXmT2IjaOS6hzPumkxA6nP8tkNs\"",
		"mtime": "2026-11-10T11:57:08.629Z",
		"size": 56191,
		"path": "../public/assets/sci-earth-G0pK22sY.jpg"
	},
	"/assets/sci-method-DJPtNKgn.jpg": {
		"type": "image/jpeg",
		"etag": "\"65e5-3SjBWTNfnBOULOyVptfI2A1b/Vc\"",
		"mtime": "2026-11-10T11:57:08.629Z",
		"size": 26085,
		"path": "../public/assets/sci-method-DJPtNKgn.jpg"
	},
	"/assets/sci-physics-egMuwKm5.jpg": {
		"type": "image/jpeg",
		"etag": "\"8002-mpTyuxFNaEQb/wliH6KcUwSpEdA\"",
		"mtime": "2026-11-10T11:57:08.629Z",
		"size": 32770,
		"path": "../public/assets/sci-physics-egMuwKm5.jpg"
	},
	"/assets/settings-lSRzIonr.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7de-Sgr+/cqLUumSVri3wIdd/lku0NI\"",
		"mtime": "2026-11-10T11:57:08.623Z",
		"size": 2014,
		"path": "../public/assets/settings-lSRzIonr.js"
	},
	"/assets/signup-CRSMSIg7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"18b-ONXl8xigYNsqemAB3p+JpqAWPQI\"",
		"mtime": "2026-11-10T11:57:08.623Z",
		"size": 395,
		"path": "../public/assets/signup-CRSMSIg7.js"
	},
	"/assets/soft-os-addition-R1wYIKjP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"192-C7JYDUzjLOdrjs+8hjBv3Gi8608\"",
		"mtime": "2026-11-10T11:57:08.623Z",
		"size": 402,
		"path": "../public/assets/soft-os-addition-R1wYIKjP.js"
	},
	"/assets/styles-CSPOQGpI.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"1ea87-lf84BK11CPno2hLfQkANtOl/U3w\"",
		"mtime": "2026-11-10T11:57:08.629Z",
		"size": 125575,
		"path": "../public/assets/styles-CSPOQGpI.css"
	},
	"/assets/species-scan-0ICkoeJf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"18d-YEWVDUZOxD3cOtKSgYkX83SQxSw\"",
		"mtime": "2026-11-10T11:57:08.623Z",
		"size": 397,
		"path": "../public/assets/species-scan-0ICkoeJf.js"
	},
	"/assets/tech-ai-N3_TfYIB.jpg": {
		"type": "image/jpeg",
		"etag": "\"f480-XFMqfN4HU/xKZCm+qV91Y8qyT6s\"",
		"mtime": "2026-11-10T11:57:08.629Z",
		"size": 62592,
		"path": "../public/assets/tech-ai-N3_TfYIB.jpg"
	},
	"/assets/tech-computing-BxqdUC2U.jpg": {
		"type": "image/jpeg",
		"etag": "\"19004-Vbz9mxUEKBzQVVPKauFw6hj+b+c\"",
		"mtime": "2026-11-10T11:57:08.629Z",
		"size": 102404,
		"path": "../public/assets/tech-computing-BxqdUC2U.jpg"
	},
	"/assets/tech-computing-CtHh0Hcn.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3b-rTsmoL0P1YPRMfLKNXGnFHutF0Y\"",
		"mtime": "2026-11-10T11:57:08.623Z",
		"size": 59,
		"path": "../public/assets/tech-computing-CtHh0Hcn.js"
	},
	"/assets/tech-programming-Cf7Rx_zT.jpg": {
		"type": "image/jpeg",
		"etag": "\"10fd9-Zmup00l2jDFH6bYOkb55tsdWm4A\"",
		"mtime": "2026-11-10T11:57:08.629Z",
		"size": 69593,
		"path": "../public/assets/tech-programming-Cf7Rx_zT.jpg"
	},
	"/assets/tech-security-DpkuyTLX.jpg": {
		"type": "image/jpeg",
		"etag": "\"1198b-ZlcjLSmzw82L+/mv+fDruoW5SQM\"",
		"mtime": "2026-11-10T11:57:08.629Z",
		"size": 72075,
		"path": "../public/assets/tech-security-DpkuyTLX.jpg"
	},
	"/assets/translate-yBMaM36X.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"111d-e9nYUn4c7EwbnvNZ+6Sg1MLF2AY\"",
		"mtime": "2026-11-10T11:57:08.623Z",
		"size": 4381,
		"path": "../public/assets/translate-yBMaM36X.js"
	},
	"/assets/tutorials-Lqxorhby.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"abf-WnfDwGFo7aAAsHJiaaUWYnrqKnc\"",
		"mtime": "2026-11-10T11:57:08.623Z",
		"size": 2751,
		"path": "../public/assets/tutorials-Lqxorhby.js"
	},
	"/assets/tutorials._slug-HqrYlH0g.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"aaa-BnrHlOeZHNK/lGYLxnKPC9/OxdI\"",
		"mtime": "2026-11-10T11:57:08.624Z",
		"size": 2730,
		"path": "../public/assets/tutorials._slug-HqrYlH0g.js"
	},
	"/assets/underline-BdeKrIeT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2b2-JJZS7NaNnKOZdl94ZnFllRZTMhY\"",
		"mtime": "2026-11-10T11:57:08.624Z",
		"size": 690,
		"path": "../public/assets/underline-BdeKrIeT.js"
	},
	"/assets/update-soft-DDE0CpBA.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"191-tu6duoOoTAwEmA1J5DM1L9Nl4fg\"",
		"mtime": "2026-11-10T11:57:08.624Z",
		"size": 401,
		"path": "../public/assets/update-soft-DDE0CpBA.js"
	},
	"/assets/use-auth-Cku7PGoB.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"386-913pD9RY0lwQzvbeGEgZbUi9whI\"",
		"mtime": "2026-11-10T11:57:08.624Z",
		"size": 902,
		"path": "../public/assets/use-auth-Cku7PGoB.js"
	},
	"/assets/videos-DQ3KV6Ja.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"574-+xkblAPYUpVjwWj/2eA9X6DbX8o\"",
		"mtime": "2026-11-10T11:57:08.624Z",
		"size": 1396,
		"path": "../public/assets/videos-DQ3KV6Ja.js"
	},
	"/assets/timeline-D_MEgfTU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3a2-MsjZunsEpMZN1aLqK60GN7KKcRA\"",
		"mtime": "2026-11-10T11:57:08.623Z",
		"size": 930,
		"path": "../public/assets/timeline-D_MEgfTU.js"
	},
	"/assets/videos._slug-TT_pFocW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"645-nRucj75YZBUTPJMh+zMc7/1w470\"",
		"mtime": "2026-11-10T11:57:08.624Z",
		"size": 1605,
		"path": "../public/assets/videos._slug-TT_pFocW.js"
	},
	"/assets/wifi-DFEI86NU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"422-avpG7kI3wzBCbqV3GvVIT0e3lMY\"",
		"mtime": "2026-11-10T11:57:08.624Z",
		"size": 1058,
		"path": "../public/assets/wifi-DFEI86NU.js"
	},
	"/download logo/tedslab-download.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"186-lFbVj+z0p+x0csdNfeWXqB+VpkI\"",
		"mtime": "2026-11-10T11:57:11.002Z",
		"size": 390,
		"path": "../public/download logo/tedslab-download.txt"
	},
	"/download logo/tedslab.png": {
		"type": "image/png",
		"etag": "\"11ba99-an7wcjiulP40vrDMKyC07RnqWvo\"",
		"mtime": "2026-11-10T11:57:11.014Z",
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
