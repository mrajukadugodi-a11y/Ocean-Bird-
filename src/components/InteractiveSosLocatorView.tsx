import React, { useState } from 'react';
import {
  Siren,
  Radio,
  MapPin,
  Compass,
  PhoneCall,
  ShieldAlert,
  Flame,
  LifeBuoy,
  Anchor,
  Send,
  Zap,
  CheckCircle2,
  Navigation,
  Crosshair,
  Volume2,
  AlertOctagon,
  Users
} from 'lucide-react';

export interface RescueStation {
  id: string;
  name: string;
  region: string;
  distanceNm: number;
  etaMinutes: number;
  contactVhf: string;
  emergencyPhone: string;
  assetsAvailable: string[];
  coordinates: string;
  status: 'ONLINE' | 'STANDBY';
}

const SAMPLE_RESCUE_STATIONS: RescueStation[] = [
  {
    id: 'MRCC-BOM',
    name: 'MRCC Mumbai (Indian Coast Guard West Command)',
    region: 'Arabian Sea & West Coast India',
    distanceNm: 12.4,
    etaMinutes: 18,
    contactVhf: 'VHF Ch 16 / DSC 70',
    emergencyPhone: '+91 22 2431 6558 / 1554',
    assetsAvailable: ['ICGS Vikram Offshore Patrol Vessel', 'C-154 Fast Interceptor', 'Chetak SAR Helicopter'],
    coordinates: '18.9220° N, 72.8347° E',
    status: 'ONLINE'
  },
  {
    id: 'MRCC-SIN',
    name: 'Singapore Port Authority Rescue Centre (POCC)',
    region: 'Singapore Strait & Malacca Maritime Zone',
    distanceNm: 45.1,
    etaMinutes: 35,
    contactVhf: 'VHF Ch 16 / 14',
    emergencyPhone: '+65 6325 2488',
    assetsAvailable: ['RSAF Super Puma Helicopter', 'MPA Rescue Craft 02', 'Tug Ocean Hercules'],
    coordinates: '1.290270° N, 103.851959° E',
    status: 'ONLINE'
  },
  {
    id: 'MRCC-DXB',
    name: 'UAE Coast Guard Command Mina Rashid',
    region: 'Persian Gulf & Gulf of Oman',
    distanceNm: 88.0,
    etaMinutes: 50,
    contactVhf: 'VHF Ch 16 / DSC 2182kHz',
    emergencyPhone: '+971 4 345 9999 / 996',
    assetsAvailable: ['CG Falcon 50 Rescue Boat', 'Search & Rescue Eurocopter'],
    coordinates: '25.276987° N, 55.296249° E',
    status: 'ONLINE'
  },
  {
    id: 'MRCC-CPT',
    name: 'NSRI Station 3 Table Bay (Cape Town SAR)',
    region: 'Atlantic South Africa Coast',
    distanceNm: 120.5,
    etaMinutes: 75,
    contactVhf: 'VHF Ch 16 / Cape Town Radio',
    emergencyPhone: '+27 21 449 3500 / 112',
    assetsAvailable: ['Class 1 ORC Rescue Boat', 'Air Force Orion Patrol Aircraft'],
    coordinates: '33.9249° S, 18.4241° E',
    status: 'STANDBY'
  }
];

export const InteractiveSosLocatorView: React.FC = () => {
  const [beaconActive, setBeaconActive] = useState<boolean>(false);
  const [currentGps, setCurrentGps] = useState<string>('18° 55\' 12" N, 72° 50\' 04" E (Arabian Sea Off Mumbai Harbor)');
  const [distressType, setDistressType] = useState<string>('MEDICAL_EMERGENCY');
  const [vesselName, setVesselName] = useState<string>('OceanBird Vessel OB-904');
  const [personsOnBoard, setPersonsOnBoard] = useState<number>(14);
  const [additionalDetails, setAdditionalDetails] = useState<string>('Requires immediate helicopter evacuation for crew member with acute chest pain.');

  const [sosSentSuccess, setSosSentSuccess] = useState<boolean>(false);
  const [selectedStation, setSelectedStation] = useState<RescueStation | null>(SAMPLE_RESCUE_STATIONS[0]);

  const handleTriggerSosBeacon = (e: React.FormEvent) => {
    e.preventDefault();
    setBeaconActive(true);
    setSosSentSuccess(true);

    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(1000, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.4, audioCtx.currentTime);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.8);
    } catch (err) {
      console.warn('Audio contextual playback failed', err);
    }
  };

  return (
    <div id="interactive-sos-locator" className="space-y-8 animate-fadeIn font-sans text-white">
      {/* Beacon Active Alert Overlay Header */}
      {beaconActive && (
        <div className="bg-red-600 p-1 rounded-3xl shadow-2xl animate-pulse">
          <div className="bg-slate-950 p-6 rounded-[22px] flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <Siren className="w-10 h-10 text-red-500 animate-spin" />
              <div>
                <span className="px-2.5 py-0.5 rounded-md bg-red-500/20 text-red-400 font-mono text-[10px] font-bold border border-red-500/30 uppercase">
                  🚨 COSPAS-SARSAT MAYDAY BEACON BROADCASTING
                </span>
                <h2 className="text-xl font-black text-white mt-1">EMERGENCY SOS DISTRESS SIGNAL ACTIVE</h2>
                <p className="text-red-300 font-mono text-xs mt-0.5">
                  GPS: {currentGps} | Transmitting on 406.025 MHz SatCom & VHF Ch 16
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={() => setBeaconActive(false)}
                className="px-5 py-2.5 bg-slate-900 border border-slate-700 hover:bg-slate-800 text-white font-mono font-bold text-xs rounded-xl"
              >
                CANCEL BEACON SIGNAL
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Top Banner Header */}
      <div className="bg-gradient-to-r from-red-950 via-slate-950 to-slate-900 rounded-3xl p-6 sm:p-8 border border-red-500/40 shadow-2xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-red-500/20 text-red-300 border border-red-500/30 uppercase flex items-center space-x-1">
                <Siren className="w-3.5 h-3.5 text-red-400" />
                <span>MARITIME & AVIATION EMERGENCY DISPATCH</span>
              </span>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 uppercase">
                24/7 MRCC DIRECT LINK
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white mt-2 flex items-center space-x-3">
              <ShieldAlert className="w-8 h-8 text-red-500" />
              <span>Interactive SOS & Rescue Station Locator</span>
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-3xl font-sans">
              Instant emergency Mayday beacon dispatch, real-time GPS distress coordinate broadcast, and radar locator for nearby Coast Guard stations and search & rescue (SAR) vessels.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <a
              href="tel:1554"
              className="px-5 py-3 rounded-2xl bg-red-600 hover:bg-red-500 text-white font-black text-xs transition-all flex items-center space-x-2 shadow-lg shadow-red-600/30 animate-pulse"
            >
              <PhoneCall className="w-4 h-4" />
              <span>DIRECT MAYDAY CALL (1554)</span>
            </a>
          </div>
        </div>

        {/* GPS Location & Telemetry Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-slate-950 p-4 rounded-2xl border border-slate-800 font-mono text-xs">
          <div>
            <span className="text-slate-500 text-[10px] block">CURRENT VESSEL GPS LOCATION</span>
            <strong className="text-red-400 font-bold text-xs flex items-center space-x-1 mt-0.5">
              <Crosshair className="w-3.5 h-3.5 text-red-500" />
              <span className="truncate">{currentGps}</span>
            </strong>
          </div>
          <div>
            <span className="text-slate-500 text-[10px] block">PRIMARY DISTRESS CHANNEL</span>
            <strong className="text-amber-300 font-bold text-xs block mt-0.5">VHF Channel 16 / 121.5 MHz Airband</strong>
          </div>
          <div>
            <span className="text-slate-500 text-[10px] block">NEAREST COAST GUARD</span>
            <strong className="text-sky-300 font-bold text-xs block mt-0.5">MRCC Mumbai (12.4 NM away)</strong>
          </div>
          <div>
            <span className="text-slate-500 text-[10px] block">SAR HELICOPTER ETA</span>
            <strong className="text-emerald-400 font-bold text-xs block mt-0.5">18 Minutes (Rapid Flight)</strong>
          </div>
        </div>
      </div>

      {/* MAIN LAYOUT: SOS TRANSMITTER FORM & NEARBY RESCUE RADAR */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 font-mono text-xs">
        {/* LEFT FORM: SOS DISPATCH FORM */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-xl">
          <div className="flex items-center space-x-2 border-b border-slate-800 pb-3">
            <Radio className="w-5 h-5 text-red-500" />
            <h2 className="text-base font-bold text-white">Broadcast Emergency SOS Incident</h2>
          </div>

          <form onSubmit={handleTriggerSosBeacon} className="space-y-4">
            <div className="space-y-1">
              <label className="text-slate-400 font-bold uppercase text-[10px]">Vessel / Aircraft ID *</label>
              <input
                type="text"
                required
                value={vesselName}
                onChange={(e) => setVesselName(e.target.value)}
                className="w-full bg-slate-950 text-white font-bold p-2.5 rounded-xl border border-slate-800 focus:outline-none focus:border-red-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-slate-400 font-bold uppercase text-[10px]">Emergency Category *</label>
              <select
                value={distressType}
                onChange={(e) => setDistressType(e.target.value)}
                className="w-full bg-slate-950 text-white font-bold p-2.5 rounded-xl border border-slate-800 focus:outline-none focus:border-red-500"
              >
                <option value="MEDICAL_EMERGENCY">🚑 Medical Emergency / AirEvac Needed</option>
                <option value="ENGINE_FAILURE">⚓ Propulsion / Steering Blackout</option>
                <option value="FIRE_ON_BOARD">🔥 Fire on Board / Hazmat Spill</option>
                <option value="MAN_OVERBOARD">🏊 Man Overboard (MOB Alert)</option>
                <option value="COLLISION_FLOODING">🌊 Vessel Collision or Hull Flooding</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-slate-400 font-bold uppercase text-[10px]">Persons On Board (POB)</label>
                <input
                  type="number"
                  min={1}
                  value={personsOnBoard}
                  onChange={(e) => setPersonsOnBoard(Number(e.target.value))}
                  className="w-full bg-slate-950 text-white font-bold p-2.5 rounded-xl border border-slate-800 focus:outline-none focus:border-red-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-400 font-bold uppercase text-[10px]">Signal Protocol</label>
                <input
                  type="text"
                  disabled
                  value="COSPAS 406MHz + AIS"
                  className="w-full bg-slate-950 text-slate-500 font-bold p-2.5 rounded-xl border border-slate-800"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-slate-400 font-bold uppercase text-[10px]">Distress Description</label>
              <textarea
                rows={3}
                value={additionalDetails}
                onChange={(e) => setAdditionalDetails(e.target.value)}
                className="w-full bg-slate-950 text-white font-sans text-xs p-2.5 rounded-xl border border-slate-800 focus:outline-none focus:border-red-500"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-red-600 via-rose-600 to-red-600 hover:from-red-500 hover:to-red-500 text-white font-black text-sm tracking-wider uppercase flex items-center justify-center space-x-2 shadow-2xl shadow-red-600/40"
              >
                <Siren className="w-5 h-5 animate-pulse" />
                <span>TRANSMIT SOS DISTRESS BEACON</span>
              </button>
            </div>
          </form>

          {sosSentSuccess && (
            <div className="bg-emerald-500/20 border border-emerald-500/30 p-4 rounded-2xl text-emerald-300 space-y-1">
              <strong className="font-bold block">✓ SOS Beacon Dispatched Successfully!</strong>
              <p className="text-[11px] text-emerald-200">
                MRCC Command Center has acknowledged your distress packet. Emergency responder craft dispatched to coordinates {currentGps}.
              </p>
            </div>
          )}
        </div>

        {/* RIGHT RADAR: NEARBY COAST GUARD & SAR STATIONS */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <Compass className="w-5 h-5 text-sky-400" />
                <h2 className="text-base font-bold text-white">Nearby Coast Guard & SAR Stations</h2>
              </div>
              <span className="text-slate-400 text-[10px]">Sorted by Nautical Proximity</span>
            </div>

            <div className="space-y-4">
              {SAMPLE_RESCUE_STATIONS.map((st) => (
                <div
                  key={st.id}
                  onClick={() => setSelectedStation(st)}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer space-y-3 ${
                    selectedStation?.id === st.id
                      ? 'bg-sky-500/10 border-sky-400 text-white ring-1 ring-sky-400'
                      : 'bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-300'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="px-2 py-0.5 rounded-md bg-sky-500/20 text-sky-300 text-[9px] font-bold border border-sky-500/30 uppercase">
                        {st.status}
                      </span>
                      <h3 className="text-sm font-bold text-white mt-1">{st.name}</h3>
                      <span className="text-slate-400 text-[10px]">{st.region}</span>
                    </div>

                    <div className="text-right">
                      <strong className="text-emerald-400 font-bold text-sm block">{st.distanceNm} NM</strong>
                      <span className="text-slate-400 text-[10px]">ETA: {st.etaMinutes} mins</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 bg-slate-900 p-3 rounded-xl border border-slate-800/80 text-[10px]">
                    <div>
                      <span className="text-slate-500 block">RADIO VHF:</span>
                      <strong className="text-amber-300">{st.contactVhf}</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 block">HOTLINE PHONE:</span>
                      <strong className="text-sky-300">{st.emergencyPhone}</strong>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {st.assetsAvailable.map((asset, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-slate-900 text-slate-400 text-[9px]">
                        🚁 {asset}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
