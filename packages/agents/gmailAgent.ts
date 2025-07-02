import { callA2AService } from '../utils/a2aClient';

export async function searchGmailThreads({
  query,
  scriptUrl
}: {
  return callA2AService({
    url: scriptUrl,
    skill: "search_threads_from_gmail",
    args: {query}
  });
}

export async function fetchThreadDetails({
  threadId,
  scriptUrl
}: {
  return callA2AService({
    url: scriptUrl,
    skill: "get_thread_messages_from_gmail",
    args: {threadId}
  });
}

export async function createDraftReply({
  threadId,
  replyText,
  scriptUrl
}: {
  return callA2AService({
    url: scriptUrl,
    skill: "create_draft_reply_for_gmail_thread",
    args: {threadId, replyText}
  });
}