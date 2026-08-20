import React, { useState } from 'react';
import {
  Award,
  TreePine,
  Wind,
  CheckCircle2,
  Download,
  ShieldCheck,
  DollarSign,
  Sparkles,
  FileCheck,
  TrendingDown,
  Globe2,
  Sliders,
  Printer
} from 'lucide-react';

interface BlueCarbonProject {
  id: string;
  name: string;
  location: string;
  category: 'Mangrove Restoration' | 'Seaweed Kelp Farming' | 'Offshore Wind Farm' | 'Blue Carbon Wetland';
  usdPerTon: number;
  availableTons: number;
  verificationRegistry: string;
  impactSummary: string;
}

const BLUE_CARBON_PROJECTS: BlueCarbonProject[] = [
  {
    id: 'PRJ-MANGROVE-01',
    name: 'Sundarbans & Kalpitiya Coastal Mangrove Re-forestation',
    location: '🇱🇰 Sri Lanka & 🇧🇩 Bangladesh',
    category: 'Mangrove Restoration',
    usdPerTon: 18.5,
    availableTons: 125000,
    verificationRegistry: 'Verra VCS Standard #1982',
    impactSummary: 'Restores 450 hectares of tidal mangrove wetlands, protecting coastal communities and capturing 4x CO2 vs tropical forests.'
  },
  {
    id: 'PRJ-KELP-02',
    name: 'Maldives Atoll Deep Seaweed Carbon Sink',
    location: '🇲🇻 Maldives',
    category: 'Seaweed Kelp Farming',
    usdPerTon: 22.0,
    availableTons: 65000,
    verificationRegistry: 'Gold Standard Registry #8841',
    impactSummary: 'Cultivates macroalgae kelp beds sinking organic carbon into ocean sediments while lowering local ocean acidification.'
  },
  {
    id: 'PRJ-WIND-03',
    name: 'Gulf of Mannar Offshore Wind Clean Grid',
    location: '🇮🇳 India',
    category: 'Offshore Wind Farm',
    usdPerTon: 14.0,
    availableTons: 250000,
    verificationRegistry: 'UN CDM Registry #4401',
    impactSummary: 'Replaces coal power grid with 450MW offshore wind energy for maritime port operations.'
  }
];

interface OffsetCertificate {
  certificateId: string;
  vesselName: string;
  vesselImo: string;
  co2OffsetMT: number;
  totalCostUsd: number;
  projectName: string;
  issuedTimestamp: string;
  sha256Seal: string;
}

export const VoyageCarbonOffsetView: React.FC = () => {
  const [co2EmissionsMT, setCo2EmissionsMT] = useState<number>(120.0);
  const [selectedProjectId, setSelectedProjectId] = useState<string>(BLUE_CARBON_PROJECTS[0].id);
  const [offsetPercentage, setOffsetPercentage] = useState<number>(100); // 100% Net Zero
  const [vesselName, setVesselName] = useState<string>('M/V Ocean Eagle Monarch');
  const [vesselImo, setVesselImo] = useState<string>('IMO 9845120');
  const [issuedCertificates, setIssuedCertificates] = useState<OffsetCertificate[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const selectedProject = BLUE_CARBON_PROJECTS.find((p) => p.id === selectedProjectId) || BLUE_CARBON_PROJECTS[0];

  const targetOffsetTons = (co2EmissionsMT * (offsetPercentage / 100));
  const totalOffsetCostUsd = targetOffsetTons * selectedProject.usdPerTon;

  const handlePurchaseOffsetCert = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const timeNow = new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC';
      const hash = Array.from({ length: 64 }, () =>
        Math.floor(Math.random() * 16).toString(16)
      ).join('');

      const newCert: OffsetCertificate = {
        certificateId: `CERT-CO2-${Date.now().toString().slice(-5)}`,
        vesselName,
        vesselImo,
        co2OffsetMT: parseFloat(targetOffsetTons.toFixed(1)),
        totalCostUsd: parseFloat(totalOffsetCostUsd.toFixed(2)),
        projectName: selectedProject.name,
        issuedTimestamp: timeNow,
        sha256Seal: hash
      };

      setIssuedCertificates((prev) => [newCert, ...prev]);
      setIsProcessing(false);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 p-6 rounded-2xl border border-emerald-500/30 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 uppercase">
              IMO 2030 NET-ZERO CARBON CREDIT
            </span>
            <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-sky-500/20 text-sky-300 border border-sky-500/30 uppercase">
              EU ETS VERRA CERTIFIED
            </span>
          </div>
          <h2 className="text-2xl font-black text-white mt-2 flex items-center space-x-2">
            <Award className="w-7 h-7 text-emerald-400" />
            <span>Voyage Carbon Footprint & Blue Offset Registry</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl font-sans">
            Calculate voyage CO2 emissions, offset your maritime carbon footprint via verified regional blue carbon projects, and issue certified SHA-256 net-zero compliance badges.
          </p>
        </div>

        <button
          onClick={() => window.print()}
          className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-emerald-300 border border-emerald-500/30 rounded-xl font-mono text-xs font-bold transition-all flex items-center space-x-2 shrink-0"
        >
          <Printer className="w-4 h-4" />
          <span>PRINT CERTIFICATES</span>
        </button>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Columns: Carbon Calculator & Projects */}
        <div className="lg:col-span-2 space-y-6">
          {/* Carbon Calculator Box */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 font-mono text-xs">
            <h3 className="text-base font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-3">
              <Sliders className="w-5 h-5 text-emerald-400" />
              <span>Voyage Carbon Emission & Offset Target</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-[10px] text-slate-400 block mb-1">TOTAL VOYAGE CO2 (MT)</label>
                <input
                  type="number"
                  value={co2EmissionsMT}
                  onChange={(e) => setCo2EmissionsMT(parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white font-bold"
                />
              </div>

              <div>
                <label className="text-[10px] text-slate-400 block mb-1">OFFSET GOAL ({offsetPercentage}%)</label>
                <input
                  type="range"
                  min="10"
                  max="100"
                  step="5"
                  value={offsetPercentage}
                  onChange={(e) => setOffsetPercentage(parseInt(e.target.value))}
                  className="w-full accent-emerald-400"
                />
                <span className="text-emerald-400 font-bold block mt-1">
                  {offsetPercentage === 100 ? 'NET-ZERO COMPLIANT' : `${offsetPercentage}% REDUCTION`}
                </span>
              </div>

              <div>
                <label className="text-[10px] text-slate-400 block mb-1">VESSEL NAME & IMO</label>
                <input
                  type="text"
                  value={vesselName}
                  onChange={(e) => setVesselName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-white font-bold"
                />
              </div>
            </div>
          </div>

          {/* Selectable Verified Blue Carbon Projects */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center space-x-2">
              <TreePine className="w-5 h-5 text-teal-400" />
              <span>Verified South Asian Blue Carbon Projects</span>
            </h3>

            <div className="space-y-3 font-mono text-xs">
              {BLUE_CARBON_PROJECTS.map((p) => (
                <div
                  key={p.id}
                  onClick={() => setSelectedProjectId(p.id)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all space-y-2 ${
                    selectedProjectId === p.id
                      ? 'bg-slate-950 border-emerald-500/50 ring-1 ring-emerald-500/30'
                      : 'bg-slate-950/50 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] text-teal-400 font-bold bg-teal-500/10 px-2 py-0.5 rounded border border-teal-500/20">
                      {p.category}
                    </span>
                    <strong className="text-emerald-400 text-sm">${p.usdPerTon} USD / MT CO2</strong>
                  </div>

                  <h4 className="font-bold text-white text-sm">{p.name}</h4>
                  <p className="text-[11px] text-slate-400">{p.impactSummary}</p>
                  <span className="text-[10px] text-slate-500 block">Location: {p.location} • Registry: {p.verificationRegistry}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Checkout & Certificate Ledger */}
        <div className="space-y-6 font-mono text-xs">
          {/* Purchase Summary Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-3">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <span>Offset Credit Order Summary</span>
            </h3>

            <div className="space-y-2">
              <div className="flex justify-between text-slate-400">
                <span>TARGET CO2 OFFSET:</span>
                <strong className="text-emerald-400">{targetOffsetTons.toFixed(1)} MT CO2</strong>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>UNIT PRICE:</span>
                <strong className="text-white">${selectedProject.usdPerTon} USD / MT</strong>
              </div>
              <div className="pt-2 border-t border-slate-800 flex justify-between text-sm">
                <span className="font-bold text-white">TOTAL CERTIFICATE COST:</span>
                <strong className="text-emerald-400 text-base">${totalOffsetCostUsd.toFixed(2)} USD</strong>
              </div>
            </div>

            <button
              onClick={handlePurchaseOffsetCert}
              disabled={isProcessing || targetOffsetTons <= 0}
              className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-slate-950 font-black text-xs rounded-xl transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              <Sparkles className={`w-4 h-4 ${isProcessing ? 'animate-spin' : ''}`} />
              <span>{isProcessing ? 'PURCHASING BLUE CREDITS...' : 'PURCHASE & ISSUE CERTIFICATE'}</span>
            </button>
          </div>

          {/* Issued Certificate Log */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center space-x-2">
              <FileCheck className="w-5 h-5 text-teal-400" />
              <span>Issued Carbon Certificates ({issuedCertificates.length})</span>
            </h3>

            <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
              {issuedCertificates.map((c) => (
                <div key={c.certificateId} className="p-3 bg-slate-950 border border-emerald-500/30 rounded-xl space-y-1">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="text-emerald-400 font-bold">{c.certificateId}</span>
                    <span className="text-slate-500">{c.issuedTimestamp}</span>
                  </div>
                  <h5 className="font-bold text-white text-xs">{c.projectName}</h5>
                  <p className="text-[11px] text-slate-300">
                    Offset: <strong className="text-emerald-300">{c.co2OffsetMT} MT CO2</strong> • Total: ${c.totalCostUsd} USD
                  </p>
                  <span className="break-all text-[9px] text-slate-500 block">SHA-256: 0x{c.sha256Seal}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
