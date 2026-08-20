import React, { useState } from 'react';
import { FileText, Download, Printer, CheckCircle2, ShieldCheck, Landmark, DollarSign, Send } from 'lucide-react';
import { hapticEngine } from '../../utils/hapticUtils';

export const InquiryPdfGeneratorView: React.FC = () => {
  const [inquiryType, setInquiryType] = useState<string>('VESSEL_PURCHASE_MOA');
  const [vesselName, setVesselName] = useState<string>('M/V Poseidon Trader (Panamax Bulk)');
  const [targetPriceUsd, setTargetPriceUsd] = useState<string>('$38,500,000');
  const [buyerName, setBuyerName] = useState<string>('Atlantic Maritime Shipping Corp');
  const [isGenerated, setIsGenerated] = useState<boolean>(false);

  const handleGeneratePdf = () => {
    hapticEngine.trigger('success');
    setIsGenerated(true);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-2xl space-y-4 font-mono text-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="space-y-0.5">
          <h3 className="text-xs font-bold text-white uppercase flex items-center space-x-2">
            <FileText className="w-4 h-4 text-cyan-400" />
            <span>Automated Maritime Vessel Inquiry & BIMCO Contract PDF Generator</span>
          </h3>
          <p className="text-[10px] text-slate-400 font-sans">
            Instantly generate official BIMCO-format purchase inquiry term sheets, charter tenders, and memorandum of agreement (MOA) PDF proposals
          </p>
        </div>

        <button
          onClick={handleGeneratePdf}
          className="px-3.5 py-1.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black rounded-xl text-xs flex items-center space-x-1.5 shadow transition-all"
        >
          <Download className="w-4 h-4" />
          <span>GENERATE OFFICIAL PDF</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Form Inputs */}
        <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl space-y-3 font-sans">
          <span className="text-xs font-bold text-white font-mono block border-b border-slate-800 pb-2">Document Configuration Settings</span>

          <div>
            <label className="text-[10px] text-slate-400 font-mono block mb-1">DOCUMENT TYPE:</label>
            <select
              value={inquiryType}
              onChange={(e) => setInquiryType(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2 text-white focus:outline-none focus:border-cyan-500 text-xs font-mono"
            >
              <option value="VESSEL_PURCHASE_MOA">BIMCO SALEFORM Memorandum of Agreement (MOA)</option>
              <option value="TIME_CHARTER_TENDER">NYPE Time Charter Party Tender Proposal</option>
              <option value="PIRACY_ESCORT_RFP">Private Maritime Security (PMSC) Escort RFP</option>
            </select>
          </div>

          <div>
            <label className="text-[10px] text-slate-400 font-mono block mb-1">TARGET VESSEL / FLEET ASSET:</label>
            <input
              type="text"
              value={vesselName}
              onChange={(e) => setVesselName(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2 text-white focus:outline-none focus:border-cyan-500 text-xs font-mono"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[10px] text-slate-400 font-mono block mb-1">OFFER AMOUNT (USD):</label>
              <input
                type="text"
                value={targetPriceUsd}
                onChange={(e) => setTargetPriceUsd(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2 text-emerald-400 font-bold focus:outline-none focus:border-cyan-500 text-xs font-mono"
              />
            </div>
            <div>
              <label className="text-[10px] text-slate-400 font-mono block mb-1">BUYER ENTITY NAME:</label>
              <input
                type="text"
                value={buyerName}
                onChange={(e) => setBuyerName(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2 text-white focus:outline-none focus:border-cyan-500 text-xs font-mono"
              />
            </div>
          </div>
        </div>

        {/* Live Document Preview Box */}
        <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl flex flex-col justify-between space-y-3">
          <div className="space-y-2 border-b border-slate-800 pb-3">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[8px] text-cyan-400 font-bold block">LIVE PDF DOCUMENT DRAFT PREVIEW</span>
                <h4 className="text-xs font-bold text-white uppercase">{inquiryType.replace(/_/g, ' ')}</h4>
              </div>
              <span className="bg-emerald-950 text-emerald-300 border border-emerald-800 text-[8px] font-bold px-2 py-0.5 rounded">
                BIMCO APPROVED TEMPLATE
              </span>
            </div>

            <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 text-[10px] space-y-2 font-mono text-slate-300">
              <p className="font-bold text-white underline">OFFICIAL INQUIRY & TERM SHEET DRAFT</p>
              <p><span className="text-slate-500">Buyer Entity:</span> {buyerName}</p>
              <p><span className="text-slate-500">Subject Asset:</span> {vesselName}</p>
              <p><span className="text-slate-500">Indicative Price:</span> <span className="text-emerald-400 font-bold">{targetPriceUsd}</span></p>
              <p><span className="text-slate-500">Standard Terms:</span> Subject to BIMCO SALEFORM 2012 clauses, physical hull survey inspection, and clean escrow deposit of 10%.</p>
            </div>
          </div>

          <div className="flex space-x-2">
            <button
              onClick={() => {
                hapticEngine.trigger('click');
                window.print();
              }}
              className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-slate-300 font-bold rounded-xl text-xs border border-slate-800 flex items-center justify-center space-x-1.5 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>PRINT / SAVE PDF</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
