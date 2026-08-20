import React, { useState } from 'react';
import { FileText, Download, Printer, ShieldCheck, TrendingUp, DollarSign, Award, CheckCircle2 } from 'lucide-react';
import { hapticEngine } from '../../utils/hapticUtils';

export interface TradeSummaryReport {
  id: string;
  reportPeriod: string;
  totalVolumeTeu: string;
  totalTradeValuationUsd: string;
  piracySurchargePaidUsd: string;
  bimcoComplianceRating: string;
  topRiskCorridor: string;
}

const REPORT_SAMPLES: TradeSummaryReport[] = [
  {
    id: 'REPORT-2026-Q3',
    reportPeriod: '2026 Third Quarter Maritime Trade & Risk Summary',
    totalVolumeTeu: '218.4M TEU',
    totalTradeValuationUsd: '$3.82 Trillion USD',
    piracySurchargePaidUsd: '$142.5M USD (War Risk & Private Security)',
    bimcoComplianceRating: '99.4% Verified Clean MOA Compliance',
    topRiskCorridor: 'Bab-el-Mandeb & Gulf of Guinea'
  },
  {
    id: 'REPORT-2026-YTD',
    reportPeriod: '2026 Year-To-Date Executive Fleet & Market Brief',
    totalVolumeTeu: '642.1M TEU',
    totalTradeValuationUsd: '$11.45 Trillion USD',
    piracySurchargePaidUsd: '$418.0M USD',
    bimcoComplianceRating: '98.8% Verified Clean MOA Compliance',
    topRiskCorridor: 'Strait of Malacca & Red Sea Approaches'
  }
];

export const PdfTradeSummaryGeneratorView: React.FC = () => {
  const [selectedReport, setSelectedReport] = useState<TradeSummaryReport>(REPORT_SAMPLES[0]);
  const [executiveNotes, setExecutiveNotes] = useState<string>(
    'Global seaborne container throughput expanded +4.2% YoY despite high-risk area security surcharges. Recommended maintaining armed guards on Bab-el-Mandeb transits.'
  );

  const handlePrint = () => {
    hapticEngine.trigger('click');
    window.print();
  };

  const handleDownload = () => {
    hapticEngine.trigger('success');
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-2xl space-y-4 font-mono text-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="space-y-0.5">
          <h3 className="text-xs font-bold text-white uppercase flex items-center space-x-2">
            <FileText className="w-4 h-4 text-cyan-400" />
            <span>Executive Maritime Trade & Threat Intelligence PDF Summaries</span>
          </h3>
          <p className="text-[10px] text-slate-400 font-sans">
            Generate formal executive briefing PDFs containing trade volume metrics, piracy risk surcharges, and BIMCO compliance auditing
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleDownload}
            className="px-3.5 py-1.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-black rounded-xl text-xs flex items-center space-x-1 shadow transition-all"
          >
            <Download className="w-4 h-4" />
            <span>DOWNLOAD PDF</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Controls Column */}
        <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl space-y-3 font-sans">
          <span className="text-xs font-bold text-white font-mono block border-b border-slate-800 pb-2">Report Configuration & Period</span>

          <div className="space-y-2">
            {REPORT_SAMPLES.map((report) => (
              <div
                key={report.id}
                onClick={() => {
                  setSelectedReport(report);
                  hapticEngine.trigger('click');
                }}
                className={`p-3 rounded-xl border cursor-pointer transition-all space-y-1 ${
                  selectedReport.id === report.id
                    ? 'bg-slate-900 border-cyan-400 ring-1 ring-cyan-400 font-mono'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 font-mono'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="text-[8px] text-cyan-400 font-bold block">{report.id}</span>
                  <span className="text-[8px] text-emerald-400 font-bold bg-emerald-950 border border-emerald-800 px-1.5 py-0.5 rounded">
                    APPROVED BRIEF
                  </span>
                </div>
                <h4 className="text-xs font-bold text-white">{report.reportPeriod}</h4>
              </div>
            ))}
          </div>

          <div>
            <label className="text-[10px] text-slate-400 font-mono block mb-1">EXECUTIVE NOTES & RECOMMENDATIONS:</label>
            <textarea
              rows={3}
              value={executiveNotes}
              onChange={(e) => setExecutiveNotes(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2 text-white focus:outline-none focus:border-cyan-500 text-xs font-sans"
            />
          </div>
        </div>

        {/* Live Executive PDF Document Brief Sheet */}
        <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl flex flex-col justify-between space-y-3">
          <div className="space-y-3 border-b border-slate-800 pb-3">
            <div className="flex justify-between items-center border-b border-slate-800/80 pb-2">
              <div>
                <span className="text-[8px] text-cyan-400 font-bold block uppercase">MARITIME INTELLIGENCE EXECUTIVE SUMMARY</span>
                <h4 className="text-xs font-bold text-white">{selectedReport.reportPeriod}</h4>
              </div>
              <span className="text-[8px] font-bold text-emerald-400 bg-emerald-950 border border-emerald-800 px-2 py-0.5 rounded">
                OFFICIAL REPORT
              </span>
            </div>

            <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 space-y-2 text-[10px] font-mono text-slate-300">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="text-slate-500 text-[8px] block">TOTAL SEABORNE VOLUME:</span>
                  <span className="text-cyan-300 font-bold">{selectedReport.totalVolumeTeu}</span>
                </div>
                <div>
                  <span className="text-slate-500 text-[8px] block">TRADE VALUATION:</span>
                  <span className="text-emerald-400 font-bold">{selectedReport.totalTradeValuationUsd}</span>
                </div>
              </div>

              <div className="border-t border-slate-800 pt-2 grid grid-cols-2 gap-2">
                <div>
                  <span className="text-slate-500 text-[8px] block">PIRACY SURCHARGE EXPENSE:</span>
                  <span className="text-rose-400 font-bold">{selectedReport.piracySurchargePaidUsd}</span>
                </div>
                <div>
                  <span className="text-slate-500 text-[8px] block">BIMCO COMPLIANCE:</span>
                  <span className="text-amber-300 font-bold">{selectedReport.bimcoComplianceRating}</span>
                </div>
              </div>

              <div className="border-t border-slate-800 pt-2 font-sans">
                <span className="text-slate-500 font-mono text-[8px] block mb-0.5">EXECUTIVE RECOMMENDATIONS:</span>
                <p className="text-slate-200 text-[9px] italic leading-relaxed">{executiveNotes}</p>
              </div>
            </div>
          </div>

          <button
            onClick={handlePrint}
            className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-slate-300 font-bold rounded-xl text-xs border border-slate-800 flex items-center justify-center space-x-1.5 transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>PRINT / PRINT TO PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
};
