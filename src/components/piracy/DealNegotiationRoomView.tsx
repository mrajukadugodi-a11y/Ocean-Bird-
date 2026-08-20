import React, { useState } from 'react';
import { GitMerge, DollarSign, FileText, CheckCircle2, AlertCircle, Send, Users, ShieldCheck, Clock } from 'lucide-react';
import { hapticEngine } from '../../utils/hapticUtils';

export interface NegotiationClause {
  id: string;
  clauseTitle: string;
  buyerOffer: string;
  sellerCounter: string;
  agreedValue: string | null;
  status: 'PENDING' | 'ACCEPTED' | 'COUNTERED';
}

export const DealNegotiationRoomView: React.FC = () => {
  const [clauses, setClauses] = useState<NegotiationClause[]>([
    {
      id: 'CLAUSE-01',
      clauseTitle: 'Purchase Price (USD)',
      buyerOffer: '$38,500,000',
      sellerCounter: '$41,000,000',
      agreedValue: '$39,800,000',
      status: 'ACCEPTED'
    },
    {
      id: 'CLAUSE-02',
      clauseTitle: 'Deposit Percentage & Escrow Agent',
      buyerOffer: '10% ($3.98M) in London Escrow',
      sellerCounter: '10% ($3.98M) in Singapore Escrow',
      agreedValue: '10% ($3.98M) in London Escrow',
      status: 'ACCEPTED'
    },
    {
      id: 'CLAUSE-03',
      clauseTitle: 'Delivery Location & Cancelling Date',
      buyerOffer: 'Rotterdam Anchorage / 30 Nov 2026',
      sellerCounter: 'Singapore Bunkering Anchorage / 15 Dec 2026',
      agreedValue: null,
      status: 'COUNTERED'
    }
  ]);

  const [counterInput, setCounterInput] = useState<string>('');

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-2xl space-y-4 font-mono text-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="space-y-0.5">
          <h3 className="text-xs font-bold text-white uppercase flex items-center space-x-2">
            <GitMerge className="w-4 h-4 text-cyan-400" />
            <span>Interactive Maritime Vessel S&P Deal & Charter Negotiation Room</span>
          </h3>
          <p className="text-[10px] text-slate-400 font-sans">
            Counterparty term sheet negotiations, BIMCO MOA clause agreement tracking, and real-time deal closing workflow
          </p>
        </div>

        <span className="bg-amber-950 text-amber-300 border border-amber-800 text-[10px] px-2.5 py-1 rounded font-bold flex items-center space-x-1">
          <Clock className="w-3 h-3" />
          <span>DEAL STATUS: IN ACTIVE NEGOTIATION</span>
        </span>
      </div>

      <div className="space-y-3">
        {clauses.map((c) => (
          <div key={c.id} className="bg-slate-950 border border-slate-800 p-4 rounded-2xl space-y-2">
            <div className="flex justify-between items-center border-b border-slate-900 pb-2">
              <h4 className="text-xs font-bold text-white">{c.clauseTitle}</h4>
              <span className={`text-[8px] font-bold px-2 py-0.5 rounded ${
                c.status === 'ACCEPTED'
                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                  : 'bg-amber-950 text-amber-300 border border-amber-800'
              }`}>
                {c.status}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[10px] font-sans">
              <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                <span className="text-slate-500 font-mono text-[8px] block">BUYER PROPOSAL:</span>
                <span className="text-slate-200 font-bold">{c.buyerOffer}</span>
              </div>
              <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                <span className="text-slate-500 font-mono text-[8px] block">SELLER COUNTER:</span>
                <span className="text-cyan-300 font-bold">{c.sellerCounter}</span>
              </div>
              <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                <span className="text-slate-500 font-mono text-[8px] block">FINAL AGREED TERM:</span>
                <span className={`font-bold ${c.agreedValue ? 'text-emerald-400' : 'text-slate-500 italic'}`}>
                  {c.agreedValue || 'Awaiting Mutual Consensus'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
