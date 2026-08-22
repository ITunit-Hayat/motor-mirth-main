import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { i as useAnalytics, t as resetAnalytics } from "./analytics-CSNBGE9S.mjs";
import { r as useSiteSettings } from "./settings-B88DAbRA.mjs";
import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { J as ClipboardList, N as Layers, T as MessageCircle, U as Eye, c as Trash2, ct as ArrowUpRight, d as Sparkles, et as Car, h as ShieldCheck, s as TrendingUp } from "../_libs/lucide-react.mjs";
import { a as useDealership, i as formatPrice } from "./DealershipContext-CZIneh0B.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { i as getActiveRole, t as AdminLayout } from "./AdminLayout-CslNOPkA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.index-wrMKrUfU.js
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/routes/admin.index.tsx?tsr-split=component";
function AdminDashboardHome() {
	const { cars, orders, simulateIncomingLead, markOrderAsRead } = useDealership();
	const a = useAnalytics();
	const site = useSiteSettings();
	getActiveRole();
	const activeCars = cars.filter((c) => (c.status ?? "Active") === "Active");
	const soldCars = cars.filter((c) => c.status === "Sold");
	const reservedCars = cars.filter((c) => c.status === "Reserved");
	const draftCars = cars.filter((c) => c.status === "Draft");
	const totalInventoryValue = activeCars.reduce((s, c) => s + c.price, 0);
	const totalSoldValue = soldCars.reduce((s, c) => s + c.price, 0);
	const unreadOrders = orders.filter((o) => o.unread || o.status === "New");
	orders.filter((o) => o.status === "In Progress");
	const closedOrders = orders.filter((o) => o.status === "Closed");
	const conversionRate = orders.length > 0 ? Math.round(closedOrders.length / orders.length * 100) : 0;
	const maxDay = Math.max(1, ...a.viewsLast7Days.map((d) => d.count));
	const topCars = Object.entries(a.carViews).map(([id, count]) => ({
		car: cars.find((c) => c.id === id),
		count
	})).filter((x) => x.car).sort((x, y) => y.count - x.count).slice(0, 4);
	const openWhatsApp = (phone, customerName, carTitle) => {
		const cleanPhone = phone.replace(/\D/g, "");
		const msg = encodeURIComponent(`مرحباً أستاذ ${customerName}، معك صالة ${site.siteName} بخصوص استفساركم عن سيارة (${carTitle}). يسعدنا تزويدكم بكافة التفاصيل والإجابة على أي استفسار.`);
		window.open(`https://wa.me/${cleanPhone}?text=${msg}`, "_blank");
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AdminLayout, { children: [
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "flex items-center justify-between flex-wrap gap-4 pb-6 border-b border-border",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
					className: "text-2xl sm:text-3xl font-display font-bold",
					children: "مركز القيادة (Main Dashboard)"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 49,
					columnNumber: 13
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
					className: "text-xs px-2.5 py-0.5 rounded-full bg-accent/15 text-accent font-bold border border-accent/30",
					children: "إحصائيات فورية حية"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 50,
					columnNumber: 13
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 48,
				columnNumber: 11
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
				className: "text-muted-foreground text-xs sm:text-sm mt-1",
				children: "متابعة دقيقة للمخزون، حركة المبيعات، والطلبات الواردة لحظة بلحظة."
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 54,
				columnNumber: 11
			}, this)] }, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 47,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex items-center gap-2 flex-wrap",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
					onClick: () => {
						simulateIncomingLead();
						toast.success("تم إرسال تنبيه بوصول طلب جديد!");
					},
					className: "inline-flex items-center gap-1.5 h-10 px-3.5 rounded-xl bg-accent text-accent-foreground text-xs font-bold hover:opacity-90 shadow-sm transition",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sparkles, { className: "h-4 w-4" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 64,
						columnNumber: 13
					}, this), " محاكاة طلب عميل جديد"]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 60,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
					onClick: () => {
						resetAnalytics();
						toast.success("تم تصفير عدادات الإحصائيات");
					},
					className: "inline-flex items-center gap-1.5 h-10 px-3 rounded-xl border border-input bg-card hover:bg-secondary text-xs text-muted-foreground hover:text-destructive transition",
					title: "تصفير عدادات الزيارات",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Trash2, { className: "h-3.5 w-3.5" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 71,
						columnNumber: 13
					}, this), " تصفير الزيارات"]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 67,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 59,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 46,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "bg-card border border-border rounded-2xl p-5 shadow-card relative overflow-hidden group",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "text-xs font-semibold text-muted-foreground",
								children: "إجمالي السيارات المعروضة"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 81,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "h-9 w-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Car, { className: "h-5 w-5" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 83,
									columnNumber: 15
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 82,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 80,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "mt-2 text-2xl sm:text-3xl font-display font-bold text-foreground",
							children: [
								activeCars.length,
								" ",
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "text-xs font-normal text-muted-foreground",
									children: "سيارة متاحة"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 87,
									columnNumber: 33
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 86,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "mt-2 text-xs text-muted-foreground flex items-center gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "font-semibold text-accent",
								children: formatPrice(totalInventoryValue)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 90,
								columnNumber: 13
							}, this), " قيمة المخزون"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 89,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "absolute bottom-0 left-0 right-0 h-1 bg-primary/40" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 92,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 79,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "bg-card border border-border rounded-2xl p-5 shadow-card relative overflow-hidden",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "text-xs font-semibold text-muted-foreground",
								children: "السيارات المباعة هذا الشهر"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 98,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "h-9 w-9 rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TrendingUp, { className: "h-5 w-5" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 100,
									columnNumber: 15
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 99,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 97,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "mt-2 text-2xl sm:text-3xl font-display font-bold text-foreground",
							children: [
								soldCars.length,
								" ",
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "text-xs font-normal text-muted-foreground",
									children: "صفقة مكتملة"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 104,
									columnNumber: 31
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 103,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "mt-2 text-xs text-muted-foreground flex items-center gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "font-semibold text-emerald-600 dark:text-emerald-400",
								children: formatPrice(totalSoldValue)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 107,
								columnNumber: 13
							}, this), " مبيعات محققة"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 106,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "absolute bottom-0 left-0 right-0 h-1 bg-emerald-500/60" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 109,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 96,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "bg-card border border-border rounded-2xl p-5 shadow-card relative overflow-hidden",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "text-xs font-semibold text-muted-foreground",
								children: "طلبات جديدة غير معالجة"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 115,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "h-9 w-9 rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-400 flex items-center justify-center",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ClipboardList, { className: "h-5 w-5" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 117,
									columnNumber: 15
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 116,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 114,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "mt-2 text-2xl sm:text-3xl font-display font-bold text-foreground flex items-center gap-2",
							children: [unreadOrders.length, unreadOrders.length > 0 && /* @__PURE__ */ (void 0)("span", {
								className: "text-xs px-2 py-0.5 rounded-full bg-destructive text-destructive-foreground font-bold animate-pulse",
								children: "تتطلب الرد"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 122,
								columnNumber: 41
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 120,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "mt-2 text-xs text-muted-foreground flex items-center gap-1.5",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: [
								"من إجمالي ",
								orders.length,
								" طلب وارد"
							] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 127,
								columnNumber: 13
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 126,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "absolute bottom-0 left-0 right-0 h-1 bg-accent" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 129,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 113,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "bg-card border border-border rounded-2xl p-5 shadow-card relative overflow-hidden",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "text-xs font-semibold text-muted-foreground",
								children: "حركة الزيارات (اليوم)"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 135,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "h-9 w-9 rounded-xl bg-blue-500/15 text-blue-600 dark:text-blue-400 flex items-center justify-center",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Eye, { className: "h-5 w-5" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 137,
									columnNumber: 15
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 136,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 134,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "mt-2 text-2xl sm:text-3xl font-display font-bold text-foreground",
							children: [
								a.viewsToday.toLocaleString(),
								" ",
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "text-xs font-normal text-muted-foreground",
									children: "مشاهدة اليوم"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 141,
									columnNumber: 45
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 140,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "mt-2 text-xs text-muted-foreground flex items-center gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "font-semibold text-foreground",
								children: a.totalViews.toLocaleString()
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 144,
								columnNumber: 13
							}, this), " إجمالي الزيارات"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 143,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "absolute bottom-0 left-0 right-0 h-1 bg-blue-500/60" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 146,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 133,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 77,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "lg:col-span-2 bg-card border border-border rounded-3xl p-5 sm:p-6 shadow-card",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center justify-between flex-wrap gap-2 mb-6",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
							className: "font-bold text-base sm:text-lg flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TrendingUp, { className: "h-5 w-5 text-accent" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 157,
								columnNumber: 17
							}, this), " حركة التفاعل والزيارات — آخر 7 أيام"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 156,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "text-xs text-muted-foreground mt-0.5",
							children: "تتبع نشاط المشترين وزوار صالة العرض لاتخاذ قرارات الترويج والعروض."
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 159,
							columnNumber: 15
						}, this)] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 155,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "text-xs font-bold px-3 py-1 rounded-full bg-secondary text-secondary-foreground",
							children: [
								"معدل التحويل: ",
								conversionRate,
								"%"
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 163,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 154,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-end gap-3 sm:gap-4 h-48 pt-4 pb-2 border-b border-border/80",
						children: a.viewsLast7Days.map((d) => {
							const heightPct = Math.max(8, d.count / maxDay * 100);
							return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex-1 flex flex-col items-center gap-2 h-full justify-end group",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "text-[11px] font-bold text-foreground group-hover:text-accent transition",
										children: d.count
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 172,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "w-full max-w-[48px] rounded-t-xl bg-gradient-accent opacity-90 group-hover:opacity-100 transition-all shadow-xs",
										style: { height: `${heightPct}%` }
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 175,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "text-[11px] text-muted-foreground font-medium truncate",
										children: d.day
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 178,
										columnNumber: 19
									}, this)
								]
							}, d.day, true, {
								fileName: _jsxFileName,
								lineNumber: 171,
								columnNumber: 20
							}, this);
						})
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 168,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "mt-6 pt-2 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "text-xs text-emerald-600 dark:text-emerald-400 font-bold",
									children: "منشورة (Active)"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 188,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "text-lg font-bold mt-0.5",
									children: activeCars.length
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 189,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 187,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "text-xs text-amber-600 dark:text-amber-400 font-bold",
									children: "محجوزة (Reserved)"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 192,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "text-lg font-bold mt-0.5",
									children: reservedCars.length
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 193,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 191,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "text-xs text-blue-600 dark:text-blue-400 font-bold",
									children: "مباعة (Sold)"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 196,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "text-lg font-bold mt-0.5",
									children: soldCars.length
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 197,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 195,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "p-2.5 rounded-xl bg-stone-500/10 border border-stone-500/20",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "text-xs text-muted-foreground font-bold",
									children: "مسودة (Draft)"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 200,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "text-lg font-bold mt-0.5",
									children: draftCars.length
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 201,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 199,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 186,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 153,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "bg-card border border-border rounded-3xl p-5 sm:p-6 shadow-card flex flex-col",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center justify-between pb-4 border-b border-border",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
						className: "font-bold text-base flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ClipboardList, { className: "h-5 w-5 text-accent" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 210,
							columnNumber: 15
						}, this), " تنبيهات الطلبات الواردة"]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 209,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
						to: "/admin/orders",
						className: "text-xs font-bold text-accent hover:underline",
						children: [
							"الكل (",
							orders.length,
							") ←"
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 212,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 208,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mt-4 space-y-3 flex-1 overflow-y-auto max-h-[340px] no-scrollbar",
					children: orders.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "py-12 text-center text-xs text-muted-foreground",
						children: "لا توجد طلبات واردة حتى الآن."
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 218,
						columnNumber: 36
					}, this) : orders.slice(0, 4).map((ord) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: `p-3.5 rounded-2xl border transition-all ${ord.unread || ord.status === "New" ? "bg-accent/10 border-accent/40 shadow-xs" : "bg-secondary/40 border-border"}`,
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center justify-between gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "font-bold text-xs",
									children: ord.fullName
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 222,
									columnNumber: 21
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "text-[10px] px-2 py-0.5 rounded-full bg-secondary font-semibold border border-border",
									children: ord.type === "Test Drive" ? "تجربة قيادة" : ord.type === "Financing" ? "طلب تمويل" : ord.type === "Price Inquiry" ? "استفسار سعر" : "طلب شراء"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 223,
									columnNumber: 21
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 221,
								columnNumber: 19
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "text-xs font-semibold text-primary truncate mt-1",
								children: ord.carTitle
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 228,
								columnNumber: 19
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "text-[11px] text-muted-foreground mt-1 line-clamp-1",
								children: ord.notes || `هاتف: ${ord.phone}`
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 232,
								columnNumber: 19
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "mt-2.5 pt-2 border-t border-border/60 flex items-center justify-between gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "text-[10px] text-muted-foreground",
									children: new Date(ord.createdAt).toLocaleTimeString("ar-SA", {
										hour: "2-digit",
										minute: "2-digit"
									})
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 237,
									columnNumber: 21
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex items-center gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
										onClick: () => openWhatsApp(ord.phone, ord.fullName, ord.carTitle),
										className: "h-7 px-2 rounded-lg bg-emerald-500/15 text-emerald-600 hover:bg-emerald-500/25 text-[11px] font-bold inline-flex items-center gap-1 transition",
										title: "محادثة واتساب فورية",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(MessageCircle, { className: "h-3 w-3" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 246,
											columnNumber: 25
										}, this), " واتساب"]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 245,
										columnNumber: 23
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
										to: "/admin/orders",
										className: "h-7 px-2 rounded-lg bg-secondary hover:bg-muted text-[11px] font-bold inline-flex items-center transition",
										children: "تفاصيل"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 248,
										columnNumber: 23
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 244,
									columnNumber: 21
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 236,
								columnNumber: 19
							}, this)
						]
					}, ord.id, true, {
						fileName: _jsxFileName,
						lineNumber: 220,
						columnNumber: 54
					}, this))
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 217,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 207,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 151,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "mt-8 bg-card border border-border rounded-3xl p-5 sm:p-6 shadow-card",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex items-center justify-between flex-wrap gap-2 mb-4",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
					className: "font-bold text-base sm:text-lg",
					children: "السيارات الأكثر طلباً وتفاعلاً من الزوار"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 262,
					columnNumber: 13
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "text-xs text-muted-foreground",
					children: "مؤشر اهتمام المشترين لتحديد أولويات التسويق وإعادة التسعير."
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 263,
					columnNumber: 13
				}, this)] }, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 261,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
					to: "/admin/cars",
					className: "text-xs font-bold text-accent hover:underline",
					children: [
						"إدارة كل السيارات (",
						cars.length,
						") ←"
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 267,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 260,
				columnNumber: 9
			}, this), topCars.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "p-8 text-center text-xs text-muted-foreground bg-secondary/30 rounded-2xl",
				children: "لم تسجل زيارات تفصيلية بعد — تصفح سيارات الموقع لتوليد بيانات حقيقية."
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 272,
				columnNumber: 33
			}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4",
				children: topCars.map(({ car, count }) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "p-3.5 rounded-2xl bg-secondary/50 border border-border hover:shadow-card transition flex flex-col justify-between group",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "aspect-[16/10] rounded-xl overflow-hidden bg-muted relative",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
								src: car.images[0],
								alt: car.title,
								className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 281,
								columnNumber: 21
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "absolute top-2 right-2 px-2 py-0.5 rounded-full bg-black/70 backdrop-blur text-white text-[10px] font-bold",
								children: [count, " مشاهدة"]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 282,
								columnNumber: 21
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 280,
							columnNumber: 19
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "mt-2.5 font-bold text-xs sm:text-sm truncate",
							children: car.title
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 286,
							columnNumber: 19
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "text-xs font-semibold text-accent mt-0.5",
							children: formatPrice(car.price)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 287,
							columnNumber: 19
						}, this)
					] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 279,
						columnNumber: 17
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "mt-3 pt-2 border-t border-border/60 flex items-center justify-between text-xs",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "text-[11px] text-muted-foreground",
							children: car.category
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 291,
							columnNumber: 19
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
							to: "/cars/$id",
							params: { id: car.id },
							className: "text-[11px] font-bold text-primary hover:text-accent inline-flex items-center gap-0.5",
							children: ["معاينة ", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowUpRight, { className: "h-3 w-3" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 295,
								columnNumber: 28
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 292,
							columnNumber: 19
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 290,
						columnNumber: 17
					}, this)]
				}, car.id, true, {
					fileName: _jsxFileName,
					lineNumber: 278,
					columnNumber: 15
				}, this))
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 274,
				columnNumber: 20
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 259,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
					to: "/admin/cars",
					className: "bg-card border border-border rounded-2xl p-5 hover:shadow-card hover:border-accent/50 transition group",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "h-10 w-10 rounded-xl bg-accent/15 text-accent flex items-center justify-center group-hover:scale-110 transition",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Car, { className: "h-5 w-5" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 306,
								columnNumber: 13
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 305,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "mt-3 font-bold text-sm",
							children: "وحدة التحكم في المخزون"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 308,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "text-xs text-muted-foreground mt-1",
							children: "إضافة وتعديل السيارات بالتبويبات وتغيير حالة الظهور (منشورة، مسودة، محجوزة، مباعة)."
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 309,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 304,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
					to: "/admin/orders",
					className: "bg-card border border-border rounded-2xl p-5 hover:shadow-card hover:border-accent/50 transition group",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "h-10 w-10 rounded-xl bg-blue-500/15 text-blue-600 dark:text-blue-400 flex items-center justify-center group-hover:scale-110 transition",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ClipboardList, { className: "h-5 w-5" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 316,
								columnNumber: 13
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 315,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "mt-3 font-bold text-sm",
							children: "وحدة معالجة الطلبات"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 318,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "text-xs text-muted-foreground mt-1",
							children: "صندوق الوارد الموحد ومتابعة مسار الطلبات مع ميزة الرد السريع عبر الواتساب."
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 319,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 314,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
					to: "/admin/settings",
					className: "bg-card border border-border rounded-2xl p-5 hover:shadow-card hover:border-accent/50 transition group",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "h-10 w-10 rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center group-hover:scale-110 transition",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Layers, { className: "h-5 w-5" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 326,
								columnNumber: 13
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 325,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "mt-3 font-bold text-sm",
							children: "وحدة الثوابت والقوائم المنسدلة"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 328,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "text-xs text-muted-foreground mt-1",
							children: "إدارة الماركات والموديلات والفئات والألوان وانعكاسها المباشر على فلاتر البحث."
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 329,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 324,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
					to: "/admin/settings",
					className: "bg-card border border-border rounded-2xl p-5 hover:shadow-card hover:border-accent/50 transition group",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "h-10 w-10 rounded-xl bg-purple-500/15 text-purple-600 dark:text-purple-400 flex items-center justify-center group-hover:scale-110 transition",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ShieldCheck, { className: "h-5 w-5" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 336,
								columnNumber: 13
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 335,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "mt-3 font-bold text-sm",
							children: "وحدة الأمان وإدارة الصلاحيات"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 338,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "text-xs text-muted-foreground mt-1",
							children: "تحديد صلاحيات المدير العام، موظف المبيعات، ومسؤول المخزون ورموز الدخول."
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 339,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 334,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 303,
			columnNumber: 7
		}, this)
	] }, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 44,
		columnNumber: 10
	}, this);
}
//#endregion
export { AdminDashboardHome as component };
