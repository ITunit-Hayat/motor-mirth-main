import { r as __toESM } from "../_runtime.mjs";
import { r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { n as updateSettings, r as useSiteSettings } from "./settings-B88DAbRA.mjs";
import { C as Palette, N as Layers, P as Key, V as Fuel, Y as CircleCheck, b as Plus, c as Trash2, d as Sparkles, et as Car, f as SlidersVertical, h as ShieldCheck, i as Users, rt as Building, y as RotateCcw } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { i as getActiveRole, n as ROLE_INFO, o as setActiveRole, r as TEAM_MEMBERS, t as AdminLayout } from "./AdminLayout-UG9sri-Y.mjs";
import { t as useDynamicAttributes } from "./dynamicAttributes-BONL40cQ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.settings-BbFjxHEL.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/routes/admin.settings.tsx?tsr-split=component";
function AdminSettingsPage() {
	const [activeTab, setActiveTab] = (0, import_react.useState)("attributes");
	const [attrs, setAttrs] = useDynamicAttributes();
	const site = useSiteSettings();
	const activeRole = getActiveRole();
	const [attrSubTab, setAttrSubTab] = (0, import_react.useState)("makes");
	const [newMakeName, setNewMakeName] = (0, import_react.useState)("");
	const [newMakeCountry, setNewMakeCountry] = (0, import_react.useState)("");
	const [selectedMakeForModel, setSelectedMakeForModel] = (0, import_react.useState)(attrs.makes[0]?.id || "");
	const [newModelName, setNewModelName] = (0, import_react.useState)("");
	const [newCategoryName, setNewCategoryName] = (0, import_react.useState)("");
	const [newTransmissionName, setNewTransmissionName] = (0, import_react.useState)("");
	const [newFuelName, setNewFuelName] = (0, import_react.useState)("");
	const [newDrivetrainName, setNewDrivetrainName] = (0, import_react.useState)("");
	const [newColorName, setNewColorName] = (0, import_react.useState)("");
	const [generalForm, setGeneralForm] = (0, import_react.useState)({
		siteName: site.siteName,
		dealershipPhone: site.dealershipPhone,
		dealershipEmail: site.dealershipEmail,
		whatsappNumber: site.whatsappNumber,
		address: site.address,
		currencySymbol: site.currencySymbol,
		adminPasscode: site.adminPasscode
	});
	const handleAddMake = () => {
		const trimmed = newMakeName.trim();
		if (!trimmed) {
			toast.error("يرجى إدخال اسم الماركة");
			return;
		}
		if (attrs.makes.some((m) => m.name.toLowerCase() === trimmed.toLowerCase())) {
			toast.error("هذه الماركة موجودة بالفعل");
			return;
		}
		const newMake = {
			id: `make-${Date.now()}`,
			name: trimmed,
			country: newMakeCountry.trim() || "International",
			models: []
		};
		setAttrs({
			...attrs,
			makes: [...attrs.makes, newMake]
		});
		setNewMakeName("");
		setNewMakeCountry("");
		toast.success(`تمت إضافة ماركة (${trimmed}) بنجاح`);
	};
	const handleDeleteMake = (id) => {
		if (attrs.makes.length <= 1) {
			toast.error("يجب الإبقاء على ماركة واحدة على الأقل");
			return;
		}
		setAttrs({
			...attrs,
			makes: attrs.makes.filter((m) => m.id !== id)
		});
		toast.info("تم حذف الماركة");
	};
	const handleAddModelToMake = () => {
		const trimmed = newModelName.trim();
		if (!trimmed) {
			toast.error("يرجى إدخال اسم الموديل");
			return;
		}
		const make = attrs.makes.find((m) => m.id === selectedMakeForModel);
		if (!make) return;
		if (make.models.includes(trimmed)) {
			toast.error("هذا الموديل مضاف بالفعل للماركة المحددة");
			return;
		}
		const updatedMakes = attrs.makes.map((m) => {
			if (m.id === selectedMakeForModel) return {
				...m,
				models: [...m.models, trimmed]
			};
			return m;
		});
		setAttrs({
			...attrs,
			makes: updatedMakes
		});
		setNewModelName("");
		toast.success(`تمت إضافة الموديل (${trimmed}) إلى ${make.name}`);
	};
	const handleDeleteModel = (makeId, modelName) => {
		const updatedMakes = attrs.makes.map((m) => {
			if (m.id === makeId) return {
				...m,
				models: m.models.filter((x) => x !== modelName)
			};
			return m;
		});
		setAttrs({
			...attrs,
			makes: updatedMakes
		});
		toast.info(`تم حذف الموديل (${modelName})`);
	};
	const handleAddStringItem = (key, val, resetFn) => {
		const trimmed = val.trim();
		if (!trimmed) return;
		if (attrs[key].includes(trimmed)) {
			toast.error("العنصر موجود مسبقاً");
			return;
		}
		setAttrs({
			...attrs,
			[key]: [...attrs[key], trimmed]
		});
		resetFn();
		toast.success(`تمت الإضافة بنجاح`);
	};
	const handleDeleteStringItem = (key, val) => {
		if (attrs[key].length <= 1) {
			toast.error("يجب الإبقاء على عنصر واحد على الأقل");
			return;
		}
		setAttrs({
			...attrs,
			[key]: attrs[key].filter((x) => x !== val)
		});
		toast.info("تم الحذف");
	};
	const handleSaveGeneralSettings = (e) => {
		e.preventDefault();
		updateSettings(generalForm);
		toast.success("تم حفظ إعدادات المعرض وبيانات التواصل بنجاح");
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AdminLayout, { children: [
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "flex items-center justify-between flex-wrap gap-4 pb-6 border-b border-border",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
					className: "text-2xl sm:text-3xl font-display font-bold",
					children: "الإعدادات، الثوابت، والصلاحيات"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 156,
					columnNumber: 13
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
					className: "text-xs px-2.5 py-0.5 rounded-full bg-secondary font-bold border border-border",
					children: "التحكم الديناميكي الشامل"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 157,
					columnNumber: 13
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 155,
				columnNumber: 11
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
				className: "text-muted-foreground text-xs sm:text-sm mt-1",
				children: "إدارة الماركات، الموديلات، الفئات، الصلاحيات، وإعدادات صالة العرض دون الحاجة لتعديل الكود البرمجي."
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 161,
				columnNumber: 11
			}, this)] }, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 154,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex items-center gap-2",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
					onClick: () => {
						if (confirm("هل أنت متأكد من استعادة كافة الثوابت الافتراضية؟")) {
							localStorage.removeItem("vm_dynamic_attributes");
							window.location.reload();
						}
					},
					className: "h-10 px-3.5 rounded-xl border border-input bg-card hover:bg-secondary text-xs font-semibold inline-flex items-center gap-1.5 transition",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(RotateCcw, { className: "h-3.5 w-3.5" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 173,
						columnNumber: 13
					}, this), " استعادة الافتراضيات"]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 167,
					columnNumber: 11
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 166,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 153,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "mt-6 border-b border-border flex items-center gap-2 overflow-x-auto no-scrollbar",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
					onClick: () => setActiveTab("attributes"),
					className: `py-3 px-4 text-xs sm:text-sm font-bold border-b-2 transition flex items-center gap-2 shrink-0 ${activeTab === "attributes" ? "border-accent text-accent" : "border-transparent text-muted-foreground hover:text-foreground"}`,
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Layers, { className: "h-4 w-4" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 181,
						columnNumber: 11
					}, this), " 1. إدارة الثوابت والقوائم المنسدلة (Dynamic Attributes)"]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 180,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
					onClick: () => setActiveTab("security"),
					className: `py-3 px-4 text-xs sm:text-sm font-bold border-b-2 transition flex items-center gap-2 shrink-0 ${activeTab === "security" ? "border-accent text-accent" : "border-transparent text-muted-foreground hover:text-foreground"}`,
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ShieldCheck, { className: "h-4 w-4" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 185,
						columnNumber: 11
					}, this), " 2. الأمان وإدارة الصلاحيات (Roles & RBAC)"]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 184,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
					onClick: () => setActiveTab("general"),
					className: `py-3 px-4 text-xs sm:text-sm font-bold border-b-2 transition flex items-center gap-2 shrink-0 ${activeTab === "general" ? "border-accent text-accent" : "border-transparent text-muted-foreground hover:text-foreground"}`,
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Building, { className: "h-4 w-4" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 189,
						columnNumber: 11
					}, this), " 3. إعدادات المعرض وبيانات التواصل"]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 188,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 179,
			columnNumber: 7
		}, this),
		activeTab === "attributes" && /* @__PURE__ */ (void 0)("div", {
			className: "mt-6 space-y-6 animate-in fade-in",
			children: [
				/* @__PURE__ */ (void 0)("div", {
					className: "flex items-center gap-1.5 overflow-x-auto no-scrollbar bg-muted/40 p-1.5 rounded-2xl border border-border",
					children: [
						{
							id: "makes",
							label: `الماركات والموديلات (${attrs.makes.length})`,
							Icon: Car
						},
						{
							id: "categories",
							label: `فئات السيارات (${attrs.categories.length})`,
							Icon: SlidersVertical
						},
						{
							id: "transmissions",
							label: `نواقل الحركة (${attrs.transmissions.length})`,
							Icon: Layers
						},
						{
							id: "fuels",
							label: `أنواع الوقود (${attrs.fuelTypes.length})`,
							Icon: Fuel
						},
						{
							id: "drivetrains",
							label: `أنظمة الدفع (${attrs.drivetrains.length})`,
							Icon: Sparkles
						},
						{
							id: "colors",
							label: `الألوان الشائعة (${attrs.colors.length})`,
							Icon: Palette
						}
					].map((st) => /* @__PURE__ */ (void 0)("button", {
						onClick: () => setAttrSubTab(st.id),
						className: `px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shrink-0 ${attrSubTab === st.id ? "bg-accent text-accent-foreground shadow-xs" : "hover:bg-secondary text-muted-foreground hover:text-foreground"}`,
						children: [
							/* @__PURE__ */ (void 0)(st.Icon, { className: "h-3.5 w-3.5" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 222,
								columnNumber: 17
							}, this),
							" ",
							st.label
						]
					}, st.id, true, {
						fileName: _jsxFileName,
						lineNumber: 221,
						columnNumber: 22
					}, this))
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 196,
					columnNumber: 11
				}, this),
				attrSubTab === "makes" && /* @__PURE__ */ (void 0)("div", {
					className: "space-y-6",
					children: [
						/* @__PURE__ */ (void 0)("div", {
							className: "bg-card border border-border rounded-2xl p-5 shadow-card",
							children: [/* @__PURE__ */ (void 0)("h3", {
								className: "font-bold text-sm mb-3 flex items-center gap-2",
								children: [/* @__PURE__ */ (void 0)(Plus, { className: "h-4 w-4 text-accent" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 231,
									columnNumber: 19
								}, this), " إضافة ماركة تجارية جديدة"]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 230,
								columnNumber: 17
							}, this), /* @__PURE__ */ (void 0)("div", {
								className: "grid grid-cols-1 sm:grid-cols-3 gap-3",
								children: [
									/* @__PURE__ */ (void 0)("input", {
										type: "text",
										value: newMakeName,
										onChange: (e) => setNewMakeName(e.target.value),
										placeholder: "اسم الماركة (مثال: Genesis, Maserati, Aston Martin)",
										className: "h-10 px-3 rounded-xl bg-background border border-input text-xs"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 234,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (void 0)("input", {
										type: "text",
										value: newMakeCountry,
										onChange: (e) => setNewMakeCountry(e.target.value),
										placeholder: "بلد المنشأ (مثال: Germany, Japan, Italy)",
										className: "h-10 px-3 rounded-xl bg-background border border-input text-xs"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 235,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (void 0)("button", {
										type: "button",
										onClick: handleAddMake,
										className: "h-10 px-4 rounded-xl bg-accent text-accent-foreground font-bold text-xs hover:opacity-90 transition",
										children: "حفظ الماركة الجديدة"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 236,
										columnNumber: 19
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 233,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 229,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (void 0)("div", {
							className: "bg-card border border-border rounded-2xl p-5 shadow-card",
							children: [/* @__PURE__ */ (void 0)("h3", {
								className: "font-bold text-sm mb-3 flex items-center gap-2",
								children: [/* @__PURE__ */ (void 0)(Plus, { className: "h-4 w-4 text-accent" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 245,
									columnNumber: 19
								}, this), " إضافة موديل لماركة محددة"]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 244,
								columnNumber: 17
							}, this), /* @__PURE__ */ (void 0)("div", {
								className: "grid grid-cols-1 sm:grid-cols-3 gap-3",
								children: [
									/* @__PURE__ */ (void 0)("select", {
										value: selectedMakeForModel,
										onChange: (e) => setSelectedMakeForModel(e.target.value),
										className: "h-10 px-3 rounded-xl bg-background border border-input text-xs font-semibold",
										children: attrs.makes.map((m) => /* @__PURE__ */ (void 0)("option", {
											value: m.id,
											children: m.name
										}, m.id, false, {
											fileName: _jsxFileName,
											lineNumber: 249,
											columnNumber: 43
										}, this))
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 248,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (void 0)("input", {
										type: "text",
										value: newModelName,
										onChange: (e) => setNewModelName(e.target.value),
										placeholder: "اسم الموديل الجديد (مثال: Panamera, G63 AMG)",
										className: "h-10 px-3 rounded-xl bg-background border border-input text-xs"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 253,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (void 0)("button", {
										type: "button",
										onClick: handleAddModelToMake,
										className: "h-10 px-4 rounded-xl bg-secondary hover:bg-muted text-foreground font-bold text-xs transition border border-border",
										children: "إضافة الموديل للماركة"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 254,
										columnNumber: 19
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 247,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 243,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (void 0)("div", {
							className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",
							children: attrs.makes.map((m) => /* @__PURE__ */ (void 0)("div", {
								className: "bg-card border border-border rounded-2xl p-4 shadow-card flex flex-col justify-between",
								children: [/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("div", {
									className: "flex items-center justify-between pb-2 border-b border-border",
									children: [/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("div", {
										className: "font-bold text-sm text-foreground",
										children: m.name
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 266,
										columnNumber: 27
									}, this), /* @__PURE__ */ (void 0)("span", {
										className: "text-[10px] text-muted-foreground",
										children: m.country || "International"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 267,
										columnNumber: 27
									}, this)] }, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 265,
										columnNumber: 25
									}, this), /* @__PURE__ */ (void 0)("button", {
										onClick: () => handleDeleteMake(m.id),
										className: "p-1.5 rounded-lg hover:bg-destructive/10 text-destructive transition",
										title: "حذف الماركة بالكامل",
										children: /* @__PURE__ */ (void 0)(Trash2, { className: "h-3.5 w-3.5" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 270,
											columnNumber: 27
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 269,
										columnNumber: 25
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 264,
									columnNumber: 23
								}, this), /* @__PURE__ */ (void 0)("div", {
									className: "mt-3 flex flex-wrap gap-1.5",
									children: m.models.length === 0 ? /* @__PURE__ */ (void 0)("span", {
										className: "text-[11px] text-muted-foreground italic",
										children: "لا توجد موديلات مسجلة بعد"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 276,
										columnNumber: 50
									}, this) : m.models.map((mod) => /* @__PURE__ */ (void 0)("span", {
										className: "inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-secondary text-[11px] font-semibold text-foreground group",
										children: [mod, /* @__PURE__ */ (void 0)("button", {
											onClick: () => handleDeleteModel(m.id, mod),
											className: "text-muted-foreground hover:text-destructive transition ml-1",
											title: "حذف هذا الموديل",
											children: "×"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 278,
											columnNumber: 31
										}, this)]
									}, mod, true, {
										fileName: _jsxFileName,
										lineNumber: 276,
										columnNumber: 164
									}, this))
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 275,
									columnNumber: 23
								}, this)] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 263,
									columnNumber: 21
								}, this), /* @__PURE__ */ (void 0)("div", {
									className: "mt-3 pt-2 text-[10px] text-muted-foreground border-t border-border/60",
									children: [
										"إجمالي ",
										m.models.length,
										" موديلات مسجلة"
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 285,
									columnNumber: 21
								}, this)]
							}, m.id, true, {
								fileName: _jsxFileName,
								lineNumber: 262,
								columnNumber: 39
							}, this))
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 261,
							columnNumber: 15
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 227,
					columnNumber: 38
				}, this),
				attrSubTab === "categories" && /* @__PURE__ */ (void 0)("div", {
					className: "space-y-4",
					children: [/* @__PURE__ */ (void 0)("div", {
						className: "bg-card border border-border rounded-2xl p-4 shadow-card flex gap-2",
						children: [/* @__PURE__ */ (void 0)("input", {
							type: "text",
							value: newCategoryName,
							onChange: (e) => setNewCategoryName(e.target.value),
							placeholder: "اسم الفئة الجديدة (مثال: Hatchback, Convertible, Pickup)",
							className: "flex-1 h-10 px-3 rounded-xl bg-background border border-input text-xs"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 295,
							columnNumber: 17
						}, this), /* @__PURE__ */ (void 0)("button", {
							type: "button",
							onClick: () => handleAddStringItem("categories", newCategoryName, () => setNewCategoryName("")),
							className: "h-10 px-4 rounded-xl bg-accent text-accent-foreground text-xs font-bold",
							children: "إضافة فئة"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 296,
							columnNumber: 17
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 294,
						columnNumber: 15
					}, this), /* @__PURE__ */ (void 0)("div", {
						className: "grid grid-cols-2 sm:grid-cols-4 gap-3",
						children: attrs.categories.map((cat) => /* @__PURE__ */ (void 0)("div", {
							className: "p-3 bg-card border border-border rounded-xl flex items-center justify-between",
							children: [/* @__PURE__ */ (void 0)("span", {
								className: "text-xs font-bold",
								children: cat
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 303,
								columnNumber: 21
							}, this), /* @__PURE__ */ (void 0)("button", {
								onClick: () => handleDeleteStringItem("categories", cat),
								className: "p-1 rounded hover:bg-destructive/10 text-destructive",
								children: /* @__PURE__ */ (void 0)(Trash2, { className: "h-3.5 w-3.5" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 305,
									columnNumber: 23
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 304,
								columnNumber: 21
							}, this)]
						}, cat, true, {
							fileName: _jsxFileName,
							lineNumber: 302,
							columnNumber: 46
						}, this))
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 301,
						columnNumber: 15
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 293,
					columnNumber: 43
				}, this),
				attrSubTab === "transmissions" && /* @__PURE__ */ (void 0)("div", {
					className: "space-y-4",
					children: [/* @__PURE__ */ (void 0)("div", {
						className: "bg-card border border-border rounded-2xl p-4 shadow-card flex gap-2",
						children: [/* @__PURE__ */ (void 0)("input", {
							type: "text",
							value: newTransmissionName,
							onChange: (e) => setNewTransmissionName(e.target.value),
							placeholder: "اسم ناقل الحركة الجديد (مثال: 9-Speed Automatic, 6-Speed Manual)",
							className: "flex-1 h-10 px-3 rounded-xl bg-background border border-input text-xs"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 314,
							columnNumber: 17
						}, this), /* @__PURE__ */ (void 0)("button", {
							type: "button",
							onClick: () => handleAddStringItem("transmissions", newTransmissionName, () => setNewTransmissionName("")),
							className: "h-10 px-4 rounded-xl bg-accent text-accent-foreground text-xs font-bold",
							children: "إضافة ناقل حركة"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 315,
							columnNumber: 17
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 313,
						columnNumber: 15
					}, this), /* @__PURE__ */ (void 0)("div", {
						className: "grid grid-cols-2 sm:grid-cols-3 gap-3",
						children: attrs.transmissions.map((tr) => /* @__PURE__ */ (void 0)("div", {
							className: "p-3 bg-card border border-border rounded-xl flex items-center justify-between",
							children: [/* @__PURE__ */ (void 0)("span", {
								className: "text-xs font-bold",
								children: tr
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 322,
								columnNumber: 21
							}, this), /* @__PURE__ */ (void 0)("button", {
								onClick: () => handleDeleteStringItem("transmissions", tr),
								className: "p-1 rounded hover:bg-destructive/10 text-destructive",
								children: /* @__PURE__ */ (void 0)(Trash2, { className: "h-3.5 w-3.5" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 324,
									columnNumber: 23
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 323,
								columnNumber: 21
							}, this)]
						}, tr, true, {
							fileName: _jsxFileName,
							lineNumber: 321,
							columnNumber: 48
						}, this))
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 320,
						columnNumber: 15
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 312,
					columnNumber: 46
				}, this),
				attrSubTab === "fuels" && /* @__PURE__ */ (void 0)("div", {
					className: "space-y-4",
					children: [/* @__PURE__ */ (void 0)("div", {
						className: "bg-card border border-border rounded-2xl p-4 shadow-card flex gap-2",
						children: [/* @__PURE__ */ (void 0)("input", {
							type: "text",
							value: newFuelName,
							onChange: (e) => setNewFuelName(e.target.value),
							placeholder: "نوع الوقود الجديد (مثال: Hydrogen, Mild-Hybrid)",
							className: "flex-1 h-10 px-3 rounded-xl bg-background border border-input text-xs"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 333,
							columnNumber: 17
						}, this), /* @__PURE__ */ (void 0)("button", {
							type: "button",
							onClick: () => handleAddStringItem("fuelTypes", newFuelName, () => setNewFuelName("")),
							className: "h-10 px-4 rounded-xl bg-accent text-accent-foreground text-xs font-bold",
							children: "إضافة نوع وقود"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 334,
							columnNumber: 17
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 332,
						columnNumber: 15
					}, this), /* @__PURE__ */ (void 0)("div", {
						className: "grid grid-cols-2 sm:grid-cols-3 gap-3",
						children: attrs.fuelTypes.map((fuel) => /* @__PURE__ */ (void 0)("div", {
							className: "p-3 bg-card border border-border rounded-xl flex items-center justify-between",
							children: [/* @__PURE__ */ (void 0)("span", {
								className: "text-xs font-bold",
								children: fuel
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 341,
								columnNumber: 21
							}, this), /* @__PURE__ */ (void 0)("button", {
								onClick: () => handleDeleteStringItem("fuelTypes", fuel),
								className: "p-1 rounded hover:bg-destructive/10 text-destructive",
								children: /* @__PURE__ */ (void 0)(Trash2, { className: "h-3.5 w-3.5" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 343,
									columnNumber: 23
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 342,
								columnNumber: 21
							}, this)]
						}, fuel, true, {
							fileName: _jsxFileName,
							lineNumber: 340,
							columnNumber: 46
						}, this))
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 339,
						columnNumber: 15
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 331,
					columnNumber: 38
				}, this),
				attrSubTab === "drivetrains" && /* @__PURE__ */ (void 0)("div", {
					className: "space-y-4",
					children: [/* @__PURE__ */ (void 0)("div", {
						className: "bg-card border border-border rounded-2xl p-4 shadow-card flex gap-2",
						children: [/* @__PURE__ */ (void 0)("input", {
							type: "text",
							value: newDrivetrainName,
							onChange: (e) => setNewDrivetrainName(e.target.value),
							placeholder: "نظام الدفع الجديد (مثال: 4x4 Off-Road)",
							className: "flex-1 h-10 px-3 rounded-xl bg-background border border-input text-xs"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 352,
							columnNumber: 17
						}, this), /* @__PURE__ */ (void 0)("button", {
							type: "button",
							onClick: () => handleAddStringItem("drivetrains", newDrivetrainName, () => setNewDrivetrainName("")),
							className: "h-10 px-4 rounded-xl bg-accent text-accent-foreground text-xs font-bold",
							children: "إضافة نظام دفع"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 353,
							columnNumber: 17
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 351,
						columnNumber: 15
					}, this), /* @__PURE__ */ (void 0)("div", {
						className: "grid grid-cols-2 sm:grid-cols-3 gap-3",
						children: attrs.drivetrains.map((dt) => /* @__PURE__ */ (void 0)("div", {
							className: "p-3 bg-card border border-border rounded-xl flex items-center justify-between",
							children: [/* @__PURE__ */ (void 0)("span", {
								className: "text-xs font-bold",
								children: dt
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 360,
								columnNumber: 21
							}, this), /* @__PURE__ */ (void 0)("button", {
								onClick: () => handleDeleteStringItem("drivetrains", dt),
								className: "p-1 rounded hover:bg-destructive/10 text-destructive",
								children: /* @__PURE__ */ (void 0)(Trash2, { className: "h-3.5 w-3.5" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 362,
									columnNumber: 23
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 361,
								columnNumber: 21
							}, this)]
						}, dt, true, {
							fileName: _jsxFileName,
							lineNumber: 359,
							columnNumber: 46
						}, this))
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 358,
						columnNumber: 15
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 350,
					columnNumber: 44
				}, this),
				attrSubTab === "colors" && /* @__PURE__ */ (void 0)("div", {
					className: "space-y-4",
					children: [/* @__PURE__ */ (void 0)("div", {
						className: "bg-card border border-border rounded-2xl p-4 shadow-card flex gap-2",
						children: [/* @__PURE__ */ (void 0)("input", {
							type: "text",
							value: newColorName,
							onChange: (e) => setNewColorName(e.target.value),
							placeholder: "اسم اللون الجديد (مثال: Daytona Grey, British Racing Green)",
							className: "flex-1 h-10 px-3 rounded-xl bg-background border border-input text-xs"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 371,
							columnNumber: 17
						}, this), /* @__PURE__ */ (void 0)("button", {
							type: "button",
							onClick: () => handleAddStringItem("colors", newColorName, () => setNewColorName("")),
							className: "h-10 px-4 rounded-xl bg-accent text-accent-foreground text-xs font-bold",
							children: "إضافة لون"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 372,
							columnNumber: 17
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 370,
						columnNumber: 15
					}, this), /* @__PURE__ */ (void 0)("div", {
						className: "grid grid-cols-2 sm:grid-cols-3 gap-3",
						children: attrs.colors.map((col) => /* @__PURE__ */ (void 0)("div", {
							className: "p-3 bg-card border border-border rounded-xl flex items-center justify-between",
							children: [/* @__PURE__ */ (void 0)("span", {
								className: "text-xs font-bold",
								children: col
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 379,
								columnNumber: 21
							}, this), /* @__PURE__ */ (void 0)("button", {
								onClick: () => handleDeleteStringItem("colors", col),
								className: "p-1 rounded hover:bg-destructive/10 text-destructive",
								children: /* @__PURE__ */ (void 0)(Trash2, { className: "h-3.5 w-3.5" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 381,
									columnNumber: 23
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 380,
								columnNumber: 21
							}, this)]
						}, col, true, {
							fileName: _jsxFileName,
							lineNumber: 378,
							columnNumber: 42
						}, this))
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 377,
						columnNumber: 15
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 369,
					columnNumber: 39
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 194,
			columnNumber: 38
		}, this),
		activeTab === "security" && /* @__PURE__ */ (void 0)("div", {
			className: "mt-6 space-y-6 animate-in fade-in",
			children: [/* @__PURE__ */ (void 0)("div", {
				className: "bg-card border border-border rounded-3xl p-6 shadow-card",
				children: [
					/* @__PURE__ */ (void 0)("h2", {
						className: "font-bold text-lg flex items-center gap-2 mb-2",
						children: [/* @__PURE__ */ (void 0)(ShieldCheck, { className: "h-5 w-5 text-accent" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 393,
							columnNumber: 15
						}, this), " هيكل الصلاحيات والأدوار (Permission Matrix)"]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 392,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (void 0)("p", {
						className: "text-xs text-muted-foreground mb-6",
						children: "نظام أمان دقيق يحدد مستوى وصول كل موظف وعضو في الفريق."
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 395,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (void 0)("div", {
						className: "grid grid-cols-1 md:grid-cols-3 gap-4",
						children: [
							"SUPER_ADMIN",
							"SALES_AGENT",
							"INVENTORY_MANAGER"
						].map((r) => {
							const info = ROLE_INFO[r];
							const isCurrent = activeRole === r;
							return /* @__PURE__ */ (void 0)("div", {
								className: `rounded-2xl p-5 border transition-all ${isCurrent ? "bg-accent/10 border-accent shadow-md" : "bg-card border-border"}`,
								children: [
									/* @__PURE__ */ (void 0)("div", {
										className: "flex items-center justify-between mb-3",
										children: [/* @__PURE__ */ (void 0)("span", {
											className: `text-xs font-bold px-2.5 py-1 rounded-full border ${info.badgeCls}`,
											children: info.titleAr
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 405,
											columnNumber: 23
										}, this), isCurrent && /* @__PURE__ */ (void 0)("span", {
											className: "text-[10px] font-bold text-accent bg-accent/15 px-2 py-0.5 rounded-full",
											children: "الحساب النشط حالياً"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 408,
											columnNumber: 37
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 404,
										columnNumber: 21
									}, this),
									/* @__PURE__ */ (void 0)("h3", {
										className: "font-bold text-sm",
										children: info.title
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 413,
										columnNumber: 21
									}, this),
									/* @__PURE__ */ (void 0)("p", {
										className: "text-xs text-muted-foreground mt-1 mb-4",
										children: info.descAr
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 414,
										columnNumber: 21
									}, this),
									/* @__PURE__ */ (void 0)("div", {
										className: "space-y-1.5 text-xs pt-3 border-t border-border/80",
										children: [/* @__PURE__ */ (void 0)("div", {
											className: "font-semibold text-[11px] text-muted-foreground",
											children: "الصلاحيات المعتمدة:"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 417,
											columnNumber: 23
										}, this), info.permissions.map((perm) => /* @__PURE__ */ (void 0)("div", {
											className: "flex items-center gap-1.5 text-[11px]",
											children: [/* @__PURE__ */ (void 0)(CircleCheck, { className: "h-3.5 w-3.5 text-emerald-500 shrink-0" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 419,
												columnNumber: 27
											}, this), /* @__PURE__ */ (void 0)("span", { children: perm }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 420,
												columnNumber: 27
											}, this)]
										}, perm, true, {
											fileName: _jsxFileName,
											lineNumber: 418,
											columnNumber: 53
										}, this))]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 416,
										columnNumber: 21
									}, this),
									/* @__PURE__ */ (void 0)("button", {
										type: "button",
										disabled: isCurrent,
										onClick: () => {
											setActiveRole(r);
											toast.success(`تم التبديل لتجربة دور: ${info.titleAr}`);
										},
										className: "mt-5 w-full h-9 rounded-xl border border-input bg-card hover:bg-secondary text-xs font-bold transition disabled:opacity-40",
										children: isCurrent ? "الدور النشط الآن" : "تبديل الصلاحية لهذا الدور"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 424,
										columnNumber: 21
									}, this)
								]
							}, r, true, {
								fileName: _jsxFileName,
								lineNumber: 403,
								columnNumber: 20
							}, this);
						})
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 399,
						columnNumber: 13
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 391,
				columnNumber: 11
			}, this), /* @__PURE__ */ (void 0)("div", {
				className: "bg-card border border-border rounded-3xl p-6 shadow-card",
				children: [/* @__PURE__ */ (void 0)("h2", {
					className: "font-bold text-lg flex items-center gap-2 mb-2",
					children: [/* @__PURE__ */ (void 0)(Users, { className: "h-5 w-5 text-accent" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 438,
						columnNumber: 15
					}, this), " فريق العمل وحسابات الدخول المعتمدة"]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 437,
					columnNumber: 13
				}, this), /* @__PURE__ */ (void 0)("div", {
					className: "grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4",
					children: TEAM_MEMBERS.map((m) => /* @__PURE__ */ (void 0)("div", {
						className: "p-4 rounded-2xl bg-secondary/50 border border-border space-y-2",
						children: [
							/* @__PURE__ */ (void 0)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (void 0)("span", {
									className: "font-bold text-sm",
									children: m.name
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 443,
									columnNumber: 21
								}, this), /* @__PURE__ */ (void 0)("span", {
									className: "text-[10px] px-2 py-0.5 rounded-full bg-card border font-bold",
									children: ROLE_INFO[m.role].titleAr
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 444,
									columnNumber: 21
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 442,
								columnNumber: 19
							}, this),
							/* @__PURE__ */ (void 0)("div", {
								className: "text-xs text-muted-foreground",
								children: m.email
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 448,
								columnNumber: 19
							}, this),
							/* @__PURE__ */ (void 0)("div", {
								className: "text-xs text-muted-foreground flex items-center gap-1",
								children: [
									/* @__PURE__ */ (void 0)(Key, { className: "h-3.5 w-3.5" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 450,
										columnNumber: 21
									}, this),
									" رمز الدخول: ",
									/* @__PURE__ */ (void 0)("code", {
										className: "font-bold text-foreground",
										children: m.passcode
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 450,
										columnNumber: 65
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 449,
								columnNumber: 19
							}, this)
						]
					}, m.id, true, {
						fileName: _jsxFileName,
						lineNumber: 441,
						columnNumber: 38
					}, this))
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 440,
					columnNumber: 13
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 436,
				columnNumber: 11
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 389,
			columnNumber: 36
		}, this),
		activeTab === "general" && /* @__PURE__ */ (void 0)("form", {
			onSubmit: handleSaveGeneralSettings,
			className: "mt-6 space-y-6 animate-in fade-in max-w-2xl",
			children: /* @__PURE__ */ (void 0)("div", {
				className: "bg-card border border-border rounded-3xl p-6 shadow-card space-y-4",
				children: [
					/* @__PURE__ */ (void 0)("h2", {
						className: "font-bold text-lg flex items-center gap-2 pb-3 border-b border-border",
						children: [/* @__PURE__ */ (void 0)(Building, { className: "h-5 w-5 text-accent" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 461,
							columnNumber: 15
						}, this), " بيانات المعرض وصالة العرض"]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 460,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("label", {
						className: "text-xs font-bold text-muted-foreground block mb-1.5",
						children: "اسم المعرض / العلامة التجارية"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 465,
						columnNumber: 15
					}, this), /* @__PURE__ */ (void 0)("input", {
						type: "text",
						value: generalForm.siteName,
						onChange: (e) => setGeneralForm({
							...generalForm,
							siteName: e.target.value
						}),
						className: "w-full h-11 px-3.5 rounded-xl bg-background border border-input text-xs sm:text-sm"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 466,
						columnNumber: 15
					}, this)] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 464,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (void 0)("div", {
						className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
						children: [/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("label", {
							className: "text-xs font-bold text-muted-foreground block mb-1.5",
							children: "رقم الهاتف الرسمي"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 474,
							columnNumber: 17
						}, this), /* @__PURE__ */ (void 0)("input", {
							type: "text",
							value: generalForm.dealershipPhone,
							onChange: (e) => setGeneralForm({
								...generalForm,
								dealershipPhone: e.target.value
							}),
							className: "w-full h-11 px-3.5 rounded-xl bg-background border border-input text-xs sm:text-sm"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 475,
							columnNumber: 17
						}, this)] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 473,
							columnNumber: 15
						}, this), /* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("label", {
							className: "text-xs font-bold text-muted-foreground block mb-1.5",
							children: "رقم الواتساب للرد السريع"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 482,
							columnNumber: 17
						}, this), /* @__PURE__ */ (void 0)("input", {
							type: "text",
							value: generalForm.whatsappNumber,
							onChange: (e) => setGeneralForm({
								...generalForm,
								whatsappNumber: e.target.value
							}),
							className: "w-full h-11 px-3.5 rounded-xl bg-background border border-input text-xs sm:text-sm"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 483,
							columnNumber: 17
						}, this)] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 481,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 472,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (void 0)("div", {
						className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
						children: [/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("label", {
							className: "text-xs font-bold text-muted-foreground block mb-1.5",
							children: "البريد الإلكتروني للإدارة"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 492,
							columnNumber: 17
						}, this), /* @__PURE__ */ (void 0)("input", {
							type: "email",
							value: generalForm.dealershipEmail,
							onChange: (e) => setGeneralForm({
								...generalForm,
								dealershipEmail: e.target.value
							}),
							className: "w-full h-11 px-3.5 rounded-xl bg-background border border-input text-xs sm:text-sm"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 493,
							columnNumber: 17
						}, this)] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 491,
							columnNumber: 15
						}, this), /* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("label", {
							className: "text-xs font-bold text-muted-foreground block mb-1.5",
							children: "رمز الدخول الرئيسي (Admin Passcode)"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 500,
							columnNumber: 17
						}, this), /* @__PURE__ */ (void 0)("input", {
							type: "text",
							value: generalForm.adminPasscode,
							onChange: (e) => setGeneralForm({
								...generalForm,
								adminPasscode: e.target.value
							}),
							className: "w-full h-11 px-3.5 rounded-xl bg-background border border-input text-xs sm:text-sm font-mono"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 501,
							columnNumber: 17
						}, this)] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 499,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 490,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("label", {
						className: "text-xs font-bold text-muted-foreground block mb-1.5",
						children: "عنوان صالة العرض والمقر"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 509,
						columnNumber: 15
					}, this), /* @__PURE__ */ (void 0)("input", {
						type: "text",
						value: generalForm.address,
						onChange: (e) => setGeneralForm({
							...generalForm,
							address: e.target.value
						}),
						className: "w-full h-11 px-3.5 rounded-xl bg-background border border-input text-xs sm:text-sm"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 510,
						columnNumber: 15
					}, this)] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 508,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (void 0)("div", {
						className: "pt-4 flex justify-end",
						children: /* @__PURE__ */ (void 0)("button", {
							type: "submit",
							className: "h-11 px-6 rounded-xl bg-gradient-accent text-accent-foreground font-bold text-xs sm:text-sm hover:opacity-90 shadow-md transition",
							children: "حفظ كافة الإعدادات"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 517,
							columnNumber: 15
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 516,
						columnNumber: 13
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 459,
				columnNumber: 11
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 458,
			columnNumber: 35
		}, this)
	] }, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 151,
		columnNumber: 10
	}, this);
}
//#endregion
export { AdminSettingsPage as component };
