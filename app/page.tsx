'use client';

import { useChat } from '@ai-sdk/react';

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto p-4 justify-between">
      <div className="flex items-center gap-2 border-b pb-2">
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
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          className="flex-1 border border-gray-300 rounded p-2 text-black"
          value={input}
          onChange={handleInputChange}
          placeholder="Type a message..."
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Send
        </button>
      </form>
    </div>
  );
}
