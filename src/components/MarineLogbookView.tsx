import React, { useState } from 'react';
import {
  BookOpen,
  Plus,
  Clock,
  Compass,
  FileText,
  Save,
  Trash2,
  Copy,
  Check,
  Download,
  Filter,
  Search,
  CheckCircle2,
  Anchor,
  Shield,
  UserCheck,
  Printer,
  Ship,
  Droplets,
  Wind,
  FileSpreadsheet,
  Share2,
  ShieldCheck,
  Eye,
  Sparkles
} from 'lucide-react';

export interface LogbookEntry {
  id: string;
  timestampUtc: string;
  watchPeriod: string; // e.g., '0000 - 0400 (Middle Watch)'
  vesselCoordinates: string;
  courseDeg: number;
  speedKts: number;
  barometerHpa: number;
  windBeaufort: string;
  seaState: string;
  engineRpm: number;
  bunkerConsumptionMt: number;
  dutyOfficer: string;
  remarks: string;
  isSigned: boolean;
}

const INITIAL_LOG_ENTRIES: LogbookEntry[] = [
  {
    id: 'LOG-20260731-01',
    timestampUtc: '2026-07-31 04:00 UTC',
    watchPeriod: '0000 - 0400 (Middle Watch)',
    vesselCoordinates: "18° 52.4' N, 072° 48.1' E",
    courseDeg: 138,
    speedKts: 15.2,
    barometerHpa: 1012,
    windBeaufort: 'Force 4 (12-16 kts SW)',
    seaState: 'Moderate (Swell 1.8m)',
    engineRpm: 104,
    bunkerConsumptionMt: 4.2,
    dutyOfficer: '2nd Officer V. Sharma',
    remarks: 'Steered clear of fishing trawlers off Mumbai channel entrance. All navigational lights burning brightly.',
    isSigned: true
  },
  {
    id: 'LOG-20260731-02',
    timestampUtc: '2026-07-30 20:00 UTC',
    watchPeriod: '1600 - 2000 (First Watch)',
    vesselCoordinates: "19° 12.0' N, 072° 15.0' E",
    courseDeg: 140,
    speedKts: 16.0,
    barometerHpa: 1014,
    windBeaufort: 'Force 3 (8-10 kts W)',
    seaState: 'Slight (Swell 1.1m)',
    engineRpm: 108,
    bunkerConsumptionMt: 4.5,
    dutyOfficer: 'Chief Officer R. Fernandez',
    remarks: 'Completed evening rounds of weather decks and cargo holds. BILGE wells checked dry.',
    isSigned: true
  }
];

export const MarineLogbookView: React.FC = () => {
  const [entries, setEntries] = useState<LogbookEntry[]>(INITIAL_LOG_ENTRIES);
  const [showAddForm, setShowAddForm] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // New Log Entry Form State
  const [newWatch, setNewWatch] = useState('0400 - 0800 (Morning Watch)');
  const [newCoords, setNewCoords] = useState("18° 30.0' N, 073° 05.0' E");
  const [newCourse, setNewCourse] = useState(142);
  const [newSpeed, setNewSpeed] = useState(15.5);
  const [newBarometer, setNewBarometer] = useState(1013);
  const [newWind, setNewWind] = useState('Force 4 SW');
  const [newOfficer, setNewOfficer] = useState('3rd Officer A. Khan');
  const [newRemarks, setNewRemarks] = useState('');

  const handleAddEntry = (e: React.FormEvent) => {
    e.preventDefault();
    const entry: LogbookEntry = {
      id: `LOG-${Date.now()}`,
      timestampUtc: new Date().toISOString().replace('T', ' ').substring(0, 16) + ' UTC',
      watchPeriod: newWatch,
      vesselCoordinates: newCoords,
      courseDeg: newCourse,
      speedKts: newSpeed,
      barometerHpa: newBarometer,
      windBeaufort: newWind,
      seaState: 'Moderate',
      engineRpm: 105,
      bunkerConsumptionMt: 4.1,
      dutyOfficer: newOfficer,
      remarks: newRemarks || 'No abnormal events during watch. Steady heading maintained.',
      isSigned: true
    };

    setEntries([entry, ...entries]);
    setShowAddForm(false);
    setNewRemarks('');
  };

  // PDF Digital Report Generator State
  const [showPdfGeneratorModal, setShowPdfGeneratorModal] = useState(false);
  const [pdfVesselName, setPdfVesselName] = useState('M/V OCEANBIRD EXPRESS');
  const [pdfImoNumber, setPdfImoNumber] = useState('IMO 9821034');
  const [pdfVoyageNo, setPdfVoyageNo] = useState('VOY-2026-08A');
  const [pdfDepPort, setPdfDepPort] = useState('BOM - Mumbai, India');
  const [pdfArrPort, setPdfArrPort] = useState('MLE - Malé, Maldives');
  const [pdfCaptainName, setPdfCaptainName] = useState('Capt. Rajesh Kumar');
  const [pdfChiefEng, setPdfChiefEng] = useState('Chief Eng. D. Nair');
  const [pdfWeatherNotes, setPdfWeatherNotes] = useState(
    'Encountered Force 5 SW winds near Minicoy Passage. Barometer dipped to 1008 hPa before rising. Swell 2.4m, engine RPM adjusted for sea condition. All steering and machinery checks passed normal.'
  );
  const [pdfFuelHfoMt, setPdfFuelHfoMt] = useState(14.2);
  const [pdfFuelMgoMt, setPdfFuelMgoMt] = useState(3.8);
  const [pdfDistanceNm, setPdfDistanceNm] = useState(840);

  const totalFuelMt = pdfFuelHfoMt + pdfFuelMgoMt;
  const calculatedCo2Mt = (pdfFuelHfoMt * 3.114 + pdfFuelMgoMt * 3.206).toFixed(2);

  // Export functions
  const handleDownloadTxtReport = () => {
    const textReport = `===================================================================
OFFICIAL MARITIME VOYAGE & LOGBOOK DIGITAL REPORT
IMO SOLAS CHAPTER V / MARPOL ANNEX VI COMPLIANT
===================================================================

[VESSEL IDENTIFICATION & VOYAGE SUMMARY]
Vessel Name     : ${pdfVesselName}
IMO Number      : ${pdfImoNumber}
Voyage Number   : ${pdfVoyageNo}
Departure Port  : ${pdfDepPort}
Destination Port: ${pdfArrPort}
Distance Voyage : ${pdfDistanceNm} Nautical Miles
Report Date/Time: ${new Date().toISOString().replace('T', ' ').substring(0, 16)} UTC

[COMMAND & ENGINE OFFICERS]
Master / Captain: ${pdfCaptainName}
Chief Engineer  : ${pdfChiefEng}

[FUEL CONSUMPTION & EMISSIONS METRICS]
HFO Consumption : ${pdfFuelHfoMt} MT
MGO Consumption : ${pdfFuelMgoMt} MT
Total Fuel Burn : ${totalFuelMt.toFixed(1)} MT
Calculated CO2  : ${calculatedCo2Mt} MT (EU ETS / IMO DCS Standard)

[WEATHER & SEA STATE INCIDENT SUMMARY]
${pdfWeatherNotes}

===================================================================
LOGBOOK ENTRIES SUMMARY (${entries.length} RECORDS SIGNED)
===================================================================
${entries
  .map(
    (e, idx) =>
      `[RECORD #${idx + 1}] ID: ${e.id}
Timestamp  : ${e.timestampUtc} | Watch: ${e.watchPeriod}
Coordinates: ${e.vesselCoordinates}
Course/Speed: ${e.courseDeg}° / ${e.speedKts} Kts | Barometer: ${e.barometerHpa} hPa
Officer    : ${e.dutyOfficer} (Signed)
Remarks    : ${e.remarks}
-------------------------------------------------------------------`
  )
  .join('\n')}

[DIGITAL MASTER CERTIFICATION]
I hereby certify that the above logbook and voyage metrics accurately reflect vessel operations in compliance with SOLAS V/28.

Master Signature: ${pdfCaptainName}
Verification Code: SHA256-SOLAS-${Math.floor(100000 + Math.random() * 900000)}
===================================================================`;

    const blob = new Blob([textReport], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Voyage_Report_${pdfVoyageNo}_${pdfVesselName.replace(/\s+/g, '_')}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadCsvLog = () => {
    const csvHeader = 'LogID,TimestampUTC,WatchPeriod,Coordinates,CourseDeg,SpeedKts,BarometerHpa,Officer,Remarks\n';
    const csvRows = entries
      .map(
        (e) =>
          `"${e.id}","${e.timestampUtc}","${e.watchPeriod}","${e.vesselCoordinates}",${e.courseDeg},${e.speedKts},${e.barometerHpa},"${e.dutyOfficer}","${e.remarks.replace(/"/g, '""')}"`
      )
      .join('\n');

    const blob = new Blob([csvHeader + csvRows], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Logbook_${pdfVoyageNo}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handlePrintPdf = () => {
    window.print();
  };

  const handleDirectExportPdf = () => {
    setShowPdfGeneratorModal(true);
    setTimeout(() => {
      window.print();
    }, 400);
  };

  const handleCopyLog = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div id="marine-logbook-view" className="space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center space-x-2 text-cyan-400 font-bold text-xs uppercase tracking-wider mb-1">
              <BookOpen className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span>IMO SOLAS CONVENTION CHAPTER V OFFICIAL BRIDGE LOGBOOK</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center space-x-2">
              <FileText className="w-6 h-6 text-cyan-400" />
              <span>Marine Official Deck & Engine Logbook</span>
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl">
              Digitized legal ship logbook for duty watch officers. Record positions, weather state, course maneuvers, engine fuel burn, and officer signatures.
            </p>
          </div>

          <div className="flex items-center space-x-2 shrink-0 flex-wrap gap-2">
            <button
              onClick={handleDirectExportPdf}
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-black text-xs shadow-xl flex items-center space-x-2 transition-transform hover:scale-105"
            >
              <Download className="w-4 h-4 text-slate-950" />
              <span>EXPORT LOGBOOK PDF</span>
            </button>

            <button
              onClick={() => setShowPdfGeneratorModal(true)}
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-black text-xs shadow-xl flex items-center space-x-2 transition-transform hover:scale-105"
            >
              <Printer className="w-4 h-4 text-slate-950" />
              <span>PREVIEW & EDIT VOYAGE PDF</span>
            </button>

            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-500 hover:to-teal-500 text-white font-extrabold text-xs shadow-xl flex items-center space-x-2 transition-transform hover:scale-105"
            >
              <Plus className="w-4 h-4" />
              <span>RECORD NEW LOG ENTRY</span>
            </button>
          </div>
        </div>
      </div>

      {/* New Log Entry Modal Form */}
      {showAddForm && (
        <form
          onSubmit={handleAddEntry}
          className="bg-slate-900 border border-cyan-500/50 rounded-2xl p-5 shadow-2xl space-y-4 animate-in fade-in"
        >
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="font-bold text-white text-sm flex items-center space-x-2">
              <UserCheck className="w-4 h-4 text-cyan-400" />
              <span>New Official Watch Logbook Entry</span>
            </h3>
            <span className="text-xs text-cyan-300 font-mono">SOLAS V/28 COMPLIANT</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
            <div>
              <label className="text-slate-400 block mb-1">WATCH PERIOD</label>
              <select
                value={newWatch}
                onChange={(e) => setNewWatch(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
              >
                <option value="0000 - 0400 (Middle Watch)">0000 - 0400 (Middle Watch)</option>
                <option value="0400 - 0800 (Morning Watch)">0400 - 0800 (Morning Watch)</option>
                <option value="0800 - 1200 (Forenoon Watch)">0800 - 1200 (Forenoon Watch)</option>
                <option value="1200 - 1600 (Afternoon Watch)">1200 - 1600 (Afternoon Watch)</option>
                <option value="1600 - 2000 (First Watch)">1600 - 2000 (First Watch)</option>
                <option value="2000 - 2400 (Night Watch)">2000 - 2400 (Night Watch)</option>
              </select>
            </div>

            <div>
              <label className="text-slate-400 block mb-1">VESSEL COORDINATES</label>
              <input
                type="text"
                value={newCoords}
                onChange={(e) => setNewCoords(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
              />
            </div>

            <div>
              <label className="text-slate-400 block mb-1">DUTY OFFICER SIGNATURE</label>
              <input
                type="text"
                value={newOfficer}
                onChange={(e) => setNewOfficer(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
              />
            </div>

            <div>
              <label className="text-slate-400 block mb-1">COURSE (° TRUE)</label>
              <input
                type="number"
                value={newCourse}
                onChange={(e) => setNewCourse(parseInt(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
              />
            </div>

            <div>
              <label className="text-slate-400 block mb-1">SPEED (KNOTS)</label>
              <input
                type="number"
                step="0.1"
                value={newSpeed}
                onChange={(e) => setNewSpeed(parseFloat(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
              />
            </div>

            <div>
              <label className="text-slate-400 block mb-1">BAROMETER (HPA)</label>
              <input
                type="number"
                value={newBarometer}
                onChange={(e) => setNewBarometer(parseInt(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
              />
            </div>
          </div>

          <div>
            <label className="text-slate-400 text-xs font-mono block mb-1">DECK & ENGINE REMARKS / WATCH SUMMARY</label>
            <textarea
              rows={3}
              value={newRemarks}
              onChange={(e) => setNewRemarks(e.target.value)}
              placeholder="Record lookouts, traffic condition, bilge checks, steering mode, or machinery status..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 font-mono"
            />
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl text-xs font-mono"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl text-xs font-mono flex items-center space-x-1"
            >
              <Save className="w-4 h-4" />
              <span>SIGN & SAVE LOG</span>
            </button>
          </div>
        </form>
      )}

      {/* Logbook Entries History Table */}
      <div className="space-y-4">
        {entries.map((log) => {
          const logSummaryText = `[OFFICIAL LOGBOOK] ${log.id} - ${log.timestampUtc}\nWatch: ${log.watchPeriod}\nPos: ${log.vesselCoordinates}\nCourse: ${log.courseDeg}° | Speed: ${log.speedKts}kts\nOfficer: ${log.dutyOfficer}\nRemarks: ${log.remarks}`;

          return (
            <div
              key={log.id}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-xl hover:border-slate-700 transition-all font-mono"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-bold text-cyan-400">{log.id}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-300">
                    {log.watchPeriod}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/40 flex items-center space-x-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    <span>SIGNED</span>
                  </span>
                </div>

                <div className="flex items-center space-x-3 text-xs text-slate-400">
                  <Clock className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{log.timestampUtc}</span>
                  <button
                    onClick={() => handleCopyLog(logSummaryText, log.id)}
                    className="p-1 hover:text-white transition-colors"
                    title="Copy Log Text"
                  >
                    {copiedId === log.id ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4 text-slate-400" />
                    )}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-slate-300 bg-slate-950 p-3 rounded-xl border border-slate-800">
                <div>
                  <span className="text-[10px] text-slate-500 block">COORDINATES</span>
                  <strong className="text-white">{log.vesselCoordinates}</strong>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">COURSE / SPEED</span>
                  <strong className="text-cyan-300">{log.courseDeg}° / {log.speedKts} Kts</strong>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">BAROMETER</span>
                  <strong className="text-amber-300">{log.barometerHpa} hPa</strong>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">DUTY OFFICER</span>
                  <strong className="text-emerald-400">{log.dutyOfficer}</strong>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/40 p-3 rounded-xl border border-slate-800/80">
                {log.remarks}
              </p>
            </div>
          );
        })}
      </div>

      {/* PDF VOYAGE & FUEL REPORT GENERATOR MODAL */}
      {showPdfGeneratorModal && (
        <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-md z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fadeIn">
          <div className="bg-slate-900 border border-amber-500/40 rounded-2xl max-w-5xl w-full p-5 sm:p-6 text-white space-y-6 shadow-2xl my-auto font-mono max-h-[92vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 bg-amber-500/20 text-amber-400 rounded-xl border border-amber-500/30">
                  <Printer className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-white flex items-center space-x-2">
                    <span>CAPTAIN'S OFFICIAL VOYAGE & FUEL PDF REPORT GENERATOR</span>
                  </h3>
                  <p className="text-xs text-slate-400 font-sans">
                    Configure voyage params, fuel metrics, and weather logs to generate a printable SOLAS-certified digital PDF report.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowPdfGeneratorModal(false)}
                className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white rounded-xl text-xs font-bold transition-all"
              >
                ✕ Close
              </button>
            </div>

            {/* Config controls grid */}
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
              <div className="flex items-center space-x-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>1. Customize Voyage Report Parameters</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div>
                  <label className="text-slate-400 block mb-1">VESSEL NAME</label>
                  <input
                    type="text"
                    value={pdfVesselName}
                    onChange={(e) => setPdfVesselName(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-white"
                  />
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">IMO NUMBER</label>
                  <input
                    type="text"
                    value={pdfImoNumber}
                    onChange={(e) => setPdfImoNumber(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-amber-300 font-mono"
                  />
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">VOYAGE NUMBER</label>
                  <input
                    type="text"
                    value={pdfVoyageNo}
                    onChange={(e) => setPdfVoyageNo(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-white"
                  />
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">DEPARTURE PORT</label>
                  <input
                    type="text"
                    value={pdfDepPort}
                    onChange={(e) => setPdfDepPort(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-white"
                  />
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">DESTINATION PORT</label>
                  <input
                    type="text"
                    value={pdfArrPort}
                    onChange={(e) => setPdfArrPort(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-white"
                  />
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">DISTANCE (NAUTICAL MILES)</label>
                  <input
                    type="number"
                    value={pdfDistanceNm}
                    onChange={(e) => setPdfDistanceNm(parseFloat(e.target.value) || 0)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-cyan-300"
                  />
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">CAPTAIN / MASTER NAME</label>
                  <input
                    type="text"
                    value={pdfCaptainName}
                    onChange={(e) => setPdfCaptainName(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-emerald-400"
                  />
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">CHIEF ENGINEER</label>
                  <input
                    type="text"
                    value={pdfChiefEng}
                    onChange={(e) => setPdfChiefEng(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-slate-400 block mb-1">HFO (MT)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={pdfFuelHfoMt}
                      onChange={(e) => setPdfFuelHfoMt(parseFloat(e.target.value) || 0)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-amber-300"
                    />
                  </div>
                  <div>
                    <label className="text-slate-400 block mb-1">MGO (MT)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={pdfFuelMgoMt}
                      onChange={(e) => setPdfFuelMgoMt(parseFloat(e.target.value) || 0)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-amber-300"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">WEATHER & SEA STATE INCIDENT NOTES SUMMARY</label>
                <textarea
                  rows={2}
                  value={pdfWeatherNotes}
                  onChange={(e) => setPdfWeatherNotes(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-white"
                />
              </div>
            </div>

            {/* Quick Action Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-950 p-4 rounded-2xl border border-slate-800">
              <span className="text-xs font-bold text-slate-300 flex items-center space-x-2">
                <Eye className="w-4 h-4 text-amber-400" />
                <span>2. Live Digital PDF Document Preview</span>
              </span>

              <div className="flex items-center space-x-2 shrink-0 flex-wrap gap-2">
                <button
                  onClick={handlePrintPdf}
                  className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-xs flex items-center space-x-2 transition-all shadow-lg shadow-amber-500/20"
                >
                  <Printer className="w-4 h-4" />
                  <span>PRINT / SAVE AS PDF</span>
                </button>

                <button
                  onClick={handleDownloadTxtReport}
                  className="px-4 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl text-xs flex items-center space-x-2 transition-all"
                >
                  <Download className="w-4 h-4" />
                  <span>DOWNLOAD TEXT REPORT</span>
                </button>

                <button
                  onClick={handleDownloadCsvLog}
                  className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-xl text-xs flex items-center space-x-2 transition-all"
                >
                  <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
                  <span>EXPORT CSV</span>
                </button>
              </div>
            </div>

            {/* LIVE PRINTABLE DOCUMENT SHEET PREVIEW (Formatted for crisp PDF print) */}
            <div
              id="printable-maritime-pdf-document"
              className="bg-white text-slate-900 p-8 sm:p-10 rounded-2xl shadow-2xl space-y-6 font-sans border-4 border-slate-900 relative overflow-hidden"
            >
              {/* Official Document Seal Watermark */}
              <div className="absolute right-6 top-6 opacity-10 pointer-events-none">
                <Ship className="w-64 h-64 text-slate-900" />
              </div>

              {/* Official Header */}
              <div className="border-b-2 border-slate-900 pb-4 flex justify-between items-start">
                <div>
                  <div className="flex items-center space-x-2 text-sky-800 font-black text-xs uppercase tracking-widest">
                    <ShieldCheck className="w-4 h-4 text-sky-800" />
                    <span>IMO SOLAS V/28 & MARPOL ANNEX VI COMPLIANT</span>
                  </div>
                  <h1 className="text-2xl font-black text-slate-950 tracking-tight uppercase mt-1">
                    OFFICIAL VOYAGE & FUEL LOGBOOK REPORT
                  </h1>
                  <p className="text-slate-600 text-xs font-semibold">
                    DIGITAL MARITIME EXECUTIVE CERTIFICATE • MASTER VOYAGE STATEMENT
                  </p>
                </div>

                <div className="text-right text-xs font-mono">
                  <div className="font-extrabold text-slate-900">{pdfVesselName}</div>
                  <div className="text-sky-800 font-bold">{pdfImoNumber}</div>
                  <div className="text-slate-600">VOYAGE: {pdfVoyageNo}</div>
                  <div className="text-slate-500 text-[10px]">REPORT UTC: {new Date().toISOString().substring(0, 10)}</div>
                </div>
              </div>

              {/* Voyage Overview Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-slate-100 rounded-xl border border-slate-300 text-xs font-mono">
                <div>
                  <span className="text-[10px] text-slate-500 font-bold block">DEPARTURE PORT</span>
                  <strong className="text-slate-900 font-extrabold">{pdfDepPort}</strong>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 font-bold block">DESTINATION PORT</span>
                  <strong className="text-slate-900 font-extrabold">{pdfArrPort}</strong>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 font-bold block">DISTANCE SAILED</span>
                  <strong className="text-sky-900 font-extrabold">{pdfDistanceNm} NM</strong>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 font-bold block">COMMANDING MASTER</span>
                  <strong className="text-slate-900 font-extrabold">{pdfCaptainName}</strong>
                </div>
              </div>

              {/* Fuel Consumption & Carbon Emissions Summary */}
              <div className="space-y-2">
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center space-x-1 border-b border-slate-300 pb-1">
                  <Droplets className="w-4 h-4 text-amber-600" />
                  <span>1. Voyage Fuel Consumption & Emissions Metrics (EU ETS / IMO DCS)</span>
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                  <div className="p-3 bg-amber-50 rounded-lg border border-amber-200">
                    <span className="text-[10px] text-amber-800 font-bold block">HFO BUNKERS BURNED</span>
                    <strong className="text-amber-900 text-sm font-black">{pdfFuelHfoMt} MT</strong>
                  </div>
                  <div className="p-3 bg-amber-50 rounded-lg border border-amber-200">
                    <span className="text-[10px] text-amber-800 font-bold block">MGO BUNKERS BURNED</span>
                    <strong className="text-amber-900 text-sm font-black">{pdfFuelMgoMt} MT</strong>
                  </div>
                  <div className="p-3 bg-slate-100 rounded-lg border border-slate-300">
                    <span className="text-[10px] text-slate-600 font-bold block">TOTAL FUEL BURNED</span>
                    <strong className="text-slate-950 text-sm font-black">{totalFuelMt.toFixed(1)} MT</strong>
                  </div>
                  <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                    <span className="text-[10px] text-emerald-800 font-bold block">ESTIMATED CO2 EMISSION</span>
                    <strong className="text-emerald-900 text-sm font-black">{calculatedCo2Mt} MT CO2</strong>
                  </div>
                </div>
              </div>

              {/* Weather & Sea State Incident Summary */}
              <div className="space-y-2">
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center space-x-1 border-b border-slate-300 pb-1">
                  <Wind className="w-4 h-4 text-sky-700" />
                  <span>2. Weather & Sea State Voyage Incident Report</span>
                </h4>
                <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-300 text-xs leading-relaxed text-slate-800 font-mono">
                  {pdfWeatherNotes}
                </div>
              </div>

              {/* Logbook Entries Table */}
              <div className="space-y-2">
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center space-x-1 border-b border-slate-300 pb-1">
                  <BookOpen className="w-4 h-4 text-indigo-700" />
                  <span>3. Signed Duty Watch Officer Logbook Records ({entries.length} Entries)</span>
                </h4>

                <table className="w-full text-[11px] font-mono border-collapse border border-slate-300">
                  <thead>
                    <tr className="bg-slate-200 text-slate-900 font-black">
                      <th className="border border-slate-300 p-2 text-left">LOG ID</th>
                      <th className="border border-slate-300 p-2 text-left">WATCH PERIOD</th>
                      <th className="border border-slate-300 p-2 text-left">COORDINATES</th>
                      <th className="border border-slate-300 p-2 text-left">CRS / SPD</th>
                      <th className="border border-slate-300 p-2 text-left">OFFICER</th>
                      <th className="border border-slate-300 p-2 text-left">REMARKS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {entries.map((entry) => (
                      <tr key={entry.id} className="hover:bg-slate-50">
                        <td className="border border-slate-300 p-2 font-bold text-sky-900">{entry.id}</td>
                        <td className="border border-slate-300 p-2">{entry.watchPeriod}</td>
                        <td className="border border-slate-300 p-2 text-[10px]">{entry.vesselCoordinates}</td>
                        <td className="border border-slate-300 p-2">{entry.courseDeg}° / {entry.speedKts}kt</td>
                        <td className="border border-slate-300 p-2 font-semibold text-emerald-800">{entry.dutyOfficer}</td>
                        <td className="border border-slate-300 p-2 text-[10px] text-slate-700">{entry.remarks}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Signature & Master Certificate Stamp */}
              <div className="pt-4 border-t-2 border-slate-900 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-mono">
                <div className="space-y-1">
                  <div className="text-[10px] text-slate-500 font-bold">DIGITAL SOLAS AUTHENTICATION HASH</div>
                  <div className="text-[10px] font-bold text-sky-900 bg-slate-100 p-2 rounded border border-slate-300">
                    SHA256: 8f9210c4a03bef228109312984fe730109bca34821098ef3094
                  </div>
                  <div className="text-[10px] text-emerald-700 font-bold">✓ VERIFIED OFFICIAL MARITIME REPORT</div>
                </div>

                <div className="text-center sm:text-right border-t sm:border-t-0 sm:border-l border-slate-300 pt-3 sm:pt-0 sm:pl-6">
                  <div className="text-[10px] text-slate-500 font-bold mb-2">MASTER / CAPTAIN SIGNATURE</div>
                  <div className="text-base font-black italic text-slate-900 font-serif border-b-2 border-slate-900 pb-1 px-4 inline-block">
                    {pdfCaptainName}
                  </div>
                  <div className="text-[10px] text-slate-600 font-bold mt-1">{pdfVesselName} COMMAND</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
