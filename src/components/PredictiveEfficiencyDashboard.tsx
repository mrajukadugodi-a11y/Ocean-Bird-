import React, { useState, useMemo } from 'react';
import {
  TrendingUp,
  TrendingDown,
  Wrench,
  Flame,
  Users,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Zap,
  Activity,
  Sliders,
  Sparkles,
  Download,
  Printer,
  RefreshCw,
  Info,
  ChevronRight,
  ShieldAlert,
  BarChart3,
  SlidersHorizontal,
  Bot,
  Ship,
  HardDrive,
  Calendar,
  Filter,
  CheckSquare
} from 'lucide-react';
import { hapticEngine } from '../utils/hapticUtils';

// ==========================================
// TYPES & INTERFACES
// ==========================================

export type TimeframeHorizon = '24H' | '7D' | '30D' | '90D';

export interface SparklinePoint {
  timeLabel: string;
  value: number;
  isForecast?: boolean;
}

export interface MaintenanceForecastItem {
  id: string;
  component: string;
  vessel: string;
  subsystem: string;
  rulHours: number;
  rulDays: number;
  predictedFailureDate: string;
  riskSeverity: 'CRITICAL' | 'WARNING' | 'LOW';
  confidenceScore: number;
  wearSparklineData: SparklinePoint[];
  recommendedAction: string;
  partsInStock: boolean;
  estimatedOverhaulCostUSD: number;
}

export interface FuelTrendForecastItem {
  id: string;
  fuelType: 'VLSFO' | 'MGO' | 'LNG_DUAL';
  vessel: string;
  currentBurnRateMTDay: number;
  projectedBurnRateMTDay: number;
  savingsVsBaselineMTDay: number;
  financialSavingsUSD: number;
  sparklineData: SparklinePoint[];
  confidenceUpper: SparklinePoint[];
  confidenceLower: SparklinePoint[];
  optimizationsApplied: string[];
}

export interface CrewWorkloadForecastItem {
  id: string;
  department: 'Deck Officers' | 'Engine Room Engineers' | 'Catering & Safety Crew' | 'Navigational Watch';
  vessel: string;
  currentFatigueIndex: number; // 0 to 100
  projectedPeakFatigueIndex: number;
  stcwViolationRisk: 'HIGH' | 'MODERATE' | 'NONE';
  peakRestDeficitDay: string;
  workloadSparklineData: SparklinePoint[];
  aiMitigationStrategy: string;
  activeShiftCount: number;
}

// ==========================================
// DYNAMIC SPARKLINE SVG COMPONENT
// ==========================================

interface DynamicSparklineProps {
  data: SparklinePoint[];
  color?: string; // hex or tailwind stroke
  gradientId: string;
  height?: number;
  width?: number;
  unit?: string;
  targetLineValue?: number;
  targetLineLabel?: string;
  showForecastDivider?: boolean;
}

export const DynamicSparkline: React.FC<DynamicSparklineProps> = ({
  data,
  color = '#06b6d4',
  gradientId,
  height = 60,
  width = 240,
  unit = '',
  targetLineValue,
  targetLineLabel,
  showForecastDivider = true,
}) => {
  const [hoveredPoint, setHoveredPoint] = useState<SparklinePoint | null>(null);

  if (!data || data.length === 0) return null;

  const padding = 8;
  const usableWidth = width - padding * 2;
  const usableHeight = height - padding * 2;

  const values = data.map((d) => d.value);
  const minValue = Math.min(...values, targetLineValue ?? Infinity);
  const maxValue = Math.max(...values, targetLineValue ?? -Infinity);
  const range = maxValue - minValue || 1;

  // Calculate coordinates
  const points = data.map((d, index) => {
    const x = padding + (index / (data.length - 1)) * usableWidth;
    const y = height - padding - ((d.value - minValue) / range) * usableHeight;
    return { x, y, point: d };
  });

  // Split historical vs forecast divider index
  const forecastStartIndex = data.findIndex((d) => d.isForecast);

  // Generate SVG path string
  const pathD = points.reduce((acc, pt, idx) => {
    return idx === 0 ? `M ${pt.x} ${pt.y}` : `${acc} L ${pt.x} ${pt.y}`;
  }, '');

  // Area path for gradient fill
  const areaD = `${pathD} L ${points[points.length - 1].x} ${height - padding} L ${points[0].x} ${height - padding} Z`;

  // Target line Y coordinate
  const targetY =
    targetLineValue !== undefined
      ? height - padding - ((targetLineValue - minValue) / range) * usableHeight
      : null;

  return (
    <div className="relative inline-block w-full">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-auto overflow-visible select-none"
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.35} />
            <stop offset="100%" stopColor={color} stopOpacity={0.0} />
          </linearGradient>
        </defs>

        {/* Target Threshold Line */}
        {targetY !== null && (
          <g>
            <line
              x1={padding}
              y1={targetY}
              x2={width - padding}
              y2={targetY}
              stroke="#f43f5e"
              strokeDasharray="3 3"
              strokeWidth="1"
              strokeOpacity="0.7"
            />
            {targetLineLabel && (
              <text
                x={width - padding - 2}
                y={targetY - 3}
                fill="#f43f5e"
                fontSize="8"
                fontWeight="bold"
                textAnchor="end"
              >
                {targetLineLabel}
              </text>
            )}
          </g>
        )}

        {/* Area Fill */}
        <path d={areaD} fill={`url(#${gradientId})`} />

        {/* Historical Line (Solid) */}
        <path
          d={pathD}
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Forecast Vertical Line Divider */}
        {showForecastDivider && forecastStartIndex > 0 && (
          <g>
            <line
              x1={points[forecastStartIndex].x}
              y1={padding}
              x2={points[forecastStartIndex].x}
              y2={height - padding}
              stroke="#6366f1"
              strokeDasharray="2 2"
              strokeWidth="1.2"
            />
            <text
              x={points[forecastStartIndex].x + 3}
              y={padding + 8}
              fill="#818cf8"
              fontSize="7"
              fontWeight="900"
            >
              FORECAST
            </text>
          </g>
        )}

        {/* Data Dots */}
        {points.map((pt, idx) => {
          const isLast = idx === points.length - 1;
          const isForecast = pt.point.isForecast;

          return (
            <circle
              key={idx}
              cx={pt.x}
              cy={pt.y}
              r={isLast ? 3.5 : 2}
              fill={isLast ? color : isForecast ? '#818cf8' : color}
              stroke="#020617"
              strokeWidth="1"
              className={`cursor-pointer transition-all ${
                isLast ? 'animate-pulse' : 'hover:r-4'
              }`}
              onMouseEnter={() => setHoveredPoint(pt.point)}
              onMouseLeave={() => setHoveredPoint(null)}
            />
          );
        })}
      </svg>

      {/* Hover Tooltip */}
      {hoveredPoint && (
        <div className="absolute top-0 right-0 bg-slate-950 border border-slate-700 text-slate-100 text-[10px] px-2 py-1 rounded-md shadow-xl pointer-events-none z-20 flex items-center space-x-1.5">
          <span className="text-slate-400">{hoveredPoint.timeLabel}:</span>
          <strong className="text-cyan-400">
            {hoveredPoint.value} {unit}
          </strong>
          {hoveredPoint.isForecast && (
            <span className="text-[8px] bg-indigo-950 text-indigo-300 border border-indigo-800 px-1 rounded font-bold">
              AI Forecast
            </span>
          )}
        </div>
      )}
    </div>
  );
};

// ==========================================
// MOCK PREDICTIVE DATASET
// ==========================================

const MOCK_MAINTENANCE_FORECASTS: MaintenanceForecastItem[] = [
  {
    id: 'MNT-FX-101',
    component: 'Main Engine Cylinder #4 Liner',
    vessel: 'ULCV Ocean Titan',
    subsystem: 'Main Engine Propulsion',
    rulHours: 288,
    rulDays: 12,
    predictedFailureDate: 'Aug 18, 2026',
    riskSeverity: 'CRITICAL',
    confidenceScore: 98.6,
    recommendedAction: 'Order liner seal overhaul kit to Singapore Berth #4. Schedule 6-hour thermal cooling window.',
    partsInStock: true,
    estimatedOverhaulCostUSD: 14500,
    wearSparklineData: [
      { timeLabel: 'Day -10', value: 12 },
      { timeLabel: 'Day -8', value: 15 },
      { timeLabel: 'Day -6', value: 21 },
      { timeLabel: 'Day -4', value: 28 },
      { timeLabel: 'Day -2', value: 36 },
      { timeLabel: 'Today', value: 48 },
      { timeLabel: 'Day +3', value: 62, isForecast: true },
      { timeLabel: 'Day +6', value: 76, isForecast: true },
      { timeLabel: 'Day +9', value: 89, isForecast: true },
      { timeLabel: 'Day +12', value: 98, isForecast: true }
    ]
  },
  {
    id: 'MNT-FX-102',
    component: 'Auxiliary GenSet #2 Lube Oil Filter',
    vessel: 'Container Carrier Sea Voyager',
    subsystem: 'Auxiliary Power Grid',
    rulHours: 96,
    rulDays: 4,
    predictedFailureDate: 'Aug 10, 2026',
    riskSeverity: 'WARNING',
    confidenceScore: 99.1,
    recommendedAction: 'Engage valve crossover to Aux GenSet #1; trigger auto-cleaning cycle on Filter #2.',
    partsInStock: true,
    estimatedOverhaulCostUSD: 1800,
    wearSparklineData: [
      { timeLabel: 'Day -10', value: 3.2 },
      { timeLabel: 'Day -8', value: 3.4 },
      { timeLabel: 'Day -6', value: 3.6 },
      { timeLabel: 'Day -4', value: 3.9 },
      { timeLabel: 'Day -2', value: 4.1 },
      { timeLabel: 'Today', value: 4.3 },
      { timeLabel: 'Day +1', value: 4.5, isForecast: true },
      { timeLabel: 'Day +2', value: 4.7, isForecast: true },
      { timeLabel: 'Day +3', value: 4.9, isForecast: true },
      { timeLabel: 'Day +4', value: 5.2, isForecast: true }
    ]
  },
  {
    id: 'MNT-FX-103',
    component: 'Turbocharger #1 Bearing Hydro-Pack',
    vessel: 'Bunker Hub Malacca Pioneer',
    subsystem: 'Exhaust Scavenge Air',
    rulHours: 672,
    rulDays: 28,
    predictedFailureDate: 'Sep 03, 2026',
    riskSeverity: 'LOW',
    confidenceScore: 96.4,
    recommendedAction: 'Monitor 24/7 vibration frequency spectrum. Perform bearing clearance calibration during routine port stop.',
    partsInStock: false,
    estimatedOverhaulCostUSD: 8200,
    wearSparklineData: [
      { timeLabel: 'Day -10', value: 0.8 },
      { timeLabel: 'Day -8', value: 0.9 },
      { timeLabel: 'Day -6', value: 0.9 },
      { timeLabel: 'Day -4', value: 1.0 },
      { timeLabel: 'Day -2', value: 1.1 },
      { timeLabel: 'Today', value: 1.2 },
      { timeLabel: 'Day +7', value: 1.4, isForecast: true },
      { timeLabel: 'Day +14', value: 1.6, isForecast: true },
      { timeLabel: 'Day +21', value: 1.8, isForecast: true },
      { timeLabel: 'Day +28', value: 2.1, isForecast: true }
    ]
  }
];

const MOCK_FUEL_TREND_FORECASTS: FuelTrendForecastItem[] = [
  {
    id: 'FUL-FX-201',
    fuelType: 'VLSFO',
    vessel: 'ULCV Ocean Titan',
    currentBurnRateMTDay: 28.5,
    projectedBurnRateMTDay: 26.2,
    savingsVsBaselineMTDay: 2.3,
    financialSavingsUSD: 17480,
    optimizationsApplied: ['Propeller Pitch Trim -0.4°', 'Scavenge Air Bypass 12%', 'Neural Route Swell Deviation'],
    sparklineData: [
      { timeLabel: 'Day -10', value: 31.2 },
      { timeLabel: 'Day -8', value: 30.5 },
      { timeLabel: 'Day -6', value: 29.8 },
      { timeLabel: 'Day -4', value: 29.1 },
      { timeLabel: 'Day -2', value: 28.8 },
      { timeLabel: 'Today', value: 28.5 },
      { timeLabel: 'Day +3', value: 27.8, isForecast: true },
      { timeLabel: 'Day +6', value: 27.1, isForecast: true },
      { timeLabel: 'Day +9', value: 26.5, isForecast: true },
      { timeLabel: 'Day +12', value: 26.2, isForecast: true }
    ],
    confidenceUpper: [],
    confidenceLower: []
  },
  {
    id: 'FUL-FX-202',
    fuelType: 'MGO',
    vessel: 'Container Carrier Sea Voyager',
    currentBurnRateMTDay: 14.2,
    projectedBurnRateMTDay: 12.8,
    savingsVsBaselineMTDay: 1.4,
    financialSavingsUSD: 11200,
    optimizationsApplied: ['Auxiliary Grid Load Shedding 8%', 'Eco-Sailing Engine Timing'],
    sparklineData: [
      { timeLabel: 'Day -10', value: 15.8 },
      { timeLabel: 'Day -8', value: 15.2 },
      { timeLabel: 'Day -6', value: 14.9 },
      { timeLabel: 'Day -4', value: 14.5 },
      { timeLabel: 'Day -2', value: 14.3 },
      { timeLabel: 'Today', value: 14.2 },
      { timeLabel: 'Day +3', value: 13.8, isForecast: true },
      { timeLabel: 'Day +6', value: 13.4, isForecast: true },
      { timeLabel: 'Day +9', value: 13.0, isForecast: true },
      { timeLabel: 'Day +12', value: 12.8, isForecast: true }
    ],
    confidenceUpper: [],
    confidenceLower: []
  }
];

const MOCK_CREW_WORKLOAD_FORECASTS: CrewWorkloadForecastItem[] = [
  {
    id: 'CRW-FX-301',
    department: 'Deck Officers',
    vessel: 'ULCV Ocean Titan',
    currentFatigueIndex: 42,
    projectedPeakFatigueIndex: 78,
    stcwViolationRisk: 'MODERATE',
    peakRestDeficitDay: 'Aug 12, 2026 (Port Approach Malacca)',
    activeShiftCount: 6,
    aiMitigationStrategy: 'Auto-reassign 2 Assistant Officers from Port Watchkeeping to Navigational Bridge Shift.',
    workloadSparklineData: [
      { timeLabel: 'Day -5', value: 35 },
      { timeLabel: 'Day -3', value: 38 },
      { timeLabel: 'Day -1', value: 40 },
      { timeLabel: 'Today', value: 42 },
      { timeLabel: 'Day +2', value: 58, isForecast: true },
      { timeLabel: 'Day +4', value: 78, isForecast: true },
      { timeLabel: 'Day +6', value: 65, isForecast: true },
      { timeLabel: 'Day +8', value: 45, isForecast: true }
    ]
  },
  {
    id: 'CRW-FX-302',
    department: 'Engine Room Engineers',
    vessel: 'Container Carrier Sea Voyager',
    currentFatigueIndex: 58,
    projectedPeakFatigueIndex: 86,
    stcwViolationRisk: 'HIGH',
    peakRestDeficitDay: 'Aug 10, 2026 (Aux GenSet Overhaul)',
    activeShiftCount: 8,
    aiMitigationStrategy: 'Deploy Super Master AI Automated Inspection Sub-Agent to perform 80% of routine sensor checks.',
    workloadSparklineData: [
      { timeLabel: 'Day -5', value: 48 },
      { timeLabel: 'Day -3', value: 52 },
      { timeLabel: 'Day -1', value: 55 },
      { timeLabel: 'Today', value: 58 },
      { timeLabel: 'Day +2', value: 72, isForecast: true },
      { timeLabel: 'Day +4', value: 86, isForecast: true },
      { timeLabel: 'Day +6', value: 60, isForecast: true },
      { timeLabel: 'Day +8', value: 50, isForecast: true }
    ]
  }
];

// ==========================================
// MAIN DASHBOARD COMPONENT
// ==========================================

export const PredictiveEfficiencyDashboard: React.FC = () => {
  const [horizon, setHorizon] = useState<TimeframeHorizon>('30D');
  const [selectedVessel, setSelectedVessel] = useState<string>('ALL');
  const [maintForecasts, setMaintForecasts] = useState<MaintenanceForecastItem[]>(MOCK_MAINTENANCE_FORECASTS);
  const [fuelForecasts, setFuelForecasts] = useState<FuelTrendForecastItem[]>(MOCK_FUEL_TREND_FORECASTS);
  const [crewForecasts, setCrewForecasts] = useState<CrewWorkloadForecastItem[]>(MOCK_CREW_WORKLOAD_FORECASTS);
  const [isRecalculating, setIsRecalculating] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Scenario Simulator Controls
  const [simSwellSeverity, setSimSwellSeverity] = useState<'CALM' | 'MODERATE' | 'HEAVY_WEATHER'>('MODERATE');
  const [simEngineLoadPct, setSimEngineLoadPct] = useState<number>(80);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Recalculate Forecast Handler
  const handleRecalculateForecast = () => {
    hapticEngine.trigger('click');
    setIsRecalculating(true);

    setTimeout(() => {
      // Modify values based on swell and engine load
      const multiplier = simSwellSeverity === 'HEAVY_WEATHER' ? 1.18 : simSwellSeverity === 'CALM' ? 0.92 : 1.0;
      const loadMultiplier = simEngineLoadPct / 80;

      setMaintForecasts((prev) =>
        prev.map((item) => ({
          ...item,
          confidenceScore: Math.min(99.9, +(item.confidenceScore + 0.2).toFixed(1)),
          rulHours: Math.max(24, Math.round(item.rulHours / (multiplier * loadMultiplier)))
        }))
      );

      setFuelForecasts((prev) =>
        prev.map((item) => ({
          ...item,
          currentBurnRateMTDay: +(item.currentBurnRateMTDay * multiplier).toFixed(1),
          projectedBurnRateMTDay: +(item.projectedBurnRateMTDay * multiplier).toFixed(1)
        }))
      );

      setIsRecalculating(false);
      hapticEngine.trigger('success');
      showToast('Neural Predictive Engine recalculated forecasts for selected weather scenario!');
    }, 800);
  };

  // Auto-Mitigate Crew Workload
  const handleAutoRebalanceCrew = (crewId: string) => {
    hapticEngine.trigger('success');
    setCrewForecasts((prev) =>
      prev.map((c) => {
        if (c.id === crewId) {
          return {
            ...c,
            projectedPeakFatigueIndex: Math.max(30, c.projectedPeakFatigueIndex - 25),
            stcwViolationRisk: 'NONE',
            aiMitigationStrategy: 'AI Shift Rebalancing Applied: STCW Rest Hours Secured.'
          };
        }
        return c;
      })
    );
    showToast(`AI Shift Duty Rebalanced for ${crewId}. Zero STCW violations projected.`);
  };

  // Filtered Datasets
  const filteredMaint = useMemo(() => {
    return maintForecasts.filter((m) => selectedVessel === 'ALL' || m.vessel === selectedVessel);
  }, [maintForecasts, selectedVessel]);

  const filteredFuel = useMemo(() => {
    return fuelForecasts.filter((f) => selectedVessel === 'ALL' || f.vessel === selectedVessel);
  }, [fuelForecasts, selectedVessel]);

  const filteredCrew = useMemo(() => {
    return crewForecasts.filter((c) => selectedVessel === 'ALL' || c.vessel === selectedVessel);
  }, [crewForecasts, selectedVessel]);

  return (
    <div className="space-y-6 font-mono text-xs text-slate-100 animate-fadeIn pb-12">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-cyan-950 border border-cyan-400 text-cyan-200 px-4 py-2.5 rounded-2xl shadow-2xl text-xs font-bold flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4 text-cyan-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* HEADER BAR */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-cyan-400 animate-pulse" />
              <h2 className="text-base font-extrabold text-white tracking-wide uppercase">
                Predictive Efficiency Dashboard
              </h2>
              <span className="bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 text-[9px] font-black px-2.5 py-0.5 rounded-full">
                NEURAL FORECAST V4.2
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Predictive forecasting for upcoming maintenance overhauls, fuel consumption trends, and crew workload fatigue
            </p>
          </div>

          {/* Horizon & Vessel Filters */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Horizon Selector */}
            <div className="flex items-center space-x-1 bg-slate-950 p-1 rounded-2xl border border-slate-800">
              {(['24H', '7D', '30D', '90D'] as const).map((h) => (
                <button
                  key={h}
                  onClick={() => {
                    setHorizon(h);
                    hapticEngine.trigger('click');
                  }}
                  className={`px-3 py-1 rounded-xl text-[10px] font-bold transition-all ${
                    horizon === h
                      ? 'bg-cyan-500 text-slate-950 shadow font-black'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {h}
                </button>
              ))}
            </div>

            {/* Recalculate Button */}
            <button
              onClick={handleRecalculateForecast}
              disabled={isRecalculating}
              className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-400 hover:to-indigo-400 text-slate-950 font-black rounded-2xl text-xs flex items-center space-x-1.5 shadow-xl transition-all disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-slate-950 ${isRecalculating ? 'animate-spin' : ''}`} />
              <span>{isRecalculating ? 'RECALCULATING...' : 'RECALCULATE FORECAST'}</span>
            </button>
          </div>
        </div>

        {/* Executive Overview KPI Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-slate-950 border border-slate-800 p-3.5 rounded-2xl space-y-1">
            <span className="text-[10px] text-slate-400 uppercase font-bold flex items-center space-x-1">
              <Bot className="w-3.5 h-3.5 text-cyan-400" />
              <span>Forecast Accuracy</span>
            </span>
            <p className="text-xl font-black text-cyan-300">99.4%</p>
            <span className="text-[9px] text-emerald-400 font-bold block">+0.3% vs Last Voyage</span>
          </div>

          <div className="bg-slate-950 border border-slate-800 p-3.5 rounded-2xl space-y-1">
            <span className="text-[10px] text-slate-400 uppercase font-bold flex items-center space-x-1">
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              <span>Fuel Burn Savings</span>
            </span>
            <p className="text-xl font-black text-amber-300">3.7 MT / Day</p>
            <span className="text-[9px] text-emerald-400 font-bold block">~$28,680 USD / Voyage</span>
          </div>

          <div className="bg-slate-950 border border-slate-800 p-3.5 rounded-2xl space-y-1">
            <span className="text-[10px] text-slate-400 uppercase font-bold flex items-center space-x-1">
              <Wrench className="w-3.5 h-3.5 text-indigo-400" />
              <span>Maintenance RUL Margin</span>
            </span>
            <p className="text-xl font-black text-indigo-300">12.4 Days Average</p>
            <span className="text-[9px] text-indigo-400 font-bold block">Zero Unplanned Overhauls</span>
          </div>

          <div className="bg-slate-950 border border-slate-800 p-3.5 rounded-2xl space-y-1">
            <span className="text-[10px] text-slate-400 uppercase font-bold flex items-center space-x-1">
              <Users className="w-3.5 h-3.5 text-emerald-400" />
              <span>STCW Crew Rest Margin</span>
            </span>
            <p className="text-xl font-black text-emerald-300">98.2% Compliant</p>
            <span className="text-[9px] text-emerald-400 font-bold block">0 STCW Violations Forecast</span>
          </div>
        </div>

        {/* Vessel Filter & Scenario Modifier */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-950 p-3 rounded-2xl border border-slate-800/80">
          <div className="flex items-center space-x-2 w-full sm:w-auto">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-[10px] font-bold text-slate-400 uppercase">Target Vessel:</span>
            <select
              value={selectedVessel}
              onChange={(e) => setSelectedVessel(e.target.value)}
              className="bg-slate-900 border border-slate-800 text-white text-xs rounded-xl px-3 py-1 font-bold"
            >
              <option value="ALL">All Fleet Vessels (3 Active)</option>
              <option value="ULCV Ocean Titan">ULCV Ocean Titan</option>
              <option value="Container Carrier Sea Voyager">Container Carrier Sea Voyager</option>
              <option value="Bunker Hub Malacca Pioneer">Bunker Hub Malacca Pioneer</option>
            </select>
          </div>

          <div className="flex items-center space-x-4 text-[10px] text-slate-300 w-full sm:w-auto justify-end">
            <div className="flex items-center space-x-1.5">
              <span>Simulated Swell:</span>
              <select
                value={simSwellSeverity}
                onChange={(e) => setSimSwellSeverity(e.target.value as any)}
                className="bg-slate-900 border border-slate-800 text-cyan-400 font-bold text-[10px] rounded-lg px-2 py-0.5"
              >
                <option value="CALM">Calm Sea</option>
                <option value="MODERATE">Moderate Swell</option>
                <option value="HEAVY_WEATHER">Heavy Weather (+18% fuel burn)</option>
              </select>
            </div>

            <div className="flex items-center space-x-1.5">
              <span>Engine Load:</span>
              <span className="text-cyan-400 font-bold">{simEngineLoadPct}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 1: UPCOMING MAINTENANCE NEEDS FORECAST */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-5 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div className="space-y-0.5">
            <h3 className="text-xs font-bold text-white uppercase flex items-center space-x-2">
              <Wrench className="w-4 h-4 text-cyan-400" />
              <span>Predictive Component Maintenance & Overhaul Forecast</span>
            </h3>
            <p className="text-[10px] text-slate-400">
              Machine learning vibration harmonics & thermal wear trend curves for main propulsion and auxiliary power
            </p>
          </div>

          <span className="text-[10px] text-cyan-300 bg-cyan-950 border border-cyan-800 px-3 py-1 rounded-xl font-bold">
            {filteredMaint.length} Critical Items Tracked
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {filteredMaint.map((m) => (
            <div
              key={m.id}
              className={`bg-slate-950 border rounded-2xl p-5 space-y-4 flex flex-col justify-between transition-all ${
                m.riskSeverity === 'CRITICAL'
                  ? 'border-rose-500/50 shadow-rose-950/20 shadow-lg'
                  : 'border-slate-800'
              }`}
            >
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[9px] text-cyan-400 font-bold uppercase block">{m.subsystem}</span>
                    <h4 className="text-xs font-bold text-white">{m.component}</h4>
                    <span className="text-[10px] text-slate-400">{m.vessel}</span>
                  </div>

                  <span
                    className={`px-2 py-0.5 rounded text-[9px] font-black border ${
                      m.riskSeverity === 'CRITICAL'
                        ? 'bg-rose-950 text-rose-300 border-rose-800'
                        : m.riskSeverity === 'WARNING'
                        ? 'bg-amber-950 text-amber-300 border-amber-800'
                        : 'bg-emerald-950 text-emerald-300 border-emerald-800'
                    }`}
                  >
                    {m.riskSeverity}
                  </span>
                </div>

                {/* RUL Meter */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px]">
                    <span className="text-slate-400">Remaining Useful Life (RUL):</span>
                    <strong className="text-white font-bold">
                      {m.rulHours} Hours ({m.rulDays} Days)
                    </strong>
                  </div>
                  <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 ${
                        m.rulDays <= 5 ? 'bg-rose-500' : m.rulDays <= 15 ? 'bg-amber-500' : 'bg-emerald-500'
                      }`}
                      style={{ width: `${Math.min(100, (m.rulDays / 30) * 100)}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[9px] text-slate-500">
                    <span>Target Overhaul: {m.predictedFailureDate}</span>
                    <span>Conf: {m.confidenceScore}%</span>
                  </div>
                </div>

                {/* Wear Rate Sparkline */}
                <div className="space-y-1.5 pt-2 border-t border-slate-800/80">
                  <div className="flex justify-between text-[10px] text-slate-400 font-bold">
                    <span>Wear Curve Trend (Historical ➔ AI Forecast):</span>
                  </div>
                  <DynamicSparkline
                    data={m.wearSparklineData}
                    color={m.riskSeverity === 'CRITICAL' ? '#f43f5e' : '#06b6d4'}
                    gradientId={`maint-grad-${m.id}`}
                    height={50}
                    unit="%"
                    targetLineValue={85}
                    targetLineLabel="Overhaul Threshold"
                  />
                </div>

                {/* Recommendation Box */}
                <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 text-[10px] space-y-1">
                  <span className="text-cyan-400 font-bold flex items-center space-x-1">
                    <Bot className="w-3 h-3 text-cyan-400" />
                    <span>AI Overhaul Recommendation:</span>
                  </span>
                  <p className="text-slate-300">{m.recommendedAction}</p>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                <div className="text-[9px] text-slate-400">
                  Est. Cost: <strong className="text-white">${m.estimatedOverhaulCostUSD.toLocaleString()} USD</strong>
                </div>

                <button
                  onClick={() => {
                    hapticEngine.trigger('success');
                    showToast(`Service Order & Spare Parts reserved for ${m.component}`);
                  }}
                  className="px-3 py-1.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black rounded-xl text-[10px] flex items-center space-x-1 shadow"
                >
                  <CheckSquare className="w-3 h-3 text-slate-950" />
                  <span>ORDER SPARES & SCHEDULE</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 2: FUEL CONSUMPTION TRENDS FORECAST */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-5 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div className="space-y-0.5">
            <h3 className="text-xs font-bold text-white uppercase flex items-center space-x-2">
              <Flame className="w-4 h-4 text-amber-400" />
              <span>Fuel Consumption Trend & Eco-Tuning Projections</span>
            </h3>
            <p className="text-[10px] text-slate-400">
              SFOC variance forecasting with dynamic confidence boundaries and eco-sailing optimization curves
            </p>
          </div>

          <span className="text-[10px] text-amber-300 bg-amber-950 border border-amber-800 px-3 py-1 rounded-xl font-bold">
            Voyage ROI: +$28,680 Saved
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredFuel.map((f) => (
            <div key={f.id} className="bg-slate-950 border border-slate-800 p-5 rounded-2xl space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold text-white">{f.fuelType} Fuel Burn Rate</span>
                    <span className="text-[9px] bg-amber-950 text-amber-300 border border-amber-800 px-2 py-0.5 rounded font-bold">
                      {f.vessel}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-0.5">
                    Current Burn: <strong className="text-white">{f.currentBurnRateMTDay} MT/Day</strong> ➔ Projected: <strong className="text-emerald-400">{f.projectedBurnRateMTDay} MT/Day</strong>
                  </p>
                </div>

                <div className="text-right">
                  <span className="text-xs font-black text-emerald-400">-{f.savingsVsBaselineMTDay} MT/Day</span>
                  <span className="text-[9px] text-slate-400 block">${f.financialSavingsUSD.toLocaleString()} USD ROI</span>
                </div>
              </div>

              {/* Dynamic Fuel Burn Sparkline */}
              <div className="space-y-1">
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>Consumption Trendline (MT/Day):</span>
                  <span className="text-cyan-400 font-bold">AI Eco Curve Active</span>
                </div>
                <DynamicSparkline
                  data={f.sparklineData}
                  color="#f59e0b"
                  gradientId={`fuel-grad-${f.id}`}
                  height={65}
                  unit="MT/day"
                  targetLineValue={30.0}
                  targetLineLabel="IMO DCS Baseline Limit"
                />
              </div>

              {/* Applied Optimizations Pills */}
              <div className="space-y-1 pt-2 border-t border-slate-800">
                <span className="text-[9px] text-slate-400 uppercase font-bold">Applied Dynamic Optimizations:</span>
                <div className="flex flex-wrap gap-1.5">
                  {f.optimizationsApplied.map((opt, idx) => (
                    <span key={idx} className="bg-slate-900 border border-slate-800 text-slate-300 text-[9px] px-2 py-0.5 rounded-lg font-bold flex items-center space-x-1">
                      <Zap className="w-2.5 h-2.5 text-amber-400" />
                      <span>{opt}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 3: CREW WORKLOAD & FATIGUE INDEX FORECAST */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-5 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div className="space-y-0.5">
            <h3 className="text-xs font-bold text-white uppercase flex items-center space-x-2">
              <Users className="w-4 h-4 text-emerald-400" />
              <span>Crew Workload & STCW Rest Hours Fatigue Forecast</span>
            </h3>
            <p className="text-[10px] text-slate-400">
              Predictive fatigue index modeling to prevent STCW 2010 rest hour non-compliances during intensive port calls
            </p>
          </div>

          <span className="text-[10px] text-emerald-300 bg-emerald-950 border border-emerald-800 px-3 py-1 rounded-xl font-bold">
            0 Violations Forecasted
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredCrew.map((c) => (
            <div key={c.id} className="bg-slate-950 border border-slate-800 p-5 rounded-2xl space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-xs font-bold text-white">{c.department}</h4>
                  <span className="text-[10px] text-slate-400">{c.vessel} • {c.activeShiftCount} Active Shifts</span>
                </div>

                <span className={`px-2 py-0.5 rounded text-[9px] font-black border ${
                  c.stcwViolationRisk === 'HIGH' ? 'bg-rose-950 text-rose-300 border-rose-800' :
                  c.stcwViolationRisk === 'MODERATE' ? 'bg-amber-950 text-amber-300 border-amber-800' :
                  'bg-emerald-950 text-emerald-300 border-emerald-800'
                }`}>
                  STCW Risk: {c.stcwViolationRisk}
                </span>
              </div>

              {/* Fatigue Index Progress */}
              <div className="space-y-1">
                <div className="flex justify-between text-[10px]">
                  <span className="text-slate-400">Current / Projected Peak Fatigue Index:</span>
                  <strong className="text-white">{c.currentFatigueIndex} / 100 ➔ Peak {c.projectedPeakFatigueIndex} / 100</strong>
                </div>
                <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 ${
                      c.projectedPeakFatigueIndex >= 75 ? 'bg-rose-500' : 'bg-emerald-500'
                    }`}
                    style={{ width: `${c.projectedPeakFatigueIndex}%` }}
                  />
                </div>
                <span className="text-[9px] text-amber-400 font-bold block">Peak Bottleneck: {c.peakRestDeficitDay}</span>
              </div>

              {/* Workload Sparkline */}
              <div className="space-y-1">
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>Shift Fatigue Trendline (0-100 Score):</span>
                  <span className="text-indigo-400 font-bold">7-Day Curve</span>
                </div>
                <DynamicSparkline
                  data={c.workloadSparklineData}
                  color={c.projectedPeakFatigueIndex >= 75 ? '#f43f5e' : '#10b981'}
                  gradientId={`crew-grad-${c.id}`}
                  height={55}
                  unit="Index"
                  targetLineValue={70}
                  targetLineLabel="Fatigue Alert Threshold"
                />
              </div>

              {/* AI Mitigation Strategy */}
              <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 text-[10px] space-y-2">
                <div className="space-y-0.5">
                  <span className="text-cyan-400 font-bold flex items-center space-x-1">
                    <Bot className="w-3 h-3 text-cyan-400" />
                    <span>AI Shift Duty Rebalancing Plan:</span>
                  </span>
                  <p className="text-slate-300">{c.aiMitigationStrategy}</p>
                </div>

                <button
                  onClick={() => handleAutoRebalanceCrew(c.id)}
                  className="w-full py-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center space-x-1 shadow"
                >
                  <Zap className="w-3.5 h-3.5 text-slate-950" />
                  <span>AUTO-REBALANCE CREW DUTY ROSTER</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PredictiveEfficiencyDashboard;
