import React, { useState } from 'react';
import {
  Plane,
  PlaneTakeoff,
  PlaneLanding,
  Search,
  Calendar,
  User,
  Users,
  MapPin,
  Ticket,
  QrCode,
  CheckCircle2,
  RefreshCw,
  Download,
  ArrowRight,
  Zap,
  Globe,
  Luggage,
  ShieldCheck,
  Building2,
  CreditCard,
  Printer,
  Sparkles,
  Info
} from 'lucide-react';
import { ALL_INDIAN_AIRPORTS, INTERNATIONAL_AIRPORTS } from './AirwaysBookingAndFlightTracker';
import { cacheFlightBooking, useOfflineFlightStatus } from '../utils/offlineFlightCache';

import { CurrencySelector, useCurrency } from '../utils/currencyUtils';

interface AirwaysPassengerPortalProps {
  initialScope?: 'Domestic' | 'International';
}

export const AirwaysPassengerPortal: React.FC<AirwaysPassengerPortalProps> = ({ initialScope }) => {
  const { reloadOfflineData } = useOfflineFlightStatus();
  const { currency, formatPrice } = useCurrency();

  // Mode: Domestic vs International
  const [routeScope, setRouteScope] = useState<'Domestic' | 'International'>(initialScope || 'Domestic');
  const [tripType, setTripType] = useState<'One Way' | 'Round Trip'>('One Way');

  // Form State
  const [originCode, setOriginCode] = useState<string>('BOM');
  const [destCode, setDestCode] = useState<string>('DEL');
  const [departureDate, setDepartureDate] = useState<string>('2026-08-20');
  const [returnDate, setReturnDate] = useState<string>('2026-08-28');
  const [passengersCount, setPassengersCount] = useState<number>(1);
  const [cabinClass, setCabinClass] = useState<'Economy' | 'Premium Economy' | 'Business Class' | 'First Class'>('Economy');
  const [passengerName, setPassengerName] = useState<string>('Capt. Rajesh Kumar');
  const [passportNumber, setPassportNumber] = useState<string>('Z8921043');

  // Flight Search Results State
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [availableFlights, setAvailableFlights] = useState<any[]>([]);
  const [selectedSeat, setSelectedSeat] = useState<string>('12A (Window)');

  // Issued Ticket Modal State
  const [confirmedBooking, setConfirmedBooking] = useState<any | null>(null);

  const availableOrigins = ALL_INDIAN_AIRPORTS;
  const availableDests = routeScope === 'Domestic' ? ALL_INDIAN_AIRPORTS : INTERNATIONAL_AIRPORTS;

  const handleSearchFlights = () => {
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      const originObj = ALL_INDIAN_AIRPORTS.find((a) => a.code === originCode) || ALL_INDIAN_AIRPORTS[0];
      const destObj = (routeScope === 'Domestic' ? ALL_INDIAN_AIRPORTS : INTERNATIONAL_AIRPORTS).find((a) => a.code === destCode) || (routeScope === 'Domestic' ? ALL_INDIAN_AIRPORTS[1] : INTERNATIONAL_AIRPORTS[0]);

      const list = [
        {
          id: `FLT-101`,
          flightNo: `${routeScope === 'Domestic' ? '6E' : 'AI'}-${Math.floor(200 + Math.random() * 700)}`,
          airline: routeScope === 'Domestic' ? 'IndiGo Airways' : 'Air India Express International',
          aircraft: 'Airbus A321neo',
          departureTime: '07:15 AM',
          arrivalTime: '09:45 AM',
          duration: '2h 30m',
          origin: `${originObj.code} - ${originObj.city}`,
          destination: `${destObj.code} - ${destObj.city}`,
          priceINR: routeScope === 'Domestic' ? 4950 : 21400,
          seatsLeft: 8,
          mealIncluded: true,
          baggageCheckinKg: routeScope === 'Domestic' ? 15 : 30
        },
        {
          id: `FLT-102`,
          flightNo: `${routeScope === 'Domestic' ? 'UK' : 'EK'}-${Math.floor(200 + Math.random() * 700)}`,
          airline: routeScope === 'Domestic' ? 'Vistara Airlines' : 'Emirates Airways',
          aircraft: routeScope === 'Domestic' ? 'Boeing 737 MAX' : 'Boeing 777-300ER',
          departureTime: '01:30 PM',
          arrivalTime: '04:00 PM',
          duration: '2h 30m',
          origin: `${originObj.code} - ${originObj.city}`,
          destination: `${destObj.code} - ${destObj.city}`,
          priceINR: routeScope === 'Domestic' ? 6800 : 34500,
          seatsLeft: 4,
          mealIncluded: true,
          baggageCheckinKg: routeScope === 'Domestic' ? 20 : 35
        },
        {
          id: `FLT-103`,
          flightNo: `${routeScope === 'Domestic' ? 'QP' : 'SQ'}-${Math.floor(200 + Math.random() * 700)}`,
          airline: routeScope === 'Domestic' ? 'Akasa Air' : 'Singapore Airlines',
          aircraft: 'Airbus A350-900',
          departureTime: '08:45 PM',
          arrivalTime: '11:15 PM',
          duration: '2h 30m',
          origin: `${originObj.code} - ${originObj.city}`,
          destination: `${destObj.code} - ${destObj.city}`,
          priceINR: routeScope === 'Domestic' ? 4200 : 39800,
          seatsLeft: 11,
          mealIncluded: false,
          baggageCheckinKg: routeScope === 'Domestic' ? 15 : 30
        }
      ];

      setAvailableFlights(list);
    }, 600);
  };

  const handleBookFlightTicket = async (flight: any) => {
    const pnrGenerated = `AIRPASS-${routeScope.substring(0, 3).toUpperCase()}-${Math.floor(100000 + Math.random() * 900000)}`;
    const seatChoice = selectedSeat || '14F (Aisle)';

    const bookingData = {
      pnr: pnrGenerated,
      passengerName,
      passportNumber: routeScope === 'International' ? passportNumber : 'N/A (Domestic Govt ID Verified)',
      flightNumber: flight.flightNo,
      airline: flight.airline,
      aircraft: flight.aircraft,
      flightScope: routeScope,
      tripType,
      origin: flight.origin,
      destination: flight.destination,
      departureDate,
      departureTime: flight.departureTime,
      arrivalTime: flight.arrivalTime,
      seatNumber: `${seatChoice} [${cabinClass}]`,
      cabinClass,
      passengersCount,
      baggageAllowance: `${flight.baggageCheckinKg} KG Check-in + 7 KG Cabin Hand Luggage`,
      status: 'CONFIRMED - BOARDING PASS ISSUED',
      priceINR: flight.priceINR * passengersCount,
      priceUSD: Math.round((flight.priceINR * passengersCount) / 83),
      issuedAt: new Date().toISOString()
    };

    await cacheFlightBooking(bookingData);
    await reloadOfflineData();
    setConfirmedBooking(bookingData);
  };

  return (
    <div id="airways-passenger-portal" className="space-y-6 font-mono text-slate-100">
      {/* Header */}
      <div className="bg-slate-900 border border-sky-500/40 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center space-x-2 text-sky-400 font-bold text-xs uppercase tracking-widest mb-1">
              <Zap className="w-4 h-4 text-sky-400 animate-pulse" />
              <span>AIRWAYS PASSENGER TICKET PORTAL (SEPARATE SERVICE)</span>
            </div>
            <h2 className="text-2xl font-black text-white tracking-tight flex items-center space-x-2">
              <PlaneTakeoff className="w-7 h-7 text-sky-400" />
              <span>Domestic & International Airways Flight Booking</span>
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl font-sans">
              Instant passenger flight reservation, seat assignment, baggage clearance, and SOLAS/IATA compliant electronic boarding pass issuance for Indian domestic & global international flights.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <CurrencySelector />
            <div className="flex items-center space-x-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
              <button
                onClick={() => {
                  setRouteScope('Domestic');
                  setDestCode('DEL');
                }}
                className={`px-4 py-2 rounded-lg text-xs font-black transition-all ${
                  routeScope === 'Domestic'
                    ? 'bg-sky-500 text-slate-950 shadow-lg'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                🇮🇳 DOMESTIC INDIA
              </button>
              <button
                onClick={() => {
                  setRouteScope('International');
                  setDestCode('MLE');
                }}
                className={`px-4 py-2 rounded-lg text-xs font-black transition-all ${
                  routeScope === 'International'
                    ? 'bg-sky-500 text-slate-950 shadow-lg'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                ✈️ INTERNATIONAL GLOBAL
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Form Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="text-xs font-bold text-slate-300 flex items-center space-x-2">
            <Ticket className="w-4 h-4 text-sky-400" />
            <span>Search & Reserve {routeScope} Airways Seats</span>
          </div>

          <div className="flex items-center space-x-3 text-xs">
            <label className="flex items-center space-x-1 cursor-pointer">
              <input
                type="radio"
                name="triptype_pass"
                checked={tripType === 'One Way'}
                onChange={() => setTripType('One Way')}
                className="accent-sky-500"
              />
              <span>One Way</span>
            </label>
            <label className="flex items-center space-x-1 cursor-pointer">
              <input
                type="radio"
                name="triptype_pass"
                checked={tripType === 'Round Trip'}
                onChange={() => setTripType('Round Trip')}
                className="accent-sky-500"
              />
              <span>Round Trip</span>
            </label>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div>
            <label className="text-slate-400 block mb-1 text-[10px] font-bold">FROM (ORIGIN AIRPORT)</label>
            <select
              value={originCode}
              onChange={(e) => setOriginCode(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:border-sky-500"
            >
              {availableOrigins.map((ap) => (
                <option key={ap.code} value={ap.code}>
                  {ap.code} - {ap.city} ({ap.name})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-slate-400 block mb-1 text-[10px] font-bold">TO (DESTINATION AIRPORT)</label>
            <select
              value={destCode}
              onChange={(e) => setDestCode(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:border-sky-500"
            >
              {availableDests.map((ap) => (
                <option key={ap.code} value={ap.code}>
                  {ap.code} - {ap.city} ({ap.name})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-slate-400 block mb-1 text-[10px] font-bold">DEPARTURE DATE</label>
            <input
              type="date"
              value={departureDate}
              onChange={(e) => setDepartureDate(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:border-sky-500"
            />
          </div>

          {tripType === 'Round Trip' ? (
            <div>
              <label className="text-slate-400 block mb-1 text-[10px] font-bold">RETURN DATE</label>
              <input
                type="date"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:border-sky-500"
              />
            </div>
          ) : (
            <div>
              <label className="text-slate-400 block mb-1 text-[10px] font-bold">CABIN CLASS</label>
              <select
                value={cabinClass}
                onChange={(e) => setCabinClass(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:border-sky-500"
              >
                <option value="Economy">Economy Class</option>
                <option value="Premium Economy">Premium Economy</option>
                <option value="Business Class">Business Class</option>
                <option value="First Class">First Class</option>
              </select>
            </div>
          )}

          <div>
            <label className="text-slate-400 block mb-1 text-[10px] font-bold">PASSENGER FULL NAME</label>
            <input
              type="text"
              value={passengerName}
              onChange={(e) => setPassengerName(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:border-sky-500"
            />
          </div>

          {routeScope === 'International' && (
            <div>
              <label className="text-slate-400 block mb-1 text-[10px] font-bold">PASSPORT NUMBER</label>
              <input
                type="text"
                value={passportNumber}
                onChange={(e) => setPassportNumber(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-amber-300 focus:border-sky-500"
              />
            </div>
          )}

          <div>
            <label className="text-slate-400 block mb-1 text-[10px] font-bold">PREFERRED SEAT SELECTION</label>
            <select
              value={selectedSeat}
              onChange={(e) => setSelectedSeat(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:border-sky-500"
            >
              <option value="12A (Window)">12A (Window Seat)</option>
              <option value="12B (Middle)">12B (Middle Seat)</option>
              <option value="12C (Aisle)">12C (Aisle Seat)</option>
              <option value="03F (Front Business)">03F (Executive Front)</option>
            </select>
          </div>

          <div>
            <label className="text-slate-400 block mb-1 text-[10px] font-bold">PASSENGERS COUNT</label>
            <input
              type="number"
              min="1"
              max="9"
              value={passengersCount}
              onChange={(e) => setPassengersCount(parseInt(e.target.value) || 1)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:border-sky-500"
            />
          </div>
        </div>

        <button
          onClick={handleSearchFlights}
          disabled={isSearching}
          className="w-full py-3 bg-sky-500 hover:bg-sky-400 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center space-x-2 shadow-lg shadow-sky-500/20 transition-all"
        >
          {isSearching ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
          <span>FIND & BOOK {routeScope.toUpperCase()} AIRWAYS PASSENGER FLIGHTS</span>
        </button>

        {/* Flight Search Results */}
        {availableFlights.length > 0 && (
          <div className="space-y-4 pt-4 border-t border-slate-800">
            <h3 className="text-xs font-black text-white uppercase tracking-wider flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-sky-400" />
              <span>Available {routeScope} Airways Flights</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {availableFlights.map((flt) => (
                <div
                  key={flt.id}
                  className="p-5 bg-slate-950 border border-slate-800 hover:border-sky-500/50 rounded-2xl space-y-4 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                      <span className="text-xs font-black text-sky-400">{flt.flightNo}</span>
                      <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                        {flt.seatsLeft} Seats
                      </span>
                    </div>

                    <div className="text-sm font-extrabold text-white">{flt.airline}</div>
                    <div className="text-[10px] text-slate-400 font-mono">Aircraft: {flt.aircraft}</div>

                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-2 text-xs">
                      <div className="flex items-center justify-between text-slate-300 font-bold">
                        <span>{flt.departureTime}</span>
                        <ArrowRight className="w-4 h-4 text-sky-400 shrink-0 mx-2" />
                        <span>{flt.arrivalTime}</span>
                      </div>
                      <div className="text-[10px] text-slate-400 text-center font-mono">
                        {flt.origin} ✈️ {flt.destination}
                      </div>
                    </div>

                    <div className="text-xs text-slate-300 font-mono space-y-1 bg-slate-900/60 p-2 rounded-lg">
                      <div>🧳 Baggage: {flt.baggageCheckinKg} KG Check-in</div>
                      <div>🍱 Inflight Meal: {flt.mealIncluded ? 'Included' : 'Buy-on-board'}</div>
                    </div>

                    <div className="text-lg font-black text-emerald-400">
                      ₹{flt.priceINR.toLocaleString()} <span className="text-xs text-slate-400 font-normal">/ passenger</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleBookFlightTicket(flt)}
                    className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl text-xs transition-all flex items-center justify-center space-x-1.5 shadow-lg shadow-emerald-500/20"
                  >
                    <Ticket className="w-4 h-4" />
                    <span>BOOK TICKET & ISSUE PASS</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* CONFIRMED PASSENGER BOARDING PASS MODAL */}
      {confirmedBooking && (
        <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
          <div className="bg-slate-900 border border-sky-500/50 rounded-2xl max-w-2xl w-full p-6 text-white space-y-6 shadow-2xl my-auto font-mono">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2 text-emerald-400 font-black text-sm">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span>OFFICIAL AIRWAYS E-BOARDING PASS ISSUED</span>
              </div>
              <button
                onClick={() => setConfirmedBooking(null)}
                className="text-slate-400 hover:text-white text-xs font-bold bg-slate-800 px-3 py-1.5 rounded-lg"
              >
                ✕ Close
              </button>
            </div>

            <div className="bg-white text-slate-900 p-6 rounded-2xl border-4 border-slate-900 space-y-4 shadow-2xl font-sans">
              <div className="flex justify-between items-start border-b-2 border-slate-900 pb-3">
                <div>
                  <span className="text-sky-800 font-black text-[10px] uppercase tracking-widest block">
                    {confirmedBooking.flightScope.toUpperCase()} AIRPASS E-TICKET
                  </span>
                  <h3 className="text-xl font-black text-slate-950 uppercase">{confirmedBooking.airline}</h3>
                  <p className="text-xs font-bold text-slate-600">{confirmedBooking.aircraft}</p>
                </div>
                <div className="text-right font-mono text-xs">
                  <div className="font-extrabold text-sky-900">PNR: {confirmedBooking.pnr}</div>
                  <div className="text-emerald-700 font-bold">STATUS: CONFIRMED</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs font-mono bg-slate-100 p-3 rounded-xl">
                <div>
                  <span className="text-[10px] text-slate-500 block">PASSENGER NAME</span>
                  <strong className="text-slate-950">{confirmedBooking.passengerName}</strong>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">PASSPORT / ID</span>
                  <strong className="text-slate-950">{confirmedBooking.passportNumber}</strong>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">FLIGHT NUMBER</span>
                  <strong className="text-sky-900 font-extrabold">{confirmedBooking.flightNumber}</strong>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">ASSIGNED SEAT</span>
                  <strong className="text-emerald-800 font-extrabold">{confirmedBooking.seatNumber}</strong>
                </div>
              </div>

              <div className="flex justify-between items-center bg-sky-50 p-3 rounded-xl text-xs font-mono border border-sky-200">
                <div>
                  <span className="text-[10px] text-sky-800 font-bold block">ROUTE</span>
                  <strong>{confirmedBooking.origin} ✈️ {confirmedBooking.destination}</strong>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-sky-800 font-bold block">DEPARTURE TIME</span>
                  <strong>{confirmedBooking.departureDate} @ {confirmedBooking.departureTime}</strong>
                </div>
              </div>

              <div className="flex justify-between items-center pt-2 border-t border-slate-300">
                <div className="flex items-center space-x-2 text-xs font-mono text-slate-600">
                  <QrCode className="w-10 h-10 text-slate-900" />
                  <div>
                    <div className="text-[10px] font-bold text-slate-900">IATA BARCODE VERIFIED</div>
                    <div className="text-[9px] text-slate-500">Service Worker Offline Cached</div>
                  </div>
                </div>

                <div className="text-right font-mono">
                  <div className="text-[10px] text-slate-500">TOTAL FARE</div>
                  <div className="text-base font-black text-slate-950">₹{confirmedBooking.priceINR.toLocaleString()}</div>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 bg-sky-500 hover:bg-sky-400 text-slate-950 font-black rounded-xl text-xs flex items-center space-x-2"
              >
                <Printer className="w-4 h-4" />
                <span>PRINT BOARDING PASS</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
