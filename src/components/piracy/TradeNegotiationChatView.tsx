import React, { useState } from 'react';
import { MessageSquare, Send, User, ShieldCheck, DollarSign, Clock, Bot, CheckCheck, Paperclip, Sparkles } from 'lucide-react';
import { hapticEngine } from '../../utils/hapticUtils';

export interface ChatMessage {
  id: string;
  senderName: string;
  senderRole: 'BUYER' | 'SHIPOWNER' | 'BROKER' | 'AI_ADVISOR';
  timestamp: string;
  content: string;
  proposalOfferUsd?: string;
  isAiSuggested?: boolean;
}

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'MSG-01',
    senderName: 'Capt. Hector Vance',
    senderRole: 'SHIPOWNER',
    timestamp: '09:14 AM',
    content: 'Good morning. We received your LOI for M/V Poseidon Trader. Our bottom line for a prompt delivery at Rotterdam is $40,500,000 USD.'
  },
  {
    id: 'MSG-02',
    senderName: 'Elena Rostova',
    senderRole: 'BUYER',
    timestamp: '09:22 AM',
    content: 'Thank you Capt. Vance. Based on recent Baltic Capesize index dips, our investment board approves $39,200,000 with 10% London escrow.',
    proposalOfferUsd: '$39,200,000'
  },
  {
    id: 'MSG-03',
    senderName: 'Sir Arthur Sterling',
    senderRole: 'BROKER',
    timestamp: '09:28 AM',
    content: 'Gentlemen, as the broker on record, I suggest splitting the difference at $39,850,000 with a 15-day cancelling clause for BIMCO Saleform 2012.'
  },
  {
    id: 'MSG-04',
    senderName: 'Maritime AI Negotiator',
    senderRole: 'AI_ADVISOR',
    timestamp: '09:30 AM',
    content: 'AI Valuation Analysis: $39,800,000 represents a fair market value yield (+12.4% ROI). Recommending buyer counter at $39,600,000 with owner covering underwater hull inspection.',
    isAiSuggested: true
  }
];

export const TradeNegotiationChatView: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [inputMsg, setInputMsg] = useState<string>('');
  const [activeRole, setActiveRole] = useState<'BUYER' | 'SHIPOWNER' | 'BROKER'>('BUYER');

  const handleSend = () => {
    if (!inputMsg.trim()) return;
    hapticEngine.trigger('click');
    const newMsg: ChatMessage = {
      id: `MSG-${Date.now()}`,
      senderName: activeRole === 'BUYER' ? 'Elena Rostova (Buyer)' : activeRole === 'SHIPOWNER' ? 'Capt. Vance (Owner)' : 'Sir Arthur Sterling (Broker)',
      senderRole: activeRole,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      content: inputMsg
    };
    setMessages((prev) => [...prev, newMsg]);
    setInputMsg('');
  };

  const handleQuickChip = (text: string) => {
    hapticEngine.trigger('click');
    setInputMsg(text);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-2xl space-y-4 font-mono text-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="space-y-0.5">
          <h3 className="text-xs font-bold text-white uppercase flex items-center space-x-2">
            <MessageSquare className="w-4 h-4 text-cyan-400" />
            <span>Real-Time Maritime Trade Counterparty Negotiation Chat Room</span>
          </h3>
          <p className="text-[10px] text-slate-400 font-sans">
            Secure encrypted counterparty chat log, instant counter-offer terms, and AI advisory recommendations
          </p>
        </div>

        <div className="flex items-center space-x-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800">
          {(['BUYER', 'SHIPOWNER', 'BROKER'] as const).map((role) => (
            <button
              key={role}
              onClick={() => {
                setActiveRole(role);
                hapticEngine.trigger('click');
              }}
              className={`px-2.5 py-1 rounded text-[9px] font-bold transition-all ${
                activeRole === role
                  ? 'bg-cyan-500 text-slate-950 font-black'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {role}
            </button>
          ))}
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 h-80 overflow-y-auto space-y-3">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`p-3 rounded-2xl border space-y-1 ${
              m.senderRole === 'AI_ADVISOR'
                ? 'bg-cyan-950/40 border-cyan-800 text-cyan-200'
                : m.senderRole === 'BUYER'
                ? 'bg-slate-900 border-slate-800 text-slate-200'
                : 'bg-slate-900/80 border-slate-800 text-slate-300'
            }`}
          >
            <div className="flex justify-between items-center text-[9px] font-mono border-b border-slate-800/80 pb-1">
              <span className={`font-bold flex items-center space-x-1 ${
                m.senderRole === 'AI_ADVISOR' ? 'text-cyan-400' : 'text-white'
              }`}>
                {m.senderRole === 'AI_ADVISOR' && <Sparkles className="w-3 h-3 text-cyan-400 inline" />}
                <span>{m.senderName}</span>
              </span>
              <span className="text-slate-500">{m.timestamp}</span>
            </div>

            <p className="text-[10px] font-sans leading-relaxed pt-1">{m.content}</p>

            {m.proposalOfferUsd && (
              <div className="mt-2 inline-flex items-center space-x-1 bg-emerald-950 text-emerald-300 border border-emerald-800 text-[9px] font-bold px-2 py-0.5 rounded">
                <DollarSign className="w-3 h-3" />
                <span>FORMAL OFFER: {m.proposalOfferUsd}</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* AI Quick Suggestion Chips */}
      <div className="flex flex-wrap gap-1.5 pt-1">
        <span className="text-[9px] text-slate-500 font-mono self-center mr-1">AI Counter Chips:</span>
        {[
          'Counter offer at $39,600,000 USD with hull inspection',
          'Accept 10% escrow in London account',
          'Request 20-day cancelling date extension'
        ].map((chip) => (
          <button
            key={chip}
            onClick={() => handleQuickChip(chip)}
            className="text-[8px] bg-slate-950 hover:bg-slate-800 text-cyan-300 border border-slate-800 px-2 py-1 rounded-lg transition-colors"
          >
            {chip}
          </button>
        ))}
      </div>

      {/* Input Box */}
      <div className="flex space-x-2">
        <input
          type="text"
          value={inputMsg}
          onChange={(e) => setInputMsg(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder={`Type negotiation message as ${activeRole}...`}
          className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 text-xs font-sans"
        />
        <button
          onClick={handleSend}
          className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black rounded-xl text-xs flex items-center space-x-1 transition-all shadow"
        >
          <Send className="w-3.5 h-3.5" />
          <span>SEND</span>
        </button>
      </div>
    </div>
  );
};
