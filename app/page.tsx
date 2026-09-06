'use client';

import { useChat } from 'ai/react';
import { Bot, Send } from 'lucide-react';

export default function LiteBot() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
    <div className="flex flex-col h-screen bg-slate-950 text-slate-100">
      <header className="flex items-center gap-2 p-4 bg-slate-900 border-b border-slate-800">
        <Bot className="w-6 h-6 text-cyan-400" />
        <h1 className="font-bold text-lg">LiteBot</h1>
      </header>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((m) => (
          <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm ${
              m.role === 'user' ? 'bg-cyan-600 text-white' : 'bg-slate-900 border border-slate-800 text-slate-200'
            }`}>
              {m.content}
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="p-3 bg-slate-900 border-t border-slate-800 flex gap-2">
        <input
          value={input}
          onChange={handleInputChange}
          placeholder="Ask LiteBot..."
          className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-sm text-slate-100 focus:outline-none"
        />
        <button type="submit" className="bg-cyan-600 px-4 py-2 rounded-xl text-white">
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
