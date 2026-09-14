import React, { useState, useMemo } from 'react';
import { Calendar, AlertTriangle, Clock, ArrowRight, ShieldAlert, CheckCircle, Search } from 'lucide-react';
import { COMPLIANCE_DEADLINES } from '../data/complianceData';

interface DeadlinesCalendarProps {
  onAskFilingQuery: (query: string) => void;
}

export const DeadlinesCalendar: React.FC<DeadlinesCalendarProps> = ({ onAskFilingQuery }) => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'roc' | 'tax' | 'labor'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDeadlines = useMemo(() => {
    return COMPLIANCE_DEADLINES.filter((item) => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      if (!matchesCategory) return false;

      if (!searchTerm.trim()) return true;
      const s = searchTerm.toLowerCase();
      return (
        item.title.toLowerCase().includes(s) ||
        item.formName.toLowerCase().includes(s) ||
        item.authority.toLowerCase().includes(s) ||
        item.description.toLowerCase().includes(s)
      );
    });
  }, [selectedCategory, searchTerm]);

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      
      {/* Header Banner */}
      <div className="bg-white/70 backdrop-blur-xl border border-white/80 rounded-3xl p-6 shadow-xs relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 mb-2">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
              Statutory Compliance Tracker
            </div>
            <h2 className="text-2xl font-bold text-[#1F1F1F] tracking-tight">
              Statutory Compliance Calendar & Deadlines
            </h2>
            <p className="text-sm text-[#444746] mt-1 max-w-2xl">
              Stay ahead of mandatory filing deadlines for MCA/ROC, GST, Income Tax (TDS/Advance Tax), and Labour compliances to avoid heavy daily late fees.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="deadlines-inc20a-btn"
              onClick={() => onAskFilingQuery('What are the statutory requirements and attachments needed for Form INC-20A Commencement of Business?')}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2.5 rounded-full shadow-xs transition-all flex-shrink-0"
            >
              <span>INC-20A Checklist</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              id="deadlines-search-input"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by form or tax (e.g. INC-20A, DIR-3 KYC, GSTR-3B, TDS, AOC-4)..."
              className="w-full bg-white/90 border border-black/10 rounded-2xl pl-11 pr-4 py-3 text-sm text-[#1F1F1F] placeholder-gray-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all shadow-2xs"
            />
          </div>

          <div className="flex items-center bg-gray-100/80 p-1 rounded-2xl border border-black/5 self-start sm:self-auto overflow-x-auto max-w-full">
            {[
              { id: 'all', label: 'All Statutory' },
              { id: 'roc', label: 'MCA / ROC' },
              { id: 'tax', label: 'GST & Income Tax' },
              { id: 'labor', label: 'Labour & PF' },
            ].map((tab) => (
              <button
                key={tab.id}
                id={`cat-filter-${tab.id}`}
                onClick={() => setSelectedCategory(tab.id as any)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === tab.id
                    ? 'bg-white text-blue-700 shadow-xs'
                    : 'text-[#444746] hover:text-[#1F1F1F]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Deadlines List */}
      <div className="space-y-3.5">
        {filteredDeadlines.map((item) => (
          <div
            key={item.id}
            id={`deadline-item-${item.id}`}
            className="bg-white/75 backdrop-blur-md border border-white/80 hover:border-blue-200 rounded-3xl p-5 shadow-xs hover:shadow-md transition-all group"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              
              {/* Main Content */}
              <div className="space-y-1.5 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-200/50">
                    {item.authority}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-gray-100 text-gray-800">
                    {item.formName}
                  </span>
                  <span className="text-xs text-gray-400 font-medium">
                    {item.frequency}
                  </span>
                </div>

                <h3 className="text-base font-semibold text-[#1F1F1F] group-hover:text-blue-600 transition-colors">
                  {item.title}
                </h3>

                <p className="text-xs text-[#444746] leading-relaxed">
                  {item.description}
                </p>

                {/* Due Date & Penalties */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 pt-2 text-xs">
                  <div className="flex items-center gap-1.5 text-blue-700 font-medium bg-blue-50/70 px-3 py-1.5 rounded-xl border border-blue-100">
                    <Clock className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                    <span><strong>Due Date:</strong> {item.dueDate}</span>
                  </div>

                  <div className="flex items-center gap-1.5 text-amber-800 font-medium bg-amber-50/70 px-3 py-1.5 rounded-xl border border-amber-200/60">
                    <ShieldAlert className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                    <span><strong>Default Penalty:</strong> {item.penaltyInfo}</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="flex md:flex-col items-center justify-end flex-shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-black/5">
                <button
                  id={`ask-filing-${item.id}`}
                  onClick={() => onAskFilingQuery(`What is the step-by-step filing guide, required documents, and late penalty rules for ${item.formName} (${item.title})?`)}
                  className="w-full md:w-auto inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-800 bg-blue-50/50 hover:bg-blue-100/70 px-4 py-2 rounded-xl transition-all"
                >
                  <span>How to File with CorebIQ</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* Compliance Advisory Note */}
      <div className="bg-blue-50/60 border border-blue-100 rounded-3xl p-5 text-xs text-[#444746] flex items-start gap-3">
        <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
        <div>
          <strong className="text-[#1F1F1F]">Director & Founder Reminder:</strong> Failure to file <strong>Form INC-20A</strong> within 180 days is grounds for striking off a newly incorporated company. DIN holders must complete <strong>DIR-3 KYC</strong> every financial year by 30th September to keep their director identification number active.
        </div>
      </div>

    </div>
  );
};
