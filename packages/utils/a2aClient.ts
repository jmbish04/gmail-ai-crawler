export async function callA2AService({
  url,
  skill,
  args
}: {
  url: string;
  skill: string;
  args: Record<string, any>;
}) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ skill, args })
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`A2A fetch failed: ${res.status} ${errorText}`);
  }

  const data = await res.json();
  return data;
}