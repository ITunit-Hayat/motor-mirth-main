import { r as __toESM } from "../_runtime.mjs";
import { r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ThemeContext-A4-ueCni.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/context/ThemeContext.tsx";
var ThemeContext = (0, import_react.createContext)(null);
function detect() {
	if (typeof window === "undefined") return "light";
	try {
		const s = localStorage.getItem("theme");
		if (s === "light" || s === "dark") return s;
	} catch {}
	return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}
function ThemeProvider({ children }) {
	const [theme, setTheme] = (0, import_react.useState)("light");
	(0, import_react.useEffect)(() => {
		setTheme(detect());
	}, []);
	(0, import_react.useEffect)(() => {
		document.documentElement.classList.toggle("dark", theme === "dark");
		try {
			localStorage.setItem("theme", theme);
		} catch {}
	}, [theme]);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ThemeContext.Provider, {
		value: {
			theme,
			setTheme,
			toggle: () => setTheme((t) => t === "dark" ? "light" : "dark")
		},
		children
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 20,
		columnNumber: 5
	}, this);
}
function useTheme() {
	const c = (0, import_react.useContext)(ThemeContext);
	if (!c) throw new Error("useTheme must be used within ThemeProvider");
	return c;
}
//#endregion
export { useTheme as n, ThemeProvider as t };
