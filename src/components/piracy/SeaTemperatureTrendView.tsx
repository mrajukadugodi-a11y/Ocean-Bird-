import React, { useState } from 'react';
import { Thermometer, TrendingUp, AlertTriangle, Waves, Layers, RefreshCw } from 'lucide-react';
import { motion } from 'motion/react';
import { hapticEngine } from '../../utils/hapticUtils';

export interface TemperatureReading {
  month: string;
  balticSstC: number;
  redSeaSstC: number;
  malaccaSstC: number;
  anomalyC: number;
}

const ANNUAL_SST_READINGS: TemperatureReading[] = [
  { month: 'Jan', balticSstC: 2.4, redSeaSstC: 25.1, malaccaSstC: 28.2, anomalyC: 0.6 },
  { month: 'Mar', balticSstC: 4.1, redSeaSstC: 26.8, malaccaSstC: 29.0, anomalyC: 0.9 },
  { month: 'May', balticSstC: 11.2, redSeaSstC: 29.4, malaccaSstC: 30.1, anomalyC: 1.2 },
  { month: 'Jul', balticSstC: 19.8, redSeaSstC: 32.5, malaccaSstC: 30.8, anomalyC: 1.8 },
  { month: 'Sep', balticSstC: 15.6, redSeaSstC: 31.0, malaccaSstC: 29.9, anomalyC: 1.5 },
  { month: 'Nov', balticSstC: 7.3, redSeaSstC: 27.2, malaccaSstC: 28.6, anomalyC: 1.1 }
];

export const SeaTemperatureTrendView: React.FC = () => {
  const [selectedMetric, setSelectedMetric] = useState<'BALTIC' | 'RED_SEA' | 'MALACCA'>('BALTIC');
  const [activeReading, setActiveReading] = useState<TemperatureReading>(ANNUAL_SST_READINGS[3]);

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
            <Thermometer className="w-4 h-4 text-rose-400" />
            <span>High-Resolution Sea Surface Temperature (SST) Thermal Anomaly Trend</span>
          </h3>
          <p className="text-[10px] text-slate-400 font-sans">
            Satellite radiometer thermal imaging, coastal heatwave metrics, and marine ecosystem impact logs
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => {
              setSelectedMetric('BALTIC');
              hapticEngine.trigger('click');
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              selectedMetric === 'BALTIC'
                ? 'bg-rose-500 text-slate-950 font-black'
                : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
            }`}
          >
            BALTIC SEA
          </button>

          <button
            onClick={() => {
              setSelectedMetric('RED_SEA');
              hapticEngine.trigger('click');
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              selectedMetric === 'RED_SEA'
                ? 'bg-rose-500 text-slate-950 font-black'
                : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
            }`}
          >
            RED SEA
          </button>
        </div>
      </div>

      {/* Interactive Temperature Bar Chart Stage */}
      <div className="bg-slate-950 border border-slate-800 p-5 rounded-2xl space-y-4">
        <div className="flex justify-between items-center text-[9px] text-slate-500 font-bold border-b border-slate-900 pb-2">
          <span>MONTHLY SST READINGS (°C)</span>
          <span>THERMAL ANOMALY DELTA</span>
        </div>

        <div className="grid grid-cols-6 gap-2 items-end h-40 pt-4">
          {ANNUAL_SST_READINGS.map((rd) => {
            const val =
              selectedMetric === 'BALTIC'
                ? rd.balticSstC
                : selectedMetric === 'RED_SEA'
                ? rd.redSeaSstC
                : rd.malaccaSstC;

            const isSelected = activeReading.month === rd.month;
            const barHeightPct = Math.min((val / 35) * 100, 100);

            return (
              <div
                key={rd.month}
                onClick={() => {
                  setActiveReading(rd);
                  hapticEngine.trigger('click');
                }}
                className="flex flex-col items-center cursor-pointer group h-full justify-end space-y-2"
              >
                <span className={`text-[9px] font-bold ${isSelected ? 'text-rose-400' : 'text-slate-500'}`}>
                  {val}°C
                </span>
                <div className="w-full bg-slate-900 h-full rounded-xl p-1 flex items-end">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${barHeightPct}%` }}
                    className={`w-full rounded-lg transition-all ${
                      isSelected
                        ? 'bg-gradient-to-t from-rose-600 to-amber-400 shadow-lg ring-2 ring-rose-400'
                        : 'bg-slate-800 hover:bg-slate-700'
                    }`}
                  />
                </div>
                <span className="text-[9px] font-bold text-slate-400">{rd.month}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Reading Insight Card */}
      <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl space-y-2">
        <div className="flex justify-between items-center border-b border-slate-900 pb-2">
          <span className="text-[9px] text-rose-400 font-bold uppercase">
            SST FOCUS: {activeReading.month} ({selectedMetric})
          </span>
          <span className="text-[10px] text-amber-300 font-bold">
            +{activeReading.anomalyC}°C Anomaly Above 30-Yr Mean
          </span>
        </div>
        <p className="text-[10px] text-slate-300 font-sans leading-relaxed">
          Sustained marine heatwave conditions registered in summer months increase cyanobacteria blooms and accelerate thermal expansion currents.
        </p>
      </div>
    </motion.div>
  );
};
