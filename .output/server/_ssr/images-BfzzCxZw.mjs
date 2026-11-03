import { t as discovery_leaf_default } from "./discovery-leaf-CqF-kPld.mjs";
import { t as tech_computing_default } from "./tech-computing-DpkU6ve8.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/images-BfzzCxZw.js
var hero_cell_default = "/assets/hero-cell-BewOnWpW.jpg";
var imageMap = {
	"hero-cell": hero_cell_default,
	"cat-organisms": "/assets/cat-organisms-yXH6lJcJ.jpg",
	"cat-genetics": "/assets/cat-genetics-C6CBosmo.jpg",
	"cat-human": "/assets/cat-human-BuRMR2jH.jpg",
	"cat-plants": "/assets/cat-plants-Bu_hoilj.jpg",
	"cat-ecology": "/assets/cat-ecology-DbnEUXHR.jpg",
	"cat-evolution": "/assets/cat-evolution-CC_w4loO.jpg",
	"discovery-leaf": discovery_leaf_default,
	"math-algebra": "/assets/math-algebra-Bht1HCz8.jpg",
	"math-geometry": "/assets/math-geometry-SGeNwC3o.jpg",
	"math-calculus": "/assets/math-calculus-B1M0mWMY.jpg",
	"math-statistics": "/assets/math-statistics-BlqoBDEB.jpg",
	"sci-physics": "/assets/sci-physics-egMuwKm5.jpg",
	"sci-chemistry": "/assets/sci-chemistry-DGer7X6m.jpg",
	"sci-earth": "/assets/sci-earth-G0pK22sY.jpg",
	"sci-method": "/assets/sci-method-DJPtNKgn.jpg",
	"eng-literature": "/assets/eng-literature-BajHjXyN.jpg",
	"eng-poetry": "/assets/eng-poetry-BQYnMCQa.jpg",
	"eng-grammar": "/assets/eng-grammar-B1tMmnMx.jpg",
	"eng-writing": "/assets/eng-writing-DkEjUsar.jpg",
	"his-ancient": "/assets/his-ancient-D_3kmTQu.jpg",
	"his-medieval": "/assets/his-medieval-Z1UQ46lz.jpg",
	"his-revolutions": "/assets/his-revolutions-BKB1brIf.jpg",
	"his-wars": "/assets/his-wars-Dja4_BlN.jpg",
	"tech-computing": tech_computing_default,
	"tech-programming": "/assets/tech-programming-Cf7Rx_zT.jpg",
	"tech-ai": "/assets/tech-ai-N3_TfYIB.jpg",
	"tech-security": "/assets/tech-security-DpkuyTLX.jpg"
};
var imageKeys = Object.keys(imageMap);
/** Default artwork key per subject, used when a row has no image of its own. */
var subjectImageKey = {
	biology: "hero-cell",
	mathematics: "math-algebra",
	science: "sci-physics",
	english: "eng-literature",
	history: "his-ancient",
	technology: "tech-computing"
};
/** Resolve an image: an explicit URL wins, then a built-in key, then a fallback. */
function resolveImage(imageUrl, imageKey) {
	const url = imageUrl?.trim();
	if (url && !url.includes("placehold.co")) return url;
	if (imageKey && imageMap[imageKey]) return imageMap[imageKey];
	return hero_cell_default;
}
//#endregion
export { subjectImageKey as i, imageKeys as n, resolveImage as r, hero_cell_default as t };
