import React, { useState } from 'react';
import {
  ShieldCheck,
  CheckSquare,
  AlertTriangle,
  Volume2,
  VolumeX,
  Users,
  Play,
  FileText,
  CheckCircle2,
  Sparkles,
  ClipboardList,
  Flame,
  Award,
  Clock,
  Printer
} from 'lucide-react';

interface CrewMember {
  id: string;
  name: string;
  rank: string;
  department: 'Deck' | 'Engine' | 'Aviation' | 'Catering / Medical';
  signedOff: boolean;
  signedAt?: string;
}

const INITIAL_CREW: CrewMember[] = [
  { id: 'CR-101', name: 'Capt. Ashan Perera', rank: 'Master Mariner', department: 'Deck', signedOff: true, signedAt: '2026-08-02 08:00 UTC' },
  { id: 'CR-102', name: 'Chief Eng. M. A. Rahat', rank: 'Chief Engineer', department: 'Engine', signedOff: true, signedAt: '2026-08-02 08:02 UTC' },
  { id: 'CR-103', name: 'Devinda Silva', rank: 'Chief Officer', department: 'Deck', signedOff: false },
  { id: 'CR-104', name: 'K. G. Babul', rank: 'Second Engineer', department: 'Engine', signedOff: false },
  { id: 'CR-105', name: 'S. K. Naidu', rank: 'Flight Cargo Specialist', department: 'Aviation', signedOff: false },
  { id: 'CR-106', name: 'Dr. T. Fernando', rank: 'Ship Doctor / Medical', department: 'Catering / Medical', signedOff: true, signedAt: '2026-08-02 08:05 UTC' }
];

interface PpeCheckItem {
  id: string;
  name: string;
  category: string;
  required: boolean;
  checked: boolean;
}

const INITIAL_PPE: PpeCheckItem[] = [
  { id: 'p1', name: 'SOLAS Approved Lifejackets (150N / 275N)', category: 'Life Saving', required: true, checked: true },
  { id: 'p2', name: 'Immersion Suits & Thermal Protective Aids (TPA)', category: 'Life Saving', required: true, checked: true },
  { id: 'p3', name: 'Multi-Gas Detector & Calibration Tag', category: 'Enclosed Space', required: true, checked: true },
  { id: 'p4', name: 'Safety Harness with Shock-Absorbing Lanyard', category: 'Height Safety', required: true, checked: false },
  { id: 'p5', name: 'Fire Response Suit & SCBA Air Cylinders', category: 'Firefighting', required: true, checked: true },
  { id: 'p6', name: 'Anti-Static Non-Spark Safety Boots & Gloves', category: 'General Deck', required: true, checked: true }
];

export const SafetyBriefingToolView: React.FC = () => {
  const [operationType, setOperationType] = useState<string>('HEAVY_WEATHER_TRANSIT');
  const [riskSeverity, setRiskSeverity] = useState<number>(3); // 1 - 5
  const [riskLikelihood, setRiskLikelihood] = useState<number>(3); // 1 - 5
  const [crew, setCrew] = useState<CrewMember[]>(INITIAL_CREW);
  const [ppeList, setPpeList] = useState<PpeCheckItem[]>(INITIAL_PPE);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isGeneratingAiScript, setIsGeneratingAiScript] = useState(false);
  const [briefingText, setBriefingText] = useState<string>(
    "ATTENTION ALL CREW: We are entering heavy weather transit across the Bay of Bengal with wave heights expected up to 4.2 meters. All main deck lashings, hatch covers, and container twist-locks must be inspected immediately. Lifejackets and safety harnesses are mandatory on outer decks. Maintain continuous VHF watch on Channel 16."
  );

  // Risk Score Calculation
  const riskScore = riskSeverity * riskLikelihood;
  const getRiskLevel = (score: number) => {
    if (score >= 16) return { label: 'CRITICAL RISK', color: 'bg-rose-500 text-slate-950', border: 'border-rose-500' };
    if (score >= 10) return { label: 'HIGH RISK', color: 'bg-orange-500 text-slate-950', border: 'border-orange-500' };
    if (score >= 5) return { label: 'MEDIUM RISK', color: 'bg-amber-500 text-slate-950', border: 'border-amber-500' };
    return { label: 'LOW RISK', color: 'bg-emerald-500 text-slate-950', border: 'border-emerald-500' };
  };

  const riskInfo = getRiskLevel(riskScore);

  // Toggle PPE Checkbox
  const togglePpeItem = (id: string) => {
    setPpeList((prev) =>
      prev.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item))
    );
  };

  // Toggle Crew Sign-Off
  const toggleCrewSignOff = (id: string) => {
    const timeNow = new Date().toISOString().replace('T', ' ').substring(0, 16) + ' UTC';
    setCrew((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          const newSigned = !c.signedOff;
          return {
            ...c,
            signedOff: newSigned,
            signedAt: newSigned ? timeNow : undefined
          };
        }
        return c;
      })
    );
  };

  // Text-To-Speech PA Broadcast
  const handleToggleSpeech = () => {
    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported on this browser.');
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(briefingText);
      utterance.rate = 0.95;
      utterance.pitch = 1.0;
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  };

  // AI Briefing Re-Synthesizer
  const handleGenerateAiBriefing = () => {
    setIsGeneratingAiScript(true);
    setTimeout(() => {
      let generated = '';
      if (operationType === 'HEAVY_WEATHER_TRANSIT') {
        generated = "SOLAS SAFETY BRIEFING: Severe squalls and 4.5m ocean swells reported along the upcoming shipping corridor. All non-essential deck activity is suspended. Check watertight doors, double-check bilge pumps, and ensure all crew members on duty wear inflatable lifejackets with safety harnesses.";
      } else if (operationType === 'NIGHT_BUNKERING') {
        generated = "MARPOL BUNKERING BRIEFING: Commencing heavy fuel oil bunkering. Ensure scuppers are plugged, SOPEP oil spill kit is deployed at manifold, communication walkie-talkies are tested, and emergency cut-off valves are continuously manned.";
      } else if (operationType === 'ENCLOSED_SPACE_ENTRY') {
        generated = "ISM SAFETY BRIEFING: Enclosed space entry into ballast tank 2. Mandatory atmosphere test required: Oxygen level 20.9%, H2S 0ppm, LEL 0%. Continuous forced ventilation active. Standby man posted with SCBA and resuscitation unit.";
      } else {
        generated = "SOLAS PRE-DEPARTURE BRIEFING: All crew report to muster stations. Test steering gear, emergency generator, and navigation lights. Complete passenger safety demonstration and verify all cargo twist-locks are engaged.";
      }
      setBriefingText(generated);
      setIsGeneratingAiScript(false);
    }, 800);
  };

  const signedCount = crew.filter((c) => c.signedOff).length;
  const compliancePct = Math.round((signedCount / crew.length) * 100);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 p-6 rounded-2xl border border-amber-500/30 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 uppercase">
              SOLAS / ISM / STCW COMPLIANT
            </span>
            <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 uppercase">
              CREW COMPLIANCE: {compliancePct}%
            </span>
          </div>
          <h2 className="text-2xl font-black text-white mt-2 flex items-center space-x-2">
            <ShieldCheck className="w-7 h-7 text-amber-400" />
            <span>Pre-Departure & Operations Safety Briefing Tool</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl font-sans">
            Generate standardized SOLAS safety briefings, evaluate operational risk matrices, verify PPE readiness, and maintain digital crew acknowledgment logs.
          </p>
        </div>

        <div className="flex items-center space-x-3 shrink-0">
          <button
            onClick={handleToggleSpeech}
            className={`px-4 py-2.5 rounded-xl border font-mono text-xs font-bold transition-all flex items-center space-x-2 ${
              isSpeaking
                ? 'bg-rose-500 text-slate-950 border-rose-400 animate-pulse'
                : 'bg-amber-500 hover:bg-amber-400 text-slate-950 border-amber-400'
            }`}
          >
            {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            <span>{isSpeaking ? 'STOP PA BROADCAST' : 'BROADCAST VIA SPEECH SYNTHESIS'}</span>
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Columns: Briefing Generator & Risk Assessment */}
        <div className="lg:col-span-2 space-y-6">
          {/* Operation Selector & Risk Matrix */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-amber-400" />
              <span>Operational Risk Assessment Matrix</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
              <div>
                <label className="text-[10px] text-slate-400 block mb-1">OPERATION TYPE</label>
                <select
                  value={operationType}
                  onChange={(e) => setOperationType(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white font-bold"
                >
                  <option value="HEAVY_WEATHER_TRANSIT">Heavy Weather Transit</option>
                  <option value="NIGHT_BUNKERING">Night Bunkering Fuel Transfer</option>
                  <option value="ENCLOSED_SPACE_ENTRY">Enclosed Space Entry</option>
                  <option value="PRE_DEPARTURE">Pre-Departure Harbor Exit</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] text-slate-400 block mb-1">SEVERITY (1-5)</label>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={riskSeverity}
                  onChange={(e) => setRiskSeverity(parseInt(e.target.value))}
                  className="w-full accent-amber-400"
                />
                <span className="text-slate-300 text-[11px]">Level {riskSeverity} / 5</span>
              </div>

              <div>
                <label className="text-[10px] text-slate-400 block mb-1">LIKELIHOOD (1-5)</label>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={riskLikelihood}
                  onChange={(e) => setRiskLikelihood(parseInt(e.target.value))}
                  className="w-full accent-amber-400"
                />
                <span className="text-slate-300 text-[11px]">Level {riskLikelihood} / 5</span>
              </div>
            </div>

            <div className={`p-3 rounded-xl border font-mono text-xs flex items-center justify-between ${riskInfo.border} bg-slate-950`}>
              <div>
                <span className="text-[10px] text-slate-400 block">RISK INDEX SCORE</span>
                <strong className="text-lg text-white font-black">{riskScore} / 25</strong>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-black uppercase ${riskInfo.color}`}>
                {riskInfo.label}
              </span>
            </div>
          </div>

          {/* AI Generated Briefing Script Box */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-sky-400" />
                <span>SOLAS / ISM Briefing Broadcast Script</span>
              </h3>
              <button
                onClick={handleGenerateAiBriefing}
                disabled={isGeneratingAiScript}
                className="px-3 py-1.5 bg-sky-500 hover:bg-sky-400 text-slate-950 rounded-lg text-xs font-black font-mono transition-all flex items-center space-x-1"
              >
                <Sparkles className={`w-3.5 h-3.5 ${isGeneratingAiScript ? 'animate-spin' : ''}`} />
                <span>RE-SYNTHESIZE SCRIPT</span>
              </button>
            </div>

            <textarea
              rows={4}
              value={briefingText}
              onChange={(e) => setBriefingText(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 font-mono focus:outline-none focus:border-sky-500"
            />
          </div>

          {/* PPE Equipment Checklist */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center space-x-2">
              <CheckSquare className="w-5 h-5 text-emerald-400" />
              <span>Mandatory Safety Gear & PPE Readiness</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
              {ppeList.map((item) => (
                <div
                  key={item.id}
                  onClick={() => togglePpeItem(item.id)}
                  className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center space-x-3 ${
                    item.checked
                      ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
                      : 'bg-slate-950 border-slate-800 text-slate-400'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={item.checked}
                    onChange={() => {}}
                    className="w-4 h-4 accent-emerald-400 rounded cursor-pointer"
                  />
                  <div>
                    <span className="text-[10px] text-slate-500 block uppercase">{item.category}</span>
                    <span className="font-bold text-xs">{item.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Crew Roster Sign-Off */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-base font-bold text-white flex items-center space-x-2">
              <Users className="w-5 h-5 text-teal-400" />
              <span>Crew Attendance & Sign-off Roster</span>
            </h3>
            <span className="text-xs font-mono font-bold text-teal-400 bg-teal-500/10 px-2 py-0.5 rounded border border-teal-500/20">
              {signedCount}/{crew.length}
            </span>
          </div>

          <div className="space-y-3 font-mono text-xs">
            {crew.map((c) => (
              <div
                key={c.id}
                className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between"
              >
                <div>
                  <span className="text-[10px] text-slate-500 block">{c.department} • {c.rank}</span>
                  <h5 className="font-bold text-white text-xs">{c.name}</h5>
                  {c.signedAt && (
                    <span className="text-[9px] text-emerald-400 block mt-0.5">Signed: {c.signedAt}</span>
                  )}
                </div>

                <button
                  onClick={() => toggleCrewSignOff(c.id)}
                  className={`px-3 py-1.5 rounded-lg font-bold text-[10px] transition-all ${
                    c.signedOff
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : 'bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-300'
                  }`}
                >
                  {c.signedOff ? 'ACKNOWLEDGED' : 'SIGN-OFF'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
