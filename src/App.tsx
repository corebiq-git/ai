import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { ChatView } from './components/ChatView';
import { TrademarkFinder } from './components/TrademarkFinder';
import { DeadlinesCalendar } from './components/DeadlinesCalendar';
import { EntityMatrix } from './components/EntityMatrix';
import { ChatMessage } from './types';

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'initial-user-msg',
    role: 'user',
    content: 'What are the Indian Trademark classes for tax consulting services and enterprise software development?',
    timestamp: Date.now() - 60000,
  },
  {
    id: 'initial-ai-msg',
    role: 'assistant',
    content: `Under the Indian Trademark Classification (Nice Classification, 12th Edition), you will need **two distinct classes** for tax consulting services and enterprise software development:

### 1. **Class 35: Business & Tax Consulting Services**
* **Scope:** Covers business management, organization, administration, office functions, and professional tax consulting services.
* **Relevant Specification of Services:**
  * *Tax preparation and tax consulting services*
  * *Business advisory, accounting, and book-keeping services*
  * *Commercial administration and enterprise management consulting*
* **Why it is essential:** Protects your brand name when offering tax advisory, compliance services, and corporate management.

---

### 2. **Class 42: Enterprise Software Development & IT Services**
* **Scope:** Covers technological and scientific services, software engineering, architecture, and cloud SaaS.
* **Relevant Specification of Services:**
  * *Design and development of enterprise software and web applications*
  * *Software as a Service (SaaS) and Cloud computing solutions*
  * *IT consultancy, cybersecurity, and technological architecture design*
* **Why it is essential:** Protects your company name as the technological developer and provider of enterprise platforms.

---

### 💡 Additional Consideration: **Class 9** (If selling standalone software products)
* If you distribute downloadable desktop software, mobile applications, or on-premise software licenses as a product (rather than pure cloud/SaaS), you should also consider **Class 9** (*Downloadable computer software and recorded applications*).

---

### 📋 Statutory Filing Details (Form TM-A):
* **Government Fees:**
  * **Individual / Startup (DPIIT) / MSME (Udyam):** ₹4,500 per class (₹9,000 for 2 classes).
  * **Others (Non-MSME Companies):** ₹9,000 per class (₹18,000 for 2 classes).
* **Validity:** 10 years from the date of application, renewable indefinitely every 10 years.
* **Next Steps:** Conduct an identical and phonetic public search on the IP India Trademark Registry portal before filing.`,
    timestamp: Date.now() - 55000,
    suggestedFollowUps: [
      'What is the difference between Class 9 (software product) and Class 42 (software service)?',
      'How to file Form TM-A with a 50% government fee concession using Udyam?',
      'How to respond to a Section 9 or Section 11 trademark examination report?',
      'What are the mandatory annual ROC compliance filings for a Pvt Ltd company?'
    ]
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState<'chat' | 'trademark' | 'deadlines' | 'entities'>('chat');
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    try {
      const saved = localStorage.getItem('corebiq_chat_history');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // Fall back to initial messages
    }
    return INITIAL_MESSAGES;
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('corebiq_chat_history', JSON.stringify(messages));
    } catch (e) {
      console.error('Failed to persist chat history:', e);
    }
  }, [messages]);

  const handleSendMessage = async (text: string) => {
    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setActiveTab('chat');
    setIsLoading(true);

    try {
      // Prepare history payload
      const historyPayload = messages.slice(-8).map((m) => ({
        role: m.role === 'user' ? 'user' : 'model',
        text: m.content,
      }));

      const res = await fetch('/api/compliance/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: historyPayload,
        }),
      });

      if (!res.ok) {
        throw new Error(`Server returned status ${res.status}`);
      }

      const data = await res.json();
      const assistantMessage: ChatMessage = {
        id: `ai-${Date.now()}`,
        role: 'assistant',
        content: data.content || 'I processed your compliance inquiry.',
        timestamp: Date.now(),
        suggestedFollowUps: data.suggestedFollowUps || [],
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error contacting compliance assistant:', error);
      const errorMessage: ChatMessage = {
        id: `ai-error-${Date.now()}`,
        role: 'assistant',
        content: `### ⚠️ Advisory Connection Note
We encountered a temporary network delay reaching the online compliance knowledge service.

**Instant Regulatory Guidance for "${text}":**
* If your query involves **Trademark classes**, please check the **TM Classes (1-45)** tool in the top navigation bar.
* If your query involves **statutory deadlines** (such as INC-20A, DIR-3 KYC, or GST returns), refer to the **Compliance Calendar** tab.
* For corporate incorporation comparisons (Pvt Ltd vs LLP), refer to the **Entity Matrix** tab.

You may also re-try sending your query below.`,
        timestamp: Date.now(),
        suggestedFollowUps: [
          'What are the Indian Trademark classes for tax consulting and software development?',
          'What is Form INC-20A Commencement of Business deadline?',
          'What are the differences between a Private Limited company and an LLP?'
        ]
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages(INITIAL_MESSAGES);
    try {
      localStorage.removeItem('corebiq_chat_history');
    } catch {
      // ignore
    }
  };

  const handleQueryRedirect = (query: string) => {
    handleSendMessage(query);
  };

  return (
    <div className="min-h-[100dvh] w-full flex flex-col bg-[#F0F4F8] text-[#1F1F1F] selection:bg-blue-200">
      
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onClearChat={handleClearChat}
        messageCount={messages.length}
      />

      {/* Main View Area */}
      <main className="flex-1 w-full overflow-x-hidden">
        {activeTab === 'chat' && (
          <ChatView
            messages={messages}
            onSendMessage={handleSendMessage}
            isLoading={isLoading}
          />
        )}

        {activeTab === 'trademark' && (
          <TrademarkFinder onAskClassQuery={handleQueryRedirect} />
        )}

        {activeTab === 'deadlines' && (
          <DeadlinesCalendar onAskFilingQuery={handleQueryRedirect} />
        )}

        {activeTab === 'entities' && (
          <EntityMatrix onAskEntityQuery={handleQueryRedirect} />
        )}
      </main>

    </div>
  );
}
