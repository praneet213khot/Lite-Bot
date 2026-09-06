'use client';

import { useState } from 'formidable' ? '' : useState; // standard React useState

export default function Chat() {
  const [messages, setMessages] = useState<Array<{ id: string; role: string; content: string }>>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = { id: Date.now().toString(), role: 'user', content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });

      const data = await res.json();
      if (data.content) {
        setMessages([...newMessages, { id: (Date.now() + 1).toString(), role: 'assistant', content: data.content }]);
      } else {
        setMessages([...newMessages, { id: (Date.now() + 1).toString(), role: 'assistant', content: 'Error: ' + (data.error || 'Unknown error') }]);
      }
    } catch (err) {
      setMessages([...newMessages, { id: (Date.now() + 1).toString(), role: 'assistant', content: 'Network error occurred.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto p-4 justify-between bg-white text-black">
      <div className="border-b pb-2">
        <h1 className="font-bold text-xl">LiteBot</h1>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 my-4">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`p-3 rounded-lg ${
              m.role === 'user'
                ? 'bg-blue-500 text-white ml-auto max-w-[80%]'
                : 'bg-gray-200 text-black mr-auto max-w-[80%]'
            }`}
          >
            <span className="font-bold block text-xs opacity-75">
              {m.role === 'user' ? 'You' : 'AI'}
            </span>
            {m.content}
          </div>
        ))}
        {loading && <div className="text-gray-400 text-sm">LiteBot is typing...</div>}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          className="flex-1 border border-gray-300 rounded p-2 text-black"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
        />
        <button type="submit" disabled={loading} className="bg-blue-500 text-white px-4 py-2 rounded">
          Send
        </button>
      </form>
    </div>
  );
}
