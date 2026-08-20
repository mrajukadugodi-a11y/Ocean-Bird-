import React, { useState } from 'react';
import {
  ShieldAlert,
  Search,
  Filter,
  CheckCircle2,
  Waves,
  Sparkles,
  Info,
  Radio,
  Anchor,
  Globe,
  Fish,
  AlertTriangle,
  Heart,
  Droplets,
  Award
} from 'lucide-react';
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid
} from 'recharts';

export interface MarineHotspot {
  id: string;
  name: string;
  region: string;
  countryFlag: string;
  coordinates: string;
  biodiversityScore: number; // 0-100
  sstAnomalyC: number;
  threatLevel: 'CRITICAL' | 'HIGH' | 'MODERATE';
  primaryHazards: string[];
  keySpecies: string[];
  conservationDirectives: string[];
  vesselSpeedLimitKnots: number;
  blueCarbonYieldOdPerKm2: number;
  description: string;
  statusActionDispatched?: boolean;
}

export const MARINE_HOTSPOTS_DATA: MarineHotspot[] = [
  {
    id: 'HOT-CORAL-TRIANGLE',
    name: 'Coral Triangle Marine Sanctuary',
    region: 'Indo-Pacific (Indonesia, Philippines, PNG)',
    countryFlag: '🇮🇩',
    coordinates: '2.5° S, 122.0° E',
    biodiversityScore: 96,
    sstAnomalyC: 2.15,
    threatLevel: 'CRITICAL',
    primaryHazards: ['Coral Bleaching Degree Weeks >12', 'Microplastic Plume', 'Destructive Fishing'],
    keySpecies: ['Whale Sharks', 'Hawksbill Turtles', 'Pygmy Seahorses', 'Manta Rays'],
    conservationDirectives: [
      'Strict 10-knot maximum speed limit inside sanctuary limits',
      'Zero ballast water or greywater discharge within 20 NM',
      'Active hydrophone acoustic monitoring for whale shark presence'
    ],
    vesselSpeedLimitKnots: 10,
    blueCarbonYieldOdPerKm2: 8400,
    description: 'Home to 76% of all known coral species and 37% of coral reef fish species. Severe marine heatwave currently causing heat stress.'
  },
  {
    id: 'HOT-GBR',
    name: 'Great Barrier Reef Reserve',
    region: 'Coral Sea & Queensland Coast',
    countryFlag: '🇦🇺',
    coordinates: '18.2° S, 147.5° E',
    biodiversityScore: 91,
    sstAnomalyC: 1.85,
    threatLevel: 'CRITICAL',
    primaryHazards: ['Mass Coral Bleaching', 'Ocean Acidification', 'Agricultural Runoff'],
    keySpecies: ['Dugongs', 'Green Sea Turtles', 'Branching Acropora Coral', 'Clownfish'],
    conservationDirectives: [
      'Mandatory pilotage in Hydrographers Passage',
      'Non-toxic eco hull coatings required for all commercial vessels',
      'Mooring buoy usage enforced; anchoring strictly prohibited'
    ],
    vesselSpeedLimitKnots: 11,
    blueCarbonYieldOdPerKm2: 6800,
    description: 'World heritage protected site spanning 2,300 km. Experiencing recurrent thermal bleaching events from elevated SST anomalies.'
  },
  {
    id: 'HOT-SARGASSO',
    name: 'Sargasso Sea Open-Ocean Haven',
    region: 'North Atlantic Ocean Gyre',
    countryFlag: '🏝️',
    coordinates: '28.0° N, 66.0° W',
    biodiversityScore: 84,
    sstAnomalyC: 1.62,
    threatLevel: 'HIGH',
    primaryHazards: ['High Microplastic Accumulation (2,950/m³)', 'Trawl Noise Pollution', 'Heavy Ship Traffic'],
    keySpecies: ['Sargassum Fish', 'Loggerhead Hatchlings', 'American & European Eels', 'Humpback Whales'],
    conservationDirectives: [
      'Acoustic noise mitigation required for cruise ship propellors',
      'Voluntary speed reduction during eel migration season',
      'Plastic trash zero-discharge inspection at berth'
    ],
    vesselSpeedLimitKnots: 12,
    blueCarbonYieldOdPerKm2: 4500,
    description: 'The only sea without land boundaries, bound by ocean currents. Golden floating algae provides nursery habitat for endangered hatchlings.'
  },
  {
    id: 'HOT-SUNDARBANS',
    name: 'Sundarbans Mangrove Blue Carbon Sink',
    region: 'Bay of Bengal & Ganges Delta',
    countryFlag: '🇧🇩',
    coordinates: '21.8° N, 89.2° E',
    biodiversityScore: 93,
    sstAnomalyC: 1.45,
    threatLevel: 'HIGH',
    primaryHazards: ['Cyclonic Surge Inundation', 'Salinity Intrusion (+3.8 PSU)', 'Oil Spill Exposure'],
    keySpecies: ['Irrawaddy Dolphins', 'Royal Bengal Tigers', 'Estuarine Crocodiles', 'Finless Porpoises'],
    conservationDirectives: [
      'Low-wake hull speeds in river channels to prevent bank erosion',
      'Emergency oil boom deployment equipment mandatory on tankers',
      'Continuous river water salinity & pH monitoring'
    ],
    vesselSpeedLimitKnots: 8,
    blueCarbonYieldOdPerKm2: 9800,
    description: 'World largest contiguous mangrove forest. Crucial blue carbon buffer absorbing massive monsoonal surge impacts.'
  },
  {
    id: 'HOT-KRILL-SOUTH',
    name: 'Sub-Antarctic Krill Grounds',
    region: 'Southern Ocean & Drake Passage',
    countryFlag: '❄️',
    coordinates: '62.0° S, 58.0° W',
    biodiversityScore: 88,
    sstAnomalyC: 1.10,
    threatLevel: 'HIGH',
    primaryHazards: ['Ocean Acidification (pH 7.78)', 'Commercial Overfishing', 'Glacial Calving Waves'],
    keySpecies: ['Antarctic Krill', 'Blue Whales', 'Emperor Penguins', 'Leopard Seals'],
    conservationDirectives: [
      'Strict CCAMLR krill harvest quota enforcement',
      'Zero heavy fuel oil (HFO) usage inside polar waters',
      'Infrared thermal cameras active for whale collision avoidance'
    ],
    vesselSpeedLimitKnots: 10,
    blueCarbonYieldOdPerKm2: 7200,
    description: 'Keystone food source powering the entire Southern Ocean web. Acidification threatens shell development in juvenile krill.'
  },
  {
    id: 'HOT-ARCTIC-ICE',
    name: 'Arctic Ice Margin Sanctuary',
    region: 'Arctic Basin & Northwest Passage',
    countryFlag: '🏔️',
    coordinates: '74.5° N, 95.0° W',
    biodiversityScore: 78,
    sstAnomalyC: 2.40,
    threatLevel: 'CRITICAL',
    primaryHazards: ['Rapid Summer Sea Ice Loss (-14.2%/decade)', 'Black Carbon Stack Soot', 'Subsea Noise'],
    keySpecies: ['Polar Bears', 'Beluga Whales', 'Narwhals', 'Ringed Seals'],
    conservationDirectives: [
      'Mandatory Polar Code safety certification for all ships',
      'Zero scrubbers discharge in Arctic ice edge zones',
      'Mandatory 5 NM buffer zone around ice-edge mammal aggregations'
    ],
    vesselSpeedLimitKnots: 9,
    blueCarbonYieldOdPerKm2: 5100,
    description: 'Rapidly warming realm where sea ice retreat alters marine migration routes and exposes pristine habitats to shipping.'
  }
];

export const MarineBiodiversityModule: React.FC = () => {
  const [hotspots, setHotspots] = useState<MarineHotspot[]>(MARINE_HOTSPOTS_DATA);
  const [selectedHotspot, setSelectedHotspot] = useState<MarineHotspot>(MARINE_HOTSPOTS_DATA[0]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterLevel, setFilterLevel] = useState<'ALL' | 'CRITICAL' | 'HIGH'>('ALL');
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  const handleDispatchProtectionDirective = (id: string) => {
    setHotspots((prev) =>
      prev.map((h) => (h.id === id ? { ...h, statusActionDispatched: true } : h))
    );
    setActionNotice(`🛡️ Conservation Protection Directive Dispatched for ${selectedHotspot.name}! Speed buffer & zero-discharge enforced.`);
    setTimeout(() => setActionNotice(null), 4000);
  };

  const filteredHotspots = hotspots.filter((h) => {
    const matchesSearch = h.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          h.region.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          h.keySpecies.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesLevel = filterLevel === 'ALL' || h.threatLevel === filterLevel;
    return matchesSearch && matchesLevel;
  });

  // Recharts radar data for biodiversity health metrics
  const radarHealthData = hotspots.map((h) => ({
    spot: h.name.split(' ')[0],
    Score: h.biodiversityScore,
    SST_Risk: Math.round(h.sstAnomalyC * 35),
    Speed_Limit: h.vesselSpeedLimitKnots * 7
  }));

  return (
    <div className="bg-slate-950 border border-emerald-500/40 rounded-2xl p-6 text-white space-y-6 font-mono shadow-2xl">
      {/* HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center space-x-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Fish className="w-4 h-4 text-emerald-400 animate-bounce" />
            <span>GLOBAL MARINE ECOSYSTEM & SANCTUARY PROTECTOR</span>
          </div>
          <h2 className="text-2xl font-black text-white flex items-center space-x-2">
            <span>Marine Biodiversity & Ecosystem Tracker</span>
          </h2>
          <p className="text-xs text-slate-400 font-sans mt-1 max-w-3xl">
            Monitor coral reefs, whale sanctuaries, mangrove blue carbon sinks, and polar habitats with real-time speed restrictions and conservation directives.
          </p>
        </div>

        {/* SEARCH & FILTERS */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search hotspot or species..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-slate-900 border border-slate-800 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 font-mono focus:border-emerald-400"
            />
          </div>

          <div className="flex items-center space-x-1 bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs">
            {(['ALL', 'CRITICAL', 'HIGH'] as const).map((lvl) => (
              <button
                key={lvl}
                onClick={() => setFilterLevel(lvl)}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                  filterLevel === lvl ? 'bg-emerald-500 text-slate-950' : 'text-slate-400 hover:text-white'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>
      </div>

      {actionNotice && (
        <div className="bg-emerald-500/20 border border-emerald-400 text-emerald-200 p-3 rounded-xl text-xs font-bold font-mono text-center animate-fadeIn">
          {actionNotice}
        </div>
      )}

      {/* HOTSPOT CARDS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredHotspots.map((spot) => {
          const isSelected = selectedHotspot.id === spot.id;
          return (
            <div
              key={spot.id}
              onClick={() => setSelectedHotspot(spot)}
              className={`p-4 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between space-y-3 relative overflow-hidden ${
                isSelected
                  ? 'bg-emerald-950/40 border-emerald-400 ring-2 ring-emerald-400/60 shadow-xl'
                  : 'bg-slate-900 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-base">{spot.countryFlag}</span>
                  <span
                    className={`px-2 py-0.5 rounded text-[9px] font-black uppercase border ${
                      spot.threatLevel === 'CRITICAL'
                        ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                        : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                    }`}
                  >
                    {spot.threatLevel} THREAT
                  </span>
                </div>

                <h3 className="text-sm font-extrabold text-white">{spot.name}</h3>
                <span className="text-[10px] text-slate-400 block font-mono">{spot.region}</span>
                <p className="text-[11px] text-slate-300 font-sans line-clamp-2">{spot.description}</p>
              </div>

              <div className="pt-2 border-t border-slate-800 space-y-1.5 text-[10px] font-mono">
                <div className="flex justify-between">
                  <span className="text-slate-400">Bio Index:</span>
                  <strong className="text-emerald-400 font-bold">{spot.biodiversityScore} / 100</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Speed Limit:</span>
                  <strong className="text-cyan-300 font-bold">{spot.vesselSpeedLimitKnots} Knots Max</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">SST Anomaly:</span>
                  <strong className="text-rose-400 font-bold">+{spot.sstAnomalyC}°C</strong>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* SELECTED HOTSPOT DETAILED INSPECTOR & RADAR CHART */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* INSPECTOR DETAILS */}
        <div className="lg:col-span-7 bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <span className="text-[10px] text-emerald-400 font-bold uppercase block">HOTSPOT SANCTUARY DETAIL</span>
              <h3 className="text-xl font-black text-white flex items-center space-x-2">
                <span>{selectedHotspot.countryFlag} {selectedHotspot.name}</span>
              </h3>
              <span className="text-slate-400 text-xs font-mono">{selectedHotspot.coordinates} • {selectedHotspot.region}</span>
            </div>

            <div className="text-right shrink-0">
              <span className="text-[10px] text-slate-400 block font-bold uppercase">BLUE CARBON VALUE</span>
              <strong className="text-emerald-400 text-lg font-black">${selectedHotspot.blueCarbonYieldOdPerKm2} /km²</strong>
            </div>
          </div>

          <div className="space-y-3 font-sans text-xs">
            <div>
              <strong className="text-amber-400 font-mono text-[10px] uppercase block mb-1">KEY PROTECTED SPECIES:</strong>
              <div className="flex flex-wrap gap-1.5 font-mono text-[10px]">
                {selectedHotspot.keySpecies.map((sp, idx) => (
                  <span key={idx} className="bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800 text-emerald-300">
                    🐬 {sp}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <strong className="text-rose-400 font-mono text-[10px] uppercase block mb-1">PRIMARY HAZARDS:</strong>
              <div className="flex flex-wrap gap-1.5 font-mono text-[10px]">
                {selectedHotspot.primaryHazards.map((hz, idx) => (
                  <span key={idx} className="bg-rose-950/40 px-2.5 py-1 rounded-lg border border-rose-500/30 text-rose-300">
                    ⚠️ {hz}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-1.5 font-mono text-[11px] bg-slate-950 p-3 rounded-xl border border-slate-800">
              <strong className="text-cyan-300 block text-[10px] uppercase">CAPTAIN CONSERVATION DIRECTIVES:</strong>
              <ul className="list-disc list-inside space-y-1 text-slate-300 font-sans">
                {selectedHotspot.conservationDirectives.map((dir, idx) => (
                  <li key={idx}>{dir}</li>
                ))}
              </ul>
            </div>
          </div>

          <button
            onClick={() => handleDispatchProtectionDirective(selectedHotspot.id)}
            disabled={selectedHotspot.statusActionDispatched}
            className={`w-full py-3 rounded-xl font-black text-xs uppercase shadow-xl transition-all ${
              selectedHotspot.statusActionDispatched
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 cursor-default'
                : 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950'
            }`}
          >
            {selectedHotspot.statusActionDispatched
              ? '✅ CONSERVATION PROTECTION DIRECTIVE ENFORCED'
              : 'ENFORCE SPEED BUFFER & ZERO-DISCHARGE DIRECTIVE'}
          </button>
        </div>

        {/* RADAR CHART & HEALTH METRICS */}
        <div className="lg:col-span-5 bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-4">
          <div className="border-b border-slate-800 pb-3 flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <strong className="text-white font-extrabold text-sm">Ecosystem Health Radar Matrix</strong>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarHealthData}>
                <PolarGrid stroke="#334155" />
                <PolarAngleAxis dataKey="spot" stroke="#94a3b8" tick={{ fontSize: 10 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#64748b" />
                <Radar name="Biodiversity Score" dataKey="Score" stroke="#10b981" fill="#10b981" fillOpacity={0.5} />
                <Radar name="Thermal Stress Risk" dataKey="SST_Risk" stroke="#f43f5e" fill="#f43f5e" fillOpacity={0.3} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155' }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <p className="text-slate-400 text-[11px] font-sans text-center">
            Comparison of biodiversity resilience against sea surface temperature anomalies across ocean basins.
          </p>
        </div>
      </div>
    </div>
  );
};
