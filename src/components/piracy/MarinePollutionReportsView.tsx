import React, { useState } from 'react';
import { AlertOctagon, ShieldAlert, Droplets, Filter, CheckCircle2, Search, FileText, Send } from 'lucide-react';
import { motion } from 'motion/react';
import { hapticEngine } from '../../utils/hapticUtils';

export interface PollutionReport {
  id: string;
  location: string;
  coordinates: string;
  pollutantType: 'OIL_SLICK' | 'ILLEGAL_BILGE_DUMP' | 'PLASTIC_DEBRIS' | 'HAZARDOUS_CHEMICAL';
  estimatedVolumeTons: number;
  reportedBy: string;
  status: 'ACTIVE_SPILL' | 'CONTAINED' | 'UNDER_CLEANUP' | 'RESOLVED';
  timestamp: string;
}

const POLLUTION_REPORTS: PollutionReport[] = [
  {
    id: 'POL-2026-081',
    location: 'Bornholm Deep (Baltic Sea)',
    coordinates: '55° 12.4\' N / 015° 08.2\' E',
    pollutantType: 'OIL_SLICK',
    estimatedVolumeTons: 45.0,
    reportedBy: 'Danish Maritime Authority Patrol Flight',
    status: 'ACTIVE_SPILL',
    timestamp: '2026-08-07 09:15 UTC'
  },
  {
    id: 'POL-2026-079',
    location: 'Fehmarn Belt Approach',
    coordinates: '54° 28.1\' N / 011° 19.5\' E',
    pollutantType: 'ILLEGAL_BILGE_DUMP',
    estimatedVolumeTons: 12.5,
    reportedBy: 'M/S Viking Glory Sentinel Radar',
    status: 'UNDER_CLEANUP',
    timestamp: '2026-08-06 22:40 UTC'
  },
  {
    id: 'POL-2026-074',
    location: 'Gulf of Finland Corridor',
    coordinates: '59° 40.0\' N / 024° 30.0\' E',
    pollutantType: 'HAZARDOUS_CHEMICAL',
    estimatedVolumeTons: 8.0,
    reportedBy: 'Finnish Coast Guard Patrol Ship Turva',
    status: 'CONTAINED',
    timestamp: '2026-08-05 14:10 UTC'
  },
  {
    id: 'POL-2026-068',
    location: 'Singapore Strait East TSS',
    coordinates: '01° 15.8\' N / 104° 03.2\' E',
    pollutantType: 'PLASTIC_DEBRIS',
    estimatedVolumeTons: 28.0,
    reportedBy: 'MPA Singapore Ocean Cleanup Drone',
    status: 'RESOLVED',
    timestamp: '2026-08-04 11:20 UTC'
  }
];

export const MarinePollutionReportsView: React.FC = () => {
  const [reports, setReports] = useState<PollutionReport[]>(POLLUTION_REPORTS);
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredReports = reports.filter((r) => {
    const matchesStatus = selectedStatus === 'ALL' || r.status === selectedStatus;
    const matchesQuery =
      r.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.pollutantType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesQuery;
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
            <AlertOctagon className="w-4 h-4 text-rose-400" />
            <span>Real-time Satellite & Patrol Marine Pollution Incident Monitor</span>
          </h3>
          <p className="text-[10px] text-slate-400 font-sans">
            Tracking illegal bilge dumping, heavy fuel oil slicks, hazardous chemical spills, and cleanup vessel responses
          </p>
        </div>

        <span className="bg-rose-950 text-rose-300 border border-rose-800 text-[10px] px-2.5 py-1 rounded font-bold">
          {filteredReports.length} POLLUTION INCIDENTS LOGGED
        </span>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-slate-950 border border-slate-800 p-3 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-auto flex-1">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search incident ID, location, or pollutant type..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-sans"
          />
        </div>

        <select
          value={selectedStatus}
          onChange={(e) => {
            setSelectedStatus(e.target.value);
            hapticEngine.trigger('click');
          }}
          className="bg-slate-900 border border-slate-800 text-xs rounded-xl px-2.5 py-1.5 text-slate-300 font-bold w-full sm:w-auto"
        >
          <option value="ALL">All Incident Statuses</option>
          <option value="ACTIVE_SPILL">Active Spill (Critical)</option>
          <option value="UNDER_CLEANUP">Under Cleanup Response</option>
          <option value="CONTAINED">Contained</option>
          <option value="RESOLVED">Resolved / Cleared</option>
        </select>
      </div>

      {/* Incident List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {filteredReports.map((r) => (
          <div key={r.id} className="bg-slate-950 border border-slate-800 p-4 rounded-2xl space-y-3">
            <div className="flex justify-between items-start border-b border-slate-900 pb-2">
              <div>
                <span className="text-[8px] text-cyan-400 font-bold block">{r.id} • {r.timestamp}</span>
                <h4 className="text-xs font-bold text-white">{r.location}</h4>
                <span className="text-[9px] text-slate-400 block font-sans">{r.coordinates}</span>
              </div>
              <span className={`text-[8px] font-bold px-2 py-0.5 rounded ${
                r.status === 'ACTIVE_SPILL'
                  ? 'bg-rose-950 text-rose-300 border border-rose-800 animate-pulse'
                  : r.status === 'UNDER_CLEANUP'
                  ? 'bg-amber-950 text-amber-300 border border-amber-800'
                  : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
              }`}>
                {r.status.replace(/_/g, ' ')}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[9px] font-mono bg-slate-900 p-2.5 rounded-xl border border-slate-800">
              <div>
                <span className="text-slate-500 block">TYPE:</span>
                <span className="text-white font-bold">{r.pollutantType.replace(/_/g, ' ')}</span>
              </div>
              <div>
                <span className="text-slate-500 block">VOLUME EST:</span>
                <span className="text-rose-400 font-bold">{r.estimatedVolumeTons} Metric Tons</span>
              </div>
            </div>

            <p className="text-[10px] text-slate-400 font-sans">
              <strong className="text-slate-500 font-mono">REPORTED BY: </strong> {r.reportedBy}
            </p>
          </div>
        ))}
      </div>
    </motion.div>
  );
};
