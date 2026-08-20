import React, { useState } from 'react';
import { History, ShieldAlert, AlertTriangle, Search, Filter, Calendar, FileText } from 'lucide-react';
import { motion } from 'motion/react';
import { hapticEngine } from '../../utils/hapticUtils';

export interface HistoricalAlert {
  id: string;
  date: string;
  vesselName: string;
  flagState: string;
  locationRegion: string;
  coordinates: string;
  threatCategory: 'ARMED_ATTACK' | 'BOARDING_ATTEMPT' | 'GPS_JAMMING' | 'SUSPICIOUS_APPROACH';
  severity: 'CRITICAL' | 'HIGH' | 'MODERATE' | 'LOW';
  incidentOutcome: string;
}

const HISTORICAL_ALERTS_DATA: HistoricalAlert[] = [
  {
    id: 'HIST-2024-089',
    date: '2024-11-14',
    vesselName: 'M/V BALTIC SENTINEL',
    flagState: 'Denmark (DIS)',
    locationRegion: 'Gulf of Aden / Bab-el-Mandeb',
    coordinates: '12°34\'N, 043°18\'E',
    threatCategory: 'ARMED_ATTACK',
    severity: 'CRITICAL',
    incidentOutcome: 'Onboard armed security team fired warning flares. Skiffs aborted pursuit.'
  },
  {
    id: 'HIST-2025-012',
    date: '2025-02-03',
    vesselName: 'S/T NORDIC MARINER',
    flagState: 'Marshall Islands',
    locationRegion: 'Bornholm Deep (Central Baltic)',
    coordinates: '55°10\'N, 014°45\'E',
    threatCategory: 'GPS_JAMMING',
    severity: 'HIGH',
    incidentOutcome: 'Primary GPS lock lost for 4 hours. Vessel safely switched to gyrocompass dead reckoning.'
  },
  {
    id: 'HIST-2025-104',
    date: '2025-07-19',
    vesselName: 'M/T FEHMARN CARRIER',
    flagState: 'Germany',
    locationRegion: 'Fehmarn Belt Strait',
    coordinates: '54°30\'N, 011°15\'E',
    threatCategory: 'SUSPICIOUS_APPROACH',
    severity: 'MODERATE',
    incidentOutcome: 'Shadow tanker loitered within 0.4 NM. German Federal Police vessel alerted.'
  },
  {
    id: 'HIST-2026-004',
    date: '2026-01-28',
    vesselName: 'C/V COPENHAGEN STAR',
    flagState: 'Singapore',
    locationRegion: 'Singapore Strait Eastbound Lane',
    coordinates: '01°16\'N, 104°08\'E',
    threatCategory: 'BOARDING_ATTEMPT',
    severity: 'HIGH',
    incidentOutcome: 'Perimeter razor wire and high-pressure fire hoses repelled 3 perpetrators.'
  }
];

export const HistoricalAlertsView: React.FC = () => {
  const [alerts] = useState<HistoricalAlert[]>(HISTORICAL_ALERTS_DATA);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('ALL');
  const [selectedAlert, setSelectedAlert] = useState<HistoricalAlert>(HISTORICAL_ALERTS_DATA[0]);

  const filteredAlerts = alerts.filter((a) => {
    const matchesSearch =
      a.vesselName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.locationRegion.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSeverity = selectedSeverity === 'ALL' || a.severity === selectedSeverity;
    return matchesSearch && matchesSeverity;
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
            <History className="w-4 h-4 text-cyan-400" />
            <span>IMO / IMB Maritime Piracy & Security Historical Alert Archive</span>
          </h3>
          <p className="text-[10px] text-slate-400 font-sans">
            Searchable historical database of armed attacks, boarding attempts, GPS spoofing, and naval intervention logs
          </p>
        </div>

        <span className="bg-cyan-950 text-cyan-300 border border-cyan-800 text-[10px] px-2.5 py-1 rounded font-bold">
          HISTORICAL ARCHIVE ({filteredAlerts.length} INCIDENTS)
        </span>
      </div>

      {/* Filter and Search Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-slate-950 p-3 rounded-2xl border border-slate-800">
        <div className="sm:col-span-2 flex items-center bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800">
          <Search className="w-4 h-4 text-slate-500 mr-2" />
          <input
            type="text"
            placeholder="Search by vessel, location, or Incident ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent text-xs text-white placeholder-slate-500 focus:outline-none font-sans"
          />
        </div>

        <div>
          <select
            value={selectedSeverity}
            onChange={(e) => setSelectedSeverity(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 text-xs text-amber-300 font-bold rounded-xl px-3 py-2"
          >
            <option value="ALL">All Severity Levels</option>
            <option value="CRITICAL">Critical Only</option>
            <option value="HIGH">High Severity</option>
            <option value="MODERATE">Moderate Severity</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Incident List */}
        <div className="lg:col-span-2 space-y-2">
          {filteredAlerts.map((a) => (
            <div
              key={a.id}
              onClick={() => {
                setSelectedAlert(a);
                hapticEngine.trigger('click');
              }}
              className={`p-3.5 rounded-2xl border cursor-pointer transition-all space-y-2 ${
                selectedAlert.id === a.id
                  ? 'bg-slate-950 border-cyan-400 ring-1 ring-cyan-400'
                  : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex justify-between items-center border-b border-slate-900 pb-1.5">
                <div className="flex items-center space-x-2">
                  <span className="text-[9px] text-cyan-400 font-bold">{a.id}</span>
                  <span className="text-[9px] text-slate-500 font-mono">• {a.date}</span>
                </div>

                <span
                  className={`px-2 py-0.5 rounded text-[8px] font-bold ${
                    a.severity === 'CRITICAL'
                      ? 'bg-rose-950 text-rose-300 border border-rose-800'
                      : 'bg-amber-950 text-amber-300 border border-amber-800'
                  }`}
                >
                  {a.severity}
                </span>
              </div>

              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-xs font-bold text-white">{a.vesselName}</h4>
                  <span className="text-[9px] text-slate-400 block font-sans">{a.locationRegion}</span>
                </div>
                <span className="text-[9px] font-bold text-cyan-300 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                  {a.threatCategory.replace('_', ' ')}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Selected Incident Detail Focus Card */}
        <div className="bg-slate-950 border border-slate-800 p-5 rounded-2xl space-y-3 font-mono flex flex-col justify-between">
          <div className="space-y-3">
            <div className="border-b border-slate-800 pb-2">
              <span className="text-[8px] text-cyan-400 font-bold block">{selectedAlert.id} • {selectedAlert.date}</span>
              <h4 className="text-xs font-bold text-white">{selectedAlert.vesselName}</h4>
              <span className="text-[9px] text-slate-400 block font-sans">
                FLAG: {selectedAlert.flagState} | COORDS: {selectedAlert.coordinates}
              </span>
            </div>

            <div className="space-y-1">
              <span className="text-slate-500 text-[9px] block">LOCATION REGION:</span>
              <p className="text-slate-200 text-[10px] font-sans">{selectedAlert.locationRegion}</p>
            </div>

            <div className="space-y-1 bg-slate-900 p-3 rounded-xl border border-slate-800">
              <span className="text-emerald-400 text-[9px] font-bold block">INCIDENT OUTCOME & ACTION:</span>
              <p className="text-slate-300 text-[10px] font-sans leading-relaxed">{selectedAlert.incidentOutcome}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
