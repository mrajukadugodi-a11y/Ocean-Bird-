import React, { useState } from 'react';
import {
  Plane,
  Box,
  Truck,
  PackageCheck,
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
  AlertTriangle,
  FileText
} from 'lucide-react';
import { ALL_INDIAN_AIRPORTS, INTERNATIONAL_AIRPORTS } from './AirwaysBookingAndFlightTracker';
import { cacheFlightBooking, useOfflineFlightStatus } from '../utils/offlineFlightCache';

import { CurrencySelector, useCurrency } from '../utils/currencyUtils';

export const AirwaysCargoPortal: React.FC = () => {
  const { reloadOfflineData } = useOfflineFlightStatus();
  const { currency, formatPrice } = useCurrency();

  // Cargo Scope
  const [cargoScope, setCargoScope] = useState<'Domestic India Cargo' | 'International Air Freight'>('Domestic India Cargo');
  const [cargoCategory, setCargoCategory] = useState<'Express Courier Package' | 'General Air Cargo' | 'Cold-Chain Pharma' | 'Hazardous Hazmat' | 'Heavy Aviation Equipment'>('General Air Cargo');

  // Cargo Flight Route
  const [originCode, setOriginCode] = useState<string>('BOM');
  const [destCode, setDestCode] = useState<string>('DEL');
  const [dispatchDate, setDispatchDate] = useState<string>('2026-08-21');

  // Shipper & Consignee
  const [shipperCompany, setShipperCompany] = useState<string>('OceanBird Air Logistics Ltd');
  const [consigneeCompany, setConsigneeCompany] = useState<string>('Global Maritime Supply Hub');

  // Package Weight & Dimensions
  const [packageCount, setPackageCount] = useState<number>(3);
  const [grossWeightKg, setGrossWeightKg] = useState<number>(145.0);
  const [dimLengthCm, setDimLengthCm] = useState<number>(80);
  const [dimWidthCm, setDimWidthCm] = useState<number>(60);
  const [dimHeightCm, setDimHeightCm] = useState<number>(50);

  // Volumetric Chargeable Weight calculation (IATA standard: L x W x H / 6000 for air cargo)
  const volWeightKg = Math.round(((dimLengthCm * dimWidthCm * dimHeightCm) / 6000) * packageCount * 10) / 10;
  const chargeableWeightKg = Math.max(grossWeightKg, volWeightKg);

  // Price estimate (e.g. ₹180/kg domestic, ₹450/kg intl)
  const ratePerKg = cargoScope === 'Domestic India Cargo' ? 180 : 450;
  const estimatedFreightINR = Math.round(chargeableWeightKg * ratePerKg);

  // Search Cargo Flights
  const [isBooking, setIsBooking] = useState<boolean>(false);
  const [issuedAwb, setIssuedAwb] = useState<any | null>(null);

  const availableOrigins = ALL_INDIAN_AIRPORTS;
  const availableDests = cargoScope === 'Domestic India Cargo' ? ALL_INDIAN_AIRPORTS : INTERNATIONAL_AIRPORTS;

  const handleBookAirCargo = async () => {
    setIsBooking(true);
    setTimeout(async () => {
      setIsBooking(false);

      const awbNo = `AWB-${cargoScope === 'Domestic India Cargo' ? '6E' : 'AI'}-${Math.floor(10000000 + Math.random() * 90000000)}`;

      const awbManifest = {
        awbNumber: awbNo,
        cargoScope,
        cargoCategory,
        originCode,
        destCode,
        dispatchDate,
        shipperCompany,
        consigneeCompany,
        packageCount,
        grossWeightKg,
        volumetricWeightKg: volWeightKg,
        chargeableWeightKg,
        freightAmountINR: estimatedFreightINR,
        freightAmountUSD: Math.round(estimatedFreightINR / 83),
        status: 'MANIFESTED - READY FOR RAMP LOADING',
        pnr: awbNo,
        flightNumber: cargoScope === 'Domestic India Cargo' ? '6E-CARGO-902' : 'AI-CARGO-405',
        airline: cargoScope === 'Domestic India Cargo' ? 'IndiGo Air Cargo Express' : 'Air India Cargo International',
        passengerName: `Shipper: ${shipperCompany}`,
        issuedAt: new Date().toISOString()
      };

      await cacheFlightBooking(awbManifest);
      await reloadOfflineData();
      setIssuedAwb(awbManifest);
    }, 700);
  };

  return (
    <div id="airways-cargo-portal" className="space-y-6 font-mono text-slate-100">
      {/* Header */}
      <div className="bg-slate-900 border border-amber-500/40 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center space-x-2 text-amber-400 font-bold text-xs uppercase tracking-widest mb-1">
              <Zap className="w-4 h-4 text-amber-400 animate-pulse" />
              <span>AIRWAYS CARGO & COURIER LOGISTICS PORTAL (SEPARATE SERVICE)</span>
            </div>
            <h2 className="text-2xl font-black text-white tracking-tight flex items-center space-x-2">
              <Box className="w-7 h-7 text-amber-400" />
              <span>Air Cargo & Express Courier Logistics Online Booking</span>
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl font-sans">
              Book domestic air freight courier and international aviation cargo shipments, compute IATA chargeable volumetric weight, and issue electronic Air Waybills (AWB).
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <CurrencySelector />
            <div className="flex items-center space-x-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
              <button
                onClick={() => {
                  setCargoScope('Domestic India Cargo');
                  setDestCode('DEL');
                }}
                className={`px-4 py-2 rounded-lg text-xs font-black transition-all ${
                  cargoScope === 'Domestic India Cargo'
                    ? 'bg-amber-500 text-slate-950 shadow-lg'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                🇮🇳 DOMESTIC CARGO
              </button>
              <button
                onClick={() => {
                  setCargoScope('International Air Freight');
                  setDestCode('DXB');
                }}
                className={`px-4 py-2 rounded-lg text-xs font-black transition-all ${
                  cargoScope === 'International Air Freight'
                    ? 'bg-amber-500 text-slate-950 shadow-lg'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                ✈️ INTERNATIONAL AIR FREIGHT
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Form Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="text-xs font-bold text-slate-300 flex items-center space-x-2">
            <FileText className="w-4 h-4 text-amber-400" />
            <span>Issue New Air Waybill (AWB) Manifest for {cargoScope}</span>
          </div>

          <div className="text-xs text-amber-400 font-bold bg-amber-500/10 px-3 py-1 rounded-lg border border-amber-500/20">
            IATA Volumetric Standard: (L × W × H cm) / 6000
          </div>
        </div>

        {/* Form Inputs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div>
            <label className="text-slate-400 block mb-1 text-[10px] font-bold">CARGO CATEGORY</label>
            <select
              value={cargoCategory}
              onChange={(e) => setCargoCategory(e.target.value as any)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-amber-300 focus:border-amber-500"
            >
              <option value="General Air Cargo">General Air Freight Cargo</option>
              <option value="Express Courier Package">Express Door-to-Door Courier Parcel</option>
              <option value="Cold-Chain Pharma">Temperature Controlled Cold-Chain Pharma</option>
              <option value="Hazardous Hazmat">Dangerous Goods / Hazmat IATA Class 9</option>
              <option value="Heavy Aviation Equipment">Heavy Marine Spare Parts & Equipment</option>
            </select>
          </div>

          <div>
            <label className="text-slate-400 block mb-1 text-[10px] font-bold">DEPARTURE AIRPORT (ORIGIN)</label>
            <select
              value={originCode}
              onChange={(e) => setOriginCode(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:border-amber-500"
            >
              {availableOrigins.map((ap) => (
                <option key={ap.code} value={ap.code}>
                  {ap.code} - {ap.city} ({ap.name})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-slate-400 block mb-1 text-[10px] font-bold">DESTINATION AIRPORT</label>
            <select
              value={destCode}
              onChange={(e) => setDestCode(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:border-amber-500"
            >
              {availableDests.map((ap) => (
                <option key={ap.code} value={ap.code}>
                  {ap.code} - {ap.city} ({ap.name})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-slate-400 block mb-1 text-[10px] font-bold">FLIGHT DISPATCH DATE</label>
            <input
              type="date"
              value={dispatchDate}
              onChange={(e) => setDispatchDate(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:border-amber-500"
            />
          </div>

          <div>
            <label className="text-slate-400 block mb-1 text-[10px] font-bold">SHIPPER / EXPORTER NAME</label>
            <input
              type="text"
              value={shipperCompany}
              onChange={(e) => setShipperCompany(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:border-amber-500"
            />
          </div>

          <div>
            <label className="text-slate-400 block mb-1 text-[10px] font-bold">CONSIGNEE / IMPORTER NAME</label>
            <input
              type="text"
              value={consigneeCompany}
              onChange={(e) => setConsigneeCompany(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:border-amber-500"
            />
          </div>

          <div>
            <label className="text-slate-400 block mb-1 text-[10px] font-bold">NUMBER OF PACKAGES</label>
            <input
              type="number"
              min="1"
              value={packageCount}
              onChange={(e) => setPackageCount(parseInt(e.target.value) || 1)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:border-amber-500"
            />
          </div>

          <div>
            <label className="text-slate-400 block mb-1 text-[10px] font-bold">ACTUAL GROSS WEIGHT (KG)</label>
            <input
              type="number"
              min="1"
              value={grossWeightKg}
              onChange={(e) => setGrossWeightKg(parseFloat(e.target.value) || 1)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-amber-300 focus:border-amber-500"
            />
          </div>

          {/* Dimensions Box */}
          <div className="sm:col-span-2 lg:col-span-4 bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
            <span className="text-xs font-bold text-slate-300 flex items-center space-x-2">
              <Scale className="w-4 h-4 text-amber-400" />
              <span>Package Box Dimensions (Length x Width x Height in CM)</span>
            </span>

            <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
              <div>
                <label className="text-slate-400 block mb-1 text-[10px]">LENGTH (CM)</label>
                <input
                  type="number"
                  value={dimLengthCm}
                  onChange={(e) => setDimLengthCm(parseFloat(e.target.value) || 10)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-white"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1 text-[10px]">WIDTH (CM)</label>
                <input
                  type="number"
                  value={dimWidthCm}
                  onChange={(e) => setDimWidthCm(parseFloat(e.target.value) || 10)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-white"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1 text-[10px]">HEIGHT (CM)</label>
                <input
                  type="number"
                  value={dimHeightCm}
                  onChange={(e) => setDimHeightCm(parseFloat(e.target.value) || 10)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-white"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1 text-[10px]">VOLUMETRIC WEIGHT</label>
                <div className="p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sky-400 font-bold">
                  {volWeightKg} KG
                </div>
              </div>

              <div>
                <label className="text-slate-400 block mb-1 text-[10px]">CHARGEABLE WEIGHT</label>
                <div className="p-2.5 bg-slate-900 border border-amber-500/40 rounded-xl text-amber-300 font-black">
                  {chargeableWeightKg} KG
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Estimated Price Bar */}
        <div className="p-4 bg-slate-950 rounded-xl border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-[10px] text-slate-400 uppercase block font-bold">ESTIMATED AIR FREIGHT CHARGES</span>
            <div className="text-2xl font-black text-amber-400">
              ₹{estimatedFreightINR.toLocaleString()} <span className="text-xs text-slate-400 font-normal">({chargeableWeightKg} KG @ ₹{ratePerKg}/KG)</span>
            </div>
          </div>

          <button
            onClick={handleBookAirCargo}
            disabled={isBooking}
            className="w-full sm:w-auto px-8 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center space-x-2 shadow-lg shadow-amber-500/20 transition-all"
          >
            {isBooking ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Box className="w-4 h-4" />}
            <span>BOOK AIR CARGO & GENERATE AWB MANIFEST</span>
          </button>
        </div>
      </div>

      {/* ISSUED AIR WAYBILL (AWB) MANIFEST MODAL */}
      {issuedAwb && (
        <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
          <div className="bg-slate-900 border border-amber-500/50 rounded-2xl max-w-2xl w-full p-6 text-white space-y-6 shadow-2xl my-auto font-mono">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2 text-amber-400 font-black text-sm">
                <CheckCircle2 className="w-5 h-5 text-amber-400" />
                <span>OFFICIAL AIR WAYBILL (AWB) ISSUED</span>
              </div>
              <button
                onClick={() => setIssuedAwb(null)}
                className="text-slate-400 hover:text-white text-xs font-bold bg-slate-800 px-3 py-1.5 rounded-lg"
              >
                ✕ Close
              </button>
            </div>

            <div className="bg-white text-slate-900 p-6 rounded-2xl border-4 border-slate-900 space-y-4 shadow-2xl font-sans">
              <div className="flex justify-between items-start border-b-2 border-slate-900 pb-3">
                <div>
                  <span className="text-amber-800 font-black text-[10px] uppercase tracking-widest block">
                    IATA AIR WAYBILL (NON-NEGOTIABLE)
                  </span>
                  <h3 className="text-xl font-black text-slate-950 uppercase">{issuedAwb.airline}</h3>
                  <p className="text-xs font-bold text-slate-600">{issuedAwb.cargoCategory}</p>
                </div>
                <div className="text-right font-mono text-xs">
                  <div className="font-black text-amber-900 text-sm">AWB: {issuedAwb.awbNumber}</div>
                  <div className="text-emerald-700 font-bold">STATUS: READY FOR RAMP LOADING</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs font-mono bg-slate-100 p-3 rounded-xl">
                <div>
                  <span className="text-[10px] text-slate-500 block">SHIPPER / EXPORTER</span>
                  <strong className="text-slate-950">{issuedAwb.shipperCompany}</strong>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">CONSIGNEE / IMPORTER</span>
                  <strong className="text-slate-950">{issuedAwb.consigneeCompany}</strong>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">ORIGIN ➔ DESTINATION</span>
                  <strong className="text-sky-900 font-extrabold">{issuedAwb.originCode} ✈️ {issuedAwb.destCode}</strong>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">CHARGEABLE WEIGHT</span>
                  <strong className="text-amber-900 font-extrabold">{issuedAwb.chargeableWeightKg} KG ({issuedAwb.packageCount} PKGS)</strong>
                </div>
              </div>

              <div className="flex justify-between items-center pt-2 border-t border-slate-300">
                <div className="flex items-center space-x-2 text-xs font-mono text-slate-600">
                  <QrCode className="w-10 h-10 text-slate-900" />
                  <div>
                    <div className="text-[10px] font-bold text-slate-900">RAMP BARCODE SCANNER CERTIFIED</div>
                    <div className="text-[9px] text-slate-500">Service Worker Manifest Synchronized</div>
                  </div>
                </div>

                <div className="text-right font-mono">
                  <div className="text-[10px] text-slate-500">FREIGHT AMOUNT</div>
                  <div className="text-base font-black text-slate-950">₹{issuedAwb.freightAmountINR.toLocaleString()}</div>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-xs flex items-center space-x-2"
              >
                <Printer className="w-4 h-4" />
                <span>PRINT AWB MANIFEST</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
