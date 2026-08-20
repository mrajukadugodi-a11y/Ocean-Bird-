import React, { useState } from 'react';
import { Send, CheckCircle2, FileText, Plus, ShieldCheck, Users, Mail, AlertTriangle } from 'lucide-react';
import { hapticEngine } from '../../utils/hapticUtils';

export interface BulkInquiryTender {
  id: string;
  tenderTitle: string;
  targetVesselTypes: string[];
  budgetUsdRange: string;
  brokersNotifiedCount: number;
  responsesReceived: number;
  status: 'DISPATCHED' | 'COLLECTING_QUOTES' | 'CLOSED';
}

const SAMPLE_BULK_TENDERS: BulkInquiryTender[] = [
  {
    id: 'TENDER-2026-01',
    tenderTitle: 'RFP: 3x Panamax Container Liners (Time Charter 12 Months)',
    targetVesselTypes: ['Container Ship (3,500 - 5,000 TEU)'],
    budgetUsdRange: '$28,000 - $35,000 / Day',
    brokersNotifiedCount: 12,
    responsesReceived: 8,
    status: 'COLLECTING_QUOTES'
  },
  {
    id: 'TENDER-2026-02',
    tenderTitle: 'Batch S&P Inquiry: 2x MR Product Tankers (BIMCO MOA Sale)',
    targetVesselTypes: ['Medium Range Product Tanker'],
    budgetUsdRange: '$38,000,000 - $45,000,000 / Ship',
    brokersNotifiedCount: 15,
    responsesReceived: 14,
    status: 'COLLECTING_QUOTES'
  }
];

export const BulkInquiryToolView: React.FC = () => {
  const [tenders, setTenders] = useState<BulkInquiryTender[]>(SAMPLE_BULK_TENDERS);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [tenderTitle, setTenderTitle] = useState<string>('');

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-2xl space-y-4 font-mono text-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="space-y-0.5">
          <h3 className="text-xs font-bold text-white uppercase flex items-center space-x-2">
            <Send className="w-4 h-4 text-cyan-400" />
            <span>Multi-Vessel Bulk RFP Inquiry & Brokerage Tender Dispatcher</span>
          </h3>
          <p className="text-[10px] text-slate-400 font-sans">
            Broadcast batch inquiries to top accredited shipbrokers, compare incoming quotation proposals, and track tender deadlines
          </p>
        </div>

        <button
          onClick={() => {
            setIsModalOpen(true);
            hapticEngine.trigger('click');
          }}
          className="px-3.5 py-1.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black rounded-xl text-xs flex items-center space-x-1.5 shadow transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>BROADCAST BULK RFP</span>
        </button>
      </div>

      <div className="space-y-3">
        {tenders.map((tender) => (
          <div key={tender.id} className="bg-slate-950 border border-slate-800 p-4 rounded-2xl space-y-2">
            <div className="flex justify-between items-start border-b border-slate-900 pb-2">
              <div>
                <span className="text-[9px] text-cyan-400 font-bold block">{tender.id}</span>
                <h4 className="text-xs font-bold text-white">{tender.tenderTitle}</h4>
              </div>
              <span className="bg-emerald-950 text-emerald-300 border border-emerald-800 text-[8px] font-bold px-2 py-0.5 rounded">
                {tender.responsesReceived} / {tender.brokersNotifiedCount} QUOTES RECEIVED
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[10px] font-sans">
              <div className="bg-slate-900/80 p-2 rounded-xl border border-slate-800 font-mono">
                <span className="text-slate-500 block">Target Vessel Spec:</span>
                <span className="text-slate-200 font-bold">{tender.targetVesselTypes.join(', ')}</span>
              </div>
              <div className="bg-slate-900/80 p-2 rounded-xl border border-slate-800 font-mono">
                <span className="text-slate-500 block">Budget Target:</span>
                <span className="text-emerald-400 font-bold">{tender.budgetUsdRange}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 font-mono text-xs">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h4 className="text-xs font-bold text-white uppercase">Broadcast Bulk Broker RFP</h4>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white text-xs font-bold bg-slate-950 px-2 py-1 rounded-lg border border-slate-800"
              >
                CLOSE
              </button>
            </div>

            <div className="space-y-3 font-sans">
              <div>
                <label className="text-[10px] text-slate-400 font-mono block mb-1">TENDER TITLE & REQUIREMENTS:</label>
                <input
                  type="text"
                  value={tenderTitle}
                  onChange={(e) => setTenderTitle(e.target.value)}
                  placeholder="e.g. Seeking 2x LNG Carriers for 3-Year Time Charter"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-white focus:outline-none focus:border-cyan-500 text-xs"
                />
              </div>

              <button
                onClick={() => {
                  hapticEngine.trigger('success');
                  setIsModalOpen(false);
                }}
                className="w-full py-2.5 bg-emerald-500 text-slate-950 font-black rounded-xl text-xs font-mono shadow"
              >
                DISPATCH TO ALL APPROVED SHIPBROKERS
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
