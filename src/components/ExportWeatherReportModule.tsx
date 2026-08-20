import React, { useState } from 'react';
import {
  FileText,
  Download,
  Copy,
  Printer,
  CheckCircle2,
  Globe,
  Radio,
  ShieldAlert,
  Anchor,
  FileCheck,
  Ship,
  User,
  Sparkles
} from 'lucide-react';

export const ExportWeatherReportModule: React.FC = () => {
  const [vesselName, setVesselName] = useState<string>('M/V Sovereign Ocean Express');
  const [imoNumber, setImoNumber] = useState<string>('IMO 9845210');
  const [captainName, setCaptainName] = useState<string>('Capt. Sarah Jenkins');
  const [reportType, setReportType] = useState<'FULL_BULLETIN' | 'CYCLONE_ADVISORY' | 'PORT_COMPARISON' | 'IMO_COMPLIANCE'>('FULL_BULLETIN');
  const [selectedBasin, setSelectedBasin] = useState<string>('Indian Ocean & Bay of Bengal');
  const [includeScenarioData, setIncludeScenarioData] = useState<boolean>(true);
  const [includeBiodiversityDirectives, setIncludeBiodiversityDirectives] = useState<boolean>(true);
  const [exportNotice, setExportNotice] = useState<string | null>(null);

  const currentDate = new Date().toUTCString();

  const generateReportText = () => {
    return `
================================================================================
          OFFICIAL WMO / IMO MARITIME HYDRO-METEOROLOGICAL REPORT
================================================================================
REPORT TYPE       : ${reportType.replace('_', ' ')}
ISSUED TIMESTAMP  : ${currentDate}
VESSEL IDENTIFIER : ${vesselName} (${imoNumber})
MASTER / OFFICER  : ${captainName}
OCEAN BASIN       : ${selectedBasin}
PORTAL APP ID     : 28cb5e93-ce73-40cf-a6b7-5cf2d591ab7f
--------------------------------------------------------------------------------

1. EXECUTIVE METEOROLOGICAL SUMMARY:
   - Primary Hazard   : Tropical Trough & Monsoonal Swell Convergence
   - Max Wave Swell   : 4.8 Meters (Significant Period: 12.4s)
   - Max Sustained Wind: 48 Knots (Gusting to 62 Knots)
   - Sea Surface Temp : 29.8°C (+1.8°C above historical seasonal baseline)
   - Barometric Trend : 992 hPa (Rapidly Falling)

2. ACTIVE METEOROLOGICAL BULLETINS & CYCLONE ALERTS:
   - Alert ID GCA-IND-06: Bay of Bengal Deep Depression & Surge
   - Affected Ports   : Chattogram, Haldia Dock, Mongla Harbour
   - Advisory         : Maintain minimum 25 NM offshore distance. Lighterage 
                        operations suspended in Meghna Estuary.

3. PORT CLIMATE & ACCESS CONDITIONS:
   - Port of Rotterdam : Wave 3.4m | Wind 34kts | Berth Safety 78/100
   - Singapore Hub     : Wave 1.4m | Wind 14kts | Berth Safety 94/100
   - Chittagong Port   : Wave 4.8m | Wind 45kts | Berth Safety 48/100 (CRITICAL)

${includeScenarioData ? `4. LONG-TERM CLIMATE SCENARIO FORECAST (SSP2-4.5 TRAJECTORY):
   - Projected 2035 SST Anomaly : +2.4°C
   - Projected Sea Level Rise    : +0.68 Meters
   - Estimated Port Inundation  : 42% Berth Exposure
   - Recommended Compliance     : Zero-emission berth transition & eco-routing.` : ''}

${includeBiodiversityDirectives ? `5. MARINE BIODIVERSITY & SANCTUARY DIRECTIVES:
   - Active Zone     : Sundarbans & Coral Triangle Marine Sanctuary
   - Speed Limit     : Mandatory 10-Knot Speed Cap Enforced
   - Discharge Rules : Zero Ballast Water & Greywater Discharge within 20 NM.` : ''}

================================================================================
AUTHORIZED BY     : MARITIME CLIMATE WATCH AUTOMATED TELEMETRY NETWORK
SIGNATURE BLOCK   : _______________________________ (${captainName})
================================================================================
`;
  };

  const handleDownloadPdf = () => {
    const reportWindow = window.open('', '_blank');
    if (!reportWindow) {
      setExportNotice('⚠️ Popup blocked! Please allow popups to view printable PDF report.');
      return;
    }

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Weather_Report_${vesselName.replace(/\s+/g, '_')}</title>
        <style>
          body { font-family: monospace; background: #fff; color: #000; padding: 40px; font-size: 13px; line-height: 1.5; }
          .header { text-align: center; border-bottom: 2px solid #000; padding-bottom: 15px; margin-bottom: 20px; }
          .title { font-size: 18px; font-weight: bold; }
          .meta { margin-bottom: 20px; display: grid; grid-template-columns: 1fr 1fr; gap: 10px; border: 1px solid #000; padding: 15px; }
          .section { margin-bottom: 20px; }
          .section-title { font-weight: bold; background: #eee; padding: 5px; border-left: 4px solid #000; }
          pre { font-family: monospace; white-space: pre-wrap; word-wrap: break-word; }
          .footer { margin-top: 40px; border-top: 1px solid #000; pt-10px; display: flex; justify-content: space-between; }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="title">WMO / IMO OFFICIAL MARITIME HYDRO-METEOROLOGICAL REPORT</div>
          <div>Published App Telemetry Engine • ID: 28cb5e93-ce73-40cf-a6b7-5cf2d591ab7f</div>
        </div>

        <div class="meta">
          <div><strong>Vessel:</strong> ${vesselName} (${imoNumber})</div>
          <div><strong>Master:</strong> ${captainName}</div>
          <div><strong>Report Type:</strong> ${reportType.replace('_', ' ')}</div>
          <div><strong>Issued UTC:</strong> ${currentDate}</div>
          <div><strong>Ocean Basin:</strong> ${selectedBasin}</div>
          <div><strong>Authority:</strong> Global Satellite Telemetry Network</div>
        </div>

        <pre>${generateReportText()}</pre>

        <div class="footer">
          <div>Official SOLAS / MARPOL Weather Dispatch</div>
          <div>Signature: __________________________</div>
        </div>

        <script>
          window.onload = function() { window.print(); };
        </script>
      </body>
      </html>
    `;

    reportWindow.document.write(htmlContent);
    reportWindow.document.close();
    setExportNotice('📄 Official PDF Weather Report generated and ready for print!');
    setTimeout(() => setExportNotice(null), 4000);
  };

  const handleDownloadTxt = () => {
    const element = document.createElement('a');
    const file = new Blob([generateReportText()], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `Weather_Report_${vesselName.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

    setExportNotice('💾 Plain text weather bulletin downloaded!');
    setTimeout(() => setExportNotice(null), 4000);
  };

  const handleCopyClipboard = () => {
    navigator.clipboard.writeText(generateReportText());
    setExportNotice('📋 IMO Weather Bulletin copied to clipboard!');
    setTimeout(() => setExportNotice(null), 4000);
  };

  return (
    <div className="bg-slate-950 border border-emerald-500/40 rounded-2xl p-6 text-white space-y-6 font-mono shadow-2xl">
      {/* HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center space-x-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-1">
            <FileText className="w-4 h-4 text-emerald-400 animate-pulse" />
            <span>IMO / WMO STANDARDIZED REPORT EXPORTER</span>
          </div>
          <h2 className="text-2xl font-black text-white flex items-center space-x-2">
            <span>Export Weather & Climate Report</span>
          </h2>
          <p className="text-xs text-slate-400 font-sans mt-1 max-w-3xl">
            Generate and export official maritime weather bulletins, cyclone advisories, port climate comparisons, and climate scenario compliance reports in PDF or text formats.
          </p>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleDownloadPdf}
            className="px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-black text-xs uppercase rounded-xl shadow-lg transition-all flex items-center space-x-2 hover:scale-105"
          >
            <Printer className="w-4 h-4" />
            <span>EXPORT PDF REPORT</span>
          </button>

          <button
            onClick={handleDownloadTxt}
            className="px-3.5 py-2.5 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 font-bold text-xs rounded-xl flex items-center space-x-1.5 transition-all"
          >
            <Download className="w-4 h-4 text-cyan-400" />
            <span>Download .TXT</span>
          </button>

          <button
            onClick={handleCopyClipboard}
            className="px-3.5 py-2.5 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 font-bold text-xs rounded-xl flex items-center space-x-1.5 transition-all"
          >
            <Copy className="w-4 h-4 text-amber-400" />
            <span>Copy Text</span>
          </button>
        </div>
      </div>

      {exportNotice && (
        <div className="bg-emerald-500/20 border border-emerald-400 text-emerald-200 p-3 rounded-xl text-xs font-bold font-mono text-center animate-fadeIn">
          {exportNotice}
        </div>
      )}

      {/* PARAMETER FORM & PREVIEW GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* FORM INPUTS */}
        <div className="lg:col-span-5 bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-4 text-xs">
          <strong className="text-emerald-400 font-bold text-xs block uppercase border-b border-slate-800 pb-2">
            REPORT CONFIGURATION PARAMETERS
          </strong>

          <div className="space-y-1">
            <label className="text-slate-400 text-[10px] font-bold uppercase block">VESSEL NAME</label>
            <input
              type="text"
              value={vesselName}
              onChange={(e) => setVesselName(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono text-xs"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <label className="text-slate-400 text-[10px] font-bold uppercase block">IMO NUMBER</label>
              <input
                type="text"
                value={imoNumber}
                onChange={(e) => setImoNumber(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono text-xs"
              />
            </div>

            <div className="space-y-1">
              <label className="text-slate-400 text-[10px] font-bold uppercase block">CAPTAIN / OFFICER</label>
              <input
                type="text"
                value={captainName}
                onChange={(e) => setCaptainName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono text-xs"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-slate-400 text-[10px] font-bold uppercase block">REPORT TYPE</label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value as any)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono text-xs"
            >
              <option value="FULL_BULLETIN">Full WMO Hydro-Met Bulletin</option>
              <option value="CYCLONE_ADVISORY">Severe Cyclone & Wave Swell Advisory</option>
              <option value="PORT_COMPARISON">Cross-Hub Port Climate Sheet</option>
              <option value="IMO_COMPLIANCE">IMO 2026 Climate Compliance Report</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-slate-400 text-[10px] font-bold uppercase block">OCEAN BASIN REGION</label>
            <input
              type="text"
              value={selectedBasin}
              onChange={(e) => setSelectedBasin(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono text-xs"
            />
          </div>

          <div className="pt-2 border-t border-slate-800 space-y-2">
            <label className="text-slate-400 text-[10px] font-bold uppercase block">INCLUDE SECTIONS</label>
            
            <label className="flex items-center space-x-2 text-slate-300 cursor-pointer text-xs">
              <input
                type="checkbox"
                checked={includeScenarioData}
                onChange={(e) => setIncludeScenarioData(e.target.checked)}
                className="rounded bg-slate-950 border-slate-800 text-emerald-500 focus:ring-0"
              />
              <span>Include Long-Term Climate Scenario Trajectory</span>
            </label>

            <label className="flex items-center space-x-2 text-slate-300 cursor-pointer text-xs">
              <input
                type="checkbox"
                checked={includeBiodiversityDirectives}
                onChange={(e) => setIncludeBiodiversityDirectives(e.target.checked)}
                className="rounded bg-slate-950 border-slate-800 text-emerald-500 focus:ring-0"
              />
              <span>Include Marine Biodiversity Conservation Directives</span>
            </label>
          </div>
        </div>

        {/* PREVIEW BOX */}
        <div className="lg:col-span-7 bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-3 font-mono text-xs overflow-hidden">
          <div className="flex justify-between items-center border-b border-slate-800 pb-2">
            <strong className="text-cyan-400 uppercase font-bold text-xs flex items-center space-x-1.5">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>LIVE REPORT PREVIEW</span>
            </strong>
            <span className="text-[10px] text-slate-500">FORMAT: PRINTABLE PDF / TXT DISPATCH</span>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 h-96 overflow-y-auto text-[11px] text-slate-300 leading-relaxed font-mono whitespace-pre-wrap">
            {generateReportText()}
          </div>
        </div>
      </div>
    </div>
  );
};
