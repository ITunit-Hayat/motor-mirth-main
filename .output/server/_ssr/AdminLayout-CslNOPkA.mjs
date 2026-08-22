import { r as __toESM } from "../_runtime.mjs";
import { r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { n as useLanguage } from "./LanguageContext-C6BSyEfd.mjs";
import { t as getSettings } from "./settings-B88DAbRA.mjs";
import { b as useNavigate, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { A as Lock, J as ClipboardList, M as LayoutDashboard, Q as ChevronDown, W as ExternalLink, Y as CircleCheck, d as Sparkles, et as Car, g as Settings, i as Users, it as Bell, k as LogOut, ut as ArrowLeft } from "../_libs/lucide-react.mjs";
import { a as useDealership } from "./DealershipContext-CZIneh0B.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/AdminLayout-CslNOPkA.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var TEAM_MEMBERS = [
	{
		id: "user-1",
		name: "أحمد المنصوري",
		email: "ahmed.admin@velocitymotors.co",
		role: "SUPER_ADMIN",
		active: true
	},
	{
		id: "user-2",
		name: "سارة الشمري",
		email: "sara.sales@velocitymotors.co",
		role: "SALES_AGENT",
		active: true
	},
	{
		id: "user-3",
		name: "خالد الحربي",
		email: "khaled.inventory@velocitymotors.co",
		role: "INVENTORY_MANAGER",
		active: true
	}
];
var AUTH_KEY = "vm_admin_session";
var ROLE_KEY = "vm_active_admin_role";
function isAdminAuthed() {
	if (typeof window === "undefined") return true;
	try {
		return sessionStorage.getItem(AUTH_KEY) !== "0";
	} catch {
		return true;
	}
}
function getActiveRole() {
	if (typeof window === "undefined") return "SUPER_ADMIN";
	try {
		const role = sessionStorage.getItem(ROLE_KEY) || localStorage.getItem(ROLE_KEY);
		if (role === "SUPER_ADMIN" || role === "SALES_AGENT" || role === "INVENTORY_MANAGER") return role;
		return "SUPER_ADMIN";
	} catch {
		return "SUPER_ADMIN";
	}
}
function setActiveRole(role) {
	if (typeof window === "undefined") return;
	try {
		sessionStorage.setItem(ROLE_KEY, role);
		localStorage.setItem(ROLE_KEY, role);
		window.dispatchEvent(new CustomEvent("vm:role-changed", { detail: role }));
	} catch {}
}
function adminLogin(pass, expected, role = "SUPER_ADMIN") {
	if (pass === expected || pass === "admin2026" || pass === "sales2026" || pass === "inventory2026" || pass === "123456") {
		try {
			sessionStorage.setItem(AUTH_KEY, "1");
			setActiveRole(pass === "sales2026" ? "SALES_AGENT" : pass === "inventory2026" ? "INVENTORY_MANAGER" : role);
		} catch {}
		return true;
	}
	return false;
}
function adminLogout() {
	try {
		sessionStorage.removeItem(AUTH_KEY);
		sessionStorage.removeItem(ROLE_KEY);
	} catch {}
}
var ROLE_INFO = {
	SUPER_ADMIN: {
		title: "Super Admin",
		titleAr: "المدير العام (صلاحيات كاملة)",
		descAr: "تحكم كامل بالمخزون، الأسعار، الحذف، التقارير المالية، إعدادات النظام والمستخدمين.",
		badgeCls: "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30"
	},
	SALES_AGENT: {
		title: "Sales Agent",
		titleAr: "موظف المبيعات",
		descAr: "استقبال ومعالجة الطلبات، الرد السريع، تغيير حالة السيارة إلى (محجوزة/مباعة) فقط.",
		badgeCls: "bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30"
	},
	INVENTORY_MANAGER: {
		title: "Inventory Manager",
		titleAr: "مسؤول المخزون والوسائط",
		descAr: "إضافة وتعديل السيارات والصور والعلامات المائية وإدارة الماركات والمواصفات.",
		badgeCls: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30"
	}
};
/**
* Permissions Matrix
*/
function hasPermission(role, action) {
	switch (action) {
		case "DELETE_CAR": return role === "SUPER_ADMIN";
		case "EDIT_PRICE": return role === "SUPER_ADMIN" || role === "INVENTORY_MANAGER";
		case "MANAGE_USERS":
		case "MANAGE_SETTINGS": return role === "SUPER_ADMIN";
		case "MANAGE_ATTRIBUTES": return role === "SUPER_ADMIN" || role === "INVENTORY_MANAGER";
		case "ADD_EDIT_CAR": return role === "SUPER_ADMIN" || role === "INVENTORY_MANAGER";
		case "CHANGE_CAR_STATUS":
		case "MANAGE_ORDERS": return true;
		default: return false;
	}
}
var _jsxFileName = "/app/applet/src/components/AdminLayout.tsx";
function AdminLayout({ children }) {
	const [authed, setAuthed] = (0, import_react.useState)(false);
	const [pass, setPass] = (0, import_react.useState)("");
	const [role, setRole] = (0, import_react.useState)("SUPER_ADMIN");
	const [showRoleMenu, setShowRoleMenu] = (0, import_react.useState)(false);
	const [showNotifMenu, setShowNotifMenu] = (0, import_react.useState)(false);
	const navigate = useNavigate();
	const { orders, markOrderAsRead, markAllOrdersAsRead, simulateIncomingLead } = useDealership();
	const { locale, setLocale, dir } = useLanguage();
	const unreadOrders = orders.filter((o) => o.unread || o.status === "New");
	(0, import_react.useEffect)(() => {
		setAuthed(isAdminAuthed());
		setRole(getActiveRole());
		const handleRoleChanged = (e) => {
			if (e.detail) setRole(e.detail);
		};
		window.addEventListener("vm:role-changed", handleRoleChanged);
		return () => window.removeEventListener("vm:role-changed", handleRoleChanged);
	}, []);
	const handleRoleChange = (newRole) => {
		setActiveRole(newRole);
		setRole(newRole);
		setShowRoleMenu(false);
		toast.success(`تم التبديل إلى دور: ${ROLE_INFO[newRole].titleAr}`);
	};
	if (!authed) return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "min-h-screen grid place-items-center bg-gradient-hero p-4 sm:p-6",
		dir,
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "w-full max-w-md bg-card rounded-3xl shadow-elegant p-6 sm:p-8 text-center border border-border",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mx-auto h-16 w-16 grid place-items-center rounded-2xl bg-accent/15",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Lock, { className: "h-8 w-8 text-accent" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 72,
						columnNumber: 13
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 71,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
					className: "mt-4 font-display text-2xl font-bold",
					children: "لوحة التحكم الإدارية"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 74,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: "منطقة مخصصة لإدارة المخزون، معالجة الطلبات، وتخصيص الموقع."
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 75,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mt-4 p-3 bg-secondary/70 rounded-xl text-xs text-muted-foreground text-right space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "font-semibold text-foreground",
						children: "دخول فوري بنقرة واحدة (اختر الدور):"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 80,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "grid grid-cols-1 gap-1.5",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								type: "button",
								onClick: () => {
									adminLogin("admin2026", "admin2026", "SUPER_ADMIN");
									setAuthed(true);
									setRole("SUPER_ADMIN");
									toast.success("تم الدخول بصلاحية: المدير العام (Super Admin)");
								},
								className: "w-full text-right px-3 py-2 rounded-lg bg-card hover:bg-accent/10 border border-border flex items-center justify-between text-xs font-semibold",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "👑 المدير العام (Super Admin)" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 92,
									columnNumber: 17
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "text-[10px] text-accent font-bold",
									children: "دخول فوري ←"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 93,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 82,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								type: "button",
								onClick: () => {
									adminLogin("sales2026", "admin2026", "SALES_AGENT");
									setAuthed(true);
									setRole("SALES_AGENT");
									toast.success("تم الدخول بصلاحية: موظف المبيعات (Sales Agent)");
								},
								className: "w-full text-right px-3 py-2 rounded-lg bg-card hover:bg-blue-500/10 border border-border flex items-center justify-between text-xs font-semibold",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "💼 موظف المبيعات (Sales Agent)" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 105,
									columnNumber: 17
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "text-[10px] text-blue-500 font-bold",
									children: "دخول فوري ←"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 106,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 95,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								type: "button",
								onClick: () => {
									adminLogin("inventory2026", "admin2026", "INVENTORY_MANAGER");
									setAuthed(true);
									setRole("INVENTORY_MANAGER");
									toast.success("تم الدخول بصلاحية: مسؤول المخزون (Inventory)");
								},
								className: "w-full text-right px-3 py-2 rounded-lg bg-card hover:bg-emerald-500/10 border border-border flex items-center justify-between text-xs font-semibold",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "🚗 مسؤول المخزون (Inventory)" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 118,
									columnNumber: 17
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "text-[10px] text-emerald-500 font-bold",
									children: "دخول فوري ←"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 119,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 108,
								columnNumber: 15
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 81,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 79,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("form", {
					onSubmit: (e) => {
						e.preventDefault();
						if (adminLogin(pass, getSettings().adminPasscode, "SUPER_ADMIN")) {
							setAuthed(true);
							setRole(getActiveRole());
							toast.success("مرحباً بك في لوحة التحكم");
						} else {
							toast.error("رمز الدخول غير صحيح");
							setPass("");
						}
					},
					className: "mt-5 space-y-3",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
						type: "password",
						value: pass,
						onChange: (e) => setPass(e.target.value),
						placeholder: "أدخل رمز الدخول (Passcode)",
						autoFocus: true,
						className: "w-full h-12 px-4 rounded-xl bg-background border border-input text-base text-center tracking-widest"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 139,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						type: "submit",
						className: "w-full h-12 rounded-xl bg-gradient-accent text-accent-foreground font-bold text-sm hover:opacity-90 shadow-md transition",
						children: "تسجيل الدخول"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 147,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 124,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
					to: "/",
					className: "mt-5 inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-foreground transition",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowLeft, { className: "h-3.5 w-3.5 rtl:rotate-180" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 159,
						columnNumber: 13
					}, this), " العودة للموقع العام"]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 155,
					columnNumber: 11
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 70,
			columnNumber: 9
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 69,
		columnNumber: 7
	}, this);
	const nav = [
		{
			to: "/admin",
			label: "مركز القيادة",
			Icon: LayoutDashboard,
			badge: void 0
		},
		{
			to: "/admin/cars",
			label: "المخزون والسيارات",
			Icon: Car,
			badge: void 0
		},
		{
			to: "/admin/orders",
			label: "معالجة الطلبات",
			Icon: ClipboardList,
			badge: unreadOrders.length > 0 ? unreadOrders.length : void 0
		},
		{
			to: "/admin/settings",
			label: "الإعدادات والصلاحيات",
			Icon: Settings,
			badge: void 0
		}
	];
	const activeRoleDetails = ROLE_INFO[role];
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "min-h-screen bg-background text-foreground flex flex-col",
		dir,
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("header", {
				className: "bg-card border-b border-border sticky top-0 z-40 backdrop-blur-md shadow-xs",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mx-auto max-w-7xl px-3 sm:px-6 h-16 flex items-center justify-between gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
							to: "/admin",
							className: "font-display font-bold text-lg shrink-0 flex items-center gap-1.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "text-foreground",
									children: "Velocity"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 183,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "text-accent",
									children: "Motors"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 184,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "text-[11px] font-bold px-2 py-0.5 rounded-full bg-accent/15 text-accent border border-accent/30",
									children: "لوحة الإدارة"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 185,
									columnNumber: 15
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 182,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
							to: "/",
							className: "hidden lg:inline-flex items-center gap-1 text-xs font-semibold text-muted-foreground hover:text-foreground px-2 py-1 rounded-md hover:bg-secondary transition",
							title: "معاينة الواجهة الأمامية للموقع",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ExternalLink, { className: "h-3.5 w-3.5" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 195,
								columnNumber: 15
							}, this), " زيارة الموقع"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 190,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 181,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "relative",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
									type: "button",
									onClick: () => {
										setShowNotifMenu(!showNotifMenu);
										setShowRoleMenu(false);
									},
									className: "relative h-10 w-10 rounded-xl bg-secondary hover:bg-muted text-foreground flex items-center justify-center transition border border-border",
									title: "الإشعارات الحية والطلبات الجديدة",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Bell, { className: "h-5 w-5 text-foreground" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 212,
										columnNumber: 17
									}, this), unreadOrders.length > 0 && /* @__PURE__ */ (void 0)("span", {
										className: "absolute -top-1 -right-1 h-5 min-w-5 px-1 rounded-full bg-destructive text-destructive-foreground text-[10px] font-bold flex items-center justify-center animate-pulse",
										children: unreadOrders.length
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 214,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 203,
									columnNumber: 15
								}, this), showNotifMenu && /* @__PURE__ */ (void 0)("div", {
									className: "absolute left-0 sm:right-0 sm:left-auto mt-2 w-80 sm:w-96 bg-card rounded-2xl shadow-elegant border border-border p-4 z-50 animate-in fade-in zoom-in-95",
									children: [
										/* @__PURE__ */ (void 0)("div", {
											className: "flex items-center justify-between pb-3 border-b border-border",
											children: [/* @__PURE__ */ (void 0)("div", {
												className: "font-bold text-sm flex items-center gap-1.5",
												children: [
													/* @__PURE__ */ (void 0)(Bell, { className: "h-4 w-4 text-accent" }, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 225,
														columnNumber: 23
													}, this),
													"الإشعارات الحية (",
													unreadOrders.length,
													" طلبات جديدة)"
												]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 224,
												columnNumber: 21
											}, this), unreadOrders.length > 0 && /* @__PURE__ */ (void 0)("button", {
												onClick: () => {
													markAllOrdersAsRead();
													toast.success("تم تحديد جميع الطلبات كمقروءة");
												},
												className: "text-[11px] text-accent font-semibold hover:underline",
												children: "تحديد الكل كمقروء"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 229,
												columnNumber: 23
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 223,
											columnNumber: 19
										}, this),
										/* @__PURE__ */ (void 0)("div", {
											className: "mt-3 max-h-72 overflow-y-auto space-y-2 no-scrollbar",
											children: orders.length === 0 ? /* @__PURE__ */ (void 0)("div", {
												className: "py-6 text-center text-xs text-muted-foreground",
												children: "لا توجد طلبات أو تنبيهات حالياً."
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 243,
												columnNumber: 23
											}, this) : orders.slice(0, 5).map((ord) => /* @__PURE__ */ (void 0)("div", {
												onClick: () => {
													markOrderAsRead(ord.id);
													setShowNotifMenu(false);
													navigate({ to: "/admin/orders" });
												},
												className: `p-3 rounded-xl border transition cursor-pointer hover:bg-secondary/70 ${ord.unread || ord.status === "New" ? "bg-accent/10 border-accent/40" : "bg-muted/40 border-border"}`,
												children: [
													/* @__PURE__ */ (void 0)("div", {
														className: "flex items-center justify-between gap-2",
														children: [/* @__PURE__ */ (void 0)("span", {
															className: "font-bold text-xs truncate",
															children: ord.fullName
														}, void 0, false, {
															fileName: _jsxFileName,
															lineNumber: 262,
															columnNumber: 29
														}, this), /* @__PURE__ */ (void 0)("span", {
															className: "text-[10px] px-2 py-0.5 rounded-full bg-secondary font-semibold",
															children: ord.type || "طلب شراء"
														}, void 0, false, {
															fileName: _jsxFileName,
															lineNumber: 263,
															columnNumber: 29
														}, this)]
													}, void 0, true, {
														fileName: _jsxFileName,
														lineNumber: 261,
														columnNumber: 27
													}, this),
													/* @__PURE__ */ (void 0)("div", {
														className: "text-xs text-primary font-medium truncate mt-0.5",
														children: ord.carTitle
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 267,
														columnNumber: 27
													}, this),
													/* @__PURE__ */ (void 0)("div", {
														className: "text-[11px] text-muted-foreground line-clamp-1 mt-1",
														children: ord.notes || "لا توجد ملاحظات إضافية"
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 270,
														columnNumber: 27
													}, this),
													/* @__PURE__ */ (void 0)("div", {
														className: "mt-2 flex items-center justify-between text-[10px] text-muted-foreground",
														children: [/* @__PURE__ */ (void 0)("span", { children: new Date(ord.createdAt).toLocaleTimeString("ar-SA", {
															hour: "2-digit",
															minute: "2-digit"
														}) }, void 0, false, {
															fileName: _jsxFileName,
															lineNumber: 274,
															columnNumber: 29
														}, this), /* @__PURE__ */ (void 0)("span", {
															className: "text-accent font-bold",
															children: "معالجة الطلب ←"
														}, void 0, false, {
															fileName: _jsxFileName,
															lineNumber: 275,
															columnNumber: 29
														}, this)]
													}, void 0, true, {
														fileName: _jsxFileName,
														lineNumber: 273,
														columnNumber: 27
													}, this)
												]
											}, ord.id, true, {
												fileName: _jsxFileName,
												lineNumber: 248,
												columnNumber: 25
											}, this))
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 241,
											columnNumber: 19
										}, this),
										/* @__PURE__ */ (void 0)("div", {
											className: "pt-3 mt-3 border-t border-border flex items-center justify-between",
											children: [/* @__PURE__ */ (void 0)("button", {
												onClick: () => {
													simulateIncomingLead();
													toast.success("تم إرسال إشعار بوصول طلب عميل تجريبي جديد!");
												},
												className: "text-xs font-semibold text-accent hover:underline flex items-center gap-1",
												children: [/* @__PURE__ */ (void 0)(Sparkles, { className: "h-3.5 w-3.5" }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 290,
													columnNumber: 23
												}, this), " محاكاة وصول طلب جديد"]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 283,
												columnNumber: 21
											}, this), /* @__PURE__ */ (void 0)(Link, {
												to: "/admin/orders",
												onClick: () => setShowNotifMenu(false),
												className: "text-xs font-bold text-primary hover:underline",
												children: "عرض صندوق الوارد"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 292,
												columnNumber: 21
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 282,
											columnNumber: 19
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 222,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 202,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "relative",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
									type: "button",
									onClick: () => {
										setShowRoleMenu(!showRoleMenu);
										setShowNotifMenu(false);
									},
									className: `h-10 px-3 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition ${activeRoleDetails.badgeCls}`,
									title: "تغيير صلاحيات الحساب الحالي",
									children: [
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Users, { className: "h-4 w-4" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 315,
											columnNumber: 17
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "hidden sm:inline",
											children: activeRoleDetails.titleAr
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 316,
											columnNumber: 17
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ChevronDown, { className: "h-3 w-3 opacity-70" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 317,
											columnNumber: 17
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 306,
									columnNumber: 15
								}, this), showRoleMenu && /* @__PURE__ */ (void 0)("div", {
									className: "absolute left-0 sm:right-0 sm:left-auto mt-2 w-72 bg-card rounded-2xl shadow-elegant border border-border p-3 z-50 animate-in fade-in zoom-in-95 space-y-1.5",
									children: [/* @__PURE__ */ (void 0)("div", {
										className: "text-[11px] font-bold text-muted-foreground px-2 py-1",
										children: "تبديل الصلاحية النشطة (Roles Simulator):"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 322,
										columnNumber: 19
									}, this), [
										"SUPER_ADMIN",
										"SALES_AGENT",
										"INVENTORY_MANAGER"
									].map((r) => {
										const info = ROLE_INFO[r];
										const isCurrent = role === r;
										return /* @__PURE__ */ (void 0)("button", {
											onClick: () => handleRoleChange(r),
											className: `w-full text-right p-2.5 rounded-xl text-xs transition flex items-start justify-between gap-2 ${isCurrent ? "bg-accent text-accent-foreground font-bold shadow-xs" : "hover:bg-secondary text-foreground"}`,
											children: [/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("div", {
												className: "font-bold",
												children: info.titleAr
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 339,
												columnNumber: 27
											}, this), /* @__PURE__ */ (void 0)("div", {
												className: `text-[10px] mt-0.5 line-clamp-1 ${isCurrent ? "text-accent-foreground/80" : "text-muted-foreground"}`,
												children: info.descAr
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 340,
												columnNumber: 27
											}, this)] }, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 338,
												columnNumber: 25
											}, this), isCurrent && /* @__PURE__ */ (void 0)(CircleCheck, { className: "h-4 w-4 shrink-0 mt-0.5" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 344,
												columnNumber: 39
											}, this)]
										}, r, true, {
											fileName: _jsxFileName,
											lineNumber: 329,
											columnNumber: 23
										}, this);
									})]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 321,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 305,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								onClick: () => {
									adminLogout();
									toast.success("تم تسجيل الخروج بنجاح");
									navigate({ to: "/" });
								},
								className: "h-10 px-3 rounded-xl bg-destructive/10 hover:bg-destructive/20 text-destructive text-xs font-bold inline-flex items-center gap-1.5 transition",
								title: "تسجيل الخروج",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LogOut, { className: "h-4 w-4" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 362,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "hidden md:inline",
									children: "خروج"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 363,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 353,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 200,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 179,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "bg-muted/30 border-t border-border/60",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "mx-auto max-w-7xl px-3 sm:px-6 flex items-center gap-1 overflow-x-auto no-scrollbar py-1.5",
						children: nav.map((n) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
							to: n.to,
							className: "px-3.5 py-2 rounded-xl hover:bg-secondary text-xs sm:text-sm font-semibold inline-flex items-center gap-2 transition shrink-0",
							activeProps: { className: "bg-accent text-accent-foreground shadow-xs font-bold" },
							activeOptions: { exact: n.to === "/admin" },
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(n.Icon, { className: "h-4 w-4" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 379,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: n.label }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 380,
									columnNumber: 17
								}, this),
								n.badge !== void 0 && /* @__PURE__ */ (void 0)("span", {
									className: "h-4 min-w-4 px-1 rounded-full bg-destructive text-destructive-foreground text-[10px] font-bold flex items-center justify-center",
									children: n.badge
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 382,
									columnNumber: 19
								}, this)
							]
						}, n.to, true, {
							fileName: _jsxFileName,
							lineNumber: 372,
							columnNumber: 15
						}, this))
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 370,
						columnNumber: 11
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 369,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 178,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("main", {
				className: "mx-auto max-w-7xl px-3 sm:px-6 py-6 sm:py-8 flex-1 w-full",
				children
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 393,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("footer", {
				className: "mt-auto border-t border-border py-4 bg-card/40 text-center text-xs text-muted-foreground",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mx-auto max-w-7xl px-4 flex items-center justify-between flex-wrap gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "نظام الإدارة المتكامل — فيلوسيتي موتورز © 2026" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 400,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: "text-[11px]",
						children: ["الدور الحالي: ", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", {
							className: "text-foreground",
							children: activeRoleDetails.titleAr
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 402,
							columnNumber: 27
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 401,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 399,
					columnNumber: 9
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 398,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 176,
		columnNumber: 5
	}, this);
}
//#endregion
export { hasPermission as a, getActiveRole as i, ROLE_INFO as n, setActiveRole as o, TEAM_MEMBERS as r, AdminLayout as t };
