import React, { useState } from 'react';
import { Globe, FileCheck, ShieldAlert, Compass, CheckCircle2, Search, ArrowRight, ExternalLink, Lock } from 'lucide-react';
import { hapticEngine } from '../../utils/hapticUtils';

export interface ClearanceDoc {
  id: string;
  billOfLadingNo: string;
  vesselName: string;
  importerExporter: string;
  originPort: string;
  destinationPort: string;
  customsStatus: 'CLEARANCE_APPROVED' | 'PENDING_INSPECTION' | 'DUTY_CALCULATED';
  dutyAmountUsd: string;
  hashVerification: string;
}

const SAMPLE_CLEARANCES: ClearanceDoc[] = [
  {
    id: 'GATEWAY-881',
    billOfLadingNo: 'BL-MAERSK-9021',
    vesselName: 'M/V Poseidon Trader',
    importerExporter: 'Nordic Clean Energy / Global Logistics',
    originPort: 'Port of Singapore (SGSIN)',
    destinationPort: 'Port of Rotterdam (NLRTM)',
    customsStatus: 'CLEARANCE_APPROVED',
    dutyAmountUsd: '$14,250',
    hashVerification: '0x7f9a...3c21 (Valid IMO AEO)'
  },
  {
    id: 'GATEWAY-882',
    billOfLadingNo: 'BL-MSC-4410',
    vesselName: 'M/T Aegis Voyager',
    importerExporter: 'Euro-Asia Import AG',
    originPort: 'Fujairah Anchorage (AEFUJ)',
    destinationPort: 'Hamburg Port (DEHAM)',
    customsStatus: 'PENDING_INSPECTION',
    dutyAmountUsd: '$88,400',
    hashVerification: '0x4e21...12b9 (Awaiting PSC)'
  }
];

export const TradeGatewayPortalView: React.FC = () => {
  const [clearances] = useState<ClearanceDoc[]>(SAMPLE_CLEARANCES);
  const [searchBl, setSearchBl] = useState<string>('');
  const [cargoValueUsd, setCargoValueUsd] = useState<number>(250000);
  const [tariffPct, setTariffPct] = useState<number>(3.5);
  const [clearanceIssued, setClearanceIssued] = useState<boolean>(false);

  const calculatedDuty = (cargoValueUsd * (tariffPct / 100)).toLocaleString();

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-2xl space-y-4 font-mono text-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="space-y-0.5">
          <h3 className="text-xs font-bold text-white uppercase flex items-center space-x-2">
            <Globe className="w-4 h-4 text-cyan-400" />
            <span>Single-Window Maritime Trade Gateway & Customs Clearance Portal</span>
          </h3>
          <p className="text-[10px] text-slate-400 font-sans">
            Digital Bill of Lading (e-B/L) hash authentication, customs tariff duty calculation, and Port State Control (PSC) clearance authorization
          </p>
        </div>

        <span className="bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px] px-2.5 py-1 rounded font-bold">
          IMO FAL CONVENTION COMPLIANT
        </span>
      </div>

      {/* Customs Duty Tariff Calculator */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl space-y-3">
          <span className="text-xs font-bold text-cyan-300 flex items-center space-x-2 border-b border-slate-900 pb-2">
            <FileCheck className="w-4 h-4 text-cyan-400" />
            <span>Customs Import Tariff Duty Calculator</span>
          </span>

          <div className="space-y-3 font-sans">
            <div>
              <div className="flex justify-between text-[10px] font-mono text-slate-400 mb-1">
                <span>Declared Cargo CIF Value:</span>
                <span className="text-white font-bold">${cargoValueUsd.toLocaleString()} USD</span>
              </div>
              <input
                type="range"
                min="10000"
                max="5000000"
                step="10000"
                value={cargoValueUsd}
                onChange={(e) => {
                  setCargoValueUsd(parseFloat(e.target.value));
                  hapticEngine.trigger('click');
                }}
                className="w-full accent-cyan-400 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-[10px] font-mono text-slate-400 mb-1">
                <span>Tariff Code Duty Rate ({tariffPct}%):</span>
                <span className="text-emerald-400 font-bold">${calculatedDuty} USD</span>
              </div>
              <input
                type="range"
                min="0"
                max="15"
                step="0.5"
                value={tariffPct}
                onChange={(e) => {
                  setTariffPct(parseFloat(e.target.value));
                  hapticEngine.trigger('click');
                }}
                className="w-full accent-emerald-400 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Digital e-B/L Single Window Clearance Request */}
        <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl space-y-3">
          <span className="text-xs font-bold text-white flex items-center space-x-2 border-b border-slate-900 pb-2">
            <Lock className="w-4 h-4 text-emerald-400" />
            <span>Single-Window Port Entry Authorization</span>
          </span>

          {clearanceIssued ? (
            <div className="bg-emerald-950/80 border border-emerald-500 p-3 rounded-xl text-center space-y-1">
              <CheckCircle2 className="w-6 h-6 text-emerald-400 mx-auto" />
              <span className="text-xs font-bold text-emerald-200 block">CUSTOMS & PSC GATEWAY CLEARANCE APPROVED</span>
              <p className="text-[9px] text-emerald-300 font-sans">e-B/L digital hash verified with Port Authority berth reservation token.</p>
            </div>
          ) : (
            <div className="space-y-2 text-[10px]">
              <div className="bg-slate-900 p-2 rounded-xl border border-slate-800 flex justify-between">
                <span className="text-slate-400 font-sans">e-B/L Digital Cryptographic Hash:</span>
                <span className="text-cyan-300 font-mono font-bold">SHA256: 9f8a...4b12</span>
              </div>

              <button
                onClick={() => {
                  setClearanceIssued(true);
                  hapticEngine.trigger('success');
                }}
                className="w-full py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black rounded-xl text-xs shadow transition-all font-mono"
              >
                ISSUE SINGLE-WINDOW PORT CLEARANCE
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Active Clearance Documents Grid */}
      <div className="space-y-2">
        <span className="text-xs font-bold text-white block">Active Port Clearance Gateway Records</span>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {clearances.map((doc) => (
            <div key={doc.id} className="bg-slate-950 border border-slate-800 p-3.5 rounded-2xl space-y-2">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-xs font-bold text-white">{doc.billOfLadingNo}</h4>
                  <span className="text-[9px] text-slate-400 font-sans block">{doc.vesselName}</span>
                </div>
                <span className={`text-[8px] font-bold px-2 py-0.5 rounded ${
                  doc.customsStatus === 'CLEARANCE_APPROVED'
                    ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                    : 'bg-amber-950 text-amber-300 border border-amber-800'
                }`}>
                  {doc.customsStatus.replace(/_/g, ' ')}
                </span>
              </div>

              <div className="bg-slate-900/80 p-2 rounded-xl border border-slate-800 space-y-1 text-[9px]">
                <div className="flex justify-between">
                  <span className="text-slate-500">Route Lane:</span>
                  <span className="text-cyan-300 font-bold">{doc.originPort} → {doc.destinationPort}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Calculated Customs Duty:</span>
                  <span className="text-emerald-400 font-bold">{doc.dutyAmountUsd}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Verification Hash:</span>
                  <span className="text-slate-300 font-mono">{doc.hashVerification}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
