import React, { useState } from 'react';
import { 
  TrendingUp, Flame, Activity, Sparkles, BarChart2, Zap, ArrowUpRight, 
  Radio, RefreshCw, Layers, Hash, Cpu, PieChart
} from 'lucide-react';

export interface TrendTopic {
  id: string;
  keyword: string;
  category: string;
  growthPercent: number;
  postsCount: number;
  sentiment: 'POSITIVE' | 'URGENT' | 'TECHNICAL';
  volumeHistory: number[]; // relative bars e.g. [20, 45, 60, 90, 140]
  isHot: boolean;
}

export const INITIAL_TREND_TOPICS: TrendTopic[] = [
  {
    id: 'TR-001',
    keyword: 'MARPOL CII Grade E',
    category: 'Regulatory',
    growthPercent: 340,
    postsCount: 128,
    sentiment: 'URGENT',
    volumeHistory: [25, 40, 75, 110, 180],
    isHot: true
  },
  {
    id: 'TR-002',
    keyword: 'Green Ammonia Bunkering',
    category: 'Alternative Fuels',
    growthPercent: 210,
    postsCount: 94,
    sentiment: 'TECHNICAL',
    volumeHistory: [15, 30, 50, 80, 120],
    isHot: true
  },
  {
    id: 'TR-003',
    keyword: 'Sundarbans Blue Carbon',
    category: 'Ecosystems',
    growthPercent: 185,
    postsCount: 76,
    sentiment: 'POSITIVE',
    volumeHistory: [20, 35, 45, 65, 95],
    isHot: false
  },
  {
    id: 'TR-004',
    keyword: 'PETase Microplastic Drone',
    category: 'Marine Biotech',
    growthPercent: 145,
    postsCount: 62,
    sentiment: 'POSITIVE',
    volumeHistory: [10, 25, 40, 55, 75],
    isHot: false
  },
  {
    id: 'TR-005',
    keyword: 'Hydroacoustic Whale Slowdown',
    category: 'Acoustics',
    growthPercent: 120,
    postsCount: 51,
    sentiment: 'URGENT',
    volumeHistory: [12, 22, 35, 48, 65],
    isHot: false
  }
];

interface ForumTrendsRadarProps {
  onSelectTopicTag?: (tag: string) => void;
  onTriggerToast: (msg: string) => void;
}

export const ForumTrendsRadar: React.FC<ForumTrendsRadarProps> = ({ onSelectTopicTag, onTriggerToast }) => {
  const [trends, setTrends] = useState<TrendTopic[]>(INITIAL_TREND_TOPICS);
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  const handleRefreshRadar = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      onTriggerToast('⚡ Forum Trends Radar re-indexed! Live discussion velocity updated.');
    }, 1200);
  };

  const filteredTrends = trends.filter(
    t => selectedCategory === 'ALL' || t.category === selectedCategory
  );

  return (
    <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-2xl font-mono text-white animate-fadeIn">
      {/* HEADER BAR */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-amber-500/20 border border-amber-400/40 rounded-xl relative">
            <TrendingUp className="w-6 h-6 text-amber-400 animate-pulse" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
            </span>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">REAL-TIME DISCUSSION VELOCITY</span>
              <span className="bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2 py-0.5 rounded text-[10px] font-bold">
                RADAR LIVE
              </span>
            </div>
            <h2 className="text-lg font-black text-white mt-0.5">Forum Trends &amp; Sentiment Heatmap Radar</h2>
          </div>
        </div>

        <button
          onClick={handleRefreshRadar}
          disabled={isRefreshing}
          className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-amber-300 border border-amber-500/40 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 shrink-0"
        >
          <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-amber-400' : ''}`} />
          <span>{isRefreshing ? 'INDEXING RADAR...' : 'RE-INDEX TRENDS'}</span>
        </button>
      </div>

      {/* HIGHLIGHT TOP HOT TREND SUMMARY */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-amber-950/60 to-slate-950 border border-amber-500/40 p-4 rounded-xl space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-amber-400 font-bold uppercase flex items-center space-x-1">
              <Flame className="w-3.5 h-3.5 text-amber-400 animate-bounce" />
              <span>TOP TRENDING KEYWORD</span>
            </span>
            <span className="bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[9px] font-bold px-2 py-0.5 rounded">
              +340% SPIKE
            </span>
          </div>
          <strong className="text-base font-black text-white block">MARPOL CII Grade E</strong>
          <span className="text-[10px] text-slate-400 font-sans block">
            128 Active posts • 42 Officer queries today
          </span>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-cyan-400 font-bold uppercase flex items-center space-x-1">
              <Activity className="w-3.5 h-3.5 text-cyan-400" />
              <span>DISCUSSION VOLUME</span>
            </span>
            <span className="text-emerald-400 text-[10px] font-bold">HIGH DENSITY</span>
          </div>
          <strong className="text-base font-black text-white block">411 Forum Messages / 24h</strong>
          <span className="text-[10px] text-slate-400 font-sans block">
            Average response latency: &lt;14 minutes
          </span>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-emerald-400 font-bold uppercase flex items-center space-x-1">
              <Zap className="w-3.5 h-3.5 text-emerald-400" />
              <span>EXPERT RESOLUTION RATE</span>
            </span>
            <span className="text-emerald-300 text-[10px] font-bold">92.4%</span>
          </div>
          <strong className="text-base font-black text-white block">Verified Solutions</strong>
          <span className="text-[10px] text-slate-400 font-sans block">
            Accredited response within 1.2 hours
          </span>
        </div>
      </div>

      {/* TREND TOPICS BREAKDOWN LIST WITH SPARKLINE BARS */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">TRENDING TOPICS &amp; VOLUME VELOCITY</span>
          <div className="flex space-x-1 text-[10px] font-mono">
            {['ALL', 'Regulatory', 'Alternative Fuels', 'Ecosystems', 'Marine Biotech'].map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2 py-0.5 rounded transition-all ${
                  selectedCategory === cat ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-slate-900 text-slate-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          {filteredTrends.map((topic) => (
            <div
              key={topic.id}
              className="bg-slate-900 border border-slate-800 hover:border-slate-700 p-4 rounded-xl transition-all space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg font-black text-xs ${
                    topic.isHot ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'bg-slate-950 text-slate-400 border border-slate-800'
                  }`}>
                    #{topic.category.substring(0, 3).toUpperCase()}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="font-black text-white text-sm">{topic.keyword}</h4>
                      {topic.isHot && (
                        <span className="bg-rose-500/20 text-rose-300 border border-rose-500/40 text-[8px] font-black px-2 py-0.5 rounded flex items-center space-x-1">
                          <Flame className="w-2.5 h-2.5" />
                          <span>VIRAL HOT</span>
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-slate-400 font-sans">
                      {topic.postsCount} Discussions • Sentiment: <strong className="text-cyan-300 font-mono">{topic.sentiment}</strong>
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-3 shrink-0">
                  <div className="text-right">
                    <span className="text-emerald-400 text-xs font-black flex items-center space-x-0.5 justify-end">
                      <ArrowUpRight className="w-3.5 h-3.5" />
                      <span>+{topic.growthPercent}%</span>
                    </span>
                    <span className="text-[9px] text-slate-500 block uppercase font-bold">7D VELOCITY</span>
                  </div>

                  {onSelectTopicTag && (
                    <button
                      onClick={() => {
                        onSelectTopicTag(topic.keyword.split(' ')[0]);
                        onTriggerToast(`🔍 Filtered forum discussions by trending topic: "${topic.keyword}"`);
                      }}
                      className="px-3 py-1.5 bg-slate-950 hover:bg-amber-500/20 text-amber-300 border border-slate-800 hover:border-amber-500/40 rounded-lg text-xs font-bold transition-all"
                    >
                      EXPLORE TOPIC
                    </button>
                  )}
                </div>
              </div>

              {/* VISUAL SPARKLINE VELOCITY BARS */}
              <div className="space-y-1 pt-1">
                <div className="flex items-center justify-between text-[9px] text-slate-500">
                  <span>HISTORICAL VELOCITY TRAJECTORY</span>
                  <span>CURRENT PEAK</span>
                </div>
                <div className="flex items-end space-x-1.5 h-7 bg-slate-950 p-1 rounded-lg border border-slate-800">
                  {topic.volumeHistory.map((val, idx) => (
                    <div
                      key={idx}
                      className={`flex-1 rounded-sm transition-all ${
                        idx === topic.volumeHistory.length - 1 ? 'bg-amber-400 shadow-md' : 'bg-slate-800 hover:bg-slate-700'
                      }`}
                      style={{ height: `${Math.min(100, Math.max(15, (val / 180) * 100))}%` }}
                      title={`Volume step ${idx + 1}: ${val}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
