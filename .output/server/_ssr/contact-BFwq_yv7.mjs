import { r as __toESM } from "../_runtime.mjs";
import { r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { n as useLanguage } from "./LanguageContext-C6BSyEfd.mjs";
import { D as MapPin, O as Mail, Y as CircleCheck, _ as Send, x as Phone } from "../_libs/lucide-react.mjs";
import { t as PublicLayout } from "./PublicLayout-Ax7Pira8.mjs";
import { a as useDealership } from "./DealershipContext-CZIneh0B.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/contact-BFwq_yv7.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/routes/contact.tsx?tsr-split=component";
function ContactPage() {
	const { t } = useLanguage();
	const { addOrder } = useDealership();
	const [sent, setSent] = (0, import_react.useState)(false);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const onSubmit = async (e) => {
		e.preventDefault();
		const f = e.currentTarget;
		const fd = new FormData(f);
		const name = String(fd.get("name") || "").trim();
		const email = String(fd.get("email") || "").trim();
		const message = String(fd.get("message") || "").trim();
		if (!name || !email || !message) {
			toast.error("Please complete all fields.");
			return;
		}
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
			toast.error(t("emailAddress"));
			return;
		}
		setBusy(true);
		try {
			await addOrder({
				fullName: name,
				email,
				phone: "—",
				city: "—",
				notes: message.slice(0, 200),
				carId: "contact",
				carTitle: "General inquiry"
			});
			setSent(true);
			toast.success(t("contactSent"));
			f.reset();
		} catch {
			toast.error("Send failed.");
		} finally {
			setBusy(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(PublicLayout, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
		className: "mx-auto max-w-7xl px-4 sm:px-6 py-12 md:py-16",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "grid gap-8 lg:grid-cols-2 items-start",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "bg-card border border-border rounded-2xl shadow-elegant p-6 md:p-8",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
					className: "font-display text-2xl md:text-3xl font-bold text-center",
					children: t("contactHeroTitle")
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 55,
					columnNumber: 13
				}, this), sent ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mt-8 text-center rounded-xl bg-secondary p-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CircleCheck, { className: "h-10 w-10 mx-auto text-accent" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 57,
							columnNumber: 17
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "mt-3 font-bold",
							children: t("contactSent")
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 58,
							columnNumber: 17
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							onClick: () => setSent(false),
							className: "mt-4 text-sm font-semibold text-primary hover:text-accent",
							children: t("inquirySuccessMsg")
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 59,
							columnNumber: 17
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 56,
					columnNumber: 21
				}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("form", {
					onSubmit,
					className: "mt-8 space-y-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
							className: "text-xs font-semibold text-muted-foreground flex justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: t("contactName") }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 62,
								columnNumber: 103
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "opacity-60",
								children: "Required"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 62,
								columnNumber: 134
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 62,
							columnNumber: 19
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
							name: "name",
							required: true,
							className: "mt-1 w-full h-11 px-3 rounded-md bg-background border border-input text-sm"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 63,
							columnNumber: 19
						}, this)] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 61,
							columnNumber: 17
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
							className: "text-xs font-semibold text-muted-foreground",
							children: t("contactEmail")
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 66,
							columnNumber: 19
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
							name: "email",
							type: "email",
							required: true,
							className: "mt-1 w-full h-11 px-3 rounded-md bg-background border border-input text-sm"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 67,
							columnNumber: 19
						}, this)] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 65,
							columnNumber: 17
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
							className: "text-xs font-semibold text-muted-foreground",
							children: t("contactMessage")
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 70,
							columnNumber: 19
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("textarea", {
							name: "message",
							rows: 6,
							required: true,
							className: "mt-1 w-full px-3 py-2 rounded-md bg-background border border-input text-sm resize-none"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 71,
							columnNumber: 19
						}, this)] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 69,
							columnNumber: 17
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							type: "submit",
							disabled: busy,
							className: "w-full h-12 rounded-lg bg-gradient-accent text-accent-foreground font-bold flex items-center justify-center gap-2 disabled:opacity-60",
							children: [busy ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "spin inline-block h-4 w-4 border-2 border-white/60 border-t-white rounded-full" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 74,
								columnNumber: 27
							}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Send, { className: "h-4 w-4" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 74,
								columnNumber: 129
							}, this), t("contactSend")]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 73,
							columnNumber: 17
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 60,
					columnNumber: 24
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 54,
				columnNumber: 11
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "space-y-4",
				children: [[
					{
						Icon: Phone,
						label: t("contactPhone"),
						val: t("contactPhoneVal")
					},
					{
						Icon: Mail,
						label: t("contactEmail2"),
						val: t("contactEmailVal")
					},
					{
						Icon: MapPin,
						label: t("contactShowroom"),
						val: t("contactLocationVal")
					}
				].map(({ Icon, label, val }) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "bg-card border border-border rounded-2xl p-5 flex items-center gap-4 shadow-card",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "h-12 w-12 grid place-items-center rounded-xl bg-accent/15 text-accent",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Icon, { className: "h-5 w-5" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 98,
							columnNumber: 104
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 98,
						columnNumber: 17
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "text-xs font-semibold uppercase tracking-wide text-muted-foreground",
						children: label
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 100,
						columnNumber: 19
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "font-display font-bold",
						children: val
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 101,
						columnNumber: 19
					}, this)] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 99,
						columnNumber: 17
					}, this)]
				}, label, true, {
					fileName: _jsxFileName,
					lineNumber: 97,
					columnNumber: 17
				}, this)), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "rounded-2xl overflow-hidden border border-border shadow-card",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("iframe", {
						title: "Map",
						src: "https://www.openstreetmap.org/export/embed.html?bbox=-118.282%2C34.038%2C-118.252%2C34.058&layer=mapnik&marker=34.048%2C-118.267",
						className: "w-full h-72 border-0",
						loading: "lazy"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 106,
						columnNumber: 15
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 105,
					columnNumber: 13
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 80,
				columnNumber: 11
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 53,
			columnNumber: 9
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 52,
		columnNumber: 7
	}, this) }, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 51,
		columnNumber: 10
	}, this);
}
//#endregion
export { ContactPage as component };
