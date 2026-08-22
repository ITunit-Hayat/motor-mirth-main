import { r as __toESM } from "../_runtime.mjs";
import { r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { n as useLanguage } from "./LanguageContext-C6BSyEfd.mjs";
import { n as trackCarView } from "./analytics-CSNBGE9S.mjs";
import { r as useSiteSettings } from "./settings-B88DAbRA.mjs";
import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { B as Gauge, H as FileText, K as Cog, L as Heart, T as MessageCircle, V as Fuel, X as ChevronRight, Y as CircleCheck, Z as ChevronLeft, h as ShieldCheck, j as LoaderCircle, n as X, nt as Calculator, tt as Calendar, ut as ArrowLeft, z as GitCompare } from "../_libs/lucide-react.mjs";
import { a as toggleFavorite, i as toggleCompare, o as useCompareList, r as cn, s as useFavorites, t as PublicLayout } from "./PublicLayout-Ax7Pira8.mjs";
import { a as useDealership, i as formatPrice, r as formatMiles } from "./DealershipContext-CZIneh0B.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Route } from "./cars._id-VjVHDrp_.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/cars._id-DmpWcJBl.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/routes/cars.$id.tsx?tsr-split=component";
function CarDetails() {
	const { id } = Route.useParams();
	const { cars, addOrder } = useDealership();
	const { t } = useLanguage();
	const favs = useFavorites();
	const cmp = useCompareList();
	const car = cars.find((c) => String(c.id) === String(id));
	const [idx, setIdx] = (0, import_react.useState)(0);
	const [submitted, setSubmitted] = (0, import_react.useState)(false);
	const [submitting, setSubmitting] = (0, import_react.useState)(false);
	const [rotation, setRotation] = (0, import_react.useState)(0);
	const [showHistory, setShowHistory] = (0, import_react.useState)(false);
	const galleryRef = (0, import_react.useRef)(null);
	const isFav = favs.includes(id);
	const isCmp = cmp.includes(id);
	(0, import_react.useEffect)(() => setIdx(0), [id]);
	(0, import_react.useEffect)(() => {
		if (id) trackCarView(id);
	}, [id]);
	const site = useSiteSettings();
	if (!car) return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(PublicLayout, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "mx-auto max-w-3xl px-4 py-24 text-center fade-in",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "inline-grid place-items-center h-20 w-20 rounded-full bg-muted",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(X, { className: "h-10 w-10 text-muted-foreground" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 47,
					columnNumber: 13
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 46,
				columnNumber: 11
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
				className: "mt-6 text-3xl font-bold",
				children: t("notFound")
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 49,
				columnNumber: 11
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
				className: "mt-2 text-muted-foreground",
				children: t("notFoundDesc")
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 50,
				columnNumber: 11
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
				to: "/cars",
				className: "mt-6 inline-flex items-center gap-2 text-primary font-semibold",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowLeft, { className: "h-4 w-4 rtl:rotate-180" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 52,
						columnNumber: 13
					}, this),
					" ",
					t("backToInventory")
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 51,
				columnNumber: 11
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 45,
		columnNumber: 9
	}, this) }, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 44,
		columnNumber: 12
	}, this);
	const next = () => setIdx((i) => (i + 1) % car.images.length);
	const prev = () => setIdx((i) => (i - 1 + car.images.length) % car.images.length);
	const discounted = car.discount && car.discount > 0 ? Math.round(car.price * (100 - car.discount) / 100) : null;
	const onDrag = (cx) => {
		const el = galleryRef.current;
		if (!el) return;
		const rect = el.getBoundingClientRect();
		const x = cx - rect.left;
		const delta = Math.round((x / rect.width - .5) * 8);
		setRotation(delta);
		setIdx((Math.floor((rotation + delta) / 3) % car.images.length + car.images.length) % Math.max(1, car.images.length));
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		const form = e.currentTarget;
		const fd = new FormData(form);
		const fullName = String(fd.get("fullName") || "").trim();
		const phone = String(fd.get("phone") || "").trim();
		const email = String(fd.get("email") || "").trim();
		const city = String(fd.get("city") || "").trim();
		const notes = String(fd.get("notes") || "").trim();
		if (fullName.length < 2) return toast.error(t("fullName"));
		if (!/^[\d\s+()-]{7,20}$/.test(phone)) return toast.error(t("phoneNumber"));
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return toast.error(t("emailAddress"));
		setSubmitting(true);
		try {
			await addOrder({
				fullName,
				phone,
				email,
				city,
				notes,
				carId: car.id,
				carTitle: car.title
			});
			setSubmitted(true);
			toast.success(t("inquirySuccessTitle"));
			form.reset();
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Could not send your inquiry.");
		} finally {
			setSubmitting(false);
		}
	};
	const specs = [
		{
			Icon: Calendar,
			label: t("specYear"),
			value: car.year
		},
		{
			Icon: Gauge,
			label: t("specMileage"),
			value: formatMiles(car.mileage)
		},
		{
			Icon: Fuel,
			label: t("specEngine"),
			value: car.engine
		},
		{
			Icon: Cog,
			label: t("specTransmission"),
			value: car.transmission
		},
		{
			Icon: ShieldCheck,
			label: t("specCondition"),
			value: car.condition
		},
		{
			Icon: CircleCheck,
			label: t("specCategory"),
			value: car.category
		}
	];
	const waText = encodeURIComponent(`Hi, I'm interested in ${car.title} (ID: ${car.id})`);
	const waHref = `https://wa.me/${site.whatsapp}?text=${waText}`;
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(PublicLayout, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "mx-auto max-w-7xl px-4 sm:px-6 py-8 pb-32 lg:pb-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
				to: "/cars",
				className: "inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowLeft, { className: "h-4 w-4 rtl:rotate-180" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 135,
						columnNumber: 11
					}, this),
					" ",
					t("backToInventory")
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 134,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mt-6 grid gap-10 lg:grid-cols-[1.4fr_1fr]",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						ref: galleryRef,
						className: "relative aspect-[16/10] rounded-2xl overflow-hidden bg-muted shadow-elegant select-none",
						onMouseMove: (e) => e.buttons === 1 && onDrag(e.clientX),
						onTouchMove: (e) => onDrag(e.touches[0].clientX),
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
								src: car.images[idx],
								alt: car.title,
								className: "h-full w-full object-cover transition-transform duration-700",
								style: { transform: `scale(${1 + Math.abs(rotation) * .005})` },
								loading: "eager",
								fetchPriority: "high"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 142,
								columnNumber: 15
							}, this),
							car.images.length > 1 && /* @__PURE__ */ (void 0)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (void 0)("button", {
								onClick: prev,
								"aria-label": "Previous image",
								className: "absolute left-3 top-1/2 -translate-y-1/2 h-10 w-10 grid place-items-center rounded-full bg-background/90 backdrop-blur shadow-card hover:bg-background transition",
								children: /* @__PURE__ */ (void 0)(ChevronLeft, { className: "h-5 w-5" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 147,
									columnNumber: 21
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 146,
								columnNumber: 19
							}, this), /* @__PURE__ */ (void 0)("button", {
								onClick: next,
								"aria-label": "Next image",
								className: "absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 grid place-items-center rounded-full bg-background/90 backdrop-blur shadow-card hover:bg-background transition",
								children: /* @__PURE__ */ (void 0)(ChevronRight, { className: "h-5 w-5" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 150,
									columnNumber: 21
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 149,
								columnNumber: 19
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 145,
								columnNumber: 41
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "absolute bottom-3 right-3 px-2.5 py-1 rounded-full text-xs bg-background/90 backdrop-blur font-medium",
								children: [
									idx + 1,
									" / ",
									car.images.length
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 153,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] uppercase font-bold bg-primary text-primary-foreground",
								children: "360° drag"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 156,
								columnNumber: 15
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 141,
						columnNumber: 13
					}, this),
					car.images.length > 1 && /* @__PURE__ */ (void 0)("div", {
						className: "mt-3 grid grid-cols-4 sm:grid-cols-6 gap-2",
						children: car.images.map((src, i) => /* @__PURE__ */ (void 0)("button", {
							onClick: () => setIdx(i),
							className: cn("aspect-square rounded-lg overflow-hidden border-2 transition", i === idx ? "border-accent" : "border-transparent opacity-70 hover:opacity-100"),
							children: /* @__PURE__ */ (void 0)("img", {
								src,
								alt: "",
								loading: "lazy",
								className: "h-full w-full object-cover"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 163,
								columnNumber: 21
							}, this)
						}, i, false, {
							fileName: _jsxFileName,
							lineNumber: 162,
							columnNumber: 45
						}, this))
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 161,
						columnNumber: 39
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "mt-8 flex items-center gap-2 flex-wrap",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								onClick: () => {
									const a = toggleFavorite(car.id);
									toast.success(a ? t("favSaved") : t("favRemovedMsg"));
								},
								className: cn("inline-flex items-center gap-2 h-10 px-4 rounded-full border text-sm font-semibold", isFav ? "bg-red-500/10 border-red-500/40 text-red-500" : "border-input hover:bg-secondary"),
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Heart, { className: cn("h-4 w-4", isFav && "fill-red-500") }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 172,
									columnNumber: 17
								}, this), isFav ? t("favRemove") : t("favAdd")]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 168,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								onClick: () => {
									if (!isCmp && cmp.length >= 3) {
										toast.error(t("compareEmpty"));
										return;
									}
									toggleCompare(car.id);
									toast.success(isCmp ? t("compareRemove") : t("compareAdd"));
								},
								className: cn("inline-flex items-center gap-2 h-10 px-4 rounded-full border text-sm font-semibold", isCmp ? "bg-accent text-accent-foreground border-accent" : "border-input hover:bg-secondary"),
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(GitCompare, { className: "h-4 w-4" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 183,
									columnNumber: 17
								}, this), isCmp ? t("compareRemove") : t("compareAdd")]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 175,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								onClick: () => setShowHistory(true),
								className: "inline-flex items-center gap-2 h-10 px-4 rounded-full bg-secondary hover:bg-secondary/80 text-sm font-semibold",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FileText, { className: "h-4 w-4" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 187,
										columnNumber: 17
									}, this),
									" ",
									t("historyTitle")
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 186,
								columnNumber: 15
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 167,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "mt-8",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "text-xs font-semibold px-2.5 py-1 rounded-full bg-secondary",
								children: car.category
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 192,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
								className: "mt-3 text-3xl md:text-4xl font-bold",
								children: car.title
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 193,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "mt-2 flex items-baseline gap-3",
								children: discounted ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "text-3xl font-bold text-accent",
										children: formatPrice(discounted)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 196,
										columnNumber: 21
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "text-lg line-through text-muted-foreground",
										children: formatPrice(car.price)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 197,
										columnNumber: 21
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "text-xs font-bold px-2 py-0.5 rounded bg-destructive text-destructive-foreground",
										children: [
											"-",
											car.discount,
											"%"
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 198,
										columnNumber: 21
									}, this)
								] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 195,
									columnNumber: 31
								}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "text-3xl font-bold text-accent",
									children: formatPrice(car.price)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 199,
									columnNumber: 25
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 194,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "mt-8 grid grid-cols-2 sm:grid-cols-3 gap-4",
								children: [
									specs.map((s) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "bg-card border border-border rounded-xl p-4",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "flex items-center gap-2 text-muted-foreground text-xs",
											children: [
												/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(s.Icon, { className: "h-4 w-4" }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 205,
													columnNumber: 23
												}, this),
												" ",
												s.label
											]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 204,
											columnNumber: 21
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "mt-1 font-semibold",
											children: s.value
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 207,
											columnNumber: 21
										}, this)]
									}, s.label, true, {
										fileName: _jsxFileName,
										lineNumber: 203,
										columnNumber: 33
									}, this)),
									car.color && /* @__PURE__ */ (void 0)("div", {
										className: "bg-card border border-border rounded-xl p-4",
										children: [/* @__PURE__ */ (void 0)("div", {
											className: "text-muted-foreground text-xs",
											children: t("specColor")
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 210,
											columnNumber: 21
										}, this), /* @__PURE__ */ (void 0)("div", {
											className: "mt-1 font-semibold flex items-center gap-2",
											children: [/* @__PURE__ */ (void 0)("span", {
												className: "inline-block h-3 w-3 rounded-full",
												style: { background: car.color.toLowerCase().includes("black") ? "#111" : car.color.toLowerCase().includes("white") ? "#eee" : car.color.toLowerCase().includes("red") ? "#dc2626" : car.color.toLowerCase().includes("blue") ? "#2563eb" : car.color.toLowerCase().includes("silver") ? "#a3a3a3" : car.color.toLowerCase().includes("green") ? "#16a34a" : "#6b7280" }
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 212,
												columnNumber: 23
											}, this), car.color]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 211,
											columnNumber: 21
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 209,
										columnNumber: 31
									}, this),
									typeof car.cylinders === "number" && car.cylinders > 0 && /* @__PURE__ */ (void 0)("div", {
										className: "bg-card border border-border rounded-xl p-4",
										children: [/* @__PURE__ */ (void 0)("div", {
											className: "text-muted-foreground text-xs",
											children: t("specCylinders")
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 219,
											columnNumber: 21
										}, this), /* @__PURE__ */ (void 0)("div", {
											className: "mt-1 font-semibold",
											children: car.cylinders
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 220,
											columnNumber: 21
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 218,
										columnNumber: 76
									}, this),
									car.fuel && /* @__PURE__ */ (void 0)("div", {
										className: "bg-card border border-border rounded-xl p-4",
										children: [/* @__PURE__ */ (void 0)("div", {
											className: "text-muted-foreground text-xs",
											children: t("specFuel")
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 223,
											columnNumber: 21
										}, this), /* @__PURE__ */ (void 0)("div", {
											className: "mt-1 font-semibold",
											children: car.fuel
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 224,
											columnNumber: 21
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 222,
										columnNumber: 30
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 202,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "mt-8",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
									className: "text-xl font-bold",
									children: t("description")
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 229,
									columnNumber: 17
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "mt-3 text-muted-foreground leading-relaxed",
									children: car.description
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 230,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 228,
								columnNumber: 15
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 191,
						columnNumber: 13
					}, this)
				] }, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 140,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("aside", {
					className: "lg:sticky lg:top-24 h-fit space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "bg-card border border-border rounded-2xl p-6 shadow-elegant",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
								className: "font-display text-xl font-bold",
								children: t("inquiryTitle")
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 238,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "mt-1 text-sm text-muted-foreground",
								children: t("inquirySubtitle")
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 239,
								columnNumber: 15
							}, this),
							submitted ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "mt-6 rounded-xl bg-secondary p-5 text-center",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CircleCheck, { className: "h-10 w-10 mx-auto text-accent" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 241,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "mt-2 font-semibold",
										children: t("inquirySuccessTitle")
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 242,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
										className: "mt-1 text-sm text-muted-foreground",
										children: t("inquirySuccessMsg")
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 243,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
										onClick: () => setSubmitted(false),
										className: "mt-4 text-sm font-medium text-primary hover:text-accent",
										children: t("btnSendAnother")
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 244,
										columnNumber: 19
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 240,
								columnNumber: 28
							}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("form", {
								onSubmit: handleSubmit,
								className: "mt-4 space-y-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
										name: "fullName",
										placeholder: t("inquiryFullName"),
										required: true,
										className: "w-full h-11 px-3 rounded-md bg-background border border-input text-sm"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 248,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "grid grid-cols-2 gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
											name: "phone",
											placeholder: t("inquiryPhone"),
											required: true,
											className: "w-full h-11 px-3 rounded-md bg-background border border-input text-sm"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 250,
											columnNumber: 21
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
											name: "email",
											type: "email",
											placeholder: t("inquiryEmail"),
											required: true,
											className: "w-full h-11 px-3 rounded-md bg-background border border-input text-sm"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 251,
											columnNumber: 21
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 249,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
										name: "city",
										placeholder: t("inquiryCity"),
										className: "w-full h-11 px-3 rounded-md bg-background border border-input text-sm"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 253,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("textarea", {
										name: "notes",
										placeholder: t("inquiryNotes"),
										rows: 3,
										className: "w-full px-3 py-2 rounded-md bg-background border border-input text-sm resize-none"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 254,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
										type: "submit",
										disabled: submitting,
										className: "w-full h-11 rounded-lg bg-gradient-accent text-accent-foreground font-bold flex items-center justify-center gap-2 disabled:opacity-60",
										children: submitting ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LoaderCircle, { className: "h-4 w-4 spin" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 256,
												columnNumber: 37
											}, this),
											" ",
											t("inquirySending")
										] }, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 256,
											columnNumber: 35
										}, this) : t("inquirySubmit")
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 255,
										columnNumber: 19
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 247,
								columnNumber: 26
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
								href: waHref,
								target: "_blank",
								rel: "noopener noreferrer",
								className: "mt-3 inline-flex items-center justify-center gap-2 w-full h-11 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-bold",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(MessageCircle, { className: "h-4 w-4" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 261,
										columnNumber: 17
									}, this),
									" ",
									t("whatsappNow")
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 260,
								columnNumber: 15
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 237,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FinanceCalc, { price: car.price }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 264,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 236,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 138,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "fixed lg:hidden bottom-0 inset-x-0 z-40 bg-card/95 backdrop-blur border-t border-border p-3 flex gap-2 shadow-elegant",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
					href: waHref,
					target: "_blank",
					rel: "noopener noreferrer",
					className: "flex-1 inline-flex items-center justify-center gap-2 h-12 rounded-lg bg-emerald-500 text-white font-bold text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(MessageCircle, { className: "h-4 w-4" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 271,
							columnNumber: 13
						}, this),
						" ",
						t("whatsappNow")
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 270,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
					to: "#inquiry",
					onClick: (e) => {
						document.querySelector("form")?.scrollIntoView({ behavior: "smooth" });
						e.preventDefault();
					},
					className: "flex-1 inline-flex items-center justify-center gap-2 h-12 rounded-lg bg-gradient-accent text-accent-foreground font-bold text-sm",
					children: t("applyFinance")
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 273,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 269,
				columnNumber: 9
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 133,
		columnNumber: 7
	}, this), showHistory && /* @__PURE__ */ (void 0)("div", {
		className: "fixed inset-0 z-50 bg-black/60 backdrop-blur-sm grid place-items-center p-4",
		onClick: () => setShowHistory(false),
		children: /* @__PURE__ */ (void 0)("div", {
			className: "bg-card rounded-2xl max-w-lg w-full p-6 shadow-elegant",
			onClick: (e) => e.stopPropagation(),
			children: [/* @__PURE__ */ (void 0)("div", {
				className: "flex items-start justify-between mb-4",
				children: [/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("h2", {
					className: "text-xl font-bold font-display",
					children: t("historyTitle")
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 290,
					columnNumber: 17
				}, this), /* @__PURE__ */ (void 0)("p", {
					className: "text-xs text-muted-foreground mt-1",
					children: [
						car.title,
						" • ",
						t("reportsAvailable")
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 291,
					columnNumber: 17
				}, this)] }, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 289,
					columnNumber: 15
				}, this), /* @__PURE__ */ (void 0)("button", {
					onClick: () => setShowHistory(false),
					className: "p-2 rounded-md hover:bg-secondary",
					"aria-label": "Close",
					children: /* @__PURE__ */ (void 0)(X, { className: "h-4 w-4" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 293,
						columnNumber: 126
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 293,
					columnNumber: 15
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 288,
				columnNumber: 13
			}, this), /* @__PURE__ */ (void 0)("div", {
				className: "space-y-3 text-sm",
				children: [
					/* @__PURE__ */ (void 0)("div", {
						className: "flex items-start justify-between p-3 rounded-lg bg-secondary",
						children: [/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("div", {
							className: "font-semibold",
							children: t("historyOwners")
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 298,
							columnNumber: 19
						}, this), /* @__PURE__ */ (void 0)("div", {
							className: "text-muted-foreground text-xs",
							children: "CARFAX-verified"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 299,
							columnNumber: 19
						}, this)] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 297,
							columnNumber: 17
						}, this), /* @__PURE__ */ (void 0)("span", {
							className: "font-bold text-accent",
							children: t("historyOwnersVal")
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 301,
							columnNumber: 17
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 296,
						columnNumber: 15
					}, this),
					/* @__PURE__ */ (void 0)("div", {
						className: "flex items-start justify-between p-3 rounded-lg bg-secondary",
						children: [/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("div", {
							className: "font-semibold",
							children: t("historyAccidents")
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 305,
							columnNumber: 19
						}, this), /* @__PURE__ */ (void 0)("div", {
							className: "text-muted-foreground text-xs",
							children: "Police and insurance records"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 306,
							columnNumber: 19
						}, this)] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 304,
							columnNumber: 17
						}, this), /* @__PURE__ */ (void 0)("span", {
							className: "font-bold text-accent",
							children: t("historyAccidentsVal")
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 308,
							columnNumber: 17
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 303,
						columnNumber: 15
					}, this),
					/* @__PURE__ */ (void 0)("div", {
						className: "flex items-start justify-between p-3 rounded-lg bg-secondary",
						children: [/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("div", {
							className: "font-semibold",
							children: t("historyService")
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 312,
							columnNumber: 19
						}, this), /* @__PURE__ */ (void 0)("div", {
							className: "text-muted-foreground text-xs",
							children: "23 service records on file"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 313,
							columnNumber: 19
						}, this)] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 311,
							columnNumber: 17
						}, this), /* @__PURE__ */ (void 0)("span", {
							className: "font-bold text-accent",
							children: t("historyServiceVal")
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 315,
							columnNumber: 17
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 310,
						columnNumber: 15
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 295,
				columnNumber: 13
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 287,
			columnNumber: 11
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 286,
		columnNumber: 23
	}, this)] }, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 132,
		columnNumber: 10
	}, this);
}
function FinanceCalc({ price }) {
	const { t } = useLanguage();
	const [downPct, setDownPct] = (0, import_react.useState)(20);
	const [rate, setRate] = (0, import_react.useState)(6);
	const [n, setN] = (0, import_react.useState)(60);
	const principal = Math.max(0, price * (1 - Math.min(90, Math.max(0, downPct)) / 100));
	const months = Math.max(1, Math.min(120, n));
	const r = Math.max(0, rate) / 100 / 12;
	const monthly = r > 0 ? principal * r / (1 - Math.pow(1 + r, -months)) : principal / months;
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "bg-card border border-border rounded-2xl p-6 shadow-card",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
				className: "font-display text-lg font-bold flex items-center gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Calculator, { className: "h-5 w-5 text-accent" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 339,
						columnNumber: 9
					}, this),
					" ",
					t("calcTitle")
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 338,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mt-4 grid grid-cols-3 gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
						className: "text-xs font-semibold text-muted-foreground",
						children: t("calcDown")
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 342,
						columnNumber: 14
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
						type: "number",
						min: 0,
						max: 90,
						value: downPct,
						onChange: (e) => setDownPct(Number(e.target.value)),
						className: "mt-1 w-full h-10 px-3 rounded-md bg-background border border-input text-sm"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 342,
						columnNumber: 100
					}, this)] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 342,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
						className: "text-xs font-semibold text-muted-foreground",
						children: t("calcRate")
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 343,
						columnNumber: 14
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
						type: "number",
						min: 0,
						max: 30,
						step: .1,
						value: rate,
						onChange: (e) => setRate(Number(e.target.value)),
						className: "mt-1 w-full h-10 px-3 rounded-md bg-background border border-input text-sm"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 343,
						columnNumber: 100
					}, this)] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 343,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
						className: "text-xs font-semibold text-muted-foreground",
						children: t("calcTerm")
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 344,
						columnNumber: 14
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
						type: "number",
						min: 6,
						max: 120,
						step: 6,
						value: n,
						onChange: (e) => setN(Number(e.target.value)),
						className: "mt-1 w-full h-10 px-3 rounded-md bg-background border border-input text-sm"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 344,
						columnNumber: 100
					}, this)] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 344,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 341,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mt-4 rounded-xl bg-secondary p-4 text-center",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "text-xs text-muted-foreground",
					children: t("calcMonthly")
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 347,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mt-1 text-2xl font-bold text-accent",
					children: [
						formatPrice(Math.round(monthly)),
						" ",
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "text-xs font-normal",
							children: "/ mo"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 348,
							columnNumber: 97
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 348,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 346,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
				className: "mt-2 text-[11px] text-muted-foreground",
				children: t("calcDisclaimer")
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 350,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 337,
		columnNumber: 10
	}, this);
}
//#endregion
export { CarDetails as component };
