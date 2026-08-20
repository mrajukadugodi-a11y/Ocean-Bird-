import React, { useState } from 'react';
import {
  Calendar as CalendarIcon,
  Plane,
  Ship,
  Box,
  Container,
  Clock,
  Download,
  Plus,
  Filter,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  User,
  ShieldCheck,
  Tag,
  ArrowRight
} from 'lucide-react';
import { useCurrency } from '../utils/currencyUtils';

export interface CalendarEvent {
  id: string;
  date: string; // YYYY-MM-DD e.g. "2026-08-15"
  title: string;
  type: 'AIRWAYS_PASSENGER' | 'AIRWAYS_CARGO' | 'CRUISE_PASSENGER' | 'MARINE_CARGO';
  scope: 'Domestic' | 'International';
  operator: string;
  origin: string;
  destination: string;
  allocatedSpace: string;
  passengerOrShipper: string;
  priceUSD: number;
}

const SAMPLE_CALENDAR_EVENTS: CalendarEvent[] = [
  {
    id: 'PNR-AIR-90421',
    date: '2026-08-15',
    title: 'Air India AI-101 Flight',
    type: 'AIRWAYS_PASSENGER',
    scope: 'International',
    operator: 'Air India',
    origin: 'New Delhi (DEL)',
    destination: 'New York (JFK)',
    allocatedSpace: 'Seat 03A (First Class)',
    passengerOrShipper: 'Capt. Rajesh Sharma',
    priceUSD: 1680
  },
  {
    id: 'AWB-098-842109',
    date: '2026-08-18',
    title: 'Air India Freight Heavy Load',
    type: 'AIRWAYS_CARGO',
    scope: 'International',
    operator: 'Air India Cargo',
    origin: 'Mumbai (BOM)',
    destination: 'Frankfurt (FRA)',
    allocatedSpace: 'Pallet Position A12-A16',
    passengerOrShipper: 'Global Pharma Corp',
    priceUSD: 4250
  },
  {
    id: 'CRUISE-TKT-7712',
    date: '2026-08-20',
    title: 'Cordelia Empress Maldives Cruise',
    type: 'CRUISE_PASSENGER',
    scope: 'International',
    operator: 'Cordelia Cruises',
    origin: 'Mumbai Terminal',
    destination: 'Malé Atoll, Maldives',
    allocatedSpace: 'Ocean Balcony Deck 8 (#8042)',
    passengerOrShipper: 'Ananya Deshmukh',
    priceUSD: 980
  },
  {
    id: 'BOL-MAERSK-9042',
    date: '2026-08-25',
    title: 'Maersk 20ft Container Gate-In',
    type: 'MARINE_CARGO',
    scope: 'International',
    operator: 'Maersk Line',
    origin: 'Nhava Sheva (JNPT)',
    destination: 'Port of Rotterdam',
    allocatedSpace: 'Container #MSKU-8821094',
    passengerOrShipper: 'Oceanic Textile Exports',
    priceUSD: 2750
  },
  {
    id: 'PNR-IND-10294',
    date: '2026-08-28',
    title: 'IndiGo 6E-204 Coastal Express',
    type: 'AIRWAYS_PASSENGER',
    scope: 'Domestic',
    operator: 'IndiGo Airways',
    origin: 'Mumbai (BOM)',
    destination: 'Goa (GOI)',
    allocatedSpace: 'Seat 12F (Window)',
    passengerOrShipper: 'Rohan Mehta',
    priceUSD: 180
  }
];

export const BookingCalendarView: React.FC = () => {
  const { formatPrice } = useCurrency();

  const [currentYear, setCurrentYear] = useState<number>(2026);
  const [currentMonth, setCurrentMonth] = useState<number>(7); // 0-indexed: 7 = August
  const [filterType, setFilterType] = useState<string>('ALL');
  const [selectedDateStr, setSelectedDateStr] = useState<string | null>(null);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Helper to generate calendar grid for current month
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay(); // 0 = Sun

  const filteredEvents = SAMPLE_CALENDAR_EVENTS.filter((evt) => {
    if (filterType !== 'ALL' && evt.type !== filterType) return false;
    return true;
  });

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const getEventsForDay = (dayNum: number) => {
    const formattedDay = dayNum < 10 ? `0${dayNum}` : `${dayNum}`;
    const formattedMonth = currentMonth + 1 < 10 ? `0${currentMonth + 1}` : `${currentMonth + 1}`;
    const dateKey = `${currentYear}-${formattedMonth}-${formattedDay}`;
    return filteredEvents.filter((e) => e.date === dateKey);
  };

  // .ics Calendar File Export
  const handleExportIcsFile = () => {
    let icsContent = `BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//OceanBird Worldways//NONSGML v1.0//EN\n`;
    filteredEvents.forEach((evt) => {
      const formattedDate = evt.date.replace(/-/g, '');
      icsContent += `BEGIN:VEVENT\nSUMMARY:${evt.title} (${evt.id})\nDESCRIPTION:Operator: ${evt.operator} | Allocated: ${evt.allocatedSpace} | Shipper/Passenger: ${evt.passengerOrShipper}\nLOCATION:${evt.origin} to ${evt.destination}\nDTSTART:${formattedDate}T090000Z\nDTEND:${formattedDate}T180000Z\nSTATUS:CONFIRMED\nEND:VEVENT\n`;
    });
    icsContent += `END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `OceanBird_Booking_Calendar_${currentYear}_${currentMonth + 1}.ics`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const selectedDayEvents = selectedDateStr ? filteredEvents.filter((e) => e.date === selectedDateStr) : [];

  return (
    <div id="booking-calendar" className="space-y-8 animate-fadeIn font-sans text-white">
      {/* Top Banner Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 rounded-2xl p-6 border border-cyan-500/30 shadow-2xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 uppercase flex items-center space-x-1">
                <CalendarIcon className="w-3.5 h-3.5 text-cyan-400" />
                <span>MULTIMODAL BOOKING & MANIFEST CALENDAR</span>
              </span>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 uppercase">
                AUTO .ICS EXPORT
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white mt-2 flex items-center space-x-3">
              <CalendarIcon className="w-8 h-8 text-cyan-400" />
              <span>Interactive Booking Calendar</span>
            </h1>
            <p className="text-slate-400 text-xs mt-1 max-w-3xl font-sans">
              Schedule, track departure dates, view cabin & slot availability, and download unified calendar manifests (.ics) across airways flights, cruise voyages, and container gate-ins.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={handleExportIcsFile}
              className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs transition-all flex items-center space-x-2 shadow-lg shadow-cyan-500/20"
            >
              <Download className="w-4 h-4" />
              <span>EXPORT CALENDAR (.ICS)</span>
            </button>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-slate-400" />
            <span className="text-slate-400 font-bold uppercase text-[10px]">Category Filter:</span>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="bg-slate-950 text-white font-bold p-2 rounded-xl border border-slate-800 focus:outline-none focus:border-cyan-400"
            >
              <option value="ALL">ALL CATEGORIES</option>
              <option value="AIRWAYS_PASSENGER">✈️ Airways Passenger</option>
              <option value="AIRWAYS_CARGO">📦 Air Cargo Freight</option>
              <option value="CRUISE_PASSENGER">🚢 Cruise Voyages</option>
              <option value="MARINE_CARGO">⚓ Marine Cargo Containers</option>
            </select>
          </div>

          {/* Month Stepper */}
          <div className="flex items-center space-x-3 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
            <button
              onClick={handlePrevMonth}
              className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <strong className="text-white text-sm px-2">{monthNames[currentMonth]} {currentYear}</strong>
            <button
              onClick={handleNextMonth}
              className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* CALENDAR GRID */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 font-mono text-xs">
        {/* Days of week header */}
        <div className="grid grid-cols-7 gap-2 text-center text-[11px] font-bold text-cyan-400 uppercase border-b border-slate-800 pb-2">
          <div>Sun</div>
          <div>Mon</div>
          <div>Tue</div>
          <div>Wed</div>
          <div>Thu</div>
          <div>Fri</div>
          <div>Sat</div>
        </div>

        {/* Days cells */}
        <div className="grid grid-cols-7 gap-2">
          {/* Empty cells for offset */}
          {Array.from({ length: firstDayIndex }).map((_, idx) => (
            <div key={`empty-${idx}`} className="h-28 bg-slate-950/40 rounded-2xl border border-slate-800/40 opacity-30" />
          ))}

          {/* Day cells */}
          {Array.from({ length: daysInMonth }).map((_, idx) => {
            const dayNum = idx + 1;
            const dayEvents = getEventsForDay(dayNum);
            const formattedDay = dayNum < 10 ? `0${dayNum}` : `${dayNum}`;
            const formattedMonth = currentMonth + 1 < 10 ? `0${currentMonth + 1}` : `${currentMonth + 1}`;
            const dateStr = `${currentYear}-${formattedMonth}-${formattedDay}`;

            return (
              <div
                key={dayNum}
                onClick={() => setSelectedDateStr(dateStr)}
                className={`h-28 bg-slate-950 border p-2 rounded-2xl transition-all cursor-pointer flex flex-col justify-between hover:border-cyan-400/60 ${
                  selectedDateStr === dateStr ? 'border-cyan-400 ring-2 ring-cyan-500/20' : 'border-slate-800'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-black ${dayEvents.length > 0 ? 'text-cyan-400' : 'text-slate-500'}`}>
                    {dayNum}
                  </span>
                  {dayEvents.length > 0 && (
                    <span className="px-1.5 py-0.5 rounded-md bg-cyan-500/20 text-cyan-300 text-[9px] font-bold">
                      {dayEvents.length} Slot
                    </span>
                  )}
                </div>

                <div className="space-y-1 overflow-y-auto max-h-16">
                  {dayEvents.map((evt) => (
                    <div
                      key={evt.id}
                      className={`p-1 rounded-lg text-[9px] font-bold truncate ${
                        evt.type.startsWith('AIRWAYS')
                          ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                          : 'bg-teal-500/20 text-teal-300 border border-teal-500/30'
                      }`}
                    >
                      {evt.title}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* DAY MANIFEST DETAILS MODAL */}
      {selectedDateStr && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 font-mono text-xs">
          <div className="bg-slate-900 border border-cyan-500/50 rounded-3xl p-6 max-w-xl w-full text-white space-y-6 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center space-x-2">
                <CalendarIcon className="w-6 h-6 text-cyan-400" />
                <div>
                  <h3 className="text-lg font-black text-white">Scheduled Departure Manifest</h3>
                  <span className="text-cyan-400 text-xs">Date: {selectedDateStr}</span>
                </div>
              </div>

              <button
                onClick={() => setSelectedDateStr(null)}
                className="text-slate-400 hover:text-white font-bold p-1 rounded-lg bg-slate-800"
              >
                ✕ Close
              </button>
            </div>

            {selectedDayEvents.length === 0 ? (
              <div className="p-8 text-center bg-slate-950 rounded-2xl border border-slate-800 text-slate-400 space-y-2">
                <p>No scheduled departures or container gate-ins recorded for {selectedDateStr}.</p>
                <span className="text-cyan-400 text-xs block font-bold">Slot available for instant online booking.</span>
              </div>
            ) : (
              <div className="space-y-4">
                {selectedDayEvents.map((evt) => (
                  <div key={evt.id} className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <strong className="text-white text-sm font-bold">{evt.title}</strong>
                      <span className="text-cyan-300 font-bold">{evt.id}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[11px] bg-slate-900 p-3 rounded-xl border border-slate-800">
                      <div>
                        <span className="text-slate-500 text-[10px] block">OPERATOR</span>
                        <strong className="text-white">{evt.operator}</strong>
                      </div>
                      <div>
                        <span className="text-slate-500 text-[10px] block">PASSENGER / SHIPPER</span>
                        <strong className="text-teal-300">{evt.passengerOrShipper}</strong>
                      </div>
                      <div>
                        <span className="text-slate-500 text-[10px] block">ALLOCATED SPACE</span>
                        <strong className="text-amber-300">{evt.allocatedSpace}</strong>
                      </div>
                      <div>
                        <span className="text-slate-500 text-[10px] block">ROUTE</span>
                        <strong className="text-sky-300">{evt.origin} ➔ {evt.destination}</strong>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400">Paid Amount:</span>
                      <strong className="text-emerald-400 font-bold">{formatPrice(evt.priceUSD)}</strong>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedDateStr(null)}
                className="px-6 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-black text-xs"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
