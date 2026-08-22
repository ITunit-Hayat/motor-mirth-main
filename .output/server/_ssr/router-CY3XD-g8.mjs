import { t as QueryClientProvider } from "../_libs/react+tanstack__react-query.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { t as LanguageProvider } from "./LanguageContext-C6BSyEfd.mjs";
import { t as ThemeProvider } from "./ThemeContext-A4-ueCni.mjs";
import { _ as createFileRoute, d as HeadContent, g as lazyRouteComponent, h as Outlet, m as createRouter, u as Scripts, v as createRootRouteWithContext } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as DealershipProvider } from "./DealershipContext-CZIneh0B.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
import { t as Route$10 } from "./cars._id-VjVHDrp_.mjs";
import { t as Route$11 } from "./cars.index-DVu-PzuB.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-CY3XD-g8.js
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var styles_default = "/assets/styles-BaFwU2-c.css";
var _jsxFileName = "/app/applet/src/routes/__root.tsx";
var Route$9 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1, viewport-fit=cover"
			},
			{
				name: "theme-color",
				content: "#0b1220"
			},
			{ title: "VelocityMotors — Premium Automotive Marketplace" },
			{
				name: "description",
				content: "Discover, finance and own premium vehicles. Transparent pricing, certified inventory, lifetime support."
			},
			{
				property: "og:title",
				content: "VelocityMotors — Premium Cars Marketplace"
			},
			{
				property: "og:description",
				content: "Premium cars marketplace — browse, finance, own."
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "icon",
				href: "/favicon.ico",
				type: "image/x-icon"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: ""
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&family=Cairo:wght@400;500;600;700;800&family=Tajawal:wght@400;500;700&display=swap"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("html", {
		lang: "en",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("head", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(HeadContent, {}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 40,
			columnNumber: 13
		}, this) }, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 40,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Scripts, {}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 41,
			columnNumber: 23
		}, this)] }, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 41,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 39,
		columnNumber: 5
	}, this);
}
function RootComponent() {
	const { queryClient } = Route$9.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ThemeProvider, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LanguageProvider, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DealershipProvider, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Outlet, {}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 53,
			columnNumber: 13
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Toaster, {
			richColors: true,
			position: "top-right"
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 54,
			columnNumber: 13
		}, this)] }, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 52,
			columnNumber: 11
		}, this) }, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 51,
			columnNumber: 9
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 50,
		columnNumber: 7
	}, this) }, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 49,
		columnNumber: 5
	}, this);
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "min-h-screen grid place-items-center bg-background text-foreground",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "text-center p-8",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "text-7xl font-bold text-accent",
				children: "404"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 66,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
				className: "mt-2 text-muted-foreground",
				children: "Page not found."
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 67,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 65,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 64,
		columnNumber: 5
	}, this);
}
function ErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "min-h-screen grid place-items-center bg-background text-foreground p-6",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "max-w-md text-center",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "text-3xl font-bold text-destructive",
				children: "Something went wrong"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 77,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
				className: "mt-2 text-muted-foreground text-sm",
				children: error.message
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 78,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 76,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 75,
		columnNumber: 5
	}, this);
}
var $$splitComponentImporter$8 = () => import("./routes-C8-XVll_.mjs");
var Route$8 = createFileRoute("/")({
	component: lazyRouteComponent($$splitComponentImporter$8, "component"),
	head: () => ({ meta: [{ title: "VelocityMotors — Discover your next premium car" }, {
		name: "description",
		content: "Browse certified luxury, sports and SUV vehicles. Transparent pricing, flexible financing, lifetime support."
	}] })
});
var $$splitComponentImporter$7 = () => import("./about-LdLyTTNo.mjs");
var Route$7 = createFileRoute("/about")({
	head: () => ({ meta: [{ title: "About — VelocityMotors" }] }),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./compare-DL3d8Auc.mjs");
var Route$6 = createFileRoute("/compare")({
	head: () => ({ meta: [{ title: "Compare vehicles — VelocityMotors" }] }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./contact-BFwq_yv7.mjs");
var Route$5 = createFileRoute("/contact")({
	head: () => ({ meta: [{ title: "Contact — VelocityMotors" }] }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./wishlist-CUeDS5Ux.mjs");
var Route$4 = createFileRoute("/wishlist")({
	head: () => ({ meta: [{ title: "Wishlist — VelocityMotors" }] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./admin.index-wrMKrUfU.mjs");
var Route$3 = createFileRoute("/admin/")({
	head: () => ({ meta: [{ title: "مركز القيادة — لوحة التحكم الإدارية" }] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./admin.cars-BM24pjip.mjs");
var Route$2 = createFileRoute("/admin/cars")({
	head: () => ({ meta: [{ title: "وحدة التحكم في المخزون — لوحة الإدارة" }, {
		name: "description",
		content: "إدارة متقدمة لجدول سيارات المعرض وحالات الظهور."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
/**
* Tabbed Advanced Modal Component
*/
var $$splitComponentImporter$1 = () => import("./admin.orders-0IjtrrWi.mjs");
var Route$1 = createFileRoute("/admin/orders")({
	head: () => ({ meta: [{ title: "وحدة معالجة الطلبات — لوحة الإدارة" }, {
		name: "description",
		content: "صندوق الوارد الموحد وإدارة طلبات وتواصل العملاء."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./admin.settings-IO_SVqje.mjs");
var Route = createFileRoute("/admin/settings")({
	head: () => ({ meta: [{ title: "إدارة الثوابت والصلاحيات — لوحة الإدارة" }, {
		name: "description",
		content: "تخصيص الماركات، الموديلات، الصلاحيات، وإعدادات المعرض."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var IndexRoute = Route$8.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$9
});
var AboutRoute = Route$7.update({
	id: "/about",
	path: "/about",
	getParentRoute: () => Route$9
});
var CompareRoute = Route$6.update({
	id: "/compare",
	path: "/compare",
	getParentRoute: () => Route$9
});
var ContactRoute = Route$5.update({
	id: "/contact",
	path: "/contact",
	getParentRoute: () => Route$9
});
var WishlistRoute = Route$4.update({
	id: "/wishlist",
	path: "/wishlist",
	getParentRoute: () => Route$9
});
var AdminIndexRoute = Route$3.update({
	id: "/admin/",
	path: "/admin/",
	getParentRoute: () => Route$9
});
var AdminCarsRoute = Route$2.update({
	id: "/admin/cars",
	path: "/admin/cars",
	getParentRoute: () => Route$9
});
var AdminOrdersRoute = Route$1.update({
	id: "/admin/orders",
	path: "/admin/orders",
	getParentRoute: () => Route$9
});
var AdminSettingsRoute = Route.update({
	id: "/admin/settings",
	path: "/admin/settings",
	getParentRoute: () => Route$9
});
var CarsIndexRoute = Route$11.update({
	id: "/cars/",
	path: "/cars/",
	getParentRoute: () => Route$9
});
var rootRouteChildren = {
	IndexRoute,
	AboutRoute,
	CompareRoute,
	ContactRoute,
	WishlistRoute,
	AdminCarsRoute,
	AdminOrdersRoute,
	AdminSettingsRoute,
	CarsIdRoute: Route$10.update({
		id: "/cars/$id",
		path: "/cars/$id",
		getParentRoute: () => Route$9
	}),
	AdminIndexRoute,
	CarsIndexRoute
};
var routeTree = Route$9._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	return createRouter({
		routeTree,
		context: { queryClient: new QueryClient() },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
