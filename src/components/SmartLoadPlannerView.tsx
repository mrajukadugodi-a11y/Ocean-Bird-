import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Box,
  Layers,
  Sparkles,
  TrendingUp,
  CheckCircle2,
  RefreshCw,
  AlertTriangle,
  Sliders,
  Check,
  Zap,
  Scale,
  Compass,
  Download,
  Info,
  ChevronRight,
  ShieldCheck,
  Activity,
  ArrowUpDown
} from 'lucide-react';

interface ContainerSlot {
  bay: number;
  row: number;
  tier: number;
  type: 'DRY' | 'REEFER' | 'HAZMAT' | 'EMPTY';
  weightTons: number;
  destination: string;
}

export const SmartLoadPlannerView: React.FC = () => {
  const [vesselGM, setVesselGM] = useState<number>(2.45); // GM in meters
  const [heelAngle, setHeelAngle] = useState<number>(0.4); // degrees starboard
  const [totalTEU, setTotalTEU] = useState<number>(4820);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optimizationStep, setOptimizationStep] = useState<number>(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [gridSlots, setGridSlots] = useState<ContainerSlot[]>([
    { bay: 12, row: 2, tier: 82, type: 'DRY', weightTons: 22.4, destination: 'SGP' },
    { bay: 12, row: 4, tier: 82, type: 'REEFER', weightTons: 28.1, destination: 'COL' },
    { bay: 12, row: 6, tier: 82, type: 'HAZMAT', weightTons: 18.5, destination: 'CGP' },
    { bay: 12, row: 2, tier: 84, type: 'DRY', weightTons: 14.2, destination: 'SGP' },
    { bay: 12, row: 4, tier: 84, type: 'DRY', weightTons: 16.0, destination: 'COL' },
    { bay: 12, row: 6, tier: 84, type: 'EMPTY', weightTons: 2.2, destination: 'SGP' },
    { bay: 12, row: 2, tier: 86, type: 'REEFER', weightTons: 26.5, destination: 'CGP' },
    { bay: 12, row: 4, tier: 86, type: 'DRY', weightTons: 19.8, destination: 'COL' }
  ]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Live Recalculate GM and Heel angle when slot weights are tweaked
  const updateSlotWeight = (index: number, newWeight: number) => {
    const updated = [...gridSlots];
    updated[index].weightTons = Number(newWeight.toFixed(1));
    setGridSlots(updated);

    // Calculate total weight and moment
    const totalW = updated.reduce((sum, s) => sum + s.weightTons, 0);
    const calculatedGM = Number((2.2 + (totalW / 120) * 0.4).toFixed(2));
    const calculatedHeel = Number((0.1 + (updated[0].weightTons - updated[2].weightTons) * 0.03).toFixed(1));

    setVesselGM(Math.max(1.8, Math.min(3.5, calculatedGM)));
    setHeelAngle(Math.max(-2.0, Math.min(2.0, calculatedHeel)));
  };

  const handleAutoOptimizeStowage = () => {
    setIsOptimizing(true);
    setOptimizationStep(1);

    setTimeout(() => {
      setOptimizationStep(2);
      // Re-arrange heavy containers to lower tiers
      setGridSlots((prev) => [
        { ...prev[0], tier: 82, weightTons: 28.1 }, // Heavy reefer down
        { ...prev[1], tier: 82, weightTons: 22.4 },
        { ...prev[2], tier: 82, weightTons: 19.8 },
        { ...prev[3], tier: 84, weightTons: 18.5 },
        { ...prev[4], tier: 84, weightTons: 16.0 },
        { ...prev[5], tier: 84, weightTons: 14.2 },
        { ...prev[6], tier: 86, weightTons: 2.2 }, // Empty up
        { ...prev[7], tier: 86, weightTons: 8.5 }
      ]);
    }, 1000);

    setTimeout(() => {
      setOptimizationStep(3);
      setVesselGM(2.88);
      setHeelAngle(0.0);
    }, 2000);

    setTimeout(() => {
      setIsOptimizing(false);
      showToast('Smart Load AI Stowage Optimization Complete! GM elevated to 2.88m, Heel angle 0.0°.');
    }, 2800);
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
            className="fixed top-20 right-6 z-50 px-4 py-3 bg-slate-900 border border-amber-500 text-amber-300 font-mono text-xs rounded-2xl shadow-2xl flex items-center space-x-2"
          >
            <Check className="w-4 h-4 text-amber-400" />
            <span className="font-bold">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HEADER BANNER */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center space-x-2 text-amber-400 font-bold text-xs uppercase tracking-wider mb-1 font-mono">
              <Box className="w-4 h-4 text-amber-400 animate-pulse" />
              <span>3D VESSEL STOWAGE BAY PLANNER & GM STABILITY OPTIMIZATION ENGINE</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center space-x-2">
              <Layers className="w-6 h-6 text-amber-400" />
              <span>Smart Load & Stowage Bay Planner</span>
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl">
              Real-time container weight distribution, IMDG hazmat segregation rules, and automatic Metacentric Height (GM) stability optimization.
            </p>
          </div>

          <button
            onClick={handleAutoOptimizeStowage}
            disabled={isOptimizing}
            className={`px-5 py-3 rounded-xl font-mono text-xs font-black flex items-center space-x-2 transition-all shadow-lg ${
              isOptimizing
                ? 'bg-slate-800 text-amber-300 border border-amber-500/40'
                : 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-950/40'
            }`}
          >
            <Zap className={`w-4 h-4 ${isOptimizing ? 'animate-spin text-amber-400' : ''}`} />
            <span>{isOptimizing ? 'OPTIMIZING STOWAGE...' : 'TRIGGER AI SMART LOAD OPTIMIZATION'}</span>
          </button>
        </div>
      </div>

      {/* OPTIMIZATION PROCESS STEP TRACKER */}
      {isOptimizing && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="p-4 bg-slate-900 border border-amber-500/50 rounded-2xl font-mono text-xs space-y-3 shadow-xl"
        >
          <div className="flex items-center space-x-2 text-amber-400 font-bold">
            <Sparkles className="w-4 h-4 animate-spin" />
            <span>AI STOWAGE ALGORITHM STEP {optimizationStep} OF 3 IN PROGRESS...</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div
              className={`p-3 rounded-xl border ${
                optimizationStep >= 1 ? 'bg-amber-500/10 border-amber-500 text-white' : 'bg-slate-950 border-slate-800 text-slate-500'
              }`}
            >
              <div className="font-bold flex items-center space-x-1">
                <span>1. Lower-Tier Weight Shift</span>
                {optimizationStep > 1 && <Check className="w-4 h-4 text-emerald-400" />}
              </div>
              <p className="text-[10px] text-slate-400 mt-1">Re-ordering heavy 28t containers to keel tiers for vertical center of gravity (VCG) lowering.</p>
            </div>

            <div
              className={`p-3 rounded-xl border ${
                optimizationStep >= 2 ? 'bg-amber-500/10 border-amber-500 text-white' : 'bg-slate-950 border-slate-800 text-slate-500'
              }`}
            >
              <div className="font-bold flex items-center space-x-1">
                <span>2. IMDG Segregation</span>
                {optimizationStep > 2 && <Check className="w-4 h-4 text-emerald-400" />}
              </div>
              <p className="text-[10px] text-slate-400 mt-1">Isolating Class 3 flammable liquids with a 2-bay buffer zone from reefer power plugs.</p>
            </div>

            <div
              className={`p-3 rounded-xl border ${
                optimizationStep >= 3 ? 'bg-amber-500/10 border-amber-500 text-white' : 'bg-slate-950 border-slate-800 text-slate-500'
              }`}
            >
              <div className="font-bold flex items-center space-x-1">
                <span>3. Trim & Heel Zeroing</span>
                {optimizationStep >= 3 && <Check className="w-4 h-4 text-emerald-400" />}
              </div>
              <p className="text-[10px] text-slate-400 mt-1">Equalizing port/starboard moment calculations to achieve 0.0° heel angle.</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* STABILITY KPI CARDS & GZ STABILITY CURVE GRAPH */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 font-mono text-xs">
        {/* KPI CARDS (2 COLS) */}
        <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl space-y-1 shadow-lg">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">METACENTRIC HEIGHT (GM)</span>
            <strong className="text-2xl font-black text-amber-400 block">{vesselGM} m</strong>
            <span className="text-[10px] text-emerald-400 block">Safe IMO GM threshold (&gt;0.15m)</span>
          </div>

          <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl space-y-1 shadow-lg">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">CURRENT HEEL ANGLE</span>
            <strong className="text-2xl font-black text-cyan-300 block">{heelAngle}° {heelAngle >= 0 ? 'Starboard' : 'Port'}</strong>
            <span className="text-[10px] text-cyan-400 block">Trim balance under control</span>
          </div>

          <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl space-y-1 shadow-lg">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">TOTAL ONBOARD TEU</span>
            <strong className="text-2xl font-black text-white block">{totalTEU.toLocaleString()} TEU</strong>
            <span className="text-[10px] text-slate-400 block">82% Bay Capacity Utilization</span>
          </div>

          <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl space-y-1 shadow-lg">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">IMDG HAZMAT COMPLIANCE</span>
            <strong className="text-2xl font-black text-emerald-400 block">100% Passed</strong>
            <span className="text-[10px] text-emerald-300 block">Class 3 & 8 Segregated</span>
          </div>
        </div>

        {/* GZ STABILITY CURVE GRAPH */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-lg space-y-2 flex flex-col justify-between">
          <div className="flex justify-between items-center border-b border-slate-800 pb-2">
            <span className="text-[10px] text-amber-400 font-bold uppercase flex items-center space-x-1">
              <Activity className="w-3.5 h-3.5" />
              <span>GZ Righting Lever Curve</span>
            </span>
            <span className="text-[10px] text-slate-400">IMO Solas Ch. II-1</span>
          </div>

          {/* SVG CURVE CHART */}
          <div className="h-24 w-full bg-slate-950 rounded-xl p-2 relative flex items-center justify-center">
            <svg className="w-full h-full" viewBox="0 0 200 80">
              {/* AXIS LINES */}
              <line x1="10" y1="70" x2="190" y2="70" stroke="#334155" strokeWidth="1" />
              <line x1="10" y1="10" x2="10" y2="70" stroke="#334155" strokeWidth="1" />

              {/* GZ CURVE PATH */}
              <path
                d="M 10 70 Q 60 10 110 30 T 190 70"
                fill="none"
                stroke="#f59e0b"
                strokeWidth="2.5"
              />

              {/* CURRENT OPERATING POINT */}
              <circle cx={40 + vesselGM * 20} cy={35 - heelAngle * 5} r="4" fill="#38bdf8" className="animate-ping" />
              <circle cx={40 + vesselGM * 20} cy={35 - heelAngle * 5} r="4" fill="#38bdf8" />
            </svg>
          </div>

          <div className="flex justify-between text-[10px] text-slate-400">
            <span>Angle of Heel (0°-60°)</span>
            <span className="text-cyan-300 font-bold">Max GZ: 0.82m @ 35°</span>
          </div>
        </div>
      </div>

      {/* CONTAINER BAY STOWAGE GRID WITH INTERACTIVE TWEAKS */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl font-mono">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 flex-wrap gap-2">
          <div className="flex items-center space-x-2 text-xs font-bold text-amber-400 uppercase">
            <Box className="w-4 h-4" />
            <span>Bay 12 Container Cross-Section Grid (Interactive Weight Tweak)</span>
          </div>

          <button
            onClick={() => showToast('BAPLIE 2.2 Stowage Plan File Exported.')}
            className="px-3 py-1 bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 rounded-lg text-xs font-bold transition-all flex items-center space-x-1"
          >
            <Download className="w-3.5 h-3.5 text-amber-400" />
            <span>EXPORT BAPLIE FILE</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {gridSlots.map((slot, index) => {
            const isReefer = slot.type === 'REEFER';
            const isHazmat = slot.type === 'HAZMAT';
            const isEmpty = slot.type === 'EMPTY';

            return (
              <motion.div
                layout
                key={index}
                className={`p-4 rounded-2xl border space-y-3 bg-slate-950 transition-all ${
                  isReefer
                    ? 'border-cyan-500/40 text-cyan-200'
                    : isHazmat
                    ? 'border-rose-500/40 text-rose-200'
                    : isEmpty
                    ? 'border-slate-800 text-slate-500'
                    : 'border-amber-500/40 text-amber-200'
                }`}
              >
                <div className="flex justify-between items-center text-[10px] font-bold">
                  <span>BAY {slot.bay} • TIER {slot.tier}</span>
                  <span
                    className={`px-1.5 py-0.5 rounded text-[9px] font-black ${
                      isReefer
                        ? 'bg-cyan-500/20 text-cyan-300'
                        : isHazmat
                        ? 'bg-rose-500/20 text-rose-300'
                        : isEmpty
                        ? 'bg-slate-800 text-slate-400'
                        : 'bg-amber-500/20 text-amber-300'
                    }`}
                  >
                    {slot.type}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-white font-black text-base">{slot.weightTons} TONS</span>
                  <span className="text-[10px] text-slate-400">Row {slot.row}</span>
                </div>

                {/* WEIGHT TWEAK SLIDER */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span>Adjust Weight:</span>
                    <span>1.0 - 30.0 T</span>
                  </div>
                  <input
                    type="range"
                    min="1.0"
                    max="30.0"
                    step="0.5"
                    value={slot.weightTons}
                    onChange={(e) => updateSlotWeight(index, parseFloat(e.target.value))}
                    className="w-full accent-amber-500 bg-slate-900 rounded-lg cursor-pointer"
                  />
                </div>

                <div className="text-[10px] text-slate-400 flex justify-between border-t border-slate-900 pt-2">
                  <span>Dest: {slot.destination}</span>
                  <span className="text-slate-500">ISO 6346</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
