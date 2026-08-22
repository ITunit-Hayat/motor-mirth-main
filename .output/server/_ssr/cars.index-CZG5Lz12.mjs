import { r as __toESM } from "../_runtime.mjs";
import { r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { n as useLanguage } from "./LanguageContext-C6BSyEfd.mjs";
import { L as Heart, n as X, p as SlidersHorizontal } from "../_libs/lucide-react.mjs";
import { s as useFavorites, t as PublicLayout } from "./PublicLayout-Ax7Pira8.mjs";
import { a as useDealership, i as formatPrice } from "./DealershipContext-CZIneh0B.mjs";
import { n as ErrorState, t as CarGridSkeleton } from "./StateViews-ChF2SlsX.mjs";
import { t as Route } from "./cars.index-DVu-PzuB.mjs";
import { n as CompareTray, t as CarCard } from "./CarCard-B0lyScjE.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/cars.index-CZG5Lz12.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/routes/cars.index.tsx?tsr-split=component";
function CarsPage() {
	const { cars, loadingCars, error, refresh } = useDealership();
	const { t } = useLanguage();
	const favs = useFavorites();
	const search = Route.useSearch();
	const [make, setMake] = (0, import_react.useState)("All");
	const [category, setCategory] = (0, import_react.useState)(search.category ?? "All");
	const [transmission, setTransmission] = (0, import_react.useState)("All");
	const [fuel, setFuel] = (0, import_react.useState)("All");
	const [year, setYear] = (0, import_react.useState)(2015);
	const [maxPrice, setMaxPrice] = (0, import_react.useState)(3e5);
	const [maxMileage, setMaxMileage] = (0, import_react.useState)(8e4);
	const [query, setQuery] = (0, import_react.useState)(search.q ?? "");
	const [sort, setSort] = (0, import_react.useState)("newest");
	const [favsOnly, setFavsOnly] = (0, import_react.useState)(false);
	const makes = (0, import_react.useMemo)(() => ["All", ...Array.from(new Set(cars.map((c) => c.make)))], [cars]);
	const cats = (0, import_react.useMemo)(() => ["All", ...Array.from(new Set(cars.map((c) => c.category)))], [cars]);
	const trs = (0, import_react.useMemo)(() => ["All", ...Array.from(new Set(cars.map((c) => c.transmission).filter(Boolean)))], [cars]);
	const fuels = (0, import_react.useMemo)(() => ["All", ...Array.from(new Set(cars.map((c) => c.fuel ?? "").filter(Boolean)))], [cars]);
	const filtered = (0, import_react.useMemo)(() => {
		const q = query.trim().toLowerCase();
		const list = cars.filter((c) => {
			if (make !== "All" && c.make !== make) return false;
			if (category !== "All" && c.category !== category) return false;
			if (transmission !== "All" && c.transmission !== transmission) return false;
			if (fuel !== "All" && (c.fuel ?? "") !== fuel) return false;
			if (c.year < year) return false;
			if (c.price > maxPrice) return false;
			if (c.mileage > maxMileage) return false;
			if (favsOnly && !favs.includes(c.id)) return false;
			if (q && ![
				c.title,
				c.make,
				c.model,
				c.category
			].join(" ").toLowerCase().includes(q)) return false;
			return true;
		});
		switch (sort) {
			case "price-asc": return [...list].sort((a, b) => a.price - b.price);
			case "price-desc": return [...list].sort((a, b) => b.price - a.price);
			case "mileage-asc": return [...list].sort((a, b) => a.mileage - b.mileage);
			default: return [...list].sort((a, b) => b.year - a.year);
		}
	}, [
		cars,
		make,
		category,
		transmission,
		fuel,
		year,
		maxPrice,
		maxMileage,
		query,
		sort,
		favsOnly,
		favs
	]);
	const clearAll = () => {
		setMake("All");
		setCategory("All");
		setTransmission("All");
		setFuel("All");
		setYear(2015);
		setMaxPrice(3e5);
		setMaxMileage(8e4);
		setQuery("");
		setSort("newest");
		setFavsOnly(false);
	};
	const selectCls = "mt-1 w-full h-10 px-3 rounded-md bg-background border border-input text-sm";
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(PublicLayout, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "mx-auto max-w-7xl px-4 sm:px-6 py-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex items-end justify-between flex-wrap gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
					className: "text-3xl sm:text-4xl font-bold",
					children: t("allVehicles")
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 85,
					columnNumber: 13
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "mt-2 text-muted-foreground",
					children: [
						filtered.length,
						" ",
						t("resultsCount")
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 86,
					columnNumber: 13
				}, this)] }, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 84,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						onClick: () => setFavsOnly((v) => !v),
						className: `inline-flex items-center gap-2 h-10 px-4 rounded-full border text-sm font-semibold transition ${favsOnly ? "bg-red-500/10 border-red-500/40 text-red-500" : "border-input hover:bg-secondary"}`,
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Heart, { className: `h-4 w-4 ${favsOnly ? "fill-red-500" : ""}` }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 90,
								columnNumber: 15
							}, this),
							" ",
							t("favsOnly")
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 89,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						onClick: clearAll,
						className: "inline-flex items-center gap-2 h-10 px-4 rounded-full border border-input hover:bg-secondary text-sm font-semibold",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(X, { className: "h-4 w-4" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 93,
								columnNumber: 15
							}, this),
							" ",
							t("clearFilters")
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 92,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 88,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 83,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mt-8 grid gap-4 lg:grid-cols-5 bg-card border border-border p-5 rounded-2xl shadow-card",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "lg:hidden flex items-center gap-2 text-sm font-semibold text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SlidersHorizontal, { className: "h-4 w-4" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 100,
								columnNumber: 13
							}, this),
							" ",
							t("filterAll")
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 99,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
						className: "text-xs font-semibold text-muted-foreground",
						children: t("filterMake")
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 103,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", {
						value: make,
						onChange: (e) => setMake(e.target.value),
						className: selectCls,
						children: makes.map((m) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
							value: m,
							children: m === "All" ? t("filterAll") : m
						}, m, false, {
							fileName: _jsxFileName,
							lineNumber: 104,
							columnNumber: 112
						}, this))
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 104,
						columnNumber: 13
					}, this)] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 102,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
						className: "text-xs font-semibold text-muted-foreground",
						children: t("filterCategory")
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 107,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", {
						value: category,
						onChange: (e) => setCategory(e.target.value),
						className: selectCls,
						children: cats.map((c) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
							value: c,
							children: c === "All" ? t("filterAll") : c
						}, c, false, {
							fileName: _jsxFileName,
							lineNumber: 108,
							columnNumber: 119
						}, this))
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 108,
						columnNumber: 13
					}, this)] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 106,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
						className: "text-xs font-semibold text-muted-foreground",
						children: t("filterTransmission")
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 111,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", {
						value: transmission,
						onChange: (e) => setTransmission(e.target.value),
						className: selectCls,
						children: trs.map((c) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
							value: c,
							children: c === "All" ? t("filterAll") : c
						}, c, false, {
							fileName: _jsxFileName,
							lineNumber: 112,
							columnNumber: 126
						}, this))
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 112,
						columnNumber: 13
					}, this)] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 110,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
						className: "text-xs font-semibold text-muted-foreground",
						children: t("filterFuel")
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 115,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", {
						value: fuel,
						onChange: (e) => setFuel(e.target.value),
						className: selectCls,
						children: fuels.map((c) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
							value: c,
							children: c === "All" ? t("filterAll") : c
						}, c, false, {
							fileName: _jsxFileName,
							lineNumber: 116,
							columnNumber: 112
						}, this))
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 116,
						columnNumber: 13
					}, this)] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 114,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
						className: "text-xs font-semibold text-muted-foreground",
						children: t("sortBy")
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 119,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", {
						value: sort,
						onChange: (e) => setSort(e.target.value),
						className: selectCls,
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
								value: "newest",
								children: t("sortNewest")
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 121,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
								value: "price-asc",
								children: t("sortPriceLow")
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 122,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
								value: "price-desc",
								children: t("sortPriceHigh")
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 123,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
								value: "mileage-asc",
								children: t("sortMileageLow")
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 124,
								columnNumber: 15
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 120,
						columnNumber: 13
					}, this)] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 118,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
						className: "text-xs font-semibold text-muted-foreground",
						children: t("filterYear")
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 128,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", {
						value: year,
						onChange: (e) => setYear(Number(e.target.value)),
						className: selectCls,
						children: [
							2015,
							2018,
							2020,
							2022,
							2023,
							2024
						].map((y) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
							value: y,
							children: [y, "+"]
						}, y, true, {
							fileName: _jsxFileName,
							lineNumber: 130,
							columnNumber: 62
						}, this))
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 129,
						columnNumber: 13
					}, this)] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 127,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "lg:col-span-2",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex justify-between text-xs font-semibold text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: t("filterMaxPrice") }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 134,
								columnNumber: 95
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: formatPrice(maxPrice) }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 134,
								columnNumber: 129
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 134,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
							type: "range",
							min: 2e4,
							max: 3e5,
							step: 5e3,
							value: maxPrice,
							onChange: (e) => setMaxPrice(Number(e.target.value)),
							className: "w-full mt-3 accent-accent"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 135,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 133,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "lg:col-span-2",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex justify-between text-xs font-semibold text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: t("filterMaxMileage") }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 138,
								columnNumber: 95
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: maxMileage.toLocaleString() }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 138,
								columnNumber: 131
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 138,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
							type: "range",
							min: 5e3,
							max: 8e4,
							step: 5e3,
							value: maxMileage,
							onChange: (e) => setMaxMileage(Number(e.target.value)),
							className: "w-full mt-3 accent-accent"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 139,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 137,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 98,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mt-8",
				children: error ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ErrorState, {
					message: error,
					onRetry: () => void refresh()
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 144,
					columnNumber: 20
				}, this) : loadingCars ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "grid gap-6 sm:grid-cols-2 lg:grid-cols-3",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CarGridSkeleton, { count: 6 }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 144,
						columnNumber: 156
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 144,
					columnNumber: 98
				}, this) : filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "text-center py-24 bg-card rounded-2xl border border-border",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "text-muted-foreground",
						children: t("noCarsFound")
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 145,
						columnNumber: 15
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						onClick: clearAll,
						className: "mt-3 inline-block text-sm font-semibold text-primary hover:text-accent",
						children: t("clearFilters")
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 146,
						columnNumber: 15
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 144,
					columnNumber: 218
				}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "grid gap-6 sm:grid-cols-2 lg:grid-cols-3",
					children: filtered.map((c) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CarCard, { car: c }, c.id, false, {
						fileName: _jsxFileName,
						lineNumber: 148,
						columnNumber: 34
					}, this))
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 147,
					columnNumber: 22
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 143,
				columnNumber: 9
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 82,
		columnNumber: 7
	}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CompareTray, {}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 152,
		columnNumber: 7
	}, this)] }, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 81,
		columnNumber: 10
	}, this);
}
//#endregion
export { CarsPage as component };
