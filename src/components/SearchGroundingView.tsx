import React, { useState } from 'react';
import {
  Search,
  ShieldAlert,
  AlertTriangle,
  Anchor,
  Compass,
  MapPin,
  HelpCircle,
  CheckCircle2,
  Filter,
  Info,
  Phone,
  Radio,
  ExternalLink,
  Zap,
  Activity,
  Layers
} from 'lucide-react';

export interface GroundingHazardZone {
  id: string;
  hazardName: string;
  seaBody: string;
  country: string;
  flag: string;
  minChartDepthM: number;
  hazardType: 'Coral Reef / Atoll' | 'Shallow Sandbar' | 'Submerged Wreck' | 'Uncharted Shoal' | 'Mud Flat';
  coordinates: string;
  riskSeverity: 'High Grounding Risk' | 'Moderate Warning' | 'Seasonal Risk';
  vesselDraftRestrictionM: number;
  description: string;
  lastHydrographyUpdate: string;
  emergencySalvageContact: string;
}

const GROUNDING_HAZARD_ZONES: GroundingHazardZone[] = [
  {
    id: 'palk-strait-adams-bridge',
    hazardName: 'Palk Strait Shallow Reefs & Adams Bridge Shoals',
    seaBody: 'Palk Strait / Bay of Bengal',
    country: 'India & Sri Lanka',
    flag: '🇮🇳 🇱🇰',
    minChartDepthM: 2.1,
    hazardType: 'Shallow Sandbar',
    coordinates: '09.12°N, 79.52°E',
    riskSeverity: 'High Grounding Risk',
    vesselDraftRestrictionM: 3.5,
    description: 'Chain of limestone shoals and shifting sandbars restricting transit between Gulf of Mannar and Palk Bay. Commercial vessel grounding risk if draft exceeds 3.5m.',
    lastHydrographyUpdate: 'Hydrographic Survey 2025-Q4',
    emergencySalvageContact: 'Tuticorin Port Tug Command (+91 461 2352290)'
  },
  {
    id: 'sundarbans-meghna-estuary',
    hazardName: 'Meghna Estuary Sandbars & Sandwip Channel',
    seaBody: 'North Bay of Bengal',
    country: 'Bangladesh',
    flag: '🇧🇩',
    minChartDepthM: 3.8,
    hazardType: 'Mud Flat',
    coordinates: '22.15°N, 91.30°E',
    riskSeverity: 'High Grounding Risk',
    vesselDraftRestrictionM: 5.5,
    description: 'Dynamic silt accumulation from Padma & Meghna rivers forming unchartered mud banks. Deep-draft feeder vessels prone to stranding during low ebb tide.',
    lastHydrographyUpdate: 'Chittagong Port Authority Notice to Mariners #14',
    emergencySalvageContact: 'Mongla Port Salvage Vessel Command (+880 4662 75200)'
  },
  {
    id: 'male-south-atoll-pass',
    hazardName: 'South Malé Atoll Reef Edge & Vaadhoo Channel Reefs',
    seaBody: 'Indian Ocean',
    country: 'Maldives',
    flag: '🇲🇻',
    minChartDepthM: 1.5,
    hazardType: 'Coral Reef / Atoll',
    coordinates: '04.10°N, 73.50°E',
    riskSeverity: 'High Grounding Risk',
    vesselDraftRestrictionM: 4.0,
    description: 'Vertical coral wall drops abruptly into deep water. Strong cross-channel tidal set causes drift onto outer coral reef heads.',
    lastHydrographyUpdate: 'MNDF Coast Guard Hydrographic Chart 2026',
    emergencySalvageContact: 'MNDF Coast Guard Rescue Hotline 191'
  },
  {
    id: 'dondra-head-submerged-wreck',
    hazardName: 'Dondra Head Shallow Wreck & Coral Patch',
    seaBody: 'Indian Ocean',
    country: 'Sri Lanka',
    flag: '🇱🇰',
    minChartDepthM: 8.5,
    hazardType: 'Submerged Wreck',
    coordinates: '05.90°N, 80.58°E',
    riskSeverity: 'Moderate Warning',
    vesselDraftRestrictionM: 8.0,
    description: 'Sunken bulk carrier hull resting at 8.5m depth off Dondra TSS. Danger for deep-draft crude tankers transiting close to coast.',
    lastHydrographyUpdate: 'Sri Lanka Navy Hydrographic Office 2025',
    emergencySalvageContact: 'Colombo MRCC (+94 11 2445771)'
  },
  {
    id: 'andaman-ten-degree-channel',
    hazardName: 'Ten Degree Channel Submerged Seamount & Coral Heads',
    seaBody: 'Andaman Sea',
    country: 'India (Andaman & Nicobar)',
    flag: '🇮🇳',
    minChartDepthM: 11.2,
    hazardType: 'Uncharted Shoal',
    coordinates: '10.00°N, 92.50°E',
    riskSeverity: 'Seasonal Risk',
    vesselDraftRestrictionM: 10.5,
    description: 'Volcanic seamounts rising sharply from deep trench floor. Heavy southwest monsoon swells cause sea depth fluctuations up to 4m.',
    lastHydrographyUpdate: 'INCOIS Ocean Survey 2026',
    emergencySalvageContact: 'Port Blair Coast Guard (+91 3192 232681)'
  },
  {
    id: 'gwadar-pasni-coastal-shelf',
    hazardName: 'Pasni Bay & Gwadar Headland Shallow Mud Lumps',
    seaBody: 'Arabian Sea',
    country: 'Pakistan',
    flag: '🇵🇰',
    minChartDepthM: 4.2,
    hazardType: 'Mud Flat',
    coordinates: '25.20°N, 63.45°E',
    riskSeverity: 'Moderate Warning',
    vesselDraftRestrictionM: 5.0,
    description: 'Active mud volcanoes causing sudden seabed rise and methane gas bubbling in shallow waters near Gwadar deepwater port approaches.',
    lastHydrographyUpdate: 'Pakistan Navy Hydrographic Dept 2025',
    emergencySalvageContact: 'Karachi MRCC (+92 21 99201389)'
  }
];

export const SearchGroundingView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [seaBodyFilter, setSeaBodyFilter] = useState('All');
  const [hazardTypeFilter, setHazardTypeFilter] = useState('All');

  // Interactive Grounding Risk Check Calculator
  const [myVesselDraft, setMyVesselDraft] = useState<number>(9.5);
  const [myChannelDepth, setMyChannelDepth] = useState<number>(10.2);
  const [swellMargin, setSwellMargin] = useState<number>(1.2);

  // Filter hazards
  const filteredHazards = GROUNDING_HAZARD_ZONES.filter((zone) => {
    const matchesSearch =
      zone.hazardName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      zone.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      zone.coordinates.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSea = seaBodyFilter === 'All' ? true : zone.seaBody.includes(seaBodyFilter);
    const matchesType = hazardTypeFilter === 'All' ? true : zone.hazardType === hazardTypeFilter;

    return matchesSearch && matchesSea && matchesType;
  });

  // Calculate grounding probability score (0 to 100%)
  const effectiveClearance = myChannelDepth - (myVesselDraft + swellMargin);
  let riskScore = 0;
  if (effectiveClearance <= 0) {
    riskScore = 98; // Extreme danger
  } else if (effectiveClearance < 0.5) {
    riskScore = 78; // High danger
  } else if (effectiveClearance < 1.2) {
    riskScore = 45; // Moderate risk
  } else {
    riskScore = 12; // Low risk
  }

  return (
    <div id="search-grounding-view" className="space-y-6">
      {/* Top Banner Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center space-x-2 text-rose-400 font-bold text-xs uppercase tracking-wider mb-1">
              <ShieldAlert className="w-4 h-4 text-rose-400 animate-ping" />
              <span>HYDROGRAPHIC BATHYMETRY & SHALLOW REEF GROUNDING PREVENTOR</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center space-x-2">
              <Anchor className="w-6 h-6 text-rose-400" />
              <span>Search Grounding & Shallow Reef Hazard Intelligence</span>
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl">
              Search bathymetric hazards, coral reef wall margins, submerged wrecks, and mud banks across South Asian waterways to prevent vessel grounding and hull damage.
            </p>
          </div>

          <div className="flex items-center space-x-3 bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-xs">
            <Zap className="w-4 h-4 text-amber-400" />
            <div>
              <div className="text-white font-bold">Bathymetry Database Status</div>
              <div className="text-slate-400 text-[10px]">6 Regional Zones Tracked</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: 1. Search Grounding Risk Calculator | 2. Search Grounding Hazard Engine */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Instant Vessel Draft & Grounding Risk Calculator (1 Col) */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-xs font-bold text-rose-400 uppercase border-b border-slate-800 pb-2">
              <Activity className="w-4 h-4 text-rose-400" />
              <span>Vessel Grounding Risk Analyzer</span>
            </div>

            <p className="text-xs text-slate-400">
              Check if your current vessel draft exceeds channel depth under swell conditions.
            </p>

            <div className="space-y-3 text-xs pt-1">
              <div>
                <label className="text-slate-300 font-semibold mb-1 block">Vessel Loaded Draft (Meters)</label>
                <input
                  type="number"
                  step="0.1"
                  value={myVesselDraft}
                  onChange={(e) => setMyVesselDraft(parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-rose-300 font-mono font-bold focus:outline-none focus:border-rose-500"
                />
              </div>

              <div>
                <label className="text-slate-300 font-semibold mb-1 block">Charted Minimum Water Depth (Meters)</label>
                <input
                  type="number"
                  step="0.1"
                  value={myChannelDepth}
                  onChange={(e) => setMyChannelDepth(parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-rose-500"
                />
              </div>

              <div>
                <label className="text-slate-300 font-semibold mb-1 block">Swell & Squat Allowance (Meters)</label>
                <input
                  type="number"
                  step="0.1"
                  value={swellMargin}
                  onChange={(e) => setSwellMargin(parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-amber-300 font-mono focus:outline-none focus:border-rose-500"
                />
              </div>
            </div>

            {/* Risk Probability Output */}
            <div
              className={`p-4 rounded-2xl border space-y-2 font-mono ${
                riskScore >= 70
                  ? 'bg-rose-950/80 border-rose-500/80 text-rose-200'
                  : riskScore >= 40
                  ? 'bg-amber-950/80 border-amber-500/80 text-amber-200'
                  : 'bg-emerald-950/80 border-emerald-500/80 text-emerald-200'
              }`}
            >
              <div className="flex items-center justify-between text-[11px] font-bold">
                <span>GROUNDING PROBABILITY</span>
                <span className="font-extrabold">{riskScore}% RISK</span>
              </div>

              <div className="w-full bg-slate-950 rounded-full h-3 overflow-hidden border border-slate-800">
                <div
                  className={`h-full transition-all duration-500 ${
                    riskScore >= 70 ? 'bg-rose-500' : riskScore >= 40 ? 'bg-amber-500' : 'bg-emerald-500'
                  }`}
                  style={{ width: `${riskScore}%` }}
                />
              </div>

              <div className="text-[11px] pt-1">
                Net Under-Keel Margin: <strong>{effectiveClearance.toFixed(2)} meters</strong>
              </div>

              <p className="text-[10px] opacity-90 leading-tight">
                {riskScore >= 70
                  ? 'CRITICAL GROUNDING DANGER: Vessel draft exceeds safe water depth! Do NOT proceed without tidal rise or draft reduction.'
                  : riskScore >= 40
                  ? 'MODERATE GROUNDING WARNING: Minimal safety clearance. Maintain low speed to reduce squat effect.'
                  : 'SAFE NAVIGATION: Vessel draft is well within chart depth limits.'}
              </p>
            </div>
          </div>

          <div className="text-[10px] text-slate-500 border-t border-slate-800 pt-3">
            Always verify with official Notice to Mariners and local Port Pilot instructions.
          </div>
        </div>

        {/* Right Column: Search Grounding Hazard Engine & Database (2 Cols) */}
        <div className="lg:col-span-2 space-y-4">
          {/* Controls Bar: Search & Category Filters */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input
                type="text"
                placeholder="Search shallow reef, shoal, or wreck..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
              />
            </div>

            {/* Filter Dropdowns */}
            <div className="flex items-center space-x-2 w-full sm:w-auto">
              <select
                value={seaBodyFilter}
                onChange={(e) => setSeaBodyFilter(e.target.value)}
                className="bg-slate-950 text-slate-300 border border-slate-800 rounded-xl px-2.5 py-2 text-xs focus:outline-none focus:border-rose-500 font-bold"
              >
                <option value="All">All Sea Bodies</option>
                <option value="Palk Strait">Palk Strait</option>
                <option value="Bay of Bengal">Bay of Bengal</option>
                <option value="Indian Ocean">Indian Ocean</option>
                <option value="Andaman Sea">Andaman Sea</option>
                <option value="Arabian Sea">Arabian Sea</option>
              </select>

              <select
                value={hazardTypeFilter}
                onChange={(e) => setHazardTypeFilter(e.target.value)}
                className="bg-slate-950 text-slate-300 border border-slate-800 rounded-xl px-2.5 py-2 text-xs focus:outline-none focus:border-rose-500 font-bold"
              >
                <option value="All">All Hazard Types</option>
                <option value="Coral Reef / Atoll">Coral Reef / Atoll</option>
                <option value="Shallow Sandbar">Shallow Sandbar</option>
                <option value="Submerged Wreck">Submerged Wreck</option>
                <option value="Uncharted Shoal">Uncharted Shoal</option>
                <option value="Mud Flat">Mud Flat</option>
              </select>
            </div>
          </div>

          {/* Hazard Cards List */}
          <div className="space-y-3">
            {filteredHazards.map((item) => (
              <div
                key={item.id}
                className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl p-4.5 text-xs space-y-3 transition-all shadow-lg"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-2.5">
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-base">{item.flag}</span>
                      <span className="text-[10px] font-bold font-mono text-cyan-400 uppercase bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                        {item.seaBody}
                      </span>
                      <span className="text-[10px] font-bold font-mono text-amber-300 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                        {item.hazardType}
                      </span>
                    </div>
                    <h3 className="font-bold text-white text-sm sm:text-base">
                      {item.hazardName}
                    </h3>
                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase border self-start sm:self-auto ${
                      item.riskSeverity === 'High Grounding Risk'
                        ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 animate-pulse'
                        : item.riskSeverity === 'Moderate Warning'
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                        : 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40'
                    }`}
                  >
                    {item.riskSeverity}
                  </span>
                </div>

                {/* Depth & Coordinates Row */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 font-mono bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-slate-300">
                  <div>
                    <span className="text-[10px] text-slate-500">MIN CHART DEPTH:</span>
                    <div className="font-bold text-rose-400 text-sm">+{item.minChartDepthM} meters</div>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500">DRAFT RESTRICTION:</span>
                    <div className="font-bold text-amber-300 text-sm">Max {item.vesselDraftRestrictionM}m</div>
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <span className="text-[10px] text-slate-500">COORDINATES:</span>
                    <div className="font-bold text-cyan-300 text-sm">{item.coordinates}</div>
                  </div>
                </div>

                <p className="text-slate-300 text-xs leading-relaxed">
                  {item.description}
                </p>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1 border-t border-slate-800/80 text-[11px] text-slate-400">
                  <span className="truncate">Source: {item.lastHydrographyUpdate}</span>
                  <div className="flex items-center space-x-1 text-rose-400 font-semibold">
                    <Phone className="w-3.5 h-3.5" />
                    <span>Emergency Salvage: {item.emergencySalvageContact}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
