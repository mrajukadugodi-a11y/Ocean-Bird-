import React, { useState, useEffect } from 'react';
import { Navigation, Compass, MapPin, Radio, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { hapticEngine } from '../../utils/hapticUtils';

export interface GpsFix {
  latitude: number;
  longitude: number;
  cogDegrees: number; // Course Over Ground
  sogKnots: number; // Speed Over Ground
  satelliteLockCount: number;
  hdopAccuracy: number;
  fixType: 'GNSS_3D_FIX' | 'DGPS_AUGMENTED' | 'DEAD_RECKONING';
  headingDegrees: number;
}

export const ShipLocationGpsTrackerView: React.FC = () => {
  const [gpsData, setGpsData] = useState<GpsFix>({
    latitude: 55.1245,
    longitude: 14.8820,
    cogDegrees: 42,
    sogKnots: 18.4,
    satelliteLockCount: 16,
    hdopAccuracy: 0.8,
    fixType: 'DGPS_AUGMENTED',
    headingDegrees: 41
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setGpsData((prev) => ({
        ...prev,
        latitude: Number((prev.latitude + 0.0002).toFixed(4)),
        longitude: Number((prev.longitude + 0.0003).toFixed(4)),
        sogKnots: Number((18.0 + Math.random() * 0.8).toFixed(1))
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

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
            <Navigation className="w-4 h-4 text-emerald-400" />
            <span>High-Precision Ship Location Tracker & Differential GPS Navigation</span>
          </h3>
          <p className="text-[10px] text-slate-400 font-sans">
            Live AIS & GNSS satellite navigation telemetry, course over ground (COG), and speed over ground (SOG)
          </p>
        </div>

        <span className="bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px] px-2.5 py-1 rounded font-bold flex items-center space-x-1">
          <Radio className="w-3 h-3 text-emerald-400 animate-pulse" />
          <span>3D DGPS FIX ACTIVE</span>
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 bg-slate-950 p-4 rounded-2xl border border-slate-800">
        <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
          <span className="text-[9px] text-slate-500 font-bold block">LATITUDE / LONGITUDE:</span>
          <span className="text-xs font-bold text-cyan-300">
            {gpsData.latitude}°N, {gpsData.longitude}°E
          </span>
        </div>

        <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
          <span className="text-[9px] text-slate-500 font-bold block">SPEED OVER GROUND (SOG):</span>
          <span className="text-xs font-bold text-emerald-400">{gpsData.sogKnots} Knots</span>
        </div>

        <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
          <span className="text-[9px] text-slate-500 font-bold block">COURSE OVER GROUND (COG):</span>
          <span className="text-xs font-bold text-amber-300">{gpsData.cogDegrees}° TRUE</span>
        </div>

        <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
          <span className="text-[9px] text-slate-500 font-bold block">SATELLITE LOCK / HDOP:</span>
          <span className="text-xs font-bold text-white">
            {gpsData.satelliteLockCount} SATS (HDOP {gpsData.hdopAccuracy})
          </span>
        </div>
      </div>

      {/* Navigation Gyro Visual Simulator */}
      <div className="bg-slate-950 border border-slate-800 p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-full border-2 border-cyan-400 flex items-center justify-center bg-cyan-950/50 text-cyan-300 font-bold">
            <Compass className="w-6 h-6 text-cyan-400" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-white">GYRO COMPASS HEADING: {gpsData.headingDegrees}°</h4>
            <span className="text-[9px] text-slate-400 font-sans">Primary Gyro Unit #1 Calibrated</span>
          </div>
        </div>

        <span className="text-[9px] font-bold text-emerald-400 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800">
          POSITION DATA SYNCHRONIZED WITH ECDIS
        </span>
      </div>
    </motion.div>
  );
};
