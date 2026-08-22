import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { o as TriangleAlert } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/StateViews-ChF2SlsX.js
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/components/StateViews.tsx";
function CarGridSkeleton({ count = 6 }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: Array.from({ length: count }).map((_, i) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "bg-card rounded-2xl border border-border overflow-hidden shadow-card",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "aspect-[16/10] bg-muted animate-pulse" }, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 8,
			columnNumber: 11
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "p-5 space-y-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "h-4 w-3/4 bg-muted rounded animate-pulse" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 10,
					columnNumber: 13
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "h-3 w-1/2 bg-muted rounded animate-pulse" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 11,
					columnNumber: 13
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "h-5 w-1/3 bg-muted rounded animate-pulse" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 12,
					columnNumber: 13
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 9,
			columnNumber: 11
		}, this)]
	}, i, true, {
		fileName: _jsxFileName,
		lineNumber: 7,
		columnNumber: 9
	}, this)) }, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 5,
		columnNumber: 5
	}, this);
}
function ErrorState({ message, onRetry }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "rounded-2xl border border-destructive/30 bg-destructive/5 p-8 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TriangleAlert, { className: "h-8 w-8 mx-auto text-destructive" }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 23,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mt-3 font-semibold",
				children: "Couldn't load data"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 24,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: message
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 25,
				columnNumber: 7
			}, this),
			onRetry && /* @__PURE__ */ (void 0)("button", {
				onClick: onRetry,
				className: "mt-4 h-9 px-4 rounded-md bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90",
				children: "Try again"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 27,
				columnNumber: 9
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 22,
		columnNumber: 5
	}, this);
}
//#endregion
export { ErrorState as n, CarGridSkeleton as t };
