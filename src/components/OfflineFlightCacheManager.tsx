import React, { useState, useEffect } from 'react';
import {
  Wifi,
  WifiOff,
  Plane,
  Download,
  HardDrive,
  CheckCircle2,
  Search,
  QrCode,
  Calendar,
  Clock,
  MapPin,
  Luggage,
  ShieldCheck,
  RefreshCw,
  Trash2,
  Plus,
  ArrowRight,
  Ticket,
  Printer,
  Sparkles,
  Zap,
  Globe,
  Database
} from 'lucide-react';
import {
  useOfflineFlightStatus,
  cacheFlightBooking,
  cacheTrackedFlightStatus,
  cacheFlightSearchResult,
  clearAllOfflineFlightCache,
  OfflineFlightBooking,
  OfflineTrackedFlight,
  OfflineFlightSearch
} from '../utils/offlineFlightCache';

export const OfflineFlightCacheManager: React.FC = () => {
  const { isOnline, swActive, offlineData, reloadOfflineData } = useOfflineFlightStatus();

  // Simulated Offline Mode State (allows testing offline behavior even when online)
  const [simulatedOffline, setSimulatedOffline] = useState<boolean>(false);
  const effectiveOnline = isOnline && !simulatedOffline;

  // Active view tab
  const [activeTab, setActiveTab] = useState<'tickets' | 'tracker' | 'searches'>('tickets');

  // Search Filter Query for Offline Items
  const [searchFilter, setSearchFilter] = useState<string>('');

  // Modal for Viewing Selected Offline Boarding Pass Ticket
  const [selectedTicket, setSelectedTicket] = useState<OfflineFlightBooking | null>(null);

  // Modal for Adding a Custom Test Flight Booking to Service Worker Cache
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [newPassengerName, setNewPassengerName] = useState<string>('Capt. Vikramaditya');
  const [newFlightNo, setNewFlightNo] = useState<string>('SQ-422');
  const [newAirline, setNewAirline] = useState<string>('Singapore Airlines');
  const [newType, setNewType] = useState<string>('International');
  const [newOrigin, setNewOrigin] = useState<string>('BOM - Mumbai Airport');
  const [newDestination, setNewDestination] = useState<string>('SIN - Singapore Changi Airport');
  const [newSeat, setNewSeat] = useState<string>('02K (First Class Window)');
  const [newGate, setNewGate] = useState<string>('T3-G12');

  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 4000);
  };

  const handlePreCacheAll = async () => {
    // Save sample international flight
    await cacheFlightBooking({
      pnr: 'SQ-OB-99102',
      passengerName: 'Capt. Vikramaditya',
      flightNumber: 'SQ-422',
      airline: 'Singapore Airlines',
      flightType: 'International',
      origin: 'BOM - Mumbai Airport',
      destination: 'SIN - Singapore Changi Airport',
      departureTime: '2026-08-25 11:30 PM',
      arrivalTime: '2026-08-26 07:45 AM',
      seatNumber: '02K (First Class)',
      cabinClass: 'First Suite',
      gate: 'T3-G12',
      status: 'SCHEDULED - ON TIME',
      baggageAllowance: '40 KG Check-in + 10 KG Cabin',
      ticketAmountUSD: 680,
    });

    // Save sample tracked flight
    await cacheTrackedFlightStatus({
      flightNumber: 'SQ-422',
      airline: 'Singapore Airlines',
      route: 'Mumbai (BOM) ✈️ Singapore (SIN)',
      status: 'ON TIME - GATE T3-G12',
      altitudeFt: 38000,
      speedKnots: 510,
      estimatedArrival: '07:45 AM',
      gate: 'T3-G12',
      delayMinutes: 0,
    });

    await reloadOfflineData();
    showNotification('All Flight Bookings & Live Tracker Data pre-cached into Service Worker!');
  };

  const handleAddCustomBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    const generatedPnr = `OB-FLT-${Math.floor(10000 + Math.random() * 90000)}`;
    const newBooking: OfflineFlightBooking = {
      pnr: generatedPnr,
      passengerName: newPassengerName,
      flightNumber: newFlightNo,
      airline: newAirline,
      flightType: newType,
      origin: newOrigin,
      destination: newDestination,
      departureTime: '2026-09-01 10:00 AM',
      arrivalTime: '2026-09-01 01:30 PM',
      seatNumber: newSeat,
      cabinClass: 'Business / Premium',
      gate: newGate,
      status: 'ON TIME - SCHEDULED',
      baggageAllowance: '30 KG Check-in + 7 KG Cabin',
      ticketAmountUSD: 350,
    };

    await cacheFlightBooking(newBooking);
    await reloadOfflineData();
    setIsAddModalOpen(false);
    showNotification(`Flight Ticket ${newFlightNo} (${generatedPnr}) saved to Service Worker Cache!`);
  };

  const handleClearCache = async () => {
    await clearAllOfflineFlightCache();
    await reloadOfflineData();
    showNotification('Service Worker Flight Cache successfully cleared.');
  };

  // Filtered lists for rendering
  const filteredBookings = offlineData.bookings.filter((b) =>
    `${b.pnr} ${b.passengerName} ${b.flightNumber} ${b.airline} ${b.origin} ${b.destination}`
      .toLowerCase()
      .includes(searchFilter.toLowerCase())
  );

  const filteredTracker = offlineData.trackedFlights.filter((t) =>
    `${t.flightNumber} ${t.airline} ${t.route} ${t.status} ${t.gate}`
      .toLowerCase()
      .includes(searchFilter.toLowerCase())
  );

  const filteredSearches = offlineData.searches.filter((s) =>
    `${s.route} ${s.type} ${s.date}`.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <div id="offline-flight-cache-manager" className="space-y-6 font-mono text-slate-100">
      {/* Top Banner & Status Header */}
      <div className="bg-slate-900 border border-sky-500/30 rounded-2xl p-5 sm:p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute -top-12 -right-12 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center space-x-2 text-sky-400 font-bold text-xs uppercase tracking-wider mb-1">
              <Zap className="w-4 h-4 text-sky-400 animate-pulse" />
              <span>AIRWAYS SERVICE WORKER & OFFLINE CACHING ENGINE</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center space-x-2">
              <Plane className="w-6 h-6 text-sky-400" />
              <span>Offline Flight Booking & Tracker Cache</span>
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl font-sans">
              Access your booked international and domestic flight e-tickets, boarding passes, and previous flight tracking search results even with zero internet connectivity at sea or in flight mode.
            </p>
          </div>

          <div className="flex items-center space-x-3 shrink-0 flex-wrap gap-2">
            <button
              onClick={() => setSimulatedOffline(!simulatedOffline)}
              className={`px-4 py-2.5 rounded-xl font-extrabold text-xs flex items-center space-x-2 transition-all border ${
                simulatedOffline
                  ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 shadow-lg shadow-rose-500/20'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
              }`}
            >
              {simulatedOffline ? (
                <>
                  <WifiOff className="w-4 h-4 text-rose-400" />
                  <span>SIMULATING OFFLINE MODE</span>
                </>
              ) : (
                <>
                  <Wifi className="w-4 h-4 text-emerald-400" />
                  <span>TOGGLE OFFLINE SIMULATOR</span>
                </>
              )}
            </button>

            <button
              onClick={handlePreCacheAll}
              className="px-4 py-2.5 bg-sky-600 hover:bg-sky-500 text-white font-extrabold rounded-xl text-xs flex items-center space-x-2 shadow-lg shadow-sky-600/20 transition-all"
            >
              <Download className="w-4 h-4" />
              <span>PRE-CACHE ALL FLIGHT DATA</span>
            </button>
          </div>
        </div>
      </div>

      {/* Connectivity Status Notification Pill */}
      {notification && (
        <div className="p-4 bg-emerald-950/80 border border-emerald-500/40 text-emerald-200 rounded-xl text-xs flex items-center justify-between shadow-xl animate-fadeIn">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{notification}</span>
          </div>
          <button onClick={() => setNotification(null)} className="text-xs text-slate-400 hover:text-white">✕</button>
        </div>
      )}

      {/* System Status Indicators Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
        <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl space-y-1">
          <span className="text-[10px] text-slate-400 uppercase block font-bold">NETWORK CONNECTIVITY STATUS</span>
          <strong className={`text-sm flex items-center space-x-2 font-mono ${effectiveOnline ? 'text-emerald-400' : 'text-amber-400'}`}>
            {effectiveOnline ? (
              <>
                <Wifi className="w-4 h-4" />
                <span>ONLINE - LIVE SYNC</span>
              </>
            ) : (
              <>
                <WifiOff className="w-4 h-4" />
                <span>OFFLINE MODE ACTIVE (SERVICE WORKER)</span>
              </>
            )}
          </strong>
        </div>

        <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl space-y-1">
          <span className="text-[10px] text-slate-400 uppercase block font-bold">SERVICE WORKER CACHE STATUS</span>
          <strong className="text-sky-400 text-sm flex items-center space-x-2 font-mono">
            <HardDrive className="w-4 h-4" />
            <span>{swActive ? 'SW ACTIVE & INTERCEPTING' : 'CACHE READY (LOCALSTORAGE FALLBACK)'}</span>
          </strong>
        </div>

        <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl space-y-1">
          <span className="text-[10px] text-slate-400 uppercase block font-bold">CACHED FLIGHT RECORDS</span>
          <strong className="text-amber-400 text-sm flex items-center space-x-2 font-mono">
            <Database className="w-4 h-4" />
            <span>{offlineData.bookings.length} Tickets • {offlineData.trackedFlights.length} Tracked • {offlineData.searches.length} Searches</span>
          </strong>
        </div>
      </div>

      {/* Interactive Tabs and Search Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-2xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-2 overflow-x-auto pb-1 sm:pb-0">
            <button
              onClick={() => setActiveTab('tickets')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 ${
                activeTab === 'tickets'
                  ? 'bg-sky-500 text-slate-950 font-black shadow-lg shadow-sky-500/20'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              <Ticket className="w-4 h-4" />
              <span>CACHED FLIGHT TICKETS ({offlineData.bookings.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('tracker')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 ${
                activeTab === 'tracker'
                  ? 'bg-sky-500 text-slate-950 font-black shadow-lg shadow-sky-500/20'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              <Plane className="w-4 h-4" />
              <span>TRACKED FLIGHTS CACHE ({offlineData.trackedFlights.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('searches')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 ${
                activeTab === 'searches'
                  ? 'bg-sky-500 text-slate-950 font-black shadow-lg shadow-sky-500/20'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              <Search className="w-4 h-4" />
              <span>SEARCH HISTORY ({offlineData.searches.length})</span>
            </button>
          </div>

          <div className="flex items-center space-x-2 shrink-0">
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-3 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center space-x-1 transition-all"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>ADD TEST FLIGHT</span>
            </button>

            <button
              onClick={handleClearCache}
              className="p-2 bg-slate-950 hover:bg-rose-950 text-slate-400 hover:text-rose-400 border border-slate-800 rounded-xl transition-all"
              title="Clear Offline Cache"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Filter Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Filter offline flight bookings, flight numbers (e.g. AI-102, 6E-204, SQ-422), or routes..."
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
          />
        </div>

        {/* TAB 1: CACHED FLIGHT TICKETS */}
        {activeTab === 'tickets' && (
          <div className="space-y-3">
            {filteredBookings.length === 0 ? (
              <div className="p-8 text-center bg-slate-950 border border-slate-800 rounded-2xl text-slate-400 space-y-2">
                <Ticket className="w-8 h-8 text-slate-600 mx-auto" />
                <p className="text-xs">No cached flight tickets found matching your filter.</p>
                <button
                  onClick={handlePreCacheAll}
                  className="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-xl text-xs inline-flex items-center space-x-2"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Pre-cache Demo Flight Tickets</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredBookings.map((ticket) => (
                  <div
                    key={ticket.pnr}
                    className="p-5 bg-slate-950 border border-slate-800 hover:border-sky-500/50 rounded-2xl space-y-4 transition-all flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                        <div>
                          <span className="text-[10px] text-slate-400 block font-mono">PNR / E-TICKET NO</span>
                          <strong className="text-sm font-black text-sky-400 font-mono">{ticket.pnr}</strong>
                        </div>
                        <span className="px-2.5 py-1 bg-sky-500/20 text-sky-300 border border-sky-500/30 rounded-lg text-[10px] font-bold">
                          {ticket.flightType}
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-xs">
                        <span className="font-extrabold text-white text-sm">{ticket.passengerName}</span>
                        <span className="text-amber-400 font-bold">{ticket.airline} ({ticket.flightNumber})</span>
                      </div>

                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-2 text-xs">
                        <div className="flex items-center justify-between text-slate-300 font-bold">
                          <span>{ticket.origin}</span>
                          <ArrowRight className="w-4 h-4 text-sky-400 shrink-0 mx-2" />
                          <span>{ticket.destination}</span>
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-400 pt-1 border-t border-slate-800">
                          <div>
                            <span className="block text-slate-500">DEPARTURE</span>
                            <span className="text-white font-mono">{ticket.departureTime}</span>
                          </div>
                          <div>
                            <span className="block text-slate-500">SEAT / GATE</span>
                            <span className="text-emerald-400 font-mono">{ticket.seatNumber} • Gate {ticket.gate}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 pt-2 border-t border-slate-800">
                      <button
                        onClick={() => setSelectedTicket(ticket)}
                        className="flex-1 py-2.5 bg-sky-500 hover:bg-sky-400 text-slate-950 font-black rounded-xl text-xs transition-all flex items-center justify-center space-x-1.5"
                      >
                        <QrCode className="w-4 h-4" />
                        <span>VIEW OFFLINE BOARDING PASS</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: TRACKED FLIGHTS CACHE */}
        {activeTab === 'tracker' && (
          <div className="space-y-3">
            {filteredTracker.length === 0 ? (
              <div className="p-8 text-center bg-slate-950 border border-slate-800 rounded-2xl text-slate-400">
                No offline tracked flights found matching filter.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredTracker.map((item) => (
                  <div key={item.flightNumber} className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-3">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                      <span className="text-sm font-black text-white">{item.flightNumber}</span>
                      <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded text-[10px] font-bold">
                        {item.status}
                      </span>
                    </div>

                    <div className="text-xs space-y-1 font-mono">
                      <div className="text-slate-300 font-bold">{item.airline}</div>
                      <div className="text-slate-400 text-[11px]">{item.route}</div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[10px] font-mono bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                      <div>
                        <span className="text-slate-500 block">ALTITUDE / SPEED</span>
                        <span className="text-sky-300">{item.altitudeFt.toLocaleString()} FT • {item.speedKnots} KTS</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block">GATE / ETA</span>
                        <span className="text-emerald-400">{item.gate} • {item.estimatedArrival}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: SEARCH HISTORY */}
        {activeTab === 'searches' && (
          <div className="space-y-3">
            {filteredSearches.length === 0 ? (
              <div className="p-8 text-center bg-slate-950 border border-slate-800 rounded-2xl text-slate-400">
                No cached search queries.
              </div>
            ) : (
              <div className="space-y-3">
                {filteredSearches.map((sr) => (
                  <div key={sr.id} className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-3">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                      <div className="flex items-center space-x-2">
                        <Globe className="w-4 h-4 text-sky-400" />
                        <strong className="text-white text-xs">{sr.route}</strong>
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono">Date: {sr.date} • {sr.type}</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 text-xs">
                      {sr.flights.map((flt) => (
                        <div key={flt.flightNo} className="p-2.5 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                          <div className="flex justify-between font-bold text-sky-300">
                            <span>{flt.flightNo}</span>
                            <span className="text-amber-400">${flt.priceUSD}</span>
                          </div>
                          <div className="text-[10px] text-slate-400">{flt.airline}</div>
                          <div className="text-[10px] text-slate-300 font-mono">{flt.dep} - {flt.arr}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* MODAL 1: OFFLINE BOARDING PASS POPUP */}
      {selectedTicket && (
        <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-slate-900 border border-sky-500/50 rounded-2xl max-w-lg w-full p-6 text-white space-y-6 shadow-2xl font-mono">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <Plane className="w-5 h-5 text-sky-400" />
                <h3 className="font-extrabold text-base text-white">OFFLINE DIGITAL BOARDING PASS</h3>
              </div>
              <button
                onClick={() => setSelectedTicket(null)}
                className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white text-xs font-bold"
              >
                ✕ Close
              </button>
            </div>

            <div className="p-5 bg-gradient-to-br from-slate-950 via-slate-900 to-sky-950 rounded-2xl border border-sky-500/30 space-y-4 relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <span className="text-[10px] text-slate-400 block">PASSENGER NAME</span>
                  <strong className="text-base text-white">{selectedTicket.passengerName}</strong>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 block">FLIGHT NO</span>
                  <strong className="text-base text-sky-400">{selectedTicket.flightNumber}</strong>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 block">PNR CODE</span>
                  <span className="text-amber-400 font-bold">{selectedTicket.pnr}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">AIRLINE</span>
                  <span className="text-slate-300">{selectedTicket.airline}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">ORIGIN</span>
                  <span className="text-white font-bold">{selectedTicket.origin}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">DESTINATION</span>
                  <span className="text-white font-bold">{selectedTicket.destination}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">ASSIGNED SEAT</span>
                  <span className="text-emerald-400 font-bold">{selectedTicket.seatNumber}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">BOARDING GATE</span>
                  <span className="text-emerald-400 font-bold">Gate {selectedTicket.gate}</span>
                </div>
              </div>

              {/* QR Code Barcode Representation */}
              <div className="bg-white p-3 rounded-xl flex items-center justify-center space-x-4">
                <QrCode className="w-20 h-20 text-slate-950 shrink-0" />
                <div className="text-[10px] font-mono text-slate-900 space-y-1">
                  <div className="font-bold border-b border-slate-200 pb-1">SERVICE WORKER CACHED VERIFIED PASS</div>
                  <div>PASSENGER: {selectedTicket.passengerName}</div>
                  <div>PNR: {selectedTicket.pnr} • SEAT: {selectedTicket.seatNumber}</div>
                  <div className="text-emerald-700 font-extrabold">STATUS: VERIFIED OFFLINE VALID</div>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={() => window.print()}
                className="flex-1 py-3 bg-sky-500 hover:bg-sky-400 text-slate-950 font-black rounded-xl text-xs transition-all flex items-center justify-center space-x-2"
              >
                <Printer className="w-4 h-4" />
                <span>PRINT OFFLINE BOARDING PASS</span>
              </button>
              <button
                onClick={() => setSelectedTicket(null)}
                className="px-5 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-xl text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: ADD TEST FLIGHT BOOKING */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-slate-900 border border-emerald-500/50 rounded-2xl max-w-md w-full p-6 text-white space-y-5 font-mono">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <Plus className="w-5 h-5 text-emerald-400" />
                <h3 className="font-extrabold text-base text-white">Add Flight Ticket to SW Cache</h3>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white text-xs font-bold"
              >
                ✕ Close
              </button>
            </div>

            <form onSubmit={handleAddCustomBooking} className="space-y-3 text-xs">
              <div>
                <label className="text-[10px] text-slate-400 font-bold block mb-1">PASSENGER NAME</label>
                <input
                  type="text"
                  required
                  value={newPassengerName}
                  onChange={(e) => setNewPassengerName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] text-slate-400 font-bold block mb-1">FLIGHT NUMBER</label>
                  <input
                    type="text"
                    required
                    value={newFlightNo}
                    onChange={(e) => setNewFlightNo(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-sky-400 font-mono"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-slate-400 font-bold block mb-1">AIRLINE</label>
                  <input
                    type="text"
                    required
                    value={newAirline}
                    onChange={(e) => setNewAirline(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] text-slate-400 font-bold block mb-1">ORIGIN AIRPORT</label>
                  <input
                    type="text"
                    required
                    value={newOrigin}
                    onChange={(e) => setNewOrigin(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-slate-400 font-bold block mb-1">DESTINATION</label>
                  <input
                    type="text"
                    required
                    value={newDestination}
                    onChange={(e) => setNewDestination(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] text-slate-400 font-bold block mb-1">SEAT NUMBER</label>
                  <input
                    type="text"
                    required
                    value={newSeat}
                    onChange={(e) => setNewSeat(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-emerald-400"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-slate-400 font-bold block mb-1">GATE NO</label>
                  <input
                    type="text"
                    required
                    value={newGate}
                    onChange={(e) => setNewGate(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl text-xs transition-all shadow-lg shadow-emerald-500/20"
              >
                SAVE TICKET TO SERVICE WORKER OFFLINE CACHE
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
