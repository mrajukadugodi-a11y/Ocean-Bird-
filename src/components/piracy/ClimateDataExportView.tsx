import React, { useState } from 'react';
import { Download, FileSpreadsheet, FileCode, FileText, Check, Globe, Calendar, Filter, Sparkles, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { hapticEngine } from '../../utils/hapticUtils';

export interface ClimateExportConfig {
  exportFormat: 'CSV' | 'GEOJSON' | 'NETCDF' | 'PDF_REPORT';
  dateRangePreset: '2020-2026_HISTORICAL' | '2026_YTD_TELEMETRY' | 'LAST_30_DAYS' | 'CUSTOM_RANGE';
  spatialBoundingBox: 'GLOBAL_OCEAN' | 'CORAL_TRIANGLE' | 'BALTIC_SEA' | 'MALACCA_STRAIT' | 'PACIFIC_BASIN';
  selectedVariables: {
    seaSurfaceTemp: boolean;
    oceanPhAcidification: boolean;
    windVectorFields: boolean;
    typhoonTracks: boolean;
    vesselCarbonIntensity: boolean;
  };
}

export const ClimateDataExportView: React.FC = () => {
  const [config, setConfig] = useState<ClimateExportConfig>({
    exportFormat: 'CSV',
    dateRangePreset: '2026_YTD_TELEMETRY',
    spatialBoundingBox: 'GLOBAL_OCEAN',
    selectedVariables: {
      seaSurfaceTemp: true,
      oceanPhAcidification: true,
      windVectorFields: true,
      typhoonTracks: false,
      vesselCarbonIntensity: true
    }
  });

  const [isExporting, setIsExporting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const toggleVariable = (varKey: keyof ClimateExportConfig['selectedVariables']) => {
    setConfig(prev => ({
      ...prev,
      selectedVariables: {
        ...prev.selectedVariables,
        [varKey]: !prev.selectedVariables[varKey]
      }
    }));
    hapticEngine.trigger('click');
  };

  const handleRunExport = () => {
    setIsExporting(true);
    setIsCompleted(false);
    hapticEngine.trigger('click');

    setTimeout(() => {
      setIsExporting(false);
      setIsCompleted(true);
      hapticEngine.trigger('click');
    }, 1500);
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
            <Download className="w-4 h-4 text-emerald-400" />
            <span>High-Precision Climate & Oceanographic Data Exporter</span>
          </h3>
          <p className="text-[10px] text-slate-400 font-sans">
            Export multi-variable sea surface temperature, ocean acidification, wind vectors, and vessel carbon datasets in CSV, GeoJSON, NetCDF, or PDF
          </p>
        </div>

        <span className="bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px] px-2.5 py-1 rounded font-bold flex items-center space-x-1">
          <Globe className="w-3.5 h-3.5 text-emerald-400" />
          <span>NETCDF & GIS READY</span>
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Step 1: Export Format */}
        <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl space-y-3">
          <span className="text-[9px] text-emerald-400 font-bold block">1. SELECT EXPORT FORMAT</span>
          <div className="grid grid-cols-2 gap-2">
            {[
              { id: 'CSV', label: 'CSV TABLE', icon: FileSpreadsheet },
              { id: 'GEOJSON', label: 'GeoJSON GIS', icon: FileCode },
              { id: 'NETCDF', label: 'NetCDF4 GRID', icon: Globe },
              { id: 'PDF_REPORT', label: 'PDF EXECUTIVE', icon: FileText }
            ].map((f) => {
              const IconComp = f.icon;
              return (
                <button
                  key={f.id}
                  onClick={() => {
                    setConfig(prev => ({ ...prev, exportFormat: f.id as any }));
                    hapticEngine.trigger('click');
                  }}
                  className={`p-3 rounded-xl border text-[9px] font-bold flex items-center space-x-2 transition-all ${
                    config.exportFormat === f.id
                      ? 'bg-emerald-500 text-slate-950 font-black border-emerald-400 shadow'
                      : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  <IconComp className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>{f.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 2: Spatial & Temporal Bounds */}
        <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl space-y-3">
          <span className="text-[9px] text-emerald-400 font-bold block">2. SPATIAL & TEMPORAL BOUNDS</span>

          <div className="space-y-1">
            <label className="text-[8px] text-slate-500 font-bold block">SPATIAL BOUNDING BOX:</label>
            <select
              value={config.spatialBoundingBox}
              onChange={(e) => {
                setConfig(prev => ({ ...prev, spatialBoundingBox: e.target.value as any }));
                hapticEngine.trigger('click');
              }}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-[10px] text-white focus:outline-none focus:border-emerald-500"
            >
              <option value="GLOBAL_OCEAN">Global Ocean (-180° to +180°)</option>
              <option value="CORAL_TRIANGLE">Coral Triangle (Sulu-Sulawesi Basin)</option>
              <option value="BALTIC_SEA">Baltic Sea & North Sea Gateway</option>
              <option value="MALACCA_STRAIT">Strait of Malacca Transit Corridor</option>
              <option value="PACIFIC_BASIN">Pacific Basin & Coral Sea</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-[8px] text-slate-500 font-bold block">TEMPORAL RANGE PRESET:</label>
            <select
              value={config.dateRangePreset}
              onChange={(e) => {
                setConfig(prev => ({ ...prev, dateRangePreset: e.target.value as any }));
                hapticEngine.trigger('click');
              }}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-[10px] text-white focus:outline-none focus:border-emerald-500"
            >
              <option value="2026_YTD_TELEMETRY">2026 Year-to-Date Live Telemetry</option>
              <option value="2020-2026_HISTORICAL">2020 - 2026 Multi-Year Archive</option>
              <option value="LAST_30_DAYS">Last 30 Days High-Freq</option>
            </select>
          </div>
        </div>

        {/* Step 3: Climate Variables Selector */}
        <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl space-y-3">
          <span className="text-[9px] text-emerald-400 font-bold block">3. SELECT CLIMATE VARIABLES</span>

          <div className="space-y-1.5">
            {[
              { key: 'seaSurfaceTemp', label: 'Sea Surface Temp (°C)' },
              { key: 'oceanPhAcidification', label: 'Ocean pH / Acidification' },
              { key: 'windVectorFields', label: '10m Wind Vectors (u,v)' },
              { key: 'typhoonTracks', label: 'Cyclone / Typhoon Tracks' },
              { key: 'vesselCarbonIntensity', label: 'CII Carbon Intensity' }
            ].map((v) => {
              const isChecked = config.selectedVariables[v.key as keyof ClimateExportConfig['selectedVariables']];
              return (
                <button
                  key={v.key}
                  onClick={() => toggleVariable(v.key as any)}
                  className={`w-full p-2 rounded-xl border text-[9px] font-bold flex items-center justify-between transition-all ${
                    isChecked
                      ? 'bg-slate-900 border-emerald-500 text-emerald-300'
                      : 'bg-slate-900/50 border-slate-800 text-slate-500'
                  }`}
                >
                  <span>{v.label}</span>
                  <div className={`w-4 h-4 rounded border flex items-center justify-center ${
                    isChecked ? 'bg-emerald-500 border-emerald-400 text-slate-950' : 'border-slate-700'
                  }`}>
                    {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="flex justify-between items-center bg-slate-950 p-4 rounded-2xl border border-slate-800">
        <div className="text-[10px]">
          <span className="text-slate-400 block font-sans">Ready to compile dataset bundle</span>
          <span className="text-white font-bold">{config.exportFormat} • {config.spatialBoundingBox}</span>
        </div>

        <button
          onClick={handleRunExport}
          disabled={isExporting}
          className={`px-5 py-2.5 rounded-xl font-bold text-xs flex items-center space-x-2 transition-all ${
            isCompleted
              ? 'bg-emerald-500 text-slate-950 font-black shadow'
              : isExporting
              ? 'bg-slate-800 text-slate-400 cursor-wait'
              : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black shadow-lg'
          }`}
        >
          {isCompleted ? (
            <>
              <CheckCircle2 className="w-4 h-4 text-slate-950" />
              <span>DATASET EXPORTED SUCCESSFULLY</span>
            </>
          ) : isExporting ? (
            <span>COMPILING DATASET...</span>
          ) : (
            <>
              <Download className="w-4 h-4" />
              <span>GENERATE & DOWNLOAD BUNDLE</span>
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
};
