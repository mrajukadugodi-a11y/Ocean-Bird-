import React, { useState } from 'react';
import { Download, FileSpreadsheet, CheckCircle2, ShieldAlert, Table, Database } from 'lucide-react';
import { motion } from 'motion/react';
import { hapticEngine } from '../../utils/hapticUtils';

export interface CsvDataset {
  id: string;
  title: string;
  recordsCount: number;
  fileSizeKb: string;
  category: 'PIRACY_INCIDENTS' | 'FLEET_CII_EFFICIENCY' | 'BUNKER_FUEL_PRICES' | 'CARGO_DAMAGE_LOGS';
}

const DATASETS: CsvDataset[] = [
  {
    id: 'CSV-01',
    title: 'IMB & UKMTO Global Piracy Incidents Log (2026 YTD)',
    recordsCount: 1420,
    fileSizeKb: '384 KB',
    category: 'PIRACY_INCIDENTS'
  },
  {
    id: 'CSV-02',
    title: 'Fleet CII Carbon Intensity Ratings & EEXI Audit Matrix',
    recordsCount: 350,
    fileSizeKb: '112 KB',
    category: 'FLEET_CII_EFFICIENCY'
  },
  {
    id: 'CSV-03',
    title: 'Global Bunkering Hub Fuel Price & EU ETS Carbon Tax Telemetry',
    recordsCount: 890,
    fileSizeKb: '240 KB',
    category: 'BUNKER_FUEL_PRICES'
  },
  {
    id: 'CSV-04',
    title: 'High-Risk Area Cargo Damage & G-Force Shock Incident Log',
    recordsCount: 184,
    fileSizeKb: '92 KB',
    category: 'CARGO_DAMAGE_LOGS'
  }
];

export const ExportCsvToolView: React.FC = () => {
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const handleDownloadCsv = (dataset: CsvDataset) => {
    hapticEngine.trigger('success');
    setDownloadingId(dataset.id);

    // Build dummy CSV content for instant browser download
    let csvHeader = 'ID,Date,Region,Status,Details\n';
    let dummyRows = `${dataset.id}-01,2026-08-01,Bab-el-Mandeb Strait,VERIFIED,High-Risk Sector Entry\n${dataset.id}-02,2026-08-05,Singapore Strait,COMPLETED,Normal Route Audit\n`;
    const blob = new Blob([csvHeader + dummyRows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${dataset.category.toLowerCase()}_export_2026.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => {
      setDownloadingId(null);
    }, 1500);
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
            <span>Maritime Telemetry, Piracy & Fleet Analytics CSV Exporter</span>
          </h3>
          <p className="text-[10px] text-slate-400 font-sans">
            Export raw security incident logs, fuel forecasts, CII compliance audits, and cargo damage telemetry into standard CSV files
          </p>
        </div>

        <span className="bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px] px-2.5 py-1 rounded font-bold">
          4 READY DATASETS
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {DATASETS.map((ds) => (
          <div key={ds.id} className="bg-slate-950 border border-slate-800 p-4 rounded-2xl space-y-3">
            <div className="flex justify-between items-start border-b border-slate-900 pb-2">
              <div>
                <span className="text-[8px] text-emerald-400 font-bold block">{ds.id} • {ds.fileSizeKb}</span>
                <h4 className="text-xs font-bold text-white">{ds.title}</h4>
              </div>
              <span className="text-[8px] font-bold text-cyan-300 bg-cyan-950 border border-cyan-800 px-2 py-0.5 rounded">
                {ds.recordsCount} RECORDS
              </span>
            </div>

            <button
              onClick={() => handleDownloadCsv(ds)}
              disabled={downloadingId === ds.id}
              className="w-full py-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center space-x-1 shadow transition-all font-mono"
            >
              {downloadingId === ds.id ? (
                <CheckCircle2 className="w-4 h-4 text-slate-950 animate-bounce" />
              ) : (
                <Download className="w-4 h-4" />
              )}
              <span>{downloadingId === ds.id ? 'CSV GENERATED!' : 'DOWNLOAD CSV FILE'}</span>
            </button>
          </div>
        ))}
      </div>
    </motion.div>
  );
};
