import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  Zap,
  AlertTriangle,
  ShieldAlert,
  Radio,
  RefreshCw,
  CheckCircle2,
  Compass,
  Ship,
  Sliders,
  Check,
  Filter,
  ArrowUpRight,
  Shield,
  Activity
} from 'lucide-react';

export interface SmartAnomaly {
  id: string;
  vesselName: string;
  vesselType: string;
  threatType: 'Collision Risk' | 'Machinery Failure' | 'Piracy Threat' | 'Berth Congestion';
  aiScore: number; // 0-100
  priority: 'Critical' | 'Warning' | 'Advisory';
  location: string;
  details: string;
  recommendation: string;
  timestamp: string;
  status: 'Active' | 'Mitigated' | 'Acknowledged';
}

const INITIAL_SMART_ANOMALIES: SmartAnomaly[] = [
  {
    id: 'AI-ANM-901',
    vesselName: 'MV Ocean Sovereign',
    vesselType: 'Container Ship (14,000 TEU)',
    threatType: 'Collision Risk',
    aiScore: 98,
    priority: 'Critical',
    location: '15.4°N, 88.2°E • Bay of Bengal Corridor',
    details: 'AIS Trajectory overlap detected with unflagged fishing trawler group amidst 4.2m cyclone swells.',
    recommendation: 'Execute immediate 12° Starboard turn & sound 5 short whistle bursts.',
    timestamp: '2026-08-05 02:15 UTC',
    status: 'Active'
  },
  {
    id: 'AI-ANM-902',
    vesselName: 'MT Indus Trader',
    vesselType: 'VLCC Crude Tanker',
    threatType: 'Machinery Failure',
    aiScore: 94,
    priority: 'Warning',
    location: '19.2°N, 85.8°E • Off Gopalpur Coast',
    details: 'Main Engine Cylinder 4 Exhaust Thermal Inversion anomaly (+42°C above baseline) under heavy engine load.',
    recommendation: 'Throttle engine load back to 65% (11.5 kts) & switch to auxiliary cooling loop.',
    timestamp: '2026-08-05 01:50 UTC',
    status: 'Active'
  },
  {
    id: 'AI-ANM-903',
    vesselName: 'MV Bay Express',
    vesselType: 'Bulk Cargo (82,000 DWT)',
    threatType: 'Piracy Threat',
    aiScore: 91,
    priority: 'Critical',
    location: '12.1°N, 64.5°E • Central Arabian Sea',
    details: 'Unidentified high-speed skiff approach (28 kts) detected on S-band radar within 4.5 NM.',
    recommendation: 'Initiate Citadel lockdown, activate high-pressure water cannons & sync with EU NAVFOR escort.',
    timestamp: '2026-08-05 00:30 UTC',
    status: 'Active'
  },
  {
    id: 'AI-ANM-904',
    vesselName: 'Chittagong Outer Anchorage Hub',
    vesselType: 'Port Anchorage Sector B',
    threatType: 'Berth Congestion',
    aiScore: 88,
    priority: 'Advisory',
    location: 'Chittagong Outer Roads',
    details: '38 vessels queued at outer roads due to storm surge tide. High risk of anchor dragging.',
    recommendation: 'Advise deep draft vessels to heave-to at 15 NM offshore deep water station.',
    timestamp: '2026-08-04 23:10 UTC',
    status: 'Active'
  }
];

export const SmartMaritimeAlertView: React.FC = () => {
  const [anomalies, setAnomalies] = useState<SmartAnomaly[]>(INITIAL_SMART_ANOMALIES);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [confidenceThreshold, setConfidenceThreshold] = useState<number>(85);
  const [threatFilter, setThreatFilter] = useState<string>('ALL');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleRunAiScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      // Generate simulated anomaly
      const newAnomaly: SmartAnomaly = {
        id: `AI-ANM-${Math.floor(100 + Math.random() * 900)}`,
        vesselName: 'MT Malacca Pioneer',
        vesselType: 'LNG Carrier (174,000 m³)',
        threatType: 'Collision Risk',
        aiScore: 96,
        priority: 'Critical',
        location: '6.8°N, 80.2°E • Off Dondra Head Passage',
        details: 'Sudden squall line visibility drop under 0.8 NM with 3 cross-traffic cargo vessels in TSS.',
        recommendation: 'Reduce speed to Safe Maneuvering Speed (9 kts) & enable Dual Radar AIS Tracking.',
        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16) + ' UTC',
        status: 'Active'
      };
      setAnomalies((prev) => [newAnomaly, ...prev]);
      showToast('AI Sweep complete: New anomaly detected');
    }, 1800);
  };

  const handleApplyRecommendation = (id: string) => {
    setAnomalies((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: 'Mitigated' } : a))
    );
    showToast(`AI mitigation applied to ${id}`);
  };

  const handleAcknowledge = (id: string) => {
    setAnomalies((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: 'Acknowledged' } : a))
    );
    showToast(`Threat ${id} acknowledged`);
  };

  const filtered = anomalies.filter((a) => {
    if (a.aiScore < confidenceThreshold) return false;
    if (threatFilter !== 'ALL' && a.threatType !== threatFilter) return false;
    return true;
  });

  return (
    <div className="space-y-6 font-sans">
      {/* TOAST NOTIFICATION */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 right-6 z-50 px-4 py-3 bg-slate-900 border border-sky-500 text-sky-300 font-mono text-xs rounded-2xl shadow-2xl flex items-center space-x-2"
          >
            <Check className="w-4 h-4 text-sky-400" />
            <span className="font-bold">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* TOP AI CONTROL BANNER */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center space-x-2 text-cyan-400 font-bold text-xs uppercase tracking-wider mb-1 font-mono">
              <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span>SMART MARITIME AI ANOMALY & THREAT RADAR</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center space-x-2">
              <Radio className="w-6 h-6 text-cyan-400" />
              <span>Smart Maritime Threat Alerts</span>
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl">
              Machine-learning radar telemetry analyzing AIS route overlaps, engine thermal spikes, piracy corridor approach, and storm surge berth risk.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleRunAiScan}
              disabled={isScanning}
              className={`px-4 py-2.5 rounded-xl font-mono text-xs font-extrabold flex items-center space-x-2 transition-all shadow-lg ${
                isScanning
                  ? 'bg-slate-800 text-slate-400 border border-slate-700 cursor-not-allowed'
                  : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 shadow-cyan-950/40'
              }`}
            >
              <RefreshCw className={`w-4 h-4 ${isScanning ? 'animate-spin' : ''}`} />
              <span>{isScanning ? 'RUNNING AI THREAT SCAN...' : 'RUN AI THREAT SWEEP'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* FILTERS & THRESHOLD CONTROLS */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 font-mono text-xs space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2 text-sky-400 font-bold uppercase">
            <Sliders className="w-4 h-4" />
            <span>AI Sensitivity & Threat Filter Controls</span>
          </div>

          <div className="flex items-center space-x-3 text-slate-300">
            <span>Min AI Confidence Threshold:</span>
            <strong className="text-cyan-300 text-sm font-black">{confidenceThreshold}%</strong>
            <input
              type="range"
              min="75"
              max="99"
              value={confidenceThreshold}
              onChange={(e) => setConfidenceThreshold(Number(e.target.value))}
              className="w-32 accent-cyan-500 bg-slate-950"
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[10px] text-slate-400 uppercase font-bold mr-1">Threat Type:</span>
          {(['ALL', 'Collision Risk', 'Machinery Failure', 'Piracy Threat', 'Berth Congestion'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setThreatFilter(t)}
              className={`px-3 py-1 rounded-xl text-xs font-bold border transition-all ${
                threatFilter === t
                  ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-md'
                  : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* ANOMALY CARDS FEED */}
      <div className="space-y-4">
        <div className="flex items-center justify-between font-mono text-xs text-slate-400">
          <span>Active AI Detected Threat Feed ({filtered.length} Anomalies)</span>
          <span>Updated Real-Time via Satellite AIS</span>
        </div>

        <AnimatePresence mode="popLayout">
          {filtered.length > 0 ? (
            filtered.map((anomaly, index) => {
              const isCritical = anomaly.priority === 'Critical';
              const isWarning = anomaly.priority === 'Warning';

              return (
                <motion.div
                  key={anomaly.id}
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25, delay: index * 0.04 }}
                  className={`p-5 rounded-2xl border space-y-3 transition-all shadow-xl font-sans ${
                    anomaly.status === 'Mitigated'
                      ? 'bg-slate-950 border-slate-800 opacity-75'
                      : isCritical
                      ? 'bg-slate-950 border-rose-500/60 text-rose-100 shadow-rose-950/30 border-l-4 border-l-rose-500'
                      : isWarning
                      ? 'bg-slate-950 border-amber-500/50 text-amber-100 shadow-amber-950/30 border-l-4 border-l-amber-500'
                      : 'bg-slate-950 border-cyan-500/40 text-cyan-100 shadow-cyan-950/30 border-l-4 border-l-cyan-500'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-2 font-mono">
                    <div className="flex items-center space-x-2">
                      <span className="px-2.5 py-0.5 rounded-lg text-[10px] font-black uppercase bg-slate-900 border border-slate-700 text-white">
                        {anomaly.threatType}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          isCritical
                            ? 'bg-rose-500/20 text-rose-300 border border-rose-500/50'
                            : isWarning
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50'
                            : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50'
                        }`}
                      >
                        {anomaly.priority}
                      </span>
                      <span className="text-[10px] text-cyan-400 font-bold flex items-center space-x-1">
                        <Sparkles className="w-3 h-3" />
                        <span>AI SCORE: {anomaly.aiScore}%</span>
                      </span>
                    </div>

                    <span className="text-[10px] text-slate-400">{anomaly.timestamp}</span>
                  </div>

                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                    <div>
                      <h4 className="text-base font-black text-white flex items-center space-x-2">
                        <Ship className="w-4 h-4 text-cyan-400" />
                        <span>{anomaly.vesselName}</span>
                        <span className="text-xs text-slate-400 font-normal">({anomaly.vesselType})</span>
                      </h4>
                      <div className="text-xs text-slate-400 font-mono mt-0.5">
                        Location: <strong className="text-slate-200">{anomaly.location}</strong>
                      </div>
                    </div>

                    {anomaly.status === 'Mitigated' && (
                      <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 rounded-xl text-xs font-mono font-bold flex items-center space-x-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span>AI MITIGATION APPLIED</span>
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {anomaly.details}
                  </p>

                  <div className="p-3 bg-slate-900/90 border border-slate-800 rounded-xl space-y-1 font-mono">
                    <div className="text-[10px] text-cyan-400 font-bold uppercase flex items-center space-x-1">
                      <Zap className="w-3 h-3 text-cyan-400" />
                      <span>RECOMMENDED AI ACTION:</span>
                    </div>
                    <p className="text-xs text-slate-200 font-bold">
                      {anomaly.recommendation}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-900 font-mono text-xs">
                    <div className="text-[10px] text-slate-500">ID: {anomaly.id}</div>

                    <div className="flex items-center space-x-2">
                      {anomaly.status !== 'Mitigated' && (
                        <button
                          onClick={() => handleApplyRecommendation(anomaly.id)}
                          className="px-3 py-1.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl text-xs transition-all flex items-center space-x-1"
                        >
                          <Zap className="w-3.5 h-3.5" />
                          <span>Apply Recommendation</span>
                        </button>
                      )}

                      {anomaly.status !== 'Acknowledged' && (
                        <button
                          onClick={() => handleAcknowledge(anomaly.id)}
                          className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 rounded-xl text-xs font-bold transition-all"
                        >
                          Acknowledge
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })
          ) : (
            <div className="p-8 bg-slate-900 border border-slate-800 rounded-2xl text-center space-y-2 font-mono">
              <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
              <h4 className="text-sm font-bold text-white">NO THREATS ABOVE {confidenceThreshold}% AI THRESHOLD</h4>
              <p className="text-xs text-slate-400">All maritime channels operating within safe parameters.</p>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
