import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { n as useLanguage } from "./LanguageContext-C6BSyEfd.mjs";
import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as X, z as GitCompare } from "../_libs/lucide-react.mjs";
import { n as clearCompare, o as useCompareList, t as PublicLayout } from "./PublicLayout-Ax7Pira8.mjs";
import { a as useDealership, i as formatPrice, r as formatMiles } from "./DealershipContext-CZIneh0B.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/compare-DL3d8Auc.js
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/routes/compare.tsx?tsr-split=component";
function ComparePage() {
	const { t } = useLanguage();
	const { cars } = useDealership();
	const ids = useCompareList();
	const list = ids.map((id) => cars.find((c) => c.id === id)).filter(Boolean);
	const attrs = [
		{
			key: "title",
			label: t("description") === "Description" ? "Model" : t("description")
		},
		{
			key: "year",
			label: t("specYear")
		},
		{
			key: "mileage",
			label: t("specMileage")
		},
		{
			key: "price",
			label: "Price"
		},
		{
			key: "category",
			label: t("specCategory")
		},
		{
			key: "engine",
			label: t("specEngine")
		},
		{
			key: "transmission",
			label: t("specTransmission")
		},
		{
			key: "condition",
			label: t("specCondition")
		}
	];
	const fmt = (val, k) => {
		if (val == null || val === "") return "—";
		if (k === "price") return formatPrice(Number(val));
		if (k === "mileage") return formatMiles(Number(val));
		return String(val);
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(PublicLayout, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
		className: "mx-auto max-w-7xl px-4 sm:px-6 py-12 md:py-16",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "flex items-center justify-between flex-wrap gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(GitCompare, { className: "h-7 w-7 text-accent" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 54,
					columnNumber: 13
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
					className: "text-3xl sm:text-4xl font-bold",
					children: t("compareTitle")
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 55,
					columnNumber: 13
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 53,
				columnNumber: 11
			}, this), ids.length > 0 && /* @__PURE__ */ (void 0)("button", {
				onClick: clearCompare,
				className: "text-sm font-semibold text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5",
				children: [
					/* @__PURE__ */ (void 0)(X, { className: "h-4 w-4" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 58,
						columnNumber: 15
					}, this),
					" ",
					t("clearFilters")
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 57,
				columnNumber: 30
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 52,
			columnNumber: 9
		}, this), list.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "mt-12 text-center py-20 bg-card rounded-2xl border border-border",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(GitCompare, { className: "h-10 w-10 mx-auto text-muted-foreground" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 63,
					columnNumber: 13
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "mt-5 text-muted-foreground max-w-md mx-auto",
					children: t("compareEmpty")
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 64,
					columnNumber: 13
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
					to: "/cars",
					className: "mt-5 inline-block text-sm font-semibold text-primary hover:text-accent",
					children: [t("btnBrowse"), " →"]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 65,
					columnNumber: 13
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 62,
			columnNumber: 30
		}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "mt-10 overflow-x-auto",
			children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("table", {
				className: "w-full min-w-[640px] bg-card border border-border rounded-2xl shadow-card overflow-hidden",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("thead", {
					className: "bg-secondary",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tr", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", {
						className: "ltr:text-left rtl:text-right p-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground",
						children: "Feature"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 70,
						columnNumber: 19
					}, this), list.map((c) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", {
						className: "p-3 text-center",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
							to: "/cars/$id",
							params: { id: c.id },
							className: "block",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
								src: c.images[0],
								alt: "",
								className: "h-24 w-full object-cover rounded-md mb-2"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 75,
								columnNumber: 25
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "font-display font-bold text-sm truncate",
								children: c.title
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 76,
								columnNumber: 25
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 72,
							columnNumber: 23
						}, this)
					}, c.id, false, {
						fileName: _jsxFileName,
						lineNumber: 71,
						columnNumber: 34
					}, this))] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 69,
						columnNumber: 17
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 68,
					columnNumber: 15
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tbody", { children: attrs.map(({ key, label }) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tr", {
					className: "border-t border-border",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", {
						className: "p-3 text-sm font-semibold text-muted-foreground",
						children: label
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 86,
						columnNumber: 21
					}, this), list.map((c) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", {
						className: "p-3 text-center text-sm font-medium",
						children: fmt(c[key], key)
					}, c.id, false, {
						fileName: _jsxFileName,
						lineNumber: 87,
						columnNumber: 36
					}, this))]
				}, key, true, {
					fileName: _jsxFileName,
					lineNumber: 85,
					columnNumber: 19
				}, this)) }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 81,
					columnNumber: 15
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 67,
				columnNumber: 13
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 66,
			columnNumber: 20
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 51,
		columnNumber: 7
	}, this) }, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 50,
		columnNumber: 10
	}, this);
}
//#endregion
export { ComparePage as component };
