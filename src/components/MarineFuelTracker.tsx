import React, { useState } from 'react';
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Fuel,
  Ship,
  Compass,
  Anchor,
  HelpCircle,
  CheckCircle2,
  Calculator,
  Flame,
  Globe2,
  Info,
  MapPin,
  Send,
  Sparkles,
  BarChart3
} from 'lucide-react';

export interface BunkeringPortPrice {
  portId: string;
  portName: string;
  country: string;
  flag: string;
  vlsfoPriceUsdMt: number;
  vlsfoChange: number;
  lsmgoPriceUsdMt: number;
  lsmgoChange: number;
  hsfo380PriceUsdMt: number;
  hsfo380Change: number;
  lngBunkerUsdMt?: number;
  availabilityStatus: 'Abundant Supply' | 'Tight Stock' | 'Bunker Barge Delay';
  lastUpdated: string;
}

const BUNKERING_PORT_INDEX: BunkeringPortPrice[] = [
  {
    portId: 'singapore',
    portName: 'Singapore Maritime Hub',
    country: 'Singapore',
    flag: '🇸🇬',
    vlsfoPriceUsdMt: 598.50,
    vlsfoChange: -3.50,
    lsmgoPriceUsdMt: 742.00,
    lsmgoChange: 4.20,
    hsfo380PriceUsdMt: 462.10,
    hsfo380Change: -1.80,
    lngBunkerUsdMt: 685.00,
    availabilityStatus: 'Abundant Supply',
    lastUpdated: '01:30 UTC Today'
  },
  {
    portId: 'colombo',
    portName: 'Colombo Bunkering Terminal',
    country: 'Sri Lanka',
    flag: '🇱🇰',
    vlsfoPriceUsdMt: 618.00,
    vlsfoChange: 2.00,
    lsmgoPriceUsdMt: 765.00,
    lsmgoChange: -1.50,
    hsfo380PriceUsdMt: 485.00,
    hsfo380Change: 0.00,
    availabilityStatus: 'Abundant Supply',
    lastUpdated: '02:00 UTC Today'
  },
  {
    portId: 'mumbai',
    portName: 'Mumbai & JNPT Outer Anchorage',
    country: 'India',
    flag: '🇮🇳',
    vlsfoPriceUsdMt: 612.50,
    vlsfoChange: -2.10,
    lsmgoPriceUsdMt: 758.00,
    lsmgoChange: 1.80,
    hsfo380PriceUsdMt: 478.20,
    hsfo380Change: -0.90,
    availabilityStatus: 'Abundant Supply',
    lastUpdated: '01:45 UTC Today'
  },
  {
    portId: 'fujairah',
    portName: 'Fujairah Bunkering Hub',
    country: 'UAE',
    flag: '🇦🇪',
    vlsfoPriceUsdMt: 592.00,
    vlsfoChange: -4.00,
    lsmgoPriceUsdMt: 735.00,
    lsmgoChange: -2.00,
    hsfo380PriceUsdMt: 458.00,
    hsfo380Change: -3.20,
    lngBunkerUsdMt: 670.00,
    availabilityStatus: 'Abundant Supply',
    lastUpdated: '02:15 UTC Today'
  },
  {
    portId: 'chittagong',
    portName: 'Chittagong Outer Anchorage',
    country: 'Bangladesh',
    flag: '🇧🇩',
    vlsfoPriceUsdMt: 638.00,
    vlsfoChange: 5.50,
    lsmgoPriceUsdMt: 792.00,
    lsmgoChange: 6.00,
    hsfo380PriceUsdMt: 510.00,
    hsfo380Change: 2.10,
    availabilityStatus: 'Bunker Barge Delay',
    lastUpdated: '00:50 UTC Today'
  },
  {
    portId: 'karachi',
    portName: 'Karachi Port Trust & Bin Qasim',
    country: 'Pakistan',
    flag: '🇵🇰',
    vlsfoPriceUsdMt: 629.00,
    vlsfoChange: 1.20,
    lsmgoPriceUsdMt: 780.00,
    lsmgoChange: -0.50,
    hsfo380PriceUsdMt: 495.00,
    hsfo380Change: 1.00,
    availabilityStatus: 'Tight Stock',
    lastUpdated: '01:10 UTC Today'
  }
];

export const MarineFuelTracker: React.FC = () => {
  const [selectedPort, setSelectedPort] = useState<BunkeringPortPrice>(BUNKERING_PORT_INDEX[1]);

  // Fuel Consumption Calculator Inputs
  const [voyageDistanceNm, setVoyageDistanceNm] = useState<number>(1200); // Nautical Miles
  const [vesselSpeedKts, setVesselSpeedKts] = useState<number>(14.0); // Knots
  const [fuelType, setFuelType] = useState<'VLSFO' | 'LSMGO' | 'HSFO380'>('VLSFO');
  const [vesselEngineClass, setVesselEngineClass] = useState<'Container (Medium)' | 'Tanker (Suezmax)' | 'Bulk Carrier (Panamax)' | 'Fishery Trawler'>('Container (Medium)');

  // Spot Quote Inquiry Form
  const [quoteTons, setQuoteTons] = useState<number>(500);
  const [quoteSubmitted, setQuoteSubmitted] = useState<boolean>(false);

  // Consumption Formula Calculations:
  // Approximate daily fuel consumption based on vessel speed & class (Cubic relationship: Fuel ~ Speed^3)
  let baseConsumptionTonsPerDay = 28;
  if (vesselEngineClass === 'Tanker (Suezmax)') baseConsumptionTonsPerDay = 42;
  if (vesselEngineClass === 'Bulk Carrier (Panamax)') baseConsumptionTonsPerDay = 24;
  if (vesselEngineClass === 'Fishery Trawler') baseConsumptionTonsPerDay = 6;

  // Speed multiplier relative to standard 14 kts
  const speedRatio = vesselSpeedKts / 14.0;
  const actualDailyConsumptionMT = baseConsumptionTonsPerDay * Math.pow(speedRatio, 3);

  // Steaming time in hours and days
  const steamingHours = voyageDistanceNm / (vesselSpeedKts || 1);
  const steamingDays = steamingHours / 24;

  // Total fuel required
  const totalFuelMT = actualDailyConsumptionMT * steamingDays;

  // Cost calculation based on selected port fuel price
  let currentFuelPriceUsd = selectedPort.vlsfoPriceUsdMt;
  if (fuelType === 'LSMGO') currentFuelPriceUsd = selectedPort.lsmgoPriceUsdMt;
  if (fuelType === 'HSFO380') currentFuelPriceUsd = selectedPort.hsfo380PriceUsdMt;

  const totalFuelCostUsd = totalFuelMT * currentFuelPriceUsd;

  // Carbon Emissions (IMO Factor: 3.114 MT CO2 per MT VLSFO)
  const co2Factor = fuelType === 'LSMGO' ? 3.206 : fuelType === 'HSFO380' ? 3.114 : 3.151;
  const totalCo2EmissionsMT = totalFuelMT * co2Factor;

  // Eco-speed comparison (Reducing speed by 2 knots)
  const ecoSpeedKts = Math.max(10, vesselSpeedKts - 2);
  const ecoSpeedRatio = ecoSpeedKts / 14.0;
  const ecoDailyConsumptionMT = baseConsumptionTonsPerDay * Math.pow(ecoSpeedRatio, 3);
  const ecoSteamingDays = voyageDistanceNm / (ecoSpeedKts * 24);
  const ecoTotalFuelMT = ecoDailyConsumptionMT * ecoSteamingDays;
  const ecoFuelSavedMT = Math.max(0, totalFuelMT - ecoTotalFuelMT);
  const ecoMoneySavedUsd = ecoFuelSavedMT * currentFuelPriceUsd;

  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setQuoteSubmitted(true);
    setTimeout(() => setQuoteSubmitted(false), 5000);
  };

  return (
    <div id="marine-fuel-tracker" className="space-y-6">
      {/* Top Banner Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center space-x-2 text-emerald-400 font-bold text-xs uppercase tracking-wider mb-1">
              <Fuel className="w-4 h-4 text-emerald-400" />
              <span>GLOBAL BUNKERING PRICE INDEX & CII CARBON CALCULATOR</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center space-x-2">
              <Flame className="w-6 h-6 text-emerald-400" />
              <span>Marine Fuel Tracker & Vessel Consumption Engine</span>
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl">
              Live VLSFO, LSMGO, and HSFO fuel prices across key South Asian ports, voyage consumption modeling, and eco-speed carbon savings analytics.
            </p>
          </div>

          <div className="flex items-center space-x-2 bg-slate-950 p-2 rounded-xl border border-slate-800 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-emerald-300 font-bold">BUNKER INDEX LIVE</span>
          </div>
        </div>
      </div>

      {/* SECTION 1: Regional Bunkering Prices Grid */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2">
            <BarChart3 className="w-5 h-5 text-emerald-400" />
            <h3 className="font-bold text-white text-base">
              Bunkering Fuel Price Index (USD / Metric Ton)
            </h3>
          </div>
          <span className="text-[11px] text-slate-400 font-mono">IMO 2020 Compliant Low-Sulfur Fuels</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {BUNKERING_PORT_INDEX.map((port) => {
            const isSelected = selectedPort.portId === port.portId;
            return (
              <div
                key={port.portId}
                onClick={() => setSelectedPort(port)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-3 ${
                  isSelected
                    ? 'bg-slate-950 border-emerald-500 shadow-xl shadow-emerald-950/40'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl">{port.flag}</span>
                    <div>
                      <h4 className="font-bold text-white text-sm">{port.portName}</h4>
                      <span className="text-[10px] text-slate-400 font-mono">{port.country}</span>
                    </div>
                  </div>

                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-900 text-slate-300 border border-slate-800">
                    {port.availabilityStatus}
                  </span>
                </div>

                {/* Fuel Prices */}
                <div className="grid grid-cols-3 gap-2 font-mono text-xs">
                  <div className="bg-slate-900 p-2 rounded-xl border border-slate-800">
                    <span className="text-[9px] text-slate-400 font-bold">VLSFO 0.5%</span>
                    <div className="font-bold text-emerald-300">${port.vlsfoPriceUsdMt}</div>
                    <div className={`text-[9px] flex items-center ${port.vlsfoChange >= 0 ? 'text-rose-400' : 'text-emerald-400'}`}>
                      {port.vlsfoChange >= 0 ? '▲' : '▼'} ${Math.abs(port.vlsfoChange)}
                    </div>
                  </div>

                  <div className="bg-slate-900 p-2 rounded-xl border border-slate-800">
                    <span className="text-[9px] text-slate-400 font-bold">LSMGO 0.1%</span>
                    <div className="font-bold text-cyan-300">${port.lsmgoPriceUsdMt}</div>
                    <div className={`text-[9px] flex items-center ${port.lsmgoChange >= 0 ? 'text-rose-400' : 'text-emerald-400'}`}>
                      {port.lsmgoChange >= 0 ? '▲' : '▼'} ${Math.abs(port.lsmgoChange)}
                    </div>
                  </div>

                  <div className="bg-slate-900 p-2 rounded-xl border border-slate-800">
                    <span className="text-[9px] text-slate-400 font-bold">HSFO 380</span>
                    <div className="font-bold text-amber-300">${port.hsfo380PriceUsdMt}</div>
                    <div className={`text-[9px] flex items-center ${port.hsfo380Change >= 0 ? 'text-rose-400' : 'text-emerald-400'}`}>
                      {port.hsfo380Change >= 0 ? '▲' : '▼'} ${Math.abs(port.hsfo380Change)}
                    </div>
                  </div>
                </div>

                <div className="text-[10px] text-slate-500 font-mono text-right pt-0.5">
                  Updated: {port.lastUpdated}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* SECTION 2: Voyage Fuel Consumption & Carbon CII Calculator */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calculator Form Inputs (1 Col) */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
          <div className="flex items-center space-x-2 text-xs font-bold text-emerald-400 uppercase border-b border-slate-800 pb-2">
            <Calculator className="w-4 h-4 text-emerald-400" />
            <span>Vessel Voyage Fuel Calculator</span>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="text-slate-300 font-semibold mb-1 block">Selected Bunkering Port</label>
              <div className="p-2.5 bg-slate-950 border border-slate-800 rounded-xl font-bold text-white flex items-center space-x-2">
                <span>{selectedPort.flag}</span>
                <span>{selectedPort.portName}</span>
              </div>
            </div>

            <div>
              <label className="text-slate-300 font-semibold mb-1 block">Voyage Distance (Nautical Miles - NM)</label>
              <input
                type="number"
                min="50"
                value={voyageDistanceNm}
                onChange={(e) => setVoyageDistanceNm(Number(e.target.value) || 0)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-emerald-300 font-mono font-bold focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="text-slate-300 font-semibold mb-1 block">Cruising Speed (Knots)</label>
              <input
                type="number"
                step="0.5"
                min="8"
                max="26"
                value={vesselSpeedKts}
                onChange={(e) => setVesselSpeedKts(Number(e.target.value) || 0)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="text-slate-300 font-semibold mb-1 block">Vessel Engine Category</label>
              <select
                value={vesselEngineClass}
                onChange={(e: any) => setVesselEngineClass(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500 font-bold"
              >
                <option value="Container (Medium)">Container Vessel (Medium ~ 28 MT/day)</option>
                <option value="Tanker (Suezmax)">Suezmax Oil Tanker (~ 42 MT/day)</option>
                <option value="Bulk Carrier (Panamax)">Panamax Bulk Carrier (~ 24 MT/day)</option>
                <option value="Fishery Trawler">Commercial Fishery Trawler (~ 6 MT/day)</option>
              </select>
            </div>

            <div>
              <label className="text-slate-300 font-semibold mb-1 block">Marine Fuel Grade</label>
              <select
                value={fuelType}
                onChange={(e: any) => setFuelType(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-emerald-300 font-bold focus:outline-none focus:border-emerald-500"
              >
                <option value="VLSFO">VLSFO 0.5% ($ {selectedPort.vlsfoPriceUsdMt}/MT)</option>
                <option value="LSMGO">LSMGO 0.1% ($ {selectedPort.lsmgoPriceUsdMt}/MT)</option>
                <option value="HSFO380">HSFO 380 cSt ($ {selectedPort.hsfo380PriceUsdMt}/MT)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Output Results & CII Eco-Speed Comparison (2 Cols) */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-5 shadow-xl flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <div className="flex items-center space-x-2 text-xs font-bold text-emerald-400 uppercase">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>Voyage Cost & Emissions Summary</span>
              </div>
              <span className="text-[10px] text-slate-400 font-mono">Estimated @ {vesselSpeedKts} Knots</span>
            </div>

            {/* Results Grid Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
                <span className="text-[10px] text-slate-400 font-bold">TOTAL STEAMING TIME</span>
                <div className="text-lg font-bold text-white">{steamingDays.toFixed(1)} Days</div>
                <div className="text-[10px] text-slate-400">{steamingHours.toFixed(0)} Hours</div>
              </div>

              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
                <span className="text-[10px] text-slate-400 font-bold">FUEL CONSUMPTION</span>
                <div className="text-lg font-bold text-emerald-300">{totalFuelMT.toFixed(1)} MT</div>
                <div className="text-[10px] text-slate-400">~{actualDailyConsumptionMT.toFixed(1)} MT/Day</div>
              </div>

              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
                <span className="text-[10px] text-slate-400 font-bold">ESTIMATED FUEL COST</span>
                <div className="text-lg font-bold text-cyan-300">${totalFuelCostUsd.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
                <div className="text-[10px] text-slate-400">USD Bunkering Cost</div>
              </div>

              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
                <span className="text-[10px] text-slate-400 font-bold">CO2 EMISSIONS</span>
                <div className="text-lg font-bold text-rose-300">{totalCo2EmissionsMT.toFixed(1)} MT</div>
                <div className="text-[10px] text-slate-400">CII GHG Intensity</div>
              </div>
            </div>

            {/* Eco-Speed Carbon Savings Recommendation Box */}
            <div className="p-4 bg-slate-950 border border-emerald-500/40 rounded-2xl space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-emerald-400">
                <div className="flex items-center space-x-1.5">
                  <TrendingDown className="w-4 h-4 text-emerald-400" />
                  <span>ECO-SPEED OPTIMIZATION ADVISOR</span>
                </div>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px]">
                  SAVE UP TO ${ecoMoneySavedUsd.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                Slowing down by 2 knots (from <strong>{vesselSpeedKts} kts</strong> to <strong>{ecoSpeedKts} kts</strong>) reduces fuel consumption by <strong>{ecoFuelSavedMT.toFixed(1)} Metric Tons</strong>, saving approximately <strong className="text-emerald-300">${ecoMoneySavedUsd.toLocaleString(undefined, { maximumFractionDigits: 0 })} USD</strong> in fuel expenditure and cutting CO2 emissions by <strong>{(ecoFuelSavedMT * co2Factor).toFixed(1)} MT CO2</strong>.
              </p>
            </div>
          </div>

          {/* Bunkering Spot Quote Request Form */}
          <form onSubmit={handleQuoteSubmit} className="pt-3 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex items-center space-x-2 w-full sm:w-auto">
              <label className="text-slate-400 font-semibold whitespace-nowrap">Request Bunkering Quote:</label>
              <input
                type="number"
                value={quoteTons}
                onChange={(e) => setQuoteTons(Number(e.target.value) || 0)}
                className="w-24 bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs text-white font-mono"
              />
              <span className="text-slate-400 font-bold">MT @ {selectedPort.portName.split(' ')[0]}</span>
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold shadow-lg shadow-emerald-600/20 flex items-center justify-center space-x-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{quoteSubmitted ? 'Quote Sent to Port Trader!' : 'Get Spot Bunkering Quote'}</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
