import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  QrCode,
  Scan,
  ShieldCheck,
  UserCheck,
  Box,
  CheckCircle2,
  RefreshCw,
  Camera,
  Download,
  FileText,
  Search,
  Check,
  Clock,
  Sparkles,
  Key,
  KeyRound,
  BadgeCheck,
  Filter,
  Trash2,
  Eye,
  X,
  FileSpreadsheet,
  ShieldAlert,
  SlidersHorizontal,
  Zap,
  ZapOff,
  Radio,
  Share2,
  CheckSquare,
  Flame,
  FileJson,
  Volume2
} from 'lucide-react';

interface CheckInRecord {
  id: string;
  subject: string;
  type: 'Seafarer Shore Pass' | 'Container Seal Verification' | 'Customs Terminal Gate' | 'Hazmat Safety Pass';
  timestamp: string;
  status: 'VERIFIED' | 'PENDING' | 'REJECTED';
  location: string;
  imoCertificate?: string;
  sha256Hash?: string;
  gateOperator?: string;
  notes?: string;
}

const INITIAL_CHECKINS: CheckInRecord[] = [
  {
    id: 'QR-9012',
    subject: 'Capt. Vikramaditya Sharma (STCW Master)',
    type: 'Seafarer Shore Pass',
    timestamp: '2026-08-05 02:40 UTC',
    status: 'VERIFIED',
    location: 'Chittagong Port Gate #3',
    imoCertificate: 'IND-STCW-881923-M',
    sha256Hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    gateOperator: 'Customs Officer Rahman (ID: CGP-882)',
    notes: 'STCW Master certificate valid until 2029. Shore pass granted for 48 hours.'
  },
  {
    id: 'QR-8821',
    subject: 'MSKU-918234-0 (Reefer Cold Chain)',
    type: 'Container Seal Verification',
    timestamp: '2026-08-05 02:15 UTC',
    status: 'VERIFIED',
    location: 'Colombo Transshipment Terminal A',
    imoCertificate: 'ISO-17712-H-SEAL',
    sha256Hash: 'a8f5f167f44f4964e6c998dee827110c',
    gateOperator: 'Automated OCR Gantry #12',
    notes: 'Bolt seal intact. Temperature setpoint -18.2°C verified.'
  },
  {
    id: 'QR-7740',
    subject: 'Chief Eng. Elena Rostova',
    type: 'Hazmat Safety Pass',
    timestamp: '2026-08-05 01:30 UTC',
    status: 'VERIFIED',
    location: 'Singapore Jurong Island Berth 4',
    imoCertificate: 'SGP-IMO-CLASS-3-PASS',
    sha256Hash: '7f83b1657ff1fc53b92dc18148a1d65d',
    gateOperator: 'Jurong Safety Marshal Tan',
    notes: 'Chemical tanker bunkering safety supervisor pass active.'
  },
  {
    id: 'QR-6512',
    subject: 'CMAU-772109-4 (Hazmat Chemical)',
    type: 'Customs Terminal Gate',
    timestamp: '2026-08-04 22:10 UTC',
    status: 'PENDING',
    location: 'JNPT Nhava Sheva Custom Gate B',
    imoCertificate: 'IMDG-CLASS-8-ACID',
    sha256Hash: 'd41d8cd98f00b204e9800998ecf8427e',
    gateOperator: 'JNPT Port Inspector Patil',
    notes: 'Awaiting secondary customs MSDS chemical declaration clearance.'
  },
  {
    id: 'QR-5120',
    subject: '2nd Officer David Chen',
    type: 'Seafarer Shore Pass',
    timestamp: '2026-08-04 18:05 UTC',
    status: 'VERIFIED',
    location: 'Port of Singapore Tanjong Pagar Gate',
    imoCertificate: 'SGP-STCW-992182-O',
    sha256Hash: '1f3870be274f6c49b3e31a0c6728957f',
    gateOperator: 'Biometric E-Gate #4',
    notes: 'Biometric facial scan and passport QR successfully matched.'
  },
  {
    id: 'QR-4091',
    subject: 'HLXU-441029-8 (Dry Bulk Cargo)',
    type: 'Container Seal Verification',
    timestamp: '2026-08-04 14:22 UTC',
    status: 'REJECTED',
    location: 'Chittagong NCT Gate 1',
    imoCertificate: 'UNVERIFIED-SEAL-TAMPER',
    sha256Hash: '00000000000000000000000000000000',
    gateOperator: 'Security Guard Alam',
    notes: 'Seal tampering detected! Gate entry blocked. Cargo flagged for customs physical audit.'
  }
];

export const QrCheckInView: React.FC = () => {
  const [checkIns, setCheckIns] = useState<CheckInRecord[]>(INITIAL_CHECKINS);
  const [activeTab, setActiveTab] = useState<'SCAN' | 'GENERATE' | 'HISTORY'>('SCAN');
  const [isScanning, setIsScanning] = useState(false);
  const [flashOn, setFlashOn] = useState(false);
  const [scannerMode, setScannerMode] = useState<'OVERHEAD_OCR' | 'HANDHELD_LASER' | 'BIOMETRIC_EGATE'>('OVERHEAD_OCR');
  const [autoApproveToggle, setAutoApproveToggle] = useState(true);

  const [passSubject, setPassSubject] = useState('Capt. Vikramaditya Sharma');
  const [passType, setPassType] = useState<'Seafarer Shore Pass' | 'Container Seal Verification' | 'Customs Terminal Gate' | 'Hazmat Safety Pass'>('Seafarer Shore Pass');
  const [generatedCode, setGeneratedCode] = useState<string>('QR-2026-STCW-99182');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // QR History Logs Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'VERIFIED' | 'PENDING' | 'REJECTED'>('ALL');
  const [typeFilter, setTypeFilter] = useState<string>('ALL');
  const [selectedRecord, setSelectedRecord] = useState<CheckInRecord | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Play audio scan chime feedback
  const playScanSound = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1200, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1600, ctx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.15);
    } catch (e) {
      // ignore
    }
  };

  const handleSimulateScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      playScanSound();
      const randomId = `QR-${Math.floor(1000 + Math.random() * 9000)}`;
      const newRec: CheckInRecord = {
        id: randomId,
        subject: passSubject || 'Verified Port Clearance Credential',
        type: passType,
        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16) + ' UTC',
        status: autoApproveToggle ? 'VERIFIED' : 'PENDING',
        location: scannerMode === 'BIOMETRIC_EGATE' ? 'Biometric E-Gate #4' : scannerMode === 'HANDHELD_LASER' ? 'Handheld Terminal Gate #2' : 'Automated Laser OCR Gantry 1',
        imoCertificate: `IMO-STCW-${Math.floor(100000 + Math.random() * 900000)}`,
        sha256Hash: Array.from({ length: 32 }, () => Math.floor(Math.random() * 16).toString(16)).join(''),
        gateOperator: 'Automated Port Scanner Engine',
        notes: autoApproveToggle
          ? 'Cryptographic QR pass verified and synced with IMO Global GISIS database.'
          : 'Scanned credential queued for secondary officer manual validation.'
      };
      setCheckIns((prev) => [newRec, ...prev]);
      setSelectedRecord(newRec);
      showToast(`QR Code Scanned & Credential ${randomId} ${autoApproveToggle ? 'VERIFIED' : 'QUEUED'}!`);
    }, 1500);
  };

  // Quick 1-click Check-In Action handler
  const handleQuickCheckIn = (type: CheckInRecord['type'], customSubject: string) => {
    playScanSound();
    const randomId = `QR-${Math.floor(1000 + Math.random() * 9000)}`;
    const newRec: CheckInRecord = {
      id: randomId,
      subject: customSubject,
      type: type,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16) + ' UTC',
      status: 'VERIFIED',
      location: 'Express Port Check-In Gantry',
      imoCertificate: `EXPRESS-PASS-${Math.floor(10000 + Math.random() * 90000)}`,
      sha256Hash: Array.from({ length: 32 }, () => Math.floor(Math.random() * 16).toString(16)).join(''),
      gateOperator: 'Quick Check-In Express Terminal',
      notes: 'Instant 1-click express pass cleared for terminal access.'
    };
    setCheckIns((prev) => [newRec, ...prev]);
    showToast(`⚡ Quick Check-In Granted for ${customSubject}! (${randomId})`);
  };

  const handleGenerateQrPass = () => {
    const code = `QR-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;
    setGeneratedCode(code);
    showToast(`Generated encrypted QR Pass: ${code}`);
  };

  const filteredHistory = checkIns.filter((item) => {
    const matchesSearch =
      item.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || item.status === statusFilter;
    const matchesType = typeFilter === 'ALL' || item.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const handleExportCsvLogs = () => {
    const headers = 'ID,Subject,Type,Status,Timestamp,Location,IMO Certificate,SHA256 Hash,Gate Operator,Notes\n';
    const rows = filteredHistory
      .map(
        (c) =>
          `"${c.id}","${c.subject}","${c.type}","${c.status}","${c.timestamp}","${c.location}","${c.imoCertificate || ''}","${c.sha256Hash || ''}","${c.gateOperator || ''}","${c.notes || ''}"`
      )
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `QR_Port_CheckIn_Logs_${new Date().toISOString().substring(0, 10)}.csv`;
    a.click();
    showToast(`Exported ${filteredHistory.length} QR Check-In Audit Logs to CSV!`);
  };

  const handleExportJsonLogs = () => {
    const jsonStr = JSON.stringify(filteredHistory, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `QR_Port_CheckIn_Audit_${new Date().toISOString().substring(0, 10)}.json`;
    a.click();
    showToast(`Exported ${filteredHistory.length} QR Audit Records as JSON!`);
  };

  const handleClearHistory = () => {
    if (confirm('Are you sure you want to clear all local QR history logs?')) {
      setCheckIns([]);
      showToast('All QR Check-In history logs cleared.');
    }
  };

  return (
    <div className="space-y-6 font-sans">
      {/* TOAST NOTIFICATION */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 right-6 z-50 px-4 py-3 bg-slate-900 border border-cyan-500 text-cyan-300 font-mono text-xs rounded-2xl shadow-2xl flex items-center space-x-2"
          >
            <Check className="w-4 h-4 text-cyan-400" />
            <span className="font-bold">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HEADER BANNER */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center space-x-2 text-cyan-400 font-bold text-xs uppercase tracking-wider mb-1 font-mono">
              <QrCode className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span>MARITIME CREW & CONTAINER PORT TERMINAL QR SCANNER & AUDIT LOGS</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center space-x-2">
              <Scan className="w-6 h-6 text-cyan-400" />
              <span>Smart QR Terminal Check-In & History Logs</span>
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl">
              Instant cryptographic verification for STCW seafarer shore passes, TEU container security seals, and port customs clearance gate audit history.
            </p>
          </div>

          <div className="flex items-center space-x-2 font-mono text-xs flex-wrap gap-y-2">
            <button
              onClick={() => setActiveTab('SCAN')}
              className={`px-4 py-2 rounded-xl font-bold border transition-all ${
                activeTab === 'SCAN'
                  ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-lg'
                  : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
              }`}
            >
              SCANNER MODE
            </button>
            <button
              onClick={() => setActiveTab('HISTORY')}
              className={`px-4 py-2 rounded-xl font-bold border transition-all ${
                activeTab === 'HISTORY'
                  ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-lg'
                  : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
              }`}
            >
              HISTORY LOGS ({checkIns.length})
            </button>
            <button
              onClick={() => setActiveTab('GENERATE')}
              className={`px-4 py-2 rounded-xl font-bold border transition-all ${
                activeTab === 'GENERATE'
                  ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-lg'
                  : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
              }`}
            >
              GENERATE QR PASS
            </button>
          </div>
        </div>
      </div>

      {/* QUICK CHECK-IN TOGGLE & EXPRESS PASS BAR */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl font-mono text-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 text-cyan-400 font-bold uppercase">
            <Zap className="w-4 h-4 text-amber-400 animate-bounce" />
            <span>Quick Check-In Express Terminal:</span>
          </div>

          {/* AUTO-APPROVE TOGGLE */}
          <button
            onClick={() => {
              setAutoApproveToggle(!autoApproveToggle);
              showToast(`Auto-Clear Gate Verification ${!autoApproveToggle ? 'ENABLED' : 'MANUAL'}`);
            }}
            className={`px-3 py-1.5 rounded-xl border font-bold flex items-center space-x-1.5 transition-all ${
              autoApproveToggle
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50'
                : 'bg-slate-950 text-slate-400 border-slate-800'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Auto-Clear: {autoApproveToggle ? 'ON (INSTANT)' : 'OFF (MANUAL)'}</span>
          </button>
        </div>

        {/* 1-CLICK QUICK CHECK-IN BUTTONS */}
        <div className="flex items-center space-x-2 flex-wrap gap-y-2">
          <button
            onClick={() => handleQuickCheckIn('Seafarer Shore Pass', 'Capt. Vikramaditya Sharma (Quick Shore Pass)')}
            className="px-3 py-1.5 bg-slate-950 hover:bg-cyan-950/60 border border-slate-800 hover:border-cyan-500 text-cyan-300 rounded-xl font-bold flex items-center space-x-1.5 transition-all"
          >
            <UserCheck className="w-3.5 h-3.5 text-cyan-400" />
            <span>⚡ Quick Crew Shore Pass</span>
          </button>

          <button
            onClick={() => handleQuickCheckIn('Container Seal Verification', 'MSKU-882190-2 (ISO Bolt Seal Clear)')}
            className="px-3 py-1.5 bg-slate-950 hover:bg-amber-950/60 border border-slate-800 hover:border-amber-500 text-amber-300 rounded-xl font-bold flex items-center space-x-1.5 transition-all"
          >
            <Box className="w-3.5 h-3.5 text-amber-400" />
            <span>⚡ Quick Seal Check</span>
          </button>

          <button
            onClick={() => handleQuickCheckIn('Hazmat Safety Pass', 'CMAU-992182-4 (Hazmat Class 3 Clear)')}
            className="px-3 py-1.5 bg-slate-950 hover:bg-rose-950/60 border border-slate-800 hover:border-rose-500 text-rose-300 rounded-xl font-bold flex items-center space-x-1.5 transition-all"
          >
            <Flame className="w-3.5 h-3.5 text-rose-400" />
            <span>⚡ Quick Hazmat Pass</span>
          </button>
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      {activeTab === 'SCAN' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 font-mono">
          {/* CAMERA SCANNER SIMULATOR WITH ANIMATED QR PULSES (1 COL) */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2 text-xs">
                <div className="flex items-center space-x-2 font-bold text-cyan-400 uppercase">
                  <Camera className="w-4 h-4" />
                  <span>Optical Gate Terminal Camera</span>
                </div>

                {/* FLASHLIGHT TOGGLE */}
                <button
                  onClick={() => {
                    setFlashOn(!flashOn);
                    showToast(`Camera Flashlight ${!flashOn ? 'ON' : 'OFF'}`);
                  }}
                  className={`p-1.5 rounded-lg border transition-all ${
                    flashOn
                      ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                  title="Toggle Flashlight"
                >
                  <Zap className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* SCANNER HARDWARE MODE SELECTOR */}
              <div className="grid grid-cols-3 gap-1 text-[10px]">
                <button
                  onClick={() => setScannerMode('OVERHEAD_OCR')}
                  className={`p-1.5 rounded-lg font-bold border ${
                    scannerMode === 'OVERHEAD_OCR' ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500' : 'bg-slate-950 text-slate-500 border-slate-800'
                  }`}
                >
                  Gantry OCR
                </button>
                <button
                  onClick={() => setScannerMode('HANDHELD_LASER')}
                  className={`p-1.5 rounded-lg font-bold border ${
                    scannerMode === 'HANDHELD_LASER' ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500' : 'bg-slate-950 text-slate-500 border-slate-800'
                  }`}
                >
                  Handheld Laser
                </button>
                <button
                  onClick={() => setScannerMode('BIOMETRIC_EGATE')}
                  className={`p-1.5 rounded-lg font-bold border ${
                    scannerMode === 'BIOMETRIC_EGATE' ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500' : 'bg-slate-950 text-slate-500 border-slate-800'
                  }`}
                >
                  Biometric E-Gate
                </button>
              </div>

              {/* INTERACTIVE SCANNER VIEWPORT WITH ANIMATED QR PULSES */}
              <div className={`relative aspect-square w-full bg-slate-950 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center p-4 overflow-hidden transition-all ${
                flashOn ? 'border-amber-400/80 shadow-2xl shadow-amber-500/20' : 'border-cyan-500/40'
              }`}>
                {/* FLASHLIGHT OVERLAY LIGHTING EFFECT */}
                {flashOn && (
                  <div className="absolute inset-0 bg-amber-400/10 pointer-events-none blur-xl animate-pulse" />
                )}

                {/* ANIMATED PULSE RINGS EMANATING FROM QR CENTER */}
                {isScanning && (
                  <>
                    <motion.div
                      animate={{ scale: [1, 1.8], opacity: [0.8, 0] }}
                      transition={{ repeat: Infinity, duration: 1.2, ease: 'easeOut' }}
                      className="absolute w-36 h-36 rounded-2xl border-2 border-cyan-400 bg-cyan-500/20 pointer-events-none"
                    />
                    <motion.div
                      animate={{ scale: [1, 2.4], opacity: [0.6, 0] }}
                      transition={{ repeat: Infinity, duration: 1.6, delay: 0.3, ease: 'easeOut' }}
                      className="absolute w-36 h-36 rounded-2xl border-2 border-emerald-400 bg-emerald-500/10 pointer-events-none"
                    />
                    {/* LASER SCANNING BEAM */}
                    <motion.div
                      initial={{ top: '0%' }}
                      animate={{ top: '100%' }}
                      transition={{ repeat: Infinity, duration: 1.2, ease: 'linear' }}
                      className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-lg shadow-cyan-400/90 z-20"
                    />
                  </>
                )}

                {/* TARGETING RETICLE & QR CODE DISPLAY */}
                <div className="w-36 h-36 border-2 border-cyan-400/80 rounded-xl flex items-center justify-center relative bg-slate-900/80 shadow-2xl">
                  <QrCode className="w-24 h-24 text-cyan-400 opacity-90" />
                  <div className="absolute top-1 left-1 w-4 h-4 border-t-2 border-l-2 border-cyan-400" />
                  <div className="absolute top-1 right-1 w-4 h-4 border-t-2 border-r-2 border-cyan-400" />
                  <div className="absolute bottom-1 left-1 w-4 h-4 border-b-2 border-l-2 border-cyan-400" />
                  <div className="absolute bottom-1 right-1 w-4 h-4 border-b-2 border-r-2 border-cyan-400" />
                </div>

                <p className="text-[11px] text-slate-400 mt-4 text-center">
                  Align Seafarer QR or Container Seal barcode within targeting frame
                </p>
              </div>

              <div className="space-y-1 text-xs">
                <label className="text-slate-400 font-bold block">Preset Target Subject:</label>
                <input
                  type="text"
                  value={passSubject}
                  onChange={(e) => setPassSubject(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl p-2.5 focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            <button
              onClick={handleSimulateScan}
              disabled={isScanning}
              className="w-full py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black rounded-xl text-xs transition-all flex items-center justify-center space-x-2 shadow-lg shadow-cyan-950/40"
            >
              <Scan className={`w-4 h-4 ${isScanning ? 'animate-spin' : ''}`} />
              <span>{isScanning ? 'SCANNING & VERIFYING...' : 'TRIGGER CAMERA QR SCAN'}</span>
            </button>
          </div>

          {/* CHECK-IN HISTORY AUDIT PREVIEW (2 COLS) */}
          <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2 text-xs font-bold text-cyan-400 uppercase">
                <ShieldCheck className="w-4 h-4" />
                <span>Verified Check-In Terminal Log ({checkIns.length} Records)</span>
              </div>

              <button
                onClick={() => setActiveTab('HISTORY')}
                className="text-xs text-cyan-400 hover:underline font-bold flex items-center space-x-1"
              >
                <span>VIEW FULL AUDIT LOGS</span>
                <Clock className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3">
              {checkIns.slice(0, 5).map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedRecord(item)}
                  className="p-4 bg-slate-950 border border-slate-800 hover:border-cyan-500/50 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs transition-all cursor-pointer group"
                >
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-white text-sm group-hover:text-cyan-300 transition-colors">
                        {item.subject}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-900 text-cyan-300 border border-slate-800">
                        {item.type}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400 flex items-center space-x-2">
                      <span>{item.location}</span>
                      <span>•</span>
                      <span className="text-slate-500">{item.timestamp}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span
                      className={`px-2.5 py-1 rounded-xl text-[10px] font-black uppercase border flex items-center space-x-1 ${
                        item.status === 'VERIFIED'
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                          : item.status === 'PENDING'
                          ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                          : 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                      }`}
                    >
                      <CheckCircle2 className="w-3 h-3" />
                      <span>{item.status}</span>
                    </span>
                    <Eye className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-colors" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* FULL QR HISTORY LOGS VIEW WITH MULTI-FORMAT EXPORT */}
      {activeTab === 'HISTORY' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl font-mono">
          {/* SEARCH & FILTERS HEADER */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center space-x-2 text-xs font-bold text-cyan-400 uppercase">
              <Clock className="w-4 h-4" />
              <span>Full Maritime QR Check-In Audit Logs</span>
            </div>

            <div className="flex items-center space-x-2 flex-wrap gap-y-2">
              <button
                onClick={handleExportCsvLogs}
                className="px-3 py-2 bg-slate-950 hover:bg-slate-800 border border-slate-700 text-slate-200 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-all"
              >
                <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
                <span>EXPORT CSV LOGS</span>
              </button>

              <button
                onClick={handleExportJsonLogs}
                className="px-3 py-2 bg-slate-950 hover:bg-slate-800 border border-slate-700 text-slate-200 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-all"
              >
                <FileJson className="w-4 h-4 text-cyan-400" />
                <span>EXPORT JSON</span>
              </button>

              <button
                onClick={handleClearHistory}
                className="px-3 py-2 bg-slate-950 hover:bg-rose-950/60 border border-slate-800 hover:border-rose-800 text-rose-400 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-all"
              >
                <Trash2 className="w-4 h-4" />
                <span>CLEAR LOGS</span>
              </button>
            </div>
          </div>

          {/* SEARCH BAR & QUICK FILTERS */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
              <input
                type="text"
                placeholder="Search subject, QR ID, location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl pl-9 pr-3 py-2.5 focus:outline-none focus:border-cyan-500"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="bg-slate-950 border border-slate-800 text-white rounded-xl p-2.5 focus:outline-none focus:border-cyan-500"
            >
              <option value="ALL">All Statuses (VERIFIED, PENDING, REJECTED)</option>
              <option value="VERIFIED">VERIFIED Only</option>
              <option value="PENDING">PENDING Only</option>
              <option value="REJECTED">REJECTED Only</option>
            </select>

            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="bg-slate-950 border border-slate-800 text-white rounded-xl p-2.5 focus:outline-none focus:border-cyan-500"
            >
              <option value="ALL">All Credential Types</option>
              <option value="Seafarer Shore Pass">Seafarer Shore Pass</option>
              <option value="Container Seal Verification">Container Seal Verification</option>
              <option value="Customs Terminal Gate">Customs Terminal Gate</option>
              <option value="Hazmat Safety Pass">Hazmat Safety Pass</option>
            </select>
          </div>

          {/* HISTORY TABLE / LIST */}
          <div className="space-y-3">
            {filteredHistory.length > 0 ? (
              filteredHistory.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedRecord(item)}
                  className="p-4 bg-slate-950 border border-slate-800 hover:border-cyan-500/50 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs transition-all cursor-pointer group"
                >
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-mono text-cyan-400 font-bold">{item.id}</span>
                      <span className="font-bold text-white text-sm group-hover:text-cyan-300 transition-colors">
                        {item.subject}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-900 text-cyan-300 border border-slate-800">
                        {item.type}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400 flex items-center space-x-2 flex-wrap">
                      <span>{item.location}</span>
                      <span>•</span>
                      <span className="text-slate-500">{item.timestamp}</span>
                      {item.imoCertificate && (
                        <>
                          <span>•</span>
                          <span className="text-amber-400/80">{item.imoCertificate}</span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span
                      className={`px-2.5 py-1 rounded-xl text-[10px] font-black uppercase border flex items-center space-x-1 ${
                        item.status === 'VERIFIED'
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                          : item.status === 'PENDING'
                          ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                          : 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                      }`}
                    >
                      <CheckCircle2 className="w-3 h-3" />
                      <span>{item.status}</span>
                    </span>
                    <button className="p-1.5 bg-slate-900 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white">
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-slate-500 bg-slate-950 rounded-2xl border border-slate-800">
                No check-in audit records matching search filter.
              </div>
            )}
          </div>
        </div>
      )}

      {/* GENERATE QR PASS FORM WITH ANIMATED QR PULSES */}
      {activeTab === 'GENERATE' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl font-mono max-w-2xl mx-auto">
          <div className="flex items-center space-x-2 text-xs font-bold text-cyan-400 uppercase border-b border-slate-800 pb-3">
            <KeyRound className="w-4 h-4" />
            <span>Generate Encrypted Maritime Terminal QR Credential</span>
          </div>

          <div className="space-y-4 text-xs">
            <div className="space-y-1">
              <label className="text-slate-400 font-bold block">Subject Name / Container ID:</label>
              <input
                type="text"
                value={passSubject}
                onChange={(e) => setPassSubject(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl p-2.5 focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-slate-400 font-bold block">Credential Type:</label>
              <select
                value={passType}
                onChange={(e) => setPassType(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl p-2.5 focus:outline-none focus:border-cyan-500"
              >
                <option value="Seafarer Shore Pass">Seafarer Shore Pass (STCW / IMO)</option>
                <option value="Container Seal Verification">Container Seal Verification (ISO 17712)</option>
                <option value="Customs Terminal Gate">Customs Terminal Gate Pass</option>
                <option value="Hazmat Safety Pass">Hazmat Chemical Safety Pass</option>
              </select>
            </div>

            {/* GENERATED QR TICKET WITH PULSE RING GRAPHICS */}
            <div className="p-6 bg-slate-950 border border-cyan-500/40 rounded-2xl flex flex-col items-center justify-center space-y-3 relative overflow-hidden">
              <motion.div
                animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                className="absolute w-60 h-60 rounded-full border border-cyan-400/40 pointer-events-none"
              />

              <div className="w-40 h-40 bg-white p-3 rounded-2xl flex items-center justify-center shadow-2xl relative z-10">
                <QrCode className="w-32 h-32 text-slate-950" />
              </div>
              <span className="text-cyan-300 font-bold text-sm relative z-10">{generatedCode}</span>
              <p className="text-[10px] text-slate-400 relative z-10">Valid for 24 hours across all IMO port customs checkpoints</p>
            </div>

            <div className="flex items-center space-x-3 pt-2">
              <button
                onClick={handleGenerateQrPass}
                className="flex-1 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black rounded-xl text-xs transition-all flex items-center justify-center space-x-2 shadow-lg"
              >
                <RefreshCw className="w-4 h-4" />
                <span>GENERATE NEW QR PASS</span>
              </button>
              <button
                onClick={() => showToast('QR Pass digital ticket downloaded.')}
                className="px-4 py-3 bg-slate-950 hover:bg-slate-800 border border-slate-700 text-slate-200 font-bold rounded-xl text-xs flex items-center space-x-2"
              >
                <Download className="w-4 h-4 text-cyan-400" />
                <span>DOWNLOAD TICKET</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DETAILED RECORD AUDIT MODAL */}
      <AnimatePresence>
        {selectedRecord && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-900 border border-cyan-500/50 rounded-2xl p-6 max-w-xl w-full shadow-2xl font-mono text-xs space-y-4 relative"
            >
              <button
                onClick={() => setSelectedRecord(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg bg-slate-950 border border-slate-800"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center space-x-2 text-cyan-400 font-bold text-xs uppercase border-b border-slate-800 pb-3">
                <BadgeCheck className="w-5 h-5 text-cyan-400" />
                <span>Maritime Cryptographic Audit Inspection Record</span>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <span className="text-slate-400">QR Record ID:</span>
                  <span className="text-cyan-300 font-bold text-sm">{selectedRecord.id}</span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
                    <span className="text-slate-500 text-[10px] font-bold block">SUBJECT / CREDENTIAL</span>
                    <strong className="text-white block text-sm">{selectedRecord.subject}</strong>
                  </div>

                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
                    <span className="text-slate-500 text-[10px] font-bold block">GATE LOCATION</span>
                    <strong className="text-slate-300 block">{selectedRecord.location}</strong>
                  </div>
                </div>

                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-slate-500 text-[10px] font-bold block">IMO CERTIFICATE / SEAL ID</span>
                  <p className="text-amber-400 font-bold">{selectedRecord.imoCertificate || 'N/A'}</p>
                </div>

                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-slate-500 text-[10px] font-bold block">SHA-256 AUDIT VERIFICATION HASH</span>
                  <p className="text-[10px] text-slate-400 break-all font-mono">{selectedRecord.sha256Hash || 'N/A'}</p>
                </div>

                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-slate-500 text-[10px] font-bold block">GATE OPERATOR & AUDIT NOTES</span>
                  <p className="text-slate-300">{selectedRecord.notes || 'No audit flags recorded.'}</p>
                </div>
              </div>

              <button
                onClick={() => setSelectedRecord(null)}
                className="w-full py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black rounded-xl text-xs transition-all"
              >
                CLOSE AUDIT RECORD
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
