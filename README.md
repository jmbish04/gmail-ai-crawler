# GMAIL-AI Crawler

This Repo hosts a Cloudflare Worker that connects to an AppsScript API via A2a for retrieving and routing email data using ai-driven logic.

The worker performs intelligent actions based on email subject matching, classification, and ai-analysis.

This is the **intake** ster for an airborn-style home automation system.
 
Full text diagrams: See `docs/email-routing-high-level.txt`

## External Services used

- AppsScript deployed to https://script.google.com/macros/s/AKfycbxUBJ4kkzD1z8qm6urbDNf8b0R7m70PeNmj127KYC9fPBmafI5SDA1UtB7R5DLDIzO/exec
- Called by the Script from the worker via function : `fetchEmailsFromAppScript()`

## Routing Classified Emails

The [`Routert](packages/crawler/router.ts) matches AI classification results to routing logic:

- `actionable` = task / issue generation
- `finance` = cost recording/ledger
- `info` = notification /plain storage

Optionally, no-action emails can be archived/or only summarized.

## Related Modules

- `ai.ts` - Summarize email content & classify intent type
- `router.ts` - Script logic for classification types
- `actions.ts`  - Stub routing tasks to GitHub, PMO, or DormInsight (D1)

Further integrations can be plugged into the main actions scaffold.

Work continues after intake via `AppsScript` with the deployed URL, submitted by the worker.
