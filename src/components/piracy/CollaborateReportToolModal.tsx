import React, { useState } from 'react';
import { Radio, Users, CheckCircle2, Upload, MapPin, Send, AlertTriangle } from 'lucide-react';
import { hapticEngine } from '../../utils/hapticUtils';

interface CollaborateReportToolModalProps {
  onClose?: () => void;
  onReportSubmitted?: (msg: string) => void;
}

export const CollaborateReportToolModal: React.FC<CollaborateReportToolModalProps> = ({
  onClose,
  onReportSubmitted
}) => {
  const [region, setRegion] = useState('Strait of Malacca');
  const [coordinates, setCoordinates] = useState("01° 22.4' N / 104° 18.2' E");
  const [skiffCount, setSkiffCount] = useState(2);
  const [perpetratorsCount, setPerpetratorsCount] = useState(5);
  const [weaponObserved, setWeaponObserved] = useState('Automatic Rifles & Ladders');
  const [reportDetails, setReportDetails] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    hapticEngine.trigger('alert');
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      hapticEngine.trigger('success');
      if (onReportSubmitted) {
        onReportSubmitted('Collaborative Piracy Intel Report Dispatched to UKMTO, IMB, & 14 AIS Vessels in 30 NM Radius!');
      }
      if (onClose) onClose();
    }, 1200);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-2xl space-y-4 font-mono text-xs">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center space-x-2">
          <Users className="w-5 h-5 text-cyan-400" />
          <h3 className="text-xs font-bold text-white uppercase tracking-wider">
            Collaborative Community Piracy Intelligence Reporting Tool
          </h3>
        </div>
        {onClose && (
          <button onClick={onClose} className="text-slate-400 hover:text-white font-bold">
            ✕
          </button>
        )}
      </div>

      <p className="text-[10px] text-slate-400 font-sans">
        Submit vetted crowd-sourced threat intelligence directly to UKMTO Maritime Trade Operations, IMB Piracy Centre, and nearby merchant vessels within 50 NM.
      </p>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="text-[10px] text-slate-400 block mb-1">Target Corridor / Region</label>
            <input
              type="text"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white"
            />
          </div>

          <div>
            <label className="text-[10px] text-slate-400 block mb-1">GPS Coordinates (WGS84)</label>
            <input
              type="text"
              value={coordinates}
              onChange={(e) => setCoordinates(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white"
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="text-[10px] text-slate-400 block mb-1">Skiff / Boat Count</label>
            <input
              type="number"
              value={skiffCount}
              onChange={(e) => setSkiffCount(parseInt(e.target.value) || 1)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white"
            />
          </div>

          <div>
            <label className="text-[10px] text-slate-400 block mb-1">Perpetrator Count</label>
            <input
              type="number"
              value={perpetratorsCount}
              onChange={(e) => setPerpetratorsCount(parseInt(e.target.value) || 1)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white"
            />
          </div>

          <div>
            <label className="text-[10px] text-slate-400 block mb-1">Weapons Observed</label>
            <input
              type="text"
              value={weaponObserved}
              onChange={(e) => setWeaponObserved(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white"
            />
          </div>
        </div>

        <div>
          <label className="text-[10px] text-slate-400 block mb-1">Incident Description & Skiff Color / Outboard Details</label>
          <textarea
            rows={2}
            value={reportDetails}
            onChange={(e) => setReportDetails(e.target.value)}
            placeholder="e.g., Blue wooden skiff with twin 200HP Yamaha engines shadowing starboard quarter."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 font-sans"
          />
        </div>

        <div className="bg-slate-950 border border-dashed border-slate-800 p-3 rounded-2xl flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Upload className="w-4 h-4 text-cyan-400" />
            <span className="text-[10px] text-slate-300 font-sans">Attach Radar Snapshot / FLIR Thermal Photo (Optional)</span>
          </div>
          <span className="bg-slate-900 text-slate-400 px-2 py-1 rounded text-[9px] font-bold">FLIR_RADAR_089.JPG</span>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-2.5 bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center space-x-2 shadow-xl"
        >
          <Send className="w-4 h-4 text-slate-950" />
          <span>{isSubmitting ? 'BROADCASTING INTEL...' : 'BROADCAST COMMUNITY INTEL REPORT'}</span>
        </button>
      </form>
    </div>
  );
};
