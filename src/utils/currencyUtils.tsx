import React, { useState, useEffect } from 'react';
import { DollarSign, Globe, RefreshCw } from 'lucide-react';

export type CurrencyCode = 'USD' | 'EUR' | 'GBP' | 'INR' | 'AED' | 'JPY' | 'SGD' | 'AUD' | 'CAD' | 'CNY' | 'SAR' | 'CHF';

export interface CurrencyInfo {
  code: CurrencyCode;
  symbol: string;
  name: string;
  flag: string;
  rateFromUSD: number; // 1 USD = rateFromUSD in target currency
}

export const SUPPORTED_CURRENCIES: CurrencyInfo[] = [
  { code: 'USD', symbol: '$', name: 'US Dollar', flag: '🇺🇸', rateFromUSD: 1.0 },
  { code: 'EUR', symbol: '€', name: 'Euro', flag: '🇪🇺', rateFromUSD: 0.92 },
  { code: 'GBP', symbol: '£', name: 'British Pound', flag: '🇬🇧', rateFromUSD: 0.78 },
  { code: 'INR', symbol: '₹', name: 'Indian Rupee', flag: '🇮🇳', rateFromUSD: 83.50 },
  { code: 'AED', symbol: 'د.إ', name: 'UAE Dirham', flag: '🇦🇪', rateFromUSD: 3.67 },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen', flag: '🇯🇵', rateFromUSD: 155.20 },
  { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar', flag: '🇸🇬', rateFromUSD: 1.35 },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar', flag: '🇦🇺', rateFromUSD: 1.52 },
  { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar', flag: '🇨🇦', rateFromUSD: 1.38 },
  { code: 'CNY', symbol: '¥', name: 'Chinese Yuan', flag: '🇨🇳', rateFromUSD: 7.24 },
  { code: 'SAR', symbol: '﷼', name: 'Saudi Riyal', flag: '🇸🇦', rateFromUSD: 3.75 },
  { code: 'CHF', symbol: 'CHF', name: 'Swiss Franc', flag: '🇨🇭', rateFromUSD: 0.89 }
];

export const getCurrencyInfo = (code: CurrencyCode): CurrencyInfo => {
  return SUPPORTED_CURRENCIES.find((c) => c.code === code) || SUPPORTED_CURRENCIES[0];
};

export const convertFromUSD = (amountInUSD: number, targetCurrency: CurrencyCode): number => {
  const info = getCurrencyInfo(targetCurrency);
  return amountInUSD * info.rateFromUSD;
};

export const formatPrice = (amountInUSD: number, targetCurrency: CurrencyCode = 'USD'): string => {
  const info = getCurrencyInfo(targetCurrency);
  const converted = amountInUSD * info.rateFromUSD;
  
  if (targetCurrency === 'JPY') {
    return `${info.symbol}${Math.round(converted).toLocaleString()}`;
  }
  return `${info.symbol}${converted.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

// Custom event for app-wide currency synchronization
const CURRENCY_CHANGE_EVENT = 'ocean_bird_currency_change';

export const setGlobalCurrency = (code: CurrencyCode) => {
  localStorage.setItem('ocean_bird_selected_currency', code);
  window.dispatchEvent(new CustomEvent(CURRENCY_CHANGE_EVENT, { detail: { currency: code } }));
};

export const getGlobalCurrency = (): CurrencyCode => {
  const saved = localStorage.getItem('ocean_bird_selected_currency') as CurrencyCode;
  if (saved && SUPPORTED_CURRENCIES.some((c) => c.code === saved)) {
    return saved;
  }
  return 'USD';
};

export const useCurrency = () => {
  const [currency, setCurrencyState] = useState<CurrencyCode>(getGlobalCurrency());

  useEffect(() => {
    const handleCurrencyChange = (e: any) => {
      if (e.detail && e.detail.currency) {
        setCurrencyState(e.detail.currency);
      }
    };
    window.addEventListener(CURRENCY_CHANGE_EVENT, handleCurrencyChange);
    return () => window.removeEventListener(CURRENCY_CHANGE_EVENT, handleCurrencyChange);
  }, []);

  const changeCurrency = (newCode: CurrencyCode) => {
    setCurrencyState(newCode);
    setGlobalCurrency(newCode);
  };

  return {
    currency,
    currencyInfo: getCurrencyInfo(currency),
    changeCurrency,
    formatPrice: (usd: number) => formatPrice(usd, currency),
    convert: (usd: number) => convertFromUSD(usd, currency)
  };
};

export const CurrencySelector: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { currency, changeCurrency } = useCurrency();

  return (
    <div className={`flex items-center space-x-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 font-mono text-xs ${className}`}>
      <Globe className="w-3.5 h-3.5 text-cyan-400 shrink-0 ml-1.5" />
      <span className="text-[10px] text-slate-400 hidden sm:inline font-bold uppercase">Currency:</span>
      <select
        value={currency}
        onChange={(e) => changeCurrency(e.target.value as CurrencyCode)}
        className="bg-slate-900 text-white font-bold text-xs py-1 px-2 rounded-lg border border-slate-700 focus:outline-none focus:border-cyan-400 cursor-pointer"
      >
        {SUPPORTED_CURRENCIES.map((c) => (
          <option key={c.code} value={c.code}>
            {c.flag} {c.code} ({c.symbol})
          </option>
        ))}
      </select>
    </div>
  );
};
