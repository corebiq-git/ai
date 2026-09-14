export type MessageRole = 'user' | 'assistant' | 'system';

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: number;
  category?: string;
  suggestedFollowUps?: string[];
  isStreaming?: boolean;
  error?: boolean;
}

export interface TrademarkClass {
  classNumber: number;
  type: 'Goods' | 'Services';
  title: string;
  description: string;
  keywords: string[];
  examples: string[];
}

export interface ComplianceDeadline {
  id: string;
  title: string;
  authority: 'ROC / MCA' | 'GST' | 'Income Tax' | 'Labour / PF' | 'IP India';
  formName: string;
  dueDate: string;
  frequency: 'Monthly' | 'Quarterly' | 'Annual' | 'Event-based';
  description: string;
  penaltyInfo: string;
  category: 'tax' | 'roc' | 'ip' | 'labor';
}

export interface EntityComparison {
  id: string;
  name: string;
  fullName: string;
  idealFor: string;
  minMembers: string;
  fdiAllowed: boolean;
  separateLegalEntity: boolean;
  liability: string;
  avgSetupTime: string;
  annualComplianceCost: string;
  taxRate: string;
  keyPros: string[];
  keyCons: string[];
  mandatoryFilings: string[];
}

export interface QueryCategory {
  id: string;
  title: string;
  icon: string;
  description: string;
  queries: string[];
}
