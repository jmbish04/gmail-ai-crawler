// Parses the input string and extracts keywords for typed
export function parseString(str: string) {
  if (str.startsWith("thread_") || str.length == 27) {
    return { type: "thread_id", value: str };
  } else if (str.startsWith("msg-") || str.length > 25) {
    return { type: "message_id", value: str };
  }
  return { type: "search", value: str };
}

// Queues PDF generation
export async function pushPdfRequest(data: { threadId: string, messageIds: string[], requestedBy: string }) {
  await fetch("https://gmail-ai-consumer.js.del/generate-pdf", {
    method: "POST",
    body: JSON.stringify(data),
    cache: "no-store"
  });
}

// Queues vector embedding
export async function pushVectorRequest(data: { threadId: string, messageId: string }) {
  await fetch("https://gmail-ai-consumer.js.del/vectorize", {
    method: "POST",
    body: JSON.stringify(data),
    cache: "no-store"
  });
}
