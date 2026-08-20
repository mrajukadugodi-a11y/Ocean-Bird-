import React, { useState } from 'react';
import { Sliders, RefreshCw, ArrowUpRight, ArrowDownRight, Sparkles, Compass } from 'lucide-react';
import { motion } from 'motion/react';
import { hapticEngine } from '../../utils/hapticUtils';

export interface RouteClimateProfile {
  routeId: string;
  routeName: string;
  distanceNM: number;
  avgSstCelsius: number;
  stormRiskIndex: number; // 1-100
  carbonEmissionsTonnesCO2: number;
  ciiRating: 'A' | 'B' | 'C' | 'D' | 'E';
  seaStateBeaufort: number;
}

const ROUTE_CLIMATE_PROFILES: RouteClimateProfile[] = [
  {
    routeId: 'ROUTE-01',
    routeName: 'Suez Canal Corridor (Asia to Europe)',
    distanceNM: 8400,
    avgSstCelsius: 28.5,
    stormRiskIndex: 35,
    carbonEmissionsTonnesCO2: 1250,
    ciiRating: 'B',
    seaStateBeaufort: 4
  },
  {
    routeId: 'ROUTE-02',
    routeName: 'Cape of Good Hope Route (Alternative Bypass)',
    distanceNM: 11800,
    avgSstCelsius: 21.2,
    stormRiskIndex: 78,
    carbonEmissionsTonnesCO2: 1820,
    ciiRating: 'D',
    seaStateBeaufort: 7
  },
  {
    routeId: 'ROUTE-03',
    routeName: 'Northern Sea Route (Arctic Gateway)',
    distanceNM: 6200,
    avgSstCelsius: 3.4,
    stormRiskIndex: 62,
    carbonEmissionsTonnesCO2: 890,
    ciiRating: 'A',
    seaStateBeaufort: 5
  }
];

export const ClimateDataCompareView: React.FC = () => {
  const [routes] = useState<RouteClimateProfile[]>(ROUTE_CLIMATE_PROFILES);
  const [routeA, setRouteA] = useState<RouteClimateProfile>(ROUTE_CLIMATE_PROFILES[0]);
  const [routeB, setRouteB] = useState<RouteClimateProfile>(ROUTE_CLIMATE_PROFILES[1]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-2xl space-y-4 font-mono text-xs"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="space-y-0.5">
          <h3 className="text-xs font-bold text-white uppercase flex items-center space-x-2">
            <Sliders className="w-4 h-4 text-cyan-400" />
            <span>Side-by-Side Trade Route Climate & Carbon Intensity Comparator</span>
          </h3>
          <p className="text-[10px] text-slate-400 font-sans">
            Compare sea surface temperature, storm risk index, carbon footprint (CO2 tonnes), and IMO CII ratings across alternative shipping routes
          </p>
        </div>

        <span className="bg-cyan-950 text-cyan-300 border border-cyan-800 text-[10px] px-2.5 py-1 rounded font-bold flex items-center space-x-1">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>CII ROUTE COMPARATOR</span>
        </span>
      </div>

      {/* Selectors */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-950 p-4 rounded-2xl border border-slate-800">
        <div className="space-y-2">
          <label className="text-[9px] text-slate-500 font-bold block">PRIMARY ROUTE (A):</label>
          <div className="flex flex-col gap-2">
            {routes.map((r) => (
              <button
                key={r.routeId}
                onClick={() => {
                  setRouteA(r);
                  hapticEngine.trigger('click');
                }}
                className={`p-2.5 rounded-xl text-left border text-[10px] font-bold transition-all ${
                  routeA.routeId === r.routeId
                    ? 'bg-cyan-500 text-slate-950 font-black border-cyan-400'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                {r.routeName} ({r.distanceNM} NM)
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[9px] text-slate-500 font-bold block">COMPARISON ROUTE (B):</label>
          <div className="flex flex-col gap-2">
            {routes.map((r) => (
              <button
                key={r.routeId}
                onClick={() => {
                  setRouteB(r);
                  hapticEngine.trigger('click');
                }}
                className={`p-2.5 rounded-xl text-left border text-[10px] font-bold transition-all ${
                  routeB.routeId === r.routeId
                    ? 'bg-rose-500 text-slate-950 font-black border-rose-400'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                {r.routeName} ({r.distanceNM} NM)
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Direct Comparison Table */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-3 font-mono">
        <span className="text-[9px] text-cyan-400 font-bold block border-b border-slate-800 pb-2">
          METRIC COMPARISON: {routeA.routeId} vs {routeB.routeId}
        </span>

        <div className="space-y-2">
          {[
            {
              label: 'VOYAGE DISTANCE (NM)',
              valA: `${routeA.distanceNM} NM`,
              valB: `${routeB.distanceNM} NM`,
              delta: `${routeB.distanceNM - routeA.distanceNM > 0 ? '+' : ''}${routeB.distanceNM - routeA.distanceNM} NM`
            },
            {
              label: 'ESTIMATED CO2 EMISSIONS',
              valA: `${routeA.carbonEmissionsTonnesCO2} Tonnes`,
              valB: `${routeB.carbonEmissionsTonnesCO2} Tonnes`,
              delta: `${routeB.carbonEmissionsTonnesCO2 - routeA.carbonEmissionsTonnesCO2 > 0 ? '+' : ''}${routeB.carbonEmissionsTonnesCO2 - routeA.carbonEmissionsTonnesCO2} Tonnes`
            },
            {
              label: 'STORM RISK INDEX (1-100)',
              valA: `${routeA.stormRiskIndex} / 100`,
              valB: `${routeB.stormRiskIndex} / 100`,
              delta: `${routeB.stormRiskIndex - routeA.stormRiskIndex > 0 ? '+' : ''}${routeB.stormRiskIndex - routeA.stormRiskIndex}`
            },
            {
              label: 'AVG SEA SURFACE TEMP',
              valA: `${routeA.avgSstCelsius}°C`,
              valB: `${routeB.avgSstCelsius}°C`,
              delta: `${(routeB.avgSstCelsius - routeA.avgSstCelsius).toFixed(1)}°C`
            },
            {
              label: 'IMO CII CARBON RATING',
              valA: `RATING ${routeA.ciiRating}`,
              valB: `RATING ${routeB.ciiRating}`,
              delta: routeA.ciiRating === routeB.ciiRating ? 'EQUAL RATING' : `RATING ${routeA.ciiRating} vs ${routeB.ciiRating}`
            }
          ].map((item, idx) => (
            <div key={idx} className="flex justify-between items-center bg-slate-900 p-3 rounded-xl border border-slate-800 text-[10px]">
              <span className="text-slate-400 font-bold w-1/3">{item.label}</span>
              <span className="text-cyan-300 font-bold w-1/4 text-center">{item.valA}</span>
              <span className="text-rose-300 font-bold w-1/4 text-center">{item.valB}</span>
              <span className="text-white font-black w-1/6 text-right bg-slate-950 px-2 py-1 rounded border border-slate-800">
                {item.delta}
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
