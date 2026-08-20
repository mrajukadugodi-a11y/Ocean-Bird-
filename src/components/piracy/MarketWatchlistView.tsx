import React, { useState } from 'react';
import { Bookmark, Star, ArrowUpRight, ArrowDownRight, Bell, Plus, Trash2, Fuel, DollarSign } from 'lucide-react';
import { hapticEngine } from '../../utils/hapticUtils';

export interface WatchlistItem {
  id: string;
  assetName: string;
  region: string;
  flag: string;
  assetType: 'VESSEL_VALUATION' | 'FREIGHT_INDEX' | 'BUNKER_FUEL' | 'REGIONAL_WATCHLIST';
  currentPrice: string;
  change24h: number;
  alertThresholdUpper: string;
  alertThresholdLower: string;
  status: 'ACTIVE_MONITORING' | 'ALERT_TRIGGERED';
}

const INITIAL_WATCHLIST: WatchlistItem[] = [
  {
    id: 'WATCH-AU-01',
    assetName: 'Australia Reef & Torres Strait Patrol',
    region: 'Australia (Coral Sea / Torres Strait)',
    flag: '🇦🇺',
    assetType: 'REGIONAL_WATCHLIST',
    currentPrice: 'Risk Level: LOW',
    change24h: 0.2,
    alertThresholdUpper: 'ELEVATED (Torres Strait)',
    alertThresholdLower: 'OPTIMAL (Syndey Port)',
    status: 'ACTIVE_MONITORING'
  },
  {
    id: 'WATCH-NZ-02',
    assetName: 'New Zealand Cook Strait & Hauraki Gulf',
    region: 'New Zealand (Pacific Southwest)',
    flag: '🇳🇿',
    assetType: 'REGIONAL_WATCHLIST',
    currentPrice: 'Risk Level: LOW',
    change24h: 0.1,
    alertThresholdUpper: 'MODERATE (Wellington)',
    alertThresholdLower: 'OPTIMAL (Auckland)',
    status: 'ACTIVE_MONITORING'
  },
  {
    id: 'WATCH-PH-03',
    assetName: 'Philippines Sulu & Celebes Sea Patrol',
    region: 'Philippines (Visayas & Mindanao)',
    flag: '🇵🇭',
    assetType: 'REGIONAL_WATCHLIST',
    currentPrice: 'Risk Level: MODERATE',
    change24h: -1.2,
    alertThresholdUpper: 'HIGH (Sibutu Passage)',
    alertThresholdLower: 'LOW (Manila Harbor)',
    status: 'ACTIVE_MONITORING'
  },
  {
    id: 'WATCH-VN-04',
    assetName: 'Vietnam Vung Tau & Haiphong Corridor',
    region: 'Vietnam (South China Sea / Tonkin)',
    flag: '🇻🇳',
    assetType: 'REGIONAL_WATCHLIST',
    currentPrice: 'Risk Level: MODERATE',
    change24h: 0.8,
    alertThresholdUpper: 'ELEVATED (Vung Tau Anchorage)',
    alertThresholdLower: 'LOW (Da Nang Port)',
    status: 'ACTIVE_MONITORING'
  },
  {
    id: 'WATCH-01',
    assetName: 'Baltic Dry Index (BDI)',
    region: 'Global Freight Market',
    flag: '🌐',
    assetType: 'FREIGHT_INDEX',
    currentPrice: '1,845 Pts',
    change24h: 3.2,
    alertThresholdUpper: '2,000 Pts',
    alertThresholdLower: '1,600 Pts',
    status: 'ACTIVE_MONITORING'
  },
  {
    id: 'WATCH-02',
    assetName: 'Singapore VLSFO Bunker Fuel',
    region: 'Southeast Asia Hub',
    flag: '🇸🇬',
    assetType: 'BUNKER_FUEL',
    currentPrice: '$620 / MT',
    change24h: -1.8,
    alertThresholdUpper: '$650 / MT',
    alertThresholdLower: '$580 / MT',
    status: 'ACTIVE_MONITORING'
  }
];

export const MarketWatchlistView: React.FC = () => {
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>(INITIAL_WATCHLIST);
  const [newAssetName, setNewAssetName] = useState<string>('');

  const handleRemove = (id: string) => {
    hapticEngine.trigger('click');
    setWatchlist((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-2xl space-y-4 font-mono text-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="space-y-0.5">
          <h3 className="text-xs font-bold text-white uppercase flex items-center space-x-2">
            <Bookmark className="w-4 h-4 text-cyan-400" />
            <span>Custom Maritime Market Asset Watchlist & Alert Tracker</span>
          </h3>
          <p className="text-[10px] text-slate-400 font-sans">
            Monitor selected vessel asset valuations, freight index spikes, bunker rates, and price target alerts
          </p>
        </div>

        <span className="bg-cyan-950 text-cyan-300 border border-cyan-800 text-[10px] px-2.5 py-1 rounded font-bold">
          {watchlist.length} ASSETS MONITORED
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {watchlist.map((item) => (
          <div key={item.id} className="bg-slate-950 border border-slate-800 p-4 rounded-2xl space-y-3 relative group">
            <div className="flex justify-between items-start border-b border-slate-900 pb-2">
              <div>
                <div className="flex items-center space-x-1.5">
                  <span className="text-sm">{item.flag || '🌐'}</span>
                  <span className="text-[8px] text-cyan-400 font-bold uppercase">{item.assetType.replace(/_/g, ' ')}</span>
                </div>
                <h4 className="text-xs font-bold text-white mt-0.5">{item.assetName}</h4>
                <span className="text-[9px] text-slate-400 block font-sans">{item.region}</span>
              </div>
              <button
                onClick={() => handleRemove(item.id)}
                className="text-slate-500 hover:text-rose-400 transition-colors p-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex justify-between items-baseline">
              <span className="text-sm font-black text-white">{item.currentPrice}</span>
              <span className={`text-[9px] font-bold flex items-center space-x-0.5 px-1.5 py-0.5 rounded ${
                item.change24h >= 0
                  ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                  : 'bg-rose-950 text-rose-400 border border-rose-800'
              }`}>
                {item.change24h >= 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                <span>{item.change24h > 0 ? `+${item.change24h}` : item.change24h}%</span>
              </span>
            </div>

            <div className="bg-slate-900/80 p-2 rounded-xl border border-slate-800 space-y-1 text-[9px] font-sans">
              <div className="flex justify-between font-mono">
                <span className="text-slate-500">Alert Ceiling:</span>
                <span className="text-amber-400 font-bold">{item.alertThresholdUpper}</span>
              </div>
              <div className="flex justify-between font-mono">
                <span className="text-slate-500">Alert Floor:</span>
                <span className="text-cyan-300 font-bold">{item.alertThresholdLower}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
