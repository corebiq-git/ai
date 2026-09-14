import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Send, Sparkles, Copy, Check, CornerDownRight, ArrowUpRight, ShieldCheck, RefreshCw, FileDown } from 'lucide-react';
import { ChatMessage } from '../types';
import { QUERY_CATEGORIES } from '../data/complianceData';

interface ChatViewProps {
  messages: ChatMessage[];
  onSendMessage: (text: string) => void;
  isLoading: boolean;
}

export const ChatView: React.FC<ChatViewProps> = ({
  messages,
  onSendMessage,
  isLoading,
}) => {
  const [inputText, setInputText] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isLoading) return;
    onSendMessage(inputText.trim());
    setInputText('');
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleExportMemo = (content: string) => {
    const header = `=== COREBIQ AI COMPLIANCE ADVISORY MEMO ===\nDate: ${new Date().toLocaleDateString()}\n\n`;
    const blob = new Blob([header + content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `CorebIQ_Compliance_Memo_${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="relative flex flex-col h-[calc(100dvh-65px)] w-full max-w-3xl mx-auto px-4 sm:px-6 py-4">
      
      {/* Background Ambient Blobs matching user's visual identity */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 flex justify-center">
        {/* Left dominant blob */}
        <div className="absolute top-[35%] left-[-15%] w-[70vw] sm:w-[500px] h-[35vh] sm:h-[400px] bg-[#8AB4F8] rounded-full blur-[100px] opacity-45 pointer-events-none" />
        {/* Center/Right soft blob */}
        <div className="absolute top-[45%] right-[-10%] w-[80vw] sm:w-[550px] h-[40vh] sm:h-[420px] bg-[#A8C7FA] rounded-full blur-[110px] opacity-40 pointer-events-none" />
      </div>

      {/* Quick Compliance Prompt Chips (shown on scroll / top) */}
      <div className="relative z-10 flex-shrink-0 mb-3 overflow-x-auto pb-1.5 scrollbar-none flex items-center gap-2">
        <span className="text-xs font-semibold text-gray-500 whitespace-nowrap pl-1 flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
          Quick Queries:
        </span>
        {[
          'Indian Trademark classes for tax & software',
          'Form INC-20A 180-day deadline & penalty',
          'Pvt Ltd vs LLP for tech startup',
          'GST registration rules for software export',
          'DIR-3 KYC Sept 30 requirements',
          'DPIIT Startup 80-IAC tax holiday',
        ].map((q, idx) => (
          <button
            key={idx}
            onClick={() => onSendMessage(q)}
            disabled={isLoading}
            className="text-xs whitespace-nowrap px-3 py-1.5 rounded-full bg-white/70 hover:bg-white text-[#444746] hover:text-blue-700 border border-black/5 hover:border-blue-300 transition-all shadow-2xs cursor-pointer disabled:opacity-50"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Messages Scroll Area */}
      <div className="relative z-10 flex-1 overflow-y-auto space-y-4 pr-1 pb-4">
        {messages.map((msg) => {
          const isUser = msg.role === 'user';
          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} transition-all`}
            >
              {/* Message Bubble */}
              <div
                className={`${
                  isUser
                    ? 'bg-[#D3E3FD] text-[#041E49] px-5 py-3.5 rounded-3xl rounded-tr-sm max-w-[88%] text-[0.95rem] leading-relaxed shadow-sm'
                    : 'bg-white/75 backdrop-blur-md border border-white/60 text-[#1F1F1F] px-5 py-4 rounded-3xl rounded-tl-sm max-w-[95%] text-[0.95rem] leading-relaxed shadow-sm'
                }`}
              >
                {isUser ? (
                  <p className="whitespace-pre-wrap">{msg.content}</p>
                ) : (
                  <div className="space-y-2.5">
                    {/* Header bar of AI response */}
                    <div className="flex items-center justify-between gap-2 pb-1.5 border-b border-black/5 text-xs text-gray-500">
                      <div className="flex items-center gap-1.5 text-blue-700 font-semibold">
                        <svg width="14" height="14" viewBox="0 0 40 40" fill="none">
                          <path
                            d="M20 0C20 11.0457 28.9543 20 40 20C28.9543 20 20 28.9543 20 40C20 28.9543 11.0457 20 0 20C11.0457 20 20 11.0457 20 0Z"
                            fill="#1967D2"
                          />
                        </svg>
                        <span>CorebIQ Advisory</span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handleCopy(msg.id, msg.content)}
                          title="Copy text"
                          className="flex items-center gap-1 hover:text-blue-600 px-2 py-0.5 rounded-md hover:bg-black/5 transition-colors"
                        >
                          {copiedId === msg.id ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                              <span className="text-[11px] text-emerald-600">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span className="text-[11px]">Copy</span>
                            </>
                          )}
                        </button>

                        <button
                          onClick={() => handleExportMemo(msg.content)}
                          title="Download compliance memo"
                          className="flex items-center gap-1 hover:text-blue-600 px-2 py-0.5 rounded-md hover:bg-black/5 transition-colors"
                        >
                          <FileDown className="w-3.5 h-3.5" />
                          <span className="text-[11px]">Memo</span>
                        </button>
                      </div>
                    </div>

                    {/* Markdown Body */}
                    <div className="prose prose-sm max-w-none text-[#1F1F1F] leading-relaxed space-y-2 [&_h3]:text-base [&_h3]:font-bold [&_h3]:text-[#1F1F1F] [&_h3]:mt-3 [&_h3]:mb-1 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1 [&_li]:text-sm [&_p]:text-sm [&_strong]:text-blue-900 [&_hr]:my-3 [&_hr]:border-black/10">
                      <ReactMarkdown>{msg.content}</ReactMarkdown>
                    </div>
                  </div>
                )}
              </div>

              {/* Follow-up Suggestion Chips below Assistant Responses */}
              {!isUser && msg.suggestedFollowUps && msg.suggestedFollowUps.length > 0 && (
                <div className="mt-2.5 ml-1 space-y-1.5 max-w-[95%]">
                  <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider block">
                    Recommended Follow-ups:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {msg.suggestedFollowUps.map((prompt, idx) => (
                      <button
                        key={idx}
                        onClick={() => onSendMessage(prompt)}
                        disabled={isLoading}
                        className="inline-flex items-center gap-1.5 text-xs text-blue-700 bg-white/70 hover:bg-white hover:text-blue-800 border border-blue-200/60 rounded-2xl px-3 py-1.5 transition-all text-left shadow-2xs disabled:opacity-50"
                      >
                        <CornerDownRight className="w-3 h-3 text-blue-500 flex-shrink-0" />
                        <span>{prompt}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex flex-col items-start transition-all">
            <div className="bg-white/70 backdrop-blur-md border border-white/60 text-[#1F1F1F] px-5 py-4 rounded-3xl rounded-tl-sm text-[0.95rem] shadow-sm flex items-center gap-3">
              <div className="relative">
                <svg width="20" height="20" viewBox="0 0 40 40" fill="none" className="animate-spin text-blue-600">
                  <path
                    d="M20 0C20 11.0457 28.9543 20 40 20C28.9543 20 20 28.9543 20 40C20 28.9543 11.0457 20 0 20C11.0457 20 20 11.0457 20 0Z"
                    fill="#1967D2"
                  />
                </svg>
              </div>
              <span className="text-xs text-[#444746] font-medium animate-pulse">
                Analyzing statutory regulations & legal frameworks...
              </span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Floating Input Pill Bar matching user's prototype */}
      <div className="relative z-20 mt-auto pt-2 pb-1">
        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-3 bg-white/85 backdrop-blur-xl border border-white/90 shadow-md hover:shadow-lg rounded-full px-5 py-3.5 transition-all focus-within:ring-2 focus-within:ring-blue-400/40 focus-within:border-blue-400"
        >
          {/* Spark / Search Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-blue-500 flex-shrink-0"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>

          {/* Text Input */}
          <input
            id="chat-compliance-input"
            ref={inputRef}
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Ask CorebIQ AI about trademark classes, registrations, MCA, taxes..."
            disabled={isLoading}
            className="bg-transparent border-none outline-none w-full text-[0.95rem] text-[#1F1F1F] placeholder-gray-500 disabled:opacity-60"
          />

          {/* Send Button */}
          <button
            id="chat-submit-btn"
            type="submit"
            disabled={!inputText.trim() || isLoading}
            className="text-blue-600 hover:text-blue-800 disabled:text-gray-300 flex-shrink-0 transition-colors p-1"
            aria-label="Send query"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </form>

        <p className="text-[11px] text-center text-gray-400 mt-1.5 select-none">
          CorebIQ AI analyzes regulatory acts & Nice classification. Always confirm statutory filings with your CA/CS.
        </p>
      </div>

    </div>
  );
};
