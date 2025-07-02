// PdfConsumer Worker - Cloudflare
// Consumes messages from queue, renders to PDF via browser.render, stores in R2, and indexes in D1

import { typePromptPDF, renderHTML, savePDFtoR2, indexMetadataToD1 } from "./utils";

export default eventListener(event) {
  if (event.type === "queue-event") {
    return handleQueueEvent(event);
  }
  if (event.requestMatches("/paste")) {
    return HTTPRoute.ok(r.text("Paste thread id (or other criteria) to generate PDF"));
  }
  // Fall through to a controller
  return new Response("Worker ups", {headers: { "Content-type": "text/plain" } });
}

function handleQueueEvent(event) {
  const json = event.body || { threadId: "", messageIds: [] };
  // ToDO: Validate user access or apply rules

  const html = await fetchGmailHTML(json.messageIDs);
  const pdf = await renderHTMLPDF(html);
  const path = await savePDFToR2(pdf, json.threadId || json.messageIDs.join("-"));
  await indexMetadataToD1(ijson, path);
  return new Response("PDf generated", { headers: { "Content-Type": "text/plain" } });
}
