import { r as __toESM } from "../_runtime.mjs";
import { r as require_react } from "../_libs/react+tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/settings-B88DAbRA.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var KEY = "vm_site_settings";
var EVT = "vm:settings-changed";
var DEFAULT_SETTINGS = {
	siteName: "VelocityMotors",
	phone: "+966 11 456 7890",
	email: "contact@velocitymotors.sa",
	address: "طريق الملك فهد، حي الصحافة، الرياض، المملكة العربية السعودية",
	whatsapp: "+966501234567",
	showDiscountBanner: true,
	adminPasscode: "admin2026",
	dealershipPhone: "+966 11 456 7890",
	dealershipEmail: "contact@velocitymotors.sa",
	whatsappNumber: "+966501234567",
	currencySymbol: "$"
};
function getSettings() {
	try {
		const r = localStorage.getItem(KEY);
		return r ? {
			...DEFAULT_SETTINGS,
			...JSON.parse(r)
		} : DEFAULT_SETTINGS;
	} catch {
		return DEFAULT_SETTINGS;
	}
}
function saveSettings(s) {
	try {
		localStorage.setItem(KEY, JSON.stringify(s));
	} catch {}
	window.dispatchEvent(new CustomEvent(EVT));
}
function updateSettings(partial) {
	const current = getSettings();
	saveSettings({
		...current,
		...partial,
		phone: partial.dealershipPhone || partial.phone || current.phone,
		email: partial.dealershipEmail || partial.email || current.email,
		whatsapp: partial.whatsappNumber || partial.whatsapp || current.whatsapp
	});
}
function useSettings() {
	const [s, setS] = (0, import_react.useState)(getSettings());
	const sync = (0, import_react.useCallback)(() => setS(getSettings()), []);
	(0, import_react.useEffect)(() => {
		sync();
		const h = () => sync();
		window.addEventListener(EVT, h);
		window.addEventListener("storage", h);
		return () => {
			window.removeEventListener(EVT, h);
			window.removeEventListener("storage", h);
		};
	}, [sync]);
	return [s, saveSettings];
}
function useSiteSettings() {
	const [s] = useSettings();
	return s;
}
//#endregion
export { updateSettings as n, useSiteSettings as r, getSettings as t };
