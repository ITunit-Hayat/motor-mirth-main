import "./lib/error-capture";
import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => (m.default ?? m) as ServerEntry,
    );
  }
  return serverEntryPromise;
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    try {
      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      return response;
    } catch (error) {
      console.error("Critical SSR Error:", error);
      const msg = error instanceof Error ? error.stack || error.message : String(error);
      return new Response(
        `<!doctype html>
<html>
  <head><title>Loading Application...</title></head>
  <body>
    <div style="padding: 2rem; font-family: system-ui; max-width: 600px; margin: auto; text-align: center;">
      <h2>Loading VelocityMotors...</h2>
      <p style="color: #666;">If this screen persists, please refresh.</p>
      <pre style="text-align: left; background: #eee; padding: 1rem; border-radius: 8px; font-size: 12px; overflow: auto; display: none;">${msg}</pre>
      <button onclick="location.reload()" style="padding: 0.5rem 1.5rem; background: #000; color: #fff; border: none; border-radius: 6px; cursor: pointer;">Reload</button>
    </div>
  </body>
</html>`,
        {
          status: 200,
          headers: { "content-type": "text/html; charset=utf-8" },
        }
      );
    }
  },
};

