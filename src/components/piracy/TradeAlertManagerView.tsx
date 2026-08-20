import React, { useState } from 'react';
import { Bell, ShieldAlert, AlertTriangle, CheckCircle2, Zap, Settings, Filter, Plus, Trash2 } from 'lucide-react';
import { hapticEngine } from '../../utils/hapticUtils';

export interface TradeAlertRule {
  id: string;
  ruleName: string;
  category: 'CHOKEPOINT_CLOSURE' | 'PIRACY_RISK_SPIKE' | 'BUNKER_PRICE_SURGE' | 'PORT_CONGESTION';
  condition: string;
  channel: 'SMS' | 'EMAIL' | 'WEBHOOK' | 'IN_APP';
  severity: 'CRITICAL' | 'WARNING' | 'INFO';
  status: 'ACTIVE' | 'MUTED';
}

const INITIAL_ALERTS: TradeAlertRule[] = [
  {
    id: 'ALERT-01',
    ruleName: 'Suez & Bab-el-Mandeb Chokepoint Reroute Trigger',
    category: 'CHOKEPOINT_CLOSURE',
    condition: 'AIS queue > 45 vessels OR High Risk Area threat level = CRITICAL',
    channel: 'WEBHOOK',
    severity: 'CRITICAL',
    status: 'ACTIVE'
  },
  {
    id: 'ALERT-02',
    ruleName: 'Singapore VLSFO Bunker Rate Ceiling Alert',
    category: 'BUNKER_PRICE_SURGE',
    condition: 'Spot VLSFO > $650 / MT in 24h window',
    channel: 'EMAIL',
    severity: 'WARNING',
    status: 'ACTIVE'
  },
  {
    id: 'ALERT-03',
    ruleName: 'Gulf of Guinea Piracy Skiff Proximity Alert',
    category: 'PIRACY_RISK_SPIKE',
    condition: 'Unidentified skiff within 12 NM of monitored fleet vessel',
    channel: 'SMS',
    severity: 'CRITICAL',
    status: 'ACTIVE'
  }
];

export const TradeAlertManagerView: React.FC = () => {
  const [alerts, setAlerts] = useState<TradeAlertRule[]>(INITIAL_ALERTS);

  const toggleStatus = (id: string) => {
    hapticEngine.trigger('click');
    setAlerts((prev) =>
      prev.map((a) =>
        a.id === id ? { ...a, status: a.status === 'ACTIVE' ? 'MUTED' : 'ACTIVE' } : a
      )
    );
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-2xl space-y-4 font-mono text-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="space-y-0.5">
          <h3 className="text-xs font-bold text-white uppercase flex items-center space-x-2">
            <Bell className="w-4 h-4 text-cyan-400" />
            <span>Maritime Trade & Risk Alert Notification Manager</span>
          </h3>
          <p className="text-[10px] text-slate-400 font-sans">
            Configure automated alerts for chokepoint delays, piracy threat elevation, bunker price spikes, and webhooks
          </p>
        </div>

        <span className="bg-cyan-950 text-cyan-300 border border-cyan-800 text-[10px] px-2.5 py-1 rounded font-bold">
          {alerts.filter((a) => a.status === 'ACTIVE').length} / {alerts.length} ALERTS ACTIVE
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {alerts.map((alert) => (
          <div key={alert.id} className="bg-slate-950 border border-slate-800 p-4 rounded-2xl space-y-3">
            <div className="flex justify-between items-start border-b border-slate-900 pb-2">
              <div>
                <span className="text-[8px] text-cyan-400 font-bold block">{alert.category.replace(/_/g, ' ')}</span>
                <h4 className="text-xs font-bold text-white">{alert.ruleName}</h4>
              </div>
              <button
                onClick={() => toggleStatus(alert.id)}
                className={`text-[8px] font-bold px-2 py-0.5 rounded transition-all ${
                  alert.status === 'ACTIVE'
                    ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                    : 'bg-slate-900 text-slate-500 border border-slate-800'
                }`}
              >
                {alert.status}
              </button>
            </div>

            <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800 space-y-1 text-[9px] font-sans">
              <div className="flex justify-between font-mono">
                <span className="text-slate-500">Trigger Condition:</span>
                <span className="text-slate-300 font-bold">{alert.condition}</span>
              </div>
              <div className="flex justify-between font-mono">
                <span className="text-slate-500">Dispatch Channel:</span>
                <span className="text-cyan-300 font-bold">{alert.channel}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
