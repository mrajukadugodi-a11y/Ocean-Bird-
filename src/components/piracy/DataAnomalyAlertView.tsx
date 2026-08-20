import React, { useState } from 'react';
import { ShieldAlert, AlertOctagon, Activity, Radio, Sparkles, CheckCircle2, RefreshCw, Cpu, Database } from 'lucide-react';
import { motion } from 'motion/react';
import { hapticEngine } from '../../utils/hapticUtils';

export interface DataAnomaly {
  anomalyId: string;
  sensorType: 'AIS_SPOOFING' | 'SST_SPIKE_OUTLIER' | 'PRESSURE_DROP_ANOMALY' | 'SATELLITE_DESYNC';
  timestampUtc: string;
  affectedCoordinates: string;
  confidencePct: number;
  anomalyDescription: string;
  recommendedMitigation: string;
  status: 'UNRESOLVED' | 'VERIFIED_SPOOFING' | 'SENSOR_CALIBRATED' | 'RESOLVED';
}

const ANOMALIES_DATABASE: DataAnomaly[] = [
  {
    anomalyId: 'ANOM-2026-101',
    sensorType: 'AIS_SPOOFING',
    timestampUtc: '2026-08-09 00:48 UTC',
    affectedCoordinates: '12.8200° N, 43.1500° E (Bab-el-Mandeb)',
    confidencePct: 98,
    anomalyDescription: 'Ghost vessel AIS transmissions detected with impossible speed delta (0 to 65 kts in 3 seconds). Phantom tanker signature generated.',
    recommendedMitigation: 'Switch navigation radar from AIS overlay to raw S-band pulse compression radar mode; verify visual watch.',
    status: 'VERIFIED_SPOOFING'
  },
  {
    anomalyId: 'ANOM-2026-102',
    sensorType: 'SST_SPIKE_OUTLIER',
    timestampUtc: '2026-08-09 00:32 UTC',
    affectedCoordinates: '15.1000° N, 114.2000° E (South China Sea)',
    confidencePct: 91,
    anomalyDescription: 'Sea surface temperature sensor reading jumped +8.5°C in 20 seconds. Likely intake strain fouling or sensor calibration drift.',
    recommendedMitigation: 'Flush engine room sea chest intake strainers; re-calibrate digital resistance temperature detector (RTD).',
    status: 'UNRESOLVED'
  },
  {
    anomalyId: 'ANOM-2026-103',
    sensorType: 'PRESSURE_DROP_ANOMALY',
    timestampUtc: '2026-08-08 23:50 UTC',
    affectedCoordinates: '20.4000° N, 122.8000° E (Luzon Strait)',
    confidencePct: 96,
    anomalyDescription: 'Barometric pressure dropped 22 hPa in 1 hour without matching wind vector change. Rapid storm deepening sensor validation required.',
    recommendedMitigation: 'Cross-check satellite altimetry telemetry with bridge mechanical aneroid barometer; issue weather watch.',
    status: 'SENSOR_CALIBRATED'
  }
];

export const DataAnomalyAlertView: React.FC = () => {
  const [anomalies, setAnomalies] = useState<DataAnomaly[]>(ANOMALIES_DATABASE);
  const [selectedAnomaly, setSelectedAnomaly] = useState<DataAnomaly>(ANOMALIES_DATABASE[0]);

  const markResolved = (id: string) => {
    setAnomalies(prev => prev.map(a => a.anomalyId === id ? { ...a, status: 'RESOLVED' } : a));
    setSelectedAnomaly(prev => prev.anomalyId === id ? { ...prev, status: 'RESOLVED' } : prev);
    hapticEngine.trigger('success');
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'UNRESOLVED':
        return <span className="bg-rose-950 text-rose-300 border border-rose-800 text-[9px] px-2 py-0.5 rounded font-bold">UNRESOLVED ANOMALY</span>;
      case 'VERIFIED_SPOOFING':
        return <span className="bg-amber-950 text-amber-300 border border-amber-800 text-[9px] px-2 py-0.5 rounded font-bold">VERIFIED SPOOFING</span>;
      case 'SENSOR_CALIBRATED':
        return <span className="bg-cyan-950 text-cyan-300 border border-cyan-800 text-[9px] px-2 py-0.5 rounded font-bold">SENSOR CALIBRATED</span>;
      default:
        return <span className="bg-emerald-950 text-emerald-300 border border-emerald-800 text-[9px] px-2 py-0.5 rounded font-bold">RESOLVED</span>;
    }
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
            <AlertOctagon className="w-4 h-4 text-rose-400 animate-pulse" />
            <span>AI Automated Navigation & Sensor Data Anomaly Detection Engine</span>
          </h3>
          <p className="text-[10px] text-slate-400 font-sans">
            Automated detection of AIS GPS spoofing phantom vessels, sea surface temperature sensor spikes, and barometric desynchronization
          </p>
        </div>

        <span className="bg-rose-950 text-rose-300 border border-rose-800 text-[10px] px-2.5 py-1 rounded font-bold flex items-center space-x-1">
          <Cpu className="w-3.5 h-3.5 text-rose-400" />
          <span>ANOMALY DETECTOR ONLINE</span>
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Anomaly Stream List */}
        <div className="lg:col-span-1 space-y-2">
          {anomalies.map((a) => (
            <div
              key={a.anomalyId}
              onClick={() => {
                setSelectedAnomaly(a);
                hapticEngine.trigger('click');
              }}
              className={`p-3.5 rounded-2xl border cursor-pointer transition-all space-y-2 ${
                selectedAnomaly.anomalyId === a.anomalyId
                  ? 'bg-slate-950 border-rose-400 ring-1 ring-rose-400'
                  : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex justify-between items-center">
                <span className="text-[8px] text-rose-400 font-bold">{a.anomalyId}</span>
                {getStatusBadge(a.status)}
              </div>
              <h4 className="text-xs font-bold text-white">{a.sensorType}</h4>
              <p className="text-[9px] text-slate-400 font-sans">{a.affectedCoordinates}</p>
            </div>
          ))}
        </div>

        {/* Selected Anomaly Dossier */}
        <div className="lg:col-span-2 bg-slate-950 border border-slate-800 p-5 rounded-2xl space-y-4 font-mono">
          <div className="flex justify-between items-start border-b border-slate-800 pb-3">
            <div>
              <span className="text-[8px] text-rose-400 font-bold block">{selectedAnomaly.anomalyId} • {selectedAnomaly.timestampUtc}</span>
              <h4 className="text-sm font-bold text-white">{selectedAnomaly.sensorType} DETECTED</h4>
              <span className="text-[10px] text-slate-400 block font-sans">{selectedAnomaly.affectedCoordinates}</span>
            </div>
            {getStatusBadge(selectedAnomaly.status)}
          </div>

          <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-2">
            <span className="text-[9px] text-rose-400 font-bold block flex items-center space-x-1">
              <Database className="w-3.5 h-3.5 text-rose-400" />
              <span>SENSOR ANOMALY DESCRIPTION (CONFIDENCE {selectedAnomaly.confidencePct}%):</span>
            </span>
            <p className="text-[11px] text-slate-200 font-sans leading-relaxed">{selectedAnomaly.anomalyDescription}</p>
          </div>

          <div className="bg-cyan-950/30 border border-cyan-900/60 p-4 rounded-xl space-y-2">
            <span className="text-[9px] text-cyan-400 font-bold block flex items-center space-x-1">
              <Radio className="w-3.5 h-3.5 text-cyan-400" />
              <span>RECOMMENDED BRIDGE MITIGATION PROTOCOL:</span>
            </span>
            <p className="text-[11px] text-cyan-200 font-sans font-bold leading-relaxed">{selectedAnomaly.recommendedMitigation}</p>
          </div>

          <div className="flex justify-between items-center text-[9px] text-slate-400 pt-2 border-t border-slate-900">
            <span>DETECTION CONFIDENCE: <strong className="text-white">{selectedAnomaly.confidencePct}% AI Certainty</strong></span>
            {selectedAnomaly.status !== 'RESOLVED' && (
              <button
                onClick={() => markResolved(selectedAnomaly.anomalyId)}
                className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black px-3 py-1.5 rounded-xl text-[10px] transition-all flex items-center space-x-1"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-slate-950" />
                <span>RESOLVE ANOMALY</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
