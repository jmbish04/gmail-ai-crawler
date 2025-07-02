// Simple mock queue worker that parallelly processes

import { fetchGmail } from "./indext";
import { parseString } from "./utils";

export async function runQueue(inputs: string[]) {
  for (let i=0; i<inputs.length; i++) {
    const request = parseString(inputs[i]);
    console.log(`Processing `${request.type}: ${request.value}`);
    await fetchGmail(request);
  }
}