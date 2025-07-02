import { runGmailReplyDraftWorkflow } from '../workflows/gmailReplyDraftWorkflow';

export async function handleGmailWork({
  query,
  scriptUrl,
  prompt,
  modelFn
}: {
  query: string,
  scriptUrl: string,
  prompt: string,
  modelFn: (input: string) => Promise<string>
}) {
  return runGmailReplyDraftWorkflow({
    query,
    scriptUrl,
    replyPrompt: prompt,
    aiGenerateReply: modelFn
  });
}