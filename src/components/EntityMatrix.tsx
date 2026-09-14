import React, { useState } from 'react';
import { Building2, Check, X, Shield, ArrowRight, HelpCircle, DollarSign, Clock, Users } from 'lucide-react';
import { ENTITY_COMPARISONS } from '../data/complianceData';
import { EntityComparison } from '../types';

interface EntityMatrixProps {
  onAskEntityQuery: (query: string) => void;
}

export const EntityMatrix: React.FC<EntityMatrixProps> = ({ onAskEntityQuery }) => {
  const [selectedEntityId, setSelectedEntityId] = useState<string>('pvt-ltd');
  const [wizardGoal, setWizardGoal] = useState<string | null>(null);

  const selectedEntity = ENTITY_COMPARISONS.find((e) => e.id === selectedEntityId) || ENTITY_COMPARISONS[0];

  const handleWizardSelect = (goal: string, recommendedId: string) => {
    setWizardGoal(goal);
    setSelectedEntityId(recommendedId);
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      
      {/* Header Banner */}
      <div className="bg-white/70 backdrop-blur-xl border border-white/80 rounded-3xl p-6 shadow-xs relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-800 mb-2">
              <Building2 className="w-3.5 h-3.5" />
              Entity Structuring & Incorporation Guide
            </div>
            <h2 className="text-2xl font-bold text-[#1F1F1F] tracking-tight">
              Business Registration Comparison Matrix
            </h2>
            <p className="text-sm text-[#444746] mt-1 max-w-2xl">
              Compare Private Limited, LLP, OPC, Sole Proprietorship, and US Delaware C-Corp on liability, FDI rules, taxation, and annual statutory burden.
            </p>
          </div>

          <button
            id="ask-entity-diff-btn"
            onClick={() => onAskEntityQuery('What are the key differences between a Private Limited Company and an LLP for a tech startup in India?')}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2.5 rounded-full shadow-xs transition-all flex-shrink-0"
          >
            <span>Compare Pvt Ltd vs LLP</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Quick Recommendation Wizard */}
        <div className="mt-6 pt-5 border-t border-black/5">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-2">
            Instant Entity Recommendation by Business Model:
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { label: '🚀 Raising VC Funding', goal: 'vc', entityId: 'pvt-ltd' },
              { label: '💼 Professional Agency', goal: 'agency', entityId: 'llp' },
              { label: '👤 Solo Founder / Bootstrapped', goal: 'solo', entityId: 'opc' },
              { label: '🌐 Global SaaS / US Investors', goal: 'global', entityId: 'us-c-corp' },
            ].map((item) => (
              <button
                key={item.goal}
                onClick={() => handleWizardSelect(item.goal, item.entityId)}
                className={`text-left p-2.5 rounded-2xl border text-xs font-medium transition-all ${
                  wizardGoal === item.goal
                    ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                    : 'bg-white/80 border-black/5 text-[#1F1F1F] hover:border-blue-300'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Entity Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {ENTITY_COMPARISONS.map((entity) => (
          <button
            key={entity.id}
            id={`select-entity-${entity.id}`}
            onClick={() => setSelectedEntityId(entity.id)}
            className={`px-4 py-2.5 rounded-2xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${
              selectedEntityId === entity.id
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-white/70 text-[#444746] hover:bg-white hover:text-[#1F1F1F] border border-black/5'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>{entity.name}</span>
          </button>
        ))}
      </div>

      {/* Selected Entity Detail Card */}
      <div className="bg-white/75 backdrop-blur-md border border-white/80 rounded-3xl p-6 shadow-xs space-y-6">
        
        {/* Title & Ideal For */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-black/5">
          <div>
            <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
              Legal Classification
            </span>
            <h3 className="text-xl font-bold text-[#1F1F1F]">
              {selectedEntity.fullName}
            </h3>
            <p className="text-xs text-[#444746] mt-1">
              <strong>Best suited for:</strong> {selectedEntity.idealFor}
            </p>
          </div>

          <button
            id="ask-incorporation-steps-btn"
            onClick={() => onAskEntityQuery(`What is the complete step-by-step incorporation procedure, documents required, and government fees for a ${selectedEntity.name}?`)}
            className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 hover:bg-blue-100 px-4 py-2 rounded-2xl text-xs font-semibold transition-colors flex-shrink-0"
          >
            <span>Registration Steps with CorebIQ</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-white/90 p-4 rounded-2xl border border-black/5">
            <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-1">
              <Users className="w-3.5 h-3.5 text-blue-600" />
              <span>Membership</span>
            </div>
            <div className="text-xs font-semibold text-[#1F1F1F]">
              {selectedEntity.minMembers}
            </div>
          </div>

          <div className="bg-white/90 p-4 rounded-2xl border border-black/5">
            <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-1">
              <Clock className="w-3.5 h-3.5 text-indigo-600" />
              <span>Turnaround Time</span>
            </div>
            <div className="text-xs font-semibold text-[#1F1F1F]">
              {selectedEntity.avgSetupTime}
            </div>
          </div>

          <div className="bg-white/90 p-4 rounded-2xl border border-black/5">
            <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-1">
              <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
              <span>Tax Rate</span>
            </div>
            <div className="text-xs font-semibold text-[#1F1F1F]">
              {selectedEntity.taxRate}
            </div>
          </div>

          <div className="bg-white/90 p-4 rounded-2xl border border-black/5">
            <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-1">
              <Shield className="w-3.5 h-3.5 text-amber-600" />
              <span>Foreign Investment</span>
            </div>
            <div className="text-xs font-semibold text-[#1F1F1F] flex items-center gap-1">
              {selectedEntity.fdiAllowed ? (
                <span className="text-emerald-700 flex items-center gap-1">
                  <Check className="w-3 h-3 text-emerald-600" /> FDI Permitted
                </span>
              ) : (
                <span className="text-rose-700 flex items-center gap-1">
                  <X className="w-3 h-3 text-rose-600" /> Restricted / No FDI
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Pros & Cons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          <div className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-4">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-800 mb-2">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>Key Advantages:</span>
            </div>
            <ul className="space-y-1.5">
              {selectedEntity.keyPros.map((pro, i) => (
                <li key={i} className="text-xs text-emerald-950 flex items-start gap-2">
                  <span className="text-emerald-500 font-bold">•</span>
                  <span>{pro}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-amber-50/50 border border-amber-100 rounded-2xl p-4">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-900 mb-2">
              <HelpCircle className="w-4 h-4 text-amber-600" />
              <span>Key Limitations & Compliances:</span>
            </div>
            <ul className="space-y-1.5">
              {selectedEntity.keyCons.map((con, i) => (
                <li key={i} className="text-xs text-amber-950 flex items-start gap-2">
                  <span className="text-amber-500 font-bold">•</span>
                  <span>{con}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Mandatory Filings & Annual Cost */}
        <div className="bg-white/90 border border-black/5 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
          <div>
            <span className="font-semibold text-gray-500 block mb-1">Mandatory Statutory Filings:</span>
            <div className="flex flex-wrap gap-1.5">
              {selectedEntity.mandatoryFilings.map((filing, i) => (
                <span key={i} className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 font-medium">
                  {filing}
                </span>
              ))}
            </div>
          </div>

          <div className="sm:text-right flex-shrink-0">
            <span className="text-gray-400 block">Est. Annual Compliance Cost:</span>
            <span className="font-bold text-[#1F1F1F] text-sm">
              {selectedEntity.annualComplianceCost}
            </span>
          </div>
        </div>

      </div>

    </div>
  );
};
