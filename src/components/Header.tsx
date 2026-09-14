import React from 'react';
import { ShieldCheck, Calendar, Building2, MessageSquare, Sparkles, Trash2, Menu, X } from 'lucide-react';

interface HeaderProps {
  activeTab: 'chat' | 'trademark' | 'deadlines' | 'entities';
  setActiveTab: (tab: 'chat' | 'trademark' | 'deadlines' | 'entities') => void;
  onClearChat: () => void;
  messageCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onClearChat,
  messageCount,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <header className="relative z-20 w-full border-b border-black/5 bg-white/40 backdrop-blur-xl transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
        
        {/* Logo & Title */}
        <div 
          onClick={() => setActiveTab('chat')} 
          className="flex items-center gap-2.5 cursor-pointer group select-none"
        >
          {/* 4-Point AI Spark Icon */}
          <div className="relative flex-shrink-0 transition-transform duration-300 group-hover:scale-105">
            <svg width="28" height="28" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path 
                d="M20 0C20 11.0457 28.9543 20 40 20C28.9543 20 20 28.9543 20 40C20 28.9543 11.0457 20 0 20C11.0457 20 20 11.0457 20 0Z" 
                fill="url(#spark_gradient_ai_header)"
              />
              <defs>
                <linearGradient id="spark_gradient_ai_header" x1="5" y1="5" x2="35" y2="35" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#4285F4"/>
                  <stop offset="1" stopColor="#1967D2"/>
                </linearGradient>
              </defs>
            </svg>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-semibold tracking-tight text-[#1F1F1F]">
                CorebIQ <span className="text-blue-600 font-bold">AI</span>
              </h1>
              <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-blue-100/70 text-blue-800 border border-blue-200/60">
                Compliance AI
              </span>
            </div>
            <p className="text-[12px] text-[#444746] hidden md:block">
              Registrations • Trademark Classes • MCA • GST & Statutory Compliance
            </p>
          </div>
        </div>

        {/* Desktop Navigation Tabs */}
        <nav className="hidden md:flex items-center gap-1.5 bg-white/70 backdrop-blur-md p-1 rounded-full border border-black/5 shadow-xs">
          <button
            id="nav-tab-chat"
            onClick={() => setActiveTab('chat')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
              activeTab === 'chat'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-[#444746] hover:text-[#1F1F1F] hover:bg-black/5'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>AI Assistant</span>
          </button>

          <button
            id="nav-tab-trademark"
            onClick={() => setActiveTab('trademark')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
              activeTab === 'trademark'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-[#444746] hover:text-[#1F1F1F] hover:bg-black/5'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>TM Classes (1-45)</span>
          </button>

          <button
            id="nav-tab-deadlines"
            onClick={() => setActiveTab('deadlines')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
              activeTab === 'deadlines'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-[#444746] hover:text-[#1F1F1F] hover:bg-black/5'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Compliance Calendar</span>
          </button>

          <button
            id="nav-tab-entities"
            onClick={() => setActiveTab('entities')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
              activeTab === 'entities'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-[#444746] hover:text-[#1F1F1F] hover:bg-black/5'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Entity Matrix</span>
          </button>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {messageCount > 1 && (
            <button
              id="clear-chat-button"
              onClick={onClearChat}
              title="Reset conversation"
              className="flex items-center gap-1 text-xs text-[#444746] hover:text-red-600 hover:bg-red-50 px-2.5 py-1.5 rounded-full border border-black/5 transition-all"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          )}

          {/* Mobile Menu Toggle Button */}
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-full text-[#444746] hover:bg-black/5 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-black/5 bg-white/95 backdrop-blur-xl px-4 py-3 space-y-2">
          <button
            onClick={() => {
              setActiveTab('chat');
              setMobileMenuOpen(false);
            }}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
              activeTab === 'chat' ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-[#1F1F1F] hover:bg-black/5'
            }`}
          >
            <MessageSquare className="w-4 h-4 text-blue-600" />
            <span>AI Compliance Assistant</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('trademark');
              setMobileMenuOpen(false);
            }}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
              activeTab === 'trademark' ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-[#1F1F1F] hover:bg-black/5'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            <span>Trademark Classes (1-45 Nice Classification)</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('deadlines');
              setMobileMenuOpen(false);
            }}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
              activeTab === 'deadlines' ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-[#1F1F1F] hover:bg-black/5'
            }`}
          >
            <Calendar className="w-4 h-4 text-blue-600" />
            <span>Compliance Calendar & Deadlines</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('entities');
              setMobileMenuOpen(false);
            }}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
              activeTab === 'entities' ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-[#1F1F1F] hover:bg-black/5'
            }`}
          >
            <Building2 className="w-4 h-4 text-blue-600" />
            <span>Entity Comparison Matrix (Pvt Ltd, LLP, OPC)</span>
          </button>
        </div>
      )}
    </header>
  );
};
