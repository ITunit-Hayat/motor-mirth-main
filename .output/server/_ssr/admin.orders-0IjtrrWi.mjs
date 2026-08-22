import { r as __toESM } from "../_runtime.mjs";
import { r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { r as useSiteSettings } from "./settings-B88DAbRA.mjs";
import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { D as MapPin, F as Inbox, G as DollarSign, H as FileText, O as Mail, T as MessageCircle, W as ExternalLink, c as Trash2, d as Sparkles, n as X, q as Clock, tt as Calendar, v as Search, x as Phone } from "../_libs/lucide-react.mjs";
import { a as useDealership, i as formatPrice } from "./DealershipContext-CZIneh0B.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { i as getActiveRole, t as AdminLayout } from "./AdminLayout-CslNOPkA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.orders-0IjtrrWi.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/routes/admin.orders.tsx?tsr-split=component";
var statusBadgeStyles = {
	New: "bg-destructive/15 text-destructive border-destructive/30",
	"In Progress": "bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30",
	Contacted: "bg-blue-500/15 text-blue-700 dark:text-blue-300 border-blue-500/30",
	Closed: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30"
};
var statusLabels = {
	New: "جديد (New)",
	"In Progress": "قيد المعالجة (In Progress)",
	Contacted: "تم التواصل (Contacted)",
	Closed: "مغلق / تم البيع (Closed)"
};
var typeLabels = {
	Purchase: {
		label: "طلب شراء",
		icon: "💰"
	},
	"Test Drive": {
		label: "حجز تجربة قيادة",
		icon: "🏎️"
	},
	Financing: {
		label: "طلب تمويل وأقساط",
		icon: "📊"
	},
	"Price Inquiry": {
		label: "استفسار سعر",
		icon: "💬"
	},
	Contact: {
		label: "رسالة تواصل عام",
		icon: "✉️"
	}
};
function ManageOrdersPage() {
	const { orders, updateOrderStatus, deleteOrder, loadingOrders, simulateIncomingLead, markOrderAsRead } = useDealership();
	const site = useSiteSettings();
	getActiveRole();
	const [selectedOrder, setSelectedOrder] = (0, import_react.useState)(null);
	const [internalNoteInput, setInternalNoteInput] = (0, import_react.useState)("");
	const [statusFilter, setStatusFilter] = (0, import_react.useState)("All");
	const [typeFilter, setTypeFilter] = (0, import_react.useState)("All");
	const [searchQuery, setSearchQuery] = (0, import_react.useState)("");
	const filteredOrders = (0, import_react.useMemo)(() => {
		const q = searchQuery.trim().toLowerCase();
		return orders.filter((o) => {
			if (statusFilter !== "All" && o.status !== statusFilter) return false;
			if (typeFilter !== "All" && (o.type || "Purchase") !== typeFilter) return false;
			if (q) {
				if (![
					o.fullName,
					o.phone,
					o.email,
					o.city,
					o.carTitle,
					o.notes,
					o.internalNotes || ""
				].join(" ").toLowerCase().includes(q)) return false;
			}
			return true;
		});
	}, [
		orders,
		statusFilter,
		typeFilter,
		searchQuery
	]);
	const handleOpenOrder = (o) => {
		markOrderAsRead(o.id);
		setSelectedOrder(o);
		setInternalNoteInput(o.internalNotes || "");
	};
	const handleSaveInternalNote = async () => {
		if (!selectedOrder) return;
		try {
			await updateOrderStatus(selectedOrder.id, selectedOrder.status, internalNoteInput);
			setSelectedOrder((prev) => prev ? {
				...prev,
				internalNotes: internalNoteInput
			} : null);
			toast.success("تم حفظ الملاحظة الداخلية للموظف بنجاح");
		} catch {
			toast.error("فشل حفظ الملاحظة");
		}
	};
	const handleStatusChange = async (orderId, newStatus) => {
		try {
			await updateOrderStatus(orderId, newStatus);
			if (selectedOrder && selectedOrder.id === orderId) setSelectedOrder((prev) => prev ? {
				...prev,
				status: newStatus
			} : null);
			toast.success(`تم تحديث مسار الطلب إلى: ${statusLabels[newStatus]}`);
		} catch {
			toast.error("فشل تحديث الحالة");
		}
	};
	const triggerWhatsApp = (o) => {
		const cleanPhone = o.phone.replace(/\D/g, "");
		let arabicMsg = `مرحباً أستاذ ${o.fullName}،\n\nمعك فريق المبيعات في صالة *${site.siteName}*.\n`;
		if (o.type === "Test Drive") arabicMsg += `تلقينا طلبكم الكريم لحجز موعد تجربة قيادة لسيارة: *${o.carTitle}*.\nيسعدنا تأكيد الموعد المناسب لزيارتكم في صالة العرض.`;
		else if (o.type === "Financing") arabicMsg += `تلقينا طلبكم بخصوص حساب خطة التمويل والأقساط لسيارة: *${o.carTitle}*.\nيسعدنا تزويدكم بجدول الدفعات المعتمد مع البنوك والشركات التمويلية.`;
		else arabicMsg += `تلقينا استفساركم الكريم بخصوص سيارة: *${o.carTitle}*.\nيسعدنا الإجابة على أي استفسار وتزويدكم بفيديو فحص تفصيلي.`;
		window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(arabicMsg)}`, "_blank");
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AdminLayout, { children: [
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "flex items-center justify-between flex-wrap gap-4 pb-6 border-b border-border",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
					className: "text-2xl sm:text-3xl font-display font-bold",
					children: "وحدة معالجة الطلبات (Requests & Leads)"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 125,
					columnNumber: 13
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
					className: "text-xs px-2.5 py-0.5 rounded-full bg-accent/15 text-accent font-bold border border-accent/30",
					children: "صندوق الوارد الموحد"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 126,
					columnNumber: 13
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 124,
				columnNumber: 11
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
				className: "text-muted-foreground text-xs sm:text-sm mt-1",
				children: "استقبال طلبات الشراء، حجوزات تجربة القيادة، التمويل، والرد السريع بنقرة واحدة عبر الواتساب."
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 130,
				columnNumber: 11
			}, this)] }, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 123,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
				onClick: () => {
					simulateIncomingLead();
					toast.success("تم إرسال إشعار بطلب عميل جديد!");
				},
				className: "inline-flex items-center gap-1.5 h-10 px-4 rounded-xl bg-accent text-accent-foreground text-xs sm:text-sm font-bold hover:opacity-90 shadow-sm transition",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sparkles, { className: "h-4 w-4" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 139,
					columnNumber: 11
				}, this), " محاكاة طلب تجريبي جديد"]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 135,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 122,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "mt-6 bg-card border border-border rounded-2xl p-4 shadow-card space-y-4",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1",
				children: [
					"All",
					"New",
					"In Progress",
					"Contacted",
					"Closed"
				].map((st) => {
					const count = st === "All" ? orders.length : orders.filter((o) => o.status === st).length;
					const isSelected = statusFilter === st;
					return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						onClick: () => setStatusFilter(st),
						className: `px-3.5 py-1.5 rounded-xl text-xs font-bold transition shrink-0 flex items-center gap-1.5 ${isSelected ? "bg-accent text-accent-foreground shadow-xs" : "bg-secondary hover:bg-muted text-foreground"}`,
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: st === "All" ? "جميع الحالات" : statusLabels[st] }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 151,
							columnNumber: 17
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: `text-[10px] px-1.5 py-0.2 rounded-full ${isSelected ? "bg-black/20 text-white" : "bg-muted text-muted-foreground"}`,
							children: count
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 152,
							columnNumber: 17
						}, this)]
					}, st, true, {
						fileName: _jsxFileName,
						lineNumber: 150,
						columnNumber: 18
					}, this);
				})
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 146,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-border/80",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "relative sm:col-span-2",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Search, { className: "absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 162,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
						type: "text",
						value: searchQuery,
						onChange: (e) => setSearchQuery(e.target.value),
						placeholder: "بحث باسم العميل، رقم الهاتف، أو اسم السيارة...",
						className: "w-full h-10 pr-9 pl-3 rounded-xl bg-background border border-input text-xs"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 163,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 161,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", {
					value: typeFilter,
					onChange: (e) => setTypeFilter(e.target.value),
					className: "w-full h-10 px-3 rounded-xl bg-background border border-input text-xs font-medium",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
							value: "All",
							children: "جميع أنواع الطلبات"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 168,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
							value: "Purchase",
							children: "طلب شراء 💰"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 169,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
							value: "Test Drive",
							children: "حجز تجربة قيادة 🏎️"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 170,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
							value: "Financing",
							children: "طلب تمويل وأقساط 📊"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 171,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
							value: "Price Inquiry",
							children: "استفسار سعر 💬"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 172,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
							value: "Contact",
							children: "رسالة تواصل ✉️"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 173,
							columnNumber: 15
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 167,
					columnNumber: 13
				}, this) }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 166,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 160,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 144,
			columnNumber: 7
		}, this),
		loadingOrders ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "mt-6 space-y-3",
			children: Array.from({ length: 3 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "h-32 rounded-2xl border border-border bg-card animate-pulse" }, i, false, {
				fileName: _jsxFileName,
				lineNumber: 183,
				columnNumber: 24
			}, this))
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 180,
			columnNumber: 24
		}, this) : filteredOrders.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "mt-10 bg-card border border-border rounded-3xl p-16 text-center shadow-card",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Inbox, { className: "h-12 w-12 mx-auto text-muted-foreground" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 185,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mt-3 font-bold text-lg",
					children: "صندوق الوارد فارغ"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 186,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "mt-1 text-xs text-muted-foreground max-w-sm mx-auto",
					children: "طلبات الشراء، حجوزات تجربة القيادة، واستفسارات الزوار ستصل مباشرة إلى هنا."
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 187,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
					onClick: simulateIncomingLead,
					className: "mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-accent text-accent-foreground text-xs font-bold",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sparkles, { className: "h-4 w-4" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 191,
						columnNumber: 13
					}, this), " إنشاء طلب تجريبي للتجربة"]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 190,
					columnNumber: 11
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 184,
			columnNumber: 48
		}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "mt-6 space-y-3",
			children: filteredOrders.map((o) => {
				const typeInfo = typeLabels[o.type || "Purchase"];
				return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					onClick: () => handleOpenOrder(o),
					className: `bg-card border rounded-2xl p-4 sm:p-5 shadow-card hover:border-accent/50 transition-all cursor-pointer group ${o.unread || o.status === "New" ? "border-accent/40 bg-accent/5" : "border-border"}`,
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-start justify-between gap-4 flex-wrap",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-start gap-3 min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "h-11 w-11 rounded-2xl bg-secondary flex items-center justify-center text-lg shrink-0 border border-border",
									children: typeInfo?.icon || "🚗"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 201,
									columnNumber: 21
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "flex items-center gap-2 flex-wrap",
										children: [
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
												className: "font-bold text-sm sm:text-base text-foreground truncate",
												children: o.fullName
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 206,
												columnNumber: 25
											}, this),
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
												className: `text-[11px] px-2.5 py-0.5 rounded-full border font-bold ${statusBadgeStyles[o.status]}`,
												children: statusLabels[o.status]
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 209,
												columnNumber: 25
											}, this),
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
												className: "text-[10px] px-2 py-0.5 rounded-full bg-secondary font-semibold border border-border",
												children: typeInfo?.label
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 212,
												columnNumber: 25
											}, this)
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 205,
										columnNumber: 23
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "text-xs text-primary font-semibold truncate mt-1 flex items-center gap-1.5",
										children: [
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "السيارة المهتم بها:" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 218,
												columnNumber: 25
											}, this),
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", {
												className: "text-foreground",
												children: o.carTitle
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 219,
												columnNumber: 25
											}, this),
											o.carPrice ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
												className: "text-accent",
												children: [
													"(",
													formatPrice(o.carPrice),
													")"
												]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 220,
												columnNumber: 39
											}, this) : null
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 217,
										columnNumber: 23
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 204,
									columnNumber: 21
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 200,
								columnNumber: 19
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "text-right shrink-0 flex flex-col items-end gap-2",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "text-[11px] text-muted-foreground flex items-center gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Clock, { className: "h-3.5 w-3.5" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 228,
										columnNumber: 23
									}, this), new Date(o.createdAt).toLocaleString("ar-SA", {
										month: "short",
										day: "numeric",
										hour: "2-digit",
										minute: "2-digit"
									})]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 227,
									columnNumber: 21
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 226,
								columnNumber: 19
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 198,
							columnNumber: 17
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "mt-3 grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-muted-foreground pt-3 border-t border-border/60",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex items-center gap-1.5 truncate",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Phone, { className: "h-3.5 w-3.5 text-muted-foreground" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 242,
										columnNumber: 21
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										dir: "ltr",
										className: "font-mono",
										children: o.phone
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 243,
										columnNumber: 21
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 241,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex items-center gap-1.5 truncate",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Mail, { className: "h-3.5 w-3.5 text-muted-foreground" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 246,
										columnNumber: 21
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "truncate",
										children: o.email
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 247,
										columnNumber: 21
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 245,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex items-center gap-1.5 truncate",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(MapPin, { className: "h-3.5 w-3.5 text-muted-foreground" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 250,
										columnNumber: 21
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: o.city || "صالة المعرض" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 251,
										columnNumber: 21
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 249,
									columnNumber: 19
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 240,
							columnNumber: 17
						}, this),
						o.notes && /* @__PURE__ */ (void 0)("div", {
							className: "mt-2.5 p-2.5 rounded-xl bg-secondary/50 text-xs text-foreground line-clamp-2",
							children: [/* @__PURE__ */ (void 0)("strong", {
								className: "text-muted-foreground ml-1",
								children: "ملاحظة العميل:"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 257,
								columnNumber: 21
							}, this), o.notes]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 256,
							columnNumber: 29
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "mt-3 pt-3 border-t border-border/60 flex items-center justify-between flex-wrap gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
									className: "text-[11px] font-bold text-muted-foreground",
									children: "تغيير المسار:"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 264,
									columnNumber: 21
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", {
									value: o.status,
									onClick: (e) => e.stopPropagation(),
									onChange: (e) => handleStatusChange(o.id, e.target.value),
									className: `h-8 px-2 rounded-lg border text-xs font-bold ${statusBadgeStyles[o.status]}`,
									children: [
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
											value: "New",
											children: "جديد (New)"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 266,
											columnNumber: 23
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
											value: "In Progress",
											children: "قيد المعالجة (In Progress)"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 267,
											columnNumber: 23
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
											value: "Contacted",
											children: "تم التواصل (Contacted)"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 268,
											columnNumber: 23
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
											value: "Closed",
											children: "مغلق / تم البيع (Closed)"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 269,
											columnNumber: 23
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 265,
									columnNumber: 21
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 263,
								columnNumber: 19
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center gap-1.5",
								onClick: (e) => e.stopPropagation(),
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
										type: "button",
										onClick: () => triggerWhatsApp(o),
										className: "h-8 px-3 rounded-lg bg-emerald-500 text-white hover:bg-emerald-600 text-xs font-bold inline-flex items-center gap-1 shadow-xs transition",
										title: "فتح محادثة واتساب فورية مع رسالة جاهزة",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(MessageCircle, { className: "h-3.5 w-3.5" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 276,
											columnNumber: 23
										}, this), " واتساب سريع"]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 275,
										columnNumber: 21
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
										href: `tel:${o.phone}`,
										className: "h-8 px-2.5 rounded-lg border border-input bg-card hover:bg-secondary text-xs font-bold inline-flex items-center gap-1 transition",
										title: "اتصال هاتفي",
										children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Phone, { className: "h-3.5 w-3.5" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 280,
											columnNumber: 23
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 279,
										columnNumber: 21
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
										href: `mailto:${o.email}?subject=${encodeURIComponent(`بخصوص طلبكم لسيارة ${o.carTitle}`)}`,
										className: "h-8 px-2.5 rounded-lg border border-input bg-card hover:bg-secondary text-xs font-bold inline-flex items-center gap-1 transition",
										title: "إرسال بريد إلكتروني",
										children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Mail, { className: "h-3.5 w-3.5" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 284,
											columnNumber: 23
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 283,
										columnNumber: 21
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
										type: "button",
										onClick: () => handleOpenOrder(o),
										className: "h-8 px-3 rounded-lg bg-secondary hover:bg-muted text-xs font-bold inline-flex items-center gap-1 transition",
										children: "التفاصيل والملاحظات ←"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 287,
										columnNumber: 21
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 274,
								columnNumber: 19
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 262,
							columnNumber: 17
						}, this)
					]
				}, o.id, true, {
					fileName: _jsxFileName,
					lineNumber: 197,
					columnNumber: 16
				}, this);
			})
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 193,
			columnNumber: 18
		}, this),
		selectedOrder && /* @__PURE__ */ (void 0)("div", {
			className: "fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto",
			onClick: () => setSelectedOrder(null),
			children: /* @__PURE__ */ (void 0)("div", {
				className: "w-full max-w-2xl bg-card rounded-3xl shadow-elegant border border-border overflow-hidden my-6 flex flex-col max-h-[90vh]",
				onClick: (e) => e.stopPropagation(),
				children: [
					/* @__PURE__ */ (void 0)("div", {
						className: "p-5 sm:p-6 border-b border-border flex items-center justify-between bg-muted/20",
						children: [/* @__PURE__ */ (void 0)("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (void 0)("div", {
								className: "h-12 w-12 rounded-2xl bg-accent/15 text-accent flex items-center justify-center text-xl",
								children: typeLabels[selectedOrder.type || "Purchase"]?.icon || "🚗"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 302,
								columnNumber: 17
							}, this), /* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("h2", {
								className: "text-lg sm:text-xl font-bold",
								children: selectedOrder.fullName
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 306,
								columnNumber: 19
							}, this), /* @__PURE__ */ (void 0)("div", {
								className: "text-xs text-muted-foreground flex items-center gap-2 mt-0.5",
								children: [
									/* @__PURE__ */ (void 0)("span", { children: typeLabels[selectedOrder.type || "Purchase"]?.label }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 308,
										columnNumber: 21
									}, this),
									/* @__PURE__ */ (void 0)("span", { children: "•" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 309,
										columnNumber: 21
									}, this),
									/* @__PURE__ */ (void 0)("span", { children: new Date(selectedOrder.createdAt).toLocaleString("ar-SA") }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 310,
										columnNumber: 21
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 307,
								columnNumber: 19
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 305,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 301,
							columnNumber: 15
						}, this), /* @__PURE__ */ (void 0)("button", {
							onClick: () => setSelectedOrder(null),
							className: "h-9 w-9 rounded-full bg-secondary hover:bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground",
							children: /* @__PURE__ */ (void 0)(X, { className: "h-5 w-5" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 316,
								columnNumber: 17
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 315,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 300,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (void 0)("div", {
						className: "p-5 sm:p-6 space-y-5 overflow-y-auto flex-1 text-xs sm:text-sm",
						children: [
							/* @__PURE__ */ (void 0)("div", {
								className: "p-4 rounded-2xl bg-secondary/50 border border-border flex items-center justify-between gap-3",
								children: [/* @__PURE__ */ (void 0)("div", {
									className: "flex items-center gap-3 min-w-0",
									children: [selectedOrder.carImage ? /* @__PURE__ */ (void 0)("img", {
										src: selectedOrder.carImage,
										alt: selectedOrder.carTitle,
										className: "h-14 w-20 rounded-xl object-cover bg-muted shrink-0"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 325,
										columnNumber: 45
									}, this) : null, /* @__PURE__ */ (void 0)("div", {
										className: "min-w-0",
										children: [
											/* @__PURE__ */ (void 0)("div", {
												className: "text-xs text-muted-foreground",
												children: "السيارة المرتبطة بالطلب"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 327,
												columnNumber: 21
											}, this),
											/* @__PURE__ */ (void 0)("div", {
												className: "font-bold text-foreground truncate",
												children: selectedOrder.carTitle
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 328,
												columnNumber: 21
											}, this),
											selectedOrder.carPrice ? /* @__PURE__ */ (void 0)("div", {
												className: "text-xs text-accent font-bold mt-0.5",
												children: formatPrice(selectedOrder.carPrice)
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 329,
												columnNumber: 47
											}, this) : null
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 326,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 324,
									columnNumber: 17
								}, this), /* @__PURE__ */ (void 0)(Link, {
									to: "/cars/$id",
									params: { id: selectedOrder.carId || "1" },
									className: "px-3 py-1.5 rounded-xl bg-card border border-input hover:bg-secondary text-xs font-bold inline-flex items-center gap-1 shrink-0",
									children: ["صفحة السيارة ", /* @__PURE__ */ (void 0)(ExternalLink, { className: "h-3.5 w-3.5" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 338,
										columnNumber: 32
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 335,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 323,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (void 0)("div", {
								className: "grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-2xl bg-card border border-border",
								children: [
									/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("div", {
										className: "text-xs text-muted-foreground mb-0.5",
										children: "رقم الهاتف"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 345,
										columnNumber: 19
									}, this), /* @__PURE__ */ (void 0)("div", {
										className: "font-bold font-mono",
										dir: "ltr",
										children: selectedOrder.phone
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 346,
										columnNumber: 19
									}, this)] }, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 344,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("div", {
										className: "text-xs text-muted-foreground mb-0.5",
										children: "البريد الإلكتروني"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 349,
										columnNumber: 19
									}, this), /* @__PURE__ */ (void 0)("div", {
										className: "font-bold truncate",
										children: selectedOrder.email
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 350,
										columnNumber: 19
									}, this)] }, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 348,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("div", {
										className: "text-xs text-muted-foreground mb-0.5",
										children: "المدينة"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 353,
										columnNumber: 19
									}, this), /* @__PURE__ */ (void 0)("div", {
										className: "font-bold",
										children: selectedOrder.city || "صالة العرض الرئيسية"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 354,
										columnNumber: 19
									}, this)] }, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 352,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("div", {
										className: "text-xs text-muted-foreground mb-0.5",
										children: "الموظف المسؤول"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 357,
										columnNumber: 19
									}, this), /* @__PURE__ */ (void 0)("div", {
										className: "font-bold text-primary",
										children: selectedOrder.assignedAgent || "أحمد المنصوري"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 358,
										columnNumber: 19
									}, this)] }, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 356,
										columnNumber: 17
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 343,
								columnNumber: 15
							}, this),
							selectedOrder.preferredDate && /* @__PURE__ */ (void 0)("div", {
								className: "p-3 bg-blue-500/10 border border-blue-500/20 rounded-xl text-xs flex items-center justify-between",
								children: [/* @__PURE__ */ (void 0)("span", {
									className: "font-semibold text-blue-700 dark:text-blue-300 flex items-center gap-1.5",
									children: [/* @__PURE__ */ (void 0)(Calendar, { className: "h-4 w-4" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 365,
										columnNumber: 21
									}, this), " الموعد المفضل لتجربة القيادة:"]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 364,
									columnNumber: 19
								}, this), /* @__PURE__ */ (void 0)("strong", {
									className: "text-foreground",
									children: selectedOrder.preferredDate
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 367,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 363,
								columnNumber: 47
							}, this),
							selectedOrder.downPayment && /* @__PURE__ */ (void 0)("div", {
								className: "p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-xs flex items-center justify-between",
								children: [/* @__PURE__ */ (void 0)("span", {
									className: "font-semibold text-emerald-700 dark:text-emerald-300 flex items-center gap-1.5",
									children: [/* @__PURE__ */ (void 0)(DollarSign, { className: "h-4 w-4" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 372,
										columnNumber: 21
									}, this), " الدفعة الأولى المقترحة:"]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 371,
									columnNumber: 19
								}, this), /* @__PURE__ */ (void 0)("strong", {
									className: "text-foreground",
									children: formatPrice(selectedOrder.downPayment)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 374,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 370,
								columnNumber: 45
							}, this),
							selectedOrder.notes && /* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("label", {
								className: "text-xs font-bold text-muted-foreground block mb-1",
								children: "رسالة / استفسار العميل:"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 379,
								columnNumber: 19
							}, this), /* @__PURE__ */ (void 0)("div", {
								className: "p-3.5 rounded-xl bg-muted/50 border border-border text-xs sm:text-sm",
								children: selectedOrder.notes
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 382,
								columnNumber: 19
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 378,
								columnNumber: 39
							}, this),
							/* @__PURE__ */ (void 0)("div", {
								className: "pt-2 border-t border-border",
								children: [
									/* @__PURE__ */ (void 0)("label", {
										className: "text-xs font-bold text-foreground flex items-center gap-1.5 mb-1.5",
										children: [/* @__PURE__ */ (void 0)(FileText, { className: "h-4 w-4 text-accent" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 390,
											columnNumber: 19
										}, this), "الملاحظات الداخلية للموظف ومسار التواصل:"]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 389,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (void 0)("textarea", {
										rows: 3,
										value: internalNoteInput,
										onChange: (e) => setInternalNoteInput(e.target.value),
										placeholder: "سجل تفاصيل المكالمة الهاتفية، عروض الأسعار المقدمة، موعد المعاينة، أو سبب الإغلاق...",
										className: "w-full p-3 rounded-xl bg-background border border-input text-xs focus:ring-2 focus:ring-accent outline-none"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 393,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (void 0)("div", {
										className: "mt-2 flex justify-end",
										children: /* @__PURE__ */ (void 0)("button", {
											type: "button",
											onClick: handleSaveInternalNote,
											className: "h-8 px-4 rounded-lg bg-accent text-accent-foreground text-xs font-bold hover:opacity-90 transition",
											children: "حفظ الملاحظة الداخلية"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 395,
											columnNumber: 19
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 394,
										columnNumber: 17
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 388,
								columnNumber: 15
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 321,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (void 0)("div", {
						className: "p-4 sm:p-5 border-t border-border bg-muted/20 flex items-center justify-between flex-wrap gap-2",
						children: [/* @__PURE__ */ (void 0)("button", {
							type: "button",
							onClick: () => triggerWhatsApp(selectedOrder),
							className: "h-10 px-4 rounded-xl bg-emerald-500 text-white font-bold text-xs sm:text-sm inline-flex items-center gap-1.5 hover:bg-emerald-600 shadow-sm transition",
							children: [/* @__PURE__ */ (void 0)(MessageCircle, { className: "h-4 w-4" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 405,
								columnNumber: 17
							}, this), " مراسلة عبر الواتساب"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 404,
							columnNumber: 15
						}, this), /* @__PURE__ */ (void 0)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (void 0)("button", {
								type: "button",
								onClick: async () => {
									if (!confirm("هل أنت متأكد من حذف هذا الطلب؟")) return;
									await deleteOrder(selectedOrder.id);
									setSelectedOrder(null);
									toast.success("تم حذف الطلب");
								},
								className: "h-10 px-3 rounded-xl bg-destructive/10 text-destructive hover:bg-destructive/20 text-xs font-bold inline-flex items-center gap-1",
								children: [/* @__PURE__ */ (void 0)(Trash2, { className: "h-4 w-4" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 415,
									columnNumber: 19
								}, this), " حذف الطلب"]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 409,
								columnNumber: 17
							}, this), /* @__PURE__ */ (void 0)("button", {
								type: "button",
								onClick: () => setSelectedOrder(null),
								className: "h-10 px-4 rounded-xl bg-secondary text-foreground hover:bg-muted text-xs font-bold",
								children: "إغلاق النافذة"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 418,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 408,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 403,
						columnNumber: 13
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 298,
				columnNumber: 11
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 297,
			columnNumber: 25
		}, this)
	] }, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 120,
		columnNumber: 10
	}, this);
}
//#endregion
export { ManageOrdersPage as component };
