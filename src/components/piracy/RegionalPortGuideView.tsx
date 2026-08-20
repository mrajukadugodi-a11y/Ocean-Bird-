import React, { useState } from 'react';
import { Anchor, ShieldCheck, MapPin, PhoneCall, Radio, Clock, CheckCircle2, Search } from 'lucide-react';
import { motion } from 'motion/react';
import { hapticEngine } from '../../utils/hapticUtils';

export interface RegionalPortEntry {
  id: string;
  portName: string;
  unLocode: string;
  country: string;
  ispsLevel: 1 | 2 | 3;
  vhfPilotChannel: string;
  maxDraftMeters: number;
  bunkerAvailable: boolean;
  securityContact: string;
  tidalRangeMeters: string;
  description: string;
}

const REGIONAL_PORTS_DATA: RegionalPortEntry[] = [
  {
    id: 'PORT-AU-01',
    portName: 'Port Botany & Sydney Harbour',
    unLocode: 'AU SYD',
    country: 'Australia',
    ispsLevel: 1,
    vhfPilotChannel: 'VHF Ch 12 / 16',
    maxDraftMeters: 16.5,
    bunkerAvailable: true,
    securityContact: '+61 2 9296 4999 (Port Authority of NSW)',
    tidalRangeMeters: '1.2m - 1.8m',
    description: 'Major Australian container and bulk gateway with strict ISPS Level 1 biosecurity and environmental monitoring.'
  },
  {
    id: 'PORT-NZ-02',
    portName: 'Ports of Auckland (Waitematā Harbour)',
    unLocode: 'NZ AKL',
    country: 'New Zealand',
    ispsLevel: 1,
    vhfPilotChannel: 'VHF Ch 12',
    maxDraftMeters: 13.0,
    bunkerAvailable: true,
    securityContact: '+64 9 348 5000 (Auckland Harbour Master)',
    tidalRangeMeters: '2.5m - 3.2m',
    description: 'Primary North Island import/export hub; compulsory pilotage for vessels over 500 GT.'
  },
  {
    id: 'PORT-PH-03',
    portName: 'Port of Manila (International Container Terminal)',
    unLocode: 'PH MNL',
    country: 'Philippines',
    ispsLevel: 2,
    vhfPilotChannel: 'VHF Ch 16 / 74',
    maxDraftMeters: 14.5,
    bunkerAvailable: true,
    securityContact: '+63 2 8527 8356 (Philippine Ports Authority Security)',
    tidalRangeMeters: '0.8m - 1.2m',
    description: 'Busiest Philippine port with ISPS Level 2 heightened vigilance due to nearby bay craft traffic.'
  },
  {
    id: 'PORT-VN-04',
    portName: 'Port of Vung Tau (Cai Mep Terminal)',
    unLocode: 'VN VUT',
    country: 'Vietnam',
    ispsLevel: 1,
    vhfPilotChannel: 'VHF Ch 09 / 16',
    maxDraftMeters: 15.2,
    bunkerAvailable: true,
    securityContact: '+84 254 3852 105 (Vung Tau Port Authority)',
    tidalRangeMeters: '2.8m - 3.5m',
    description: 'Deepwater container terminal serving direct transpacific trade; pilot boarding 2 NM off Cap Saint Jacques.'
  },
  {
    id: 'PORT-NL-05',
    portName: 'Port of Rotterdam (Europoort & Maasvlakte)',
    unLocode: 'NL RTM',
    country: 'Netherlands',
    ispsLevel: 1,
    vhfPilotChannel: 'VHF Ch 11 / 14 / 19',
    maxDraftMeters: 24.0,
    bunkerAvailable: true,
    securityContact: '+31 10 252 1000 (Rotterdam Port Control)',
    tidalRangeMeters: '1.5m - 2.0m',
    description: 'Europe\'s largest port facility with automated container gantry arrays and LNG bunkering piers.'
  }
];

export const RegionalPortGuideView: React.FC = () => {
  const [ports] = useState<RegionalPortEntry[]>(REGIONAL_PORTS_DATA);
  const [selectedPort, setSelectedPort] = useState<RegionalPortEntry>(REGIONAL_PORTS_DATA[0]);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPorts = ports.filter(p =>
    p.portName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.unLocode.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.country.toLowerCase().includes(searchQuery.toLowerCase())
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
            <span>Regional Port & Maritime Facility Operational Guide</span>
          </h3>
          <p className="text-[10px] text-slate-400 font-sans">
            Port specs, ISPS security levels, pilotage VHF radio channels, draft limits, and emergency Contacts
          </p>
        </div>

        <span className="bg-cyan-950 text-cyan-300 border border-cyan-800 text-[10px] px-2.5 py-1 rounded font-bold">
          PORT GUIDE ACTIVE
        </span>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search port name, UN/LOCODE, or country (e.g. Sydney, Manila, NZ, Vung Tau)..."
          className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Port List */}
        <div className="lg:col-span-2 space-y-2 max-h-96 overflow-y-auto pr-1">
          {filteredPorts.map((pt) => (
            <div
              key={pt.id}
              onClick={() => {
                setSelectedPort(pt);
                hapticEngine.trigger('click');
              }}
              className={`p-4 rounded-2xl border cursor-pointer transition-all space-y-2 ${
                selectedPort.id === pt.id
                  ? 'bg-slate-950 border-cyan-400 ring-1 ring-cyan-400'
                  : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex justify-between items-center border-b border-slate-900 pb-2">
                <div>
                  <span className="text-[8px] text-cyan-400 font-bold block">{pt.unLocode} • {pt.country}</span>
                  <h4 className="text-xs font-bold text-white">{pt.portName}</h4>
                </div>
                <span className={`px-2 py-0.5 rounded text-[8px] font-bold ${
                  pt.ispsLevel === 1 ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' :
                  'bg-amber-950 text-amber-300 border border-amber-800'
                }`}>
                  ISPS LEVEL {pt.ispsLevel}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 text-[10px] bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                <div>
                  <span className="text-slate-500 block">MAX DRAFT:</span>
                  <span className="text-white font-bold">{pt.maxDraftMeters}m</span>
                </div>
                <div>
                  <span className="text-slate-500 block">PILOT VHF:</span>
                  <span className="text-cyan-300 font-bold">{pt.vhfPilotChannel}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">BUNKERING:</span>
                  <span className="text-emerald-400 font-bold">{pt.bunkerAvailable ? 'AVAILABLE' : 'NONE'}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Selected Port Detailed Specifications */}
        <div className="bg-slate-950 border border-slate-800 p-5 rounded-2xl space-y-3 font-mono flex flex-col justify-between">
          <div className="space-y-3">
            <div className="border-b border-slate-800 pb-2">
              <span className="text-[8px] text-cyan-400 font-bold block">{selectedPort.unLocode}</span>
              <h4 className="text-xs font-bold text-white">{selectedPort.portName}</h4>
              <span className="text-[9px] text-slate-400 block font-sans">{selectedPort.country}</span>
            </div>

            <div className="space-y-2 bg-slate-900 p-3 rounded-xl border border-slate-800 text-[10px]">
              <div className="flex justify-between">
                <span className="text-slate-500">ISPS SECURITY LEVEL:</span>
                <span className="text-emerald-400 font-bold">LEVEL {selectedPort.ispsLevel}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">PILOTAGE RADIO:</span>
                <span className="text-cyan-300 font-bold">{selectedPort.vhfPilotChannel}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">TIDAL VARIANCE:</span>
                <span className="text-white font-bold">{selectedPort.tidalRangeMeters}</span>
              </div>
            </div>

            <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 space-y-1 text-[10px]">
              <span className="text-slate-500 block">PORT SECURITY CONTROL CONTACT:</span>
              <span className="text-amber-300 font-bold block truncate">{selectedPort.securityContact}</span>
            </div>

            <p className="text-[9px] text-slate-300 font-sans leading-relaxed">{selectedPort.description}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
