import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { n as useLanguage } from "./LanguageContext-C6BSyEfd.mjs";
import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { L as Heart } from "../_libs/lucide-react.mjs";
import { s as useFavorites, t as PublicLayout } from "./PublicLayout-Ax7Pira8.mjs";
import { a as useDealership } from "./DealershipContext-CZIneh0B.mjs";
import { n as CompareTray, t as CarCard } from "./CarCard-B0lyScjE.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/wishlist-CUeDS5Ux.js
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/routes/wishlist.tsx?tsr-split=component";
function WishlistPage() {
	const { t } = useLanguage();
	const { cars } = useDealership();
	const list = useFavorites().map((id) => cars.find((c) => c.id === id)).filter(Boolean);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(PublicLayout, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
		className: "mx-auto max-w-7xl px-4 sm:px-6 py-12 md:py-16",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "flex items-center gap-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Heart, { className: "h-8 w-8 text-red-500 fill-red-500" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 21,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
					className: "text-3xl sm:text-4xl font-bold",
					children: t("navWishlist")
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 22,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
					className: "ml-2 px-2.5 py-0.5 rounded-full bg-secondary text-sm font-semibold",
					children: list.length
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 23,
					columnNumber: 11
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 20,
			columnNumber: 9
		}, this), list.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "mt-12 text-center py-20 bg-card rounded-2xl border border-border",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Heart, { className: "h-10 w-10 mx-auto text-muted-foreground" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 27,
					columnNumber: 13
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "mt-5 text-muted-foreground",
					children: [t("favsOnly"), "."]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 28,
					columnNumber: 13
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
					to: "/cars",
					className: "mt-5 inline-block text-sm font-semibold text-primary hover:text-accent",
					children: [t("btnBrowse"), " →"]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 29,
					columnNumber: 13
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 26,
			columnNumber: 30
		}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3",
			children: list.map((c) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CarCard, { car: c }, c.id, false, {
				fileName: _jsxFileName,
				lineNumber: 31,
				columnNumber: 28
			}, this))
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 30,
			columnNumber: 20
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 19,
		columnNumber: 7
	}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CompareTray, {}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 34,
		columnNumber: 7
	}, this)] }, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 18,
		columnNumber: 10
	}, this);
}
//#endregion
export { WishlistPage as component };
