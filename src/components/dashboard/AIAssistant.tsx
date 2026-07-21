"use client";

import { Bot, Send, Sparkles, Bug, FileText, Zap } from "lucide-react";

export default function AIAssistant() {
  return (
    <div className="w-full rounded-3xl bg-white shadow-xl border border-gray-200 p-8">

      <div className="flex items-center gap-3 mb-6">
        <div className="h-12 w-12 rounded-full bg-blue-600 flex items-center justify-center">
          <Bot className="text-white" size={26} />
        </div>

        <div>
          <h2 className="text-2xl font-bold">
            DevTrack AI Assistant
          </h2>

          <p className="text-gray-500 text-sm">
            Your personal coding assistant
          </p>
        </div>
      </div>

      <h3 className="text-xl font-semibold mb-2">
        Hi Shubham 👋
      </h3>

      <p className="text-gray-600 mb-6">
        What would you like help with today?
      </p>

      <input
        type="text"
        placeholder="Ask anything about your project..."
        className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
      />

      <div className="grid grid-cols-2 gap-4 mt-6">

        <button className="flex items-center gap-3 rounded-xl border p-4 hover:bg-blue-50 transition">
          <Sparkles className="text-blue-600" />
          Review Code
        </button>

        <button className="flex items-center gap-3 rounded-xl border p-4 hover:bg-blue-50 transition">
          <Bug className="text-red-500" />
          Find Bugs
        </button>

        <button className="flex items-center gap-3 rounded-xl border p-4 hover:bg-blue-50 transition">
          <FileText className="text-green-600" />
          Generate README
        </button>

        <button className="flex items-center gap-3 rounded-xl border p-4 hover:bg-blue-50 transition">
          <Zap className="text-yellow-500" />
          Optimize Project
        </button>

      </div>

      <button className="mt-8 w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-3 flex justify-center items-center gap-2 transition">
        <Send size={18} />
        Send
      </button>

    </div>
  );
}