import React, { useState } from 'react';
import {
  Search,
  Radio,
  Plane,
  Ship,
  Box,
  Compass,
  MapPin,
  Clock,
  Wind,
  CheckCircle2,
  AlertTriangle,
  Navigation,
  Globe,
  Anchor,
  Zap,
  Layers,
  BarChart3,
  RefreshCw,
  Share2,
  FileCheck,
  Building2
} from 'lucide-react';
import { CurrencySelector, useCurrency } from '../utils/currencyUtils';

export interface LocationTrackItem {
  trackingId: string; // Flight number, Vessel IMO, Container ID, AWB
  category: 'Airways Flight' | 'Air Cargo Freight' | 'Cruise Ship' | 'Marine Container Cargo' | 'Express Courier';
  name: string;
  operator: string;
  flag: string;
  origin: string;
  originCode: string;
  destination: string;
  destinationCode: string;
  currentLat: number;
  currentLng: number;
  coordinates: string;
  speedKnots: number;
  headingDeg: number;
  altitudeOrDraught: string;
  progressPct: number;
  status: 'In Flight - On Schedule' | 'Ocean Oceanic Transit' | 'Final Approach' | 'At Berth' | 'Cruising Smooth';
  departureTime: string;
  etaTime: string;
  squawkOrImo: string;
  callSign: string;
  weatherEnRoute: {
    temperature: string;
    windSpeed: string;
    visibility: string;
    condition: string;
    turbulenceOrSwell: string;
  };
  waypoints: {
    name: string;
    time: string;
    passed: boolean;
  }[];
}

const SEARCHABLE_TRACKING_DATABASE: LocationTrackItem[] = [
  {
    trackingId: 'AI-101',
    category: 'Airways Flight',
    name: 'Air India AI-101 (B777-300ER)',
    operator: 'Air India',
    flag: '🇮🇳 India',
    origin: 'Indira Gandhi Intl, New Delhi',
    originCode: 'DEL',
    destination: 'John F. Kennedy Intl, New York',
    destinationCode: 'JFK',
    currentLat: 52.34,
    currentLng: -20.52,
    coordinates: "52° 20.4' N, 020° 31.2' W",
    speedKnots: 485,
    headingDeg: 285,
    altitudeOrDraught: '37,000 ft (FL370)',
    progressPct: 62,
    status: 'In Flight - On Schedule',
    departureTime: '2026-08-02 02:15 UTC',
    etaTime: '2026-08-02 18:45 UTC',
    squawkOrImo: 'Squawk 7421',
    callSign: 'AIC101',
    weatherEnRoute: {
      temperature: '-48°C Outside Air Temp',
      windSpeed: '42 kts Tailwind Jetstream',
      visibility: '10+ NM High Altitude Clear',
      condition: 'Smooth Cruise',
      turbulenceOrSwell: 'Light Chop over North Atlantic'
    },
    waypoints: [
      { name: 'DEL Gate 18 Departure', time: '02:15 UTC', passed: true },
      { name: 'Delhi Oceanic FIR Boundary', time: '04:30 UTC', passed: true },
      { name: 'European Airspace Transit', time: '09:10 UTC', passed: true },
      { name: 'Shanwick Oceanic Control Point', time: '13:00 UTC', passed: true },
      { name: 'Gander Oceanic Entry', time: '16:20 UTC', passed: false },
      { name: 'JFK Terminal 4 Arrival', time: '18:45 UTC', passed: false }
    ]
  },
  {
    trackingId: 'EK-502',
    category: 'Airways Flight',
    name: 'Emirates EK-502 (Airbus A380-800)',
    operator: 'Emirates',
    flag: '🇦🇪 UAE',
    origin: 'Dubai Intl Airport',
    originCode: 'DXB',
    destination: 'Chhatrapati Shivaji Intl, Mumbai',
    destinationCode: 'BOM',
    currentLat: 22.10,
    currentLng: 65.40,
    coordinates: "22° 06.0' N, 065° 24.0' E",
    speedKnots: 510,
    headingDeg: 110,
    altitudeOrDraught: '39,000 ft (FL390)',
    progressPct: 78,
    status: 'In Flight - On Schedule',
    departureTime: '2026-08-02 10:00 UTC',
    etaTime: '2026-08-02 14:20 UTC',
    squawkOrImo: 'Squawk 2104',
    callSign: 'UAE502',
    weatherEnRoute: {
      temperature: '-42°C Outside Air Temp',
      windSpeed: '18 kts Crosswind',
      visibility: '10 NM Clear Sky',
      condition: 'Clear Sky',
      turbulenceOrSwell: 'Nil Turbulence'
    },
    waypoints: [
      { name: 'DXB Runway 12L Takeoff', time: '10:00 UTC', passed: true },
      { name: 'Gulf of Oman Oceanic Point', time: '10:50 UTC', passed: true },
      { name: 'Arabian Sea High Cruise', time: '12:30 UTC', passed: true },
      { name: 'Mumbai Approach Sector', time: '13:55 UTC', passed: false },
      { name: 'BOM Runway 27 Touchdown', time: '14:20 UTC', passed: false }
    ]
  },
  {
    trackingId: 'IMO-9824001',
    category: 'Cruise Ship',
    name: 'Cordelia Empress (Grand Coastal & Island Cruise)',
    operator: 'Cordelia Cruises',
    flag: '🇮🇳 India',
    origin: 'Mumbai Cruise Terminal (BPT)',
    originCode: 'MUM',
    destination: 'Malé Atoll Harbour, Maldives',
    destinationCode: 'MLE',
    currentLat: 13.80,
    currentLng: 72.90,
    coordinates: "13° 48.0' N, 072° 54.0' E",
    speedKnots: 18.5,
    headingDeg: 190,
    altitudeOrDraught: '7.2m Max Draught (1,800 Passengers)',
    progressPct: 45,
    status: 'Cruising Smooth',
    departureTime: '2026-08-01 16:00 UTC',
    etaTime: '2026-08-03 06:00 UTC',
    squawkOrImo: 'IMO 9824001 / MMSI 4190892',
    callSign: 'VTCE',
    weatherEnRoute: {
      temperature: '+29°C Tropical Ocean Air',
      windSpeed: '14 kts SW Monsoonal Breeze',
      visibility: '8.5 NM Clear Horizon',
      condition: 'Partly Cloudy',
      turbulenceOrSwell: 'Moderate Swell 1.4m'
    },
    waypoints: [
      { name: 'Mumbai Port Unberthing', time: '08-01 16:00 UTC', passed: true },
      { name: 'Goa Coastal Channel Waypoint', time: '08-02 04:00 UTC', passed: true },
      { name: 'Lakshadweep Nine Degree Channel', time: '08-02 18:00 UTC', passed: false },
      { name: 'Male Outer Anchorage Berthing', time: '08-03 06:00 UTC', passed: false }
    ]
  },
  {
    trackingId: 'IMO-9845120',
    category: 'Marine Container Cargo',
    name: 'MV DESH SHANTI (300,000 DWT Crude Carrier)',
    operator: 'Shipping Corporation of India',
    flag: '🇮🇳 India',
    origin: 'Ras Tanura Terminal, Saudi Arabia',
    originCode: 'RTN',
    destination: 'Colombo Transshipment Hub',
    destinationCode: 'CMB',
    currentLat: 18.90,
    currentLng: 72.80,
    coordinates: "18° 54.2' N, 072° 48.5' E",
    speedKnots: 14.8,
    headingDeg: 135,
    altitudeOrDraught: '14.2m Fully Laden Draught',
    progressPct: 58,
    status: 'Ocean Oceanic Transit',
    departureTime: '2026-07-29 08:00 UTC',
    etaTime: '2026-08-02 10:00 UTC',
    squawkOrImo: 'IMO 9845120 / MMSI 419001890',
    callSign: 'VTIN',
    weatherEnRoute: {
      temperature: '+28°C Sea Air',
      windSpeed: '22 kts SW Monsoon',
      visibility: '6.0 NM Rain Squall',
      condition: 'Monsoonal Swells',
      turbulenceOrSwell: 'Significant Wave Height 2.4m'
    },
    waypoints: [
      { name: 'Ras Tanura Departure', time: '07-29 08:00 UTC', passed: true },
      { name: 'Strait of Hormuz Transit', time: '07-30 02:00 UTC', passed: true },
      { name: 'Arabian Sea Deep Passage', time: '07-31 12:00 UTC', passed: true },
      { name: 'Sri Lanka West Channel', time: '08-02 06:00 UTC', passed: false },
      { name: 'Colombo Harbour Pilot Boarding', time: '08-02 10:00 UTC', passed: false }
    ]
  },
  {
    trackingId: 'AWB-098-842109',
    category: 'Air Cargo Freight',
    name: 'Air India Cargo Flight AIC-902 Heavy Freight',
    operator: 'Air India Cargo & Logistics',
    flag: '🇮🇳 India',
    origin: 'Chhatrapati Shivaji Cargo Hub, Mumbai',
    originCode: 'BOM',
    destination: 'Frankfurt Air Cargo Terminal, Germany',
    destinationCode: 'FRA',
    currentLat: 48.20,
    currentLng: 8.50,
    coordinates: "48° 12.0' N, 008° 30.0' E",
    speedKnots: 490,
    headingDeg: 310,
    altitudeOrDraught: '35,000 ft (72 Tons Express Cargo)',
    progressPct: 88,
    status: 'Final Approach',
    departureTime: '2026-08-02 04:00 UTC',
    etaTime: '2026-08-02 13:10 UTC',
    squawkOrImo: 'AWB #098-842109',
    callSign: 'AIC902C',
    weatherEnRoute: {
      temperature: '+18°C Ground Temp',
      windSpeed: '12 kts Westerly',
      visibility: '10 NM Clear',
      condition: 'Clear Sky',
      turbulenceOrSwell: 'Nil'
    },
    waypoints: [
      { name: 'BOM Air Cargo Load Complete', time: '03:30 UTC', passed: true },
      { name: 'BOM Takeoff Departure', time: '04:00 UTC', passed: true },
      { name: 'Middle East Air Corridor', time: '07:15 UTC', passed: true },
      { name: 'Central European Airway', time: '11:45 UTC', passed: true },
      { name: 'FRA Cargo Terminal Touchdown', time: '13:10 UTC', passed: false }
    ]
  }
];

export const GlobalFleetLocationTracker: React.FC<{ initialSearchId?: string }> = ({ initialSearchId }) => {
  const { currency, formatPrice } = useCurrency();
  const [searchInput, setSearchInput] = useState(initialSearchId || 'AI-101');
  const [trackedItem, setTrackedItem] = useState<LocationTrackItem>(
    SEARCHABLE_TRACKING_DATABASE.find(
      (i) => i.trackingId.toLowerCase() === (initialSearchId || 'AI-101').toLowerCase()
    ) || SEARCHABLE_TRACKING_DATABASE[0]
  );
  const [searchFeedback, setSearchFeedback] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchInput.trim().toLowerCase();
    const found = SEARCHABLE_TRACKING_DATABASE.find(
      (item) =>
        item.trackingId.toLowerCase().includes(query) ||
        item.name.toLowerCase().includes(query) ||
        item.callSign.toLowerCase().includes(query) ||
        item.squawkOrImo.toLowerCase().includes(query)
    );

    if (found) {
      setTrackedItem(found);
      setSearchFeedback('');
    } else {
      setSearchFeedback(`No active asset matching "${searchInput}". Showing fallback asset.`);
    }
  };

  return (
    <div id="global-location-tracker" className="space-y-6 animate-fadeIn font-sans">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 rounded-2xl p-6 border border-cyan-500/30 shadow-2xl text-white space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 uppercase flex items-center space-x-1">
                <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                <span>UNIFIED GPS / AIS / ADS-B TRACKING PORTAL</span>
              </span>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 uppercase">
                WORLD SERVICE TRACKER
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white mt-2 flex items-center space-x-3">
              <Navigation className="w-8 h-8 text-cyan-400 animate-spin" />
              <span>Airways, Cruise & Cargo Ships Location Tracker</span>
            </h1>
            <p className="text-slate-400 text-xs mt-1 max-w-3xl font-sans">
              Live global tracking for passenger flights, air freighters, ocean cruise liners, and marine container ships. Search any flight number, vessel IMO, or waybill container ID.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <CurrencySelector />
          </div>
        </div>

        {/* Global Search Bar */}
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row items-center gap-3 bg-slate-950 p-2 rounded-2xl border border-slate-800">
          <div className="relative flex-1 w-full">
            <Search className="w-5 h-5 text-cyan-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Enter Flight No (AI-101), Cruise/Ship IMO (9824001), or AWB (098-842109)..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl pl-10 pr-4 py-2.5 text-sm font-mono focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div className="flex items-center space-x-2 w-full sm:w-auto">
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-500 hover:from-cyan-400 hover:to-sky-400 text-slate-950 font-black text-xs transition-all shadow-lg shadow-cyan-500/20 flex items-center justify-center space-x-2 shrink-0"
            >
              <Radio className="w-4 h-4 animate-pulse" />
              <span>TRACK LIVE LOCATION</span>
            </button>
          </div>
        </form>

        {/* Quick Search Chips */}
        <div className="flex flex-wrap items-center gap-2 font-mono text-xs pt-1">
          <span className="text-slate-400 text-[10px] uppercase font-bold mr-1">Sample Assets:</span>
          {SEARCHABLE_TRACKING_DATABASE.map((item) => (
            <button
              key={item.trackingId}
              onClick={() => {
                setSearchInput(item.trackingId);
                setTrackedItem(item);
                setSearchFeedback('');
              }}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all border ${
                trackedItem.trackingId === item.trackingId
                  ? 'bg-cyan-500 text-slate-950 border-cyan-400'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {item.category === 'Airways Flight' && '✈️ '}
              {item.category === 'Cruise Ship' && '🚢 '}
              {item.category.includes('Cargo') && '📦 '}
              {item.trackingId}
            </button>
          ))}
        </div>

        {searchFeedback && (
          <div className="p-3 bg-amber-500/20 border border-amber-500/40 text-amber-300 rounded-xl text-xs flex items-center space-x-2">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
            <span>{searchFeedback}</span>
          </div>
        )}
      </div>

      {/* TRACKED ASSET CARD & RADAR VISUALIZER */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Main Telemetry & Progress Trajectory */}
        <div className="lg:col-span-2 space-y-6">
          {/* Main Asset Header Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-white space-y-6 shadow-xl font-mono">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <div className="flex items-center space-x-2 text-cyan-400 text-xs font-bold uppercase mb-1">
                  {trackedItem.category.includes('Airways') ? <Plane className="w-4 h-4" /> : <Ship className="w-4 h-4" />}
                  <span>{trackedItem.category} • {trackedItem.flag}</span>
                </div>
                <h2 className="text-xl font-black text-white">{trackedItem.name}</h2>
                <p className="text-xs text-slate-400 mt-0.5">{trackedItem.operator} | {trackedItem.squawkOrImo}</p>
              </div>

              <div className="text-right">
                <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 uppercase">
                  {trackedItem.status}
                </span>
                <span className="block text-[10px] text-slate-400 mt-1">Updated 10 sec ago</span>
              </div>
            </div>

            {/* Route Trajectory Progress Bar */}
            <div className="space-y-2 bg-slate-950 p-4 rounded-xl border border-slate-800">
              <div className="flex items-center justify-between text-xs">
                <div>
                  <span className="text-slate-500 text-[10px] block">ORIGIN ({trackedItem.originCode})</span>
                  <strong className="text-white text-sm">{trackedItem.origin}</strong>
                  <span className="text-slate-400 text-[10px] block mt-0.5">{trackedItem.departureTime}</span>
                </div>

                <div className="text-center px-4">
                  <span className="text-cyan-400 font-black text-base">{trackedItem.progressPct}%</span>
                  <span className="text-slate-500 block text-[10px]">EN ROUTE</span>
                </div>

                <div className="text-right">
                  <span className="text-slate-500 text-[10px] block">DESTINATION ({trackedItem.destinationCode})</span>
                  <strong className="text-white text-sm">{trackedItem.destination}</strong>
                  <span className="text-teal-300 text-[10px] block mt-0.5">ETA: {trackedItem.etaTime}</span>
                </div>
              </div>

              <div className="w-full bg-slate-900 rounded-full h-3 p-0.5 overflow-hidden border border-slate-800 relative">
                <div
                  className="bg-gradient-to-r from-cyan-500 via-sky-400 to-emerald-400 h-full rounded-full transition-all duration-500 relative"
                  style={{ width: `${trackedItem.progressPct}%` }}
                >
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg shadow-white/50 animate-ping" />
                </div>
              </div>
            </div>

            {/* Key Telemetry Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-500 text-[10px] block uppercase font-bold">GPS LAT / LNG</span>
                <strong className="text-cyan-300 text-xs">{trackedItem.coordinates}</strong>
              </div>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-500 text-[10px] block uppercase font-bold">SPEED</span>
                <strong className="text-emerald-400 text-xs">{trackedItem.speedKnots} knots</strong>
              </div>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-500 text-[10px] block uppercase font-bold">ALT / DRAUGHT</span>
                <strong className="text-amber-300 text-xs">{trackedItem.altitudeOrDraught}</strong>
              </div>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-500 text-[10px] block uppercase font-bold">HEADING</span>
                <strong className="text-white text-xs">{trackedItem.headingDeg}° Compass</strong>
              </div>
            </div>

            {/* Waypoints Timeline */}
            <div className="space-y-3 pt-2">
              <h3 className="text-xs font-bold text-slate-300 uppercase flex items-center space-x-1.5">
                <Clock className="w-4 h-4 text-cyan-400" />
                <span>Transit Route Waypoints & Flight Checkpoints</span>
              </h3>

              <div className="space-y-2">
                {trackedItem.waypoints.map((wp, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-xl border flex items-center justify-between text-xs transition-all ${
                      wp.passed
                        ? 'bg-emerald-950/20 border-emerald-800/60 text-emerald-300'
                        : 'bg-slate-950 border-slate-800 text-slate-400'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <CheckCircle2 className={`w-4 h-4 ${wp.passed ? 'text-emerald-400' : 'text-slate-600'}`} />
                      <span className="font-bold">{wp.name}</span>
                    </div>

                    <span className="text-[11px] font-mono">{wp.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Weather En-Route & Asset Specifications */}
        <div className="space-y-6 font-mono text-xs">
          {/* Weather En-Route Panel */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 text-white space-y-4 shadow-xl">
            <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
              <span className="text-amber-400 font-bold uppercase text-xs flex items-center space-x-1.5">
                <Wind className="w-4 h-4 text-amber-400" />
                <span>ATMOSPHERIC & OCEAN CONDITIONS</span>
              </span>
            </div>

            <div className="space-y-2.5">
              <div className="flex justify-between p-2.5 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-slate-400">Temperature:</span>
                <strong className="text-white">{trackedItem.weatherEnRoute.temperature}</strong>
              </div>
              <div className="flex justify-between p-2.5 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-slate-400">Wind Shear / Speed:</span>
                <strong className="text-cyan-300">{trackedItem.weatherEnRoute.windSpeed}</strong>
              </div>
              <div className="flex justify-between p-2.5 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-slate-400">Visibility:</span>
                <strong className="text-emerald-400">{trackedItem.weatherEnRoute.visibility}</strong>
              </div>
              <div className="flex justify-between p-2.5 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-slate-400">Atmosphere:</span>
                <strong className="text-teal-300">{trackedItem.weatherEnRoute.condition}</strong>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <span className="text-[10px] text-slate-500 uppercase font-bold block">TURBULENCE / SWELL STATE</span>
                <p className="text-amber-300 text-[11px] font-bold">{trackedItem.weatherEnRoute.turbulenceOrSwell}</p>
              </div>
            </div>
          </div>

          {/* Asset Info Summary */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 text-white space-y-4 shadow-xl">
            <div className="border-b border-slate-800 pb-3">
              <span className="text-cyan-400 font-bold uppercase text-xs flex items-center space-x-1.5">
                <Building2 className="w-4 h-4 text-cyan-400" />
                <span>OPERATOR & REGISTRATION</span>
              </span>
            </div>

            <div className="space-y-2 text-[11px]">
              <div className="flex justify-between">
                <span className="text-slate-400">Operator Line:</span>
                <strong className="text-white">{trackedItem.operator}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Flag Country:</span>
                <strong className="text-white">{trackedItem.flag}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Call Sign:</span>
                <strong className="text-cyan-300">{trackedItem.callSign}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">IMO / Squawk ID:</span>
                <strong className="text-amber-300">{trackedItem.squawkOrImo}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
