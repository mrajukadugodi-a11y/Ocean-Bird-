import React, { useState } from 'react';
import {
  MessageSquare,
  Send,
  Bot,
  User,
  Anchor,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  Clock,
  Building2,
  Ship,
  HelpCircle,
  FileText,
  AlertCircle
} from 'lucide-react';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
  category?: 'Berthing' | 'Customs' | 'Pilotage' | 'Hazmat' | 'General';
}

export const PortAuthorityChatbotView: React.FC = () => {
  const [inputQuery, setInputQuery] = useState('');
  const [selectedPort, setSelectedPort] = useState('Port of Singapore Authority (PSA)');

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'MSG-01',
      sender: 'bot',
      text: 'Ahoy Captain! I am the AI Harbormaster & Port Authority Virtual Assistant. How may I assist you with vessel berthing allocations, customs clearances, pilotage scheduling, or dangerous goods declarations today?',
      timestamp: '03:20 UTC',
      category: 'General'
    }
  ]);

  const QUICK_PROMPTS = [
    'Request Berthing Allocation at Pasir Panjang Terminal',
    'What are the IMO Dangerous Goods Class 3 declaration rules?',
    'Schedule Harbor Pilot for MV OceanBird tomorrow 08:00',
    'Customs clearance required documents for container transshipment'
  ];

  const handleSendQuery = (textToSend?: string) => {
    const query = textToSend || inputQuery;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: `MSG-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputQuery('');

    // AI Response simulation
    setTimeout(() => {
      let botResponseText = '';
      const lower = query.toLowerCase();

      if (lower.includes('berth') || lower.includes('terminal')) {
        botResponseText = `⚓ [PORT AUTHORITY HARBORMASTER]\nBerthing pre-approval for ${selectedPort}:\n• Designated Berth: PPT-08 (Pasir Panjang Container Terminal)\n• Estimated Quay Time: 2026-08-10 06:00 UTC\n• Draft Clearance: Minimum 16.5m depth confirmed.\nPlease confirm tugboat assistance requirements.`;
      } else if (lower.includes('pilot') || lower.includes('schedule')) {
        botResponseText = `👨‍✈️ [HARBOR PILOTAGE DISPATCH]\nHarbor Pilot dispatch reserved for 08:00 UTC:\n• Boarding Station: Alpha Pilot Station (01° 12.4' N, 103° 50.1' E)\n• Radio Channel: VHF Ch. 12 (PSA Port Control)\n• Pre-boarding checklist sent to Master email.`;
      } else if (lower.includes('customs') || lower.includes('document')) {
        botResponseText = `📜 [PORT CUSTOMS & IMMIGRATION CLEARANCE]\nRequired transshipment manifest submissions:\n1. IMO FAL Form 1 (General Declaration)\n2. Crew List (FAL Form 5) + Digital CDC Numbers\n3. Cargo Manifest (FAL Form 2)\n4. Maritime Health Declaration (FAL Form 7)\nStatus: E-filing portal ready!`;
      } else if (lower.includes('dangerous') || lower.includes('hazmat') || lower.includes('imo')) {
        botResponseText = `⚠️ [DANGEROUS GOODS SAFETY CONTROL]\nIMO DG Class 3 (Flammable Liquids) Rules:\n• Minimum 24-hour advance electronic notification required.\n• Segregation Code: Stowage Category B.\n• Emergency Response Sheet (ERS) must be attached to cargo manifest.`;
      } else {
        botResponseText = `🚢 [PORT AUTHORITY AI ASSISTANT]\nThank you for contacting ${selectedPort}. Your request has been logged into the Port Community System (PCS). VHF Channel 12 is active for emergency harbormaster voice communications.`;
      }

      const botMsg: ChatMessage = {
        id: `MSG-BOT-${Date.now()}`,
        sender: 'bot',
        text: botResponseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        category: 'Berthing'
      };

      setMessages(prev => [...prev, botMsg]);
    }, 1000);
  };

  return (
    <div className="space-y-6 text-slate-100 font-sans p-4 sm:p-6 bg-slate-950 min-h-screen">
      {/* HEADER BANNER */}
      <div className="bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 border border-sky-500/30 rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <Bot className="w-64 h-64 text-sky-400" />
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-sky-500/20 text-sky-300 border border-sky-500/30 flex items-center space-x-1.5">
                <Anchor className="w-3.5 h-3.5 text-sky-400" />
                <span>AI HARBORMASTER & PORT COMMUNITY SYSTEM</span>
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                24/7 LIVE HARBOR DISPATCH
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Port Authority AI Chatbot & Harbormaster Portal</h1>
            <p className="text-slate-300 text-xs sm:text-sm max-w-2xl font-mono">
              Instant AI port assistance for berthing permissions, customs e-clearance, harbor pilot scheduling, dangerous goods declarations, and anchorage rules.
            </p>
          </div>

          <div className="flex items-center space-x-2 font-mono text-xs shrink-0">
            <select
              value={selectedPort}
              onChange={(e) => setSelectedPort(e.target.value)}
              className="bg-slate-950 text-white font-bold p-3 rounded-2xl border border-sky-500/30 focus:outline-none"
            >
              <option value="Port of Singapore Authority (PSA)">Port of Singapore Authority (PSA)</option>
              <option value="Port of Rotterdam Authority">Port of Rotterdam Authority</option>
              <option value="Jebel Ali Port Authority Dubai">Jebel Ali Port Authority Dubai</option>
              <option value="Port of Hamburg Germany">Port of Hamburg Germany</option>
            </select>
          </div>
        </div>
      </div>

      {/* CHAT INTERFACE */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-xl max-w-4xl mx-auto font-mono text-xs">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2">
            <Bot className="w-5 h-5 text-sky-400" />
            <span className="font-bold text-white text-sm">{selectedPort} Harbormaster AI</span>
          </div>
          <span className="text-emerald-400 text-xs font-bold flex items-center space-x-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>VHF Ch 12 Synced</span>
          </span>
        </div>

        {/* QUICK PROMPTS */}
        <div className="flex flex-wrap gap-2 pt-1">
          {QUICK_PROMPTS.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSendQuery(prompt)}
              className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 hover:border-sky-500/40 text-[11px] transition-all"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* MESSAGES CONTAINER */}
        <div className="space-y-4 max-h-96 overflow-y-auto p-4 bg-slate-950 rounded-2xl border border-slate-800/80">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start space-x-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'bot' && (
                <div className="w-8 h-8 rounded-full bg-sky-500/20 border border-sky-500/30 flex items-center justify-center text-sky-400 shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div className={`p-4 rounded-2xl max-w-lg space-y-1 ${
                msg.sender === 'user'
                  ? 'bg-sky-500 text-slate-950 font-sans font-medium'
                  : 'bg-slate-900 border border-slate-800 text-slate-200 font-sans whitespace-pre-wrap'
              }`}>
                <p className="text-xs leading-relaxed">{msg.text}</p>
                <span className={`text-[9px] block text-right font-mono ${msg.sender === 'user' ? 'text-slate-900/70' : 'text-slate-500'}`}>
                  {msg.timestamp}
                </span>
              </div>

              {msg.sender === 'user' && (
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* INPUT BOX */}
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Type your harbormaster or customs query (e.g. berthing, pilotage, FAL forms)..."
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendQuery()}
            className="flex-1 bg-slate-950 text-white font-mono p-3 rounded-2xl border border-slate-800 focus:outline-none focus:border-sky-400 text-xs"
          />
          <button
            onClick={() => handleSendQuery()}
            className="px-5 py-3 rounded-2xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold uppercase transition-all shadow-md flex items-center space-x-1.5 shrink-0"
          >
            <Send className="w-4 h-4" />
            <span>SEND</span>
          </button>
        </div>
      </div>
    </div>
  );
};
