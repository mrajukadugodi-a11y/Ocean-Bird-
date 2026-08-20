// Auto Translation & Maritime Terminology Engine
import { hapticEngine } from './hapticUtils';

export type SupportedLanguage = 'en' | 'es' | 'zh' | 'hi' | 'ar' | 'tl' | 'fr' | 'de' | 'ja' | 'pt' | 'bn';

export interface LanguageInfo {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
  flag: string;
}

export const SUPPORTED_LANGUAGES: LanguageInfo[] = [
  { code: 'en', name: 'English', nativeName: 'English (US/UK)', flag: '🇺🇸' },
  { code: 'es', name: 'Spanish', nativeName: 'Español (Maritime)', flag: '🇪🇸' },
  { code: 'zh', name: 'Mandarin', nativeName: '中文 (海事)', flag: '🇨🇳' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी (नौसेना)', flag: '🇮🇳' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية (البحرية)', flag: '🇸🇦' },
  { code: 'tl', name: 'Tagalog', nativeName: 'Tagalog (Seafarer)', flag: '🇵🇭' },
  { code: 'fr', name: 'French', nativeName: 'Français (Maritime)', flag: '🇫🇷' },
  { code: 'de', name: 'German', nativeName: 'Deutsch (Seefahrt)', flag: '🇩🇪' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語 (海運)', flag: '🇯🇵' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português (Navegação)', flag: '🇧🇷' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা (নৌপরিবহন)', flag: '🇧🇩' }
];

export interface TermDictionaryItem {
  term: string;
  definition: string;
  category: 'SOLAS' | 'AIS' | 'Nautical' | 'Navigation' | 'Safety';
}

export const NAUTICAL_DICTIONARY: Record<SupportedLanguage, TermDictionaryItem[]> = {
  en: [
    { term: 'SOLAS', definition: 'Safety of Life at Sea international maritime treaty convention.', category: 'SOLAS' },
    { term: 'AIS', definition: 'Automatic Identification System tracking ship broadcast position.', category: 'AIS' },
    { term: 'Knot', definition: 'Unit of speed equal to one nautical mile (1.852 km) per hour.', category: 'Nautical' },
    { term: 'Draft', definition: 'Vertical distance between the waterline and bottom of hull (keel).', category: 'Navigation' },
    { term: 'Starboard', definition: 'The right-hand side of a vessel facing forward towards the bow.', category: 'Nautical' },
    { term: 'Port', definition: 'The left-hand side of a vessel facing forward towards the bow.', category: 'Nautical' }
  ],
  es: [
    { term: 'SOLAS', definition: 'Convenio internacional para la seguridad de la vida humana en el mar.', category: 'SOLAS' },
    { term: 'AIS', definition: 'Sistema de Identificación Automática de emisiones de posición de buques.', category: 'AIS' },
    { term: 'Nudo (Knot)', definition: 'Unidad de velocidad equivalente a una milla náutica por hora.', category: 'Nautical' },
    { term: 'Calado (Draft)', definition: 'Distancia vertical entre la línea de flotación y la quilla del buque.', category: 'Navigation' },
    { term: 'Estribor (Starboard)', definition: 'Banda derecha de la embarcación mirando hacia proa.', category: 'Nautical' },
    { term: 'Babor (Port)', definition: 'Banda izquierda de la embarcación mirando hacia proa.', category: 'Nautical' }
  ],
  zh: [
    { term: 'SOLAS', definition: '海上人命安全国际公约 (SOLAS)。', category: 'SOLAS' },
    { term: 'AIS', definition: '船舶自动识别系统，实时广播位置和航速。', category: 'AIS' },
    { term: '节 (Knot)', definition: '航速单位，每小时1海里 (1.852 公里)。', category: 'Nautical' },
    { term: '吃水 (Draft)', definition: '吃水深度，水线到船底基线的垂直距离。', category: 'Navigation' },
    { term: '右舷 (Starboard)', definition: '面向船头时的船舶右侧。', category: 'Nautical' },
    { term: '左舷 (Port)', definition: '面向船头时的船舶左侧。', category: 'Nautical' }
  ],
  hi: [
    { term: 'SOLAS', definition: 'समुद्र में जीवन सुरक्षा अंतर्राष्ट्रीय समुद्री संधि।', category: 'SOLAS' },
    { term: 'AIS', definition: 'ऑटोमैटिक आइडेंटिफिकेशन सिस्टम - जहाज लोकेशन ट्रैकिंग।', category: 'AIS' },
    { term: 'नॉट (Knot)', definition: 'समुद्री गति माप - 1 समुद्री मील (1.852 किमी) प्रति घंटा।', category: 'Nautical' },
    { term: 'ड्राफ्ट (Draft)', definition: 'जलरेखा और जहाज के निचले भाग (कील) के बीच की दूरी।', category: 'Navigation' },
    { term: 'स्टारबोर्ड (Right)', definition: 'जहाज का दाहिना भाग सामने की ओर देखते हुए।', category: 'Nautical' },
    { term: 'पोर्ट (Left)', definition: 'जहाज का बायां भाग सामने की ओर देखते हुए।', category: 'Nautical' }
  ],
  ar: [
    { term: 'SOLAS', definition: 'المعاهدة الدولية لسلامة الأرواح في البحر.', category: 'SOLAS' },
    { term: 'AIS', definition: 'نظام التعرف التلقائي لتتبع موقع سفن الملاحة.', category: 'AIS' },
    { term: 'عقدة (Knot)', definition: 'وحدة قياس السرعة البحرية تساوي ميل بحري واحد في الساعة.', category: 'Nautical' },
    { term: 'غاطس السفينة (Draft)', definition: 'المسافة العمودية بين خط الماء وقاع هيكل السفينة.', category: 'Navigation' },
    { term: 'ميمنة (Starboard)', definition: 'الجانب الأيمن من السفينة بالنسبة للنظر للأمام.', category: 'Nautical' },
    { term: 'ميسرة (Port)', definition: 'الجانب الأيسر من السفينة بالنسبة للنظر للأمام.', category: 'Nautical' }
  ],
  tl: [
    { term: 'SOLAS', definition: 'Kaligtasan ng Buhay sa Dagat na pangkalahatang kasunduan.', category: 'SOLAS' },
    { term: 'AIS', definition: 'Sistemang Awtomatikong Pagkilala sa lokasyon ng barko.', category: 'AIS' },
    { term: 'Knot', definition: 'Sukat ng bilis na katumbas ng isang nautical mile bawat oras.', category: 'Nautical' },
    { term: 'Lalim ng Barko (Draft)', definition: 'Lalim ng ibabang bahagi ng barko sa tubig.', category: 'Navigation' },
    { term: 'Kanan (Starboard)', definition: 'Kanan na bahagi ng barko habang nakatitig sa harap.', category: 'Nautical' },
    { term: 'Kaliwa (Port)', definition: 'Kaliwang bahagi ng barko habang nakatitig sa harap.', category: 'Nautical' }
  ],
  fr: [
    { term: 'SOLAS', definition: 'Convention internationale pour la sauvegarde de la vie humaine en mer.', category: 'SOLAS' },
    { term: 'AIS', definition: 'Système d\'identification automatique pour la position des navires.', category: 'AIS' },
    { term: 'Nœud (Knot)', definition: 'Unité de vitesse correspondant à un mille marin par heure.', category: 'Nautical' },
    { term: 'Tirant d\'eau (Draft)', definition: 'Hauteur de la partie immergée du navire sous la ligne de flottaison.', category: 'Navigation' },
    { term: 'Tribord (Starboard)', definition: 'Côté droit d\'un navire en regardant vers l\'avant.', category: 'Nautical' },
    { term: 'Bâbord (Port)', definition: 'Côté gauche d\'un navire en regardant vers l\'avant.', category: 'Nautical' }
  ],
  de: [
    { term: 'SOLAS', definition: 'Internationales Übereinkommen zum Schutz des menschlichen Lebens auf See.', category: 'SOLAS' },
    { term: 'AIS', definition: 'Automatisches Identifikationssystem für Schiffspositionen.', category: 'AIS' },
    { term: 'Knoten (Knot)', definition: 'Geschwindigkeitseinheit von einer Seemeile pro Stunde.', category: 'Nautical' },
    { term: 'Tiefgang (Draft)', definition: 'Vertikaler Abstand zwischen Wasserlinie und Schiffsbohlensohle.', category: 'Navigation' },
    { term: 'Steuerbord (Starboard)', definition: 'Die in Fahrtrichtung gesehen rechte Seite des Schiffes.', category: 'Nautical' },
    { term: 'Backbord (Port)', definition: 'Die in Fahrtrichtung gesehen linke Seite des Schiffes.', category: 'Nautical' }
  ],
  ja: [
    { term: 'SOLAS', definition: '海上人命安全条約。船舶の安全基準に関する国際条約。', category: 'SOLAS' },
    { term: 'AIS', definition: '船舶自動識別装置。自船の位置情報を送受信。', category: 'AIS' },
    { term: 'ノット (Knot)', definition: '速力の単位。1時間に1海里 (1.852km) 進む速さ。', category: 'Nautical' },
    { term: '喫水 (Draft)', definition: '水面から船底の最下部までの垂直距離。', category: 'Navigation' },
    { term: '右舷 (Starboard)', definition: '船首に向かって右側の船体。', category: 'Nautical' },
    { term: '左舷 (Port)', definition: '船首に向かって左側の船体。', category: 'Nautical' }
  ],
  pt: [
    { term: 'SOLAS', definition: 'Convenção Internacional para a Salvaguarda da Vida Humana no Mar.', category: 'SOLAS' },
    { term: 'AIS', definition: 'Sistema de Identificação Automática de embarcações.', category: 'AIS' },
    { term: 'Nó (Knot)', definition: 'Unidade de velocidade equivalente a uma milha náutica por hora.', category: 'Nautical' },
    { term: 'Calado (Draft)', definition: 'Distância vertical entre a linha de flutuação e a quilha.', category: 'Navigation' },
    { term: 'Estadiordo (Starboard)', definition: 'Lado direito da embarcação olhado de popa para proa.', category: 'Nautical' },
    { term: 'Bombordo (Port)', definition: 'Lado esquerdo da embarcação olhado de popa para proa.', category: 'Nautical' }
  ],
  bn: [
    { term: 'SOLAS', definition: 'সমুদ্রে জীবন নিরাপত্তার আন্তর্জাতিক সামুদ্রিক আইন।', category: 'SOLAS' },
    { term: 'AIS', definition: 'অটোমেটিক আইডেন্টিফিকেশন সিস্টেম - জাহাজের অবস্থান ট্র্যাকিং।', category: 'AIS' },
    { term: 'নট (Knot)', definition: 'সামুদ্রিক গতির একক - ১ নটিক্যাল মাইল প্রতি ঘণ্টা।', category: 'Nautical' },
    { term: 'ড্রাফট (Draft)', definition: 'পানির তলদেশ এবং জাহাজের তলদেশের দূরত্ব।', category: 'Navigation' },
    { term: 'স্টারবোর্ড (Right)', definition: 'জাহাজের ডান দিক।', category: 'Nautical' },
    { term: 'পোর্ট (Left)', definition: 'জাহাজের বাম দিক।', category: 'Nautical' }
  ]
};

// Global UI string dictionary mapping
export const UI_TRANSLATIONS: Record<SupportedLanguage, Record<string, string>> = {
  en: {
    'app_title': 'OCEAN BIRD MARITIME COMMAND',
    'search_placeholder': 'Search vessels, ports, crew...',
    'quick_checkin': 'Quick Check-In Express Terminal',
    'biometric_login': 'Biometric Security Login',
    'global_fleet_chart': 'Global Fleet Analytics & Distribution',
    'emergency_sos': 'Emergency SOS Mayday Trigger',
    'auto_translate': 'Auto Translation Active',
    'status_verified': 'VERIFIED CREDENTIAL',
    'status_pending': 'PENDING APPROVAL'
  },
  es: {
    'app_title': 'COMANDO MARÍTIMO OCEAN BIRD',
    'search_placeholder': 'Buscar buques, puertos, tripulación...',
    'quick_checkin': 'Terminal Exprés de Registro Rápido',
    'biometric_login': 'Acceso de Seguridad Biométrica',
    'global_fleet_chart': 'Análisis y Distribución de Flota Global',
    'emergency_sos': 'Disparador de Emergencia SOS Mayday',
    'auto_translate': 'Traducción Automática Activa',
    'status_verified': 'CREDENCIAL VERIFICADA',
    'status_pending': 'APROBACIÓN PENDIENTE'
  },
  zh: {
    'app_title': 'OCEAN BIRD 海事指挥中心',
    'search_placeholder': '搜索船舶、港口、船员...',
    'quick_checkin': '快速签到特快终端',
    'biometric_login': '生物识别安全登录',
    'global_fleet_chart': '全球船队分析与分布图表',
    'emergency_sos': 'SOS 紧急求救信号发射器',
    'auto_translate': '自动翻译已激活',
    'status_verified': '凭证已验证',
    'status_pending': '等待批准'
  },
  hi: {
    'app_title': 'ओशन बर्ड समुद्री कमांड केंद्र',
    'search_placeholder': 'जहाज, बंदरगाह, चालक दल खोजें...',
    'quick_checkin': 'त्वरित चेक-इन एक्सप्रेस टर्मिनल',
    'biometric_login': 'बायोमेट्रिक सुरक्षा लॉगिन',
    'global_fleet_chart': 'वैश्विक बेड़ा विश्लेषण और वितरण',
    'emergency_sos': 'आपातकालीन एसओएस अलर्ट',
    'auto_translate': 'ऑटो अनुवाद सक्रिय',
    'status_verified': 'सत्यापित प्रमाण पत्र',
    'status_pending': 'स्वीकृति लंबित'
  },
  ar: {
    'app_title': 'قيادة أو Ocean Bird البحرية',
    'search_placeholder': 'البحث عن السفن، الموانئ، الطاقم...',
    'quick_checkin': 'محطة التسجيل السريع',
    'biometric_login': 'تسجيل الدخول بالبصمة البيومترية',
    'global_fleet_chart': 'تحليلات وتوزيع أسطول السفن العالمي',
    'emergency_sos': 'إطلاق نداء الاستغاثة الطارئ SOS',
    'auto_translate': 'الترجمة التلقائية نشطة',
    'status_verified': 'اعتماد موثق',
    'status_pending': 'قيد الموافقة'
  },
  tl: {
    'app_title': 'OCEAN BIRD MARITIME COMMAND',
    'search_placeholder': 'Maghanap ng barko, daungan, tripulante...',
    'quick_checkin': 'Quick Check-In Express Terminal',
    'biometric_login': 'Biometric Security Login',
    'global_fleet_chart': 'Pangkalahatang Pagsusuri ng Fleet',
    'emergency_sos': 'Emergency SOS Mayday Alert',
    'auto_translate': 'Awtomatikong Pagsasalin Aktibo',
    'status_verified': 'NAKUMPIRMAN SERTIPICADO',
    'status_pending': 'NAG-AANTAY NG PAG-APRUBA'
  },
  fr: {
    'app_title': 'COMMANDEMENT MARITIME OCEAN BIRD',
    'search_placeholder': 'Rechercher navires, ports, équipage...',
    'quick_checkin': 'Enregistrement Express Terminal',
    'biometric_login': 'Connexion Sécurisée Biométrique',
    'global_fleet_chart': 'Analyse et Distribution de la Flotte',
    'emergency_sos': 'Déclencheur d\'Urgence SOS Mayday',
    'auto_translate': 'Traduction Automatique Active',
    'status_verified': 'TITRE VÉRIFIÉ',
    'status_pending': 'EN ATTENTE D\'APPROBATION'
  },
  de: {
    'app_title': 'OCEAN BIRD SEEFAHRTSKOMMANDO',
    'search_placeholder': 'Suche Schiffe, Häfen, Besatzung...',
    'quick_checkin': 'Schnell-Check-In Express-Terminal',
    'biometric_login': 'Biometrischer Sicherheits-Login',
    'global_fleet_chart': 'Globale Flottenanalyse & Verteilung',
    'emergency_sos': 'Notfall SOS Mayday Auslöser',
    'auto_translate': 'Automatische Übersetzung Aktiv',
    'status_verified': 'VERIFIZIERTES ZERTIFIKAT',
    'status_pending': 'GENEHMIGUNG AUSSTEHEND'
  },
  ja: {
    'app_title': 'オーシャンバード海事司令センター',
    'search_placeholder': '船舶、港湾、乗組員を検索...',
    'quick_checkin': 'クイックチェックイン・特急ターミナル',
    'biometric_login': '生体認証セキュリティログイン',
    'global_fleet_chart': '全球船隊分析＆配置チャート',
    'emergency_sos': '緊急SOSメイデイ発信器',
    'auto_translate': '自動翻訳アクティブ',
    'status_verified': '証明書検証済み',
    'status_pending': '承認待ち'
  },
  pt: {
    'app_title': 'COMANDO MARÍTIMO OCEAN BIRD',
    'search_placeholder': 'Buscar navios, portos, tripulação...',
    'quick_checkin': 'Terminal Check-In Expresso',
    'biometric_login': 'Login de Segurança Biométrica',
    'global_fleet_chart': 'Análise e Distribuição da Frota Global',
    'emergency_sos': 'Disparador de Emergência SOS Mayday',
    'auto_translate': 'Tradução Automática Ativa',
    'status_verified': 'CREDENCIAL VERIFICADA',
    'status_pending': 'APROVAÇÃO PENDENTE'
  },
  bn: {
    'app_title': 'ওশেন বার্ড মেরিটাইম কমান্ড সেন্টার',
    'search_placeholder': 'জাহাজ, বন্দর, ক্রু খুঁজুন...',
    'quick_checkin': 'কুইক চেক-ইন এক্সপ্রেস টার্মিনাল',
    'biometric_login': 'বায়োমেট্রিক সিকিউরিটি লগইন',
    'global_fleet_chart': 'গ্লোবাল ফ্ল্যাট বিশ্লেষণ ও চার্ট',
    'emergency_sos': 'জরুরী এসওএস মেডে অ্যালার্ট',
    'auto_translate': 'স্বয়ংক্রিয় অনুবাদ চালু',
    'status_verified': 'যাচাইকৃত শংসাপত্র',
    'status_pending': 'অনুমোদনের অপেক্ষায়'
  }
};

class TranslationEngine {
  private currentLanguage: SupportedLanguage = 'en';
  private listeners: Array<(lang: SupportedLanguage) => void> = [];

  constructor() {
    if (typeof window !== 'undefined') {
      const savedLang = localStorage.getItem('oceanbird_language') as SupportedLanguage;
      if (savedLang && SUPPORTED_LANGUAGES.some((l) => l.code === savedLang)) {
        this.currentLanguage = savedLang;
      }
    }
  }

  public getLanguage(): SupportedLanguage {
    return this.currentLanguage;
  }

  public setLanguage(lang: SupportedLanguage) {
    this.currentLanguage = lang;
    if (typeof window !== 'undefined') {
      localStorage.setItem('oceanbird_language', lang);
    }
    hapticEngine.trigger('click');
    this.listeners.forEach((cb) => cb(lang));
  }

  public subscribe(cb: (lang: SupportedLanguage) => void) {
    this.listeners.push(cb);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== cb);
    };
  }

  public translate(key: string, defaultText?: string): string {
    const dict = UI_TRANSLATIONS[this.currentLanguage];
    if (dict && dict[key]) {
      return dict[key];
    }
    return defaultText || key;
  }

  public getTerms(): TermDictionaryItem[] {
    return NAUTICAL_DICTIONARY[this.currentLanguage] || NAUTICAL_DICTIONARY['en'];
  }
}

export const translationEngine = new TranslationEngine();
