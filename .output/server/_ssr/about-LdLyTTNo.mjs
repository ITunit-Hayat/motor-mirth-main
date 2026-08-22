import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { n as useLanguage } from "./LanguageContext-C6BSyEfd.mjs";
import { d as Sparkles, m as Shield, r as Wrench } from "../_libs/lucide-react.mjs";
import { t as PublicLayout } from "./PublicLayout-Ax7Pira8.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/about-LdLyTTNo.js
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/routes/about.tsx?tsr-split=component";
function AboutPage() {
	const { t } = useLanguage();
	const values = [
		{
			Icon: Sparkles,
			k: "valueHonesty",
			v: "valueHonestyDesc"
		},
		{
			Icon: Shield,
			k: "valueExcellence",
			v: "valueExcellenceDesc"
		},
		{
			Icon: Wrench,
			k: "valueCare",
			v: "valueCareDesc"
		}
	];
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(PublicLayout, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
		className: "mx-auto max-w-7xl px-4 sm:px-6 py-12 md:py-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "grid gap-10 lg:grid-cols-2 items-center",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
					className: "font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-center lg:text-start",
					children: t("aboutHeroTitle")
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 25,
					columnNumber: 13
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "mt-6 text-lg text-muted-foreground leading-relaxed whitespace-pre-line text-center lg:text-start",
					children: t("aboutHeroBody")
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 26,
					columnNumber: 13
				}, this)] }, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 24,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "relative aspect-[4/3] rounded-2xl overflow-hidden shadow-elegant",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
						src: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1600&q=85",
						alt: "",
						className: "h-full w-full object-cover",
						loading: "lazy"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 29,
						columnNumber: 13
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 28,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 23,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mt-12 rounded-3xl bg-gradient-hero text-primary-foreground p-8 md:p-12 shadow-elegant relative overflow-hidden",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "absolute -right-12 -top-12 h-48 w-48 rounded-full bg-accent/30 blur-3xl" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 34,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "text-center relative",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "text-xs uppercase tracking-widest font-bold text-accent",
						children: t("aboutMissionTitle")
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 36,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "mt-4 font-display text-2xl md:text-3xl font-semibold max-w-2xl mx-auto leading-snug",
						children: t("aboutMission")
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 37,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 35,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 33,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
				className: "mt-16 text-2xl md:text-3xl font-bold text-center",
				children: [
					t("valueHonesty"),
					" • ",
					t("valueExcellence"),
					" • ",
					t("valueCare")
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 41,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
				className: "mt-2 text-center text-muted-foreground",
				children: t("aboutHeroTitle")
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 42,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mt-10 grid gap-6 sm:grid-cols-3",
				children: values.map(({ Icon, k, v }) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "bg-card border border-border rounded-2xl p-6 shadow-card hover:shadow-elegant transition",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "h-12 w-12 grid place-items-center rounded-xl bg-accent/15 text-accent",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Icon, { className: "h-6 w-6" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 50,
								columnNumber: 102
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 50,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
							className: "mt-4 font-display text-lg font-bold",
							children: t(k)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 51,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "mt-2 text-sm text-muted-foreground",
							children: t(v)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 52,
							columnNumber: 15
						}, this)
					]
				}, k, true, {
					fileName: _jsxFileName,
					lineNumber: 49,
					columnNumber: 15
				}, this))
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 44,
				columnNumber: 9
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 22,
		columnNumber: 7
	}, this) }, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 21,
		columnNumber: 10
	}, this);
}
//#endregion
export { AboutPage as component };
