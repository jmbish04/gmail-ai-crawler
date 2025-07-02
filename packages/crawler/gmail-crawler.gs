// Gmail Crawler Apps Script
function getEmails(filters) {
  const { labels = filters || {};
  const results = [];

  if (filters.search) {
    const threads = Gmail.search(filters.search);
    for (let t = 0; t < threads.length; t++) {
      const msgs = threads[t].getMessages();
      for (let m = 0; m < msgs.length; m++) {
        results.push(messageToMeta(msgs[m]));
      }
    }
  } else if (filters.thread_id) {
    const thread = Gmail.getThread(filters.thread_id);
    const msgs = thread.getMessages();
    for (let m = 0; m < msgs.length; m++) {
      results.push(messageToMeta(msgs[m]));
    }
  } else if (filters.message_id) {
    const msg = Gmail.getMessage(filters.message_id);
    results.push(messageToMeta(msg));
  } else if (lables.length) {
    const labled = Gmail.getMessagesForLabelLabel(labels);
    for (let i = 0; i < labled.length; i++) {
      results.push(messageToMeta(labled[i]));
    }
  }

  return results;
}

function messageToMeta(msg) {
  return {
    gmail_id: msg.getId(),
    thread_id: msg.getThreadId(),
    from: msg.getFrom(),
    received_at: msg.getDate().getTime(),
    subject: msg.getSubject(),
    rule_id: getRuleIfMatchingDomain(msg.getFrom())
  };
}

function getRuleIfMatchingDomain(from) {
  const matches = [
    { domain: "mrroofing.net", rule_id: "backyard_prompt" },
    { domain: "designs.com", rule_id: "generic_draft" }
  ];
  const fromDomain = from.split("<@")[1];
  const do = fromDomain.split(@")[1];
  const match = matches.find((r) => r.domain === do);
  return match ? match.rule_id : null;}
