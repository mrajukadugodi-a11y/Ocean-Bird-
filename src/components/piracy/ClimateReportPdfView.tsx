import React, { useState } from 'react';
import { FileText, Download, CheckCircle2, Sparkles, Printer, Shield, Cpu, RefreshCw } from 'lucide-react';
import { motion } from 'motion/react';
import { hapticEngine } from '../../utils/hapticUtils';

export const ClimateReportPdfView: React.FC = () => {
  const [reportType, setReportType] = useState<'ANNUAL_CII' | 'DECARBONIZATION_ROADMAP' | 'EXTREME_WEATHER_EXPOSURE'>('ANNUAL_CII');
  const [isGenerating, setIsGenerating] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleGeneratePdf = () => {
    setIsGenerating(true);
    setDownloadSuccess(false);
    hapticEngine.trigger('heavy');

    setTimeout(() => {
      setIsGenerating(false);
      setDownloadSuccess(true);
      hapticEngine.trigger('success');
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
            <FileText className="w-4 h-4 text-emerald-400" />
            <span>Executive Climate Risk & IMO Compliance PDF Report Generator</span>
          </h3>
          <p className="text-[10px] text-slate-400 font-sans">
            One-click audit-ready PDF export for IMO CII compliance certificates, fleet carbon intensity, and climate risk exposure
          </p>
        </div>

        <span className="bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px] px-2.5 py-1 rounded font-bold flex items-center space-x-1">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          <span>IMO AUDIT COMPLIANT</span>
        </span>
      </div>

      {/* Report Configuration Form */}
      <div className="bg-slate-950 border border-slate-800 p-5 rounded-2xl space-y-4">
        <div className="space-y-2">
          <label className="text-[9px] text-slate-500 font-bold block">SELECT CLIMATE REPORT TYPE:</label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              {
                id: 'ANNUAL_CII',
                title: 'IMO Carbon Intensity Indicator (CII)',
                desc: 'Official MEPC rating report (Grades A-E) with CO2 grams per DWT-NM.'
              },
              {
                id: 'DECARBONIZATION_ROADMAP',
                title: 'Fleet Decarbonization & WASP Plan',
                desc: 'Audit of rotor sail retrofits, bio-fuel blending, and speed optimization.'
              },
              {
                id: 'EXTREME_WEATHER_EXPOSURE',
                title: 'Climate Hazard Exposure Dossier',
                desc: 'Historical and 2030 projected super typhoon and sea level rise exposure.'
              }
            ].map((rep) => (
              <div
                key={rep.id}
                onClick={() => {
                  setReportType(rep.id as any);
                  hapticEngine.trigger('click');
                }}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all space-y-1.5 ${
                  reportType === rep.id
                    ? 'bg-emerald-950/60 border-emerald-400 ring-1 ring-emerald-400'
                    : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                }`}
              >
                <h4 className="text-xs font-bold text-white">{rep.title}</h4>
                <p className="text-[9px] text-slate-400 font-sans leading-normal">{rep.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-800">
          <div className="text-[9px] text-slate-400 font-sans">
            Report metadata: <strong className="text-white">IMO #9842109 • M/V PACIFIC HORIZON • 2026 AUDIT CYCLE</strong>
          </div>

          <button
            onClick={handleGeneratePdf}
            disabled={isGenerating}
            className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black px-6 py-2.5 rounded-xl text-xs flex items-center justify-center space-x-2 transition-all shadow-lg shadow-emerald-500/20 disabled:opacity-50"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
                <span>BUILDING AUDIT PDF...</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4 text-slate-950" />
                <span>GENERATE EXECUTIVE PDF REPORT</span>
              </>
            )}
          </button>
        </div>

        {downloadSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-emerald-950/80 border border-emerald-700/80 p-3.5 rounded-xl flex items-center justify-between text-[10px] text-emerald-200 font-mono"
          >
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>PDF Report Successfully Compiled & Ready for Download! (Climate_Audit_Report_2026.pdf)</span>
            </div>
            <button
              onClick={() => setDownloadSuccess(false)}
              className="text-emerald-400 font-bold hover:underline"
            >
              DISMISS
            </button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};
