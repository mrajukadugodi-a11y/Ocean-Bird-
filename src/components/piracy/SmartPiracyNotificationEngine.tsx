import React, { useState } from 'react';
import { Bell, ShieldAlert, Zap, Radio, Sliders, CheckCircle2, AlertTriangle, EyeOff } from 'lucide-react';
import { hapticEngine } from '../../utils/hapticUtils';
import { maritimeAlarmSynth } from '../MarinePiracyAlertView';

export interface SmartNotificationRule {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
  triggerCondition: string;
  severity: 'CRITICAL' | 'HIGH' | 'WARNING';
}

export const SmartPiracyNotificationEngine: React.FC = () => {
  const [rules, setRules] = useState<SmartNotificationRule[]>([
    {
      id: 'RULE-01',
      title: 'Dark Vessel Proximity Alert',
      description: 'Trigger instant bridge alarm if an unidentified non-AIS target approaches within 5.0 NM.',
      enabled: true,
      triggerCondition: 'Radar Target AIS = FALSE && Distance < 5 NM',
      severity: 'CRITICAL'
    },
    {
      id: 'RULE-02',
      title: 'HRA High-Risk Corridor Entry',
      description: 'Push tactical alert when vessel GPS enters Bab-el-Mandeb or Gulf of Guinea boundary.',
      enabled: true,
      triggerCondition: 'Vessel Latitude/Longitude in HRA Polygon',
      severity: 'HIGH'
    },
    {
      id: 'RULE-03',
      title: 'Vessel Speed Drop in Danger Zone',
      description: 'Alert watch officer if speed falls below 12 Knots while transiting active piracy waters.',
      enabled: true,
      triggerCondition: 'Vessel Speed < 12 Kts && Region == HRA',
      severity: 'HIGH'
    },
    {
      id: 'RULE-04',
      title: 'Night-Time High-Threat Transit Window',
      description: 'Activate heightened bridge watch notifications during 00:00 - 04:00 UTC peak boarding hours.',
      enabled: false,
      triggerCondition: 'Time UTC between 00:00 & 04:00',
      severity: 'WARNING'
    }
  ]);

  const [testNotificationLog, setTestNotificationLog] = useState<string[]>([]);

  const toggleRule = (id: string) => {
    hapticEngine.trigger('click');
    setRules(
      rules.map((r) => (r.id === id ? { ...r, enabled: !r.enabled } : r))
    );
  };

  const handleTestTrigger = (rule: SmartNotificationRule) => {
    hapticEngine.trigger('alert');
    maritimeAlarmSynth.playSonarPing();

    const timestamp = new Date().toLocaleTimeString();
    const logEntry = `[${timestamp}] SMART NOTIFICATION DISPATCHED: ${rule.title} (${rule.severity}) - Rule executed successfully.`;

    setTestNotificationLog([logEntry, ...testNotificationLog]);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-2xl space-y-4 font-mono text-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="space-y-0.5">
          <h3 className="text-xs font-bold text-white uppercase flex items-center space-x-2">
            <Bell className="w-4 h-4 text-cyan-400" />
            <span>Automated Smart Piracy Threat Notification & Alert Dispatcher</span>
          </h3>
          <p className="text-[10px] text-slate-400 font-sans">
            Configure automated rule-based push alerts for bridge screens, satellite communications, and smartwatch haptics
          </p>
        </div>

        <span className="bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px] px-2.5 py-1 rounded font-bold self-start sm:self-auto">
          SMART RULES ENGINE ACTIVE
        </span>
      </div>

      <div className="space-y-3">
        {rules.map((rule) => (
          <div
            key={rule.id}
            className={`p-3.5 rounded-2xl border transition-all flex flex-col md:flex-row md:items-center justify-between gap-3 ${
              rule.enabled
                ? 'bg-slate-950 border-slate-800 hover:border-slate-700'
                : 'bg-slate-950/40 border-slate-900 text-slate-600'
            }`}
          >
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold text-white">{rule.title}</span>
                <span
                  className={`px-2 py-0.5 rounded text-[9px] font-black border ${
                    rule.severity === 'CRITICAL'
                      ? 'bg-rose-950 text-rose-300 border-rose-800'
                      : rule.severity === 'HIGH'
                      ? 'bg-amber-950 text-amber-300 border-amber-800'
                      : 'bg-indigo-950 text-indigo-300 border-indigo-800'
                  }`}
                >
                  {rule.severity}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-sans">{rule.description}</p>
              <span className="text-[9px] text-cyan-400 font-mono block">Condition: {rule.triggerCondition}</span>
            </div>

            <div className="flex items-center space-x-2 shrink-0">
              <button
                onClick={() => handleTestTrigger(rule)}
                disabled={!rule.enabled}
                className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-slate-800 rounded-xl text-[10px] font-bold disabled:opacity-40"
              >
                TEST ALERT
              </button>

              <button
                onClick={() => toggleRule(rule.id)}
                className={`px-3.5 py-1.5 rounded-xl text-[10px] font-bold border transition-all ${
                  rule.enabled
                    ? 'bg-emerald-500 text-slate-950 border-emerald-400 font-black'
                    : 'bg-slate-900 text-slate-500 border-slate-800'
                }`}
              >
                {rule.enabled ? 'ACTIVE' : 'DISABLED'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {testNotificationLog.length > 0 && (
        <div className="bg-slate-950 border border-slate-800 p-3 rounded-2xl space-y-1.5">
          <span className="text-[10px] text-slate-400 font-bold uppercase block">Recent Dispatch Log:</span>
          <div className="space-y-1 max-h-28 overflow-y-auto font-mono text-[10px]">
            {testNotificationLog.map((log, i) => (
              <div key={i} className="text-emerald-400">
                {log}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
