import React, { useState } from 'react';
import { ShieldCheck, ShieldAlert, Anchor, Search, Star, Award, AlertTriangle, FileText } from 'lucide-react';
import { motion } from 'motion/react';
import { hapticEngine } from '../../utils/hapticUtils';

export interface PortSafetyRating {
  id: string;
  portName: string;
  country: string;
  unLocode: string;
  ispsCodeCompliance: 'LEVEL_1_NORMAL' | 'LEVEL_2_HEIGHTENED' | 'LEVEL_3_EXCEPTIONAL';
  piracyThreatIndex: 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL';
  overallSafetyStars: number; // 1 to 5
  cyberSecurityScorePct: number;
  lastAuditedDate: string;
  keySafetyNotes: string;
}

const PORT_SAFETY_DATA: PortSafetyRating[] = [
  {
    id: 'PSR-RTM',
    portName: 'Port of Rotterdam',
    country: 'Netherlands',
    unLocode: 'NL RTM',
    ispsCodeCompliance: 'LEVEL_1_NORMAL',
    piracyThreatIndex: 'LOW',
    overallSafetyStars: 5,
    cyberSecurityScorePct: 98,
    lastAuditedDate: '2026-07-15',
    keySafetyNotes: 'Automated perimeter drones, 24/7 AIS vessel screening, and ISPS Level 1 strict compliance.'
  },
  {
    id: 'PSR-SIN',
    portName: 'Port of Singapore',
    country: 'Singapore',
    unLocode: 'SG SIN',
    ispsCodeCompliance: 'LEVEL_1_NORMAL',
    piracyThreatIndex: 'MODERATE',
    overallSafetyStars: 5,
    cyberSecurityScorePct: 96,
    lastAuditedDate: '2026-08-01',
    keySafetyNotes: 'Patrol boat escorts, multi-agency anti-sea robbery taskforce, and advanced radar locks.'
  },
  {
    id: 'PSR-CPH',
    portName: 'Port of Copenhagen & Malmö',
    country: 'Denmark / Sweden',
    unLocode: 'DK CPH',
    ispsCodeCompliance: 'LEVEL_1_NORMAL',
    piracyThreatIndex: 'LOW',
    overallSafetyStars: 5,
    cyberSecurityScorePct: 94,
    lastAuditedDate: '2026-06-20',
    keySafetyNotes: 'Baltic Sea Joint Patrol integration, zero recorded security breaches in past 36 months.'
  },
  {
    id: 'PSR-ADE',
    portName: 'Port of Aden',
    country: 'Yemen',
    unLocode: 'YE ADE',
    ispsCodeCompliance: 'LEVEL_2_HEIGHTENED',
    piracyThreatIndex: 'HIGH',
    overallSafetyStars: 2,
    cyberSecurityScorePct: 62,
    lastAuditedDate: '2026-08-04',
    keySafetyNotes: 'Heightened threat corridor; armed guard escorts and convoy formations mandatory for commercial berths.'
  }
];

export const PortSafetyRatingView: React.FC = () => {
  const [ports] = useState<PortSafetyRating[]>(PORT_SAFETY_DATA);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedPort, setSelectedPort] = useState<PortSafetyRating>(PORT_SAFETY_DATA[0]);

  const filteredPorts = ports.filter(
    (p) =>
      p.portName.toLowerCase().includes(searchQuery.toLowerCase()) ||
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
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>International Maritime Port Security & Safety Compliance Index</span>
          </h3>
          <p className="text-[10px] text-slate-400 font-sans">
            ISPS Code compliance levels, piracy threat indices, cyber defense scores, and official safety audits
          </p>
        </div>

        <span className="bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px] px-2.5 py-1 rounded font-bold">
          ISPS MARITIME SAFETY AUDITED
        </span>
      </div>

      <div className="bg-slate-950 border border-slate-800 p-3 rounded-2xl flex items-center">
        <Search className="w-4 h-4 text-slate-500 mr-2" />
        <input
          type="text"
          placeholder="Search port by name, UN/LOCODE, or country..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-transparent text-xs text-white placeholder-slate-500 focus:outline-none font-sans"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Port Grid List */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {filteredPorts.map((p) => (
            <div
              key={p.id}
              onClick={() => {
                setSelectedPort(p);
                hapticEngine.trigger('click');
              }}
              className={`p-4 rounded-2xl border cursor-pointer transition-all space-y-3 ${
                selectedPort.id === p.id
                  ? 'bg-slate-950 border-cyan-400 ring-1 ring-cyan-400'
                  : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex justify-between items-start border-b border-slate-900 pb-2">
                <div>
                  <span className="text-[8px] text-cyan-400 font-bold block">{p.unLocode}</span>
                  <h4 className="text-xs font-bold text-white">{p.portName}</h4>
                  <span className="text-[9px] text-slate-400 block font-sans">{p.country}</span>
                </div>

                <div className="flex items-center space-x-0.5 text-amber-400">
                  {Array.from({ length: p.overallSafetyStars }).map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-amber-400" />
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[9px] font-mono bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                <div>
                  <span className="text-slate-500 block">ISPS CODE:</span>
                  <span className="text-emerald-400 font-bold">{p.ispsCodeCompliance.replace(/_/g, ' ')}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">CYBER SCORE:</span>
                  <span className="text-cyan-300 font-bold">{p.cyberSecurityScorePct}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Selected Port Detailed Focus */}
        <div className="bg-slate-950 border border-slate-800 p-5 rounded-2xl space-y-4 font-mono flex flex-col justify-between">
          <div className="space-y-3">
            <div className="border-b border-slate-800 pb-2">
              <span className="text-[8px] text-cyan-400 font-bold block">{selectedPort.unLocode}</span>
              <h4 className="text-xs font-bold text-white">{selectedPort.portName}</h4>
              <span className="text-[9px] text-slate-400 block font-sans">{selectedPort.country}</span>
            </div>

            <p className="text-[10px] text-slate-300 font-sans leading-relaxed">
              {selectedPort.keySafetyNotes}
            </p>

            <div className="space-y-2 bg-slate-900 p-3 rounded-xl border border-slate-800 text-[10px]">
              <div className="flex justify-between">
                <span className="text-slate-500">ISPS COMPLIANCE:</span>
                <span className="text-emerald-300 font-bold">{selectedPort.ispsCodeCompliance.replace(/_/g, ' ')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">PIRACY THREAT INDEX:</span>
                <span className="text-rose-400 font-bold">{selectedPort.piracyThreatIndex}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">LAST AUDIT DATE:</span>
                <span className="text-white font-bold">{selectedPort.lastAuditedDate}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
