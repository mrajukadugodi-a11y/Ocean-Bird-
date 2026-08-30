import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Play,
  RotateCcw,
  Sparkles,
  Trophy,
  Activity,
  Volume2,
  VolumeX,
  Radio,
  Flame,
  CheckCircle2,
  Zap,
  Ticket,
  Camera,
  Layers,
  Tv,
  Wifi,
  BarChart2,
  ChevronRight,
  ShieldCheck,
  RefreshCw
} from 'lucide-react';
import { hapticEngine } from '../../utils/hapticUtils';

export const AnimatedLiveDrawComponent: React.FC = () => {
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [drawnMainBalls, setDrawnMainBalls] = useState<number[]>([]);
  const [drawnPowerball, setDrawnPowerball] = useState<number | null>(null);
  const [activeStage, setActiveStage] = useState<'IDLE' | 'MIXING' | 'REVEALING' | 'COMPLETE'>('IDLE');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [cameraAngle, setCameraAngle] = useState<'MAIN_DOME' | 'CHUTE_CAM' | 'OVERHEAD'>('MAIN_DOME');
  const [airPressure, setAirPressure] = useState<number>(104.2);

  // User active test ticket slip for matching demo
  const userTicketSlip = {
    numbers: [7, 14, 21, 28, 42],
    powerball: 9
  };

  const audioCtxRef = useRef<AudioContext | null>(null);

  // Fluctuating pressure simulation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setAirPressure((prev) => {
        const delta = (Math.random() - 0.5) * 1.5;
        return parseFloat(Math.min(115, Math.max(95, prev + delta)).toFixed(1));
      });
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  const playPopSound = (freq = 440) => {
    if (!soundEnabled) return;
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.5, ctx.currentTime + 0.1);

      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.15);
    } catch (e) {
      // Audio fallback
    }
  };

  const playFanfareSound = () => {
    if (!soundEnabled) return;
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      const notes = [523.25, 659.25, 783.99, 1046.50];
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0.2, ctx.currentTime + idx * 0.1);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.1 + 0.4);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + idx * 0.1);
        osc.stop(ctx.currentTime + idx * 0.1 + 0.4);
      });
    } catch (e) {}
  };

  const handleStartDraw = () => {
    if (isDrawing) return;
    setIsDrawing(true);
    setDrawnMainBalls([]);
    setDrawnPowerball(null);
    setActiveStage('MIXING');
    hapticEngine.trigger('click');

    // Air mixing phase
    setTimeout(() => {
      setActiveStage('REVEALING');
      generateBallsSequence();
    }, 1500);
  };

  const generateBallsSequence = () => {
    const mainPool: number[] = [];
    while (mainPool.length < 5) {
      const r = Math.floor(Math.random() * 50) + 1;
      if (!mainPool.includes(r)) mainPool.push(r);
    }
    mainPool.sort((a, b) => a - b);
    const pb = Math.floor(Math.random() * 20) + 1;

    let idx = 0;
    const interval = setInterval(() => {
      if (idx < 5) {
        const ball = mainPool[idx];
        setDrawnMainBalls((prev) => [...prev, ball]);
        playPopSound(440 + idx * 80);
        hapticEngine.trigger('medium');
        idx++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setDrawnPowerball(pb);
          playPopSound(880);
          hapticEngine.trigger('success');
          setActiveStage('COMPLETE');
          setIsDrawing(false);
          playFanfareSound();
        }, 800);
      }
    }, 1100);
  };

  // Match counter
  const matchedMainCount = drawnMainBalls.filter((n) => userTicketSlip.numbers.includes(n)).length;
  const matchedPowerball = drawnPowerball === userTicketSlip.powerball;

  return (
    <div className="space-y-6 font-sans">
      {/* DRAW STATUS PULSE HEADER BAR */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 sm:p-5 font-mono shadow-2xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          {/* Pulsing Signal Radar Indicator */}
          <div className="relative flex items-center justify-center w-8 h-8 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 shadow-lg shadow-emerald-500/50" />
          </div>

          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-black text-white uppercase tracking-wider">
                SATCOM BROADCAST LIVE • DRAW #8940
              </span>
              <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[9px] font-black px-2 py-0.5 rounded-full uppercase animate-pulse">
                STATUS: {activeStage === 'IDLE' ? 'READY' : activeStage}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-sans">
              Inmarsat SatCom High Seas Sync • Latency: <span className="text-cyan-400 font-bold">24ms</span> • Air Pressure: <span className="text-amber-400 font-bold">{airPressure} PSI</span>
            </p>
          </div>
        </div>

        {/* Live Stage Progress Indicator Bar */}
        <div className="flex items-center space-x-2 bg-slate-950 p-2 rounded-2xl border border-slate-800 shrink-0 text-[10px]">
          {['IDLE', 'MIXING', 'REVEALING', 'COMPLETE'].map((stg, i) => {
            const isActive = activeStage === stg;
            const isDone = ['IDLE', 'MIXING', 'REVEALING', 'COMPLETE'].indexOf(activeStage) >= i;

            return (
              <div
                key={stg}
                className={`px-2.5 py-1 rounded-xl font-bold transition-all flex items-center space-x-1 ${
                  isActive
                    ? 'bg-emerald-500 text-slate-950 font-black shadow-lg shadow-emerald-500/20'
                    : isDone
                    ? 'bg-slate-900 text-slate-300 border border-slate-800'
                    : 'bg-slate-950 text-slate-600 border border-slate-900'
                }`}
              >
                <span>{stg}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Glass Dome Live Broadcast Stage */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-2xl space-y-6 font-mono">
        {/* Camera Angle Selector Toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-2">
            <Tv className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-black text-white uppercase">Live Broadcast Feed Feed</span>
          </div>

          <div className="flex items-center space-x-2 text-xs">
            <span className="text-slate-400 text-[11px] font-sans mr-1">Camera Feed:</span>
            {[
              { id: 'MAIN_DOME', label: 'Glass Chamber (Main)' },
              { id: 'CHUTE_CAM', label: 'Chute Drop Cam' },
              { id: 'OVERHEAD', label: 'Overhead SatCom' }
            ].map((cam) => (
              <button
                key={cam.id}
                onClick={() => {
                  setCameraAngle(cam.id as any);
                  hapticEngine.trigger('light');
                }}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all flex items-center space-x-1.5 ${
                  cameraAngle === cam.id
                    ? 'bg-cyan-500 text-slate-950 font-black shadow-lg'
                    : 'bg-slate-950 text-slate-400 border border-slate-800 hover:border-slate-700'
                }`}
              >
                <Camera className="w-3 h-3" />
                <span>{cam.label}</span>
              </button>
            ))}

            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="p-2 bg-slate-950 border border-slate-800 hover:bg-slate-800 rounded-xl text-slate-300 transition-all ml-2"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
            </button>
          </div>
        </div>

        {/* Live Broadcast Viewport */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Animated Glass Dome / Chute Viewport */}
          <div className="relative flex flex-col items-center justify-center p-6 bg-slate-950/80 rounded-3xl border border-slate-800 overflow-hidden min-h-[340px]">
            {/* TV Scanlines Overlay Effect */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] pointer-events-none opacity-40" />

            {/* Camera angle view switch */}
            {cameraAngle === 'MAIN_DOME' && (
              <div className="w-64 h-64 sm:w-72 sm:h-72 rounded-full border-4 border-slate-700/80 bg-gradient-to-b from-slate-900/60 via-cyan-950/30 to-slate-950/90 shadow-2xl relative flex items-center justify-center overflow-hidden backdrop-blur-md">
                <div className="absolute top-4 left-6 w-32 h-16 bg-white/10 rounded-full blur-sm rotate-[-30deg]" />

                {/* Animated Mixing Balls with Air Jets */}
                <div className="relative w-full h-full flex items-center justify-center">
                  {Array.from({ length: 16 }).map((_, i) => (
                    <motion.div
                      key={i}
                      animate={
                        activeStage === 'MIXING' || activeStage === 'REVEALING'
                          ? {
                              x: [Math.sin(i) * 90, Math.cos(i) * -80, Math.sin(i * 2) * 70],
                              y: [Math.cos(i) * 90, Math.sin(i) * -70, Math.cos(i * 2) * 80],
                              scale: [1, 1.2, 0.9, 1],
                              rotate: [0, 180, 360]
                            }
                          : { y: [0, -6, 0] }
                      }
                      transition={{
                        duration: activeStage === 'MIXING' ? 0.5 + (i % 5) * 0.1 : 2.5,
                        repeat: Infinity,
                        ease: 'easeInOut'
                      }}
                      className={`absolute w-8 h-8 rounded-full font-black text-xs flex items-center justify-center shadow-xl border border-white/30 select-none ${
                        i % 4 === 0
                          ? 'bg-amber-400 text-slate-950 shadow-amber-400/30'
                          : i % 4 === 1
                          ? 'bg-emerald-400 text-slate-950 shadow-emerald-400/30'
                          : i % 4 === 2
                          ? 'bg-cyan-400 text-slate-950 shadow-cyan-400/30'
                          : 'bg-rose-500 text-white shadow-rose-500/30'
                      }`}
                    >
                      {((i * 7) % 49) + 1}
                    </motion.div>
                  ))}
                </div>

                <div className="absolute bottom-2 w-32 h-8 bg-slate-800 rounded-t-2xl border-t border-slate-700 flex items-center justify-center">
                  <div className={`w-16 h-2 bg-emerald-400 rounded-full ${activeStage !== 'IDLE' ? 'animate-ping' : ''}`} />
                </div>
              </div>
            )}

            {cameraAngle === 'CHUTE_CAM' && (
              <div className="w-full h-64 flex flex-col items-center justify-center space-y-4">
                <span className="text-xs font-bold text-cyan-400 uppercase">High-Speed Chute Camera Active</span>
                <div className="w-20 h-48 border-2 border-dashed border-cyan-500/50 rounded-3xl p-2 flex flex-col justify-end items-center bg-cyan-950/20">
                  <AnimatePresence>
                    {drawnMainBalls.slice(-1).map((ball) => (
                      <motion.div
                        key={ball}
                        initial={{ y: -120, scale: 0 }}
                        animate={{ y: 0, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-300 to-amber-600 text-slate-950 font-black text-lg flex items-center justify-center shadow-2xl border-2 border-amber-200"
                      >
                        {ball}
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            )}

            {cameraAngle === 'OVERHEAD' && (
              <div className="w-full h-64 flex flex-col items-center justify-center space-y-3 font-mono">
                <Radio className="w-8 h-8 text-emerald-400 animate-pulse" />
                <span className="text-xs font-bold text-white uppercase">Inmarsat High Seas Overhead Telemetry</span>
                <p className="text-[10px] text-slate-400 text-center max-w-xs">
                  SatCom GPS Coordinates: 24°14'N 77°32'W (High Seas International Waters) • Provably Fair Hash Seed Verified
                </p>
              </div>
            )}

            {/* Start Draw Action Trigger Button */}
            <div className="mt-6 flex items-center space-x-3 z-10">
              <button
                onClick={handleStartDraw}
                disabled={isDrawing}
                className="bg-gradient-to-r from-emerald-400 via-emerald-500 to-cyan-500 hover:from-emerald-300 hover:to-cyan-400 text-slate-950 font-black px-6 py-3.5 rounded-2xl text-xs transition-all flex items-center space-x-2 shadow-xl shadow-emerald-500/20 disabled:opacity-50"
              >
                {isDrawing ? (
                  <>
                    <Zap className="w-4 h-4 animate-spin text-slate-950" />
                    <span>Pneumatic Blower Active...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-slate-950" />
                    <span>Trigger Live Pneumatic Draw</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Drawn Numbers & Active Matcher Dashboard */}
          <div className="space-y-6 bg-slate-950 p-6 sm:p-8 rounded-3xl border border-slate-800">
            <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
              <h3 className="text-sm font-black text-white uppercase flex items-center space-x-2">
                <Trophy className="w-4 h-4 text-amber-400" />
                <span>Collection Chute Ledger</span>
              </h3>
              <span className="text-xs text-slate-400 font-bold">
                Pool: <span className="text-emerald-400 font-black">$3,850,000 $OD</span>
              </span>
            </div>

            {/* Dropped Main Balls */}
            <div className="space-y-3">
              <span className="text-xs font-bold text-slate-400 block uppercase">Main Drawn Balls (5):</span>
              <div className="flex items-center space-x-3 min-h-[56px] p-2 bg-slate-900 rounded-2xl border border-slate-800 overflow-x-auto">
                <AnimatePresence>
                  {drawnMainBalls.map((num, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0, y: -30 }}
                      animate={{ scale: 1, y: 0 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                      className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-300 via-amber-400 to-amber-600 text-slate-950 font-black text-sm flex items-center justify-center shadow-lg border-2 border-amber-200 shrink-0"
                    >
                      {num < 10 ? `0${num}` : num}
                    </motion.div>
                  ))}
                </AnimatePresence>
                {drawnMainBalls.length < 5 && (
                  <span className="text-xs text-slate-600 italic px-2">
                    Waiting for balls ({drawnMainBalls.length}/5)...
                  </span>
                )}
              </div>
            </div>

            {/* Coral Powerball */}
            <div className="space-y-3">
              <span className="text-xs font-bold text-slate-400 block uppercase">Coral Powerball (1):</span>
              <div className="min-h-[56px] p-2 bg-slate-900 rounded-2xl border border-slate-800 flex items-center space-x-3">
                {drawnPowerball ? (
                  <motion.div
                    initial={{ scale: 0, rotate: 180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    className="w-11 h-11 rounded-2xl bg-gradient-to-br from-rose-500 via-rose-600 to-rose-700 text-white font-black text-sm flex items-center justify-center shadow-lg border-2 border-rose-400"
                  >
                    {drawnPowerball < 10 ? `0${drawnPowerball}` : drawnPowerball}
                  </motion.div>
                ) : (
                  <span className="text-xs text-slate-600 italic px-2">Awaiting final powerball reveal...</span>
                )}
              </div>
            </div>

            {/* Active User Slip Live Matcher */}
            <div className="pt-4 border-t border-slate-800 space-y-3 font-sans">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400 font-bold flex items-center space-x-1.5">
                  <Ticket className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Active Slip Matcher:</span>
                </span>
                <span className="text-emerald-400 font-black">
                  {matchedMainCount} Balls + {matchedPowerball ? '1 PB' : '0 PB'} Matched
                </span>
              </div>

              <div className="flex items-center space-x-2 bg-slate-900 p-3 rounded-2xl border border-slate-800">
                {userTicketSlip.numbers.map((n) => {
                  const isHit = drawnMainBalls.includes(n);
                  return (
                    <span
                      key={n}
                      className={`w-8 h-8 rounded-xl font-mono text-xs font-bold flex items-center justify-center border transition-all ${
                        isHit
                          ? 'bg-emerald-500 text-slate-950 font-black border-emerald-300 shadow-lg shadow-emerald-500/30'
                          : 'bg-slate-950 text-slate-400 border-slate-800'
                      }`}
                    >
                      {n}
                    </span>
                  );
                })}
                <span className="text-slate-600 font-bold">+</span>
                <span
                  className={`w-8 h-8 rounded-xl font-mono text-xs font-bold flex items-center justify-center border transition-all ${
                    matchedPowerball
                      ? 'bg-rose-500 text-white font-black border-rose-300 shadow-lg shadow-rose-500/30'
                      : 'bg-slate-950 text-slate-400 border-slate-800'
                  }`}
                >
                  {userTicketSlip.powerball}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
