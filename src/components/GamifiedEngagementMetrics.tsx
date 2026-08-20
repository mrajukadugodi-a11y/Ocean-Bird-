import React from 'react';
import { 
  Trophy, Flame, Award, Zap, Star, Shield, CheckCircle2, TrendingUp, 
  Coins, MessageSquare, ThumbsUp, HelpCircle, Activity, Sparkles 
} from 'lucide-react';

interface GamifiedEngagementMetricsProps {
  userXP: number;
  userOD: number;
  streakDays: number;
  userLevel: number;
  userLevelTitle: string;
  unlockedBadges: string[];
  forumPostsCount: number;
  upvotesCount: number;
  expertSolutionsAcceptedCount: number;
}

export const GamifiedEngagementMetrics: React.FC<GamifiedEngagementMetricsProps> = ({
  userXP,
  userOD,
  streakDays,
  userLevel,
  userLevelTitle,
  unlockedBadges,
  forumPostsCount,
  upvotesCount,
  expertSolutionsAcceptedCount
}) => {
  const allBadges = [
    {
      id: 'MARPOL_SCHOLAR',
      title: 'MARPOL Scholar',
      icon: '🎓',
      desc: 'Passed CII & MARPOL Annex VI assessment with >90% score',
      unlocked: unlockedBadges.includes('MARPOL Scholar')
    },
    {
      id: 'OCEAN_SENTINEL',
      title: 'Ocean Sentinel',
      icon: '🛡️',
      desc: 'Prevented >1,000 MT CO2 through verified speed optimization',
      unlocked: unlockedBadges.includes('Ocean Sentinel')
    },
    {
      id: 'TOP_CONTRIBUTOR',
      title: 'Top Contributor',
      icon: '💬',
      desc: 'Published 5+ community discussions with >20 upvotes',
      unlocked: unlockedBadges.includes('Top Contributor') || forumPostsCount >= 5
    },
    {
      id: 'VERIFIED_EXPERT',
      title: 'Verified Expert',
      icon: '🔬',
      desc: 'UN Ocean Decade accredited maritime researcher or auditor',
      unlocked: unlockedBadges.includes('Verified Expert')
    }
  ];

  const nextLevelXP = 1000;
  const currentProgressPercent = Math.min(100, Math.round((userXP / nextLevelXP) * 100));

  return (
    <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-2xl font-mono text-white animate-fadeIn">
      {/* HEADER & STREAK BANNER */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-amber-500/20 border border-amber-400/50 rounded-2xl">
            <Trophy className="w-7 h-7 text-amber-400 animate-bounce" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">GAMIFIED ENGAGEMENT ENGINE</span>
              <span className="bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2 py-0.5 rounded text-[10px] font-bold">
                1.5X XP MULTIPLIER ACTIVE
              </span>
            </div>
            <h2 className="text-lg font-black text-white mt-0.5">Specialist Gamification &amp; Reputation Score</h2>
          </div>
        </div>

        {/* ACTIVE STREAK PILL */}
        <div className="bg-slate-900 border border-amber-500/40 px-4 py-2 rounded-2xl flex items-center space-x-3 shrink-0">
          <Flame className="w-6 h-6 text-amber-400 animate-pulse" />
          <div>
            <span className="text-[9px] text-slate-400 block font-bold uppercase">CONTRIBUTOR STREAK</span>
            <strong className="text-amber-300 font-black text-sm">{streakDays} DAYS ACTIVE 🔥</strong>
          </div>
        </div>
      </div>

      {/* LEVEL & XP PROGRESS METER */}
      <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-3 font-sans">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="text-slate-400 block text-[10px] font-mono uppercase">CURRENT RANK TIER</span>
            <strong className="text-emerald-300 font-mono text-sm">{userLevelTitle}</strong>
          </div>

          <div className="flex items-center space-x-3 text-xs font-mono">
            <span className="text-emerald-400 font-bold">{userXP} / {nextLevelXP} XP ({currentProgressPercent}%)</span>
            <span className="text-amber-300 font-bold flex items-center space-x-1">
              <Coins className="w-3.5 h-3.5 text-amber-400" />
              <span>{userOD} $OD</span>
            </span>
          </div>
        </div>

        <div className="w-full bg-slate-950 h-3.5 rounded-full overflow-hidden border border-slate-800">
          <div 
            className="bg-gradient-to-r from-emerald-500 via-cyan-400 to-indigo-500 h-full rounded-full transition-all duration-500"
            style={{ width: `${currentProgressPercent}%` }}
          />
        </div>
      </div>

      {/* COMMUNITY BADGES GRID */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center space-x-1.5">
            <Award className="w-4 h-4 text-emerald-400" />
            <span>UNLOCKED SPECIALIST COMMUNITY BADGES</span>
          </span>
          <span className="text-[10px] text-slate-400 font-mono">
            {allBadges.filter(b => b.unlocked).length} / {allBadges.length} UNLOCKED
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {allBadges.map((badge) => (
            <div
              key={badge.id}
              className={`p-4 rounded-xl border transition-all space-y-2 flex flex-col justify-between ${
                badge.unlocked
                  ? 'bg-slate-900 border-emerald-500/50 shadow-lg'
                  : 'bg-slate-950 border-slate-800 opacity-60'
              }`}
            >
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-2xl">{badge.icon}</span>
                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded ${
                    badge.unlocked ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-slate-800 text-slate-500'
                  }`}>
                    {badge.unlocked ? 'UNLOCKED' : 'LOCKED'}
                  </span>
                </div>
                <h4 className="font-bold text-white text-xs pt-1">{badge.title}</h4>
                <p className="text-slate-400 text-[10px] font-sans leading-tight">{badge.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* DETAILED STATS COUNTER GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2 border-t border-slate-800">
        <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800 space-y-1">
          <span className="text-[9px] text-slate-400 uppercase block font-bold">THREADS PUBLISHED</span>
          <strong className="text-lg font-black text-indigo-400 block">{forumPostsCount}</strong>
        </div>

        <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800 space-y-1">
          <span className="text-[9px] text-slate-400 uppercase block font-bold">UPVOTES EARNED</span>
          <strong className="text-lg font-black text-cyan-400 block">{upvotesCount}</strong>
        </div>

        <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800 space-y-1">
          <span className="text-[9px] text-slate-400 uppercase block font-bold">EXPERT SOLUTIONS</span>
          <strong className="text-lg font-black text-emerald-400 block">{expertSolutionsAcceptedCount}</strong>
        </div>

        <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800 space-y-1">
          <span className="text-[9px] text-slate-400 uppercase block font-bold">DAILY BONUS</span>
          <strong className="text-lg font-black text-amber-300 block">+50 XP/Day</strong>
        </div>
      </div>
    </div>
  );
};
