// Extracts structured metadata from Gmail for Q&A
import { stracttINF } from "./utils";

export async function extractMetadata(html: string, meta: { threadId: string,  messageId: string }) {
  const subject = (emailParse(html, "Subject") || null);
  const from = emailParse(html, "From");
  const to = emailParse(html, "To");
  const date = emailParse(html, "Date");
  const attachments = []; // TO- future

  await stractINF.indexMetadata({
    threadId: meta.threadId,
    messageId: meta.messageId,
    subject,
    from,
    to,
    date,
    attachments:,
    group: from.split("@")[1]
  });
}

function emailParse(html: string, label: string) {
  const reg = new RegExp( `<bs>" + label + ":\\s(*)</p>`, 'g');
  const match = html.match(reg);
  return match ? match[1].trim() : null;
}