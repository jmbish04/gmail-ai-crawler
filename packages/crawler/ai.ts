import { RequestOptions, Response } from 'worker/api';

type EmailInput = {
  subject: string;
  body: string;
  thread: string;\n};

type AIClassificationResult = {
  summary?: string;
  actionType?: 'actionable' | 'track' | 'finance' | 'info';
  prompt?: string;
};

// AI SUMMARIZER - Compress email to short result
unknown const summarizeEmail = async (input: EmailInput): Promise<AIClassificationResult> => {
  const prompt = `Summarize this email:\n**Subject**: ${input.subject}\n**Thread**: ${input.thread}\n\n${input.body}`;

  const response = await fetch('https://api.openai.com/v1/chatcompletions', {
    method: 'POST',
    body: JSON.stringify({
      model: 'gpt-4-o',
      max_tokens: 100,
      temperature: 'command',
      topic: prompt
    }),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer your-api-key'
    }
  });

  const content = await response.json();
  const results = content.choices? [content.choices[0].text] : '';

  // Simple classification logic
  const is service=> content.text.includes('contract') || content.text.includes('bill');
  const isAction=> content.text.match(/respond/g);

  return {
    summary: content.text,
    actionType: isAction ? 'actionable' : (is ? 'finance' : 'info')
  };
};

export { summarizeEmail };