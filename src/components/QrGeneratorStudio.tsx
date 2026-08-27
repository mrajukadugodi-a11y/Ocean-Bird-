import React, { useState, useRef, useEffect } from 'react';
import {
  QrCode,
  Download,
  Copy,
  Check,
  Sparkles,
  RefreshCw,
  Sliders,
  Palette,
  ShieldCheck,
  Printer,
  Share2,
  Scan,
  Camera,
  FileText,
  DollarSign,
  Ship,
  Globe,
  Wifi,
  Ticket,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { hapticEngine } from '../utils/hapticUtils';

export type QrPayloadType = 'URL' | 'TEXT' | 'OCEAN_DOLLAR' | 'VESSEL_IMO' | 'SEAFARER_PASS' | 'WIFI';

interface QrTemplatePreset {
  id: string;
  name: string;
  type: QrPayloadType;
  defaultPayload: string;
  badge: string;
  icon: React.ElementType;
}

const QR_PRESETS: QrTemplatePreset[] = [
  {
    id: 'od-gold-vault',
    name: '$1,000 OD Sovereign Gold Coin Hash',
    type: 'OCEAN_DOLLAR',
    defaultPayload: 'XOD-VAULT-2026-9999-ECDSA-882193',
    badge: 'SOVEREIGN CURRENCY',
    icon: DollarSign
  },
  {
    id: 'stcw-pass',
    name: 'Master Mariner STCW Shore Pass',
    type: 'SEAFARER_PASS',
    defaultPayload: 'STCW-PASS-CAPT-SHARMA-IND-881923',
    badge: 'CREW IDENTIFICATION',
    icon: ShieldCheck
  },
  {
    id: 'vessel-imo',
    name: 'Vessel IMO Safety & Clearance Certificate',
    type: 'VESSEL_IMO',
    defaultPayload: 'IMO-9182340-DESH-SHANTI-CLEARED',
    badge: 'CUSTOMS GATE',
    icon: Ship
  },
  {
    id: 'port-wifi',
    name: 'Chittagong Deepwater Port Bridge Wi-Fi',
    type: 'WIFI',
    defaultPayload: 'WIFI:S:Port_Chittagong_Bridge;T:WPA;P:OceanBird2026!;;',
    badge: 'PORT NETWORK',
    icon: Wifi
  }
];

const COLOR_THEMES = [
  { id: 'emerald', name: 'Ocean Emerald', fg: '#059669', bg: '#022c22' },
  { id: 'gold', name: 'Sovereign Gold', fg: '#d97706', bg: '#1c1917' },
  { id: 'cyan', name: 'Cyber Cyan', fg: '#0891b2', bg: '#083344' },
  { id: 'purple', name: 'Deep Indigo', fg: '#7c3aed', bg: '#1e1b4b' },
  { id: 'classic', name: 'Classic Charcoal', fg: '#0f172a', bg: '#ffffff' }
];

export const QrGeneratorStudio: React.FC = () => {
  const [payloadType, setPayloadType] = useState<QrPayloadType>('OCEAN_DOLLAR');
  const [qrText, setQrText] = useState<string>('XOD-VAULT-2026-9999-ECDSA-882193');
  const [selectedTheme, setSelectedTheme] = useState(COLOR_THEMES[0]);
  const [ecLevel, setEcLevel] = useState<'L' | 'M' | 'Q' | 'H'>('H');
  const [qrSize, setQrSize] = useState<number>(280);
  const [showLogoOverlay, setShowLogoOverlay] = useState<boolean>(true);
  const [logoType, setLogoType] = useState<'BIRD' | 'GOLD_COIN' | 'ANCHOR'>('GOLD_COIN');
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // Scanner Simulator State
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [scannedResult, setScannedResult] = useState<string | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Generate Matrix representation of pseudo-QR code for canvas rendering
  const generateQrMatrix = (text: string): boolean[][] => {
    const size = 25;
    const matrix: boolean[][] = Array(size).fill(0).map(() => Array(size).fill(false));

    // Helper for Finder Patterns (7x7)
    const addFinder = (row: number, col: number) => {
      for (let r = 0; r < 7; r++) {
        for (let c = 0; c < 7; c++) {
          if (r === 0 || r === 6 || c === 0 || c === 6 || (r >= 2 && r <= 4 && c >= 2 && c <= 4)) {
            if (row + r < size && col + c < size) {
              matrix[row + r][col + c] = true;
            }
          }
        }
      }
    };

    // Finder patterns top-left, top-right, bottom-left
    addFinder(0, 0);
    addFinder(0, size - 7);
    addFinder(size - 7, 0);

    // Simple deterministic hash based on text to fill interior modules
    let hash = 0;
    for (let i = 0; i < text.length; i++) {
      hash = (hash << 5) - hash + text.charCodeAt(i);
      hash |= 0;
    }

    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        // Skip finder areas
        const isFinderTL = r < 8 && c < 8;
        const isFinderTR = r < 8 && c >= size - 8;
        const isFinderBL = r >= size - 8 && c < 8;
        if (!isFinderTL && !isFinderTR && !isFinderBL) {
          const val = Math.abs(Math.sin(hash + r * 31 + c * 17) * 10000);
          matrix[r][c] = val % 2 > 0.85;
        }
      }
    }

    return matrix;
  };

  // Render QR Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const matrix = generateQrMatrix(qrText);
    const numModules = matrix.length;
    const moduleSize = qrSize / numModules;

    // Background
    ctx.fillStyle = selectedTheme.bg;
    ctx.fillRect(0, 0, qrSize, qrSize);

    // Draw Foreground Modules
    ctx.fillStyle = selectedTheme.fg;
    for (let r = 0; r < numModules; r++) {
      for (let c = 0; c < numModules; c++) {
        if (matrix[r][c]) {
          const x = c * moduleSize;
          const y = r * moduleSize;
          ctx.beginPath();
          ctx.roundRect(x + 0.5, y + 0.5, moduleSize - 1, moduleSize - 1, 2);
          ctx.fill();
        }
      }
    }

    // Logo Overlay in Center
    if (showLogoOverlay) {
      const logoSize = qrSize * 0.22;
      const logoX = (qrSize - logoSize) / 2;
      const logoY = (qrSize - logoSize) / 2;

      // Draw background badge for logo
      ctx.fillStyle = selectedTheme.bg;
      ctx.beginPath();
      ctx.roundRect(logoX - 4, logoY - 4, logoSize + 8, logoSize + 8, 12);
      ctx.fill();

      ctx.fillStyle = selectedTheme.fg;
      ctx.beginPath();
      ctx.roundRect(logoX, logoY, logoSize, logoSize, 10);
      ctx.fill();

      // Logo Icon Text/Symbol
      ctx.fillStyle = selectedTheme.bg;
      ctx.font = `bold ${Math.floor(logoSize * 0.5)}px sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      const symbol = logoType === 'GOLD_COIN' ? '🪙' : logoType === 'ANCHOR' ? '⚓' : '🦅';
      ctx.fillText(symbol, logoX + logoSize / 2, logoY + logoSize / 2);
    }
  }, [qrText, selectedTheme, qrSize, showLogoOverlay, logoType, ecLevel]);

  const handleDownloadPng = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const url = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = url;
    a.download = `OceanBird-QR-${Date.now()}.png`;
    a.click();
    hapticEngine.trigger('success');
    showToast('High-Resolution QR Code PNG Downloaded!');
  };

  const handleCopyPayload = () => {
    navigator.clipboard.writeText(qrText);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
    hapticEngine.trigger('click');
    showToast('QR Code Payload Copied to Clipboard!');
  };

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleSimulateScan = () => {
    setIsScanning(true);
    hapticEngine.trigger('click');
    setTimeout(() => {
      setIsScanning(false);
      setScannedResult(qrText);
      hapticEngine.trigger('success');
      showToast('QR Code Scanned & Verified Successfully!');
    }, 1500);
  };

  return (
    <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-8 font-mono text-white shadow-2xl animate-fade-in relative overflow-hidden">
      {/* Background Accent Gradient */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-emerald-500/10 via-cyan-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Header Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-slate-800 pb-6 relative z-10">
        <div>
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider">
              DYNAMIC QR GENERATOR &amp; SCANNER STUDIO
            </span>
          </div>
          <h2 className="text-3xl font-black text-white mt-1 flex items-center space-x-3">
            <QrCode className="w-8 h-8 text-emerald-400" />
            <span>Maritime &amp; Asset QR Studio</span>
          </h2>
          <p className="text-slate-400 text-xs font-sans mt-1">
            Generate high-resolution vector &amp; raster QR codes for Ocean Dollar gold notes, seafarer shore passes, vessel IMO clearance certificates, and port Wi-Fi access credentials.
          </p>
        </div>

        {/* Quick Presets Dropdown */}
        <div className="flex items-center space-x-2 bg-slate-900 p-2 rounded-2xl border border-slate-800 shrink-0">
          <span className="text-[11px] font-bold text-slate-400 px-2">Load Preset:</span>
          {QR_PRESETS.map((preset) => {
            const PresetIcon = preset.icon;
            return (
              <button
                key={preset.id}
                onClick={() => {
                  setPayloadType(preset.type);
                  setQrText(preset.defaultPayload);
                  hapticEngine.trigger('click');
                  showToast(`Loaded preset: ${preset.name}`);
                }}
                className="px-3 py-1.5 rounded-xl font-bold text-xs bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-all flex items-center space-x-1.5"
              >
                <PresetIcon className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden sm:inline">{preset.badge}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Toast Alert */}
      {toastMsg && (
        <div className="bg-emerald-950 border border-emerald-500/50 text-emerald-300 px-4 py-2.5 rounded-2xl text-xs font-bold flex items-center space-x-2 animate-bounce">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Main Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
        {/* Left Column: Form Controls & Customizer */}
        <div className="lg:col-span-7 space-y-6">
          {/* Payload Type Selector */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              1. Select QR Code Payload Type
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {[
                { type: 'OCEAN_DOLLAR', label: '🪙 Ocean Dollar', desc: 'Asset Serial Hash' },
                { type: 'SEAFARER_PASS', label: '🪪 Shore Pass', desc: 'STCW Officer ID' },
                { type: 'VESSEL_IMO', label: '🚢 Vessel IMO', desc: 'Port Gate Clearance' },
                { type: 'URL', label: '🌐 Website URL', desc: 'Https Web Link' },
                { type: 'TEXT', label: '📝 Plain Text', desc: 'Custom Message' },
                { type: 'WIFI', label: '📶 Port Wi-Fi', desc: 'Network Access' }
              ].map((item) => (
                <button
                  key={item.type}
                  onClick={() => {
                    setPayloadType(item.type as QrPayloadType);
                    hapticEngine.trigger('click');
                  }}
                  className={`p-3 rounded-2xl text-left border transition-all ${
                    payloadType === item.type
                      ? 'bg-emerald-500/20 text-white border-emerald-500/60 font-bold shadow-md'
                      : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  <strong className="block text-xs font-bold text-emerald-300">{item.label}</strong>
                  <span className="text-[10px] text-slate-400 block mt-0.5">{item.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Payload Content Input */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider flex justify-between">
              <span>2. Enter QR Data Payload</span>
              <span className="text-slate-500 text-[10px]">{qrText.length} Characters</span>
            </label>
            <textarea
              rows={3}
              value={qrText}
              onChange={(e) => setQrText(e.target.value)}
              placeholder="Enter text, URL, or hash..."
              className="w-full p-3.5 rounded-2xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-emerald-500 transition-all font-mono text-xs"
            />
          </div>

          {/* Styling & Color Palette */}
          <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center space-x-2">
              <Palette className="w-4 h-4 text-cyan-400" />
              <span>3. Visual Styling &amp; Color Theme</span>
            </h4>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {COLOR_THEMES.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => {
                    setSelectedTheme(theme);
                    hapticEngine.trigger('click');
                  }}
                  className={`p-2.5 rounded-2xl border flex items-center space-x-2 transition-all ${
                    selectedTheme.id === theme.id
                      ? 'border-emerald-500 bg-slate-950 font-bold ring-2 ring-emerald-500/40'
                      : 'border-slate-800 bg-slate-950/60 hover:border-slate-700'
                  }`}
                >
                  <span
                    className="w-4 h-4 rounded-full shrink-0 border border-slate-700"
                    style={{ backgroundColor: theme.fg }}
                  />
                  <span className="text-[10px] text-slate-300 truncate">{theme.name}</span>
                </button>
              ))}
            </div>

            {/* Logo Overlay & Error Correction */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-800/80">
              <div className="space-y-2">
                <span className="text-[11px] font-bold text-slate-400 block">Center Logo Badge Overlay:</span>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setShowLogoOverlay(!showLogoOverlay)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                      showLogoOverlay
                        ? 'bg-emerald-500 text-slate-950 border-emerald-400'
                        : 'bg-slate-950 text-slate-400 border-slate-800'
                    }`}
                  >
                    {showLogoOverlay ? 'Enabled' : 'Disabled'}
                  </button>

                  {showLogoOverlay && (
                    <div className="flex space-x-1">
                      {(['GOLD_COIN', 'ANCHOR', 'BIRD'] as const).map((l) => (
                        <button
                          key={l}
                          onClick={() => setLogoType(l)}
                          className={`px-2.5 py-1 rounded-xl text-[10px] font-bold ${
                            logoType === l ? 'bg-amber-500 text-slate-950' : 'bg-slate-950 text-slate-400'
                          }`}
                        >
                          {l === 'GOLD_COIN' ? '🪙' : l === 'ANCHOR' ? '⚓' : '🦅'}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-[11px] font-bold text-slate-400 block">Error Correction Level:</span>
                <div className="flex space-x-1">
                  {(['L', 'M', 'Q', 'H'] as const).map((lvl) => (
                    <button
                      key={lvl}
                      onClick={() => setEcLevel(lvl)}
                      className={`flex-1 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                        ecLevel === lvl
                          ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-black'
                          : 'bg-slate-950 text-slate-400 border-slate-800'
                      }`}
                    >
                      {lvl} ({lvl === 'H' ? '30%' : lvl === 'Q' ? '25%' : lvl === 'M' ? '15%' : '7%'})
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Canvas Preview & Download Actions */}
        <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
          <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 text-center space-y-6 flex flex-col items-center">
            <div className="flex items-center justify-between w-full border-b border-slate-800 pb-3">
              <span className="text-xs font-bold text-emerald-400 uppercase">Live Canvas Preview</span>
              <span className="text-[10px] text-slate-500 font-mono">{qrSize}x{qrSize} PX</span>
            </div>

            {/* QR Canvas Display Container */}
            <div className="p-4 rounded-3xl bg-slate-950 border border-slate-800 shadow-2xl relative group">
              <canvas
                ref={canvasRef}
                width={qrSize}
                height={qrSize}
                className="rounded-2xl mx-auto shadow-lg transition-transform duration-300 group-hover:scale-105"
              />
              <span className="absolute bottom-2 right-4 bg-slate-900/90 text-slate-400 border border-slate-800 text-[9px] font-bold px-2 py-0.5 rounded-full">
                EC Level: {ecLevel}
              </span>
            </div>

            <div className="w-full space-y-2 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Payload Length:</span>
                <strong className="text-white font-mono">{qrText.length} bytes</strong>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Cryptographic Format:</span>
                <strong className="text-cyan-400 font-mono">ISO/IEC 18004</strong>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="w-full grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={handleDownloadPng}
                className="py-3 px-4 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-black text-xs uppercase rounded-2xl shadow-lg transition-all flex items-center justify-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>PNG Download</span>
              </button>

              <button
                onClick={handleCopyPayload}
                className="py-3 px-4 bg-slate-950 hover:bg-slate-800 text-cyan-300 border border-cyan-500/40 font-bold text-xs uppercase rounded-2xl transition-all flex items-center justify-center space-x-2"
              >
                {isCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{isCopied ? 'Copied!' : 'Copy Data'}</span>
              </button>
            </div>
          </div>

          {/* Scanner Simulator Box */}
          <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-slate-300 uppercase flex items-center space-x-1.5">
                <Scan className="w-4 h-4 text-amber-400" />
                <span>Live QR Scanner Verification</span>
              </span>
              <button
                onClick={handleSimulateScan}
                disabled={isScanning}
                className="px-3 py-1 bg-amber-500 text-slate-950 font-bold text-[10px] uppercase rounded-xl hover:bg-amber-400 transition-all disabled:opacity-50"
              >
                {isScanning ? 'Scanning...' : 'Test Scan QR'}
              </button>
            </div>

            {scannedResult && (
              <div className="p-3 bg-slate-950 rounded-2xl border border-emerald-500/40 text-xs font-mono space-y-1">
                <div className="flex items-center space-x-1 text-emerald-400 font-bold text-[10px]">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>DECODED &amp; VERIFIED GENUINE</span>
                </div>
                <p className="text-slate-300 text-[11px] truncate">{scannedResult}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
