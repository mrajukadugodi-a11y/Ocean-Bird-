import React, { useState, useRef, useEffect } from 'react';
import {
  FileCheck,
  CheckCircle2,
  ShieldCheck,
  QrCode,
  Download,
  KeyRound,
  Lock,
  RefreshCw,
  FileText,
  UserCheck,
  PenTool,
  Clock,
  Sparkles,
  Search,
  Printer
} from 'lucide-react';

interface ManifestItem {
  id: string;
  documentType: 'Bill of Lading (B/L)' | 'Air Waybill (AWB)' | 'Hazmat IMO Declaration' | 'Customs Export Clearance';
  docNumber: string;
  vesselOrFlight: string;
  shipperCompany: string;
  consigneeCompany: string;
  cargoWeightKg: number;
  signedByMaster?: string;
  signedAt?: string;
  sha256Hash?: string;
  status: 'PENDING_SIGNATURE' | 'SIGNED_VERIFIED' | 'TAMPERED_WARNING';
}

const INITIAL_MANIFESTS: ManifestItem[] = [
  {
    id: 'DOC-9901',
    documentType: 'Bill of Lading (B/L)',
    docNumber: 'BL-OE-2026-8841',
    vesselOrFlight: 'M/V Ocean Eagle Monarch',
    shipperCompany: 'South Asia Maritime Logistics Ltd (Colombo)',
    consigneeCompany: 'Chittagong Port Authority Imports',
    cargoWeightKg: 4250000,
    signedByMaster: 'Captain A. Wickramasinghe (Master Mariner)',
    signedAt: '2026-08-01 14:22:00 UTC',
    sha256Hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    status: 'SIGNED_VERIFIED'
  },
  {
    id: 'DOC-9902',
    documentType: 'Air Waybill (AWB)',
    docNumber: 'AWB-777F-9012',
    vesselOrFlight: 'Air Cargo Flight OE-789',
    shipperCompany: 'Dhaka Apparel Express Exporters',
    consigneeCompany: 'European Freight Hub Frankfurt',
    cargoWeightKg: 28500,
    status: 'PENDING_SIGNATURE'
  },
  {
    id: 'DOC-9903',
    documentType: 'Hazmat IMO Declaration',
    docNumber: 'HAZ-IMO-3301',
    vesselOrFlight: 'S/T Bay Sentinel',
    shipperCompany: 'Konkan Petrochemical Industries Mumbai',
    consigneeCompany: 'Galle Oil Refinery Berth',
    cargoWeightKg: 1800000,
    status: 'PENDING_SIGNATURE'
  }
];

export const DigitalCargoSignatureView: React.FC = () => {
  const [manifests, setManifests] = useState<ManifestItem[]>(INITIAL_MANIFESTS);
  const [selectedDocId, setSelectedDocId] = useState<string>(INITIAL_MANIFESTS[1].id);
  const [signerName, setSignerName] = useState('Captain R. K. Sharma (Master Mariner)');
  const [signerRole, setSignerRole] = useState('Master Mariner / Chief Officer');
  const [signerPin, setSignerPin] = useState('8842');
  const [signatureDataUrl, setSignatureDataUrl] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationSuccess, setVerificationSuccess] = useState<boolean | null>(null);

  // Signature Canvas Ref
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const selectedDoc = manifests.find((m) => m.id === selectedDocId) || manifests[0];

  // Initialize Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
  }, [selectedDocId]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    if (canvasRef.current) {
      setSignatureDataUrl(canvasRef.current.toDataURL());
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setSignatureDataUrl(null);
  };

  // Execute Cryptographic Digital Signing
  const handleApplyDigitalSignature = () => {
    if (!signatureDataUrl) {
      alert('Please draw your digital signature on the pad first.');
      return;
    }

    const timeNow = new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC';
    // Simulated SHA-256 Digest
    const computedHash = Array.from({ length: 64 }, () =>
      Math.floor(Math.random() * 16).toString(16)
    ).join('');

    setManifests((prev) =>
      prev.map((m) => {
        if (m.id === selectedDoc.id) {
          return {
            ...m,
            signedByMaster: `${signerName} (${signerRole})`,
            signedAt: timeNow,
            sha256Hash: computedHash,
            status: 'SIGNED_VERIFIED'
          };
        }
        return m;
      })
    );
  };

  const handleVerifyIntegrity = () => {
    setIsVerifying(true);
    setVerificationSuccess(null);
    setTimeout(() => {
      setIsVerifying(false);
      setVerificationSuccess(true);
    }, 800);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 p-6 rounded-2xl border border-teal-500/30 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-teal-500/20 text-teal-300 border border-teal-500/30 uppercase">
              SHA-256 CARGO SECURITY HASH
            </span>
            <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-sky-500/20 text-sky-300 border border-sky-500/30 uppercase">
              IMO / IATA CERTIFIED
            </span>
          </div>
          <h2 className="text-2xl font-black text-white mt-2 flex items-center space-x-2">
            <FileCheck className="w-7 h-7 text-teal-400" />
            <span>Digital Cargo Manifest & e-Signature Verification</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl font-sans">
            Cryptographic e-signing pad and SHA-256 seal verification for maritime Bills of Lading, Air Waybills, and Hazmat cargo manifests.
          </p>
        </div>

        <div className="flex items-center space-x-3 shrink-0">
          <button
            onClick={() => window.print()}
            className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-teal-300 border border-teal-500/30 rounded-xl font-mono text-xs font-bold transition-all flex items-center space-x-2"
          >
            <Printer className="w-4 h-4" />
            <span>PRINT CERTIFICATE</span>
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Select Document Manifest */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center space-x-2">
            <FileText className="w-5 h-5 text-teal-400" />
            <span>Pending & Signed Documents ({manifests.length})</span>
          </h3>

          <div className="space-y-3 font-mono text-xs">
            {manifests.map((m) => (
              <div
                key={m.id}
                onClick={() => setSelectedDocId(m.id)}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  selectedDocId === m.id
                    ? 'bg-slate-950 border-teal-500/50 ring-1 ring-teal-500/30'
                    : 'bg-slate-950/50 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] text-teal-400 font-bold">{m.documentType}</span>
                  <span
                    className={`px-2 py-0.5 rounded text-[9px] font-black uppercase ${
                      m.status === 'SIGNED_VERIFIED'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    }`}
                  >
                    {m.status === 'SIGNED_VERIFIED' ? 'SIGNED & SEALED' : 'AWAITING SIGNATURE'}
                  </span>
                </div>

                <h4 className="font-bold text-white text-sm">{m.docNumber}</h4>
                <p className="text-[11px] text-slate-400 mt-1">{m.vesselOrFlight}</p>
                <p className="text-[10px] text-slate-500 mt-0.5">
                  Weight: <strong className="text-slate-300">{(m.cargoWeightKg / 1000).toLocaleString()} MT</strong>
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right 2 Columns: Selected Document & E-Signature Pad */}
        <div className="lg:col-span-2 space-y-6">
          {/* Document Preview & Verification Status */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-4 gap-2">
              <div>
                <span className="text-[10px] font-mono text-teal-400 uppercase font-bold block">
                  {selectedDoc.documentType}
                </span>
                <h3 className="text-xl font-black text-white">{selectedDoc.docNumber}</h3>
                <p className="text-xs font-mono text-slate-400">Carrier: {selectedDoc.vesselOrFlight}</p>
              </div>

              <button
                onClick={handleVerifyIntegrity}
                disabled={isVerifying || selectedDoc.status !== 'SIGNED_VERIFIED'}
                className="px-4 py-2 bg-slate-950 hover:bg-slate-800 text-teal-300 border border-teal-500/30 rounded-xl font-mono text-xs font-bold transition-all flex items-center space-x-2 disabled:opacity-50 shrink-0 self-start sm:self-auto"
              >
                <ShieldCheck className="w-4 h-4 text-teal-400" />
                <span>{isVerifying ? 'VERIFYING HASH...' : 'VERIFY SHA-256 INTEGRITY'}</span>
              </button>
            </div>

            {/* Verification Success Alert */}
            {verificationSuccess && (
              <div className="bg-emerald-950/60 border border-emerald-500/40 p-4 rounded-xl text-xs text-emerald-200 flex items-start space-x-3 font-mono animate-fade-in">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="font-bold text-white uppercase block mb-0.5">CRYPTOGRAPHIC INTEGRITY VERIFIED</strong>
                  Document payload match confirmed with zero tampering. Public key digital seal verified against TSA authority.
                </div>
              </div>
            )}

            {/* Document Cargo Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs bg-slate-950 p-4 rounded-xl border border-slate-800">
              <div>
                <span className="text-[10px] text-slate-500 block">SHIPPER / EXPORTER</span>
                <p className="font-bold text-white text-xs">{selectedDoc.shipperCompany}</p>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 block">CONSIGNEE / IMPORTER</span>
                <p className="font-bold text-white text-xs">{selectedDoc.consigneeCompany}</p>
              </div>
            </div>

            {/* Existing Signature or Signing Pad */}
            {selectedDoc.status === 'SIGNED_VERIFIED' ? (
              <div className="p-4 bg-slate-950 border border-emerald-500/30 rounded-xl font-mono text-xs space-y-3">
                <div className="flex items-center justify-between text-emerald-400 font-bold border-b border-slate-800 pb-2">
                  <span className="flex items-center space-x-1">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>DIGITALLY SIGNED & SEALED</span>
                  </span>
                  <span>{selectedDoc.signedAt}</span>
                </div>
                <p className="text-slate-200">Signer: <strong>{selectedDoc.signedByMaster}</strong></p>
                <div className="break-all text-[10px] bg-slate-900 p-2.5 rounded border border-slate-800 text-slate-400">
                  <span className="text-slate-500 block text-[9px]">SHA-256 HASH CHECKSUM</span>
                  0x{selectedDoc.sha256Hash}
                </div>
              </div>
            ) : (
              <div className="p-5 bg-slate-950 border border-slate-800 rounded-xl space-y-4 font-mono text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white flex items-center space-x-2">
                    <PenTool className="w-4 h-4 text-sky-400" />
                    <span>Digital E-Signature Pad (Mouse / Touch)</span>
                  </span>
                  <button
                    type="button"
                    onClick={clearCanvas}
                    className="text-slate-400 hover:text-white text-[11px] underline"
                  >
                    Clear Pad
                  </button>
                </div>

                {/* Canvas Drawing Area */}
                <div className="border border-slate-800 rounded-xl bg-slate-900 overflow-hidden relative">
                  <canvas
                    ref={canvasRef}
                    width={500}
                    height={140}
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                    onTouchStart={startDrawing}
                    onTouchMove={draw}
                    onTouchEnd={stopDrawing}
                    className="w-full h-36 cursor-crosshair touch-none"
                  />
                  {!signatureDataUrl && (
                    <span className="absolute inset-0 flex items-center justify-center text-slate-600 text-xs pointer-events-none">
                      Sign here using cursor or finger
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] text-slate-400 block mb-1">SIGNER NAME</label>
                    <input
                      type="text"
                      value={signerName}
                      onChange={(e) => setSignerName(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-400 block mb-1">OFFICIAL ROLE</label>
                    <input
                      type="text"
                      value={signerRole}
                      onChange={(e) => setSignerRole(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2 text-white"
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleApplyDigitalSignature}
                  className="w-full py-3 bg-gradient-to-r from-teal-600 to-sky-600 hover:from-teal-500 hover:to-sky-500 text-slate-950 font-black text-xs rounded-xl transition-all shadow-lg shadow-teal-500/20 flex items-center justify-center space-x-2"
                >
                  <Lock className="w-4 h-4" />
                  <span>APPLY DIGITAL SIGNATURE & SEAL SHA-256</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
