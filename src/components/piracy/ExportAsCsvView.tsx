import React, { useState } from 'react';
import { Download, FileSpreadsheet, Share2, CheckCircle2, Sparkles, Table } from 'lucide-react';
import { motion } from 'motion/react';
import { hapticEngine } from '../../utils/hapticUtils';

export interface CsvRecord {
  id: string;
  timestamp: string;
  vesselName: string;
  mmsi: string;
  latitude: number;
  longitude: number;
  threatType: string;
  severity: string;
  seaTempC: number;
}

const SAMPLE_CSV_RECORDS: CsvRecord[] = [
  { id: 'REC-001', timestamp: '2026-08-08 02:15', vesselName: 'BALTIC SENTINEL', mmsi: '219001420', latitude: 55.12, longitude: 14.88, threatType: 'GPS_SPOOFING', severity: 'WARNING', seaTempC: 19.4 },
  { id: 'REC-002', timestamp: '2026-08-08 01:40', vesselName: 'FEHMARN EXPRESS', mmsi: '211330900', latitude: 54.50, longitude: 11.20, threatType: 'LOITERING_TANKER', severity: 'HIGH', seaTempC: 18.9 },
  { id: 'REC-003', timestamp: '2026-08-07 23:10', vesselName: 'NORDIC TRADER', mmsi: '230882100', latitude: 59.80, longitude: 24.90, threatType: 'BILGE_SPILL', severity: 'CRITICAL', seaTempC: 16.8 },
  { id: 'REC-004', timestamp: '2026-08-07 21:05', vesselName: 'RED SEA EXPLORER', mmsi: '620112400', latitude: 12.60, longitude: 43.30, threatType: 'HOSTILE_SKIFF', severity: 'CRITICAL', seaTempC: 32.1 }
];

export const ExportAsCsvView: React.FC = () => {
  const [records] = useState<CsvRecord[]>(SAMPLE_CSV_RECORDS);
  const [downloaded, setDownloaded] = useState<boolean>(false);

  const generateAndDownloadCsv = () => {
    hapticEngine.trigger('click');

    const headers = ['ID', 'Timestamp', 'Vessel Name', 'MMSI', 'Latitude', 'Longitude', 'Threat Type', 'Severity', 'Sea Temp (°C)'];
    const rows = records.map((r) => [r.id, r.timestamp, `"${r.vesselName}"`, r.mmsi, r.latitude, r.longitude, r.threatType, r.severity, r.seaTempC]);

    const csvContent = [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `maritime_threat_export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setDownloaded(true);
    hapticEngine.trigger('success');
  };

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
            <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
            <span>Maritime Telemetry Tabular Dataset CSV Exporter</span>
          </h3>
          <p className="text-[10px] text-slate-400 font-sans">
            Directly compile and download active AIS incidents, positions, sea temperatures, and pollution logs into standard CSV format
          </p>
        </div>

        <button
          onClick={generateAndDownloadCsv}
          className="bg-emerald-500 text-slate-950 font-bold text-xs px-3.5 py-1.5 rounded-xl flex items-center space-x-1.5 shadow hover:opacity-90 transition-opacity"
        >
          <Download className="w-3.5 h-3.5 text-slate-950" />
          <span>DOWNLOAD DATASET CSV</span>
        </button>
      </div>

      {/* CSV Table Preview */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-inner">
        <div className="bg-slate-900/80 px-4 py-2 border-b border-slate-800 text-[9px] text-slate-400 font-bold uppercase flex justify-between items-center">
          <span>CSV DATA PREVIEW ({records.length} ROWS)</span>
          <span className="text-emerald-400">FORMAT: RFC 4180 COMMA-SEPARATED</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-[10px] font-mono border-collapse">
            <thead>
              <tr className="bg-slate-900 text-slate-400 border-b border-slate-800">
                <th className="p-2.5">ID</th>
                <th className="p-2.5">TIMESTAMP</th>
                <th className="p-2.5">VESSEL NAME</th>
                <th className="p-2.5">MMSI</th>
                <th className="p-2.5">LAT / LON</th>
                <th className="p-2.5">THREAT TYPE</th>
                <th className="p-2.5">SEVERITY</th>
                <th className="p-2.5">SEA TEMP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-900 text-slate-300">
              {records.map((r) => (
                <tr key={r.id} className="hover:bg-slate-900/50 transition-colors">
                  <td className="p-2.5 text-cyan-400 font-bold">{r.id}</td>
                  <td className="p-2.5">{r.timestamp}</td>
                  <td className="p-2.5 text-white font-bold">{r.vesselName}</td>
                  <td className="p-2.5 text-slate-400">{r.mmsi}</td>
                  <td className="p-2.5 text-slate-400">{r.latitude}°N, {r.longitude}°E</td>
                  <td className="p-2.5 font-bold text-amber-300">{r.threatType}</td>
                  <td className="p-2.5">
                    <span className={`px-1.5 py-0.5 rounded font-black text-[8px] ${
                      r.severity === 'CRITICAL' ? 'bg-rose-950 text-rose-300 border border-rose-800' : 'bg-amber-950 text-amber-300 border border-amber-800'
                    }`}>
                      {r.severity}
                    </span>
                  </td>
                  <td className="p-2.5 text-rose-400 font-bold">{r.seaTempC}°C</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {downloaded && (
        <div className="bg-emerald-950/60 border border-emerald-800 p-2.5 rounded-xl text-emerald-300 text-[9px] flex items-center space-x-2 font-mono">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span>CSV dataset file generated and pushed to your browser download queue!</span>
        </div>
      )}
    </motion.div>
  );
};
