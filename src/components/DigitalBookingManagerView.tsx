import React, { useState, useEffect } from 'react';
import {
  Ticket,
  Plane,
  Ship,
  Box,
  Container,
  CheckCircle2,
  QrCode,
  Download,
  Printer,
  CreditCard,
  Wallet,
  ShieldCheck,
  Globe,
  Clock,
  User,
  FileText,
  Calendar,
  DollarSign,
  ArrowRight,
  AlertTriangle,
  RefreshCw,
  Zap,
  Sparkles,
  Plus
} from 'lucide-react';
import { CurrencySelector, useCurrency } from '../utils/currencyUtils';
import { generateAndDownloadPdf } from '../utils/pdfExporter';
import { OnlinePaymentGatewayModal } from './OnlinePaymentGatewayModal';

export interface DigitalBooking {
  id: string; // PNR / BoL / AWB Number e.g. "PNR-AIR-88219"
  bookingType: 'AIRWAYS_PASSENGER' | 'AIRWAYS_CARGO' | 'CRUISE_PASSENGER' | 'MARINE_CARGO';
  title: string; // e.g. "Air India AI-101 (New Delhi to New York)"
  operatorName: string;
  scope: 'Domestic' | 'International';
  origin: string;
  destination: string;
  departureDate: string;
  passengerOrCargoName: string;
  passportOrCustomsCode: string;
  allocatedSpace: string; // e.g. "Seat 14A (Business)", "Cabin 402B (Ocean View)", "Container 20ft #MSK-901"
  basePriceUSD: number;
  totalPriceUSD: number;
  status: 'CONFIRMED' | 'BOARDING READY' | 'IN TRANSIT' | 'DELIVERED';
  paymentMethod: string;
  qrPayload: string;
  issueTimestamp: string;
}

const INITIAL_DIGITAL_BOOKINGS: DigitalBooking[] = [
  {
    id: 'PNR-AIR-90421',
    bookingType: 'AIRWAYS_PASSENGER',
    title: 'Air India AI-101 (B777-300ER)',
    operatorName: 'Air India',
    scope: 'International',
    origin: 'New Delhi (DEL)',
    destination: 'New York (JFK)',
    departureDate: '2026-08-15',
    passengerOrCargoName: 'Capt. Rajesh Sharma',
    passportOrCustomsCode: 'P-9842104-IND',
    allocatedSpace: 'Seat 03A (First Class Suites)',
    basePriceUSD: 1450,
    totalPriceUSD: 1680,
    status: 'CONFIRMED',
    paymentMethod: 'Credit Card (Visa ****4210)',
    qrPayload: 'https://api.qrserver.com/v1/create-qr-code/?data=PNR-AIR-90421-AIR-INDIA&size=150x150',
    issueTimestamp: '2026-08-01 14:30 UTC'
  },
  {
    id: 'AWB-098-842109',
    bookingType: 'AIRWAYS_CARGO',
    title: 'Air India Express Heavy Freight (72 Tons)',
    operatorName: 'Air India Cargo',
    scope: 'International',
    origin: 'Mumbai Cargo Hub (BOM)',
    destination: 'Frankfurt Air Cargo (FRA)',
    departureDate: '2026-08-18',
    passengerOrCargoName: 'Global Pharma Corp (4 Pallets High-Val Precision)',
    passportOrCustomsCode: 'CUSTOMS-DE-88210',
    allocatedSpace: 'Pallet Position A12-A16 (Climate Controlled)',
    basePriceUSD: 3800,
    totalPriceUSD: 4250,
    status: 'CONFIRMED',
    paymentMethod: 'Corporate Wire Transfer',
    qrPayload: 'https://api.qrserver.com/v1/create-qr-code/?data=AWB-098-842109-AIR-CARGO&size=150x150',
    issueTimestamp: '2026-08-02 09:15 UTC'
  },
  {
    id: 'CRUISE-TKT-7712',
    bookingType: 'CRUISE_PASSENGER',
    title: 'Cordelia Empress (Grand Coastal Maldives Voyage)',
    operatorName: 'Cordelia Cruises',
    scope: 'International',
    origin: 'Mumbai Cruise Terminal',
    destination: 'Malé Atoll, Maldives',
    departureDate: '2026-09-01',
    passengerOrCargoName: 'Ananya V. Deshmukh & Family (2 Passengers)',
    passportOrCustomsCode: 'P-5510298-IND',
    allocatedSpace: 'Ocean Balcony Suite Deck 8 (#8042)',
    basePriceUSD: 850,
    totalPriceUSD: 980,
    status: 'CONFIRMED',
    paymentMethod: 'Digital Wallet (UPI / Apple Pay)',
    qrPayload: 'https://api.qrserver.com/v1/create-qr-code/?data=CRUISE-TKT-7712-CORDELIA&size=150x150',
    issueTimestamp: '2026-08-02 11:00 UTC'
  },
  {
    id: 'BOL-MAERSK-9042',
    bookingType: 'MARINE_CARGO',
    title: 'Maersk Mc-Kinney Moller 20ft Dry Container',
    operatorName: 'Maersk Line',
    scope: 'International',
    origin: 'Port of Nhava Sheva (JNPT)',
    destination: 'Port of Rotterdam (Netherlands)',
    departureDate: '2026-08-25',
    passengerOrCargoName: 'Oceanic Textile Exports Ltd (20ft FCL Industrial Yarn)',
    passportOrCustomsCode: 'NL-CUSTOMS-90421',
    allocatedSpace: 'Container #MSKU-8821094 (Bay 14-Row 02)',
    basePriceUSD: 2400,
    totalPriceUSD: 2750,
    status: 'IN TRANSIT',
    paymentMethod: 'Letter of Credit (LC #884102)',
    qrPayload: 'https://api.qrserver.com/v1/create-qr-code/?data=BOL-MAERSK-9042-ROTTERDAM&size=150x150',
    issueTimestamp: '2026-07-28 16:45 UTC'
  }
];

export const DigitalBookingManagerView: React.FC = () => {
  const { currency, formatPrice } = useCurrency();
  const [activeTab, setActiveTab] = useState<'MY_BOOKINGS' | 'NEW_CHECKOUT'>('MY_BOOKINGS');
  const [bookings, setBookings] = useState<DigitalBooking[]>(() => {
    const saved = localStorage.getItem('ocean_bird_digital_bookings');
    return saved ? JSON.parse(saved) : INITIAL_DIGITAL_BOOKINGS;
  });

  const [selectedBookingForModal, setSelectedBookingForModal] = useState<DigitalBooking | null>(null);
  const [isGatewayOpen, setIsGatewayOpen] = useState<boolean>(false);
  const [pendingGatewayData, setPendingGatewayData] = useState<any>(null);

  // New Booking State
  const [bookingType, setBookingType] = useState<'AIRWAYS_PASSENGER' | 'AIRWAYS_CARGO' | 'CRUISE_PASSENGER' | 'MARINE_CARGO'>('AIRWAYS_PASSENGER');
  const [scope, setScope] = useState<'Domestic' | 'International'>('International');
  const [passengerName, setPassengerName] = useState('');
  const [passportCode, setPassportCode] = useState('');
  const [originPort, setOriginPort] = useState('New Delhi (DEL)');
  const [destPort, setDestPort] = useState('London Heathrow (LHR)');
  const [departureDate, setDepartureDate] = useState('2026-08-20');
  const [classOrSpace, setClassOrSpace] = useState('Seat 12A (Business Class)');
  const [paymentMethod, setPaymentMethod] = useState('Credit Card (Visa)');
  const [createdSuccessMsg, setCreatedSuccessMsg] = useState('');

  useEffect(() => {
    localStorage.setItem('ocean_bird_digital_bookings', JSON.stringify(bookings));
  }, [bookings]);

  const handleInitiateGatewayCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passengerName) {
      alert('Please enter passenger or shipper name.');
      return;
    }

    const prefix = bookingType === 'AIRWAYS_PASSENGER' ? 'PNR-AIR' : bookingType === 'AIRWAYS_CARGO' ? 'AWB' : bookingType === 'CRUISE_PASSENGER' ? 'CRUISE-TKT' : 'BOL';
    const randomId = `${prefix}-${Math.floor(10000 + Math.random() * 90000)}`;

    let baseUSD = 950;
    if (bookingType === 'AIRWAYS_CARGO') baseUSD = 3200;
    if (bookingType === 'CRUISE_PASSENGER') baseUSD = 850;
    if (bookingType === 'MARINE_CARGO') baseUSD = 2600;

    let docType: 'E-TICKET' | 'AIR_WAYBILL' | 'BILL_OF_LADING' | 'TAX_INVOICE' = 'E-TICKET';
    if (bookingType === 'AIRWAYS_CARGO') docType = 'AIR_WAYBILL';
    if (bookingType === 'MARINE_CARGO') docType = 'BILL_OF_LADING';

    setPendingGatewayData({
      id: randomId,
      bookingType,
      title: `${bookingType.replace('_', ' ')} (${originPort} to ${destPort})`,
      operatorName: bookingType.startsWith('AIRWAYS') ? 'OceanBird World Airways' : 'OceanBird Maritime Line',
      amountUSD: baseUSD * 1.15,
      passengerOrShipper: passengerName,
      passportOrCustoms: passportCode || 'REG-CUSTOMS-VERIFIED',
      origin: originPort,
      destination: destPort,
      departureDate,
      allocatedSpace: classOrSpace,
      documentType: docType,
      scope,
      basePriceUSD: baseUSD
    });
    setIsGatewayOpen(true);
  };

  const handlePaymentSuccess = (paymentDetails: { paymentMethod: string; txHash: string; timestamp: string }) => {
    if (!pendingGatewayData) return;

    const newBooking: DigitalBooking = {
      id: pendingGatewayData.id,
      bookingType: pendingGatewayData.bookingType,
      title: pendingGatewayData.title,
      operatorName: pendingGatewayData.operatorName,
      scope: pendingGatewayData.scope,
      origin: pendingGatewayData.origin,
      destination: pendingGatewayData.destination,
      departureDate: pendingGatewayData.departureDate,
      passengerOrCargoName: pendingGatewayData.passengerOrShipper,
      passportOrCustomsCode: pendingGatewayData.passportOrCustoms,
      allocatedSpace: pendingGatewayData.allocatedSpace,
      basePriceUSD: pendingGatewayData.basePriceUSD,
      totalPriceUSD: pendingGatewayData.amountUSD,
      status: 'CONFIRMED',
      paymentMethod: `${paymentDetails.paymentMethod} (Tx: ${paymentDetails.txHash.substring(0, 10)}...)`,
      qrPayload: `https://api.qrserver.com/v1/create-qr-code/?data=${pendingGatewayData.id}-OCEANBIRD-DIGITAL&size=150x150`,
      issueTimestamp: paymentDetails.timestamp
    };

    setBookings([newBooking, ...bookings]);
    setCreatedSuccessMsg(`Digital Booking Completed & Settled! Reference ID: ${newBooking.id}`);
    setSelectedBookingForModal(newBooking);
    setIsGatewayOpen(false);
    setActiveTab('MY_BOOKINGS');
  };

  return (
    <div id="digital-booking-manager" className="space-y-6 animate-fadeIn font-sans text-white">
      {/* Top Banner Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 rounded-2xl p-6 border border-cyan-500/30 shadow-2xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 uppercase flex items-center space-x-1">
                <Ticket className="w-3.5 h-3.5 text-cyan-400" />
                <span>FULL & FULL DIGITAL E-TICKET & WAYBILL SYSTEM</span>
              </span>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 uppercase">
                WORLDWIDE ONLINE CHECKOUT
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white mt-2 flex items-center space-x-3">
              <ShieldCheck className="w-8 h-8 text-cyan-400" />
              <span>Full Online Digital Booking & E-Ticket Manager</span>
            </h1>
            <p className="text-slate-400 text-xs mt-1 max-w-3xl font-sans">
              End-to-end digital online booking engine supporting international & domestic airways passenger flights, air cargo logistics, cruise ship passenger tickets, and marine cargo container freight with multi-currency pricing and instant QR e-ticket verification.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <CurrencySelector />
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center justify-between font-mono text-xs">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setActiveTab('MY_BOOKINGS')}
              className={`px-4 py-2 rounded-xl font-bold transition-all flex items-center space-x-2 border ${
                activeTab === 'MY_BOOKINGS'
                  ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-lg shadow-cyan-500/20'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <Ticket className="w-4 h-4" />
              <span>My Digital E-Tickets & Waybills ({bookings.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('NEW_CHECKOUT')}
              className={`px-4 py-2 rounded-xl font-bold transition-all flex items-center space-x-2 border ${
                activeTab === 'NEW_CHECKOUT'
                  ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-lg shadow-emerald-500/20'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <Plus className="w-4 h-4" />
              <span>New Online Digital Checkout</span>
            </button>
          </div>
        </div>
      </div>

      {createdSuccessMsg && (
        <div className="p-4 bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 rounded-2xl text-xs flex items-center justify-between font-mono">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>{createdSuccessMsg}</span>
          </div>
          <button onClick={() => setCreatedSuccessMsg('')} className="text-slate-400 hover:text-white font-bold">Dismiss</button>
        </div>
      )}

      {/* TAB 1: MY SAVED DIGITAL BOOKINGS */}
      {activeTab === 'MY_BOOKINGS' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-slate-900 border border-slate-800 hover:border-cyan-500/60 rounded-2xl p-5 space-y-4 transition-all shadow-xl flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div className="flex items-center space-x-2">
                      <span className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                        {booking.bookingType.startsWith('AIRWAYS') ? <Plane className="w-4 h-4" /> : <Ship className="w-4 h-4" />}
                      </span>
                      <div>
                        <strong className="text-white text-sm">{booking.id}</strong>
                        <span className="text-[10px] text-slate-400 block">{booking.scope} • {booking.operatorName}</span>
                      </div>
                    </div>

                    <span className="px-2.5 py-1 rounded-full text-[10px] font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      {booking.status}
                    </span>
                  </div>

                  <h3 className="text-base font-extrabold text-white">{booking.title}</h3>

                  <div className="grid grid-cols-2 gap-2 bg-slate-950 p-3 rounded-xl border border-slate-800 text-[11px]">
                    <div>
                      <span className="text-slate-500 text-[10px] block">NAME / SHIPPER</span>
                      <strong className="text-white truncate block">{booking.passengerOrCargoName}</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 text-[10px] block">PASSPORT / CUSTOMS</span>
                      <strong className="text-cyan-300 truncate block">{booking.passportOrCustomsCode}</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 text-[10px] block">ALLOCATED SPACE</span>
                      <strong className="text-amber-300 truncate block">{booking.allocatedSpace}</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 text-[10px] block">DEPARTURE DATE</span>
                      <strong className="text-teal-300 truncate block">{booking.departureDate}</strong>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs">
                    <span className="text-slate-400">Total Price Paid:</span>
                    <strong className="text-emerald-400 text-sm font-black">{formatPrice(booking.totalPriceUSD)}</strong>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-[11px]">
                  <span className="text-slate-500">{booking.paymentMethod}</span>
                  <button
                    onClick={() => setSelectedBookingForModal(booking)}
                    className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs transition-all flex items-center space-x-1.5"
                  >
                    <QrCode className="w-4 h-4" />
                    <span>VIEW DIGITAL PASS / QR</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: NEW DIGITAL CHECKOUT WIZARD */}
      {activeTab === 'NEW_CHECKOUT' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 font-mono text-xs">
          <div className="border-b border-slate-800 pb-4">
            <h2 className="text-lg font-extrabold text-white flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-emerald-400" />
              <span>Full Online Digital Booking & Payment Portal</span>
            </h2>
            <p className="text-slate-400 text-xs mt-0.5">
              Instant digital issuance for airways passenger, air cargo, cruise ship, and marine container bookings.
            </p>
          </div>

          <form onSubmit={handleInitiateGatewayCheckout} className="space-y-6">
            {/* Service Type & Scope Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-slate-400 font-bold uppercase text-[10px]">Select Service Category:</label>
                <select
                  value={bookingType}
                  onChange={(e: any) => setBookingType(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 text-white font-bold p-3 rounded-xl focus:outline-none focus:border-cyan-400"
                >
                  <option value="AIRWAYS_PASSENGER">✈️ Airways Passenger Flight Ticket</option>
                  <option value="AIRWAYS_CARGO">📦 Airways Air Freight Cargo Logistics</option>
                  <option value="CRUISE_PASSENGER">🚢 Cruise Ship Passenger Cabin Ticket</option>
                  <option value="MARINE_CARGO">⚓ Marine Cargo Container & Courier Freight</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-400 font-bold uppercase text-[10px]">Service Scope:</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setScope('International')}
                    className={`p-3 rounded-xl border font-bold text-center transition-all ${
                      scope === 'International' ? 'bg-cyan-500 text-slate-950 border-cyan-400' : 'bg-slate-950 border-slate-800 text-slate-400'
                    }`}
                  >
                    🌍 International World
                  </button>
                  <button
                    type="button"
                    onClick={() => setScope('Domestic')}
                    className={`p-3 rounded-xl border font-bold text-center transition-all ${
                      scope === 'Domestic' ? 'bg-cyan-500 text-slate-950 border-cyan-400' : 'bg-slate-950 border-slate-800 text-slate-400'
                    }`}
                  >
                    🇮🇳 Domestic Regional
                  </button>
                </div>
              </div>
            </div>

            {/* Origin, Destination & Date */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="text-slate-400 font-bold uppercase text-[10px]">Origin Port / Airport:</label>
                <input
                  type="text"
                  value={originPort}
                  onChange={(e) => setOriginPort(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 text-white font-bold p-3 rounded-xl focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-400 font-bold uppercase text-[10px]">Destination Port / Airport:</label>
                <input
                  type="text"
                  value={destPort}
                  onChange={(e) => setDestPort(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 text-white font-bold p-3 rounded-xl focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-400 font-bold uppercase text-[10px]">Departure Date:</label>
                <input
                  type="date"
                  value={departureDate}
                  onChange={(e) => setDepartureDate(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 text-white font-bold p-3 rounded-xl focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            {/* Passenger / Shipper Info & Customs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-slate-400 font-bold uppercase text-[10px]">Passenger Full Name / Shipper Company:</label>
                <input
                  type="text"
                  placeholder="e.g. Capt. Vikram Merchant or Oceanic Corp"
                  value={passengerName}
                  onChange={(e) => setPassengerName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 text-white font-bold p-3 rounded-xl focus:outline-none focus:border-cyan-400"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-400 font-bold uppercase text-[10px]">Passport No. / Customs Duty Registration Code:</label>
                <input
                  type="text"
                  placeholder="e.g. P-8841029-IND or CUSTOMS-DE-904"
                  value={passportCode}
                  onChange={(e) => setPassportCode(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 text-white font-bold p-3 rounded-xl focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            {/* Seat / Cabin / Space Selector */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-slate-400 font-bold uppercase text-[10px]">Allocated Seat / Cabin / Container Space:</label>
                <input
                  type="text"
                  value={classOrSpace}
                  onChange={(e) => setClassOrSpace(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 text-white font-bold p-3 rounded-xl focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-400 font-bold uppercase text-[10px]">Payment Method Simulation:</label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 text-white font-bold p-3 rounded-xl focus:outline-none focus:border-cyan-400"
                >
                  <option value="Credit Card (Visa / Mastercard)">Credit Card (Visa / Mastercard)</option>
                  <option value="Digital Wallet (UPI / Apple Pay / Google Pay)">Digital Wallet (UPI / Apple Pay)</option>
                  <option value="Corporate Wire Transfer (SWIFT)">Corporate Wire Transfer (SWIFT)</option>
                  <option value="Letter of Credit (LC Bank Direct)">Letter of Credit (LC Direct)</option>
                  <option value="Crypto USDT / USDC Maritime Pay">Crypto USDT / USDC Maritime Pay</option>
                </select>
              </div>
            </div>

            {/* Price Preview Card */}
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-slate-400 text-[10px] block uppercase font-bold">Estimated Checkout Price ({currency}):</span>
                <span className="text-emerald-400 text-2xl font-black">{formatPrice(1092)}</span>
                <span className="text-slate-500 text-[10px] block mt-0.5">Includes taxes, customs duty, and sat-com security fee</span>
              </div>

              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs transition-all shadow-xl shadow-emerald-500/20 flex items-center space-x-2 shrink-0"
              >
                <ShieldCheck className="w-5 h-5" />
                <span>COMPLETE DIGITAL BOOKING</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* MODAL FOR DIGITAL PASS & QR CODE */}
      {selectedBookingForModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 font-mono text-xs">
          <div className="bg-slate-900 border border-cyan-500/50 rounded-3xl p-6 max-w-xl w-full text-white space-y-6 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center space-x-2">
                <QrCode className="w-6 h-6 text-cyan-400" />
                <div>
                  <h3 className="text-lg font-black text-white">Official E-Ticket & Digital Pass</h3>
                  <span className="text-cyan-400 text-xs">{selectedBookingForModal.id}</span>
                </div>
              </div>

              <button
                onClick={() => setSelectedBookingForModal(null)}
                className="text-slate-400 hover:text-white font-bold p-1 rounded-lg bg-slate-800"
              >
                ✕ Close
              </button>
            </div>

            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4 text-center">
              <div className="flex justify-center">
                <img
                  src={selectedBookingForModal.qrPayload}
                  alt="QR Code Ticket"
                  className="w-36 h-36 rounded-xl border-4 border-white shadow-xl"
                />
              </div>

              <div className="space-y-1 text-xs">
                <strong className="text-white text-base block">{selectedBookingForModal.passengerOrCargoName}</strong>
                <span className="text-cyan-300 text-xs block">{selectedBookingForModal.title}</span>
                <span className="text-slate-400 text-[11px] block">{selectedBookingForModal.origin} ➔ {selectedBookingForModal.destination}</span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-left bg-slate-900 p-3 rounded-xl border border-slate-800 text-[11px]">
                <div>
                  <span className="text-slate-500 text-[10px] block">PASSPORT / CUSTOMS</span>
                  <strong className="text-white">{selectedBookingForModal.passportOrCustomsCode}</strong>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] block">SPACE / CABIN</span>
                  <strong className="text-amber-300">{selectedBookingForModal.allocatedSpace}</strong>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] block">DEPARTURE</span>
                  <strong className="text-teal-300">{selectedBookingForModal.departureDate}</strong>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] block">TOTAL PRICE ({currency})</span>
                  <strong className="text-emerald-400 font-bold">{formatPrice(selectedBookingForModal.totalPriceUSD)}</strong>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 pt-2">
              <button
                onClick={() => {
                  let docType: 'E-TICKET' | 'AIR_WAYBILL' | 'BILL_OF_LADING' | 'TAX_INVOICE' = 'E-TICKET';
                  if (selectedBookingForModal.bookingType === 'AIRWAYS_CARGO') docType = 'AIR_WAYBILL';
                  if (selectedBookingForModal.bookingType === 'MARINE_CARGO') docType = 'BILL_OF_LADING';

                  generateAndDownloadPdf({
                    documentType: docType,
                    bookingId: selectedBookingForModal.id,
                    title: selectedBookingForModal.title,
                    operatorName: selectedBookingForModal.operatorName,
                    passengerOrCargoName: selectedBookingForModal.passengerOrCargoName,
                    passportOrCustomsCode: selectedBookingForModal.passportOrCustomsCode,
                    origin: selectedBookingForModal.origin,
                    destination: selectedBookingForModal.destination,
                    departureDate: selectedBookingForModal.departureDate,
                    allocatedSpace: selectedBookingForModal.allocatedSpace,
                    paymentMethod: selectedBookingForModal.paymentMethod,
                    basePriceUSD: selectedBookingForModal.basePriceUSD,
                    totalPriceUSD: selectedBookingForModal.totalPriceUSD,
                    currencyCode: currency,
                    formattedTotalPrice: formatPrice(selectedBookingForModal.totalPriceUSD),
                    issueTimestamp: selectedBookingForModal.issueTimestamp,
                    qrPayload: selectedBookingForModal.qrPayload
                  });
                }}
                className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-all flex items-center justify-center space-x-2"
              >
                <Download className="w-4 h-4 text-cyan-400" />
                <span>Export PDF E-Ticket</span>
              </button>

              <button
                onClick={() => window.print()}
                className="flex-1 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs transition-all flex items-center justify-center space-x-2"
              >
                <Printer className="w-4 h-4" />
                <span>Print Digital Pass</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Online & Digital Currency Payment Gateway Modal */}
      {isGatewayOpen && pendingGatewayData && (
        <OnlinePaymentGatewayModal
          isOpen={isGatewayOpen}
          onClose={() => setIsGatewayOpen(false)}
          bookingData={pendingGatewayData}
          onPaymentSuccess={handlePaymentSuccess}
        />
      )}
    </div>
  );
};
