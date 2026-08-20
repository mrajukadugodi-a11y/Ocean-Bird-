import React, { useState } from 'react';
import { FileText, Download, Printer, ShieldAlert, CheckCircle2, UserCheck, MapPin, Calendar } from 'lucide-react';
import { hapticEngine } from '../../utils/hapticUtils';

export interface IncidentReportForm {
  id: string;
  vesselName: string;
  imoNumber: string;
  incidentType: 'ATTEMPTED_BOARDING' | 'ARMED_ROBBERY' | 'SUSPICIOUS_APPROACH' | 'HIJACKING';
  locationCoordinates: string;
  dateUtc: string;
  numberOfAttackers: number;
  weaponsObserved: string;
  actionTakenByMaster: string;
  ukmtoNotified: boolean;
}

const SAMPLE_INCIDENTS: IncidentReportForm[] = [
  {
    id: 'IMB-2026-0811',
    vesselName: 'M/V Poseidon Trader',
    imoNumber: 'IMO 9840192',
    incidentType: 'SUSPICIOUS_APPROACH',
    locationCoordinates: '12°38′N 043°22′E (Bab-el-Mandeb Strait)',
    dateUtc: '2026-08-06 18:40 UTC',
    numberOfAttackers: 5,
    weaponsObserved: 'AK-47 Rifles & RPG Launchers Visible',
    actionTakenByMaster: 'Evasive zigzag maneuvers, non-lethal water cannon activated, private security team displayed arms.',
    ukmtoNotified: true
  },
  {
    id: 'IMB-2026-0742',
    vesselName: 'M/T Atlantic Sentinel',
    imoNumber: 'IMO 9731045',
    incidentType: 'ATTEMPTED_BOARDING',
    locationCoordinates: '03°52′N 006°14′E (Gulf of Guinea)',
    dateUtc: '2026-07-28 02:15 UTC',
    numberOfAttackers: 7,
    weaponsObserved: 'Automatic weapons & grappling ladders',
    actionTakenByMaster: 'Crew mustered in citadel, SSAS alert transmitted, naval warship dispatched.',
    ukmtoNotified: true
  }
];

export const PdfIncidentReportView: React.FC = () => {
  const [reports] = useState<IncidentReportForm[]>(SAMPLE_INCIDENTS);
  const [selectedIncident, setSelectedIncident] = useState<IncidentReportForm>(SAMPLE_INCIDENTS[0]);

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
            <span>Official Maritime Piracy & Armed Robbery Incident PDF Report Generator</span>
          </h3>
          <p className="text-[10px] text-slate-400 font-sans">
            Standardized IMB Piracy Reporting Centre & UKMTO official incident report forms ready for printing or PDF export
          </p>
        </div>

        <button
          onClick={handleDownload}
          className="px-3.5 py-1.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-black rounded-xl text-xs flex items-center space-x-1 shadow transition-all"
        >
          <Download className="w-4 h-4" />
          <span>EXPORT INCIDENT PDF</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Incident Selector */}
        <div className="space-y-2">
          {reports.map((inc) => (
            <div
              key={inc.id}
              onClick={() => {
                setSelectedIncident(inc);
                hapticEngine.trigger('click');
              }}
              className={`p-3.5 rounded-2xl border cursor-pointer transition-all space-y-2 ${
                selectedIncident.id === inc.id
                  ? 'bg-slate-950 border-cyan-400 ring-1 ring-cyan-400'
                  : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex justify-between items-center">
                <span className="text-[8px] text-cyan-400 font-bold block">{inc.id}</span>
                <span className="text-[8px] text-rose-400 font-bold bg-rose-950 border border-rose-800 px-2 py-0.5 rounded">
                  {inc.incidentType.replace(/_/g, ' ')}
                </span>
              </div>
              <h4 className="text-xs font-bold text-white">{inc.vesselName} ({inc.imoNumber})</h4>
            </div>
          ))}
        </div>

        {/* Live Document Sheet */}
        <div className="bg-slate-950 border border-slate-800 p-5 rounded-2xl space-y-3 font-mono">
          <div className="border-b border-slate-800 pb-2 flex justify-between items-center">
            <div>
              <span className="text-[8px] text-cyan-400 font-bold block">IMB PIRACY REPORTING CENTRE</span>
              <h4 className="text-xs font-bold text-white">{selectedIncident.id}</h4>
            </div>
            <span className="text-[8px] text-emerald-400 font-bold bg-emerald-950 border border-emerald-800 px-2 py-0.5 rounded">
              VERIFIED REPORT
            </span>
          </div>

          <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 space-y-2 text-[10px] font-sans">
            <div>
              <span className="text-slate-500 text-[8px] font-mono block">VESSEL & IMO:</span>
              <span className="text-white font-bold">{selectedIncident.vesselName} — {selectedIncident.imoNumber}</span>
            </div>
            <div>
              <span className="text-slate-500 text-[8px] font-mono block">COORDINATES & TIME:</span>
              <span className="text-cyan-300 font-bold">{selectedIncident.locationCoordinates} ({selectedIncident.dateUtc})</span>
            </div>
            <div>
              <span className="text-slate-500 text-[8px] font-mono block">WEAPONS & ATTACKERS:</span>
              <span className="text-amber-300 font-bold">{selectedIncident.numberOfAttackers} Pirates • {selectedIncident.weaponsObserved}</span>
            </div>
            <div>
              <span className="text-slate-500 text-[8px] font-mono block">MASTER ACTION TAKEN:</span>
              <p className="text-slate-200 text-[9px] leading-relaxed italic">{selectedIncident.actionTakenByMaster}</p>
            </div>
          </div>

          <button
            onClick={handlePrint}
            className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-slate-300 font-bold rounded-xl text-xs border border-slate-800 flex items-center justify-center space-x-1.5 transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>PRINT / SAVE AS PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
};
