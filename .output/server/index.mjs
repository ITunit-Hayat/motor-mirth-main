globalThis.__nitro_main__ = import.meta.url;
import { i as serve, r as NodeResponse } from "./_libs/h3-v2+rou3+srvx.mjs";
import { i as toEventHandler, n as defineHandler, o as HTTPError, r as defineLazyEventHandler, t as H3Core } from "./_libs/h3+rou3+srvx.mjs";
import { i as withoutTrailingSlash, n as joinURL, r as withLeadingSlash, t as decodePath } from "./_libs/ufo.mjs";
import { promises } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
//#region #nitro-vite-setup
function lazyService(loader) {
	let promise, mod;
	return { fetch(req) {
		if (mod) return mod.fetch(req);
		if (!promise) promise = loader().then((_mod) => mod = _mod.default || _mod);
		return promise.then((mod) => mod.fetch(req));
	} };
}
var services = { ["ssr"]: lazyService(() => import("./_ssr/ssr.mjs")) };
globalThis.__nitro_vite_envs__ = services;
//#endregion
//#region node_modules/nitro/dist/runtime/internal/route-rules.mjs
var headers = ((m) => function headersRouteRule(event) {
	for (const [key, value] of Object.entries(m.options || {})) event.res.headers.set(key, value);
});
//#endregion
//#region #nitro/virtual/public-assets-data
var public_assets_data_default = {
	"/favicon.ico": {
		"type": "image/vnd.microsoft.icon",
		"etag": "\"4f95-3RXc3p2mhEAs1WBwaIvE0Y0uu0Y\"",
		"mtime": "2026-08-22T12:48:49.679Z",
		"size": 20373,
		"path": "../public/favicon.ico"
	},
	"/robots.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"a0-CKGXSIe7TSsqDTmGm/nY1t/o5d0\"",
		"mtime": "2026-08-22T12:48:49.679Z",
		"size": 160,
		"path": "../public/robots.txt"
	},
	"/assets/AdminLayout-DXRjAe7n.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5a3f-XkClIuTjuaEncvW8bCzwFqbqswI\"",
		"mtime": "2026-08-22T12:48:46.171Z",
		"size": 23103,
		"path": "../public/assets/AdminLayout-DXRjAe7n.js"
	},
	"/assets/CarCard-BvRPSHiV.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1eae-YCyjRNEeof9f65w9qOwTcWcMsGI\"",
		"mtime": "2026-08-22T12:48:46.171Z",
		"size": 7854,
		"path": "../public/assets/CarCard-BvRPSHiV.js"
	},
	"/assets/StateViews-D3PHWFg7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"87f-s69BuMUsvfmTSroXWLEY6Xx2398\"",
		"mtime": "2026-08-22T12:48:46.171Z",
		"size": 2175,
		"path": "../public/assets/StateViews-D3PHWFg7.js"
	},
	"/assets/PublicLayout-BNKMP7py.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3d8f-3UfPcc3AkdGWQVfMTMW9n6dOntk\"",
		"mtime": "2026-08-22T12:48:46.171Z",
		"size": 15759,
		"path": "../public/assets/PublicLayout-BNKMP7py.js"
	},
	"/assets/about-C9yj9s-i.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f50-exGyLySCgByZpYtoUrFgNqGe8i4\"",
		"mtime": "2026-08-22T12:48:46.171Z",
		"size": 3920,
		"path": "../public/assets/about-C9yj9s-i.js"
	},
	"/assets/LanguageContext-CWe3rzdR.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"11802-qBMXLPJ72Osuh4lowk93HQpEtcA\"",
		"mtime": "2026-08-22T12:48:46.171Z",
		"size": 71682,
		"path": "../public/assets/LanguageContext-CWe3rzdR.js"
	},
	"/assets/cars.index-Boso_rIo.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2a1d-zzd3sQuzERtauuZFgvSyUV92rDs\"",
		"mtime": "2026-08-22T12:48:46.171Z",
		"size": 10781,
		"path": "../public/assets/cars.index-Boso_rIo.js"
	},
	"/assets/admin.cars-GLymHOB1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d236-jcOKxIa7UIDf04F5YvL/LGxe67E\"",
		"mtime": "2026-08-22T12:48:46.171Z",
		"size": 53814,
		"path": "../public/assets/admin.cars-GLymHOB1.js"
	},
	"/assets/admin.index-DnwR2w0Z.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6884-RnFECGt7dTH1H+hoY9NK2l0JdOM\"",
		"mtime": "2026-08-22T12:48:46.171Z",
		"size": 26756,
		"path": "../public/assets/admin.index-DnwR2w0Z.js"
	},
	"/assets/circle-check-B9c6-F7A.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"aa-vIMCC4lU6wWzpnYMGqbGXQHiITg\"",
		"mtime": "2026-08-22T12:48:46.171Z",
		"size": 170,
		"path": "../public/assets/circle-check-B9c6-F7A.js"
	},
	"/assets/admin.settings-CQ0U89J4.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"805d-zTCK7jc24oOlWlVoQw3tMSGyXWQ\"",
		"mtime": "2026-08-22T12:48:46.171Z",
		"size": 32861,
		"path": "../public/assets/admin.settings-CQ0U89J4.js"
	},
	"/assets/arrow-left-2q7XgNHq.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9d-B10svzlmAJNDVfhfr0GyRISJ54c\"",
		"mtime": "2026-08-22T12:48:46.171Z",
		"size": 157,
		"path": "../public/assets/arrow-left-2q7XgNHq.js"
	},
	"/assets/calendar-BQG3hTr3.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f9-PyI3L3gsfBLySWw5Vl8ukd8+G/w\"",
		"mtime": "2026-08-22T12:48:46.171Z",
		"size": 249,
		"path": "../public/assets/calendar-BQG3hTr3.js"
	},
	"/assets/admin.orders-BjXc08r2.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6dee-x2goVlLhyxHOo76cJWxjdhP3AOM\"",
		"mtime": "2026-08-22T12:48:46.171Z",
		"size": 28142,
		"path": "../public/assets/admin.orders-BjXc08r2.js"
	},
	"/assets/contact-BzQMLyoD.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"197e-PNJ8OgRoFnOv4axCazOzRvXJa6A\"",
		"mtime": "2026-08-22T12:48:46.171Z",
		"size": 6526,
		"path": "../public/assets/contact-BzQMLyoD.js"
	},
	"/assets/dynamicAttributes-CVqh8oW0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1033-3NZgOvfG7Y7PJPy5u1DWvvbBdwQ\"",
		"mtime": "2026-08-22T12:48:46.171Z",
		"size": 4147,
		"path": "../public/assets/dynamicAttributes-CVqh8oW0.js"
	},
	"/assets/eye-DohxHL4K.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f8-Uqa6VU4zXwW9IOmV69r77Udn9eg\"",
		"mtime": "2026-08-22T12:48:46.172Z",
		"size": 248,
		"path": "../public/assets/eye-DohxHL4K.js"
	},
	"/assets/file-text-V0j7tDUs.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"179-2sznAtYkpkb/RndV8LONpEI63G0\"",
		"mtime": "2026-08-22T12:48:46.172Z",
		"size": 377,
		"path": "../public/assets/file-text-V0j7tDUs.js"
	},
	"/assets/fuel-Cciv3rBC.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"138-DC4GFAFVptZ5nf/QarOlU1Ted9g\"",
		"mtime": "2026-08-22T12:48:46.172Z",
		"size": 312,
		"path": "../public/assets/fuel-Cciv3rBC.js"
	},
	"/assets/chevron-right-93zwxaQH.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7a-LajJPItBwlCVNzEt4rL1UHdHxzE\"",
		"mtime": "2026-08-22T12:48:46.171Z",
		"size": 122,
		"path": "../public/assets/chevron-right-93zwxaQH.js"
	},
	"/assets/cars._id-B2hJ3L01.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"631f-QYm8xgTbiiH2GGfR/+UypZa/SmU\"",
		"mtime": "2026-08-22T12:48:46.171Z",
		"size": 25375,
		"path": "../public/assets/cars._id-B2hJ3L01.js"
	},
	"/assets/analytics-nymCLZi2.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"62e-06ytuEnlStIKzLz6AXbgRBaPWdg\"",
		"mtime": "2026-08-22T12:48:46.171Z",
		"size": 1582,
		"path": "../public/assets/analytics-nymCLZi2.js"
	},
	"/assets/compare-CtmKPAE7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"118c-ZwhKH/wcl7jUx82cL95P7CgCC18\"",
		"mtime": "2026-08-22T12:48:46.171Z",
		"size": 4492,
		"path": "../public/assets/compare-CtmKPAE7.js"
	},
	"/assets/gauge-CT9AG2ci.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a8-FAf0Fkuh/MKWanPEOD5rbiiHbaQ\"",
		"mtime": "2026-08-22T12:48:46.172Z",
		"size": 168,
		"path": "../public/assets/gauge-CT9AG2ci.js"
	},
	"/assets/layers-CX0MRNiX.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"19d-xcHvkhlX9UTlIaD7/TLA83EImyQ\"",
		"mtime": "2026-08-22T12:48:46.172Z",
		"size": 413,
		"path": "../public/assets/layers-CX0MRNiX.js"
	},
	"/assets/map-pin-o-kYSB36.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"19b-QfX/gGT5MQUfUCeet0+jNbwuVHc\"",
		"mtime": "2026-08-22T12:48:46.172Z",
		"size": 411,
		"path": "../public/assets/map-pin-o-kYSB36.js"
	},
	"/assets/message-circle-UYkOmfm0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e9-+oalyeyne9glxR/+xyLRVOdcNxw\"",
		"mtime": "2026-08-22T12:48:46.172Z",
		"size": 233,
		"path": "../public/assets/message-circle-UYkOmfm0.js"
	},
	"/assets/phone-BW8xO1oc.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"13a-DVP548ezMHGhEg6nP+Ptq9bQHY4\"",
		"mtime": "2026-08-22T12:48:46.172Z",
		"size": 314,
		"path": "../public/assets/phone-BW8xO1oc.js"
	},
	"/assets/routes-DsJzi0jQ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3610-BboR9+7Lsg5B8bzfigvMIUaA8cs\"",
		"mtime": "2026-08-22T12:48:46.172Z",
		"size": 13840,
		"path": "../public/assets/routes-DsJzi0jQ.js"
	},
	"/assets/search-JSNemMc0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a6-Q1lEcmTyra6e7zXWC9lfmJDk2/k\"",
		"mtime": "2026-08-22T12:48:46.172Z",
		"size": 166,
		"path": "../public/assets/search-JSNemMc0.js"
	},
	"/assets/settings-u8Bwl9MN.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a6d-OaMNP4x0dqiORGBRUw0tgyrfdzo\"",
		"mtime": "2026-08-22T12:48:46.172Z",
		"size": 2669,
		"path": "../public/assets/settings-u8Bwl9MN.js"
	},
	"/assets/shield-check-D6EDU7ey.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"138-grHaLBIYdLBlJE4GHdcfoVvM+tk\"",
		"mtime": "2026-08-22T12:48:46.172Z",
		"size": 312,
		"path": "../public/assets/shield-check-D6EDU7ey.js"
	},
	"/assets/shield-xzzXvhP1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"108-dL526Yjv+aJ0S+7tIfUnuDwNf68\"",
		"mtime": "2026-08-22T12:48:46.172Z",
		"size": 264,
		"path": "../public/assets/shield-xzzXvhP1.js"
	},
	"/assets/sparkles-D6F5Ss3Z.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1e6-A4reAfnG+0pPD3eEWr4Lny2oSuk\"",
		"mtime": "2026-08-22T12:48:46.172Z",
		"size": 486,
		"path": "../public/assets/sparkles-D6F5Ss3Z.js"
	},
	"/assets/styles-73Ixxs70.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"1d327-inrpBwL9q0AUalXlKt/HI7W6CTY\"",
		"mtime": "2026-08-22T12:48:46.172Z",
		"size": 119591,
		"path": "../public/assets/styles-73Ixxs70.css"
	},
	"/assets/wishlist-_Wak0ipn.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"885-SNyi5UcgC0KAbnVS0dY6jOWVbRQ\"",
		"mtime": "2026-08-22T12:48:46.172Z",
		"size": 2181,
		"path": "../public/assets/wishlist-_Wak0ipn.js"
	},
	"/assets/wrench-CIMZ_OdJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"127-kxz7N+y/Grc29PC2ojwRlLKnoMs\"",
		"mtime": "2026-08-22T12:48:46.172Z",
		"size": 295,
		"path": "../public/assets/wrench-CIMZ_OdJ.js"
	},
	"/assets/x-Dnx8_81W.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"92-ZCt7xQeX8mTy30z0r01giLey7rE\"",
		"mtime": "2026-08-22T12:48:46.172Z",
		"size": 146,
		"path": "../public/assets/x-Dnx8_81W.js"
	},
	"/assets/index-RYgnktEJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"bd4cb-23YMt0EXNZj6OOyXPSb0xj4jE8k\"",
		"mtime": "2026-08-22T12:48:46.170Z",
		"size": 775371,
		"path": "../public/assets/index-RYgnktEJ.js"
	}
};
//#endregion
//#region #nitro/virtual/public-assets-node
function readAsset(id) {
	const serverDir = dirname(fileURLToPath(globalThis.__nitro_main__));
	return promises.readFile(resolve(serverDir, public_assets_data_default[id].path));
}
//#endregion
//#region #nitro/virtual/public-assets
var publicAssetBases = {};
function isPublicAssetURL(id = "") {
	if (public_assets_data_default[id]) return true;
	for (const base in publicAssetBases) if (id.startsWith(base)) return true;
	return false;
}
function getAsset(id) {
	return public_assets_data_default[id];
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/static.mjs
var METHODS = new Set(["HEAD", "GET"]);
var EncodingMap = {
	gzip: ".gz",
	br: ".br",
	zstd: ".zst"
};
var static_default = defineHandler((event) => {
	if (event.req.method && !METHODS.has(event.req.method)) return;
	let id = decodePath(withLeadingSlash(withoutTrailingSlash(event.url.pathname)));
	let asset;
	const encodings = [...(event.req.headers.get("accept-encoding") || "").split(",").map((e) => EncodingMap[e.trim()]).filter(Boolean).sort(), ""];
	for (const encoding of encodings) for (const _id of [id + encoding, joinURL(id, "index.html" + encoding)]) {
		const _asset = getAsset(_id);
		if (_asset) {
			asset = _asset;
			id = _id;
			break;
		}
	}
	if (!asset) {
		if (isPublicAssetURL(id)) {
			event.res.headers.delete("Cache-Control");
			throw new HTTPError({ status: 404 });
		}
		return;
	}
	if (encodings.length > 1) event.res.headers.append("Vary", "Accept-Encoding");
	if (event.req.headers.get("if-none-match") === asset.etag) {
		event.res.status = 304;
		event.res.statusText = "Not Modified";
		return "";
	}
	const ifModifiedSinceH = event.req.headers.get("if-modified-since");
	const mtimeDate = new Date(asset.mtime);
	if (ifModifiedSinceH && asset.mtime && new Date(ifModifiedSinceH) >= mtimeDate) {
		event.res.status = 304;
		event.res.statusText = "Not Modified";
		return "";
	}
	if (asset.type) event.res.headers.set("Content-Type", asset.type);
	if (asset.etag && !event.res.headers.has("ETag")) event.res.headers.set("ETag", asset.etag);
	if (asset.mtime && !event.res.headers.has("Last-Modified")) event.res.headers.set("Last-Modified", mtimeDate.toUTCString());
	if (asset.encoding && !event.res.headers.has("Content-Encoding")) event.res.headers.set("Content-Encoding", asset.encoding);
	if (asset.size > 0 && !event.res.headers.has("Content-Length")) event.res.headers.set("Content-Length", asset.size.toString());
	return readAsset(id);
});
//#endregion
//#region #nitro/virtual/routing
var findRouteRules = /* @__PURE__ */ (() => {
	const $0 = [{
		name: "headers",
		route: "/assets/**",
		handler: headers,
		options: { "cache-control": "public, max-age=31536000, immutable" }
	}];
	return (m, p) => {
		let r = [];
		if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1) || "/";
		let s = p.split("/");
		if (s.length > 1) {
			if (s[1] === "assets") r.unshift({
				data: $0,
				params: { "_": s.slice(2).join("/") }
			});
		}
		return r;
	};
})();
var _lazy_0jRgqU = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
var findRoute = /* @__PURE__ */ (() => {
	const data = {
		route: "/**",
		handler: _lazy_0jRgqU
	};
	return ((_m, p) => {
		return {
			data,
			params: { "_": p.slice(1) }
		};
	});
})();
var globalMiddleware = [toEventHandler(static_default)].filter(Boolean);
//#endregion
//#region node_modules/nitro/dist/runtime/internal/error/prod.mjs
var errorHandler = (error, event) => {
	const res = defaultHandler(error, event);
	return new NodeResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
function defaultHandler(error, event) {
	const unhandled = error.unhandled ?? !HTTPError.isError(error);
	const { status = 500, statusText = "" } = unhandled ? {} : error;
	if (status === 404) {
		const url = event.url || new URL(event.req.url);
		const baseURL = "/";
		if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) return {
			status: 302,
			headers: new Headers({ location: `${baseURL}${url.pathname.slice(1)}${url.search}` })
		};
	}
	const headers = new Headers(unhandled ? {} : error.headers);
	headers.set("content-type", "application/json; charset=utf-8");
	return {
		status,
		statusText,
		headers,
		body: {
			error: true,
			...unhandled ? {
				status,
				unhandled: true
			} : typeof error.toJSON === "function" ? error.toJSON() : {
				status,
				statusText,
				message: error.message
			}
		}
	};
}
//#endregion
//#region #nitro/virtual/error-handler
var errorHandlers = [errorHandler];
async function error_handler_default(error, event) {
	for (const handler of errorHandlers) try {
		const response = await handler(error, event, { defaultHandler });
		if (response) return response;
	} catch (error) {
		console.error(error);
	}
}
//#endregion
//#region #nitro/virtual/app
function createNitroApp() {
	const captureError = (error, errorCtx) => {
		if (errorCtx?.event) {
			const errors = errorCtx.event.req.context?.nitro?.errors;
			if (errors) errors.push({
				error,
				context: errorCtx
			});
		}
	};
	const h3App = createH3App({ onError(error, event) {
		return error_handler_default(error, event);
	} });
	let appHandler = (req) => {
		req.context ||= {};
		req.context.nitro = req.context.nitro || { errors: [] };
		return h3App.fetch(req);
	};
	return {
		fetch: appHandler,
		h3: h3App,
		hooks: void 0,
		captureError
	};
}
function createH3App(config) {
	const h3App = new H3Core(config);
	h3App["~findRoute"] = (event) => findRoute(event.req.method, event.url.pathname);
	h3App["~middleware"].push(...globalMiddleware);
	h3App["~getMiddleware"] = (event, route) => {
		const pathname = event.url.pathname;
		const method = event.req.method;
		const middleware = [];
		const routeRules = getRouteRules(method, pathname);
		event.context.routeRules = routeRules?.routeRules;
		if (routeRules?.routeRuleMiddleware.length) middleware.push(...routeRules.routeRuleMiddleware);
		middleware.push(...h3App["~middleware"]);
		if (route?.data?.middleware?.length) middleware.push(...route.data.middleware);
		return middleware;
	};
	return h3App;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/app.mjs
var APP_ID = "default";
function useNitroApp() {
	let instance = useNitroApp._instance;
	if (instance) return instance;
	instance = useNitroApp._instance = createNitroApp();
	globalThis.__nitro__ = globalThis.__nitro__ || {};
	globalThis.__nitro__[APP_ID] = instance;
	return instance;
}
function getRouteRules(method, pathname) {
	const m = findRouteRules(method, pathname);
	if (!m?.length) return { routeRuleMiddleware: [] };
	const routeRules = {};
	for (const layer of m) for (const rule of layer.data) {
		const currentRule = routeRules[rule.name];
		if (currentRule) {
			if (rule.options === false) {
				delete routeRules[rule.name];
				continue;
			}
			if (typeof currentRule.options === "object" && typeof rule.options === "object") currentRule.options = {
				...currentRule.options,
				...rule.options
			};
			else currentRule.options = rule.options;
			currentRule.route = rule.route;
			currentRule.params = {
				...currentRule.params,
				...layer.params
			};
		} else if (rule.options !== false) routeRules[rule.name] = {
			...rule,
			params: layer.params
		};
	}
	const middleware = [];
	const orderedRules = Object.values(routeRules).sort((a, b) => (a.handler?.order || 0) - (b.handler?.order || 0));
	for (const rule of orderedRules) {
		if (rule.options === false || !rule.handler) continue;
		middleware.push(rule.handler(rule));
	}
	return {
		routeRules,
		routeRuleMiddleware: middleware
	};
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/error/hooks.mjs
function _captureError(error, type) {
	console.error(`[${type}]`, error);
	useNitroApp().captureError?.(error, { tags: [type] });
}
function trapUnhandledErrors() {
	process.on("unhandledRejection", (error) => _captureError(error, "unhandledRejection"));
	process.on("uncaughtException", (error) => _captureError(error, "uncaughtException"));
}
//#endregion
//#region #nitro/virtual/tracing
var tracingSrvxPlugins = [];
//#endregion
//#region node_modules/nitro/dist/presets/node/runtime/node-server.mjs
var _parsedPort = Number.parseInt(process.env.NITRO_PORT ?? process.env.PORT ?? "");
var port = Number.isNaN(_parsedPort) ? 3e3 : _parsedPort;
var host = process.env.NITRO_HOST || process.env.HOST;
var cert = process.env.NITRO_SSL_CERT;
var key = process.env.NITRO_SSL_KEY;
var nitroApp = useNitroApp();
serve({
	port,
	hostname: host,
	tls: cert && key ? {
		cert,
		key
	} : void 0,
	fetch: nitroApp.fetch,
	plugins: [...tracingSrvxPlugins]
});
trapUnhandledErrors();
var node_server_default = {};
//#endregion
export { node_server_default as default };
