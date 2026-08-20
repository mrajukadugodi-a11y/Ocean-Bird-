import React, { useState } from 'react';
import { Layers, ShieldAlert, CloudRain, Anchor, Navigation, Eye, CheckSquare, Square, Zap } from 'lucide-react';
import { hapticEngine } from '../../utils/hapticUtils';

export interface MapLayer {
  id: string;
  name: string;
  description: string;
  colorHex: string;
  active: boolean;
}

export const TradeMapOverlayView: React.FC = () => {
  const [layers, setLayers] = useState<MapLayer[]>([
    { id: 'PIRACY_ZONES', name: 'High Risk Piracy Zones (HRA)', description: 'Gulf of Aden, Bab-el-Mandeb & Malacca Strait active threat boxes', colorHex: '#ef4444', active: true },
    { id: 'NAVAL_PATROLS', name: 'International Naval Escort Corridors', description: 'Combined Task Force (CTF 151) & EU NAVFOR Operation ATALANTA patrols', colorHex: '#06b6d4', active: true },
    { id: 'WEATHER_SEASTATE', name: 'Sea State & Wave Height Radar', description: 'Wave heights > 4.5m & tropical storm tracks', colorHex: '#3b82f6', active: false },
    { id: 'CHOKEPOINT_CONGESTION', name: 'Strategic Chokepoint Congestion', description: 'Real-time AIS vessel queues at Suez, Panama & Malacca Straits', colorHex: '#f59e0b', active: true }
  ]);

  const toggleLayer = (layerId: string) => {
    hapticEngine.trigger('click');
    setLayers((prev) =>
      prev.map((l) => (l.id === layerId ? { ...l, active: !l.active } : l))
    );
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-2xl space-y-4 font-mono text-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="space-y-0.5">
          <h3 className="text-xs font-bold text-white uppercase flex items-center space-x-2">
            <Layers className="w-4 h-4 text-cyan-400" />
            <span>Interactive Maritime Trade Map Overlay & Intelligence Controls</span>
          </h3>
          <p className="text-[10px] text-slate-400 font-sans">
            Toggle situational layers: High Risk Piracy Zones, Naval Task Force Corridors, Wave Heights, and AIS Chokepoint Queues
          </p>
        </div>

        <span className="bg-cyan-950 text-cyan-300 border border-cyan-800 text-[10px] px-2.5 py-1 rounded font-bold">
          {layers.filter((l) => l.active).length} / {layers.length} LAYERS VISIBLE
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {layers.map((layer) => (
          <div
            key={layer.id}
            onClick={() => toggleLayer(layer.id)}
            className={`p-4 rounded-2xl border cursor-pointer transition-all space-y-2 ${
              layer.active
                ? 'bg-slate-950 border-cyan-400 ring-1 ring-cyan-400'
                : 'bg-slate-950/60 border-slate-800 opacity-60 hover:opacity-100'
            }`}
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: layer.colorHex }}
                />
                <h4 className="text-xs font-bold text-white">{layer.name}</h4>
              </div>
              <span className={`text-[9px] font-bold px-2 py-0.5 rounded ${
                layer.active
                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                  : 'bg-slate-900 text-slate-500 border border-slate-800'
              }`}>
                {layer.active ? 'LAYER ACTIVE' : 'HIDDEN'}
              </span>
            </div>

            <p className="text-[10px] text-slate-400 font-sans">{layer.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
