import { Groq } from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: messages.map((m: any) => ({
        role: m.role,
        content: m.content,
      })),
      stream: false,
    });

    const reply = completion.choices[0]?.message?.content || 'No response from model';

    return Response.json({ role: 'assistant', content: reply });
  } catch (error: any) {
    console.error('Groq API Error:', error);
    return Response.json({ error: error.message || 'Failed to process' }, { status: 500 });
  }
}
