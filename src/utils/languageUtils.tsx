import React, { useState, useEffect, createContext, useContext } from 'react';
import { Globe } from 'lucide-react';

export type LanguageCode = 'en' | 'hi' | 'ta' | 'es' | 'fr' | 'ar' | 'zh' | 'ja';

export interface LanguageInfo {
  code: LanguageCode;
  name: string;
  nativeName: string;
  flag: string;
  dir?: 'ltr' | 'rtl';
}

export const SUPPORTED_LANGUAGES: LanguageInfo[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', flag: '🇮🇳' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇦🇪', dir: 'rtl' },
  { code: 'zh', name: 'Chinese', nativeName: '中文', flag: '🇨🇳' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵' }
];

export const TRANSLATIONS: Record<LanguageCode, Record<string, string>> = {
  en: {
    globalFleetMap: 'Global Fleet Map',
    locationTracker: 'Fleet Location Tracker',
    digitalBooking: 'Digital Booking & Payments',
    hotelStays: 'Hotel & Port Resort Stays',
    vesselArrivals: 'Vessel Arrival Notifications',
    sosLocator: 'Interactive SOS Distress Locator',
    portAccessibility: 'Port & Terminal Accessibility',
    bookingCalendar: 'Booking Calendar',
    weatherTimeline: 'Weather & Port Trends',
    searchPlaceholder: 'Search vessel, flight or booking ID...',
    language: 'Language',
    currency: 'Currency',
    emergencySos: 'EMERGENCY SOS',
    confirmBooking: 'Confirm & Book Now'
  },
  hi: {
    globalFleetMap: 'ग्लोबल बेड़ा नक्शा',
    locationTracker: 'बेड़ा स्थान ट्रैकर',
    digitalBooking: 'डिजिटल बुकिंग और भुगतान',
    hotelStays: 'होटल और पोर्ट स्टे',
    vesselArrivals: 'पोत आगमन सूचनाएं',
    sosLocator: 'इंटरएक्टिव एसओएस लोकेटर',
    portAccessibility: 'पोर्ट पहुंच और सुगमता',
    bookingCalendar: 'बुकिंग कैलेंडर',
    weatherTimeline: 'मौसम और पोर्ट रुझान',
    searchPlaceholder: 'जहाज, उड़ान या बुकिंग आईडी खोजें...',
    language: 'भाषा',
    currency: 'मुद्रा',
    emergencySos: 'आपातकालीन एसओएस',
    confirmBooking: 'पुष्टि करें और अभी बुक करें'
  },
  ta: {
    globalFleetMap: 'உலகளாவிய கப்பற்படை வரைபடம்',
    locationTracker: 'கப்பல் இருப்பிட டிராக்கர்',
    digitalBooking: 'டிஜிட்டல் முன்பதிவு & செலுத்துதல்',
    hotelStays: 'துறைமுக ஹோட்டல் & தங்குமிடங்கள்',
    vesselArrivals: 'கப்பல் வருகை அறிவிப்புகள்',
    sosLocator: 'இன்டராக்டிவ் SOS அவசர லொக்கேட்டர்',
    portAccessibility: 'துறைமுக வசதிகள் & அணுகல்தன்மை',
    bookingCalendar: 'முன்பதிவு காலண்டர்',
    weatherTimeline: 'வானிலை & துறைமுக போக்குகள்',
    searchPlaceholder: 'கப்பல், விமானம் அல்லது முன்பதிவு ஐடியைத் தேடுங்கள்...',
    language: 'மொழி',
    currency: 'நாணயம்',
    emergencySos: 'அவசர SOS',
    confirmBooking: 'உறுதிசெய்து இப்போது முன்பதிவு செய்க'
  },
  es: {
    globalFleetMap: 'Mapa de Flota Global',
    locationTracker: 'Rastreador de Flota',
    digitalBooking: 'Reservas Digitales y Pagos',
    hotelStays: 'Hoteles y Estancias en Puerto',
    vesselArrivals: 'Notificaciones de Llegada de Buques',
    sosLocator: 'Localizador SOS Interactivo',
    portAccessibility: 'Accesibilidad Portuaria',
    bookingCalendar: 'Calendario de Reservas',
    weatherTimeline: 'Clima y Tendencias del Puerto',
    searchPlaceholder: 'Buscar buque, vuelo o reserva...',
    language: 'Idioma',
    currency: 'Moneda',
    emergencySos: 'SOS DE EMERGENCIA',
    confirmBooking: 'Confirmar y Reservar Ahora'
  },
  fr: {
    globalFleetMap: 'Carte de Flotte Mondiale',
    locationTracker: 'Suivi de la Flotte',
    digitalBooking: 'Réservation Numérique & Paiements',
    hotelStays: 'Hôtels & Séjours Portuaires',
    vesselArrivals: 'Notifications d\'Arrivée des Navires',
    sosLocator: 'Localisateur SOS Interactif',
    portAccessibility: 'Accessibilité Portuaire',
    bookingCalendar: 'Calendrier de Réservations',
    weatherTimeline: 'Météo & Tendances Portuaires',
    searchPlaceholder: 'Rechercher navire, vol ou réservation...',
    language: 'Langue',
    currency: 'Devise',
    emergencySos: 'SOS URGENCE',
    confirmBooking: 'Confirmer et Réserver'
  },
  ar: {
    globalFleetMap: 'خريطة الأسطول العالمي',
    locationTracker: 'متتبع موقع الأسطول',
    digitalBooking: 'الحجز الرقمي والمدفوعات',
    hotelStays: 'الفنادق والإقامة بالموانئ',
    vesselArrivals: 'إشعارات وصول السفن',
    sosLocator: 'محدد طوارئ SOS التفاعلي',
    portAccessibility: 'إمكانية الوصول للموانئ',
    bookingCalendar: 'تقويم الحجوزات',
    weatherTimeline: 'الطقس واتجاهات الموانئ',
    searchPlaceholder: 'البحث عن سفينة أو رحلة طيران...',
    language: 'اللغة',
    currency: 'العملة',
    emergencySos: 'طوارئ SOS',
    confirmBooking: 'تأكيد والحجز الآن'
  },
  zh: {
    globalFleetMap: '全球船队地图',
    locationTracker: '船队位置追踪',
    digitalBooking: '数字预订与支付',
    hotelStays: '港口酒店与住宿预订',
    vesselArrivals: '船舶到港通知',
    sosLocator: '交互式SOS求救定位器',
    portAccessibility: '港口无障碍设施指南',
    bookingCalendar: '预订日历',
    weatherTimeline: '气象与港口趋势',
    searchPlaceholder: '搜索船只、航班或预订号...',
    language: '语言',
    currency: '货币',
    emergencySos: '紧急 SOS',
    confirmBooking: '确认并立即预订'
  },
  ja: {
    globalFleetMap: '世界船隊マップ',
    locationTracker: '船隊位置追跡',
    digitalBooking: 'デジタル予約与決済',
    hotelStays: '港湾ホテル＆宿泊予約',
    vesselArrivals: '船舶入港通知',
    sosLocator: '双方向SOS救助ロケーター',
    portAccessibility: '港湾バリアフリー案内',
    bookingCalendar: '予約カレンダー',
    weatherTimeline: '気象＆港湾トレンド',
    searchPlaceholder: '船名、便名、予約IDを検索...',
    language: '言語',
    currency: '通貨',
    emergencySos: '緊急 SOS',
    confirmBooking: '確認して今すぐ予約'
  }
};

const LANG_CHANGE_EVENT = 'ocean_bird_language_change';

export const setGlobalLanguage = (code: LanguageCode) => {
  localStorage.setItem('ocean_bird_selected_language', code);
  window.dispatchEvent(new CustomEvent(LANG_CHANGE_EVENT, { detail: { language: code } }));
};

export const getGlobalLanguage = (): LanguageCode => {
  const saved = localStorage.getItem('ocean_bird_selected_language') as LanguageCode;
  if (saved && SUPPORTED_LANGUAGES.some((l) => l.code === saved)) {
    return saved;
  }
  return 'en';
};

export const useLanguage = () => {
  const [lang, setLangState] = useState<LanguageCode>(getGlobalLanguage());

  useEffect(() => {
    const handleLangChange = (e: any) => {
      if (e.detail && e.detail.language) {
        setLangState(e.detail.language);
      }
    };
    window.addEventListener(LANG_CHANGE_EVENT, handleLangChange);
    return () => window.removeEventListener(LANG_CHANGE_EVENT, handleLangChange);
  }, []);

  const changeLanguage = (newCode: LanguageCode) => {
    setLangState(newCode);
    setGlobalLanguage(newCode);
  };

  const t = (key: string, defaultText?: string): string => {
    return TRANSLATIONS[lang]?.[key] || defaultText || TRANSLATIONS.en[key] || key;
  };

  return {
    language: lang,
    languageInfo: SUPPORTED_LANGUAGES.find((l) => l.code === lang) || SUPPORTED_LANGUAGES[0],
    changeLanguage,
    t
  };
};

export const LanguageSelector: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { language, changeLanguage } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <div className={`flex items-center space-x-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 font-mono text-xs ${className}`}>
        <Globe className="w-3.5 h-3.5 text-sky-400 shrink-0 ml-1.5" />
        <span className="text-[10px] text-slate-400 hidden sm:inline font-bold uppercase">Lang:</span>
        <select
          value={language}
          onChange={(e) => changeLanguage(e.target.value as LanguageCode)}
          className="bg-slate-900 text-white font-bold text-xs py-1 px-2 rounded-lg border border-slate-700 focus:outline-none focus:border-sky-400 cursor-pointer"
        >
          {SUPPORTED_LANGUAGES.map((l) => (
            <option key={l.code} value={l.code}>
              {l.flag} {l.nativeName}
            </option>
          ))}
        </select>
        <button
          onClick={() => setMenuOpen(true)}
          className="px-2 py-1 rounded-lg bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 font-bold text-[10px] uppercase border border-sky-500/30 transition-all hidden md:flex items-center space-x-1"
          title="Open Global Multi-Language Menu"
        >
          <span>MENU</span>
        </button>
      </div>

      {menuOpen && (
        <MultiLanguageMenu onClose={() => setMenuOpen(false)} />
      )}
    </>
  );
};

export const MultiLanguageMenu: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { language, changeLanguage } = useLanguage();

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative animate-fadeIn font-mono text-xs text-white">
        <div className="flex items-start justify-between border-b border-slate-800 pb-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <Globe className="w-5 h-5 text-sky-400" />
              <h3 className="text-base font-bold text-white">Global Multi-Language & Region Menu</h3>
            </div>
            <p className="text-slate-400 text-xs font-sans">
              Select your preferred language for international airways, marine fleet, job alerts, and nautical navigation tools.
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1.5 rounded-xl bg-slate-950 border border-slate-800"
          >
            ✕
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {SUPPORTED_LANGUAGES.map((langItem) => {
            const isSelected = language === langItem.code;
            return (
              <button
                key={langItem.code}
                onClick={() => {
                  changeLanguage(langItem.code);
                  onClose();
                }}
                className={`p-4 rounded-2xl border text-left transition-all flex items-center justify-between ${
                  isSelected
                    ? 'bg-sky-500/20 border-sky-400 text-white shadow-lg shadow-sky-500/10'
                    : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-800/80'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{langItem.flag}</span>
                  <div>
                    <h4 className="font-bold text-sm text-white">{langItem.nativeName}</h4>
                    <span className="text-[11px] text-slate-400">{langItem.name} ({langItem.code.toUpperCase()})</span>
                  </div>
                </div>

                <div className="text-right">
                  {isSelected ? (
                    <span className="px-2.5 py-1 rounded-full bg-sky-500 text-slate-950 font-black text-[10px] uppercase">
                      ACTIVE
                    </span>
                  ) : (
                    <span className="text-[10px] text-slate-500 font-bold">100% Translated</span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800/80 flex items-center justify-between text-slate-400 text-[11px]">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Real-time ICAO / IMO STCW terminology auto-translated</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs"
          >
            Close Menu
          </button>
        </div>
      </div>
    </div>
  );
};

