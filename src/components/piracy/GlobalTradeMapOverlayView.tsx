import React, { useState } from 'react';
import { Compass, Navigation, Globe, Filter, Layers, Zap, Info, ShieldAlert, Anchor, ArrowUpRight } from 'lucide-react';
import { hapticEngine } from '../../utils/hapticUtils';

export interface TradeRoute {
  id: string;
  name: string;
  commodityType: 'CONTAINER' | 'CRUDE_OIL' | 'LNG' | 'BULK_GRAIN' | 'TIMBER';
  origin: { name: string; x: number; y: number };
  destination: { name: string; x: number; y: number };
  intermediatePoints: { x: number; y: number }[];
  annualTeuVolume: string;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH_CHOKEPOINT';
  activeVessels: number;
  chokepointsPassed: string[];
}

const TRADE_ROUTES: TradeRoute[] = [
  {
    id: 'ROUTE-01',
    name: 'Asia -> Europe Trade Superhighway (via Malacca & Suez)',
    commodityType: 'CONTAINER',
    origin: { name: 'Shanghai / Singapore', x: 780, y: 280 },
    destination: { name: 'Rotterdam / Hamburg', x: 480, y: 170 },
    intermediatePoints: [
      { x: 720, y: 310 }, // Malacca
      { x: 620, y: 280 }, // Indian Ocean
      { x: 550, y: 230 }, // Bab-el-Mandeb
      { x: 525, y: 195 }  // Suez Canal
    ],
    annualTeuVolume: '24.5M TEU / Year',
    riskLevel: 'HIGH_CHOKEPOINT',
    activeVessels: 412,
    chokepointsPassed: ['Strait of Malacca', 'Bab-el-Mandeb', 'Suez Canal']
  },
  {
    id: 'ROUTE-02',
    name: 'Transpacific Eastbound (Asia -> West Coast USA)',
    commodityType: 'CONTAINER',
    origin: { name: 'Shenzhen / Ningbo', x: 800, y: 260 },
    destination: { name: 'Port of Los Angeles / Long Beach', x: 180, y: 220 },
    intermediatePoints: [
      { x: 920, y: 210 },
      { x: 50, y: 210 }
    ],
    annualTeuVolume: '19.8M TEU / Year',
    riskLevel: 'LOW',
    activeVessels: 328,
    chokepointsPassed: ['Pacific Ocean Transit']
  },
  {
    id: 'ROUTE-03',
    name: 'Persian Gulf Crude Energy Corridor (Middle East -> East Asia)',
    commodityType: 'CRUDE_OIL',
    origin: { name: 'Ras Tanura / Fujairah', x: 580, y: 250 },
    destination: { name: 'Tokyo / Chiba Energy Hub', x: 840, y: 230 },
    intermediatePoints: [
      { x: 595, y: 270 }, // Hormuz
      { x: 670, y: 310 }, // Indian Ocean
      { x: 720, y: 310 }  // Malacca
    ],
    annualTeuVolume: '18.2M Barrels / Day',
    riskLevel: 'HIGH_CHOKEPOINT',
    activeVessels: 185,
    chokepointsPassed: ['Strait of Hormuz', 'Strait of Malacca']
  },
  {
    id: 'ROUTE-04',
    name: 'Transatlantic Grain & Bulk Corridor (US Gulf -> Europe)',
    commodityType: 'BULK_GRAIN',
    origin: { name: 'New Orleans (US Gulf)', x: 230, y: 230 },
    destination: { name: 'Amsterdam / Antwerp', x: 475, y: 175 },
    intermediatePoints: [
      { x: 350, y: 200 }
    ],
    annualTeuVolume: '62.0M Metric Tons',
    riskLevel: 'LOW',
    activeVessels: 120,
    chokepointsPassed: ['North Atlantic Transit']
  },
  {
    id: 'ROUTE-05',
    name: 'Panama Canal Shortcut (US East Coast -> South America / Asia)',
    commodityType: 'LNG',
    origin: { name: 'Sabine Pass LNG (Texas)', x: 220, y: 235 },
    destination: { name: 'Yokohama LNG Terminal', x: 840, y: 230 },
    intermediatePoints: [
      { x: 245, y: 285 }, // Panama Canal
      { x: 500, y: 320 }  // Central Pacific
    ],
    annualTeuVolume: '14.1M m³ LNG',
    riskLevel: 'MEDIUM',
    activeVessels: 94,
    chokepointsPassed: ['Panama Canal']
  }
];

export const GlobalTradeMapOverlayView: React.FC = () => {
  const [selectedRoute, setSelectedRoute] = useState<TradeRoute>(TRADE_ROUTES[0]);
  const [commodityFilter, setCommodityFilter] = useState<string>('ALL');
  const [showDensityHeatmap, setShowDensityHeatmap] = useState<boolean>(true);

  const filteredRoutes = TRADE_ROUTES.filter(
    (r) => commodityFilter === 'ALL' || r.commodityType === commodityFilter
  );

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-2xl space-y-4 font-mono text-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="space-y-0.5">
          <h3 className="text-xs font-bold text-white uppercase flex items-center space-x-2">
            <Globe className="w-4 h-4 text-cyan-400" />
            <span>Interactive Global Maritime Trade Route Map & Chokepoints Visualizer</span>
          </h3>
          <p className="text-[10px] text-slate-400 font-sans">
            Real-time shipping corridors, vessel density heatmaps, strategic maritime chokepoints, and commodity trade lane volume flows
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => {
              setShowDensityHeatmap(!showDensityHeatmap);
              hapticEngine.trigger('click');
            }}
            className={`px-3 py-1 rounded-xl text-[10px] font-bold border transition-all flex items-center space-x-1.5 ${
              showDensityHeatmap
                ? 'bg-amber-500 text-slate-950 border-amber-400 font-black'
                : 'bg-slate-950 text-slate-400 border-slate-800'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>{showDensityHeatmap ? 'DENSITY HEATMAP: ON' : 'DENSITY HEATMAP: OFF'}</span>
          </button>
        </div>
      </div>

      {/* Commodity Filters */}
      <div className="flex flex-wrap items-center gap-1 bg-slate-950 p-2 rounded-2xl border border-slate-800">
        <span className="text-[10px] text-slate-400 font-bold px-2 flex items-center space-x-1">
          <Filter className="w-3 h-3 text-cyan-400" />
          <span>TRADE LANES:</span>
        </span>
        {['ALL', 'CONTAINER', 'CRUDE_OIL', 'LNG', 'BULK_GRAIN'].map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setCommodityFilter(cat);
              hapticEngine.trigger('click');
            }}
            className={`px-3 py-1 rounded-xl text-[10px] font-bold border transition-all ${
              commodityFilter === cat
                ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-black shadow'
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
            }`}
          >
            {cat.replace('_', ' ')}
          </button>
        ))}
      </div>

      {/* Interactive Map Visualizer Canvas */}
      <div className="relative bg-slate-950 border border-slate-800 rounded-2xl p-4 overflow-hidden min-h-[340px] flex flex-col justify-between">
        {/* SVG World Map Vector Representation */}
        <svg viewBox="0 0 1000 500" className="w-full h-auto max-h-[360px] filter drop-shadow-md">
          {/* World Continents Rough SVG Shapes for Backdrop */}
          <g fill="#1e293b" opacity="0.6" stroke="#334155" strokeWidth="0.7">
            {/* North America */}
            <path d="M 120 100 L 280 110 L 320 220 L 250 280 L 180 250 L 100 180 Z" />
            {/* South America */}
            <path d="M 280 290 L 350 310 L 320 450 L 260 420 L 250 330 Z" />
            {/* Europe */}
            <path d="M 460 120 L 560 110 L 580 180 L 480 200 L 440 160 Z" />
            {/* Africa */}
            <path d="M 460 210 L 580 210 L 600 350 L 520 420 L 450 310 Z" />
            {/* Asia */}
            <path d="M 580 100 L 880 90 L 920 260 L 760 300 L 600 220 Z" />
            {/* Australia */}
            <path d="M 780 340 L 900 340 L 880 430 L 790 420 Z" />
          </g>

          {/* Strategic Chokepoints Pulse Markers */}
          {[
            { name: 'Suez Canal', x: 525, y: 195 },
            { name: 'Strait of Malacca', x: 720, y: 310 },
            { name: 'Strait of Hormuz', x: 595, y: 270 },
            { name: 'Panama Canal', x: 245, y: 285 },
            { name: 'Bab-el-Mandeb', x: 550, y: 230 }
          ].map((cp) => (
            <g key={cp.name}>
              <circle cx={cp.x} cy={cp.y} r="8" fill="#f59e0b" opacity="0.3" className="animate-ping" />
              <circle cx={cp.x} cy={cp.y} r="4" fill="#f59e0b" stroke="#1e293b" strokeWidth="1" />
              <text x={cp.x + 8} y={cp.y + 3} fill="#fbbf24" fontSize="8" fontWeight="bold" fontFamily="monospace">
                {cp.name}
              </text>
            </g>
          ))}

          {/* Trade Route Lines */}
          {filteredRoutes.map((route) => {
            const isSelected = selectedRoute.id === route.id;
            const pointsStr = [
              `${route.origin.x},${route.origin.y}`,
              ...route.intermediatePoints.map((p) => `${p.x},${p.y}`),
              `${route.destination.x},${route.destination.y}`
            ].join(' ');

            return (
              <g key={route.id} className="cursor-pointer" onClick={() => {
                setSelectedRoute(route);
                hapticEngine.trigger('click');
              }}>
                <polyline
                  points={pointsStr}
                  fill="none"
                  stroke={isSelected ? '#22d3ee' : '#0284c7'}
                  strokeWidth={isSelected ? '3.5' : '1.8'}
                  strokeDasharray={isSelected ? 'none' : '4,3'}
                  opacity={isSelected ? 1 : 0.6}
                />

                {/* Origin Marker */}
                <circle cx={route.origin.x} cy={route.origin.y} r={isSelected ? 5 : 3.5} fill="#10b981" />
                {/* Destination Marker */}
                <circle cx={route.destination.x} cy={route.destination.y} r={isSelected ? 5 : 3.5} fill="#ef4444" />
              </g>
            );
          })}
        </svg>

        {/* Selected Route Info Bar */}
        <div className="bg-slate-900/90 backdrop-blur-md border border-slate-800 p-3 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <div>
            <span className="text-[9px] text-cyan-400 font-bold block">{selectedRoute.id} • {selectedRoute.commodityType}</span>
            <h4 className="text-xs font-bold text-white">{selectedRoute.name}</h4>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-[10px]">
            <div>
              <span className="text-slate-500 block">Annual Volume:</span>
              <span className="text-emerald-400 font-bold">{selectedRoute.annualTeuVolume}</span>
            </div>
            <div>
              <span className="text-slate-500 block">Active Vessels:</span>
              <span className="text-cyan-300 font-bold">{selectedRoute.activeVessels} Ships</span>
            </div>
            <div>
              <span className="text-slate-500 block">Risk Rating:</span>
              <span className={`font-bold ${
                selectedRoute.riskLevel === 'HIGH_CHOKEPOINT' ? 'text-amber-400' : 'text-emerald-400'
              }`}>
                {selectedRoute.riskLevel.replace(/_/g, ' ')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
