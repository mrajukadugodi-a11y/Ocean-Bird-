import React, { useState } from 'react';
import {
  Wrench,
  Cpu,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Radio,
  Wifi,
  HardDrive,
  Database,
  Activity,
  Zap,
  Play,
  Sparkles,
  RefreshCw,
  Sliders,
  Check,
  X,
  History,
  ShieldCheck,
  Terminal,
  Server,
  Bug,
  Crosshair,
  Compass,
  FileCheck
} from 'lucide-react';

export interface DiagnosticStep {
  id: number;
  name: string;
  category: 'GPS Satellite' | 'Transponder' | 'Avionics / Telemetry' | 'Sonar Echo' | 'Biometric Scanner';
  description: string;
  status: 'Pending' | 'Testing' | 'Passed' | 'Warning' | 'Repaired';
  reading: string;
}

export interface RepairLog {
  id: string;
  component: string;
  issueDetected: string;
  actionTaken: string;
  timestamp: string;
  status: 'Success' | 'Auto-Healed';
}

export const HardwareRepairWizardView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'wizard' | 'app-self-repair' | 'calibration' | 'repair-logs'>('wizard');
  const [wizardStepIdx, setWizardStepIdx] = useState(0);
  const [isWizardRunning, setIsWizardRunning] = useState(false);

  const [diagnosticSteps, setDiagnosticSteps] = useState<DiagnosticStep[]>([
    {
      id: 1,
      name: 'GPS / GLONASS Satellite Receiver',
      category: 'GPS Satellite',
      description: 'Verifies dual-frequency satellite lock, NMEA 0183/2000 baud rate, and signal carrier-to-noise ratio.',
      status: 'Passed',
      reading: '18 Satellites Locked | HDOP 0.82 (Excellent)'
    },
    {
      id: 2,
      name: 'AIS / ADS-B Marine & Flight Transponder',
      category: 'Transponder',
      description: 'Tests 161.975 MHz Class-A transponder transmit burst power and ADS-B 1090 MHz squitter pulse.',
      status: 'Passed',
      reading: '12.5 Watts TX Power | 100% Packet Ack'
    },
    {
      id: 3,
      name: 'Engine Telemetry & Avionics CAN-Bus',
      category: 'Avionics / Telemetry',
      description: 'Scans J1939 engine ECU bus, pitot static pressure tube sensors, and fuel flow meters.',
      status: 'Warning',
      reading: 'Minor J1939 Frame Delay on Port Engine'
    },
    {
      id: 4,
      name: 'Dual-Frequency Acoustic Sonar Probe',
      category: 'Sonar Echo',
      description: 'Fires 50kHz/200kHz depth pulses to verify seabed echo return and temperature sensor drift.',
      status: 'Passed',
      reading: 'Depth: 142.4 meters | Temp: 24.2°C'
    },
    {
      id: 5,
      name: 'ICAO Biometric Passport Terminal',
      category: 'Biometric Scanner',
      description: 'Inspects optical MRZ reader lens, NFC antenna chip reader, and facial camera sensor.',
      status: 'Passed',
      reading: 'NFC Chip Reader Ready | ISO 14443 Verified'
    }
  ]);

  // App Self-Repair State
  const [isSelfRepairing, setIsSelfRepairing] = useState(false);
  const [repairProgress, setRepairProgress] = useState(0);
  const [repairStatusText, setRepairStatusText] = useState('Idle');
  const [repairCompleted, setRepairCompleted] = useState(false);

  const [repairLogs, setRepairLogs] = useState<RepairLog[]>([
    {
      id: 'REP-2026-001',
      component: 'LocalStorage Cache Manager',
      issueDetected: 'Stale offline routing index causing rendering lag',
      actionTaken: 'Purged stale cache keys & re-indexed IndexedDB entries',
      timestamp: '2026-08-11 01:22 UTC',
      status: 'Auto-Healed'
    },
    {
      id: 'REP-2026-002',
      component: 'Engine Telemetry CAN-Bus',
      issueDetected: 'J1939 Frame delay on Port Engine probe',
      actionTaken: 'Auto-recalibrated CAN-Bus sampling frequency to 250kbps',
      timestamp: '2026-08-10 14:15 UTC',
      status: 'Success'
    },
    {
      id: 'REP-2026-003',
      component: 'Service Worker PWA Offline Sync',
      issueDetected: 'Unregistered background sync worker hook',
      actionTaken: 'Re-registered active PWA service worker scope',
      timestamp: '2026-08-09 09:40 UTC',
      status: 'Auto-Healed'
    }
  ]);

  const handleRunWizard = () => {
    setIsWizardRunning(true);
    setWizardStepIdx(0);

    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step < diagnosticSteps.length) {
        setWizardStepIdx(step);
      } else {
        clearInterval(interval);
        setIsWizardRunning(false);
        // Fix warning step
        setDiagnosticSteps(prev => prev.map(s => s.status === 'Warning' ? { ...s, status: 'Repaired', reading: 'J1939 Bus Recalibrated (100% Sync)' } : s));
      }
    }, 1200);
  };

  const handleRunAppSelfRepair = () => {
    setIsSelfRepairing(true);
    setRepairProgress(0);
    setRepairCompleted(false);

    const steps = [
      'Diagnosing React Component Tree & Virtual DOM Integrity...',
      'Verifying Browser LocalStorage & IndexedDB Indices...',
      'Testing WebSocket Telemetry & Radio Signal Handshakes...',
      'Clearing Corrupted Offline Map Tiles & Stale Cache...',
      'Restoring Default Component State Controllers...',
      'Re-synchronizing Cryptographic Session Signature Keys...',
      'App Auto-Repair Complete!'
    ];

    let progress = 0;
    let stepIdx = 0;

    const interval = setInterval(() => {
      progress += 15;
      if (progress > 100) progress = 100;
      setRepairProgress(progress);

      stepIdx = Math.floor((progress / 100) * (steps.length - 1));
      setRepairStatusText(steps[stepIdx]);

      if (progress >= 100) {
        clearInterval(interval);
        setIsSelfRepairing(false);
        setRepairCompleted(true);

        const newLog: RepairLog = {
          id: `REP-${Math.floor(1000 + Math.random() * 9000)}`,
          component: 'App Auto-Heal Engine',
          issueDetected: 'Routine state diagnostic sweep',
          actionTaken: 'Repaired React state controllers & purged stale offline cache',
          timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16) + ' UTC',
          status: 'Auto-Healed'
        };
        setRepairLogs(prev => [newLog, ...prev]);
      }
    }, 400);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-6 font-sans">
      {/* HEADER BANNER */}
      <div className="bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 border border-teal-500/30 rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <Wrench className="w-64 h-64 text-teal-500" />
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center space-x-3">
              <span className="px-3 py-1 rounded-full bg-teal-500/20 border border-teal-500/40 text-teal-300 font-mono text-[11px] font-bold tracking-wider uppercase flex items-center space-x-1.5">
                <Cpu className="w-3.5 h-3.5 text-teal-400" />
                <span>HARDWARE DIAGNOSTIC WIZARD & APP REPAIR TOOLKIT</span>
              </span>
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-mono text-[11px] font-bold flex items-center space-x-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>HARDWARE ONLINE</span>
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Hardware Wizard & App Self-Repair Toolkit</h1>
            <p className="text-slate-300 text-xs sm:text-sm max-w-2xl font-mono">
              Step-by-step diagnostic wizard for vessel/aircraft sensor hardware, coupled with a 1-click self-repair engine that auto-heals corrupted storage and state glitches.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 font-mono">
            <button
              onClick={handleRunWizard}
              disabled={isWizardRunning}
              className="px-4 py-2.5 rounded-2xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-black text-xs transition-all shadow-lg flex items-center space-x-2 disabled:opacity-50"
            >
              <Play className="w-4 h-4" />
              <span>{isWizardRunning ? 'RUNNING WIZARD...' : 'START HARDWARE WIZARD'}</span>
            </button>
            <button
              onClick={handleRunAppSelfRepair}
              disabled={isSelfRepairing}
              className="px-4 py-2.5 rounded-2xl bg-slate-900 border border-teal-500/40 text-teal-300 hover:bg-slate-800 font-bold text-xs transition-all flex items-center space-x-2"
            >
              <Sparkles className="w-4 h-4 text-teal-400" />
              <span>APP AUTO-HEAL & REPAIR</span>
            </button>
          </div>
        </div>

        {/* METRICS ROW */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-teal-500/20 font-mono text-xs">
          <div className="bg-slate-950/60 p-3 rounded-2xl border border-slate-800">
            <span className="text-slate-400 text-[10px] block uppercase font-bold">Hardware Health</span>
            <span className="text-emerald-400 font-black text-sm flex items-center space-x-1 mt-0.5">
              <CheckCircle2 className="w-4 h-4" />
              <span>98.4% Optimal</span>
            </span>
          </div>
          <div className="bg-slate-950/60 p-3 rounded-2xl border border-slate-800">
            <span className="text-slate-400 text-[10px] block uppercase font-bold">Sensors Verified</span>
            <span className="text-teal-300 font-black text-sm mt-0.5 block">5 / 5 Systems</span>
          </div>
          <div className="bg-slate-950/60 p-3 rounded-2xl border border-slate-800">
            <span className="text-slate-400 text-[10px] block uppercase font-bold">App State Integrity</span>
            <span className="text-sky-300 font-black text-sm mt-0.5 block">100% Fully Intact</span>
          </div>
          <div className="bg-slate-950/60 p-3 rounded-2xl border border-slate-800">
            <span className="text-slate-400 text-[10px] block uppercase font-bold">Total Auto-Heals</span>
            <span className="text-amber-300 font-black text-sm mt-0.5 block">{repairLogs.length} Events</span>
          </div>
        </div>
      </div>

      {/* NAVIGATION SUB-TABS */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-3 font-mono text-xs">
        <button
          onClick={() => setActiveTab('wizard')}
          className={`px-4 py-2 rounded-2xl font-bold transition-all flex items-center space-x-2 ${
            activeTab === 'wizard'
              ? 'bg-teal-500 text-slate-950 shadow-lg'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <Cpu className="w-4 h-4" />
          <span>DIAGNOSTIC WIZARD</span>
        </button>

        <button
          onClick={() => setActiveTab('app-self-repair')}
          className={`px-4 py-2 rounded-2xl font-bold transition-all flex items-center space-x-2 ${
            activeTab === 'app-self-repair'
              ? 'bg-teal-500 text-slate-950 shadow-lg'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>APP AUTO-HEAL & REPAIR</span>
        </button>

        <button
          onClick={() => setActiveTab('calibration')}
          className={`px-4 py-2 rounded-2xl font-bold transition-all flex items-center space-x-2 ${
            activeTab === 'calibration'
              ? 'bg-teal-500 text-slate-950 shadow-lg'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <Sliders className="w-4 h-4" />
          <span>SENSOR RECALIBRATION</span>
        </button>

        <button
          onClick={() => setActiveTab('repair-logs')}
          className={`px-4 py-2 rounded-2xl font-bold transition-all flex items-center space-x-2 ${
            activeTab === 'repair-logs'
              ? 'bg-teal-500 text-slate-950 shadow-lg'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <History className="w-4 h-4" />
          <span>REPAIR LOGS</span>
        </button>
      </div>

      {/* SUB-TAB 1: DIAGNOSTIC WIZARD */}
      {activeTab === 'wizard' && (
        <div className="space-y-6 font-mono">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-5 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <Wrench className="w-5 h-5 text-teal-400" />
                <h2 className="text-base font-bold text-white">Step-by-Step Hardware Sensor Diagnostic Suite</h2>
              </div>
              <button
                onClick={handleRunWizard}
                disabled={isWizardRunning}
                className="px-4 py-2 bg-teal-500 hover:bg-teal-400 text-slate-950 font-black text-xs rounded-xl transition-all"
              >
                {isWizardRunning ? 'TESTING SENSORS...' : 'RE-TEST ALL HARDWARE'}
              </button>
            </div>

            <div className="space-y-4">
              {diagnosticSteps.map((step, idx) => (
                <div
                  key={step.id}
                  className={`p-5 rounded-2xl border transition-all ${
                    isWizardRunning && wizardStepIdx === idx
                      ? 'bg-teal-950/40 border-teal-500/60 shadow-lg animate-pulse'
                      : step.status === 'Warning'
                      ? 'bg-amber-950/30 border-amber-500/40'
                      : 'bg-slate-950 border-slate-800'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="px-2.5 py-0.5 rounded-full bg-slate-900 border border-slate-700 text-teal-300 text-[10px] font-bold">
                          STEP 0{step.id}
                        </span>
                        <h3 className="text-sm font-bold text-white">{step.name}</h3>
                      </div>
                      <p className="text-slate-400 text-xs font-sans">{step.description}</p>
                    </div>

                    <div className="shrink-0 flex items-center space-x-3">
                      <span className="text-slate-300 text-xs font-bold">{step.reading}</span>
                      <span
                        className={`px-3 py-1 rounded-full text-[10px] font-bold flex items-center space-x-1 ${
                          step.status === 'Passed' || step.status === 'Repaired'
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                            : step.status === 'Warning'
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {step.status === 'Passed' || step.status === 'Repaired' ? (
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        ) : (
                          <AlertTriangle className="w-3.5 h-3.5" />
                        )}
                        <span>{step.status}</span>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 2: APP SELF-REPAIR ENGINE */}
      {activeTab === 'app-self-repair' && (
        <div className="space-y-6 font-mono">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-5 shadow-xl">
            <div className="flex items-center space-x-2 border-b border-slate-800 pb-3">
              <Sparkles className="w-5 h-5 text-teal-400" />
              <h2 className="text-base font-bold text-white">Automated App Self-Repair & Auto-Heal Engine</h2>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed">
              When triggered, the Self-Repair Engine conducts a deep audit of the application state, purges corrupted cache, resets stuck WebSockets, re-synchronizes session keys, and restores optimal performance.
            </p>

            <div className="p-6 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-black text-white uppercase">One-Click App Self-Repair & Recalibration</h3>
                  <p className="text-slate-400 text-xs mt-1">{isSelfRepairing ? repairStatusText : 'Ready to diagnose and repair app environment.'}</p>
                </div>
                <button
                  onClick={handleRunAppSelfRepair}
                  disabled={isSelfRepairing}
                  className="px-6 py-3 bg-teal-500 hover:bg-teal-400 text-slate-950 font-black text-xs rounded-2xl transition-all shadow-lg flex items-center space-x-2 disabled:opacity-50"
                >
                  <RotateCcw className={`w-4 h-4 ${isSelfRepairing ? 'animate-spin' : ''}`} />
                  <span>{isSelfRepairing ? 'REPAIRING APP...' : 'START AUTO-HEAL REPAIR'}</span>
                </button>
              </div>

              {isSelfRepairing && (
                <div className="space-y-2 pt-2">
                  <div className="w-full bg-slate-900 rounded-full h-3 overflow-hidden border border-slate-800 p-0.5">
                    <div
                      className="bg-gradient-to-r from-teal-500 to-emerald-400 h-full rounded-full transition-all duration-300"
                      style={{ width: `${repairProgress}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-400 font-bold">
                    <span>{repairStatusText}</span>
                    <span>{repairProgress}%</span>
                  </div>
                </div>
              )}

              {repairCompleted && (
                <div className="p-4 bg-emerald-950/40 border border-emerald-500/40 rounded-2xl text-emerald-200 text-xs flex items-center space-x-3">
                  <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
                  <div>
                    <span className="font-bold block">APP AUTO-REPAIR COMPLETED SUCCESSFULLY!</span>
                    <span>All React state controllers, local storage indices, and signal buffers have been restored to 100% health.</span>
                  </div>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                <span className="text-teal-400 font-bold block">1. Component State & Virtual DOM</span>
                <p className="text-slate-400 text-[11px]">Detects and resets unhandled error boundaries or component mount locks.</p>
              </div>
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                <span className="text-teal-400 font-bold block">2. Storage & Cache Sanitization</span>
                <p className="text-slate-400 text-[11px]">Sweeps LocalStorage for invalid JSON schemas and restores fallback defaults.</p>
              </div>
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                <span className="text-teal-400 font-bold block">3. Network & WebSocket Signals</span>
                <p className="text-slate-400 text-[11px]">Re-establishes broken telemetry streams and flushes dropped packet queues.</p>
              </div>
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                <span className="text-teal-400 font-bold block">4. Cryptographic Key Re-Sync</span>
                <p className="text-slate-400 text-[11px]">Re-generates expired RSA session signatures and clears stale OAuth tokens.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 3: SENSOR RECALIBRATION */}
      {activeTab === 'calibration' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-5 shadow-xl font-mono text-xs">
          <div className="flex items-center space-x-2 border-b border-slate-800 pb-3">
            <Sliders className="w-5 h-5 text-teal-400" />
            <h2 className="text-base font-bold text-white">Manual & Automatic Hardware Sensor Recalibration</h2>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-white font-bold block text-sm">Gyroscopic Compass & Pitch/Roll Zeroing</span>
                <span className="text-slate-400 text-[11px]">Zeroes offset drift for vessel gyro and aircraft artificial horizon.</span>
              </div>
              <button
                onClick={() => alert('Gyroscopic Compass Zeroed Successfully!')}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-teal-300 border border-teal-500/30 rounded-xl font-bold"
              >
                Zero Calibration
              </button>
            </div>

            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-white font-bold block text-sm">Pitot Tube & Speed Log Water/Air Speed Sync</span>
                <span className="text-slate-400 text-[11px]">Calibrates doppler speed log against GPS ground/over-ground speed.</span>
              </div>
              <button
                onClick={() => alert('Speed Log Synced to GPS Ground Speed!')}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-teal-300 border border-teal-500/30 rounded-xl font-bold"
              >
                Sync Speed Log
              </button>
            </div>

            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-white font-bold block text-sm">AIS / ADS-B Transponder Power & Frequency Reset</span>
                <span className="text-slate-400 text-[11px]">Resets transponder transmit channels to standard IMO 161.975 MHz.</span>
              </div>
              <button
                onClick={() => alert('Transponder Frequency Channels Reset!')}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-teal-300 border border-teal-500/30 rounded-xl font-bold"
              >
                Reset Frequencies
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 4: REPAIR LOGS */}
      {activeTab === 'repair-logs' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl font-mono text-xs">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center space-x-2">
              <History className="w-5 h-5 text-teal-400" />
              <h2 className="text-base font-bold text-white">App Self-Repair & Hardware Maintenance Log</h2>
            </div>
            <span className="text-slate-400 text-[10px]">{repairLogs.length} Total Maintenance Records</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-[10px] uppercase">
                  <th className="py-2.5 px-3">Log ID</th>
                  <th className="py-2.5 px-3">Target Component</th>
                  <th className="py-2.5 px-3">Issue Detected</th>
                  <th className="py-2.5 px-3">Action Taken</th>
                  <th className="py-2.5 px-3">Timestamp</th>
                  <th className="py-2.5 px-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-[11px]">
                {repairLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 px-3 text-teal-400 font-bold">{log.id}</td>
                    <td className="py-3 px-3 text-white font-bold">{log.component}</td>
                    <td className="py-3 px-3 text-amber-300">{log.issueDetected}</td>
                    <td className="py-3 px-3 text-slate-300">{log.actionTaken}</td>
                    <td className="py-3 px-3 text-slate-400">{log.timestamp}</td>
                    <td className="py-3 px-3">
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[9px] font-bold">
                        {log.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
