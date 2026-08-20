import React, { useState } from 'react';
import { Clock, Anchor, Calendar, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { hapticEngine } from '../../utils/hapticUtils';

export interface PortTimeCard {
  id: string;
  portName: string;
  unLocode: string;
  etaLocal: string;
  etdLocal: string;
  pilotBoardingTime: string;
  berthNumber: string;
  laytimeHoursAllowed: number;
  laytimeHoursUsed: number;
  status: 'BERTHED' | 'EN_ROUTE' | 'ANCHORED' | 'CLEARED';
}

const SAMPLE_PORT_TIME_CARDS: PortTimeCard[] = [
  {
    id: 'PTC-RTM-01',
    portName: 'Port of Rotterdam (Europoort)',
    unLocode: 'NL RTM',
    etaLocal: '2026-08-09 06:00 UTC+2',
    etdLocal: '2026-08-10 18:00 UTC+2',
    pilotBoardingTime: '2026-08-09 05:15 UTC+2',
    berthNumber: 'Berth 74A (Container)',
    laytimeHoursAllowed: 36,
    laytimeHoursUsed: 14.5,
    status: 'BERTHED'
  },
  {
    id: 'PTC-CPH-02',
    portName: 'Port of Copenhagen CMP',
    unLocode: 'DK CPH',
    etaLocal: '2026-08-11 12:00 UTC+2',
    etdLocal: '2026-08-12 20:00 UTC+2',
    pilotBoardingTime: '2026-08-11 11:30 UTC+2',
    berthNumber: 'Berth 3 (Cruise & RoRo)',
    laytimeHoursAllowed: 24,
    laytimeHoursUsed: 0,
    status: 'EN_ROUTE'
  }
];

export const PortTimeCardView: React.FC = () => {
  const [cards] = useState<PortTimeCard[]>(SAMPLE_PORT_TIME_CARDS);
  const [selectedCard, setSelectedCard] = useState<PortTimeCard>(SAMPLE_PORT_TIME_CARDS[0]);

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
            <Clock className="w-4 h-4 text-cyan-400" />
            <span>Port Turnaround Schedule & Laytime Time Card Tracker</span>
          </h3>
          <p className="text-[10px] text-slate-400 font-sans">
            Monitor ETA, ETD, pilot boarding times, and port laytime allowance metrics
          </p>
        </div>

        <span className="bg-cyan-950 text-cyan-300 border border-cyan-800 text-[10px] px-2.5 py-1 rounded font-bold">
          PORT TIME CARDS ACTIVE
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Port Time Cards List */}
        <div className="lg:col-span-2 space-y-3">
          {cards.map((c) => (
            <div
              key={c.id}
              onClick={() => {
                setSelectedCard(c);
                hapticEngine.trigger('click');
              }}
              className={`p-4 rounded-2xl border cursor-pointer transition-all space-y-2 ${
                selectedCard.id === c.id
                  ? 'bg-slate-950 border-cyan-400 ring-1 ring-cyan-400'
                  : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex justify-between items-center border-b border-slate-900 pb-2">
                <div>
                  <span className="text-[8px] text-cyan-400 font-bold block">{c.unLocode}</span>
                  <h4 className="text-xs font-bold text-white">{c.portName}</h4>
                </div>
                <span className="px-2 py-0.5 rounded text-[8px] font-bold bg-cyan-950 text-cyan-300 border border-cyan-800">
                  {c.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[10px] bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                <div>
                  <span className="text-slate-500 block">ESTIMATED ARRIVAL (ETA):</span>
                  <span className="text-emerald-400 font-bold">{c.etaLocal}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">ESTIMATED DEPARTURE (ETD):</span>
                  <span className="text-amber-300 font-bold">{c.etdLocal}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Selected Card Laytime Gauge */}
        <div className="bg-slate-950 border border-slate-800 p-5 rounded-2xl space-y-3 font-mono flex flex-col justify-between">
          <div className="space-y-3">
            <div className="border-b border-slate-800 pb-2">
              <span className="text-[8px] text-cyan-400 font-bold block">{selectedCard.unLocode}</span>
              <h4 className="text-xs font-bold text-white">{selectedCard.portName}</h4>
              <span className="text-[9px] text-slate-400 block font-sans">{selectedCard.berthNumber}</span>
            </div>

            <div className="space-y-2 bg-slate-900 p-3 rounded-xl border border-slate-800 text-[10px]">
              <div className="flex justify-between">
                <span className="text-slate-500">PILOT BOARDING:</span>
                <span className="text-white font-bold">{selectedCard.pilotBoardingTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">LAYTIME ALLOWED:</span>
                <span className="text-cyan-300 font-bold">{selectedCard.laytimeHoursAllowed} Hours</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">LAYTIME CONSUMED:</span>
                <span className="text-amber-300 font-bold">{selectedCard.laytimeHoursUsed} Hours</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
