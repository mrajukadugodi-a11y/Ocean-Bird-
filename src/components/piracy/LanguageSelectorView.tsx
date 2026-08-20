import React, { useState } from 'react';
import { Languages, Globe, CheckCircle2, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { hapticEngine } from '../../utils/hapticUtils';

export interface LanguageOption {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  primaryRegion: string;
}

const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'EN', name: 'English', nativeName: 'English (Maritime Standard)', flag: '🇬🇧', primaryRegion: 'IMO International / Global' },
  { code: 'DE', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪', primaryRegion: 'Baltic & North Sea Ports' },
  { code: 'DA', name: 'Danish', nativeName: 'Dansk', flag: '🇩🇰', primaryRegion: 'Danish Straits & Great Belt' },
  { code: 'SV', name: 'Swedish', nativeName: 'Svenska', flag: '🇸🇪', primaryRegion: 'Gulf of Bothnia & Bornholm' },
  { code: 'FR', name: 'French', nativeName: 'Français', flag: '🇫🇷', primaryRegion: 'Mediterranean & West Africa' },
  { code: 'AR', name: 'Arabic', nativeName: 'العربية', flag: '🇦🇪', primaryRegion: 'Red Sea, Bab-el-Mandeb & Gulf' }
];

export const LanguageSelectorView: React.FC = () => {
  const [selectedLang, setSelectedLang] = useState<LanguageOption>(SUPPORTED_LANGUAGES[0]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-2xl space-y-4 font-mono text-xs"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="space-y-0.5">
          <h3 className="text-xs font-bold text-white uppercase flex items-center space-x-2">
            <Languages className="w-4 h-4 text-cyan-400" />
            <span>International Maritime Bridge Multi-Language Localization Engine</span>
          </h3>
          <p className="text-[10px] text-slate-400 font-sans">
            Select bridge operating language for standardized IMO SMCP emergency communications and navigation alerts
          </p>
        </div>

        <span className="bg-cyan-950 text-cyan-300 border border-cyan-800 text-[10px] px-2.5 py-1 rounded font-bold flex items-center space-x-1.5">
          <span>{selectedLang.flag}</span>
          <span>{selectedLang.code} ACTIVE</span>
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {SUPPORTED_LANGUAGES.map((lang) => {
          const isSelected = selectedLang.code === lang.code;
          return (
            <div
              key={lang.code}
              onClick={() => {
                setSelectedLang(lang);
                hapticEngine.trigger('click');
              }}
              className={`p-4 rounded-2xl border cursor-pointer transition-all space-y-2 ${
                isSelected
                  ? 'bg-slate-950 border-cyan-400 ring-1 ring-cyan-400'
                  : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex justify-between items-center border-b border-slate-900 pb-2">
                <div className="flex items-center space-x-2">
                  <span className="text-base">{lang.flag}</span>
                  <h4 className="text-xs font-bold text-white">{lang.name}</h4>
                </div>
                {isSelected && <CheckCircle2 className="w-4 h-4 text-cyan-400" />}
              </div>

              <div className="space-y-1">
                <p className="text-[10px] font-bold text-cyan-300">{lang.nativeName}</p>
                <p className="text-[9px] text-slate-400 font-sans">{lang.primaryRegion}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Localized SMCP Alert Standard Sample Box */}
      <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl space-y-2">
        <span className="text-[9px] text-slate-500 font-bold uppercase block">
          IMO SMCP EMERGENCY TRANSLATION PREVIEW ({selectedLang.name}):
        </span>
        <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-sans text-[11px] text-slate-200 leading-relaxed">
          {selectedLang.code === 'DE' && '"Achtung: Unidentifiziertes Schnellboot nähert sich mit 32 Knoten. Bitte Citadel-Sicherheitsraum aufsuchen."'}
          {selectedLang.code === 'DA' && '"Advarsel: Uidentificeret hurtigbåd nærmer sig med 32 knob. Søg straks mod citadeltilflugtssted."'}
          {selectedLang.code === 'SV' && '"Varning: Oidentifierad snabbåt närmar sig med 32 knop. Sök omedelbart skydd i citadellet."'}
          {selectedLang.code === 'FR' && '"Attention : Vedette rapide non identifiée en approche à 32 nœuds. Rejoignez immédiatement le citadelle."'}
          {selectedLang.code === 'AR' && '"تحذير: زوق سريع غير محدد يقترب بسرعة 32 عقدة. توجه فوراً إلى ملجأ السيتادل."'}
          {selectedLang.code === 'EN' && '"Mayday / Security Alert: Unidentified high-speed skiff approaching at 32 knots. Muster in Citadel immediately."'}
        </div>
      </div>
    </motion.div>
  );
};
