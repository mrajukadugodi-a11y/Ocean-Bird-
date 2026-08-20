import React, { useState } from 'react';
import { Anchor, ShieldCheck, Clock, Zap, MapPin, Search, Cpu, CheckCircle2, Waves, Building2 } from 'lucide-react';
import { motion } from 'motion/react';
import { hapticEngine } from '../../utils/hapticUtils';

export interface BalticPortDetail {
  id: string;
  name: string;
  country: string;
  unLocode: string;
  berthWaitHours: number;
  icebreakingTugsAvailable: number;
  onshorePowerSupplyReady: boolean;
  securityThreatLevel: 'LOW_MARSEC_1' | 'ELEVATED_MARSEC_2' | 'HIGH_MARSEC_3';
  euEtsCarbonTaxPerTonEur: number;
  aisQueueCount: number;
  primaryCargoTypes: string[];
}

const BALTIC_PORTS: BalticPortDetail[] = [
  {
    id: 'PORT-CPH',
    name: 'Port of Copenhagen & Malmö (CMP)',
    country: 'Denmark / Sweden',
    unLocode: 'DK CPH / SE MMA',
    berthWaitHours: 4.5,
    icebreakingTugsAvailable: 6,
    onshorePowerSupplyReady: true,
    securityThreatLevel: 'LOW_MARSEC_1',
    euEtsCarbonTaxPerTonEur: 68.50,
    aisQueueCount: 18,
    primaryCargoTypes: ['Cruise Liners', 'Ro-Pax Ferries', 'Clean Petroleum Products']
  },
  {
    id: 'PORT-STO',
    name: 'Port of Stockholm (Stockholms Hamnar)',
    country: 'Sweden',
    unLocode: 'SE STO',
    berthWaitHours: 3.2,
    icebreakingTugsAvailable: 8,
    onshorePowerSupplyReady: true,
    securityThreatLevel: 'LOW_MARSEC_1',
    euEtsCarbonTaxPerTonEur: 68.50,
    aisQueueCount: 14,
    primaryCargoTypes: ['Passenger Ferries', 'Container Feeder', 'Biomass & Timber']
  },
  {
    id: 'PORT-HEL',
    name: 'Port of Helsinki (Helsingin Satama)',
    country: 'Finland',
    unLocode: 'FI HEL',
    berthWaitHours: 5.8,
    icebreakingTugsAvailable: 12,
    onshorePowerSupplyReady: true,
    securityThreatLevel: 'ELEVATED_MARSEC_2',
    euEtsCarbonTaxPerTonEur: 68.50,
    aisQueueCount: 22,
    primaryCargoTypes: ['Ro-Pax Ferries', 'Paper & Pulp', 'Ice-Class Containers']
  },
  {
    id: 'PORT-TLL',
    name: 'Port of Tallinn (Old City & Muuga Harbour)',
    country: 'Estonia',
    unLocode: 'EE TLL',
    berthWaitHours: 6.1,
    icebreakingTugsAvailable: 5,
    onshorePowerSupplyReady: true,
    securityThreatLevel: 'ELEVATED_MARSEC_2',
    euEtsCarbonTaxPerTonEur: 68.50,
    aisQueueCount: 19,
    primaryCargoTypes: ['Container Terminal', 'Liquid Bulk', 'Passenger Liners']
  },
  {
    id: 'PORT-GDN',
    name: 'Port of Gdansk (Deepwater Container Terminal)',
    country: 'Poland',
    unLocode: 'PL GDN',
    berthWaitHours: 12.4,
    icebreakingTugsAvailable: 7,
    onshorePowerSupplyReady: false,
    securityThreatLevel: 'ELEVATED_MARSEC_2',
    euEtsCarbonTaxPerTonEur: 68.50,
    aisQueueCount: 38,
    primaryCargoTypes: ['Ultra Large Container Ships', 'Crude Oil & LNG', 'Dry Bulk']
  },
  {
    id: 'PORT-RIX',
    name: 'Freeport of Riga',
    country: 'Latvia',
    unLocode: 'LV RIX',
    berthWaitHours: 8.0,
    icebreakingTugsAvailable: 4,
    onshorePowerSupplyReady: false,
    securityThreatLevel: 'ELEVATED_MARSEC_2',
    euEtsCarbonTaxPerTonEur: 68.50,
    aisQueueCount: 16,
    primaryCargoTypes: ['Grains & Fertilizers', 'Sawn Timber', 'Container Feeders']
  },
  {
    id: 'PORT-KLJ',
    name: 'Klaipeda State Seaport',
    country: 'Lithuania',
    unLocode: 'LT KLJ',
    berthWaitHours: 7.2,
    icebreakingTugsAvailable: 5,
    onshorePowerSupplyReady: true,
    securityThreatLevel: 'LOW_MARSEC_1',
    euEtsCarbonTaxPerTonEur: 68.50,
    aisQueueCount: 24,
    primaryCargoTypes: ['FSRU LNG Terminal', 'Ro-Ro Freight', 'Metals']
  }
];

export const BalticPortDetailsView: React.FC = () => {
  const [ports] = useState<BalticPortDetail[]>(BALTIC_PORTS);
  const [selectedPort, setSelectedPort] = useState<BalticPortDetail>(BALTIC_PORTS[0]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredPorts = ports.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.unLocode.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
            <Anchor className="w-4 h-4 text-cyan-400" />
            <span>Baltic Sea Major Port Operations, Icebreaker Fleet & Terminal Directory</span>
          </h3>
          <p className="text-[10px] text-slate-400 font-sans">
            Detailed berth delay forecasts, ice-class tugboat readiness, EU ETS carbon tax rates, and MARSEC security levels across Baltic ports
          </p>
        </div>

        <span className="bg-cyan-950 text-cyan-300 border border-cyan-800 text-[10px] px-2.5 py-1 rounded font-bold">
          7 BALTIC HUB PORTS
        </span>
      </div>

      <div className="bg-slate-950 border border-slate-800 p-3 rounded-2xl flex items-center">
        <Search className="w-4 h-4 text-slate-500 mr-2" />
        <input
          type="text"
          placeholder="Filter port by name, country, or UN/LOCODE..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-transparent text-xs text-white placeholder-slate-500 focus:outline-none font-sans"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {filteredPorts.map((port) => (
          <motion.div
            key={port.id}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => {
              setSelectedPort(port);
              hapticEngine.trigger('click');
            }}
            className={`p-4 rounded-2xl border cursor-pointer transition-all space-y-3 ${
              selectedPort.id === port.id
                ? 'bg-slate-950 border-cyan-400 ring-1 ring-cyan-400'
                : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex justify-between items-start border-b border-slate-900 pb-2">
              <div>
                <span className="text-[8px] text-cyan-400 font-bold block">{port.unLocode}</span>
                <h4 className="text-xs font-bold text-white">{port.name}</h4>
                <span className="text-[9px] text-slate-400 block font-sans">{port.country}</span>
              </div>
              <span className={`text-[8px] font-bold px-2 py-0.5 rounded ${
                port.securityThreatLevel === 'ELEVATED_MARSEC_2'
                  ? 'bg-amber-950 text-amber-300 border border-amber-800'
                  : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
              }`}>
                {port.securityThreatLevel.replace(/_/g, ' ')}
              </span>
            </div>

            <div className="space-y-1 text-[9px] font-mono bg-slate-900 p-2.5 rounded-xl border border-slate-800">
              <div className="flex justify-between">
                <span className="text-slate-500">BERTH WAIT:</span>
                <span className="text-amber-400 font-bold">{port.berthWaitHours} hrs</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">ICE TUGS:</span>
                <span className="text-white font-bold">{port.icebreakingTugsAvailable} Ready</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">ONSHORE POWER (OPS):</span>
                <span className={port.onshorePowerSupplyReady ? 'text-emerald-400 font-bold' : 'text-slate-500'}>
                  {port.onshorePowerSupplyReady ? 'READY' : 'NOT INSTALLED'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">AIS QUEUE DEPTH:</span>
                <span className="text-cyan-300 font-bold">{port.aisQueueCount} Vessels</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-1">
              {port.primaryCargoTypes.map((cargo, idx) => (
                <span key={idx} className="bg-slate-900 text-slate-300 text-[8px] px-2 py-0.5 rounded border border-slate-800 font-sans">
                  {cargo}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
