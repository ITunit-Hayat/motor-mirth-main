import { _ as createFileRoute, g as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/cars.index-DVu-PzuB.js
var $$splitComponentImporter = () => import("./cars.index-CZG5Lz12.mjs");
var Route = createFileRoute("/cars/")({
	validateSearch: (raw) => {
		const s = raw;
		return {
			q: typeof s.q === "string" ? s.q : void 0,
			category: typeof s.category === "string" ? s.category : void 0
		};
	},
	head: () => ({ meta: [{ title: "Browse Inventory — VelocityMotors" }, {
		name: "description",
		content: "Search and filter our premium inventory."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
