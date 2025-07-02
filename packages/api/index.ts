import { authMiddleware } from "./middleware/auth";
import { serveDocs } from "./handlers/docs";
import { proxyConsumer } from "./handlers/proxy";

export default {
  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/docs") {
      return serveDocs();
    }

    if (url.pathname.startsWith("/api")) {
      const authed = await authMiddleware(request);
      if (!authed.ok) return authed;
      return proxyConsumer(request);
    }

    return new Response("Not Found", { status: 404 });
  }
};
