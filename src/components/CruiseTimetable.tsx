import React, { useState } from 'react';
import { CRUISE_TIMETABLES, SOUTH_ASIA_PORTS } from '../data/southAsiaData';
import { CruiseSchedule, PortInfo } from '../types';
import { Ship, Anchor, Waves, Wind, Compass, Search, Calendar, Clock, ArrowRight, ShieldCheck, AlertTriangle, Info, X, MapPin, Navigation, Globe, Package, Filter, Radio } from 'lucide-react';

export const CruiseTimetable: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'timetables' | 'ports' | 'port-cities' | 'seaways'>('timetables');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All'); // 'All' | 'Cruise Ship' | 'Cargo Ship' | 'Passenger Ferry'
  const [selectedCountry, setSelectedCountry] = useState<string>('All');
  const [selectedVesselType, setSelectedVesselType] = useState<string>('All');
  const [selectedSeaBody, setSelectedSeaBody] = useState<string>('All');
  const [selectedSchedule, setSelectedSchedule] = useState<CruiseSchedule | null>(null);
  const [selectedPortDetail, setSelectedPortDetail] = useState<PortInfo | null>(null);

  // Filter timetables
  const filteredSchedules = CRUISE_TIMETABLES.filter((item) => {
    const matchesQuery =
      item.vesselName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.cruiseLine.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.originPort.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.destinationPort.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.seawayRouteName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'All' || item.vesselCategory === selectedCategory;
    const matchesCountry =
      selectedCountry === 'All' ||
      item.originCountry === selectedCountry ||
      item.destinationCountry === selectedCountry;
    const matchesType = selectedVesselType === 'All' || item.vesselType === selectedVesselType;

    return matchesQuery && matchesCategory && matchesCountry && matchesType;
  });

  // Filter Ports
  const filteredPorts = SOUTH_ASIA_PORTS.filter((port) => {
    const matchesQuery =
      port.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      port.cityName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (port.provinceOrState && port.provinceOrState.toLowerCase().includes(searchQuery.toLowerCase())) ||
      port.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      port.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      port.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCountry = selectedCountry === 'All' || port.country === selectedCountry;
    const matchesSeaBody = selectedSeaBody === 'All' || port.seaBody === selectedSeaBody;

    return matchesQuery && matchesCountry && matchesSeaBody;
  });

  // Extract unique Sea Port Cities
  const seaPortCities = SOUTH_ASIA_PORTS.map((port) => ({
    cityName: port.cityName,
    portName: port.name,
    country: port.country,
    countryFlag: port.countryFlag,
    provinceOrState: port.provinceOrState,
    seaBody: port.seaBody,
    code: port.code,
    portType: port.portType,
    weather: port.weatherCondition,
    waveHeight: port.currentWaveHeight,
    activeSchedules: port.activeSchedulesCount,
    majorCargo: port.majorImportsExports,
    description: port.description,
    port: port,
  })).filter((city, index, self) =>
    index === self.findIndex((c) => c.cityName === city.cityName && c.country === city.country)
  );

  const filteredPortCities = seaPortCities.filter((city) => {
    const matchesQuery =
      city.cityName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      city.portName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (city.provinceOrState && city.provinceOrState.toLowerCase().includes(searchQuery.toLowerCase())) ||
      city.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      city.code.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCountry = selectedCountry === 'All' || city.country === selectedCountry;
    const matchesSeaBody = selectedSeaBody === 'All' || city.seaBody === selectedSeaBody;

    return matchesQuery && matchesCountry && matchesSeaBody;
  });

  // Unique list of seaways
  const uniqueSeaways = Array.from(
    new Set(CRUISE_TIMETABLES.map((s) => s.seawayRouteName))
  );

  const handleSelectPortFilter = (portName: string) => {
    setSearchQuery(portName);
    setActiveTab('timetables');
  };

  return (
    <div id="cruise-timetable-view" className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-2xl p-6 border border-slate-800 shadow-xl text-white">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-cyan-400 font-semibold text-sm mb-1">
              <Ship className="w-4 h-4 text-cyan-400" />
              <span>SOUTH ASIA MARITIME TIMETABLES & SEAPORTS DIRECTORY</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Sea Ports, Cargo & Cruise Vessel Schedules
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              Real-time arrival & departure timetables, seaway travel routes, nautical distances, and port telemetry across South Asia.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center space-x-3 bg-slate-950/80 p-3 rounded-xl border border-slate-800">
              <div className="p-2 bg-cyan-500/10 text-cyan-400 rounded-lg">
                <Ship className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[11px] text-slate-400 font-medium">Scheduled Vessels</div>
                <div className="text-sm font-bold text-white">{CRUISE_TIMETABLES.length} Active Lines</div>
              </div>
            </div>

            <div className="flex items-center space-x-3 bg-slate-950/80 p-3 rounded-xl border border-slate-800">
              <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg">
                <Anchor className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[11px] text-slate-400 font-medium">Tracked Sea Ports</div>
                <div className="text-sm font-bold text-emerald-400">{SOUTH_ASIA_PORTS.length} Ports</div>
              </div>
            </div>
          </div>
        </div>

        {/* View Selection Tabs */}
        <div className="mt-6 flex flex-wrap items-center gap-2 border-b border-slate-800 pb-4">
          <button
            onClick={() => setActiveTab('timetables')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl font-bold text-xs transition-all ${
              activeTab === 'timetables'
                ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20'
                : 'bg-slate-950/60 text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>Vessel Timetables (Arrival/Departure)</span>
          </button>

          <button
            onClick={() => setActiveTab('port-cities')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl font-bold text-xs transition-all ${
              activeTab === 'port-cities'
                ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20'
                : 'bg-slate-950/60 text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>Sea Port Cities Directory ({seaPortCities.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('ports')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl font-bold text-xs transition-all ${
              activeTab === 'ports'
                ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20'
                : 'bg-slate-950/60 text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Anchor className="w-4 h-4" />
            <span>South Asian Sea Ports Directory</span>
          </button>

          <button
            onClick={() => setActiveTab('seaways')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl font-bold text-xs transition-all ${
              activeTab === 'seaways'
                ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20'
                : 'bg-slate-950/60 text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Navigation className="w-4 h-4" />
            <span>Traveling Seaway Routes</span>
          </button>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          <div className="relative col-span-1 sm:col-span-2 lg:col-span-1">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Search city, port, UN/LOCODE..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
          >
            <option value="All">All Vessel Categories</option>
            <option value="Cruise Ship">🚢 Cruise Ships</option>
            <option value="Cargo Ship">📦 Cargo & Freight Ships</option>
            <option value="Passenger Ferry">⛴️ Passenger Ferries</option>
          </select>

          <select
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
          >
            <option value="All">All South Asian Countries</option>
            <option value="India">🇮🇳 India</option>
            <option value="Pakistan">🇵🇰 Pakistan</option>
            <option value="Bangladesh">🇧🇩 Bangladesh</option>
            <option value="Sri Lanka">🇱🇰 Sri Lanka</option>
            <option value="Maldives">🇲🇻 Maldives</option>
            <option value="Nepal">🇳🇵 Nepal (Dry Port)</option>
            <option value="Bhutan">🇧🇹 Bhutan (Dry Port)</option>
            <option value="Afghanistan">🇦🇫 Afghanistan (Transit)</option>
          </select>

          <select
            value={selectedSeaBody}
            onChange={(e) => setSelectedSeaBody(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
          >
            <option value="All">All Sea Bodies</option>
            <option value="Arabian Sea">🌊 Arabian Sea</option>
            <option value="Bay of Bengal">🌊 Bay of Bengal</option>
            <option value="Laccadive Sea">🌊 Laccadive Sea</option>
            <option value="Indian Ocean">🌊 Indian Ocean</option>
            <option value="Palk Strait">🌊 Palk Strait</option>
            <option value="Gulf of Oman">🌊 Gulf of Oman</option>
            <option value="Andaman Sea">🌊 Andaman Sea</option>
            <option value="Inland River Corridor">🌊 Inland River Corridor</option>
          </select>

          <select
            value={selectedVesselType}
            onChange={(e) => setSelectedVesselType(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
          >
            <option value="All">All Vessel Types</option>
            <option value="Container Ship">Container Ship</option>
            <option value="Oil Tanker">Oil Tanker</option>
            <option value="Bulk Carrier">Bulk Carrier</option>
            <option value="LNG Carrier">LNG Gas Carrier</option>
            <option value="RO-RO Cargo Vessel">RO-RO Cargo Vessel</option>
            <option value="Luxury Cruise Liner">Luxury Cruise Liner</option>
            <option value="Regional Ocean Ferry">Regional Ocean Ferry</option>
            <option value="Inter-Island Passenger Ferry">Inter-Island Passenger Ferry</option>
          </select>
        </div>
      </div>

      {/* TAB 1: VESSEL TIMETABLES */}
      {activeTab === 'timetables' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white flex items-center space-x-2">
              <Clock className="w-5 h-5 text-cyan-400" />
              <span>Arrival & Departure Vessel Schedules ({filteredSchedules.length})</span>
            </h2>
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                  setSelectedCountry('All');
                  setSelectedVesselType('All');
                }}
                className="text-xs text-cyan-400 hover:underline flex items-center space-x-1"
              >
                <X className="w-3.5 h-3.5" />
                <span>Reset Filters</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredSchedules.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedSchedule(item)}
                className="bg-slate-900 rounded-2xl p-5 border border-slate-800 text-white space-y-4 hover:border-cyan-500/50 transition-all cursor-pointer group shadow-lg"
              >
                {/* Header: Vessel Category & Status */}
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                          item.vesselCategory === 'Cargo Ship'
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                            : item.vesselCategory === 'Cruise Ship'
                            ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                            : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        }`}
                      >
                        {item.vesselCategory === 'Cargo Ship' ? '📦 Cargo Ship' : item.vesselCategory === 'Cruise Ship' ? '🚢 Cruise Liner' : '⛴️ Passenger Ferry'}
                      </span>
                      <span className="text-[11px] font-medium text-slate-400">{item.cruiseLine}</span>
                    </div>
                    <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors flex items-center space-x-2">
                      <span>{item.vesselName}</span>
                    </h3>
                    <p className="text-xs text-slate-400">{item.vesselType}</p>
                  </div>
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-bold border ${
                      item.status === 'On Time'
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                        : item.status === 'Sailing'
                        ? 'bg-sky-500/10 text-sky-400 border-sky-500/30'
                        : item.status === 'Monsoon Watch'
                        ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                        : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                    }`}
                  >
                    {item.status}
                  </span>
                </div>

                {/* Seaway Route Badge */}
                <div className="bg-slate-950/90 px-3 py-2 rounded-xl border border-slate-800 text-xs flex items-center justify-between text-cyan-300">
                  <div className="flex items-center space-x-2">
                    <Navigation className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span className="font-semibold">{item.seawayRouteName}</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">{item.durationHours}h Transit</span>
                </div>

                {/* Route & Departure / Arrival Info */}
                <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800/80 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-start space-x-2 max-w-[45%]">
                      <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <div className="text-slate-400 text-[10px]">ORIGIN PORT</div>
                        <div className="font-bold text-white leading-snug">{item.originPort}</div>
                        <div className="text-[10px] text-emerald-400 font-semibold">{item.originCountry}</div>
                      </div>
                    </div>

                    <div className="flex flex-col items-center justify-center shrink-0 text-slate-500 px-2">
                      <ArrowRight className="w-5 h-5 text-cyan-400" />
                      <span className="text-[10px] font-mono text-slate-400 mt-1">{item.distanceNM} NM</span>
                    </div>

                    <div className="flex items-start space-x-2 max-w-[45%] text-right">
                      <div>
                        <div className="text-slate-400 text-[10px]">DESTINATION PORT</div>
                        <div className="font-bold text-white leading-snug">{item.destinationPort}</div>
                        <div className="text-[10px] text-cyan-400 font-semibold">{item.destinationCountry}</div>
                      </div>
                      <Anchor className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    </div>
                  </div>

                  {/* Arrival & Departure Timetable Rows */}
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800 text-[11px]">
                    <div className="bg-slate-900/80 p-2 rounded-lg border border-slate-800">
                      <div className="text-[10px] text-amber-400 font-bold flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>DEPARTURE TIME</span>
                      </div>
                      <div className="text-xs font-extrabold text-white mt-0.5">{item.departureTime}</div>
                    </div>

                    <div className="bg-slate-900/80 p-2 rounded-lg border border-slate-800">
                      <div className="text-[10px] text-sky-400 font-bold flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>EST. ARRIVAL TIME</span>
                      </div>
                      <div className="text-xs font-extrabold text-white mt-0.5">{item.arrivalTime}</div>
                    </div>
                  </div>
                </div>

                {/* Capacity & Cargo Specs */}
                <div className="flex items-center justify-between text-xs pt-1 text-slate-400 border-t border-slate-800/60">
                  <span>
                    {item.vesselCategory === 'Cargo Ship' ? (
                      <>Cap: <strong className="text-amber-300">{item.cargoCapacity || 'Bulk Container'}</strong></>
                    ) : (
                      <>Cap: <strong className="text-cyan-300">{item.capacityPassengers} Pax</strong></>
                    )}
                  </span>
                  <span className="text-xs font-semibold text-slate-300">
                    Freq: <strong className="text-white">{item.frequency}</strong>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: SEA PORT CITIES DIRECTORY */}
      {activeTab === 'port-cities' && (
        <div className="space-y-6">
          {/* Header Banner */}
          <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 text-white space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center space-x-2 text-cyan-400 font-semibold text-xs mb-1">
                  <MapPin className="w-4 h-4 text-cyan-400" />
                  <span>MARITIME URBAN CENTERS & PORT METROPOLISES</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  Sea Port Cities of South Asia ({filteredPortCities.length})
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Directory of major coastal port cities, state/provinces, sea bodies, and maritime infrastructure across South Asia.
                </p>
              </div>

              <div className="flex items-center space-x-2 text-xs bg-slate-950 px-3 py-2 rounded-xl border border-slate-800 text-slate-300">
                <Globe className="w-4 h-4 text-cyan-400" />
                <span>Total Sea Port Cities Listed: <strong className="text-cyan-400 font-bold">{seaPortCities.length}</strong></span>
              </div>
            </div>

            {/* Quick Sea Port City Names Tag Cloud */}
            <div className="pt-3 border-t border-slate-800/80">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center justify-between">
                <span>Quick Index of Sea Port Cities Names ({seaPortCities.length} Cities)</span>
                <span className="text-[10px] text-cyan-400 font-normal">Click any city name to filter</span>
              </div>
              <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto pr-1 scrollbar-thin">
                {seaPortCities.map((city, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setSearchQuery(city.cityName);
                    }}
                    className={`text-xs px-2.5 py-1 rounded-lg border font-medium transition-all flex items-center space-x-1.5 ${
                      searchQuery.toLowerCase() === city.cityName.toLowerCase()
                        ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-bold shadow-md'
                        : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-cyan-500/50 hover:text-white'
                    }`}
                  >
                    <span>{city.countryFlag}</span>
                    <span className="font-semibold">{city.cityName}</span>
                    {city.provinceOrState && (
                      <span className="text-[10px] text-slate-400 font-normal">({city.provinceOrState})</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Grid of Sea Port Cities */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredPortCities.map((city, idx) => (
              <div
                key={idx}
                className="bg-slate-900 rounded-2xl p-5 border border-slate-800 hover:border-cyan-500/50 transition-all text-white space-y-4 shadow-lg flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xl">{city.countryFlag}</span>
                        <span className="text-xs font-bold text-cyan-400">{city.country}</span>
                        {city.provinceOrState && (
                          <span className="text-[10px] text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                            {city.provinceOrState}
                          </span>
                        )}
                      </div>
                      <h3 className="text-xl font-extrabold text-white mt-1 flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
                        <span>{city.cityName}</span>
                      </h3>
                    </div>
                    <span className="px-2 py-1 rounded-full bg-slate-950 border border-slate-800 text-[10px] font-semibold text-slate-300">
                      {city.portType || 'Port City'}
                    </span>
                  </div>

                  {/* Seaport Name & UN/LOCODE Badge */}
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1.5">
                    <div className="text-[10px] text-slate-400 uppercase font-semibold flex items-center justify-between">
                      <span>Primary Seaport</span>
                      <span className="font-mono text-cyan-400">{city.code}</span>
                    </div>
                    <div className="text-sm font-bold text-white flex items-center space-x-2">
                      <Anchor className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{city.portName}</span>
                    </div>
                    <div className="text-[11px] text-slate-400 flex items-center space-x-1.5 pt-1 border-t border-slate-800/80">
                      <Waves className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                      <span>Sea Body: <strong className="text-slate-200">{city.seaBody}</strong></span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                    {city.description}
                  </p>

                  {/* Weather & Wave Telemetry */}
                  <div className="grid grid-cols-2 gap-2 bg-slate-950/80 p-2.5 rounded-xl border border-slate-800 text-xs">
                    <div>
                      <div className="text-[10px] text-slate-400">City Weather</div>
                      <div className="font-bold text-white leading-tight mt-0.5">{city.weather}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-400">Coastal Wave Height</div>
                      <div className="font-bold text-cyan-400 leading-tight mt-0.5">{city.waveHeight} meters</div>
                    </div>
                  </div>

                  {city.majorCargo && (
                    <div className="space-y-1">
                      <div className="text-[10px] font-semibold text-slate-400 uppercase">City Port Specializations</div>
                      <div className="flex flex-wrap gap-1">
                        {city.majorCargo.map((tag, i) => (
                          <span key={i} className="text-[10px] bg-slate-800/80 text-slate-300 px-2 py-0.5 rounded border border-slate-700">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-xs text-emerald-400 font-semibold flex items-center space-x-1">
                    <Radio className="w-3.5 h-3.5 animate-pulse" />
                    <span>{city.activeSchedules} Schedules</span>
                  </span>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setSelectedPortDetail(city.port)}
                      className="px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition-all"
                    >
                      Details
                    </button>

                    <button
                      onClick={() => handleSelectPortFilter(city.cityName)}
                      className="px-3 py-1.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 text-xs font-bold transition-all flex items-center space-x-1"
                    >
                      <span>Timetables</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: SOUTH ASIAN SEA PORTS DIRECTORY */}
      {activeTab === 'ports' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white flex items-center space-x-2">
              <Anchor className="w-5 h-5 text-emerald-400" />
              <span>South Asian Sea Ports Directory ({filteredPorts.length})</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredPorts.map((port) => (
              <div
                key={port.id}
                onClick={() => setSelectedPortDetail(port)}
                className="bg-slate-900 rounded-2xl p-5 border border-slate-800 hover:border-emerald-500/50 transition-all text-white space-y-4 cursor-pointer group shadow-lg flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">{port.countryFlag || '⚓'}</span>
                        <span className="text-xs font-bold text-emerald-400">{port.country}</span>
                        <span className="text-[10px] font-mono text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">{port.code}</span>
                      </div>
                      <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors mt-1">
                        {port.name}
                      </h3>
                    </div>
                    <span className="px-2 py-1 rounded-full bg-slate-950 border border-slate-800 text-[10px] font-semibold text-slate-300">
                      {port.portType || 'Seaport'}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                    {port.description}
                  </p>

                  {/* Telemetry Bar */}
                  <div className="grid grid-cols-2 gap-2 bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-xs">
                    <div>
                      <div className="text-[10px] text-slate-400">Weather & Sea</div>
                      <div className="font-bold text-white leading-tight mt-0.5">{port.weatherCondition}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-400">Wave Height</div>
                      <div className="font-bold text-cyan-400 leading-tight mt-0.5">{port.currentWaveHeight} meters</div>
                    </div>
                  </div>

                  {port.majorImportsExports && (
                    <div className="space-y-1">
                      <div className="text-[10px] font-semibold text-slate-400 uppercase">Major Cargo / Traffic</div>
                      <div className="flex flex-wrap gap-1">
                        {port.majorImportsExports.map((tag, idx) => (
                          <span key={idx} className="text-[10px] bg-slate-800/80 text-slate-300 px-2 py-0.5 rounded border border-slate-700">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-xs text-emerald-400 font-semibold flex items-center space-x-1">
                    <Radio className="w-3.5 h-3.5 animate-pulse" />
                    <span>{port.activeSchedulesCount} Schedules Linked</span>
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectPortFilter(port.name);
                    }}
                    className="px-3 py-1.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-xs font-bold transition-all flex items-center space-x-1"
                  >
                    <span>View Timetables</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: TRAVELING SEAWAY ROUTES */}
      {activeTab === 'seaways' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white flex items-center space-x-2">
              <Navigation className="w-5 h-5 text-cyan-400" />
              <span>South Asian Traveling Seaway Corridors & Shipping Highways</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {uniqueSeaways.map((routeName, idx) => {
              const matchingVessels = CRUISE_TIMETABLES.filter((s) => s.seawayRouteName === routeName);
              const sampleVessel = matchingVessels[0];

              return (
                <div key={idx} className="bg-slate-900 rounded-2xl p-6 border border-slate-800 text-white space-y-4 shadow-xl">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                        Maritime Shipping Channel
                      </span>
                      <h3 className="text-xl font-extrabold text-white mt-1">{routeName}</h3>
                    </div>
                    <span className="text-xs font-mono text-slate-400 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800">
                      {matchingVessels.length} Active Vessels
                    </span>
                  </div>

                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 space-y-3">
                    <div className="text-xs font-bold text-slate-300">Route Waypoints & Navigation Markers</div>
                    <div className="flex flex-wrap items-center gap-2">
                      {sampleVessel?.seawayWaypoints?.map((wp, wIdx) => (
                        <React.Fragment key={wIdx}>
                          <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 text-xs font-medium text-slate-200">
                            {wp}
                          </span>
                          {wIdx < (sampleVessel.seawayWaypoints?.length || 0) - 1 && (
                            <ArrowRight className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-xs font-bold text-slate-400 uppercase">Assigned Vessels Operating on this Seaway</div>
                    <div className="space-y-1.5">
                      {matchingVessels.map((vessel) => (
                        <div key={vessel.id} className="flex items-center justify-between bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-xs">
                          <div className="flex items-center space-x-2">
                            <Ship className="w-3.5 h-3.5 text-cyan-400" />
                            <span className="font-bold text-white">{vessel.vesselName}</span>
                            <span className="text-[10px] text-slate-400">({vessel.vesselType})</span>
                          </div>
                          <span className="text-slate-300 font-medium">{vessel.originCountry} ➔ {vessel.destinationCountry}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SCHEDULE DETAIL MODAL */}
      {selectedSchedule && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl w-full p-6 text-white space-y-6 relative shadow-2xl max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedSchedule(null)}
              className="absolute top-4 right-4 p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-3">
              <div className="p-3 bg-cyan-500/20 text-cyan-400 rounded-xl">
                <Ship className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs text-cyan-400 font-semibold uppercase">{selectedSchedule.cruiseLine}</span>
                <h2 className="text-2xl font-bold">{selectedSchedule.vesselName}</h2>
                <p className="text-xs text-slate-400">{selectedSchedule.vesselType} • Route ID: {selectedSchedule.id}</p>
              </div>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <div className="text-xs text-cyan-400 font-bold uppercase">Traveling Seaway Route & Waypoints</div>
              <div className="text-sm font-extrabold text-white">{selectedSchedule.seawayRouteName}</div>
              {selectedSchedule.seawayWaypoints && (
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  {selectedSchedule.seawayWaypoints.map((wp, idx) => (
                    <span key={idx} className="text-[10px] bg-slate-900 px-2 py-1 rounded border border-slate-800 text-slate-300">
                      📍 {wp}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <p className="text-sm text-slate-300 leading-relaxed bg-slate-950 p-4 rounded-xl border border-slate-800">
              {selectedSchedule.description}
            </p>

            {/* Timetable Detailed Box */}
            <div className="grid grid-cols-2 gap-3 bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs">
              <div>
                <div className="text-amber-400 font-bold">Departure Timetable</div>
                <div className="text-base font-extrabold text-white mt-1">{selectedSchedule.departureTime}</div>
                <div className="text-slate-400 mt-0.5">Port: {selectedSchedule.originPort}</div>
              </div>
              <div>
                <div className="text-sky-400 font-bold">Arrival Timetable</div>
                <div className="text-base font-extrabold text-white mt-1">{selectedSchedule.arrivalTime}</div>
                <div className="text-slate-400 mt-0.5">Port: {selectedSchedule.destinationPort}</div>
              </div>
            </div>

            {/* Sea Conditions */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-sky-400 uppercase tracking-wider">
                Sea Route Condition Telemetry
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs">
                <div>
                  <div className="text-slate-400">Wave Height</div>
                  <div className="text-base font-bold text-white">{selectedSchedule.seaCondition.waveHeightM} meters</div>
                </div>
                <div>
                  <div className="text-slate-400">Swell Period</div>
                  <div className="text-base font-bold text-white">{selectedSchedule.seaCondition.swellPeriodSec} sec</div>
                </div>
                <div>
                  <div className="text-slate-400">Wind Velocity</div>
                  <div className="text-base font-bold text-white">{selectedSchedule.seaCondition.windKnots} knots</div>
                </div>
                <div>
                  <div className="text-slate-400">Visibility</div>
                  <div className="text-base font-bold text-white">{selectedSchedule.seaCondition.visibilityNM} NM</div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400">Distance & Duration</span>
                <div className="text-sm font-bold text-white">{selectedSchedule.distanceNM} Nautical Miles ({selectedSchedule.durationHours} Hours)</div>
              </div>
              <button
                onClick={() => setSelectedSchedule(null)}
                className="px-5 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold hover:bg-cyan-400 transition-all text-sm"
              >
                Close Schedule Details
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PORT DETAIL MODAL */}
      {selectedPortDetail && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-xl w-full p-6 text-white space-y-5 relative shadow-2xl">
            <button
              onClick={() => setSelectedPortDetail(null)}
              className="absolute top-4 right-4 p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-3">
              <span className="text-3xl">{selectedPortDetail.countryFlag || '⚓'}</span>
              <div>
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-xs font-bold text-emerald-400">{selectedPortDetail.country}</span>
                  {selectedPortDetail.provinceOrState && (
                    <span className="text-[10px] text-emerald-300 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      {selectedPortDetail.provinceOrState}
                    </span>
                  )}
                  <span className="text-[10px] font-mono text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">UN/LOCODE: {selectedPortDetail.code}</span>
                </div>
                <h2 className="text-2xl font-bold text-white mt-0.5">{selectedPortDetail.name}</h2>
                <div className="text-xs text-cyan-400 font-medium flex items-center space-x-1.5 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 shrink-0" />
                  <span>Sea Port City: <strong>{selectedPortDetail.cityName}</strong></span>
                  <span className="text-slate-500">•</span>
                  <span>Sea Body: <strong>{selectedPortDetail.seaBody}</strong></span>
                </div>
              </div>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed bg-slate-950 p-4 rounded-xl border border-slate-800">
              {selectedPortDetail.description}
            </p>

            {selectedPortDetail.operatingSeaways && (
              <div className="space-y-2">
                <div className="text-xs font-bold text-cyan-400 uppercase">Operating Traveling Seaways</div>
                <div className="space-y-1">
                  {selectedPortDetail.operatingSeaways.map((sw, idx) => (
                    <div key={idx} className="flex items-center space-x-2 text-xs bg-slate-950 p-2 rounded-lg border border-slate-800 text-slate-200">
                      <Navigation className="w-3 h-3 text-cyan-400" />
                      <span>{sw}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <button
                onClick={() => {
                  const portName = selectedPortDetail.name;
                  setSelectedPortDetail(null);
                  handleSelectPortFilter(portName);
                }}
                className="px-5 py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-bold hover:bg-emerald-400 transition-all text-sm flex items-center space-x-2"
              >
                <span>Filter Timetables for this Port</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setSelectedPortDetail(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold hover:bg-slate-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
