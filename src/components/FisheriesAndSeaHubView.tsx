import React, { useState } from 'react';
import fishermenTrawlerImg from '../assets/images/fishermen_trawler_ocean_1785486842546.jpg';
import {
  POTENTIAL_FISHING_ZONES,
  FISH_MARKET_RATES,
  FISHERMEN_SAFETY_ADVISORIES,
} from '../data/southAsiaData';
import { PotentialFishingZone, FishMarketRate, FishermenSafetyAdvisory } from '../types';
import {
  Fish,
  Compass,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  DollarSign,
  MapPin,
  Anchor,
  ShieldAlert,
  ThermometerSun,
  Waves,
  Sun,
  Zap,
  Calculator,
  Plus,
  RotateCcw,
  CheckCircle2,
  Ship,
  Info,
  Radio,
  Clock,
  Sparkles,
} from 'lucide-react';

export const FisheriesAndSeaHubView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'pfz' | 'market' | 'safety' | 'logbook'>('pfz');

  // Interactive Catch Revenue Calculator State
  const [selectedSpeciesId, setSelectedSpeciesId] = useState<string>(FISH_MARKET_RATES[0].id);
  const [catchWeightKg, setCatchWeightKg] = useState<number>(150);
  const [dieselLiters, setDieselLiters] = useState<number>(60);
  const [dieselPricePerLiter, setDieselPricePerLiter] = useState<number>(92);

  const selectedFish = FISH_MARKET_RATES.find((f) => f.id === selectedSpeciesId) || FISH_MARKET_RATES[0];
  const grossRevenueLocal = catchWeightKg * selectedFish.pricePerKgLocalCurrency;
  const dieselCostLocal = dieselLiters * dieselPricePerLiter;
  const netProfitLocal = grossRevenueLocal - dieselCostLocal;
  const netProfitUSD = (netProfitLocal / (grossRevenueLocal / (catchWeightKg * selectedFish.pricePerKgUSD || 1))).toFixed(2);

  return (
    <div id="fisheries-and-sea-hub-view" className="space-y-8 animate-fadeIn">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-teal-950 rounded-2xl p-6 border border-cyan-900/50 shadow-2xl text-white">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex-1 space-y-2">
            <div className="flex items-center space-x-2 text-cyan-400 font-semibold text-xs">
              <Fish className="w-4 h-4 text-cyan-400 animate-bounce" />
              <span>SATELLITE CHLOROPHYLL PFZ & DEEP-SEA FISHERIES ADVISORY HUB</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white flex items-center space-x-3">
              <span>Seafarers & Deep-Sea Fisheries Portal</span>
            </h1>
            <p className="text-slate-300 text-sm">
              Real-time Potential Fishing Zones (PFZ), ocean sea surface temperature (SST), harbor landing market prices, EEZ boundary warnings, and net profit calculators for traditional & mechanized fishermen.
            </p>
          </div>

          <div className="relative w-full lg:w-72 h-36 rounded-xl overflow-hidden border border-cyan-500/30 shrink-0 shadow-lg group">
            <img
              src={fishermenTrawlerImg}
              alt="Deep Sea Fishing Trawler at Sunrise"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent p-3 flex flex-col justify-end">
              <div className="text-xs font-bold text-white flex items-center justify-between">
                <span>Sunrise Ocean Trawler</span>
                <span className="px-1.5 py-0.5 rounded bg-cyan-500/30 text-cyan-300 text-[9px] font-bold">LIVE TELEMETRY</span>
              </div>
              <p className="text-[10px] text-cyan-200">INCOIS & SAC-ISRO Satellite Stream Active</p>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between flex-wrap gap-3">
          {/* Tab Switcher */}
          <div className="flex flex-wrap items-center gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveTab('pfz')}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
                activeTab === 'pfz'
                  ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>PFZ Zones ({POTENTIAL_FISHING_ZONES.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('market')}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
                activeTab === 'market'
                  ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <DollarSign className="w-4 h-4" />
              <span>Fish Market Prices ({FISH_MARKET_RATES.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('safety')}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
                activeTab === 'safety'
                  ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <ShieldAlert className="w-4 h-4 text-amber-400" />
              <span>EEZ & Swell Warnings</span>
            </button>

            <button
              onClick={() => setActiveTab('logbook')}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
                activeTab === 'logbook'
                  ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Calculator className="w-4 h-4" />
              <span>Trip Profit Calculator</span>
            </button>
          </div>
        </div>
      </div>

      {/* TAB 1: POTENTIAL FISHING ZONES (PFZ) */}
      {activeTab === 'pfz' && (
        <div className="space-y-6">
          <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 text-white space-y-2">
            <div className="flex items-center space-x-2 text-cyan-400 font-bold text-xs uppercase">
              <Zap className="w-4 h-4" />
              <span>INCOIS & SATELLITE DERIVED CHLOROPHYLL HOTSPOTS</span>
            </div>
            <h2 className="text-xl font-bold text-white">Potential Fishing Zones (PFZ) & SST Ocean Hotspots</h2>
            <p className="text-xs text-slate-300">
              Satellite ocean color sensors detect high chlorophyll concentration and sea surface temperature frontal zones where pelagic fish aggregations (Tuna, Hilsa, Seerfish, Mackerel) cluster.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {POTENTIAL_FISHING_ZONES.map((zone) => (
              <div
                key={zone.id}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-5 text-white space-y-4 shadow-xl hover:border-slate-700 transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-[10px] font-extrabold uppercase">
                        {zone.id}
                      </span>
                      <h3 className="font-extrabold text-base text-white mt-1 leading-snug">{zone.zoneName}</h3>
                    </div>

                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold text-[10px] border border-emerald-500/30 shrink-0">
                      {zone.advisoryConfidence}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <div>
                      <span className="text-slate-500 text-[10px]">Coordinates</span>
                      <div className="font-mono text-cyan-300 font-bold">{zone.lat}°N, {zone.lng}°E</div>
                    </div>

                    <div>
                      <span className="text-slate-500 text-[10px]">Distance from Coast</span>
                      <div className="font-mono text-amber-300 font-bold">{zone.distanceFromCoastKm} NM / Km</div>
                    </div>

                    <div>
                      <span className="text-slate-500 text-[10px]">Sea Surface Temp (SST)</span>
                      <div className="font-mono text-emerald-400 font-bold flex items-center space-x-1">
                        <ThermometerSun className="w-3.5 h-3.5 text-amber-400" />
                        <span>{zone.seaSurfaceTempC}°C</span>
                      </div>
                    </div>

                    <div>
                      <span className="text-slate-500 text-[10px]">Chlorophyll Density</span>
                      <div className="font-mono text-cyan-400 font-bold">{zone.chlorophyllMgM3} mg/m³</div>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="text-[10px] text-slate-400 font-bold uppercase">Abundant Target Species</div>
                    <div className="flex flex-wrap gap-1">
                      {zone.targetSpecies.map((sp, idx) => (
                        <span key={idx} className="text-[10px] bg-slate-950 text-cyan-200 px-2 py-0.5 rounded border border-slate-800">
                          🐟 {sp}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                  <div className="flex items-center space-x-1 text-[11px]">
                    <MapPin className="w-3.5 h-3.5 text-slate-500" />
                    <span>{zone.nearestHarbor}</span>
                  </div>

                  <span className="text-[10px] text-amber-400 font-mono">Valid: {zone.validityHours} hrs</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: FISH MARKET RATES */}
      {activeTab === 'market' && (
        <div className="space-y-6">
          <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 text-white space-y-2">
            <div className="flex items-center space-x-2 text-emerald-400 font-bold text-xs uppercase">
              <DollarSign className="w-4 h-4" />
              <span>LIVE SOUTH ASIAN HARBOR LANDING WHOLESALE MARKET RATES</span>
            </div>
            <h2 className="text-xl font-bold text-white">Fish Harbor Prices & Landing Auction Benchmarks</h2>
            <p className="text-xs text-slate-300">
              Updated market rates per kg across Kochi, Visakhapatnam, Cox's Bazar, Galle, Karachi, and Malé fishing harbors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FISH_MARKET_RATES.map((rate) => (
              <div
                key={rate.id}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-5 text-white space-y-4 shadow-xl flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl">{rate.countryFlag}</span>
                      <div>
                        <h3 className="font-extrabold text-base text-white leading-tight">{rate.speciesName}</h3>
                        <span className="text-xs text-cyan-300 font-bold">{rate.localName}</span>
                      </div>
                    </div>

                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold flex items-center space-x-1 ${
                        rate.priceTrend === 'Up'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : rate.priceTrend === 'Down'
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                          : 'bg-slate-800 text-slate-300'
                      }`}
                    >
                      {rate.priceTrend === 'Up' && <TrendingUp className="w-3 h-3 text-emerald-400" />}
                      {rate.priceTrend === 'Down' && <TrendingDown className="w-3 h-3 text-rose-400" />}
                      <span>{rate.priceTrend} Trend</span>
                    </span>
                  </div>

                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-center space-y-1">
                    <div className="text-xs text-slate-400 font-semibold">Wholesale Landing Rate</div>
                    <div className="text-2xl font-black text-emerald-400 font-mono">
                      {rate.currencySymbol}{rate.pricePerKgLocalCurrency} <span className="text-xs font-normal text-slate-400">/ kg</span>
                    </div>
                    <div className="text-xs text-amber-300 font-bold font-mono">
                      (${rate.pricePerKgUSD.toFixed(2)} USD per kg)
                    </div>
                  </div>

                  <div className="space-y-1 text-xs text-slate-300">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Primary Harbor:</span>
                      <span className="font-semibold text-white">{rate.harborPort}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-slate-400">Grade & Standard:</span>
                      <span className="text-cyan-300 font-bold">{rate.qualityGrade}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
                  <span>Updated Daily via Port Fisheries Board</span>
                  <button
                    onClick={() => {
                      setSelectedSpeciesId(rate.id);
                      setActiveTab('logbook');
                    }}
                    className="text-cyan-400 font-bold hover:underline"
                  >
                    Calculate Catch Revenue →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: SAFETY & EEZ BOUNDARY WARNINGS */}
      {activeTab === 'safety' && (
        <div className="space-y-6">
          <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 text-white space-y-2">
            <div className="flex items-center space-x-2 text-rose-400 font-bold text-xs uppercase">
              <ShieldAlert className="w-4 h-4" />
              <span>SAFETY AT SEA, MONSOON BANS & MARITIME BOUNDARY ADVISORIES</span>
            </div>
            <h2 className="text-xl font-bold text-white">Fishermen Swell Warnings & EEZ Boundary Bulletins</h2>
            <p className="text-xs text-slate-300">
              Crucial sea swell predictions, gale force wind warnings, and international maritime boundary line (IMBL) boundary alerts to prevent inadvertent border crossings and vessel capsizing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {FISHERMEN_SAFETY_ADVISORIES.map((adv) => (
              <div
                key={adv.id}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-white space-y-4 shadow-xl flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl">{adv.countryFlag}</span>
                      <h3 className="font-extrabold text-base text-white">{adv.region}</h3>
                    </div>

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-black uppercase border ${
                        adv.alertLevel.includes('WARNING')
                          ? 'bg-rose-500/20 text-rose-300 border-rose-500/50'
                          : adv.alertLevel.includes('CAUTION')
                          ? 'bg-amber-500/20 text-amber-300 border-amber-500/50'
                          : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50'
                      }`}
                    >
                      {adv.alertLevel}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs">
                    <div>
                      <span className="text-slate-500 text-[10px]">Wave Swell Height</span>
                      <div className="font-bold text-cyan-300 font-mono flex items-center space-x-1">
                        <Waves className="w-3.5 h-3.5 text-cyan-400" />
                        <span>{adv.waveHeightMeters}</span>
                      </div>
                    </div>

                    <div>
                      <span className="text-slate-500 text-[10px]">Wind Speed</span>
                      <div className="font-bold text-amber-300 font-mono">{adv.windSpeedKnots}</div>
                    </div>
                  </div>

                  <div className="space-y-1 text-xs">
                    <div className="text-[11px] font-bold text-slate-400">Weather & Sea Forecast Bulletin:</div>
                    <p className="text-slate-300 leading-relaxed">{adv.description}</p>
                  </div>

                  <div className="p-3 bg-rose-950/40 border border-rose-900/60 rounded-xl text-xs space-y-1">
                    <div className="flex items-center space-x-1 text-rose-400 font-bold uppercase text-[10px]">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      <span>EEZ / IMBL Boundary Clearance Warning</span>
                    </div>
                    <p className="text-rose-200 text-[11px]">{adv.eezBoundaryWarning}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: FISHING TRIP PROFIT & REVENUE CALCULATOR */}
      {activeTab === 'logbook' && (
        <div className="space-y-6">
          <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 text-white space-y-2">
            <div className="flex items-center space-x-2 text-cyan-400 font-bold text-xs uppercase">
              <Calculator className="w-4 h-4" />
              <span>FISHERMEN CATCH & DIESEL NET PROFIT ESTIMATOR</span>
            </div>
            <h2 className="text-xl font-bold text-white">Fishing Voyage Revenue & Fuel Estimator</h2>
            <p className="text-xs text-slate-300">
              Calculate estimated gross catch value based on live harbor market rates minus boat diesel consumption costs.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Controls */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-white space-y-5 shadow-xl">
              <h3 className="font-extrabold text-base text-white border-b border-slate-800 pb-3 flex items-center space-x-2">
                <Fish className="w-4 h-4 text-cyan-400" />
                <span>Voyage Catch & Fuel Details</span>
              </h3>

              <div className="space-y-4 text-xs">
                <div className="space-y-1">
                  <label className="font-bold text-slate-300">Select Target Fish Species Landing</label>
                  <select
                    value={selectedSpeciesId}
                    onChange={(e) => setSelectedSpeciesId(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-cyan-300 font-bold focus:outline-none"
                  >
                    {FISH_MARKET_RATES.map((f) => (
                      <option key={f.id} value={f.id}>
                        {f.countryFlag} {f.speciesName} ({f.localName}) - {f.currencySymbol}{f.pricePerKgLocalCurrency}/kg
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between font-bold">
                    <span className="text-slate-300">Total Fish Catch Weight (Kg):</span>
                    <span className="text-emerald-400 font-mono text-sm">{catchWeightKg} Kg</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="2000"
                    step="10"
                    value={catchWeightKg}
                    onChange={(e) => setCatchWeightKg(Number(e.target.value))}
                    className="w-full accent-emerald-500 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                    <span>10 Kg (Small Canoe)</span>
                    <span>500 Kg (Trawler)</span>
                    <span>2,000 Kg (Deep Sea Vessel)</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-300">Diesel Consumed (Liters)</label>
                    <input
                      type="number"
                      value={dieselLiters}
                      onChange={(e) => setDieselLiters(Number(e.target.value))}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-300">Diesel Rate ({selectedFish.currencySymbol} / Liter)</label>
                    <input
                      type="number"
                      value={dieselPricePerLiter}
                      onChange={(e) => setDieselPricePerLiter(Number(e.target.value))}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Profit Summary Card */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-6 text-white space-y-6 shadow-2xl flex flex-col justify-between">
              <div className="space-y-4">
                <h3 className="font-extrabold text-base text-white border-b border-slate-800 pb-3 flex items-center space-x-2">
                  <Calculator className="w-4 h-4 text-emerald-400" />
                  <span>Estimated Voyage Net Profit</span>
                </h3>

                <div className="space-y-3 bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Gross Catch Value ({selectedFish.speciesName}):</span>
                    <strong className="text-emerald-400 font-bold font-mono text-sm">
                      {selectedFish.currencySymbol}{grossRevenueLocal.toLocaleString()}
                    </strong>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Diesel Fuel Expenses:</span>
                    <strong className="text-rose-400 font-bold font-mono">
                      - {selectedFish.currencySymbol}{dieselCostLocal.toLocaleString()}
                    </strong>
                  </div>

                  <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                    <span className="text-white font-bold text-sm">Net Voyage Profit:</span>
                    <strong className={`font-black font-mono text-xl ${netProfitLocal >= 0 ? 'text-cyan-300' : 'text-rose-400'}`}>
                      {selectedFish.currencySymbol}{netProfitLocal.toLocaleString()}
                    </strong>
                  </div>
                </div>

                <div className="p-3 bg-cyan-950/30 border border-cyan-800/40 rounded-xl text-xs space-y-1 text-cyan-200">
                  <div className="font-bold flex items-center space-x-1">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                    <span>Market Landing Benchmark:</span>
                  </div>
                  <p>
                    Selling {catchWeightKg} kg of {selectedFish.speciesName} at {selectedFish.harborPort} yields approximately <strong>${netProfitUSD} USD</strong> net earnings after fueling costs.
                  </p>
                </div>
              </div>

              <div className="text-[11px] text-slate-500 italic">
                * Note: Auction prices fluctuate based on harbor arrival timings, ice freshness grade, and export buyers availability.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
