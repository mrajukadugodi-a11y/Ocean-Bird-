import React, { useState } from 'react';
import { 
  Printer, Download, FileText, CheckSquare, Sparkles, FileSpreadsheet, 
  FileCode, Layers, Check, Calendar, BarChart2, ShieldCheck, Mail
} from 'lucide-react';

interface ForumDigestGeneratorProps {
  onTriggerToast: (msg: string) => void;
}

export const ForumDigestGenerator: React.FC<ForumDigestGeneratorProps> = ({ onTriggerToast }) => {
  const [digestTitle, setDigestTitle] = useState<string>('UN Ocean Decade Weekly Forum Digest - August 2026');
  const [timeframe, setTimeframe] = useState<'PAST_7_DAYS' | 'PAST_30_DAYS' | 'ALL_TIME'>('PAST_7_DAYS');
  const [minUpvotes, setMinUpvotes] = useState<number>(5);
  const [includeExpertQA, setIncludeExpertQA] = useState<boolean>(true);
  const [includeMarpolBulletins, setIncludeMarpolBulletins] = useState<boolean>(true);
  const [includeImpactMetrics, setIncludeImpactMetrics] = useState<boolean>(true);
  const [digestFormat, setDigestFormat] = useState<'PDF' | 'HTML' | 'MARKDOWN' | 'CSV'>('PDF');

  const handleDownloadDigest = () => {
    const timestamp = new Date().toISOString().split('T')[0];
    const content = `
================================================================================
MARITIME & OCEAN ENVIRONMENT WEEKLY FORUM DIGEST
================================================================================
DIGEST TITLE: ${digestTitle}
TIMEFRAME: ${timeframe.replace(/_/g, ' ')}
MINIMUM UPVOTES THRESHOLD: >${minUpvotes}
GENERATED ON: ${timestamp}
WEB APP IDENTIFIER: 28cb5e93-ce73-40cf-a6b7-5cf2d591ab7f
UN OCEAN DECADE DIGITAL ARCHIVE DIGEST ID: UN-OD-DIGEST-2026-882

--------------------------------------------------------------------------------
1. TOP COMMUNITY DISCUSSIONS
--------------------------------------------------------------------------------
- "Preparing for 2026 MARPOL CII Grade E mandatory audits"
  Posted by Capt. Vikram Sethi • 34 Upvotes • 3 Expert Replies
  Key Takeaway: Hydrodynamic PBCF fins + air carpets yielded +0.35 CII score gain.

- "Verifying Sundarbans Blue Carbon Credits using SAR Satellite Data"
  Posted by Dr. Ananya Sen • 28 Upvotes • 2 Verified Replies
  Key Takeaway: Ocean Dollar smart contracts eliminate offset double-counting.

--------------------------------------------------------------------------------
2. VERIFIED EXPERT Q&A HIGHLIGHTS
--------------------------------------------------------------------------------
${includeExpertQA ? `- Mass Flow Meter (MFM) SFOC Calibration Tolerances: Verified by Lt. Cmdr. Sarah Perera.\n  Requirement: ISO 17025 laboratory accreditation within 12 months.\n\n- Green Ammonia Bunkering Marine pH Impact: Verified by Dr. Aris Thorne.\n  Requirement: Closed-loop catalytic oxidation units mandatory to prevent larval toxicity.` : '- Expert Q&A section excluded.'}

--------------------------------------------------------------------------------
3. MARPOL & CLIMATE POLICY BULLETINS
--------------------------------------------------------------------------------
${includeMarpolBulletins ? '- MEPC 82 Ratifies mandatory Net-Zero Framework for Trans-Pacific carriers.\n- Bay of Bengal Blue Carbon SAR Mapping shows 14% mangrove biomass rise.' : '- Policy bulletins excluded.'}

--------------------------------------------------------------------------------
4. COMMUNITY IMPACT & GAMIFICATION METRICS
--------------------------------------------------------------------------------
${includeImpactMetrics ? '- CO2 Emissions Prevented: 1,420 Metric Tons\n- Ocean Plastics Intercepted: 350 kg PETase verified\n- Active Contributor Streak: 7 Days Active 🔥' : '- Impact metrics excluded.'}

================================================================================
PUBLISHED BY UN OCEAN DECADE DIGITAL ARCHIVE & MARITIME FORUM
================================================================================
    `.trim();

    const element = document.createElement('a');
    let ext = '.pdf';
    let mimeType = 'text/plain;charset=utf-8';

    if (digestFormat === 'HTML') {
      ext = '.html';
      mimeType = 'text/html;charset=utf-8';
    } else if (digestFormat === 'MARKDOWN') {
      ext = '.md';
    } else if (digestFormat === 'CSV') {
      ext = '.csv';
      mimeType = 'text/csv';
    }

    const file = new Blob([content], { type: mimeType });
    element.href = URL.createObjectURL(file);
    element.download = `Maritime_Forum_Digest_${timestamp}${ext}`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

    onTriggerToast(`📑 Forum Digest Generated & Downloaded successfully (${digestFormat})!`);
  };

  return (
    <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-2xl font-mono text-white animate-fadeIn">
      {/* HEADER BAR */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-emerald-500/20 border border-emerald-400/40 rounded-xl">
            <Printer className="w-6 h-6 text-emerald-400 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">EXECUTIVE COMPILATION TOOL</span>
              <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded text-[10px] font-bold">
                AUTOMATED REPORTING
              </span>
            </div>
            <h2 className="text-lg font-black text-white mt-0.5">Weekly &amp; Monthly Forum Digest Generator</h2>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* CONFIGURATION FORM */}
        <div className="space-y-4 font-sans text-xs">
          <div>
            <label className="text-slate-300 font-bold font-mono block mb-1">Digest Document Title</label>
            <input
              type="text"
              value={digestTitle}
              onChange={(e) => setDigestTitle(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 font-mono text-xs text-white focus:outline-none focus:border-emerald-400"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-slate-300 font-bold font-mono block mb-1">Timeframe Range</label>
              <select
                value={timeframe}
                onChange={(e) => setTimeframe(e.target.value as any)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 font-mono text-xs text-white"
              >
                <option value="PAST_7_DAYS">Past 7 Days</option>
                <option value="PAST_30_DAYS">Past 30 Days</option>
                <option value="ALL_TIME">All Time Archive</option>
              </select>
            </div>

            <div>
              <label className="text-slate-300 font-bold font-mono block mb-1">Min Upvotes Threshold</label>
              <select
                value={minUpvotes}
                onChange={(e) => setMinUpvotes(Number(e.target.value))}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 font-mono text-xs text-white"
              >
                <option value={1}>&gt; 1 Upvote</option>
                <option value={5}>&gt; 5 Upvotes (Recommended)</option>
                <option value={10}>&gt; 10 Upvotes (Top Trending)</option>
              </select>
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <label className="text-slate-300 font-bold font-mono block">Include Digest Sections</label>
            <label className="flex items-center space-x-2 bg-slate-900 p-2.5 rounded-xl border border-slate-800 cursor-pointer">
              <input
                type="checkbox"
                checked={includeExpertQA}
                onChange={(e) => setIncludeExpertQA(e.target.checked)}
                className="accent-emerald-500 rounded"
              />
              <span className="text-slate-200">Verified Expert Q&amp;A Highlights</span>
            </label>

            <label className="flex items-center space-x-2 bg-slate-900 p-2.5 rounded-xl border border-slate-800 cursor-pointer">
              <input
                type="checkbox"
                checked={includeMarpolBulletins}
                onChange={(e) => setIncludeMarpolBulletins(e.target.checked)}
                className="accent-emerald-500 rounded"
              />
              <span className="text-slate-200">MARPOL &amp; Climate Policy Bulletins</span>
            </label>

            <label className="flex items-center space-x-2 bg-slate-900 p-2.5 rounded-xl border border-slate-800 cursor-pointer">
              <input
                type="checkbox"
                checked={includeImpactMetrics}
                onChange={(e) => setIncludeImpactMetrics(e.target.checked)}
                className="accent-emerald-500 rounded"
              />
              <span className="text-slate-200">Community Impact &amp; Gamification Leaderboard</span>
            </label>
          </div>

          <div>
            <label className="text-slate-300 font-bold font-mono block mb-1">Export Format</label>
            <div className="grid grid-cols-4 gap-2 font-mono">
              {(['PDF', 'HTML', 'MARKDOWN', 'CSV'] as const).map((fmt) => (
                <button
                  key={fmt}
                  onClick={() => setDigestFormat(fmt)}
                  className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                    digestFormat === fmt
                      ? 'bg-emerald-500 text-slate-950 border-emerald-400 font-black'
                      : 'bg-slate-900 text-slate-400 border-slate-800'
                  }`}
                >
                  {fmt}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleDownloadDigest}
            className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs uppercase rounded-xl transition-all shadow-lg flex items-center justify-center space-x-2 font-mono"
          >
            <Download className="w-4 h-4" />
            <span>GENERATE &amp; DOWNLOAD WEEKLY DIGEST</span>
          </button>
        </div>

        {/* DIGEST DRAFT PREVIEW WINDOW */}
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-3 font-mono text-[11px] text-slate-300 overflow-y-auto max-h-[420px]">
          <div className="text-center text-emerald-400 font-bold border-b border-slate-800 pb-2">
            === WEEKLY DIGEST DRAFT PREVIEW ===
          </div>
          <div><strong>TITLE:</strong> {digestTitle}</div>
          <div><strong>TIMEFRAME:</strong> {timeframe.replace(/_/g, ' ')}</div>
          <div><strong>UPVOTES FILTER:</strong> &gt;{minUpvotes}</div>
          <div className="border-t border-slate-800 pt-2 space-y-1">
            <div>[1] Top Discussions: Included (2 Threads)</div>
            <div>[2] Expert Q&amp;A: {includeExpertQA ? 'INCLUDED (2 Solutions)' : 'EXCLUDED'}</div>
            <div>[3] MARPOL Bulletins: {includeMarpolBulletins ? 'INCLUDED' : 'EXCLUDED'}</div>
            <div>[4] Community Impact: {includeImpactMetrics ? 'INCLUDED (1,420 MT CO2)' : 'EXCLUDED'}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
