import React, { useState } from 'react';
import {
  Award,
  FileCheck,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Download,
  ShieldCheck,
  User,
  QrCode,
  Calendar,
  Building2,
  Ship,
  Sparkles,
  ExternalLink,
  Search,
  Check
} from 'lucide-react';

export interface Certificate {
  id: string;
  seafarerName: string;
  rank: string;
  title: string;
  stcwCode: string;
  issuingAuthority: string;
  flagState: 'Panama' | 'Liberia' | 'Marshall Islands' | 'Singapore' | 'UK MCA';
  issueDate: string;
  expiryDate: string;
  daysRemaining: number;
  status: 'Valid & Verified' | 'Expiring Soon' | 'Expired';
}

export const CrewCertificationTrackerView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFlag, setSelectedFlag] = useState('All');
  const [downloadedId, setDownloadedId] = useState<string | null>(null);

  const CERTIFICATES: Certificate[] = [
    {
      id: 'STCW-99810',
      seafarerName: 'Capt. Alexander Wright',
      rank: 'Master Mariner (Unlimited)',
      title: 'STCW II/2 Master Mariner Certificate of Competency',
      stcwCode: 'STCW 2010 Reg II/2',
      issuingAuthority: 'UK Maritime & Coastguard Agency (MCA)',
      flagState: 'Singapore',
      issueDate: '2022-04-10',
      expiryDate: '2027-04-09',
      daysRemaining: 242,
      status: 'Valid & Verified'
    },
    {
      id: 'STCW-88412',
      seafarerName: 'Elena Rostova',
      rank: 'Chief Engineer',
      title: 'STCW III/2 Chief Engineer 3000kW or More',
      stcwCode: 'STCW 2010 Reg III/2',
      issuingAuthority: 'Panama Maritime Authority (AMP)',
      flagState: 'Panama',
      issueDate: '2021-09-15',
      expiryDate: '2026-09-14',
      daysRemaining: 36,
      status: 'Expiring Soon'
    },
    {
      id: 'STCW-77109',
      seafarerName: 'Marcus Chen',
      rank: 'Chief Officer',
      title: 'Advanced Training for Oil Tanker Cargo Operations',
      stcwCode: 'STCW 2010 Reg V/1-1',
      issuingAuthority: 'Liberian International Ship & Corporate Registry (LISCR)',
      flagState: 'Liberia',
      issueDate: '2023-01-20',
      expiryDate: '2028-01-19',
      daysRemaining: 528,
      status: 'Valid & Verified'
    },
    {
      id: 'STCW-66301',
      seafarerName: 'David K. Osei',
      rank: 'GMDSS Radio Operator',
      title: 'General Operator Certificate (GOC) for GMDSS',
      stcwCode: 'STCW 2010 Reg IV/2',
      issuingAuthority: 'Republic of the Marshall Islands Maritime Administrator',
      flagState: 'Marshall Islands',
      issueDate: '2020-03-01',
      expiryDate: '2025-02-28',
      daysRemaining: -527,
      status: 'Expired'
    }
  ];

  const handleVerify = (cert: Certificate) => {
    setDownloadedId(cert.id);
    setTimeout(() => setDownloadedId(null), 2500);
    alert(`Verified Certificate ${cert.id} with Flag State Registry (${cert.flagState}). STCW 2010 Compliance Verified!`);
  };

  const filtered = CERTIFICATES.filter(c => {
    if (selectedFlag !== 'All' && c.flagState !== selectedFlag) return false;
    if (searchTerm && !c.seafarerName.toLowerCase().includes(searchTerm.toLowerCase()) && !c.title.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-6 text-slate-100 font-sans p-4 sm:p-6 bg-slate-950 min-h-screen">
      {/* HEADER BANNER */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-indigo-500/30 rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <Award className="w-64 h-64 text-indigo-400" />
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center space-x-1.5">
                <Award className="w-3.5 h-3.5 text-indigo-400" />
                <span>IMO STCW 2010 CERTIFICATION MATRIX</span>
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                FLAG STATE VERIFIED
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Seafarer Crew STCW Certification & Endorsement Matrix</h1>
            <p className="text-slate-300 text-xs sm:text-sm max-w-2xl font-mono">
              IMO STCW 2010 Certificate of Competency (CoC) verification, seaman CDC endorsements, flag state endorsements, and automated expiry countdown.
            </p>
          </div>

          <div className="flex items-center space-x-2 font-mono text-xs shrink-0">
            <select
              value={selectedFlag}
              onChange={(e) => setSelectedFlag(e.target.value)}
              className="bg-slate-950 text-white font-bold p-3 rounded-2xl border border-indigo-500/30 focus:outline-none"
            >
              <option value="All">All Flag State Registries</option>
              <option value="Singapore">Singapore Registry</option>
              <option value="Panama">Panama AMP</option>
              <option value="Liberia">Liberia LISCR</option>
              <option value="Marshall Islands">Marshall Islands</option>
            </select>
          </div>
        </div>

        {/* METRICS */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-800 font-mono text-xs">
          <div className="bg-slate-950/80 p-3 rounded-2xl border border-slate-800">
            <span className="text-slate-400 text-[10px] block uppercase">Valid Certificates</span>
            <span className="text-emerald-400 font-black text-lg">1,420 Active</span>
          </div>
          <div className="bg-slate-950/80 p-3 rounded-2xl border border-slate-800">
            <span className="text-slate-400 text-[10px] block uppercase">Expiring in 60 Days</span>
            <span className="text-amber-300 font-black text-lg">18 Seafarers</span>
          </div>
          <div className="bg-slate-950/80 p-3 rounded-2xl border border-slate-800">
            <span className="text-slate-400 text-[10px] block uppercase">STCW Compliance</span>
            <span className="text-sky-300 font-black text-lg">99.8% Audit Clean</span>
          </div>
          <div className="bg-slate-950/80 p-3 rounded-2xl border border-slate-800">
            <span className="text-slate-400 text-[10px] block uppercase">Digital QR Stamps</span>
            <span className="text-purple-300 font-black text-lg">ICAO Verified</span>
          </div>
        </div>
      </div>

      {/* CERTIFICATES LIST */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-xl font-mono text-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <h2 className="text-lg font-bold text-white flex items-center space-x-2">
            <FileCheck className="w-5 h-5 text-indigo-400" />
            <span>Active Seafarer Certificate Registry</span>
          </h2>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search officer name or course..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-950 text-white pl-9 pr-3 py-2.5 rounded-xl border border-slate-800 focus:outline-none focus:border-indigo-400 text-xs"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((cert) => (
            <div key={cert.id} className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-3 hover:border-indigo-500/40 transition-all shadow-md">
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-[10px] font-bold">
                      {cert.flagState}
                    </span>
                    <span className="text-slate-400 text-[10px] font-bold">{cert.stcwCode}</span>
                  </div>
                  <h3 className="text-sm font-bold text-white font-sans">{cert.seafarerName}</h3>
                  <span className="text-emerald-400 text-xs block font-bold">{cert.rank}</span>
                </div>

                <span className={`px-2.5 py-1 rounded text-[10px] font-bold border ${
                  cert.status === 'Valid & Verified' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' :
                  cert.status === 'Expiring Soon' ? 'bg-amber-500/20 text-amber-300 border-amber-500/30' :
                  'bg-rose-500/20 text-rose-300 border-rose-500/30'
                }`}>
                  {cert.status}
                </span>
              </div>

              <p className="text-slate-300 text-xs font-sans">{cert.title}</p>

              <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-[11px]">
                <div className="space-y-0.5">
                  <span className="text-slate-500 block text-[10px]">ISSUING AUTHORITY</span>
                  <span className="text-slate-200 font-bold block truncate max-w-[200px]">{cert.issuingAuthority}</span>
                </div>

                <button
                  onClick={() => handleVerify(cert)}
                  className="px-3 py-1.5 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-slate-950 font-bold text-[11px] transition-all flex items-center space-x-1"
                >
                  {downloadedId === cert.id ? <Check className="w-3.5 h-3.5" /> : <ShieldCheck className="w-3.5 h-3.5" />}
                  <span>{downloadedId === cert.id ? 'VERIFIED' : 'VERIFY QR'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
