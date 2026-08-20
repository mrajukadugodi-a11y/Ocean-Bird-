import React, { useState } from 'react';
import { Cpu, Sparkles, ShieldAlert, Package, AlertTriangle, CheckCircle2, ArrowRight, Zap, RefreshCw } from 'lucide-react';
import { hapticEngine } from '../../utils/hapticUtils';

export interface CargoAIAnalysis {
  manifestId: string;
  cargoType: string;
  theftTargetRiskScore: number;
  aiRecommendation: string;
  suggestedBayRelocation: string;
  thermalRiskStatus: 'STABLE' | 'WARNING' | 'CRITICAL';
}

const SAMPLE_ANALYSES: CargoAIAnalysis[] = [
  {
    manifestId: 'MSKU-882910-4 (Semiconductor Wafers)',
    cargoType: 'High-Tech Electronics',
    theftTargetRiskScore: 92,
    aiRecommendation: 'CRITICAL VALUE: Move to Tier-1 Armored Lower Hold 3. Activate dedicated micro-vibration tamper sensors.',
    suggestedBayRelocation: 'Transfer from Deck Bay 02 -> Interior Armored Hold 3',
    thermalRiskStatus: 'STABLE'
  },
  {
    manifestId: 'HLCU-902144-8 (Pharmaceutical Vaccines)',
    cargoType: 'Temperature Sensitive Cold Chain',
    theftTargetRiskScore: 84,
    aiRecommendation: 'REAPER COLD CHAIN RISK: Maintain dual redundant generator lines during high-speed evasion maneuvers.',
    suggestedBayRelocation: 'Maintain Reefer Hold 1 (Generator Line B Backup Active)',
    thermalRiskStatus: 'STABLE'
  },
  {
    manifestId: 'CMAU-410922-1 (Copper Cathodes)',
    cargoType: 'Raw Industrial Commodity',
    theftTargetRiskScore: 68,
    aiRecommendation: 'MODERATE PIRACY TARGET: Secure outer container latch with GPS geo-fenced smart seal.',
    suggestedBayRelocation: 'Main Deck Bay 04 (Position away from boarding ladders)',
    thermalRiskStatus: 'STABLE'
  }
];

export const CargoAISecurityAdvisor: React.FC = () => {
  const [selectedAnalysis, setSelectedAnalysis] = useState<CargoAIAnalysis>(SAMPLE_ANALYSES[0]);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [aiCustomPrompt, setAiCustomPrompt] = useState<string>('');
  const [customAiOutput, setCustomAiOutput] = useState<string | null>(null);

  const handleRunAiAnalysis = () => {
    hapticEngine.trigger('alert');
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setCustomAiOutput(
        `AI Manifest Analysis Complete: Evaluated 482 container units. Identified 3 high-tier targets ($24.0M combined value). Recommended 2 bay relocations to interior lower holds to minimize boarding theft risk.`
      );
    }, 1200);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-2xl space-y-4 font-mono text-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="space-y-0.5">
          <h3 className="text-xs font-bold text-white uppercase flex items-center space-x-2">
            <Cpu className="w-4 h-4 text-cyan-400" />
            <span>Cargo Security AI Intelligence & Target Risk Advisor</span>
          </h3>
          <p className="text-[10px] text-slate-400 font-sans">
            Neural model analyzing cargo theft susceptibility, optimal hold bay placement, and temperature integrity during piratical attacks
          </p>
        </div>

        <button
          onClick={handleRunAiAnalysis}
          disabled={isAnalyzing}
          className="px-3.5 py-1.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black rounded-xl text-xs flex items-center space-x-1.5 shadow-lg transition-all"
        >
          <Sparkles className={`w-3.5 h-3.5 ${isAnalyzing ? 'animate-spin' : ''}`} />
          <span>{isAnalyzing ? 'ANALYZING MANIFEST...' : 'RUN AI CARGO RISK AUDIT'}</span>
        </button>
      </div>

      {/* Cargo Selection Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        {SAMPLE_ANALYSES.map((item) => (
          <button
            key={item.manifestId}
            onClick={() => {
              setSelectedAnalysis(item);
              hapticEngine.trigger('click');
            }}
            className={`p-3 rounded-2xl border text-left transition-all space-y-1 ${
              selectedAnalysis.manifestId === item.manifestId
                ? 'bg-slate-950 border-cyan-400 shadow-md ring-1 ring-cyan-400'
                : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
            }`}
          >
            <span className="text-[10px] text-slate-400 font-bold block truncate">{item.manifestId}</span>
            <div className="flex justify-between items-center text-[11px]">
              <span className="text-white font-bold">{item.cargoType}</span>
              <span className="text-rose-400 font-black">{item.theftTargetRiskScore}/100 Risk</span>
            </div>
          </button>
        ))}
      </div>

      {/* Selected Cargo AI Insight Card */}
      <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl space-y-3">
        <div className="flex justify-between items-center border-b border-slate-900 pb-2">
          <span className="text-xs font-bold text-cyan-300 flex items-center space-x-1.5">
            <ShieldAlert className="w-4 h-4 text-rose-400" />
            <span>AI Risk Evaluation: {selectedAnalysis.manifestId}</span>
          </span>
          <span className="bg-rose-950 text-rose-300 border border-rose-800 text-[9px] px-2 py-0.5 rounded font-bold">
            THEFT SUSCEPTIBILITY: HIGH
          </span>
        </div>

        <div className="space-y-2 text-[11px]">
          <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800/80 space-y-1">
            <span className="text-[10px] text-slate-400 font-bold block uppercase">AI Strategic Recommendation:</span>
            <p className="text-slate-200 font-sans leading-relaxed">{selectedAnalysis.aiRecommendation}</p>
          </div>

          <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800/80 space-y-1">
            <span className="text-[10px] text-cyan-400 font-bold block uppercase">Recommended Bay Relocation Vector:</span>
            <span className="text-emerald-400 font-bold block">{selectedAnalysis.suggestedBayRelocation}</span>
          </div>
        </div>
      </div>

      {customAiOutput && (
        <div className="bg-cyan-950/80 border border-cyan-500/80 p-3.5 rounded-2xl text-[10px] text-cyan-200 font-mono space-y-1">
          <span className="font-bold text-cyan-300 block">AI Manifest Audit Log:</span>
          <p className="font-sans text-cyan-100">{customAiOutput}</p>
        </div>
      )}
    </div>
  );
};
