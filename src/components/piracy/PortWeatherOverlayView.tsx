import React, { useState } from 'react';
import { CloudRain, Wind, Eye, Compass, Waves, Anchor, AlertTriangle, ShieldCheck, CheckCircle2, RefreshCw } from 'lucide-react';
import { motion } from 'motion/react';
import { hapticEngine } from '../../utils/hapticUtils';

export interface PortWeatherOverlayData {
  portId: string;
  portName: string;
  country: string;
  windSpeedKnots: number;
  windDirectionDegrees: number;
  windGustKnots: number;
  waveSwellHeightMeters: number;
  visibilityNM: number;
  barometricPressureHpa: number;
  operabilityStatus: 'FULL_OPERATIONAL' | 'CRANE_RESTRICTED_WINDS' | 'BERTH_SUSPENDED_SWELL' | 'PORT_CLOSED_STORM';
  activeOverlayLayers: {
    windVectors: boolean;
    waveSwells: boolean;
    fogVisibility: boolean;
    radarRain: boolean;
  };
}

const PORT_WEATHER_DATA: PortWeatherOverlayData[] = [
  {
    portId: 'PW-01',
    portName: 'Port of Rotterdam',
    country: 'Netherlands',
    windSpeedKnots: 28,
    windDirectionDegrees: 240,
    windGustKnots: 38,
    waveSwellHeightMeters: 2.8,
    visibilityNM: 4.2,
    barometricPressureHpa: 994,
    operabilityStatus: 'CRANE_RESTRICTED_WINDS',
    activeOverlayLayers: { windVectors: true, waveSwells: true, fogVisibility: false, radarRain: true }
  },
  {
    portId: 'PW-02',
    portName: 'Port of Singapore',
    country: 'Singapore',
    windSpeedKnots: 12,
    windDirectionDegrees: 110,
    windGustKnots: 16,
    waveSwellHeightMeters: 0.8,
    visibilityNM: 8.5,
    barometricPressureHpa: 1008,
    operabilityStatus: 'FULL_OPERATIONAL',
    activeOverlayLayers: { windVectors: true, waveSwells: false, fogVisibility: false, radarRain: true }
  },
  {
    portId: 'PW-03',
    portName: 'Port of Shanghai (Yangshan)',
    country: 'China',
    windSpeedKnots: 42,
    windDirectionDegrees: 45,
    windGustKnots: 56,
    waveSwellHeightMeters: 4.5,
    visibilityNM: 1.2,
    barometricPressureHpa: 982,
    operabilityStatus: 'PORT_CLOSED_STORM',
    activeOverlayLayers: { windVectors: true, waveSwells: true, fogVisibility: true, radarRain: true }
  },
  {
    portId: 'PW-04',
    portName: 'Port of Busan',
    country: 'South Korea',
    windSpeedKnots: 22,
    windDirectionDegrees: 180,
    windGustKnots: 30,
    waveSwellHeightMeters: 2.2,
    visibilityNM: 6.0,
    barometricPressureHpa: 1002,
    operabilityStatus: 'BERTH_SUSPENDED_SWELL',
    activeOverlayLayers: { windVectors: true, waveSwells: true, fogVisibility: false, radarRain: false }
  }
];

export const PortWeatherOverlayView: React.FC = () => {
  const [ports, setPorts] = useState<PortWeatherOverlayData[]>(PORT_WEATHER_DATA);
  const [selectedPort, setSelectedPort] = useState<PortWeatherOverlayData>(PORT_WEATHER_DATA[0]);

  const toggleLayer = (portId: string, layerKey: keyof PortWeatherOverlayData['activeOverlayLayers']) => {
    setPorts(prev => prev.map(p => {
      if (p.portId === portId) {
        return {
          ...p,
          activeOverlayLayers: {
            ...p.activeOverlayLayers,
            [layerKey]: !p.activeOverlayLayers[layerKey]
          }
        };
      }
      return p;
    }));

    if (selectedPort.portId === portId) {
      setSelectedPort(prev => ({
        ...prev,
        activeOverlayLayers: {
          ...prev.activeOverlayLayers,
          [layerKey]: !prev.activeOverlayLayers[layerKey]
        }
      }));
    }
    hapticEngine.trigger('click');
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'FULL_OPERATIONAL':
        return <span className="bg-emerald-950 text-emerald-300 border border-emerald-800 text-[9px] px-2 py-0.5 rounded font-bold">100% OPERATIONAL</span>;
      case 'CRANE_RESTRICTED_WINDS':
        return <span className="bg-amber-950 text-amber-300 border border-amber-800 text-[9px] px-2 py-0.5 rounded font-bold">CRANE WIND RESTRICTION</span>;
      case 'BERTH_SUSPENDED_SWELL':
        return <span className="bg-orange-950 text-orange-300 border border-orange-800 text-[9px] px-2 py-0.5 rounded font-bold">BERTHING SUSPENDED</span>;
      default:
        return <span className="bg-rose-950 text-rose-300 border border-rose-800 text-[9px] px-2 py-0.5 rounded font-bold">PORT CLOSED (STORM)</span>;
    }
  };

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
            <span>Interactive Port Weather Layer Overlay & Terminal Operability Radar</span>
          </h3>
          <p className="text-[10px] text-slate-400 font-sans">
            Real-time wind vector field overlays, wave swell height contours, fog visibility limits, and crane safety threshold monitoring
          </p>
        </div>

        <span className="bg-cyan-950 text-cyan-300 border border-cyan-800 text-[10px] px-2.5 py-1 rounded font-bold flex items-center space-x-1">
          <Wind className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
          <span>LIVE VTS WEATHER RADAR</span>
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Port Weather List */}
        <div className="lg:col-span-1 space-y-2">
          {ports.map((pt) => (
            <div
              key={pt.portId}
              onClick={() => {
                setSelectedPort(pt);
                hapticEngine.trigger('click');
              }}
              className={`p-3.5 rounded-2xl border cursor-pointer transition-all space-y-2 ${
                selectedPort.portId === pt.portId
                  ? 'bg-slate-950 border-cyan-400 ring-1 ring-cyan-400'
                  : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex justify-between items-center">
                <span className="text-[8px] text-cyan-400 font-bold">{pt.portId}</span>
                {getStatusBadge(pt.operabilityStatus)}
              </div>
              <h4 className="text-xs font-bold text-white">{pt.portName}</h4>
              <div className="flex justify-between text-[9px] text-slate-400 pt-1 border-t border-slate-900">
                <span>Wind: {pt.windSpeedKnots} kts (G{pt.windGustKnots})</span>
                <span>Swell: {pt.waveSwellHeightMeters}m</span>
              </div>
            </div>
          ))}
        </div>

        {/* Selected Port Detailed Weather Overlay & Layer Toggles */}
        <div className="lg:col-span-2 bg-slate-950 border border-slate-800 p-5 rounded-2xl space-y-4 font-mono">
          <div className="flex justify-between items-start border-b border-slate-800 pb-3">
            <div>
              <span className="text-[8px] text-cyan-400 font-bold block">{selectedPort.portId} VTS WEATHER TELEMETRY</span>
              <h4 className="text-sm font-bold text-white">{selectedPort.portName} ({selectedPort.country})</h4>
              <span className="text-[10px] text-slate-400 block font-sans">Pressure: {selectedPort.barometricPressureHpa} hPa</span>
            </div>
            {getStatusBadge(selectedPort.operabilityStatus)}
          </div>

          {/* Realtime Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-[10px]">
            <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 space-y-1">
              <span className="text-slate-500 font-bold block">SUSTAINED WIND</span>
              <span className="text-cyan-300 font-black text-sm">{selectedPort.windSpeedKnots} KTS</span>
              <span className="text-[8px] text-slate-400 block font-sans">Dir: {selectedPort.windDirectionDegrees}°</span>
            </div>

            <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 space-y-1">
              <span className="text-slate-500 font-bold block">PEAK WIND GUST</span>
              <span className="text-amber-400 font-black text-sm">{selectedPort.windGustKnots} KTS</span>
              <span className="text-[8px] text-amber-300 block font-sans">Crane Limit: 35 kts</span>
            </div>

            <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 space-y-1">
              <span className="text-slate-500 font-bold block">WAVE SWELL HEIGHT</span>
              <span className="text-rose-400 font-black text-sm">{selectedPort.waveSwellHeightMeters} M</span>
              <span className="text-[8px] text-rose-300 block font-sans">Berth Limit: 2.0m</span>
            </div>

            <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 space-y-1">
              <span className="text-slate-500 font-bold block">VISIBILITY</span>
              <span className="text-emerald-400 font-black text-sm">{selectedPort.visibilityNM} NM</span>
              <span className="text-[8px] text-emerald-300 block font-sans">Min VTS: 2.0 NM</span>
            </div>
          </div>

          {/* Map Overlay Layer Controls */}
          <div className="space-y-2 pt-2 border-t border-slate-900">
            <span className="text-[9px] text-slate-500 font-bold block">MAP OVERLAY LAYER TOGGLES:</span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { key: 'windVectors', label: 'WIND VECTORS', icon: Wind },
                { key: 'waveSwells', label: 'WAVE SWELLS', icon: Waves },
                { key: 'fogVisibility', label: 'FOG VISIBILITY', icon: Eye },
                { key: 'radarRain', label: 'RADAR RAIN', icon: CloudRain }
              ].map((layer) => {
                const isActive = selectedPort.activeOverlayLayers[layer.key as keyof PortWeatherOverlayData['activeOverlayLayers']];
                const IconComp = layer.icon;
                return (
                  <button
                    key={layer.key}
                    onClick={() => toggleLayer(selectedPort.portId, layer.key as any)}
                    className={`p-2.5 rounded-xl border text-[9px] font-bold flex items-center justify-between transition-all ${
                      isActive
                        ? 'bg-cyan-950 border-cyan-400 text-cyan-300 font-black'
                        : 'bg-slate-900 border-slate-800 text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    <span className="flex items-center space-x-1.5">
                      <IconComp className="w-3.5 h-3.5" />
                      <span>{layer.label}</span>
                    </span>
                    <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-cyan-400 animate-ping' : 'bg-slate-700'}`} />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
