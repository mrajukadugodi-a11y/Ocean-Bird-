import React, { useState } from 'react';
import { CloudRain, Wind, Eye, Compass, Waves, Thermometer, ShieldAlert, CheckCircle2, Search } from 'lucide-react';
import { motion } from 'motion/react';
import { hapticEngine } from '../../utils/hapticUtils';

export interface PortWeather {
  id: string;
  portName: string;
  unLocode: string;
  region: string;
  windSpeedKnots: number;
  windDirectionDegrees: number;
  waveHeightMeters: number;
  visibilityNauticalMiles: number;
  airTempC: number;
  galeWarningActive: boolean;
  operabilityStatus: 'OPEN_NORMAL' | 'GALE_WARNING_ADVISORY' | 'PORT_CLOSED_HIGH_SEAS' | 'ICE_ESCORT_MANDATORY';
}

const PORT_WEATHER_DATA: PortWeather[] = [
  {
    id: 'WX-CPH',
    portName: 'Port of Copenhagen & Malmö',
    unLocode: 'DK CPH',
    region: 'Baltic Sea / Danish Straits',
    windSpeedKnots: 22.4,
    windDirectionDegrees: 240,
    waveHeightMeters: 1.8,
    visibilityNauticalMiles: 8.5,
    airTempC: 16.2,
    galeWarningActive: false,
    operabilityStatus: 'OPEN_NORMAL'
  },
  {
    id: 'WX-HEL',
    portName: 'Port of Helsinki',
    unLocode: 'FI HEL',
    region: 'Gulf of Finland',
    windSpeedKnots: 34.0,
    windDirectionDegrees: 210,
    waveHeightMeters: 3.2,
    visibilityNauticalMiles: 4.0,
    airTempC: 14.0,
    galeWarningActive: true,
    operabilityStatus: 'GALE_WARNING_ADVISORY'
  },
  {
    id: 'WX-RTM',
    portName: 'Port of Rotterdam',
    unLocode: 'NL RTM',
    region: 'North Sea Transit',
    windSpeedKnots: 18.0,
    windDirectionDegrees: 280,
    waveHeightMeters: 1.5,
    visibilityNauticalMiles: 10.0,
    airTempC: 19.5,
    galeWarningActive: false,
    operabilityStatus: 'OPEN_NORMAL'
  },
  {
    id: 'WX-SIN',
    portName: 'Port of Singapore',
    unLocode: 'SG SIN',
    region: 'Singapore Strait',
    windSpeedKnots: 12.5,
    windDirectionDegrees: 160,
    waveHeightMeters: 0.8,
    visibilityNauticalMiles: 6.0,
    airTempC: 31.4,
    galeWarningActive: false,
    operabilityStatus: 'OPEN_NORMAL'
  },
  {
    id: 'WX-ADE',
    portName: 'Port of Aden / Bab-el-Mandeb',
    unLocode: 'YE ADE',
    region: 'Red Sea / Gulf of Aden',
    windSpeedKnots: 28.6,
    windDirectionDegrees: 110,
    waveHeightMeters: 2.8,
    visibilityNauticalMiles: 5.2,
    airTempC: 36.8,
    galeWarningActive: true,
    operabilityStatus: 'GALE_WARNING_ADVISORY'
  }
];

export const RegionalPortWeatherView: React.FC = () => {
  const [ports, setPorts] = useState<PortWeather[]>(PORT_WEATHER_DATA);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredPorts = ports.filter((p) =>
    p.portName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.region.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.unLocode.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-2xl space-y-4 font-mono text-xs"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="space-y-0.5">
          <h3 className="text-xs font-bold text-white uppercase flex items-center space-x-2">
            <CloudRain className="w-4 h-4 text-cyan-400" />
            <span>Regional Port & Strait Marine Meteorological Weather Feed</span>
          </h3>
          <p className="text-[10px] text-slate-400 font-sans">
            Real-time wave heights, gale wind vectors, visibility limits, and port terminal operation status warnings
          </p>
        </div>

        <span className="bg-cyan-950 text-cyan-300 border border-cyan-800 text-[10px] px-2.5 py-1 rounded font-bold">
          LIVE METEOROLOGICAL FEED
        </span>
      </div>

      <div className="bg-slate-950 border border-slate-800 p-3 rounded-2xl flex items-center">
        <Search className="w-4 h-4 text-slate-500 mr-2" />
        <input
          type="text"
          placeholder="Search port weather by port name, region, or UN/LOCODE..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-transparent text-xs text-white placeholder-slate-500 focus:outline-none font-sans"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {filteredPorts.map((p) => (
          <div key={p.id} className="bg-slate-950 border border-slate-800 p-4 rounded-2xl space-y-3">
            <div className="flex justify-between items-start border-b border-slate-900 pb-2">
              <div>
                <span className="text-[8px] text-cyan-400 font-bold block">{p.unLocode}</span>
                <h4 className="text-xs font-bold text-white">{p.portName}</h4>
                <span className="text-[9px] text-slate-400 block font-sans">{p.region}</span>
              </div>
              <span className={`text-[8px] font-bold px-2 py-0.5 rounded ${
                p.galeWarningActive
                  ? 'bg-rose-950 text-rose-300 border border-rose-800 animate-pulse'
                  : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
              }`}>
                {p.operabilityStatus.replace(/_/g, ' ')}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[9px] font-mono bg-slate-900 p-2.5 rounded-xl border border-slate-800">
              <div>
                <span className="text-slate-500 block">WIND VECTOR:</span>
                <span className="text-amber-300 font-bold">{p.windSpeedKnots} kts @ {p.windDirectionDegrees}°</span>
              </div>
              <div>
                <span className="text-slate-500 block">WAVE HEIGHT:</span>
                <span className="text-cyan-300 font-bold">{p.waveHeightMeters} m</span>
              </div>
              <div>
                <span className="text-slate-500 block">VISIBILITY:</span>
                <span className="text-white font-bold">{p.visibilityNauticalMiles} NM</span>
              </div>
              <div>
                <span className="text-slate-500 block">AIR TEMP:</span>
                <span className="text-emerald-400 font-bold">{p.airTempC}°C</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};
