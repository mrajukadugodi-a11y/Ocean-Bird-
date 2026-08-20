import React, { useState } from 'react';
import { LayoutGrid, ShieldAlert, Navigation, Anchor, Waves, BarChart3, ArrowRight, Activity, CheckCircle2, AlertTriangle, Radio } from 'lucide-react';
import { motion } from 'motion/react';
import { hapticEngine } from '../../utils/hapticUtils';

export interface DashboardCategory {
  id: string;
  name: string;
  iconName: string;
  description: string;
  activeMetricsCount: number;
  threatStatus: 'OPTIMAL' | 'ELEVATED' | 'CRITICAL';
  keyModules: string[];
}

const DASHBOARD_CATEGORIES: DashboardCategory[] = [
  {
    id: 'REGIONAL_WATCHLIST',
    name: 'Regional Watchlist & Indo-Pacific Patrols',
    iconName: 'Bookmark',
    description: 'Active marine watchlist monitoring for Australia, New Zealand, Philippines, Vietnam, and South China Sea transit corridors.',
    activeMetricsCount: 16,
    threatStatus: 'ELEVATED',
    keyModules: ['Australia Watch', 'New Zealand Watch', 'Philippines Patrol', 'Vietnam Corridor']
  },
  {
    id: 'SEC_THREATS',
    name: 'Maritime Security & Defense',
    iconName: 'ShieldAlert',
    description: 'Live AIS radar threat detection, drone surveillance arrays, evasion drills, and historical piracy alerts.',
    activeMetricsCount: 14,
    threatStatus: 'ELEVATED',
    keyModules: ['Sensor AIS Radar', 'Drone Surveillance', 'Historical Alerts', 'Smart Alerts']
  },
  {
    id: 'NAV_TELEMETRY',
    name: 'Vessel Navigation & Telemetry',
    iconName: 'Navigation',
    description: '3D Differential GPS location tracker, ECDIS synchronization, sonar acoustic clips, and gyro headings.',
    activeMetricsCount: 8,
    threatStatus: 'OPTIMAL',
    keyModules: ['Ship GPS Tracker', 'Sonar Clips', 'Voice Search', 'Bridge Language']
  },
  {
    id: 'PORT_LOGISTICS',
    name: 'Port Safety & Cargo Turnaround',
    iconName: 'Anchor',
    description: 'Side-by-side port comparison matrix, ISPS security levels, laytime time cards, and fuel oil logs.',
    activeMetricsCount: 12,
    threatStatus: 'OPTIMAL',
    keyModules: ['Port Comparison', 'Port Time Card', 'Ship Fuel Logs', 'Port Safety Rating']
  },
  {
    id: 'CLIMATE_OCEAN',
    name: 'Oceanography & Climate Risk',
    iconName: 'Waves',
    description: 'Douglas & Beaufort sea state legends, sea surface temp (SST) anomalies, and pollution spill tracking.',
    activeMetricsCount: 9,
    threatStatus: 'ELEVATED',
    keyModules: ['Sea State Legend', 'Sea Temp Trend', 'Climate Matrix', 'Pollution Reports']
  },
  {
    id: 'ANALYTICS_DATA',
    name: 'Multi-Parametric Trends & Export',
    iconName: 'BarChart3',
    description: 'Historical milestone event markers, multi-parametric trend query builder, and CSV dataset exporter.',
    activeMetricsCount: 18,
    threatStatus: 'OPTIMAL',
    keyModules: ['Trend Filters', 'Export CSV', 'Interactive Tooltips', 'Trend Markers']
  }
];

interface CategoryWiseDashboardViewProps {
  onSelectTab?: (tabKey: string) => void;
}

export const CategoryWiseDashboardView: React.FC<CategoryWiseDashboardViewProps> = ({ onSelectTab }) => {
  const [selectedCategory, setSelectedCategory] = useState<DashboardCategory>(DASHBOARD_CATEGORIES[0]);

  const getStatusBadge = (status: 'OPTIMAL' | 'ELEVATED' | 'CRITICAL') => {
    switch (status) {
      case 'OPTIMAL':
        return <span className="bg-emerald-950 text-emerald-300 border border-emerald-800 text-[9px] px-2 py-0.5 rounded font-bold">OPTIMAL STATUS</span>;
      case 'ELEVATED':
        return <span className="bg-amber-950 text-amber-300 border border-amber-800 text-[9px] px-2 py-0.5 rounded font-bold">ELEVATED WATCH</span>;
      case 'CRITICAL':
        return <span className="bg-rose-950 text-rose-300 border border-rose-800 text-[9px] px-2 py-0.5 rounded font-bold">CRITICAL THREAT</span>;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-2xl space-y-4 font-mono text-xs"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="space-y-0.5">
          <h3 className="text-xs font-bold text-white uppercase flex items-center space-x-2">
            <LayoutGrid className="w-4 h-4 text-cyan-400" />
            <span>Category-Wise Unified Maritime Security & Operational Dashboard</span>
          </h3>
          <p className="text-[10px] text-slate-400 font-sans">
            Categorized command center consolidating security threats, navigation telemetry, port logistics, oceanography, and data analytics
          </p>
        </div>

        <span className="bg-cyan-950 text-cyan-300 border border-cyan-800 text-[10px] px-2.5 py-1 rounded font-bold">
          6 OPERATIONAL CATEGORIES
        </span>
      </div>

      {/* Category Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {DASHBOARD_CATEGORIES.map((cat) => {
          const isSelected = selectedCategory.id === cat.id;
          return (
            <div
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat);
                hapticEngine.trigger('click');
              }}
              className={`p-4 rounded-2xl border cursor-pointer transition-all space-y-3 flex flex-col justify-between ${
                isSelected
                  ? 'bg-slate-950 border-cyan-400 ring-1 ring-cyan-400'
                  : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="space-y-2">
                <div className="flex justify-between items-center border-b border-slate-900 pb-2">
                  <h4 className="text-xs font-bold text-white uppercase">{cat.name}</h4>
                  {getStatusBadge(cat.threatStatus)}
                </div>

                <p className="text-[9px] text-slate-400 font-sans leading-relaxed">{cat.description}</p>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-900">
                <div className="flex justify-between items-center text-[9px]">
                  <span className="text-slate-500">ACTIVE TELEMETRY METRICS:</span>
                  <span className="text-cyan-300 font-bold">{cat.activeMetricsCount} SENSORS</span>
                </div>

                <div className="flex flex-wrap gap-1">
                  {cat.keyModules.map((mod) => (
                    <span key={mod} className="bg-slate-900 text-slate-300 text-[8px] px-2 py-0.5 rounded border border-slate-800">
                      {mod}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Category Focus & Quick Launch Section */}
      <div className="bg-slate-950 border border-slate-800 p-5 rounded-2xl space-y-3">
        <div className="flex justify-between items-center border-b border-slate-800 pb-2">
          <div className="space-y-0.5">
            <span className="text-[8px] text-cyan-400 font-bold block">{selectedCategory.id} FOCUS CATEGORY</span>
            <h4 className="text-sm font-bold text-white">{selectedCategory.name}</h4>
          </div>
          {getStatusBadge(selectedCategory.threatStatus)}
        </div>

        <p className="text-[10px] text-slate-300 font-sans leading-relaxed">{selectedCategory.description}</p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
          {selectedCategory.keyModules.map((mod) => (
            <div
              key={mod}
              className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-center space-y-1 hover:border-cyan-400 transition-colors"
            >
              <span className="text-[9px] text-slate-400 font-bold block truncate">{mod}</span>
              <span className="text-[8px] text-emerald-400 font-mono block">ONLINE & MONITORING</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
