import React, { useState } from 'react';
import {
  Anchor,
  Wind,
  Waves,
  Thermometer,
  CloudRain,
  Sun,
  ShieldAlert,
  BarChart3,
  CheckCircle2,
  AlertTriangle,
  ArrowRightLeft,
  Plus,
  X,
  Compass
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend
} from 'recharts';

export interface PortClimateDetail {
  id: string;
  name: string;
  city: string;
  country: string;
  countryFlag: string;
  regionZone: string;
  waveHeightM: number;
  windSpeedKts: number;
  maxGustsKts: number;
  sstTempC: number;
  airTempC: number;
  rainfallMm: number;
  uvIndex: number;
  humidityPct: number;
  condition: string;
  severity: 'Critical' | 'Warning' | 'Normal';
  berthSafetyScore: number; // 0-100
  coordinates: string;
}

export const COMPARE_PORT_POOL: PortClimateDetail[] = [
  { id: 'GP-ROT', name: 'Port of Rotterdam', city: 'Rotterdam', country: 'Netherlands', countryFlag: '🇳🇱', regionZone: 'EUROPE', waveHeightM: 3.4, windSpeedKts: 34, maxGustsKts: 48, sstTempC: 17.5, airTempC: 18.0, rainfallMm: 65, uvIndex: 4, humidityPct: 82, condition: 'Gale Warning & Heavy Swell', severity: 'Warning', berthSafetyScore: 78, coordinates: '51.9° N, 4.2° E' },
  { id: 'GP-SIN', name: 'Singapore Container Hub', city: 'Singapore', country: 'Singapore', countryFlag: '🇸🇬', regionZone: 'PACIFIC', waveHeightM: 1.4, windSpeedKts: 14, maxGustsKts: 22, sstTempC: 30.2, airTempC: 32.0, rainfallMm: 110, uvIndex: 11, humidityPct: 88, condition: 'Tropical Squall & High UV', severity: 'Normal', berthSafetyScore: 94, coordinates: '1.2° N, 103.8° E' },
  { id: 'GP-NY', name: 'Port of New York / NJ', city: 'New York', country: 'United States', countryFlag: '🇺🇸', regionZone: 'ATLANTIC', waveHeightM: 2.8, windSpeedKts: 26, maxGustsKts: 38, sstTempC: 22.0, airTempC: 24.5, rainfallMm: 45, uvIndex: 7, humidityPct: 74, condition: 'Coastal Wind & Rain', severity: 'Warning', berthSafetyScore: 82, coordinates: '40.6° N, 74.0° W' },
  { id: 'GP-TYO', name: 'Tokyo Harbour', city: 'Tokyo', country: 'Japan', countryFlag: '🇯🇵', regionZone: 'PACIFIC', waveHeightM: 4.1, windSpeedKts: 32, maxGustsKts: 52, sstTempC: 24.5, airTempC: 26.0, rainfallMm: 140, uvIndex: 6, humidityPct: 85, condition: 'Typhoon Outer Bands', severity: 'Critical', berthSafetyScore: 62, coordinates: '35.6° N, 139.7° E' },
  { id: 'GP-CPT', name: 'Port of Cape Town', city: 'Cape Town', country: 'South Africa', countryFlag: '🇿🇦', regionZone: 'AFRICA', waveHeightM: 5.2, windSpeedKts: 38, maxGustsKts: 58, sstTempC: 15.8, airTempC: 16.5, rainfallMm: 25, uvIndex: 5, humidityPct: 68, condition: 'Agulhas Rogue Swells', severity: 'Critical', berthSafetyScore: 54, coordinates: '33.9° S, 18.4° E' },
  { id: 'GP-SAN', name: 'Port of Santos', city: 'Santos', country: 'Brazil', countryFlag: '🇧🇷', regionZone: 'AMERICAS', waveHeightM: 1.8, windSpeedKts: 16, maxGustsKts: 24, sstTempC: 26.2, airTempC: 28.0, rainfallMm: 30, uvIndex: 9, humidityPct: 76, condition: 'Partly Cloudy & Calm', severity: 'Normal', berthSafetyScore: 92, coordinates: '23.9° S, 46.3° W' },
  { id: 'GP-CMB', name: 'Colombo Harbour', city: 'Colombo', country: 'Sri Lanka', countryFlag: '🇱🇰', regionZone: 'INDIAN', waveHeightM: 2.2, windSpeedKts: 20, maxGustsKts: 30, sstTempC: 29.5, airTempC: 31.0, rainfallMm: 95, uvIndex: 10, humidityPct: 84, condition: 'SW Monsoon Swell', severity: 'Normal', berthSafetyScore: 88, coordinates: '6.9° N, 79.8° E' },
  { id: 'GP-CTG', name: 'Chittagong Port', city: 'Chattogram', country: 'Bangladesh', countryFlag: '🇧🇩', regionZone: 'INDIAN', waveHeightM: 4.8, windSpeedKts: 45, maxGustsKts: 62, sstTempC: 31.0, airTempC: 32.5, rainfallMm: 210, uvIndex: 8, humidityPct: 92, condition: 'Bay Trough Deep Surge', severity: 'Critical', berthSafetyScore: 48, coordinates: '22.3° N, 91.8° E' },
  { id: 'GP-MIA', name: 'Port of Miami', city: 'Miami', country: 'United States', countryFlag: '🇺🇸', regionZone: 'ATLANTIC', waveHeightM: 3.2, windSpeedKts: 28, maxGustsKts: 42, sstTempC: 30.8, airTempC: 33.0, rainfallMm: 180, uvIndex: 11, humidityPct: 86, condition: 'Tropical Depression', severity: 'Warning', berthSafetyScore: 71, coordinates: '25.7° N, 80.1° W' },
  { id: 'GP-DXB', name: 'Jebel Ali Port', city: 'Dubai', country: 'United Arab Emirates', countryFlag: '🇦🇪', regionZone: 'INDIAN', waveHeightM: 0.9, windSpeedKts: 15, maxGustsKts: 22, sstTempC: 33.5, airTempC: 41.0, rainfallMm: 0, uvIndex: 12, humidityPct: 55, condition: 'Extreme Desert Heat', severity: 'Normal', berthSafetyScore: 96, coordinates: '25.0° N, 55.0° E' }
];

export const ComparePortClimatesModule: React.FC = () => {
  const [selectedPortIds, setSelectedPortIds] = useState<string[]>(['GP-ROT', 'GP-TYO', 'GP-CTG']);

  const selectedPorts = selectedPortIds
    .map((id) => COMPARE_PORT_POOL.find((p) => p.id === id))
    .filter(Boolean) as PortClimateDetail[];

  const handleTogglePort = (id: string) => {
    if (selectedPortIds.includes(id)) {
      if (selectedPortIds.length > 2) {
        setSelectedPortIds((prev) => prev.filter((i) => i !== id));
      }
    } else {
      if (selectedPortIds.length < 4) {
        setSelectedPortIds((prev) => [...prev, id]);
      }
    }
  };

  // Recharts Bar Data
  const chartComparisonData = selectedPorts.map((p) => ({
    port: p.city,
    WaveHeight: p.waveHeightM,
    WindSpeed: p.windSpeedKts,
    Rainfall: p.rainfallMm / 10, // scaled for chart visibility
    SST_Temp: p.sstTempC
  }));

  return (
    <div className="bg-slate-950 border border-cyan-500/40 rounded-2xl p-6 text-white space-y-6 font-mono shadow-2xl">
      {/* HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center space-x-2 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-1">
            <ArrowRightLeft className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span>CROSS-HUB METEOROLOGICAL COMPARISON TOOL</span>
          </div>
          <h2 className="text-2xl font-black text-white flex items-center space-x-2">
            <span>Compare Port Climates & Berth Conditions</span>
          </h2>
          <p className="text-xs text-slate-400 font-sans mt-1 max-w-3xl">
            Side-by-side comparison of ocean swell, gale gusts, sea surface temperatures, rainfall, and berth safety scores across global port hubs.
          </p>
        </div>

        {/* PORT SELECTION CHIPS */}
        <div className="flex flex-wrap items-center gap-1.5 bg-slate-900 p-2 rounded-xl border border-slate-800 text-xs">
          <span className="text-slate-400 text-[10px] font-bold px-1 uppercase">Select Ports (2-4):</span>
          {COMPARE_PORT_POOL.map((p) => {
            const isSelected = selectedPortIds.includes(p.id);
            return (
              <button
                key={p.id}
                onClick={() => handleTogglePort(p.id)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all flex items-center space-x-1 ${
                  isSelected
                    ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                    : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <span>{p.countryFlag}</span>
                <span>{p.city}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* COMPARATIVE CARDS GRID */}
      <div className={`grid grid-cols-1 md:grid-cols-${selectedPorts.length} gap-4`}>
        {selectedPorts.map((port) => (
          <div
            key={port.id}
            className={`p-5 rounded-2xl border space-y-4 flex flex-col justify-between transition-all ${
              port.severity === 'Critical'
                ? 'bg-rose-950/20 border-rose-500/60 shadow-lg shadow-rose-950/40'
                : port.severity === 'Warning'
                ? 'bg-amber-950/20 border-amber-500/60 shadow-lg shadow-amber-950/40'
                : 'bg-slate-900 border-slate-800'
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between border-b border-slate-800/80 pb-3">
                <div>
                  <span className="text-base mr-1.5">{port.countryFlag}</span>
                  <strong className="text-white font-black text-lg">{port.name}</strong>
                  <span className="text-slate-400 text-[10px] block">{port.coordinates} • {port.regionZone}</span>
                </div>

                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                    port.severity === 'Critical'
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 animate-pulse'
                      : port.severity === 'Warning'
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                      : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  }`}
                >
                  {port.severity}
                </span>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs font-sans">
                <span className="text-[10px] text-slate-400 font-mono uppercase block font-bold">CURRENT CONDITION:</span>
                <p className="text-cyan-300 font-bold mt-0.5">{port.condition}</p>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                  <span className="text-slate-500 text-[9px] uppercase block">SWELL HEIGHT</span>
                  <strong className={`text-sm ${port.waveHeightM > 3.5 ? 'text-rose-400' : 'text-emerald-400'}`}>
                    🌊 {port.waveHeightM} m
                  </strong>
                </div>

                <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                  <span className="text-slate-500 text-[9px] uppercase block">WIND / GUSTS</span>
                  <strong className="text-sm text-cyan-300">
                    💨 {port.windSpeedKts} / {port.maxGustsKts} kts
                  </strong>
                </div>

                <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                  <span className="text-slate-500 text-[9px] uppercase block">SST TEMP (°C)</span>
                  <strong className="text-sm text-amber-300">
                    🌡️ {port.sstTempC}°C
                  </strong>
                </div>

                <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                  <span className="text-slate-500 text-[9px] uppercase block">RAINFALL RATE</span>
                  <strong className="text-sm text-sky-400">
                    🌧️ {port.rainfallMm} mm
                  </strong>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 space-y-1 text-[10px] font-mono">
              <div className="flex justify-between">
                <span className="text-slate-400">Berth Safety Score:</span>
                <strong className={port.berthSafetyScore > 80 ? 'text-emerald-400' : 'text-rose-400'}>
                  {port.berthSafetyScore} / 100
                </strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">UV Index:</span>
                <strong className="text-amber-300">UV {port.uvIndex}</strong>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* COMPARATIVE BAR CHART */}
      <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-3">
        <div className="border-b border-slate-800 pb-3 flex items-center space-x-2">
          <BarChart3 className="w-5 h-5 text-cyan-400" />
          <strong className="text-white font-extrabold text-sm">Port Climate Comparative Chart</strong>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartComparisonData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="port" stroke="#94a3b8" fontSize={11} />
              <YAxis stroke="#94a3b8" fontSize={11} />
              <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.75rem', color: '#fff' }} />
              <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
              <Bar dataKey="WaveHeight" name="Swell Wave Height (m)" fill="#10b981" radius={[4, 4, 0, 0]} />
              <Bar dataKey="WindSpeed" name="Wind Speed (Knots)" fill="#06b6d4" radius={[4, 4, 0, 0]} />
              <Bar dataKey="SST_Temp" name="Sea Surface Temp (°C)" fill="#f59e0b" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
