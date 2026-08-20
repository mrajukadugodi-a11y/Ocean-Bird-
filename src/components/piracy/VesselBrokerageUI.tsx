import React, { useState } from 'react';
import { Landmark, ShieldCheck, FileText, Calculator, UserCheck, Calendar, DollarSign, ArrowRight, Award, Search, Filter } from 'lucide-react';
import { hapticEngine } from '../../utils/hapticUtils';

export interface BrokerDesk {
  id: string;
  name: string;
  firm: string;
  specialty: string;
  dealsClosed: number;
  rating: number;
  email: string;
}

const BROKER_DESKS: BrokerDesk[] = [
  {
    id: 'BRK-01',
    name: 'Capt. Jonathan Vance',
    firm: 'Clarksons Platou Shipbrokers',
    specialty: 'Container Liners & Tanker S&P',
    dealsClosed: 142,
    rating: 4.9,
    email: 'jvance@clarksons-example.com'
  },
  {
    id: 'BRK-02',
    name: 'Elena Rostova',
    firm: 'Braemar Shipbroking Direct',
    specialty: 'Dry Bulk & Timber Carriers',
    dealsClosed: 98,
    rating: 4.8,
    email: 'erostova@braemar-example.com'
  },
  {
    id: 'BRK-03',
    name: 'Hassan Al-Maktoum',
    firm: 'Dubai Gulf Maritime Exchange',
    specialty: 'LNG Carriers & Offshore Workboats',
    dealsClosed: 87,
    rating: 5.0,
    email: 'hassan@dubaimaritime-example.com'
  },
  {
    id: 'BRK-04',
    name: 'Sir Arthur Sterling',
    firm: 'London Baltic Exchange Brokers',
    specialty: 'Luxury Superyachts & Cruise Liners',
    dealsClosed: 115,
    rating: 4.9,
    email: 'asterling@balticexchange-example.com'
  }
];

export const VesselBrokerageUI: React.FC = () => {
  const [selectedBroker, setSelectedBroker] = useState<BrokerDesk>(BROKER_DESKS[0]);
  const [brokerSearchQuery, setBrokerSearchQuery] = useState<string>('');
  const [estimatedValue, setEstimatedValue] = useState<number>(35000000);
  const [commissionRate, setCommissionRate] = useState<number>(1.25);
  const [moaStep, setMoaStep] = useState<string>('DRAFT');
  const [inspectionDate, setInspectionDate] = useState<string>('2026-08-15');

  const filteredBrokers = BROKER_DESKS.filter(
    (b) =>
      b.name.toLowerCase().includes(brokerSearchQuery.toLowerCase()) ||
      b.firm.toLowerCase().includes(brokerSearchQuery.toLowerCase()) ||
      b.specialty.toLowerCase().includes(brokerSearchQuery.toLowerCase())
  );

  const commissionUsd = (estimatedValue * (commissionRate / 100)).toLocaleString();

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-2xl space-y-4 font-mono text-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="space-y-0.5">
          <h3 className="text-xs font-bold text-white uppercase flex items-center space-x-2">
            <Landmark className="w-4 h-4 text-cyan-400" />
            <span>Maritime Vessels Brokerage, Valuation & MOA Contract Desk</span>
          </h3>
          <p className="text-[10px] text-slate-400 font-sans">
            BIMCO Saleform contract generation, broker commission calculators, class inspection scheduling, and verified shipbroker credentials
          </p>
        </div>

        <span className="bg-cyan-950 text-cyan-300 border border-cyan-800 text-[10px] px-2.5 py-1 rounded font-bold">
          BIMCO SALEFORM 2012 COMPLIANT
        </span>
      </div>

      {/* Brokerage Valuation & Commission Calculator */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl space-y-3">
          <span className="text-xs font-bold text-cyan-300 flex items-center space-x-2 border-b border-slate-900 pb-2">
            <Calculator className="w-4 h-4 text-cyan-400" />
            <span>Vessel Asset Valuation & Commission Estimator</span>
          </span>

          <div className="space-y-3 font-sans">
            <div>
              <div className="flex justify-between text-[10px] font-mono text-slate-400 mb-1">
                <span>Vessel Valuation:</span>
                <span className="text-white font-bold">${estimatedValue.toLocaleString()} USD</span>
              </div>
              <input
                type="range"
                min="2000000"
                max="150000000"
                step="1000000"
                value={estimatedValue}
                onChange={(e) => {
                  setEstimatedValue(parseFloat(e.target.value));
                  hapticEngine.trigger('click');
                }}
                className="w-full accent-cyan-400 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-[10px] font-mono text-slate-400 mb-1">
                <span>Broker Commission Fee ({commissionRate}% Standard):</span>
                <span className="text-emerald-400 font-bold">${commissionUsd} USD</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="2.5"
                step="0.25"
                value={commissionRate}
                onChange={(e) => {
                  setCommissionRate(parseFloat(e.target.value));
                  hapticEngine.trigger('click');
                }}
                className="w-full accent-emerald-400 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* BIMCO MOA Contract Workflow */}
        <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl space-y-3">
          <span className="text-xs font-bold text-white flex items-center space-x-2 border-b border-slate-900 pb-2">
            <FileText className="w-4 h-4 text-emerald-400" />
            <span>MOA (Memorandum of Agreement) Status</span>
          </span>

          <div className="space-y-2 text-[10px]">
            <div className="flex justify-between items-center bg-slate-900 p-2.5 rounded-xl border border-slate-800">
              <span className="text-slate-400 font-sans">BIMCO Clause 1: Deposit (10% Escrow):</span>
              <span className="text-emerald-400 font-bold font-mono">LOCKED IN ESCROW</span>
            </div>

            <div className="flex justify-between items-center bg-slate-900 p-2.5 rounded-xl border border-slate-800">
              <span className="text-slate-400 font-sans">BIMCO Clause 4: Class Survey Inspection:</span>
              <span className="text-amber-400 font-bold font-mono">SCHEDULED ({inspectionDate})</span>
            </div>

            <button
              onClick={() => {
                setMoaStep(moaStep === 'DRAFT' ? 'EXECUTED' : 'DRAFT');
                hapticEngine.trigger('success');
              }}
              className="w-full py-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-black rounded-xl text-xs shadow transition-all font-mono"
            >
              {moaStep === 'DRAFT' ? 'EXECUTE BIMCO SALEFORM CONTRACT' : 'CONTRACT EXECUTED & SIGNED (VIEW)'}
            </button>
          </div>
        </div>
      </div>

      {/* Verified Shipbroker Desk Directory */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <span className="text-xs font-bold text-white block">Accredited Maritime Shipbrokers Desk</span>
          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search shipbroker, firm, or specialty..."
              value={brokerSearchQuery}
              onChange={(e) => setBrokerSearchQuery(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {filteredBrokers.map((broker) => (
            <div
              key={broker.id}
              onClick={() => {
                setSelectedBroker(broker);
                hapticEngine.trigger('click');
              }}
              className={`p-3.5 rounded-2xl border cursor-pointer transition-all space-y-2 ${
                selectedBroker.id === broker.id
                  ? 'bg-slate-950 border-cyan-400 ring-1 ring-cyan-400'
                  : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-xs font-bold text-white">{broker.name}</h4>
                  <span className="text-[9px] text-slate-400 font-sans block">{broker.firm}</span>
                </div>
                <span className="bg-amber-950 text-amber-300 border border-amber-800 text-[8px] font-bold px-1.5 py-0.5 rounded">
                  ★ {broker.rating}
                </span>
              </div>

              <div className="text-[9px] space-y-1">
                <div className="flex justify-between text-slate-400">
                  <span>Specialty:</span>
                  <span className="text-cyan-300 font-bold">{broker.specialty}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Closed Transactions:</span>
                  <span className="text-emerald-400 font-bold">{broker.dealsClosed} Ships</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
