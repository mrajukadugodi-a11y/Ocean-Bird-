import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Bell,
  CheckCircle2,
  Sliders,
  Radio,
  Smartphone,
  Globe,
  Mail,
  ShieldCheck,
  Moon,
  Sparkles,
  Volume2,
  VolumeX,
  Send,
  Zap,
  Check,
  AlertCircle
} from 'lucide-react';
import { hapticEngine } from '../../utils/hapticUtils';

interface NotificationSettings {
  jackpotMinThreshold: number; // in $OD
  instantDrawResults: boolean;
  winningTicketAlerts: boolean;
  dailyRaffleReminders: boolean;
  stakingYieldAlerts: boolean;
  // Delivery Channels
  inAppToasts: boolean;
  browserPush: boolean;
  satcomSms: boolean;
  satcomPhoneNumber: string;
  whatsappAlerts: boolean;
  emailDigest: boolean;
  emailAddress: string;
  // Duty / Quiet Hours
  quietHoursEnabled: boolean;
  quietStart: string;
  quietEnd: string;
  // Sound
  soundEnabled: boolean;
  vibrationEnabled: boolean;
}

export const LotteryNotificationSettingsView: React.FC<{
  onTriggerTestToast?: (message: string) => void;
}> = ({ onTriggerTestToast }) => {
  const [settings, setSettings] = useState<NotificationSettings>({
    jackpotMinThreshold: 1000000, // $1M default
    instantDrawResults: true,
    winningTicketAlerts: true,
    dailyRaffleReminders: true,
    stakingYieldAlerts: true,
    inAppToasts: true,
    browserPush: true,
    satcomSms: true,
    satcomPhoneNumber: '+870-773-192840 (Inmarsat FleetBroadband)',
    whatsappAlerts: false,
    emailDigest: true,
    emailAddress: 'capt.vance.mariner@poseidon-lines.com',
    quietHoursEnabled: true,
    quietStart: '22:00',
    quietEnd: '06:00',
    soundEnabled: true,
    vibrationEnabled: true
  });

  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);
  const [testSent, setTestSent] = useState<boolean>(false);

  const handleToggle = (key: keyof NotificationSettings) => {
    setSettings((prev) => {
      const nextVal = !prev[key];
      return { ...prev, [key]: nextVal };
    });
    hapticEngine.trigger('click');
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    hapticEngine.trigger('success');
    setSavedSuccess(true);
    if (onTriggerTestToast) {
      onTriggerTestToast('Lottery Notification Preferences saved successfully!');
    }
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleTriggerTestNotification = () => {
    hapticEngine.trigger('alert');
    setTestSent(true);
    if (onTriggerTestToast) {
      onTriggerTestToast(`🚨 [TEST ALERT] Mega High Seas Jackpot reached $3.85M $OD! Your Ticket #884920 matched 5 numbers!`);
    }
    setTimeout(() => setTestSent(false), 4000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 font-sans">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute -right-10 -top-10 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-mono font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center space-x-1.5">
                <Bell className="w-3.5 h-3.5 text-amber-400" />
                <span>Maritime Notification Hub</span>
              </span>
              <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono font-bold px-2.5 py-1 rounded-full flex items-center space-x-1">
                <Radio className="w-3 h-3" />
                <span>Inmarsat & Iridium Active</span>
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white font-mono">
              Lottery Alert & Push Dispatch Preferences
            </h2>
            <p className="text-xs text-slate-300 max-w-xl font-sans leading-relaxed">
              Configure real-time satellite SMS notifications, jackpot surge alerts, winning ticket disclosures, and bridge watch quiet hours for deep-sea navigation.
            </p>
          </div>

          <button
            type="button"
            onClick={handleTriggerTestNotification}
            className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black px-4 py-3 rounded-2xl text-xs font-mono transition-all flex items-center space-x-2 shadow-lg shadow-amber-500/20 shrink-0 self-start sm:self-auto"
          >
            <Zap className="w-4 h-4" />
            <span>Send Test Alert</span>
          </button>
        </div>
      </div>

      {testSent && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-amber-500/15 border border-amber-500/40 rounded-2xl text-amber-300 text-xs font-mono flex items-center justify-between shadow-lg"
        >
          <div className="flex items-center space-x-3">
            <Zap className="w-5 h-5 text-amber-400 animate-pulse shrink-0" />
            <div>
              <span className="font-bold block">TEST NOTIFICATION DISPATCHED SUCCESSFULLY</span>
              <span className="text-[11px] text-amber-200/80 font-sans">
                Sample alert broadcasted across In-App Toasts & SatCom Terminal!
              </span>
            </div>
          </div>
          <span className="text-[10px] bg-amber-500/30 text-amber-200 px-2 py-1 rounded font-mono font-bold">
            DELIVERED
          </span>
        </motion.div>
      )}

      <form onSubmit={handleSaveSettings} className="space-y-6">
        {/* Section 1: Jackpot Alert Threshold */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 font-mono shadow-xl">
          <div className="border-b border-slate-800 pb-3 flex justify-between items-center">
            <div>
              <h3 className="text-sm font-black text-white uppercase flex items-center space-x-2">
                <Sliders className="w-4 h-4 text-amber-400" />
                <span>Jackpot Minimum Threshold Alert</span>
              </h3>
              <p className="text-[11px] text-slate-400 font-sans">
                Only send jackpot surge alerts when the pool exceeds your set threshold
              </p>
            </div>
            <span className="text-sm font-black text-amber-400 bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded-xl">
              ${(settings.jackpotMinThreshold / 1000000).toFixed(1)}M $OD
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            {[250000, 500000, 1000000, 3000000].map((amount) => (
              <button
                key={amount}
                type="button"
                onClick={() => {
                  setSettings((prev) => ({ ...prev, jackpotMinThreshold: amount }));
                  hapticEngine.trigger('click');
                }}
                className={`p-3 rounded-2xl border text-center transition-all ${
                  settings.jackpotMinThreshold === amount
                    ? 'bg-amber-500 text-slate-950 font-black border-amber-400 shadow-md'
                    : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                }`}
              >
                <span className="text-xs block font-bold">
                  ${amount >= 1000000 ? `${(amount / 1000000).toFixed(1)}M` : `${amount / 1000}K`} $OD
                </span>
                <span className="text-[9px] opacity-80 block font-sans">Threshold</span>
              </button>
            ))}
          </div>
        </div>

        {/* Section 2: Event Alert Toggles */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 font-mono shadow-xl">
          <div className="border-b border-slate-800 pb-3">
            <h3 className="text-sm font-black text-white uppercase flex items-center space-x-2">
              <Bell className="w-4 h-4 text-cyan-400" />
              <span>Event & Game Alerts</span>
            </h3>
            <p className="text-[11px] text-slate-400 font-sans">
              Choose which lottery events trigger immediate notifications
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            <div
              onClick={() => handleToggle('winningTicketAlerts')}
              className="p-4 bg-slate-950 border border-slate-800 hover:border-slate-700 rounded-2xl flex items-center justify-between cursor-pointer transition-all"
            >
              <div>
                <span className="text-xs font-bold text-white block">Winning Ticket Alerts</span>
                <span className="text-[10px] text-slate-400 font-sans block">Instant notification when any of your tickets win</span>
              </div>
              <div className={`w-11 h-6 rounded-full transition-colors relative p-1 ${settings.winningTicketAlerts ? 'bg-emerald-500' : 'bg-slate-800'}`}>
                <div className={`w-4 h-4 rounded-full bg-white transition-transform ${settings.winningTicketAlerts ? 'translate-x-5' : 'translate-x-0'}`} />
              </div>
            </div>

            <div
              onClick={() => handleToggle('instantDrawResults')}
              className="p-4 bg-slate-950 border border-slate-800 hover:border-slate-700 rounded-2xl flex items-center justify-between cursor-pointer transition-all"
            >
              <div>
                <span className="text-xs font-bold text-white block">Instant Draw Results</span>
                <span className="text-[10px] text-slate-400 font-sans block">Receive winning numbers as soon as draw concludes</span>
              </div>
              <div className={`w-11 h-6 rounded-full transition-colors relative p-1 ${settings.instantDrawResults ? 'bg-emerald-500' : 'bg-slate-800'}`}>
                <div className={`w-4 h-4 rounded-full bg-white transition-transform ${settings.instantDrawResults ? 'translate-x-5' : 'translate-x-0'}`} />
              </div>
            </div>

            <div
              onClick={() => handleToggle('dailyRaffleReminders')}
              className="p-4 bg-slate-950 border border-slate-800 hover:border-slate-700 rounded-2xl flex items-center justify-between cursor-pointer transition-all"
            >
              <div>
                <span className="text-xs font-bold text-white block">Daily Raffle Reminders</span>
                <span className="text-[10px] text-slate-400 font-sans block">Reminder 30 mins before free daily raffle entry closes</span>
              </div>
              <div className={`w-11 h-6 rounded-full transition-colors relative p-1 ${settings.dailyRaffleReminders ? 'bg-emerald-500' : 'bg-slate-800'}`}>
                <div className={`w-4 h-4 rounded-full bg-white transition-transform ${settings.dailyRaffleReminders ? 'translate-x-5' : 'translate-x-0'}`} />
              </div>
            </div>

            <div
              onClick={() => handleToggle('stakingYieldAlerts')}
              className="p-4 bg-slate-950 border border-slate-800 hover:border-slate-700 rounded-2xl flex items-center justify-between cursor-pointer transition-all"
            >
              <div>
                <span className="text-xs font-bold text-white block">Staking Yield Payout Alerts</span>
                <span className="text-[10px] text-slate-400 font-sans block">Notification when 12.8% Staking Vault pays daily APY</span>
              </div>
              <div className={`w-11 h-6 rounded-full transition-colors relative p-1 ${settings.stakingYieldAlerts ? 'bg-emerald-500' : 'bg-slate-800'}`}>
                <div className={`w-4 h-4 rounded-full bg-white transition-transform ${settings.stakingYieldAlerts ? 'translate-x-5' : 'translate-x-0'}`} />
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Delivery Channels (SatCom, Push, WhatsApp, Email) */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 font-mono shadow-xl">
          <div className="border-b border-slate-800 pb-3">
            <h3 className="text-sm font-black text-white uppercase flex items-center space-x-2">
              <Radio className="w-4 h-4 text-emerald-400" />
              <span>Multi-Channel Broadcast Routing</span>
            </h3>
            <p className="text-[11px] text-slate-400 font-sans">
              Select delivery channels for deep-sea satellite or port networks
            </p>
          </div>

          <div className="space-y-3">
            {/* SatCom SMS */}
            <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                    <Radio className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block">SatCom Terminal SMS (Inmarsat / Iridium)</span>
                    <span className="text-[10px] text-slate-400 font-sans block">High-priority satellite SMS delivery for vessel officers at sea</span>
                  </div>
                </div>
                <div
                  onClick={() => handleToggle('satcomSms')}
                  className={`w-11 h-6 rounded-full transition-colors cursor-pointer relative p-1 ${settings.satcomSms ? 'bg-emerald-500' : 'bg-slate-800'}`}
                >
                  <div className={`w-4 h-4 rounded-full bg-white transition-transform ${settings.satcomSms ? 'translate-x-5' : 'translate-x-0'}`} />
                </div>
              </div>

              {settings.satcomSms && (
                <div className="pt-2 border-t border-slate-900">
                  <label className="text-[10px] text-slate-400 block mb-1">SATCOM TERMINAL PHONE NUMBER / SATELLITE ID:</label>
                  <input
                    type="text"
                    value={settings.satcomPhoneNumber}
                    onChange={(e) => setSettings((prev) => ({ ...prev, satcomPhoneNumber: e.target.value }))}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono text-cyan-300 focus:border-amber-400 focus:outline-none"
                  />
                </div>
              )}
            </div>

            {/* Email Digest */}
            <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block">Email Winnings Digest & Statements</span>
                    <span className="text-[10px] text-slate-400 font-sans block">Daily email report of ticket status, claims, and staking rewards</span>
                  </div>
                </div>
                <div
                  onClick={() => handleToggle('emailDigest')}
                  className={`w-11 h-6 rounded-full transition-colors cursor-pointer relative p-1 ${settings.emailDigest ? 'bg-emerald-500' : 'bg-slate-800'}`}
                >
                  <div className={`w-4 h-4 rounded-full bg-white transition-transform ${settings.emailDigest ? 'translate-x-5' : 'translate-x-0'}`} />
                </div>
              </div>

              {settings.emailDigest && (
                <div className="pt-2 border-t border-slate-900">
                  <label className="text-[10px] text-slate-400 block mb-1">MARINER EMAIL ADDRESS:</label>
                  <input
                    type="email"
                    value={settings.emailAddress}
                    onChange={(e) => setSettings((prev) => ({ ...prev, emailAddress: e.target.value }))}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono text-white focus:border-amber-400 focus:outline-none"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Section 4: Quiet Hours / Bridge Navigation Watch Mode */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 font-mono shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400">
                <Moon className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-black text-white uppercase">Bridge Watch Quiet Hours</h3>
                <p className="text-[11px] text-slate-400 font-sans">
                  Mute non-critical audio/vibration alerts during navigation watch duties
                </p>
              </div>
            </div>
            <div
              onClick={() => handleToggle('quietHoursEnabled')}
              className={`w-11 h-6 rounded-full transition-colors cursor-pointer relative p-1 ${settings.quietHoursEnabled ? 'bg-emerald-500' : 'bg-slate-800'}`}
            >
              <div className={`w-4 h-4 rounded-full bg-white transition-transform ${settings.quietHoursEnabled ? 'translate-x-5' : 'translate-x-0'}`} />
            </div>
          </div>

          {settings.quietHoursEnabled && (
            <div className="grid grid-cols-2 gap-4 pt-1">
              <div>
                <label className="text-[10px] text-slate-400 block mb-1">QUIET HOURS START (UTC):</label>
                <input
                  type="time"
                  value={settings.quietStart}
                  onChange={(e) => setSettings((prev) => ({ ...prev, quietStart: e.target.value }))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono text-amber-300 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-400 block mb-1">QUIET HOURS END (UTC):</label>
                <input
                  type="time"
                  value={settings.quietEnd}
                  onChange={(e) => setSettings((prev) => ({ ...prev, quietEnd: e.target.value }))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono text-amber-300 focus:outline-none"
                />
              </div>
            </div>
          )}
        </div>

        {/* Submit Save Button */}
        <div className="flex items-center justify-end space-x-4">
          {savedSuccess && (
            <span className="text-xs font-mono font-bold text-emerald-400 flex items-center space-x-1.5 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4" />
              <span>Preferences Persisted On-Chain!</span>
            </span>
          )}

          <button
            type="submit"
            className="bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-slate-950 font-black px-8 py-3.5 rounded-2xl text-xs font-mono transition-all flex items-center space-x-2 shadow-xl shadow-amber-500/20"
          >
            <Check className="w-4 h-4" />
            <span>Save Notification Preferences</span>
          </button>
        </div>
      </form>
    </div>
  );
};
