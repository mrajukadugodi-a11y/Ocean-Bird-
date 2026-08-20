import React, { useState, useEffect } from 'react';
import {
  Globe,
  Plane,
  Ship,
  Box,
  Compass,
  Radio,
  Navigation,
  Wind,
  Layers,
  Search,
  Filter,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  RefreshCw,
  Anchor,
  Clock,
  Eye
} from 'lucide-react';
import { CurrencySelector, useCurrency } from '../utils/currencyUtils';

export type FleetType = 'ALL' | 'AIRWAYS_PASSENGER' | 'AIRWAYS_CARGO' | 'CRUISE_PASSENGER' | 'MARINE_CARGO';
export type FleetRegion = 'WORLDWIDE' | 'ATLANTIC' | 'PACIFIC' | 'INDIAN' | 'EUROPE' | 'ASIA' | 'AMERICAS';

export interface FleetUnit {
  id: string; // e.g. "AI-101" or "IMO-9845120"
  type: FleetType;
  categoryLabel: string; // "Commercial Passenger Flight", "Air Freight Transport", "Luxury Cruise Liner", "Container Cargo Ship"
  name: string;
  operator: string;
  countryFlag: string;
  origin: string;
  destination: string;
  lat: number;
  lng: number;
  positionX: number; // 0 to 100 on SVG map
  positionY: number; // 0 to 100 on SVG map
  headingDeg: number;
  speedKts: number;
  altitudeFtOrDraughtM: string; // e.g. "36,000 ft" or "14.2m Draught"
  status: 'En Route - On Time' | 'High Altitude Oceanic Transit' | 'Approaching Berth' | 'Weather Deviation';
  eta: string;
  squawkOrImo: string;
  weatherAtPos: string;
  routeCoordinates: { x: number; y: number }[];
}

export const GLOBAL_FLEET_UNITS: FleetUnit[] = [
  // Airways Passenger Flights
  {
    id: 'AI-101',
    type: 'AIRWAYS_PASSENGER',
    categoryLabel: 'International Passenger Flight',
    name: 'Air India AI-101 (B777-300ER)',
    operator: 'Air India',
    countryFlag: '🇮🇳',
    origin: 'New Delhi (DEL)',
    destination: 'New York (JFK)',
    lat: 52.3,
    lng: -20.5,
    positionX: 42,
    positionY: 28,
    headingDeg: 285,
    speedKts: 485,
    altitudeFtOrDraughtM: '37,000 ft',
    status: 'High Altitude Oceanic Transit',
    eta: '18:45 UTC',
    squawkOrImo: 'Squawk 7421',
    weatherAtPos: '-48°C, Jetstream Tailwind 42 kts',
    routeCoordinates: [
      { x: 68, y: 48 },
      { x: 55, y: 32 },
      { x: 42, y: 28 },
      { x: 28, y: 34 }
    ]
  },
  {
    id: 'EK-502',
    type: 'AIRWAYS_PASSENGER',
    categoryLabel: 'Superjumbo Passenger Flight',
    name: 'Emirates EK-502 (A380-800)',
    operator: 'Emirates',
    countryFlag: '🇦🇪',
    origin: 'Dubai (DXB)',
    destination: 'Mumbai (BOM)',
    lat: 22.1,
    lng: 65.4,
    positionX: 63,
    positionY: 46,
    headingDeg: 110,
    speedKts: 510,
    altitudeFtOrDraughtM: '39,000 ft',
    status: 'En Route - On Time',
    eta: '14:20 UTC',
    squawkOrImo: 'Squawk 2104',
    weatherAtPos: 'Smooth Cruise, Clear Sky',
    routeCoordinates: [
      { x: 58, y: 44 },
      { x: 63, y: 46 },
      { x: 68, y: 48 }
    ]
  },
  {
    id: 'SQ-421',
    type: 'AIRWAYS_PASSENGER',
    categoryLabel: 'Long-Haul Passenger Flight',
    name: 'Singapore Airlines SQ-421 (A350-900)',
    operator: 'Singapore Airlines',
    countryFlag: '🇸🇬',
    origin: 'Mumbai (BOM)',
    destination: 'Singapore (SIN)',
    lat: 10.2,
    lng: 85.5,
    positionX: 74,
    positionY: 54,
    headingDeg: 125,
    speedKts: 495,
    altitudeFtOrDraughtM: '38,000 ft',
    status: 'En Route - On Time',
    eta: '19:10 UTC',
    squawkOrImo: 'Squawk 5120',
    weatherAtPos: 'Tropical Turbulence Watch',
    routeCoordinates: [
      { x: 68, y: 48 },
      { x: 74, y: 54 },
      { x: 78, y: 53 }
    ]
  },
  {
    id: 'BA-117',
    type: 'AIRWAYS_PASSENGER',
    categoryLabel: 'Transatlantic Flight',
    name: 'British Airways BA-117 (B787-10)',
    operator: 'British Airways',
    countryFlag: '🇬🇧',
    origin: 'London Heathrow (LHR)',
    destination: 'New York (JFK)',
    lat: 50.8,
    lng: -35.2,
    positionX: 38,
    positionY: 29,
    headingDeg: 260,
    speedKts: 470,
    altitudeFtOrDraughtM: '36,000 ft',
    status: 'High Altitude Oceanic Transit',
    eta: '16:15 UTC',
    squawkOrImo: 'Squawk 3302',
    weatherAtPos: 'Headwind 28 kts',
    routeCoordinates: [
      { x: 51, y: 26 },
      { x: 38, y: 29 },
      { x: 28, y: 34 }
    ]
  },

  // Airways Cargo
  {
    id: 'FX-098',
    type: 'AIRWAYS_CARGO',
    categoryLabel: 'Air Express Cargo Freighter',
    name: 'FedEx Express FX-098 (B777F Freighter)',
    operator: 'FedEx Cargo',
    countryFlag: '🇺🇸',
    origin: 'Memphis Hub (MEM)',
    destination: 'Frankfurt Air Cargo (FRA)',
    lat: 48.2,
    lng: -15.4,
    positionX: 44,
    positionY: 30,
    headingDeg: 80,
    speedKts: 505,
    altitudeFtOrDraughtM: '34,000 ft (85 Tons Cargo)',
    status: 'En Route - On Time',
    eta: '02:40 UTC',
    squawkOrImo: 'Squawk 1209',
    weatherAtPos: 'Tailwind 35 kts',
    routeCoordinates: [
      { x: 22, y: 36 },
      { x: 44, y: 30 },
      { x: 52, y: 28 }
    ]
  },
  {
    id: 'CX-084',
    type: 'AIRWAYS_CARGO',
    categoryLabel: 'Pacific Air Cargo Freighter',
    name: 'Cathay Cargo CX-084 (B747-8F Heavy)',
    operator: 'Cathay Cargo',
    countryFlag: '🇭🇰',
    origin: 'Hong Kong (HKG)',
    destination: 'Anchorage Cargo Hub (ANC)',
    lat: 42.1,
    lng: 152.0,
    positionX: 89,
    positionY: 26,
    headingDeg: 45,
    speedKts: 515,
    altitudeFtOrDraughtM: '33,000 ft (120 Tons Freight)',
    status: 'En Route - On Time',
    eta: '11:05 UTC',
    squawkOrImo: 'Squawk 6041',
    weatherAtPos: 'North Pacific Jetstream',
    routeCoordinates: [
      { x: 82, y: 42 },
      { x: 89, y: 26 },
      { x: 12, y: 18 }
    ]
  },

  // Cruise Liners
  {
    id: 'IMO-9824001',
    type: 'CRUISE_PASSENGER',
    categoryLabel: 'Luxury Ocean Cruise Ship',
    name: 'Cordelia Empress (Grand Coastal Cruise)',
    operator: 'Cordelia Cruises',
    countryFlag: '🇮🇳',
    origin: 'Mumbai Terminal',
    destination: 'Lakshadweep Islands & Kochi',
    lat: 13.8,
    lng: 72.9,
    positionX: 68,
    positionY: 52,
    headingDeg: 190,
    speedKts: 18.5,
    altitudeFtOrDraughtM: '7.2m Draught (1,800 Passengers)',
    status: 'En Route - On Time',
    eta: '06:00 UTC Tomorrow',
    squawkOrImo: 'IMO 9824001 / MMSI 4190892',
    weatherAtPos: 'Sea State 2, Wave 1.4m',
    routeCoordinates: [
      { x: 68, y: 48 },
      { x: 68, y: 52 },
      { x: 69, y: 55 }
    ]
  },
  {
    id: 'IMO-9703322',
    type: 'CRUISE_PASSENGER',
    categoryLabel: 'Ultra Luxury Cruise Liner',
    name: 'Symphony of the Seas',
    operator: 'Royal Caribbean International',
    countryFlag: '🇧🇭',
    origin: 'PortMiami (Florida)',
    destination: 'Nassau & Cozumel',
    lat: 24.8,
    lng: -79.8,
    positionX: 27,
    positionY: 42,
    headingDeg: 130,
    speedKts: 21.2,
    altitudeFtOrDraughtM: '9.1m Draught (6,680 Passengers)',
    status: 'En Route - On Time',
    eta: '07:30 UTC',
    squawkOrImo: 'IMO 9703322 / MMSI 3110006',
    weatherAtPos: 'Swell 1.2m, Tropical Breeze',
    routeCoordinates: [
      { x: 25, y: 41 },
      { x: 27, y: 42 },
      { x: 29, y: 45 }
    ]
  },

  // Marine Cargo & Containers
  {
    id: 'IMO-9845120',
    type: 'MARINE_CARGO',
    categoryLabel: 'VLCC Crude Oil Tanker',
    name: 'MV DESH SHANTI',
    operator: 'Shipping Corporation of India',
    countryFlag: '🇮🇳',
    origin: 'Kandla / Ras Tanura',
    destination: 'Colombo Transshipment Hub',
    lat: 18.9,
    lng: 72.8,
    positionX: 68,
    positionY: 48,
    headingDeg: 135,
    speedKts: 14.8,
    altitudeFtOrDraughtM: '14.2m Draught (300k DWT)',
    status: 'En Route - On Time',
    eta: '10:00 UTC',
    squawkOrImo: 'IMO 9845120 / MMSI 419001890',
    weatherAtPos: 'Monsoon Swell 2.4m',
    routeCoordinates: [
      { x: 66, y: 46 },
      { x: 68, y: 48 },
      { x: 71, y: 52 }
    ]
  },
  {
    id: 'IMO-9723011',
    type: 'MARINE_CARGO',
    categoryLabel: 'Ultra Large Container Vessel (ULCV)',
    name: 'EVER GIVEN II',
    operator: 'Evergreen Marine',
    countryFlag: '🇸🇬',
    origin: 'Singapore Port',
    destination: 'Suez Canal / Rotterdam',
    lat: 5.8,
    lng: 80.2,
    positionX: 71,
    positionY: 53,
    headingDeg: 270,
    speedKts: 18.2,
    altitudeFtOrDraughtM: '15.8m Draught (20,100 TEU)',
    status: 'High Altitude Oceanic Transit',
    eta: '18:30 UTC',
    squawkOrImo: 'IMO 9723011 / MMSI 563089000',
    weatherAtPos: 'SW Monsoon Waves 3.2m',
    routeCoordinates: [
      { x: 78, y: 53 },
      { x: 71, y: 53 },
      { x: 58, y: 38 }
    ]
  },
  {
    id: 'IMO-9301140',
    type: 'MARINE_CARGO',
    categoryLabel: 'Capesize Dry Bulk Carrier',
    name: 'BANGLADESH SAMUDRA',
    operator: 'BSC Logistics',
    countryFlag: '🇧🇩',
    origin: 'Chittagong Outer Anchorage',
    destination: 'Chattogram Port Terminal',
    lat: 22.1,
    lng: 91.7,
    positionX: 75,
    positionY: 47,
    headingDeg: 0,
    speedKts: 0.2,
    altitudeFtOrDraughtM: '9.5m Draught (85k DWT Grain)',
    status: 'Approaching Berth',
    eta: '04:00 UTC',
    squawkOrImo: 'IMO 9301140 / MMSI 403112450',
    weatherAtPos: 'Bay of Bengal Surge 2.1m',
    routeCoordinates: [
      { x: 75, y: 47 }
    ]
  }
];

export const GlobalFleetMapView: React.FC<{ onSelectUnitForDetail?: (unit: FleetUnit) => void }> = ({
  onSelectUnitForDetail
}) => {
  const { currency, formatPrice } = useCurrency();
  const [selectedType, setSelectedType] = useState<FleetType>('ALL');
  const [selectedRegion, setSelectedRegion] = useState<FleetRegion>('WORLDWIDE');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUnit, setSelectedUnit] = useState<FleetUnit>(GLOBAL_FLEET_UNITS[0]);
  const [sweepX, setSweepX] = useState(15);

  useEffect(() => {
    const timer = setInterval(() => {
      setSweepX((prev) => (prev >= 95 ? 5 : prev + 2));
    }, 250);
    return () => clearInterval(timer);
  }, []);

  const filteredUnits = GLOBAL_FLEET_UNITS.filter((unit) => {
    const matchesType = selectedType === 'ALL' || unit.type === selectedType;
    const matchesSearch =
      searchQuery === '' ||
      unit.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      unit.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      unit.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
      unit.destination.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const getFleetBadge = (type: FleetType) => {
    switch (type) {
      case 'AIRWAYS_PASSENGER':
        return { label: 'Airways Flight', bg: 'bg-sky-500/20 text-sky-300 border-sky-500/40', icon: Plane };
      case 'AIRWAYS_CARGO':
        return { label: 'Air Cargo', bg: 'bg-amber-500/20 text-amber-300 border-amber-500/40', icon: Box };
      case 'CRUISE_PASSENGER':
        return { label: 'Cruise Liner', bg: 'bg-teal-500/20 text-teal-300 border-teal-500/40', icon: Ship };
      case 'MARINE_CARGO':
        return { label: 'Ocean Cargo', bg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40', icon: Anchor };
      default:
        return { label: 'Fleet Asset', bg: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40', icon: Globe };
    }
  };

  return (
    <div id="global-fleet-map-view" className="space-y-6 animate-fadeIn font-sans">
      {/* Top Banner Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 rounded-2xl p-6 border border-cyan-500/30 shadow-2xl text-white space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 uppercase flex items-center space-x-1">
                <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                <span>WORLD REAL-TIME AIS & ADS-B SATELLITE NETWORK</span>
              </span>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 uppercase">
                GLOBAL FLEET MONITOR
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white mt-2 flex items-center space-x-3">
              <Globe className="w-8 h-8 text-cyan-400 animate-spin" />
              <span>Global Fleet Map & Live Location Radar</span>
            </h1>
            <p className="text-slate-400 text-xs mt-1 max-w-3xl font-sans">
              Real-time global tracking map for commercial airways passenger flights, air cargo freighters, luxury ocean cruise liners, and marine cargo container ships across all international ocean basins and airspace corridors.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <CurrencySelector />
          </div>
        </div>

        {/* Fleet Category Filter Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-slate-400 font-bold mr-1 flex items-center space-x-1">
              <Layers className="w-3.5 h-3.5 text-cyan-400" />
              <span>FLEET TYPE:</span>
            </span>

            {[
              { id: 'ALL', label: '🌍 All Fleets', count: GLOBAL_FLEET_UNITS.length },
              { id: 'AIRWAYS_PASSENGER', label: '✈️ Airways Passenger Flights', count: GLOBAL_FLEET_UNITS.filter((u) => u.type === 'AIRWAYS_PASSENGER').length },
              { id: 'AIRWAYS_CARGO', label: '📦 Airways Cargo Freighters', count: GLOBAL_FLEET_UNITS.filter((u) => u.type === 'AIRWAYS_CARGO').length },
              { id: 'CRUISE_PASSENGER', label: '🚢 Cruise Ship Liners', count: GLOBAL_FLEET_UNITS.filter((u) => u.type === 'CRUISE_PASSENGER').length },
              { id: 'MARINE_CARGO', label: '⚓ Marine Cargo & Tankers', count: GLOBAL_FLEET_UNITS.filter((u) => u.type === 'MARINE_CARGO').length }
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setSelectedType(f.id as FleetType)}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all border flex items-center space-x-1.5 ${
                  selectedType === f.id
                    ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-lg shadow-cyan-500/20'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <span>{f.label}</span>
                <span className="px-1.5 py-0.2 bg-slate-800 text-cyan-300 text-[10px] rounded-full font-mono">{f.count}</span>
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search flight, vessel name, IMO..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-400"
            />
          </div>
        </div>
      </div>

      {/* WORLD VECTOR MAP CONTAINER */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 bg-slate-950 border border-slate-800 rounded-2xl relative h-[480px] overflow-hidden p-2 shadow-2xl flex flex-col justify-between">
          {/* Map Layer Toolbar */}
          <div className="absolute top-4 left-4 z-10 bg-slate-900/90 backdrop-blur-md border border-slate-800 p-2 rounded-xl flex items-center space-x-2 font-mono text-xs text-white">
            <Radio className="w-4 h-4 text-rose-500 animate-ping" />
            <span className="font-bold">LIVE TELEMETRY SWEEP</span>
            <span className="text-slate-500">•</span>
            <span className="text-emerald-400 font-bold">{filteredUnits.length} Assets Tracked</span>
          </div>

          <svg className="w-full h-full bg-slate-950 rounded-xl" viewBox="0 0 1000 500">
            {/* Background Grid Pattern */}
            <defs>
              <pattern id="fleetGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1e293b" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="1000" height="500" fill="url(#fleetGrid)" />

            {/* Stylized Continents Outlines */}
            <path d="M 180 80 Q 280 90, 260 180 Q 230 220, 270 280 L 290 320 Q 340 380, 280 460 Q 220 400, 240 340 L 200 260 Q 140 180, 100 120 Z" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
            <path d="M 480 60 Q 580 70, 560 150 Q 520 180, 580 220 Q 620 280, 580 380 Q 500 420, 460 320 L 440 220 Q 430 140, 480 60 Z" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
            <path d="M 600 80 Q 820 60, 880 180 Q 800 240, 720 220 Q 680 300, 650 250 L 600 180 Z" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
            <path d="M 800 320 Q 920 330, 880 420 Q 800 440, 780 380 Z" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />

            {/* Satellite Radar Sweep Vertical Line */}
            <line x1={`${sweepX}%`} y1="0" x2={`${sweepX}%`} y2="500" stroke="#06b6d4" strokeWidth="2" opacity="0.6" strokeDasharray="4 4" />

            {/* Vector Route Arcs for Selected Unit */}
            {selectedUnit && selectedUnit.routeCoordinates.length > 1 && (
              <polyline
                points={selectedUnit.routeCoordinates.map((c) => `${(c.x / 100) * 1000},${(c.y / 100) * 500}`).join(' ')}
                fill="none"
                stroke={selectedUnit.type.startsWith('AIRWAYS') ? '#38bdf8' : '#10b981'}
                strokeWidth="2.5"
                strokeDasharray="6 6"
                opacity="0.8"
              />
            )}

            {/* Fleet Unit Map Markers */}
            {filteredUnits.map((unit) => {
              const isSelected = selectedUnit.id === unit.id;
              const x = (unit.positionX / 100) * 1000;
              const y = (unit.positionY / 100) * 500;
              const isFlight = unit.type.startsWith('AIRWAYS');

              return (
                <g key={unit.id} onClick={() => setSelectedUnit(unit)} className="cursor-pointer group">
                  {isSelected && (
                    <circle cx={x} cy={y} r="22" fill="none" stroke={isFlight ? "#38bdf8" : "#10b981"} strokeWidth="2" className="animate-ping" />
                  )}
                  <circle
                    cx={x}
                    cy={y}
                    r={isSelected ? "9" : "6"}
                    fill={isSelected ? (isFlight ? "#0284c7" : "#059669") : (isFlight ? "#38bdf8" : "#10b981")}
                    stroke="#ffffff"
                    strokeWidth="2"
                  />
                  <text
                    x={x + 12}
                    y={y + 4}
                    fill={isSelected ? "#ffffff" : "#94a3b8"}
                    fontSize={isSelected ? "11" : "9"}
                    fontWeight="bold"
                    className="font-mono"
                  >
                    {isFlight ? '✈️' : '🚢'} {unit.id}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Floating Selected Asset Banner */}
          <div className="absolute bottom-4 left-4 right-4 bg-slate-900/95 backdrop-blur-md border border-slate-800 p-3.5 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono text-xs">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                {selectedUnit.type.startsWith('AIRWAYS') ? <Plane className="w-5 h-5" /> : <Ship className="w-5 h-5" />}
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-white text-sm">{selectedUnit.name}</span>
                  <span className="text-slate-400">({selectedUnit.countryFlag})</span>
                </div>
                <div className="text-slate-400 text-[11px]">
                  {selectedUnit.origin} ➔ {selectedUnit.destination}
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-right">
                <span className="text-slate-400 block text-[10px]">SPEED / ALTITUDE</span>
                <span className="text-cyan-300 font-bold">{selectedUnit.speedKts} kts • {selectedUnit.altitudeFtOrDraughtM}</span>
              </div>
              <button
                onClick={() => onSelectUnitForDetail && onSelectUnitForDetail(selectedUnit)}
                className="px-3.5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs transition-all flex items-center space-x-1.5 shrink-0"
              >
                <span>OPEN TRACKER</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Selected Unit Telemetry Inspector */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 text-white font-mono text-xs space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
              <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider flex items-center space-x-1">
                <Eye className="w-3.5 h-3.5" />
                <span>Asset Telemetry</span>
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-slate-300">
                {selectedUnit.squawkOrImo}
              </span>
            </div>

            <div>
              <span className="text-[10px] text-slate-500 block uppercase font-bold">Name & Category</span>
              <h3 className="text-base font-extrabold text-white mt-0.5">{selectedUnit.name}</h3>
              <p className="text-cyan-400 text-[11px] mt-0.5">{selectedUnit.categoryLabel}</p>
            </div>

            <div className="space-y-2 bg-slate-950 p-3 rounded-xl border border-slate-800 text-[11px]">
              <div className="flex justify-between">
                <span className="text-slate-400">Operator:</span>
                <strong className="text-white">{selectedUnit.operator}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Route:</span>
                <strong className="text-cyan-300">{selectedUnit.origin} ➔ {selectedUnit.destination}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Current Speed:</span>
                <strong className="text-emerald-400">{selectedUnit.speedKts} knots</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Level / Draught:</span>
                <strong className="text-amber-300">{selectedUnit.altitudeFtOrDraughtM}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">ETA Destination:</span>
                <strong className="text-teal-300">{selectedUnit.eta}</strong>
              </div>
            </div>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
              <span className="text-[10px] text-amber-400 font-bold uppercase block">EN-ROUTE ATMOSPHERE / OCEAN CONDITION:</span>
              <p className="text-slate-300 text-[11px]">{selectedUnit.weatherAtPos}</p>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800 space-y-2">
            <span className="text-[10px] text-slate-500 font-bold block uppercase">All Fleet List</span>
            <div className="max-h-40 overflow-y-auto space-y-1 pr-1 custom-scrollbar">
              {filteredUnits.map((u) => (
                <button
                  key={u.id}
                  onClick={() => setSelectedUnit(u)}
                  className={`w-full p-2 rounded-lg text-left transition-all flex items-center justify-between text-[11px] border ${
                    selectedUnit.id === u.id
                      ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-300 font-bold'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <span className="truncate">{u.id} - {u.name.split(' ')[0]}</span>
                  <span className="text-[10px] text-slate-500">{u.speedKts}kts</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
