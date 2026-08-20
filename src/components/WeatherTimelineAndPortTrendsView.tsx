import React, { useState } from 'react';
import {
  CloudRain,
  Sun,
  CloudSun,
  Wind,
  Waves,
  Eye,
  Thermometer,
  Compass,
  AlertTriangle,
  Clock,
  TrendingUp,
  Globe,
  Anchor,
  Plane,
  BarChart2,
  Calendar,
  Layers,
  Sparkles,
  ShieldAlert,
  ArrowUpRight
} from 'lucide-react';

interface TimelineHourData {
  hourOffset: number; // e.g. 0, 6, 12, 18, 24, 30, 36, 42, 48
  label: string; // e.g. "+6 Hours (Aug 02 18:00 UTC)"
  windSpeedKt: number;
  gustKt: number;
  waveHeightM: number;
  visibilityKm: number;
  cloudCeilingFt: number;
  pressureHpa: number;
  seaStateBeaufort: string;
  flightTurbulenceLevel: 'NONE' | 'LIGHT' | 'MODERATE' | 'SEVERE';
  conditionSummary: string;
  iconType: 'SUN' | 'PARTLY_CLOUDY' | 'RAIN' | 'STORM' | 'FOG';
  routeImpactAlert?: string;
}

const TIMELINE_DATA_SAMPLES: TimelineHourData[] = [
  {
    hourOffset: 0,
    label: 'Now (Current 12:00 UTC)',
    windSpeedKt: 18,
    gustKt: 24,
    waveHeightM: 2.2,
    visibilityKm: 12,
    cloudCeilingFt: 4500,
    pressureHpa: 1012,
    seaStateBeaufort: 'Force 4 (Moderate Breeze)',
    flightTurbulenceLevel: 'LIGHT',
    conditionSummary: 'Clear coastal sky with moderate swell in Bay of Bengal',
    iconType: 'PARTLY_CLOUDY'
  },
  {
    hourOffset: 6,
    label: '+6 Hours (18:00 UTC)',
    windSpeedKt: 26,
    gustKt: 35,
    waveHeightM: 3.1,
    visibilityKm: 8,
    cloudCeilingFt: 3000,
    pressureHpa: 1008,
    seaStateBeaufort: 'Force 6 (Strong Breeze)',
    flightTurbulenceLevel: 'MODERATE',
    conditionSummary: 'Approaching monsoon trough from Arabian Sea',
    iconType: 'RAIN',
    routeImpactAlert: 'Arabian Sea Corridor: Reduced speed recommended to maintain vessel stability.'
  },
  {
    hourOffset: 12,
    label: '+12 Hours (Aug 03 00:00 UTC)',
    windSpeedKt: 34,
    gustKt: 48,
    waveHeightM: 4.5,
    visibilityKm: 4,
    cloudCeilingFt: 1800,
    pressureHpa: 1002,
    seaStateBeaufort: 'Force 8 (Gale Force)',
    flightTurbulenceLevel: 'SEVERE',
    conditionSummary: 'Peak cyclonic surge & high wave height in Western Ghats corridor',
    iconType: 'STORM',
    routeImpactAlert: 'Severe Flight Turbulence at FL280-FL340. Airways rerouting advised via North corridor.'
  },
  {
    hourOffset: 18,
    label: '+18 Hours (Aug 03 06:00 UTC)',
    windSpeedKt: 38,
    gustKt: 52,
    waveHeightM: 5.2,
    visibilityKm: 2.5,
    cloudCeilingFt: 1200,
    pressureHpa: 998,
    seaStateBeaufort: 'Force 9 (Strong Gale)',
    flightTurbulenceLevel: 'SEVERE',
    conditionSummary: 'Monsoon depression landfall near Mumbai JNPT port area',
    iconType: 'STORM',
    routeImpactAlert: 'Port Crane Operations Hold in effect at JNPT Port Trust due to >35kt gusts.'
  },
  {
    hourOffset: 24,
    label: '+24 Hours (Aug 03 12:00 UTC)',
    windSpeedKt: 28,
    gustKt: 38,
    waveHeightM: 3.8,
    visibilityKm: 6,
    cloudCeilingFt: 2500,
    pressureHpa: 1005,
    seaStateBeaufort: 'Force 7 (Near Gale)',
    flightTurbulenceLevel: 'MODERATE',
    conditionSummary: 'System moving inland; coastal sea state gradually stabilizing',
    iconType: 'RAIN'
  },
  {
    hourOffset: 36,
    label: '+36 Hours (Aug 04 00:00 UTC)',
    windSpeedKt: 16,
    gustKt: 22,
    waveHeightM: 2.0,
    visibilityKm: 10,
    cloudCeilingFt: 5000,
    pressureHpa: 1011,
    seaStateBeaufort: 'Force 4 (Moderate)',
    flightTurbulenceLevel: 'LIGHT',
    conditionSummary: 'Fair conditions restoring across coastal air corridors',
    iconType: 'PARTLY_CLOUDY'
  },
  {
    hourOffset: 48,
    label: '+48 Hours (Aug 04 12:00 UTC)',
    windSpeedKt: 12,
    gustKt: 16,
    waveHeightM: 1.4,
    visibilityKm: 15,
    cloudCeilingFt: 8000,
    pressureHpa: 1015,
    seaStateBeaufort: 'Force 3 (Gentle Breeze)',
    flightTurbulenceLevel: 'NONE',
    conditionSummary: 'Calm sea state and optimal flight visibility across oceanic routes',
    iconType: 'SUN'
  }
];

interface PortWeatherTrend {
  portCode: string; // e.g. "JNPT", "BOM", "SIN", "DXB"
  portName: string;
  type: 'SEAPORT' | 'AIRPORT' | 'DUAL_HUB';
  region: 'ASIA_PACIFIC' | 'MIDDLE_EAST_EUROPE' | 'AMERICAS';
  currentTempC: number;
  seaSurfaceTempC: number;
  windSpeedKt: number;
  monsoonSurgeRisk: 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL';
  craneOrRunwayStatus: '100% OPERATIONAL' | 'CROSSWIND ADVISORY' | 'CRANE HOLD' | 'SUSPENDED';
  fiveDayTrend: { day: string; windKt: number; waveM: number; rainProb: number }[];
}

const PORT_WEATHER_TRENDS: PortWeatherTrend[] = [
  {
    portCode: 'BOM / JNPT',
    portName: 'Mumbai JNPT & Airport Hub (India)',
    type: 'DUAL_HUB',
    region: 'ASIA_PACIFIC',
    currentTempC: 28,
    seaSurfaceTempC: 29.5,
    windSpeedKt: 32,
    monsoonSurgeRisk: 'HIGH',
    craneOrRunwayStatus: 'CRANE HOLD',
    fiveDayTrend: [
      { day: 'Sun', windKt: 32, waveM: 4.2, rainProb: 90 },
      { day: 'Mon', windKt: 38, waveM: 5.1, rainProb: 95 },
      { day: 'Tue', windKt: 24, waveM: 3.2, rainProb: 60 },
      { day: 'Wed', windKt: 18, waveM: 2.1, rainProb: 40 },
      { day: 'Thu', windKt: 14, waveM: 1.5, rainProb: 20 }
    ]
  },
  {
    portCode: 'SIN / PSA',
    portName: 'Port of Singapore & Changi SIN',
    type: 'DUAL_HUB',
    region: 'ASIA_PACIFIC',
    currentTempC: 31,
    seaSurfaceTempC: 30.2,
    windSpeedKt: 14,
    monsoonSurgeRisk: 'LOW',
    craneOrRunwayStatus: '100% OPERATIONAL',
    fiveDayTrend: [
      { day: 'Sun', windKt: 14, waveM: 1.2, rainProb: 30 },
      { day: 'Mon', windKt: 16, waveM: 1.3, rainProb: 35 },
      { day: 'Tue', windKt: 12, waveM: 1.1, rainProb: 25 },
      { day: 'Wed', windKt: 15, waveM: 1.4, rainProb: 40 },
      { day: 'Thu', windKt: 13, waveM: 1.2, rainProb: 30 }
    ]
  },
  {
    portCode: 'DXB / JEA',
    portName: 'Dubai Jebel Ali & DXB Airport',
    type: 'DUAL_HUB',
    region: 'MIDDLE_EAST_EUROPE',
    currentTempC: 41,
    seaSurfaceTempC: 33.0,
    windSpeedKt: 22,
    monsoonSurgeRisk: 'LOW',
    craneOrRunwayStatus: 'CROSSWIND ADVISORY',
    fiveDayTrend: [
      { day: 'Sun', windKt: 22, waveM: 1.8, rainProb: 0 },
      { day: 'Mon', windKt: 25, waveM: 2.1, rainProb: 0 },
      { day: 'Tue', windKt: 20, waveM: 1.6, rainProb: 0 },
      { day: 'Wed', windKt: 18, waveM: 1.4, rainProb: 0 },
      { day: 'Thu', windKt: 19, waveM: 1.5, rainProb: 0 }
    ]
  },
  {
    portCode: 'RTM / AMS',
    portName: 'Port of Rotterdam & Schiphol',
    type: 'DUAL_HUB',
    region: 'MIDDLE_EAST_EUROPE',
    currentTempC: 22,
    seaSurfaceTempC: 18.5,
    windSpeedKt: 19,
    monsoonSurgeRisk: 'MODERATE',
    craneOrRunwayStatus: '100% OPERATIONAL',
    fiveDayTrend: [
      { day: 'Sun', windKt: 19, waveM: 2.2, rainProb: 45 },
      { day: 'Mon', windKt: 21, waveM: 2.5, rainProb: 55 },
      { day: 'Tue', windKt: 16, waveM: 1.8, rainProb: 30 },
      { day: 'Wed', windKt: 14, waveM: 1.5, rainProb: 20 },
      { day: 'Thu', windKt: 18, waveM: 2.0, rainProb: 40 }
    ]
  },
  {
    portCode: 'JFK / NY',
    portName: 'Port of New York & JFK Intl',
    type: 'DUAL_HUB',
    region: 'AMERICAS',
    currentTempC: 27,
    seaSurfaceTempC: 23.0,
    windSpeedKt: 15,
    monsoonSurgeRisk: 'LOW',
    craneOrRunwayStatus: '100% OPERATIONAL',
    fiveDayTrend: [
      { day: 'Sun', windKt: 15, waveM: 1.4, rainProb: 20 },
      { day: 'Mon', windKt: 18, waveM: 1.7, rainProb: 30 },
      { day: 'Tue', windKt: 22, waveM: 2.1, rainProb: 65 },
      { day: 'Wed', windKt: 16, waveM: 1.5, rainProb: 25 },
      { day: 'Thu', windKt: 12, waveM: 1.2, rainProb: 10 }
    ]
  }
];

export const WeatherTimelineAndPortTrendsView: React.FC = () => {
  const [selectedTimelineIndex, setSelectedTimelineIndex] = useState<number>(0);
  const [activeRegionFilter, setActiveRegionFilter] = useState<'ALL' | 'ASIA_PACIFIC' | 'MIDDLE_EAST_EUROPE' | 'AMERICAS'>('ALL');

  const activeTimeline = TIMELINE_DATA_SAMPLES[selectedTimelineIndex];

  const filteredPorts = PORT_WEATHER_TRENDS.filter(
    (port) => activeRegionFilter === 'ALL' || port.region === activeRegionFilter
  );

  return (
    <div id="weather-timeline-trends" className="space-y-8 animate-fadeIn font-sans text-white">
      {/* Top Banner Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 rounded-2xl p-6 border border-cyan-500/30 shadow-2xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 uppercase flex items-center space-x-1">
                <Clock className="w-3.5 h-3.5 text-cyan-400" />
                <span>24-48 HOUR ATMOSPHERIC & MARITIME TIMELINE</span>
              </span>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 uppercase">
                GLOBAL PORT WEATHER TRENDS
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white mt-2 flex items-center space-x-3">
              <CloudSun className="w-8 h-8 text-cyan-400" />
              <span>Weather Timeline & Ports Weather Trends</span>
            </h1>
            <p className="text-slate-400 text-xs mt-1 max-w-3xl font-sans">
              Chronological 48-hour voyage & flight corridor timeline forecasting wind shear, wave height, pressure drop, and turbulence alongside multi-day weather trends for major international ports.
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 1: 24-48 HOUR INTERACTIVE WEATHER TIMELINE */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6 font-mono text-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-2">
            <Clock className="w-5 h-5 text-cyan-400" />
            <h2 className="text-lg font-black text-white">48-Hour Voyage & Corridor Weather Timeline</h2>
          </div>
          <span className="text-cyan-400 text-xs font-bold">
            Selected Forecast: <strong className="text-white">{activeTimeline.label}</strong>
          </span>
        </div>

        {/* Timeline Hour Stepper / Slider Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
          {TIMELINE_DATA_SAMPLES.map((item, idx) => (
            <button
              key={item.hourOffset}
              onClick={() => setSelectedTimelineIndex(idx)}
              className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center justify-center space-y-1 ${
                selectedTimelineIndex === idx
                  ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-black shadow-lg shadow-cyan-500/20'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <span className="text-xs font-black">+{item.hourOffset}h</span>
              <span className="text-[9px] uppercase font-bold opacity-80">
                {item.hourOffset === 0 ? 'NOW' : `${item.windSpeedKt}kt Wind`}
              </span>
            </button>
          ))}
        </div>

        {/* Selected Hour Detailed Forecast Card */}
        <div className="bg-slate-950 p-6 rounded-2xl border border-cyan-500/30 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center space-x-3">
              <div className="p-3 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                {activeTimeline.iconType === 'STORM' ? (
                  <CloudRain className="w-8 h-8 text-rose-400 animate-bounce" />
                ) : activeTimeline.iconType === 'RAIN' ? (
                  <CloudRain className="w-8 h-8 text-cyan-400" />
                ) : (
                  <Sun className="w-8 h-8 text-amber-400" />
                )}
              </div>
              <div>
                <strong className="text-lg text-white font-extrabold block">{activeTimeline.label}</strong>
                <span className="text-slate-400 text-xs">{activeTimeline.conditionSummary}</span>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <span className="px-3 py-1.5 rounded-xl text-xs font-black bg-slate-900 border border-slate-700 text-teal-300">
                Sea State: {activeTimeline.seaStateBeaufort}
              </span>
              <span
                className={`px-3 py-1.5 rounded-xl text-xs font-black border ${
                  activeTimeline.flightTurbulenceLevel === 'SEVERE'
                    ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                    : activeTimeline.flightTurbulenceLevel === 'MODERATE'
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                    : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                }`}
              >
                Flight Turbulence: {activeTimeline.flightTurbulenceLevel}
              </span>
            </div>
          </div>

          {activeTimeline.routeImpactAlert && (
            <div className="p-4 bg-rose-500/20 border border-rose-500/40 text-rose-300 rounded-xl text-xs flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 shrink-0 text-rose-400" />
              <span><strong>ROUTE ADVISORY:</strong> {activeTimeline.routeImpactAlert}</span>
            </div>
          )}

          {/* Metric Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 space-y-1">
              <span className="text-slate-500 text-[10px] block uppercase font-bold flex items-center space-x-1">
                <Wind className="w-3.5 h-3.5 text-cyan-400" />
                <span>Wind Speed</span>
              </span>
              <strong className="text-white text-base font-black">{activeTimeline.windSpeedKt} knots</strong>
              <span className="text-slate-400 text-[10px] block">Gusts up to {activeTimeline.gustKt}kt</span>
            </div>

            <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 space-y-1">
              <span className="text-slate-500 text-[10px] block uppercase font-bold flex items-center space-x-1">
                <Waves className="w-3.5 h-3.5 text-sky-400" />
                <span>Wave Height</span>
              </span>
              <strong className="text-teal-300 text-base font-black">{activeTimeline.waveHeightM} meters</strong>
              <span className="text-slate-400 text-[10px] block">Significant swell</span>
            </div>

            <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 space-y-1">
              <span className="text-slate-500 text-[10px] block uppercase font-bold flex items-center space-x-1">
                <Eye className="w-3.5 h-3.5 text-amber-400" />
                <span>Visibility</span>
              </span>
              <strong className="text-amber-300 text-base font-black">{activeTimeline.visibilityKm} km</strong>
              <span className="text-slate-400 text-[10px] block">Optical range</span>
            </div>

            <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 space-y-1">
              <span className="text-slate-500 text-[10px] block uppercase font-bold flex items-center space-x-1">
                <Plane className="w-3.5 h-3.5 text-emerald-400" />
                <span>Cloud Ceiling</span>
              </span>
              <strong className="text-emerald-300 text-base font-black">{activeTimeline.cloudCeilingFt} ft</strong>
              <span className="text-slate-400 text-[10px] block">Flight ceiling</span>
            </div>

            <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 space-y-1">
              <span className="text-slate-500 text-[10px] block uppercase font-bold flex items-center space-x-1">
                <Compass className="w-3.5 h-3.5 text-indigo-400" />
                <span>Barometer</span>
              </span>
              <strong className="text-indigo-300 text-base font-black">{activeTimeline.pressureHpa} hPa</strong>
              <span className="text-slate-400 text-[10px] block">Pressure trend</span>
            </div>

            <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 space-y-1">
              <span className="text-slate-500 text-[10px] block uppercase font-bold flex items-center space-x-1">
                <TrendingUp className="w-3.5 h-3.5 text-rose-400" />
                <span>Safety Rating</span>
              </span>
              <strong className="text-rose-300 text-base font-black">
                {activeTimeline.windSpeedKt > 30 ? 'HIGH RISK' : 'STABLE'}
              </strong>
              <span className="text-slate-400 text-[10px] block">Corridor Index</span>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: GLOBAL PORTS WEATHER TRENDS */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6 font-mono text-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-2">
            <Anchor className="w-5 h-5 text-teal-400" />
            <h2 className="text-lg font-black text-white">Global Air & Sea Ports Weather Trends Dashboard</h2>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-slate-400 text-[10px] uppercase font-bold">Region Filter:</span>
            <select
              value={activeRegionFilter}
              onChange={(e: any) => setActiveRegionFilter(e.target.value)}
              className="bg-slate-950 text-white font-bold py-1.5 px-3 rounded-xl border border-slate-800 focus:outline-none focus:border-cyan-400"
            >
              <option value="ALL">🌐 All Regions</option>
              <option value="ASIA_PACIFIC">🇮🇳 🇸🇬 Asia Pacific</option>
              <option value="MIDDLE_EAST_EUROPE">🇦🇪 🇳🇱 Middle East & Europe</option>
              <option value="AMERICAS">🇺🇸 Americas</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredPorts.map((port) => (
            <div
              key={port.portCode}
              className="bg-slate-950 border border-slate-800 hover:border-cyan-500/50 rounded-2xl p-5 space-y-4 transition-all shadow-xl"
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center space-x-2">
                  <span className="px-2.5 py-1 rounded-lg bg-teal-500/20 text-teal-300 border border-teal-500/30 font-bold">
                    {port.portCode}
                  </span>
                  <div>
                    <h3 className="text-sm font-extrabold text-white">{port.portName}</h3>
                    <span className="text-[10px] text-slate-400 block">{port.region.replace('_', ' ')}</span>
                  </div>
                </div>

                <span
                  className={`px-2.5 py-1 rounded-full text-[10px] font-black border ${
                    port.craneOrRunwayStatus === 'CRANE HOLD'
                      ? 'bg-rose-500/20 text-rose-300 border-rose-500/30'
                      : port.craneOrRunwayStatus === 'CROSSWIND ADVISORY'
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                      : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                  }`}
                >
                  {port.craneOrRunwayStatus}
                </span>
              </div>

              {/* Current Port Parameters */}
              <div className="grid grid-cols-3 gap-2 bg-slate-900 p-3 rounded-xl border border-slate-800 text-[11px]">
                <div>
                  <span className="text-slate-500 text-[10px] block">AIR TEMP / SST</span>
                  <strong className="text-amber-300">{port.currentTempC}°C / {port.seaSurfaceTempC}°C</strong>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] block">WIND SPEED</span>
                  <strong className="text-cyan-300">{port.windSpeedKt} kt</strong>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] block">SURGE RISK</span>
                  <strong
                    className={
                      port.monsoonSurgeRisk === 'HIGH' ? 'text-rose-400 font-bold' : 'text-emerald-400 font-bold'
                    }
                  >
                    {port.monsoonSurgeRisk}
                  </strong>
                </div>
              </div>

              {/* 5-Day Trend Visual Micro-Bars */}
              <div className="space-y-1.5">
                <span className="text-slate-400 text-[10px] font-bold uppercase block">5-Day Forecast Trend (Wind / Wave Height / Rain %):</span>
                <div className="grid grid-cols-5 gap-2 text-center text-[10px]">
                  {port.fiveDayTrend.map((d) => (
                    <div key={d.day} className="bg-slate-900 p-2 rounded-xl border border-slate-800 space-y-1">
                      <strong className="text-slate-300 block">{d.day}</strong>
                      <span className="text-cyan-400 font-bold block">{d.windKt}kt</span>
                      <span className="text-teal-300 block">{d.waveM}m</span>
                      <span className="text-amber-300 block">{d.rainProb}% 🌧️</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
