import React, { useState } from 'react';
import {
  Users,
  CheckCircle2,
  MapPin,
  Building2,
  Send,
  Calendar,
  Clock,
  ShieldCheck,
  Heart,
  HelpCircle,
  Award,
  ChevronRight,
  FileCheck,
  Zap,
  Check
} from 'lucide-react';

export interface PortAccessibilityFacility {
  portId: string;
  portName: string;
  cityCountry: string;
  certificationLevel: 'ADA Compliance Level 3' | 'ISO 21902 Universal Maritime Standard' | 'Gold Certified';
  wheelchairRamps: boolean;
  gangwayElevators: boolean;
  tactilePavingBraille: boolean;
  lowFloorBusses: boolean;
  accessibleRestrooms: boolean;
  medicalRestLounge: boolean;
  berthBuggyShuttle: boolean;
  cargoWorkerErgonomics: boolean;
  contactDeskPhone: string;
}

const SAMPLE_ACCESSIBLE_PORTS: PortAccessibilityFacility[] = [
  {
    portId: 'PORT-BOM-01',
    portName: 'Mumbai International Cruise Terminal (MICT)',
    cityCountry: 'Mumbai, India',
    certificationLevel: 'ISO 21902 Universal Maritime Standard',
    wheelchairRamps: true,
    gangwayElevators: true,
    tactilePavingBraille: true,
    lowFloorBusses: true,
    accessibleRestrooms: true,
    medicalRestLounge: true,
    berthBuggyShuttle: true,
    cargoWorkerErgonomics: true,
    contactDeskPhone: '+91 22 6656 4000 (Ext. 42)'
  },
  {
    portId: 'PORT-SIN-02',
    portName: 'Marina Bay Cruise Centre Singapore (MBCCS)',
    cityCountry: 'Singapore',
    certificationLevel: 'Gold Certified',
    wheelchairRamps: true,
    gangwayElevators: true,
    tactilePavingBraille: true,
    lowFloorBusses: true,
    accessibleRestrooms: true,
    medicalRestLounge: true,
    berthBuggyShuttle: true,
    cargoWorkerErgonomics: true,
    contactDeskPhone: '+65 6304 7788'
  },
  {
    portId: 'PORT-DXB-03',
    portName: 'Mina Rashid Terminal 3 Dubai',
    cityCountry: 'Dubai, UAE',
    certificationLevel: 'ADA Compliance Level 3',
    wheelchairRamps: true,
    gangwayElevators: true,
    tactilePavingBraille: true,
    lowFloorBusses: true,
    accessibleRestrooms: true,
    medicalRestLounge: true,
    berthBuggyShuttle: true,
    cargoWorkerErgonomics: true,
    contactDeskPhone: '+971 4 308 6000'
  },
  {
    portId: 'PORT-RTM-04',
    portName: 'Port of Rotterdam Passenger Quay',
    cityCountry: 'Rotterdam, Netherlands',
    certificationLevel: 'ISO 21902 Universal Maritime Standard',
    wheelchairRamps: true,
    gangwayElevators: true,
    tactilePavingBraille: true,
    lowFloorBusses: true,
    accessibleRestrooms: true,
    medicalRestLounge: true,
    berthBuggyShuttle: true,
    cargoWorkerErgonomics: true,
    contactDeskPhone: '+31 10 252 1010'
  }
];

export const PortAccessibilityView: React.FC = () => {
  const [selectedPort, setSelectedPort] = useState<PortAccessibilityFacility>(SAMPLE_ACCESSIBLE_PORTS[0]);

  // Special Assistance Request Form
  const [passengerName, setPassengerName] = useState<string>('');
  const [bookingPnr, setBookingPnr] = useState<string>('');
  const [arrivalDate, setArrivalDate] = useState<string>('2026-08-15');
  const [assistanceType, setAssistanceType] = useState<string>('WHEELCHAIR_GANGWAY');
  const [medicalDetails, setMedicalDetails] = useState<string>('Requires wheelchair assistance from cruise gangway to luggage terminal and taxi bay.');
  const [requestSubmitted, setRequestSubmitted] = useState<boolean>(false);

  const handleSpecialAssistanceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRequestSubmitted(true);
  };

  return (
    <div id="port-accessibility-view" className="space-y-8 animate-fadeIn font-sans text-white">
      {/* Top Banner Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 rounded-3xl p-6 sm:p-8 border border-teal-500/30 shadow-2xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-teal-500/20 text-teal-300 border border-teal-500/30 uppercase flex items-center space-x-1">
                <Heart className="w-3.5 h-3.5 text-teal-400" />
                <span>UNIVERSAL ACCESSIBILITY & SPECIAL ASSISTANCE</span>
              </span>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-sky-500/20 text-sky-300 border border-sky-500/30 uppercase">
                ISO 21902 CERTIFIED
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white mt-2 flex items-center space-x-3">
              <Users className="w-8 h-8 text-teal-400" />
              <span>Port & Terminal Accessibility Guide</span>
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-3xl font-sans">
              Complete accessibility infrastructure standards, gangway elevator specs, electric buggies, and pre-arranged special assistance bookings for passengers and port workers.
            </p>
          </div>
        </div>

        {/* Feature Highlights Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-slate-950 p-4 rounded-2xl border border-slate-800 font-mono text-xs">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Gangway Elevators</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Low-Floor Port Buggies</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Tactile Braille Routes</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Medical Rest Lounges</span>
          </div>
        </div>
      </div>

      {/* PORT ACCESSIBILITY COMPARISON & SPECIAL ASSISTANCE PORTAL */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 font-mono text-xs">
        {/* LEFT: PORT DIRECTORY & AUDIT */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
            <h2 className="text-base font-bold text-white border-b border-slate-800 pb-3 flex items-center space-x-2">
              <Building2 className="w-5 h-5 text-teal-400" />
              <span>Verified Port Accessibility Infrastructure</span>
            </h2>

            <div className="space-y-4">
              {SAMPLE_ACCESSIBLE_PORTS.map((port) => (
                <div
                  key={port.portId}
                  onClick={() => setSelectedPort(port)}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer space-y-3 ${
                    selectedPort.portId === port.portId
                      ? 'bg-teal-500/10 border-teal-400 text-white ring-1 ring-teal-400'
                      : 'bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-300'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="px-2 py-0.5 rounded-md bg-teal-500/20 text-teal-300 text-[9px] font-bold border border-teal-500/30 uppercase">
                        {port.certificationLevel}
                      </span>
                      <h3 className="text-sm font-bold text-white mt-1">{port.portName}</h3>
                      <span className="text-slate-400 text-[10px]">{port.cityCountry}</span>
                    </div>

                    <span className="text-sky-300 text-[10px] font-bold">{port.contactDeskPhone}</span>
                  </div>

                  {/* Checklist icons */}
                  <div className="grid grid-cols-2 gap-2 text-[10px] bg-slate-900 p-3 rounded-xl border border-slate-800">
                    <div className="flex items-center space-x-1.5 text-emerald-300">
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Wheelchair Ramps & Gangways</span>
                    </div>
                    <div className="flex items-center space-x-1.5 text-emerald-300">
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Hydraulic Gangway Elevators</span>
                    </div>
                    <div className="flex items-center space-x-1.5 text-emerald-300">
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Tactile Braille Paving</span>
                    </div>
                    <div className="flex items-center space-x-1.5 text-emerald-300">
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Electric Buggy Shuttles</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT: SPECIAL ASSISTANCE REQUEST FORM */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-xl">
          <div className="flex items-center space-x-2 border-b border-slate-800 pb-3">
            <Heart className="w-5 h-5 text-teal-400" />
            <h2 className="text-base font-bold text-white">Book Free Special Assistance</h2>
          </div>

          <form onSubmit={handleSpecialAssistanceSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-slate-400 font-bold uppercase text-[10px]">Passenger / Worker Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Mrs. Eleanor Vance"
                value={passengerName}
                onChange={(e) => setPassengerName(e.target.value)}
                className="w-full bg-slate-950 text-white font-bold p-2.5 rounded-xl border border-slate-800 focus:outline-none focus:border-teal-400"
              />
            </div>

            <div className="space-y-1">
              <label className="text-slate-400 font-bold uppercase text-[10px]">Booking Reference / PNR</label>
              <input
                type="text"
                placeholder="e.g. PNR-AIR-90421"
                value={bookingPnr}
                onChange={(e) => setBookingPnr(e.target.value)}
                className="w-full bg-slate-950 text-white font-bold p-2.5 rounded-xl border border-slate-800 focus:outline-none focus:border-teal-400"
              />
            </div>

            <div className="space-y-1">
              <label className="text-slate-400 font-bold uppercase text-[10px]">Arrival Date at Terminal</label>
              <input
                type="date"
                value={arrivalDate}
                onChange={(e) => setArrivalDate(e.target.value)}
                className="w-full bg-slate-950 text-white font-bold p-2.5 rounded-xl border border-slate-800 focus:outline-none focus:border-teal-400"
              />
            </div>

            <div className="space-y-1">
              <label className="text-slate-400 font-bold uppercase text-[10px]">Assistance Category *</label>
              <select
                value={assistanceType}
                onChange={(e) => setAssistanceType(e.target.value)}
                className="w-full bg-slate-950 text-white font-bold p-2.5 rounded-xl border border-slate-800 focus:outline-none focus:border-teal-400"
              >
                <option value="WHEELCHAIR_GANGWAY">♿ Wheelchair & Gangway Ramp escort</option>
                <option value="ELECTRIC_BUGGY">🛺 Electric Terminal Buggy shuttle</option>
                <option value="PRIORITY_CUSTOMS">🛂 Priority Customs & Medical Clearance</option>
                <option value="OXYGEN_MEDICAL">🩺 Oxygen & Medical Escort Support</option>
                <option value="CARGO_ERGONOMICS">📦 Ergonomic Cargo Lift for Disabled Worker</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-slate-400 font-bold uppercase text-[10px]">Additional Notes / Requirements</label>
              <textarea
                rows={3}
                value={medicalDetails}
                onChange={(e) => setMedicalDetails(e.target.value)}
                className="w-full bg-slate-950 text-white font-sans text-xs p-2.5 rounded-xl border border-slate-800 focus:outline-none focus:border-teal-400"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-black text-xs transition-all uppercase flex items-center justify-center space-x-2 shadow-lg shadow-teal-500/20"
            >
              <Send className="w-4 h-4" />
              <span>CONFIRM SPECIAL ASSISTANCE REQUEST</span>
            </button>
          </form>

          {requestSubmitted && (
            <div className="bg-emerald-500/20 border border-emerald-500/30 p-4 rounded-2xl text-emerald-300 space-y-1">
              <strong className="font-bold block">✓ Assistance Request Dispatched!</strong>
              <p className="text-[11px] text-emerald-200">
                Port Accessibility Desk at {selectedPort.portName} has received your request. A dedicated port concierge agent will meet you at the arrival terminal.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
