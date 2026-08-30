import React, { useState, useMemo } from 'react';
import {
  CloudLightning,
  ShieldAlert,
  Thermometer,
  Waves,
  Wind,
  MapPin,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  Clock,
  Activity,
  Zap,
  Sparkles,
  Filter,
  BarChart2
} from 'lucide-react';
import { motion } from 'motion/react';
import { ResponsiveContainer, AreaChart, Area, Tooltip, XAxis, YAxis } from 'recharts';
import { hapticEngine } from '../../utils/hapticUtils';

export interface ClimateAlert {
  id: string;
  title: string;
  category: 'HEATWAVE' | 'CYCLONE' | 'WAVE_SURGE' | 'WAVE_SEVERITY' | 'CORAL_BLEACHING';
  severity: 'CRITICAL' | 'HIGH' | 'MODERATE';
  region: string;
  coordinates: string;
  timestamp: string;
  impactMetrics: string;
  vesselActionPlan: string;
}

export interface HourlyAlertPoint {
  hourLabel: string;
  shortLabel: string;
  hour: number;
  totalAlerts: number;
  critical: number;
  high: number;
  moderate: number;
}

const CLIMATE_ALERTS_DATA: ClimateAlert[] = [
  {
    id: 'ALT-CLM-501',
    title: 'Category 4 Super Typhoon "Mawar" Approach Corridor',
    category: 'CYCLONE',
    severity: 'CRITICAL',
    region: 'Philippine Sea (180 NM East of Luzon)',
    coordinates: '15.4000° N, 124.5000° E',
    timestamp: '12 min ago',
    impactMetrics: 'Max Sustained Winds: 135 Knots • Central Pressure: 920 hPa • Wave Height: 9.5m',
    vesselActionPlan: 'All northbound vessels in Luzon Strait must execute immediate weather avoidance diversion to South China Sea.'
  },
  {
    id: 'ALT-CLM-502',
    title: 'Extreme Marine Heatwave Warning (SST +3.8°C Anomaly)',
    category: 'HEATWAVE',
    severity: 'HIGH',
    region: 'Torres Strait & Northern Great Barrier Reef',
    coordinates: '10.5000° S, 142.3000° E',
    timestamp: '35 min ago',
    impactMetrics: 'SST 31.4°C (+3.8°C above average) • DHW Level: 11.2 °C-weeks',
    vesselActionPlan: 'Reduce vessel speed to 10 knots in reef passage; monitor main engine sea suction strainers for thermal bio-fouling.'
  },
  {
    id: 'ALT-CLM-503',
    title: 'Sudden Sea State Wave Surge (Hs 5.8m)',
    category: 'WAVE_SEVERITY',
    severity: 'HIGH',
    region: 'South Australian Basin / Bass Strait Entry',
    coordinates: '39.1000° S, 144.2000° E',
    timestamp: '1 hour ago',
    impactMetrics: 'Hs: 5.8m • Peak Period: 14.2 sec • Wind Speed: SW 42 Knots',
    vesselActionPlan: 'Tighten container deck lashing turnbuckles; delay pilot boardings at Melbourne approach by 6 hours.'
  },
  {
    id: 'ALT-CLM-504',
    title: 'Level 2 Coral Reef Bleaching Alert',
    category: 'CORAL_BLEACHING',
    severity: 'MODERATE',
    region: 'Sulu Archipelago Protected Reef Sanctuary',
    coordinates: '5.8000° N, 121.2000° E',
    timestamp: '2 hours ago',
    impactMetrics: 'Thermal Stress Index: Level 2 • Bleaching Coverage: 68%',
    vesselActionPlan: 'Zero discharge zone strictly enforced for graywater, sewage, and ballast water exchanges within 12 NM.'
  }
];

// 24-Hour Alert Frequency Dataset (Hourly telemetry over last 24h)
const ALERT_FREQUENCY_24H_DATA: HourlyAlertPoint[] = [
  { hourLabel: '00:00 UTC', shortLabel: '00h', hour: 0, totalAlerts: 2, critical: 0, high: 1, moderate: 1 },
  { hourLabel: '01:00 UTC', shortLabel: '01h', hour: 1, totalAlerts: 1, critical: 0, high: 0, moderate: 1 },
  { hourLabel: '02:00 UTC', shortLabel: '02h', hour: 2, totalAlerts: 3, critical: 1, high: 1, moderate: 1 },
  { hourLabel: '03:00 UTC', shortLabel: '03h', hour: 3, totalAlerts: 2, critical: 0, high: 1, moderate: 1 },
  { hourLabel: '04:00 UTC', shortLabel: '04h', hour: 4, totalAlerts: 4, critical: 1, high: 2, moderate: 1 },
  { hourLabel: '05:00 UTC', shortLabel: '05h', hour: 5, totalAlerts: 5, critical: 1, high: 3, moderate: 1 },
  { hourLabel: '06:00 UTC', shortLabel: '06h', hour: 6, totalAlerts: 7, critical: 2, high: 4, moderate: 1 },
  { hourLabel: '07:00 UTC', shortLabel: '07h', hour: 7, totalAlerts: 6, critical: 2, high: 3, moderate: 1 },
  { hourLabel: '08:00 UTC', shortLabel: '08h', hour: 8, totalAlerts: 9, critical: 3, high: 4, moderate: 2 },
  { hourLabel: '09:00 UTC', shortLabel: '09h', hour: 9, totalAlerts: 11, critical: 4, high: 5, moderate: 2 },
  { hourLabel: '10:00 UTC', shortLabel: '10h', hour: 10, totalAlerts: 10, critical: 3, high: 5, moderate: 2 },
  { hourLabel: '11:00 UTC', shortLabel: '11h', hour: 11, totalAlerts: 13, critical: 5, high: 6, moderate: 2 },
  { hourLabel: '12:00 UTC', shortLabel: '12h', hour: 12, totalAlerts: 16, critical: 7, high: 6, moderate: 3 }, // Peak
  { hourLabel: '13:00 UTC', shortLabel: '13h', hour: 13, totalAlerts: 14, critical: 6, high: 5, moderate: 3 },
  { hourLabel: '14:00 UTC', shortLabel: '14h', hour: 14, totalAlerts: 11, critical: 4, high: 5, moderate: 2 },
  { hourLabel: '15:00 UTC', shortLabel: '15h', hour: 15, totalAlerts: 8, critical: 3, high: 3, moderate: 2 },
  { hourLabel: '16:00 UTC', shortLabel: '16h', hour: 16, totalAlerts: 7, critical: 2, high: 3, moderate: 2 },
  { hourLabel: '17:00 UTC', shortLabel: '17h', hour: 17, totalAlerts: 5, critical: 1, high: 3, moderate: 1 },
  { hourLabel: '18:00 UTC', shortLabel: '18h', hour: 18, totalAlerts: 4, critical: 1, high: 2, moderate: 1 },
  { hourLabel: '19:00 UTC', shortLabel: '19h', hour: 19, totalAlerts: 3, critical: 0, high: 2, moderate: 1 },
  { hourLabel: '20:00 UTC', shortLabel: '20h', hour: 20, totalAlerts: 3, critical: 1, high: 1, moderate: 1 },
  { hourLabel: '21:00 UTC', shortLabel: '21h', hour: 21, totalAlerts: 5, critical: 2, high: 2, moderate: 1 },
  { hourLabel: '22:00 UTC', shortLabel: '22h', hour: 22, totalAlerts: 4, critical: 1, high: 2, moderate: 1 },
  { hourLabel: '23:00 UTC', shortLabel: '23h', hour: 23, totalAlerts: 6, critical: 2, high: 3, moderate: 1 }
];

const CustomSparklineTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data: HourlyAlertPoint = payload[0].payload;
    return (
      <div className="bg-slate-950/95 border border-amber-500/40 p-2.5 rounded-xl shadow-xl font-mono text-[10px] space-y-1">
        <div className="flex justify-between items-center text-amber-400 font-bold border-b border-slate-800 pb-1 gap-3">
          <span>{data.hourLabel}</span>
          <span className="bg-amber-500/20 px-1.5 py-0.5 rounded text-amber-300 font-black">{data.totalAlerts} Alerts</span>
        </div>
        <div className="space-y-0.5 text-slate-300 pt-0.5">
          <div className="flex justify-between text-rose-400">
            <span>Critical:</span>
            <span className="font-bold">{data.critical}</span>
          </div>
          <div className="flex justify-between text-amber-300">
            <span>High:</span>
            <span className="font-bold">{data.high}</span>
          </div>
          <div className="flex justify-between text-cyan-300">
            <span>Moderate:</span>
            <span className="font-bold">{data.moderate}</span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export const ClimateAlertView: React.FC = () => {
  const [alerts] = useState<ClimateAlert[]>(CLIMATE_ALERTS_DATA);
  const [selectedAlert, setSelectedAlert] = useState<ClimateAlert>(CLIMATE_ALERTS_DATA[0]);
  const [sparklineMetric, setSparklineMetric] = useState<'total' | 'critical' | 'high'>('total');
  const [hoveredPoint, setHoveredPoint] = useState<HourlyAlertPoint | null>(null);

  // Calculated 24-Hour Metrics
  const summaryMetrics = useMemo(() => {
    const total24h = ALERT_FREQUENCY_24H_DATA.reduce((acc, curr) => acc + curr.totalAlerts, 0);
    const critical24h = ALERT_FREQUENCY_24H_DATA.reduce((acc, curr) => acc + curr.critical, 0);
    const high24h = ALERT_FREQUENCY_24H_DATA.reduce((acc, curr) => acc + curr.high, 0);
    const peak = ALERT_FREQUENCY_24H_DATA.reduce((prev, curr) => (curr.totalAlerts > prev.totalAlerts ? curr : prev), ALERT_FREQUENCY_24H_DATA[0]);
    const currentRate = ALERT_FREQUENCY_24H_DATA[ALERT_FREQUENCY_24H_DATA.length - 1].totalAlerts;

    return {
      total24h,
      critical24h,
      high24h,
      peakHour: peak.hourLabel,
      peakCount: peak.totalAlerts,
      currentRate,
      trendSurge: '+21.4%'
    };
  }, []);

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'CRITICAL':
        return <span className="bg-rose-950 text-rose-300 border border-rose-800 text-[9px] px-2 py-0.5 rounded font-bold">CRITICAL WARNING</span>;
      case 'HIGH':
        return <span className="bg-amber-950 text-amber-300 border border-amber-800 text-[9px] px-2 py-0.5 rounded font-bold">HIGH ALERT</span>;
      default:
        return <span className="bg-cyan-950 text-cyan-300 border border-cyan-800 text-[9px] px-2 py-0.5 rounded font-bold">MODERATE ADVISORY</span>;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-2xl space-y-4 font-mono text-xs"
    >
      {/* View Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="space-y-0.5">
          <h3 className="text-xs font-bold text-white uppercase flex items-center space-x-2">
            <CloudLightning className="w-4 h-4 text-amber-400 animate-pulse" />
            <span>Severe Oceanic Climate Risk & Extreme Weather Real-time Alerts</span>
          </h3>
          <p className="text-[10px] text-slate-400 font-sans">
            Tropical cyclone path projections, marine heatwave warnings, wave surge alerts, and vessel rerouting advisories
          </p>
        </div>

        <span className="bg-amber-950 text-amber-300 border border-amber-800 text-[10px] px-2.5 py-1 rounded font-bold self-start sm:self-auto flex items-center space-x-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>LIVE METEOROLOGICAL TELEMETRY</span>
        </span>
      </div>

      {/* 24-HOUR ALERT FREQUENCY SPARKLINE TREND CHART WIDGET */}
      <div className="bg-slate-950 border border-amber-500/30 rounded-2xl p-4 space-y-3 relative overflow-hidden shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-black text-white uppercase tracking-wider">24-Hour Alert Frequency Trend Sparkline</span>
                <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[9px] font-bold px-2 py-0.5 rounded-full flex items-center space-x-1">
                  <TrendingUp className="w-3 h-3" />
                  <span>{summaryMetrics.trendSurge} Surge</span>
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-sans">
                Hourly frequency velocity of ocean storm, heatwave, wave surge, & reef alerts over the last 24 hours
              </p>
            </div>
          </div>

          {/* Sparkline Metric Filter Buttons */}
          <div className="flex items-center space-x-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800 self-start md:self-auto">
            <button
              onClick={() => {
                setSparklineMetric('total');
                hapticEngine.trigger('click');
              }}
              className={`px-2.5 py-1 rounded-lg text-[9px] font-bold transition-all ${
                sparklineMetric === 'total'
                  ? 'bg-amber-500 text-slate-950 shadow-md font-black'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              All Alerts
            </button>
            <button
              onClick={() => {
                setSparklineMetric('critical');
                hapticEngine.trigger('click');
              }}
              className={`px-2.5 py-1 rounded-lg text-[9px] font-bold transition-all ${
                sparklineMetric === 'critical'
                  ? 'bg-rose-500 text-slate-950 shadow-md font-black'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Critical
            </button>
            <button
              onClick={() => {
                setSparklineMetric('high');
                hapticEngine.trigger('click');
              }}
              className={`px-2.5 py-1 rounded-lg text-[9px] font-bold transition-all ${
                sparklineMetric === 'high'
                  ? 'bg-amber-400 text-slate-950 shadow-md font-black'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              High Alert
            </button>
          </div>
        </div>

        {/* Chart + Quick Stats Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-center">
          {/* Sparkline Visual (3 Cols) */}
          <div className="lg:col-span-3 space-y-1">
            <div className="h-16 sm:h-20 w-full pt-1">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={ALERT_FREQUENCY_24H_DATA}
                  margin={{ top: 5, right: 5, left: -25, bottom: 0 }}
                  onMouseMove={(state: any) => {
                    if (state && state.activePayload && state.activePayload.length) {
                      setHoveredPoint(state.activePayload[0].payload);
                    }
                  }}
                  onMouseLeave={() => setHoveredPoint(null)}
                >
                  <defs>
                    <linearGradient id="sparklineGradientAmber" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.0} />
                    </linearGradient>
                    <linearGradient id="sparklineGradientRose" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#f43f5e" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="shortLabel"
                    tick={{ fill: '#64748b', fontSize: 8, fontFamily: 'monospace' }}
                    axisLine={{ stroke: '#334155' }}
                    tickLine={false}
                    interval={3}
                  />
                  <YAxis hide domain={[0, 'dataMax + 2']} />
                  <Tooltip content={<CustomSparklineTooltip />} />
                  <Area
                    type="monotone"
                    dataKey={
                      sparklineMetric === 'critical'
                        ? 'critical'
                        : sparklineMetric === 'high'
                        ? 'high'
                        : 'totalAlerts'
                    }
                    stroke={
                      sparklineMetric === 'critical'
                        ? '#f43f5e'
                        : sparklineMetric === 'high'
                        ? '#fbbf24'
                        : '#f59e0b'
                    }
                    strokeWidth={2}
                    fillOpacity={1}
                    fill={sparklineMetric === 'critical' ? 'url(#sparklineGradientRose)' : 'url(#sparklineGradientAmber)'}
                    activeDot={{ r: 4, fill: '#ffffff', stroke: '#f59e0b', strokeWidth: 2 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Hover Data Inspector Bar */}
            <div className="flex justify-between items-center text-[9px] text-slate-400 font-mono px-1">
              <span>24H Window (00:00 - 23:00 UTC)</span>
              {hoveredPoint ? (
                <span className="text-amber-300 font-bold">
                  Inspector: {hoveredPoint.hourLabel} → {hoveredPoint.totalAlerts} Alerts ({hoveredPoint.critical} Critical, {hoveredPoint.high} High)
                </span>
              ) : (
                <span className="text-slate-500 italic">Hover sparkline points to inspect hourly telemetry</span>
              )}
            </div>
          </div>

          {/* 24h Summary Cards (1 Col) */}
          <div className="grid grid-cols-2 lg:grid-cols-1 gap-2 text-mono">
            <div className="bg-slate-900 border border-slate-800 p-2.5 rounded-xl flex items-center justify-between">
              <div>
                <span className="text-[9px] text-slate-400 block font-sans uppercase">24h Total Volume</span>
                <span className="text-sm font-black text-amber-400 font-mono">{summaryMetrics.total24h} Alerts</span>
              </div>
              <Activity className="w-4 h-4 text-amber-400/80 shrink-0" />
            </div>

            <div className="bg-slate-900 border border-slate-800 p-2.5 rounded-xl flex items-center justify-between">
              <div>
                <span className="text-[9px] text-slate-400 block font-sans uppercase">Peak Frequency</span>
                <span className="text-xs font-bold text-white font-mono">{summaryMetrics.peakCount} / hr @ {summaryMetrics.peakHour}</span>
              </div>
              <Zap className="w-4 h-4 text-rose-400 shrink-0" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Alert Stream List */}
        <div className="lg:col-span-2 space-y-2">
          {alerts.map((al) => (
            <div
              key={al.id}
              onClick={() => {
                setSelectedAlert(al);
                hapticEngine.trigger('click');
              }}
              className={`p-4 rounded-2xl border cursor-pointer transition-all space-y-2 ${
                selectedAlert.id === al.id
                  ? 'bg-slate-950 border-amber-400 ring-1 ring-amber-400'
                  : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex justify-between items-center border-b border-slate-900 pb-2">
                <div>
                  <span className="text-[8px] text-amber-400 font-bold block">{al.id} • {al.timestamp}</span>
                  <h4 className="text-xs font-bold text-white">{al.title}</h4>
                </div>
                {getSeverityBadge(al.severity)}
              </div>

              <div className="grid grid-cols-2 gap-2 text-[10px] bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                <div>
                  <span className="text-slate-500 block">AFFECTED REGION:</span>
                  <span className="text-cyan-300 font-bold">{al.region}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">COORDINATES:</span>
                  <span className="text-white font-bold">{al.coordinates}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Selected Alert Details */}
        <div className="bg-slate-950 border border-slate-800 p-5 rounded-2xl space-y-3 font-mono flex flex-col justify-between">
          <div className="space-y-3">
            <div className="border-b border-slate-800 pb-2">
              <span className="text-[8px] text-amber-400 font-bold block">{selectedAlert.id} TELEMETRY DOSSIER</span>
              <h4 className="text-xs font-bold text-white">{selectedAlert.title}</h4>
              <span className="text-[9px] text-slate-400 block font-sans">{selectedAlert.region}</span>
            </div>

            <div className="space-y-2 bg-slate-900 p-3 rounded-xl border border-slate-800 text-[10px]">
              <div>
                <span className="text-slate-500 block">IMPACT METRICS TELEMETRY:</span>
                <span className="text-amber-400 font-bold block">{selectedAlert.impactMetrics}</span>
              </div>
            </div>

            <div className="bg-rose-950/30 border border-rose-800 p-3 rounded-xl text-[10px] text-rose-300 space-y-1">
              <span className="font-bold block text-rose-400 flex items-center space-x-1">
                <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                <span>MANDATORY VESSEL ACTION PLAN:</span>
              </span>
              <p className="font-sans text-[10px] text-slate-300 leading-relaxed">
                {selectedAlert.vesselActionPlan}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
