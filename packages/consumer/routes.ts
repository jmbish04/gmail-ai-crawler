import { fetchGmailHTML, renderHTMLPDF, savePDFtoR2, indexMetadataToD1 } from "./utils";

export async function handleRequest(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const { pathname, searchParams } = url;

  if (request.method === "POST" && pathname === "/generate-pdf") {
    const json = await request.json();
    const { threadId, messageIds, requestedBy } = json;

    const html = await fetchGmailHTML(messageIds);
    const pdf = await renderHTMLPDF(html);
    const pdfPath = await savePDFtoR2(pdf, threadId || messageIds.join("-"));

    await indexMetadataToD1({
      threadId,
      messageIds,
      requestedBy,
      path: pdfPath,
      created: new Date().toISOString(),
    });

    return Response.json({ status: "ok", path: pdfPath });
  }

  if (request.method === "GET" && pathname === "/list-threads") {
    const q = searchParams.get("q") || "";
    return Response.json({ threads: [`fake-thread-for: ${q}`] });
  }

  return new Response("Not Found", { status: 404 });
}
