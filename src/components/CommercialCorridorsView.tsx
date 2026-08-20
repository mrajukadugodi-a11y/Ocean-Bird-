import React, { useState } from 'react';
import {
  Globe2,
  Anchor,
  Ship,
  Search,
  Filter,
  CheckCircle2,
  Building2,
  MapPin,
  TrendingUp,
  Shield,
  Layers,
  ArrowRight,
  Info
} from 'lucide-react';

export interface CorridorDetail {
  id: string;
  corridorName: string;
  country: string;
  flagEmoji: string;
  keyPorts: string[];
  primaryCargo: string;
  dailyVesselCount: number;
  strategicImportance: string;
  navigationHazards: string;
  treatyStatus: string;
}

const COUNTRY_CORRIDORS: CorridorDetail[] = [
  // INDIA
  {
    id: 'CORRIDOR-IN-01',
    corridorName: 'West Coast Energy & Container Super-Corridor',
    country: 'India',
    flagEmoji: '🇮🇳',
    keyPorts: ['JNPT (Nhava Sheva)', 'Mundra Port', 'Kandla (Deendayal)', 'Mumbai Port', 'Cochin Port'],
    primaryCargo: 'Crude Oil, Refined Petroleum, Containers, Chemicals, LNG',
    dailyVesselCount: 420,
    strategicImportance: 'Gateway for 70% of India’s containerized foreign trade and Gulf crude imports.',
    navigationHazards: 'High fishing trawler density off Gujarat/Maharashtra, monsoon swells (June-Sept).',
    treatyStatus: 'IMO TSS Approved; MARPOL Annex I Special Area Compliance'
  },
  {
    id: 'CORRIDOR-IN-02',
    corridorName: 'East Coast Bulk & Industrial Highway',
    country: 'India',
    flagEmoji: '🇮🇳',
    keyPorts: ['Visakhapatnam', 'Paradip Port', 'Chennai Port', 'Kamarajar (Ennore)', 'Kolkata-Haldia'],
    primaryCargo: 'Thermal Coal, Iron Ore, Coking Coal, Containers, Crude',
    dailyVesselCount: 310,
    strategicImportance: 'Vital arterial link for eastern steel manufacturing hubs & power grid coal supply.',
    navigationHazards: 'Tropical cyclones in Bay of Bengal (Oct-Nov), heavy river siltation in Hooghly.',
    treatyStatus: 'BIMSTEC Coastal Shipping Agreement Active'
  },

  // BANGLADESH
  {
    id: 'CORRIDOR-BD-01',
    corridorName: 'Bay of Bengal Deep Sea Gateway',
    country: 'Bangladesh',
    flagEmoji: '🇧🇩',
    keyPorts: ['Chittagong (Chattogram)', 'Mongla Port', 'Matarbari Deep Sea Port', 'Payra Port'],
    primaryCargo: 'Ready-Made Garments (RMG), Raw Cotton, Grain, Cement Clinker, Fuel Oil',
    dailyVesselCount: 180,
    strategicImportance: 'Primary economic lifeline handling 92% of Bangladesh international commerce.',
    navigationHazards: 'Narrow Karnaphuli river channel, shallow draft tides, high anchorage congestion.',
    treatyStatus: 'Coastal Shipping Agreement with India; SAARC Trade Protocol'
  },

  // SRI LANKA
  {
    id: 'CORRIDOR-LK-01',
    corridorName: 'East-West Ocean Trunk Route (Galle-Colombo SLOC)',
    country: 'Sri Lanka',
    flagEmoji: '🇱🇰',
    keyPorts: ['Colombo Transshipment Hub', 'Hambantota International Port', 'Trincomalee Harbour'],
    primaryCargo: 'Transshipment Containers, Bunkering Fuel, Automobile Logistics',
    dailyVesselCount: 550,
    strategicImportance: 'Busiest east-west global shipping lane connecting Far East to Europe & Persian Gulf.',
    navigationHazards: 'Heavy whale migration route south of Dondra Head, dense tanker traffic.',
    treatyStatus: 'IMO Traffic Separation Scheme (TSS) Off Dondra Head'
  },

  // SINGAPORE
  {
    id: 'CORRIDOR-SG-01',
    corridorName: 'Malacca & Singapore Straits Maritime Nexus',
    country: 'Singapore',
    flagEmoji: '🇸🇬',
    keyPorts: ['Tuas Mega Port', 'Pasir Panjang Terminal', 'Jurong Island Energy Hub'],
    primaryCargo: 'Transshipment Containers, Marine Bunkers, Petrochemicals, Crude',
    dailyVesselCount: 950,
    strategicImportance: 'Global maritime mega-hub handling 25% of all sea-borne traded oil and containers.',
    navigationHazards: 'Extreme vessel traffic density, narrow Singapore Strait TSS, squalls (Sumatras).',
    treatyStatus: 'Tripartite Straits Agreement (SG-MY-ID); IMO Mandatory Ship Reporting'
  },

  // PAKISTAN
  {
    id: 'CORRIDOR-PK-01',
    corridorName: 'Arabian Sea CPEC Gateway Corridor',
    country: 'Pakistan',
    flagEmoji: '🇵🇰',
    keyPorts: ['Karachi Port', 'Port Qasim', 'Gwadar Deep Sea Port'],
    primaryCargo: 'Crude Oil, LNG, Textiles, Wheat, Rice, Bulk Fertilizer',
    dailyVesselCount: 140,
    strategicImportance: 'Terminal node of China-Pakistan Economic Corridor (CPEC) linking Central Asia.',
    navigationHazards: 'Siltation in Port Qasim approach channel, winter fog along Makran coast.',
    treatyStatus: 'CPEC Maritime Protocol; RSO Regional Security Framework'
  },

  // MALDIVES
  {
    id: 'CORRIDOR-MV-01',
    corridorName: 'One and a Half Degree Channel (Maldives SLOC)',
    country: 'Maldives',
    flagEmoji: '🇲🇻',
    keyPorts: ['Malé Commercial Port', 'Thilafushi Industrial Port', 'Ihavandhippolhu (iHavan)'],
    primaryCargo: 'Processed Fish Exports, Fuel, Construction Materials, Consumer Goods',
    dailyVesselCount: 220,
    strategicImportance: 'Controls crucial deep-water equatorial chokepoint channels across the Indian Ocean.',
    navigationHazards: 'Fragile coral atoll shoals, strong equatorial current drift.',
    treatyStatus: 'Colombo Security Conclave Partner; Indian Ocean Rim Association (IORA)'
  },

  // UNITED ARAB EMIRATES
  {
    id: 'CORRIDOR-AE-01',
    corridorName: 'Strait of Hormuz Energy & Logistics Corridor',
    country: 'United Arab Emirates',
    flagEmoji: '🇦🇪',
    keyPorts: ['Jebel Ali Port (DP World)', 'Fujairah Bunkering Hub', 'Khalifa Port (Abu Dhabi)'],
    primaryCargo: 'Crude Oil, Natural Gas (LNG), Re-export Containers, Aluminum',
    dailyVesselCount: 680,
    strategicImportance: 'World’s foremost oil chokepoint transit corridor and regional re-export hub.',
    navigationHazards: 'Geopolitical security alerts, high summer ambient heat, dense tanker convoys.',
    treatyStatus: 'GCC Unified Maritime Transport Agreement; IMO Special Area'
  }
];

export const CommercialCorridorsView: React.FC = () => {
  const [selectedCountry, setSelectedCountry] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeCorridor, setActiveCorridor] = useState<CorridorDetail>(COUNTRY_CORRIDORS[0]);

  const countriesList = ['ALL', 'India', 'Bangladesh', 'Sri Lanka', 'Singapore', 'Pakistan', 'Maldives', 'United Arab Emirates'];

  const filteredCorridors = COUNTRY_CORRIDORS.filter((c) => {
    const matchesCountry = selectedCountry === 'ALL' || c.country === selectedCountry;
    const matchesQuery =
      c.corridorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.keyPorts.some((p) => p.toLowerCase().includes(searchQuery.toLowerCase())) ||
      c.primaryCargo.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCountry && matchesQuery;
  });

  return (
    <div id="commercial-corridors-view" className="space-y-6 font-mono">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center space-x-2 text-cyan-400 font-bold text-xs uppercase tracking-wider mb-1">
              <Globe2 className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span>GLOBAL SEA LINES OF COMMUNICATION (SLOC) & COUNTRY DIRECTORY</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center space-x-2">
              <Anchor className="w-6 h-6 text-cyan-400" />
              <span>Commercial Maritime Trade Corridors</span>
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl font-sans">
              Country-by-country breakdown of major international shipping lanes, strategic commercial sea corridors, hub ports, cargo commodities, and navigation hazards.
            </p>
          </div>

          <div className="flex items-center space-x-3 text-xs font-mono">
            <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-center">
              <span className="text-[10px] text-slate-400 block uppercase">TOTAL CORRIDORS</span>
              <strong className="text-cyan-400 text-sm">{COUNTRY_CORRIDORS.length} INDEXED</strong>
            </div>
            <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-center">
              <span className="text-[10px] text-slate-400 block uppercase">COUNTRIES</span>
              <strong className="text-emerald-400 text-sm">7 NATIONS</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search country, port, or cargo..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div className="flex items-center space-x-2 w-full sm:w-auto overflow-x-auto text-xs pb-1 sm:pb-0">
          {countriesList.map((country) => (
            <button
              key={country}
              onClick={() => setSelectedCountry(country)}
              className={`px-3 py-1.5 rounded-xl border transition-all shrink-0 ${
                selectedCountry === country
                  ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300 font-bold'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-800'
              }`}
            >
              {country}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Country List + Corridor Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Corridors List */}
        <div className="space-y-3">
          <h3 className="font-bold text-white text-xs uppercase tracking-wider flex items-center space-x-2 border-b border-slate-800 pb-2">
            <Layers className="w-4 h-4 text-cyan-400" />
            <span>Commercial Corridors ({filteredCorridors.length})</span>
          </h3>

          <div className="space-y-3">
            {filteredCorridors.map((corridor) => {
              const isSelected = activeCorridor.id === corridor.id;

              return (
                <div
                  key={corridor.id}
                  onClick={() => setActiveCorridor(corridor)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all shadow-lg space-y-2 ${
                    isSelected
                      ? 'bg-slate-900 border-cyan-500 ring-1 ring-cyan-500'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="text-xs font-bold text-white flex items-center space-x-2">
                      <span className="text-base">{corridor.flagEmoji}</span>
                      <span>{corridor.country}</span>
                    </span>

                    <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-[10px] text-cyan-300 font-bold">
                      ~{corridor.dailyVesselCount} VSL/DAY
                    </span>
                  </div>

                  <strong className="text-slate-100 text-xs block leading-snug">{corridor.corridorName}</strong>

                  <p className="text-[11px] text-slate-400 line-clamp-2">
                    CARGO: {corridor.primaryCargo}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Corridor Dossier Inspector (2 Spans) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-5">
            <div className="flex flex-wrap items-center justify-between border-b border-slate-800 pb-3 gap-2">
              <div>
                <span className="text-[10px] text-cyan-400 font-bold uppercase block flex items-center space-x-1">
                  <span>{activeCorridor.flagEmoji}</span>
                  <span>MARITIME CORRIDOR DOSSIER • {activeCorridor.country}</span>
                </span>
                <h3 className="font-bold text-white text-lg">{activeCorridor.corridorName}</h3>
              </div>

              <span className="px-3 py-1 bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 rounded-full text-xs font-bold">
                TRAFFIC: ~{activeCorridor.dailyVesselCount} SHIPS / DAY
              </span>
            </div>

            {/* Key Hub Ports Tag Cloud */}
            <div className="space-y-2">
              <span className="text-xs text-slate-400 font-bold uppercase block">Primary Terminal & Port Hubs</span>
              <div className="flex flex-wrap gap-2">
                {activeCorridor.keyPorts.map((port) => (
                  <span
                    key={port}
                    className="px-3 py-1.5 bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-xl flex items-center space-x-1"
                  >
                    <Building2 className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{port}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Strategic Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-1">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">PRIMARY TRADED COMMODITIES</span>
                <p className="text-slate-200 leading-relaxed">{activeCorridor.primaryCargo}</p>
              </div>

              <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-1">
                <span className="text-[10px] text-amber-400 uppercase font-bold block">NAVIGATION & WEATHER HAZARDS</span>
                <p className="text-amber-200 leading-relaxed">{activeCorridor.navigationHazards}</p>
              </div>
            </div>

            {/* Strategic Importance Banner */}
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-2">
              <span className="text-xs text-emerald-400 font-bold uppercase block">Strategic Importance & International Treaties</span>
              <p className="text-xs text-slate-300 leading-relaxed">{activeCorridor.strategicImportance}</p>
              <div className="pt-2">
                <span className="px-2.5 py-1 bg-slate-900 border border-slate-800 text-cyan-300 rounded-lg text-[11px]">
                  TREATY / REGULATORY FRAMEWORK: {activeCorridor.treatyStatus}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
