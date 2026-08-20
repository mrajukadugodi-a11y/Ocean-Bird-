import React, { useState } from 'react';
import { GitMerge, CheckCircle2, Clock, AlertTriangle, ArrowRight, FileCheck, Send, ShieldCheck, Plus, ExternalLink } from 'lucide-react';
import { hapticEngine } from '../../utils/hapticUtils';

export interface DealInquiry {
  id: string;
  vesselName: string;
  buyerCompany: string;
  sellerBroker: string;
  dealType: 'MOA_PURCHASE' | 'TIME_CHARTER' | 'BAREBOAT_LEASE' | 'LENDING_FINANCING';
  dealValueUsd: string;
  currentStage: 'INQUIRY_RECEIVED' | 'KYC_SANCTION_CHECK' | 'LOI_EXECUTED' | 'ESCROW_DEPOSIT' | 'CLASS_INSPECTION' | 'MOA_CLOSING';
  updatedAt: string;
  assignedAgent: string;
}

const INITIAL_INQUIRIES: DealInquiry[] = [
  {
    id: 'DEAL-901',
    vesselName: 'M/V Poseidon Trader',
    buyerCompany: 'Pacific Ocean Lines Ltd',
    sellerBroker: 'Clarksons Platou Brokers',
    dealType: 'MOA_PURCHASE',
    dealValueUsd: '$48,500,000',
    currentStage: 'CLASS_INSPECTION',
    updatedAt: '2026-08-07 10:30 UTC',
    assignedAgent: 'Capt. Jonathan Vance'
  },
  {
    id: 'DEAL-902',
    vesselName: 'M/Y Solitude Superyacht',
    buyerCompany: 'Riviera Luxury Charters NV',
    sellerBroker: 'Monaco Luxury Yacht Brokers',
    dealType: 'BAREBOAT_LEASE',
    dealValueUsd: '$380,000 / Wk',
    currentStage: 'ESCROW_DEPOSIT',
    updatedAt: '2026-08-07 09:15 UTC',
    assignedAgent: 'Elena Rostova'
  },
  {
    id: 'DEAL-903',
    vesselName: 'F/V Arctic Deep Trawler',
    buyerCompany: 'Nordic Deepsea Fisheries AS',
    sellerBroker: 'Nordic Fisheries Ship Sales',
    dealType: 'MOA_PURCHASE',
    dealValueUsd: '$19,200,000',
    currentStage: 'KYC_SANCTION_CHECK',
    updatedAt: '2026-08-06 14:00 UTC',
    assignedAgent: 'Hassan Al-Maktoum'
  }
];

const STAGES_LIST = [
  { id: 'INQUIRY_RECEIVED', name: '1. Inquiry Received' },
  { id: 'KYC_SANCTION_CHECK', name: '2. KYC & Sanctions' },
  { id: 'LOI_EXECUTED', name: '3. LOI Executed' },
  { id: 'ESCROW_DEPOSIT', name: '4. Escrow Deposit' },
  { id: 'CLASS_INSPECTION', name: '5. Class Inspection' },
  { id: 'MOA_CLOSING', name: '6. MOA Closing' }
];

export const InquiryWorkflowManagerView: React.FC = () => {
  const [inquiries, setInquiries] = useState<DealInquiry[]>(INITIAL_INQUIRIES);
  const [selectedDeal, setSelectedDeal] = useState<DealInquiry | null>(null);
  const [isNewDealModalOpen, setIsNewDealModalOpen] = useState<boolean>(false);

  const handleAdvanceStage = (dealId: string) => {
    hapticEngine.trigger('success');
    setInquiries((prev) =>
      prev.map((d) => {
        if (d.id === dealId) {
          const currentIndex = STAGES_LIST.findIndex((s) => s.id === d.currentStage);
          if (currentIndex < STAGES_LIST.length - 1) {
            const nextStage = STAGES_LIST[currentIndex + 1].id as DealInquiry['currentStage'];
            return { ...d, currentStage: nextStage, updatedAt: 'Just now' };
          }
        }
        return d;
      })
    );
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-2xl space-y-4 font-mono text-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="space-y-0.5">
          <h3 className="text-xs font-bold text-white uppercase flex items-center space-x-2">
            <GitMerge className="w-4 h-4 text-cyan-400" />
            <span>Maritime Sales, Charter & Lending Inquiry Workflow Pipeline</span>
          </h3>
          <p className="text-[10px] text-slate-400 font-sans">
            End-to-end deal lifecycle management: KYC BIMCO sanctions screening, Escrow deposits, Class surveys, and MOA closing
          </p>
        </div>

        <button
          onClick={() => {
            setIsNewDealModalOpen(true);
            hapticEngine.trigger('click');
          }}
          className="px-3.5 py-1.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black rounded-xl text-xs flex items-center space-x-1.5 shadow transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>CREATE DEAL WORKFLOW</span>
        </button>
      </div>

      {/* Deal Pipeline Grid */}
      <div className="space-y-3">
        {inquiries.map((deal) => {
          const currentStageIndex = STAGES_LIST.findIndex((s) => s.id === deal.currentStage);

          return (
            <div
              key={deal.id}
              className="bg-slate-950 border border-slate-800 p-4 rounded-2xl space-y-3 hover:border-slate-700 transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-900 pb-2">
                <div>
                  <span className="text-[9px] text-cyan-400 font-bold block">{deal.id} • {deal.dealType.replace(/_/g, ' ')}</span>
                  <h4 className="text-sm font-bold text-white">{deal.vesselName}</h4>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="text-xs font-black text-emerald-400 bg-emerald-950/80 border border-emerald-800 px-2.5 py-0.5 rounded">
                    {deal.dealValueUsd}
                  </span>
                  <button
                    onClick={() => handleAdvanceStage(deal.id)}
                    className="px-3 py-1 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black rounded-lg text-[10px] shadow transition-all"
                  >
                    ADVANCE STAGE →
                  </button>
                </div>
              </div>

              {/* Workflow Stepper */}
              <div className="grid grid-cols-2 sm:grid-cols-6 gap-1 bg-slate-900/80 p-2 rounded-xl border border-slate-800/80">
                {STAGES_LIST.map((stage, idx) => {
                  const isPassed = idx < currentStageIndex;
                  const isCurrent = idx === currentStageIndex;

                  return (
                    <div
                      key={stage.id}
                      className={`p-1.5 rounded-lg text-[8px] font-bold text-center border transition-all ${
                        isCurrent
                          ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-black shadow'
                          : isPassed
                          ? 'bg-emerald-950 text-emerald-300 border-emerald-800/80'
                          : 'bg-slate-950/50 text-slate-500 border-slate-800/50'
                      }`}
                    >
                      {stage.name}
                    </div>
                  );
                })}
              </div>

              <div className="flex flex-col sm:flex-row justify-between text-[10px] text-slate-400 font-sans gap-1">
                <span>Buyer: <strong className="text-slate-200">{deal.buyerCompany}</strong></span>
                <span>Assigned Agent: <strong className="text-cyan-300 font-mono">{deal.assignedAgent}</strong></span>
                <span>Last Activity: <strong className="text-slate-300 font-mono">{deal.updatedAt}</strong></span>
              </div>
            </div>
          );
        })}
      </div>

      {/* New Deal Modal */}
      {isNewDealModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 font-mono text-xs">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h4 className="text-xs font-bold text-white uppercase">Initialize Maritime Inquiry Workflow</h4>
              <button
                onClick={() => setIsNewDealModalOpen(false)}
                className="text-slate-400 hover:text-white text-xs font-bold bg-slate-950 px-2 py-1 rounded-lg border border-slate-800"
              >
                CLOSE
              </button>
            </div>

            <div className="space-y-3 font-sans">
              <div>
                <label className="text-[10px] text-slate-400 font-mono block mb-1">VESSEL NAME & IMO:</label>
                <input
                  type="text"
                  placeholder="e.g. M/V Atlantic Queen Liner"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="text-[10px] text-slate-400 font-mono block mb-1">BUYER ORGANISATION:</label>
                <input
                  type="text"
                  placeholder="e.g. TransOceanic Global Lines"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <button
                onClick={() => {
                  hapticEngine.trigger('success');
                  setIsNewDealModalOpen(false);
                }}
                className="w-full py-2.5 bg-emerald-500 text-slate-950 font-black rounded-xl text-xs font-mono shadow"
              >
                START DEALS PIPELINE
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
