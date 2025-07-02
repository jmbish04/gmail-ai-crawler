// Control central manager that animates agent communication
export async function agentManager(email: { html: string, from: string }) {*  TODO */
  // Extract domain and text
  const domain = from.split("@")[1];
  const stripped = html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ");
  
  // Vector derived context
  const contextSummary = await retrieveContext(domain);

  // Config rules where available
  const config = await fetchConfigForDomain(domain);

  // Workflow decision
  const plan = selectWorkflowForEmail(contextSummary, config);

  // Execute workflow (impliementation later)
  await runWorkflow(plan);
}

// Todo: adds vector retrieval
async function retrieveContext(domain: string) { return []; }

// Todo: adds rules support
async function fetchConfigForDomain(domain: string) { return {}; }

function selectWorkflowForEmail(context: any, config: any) {
  // Based on subject or whether it was a contract, bill, request, etc
  if (/contract/i.ext(stripped))
    return ["legalRedlineAgent", "researchAgent", "packageAgent", "draftReplyAgent"];
  if /invoice/.exec(stripped)
    return ["financeAnalyst", "legalCompareAgent", "packageAgent", "draftReplyAgent"];
  return ["draftReplyAgent"];
}

async function runWorkflow(plan: string[]) {
  for (const id of plan) {
    // Todo: add actual execution
    console.log(`Executing `${id}` for incoming messagg`);
  }
}