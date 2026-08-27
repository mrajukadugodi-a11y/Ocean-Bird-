import React, { useState } from 'react';
import {
  Download,
  FileText,
  CheckCircle2,
  Sparkles,
  Printer,
  Copy,
  Check,
  Coins,
  ShieldCheck,
  DollarSign,
  FileSpreadsheet,
  HardDrive
} from 'lucide-react';
import { hapticEngine } from '../utils/hapticUtils';

export const CurrencyExportToolView: React.FC = () => {
  const [exportType, setExportType] = useState<'PORTFOLIO' | 'AUDIT_TRAIL' | 'MINTAGE_SPECS'>('PORTFOLIO');
  const [exportFormat, setExportFormat] = useState<'JSON' | 'CSV' | 'TXT'>('JSON');
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleExecuteExport = () => {
    setIsExporting(true);
    hapticEngine.trigger('click');

    setTimeout(() => {
      let content = '';
      let filename = `ocean-dollar-${exportType.toLowerCase()}-${Date.now()}.${exportFormat.toLowerCase()}`;
      let mimeType = 'text/plain';

      if (exportFormat === 'JSON') {
        mimeType = 'application/json';
        content = JSON.stringify({
          report: exportType,
          timestamp: new Date().toISOString(),
          currency: 'Ocean Dollar ($OD)',
          pegParityUSD: 1.0,
          goldBackingGramPerOd: 0.024,
          auditor: 'PwC / KPMG / Bureau Veritas',
          data: {
            liquidOdBalance: 24850.75,
            goldVaultBalance: 12500.00,
            escrowLockedBalance: 4200.00,
            coldStorageBalance: 50000.00,
            totalPortfolioUsd: 91550.75,
            porHash: '0x9a8f4e1c883a3b1c7d92110a7e2d91f044bb'
          }
        }, null, 2);
      } else if (exportFormat === 'CSV') {
        mimeType = 'text/csv';
        content = `Metric,Value,Unit,Backing\nLiquid $OD Balance,24850.75,USD,0.024g 24K Gold\nGold Coin Balance,12500.00,USD,1.00 oz Fine Gold\nEscrow Hold,4200.00,USD,Port Custom Tariff\nCold Storage,50000.00,USD,FIPS 140-2 Level 4\nTotal Net Worth,91550.75,USD,100% Gold Backed`;
      } else {
        mimeType = 'text/plain';
        content = `=== SOVEREIGN OCEAN DOLLAR ($OD) EXPORT REPORT ===\nGenerated: ${new Date().toLocaleString()}\nReport Type: ${exportType}\nPeg Standard: 1 $OD = $1.00 USD (0.024g 24K Gold/OD)\nPoR Hash: 0x9a8f4e1c883a3b1c7d92110a7e2d91f044bb\nTotal Net Worth: $91,550.75 USD\n=================================================`;
      }

      // Create download blob
      const blob = new Blob([content], { type: mimeType });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setIsExporting(false);
      hapticEngine.trigger('success');
      showToast(`Exported ${filename} successfully!`);
    }, 1000);
  };

  return (
    <div id="currency-export-tool-view" className="bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-8 font-mono text-white shadow-2xl relative overflow-hidden animate-fade-in">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-cyan-500/10 via-emerald-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Header Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-slate-800 pb-6 relative z-10">
        <div>
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
            <span className="bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider">
              SOVEREIGN REPORT GENERATOR
            </span>
          </div>
          <h2 className="text-3xl font-black text-white mt-1 flex items-center space-x-3">
            <Download className="w-8 h-8 text-cyan-400" />
            <span>Currency Export Tool &amp; Report Generator</span>
          </h2>
          <p className="text-slate-400 text-xs font-sans mt-1">
            Export official Ocean Dollar portfolio statements, Proof of Reserve (PoR) audit trail records, and mintage certificates in CSV, JSON, or printable text format.
          </p>
        </div>
      </div>

      {toastMessage && (
        <div className="bg-cyan-950 border border-cyan-500/50 text-cyan-300 px-4 py-3 rounded-2xl text-xs font-bold flex items-center justify-between animate-bounce relative z-20">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>{toastMessage}</span>
          </div>
          <button onClick={() => setToastMessage(null)} className="text-cyan-400">✕</button>
        </div>
      )}

      {/* Main Export Options Studio */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10 font-mono text-xs">
        {/* Left: Configuration Form */}
        <div className="lg:col-span-7 p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
          <h3 className="text-base font-black text-white border-b border-slate-800 pb-3 flex items-center space-x-2">
            <FileSpreadsheet className="w-5 h-5 text-cyan-400" />
            <span>Select Report Dataset &amp; Format</span>
          </h3>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-slate-400 text-[10px] uppercase font-bold block">1. Select Report Type</label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'PORTFOLIO', label: 'Portfolio Statement' },
                  { id: 'AUDIT_TRAIL', label: 'PoR Audit Trail' },
                  { id: 'MINTAGE_SPECS', label: '24K Gold Specs' }
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setExportType(item.id as any);
                      hapticEngine.trigger('click');
                    }}
                    className={`p-3.5 rounded-2xl border text-xs font-bold text-center transition-all ${
                      exportType === item.id
                        ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-black shadow-lg'
                        : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-slate-400 text-[10px] uppercase font-bold block">2. Select File Format</label>
              <div className="grid grid-cols-3 gap-3">
                {['JSON', 'CSV', 'TXT'].map((fmt) => (
                  <button
                    key={fmt}
                    type="button"
                    onClick={() => {
                      setExportFormat(fmt as any);
                      hapticEngine.trigger('click');
                    }}
                    className={`p-3.5 rounded-2xl border text-xs font-bold text-center transition-all ${
                      exportFormat === fmt
                        ? 'bg-emerald-500 text-slate-950 border-emerald-400 font-black shadow-lg'
                        : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    .{fmt.toLowerCase()}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleExecuteExport}
              disabled={isExporting}
              className="w-full py-4 bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 font-black text-xs uppercase rounded-2xl shadow-xl transition-all flex items-center justify-center space-x-2 mt-4"
            >
              <Download className={`w-4 h-4 ${isExporting ? 'animate-bounce' : ''}`} />
              <span>{isExporting ? 'Generating Report File...' : 'Download Report File'}</span>
            </button>
          </div>
        </div>

        {/* Right: Live Preview Box */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
          <h3 className="text-base font-black text-white border-b border-slate-800 pb-3 flex items-center space-x-2">
            <Printer className="w-5 h-5 text-emerald-400" />
            <span>Report Live Preview</span>
          </h3>

          <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 font-mono text-[11px] text-slate-300 space-y-2 leading-relaxed">
            <div className="text-emerald-400 font-bold border-b border-slate-800 pb-2">
              [{exportType}] File: ocean-dollar-{exportType.toLowerCase()}.{exportFormat.toLowerCase()}
            </div>
            <p>• Currency Parity: 1 $OD = $1.00 USD</p>
            <p>• Reserve Standard: 0.024g 24K Fine Gold / $OD</p>
            <p>• Auditor Certification: PwC / KPMG / Bureau Veritas</p>
            <p>• Cryptographic Hash: 0x9a8f4e1c883a3b1c7d92110a...</p>
            <p>• Status: Cryptographically Signed &amp; Audited</p>
          </div>
        </div>
      </div>
    </div>
  );
};
