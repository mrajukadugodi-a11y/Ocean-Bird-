import React, { useState } from 'react';
import {
  QrCode,
  Camera,
  CheckCircle2,
  RefreshCw,
  UserCheck,
  Building2,
  FileText,
  Download,
  BookMarked,
  Share2,
  Award,
  Sparkles,
  Ticket,
  Search,
  Users
} from 'lucide-react';
import { hapticEngine } from '../../utils/hapticUtils';

export interface ScannedExhibitionLead {
  id: string;
  type: 'BOOTH_INFO' | 'DELEGATE_VCARD' | 'SEA_TRIAL_TICKET';
  title: string;
  organization: string;
  contactEmail: string;
  scannedAt: string;
  notes: string;
  brochureUrl?: string;
  code: string;
}

const INITIAL_SCANNED_LEADS: ScannedExhibitionLead[] = [
  {
    id: 'SCAN-01',
    type: 'BOOTH_INFO',
    title: 'Mazagon Dock Shipbuilders - Zero-Emission LNG Tugboats',
    organization: 'Mazagon Dock Shipbuilders Ltd (Booth B-104)',
    contactEmail: 'b2b-procurement@mazagondock.in',
    scannedAt: 'Today, 11:20 AM',
    notes: 'Requested quotation for 4x 70T Bollard Pull Electric-LNG Hybrid Tugboats for Mumbai Harbor.',
    brochureUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=600&q=80',
    code: 'QR-BOOTH-MDL-104'
  },
  {
    id: 'SCAN-02',
    type: 'DELEGATE_VCARD',
    title: 'Capt. Rajesh Varma (Chief Officer & Fleet Director)',
    organization: 'Great Eastern Shipping Co.',
    contactEmail: 'r.varma@ge-shipping.com',
    scannedAt: 'Today, 10:45 AM',
    notes: 'Exchanged contact info during the Autonomous Navigation Keynote.',
    code: 'QR-VCARD-GE-VARMA-99'
  },
  {
    id: 'SCAN-03',
    type: 'SEA_TRIAL_TICKET',
    title: 'Pier 2 Floating Dock Hydrofoil Drone Sea Trial',
    organization: 'OceanNav Robotics (Dock Pier 2)',
    contactEmail: 'trials@oceannav.io',
    scannedAt: 'Yesterday, 04:15 PM',
    notes: 'VIP priority seat reserved on 14:30 PM hydrofoil test vessel run.',
    code: 'QR-TICKET-SEATRIAL-P2-08'
  }
];

interface ExhibitionQrScannerProps {
  triggerToast?: (msg: string, type?: 'success' | 'info' | 'warning' | 'error', title?: string) => void;
}

export const ExhibitionQrScanner: React.FC<ExhibitionQrScannerProps> = ({ triggerToast }) => {
  const [scanMode, setScanMode] = useState<'BOOTH_CHECKIN' | 'VCARD_EXCHANGE' | 'DEMO_TICKET_VERIFY'>('BOOTH_CHECKIN');
  const [isScanning, setIsScanning] = useState(false);
  const [lastScannedResult, setLastScannedResult] = useState<ScannedExhibitionLead | null>(null);
  const [leads, setLeads] = useState<ScannedExhibitionLead[]>(INITIAL_SCANNED_LEADS);
  const [leadSearchQuery, setLeadSearchQuery] = useState('');

  const notify = (msg: string, type: 'success' | 'info' | 'warning' | 'error' = 'info', title?: string) => {
    if (triggerToast) {
      triggerToast(msg, type, title);
    } else {
      console.log(`[${type}] ${title}: ${msg}`);
    }
  };

  const handleSimulateScan = () => {
    setIsScanning(true);
    setLastScannedResult(null);
    hapticEngine.trigger('click');

    setTimeout(() => {
      setIsScanning(false);
      let newLead: ScannedExhibitionLead;

      if (scanMode === 'BOOTH_CHECKIN') {
        newLead = {
          id: `SCAN-${Date.now()}`,
          type: 'BOOTH_INFO',
          title: 'SonarTech Hydrographic 3D Bathymetry Drones',
          organization: 'SonarTech Global (Booth A-42)',
          contactEmail: 'contact@sonartech-marine.com',
          scannedAt: 'Just Now',
          notes: 'Scanned Booth QR Code. Collected 3D Sonar Mapping PDF Spec Sheet.',
          code: `QR-BOOTH-SONAR-${Math.floor(Math.random() * 900 + 100)}`
        };
      } else if (scanMode === 'VCARD_EXCHANGE') {
        newLead = {
          id: `SCAN-${Date.now()}`,
          type: 'DELEGATE_VCARD',
          title: 'Dr. Sarah Lin (Head of Port Automation)',
          organization: 'Singapore Maritime Authority',
          contactEmail: 'sarah.lin@mpa.gov.sg',
          scannedAt: 'Just Now',
          notes: 'Scanned Delegate Badge. Saved to Expo Address Book.',
          code: `QR-VCARD-MPA-LIN-${Math.floor(Math.random() * 900 + 100)}`
        };
      } else {
        newLead = {
          id: `SCAN-${Date.now()}`,
          type: 'SEA_TRIAL_TICKET',
          title: 'Green LNG Tugboat Engine Room Tour Pass',
          organization: 'Wärtsilä India (Floating Pier 1)',
          contactEmail: 'tours@wartsila.com',
          scannedAt: 'Just Now',
          notes: 'Validated Sea Trial Tour Pass. Access Granted to Pier 1 Engine Room.',
          code: `QR-TICKET-WARTSILA-${Math.floor(Math.random() * 900 + 100)}`
        };
      }

      setLastScannedResult(newLead);
      setLeads([newLead, ...leads]);
      hapticEngine.trigger('success');
      notify(`Scanned & Saved: ${newLead.title}`, 'success', 'EXPO QR SCAN SUCCESS');
    }, 1800);
  };

  const filteredLeads = leads.filter(
    (l) =>
      l.title.toLowerCase().includes(leadSearchQuery.toLowerCase()) ||
      l.organization.toLowerCase().includes(leadSearchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 sm:p-8 space-y-6 shadow-2xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <QrCode className="w-6 h-6 text-cyan-400" />
              <h2 className="text-xl font-bold text-white">Exhibition Booth &amp; Delegate QR Scanner</h2>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Scan exhibitor booth QR codes to collect digital brochures, exchange delegate vCard contacts, and verify sea-trial passes.
            </p>
          </div>

          {/* Mode Selector Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'BOOTH_CHECKIN', label: 'Booth Spec Scanner', icon: Building2 },
              { id: 'VCARD_EXCHANGE', label: 'Delegate vCard Exchange', icon: Users },
              { id: 'DEMO_TICKET_VERIFY', label: 'Sea-Trial Pass Verify', icon: Ticket }
            ].map((m) => {
              const Icon = m.icon;
              const isActive = scanMode === m.id;
              return (
                <button
                  key={m.id}
                  onClick={() => {
                    setScanMode(m.id as any);
                    hapticEngine.trigger('click');
                  }}
                  className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center space-x-1.5 ${
                    isActive
                      ? 'bg-cyan-500 text-slate-950 font-black shadow-lg'
                      : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{m.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Live Camera Scanner Viewport */}
        <div className="relative rounded-3xl overflow-hidden border-2 border-slate-800 bg-slate-950 min-h-[340px] sm:min-h-[380px] flex flex-col items-center justify-center p-6 shadow-2xl">
          {/* Scanner Overlay Box */}
          <div className="relative w-64 h-64 sm:w-72 sm:h-72 border-2 border-cyan-400/60 rounded-3xl flex flex-col items-center justify-center p-4 bg-cyan-950/10 backdrop-blur-xs">
            {/* Target Corners */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-cyan-400 rounded-tl-2xl" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-cyan-400 rounded-tr-2xl" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-cyan-400 rounded-bl-2xl" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-cyan-400 rounded-br-2xl" />

            {isScanning ? (
              <div className="space-y-4 text-center">
                <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto" />
                <p className="text-xs font-mono text-cyan-300 animate-pulse font-bold">
                  Decoding Exhibition QR Code...
                </p>
                <div className="w-48 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-bounce mx-auto" />
              </div>
            ) : lastScannedResult ? (
              <div className="text-center space-y-3 p-2">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
                <span className="text-xs font-mono font-bold text-emerald-400 block">QR VERIFIED &amp; COLLECTED</span>
                <p className="text-xs font-bold text-white line-clamp-2">{lastScannedResult.title}</p>
                <p className="text-[10px] font-mono text-slate-400">{lastScannedResult.organization}</p>
              </div>
            ) : (
              <div className="text-center space-y-3">
                <Camera className="w-12 h-12 text-slate-600 mx-auto" />
                <p className="text-xs font-mono text-slate-400 max-w-xs">
                  Point camera reticle at any Expo Booth QR, Delegate Badge, or Ticket
                </p>
              </div>
            )}
          </div>

          {/* Trigger Scan Button */}
          <div className="mt-6 flex items-center space-x-3">
            <button
              onClick={handleSimulateScan}
              disabled={isScanning}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-black text-xs font-mono shadow-xl hover:brightness-110 flex items-center space-x-2 transition-all disabled:opacity-50"
            >
              <Camera className="w-4 h-4" />
              <span>{isScanning ? 'Scanning...' : 'Simulate Camera Scan'}</span>
            </button>
          </div>
        </div>

        {/* Collected Exhibition Leads & Contact Binder */}
        <div className="space-y-4 pt-4 border-t border-slate-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h3 className="text-sm font-bold text-white flex items-center space-x-2">
              <BookMarked className="w-4 h-4 text-amber-400" />
              <span>Collected Expo Digital Leads &amp; vCards ({leads.length})</span>
            </h3>

            <div className="relative w-full sm:w-64">
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
              <input
                type="text"
                value={leadSearchQuery}
                onChange={(e) => setLeadSearchQuery(e.target.value)}
                placeholder="Search leads or booths..."
                className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono text-xs"
              />
            </div>
          </div>

          <div className="space-y-3">
            {filteredLeads.map((lead) => (
              <div
                key={lead.id}
                className="bg-slate-950 p-5 rounded-2xl border border-slate-800 hover:border-slate-700 transition-all space-y-2"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-900 pb-2">
                  <div className="flex items-center space-x-2">
                    <span
                      className={`text-[10px] font-mono font-black px-2.5 py-0.5 rounded-full ${
                        lead.type === 'BOOTH_INFO'
                          ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                          : lead.type === 'DELEGATE_VCARD'
                          ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                          : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      }`}
                    >
                      {lead.type.replace('_', ' ')}
                    </span>
                    <h4 className="text-sm font-bold text-white">{lead.title}</h4>
                  </div>
                  <span className="text-[11px] font-mono text-slate-500">{lead.scannedAt}</span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono">
                  <span className="text-slate-300 font-bold">{lead.organization}</span>
                  <span className="text-cyan-400">{lead.contactEmail}</span>
                </div>

                <p className="text-xs text-slate-400 italic bg-slate-900/50 p-2.5 rounded-xl border border-slate-800/80">
                  &quot;{lead.notes}&quot;
                </p>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-[10px] font-mono text-slate-600">CODE: {lead.code}</span>
                  <button
                    onClick={() => {
                      hapticEngine.trigger('success');
                      notify(`Exported lead ${lead.title} to vCard & CSV binder!`, 'success', 'LEAD EXPORTED');
                    }}
                    className="px-3 py-1 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-mono text-cyan-400 border border-slate-800 flex items-center space-x-1"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Export vCard</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
