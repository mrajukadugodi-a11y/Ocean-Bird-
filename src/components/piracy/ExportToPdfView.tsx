import React, { useState } from 'react';
import { FileText, Download, Printer, CheckCircle2, ShieldCheck, Sparkles, FileCheck, Layers } from 'lucide-react';
import { motion } from 'motion/react';
import { hapticEngine } from '../../utils/hapticUtils';

export const ExportToPdfView: React.FC = () => {
  const [reportTitle, setReportTitle] = useState<string>('Baltic & Red Sea Maritime Intelligence & Security Brief');
  const [includeRadarData, setIncludeRadarData] = useState<boolean>(true);
  const [includePollutionLog, setIncludePollutionLog] = useState<boolean>(true);
  const [includeClimateData, setIncludeClimateData] = useState<boolean>(true);
  const [includeEmergencySop, setIncludeEmergencySop] = useState<boolean>(true);
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [exportComplete, setExportComplete] = useState<boolean>(false);

  const handleExportPdf = () => {
    hapticEngine.trigger('click');
    setIsExporting(true);
    setExportComplete(false);

    setTimeout(() => {
      setIsExporting(false);
      setExportComplete(true);
      hapticEngine.trigger('success');

      // Trigger standard browser print window for instant PDF save/print
      window.print();
    }, 1200);
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
            <FileText className="w-4 h-4 text-cyan-400" />
            <span>Maritime Threat & Climate Security Intelligence PDF Exporter</span>
          </h3>
          <p className="text-[10px] text-slate-400 font-sans">
            Configure, generate, preview, and print formal maritime security brief reports in PDF document format
          </p>
        </div>

        <span className="bg-cyan-950 text-cyan-300 border border-cyan-800 text-[10px] px-2.5 py-1 rounded font-bold">
          PDF ENGINE READY
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Export Configuration Controls */}
        <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl space-y-4 font-mono">
          <h4 className="text-xs font-bold text-white uppercase border-b border-slate-900 pb-2">
            PDF Document Settings
          </h4>

          <div className="space-y-1">
            <label className="text-[9px] text-slate-400 font-bold block">REPORT TITLE:</label>
            <input
              type="text"
              value={reportTitle}
              onChange={(e) => setReportTitle(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-sans"
            />
          </div>

          <div className="space-y-2 pt-2 border-t border-slate-900">
            <label className="text-[9px] text-slate-400 font-bold block">SECTIONS TO INCLUDE:</label>

            <label className="flex items-center space-x-2 cursor-pointer text-slate-300 text-[10px]">
              <input
                type="checkbox"
                checked={includeRadarData}
                onChange={(e) => setIncludeRadarData(e.target.checked)}
                className="rounded bg-slate-900 border-slate-800 text-cyan-500 focus:ring-0"
              />
              <span>Tactical AIS & Radar Incident Log</span>
            </label>

            <label className="flex items-center space-x-2 cursor-pointer text-slate-300 text-[10px]">
              <input
                type="checkbox"
                checked={includePollutionLog}
                onChange={(e) => setIncludePollutionLog(e.target.checked)}
                className="rounded bg-slate-900 border-slate-800 text-cyan-500 focus:ring-0"
              />
              <span>Marine Pollution & Bilge Spill Reports</span>
            </label>

            <label className="flex items-center space-x-2 cursor-pointer text-slate-300 text-[10px]">
              <input
                type="checkbox"
                checked={includeClimateData}
                onChange={(e) => setIncludeClimateData(e.target.checked)}
                className="rounded bg-slate-900 border-slate-800 text-cyan-500 focus:ring-0"
              />
              <span>Climate SST Anomalies & Gale Weather</span>
            </label>

            <label className="flex items-center space-x-2 cursor-pointer text-slate-300 text-[10px]">
              <input
                type="checkbox"
                checked={includeEmergencySop}
                onChange={(e) => setIncludeEmergencySop(e.target.checked)}
                className="rounded bg-slate-900 border-slate-800 text-cyan-500 focus:ring-0"
              />
              <span>Emergency Preparedness Checklists</span>
            </label>
          </div>

          <button
            onClick={handleExportPdf}
            disabled={isExporting}
            className="w-full py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold rounded-xl text-xs flex items-center justify-center space-x-2 shadow hover:opacity-90 transition-opacity"
          >
            {isExporting ? (
              <span>GENERATING PDF BRIEF...</span>
            ) : (
              <>
                <Download className="w-4 h-4 text-slate-950" />
                <span>GENERATE & PRINT PDF BRIEF</span>
              </>
            )}
          </button>

          {exportComplete && (
            <div className="bg-emerald-950/60 border border-emerald-800 p-2.5 rounded-xl text-emerald-300 text-[9px] flex items-center space-x-2 font-mono">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>PDF document rendered & sent to browser print/save queue!</span>
            </div>
          )}
        </div>

        {/* Live Document Preview Box */}
        <div className="lg:col-span-2 bg-slate-950 border border-slate-800 p-6 rounded-2xl font-sans space-y-4 shadow-inner text-slate-300">
          <div className="border-b border-slate-800 pb-3 flex justify-between items-start">
            <div>
              <span className="text-[9px] font-mono text-cyan-400 block font-bold">CLASSIFIED // MARITIME BRIEF</span>
              <h3 className="text-sm font-bold text-white uppercase mt-0.5">{reportTitle}</h3>
              <p className="text-[10px] text-slate-500 font-mono mt-0.5">DATE: {new Date().toISOString().split('T')[0]} • ORIGIN: GLOBAL MARITIME SECURITY NETWORK</p>
            </div>
            <FileCheck className="w-6 h-6 text-cyan-400" />
          </div>

          <div className="space-y-3 text-[10px] leading-relaxed">
            {includeRadarData && (
              <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800 space-y-1">
                <h5 className="font-mono font-bold text-cyan-300 uppercase text-[9px]">Section 1: Tactical AIS & Radar Monitoring</h5>
                <p className="text-slate-400">
                  Active tracking across Bornholm Basin, Fehmarn Belt, Bab-el-Mandeb, and Singapore Straits indicates elevated GPS spoofing and AIS transmitter disruption.
                </p>
              </div>
            )}

            {includePollutionLog && (
              <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800 space-y-1">
                <h5 className="font-mono font-bold text-rose-300 uppercase text-[9px]">Section 2: Marine Environmental & Spill Log</h5>
                <p className="text-slate-400">
                  4 active marine pollution incidents logged including unflagged shadow tanker heavy fuel oil slicks in Bornholm Deep.
                </p>
              </div>
            )}

            {includeClimateData && (
              <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800 space-y-1">
                <h5 className="font-mono font-bold text-amber-300 uppercase text-[9px]">Section 3: Ocean Climate Trends & Port Weather</h5>
                <p className="text-slate-400">
                  Multi-decadal Sea Surface Temperature anomalies show +1.7°C baseline increase in Baltic waters and gale-force wind warnings in Gulf of Finland.
                </p>
              </div>
            )}

            {includeEmergencySop && (
              <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800 space-y-1">
                <h5 className="font-mono font-bold text-emerald-300 uppercase text-[9px]">Section 4: Master Emergency Preparedness SOPs</h5>
                <p className="text-slate-400">
                  Standard Citadel retreat protocol, anti-jamming navigation procedures, and SOPEP oil spill containment checklists attached.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
