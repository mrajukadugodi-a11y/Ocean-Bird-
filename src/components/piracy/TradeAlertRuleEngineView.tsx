import React, { useState } from 'react';
import { Bell, ShieldAlert, AlertTriangle, Zap, CheckCircle2, Volume2, Radio, Send, Plus, Trash2 } from 'lucide-react';
import { hapticEngine } from '../../utils/hapticUtils';

export interface AlertTriggerRule {
  id: string;
  title: string;
  targetRegion: string;
  metricType: 'PIRACY_INCIDENT' | 'FREIGHT_RATE_SPIKE' | 'SUEZ_CONGESTION' | 'WEATHER_STORM';
  thresholdCondition: string;
  notificationTarget: 'MOBILE_PUSH' | 'SATELLITE_SMS' | 'WEBHOOK';
  active: boolean;
}

const SAMPLE_RULES: AlertTriggerRule[] = [
  {
    id: 'RULE-101',
    title: 'Bab-el-Mandeb Piracy Skiff Proximity Alert',
    targetRegion: 'Gulf of Aden / Red Sea',
    metricType: 'PIRACY_INCIDENT',
    thresholdCondition: 'Unidentified fast craft < 8 Nautical Miles',
    notificationTarget: 'SATELLITE_SMS',
    active: true
  },
  {
    id: 'RULE-102',
    title: 'Baltic Dry Index Freight Rate Volatility Spike',
    targetRegion: 'Global Spot Markets',
    metricType: 'FREIGHT_RATE_SPIKE',
    thresholdCondition: 'BDI Index shifts > 5.0% in 12 hours',
    notificationTarget: 'MOBILE_PUSH',
    active: true
  },
  {
    id: 'RULE-103',
    title: 'Suez Canal Convoy Queue Delay Trigger',
    targetRegion: 'Suez Canal Anchorages',
    metricType: 'SUEZ_CONGESTION',
    thresholdCondition: 'Anchored vessel queue > 50 ships',
    notificationTarget: 'WEBHOOK',
    active: false
  }
];

export const TradeAlertRuleEngineView: React.FC = () => {
  const [rules, setRules] = useState<AlertTriggerRule[]>(SAMPLE_RULES);
  const [testFired, setTestFired] = useState<string | null>(null);

  const toggleRule = (id: string) => {
    hapticEngine.trigger('click');
    setRules((prev) =>
      prev.map((r) => (r.id === id ? { ...r, active: !r.active } : r))
    );
  };

  const handleTestTrigger = (ruleTitle: string) => {
    hapticEngine.trigger('alert');
    setTestFired(ruleTitle);
    setTimeout(() => setTestFired(null), 4000);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-2xl space-y-4 font-mono text-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="space-y-0.5">
          <h3 className="text-xs font-bold text-white uppercase flex items-center space-x-2">
            <Bell className="w-4 h-4 text-cyan-400" />
            <span>Automated Maritime Trade & Threat Early Warning Alert Engine</span>
          </h3>
          <p className="text-[10px] text-slate-400 font-sans">
            Configure threshold rules for piracy threats, spot freight volatility, chokepoint delays, and satellite push notifications
          </p>
        </div>

        <span className="bg-cyan-950 text-cyan-300 border border-cyan-800 text-[10px] px-2.5 py-1 rounded font-bold">
          {rules.filter((r) => r.active).length} RULES ACTIVE
        </span>
      </div>

      {testFired && (
        <div className="bg-rose-950/90 border border-rose-500 p-3 rounded-2xl flex items-center space-x-2 text-rose-200 animate-pulse">
          <AlertTriangle className="w-4 h-4 text-rose-400 flex-shrink-0" />
          <div>
            <span className="font-bold text-xs block">TEST ALERT DISPATCHED:</span>
            <span className="text-[10px] text-rose-300">{testFired}</span>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {rules.map((rule) => (
          <div key={rule.id} className="bg-slate-950 border border-slate-800 p-4 rounded-2xl space-y-3">
            <div className="flex justify-between items-start border-b border-slate-900 pb-2">
              <div>
                <span className="text-[8px] text-cyan-400 font-bold block">{rule.id} • {rule.targetRegion}</span>
                <h4 className="text-xs font-bold text-white">{rule.title}</h4>
              </div>
              <button
                onClick={() => toggleRule(rule.id)}
                className={`text-[8px] font-bold px-2 py-0.5 rounded ${
                  rule.active
                    ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                    : 'bg-slate-900 text-slate-500 border border-slate-800'
                }`}
              >
                {rule.active ? 'ACTIVE' : 'MUTED'}
              </button>
            </div>

            <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800 space-y-1 text-[9px] font-sans">
              <div className="flex justify-between font-mono">
                <span className="text-slate-500">Condition:</span>
                <span className="text-slate-200 font-bold">{rule.thresholdCondition}</span>
              </div>
              <div className="flex justify-between font-mono">
                <span className="text-slate-500">Channel:</span>
                <span className="text-cyan-300 font-bold">{rule.notificationTarget}</span>
              </div>
            </div>

            <button
              onClick={() => handleTestTrigger(rule.title)}
              className="w-full py-1.5 bg-slate-900 hover:bg-slate-800 text-cyan-300 font-bold rounded-xl text-[9px] border border-slate-800 flex items-center justify-center space-x-1 transition-colors font-mono"
            >
              <Zap className="w-3 h-3 text-cyan-400" />
              <span>SIMULATE DISPATCH TEST</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
