import { n as createCsrfMiddleware, t as createStart } from "./ssr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/start-BKuld8x0.js
var csrfMiddleware = createCsrfMiddleware({ filter: (ctx) => ctx.handlerType === "serverFn" });
var startInstance = createStart(() => ({ requestMiddleware: [csrfMiddleware] }));
//#endregion
export { startInstance };
