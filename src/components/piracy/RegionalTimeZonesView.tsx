import React, { useState, useEffect } from 'react';
import { Clock, Globe, Sun, Moon, Compass, Calendar, CheckCircle2, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { hapticEngine } from '../../utils/hapticUtils';

export interface MaritimeTimeZone {
  id: string;
  zoneName: string;
  region: string;
  utcOffsetHours: number;
  unLocode: string;
  isDaylight: boolean;
  activePort: string;
}

const TIME_ZONES: MaritimeTimeZone[] = [
  { id: 'TZ-UTC', zoneName: 'UTC / GMT', region: 'Universal Coordinated Time', utcOffsetHours: 0, unLocode: 'GB LON', isDaylight: true, activePort: 'London / Greenwich Ops' },
  { id: 'TZ-CET', zoneName: 'CET (UTC+1)', region: 'Central European Maritime', utcOffsetHours: 1, unLocode: 'DK CPH', isDaylight: true, activePort: 'Port of Copenhagen & Hamburg' },
  { id: 'TZ-EET', zoneName: 'EET (UTC+2)', region: 'Eastern European & Baltic', utcOffsetHours: 2, unLocode: 'FI HEL', isDaylight: true, activePort: 'Helsinki, Tallinn & Riga' },
  { id: 'TZ-AST', zoneName: 'AST (UTC+3)', region: 'Arabian Standard Time', utcOffsetHours: 3, unLocode: 'YE ADE', isDaylight: true, activePort: 'Port of Aden & Hodeidah' },
  { id: 'TZ-SGT', zoneName: 'SGT (UTC+8)', region: 'Singapore Standard Time', utcOffsetHours: 8, unLocode: 'SG SIN', isDaylight: false, activePort: 'Port of Singapore & Malacca' }
];

export const RegionalTimeZonesView: React.FC = () => {
  const [time, setTime] = useState<Date>(new Date());
  const [departurePort, setDeparturePort] = useState<string>('TZ-CET');
  const [arrivalPort, setArrivalPort] = useState<string>('TZ-EET');
  const [transitHours, setTransitHours] = useState<number>(24);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getFormattedZoneTime = (offset: number) => {
    const utc = time.getTime() + time.getTimezoneOffset() * 60000;
    const zoneTime = new Date(utc + 3600000 * offset);
    return zoneTime.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  const getFormattedZoneDate = (offset: number) => {
    const utc = time.getTime() + time.getTimezoneOffset() * 60000;
    const zoneTime = new Date(utc + 3600000 * offset);
    return zoneTime.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
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
            <Globe className="w-4 h-4 text-cyan-400" />
            <span>Global Maritime Regional Time Zone Clocks & Transit ETA Calculator</span>
          </h3>
          <p className="text-[10px] text-slate-400 font-sans">
            Real-time UTC clocks, regional maritime time offsets, and arrival time zone conversions across global shipping hubs
          </p>
        </div>

        <span className="bg-cyan-950 text-cyan-300 border border-cyan-800 text-[10px] px-2.5 py-1 rounded font-bold">
          UTC SATELLITE TIME SYNC
        </span>
      </div>

      {/* Live Clocks Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {TIME_ZONES.map((tz) => (
          <div key={tz.id} className="bg-slate-950 border border-slate-800 p-3.5 rounded-2xl space-y-2 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center text-[8px] text-slate-500 font-bold">
                <span>{tz.unLocode}</span>
                {tz.isDaylight ? <Sun className="w-3 h-3 text-amber-400" /> : <Moon className="w-3 h-3 text-indigo-400" />}
              </div>
              <h4 className="text-xs font-bold text-white mt-0.5">{tz.zoneName}</h4>
              <span className="text-[9px] text-cyan-400 font-mono block mt-0.5">{tz.activePort}</span>
            </div>

            <div className="pt-2 border-t border-slate-900 space-y-0.5">
              <p className="text-base font-black text-white font-mono tracking-wider">
                {getFormattedZoneTime(tz.utcOffsetHours)}
              </p>
              <p className="text-[8px] text-slate-500 font-mono">
                {getFormattedZoneDate(tz.utcOffsetHours)}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Transit ETA Time Converter */}
      <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl space-y-3">
        <h4 className="text-xs font-bold text-white uppercase flex items-center space-x-2 border-b border-slate-900 pb-2">
          <Clock className="w-4 h-4 text-cyan-400" />
          <span>Vessel Voyage Route ETA Time Zone Converter</span>
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-end">
          <div>
            <label className="text-[9px] text-slate-400 font-bold block mb-1">DEPARTURE TIME ZONE:</label>
            <select
              value={departurePort}
              onChange={(e) => {
                setDeparturePort(e.target.value);
                hapticEngine.trigger('click');
              }}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white font-bold"
            >
              {TIME_ZONES.map((tz) => (
                <option key={tz.id} value={tz.id}>
                  {tz.zoneName} — {tz.activePort}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-[9px] text-slate-400 font-bold block mb-1">TRANSIT DURATION (HOURS):</label>
            <input
              type="number"
              min="1"
              max="240"
              value={transitHours}
              onChange={(e) => setTransitHours(Number(e.target.value))}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white font-bold"
            />
          </div>

          <div>
            <label className="text-[9px] text-slate-400 font-bold block mb-1">DESTINATION TIME ZONE:</label>
            <select
              value={arrivalPort}
              onChange={(e) => {
                setArrivalPort(e.target.value);
                hapticEngine.trigger('click');
              }}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white font-bold"
            >
              {TIME_ZONES.map((tz) => (
                <option key={tz.id} value={tz.id}>
                  {tz.zoneName} — {tz.activePort}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
