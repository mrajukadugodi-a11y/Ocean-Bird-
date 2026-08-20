import React, { useState } from 'react';
import { Download, FileText, FileJson, Table, CheckCircle2, Shield } from 'lucide-react';
import { hapticEngine } from '../../utils/hapticUtils';

export const PiracyDataExportTool: React.FC = () => {
  const [exportFormat, setExportFormat] = useState<'CSV' | 'JSON' | 'PDF_SUMMARY'>('CSV');
  const [includeLogs, setIncludeLogs] = useState(true);
  const [includeHotspots, setIncludeHotspots] = useState(true);
  const [includeBmpChecklist, setIncludeBmpChecklist] = useState(true);
  const [exporting, setExporting] = useState(false);

  const handleExportData = () => {
    hapticEngine.trigger('success');
    setExporting(true);

    setTimeout(() => {
      // Generate CSV / JSON blob download
      const exportPayload = {
        title: 'IMB / UKMTO Maritime Piracy Incident & Risk Export',
        exportDate: new Date().toISOString(),
        vesselInfo: { name: 'M/V Sentinel Current Vessel', flag: 'Panama', imo: '9842103' },
        activeHraCorridors: ['Bab-el-Mandeb', 'Strait of Malacca', 'Gulf of Guinea'],
        incidentsIncluded: includeLogs,
        hotspotsIncluded: includeHotspots,
        bmpStatusIncluded: includeBmpChecklist
      };

      let mimeType = 'text/csv';
      let filename = `piracy_security_export_${new Date().toISOString().substring(0, 10)}`;
      let dataStr = '';

      if (exportFormat === 'JSON') {
        mimeType = 'application/json';
        filename += '.json';
        dataStr = JSON.stringify(exportPayload, null, 2);
      } else if (exportFormat === 'CSV') {
        filename += '.csv';
        dataStr = `Report_Type,Date,Vessel,Region,Threat_Level\nPiracy_Alert,${new Date().toISOString()},M/V Sentinel,Bab-el-Mandeb,HIGH\nPiracy_Alert,${new Date().toISOString()},M/V Sentinel,Strait of Malacca,ELEVATED`;
      } else {
        filename += '.txt';
        dataStr = `=== MARITIME PIRACY SECURITY & BMP5 EXPORT SUMMARY ===\nDate: ${new Date().toLocaleString()}\nVessel: M/V Sentinel\nHRA Posture: 98/100 DEFENSE READY\n\nAll security systems nominal.`;
      }

      const blob = new Blob([dataStr], { type: mimeType });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setExporting(false);
    }, 1000);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-2xl space-y-4 font-mono text-xs">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center space-x-2">
          <Download className="w-5 h-5 text-cyan-400" />
          <h3 className="text-xs font-bold text-white uppercase tracking-wider">
            Maritime Piracy Security Intelligence Data Exporter
          </h3>
        </div>
        <span className="bg-slate-950 text-slate-400 border border-slate-800 text-[10px] px-2.5 py-0.5 rounded font-bold">
          UKMTO & IMB COMPLIANT
        </span>
      </div>

      <p className="text-[10px] text-slate-400 font-sans">
        Export comprehensive piracy threat logs, radar sensor incident reports, and BMP5 compliance logs for flag-state auditing and naval taskforce sharing.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <button
          onClick={() => {
            setExportFormat('CSV');
            hapticEngine.trigger('click');
          }}
          className={`p-3 rounded-2xl border flex items-center space-x-2 transition-all ${
            exportFormat === 'CSV'
              ? 'bg-cyan-950/80 border-cyan-400 text-cyan-200'
              : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          <Table className="w-4 h-4 text-cyan-400" />
          <div className="text-left">
            <span className="font-bold block text-xs">CSV Spreadsheet</span>
            <span className="text-[9px] text-slate-500 font-sans block">Raw table data for Excel</span>
          </div>
        </button>

        <button
          onClick={() => {
            setExportFormat('JSON');
            hapticEngine.trigger('click');
          }}
          className={`p-3 rounded-2xl border flex items-center space-x-2 transition-all ${
            exportFormat === 'JSON'
              ? 'bg-cyan-950/80 border-cyan-400 text-cyan-200'
              : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          <FileJson className="w-4 h-4 text-amber-400" />
          <div className="text-left">
            <span className="font-bold block text-xs">JSON API Payload</span>
            <span className="text-[9px] text-slate-500 font-sans block">Structured REST schema</span>
          </div>
        </button>

        <button
          onClick={() => {
            setExportFormat('PDF_SUMMARY');
            hapticEngine.trigger('click');
          }}
          className={`p-3 rounded-2xl border flex items-center space-x-2 transition-all ${
            exportFormat === 'PDF_SUMMARY'
              ? 'bg-cyan-950/80 border-cyan-400 text-cyan-200'
              : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          <FileText className="w-4 h-4 text-emerald-400" />
          <div className="text-left">
            <span className="font-bold block text-xs">PDF Audit Summary</span>
            <span className="text-[9px] text-slate-500 font-sans block">Official briefing report</span>
          </div>
        </button>
      </div>

      <div className="bg-slate-950 border border-slate-800 p-3.5 rounded-2xl space-y-2">
        <span className="text-[10px] text-slate-400 font-bold uppercase block">Include Data Modules:</span>
        <div className="flex flex-wrap gap-4 text-[11px]">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={includeLogs}
              onChange={(e) => setIncludeLogs(e.target.checked)}
              className="accent-cyan-400"
            />
            <span className="text-slate-200">Incident & Evasion Logs</span>
          </label>

          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={includeHotspots}
              onChange={(e) => setIncludeHotspots(e.target.checked)}
              className="accent-cyan-400"
            />
            <span className="text-slate-200">Regional Hotspot Coordinates</span>
          </label>

          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={includeBmpChecklist}
              onChange={(e) => setIncludeBmpChecklist(e.target.checked)}
              className="accent-cyan-400"
            />
            <span className="text-slate-200">BMP5 Checklist Readiness</span>
          </label>
        </div>
      </div>

      <button
        onClick={handleExportData}
        disabled={exporting}
        className="w-full py-2.5 bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center space-x-2 shadow-xl transition-all"
      >
        <Download className="w-4 h-4 text-slate-950" />
        <span>{exporting ? 'GENERATING EXPORT FILE...' : `EXPORT SECURITY DATA (${exportFormat})`}</span>
      </button>
    </div>
  );
};
