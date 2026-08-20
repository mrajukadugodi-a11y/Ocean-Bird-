import React, { useState } from 'react';
import { Layers, Globe, Eye, CheckSquare, Square, Zap, ShieldAlert, Navigation, Anchor } from 'lucide-react';
import { hapticEngine } from '../../utils/hapticUtils';

export interface MapSpatialLayer {
  id: string;
  layerName: string;
  category: 'NAVIGATION' | 'SECURITY' | 'ENVIRONMENT' | 'COMMODITY';
  opacityPct: number;
  active: boolean;
}

export const TradeMapLayersView: React.FC = () => {
  const [layers, setLayers] = useState<MapSpatialLayer[]>([
    { id: 'LAYER-01', layerName: 'AIS Real-Time Vessel Density Vectors', category: 'NAVIGATION', opacityPct: 85, active: true },
    { id: 'LAYER-02', layerName: 'Piracy Skiff Incident Cluster Heatmap', category: 'SECURITY', opacityPct: 90, active: true },
    { id: 'LAYER-03', layerName: 'Naval Warship Patrol Corridors', category: 'SECURITY', opacityPct: 100, active: true },
    { id: 'LAYER-04', layerName: 'ECA Carbon Emission & Low-Sulfur Zones', category: 'ENVIRONMENT', opacityPct: 60, active: false }
  ]);

  const toggleLayer = (id: string) => {
    hapticEngine.trigger('click');
    setLayers((prev) =>
      prev.map((l) => (l.id === id ? { ...l, active: !l.active } : l))
    );
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-2xl space-y-4 font-mono text-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="space-y-0.5">
          <h3 className="text-xs font-bold text-white uppercase flex items-center space-x-2">
            <Layers className="w-4 h-4 text-cyan-400" />
            <span>Global Maritime Spatial Map Layer Stack & Visibility Engine</span>
          </h3>
          <p className="text-[10px] text-slate-400 font-sans">
            Customize multi-layer cartographic views: AIS density tracks, piracy threat zones, naval patrols, and ECA emission boundaries
          </p>
        </div>

        <span className="bg-cyan-950 text-cyan-300 border border-cyan-800 text-[10px] px-2.5 py-1 rounded font-bold">
          {layers.filter((l) => l.active).length} / {layers.length} SPATIAL LAYERS ACTIVE
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
              <div>
                <span className="text-[8px] text-cyan-400 font-bold block">{layer.category}</span>
                <h4 className="text-xs font-bold text-white">{layer.layerName}</h4>
              </div>
              <span className={`text-[8px] font-bold px-2 py-0.5 rounded ${
                layer.active
                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                  : 'bg-slate-900 text-slate-500 border border-slate-800'
              }`}>
                {layer.active ? 'VISIBLE' : 'HIDDEN'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
