import React, { useState } from 'react';
import {
  Ship,
  Anchor,
  Box,
  Truck,
  Scale,
  FileCheck2,
  Calendar,
  Search,
  CheckCircle2,
  RefreshCw,
  QrCode,
  Printer,
  ShieldCheck,
  Zap,
  Globe,
  ArrowRight,
  Sparkles,
  Building2,
  Container,
  FileText
} from 'lucide-react';
import { cacheFlightBooking, useOfflineFlightStatus } from '../utils/offlineFlightCache';

import { CurrencySelector, useCurrency } from '../utils/currencyUtils';

export const MarineCargoPortal: React.FC = () => {
  const { reloadOfflineData } = useOfflineFlightStatus();
  const { currency, formatPrice } = useCurrency();

  // Scope: Domestic Shipping vs International Maritime Freight
  const [cargoScope, setCargoScope] = useState<'Domestic Coastal Marine' | 'International Sea Freight'>('Domestic Coastal Marine');
  const [containerType, setContainerType] = useState<'20ft Standard Dry Container' | '40ft High Cube Dry Container' | '40ft Refrigerated Reefer' | 'Breakbulk Heavy Machinery' | 'Marine Express Courier LCL'>('20ft Standard Dry Container');

  // Shipping Ports
  const [originPort, setOriginPort] = useState<string>('Jawaharlal Nehru Port Trust (JNPT Mumbai)');
  const [destPort, setDestPort] = useState<string>('Visakhapatnam Port Trust (VPT)');
  const [departureDate, setDepartureDate] = useState<string>('2026-08-25');

  // Shipper & Consignee
  const [shipperCompany, setShipperCompany] = useState<string>('Indian Oceanic Marine Exports Pvt Ltd');
  const [consigneeCompany, setConsigneeCompany] = useState<string>('Eastern Seaboard Maritime Logistics');

  // Volume / Weight
  const [containerCount, setContainerCount] = useState<number>(2);
  const [totalWeightTons, setTotalWeightTons] = useState<number>(38.5);

  // Bill of Lading & Booking state
  const [isBooking, setIsBooking] = useState<boolean>(false);
  const [issuedBol, setIssuedBol] = useState<any | null>(null);

  const DOMESTIC_PORTS = [
    'Jawaharlal Nehru Port Trust (JNPT Mumbai)',
    'Deendayal Port Trust (Kandla, Gujarat)',
    'Visakhapatnam Port Trust (VPT, AP)',
    'Chennai Port Trust (CPT, Tamil Nadu)',
    'Cochin Port Authority (Kerala)',
    'Syama Prasad Mookerjee Port (Kolkata)',
    'Port Blair Haddo Berth (Andaman & Nicobar)'
  ];

  const INTERNATIONAL_PORTS = [
    'Port of Singapore (PSA Singapore)',
    'Jebel Ali Port (DP World Dubai UAE)',
    'Port of Rotterdam (Netherlands)',
    'Port of Shanghai (China)',
    'Port of Colombo (Sri Lanka)',
    'Port of Hamburg (Germany)',
    'Port of Los Angeles / Long Beach (USA)',
    'Port of Antwerp-Bruges (Belgium)',
    'Port of Santos (Brazil)',
    'Port of Cape Town (South Africa)',
    'Port of Sydney / Melbourne (Australia)',
    'Port of Yokohama (Japan)',
    'Port of Busan (South Korea)'
  ];

  const availableOrigins = DOMESTIC_PORTS;
  const availableDests = cargoScope === 'Domestic Coastal Marine' ? DOMESTIC_PORTS : INTERNATIONAL_PORTS;

  // Rates: e.g. ₹45,000 per 20ft container domestic, ₹120,000 intl
  const ratePerUnit = cargoScope === 'Domestic Coastal Marine' ? 45000 : 125000;
  const totalFreightINR = containerCount * ratePerUnit;

  const handleBookMarineCargo = async () => {
    setIsBooking(true);
    setTimeout(async () => {
      setIsBooking(false);

      const bolNumber = `BOL-MAERSK-${cargoScope === 'Domestic Coastal Marine' ? 'DOM' : 'INT'}-${Math.floor(1000000 + Math.random() * 9000000)}`;

      const bolManifest = {
        awbNumber: bolNumber,
        bolNumber,
        cargoScope,
        containerType,
        originPort,
        destPort,
        departureDate,
        shipperCompany,
        consigneeCompany,
        containerCount,
        totalWeightTons,
        freightAmountINR: totalFreightINR,
        freightAmountUSD: Math.round(totalFreightINR / 83),
        vesselName: cargoScope === 'Domestic Coastal Marine' ? 'MV OceanBird Coastal Express' : 'MV Maersk Sealand Transoceanic',
        status: 'BILL OF LADING ISSUED - CONTAINER GATED IN',
        pnr: bolNumber,
        flightNumber: cargoScope === 'Domestic Coastal Marine' ? 'MV-OBC-204' : 'MV-MTR-901',
        airline: cargoScope === 'Domestic Coastal Marine' ? 'OceanBird Domestic Marine Logistics' : 'Transoceanic Container Lines',
        passengerName: `Shipper: ${shipperCompany}`,
        issuedAt: new Date().toISOString()
      };

      await cacheFlightBooking(bolManifest);
      await reloadOfflineData();
      setIssuedBol(bolManifest);
    }, 700);
  };

  return (
    <div id="marine-cargo-portal" className="space-y-6 font-mono text-slate-100">
      {/* Header */}
      <div className="bg-slate-900 border border-cyan-500/40 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center space-x-2 text-cyan-400 font-bold text-xs uppercase tracking-widest mb-1">
              <Zap className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span>MARINE CARGO & COURIER LOGISTICS PORTAL (SEPARATE SERVICE)</span>
            </div>
            <h2 className="text-2xl font-black text-white tracking-tight flex items-center space-x-2">
              <Container className="w-7 h-7 text-cyan-400" />
              <span>Marine Sea Freight & Container Courier Logistics Booking</span>
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl font-sans">
              Book domestic coastal shipping containers and international sea freight logistics, issue negotiable Bills of Lading (B/L), and track port gate-in status.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <CurrencySelector />
            <div className="flex items-center space-x-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
              <button
                onClick={() => {
                  setCargoScope('Domestic Coastal Marine');
                  setDestPort('Visakhapatnam Port Trust (VPT)');
                }}
                className={`px-4 py-2 rounded-lg text-xs font-black transition-all ${
                  cargoScope === 'Domestic Coastal Marine'
                    ? 'bg-cyan-500 text-slate-950 shadow-lg'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                🇮🇳 DOMESTIC COASTAL FREIGHT
              </button>
              <button
                onClick={() => {
                  setCargoScope('International Sea Freight');
                  setDestPort('Port of Singapore (PSA Singapore)');
                }}
                className={`px-4 py-2 rounded-lg text-xs font-black transition-all ${
                  cargoScope === 'International Sea Freight'
                    ? 'bg-cyan-500 text-slate-950 shadow-lg'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                ⚓ INTERNATIONAL SEA FREIGHT
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Form Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="text-xs font-bold text-slate-300 flex items-center space-x-2">
            <FileText className="w-4 h-4 text-cyan-400" />
            <span>Issue Official Bill of Lading (B/L) Manifest for {cargoScope}</span>
          </div>

          <div className="text-xs text-cyan-400 font-bold bg-cyan-500/10 px-3 py-1 rounded-lg border border-cyan-500/20">
            IMO SOLAS Verified Container Gate-In
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div>
            <label className="text-slate-400 block mb-1 text-[10px] font-bold">CONTAINER & FREIGHT TYPE</label>
            <select
              value={containerType}
              onChange={(e) => setContainerType(e.target.value as any)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-cyan-300 focus:border-cyan-500"
            >
              <option value="20ft Standard Dry Container">20ft Standard Dry Container (1 TEU)</option>
              <option value="40ft High Cube Dry Container">40ft High Cube Container (2 TEU)</option>
              <option value="40ft Refrigerated Reefer">40ft Temperature Cold Reefer</option>
              <option value="Breakbulk Heavy Machinery">Breakbulk Industrial Heavy Cargo</option>
              <option value="Marine Express Courier LCL">Marine Express LCL Consolidation</option>
            </select>
          </div>

          <div>
            <label className="text-slate-400 block mb-1 text-[10px] font-bold">PORT OF LOADING (ORIGIN)</label>
            <select
              value={originPort}
              onChange={(e) => setOriginPort(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:border-cyan-500"
            >
              {availableOrigins.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-slate-400 block mb-1 text-[10px] font-bold">PORT OF DISCHARGE (DESTINATION)</label>
            <select
              value={destPort}
              onChange={(e) => setDestPort(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:border-cyan-500"
            >
              {availableDests.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-slate-400 block mb-1 text-[10px] font-bold">VESSEL SAILING DATE</label>
            <input
              type="date"
              value={departureDate}
              onChange={(e) => setDepartureDate(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="text-slate-400 block mb-1 text-[10px] font-bold">SHIPPER COMPANY</label>
            <input
              type="text"
              value={shipperCompany}
              onChange={(e) => setShipperCompany(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="text-slate-400 block mb-1 text-[10px] font-bold">CONSIGNEE COMPANY</label>
            <input
              type="text"
              value={consigneeCompany}
              onChange={(e) => setConsigneeCompany(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="text-slate-400 block mb-1 text-[10px] font-bold">CONTAINER QUANTITY</label>
            <input
              type="number"
              min="1"
              value={containerCount}
              onChange={(e) => setContainerCount(parseInt(e.target.value) || 1)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="text-slate-400 block mb-1 text-[10px] font-bold">TOTAL WEIGHT (METRIC TONS)</label>
            <input
              type="number"
              min="0.1"
              step="0.5"
              value={totalWeightTons}
              onChange={(e) => setTotalWeightTons(parseFloat(e.target.value) || 1)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-cyan-300 focus:border-cyan-500"
            />
          </div>
        </div>

        {/* Estimated Freight Charges Bar */}
        <div className="p-4 bg-slate-950 rounded-xl border border-cyan-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-[10px] text-slate-400 uppercase block font-bold">ESTIMATED SEA FREIGHT CHARGES</span>
            <div className="text-2xl font-black text-cyan-400">
              ₹{totalFreightINR.toLocaleString()} <span className="text-xs text-slate-400 font-normal">({containerCount} Units @ ₹{ratePerUnit.toLocaleString()}/unit)</span>
            </div>
          </div>

          <button
            onClick={handleBookMarineCargo}
            disabled={isBooking}
            className="w-full sm:w-auto px-8 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center space-x-2 shadow-lg shadow-cyan-500/20 transition-all"
          >
            {isBooking ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Container className="w-4 h-4" />}
            <span>BOOK MARINE FREIGHT & GENERATE BILL OF LADING</span>
          </button>
        </div>
      </div>

      {/* ISSUED BILL OF LADING (B/L) MANIFEST MODAL */}
      {issuedBol && (
        <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
          <div className="bg-slate-900 border border-cyan-500/50 rounded-2xl max-w-2xl w-full p-6 text-white space-y-6 shadow-2xl my-auto font-mono">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2 text-cyan-400 font-black text-sm">
                <CheckCircle2 className="w-5 h-5 text-cyan-400" />
                <span>OFFICIAL OCEAN BILL OF LADING (B/L) ISSUED</span>
              </div>
              <button
                onClick={() => setIssuedBol(null)}
                className="text-slate-400 hover:text-white text-xs font-bold bg-slate-800 px-3 py-1.5 rounded-lg"
              >
                ✕ Close
              </button>
            </div>

            <div className="bg-white text-slate-900 p-6 rounded-2xl border-4 border-slate-900 space-y-4 shadow-2xl font-sans">
              <div className="flex justify-between items-start border-b-2 border-slate-900 pb-3">
                <div>
                  <span className="text-cyan-800 font-black text-[10px] uppercase tracking-widest block">
                    OCEAN BILL OF LADING (NEGOTIABLE PORT DOCUMENT)
                  </span>
                  <h3 className="text-xl font-black text-slate-950 uppercase">{issuedBol.airline}</h3>
                  <p className="text-xs font-bold text-slate-600">Vessel: {issuedBol.vesselName}</p>
                </div>
                <div className="text-right font-mono text-xs">
                  <div className="font-black text-cyan-900 text-sm">B/L NO: {issuedBol.bolNumber}</div>
                  <div className="text-emerald-700 font-bold">STATUS: PORT GATE-IN COMPLETED</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs font-mono bg-slate-100 p-3 rounded-xl">
                <div>
                  <span className="text-[10px] text-slate-500 block">SHIPPER / EXPORTER</span>
                  <strong className="text-slate-950">{issuedBol.shipperCompany}</strong>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">CONSIGNEE / IMPORTER</span>
                  <strong className="text-slate-950">{issuedBol.consigneeCompany}</strong>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">PORT LOADING ➔ DISCHARGE</span>
                  <strong className="text-cyan-900 font-extrabold">{issuedBol.originPort} ⚓ {issuedBol.destPort}</strong>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">CONTAINERS & WEIGHT</span>
                  <strong className="text-cyan-900 font-extrabold">{issuedBol.containerCount} x {issuedBol.containerType} ({issuedBol.totalWeightTons} MT)</strong>
                </div>
              </div>

              <div className="flex justify-between items-center pt-2 border-t border-slate-300">
                <div className="flex items-center space-x-2 text-xs font-mono text-slate-600">
                  <QrCode className="w-10 h-10 text-slate-900" />
                  <div>
                    <div className="text-[10px] font-bold text-slate-900">CUSTOMS PORT AUTHORITY VERIFIED</div>
                    <div className="text-[9px] text-slate-500">Service Worker Manifest Synchronized</div>
                  </div>
                </div>

                <div className="text-right font-mono">
                  <div className="text-[10px] text-slate-500">FREIGHT AMOUNT</div>
                  <div className="text-base font-black text-slate-950">₹{issuedBol.freightAmountINR.toLocaleString()}</div>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black rounded-xl text-xs flex items-center space-x-2"
              >
                <Printer className="w-4 h-4" />
                <span>PRINT BILL OF LADING</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
