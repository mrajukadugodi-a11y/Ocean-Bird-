import React, { useState } from 'react';
import { Download, FileText, FileSpreadsheet, Copy, Check, Filter, Sparkles, Database, ShieldAlert } from 'lucide-react';
import { motion } from 'motion/react';
import { hapticEngine } from '../../utils/hapticUtils';

export interface ExportRecord {
  id: string;
  category: string;
  location: string;
  severity: string;
  sstTempC: number;
  riskRating: number;
  timestamp: string;
}

const SAMPLE_EXPORT_DATA: ExportRecord[] = [
  { id: 'LOG-801', category: 'Piracy Incident', location: '12.8200° N, 43.1500° E (Gulf of Aden)', severity: 'HIGH', sstTempC: 31.2, riskRating: 88, timestamp: '2026-08-08 14:22' },
  { id: 'LOG-802', category: 'Climate Anomaly', location: '15.1000° N, 114.2000° E (South China Sea)', severity: 'CRITICAL', sstTempC: 33.4, riskRating: 94, timestamp: '2026-08-08 18:05' },
  { id: 'LOG-803', category: 'Typhoon Track', location: '20.4000° N, 122.8000° E (Luzon Strait)', severity: 'CRITICAL', sstTempC: 32.1, riskRating: 98, timestamp: '2026-08-09 01:10' },
  { id: 'LOG-804', category: 'Fuel Surcharge Log', location: 'Singapore Strait East Gateway', severity: 'MODERATE', sstTempC: 29.8, riskRating: 42, timestamp: '2026-08-09 00:30' }
];

export const ExportDataButtonView: React.FC = () => {
  const [dataScope, setDataScope] = useState<'ALL' | 'CLIMATE' | 'PIRACY'>('ALL');
  const [copied, setCopied] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  const filteredData = SAMPLE_EXPORT_DATA.filter(item => {
    if (dataScope === 'CLIMATE') return item.category.includes('Climate') || item.category.includes('Typhoon');
    if (dataScope === 'PIRACY') return item.category.includes('Piracy');
    return true;
  });

  const exportAsCsv = () => {
    hapticEngine.trigger('success');
    const headers = 'ID,Category,Location,Severity,SST_Temp_C,Risk_Rating,Timestamp\n';
    const rows = filteredData.map(d => `"${d.id}","${d.category}","${d.location}","${d.severity}",${d.sstTempC},${d.riskRating},"${d.timestamp}"`).join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `marine_climate_export_${dataScope.toLowerCase()}_2026.csv`;
    a.click();
    setDownloadSuccess('CSV Export File Generated & Downloaded!');
    setTimeout(() => setDownloadSuccess(null), 3500);
  };

  const exportAsJson = () => {
    hapticEngine.trigger('success');
    const blob = new Blob([JSON.stringify(filteredData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `marine_climate_export_${dataScope.toLowerCase()}_2026.json`;
    a.click();
    setDownloadSuccess('JSON Data Payload Exported!');
    setTimeout(() => setDownloadSuccess(null), 3500);
  };

  const copyToClipboard = () => {
    hapticEngine.trigger('click');
    navigator.clipboard.writeText(JSON.stringify(filteredData, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
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
            <Download className="w-4 h-4 text-emerald-400" />
            <span>Bridge & Command Executive Data Export Control Suite</span>
          </h3>
          <p className="text-[10px] text-slate-400 font-sans">
            Export marine piracy alerts, sea surface temperature anomaly telemetry, and IMO compliance records into CSV, JSON, or executive PDF reports
          </p>
        </div>

        <span className="bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px] px-2.5 py-1 rounded font-bold flex items-center space-x-1">
          <Database className="w-3.5 h-3.5 text-emerald-400" />
          <span>{filteredData.length} RECORDS READY</span>
        </span>
      </div>

      {/* Filter Scope & Export Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Data Filter Selector */}
        <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl space-y-3">
          <span className="text-[10px] text-slate-400 font-bold block flex items-center space-x-1.5">
            <Filter className="w-3.5 h-3.5 text-cyan-400" />
            <span>SELECT EXPORT DATA SCOPE:</span>
          </span>

          <div className="flex space-x-2">
            <button
              onClick={() => { setDataScope('ALL'); hapticEngine.trigger('click'); }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                dataScope === 'ALL' ? 'bg-cyan-500 text-slate-950 font-black' : 'bg-slate-900 text-slate-400 border border-slate-800'
              }`}
            >
              ALL DATA
            </button>
            <button
              onClick={() => { setDataScope('CLIMATE'); hapticEngine.trigger('click'); }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                dataScope === 'CLIMATE' ? 'bg-cyan-500 text-slate-950 font-black' : 'bg-slate-900 text-slate-400 border border-slate-800'
              }`}
            >
              CLIMATE TELEMETRY
            </button>
            <button
              onClick={() => { setDataScope('PIRACY'); hapticEngine.trigger('click'); }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                dataScope === 'PIRACY' ? 'bg-rose-500 text-slate-950 font-black' : 'bg-slate-900 text-slate-400 border border-slate-800'
              }`}
            >
              PIRACY ALERTS
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl flex flex-wrap items-center justify-around gap-2">
          <button
            onClick={exportAsCsv}
            className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black px-4 py-2.5 rounded-xl text-xs transition-all flex items-center space-x-2 shadow-lg"
          >
            <FileSpreadsheet className="w-4 h-4 text-slate-950" />
            <span>EXPORT CSV DATA</span>
          </button>

          <button
            onClick={exportAsJson}
            className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black px-4 py-2.5 rounded-xl text-xs transition-all flex items-center space-x-2 shadow-lg"
          >
            <FileText className="w-4 h-4 text-slate-950" />
            <span>EXPORT JSON</span>
          </button>

          <button
            onClick={copyToClipboard}
            className="bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 font-bold px-3.5 py-2.5 rounded-xl text-xs transition-all flex items-center space-x-1.5"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-slate-400" />}
            <span>{copied ? 'COPIED!' : 'COPY DATA'}</span>
          </button>
        </div>
      </div>

      {downloadSuccess && (
        <div className="bg-emerald-950 border border-emerald-800 text-emerald-300 p-3 rounded-xl text-xs font-bold flex items-center space-x-2">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{downloadSuccess}</span>
        </div>
      )}

      {/* Live Data Table Preview */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="p-3 border-b border-slate-800 bg-slate-900/60 font-bold text-slate-300 text-[10px] uppercase">
          LIVE DATA PAYLOAD PREVIEW ({filteredData.length} ITEMS)
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[10px]">
            <thead className="bg-slate-900 text-slate-400 border-b border-slate-800">
              <tr>
                <th className="p-2.5 font-bold">LOG ID</th>
                <th className="p-2.5 font-bold">CATEGORY</th>
                <th className="p-2.5 font-bold">LOCATION</th>
                <th className="p-2.5 font-bold">SST TEMP</th>
                <th className="p-2.5 font-bold">RISK INDEX</th>
                <th className="p-2.5 font-bold">TIMESTAMP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-900 text-slate-300">
              {filteredData.map((row) => (
                <tr key={row.id} className="hover:bg-slate-900/40">
                  <td className="p-2.5 font-bold text-cyan-400">{row.id}</td>
                  <td className="p-2.5">{row.category}</td>
                  <td className="p-2.5 font-sans">{row.location}</td>
                  <td className="p-2.5 text-amber-300 font-bold">{row.sstTempC}°C</td>
                  <td className="p-2.5 text-rose-400 font-bold">{row.riskRating}/100</td>
                  <td className="p-2.5 text-slate-500">{row.timestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};
