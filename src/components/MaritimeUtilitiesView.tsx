import React, { useState } from 'react';
import {
  ShieldAlert,
  AlertTriangle,
  Radio,
  Landmark,
  Anchor,
  Ship,
  MapPin,
  Compass,
  DollarSign,
  Flame,
  Wrench,
  Stethoscope,
  PhoneCall,
  CheckCircle2,
  RefreshCw,
  Search,
  Sparkles,
  Bot,
  Layers,
  Plus,
  Bell,
  Volume2,
  Navigation,
  Crosshair,
  CreditCard,
  Building2,
  HelpCircle,
  FileText,
  Activity,
  X,
  Droplets
} from 'lucide-react';
import {
  GEOGRAPHIC_SEA_ROUTES,
  PORT_STATIONS,
  MARITIME_BANKS,
  MARITIME_UTILITIES,
  INITIAL_VESSEL_ALERTS,
  SeaRouteGeographic,
  PortStation,
  MaritimeBank,
  MaritimeUtility,
  VesselAlertItem
} from '../data/maritimeUtilitiesData';

export const MaritimeUtilitiesView: React.FC = () => {
  // Main view tabs: "alerts" | "routes-map" | "stations" | "banks" | "utilities"
  const [activeTab, setActiveTab] = useState<'alerts' | 'routes-map' | 'stations' | 'banks' | 'utilities'>('alerts');

  // --- VESSELS ALERT SYSTEM STATE ---
  const [alerts, setAlerts] = useState<VesselAlertItem[]>(INITIAL_VESSEL_ALERTS);
  const [alertFilter, setAlertFilter] = useState<string>('All');
  const [alertSeverityFilter, setAlertSeverityFilter] = useState<string>('All');
  const [selectedAlert, setSelectedAlert] = useState<VesselAlertItem | null>(alerts[0] || null);

  // Trigger New Distress SOS Modal
  const [showSosModal, setShowSosModal] = useState<boolean>(false);
  const [sosVesselName, setSosVesselName] = useState<string>('MV Ocean Express');
  const [sosHarborName, setSosHarborName] = useState<string>('JNPT Mumbai');
  const [sosAlertType, setSosAlertType] = useState<'Collision CPA' | 'EEZ Intrusion' | 'Cyclonic Weather' | 'Shallow Depth' | 'Distress SOS'>('Distress SOS');
  const [sosDescription, setSosDescription] = useState<string>('Engine failure near shallow reef. Requesting emergency tugboat escort.');

  // --- DIRECTORY SEARCH STATE ---
  const [directorySearch, setDirectorySearch] = useState<string>('');
  const [countryFilter, setCountryFilter] = useState<string>('All');

  // Selected items for modal/drawer inspection
  const [selectedRoute, setSelectedRoute] = useState<SeaRouteGeographic | null>(GEOGRAPHIC_SEA_ROUTES[0]);
  const [selectedStation, setSelectedStation] = useState<PortStation | null>(PORT_STATIONS[0]);
  const [selectedBank, setSelectedBank] = useState<MaritimeBank | null>(MARITIME_BANKS[0]);
  const [selectedUtility, setSelectedUtility] = useState<MaritimeUtility | null>(MARITIME_UTILITIES[0]);

  // Seafarer Currency Exchange Calculator
  const [calcAmount, setCalcAmount] = useState<number>(1000);
  const [calcFromCurrency, setCalcFromCurrency] = useState<string>('USD');
  const [calcToCurrency, setCalcToCurrency] = useState<string>('INR');

  // Exchange rates dictionary
  const exchangeRates: Record<string, number> = {
    USD: 1.0,
    INR: 83.5,
    LKR: 302.0,
    BDT: 117.5,
    MVR: 15.4,
    PKR: 278.2,
    SGD: 1.35,
    EUR: 0.92,
    GBP: 0.78,
    AED: 3.67
  };

  const convertedResult = (
    (calcAmount / (exchangeRates[calcFromCurrency] || 1)) *
    (exchangeRates[calcToCurrency] || 1)
  ).toFixed(2);

  // Handle Acknowledge Alert
  const handleAcknowledgeAlert = (id: string) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, acknowledged: true } : a))
    );
  };

  // Handle Trigger SOS Alert
  const handleTriggerSos = (e: React.FormEvent) => {
    e.preventDefault();
    const newAlert: VesselAlertItem = {
      id: `alert-sos-${Date.now()}`,
      vesselId: `vessel-user-${Math.floor(Math.random() * 900 + 100)}`,
      vesselName: sosVesselName,
      mmsi: 419000000 + Math.floor(Math.random() * 90000),
      harborName: sosHarborName,
      alertType: sosAlertType,
      severity: sosAlertType === 'Distress SOS' ? 'Critical' : 'High',
      lat: 18.95 + (Math.random() * 0.1 - 0.05),
      lng: 72.82 + (Math.random() * 0.1 - 0.05),
      timestamp: 'Just now',
      description: sosDescription,
      actionRequired: 'Coast Guard Rescue Unit notified. Broadcast MAYDAY signal on VHF Ch 16.',
      acknowledged: false
    };

    setAlerts([newAlert, ...alerts]);
    setSelectedAlert(newAlert);
    setShowSosModal(false);
  };

  // Filtered Alert Items
  const filteredAlerts = alerts.filter((a) => {
    const matchesType = alertFilter === 'All' ? true : a.alertType === alertFilter;
    const matchesSeverity = alertSeverityFilter === 'All' ? true : a.severity === alertSeverityFilter;
    return matchesType && matchesSeverity;
  });

  // Filtered Port Stations
  const filteredStations = PORT_STATIONS.filter((st) => {
    const matchesSearch =
      st.name.toLowerCase().includes(directorySearch.toLowerCase()) ||
      st.servicesOffered.some((s) => s.toLowerCase().includes(directorySearch.toLowerCase()));
    const matchesCountry = countryFilter === 'All' ? true : st.country === countryFilter;
    return matchesSearch && matchesCountry;
  });

  // Filtered Banks
  const filteredBanks = MARITIME_BANKS.filter((bk) => {
    const matchesSearch =
      bk.name.toLowerCase().includes(directorySearch.toLowerCase()) ||
      bk.portLocation.toLowerCase().includes(directorySearch.toLowerCase()) ||
      bk.swiftCode.toLowerCase().includes(directorySearch.toLowerCase());
    const matchesCountry = countryFilter === 'All' ? true : bk.country === countryFilter;
    return matchesSearch && matchesCountry;
  });

  // Filtered Utilities
  const filteredUtilities = MARITIME_UTILITIES.filter((ut) => {
    const matchesSearch =
      ut.name.toLowerCase().includes(directorySearch.toLowerCase()) ||
      ut.portName.toLowerCase().includes(directorySearch.toLowerCase()) ||
      ut.capacityDetails.toLowerCase().includes(directorySearch.toLowerCase());
    const matchesCountry = countryFilter === 'All' ? true : ut.country === countryFilter;
    return matchesSearch && matchesCountry;
  });

  return (
    <div id="maritime-utilities-view" className="space-y-6">
      {/* Top Banner Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-rose-500/20 text-rose-300 border border-rose-500/30 flex items-center space-x-1.5 animate-pulse">
                <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
                <span>MARITIME UTILITIES & SAFETY MONITOR</span>
              </span>
              <span className="text-xs text-slate-400 font-mono">
                ACTIVE ALERTS: {alerts.filter((a) => !a.acknowledged).length} UNRESOLVED
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center space-x-3">
              <Compass className="w-8 h-8 text-cyan-400" />
              <span>Vessel Alerts, Sea Routes, Port Stations & Banking Hub</span>
            </h1>
            <p className="text-slate-300 text-sm mt-1 max-w-3xl">
              Real-time vessel collision & hazard alerts, international sea route maps, Coast Guard & Port Control stations, port-side maritime banks, and essential bunkering/drydock utilities.
            </p>
          </div>

          <button
            onClick={() => setShowSosModal(true)}
            className="px-4 py-2.5 bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white font-extrabold rounded-xl text-xs sm:text-sm flex items-center space-x-2 transition-all shadow-lg shadow-rose-600/30 shrink-0"
          >
            <ShieldAlert className="w-4 h-4 animate-bounce" />
            <span>TRIGGER VESSEL DISTRESS SOS</span>
          </button>
        </div>
      </div>

      {/* Main Mode Sub-Navigation Tabs */}
      <div className="bg-slate-900 border border-slate-800 p-2 rounded-2xl flex items-center justify-between overflow-x-auto gap-2">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setActiveTab('alerts')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center space-x-2 shrink-0 ${
              activeTab === 'alerts'
                ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <ShieldAlert className="w-4 h-4" />
            <span>VESSEL ALERTS ENGINE</span>
            {alerts.filter((a) => !a.acknowledged).length > 0 && (
              <span className="px-1.5 py-0.5 rounded-full bg-slate-950 text-rose-300 text-[10px] font-mono">
                {alerts.filter((a) => !a.acknowledged).length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('routes-map')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center space-x-2 shrink-0 ${
              activeTab === 'routes-map'
                ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Navigation className="w-4 h-4" />
            <span>GEOGRAPHIC SEA ROUTES</span>
          </button>

          <button
            onClick={() => setActiveTab('stations')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center space-x-2 shrink-0 ${
              activeTab === 'stations'
                ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Radio className="w-4 h-4" />
            <span>PORT STATIONS & COAST GUARD</span>
          </button>

          <button
            onClick={() => setActiveTab('banks')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center space-x-2 shrink-0 ${
              activeTab === 'banks'
                ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Landmark className="w-4 h-4" />
            <span>MARITIME BANKS & REMITTANCE</span>
          </button>

          <button
            onClick={() => setActiveTab('utilities')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center space-x-2 shrink-0 ${
              activeTab === 'utilities'
                ? 'bg-sky-500 text-slate-950 shadow-lg shadow-sky-500/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Flame className="w-4 h-4" />
            <span>BUNKERING & DRYDOCKS</span>
          </button>
        </div>
      </div>

      {/* ==================== TAB 1: VESSEL ALERTS SYSTEM ==================== */}
      {activeTab === 'alerts' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Filter Bar */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
              <span className="text-xs text-slate-400 font-bold uppercase mr-1">Alert Type:</span>
              {['All', 'Collision CPA', 'EEZ Intrusion', 'Cyclonic Weather', 'Shallow Depth', 'Distress SOS'].map((type) => (
                <button
                  key={type}
                  onClick={() => setAlertFilter(type)}
                  className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all shrink-0 ${
                    alertFilter === type
                      ? 'bg-rose-500 text-white'
                      : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>

            <div className="flex items-center space-x-2 w-full sm:w-auto">
              <span className="text-xs text-slate-400 font-bold uppercase">Severity:</span>
              <select
                value={alertSeverityFilter}
                onChange={(e) => setAlertSeverityFilter(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-1 text-xs text-white focus:outline-none focus:border-rose-500"
              >
                <option value="All">All Severities</option>
                <option value="Critical">Critical</option>
                <option value="High">High</option>
                <option value="Warning">Warning</option>
                <option value="Info">Info</option>
              </select>
            </div>
          </div>

          {/* Alerts Grid & Detail Panel */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left 2 Cols: Alerts List */}
            <div className="lg:col-span-2 space-y-3">
              {filteredAlerts.length > 0 ? (
                filteredAlerts.map((alert) => {
                  const isSelected = selectedAlert?.id === alert.id;
                  return (
                    <div
                      key={alert.id}
                      onClick={() => setSelectedAlert(alert)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-3 ${
                        isSelected
                          ? 'bg-slate-900 border-rose-500 shadow-xl shadow-rose-500/10'
                          : alert.acknowledged
                          ? 'bg-slate-950/80 border-slate-800/80 text-slate-400 hover:border-slate-700'
                          : alert.severity === 'Critical'
                          ? 'bg-rose-950/30 border-rose-500/50 hover:border-rose-400'
                          : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center space-x-3">
                          <div
                            className={`p-2 rounded-xl ${
                              alert.severity === 'Critical'
                                ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40 animate-pulse'
                                : alert.severity === 'High'
                                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                                : 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40'
                            }`}
                          >
                            <ShieldAlert className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="flex items-center space-x-2">
                              <span className="font-bold text-white text-sm">{alert.vesselName}</span>
                              <span className="text-xs font-mono text-slate-400">MMSI: {alert.mmsi}</span>
                            </div>
                            <p className="text-xs text-teal-400 font-semibold">{alert.harborName}</p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2 shrink-0">
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase border ${
                              alert.severity === 'Critical'
                                ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                                : alert.severity === 'High'
                                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                                : alert.severity === 'Warning'
                                ? 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40'
                                : 'bg-sky-500/20 text-sky-300 border-sky-500/40'
                            }`}
                          >
                            {alert.severity}
                          </span>
                          <span className="text-[10px] text-slate-500 font-mono">{alert.timestamp}</span>
                        </div>
                      </div>

                      <p className="text-xs text-slate-300 leading-relaxed">{alert.description}</p>

                      <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-800/80">
                        <div className="flex items-center space-x-1.5 text-rose-300 font-medium">
                          <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                          <span className="truncate">{alert.actionRequired}</span>
                        </div>

                        {alert.acknowledged ? (
                          <span className="text-[11px] text-emerald-400 flex items-center space-x-1 font-bold shrink-0">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>ACKNOWLEDGED</span>
                          </span>
                        ) : (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAcknowledgeAlert(alert.id);
                            }}
                            className="px-2.5 py-1 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 text-[11px] font-bold border border-emerald-500/40 transition-all shrink-0"
                          >
                            Acknowledge
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center text-slate-400 text-sm">
                  No active vessel alerts match your selected filters.
                </div>
              )}
            </div>

            {/* Right 1 Col: Selected Alert Deep Inspector */}
            <div>
              {selectedAlert ? (
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-2xl sticky top-20">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div className="flex items-center space-x-2">
                      <ShieldAlert className="w-5 h-5 text-rose-400" />
                      <h3 className="font-bold text-white text-base">Alert Details Inspector</h3>
                    </div>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        selectedAlert.severity === 'Critical'
                          ? 'bg-rose-500 text-slate-950 font-black'
                          : 'bg-amber-500 text-slate-950 font-black'
                      }`}
                    >
                      {selectedAlert.severity}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div className="text-xs text-slate-400">TARGET VESSEL</div>
                    <div className="text-lg font-bold text-white">{selectedAlert.vesselName}</div>
                    <div className="text-xs font-mono text-teal-300">
                      MMSI: {selectedAlert.mmsi} | HARBOR: {selectedAlert.harborName}
                    </div>
                  </div>

                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1 text-xs font-mono">
                    <div className="text-slate-400 text-[10px]">COORDINATES AT INCIDENT:</div>
                    <div className="text-cyan-300 font-bold">
                      {selectedAlert.lat.toFixed(4)}° N, {selectedAlert.lng.toFixed(4)}° E
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="text-xs text-slate-400">ALERT SUMMARY</div>
                    <p className="text-xs text-slate-200 leading-relaxed bg-slate-950 p-3 rounded-xl border border-slate-800">
                      {selectedAlert.description}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <div className="text-xs text-slate-400">RECOMMENDED SAFETY ACTION</div>
                    <p className="text-xs text-rose-200 leading-relaxed bg-rose-950/30 p-3 rounded-xl border border-rose-500/40 font-semibold">
                      {selectedAlert.actionRequired}
                    </p>
                  </div>

                  {!selectedAlert.acknowledged && (
                    <button
                      onClick={() => handleAcknowledgeAlert(selectedAlert.id)}
                      className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold rounded-xl text-xs transition-all flex items-center justify-center space-x-2 shadow-lg shadow-emerald-500/20"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>MARK ALERT AS ACKNOWLEDGED</span>
                    </button>
                  )}
                </div>
              ) : (
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center text-slate-400 text-xs">
                  Select an alert from the feed to inspect coordinates and emergency action protocols.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ==================== TAB 2: GEOGRAPHIC SEA ROUTES ==================== */}
      {activeTab === 'routes-map' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Route Cards */}
            <div className="lg:col-span-2 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {GEOGRAPHIC_SEA_ROUTES.map((route) => {
                  const isSelected = selectedRoute?.id === route.id;
                  return (
                    <div
                      key={route.id}
                      onClick={() => setSelectedRoute(route)}
                      className={`p-5 rounded-2xl border transition-all cursor-pointer space-y-3 ${
                        isSelected
                          ? 'bg-slate-900 border-cyan-400 shadow-xl shadow-cyan-500/10'
                          : 'bg-slate-950 border-slate-800 hover:bg-slate-900'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-mono">
                          {route.code}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            route.riskLevel === 'High'
                              ? 'bg-rose-500/20 text-rose-300'
                              : 'bg-emerald-500/20 text-emerald-300'
                          }`}
                        >
                          {route.riskLevel} Risk
                        </span>
                      </div>

                      <h3 className="font-bold text-white text-sm">{route.name}</h3>

                      <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                        <div className="bg-slate-900 p-2 rounded-xl border border-slate-800">
                          <span className="text-slate-400 text-[10px]">Length:</span>
                          <p className="text-cyan-300 font-bold">{route.lengthNm} NM</p>
                        </div>
                        <div className="bg-slate-900 p-2 rounded-xl border border-slate-800">
                          <span className="text-slate-400 text-[10px]">Active Ships:</span>
                          <p className="text-teal-300 font-bold">{route.totalVesselsActive} Ships</p>
                        </div>
                      </div>

                      <p className="text-xs text-slate-400 line-clamp-2">{route.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Route Inspector */}
            <div>
              {selectedRoute && (
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl sticky top-20">
                  <div className="flex items-center space-x-2 border-b border-slate-800 pb-3">
                    <Navigation className="w-5 h-5 text-cyan-400" />
                    <div>
                      <h3 className="font-bold text-white text-base">{selectedRoute.name}</h3>
                      <p className="text-xs font-mono text-cyan-300">{selectedRoute.code}</p>
                    </div>
                  </div>

                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-2 text-xs">
                    <div className="font-bold text-slate-300">KEY WAYPOINTS ALONG SEA ROUTE:</div>
                    <div className="space-y-1.5 font-mono">
                      {selectedRoute.pathPoints.map((pt, idx) => (
                        <div key={idx} className="flex items-center justify-between text-[11px]">
                          <span className="text-slate-300 flex items-center space-x-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                            <span>{pt.name}</span>
                          </span>
                          <span className="text-teal-400">{pt.lat.toFixed(2)}°N, {pt.lng.toFixed(2)}°E</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1 text-xs">
                    <div className="text-slate-400">PRIMARY CARGO TRAFFIC:</div>
                    <div className="font-bold text-amber-300 bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                      {selectedRoute.primaryCargo}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ==================== TAB 3: PORT STATIONS & COAST GUARD ==================== */}
      {activeTab === 'stations' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Search & Country Filter Bar */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input
                type="text"
                placeholder="Search station name, VTS, services..."
                value={directorySearch}
                onChange={(e) => setDirectorySearch(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="flex items-center space-x-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
              {['All', 'India', 'Sri Lanka', 'Bangladesh', 'Maldives', 'Pakistan', 'Singapore'].map((c) => (
                <button
                  key={c}
                  onClick={() => setCountryFilter(c)}
                  className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all shrink-0 ${
                    countryFilter === c
                      ? 'bg-emerald-500 text-slate-950 font-bold'
                      : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Stations Directory Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredStations.map((station) => (
              <div
                key={station.id}
                className="bg-slate-900 border border-slate-800 hover:border-emerald-500/50 p-5 rounded-2xl transition-all space-y-4 shadow-lg"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl">{station.countryFlag}</span>
                    <div>
                      <h3 className="font-bold text-white text-sm">{station.name}</h3>
                      <p className="text-xs text-slate-400">{station.country}</p>
                    </div>
                  </div>

                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/30">
                    {station.operationalStatus}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  <div className="bg-slate-950 p-2 rounded-xl border border-slate-800">
                    <span className="text-slate-400 text-[10px]">VHF CHANNEL</span>
                    <p className="text-emerald-300 font-bold text-sm">CH {station.vhfChannel}</p>
                  </div>
                  <div className="bg-slate-950 p-2 rounded-xl border border-slate-800">
                    <span className="text-slate-400 text-[10px]">PHONE CONTACT</span>
                    <p className="text-cyan-300 font-bold text-[11px] truncate">{station.phone}</p>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="text-[10px] text-slate-400 font-bold uppercase">Services Offered:</div>
                  <div className="flex flex-wrap gap-1">
                    {station.servicesOffered.map((srv, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded bg-slate-950 text-slate-300 text-[10px] border border-slate-800">
                        {srv}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ==================== TAB 4: MARITIME BANKS & REMITTANCE ==================== */}
      {activeTab === 'banks' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Seafarer Currency Exchange Calculator Bar */}
          <div className="bg-gradient-to-r from-amber-950/40 via-slate-900 to-slate-900 border border-amber-500/30 p-5 rounded-2xl space-y-3">
            <div className="flex items-center space-x-2">
              <DollarSign className="w-5 h-5 text-amber-400" />
              <h3 className="font-bold text-white text-sm">Seafarer Foreign Currency Calculator & Wire Rate</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
              <div>
                <label className="text-slate-400 text-[10px]">AMOUNT</label>
                <input
                  type="number"
                  value={calcAmount}
                  onChange={(e) => setCalcAmount(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono font-bold focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-slate-400 text-[10px]">FROM CURRENCY</label>
                <select
                  value={calcFromCurrency}
                  onChange={(e) => setCalcFromCurrency(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono font-bold focus:outline-none focus:border-amber-500"
                >
                  {Object.keys(exchangeRates).map((curr) => (
                    <option key={curr} value={curr}>{curr}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-slate-400 text-[10px]">TO CURRENCY</label>
                <select
                  value={calcToCurrency}
                  onChange={(e) => setCalcToCurrency(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono font-bold focus:outline-none focus:border-amber-500"
                >
                  {Object.keys(exchangeRates).map((curr) => (
                    <option key={curr} value={curr}>{curr}</option>
                  ))}
                </select>
              </div>

              <div className="bg-slate-950 p-2.5 rounded-xl border border-amber-500/40 flex flex-col justify-center">
                <span className="text-slate-400 text-[10px]">ESTIMATED PAYOUT</span>
                <span className="text-amber-300 font-mono font-black text-lg">
                  {convertedResult} {calcToCurrency}
                </span>
              </div>
            </div>
          </div>

          {/* Banks Directory */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredBanks.map((bank) => (
              <div
                key={bank.id}
                className="bg-slate-900 border border-slate-800 hover:border-amber-500/50 p-5 rounded-2xl transition-all space-y-4 shadow-lg"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl">{bank.countryFlag}</span>
                    <div>
                      <h3 className="font-bold text-white text-sm">{bank.name}</h3>
                      <p className="text-xs text-amber-300 font-medium">{bank.bankType}</p>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-300 font-mono bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                  📍 {bank.portLocation}
                </p>

                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  <div className="bg-slate-950 p-2 rounded-xl border border-slate-800">
                    <span className="text-slate-400 text-[10px]">SWIFT CODE</span>
                    <p className="text-amber-300 font-bold">{bank.swiftCode}</p>
                  </div>
                  <div className="bg-slate-950 p-2 rounded-xl border border-slate-800">
                    <span className="text-slate-400 text-[10px]">HOURS</span>
                    <p className="text-slate-300 font-bold text-[10px]">{bank.workingHours}</p>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="text-[10px] text-slate-400 uppercase font-bold">Specialized Seafarer Services:</div>
                  <ul className="text-xs text-slate-300 space-y-1 list-disc list-inside">
                    {bank.specialServices.map((s, idx) => (
                      <li key={idx} className="truncate">{s}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ==================== TAB 5: BUNKERING & DRYDOCKS ==================== */}
      {activeTab === 'utilities' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredUtilities.map((utility) => (
              <div
                key={utility.id}
                className="bg-slate-900 border border-slate-800 hover:border-sky-500/50 p-5 rounded-2xl transition-all space-y-4 shadow-lg"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl">{utility.countryFlag}</span>
                    <div>
                      <h3 className="font-bold text-white text-sm">{utility.name}</h3>
                      <p className="text-xs text-sky-300 font-medium">{utility.utilityType}</p>
                    </div>
                  </div>

                  <span className="px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 text-[10px] font-bold border border-sky-500/30">
                    {utility.availability}
                  </span>
                </div>

                <div className="text-xs text-slate-300 bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
                  <div className="text-slate-400 text-[10px] uppercase font-bold">Port & Station Specs:</div>
                  <div><strong>Port:</strong> {utility.portName}</div>
                  <div className="text-slate-400">{utility.capacityDetails}</div>
                </div>

                <div className="flex items-center justify-between text-xs font-mono pt-2 border-t border-slate-800">
                  {utility.vhfChannel && (
                    <span className="text-emerald-400 font-bold">VHF CH {utility.vhfChannel}</span>
                  )}
                  <span className="text-slate-400">{utility.phone}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ==================== TRIGGER SOS / DISTRESS MODAL ==================== */}
      {showSosModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-rose-500/50 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl animate-scaleIn">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2 text-rose-400 font-extrabold text-base">
                <ShieldAlert className="w-6 h-6 animate-pulse" />
                <span>Trigger Vessels Distress / Hazard Alert</span>
              </div>
              <button
                onClick={() => setShowSosModal(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleTriggerSos} className="space-y-4 text-xs">
              <div>
                <label className="text-slate-300 font-bold mb-1 block">Vessel Name</label>
                <input
                  type="text"
                  required
                  value={sosVesselName}
                  onChange={(e) => setSosVesselName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-rose-500"
                />
              </div>

              <div>
                <label className="text-slate-300 font-bold mb-1 block">Harbor / Port Location</label>
                <input
                  type="text"
                  required
                  value={sosHarborName}
                  onChange={(e) => setSosHarborName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-rose-500"
                />
              </div>

              <div>
                <label className="text-slate-300 font-bold mb-1 block">Alert Category</label>
                <select
                  value={sosAlertType}
                  onChange={(e: any) => setSosAlertType(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-rose-500"
                >
                  <option value="Distress SOS">Distress SOS (MAYDAY)</option>
                  <option value="Collision CPA">Collision CPA Hazard</option>
                  <option value="Cyclonic Weather">Cyclonic Storm Surge</option>
                  <option value="Shallow Depth">Shallow Water Draft Warning</option>
                  <option value="EEZ Intrusion">EEZ Territorial Waters Warning</option>
                </select>
              </div>

              <div>
                <label className="text-slate-300 font-bold mb-1 block">Distress / Incident Description</label>
                <textarea
                  required
                  rows={3}
                  value={sosDescription}
                  onChange={(e) => setSosDescription(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-rose-500"
                />
              </div>

              <div className="flex items-center space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowSosModal(false)}
                  className="w-1/2 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-xl"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="w-1/2 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-extrabold rounded-xl shadow-lg shadow-rose-600/30 flex items-center justify-center space-x-1.5"
                >
                  <ShieldAlert className="w-4 h-4" />
                  <span>BROADCAST ALERT</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
