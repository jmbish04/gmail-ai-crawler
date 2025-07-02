import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { message } = req.body;

  // Simulate vector search and AI reply
  const reply = `I found relevant threads related to your query: "${message}"`;

  res.status(200).json( { reply });
}