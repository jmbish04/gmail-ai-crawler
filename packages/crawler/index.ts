import { fetchEmailsFromApppScript } from './gmail';

export async function runGmailCrawlWorkflow(): Promise<Response> {
  try {
    const emails = await fetchEmailsFromAppsScript();

    return new Response(JSON.stringify({ emails }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200
    });
  } catch (error) {
    return new Response(error.message || 'Unknown error', { status: 500 });
  }
}
