import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Tv,
  Radio,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  Users,
  MessageSquare,
  Send,
  Sparkles,
  Trophy,
  Dices,
  Swords,
  Gift,
  Zap,
  Ticket,
  CheckCircle2,
  ShieldCheck,
  AlertCircle,
  Clock,
  RefreshCw,
  Eye,
  Camera,
  Layers,
  Flame,
  Globe,
  Share2,
  Sliders
} from 'lucide-react';

// Web Audio Haptic & Sound Effects Engine
const playAudioFeedback = (type: 'ball_spin' | 'win_chime' | 'cheer' | 'bet_click' | 'toggle') => {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const now = ctx.currentTime;

    if (type === 'ball_spin') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(600, now);
      osc.frequency.exponentialRampToValueAtTime(150, now + 0.15);
      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.15);
    } else if (type === 'win_chime') {
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.frequency.setValueAtTime(freq, now + i * 0.08);
        gain.gain.setValueAtTime(0.08, now + i * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.2);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + i * 0.08);
        osc.stop(now + i * 0.08 + 0.2);
      });
    } else if (type === 'cheer') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.linearRampToValueAtTime(880, now + 0.12);
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.15);
    } else if (type === 'bet_click') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.frequency.setValueAtTime(800, now);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.05);
    } else if (type === 'toggle') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.frequency.setValueAtTime(500, now);
      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.04);
    }
  } catch (e) {
    // Audio Context not initialized yet
  }
};

// Types for Live Channel & Public Chat
export type LiveChannelId = 'MEGA_LOTTERY' | 'ROULETTE_CASINO' | 'REGATTA_RACE' | 'DAILY_RAFFLE';

export interface LiveChatMessage {
  id: string;
  sender: string;
  location: string;
  text: string;
  timestamp: string;
  isVIP?: boolean;
  avatarFlag?: string;
  cheerEmoji?: string;
}

export interface LiveWinnerAnnouncement {
  id: string;
  winnerName: string;
  location: string;
  prizeText: string;
  amountOD: number;
  game: string;
  timeAgo: string;
  txHash: string;
}

const INITIAL_WINNERS: LiveWinnerAnnouncement[] = [
  {
    id: 'w-1',
    winnerName: 'Captain Ramesh K.',
    location: 'Chennai Coast, India',
    prizeText: 'Hit 4 Lucky Numbers + Coral Ball!',
    amountOD: 25000,
    game: '$3.85M Mega Lottery',
    timeAgo: '2 mins ago',
    txHash: '0x8f2a...4b12'
  },
  {
    id: 'w-2',
    winnerName: 'Elena Rostova',
    location: 'Rotterdam Port, NL',
    prizeText: 'Treasure Reef Straight Number 17 Hit (35x multiplier)!',
    amountOD: 8750,
    game: 'High Seas Live Roulette',
    timeAgo: '5 mins ago',
    txHash: '0x3c91...7e88'
  },
  {
    id: 'w-3',
    winnerName: 'Siddharth M.',
    location: 'Bengaluru, India',
    prizeText: 'Emirates Team NZ Regatta Victory Payout!',
    amountOD: 4625,
    game: 'America’s Cup Regatta',
    timeAgo: '11 mins ago',
    txHash: '0x1a7f...9022'
  },
  {
    id: 'w-4',
    winnerName: 'Jean-Luc Dubois',
    location: 'Marseille, France',
    prizeText: 'Golden Pearl Instant Scratcher 100x Multiplier!',
    amountOD: 10000,
    game: 'Seafarer Scratch Reveal',
    timeAgo: '18 mins ago',
    txHash: '0x6e4d...1109'
  }
];

const INITIAL_CHAT_MESSAGES: LiveChatMessage[] = [
  {
    id: 'c-1',
    sender: 'Arun Kumar',
    location: 'Tamil Nadu, India',
    text: 'Watching live from Chennai! Hope the Cauvery desal lottery numbers hit tonight! 🌊⚓',
    timestamp: '20:14:02',
    isVIP: true,
    avatarFlag: '🇮🇳',
    cheerEmoji: '🎉'
  },
  {
    id: 'c-2',
    sender: 'Marcus Vance',
    location: 'Hamburg, Germany',
    text: 'Rooting for INEOS Britannia on Channel 3! Hydrofoil speed looks insane today.',
    timestamp: '20:14:15',
    avatarFlag: '🇩🇪'
  },
  {
    id: 'c-3',
    sender: 'Priya Sharma',
    location: 'Bengaluru, India',
    text: 'Just bought 5 Mega Jackpot tickets live on stream! Good luck everyone! 💎',
    timestamp: '20:14:30',
    avatarFlag: '🇮🇳',
    cheerEmoji: '💎'
  },
  {
    id: 'c-4',
    sender: 'Capt. David Miller',
    location: 'Indian Ocean SatCom',
    text: 'Satellite feed is super clear up here on the container vessel. 1080p stream working great!',
    timestamp: '20:14:48',
    isVIP: true,
    avatarFlag: '⚓'
  }
];

export const OceanGamingLiveWatchPortalView: React.FC = () => {
  // Channel & Player States
  const [activeChannel, setActiveChannel] = useState<LiveChannelId>('MEGA_LOTTERY');
  const [activeCam, setActiveCam] = useState<'CAM_1' | 'CAM_2' | 'CAM_3' | 'CAM_4'>('CAM_1');
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [streamQuality, setStreamQuality] = useState<'4K SatCom' | '1080p60' | '720p Mobile'>('1080p60');
  const [liveViewerCount, setLiveViewerCount] = useState<number>(18420);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // Animated Ball Machine State for Mega Lottery Channel
  const [drawnNumbers, setDrawnNumbers] = useState<number[]>([12, 27, 34, 41, 49]);
  const [coralBall, setCoralBall] = useState<number>(14);
  const [isDrawingBalls, setIsDrawingBalls] = useState<boolean>(false);

  // Animated Roulette State for Channel 2
  const [rouletteLastNumbers, setRouletteLastNumbers] = useState<number[]>([17, 24, 8, 31, 0, 11]);
  const [isSpinningRoulette, setIsSpinningRoulette] = useState<boolean>(false);

  // Public Chat State
  const [chatMessages, setChatMessages] = useState<LiveChatMessage[]>(INITIAL_CHAT_MESSAGES);
  const [userChatInput, setUserChatInput] = useState<string>('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Floating Reaction Particle Effects
  const [floatingParticles, setFloatingParticles] = useState<{ id: string; emoji: string; x: number }[]>([]);

  // Winners Feed State
  const [winnersFeed, setWinnersFeed] = useState<LiveWinnerAnnouncement[]>(INITIAL_WINNERS);

  // Countdown timer to next official live draw
  const [secondsToDraw, setSecondsToDraw] = useState<number>(145);

  // Auto-scroll chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  // Periodic simulated live viewer fluctuations & live announcements
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveViewerCount((prev) => prev + Math.floor(Math.random() * 9) - 4);
      setSecondsToDraw((prev) => (prev > 0 ? prev - 1 : 180));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Trigger Live Lottery Ball Draw Simulation
  const handleTriggerLiveDraw = () => {
    playAudioFeedback('ball_spin');
    setIsDrawingBalls(true);
    setDrawnNumbers([]);

    setTimeout(() => {
      const newNumbers: number[] = [];
      while (newNumbers.length < 5) {
        const rand = Math.floor(Math.random() * 50) + 1;
        if (!newNumbers.includes(rand)) newNumbers.push(rand);
      }
      newNumbers.sort((a, b) => a - b);
      const newCoral = Math.floor(Math.random() * 20) + 1;

      setDrawnNumbers(newNumbers);
      setCoralBall(newCoral);
      setIsDrawingBalls(false);
      playAudioFeedback('win_chime');

      // Add winner notification
      const newWin: LiveWinnerAnnouncement = {
        id: `w-${Date.now()}`,
        winnerName: 'Live Public Citizen Draw',
        location: 'Bay of Bengal SatCom Grid',
        prizeText: `Winning Combo: [${newNumbers.join(', ')}] + Coral #${newCoral}!`,
        amountOD: 50000,
        game: '$3.85M Mega Lottery',
        timeAgo: 'Just now',
        txHash: '0x' + Math.random().toString(16).substring(2, 10)
      };
      setWinnersFeed([newWin, ...winnersFeed.slice(0, 5)]);
    }, 2500);
  };

  // Trigger Live Roulette Spin
  const handleSpinRoulette = () => {
    playAudioFeedback('ball_spin');
    setIsSpinningRoulette(true);
    setTimeout(() => {
      const newNum = Math.floor(Math.random() * 37); // 0-36
      setRouletteLastNumbers([newNum, ...rouletteLastNumbers.slice(0, 5)]);
      setIsSpinningRoulette(false);
      playAudioFeedback('win_chime');
    }, 2000);
  };

  // Submit Chat Message
  const handleSendChatMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!userChatInput.trim()) return;

    playAudioFeedback('bet_click');
    const newMsg: LiveChatMessage = {
      id: `c-${Date.now()}`,
      sender: 'Public Citizen (You)',
      location: 'India / Public Portal',
      text: userChatInput.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      isVIP: true,
      avatarFlag: '🇮🇳'
    };

    setChatMessages([...chatMessages, newMsg]);
    setUserChatInput('');
  };

  // Send Floating Emoji Cheer Reaction
  const handleSendEmojiCheer = (emoji: string) => {
    playAudioFeedback('cheer');
    const newParticle = {
      id: `p-${Date.now()}-${Math.random()}`,
      emoji,
      x: Math.random() * 80 + 10 // 10% to 90%
    };
    setFloatingParticles((prev) => [...prev, newParticle]);

    setTimeout(() => {
      setFloatingParticles((prev) => prev.filter((p) => p.id !== newParticle.id));
    }, 2000);
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Top Banner Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-950 via-blue-950 to-slate-900 border-2 border-cyan-500/40 p-6 sm:p-8">
        <div className="absolute right-0 top-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-[10px] font-black font-mono uppercase tracking-wider flex items-center space-x-1">
                <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                <span>HIGH SEAS PUBLIC LIVE WATCH PORTAL</span>
              </span>
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-black font-mono uppercase tracking-wider flex items-center space-x-1">
                <Users className="w-3.5 h-3.5 text-emerald-400" />
                <span>{liveViewerCount.toLocaleString()} PUBLIC VIEWERS TUNED IN</span>
              </span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight flex items-center space-x-3">
              <Tv className="w-8 h-8 text-cyan-400 shrink-0" />
              <span>Ocean Gaming &amp; Lottery Public Live Stream</span>
            </h2>

            <p className="text-slate-300 text-xs sm:text-sm max-w-3xl leading-relaxed">
              Tune in live to official high-seas lottery draws, maritime sports regattas, live casino table streams, and real-time public jackpot announcements with 100% provably fair cryptographic verification.
            </p>
          </div>

          <div className="flex items-center space-x-3 shrink-0">
            <div className="p-3 rounded-2xl bg-slate-900/90 border border-slate-800 text-right font-mono">
              <span className="text-[10px] text-slate-400 block uppercase">NEXT LIVE DRAW IN</span>
              <strong className="text-amber-400 text-lg sm:text-xl font-bold">
                {Math.floor(secondsToDraw / 60)}m {secondsToDraw % 60}s
              </strong>
            </div>
          </div>
        </div>
      </div>

      {/* Main Broadcast Container: Video Feed (8 cols) + Public Live Chat (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Video Stream Player & Channel Controls (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          {/* Channel Selection Buttons */}
          <div className="flex items-center space-x-2 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800 overflow-x-auto no-scrollbar">
            {[
              { id: 'MEGA_LOTTERY', label: '$3.85M Mega Jackpot Draw', icon: Trophy, color: 'text-amber-400' },
              { id: 'ROULETTE_CASINO', label: 'Treasure Reef Live Roulette', icon: Dices, color: 'text-cyan-400' },
              { id: 'REGATTA_RACE', label: "America's Cup Regatta 2026", icon: Swords, color: 'text-emerald-400' },
              { id: 'DAILY_RAFFLE', label: 'Seafarer Scratch & Raffle', icon: Gift, color: 'text-purple-400' }
            ].map((ch) => {
              const isActive = activeChannel === ch.id;
              const IconComp = ch.icon;
              return (
                <button
                  key={ch.id}
                  onClick={() => {
                    setActiveChannel(ch.id as LiveChannelId);
                    playAudioFeedback('toggle');
                  }}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold font-mono transition-all flex items-center space-x-2 shrink-0 border ${
                    isActive
                      ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-lg shadow-cyan-500/20 scale-[1.02]'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  <IconComp className={`w-3.5 h-3.5 ${isActive ? 'text-slate-950' : ch.color}`} />
                  <span>{ch.label}</span>
                </button>
              );
            })}
          </div>

          {/* Video Player Box */}
          <div className="relative rounded-3xl bg-slate-950 border-2 border-slate-800 overflow-hidden shadow-2xl aspect-video flex flex-col justify-between p-4 sm:p-6">
            {/* Background Simulated Video Atmosphere */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/80 to-slate-950/60 pointer-events-none" />

            {/* Floating Reaction Animation Layer */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
              {floatingParticles.map((particle) => (
                <motion.div
                  key={particle.id}
                  initial={{ opacity: 1, y: 220, scale: 0.8 }}
                  animate={{ opacity: 0, y: -40, scale: 1.5 }}
                  transition={{ duration: 1.8, ease: 'easeOut' }}
                  className="absolute text-3xl drop-shadow-lg"
                  style={{ left: `${particle.x}%` }}
                >
                  {particle.emoji}
                </motion.div>
              ))}
            </div>

            {/* Video Player Top Overlay Bar */}
            <div className="relative z-10 flex items-center justify-between font-mono text-xs">
              <div className="flex items-center space-x-2">
                <span className="px-2.5 py-1 rounded-full bg-rose-600 text-white font-black text-[10px] flex items-center space-x-1 animate-pulse">
                  <span className="w-1.5 h-1.5 rounded-full bg-white" />
                  <span>LIVE BROADCAST</span>
                </span>
                <span className="bg-slate-900/80 text-cyan-300 px-2.5 py-1 rounded-full border border-slate-800 text-[10px]">
                  {streamQuality} SatCom
                </span>
              </div>

              {/* Multi-Camera Angle Selector */}
              <div className="flex items-center space-x-1 bg-slate-900/90 p-1 rounded-xl border border-slate-800">
                {(['CAM_1', 'CAM_2', 'CAM_3', 'CAM_4'] as const).map((cam, idx) => (
                  <button
                    key={cam}
                    onClick={() => {
                      setActiveCam(cam);
                      playAudioFeedback('toggle');
                    }}
                    className={`px-2 py-0.5 rounded-lg text-[10px] font-bold font-mono transition-all ${
                      activeCam === cam
                        ? 'bg-cyan-500 text-slate-950 font-black'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    CAM {idx + 1}
                  </button>
                ))}
              </div>
            </div>

            {/* Central Video Stream Graphic & Game Content Simulation */}
            <div className="relative z-10 my-auto py-4 text-center space-y-4">
              {/* CHANNEL 1: MEGA LOTTERY BALL MACHINE */}
              {activeChannel === 'MEGA_LOTTERY' && (
                <div className="space-y-4">
                  <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30 text-xs font-mono">
                    <Trophy className="w-4 h-4 text-amber-400" />
                    <span>$3,850,000 $OD GRAND LOTTERY BALL CHAMBER</span>
                  </div>

                  <div className="flex items-center justify-center space-x-2 sm:space-x-3">
                    {drawnNumbers.map((num, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: idx * 0.1, type: 'spring' }}
                        className="w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 text-slate-950 font-black text-base sm:text-xl flex items-center justify-center shadow-lg shadow-cyan-500/20 ring-4 ring-cyan-300/30 font-mono"
                      >
                        {num}
                      </motion.div>
                    ))}

                    <div className="text-slate-500 font-mono font-bold text-lg px-1">+</div>

                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.6 }}
                      className="w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-rose-500 to-amber-500 text-white font-black text-base sm:text-xl flex items-center justify-center shadow-lg shadow-rose-500/30 ring-4 ring-amber-400/30 font-mono"
                    >
                      {coralBall}
                    </motion.div>
                  </div>

                  <div className="pt-2 flex justify-center">
                    <button
                      onClick={handleTriggerLiveDraw}
                      disabled={isDrawingBalls}
                      className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-mono font-black text-xs shadow-xl shadow-amber-500/20 flex items-center space-x-2 transition-all scale-100 hover:scale-105 disabled:opacity-50"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>{isDrawingBalls ? 'SPINNING AIR CHAMBER...' : 'TRIGGER SIMULATED LIVE DRAW'}</span>
                    </button>
                  </div>
                </div>
              )}

              {/* CHANNEL 2: ROULETTE TABLE STREAM */}
              {activeChannel === 'ROULETTE_CASINO' && (
                <div className="space-y-4">
                  <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 text-xs font-mono">
                    <Dices className="w-4 h-4 text-cyan-400" />
                    <span>HIGH SEAS TREASURE REEF ROULETTE • LIVE DEALER STAGE</span>
                  </div>

                  <div className="flex items-center justify-center space-x-2 font-mono">
                    <span className="text-xs text-slate-400">LAST RECENT HITS:</span>
                    {rouletteLastNumbers.map((num, i) => (
                      <span
                        key={i}
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
                          num === 0
                            ? 'bg-emerald-600 text-white'
                            : [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36].includes(num)
                            ? 'bg-rose-600 text-white'
                            : 'bg-slate-900 text-white border border-slate-700'
                        }`}
                      >
                        {num}
                      </span>
                    ))}
                  </div>

                  <div className="pt-2 flex justify-center">
                    <button
                      onClick={handleSpinRoulette}
                      disabled={isSpinningRoulette}
                      className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-mono font-black text-xs shadow-xl shadow-cyan-500/20 flex items-center space-x-2 transition-all scale-100 hover:scale-105 disabled:opacity-50"
                    >
                      <Dices className="w-4 h-4" />
                      <span>{isSpinningRoulette ? 'SPINNING ROULETTE WHEEL...' : 'SPIN LIVE ROULETTE WHEEL'}</span>
                    </button>
                  </div>
                </div>
              )}

              {/* CHANNEL 3: REGATTA RACE TELEMETRY */}
              {activeChannel === 'REGATTA_RACE' && (
                <div className="space-y-3">
                  <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 text-xs font-mono">
                    <Swords className="w-4 h-4 text-emerald-400" />
                    <span>AMERICA’S CUP 2026 HYDROFOIL OFFSHORE REGATTA</span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 max-w-md mx-auto font-mono text-xs">
                    <div className="p-3 bg-slate-900/90 rounded-2xl border border-slate-800 text-left">
                      <span className="text-[10px] text-slate-400 block">LEADER</span>
                      <strong className="text-emerald-400 text-sm block">Emirates Team NZ</strong>
                      <span className="text-[10px] text-slate-400">Speed: 31.4 knots</span>
                    </div>

                    <div className="p-3 bg-slate-900/90 rounded-2xl border border-slate-800 text-left">
                      <span className="text-[10px] text-slate-400 block">CHALLENGER</span>
                      <strong className="text-cyan-300 text-sm block">INEOS Britannia</strong>
                      <span className="text-[10px] text-slate-400">Gap: +1.2 sec</span>
                    </div>
                  </div>
                </div>
              )}

              {/* CHANNEL 4: RAFFLE & SCRATCHER REVEAL */}
              {activeChannel === 'DAILY_RAFFLE' && (
                <div className="space-y-3">
                  <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/30 text-xs font-mono">
                    <Gift className="w-4 h-4 text-purple-400" />
                    <span>SEAFARER'S DAILY RAFFLE DRUM &amp; INSTANT SCRATCH WEBCAM</span>
                  </div>

                  <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800 max-w-sm mx-auto font-mono text-xs text-center space-y-1">
                    <span className="text-purple-300 font-bold block">TODAY'S RAFFLE POOL: $150,000 $OD</span>
                    <span className="text-slate-400 text-[10px]">Over 1,200 Seafarer Tickets Issued Today</span>
                  </div>
                </div>
              )}
            </div>

            {/* Video Player Bottom Control Bar */}
            <div className="relative z-10 flex items-center justify-between font-mono text-xs pt-2 border-t border-slate-900">
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white border border-slate-800 transition-all"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 text-emerald-400" />}
                </button>

                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white border border-slate-800 transition-all"
                >
                  {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
                </button>

                <span className="text-[11px] text-slate-400 hidden sm:inline">
                  {isPlaying ? 'Playing SatCom Live Signal' : 'Stream Paused'}
                </span>
              </div>

              {/* Public Reaction Emoji Bar */}
              <div className="flex items-center space-x-1.5">
                {['🎉', '🔥', '💎', '🌊', '⚓'].map((emoji) => (
                  <button
                    key={emoji}
                    onClick={() => handleSendEmojiCheer(emoji)}
                    className="w-8 h-8 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-sm flex items-center justify-center transition-all scale-100 hover:scale-110 active:scale-95"
                    title={`Send ${emoji} Reaction`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Ticket & Live Bet Overlay Box */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono text-xs">
            <div className="flex items-center space-x-3">
              <Ticket className="w-5 h-5 text-amber-400 shrink-0" />
              <div>
                <strong className="text-white block font-bold">Watch &amp; Play Live Ticket Console</strong>
                <span className="text-[10px] text-slate-400">Buy $3.85M Mega Jackpot Slip ($5 $OD) while watching live</span>
              </div>
            </div>

            <button
              onClick={() => {
                playAudioFeedback('win_chime');
                alert('Successfully purchased +1 Live $3.85M Mega Jackpot Ticket on Stream!');
              }}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-500 hover:from-emerald-300 hover:to-teal-400 text-slate-950 font-black text-xs shadow-lg shadow-emerald-500/20 flex items-center space-x-1.5 shrink-0"
            >
              <Zap className="w-4 h-4" />
              <span>BUY $5 $OD LIVE TICKET</span>
            </button>
          </div>
        </div>

        {/* Right Public Live Chat & Winner Announcements (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          {/* Public Chat Box */}
          <div className="rounded-3xl bg-slate-950 border border-slate-800 p-4 sm:p-5 flex flex-col h-[420px] justify-between shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 font-mono">
              <div className="flex items-center space-x-2">
                <MessageSquare className="w-4 h-4 text-cyan-400" />
                <h3 className="text-sm font-black text-white">PUBLIC LIVE CHAT</h3>
              </div>
              <span className="text-[10px] text-emerald-400 font-bold flex items-center space-x-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                <span>ONLINE</span>
              </span>
            </div>

            {/* Message Stream */}
            <div className="flex-1 overflow-y-auto space-y-3 my-3 pr-1 text-xs font-mono no-scrollbar">
              {chatMessages.map((msg) => (
                <div key={msg.id} className="p-2.5 rounded-2xl bg-slate-900/90 border border-slate-800/80 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-cyan-300 flex items-center space-x-1">
                      <span>{msg.avatarFlag || '👤'}</span>
                      <span>{msg.sender}</span>
                      {msg.isVIP && <span className="text-[9px] bg-amber-500/20 text-amber-300 px-1 rounded">VIP</span>}
                    </span>
                    <span className="text-[9px] text-slate-500">{msg.timestamp}</span>
                  </div>
                  <p className="text-slate-300 font-sans text-xs">{msg.text}</p>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>

            {/* Chat Input Form */}
            <form onSubmit={handleSendChatMessage} className="flex items-center space-x-2 pt-2 border-t border-slate-900">
              <input
                type="text"
                value={userChatInput}
                onChange={(e) => setUserChatInput(e.target.value)}
                placeholder="Join the public live watch chat..."
                className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-sans"
              />
              <button
                type="submit"
                className="p-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-all font-bold"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* Live Winners Ticker */}
          <div className="p-4 rounded-3xl bg-slate-950 border border-slate-800 space-y-3 shadow-xl">
            <div className="flex items-center justify-between font-mono text-xs border-b border-slate-800 pb-2">
              <span className="text-white font-bold flex items-center space-x-1.5">
                <Trophy className="w-4 h-4 text-amber-400" />
                <span>LIVE WINNERS TICKER</span>
              </span>
              <span className="text-[10px] text-emerald-400 font-bold">PROVABLY FAIR</span>
            </div>

            <div className="space-y-2 font-mono text-xs">
              {winnersFeed.map((w) => (
                <div key={w.id} className="p-2.5 bg-slate-900/80 rounded-xl border border-slate-800 flex items-center justify-between">
                  <div>
                    <strong className="text-white text-xs block">{w.winnerName}</strong>
                    <span className="text-[10px] text-slate-400 block">{w.game} • {w.location}</span>
                  </div>
                  <div className="text-right">
                    <strong className="text-emerald-400 text-xs block">+{w.amountOD.toLocaleString()} $OD</strong>
                    <span className="text-[9px] text-cyan-400 font-mono">{w.txHash}</span>
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
