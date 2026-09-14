import React, { useState, useMemo } from 'react';
import { Search, ShieldCheck, Tag, ArrowRight, Layers, HelpCircle, CheckCircle2 } from 'lucide-react';
import { TRADEMARK_CLASSES } from '../data/complianceData';
import { TrademarkClass } from '../types';

interface TrademarkFinderProps {
  onAskClassQuery: (query: string) => void;
}

export const TrademarkFinder: React.FC<TrademarkFinderProps> = ({ onAskClassQuery }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<'All' | 'Goods' | 'Services'>('All');
  const [selectedClass, setSelectedClass] = useState<TrademarkClass | null>(null);

  const filteredClasses = useMemo(() => {
    return TRADEMARK_CLASSES.filter((item) => {
      const matchesType = typeFilter === 'All' || item.type === typeFilter;
      if (!matchesType) return false;

      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        item.classNumber.toString().includes(q) ||
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.keywords.some((k) => k.toLowerCase().includes(q)) ||
        item.examples.some((e) => e.toLowerCase().includes(q))
      );
    });
  }, [searchQuery, typeFilter]);

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      
      {/* Intro Banner */}
      <div className="bg-white/70 backdrop-blur-xl border border-white/80 rounded-3xl p-6 shadow-xs relative overflow-hidden">
        <div className="absolute top-0 right-0 translate-x-10 -translate-y-10 w-48 h-48 bg-blue-100 rounded-full blur-3xl opacity-60 pointer-events-none" />
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              Nice Classification (12th Edition)
            </div>
            <h2 className="text-2xl font-bold text-[#1F1F1F] tracking-tight">
              Indian & Global Trademark Class Finder
            </h2>
            <p className="text-sm text-[#444746] mt-1 max-w-2xl">
              Search all 45 classes for goods (1–34) and services (35–45). Identify the exact classes required for your brand, mobile application, consulting agency, or enterprise SaaS.
            </p>
          </div>

          <button
            id="tm-popular-tax-software-btn"
            onClick={() => onAskClassQuery('What are the Indian Trademark classes for tax consulting services and enterprise software development?')}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2.5 rounded-full shadow-xs transition-all flex-shrink-0"
          >
            <span>Ask Tax & Software TM Combo</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Search & Filter Bar */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              id="tm-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search keyword (e.g. software, tax consulting, clothing, restaurant, cosmetics)..."
              className="w-full bg-white/90 border border-black/10 rounded-2xl pl-11 pr-4 py-3 text-sm text-[#1F1F1F] placeholder-gray-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all shadow-2xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-gray-600 px-2 py-1"
              >
                Clear
              </button>
            )}
          </div>

          {/* Filter Pills */}
          <div className="flex items-center bg-gray-100/80 p-1 rounded-2xl border border-black/5 self-start sm:self-auto">
            {(['All', 'Goods', 'Services'] as const).map((filter) => (
              <button
                key={filter}
                id={`filter-${filter.toLowerCase()}`}
                onClick={() => setTypeFilter(filter)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  typeFilter === filter
                    ? 'bg-white text-blue-700 shadow-xs'
                    : 'text-[#444746] hover:text-[#1F1F1F]'
                }`}
              >
                {filter === 'All' ? 'All (45 Classes)' : filter === 'Goods' ? 'Goods (1-34)' : 'Services (35-45)'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Category Tags */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        <span className="text-gray-400 font-medium whitespace-nowrap pl-1">Popular searches:</span>
        {[
          { label: 'Enterprise Software & SaaS', query: 'software' },
          { label: 'Tax & Business Advisory', query: 'tax consulting' },
          { label: 'E-commerce & Retail', query: 'e-commerce' },
          { label: 'Cosmetics & Skincare', query: 'cosmetics' },
          { label: 'Clothing & Fashion', query: 'clothing' },
          { label: 'Fintech & Banking', query: 'fintech' },
          { label: 'Healthcare & Diagnostics', query: 'medical' },
        ].map((tag) => (
          <button
            key={tag.label}
            onClick={() => setSearchQuery(tag.query)}
            className="px-3 py-1.5 rounded-full bg-white/60 hover:bg-white border border-black/5 text-[#444746] hover:text-blue-700 whitespace-nowrap transition-colors"
          >
            {tag.label}
          </button>
        ))}
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between text-xs text-[#444746] px-1">
        <span>Showing {filteredClasses.length} matching trademark classes</span>
        <span className="text-gray-500">Government fee: ₹4,500 (MSME/Individual) vs ₹9,000 (Corporate)</span>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredClasses.map((item) => (
          <div
            key={item.classNumber}
            id={`tm-class-card-${item.classNumber}`}
            className="bg-white/70 backdrop-blur-md border border-white/80 hover:border-blue-200 rounded-3xl p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
          >
            <div>
              {/* Header */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-2.5">
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-bold text-sm shadow-xs">
                    {item.classNumber}
                  </span>
                  <div>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-blue-600">
                      {item.type} Class
                    </span>
                    <h3 className="text-base font-semibold text-[#1F1F1F] leading-snug group-hover:text-blue-600 transition-colors">
                      {item.title}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs text-[#444746] leading-relaxed mb-3">
                {item.description}
              </p>

              {/* Examples */}
              <div className="mb-4">
                <div className="text-[11px] font-medium text-gray-500 mb-1.5 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  <span>Key Goods / Services Included:</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {item.examples.map((ex, i) => (
                    <span
                      key={i}
                      className="inline-block px-2.5 py-1 rounded-lg text-[11px] bg-white/80 border border-black/5 text-[#1F1F1F]"
                    >
                      {ex}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-3 border-t border-black/5 flex items-center justify-between">
              <span className="text-[11px] text-gray-400">
                Form TM-A • 10 Yr Protection
              </span>
              <button
                id={`ask-about-class-${item.classNumber}`}
                onClick={() => onAskClassQuery(`What are the filing requirements, acceptable descriptions, and objection risks for Trademark Class ${item.classNumber} (${item.title})?`)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors"
              >
                <span>Ask CorebIQ AI</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredClasses.length === 0 && (
        <div className="bg-white/60 backdrop-blur-md rounded-3xl p-12 text-center border border-dashed border-gray-300">
          <HelpCircle className="w-10 h-10 text-gray-400 mx-auto mb-3" />
          <h4 className="text-base font-semibold text-[#1F1F1F]">No classes found matching "{searchQuery}"</h4>
          <p className="text-xs text-[#444746] mt-1 max-w-sm mx-auto">
            Try searching for broader terms like "software", "consulting", "retail", or ask CorebIQ AI directly.
          </p>
          <button
            onClick={() => onAskClassQuery(`Which trademark class should I choose for: ${searchQuery}?`)}
            className="mt-4 inline-flex items-center gap-2 bg-blue-600 text-white text-xs font-semibold px-4 py-2 rounded-full"
          >
            <span>Ask CorebIQ AI for "{searchQuery}"</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

    </div>
  );
};
