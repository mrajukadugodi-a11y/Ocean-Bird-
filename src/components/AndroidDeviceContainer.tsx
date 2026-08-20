import React from 'react';
import { Wifi, Signal, Battery, ChevronLeft, Circle, Square } from 'lucide-react';

interface AndroidDeviceContainerProps {
  children: React.ReactNode;
  orientation: 'portrait' | 'landscape';
}

export const AndroidDeviceContainer: React.FC<AndroidDeviceContainerProps> = ({ children, orientation }) => {
  const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });

  return (
    <div className="flex justify-center my-6 transition-all duration-500">
      <div
        className={`bg-slate-950 border-[10px] border-slate-800 rounded-[48px] shadow-2xl relative overflow-hidden transition-all duration-500 ring-1 ring-slate-700/50 ${
          orientation === 'portrait'
            ? 'w-full max-w-[420px] min-h-[840px]'
            : 'w-full max-w-[920px] min-h-[520px]'
        }`}
      >
        {/* ANDROID PUNCH-HOLE CAMERA & SPEAKER */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 z-50 flex items-center space-x-2 pointer-events-none">
          <div className="w-3.5 h-3.5 rounded-full bg-slate-900 ring-2 ring-slate-800 flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-900/60"></div>
          </div>
        </div>

        {/* ANDROID 15 STATUS BAR */}
        <div className="bg-slate-900/95 text-slate-200 px-6 py-2 flex justify-between items-center text-[10px] font-mono font-bold border-b border-slate-800/80 z-40 relative">
          <span className="text-slate-100">{currentTime}</span>

          <div className="flex items-center space-x-2 text-slate-300">
            <span className="text-[9px] font-sans bg-emerald-500/20 text-emerald-300 px-1.5 rounded border border-emerald-500/30">5G</span>
            <Signal className="w-3 h-3 text-slate-200" />
            <Wifi className="w-3 h-3 text-slate-200" />
            <Battery className="w-3.5 h-3.5 text-emerald-400" />
            <span>98%</span>
          </div>
        </div>

        {/* DEVICE VIEWPORT SCROLLABLE CONTENT */}
        <div className="max-h-[760px] overflow-y-auto p-2 sm:p-4 font-sans bg-slate-950">
          {children}
        </div>

        {/* ANDROID HOME GESTURE PILL NAVIGATION */}
        <div className="bg-slate-900/90 py-2 border-t border-slate-800 flex justify-center items-center z-40 relative">
          <div className="w-32 h-1 bg-slate-400 rounded-full hover:bg-white transition-all cursor-pointer"></div>
        </div>
      </div>
    </div>
  );
};
