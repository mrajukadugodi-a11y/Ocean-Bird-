import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  MapPin,
  Anchor,
  Compass,
  Ship,
  Info,
  CheckCircle2,
  RefreshCw,
  Search,
  Check,
  Building2,
  Activity,
  Layers,
  Sparkles,
  Waves,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Eye,
  EyeOff,
  Navigation,
  Globe,
  Radio
} from 'lucide-react';

interface BerthInfo {
  id: string;
  name: string;
  depthMeters: number;
  craneMovesPerHr: number;
  dockedVessel: string | null;
  status: 'OCCUPIED' | 'AVAILABLE' | 'MAINTENANCE';
  lengthMeters: number;
  powerGridKw: number;
}

interface PortLocation {
  id: string;
  name: string;
  country: string;
  coords: string;
  berths: BerthInfo[];
}

const PORTS_DATA: PortLocation[] = [
  {
    id: 'PORT-SIN',
    name: 'Singapore Pasir Panjang Terminal',
    country: 'Singapore',
    coords: '1.2644° N, 103.7854° E',
    berths: [
      { id: 'PP-01', name: 'Berth P01 (Deepwater)', depthMeters: 18.0, craneMovesPerHr: 34, dockedVessel: 'MSC Oscar (23,756 TEU)', status: 'OCCUPIED', lengthMeters: 400, powerGridKw: 4500 },
      { id: 'PP-02', name: 'Berth P02', depthMeters: 16.5, craneMovesPerHr: 30, dockedVessel: 'Maersk Mc-Kinney', status: 'OCCUPIED', lengthMeters: 380, powerGridKw: 4200 },
      { id: 'PP-03', name: 'Berth P03', depthMeters: 16.0, craneMovesPerHr: 0, dockedVessel: null, status: 'AVAILABLE', lengthMeters: 350, powerGridKw: 3800 },
      { id: 'PP-04', name: 'Berth P04', depthMeters: 15.5, craneMovesPerHr: 28, dockedVessel: 'CMA CGM Antoine', status: 'OCCUPIED', lengthMeters: 360, powerGridKw: 4000 }
    ]
  },
  {
    id: 'PORT-CGP',
    name: 'Chittagong Port Authority Terminal',
    country: 'Bangladesh',
    coords: '22.3382° N, 91.8016° E',
    berths: [
      { id: 'CGP-B1', name: 'NCT Berth 1', depthMeters: 10.5, craneMovesPerHr: 22, dockedVessel: 'Banglar Samriddhi', status: 'OCCUPIED', lengthMeters: 220, powerGridKw: 2100 },
      { id: 'CGP-B2', name: 'NCT Berth 2', depthMeters: 10.0, craneMovesPerHr: 20, dockedVessel: 'OEL Colombo', status: 'OCCUPIED', lengthMeters: 200, powerGridKw: 1800 },
      { id: 'CGP-B3', name: 'CCT Outer Roads', depthMeters: 9.2, craneMovesPerHr: 0, dockedVessel: null, status: 'AVAILABLE', lengthMeters: 250, powerGridKw: 1500 }
    ]
  },
  {
    id: 'PORT-COL',
    name: 'Colombo International Container Terminal',
    country: 'Sri Lanka',
    coords: '6.9497° N, 79.8428° E',
    berths: [
      { id: 'CICT-01', name: 'CICT South Berth', depthMeters: 18.0, craneMovesPerHr: 36, dockedVessel: 'EVER GIVEN (20,124 TEU)', status: 'OCCUPIED', lengthMeters: 400, powerGridKw: 5000 },
      { id: 'CICT-02', name: 'JCT East Berth', depthMeters: 15.0, craneMovesPerHr: 0, dockedVessel: null, status: 'AVAILABLE', lengthMeters: 330, powerGridKw: 3200 }
    ]
  }
];

export const InteractivePortMapView: React.FC = () => {
  const [selectedPort, setSelectedPort] = useState<PortLocation>(PORTS_DATA[0]);
  const [activeBerth, setActiveBerth] = useState<BerthInfo | null>(PORTS_DATA[0].berths[0]);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // MAP INTERACTIVE LAYER TOGGLES
  const [showBathymetry, setShowBathymetry] = useState(true);
  const [showTrafficAIS, setShowTrafficAIS] = useState(true);
  const [showCraneRadar, setShowCraneRadar] = useState(true);
  const [mapMode, setMapMode] = useState<'SCHEMATIC' | 'SATELLITE'>('SCHEMATIC');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.25, 2.25));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.25, 0.75));
  const handleResetZoom = () => setZoomLevel(1);

  return (
    <div className="space-y-6 font-sans">
      {/* TOAST NOTIFICATION */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 right-6 z-50 px-4 py-3 bg-slate-900 border border-emerald-500 text-emerald-300 font-mono text-xs rounded-2xl shadow-2xl flex items-center space-x-2"
          >
            <Check className="w-4 h-4 text-emerald-400" />
            <span className="font-bold">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HEADER BANNER */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center space-x-2 text-emerald-400 font-bold text-xs uppercase tracking-wider mb-1 font-mono">
              <MapPin className="w-4 h-4 text-emerald-400 animate-pulse" />
              <span>MARITIME PORT TERMINAL GIS VECTOR LAYOUT & MULTI-LAYER ZOOM SYSTEM</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center space-x-2">
              <Anchor className="w-6 h-6 text-emerald-400" />
              <span>Interactive Port Terminal GIS Map</span>
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl">
              Live berth occupancy tracking, gantry crane moves/hour productivity, bathymetric depth soundings layer, and AIS traffic vector overlays.
            </p>
          </div>

          <div className="flex items-center space-x-2 font-mono text-xs">
            {PORTS_DATA.map((p) => (
              <button
                key={p.id}
                onClick={() => {
                  setSelectedPort(p);
                  setActiveBerth(p.berths[0]);
                  showToast(`Port terminal switched to ${p.name}`);
                }}
                className={`px-3 py-2 rounded-xl font-bold border transition-all ${
                  selectedPort.id === p.id
                    ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-lg'
                    : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                {p.country}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* LAYER TOGGLE CONTROLS BAR */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl font-mono text-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center space-x-3 flex-wrap gap-2">
          <span className="text-slate-400 font-bold uppercase flex items-center space-x-1">
            <Layers className="w-4 h-4 text-emerald-400" />
            <span>Interactive Map Layers:</span>
          </span>

          <button
            onClick={() => setShowBathymetry(!showBathymetry)}
            className={`px-3 py-1.5 rounded-xl border font-bold flex items-center space-x-1.5 transition-all ${
              showBathymetry
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50'
                : 'bg-slate-950 text-slate-500 border-slate-800'
            }`}
          >
            <Waves className="w-3.5 h-3.5" />
            <span>Bathymetry Soundings</span>
          </button>

          <button
            onClick={() => setShowTrafficAIS(!showTrafficAIS)}
            className={`px-3 py-1.5 rounded-xl border font-bold flex items-center space-x-1.5 transition-all ${
              showTrafficAIS
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50'
                : 'bg-slate-950 text-slate-500 border-slate-800'
            }`}
          >
            <Ship className="w-3.5 h-3.5" />
            <span>AIS Traffic Vectors</span>
          </button>

          <button
            onClick={() => setShowCraneRadar(!showCraneRadar)}
            className={`px-3 py-1.5 rounded-xl border font-bold flex items-center space-x-1.5 transition-all ${
              showCraneRadar
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/50'
                : 'bg-slate-950 text-slate-500 border-slate-800'
            }`}
          >
            <Radio className="w-3.5 h-3.5" />
            <span>Gantry Crane Radar</span>
          </button>
        </div>

        {/* MAP MODE SWITCHER */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setMapMode(mapMode === 'SCHEMATIC' ? 'SATELLITE' : 'SCHEMATIC')}
            className="px-3 py-1.5 bg-slate-950 border border-slate-700 hover:border-emerald-400 text-slate-200 rounded-xl font-bold flex items-center space-x-1.5 transition-all"
          >
            <Globe className="w-3.5 h-3.5 text-emerald-400" />
            <span>Mode: {mapMode}</span>
          </button>
        </div>
      </div>

      {/* INTERACTIVE VECTOR PORT MAP CANVAS & BERTH INFO */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 font-mono">
        {/* MAP SCHEMATIC CANVAS (2 COLS) */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-sm font-bold text-white uppercase">{selectedPort.name}</h4>
              <p className="text-[10px] text-slate-400">{selectedPort.coords}</p>
            </div>

            {/* ZOOM CONTROLS */}
            <div className="flex items-center space-x-2 bg-slate-950 border border-slate-800 p-1 rounded-xl">
              <button
                onClick={handleZoomIn}
                className="p-1.5 hover:bg-slate-800 text-slate-300 hover:text-white rounded-lg transition-all"
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4 text-emerald-400" />
              </button>
              <span className="text-[10px] font-bold text-slate-300 px-1">{Math.round(zoomLevel * 100)}%</span>
              <button
                onClick={handleZoomOut}
                className="p-1.5 hover:bg-slate-800 text-slate-300 hover:text-white rounded-lg transition-all"
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4 text-emerald-400" />
              </button>
              <button
                onClick={handleResetZoom}
                className="p-1.5 hover:bg-slate-800 text-slate-300 hover:text-white rounded-lg transition-all"
                title="Reset Fit View"
              >
                <Maximize2 className="w-4 h-4 text-slate-400" />
              </button>
            </div>
          </div>

          {/* VECTOR MAP SVG WITH ZOOM TRANSFORM */}
          <div className="relative aspect-video w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 overflow-hidden flex items-center justify-center">
            <motion.div
              animate={{ scale: zoomLevel }}
              transition={{ duration: 0.3 }}
              className="w-full h-full"
            >
              <svg className="w-full h-full" viewBox="0 0 800 450">
                {/* BACKGROUND WATER / SATELLITE TONE */}
                <rect width="800" height="450" fill={mapMode === 'SATELLITE' ? '#081726' : '#020617'} />

                {/* BATHYMETRY SOUNDING CONTOURS LAYER */}
                {showBathymetry && (
                  <g opacity="0.6">
                    <path d="M 0 80 Q 200 130 400 100 T 800 160 L 800 450 L 0 450 Z" fill="#0f172a" />
                    <path d="M 0 180 Q 300 240 500 200 T 800 260 L 800 450 L 0 450 Z" fill="#1e293b" fillOpacity="0.5" />
                    <text x="30" y="380" fill="#38bdf8" fontSize="10" fontWeight="bold" opacity="0.8">
                      Depth: 18.0m Chart Datum
                    </text>
                  </g>
                )}

                {/* GANTRY CRANE RADAR & POWER GRID LAYER */}
                {showCraneRadar && (
                  <g opacity="0.7">
                    <circle cx="200" cy="180" r="100" fill="none" stroke="#f59e0b" strokeWidth="0.8" strokeDasharray="4 4" />
                    <circle cx="560" cy="180" r="120" fill="none" stroke="#f59e0b" strokeWidth="0.8" strokeDasharray="4 4" />
                  </g>
                )}

                {/* AIS TRAFFIC VECTOR SHIPS */}
                {showTrafficAIS && (
                  <g>
                    {/* INBOUND TUGBOAT 1 */}
                    <motion.g
                      animate={{ x: [0, 40, 0] }}
                      transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}
                    >
                      <path d="M 60 280 L 100 280 L 110 288 L 100 296 L 60 296 Z" fill="#38bdf8" stroke="#0284c7" />
                      <text x="62" y="275" fill="#38bdf8" fontSize="8" fontWeight="bold">Tugboat Alpha (AIS)</text>
                    </motion.g>

                    {/* APPROACHING FEEDER VESSEL */}
                    <motion.g
                      animate={{ y: [0, -20, 0] }}
                      transition={{ repeat: Infinity, duration: 10, ease: 'easeInOut' }}
                    >
                      <path d="M 680 340 L 740 340 L 755 350 L 740 360 L 680 360 Z" fill="#a855f7" stroke="#9333ea" />
                      <text x="680" y="335" fill="#c084fc" fontSize="8" fontWeight="bold">Feeder Vessel Express</text>
                    </motion.g>
                  </g>
                )}

                {/* BERTH PIERS & DOCKED SHIPS */}
                {selectedPort.berths.map((b, idx) => {
                  const x = 100 + idx * 170;
                  const y = 140;
                  const isSel = activeBerth?.id === b.id;

                  return (
                    <g
                      key={b.id}
                      onClick={() => {
                        setActiveBerth(b);
                        showToast(`Selected berth: ${b.name}`);
                      }}
                      className="cursor-pointer group"
                    >
                      {/* PIER RECTANGLE */}
                      <rect
                        x={x}
                        y={y}
                        width={140}
                        height={70}
                        rx={8}
                        fill={isSel ? '#10b981' : b.status === 'OCCUPIED' ? '#1e293b' : '#334155'}
                        stroke={isSel ? '#34d399' : '#475569'}
                        strokeWidth={isSel ? 3 : 1}
                      />

                      {/* VESSEL ICON IF DOCKED */}
                      {b.dockedVessel && (
                        <path
                          d={`M ${x + 10} ${y + 35} L ${x + 120} ${y + 35} L ${x + 130} ${y + 45} L ${x + 120} ${y + 55} L ${x + 10} ${y + 55} Z`}
                          fill="#0284c7"
                          stroke="#38bdf8"
                        />
                      )}

                      <text x={x + 10} y={y + 20} fill="#ffffff" fontSize="11" fontWeight="bold">
                        {b.id}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </motion.div>
          </div>
        </div>

        {/* BERTH DETAILS TELEMETRY PANEL (1 COL) */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
          <div className="flex items-center space-x-2 text-xs font-bold text-emerald-400 uppercase border-b border-slate-800 pb-2">
            <Info className="w-4 h-4" />
            <span>Berth Telemetry & Crane Status</span>
          </div>

          {activeBerth ? (
            <div className="space-y-4 text-xs">
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-2">
                <span className="text-[10px] text-slate-500 font-bold block">BERTH IDENTIFIER:</span>
                <h5 className="text-base font-black text-white">{activeBerth.name}</h5>
                <div className="flex justify-between items-center text-slate-300">
                  <span>Water Depth:</span>
                  <span className="text-emerald-400 font-bold">{activeBerth.depthMeters} meters</span>
                </div>
                <div className="flex justify-between items-center text-slate-300">
                  <span>Pier Length:</span>
                  <span className="text-cyan-300 font-bold">{activeBerth.lengthMeters} meters</span>
                </div>
                <div className="flex justify-between items-center text-slate-300">
                  <span>Power Grid Capacity:</span>
                  <span className="text-amber-300 font-bold">{activeBerth.powerGridKw} kW</span>
                </div>
              </div>

              <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-2">
                <span className="text-[10px] text-slate-500 font-bold block">CURRENTLY DOCKED VESSEL:</span>
                <p className="text-white font-bold">{activeBerth.dockedVessel || 'No vessel docked (Berth Available)'}</p>
                <div className="flex justify-between items-center text-slate-300 pt-1">
                  <span>Gantry Crane Moves:</span>
                  <span className="text-amber-300 font-bold">{activeBerth.craneMovesPerHr} moves / hr</span>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-xs text-slate-500">Select a berth on the port map to view real-time telemetry.</p>
          )}
        </div>
      </div>
    </div>
  );
};
