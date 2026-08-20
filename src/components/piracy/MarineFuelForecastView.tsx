import React, { useState } from 'react';
import { Fuel, TrendingUp, DollarSign, BarChart3, Globe, Zap, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { motion } from 'motion/react';
import { hapticEngine } from '../../utils/hapticUtils';

export interface BunkeringHubForecast {
  id: string;
  hubName: string;
  vlsfoUsdPerTon: number;
  vlsfoChangePct: number;
  mgoUsdPerTon: number;
  lngUsdPerTon: number;
  euEtsCarbonTaxUsdPerTon: number;
  projectedQ4ForecastUsd: number;
}

const FUEL_DATA: BunkeringHubForecast[] = [
  {
    id: 'HUB-SIN',
    hubName: 'Port of Singapore Bunkering Hub',
    vlsfoUsdPerTon: 624.50,
    vlsfoChangePct: 1.8,
    mgoUsdPerTon: 812.00,
    lngUsdPerTon: 745.00,
    euEtsCarbonTaxUsdPerTon: 88.00,
    projectedQ4ForecastUsd: 648.00
  },
  {
    id: 'HUB-RTM',
    hubName: 'Port of Rotterdam (ARA Range)',
    vlsfoUsdPerTon: 598.00,
    vlsfoChangePct: -0.6,
    mgoUsdPerTon: 792.50,
    lngUsdPerTon: 710.00,
    euEtsCarbonTaxUsdPerTon: 95.00,
    projectedQ4ForecastUsd: 615.00
  },
  {
    id: 'HUB-FUJ',
    hubName: 'Fujairah Anchorage Bunkering',
    vlsfoUsdPerTon: 618.20,
    vlsfoChangePct: 2.1,
    mgoUsdPerTon: 825.00,
    lngUsdPerTon: 760.00,
    euEtsCarbonTaxUsdPerTon: 88.00,
    projectedQ4ForecastUsd: 635.00
  }
];

export const MarineFuelForecastView: React.FC = () => {
  const [hubs] = useState<BunkeringHubForecast[]>(FUEL_DATA);
  const [selectedHub, setSelectedHub] = useState<BunkeringHubForecast>(FUEL_DATA[0]);

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
            <Fuel className="w-4 h-4 text-cyan-400" />
            <span>Marine Bunker Fuel Price & EU ETS Carbon Tax Forecast Analytics</span>
          </h3>
          <p className="text-[10px] text-slate-400 font-sans">
            Real-time VLSFO 0.5%, MGO 0.1%, LNG marine fuel spot benchmarks, and projected Q4 bunkering cost trajectories
          </p>
        </div>

        <span className="bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px] px-2.5 py-1 rounded font-bold">
          3 MAJOR BUNKER HUBS MONITORED
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {hubs.map((hub) => (
          <motion.div
            key={hub.id}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => {
              setSelectedHub(hub);
              hapticEngine.trigger('click');
            }}
            className={`p-4 rounded-2xl border cursor-pointer transition-all space-y-3 ${
              selectedHub.id === hub.id
                ? 'bg-slate-950 border-cyan-400 ring-1 ring-cyan-400'
                : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex justify-between items-start border-b border-slate-900 pb-2">
              <div>
                <span className="text-[8px] text-cyan-400 font-bold block">{hub.id}</span>
                <h4 className="text-xs font-bold text-white">{hub.hubName}</h4>
              </div>
              <span className={`text-[8px] font-bold px-2 py-0.5 rounded flex items-center space-x-0.5 ${
                hub.vlsfoChangePct >= 0
                  ? 'bg-rose-950 text-rose-300 border border-rose-800'
                  : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
              }`}>
                {hub.vlsfoChangePct >= 0 ? <ArrowUpRight className="w-3 h-3 inline" /> : <ArrowDownRight className="w-3 h-3 inline" />}
                <span>{hub.vlsfoChangePct}%</span>
              </span>
            </div>

            <div className="space-y-1.5 text-[9px] font-sans">
              <div className="flex justify-between font-mono">
                <span className="text-slate-500">VLSFO 0.5% Sulfur:</span>
                <span className="text-white font-bold">${hub.vlsfoUsdPerTon} / MT</span>
              </div>
              <div className="flex justify-between font-mono">
                <span className="text-slate-500">MGO Low Sulfur:</span>
                <span className="text-cyan-300 font-bold">${hub.mgoUsdPerTon} / MT</span>
              </div>
              <div className="flex justify-between font-mono">
                <span className="text-slate-500">Q4 Forecast Projection:</span>
                <span className="text-amber-400 font-bold">${hub.projectedQ4ForecastUsd} / MT</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
