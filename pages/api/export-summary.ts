import type { NextApiRequest, NextApiResponse } from "next";

const CARD_URL = "https://gmail-ai-crawler.jmbish04.cloudflare.workers.dev/public/a2a/card-export-summary.json";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { query } = req.body;

  const response = await fetch(CARD_URL, {
    method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ query })
  });

  const data = await response.json();
  res.status(200).json( { docTitle: data.title });
}