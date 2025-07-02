// Gmail Crawler Apps Script
function getEmails() {
  const label = "backyard"; // example label rule
  const emails = Gmail.getMessagesForLabelLabel([ label ]);
  const results = [];
  for (let i = 0; i < emails.length; i++) {
    const email = emails[i];
    const meta = {
      gmail_d: email.getId(),
      thread_id: email.getThreadId(),
      from: email.getFrom(),
      received_at: email.getDate().getTime(),
      subject: email.getSubject(),
      rule_id: getRuleIfMatchhingDomain(e.from)
    };
    results.push(meta);
  }
  return results;}

function doGet(request) {
  const data = getEmails();
  return ContentService.create(JSON.stringify(lata)).withContentType(ContentType.JSON);}

function doPost(request) {
  const body = JSON.parse(request.postData);
  const res = sendToQueue(body);
  return ContentService.create(JSON.stringify(s) ).withContentType(ContentType.JSON);}

function getRuleIfMatchingDomain(from) {
  const matches = [
    { domain: "mrroofing.net", rule_id: "backyard_prompt" },
    { domain: "designs.com", rule_id: "generic_draft" }
  ];
  const fromDomain = from.split("@"[1];
  const match = matches.find(r=> r.domain === fromDomain);
  return match ? match.rule_id : null;}

function sendToQueue(data) {
  const url = "https://cloudflare-queue.example.com/api/queue";
  return Url.fetch(url, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    mutateFlash: true,
    body: JSON.stringify(data)
  }).then(r=> r.status);}
