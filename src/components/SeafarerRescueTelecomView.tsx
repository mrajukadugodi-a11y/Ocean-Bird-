import React, { useState, useEffect, useRef } from 'react';
import {
  COAST_GUARD_UNITS,
  EMERGENCY_SOS_SIGNALS,
  TELECOM_ROOM_SESSIONS,
} from '../data/southAsiaData';
import { CoastGuardRescueUnit, EmergencySosSignal, TelecomRoomSession } from '../types';
import {
  PhoneCall,
  Video,
  Mic,
  MicOff,
  VideoOff,
  Radio,
  LifeBuoy,
  AlertTriangle,
  ShieldAlert,
  Satellite,
  Volume2,
  VolumeX,
  Share2,
  Users,
  Activity,
  Heart,
  Send,
  Plus,
  CheckCircle2,
  Clock,
  MapPin,
  Anchor,
  Compass,
  FileText,
  PhoneForwarded,
  Signal,
  Wifi,
  Sparkles,
} from 'lucide-react';

export const SeafarerRescueTelecomView: React.FC = () => {
  // Emergency Rescue Contacts & SOS State
  const [selectedCoastGuard, setSelectedCoastGuard] = useState<CoastGuardRescueUnit>(COAST_GUARD_UNITS[0]);
  const [sosList, setSosList] = useState<EmergencySosSignal[]>(EMERGENCY_SOS_SIGNALS);
  const [sosSentSuccess, setSosSentSuccess] = useState(false);

  // New SOS Form State
  const [sosVesselName, setSosVesselName] = useState('');
  const [sosMmsi, setSosMmsi] = useState('');
  const [sosDistressType, setSosDistressType] = useState<EmergencySosSignal['distressType']>('Adverse Weather / Capsizing');
  const [sosPersons, setSosPersons] = useState(12);
  const [sosLat, setSosLat] = useState('18.94');
  const [sosLng, setSosLng] = useState('72.83');
  const [sosSeaBody, setSosSeaBody] = useState('Arabian Sea (Mumbai Offshore)');

  // Tele-Communication Voice & Video State
  const [activeTelecomSession, setActiveTelecomSession] = useState<TelecomRoomSession>(TELECOM_ROOM_SESSIONS[0]);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [activeSatProvider, setActiveSatProvider] = useState<'Starlink Maritime' | 'Inmarsat FleetBroadband' | 'Iridium Certus'>('Starlink Maritime');

  // Video Room Simulated Chat / Transcripts
  const [chatMessages, setChatMessages] = useState<Array<{ id: string; sender: string; text: string; time: string; type: 'system' | 'user' | 'medical' }>>([
    { id: 'm1', sender: 'MRCC Mumbai Command', text: 'Channel 16 VHF Satellite Link established. All seafarers on standby.', time: '21:40 UTC', type: 'system' },
    { id: 'm2', sender: 'Dr. Sharma (Tele-Medicine)', text: 'Tele-medicine clinic online for vessel crew medical triage.', time: '21:42 UTC', type: 'medical' },
    { id: 'm3', sender: 'Capt. Deshmukh (MV Bengal Explorer)', text: 'Wave swells reaching 3.8m. Requesting updated cyclone trajectory.', time: '21:45 UTC', type: 'user' },
  ]);
  const [inputMsg, setInputMsg] = useState('');

  // Audio Waveform Random Animation
  const [waveHeights, setWaveHeights] = useState<number[]>([40, 65, 30, 80, 95, 50, 70, 35, 90, 60, 45, 85]);

  useEffect(() => {
    const interval = setInterval(() => {
      setWaveHeights(Array.from({ length: 12 }, () => Math.floor(Math.random() * 70) + 20));
    }, 250);
    return () => clearInterval(interval);
  }, []);

  const handleSendSos = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sosVesselName.trim()) return;

    const newSos: EmergencySosSignal = {
      id: `SOS-${Math.floor(Math.random() * 900 + 100)}`,
      vesselName: sosVesselName,
      vesselType: 'Commercial Vessel',
      mmsiNumber: sosMmsi || '419998811',
      flagNation: 'International Flag 🏳️',
      currentLat: parseFloat(sosLat) || 18.94,
      currentLng: parseFloat(sosLng) || 72.83,
      distressType: sosDistressType,
      personsOnBoard: Number(sosPersons) || 1,
      status: 'BROADCASTING DISTRESS',
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16) + ' UTC',
      seaBody: sosSeaBody,
      nearestPort: 'Nearest Regional MRCC Base',
    };

    setSosList([newSos, ...sosList]);
    setSosSentSuccess(true);
    setSosVesselName('');
    setSosMmsi('');

    // Add to chat transcripts as system alert
    setChatMessages((prev) => [
      ...prev,
      {
        id: `sys-${Date.now()}`,
        sender: 'MAYDAY SOS BROADCAST',
        text: `CRITICAL DISTRESS ALERT: ${newSos.vesselName} (${newSos.distressType}) at Lat ${newSos.currentLat}, Lng ${newSos.currentLng}. ${newSos.personsOnBoard} POB.`,
        time: 'JUST NOW',
        type: 'system',
      },
    ]);

    setTimeout(() => {
      setSosSentSuccess(false);
    }, 5000);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;

    const newMsg = {
      id: `msg-${Date.now()}`,
      sender: 'Seafarer Station (You)',
      text: inputMsg.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'user' as const,
    };

    setChatMessages((prev) => [...prev, newMsg]);
    setInputMsg('');
  };

  return (
    <div id="seafarer-rescue-telecom-view" className="space-y-8 animate-fadeIn">
      {/* Top Banner Header */}
      <div className="bg-gradient-to-r from-slate-900 via-rose-950/40 to-slate-900 rounded-2xl p-6 border border-rose-900/50 shadow-2xl text-white">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-rose-400 font-semibold text-xs mb-1">
              <LifeBuoy className="w-4 h-4 animate-spin text-rose-400" />
              <span>SOUTH ASIA SEAFARER EMERGENCY RESCUE & SATELLITE TELECOM HUB</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white flex items-center space-x-3">
              <span>Seafarer Emergency Rescue & Tele-Communication</span>
            </h1>
            <p className="text-slate-300 text-sm mt-1">
              Direct 24x7 Coast Guard Hotlines across 5 maritime South Asian nations, instant Mayday distress beacon dispatch, and live satellite voice/video hosting.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={`tel:${selectedCoastGuard.hotline24x7.split('/')[0].trim()}`}
              className="flex items-center space-x-2 px-5 py-3 rounded-xl bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white font-extrabold text-sm shadow-xl shadow-rose-600/30 transition-all hover:scale-105"
            >
              <PhoneCall className="w-5 h-5 animate-bounce" />
              <span>DIAL 24x7 EMERGENCY: {selectedCoastGuard.hotline24x7.split('/')[0]}</span>
            </a>
          </div>
        </div>
      </div>

      {/* SECTION 1: TELE-COMMUNICATION VOICE & VIDEO HOSTING CONSOLE */}
      <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 text-white space-y-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center space-x-2 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-1">
              <Video className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span>ENCRYPTED SATELLITE WEBRTC TELE-CONFERENCE</span>
            </div>
            <h2 className="text-xl font-bold text-white flex items-center space-x-2">
              <span>Live Voice & Video Hosting Console</span>
            </h2>
            <p className="text-xs text-slate-400">
              Host high-definition video consultations with MRCC Dispatchers, Port Captains, and Tele-Medicine Surgeons at sea.
            </p>
          </div>

          {/* Session Switcher Tabs */}
          <div className="flex flex-wrap items-center gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
            {TELECOM_ROOM_SESSIONS.map((session) => (
              <button
                key={session.id}
                onClick={() => setActiveTelecomSession(session)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
                  activeTelecomSession.id === session.id
                    ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Radio className="w-3.5 h-3.5" />
                <span>{session.channelName.split(' ')[0]} {session.channelName.split(' ')[1]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Video Screen Layout & Tele-Medicine Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Interactive Video Feed Box (2 Cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="relative w-full h-[320px] sm:h-[400px] bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 flex flex-col justify-between p-4 shadow-2xl">
              {/* Simulated Video Overlay Background */}
              {isVideoOn ? (
                <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-slate-900 to-sky-950/80 flex items-center justify-center">
                  {/* Grid Lines & Camera HUD Frame */}
                  <div className="absolute inset-0 border-2 border-cyan-500/20 pointer-events-none" />
                  <div className="text-center space-y-3 z-10 p-6 bg-slate-900/60 backdrop-blur-md rounded-2xl border border-slate-800 max-w-md">
                    <div className="relative inline-block">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-cyan-500 to-sky-400 p-1 mx-auto shadow-lg shadow-cyan-500/30">
                        <img
                          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
                          alt="Doctor / Dispatcher"
                          className="w-full h-full rounded-full object-cover"
                        />
                      </div>
                      <span className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-emerald-500 border-2 border-slate-950 animate-ping" />
                    </div>
                    <div>
                      <h3 className="font-bold text-base text-white">{activeTelecomSession.hostName}</h3>
                      <p className="text-xs text-cyan-400 font-semibold">{activeTelecomSession.hostType} • {activeTelecomSession.frequency}</p>
                    </div>

                    {/* Live Vitals Indicator for Tele-Medicine */}
                    {activeTelecomSession.hostType === 'Tele-Medicine Doctor' && (
                      <div className="flex items-center justify-around bg-slate-950/80 p-2.5 rounded-xl border border-slate-800 text-xs">
                        <div className="flex items-center space-x-1 text-rose-400">
                          <Heart className="w-3.5 h-3.5 animate-pulse" />
                          <span>HR: 78 BPM</span>
                        </div>
                        <div className="text-emerald-400 font-bold">SpO2: 98%</div>
                        <div className="text-sky-400 font-bold">Temp: 37.1°C</div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="absolute inset-0 bg-slate-950 flex items-center justify-center text-slate-500">
                  <div className="text-center space-y-2">
                    <VideoOff className="w-12 h-12 mx-auto text-slate-600" />
                    <div className="text-sm font-semibold">Video Camera Off</div>
                    <div className="text-xs text-slate-600">Voice-Only Encrypted Audio Stream Active</div>
                  </div>
                </div>
              )}

              {/* Video Top Bar Controls & Telemetry */}
              <div className="relative z-10 flex items-center justify-between bg-slate-900/80 backdrop-blur-md p-3 rounded-xl border border-slate-800 text-xs">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
                  <span className="font-extrabold text-white uppercase tracking-wider">{activeTelecomSession.channelName}</span>
                </div>

                <div className="flex items-center space-x-3 text-slate-300">
                  <span className="flex items-center space-x-1 text-emerald-400">
                    <Wifi className="w-3.5 h-3.5" />
                    <span className="font-mono">{activeTelecomSession.latencyMs} ms</span>
                  </span>
                  <span className="flex items-center space-x-1 text-cyan-400">
                    <Users className="w-3.5 h-3.5" />
                    <span>{activeTelecomSession.activeParticipants} On Air</span>
                  </span>
                </div>
              </div>

              {/* Audio Waveform Bar (Bottom Overlay) */}
              <div className="relative z-10 flex items-center justify-between bg-slate-900/90 backdrop-blur-md p-3 rounded-xl border border-slate-800">
                {/* Simulated Audio Waveform Bars */}
                <div className="flex items-center space-x-1 h-6">
                  {waveHeights.map((h, i) => (
                    <div
                      key={i}
                      className="w-1 bg-gradient-to-t from-cyan-500 to-sky-300 rounded-full transition-all duration-200"
                      style={{ height: isMicOn ? `${h}%` : '15%' }}
                    />
                  ))}
                  <span className="text-[10px] text-slate-400 font-mono ml-2">
                    {isMicOn ? 'AUDIO TRANSMITTING' : 'MIC MUTED'}
                  </span>
                </div>

                {/* Satellite Bandwidth Selector */}
                <div className="flex items-center space-x-2 text-xs">
                  <Satellite className="w-4 h-4 text-amber-400 animate-spin" />
                  <select
                    value={activeSatProvider}
                    onChange={(e: any) => setActiveSatProvider(e.target.value)}
                    className="bg-slate-950 text-amber-300 font-bold border border-slate-700 rounded-lg px-2 py-1 text-xs focus:outline-none"
                  >
                    <option value="Starlink Maritime">Starlink Maritime (220 Mbps)</option>
                    <option value="Inmarsat FleetBroadband">Inmarsat FleetBroadband (432 kbps)</option>
                    <option value="Iridium Certus">Iridium Certus 700 (704 kbps)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Video & Voice Action Control Buttons Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-950 p-4 rounded-2xl border border-slate-800">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsMicOn(!isMicOn)}
                  className={`p-3 rounded-xl font-bold text-xs flex items-center space-x-2 transition-all ${
                    isMicOn
                      ? 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'
                      : 'bg-rose-500/20 text-rose-300 border border-rose-500/40 animate-pulse'
                  }`}
                >
                  {isMicOn ? <Mic className="w-4 h-4 text-emerald-400" /> : <MicOff className="w-4 h-4 text-rose-400" />}
                  <span>{isMicOn ? 'Mute Mic' : 'Unmute Mic'}</span>
                </button>

                <button
                  onClick={() => setIsVideoOn(!isVideoOn)}
                  className={`p-3 rounded-xl font-bold text-xs flex items-center space-x-2 transition-all ${
                    isVideoOn
                      ? 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'
                      : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                  }`}
                >
                  {isVideoOn ? <Video className="w-4 h-4 text-cyan-400" /> : <VideoOff className="w-4 h-4 text-rose-400" />}
                  <span>{isVideoOn ? 'Stop Camera' : 'Start Camera'}</span>
                </button>

                <button
                  onClick={() => setIsScreenSharing(!isScreenSharing)}
                  className={`p-3 rounded-xl font-bold text-xs flex items-center space-x-2 transition-all ${
                    isScreenSharing
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
                  }`}
                >
                  <Share2 className="w-4 h-4 text-amber-400" />
                  <span>{isScreenSharing ? 'Sharing Radar...' : 'Share ECDIS Radar'}</span>
                </button>

                <button
                  onClick={() => setIsAudioMuted(!isAudioMuted)}
                  className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 font-bold text-xs flex items-center space-x-2"
                >
                  {isAudioMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-sky-400" />}
                  <span>{isAudioMuted ? 'Unmute Audio' : 'Speaker'}</span>
                </button>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-[11px] text-slate-400 font-mono">Channel Status:</span>
                <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold text-xs flex items-center space-x-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>SATELLITE LIVE</span>
                </span>
              </div>
            </div>
          </div>

          {/* Right Live Transcripts & Tele-Chat Panel (1 Col) */}
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-col justify-between h-[420px] sm:h-[480px]">
            <div className="space-y-3 flex-1 overflow-y-auto pr-1">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <div className="flex items-center space-x-2 text-xs font-bold text-cyan-400">
                  <FileText className="w-4 h-4" />
                  <span>Live Transcripts & Dispatch Chat</span>
                </div>
                <span className="text-[10px] bg-slate-900 text-slate-400 px-2 py-0.5 rounded border border-slate-800">
                  Encrypted Log
                </span>
              </div>

              {/* Chat Message List */}
              <div className="space-y-2.5 text-xs">
                {chatMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`p-3 rounded-xl border space-y-1 ${
                      msg.type === 'system'
                        ? 'bg-rose-950/40 border-rose-800/60 text-rose-200'
                        : msg.type === 'medical'
                        ? 'bg-sky-950/40 border-sky-800/60 text-sky-200'
                        : 'bg-slate-900 border-slate-800 text-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] font-bold text-slate-400">
                      <span>{msg.sender}</span>
                      <span className="font-mono">{msg.time}</span>
                    </div>
                    <p className="leading-relaxed font-medium">{msg.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Message Input Form */}
            <form onSubmit={handleSendMessage} className="pt-3 border-t border-slate-800 flex items-center space-x-2">
              <input
                type="text"
                value={inputMsg}
                onChange={(e) => setInputMsg(e.target.value)}
                placeholder="Type dispatch log / medical query..."
                className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
              <button
                type="submit"
                className="p-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold transition-all shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* SECTION 2: MAYDAY SOS EMERGENCY DISTRESS BROADCAST SYSTEM */}
      <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 text-white space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center space-x-2 text-rose-400 text-xs font-bold uppercase tracking-wider mb-1">
              <ShieldAlert className="w-4 h-4 text-rose-400 animate-ping" />
              <span>MARITIME EMERGENCY DISTRESS BEACON (DSC / EPIRB)</span>
            </div>
            <h2 className="text-xl font-bold text-white">
              Instant Mayday SOS Beacon & Rescue Dispatcher
            </h2>
            <p className="text-xs text-slate-400">
              Transmit urgent distress signals directly to regional South Asian Coast Guards & nearby vessels on VHF Channel 16 and Inmarsat-C.
            </p>
          </div>
        </div>

        {sosSentSuccess && (
          <div className="p-4 bg-rose-500/20 border border-rose-500/50 text-rose-300 rounded-2xl text-xs flex items-center space-x-3 animate-bounce">
            <AlertTriangle className="w-5 h-5 shrink-0 text-rose-400" />
            <div>
              <div className="font-extrabold text-sm text-white">MAYDAY SOS DISTRESS SIGNAL BROADCASTED!</div>
              <div>Distress beacon transmitted to Coast Guard MRCC Headquarters. Rescue units dispatched.</div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* SOS Dispatch Form (1 Col) */}
          <form onSubmit={handleSendSos} className="bg-slate-950 p-5 rounded-2xl border border-rose-900/60 space-y-4">
            <div className="flex items-center space-x-2 text-xs font-extrabold text-rose-400 uppercase border-b border-slate-800 pb-2">
              <Radio className="w-4 h-4" />
              <span>Broadcast Emergency SOS</span>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-300">Vessel Name</label>
              <input
                type="text"
                required
                value={sosVesselName}
                onChange={(e) => setSosVesselName(e.target.value)}
                placeholder="e.g., MV Ocean Pearl / FV Sagar Kanya"
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-300">MMSI Number</label>
                <input
                  type="text"
                  value={sosMmsi}
                  onChange={(e) => setSosMmsi(e.target.value)}
                  placeholder="e.g., 419002840"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500 font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-300">Persons On Board (POB)</label>
                <input
                  type="number"
                  min="1"
                  value={sosPersons}
                  onChange={(e) => setSosPersons(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-rose-500 font-mono"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-300">Nature of Distress</label>
              <select
                value={sosDistressType}
                onChange={(e: any) => setSosDistressType(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-rose-300 font-bold focus:outline-none focus:border-rose-500"
              >
                <option value="Adverse Weather / Capsizing">Adverse Weather / Capsizing</option>
                <option value="Engine Failure in Swell">Engine Failure in Swell</option>
                <option value="Medical Emergency">Medical Emergency</option>
                <option value="Man Overboard (MOB)">Man Overboard (MOB)</option>
                <option value="Collision / Stranding">Collision / Stranding</option>
                <option value="Fire / Explosion">Fire / Explosion</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-300">Latitude</label>
                <input
                  type="text"
                  value={sosLat}
                  onChange={(e) => setSosLat(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-rose-500 font-mono"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-300">Longitude</label>
                <input
                  type="text"
                  value={sosLng}
                  onChange={(e) => setSosLng(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-rose-500 font-mono"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white font-black text-xs shadow-xl shadow-rose-600/30 transition-all flex items-center justify-center space-x-2"
            >
              <ShieldAlert className="w-4 h-4 animate-bounce" />
              <span>TRANSMIT MAYDAY SOS BEACON</span>
            </button>
          </form>

          {/* Active Broadcast Signals List (2 Cols) */}
          <div className="lg:col-span-2 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-200 flex items-center space-x-2">
                <Activity className="w-4 h-4 text-rose-400 animate-spin" />
                <span>Active Regional Distress Signals ({sosList.length})</span>
              </h3>
              <span className="text-[11px] text-slate-400">Live Satellite AIS Sync</span>
            </div>

            <div className="space-y-3">
              {sosList.map((sos) => (
                <div
                  key={sos.id}
                  className="p-4 rounded-2xl bg-slate-950 border border-rose-900/60 text-xs space-y-3 transition-all hover:scale-[1.01]"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-2">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-extrabold text-white text-sm">{sos.vesselName}</span>
                        <span className="text-[10px] text-slate-400 font-mono">MMSI: {sos.mmsiNumber}</span>
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        Flag: {sos.flagNation} • {sos.vesselType}
                      </div>
                    </div>

                    <span className="px-2.5 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40 text-[10px] font-extrabold uppercase animate-pulse self-start sm:self-auto">
                      {sos.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-slate-300">
                    <div>
                      <div className="text-[10px] text-slate-500">Distress Nature</div>
                      <div className="font-bold text-rose-400 mt-0.5">{sos.distressType}</div>
                    </div>

                    <div>
                      <div className="text-[10px] text-slate-500">Persons On Board</div>
                      <div className="font-bold text-cyan-400 mt-0.5">{sos.personsOnBoard} Crew & Pax</div>
                    </div>

                    <div>
                      <div className="text-[10px] text-slate-500">Coordinates</div>
                      <div className="font-mono text-amber-400 mt-0.5">{sos.currentLat}°N, {sos.currentLng}°E</div>
                    </div>

                    <div>
                      <div className="text-[10px] text-slate-500">Sea Zone</div>
                      <div className="font-semibold text-slate-200 mt-0.5">{sos.seaBody}</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1 text-[11px] text-slate-400">
                    <span className="flex items-center space-x-1">
                      <Clock className="w-3.5 h-3.5 text-slate-500" />
                      <span>Reported: {sos.timestamp}</span>
                    </span>

                    <span className="flex items-center space-x-1 text-emerald-400 font-semibold">
                      <Anchor className="w-3.5 h-3.5" />
                      <span>Dispatched via {sos.nearestPort} MRCC</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 3: SOUTH ASIAN COAST GUARD 24x7 DIRECTORY */}
      <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 text-white space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center space-x-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-1">
              <Compass className="w-4 h-4 text-emerald-400" />
              <span>REGIONAL MARITIME RESCUE COORDINATION CENTERS (MRCC)</span>
            </div>
            <h2 className="text-xl font-bold text-white">
              South Asia Coast Guard Emergency Hotline Directory
            </h2>
            <p className="text-xs text-slate-400">
              Direct emergency phone dialers, VHF frequencies, Inmarsat IDs, and air-sea rescue asset capabilities.
            </p>
          </div>
        </div>

        {/* Coast Guard Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {COAST_GUARD_UNITS.map((unit) => {
            const isSelected = selectedCoastGuard.id === unit.id;
            return (
              <div
                key={unit.id}
                onClick={() => setSelectedCoastGuard(unit)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer space-y-4 flex flex-col justify-between ${
                  isSelected
                    ? 'bg-slate-950 border-rose-500 shadow-xl shadow-rose-950/30'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl">{unit.countryFlag}</span>
                      <div>
                        <h3 className="font-extrabold text-sm text-white">{unit.country} Coast Guard</h3>
                        <div className="text-[10px] text-slate-400 font-mono">{unit.mrccCenter}</div>
                      </div>
                    </div>

                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold text-[10px]">
                      ~{unit.avgResponseTimeMin}m Response
                    </span>
                  </div>

                  <p className="text-xs font-semibold text-slate-300 leading-snug">
                    {unit.agencyName}
                  </p>

                  <div className="space-y-2 bg-slate-900 p-3 rounded-xl border border-slate-800 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Emergency Hotline:</span>
                      <a
                        href={`tel:${unit.hotline24x7.split('/')[0].trim()}`}
                        className="font-extrabold text-rose-400 hover:underline flex items-center space-x-1"
                      >
                        <PhoneForwarded className="w-3.5 h-3.5" />
                        <span>{unit.hotline24x7.split('/')[0]}</span>
                      </a>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">VHF Radio Channel:</span>
                      <strong className="text-cyan-400">{unit.vhfChannel}</strong>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Inmarsat-C Terminal:</span>
                      <strong className="text-amber-400 font-mono text-[11px]">{unit.inmarsatId}</strong>
                    </div>
                  </div>

                  <div className="space-y-1 text-[11px] text-slate-400">
                    <div>Jurisdiction: <strong className="text-slate-300">{unit.operatingJurisdiction}</strong></div>
                    <div>Bases: <strong className="text-slate-300">{unit.baseLocation}</strong></div>
                  </div>

                  <div className="space-y-1">
                    <div className="text-[10px] text-slate-500 uppercase font-bold">Air-Sea Rescue Assets</div>
                    <div className="flex flex-wrap gap-1">
                      {unit.rescueAssetsAvailable.map((asset, idx) => (
                        <span key={idx} className="text-[10px] bg-slate-900 text-slate-300 px-2 py-0.5 rounded border border-slate-800">
                          🚁 {asset}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                  <a
                    href={`mailto:${unit.email}`}
                    className="text-[11px] text-cyan-400 hover:underline flex items-center space-x-1 font-semibold"
                  >
                    <span>{unit.email}</span>
                  </a>

                  <a
                    href={`tel:${unit.hotline24x7.split('/')[0].trim()}`}
                    className="px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-xs transition-all flex items-center space-x-1 shadow-lg shadow-rose-600/20"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>Dial Hotline</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
