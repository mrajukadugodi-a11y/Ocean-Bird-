import React, { useState } from 'react';
import {
  Radio,
  Search,
  Filter,
  Ship,
  Compass,
  MapPin,
  Clock,
  ShieldAlert,
  Navigation,
  Anchor,
  Activity,
  CheckCircle2,
  AlertTriangle,
  Zap,
  Globe,
  Sliders,
  History,
  FileText,
  Printer,
  Download,
  ArrowRight
} from 'lucide-react';

export interface VesselTripRecord {
  tripId: string;
  vesselName: string;
  mmsi: string;
  flag: string;
  vesselType: string;
  departurePort: string;
  arrivalPort: string;
  departureDate: string;
  arrivalDate: string;
  distanceNM: number;
  avgSpeedKnots: number;
  totalFuelMT: number;
  cargoType: string;
  weatherSummary: string;
  status: 'Completed' | 'In Progress' | 'Diverted' | 'Delayed';
  voyageLegs: {
    legNumber: number;
    checkpoint: string;
    timestamp: string;
    latLng: string;
    speedKts: number;
    seaCondition: string;
  }[];
}

export const MOCK_VESSEL_TRIP_HISTORY: VesselTripRecord[] = [
  {
    tripId: 'VOY-2026-881',
    vesselName: 'MV DESH SHANTI',
    mmsi: '419001890',
    flag: '🇮🇳 India',
    vesselType: 'Crude Oil Tanker',
    departurePort: 'Ras Tanura, Saudi Arabia (SA RTN)',
    arrivalPort: 'Colombo Harbour, Sri Lanka (LK CMB)',
    departureDate: '2026-07-25 08:00 UTC',
    arrivalDate: '2026-08-02 10:00 UTC',
    distanceNM: 2140,
    avgSpeedKnots: 14.8,
    totalFuelMT: 185.4,
    cargoType: 'Light Crude Oil (120,000 MT)',
    weatherSummary: 'SW Monsoon swell encountered off Oman Coast (3.8m waves, 28kt winds)',
    status: 'In Progress',
    voyageLegs: [
      { legNumber: 1, checkpoint: 'Departure Ras Tanura Terminal', timestamp: '2026-07-25 08:00 UTC', latLng: '26.6° N, 50.1° E', speedKts: 12.0, seaCondition: 'Calm Gulf Waters' },
      { legNumber: 2, checkpoint: 'Strait of Hormuz Transit Point', timestamp: '2026-07-26 14:30 UTC', latLng: '26.5° N, 56.4° E', speedKts: 14.2, seaCondition: 'Moderate Coastal Breeze' },
      { legNumber: 3, checkpoint: 'Arabian Sea High Seas Passage', timestamp: '2026-07-28 20:00 UTC', latLng: '18.9° N, 68.4° E', speedKts: 15.1, seaCondition: 'Rough Monsoonal Swell' },
      { legNumber: 4, checkpoint: 'Offshore Mumbai Security Zone', timestamp: '2026-07-30 11:15 UTC', latLng: '18.9° N, 72.8° E', speedKts: 14.8, seaCondition: 'Moderate Rain Squalls' },
      { legNumber: 5, checkpoint: 'Colombo Port Approach Pilot Station', timestamp: '2026-08-02 09:30 UTC', latLng: '6.9° N, 79.8° E', speedKts: 6.0, seaCondition: 'Gentle Bay Swell' }
    ]
  },
  {
    tripId: 'VOY-2026-902',
    vesselName: 'EVER GIVEN II',
    mmsi: '563089000',
    flag: '🇸🇬 Singapore',
    vesselType: 'Ultra Large Container Ship (ULCS)',
    departurePort: 'Shanghai Yangshan, China (CN SHA)',
    arrivalPort: 'Rotterdam Maasvlakte, Netherlands (NL RTM)',
    departureDate: '2026-07-18 04:00 UTC',
    arrivalDate: '2026-08-12 16:00 UTC',
    distanceNM: 10520,
    avgSpeedKnots: 18.2,
    totalFuelMT: 840.2,
    cargoType: '20,100 TEU High Value Electronics & Consumer Goods',
    weatherSummary: 'Favorable East Asia passage; Typhoon outer band rain avoided off Taiwan',
    status: 'In Progress',
    voyageLegs: [
      { legNumber: 1, checkpoint: 'Shanghai Departure Pilot Boarding', timestamp: '2026-07-18 04:00 UTC', latLng: '30.6° N, 122.1° E', speedKts: 14.0, seaCondition: 'Smooth' },
      { legNumber: 2, checkpoint: 'Taiwan Strait Waypoint Alpha', timestamp: '2026-07-20 02:00 UTC', latLng: '24.1° N, 119.5° E', speedKts: 19.5, seaCondition: 'Moderate Outer Typhoon Band' },
      { legNumber: 3, checkpoint: 'Singapore Malacca Strait East Approach', timestamp: '2026-07-23 18:45 UTC', latLng: '1.2° N, 103.8° E', speedKts: 12.5, seaCondition: 'Heavy Vessel Traffic Calm' },
      { legNumber: 4, checkpoint: 'Sri Lanka Dondra Head Deep Water Route', timestamp: '2026-07-27 10:00 UTC', latLng: '5.8° N, 80.2° E', speedKts: 18.2, seaCondition: 'SW Monsoon Swells' },
      { legNumber: 5, checkpoint: 'Suez Canal South Entrance Anchorage', timestamp: '2026-08-04 06:00 UTC', latLng: '29.9° N, 32.5° E', speedKts: 8.0, seaCondition: 'Calm Desert Heat' }
    ]
  },
  {
    tripId: 'VOY-2026-412',
    vesselName: 'BANGLADESH SAMUDRA',
    mmsi: '403112450',
    flag: '🇧🇩 Bangladesh',
    vesselType: 'Capesize Bulk Carrier',
    departurePort: 'Port Hedland, Australia (AU PHE)',
    arrivalPort: 'Chattogram Anchorage, Bangladesh (BD CGP)',
    departureDate: '2026-07-10 12:00 UTC',
    arrivalDate: '2026-07-30 18:00 UTC',
    distanceNM: 3450,
    avgSpeedKnots: 11.4,
    totalFuelMT: 290.0,
    cargoType: 'Iron Ore Bulk Cargo (180,000 MT)',
    weatherSummary: 'Heavy monsoonal rains at Bay of Bengal destination; currently anchored',
    status: 'Completed',
    voyageLegs: [
      { legNumber: 1, checkpoint: 'Port Hedland Ore Terminal Departure', timestamp: '2026-07-10 12:00 UTC', latLng: '20.3° S, 118.5° E', speedKts: 10.0, seaCondition: 'Calm' },
      { legNumber: 2, checkpoint: 'Sunda Strait Passage', timestamp: '2026-07-16 08:30 UTC', latLng: '5.9° S, 105.8° E', speedKts: 12.0, seaCondition: 'Moderate Tropical Waters' },
      { legNumber: 3, checkpoint: 'Bay of Bengal Deep Water Basin', timestamp: '2026-07-24 14:00 UTC', latLng: '12.5° N, 88.0° E', speedKts: 11.8, seaCondition: 'Monsoon Depressions' },
      { legNumber: 4, checkpoint: 'Chattogram Outer Anchorage Area B', timestamp: '2026-07-30 18:00 UTC', latLng: '22.1° N, 91.7° E', speedKts: 0.2, seaCondition: 'Heavy Rain Monsoonal Tide' }
    ]
  },
  {
    tripId: 'VOY-2026-108',
    vesselName: 'CORDELIA EMPRESS',
    mmsi: '419889012',
    flag: '🇮🇳 India',
    vesselType: 'Luxury Cruise Ship',
    departurePort: 'Mumbai International Cruise Terminal (IN BOM)',
    arrivalPort: 'Kochi Cruise Terminal, India (IN COK)',
    departureDate: '2026-07-28 16:00 UTC',
    arrivalDate: '2026-08-01 06:00 UTC',
    distanceNM: 680,
    avgSpeedKnots: 16.5,
    totalFuelMT: 62.0,
    cargoType: '1,850 Cruise Passengers & Luxury Amenities',
    weatherSummary: 'Smooth coastal voyage with mild Konkan rain showers',
    status: 'Completed',
    voyageLegs: [
      { legNumber: 1, checkpoint: 'Mumbai Green Gate Pier Departure', timestamp: '2026-07-28 16:00 UTC', latLng: '18.9° N, 72.8° E', speedKts: 14.0, seaCondition: 'Calm Harbor' },
      { legNumber: 2, checkpoint: 'Goa Mormugao Port Stopover', timestamp: '2026-07-29 10:00 UTC', latLng: '15.4° N, 73.8° E', speedKts: 16.2, seaCondition: 'Gentle Coastal Swell' },
      { legNumber: 3, checkpoint: 'Lakshadweep Kavaratti Island Cruise', timestamp: '2026-07-30 14:00 UTC', latLng: '10.5° N, 72.6° E', speedKts: 17.5, seaCondition: 'Clear Blue Waters' },
      { legNumber: 4, checkpoint: 'Kochi Mattancherry Channel Arrival', timestamp: '2026-08-01 06:00 UTC', latLng: '9.9° N, 76.2° E', speedKts: 5.0, seaCondition: 'Smooth Backwaters' }
    ]
  }
];

export interface AISVessel {
  mmsi: string;
  imo: string;
  name: string;
  callSign: string;
  flag: string;
  vesselType: 'Tanker' | 'Container' | 'Bulk Carrier' | 'Passenger' | 'Fishing' | 'Tug/Supply';
  sogKts: number;
  cogDeg: number;
  lat: number;
  lng: number;
  coordinates: string;
  draughtM: number;
  destination: string;
  eta: string;
  navStatus: 'Underway' | 'At Anchor' | 'Moored' | 'Constrained by Draft';
  cpaNM: number; // Closest Point of Approach in NM
  tcpaMin: number; // Time to CPA in minutes
}

const MOCK_AIS_VESSELS: AISVessel[] = [
  {
    mmsi: '419001890',
    imo: '9845120',
    name: 'MV DESH SHANTI',
    callSign: 'VTIN',
    flag: '🇮🇳 India',
    vesselType: 'Tanker',
    sogKts: 14.8,
    cogDeg: 135,
    lat: 18.9,
    lng: 72.8,
    coordinates: "18° 54.2' N, 072° 48.5' E",
    draughtM: 14.2,
    destination: 'COLOMBO, SRI LANKA',
    eta: '2026-08-02 10:00 UTC',
    navStatus: 'Underway',
    cpaNM: 4.8,
    tcpaMin: 38
  },
  {
    mmsi: '563089000',
    imo: '9723011',
    name: 'EVER GIVEN II',
    callSign: '9V8812',
    flag: '🇸🇬 Singapore',
    vesselType: 'Container',
    sogKts: 18.2,
    cogDeg: 270,
    lat: 5.8,
    lng: 80.2,
    coordinates: "05° 48.0' N, 080° 12.0' E",
    draughtM: 15.8,
    destination: 'SUEZ CANAL / ROTTERDAM',
    eta: '2026-08-08 18:30 UTC',
    navStatus: 'Underway',
    cpaNM: 1.2,
    tcpaMin: 14
  },
  {
    mmsi: '403112450',
    imo: '9301140',
    name: 'BANGLADESH SAMUDRA',
    callSign: 'S2AB',
    flag: '🇧🇩 Bangladesh',
    vesselType: 'Bulk Carrier',
    sogKts: 0.2,
    cogDeg: 0,
    lat: 22.1,
    lng: 91.7,
    coordinates: "22° 06.1' N, 091° 42.0' E",
    draughtM: 9.5,
    destination: 'CHATTOGRAM ANCHORAGE',
    eta: '2026-07-31 04:00 UTC',
    navStatus: 'At Anchor',
    cpaNM: 8.5,
    tcpaMin: 120
  },
  {
    mmsi: '413200980',
    imo: '9901452',
    name: 'YUAN WANG 7',
    callSign: 'BRL9',
    flag: '🇨🇳 China',
    vesselType: 'Passenger',
    sogKts: 12.4,
    cogDeg: 195,
    lat: 6.9,
    lng: 79.8,
    coordinates: "06° 56.0' N, 079° 50.0' E",
    draughtM: 7.2,
    destination: 'HAMBANTOTA PORT',
    eta: '2026-08-01 14:00 UTC',
    navStatus: 'Underway',
    cpaNM: 2.1,
    tcpaMin: 22
  },
  {
    mmsi: '419889012',
    imo: '8812340',
    name: 'FISHING TRAWLER KANYAKUMARI',
    callSign: 'IND7',
    flag: '🇮🇳 India',
    vesselType: 'Fishing',
    sogKts: 6.5,
    cogDeg: 85,
    lat: 8.1,
    lng: 77.5,
    coordinates: "08° 05.0' N, 077° 32.0' E",
    draughtM: 3.2,
    destination: 'PFZ FISHING GROUNDS',
    eta: '2026-07-31 16:00 UTC',
    navStatus: 'Underway',
    cpaNM: 0.8,
    tcpaMin: 8
  }
];

export const VesselsAISTrackerView: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string>('ALL');
  const [searchMmsi, setSearchMmsi] = useState<string>('');
  const [selectedVessel, setSelectedVessel] = useState<AISVessel>(MOCK_AIS_VESSELS[0]);
  const [selectedTrip, setSelectedTrip] = useState<VesselTripRecord | null>(MOCK_VESSEL_TRIP_HISTORY[0]);
  const [tripFilter, setTripFilter] = useState<'ALL' | 'Completed' | 'In Progress'>('ALL');

  const filteredVessels = MOCK_AIS_VESSELS.filter((vessel) => {
    const matchesType = selectedType === 'ALL' || vessel.vesselType === selectedType;
    const matchesSearch =
      vessel.name.toLowerCase().includes(searchMmsi.toLowerCase()) ||
      vessel.mmsi.includes(searchMmsi) ||
      vessel.destination.toLowerCase().includes(searchMmsi.toLowerCase());

    return matchesType && matchesSearch;
  });

  return (
    <div id="vessels-ais-tracker-view" className="space-y-6">
      {/* Top Banner Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center space-x-2 text-cyan-400 font-bold text-xs uppercase tracking-wider mb-1">
              <Radio className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span>LIVE AUTOMATIC IDENTIFICATION SYSTEM (AIS) RADAR</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center space-x-2">
              <Ship className="w-6 h-6 text-cyan-400" />
              <span>Vessels AIS Tracker & CPA Collision Radar</span>
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl">
              Track commercial tankers, container ships, bulkers, and fishing trawlers in real-time across South Asian waters with Closest Point of Approach (CPA) warnings.
            </p>
          </div>

          <div className="flex items-center space-x-3 bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-xs font-mono">
            <Activity className="w-4 h-4 text-emerald-400 animate-pulse" />
            <span className="text-slate-300">AIS RECEIVERS ONLINE: <strong className="text-emerald-400">4,280 STATIONS</strong></span>
          </div>
        </div>
      </div>

      {/* Main Grid: Search/Filter + Vessels List + Active Telemetry */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Filter & Vessel Cards (2 Spans) */}
        <div className="lg:col-span-2 space-y-4">
          {/* Controls Bar */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row gap-3 items-center justify-between">
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input
                type="text"
                value={searchMmsi}
                onChange={(e) => setSearchMmsi(e.target.value)}
                placeholder="Search Vessel Name or MMSI..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
            </div>

            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="bg-slate-950 border border-slate-800 text-xs text-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:border-cyan-500 font-mono w-full sm:w-auto"
            >
              <option value="ALL">All Vessel Types</option>
              <option value="Tanker">Oil & Chemical Tankers</option>
              <option value="Container">Container Ships</option>
              <option value="Bulk Carrier">Bulk Carriers</option>
              <option value="Passenger">Passenger / Cruises</option>
              <option value="Fishing">Fishing Trawlers</option>
            </select>
          </div>

          {/* Vessels AIS List Cards */}
          <div className="space-y-3">
            {filteredVessels.map((vessel) => {
              const isSelected = selectedVessel.mmsi === vessel.mmsi;
              const isCpaWarning = vessel.cpaNM < 2.0;

              return (
                <div
                  key={vessel.mmsi}
                  onClick={() => setSelectedVessel(vessel)}
                  className={`bg-slate-900 border rounded-2xl p-4 cursor-pointer transition-all hover:border-cyan-500/80 shadow-lg space-y-3 ${
                    isSelected
                      ? 'border-cyan-500 bg-slate-900/90 ring-1 ring-cyan-500/40'
                      : 'border-slate-800'
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-2">
                    <div className="flex items-center space-x-2">
                      <Ship className="w-4 h-4 text-cyan-400" />
                      <strong className="text-white text-sm">{vessel.name}</strong>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-300 font-mono">
                        {vessel.flag}
                      </span>
                    </div>

                    <div className="flex items-center space-x-2 font-mono text-xs">
                      <span className="text-slate-400">MMSI: <strong className="text-cyan-300">{vessel.mmsi}</strong></span>
                      {isCpaWarning && (
                        <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 text-[10px] font-bold border border-rose-500/40 animate-pulse">
                          CPA ALERT {vessel.cpaNM} NM
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono text-slate-300">
                    <div>
                      <span className="text-[10px] text-slate-500 block">SOG (SPEED)</span>
                      <strong className="text-emerald-400">{vessel.sogKts} Knots</strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 block">COG (COURSE)</span>
                      <strong className="text-amber-300">{vessel.cogDeg}° True</strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 block">DRAUGHT</span>
                      <strong className="text-white">{vessel.draughtM} m</strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 block">STATUS</span>
                      <strong className="text-cyan-300">{vessel.navStatus}</strong>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 bg-slate-950 p-2 rounded-xl border border-slate-800/80">
                    <span>DEST: <strong className="text-white">{vessel.destination}</strong></span>
                    <span>ETA: <strong className="text-slate-300">{vessel.eta}</strong></span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Selected Vessel AIS Telemetry Detail */}
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
            <h3 className="font-bold text-white text-sm flex items-center space-x-2 border-b border-slate-800 pb-3">
              <Navigation className="w-4 h-4 text-cyan-400" />
              <span>AIS Vessel Telemetry Inspector</span>
            </h3>

            <div className="space-y-3 text-xs font-mono text-slate-300">
              <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 text-[10px]">VESSEL NAME</span>
                  <strong className="text-white text-sm">{selectedVessel.name}</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 text-[10px]">FLAG & CALLSIGN</span>
                  <span className="text-cyan-300">{selectedVessel.flag} ({selectedVessel.callSign})</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 text-[10px]">IMO / MMSI</span>
                  <span className="text-white">{selectedVessel.imo} / {selectedVessel.mmsi}</span>
                </div>
              </div>

              <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 text-[10px]">COORDINATES</span>
                  <span className="text-emerald-400 font-bold">{selectedVessel.coordinates}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 text-[10px]">CLOSEST APPROACH (CPA)</span>
                  <span className={selectedVessel.cpaNM < 2.0 ? 'text-rose-400 font-bold' : 'text-emerald-400 font-bold'}>
                    {selectedVessel.cpaNM} NM
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 text-[10px]">TIME TO CPA (TCPA)</span>
                  <span className="text-amber-300 font-bold">{selectedVessel.tcpaMin} mins</span>
                </div>
              </div>

              <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-1 text-[11px]">
                <span className="text-[10px] text-slate-500 font-bold block uppercase">DESTINATION PORT</span>
                <p className="text-white font-bold">{selectedVessel.destination}</p>
                <p className="text-[10px] text-cyan-300">ESTIMATED ARRIVAL: {selectedVessel.eta}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* VESSELS TRIP HISTORY SECTION */}
      <div id="vessels-trip-history" className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-white space-y-6 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center space-x-2 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-1">
              <History className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span>OFFICIAL VOYAGE LOGBOOK & TRIP HISTORY LEDGER</span>
            </div>
            <h2 className="text-xl font-black text-white flex items-center space-x-2">
              <Ship className="w-6 h-6 text-cyan-400" />
              <span>Vessels Trip History</span>
            </h2>
            <p className="text-xs text-slate-400">
              Historical voyage leg tracking, port departures/arrivals, nautical mile distances, fuel burn logs, and sea weather conditions.
            </p>
          </div>

          <div className="flex items-center space-x-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800 font-mono text-xs">
            <span className="text-slate-400 font-bold px-2">TRIP STATUS:</span>
            {['ALL', 'In Progress', 'Completed'].map((status) => (
              <button
                key={status}
                onClick={() => setTripFilter(status as any)}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                  tripFilter === status
                    ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Trip History Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Trip Cards List */}
          <div className="space-y-3 lg:col-span-1">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">SELECT VOYAGE TRIP RECORD:</h3>
            {MOCK_VESSEL_TRIP_HISTORY.filter(t => tripFilter === 'ALL' || t.status === tripFilter).map((trip) => {
              const isSelected = selectedTrip?.tripId === trip.tripId;

              return (
                <div
                  key={trip.tripId}
                  onClick={() => setSelectedTrip(trip)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-2 relative overflow-hidden ${
                    isSelected
                      ? 'bg-slate-950 border-cyan-500 ring-1 ring-cyan-500/50 shadow-xl'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-cyan-400 font-bold">{trip.tripId} • {trip.flag}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                      trip.status === 'Completed'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    }`}>
                      {trip.status}
                    </span>
                  </div>

                  <h4 className="font-extrabold text-sm text-white">{trip.vesselName}</h4>
                  <p className="text-[11px] text-slate-300 font-mono truncate">{trip.departurePort} → {trip.arrivalPort}</p>

                  <div className="flex justify-between text-[10px] font-mono text-slate-400 pt-2 border-t border-slate-800/80">
                    <span>Dist: <strong className="text-white">{trip.distanceNM} NM</strong></span>
                    <span>Fuel: <strong className="text-amber-300">{trip.totalFuelMT} MT</strong></span>
                    <span>Speed: <strong className="text-emerald-300">{trip.avgSpeedKnots} kts</strong></span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Selected Trip Leg Timeline Detail */}
          {selectedTrip && (
            <div className="lg:col-span-2 bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                <div>
                  <span className="text-[10px] font-mono text-cyan-400 font-bold block">{selectedTrip.tripId} • MMSI: {selectedTrip.mmsi}</span>
                  <h3 className="text-lg font-black text-white flex items-center space-x-2">
                    <span>{selectedTrip.vesselName}</span>
                    <span className="text-xs px-2.5 py-0.5 rounded bg-slate-900 border border-slate-800 font-mono text-slate-300">{selectedTrip.vesselType}</span>
                  </h3>
                  <p className="text-xs text-slate-300 mt-1 font-mono">
                    Cargo: <strong className="text-amber-300">{selectedTrip.cargoType}</strong>
                  </p>
                </div>

                <button
                  onClick={() => window.print()}
                  className="px-4 py-2 bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-500 hover:to-teal-500 text-white font-bold text-xs rounded-xl flex items-center space-x-2 shrink-0"
                >
                  <Printer className="w-4 h-4" />
                  <span>PRINT TRIP SUMMARY</span>
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                  <span className="text-slate-400 text-[10px] block">DEPARTURE</span>
                  <strong className="text-white text-xs block truncate">{selectedTrip.departurePort}</strong>
                  <span className="text-[10px] text-cyan-300">{selectedTrip.departureDate}</span>
                </div>
                <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                  <span className="text-slate-400 text-[10px] block">ARRIVAL</span>
                  <strong className="text-white text-xs block truncate">{selectedTrip.arrivalPort}</strong>
                  <span className="text-[10px] text-emerald-300">{selectedTrip.arrivalDate}</span>
                </div>
                <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                  <span className="text-slate-400 text-[10px] block">TOTAL DISTANCE</span>
                  <strong className="text-cyan-300 text-sm block">{selectedTrip.distanceNM} NM</strong>
                  <span className="text-[10px] text-slate-400">Avg {selectedTrip.avgSpeedKnots} kts</span>
                </div>
                <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                  <span className="text-slate-400 text-[10px] block">FUEL CONSUMED</span>
                  <strong className="text-amber-300 text-sm block">{selectedTrip.totalFuelMT} MT</strong>
                  <span className="text-[10px] text-slate-400">Heavy Fuel Oil</span>
                </div>
              </div>

              {/* Weather Summary Note */}
              <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-xs font-mono text-amber-200 flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                <span><strong>En Route Weather Log:</strong> {selectedTrip.weatherSummary}</span>
              </div>

              {/* Voyage Leg Timeline */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-300 font-mono uppercase tracking-wider flex items-center space-x-1.5">
                  <Navigation className="w-4 h-4 text-cyan-400" />
                  <span>Chronological Voyage Leg Checkpoints</span>
                </h4>

                <div className="relative border-l-2 border-cyan-500/40 pl-4 space-y-4 ml-2">
                  {selectedTrip.voyageLegs.map((leg) => (
                    <div key={leg.legNumber} className="relative group">
                      <div className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-cyan-400 border-2 border-slate-950 shadow-md" />
                      <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 space-y-1 font-mono text-xs">
                        <div className="flex items-center justify-between">
                          <strong className="text-white">Leg {leg.legNumber}: {leg.checkpoint}</strong>
                          <span className="text-[10px] text-cyan-300">{leg.timestamp}</span>
                        </div>
                        <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400 pt-1 border-t border-slate-800/60">
                          <span>Position: <strong className="text-slate-200">{leg.latLng}</strong></span>
                          <span>Speed: <strong className="text-emerald-300">{leg.speedKts} knots</strong></span>
                          <span>Sea State: <strong className="text-sky-300">{leg.seaCondition}</strong></span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
