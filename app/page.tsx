'use client';

import { useChat } from '@ai-sdk/react';
import { Bot, Send } from 'lucide-react';

export default function Home() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
    <main className="flex flex-col h-screen max-w-lg mx-auto p-4 bg-slate-50">
      <header className="flex items-center gap-2 pb-4 border-b">
        <Bot className="w-6 h-6 text-blue-600" />
        <h1 className="font-bold text-lg">LiteBot</h1>
      </header>

      <div className="flex-1 overflow-y-auto py-4 space-y-4">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`p-3 rounded-lg max-w-[80%] ${
              m.role === 'user'
                ? 'ml-auto bg-blue-600 text-white'
                : 'mr-auto bg-gray-200 text-gray-800'
            }`}
          >
            {m.content}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2 pt-2 border-t">
        <input
          value={input}
          onChange={handleInputChange}
          placeholder="Type a message..."
          className="flex-1 p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 text-black"
        />
        <button
          type="submit"
          className="p-2 bg-blue-600 text-white rounded-lg flex items-center justify-center"
        >
          <Send className="w-5 h-5" />
        </button>
      </form>
    </main>
  );
}
