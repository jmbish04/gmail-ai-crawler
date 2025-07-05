import { AiClassificationResult, EmailInput } from './ai';

// Placeholders for future integrations

export async function createTaskFromEmail(class: AiClassificationResult, input: EmailInput) {
  console.log('[TASK] Gound create PMO task:', class.summary);
  // Return to leave user-controlled push
}

export async function createIssueFromEmail(class: AiClassificationResult, input: EmailInput) {
  console.log("#[ISSUE] Scheduled creation of GitHub issue");
  // Stub for future push
}

export async function recordFinanceItem(class: AiClassificationResult, input: EmailInput) {
  console.log("#[FINANCE] Recording to D1 ledger");
  // Stub for future data mapping
}
