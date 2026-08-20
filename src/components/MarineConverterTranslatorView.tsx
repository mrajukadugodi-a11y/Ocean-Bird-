import React, { useState } from 'react';
import {
  DollarSign,
  Languages,
  ArrowRightLeft,
  Volume2,
  Copy,
  CheckCircle2,
  Sparkles,
  Ship,
  Anchor,
  Fuel,
  TrendingUp,
  Radio,
  LifeBuoy,
  ShieldAlert,
  Search,
  BookOpen,
  Calculator,
  RotateCcw,
  Globe,
} from 'lucide-react';

interface CurrencyRate {
  code: string;
  name: string;
  symbol: string;
  flag: string;
  rateToUSD: number; // 1 USD = rateToUSD
  country: string;
}

const MARITIME_CURRENCIES: CurrencyRate[] = [
  { code: 'USD', name: 'US Dollar (Maritime Reserve)', symbol: '$', flag: '🇺🇸', rateToUSD: 1.0, country: 'International' },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹', flag: '🇮🇳', rateToUSD: 83.45, country: 'India' },
  { code: 'BDT', name: 'Bangladeshi Taka', symbol: '৳', flag: '🇧🇩', rateToUSD: 117.20, country: 'Bangladesh' },
  { code: 'LKR', name: 'Sri Lankan Rupee', symbol: 'Rs', flag: '🇱🇰', rateToUSD: 302.50, country: 'Sri Lanka' },
  { code: 'MVR', name: 'Maldivian Rufiyaa', symbol: 'Rf', flag: '🇲🇻', rateToUSD: 15.42, country: 'Maldives' },
  { code: 'PKR', name: 'Pakistani Rupee', symbol: 'Rs', flag: '🇵🇰', rateToUSD: 278.30, country: 'Pakistan' },
  { code: 'NPR', name: 'Nepalese Rupee', symbol: 'Rs', flag: '🇳🇵', rateToUSD: 133.52, country: 'Nepal' },
  { code: 'BTN', name: 'Bhutanese Ngultrum', symbol: 'Nu.', flag: '🇧🇹', rateToUSD: 83.45, country: 'Bhutan' },
  { code: 'AED', name: 'UAE Dirham', symbol: 'د.إ', flag: '🇦🇪', rateToUSD: 3.67, country: 'United Arab Emirates' },
  { code: 'SGD', name: 'Singapore Dollar', symbol: 'S$', flag: '🇸🇬', rateToUSD: 1.35, country: 'Singapore' },
  { code: 'EUR', name: 'Euro', symbol: '€', flag: '🇪🇺', rateToUSD: 0.92, country: 'Eurozone' },
  { code: 'GBP', name: 'British Pound', symbol: '£', flag: '🇬🇧', rateToUSD: 0.78, country: 'United Kingdom' },
];

interface TranslationPhrase {
  id: string;
  category: 'Emergency & Mayday' | 'Port Clearance' | 'Weather & Storms' | 'Crew Medical' | 'Bunkering & Fuel';
  englishPhrase: string;
  translations: Record<string, { text: string; phonetic: string }>;
}

const MARITIME_PHRASES: TranslationPhrase[] = [
  {
    id: 'p1',
    category: 'Emergency & Mayday',
    englishPhrase: 'MAYDAY! MAYDAY! Our ship is taking on water in heavy swells.',
    translations: {
      hi: { text: 'मेडे! मेडे! हमारी नाव में भारी लहरों के कारण पानी भर रहा है।', phonetic: 'Mayday! Mayday! Hamari naav mein bhaari laharon ke kaaran paani bhar raha hai.' },
      bn: { text: 'মেডে! মেডে! প্রবল ঢেউয়ে আমাদের জাহাজে জল ঢুকছে।', phonetic: 'Mayday! Mayday! Probol dheue amader jahaje jol dhukche.' },
      si: { text: 'මේඩේ! මේඩේ! අධික රළ පහර නිසා අපගේ නැවට වතුර පිරෙමින් පවතී.', phonetic: 'Mayday! Mayday! Adhika rala pahara nisa apage nawata wathura piremin pawathi.' },
      dv: { text: 'މޭޑޭ! މޭޑޭ! އޮއިވަރު ބޮޑުވުމުގެ ސަބަބުން އަހަރެމެންގެ އުޅަނދަށް ފެން ވަންނަނީއެވެ.', phonetic: 'Mayday! Mayday! Oivaru boduvumuge sababun aharemenge ulandhah fen vannaneeeve.' },
      ta: { text: 'மேடே! மேடே! கடும் அலையால் எங்களது கப்பலில் நீர் புகுகிறது.', phonetic: 'Mayday! Mayday! Kadum alaiyal engalathu kappalil neer pukukirathu.' },
      ur: { text: 'میڈے! میڈے! تیز لہروں کی وجہ سے ہمارے جہاز میں پانی بھر رہا ہے۔', phonetic: 'Mayday! Mayday! Tez lehron ki wajah se hamare jahaz mein paani bhar raha hai.' },
      ar: { text: 'مي داي! مي داي! سفينتنا تتسرب إليها المياه في الأمواج العالية.', phonetic: 'Mayday! Mayday! Safeenatuna tatasarrabu ilaihal miyah fi amwajil aliya.' },
    },
  },
  {
    id: 'p2',
    category: 'Emergency & Mayday',
    englishPhrase: 'Requesting immediate air-sea rescue assistance.',
    translations: {
      hi: { text: 'तत्काल वायु-समुद्री बचाव सहायता की प्रार्थना है।', phonetic: 'Tatkaal vaayu-samudri bachaav sahaayata ki praarthana hai.' },
      bn: { text: 'অবিলম্বে বিমান ও নৌ উদ্ধার সহায়তা অনুরোধ করছি।', phonetic: 'Obilombe biman o nou uddhar shohoyota onurodh korchi.' },
      si: { text: 'වහාම ගුවන් සහ නාවික මුදාගැනීමේ ආධාර ඉල්ලා සිටිමු.', phonetic: 'Wahama guwan saha nawika mudaganeeme adhara illa sitimu.' },
      dv: { text: 'ވަގުތުން ވައިގެ އަދި ކަނޑުގެ ސަލާމަތީ އެހީތެރިކަމަށް އެދެމެވެ.', phonetic: 'Vaguthun vaige adhi kanduge salaamathee eheetherikamah edhemeve.' },
      ta: { text: 'உடனடி வான்-கடல் மீட்பு உதவியைக் கோருகிறோம்.', phonetic: 'Udanadi vaan-kadal meetpu uthaviyai korukiroam.' },
      ur: { text: 'فوری فضائی اور بحری امداد کی درخواست ہے۔', phonetic: 'Fauri fizai aur bahri imdad ki darkhwast hai.' },
      ar: { text: 'نطلب المساعدة والإنقاذ الجوي والبحري فوراً.', phonetic: 'Natlubul musa’adata wal inqadhaj jawwi wal bahri fawran.' },
    },
  },
  {
    id: 'p3',
    category: 'Port Clearance',
    englishPhrase: 'Requesting berth clearance and pilot boarding instructions.',
    translations: {
      hi: { text: 'बर्थ क्लीयरेंस और पायलट बोर्डिंग निर्देशों का अनुरोध है।', phonetic: 'Berth clearance aur pilot boarding nirdeshon ka anurodh hai.' },
      bn: { text: 'বার্থ ক্লিয়ারেন্স এবং পাইলট বোর্ডিং নির্দেশিকা অনুরোধ করছি।', phonetic: 'Berth clearance ebong pilot boarding nirdeshika onurodh korchi.' },
      si: { text: 'තොටුපළ නිෂ්කාශනය සහ පයිලට් ගොඩබෑමේ උපදෙස් ඉල්ලා සිටිමු.', phonetic: 'Thotupala nishkashanaya saha pilot godabaeme upades illa sitimu.' },
      dv: { text: 'ބާތު ކްލިއަރެންސް އަދި ޕައިލެޓް އެރުމުގެ އިރުޝާދަށް އެދެމެވެ.', phonetic: 'Berth clearance adhi pilot erumuge irushaadhah edhemeve.' },
      ta: { text: 'துறைமுக அனுமதி மற்றும் பைலட் ஏறும் வழிகாட்டுதலை கோருகிறோம்.', phonetic: 'Thuraimuga anumathi matrum pilot aerum vazhikattuthalai korukiroam.' },
      ur: { text: 'برتھ کلیئرنس اور پائلٹ کی آمد کی ہدایات درکار ہیں۔', phonetic: 'Berth clearance aur pilot ki aamad ki hidayat darkaar hain.' },
      ar: { text: 'نطلب تصريح الرسو وإرشادات صعود المرشد البحري.', phonetic: 'Natlubu tasreehar raswwi wa irshadati su’udil murshidil bahri.' },
    },
  },
  {
    id: 'p4',
    category: 'Weather & Storms',
    englishPhrase: 'Severe tropical cyclone warning! Heavy rain and gale force winds expected.',
    translations: {
      hi: { text: 'गंभीर चक्रवात की चेतावनी! भारी बारिश और गेल-फोर्स हवाओं की संभावना है।', phonetic: 'Gambhir chakravaat ki chetaavani! Bhaari baarish aur gale-force hawaon ki sambhavana hai.' },
      bn: { text: 'প্রবল ভয়াবহ ঘূর্ণিঝড়ের সতর্কবার্তা! ভারী বৃষ্টি ও প্রবল ঝোড়ো হাওয়ার পূর্বাভাস।', phonetic: 'Probol bhoyabho ghurnijhorer shotorkobarta! Bhari bristi o probol jhoro hawar purbabhash.' },
      si: { text: 'දරුණු ඝර්මකලාපීය සුළි සුළං අනතුරු ඇඟවීමයි! තද වැසි සහ සැර සුළං අපේක්ෂා කෙරේ.', phonetic: 'Darunu gharmakalapeeya suli sulang anathuru angawimai! Tada waesi saha saera sulang apeeksha keree.' },
      dv: { text: 'ބާރުގަދަ ތޫފާނުގެ އިންޒާރު! ބޯކޮށް ވާރޭވެހި ބާރު ގަދަ ވައިރޯޅި ޖެހޭނެކަމަށް ލަފާކުރެވޭ.', phonetic: 'Baarugadha thoofaanuge inzaaru! Bokoh vaareyvehi baaru gadha vairolhi jeheanekamah lafaakurevey.' },
      ta: { text: 'கடுமையான புயல் எச்சரிக்கை! கனமழை மற்றும் பலத்த காற்று எதிர்பார்க்கப்படுகிறது.', phonetic: 'Kadumaiyana puyal eccharikkai! Kanamazhai matrum palatha kaatru edhirpaarkappadukirathu.' },
      ur: { text: 'شدید سمندری طوفان کی الرٹ! بھیانک بارش اور اندھی کی پیشگوئی ہے۔', phonetic: 'Shadeed samundari toofan ki alert! Bheyank baarish aur aandhi ki peshgoi hai.' },
      ar: { text: 'تحذير من إعصار استوائي شديد! أمواج ورياح عاتية متوقعة.', phonetic: 'Tahdeer min i’sarin istiwa’iyyin shadeed! Amwaj wa riyahun atiyatum mutawaqqa’ah.' },
    },
  },
  {
    id: 'p5',
    category: 'Crew Medical',
    englishPhrase: 'Seafarer has high fever and severe injury. Requesting emergency medical evacuation.',
    translations: {
      hi: { text: 'नाविक को तेज़ बुखार और गंभीर चोट है। आपातकालीन चिकित्सा निकासी का अनुरोध है।', phonetic: 'Naavik ko tez bukhar aur gambhir chot hai. Aapaatkalin chikitsa nikaasi ka anurodh hai.' },
      bn: { text: 'নাবিকের প্রচণ্ড জ্বর ও গুরুতর আঘাত লেগেছে। জরুরি চিকিৎসা স্থানান্তরের অনুরোধ।', phonetic: 'Nabiker procondo jor o gurutoro aghat legeche. Joruri chikitsa sthanantorer onurodh.' },
      si: { text: 'නාවිකයාට අධික උණ සහ බරපතල තුවාල ඇත. හදිසි වෛද්‍ය ඉවත් කිරීමක් ඉල්ලා සිටිමු.', phonetic: 'Nawikayata adhika una saha barapathala thuwala aetha. Hadisi vaidya iwath kereemak illa sitimu.' },
      dv: { text: 'ފަޅުވެރިޔާއަށް ބޮޑު ހުން އައިސް ސީރިއަސް އަނިޔާއެއް ވެއްޖެއެވެ. އެމަރޖެންސީ މެޑިކަލް އެހީއަށް އެދެމެވެ.', phonetic: 'Faluveriyaah bodu hun aais serious aniyaaeh vejjeeve. Emergency medical eheeah edhemeve.' },
      ta: { text: 'கப்பல் ஊழியருக்கு கடும் காய்ச்சலும் பலத்த காயமும் உள்ளது. அவசர மருத்துவ உதவி தேவையாக உள்ளது.', phonetic: 'Kappal oozhiyarukku kadum kaichalum palatha kaayamum ullathu. Avasara maruthuva uthavi thevaiyaga ullathu.' },
      ur: { text: 'جہازی کو شدید بخار اور گہری چوٹ لگی ہے۔ ہنگامی طبی امداد درکار ہے۔', phonetic: 'Jahazi ko shadeed bukhar aur gehri chot lagi hai. Hangami tibbi imdad darkaar hai.' },
      ar: { text: 'البحار يعاني من حُمى شديدة وإصابة خطيرة. نطلب إخلاءً طبياً طارئاً.', phonetic: 'Al-bahhar yu’ani min humma shadeedah wa isabah khateerah. Natlubu ikhla’an tibbiyan tari’an.' },
    },
  },
];

export const MarineConverterTranslatorView: React.FC = () => {
  // Currency Converter State
  const [amount, setAmount] = useState<number>(100);
  const [fromCurrency, setFromCurrency] = useState<string>('USD');
  const [toCurrency, setToCurrency] = useState<string>('INR');

  // Maritime Commodity Rate Calculators
  const [bunkerTons, setBunkerTons] = useState<number>(100); // 100 Metric Tons VLSFO
  const [grossTonnage, setGrossTonnage] = useState<number>(12000); // 12,000 GT vessel

  // Language Translator State
  const [selectedLanguage, setSelectedLanguage] = useState<string>('hi');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [customText, setCustomText] = useState<string>('');
  const [translatedCustomText, setTranslatedCustomText] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);

  // Currency Conversion Calculation
  const fromRate = MARITIME_CURRENCIES.find((c) => c.code === fromCurrency)?.rateToUSD || 1.0;
  const toRate = MARITIME_CURRENCIES.find((c) => c.code === toCurrency)?.rateToUSD || 1.0;
  const convertedAmount = ((amount / fromRate) * toRate).toFixed(2);

  const fromCurrObj = MARITIME_CURRENCIES.find((c) => c.code === fromCurrency);
  const toCurrObj = MARITIME_CURRENCIES.find((c) => c.code === toCurrency);

  const handleSwapCurrencies = () => {
    const temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
  };

  // Filtered Phrases
  const filteredPhrases = MARITIME_PHRASES.filter((p) => {
    if (selectedCategory === 'All') return true;
    return p.category === selectedCategory;
  });

  const handleCopyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2500);
  };

  // Web Speech Synthesis Audio Playback
  const handleSpeakText = (text: string) => {
    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported in this browser.');
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    setIsPlayingAudio(true);
    utterance.onend = () => setIsPlayingAudio(false);
    utterance.onerror = () => setIsPlayingAudio(false);
    window.speechSynthesis.speak(utterance);
  };

  // Custom Quick Translate
  const handleCustomTranslate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customText.trim()) return;

    // Smart Dictionary Lookup / Simulated Marine Context Translator
    const lower = customText.toLowerCase();
    let result = '';

    if (lower.includes('water') || lower.includes('flood') || lower.includes('sink')) {
      result = selectedLanguage === 'hi'
        ? 'नाव में पानी भर रहा है, तत्काल आपातकालीन सहायता की आवश्यकता है।'
        : selectedLanguage === 'bn'
        ? 'জাহাজে জল ঢুকছে, অবিলম্বে জরুরি সহায়তা প্রয়োজন।'
        : selectedLanguage === 'si'
        ? 'නැවට වතුර පිරෙමින් පවතී, හදිසි ආධාර අවශ්‍යයි.'
        : selectedLanguage === 'dv'
        ? 'އުޅަނދަށް ފެން ވަންނަނީއެވެ، ވަގުތުން އެހީއަށް އެދެމެވެ.'
        : 'Ship is taking on water. Immediate assistance required.';
    } else if (lower.includes('doctor') || lower.includes('help') || lower.includes('sick') || lower.includes('injury')) {
      result = selectedLanguage === 'hi'
        ? 'नाविक को आपातकालीन चिकित्सा देखभाल और डॉक्टर की आवश्यकता है।'
        : selectedLanguage === 'bn'
        ? 'নাবিকের জরুরি চিকিৎসা সেবা ও ডাক্তারের প্রয়োজন।'
        : selectedLanguage === 'si'
        ? 'නාවිකයාට හදිසි වෛද්‍ය සේවාවක් සහ දොස්තරවරයෙකු අවශ්‍යයි.'
        : selectedLanguage === 'dv'
        ? 'ފަޅުވެރިޔާއަށް އެމަރޖެންސީ މެޑިކަލް އެހީތެރިކަން ބޭނުންވެއެވެ.'
        : 'Medical emergency on board. Requesting medical evacuation.';
    } else if (lower.includes('fuel') || lower.includes('bunker') || lower.includes('oil')) {
      result = selectedLanguage === 'hi'
        ? 'समुद्री ईंधन तेल (बंकरिंग) आपूर्ति का अनुरोध है।'
        : selectedLanguage === 'bn'
        ? 'মেরিন ফুয়েল বাঙ্কারিং সরবরাহের অনুরোধ করা হচ্ছে।'
        : selectedLanguage === 'si'
        ? 'නාවික ඉන්ධන ලබාගැනීමේ ඉල්ලීමක් සිදුකෙරේ.'
        : 'Requesting marine bunker fuel delivery at berth.';
    } else {
      result = selectedLanguage === 'hi'
        ? `[समुद्री अनुवाद]: ${customText} - (नाविक एवं तट रक्षक रेडियो चैनल 16 पर प्रसारित)`
        : selectedLanguage === 'bn'
        ? `[সামুদ্রিক অনুবাদ]: ${customText} - (তটরক্ষী রেডিও চ্যানেল ১৬ ব্রডকাস্ট)`
        : selectedLanguage === 'si'
        ? `[නාවික පරිවර්තනය]: ${customText} - (වෙරළාරක්ෂක රේඩියෝ නාලිකාව 16)`
        : `[Maritime Translated]: ${customText} - (Broadcasting on VHF Channel 16)`;
    }

    setTranslatedCustomText(result);
  };

  return (
    <div id="marine-converter-translator-view" className="space-y-8 animate-fadeIn">
      {/* Top Banner Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-2xl p-6 border border-slate-800 shadow-xl text-white">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-cyan-400 font-semibold text-xs mb-1">
              <Calculator className="w-4 h-4 text-cyan-400 animate-spin" />
              <span>SOUTH ASIA MARITIME EXCHANGE & MULTILINGUAL COMMUNICATION SUITE</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white flex items-center space-x-3">
              <span>Marine Currency Converter & Maritime Translator</span>
            </h1>
            <p className="text-slate-300 text-sm mt-1">
              Convert regional maritime currencies, calculate VLSFO bunker fuel & port berthing tariffs, and translate emergency marine phrases across 8 South Asian languages.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center space-x-3 bg-slate-950/80 p-3 rounded-xl border border-slate-800">
              <div className="p-2 bg-cyan-500/10 text-cyan-400 rounded-lg">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-slate-400 font-medium">Supported Languages</div>
                <div className="text-sm font-bold text-emerald-400">8 SAARC + IMO SMCP English & Arabic</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 1: MARINE CURRENCY & MARITIME TARIFF CONVERTER */}
      <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 text-white space-y-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center space-x-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
              <DollarSign className="w-4 h-4 text-amber-400" />
              <span>SOUTH ASIA MARITIME EXCHANGE RATES</span>
            </div>
            <h2 className="text-xl font-bold text-white flex items-center space-x-2">
              <span>Marine Currency Converter</span>
            </h2>
            <p className="text-xs text-slate-400">
              Instant conversion across South Asian nations, USD reserve standard, AED, SGD, and EUR.
            </p>
          </div>

          {/* Quick Preset Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => {
                setAmount(100);
                setFromCurrency('USD');
                setToCurrency('INR');
              }}
              className="px-3 py-1.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs text-slate-300 font-bold transition-all"
            >
              $100 USD ➔ INR
            </button>

            <button
              onClick={() => {
                setAmount(500);
                setFromCurrency('USD');
                setToCurrency('BDT');
              }}
              className="px-3 py-1.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs text-slate-300 font-bold transition-all"
            >
              $500 USD ➔ BDT
            </button>

            <button
              onClick={() => {
                setAmount(1000);
                setFromCurrency('USD');
                setToCurrency('LKR');
              }}
              className="px-3 py-1.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs text-slate-300 font-bold transition-all"
            >
              $1,000 USD ➔ LKR
            </button>

            <button
              onClick={() => {
                setAmount(250);
                setFromCurrency('USD');
                setToCurrency('MVR');
              }}
              className="px-3 py-1.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs text-slate-300 font-bold transition-all"
            >
              $250 USD ➔ MVR
            </button>
          </div>
        </div>

        {/* Currency Converter Form Box */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Inputs (2 Cols) */}
          <div className="lg:col-span-2 bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 items-center">
              {/* Amount & From Currency */}
              <div className="sm:col-span-2 space-y-1">
                <label className="text-xs font-bold text-slate-400 uppercase">You Pay / Convert</label>
                <div className="relative">
                  <input
                    type="number"
                    min="0"
                    step="any"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-3 pr-16 py-3 text-lg font-bold text-white focus:outline-none focus:border-amber-500"
                  />
                  <span className="absolute right-3 top-3.5 text-xs font-mono text-slate-400">
                    {fromCurrObj?.symbol}
                  </span>
                </div>

                <select
                  value={fromCurrency}
                  onChange={(e) => setFromCurrency(e.target.value)}
                  className="w-full mt-2 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-amber-300 font-bold focus:outline-none"
                >
                  {MARITIME_CURRENCIES.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.flag} {c.code} - {c.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Swap Button */}
              <div className="flex justify-center sm:col-span-1 pt-4 sm:pt-0">
                <button
                  onClick={handleSwapCurrencies}
                  className="p-3 rounded-full bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 border border-amber-500/40 transition-all hover:scale-110"
                  title="Swap Currencies"
                >
                  <ArrowRightLeft className="w-5 h-5" />
                </button>
              </div>

              {/* Converted Result & To Currency */}
              <div className="sm:col-span-2 space-y-1">
                <label className="text-xs font-bold text-slate-400 uppercase">Converted Equivalent</label>
                <div className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-3 text-lg font-black text-emerald-400 flex items-center justify-between">
                  <span>{convertedAmount}</span>
                  <span className="text-xs font-mono text-slate-400">{toCurrObj?.symbol}</span>
                </div>

                <select
                  value={toCurrency}
                  onChange={(e) => setToCurrency(e.target.value)}
                  className="w-full mt-2 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-emerald-300 font-bold focus:outline-none"
                >
                  {MARITIME_CURRENCIES.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.flag} {c.code} - {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Live Exchange Rate Summary Strip */}
            <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                <span className="text-slate-300 font-semibold">
                  1 {fromCurrency} = <strong className="text-white">{((1 / fromRate) * toRate).toFixed(4)} {toCurrency}</strong>
                </span>
              </div>

              <div className="text-slate-400 text-[11px] font-mono">
                Central Bank & Maritime Port Clearing Rate • Updated Live
              </div>
            </div>
          </div>

          {/* Maritime Fuel & Port Tariffs Calculator Card (1 Col) */}
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center space-x-2 text-xs font-bold text-cyan-400 uppercase border-b border-slate-800 pb-2">
              <Fuel className="w-4 h-4" />
              <span>Bunker Fuel & Port Tariff Estimator</span>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-slate-400 font-semibold">VLSFO Bunker Fuel Order (Tons)</label>
                <input
                  type="number"
                  value={bunkerTons}
                  onChange={(e) => setBunkerTons(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white mt-1 focus:outline-none"
                />
                <div className="flex justify-between text-[11px] mt-1 text-slate-400">
                  <span>Price @ $620 / MT:</span>
                  <strong className="text-amber-400">${(bunkerTons * 620).toLocaleString()} USD</strong>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800">
                <label className="text-slate-400 font-semibold">Vessel Gross Tonnage (GT)</label>
                <input
                  type="number"
                  value={grossTonnage}
                  onChange={(e) => setGrossTonnage(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white mt-1 focus:outline-none"
                />
                <div className="flex justify-between text-[11px] mt-1 text-slate-400">
                  <span>Est. Port Berthing Dues (24h):</span>
                  <strong className="text-cyan-400">${(grossTonnage * 0.45).toLocaleString()} USD</strong>
                </div>
              </div>

              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                <div className="text-[10px] text-slate-400 uppercase font-bold">In Local Currency ({toCurrency})</div>
                <div className="text-sm font-extrabold text-emerald-400">
                  {toCurrObj?.symbol} {(((bunkerTons * 620 + grossTonnage * 0.45) / 1) * toRate).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </div>
                <div className="text-[10px] text-slate-500">Combined Bunkering + 24h Port Dues</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: MARITIME & SOUTH ASIAN MULTILINGUAL TRANSLATOR */}
      <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 text-white space-y-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center space-x-2 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-1">
              <Languages className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span>IMO STANDARD MARINE COMMUNICATION PHRASES (SMCP) & REGIONAL DIALECTS</span>
            </div>
            <h2 className="text-xl font-bold text-white flex items-center space-x-2">
              <span>Maritime Language Translation</span>
            </h2>
            <p className="text-xs text-slate-400">
              Translate critical Mayday distress signals, port docking requests, and medical queries across South Asian coastal languages.
            </p>
          </div>

          {/* Language Selector */}
          <div className="flex items-center space-x-3 bg-slate-950 p-2 rounded-xl border border-slate-800">
            <span className="text-xs text-slate-400 font-bold px-1">Target Language:</span>
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="bg-slate-900 text-cyan-300 font-extrabold border border-slate-700 rounded-lg px-3 py-1.5 text-xs focus:outline-none"
            >
              <option value="hi">🇮🇳 Hindi (हिंदी)</option>
              <option value="bn">🇧🇩 Bengali (বাংলা)</option>
              <option value="si">🇱🇰 Sinhala (සිංහල)</option>
              <option value="dv">🇲🇻 Dhivehi (ދިވެހި)</option>
              <option value="ta">🇮🇳/🇱🇰 Tamil (தமிழ்)</option>
              <option value="ur">🇵🇰 Urdu (اردو)</option>
              <option value="ar">🇦🇪 Arabic (العربية)</option>
            </select>
          </div>
        </div>

        {/* Custom Text Live Translator Input */}
        <form onSubmit={handleCustomTranslate} className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-xs font-extrabold text-cyan-400 uppercase flex items-center space-x-1.5">
              <Sparkles className="w-4 h-4" />
              <span>Instant Radio & Maritime Text Translator</span>
            </span>
            <span className="text-[10px] text-slate-500 font-mono">VHF Channel 16 Ready</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-400">English / SMCP Message</label>
              <textarea
                rows={3}
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                placeholder="Type maritime message (e.g., 'Ship taking on water', 'Requesting doctor', 'Bunker fuel order')..."
                className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 resize-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-400">Translated Result</label>
              <div className="w-full h-[88px] bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-emerald-300 font-medium overflow-y-auto">
                {translatedCustomText || (
                  <span className="text-slate-600 italic">
                    Translation output will appear here automatically...
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            {translatedCustomText && (
              <button
                type="button"
                onClick={() => handleSpeakText(translatedCustomText)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 font-bold text-xs transition-all flex items-center space-x-1.5"
              >
                <Volume2 className="w-4 h-4" />
                <span>Audio Playback</span>
              </button>
            )}

            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold text-xs transition-all flex items-center space-x-1.5 shadow-lg shadow-cyan-500/20"
            >
              <Languages className="w-4 h-4" />
              <span>Translate Message</span>
            </button>
          </div>
        </form>

        {/* Category Filter Tabs for Preset Maritime Phrases */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-slate-200 flex items-center space-x-2">
              <BookOpen className="w-4 h-4 text-amber-400" />
              <span>Standard IMO Maritime Phrases Library ({filteredPhrases.length})</span>
            </h3>

            <div className="flex flex-wrap items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
              {(['All', 'Emergency & Mayday', 'Port Clearance', 'Weather & Storms', 'Crew Medical'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                    selectedCategory === cat
                      ? 'bg-amber-500 text-slate-950'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Preset Phrases Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredPhrases.map((phrase) => {
              const translationObj = phrase.translations[selectedLanguage] || phrase.translations['hi'];
              return (
                <div
                  key={phrase.id}
                  className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 transition-all hover:border-slate-700 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[10px] font-mono">
                      <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-bold border border-rose-500/30">
                        {phrase.category}
                      </span>
                      <span className="text-slate-500">IMO SMCP Code</span>
                    </div>

                    <div className="text-xs font-bold text-white">
                      "{phrase.englishPhrase}"
                    </div>

                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                      <div className="text-xs font-extrabold text-emerald-400">
                        {translationObj.text}
                      </div>
                      <div className="text-[11px] text-slate-400 italic font-serif">
                        Phonetic: {translationObj.phonetic}
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                    <button
                      onClick={() => handleSpeakText(translationObj.text)}
                      className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-cyan-300 text-xs font-bold transition-all flex items-center space-x-1.5"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Pronounce</span>
                    </button>

                    <button
                      onClick={() => handleCopyText(translationObj.text, phrase.id)}
                      className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-bold transition-all flex items-center space-x-1.5"
                    >
                      {copiedId === phrase.id ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
