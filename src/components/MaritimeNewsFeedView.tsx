import React, { useState } from 'react';
import { Newspaper, Rss, ExternalLink, Bookmark, Search, Volume2, ShieldAlert, TrendingUp, Ship, Fuel, Anchor, Sparkles, Filter, CheckCircle2 } from 'lucide-react';

export interface MaritimeNewsItem {
  id: string;
  title: string;
  category: 'Security & Piracy' | 'IMO Compliance' | 'Green Shipping' | 'Fuel & Bunkering' | 'Port Congestion';
  source: string;
  publishedAt: string;
  summary: string;
  urgency: 'HIGH' | 'MEDIUM' | 'INFO';
  readTime: string;
  isBookmarked?: boolean;
}

export const MARITIME_NEWS_DATA: MaritimeNewsItem[] = [
  {
    id: 'NEWS-001',
    title: 'IMO Enforces Stricter CII Carbon Intensity Ratings for All Global Fleet Vessels',
    category: 'IMO Compliance',
    source: 'International Maritime Organization Bulletin',
    publishedAt: '2026-08-04 06:30 UTC',
    summary: 'The IMO Maritime Safety Committee has issued updated Resolution MSC.528 mandating digital CII reporting and automated carbon offsets for container ships and crude tankers traversing EU and Asian corridors.',
    urgency: 'HIGH',
    readTime: '3 min read'
  },
  {
    id: 'NEWS-002',
    title: 'Malacca Strait Security Advisory: High-Speed Patrol Vessel Escorts Active',
    category: 'Security & Piracy',
    source: 'ReCAAP Information Sharing Centre',
    publishedAt: '2026-08-04 04:15 UTC',
    summary: 'Naval authorities from Singapore, Malaysia, and Indonesia have deployed joint radar-guided patrol boats following reports of attempted boardings near Phillips Channel. Vessels urged to maintain STCW Watch Level 2.',
    urgency: 'HIGH',
    readTime: '4 min read'
  },
  {
    id: 'NEWS-003',
    title: 'Bunker Fuel Market Update: VLSFO Prices Drop 2.4% in Singapore & Fujairah Hubs',
    category: 'Fuel & Bunkering',
    source: 'S&P Global Platts Maritime',
    publishedAt: '2026-08-03 22:00 UTC',
    summary: 'Very Low Sulfur Fuel Oil (VLSFO 0.5%) spot prices traded down to $580/MT in Singapore port approaches. LNG bunker fuel demand surged 14% month-over-month across South Asian bunkering stations.',
    urgency: 'MEDIUM',
    readTime: '2 min read'
  },
  {
    id: 'NEWS-004',
    title: 'Port of Rotterdam & JNPT Mumbai Deploy AI Container Berth Allocation Systems',
    category: 'Port Congestion',
    source: 'Maritime Executive Portal',
    publishedAt: '2026-08-03 16:45 UTC',
    summary: 'Automated AI berth scheduling has slashed average vessel turnaround time from 28 hours down to 18 hours at major international container terminals, improving fleet fuel efficiency.',
    urgency: 'INFO',
    readTime: '3 min read'
  },
  {
    id: 'NEWS-005',
    title: 'Wind-Assisted Rotor Sails Installed on 12 New Capesize Bulk Carriers',
    category: 'Green Shipping',
    source: 'Green Marine Technology Journal',
    publishedAt: '2026-08-03 10:20 UTC',
    summary: 'Rigid suction sails and rotor sails demonstrate up to 12% fuel savings on transatlantic and Indian Ocean trade routes, paving the way for net-zero maritime decarbonization by 2030.',
    urgency: 'INFO',
    readTime: '5 min read'
  }
];

export const MaritimeNewsFeedView: React.FC = () => {
  const [newsList, setNewsList] = useState<MaritimeNewsItem[]>(MARITIME_NEWS_DATA);
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [speakingNewsId, setSpeakingNewsId] = useState<string | null>(null);

  const toggleBookmark = (id: string) => {
    setNewsList((prev) =>
      prev.map((item) => (item.id === id ? { ...item, isBookmarked: !item.isBookmarked } : item))
    );
  };

  const handleSpeak = (item: MaritimeNewsItem) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const textToRead = `${item.title}. ${item.summary}`;
      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.rate = 0.95;
      setSpeakingNewsId(item.id);
      utterance.onend = () => setSpeakingNewsId(null);
      utterance.onerror = () => setSpeakingNewsId(null);
      window.speechSynthesis.speak(utterance);
    }
  };

  const filteredNews = newsList.filter((item) => {
    const matchesCategory = selectedCategory === 'ALL' || item.category === selectedCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.source.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div id="maritime-news-feed-view" className="bg-slate-900 border border-slate-800 rounded-3xl p-6 text-white space-y-6 shadow-2xl">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center space-x-2 text-sky-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Rss className="w-4 h-4 text-sky-400 animate-pulse" />
            <span>LIVE GLOBAL MARITIME INTELLIGENCE & SECURITY FEED</span>
          </div>
          <h2 className="text-xl font-black text-white flex items-center space-x-2">
            <Newspaper className="w-6 h-6 text-sky-400" />
            <span>Maritime News Feeds & Security Intelligence</span>
          </h2>
          <p className="text-xs text-slate-400">
            Real-time news streams on IMO regulations, piracy security alerts, bunker fuel price indexes, green shipping innovations, and port congestion.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative min-w-[260px] font-mono text-xs">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search news titles, fuel, security..."
            className="w-full bg-slate-950 border border-slate-800 rounded-2xl pl-9 pr-3 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-sky-400"
          />
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap gap-2 font-mono text-xs">
        {['ALL', 'Security & Piracy', 'IMO Compliance', 'Green Shipping', 'Fuel & Bunkering', 'Port Congestion'].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-xl font-bold transition-all ${
              selectedCategory === cat
                ? 'bg-sky-500 text-slate-950 shadow-md'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* News Feed Items Grid */}
      <div className="space-y-4">
        {filteredNews.map((news) => {
          const isSpeaking = speakingNewsId === news.id;

          return (
            <div
              key={news.id}
              className={`p-5 rounded-2xl border transition-all space-y-3 ${
                news.urgency === 'HIGH'
                  ? 'bg-slate-950 border-rose-500/40 shadow-xl'
                  : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-2.5">
                <div className="flex items-center space-x-2 font-mono text-xs">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    news.urgency === 'HIGH'
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                      : 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                  }`}>
                    {news.category}
                  </span>
                  <span className="text-slate-400 text-[11px]">{news.source}</span>
                </div>

                <div className="flex items-center space-x-3 font-mono text-[11px] text-slate-400">
                  <span>{news.publishedAt}</span>
                  <span>•</span>
                  <span>{news.readTime}</span>
                </div>
              </div>

              <div>
                <h3 className="text-base font-extrabold text-white hover:text-sky-300 transition-colors cursor-pointer">
                  {news.title}
                </h3>
                <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">{news.summary}</p>
              </div>

              {/* Action Toolbar */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 font-mono text-xs">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleSpeak(news)}
                    className={`px-3 py-1.5 rounded-xl flex items-center space-x-1.5 font-bold transition-all ${
                      isSpeaking ? 'bg-sky-500 text-slate-950 animate-pulse' : 'bg-slate-900 text-sky-400 hover:bg-slate-800'
                    }`}
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>{isSpeaking ? 'READING ALOUD...' : 'READ ALOUD (TTS)'}</span>
                  </button>

                  <button
                    onClick={() => toggleBookmark(news.id)}
                    className={`p-1.5 rounded-xl transition-all ${
                      news.isBookmarked ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'bg-slate-900 text-slate-400 hover:text-white'
                    }`}
                    title="Bookmark News Article"
                  >
                    <Bookmark className="w-4 h-4" />
                  </button>
                </div>

                <span className="text-[10px] text-slate-500 font-bold uppercase">IMO CERTIFIED INTELLIGENCE</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
