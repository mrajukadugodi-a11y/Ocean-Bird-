import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Trophy,
  Award,
  Sparkles,
  Ship,
  UserCheck,
  CheckCircle2,
  Ticket,
  Search,
  PlusCircle,
  Share2,
  Flame,
  Star,
  Quote,
  X,
  Send,
  Building2,
  Anchor,
  Globe
} from 'lucide-react';
import { hapticEngine } from '../../utils/hapticUtils';

interface WinnerCardItem {
  id: string;
  name: string;
  role: string;
  shipName: string;
  vesselType: 'Container & Cargo' | 'Luxury Cruise' | 'Offshore Rigs' | 'Oil Tanker';
  flagState: string;
  drawRef: string;
  prizeUSD: number;
  matchedNumbers: number[];
  powerball: number;
  storyQuote: string;
  verified: boolean;
  avatarBg: string;
}

export const WinnerSpotlightView: React.FC = () => {
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showSubmitModal, setShowSubmitModal] = useState<boolean>(false);

  // Submit Story Form State
  const [submitName, setSubmitName] = useState<string>('');
  const [submitShip, setSubmitShip] = useState<string>('');
  const [submitDrawRef, setSubmitDrawRef] = useState<string>('Draw #8940');
  const [submitStory, setSubmitStory] = useState<string>('');
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);

  // Winner Database
  const [winnersList, setWinnersList] = useState<WinnerCardItem[]>([
    {
      id: 'WIN-8930-01',
      name: 'Capt. Viktor Ivanov & Crew',
      role: 'Master Mariner & 12 Crew Syndicate',
      shipName: 'M/V Atlantic Voyager',
      vesselType: 'Container & Cargo',
      flagState: 'Panama (IMO 948201)',
      drawRef: 'Draw #8930 Mega Jackpot',
      prizeUSD: 1250000,
      matchedNumbers: [7, 14, 21, 28, 42],
      powerball: 9,
      storyQuote: 'We bought 5 slips as a crew syndicate during our trans-Pacific voyage from Yokohama to Rotterdam. When ball #42 dropped, the entire mess deck erupted in celebration!',
      verified: true,
      avatarBg: 'from-amber-400 to-amber-600'
    },
    {
      id: 'WIN-8935-02',
      name: 'Elena Rostova',
      role: 'Cruise Guest & Passenger',
      shipName: 'M/S Ocean Empress',
      vesselType: 'Luxury Cruise',
      flagState: 'Bahamas (IMO 990142)',
      drawRef: 'Draw #8935 Tier 2 Winner',
      prizeUSD: 150000,
      matchedNumbers: [4, 18, 29, 33, 49],
      powerball: 14,
      storyQuote: 'Playing the maritime lottery while sailing off the Caribbean coast was magical. The instant Ocean Dollar payout paid for our entire luxury cruise!',
      verified: true,
      avatarBg: 'from-cyan-400 to-cyan-600'
    },
    {
      id: 'WIN-8928-03',
      name: 'Chief Eng. Marcus Vance',
      role: 'Chief Engineer',
      shipName: 'Deepwater Horizon II Rig',
      vesselType: 'Offshore Rigs',
      flagState: 'Marshall Islands (IMO 910244)',
      drawRef: 'Draw #8928 Tier 2 Winner',
      prizeUSD: 150000,
      matchedNumbers: [9, 12, 24, 38, 41],
      powerball: 7,
      storyQuote: 'Offshore shifts are tough, but this jackpot win boosted team morale infinitely. Split half the winnings with my watch engineer crew!',
      verified: true,
      avatarBg: 'from-emerald-400 to-emerald-600'
    },
    {
      id: 'WIN-8922-04',
      name: 'Second Officer Chen Wei',
      role: 'Navigational Officer',
      shipName: 'M/T Pacific Glory',
      vesselType: 'Oil Tanker',
      flagState: 'Liberia (IMO 964201)',
      drawRef: 'Draw #8922 Tier 3 Winner',
      prizeUSD: 15000,
      matchedNumbers: [11, 22, 31, 40],
      powerball: 18,
      storyQuote: 'Purchased slip right before entering the Malacca Strait. Couldn’t believe my eyes when the verification hash turned green!',
      verified: true,
      avatarBg: 'from-purple-400 to-purple-600'
    }
  ]);

  const handleStorySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!submitName || !submitStory) return;
    hapticEngine.trigger('success');
    setSubmitSuccess(true);

    const newEntry: WinnerCardItem = {
      id: `WIN-${Date.now().toString().slice(-4)}`,
      name: submitName,
      role: 'Seafarer / Passenger',
      shipName: submitShip || 'High Seas Vessel',
      vesselType: 'Container & Cargo',
      flagState: 'International Flag',
      drawRef: submitDrawRef,
      prizeUSD: 500,
      matchedNumbers: [8, 16, 24, 32, 40],
      powerball: 5,
      storyQuote: submitStory,
      verified: true,
      avatarBg: 'from-rose-400 to-rose-600'
    };

    setTimeout(() => {
      setWinnersList((prev) => [newEntry, ...prev]);
      setShowSubmitModal(false);
      setSubmitSuccess(false);
      setSubmitName('');
      setSubmitShip('');
      setSubmitStory('');
    }, 1500);
  };

  const filteredWinners = winnersList.filter((win) => {
    const matchesCat = activeCategoryFilter === 'ALL' || win.vesselType === activeCategoryFilter;
    const matchesSearch =
      win.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      win.shipName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      win.drawRef.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-8 font-sans">
      {/* FEATURED GRAND JACKPOT HERO SPOTLIGHT BANNER */}
      <div className="bg-gradient-to-r from-amber-950/60 via-slate-900 to-slate-950 border-2 border-amber-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden font-mono">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <span className="bg-amber-500 text-slate-950 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider flex items-center space-x-1.5 shadow-lg shadow-amber-500/20">
                <Trophy className="w-3.5 h-3.5 fill-slate-950" />
                <span>Featured Winner Spotlight</span>
              </span>
              <span className="bg-slate-950 text-amber-300 border border-amber-500/30 text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center space-x-1">
                <CheckCircle2 className="w-3 h-3 text-amber-400" />
                <span>MGA Verified Winner Certificate</span>
              </span>
            </div>

            <h2 className="text-xl sm:text-3xl font-black text-white">
              Capt. Viktor Ivanov & Crew
            </h2>

            <div className="flex items-center space-x-3 text-xs text-slate-300 font-sans">
              <span className="flex items-center space-x-1 text-cyan-400 font-bold">
                <Ship className="w-4 h-4" />
                <span>M/V Atlantic Voyager (Container Ship)</span>
              </span>
              <span>•</span>
              <span className="text-slate-400 font-mono">Panama Flag • IMO 948201</span>
            </div>

            <p className="text-xs sm:text-sm text-slate-200 font-sans max-w-2xl italic leading-relaxed bg-slate-950/60 p-4 rounded-2xl border border-amber-500/20">
              <Quote className="w-4 h-4 text-amber-400 inline-block mr-2" />
              "We bought 5 slips as a crew syndicate during our trans-Pacific voyage from Yokohama to Rotterdam. When ball #42 dropped, the entire mess deck erupted in celebration!"
            </p>
          </div>

          <div className="bg-slate-950 border-2 border-amber-400 p-6 rounded-3xl shrink-0 space-y-2 text-center shadow-2xl bg-gradient-to-b from-amber-950/40 to-slate-950">
            <span className="text-xs text-amber-300 block uppercase font-bold">Grand Jackpot Payout</span>
            <div className="text-3xl sm:text-4xl font-black text-amber-400">$1,250,000 $OD</div>
            <span className="text-[10px] text-slate-300 font-mono block">Draw #8930 • 5 Balls + Powerball</span>
          </div>
        </div>
      </div>

      {/* WINNER HALL OF FAME GALLERY */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4 font-mono">
          <div className="space-y-1">
            <h3 className="text-sm sm:text-base font-black text-white uppercase flex items-center space-x-2">
              <Award className="w-5 h-5 text-emerald-400" />
              <span>High Seas Winners Hall of Fame</span>
            </h3>
            <p className="text-xs text-slate-400 font-sans">
              Spotlight gallery of lucky seafarers, cruise guests, and vessel crew syndicates.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search winner or ship..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400 font-mono w-48"
              />
            </div>

            <button
              onClick={() => {
                setShowSubmitModal(true);
                hapticEngine.trigger('click');
              }}
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black px-4 py-2 rounded-xl text-xs transition-all flex items-center space-x-1.5 shadow-lg shadow-emerald-500/20 shrink-0"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Submit Story</span>
            </button>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto text-xs pb-1 font-mono">
          {['ALL', 'Container & Cargo', 'Luxury Cruise', 'Offshore Rigs', 'Oil Tanker'].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategoryFilter(cat)}
              className={`px-3.5 py-1.5 rounded-xl font-bold transition-all shrink-0 ${
                activeCategoryFilter === cat
                  ? 'bg-emerald-500 text-slate-950 font-black shadow-lg'
                  : 'bg-slate-950 text-slate-400 border border-slate-800 hover:border-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Winners Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredWinners.map((winner) => (
            <div
              key={winner.id}
              className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 font-mono shadow-xl hover:border-slate-700 transition-all relative overflow-hidden flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${winner.avatarBg} text-slate-950 font-black text-lg flex items-center justify-center shadow-lg shrink-0`}>
                      {winner.name.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="text-sm font-black text-white">{winner.name}</h4>
                        {winner.verified && (
                          <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
                        )}
                      </div>
                      <span className="text-[11px] text-slate-400 font-sans block">{winner.role}</span>
                    </div>
                  </div>

                  <span className="bg-slate-950 border border-slate-800 text-emerald-400 text-xs font-black px-3 py-1 rounded-xl">
                    ${winner.prizeUSD.toLocaleString()} $OD
                  </span>
                </div>

                <div className="flex items-center justify-between text-[11px] bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-slate-300">
                  <span className="flex items-center space-x-1 text-cyan-400 font-bold">
                    <Ship className="w-3.5 h-3.5" />
                    <span>{winner.shipName}</span>
                  </span>
                  <span className="text-slate-500">{winner.flagState}</span>
                </div>

                <p className="text-xs text-slate-300 font-sans italic leading-relaxed bg-slate-950/40 p-3 rounded-xl border border-slate-800/80">
                  "{winner.storyQuote}"
                </p>
              </div>

              {/* Matched Numbers Bar */}
              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-400 font-bold text-[10px] uppercase">Winning Slip:</span>
                <div className="flex items-center space-x-1.5">
                  {winner.matchedNumbers.map((num) => (
                    <span
                      key={num}
                      className="w-6 h-6 rounded-lg bg-emerald-500 text-slate-950 font-black text-[10px] flex items-center justify-center"
                    >
                      {num}
                    </span>
                  ))}
                  <span className="w-6 h-6 rounded-lg bg-rose-500 text-white font-black text-[10px] flex items-center justify-center">
                    {winner.powerball}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SUBMIT STORY MODAL */}
      <AnimatePresence>
        {showSubmitModal && (
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4 font-mono">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-6 shadow-2xl relative"
            >
              <button
                onClick={() => setShowSubmitModal(false)}
                className="absolute right-5 top-5 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-1 border-b border-slate-800 pb-4">
                <h3 className="text-lg font-black text-white flex items-center space-x-2">
                  <Sparkles className="w-5 h-5 text-amber-400" />
                  <span>Submit Your Winner Story</span>
                </h3>
                <p className="text-xs text-slate-400 font-sans">
                  Share your lucky story from your voyage to be featured in the High Seas Hall of Fame!
                </p>
              </div>

              <form onSubmit={handleStorySubmit} className="space-y-4 text-xs">
                <div className="space-y-1.5">
                  <label className="text-slate-300 font-bold block">Your Name / Rank:</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Chief Officer Alex Rivera"
                    value={submitName}
                    onChange={(e) => setSubmitName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-emerald-400"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-slate-300 font-bold block">Ship Name / Vessel:</label>
                  <input
                    type="text"
                    placeholder="e.g. M/V Pacific Pioneer"
                    value={submitShip}
                    onChange={(e) => setSubmitShip(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-emerald-400"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-slate-300 font-bold block">Winning Draw Reference:</label>
                  <input
                    type="text"
                    value={submitDrawRef}
                    onChange={(e) => setSubmitDrawRef(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-emerald-400"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-slate-300 font-bold block">Your Winning Story & Reaction:</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Tell us how you picked your numbers or celebrated with your crew..."
                    value={submitStory}
                    onChange={(e) => setSubmitStory(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-white font-sans focus:outline-none focus:border-emerald-400"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitSuccess}
                  className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black py-3 rounded-2xl text-xs transition-all flex items-center justify-center space-x-2 shadow-lg shadow-emerald-500/20"
                >
                  {submitSuccess ? (
                    <span>Submitted for Audit Review!</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Publish to High Seas Spotlight</span>
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
