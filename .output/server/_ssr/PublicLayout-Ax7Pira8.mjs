import { r as __toESM } from "../_runtime.mjs";
import { r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { n as useLanguage } from "./LanguageContext-C6BSyEfd.mjs";
import { n as useTheme } from "./ThemeContext-A4-ueCni.mjs";
import { r as trackPageView } from "./analytics-CSNBGE9S.mjs";
import { r as useSiteSettings } from "./settings-B88DAbRA.mjs";
import { f as useRouterState, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { E as Menu, L as Heart, M as LayoutDashboard, R as Globe, h as ShieldCheck, l as Sun, n as X, w as Moon, z as GitCompare } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/PublicLayout-Ax7Pira8.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var KEY$1 = "velocity_favorites";
var EVT$1 = "velocity:favorites-changed";
function readFavorites() {
	try {
		const r = localStorage.getItem(KEY$1);
		const a = r ? JSON.parse(r) : [];
		return Array.isArray(a) ? a.map(String) : [];
	} catch {
		return [];
	}
}
function write$1(ids) {
	try {
		localStorage.setItem(KEY$1, JSON.stringify(ids));
	} catch {}
	window.dispatchEvent(new CustomEvent(EVT$1));
}
function toggleFavorite(id) {
	const ids = readFavorites();
	const has = ids.includes(id);
	write$1(has ? ids.filter((x) => x !== id) : [...ids, id]);
	return !has;
}
function useFavorites() {
	const [ids, setIds] = (0, import_react.useState)([]);
	const sync = (0, import_react.useCallback)(() => setIds(readFavorites()), []);
	(0, import_react.useEffect)(() => {
		sync();
		const h = () => sync();
		window.addEventListener(EVT$1, h);
		window.addEventListener("storage", h);
		return () => {
			window.removeEventListener(EVT$1, h);
			window.removeEventListener("storage", h);
		};
	}, [sync]);
	return ids;
}
var KEY = "velocity_compare";
var EVT = "velocity:compare-changed";
function readCompare() {
	try {
		const r = localStorage.getItem(KEY);
		const a = r ? JSON.parse(r) : [];
		return Array.isArray(a) ? a.map(String) : [];
	} catch {
		return [];
	}
}
function write(ids) {
	try {
		localStorage.setItem(KEY, JSON.stringify(ids));
	} catch {}
	window.dispatchEvent(new CustomEvent(EVT));
}
function toggleCompare(id) {
	const ids = readCompare();
	const has = ids.includes(id);
	write(has ? ids.filter((x) => x !== id) : [...ids, id].slice(-3));
	return !has;
}
function clearCompare() {
	write([]);
}
function useCompareList() {
	const [ids, setIds] = (0, import_react.useState)([]);
	const sync = (0, import_react.useCallback)(() => setIds(readCompare()), []);
	(0, import_react.useEffect)(() => {
		sync();
		const h = () => sync();
		window.addEventListener(EVT, h);
		window.addEventListener("storage", h);
		return () => {
			window.removeEventListener(EVT, h);
			window.removeEventListener("storage", h);
		};
	}, [sync]);
	return ids;
}
function cn(...parts) {
	return parts.filter(Boolean).join(" ");
}
var _jsxFileName = "/app/applet/src/components/PublicLayout.tsx";
function PublicLayout({ children }) {
	const { t, locale, setLocale, dir } = useLanguage();
	const { theme, toggle } = useTheme();
	const favs = useFavorites();
	const cmp = useCompareList();
	const [open, setOpen] = (0, import_react.useState)(false);
	const [scrolled, setScrolled] = (0, import_react.useState)(false);
	const router = useRouterState();
	const site = useSiteSettings();
	(0, import_react.useEffect)(() => {
		const onScroll = () => setScrolled(window.scrollY > 12);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);
	(0, import_react.useEffect)(() => {
		setOpen(false);
		trackPageView(router.location.pathname);
	}, [router.location.pathname]);
	const nav = [
		{
			to: "/",
			label: t("navHome")
		},
		{
			to: "/cars",
			label: t("navInventory")
		},
		{
			to: "/about",
			label: t("navAbout")
		},
		{
			to: "/contact",
			label: t("navContact")
		},
		{
			to: "/compare",
			label: t("navCompare")
		},
		{
			to: "/wishlist",
			label: t("navWishlist")
		}
	];
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "min-h-screen flex flex-col bg-background text-foreground",
		dir,
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "bg-gradient-to-r from-primary via-primary/95 to-accent/90 text-primary-foreground py-1.5 px-4 text-xs font-medium text-center flex items-center justify-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "✨ تم تحديث نظام الإدارة المتكامل بالكامل (الإحصائيات، المخزون، الطلبات، الثوابت)" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 44,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
					to: "/admin",
					className: "inline-flex items-center gap-1 bg-white/20 hover:bg-white/30 text-white px-2.5 py-0.5 rounded-full font-bold transition shadow-sm",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LayoutDashboard, { className: "h-3 w-3" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 49,
						columnNumber: 11
					}, this), " دخول لوحة الإدارة (Admin) ←"]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 45,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 43,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("header", {
				className: cn("sticky top-0 z-40 transition-all", scrolled || open ? "glass shadow-card" : "bg-transparent"),
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mx-auto max-w-7xl px-4 sm:px-6 h-16 flex items-center gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
							to: "/",
							className: "flex items-center gap-2 font-display font-bold text-lg shrink-0",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "inline-grid place-items-center h-9 w-9 rounded-lg bg-gradient-accent text-white",
								children: "V"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 56,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "hidden sm:inline",
								children: ["Velocity", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "text-accent",
									children: "Motors"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 57,
									columnNumber: 56
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 57,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 55,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("nav", {
							className: "hidden lg:flex items-center gap-1 mx-auto",
							children: nav.map((n) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
								to: n.to,
								className: "px-3 py-2 rounded-md text-sm font-medium hover:bg-secondary hover:text-foreground/90 text-foreground/80 transition",
								activeProps: { className: "text-accent font-semibold" },
								children: n.label
							}, n.to, false, {
								fileName: _jsxFileName,
								lineNumber: 62,
								columnNumber: 15
							}, this))
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 60,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "ml-auto flex items-center gap-1.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
									to: "/admin",
									className: "hidden sm:inline-flex items-center gap-1.5 h-9 px-3 rounded-xl bg-accent/15 hover:bg-accent/25 text-accent text-xs font-bold border border-accent/30 transition mr-1",
									title: "لوحة التحكم الإدارية",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ShieldCheck, { className: "h-4 w-4" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 74,
										columnNumber: 15
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "لوحة الإدارة" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 75,
										columnNumber: 15
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 69,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
									to: "/wishlist",
									className: "relative h-10 w-10 grid place-items-center rounded-full hover:bg-secondary",
									"aria-label": t("navWishlist"),
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Heart, { className: "h-4 w-4" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 79,
										columnNumber: 15
									}, this), favs.length > 0 && /* @__PURE__ */ (void 0)("span", {
										className: "absolute -top-0.5 -right-0.5 h-4 min-w-4 px-1 grid place-items-center rounded-full bg-accent text-accent-foreground text-[10px] font-bold",
										children: favs.length
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 80,
										columnNumber: 35
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 78,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
									to: "/compare",
									className: "relative h-10 w-10 grid place-items-center rounded-full hover:bg-secondary",
									"aria-label": t("navCompare"),
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(GitCompare, { className: "h-4 w-4" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 83,
										columnNumber: 15
									}, this), cmp.length > 0 && /* @__PURE__ */ (void 0)("span", {
										className: "absolute -top-0.5 -right-0.5 h-4 min-w-4 px-1 grid place-items-center rounded-full bg-primary text-primary-foreground text-[10px] font-bold",
										children: [
											cmp.length,
											"/",
											3
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 84,
										columnNumber: 34
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 82,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "relative",
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
										onClick: () => {
											const order = [
												"en",
												"ar",
												"fr"
											];
											setLocale(order[(order.indexOf(locale) + 1) % order.length]);
										},
										className: "h-10 px-2.5 rounded-full hover:bg-secondary text-sm font-semibold flex items-center gap-1",
										"aria-label": "Language",
										title: "Language",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Globe, { className: "h-4 w-4" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 97,
											columnNumber: 17
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "uppercase",
											children: locale
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 98,
											columnNumber: 17
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 88,
										columnNumber: 15
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 87,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
									onClick: toggle,
									className: "h-10 w-10 grid place-items-center rounded-full hover:bg-secondary",
									"aria-label": t("toggleDark"),
									children: theme === "dark" ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sun, { className: "h-4 w-4" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 103,
										columnNumber: 35
									}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Moon, { className: "h-4 w-4" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 103,
										columnNumber: 65
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 102,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
									onClick: () => setOpen((v) => !v),
									className: "lg:hidden h-10 w-10 grid place-items-center rounded-full hover:bg-secondary",
									"aria-label": open ? t("closeMenu") : t("openMenu"),
									children: open ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(X, { className: "h-5 w-5" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 107,
										columnNumber: 23
									}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Menu, { className: "h-5 w-5" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 107,
										columnNumber: 51
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 106,
									columnNumber: 13
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 68,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 54,
					columnNumber: 9
				}, this), open && /* @__PURE__ */ (void 0)("div", {
					className: "lg:hidden border-t border-border bg-background",
					children: /* @__PURE__ */ (void 0)("nav", {
						className: "mx-auto max-w-7xl px-4 sm:px-6 py-3 grid gap-1",
						children: [/* @__PURE__ */ (void 0)(Link, {
							to: "/admin",
							className: "px-3 py-3 rounded-md text-sm font-bold bg-accent/15 text-accent flex items-center gap-2",
							children: [/* @__PURE__ */ (void 0)(ShieldCheck, { className: "h-4 w-4" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 115,
								columnNumber: 17
							}, this), " لوحة التحكم الإدارية (Admin Panel)"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 114,
							columnNumber: 15
						}, this), nav.map((n) => /* @__PURE__ */ (void 0)(Link, {
							to: n.to,
							className: "px-3 py-3 rounded-md text-sm font-medium hover:bg-secondary",
							children: n.label
						}, n.to, false, {
							fileName: _jsxFileName,
							lineNumber: 118,
							columnNumber: 17
						}, this))]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 113,
						columnNumber: 13
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 112,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 53,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("main", {
				className: "flex-1 fade-in",
				children
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 127,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("footer", {
				className: "border-t border-border bg-card mt-12",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mx-auto max-w-7xl px-4 sm:px-6 py-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center gap-2 font-display font-bold text-lg",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "inline-grid place-items-center h-9 w-9 rounded-lg bg-gradient-accent text-white",
									children: "V"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 133,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "VelocityMotors" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 134,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 132,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "mt-3 text-sm text-muted-foreground",
								children: t("footerTagline")
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 136,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "mt-4",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
									to: "/admin",
									className: "inline-flex items-center gap-1.5 text-xs font-bold text-accent hover:underline",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ShieldCheck, { className: "h-4 w-4" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 139,
										columnNumber: 17
									}, this), " الدخول إلى لوحة التحكم الإدارية ←"]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 138,
									columnNumber: 15
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 137,
								columnNumber: 13
							}, this)
						] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 131,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h4", {
							className: "text-xs font-semibold uppercase tracking-wide text-muted-foreground",
							children: t("navInventory")
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 144,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", {
							className: "mt-3 space-y-1.5 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
									to: "/cars",
									className: "hover:text-accent",
									children: t("navInventory")
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 146,
									columnNumber: 19
								}, this) }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 146,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
									to: "/about",
									className: "hover:text-accent",
									children: t("navAbout")
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 147,
									columnNumber: 19
								}, this) }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 147,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
									to: "/contact",
									className: "hover:text-accent",
									children: t("navContact")
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 148,
									columnNumber: 19
								}, this) }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 148,
									columnNumber: 15
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 145,
							columnNumber: 13
						}, this)] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 143,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h4", {
							className: "text-xs font-semibold uppercase tracking-wide text-muted-foreground",
							children: t("navHome")
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 152,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", {
							className: "mt-3 space-y-1.5 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
									to: "/wishlist",
									className: "hover:text-accent",
									children: t("navWishlist")
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 154,
									columnNumber: 19
								}, this) }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 154,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
									to: "/compare",
									className: "hover:text-accent",
									children: t("navCompare")
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 155,
									columnNumber: 19
								}, this) }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 155,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
									to: "/admin",
									className: "hover:text-accent",
									children: "لوحة الإدارة (Admin)"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 156,
									columnNumber: 19
								}, this) }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 156,
									columnNumber: 15
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 153,
							columnNumber: 13
						}, this)] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 151,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h4", {
							className: "text-xs font-semibold uppercase tracking-wide text-muted-foreground",
							children: t("contactShowroom")
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 160,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", {
							className: "mt-3 space-y-1.5 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: site.phone }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 162,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: site.email }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 163,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: site.address }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 164,
									columnNumber: 15
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 161,
							columnNumber: 13
						}, this)] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 159,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 130,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "border-t border-border",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "mx-auto max-w-7xl px-4 sm:px-6 py-4 text-xs text-muted-foreground flex justify-between items-center flex-wrap gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: [
							"© ",
							(/* @__PURE__ */ new Date()).getFullYear(),
							" VelocityMotors. ",
							t("rightsReserved")
						] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 170,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
							to: "/admin",
							className: "text-muted-foreground hover:text-foreground",
							children: "بوابة الموظفين والإدارة"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 171,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 169,
						columnNumber: 11
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 168,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 129,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 41,
		columnNumber: 5
	}, this);
}
//#endregion
export { toggleFavorite as a, toggleCompare as i, clearCompare as n, useCompareList as o, cn as r, useFavorites as s, PublicLayout as t };
