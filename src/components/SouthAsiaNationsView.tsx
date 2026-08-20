import React, { useState } from 'react';
import { SOUTH_ASIAN_COUNTRIES } from '../data/southAsiaData';
import { SouthAsianCountry } from '../types';
import { Globe2, Anchor, ShieldAlert, Users, MapPin, Compass, CheckCircle2, Info, X, ThermometerSun, Waves, Radio, ArrowRight } from 'lucide-react';
import { SouthAsianCoastalImpactDashboard } from './SouthAsianCoastalImpactDashboard';

interface SouthAsiaNationsViewProps {
  onSelectRoute?: (routeId: string) => void;
}

export const SouthAsiaNationsView: React.FC<SouthAsiaNationsViewProps> = ({ onSelectRoute }) => {
  const [filterType, setFilterType] = useState<'All' | 'Coastal' | 'Landlocked'>('All');
  const [selectedCountry, setSelectedCountry] = useState<SouthAsianCountry | null>(null);


  const filteredCountries = SOUTH_ASIAN_COUNTRIES.filter((country) => {
    if (filterType === 'Coastal') return country.isCoastal;
    if (filterType === 'Landlocked') return !country.isCoastal;
    return true;
  });

  const coastalCount = SOUTH_ASIAN_COUNTRIES.filter(c => c.isCoastal).length;
  const landlockedCount = SOUTH_ASIAN_COUNTRIES.filter(c => !c.isCoastal).length;

  return (
    <div id="south-asia-nations-view" className="space-y-8 animate-fadeIn">
      {/* Overview & Answer Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl text-white">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-bold">
              <Globe2 className="w-4 h-4 text-emerald-400" />
              <span>REGIONAL GEOGRAPHY & MARITIME DIRECTORY</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              South Asia & Indo-Pacific Maritime Guide ({SOUTH_ASIAN_COUNTRIES.length} Sovereign Nations)
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Comprehensive directory covering South Asia, Southeast Asian maritime neighbors (Myanmar, Malaysia, Singapore, Philippines), and Australia across the Indian Ocean and Pacific routes.
            </p>
          </div>

          {/* Quick Counter Stat Cards */}
          <div className="grid grid-cols-3 gap-3 shrink-0">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-center">
              <div className="text-2xl font-black text-emerald-400">{SOUTH_ASIAN_COUNTRIES.length}</div>
              <div className="text-[11px] text-slate-400 uppercase font-semibold">Total Nations</div>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-center">
              <div className="text-2xl font-black text-sky-400">{coastalCount}</div>
              <div className="text-[11px] text-slate-400 uppercase font-semibold">Coastal Nations</div>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-center">
              <div className="text-2xl font-black text-amber-400">{landlockedCount}</div>
              <div className="text-[11px] text-slate-400 uppercase font-semibold">Landlocked</div>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="mt-6 flex items-center space-x-2 pt-4 border-t border-slate-800">
          <button
            onClick={() => setFilterType('All')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              filterType === 'All'
                ? 'bg-emerald-500 text-slate-950'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            All {SOUTH_ASIAN_COUNTRIES.length} Regional Nations
          </button>
          <button
            onClick={() => setFilterType('Coastal')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              filterType === 'Coastal'
                ? 'bg-sky-500 text-slate-950'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            Coastal Maritime Nations ({coastalCount})
          </button>
          <button
            onClick={() => setFilterType('Landlocked')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              filterType === 'Landlocked'
                ? 'bg-amber-500 text-slate-950'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            Landlocked Nations ({landlockedCount})
          </button>
        </div>
      </div>

      {/* Country Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredCountries.map((country) => (
          <div
            key={country.id}
            onClick={() => setSelectedCountry(country)}
            className="bg-slate-900 rounded-2xl p-5 border border-slate-800 text-white space-y-4 hover:border-emerald-500/50 transition-all cursor-pointer group shadow-lg flex flex-col justify-between"
          >
            <div className="space-y-3">
              {/* Header: Flag & Name */}
              <div className="flex items-center justify-between">
                <span className="text-3xl">{country.flagEmoji}</span>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                    country.isCoastal
                      ? 'bg-sky-500/10 text-sky-400 border-sky-500/30'
                      : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                  }`}
                >
                  {country.isCoastal ? 'Coastal' : 'Landlocked'}
                </span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white group-hover:text-emerald-300 transition-colors">
                  {country.name}
                </h3>
                <p className="text-xs text-slate-400">{country.officialName}</p>
              </div>

              {/* Stats */}
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Capital:</span>
                  <span className="font-semibold text-white">{country.capital}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Population:</span>
                  <span className="font-semibold text-emerald-400">{country.population}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Coastline:</span>
                  <span className="font-semibold text-sky-400">{country.coastlineKm}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">SAARC Member:</span>
                  <span className="font-semibold text-white">Since {country.saarcMemberYear}</span>
                </div>
              </div>

              {/* Vulnerability Meter */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-400">Climate Vulnerability</span>
                  <span className="font-bold text-rose-400">{country.climateVulnerabilityIndex} / 100</span>
                </div>
                <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                  <div
                    className="bg-gradient-to-r from-emerald-500 via-amber-500 to-rose-500 h-full rounded-full"
                    style={{ width: `${country.climateVulnerabilityIndex}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (onSelectRoute) {
                    onSelectRoute(country.id === 'india' ? 'india-national' : `${country.id}-route`);
                  }
                }}
                className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-rose-500/20 to-amber-500/20 hover:from-rose-500/30 hover:to-amber-500/30 text-rose-300 border border-rose-500/40 text-xs font-bold transition-all flex items-center justify-center space-x-1.5"
              >
                <Radio className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
                <span>Watch Live Route Radar</span>
                <ArrowRight className="w-3 h-3 text-rose-400" />
              </button>

              <button
                onClick={() => setSelectedCountry(country)}
                className="w-full py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 transition-all flex items-center justify-center space-x-1.5"
              >
                <Info className="w-3.5 h-3.5 text-emerald-400" />
                <span>Full Country Profile</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Country Profile Modal */}
      {selectedCountry && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl w-full p-6 text-white space-y-6 relative shadow-2xl max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedCountry(null)}
              className="absolute top-4 right-4 p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-4">
              <span className="text-5xl">{selectedCountry.flagEmoji}</span>
              <div>
                <h2 className="text-2xl font-bold">{selectedCountry.name}</h2>
                <p className="text-xs text-slate-400">{selectedCountry.officialName} • Capital: {selectedCountry.capital}</p>
              </div>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed bg-slate-950 p-4 rounded-xl border border-slate-800">
              {selectedCountry.description}
            </p>

            {/* Maritime Role & Ports */}
            <div className="space-y-2">
              <h3 className="text-sm font-bold text-sky-400 flex items-center space-x-2">
                <Anchor className="w-4 h-4" />
                <span>Maritime Infrastructure & Seaports</span>
              </h3>
              <p className="text-xs text-slate-300 bg-slate-950 p-3 rounded-xl border border-slate-800">
                {selectedCountry.economicMaritmeRole}
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                {selectedCountry.majorPorts.map((port, idx) => (
                  <span key={idx} className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300 font-medium">
                    ⚓ {port}
                  </span>
                ))}
              </div>
            </div>

            {/* Climate & Hazards */}
            <div className="space-y-2">
              <h3 className="text-sm font-bold text-rose-400 flex items-center space-x-2">
                <ShieldAlert className="w-4 h-4" />
                <span>Primary Climate Vulnerabilities</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {selectedCountry.keyHazards.map((hazard, idx) => (
                  <div key={idx} className="flex items-center space-x-2 text-xs bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>{hazard}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setSelectedCountry(null)}
                className="px-5 py-2 rounded-xl bg-emerald-500 text-slate-950 font-bold hover:bg-emerald-400 transition-all text-sm"
              >
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SOUTH ASIAN COASTAL ZONES IMPACT VISUALIZATION DASHBOARD */}
      <SouthAsianCoastalImpactDashboard />
    </div>
  );
};
