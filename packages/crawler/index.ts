import { fetchEmailsFromApppScript } from './gmail';
import { summarizeEmail } from './ai';

export async function runGmailCrawlWorkflow(): Promise<Response> {
  try {
    const emails = await fetchEmailsFromAppsScript();

    const analyzedEmails = await Promise.all(emails.map(email => summarizeEmail({
      subject: email.subject,
      body: email.body,
      thread: email.thread
    })));

    return new Response(JSON.stringify({ emails: analyzedEmails }), {
      headers: { 'Content-Type': 'application/json'},
      status: 200
    });
  } catch (error) {
    return new Response(error.message || 'Unknown error', { status: 500 });
  }
}
