import React, { useState } from 'react';
import { Compass, Ship, ShieldCheck, Filter, AlertTriangle, Anchor, Search, CheckCircle2, Waves } from 'lucide-react';
import { motion } from 'motion/react';
import { hapticEngine } from '../../utils/hapticUtils';

export interface BalticCruiseShip {
  id: string;
  name: string;
  vesselType: 'LUXURY_CRUISE' | 'RO_PAX_FERRY' | 'ICE_EXPEDITION' | 'MEGA_YACHT';
  flag: string;
  passengerCapacity: number;
  currentRoute: string;
  speedKnots: number;
  iceClassRating: string;
  securityStatus: 'SECURE_CLEAR' | 'GPS_SPOOFING_ALERT' | 'ESCORT_REQUIRED' | 'ELEVATED_WATCH';
  aisStatus: 'ONLINE_ENCRYPTED' | 'NORMAL_BROADCAST' | 'INTERMITTENT';
}

const BALTIC_CRUISE_SHIPS: BalticCruiseShip[] = [
  {
    id: 'CRU-BAL-01',
    name: 'M/S Viking Glory',
    vesselType: 'RO_PAX_FERRY',
    flag: 'Finland (FI)',
    passengerCapacity: 2800,
    currentRoute: 'Stockholm (SE) ➔ Turku (FI) via Åland Archipelago',
    speedKnots: 19.4,
    iceClassRating: '1A Super Ice Class',
    securityStatus: 'SECURE_CLEAR',
    aisStatus: 'ONLINE_ENCRYPTED'
  },
  {
    id: 'CRU-BAL-02',
    name: 'S.S. Northern Aurora Queen',
    vesselType: 'LUXURY_CRUISE',
    flag: 'Bahamas (BS)',
    passengerCapacity: 3400,
    currentRoute: 'Copenhagen (DK) ➔ Tallinn (EE) ➔ Helsinki (FI)',
    speedKnots: 16.8,
    iceClassRating: '1B Ice Standard',
    securityStatus: 'GPS_SPOOFING_ALERT',
    aisStatus: 'INTERMITTENT'
  },
  {
    id: 'CRU-BAL-03',
    name: 'R/V Baltic Explorer Expedition',
    vesselType: 'ICE_EXPEDITION',
    flag: 'Denmark (DK)',
    passengerCapacity: 320,
    currentRoute: 'Bornholm Basin ➔ Gulf of Riga Research Transit',
    speedKnots: 13.2,
    iceClassRating: 'PC6 Polar Ice Class',
    securityStatus: 'ESCORT_REQUIRED',
    aisStatus: 'ONLINE_ENCRYPTED'
  },
  {
    id: 'CRU-BAL-04',
    name: 'M/Y Nordkap Sovereign',
    vesselType: 'MEGA_YACHT',
    flag: 'Cayman Islands (KY)',
    passengerCapacity: 36,
    currentRoute: 'Kiel Canal ➔ Gdansk Bay Private Cruise',
    speedKnots: 21.0,
    iceClassRating: '1C Lightweight Ice',
    securityStatus: 'ELEVATED_WATCH',
    aisStatus: 'NORMAL_BROADCAST'
  },
  {
    id: 'CRU-BAL-05',
    name: 'M/S Tallink Victoria I',
    vesselType: 'RO_PAX_FERRY',
    flag: 'Estonia (EE)',
    passengerCapacity: 2500,
    currentRoute: 'Tallinn (EE) ➔ Stockholm (SE) Gulf Corridor',
    speedKnots: 18.2,
    iceClassRating: '1A Ice Class',
    securityStatus: 'SECURE_CLEAR',
    aisStatus: 'ONLINE_ENCRYPTED'
  }
];

export const BalticCruiseFilterView: React.FC = () => {
  const [vessels, setVessels] = useState<BalticCruiseShip[]>(BALTIC_CRUISE_SHIPS);
  const [selectedType, setSelectedType] = useState<string>('ALL');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredVessels = vessels.filter((v) => {
    const matchesType = selectedType === 'ALL' || v.vesselType === selectedType;
    const matchesStatus = selectedStatus === 'ALL' || v.securityStatus === selectedStatus;
    const matchesQuery =
      v.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.currentRoute.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.flag.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesStatus && matchesQuery;
  });

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
            <Ship className="w-4 h-4 text-cyan-400" />
            <span>Baltic Sea Passenger Cruise & Ferry Security Filter</span>
          </h3>
          <p className="text-[10px] text-slate-400 font-sans">
            Filter cruise liners, Ro-Pax ferries, and ice-class expedition ships across the Danish Straits, Gulf of Finland, and Baltic Basins
          </p>
        </div>

        <span className="bg-cyan-950 text-cyan-300 border border-cyan-800 text-[10px] px-2.5 py-1 rounded font-bold">
          {filteredVessels.length} / {vessels.length} VESSELS TRACKED
        </span>
      </div>

      {/* Filter Controls */}
      <div className="bg-slate-950 border border-slate-800 p-3 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-auto flex-1">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search cruise vessel name, route, or flag..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-sans"
          />
        </div>

        <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
          <select
            value={selectedType}
            onChange={(e) => {
              setSelectedType(e.target.value);
              hapticEngine.trigger('click');
            }}
            className="bg-slate-900 border border-slate-800 text-xs rounded-xl px-2.5 py-1.5 text-slate-300 font-bold"
          >
            <option value="ALL">All Vessel Types</option>
            <option value="LUXURY_CRUISE">Luxury Cruise Liner</option>
            <option value="RO_PAX_FERRY">Ro-Pax Ferry</option>
            <option value="ICE_EXPEDITION">Ice Expedition</option>
            <option value="MEGA_YACHT">Mega Yacht</option>
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => {
              setSelectedStatus(e.target.value);
              hapticEngine.trigger('click');
            }}
            className="bg-slate-900 border border-slate-800 text-xs rounded-xl px-2.5 py-1.5 text-slate-300 font-bold"
          >
            <option value="ALL">All Security Statuses</option>
            <option value="SECURE_CLEAR">Secure & Clear</option>
            <option value="GPS_SPOOFING_ALERT">GPS Spoofing Alert</option>
            <option value="ESCORT_REQUIRED">Escort Required</option>
            <option value="ELEVATED_WATCH">Elevated Watch</option>
          </select>
        </div>
      </div>

      {/* Vessels Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {filteredVessels.map((v) => (
          <div key={v.id} className="bg-slate-950 border border-slate-800 p-4 rounded-2xl space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex justify-between items-start border-b border-slate-900 pb-2">
                <div>
                  <span className="text-[8px] text-cyan-400 font-bold block">{v.id} • {v.flag}</span>
                  <h4 className="text-xs font-bold text-white">{v.name}</h4>
                </div>
                <span className={`text-[8px] font-bold px-2 py-0.5 rounded ${
                  v.securityStatus === 'SECURE_CLEAR'
                    ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                    : v.securityStatus === 'GPS_SPOOFING_ALERT'
                    ? 'bg-rose-950 text-rose-300 border border-rose-800 animate-pulse'
                    : v.securityStatus === 'ESCORT_REQUIRED'
                    ? 'bg-amber-950 text-amber-300 border border-amber-800'
                    : 'bg-indigo-950 text-indigo-300 border border-indigo-800'
                }`}>
                  {v.securityStatus.replace(/_/g, ' ')}
                </span>
              </div>

              <p className="text-[10px] text-slate-300 font-sans leading-snug">
                <strong className="text-slate-400 block font-mono text-[9px]">ROUTE:</strong>
                {v.currentRoute}
              </p>

              <div className="grid grid-cols-2 gap-2 text-[9px] font-mono bg-slate-900 p-2 rounded-xl border border-slate-800">
                <div>
                  <span className="text-slate-500 block">PASSENGERS:</span>
                  <span className="text-white font-bold">{v.passengerCapacity.toLocaleString()} pax</span>
                </div>
                <div>
                  <span className="text-slate-500 block">SPEED:</span>
                  <span className="text-cyan-300 font-bold">{v.speedKnots} kts</span>
                </div>
                <div>
                  <span className="text-slate-500 block">ICE RATING:</span>
                  <span className="text-amber-300 font-bold">{v.iceClassRating}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">AIS LINK:</span>
                  <span className="text-emerald-400 font-bold">{v.aisStatus.replace(/_/g, ' ')}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};
