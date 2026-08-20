import React, { useState } from 'react';
import { Globe, Languages, CheckCircle2, Volume2, Search, BookOpen, RefreshCw, Flag, Sparkles, Layers, ShieldCheck, ArrowRight } from 'lucide-react';
import { useLanguage, SUPPORTED_LANGUAGES, LanguageCode } from '../utils/languageUtils';

export interface PhraseTranslation {
  id: string;
  category: 'Maritime Navigation' | 'Aviation & Flights' | 'Crew & Emergency' | 'Port Customs' | 'General';
  english: string;
  translated: Record<LanguageCode, string>;
  phonetic?: string;
}

export const MARITIME_DICTIONARY: PhraseTranslation[] = [
  {
    id: 'PHRASE-01',
    category: 'Maritime Navigation',
    english: 'Alter course to starboard immediately to avoid collision.',
    translated: {
      en: 'Alter course to starboard immediately to avoid collision.',
      hi: 'टक्कर से बचने के लिए तुरंत स्टारबोर्ड (दाएं) पाठ्यक्रम बदलें।',
      ta: 'மோதலைத் தவிர்க்க உடனடியாக வலப்பக்கம் திசையை மாற்றவும்.',
      es: 'Caiga a estribor inmediatamente para evitar colisión.',
      fr: 'Modifiez le cap sur tribord immédiatement pour éviter l\'abordage.',
      ar: 'غيّر المسار إلى اليمين فورًا لتجنب التصادم.',
      zh: '立即向右舷改向以避免碰撞。',
      ja: '衝突を回避するため直ちに右舷へ変針せよ。'
    },
    phonetic: 'AL-ter kors too STAR-berd im-MEE-dee-at-lee'
  },
  {
    id: 'PHRASE-02',
    category: 'Crew & Emergency',
    english: 'Mayday Mayday Mayday, vessel taking on water off Mumbai Coast.',
    translated: {
      en: 'Mayday Mayday Mayday, vessel taking on water off Mumbai Coast.',
      hi: 'मेडे मेडे मेडे, मुंबई तट के पास जहाज में पानी भर रहा है।',
      ta: 'மேடே மேடே மேடே, மும்பை கடலோர பகுதியில் கப்பலில் நீர் புகுகிறது.',
      es: 'Mayday Mayday Mayday, buque embarcando agua cerca de la costa de Bombay.',
      fr: 'Mayday Mayday Mayday, navire voie d\'eau au large de Mumbai.',
      ar: 'مي دي مي دي مي دي، السفينة يتسرب إليها الماء قبالة ساحل مومباي.',
      zh: '求救！求救！求救！船只在孟买海岸附近进水。',
      ja: 'メーデー メーデー メーデー、ムンバイ沖で本船浸水性事故発生。'
    },
    phonetic: 'MAY-day MAY-day MAY-day'
  },
  {
    id: 'PHRASE-03',
    category: 'Aviation & Flights',
    english: 'Flight cleared for ILS runway approach 27 Right.',
    translated: {
      en: 'Flight cleared for ILS runway approach 27 Right.',
      hi: 'उड़ान को आईएलएस रनवे दृष्टिकोण 27 राइट के लिए मंजूरी दे दी गई है।',
      ta: 'ரன்வே 27 வலதுபுற அணுகுமுறைக்கு அனுமதி வழங்கப்பட்டது.',
      es: 'Vuelo autorizado para aproximación ILS pista 27 Derecha.',
      fr: 'Vol autorisé pour l\'approche ILS piste 27 Droite.',
      ar: 'تمت الموفقة على اقتراب الهبوط للمدرج 27 يمين.',
      zh: '航班已获准执行27右跑道盲降进近。',
      ja: '27R滑走路へのILSアプローチを許可する。'
    },
    phonetic: 'Flight kleerd for I-L-S run-way'
  },
  {
    id: 'PHRASE-04',
    category: 'Port Customs',
    english: 'Customs declaration and cargo manifest submitted digitally.',
    translated: {
      en: 'Customs declaration and cargo manifest submitted digitally.',
      hi: 'सीमा शुल्क घोषणा और कार्गो मैनिफेस्ट डिजिटल रूप से जमा किया गया।',
      ta: 'சுங்க அறிவிப்பு மற்றும் சரக்கு அறிக்கை டிஜிட்டல் முறையில் சமர்ப்பிக்கப்பட்டது.',
      es: 'Declaración de aduanas y manifiesto de carga presentados digitalmente.',
      fr: 'Déclaration en douane et manifeste de cargaison soumis numériquement.',
      ar: 'تم تقديم الإقرار الجمركي وبيان الشحنة رقميًا.',
      zh: '海关申报单与货物清单已通过数字方式提交。',
      ja: '通関申告書および貨物マニフェストはデジタル提出済み。'
    },
    phonetic: 'KUS-toms dek-la-RAY-shun'
  }
];

export const MultiLanguagePortal: React.FC = () => {
  const { language, languageInfo, changeLanguage, t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [speakingPhraseId, setSpeakingPhraseId] = useState<string | null>(null);

  const filteredPhrases = MARITIME_DICTIONARY.filter((p) => {
    const matchesCategory = selectedCategory === 'ALL' || p.category === selectedCategory;
    const matchesSearch =
      p.english.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.translated[language] && p.translated[language].toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleSpeak = (text: string, phraseId: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language === 'hi' ? 'hi-IN' : language === 'ta' ? 'ta-IN' : language === 'es' ? 'es-ES' : language === 'fr' ? 'fr-FR' : 'en-US';
      setSpeakingPhraseId(phraseId);
      utterance.onend = () => setSpeakingPhraseId(null);
      utterance.onerror = () => setSpeakingPhraseId(null);
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div id="multi-language-portal-view" className="bg-slate-900 border border-slate-800 rounded-3xl p-6 text-white space-y-6 shadow-2xl">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center space-x-2 text-sky-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Globe className="w-4 h-4 text-sky-400 animate-pulse" />
            <span>GLOBAL MULTI-LANGUAGE TRANSLATION ENGINE & DICTIONARY</span>
          </div>
          <h2 className="text-xl font-black text-white flex items-center space-x-2">
            <Languages className="w-6 h-6 text-sky-400" />
            <span>International Multi-Language Portal</span>
          </h2>
          <p className="text-xs text-slate-400">
            Real-time translation across 8 global languages for maritime STCW, ICAO aviation, job alerts, and emergency distress audio synthesis.
          </p>
        </div>

        {/* Selected Language Display */}
        <div className="flex items-center space-x-3 bg-slate-950 p-3 rounded-2xl border border-slate-800 font-mono text-xs">
          <span className="text-3xl">{languageInfo.flag}</span>
          <div>
            <span className="text-[10px] text-slate-400 block font-bold">ACTIVE SYSTEM LANGUAGE</span>
            <strong className="text-sky-400 text-sm">{languageInfo.nativeName} ({languageInfo.name})</strong>
          </div>
        </div>
      </div>

      {/* Language Quick Switch Buttons Grid */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold text-slate-300 font-mono uppercase tracking-wider">
          SELECT SYSTEM DISPLAY LANGUAGE:
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 font-mono text-xs">
          {SUPPORTED_LANGUAGES.map((l) => {
            const isSelected = language === l.code;
            return (
              <button
                key={l.code}
                onClick={() => changeLanguage(l.code)}
                className={`p-3 rounded-2xl border flex flex-col items-center justify-center space-y-1 transition-all ${
                  isSelected
                    ? 'bg-sky-500/20 border-sky-400 text-white shadow-lg shadow-sky-500/10'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                }`}
              >
                <span className="text-xl">{l.flag}</span>
                <span className="font-bold text-[11px] leading-tight text-center">{l.nativeName}</span>
                <span className="text-[9px] text-slate-400 uppercase">{l.code}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Phrasebook & Dictionary Section */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-2">
            <BookOpen className="w-5 h-5 text-sky-400" />
            <h3 className="font-extrabold text-base text-white">IMO / ICAO Technical Multilingual Phrasebook</h3>
          </div>

          {/* Search Input */}
          <div className="relative min-w-[260px]">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search phrase in English or native language..."
              className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-sky-400"
            />
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-2 font-mono text-xs">
          {['ALL', 'Maritime Navigation', 'Aviation & Flights', 'Crew & Emergency', 'Port Customs'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                selectedCategory === cat
                  ? 'bg-sky-500 text-slate-950 shadow-md'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Phrases List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredPhrases.map((phrase) => {
            const translatedText = phrase.translated[language] || phrase.english;
            const isSpeaking = speakingPhraseId === phrase.id;

            return (
              <div key={phrase.id} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                  <span className="text-[10px] text-sky-400 font-bold uppercase">{phrase.category}</span>
                  <span className="text-[10px] text-slate-500">{phrase.id}</span>
                </div>

                <div>
                  <span className="text-[10px] text-slate-400 uppercase block">English Standard:</span>
                  <p className="text-white font-bold text-xs">{phrase.english}</p>
                </div>

                <div className="bg-slate-950 p-3 rounded-xl border border-sky-500/30 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-sky-300 font-bold flex items-center space-x-1">
                      <span>{languageInfo.flag}</span>
                      <span>Translated ({languageInfo.nativeName}):</span>
                    </span>
                    <button
                      onClick={() => handleSpeak(translatedText, phrase.id)}
                      className={`p-1.5 rounded-lg transition-all ${
                        isSpeaking ? 'bg-sky-500 text-slate-950 animate-bounce' : 'bg-slate-900 text-sky-400 hover:bg-slate-800'
                      }`}
                      title="Audio Pronunciation"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-sm font-black text-sky-200">{translatedText}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
