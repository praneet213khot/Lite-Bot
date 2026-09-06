import { createGroq } from '@ai-sdk/groq';
import { streamText } from 'ai';

export const maxDuration = 30;

const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const result = await streamText({
      model: groq('llama-3.3-70b-versatile'),
      messages,
    });

    return result.toDataStreamResponse();
  } catch (error: any) {
    console.error('API Error details:', error);
    return new Response(JSON.stringify({ error: error.message || 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
