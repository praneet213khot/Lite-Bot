'use client';

import { useChat } from '@ai-sdk/react';

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit, error } = useChat();

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto p-4 justify-between bg-white text-black">
      <div className="flex items-center gap-2 border-b pb-2">
        <h1 className="font-bold text-xl">LiteBot</h1>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 my-4">
        {messages.length === 0 && (
          <p className="text-gray-400 text-center mt-10">Send a message to start chatting with Groq!</p>
        )}
        {messages.map((m) => (
          <div
            key={m.id}
            className={`p-3 rounded-lg ${
              m.role === 'user'
                ? 'bg-blue-500 text-white ml-auto max-w-[80%]'
                : 'bg-gray-100 text-black mr-auto max-w-[80%]'
            }`}
          >
            <span className="font-bold block text-xs opacity-75 mb-1">
              {m.role === 'user' ? 'You' : 'AI'}
            </span>
            <p className="whitespace-pre-wrap">{m.content}</p>
          </div>
        ))}
        {error && (
          <div className="p-3 bg-red-100 text-red-700 rounded-lg text-sm">
            Error: {error.message}
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2 pt-2 border-t">
        <input
          className="flex-1 border border-gray-300 rounded p-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={input}
          onChange={handleInputChange}
          placeholder="Type a message..."
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Send
        </button>
      </form>
    </div>
  );
}
