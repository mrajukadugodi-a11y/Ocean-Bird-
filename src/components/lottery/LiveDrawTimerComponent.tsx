import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Clock, Radio, Zap, Sparkles, AlertCircle, ShieldCheck, Ticket, RefreshCw, Volume2 } from 'lucide-react';
import { hapticEngine } from '../../utils/hapticUtils';

interface LiveDrawTimerProps {
  onQuickPickTicket?: () => void;
  onOpenWinningAlerts?: () => void;
}

export const LiveDrawTimerComponent: React.FC<LiveDrawTimerProps> = ({
  onQuickPickTicket,
  onOpenWinningAlerts
}) => {
  // Target next draw: 3 hours, 45 minutes, 12 seconds from now
  const [timeLeft, setTimeLeft] = useState<{ hours: number; minutes: number; seconds: number }>({
    hours: 3,
    minutes: 45,
    seconds: 12
  });

  const [satcomLatency, setSatcomLatency] = useState<number>(42);
  const [synced, setSynced] = useState<boolean>(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          return { hours: 23, minutes: 59, seconds: 59 };
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Format helper
  const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`);

  // Calculate percentage of time passed (assuming 24h draw cycle)
  const totalSecondsRemaining = timeLeft.hours * 3600 + timeLeft.minutes * 60 + timeLeft.seconds;
  const totalSecondsIn24h = 86400;
  const percentRemaining = Math.max(0, Math.min(100, (totalSecondsRemaining / totalSecondsIn24h) * 100));

  return (
    <div className="bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 border border-amber-500/30 rounded-3xl p-5 sm:p-6 shadow-2xl relative overflow-hidden font-mono">
      {/* Background Glow */}
      <div className="absolute top-0 right-1/4 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
        {/* Left: Next Draw Info */}
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <span className="bg-rose-500/20 text-rose-300 border border-rose-500/40 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center space-x-1.5 animate-pulse">
              <span className="w-2 h-2 rounded-full bg-rose-400 animate-ping" />
              <span>LIVE DRAW TIMER • DRAW #8940</span>
            </span>

            <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center space-x-1">
              <Radio className="w-3 h-3 text-emerald-400" />
              <span>Inmarsat SatCom Atomic Sync ({satcomLatency}ms)</span>
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-white font-mono flex items-center space-x-2">
            <span>$3,850,000 $OD Mega High Seas Jackpot</span>
          </h3>

          <p className="text-xs text-slate-300 font-sans max-w-lg">
            Guaranteed provably fair draw broadcasted live across maritime fleets globally. Ticket sales close 15 minutes prior to ball drop.
          </p>
        </div>

        {/* Center/Right: Ticking Clock Displays */}
        <div className="flex flex-col sm:flex-row items-center gap-4 bg-slate-950/80 p-4 rounded-2xl border border-slate-800 shrink-0">
          <div className="flex items-center space-x-2 text-center">
            {/* Hours */}
            <div className="bg-slate-900 border border-amber-500/40 p-3 rounded-2xl min-w-[64px] shadow-inner">
              <span className="text-2xl sm:text-3xl font-black text-amber-400 font-mono block">
                {pad(timeLeft.hours)}
              </span>
              <span className="text-[9px] text-slate-400 font-sans block uppercase font-bold">Hours</span>
            </div>

            <span className="text-xl font-black text-amber-500/60 font-mono animate-pulse">:</span>

            {/* Minutes */}
            <div className="bg-slate-900 border border-amber-500/40 p-3 rounded-2xl min-w-[64px] shadow-inner">
              <span className="text-2xl sm:text-3xl font-black text-amber-400 font-mono block">
                {pad(timeLeft.minutes)}
              </span>
              <span className="text-[9px] text-slate-400 font-sans block uppercase font-bold">Mins</span>
            </div>

            <span className="text-xl font-black text-amber-500/60 font-mono animate-pulse">:</span>

            {/* Seconds */}
            <div className="bg-slate-900 border border-amber-500/40 p-3 rounded-2xl min-w-[64px] shadow-inner">
              <span className="text-2xl sm:text-3xl font-black text-rose-400 font-mono block">
                {pad(timeLeft.seconds)}
              </span>
              <span className="text-[9px] text-slate-400 font-sans block uppercase font-bold">Secs</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            {onQuickPickTicket && (
              <button
                onClick={() => {
                  onQuickPickTicket();
                  hapticEngine.trigger('success');
                }}
                className="w-full sm:w-auto bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-slate-950 font-black px-4 py-2.5 rounded-xl text-xs transition-all flex items-center justify-center space-x-1.5 shadow-lg shadow-amber-500/20"
              >
                <Ticket className="w-4 h-4" />
                <span>Buy Quick Ticket ($10)</span>
              </button>
            )}

            {onOpenWinningAlerts && (
              <button
                onClick={() => {
                  onOpenWinningAlerts();
                  hapticEngine.trigger('click');
                }}
                className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 border border-amber-500/40 text-amber-300 font-bold px-3 py-2.5 rounded-xl text-xs transition-all flex items-center justify-center space-x-1.5"
              >
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span>Winning Alerts Setup</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Cycle Progress Bar */}
      <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center space-x-3 text-[11px] text-slate-400 font-sans">
        <span className="font-mono text-amber-400 font-bold shrink-0">DRAW TICKET SALES OPEN</span>
        <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden border border-slate-800">
          <div
            className="bg-gradient-to-r from-amber-500 via-emerald-400 to-cyan-400 h-full transition-all duration-1000"
            style={{ width: `${percentRemaining}%` }}
          />
        </div>
        <span className="font-mono text-slate-300 font-bold shrink-0">{percentRemaining.toFixed(1)}% Pool Time Left</span>
      </div>
    </div>
  );
};
