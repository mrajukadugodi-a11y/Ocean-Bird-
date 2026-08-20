import React, { useState } from 'react';
import {
  Activity,
  Heart,
  Droplets,
  Thermometer,
  ShieldAlert,
  Globe2,
  Fish,
  Search,
  Filter,
  CheckCircle2,
  AlertTriangle,
  Info,
  Waves
} from 'lucide-react';

export interface MarineHealthZone {
  id: string;
  regionName: string;
  coordinates: string;
  seaTempCelsius: number;
  tempAnomalyCelsius: number;
  coralReefHealth: 'CRITICAL_BLEACHING' | 'STRESSED' | 'HEALTHY' | 'PROTECTED';
  microplasticsIndex: 'SEVERE' | 'MODERATE' | 'LOW';
  dissolvedOxygenMgL: number; // Normal > 6.0 mg/L
  oilSlickRisk: 'HIGH' | 'LOW' | 'NONE';
  description: string;
}

const MARINE_HEALTH_ZONES: MarineHealthZone[] = [
  {
    id: 'ZONE-01',
    regionName: 'Gulf of Mannar Biosphere Reserve',
    coordinates: "08° 50.0' N, 078° 15.0' E",
    seaTempCelsius: 30.8,
    tempAnomalyCelsius: +2.1,
    coralReefHealth: 'CRITICAL_BLEACHING',
    microplasticsIndex: 'MODERATE',
    dissolvedOxygenMgL: 4.8,
    oilSlickRisk: 'LOW',
    description: 'Thermal stress trigger causing active coral bleaching across shallow reefs. Strict MARPOL Annex V zero-discharge zone enforced.'
  },
  {
    id: 'ZONE-02',
    regionName: 'Chittagong Coastal Dead Zone',
    coordinates: "22° 10.0' N, 091° 45.0' E",
    seaTempCelsius: 29.5,
    tempAnomalyCelsius: +1.2,
    coralReefHealth: 'STRESSED',
    microplasticsIndex: 'SEVERE',
    dissolvedOxygenMgL: 2.9, // Hypoxic
    oilSlickRisk: 'HIGH',
    description: 'Hypoxic dead zone created by industrial runoff and shipbreaking activity. High density of floating microplastics.'
  },
  {
    id: 'ZONE-03',
    regionName: 'Lakshadweep Atoll Waters',
    coordinates: "10° 30.0' N, 072° 30.0' E",
    seaTempCelsius: 28.2,
    tempAnomalyCelsius: +0.4,
    coralReefHealth: 'PROTECTED',
    microplasticsIndex: 'LOW',
    dissolvedOxygenMgL: 7.1,
    oilSlickRisk: 'NONE',
    description: 'Pristine marine sanctuary. High water clarity, vibrant marine biodiversity and active sea turtle conservation.'
  },
  {
    id: 'ZONE-04',
    regionName: 'Malacca Strait Heavy Shipping Corridor',
    coordinates: "02° 30.0' N, 101° 45.0' E",
    seaTempCelsius: 30.1,
    tempAnomalyCelsius: +1.8,
    coralReefHealth: 'STRESSED',
    microplasticsIndex: 'SEVERE',
    dissolvedOxygenMgL: 5.2,
    oilSlickRisk: 'HIGH',
    description: 'High traffic density channel with heavy bilge water run-off and microplastic concentration.'
  }
];

export const MarineHealthMapView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedZone, setSelectedZone] = useState<MarineHealthZone>(MARINE_HEALTH_ZONES[0]);

  const filteredZones = MARINE_HEALTH_ZONES.filter((z) =>
    z.regionName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    z.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div id="marine-health-map-view" className="space-y-6">
      {/* Top Banner Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center space-x-2 text-emerald-400 font-bold text-xs uppercase tracking-wider mb-1">
              <Activity className="w-4 h-4 text-emerald-400 animate-pulse" />
              <span>UN GLOBAL OCEAN HEALTH & MARPOL ECOSYSTEM RADAR</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center space-x-2">
              <Heart className="w-6 h-6 text-emerald-400" />
              <span>Marine Ecosystem & Ocean Health Map</span>
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl">
              Live environmental monitoring for Sea Surface Temperature (SST) anomalies, coral bleaching hazards, dissolved oxygen dead zones, and MARPOL plastic pollution indices.
            </p>
          </div>

          <div className="flex items-center space-x-3 font-mono text-xs">
            <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-center">
              <span className="text-[10px] text-slate-400 block uppercase">AVG SST ANOMALY</span>
              <strong className="text-rose-400 text-sm">+1.4°C</strong>
            </div>
            <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-center">
              <span className="text-[10px] text-slate-400 block uppercase">ECO-PROTECTED ZONES</span>
              <strong className="text-emerald-400 text-sm">18 SITES</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Search & List + Zone Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 font-mono">
        {/* Left Column: Regions List */}
        <div className="space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search marine sanctuary or zone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="space-y-3">
            {filteredZones.map((zone) => {
              const isSelected = selectedZone.id === zone.id;
              const isCritical = zone.coralReefHealth === 'CRITICAL_BLEACHING';

              return (
                <div
                  key={zone.id}
                  onClick={() => setSelectedZone(zone)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all shadow-lg space-y-2 ${
                    isSelected
                      ? 'bg-slate-900 border-emerald-500 ring-1 ring-emerald-500'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <strong className="text-white text-sm">{zone.regionName}</strong>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${
                        isCritical
                          ? 'bg-rose-500/20 border-rose-500 text-rose-300'
                          : 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                      }`}
                    >
                      {zone.coralReefHealth.replace('_', ' ')}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs text-slate-300">
                    <div>
                      <span className="text-[10px] text-slate-500 block">SEA TEMP (SST)</span>
                      <strong className="text-amber-300">{zone.seaTempCelsius}°C ({zone.tempAnomalyCelsius > 0 ? `+${zone.tempAnomalyCelsius}` : zone.tempAnomalyCelsius}°C)</strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 block">DISSOLVED O2</span>
                      <strong className={zone.dissolvedOxygenMgL < 4.0 ? 'text-rose-400 font-bold' : 'text-emerald-400'}>
                        {zone.dissolvedOxygenMgL} mg/L
                      </strong>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Zone Inspector Telemetry (2 Spans) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] text-emerald-400 font-bold uppercase block">ECOSYSTEM TELEMETRY INSPECTOR</span>
                <h3 className="font-bold text-white text-lg">{selectedZone.regionName}</h3>
                <p className="text-xs text-cyan-300">{selectedZone.coordinates}</p>
              </div>

              <span className="px-3 py-1 bg-slate-950 border border-slate-800 rounded-full text-xs text-slate-300">
                MARPOL PROTECTED
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl">
                <span className="text-[10px] text-slate-400 block uppercase">SEA TEMP (SST)</span>
                <strong className="text-amber-300 text-base">{selectedZone.seaTempCelsius}°C</strong>
              </div>

              <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl">
                <span className="text-[10px] text-slate-400 block uppercase">DISSOLVED OXYGEN</span>
                <strong className={selectedZone.dissolvedOxygenMgL < 4.0 ? 'text-rose-400 text-base' : 'text-emerald-400 text-base'}>
                  {selectedZone.dissolvedOxygenMgL} mg/L
                </strong>
              </div>

              <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl">
                <span className="text-[10px] text-slate-400 block uppercase">MICROPLASTICS</span>
                <strong className="text-cyan-300 text-base">{selectedZone.microplasticsIndex}</strong>
              </div>

              <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl">
                <span className="text-[10px] text-slate-400 block uppercase">OIL SLICK HAZARD</span>
                <strong className={selectedZone.oilSlickRisk === 'HIGH' ? 'text-rose-400 text-base' : 'text-emerald-400 text-base'}>
                  {selectedZone.oilSlickRisk}
                </strong>
              </div>
            </div>

            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
              <span className="text-xs text-emerald-400 font-bold block uppercase">Oceanographer Environmental Summary</span>
              <p className="text-xs text-slate-300 leading-relaxed">{selectedZone.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
