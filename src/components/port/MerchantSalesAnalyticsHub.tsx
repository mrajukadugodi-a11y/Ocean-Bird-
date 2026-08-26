import React, { useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  DollarSign,
  Users,
  ShoppingBag,
  Download,
  Calendar,
  Filter,
  CheckCircle2,
  PieChart,
  Percent,
  Receipt,
  Sparkles
} from 'lucide-react';
import { hapticEngine } from '../../utils/hapticUtils';

export interface MerchantRevenueCategory {
  category: string;
  revenueUSD: number;
  percentage: number;
  salesVolume: number;
}

const CATEGORY_REVENUE: MerchantRevenueCategory[] = [
  {
    category: 'Duty-Free Luxury Watches & Perfumes',
    revenueUSD: 119490,
    percentage: 42,
    salesVolume: 1240
  },
  {
    category: 'Marine Tech & Navigation Wearables',
    revenueUSD: 79660,
    percentage: 28,
    salesVolume: 820
  },
  {
    category: 'Coastal Artisans & Teak Woodcrafts',
    revenueUSD: 51210,
    percentage: 18,
    salesVolume: 1850
  },
  {
    category: 'Dockside Seafood Dining & Promenade Bars',
    revenueUSD: 34140,
    percentage: 12,
    salesVolume: 2100
  }
];

interface MerchantSalesAnalyticsHubProps {
  triggerToast?: (msg: string, type?: 'success' | 'info' | 'warning' | 'error', title?: string) => void;
}

export const MerchantSalesAnalyticsHub: React.FC<MerchantSalesAnalyticsHubProps> = ({ triggerToast }) => {
  const [dateRange, setDateRange] = useState<'TODAY' | 'WEEK' | 'MONTH' | 'YEAR'>('MONTH');
  const [categories, setCategories] = useState<MerchantRevenueCategory[]>(CATEGORY_REVENUE);

  const notify = (msg: string, type: 'success' | 'info' | 'warning' | 'error' = 'info', title?: string) => {
    if (triggerToast) {
      triggerToast(msg, type, title);
    } else {
      console.log(`[${type}] ${title}: ${msg}`);
    }
  };

  const totalGrossRevenue = categories.reduce((acc, c) => acc + c.revenueUSD, 0);
  const totalTaxRefunded = Math.round(totalGrossRevenue * 0.2); // 20% duty-free refund
  const totalResidentDiscounts = Math.round(totalGrossRevenue * 0.08);

  const handleExportCSV = () => {
    hapticEngine.trigger('success');
    notify('Exported Merchant Sales & Tax Audit Report to CSV!', 'success', 'ANALYTICS EXPORTED');
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 sm:p-8 space-y-6 shadow-2xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <BarChart3 className="w-6 h-6 text-cyan-400" />
              <h2 className="text-xl font-bold text-white">Port Merchant Sales &amp; Revenue Analytics</h2>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Live sales performance telemetry, duty-free tax refund disbursement stats, and cruise passenger traffic heatmaps.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            {/* Date Range Selector */}
            <div className="flex items-center space-x-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-mono">
              {(['TODAY', 'WEEK', 'MONTH', 'YEAR'] as const).map((r) => (
                <button
                  key={r}
                  onClick={() => {
                    setDateRange(r);
                    hapticEngine.trigger('click');
                  }}
                  className={`px-3 py-1 rounded-lg transition-all ${
                    dateRange === r ? 'bg-cyan-500 text-slate-950 font-black' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>

            <button
              onClick={handleExportCSV}
              className="px-3.5 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 text-cyan-400 font-mono text-xs border border-slate-800 flex items-center space-x-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* Top Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-1">
            <span className="text-[10px] font-mono text-slate-400 font-bold block">GROSS PORT SALES REVENUE</span>
            <span className="text-2xl font-black font-mono text-white">
              ${totalGrossRevenue.toLocaleString()} <span className="text-xs text-emerald-400 font-bold">+18.4%</span>
            </span>
            <span className="text-[10px] font-mono text-slate-500 block">Total 6,010 Transactions</span>
          </div>

          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-1">
            <span className="text-[10px] font-mono text-slate-400 font-bold block">DUTY-FREE TAX REFUNDS DISBURSED</span>
            <span className="text-2xl font-black font-mono text-emerald-400">
              ${totalTaxRefunded.toLocaleString()}
            </span>
            <span className="text-[10px] font-mono text-slate-500 block">Instant On-Spot Gate QR Refunds</span>
          </div>

          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-1">
            <span className="text-[10px] font-mono text-slate-400 font-bold block">COASTAL RESIDENT DISCOUNTS</span>
            <span className="text-2xl font-black font-mono text-amber-400">
              ${totalResidentDiscounts.toLocaleString()}
            </span>
            <span className="text-[10px] font-mono text-slate-500 block">Honor Rate: 100% Resident Cards</span>
          </div>
        </div>

        {/* Category Breakdown Progress Bars */}
        <div className="space-y-4 pt-2">
          <h3 className="text-sm font-bold text-white flex items-center space-x-2">
            <PieChart className="w-4 h-4 text-cyan-400" />
            <span>Revenue Breakdown by Merchant Category</span>
          </h3>

          <div className="space-y-3">
            {categories.map((cat) => (
              <div key={cat.category} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-white font-bold">{cat.category}</span>
                  <span className="text-cyan-400 font-bold">${cat.revenueUSD.toLocaleString()} ({cat.percentage}%)</span>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                  <div
                    style={{ width: `${cat.percentage}%` }}
                    className="bg-gradient-to-r from-cyan-500 to-blue-600 h-full rounded-full transition-all duration-500"
                  />
                </div>

                <div className="flex justify-between items-center text-[10px] font-mono text-slate-500">
                  <span>Sales Volume: {cat.salesVolume} Items Sold</span>
                  <span>Avg Ticket: ${(cat.revenueUSD / cat.salesVolume).toFixed(0)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
