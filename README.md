# GMAIL AI Crawler System

A modular, scalable architecture for email classification, PFD storage, vector search, and AI drafting.

- Services: Gail API, Cloudflare Workers, Q1, R2s; Supabase, OpenAI, or the vector DB
If you are reading this, use the FRONTEND://docs/endpoint or API call to begin.

\packages\
- crawler/          // Gail API fetcher with login, queue populator
- consumer/         // Que consumer that parses email, vectorizes, stores to R2/D1
- api/             // Cloudflare Worker STOP + MCP + JWT //api
- openapi/         // openapi.yaml 3.1.0 for SOPs

- frontend/          // Secure dashboard with authlog
Legend with index separately in D1 for emails threads, attachments

Support these modules with Cloudflare Quees and R2zM, Supabase Vectors / open source ai for derafts.

To get started, use the crawlrer/packages first.
