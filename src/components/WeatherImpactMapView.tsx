import React, { useState } from 'react';
import {
  CloudRain,
  Wind,
  Waves,
  Eye,
  Compass,
  Ship,
  AlertTriangle,
  Layers,
  ThermometerSun,
  Navigation,
  Clock,
  Zap,
  CheckCircle2,
  Globe
} from 'lucide-react';

export interface WeatherZoneOverlay {
  id: string;
  regionName: string;
  basin: 'Atlantic' | 'Pacific' | 'Indian' | 'Europe' | 'Americas' | 'Africa' | 'Southern';
  waveHeightMeters: number;
  windSpeedKts: number;
  visibilityNm: number;
  cycloneTrack?: string;
  impactLevel: 'CRITICAL' | 'WARNING' | 'MODERATE';
  speedReductionPct: number;
  fuelPenaltyPct: number;
  coordinates: string;
}

const WEATHER_ZONES: WeatherZoneOverlay[] = [
  {
    id: 'WZ-01',
    regionName: 'North Bay of Bengal Corridor',
    basin: 'Indian',
    waveHeightMeters: 6.8,
    windSpeedKts: 52,
    visibilityNm: 1.2,
    cycloneTrack: 'Tropical Cyclone Remal (Cat 2) Moving NW 12 kts',
    impactLevel: 'CRITICAL',
    speedReductionPct: 32,
    fuelPenaltyPct: 24,
    coordinates: '20.5° N, 89.2° E'
  },
  {
    id: 'WZ-02',
    regionName: 'Atlantic Ocean Florida Straits & Gulf Passage',
    basin: 'Atlantic',
    waveHeightMeters: 7.5,
    windSpeedKts: 110,
    visibilityNm: 0.8,
    cycloneTrack: 'Category 3 Hurricane Helene Moving NW 15 kts',
    impactLevel: 'CRITICAL',
    speedReductionPct: 45,
    fuelPenaltyPct: 38,
    coordinates: '25.4° N, 83.2° W'
  },
  {
    id: 'WZ-03',
    regionName: 'West Pacific Typhoon Belt & Taiwan Strait',
    basin: 'Pacific',
    waveHeightMeters: 8.8,
    windSpeedKts: 135,
    visibilityNm: 0.5,
    cycloneTrack: 'Super Typhoon Kong-rey (Cat 4) Moving NNW 14 kts',
    impactLevel: 'CRITICAL',
    speedReductionPct: 52,
    fuelPenaltyPct: 44,
    coordinates: '20.1° N, 124.5° E'
  },
  {
    id: 'WZ-04',
    regionName: 'South America Amazon Delta Fairway',
    basin: 'Americas',
    waveHeightMeters: 1.4,
    windSpeedKts: 22,
    visibilityNm: 4.5,
    cycloneTrack: 'Hydrological Low Water Draught Restriction (7.5m)',
    impactLevel: 'WARNING',
    speedReductionPct: 22,
    fuelPenaltyPct: 15,
    coordinates: '3.1° S, 60.0° W'
  },
  {
    id: 'WZ-05',
    regionName: 'Europe North Sea Maasvlakte Fairway',
    basin: 'Europe',
    waveHeightMeters: 6.2,
    windSpeedKts: 58,
    visibilityNm: 2.1,
    cycloneTrack: 'North Sea Severe Spring Gale & Baroclinic Storm',
    impactLevel: 'CRITICAL',
    speedReductionPct: 30,
    fuelPenaltyPct: 22,
    coordinates: '52.1° N, 3.8° E'
  },
  {
    id: 'WZ-06',
    regionName: 'South Africa Cape Agulhas Rogue Swell',
    basin: 'Africa',
    waveHeightMeters: 9.5,
    windSpeedKts: 62,
    visibilityNm: 3.0,
    cycloneTrack: 'Agulhas Current Counter-Swell Rogue Wave Belt',
    impactLevel: 'CRITICAL',
    speedReductionPct: 40,
    fuelPenaltyPct: 32,
    coordinates: '34.8° S, 20.0° E'
  },
  {
    id: 'WZ-07',
    regionName: 'Southern Ocean Drake Passage Transit',
    basin: 'Southern',
    waveHeightMeters: 11.5,
    windSpeedKts: 70,
    visibilityNm: 1.0,
    cycloneTrack: 'Sub-Antarctic Circumpolar Polar Low Storm',
    impactLevel: 'CRITICAL',
    speedReductionPct: 55,
    fuelPenaltyPct: 48,
    coordinates: '56.0° S, 67.2° W'
  },
  {
    id: 'WZ-08',
    regionName: 'Arabian Sea Konkan Approaches',
    basin: 'Indian',
    waveHeightMeters: 4.2,
    windSpeedKts: 38,
    visibilityNm: 3.5,
    impactLevel: 'WARNING',
    speedReductionPct: 18,
    fuelPenaltyPct: 12,
    coordinates: '17.8° N, 71.5° E'
  }
];

export const WeatherImpactMapView: React.FC = () => {
  const [activeLayers, setActiveLayers] = useState<{
    waves: boolean;
    wind: boolean;
    cyclone: boolean;
    visibility: boolean;
  }>({
    waves: true,
    wind: true,
    cyclone: true,
    visibility: true
  });

  const [selectedBasin, setSelectedBasin] = useState<string>('ALL');
  const [selectedZoneId, setSelectedZoneId] = useState<string>(WEATHER_ZONES[0].id);
  const [vesselNormalSpeed, setVesselNormalSpeed] = useState<number>(18.0);

  const filteredZones = WEATHER_ZONES.filter((z) => selectedBasin === 'ALL' || z.basin === selectedBasin);
  const selectedZone = WEATHER_ZONES.find((z) => z.id === selectedZoneId) || filteredZones[0] || WEATHER_ZONES[0];

  const reducedSpeed = (vesselNormalSpeed * (1 - selectedZone.speedReductionPct / 100)).toFixed(1);
  const addedDelayHoursPer100Nm = (
    100 / parseFloat(reducedSpeed) -
    100 / vesselNormalSpeed
  ).toFixed(1);

  const toggleLayer = (layerKey: keyof typeof activeLayers) => {
    setActiveLayers((prev) => ({ ...prev, [layerKey]: !prev[layerKey] }));
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 p-6 rounded-2xl border border-sky-500/30 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-sky-500/20 text-sky-300 border border-sky-500/30 uppercase">
              GLOBAL METEOROLOGICAL GIS OVERLAY
            </span>
            <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 uppercase">
              WORLD SWELL & WAVE IMPACT ANALYZER
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white mt-2 flex items-center space-x-2">
            <Globe className="w-7 h-7 text-sky-400" />
            <span>Global Weather Impact & Voyage Speed Penalty</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Real-time wave height, cyclone eye tracks, wind shear, and fuel penalty calculations across Atlantic, Pacific, Indian Ocean, Europe, Americas, and Africa.
          </p>
        </div>

        {/* Ocean Basin Filter Buttons */}
        <div className="flex flex-wrap items-center gap-1.5 font-mono text-xs">
          {['ALL', 'Atlantic', 'Pacific', 'Indian', 'Europe', 'Americas', 'Africa', 'Southern'].map((b) => (
            <button
              key={b}
              onClick={() => setSelectedBasin(b)}
              className={`px-3 py-1.5 rounded-xl font-bold border transition-all ${
                selectedBasin === b
                  ? 'bg-sky-500 text-slate-950 border-sky-400'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {b}
            </button>
          ))}
        </div>
      </div>

      {/* Layer Toggles & Zone Selector */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <h3 className="text-base font-bold text-white flex items-center space-x-2">
              <Layers className="w-5 h-5 text-sky-400" />
              <span>Active GIS Radar Layers</span>
            </h3>

            <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
              <button
                onClick={() => toggleLayer('waves')}
                className={`px-3 py-1.5 rounded-xl border font-bold flex items-center space-x-1.5 transition-all ${
                  activeLayers.waves ? 'bg-sky-500/20 text-sky-300 border-sky-500/40' : 'bg-slate-950 border-slate-800 text-slate-500'
                }`}
              >
                <Waves className="w-3.5 h-3.5" />
                <span>Swell Waves</span>
              </button>
              <button
                onClick={() => toggleLayer('wind')}
                className={`px-3 py-1.5 rounded-xl border font-bold flex items-center space-x-1.5 transition-all ${
                  activeLayers.wind ? 'bg-teal-500/20 text-teal-300 border-teal-500/40' : 'bg-slate-950 border-slate-800 text-slate-500'
                }`}
              >
                <Wind className="w-3.5 h-3.5" />
                <span>Wind Shear</span>
              </button>
              <button
                onClick={() => toggleLayer('cyclone')}
                className={`px-3 py-1.5 rounded-xl border font-bold flex items-center space-x-1.5 transition-all ${
                  activeLayers.cyclone ? 'bg-rose-500/20 text-rose-300 border-rose-500/40' : 'bg-slate-950 border-slate-800 text-slate-500'
                }`}
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Cyclone Track</span>
              </button>
              <button
                onClick={() => toggleLayer('visibility')}
                className={`px-3 py-1.5 rounded-lg border font-bold flex items-center space-x-1.5 transition-all ${
                  activeLayers.visibility ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' : 'bg-slate-950 border-slate-800 text-slate-500'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Visibility</span>
              </button>
            </div>
          </div>

          {/* Zones Selection List */}
          <div className="space-y-3">
            <label className="text-xs font-mono font-bold text-slate-400 uppercase">Select Weather Impact Zone:</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-mono text-xs">
              {filteredZones.map((zone) => {
                const isSelected = zone.id === selectedZone.id;
                return (
                  <button
                    key={zone.id}
                    onClick={() => setSelectedZoneId(zone.id)}
                    className={`p-4 rounded-xl border text-left transition-all space-y-2 ${
                      isSelected
                        ? 'bg-sky-950/60 border-sky-500 text-white shadow-xl shadow-sky-950/50'
                        : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sky-400">{zone.regionName}</span>
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-black uppercase border ${
                          zone.impactLevel === 'CRITICAL'
                            ? 'bg-rose-500/20 text-rose-300 border-rose-500/30'
                            : 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                        }`}
                      >
                        {zone.impactLevel}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-800">
                      <span>Swell: <strong className="text-white">{zone.waveHeightMeters}m</strong></span>
                      <span>Wind: <strong className="text-white">{zone.windSpeedKts} kts</strong></span>
                      <span>Penalty: <strong className="text-rose-400">+{zone.fuelPenaltyPct}% Fuel</strong></span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Selected Zone Telemetry Card */}
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-6 font-mono text-xs text-white">
          <div className="border-b border-slate-800 pb-3 space-y-1">
            <span className="text-[10px] text-sky-400 font-bold uppercase">SELECTED GIS ZONE OVERLAY</span>
            <h3 className="text-base font-extrabold text-white">{selectedZone.regionName}</h3>
            <p className="text-slate-400 text-[11px]">{selectedZone.coordinates}</p>
          </div>

          <div className="space-y-3">
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
              <span className="text-[10px] text-slate-500 uppercase font-bold">Storm / Cyclone Advisory:</span>
              <p className="text-amber-300 font-bold leading-tight">
                {selectedZone.cycloneTrack || 'Standard seasonal gale and wave swell state'}
              </p>
            </div>

            <div className="space-y-2 bg-slate-950 p-3 rounded-xl border border-slate-800">
              <div className="flex justify-between">
                <span className="text-slate-400">Normal Speed:</span>
                <span className="font-bold text-emerald-400">{vesselNormalSpeed} kts</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Weather Speed Reduction:</span>
                <span className="font-bold text-rose-400">-{selectedZone.speedReductionPct}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Actual Weather Speed:</span>
                <span className="font-bold text-cyan-300">{reducedSpeed} kts</span>
              </div>
              <div className="flex justify-between pt-1 border-t border-slate-800">
                <span className="text-slate-400">Extra Delay / 100 NM:</span>
                <span className="font-bold text-amber-400">+{addedDelayHoursPer100Nm} hours</span>
              </div>
            </div>

            <div className="p-3 bg-rose-950/30 border border-rose-800/60 rounded-xl space-y-1">
              <span className="text-[10px] text-rose-400 font-bold uppercase flex items-center space-x-1">
                <Zap className="w-3.5 h-3.5" />
                <span>Estimated Fuel Penalty</span>
              </span>
              <p className="text-rose-200 text-xs">
                +{selectedZone.fuelPenaltyPct}% additional heavy fuel oil consumption due to wave resistance and engine load.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
