import React, { useState } from 'react';
import { LotteryWinningsBankingPortal } from './LotteryWinningsBankingPortal';

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
  Smartphone,
  Search,
  FileText,
  Clock,
  History,
  Send,
  Printer,
  Sparkles,
  ExternalLink,
  ShieldAlert,
  SlidersHorizontal,
  ChevronRight
} from 'lucide-react';
import { useCurrency } from '../utils/currencyUtils';
import { generateAndDownloadPdf } from '../utils/pdfExporter';

export interface PaymentTransactionRecord {
  id: string;
  invoiceRef: string;
  serviceCategory: 'Airways Ticket' | 'Cruise Passage' | 'Online e-Visa Fee' | 'Port Customs & Freight' | 'Marine Fuel Bunkering';
  payerName: string;
  amountUSD: number;
  paymentRail: 'USDT (TRC-20)' | 'USDC (Solana)' | 'Bitcoin (BTC)' | 'Credit Card (Visa/MC)' | 'BHIM UPI / Google Pay' | 'SWIFT Wire Transfer';
  status: 'COMPLETED' | 'PENDING_BLOCKCHAIN' | 'SETTLED';
  txHashOrRef: string;
  timestamp: string;
}

const INITIAL_TRANSACTIONS: PaymentTransactionRecord[] = [
  {
    id: 'TX-998120',
    invoiceRef: 'VISA-2026-88491',
    serviceCategory: 'Online e-Visa Fee',
    payerName: 'Capt. Alexander Vance',
    amountUSD: 85,
    paymentRail: 'USDT (TRC-20)',
    status: 'COMPLETED',
    txHashOrRef: '0x38a91c81024e8201fa92',
    timestamp: '2026-08-03 21:45 UTC'
  },
  {
    id: 'TX-998115',
    invoiceRef: 'AIR-PNR-884920',
    serviceCategory: 'Airways Ticket',
    payerName: 'Elena Rostova',
    amountUSD: 1250,
    paymentRail: 'Credit Card (Visa/MC)',
    status: 'COMPLETED',
    txHashOrRef: 'CARD-AUTH-992018',
    timestamp: '2026-08-03 18:20 UTC'
  },
  {
    id: 'TX-998102',
    invoiceRef: 'INV-PORT-5510',
    serviceCategory: 'Port Customs & Freight',
    payerName: 'Oceanic Shipping Corp',
    amountUSD: 4850,
    paymentRail: 'SWIFT Wire Transfer',
    status: 'SETTLED',
    txHashOrRef: 'SWIFT-IN202608031029',
    timestamp: '2026-08-02 11:05 UTC'
  }
];

export const OnlinePaymentGatewayPortal: React.FC = () => {
  const { currency, formatPrice } = useCurrency();

  const [portalTab, setPortalTab] = useState<'PAY_CHECKOUT' | 'TRANSACTION_HISTORY' | 'GATEWAY_SECURITY' | 'LOTTERY_WINNINGS_BANK'>('PAY_CHECKOUT');

  // Checkout Form State
  const [invoiceRefInput, setInvoiceRefInput] = useState('INV-2026-99120');
  const [payerName, setPayerName] = useState('Captain Alexander Vance');
  const [payerEmail, setPayerEmail] = useState('alex.vance@oceanbird-maritime.com');
  const [serviceCategory, setServiceCategory] = useState<'Airways Ticket' | 'Cruise Passage' | 'Online e-Visa Fee' | 'Port Customs & Freight' | 'Marine Fuel Bunkering'>('Online e-Visa Fee');
  const [amountUSD, setAmountUSD] = useState<number>(120);

  // Payment Rails
  const [paymentRailCategory, setPaymentRailCategory] = useState<'CRYPTO' | 'CARD' | 'UPI_WALLET' | 'SWIFT_BANK'>('CRYPTO');

  // Crypto state
  const [cryptoCoin, setCryptoCoin] = useState<'USDT_TRC20' | 'USDT_ERC20' | 'USDC_SOL' | 'BTC' | 'ETH'>('USDT_TRC20');
  const [copiedWallet, setCopiedWallet] = useState(false);

  // Card state
  const [cardNumber, setCardNumber] = useState('4532 •••• •••• 8820');
  const [cardHolder, setCardHolder] = useState('ALEXANDER VANCE');
  const [cardExpiry, setCardExpiry] = useState('11/28');
  const [cardCvc, setCardCvc] = useState('882');

  // UPI state
  const [upiId, setUpiId] = useState('alex.vance@upi');

  // Payment Processing Simulation State
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [completedTx, setCompletedTx] = useState<PaymentTransactionRecord | null>(null);

  // Transaction Ledger
  const [transactions, setTransactions] = useState<PaymentTransactionRecord[]>(INITIAL_TRANSACTIONS);

  const walletAddresses: Record<string, { address: string; network: string }> = {
    USDT_TRC20: { address: 'T9yD14Nj9j7xXv3mK9L1Z8x4B9c2D3e4F5', network: 'TRON (TRC-20) Fast Ledger' },
    USDT_ERC20: { address: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F', network: 'Ethereum (ERC-20)' },
    USDC_SOL: { address: '7Xw9k1M2N3P4Q5R6S7T8U9V0W1X2Y3Z4a5B6C', network: 'Solana (SPL)' },
    BTC: { address: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh', network: 'Bitcoin Mainnet' },
    ETH: { address: '0x38a91C81024E8201FA9221190B78821038291081', network: 'Ethereum Mainnet' }
  };

  const handleCopyWallet = () => {
    const addr = walletAddresses[cryptoCoin]?.address;
    if (addr) {
      navigator.clipboard.writeText(addr);
      setCopiedWallet(true);
      setTimeout(() => setCopiedWallet(false), 2000);
    }
  };

  const handleExecutePayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!invoiceRefInput || !payerName || !amountUSD || amountUSD <= 0) {
      alert('Please provide valid invoice reference, payer name, and amount.');
      return;
    }

    setIsProcessing(true);
    setProcessingProgress(15);

    const interval = setInterval(() => {
      setProcessingProgress((prev) => {
        if (prev >= 95) {
          clearInterval(interval);
          return 100;
        }
        return prev + 25;
      });
    }, 400);

    setTimeout(() => {
      clearInterval(interval);
      setIsProcessing(false);

      let railLabel: any = 'Credit Card (Visa/MC)';
      if (paymentRailCategory === 'CRYPTO') railLabel = cryptoCoin === 'USDT_TRC20' ? 'USDT (TRC-20)' : 'USDC (Solana)';
      if (paymentRailCategory === 'UPI_WALLET') railLabel = 'BHIM UPI / Google Pay';
      if (paymentRailCategory === 'SWIFT_BANK') railLabel = 'SWIFT Wire Transfer';

      const newRecord: PaymentTransactionRecord = {
        id: `TX-${Math.floor(100000 + Math.random() * 900000)}`,
        invoiceRef: invoiceRefInput,
        serviceCategory,
        payerName,
        amountUSD,
        paymentRail: railLabel,
        status: 'COMPLETED',
        txHashOrRef: `0x${Math.random().toString(16).substring(2, 12)}${Math.random().toString(16).substring(2, 8)}`,
        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16) + ' UTC'
      };

      setCompletedTx(newRecord);
      setTransactions([newRecord, ...transactions]);
    }, 2200);
  };

  const handleDownloadReceiptPdf = (tx: PaymentTransactionRecord) => {
    generateAndDownloadPdf({
      documentType: 'TAX_INVOICE',
      bookingId: tx.id,
      title: `TAX INVOICE (${tx.serviceCategory.toUpperCase()})`,
      operatorName: 'OceanBird Global Gateway',
      passengerOrCargoName: tx.payerName,
      passportOrCustomsCode: tx.invoiceRef,
      origin: 'Global Gateway',
      destination: tx.serviceCategory,
      departureDate: tx.timestamp,
      allocatedSpace: `Invoice Ref: ${tx.invoiceRef}`,
      paymentMethod: tx.paymentRail,
      paymentTxHash: tx.txHashOrRef,
      basePriceUSD: tx.amountUSD,
      totalPriceUSD: tx.amountUSD,
      currencyCode: 'USD',
      formattedTotalPrice: formatPrice(tx.amountUSD),
      issueTimestamp: tx.timestamp,
      qrPayload: `PAYMENT:${tx.id}:${tx.invoiceRef}:${tx.txHashOrRef}`
    });
  };

  return (
    <div id="online-payment-gateway-portal" className="space-y-8 animate-fadeIn text-white font-sans pb-12">
      {/* HEADER BANNER */}
      <div className="bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 rounded-3xl p-6 sm:p-8 border border-sky-500/30 shadow-2xl space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-800">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 uppercase flex items-center space-x-1">
                <Lock className="w-3.5 h-3.5 text-emerald-400" />
                <span>256-BIT ENCRYPTED GLOBAL GATEWAY</span>
              </span>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-sky-500/20 text-sky-300 border border-sky-500/30 uppercase flex items-center space-x-1">
                <Globe className="w-3.5 h-3.5 text-sky-400" />
                <span>CRYPTO, CARDS, UPI & SWIFT WIRE</span>
              </span>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 uppercase flex items-center space-x-1">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                <span>INSTANT PDF RECEIPT & TX HASH</span>
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white flex items-center space-x-3">
              <CreditCard className="w-8 h-8 text-emerald-400 shrink-0" />
              <span>Online Payment Gateway & Fee Checkout Portal</span>
            </h1>

            <p className="text-slate-300 text-xs sm:text-sm max-w-4xl font-sans leading-relaxed">
              Universal payment checkout portal for Airways flight tickets, Cruise passenger passages, Online e-Visa immigration fees, Port customs & freight charges, and Marine fuel bunkering invoices.
            </p>
          </div>

          <div className="flex items-center space-x-3 shrink-0 font-mono text-xs">
            <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 text-right">
              <span className="text-slate-400 text-[10px] block">GATEWAY STATUS</span>
              <span className="text-emerald-400 font-bold flex items-center space-x-1 justify-end">
                <Zap className="w-3.5 h-3.5 fill-emerald-400" />
                <span>ALL RAILS ONLINE</span>
              </span>
            </div>
          </div>
        </div>

        {/* TOP PORTAL TABS */}
        <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
          <button
            onClick={() => setPortalTab('PAY_CHECKOUT')}
            className={`px-4 py-2.5 rounded-2xl font-bold transition-all flex items-center space-x-2 ${
              portalTab === 'PAY_CHECKOUT'
                ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20 font-black'
                : 'bg-slate-950 text-slate-300 hover:bg-slate-800 border border-slate-800'
            }`}
          >
            <CreditCard className="w-4 h-4" />
            <span>1. MAKE A PAYMENT & CHECKOUT</span>
          </button>

          <button
            onClick={() => setPortalTab('TRANSACTION_HISTORY')}
            className={`px-4 py-2.5 rounded-2xl font-bold transition-all flex items-center space-x-2 ${
              portalTab === 'TRANSACTION_HISTORY'
                ? 'bg-sky-500 text-slate-950 shadow-lg shadow-sky-500/20 font-black'
                : 'bg-slate-950 text-slate-300 hover:bg-slate-800 border border-slate-800'
            }`}
          >
            <History className="w-4 h-4" />
            <span>2. TRANSACTION LEDGER ({transactions.length})</span>
          </button>

          <button
            onClick={() => setPortalTab('GATEWAY_SECURITY')}
            className={`px-4 py-2.5 rounded-2xl font-bold transition-all flex items-center space-x-2 ${
              portalTab === 'GATEWAY_SECURITY'
                ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20 font-black'
                : 'bg-slate-950 text-slate-300 hover:bg-slate-800 border border-slate-800'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>3. GATEWAY SECURITY & COMPLIANCE</span>
          </button>
        </div>
      </div>

      {/* ================= TAB 4: LOTTERY WINNINGS BANKING ================= */}
      {portalTab === 'LOTTERY_WINNINGS_BANK' && (
        <LotteryWinningsBankingPortal />
      )}

      {/* ================= TAB 1: MAKE A PAYMENT & CHECKOUT ================= */}
      {portalTab === 'PAY_CHECKOUT' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fadeIn">
          {/* Main Payment Checkout Form */}
          <div className="lg:col-span-2 space-y-6 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
            <div className="border-b border-slate-800 pb-4 space-y-1">
              <h2 className="text-xl font-bold text-white flex items-center space-x-2">
                <DollarSign className="w-5 h-5 text-emerald-400" />
                <span>Invoice & Fee Settlement Portal</span>
              </h2>
              <p className="text-slate-400 text-xs font-mono">
                Select your service category, enter invoice reference, and choose preferred payment channel.
              </p>
            </div>

            {completedTx ? (
              /* Success Receipt View */
              <div className="bg-slate-950 border border-emerald-500/50 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl font-mono text-xs">
                <div className="text-center space-y-3">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center mx-auto text-emerald-400 animate-bounce">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-black text-white">PAYMENT SUCCESSFUL & SETTLED!</h3>
                  <p className="text-slate-400 text-xs">
                    Your payment of <strong className="text-emerald-400">{formatPrice(completedTx.amountUSD)}</strong> has been confirmed on the gateway ledger.
                  </p>
                </div>

                <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-3">
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-slate-400">Transaction ID:</span>
                    <span className="font-bold text-sky-300">{completedTx.id}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-slate-400">Invoice Reference:</span>
                    <span className="font-bold text-white">{completedTx.invoiceRef}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-slate-400">Service Category:</span>
                    <span className="font-bold text-amber-300">{completedTx.serviceCategory}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-slate-400">Payment Channel:</span>
                    <span className="font-bold text-teal-300">{completedTx.paymentRail}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Tx Reference Hash:</span>
                    <span className="font-bold text-slate-300 font-mono">{completedTx.txHashOrRef}</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                  <button
                    onClick={() => handleDownloadReceiptPdf(completedTx)}
                    className="w-full py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs uppercase transition-all shadow-lg flex items-center justify-center space-x-2"
                  >
                    <Download className="w-4 h-4" />
                    <span>DOWNLOAD TAX INVOICE & RECEIPT PDF</span>
                  </button>

                  <button
                    onClick={() => setCompletedTx(null)}
                    className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 font-bold text-xs uppercase transition-all"
                  >
                    MAKE ANOTHER PAYMENT
                  </button>
                </div>
              </div>
            ) : (
              /* Payment Checkout Form */
              <form onSubmit={handleExecutePayment} className="space-y-6 text-xs font-mono">
                {/* Invoice Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-slate-400 font-bold uppercase text-[10px]">Service Category</label>
                    <select
                      value={serviceCategory}
                      onChange={(e) => setServiceCategory(e.target.value as any)}
                      className="w-full bg-slate-950 text-white font-bold p-3 rounded-2xl border border-slate-800 focus:outline-none focus:border-emerald-400"
                    >
                      <option value="Online e-Visa Fee">🛂 Online e-Visa Immigration Fee</option>
                      <option value="Airways Ticket">✈️ Airways Passenger Flight Ticket</option>
                      <option value="Cruise Passage">🚢 Cruise Passage / Voyage Cabin Ticket</option>
                      <option value="Port Customs & Freight">📦 Port Customs & Freight Logistics</option>
                      <option value="Marine Fuel Bunkering">⛽ Marine Fuel & Bunkering Invoice</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-400 font-bold uppercase text-[10px]">Invoice / Reference No *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. VISA-2026-88491"
                      value={invoiceRefInput}
                      onChange={(e) => setInvoiceRefInput(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-3 text-white font-bold focus:outline-none focus:border-emerald-400"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-400 font-bold uppercase text-[10px]">Payer Name / Company *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Captain Alexander Vance"
                      value={payerName}
                      onChange={(e) => setPayerName(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-3 text-white font-bold focus:outline-none focus:border-emerald-400"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-400 font-bold uppercase text-[10px]">Payment Amount (USD) *</label>
                    <input
                      type="number"
                      required
                      min={1}
                      value={amountUSD}
                      onChange={(e) => setAmountUSD(Number(e.target.value))}
                      className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-3 text-amber-400 font-extrabold text-sm focus:outline-none focus:border-emerald-400"
                    />
                  </div>
                </div>

                {/* Payment Channels Tabs */}
                <div className="space-y-4 pt-2 border-t border-slate-800">
                  <label className="text-slate-400 font-bold uppercase text-[10px] block">Choose Payment Rail Channel</label>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <button
                      type="button"
                      onClick={() => setPaymentRailCategory('CRYPTO')}
                      className={`p-3 rounded-2xl border transition-all text-center ${
                        paymentRailCategory === 'CRYPTO'
                          ? 'bg-amber-500/20 border-amber-500 text-amber-300 font-bold'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      <Wallet className="w-5 h-5 mx-auto mb-1 text-amber-400" />
                      <span className="block text-[11px]">Crypto & Web3</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentRailCategory('CARD')}
                      className={`p-3 rounded-2xl border transition-all text-center ${
                        paymentRailCategory === 'CARD'
                          ? 'bg-sky-500/20 border-sky-500 text-sky-300 font-bold'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      <CreditCard className="w-5 h-5 mx-auto mb-1 text-sky-400" />
                      <span className="block text-[11px]">Credit / Debit Card</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentRailCategory('UPI_WALLET')}
                      className={`p-3 rounded-2xl border transition-all text-center ${
                        paymentRailCategory === 'UPI_WALLET'
                          ? 'bg-teal-500/20 border-teal-500 text-teal-300 font-bold'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      <Smartphone className="w-5 h-5 mx-auto mb-1 text-teal-400" />
                      <span className="block text-[11px]">BHIM UPI / Wallets</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentRailCategory('SWIFT_BANK')}
                      className={`p-3 rounded-2xl border transition-all text-center ${
                        paymentRailCategory === 'SWIFT_BANK'
                          ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      <Building2 className="w-5 h-5 mx-auto mb-1 text-emerald-400" />
                      <span className="block text-[11px]">SWIFT Wire Transfer</span>
                    </button>
                  </div>

                  {/* Channel Details */}
                  {paymentRailCategory === 'CRYPTO' && (
                    <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-amber-400 font-bold text-xs">Select Crypto Asset</span>
                        <select
                          value={cryptoCoin}
                          onChange={(e) => setCryptoCoin(e.target.value as any)}
                          className="bg-slate-900 border border-slate-800 text-white rounded-xl p-1.5 text-xs font-bold"
                        >
                          <option value="USDT_TRC20">USDT (TRON TRC-20)</option>
                          <option value="USDT_ERC20">USDT (Ethereum ERC-20)</option>
                          <option value="USDC_SOL">USDC (Solana SPL)</option>
                          <option value="BTC">Bitcoin (BTC)</option>
                          <option value="ETH">Ethereum (ETH)</option>
                        </select>
                      </div>

                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between">
                        <div className="overflow-hidden space-y-0.5">
                          <span className="text-[10px] text-slate-400 block">{walletAddresses[cryptoCoin]?.network}</span>
                          <span className="text-xs text-sky-300 font-mono font-bold truncate block">{walletAddresses[cryptoCoin]?.address}</span>
                        </div>
                        <button
                          type="button"
                          onClick={handleCopyWallet}
                          className="px-3 py-1.5 rounded-lg bg-sky-500/20 text-sky-300 border border-sky-500/30 text-[10px] font-bold shrink-0 ml-2"
                        >
                          {copiedWallet ? '✓ COPIED' : 'COPY'}
                        </button>
                      </div>
                    </div>
                  )}

                  {paymentRailCategory === 'CARD' && (
                    <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="text-[10px] text-slate-400 block">16-Digit Card Number</label>
                          <input
                            type="text"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-white font-bold"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-slate-400 block">Cardholder Name</label>
                          <input
                            type="text"
                            value={cardHolder}
                            onChange={(e) => setCardHolder(e.target.value)}
                            className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-white font-bold uppercase"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-slate-400 block">Expiry (MM/YY)</label>
                          <input
                            type="text"
                            value={cardExpiry}
                            onChange={(e) => setCardExpiry(e.target.value)}
                            className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-white font-bold"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-slate-400 block">CVC / CVV Security Code</label>
                          <input
                            type="password"
                            maxLength={4}
                            value={cardCvc}
                            onChange={(e) => setCardCvc(e.target.value)}
                            className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-white font-bold"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentRailCategory === 'UPI_WALLET' && (
                    <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
                      <div>
                        <label className="text-[10px] text-slate-400 block">VPA / BHIM UPI ID</label>
                        <input
                          type="text"
                          value={upiId}
                          onChange={(e) => setUpiId(e.target.value)}
                          placeholder="username@upi or mobile@paytm"
                          className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-teal-300 font-bold"
                        />
                      </div>
                      <p className="text-[10px] text-slate-400">
                        Supports Google Pay, PhonePe, Paytm, BHIM UPI, Apple Pay, and PayPal.
                      </p>
                    </div>
                  )}

                  {paymentRailCategory === 'SWIFT_BANK' && (
                    <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-2 text-[11px]">
                      <div className="flex justify-between border-b border-slate-800 pb-1.5">
                        <span className="text-slate-400">Beneficiary Bank:</span>
                        <span className="font-bold text-white">OceanBird Maritime Banking LLC</span>
                      </div>
                      <div className="flex justify-between border-b border-slate-800 pb-1.5">
                        <span className="text-slate-400">SWIFT / BIC Code:</span>
                        <span className="font-bold text-sky-300">OBRDUS33XXX</span>
                      </div>
                      <div className="flex justify-between border-b border-slate-800 pb-1.5">
                        <span className="text-slate-400">IBAN / Account:</span>
                        <span className="font-bold text-emerald-300">US99 OBRD 0019 2841 0928</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Submit Payment Action */}
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-400 hover:from-emerald-400 hover:to-emerald-300 text-slate-950 font-black text-xs uppercase transition-all shadow-xl shadow-emerald-500/20 flex items-center justify-center space-x-2 border border-emerald-300/40"
                >
                  {isProcessing ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>PROCESSING PAYMENT... ({processingProgress}%)</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4 fill-slate-950" />
                      <span>PAY NOW {formatPrice(amountUSD)}</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Right Column Summary */}
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl font-mono text-xs">
              <h3 className="text-sm font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-3">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Gateway Protection Guarantees</span>
              </h3>

              <div className="space-y-3 text-slate-300 font-sans text-xs">
                <div className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Zero Foreign FX Surcharges:</strong> Real-time conversion across 180 currencies with zero hidden markups.</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Instant Settlement PDF:</strong> Download certified Tax Invoices directly after every completed checkout.</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>IMO / ICAO Compliance:</strong> Formatted for aviation authority and port customs audit standards.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 2: TRANSACTION LEDGER ================= */}
      {portalTab === 'TRANSACTION_HISTORY' && (
        <div className="space-y-6 animate-fadeIn font-mono text-xs">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="space-y-1">
                <h2 className="text-xl font-bold text-white flex items-center space-x-2">
                  <History className="w-5 h-5 text-sky-400" />
                  <span>Payment Gateway Transaction Ledger</span>
                </h2>
                <p className="text-slate-400 text-xs">
                  Historical log of completed payments, e-Visa receipts, ticket checkouts, and port customs settlements.
                </p>
              </div>

              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold">
                ● AUDITED LEDGER
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 text-[10px] uppercase">
                    <th className="p-3">TX ID & Date</th>
                    <th className="p-3">Invoice Ref</th>
                    <th className="p-3">Category</th>
                    <th className="p-3">Payer Name</th>
                    <th className="p-3">Amount</th>
                    <th className="p-3">Payment Rail</th>
                    <th className="p-3 text-right">Receipt PDF</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {transactions.map((tx) => (
                    <tr key={tx.id} className="hover:bg-slate-950/50 transition-all">
                      <td className="p-3">
                        <span className="text-sky-300 font-bold block">{tx.id}</span>
                        <span className="text-slate-500 text-[10px]">{tx.timestamp}</span>
                      </td>
                      <td className="p-3 text-white font-bold">{tx.invoiceRef}</td>
                      <td className="p-3 text-amber-300 font-medium">{tx.serviceCategory}</td>
                      <td className="p-3 text-slate-200">{tx.payerName}</td>
                      <td className="p-3 text-emerald-400 font-bold">{formatPrice(tx.amountUSD)}</td>
                      <td className="p-3 text-teal-300 text-[11px]">{tx.paymentRail}</td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() => handleDownloadReceiptPdf(tx)}
                          className="px-3 py-1.5 rounded-xl bg-sky-500/20 text-sky-300 hover:bg-sky-500 hover:text-slate-950 border border-sky-500/30 text-[10px] font-bold transition-all inline-flex items-center space-x-1"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>PDF</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 3: GATEWAY SECURITY & COMPLIANCE ================= */}
      {portalTab === 'GATEWAY_SECURITY' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn font-mono text-xs">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
            <h3 className="text-base font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-3">
              <Lock className="w-5 h-5 text-emerald-400" />
              <span>PCI-DSS Level 1 & SSL Encryption</span>
            </h3>
            <p className="text-slate-300 font-sans leading-relaxed text-xs">
              All credit card tokenization, UPI transactions, and banking payloads are protected with end-to-end 256-Bit SSL encryption complying with PCI-DSS Level 1 aviation and maritime financial standards.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
            <h3 className="text-base font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-3">
              <ShieldCheck className="w-5 h-5 text-amber-400" />
              <span>Blockchain Cryptographic Settlement</span>
            </h3>
            <p className="text-slate-300 font-sans leading-relaxed text-xs">
              Stablecoin transactions in USDT & USDC utilize immutable smart contract verification on TRON and Solana high-throughput blockchains for zero-friction cross-border settlements.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
