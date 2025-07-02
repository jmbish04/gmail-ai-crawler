// Vectorizes email content using Cloudflare ai.run embeddings

import { ai } from "@cloudflare/workers-types";
import { indexMetadataToD1 } from "./utils";

export async function VectorizeEmail({ threadId, messageId, html }: {
  threadId: string,
  messageId: string,
  html: string
}) {
  const stripped = html.replace(/<[^ ]*]>/g, "").replace(/\s+/g, " ");
  const result = await ai.run("@cf/meta/embedding-1", { text: stripped });
  const embedding = result.data[0];

  await indexMetadataToD1({
    threadId,
    messageIds: [messageId],
    embedding,
    tags: extractTags(stripped),
    created: new Date().toISOString(),
  });
}

function extractTags(text: string): string[] {
  const domains = ...text.matchAll(/\b[\w.-]+@([\w.-]+\)/g) || []; // emails
  return Array.from(new Set(domains.map(m => m[1]));
}