import React, { useState } from 'react';
import {
  Building2,
  Calendar,
  Users,
  MapPin,
  Star,
  Search,
  Check,
  ShieldCheck,
  CreditCard,
  Download,
  Hotel,
  Filter,
  Wifi,
  Coffee,
  Car,
  Tv,
  Clock,
  ExternalLink,
  DollarSign
} from 'lucide-react';
import { useCurrency } from '../utils/currencyUtils';
import { generateAndDownloadPdf } from '../utils/pdfExporter';
import { OnlinePaymentGatewayModal } from './OnlinePaymentGatewayModal';
import { useLanguage } from '../utils/languageUtils';

export interface HotelStay {
  id: string;
  name: string;
  portOrCity: string;
  country: string;
  starRating: number;
  reviewScore: number;
  reviewCount: number;
  image: string;
  distanceToTerminal: string;
  tagline: string;
  nightlyPriceUSD: number;
  amenities: string[];
  roomTypes: {
    id: string;
    name: string;
    maxGuests: number;
    priceMultiplier: number;
    bedConfig: string;
  }[];
}

const SAMPLE_HOTELS: HotelStay[] = [
  {
    id: 'HOTEL-BOM-001',
    name: 'The Taj Mahal Palace & Tower',
    portOrCity: 'Mumbai Port & Colaba Terminal',
    country: 'India',
    starRating: 5,
    reviewScore: 4.9,
    reviewCount: 1420,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    distanceToTerminal: '0.2 km from Mumbai International Cruise Terminal',
    tagline: 'Iconic harbor heritage hotel overlooking the Gateway of India and Arabian Sea berths.',
    nightlyPriceUSD: 240,
    amenities: ['Sea View', 'Port Shuttle', '24/7 Butler', 'Helipad', 'Free High-Speed Wi-Fi'],
    roomTypes: [
      { id: 'R1', name: 'Deluxe Sea View Suite', maxGuests: 2, priceMultiplier: 1.0, bedConfig: '1 King Bed' },
      { id: 'R2', name: 'Executive Captain Lounge Suite', maxGuests: 3, priceMultiplier: 1.6, bedConfig: '1 King Bed + Daybed' },
      { id: 'R3', name: 'Heritage Grand Harbor Villa', maxGuests: 4, priceMultiplier: 2.5, bedConfig: '2 Super King Beds' }
    ]
  },
  {
    id: 'HOTEL-SIN-002',
    name: 'Marina Bay Sands Maritime Resort',
    portOrCity: 'Singapore Cruise Centre & Port',
    country: 'Singapore',
    starRating: 5,
    reviewScore: 4.8,
    reviewCount: 3100,
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
    distanceToTerminal: '1.5 km from Marina Bay Cruise Centre Singapore',
    tagline: 'Luxury sky park hotel with panoramic views of Malacca Strait container vessel anchorages.',
    nightlyPriceUSD: 380,
    amenities: ['Rooftop Infinity Pool', '24h VIP Shuttle', 'VIP Terminal Clearance', 'Spa'],
    roomTypes: [
      { id: 'R1', name: 'Strait View Premier Room', maxGuests: 2, priceMultiplier: 1.0, bedConfig: '1 King Bed' },
      { id: 'R2', name: 'Sky Harbor Suite', maxGuests: 3, priceMultiplier: 1.8, bedConfig: '1 King Bed + Lounge' }
    ]
  },
  {
    id: 'HOTEL-DXB-003',
    name: 'Conrad Dubai Port Rashid Hub',
    portOrCity: 'Port Rashid & Airport Hub',
    country: 'United Arab Emirates',
    starRating: 5,
    reviewScore: 4.7,
    reviewCount: 980,
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80',
    distanceToTerminal: '2.1 km from Mina Rashid Cruise Terminal',
    tagline: 'Ultra-modern urban sanctuary situated between Dubai International Airport & Rashid Port.',
    nightlyPriceUSD: 210,
    amenities: ['Direct Airport Shuttle', 'Late Check-out for Crew', 'Executive Lounge', 'Pool'],
    roomTypes: [
      { id: 'R1', name: 'Executive Port View King', maxGuests: 2, priceMultiplier: 1.0, bedConfig: '1 King Bed' },
      { id: 'R2', name: 'Maritime Royal Suite', maxGuests: 4, priceMultiplier: 2.0, bedConfig: '2 King Beds' }
    ]
  },
  {
    id: 'HOTEL-MLE-004',
    name: 'The St. Regis Maldives Vommuli Resort',
    portOrCity: 'Malé Seaplane & Cruise Anchorage',
    country: 'Maldives',
    starRating: 5,
    reviewScore: 5.0,
    reviewCount: 650,
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80',
    distanceToTerminal: 'Private Water Taxi from Malé Port Harbor',
    tagline: 'Overwater luxury villas catering to cruise line passengers & private yacht charters.',
    nightlyPriceUSD: 750,
    amenities: ['Overwater Bungalow', 'Private Yacht Transfer', 'Butler Service', 'Private Plunge Pool'],
    roomTypes: [
      { id: 'R1', name: 'Overwater Sunset Villa', maxGuests: 2, priceMultiplier: 1.0, bedConfig: '1 King Bed' },
      { id: 'R2', name: 'Caroline Astor Ocean Estate', maxGuests: 6, priceMultiplier: 2.8, bedConfig: '3 King Bedrooms' }
    ]
  },
  {
    id: 'HOTEL-CPT-005',
    name: 'Taj Cape Town Waterfront',
    portOrCity: 'Port of Cape Town (Victoria & Alfred)',
    country: 'South Africa',
    starRating: 5,
    reviewScore: 4.8,
    reviewCount: 840,
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80',
    distanceToTerminal: '0.8 km from V&A Waterfront Terminal',
    tagline: 'Historic grand hotel framed by Table Mountain views and bustling Atlantic cruise docks.',
    nightlyPriceUSD: 195,
    amenities: ['Table Mountain View', 'Ayuverda Spa', 'Port Transfer Shuttle', 'Wine Cellar'],
    roomTypes: [
      { id: 'R1', name: 'Luxury Waterfront Room', maxGuests: 2, priceMultiplier: 1.0, bedConfig: '1 King Bed' },
      { id: 'R2', name: 'Presidential Harbor Suite', maxGuests: 4, priceMultiplier: 2.2, bedConfig: '2 Bedrooms' }
    ]
  }
];

export interface BookedHotelVoucher {
  voucherId: string;
  hotelName: string;
  location: string;
  guestName: string;
  passportNumber: string;
  roomName: string;
  checkInDate: string;
  checkOutDate: string;
  nights: number;
  guestsCount: number;
  totalUSD: number;
  paymentMethod: string;
  status: 'CONFIRMED' | 'CHECKED_IN';
  bookingTimestamp: string;
}

export const HotelBookingPortal: React.FC = () => {
  const { formatPrice, currency } = useCurrency();
  const { t } = useLanguage();

  const [searchLocation, setSearchLocation] = useState<string>('ALL');
  const [checkInDate, setCheckInDate] = useState<string>('2026-08-20');
  const [checkOutDate, setCheckOutDate] = useState<string>('2026-08-23');
  const [guestsCount, setGuestsCount] = useState<number>(2);

  const [selectedHotel, setSelectedHotel] = useState<HotelStay | null>(null);
  const [selectedRoomId, setSelectedRoomId] = useState<string>('R1');
  const [guestName, setGuestName] = useState<string>('');
  const [passportOrId, setPassportOrId] = useState<string>('');
  const [specialRequests, setSpecialRequests] = useState<string>('Late arrival due to cruise docking at 22:00 UTC.');

  // Modal payment states
  const [isGatewayOpen, setIsGatewayOpen] = useState<boolean>(false);
  const [pendingHotelData, setPendingHotelData] = useState<any>(null);

  // My Bookings list saved in localStorage
  const [myHotelVouchers, setMyHotelVouchers] = useState<BookedHotelVoucher[]>(() => {
    try {
      const saved = localStorage.getItem('ocean_bird_hotel_vouchers');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [activeTab, setActiveTab] = useState<'HOTELS_BROWSE' | 'MY_STAYS'>('HOTELS_BROWSE');

  const filteredHotels = SAMPLE_HOTELS.filter((h) => {
    if (searchLocation === 'ALL') return true;
    return h.portOrCity.toLowerCase().includes(searchLocation.toLowerCase()) || h.country.toLowerCase().includes(searchLocation.toLowerCase());
  });

  const calculateNights = (inDate: string, outDate: string) => {
    const d1 = new Date(inDate);
    const d2 = new Date(outDate);
    const diffTime = Math.abs(d2.getTime() - d1.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 1;
  };

  const handleOpenBookingModal = (hotel: HotelStay) => {
    setSelectedHotel(hotel);
    setSelectedRoomId(hotel.roomTypes[0].id);
  };

  const handleInitiateHotelCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedHotel) return;
    if (!guestName) {
      alert('Please enter guest full name.');
      return;
    }

    const nights = calculateNights(checkInDate, checkOutDate);
    const selectedRoom = selectedHotel.roomTypes.find((r) => r.id === selectedRoomId) || selectedHotel.roomTypes[0];
    const totalUSD = selectedHotel.nightlyPriceUSD * selectedRoom.priceMultiplier * nights;

    const voucherId = `HTL-${Math.floor(100000 + Math.random() * 900000)}`;

    setPendingHotelData({
      id: voucherId,
      bookingType: 'HOTEL_STAY',
      title: `${selectedHotel.name} (${selectedRoom.name})`,
      operatorName: selectedHotel.name,
      amountUSD: totalUSD,
      passengerOrShipper: guestName,
      passportOrCustoms: passportOrId || 'ID-PASSPORT-VERIFIED',
      origin: selectedHotel.portOrCity,
      destination: `${nights} Night Stay (${checkInDate} to ${checkOutDate})`,
      departureDate: checkInDate,
      allocatedSpace: selectedRoom.name,
      documentType: 'TAX_INVOICE',
      hotelObj: selectedHotel,
      roomObj: selectedRoom,
      nights,
      guestsCount,
      checkInDate,
      checkOutDate
    });

    setIsGatewayOpen(true);
  };

  const handlePaymentSuccess = (paymentDetails: { paymentMethod: string; txHash: string; timestamp: string }) => {
    if (!pendingHotelData) return;

    const newVoucher: BookedHotelVoucher = {
      voucherId: pendingHotelData.id,
      hotelName: pendingHotelData.hotelObj.name,
      location: pendingHotelData.hotelObj.portOrCity,
      guestName: pendingHotelData.passengerOrShipper,
      passportNumber: pendingHotelData.passportOrCustoms,
      roomName: pendingHotelData.roomObj.name,
      checkInDate: pendingHotelData.checkInDate,
      checkOutDate: pendingHotelData.checkOutDate,
      nights: pendingHotelData.nights,
      guestsCount: pendingHotelData.guestsCount,
      totalUSD: pendingHotelData.amountUSD,
      paymentMethod: `${paymentDetails.paymentMethod} (Tx: ${paymentDetails.txHash.substring(0, 8)}...)`,
      status: 'CONFIRMED',
      bookingTimestamp: paymentDetails.timestamp
    };

    const updated = [newVoucher, ...myHotelVouchers];
    setMyHotelVouchers(updated);
    localStorage.setItem('ocean_bird_hotel_vouchers', JSON.stringify(updated));

    setIsGatewayOpen(false);
    setSelectedHotel(null);
    setActiveTab('MY_STAYS');
  };

  const handleDownloadHotelPdf = (voucher: BookedHotelVoucher) => {
    generateAndDownloadPdf({
      documentType: 'TAX_INVOICE',
      bookingId: voucher.voucherId,
      title: `HOTEL VOUCHER: ${voucher.hotelName}`,
      operatorName: voucher.hotelName,
      passengerOrCargoName: voucher.guestName,
      passportOrCustomsCode: voucher.passportNumber,
      origin: voucher.location,
      destination: `Hotel Check-Out: ${voucher.checkOutDate}`,
      departureDate: voucher.checkInDate,
      allocatedSpace: voucher.roomName,
      paymentMethod: voucher.paymentMethod,
      basePriceUSD: voucher.totalUSD,
      totalPriceUSD: voucher.totalUSD,
      currencyCode: currency,
      formattedTotalPrice: formatPrice(voucher.totalUSD),
      issueTimestamp: voucher.bookingTimestamp,
      qrPayload: `https://api.qrserver.com/v1/create-qr-code/?data=${voucher.voucherId}-HOTEL-VOUCHER&size=150x150`
    });
  };

  return (
    <div id="hotel-booking-portal" className="space-y-8 animate-fadeIn font-sans text-white">
      {/* Top Banner Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 rounded-3xl p-6 sm:p-8 border border-sky-500/30 shadow-2xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-sky-500/20 text-sky-300 border border-sky-500/30 uppercase flex items-center space-x-1">
                <Hotel className="w-3.5 h-3.5 text-sky-400" />
                <span>ONLINE HOTEL & PORT RESORT BOOKING</span>
              </span>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 uppercase">
                INSTANT VOUCHER GENERATION
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white mt-2 flex items-center space-x-3">
              <Building2 className="w-8 h-8 text-sky-400" />
              <span>Port Stays & Airport Layover Hotels</span>
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-3xl font-sans">
              Reserve premier luxury hotels, port-adjacent resorts, and flight layover lounges with multi-currency digital checkout and immediate PDF hotel vouchers.
            </p>
          </div>

          <div className="flex items-center space-x-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800 font-mono text-xs">
            <button
              onClick={() => setActiveTab('HOTELS_BROWSE')}
              className={`px-4 py-2 rounded-xl font-bold transition-all ${
                activeTab === 'HOTELS_BROWSE' ? 'bg-sky-500 text-slate-950' : 'text-slate-400 hover:text-white'
              }`}
            >
              Browse Hotels
            </button>
            <button
              onClick={() => setActiveTab('MY_STAYS')}
              className={`px-4 py-2 rounded-xl font-bold transition-all flex items-center space-x-1.5 ${
                activeTab === 'MY_STAYS' ? 'bg-sky-500 text-slate-950' : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>My Stays</span>
              <span className="px-1.5 py-0.5 rounded-md bg-slate-900 text-sky-300 text-[10px]">
                {myHotelVouchers.length}
              </span>
            </button>
          </div>
        </div>

        {/* Search & Date Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-slate-950 p-4 rounded-2xl border border-slate-800 font-mono text-xs">
          <div className="space-y-1">
            <label className="text-slate-400 font-bold uppercase text-[10px] flex items-center space-x-1">
              <MapPin className="w-3.5 h-3.5 text-sky-400" />
              <span>Port / City Hub</span>
            </label>
            <select
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
              className="w-full bg-slate-900 text-white font-bold p-2.5 rounded-xl border border-slate-800 focus:outline-none focus:border-sky-400"
            >
              <option value="ALL">All Major Ports & Hubs</option>
              <option value="Mumbai">Mumbai (DEL/BOM Port)</option>
              <option value="Singapore">Singapore (Marina Bay Port)</option>
              <option value="Dubai">Dubai (Port Rashid / DXB)</option>
              <option value="Maldives">Maldives (Malé Harbor)</option>
              <option value="Cape Town">Cape Town (V&A Dock)</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-slate-400 font-bold uppercase text-[10px] flex items-center space-x-1">
              <Calendar className="w-3.5 h-3.5 text-sky-400" />
              <span>Check-In Date</span>
            </label>
            <input
              type="date"
              value={checkInDate}
              onChange={(e) => setCheckInDate(e.target.value)}
              className="w-full bg-slate-900 text-white font-bold p-2.5 rounded-xl border border-slate-800 focus:outline-none focus:border-sky-400"
            />
          </div>

          <div className="space-y-1">
            <label className="text-slate-400 font-bold uppercase text-[10px] flex items-center space-x-1">
              <Calendar className="w-3.5 h-3.5 text-emerald-400" />
              <span>Check-Out Date</span>
            </label>
            <input
              type="date"
              value={checkOutDate}
              onChange={(e) => setCheckOutDate(e.target.value)}
              className="w-full bg-slate-900 text-white font-bold p-2.5 rounded-xl border border-slate-800 focus:outline-none focus:border-sky-400"
            />
          </div>

          <div className="space-y-1">
            <label className="text-slate-400 font-bold uppercase text-[10px] flex items-center space-x-1">
              <Users className="w-3.5 h-3.5 text-amber-400" />
              <span>Guests & Rooms</span>
            </label>
            <select
              value={guestsCount}
              onChange={(e) => setGuestsCount(Number(e.target.value))}
              className="w-full bg-slate-900 text-white font-bold p-2.5 rounded-xl border border-slate-800 focus:outline-none focus:border-sky-400"
            >
              <option value={1}>1 Guest (Solo / Captain)</option>
              <option value={2}>2 Guests (Standard Couple)</option>
              <option value={3}>3 Guests (Family Suite)</option>
              <option value={4}>4 Guests (Executive Crew Lodge)</option>
            </select>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT CONTENTIONS */}
      {activeTab === 'HOTELS_BROWSE' ? (
        <div className="space-y-6">
          <div className="flex items-center justify-between font-mono text-xs text-slate-400">
            <span>Showing {filteredHotels.length} luxury port hotels for selected criteria</span>
            <span className="text-sky-400 font-bold">Nights Count: {calculateNights(checkInDate, checkOutDate)} Night(s)</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredHotels.map((hotel) => {
              const nights = calculateNights(checkInDate, checkOutDate);
              const estPrice = hotel.nightlyPriceUSD * nights;

              return (
                <div
                  key={hotel.id}
                  className="bg-slate-900 border border-slate-800 hover:border-sky-500/50 rounded-3xl overflow-hidden transition-all duration-300 shadow-xl flex flex-col justify-between group"
                >
                  <div>
                    {/* Hotel Image & Overlay */}
                    <div className="relative h-52 overflow-hidden bg-slate-950">
                      <img
                        src={hotel.image}
                        alt={hotel.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                      />
                      <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md border border-slate-800 px-3 py-1 rounded-full flex items-center space-x-1 text-amber-400 font-bold text-xs">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <span>{hotel.reviewScore} ({hotel.reviewCount} reviews)</span>
                      </div>
                      <div className="absolute top-3 right-3 bg-sky-500 text-slate-950 px-3 py-1 rounded-full font-mono font-black text-xs">
                        {hotel.starRating}★ PORT LUXURY
                      </div>
                      <div className="absolute bottom-3 left-3 right-3 bg-slate-950/90 backdrop-blur-md p-2 rounded-xl border border-slate-800/80 text-xs text-sky-300 flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-sky-400 shrink-0" />
                        <span className="truncate">{hotel.distanceToTerminal}</span>
                      </div>
                    </div>

                    {/* Hotel Content Details */}
                    <div className="p-6 space-y-4">
                      <div>
                        <span className="text-slate-400 font-mono text-[10px] uppercase font-bold tracking-wider">
                          {hotel.portOrCity}, {hotel.country}
                        </span>
                        <h2 className="text-xl font-bold text-white mt-1 group-hover:text-sky-300 transition-colors">
                          {hotel.name}
                        </h2>
                        <p className="text-slate-400 text-xs mt-1 leading-relaxed">
                          {hotel.tagline}
                        </p>
                      </div>

                      {/* Amenities pills */}
                      <div className="flex flex-wrap gap-1.5 font-mono text-[10px]">
                        {hotel.amenities.map((a, i) => (
                          <span
                            key={i}
                            className="px-2.5 py-1 rounded-lg bg-slate-950 text-slate-300 border border-slate-800 flex items-center space-x-1"
                          >
                            <Check className="w-3 h-3 text-sky-400" />
                            <span>{a}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Pricing Footer */}
                  <div className="p-6 pt-0 border-t border-slate-800/60 mt-4 flex items-center justify-between">
                    <div>
                      <span className="text-slate-500 text-[10px] font-mono block">STARTING FROM</span>
                      <div className="flex items-baseline space-x-1">
                        <strong className="text-2xl font-black text-emerald-400 font-mono">
                          {formatPrice(estPrice)}
                        </strong>
                        <span className="text-slate-400 text-xs font-mono">/ {nights} night(s)</span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleOpenBookingModal(hotel)}
                      className="px-5 py-3 rounded-2xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-black text-xs transition-all flex items-center space-x-2 shadow-lg shadow-sky-500/20"
                    >
                      <span>SELECT ROOM & BOOK</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* MY HOTEL STAYS TAB */
        <div className="space-y-6">
          <div className="flex items-center justify-between font-mono text-xs text-slate-400">
            <span>Your Confirmed Hotel Vouchers & Active Port Stays ({myHotelVouchers.length})</span>
          </div>

          {myHotelVouchers.length === 0 ? (
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-12 text-center space-y-4">
              <Hotel className="w-12 h-12 text-slate-600 mx-auto" />
              <h3 className="text-lg font-bold text-white">No Active Hotel Bookings Found</h3>
              <p className="text-slate-400 text-xs max-w-md mx-auto font-sans">
                You haven't reserved any port hotels or layover stays yet. Browse our verified luxury harbor hotels to make a reservation.
              </p>
              <button
                onClick={() => setActiveTab('HOTELS_BROWSE')}
                className="px-6 py-2.5 bg-sky-500 text-slate-950 font-bold text-xs rounded-xl"
              >
                Explore Port Hotels Now
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
              {myHotelVouchers.map((v) => (
                <div
                  key={v.voucherId}
                  className="bg-slate-900 border border-sky-500/30 rounded-3xl p-6 space-y-4 shadow-xl relative"
                >
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div>
                      <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 text-[9px] font-bold border border-emerald-500/30">
                        ✓ {v.status}
                      </span>
                      <h3 className="text-base font-bold text-white mt-1">{v.hotelName}</h3>
                      <span className="text-slate-400 text-[10px]">{v.location}</span>
                    </div>

                    <div className="text-right">
                      <span className="text-sky-300 font-bold block">{v.voucherId}</span>
                      <span className="text-slate-500 text-[9px]">{v.bookingTimestamp}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 bg-slate-950 p-3 rounded-2xl border border-slate-800 text-[11px]">
                    <div>
                      <span className="text-slate-500 text-[10px] block">GUEST NAME</span>
                      <strong className="text-white">{v.guestName}</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 text-[10px] block">PASSPORT / ID</span>
                      <strong className="text-teal-300">{v.passportNumber}</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 text-[10px] block">ROOM TYPE</span>
                      <strong className="text-amber-300">{v.roomName}</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 text-[10px] block">CHECK-IN / OUT</span>
                      <strong className="text-sky-300">{v.checkInDate} ➔ {v.checkOutDate}</strong>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <div>
                      <span className="text-slate-400 text-[10px] block">TOTAL AMOUNT PAID</span>
                      <strong className="text-emerald-400 font-bold text-base">{formatPrice(v.totalUSD)}</strong>
                    </div>

                    <button
                      onClick={() => handleDownloadHotelPdf(v)}
                      className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-all flex items-center space-x-2 border border-slate-700"
                    >
                      <Download className="w-4 h-4 text-sky-400" />
                      <span>Download PDF Voucher</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* BOOKING SELECTION MODAL */}
      {selectedHotel && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 font-mono text-xs overflow-y-auto">
          <div className="bg-slate-900 border border-sky-500/50 rounded-3xl p-6 max-w-2xl w-full text-white space-y-6 shadow-2xl relative my-8">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center space-x-2">
                <Hotel className="w-6 h-6 text-sky-400" />
                <div>
                  <h3 className="text-lg font-black text-white">{selectedHotel.name}</h3>
                  <span className="text-sky-400 text-xs">{selectedHotel.portOrCity}</span>
                </div>
              </div>

              <button
                onClick={() => setSelectedHotel(null)}
                className="text-slate-400 hover:text-white font-bold p-1 rounded-lg bg-slate-800"
              >
                ✕ Close
              </button>
            </div>

            <form onSubmit={handleInitiateHotelCheckout} className="space-y-6">
              {/* Room Tier Selection */}
              <div className="space-y-2">
                <label className="text-slate-300 font-bold uppercase text-[10px] block">
                  Select Room Type
                </label>
                <div className="grid grid-cols-1 gap-2">
                  {selectedHotel.roomTypes.map((room) => {
                    const nights = calculateNights(checkInDate, checkOutDate);
                    const roomTotal = selectedHotel.nightlyPriceUSD * room.priceMultiplier * nights;

                    return (
                      <div
                        key={room.id}
                        onClick={() => setSelectedRoomId(room.id)}
                        className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                          selectedRoomId === room.id
                            ? 'bg-sky-500/10 border-sky-400 text-white ring-1 ring-sky-400'
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        <div>
                          <strong className="text-white text-sm block">{room.name}</strong>
                          <span className="text-[10px] text-slate-400 block">{room.bedConfig} • Max {room.maxGuests} Guests</span>
                        </div>

                        <div className="text-right">
                          <strong className="text-emerald-400 text-sm font-bold block">{formatPrice(roomTotal)}</strong>
                          <span className="text-slate-500 text-[9px]">{nights} night(s) total</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Guest Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-slate-300 font-bold text-[10px] uppercase">
                    Guest Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Captain Alexander Vance"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    className="w-full bg-slate-950 text-white font-bold p-2.5 rounded-xl border border-slate-800 focus:outline-none focus:border-sky-400"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-bold text-[10px] uppercase">
                    Passport or National ID
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Z-8821094"
                    value={passportOrId}
                    onChange={(e) => setPassportOrId(e.target.value)}
                    className="w-full bg-slate-950 text-white font-bold p-2.5 rounded-xl border border-slate-800 focus:outline-none focus:border-sky-400"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-bold text-[10px] uppercase">
                  Special Port / Airport Shuttle Requests
                </label>
                <textarea
                  rows={2}
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  className="w-full bg-slate-950 text-white font-sans text-xs p-2.5 rounded-xl border border-slate-800 focus:outline-none focus:border-sky-400"
                />
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-slate-400 text-[10px] block font-mono">DUE NOW AT CHECKOUT</span>
                  <strong className="text-emerald-400 font-black text-xl font-mono">
                    {formatPrice(
                      selectedHotel.nightlyPriceUSD *
                        (selectedHotel.roomTypes.find((r) => r.id === selectedRoomId)?.priceMultiplier || 1) *
                        calculateNights(checkInDate, checkOutDate)
                    )}
                  </strong>
                </div>

                <button
                  type="submit"
                  className="px-6 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs transition-all flex items-center space-x-2 shadow-lg shadow-emerald-500/20"
                >
                  <CreditCard className="w-4 h-4" />
                  <span>PROCEED TO PAYMENT GATEWAY</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Payment Gateway Modal Integration */}
      {isGatewayOpen && pendingHotelData && (
        <OnlinePaymentGatewayModal
          isOpen={isGatewayOpen}
          onClose={() => setIsGatewayOpen(false)}
          bookingData={pendingHotelData}
          onPaymentSuccess={handlePaymentSuccess}
        />
      )}
    </div>
  );
};
