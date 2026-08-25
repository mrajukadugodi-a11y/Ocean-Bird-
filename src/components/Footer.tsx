import React, { useState } from 'react';
import { Compass, Globe2, Ship, ShieldCheck, AlertTriangle, Link as LinkIcon, ChevronDown, ChevronUp } from 'lucide-react';

interface FooterProps {
  onOpenDomainLinks?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenDomainLinks }) => {
  const [isDisclaimerExpanded, setIsDisclaimerExpanded] = useState<boolean>(false);

  return (
    <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 text-xs py-8 mt-12 font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-sky-500/20 text-sky-400 rounded-lg">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-white text-sm">Ocean Bird Maritime & Climate Watch</span>
              <p className="text-[11px] text-slate-400">Developed by <strong className="text-cyan-300">Eastman Creation</strong> • 8 Sovereign Nations Regional Telemetry & Shipping Hub</p>
            </div>
          </div>

          <div className="flex items-center space-x-6 text-slate-400">
            <span className="flex items-center space-x-1">
              <Globe2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>8 SAARC Nations</span>
            </span>
            <span className="flex items-center space-x-1">
              <Ship className="w-3.5 h-3.5 text-cyan-400" />
              <span>Live Cruise Schedules</span>
            </span>
            <span className="flex items-center space-x-1">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>Hydro-Met Telemetry</span>
            </span>
          </div>
        </div>

        {/* Educational & Professional Guide Disclaimer Section */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-amber-400 font-bold text-xs uppercase">
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
              <span>OFFICIAL DISCLAIMER & PURPOSE NOTICE</span>
            </div>

            <button
              onClick={() => setIsDisclaimerExpanded(!isDisclaimerExpanded)}
              className="text-[11px] text-cyan-400 hover:underline flex items-center space-x-1 font-bold"
            >
              <span>{isDisclaimerExpanded ? 'HIDE FULL DISCLAIMER' : 'VIEW FULL LEGAL & EDUCATIONAL STATEMENT'}</span>
              {isDisclaimerExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>

          <p className="text-slate-300 text-xs leading-relaxed font-sans">
            <strong>South Asia Climate and Cruise Watch</strong> is developed explicitly for <strong>educational, research, academic, and professional reference guide</strong> purposes. It provides maritime professionals, students, researchers, and cruise passengers with synthesized climate telemetry, port distance metrics, VHF radio channel guides, and regional shipping lane visualization.
          </p>

          {isDisclaimerExpanded && (
            <div className="pt-3 border-t border-slate-800 space-y-3 text-[11px] text-slate-400 leading-relaxed font-sans">
              <div>
                <strong className="text-white block font-mono uppercase mb-1">1. Educational & Professional Reference Scope</strong>
                <p>
                  All data streams including simulated AIS vessel coordinates, weather API overlays, VHF radio frequencies, S-57 ENC chart representations, and COLREG collision avoidance algorithms are designed for educational training, simulator familiarization, and general oceanographic study.
                </p>
              </div>

              <div>
                <strong className="text-white block font-mono uppercase mb-1">2. Primary Navigational Safety Advisory (SOLAS / IMO)</strong>
                <p>
                  This web app/website does NOT replace certified marine paper charts, ECDIS (Electronic Chart Display and Information System) software, official Notice to Mariners (NTM), or official hydrographic office publications. Vessel masters, watchkeeping officers, and ship navigators must rely exclusively on mandatory SOLAS-approved equipment and live Coast Guard broadcasts for real-world high-seas vessel command.
                </p>
              </div>

              <div>
                <strong className="text-white block font-mono uppercase mb-1">3. Data Accuracy & Liability Limitation</strong>
                <p>
                  While hydro-meteorological indicators, port schedules, and commercial shipping corridors are compiled using verified international standards, the creators and operators assume no liability for real-time navigation decisions, voyage deviations, or severe climate event impacts.
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-2">
          <div className="flex items-center space-x-2">
            <p>© {new Date().getFullYear()} Ocean Bird by Eastman Creation. Educational & Professional Maritime Navigation Guide.</p>
            <span className="bg-slate-950 border border-slate-800 text-cyan-400 font-mono text-[10px] px-2 py-0.5 rounded font-bold">
              WEB ID: 28cb5e93-ce73-40cf-a6b7-5cf2d591ab7f
            </span>
          </div>

          <div className="flex items-center space-x-4">
            {onOpenDomainLinks && (
              <button
                onClick={onOpenDomainLinks}
                className="px-2.5 py-1 bg-slate-950 border border-teal-500/40 hover:bg-teal-950/40 text-teal-300 font-mono text-[11px] font-bold rounded-lg flex items-center space-x-1 transition-colors"
              >
                <LinkIcon className="w-3 h-3 text-teal-400" />
                <span>Other Domain Links</span>
              </button>
            )}
            <p>India • Pakistan • Bangladesh • Sri Lanka • Nepal • Bhutan • Maldives • Afghanistan</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

