import React from 'react';
import { ClimateAlert } from '../types';
import { ShieldAlert, AlertTriangle, Info, X, ArrowRight, Bell, Radio, Sparkles } from 'lucide-react';

export interface ToastItem {
  id: string;
  alert: ClimateAlert;
  createdAt: string;
  type: 'added' | 'updated' | 'critical';
}

interface ToastContainerProps {
  toasts: ToastItem[];
  onDismiss: (id: string) => void;
  onViewAlert: (alert: ClimateAlert) => void;
  onSimulateAlertChange: () => void;
  isSimulating: boolean;
  onToggleSimulation: () => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({
  toasts,
  onDismiss,
  onViewAlert,
  onSimulateAlertChange,
  isSimulating,
  onToggleSimulation,
}) => {
  return (
    <>
      {/* Floating Alert Telemetry Control Button at Bottom Left */}
      <div className="fixed bottom-4 left-4 z-40 flex items-center space-x-2">
        <button
          onClick={onSimulateAlertChange}
          className="bg-slate-900/90 hover:bg-slate-800 text-cyan-300 border border-cyan-500/40 px-3.5 py-2 rounded-2xl text-xs font-bold shadow-2xl backdrop-blur-md flex items-center space-x-2 transition-all hover:scale-105 active:scale-95 group"
          title="Trigger a severe weather alert update in REGIONAL_CLIMATE_ALERTS"
        >
          <div className="relative">
            <Radio className="w-4 h-4 text-cyan-400 group-hover:rotate-12 transition-transform" />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-rose-500 animate-ping" />
          </div>
          <span>Simulate Weather Data Change</span>
        </button>

        <button
          onClick={onToggleSimulation}
          className={`px-3 py-2 rounded-2xl text-xs font-bold border transition-all flex items-center space-x-1.5 shadow-xl backdrop-blur-md ${
            isSimulating
              ? 'bg-rose-950/80 text-rose-300 border-rose-500/50'
              : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-slate-200'
          }`}
          title="Toggle automatic weather data fluctuation"
        >
          <span className={`w-2 h-2 rounded-full ${isSimulating ? 'bg-rose-400 animate-pulse' : 'bg-slate-600'}`} />
          <span>{isSimulating ? 'Live Feeder: ON' : 'Live Feeder: OFF'}</span>
        </button>
      </div>

      {/* Global Toast Stack at Top/Bottom Right */}
      <div className="fixed top-20 right-4 sm:right-6 z-50 flex flex-col space-y-3 max-w-sm sm:max-w-md w-full pointer-events-none">
        {toasts.map((toast) => {
          const { alert } = toast;
          const isCritical = alert.severity === 'Critical';
          const isWarning = alert.severity === 'Warning';

          return (
            <div
              key={toast.id}
              className={`pointer-events-auto p-4 rounded-2xl border shadow-2xl backdrop-blur-xl transition-all transform animate-slideInRight relative overflow-hidden group ${
                isCritical
                  ? 'bg-rose-950/90 border-rose-500/60 text-white shadow-rose-950/50'
                  : isWarning
                  ? 'bg-slate-900/95 border-amber-500/50 text-slate-100 shadow-amber-950/30'
                  : 'bg-slate-900/95 border-cyan-500/40 text-slate-100 shadow-cyan-950/30'
              }`}
            >
              {/* Top Pulse Glow Bar */}
              <div
                className={`absolute top-0 left-0 right-0 h-1 ${
                  isCritical
                    ? 'bg-gradient-to-r from-rose-500 via-red-400 to-rose-600 animate-pulse'
                    : isWarning
                    ? 'bg-gradient-to-r from-amber-500 to-yellow-400'
                    : 'bg-gradient-to-r from-cyan-400 to-teal-400'
                }`}
              />

              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start space-x-3">
                  <div
                    className={`p-2.5 rounded-xl border shrink-0 mt-0.5 ${
                      isCritical
                        ? 'bg-rose-500/20 border-rose-500/40 text-rose-400 animate-bounce'
                        : isWarning
                        ? 'bg-amber-500/20 border-amber-500/40 text-amber-400'
                        : 'bg-cyan-500/20 border-cyan-500/40 text-cyan-400'
                    }`}
                  >
                    {isCritical ? (
                      <ShieldAlert className="w-5 h-5" />
                    ) : isWarning ? (
                      <AlertTriangle className="w-5 h-5" />
                    ) : (
                      <Info className="w-5 h-5" />
                    )}
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center space-x-2 flex-wrap">
                      <span
                        className={`text-[10px] font-extrabold font-mono uppercase px-2 py-0.5 rounded-full border ${
                          isCritical
                            ? 'bg-rose-500/30 text-rose-200 border-rose-400/50'
                            : isWarning
                            ? 'bg-amber-500/30 text-amber-200 border-amber-400/50'
                            : 'bg-cyan-500/30 text-cyan-200 border-cyan-400/50'
                        }`}
                      >
                        {alert.severity} • {alert.category}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {alert.timestamp}
                      </span>
                    </div>

                    <h4 className="font-bold text-sm leading-tight text-white group-hover:text-cyan-200 transition-colors">
                      {alert.title}
                    </h4>

                    <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                      {alert.description}
                    </p>

                    <div className="text-[10px] text-slate-400 font-mono pt-0.5">
                      Region: <span className="text-slate-200 font-semibold">{alert.region}</span>
                    </div>
                  </div>
                </div>

                {/* Dismiss Button */}
                <button
                  onClick={() => onDismiss(toast.id)}
                  className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800/80 transition-colors shrink-0"
                  title="Dismiss notification"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Action Bar */}
              <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-[10px] text-slate-400 font-mono">
                  {alert.affectedPorts && alert.affectedPorts.length > 0
                    ? `Ports: ${alert.affectedPorts.join(', ')}`
                    : 'Broad Maritime Area'}
                </span>

                <button
                  onClick={() => onViewAlert(alert)}
                  className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center space-x-1 transition-colors"
                >
                  <span>Inspect Climate Watch</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
