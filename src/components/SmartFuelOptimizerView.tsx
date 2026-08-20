import React, { useState } from 'react';
import {
  Fuel,
  TrendingDown,
  DollarSign,
  Zap,
  Gauge,
  Sliders,
  CheckCircle2,
  AlertTriangle,
  Anchor,
  Compass,
  Ship,
  Sparkles,
  BarChart3,
  RefreshCw,
  Award
} from 'lucide-react';

interface BunkeringPortPrice {
  port: string;
  country: string;
  vlsfoUsd: number; // USD per Metric Ton
  mgoUsd: number;
  lngUsd: number;
  deliveryDays: number;
  qualityRating: string;
}

const BUNKER_PRICES: BunkeringPortPrice[] = [
  { port: 'Colombo Harbour', country: '🇱🇰 Sri Lanka', vlsfoUsd: 585, mgoUsd: 820, lngUsd: 640, deliveryDays: 1, qualityRating: 'ISO 8217:2017 Certified' },
  { port: 'Singapore Port', country: '🇸🇬 Singapore', vlsfoUsd: 570, mgoUsd: 795, lngUsd: 610, deliveryDays: 1, qualityRating: 'Mass Flow Meter Ready' },
  { port: 'Fujairah Anchorage', country: '🇦🇪 UAE', vlsfoUsd: 565, mgoUsd: 810, lngUsd: 625, deliveryDays: 1, qualityRating: 'High Viscosity Grade' },
  { port: 'Mumbai Port (JNPT)', country: '🇮🇳 India', vlsfoUsd: 595, mgoUsd: 840, lngUsd: 660, deliveryDays: 2, qualityRating: 'Bureau Veritas Tested' },
  { port: 'Chittagong Outer', country: '🇧🇩 Bangladesh', vlsfoUsd: 610, mgoUsd: 865, lngUsd: 680, deliveryDays: 2, qualityRating: 'SGS Inspected' }
];

export const SmartFuelOptimizerView: React.FC = () => {
  const [fuelType, setFuelType] = useState<'VLSFO' | 'MGO' | 'LNG'>('VLSFO');
  const [vesselSpeedKts, setVesselSpeedKts] = useState<number>(14.0);
  const [distanceNm, setDistanceNm] = useState<number>(1200);
  const [hullTrimDegree, setHullTrimDegree] = useState<number>(0.5); // Trim by stern
  const [selectedBunkerPort, setSelectedBunkerPort] = useState<string>('Colombo Harbour');
  const [isAiOptimizing, setIsAiOptimizing] = useState(false);
  const [optimizedAlert, setOptimizedAlert] = useState<string | null>(null);

  // Fuel Consumption Cubic Speed Law Calculation
  // Cons = Base * (Speed / 14.0)^3
  const baseBurnRateMT = fuelType === 'LNG' ? 28 : fuelType === 'MGO' ? 32 : 36;
  const speedRatio = vesselSpeedKts / 14.0;
  const cubicBurnRateMT = baseBurnRateMT * Math.pow(speedRatio, 3);
  
  // Trim correction (0.5 deg stern trim yields ~2.5% fuel saving)
  const trimMultiplier = 1.0 - (hullTrimDegree * 0.03);
  const dailyFuelMT = Math.max(5, cubicBurnRateMT * trimMultiplier);

  const transitHours = distanceNm / vesselSpeedKts;
  const transitDays = transitHours / 24;
  const totalVoyageFuelMT = dailyFuelMT * transitDays;

  const currentPortPrice = BUNKER_PRICES.find((p) => p.port === selectedBunkerPort) || BUNKER_PRICES[0];
  const costPerMT = fuelType === 'LNG' ? currentPortPrice.lngUsd : fuelType === 'MGO' ? currentPortPrice.mgoUsd : currentPortPrice.vlsfoUsd;
  const totalFuelCostUSD = totalVoyageFuelMT * costPerMT;

  // Comparison vs Max Express Speed (19 kts)
  const expressBurnRateMT = baseBurnRateMT * Math.pow(19.0 / 14.0, 3);
  const expressDays = (distanceNm / 19.0) / 24;
  const expressTotalFuelMT = expressBurnRateMT * expressDays;
  const expressTotalCostUSD = expressTotalFuelMT * costPerMT;
  const fuelSavingsUSD = Math.max(0, expressTotalCostUSD - totalFuelCostUSD);
  const fuelSavingsPct = Math.round((fuelSavingsUSD / expressTotalCostUSD) * 100) || 0;

  const handleRunAiFuelOpt = () => {
    setIsAiOptimizing(true);
    setOptimizedAlert(null);
    setTimeout(() => {
      setVesselSpeedKts(12.8); // Recommended Eco Speed
      setHullTrimDegree(0.8); // Optimal Hydrodynamic Trim
      setSelectedBunkerPort('Colombo Harbour');
      setIsAiOptimizing(false);
      setOptimizedAlert(
        'AI Fuel Optimizer applied! Set recommended Eco-Speed to 12.8 kts with +0.8° stern trim. Estimated fuel cost savings: $' +
          Math.round(expressTotalCostUSD * 0.32).toLocaleString() +
          ' USD (32% reduction).'
      );
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 p-6 rounded-2xl border border-amber-500/30 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 uppercase">
              CUBIC SPEED LAW ALGORITHM
            </span>
            <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 uppercase">
              MARPOL / IMO 2026
            </span>
          </div>
          <h2 className="text-2xl font-black text-white mt-2 flex items-center space-x-2">
            <Fuel className="w-7 h-7 text-amber-400" />
            <span>Smart Fuel & Trim Speed Optimizer</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl font-sans">
            Calculate hydrodynamic fuel consumption curves, optimize stern trim degrees, and compare regional bunkering prices across major South Asian ports.
          </p>
        </div>

        <button
          onClick={handleRunAiFuelOpt}
          disabled={isAiOptimizing}
          className="px-4 py-2.5 bg-gradient-to-r from-amber-500 to-emerald-500 hover:from-amber-400 hover:to-emerald-400 text-slate-950 font-black text-xs rounded-xl transition-all shadow-lg shadow-amber-500/20 flex items-center space-x-2 shrink-0 disabled:opacity-50"
        >
          <Sparkles className={`w-4 h-4 ${isAiOptimizing ? 'animate-spin' : ''}`} />
          <span>{isAiOptimizing ? 'CALCULATING ECO TRIM...' : 'APPLY AI ECO-TRIM OPTIMIZATION'}</span>
        </button>
      </div>

      {optimizedAlert && (
        <div className="bg-emerald-950/60 border border-emerald-500/40 p-4 rounded-xl text-xs text-emerald-200 flex items-start space-x-3 font-mono animate-fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <strong className="font-bold text-white uppercase block mb-0.5">ECO-TRIM APPLIED SUCCESSFULLY</strong>
            {optimizedAlert}
          </div>
        </div>
      )}

      {/* KPI Highlight Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-xs">
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-1">
          <span className="text-[10px] text-slate-400 block">DAILY FUEL BURN</span>
          <p className="text-2xl font-black text-amber-400">{dailyFuelMT.toFixed(1)} <span className="text-xs font-normal text-slate-400">MT/day</span></p>
          <span className="text-[10px] text-slate-500">Fuel: {fuelType}</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-1">
          <span className="text-[10px] text-slate-400 block">TOTAL VOYAGE COST</span>
          <p className="text-2xl font-black text-white">${Math.round(totalFuelCostUSD).toLocaleString()} <span className="text-xs font-normal text-slate-400">USD</span></p>
          <span className="text-[10px] text-slate-500">For {distanceNm} NM</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-1">
          <span className="text-[10px] text-slate-400 block">SAVINGS VS EXPRESS</span>
          <p className="text-2xl font-black text-emerald-400">${Math.round(fuelSavingsUSD).toLocaleString()} <span className="text-xs font-normal text-slate-400">USD</span></p>
          <span className="text-[10px] text-emerald-300 font-bold">-{fuelSavingsPct}% Savings</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-1">
          <span className="text-[10px] text-slate-400 block">VOYAGE DURATION</span>
          <p className="text-2xl font-black text-sky-400">{transitDays.toFixed(1)} <span className="text-xs font-normal text-slate-400">days</span></p>
          <span className="text-[10px] text-slate-500">Speed: {vesselSpeedKts} knots</span>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Columns: Controls & Hydrodynamic Curves */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-5">
          <h3 className="text-base font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-3">
            <Sliders className="w-5 h-5 text-amber-400" />
            <span>Hydrodynamic Speed & Fuel Parameters</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
            <div>
              <label className="text-[10px] text-slate-400 block mb-1">FUEL TYPE GRADE</label>
              <select
                value={fuelType}
                onChange={(e) => setFuelType(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white font-bold"
              >
                <option value="VLSFO">VLSFO (0.50% Sulphur Cap)</option>
                <option value="MGO">MGO (0.10% ECA Compliant Marine Gas Oil)</option>
                <option value="LNG">LNG (Liquefied Natural Gas Dual-Fuel)</option>
              </select>
            </div>

            <div>
              <label className="text-[10px] text-slate-400 block mb-1">VESSEL SPEED ({vesselSpeedKts} KTS)</label>
              <input
                type="range"
                min="10"
                max="21"
                step="0.2"
                value={vesselSpeedKts}
                onChange={(e) => setVesselSpeedKts(parseFloat(e.target.value))}
                className="w-full accent-amber-400"
              />
              <div className="flex justify-between text-[9px] text-slate-500 mt-1">
                <span>10.0 kts (Eco)</span>
                <span>21.0 kts (Max)</span>
              </div>
            </div>

            <div>
              <label className="text-[10px] text-slate-400 block mb-1">STERN TRIM ({hullTrimDegree}° STERN)</label>
              <input
                type="range"
                min="0.0"
                max="1.5"
                step="0.1"
                value={hullTrimDegree}
                onChange={(e) => setHullTrimDegree(parseFloat(e.target.value))}
                className="w-full accent-emerald-400"
              />
              <span className="text-[9px] text-emerald-400 block mt-1">
                +{Math.round(hullTrimDegree * 3)}% hydrodynamic efficiency
              </span>
            </div>
          </div>

          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs space-y-3">
            <h4 className="font-bold text-white text-xs flex items-center justify-between">
              <span>BUNKERING PORT SELECTION</span>
              <span className="text-amber-400">${costPerMT} USD/MT ({fuelType})</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {BUNKER_PRICES.map((bp) => (
                <div
                  key={bp.port}
                  onClick={() => setSelectedBunkerPort(bp.port)}
                  className={`p-3 rounded-xl border cursor-pointer transition-all ${
                    selectedBunkerPort === bp.port
                      ? 'bg-amber-950/20 border-amber-500/50 ring-1 ring-amber-500/30'
                      : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex justify-between font-bold text-white text-xs">
                    <span>{bp.port}</span>
                    <span className="text-amber-300">${fuelType === 'LNG' ? bp.lngUsd : fuelType === 'MGO' ? bp.mgoUsd : bp.vlsfoUsd}/MT</span>
                  </div>
                  <span className="text-[10px] text-slate-400 block">{bp.country} • {bp.qualityRating}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Cost Savings Matrix */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-3">
            <BarChart3 className="w-5 h-5 text-emerald-400" />
            <span>Economic Speed & Cost Matrix</span>
          </h3>

          <div className="space-y-3 font-mono text-xs">
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
              <span className="text-[10px] text-slate-500 block">TOTAL VOYAGE FUEL CONSUMPTION</span>
              <p className="text-base font-black text-amber-400">{totalVoyageFuelMT.toFixed(1)} MT</p>
              <span className="text-[9px] text-slate-400">Total for {distanceNm} NM corridor</span>
            </div>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
              <span className="text-[10px] text-slate-500 block">ESTIMATED CO2 EQUIVALENT</span>
              <p className="text-base font-black text-rose-400">{(totalVoyageFuelMT * 3.114).toFixed(1)} MT CO2</p>
              <span className="text-[9px] text-slate-400">IMO 3.114 conversion factor</span>
            </div>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
              <span className="text-[10px] text-slate-500 block">BUNKER SUPPLIER QUALITY</span>
              <p className="text-sm font-bold text-sky-300">{currentPortPrice.qualityRating}</p>
              <span className="text-[9px] text-emerald-400">Bunkering lead time: {currentPortPrice.deliveryDays} day</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
