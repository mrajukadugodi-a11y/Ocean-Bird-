import React, { useState, useMemo } from 'react';
import { WorldwideFisheriesPort, PotentialFishingZone, FishermenSafetyAdvisory } from '../types';
import { PORT_INVENTORY_DATA } from '../data/worldwideFisheriesData';
import {
  Globe,
  Anchor,
  Compass,
  Zap,
  ShieldAlert,
  Layers,
  Search,
  Filter,
  Maximize2,
  RotateCcw,
  ExternalLink,
  MapPin,
  Ship,
  TrendingUp,
  Waves,
  ThermometerSun,
  Eye,
  EyeOff,
  Warehouse
} from 'lucide-react';

interface FisheriesGisMapOverlayProps {
  ports: WorldwideFisheriesPort[];
  pfzZones: PotentialFishingZone[];
  safetyAdvisories: FishermenSafetyAdvisory[];
  onSelectPort?: (port: WorldwideFisheriesPort) => void;
}

// Major global seafood trade vector connections (Source Port -> Target City / Country)
const GLOBAL_TRADE_FLOW_VECTORS = [
  { id: 'tf-1', source: 'port-vigo-spain', fromName: 'Vigo (Spain)', toName: 'Rome (Italy)', fromLat: 42.24, fromLng: -8.72, toLat: 41.9, toLng: 12.49, species: 'Atlantic Cod & Hake', val: '$850M' },
  { id: 'tf-2', source: 'port-toyosu-japan', fromName: 'Tokyo (Japan)', toName: 'Hong Kong', fromLat: 35.64, fromLng: 139.78, toLat: 22.31, toLng: 114.16, species: 'Bluefin Tuna & Uni', val: '$1.2B' },
  { id: 'tf-3', source: 'port-zhoushan-china', fromName: 'Zhoushan (China)', toName: 'Busan (South Korea)', fromLat: 29.98, fromLng: 122.2, toLat: 35.09, toLng: 129.02, species: 'Squid & Mackerel', val: '$940M' },
  { id: 'tf-4', source: 'port-chimbote-peru', fromName: 'Chimbote (Peru)', toName: 'Shanghai (China)', fromLat: -9.07, fromLng: -78.59, toLat: 31.23, toLng: 121.47, species: 'Anchoveta Fishmeal', val: '$1.4B' },
  { id: 'tf-5', source: 'port-new-bedford-usa', fromName: 'New Bedford (USA)', toName: 'Rotterdam (EU)', fromLat: 41.63, fromLng: -70.92, toLat: 51.92, toLng: 4.47, species: 'Sea Scallops & Lobster', val: '$780M' },
  { id: 'tf-6', source: 'port-kochi-india', fromName: 'Kochi (India)', toName: 'Tokyo (Japan)', fromLat: 9.94, fromLng: 76.25, toLat: 35.64, toLng: 139.78, species: 'Yellowfin Tuna & Shrimp', val: '$420M' },
  { id: 'tf-7', source: 'port-manta-ecuador', fromName: 'Manta (Ecuador)', toName: 'Miami (USA)', fromLat: -0.94, fromLng: -80.73, toLat: 25.76, toLng: -80.19, species: 'Tuna & Mahi Mahi', val: '$650M' },
  { id: 'tf-8', source: 'port-cape-town-south-africa', fromName: 'Cape Town (S.Africa)', toName: 'Barcelona (Spain)', fromLat: -33.91, fromLng: 18.42, toLat: 41.38, toLng: 2.17, species: 'Cape Hake & Lobster', val: '$380M' },
  { id: 'tf-9', source: 'port-port-lincoln-australia', fromName: 'Port Lincoln (Australia)', toName: 'Tokyo (Japan)', fromLat: -34.72, fromLng: 135.86, toLat: 35.64, toLng: 139.78, species: 'Southern Bluefin Tuna', val: '$310M' }
];

export const FisheriesGisMapOverlay: React.FC<FisheriesGisMapOverlayProps> = ({
  ports,
  pfzZones,
  safetyAdvisories,
  onSelectPort,
}) => {
  // Layer Toggles State
  const [showPortsLayer, setShowPortsLayer] = useState<boolean>(true);
  const [showWarehouseLayer, setShowWarehouseLayer] = useState<boolean>(true);
  const [showPfzLayer, setShowPfzLayer] = useState<boolean>(true);
  const [showTradeRoutesLayer, setShowTradeRoutesLayer] = useState<boolean>(true);
  const [showSafetyLayer, setShowSafetyLayer] = useState<boolean>(true);

  // Search & Filters
  const [mapSearchTerm, setMapSearchTerm] = useState<string>('');
  const [oceanFilter, setOceanFilter] = useState<string>('ALL');

  // Interactive Hover / Selection
  const [hoveredFeature, setHoveredFeature] = useState<{
    type: 'port' | 'warehouse' | 'pfz' | 'trade' | 'safety';
    data: any;
    x: number;
    y: number;
  } | null>(null);

  const [selectedPort, setSelectedPort] = useState<WorldwideFisheriesPort | null>(null);

  // SVG Canvas Dimensions
  const mapWidth = 1000;
  const mapHeight = 520;

  // Lat/Lng Projection formula to SVG coordinates (Equirectangular projection)
  const projectCoords = (lat: number, lng: number) => {
    // Clamp longitudes & latitudes within bounds
    const x = ((lng + 180) / 360) * mapWidth;
    const y = ((90 - lat) / 180) * mapHeight;
    return { x, y };
  };

  // Filter Ports
  const filteredPorts = useMemo(() => {
    return ports.filter((p) => {
      const matchesSearch =
        p.portName.toLowerCase().includes(mapSearchTerm.toLowerCase()) ||
        p.country.toLowerCase().includes(mapSearchTerm.toLowerCase()) ||
        p.cityName.toLowerCase().includes(mapSearchTerm.toLowerCase());
      const matchesOcean = oceanFilter === 'ALL' || p.oceanBasin === oceanFilter;
      return matchesSearch && matchesOcean;
    });
  }, [ports, mapSearchTerm, oceanFilter]);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-white space-y-5 shadow-2xl relative overflow-hidden">
      {/* Header Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center space-x-2 text-cyan-400 font-bold text-xs uppercase tracking-wider">
            <Globe className="w-4 h-4 text-cyan-400 animate-spin-slow" />
            <span>SATELLITE & MARITIME GIS GEOSPATIAL MAP OVERLAY</span>
          </div>
          <h2 className="text-xl font-extrabold text-white mt-0.5">
            Interactive Global Fisheries GIS Vector Map
          </h2>
          <p className="text-xs text-slate-300">
            Real-time geospatial vector rendering of international commercial fishing harbors, satellite chlorophyll PFZ hotspots, major seafood export flows, and maritime EEZ warnings.
          </p>
        </div>

        {/* GIS Layer Controls Bar */}
        <div className="flex flex-wrap items-center gap-2 bg-slate-950 p-2 rounded-xl border border-slate-800 text-xs shrink-0 font-mono">
          <span className="text-slate-400 text-[10px] font-bold uppercase px-1 flex items-center space-x-1">
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            <span>Layers:</span>
          </span>

          {/* Toggle Ports */}
          <button
            onClick={() => setShowPortsLayer(!showPortsLayer)}
            className={`px-2.5 py-1 rounded-lg font-bold transition-all flex items-center space-x-1 ${
              showPortsLayer
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                : 'bg-slate-900 text-slate-500 border border-slate-800 line-through'
            }`}
          >
            <Anchor className="w-3.5 h-3.5" />
            <span>Ports ({filteredPorts.length})</span>
          </button>

          {/* Toggle Cold Warehouses */}
          <button
            onClick={() => setShowWarehouseLayer(!showWarehouseLayer)}
            className={`px-2.5 py-1 rounded-lg font-bold transition-all flex items-center space-x-1 ${
              showWarehouseLayer
                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                : 'bg-slate-900 text-slate-500 border border-slate-800 line-through'
            }`}
          >
            <Warehouse className="w-3.5 h-3.5 text-purple-300" />
            <span>Cold Vaults ({PORT_INVENTORY_DATA.length})</span>
          </button>

          {/* Toggle PFZ */}
          <button
            onClick={() => setShowPfzLayer(!showPfzLayer)}
            className={`px-2.5 py-1 rounded-lg font-bold transition-all flex items-center space-x-1 ${
              showPfzLayer
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                : 'bg-slate-900 text-slate-500 border border-slate-800 line-through'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>PFZ Hotspots</span>
          </button>

          {/* Toggle Trade Routes */}
          <button
            onClick={() => setShowTradeRoutesLayer(!showTradeRoutesLayer)}
            className={`px-2.5 py-1 rounded-lg font-bold transition-all flex items-center space-x-1 ${
              showTradeRoutesLayer
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                : 'bg-slate-900 text-slate-500 border border-slate-800 line-through'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Trade Arcs</span>
          </button>

          {/* Toggle Safety EEZ */}
          <button
            onClick={() => setShowSafetyLayer(!showSafetyLayer)}
            className={`px-2.5 py-1 rounded-lg font-bold transition-all flex items-center space-x-1 ${
              showSafetyLayer
                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                : 'bg-slate-900 text-slate-500 border border-slate-800 line-through'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>EEZ Alerts</span>
          </button>
        </div>
      </div>

      {/* Map Search & Ocean Filter */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs">
        <div className="relative w-full sm:w-72">
          <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            placeholder="Filter map by port name or country..."
            value={mapSearchTerm}
            onChange={(e) => setMapSearchTerm(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-slate-200 focus:outline-none focus:border-cyan-500 font-mono text-xs"
          />
        </div>

        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <span className="text-slate-400 font-bold shrink-0 text-[11px]">Ocean Basin:</span>
          <select
            value={oceanFilter}
            onChange={(e) => setOceanFilter(e.target.value)}
            className="bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-cyan-300 font-bold text-xs focus:outline-none font-mono"
          >
            <option value="ALL">🌍 All Ocean Basins</option>
            <option value="North Pacific">North Pacific</option>
            <option value="South Pacific">South Pacific</option>
            <option value="North Atlantic">North Atlantic</option>
            <option value="South Atlantic">South Atlantic</option>
            <option value="Indian Ocean">Indian Ocean</option>
            <option value="Arabian Sea">Arabian Sea</option>
            <option value="Bay of Bengal">Bay of Bengal</option>
            <option value="Red Sea">Red Sea</option>
            <option value="North Sea">North Sea</option>
            <option value="Southern Ocean">Southern Ocean</option>
          </select>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* GIS MAP CANVAS PROJECTION (SVG Vector World Overlay) */}
      {/* ========================================================================= */}
      <div className="relative bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border border-cyan-950 rounded-xl overflow-hidden shadow-2xl">
        {/* Map Grid Lines Background */}
        <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none"></div>

        <svg
          viewBox={`0 0 ${mapWidth} ${mapHeight}`}
          className="w-full h-auto max-h-[600px] select-none block"
        >
          {/* SVG Definitions for Gradients and Glow Filters */}
          <defs>
            {/* Glow Filter for PFZ Chlorophyll Zones */}
            <filter id="pfzGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>

            {/* Glowing Trade Arc Gradient */}
            <linearGradient id="tradeArcGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.9" />
            </linearGradient>

            {/* EEZ Danger Radial Gradient */}
            <radialGradient id="eezDangerGrad">
              <stop offset="0%" stopColor="#ef4444" stopOpacity="0.5" />
              <stop offset="70%" stopColor="#ef4444" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* --------------------------------------------------------------------- */}
          {/* WORLD CONTINENTS LAT/LNG GUIDELINES (EQUATOR, TROPICS) */}
          {/* --------------------------------------------------------------------- */}
          <g opacity="0.15" stroke="#38bdf8" strokeWidth="0.5" strokeDasharray="3 3">
            {/* Equator (0° Lat) */}
            <line x1="0" y1={mapHeight / 2} x2={mapWidth} y2={mapHeight / 2} stroke="#f59e0b" strokeWidth="1" />
            {/* Tropic of Cancer (23.5° N) */}
            <line x1="0" y1={((90 - 23.5) / 180) * mapHeight} x2={mapWidth} y2={((90 - 23.5) / 180) * mapHeight} />
            {/* Tropic of Capricorn (-23.5° S) */}
            <line x1="0" y1={((90 - -23.5) / 180) * mapHeight} x2={mapWidth} y2={((90 - -23.5) / 180) * mapHeight} />
            {/* Prime Meridian (0° Lng) */}
            <line x1={mapWidth / 2} y1="0" x2={mapWidth / 2} y2={mapHeight} />
          </g>

          {/* Simplified Stylized World Continent Silhouette Outlines */}
          <g fill="#1e293b" opacity="0.6" stroke="#334155" strokeWidth="0.8">
            {/* North America */}
            <path d="M 120 70 L 250 80 L 280 150 L 220 220 L 180 200 L 130 180 L 90 120 Z" />
            {/* South America */}
            <path d="M 230 240 L 310 260 L 290 380 L 250 450 L 230 360 Z" />
            {/* Europe */}
            <path d="M 450 70 L 580 80 L 560 150 L 480 160 L 440 120 Z" />
            {/* Africa */}
            <path d="M 460 170 L 580 180 L 610 320 L 540 420 L 470 320 L 450 230 Z" />
            {/* Asia */}
            <path d="M 590 70 L 910 80 L 890 220 L 760 260 L 680 220 L 580 160 Z" />
            {/* Australia / Oceania */}
            <path d="M 800 320 L 920 330 L 900 420 L 820 420 Z" />
          </g>

          {/* --------------------------------------------------------------------- */}
          {/* LAYER 1: EEZ BOUNDARY & SAFETY ADVISORY HOTSPOTS */}
          {/* --------------------------------------------------------------------- */}
          {showSafetyLayer &&
            safetyAdvisories.map((adv) => {
              // Estimate approximate Lat/Lng for regions
              let lat = 12.0;
              let lng = 80.0;
              if (adv.region.includes('Bay of Bengal')) { lat = 14.5; lng = 86.0; }
              else if (adv.region.includes('Gujarat')) { lat = 20.8; lng = 69.5; }
              else if (adv.region.includes('Kerala')) { lat = 9.8; lng = 75.5; }
              else if (adv.region.includes('Cox')) { lat = 21.0; lng = 91.5; }
              else if (adv.region.includes('Sri Lanka')) { lat = 8.5; lng = 81.5; }
              else if (adv.region.includes('Maldives')) { lat = 3.2; lng = 73.2; }

              const { x, y } = projectCoords(lat, lng);

              return (
                <g key={adv.id} className="cursor-pointer group">
                  <circle
                    cx={x}
                    cy={y}
                    r={28}
                    fill="url(#eezDangerGrad)"
                    className="animate-pulse"
                  />
                  <circle
                    cx={x}
                    cy={y}
                    r={12}
                    fill="#ef4444"
                    fillOpacity="0.2"
                    stroke="#ef4444"
                    strokeWidth="1.5"
                    strokeDasharray="2 2"
                  />
                  <circle cx={x} cy={y} r={3} fill="#ef4444" />
                </g>
              );
            })}

          {/* --------------------------------------------------------------------- */}
          {/* LAYER 2: SEAFOOD TRADE VECTOR FLOW ARCS */}
          {/* --------------------------------------------------------------------- */}
          {showTradeRoutesLayer &&
            GLOBAL_TRADE_FLOW_VECTORS.map((route) => {
              const p1 = projectCoords(route.fromLat, route.fromLng);
              const p2 = projectCoords(route.toLat, route.toLng);

              // Curved Quadratic Curve Control Point
              const midX = (p1.x + p2.x) / 2;
              const midY = Math.min(p1.y, p2.y) - 40;

              return (
                <g key={route.id} className="group cursor-pointer">
                  {/* Glowing Arc Line */}
                  <path
                    d={`M ${p1.x} ${p1.y} Q ${midX} ${midY} ${p2.x} ${p2.y}`}
                    fill="none"
                    stroke="url(#tradeArcGrad)"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                    className="opacity-70 group-hover:opacity-100 transition-opacity"
                  />
                  {/* Route Target Point */}
                  <circle cx={p2.x} cy={p2.y} r={3} fill="#10b981" />
                </g>
              );
            })}

          {/* --------------------------------------------------------------------- */}
          {/* LAYER 3: SATELLITE PFZ CHLOROPHYLL & SST HOTSPOTS */}
          {/* --------------------------------------------------------------------- */}
          {showPfzLayer &&
            pfzZones.map((pfz) => {
              const { x, y } = projectCoords(pfz.lat, pfz.lng);

              return (
                <g
                  key={pfz.id}
                  className="cursor-pointer transition-transform hover:scale-125"
                  onMouseEnter={() => setHoveredFeature({ type: 'pfz', data: pfz, x, y })}
                  onMouseLeave={() => setHoveredFeature(null)}
                >
                  <circle
                    cx={x}
                    cy={y}
                    r={16}
                    fill="#10b981"
                    fillOpacity="0.25"
                    filter="url(#pfzGlow)"
                  />
                  <circle
                    cx={x}
                    cy={y}
                    r={6}
                    fill="#06b6d4"
                    stroke="#38bdf8"
                    strokeWidth="1.5"
                  />
                  <circle cx={x} cy={y} r={2} fill="#ffffff" />
                </g>
              );
            })}

          {/* --------------------------------------------------------------------- */}
          {/* LAYER 4: WORLDWIDE COMMERCIAL FISHING HARBORS */}
          {/* --------------------------------------------------------------------- */}
          {showPortsLayer &&
            filteredPorts.map((port) => {
              const { x, y } = projectCoords(port.lat, port.lng);

              // Scale circle size based on trade value
              const circleRadius = Math.max(6, Math.min(18, Math.sqrt(port.annualSeafoodTradeUSD / 1e8) * 2.5));

              return (
                <g
                  key={port.id}
                  className="cursor-pointer group"
                  onClick={() => {
                    setSelectedPort(port);
                    if (onSelectPort) onSelectPort(port);
                  }}
                  onMouseEnter={() => setHoveredFeature({ type: 'port', data: port, x, y })}
                  onMouseLeave={() => setHoveredFeature(null)}
                >
                  {/* Pulsing Port Ring */}
                  <circle
                    cx={x}
                    cy={y}
                    r={circleRadius + 4}
                    fill="#38bdf8"
                    fillOpacity="0.2"
                    className="group-hover:animate-ping"
                  />
                  {/* Solid Port Marker Circle */}
                  <circle
                    cx={x}
                    cy={y}
                    r={circleRadius}
                    fill="#0284c7"
                    stroke="#e0f2fe"
                    strokeWidth="1.5"
                    className="group-hover:fill-cyan-400 transition-colors"
                  />
                  {/* Inner Pin Dot */}
                  <circle cx={x} cy={y} r={2.5} fill="#ffffff" />

                  {/* Port Label */}
                  <text
                    x={x + circleRadius + 4}
                    y={y + 3}
                    fill="#e2e8f0"
                    fontSize="9"
                    fontWeight="bold"
                    className="pointer-events-none drop-shadow font-mono"
                  >
                    {port.countryFlag} {port.cityName}
                  </text>
                </g>
              );
            })}
          {/* --------------------------------------------------------------------- */}
          {/* LAYER 5: GLOBAL COLD STORAGE WAREHOUSE VAULTS */}
          {/* --------------------------------------------------------------------- */}
          {showWarehouseLayer &&
            PORT_INVENTORY_DATA.map((wh) => {
              // Lookup coordinates by UN/LOCODE or portId
              let lat = 0;
              let lng = 0;
              if (wh.unLocode === 'ESVGO') { lat = 42.24; lng = -8.72; }
              else if (wh.unLocode === 'JPTYO') { lat = 35.64; lng = 139.78; }
              else if (wh.unLocode === 'PECHM') { lat = -9.07; lng = -78.59; }
              else if (wh.unLocode === 'USEWB') { lat = 41.63; lng = -70.92; }
              else if (wh.unLocode === 'CNZOS' || wh.unLocode === 'CNZSN') { lat = 29.98; lng = 122.20; }
              else {
                const portMatch = ports.find((p) => p.unLocode === wh.unLocode || p.id === wh.portId);
                if (portMatch) {
                  lat = portMatch.lat;
                  lng = portMatch.lng;
                }
              }

              if (lat === 0 && lng === 0) return null;

              const { x, y } = projectCoords(lat, lng);
              const fillColor =
                wh.utilizationPct >= 85 ? '#ef4444' : wh.utilizationPct >= 75 ? '#f59e0b' : '#10b981';

              return (
                <g
                  key={wh.id}
                  className="cursor-pointer group"
                  onMouseEnter={() => setHoveredFeature({ type: 'warehouse', data: wh, x, y })}
                  onMouseLeave={() => setHoveredFeature(null)}
                >
                  {/* Warehouse Square Box Pin */}
                  <rect
                    x={x - 7}
                    y={y - 7}
                    width={14}
                    height={14}
                    rx={3}
                    fill="#0f172a"
                    stroke={fillColor}
                    strokeWidth="2"
                    className="group-hover:scale-125 transition-transform"
                  />
                  <rect
                    x={x - 3}
                    y={y - 3}
                    width={6}
                    height={6}
                    fill={fillColor}
                  />
                  <text
                    x={x}
                    y={y + 14}
                    fill="#a855f7"
                    fontSize="8"
                    fontWeight="bold"
                    textAnchor="middle"
                    className="pointer-events-none drop-shadow font-mono"
                  >
                    🏛️ {wh.utilizationPct}%
                  </text>
                </g>
              );
            })}
        </svg>

        {/* Map Legend Overlay Bar */}
        <div className="absolute bottom-3 left-3 bg-slate-950/90 border border-slate-800 backdrop-blur-md px-3.5 py-2 rounded-xl text-[10px] text-slate-300 font-mono flex items-center space-x-4 shadow-xl flex-wrap gap-y-1">
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 inline-block border border-cyan-300"></span>
            <span>Commercial Harbor</span>
          </div>

          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-purple-500 inline-block border border-purple-300"></span>
            <span>Cold Storage Vault</span>
          </div>

          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block border border-emerald-300"></span>
            <span>Satellite PFZ</span>
          </div>

          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block border border-amber-300"></span>
            <span>Seafood Export Arc</span>
          </div>

          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block border border-rose-300"></span>
            <span>EEZ Advisory</span>
          </div>
        </div>

        {/* Dynamic Feature Hover Card */}
        {hoveredFeature && (
          <div
            className="absolute z-20 bg-slate-950/95 border border-cyan-500/60 p-3 rounded-xl shadow-2xl text-white text-xs max-w-xs font-sans backdrop-blur-md pointer-events-none transition-all"
            style={{
              left: Math.min(hoveredFeature.x + 15, mapWidth - 240),
              top: Math.max(hoveredFeature.y - 40, 10),
            }}
          >
            {hoveredFeature.type === 'port' && (
              <div className="space-y-1">
                <div className="flex items-center space-x-1 font-bold text-cyan-300">
                  <span>{hoveredFeature.data.countryFlag}</span>
                  <span>{hoveredFeature.data.portName}</span>
                </div>
                <div className="text-[10px] text-slate-400 font-mono">
                  LOCODE: {hoveredFeature.data.unLocode} • {hoveredFeature.data.country}
                </div>
                <div className="text-[11px] font-mono text-emerald-400 font-bold">
                  Annual Trade: ${(hoveredFeature.data.annualSeafoodTradeUSD / 1e6).toLocaleString()}M USD
                </div>
                <div className="text-[10px] text-slate-300">
                  Catch Vol: {(hoveredFeature.data.annualCatchVolumeMT / 1000).toLocaleString()}k Metric Tons
                </div>
              </div>
            )}

            {hoveredFeature.type === 'warehouse' && (
              <div className="space-y-1.5">
                <div className="flex items-center space-x-1.5 font-bold text-purple-300">
                  <Warehouse className="w-4 h-4 text-purple-400" />
                  <span>{hoveredFeature.data.portName}</span>
                </div>
                <div className="text-[10px] text-slate-300 font-mono">
                  Capacity: {hoveredFeature.data.currentOccupiedMT.toLocaleString()} / {hoveredFeature.data.totalCapacityMT.toLocaleString()} MT
                </div>
                <div className="flex items-center justify-between text-[11px] font-bold">
                  <span className="text-amber-300">Occupancy: {hoveredFeature.data.utilizationPct}%</span>
                  <span className="text-cyan-300">{hoveredFeature.data.reeferContainersOnSite} Reefers</span>
                </div>
                <div className="text-[10px] text-slate-400">
                  Status: <span className="text-emerald-400 font-mono">{hoveredFeature.data.warehouseStatus}</span>
                </div>
              </div>
            )}

            {hoveredFeature.type === 'pfz' && (
              <div className="space-y-1">
                <div className="flex items-center space-x-1 font-bold text-emerald-300">
                  <Zap className="w-3.5 h-3.5 text-emerald-400" />
                  <span>PFZ Satellite Hotspot</span>
                </div>
                <div className="text-[11px] font-bold text-white">{hoveredFeature.data.zoneName}</div>
                <div className="text-[10px] text-slate-300 font-mono">
                  SST: {hoveredFeature.data.seaSurfaceTempC}°C • Chlorophyll: {hoveredFeature.data.chlorophyllMgM3} mg/m³
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Selected Port Inspection Drawer (if clicked) */}
      {selectedPort && (
        <div className="p-4 bg-slate-950 border border-cyan-500/40 rounded-xl flex flex-col md:flex-row items-center justify-between gap-4 font-sans text-xs animate-fadeIn">
          <div className="flex items-center space-x-3">
            <span className="text-3xl">{selectedPort.countryFlag}</span>
            <div>
              <div className="flex items-center space-x-2 text-cyan-400 font-bold font-mono">
                <span>{selectedPort.portName}</span>
                <span className="px-1.5 py-0.5 rounded bg-cyan-500/20 text-[10px]">
                  {selectedPort.unLocode}
                </span>
              </div>
              <p className="text-slate-300 text-xs mt-0.5">{selectedPort.description}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 shrink-0">
            <div className="text-right font-mono">
              <span className="text-emerald-400 font-bold block">
                ${(selectedPort.annualSeafoodTradeUSD / 1e6).toLocaleString()}M USD
              </span>
              <span className="text-[10px] text-slate-400">
                {(selectedPort.annualCatchVolumeMT / 1000).toLocaleString()}k MT Catch Volume
              </span>
            </div>

            <button
              onClick={() => setSelectedPort(null)}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-bold"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
