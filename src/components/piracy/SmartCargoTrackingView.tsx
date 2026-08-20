import React, { useState } from 'react';
import { Package, ShieldAlert, Thermometer, Lock, AlertTriangle, CheckCircle2, Search, Filter } from 'lucide-react';
import { hapticEngine } from '../../utils/hapticUtils';

export interface CargoContainerItem {
  id: string;
  type: string;
  valueUsd: string;
  securityTier: 'CRITICAL_HIGH_VALUE' | 'STANDARD' | 'HAZMAT';
  sealStatus: 'LOCKED_INTACT' | 'TAMPER_ALERT' | 'SEAL_BROKEN';
  tempCelsius: number;
  humidityPct: number;
  deckLocation: string;
}

const INITIAL_CONTAINERS: CargoContainerItem[] = [
  {
    id: 'MSKU-882910-4',
    type: 'High-Value Semiconductor Wafers',
    valueUsd: '$12,400,000',
    securityTier: 'CRITICAL_HIGH_VALUE',
    sealStatus: 'LOCKED_INTACT',
    tempCelsius: 18.5,
    humidityPct: 42,
    deckLocation: 'Hold 3 / Bay 12 (Interior Protected)'
  },
  {
    id: 'CMAU-410922-1',
    type: 'Refined Copper Cathodes',
    valueUsd: '$3,800,000',
    securityTier: 'STANDARD',
    sealStatus: 'LOCKED_INTACT',
    tempCelsius: 24.1,
    humidityPct: 55,
    deckLocation: 'Main Deck / Bay 04'
  },
  {
    id: 'HLCU-902144-8',
    type: 'Pharmaceutical Vaccines',
    valueUsd: '$8,200,000',
    securityTier: 'CRITICAL_HIGH_VALUE',
    sealStatus: 'LOCKED_INTACT',
    tempCelsius: 4.2,
    humidityPct: 38,
    deckLocation: 'Reefer Hold 1 / Bay 02'
  },
  {
    id: 'ZIMU-331098-0',
    type: 'Heavy Mining Machinery Components',
    valueUsd: '$1,450,000',
    securityTier: 'STANDARD',
    sealStatus: 'LOCKED_INTACT',
    tempCelsius: 28.0,
    humidityPct: 62,
    deckLocation: 'Aft Deck / Bay 18'
  }
];

export const SmartCargoTrackingView: React.FC = () => {
  const [containers, setContainers] = useState<CargoContainerItem[]>(INITIAL_CONTAINERS);
  const [filterTier, setFilterTier] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredContainers = containers.filter((c) => {
    const matchesTier = filterTier === 'ALL' || c.securityTier === filterTier;
    const matchesSearch = c.id.toLowerCase().includes(searchQuery.toLowerCase()) || c.type.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTier && matchesSearch;
  });

  const handleSimulateTamperAlert = (id: string) => {
    hapticEngine.trigger('alert');
    setContainers(
      containers.map((c) => (c.id === id ? { ...c, sealStatus: 'TAMPER_ALERT' } : c))
    );
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-2xl space-y-4 font-mono text-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="space-y-0.5">
          <h3 className="text-xs font-bold text-white uppercase flex items-center space-x-2">
            <Package className="w-4 h-4 text-cyan-400" />
            <span>IoT Smart Cargo High-Value Security & Anti-Tamper Tracking</span>
          </h3>
          <p className="text-[10px] text-slate-400 font-sans">
            Real-time telemetry monitoring for high-value container seals, climate sensors, and deck bay theft isolation
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <span className="bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px] px-2.5 py-1 rounded font-bold">
            100% CONTAINER SEALS INTACT
          </span>
        </div>
      </div>

      {/* Filter and Search controls */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search container ID or cargo type..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500"
          />
        </div>

        <div className="flex items-center space-x-1 w-full sm:w-auto justify-end">
          {['ALL', 'CRITICAL_HIGH_VALUE', 'STANDARD'].map((tier) => (
            <button
              key={tier}
              onClick={() => {
                setFilterTier(tier);
                hapticEngine.trigger('click');
              }}
              className={`px-3 py-1 rounded-xl text-[10px] font-bold border transition-all ${
                filterTier === tier
                  ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-black'
                  : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
              }`}
            >
              {tier === 'CRITICAL_HIGH_VALUE' ? 'HIGH VALUE' : tier}
            </button>
          ))}
        </div>
      </div>

      {/* Containers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {filteredContainers.map((item) => (
          <div
            key={item.id}
            className={`p-4 rounded-2xl border transition-all space-y-3 ${
              item.sealStatus === 'TAMPER_ALERT'
                ? 'bg-rose-950/60 border-rose-500 animate-pulse'
                : 'bg-slate-950 border-slate-800'
            }`}
          >
            <div className="flex justify-between items-start">
              <div>
                <span className="text-xs font-bold text-cyan-300 block">{item.id}</span>
                <span className="text-white font-bold text-[11px] font-sans block">{item.type}</span>
              </div>

              <span
                className={`px-2.5 py-0.5 rounded text-[9px] font-black border ${
                  item.securityTier === 'CRITICAL_HIGH_VALUE'
                    ? 'bg-amber-950 text-amber-300 border-amber-800'
                    : 'bg-slate-900 text-slate-300 border-slate-800'
                }`}
              >
                {item.valueUsd}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[10px] border-t border-b border-slate-900 py-2">
              <div className="space-y-0.5">
                <span className="text-slate-500 block">Bay Location:</span>
                <span className="text-slate-300 font-bold block">{item.deckLocation}</span>
              </div>

              <div className="space-y-0.5">
                <span className="text-slate-500 block">Climate Sensors:</span>
                <span className="text-emerald-400 font-bold block">
                  {item.tempCelsius}°C • {item.humidityPct}% RH
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span
                className={`flex items-center space-x-1 text-[10px] font-bold ${
                  item.sealStatus === 'LOCKED_INTACT' ? 'text-emerald-400' : 'text-rose-400'
                }`}
              >
                {item.sealStatus === 'LOCKED_INTACT' ? (
                  <>
                    <Lock className="w-3.5 h-3.5 text-emerald-400" />
                    <span>SMART SEAL LOCKED & SECURE</span>
                  </>
                ) : (
                  <>
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                    <span>TAMPER DETECTED ON DECK</span>
                  </>
                )}
              </span>

              {item.sealStatus === 'LOCKED_INTACT' && (
                <button
                  onClick={() => handleSimulateTamperAlert(item.id)}
                  className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 rounded-lg text-[9px] font-bold"
                >
                  TEST TAMPER ALERT
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
