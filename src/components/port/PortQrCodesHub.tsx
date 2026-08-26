import React, { useState } from 'react';
import {
  QrCode,
  Download,
  Share2,
  Printer,
  CheckCircle2,
  Camera,
  RefreshCw,
  Sparkles,
  ShieldCheck,
  Percent,
  Ticket,
  ParkingCircle,
  CreditCard,
  Copy,
  Check
} from 'lucide-react';
import { hapticEngine } from '../../utils/hapticUtils';

interface PortQrCodesHubProps {
  residentPassId?: string;
  residentName?: string;
  isResidentActive?: boolean;
  triggerToast?: (msg: string, type?: 'success' | 'info' | 'warning' | 'error', title?: string) => void;
}

export const PortQrCodesHub: React.FC<PortQrCodesHubProps> = ({
  residentPassId = 'CR-98214-GA',
  residentName = 'Captain Ananya Silva',
  isResidentActive = true,
  triggerToast
}) => {
  const [activeQrCategory, setActiveQrCategory] = useState<
    'DUTY_FREE_DISCOUNT' | 'EXPO_PASS' | 'RESIDENT_PASS' | 'PARKING_VALIDATION' | 'MERCHANT_PAYMENT'
  >('DUTY_FREE_DISCOUNT');

  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [scanStatus, setScanStatus] = useState<'IDLE' | 'SCANNING' | 'SUCCESS'>('IDLE');
  const [scannedData, setScannedData] = useState<string | null>(null);

  const notify = (msg: string, type: 'success' | 'info' | 'warning' | 'error' = 'info', title?: string) => {
    if (triggerToast) {
      triggerToast(msg, type, title);
    } else {
      console.log(`[${type}] ${title}: ${msg}`);
    }
  };

  // QR Specs Map
  const qrSpecs = {
    DUTY_FREE_DISCOUNT: {
      title: 'Royal Duty-Free 20% Privilege QR',
      code: 'QR-DF-DUTYFREE-2026-X89',
      subtitle: 'Instant 20% Tax Refund & Discount at Duty-Free Stores',
      validUntil: 'Today, 11:59 PM',
      color: 'from-amber-500 to-amber-600',
      badge: 'DUTY-FREE DISCOUNT',
      instructions: 'Show this QR at Royal Ocean Duty-Free checkout counters or automatic scanner gates.',
      dataString: 'OCEAN_PORT_DUTYFREE_DISCOUNT_20PCT_VERIFIED'
    },
    EXPO_PASS: {
      title: 'Global Maritime Expo Fast-Track Pass QR',
      code: 'QR-EXPO-HALL1-FASTPASS-902',
      subtitle: 'VIP Entry Pass for Exhibition Hall 1 & Floating Docks',
      validUntil: 'Sep 02, 2026',
      color: 'from-cyan-500 to-blue-600',
      badge: 'EXPO ENTRY PASS',
      instructions: 'Scan at Exhibition Hall turnstile readers to bypass public queue.',
      dataString: 'OCEAN_PORT_EXPO_HALL1_VIP_PASS_VALID'
    },
    RESIDENT_PASS: {
      title: 'Coastal Resident Port Card QR',
      code: `QR-RESIDENT-${residentPassId || '98214'}`,
      subtitle: `Verified Pass for ${residentName || 'Coastal Citizen'}`,
      validUntil: 'Aug 2027 (1-Year Renewal)',
      color: 'from-purple-500 to-indigo-600',
      badge: 'RESIDENT PORT CARD',
      instructions: 'Present for resident privileges across shops, dining, and harbor ferry terminals.',
      dataString: `OCEAN_PORT_RESIDENT_CARD_${residentPassId || 'CR-9821'}`
    },
    PARKING_VALIDATION: {
      title: 'Port Smart Parking 3-Hour Free Validation QR',
      code: 'QR-PARK-3HR-VAL-7712',
      subtitle: 'Level B1-B3 Parking Kiosk Validation Voucher',
      validUntil: 'Expires in 2 hrs 45 mins',
      color: 'from-emerald-500 to-teal-600',
      badge: 'FREE PARKING VOUCHER',
      instructions: 'Scan at parking payment machines prior to exit to waive 3 hours parking fees.',
      dataString: 'OCEAN_PORT_PARKING_3HR_FREE_VALIDATED'
    },
    MERCHANT_PAYMENT: {
      title: 'Port Merchant Contactless Pay QR',
      code: 'QR-PAY-PORTMERCHANT-5541',
      subtitle: 'Unified Port Wallet & Duty-Free Express Checkout',
      validUntil: 'Dynamic Session (Refreshes every 60s)',
      color: 'from-rose-500 to-pink-600',
      badge: 'CONTACTLESS PAYMENT',
      instructions: 'Allow merchant to scan this QR code to process instant encrypted port pay.',
      dataString: 'OCEAN_PORT_CONTACTLESS_PAYMENT_SESSION_ACTIVE'
    }
  };

  const currentSpec = qrSpecs[activeQrCategory];
  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(
    currentSpec.dataString
  )}`;

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    hapticEngine.trigger('success');
    notify(`Copied QR Code: ${code}`, 'success', 'CODE COPIED');
    setTimeout(() => setCopiedCode(null), 2500);
  };

  const handleSimulateScan = () => {
    setIsScannerOpen(true);
    setScanStatus('SCANNING');
    hapticEngine.trigger('click');

    setTimeout(() => {
      setScanStatus('SUCCESS');
      setScannedData(`VERIFIED: ${currentSpec.title} [${currentSpec.code}] - AUTHENTICATED AT PORT GATE 4`);
      hapticEngine.trigger('success');
      notify(`QR Code Scanned Successfully! Verified at Gate 4.`, 'success', 'SCAN VERIFIED');
    }, 1800);
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 sm:p-8 space-y-6 shadow-2xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center space-x-2">
              <QrCode className="w-6 h-6 text-cyan-400" />
              <span>Unified Ocean Port QR Code Hub &amp; Gate Verification</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Generate, save, and scan official digital QR codes for duty-free discounts, exhibition turnstile passes, resident privileges, and parking validation.
            </p>
          </div>

          <button
            onClick={handleSimulateScan}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-black text-xs font-mono transition-all shadow-lg hover:brightness-110 flex items-center justify-center space-x-2"
          >
            <Camera className="w-4 h-4" />
            <span>Simulate Live Scanner</span>
          </button>
        </div>

        {/* QR Category Switcher */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-800">
          {(
            [
              { id: 'DUTY_FREE_DISCOUNT', label: 'Duty-Free 20%', icon: Percent },
              { id: 'EXPO_PASS', label: 'Expo Pass', icon: Ticket },
              { id: 'RESIDENT_PASS', label: 'Resident Pass', icon: ShieldCheck },
              { id: 'PARKING_VALIDATION', label: 'Free Parking', icon: ParkingCircle },
              { id: 'MERCHANT_PAYMENT', label: 'Merchant Pay', icon: CreditCard }
            ] as const
          ).map((item) => {
            const Icon = item.icon;
            const isActive = activeQrCategory === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveQrCategory(item.id);
                  hapticEngine.trigger('click');
                }}
                className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center space-x-2 ${
                  isActive
                    ? 'bg-cyan-500 text-slate-950 shadow-lg font-black'
                    : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* QR Code Pass Display Card */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center bg-slate-950 p-6 sm:p-8 rounded-3xl border border-cyan-500/30">
          <div className="md:col-span-5 flex flex-col items-center justify-center text-center space-y-4">
            <div className="relative group bg-white p-4 rounded-3xl shadow-2xl border-4 border-slate-800">
              <img src={qrImageUrl} alt={currentSpec.title} className="w-48 h-48 object-contain" />
              <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-3 text-white space-y-2">
                <ShieldCheck className="w-8 h-8 text-cyan-400" />
                <span className="text-[10px] font-mono font-bold text-center">Encrypted Port Cryptographic Pass</span>
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-xs font-mono text-cyan-400 font-bold block">{currentSpec.code}</span>
              <span className="text-[10px] font-mono text-slate-500">Scan at any official Port Smart Terminal</span>
            </div>
          </div>

          <div className="md:col-span-7 space-y-4">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span
                  className={`text-[10px] font-mono font-black px-2.5 py-1 rounded-full text-slate-950 bg-gradient-to-r ${currentSpec.color}`}
                >
                  {currentSpec.badge}
                </span>
                <span className="text-xs font-mono text-emerald-400 flex items-center space-x-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>STATUS: ACTIVE &amp; VERIFIED</span>
                </span>
              </div>
              <h3 className="text-xl font-bold text-white">{currentSpec.title}</h3>
              <p className="text-xs text-slate-300">{currentSpec.subtitle}</p>
            </div>

            <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-2 text-xs font-mono">
              <div className="flex justify-between text-slate-400">
                <span>Valid Period:</span>
                <span className="text-amber-300 font-bold">{currentSpec.validUntil}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Pass Owner:</span>
                <span className="text-white font-bold">{residentName}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Gate Permission:</span>
                <span className="text-emerald-400 font-bold">ALL GATES (1 - 8)</span>
              </div>
            </div>

            <p className="text-xs text-slate-400 italic bg-slate-900/50 p-3 rounded-xl border border-slate-800/60">
              &quot;{currentSpec.instructions}&quot;
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-2">
              <button
                onClick={() => handleCopyCode(currentSpec.code)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono font-bold transition-all flex items-center space-x-1.5"
              >
                {copiedCode === currentSpec.code ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Copy Pass Code</span>
                  </>
                )}
              </button>

              <button
                onClick={() => {
                  hapticEngine.trigger('success');
                  notify(`Downloaded High-Res PNG Pass for ${currentSpec.title}`, 'success', 'DOWNLOADED');
                }}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono font-bold transition-all flex items-center space-x-1.5"
              >
                <Download className="w-3.5 h-3.5 text-amber-400" />
                <span>Save PNG</span>
              </button>

              <button
                onClick={() => {
                  window.print();
                }}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono font-bold transition-all flex items-center space-x-1.5"
              >
                <Printer className="w-3.5 h-3.5 text-purple-400" />
                <span>Print Pass</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Live Scanner Simulator Modal */}
      {isScannerOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 rounded-3xl border border-cyan-500/40 p-6 sm:p-8 max-w-lg w-full space-y-6 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center space-x-2">
                <Camera className="w-5 h-5 text-cyan-400" />
                <h3 className="text-base font-bold text-white">Live Port Turnstile QR Scanner</h3>
              </div>
              <button
                onClick={() => {
                  setIsScannerOpen(false);
                  setScanStatus('IDLE');
                }}
                className="text-slate-400 hover:text-white text-xs font-mono font-bold px-2 py-1 rounded-lg bg-slate-800"
              >
                Close ✕
              </button>
            </div>

            <div className="relative h-64 bg-slate-950 rounded-2xl border-2 border-dashed border-cyan-500/50 flex flex-col items-center justify-center overflow-hidden">
              {scanStatus === 'SCANNING' && (
                <div className="space-y-4 text-center">
                  <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto" />
                  <p className="text-xs font-mono text-cyan-300 animate-pulse">
                    Scanning Port Smart Gate Reader...
                  </p>
                  <div className="w-48 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-bounce mx-auto" />
                </div>
              )}

              {scanStatus === 'SUCCESS' && (
                <div className="p-6 text-center space-y-3">
                  <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto animate-bounce" />
                  <h4 className="text-sm font-bold text-white">QR PASS AUTHENTICATED</h4>
                  <p className="text-xs font-mono text-emerald-300 bg-emerald-950/80 p-3 rounded-xl border border-emerald-500/30">
                    {scannedData}
                  </p>
                </div>
              )}
            </div>

            <div className="flex justify-end space-x-2">
              <button
                onClick={handleSimulateScan}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-mono font-bold text-slate-200 flex items-center space-x-1"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Scan Again</span>
              </button>
              <button
                onClick={() => setIsScannerOpen(false)}
                className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-xs font-mono font-black text-slate-950"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
