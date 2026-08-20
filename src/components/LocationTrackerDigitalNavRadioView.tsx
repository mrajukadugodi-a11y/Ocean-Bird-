import React, { useState, useEffect } from 'react';
import {
  MapPin,
  Compass,
  Radio,
  Navigation,
  Signal,
  Volume2,
  VolumeX,
  Play,
  Square,
  AlertTriangle,
  RotateCcw,
  CheckCircle2,
  Crosshair,
  Sliders,
  Clock,
  Layers,
  Activity,
  Maximize2
} from 'lucide-react';

export interface RadioChannel {
  channelNumber: number;
  frequencyMhz: string;
  name: string;
  category: 'DISTRESS_SAFETY' | 'PORT_OPERATIONS' | 'NAVIGATION_SAFETY' | 'DSC' | 'PUBLIC_COMM';
  isDualWatch: boolean;
  statusText: string;
}

const VHF_CHANNELS: RadioChannel[] = [
  {
    channelNumber: 16,
    frequencyMhz: '156.800',
    name: 'International Distress, Safety & Calling',
    category: 'DISTRESS_SAFETY',
    isDualWatch: true,
    statusText: 'Continuous Guard Watch Active'
  },
  {
    channelNumber: 12,
    frequencyMhz: '156.600',
    name: 'Mumbai Port Control / Traffic Services (VTS)',
    category: 'PORT_OPERATIONS',
    isDualWatch: true,
    statusText: 'VTS Channel Standing By'
  },
  {
    channelNumber: 13,
    frequencyMhz: '156.650',
    name: 'Inter-ship Navigation Safety & Bridge-to-Bridge',
    category: 'NAVIGATION_SAFETY',
    isDualWatch: false,
    statusText: 'Navigational Communications'
  },
  {
    channelNumber: 6,
    frequencyMhz: '156.300',
    name: 'Primary Search & Rescue (SAR) Coordinated Operations',
    category: 'DISTRESS_SAFETY',
    isDualWatch: false,
    statusText: 'Coast Guard Standby'
  },
  {
    channelNumber: 70,
    frequencyMhz: '156.525',
    name: 'Digital Selective Calling (DSC) Automated Alerting',
    category: 'DSC',
    isDualWatch: true,
    statusText: 'Digital Receiver Armed'
  }
];

export interface WaypointItem {
  id: string;
  name: string;
  coordinates: string;
  distanceNm: number;
  bearingDeg: number;
  etaUtc: string;
  status: 'ACTIVE_NEXT' | 'COMPLETED' | 'PENDING';
}

const ROUTE_WAYPOINTS: WaypointItem[] = [
  {
    id: 'WP-01',
    name: 'Mumbai Outer Anchorage Pilot Fairway',
    coordinates: "18° 52.4' N, 072° 48.1' E",
    distanceNm: 0.0,
    bearingDeg: 0,
    etaUtc: 'PASSED 03:00 UTC',
    status: 'COMPLETED'
  },
  {
    id: 'WP-02',
    name: 'Jawaharlal Nehru Port Channel Entrance',
    coordinates: "18° 54.8' N, 072° 51.5' E",
    distanceNm: 4.2,
    bearingDeg: 48,
    etaUtc: '04:15 UTC (22 mins)',
    status: 'ACTIVE_NEXT'
  },
  {
    id: 'WP-03',
    name: 'NSFT Berth #2 Turn Basin',
    coordinates: "18° 57.2' N, 072° 56.0' E",
    distanceNm: 8.9,
    bearingDeg: 58,
    etaUtc: '05:30 UTC',
    status: 'PENDING'
  }
];

export const LocationTrackerDigitalNavRadioView: React.FC = () => {
  // Navigation & Location Tracker State
  const [currentLat, setCurrentLat] = useState<number>(18.932);
  const [currentLng, setCurrentLng] = useState<number>(72.845);
  const [sogKnots, setSogKnots] = useState<number>(14.8);
  const [cogTrue, setCogTrue] = useState<number>(48);
  const [gyroHeading, setGyroHeading] = useState<number>(47);
  const [xteMeters, setXteMeters] = useState<number>(12); // Cross-Track Error
  const [hdopPrecision, setHdopPrecision] = useState<number>(0.8); // GPS HDOP

  // Radio Frequency State
  const [activeChannelNum, setActiveChannelNum] = useState<number>(16);
  const [radioVolume, setRadioVolume] = useState<number>(0.8);
  const [squelch, setSquelch] = useState<number>(3);
  const [isTransmitting, setIsTransmitting] = useState<boolean>(false);
  const [isDualWatchActive, setIsDualWatchActive] = useState<boolean>(true);
  const [txPowerHigh, setTxPowerHigh] = useState<boolean>(true); // 25W High vs 1W Low

  const activeChannel = VHF_CHANNELS.find((c) => c.channelNumber === activeChannelNum) || VHF_CHANNELS[0];

  // Radio chatter simulation trigger
  const handleTestRadioTransmission = () => {
    setIsTransmitting(true);
    setTimeout(() => {
      setIsTransmitting(false);
    }, 2000);
  };

  return (
    <div id="location-tracker-digital-nav-radio-view" className="space-y-6 font-mono">
      {/* Top Banner Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center space-x-2 text-cyan-400 font-bold text-xs uppercase tracking-wider mb-1">
              <Navigation className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span>IMO SOLAS INTEGRATED BRIDGE SYSTEM (IBS) DIGITAL NAVIGATION</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center space-x-2">
              <Compass className="w-6 h-6 text-cyan-400" />
              <span>Location Tracker, Digital Nav & VHF Radio Monitor</span>
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl font-sans">
              Real-time GNSS positioning tracker, digital route steering cross-track error (XTE) computer, and dual-watch VHF marine radio frequency tuner.
            </p>
          </div>

          <div className="flex items-center space-x-3 font-mono text-xs">
            <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-center">
              <span className="text-[10px] text-slate-400 block uppercase">GNSS PRECISION</span>
              <strong className="text-emerald-400 text-sm">HDOP {hdopPrecision} (RTK FIX)</strong>
            </div>
            <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-center">
              <span className="text-[10px] text-slate-400 block uppercase">VHF GUARD WATCH</span>
              <strong className="text-rose-400 text-sm">CH 16 (156.800 MHz)</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Nav Tracker (Left 2 Spans) + VHF Radio Console (Right 1 Span) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Digital Navigation & Location Tracker Panel (2 Spans) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Real-time Telemetry Metrics Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl">
              <span className="text-[10px] text-slate-400 uppercase block">LAT / LNG POSITION</span>
              <strong className="text-cyan-300 text-sm block">{currentLat.toFixed(3)}° N</strong>
              <strong className="text-cyan-300 text-sm block">{currentLng.toFixed(3)}° E</strong>
            </div>

            <div className="p-3.5 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl">
              <span className="text-[10px] text-slate-400 uppercase block">SPEED OVER GROUND (SOG)</span>
              <strong className="text-amber-300 text-lg block">{sogKnots} Knots</strong>
              <span className="text-[10px] text-slate-500">Engine RPM: 106</span>
            </div>

            <div className="p-3.5 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl">
              <span className="text-[10px] text-slate-400 uppercase block">COURSE / GYRO HDG</span>
              <strong className="text-white text-lg block">{cogTrue}° TRUE</strong>
              <span className="text-[10px] text-slate-400">Gyro: {gyroHeading}° TRUE</span>
            </div>

            <div className="p-3.5 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl">
              <span className="text-[10px] text-slate-400 uppercase block">CROSS-TRACK ERROR (XTE)</span>
              <strong className="text-emerald-400 text-lg block">{xteMeters}m STARBOARD</strong>
              <span className="text-[10px] text-emerald-300">On Track Route</span>
            </div>
          </div>

          {/* Graphical Compass Rose & Digital Steering Indicator */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-4 text-center relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 text-xs">
              <span className="font-bold text-white flex items-center space-x-2">
                <Crosshair className="w-4 h-4 text-cyan-400" />
                <span>DIGITAL STEERING GUIDANCE & COMPASS TAPE</span>
              </span>
              <span className="text-amber-400">NEXT WAYPOINT: WP-02 (4.2 NM)</span>
            </div>

            {/* Simulated Digital Horizon Compass Rose Tape */}
            <div className="relative w-full h-36 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col items-center justify-center overflow-hidden my-2">
              <div className="absolute top-2 text-[10px] text-slate-500 uppercase tracking-widest">
                DIGITAL GYRO COMPASS (TRUE HEADING)
              </div>

              <div className="flex items-center justify-center space-x-8 text-lg font-extrabold text-slate-400 my-2">
                <span>020°</span>
                <span>030°</span>
                <div className="px-4 py-1.5 bg-cyan-500/20 border-2 border-cyan-400 text-cyan-200 text-2xl font-black rounded-xl shadow-xl animate-pulse">
                  048° TRUE
                </div>
                <span>060°</span>
                <span>070°</span>
              </div>

              <div className="text-xs text-emerald-400 flex items-center space-x-2 mt-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>STEERING ADVISORY: MAINTAIN HEADING 048° TRUE</span>
              </div>
            </div>

            {/* Waypoints Sequence List */}
            <div className="space-y-2 text-left">
              <h4 className="text-xs text-slate-400 font-bold uppercase">Active Flight Plan / Waypoint Leg Sequence</h4>
              <div className="space-y-2">
                {ROUTE_WAYPOINTS.map((wp) => {
                  const isActive = wp.status === 'ACTIVE_NEXT';

                  return (
                    <div
                      key={wp.id}
                      className={`p-3 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-2 ${
                        isActive
                          ? 'bg-cyan-950/60 border-cyan-500 text-cyan-200 font-bold ring-1 ring-cyan-500'
                          : 'bg-slate-950 border-slate-800 text-slate-300'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <span className="p-1.5 rounded bg-slate-900 border border-slate-800 text-[10px] text-cyan-400">
                          {wp.id}
                        </span>
                        <div>
                          <strong className="text-white block">{wp.name}</strong>
                          <span className="text-[10px] text-slate-400">{wp.coordinates}</span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4 text-right">
                        <div>
                          <span className="text-[10px] text-slate-500 block">DIST / BRG</span>
                          <strong>{wp.distanceNm} NM / {wp.bearingDeg}°</strong>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-500 block">ETA (UTC)</span>
                          <strong className={isActive ? 'text-amber-400' : 'text-slate-300'}>{wp.etaUtc}</strong>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* VHF Maritime Radio Frequency Console (1 Span) */}
        <div className="space-y-6">
          <div className="bg-slate-900 border-2 border-slate-800 rounded-2xl p-5 space-y-5 shadow-2xl relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-sm flex items-center space-x-2">
                <Radio className="w-4 h-4 text-rose-400" />
                <span>VHF Marine Transceiver</span>
              </h3>

              <span
                className={`px-2.5 py-0.5 rounded text-[10px] font-bold border ${
                  txPowerHigh ? 'bg-amber-500/20 border-amber-500 text-amber-300' : 'bg-slate-800 text-slate-400'
                }`}
              >
                {txPowerHigh ? 'PWR: 25W HIGH' : 'PWR: 1W LOW'}
              </span>
            </div>

            {/* Frequency LCD Screen Simulator */}
            <div className="p-4 bg-slate-950 border-2 border-cyan-500/60 rounded-2xl space-y-2 text-center shadow-2xl relative">
              <div className="flex items-center justify-between text-[10px] text-cyan-400">
                <span>DUPLEX / SIMPLEX</span>
                <span className="animate-pulse">DUAL WATCH ACTIVE</span>
              </div>

              <div className="text-4xl font-black text-cyan-300 tracking-wider">
                CH {activeChannel.channelNumber < 10 ? `0${activeChannel.channelNumber}` : activeChannel.channelNumber}
              </div>

              <div className="text-xs text-amber-300 font-bold">
                {activeChannel.frequencyMhz} MHz
              </div>

              <div className="text-[11px] text-slate-300 pt-1 border-t border-slate-800">
                {activeChannel.name}
              </div>

              {/* Transmission Indicator Banner */}
              {isTransmitting && (
                <div className="p-2 bg-rose-600 text-white font-extrabold text-xs rounded-xl animate-pulse">
                  🎙️ TRANSMITTING ON {activeChannel.frequencyMhz} MHz...
                </div>
              )}
            </div>

            {/* VHF Channel Selector Buttons */}
            <div className="space-y-2">
              <span className="text-xs text-slate-400 block font-bold uppercase">Quick Channel Presets:</span>
              <div className="space-y-1.5">
                {VHF_CHANNELS.map((ch) => {
                  const isChActive = ch.channelNumber === activeChannelNum;

                  return (
                    <button
                      key={ch.channelNumber}
                      onClick={() => setActiveChannelNum(ch.channelNumber)}
                      className={`w-full p-2.5 rounded-xl border text-left transition-all text-xs flex items-center justify-between ${
                        isChActive
                          ? 'bg-rose-950/60 border-rose-500 text-rose-200 font-bold'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-800'
                      }`}
                    >
                      <span>CH {ch.channelNumber} - {ch.frequencyMhz} MHz</span>
                      <span className="text-[10px] font-mono text-slate-400">{ch.category.replace('_', ' ')}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Radio Controls & PTT Button */}
            <div className="space-y-3 pt-2">
              <button
                onClick={handleTestRadioTransmission}
                className="w-full py-3 bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white font-extrabold text-xs rounded-xl shadow-xl flex items-center justify-center space-x-2"
              >
                <Radio className="w-4 h-4" />
                <span>PRESS TO TALK (PTT TEST)</span>
              </button>

              <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                <span>SQUELCH LEVEL: {squelch}</span>
                <button
                  onClick={() => setTxPowerHigh(!txPowerHigh)}
                  className="text-cyan-400 hover:underline"
                >
                  TOGGLE 25W / 1W
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
