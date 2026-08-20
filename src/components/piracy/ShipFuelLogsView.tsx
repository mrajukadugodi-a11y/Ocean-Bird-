import React, { useState } from 'react';
import { Fuel, Flame, AlertCircle, Droplets, TrendingDown, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { hapticEngine } from '../../utils/hapticUtils';

export interface FuelLogEntry {
  id: string;
  date: string;
  fuelType: 'VLSFO' | 'MGO' | 'LNG' | 'MFO';
  robTons: number; // Remaining On Board in metric tons
  dailyConsTons: number;
  sulfurPct: number;
  isEcaCompliant: boolean;
  bunkerPort: string;
}

const INITIAL_FUEL_LOGS: FuelLogEntry[] = [
  { id: 'LOG-801', date: '2026-08-08', fuelType: 'VLSFO', robTons: 1240, dailyConsTons: 38.5, sulfurPct: 0.48, isEcaCompliant: true, bunkerPort: 'Port of Rotterdam' },
  { id: 'LOG-802', date: '2026-08-07', fuelType: 'MGO', robTons: 420, dailyConsTons: 12.2, sulfurPct: 0.08, isEcaCompliant: true, bunkerPort: 'Port of Singapore' },
  { id: 'LOG-803', date: '2026-08-06', fuelType: 'LNG', robTons: 890, dailyConsTons: 28.0, sulfurPct: 0.00, isEcaCompliant: true, bunkerPort: 'Copenhagen CMP' }
];

export const ShipFuelLogsView: React.FC = () => {
  const [logs] = useState<FuelLogEntry[]>(INITIAL_FUEL_LOGS);
  const [selectedFuel, setSelectedFuel] = useState<FuelLogEntry>(INITIAL_FUEL_LOGS[0]);

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
            <Fuel className="w-4 h-4 text-amber-400" />
            <span>Vessel Bunker Fuel Oil Consumption & ROB Storage Logs</span>
          </h3>
          <p className="text-[10px] text-slate-400 font-sans">
            Real-time remaining-on-board (ROB) fuel levels, sulfur ECA compliance, and daily burn rate tracking
          </p>
        </div>

        <span className="bg-amber-950 text-amber-300 border border-amber-800 text-[10px] px-2.5 py-1 rounded font-bold">
          TOTAL ROB: 2,550 MT
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Fuel Logs List */}
        <div className="lg:col-span-2 space-y-2">
          {logs.map((fl) => (
            <div
              key={fl.id}
              onClick={() => {
                setSelectedFuel(fl);
                hapticEngine.trigger('click');
              }}
              className={`p-4 rounded-2xl border cursor-pointer transition-all space-y-3 ${
                selectedFuel.id === fl.id
                  ? 'bg-slate-950 border-amber-400 ring-1 ring-amber-400'
                  : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex justify-between items-center border-b border-slate-900 pb-2">
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-amber-950 text-amber-300 border border-amber-800">
                    {fl.fuelType}
                  </span>
                  <span className="text-[10px] font-bold text-white">{fl.bunkerPort}</span>
                </div>
                <span className="text-[9px] text-slate-500">{fl.date}</span>
              </div>

              <div className="grid grid-cols-3 gap-2 text-[10px]">
                <div>
                  <span className="text-slate-500 block">ROB (REMAINING):</span>
                  <span className="text-amber-400 font-bold">{fl.robTons} MT</span>
                </div>
                <div>
                  <span className="text-slate-500 block">DAILY BURN:</span>
                  <span className="text-white font-bold">{fl.dailyConsTons} MT/Day</span>
                </div>
                <div>
                  <span className="text-slate-500 block">SULFUR CONTENT:</span>
                  <span className="text-emerald-400 font-bold">{fl.sulfurPct}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Selected Fuel Detailed Insight */}
        <div className="bg-slate-950 border border-slate-800 p-5 rounded-2xl space-y-3 font-mono flex flex-col justify-between">
          <div className="space-y-3">
            <div className="border-b border-slate-800 pb-2">
              <span className="text-[8px] text-amber-400 font-bold block">{selectedFuel.id}</span>
              <h4 className="text-xs font-bold text-white">{selectedFuel.fuelType} Bunker Grade</h4>
              <span className="text-[9px] text-slate-400 block font-sans">Port of Origin: {selectedFuel.bunkerPort}</span>
            </div>

            <div className="space-y-2 bg-slate-900 p-3 rounded-xl border border-slate-800 text-[10px]">
              <div className="flex justify-between">
                <span className="text-slate-500">MARPOL ECA COMPLIANCE:</span>
                <span className="text-emerald-400 font-bold">{selectedFuel.isEcaCompliant ? 'PASSED (LOW SULFUR)' : 'NON-COMPLIANT'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">ESTIMATED VOYAGE RANGE:</span>
                <span className="text-white font-bold">{Math.round((selectedFuel.robTons / selectedFuel.dailyConsTons) * 24)} Hours</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
