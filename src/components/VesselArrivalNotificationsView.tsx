import React, { useState, useEffect } from 'react';
import {
  Bell,
  Ship,
  Plane,
  Anchor,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Radio,
  Send,
  Filter,
  Smartphone,
  Mail,
  Zap,
  Volume2,
  VolumeX,
  MapPin,
  RefreshCw,
  Plus
} from 'lucide-react';

export interface VesselArrivalNotice {
  id: string;
  vesselName: string;
  type: 'CONTAINER' | 'CRUISE' | 'AIR_FREIGHT' | 'TANKER' | 'BULK_CARRIER';
  imoOrFlight: string;
  port: string;
  terminalBerth: string;
  scheduledEta: string; // ISO string or formatted
  currentStatus: 'APPROACHING' | 'DOCKED' | 'ANCHORED' | 'DELAYED' | 'DISCHARGING';
  etaMinutesRemaining: number;
  originPort: string;
  operator: string;
  cargoSummary: string;
  isSubscribed: boolean;
}

const SAMPLE_ARRIVALS: VesselArrivalNotice[] = [
  {
    id: 'ARR-MAERSK-01',
    vesselName: 'Maersk Mc-Kinney Møller',
    type: 'CONTAINER',
    imoOrFlight: 'IMO 9632064',
    port: 'Nhava Sheva (JNPT) - Mumbai',
    terminalBerth: 'Berth BM-02 (JNPCT)',
    scheduledEta: '2026-08-02 14:30 UTC',
    currentStatus: 'APPROACHING',
    etaMinutesRemaining: 45,
    originPort: 'Port of Rotterdam (NL)',
    operator: 'Maersk Line',
    cargoSummary: '18,270 TEU General Freight & Electronics',
    isSubscribed: true
  },
  {
    id: 'ARR-CORDELIA-02',
    vesselName: 'Cordelia Empress Cruise',
    type: 'CRUISE',
    imoOrFlight: 'IMO 8821049',
    port: 'Mumbai International Cruise Terminal',
    terminalBerth: 'Passenger Quay East',
    scheduledEta: '2026-08-02 16:00 UTC',
    currentStatus: 'APPROACHING',
    etaMinutesRemaining: 135,
    originPort: 'Mormugao Port, Goa',
    operator: 'Cordelia Cruises',
    cargoSummary: '1,420 Passengers & Luxury Baggage',
    isSubscribed: true
  },
  {
    id: 'ARR-CARGOLUX-03',
    vesselName: 'Air India Cargo B777-F',
    type: 'AIR_FREIGHT',
    imoOrFlight: 'Flight AI-9012',
    port: 'Chhatrapati Shivaji Intl Airport (BOM)',
    terminalBerth: 'Cargo Apron Bay C4',
    scheduledEta: '2026-08-02 15:15 UTC',
    currentStatus: 'APPROACHING',
    etaMinutesRemaining: 90,
    originPort: 'Frankfurt Airport (FRA)',
    operator: 'Air India Cargo',
    cargoSummary: '85 Tons High-Tech & Pharma Freight',
    isSubscribed: false
  },
  {
    id: 'ARR-EVERGREEN-04',
    vesselName: 'Ever Given Maritime',
    type: 'CONTAINER',
    imoOrFlight: 'IMO 9811000',
    port: 'Port of Singapore',
    terminalBerth: 'Pasir Panjang Terminal Berth 12',
    scheduledEta: '2026-08-02 18:45 UTC',
    currentStatus: 'ANCHORED',
    etaMinutesRemaining: 300,
    originPort: 'Shanghai Port (CN)',
    operator: 'Evergreen Marine',
    cargoSummary: '20,120 TEU Heavy Industrial Goods',
    isSubscribed: false
  },
  {
    id: 'ARR-GCC-05',
    vesselName: 'Saudi Ras Tanura Tanker',
    type: 'TANKER',
    imoOrFlight: 'IMO 9754120',
    port: 'Mina Rashid - Dubai',
    terminalBerth: 'Petroleum Dock 01',
    scheduledEta: '2026-08-02 13:00 UTC',
    currentStatus: 'DOCKED',
    etaMinutesRemaining: 0,
    originPort: 'Ras Tanura (SA)',
    operator: 'Bahri Oil Lines',
    cargoSummary: '310,000 DWT Crude Oil Cargo',
    isSubscribed: true
  }
];

export const VesselArrivalNotificationsView: React.FC = () => {
  const [arrivals, setArrivals] = useState<VesselArrivalNotice[]>(SAMPLE_ARRIVALS);
  const [filterType, setFilterType] = useState<string>('ALL');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [notificationChannel, setNotificationChannel] = useState<'SMS' | 'EMAIL' | 'PUSH' | 'SATCOM'>('PUSH');
  const [recipientContact, setRecipientContact] = useState<string>('+91 98210 90421 / dispatch@oceanbird.com');

  // Custom alert creation state
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [newVesselName, setNewVesselName] = useState<string>('');
  const [newImoOrFlight, setNewImoOrFlight] = useState<string>('');
  const [newPort, setNewPort] = useState<string>('Nhava Sheva (JNPT) - Mumbai');

  // Live Toast Notification Simulation State
  const [activeToastAlert, setActiveToastAlert] = useState<string | null>(null);

  // Countdown timer simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setArrivals((prev) =>
        prev.map((v) => {
          if (v.etaMinutesRemaining > 0) {
            const nextMinutes = v.etaMinutesRemaining - 1;
            if (nextMinutes === 0 && v.isSubscribed) {
              triggerArrivalAlert(v);
            }
            return { ...v, etaMinutesRemaining: nextMinutes };
          }
          return v;
        })
      );
    }, 60000); // every 1 min simulated tick

    return () => clearInterval(interval);
  }, []);

  const triggerArrivalAlert = (vessel: VesselArrivalNotice) => {
    const msg = `🚨 VESSEL ARRIVAL ALERT: ${vessel.vesselName} (${vessel.imoOrFlight}) has docked at ${vessel.port} [${vessel.terminalBerth}]! Dispatching channel notice via ${notificationChannel}.`;
    setActiveToastAlert(msg);

    if (soundEnabled) {
      try {
        const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, audioCtx.currentTime);
        gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.4);
      } catch (e) {
        console.warn('Audio contextual playback failed', e);
      }
    }
  };

  const toggleSubscription = (id: string) => {
    setArrivals((prev) =>
      prev.map((v) => {
        if (v.id === id) {
          const updated = !v.isSubscribed;
          if (updated) {
            setActiveToastAlert(`Subscribed to real-time arrival alerts for ${v.vesselName} via ${notificationChannel}.`);
          }
          return { ...v, isSubscribed: updated };
        }
        return v;
      })
    );
  };

  const handleAddVesselAlert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVesselName) return;

    const newNotice: VesselArrivalNotice = {
      id: `ARR-CUSTOM-${Math.floor(1000 + Math.random() * 9000)}`,
      vesselName: newVesselName,
      type: 'CONTAINER',
      imoOrFlight: newImoOrFlight || 'IMO 9902148',
      port: newPort,
      terminalBerth: 'Berth Outer Anchorage',
      scheduledEta: '2026-08-02 20:00 UTC',
      currentStatus: 'APPROACHING',
      etaMinutesRemaining: 120,
      originPort: 'Hong Kong Port (HK)',
      operator: 'OceanBird Custom Line',
      cargoSummary: 'Tracked Priority Cargo Slot',
      isSubscribed: true
    };

    setArrivals([newNotice, ...arrivals]);
    setShowAddModal(false);
    setNewVesselName('');
    setNewImoOrFlight('');
    setActiveToastAlert(`Vessel Arrival Alert configured for ${newNotice.vesselName}! You will receive notifications on arrival.`);
  };

  const filteredArrivals = arrivals.filter((a) => {
    if (filterType === 'ALL') return true;
    return a.type === filterType;
  });

  return (
    <div id="vessel-arrival-notifications" className="space-y-8 animate-fadeIn font-sans text-white">
      {/* Toast Alert Banner */}
      {activeToastAlert && (
        <div className="bg-gradient-to-r from-amber-500 via-emerald-500 to-cyan-500 p-0.5 rounded-2xl shadow-2xl animate-bounce">
          <div className="bg-slate-950 p-4 rounded-[14px] flex items-center justify-between font-mono text-xs text-white">
            <div className="flex items-center space-x-3">
              <Zap className="w-5 h-5 text-amber-400 shrink-0" />
              <span className="font-bold">{activeToastAlert}</span>
            </div>
            <button
              onClick={() => setActiveToastAlert(null)}
              className="text-slate-400 hover:text-white font-black bg-slate-900 px-2 py-1 rounded-lg"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* Top Banner Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 rounded-3xl p-6 sm:p-8 border border-amber-500/30 shadow-2xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 uppercase flex items-center space-x-1">
                <Bell className="w-3.5 h-3.5 text-amber-400" />
                <span>REAL-TIME VESSEL & FLIGHT ARRIVAL NOTIFICATIONS</span>
              </span>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 uppercase">
                SATCOM & AIS TELEMETRY
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white mt-2 flex items-center space-x-3">
              <Ship className="w-8 h-8 text-amber-400" />
              <span>Vessel Arrival Alerts & Dispatch Feeds</span>
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-3xl font-sans">
              Set automated ETA countdown alerts, berth assignment notifications, and pilotage boarding broadcasts for container ships, airways cargo, and cruise passenger liners.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition-all flex items-center space-x-2 shadow-lg shadow-amber-500/20"
            >
              <Plus className="w-4 h-4" />
              <span>TRACK NEW VESSEL ARRIVAL</span>
            </button>
          </div>
        </div>

        {/* Dispatch Settings Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-slate-950 p-4 rounded-2xl border border-slate-800 font-mono text-xs">
          <div className="space-y-1">
            <label className="text-slate-400 font-bold uppercase text-[10px] flex items-center space-x-1">
              <Radio className="w-3.5 h-3.5 text-amber-400" />
              <span>Notification Method</span>
            </label>
            <select
              value={notificationChannel}
              onChange={(e) => setNotificationChannel(e.target.value as any)}
              className="w-full bg-slate-900 text-white font-bold p-2.5 rounded-xl border border-slate-800 focus:outline-none focus:border-amber-400"
            >
              <option value="PUSH">📱 Push App Alert</option>
              <option value="SMS">💬 Cellular SMS Broadcast</option>
              <option value="EMAIL">📧 Email Dispatch</option>
              <option value="SATCOM">📡 Satellite SatCom VHF Channel</option>
            </select>
          </div>

          <div className="space-y-1 lg:col-span-2">
            <label className="text-slate-400 font-bold uppercase text-[10px] flex items-center space-x-1">
              <Smartphone className="w-3.5 h-3.5 text-cyan-400" />
              <span>Dispatch Contact & Address</span>
            </label>
            <input
              type="text"
              value={recipientContact}
              onChange={(e) => setRecipientContact(e.target.value)}
              className="w-full bg-slate-900 text-white font-bold p-2.5 rounded-xl border border-slate-800 focus:outline-none focus:border-amber-400"
            />
          </div>

          <div className="space-y-1">
            <label className="text-slate-400 font-bold uppercase text-[10px] flex items-center space-x-1">
              {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-emerald-400" /> : <VolumeX className="w-3.5 h-3.5 text-slate-500" />}
              <span>Audio Chime</span>
            </label>
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`w-full p-2.5 rounded-xl font-bold border transition-all ${
                soundEnabled ? 'bg-emerald-500/20 border-emerald-500/30 text-emerald-300' : 'bg-slate-900 border-slate-800 text-slate-500'
              }`}
            >
              {soundEnabled ? '🔊 Audio Chime ON' : '🔇 Muted'}
            </button>
          </div>
        </div>
      </div>

      {/* FILTER BUTTONS & ARRIVALS GRID */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-slate-400" />
            <span className="text-slate-400 font-bold uppercase text-[10px]">Filter Category:</span>
            <div className="flex flex-wrap gap-1.5">
              {['ALL', 'CONTAINER', 'CRUISE', 'AIR_FREIGHT', 'TANKER'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilterType(cat)}
                  className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                    filterType === cat
                      ? 'bg-amber-500 text-slate-950'
                      : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => {
              triggerArrivalAlert(arrivals[0]);
            }}
            className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-400 border border-amber-500/30 font-bold flex items-center space-x-1.5"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Simulate Live Arrival Signal</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 font-mono text-xs">
          {filteredArrivals.map((vessel) => {
            const isDocked = vessel.currentStatus === 'DOCKED';
            const hoursLeft = Math.floor(vessel.etaMinutesRemaining / 60);
            const minsLeft = vessel.etaMinutesRemaining % 60;

            return (
              <div
                key={vessel.id}
                className={`bg-slate-900 border rounded-3xl p-6 space-y-4 transition-all duration-300 shadow-xl ${
                  vessel.isSubscribed ? 'border-amber-500/50 shadow-amber-500/5' : 'border-slate-800'
                }`}
              >
                {/* Header */}
                <div className="flex items-start justify-between border-b border-slate-800 pb-3">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 text-[9px] font-bold border border-amber-500/30 uppercase">
                        {vessel.type}
                      </span>
                      <span className="text-slate-400 text-[10px]">{vessel.imoOrFlight}</span>
                    </div>
                    <h3 className="text-lg font-bold text-white mt-1">{vessel.vesselName}</h3>
                    <span className="text-slate-400 text-[10px] block">{vessel.operator}</span>
                  </div>

                  <div className="text-right">
                    <span
                      className={`px-3 py-1 rounded-full text-[10px] font-black uppercase inline-block ${
                        isDocked
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                      }`}
                    >
                      {vessel.currentStatus}
                    </span>
                    <span className="text-slate-400 text-[10px] block mt-1">
                      {isDocked ? 'Docked at Quay' : `ETA: ${hoursLeft}h ${minsLeft}m`}
                    </span>
                  </div>
                </div>

                {/* Port & Terminal Details */}
                <div className="grid grid-cols-2 gap-3 bg-slate-950 p-4 rounded-2xl border border-slate-800 text-[11px]">
                  <div>
                    <span className="text-slate-500 text-[10px] block">DESTINATION PORT</span>
                    <strong className="text-sky-300 flex items-center space-x-1">
                      <MapPin className="w-3 h-3 text-sky-400 shrink-0" />
                      <span>{vessel.port}</span>
                    </strong>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[10px] block">ASSIGNED BERTH / APON</span>
                    <strong className="text-amber-300">{vessel.terminalBerth}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[10px] block">DEPARTURE ORIGIN</span>
                    <strong className="text-slate-300">{vessel.originPort}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[10px] block">CARGO / PASSENGER</span>
                    <strong className="text-teal-300 truncate block">{vessel.cargoSummary}</strong>
                  </div>
                </div>

                {/* Subscription Action Button */}
                <div className="flex items-center justify-between pt-1">
                  <span className="text-slate-400 text-[10px]">
                    {vessel.isSubscribed ? '🔔 Alerts Active via ' + notificationChannel : '🔕 Alerts Paused'}
                  </span>

                  <button
                    onClick={() => toggleSubscription(vessel.id)}
                    className={`px-4 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center space-x-2 ${
                      vessel.isSubscribed
                        ? 'bg-amber-500 text-slate-950 font-black shadow-md shadow-amber-500/20'
                        : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'
                    }`}
                  >
                    <Bell className="w-4 h-4" />
                    <span>{vessel.isSubscribed ? 'SUBSCRIBED (ACTIVE)' : '+ NOTIFY ME ON ARRIVAL'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ADD VESSEL ALERT MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 font-mono text-xs">
          <div className="bg-slate-900 border border-amber-500/50 rounded-3xl p-6 max-w-md w-full text-white space-y-6 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <Bell className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-bold text-white">Track Custom Vessel Arrival</h3>
              </div>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 bg-slate-800 p-1 rounded-lg">
                ✕
              </button>
            </div>

            <form onSubmit={handleAddVesselAlert} className="space-y-4">
              <div className="space-y-1">
                <label className="text-slate-300 font-bold text-[10px] uppercase">Vessel / Aircraft Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. MSC Valentina Cargo"
                  value={newVesselName}
                  onChange={(e) => setNewVesselName(e.target.value)}
                  className="w-full bg-slate-950 text-white font-bold p-2.5 rounded-xl border border-slate-800 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-bold text-[10px] uppercase">IMO Number / Flight CallSign</label>
                <input
                  type="text"
                  placeholder="e.g. IMO 9801249"
                  value={newImoOrFlight}
                  onChange={(e) => setNewImoOrFlight(e.target.value)}
                  className="w-full bg-slate-950 text-white font-bold p-2.5 rounded-xl border border-slate-800 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-bold text-[10px] uppercase">Destination Port</label>
                <select
                  value={newPort}
                  onChange={(e) => setNewPort(e.target.value)}
                  className="w-full bg-slate-950 text-white font-bold p-2.5 rounded-xl border border-slate-800 focus:outline-none focus:border-amber-400"
                >
                  <option value="Nhava Sheva (JNPT) - Mumbai">Nhava Sheva (JNPT) - Mumbai</option>
                  <option value="Mumbai International Cruise Terminal">Mumbai Cruise Terminal</option>
                  <option value="Port of Singapore">Port of Singapore</option>
                  <option value="Mina Rashid - Dubai">Mina Rashid - Dubai</option>
                  <option value="Port of Rotterdam">Port of Rotterdam</option>
                </select>
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-black"
                >
                  Save Notification
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
