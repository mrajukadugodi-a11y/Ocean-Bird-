import React, { useState } from 'react';
import {
  Compass,
  MapPin,
  Calendar,
  Plane,
  Ship,
  Hotel,
  Clock,
  DollarSign,
  Plus,
  Trash2,
  CheckCircle2,
  Download,
  Share2,
  Sparkles,
  ArrowRight,
  Luggage,
  ShieldCheck,
  User,
  Navigation,
  FileSpreadsheet,
  Printer
} from 'lucide-react';

export interface TripLeg {
  id: string;
  type: 'flight' | 'cruise' | 'ferry' | 'hotel' | 'activity';
  title: string;
  provider: string;
  origin: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
  costUSD: number;
  confirmationCode: string;
  status: 'Confirmed' | 'Pending' | 'Draft';
}

export const TripPlannerView: React.FC = () => {
  const [tripName, setTripName] = useState('Global Asia-Pacific & European Multi-Modal Expedition');
  const [startDate, setStartDate] = useState('2026-09-15');
  const [endDate, setEndDate] = useState('2026-09-30');
  const [travelersCount, setTravelersCount] = useState(2);
  const [currency, setCurrency] = useState('USD');

  const [legs, setLegs] = useState<TripLeg[]>([
    {
      id: 'LEG-1',
      type: 'flight',
      title: 'International Flight: London Heathrow (LHR) to Singapore Changi (SIN)',
      provider: 'Singapore Airlines (SQ 317)',
      origin: 'London (LHR)',
      destination: 'Singapore (SIN)',
      departureTime: '2026-09-15 11:25 AM',
      arrivalTime: '2026-09-16 07:30 AM',
      costUSD: 1250,
      confirmationCode: 'SQ-984210',
      status: 'Confirmed'
    },
    {
      id: 'LEG-2',
      type: 'hotel',
      title: 'Luxury Marina Bay Sands Stay (2 Nights)',
      provider: 'Marina Bay Sands Singapore',
      origin: 'Singapore Downtown',
      destination: 'Marina Bay',
      departureTime: '2026-09-16 03:00 PM',
      arrivalTime: '2026-09-18 11:00 AM',
      costUSD: 890,
      confirmationCode: 'MBS-77192',
      status: 'Confirmed'
    },
    {
      id: 'LEG-3',
      type: 'cruise',
      title: 'OceanBird Explorer Cruise: Singapore -> Phuket -> Langkawi -> Penang',
      provider: 'OceanBird Maritime Luxury Fleet',
      origin: 'Singapore Cruise Centre',
      destination: 'Phuket & Malacca Strait',
      departureTime: '2026-09-18 04:00 PM',
      arrivalTime: '2026-09-24 08:00 AM',
      costUSD: 2400,
      confirmationCode: 'OB-CR-4091',
      status: 'Confirmed'
    },
    {
      id: 'LEG-4',
      type: 'flight',
      title: 'Regional Flight: Penang (PEN) to Tokyo Haneda (HND)',
      provider: 'Japan Airlines (JL 724)',
      origin: 'Penang (PEN)',
      destination: 'Tokyo (HND)',
      departureTime: '2026-09-24 01:15 PM',
      arrivalTime: '2026-09-24 09:45 PM',
      costUSD: 680,
      confirmationCode: 'JAL-30921',
      status: 'Confirmed'
    }
  ]);

  // New leg state
  const [newType, setNewType] = useState<'flight' | 'cruise' | 'ferry' | 'hotel' | 'activity'>('flight');
  const [newTitle, setNewTitle] = useState('');
  const [newProvider, setNewProvider] = useState('');
  const [newOrigin, setNewOrigin] = useState('');
  const [newDestination, setNewDestination] = useState('');
  const [newDepTime, setNewDepTime] = useState('');
  const [newArrTime, setNewArrTime] = useState('');
  const [newCost, setNewCost] = useState(350);

  const handleAddLeg = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const item: TripLeg = {
      id: `LEG-${Date.now().toString().slice(-4)}`,
      type: newType,
      title: newTitle,
      provider: newProvider || 'Custom Operator',
      origin: newOrigin || 'Origin Port/City',
      destination: newDestination || 'Destination Port/City',
      departureTime: newDepTime || '2026-09-25 10:00 AM',
      arrivalTime: newArrTime || '2026-09-25 02:00 PM',
      costUSD: Number(newCost) || 0,
      confirmationCode: `RES-${Math.floor(100000 + Math.random() * 900000)}`,
      status: 'Confirmed'
    };

    setLegs([...legs, item]);
    setNewTitle('');
    setNewProvider('');
    setNewOrigin('');
    setNewDestination('');
  };

  const handleRemoveLeg = (id: string) => {
    setLegs(legs.filter(l => l.id !== id));
  };

  const totalCostUSD = legs.reduce((acc, curr) => acc + curr.costUSD, 0);

  const getTypeIcon = (type: TripLeg['type']) => {
    switch (type) {
      case 'flight':
        return <Plane className="w-4 h-4 text-sky-400" />;
      case 'cruise':
      case 'ferry':
        return <Ship className="w-4 h-4 text-teal-400" />;
      case 'hotel':
        return <Hotel className="w-4 h-4 text-amber-400" />;
      default:
        return <Compass className="w-4 h-4 text-purple-400" />;
    }
  };

  return (
    <div className="space-y-6 text-slate-100 font-sans p-4 sm:p-6 bg-slate-950 min-h-screen">
      {/* HEADER BANNER */}
      <div className="bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 border border-sky-500/30 rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <Plane className="w-48 h-48 text-sky-400" />
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-sky-500/20 text-sky-300 border border-sky-500/30 flex items-center space-x-1.5">
                <Sparkles className="w-3.5 h-3.5 text-sky-400" />
                <span>AI MULTI-MODAL TRIP PLANNER</span>
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                OFFLINE SYNC READY
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">{tripName}</h1>
            <p className="text-slate-300 text-xs sm:text-sm max-w-2xl font-mono">
              Build, optimize, and organize seamless multi-leg journeys combining international flights, luxury ocean cruises, island ferries, and resort stays with automated budget estimation.
            </p>
          </div>

          <div className="flex items-center space-x-3 shrink-0">
            <button
              onClick={() => alert('Exporting PDF itinerary package...')}
              className="px-4 py-2.5 rounded-2xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs font-mono transition-all shadow-lg flex items-center space-x-2"
            >
              <Download className="w-4 h-4" />
              <span>EXPORT PDF</span>
            </button>
            <button
              onClick={() => alert('Sharing itinerary access link...')}
              className="px-4 py-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white border border-slate-700 font-bold text-xs font-mono transition-all flex items-center space-x-2"
            >
              <Share2 className="w-4 h-4 text-sky-400" />
              <span>SHARE TRIP</span>
            </button>
          </div>
        </div>

        {/* TRIP SUMMARY STATS */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-800 font-mono text-xs">
          <div className="bg-slate-950/80 p-3 rounded-2xl border border-slate-800">
            <span className="text-slate-400 text-[10px] block uppercase">Total Estimated Budget</span>
            <span className="text-emerald-400 font-black text-lg">${totalCostUSD.toLocaleString()} USD</span>
          </div>
          <div className="bg-slate-950/80 p-3 rounded-2xl border border-slate-800">
            <span className="text-slate-400 text-[10px] block uppercase">Total Journey Legs</span>
            <span className="text-sky-300 font-black text-lg">{legs.length} Segments</span>
          </div>
          <div className="bg-slate-950/80 p-3 rounded-2xl border border-slate-800">
            <span className="text-slate-400 text-[10px] block uppercase">Travelers Count</span>
            <span className="text-amber-300 font-black text-lg">{travelersCount} Passengers</span>
          </div>
          <div className="bg-slate-950/80 p-3 rounded-2xl border border-slate-800">
            <span className="text-slate-400 text-[10px] block uppercase">Journey Dates</span>
            <span className="text-purple-300 font-black text-xs truncate block">{startDate} to {endDate}</span>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT: TIMELINE & ADD LEG */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT 2 COLUMNS: ITINERARY TIMELINE */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h2 className="text-lg font-bold text-white flex items-center space-x-2 font-mono">
                <Navigation className="w-5 h-5 text-sky-400" />
                <span>Multi-Modal Itinerary Timeline</span>
              </h2>
              <span className="text-xs text-slate-400 font-mono">Order by departure chronological sequence</span>
            </div>

            <div className="space-y-4 relative before:absolute before:inset-0 before:left-6 before:w-0.5 before:bg-slate-800">
              {legs.map((leg, index) => (
                <div key={leg.id} className="relative pl-12 space-y-2">
                  {/* Timeline icon node */}
                  <div className="absolute left-3 top-1 -translate-x-1/2 w-7 h-7 rounded-full bg-slate-950 border border-slate-700 flex items-center justify-center shadow-md z-10">
                    {getTypeIcon(leg.type)}
                  </div>

                  <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-3 hover:border-sky-500/40 transition-all shadow-md">
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2 font-mono text-[10px]">
                          <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300 font-bold uppercase">
                            {leg.type.toUpperCase()}
                          </span>
                          <span className="text-sky-400 font-bold">{leg.provider}</span>
                          <span className="text-slate-500">Ref: {leg.confirmationCode}</span>
                        </div>
                        <h3 className="text-sm font-bold text-white">{leg.title}</h3>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="text-emerald-400 font-black font-mono text-sm block">${leg.costUSD}</span>
                        <button
                          onClick={() => handleRemoveLeg(leg.id)}
                          className="text-rose-400 hover:text-rose-300 p-1 rounded transition-all mt-1"
                          title="Remove Leg"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono bg-slate-900/60 p-2.5 rounded-xl border border-slate-800/80">
                      <div className="space-y-0.5">
                        <span className="text-slate-500 text-[10px] block">DEPARTURE</span>
                        <span className="text-slate-200 font-bold">{leg.origin}</span>
                        <span className="text-slate-400 text-[10px] block">{leg.departureTime}</span>
                      </div>
                      <div className="space-y-0.5">
                        <span className="text-slate-500 text-[10px] block">ARRIVAL</span>
                        <span className="text-slate-200 font-bold">{leg.destination}</span>
                        <span className="text-slate-400 text-[10px] block">{leg.arrivalTime}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: ADD NEW LEG FORM */}
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl font-mono text-xs">
            <h2 className="text-sm font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-3">
              <Plus className="w-4 h-4 text-emerald-400" />
              <span>Add Voyage or Flight Segment</span>
            </h2>

            <form onSubmit={handleAddLeg} className="space-y-3">
              <div className="space-y-1">
                <label className="text-slate-400 font-bold uppercase text-[10px]">Segment Type *</label>
                <select
                  value={newType}
                  onChange={(e) => setNewType(e.target.value as any)}
                  className="w-full bg-slate-950 text-white font-bold p-2.5 rounded-xl border border-slate-800 focus:outline-none focus:border-sky-400"
                >
                  <option value="flight">✈ Flight (Airline)</option>
                  <option value="cruise">⚓ Cruise Ship</option>
                  <option value="ferry">🚢 Island Ferry</option>
                  <option value="hotel">🏨 Hotel / Resort Stay</option>
                  <option value="activity">🎯 Guided Tour / Activity</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-slate-400 font-bold uppercase text-[10px]">Segment Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Flight Tokyo to Sydney"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-slate-950 text-white font-bold p-2.5 rounded-xl border border-slate-800 focus:outline-none focus:border-sky-400"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-400 font-bold uppercase text-[10px]">Operator / Provider</label>
                <input
                  type="text"
                  placeholder="e.g. Qantas / OceanBird Fleet"
                  value={newProvider}
                  onChange={(e) => setNewProvider(e.target.value)}
                  className="w-full bg-slate-950 text-white font-bold p-2.5 rounded-xl border border-slate-800 focus:outline-none focus:border-sky-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-slate-400 font-bold uppercase text-[10px]">Origin Port/City</label>
                  <input
                    type="text"
                    placeholder="Tokyo HND"
                    value={newOrigin}
                    onChange={(e) => setNewOrigin(e.target.value)}
                    className="w-full bg-slate-950 text-white font-bold p-2.5 rounded-xl border border-slate-800 focus:outline-none focus:border-sky-400"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-400 font-bold uppercase text-[10px]">Destination</label>
                  <input
                    type="text"
                    placeholder="Sydney SYD"
                    value={newDestination}
                    onChange={(e) => setNewDestination(e.target.value)}
                    className="w-full bg-slate-950 text-white font-bold p-2.5 rounded-xl border border-slate-800 focus:outline-none focus:border-sky-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-slate-400 font-bold uppercase text-[10px]">Departure Date/Time</label>
                  <input
                    type="text"
                    placeholder="2026-09-26 09:00"
                    value={newDepTime}
                    onChange={(e) => setNewDepTime(e.target.value)}
                    className="w-full bg-slate-950 text-white font-bold p-2.5 rounded-xl border border-slate-800 focus:outline-none focus:border-sky-400"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-400 font-bold uppercase text-[10px]">Cost ($ USD)</label>
                  <input
                    type="number"
                    value={newCost}
                    onChange={(e) => setNewCost(Number(e.target.value))}
                    className="w-full bg-slate-950 text-white font-bold p-2.5 rounded-xl border border-slate-800 focus:outline-none focus:border-sky-400"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-2xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-black uppercase transition-all shadow-md flex items-center justify-center space-x-2 mt-2"
              >
                <Plus className="w-4 h-4" />
                <span>ADD TO ITINERARY</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
