import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Brain,
  Cpu,
  Layers,
  Sparkles,
  TrendingUp,
  BarChart2,
  CheckCircle2,
  Sliders,
  RefreshCw,
  Activity,
  Zap,
  Check,
  Globe,
  SlidersHorizontal,
  Compass
} from 'lucide-react';
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend
} from 'recharts';

interface AIModelConfig {
  id: string;
  name: string;
  developer: string;
  type: 'Neural Ensemble' | 'Physics Atmosphere' | 'Wave Hydrodynamics' | 'Deep Research LLM';
  accuracy: number;
  leadTimeHours: number;
  consensusWeight: number;
  status: 'Synced' | 'Calibrating' | 'Active';
}

const MODELS: AIModelConfig[] = [
  {
    id: 'M-01',
    name: 'Gemini 1.5 Pro Marine Engine',
    developer: 'Google DeepMind',
    type: 'Deep Research LLM',
    accuracy: 98.4,
    leadTimeHours: 96,
    consensusWeight: 35,
    status: 'Synced'
  },
  {
    id: 'M-02',
    name: 'ECMWF IFS High-Res Atmospheric',
    developer: 'European Weather Centre',
    type: 'Physics Atmosphere',
    accuracy: 94.2,
    leadTimeHours: 72,
    consensusWeight: 25,
    status: 'Synced'
  },
  {
    id: 'M-03',
    name: 'NOAA WaveWatch III & SWAN',
    developer: 'US National Weather Service',
    type: 'Wave Hydrodynamics',
    accuracy: 92.8,
    leadTimeHours: 48,
    consensusWeight: 20,
    status: 'Active'
  },
  {
    id: 'M-04',
    name: 'Claude 3.5 Sonnet Logistics Agent',
    developer: 'Anthropic AI',
    type: 'Neural Ensemble',
    accuracy: 96.1,
    leadTimeHours: 84,
    consensusWeight: 20,
    status: 'Synced'
  }
];

const RADAR_COMPARISON_DATA = [
  { metric: 'Cyclone Track', Gemini: 98, ECMWF: 94, WaveWatch: 88, Claude: 95 },
  { metric: 'Wave Height', Gemini: 92, ECMWF: 91, WaveWatch: 97, Claude: 90 },
  { metric: 'Port Dwell', Gemini: 96, ECMWF: 82, WaveWatch: 75, Claude: 97 },
  { metric: 'Engine Thermal', Gemini: 94, ECMWF: 78, WaveWatch: 70, Claude: 93 },
  { metric: 'Piracy Risk', Gemini: 97, ECMWF: 70, WaveWatch: 65, Claude: 96 },
  { metric: 'CII Carbon Compliance', Gemini: 95, ECMWF: 80, WaveWatch: 72, Claude: 98 }
];

export const MultiModelAnalyticsView: React.FC = () => {
  const [modelWeights, setModelWeights] = useState<{ [key: string]: number }>({
    'M-01': 35,
    'M-02': 25,
    'M-03': 20,
    'M-04': 20
  });
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSliderChange = (id: string, value: number) => {
    setModelWeights((prev) => ({ ...prev, [id]: value }));
  };

  const handleRunEnsembleSynthesis = () => {
    setIsSynthesizing(true);
    setTimeout(() => {
      setIsSynthesizing(false);
      showToast('Multi-model neural ensemble re-weighted & synthesized.');
    }, 1600);
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
            className="fixed top-20 right-6 z-50 px-4 py-3 bg-slate-900 border border-indigo-500 text-indigo-300 font-mono text-xs rounded-2xl shadow-2xl flex items-center space-x-2"
          >
            <Check className="w-4 h-4 text-indigo-400" />
            <span className="font-bold">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HEADER BANNER */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center space-x-2 text-indigo-400 font-bold text-xs uppercase tracking-wider mb-1 font-mono">
              <Brain className="w-4 h-4 text-indigo-400 animate-pulse" />
              <span>MULTI-MODEL AI ENSEMBLE & CROSS-PREDICTION ANALYTICS</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center space-x-2">
              <Cpu className="w-6 h-6 text-indigo-400" />
              <span>Multi-Model AI Analytics & Fusion Engine</span>
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl">
              Comparative prediction benchmarks fusing Gemini 1.5 Pro, ECMWF Atmospheric, NOAA SWAN Hydrodynamics, and Claude 3.5 Sonnet logistics intelligence.
            </p>
          </div>

          <button
            onClick={handleRunEnsembleSynthesis}
            disabled={isSynthesizing}
            className={`px-4 py-2.5 rounded-xl font-mono text-xs font-black flex items-center space-x-2 transition-all shadow-lg ${
              isSynthesizing
                ? 'bg-slate-800 text-slate-400 border border-slate-700'
                : 'bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-400 hover:to-cyan-400 text-slate-950 shadow-indigo-950/40'
            }`}
          >
            <RefreshCw className={`w-4 h-4 ${isSynthesizing ? 'animate-spin' : ''}`} />
            <span>{isSynthesizing ? 'SYNTHESIZING FUSION...' : 'SYNTHESIZE ENSEMBLE MODEL'}</span>
          </button>
        </div>
      </div>

      {/* KPI STATS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 font-mono text-xs">
        <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl space-y-1 shadow-lg">
          <span className="text-[10px] text-slate-400 uppercase font-bold block">ACTIVE AI MODELS IN FUSION</span>
          <strong className="text-2xl font-black text-white block">4 Models</strong>
          <span className="text-[10px] text-indigo-400 block">100% Real-Time Cross-Validating</span>
        </div>

        <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl space-y-1 shadow-lg">
          <span className="text-[10px] text-slate-400 uppercase font-bold block">ENSEMBLE CONSENSUS SCORE</span>
          <strong className="text-2xl font-black text-emerald-400 block">96.8%</strong>
          <span className="text-[10px] text-emerald-400 block">High confidence convergence</span>
        </div>

        <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl space-y-1 shadow-lg">
          <span className="text-[10px] text-slate-400 uppercase font-bold block">MAX ADVANCE LEAD TIME</span>
          <strong className="text-2xl font-black text-cyan-300 block">96 Hours</strong>
          <span className="text-[10px] text-cyan-400 block">Early storm trajectory warning</span>
        </div>

        <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl space-y-1 shadow-lg">
          <span className="text-[10px] text-slate-400 uppercase font-bold block">MODEL PREDICTION DEVIATION</span>
          <strong className="text-2xl font-black text-amber-300 block">±1.2%</strong>
          <span className="text-[10px] text-amber-400 block">Ultra-low variance across models</span>
        </div>
      </div>

      {/* RADAR & BENCHMARK CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 font-mono">
        {/* RADAR CHART */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h4 className="text-sm font-bold text-white uppercase flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span>Model Skill Benchmark Radar Comparison</span>
            </h4>
          </div>

          <div className="h-72 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={RADAR_COMPARISON_DATA}>
                <PolarGrid stroke="#334155" />
                <PolarAngleAxis dataKey="metric" stroke="#94a3b8" tick={{ fontSize: 10, fill: '#cbd5e1' }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#475569" />
                <Radar name="Gemini 1.5 Pro" dataKey="Gemini" stroke="#6366f1" fill="#6366f1" fillOpacity={0.3} />
                <Radar name="ECMWF" dataKey="ECMWF" stroke="#38bdf8" fill="#38bdf8" fillOpacity={0.2} />
                <Radar name="Claude 3.5" dataKey="Claude" stroke="#10b981" fill="#10b981" fillOpacity={0.2} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '11px', color: '#fff' }} />
                <Legend wrapperStyle={{ fontSize: '11px', color: '#94a3b8' }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ACCURACY COMPARISON BARS */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h4 className="text-sm font-bold text-white uppercase flex items-center space-x-2">
              <BarChart2 className="w-4 h-4 text-cyan-400" />
              <span>Historical Prediction Accuracy Score (%)</span>
            </h4>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MODELS} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" tick={{ fontSize: 9, fill: '#94a3b8' }} />
                <YAxis domain={[80, 100]} stroke="#64748b" tick={{ fontSize: 10, fill: '#94a3b8' }} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '11px', color: '#fff' }} />
                <Bar dataKey="accuracy" fill="#6366f1" name="Accuracy %" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* DYNAMIC WEIGHT TUNER */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl font-mono">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2 text-xs font-bold text-indigo-400 uppercase">
            <SlidersHorizontal className="w-4 h-4" />
            <span>Interactive Model Consensus Weight Tuner</span>
          </div>
          <span className="text-[10px] text-slate-400">Adjust weights to re-balance neural ensemble synthesis</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {MODELS.map((model) => (
            <div key={model.id} className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-2">
              <div className="flex justify-between items-center text-white font-bold text-xs">
                <span>{model.name}</span>
                <span className="text-indigo-400 font-mono text-sm">{modelWeights[model.id]}%</span>
              </div>
              <p className="text-[10px] text-slate-400">{model.developer} • {model.type}</p>
              <input
                type="range"
                min="0"
                max="50"
                value={modelWeights[model.id]}
                onChange={(e) => handleSliderChange(model.id, Number(e.target.value))}
                className="w-full accent-indigo-500 bg-slate-900"
              />
              <div className="flex justify-between text-[10px] text-slate-500 pt-1">
                <span>Lead: {model.leadTimeHours}h</span>
                <span>Acc: {model.accuracy}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
