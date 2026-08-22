import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { n as useLanguage } from "./LanguageContext-C6BSyEfd.mjs";
import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { B as Gauge, L as Heart, U as Eye, tt as Calendar, z as GitCompare } from "../_libs/lucide-react.mjs";
import { a as toggleFavorite, i as toggleCompare, n as clearCompare, o as useCompareList, r as cn, s as useFavorites } from "./PublicLayout-Ax7Pira8.mjs";
import { a as useDealership, i as formatPrice, r as formatMiles } from "./DealershipContext-CZIneh0B.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/CarCard-B0lyScjE.js
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName$1 = "/app/applet/src/components/CompareTray.tsx";
function CompareTray() {
	const { t } = useLanguage();
	const ids = useCompareList();
	const { cars } = useDealership();
	if (ids.length === 0) return null;
	const list = ids.map((id) => cars.find((c) => c.id === id)).filter(Boolean);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "fixed bottom-4 inset-x-4 sm:inset-x-auto sm:right-6 sm:bottom-6 z-50 max-w-2xl mx-auto sm:mx-0 rounded-2xl bg-card/95 backdrop-blur shadow-elegant border border-border overflow-hidden fade-in",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "flex items-center justify-between px-4 py-3 border-b border-border",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(GitCompare, { className: "h-4 w-4 text-accent" }, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 19,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
					className: "font-semibold text-sm",
					children: [
						t("compareTrayTitle"),
						" (",
						ids.length,
						"/3)"
					]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 20,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$1,
				lineNumber: 18,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
				onClick: clearCompare,
				className: "text-xs text-muted-foreground hover:text-foreground underline",
				children: t("compareRemove")
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 22,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName$1,
			lineNumber: 17,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "px-3 py-3 flex items-center gap-3 overflow-x-auto no-scrollbar",
			children: [list.map((c) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex items-center gap-2 shrink-0",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
					src: c.images[0],
					alt: "",
					className: "h-12 w-16 rounded-md object-cover"
				}, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 27,
					columnNumber: 13
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "text-xs font-medium line-clamp-1 max-w-[10rem]",
					children: c.title
				}, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 28,
					columnNumber: 13
				}, this)]
			}, c.id, true, {
				fileName: _jsxFileName$1,
				lineNumber: 26,
				columnNumber: 11
			}, this)), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
				to: "/compare",
				className: "ml-auto inline-flex items-center gap-1.5 h-10 px-4 rounded-lg bg-gradient-accent text-accent-foreground text-sm font-bold shrink-0",
				children: t("compareNow")
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 31,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName$1,
			lineNumber: 24,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName$1,
		lineNumber: 16,
		columnNumber: 5
	}, this);
}
var _jsxFileName = "/app/applet/src/components/CarCard.tsx";
function CarCard({ car }) {
	const { t } = useLanguage();
	const favs = useFavorites();
	const cmp = useCompareList();
	const isFav = favs.includes(car.id);
	const isCmp = cmp.includes(car.id);
	const canCmp = cmp.length < 3;
	const discounted = car.discount && car.discount > 0 ? Math.round(car.price * (100 - car.discount) / 100) : null;
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("article", {
		className: "group bg-card rounded-2xl overflow-hidden shadow-card border border-border/60 hover:shadow-elegant hover-zoom transition-all duration-300",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "aspect-[16/10] overflow-hidden bg-muted relative",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
					src: car.images[0],
					alt: car.title,
					loading: "lazy",
					decoding: "async",
					className: "h-full w-full object-cover"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 26,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "absolute top-3 left-3 flex flex-col gap-1.5",
					children: [car.featured && /* @__PURE__ */ (void 0)("span", {
						className: "text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-full bg-accent text-accent-foreground shadow-sm",
						children: ["★ ", t("featuredTitle").split(" ")[0]]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 36,
						columnNumber: 13
					}, this), discounted && /* @__PURE__ */ (void 0)("span", {
						className: "text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-full bg-destructive text-destructive-foreground shadow-sm",
						children: [
							"-",
							car.discount,
							"%"
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 41,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 34,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "absolute top-3 right-3 flex flex-col gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						onClick: (e) => {
							e.preventDefault();
							e.stopPropagation();
							const a = toggleFavorite(car.id);
							toast.success(a ? t("favSaved") : t("favRemovedMsg"));
						},
						"aria-label": isFav ? t("favRemove") : t("favAdd"),
						title: isFav ? t("favRemove") : t("favAdd"),
						className: "h-9 w-9 grid place-items-center rounded-full bg-background/90 backdrop-blur shadow-card hover:scale-110 transition",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Heart, { className: cn("h-4 w-4 transition", isFav ? "fill-red-500 text-red-500" : "text-muted-foreground") }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 54,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 48,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						onClick: (e) => {
							e.preventDefault();
							e.stopPropagation();
							if (!isCmp && !canCmp) {
								toast.error(t("compareEmpty"));
								return;
							}
							const a = toggleCompare(car.id);
							toast.success(a ? `+ ${t("compareAdd")}` : t("compareRemove"));
						},
						"aria-label": isCmp ? t("compareRemove") : t("compareAdd"),
						title: isCmp ? t("compareRemove") : t("compareAdd"),
						className: "h-9 w-9 grid place-items-center rounded-full bg-background/90 backdrop-blur shadow-card hover:scale-110 transition",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(GitCompare, { className: cn("h-4 w-4 transition", isCmp ? "text-accent" : "text-muted-foreground") }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 67,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 56,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 47,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 25,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-start justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "text-[11px] uppercase tracking-wider font-semibold text-accent",
							children: car.category
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 75,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
							className: "font-display font-bold text-lg leading-tight mt-0.5 truncate",
							children: car.title
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 76,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 74,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "text-right shrink-0",
						children: discounted ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "text-xs line-through text-muted-foreground",
							children: formatPrice(car.price)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 81,
							columnNumber: 17
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "text-accent font-bold whitespace-nowrap",
							children: formatPrice(discounted)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 82,
							columnNumber: 17
						}, this)] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 80,
							columnNumber: 15
						}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "text-accent font-bold whitespace-nowrap",
							children: formatPrice(car.price)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 85,
							columnNumber: 15
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 78,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 73,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mt-3 flex items-center gap-4 text-sm text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "flex items-center gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Calendar, { className: "h-4 w-4" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 91,
								columnNumber: 55
							}, this), car.year]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 91,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "flex items-center gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Gauge, { className: "h-4 w-4" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 92,
								columnNumber: 55
							}, this), formatMiles(car.mileage)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 92,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground",
							children: car.transmission
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 93,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 90,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
					to: "/cars/$id",
					params: { id: car.id },
					className: "mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-accent transition-colors",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Eye, { className: "h-4 w-4" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 103,
							columnNumber: 11
						}, this),
						" ",
						t("viewDetails")
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 98,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 72,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 24,
		columnNumber: 5
	}, this);
}
//#endregion
export { CompareTray as n, CarCard as t };
