import React, { useState } from 'react';
import { FileText, Download, Printer, CheckSquare, Square, Calendar, Ship, Fuel, Award, ShieldCheck, Activity, Layers, CheckCircle2, RefreshCw, X, FileSpreadsheet } from 'lucide-react';

export interface FleetReportConfig {
  period: '24H' | '7D' | '30D' | 'YTD';
  vesselIds: string[];
  includeFuel: boolean;
  includeCiiCarbon: boolean;
  includeCrewMlc: boolean;
  includeEngineTelemetry: boolean;
  includeWeatherDelays: boolean;
  includeSafetyDrills: boolean;
  exportFormat: 'PDF' | 'CSV' | 'JSON';
}

export const FLEET_REPORT_VESSELS = [
  { id: 'VES-001', name: 'MV DESH SHANTI', type: 'Crude Oil Tanker', flag: '🇮🇳 India' },
  { id: 'VES-002', name: 'EVER GIVEN II', type: 'Ultra Large Container Ship', flag: '🇸🇬 Singapore' },
  { id: 'VES-003', name: 'BANGLADESH SAMUDRA', type: 'Capesize Bulk Carrier', flag: '🇧🇩 Bangladesh' },
  { id: 'VES-004', name: 'CORDELIA EMPRESS', type: 'Luxury Cruise Vessel', flag: '🇮🇳 India' },
  { id: 'VES-005', name: 'OCEAN PIONEER', type: 'LNG Gas Carrier', flag: '🇲🇾 Malaysia' }
];

interface FleetReportGeneratorProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const FleetReportGenerator: React.FC<FleetReportGeneratorProps> = ({ isOpen = true, onClose }) => {
  const [config, setConfig] = useState<FleetReportConfig>({
    period: '7D',
    vesselIds: ['VES-001', 'VES-002', 'VES-003'],
    includeFuel: true,
    includeCiiCarbon: true,
    includeCrewMlc: true,
    includeEngineTelemetry: true,
    includeWeatherDelays: true,
    includeSafetyDrills: true,
    exportFormat: 'PDF'
  });

  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [downloadSuccess, setDownloadSuccess] = useState<boolean>(false);

  const toggleVessel = (id: string) => {
    setConfig((prev) => {
      const exists = prev.vesselIds.includes(id);
      return {
        ...prev,
        vesselIds: exists ? prev.vesselIds.filter((v) => v !== id) : [...prev.vesselIds, id]
      };
    });
  };

  const selectAllVessels = () => {
    setConfig((prev) => ({
      ...prev,
      vesselIds: FLEET_REPORT_VESSELS.map((v) => v.id)
    }));
  };

  const handleGenerateReport = () => {
    setIsGenerating(true);
    setDownloadSuccess(false);

    setTimeout(() => {
      setIsGenerating(false);
      setDownloadSuccess(true);

      if (config.exportFormat === 'PDF') {
        window.print();
      } else {
        // Trigger simulated file download for CSV/JSON
        const element = document.createElement('a');
        const textData =
          config.exportFormat === 'CSV'
            ? `Vessel,Period,Fuel_MT,CII_Grade,CO2_Tons\nMV DESH SHANTI,7D,185.4,A,582.1\nEVER GIVEN II,7D,840.2,B,2638.0`
            : JSON.stringify(config, null, 2);
        const file = new Blob([textData], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = `Fleet_Maritime_Report_${config.period}_${Date.now()}.${config.exportFormat.toLowerCase()}`;
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
      }
    }, 1000);
  };

  return (
    <div id="fleet-report-generator-container" className="bg-slate-900 border border-slate-800 rounded-3xl p-6 text-white space-y-6 shadow-2xl">
      {/* Printable Report Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center space-x-2 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-1">
            <FileText className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span>IMO / SOLAS COMPLIANT FLEET TELEMETRY REPORT GENERATOR</span>
          </div>
          <h2 className="text-xl font-black text-white flex items-center space-x-2">
            <Printer className="w-6 h-6 text-cyan-400" />
            <span>Generate Fleet Audit & Telemetry Reports</span>
          </h2>
          <p className="text-xs text-slate-400">
            Generate printable PDF reports and export structured telemetry (Fuel, CII Carbon Index, MLC Crew Hours, Engine RPM, SOLAS Drills).
          </p>
        </div>

        {onClose && (
          <button onClick={onClose} className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300">
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Controls Configuration Panel */}
        <div className="space-y-5 lg:col-span-1 bg-slate-950 p-5 rounded-2xl border border-slate-800 text-xs font-mono">
          {/* Period Selector */}
          <div className="space-y-2">
            <label className="font-bold text-slate-300 uppercase tracking-wider block">1. Reporting Timeframe:</label>
            <div className="grid grid-cols-4 gap-1.5">
              {(['24H', '7D', '30D', 'YTD'] as const).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setConfig({ ...config, period: p })}
                  className={`py-2 rounded-xl font-bold transition-all ${
                    config.period === p
                      ? 'bg-cyan-500 text-slate-950 shadow-md'
                      : 'bg-slate-900 text-slate-400 hover:text-white'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Select Vessels Checklist */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="font-bold text-slate-300 uppercase tracking-wider block">2. Select Fleet Vessels:</label>
              <button
                type="button"
                onClick={selectAllVessels}
                className="text-[10px] text-cyan-400 hover:underline font-bold"
              >
                Select All ({FLEET_REPORT_VESSELS.length})
              </button>
            </div>
            <div className="space-y-1.5 max-h-44 overflow-y-auto pr-1">
              {FLEET_REPORT_VESSELS.map((v) => {
                const checked = config.vesselIds.includes(v.id);
                return (
                  <div
                    key={v.id}
                    onClick={() => toggleVessel(v.id)}
                    className={`p-2.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                      checked ? 'bg-slate-900 border-cyan-500 text-white' : 'bg-slate-900/40 border-slate-800 text-slate-400'
                    }`}
                  >
                    <div>
                      <span className="font-bold block text-xs">{v.name}</span>
                      <span className="text-[10px] text-slate-400">{v.type} • {v.flag}</span>
                    </div>
                    {checked ? <CheckSquare className="w-4 h-4 text-cyan-400 shrink-0" /> : <Square className="w-4 h-4 text-slate-600 shrink-0" />}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Parameter Modules Checklist */}
          <div className="space-y-2">
            <label className="font-bold text-slate-300 uppercase tracking-wider block">3. Report Data Modules:</label>
            <div className="space-y-1.5">
              {[
                { key: 'includeFuel', label: 'Fuel Oil Consumption & Speed' },
                { key: 'includeCiiCarbon', label: 'CII Carbon Intensity Rating (A-E)' },
                { key: 'includeCrewMlc', label: 'MLC 2006 Crew Hours & Rest' },
                { key: 'includeEngineTelemetry', label: 'Main Engine RPM & Aux Power' },
                { key: 'includeWeatherDelays', label: 'Weather Delays & Swell Impact' },
                { key: 'includeSafetyDrills', label: 'SOLAS Safety Drill Records' }
              ].map((m) => {
                const checked = (config as any)[m.key];
                return (
                  <label
                    key={m.key}
                    className="flex items-center space-x-2.5 cursor-pointer p-1.5 rounded-lg hover:bg-slate-900"
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={(e) => setConfig({ ...config, [m.key]: e.target.checked })}
                      className="w-4 h-4 rounded text-cyan-500 focus:ring-cyan-500 bg-slate-900 border-slate-700"
                    />
                    <span className="text-slate-200 text-xs">{m.label}</span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Export Format */}
          <div className="space-y-2">
            <label className="font-bold text-slate-300 uppercase tracking-wider block">4. Export Format:</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'PDF', label: 'Print / PDF', icon: Printer },
                { id: 'CSV', label: 'Excel CSV', icon: FileSpreadsheet },
                { id: 'JSON', label: 'API JSON', icon: FileText }
              ].map((fmt) => {
                const Icon = fmt.icon;
                return (
                  <button
                    key={fmt.id}
                    type="button"
                    onClick={() => setConfig({ ...config, exportFormat: fmt.id as any })}
                    className={`p-2.5 rounded-xl border flex flex-col items-center justify-center space-y-1 transition-all ${
                      config.exportFormat === fmt.id
                        ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300 font-bold'
                        : 'bg-slate-900 border-slate-800 text-slate-400'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-[10px]">{fmt.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Action Generate Button */}
          <button
            type="button"
            disabled={isGenerating || config.vesselIds.length === 0}
            onClick={handleGenerateReport}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-slate-950 font-black text-xs shadow-xl flex items-center justify-center space-x-2 transition-transform hover:scale-[1.01]"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
                <span>COMPILING FLEET TELEMETRY...</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4 text-slate-950" />
                <span>GENERATE & DOWNLOAD REPORT</span>
              </>
            )}
          </button>

          {downloadSuccess && (
            <div className="p-2.5 bg-emerald-500/20 border border-emerald-500/40 rounded-xl text-emerald-300 text-[11px] font-bold text-center flex items-center justify-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Report Generated & Export Triggered!</span>
            </div>
          )}
        </div>

        {/* Right Printable Document Live Preview */}
        <div className="lg:col-span-2 bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-6 relative" id="printable-maritime-pdf-document">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-widest block">OFFICIAL FLEET TELEMETRY REPORT PREVIEW</span>
              <h3 className="text-xl font-black text-white mt-0.5">Maritime Telemetry & Operations Summary</h3>
              <p className="text-xs text-slate-400 font-mono">Period: {config.period} • Generated: {new Date().toISOString().replace('T', ' ').substring(0, 16)} UTC</p>
            </div>
            <div className="p-3 bg-slate-900 border border-slate-800 rounded-2xl text-right font-mono text-xs">
              <span className="text-slate-400 block text-[10px]">SELECTED VESSELS</span>
              <strong className="text-cyan-300 text-base">{config.vesselIds.length} / {FLEET_REPORT_VESSELS.length} Vessels</strong>
            </div>
          </div>

          {/* Key Summary Stat Highlights */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
            <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
              <span className="text-slate-400 text-[10px] block">TOTAL FUEL BURNED</span>
              <strong className="text-amber-300 text-sm block">1,377.6 MT</strong>
              <span className="text-[10px] text-emerald-400">-4.2% vs baseline</span>
            </div>
            <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
              <span className="text-slate-400 text-[10px] block">CII CARBON INDEX</span>
              <strong className="text-emerald-400 text-sm block">Grade A (94.2%)</strong>
              <span className="text-[10px] text-slate-400">IMO 2026 Target</span>
            </div>
            <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
              <span className="text-slate-400 text-[10px] block">MLC CREW COMPLIANCE</span>
              <strong className="text-cyan-300 text-sm block">100% Valid Rest</strong>
              <span className="text-[10px] text-slate-400">0 Overtime Breaches</span>
            </div>
            <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
              <span className="text-slate-400 text-[10px] block">SOLAS SAFETY AUDIT</span>
              <strong className="text-emerald-300 text-sm block">Pass (100%)</strong>
              <span className="text-[10px] text-slate-400">5/5 Drills Completed</span>
            </div>
          </div>

          {/* Breakdown Table Preview */}
          <div className="space-y-3 font-mono text-xs">
            <h4 className="font-bold text-white uppercase text-xs tracking-wider flex items-center space-x-2">
              <Ship className="w-4 h-4 text-cyan-400" />
              <span>Selected Vessels Data Log Summary</span>
            </h4>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-slate-300 border-collapse">
                <thead>
                  <tr className="bg-slate-900 text-slate-400 border-b border-slate-800 text-[10px] uppercase">
                    <th className="p-2.5">Vessel Name</th>
                    <th className="p-2.5">Flag / Type</th>
                    <th className="p-2.5">Fuel Oil (MT)</th>
                    <th className="p-2.5">CII Rating</th>
                    <th className="p-2.5">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80 text-xs">
                  {FLEET_REPORT_VESSELS.filter((v) => config.vesselIds.includes(v.id)).map((vessel) => (
                    <tr key={vessel.id} className="hover:bg-slate-900/60">
                      <td className="p-2.5 font-bold text-white">{vessel.name}</td>
                      <td className="p-2.5 text-slate-400 text-[11px]">{vessel.flag} • {vessel.type}</td>
                      <td className="p-2.5 text-amber-300 font-bold">{vessel.id === 'VES-001' ? '185.4 MT' : vessel.id === 'VES-002' ? '840.2 MT' : '290.0 MT'}</td>
                      <td className="p-2.5 font-black text-emerald-400">Grade A</td>
                      <td className="p-2.5">
                        <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                          LOGGED
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 flex justify-between items-center text-[10px] font-mono text-slate-500">
            <span>IMO Resolution A.1156(32) • Certified Audit Telemetry</span>
            <span>Ocean Bird Maritime Software v3.4</span>
          </div>
        </div>
      </div>
    </div>
  );
};
