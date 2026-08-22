import { r as __toESM } from "../_runtime.mjs";
import { r as require_react } from "../_libs/react+tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/analytics-CSNBGE9S.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var KEY_VIEWS = "vm_page_views";
var KEY_CAR_VIEWS = "vm_car_views";
var KEY_UNIQUE = "vm_unique_visitors";
var KEY_TODAY = "vm_visits_today";
var EVT = "vm:analytics";
function read(k, fb) {
	try {
		const r = localStorage.getItem(k);
		return r ? JSON.parse(r) : fb;
	} catch {
		return fb;
	}
}
function write(k, v) {
	try {
		localStorage.setItem(k, JSON.stringify(v));
	} catch {}
	window.dispatchEvent(new CustomEvent(EVT));
}
function trackPageView(path) {
	const views = read(KEY_VIEWS, []);
	views.push({
		path,
		at: Date.now()
	});
	write(KEY_VIEWS, views.slice(-2e3));
	if (!read(KEY_UNIQUE, false)) write(KEY_UNIQUE, true);
	const today = (/* @__PURE__ */ new Date()).toDateString();
	const t = read(KEY_TODAY, {
		date: today,
		count: 0
	});
	write(KEY_TODAY, t.date === today ? {
		date: today,
		count: t.count + 1
	} : {
		date: today,
		count: 1
	});
}
function trackCarView(carId) {
	const cv = read(KEY_CAR_VIEWS, {});
	cv[carId] = (cv[carId] ?? 0) + 1;
	write(KEY_CAR_VIEWS, cv);
}
function getAnalytics() {
	const views = read(KEY_VIEWS, []);
	const today = (/* @__PURE__ */ new Date()).toDateString();
	const t = read(KEY_TODAY, {
		date: today,
		count: 0
	});
	const cv = read(KEY_CAR_VIEWS, {});
	const days = [];
	for (let i = 6; i >= 0; i--) {
		const d = /* @__PURE__ */ new Date();
		d.setDate(d.getDate() - i);
		const start = new Date(d.toDateString()).getTime();
		const end = start + 864e5;
		const count = views.filter((v) => v.at >= start && v.at < end).length;
		days.push({
			day: d.toLocaleDateString(void 0, { weekday: "short" }),
			count
		});
	}
	const byPath = /* @__PURE__ */ new Map();
	views.forEach((v) => byPath.set(v.path, (byPath.get(v.path) ?? 0) + 1));
	const topPaths = [...byPath.entries()].map(([path, count]) => ({
		path,
		count
	})).sort((a, b) => b.count - a.count).slice(0, 8);
	return {
		totalViews: views.length,
		viewsToday: t.date === today ? t.count : 0,
		uniqueVisitor: read(KEY_UNIQUE, false),
		viewsLast7Days: days,
		topPaths,
		carViews: cv
	};
}
function resetAnalytics() {
	write(KEY_VIEWS, []);
	write(KEY_CAR_VIEWS, {});
	write(KEY_TODAY, {
		date: (/* @__PURE__ */ new Date()).toDateString(),
		count: 0
	});
}
/** Re-render hook so admin dashboard updates live. */
function useAnalytics() {
	const [, setTick] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		const h = () => setTick((t) => t + 1);
		window.addEventListener(EVT, h);
		window.addEventListener("storage", h);
		return () => {
			window.removeEventListener(EVT, h);
			window.removeEventListener("storage", h);
		};
	}, []);
	return getAnalytics();
}
//#endregion
export { useAnalytics as i, trackCarView as n, trackPageView as r, resetAnalytics as t };
