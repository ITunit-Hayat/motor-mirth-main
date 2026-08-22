import { r as __toESM } from "../_runtime.mjs";
import { r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { $ as Check, B as Gauge, I as Image, N as Layers, S as Pencil, a as Upload, b as Plus, c as Trash2, dt as ArrowDown, et as Car, m as Shield, n as X, st as ArrowUp, t as ZoomIn, u as Star, v as Search } from "../_libs/lucide-react.mjs";
import { a as useDealership, i as formatPrice, r as formatMiles } from "./DealershipContext-CZIneh0B.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as hasPermission, i as getActiveRole, t as AdminLayout } from "./AdminLayout-UG9sri-Y.mjs";
import { n as ErrorState } from "./StateViews-ChF2SlsX.mjs";
import { t as useDynamicAttributes } from "./dynamicAttributes-BONL40cQ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.cars-Bf83GLQv.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName$1 = "/app/applet/src/components/MediaManagerModal.tsx";
function MediaManagerModal({ images, onChange, carTitle }) {
	const [urlInput, setUrlInput] = (0, import_react.useState)("");
	const [watermarkEnabled, setWatermarkEnabled] = (0, import_react.useState)(true);
	const [watermarkText, setWatermarkText] = (0, import_react.useState)("VELOCITY MOTORS");
	const [watermarkPos, setWatermarkPos] = (0, import_react.useState)("bottom-right");
	const [watermarkOpacity, setWatermarkOpacity] = (0, import_react.useState)(75);
	const [previewImg, setPreviewImg] = (0, import_react.useState)(null);
	const fileInputRef = (0, import_react.useRef)(null);
	const addImageUrl = () => {
		const trimmed = urlInput.trim();
		if (!trimmed) return;
		if (!trimmed.startsWith("http") && !trimmed.startsWith("data:")) {
			toast.error("يرجى إدخال رابط صورة صحيح يبدأ بـ https://");
			return;
		}
		onChange([...images, trimmed]);
		setUrlInput("");
		toast.success("تمت إضافة الصورة بنجاح");
	};
	const handleFileUpload = (e) => {
		const files = e.target.files;
		if (!files || files.length === 0) return;
		const newImgs = [];
		let processed = 0;
		Array.from(files).forEach((file) => {
			const reader = new FileReader();
			reader.onload = (event) => {
				if (event.target?.result) newImgs.push(String(event.target.result));
				processed++;
				if (processed === files.length) {
					onChange([...images, ...newImgs]);
					toast.success(`تم رفع ${newImgs.length} صور وتحسينها بنجاح`);
				}
			};
			reader.readAsDataURL(file);
		});
	};
	const removeImage = (index) => {
		if (images.length <= 1) {
			toast.error("يجب الإبقاء على صورة واحدة على الأقل للمركبة");
			return;
		}
		onChange(images.filter((_, i) => i !== index));
		toast.info("تم حذف الصورة");
	};
	const setCoverImage = (index) => {
		if (index === 0) return;
		const item = images[index];
		onChange([item, ...images.filter((_, i) => i !== index)]);
		toast.success("تم تعيين هذه الصورة كصورة رئيسية للبطاقة والمعرض");
	};
	const moveImage = (index, direction) => {
		const targetIdx = direction === "up" ? index - 1 : index + 1;
		if (targetIdx < 0 || targetIdx >= images.length) return;
		const copy = [...images];
		const temp = copy[index];
		copy[index] = copy[targetIdx];
		copy[targetIdx] = temp;
		onChange(copy);
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "bg-muted/40 border border-border/80 rounded-2xl p-4 sm:p-5",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center justify-between flex-wrap gap-3 mb-4",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
						className: "font-bold text-base flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Image, { className: "h-5 w-5 text-accent" }, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 104,
							columnNumber: 15
						}, this), "وحدة إدارة الوسائط المتعددة (Media Manager)"]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 103,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "text-xs text-muted-foreground mt-0.5",
						children: "رفع عدة صور دفعة واحدة، ترتيب العرض، وتحديد الصورة الرئيسية مع تحسين الجودة وإضافة العلامة المائية."
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 107,
						columnNumber: 13
					}, this)] }, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 102,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
							type: "file",
							ref: fileInputRef,
							onChange: handleFileUpload,
							multiple: true,
							accept: "image/*",
							className: "hidden"
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 113,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							type: "button",
							onClick: () => fileInputRef.current?.click(),
							className: "inline-flex items-center gap-2 h-10 px-4 rounded-xl bg-accent text-accent-foreground font-bold text-xs sm:text-sm hover:opacity-90 shadow-sm transition",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Upload, { className: "h-4 w-4" }, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 126,
								columnNumber: 15
							}, this), " رفع صور من جهازك"]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 121,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 112,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 101,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
						type: "url",
						value: urlInput,
						onChange: (e) => setUrlInput(e.target.value),
						onKeyDown: (e) => e.key === "Enter" && (e.preventDefault(), addImageUrl()),
						placeholder: "أو الصق رابط صورة مباشر (https://images.unsplash.com/...)",
						className: "flex-1 h-10 px-3 rounded-xl bg-background border border-input text-xs sm:text-sm"
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 133,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						type: "button",
						onClick: addImageUrl,
						className: "h-10 px-4 rounded-xl border border-input bg-card hover:bg-secondary text-xs sm:text-sm font-semibold inline-flex items-center gap-1.5 shrink-0",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Plus, { className: "h-4 w-4" }, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 146,
							columnNumber: 13
						}, this), " إضافة رابط"]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 141,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 132,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$1,
				lineNumber: 100,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "bg-card border border-border rounded-2xl p-4 shadow-card",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center justify-between flex-wrap gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Shield, { className: "h-5 w-5 text-emerald-500" }, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 155,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "font-semibold text-sm",
							children: "العلامة المائية والتحسين التلقائي (Watermark Engine)"
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 157,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "text-xs text-muted-foreground",
							children: "حماية حقوق صور المعرض وضغط الأحجام تلقائياً لتسريع التصفح"
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 158,
							columnNumber: 15
						}, this)] }, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 156,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 154,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center gap-3",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
							className: "flex items-center gap-2 text-xs font-semibold cursor-pointer",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
								type: "checkbox",
								checked: watermarkEnabled,
								onChange: (e) => setWatermarkEnabled(e.target.checked),
								className: "rounded border-input text-accent focus:ring-accent"
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 164,
								columnNumber: 15
							}, this), "تفعيل العلامة المائية"]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 163,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 162,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 153,
					columnNumber: 9
				}, this), watermarkEnabled && /* @__PURE__ */ (void 0)("div", {
					className: "mt-4 pt-4 border-t border-border grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs",
					children: [
						/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("label", {
							className: "font-medium text-muted-foreground block mb-1",
							children: "نص العلامة المائية / الشعار"
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 178,
							columnNumber: 15
						}, this), /* @__PURE__ */ (void 0)("input", {
							type: "text",
							value: watermarkText,
							onChange: (e) => setWatermarkText(e.target.value),
							className: "w-full h-8 px-2.5 rounded-lg bg-background border border-input text-xs"
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 179,
							columnNumber: 15
						}, this)] }, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 177,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("label", {
							className: "font-medium text-muted-foreground block mb-1",
							children: "الموضع"
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 187,
							columnNumber: 15
						}, this), /* @__PURE__ */ (void 0)("select", {
							value: watermarkPos,
							onChange: (e) => setWatermarkPos(e.target.value),
							className: "w-full h-8 px-2 rounded-lg bg-background border border-input text-xs",
							children: [
								/* @__PURE__ */ (void 0)("option", {
									value: "bottom-right",
									children: "أسفل اليمين (Bottom Right)"
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 193,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (void 0)("option", {
									value: "bottom-left",
									children: "أسفل اليسار (Bottom Left)"
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 194,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (void 0)("option", {
									value: "center",
									children: "الوسط (Center)"
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 195,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (void 0)("option", {
									value: "top-right",
									children: "أعلى اليمين (Top Right)"
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 196,
									columnNumber: 17
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 188,
							columnNumber: 15
						}, this)] }, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 186,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("label", {
							className: "font-medium text-muted-foreground block mb-1",
							children: [
								"الشفافية: ",
								watermarkOpacity,
								"%"
							]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 200,
							columnNumber: 15
						}, this), /* @__PURE__ */ (void 0)("input", {
							type: "range",
							min: "20",
							max: "100",
							value: watermarkOpacity,
							onChange: (e) => setWatermarkOpacity(Number(e.target.value)),
							className: "w-full"
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 201,
							columnNumber: 15
						}, this)] }, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 199,
							columnNumber: 13
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 176,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$1,
				lineNumber: 152,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex items-center justify-between mb-3",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "text-xs font-bold text-muted-foreground flex items-center gap-1.5",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Layers, { className: "h-4 w-4" }, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 218,
							columnNumber: 13
						}, this),
						" قائمة الصور المعتمدة (",
						images.length,
						" صور)"
					]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 217,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
					className: "text-[11px] text-muted-foreground",
					children: "الصورة رقم 1 هي الصورة الرئيسية التلقائية التي تظهر في بطاقة السيارة."
				}, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 220,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$1,
				lineNumber: 216,
				columnNumber: 9
			}, this), images.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "p-8 border-2 border-dashed border-border rounded-2xl text-center text-muted-foreground text-sm",
				children: "لا توجد صور مضافة حتى الآن. قم برفع الصور أو إضافة الروابط أعلاه."
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 226,
				columnNumber: 11
			}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4",
				children: images.map((img, idx) => {
					const isCover = idx === 0;
					return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: `group relative rounded-2xl overflow-hidden border transition-all duration-200 bg-card ${isCover ? "ring-2 ring-accent border-accent/80 shadow-md" : "border-border hover:border-primary/50"}`,
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "aspect-[16/10] relative bg-muted overflow-hidden",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
									src: img,
									alt: `Car photo ${idx + 1}`,
									className: "w-full h-full object-cover transition-transform group-hover:scale-105 duration-300"
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 243,
									columnNumber: 21
								}, this),
								watermarkEnabled && /* @__PURE__ */ (void 0)("div", {
									className: `absolute pointer-events-none px-2 py-0.5 rounded bg-black/60 backdrop-blur-xs text-white text-[10px] font-bold tracking-wider uppercase ${watermarkPos === "bottom-right" ? "bottom-2 right-2" : watermarkPos === "bottom-left" ? "bottom-2 left-2" : watermarkPos === "center" ? "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center" : "top-2 right-2"}`,
									style: { opacity: watermarkOpacity / 100 },
									children: ["🛡️ ", watermarkText]
								}, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 251,
									columnNumber: 23
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "absolute top-2 left-2 flex items-center gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "h-6 px-2 rounded-full bg-black/75 backdrop-blur text-white text-[10px] font-bold flex items-center justify-center",
										children: ["#", idx + 1]
									}, void 0, true, {
										fileName: _jsxFileName$1,
										lineNumber: 269,
										columnNumber: 23
									}, this), isCover && /* @__PURE__ */ (void 0)("span", {
										className: "h-6 px-2.5 rounded-full bg-accent text-accent-foreground text-[10px] font-bold flex items-center gap-1 shadow-sm",
										children: [/* @__PURE__ */ (void 0)(Star, { className: "h-3 w-3 fill-current" }, void 0, false, {
											fileName: _jsxFileName$1,
											lineNumber: 274,
											columnNumber: 27
										}, this), " الصورة الرئيسية"]
									}, void 0, true, {
										fileName: _jsxFileName$1,
										lineNumber: 273,
										columnNumber: 25
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 268,
									columnNumber: 21
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
									type: "button",
									onClick: () => setPreviewImg(img),
									className: "absolute top-2 right-2 h-7 w-7 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center transition",
									title: "معاينة بالحجم الكامل",
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ZoomIn, { className: "h-3.5 w-3.5" }, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 286,
										columnNumber: 23
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 280,
									columnNumber: 21
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 242,
							columnNumber: 19
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "p-2.5 bg-card/90 flex items-center justify-between border-t border-border/80 gap-1 text-xs",
							children: [!isCover ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								type: "button",
								onClick: () => setCoverImage(idx),
								className: "inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-secondary hover:bg-accent hover:text-accent-foreground text-[11px] font-semibold transition",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Star, { className: "h-3 w-3" }, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 298,
									columnNumber: 25
								}, this), " جعلها الرئيسية"]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 293,
								columnNumber: 23
							}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "text-[11px] font-bold text-accent px-1 flex items-center gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Check, { className: "h-3.5 w-3.5" }, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 302,
									columnNumber: 25
								}, this), " معتمدة كغلاف"]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 301,
								columnNumber: 23
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center gap-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
										type: "button",
										disabled: idx === 0,
										onClick: () => moveImage(idx, "up"),
										className: "p-1 rounded hover:bg-muted disabled:opacity-30",
										title: "تقديم الترتيب",
										children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowUp, { className: "h-3.5 w-3.5" }, void 0, false, {
											fileName: _jsxFileName$1,
											lineNumber: 314,
											columnNumber: 25
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 307,
										columnNumber: 23
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
										type: "button",
										disabled: idx === images.length - 1,
										onClick: () => moveImage(idx, "down"),
										className: "p-1 rounded hover:bg-muted disabled:opacity-30",
										title: "تأخير الترتيب",
										children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowDown, { className: "h-3.5 w-3.5" }, void 0, false, {
											fileName: _jsxFileName$1,
											lineNumber: 323,
											columnNumber: 25
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 316,
										columnNumber: 23
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
										type: "button",
										onClick: () => removeImage(idx),
										className: "p-1 rounded hover:bg-destructive/10 text-destructive",
										title: "حذف الصورة",
										children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Trash2, { className: "h-3.5 w-3.5" }, void 0, false, {
											fileName: _jsxFileName$1,
											lineNumber: 331,
											columnNumber: 25
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 325,
										columnNumber: 23
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 306,
								columnNumber: 21
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 291,
							columnNumber: 19
						}, this)]
					}, `${img}-${idx}`, true, {
						fileName: _jsxFileName$1,
						lineNumber: 234,
						columnNumber: 17
					}, this);
				})
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 230,
				columnNumber: 11
			}, this)] }, void 0, true, {
				fileName: _jsxFileName$1,
				lineNumber: 215,
				columnNumber: 7
			}, this),
			previewImg && /* @__PURE__ */ (void 0)("div", {
				className: "fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4",
				onClick: () => setPreviewImg(null),
				children: /* @__PURE__ */ (void 0)("div", {
					className: "relative max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl",
					onClick: (e) => e.stopPropagation(),
					children: [/* @__PURE__ */ (void 0)("img", {
						src: previewImg,
						alt: "Preview",
						className: "max-h-[85vh] w-auto rounded-2xl object-contain shadow-2xl"
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 349,
						columnNumber: 13
					}, this), /* @__PURE__ */ (void 0)("button", {
						onClick: () => setPreviewImg(null),
						className: "absolute top-4 right-4 h-10 w-10 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center",
						children: /* @__PURE__ */ (void 0)(X, { className: "h-5 w-5" }, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 354,
							columnNumber: 15
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 350,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 348,
					columnNumber: 11
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 344,
				columnNumber: 9
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName$1,
		lineNumber: 98,
		columnNumber: 5
	}, this);
}
var _jsxFileName = "/app/applet/src/routes/admin.cars.tsx?tsr-split=component";
var emptyCar = {
	title: "",
	make: "Toyota",
	model: "Camry",
	year: (/* @__PURE__ */ new Date()).getFullYear(),
	price: 5e4,
	mileage: 0,
	category: "Sedan",
	engine: "2.5L 4-Cylinder",
	transmission: "Automatic",
	condition: "Brand New (0 km)",
	description: "سيارة فاخرة بحالة ممتازة وفحص شامل جاهزة للتسليم الفوري.",
	images: ["https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1600&q=80", "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1600&q=80"],
	featured: false,
	status: "Active",
	vin: "",
	drivetrain: "AWD (All-Wheel Drive)",
	fuelTankCapacity: "65 Liters",
	horsepower: 250,
	previousOwners: 0,
	inspectionReport: "اجتاز فحص 200 نقطة الشامل بنجاح",
	warranty: "ضمان المصنع ساري",
	discount: 0,
	color: "Pearl White",
	fuel: "Petrol",
	cylinders: 4
};
function ManageCarsPage() {
	const { cars, addCar, updateCar, deleteCar, loadingCars, error, refresh } = useDealership();
	const [attrs] = useDynamicAttributes();
	const [modal, setModal] = (0, import_react.useState)(null);
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [searchTerm, setSearchTerm] = (0, import_react.useState)("");
	const [statusFilter, setStatusFilter] = (0, import_react.useState)("All");
	const [categoryFilter, setCategoryFilter] = (0, import_react.useState)("All");
	const [sortBy, setSortBy] = (0, import_react.useState)("newest");
	const role = getActiveRole();
	const canDelete = hasPermission(role, "DELETE_CAR");
	hasPermission(role, "EDIT_PRICE");
	const canAddEdit = hasPermission(role, "ADD_EDIT_CAR");
	const editingCar = modal?.mode === "edit" ? cars.find((c) => c.id === modal.id) : null;
	const filteredCars = (0, import_react.useMemo)(() => {
		const q = searchTerm.trim().toLowerCase();
		const list = cars.filter((c) => {
			const carStatus = c.status ?? "Active";
			if (statusFilter !== "All" && carStatus !== statusFilter) return false;
			if (categoryFilter !== "All" && c.category !== categoryFilter) return false;
			if (q) {
				if (![
					c.title,
					c.make,
					c.model,
					c.vin || "",
					c.category,
					c.condition
				].join(" ").toLowerCase().includes(q)) return false;
			}
			return true;
		});
		switch (sortBy) {
			case "price-asc": return [...list].sort((a, b) => a.price - b.price);
			case "price-desc": return [...list].sort((a, b) => b.price - a.price);
			case "mileage-asc": return [...list].sort((a, b) => a.mileage - b.mileage);
			default: return [...list].sort((a, b) => b.year - a.year);
		}
	}, [
		cars,
		statusFilter,
		categoryFilter,
		searchTerm,
		sortBy
	]);
	const handleQuickStatusChange = async (carId, newStatus) => {
		try {
			await updateCar(carId, { status: newStatus });
			toast.success(`تم تحديث حالة السيارة إلى: ${getStatusLabel(newStatus)}`);
		} catch {
			toast.error("فشل تحديث الحالة");
		}
	};
	const getStatusBadge = (status = "Active") => {
		switch (status) {
			case "Active": return "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30";
			case "Draft": return "bg-stone-500/15 text-stone-700 dark:text-stone-300 border-stone-500/30";
			case "Reserved": return "bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30";
			case "Sold": return "bg-blue-500/15 text-blue-700 dark:text-blue-300 border-blue-500/30";
		}
	};
	const getStatusLabel = (status = "Active") => {
		switch (status) {
			case "Active": return "منشورة (Active)";
			case "Draft": return "مسودة (Draft)";
			case "Reserved": return "محجوزة (Reserved)";
			case "Sold": return "مباعة (Sold)";
		}
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AdminLayout, { children: [
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "flex items-center justify-between flex-wrap gap-4 pb-6 border-b border-border",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
					className: "text-2xl sm:text-3xl font-display font-bold",
					children: "وحدة التحكم في المخزون (Inventory)"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 131,
					columnNumber: 13
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
					className: "text-xs px-2.5 py-0.5 rounded-full bg-secondary font-bold border border-border",
					children: [cars.length, " سيارة في النظام"]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 132,
					columnNumber: 13
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 130,
				columnNumber: 11
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
				className: "text-muted-foreground text-xs sm:text-sm mt-1",
				children: "إدارة شاملة لبيانات السيارات، المواصفات الفنية، والتحكم في حالة الظهور أمام الزوار."
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 136,
				columnNumber: 11
			}, this)] }, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 129,
				columnNumber: 9
			}, this), canAddEdit && /* @__PURE__ */ (void 0)("button", {
				onClick: () => setModal({ mode: "add" }),
				className: "inline-flex items-center gap-2 h-11 px-5 rounded-xl bg-gradient-accent text-accent-foreground font-bold text-sm hover:opacity-90 shadow-md transition",
				children: [/* @__PURE__ */ (void 0)(Plus, { className: "h-4 w-4" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 144,
					columnNumber: 13
				}, this), " إضافة سيارة جديدة"]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 141,
				columnNumber: 24
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 128,
			columnNumber: 7
		}, this),
		role === "SALES_AGENT" && /* @__PURE__ */ (void 0)("div", {
			className: "mt-4 p-3.5 bg-blue-500/10 border border-blue-500/30 rounded-2xl text-xs text-blue-700 dark:text-blue-300 flex items-center gap-2",
			children: [/* @__PURE__ */ (void 0)(Shield, { className: "h-4 w-4 shrink-0" }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 150,
				columnNumber: 11
			}, this), /* @__PURE__ */ (void 0)("span", { children: [/* @__PURE__ */ (void 0)("strong", { children: "تنبيه الصلاحية (موظف مبيعات):" }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 152,
				columnNumber: 13
			}, this), " يمكنك تعديل حالة السيارات إلى \"محجوزة\" أو \"مباعة\" وتحديثها، بينما تعديل الأسعار وحذف السيارات مقصور على المدير العام."] }, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 151,
				columnNumber: 11
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 149,
			columnNumber: 34
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "mt-6 bg-card border border-border rounded-2xl p-4 shadow-card space-y-4",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1",
				children: [
					"All",
					"Active",
					"Reserved",
					"Sold",
					"Draft"
				].map((st) => {
					const count = st === "All" ? cars.length : cars.filter((c) => (c.status ?? "Active") === st).length;
					const isSelected = statusFilter === st;
					return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						onClick: () => setStatusFilter(st),
						className: `px-3.5 py-1.5 rounded-xl text-xs font-bold transition shrink-0 flex items-center gap-1.5 ${isSelected ? "bg-accent text-accent-foreground shadow-xs" : "bg-secondary hover:bg-muted text-foreground"}`,
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: st === "All" ? "جميع السيارات" : st === "Active" ? "منشورة (Active)" : st === "Reserved" ? "محجوزة (Reserved)" : st === "Sold" ? "مباعة (Sold)" : "مسودة (Draft)" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 164,
							columnNumber: 17
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: `text-[10px] px-1.5 py-0.2 rounded-full ${isSelected ? "bg-black/20 text-white" : "bg-muted text-muted-foreground"}`,
							children: count
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 167,
							columnNumber: 17
						}, this)]
					}, st, true, {
						fileName: _jsxFileName,
						lineNumber: 163,
						columnNumber: 18
					}, this);
				})
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 159,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-border/80",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "relative sm:col-span-1",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Search, { className: "absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 177,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
							type: "text",
							value: searchTerm,
							onChange: (e) => setSearchTerm(e.target.value),
							placeholder: "بحث بالاسم، الموديل، أو رقم الهيكل (VIN)...",
							className: "w-full h-10 pr-9 pl-3 rounded-xl bg-background border border-input text-xs"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 178,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 176,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", {
						value: categoryFilter,
						onChange: (e) => setCategoryFilter(e.target.value),
						className: "w-full h-10 px-3 rounded-xl bg-background border border-input text-xs font-medium",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
							value: "All",
							children: "جميع الفئات"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 183,
							columnNumber: 15
						}, this), attrs.categories.map((cat) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
							value: cat,
							children: cat
						}, cat, false, {
							fileName: _jsxFileName,
							lineNumber: 184,
							columnNumber: 44
						}, this))]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 182,
						columnNumber: 13
					}, this) }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 181,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", {
						value: sortBy,
						onChange: (e) => setSortBy(e.target.value),
						className: "w-full h-10 px-3 rounded-xl bg-background border border-input text-xs font-medium",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
								value: "newest",
								children: "الترتيب: الأحدث موديلاً"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 192,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
								value: "price-asc",
								children: "السعر: من الأقل للأعلى"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 193,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
								value: "price-desc",
								children: "السعر: من الأعلى للأقل"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 194,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
								value: "mileage-asc",
								children: "الممشى: الأقل ممشى"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 195,
								columnNumber: 15
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 191,
						columnNumber: 13
					}, this) }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 190,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 175,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 157,
			columnNumber: 7
		}, this),
		error ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "mt-6",
			children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ErrorState, {
				message: error,
				onRetry: () => void refresh()
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 203,
				columnNumber: 11
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 202,
			columnNumber: 16
		}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "mt-6 bg-card border border-border rounded-3xl overflow-hidden shadow-card",
			children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "overflow-x-auto",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("table", {
					className: "w-full text-xs sm:text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("thead", {
						className: "bg-muted/60 text-right text-muted-foreground border-b border-border",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", {
								className: "p-4 font-bold",
								children: "المركبة"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 209,
								columnNumber: 19
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", {
								className: "p-4 font-bold",
								children: "رقم الهيكل (VIN)"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 210,
								columnNumber: 19
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", {
								className: "p-4 font-bold",
								children: "السعر"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 211,
								columnNumber: 19
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", {
								className: "p-4 font-bold",
								children: "الممشى والمحرك"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 212,
								columnNumber: 19
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", {
								className: "p-4 font-bold",
								children: "حالة الظهور (Status)"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 213,
								columnNumber: 19
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", {
								className: "p-4 font-bold text-left",
								children: "الإجراءات"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 214,
								columnNumber: 19
							}, this)
						] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 208,
							columnNumber: 17
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 207,
						columnNumber: 15
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tbody", {
						className: "divide-y divide-border",
						children: [
							loadingCars && /* @__PURE__ */ (void 0)("tr", { children: /* @__PURE__ */ (void 0)("td", {
								colSpan: 6,
								className: "p-12 text-center text-muted-foreground",
								children: "جاري تحميل بيانات المخزون..."
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 219,
								columnNumber: 21
							}, this) }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 218,
								columnNumber: 33
							}, this),
							!loadingCars && filteredCars.length === 0 && /* @__PURE__ */ (void 0)("tr", { children: /* @__PURE__ */ (void 0)("td", {
								colSpan: 6,
								className: "p-12 text-center text-muted-foreground",
								children: "لا توجد سيارات مطابقة لمعايير البحث أو التصفية الحالية."
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 225,
								columnNumber: 21
							}, this) }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 224,
								columnNumber: 63
							}, this),
							filteredCars.map((c) => {
								const carStatus = c.status ?? "Active";
								return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tr", {
									className: "hover:bg-muted/30 transition-colors",
									children: [
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", {
											className: "p-4",
											children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
												className: "flex items-center gap-3",
												children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
													className: "h-14 w-20 rounded-xl overflow-hidden bg-muted shrink-0 relative",
													children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
														src: c.images[0],
														alt: c.title,
														className: "h-full w-full object-cover"
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 237,
														columnNumber: 29
													}, this), c.featured && /* @__PURE__ */ (void 0)("span", {
														className: "absolute top-1 left-1 bg-accent text-accent-foreground text-[8px] font-bold px-1 rounded",
														children: "★"
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 238,
														columnNumber: 44
													}, this)]
												}, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 236,
													columnNumber: 27
												}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
													className: "min-w-0",
													children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
														className: "font-bold text-foreground truncate",
														children: c.title
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 243,
														columnNumber: 29
													}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
														className: "text-[11px] text-muted-foreground flex items-center gap-2 mt-0.5",
														children: [
															/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: c.year }, void 0, false, {
																fileName: _jsxFileName,
																lineNumber: 245,
																columnNumber: 31
															}, this),
															" • ",
															/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: c.category }, void 0, false, {
																fileName: _jsxFileName,
																lineNumber: 245,
																columnNumber: 55
															}, this),
															" • ",
															/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: c.transmission }, void 0, false, {
																fileName: _jsxFileName,
																lineNumber: 245,
																columnNumber: 83
															}, this)
														]
													}, void 0, true, {
														fileName: _jsxFileName,
														lineNumber: 244,
														columnNumber: 29
													}, this)]
												}, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 242,
													columnNumber: 27
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 235,
												columnNumber: 25
											}, this)
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 234,
											columnNumber: 23
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", {
											className: "p-4 font-mono text-[11px] text-muted-foreground",
											children: c.vin || "—"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 252,
											columnNumber: 23
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", {
											className: "p-4 font-bold text-accent whitespace-nowrap",
											children: [formatPrice(c.price), c.discount && c.discount > 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
												className: "block text-[10px] text-destructive font-normal",
												children: [
													"خصم ",
													c.discount,
													"% (",
													formatPrice(Math.round(c.price * (100 - c.discount) / 100)),
													")"
												]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 259,
												columnNumber: 57
											}, this) : null]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 257,
											columnNumber: 23
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", {
											className: "p-4 text-xs",
											children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
												className: "font-semibold",
												children: formatMiles(c.mileage)
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 266,
												columnNumber: 25
											}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
												className: "text-[11px] text-muted-foreground truncate max-w-[140px]",
												children: c.engine
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 267,
												columnNumber: 25
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 265,
											columnNumber: 23
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", {
											className: "p-4",
											children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", {
												value: carStatus,
												onChange: (e) => handleQuickStatusChange(c.id, e.target.value),
												className: `h-8 px-2.5 rounded-lg border text-xs font-bold cursor-pointer transition ${getStatusBadge(carStatus)}`,
												children: [
													/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
														value: "Active",
														children: "منشورة (Active)"
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 273,
														columnNumber: 27
													}, this),
													/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
														value: "Reserved",
														children: "محجوزة (Reserved)"
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 274,
														columnNumber: 27
													}, this),
													/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
														value: "Sold",
														children: "مباعة (Sold)"
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 275,
														columnNumber: 27
													}, this),
													/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
														value: "Draft",
														children: "مسودة (Draft)"
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 276,
														columnNumber: 27
													}, this)
												]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 272,
												columnNumber: 25
											}, this)
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 271,
											columnNumber: 23
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", {
											className: "p-4 text-left",
											children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
												className: "flex items-center justify-end gap-1.5",
												children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
													onClick: () => setModal({
														mode: "edit",
														id: c.id
													}),
													className: "p-2 rounded-xl bg-secondary hover:bg-muted text-foreground transition",
													title: "تعديل بيانات ومواصفات السيارة",
													children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Pencil, { className: "h-4 w-4" }, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 287,
														columnNumber: 29
													}, this)
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 283,
													columnNumber: 27
												}, this), canDelete && /* @__PURE__ */ (void 0)("button", {
													onClick: async () => {
														if (!confirm(`هل أنت متأكد من حذف ${c.title} من المخزون؟`)) return;
														try {
															await deleteCar(c.id);
															toast.success("تم حذف السيارة من المخزون");
														} catch (err) {
															toast.error(err instanceof Error ? err.message : "فشل الحذف");
														}
													},
													className: "p-2 rounded-xl bg-destructive/10 hover:bg-destructive/20 text-destructive transition",
													title: "حذف السيارة نهائياً (خاص بالمدير)",
													children: /* @__PURE__ */ (void 0)(Trash2, { className: "h-4 w-4" }, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 299,
														columnNumber: 31
													}, this)
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 290,
													columnNumber: 41
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 282,
												columnNumber: 25
											}, this)
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 281,
											columnNumber: 23
										}, this)
									]
								}, c.id, true, {
									fileName: _jsxFileName,
									lineNumber: 232,
									columnNumber: 22
								}, this);
							})
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 217,
						columnNumber: 15
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 206,
					columnNumber: 13
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 205,
				columnNumber: 11
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 204,
			columnNumber: 18
		}, this),
		modal && /* @__PURE__ */ (void 0)(AdvancedCarModal, {
			initial: editingCar ? { ...editingCar } : emptyCar,
			mode: modal.mode,
			saving,
			role,
			attrs,
			onClose: () => setModal(null),
			onSubmit: async (data) => {
				setSaving(true);
				try {
					if (modal.mode === "edit") {
						await updateCar(modal.id, data);
						toast.success("تم تحديث بيانات السيارة بنجاح");
					} else {
						await addCar(data);
						toast.success("تمت إضافة السيارة الجديدة بنجاح للمخزون");
					}
					setModal(null);
				} catch (err) {
					toast.error(err instanceof Error ? err.message : "فشل حفظ البيانات");
				} finally {
					setSaving(false);
				}
			}
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 311,
			columnNumber: 17
		}, this)
	] }, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 126,
		columnNumber: 10
	}, this);
}
/**
* Tabbed Advanced Modal Component
*/
function AdvancedCarModal({ initial, mode, saving, role, attrs, onClose, onSubmit }) {
	const [f, setF] = (0, import_react.useState)(initial);
	const [activeTab, setActiveTab] = (0, import_react.useState)("basic");
	const canEditPrice = hasPermission(role, "EDIT_PRICE");
	const set = (k, v) => setF((s) => ({
		...s,
		[k]: v
	}));
	const availableModels = attrs.makes.find((m) => m.name.toLowerCase() === f.make.toLowerCase())?.models || [];
	const handleMakeChange = (newMake) => {
		const firstModel = attrs.makes.find((m) => m.name === newMake)?.models?.[0] || "";
		setF((prev) => ({
			...prev,
			make: newMake,
			model: firstModel,
			title: `${prev.year} ${newMake} ${firstModel}`.trim()
		}));
	};
	const handleModelChange = (newModel) => {
		setF((prev) => ({
			...prev,
			model: newModel,
			title: `${prev.year} ${prev.make} ${newModel}`.trim()
		}));
	};
	const handleYearChange = (newYear) => {
		setF((prev) => ({
			...prev,
			year: newYear,
			title: `${newYear} ${prev.make} ${prev.model}`.trim()
		}));
	};
	const inputCls = "w-full h-11 px-3.5 rounded-xl bg-background border border-input text-xs sm:text-sm focus:ring-2 focus:ring-accent outline-none";
	const labelCls = "text-xs font-bold text-muted-foreground block mb-1.5";
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "fixed inset-0 z-50 bg-black/70 backdrop-blur-xs grid place-items-center p-3 sm:p-6 overflow-y-auto",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "w-full max-w-4xl bg-card rounded-3xl shadow-elegant border border-border overflow-hidden my-6 flex flex-col max-h-[92vh]",
			onClick: (e) => e.stopPropagation(),
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "px-6 py-5 border-b border-border flex items-center justify-between bg-muted/20",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
						className: "font-display text-lg sm:text-xl font-bold flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Car, { className: "h-5 w-5 text-accent" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 396,
							columnNumber: 15
						}, this), mode === "edit" ? `تعديل سيارة: ${f.title}` : "إضافة سيارة جديدة للمخزون"]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 395,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "text-xs text-muted-foreground mt-0.5",
						children: "نموذج إدخال متقدم مقسم إلى تبويبات لسهولة ودقة إدخال المواصفات."
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 399,
						columnNumber: 13
					}, this)] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 394,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						onClick: onClose,
						className: "h-9 w-9 rounded-full bg-secondary hover:bg-muted text-muted-foreground hover:text-foreground flex items-center justify-center transition",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(X, { className: "h-5 w-5" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 404,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 403,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 393,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "px-6 border-b border-border bg-card flex items-center gap-2 overflow-x-auto no-scrollbar",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							type: "button",
							onClick: () => setActiveTab("basic"),
							className: `py-3 px-3 sm:px-4 text-xs sm:text-sm font-bold border-b-2 transition flex items-center gap-2 shrink-0 ${activeTab === "basic" ? "border-accent text-accent" : "border-transparent text-muted-foreground hover:text-foreground"}`,
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Car, { className: "h-4 w-4" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 411,
								columnNumber: 13
							}, this), " 1. البيانات الأساسية"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 410,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							type: "button",
							onClick: () => setActiveTab("specs"),
							className: `py-3 px-3 sm:px-4 text-xs sm:text-sm font-bold border-b-2 transition flex items-center gap-2 shrink-0 ${activeTab === "specs" ? "border-accent text-accent" : "border-transparent text-muted-foreground hover:text-foreground"}`,
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Gauge, { className: "h-4 w-4" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 414,
								columnNumber: 13
							}, this), " 2. المواصفات الفنية"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 413,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							type: "button",
							onClick: () => setActiveTab("history"),
							className: `py-3 px-3 sm:px-4 text-xs sm:text-sm font-bold border-b-2 transition flex items-center gap-2 shrink-0 ${activeTab === "history" ? "border-accent text-accent" : "border-transparent text-muted-foreground hover:text-foreground"}`,
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Shield, { className: "h-4 w-4" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 417,
								columnNumber: 13
							}, this), " 3. تاريخ وحالة المركبة"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 416,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							type: "button",
							onClick: () => setActiveTab("media"),
							className: `py-3 px-3 sm:px-4 text-xs sm:text-sm font-bold border-b-2 transition flex items-center gap-2 shrink-0 ${activeTab === "media" ? "border-accent text-accent" : "border-transparent text-muted-foreground hover:text-foreground"}`,
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Image, { className: "h-4 w-4" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 420,
									columnNumber: 13
								}, this),
								" 4. الوسائط والعلامة المائية (",
								f.images.length,
								")"
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 419,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 409,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("form", {
					onSubmit: (e) => {
						e.preventDefault();
						if (!f.title.trim()) {
							toast.error("يرجى ملء عنوان السيارة");
							return;
						}
						if (f.price <= 0) {
							toast.error("يرجى إدخال سعر صحيح للسيارة");
							return;
						}
						onSubmit(f);
					},
					className: "p-6 overflow-y-auto flex-1 space-y-6",
					children: [
						activeTab === "basic" && /* @__PURE__ */ (void 0)("div", {
							className: "space-y-5 animate-in fade-in",
							children: [
								/* @__PURE__ */ (void 0)("div", {
									className: "grid grid-cols-1 sm:grid-cols-3 gap-4",
									children: [
										/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("label", {
											className: labelCls,
											children: "الماركة (Make)"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 442,
											columnNumber: 19
										}, this), /* @__PURE__ */ (void 0)("select", {
											value: f.make,
											onChange: (e) => handleMakeChange(e.target.value),
											className: inputCls,
											children: attrs.makes.map((m) => /* @__PURE__ */ (void 0)("option", {
												value: m.name,
												children: [
													m.name,
													" (",
													m.country || "General",
													")"
												]
											}, m.id, true, {
												fileName: _jsxFileName,
												lineNumber: 444,
												columnNumber: 50
											}, this))
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 443,
											columnNumber: 19
										}, this)] }, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 441,
											columnNumber: 17
										}, this),
										/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("label", {
											className: labelCls,
											children: "الموديل (Model)"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 452,
											columnNumber: 19
										}, this), availableModels.length > 0 ? /* @__PURE__ */ (void 0)("select", {
											value: f.model,
											onChange: (e) => handleModelChange(e.target.value),
											className: inputCls,
											children: availableModels.map((mod) => /* @__PURE__ */ (void 0)("option", {
												value: mod,
												children: mod
											}, mod, false, {
												fileName: _jsxFileName,
												lineNumber: 454,
												columnNumber: 61
											}, this))
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 453,
											columnNumber: 49
										}, this) : /* @__PURE__ */ (void 0)("input", {
											type: "text",
											value: f.model,
											onChange: (e) => handleModelChange(e.target.value),
											className: inputCls,
											placeholder: "أدخل الموديل يدوي..."
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 457,
											columnNumber: 33
										}, this)] }, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 451,
											columnNumber: 17
										}, this),
										/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("label", {
											className: labelCls,
											children: "سنة الصنع (Year)"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 462,
											columnNumber: 19
										}, this), /* @__PURE__ */ (void 0)("input", {
											type: "number",
											min: "1990",
											max: "2030",
											value: f.year,
											onChange: (e) => handleYearChange(Number(e.target.value)),
											className: inputCls
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 463,
											columnNumber: 19
										}, this)] }, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 461,
											columnNumber: 17
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 439,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("label", {
									className: labelCls,
									children: "عنوان الإعلان الكامل (Car Title)"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 469,
									columnNumber: 17
								}, this), /* @__PURE__ */ (void 0)("input", {
									type: "text",
									value: f.title,
									onChange: (e) => set("title", e.target.value),
									className: inputCls,
									placeholder: "2024 Porsche 911 Carrera S..."
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 470,
									columnNumber: 17
								}, this)] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 468,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (void 0)("div", {
									className: "grid grid-cols-1 sm:grid-cols-3 gap-4",
									children: [
										/* @__PURE__ */ (void 0)("div", { children: [
											/* @__PURE__ */ (void 0)("label", {
												className: labelCls,
												children: "السعر الأساسي ($ USD)"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 476,
												columnNumber: 19
											}, this),
											/* @__PURE__ */ (void 0)("input", {
												type: "number",
												disabled: !canEditPrice,
												value: f.price,
												onChange: (e) => set("price", Number(e.target.value)),
												className: `${inputCls} ${!canEditPrice ? "opacity-60 cursor-not-allowed" : ""}`
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 477,
												columnNumber: 19
											}, this),
											!canEditPrice && /* @__PURE__ */ (void 0)("span", {
												className: "text-[10px] text-muted-foreground mt-1 block",
												children: "تعديل السعر مقيد للمدير العام فقط"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 478,
												columnNumber: 37
											}, this)
										] }, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 475,
											columnNumber: 17
										}, this),
										/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("label", {
											className: labelCls,
											children: "نسبة الخصم / العرض الخاص (%)"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 485,
											columnNumber: 19
										}, this), /* @__PURE__ */ (void 0)("input", {
											type: "number",
											min: "0",
											max: "90",
											value: f.discount || 0,
											onChange: (e) => set("discount", Number(e.target.value)),
											className: inputCls
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 486,
											columnNumber: 19
										}, this)] }, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 484,
											columnNumber: 17
										}, this),
										/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("label", {
											className: labelCls,
											children: "رقم الهيكل (VIN Number)"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 491,
											columnNumber: 19
										}, this), /* @__PURE__ */ (void 0)("input", {
											type: "text",
											value: f.vin || "",
											onChange: (e) => set("vin", e.target.value.toUpperCase()),
											className: `${inputCls} font-mono uppercase`,
											placeholder: "WBA33AY08NFP12948"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 492,
											columnNumber: 19
										}, this)] }, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 490,
											columnNumber: 17
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 473,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (void 0)("div", {
									className: "grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-border",
									children: [/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("label", {
										className: labelCls,
										children: "الفئة (Category)"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 499,
										columnNumber: 19
									}, this), /* @__PURE__ */ (void 0)("select", {
										value: f.category,
										onChange: (e) => set("category", e.target.value),
										className: inputCls,
										children: attrs.categories.map((c) => /* @__PURE__ */ (void 0)("option", {
											value: c,
											children: c
										}, c, false, {
											fileName: _jsxFileName,
											lineNumber: 501,
											columnNumber: 58
										}, this))
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 500,
										columnNumber: 19
									}, this)] }, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 498,
										columnNumber: 17
									}, this), /* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("label", {
										className: labelCls,
										children: "حالة الظهور (Status Control)"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 509,
										columnNumber: 19
									}, this), /* @__PURE__ */ (void 0)("select", {
										value: f.status || "Active",
										onChange: (e) => set("status", e.target.value),
										className: inputCls,
										children: [
											/* @__PURE__ */ (void 0)("option", {
												value: "Active",
												children: "منشورة (Active) — تظهر للزوار في المعرض"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 511,
												columnNumber: 21
											}, this),
											/* @__PURE__ */ (void 0)("option", {
												value: "Draft",
												children: "مسودة (Draft) — قيد التجهيز ومخفية عن الزوار"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 512,
												columnNumber: 21
											}, this),
											/* @__PURE__ */ (void 0)("option", {
												value: "Reserved",
												children: "محجوزة (Reserved) — تظهر مع علامة محجوزة"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 513,
												columnNumber: 21
											}, this),
											/* @__PURE__ */ (void 0)("option", {
												value: "Sold",
												children: "مباعة (Sold) — تظهر بشارة مباعة لتعزيز الثقة"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 514,
												columnNumber: 21
											}, this)
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 510,
										columnNumber: 19
									}, this)] }, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 508,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 496,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (void 0)("label", {
									className: "flex items-center gap-2 p-3 bg-secondary/50 rounded-2xl cursor-pointer text-xs font-semibold",
									children: [/* @__PURE__ */ (void 0)("input", {
										type: "checkbox",
										checked: !!f.featured,
										onChange: (e) => set("featured", e.target.checked),
										className: "rounded text-accent focus:ring-accent h-4 w-4"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 521,
										columnNumber: 17
									}, this), /* @__PURE__ */ (void 0)("span", { children: "تمييز السيارة (Featured Badge) لتظهر في واجهة المعرض والصفحة الأولى" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 522,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 520,
									columnNumber: 15
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 438,
							columnNumber: 37
						}, this),
						activeTab === "specs" && /* @__PURE__ */ (void 0)("div", {
							className: "space-y-5 animate-in fade-in",
							children: [
								/* @__PURE__ */ (void 0)("div", {
									className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
									children: [/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("label", {
										className: labelCls,
										children: "المحرك وسعة اللترات (Engine)"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 531,
										columnNumber: 19
									}, this), /* @__PURE__ */ (void 0)("input", {
										type: "text",
										value: f.engine,
										onChange: (e) => set("engine", e.target.value),
										className: inputCls,
										placeholder: "3.0L Twin-Turbo Inline-6 / Tri-Motor Electric"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 532,
										columnNumber: 19
									}, this)] }, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 530,
										columnNumber: 17
									}, this), /* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("label", {
										className: labelCls,
										children: "القوة الحصانية (Horsepower HP)"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 537,
										columnNumber: 19
									}, this), /* @__PURE__ */ (void 0)("input", {
										type: "number",
										value: f.horsepower || 0,
										onChange: (e) => set("horsepower", Number(e.target.value)),
										className: inputCls,
										placeholder: "503"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 538,
										columnNumber: 19
									}, this)] }, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 536,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 528,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (void 0)("div", {
									className: "grid grid-cols-1 sm:grid-cols-3 gap-4",
									children: [
										/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("label", {
											className: labelCls,
											children: "ناقل الحركة (Transmission)"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 545,
											columnNumber: 19
										}, this), /* @__PURE__ */ (void 0)("select", {
											value: f.transmission,
											onChange: (e) => set("transmission", e.target.value),
											className: inputCls,
											children: attrs.transmissions.map((tr) => /* @__PURE__ */ (void 0)("option", {
												value: tr,
												children: tr
											}, tr, false, {
												fileName: _jsxFileName,
												lineNumber: 547,
												columnNumber: 62
											}, this))
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 546,
											columnNumber: 19
										}, this)] }, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 544,
											columnNumber: 17
										}, this),
										/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("label", {
											className: labelCls,
											children: "نوع الوقود (Fuel Type)"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 555,
											columnNumber: 19
										}, this), /* @__PURE__ */ (void 0)("select", {
											value: f.fuel || "Petrol",
											onChange: (e) => set("fuel", e.target.value),
											className: inputCls,
											children: attrs.fuelTypes.map((ft) => /* @__PURE__ */ (void 0)("option", {
												value: ft,
												children: ft
											}, ft, false, {
												fileName: _jsxFileName,
												lineNumber: 557,
												columnNumber: 58
											}, this))
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 556,
											columnNumber: 19
										}, this)] }, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 554,
											columnNumber: 17
										}, this),
										/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("label", {
											className: labelCls,
											children: "نوع الدفع (Drivetrain)"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 565,
											columnNumber: 19
										}, this), /* @__PURE__ */ (void 0)("select", {
											value: f.drivetrain || "AWD (All-Wheel Drive)",
											onChange: (e) => set("drivetrain", e.target.value),
											className: inputCls,
											children: attrs.drivetrains.map((dt) => /* @__PURE__ */ (void 0)("option", {
												value: dt,
												children: dt
											}, dt, false, {
												fileName: _jsxFileName,
												lineNumber: 567,
												columnNumber: 60
											}, this))
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 566,
											columnNumber: 19
										}, this)] }, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 564,
											columnNumber: 17
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 542,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (void 0)("div", {
									className: "grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-border",
									children: [
										/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("label", {
											className: labelCls,
											children: "سعة الخزان / المدى (Fuel Tank / Range)"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 577,
											columnNumber: 19
										}, this), /* @__PURE__ */ (void 0)("input", {
											type: "text",
											value: f.fuelTankCapacity || "",
											onChange: (e) => set("fuelTankCapacity", e.target.value),
											className: inputCls,
											placeholder: "65 Liters / 580 km Range"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 578,
											columnNumber: 19
										}, this)] }, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 576,
											columnNumber: 17
										}, this),
										/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("label", {
											className: labelCls,
											children: "عدد السلندرات (Cylinders)"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 583,
											columnNumber: 19
										}, this), /* @__PURE__ */ (void 0)("input", {
											type: "number",
											value: f.cylinders || 0,
											onChange: (e) => set("cylinders", Number(e.target.value)),
											className: inputCls,
											placeholder: "6"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 584,
											columnNumber: 19
										}, this)] }, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 582,
											columnNumber: 17
										}, this),
										/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("label", {
											className: labelCls,
											children: "اللون الخارجي (Color)"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 589,
											columnNumber: 19
										}, this), /* @__PURE__ */ (void 0)("input", {
											type: "text",
											value: f.color || "",
											onChange: (e) => set("color", e.target.value),
											className: inputCls,
											placeholder: "Alpine White / Guards Red"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 590,
											columnNumber: 19
										}, this)] }, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 588,
											columnNumber: 17
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 574,
									columnNumber: 15
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 527,
							columnNumber: 37
						}, this),
						activeTab === "history" && /* @__PURE__ */ (void 0)("div", {
							className: "space-y-5 animate-in fade-in",
							children: [
								/* @__PURE__ */ (void 0)("div", {
									className: "grid grid-cols-1 sm:grid-cols-3 gap-4",
									children: [
										/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("label", {
											className: labelCls,
											children: "الممشى (Mileage - Miles / KM)"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 600,
											columnNumber: 19
										}, this), /* @__PURE__ */ (void 0)("input", {
											type: "number",
											value: f.mileage,
											onChange: (e) => set("mileage", Number(e.target.value)),
											className: inputCls
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 601,
											columnNumber: 19
										}, this)] }, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 599,
											columnNumber: 17
										}, this),
										/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("label", {
											className: labelCls,
											children: "حالة البودي والمركبة (Condition)"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 606,
											columnNumber: 19
										}, this), /* @__PURE__ */ (void 0)("select", {
											value: f.condition,
											onChange: (e) => set("condition", e.target.value),
											className: inputCls,
											children: attrs.conditions.map((cd) => /* @__PURE__ */ (void 0)("option", {
												value: cd,
												children: cd
											}, cd, false, {
												fileName: _jsxFileName,
												lineNumber: 608,
												columnNumber: 59
											}, this))
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 607,
											columnNumber: 19
										}, this)] }, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 605,
											columnNumber: 17
										}, this),
										/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("label", {
											className: labelCls,
											children: "عدد الملاك السابقين (Previous Owners)"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 616,
											columnNumber: 19
										}, this), /* @__PURE__ */ (void 0)("input", {
											type: "number",
											min: "0",
											value: f.previousOwners ?? 1,
											onChange: (e) => set("previousOwners", Number(e.target.value)),
											className: inputCls
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 617,
											columnNumber: 19
										}, this)] }, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 615,
											columnNumber: 17
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 597,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (void 0)("div", {
									className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
									children: [/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("label", {
										className: labelCls,
										children: "تقرير الفحص المعتمد (Inspection Report)"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 624,
										columnNumber: 19
									}, this), /* @__PURE__ */ (void 0)("input", {
										type: "text",
										value: f.inspectionReport || "",
										onChange: (e) => set("inspectionReport", e.target.value),
										className: inputCls,
										placeholder: "اجتاز فحص 200 نقطة الشامل - خالي من الحوادث"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 625,
										columnNumber: 19
									}, this)] }, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 623,
										columnNumber: 17
									}, this), /* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("label", {
										className: labelCls,
										children: "حالة الضمان (Warranty Status)"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 630,
										columnNumber: 19
									}, this), /* @__PURE__ */ (void 0)("input", {
										type: "text",
										value: f.warranty || "",
										onChange: (e) => set("warranty", e.target.value),
										className: inputCls,
										placeholder: "ضمان الوكالة حتى 2027 / ضمان شامل سنة"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 631,
										columnNumber: 19
									}, this)] }, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 629,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 621,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("label", {
									className: labelCls,
									children: "الوصف التسويقي والتفاصيل (Full Description)"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 637,
									columnNumber: 17
								}, this), /* @__PURE__ */ (void 0)("textarea", {
									rows: 4,
									value: f.description,
									onChange: (e) => set("description", e.target.value),
									className: "w-full p-3.5 rounded-2xl bg-background border border-input text-xs sm:text-sm focus:ring-2 focus:ring-accent outline-none",
									placeholder: "اكتب مواصفات السيارة، البكجات الإضافية، التجهيزات الداخلية، وتفاصيل الصيانة..."
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 638,
									columnNumber: 17
								}, this)] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 636,
									columnNumber: 15
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 596,
							columnNumber: 39
						}, this),
						activeTab === "media" && /* @__PURE__ */ (void 0)("div", {
							className: "animate-in fade-in",
							children: /* @__PURE__ */ (void 0)(MediaManagerModal, {
								images: f.images,
								onChange: (imgs) => set("images", imgs),
								carTitle: f.title
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 644,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 643,
							columnNumber: 37
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "pt-4 border-t border-border flex items-center justify-between gap-3 flex-wrap",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "text-xs text-muted-foreground flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "الحالة الحالية:" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 650,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", {
									className: "text-foreground",
									children: f.status || "Active"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 651,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 649,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
									type: "button",
									onClick: onClose,
									className: "h-11 px-5 rounded-xl border border-input bg-card hover:bg-secondary text-xs font-bold transition",
									children: "إلغاء"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 655,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
									type: "submit",
									disabled: saving,
									className: "h-11 px-6 rounded-xl bg-gradient-accent text-accent-foreground font-bold text-xs sm:text-sm hover:opacity-90 shadow-md transition disabled:opacity-50",
									children: saving ? "جاري الحفظ..." : mode === "edit" ? "حفظ التعديلات" : "إضافة السيارة الآن"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 658,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 654,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 648,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 425,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 391,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 390,
		columnNumber: 10
	}, this);
}
//#endregion
export { ManageCarsPage as component };
