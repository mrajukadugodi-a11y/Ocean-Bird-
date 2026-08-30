import React, { useState } from 'react';
import {
  FileText,
  Mail,
  Send,
  CheckCircle2,
  ShieldCheck,
  Award,
  Zap,
  DollarSign,
  Bell,
  Clock,
  Sparkles,
  Lock,
  ExternalLink,
  RefreshCw,
  Copy,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  Check,
  Settings,
  Server,
  Coins
} from 'lucide-react';
import { hapticEngine } from '../utils/hapticUtils';

export interface DeveloperRevenueWhitepaperViewProps {
  className?: string;
  initialEmail?: string;
}

export interface DeveloperEmailLogItem {
  id: string;
  timestamp: string;
  recipientEmail: string;
  subject: string;
  payoutAmountOd: number;
  txHash: string;
  status: 'SENT_DELIVERED' | 'QUEUED' | 'PENDING';
}

export const DeveloperRevenueWhitepaperView: React.FC<DeveloperRevenueWhitepaperViewProps> = ({
  className = '',
  initialEmail = 'mrajukadugodi@gmail.com'
}) => {
  const [activeSubSection, setActiveSubSection] = useState<'WHITEPAPER' | 'EMAIL_CONFIG' | 'DISPATCH_LOGS'>('WHITEPAPER');

  // Developer Email Notification Settings State
  const [developerEmail, setDeveloperEmail] = useState<string>(initialEmail);
  const [notifyDailyDigest, setNotifyDailyDigest] = useState<boolean>(true);
  const [notifyInstantPayout, setNotifyInstantPayout] = useState<boolean>(true);
  const [notifySecurityAudits, setNotifySecurityAudits] = useState<boolean>(true);
  const [notifyFirebaseSync, setNotifyFirebaseSync] = useState<boolean>(true);
  const [minPayoutThreshold, setMinPayoutThreshold] = useState<number>(100); // $100 OD

  // State for simulated email dispatch log
  const [emailLogs, setEmailLogs] = useState<DeveloperEmailLogItem[]>([
    {
      id: 'EML-2026-0827-01',
      timestamp: '2026-08-27 00:00:15 UTC',
      recipientEmail: initialEmail,
      subject: '[Ocean Dollar DAO] Daily Dev Revenue Share Payout: $1,250.00 OD Credited',
      payoutAmountOd: 1250.00,
      txHash: '0x8f2a99c4b11e92d83017a44f9b88c721b0144dd9',
      status: 'SENT_DELIVERED'
    },
    {
      id: 'EML-2026-0826-01',
      timestamp: '2026-08-26 00:00:12 UTC',
      recipientEmail: initialEmail,
      subject: '[Ocean Dollar DAO] Daily Dev Revenue Share Payout: $1,180.50 OD Credited',
      payoutAmountOd: 1180.50,
      txHash: '0x43b17120aef1c710d9441029bb3310ce09fa8892',
      status: 'SENT_DELIVERED'
    }
  ]);

  const [testSendLoading, setTestSendLoading] = useState<boolean>(false);
  const [testSendSuccessMsg, setTestSendSuccessMsg] = useState<string | null>(null);
  const [previewEmailItem, setPreviewEmailItem] = useState<DeveloperEmailLogItem | null>(emailLogs[0]);
  const [whitepaperAccordionOpen, setWhitepaperAccordionOpen] = useState<Record<string, boolean>>({
    'sec-1': true,
    'sec-2': true,
    'sec-3': true,
    'sec-4': true
  });

  const handleToggleAccordion = (key: string) => {
    setWhitepaperAccordionOpen((prev) => ({ ...prev, [key]: !prev[key] }));
    hapticEngine.trigger('click');
  };

  const handleSendTestEmail = () => {
    if (!developerEmail || !developerEmail.includes('@')) {
      alert('Please enter a valid developer email address.');
      return;
    }

    setTestSendLoading(true);
    hapticEngine.trigger('light');

    setTimeout(() => {
      const generatedAmount = Math.floor(500 + Math.random() * 2000);
      const hexHash = '0x' + Array.from({ length: 40 }, () => Math.floor(Math.random() * 16).toString(16)).join('');

      const newLog: DeveloperEmailLogItem = {
        id: `EML-${Date.now().toString().slice(-6)}`,
        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC',
        recipientEmail: developerEmail,
        subject: `[Ocean Dollar DAO] Developer Revenue Payout Confirmation: +$${generatedAmount.toLocaleString()}.00 OD Credited`,
        payoutAmountOd: generatedAmount,
        txHash: hexHash,
        status: 'SENT_DELIVERED'
      };

      setEmailLogs((prev) => [newLog, ...prev]);
      setPreviewEmailItem(newLog);
      setTestSendLoading(false);
      setTestSendSuccessMsg(`✉️ Test Email Notification dispatched successfully to ${developerEmail}! Check dispatch logs below.`);
      hapticEngine.trigger('success');

      setTimeout(() => setTestSendSuccessMsg(null), 6000);
    }, 1200);
  };

  return (
    <div
      id="developer-revenue-whitepaper-view"
      className={`p-6 sm:p-8 rounded-3xl bg-slate-900 border-2 border-amber-500/50 shadow-2xl space-y-6 text-white font-mono text-xs relative overflow-hidden ${className}`}
    >
      {/* Glow Effects */}
      <div className="absolute -right-20 -top-20 w-80 h-80 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between border-b border-slate-800 pb-5 gap-4 relative z-10">
        <div>
          <span className="bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-black px-3 py-0.5 rounded-full uppercase tracking-wider flex items-center w-fit space-x-1.5 mb-2">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span>DEVELOPER REVENUE SHARING &amp; NOTIFICATION SYSTEM</span>
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-white flex items-center space-x-2">
            <FileText className="w-7 h-7 text-amber-400 shrink-0" />
            <span>Developer Revenue Sharing Whitepaper &amp; Email Informing</span>
          </h3>
          <p className="text-slate-400 text-xs font-sans mt-1">
            Official developer revenue sharing specification whitepaper and automated email notification setup for payout alerts.
          </p>
        </div>

        {/* Sub-Section Tabs */}
        <div className="flex bg-slate-950 p-1.5 rounded-2xl border border-slate-800 shrink-0">
          {(
            [
              { id: 'WHITEPAPER', label: '📄 Whitepaper Document' },
              { id: 'EMAIL_CONFIG', label: '✉️ Email Informing Setup' },
              { id: 'DISPATCH_LOGS', label: '📋 Dispatch Logs' }
            ] as Array<{ id: 'WHITEPAPER' | 'EMAIL_CONFIG' | 'DISPATCH_LOGS'; label: string }>
          ).map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveSubSection(tab.id);
                hapticEngine.trigger('click');
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeSubSection === tab.id
                  ? 'bg-amber-500 text-slate-950 font-black shadow-lg shadow-amber-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* SUB-SECTION 1: DEVELOPER REVENUE SHARING WHITEPAPER */}
      {activeSubSection === 'WHITEPAPER' && (
        <div className="space-y-4 relative z-10">
          {/* Section 1: Executive Summary & 10% Pool */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <button
              onClick={() => handleToggleAccordion('sec-1')}
              className="w-full flex justify-between items-center text-left"
            >
              <h4 className="font-black text-white text-sm uppercase flex items-center space-x-2">
                <Award className="w-4 h-4 text-amber-400" />
                <span>1. Executive Summary &amp; Developer Pool Allocations (10%)</span>
              </h4>
              {whitepaperAccordionOpen['sec-1'] ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
            </button>

            {whitepaperAccordionOpen['sec-1'] && (
              <div className="space-y-3 text-slate-300 font-sans text-xs pt-2 border-t border-slate-900">
                <p className="leading-relaxed">
                  The Ocean Dollar ($OD) DAO Governance Protocol establishes a sustainable, transparent, and sovereign developer revenue-sharing model. Under Proposal <strong>OD-PROP-043</strong>, <strong>10.00% of all global protocol earnings</strong> are allocated directly to the Developer Maintenance Guild to fund continuous software upgrades, security audits, and infrastructure maintenance.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono">
                  <div className="p-3 bg-slate-900 rounded-xl border border-amber-500/30">
                    <span className="text-[10px] text-amber-400 font-bold block">DEVELOPER GUILD POOL</span>
                    <strong className="text-white text-base">10.00% Share</strong>
                    <p className="text-[9px] text-slate-500">Automated Daily Batch Clearance</p>
                  </div>
                  <div className="p-3 bg-slate-900 rounded-xl border border-cyan-500/30">
                    <span className="text-[10px] text-cyan-400 font-bold block">FIREBASE INFRASTRUCTURE</span>
                    <strong className="text-white text-base">10.00% Share</strong>
                    <p className="text-[9px] text-slate-500">Firestore DB &amp; Auth Uptime</p>
                  </div>
                  <div className="p-3 bg-slate-900 rounded-xl border border-purple-500/30">
                    <span className="text-[10px] text-purple-400 font-bold block">TAX STATUS (UNCLOS ART. 87)</span>
                    <strong className="text-emerald-400 text-base">0.00% Sovereign Tax</strong>
                    <p className="text-[9px] text-slate-500">High Seas Maritime Escrow</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Section 2: Revenue Streams Breakdown */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <button
              onClick={() => handleToggleAccordion('sec-2')}
              className="w-full flex justify-between items-center text-left"
            >
              <h4 className="font-black text-white text-sm uppercase flex items-center space-x-2">
                <Zap className="w-4 h-4 text-cyan-400" />
                <span>2. Developer Monetization Royalty Streams</span>
              </h4>
              {whitepaperAccordionOpen['sec-2'] ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
            </button>

            {whitepaperAccordionOpen['sec-2'] && (
              <div className="space-y-3 text-slate-300 font-sans text-xs pt-2 border-t border-slate-900">
                <ul className="space-y-2 font-mono text-[11px]">
                  <li className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white">1.50% Seigniorage Royalty:</strong> Generated automatically on all new $OD currency minting backed by 24K Swiss gold bullion reserves.
                    </div>
                  </li>
                  <li className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white">2.00% Sovereign Lottery Royalty:</strong> Collected from all global Ocean Gaming and Quantum Lottery ticket purchases.
                    </div>
                  </li>
                  <li className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white">0.25% Staking Liquidity Fee:</strong> Earned from locked $OD Gold Vault staking pools and ROI yield disbursements.
                    </div>
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* Section 3: Automated Email Notification & Informing Protocol */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <button
              onClick={() => handleToggleAccordion('sec-3')}
              className="w-full flex justify-between items-center text-left"
            >
              <h4 className="font-black text-white text-sm uppercase flex items-center space-x-2">
                <Mail className="w-4 h-4 text-emerald-400" />
                <span>3. Real-Time Developer Email Informing Specification</span>
              </h4>
              {whitepaperAccordionOpen['sec-3'] ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
            </button>

            {whitepaperAccordionOpen['sec-3'] && (
              <div className="space-y-2 text-slate-300 font-sans text-xs pt-2 border-t border-slate-900">
                <p className="leading-relaxed">
                  To ensure complete financial transparency, the protocol integrates an automated <strong>Developer Email Informing Engine</strong>. Every time a developer payout is executed on-chain (or during the daily 00:00 UTC clearance), an encrypted transaction receipt email is generated and dispatched to the registered developer email address containing:
                </p>
                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-[10px] font-mono text-cyan-300 space-y-1">
                  <p>• Payout Amount ($OD and USD Equivalent)</p>
                  <p>• Smart Contract Transaction Receipt Hash (0x...)</p>
                  <p>• Firebase Infrastructure Health Certificate</p>
                  <p>• UNCLOS Zero-Tax Compliance Statement</p>
                </div>
              </div>
            )}
          </div>

          {/* Section 4: Developer Benefits from Staking Performance */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <button
              onClick={() => handleToggleAccordion('sec-4')}
              className="w-full flex justify-between items-center text-left"
            >
              <h4 className="font-black text-white text-sm uppercase flex items-center space-x-2">
                <Coins className="w-4 h-4 text-amber-400" />
                <span>4. Direct Developer Benefits from Staking Performance</span>
              </h4>
              {whitepaperAccordionOpen['sec-4'] ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
            </button>

            {whitepaperAccordionOpen['sec-4'] && (
              <div className="space-y-3 text-slate-300 font-sans text-xs pt-2 border-t border-slate-900">
                <p className="leading-relaxed">
                  As public staking volume and pool performance increase across short-term, 90-day, and 365-day 24K Swiss Gold Vaults, developers benefit across 4 major financial &amp; technical vectors:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-mono text-[11px]">
                  <div className="p-3 bg-slate-900 rounded-xl border border-amber-500/30 space-y-1">
                    <strong className="text-amber-300 block">💰 0.25% Staking Performance Liquidity Royalty</strong>
                    <p className="text-slate-400 text-[10px] font-sans">Collected directly from all active staking deposits &amp; yield disbursements to fund continuous developer code maintenance.</p>
                  </div>

                  <div className="p-3 bg-slate-900 rounded-xl border border-cyan-500/30 space-y-1">
                    <strong className="text-cyan-300 block">📈 10.00% Developer Guild Revenue Share</strong>
                    <p className="text-slate-400 text-[10px] font-sans">10% of total protocol yields (crane tariffs, demurrage fees, seigniorage) automatically stream into developer payouts.</p>
                  </div>

                  <div className="p-3 bg-slate-900 rounded-xl border border-purple-500/30 space-y-1">
                    <strong className="text-purple-300 block">⚡ 10.00% Firebase &amp; Cloud Infra Coverage</strong>
                    <p className="text-slate-400 text-[10px] font-sans">Staking fees automatically cover backend cloud nodes, Firestore DB, and API proxy servers for 99.99% uptime.</p>
                  </div>

                  <div className="p-3 bg-slate-900 rounded-xl border border-emerald-500/30 space-y-1">
                    <strong className="text-emerald-300 block">📜 1.50% Gold Vault Seigniorage Royalty</strong>
                    <p className="text-slate-400 text-[10px] font-sans">365-Day Gold Vault lockups mint new gold-backed $OD coins, providing developers with a 1.50% seigniorage minting fee.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* SUB-SECTION 2: DEVELOPER EMAIL INFORMING SETUP */}
      {activeSubSection === 'EMAIL_CONFIG' && (
        <div className="space-y-6 relative z-10">
          {/* Test Send Banner Feedback */}
          {testSendSuccessMsg && (
            <div className="p-4 rounded-2xl bg-emerald-950/90 border border-emerald-500 text-emerald-300 font-mono text-xs flex items-center justify-between animate-fade-in">
              <span>{testSendSuccessMsg}</span>
              <button onClick={() => setTestSendSuccessMsg(null)} className="text-emerald-400 hover:text-white font-bold">✕</button>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-5 rounded-2xl bg-slate-950 border border-slate-800">
            {/* Left Column: Email Notification Preferences */}
            <div className="space-y-4">
              <h4 className="font-black text-white text-xs uppercase border-b border-slate-800 pb-2 flex items-center space-x-2">
                <Mail className="w-4 h-4 text-amber-400" />
                <span>Developer Email Notification Settings</span>
              </h4>

              <div className="space-y-1.5">
                <label className="text-[10px] text-slate-400 font-bold uppercase block">Developer Recipient Email Address:</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="email"
                    value={developerEmail}
                    onChange={(e) => setDeveloperEmail(e.target.value)}
                    placeholder="developer@domain.com"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs font-bold text-white focus:outline-none focus:border-amber-400 font-mono"
                  />
                </div>
                <p className="text-[9px] text-slate-500">All payout receipts &amp; dev pool alerts will be emailed to this address.</p>
              </div>

              {/* Notification Toggles */}
              <div className="space-y-3 pt-2">
                <label className="text-[10px] text-slate-400 font-bold uppercase block">Active Email Triggers:</label>

                <div
                  onClick={() => setNotifyDailyDigest(!notifyDailyDigest)}
                  className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between cursor-pointer hover:border-slate-700 transition-all"
                >
                  <div className="space-y-0.5">
                    <span className="font-bold text-white text-xs block">Daily 00:00 UTC Clearance Digest</span>
                    <span className="text-[9px] text-slate-400 font-sans block">Receive daily summary of developer pool share settlements.</span>
                  </div>
                  <div className={`w-10 h-6 rounded-full p-1 transition-colors ${notifyDailyDigest ? 'bg-emerald-500' : 'bg-slate-800'}`}>
                    <div className={`w-4 h-4 rounded-full bg-white transition-transform ${notifyDailyDigest ? 'translate-x-4' : 'translate-x-0'}`} />
                  </div>
                </div>

                <div
                  onClick={() => setNotifyInstantPayout(!notifyInstantPayout)}
                  className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between cursor-pointer hover:border-slate-700 transition-all"
                >
                  <div className="space-y-0.5">
                    <span className="font-bold text-white text-xs block">Instant Payout Receipts</span>
                    <span className="text-[9px] text-slate-400 font-sans block">Immediate email alert whenever a dev royalty payout executes.</span>
                  </div>
                  <div className={`w-10 h-6 rounded-full p-1 transition-colors ${notifyInstantPayout ? 'bg-emerald-500' : 'bg-slate-800'}`}>
                    <div className={`w-4 h-4 rounded-full bg-white transition-transform ${notifyInstantPayout ? 'translate-x-4' : 'translate-x-0'}`} />
                  </div>
                </div>

                <div
                  onClick={() => setNotifySecurityAudits(!notifySecurityAudits)}
                  className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between cursor-pointer hover:border-slate-700 transition-all"
                >
                  <div className="space-y-0.5">
                    <span className="font-bold text-white text-xs block">Security &amp; Audit Notifications</span>
                    <span className="text-[9px] text-slate-400 font-sans block">Receive alerts on smart contract multisig audits &amp; status updates.</span>
                  </div>
                  <div className={`w-10 h-6 rounded-full p-1 transition-colors ${notifySecurityAudits ? 'bg-emerald-500' : 'bg-slate-800'}`}>
                    <div className={`w-4 h-4 rounded-full bg-white transition-transform ${notifySecurityAudits ? 'translate-x-4' : 'translate-x-0'}`} />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Test Email Dispatch Trigger */}
            <div className="space-y-4">
              <h4 className="font-black text-white text-xs uppercase border-b border-slate-800 pb-2 flex items-center space-x-2">
                <Send className="w-4 h-4 text-cyan-400" />
                <span>Test Email Notification Dispatcher</span>
              </h4>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
                <div className="flex items-center space-x-2 text-amber-300 text-xs font-bold">
                  <Server className="w-4 h-4 text-amber-400" />
                  <span>Email Dispatcher Service: Resend / Firebase Cloud Relay</span>
                </div>
                <p className="text-[11px] text-slate-400 font-sans">
                  Click below to dispatch a simulated developer payout notification email to <strong>{developerEmail}</strong> and verify HTML layout formatting.
                </p>

                <button
                  onClick={handleSendTestEmail}
                  disabled={testSendLoading}
                  className="w-full py-3 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-black text-xs rounded-xl transition-all shadow-lg flex items-center justify-center space-x-2"
                >
                  {testSendLoading ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Dispatching Email...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Dispatch Test Developer Payout Email</span>
                    </>
                  )}
                </button>
              </div>

              {/* Status Indicator */}
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-[10px] space-y-1">
                <div className="flex justify-between items-center text-slate-300">
                  <span>Firebase DB Synchronization:</span>
                  <strong className="text-emerald-400">ACTIVE &amp; CONNECTED</strong>
                </div>
                <div className="flex justify-between items-center text-slate-300">
                  <span>Developer Email Status:</span>
                  <strong className="text-cyan-300">VERIFIED &amp; LISTENING</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-SECTION 3: DISPATCH LOGS & HTML EMAIL PREVIEW */}
      {activeSubSection === 'DISPATCH_LOGS' && (
        <div className="space-y-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Left Panel: Email Logs Table */}
            <div className="md:col-span-6 p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <h4 className="font-black text-white text-xs uppercase border-b border-slate-800 pb-2 flex items-center justify-between">
                <span>Recent Developer Email Dispatches</span>
                <span className="text-[10px] text-amber-400">{emailLogs.length} Log Entries</span>
              </h4>

              <div className="space-y-2 max-h-80 overflow-y-auto">
                {emailLogs.map((log) => (
                  <div
                    key={log.id}
                    onClick={() => {
                      setPreviewEmailItem(log);
                      hapticEngine.trigger('click');
                    }}
                    className={`p-3 rounded-xl border text-[10px] font-mono cursor-pointer transition-all ${
                      previewEmailItem?.id === log.id
                        ? 'bg-slate-900 border-amber-500 text-white shadow-md'
                        : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-bold text-amber-300">{log.id}</span>
                      <span className="text-[9px] text-emerald-400 font-bold bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/30">
                        {log.status}
                      </span>
                    </div>
                    <p className="font-sans text-xs text-white truncate font-semibold">{log.subject}</p>
                    <div className="flex justify-between items-center text-[9px] text-slate-500 mt-1">
                      <span>To: {log.recipientEmail}</span>
                      <span>{log.timestamp}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Panel: HTML Email Layout Render Preview */}
            <div className="md:col-span-6 p-5 rounded-2xl bg-slate-950 border border-amber-500/40 space-y-3">
              <h4 className="font-black text-white text-xs uppercase border-b border-slate-800 pb-2 flex items-center space-x-2">
                <Mail className="w-4 h-4 text-amber-400" />
                <span>HTML Developer Email Template Preview</span>
              </h4>

              {previewEmailItem ? (
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3 text-slate-200 font-sans text-xs">
                  <div className="border-b border-slate-800 pb-2 space-y-1 font-mono text-[10px]">
                    <div className="flex justify-between text-slate-400">
                      <span>FROM:</span>
                      <strong className="text-white">payouts@oceandollar.dao</strong>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>TO:</span>
                      <strong className="text-amber-300">{previewEmailItem.recipientEmail}</strong>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>SUBJECT:</span>
                      <strong className="text-white">{previewEmailItem.subject}</strong>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="space-y-2 py-2">
                    <p className="font-bold text-white">Hello Developer,</p>
                    <p className="text-slate-300">
                      Your automated Ocean Dollar ($OD) developer revenue share payout has been executed and deposited into your registered vault.
                    </p>
                    <div className="p-3 bg-slate-950 rounded-xl border border-amber-500/30 font-mono space-y-1 text-[11px]">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Amount Credited:</span>
                        <strong className="text-amber-300">+${previewEmailItem.payoutAmountOd.toLocaleString()} $OD</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Sovereign Tax Withheld:</span>
                        <strong className="text-emerald-400">$0.00 (0.00% UNCLOS)</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">TX Receipt Hash:</span>
                        <span className="text-slate-400 text-[9px] truncate max-w-[140px]">{previewEmailItem.txHash}</span>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-slate-800 pt-2 text-[9px] font-mono text-slate-500 text-center">
                    Ocean Dollar DAO Governance Protocol • High Seas Maritime Territory
                  </div>
                </div>
              ) : (
                <div className="p-6 text-center text-slate-500">Select an email log to view template preview.</div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
