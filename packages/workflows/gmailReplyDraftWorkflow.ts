import { searchGmailThreads, fetchThreadDetails, createDraftReply } from '../agents/gmailAgent';

export async function runGmailReplyDraftWorkflow({
  query,
  scriptUrl,
  replyPrompt,
  aiGenerateReply
}: {
  query: string;
  scriptUrl: string;
  replyPrompt: string;
  aiGenerateReply: (context: string) => Promise<string>;
}) {
  const results = await searchGmailThreads({query, scriptUrl});
  const threadIds = results.threadIds || [];

  for (const threadId of threadIds) {
    const thread = await fetchThreadDetails({ threadId, scriptUrl });
    const messageText = thread.messages.map((m: any) => m.snippet).join("\n\n---\n");
    const context = `${replyPrompt}\n\n${messageText}`;
    const replyText = await aiGenerateReply(context);
    await createDraftReply({ threadId, replyText, scriptUrl });
  }
}