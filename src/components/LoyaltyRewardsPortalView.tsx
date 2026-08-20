import React, { useState } from 'react';
import {
  Award,
  Crown,
  Sparkles,
  Plane,
  Ship,
  Gift,
  CreditCard,
  TrendingUp,
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
  Star,
  Zap,
  DollarSign,
  User,
  ArrowUpRight
} from 'lucide-react';

export interface RewardOffer {
  id: string;
  title: string;
  category: 'flight' | 'cruise' | 'lounge' | 'hotel' | 'upgrade';
  pointsCost: number;
  cashEquivalentUSD: number;
  description: string;
  provider: string;
  badge: string;
}

export const LoyaltyRewardsPortalView: React.FC = () => {
  const [memberTier, setMemberTier] = useState<'Gold' | 'Platinum' | 'Diamond' | 'Commodore'>('Diamond');
  const [totalMiles, setTotalMiles] = useState(184250);
  const [tierMiles, setTierMiles] = useState(48200);
  const [nextTierThreshold, setNextTierThreshold] = useState(60000);
  const [memberId, setMemberId] = useState('OB-MAR-982405-DIAMOND');

  const [activeCategory, setActiveCategory] = useState<'all' | 'flight' | 'cruise' | 'lounge' | 'upgrade'>('all');

  const REWARD_OFFERS: RewardOffer[] = [
    {
      id: 'OFF-01',
      title: 'First Class Cabin Upgrade: London (LHR) to Singapore (SIN)',
      category: 'upgrade',
      pointsCost: 45000,
      cashEquivalentUSD: 1400,
      description: 'Upgrade your Business Class booking to private Suite / First Class with gourmet champagne and lie-flat bed.',
      provider: 'Singapore Airlines / OceanBird Alliance',
      badge: 'SUITE UPGRADE'
    },
    {
      id: 'OFF-02',
      title: '7-Night Luxury Mediterranean Cruise Stateroom Pass',
      category: 'cruise',
      pointsCost: 120000,
      cashEquivalentUSD: 3200,
      description: 'Complimentary Oceanview Balcony Stateroom for 2 guests on OceanBird Grand Explorer ships.',
      provider: 'OceanBird Cruise Lines',
      badge: 'FULL CRUISE PASS'
    },
    {
      id: 'OFF-03',
      title: 'Global VIP Airport & Cruise Terminal Lounge Annual Pass',
      category: 'lounge',
      pointsCost: 25000,
      cashEquivalentUSD: 750,
      description: 'Unlimited access to over 1,400 Airport First Class Lounges & Seaport VIP Harbors worldwide.',
      provider: 'OceanBird & Priority Lounge Global',
      badge: 'VIP LOUNGE'
    },
    {
      id: 'OFF-04',
      title: 'Free One-Way Flight: Tokyo Haneda -> Sydney Kingsford',
      category: 'flight',
      pointsCost: 35000,
      cashEquivalentUSD: 950,
      description: 'Economy class reward flight award booking with zero blackout dates for Diamond members.',
      provider: 'Japan Airlines / SkyWings Alliance',
      badge: 'REWARD FLIGHT'
    }
  ];

  const handleRedeem = (offer: RewardOffer) => {
    if (totalMiles < offer.pointsCost) {
      alert(`Insufficient miles! You need ${offer.pointsCost.toLocaleString()} miles. Current balance: ${totalMiles.toLocaleString()}`);
      return;
    }
    setTotalMiles(totalMiles - offer.pointsCost);
    alert(`Successfully redeemed "${offer.title}"! Voucher code sent to member email.`);
  };

  return (
    <div className="space-y-6 text-slate-100 font-sans p-4 sm:p-6 bg-slate-950 min-h-screen">
      {/* MEMBER CARD & TIER SUMMARY */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-amber-500/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <Crown className="w-64 h-64 text-amber-400" />
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center space-x-1.5">
                <Crown className="w-3.5 h-3.5 text-amber-400" />
                <span>OCEANBIRD & SKYWINGS MARINER CLUB</span>
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                DIAMOND STATUS
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Capt. Alexander Vance</h1>
            <p className="text-slate-300 text-xs sm:text-sm font-mono">
              Member ID: <strong className="text-amber-400">{memberId}</strong> | Verified Frequent Mariner & Flyer
            </p>
          </div>

          <div className="bg-slate-950/80 border border-amber-500/30 rounded-2xl p-5 space-y-2 text-right shrink-0 font-mono shadow-xl">
            <span className="text-slate-400 text-xs block uppercase">Available Mariner Miles</span>
            <span className="text-amber-400 font-black text-3xl">{totalMiles.toLocaleString()} PTS</span>
            <span className="text-emerald-400 text-[11px] block font-bold">~$ {(totalMiles * 0.02).toFixed(2)} USD Value</span>
          </div>
        </div>

        {/* TIER PROGRESS BAR */}
        <div className="space-y-2 font-mono text-xs pt-4 border-t border-slate-800/80">
          <div className="flex justify-between items-center text-slate-300">
            <span>Tier Status Progress: <strong className="text-amber-300">{tierMiles.toLocaleString()} / {nextTierThreshold.toLocaleString()} Tier Miles</strong></span>
            <span className="text-purple-400 font-bold">11,800 miles to Commodore Status 👑</span>
          </div>
          <div className="w-full bg-slate-950 h-3 rounded-full overflow-hidden border border-slate-800">
            <div
              className="bg-gradient-to-r from-amber-500 via-purple-500 to-emerald-400 h-full transition-all duration-500"
              style={{ width: `${(tierMiles / nextTierThreshold) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* MEMBER PERKS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-xs">
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-2">
          <span className="text-amber-400 font-bold flex items-center space-x-1.5">
            <Crown className="w-4 h-4" />
            <span>Priority Boarding</span>
          </span>
          <p className="text-slate-400 text-[11px]">VIP Fast-track check-in at all airports & cruise ship gangways worldwide.</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-2">
          <span className="text-sky-400 font-bold flex items-center space-x-1.5">
            <Plane className="w-4 h-4" />
            <span>Luggage Allowance</span>
          </span>
          <p className="text-slate-400 text-[11px]">+2 Extra Checked Bags (32kg each) on all partner flights & cruise liners.</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-2">
          <span className="text-teal-400 font-bold flex items-center space-x-1.5">
            <Ship className="w-4 h-4" />
            <span>Cabin Guarantee</span>
          </span>
          <p className="text-slate-400 text-[11px]">Guaranteed stateroom & flight seat reservation up to 48 hours prior.</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-2">
          <span className="text-emerald-400 font-bold flex items-center space-x-1.5">
            <Zap className="w-4 h-4" />
            <span>200% Points Bonus</span>
          </span>
          <p className="text-slate-400 text-[11px]">Earn 2x miles on every international flight and marine voyage booked.</p>
        </div>
      </div>

      {/* REWARDS CATALOGUE */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <h2 className="text-xl font-black text-white flex items-center space-x-2 font-mono">
              <Gift className="w-6 h-6 text-amber-400" />
              <span>Mariner Miles Reward Redemption Catalogue</span>
            </h2>
            <p className="text-slate-400 text-xs mt-1">
              Redeem accumulated loyalty points for cabin suite upgrades, complimentary cruise staterooms, VIP airport lounges, and reward flights.
            </p>
          </div>

          <div className="flex bg-slate-950 p-1 rounded-2xl border border-slate-800 space-x-1 font-mono text-xs">
            {['all', 'upgrade', 'cruise', 'flight', 'lounge'].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat as any)}
                className={`px-3 py-1.5 rounded-xl font-bold uppercase transition-all ${
                  activeCategory === cat ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {REWARD_OFFERS.filter(o => activeCategory === 'all' || o.category === activeCategory).map((offer) => (
            <div key={offer.id} className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-4 hover:border-amber-500/40 transition-all shadow-lg">
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-mono font-bold uppercase">
                    {offer.badge}
                  </span>
                  <h3 className="text-base font-bold text-white">{offer.title}</h3>
                  <p className="text-xs text-slate-400 font-mono">{offer.provider}</p>
                </div>

                <div className="text-right shrink-0 font-mono">
                  <span className="text-amber-400 font-black text-lg block">{offer.pointsCost.toLocaleString()} PTS</span>
                  <span className="text-slate-500 text-[10px] block">Valued at ${offer.cashEquivalentUSD} USD</span>
                </div>
              </div>

              <p className="text-xs text-slate-300 font-sans leading-relaxed">{offer.description}</p>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between font-mono text-xs">
                <span className="text-slate-400">Status: <strong className="text-emerald-400">Available Instantly</strong></span>
                <button
                  onClick={() => handleRedeem(offer)}
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold uppercase transition-all shadow-md flex items-center space-x-1.5"
                >
                  <Gift className="w-3.5 h-3.5" />
                  <span>REDEEM REWARD</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
