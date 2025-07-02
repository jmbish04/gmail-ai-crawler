// Agent Q&A: Given a new email, match domain context and synthesize response
import { ai } from "@cloudflare/workers-types";
import { querySimilarEmbeddings, fetchMetadataForEmbeddings } from "./utils";

export async function runAgent({ html, from }: {
  html: string,
  from: string
}) {
  const domain = from.split("@")[1];
  const stripped = html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ");
  const embedding = (await ai.run("@cf/meta/embedding-1", { text: stripped })).data[0];

  const similar = await querySimilarEmbeddings(embedding, domain);
  const context = await fetchMetadataForEmbeddings(similar.map( s => s.messageId));

  const prompt = `You are a personal assistant reviewing an email from ${from}. Use the past history below to anticipate what the user might want. Suggest questions to raise or actions to take.`;

  const response = await ai.run("@cf/meta/llama-3-8b-instruct", {
    messages: [
      { role: "system", content: prompt },
      { role: "user", content: stripped + "\n\nContext:\n" + JSON.stringify(context, null, 2) }
    ]
  });

  return response.choices?.[0]?.message.content || "No suggestion generated.";
}