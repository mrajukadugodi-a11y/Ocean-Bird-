import React, { useState, useEffect } from 'react';
import { Languages, Globe, BookOpen, Check, Sparkles, X, ChevronDown, Volume2 } from 'lucide-react';
import {
  translationEngine,
  SUPPORTED_LANGUAGES,
  SupportedLanguage,
  TermDictionaryItem
} from '../utils/translationEngine';
import { hapticEngine } from '../utils/hapticUtils';

export const AutoTranslationBar: React.FC = () => {
  const [activeLang, setActiveLang] = useState<SupportedLanguage>(translationEngine.getLanguage());
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDictionaryOpen, setIsDictionaryOpen] = useState(false);
  const [terms, setTerms] = useState<TermDictionaryItem[]>(translationEngine.getTerms());

  useEffect(() => {
    const unsubscribe = translationEngine.subscribe((lang) => {
      setActiveLang(lang);
      setTerms(translationEngine.getTerms());
    });
    return unsubscribe;
  }, []);

  const currentLangInfo = SUPPORTED_LANGUAGES.find((l) => l.code === activeLang) || SUPPORTED_LANGUAGES[0];

  const handleSelectLanguage = (langCode: SupportedLanguage) => {
    translationEngine.setLanguage(langCode);
    setIsDropdownOpen(false);
    hapticEngine.trigger('click');
  };

  return (
    <div className="relative font-mono inline-block">
      {/* Top Header Selector Button */}
      <div className="flex items-center space-x-1.5">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="px-3 py-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold flex items-center space-x-2 transition-all shadow-md"
          title="Auto Translate UI & Nautical Terms"
        >
          <span className="text-base leading-none">{currentLangInfo.flag}</span>
          <span className="hidden sm:inline font-mono uppercase text-cyan-300">{currentLangInfo.name}</span>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
        </button>

        <button
          onClick={() => setIsDictionaryOpen(!isDictionaryOpen)}
          className="p-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-cyan-400 border border-slate-700 transition-all"
          title="Nautical Terms Dictionary in selected language"
        >
          <BookOpen className="w-4 h-4" />
        </button>
      </div>

      {/* Dropdown Language Menu */}
      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-2 z-50 animate-fadeIn">
          <div className="p-2 border-b border-slate-800/80 flex items-center justify-between text-[11px] font-bold text-slate-400 uppercase">
            <div className="flex items-center space-x-1.5 text-cyan-400">
              <Languages className="w-3.5 h-3.5" />
              <span>Auto Translate Language</span>
            </div>
            <button onClick={() => setIsDropdownOpen(false)} className="hover:text-white">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="max-h-64 overflow-y-auto space-y-1 p-1 mt-1">
            {SUPPORTED_LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleSelectLanguage(lang.code)}
                className={`w-full p-2 rounded-xl text-left flex items-center justify-between text-xs transition-all ${
                  activeLang === lang.code
                    ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40'
                    : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center space-x-2.5">
                  <span className="text-base">{lang.flag}</span>
                  <div>
                    <span className="block font-bold">{lang.name}</span>
                    <span className="text-[10px] text-slate-400 block">{lang.nativeName}</span>
                  </div>
                </div>

                {activeLang === lang.code && <Check className="w-4 h-4 text-cyan-400" />}
              </button>
            ))}
          </div>

          <div className="p-2 border-t border-slate-800 text-[10px] text-slate-500 flex items-center space-x-1">
            <Sparkles className="w-3 h-3 text-cyan-400" />
            <span>STCW & IMO Standard Vocabulary Transliterated</span>
          </div>
        </div>
      )}

      {/* Dictionary Drawer Modal */}
      {isDictionaryOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl text-white">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2 text-cyan-400">
                <BookOpen className="w-5 h-5" />
                <h3 className="font-extrabold text-sm uppercase">Nautical Terms ({currentLangInfo.name})</h3>
              </div>
              <button
                onClick={() => setIsDictionaryOpen(false)}
                className="p-1 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 max-h-80 overflow-y-auto">
              {terms.map((item, index) => (
                <div key={index} className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-cyan-300">{item.term}</span>
                    <span className="text-[9px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 font-bold border border-slate-700">
                      {item.category}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{item.definition}</p>
                </div>
              ))}
            </div>

            <div className="pt-2 text-center text-[10px] text-slate-500 border-t border-slate-800">
              Language: {currentLangInfo.name} ({currentLangInfo.nativeName})
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
