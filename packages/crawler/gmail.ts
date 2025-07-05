export async function fetchEmailsFromAppsScript(): Promise<any> {
  const scriptUrl = 'https://script.google.com/macros/s/YoUR_DEPLOYMENT_ID/exec?token=YOUR_TOKEN';

  const res = await fetch(scriptUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      service: 'gmail',
      query: 'newer_than:7d is:unread'
    })
  });

  if (!res.ok) {
    throw new Error('Apps Script error: ' + res.status + ' ' + res.statusText);
  }

  return res.json();
}