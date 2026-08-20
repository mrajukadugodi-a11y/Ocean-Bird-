import React, { useState } from 'react';
import {
  Ship,
  Compass,
  Anchor,
  Users,
  Calendar,
  Search,
  Ticket,
  CheckCircle2,
  RefreshCw,
  QrCode,
  Printer,
  Sparkles,
  Award,
  Palmtree,
  Waves,
  MapPin,
  LifeBuoy,
  ShieldCheck,
  Zap,
  Coffee,
  Bed,
  Utensils
} from 'lucide-react';
import { cacheFlightBooking, useOfflineFlightStatus } from '../utils/offlineFlightCache';

import { CurrencySelector, useCurrency } from '../utils/currencyUtils';

interface CruisePassengerPortalProps {
  initialScope?: 'Domestic Coastal India' | 'International Oceanic';
}

export const CruisePassengerPortal: React.FC<CruisePassengerPortalProps> = ({ initialScope }) => {
  const { reloadOfflineData } = useOfflineFlightStatus();
  const { currency, formatPrice } = useCurrency();

  // Mode: Domestic vs International Cruise
  const [cruiseScope, setCruiseScope] = useState<'Domestic Coastal India' | 'International Oceanic'>(initialScope || 'Domestic Coastal India');

  // Form State
  const [selectedRoute, setSelectedRoute] = useState<string>('MUM-GOA-LAK');
  const [departureDate, setDepartureDate] = useState<string>('2026-09-10');
  const [cruiseDuration, setCruiseDuration] = useState<number>(4);
  const [stateroomCategory, setStateroomCategory] = useState<'Interior Standard' | 'Ocean View Cabin' | 'Balcony Deluxe Suite' | 'Royal Commodore Suite'>('Ocean View Cabin');
  const [deckPreference, setDeckPreference] = useState<string>('Deck 7 (Panorama Deck)');
  const [passengerName, setPassengerName] = useState<string>('Admiral Ramesh Verma');
  const [passengerCount, setPassengerCount] = useState<number>(2);
  const [passportNumber, setPassportNumber] = useState<string>('K7651092');

  // Search Results & Modal State
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [cruiseList, setCruiseList] = useState<any[]>([]);
  const [confirmedPass, setConfirmedPass] = useState<any | null>(null);

  const DOMESTIC_CRUISE_ROUTES = [
    { code: 'MUM-GOA-LAK', name: 'Mumbai ➔ Goa ➔ Lakshadweep Coral Cruise', nights: 4, portFrom: 'Mumbai International Cruise Terminal (Green Gate)', portTo: 'Kavaratti Island Marine Berth' },
    { code: 'CHE-ANC-BLA', name: 'Chennai ➔ Visakhapatnam ➔ Andaman Islands', nights: 5, portFrom: 'Chennai Port Trust Cruise Berth', portTo: 'Port Blair Haddo Jetty' },
    { code: 'KOC-MIN-LAK', name: 'Kochi ➔ Minicoy Island ➔ Kadmat Atoll', nights: 3, portFrom: 'Kochin Willingdon Island Cruise Terminal', portTo: 'Minicoy Atoll Marine Terminal' }
  ];

  const INTERNATIONAL_CRUISE_ROUTES = [
    { code: 'MUM-MLE-COL', name: 'Mumbai ➔ Male (Maldives) ➔ Colombo (Sri Lanka)', nights: 7, portFrom: 'Mumbai International Terminal', portTo: 'Male Atoll Port' },
    { code: 'CHE-SIN-PHU', name: 'Chennai ➔ Phuket (Thailand) ➔ Singapore Ocean Voyage', nights: 8, portFrom: 'Chennai Port', portTo: 'Marina Bay Cruise Centre Singapore' },
    { code: 'MUM-DXB-MUS', name: 'Mumbai ➔ Muscat (Oman) ➔ Dubai Grand Arabian Cruise', nights: 6, portFrom: 'Mumbai Cruise Terminal', portTo: 'Mina Rashid Dubai' },
    { code: 'BAR-ROM-ATH', name: 'Barcelona (Spain) ➔ Rome (Italy) ➔ Athens Mediterranean Cruise', nights: 10, portFrom: 'Port of Barcelona', portTo: 'Piraeus Port Athens' },
    { code: 'MIA-NAS-COZ', name: 'Miami (USA) ➔ Nassau (Bahamas) ➔ Cozumel Caribbean Voyage', nights: 7, portFrom: 'PortMiami Florida', portTo: 'Cozumel Cruise Terminal' },
    { code: 'SOU-NYC-ATL', name: 'Southampton (UK) ➔ New York Transatlantic Crossing', nights: 8, portFrom: 'Port of Southampton', portTo: 'Manhattan Cruise Terminal NYC' }
  ];

  const activeRoutes = cruiseScope === 'Domestic Coastal India' ? DOMESTIC_CRUISE_ROUTES : INTERNATIONAL_CRUISE_ROUTES;

  const handleSearchCruises = () => {
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      const routeObj = activeRoutes.find((r) => r.code === selectedRoute) || activeRoutes[0];

      const ships = [
        {
          id: 'CRS-01',
          shipName: cruiseScope === 'Domestic Coastal India' ? 'Cordelia Empress Voyager' : 'OceanBird Royal International Liner',
          shipCode: 'IMO-9482109',
          grossTonnage: '75,200 GT',
          decks: 12,
          route: routeObj.name,
          portFrom: routeObj.portFrom,
          portTo: routeObj.portTo,
          durationNights: routeObj.nights,
          departureDate,
          pricePerPersonINR: cruiseScope === 'Domestic Coastal India' ? 28500 : 84000,
          cabinsRemaining: 6,
          inclusions: ['All-Inclusive Buffet Dining', 'Ocean Theatre Shows', 'Casino & Deck Pool Access', 'SOLAS Marine Insurance']
        },
        {
          id: 'CRS-02',
          shipName: cruiseScope === 'Domestic Coastal India' ? 'Costa Serena Luxury Liner' : 'Resorts World One Oceanic',
          shipCode: 'IMO-9302194',
          grossTonnage: '114,000 GT',
          decks: 14,
          route: routeObj.name,
          portFrom: routeObj.portFrom,
          portTo: routeObj.portTo,
          durationNights: routeObj.nights,
          departureDate,
          pricePerPersonINR: cruiseScope === 'Domestic Coastal India' ? 36000 : 102000,
          cabinsRemaining: 3,
          inclusions: ['Gourmet Multi-Cuisine', 'Private Balcony Access', 'Infinity Pool & Spa', 'Island Excursion Shuttle']
        }
      ];

      setCruiseList(ships);
    }, 600);
  };

  const handleBookCruiseTicket = async (cruise: any) => {
    const bookingCode = `CRUISE-${cruiseScope === 'Domestic Coastal India' ? 'DOM' : 'INT'}-${Math.floor(100000 + Math.random() * 900000)}`;

    const bookingData = {
      pnr: bookingCode,
      bookingCode,
      passengerName,
      passportNumber: cruiseScope === 'International Oceanic' ? passportNumber : 'Govt ID Verified (Domestic Coastal Pass)',
      shipName: cruise.shipName,
      shipCode: cruise.shipCode,
      cruiseScope,
      route: cruise.route,
      portFrom: cruise.portFrom,
      portTo: cruise.portTo,
      departureDate: cruise.departureDate,
      nights: cruise.durationNights,
      stateroomCategory,
      deckPreference,
      cabinNumber: `Cabin #${Math.floor(700 + Math.random() * 200)}`,
      passengerCount,
      status: 'CONFIRMED - CRUISE BOARDING PASS ISSUED',
      priceINR: cruise.pricePerPersonINR * passengerCount,
      priceUSD: Math.round((cruise.pricePerPersonINR * passengerCount) / 83),
      issuedAt: new Date().toISOString()
    };

    await cacheFlightBooking(bookingData);
    await reloadOfflineData();
    setConfirmedPass(bookingData);
  };

  return (
    <div id="cruise-passenger-portal" className="space-y-6 font-mono text-slate-100">
      {/* Header */}
      <div className="bg-slate-900 border border-teal-500/40 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center space-x-2 text-teal-400 font-bold text-xs uppercase tracking-widest mb-1">
              <Zap className="w-4 h-4 text-teal-400 animate-pulse" />
              <span>CRUISE SHIP PASSENGER TICKET PORTAL (SEPARATE SERVICE)</span>
            </div>
            <h2 className="text-2xl font-black text-white tracking-tight flex items-center space-x-2">
              <Ship className="w-7 h-7 text-teal-400" />
              <span>Domestic & International Cruise Passenger Booking</span>
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl font-sans">
              Book luxury cruise ship passenger tickets for coastal Indian islands and global oceanic voyages, select stateroom cabins, and issue digital boarding passes.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <CurrencySelector />
            <div className="flex items-center space-x-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
              <button
                onClick={() => {
                  setCruiseScope('Domestic Coastal India');
                  setSelectedRoute('MUM-GOA-LAK');
                }}
                className={`px-4 py-2 rounded-lg text-xs font-black transition-all ${
                  cruiseScope === 'Domestic Coastal India'
                    ? 'bg-teal-500 text-slate-950 shadow-lg'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                🇮🇳 DOMESTIC COASTAL
              </button>
              <button
                onClick={() => {
                  setCruiseScope('International Oceanic');
                  setSelectedRoute('MUM-MLE-COL');
                }}
                className={`px-4 py-2 rounded-lg text-xs font-black transition-all ${
                  cruiseScope === 'International Oceanic'
                    ? 'bg-teal-500 text-slate-950 shadow-lg'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                🚢 INTERNATIONAL OCEANIC
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Form Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="text-xs font-bold text-slate-300 flex items-center space-x-2">
            <Compass className="w-4 h-4 text-teal-400" />
            <span>Search & Reserve {cruiseScope} Cruise Voyage</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="sm:col-span-2">
            <label className="text-slate-400 block mb-1 text-[10px] font-bold">SELECT CRUISE ITINERARY ROUTE</label>
            <select
              value={selectedRoute}
              onChange={(e) => setSelectedRoute(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:border-teal-500"
            >
              {activeRoutes.map((r) => (
                <option key={r.code} value={r.code}>
                  {r.name} ({r.nights} Nights Voyage)
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-slate-400 block mb-1 text-[10px] font-bold">EMBARKATION DATE</label>
            <input
              type="date"
              value={departureDate}
              onChange={(e) => setDepartureDate(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:border-teal-500"
            />
          </div>

          <div>
            <label className="text-slate-400 block mb-1 text-[10px] font-bold">STATEROOM CABIN CATEGORY</label>
            <select
              value={stateroomCategory}
              onChange={(e) => setStateroomCategory(e.target.value as any)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-teal-300 focus:border-teal-500"
            >
              <option value="Interior Standard">Interior Standard Cabin</option>
              <option value="Ocean View Cabin">Ocean View Window Cabin</option>
              <option value="Balcony Deluxe Suite">Balcony Deluxe Suite</option>
              <option value="Royal Commodore Suite">Royal Commodore Penthouse</option>
            </select>
          </div>

          <div>
            <label className="text-slate-400 block mb-1 text-[10px] font-bold">PRIMARY PASSENGER NAME</label>
            <input
              type="text"
              value={passengerName}
              onChange={(e) => setPassengerName(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:border-teal-500"
            />
          </div>

          {cruiseScope === 'International Oceanic' && (
            <div>
              <label className="text-slate-400 block mb-1 text-[10px] font-bold">PASSPORT NUMBER</label>
              <input
                type="text"
                value={passportNumber}
                onChange={(e) => setPassportNumber(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-amber-300 focus:border-teal-500"
              />
            </div>
          )}

          <div>
            <label className="text-slate-400 block mb-1 text-[10px] font-bold">DECK PREFERENCE</label>
            <select
              value={deckPreference}
              onChange={(e) => setDeckPreference(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:border-teal-500"
            >
              <option value="Deck 5 (Coral Promenade)">Deck 5 (Coral Promenade)</option>
              <option value="Deck 7 (Panorama Deck)">Deck 7 (Panorama Deck)</option>
              <option value="Deck 10 (Executive Commodore)">Deck 10 (Executive Commodore)</option>
            </select>
          </div>

          <div>
            <label className="text-slate-400 block mb-1 text-[10px] font-bold">PASSENGERS COUNT</label>
            <input
              type="number"
              min="1"
              value={passengerCount}
              onChange={(e) => setPassengerCount(parseInt(e.target.value) || 1)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:border-teal-500"
            />
          </div>
        </div>

        <button
          onClick={handleSearchCruises}
          disabled={isSearching}
          className="w-full py-3 bg-teal-500 hover:bg-teal-400 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center space-x-2 shadow-lg shadow-teal-500/20 transition-all"
        >
          {isSearching ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
          <span>FIND & BOOK {cruiseScope.toUpperCase()} CRUISE VOYAGES</span>
        </button>

        {/* Cruise Results */}
        {cruiseList.length > 0 && (
          <div className="space-y-4 pt-4 border-t border-slate-800">
            <h3 className="text-xs font-black text-white uppercase tracking-wider flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-teal-400" />
              <span>Available Cruise Ships for Selected Itinerary</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {cruiseList.map((crs) => (
                <div
                  key={crs.id}
                  className="p-5 bg-slate-950 border border-slate-800 hover:border-teal-500/50 rounded-2xl space-y-4 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                      <span className="text-xs font-black text-teal-400">{crs.shipName}</span>
                      <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                        {crs.cabinsRemaining} Cabins Left
                      </span>
                    </div>

                    <div className="text-xs text-slate-300 font-bold">{crs.route}</div>
                    <div className="text-[10px] text-slate-400 font-mono">
                      Ship Register: {crs.shipCode} | Tonnage: {crs.grossTonnage}
                    </div>

                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-2 text-xs">
                      <div className="text-[10px] text-slate-400">
                        <strong>EMBARKATION PORT:</strong> {crs.portFrom}
                      </div>
                      <div className="text-[10px] text-slate-400">
                        <strong>DISEMBARKATION PORT:</strong> {crs.portTo}
                      </div>
                    </div>

                    <div className="text-xs text-slate-300 font-mono space-y-1 bg-slate-900/60 p-2 rounded-lg">
                      <div className="font-bold text-teal-300 mb-1">VOYAGE INCLUSIONS:</div>
                      {crs.inclusions.map((inc: string, i: number) => (
                        <div key={i}>✓ {inc}</div>
                      ))}
                    </div>

                    <div className="text-lg font-black text-emerald-400">
                      ₹{crs.pricePerPersonINR.toLocaleString()} <span className="text-xs text-slate-400 font-normal">/ guest</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleBookCruiseTicket(crs)}
                    className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl text-xs transition-all flex items-center justify-center space-x-1.5 shadow-lg shadow-emerald-500/20"
                  >
                    <Ticket className="w-4 h-4" />
                    <span>BOOK CRUISE TICKET & ISSUE E-PASS</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* CONFIRMED CRUISE E-PASS MODAL */}
      {confirmedPass && (
        <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
          <div className="bg-slate-900 border border-teal-500/50 rounded-2xl max-w-2xl w-full p-6 text-white space-y-6 shadow-2xl my-auto font-mono">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2 text-emerald-400 font-black text-sm">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span>OFFICIAL CRUISE VOYAGE E-BOARDING PASS ISSUED</span>
              </div>
              <button
                onClick={() => setConfirmedPass(null)}
                className="text-slate-400 hover:text-white text-xs font-bold bg-slate-800 px-3 py-1.5 rounded-lg"
              >
                ✕ Close
              </button>
            </div>

            <div className="bg-white text-slate-900 p-6 rounded-2xl border-4 border-slate-900 space-y-4 shadow-2xl font-sans">
              <div className="flex justify-between items-start border-b-2 border-slate-900 pb-3">
                <div>
                  <span className="text-teal-800 font-black text-[10px] uppercase tracking-widest block">
                    {confirmedPass.cruiseScope.toUpperCase()} CRUISE PASS
                  </span>
                  <h3 className="text-xl font-black text-slate-950 uppercase">{confirmedPass.shipName}</h3>
                  <p className="text-xs font-bold text-slate-600">{confirmedPass.route}</p>
                </div>
                <div className="text-right font-mono text-xs">
                  <div className="font-extrabold text-teal-900">BOOKING: {confirmedPass.bookingCode}</div>
                  <div className="text-emerald-700 font-bold">STATUS: BOARDING PERMIT READY</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs font-mono bg-slate-100 p-3 rounded-xl">
                <div>
                  <span className="text-[10px] text-slate-500 block">PASSENGER NAME</span>
                  <strong className="text-slate-950">{confirmedPass.passengerName}</strong>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">PASSPORT / ID</span>
                  <strong className="text-slate-950">{confirmedPass.passportNumber}</strong>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">CABIN & DECK</span>
                  <strong className="text-teal-900 font-extrabold">{confirmedPass.cabinNumber} ({confirmedPass.deckPreference})</strong>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">STATEROOM CLASS</span>
                  <strong className="text-emerald-800 font-extrabold">{confirmedPass.stateroomCategory}</strong>
                </div>
              </div>

              <div className="flex justify-between items-center bg-teal-50 p-3 rounded-xl text-xs font-mono border border-teal-200">
                <div>
                  <span className="text-[10px] text-teal-800 font-bold block">EMBARKATION PORT</span>
                  <strong>{confirmedPass.portFrom}</strong>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-teal-800 font-bold block">DEPARTURE DATE</span>
                  <strong>{confirmedPass.departureDate} ({confirmedPass.nights} Nights)</strong>
                </div>
              </div>

              <div className="flex justify-between items-center pt-2 border-t border-slate-300">
                <div className="flex items-center space-x-2 text-xs font-mono text-slate-600">
                  <QrCode className="w-10 h-10 text-slate-900" />
                  <div>
                    <div className="text-[10px] font-bold text-slate-900">SOLAS IMMIGRATION BARCODE</div>
                    <div className="text-[9px] text-slate-500">Service Worker Manifest Verified</div>
                  </div>
                </div>

                <div className="text-right font-mono">
                  <div className="text-[10px] text-slate-500">TOTAL CRUISE FARE</div>
                  <div className="text-base font-black text-slate-950">₹{confirmedPass.priceINR.toLocaleString()}</div>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 bg-teal-500 hover:bg-teal-400 text-slate-950 font-black rounded-xl text-xs flex items-center space-x-2"
              >
                <Printer className="w-4 h-4" />
                <span>PRINT CRUISE BOARDING PASS</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
