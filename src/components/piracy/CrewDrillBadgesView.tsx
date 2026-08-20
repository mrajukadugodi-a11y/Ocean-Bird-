import React, { useState } from 'react';
import { Award, ShieldCheck, Flame, Zap, CheckCircle2, Lock, Star, PlusCircle, Users } from 'lucide-react';
import { hapticEngine } from '../../utils/hapticUtils';

export interface CrewBadge {
  id: string;
  title: string;
  category: 'CITADEL' | 'HELM' | 'FIRE_MONITOR' | 'WATCH';
  description: string;
  unlocked: boolean;
  unlockedAt?: string;
  progressPct: number;
  iconName: string;
}

export const CrewDrillBadgesView: React.FC = () => {
  const [badges, setBadges] = useState<CrewBadge[]>([
    {
      id: 'BADGE-01',
      title: 'Citadel Lockout Specialist',
      category: 'CITADEL',
      description: 'Secured all 22 crew members inside armored Citadel within 120 seconds during drill.',
      unlocked: true,
      unlockedAt: '2026-07-28',
      progressPct: 100,
      iconName: 'ShieldCheck'
    },
    {
      id: 'BADGE-02',
      title: 'Lightning Helm Evasion Master',
      category: 'HELM',
      description: 'Executed 21+ Knot zig-zag evasive maneuvers during active skiff chase simulation.',
      unlocked: true,
      unlockedAt: '2026-07-15',
      progressPct: 100,
      iconName: 'Zap'
    },
    {
      id: 'BADGE-03',
      title: 'Water Cannon Ace Operator',
      category: 'FIRE_MONITOR',
      description: 'Pressurized deck water monitors to 14 BAR in under 30 seconds.',
      unlocked: true,
      unlockedAt: '2026-06-30',
      progressPct: 100,
      iconName: 'Flame'
    },
    {
      id: 'BADGE-04',
      title: 'Midnight Watch Sentinel',
      category: 'WATCH',
      description: 'Detected dark non-AIS skiff target on radar at 8.0 NM distance during 02:00 UTC watch.',
      unlocked: false,
      progressPct: 75,
      iconName: 'Star'
    },
    {
      id: 'BADGE-05',
      title: 'BMP5 Defense Grandmaster',
      category: 'CITADEL',
      description: 'Achieved 100% vessel hardening audit compliance across razor wire, water monitors, and citadel lockouts.',
      unlocked: false,
      progressPct: 90,
      iconName: 'Award'
    }
  ]);

  const [awardRecipient, setAwardRecipient] = useState('Chief Officer M. Kowalski');
  const [awardSuccessMsg, setAwardSuccessMsg] = useState<string | null>(null);

  const handleGrantBadge = (id: string) => {
    hapticEngine.trigger('success');
    setBadges(
      badges.map((b) => (b.id === id ? { ...b, unlocked: true, unlockedAt: new Date().toISOString().substring(0, 10), progressPct: 100 } : b))
    );
    setAwardSuccessMsg(`Badge awarded to ${awardRecipient}!`);
    setTimeout(() => setAwardSuccessMsg(null), 3000);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-2xl space-y-4 font-mono text-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="space-y-0.5">
          <h3 className="text-xs font-bold text-white uppercase flex items-center space-x-2">
            <Award className="w-4 h-4 text-amber-400" />
            <span>Maritime Crew Anti-Piracy Drill Achievements & Qualification Badges</span>
          </h3>
          <p className="text-[10px] text-slate-400 font-sans">
            IMO SOLAS & BMP5 compliant certification badges earned by vessel officers and crew during anti-piracy response drills
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <span className="bg-slate-950 text-amber-300 border border-amber-800 text-[10px] px-2.5 py-1 rounded font-bold">
            {badges.filter((b) => b.unlocked).length} / {badges.length} BADGES UNLOCKED
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {badges.map((badge) => (
          <div
            key={badge.id}
            className={`p-4 rounded-2xl border transition-all flex flex-col justify-between space-y-3 ${
              badge.unlocked
                ? 'bg-slate-950 border-amber-500/40 shadow-lg'
                : 'bg-slate-950/50 border-slate-900 opacity-70'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center font-black ${
                    badge.unlocked
                      ? 'bg-gradient-to-tr from-amber-500 to-yellow-300 text-slate-950 shadow-md'
                      : 'bg-slate-900 text-slate-600 border border-slate-800'
                  }`}
                >
                  {badge.unlocked ? <Award className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
                </div>

                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-white block">{badge.title}</span>
                  <span className="text-[9px] text-amber-400 uppercase font-bold block">{badge.category} DRILL</span>
                </div>
              </div>

              {badge.unlocked ? (
                <span className="bg-emerald-950 text-emerald-300 border border-emerald-800 text-[9px] font-bold px-2 py-0.5 rounded">
                  UNLOCKED
                </span>
              ) : (
                <span className="text-[9px] text-slate-500 font-bold">{badge.progressPct}%</span>
              )}
            </div>

            <p className="text-[10px] text-slate-400 font-sans">{badge.description}</p>

            {!badge.unlocked && (
              <div className="space-y-1">
                <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-amber-400 h-full" style={{ width: `${badge.progressPct}%` }} />
                </div>
                <button
                  onClick={() => handleGrantBadge(badge.id)}
                  className="w-full py-1.5 bg-slate-900 hover:bg-slate-800 text-amber-300 border border-slate-800 rounded-xl text-[10px] font-bold"
                >
                  AWARD BADGE TO CREW MEMBER
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {awardSuccessMsg && (
        <div className="bg-emerald-950/80 border border-emerald-500 p-3 rounded-2xl text-[10px] text-emerald-300 font-bold text-center">
          {awardSuccessMsg}
        </div>
      )}
    </div>
  );
};
