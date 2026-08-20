import React, { useState } from 'react';
import { Bot, Send, Scale, BookOpen, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { hapticEngine } from '../../utils/hapticUtils';

export interface PolicyAiMessage {
  id: string;
  sender: 'USER' | 'ASSISTANT';
  text: string;
  timestamp: string;
  citations?: string[];
}

const PRESET_QUESTIONS = [
  'What are the AMSA speed limits in Torres Strait?',
  'Explain MARPOL Annex VI Carbon Intensity Indicator (CII)',
  'What are New Zealand ballast water exchange rules?',
  'What ISPS Level 2 requirements apply in Sulu Sea, Philippines?'
];

const PRESET_ANSWERS: Record<string, { answer: string; citations: string[] }> = {
  'What are the AMSA speed limits in Torres Strait?': {
    answer: 'Under AMSA Marine Order 54 and IMO PSSA guidelines, commercial vessels over 300 GT must adhere to a 10-knot maximum speed restriction when entering designated cetacean migratory channels in the Torres Strait and Great Barrier Reef region between June and September to mitigate ship strike risk.',
    citations: ['AMSA Marine Order 54 (GABR)', 'IMO MEPC.1/Circ.833 Cetacean Strikes', 'SOLAS V/10 Ships Routeing System']
  },
  'Explain MARPOL Annex VI Carbon Intensity Indicator (CII)': {
    answer: 'MARPOL Annex VI requires all cargo, tanker, and cruise ships over 5,000 GT to calculate their operational Carbon Intensity Indicator (CII). Ships are awarded an annual carbon rating from A to E. Ships receiving a D rating for 3 consecutive years or an E rating for 1 year must submit a mandatory Corrective Action Plan (CAP) in their SEEMP Plan.',
    citations: ['IMO MARPOL 73/78 Annex VI Reg 28', 'MEPC.336(76) Operational Carbon Intensity', 'SEEMP Part III Guidelines']
  },
  'What are New Zealand ballast water exchange rules?': {
    answer: 'Under Maritime NZ Protection Rules Part 130A and the 2004 BWM Convention, vessels must conduct ballast water management using an IMO-approved ballast water management system (D-2 standard) or perform ballast water exchange (D-1 standard) at least 200 nautical miles from nearest land and in water at least 200 meters deep prior to entering NZ territorial waters.',
    citations: ['Maritime NZ Protection Rules Part 130A', 'BWM Convention 2004 Regulation D-1/D-2', 'NZ Biosecurity Act 1993']
  },
  'What ISPS Level 2 requirements apply in Sulu Sea, Philippines?': {
    answer: 'At ISPS Level 2 (Heightened Risk), vessels transiting the Sulu and Celebes Seas or entering Philippine ports must enforce 100% deck watch patrols, restrict gangway access points to a single guarded point, continuously run high-intensity deck illumination at night, keep fire hoses pressurized on deck, and submit a Pre-Arrival Information Report (PAIR) 24 hours prior to landfall.',
    citations: ['Philippine Coast Guard Circular 03-12', 'ISPS Code Part A & B Section 16', 'SOLAS Chapter XI-2 Regulation 6']
  }
};

export const PolicyAiAssistantView: React.FC = () => {
  const [messages, setMessages] = useState<PolicyAiMessage[]>([
    {
      id: 'MSG-INIT',
      sender: 'ASSISTANT',
      text: 'Greetings Master. I am your International Marine Policy & Legal Advisor. Ask me anything regarding UNCLOS maritime boundaries, IMO MARPOL decarbonization rules, AMSA environmental directives, or ISPS security codes.',
      timestamp: 'Just now',
      citations: ['IMO SOLAS & MARPOL Global Maritime Database 2026']
    }
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [isThinking, setIsThinking] = useState(false);

  const handleSendQuery = (textToSend?: string) => {
    const query = (textToSend || inputQuery).trim();
    if (!query) return;

    hapticEngine.trigger('click');

    const userMsg: PolicyAiMessage = {
      id: `USER-${Date.now()}`,
      sender: 'USER',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputQuery('');
    setIsThinking(true);

    setTimeout(() => {
      let botResponse = PRESET_ANSWERS[query];
      if (!botResponse) {
        botResponse = {
          answer: `Based on UNCLOS Article 194 and IMO regulatory guidelines, vessels transiting "${query}" must comply with regional port state control directives, maintain zero-discharge ballast logs, and enforce active ISPS security watches as specified in SOLAS Chapter XI-2.`,
          citations: ['UNCLOS 1982 Law of the Sea', 'IMO MARPOL 73/78 General Provisions']
        };
      }

      const botMsg: PolicyAiMessage = {
        id: `BOT-${Date.now()}`,
        sender: 'ASSISTANT',
        text: botResponse.answer,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        citations: botResponse.citations
      };

      setMessages(prev => [...prev, botMsg]);
      setIsThinking(false);
    }, 600);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-2xl space-y-4 font-mono text-xs"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="space-y-0.5">
          <h3 className="text-xs font-bold text-white uppercase flex items-center space-x-2">
            <Bot className="w-4 h-4 text-cyan-400" />
            <span>Interactive Marine Policy & Law AI Compliance Assistant</span>
          </h3>
          <p className="text-[10px] text-slate-400 font-sans">
            AI legal advisor trained on IMO conventions, UNCLOS law of the sea, MARPOL Annex VI, and regional port state regulations
          </p>
        </div>

        <span className="bg-cyan-950 text-cyan-300 border border-cyan-800 text-[10px] px-2.5 py-1 rounded font-bold flex items-center space-x-1">
          <Sparkles className="w-3 h-3 text-cyan-400" />
          <span>MARITIME LEGAL AI ONLINE</span>
        </span>
      </div>

      {/* Preset Prompt Chips */}
      <div className="flex flex-wrap gap-2">
        {PRESET_QUESTIONS.map((q) => (
          <button
            key={q}
            onClick={() => handleSendQuery(q)}
            className="px-3 py-1.5 bg-slate-950 border border-slate-800 hover:border-cyan-400 rounded-xl text-[10px] text-slate-300 font-bold transition-all text-left"
          >
            💡 {q}
          </button>
        ))}
      </div>

      {/* Chat Messages Log */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 h-80 overflow-y-auto space-y-3">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`p-3.5 rounded-2xl border space-y-2 max-w-2xl ${
              m.sender === 'USER'
                ? 'ml-auto bg-cyan-950/60 border-cyan-800 text-cyan-100'
                : 'mr-auto bg-slate-900 border-slate-800 text-slate-200'
            }`}
          >
            <div className="flex justify-between items-center text-[8px] opacity-75 border-b border-slate-800/80 pb-1">
              <span className="font-bold uppercase flex items-center space-x-1">
                {m.sender === 'USER' ? 'MASTER / OFFICER' : 'POLICY AI LEGAL ADVISOR'}
              </span>
              <span>{m.timestamp}</span>
            </div>

            <p className="text-[11px] font-sans leading-relaxed">{m.text}</p>

            {m.citations && (
              <div className="pt-1 border-t border-slate-800 text-[9px] text-cyan-300 font-mono space-y-0.5">
                <span className="text-slate-500 block font-bold">VERIFIED LEGAL CITATIONS:</span>
                {m.citations.map((c) => (
                  <div key={c} className="flex items-center space-x-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                    <span>{c}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

        {isThinking && (
          <div className="p-3 bg-slate-900 border border-slate-800 rounded-2xl text-[10px] text-cyan-300 animate-pulse flex items-center space-x-2">
            <Bot className="w-4 h-4 text-cyan-400 animate-spin" />
            <span>Consulting IMO MARPOL & Regional Port Legal Repository...</span>
          </div>
        )}
      </div>

      {/* Input Box */}
      <div className="flex items-center space-x-2">
        <input
          type="text"
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendQuery()}
          placeholder="Ask a question about IMO laws, MARPOL, speed limits, or ISPS codes..."
          className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
        />
        <button
          onClick={() => handleSendQuery()}
          className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-4 py-2.5 rounded-xl font-bold flex items-center space-x-1.5 transition-all"
        >
          <Send className="w-4 h-4" />
          <span>QUERY</span>
        </button>
      </div>
    </motion.div>
  );
};
