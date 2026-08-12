"use client";

import React from "react";
import { Sparkles, Terminal } from "lucide-react";

interface AiReportCardProps {
  reportText: string;
}

export default function AiReportCard({ reportText }: AiReportCardProps) {
  if (!reportText) return null;

  const parseBold = (text: string) => {
    const parts = text.split(/\*\*/g);
    return parts.map((part, i) => 
      i % 2 === 1 ? <strong key={i} className="font-extrabold text-gray-900 dark:text-white">{part}</strong> : part
    );
  };

  const renderLine = (line: string, index: number) => {
    const trimmed = line.trim();
    if (!trimmed) return <div key={index} className="h-1" />;

    // ### Headers
    if (trimmed.startsWith("###")) {
      return (
        <h3 key={index} className="text-xl font-bold text-gray-800 dark:text-white mt-6 mb-3 flex items-center gap-2 border-b border-gray-100 dark:border-slate-800 pb-2">
          <Sparkles className="text-indigo-500 fill-indigo-500/20" size={18} />
          {trimmed.replace("###", "").trim()}
        </h3>
      );
    }

    // #### Sub-headers
    if (trimmed.startsWith("####")) {
      return (
        <h4 key={index} className="text-xs font-bold text-indigo-600 dark:text-blue-400 uppercase tracking-widest mt-5 mb-2.5">
          {trimmed.replace("####", "").trim()}
        </h4>
      );
    }

    // Bullet list items
    if (trimmed.startsWith("-")) {
      const content = trimmed.substring(1).trim();
      return (
        <li key={index} className="text-sm text-gray-600 dark:text-slate-300 ml-5 list-disc py-1 leading-relaxed">
          {parseBold(content)}
        </li>
      );
    }

    // Numbered list items
    if (/^\d+\./.test(trimmed)) {
      const content = trimmed.replace(/^\d+\./, "").trim();
      const numMatch = trimmed.match(/^(\d+)\./);
      const num = numMatch ? numMatch[1] : "1";
      return (
        <li key={index} className="text-sm text-gray-600 dark:text-slate-300 ml-5 list-decimal py-1 leading-relaxed">
          {parseBold(content)}
        </li>
      );
    }

    // Standard paragraphs
    return (
      <p key={index} className="text-sm text-gray-600 dark:text-slate-300 leading-relaxed py-1.5">
        {parseBold(trimmed)}
      </p>
    );
  };

  const lines = reportText.split("\n");

  return (
    <div className="relative overflow-hidden rounded-2xl border border-blue-100 dark:border-indigo-950/40 bg-gradient-to-br from-white via-white to-blue-50/20 dark:from-slate-900 dark:via-slate-900 dark:to-indigo-950/20 p-6 shadow-md transition-all duration-300 hover:shadow-lg hover:border-blue-200 dark:hover:border-indigo-800/40 mb-8">
      {/* Decorative gradient blur */}
      <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-blue-400/10 dark:bg-indigo-500/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 h-48 w-48 rounded-full bg-indigo-400/5 dark:bg-blue-500/5 blur-3xl pointer-events-none" />

      {/* Header Tag */}
      <div className="flex items-center justify-between mb-2">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 dark:bg-indigo-950/30 px-3 py-1 text-[11px] font-bold text-blue-600 dark:text-blue-400 border border-blue-100/50 dark:border-indigo-900/30">
          <Terminal size={12} />
          SYSTEM INTELLIGENCE
        </span>
      </div>

      {/* Body Report Content */}
      <div className="space-y-1">
        {lines.map((line, idx) => renderLine(line, idx))}
      </div>
    </div>
  );
}
