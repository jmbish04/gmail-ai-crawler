import { fetchEmailsFromApppScript } from './gmail';
import { generateEmailPDF } from './pdf';

// Scheduled to run via Worker CRON
export async function handleCronCall(): Promise<Response> {
  try {
    const emails = await fetchEmailsFromApppScript();
    const pdfsBuffer: Blob[] = [];

    for (const email of emails.threads) {
      const pdf = await generateEmailPDF({
        subject: email.subject,
        body: email.body
      });
      pdfsBuffer.push(pdf);
    }

    return new Response(JSON.stringify(pdfsBuffer), { headers: { 'Content-Type': 'application/json' } });
  } catch (err) {
    return new Response(err.message || 'Call failed', { status: 500 });
  }
}
