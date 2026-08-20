import React, { useState, useRef, useEffect } from 'react';
import {
  Compass,
  Layers,
  Eye,
  Crosshair,
  Maximize2,
  Anchor,
  Navigation,
  ShieldAlert,
  Info,
  MapPin,
  Waves,
  Sun,
  Moon,
  Zap,
  Globe,
  SlidersHorizontal,
  RotateCcw
} from 'lucide-react';

export type ChartLayerMode = 'ECDIS_STANDARD' | 'BATHYMETRY' | 'SATELLITE_OVERLAY' | 'NIGHT_VISION';

export interface NauticalFeature {
  id: string;
  name: string;
  type: 'LIGHTHOUSE' | 'BUOY' | 'WRECK' | 'REEF' | 'TRAFFIC_SEPARATION' | 'PORT';
  coordinates: string;
  lat: number;
  lng: number;
  depthMeters: number;
  characteristics?: string;
  description: string;
}

const NAUTICAL_FEATURES: NauticalFeature[] = [
  {
    id: 'NF-01',
    name: 'Horsburgh Lighthouse',
    type: 'LIGHTHOUSE',
    coordinates: "01° 19.8' N, 104° 24.3' E",
    lat: 1.33,
    lng: 104.4,
    depthMeters: 18,
    characteristics: 'Fl(2) W 15s 31m 20M',
    description: 'Flash white light every 15s. Marks Eastern entrance to Singapore Strait.'
  },
  {
    id: 'NF-02',
    name: 'Adams Bridge Shoal Reef',
    type: 'REEF',
    coordinates: "09° 05.4' N, 079° 32.1' E",
    lat: 9.09,
    lng: 79.53,
    depthMeters: 2.1,
    description: 'Shallow sandbars connecting Rameswaram Island to Mannar Island. Critical draft hazard.'
  },
  {
    id: 'NF-03',
    name: 'Colombo Port Outer Fairway Buoy',
    type: 'BUOY',
    coordinates: "06° 57.2' N, 079° 50.0' E",
    lat: 6.95,
    lng: 79.83,
    depthMeters: 22.5,
    characteristics: 'Mo(A) W 10s (Safe Water)',
    description: 'Red and white vertical stripes buoy marking safe water entrance into Colombo harbor channel.'
  },
  {
    id: 'NF-04',
    name: 'Sunken Cargo Vessel Wreck #4',
    type: 'WRECK',
    coordinates: "18° 52.0' N, 072° 49.0' E",
    lat: 18.86,
    lng: 72.81,
    depthMeters: 8.4,
    description: 'Submerged metal wreck clearance 8.4 meters. Uncovered at chart datum low tide.'
  },
  {
    id: 'NF-05',
    name: 'Palk Strait Traffic Separation Scheme',
    type: 'TRAFFIC_SEPARATION',
    coordinates: "09° 45.0' N, 079° 58.0' E",
    lat: 9.75,
    lng: 79.96,
    depthMeters: 14.0,
    description: 'IMO Designated Traffic Separation Scheme for vessels under 12 meters draft.'
  }
];

export const NauticalChartView: React.FC = () => {
  const [chartMode, setChartMode] = useState<ChartLayerMode>('ECDIS_STANDARD');
  const [showDepthContours, setShowDepthContours] = useState(true);
  const [showBuoyage, setShowBuoyage] = useState(true);
  const [showTrafficLanes, setShowTrafficLanes] = useState(true);
  const [showHazards, setShowHazards] = useState(true);

  // Vessel Position state (Current ship coordinates)
  const [shipPosition] = useState({
    name: 'MV OCEAN BIRD',
    lat: 12.8,
    lng: 80.2,
    coordinates: "12° 48.0' N, 080° 12.0' E",
    heading: 142,
    speedKts: 16.4,
    draftMeters: 10.5
  });

  // Interactive Target Measuring Tool
  const [selectedFeature, setSelectedFeature] = useState<NauticalFeature | null>(NAUTICAL_FEATURES[0]);
  const [measuredRange, setMeasuredRange] = useState<number>(14.2); // NM
  const [measuredBearing, setMeasuredBearing] = useState<number>(128); // Degrees

  return (
    <div id="nautical-chart-view" className="space-y-6">
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center space-x-2 text-purple-400 font-bold text-xs uppercase tracking-wider mb-1">
              <Compass className="w-4 h-4 text-purple-400 animate-spin" />
              <span>IMO S-57 / S-63 DIGITAL NAUTICAL CHART ENGINE</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center space-x-2">
              <Layers className="w-6 h-6 text-purple-400" />
              <span>Nautical Chart View & Bathymetry Navigator</span>
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl">
              Electronic Chart Display & Information System (ECDIS) with depth soundings, IALA buoys, lighthouses, submerged hazards, and live bearing/range measurement.
            </p>
          </div>

          {/* Mode Switcher */}
          <div className="flex flex-wrap items-center gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800 font-mono text-xs">
            {(
              [
                { id: 'ECDIS_STANDARD', label: 'ECDIS Standard' },
                { id: 'BATHYMETRY', label: 'Bathymetry Gradient' },
                { id: 'SATELLITE_OVERLAY', label: 'Satellite Chart' },
                { id: 'NIGHT_VISION', label: 'Night Vision (Red)' }
              ] as const
            ).map((mode) => (
              <button
                key={mode.id}
                onClick={() => setChartMode(mode.id)}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  chartMode === mode.id
                    ? 'bg-purple-600 text-white font-bold shadow-lg shadow-purple-600/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {mode.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Chart Canvas Simulator & Control Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main ECDIS Chart Canvas Area (3 Spans) */}
        <div className="lg:col-span-3 space-y-4">
          {/* Chart Display Canvas Box */}
          <div
            className={`rounded-2xl border p-4 sm:p-6 transition-all shadow-2xl relative min-h-[500px] flex flex-col justify-between overflow-hidden ${
              chartMode === 'NIGHT_VISION'
                ? 'bg-red-950/80 border-red-800 text-red-200'
                : chartMode === 'BATHYMETRY'
                ? 'bg-gradient-to-br from-cyan-950 via-sky-900 to-slate-950 border-cyan-800 text-cyan-100'
                : chartMode === 'SATELLITE_OVERLAY'
                ? 'bg-slate-950 border-purple-800 text-slate-100'
                : 'bg-slate-950 border-slate-800 text-slate-100'
            }`}
          >
            {/* Compass Rose Background Watermark */}
            <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
              <Compass className="w-96 h-96 text-purple-400 animate-spin" style={{ animationDuration: '120s' }} />
            </div>

            {/* Top Chart Overlay Controls */}
            <div className="flex flex-wrap items-center justify-between gap-3 relative z-10 bg-slate-900/90 backdrop-blur border border-slate-800 p-3 rounded-xl font-mono text-xs">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                <span className="font-bold text-white">VESSEL: {shipPosition.name}</span>
                <span className="text-cyan-300 hidden sm:inline">({shipPosition.coordinates})</span>
              </div>

              <div className="flex items-center space-x-4 text-[11px] text-slate-300">
                <span>HDG: <strong className="text-white">{shipPosition.heading}°</strong></span>
                <span>SOG: <strong className="text-emerald-400">{shipPosition.speedKts} Kts</strong></span>
                <span>DRAFT: <strong className="text-amber-300">{shipPosition.draftMeters} m</strong></span>
              </div>
            </div>

            {/* Simulated Interactive Map Display Grid */}
            <div className="my-6 relative z-10 space-y-6">
              {/* Depth Contours Grid */}
              <div className="p-4 bg-slate-900/70 backdrop-blur rounded-xl border border-slate-800 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-2 text-xs font-mono">
                  <span className="text-purple-400 font-bold flex items-center space-x-1">
                    <Waves className="w-4 h-4 text-purple-400" />
                    <span>ISOBATH DEPTH CONTOURS & CHART DATUM</span>
                  </span>
                  <span className="text-slate-400 text-[10px]">SOUNDINGS IN METERS</span>
                </div>

                {/* Depth Zones Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                  <div className="p-3 bg-rose-950/40 border border-rose-500/30 rounded-lg">
                    <span className="text-[10px] text-rose-400 font-bold block">SHALLOW REEF (&lt; 5m)</span>
                    <span className="text-white text-sm font-bold">UNSAFE DRAFT</span>
                  </div>
                  <div className="p-3 bg-amber-950/40 border border-amber-500/30 rounded-lg">
                    <span className="text-[10px] text-amber-400 font-bold block">COASTAL (5m - 20m)</span>
                    <span className="text-white text-sm font-bold">NAVIGATE CAUTION</span>
                  </div>
                  <div className="p-3 bg-cyan-950/40 border border-cyan-500/30 rounded-lg">
                    <span className="text-[10px] text-cyan-400 font-bold block">SHELF (20m - 100m)</span>
                    <span className="text-white text-sm font-bold">SAFE WATER</span>
                  </div>
                  <div className="p-3 bg-blue-950/40 border border-blue-500/30 rounded-lg">
                    <span className="text-[10px] text-blue-400 font-bold block">DEEP SEA (&gt; 100m)</span>
                    <span className="text-white text-sm font-bold">OPEN OCEAN</span>
                  </div>
                </div>
              </div>

              {/* Navigation Aids & Hazards Selector Grid */}
              <div className="space-y-2">
                <span className="text-[11px] text-slate-400 font-mono uppercase font-bold">
                  NAUTICAL MARITIME FEATURES IN REGION:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {NAUTICAL_FEATURES.map((feature) => {
                    const isSelected = selectedFeature?.id === feature.id;

                    return (
                      <button
                        key={feature.id}
                        onClick={() => {
                          setSelectedFeature(feature);
                          // Calculate simulated bearing & range
                          setMeasuredRange(Math.round((10 + Math.random() * 20) * 10) / 10);
                          setMeasuredBearing(Math.floor(40 + Math.random() * 280));
                        }}
                        className={`p-3 rounded-xl border text-left transition-all font-mono text-xs flex items-start justify-between space-x-2 ${
                          isSelected
                            ? 'bg-purple-950/60 border-purple-500 text-white shadow-lg'
                            : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-bold text-purple-300">{feature.name}</span>
                            <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                              {feature.type}
                            </span>
                          </div>
                          <p className="text-[10px] text-slate-400 mt-1">{feature.coordinates}</p>
                        </div>
                        <span className="text-cyan-400 font-bold shrink-0">{feature.depthMeters} m</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Bottom Target Range & Bearing Telemetry Bar */}
            {selectedFeature && (
              <div className="relative z-10 bg-slate-900/90 backdrop-blur border border-purple-500/40 p-4 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono">
                <div className="flex items-center space-x-3">
                  <Crosshair className="w-5 h-5 text-purple-400 animate-pulse" />
                  <div>
                    <span className="text-[10px] text-purple-300 font-bold uppercase block">SELECTED CHART AID / TARGET:</span>
                    <strong className="text-white text-sm">{selectedFeature.name}</strong>
                  </div>
                </div>

                <div className="flex items-center space-x-6 text-slate-300">
                  <div>
                    <span className="text-[10px] text-slate-400 block">RANGE (DISTANCE)</span>
                    <strong className="text-cyan-400 text-base">{measuredRange} NM</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">TRUE BEARING</span>
                    <strong className="text-amber-400 text-base">{measuredBearing}° T</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">MIN DEPTH</span>
                    <strong className="text-emerald-400 text-base">{selectedFeature.depthMeters} m</strong>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Sidebar: Layers & Chart Options (1 Span) */}
        <div className="space-y-6">
          {/* Layer Visibility Toggles */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
            <h3 className="font-bold text-white text-sm flex items-center space-x-2 border-b border-slate-800 pb-3">
              <SlidersHorizontal className="w-4 h-4 text-purple-400" />
              <span>Chart Layer Controls</span>
            </h3>

            <div className="space-y-3 text-xs">
              {[
                { label: 'Depth Contours & Isobaths', state: showDepthContours, setter: setShowDepthContours },
                { label: 'Buoyage & Lighthouses (IALA)', state: showBuoyage, setter: setShowBuoyage },
                { label: 'Traffic Separation Schemes (TSS)', state: showTrafficLanes, setter: setShowTrafficLanes },
                { label: 'Submerged Hazards & Wrecks', state: showHazards, setter: setShowHazards }
              ].map(({ label, state, setter }, i) => (
                <button
                  key={i}
                  onClick={() => setter(!state)}
                  className={`w-full p-3 rounded-xl border text-left flex items-center justify-between transition-all font-mono ${
                    state
                      ? 'bg-purple-950/40 border-purple-500/50 text-purple-200'
                      : 'bg-slate-950 border-slate-800 text-slate-500'
                  }`}
                >
                  <span>{label}</span>
                  <span
                    className={`w-3 h-3 rounded-full ${
                      state ? 'bg-purple-400 animate-pulse' : 'bg-slate-700'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Feature Info Card */}
          {selectedFeature && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-xl">
              <h4 className="font-bold text-white text-xs uppercase tracking-wider text-purple-400 border-b border-slate-800 pb-2">
                Nautical Feature Details
              </h4>

              <div className="space-y-2 text-xs font-mono text-slate-300">
                <p><strong className="text-white">Name:</strong> {selectedFeature.name}</p>
                <p><strong className="text-white">Type:</strong> {selectedFeature.type}</p>
                <p><strong className="text-white">Position:</strong> {selectedFeature.coordinates}</p>
                <p><strong className="text-white">Chart Depth:</strong> {selectedFeature.depthMeters} meters</p>
                {selectedFeature.characteristics && (
                  <p><strong className="text-amber-300">Light Char:</strong> {selectedFeature.characteristics}</p>
                )}
                <p className="text-slate-400 text-[11px] leading-relaxed pt-2 border-t border-slate-800">
                  {selectedFeature.description}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
