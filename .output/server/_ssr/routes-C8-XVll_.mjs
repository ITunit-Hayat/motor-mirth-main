import { r as __toESM } from "../_runtime.mjs";
import { r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { n as useLanguage } from "./LanguageContext-C6BSyEfd.mjs";
import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { X as ChevronRight, at as BadgePercent, d as Sparkles, lt as ArrowRight, m as Shield, ot as Award, r as Wrench, v as Search, x as Phone } from "../_libs/lucide-react.mjs";
import { r as cn, t as PublicLayout } from "./PublicLayout-Ax7Pira8.mjs";
import { a as useDealership, t as CATEGORY_META } from "./DealershipContext-CZIneh0B.mjs";
import { n as CompareTray, t as CarCard } from "./CarCard-B0lyScjE.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-C8-XVll_.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/routes/index.tsx?tsr-split=component";
var HERO_BG = "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=2400&q=85";
var HERO_BG_ALT = "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=2400&q=85";
function HomePage() {
	const { t } = useLanguage();
	const { cars } = useDealership();
	const [q, setQ] = (0, import_react.useState)("");
	const [suggestions, setSuggestions] = (0, import_react.useState)([]);
	const featured = (0, import_react.useMemo)(() => cars.filter((c) => c.featured).slice(0, 6), [cars]);
	const newArrivals = (0, import_react.useMemo)(() => [...cars].sort((a, b) => b.year - a.year).slice(0, 8), [cars]);
	const deals = (0, import_react.useMemo)(() => cars.filter((c) => (c.discount ?? 0) > 0).slice(0, 4), [cars]);
	const handleChange = (v) => {
		setQ(v);
		const val = v.trim().toLowerCase();
		if (!val) return setSuggestions([]);
		const uniq = /* @__PURE__ */ new Set();
		cars.forEach((c) => {
			[
				c.title,
				c.make,
				c.model
			].forEach((t_) => {
				if (t_ && t_.toLowerCase().includes(val)) uniq.add(t_);
			});
		});
		setSuggestions(Array.from(uniq).slice(0, 6));
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(PublicLayout, { children: [
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
			className: "relative overflow-hidden",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "absolute inset-0",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
					src: HERO_BG,
					alt: "",
					className: "h-full w-full object-cover animate-kenburns",
					loading: "eager",
					fetchPriority: "high"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 41,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "absolute inset-0 bg-gradient-to-b from-black/60 via-black/70 to-background" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 42,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 40,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "relative mx-auto max-w-7xl px-4 sm:px-6 pt-24 pb-16 sm:pt-32 sm:pb-24 text-white",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: "inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur text-xs font-semibold border border-white/20",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sparkles, { className: "h-3.5 w-3.5 text-accent" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 47,
								columnNumber: 13
							}, this),
							" ",
							t("heroEyebrow")
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 46,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
						className: "mt-5 font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] max-w-3xl drop-shadow-lg",
						children: t("heroTitle")
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 49,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "mt-4 text-white/80 max-w-xl text-base sm:text-lg",
						children: t("heroSubtitle")
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 52,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("form", {
						onSubmit: (e) => {
							e.preventDefault();
							window.location.href = `/cars?q=${encodeURIComponent(q)}`;
						},
						className: "mt-8 relative max-w-2xl",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center gap-2 bg-white/95 text-foreground rounded-2xl shadow-elegant p-2 sm:p-2.5",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "relative flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Search, { className: "absolute ltr:left-3 rtl:right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 62,
									columnNumber: 17
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
									value: q,
									onChange: (e) => handleChange(e.target.value),
									placeholder: t("heroSearchPlaceholder"),
									className: "w-full h-11 ltr:pl-10 rtl:pr-10 ltr:pr-3 rtl:pl-3 rounded-lg bg-background border border-input text-sm focus:outline-none focus:ring-2 focus:ring-accent"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 63,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 61,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								type: "submit",
								className: "inline-flex items-center gap-2 h-11 px-4 sm:px-5 rounded-lg bg-gradient-accent text-accent-foreground font-bold text-sm whitespace-nowrap",
								children: [
									t("heroSearchBtn"),
									" ",
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowRight, { className: "h-4 w-4 rtl:rotate-180" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 66,
										columnNumber: 38
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 65,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 60,
							columnNumber: 13
						}, this), suggestions.length > 0 && /* @__PURE__ */ (void 0)("div", {
							className: "search-pop absolute inset-x-0 top-full mt-2 bg-card text-foreground rounded-xl overflow-hidden border border-border z-10",
							children: suggestions.map((s) => /* @__PURE__ */ (void 0)("button", {
								type: "button",
								onClick: () => {
									setQ(s);
									window.location.href = `/cars?q=${encodeURIComponent(s)}`;
								},
								className: "w-full text-left ltr:text-left rtl:text-right px-4 py-2.5 hover:bg-secondary text-sm flex items-center gap-2",
								children: [
									/* @__PURE__ */ (void 0)(Search, { className: "h-3.5 w-3.5 text-muted-foreground" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 74,
										columnNumber: 21
									}, this),
									" ",
									s
								]
							}, s, true, {
								fileName: _jsxFileName,
								lineNumber: 70,
								columnNumber: 39
							}, this))
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 69,
							columnNumber: 40
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 56,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "mt-10 grid grid-cols-3 max-w-lg gap-6",
						children: [
							["500+", t("statCars")],
							["10k+", t("statDrivers")],
							["4.9★", t("statRating")]
						].map(([k, v]) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "text-2xl md:text-3xl font-display font-bold text-accent",
							children: k
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 81,
							columnNumber: 17
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "text-xs md:text-sm text-white/80",
							children: v
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 82,
							columnNumber: 17
						}, this)] }, v, true, {
							fileName: _jsxFileName,
							lineNumber: 80,
							columnNumber: 111
						}, this))
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 79,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 45,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 39,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
			className: "mx-auto max-w-7xl px-4 sm:px-6 py-14 md:py-20",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
				className: "text-3xl md:text-4xl font-bold text-center",
				children: t("browseByCategory")
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 90,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mt-10 grid grid-cols-2 sm:grid-cols-5 gap-3",
				children: Object.entries(CATEGORY_META).map(([cat, m]) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
					to: "/cars",
					search: { category: cat },
					className: cn("group rounded-2xl p-6 text-center border border-border bg-card hover:shadow-elegant transition bg-gradient-to-br", m.tone),
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "text-4xl mb-2 group-hover:scale-110 transition-transform",
							children: m.icon
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 95,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "font-semibold text-sm",
							children: cat
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 96,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "text-xs text-muted-foreground mt-1",
							children: [
								cars.filter((c) => c.category === cat).length,
								" ",
								t("resultsCount")
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 97,
							columnNumber: 15
						}, this)
					]
				}, cat, true, {
					fileName: _jsxFileName,
					lineNumber: 92,
					columnNumber: 60
				}, this))
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 91,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 89,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
			className: "mx-auto max-w-7xl px-4 sm:px-6 py-8",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex items-end justify-between flex-wrap gap-3 mb-6",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
					className: "text-3xl md:text-4xl font-bold",
					children: t("featuredTitle")
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 106,
					columnNumber: 13
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "mt-2 text-muted-foreground",
					children: t("featuredSubtitle")
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 107,
					columnNumber: 13
				}, this)] }, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 105,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
					to: "/cars",
					className: "inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-accent",
					children: [
						t("btnBrowse"),
						" ",
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ChevronRight, { className: "h-4 w-4 rtl:rotate-180" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 110,
							columnNumber: 30
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 109,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 104,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex gap-5 overflow-x-auto no-scrollbar scroll-snap-x pb-4 -mx-4 px-4",
				children: featured.map((c) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "min-w-[300px] sm:min-w-[340px] snap-start",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CarCard, { car: c }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 115,
						columnNumber: 15
					}, this)
				}, c.id, false, {
					fileName: _jsxFileName,
					lineNumber: 114,
					columnNumber: 30
				}, this))
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 113,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 103,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
			className: "relative mt-10 overflow-hidden",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
					src: HERO_BG_ALT,
					alt: "",
					className: "absolute inset-0 h-full w-full object-cover"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 122,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "absolute inset-0 bg-gradient-to-tr from-black/85 via-black/70 to-accent/30" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 123,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "relative mx-auto max-w-7xl px-4 sm:px-6 py-20 text-white",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "grid gap-8 lg:grid-cols-4",
						children: [
							{
								Icon: Award,
								k: "pillarCertified",
								v: "pillarCertifiedDesc"
							},
							{
								Icon: Shield,
								k: "pillarWarranty",
								v: "pillarWarrantyDesc"
							},
							{
								Icon: BadgePercent,
								k: "pillarFinance",
								v: "pillarFinanceDesc"
							},
							{
								Icon: Wrench,
								k: "pillarSupport",
								v: "pillarSupportDesc"
							}
						].map(({ Icon, k, v }) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-start gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "h-11 w-11 grid place-items-center rounded-xl bg-accent/20 backdrop-blur shrink-0",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Icon, { className: "h-5 w-5 text-accent" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 148,
									columnNumber: 19
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 147,
								columnNumber: 17
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "font-display font-bold text-lg",
								children: t(k)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 151,
								columnNumber: 19
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "mt-1 text-white/75 text-sm",
								children: t(v)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 152,
								columnNumber: 19
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 150,
								columnNumber: 17
							}, this)]
						}, k, true, {
							fileName: _jsxFileName,
							lineNumber: 146,
							columnNumber: 17
						}, this))
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 125,
						columnNumber: 11
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 124,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 121,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
			className: "mx-auto max-w-7xl px-4 sm:px-6 py-16 md:py-20",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex items-end justify-between flex-wrap gap-3 mb-6",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
					className: "text-3xl md:text-4xl font-bold",
					children: t("newArrivalsTitle")
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 163,
					columnNumber: 13
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "mt-2 text-muted-foreground",
					children: t("newArrivalsSubtitle")
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 164,
					columnNumber: 13
				}, this)] }, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 162,
					columnNumber: 11
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 161,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "grid gap-6 sm:grid-cols-2 lg:grid-cols-4",
				children: newArrivals.slice(0, 8).map((c) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CarCard, { car: c }, c.id, false, {
					fileName: _jsxFileName,
					lineNumber: 168,
					columnNumber: 45
				}, this))
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 167,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 160,
			columnNumber: 7
		}, this),
		deals.length > 0 && /* @__PURE__ */ (void 0)("section", {
			className: "mx-auto max-w-7xl px-4 sm:px-6 pb-16",
			children: [
				/* @__PURE__ */ (void 0)("h2", {
					className: "text-3xl md:text-4xl font-bold",
					children: t("specialOffersTitle")
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 174,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (void 0)("p", {
					className: "mt-2 text-muted-foreground",
					children: t("specialOffersSubtitle")
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 175,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (void 0)("div", {
					className: "mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4",
					children: deals.map((c) => /* @__PURE__ */ (void 0)(CarCard, { car: c }, c.id, false, {
						fileName: _jsxFileName,
						lineNumber: 177,
						columnNumber: 29
					}, this))
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 176,
					columnNumber: 11
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 173,
			columnNumber: 28
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
			className: "bg-gradient-hero text-primary-foreground",
			children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mx-auto max-w-7xl px-4 sm:px-6 py-16 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
						className: "text-3xl md:text-4xl font-bold font-display",
						children: t("heroTitle")
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 184,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "mt-3 text-primary-foreground/80 max-w-2xl mx-auto",
						children: t("heroSubtitle")
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 185,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "mt-7 flex items-center justify-center gap-3 flex-wrap",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
							to: "/cars",
							className: "inline-flex items-center gap-2 h-12 px-6 rounded-lg bg-gradient-accent text-accent-foreground font-bold shadow-elegant",
							children: [
								t("btnBrowse"),
								" ",
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowRight, { className: "h-4 w-4 rtl:rotate-180" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 188,
									columnNumber: 32
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 187,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
							to: "/contact",
							className: "inline-flex items-center gap-2 h-12 px-6 rounded-lg border border-white/30 hover:bg-white/10 font-semibold",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Phone, { className: "h-4 w-4" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 191,
									columnNumber: 15
								}, this),
								" ",
								t("btnTalkSpecialist")
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 190,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 186,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 183,
				columnNumber: 9
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 182,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CompareTray, {}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 197,
			columnNumber: 7
		}, this)
	] }, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 37,
		columnNumber: 10
	}, this);
}
//#endregion
export { HomePage as component };
