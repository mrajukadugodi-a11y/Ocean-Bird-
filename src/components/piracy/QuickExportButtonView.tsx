import React, { useState } from 'react';
import { Download, FileText, Database, CheckCircle2, Sparkles, Layers, Share2 } from 'lucide-react';
import { motion } from 'motion/react';
import { hapticEngine } from '../../utils/hapticUtils';

export const QuickExportButtonView: React.FC = () => {
  const [exportingType, setExportingType] = useState<string | null>(null);
  const [lastExport, setLastExport] = useState<string | null>(null);

  const handleExport = (type: 'JSON' | 'CSV' | 'PDF') => {
    hapticEngine.trigger('click');
    setExportingType(type);

    setTimeout(() => {
      setExportingType(null);
      setLastExport(type);
      hapticEngine.trigger('success');

      if (type === 'PDF') {
        window.print();
      }
    }, 1000);
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
            <Download className="w-4 h-4 text-cyan-400" />
            <span>Instant One-Click Maritime Security Data & Incident Quick Exporter</span>
          </h3>
          <p className="text-[10px] text-slate-400 font-sans">
            Rapid multi-format export of current AIS radar telemetry, pollution reports, and weather briefings
          </p>
        </div>

        <span className="bg-cyan-950 text-cyan-300 border border-cyan-800 text-[10px] px-2.5 py-1 rounded font-bold">
          QUICK EXPORT BAR
        </span>
      </div>

      <div className="bg-slate-950 border border-slate-800 p-5 rounded-2xl grid grid-cols-1 sm:grid-cols-3 gap-3">
        <button
          onClick={() => handleExport('JSON')}
          disabled={exportingType !== null}
          className="p-4 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-2xl space-y-2 text-left transition-all group"
        >
          <div className="flex justify-between items-center text-cyan-400">
            <Database className="w-5 h-5" />
            <span className="text-[8px] font-bold px-2 py-0.5 rounded bg-cyan-950 border border-cyan-800">
              STRUCTURAL DATA
            </span>
          </div>
          <h4 className="text-xs font-bold text-white group-hover:text-cyan-300">EXPORT AS JSON</h4>
          <p className="text-[9px] text-slate-400 font-sans">Complete raw state export for API & SIEM integration.</p>
        </button>

        <button
          onClick={() => handleExport('CSV')}
          disabled={exportingType !== null}
          className="p-4 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-2xl space-y-2 text-left transition-all group"
        >
          <div className="flex justify-between items-center text-emerald-400">
            <Share2 className="w-5 h-5" />
            <span className="text-[8px] font-bold px-2 py-0.5 rounded bg-emerald-950 border border-emerald-800">
              SPREADSHEET
            </span>
          </div>
          <h4 className="text-xs font-bold text-white group-hover:text-emerald-300">EXPORT AS CSV</h4>
          <p className="text-[9px] text-slate-400 font-sans">Tabular incident & weather log data for Excel / GIS.</p>
        </button>

        <button
          onClick={() => handleExport('PDF')}
          disabled={exportingType !== null}
          className="p-4 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-2xl space-y-2 text-left transition-all group"
        >
          <div className="flex justify-between items-center text-amber-400">
            <FileText className="w-5 h-5" />
            <span className="text-[8px] font-bold px-2 py-0.5 rounded bg-amber-950 border border-amber-800">
              DOCUMENT
            </span>
          </div>
          <h4 className="text-xs font-bold text-white group-hover:text-amber-300">PRINT PDF BRIEF</h4>
          <p className="text-[9px] text-slate-400 font-sans">Formal executive summary document for bridge & master logs.</p>
        </button>
      </div>

      {lastExport && (
        <div className="bg-emerald-950/60 border border-emerald-800 p-3 rounded-xl text-emerald-300 text-[10px] flex items-center space-x-2 font-mono">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span>Quick export of format {lastExport} successfully generated!</span>
        </div>
      )}
    </motion.div>
  );
};
