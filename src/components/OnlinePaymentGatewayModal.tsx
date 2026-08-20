import React, { useState, useEffect } from 'react';
import {
  CreditCard,
  Wallet,
  Globe,
  CheckCircle2,
  AlertTriangle,
  QrCode,
  ShieldCheck,
  Zap,
  ArrowRight,
  Copy,
  Check,
  RefreshCw,
  Lock,
  Download,
  Building2,
  DollarSign,
  Smartphone
} from 'lucide-react';
import { useCurrency } from '../utils/currencyUtils';
import { generateAndDownloadPdf } from '../utils/pdfExporter';

export interface PaymentGatewayModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingData: {
    id: string;
    title: string;
    operatorName: string;
    amountUSD: number;
    passengerOrShipper: string;
    passportOrCustoms: string;
    origin: string;
    destination: string;
    departureDate: string;
    allocatedSpace: string;
    documentType: 'E-TICKET' | 'AIR_WAYBILL' | 'BILL_OF_LADING' | 'TAX_INVOICE';
  };
  onPaymentSuccess: (paymentDetails: {
    paymentMethod: string;
    txHash: string;
    timestamp: string;
  }) => void;
}

export const OnlinePaymentGatewayModal: React.FC<PaymentGatewayModalProps> = ({
  isOpen,
  onClose,
  bookingData,
  onPaymentSuccess
}) => {
  const { currency, formatPrice } = useCurrency();

  const [paymentCategory, setPaymentCategory] = useState<'CRYPTO' | 'CARD' | 'DIGITAL_WALLET' | 'SWIFT_BANK'>('CRYPTO');

  // Crypto state
  const [selectedCrypto, setSelectedCrypto] = useState<'USDT_TRC20' | 'USDT_ERC20' | 'USDC_SOL' | 'BTC' | 'ETH'>('USDT_TRC20');
  const [copiedWallet, setCopiedWallet] = useState(false);

  // Card state
  const [cardNumber, setCardNumber] = useState('4532 •••• •••• 8821');
  const [cardHolder, setCardHolder] = useState(bookingData?.passengerOrShipper || 'Valued Passenger');
  const [cardExpiry, setCardExpiry] = useState('08/29');
  const [cardCvc, setCardCvc] = useState('882');

  // Wallet state
  const [upiOrWalletId, setUpiOrWalletId] = useState('oceanbird@pay');

  // Processing flow state
  const [paymentStep, setPaymentStep] = useState<'SELECT' | 'PROCESSING' | 'SUCCESS'>('SELECT');
  const [processingMsg, setProcessingMsg] = useState('Initializing Secure Gateway...');
  const [txHash, setTxHash] = useState('');
  const [timerSeconds, setTimerSeconds] = useState(899); // 15 mins countdown

  useEffect(() => {
    if (!isOpen) {
      setPaymentStep('SELECT');
      return;
    }
    const interval = setInterval(() => {
      setTimerSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen || !bookingData) return null;

  const getCryptoWalletAddress = () => {
    switch (selectedCrypto) {
      case 'USDT_TRC20':
        return 'T9zXmP4vR2kL8nQ7wY1aJ3sH5uB6cE0dF';
      case 'USDT_ERC20':
        return '0x71C7656EC7ab88b098defB751B7401B5f6d8976F';
      case 'USDC_SOL':
        return '4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R';
      case 'BTC':
        return 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfJH882';
      case 'ETH':
        return '0x09F21805bF468f74a0044B5034a70C5791338210';
    }
  };

  const getCryptoAmount = () => {
    const usd = bookingData?.amountUSD || 0;
    switch (selectedCrypto) {
      case 'USDT_TRC20':
      case 'USDT_ERC20':
      case 'USDC_SOL':
        return `${usd.toFixed(2)} ${selectedCrypto.split('_')[0]}`;
      case 'BTC':
        return `${(usd / 65000).toFixed(6)} BTC`;
      case 'ETH':
        return `${(usd / 3400).toFixed(4)} ETH`;
    }
  };

  const handleCopyWallet = () => {
    navigator.clipboard.writeText(getCryptoWalletAddress());
    setCopiedWallet(true);
    setTimeout(() => setCopiedWallet(false), 2000);
  };

  const handleExecutePayment = () => {
    setPaymentStep('PROCESSING');
    setProcessingMsg('Connecting to Encrypted Banking & Blockchain Node...');

    setTimeout(() => {
      setProcessingMsg('Validating Anti-Money Laundering & Customs Clearance...');
    }, 1200);

    setTimeout(() => {
      setProcessingMsg('Verifying Payment Ledger & Issuing Digital Signature...');
    }, 2400);

    setTimeout(() => {
      const generatedHash = `0x${Math.random().toString(16).substring(2)}${Math.random().toString(16).substring(2)}`;
      setTxHash(generatedHash);
      setPaymentStep('SUCCESS');

      let methodLabel = 'Crypto Gateway (USDT/USDC)';
      if (paymentCategory === 'CARD') methodLabel = 'Credit Card (Visa/Mastercard)';
      if (paymentCategory === 'DIGITAL_WALLET') methodLabel = 'Digital Wallet (UPI/Apple Pay/Google Pay)';
      if (paymentCategory === 'SWIFT_BANK') methodLabel = 'SWIFT Direct Bank Transfer';

      onPaymentSuccess({
        paymentMethod: methodLabel,
        txHash: generatedHash,
        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16) + ' UTC'
      });
    }, 3600);
  };

  const minutes = Math.floor(timerSeconds / 60);
  const seconds = timerSeconds % 60;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 font-mono text-xs">
      <div className="bg-slate-900 border border-cyan-500/50 rounded-3xl p-6 max-w-2xl w-full text-white space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-black text-white flex items-center space-x-2">
                <span>OceanBird Gateway System</span>
                <span className="px-2 py-0.5 rounded-full text-[9px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  256-BIT ENCRYPTED
                </span>
              </h3>
              <span className="text-slate-400 text-[11px]">
                Booking ID: <strong className="text-cyan-300">{bookingData.id}</strong> • Session Expires: <span className="text-amber-400 font-bold">{minutes}:{seconds < 10 ? `0${seconds}` : seconds}</span>
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white font-bold px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700"
          >
            ✕
          </button>
        </div>

        {/* STEP 1: SELECT METHOD & PAYMENT DETAILS */}
        {paymentStep === 'SELECT' && (
          <div className="space-y-6">
            {/* Amount Summary Box */}
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-slate-400 text-[10px] block uppercase font-bold">Total Checkout Amount:</span>
                <span className="text-emerald-400 text-2xl font-black">{formatPrice(bookingData.amountUSD)}</span>
                <span className="text-slate-400 text-[10px] block">Includes Port Customs, Fuel Surcharge & SatCom Verification</span>
              </div>
              <div className="text-right">
                <span className="text-slate-400 text-[10px] block uppercase font-bold">Service Title:</span>
                <span className="text-white font-bold text-xs max-w-[200px] truncate block">{bookingData.title}</span>
              </div>
            </div>

            {/* Category Selector Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                type="button"
                onClick={() => setPaymentCategory('CRYPTO')}
                className={`p-3 rounded-xl border font-bold text-center transition-all flex flex-col items-center justify-center space-y-1 ${
                  paymentCategory === 'CRYPTO'
                    ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-lg'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <Zap className="w-5 h-5" />
                <span className="text-[10px]">Crypto USDT / USDC</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentCategory('CARD')}
                className={`p-3 rounded-xl border font-bold text-center transition-all flex flex-col items-center justify-center space-y-1 ${
                  paymentCategory === 'CARD'
                    ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-lg'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <CreditCard className="w-5 h-5" />
                <span className="text-[10px]">Credit / Debit Card</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentCategory('DIGITAL_WALLET')}
                className={`p-3 rounded-xl border font-bold text-center transition-all flex flex-col items-center justify-center space-y-1 ${
                  paymentCategory === 'DIGITAL_WALLET'
                    ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-lg'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <Smartphone className="w-5 h-5" />
                <span className="text-[10px]">UPI / Apple Pay</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentCategory('SWIFT_BANK')}
                className={`p-3 rounded-xl border font-bold text-center transition-all flex flex-col items-center justify-center space-y-1 ${
                  paymentCategory === 'SWIFT_BANK'
                    ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-lg'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <Building2 className="w-5 h-5" />
                <span className="text-[10px]">SWIFT / L/C Bank</span>
              </button>
            </div>

            {/* CATEGORY 1: CRYPTO GATEWAY */}
            {paymentCategory === 'CRYPTO' && (
              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-slate-400 font-bold text-[10px] uppercase">Select Cryptocurrency Token:</label>
                  <span className="text-emerald-400 text-[10px] font-bold">Instant Auto-Settle</span>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedCrypto('USDT_TRC20')}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      selectedCrypto === 'USDT_TRC20' ? 'bg-cyan-500/20 border-cyan-400 text-white' : 'bg-slate-900 border-slate-800 text-slate-400'
                    }`}
                  >
                    <strong className="block text-xs text-white">USDT (TRC20)</strong>
                    <span className="text-[9px] text-slate-400">Tron Network ($1 Fee)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedCrypto('USDT_ERC20')}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      selectedCrypto === 'USDT_ERC20' ? 'bg-cyan-500/20 border-cyan-400 text-white' : 'bg-slate-900 border-slate-800 text-slate-400'
                    }`}
                  >
                    <strong className="block text-xs text-white">USDT (ERC20)</strong>
                    <span className="text-[9px] text-slate-400">Ethereum Network</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedCrypto('USDC_SOL')}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      selectedCrypto === 'USDC_SOL' ? 'bg-cyan-500/20 border-cyan-400 text-white' : 'bg-slate-900 border-slate-800 text-slate-400'
                    }`}
                  >
                    <strong className="block text-xs text-white">USDC (Solana)</strong>
                    <span className="text-[9px] text-slate-400">Solana Network</span>
                  </button>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-4 bg-slate-900 p-4 rounded-xl border border-slate-800">
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?data=${getCryptoWalletAddress()}&size=120x120`}
                    alt="Crypto Wallet QR"
                    className="w-28 h-28 rounded-lg border-2 border-slate-700 bg-white p-1"
                  />
                  <div className="space-y-2 flex-1 w-full">
                    <div>
                      <span className="text-slate-500 text-[10px] block">PAY EXACT AMOUNT:</span>
                      <strong className="text-emerald-400 text-lg font-black">{getCryptoAmount()}</strong>
                    </div>

                    <div>
                      <span className="text-slate-500 text-[10px] block">DEPOSIT WALLET ADDRESS:</span>
                      <div className="flex items-center space-x-2 bg-slate-950 p-2 rounded-lg border border-slate-800 font-mono text-[10px] text-cyan-300 overflow-x-auto">
                        <span className="truncate">{getCryptoWalletAddress()}</span>
                        <button
                          type="button"
                          onClick={handleCopyWallet}
                          className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-white shrink-0"
                        >
                          {copiedWallet ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* CATEGORY 2: CARD PAYMENT */}
            {paymentCategory === 'CARD' && (
              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
                <div className="space-y-1.5">
                  <label className="text-slate-400 font-bold text-[10px] uppercase">Card Number:</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 text-white font-bold p-3 pl-10 rounded-xl focus:outline-none focus:border-cyan-400"
                    />
                    <CreditCard className="w-5 h-5 text-slate-500 absolute left-3 top-3.5" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="text-slate-400 font-bold text-[10px] uppercase">Cardholder Name:</label>
                    <input
                      type="text"
                      value={cardHolder}
                      onChange={(e) => setCardHolder(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 text-white font-bold p-3 rounded-xl focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1.5">
                      <label className="text-slate-400 font-bold text-[10px] uppercase">Expiry:</label>
                      <input
                        type="text"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 text-white font-bold p-3 rounded-xl focus:outline-none focus:border-cyan-400 text-center"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-slate-400 font-bold text-[10px] uppercase">CVC/CVV:</label>
                      <input
                        type="password"
                        value={cardCvc}
                        onChange={(e) => setCardCvc(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 text-white font-bold p-3 rounded-xl focus:outline-none focus:border-cyan-400 text-center"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* CATEGORY 3: DIGITAL WALLETS & UPI */}
            {paymentCategory === 'DIGITAL_WALLET' && (
              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
                <div className="space-y-1.5">
                  <label className="text-slate-400 font-bold text-[10px] uppercase">Virtual Payment Address (UPI / Apple Pay / Google Pay):</label>
                  <input
                    type="text"
                    value={upiOrWalletId}
                    onChange={(e) => setUpiOrWalletId(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 text-white font-bold p-3 rounded-xl focus:outline-none focus:border-cyan-400"
                    placeholder="username@upi or Apple Pay ID"
                  />
                </div>

                <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-center space-y-2">
                  <span className="text-slate-400 text-[10px] block">OR SCAN TO PAY WITH PHONE WALLET APP:</span>
                  <div className="flex justify-center">
                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?data=upi://pay?pa=oceanbird@pay&pn=OceanBirdWorldways&am=${bookingData.amountUSD}&cu=USD&size=130x130`}
                      alt="UPI Apple Pay QR"
                      className="w-32 h-32 rounded-lg border-2 border-slate-700 bg-white p-1"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* CATEGORY 4: SWIFT & L/C BANK DIRECT */}
            {paymentCategory === 'SWIFT_BANK' && (
              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
                <div className="grid grid-cols-2 gap-3 text-[11px]">
                  <div>
                    <span className="text-slate-500 text-[10px] block">BENEFICIARY BANK:</span>
                    <strong className="text-white">JPMorgan Chase N.A. (Maritime Division)</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[10px] block">SWIFT / BIC CODE:</span>
                    <strong className="text-cyan-300 font-mono">CHASUS33MTR</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[10px] block">ACCOUNT IBAN:</span>
                    <strong className="text-white font-mono">US90 CHAS 0001 8842 9012 09</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[10px] block">LETTER OF CREDIT (L/C) REG:</span>
                    <strong className="text-teal-300 font-mono">LC-OCEANBIRD-9042</strong>
                  </div>
                </div>
              </div>
            )}

            {/* Action Trigger Button */}
            <button
              type="button"
              onClick={handleExecutePayment}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-black text-sm transition-all shadow-xl shadow-emerald-500/20 flex items-center justify-center space-x-2"
            >
              <Lock className="w-5 h-5" />
              <span>CONFIRM & EXECUTE PAY ({formatPrice(bookingData.amountUSD)})</span>
            </button>
          </div>
        )}

        {/* STEP 2: PROCESSING ANIMATION */}
        {paymentStep === 'PROCESSING' && (
          <div className="py-12 text-center space-y-6">
            <div className="flex justify-center">
              <RefreshCw className="w-16 h-16 text-cyan-400 animate-spin" />
            </div>
            <div className="space-y-2">
              <h4 className="text-xl font-black text-white">Processing Encrypted Transaction</h4>
              <p className="text-cyan-300 text-xs font-mono">{processingMsg}</p>
            </div>
            <div className="max-w-md mx-auto bg-slate-950 p-4 rounded-xl border border-slate-800 text-[11px] text-slate-400 space-y-1">
              <div>Booking Reference: <strong className="text-white">{bookingData.id}</strong></div>
              <div>Amount Transacting: <strong className="text-emerald-400">{formatPrice(bookingData.amountUSD)}</strong></div>
            </div>
          </div>
        )}

        {/* STEP 3: SUCCESS & RECEIPT ISSUANCE */}
        {paymentStep === 'SUCCESS' && (
          <div className="space-y-6">
            <div className="p-5 bg-emerald-500/20 border border-emerald-500/40 rounded-2xl text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
              <div>
                <h4 className="text-xl font-black text-white">Payment Confirmed & Settled!</h4>
                <p className="text-emerald-300 text-xs mt-0.5">Your booking is officially confirmed on satcom network ledger.</p>
              </div>
            </div>

            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div>
                  <span className="text-slate-500 text-[10px] block">TRANSACTION HASH:</span>
                  <strong className="text-cyan-300 font-mono text-[10px] truncate block">{txHash}</strong>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] block">TOTAL PAID ({currency}):</span>
                  <strong className="text-emerald-400 font-black">{formatPrice(bookingData.amountUSD)}</strong>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] block">PASSENGER / SHIPPER:</span>
                  <strong className="text-white">{bookingData.passengerOrShipper}</strong>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] block">SPACE / CABIN / SEAT:</span>
                  <strong className="text-amber-300">{bookingData.allocatedSpace}</strong>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  generateAndDownloadPdf({
                    documentType: bookingData.documentType,
                    bookingId: bookingData.id,
                    title: bookingData.title,
                    operatorName: bookingData.operatorName,
                    passengerOrCargoName: bookingData.passengerOrShipper,
                    passportOrCustomsCode: bookingData.passportOrCustoms,
                    origin: bookingData.origin,
                    destination: bookingData.destination,
                    departureDate: bookingData.departureDate,
                    allocatedSpace: bookingData.allocatedSpace,
                    paymentMethod: paymentCategory,
                    paymentTxHash: txHash,
                    basePriceUSD: bookingData.amountUSD,
                    totalPriceUSD: bookingData.amountUSD,
                    currencyCode: currency,
                    formattedTotalPrice: formatPrice(bookingData.amountUSD),
                    issueTimestamp: new Date().toISOString().replace('T', ' ').substring(0, 16) + ' UTC',
                    qrPayload: `https://api.qrserver.com/v1/create-qr-code/?data=${bookingData.id}-OFFICIAL-PDF&size=150x150`
                  });
                }}
                className="flex-1 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs transition-all flex items-center justify-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>EXPORT OFFICIAL PDF E-TICKET</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs"
              >
                Close Gateway
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
