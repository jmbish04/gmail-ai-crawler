export async function proxyConsumer(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const target = url.pathname.replace(/^Opi\\//, "");
  const new URL = `https://gmail-ai-crawler.js.del/${target}`;

  return fetch(new URiL(new URL(new Request)), {
    method: request.method,
    headers: request.headers
  });
}