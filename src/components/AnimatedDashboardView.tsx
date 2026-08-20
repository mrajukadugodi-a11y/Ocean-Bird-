import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  Activity,
  Globe,
  Radio,
  Siren,
  ShieldCheck,
  TrendingUp,
  Truck,
  Building2,
  Brain,
  Clock,
  FileCheck,
  CheckCircle2,
  AlertTriangle,
  Zap,
  Volume2,
  VolumeX,
  Compass,
  Ship,
  Check,
  Layers,
  BarChart2,
  QrCode,
  MapPin,
  Box
} from 'lucide-react';

interface AnimatedDashboardProps {
  onNavigateTab: (tabId: string) => void;
}

export const AnimatedDashboardView: React.FC<AnimatedDashboardProps> = ({ onNavigateTab }) => {
  const [isMuted, setIsMuted] = useState(true);
  const [pulseCount, setPulseCount] = useState(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulseCount((prev) => (prev + 1) % 100);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
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

      {/* HERO ANIMATED RADAR BANNER */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl relative overflow-hidden"
      >
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none animate-pulse" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none animate-pulse" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-mono font-black bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                <span className="w-2 h-2 rounded-full bg-cyan-400 mr-2 animate-ping" />
                LIVE RADAR TELEMETRY ACTIVE
              </span>
              <span className="text-slate-400 font-mono text-xs">UTC {new Date().toISOString().substring(11, 19)}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center space-x-3">
              <Sparkles className="w-7 h-7 text-cyan-400" />
              <span>Animated Master Command & Radar Dashboard</span>
            </h2>

            <p className="text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
              Real-time multi-dimensional maritime intelligence combining live storm tracking, TEU container supply chain telemetry, crisis drill simulations, and IMO compliance audits.
            </p>
          </div>

          {/* PULSING RADAR ANIMATION */}
          <div className="flex items-center space-x-4">
            <div className="relative w-28 h-28 bg-slate-950 border border-cyan-500/30 rounded-full flex items-center justify-center overflow-hidden shadow-inner shrink-0">
              {/* RADAR SWEEP LINE */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
                className="absolute w-full h-full border-r border-cyan-400/80 bg-gradient-to-r from-transparent via-cyan-500/10 to-cyan-500/20 origin-center"
              />
              <div className="absolute w-20 h-20 border border-slate-800 rounded-full" />
              <div className="absolute w-12 h-12 border border-slate-800 rounded-full" />
              <Compass className="w-6 h-6 text-cyan-400 relative z-10 animate-pulse" />
              <div className="absolute top-6 right-8 w-2 h-2 bg-rose-500 rounded-full animate-ping" />
              <div className="absolute bottom-6 left-8 w-2 h-2 bg-emerald-400 rounded-full animate-ping" />
            </div>

            <button
              onClick={() => {
                setIsMuted(!isMuted);
                showToast(isMuted ? 'Telemetry alert audio enabled.' : 'Telemetry alert audio muted.');
              }}
              className="p-3 bg-slate-950 border border-slate-800 hover:border-slate-700 rounded-2xl text-slate-300 hover:text-white transition-all shadow-lg"
              title={isMuted ? 'Unmute Alarms' : 'Mute Alarms'}
            >
              {isMuted ? <VolumeX className="w-5 h-5 text-slate-400" /> : <Volume2 className="w-5 h-5 text-cyan-400 animate-bounce" />}
            </button>
          </div>
        </div>
      </motion.div>

      {/* DYNAMIC ANIMATED METRIC COUNTERS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-xs">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-2 shadow-xl relative overflow-hidden"
        >
          <div className="flex justify-between items-center text-slate-400 text-[10px] uppercase font-bold">
            <span>ACTIVE FLEET TELEMETRY</span>
            <Ship className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-3xl font-black text-white">{1420 + (pulseCount % 12)} Vessels</div>
          <div className="text-[10px] text-emerald-400 flex items-center space-x-1">
            <TrendingUp className="w-3 h-3" />
            <span>+99.8% AIS Signal Retention</span>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-2 shadow-xl relative overflow-hidden"
        >
          <div className="flex justify-between items-center text-slate-400 text-[10px] uppercase font-bold">
            <span>ACTIVE CYCLONE WARNINGS</span>
            <Siren className="w-4 h-4 text-rose-400 animate-pulse" />
          </div>
          <div className="text-3xl font-black text-rose-400">2 Critical Storms</div>
          <div className="text-[10px] text-amber-300 flex items-center space-x-1">
            <AlertTriangle className="w-3 h-3" />
            <span>Bay of Bengal Cat-4 Landfall</span>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-2 shadow-xl relative overflow-hidden"
        >
          <div className="flex justify-between items-center text-slate-400 text-[10px] uppercase font-bold">
            <span>AI MODEL CONSENSUS</span>
            <Brain className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-3xl font-black text-indigo-300">96.8% Accuracy</div>
          <div className="text-[10px] text-indigo-400 flex items-center space-x-1">
            <Zap className="w-3 h-3" />
            <span>4 Neural Models Synthesized</span>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-2 shadow-xl relative overflow-hidden"
        >
          <div className="flex justify-between items-center text-slate-400 text-[10px] uppercase font-bold">
            <span>IMO REGULATORY SHIELD</span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-black text-emerald-400">98.4% Passed</div>
          <div className="text-[10px] text-emerald-300 flex items-center space-x-1">
            <CheckCircle2 className="w-3 h-3" />
            <span>CII Rating B Compliant</span>
          </div>
        </motion.div>
      </div>

      {/* QUICK ACCESS ANIMATED SUB-MODULE NAVIGATOR */}
      <div className="space-y-3 font-mono">
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center space-x-2">
          <Layers className="w-4 h-4 text-cyan-400" />
          <span>Master System Navigation & Operational Enclaves</span>
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              id: 'qr-check-in',
              title: 'Smart QR Terminal Check-In',
              desc: 'STCW seafarer shore pass & container seal QR scanner',
              icon: QrCode,
              color: 'text-cyan-400',
              border: 'hover:border-cyan-500/50'
            },
            {
              id: 'smart-load-planner',
              title: 'Smart Load & Stowage Planner',
              desc: 'Visual container bay grid & GM stability optimization',
              icon: Box,
              color: 'text-amber-400',
              border: 'hover:border-amber-500/50'
            },
            {
              id: 'interactive-port-map',
              title: 'Interactive Port Terminal Map',
              desc: 'Berth occupancy, crane moves/hr & depth soundings',
              icon: MapPin,
              color: 'text-emerald-400',
              border: 'hover:border-emerald-500/50'
            },
            {
              id: 'emergency-sos-pulse',
              title: 'Emergency SOS Pulse',
              desc: 'Pulsing Mayday distress signal & MRCC telemetry',
              icon: Siren,
              color: 'text-rose-400',
              border: 'hover:border-rose-500/50'
            },
            {
              id: 'smart-supply-chain',
              title: 'Smart Supply Chain',
              desc: 'Container tracking, reefer sensors & AI bypass dispatch',
              icon: Truck,
              color: 'text-amber-400',
              border: 'hover:border-amber-500/50'
            },
            {
              id: 'crisis-simulation',
              title: 'Crisis Simulation',
              desc: 'Interactive disaster drill engine & tactical response',
              icon: Siren,
              color: 'text-rose-400',
              border: 'hover:border-rose-500/50'
            },
            {
              id: 'industry-auth-bridge',
              title: 'Industry Auth Bridge',
              desc: 'IMO vessel ID, Port OAuth2 & FIDO2 passkeys',
              icon: ShieldCheck,
              color: 'text-cyan-400',
              border: 'hover:border-cyan-500/50'
            },
            {
              id: 'global-utility-forecast',
              title: 'Global Utility Forecast',
              desc: 'Shore power grid load, LNG prices & water stocks',
              icon: Building2,
              color: 'text-emerald-400',
              border: 'hover:border-emerald-500/50'
            },
            {
              id: 'multi-model-analytics',
              title: 'Multi-Model AI Analytics',
              desc: 'Gemini 1.5, ECMWF & Claude neural benchmarks',
              icon: Brain,
              color: 'text-indigo-400',
              border: 'hover:border-indigo-500/50'
            },
            {
              id: 'predictive-alert-history',
              title: 'Predictive Alert History',
              desc: 'Historical post-event landfall accuracy verification',
              icon: Clock,
              color: 'text-blue-400',
              border: 'hover:border-blue-500/50'
            },
            {
              id: 'automated-regulation-check',
              title: 'Automated Regulation Check',
              desc: 'IMO CII rating, MARPOL Annex VI & EU ETS audits',
              icon: FileCheck,
              color: 'text-emerald-400',
              border: 'hover:border-emerald-500/50'
            },
            {
              id: 'cloud-dashboard',
              title: 'Structured Menu Hub',
              desc: 'Full directory of all 24+ specialized modules',
              icon: Layers,
              color: 'text-slate-300',
              border: 'hover:border-slate-600'
            }
          ].map((item) => {
            const IconComponent = item.icon;
            return (
              <motion.div
                key={item.id}
                whileHover={{ y: -4, scale: 1.02 }}
                onClick={() => onNavigateTab(item.id)}
                className={`p-5 rounded-2xl border border-slate-800 bg-slate-900 ${item.border} cursor-pointer transition-all shadow-xl space-y-2 group`}
              >
                <div className="flex items-center justify-between">
                  <IconComponent className={`w-6 h-6 ${item.color} group-hover:scale-110 transition-transform`} />
                  <span className="text-[10px] text-slate-500 font-bold group-hover:text-white transition-colors">LAUNCH →</span>
                </div>
                <h5 className="font-bold text-white text-sm leading-snug">{item.title}</h5>
                <p className="text-[11px] text-slate-400 font-sans leading-snug">{item.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
