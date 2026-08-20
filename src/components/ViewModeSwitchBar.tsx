import React, { useState } from 'react';
import {
  Monitor,
  Smartphone,
  RotateCw,
  Wifi,
  Battery,
  Signal,
  Check,
  Zap,
  Sparkles,
  Layers
} from 'lucide-react';

interface ViewModeSwitchBarProps {
  deviceMode: 'desktop' | 'android';
  setDeviceMode: (mode: 'desktop' | 'android') => void;
  orientation: 'portrait' | 'landscape';
  setOrientation: (o: 'portrait' | 'landscape') => void;
}

export const ViewModeSwitchBar: React.FC<ViewModeSwitchBarProps> = ({
  deviceMode,
  setDeviceMode,
  orientation,
  setOrientation
}) => {
  return (
    <div className="sticky top-16 z-30 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 py-2 flex flex-wrap items-center justify-between gap-3 text-xs font-mono shadow-md">
      <div className="flex items-center space-x-2">
        <span className="text-slate-400 font-bold uppercase text-[10px] flex items-center space-x-1">
          <Layers className="w-3.5 h-3.5 text-sky-400" />
          <span>VIEWPORT MODE:</span>
        </span>

        {/* DESKTOP BUTTON */}
        <button
          onClick={() => setDeviceMode('desktop')}
          className={`px-3 py-1.5 rounded-xl font-bold transition-all flex items-center space-x-1.5 ${
            deviceMode === 'desktop'
              ? 'bg-sky-500 text-slate-950 shadow-md ring-2 ring-sky-400/50'
              : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <Monitor className="w-3.5 h-3.5" />
          <span>Desktop Mode (Full Viewport)</span>
        </button>

        {/* ANDROID BUTTON */}
        <button
          onClick={() => setDeviceMode('android')}
          className={`px-3 py-1.5 rounded-xl font-bold transition-all flex items-center space-x-1.5 ${
            deviceMode === 'android'
              ? 'bg-emerald-500 text-slate-950 shadow-md ring-2 ring-emerald-400/50'
              : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span>Android Mobile Mode (Device Frame)</span>
        </button>
      </div>

      {deviceMode === 'android' && (
        <div className="flex items-center space-x-3 text-[11px] animate-fadeIn">
          <button
            onClick={() => setOrientation(orientation === 'portrait' ? 'landscape' : 'portrait')}
            className="px-3 py-1 rounded-xl bg-slate-950 border border-slate-800 text-emerald-400 hover:text-emerald-300 font-bold flex items-center space-x-1"
          >
            <RotateCw className="w-3.5 h-3.5" />
            <span>Rotate ({orientation === 'portrait' ? 'Portrait 9:19.5' : 'Landscape 19.5:9'})</span>
          </button>

          <span className="text-slate-400 text-[10px] hidden sm:inline">
            Android 15 TWA Native Touch & Haptic Frame Simulation Active
          </span>
        </div>
      )}
    </div>
  );
};
