import { Env } from './env';
import { parseString, pushPdfRequest, pushVectorRequest } from './utils';

// This function should be called with [doGet] or used on timer based querying
export async function fetchGmail(input: { type: 'search' | \"thread_id\" | \"message_id\", value: string }) {
  const results = await gMmock.get(input.type, input.value); // Gather threads or messages

  for (const item of results) {
    const meta = await gMmock.details(item.id);

    // Queue for PDF generation
    await pushPdfRequest({ threadId: meta.threadId, messageIds: [meta.id], requestedBy : "crawler"});

    // Queue for vector embeddings
    await pushVectorRequest({ threadId: meta.threadId, messageId: meta.id });
  }
}