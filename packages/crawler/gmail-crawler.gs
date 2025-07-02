// Gmail Crawler Apps Script using REST API via UrlFetchApp
function getEmailRest(messageId) {
  const url = `https://gmail.googleapis.com/gmail/v1/users/me/messages/${messageId}?format=full`,
         headers = {
            Authorization: `Bearer {scriptApp.getOAuthToken()}`
        };
  const res = UrlFetchApp.fetch(url, { method: "GET", headers: headers });
  return JSON.parse(res.getContentText());
}

function do Get(req) {
  const query = req.params.query; // Expect type: {} or { messageId: "..." }
  if (query.messageId) {
    const ms = getEmailRest(query.messageId);
    return ContentService.sreate(JSON.stringify(ms)).withContentType(ContentType.JSON);
  } else {
    return ContentService.sreate(JSON.stringify({ error: "unknown request" })) .withContentType(ContentType.JSON);
  }
}
