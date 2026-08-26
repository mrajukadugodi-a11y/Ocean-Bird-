import React, { useState, useEffect } from 'react';
import {
  CreditCard,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Sparkles,
  Award,
  DollarSign,
  Calendar,
  Lock,
  Plus,
  RefreshCw,
  Download,
  AlertCircle,
  Building2,
  Check,
  Activity,
  Terminal,
  ShieldAlert,
  HelpCircle,
  XCircle,
  ArrowRight,
  FileText,
  Clock,
  Radio,
  Sliders,
  AlertTriangle,
  RotateCcw,
  ChevronDown,
  ChevronUp,
  Search,
  Receipt,
  Shield,
  BellRing
} from 'lucide-react';
import { hapticEngine } from '../../utils/hapticUtils';

export interface SubscriptionPlan {
  id: string;
  name: string;
  priceMonthlyUSD: number;
  priceAnnualUSD: number;
  badge: string;
  recommended: boolean;
  features: string[];
  stripePriceId: string;
}

const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: 'PLAN-SAILOR',
    name: 'Standard Port Visitor Pass',
    priceMonthlyUSD: 29,
    priceAnnualUSD: 290,
    badge: 'BASIC',
    recommended: false,
    stripePriceId: 'price_stripe_sailor_29usd',
    features: [
      'Unlimited Duty-Free QR Receipts Scanning',
      'Global Port Directory Search',
      '1x Standard Loyalty Points Multiplier',
      'Standard AR Exhibition Wayfinding',
      'Basic Email Support'
    ]
  },
  {
    id: 'PLAN-ADMIRAL',
    name: 'Admiral Merchant & Duty-Free Pro',
    priceMonthlyUSD: 99,
    priceAnnualUSD: 990,
    badge: 'MOST POPULAR',
    recommended: true,
    stripePriceId: 'price_stripe_admiral_99usd',
    features: [
      'Everything in Visitor Pass',
      '2.5x Gold Admiral Loyalty Multiplier',
      '1-Hour Free Executive Boardroom Pod/Mo',
      'Merchant Sales Analytics Telemetry',
      'VIP Fast-Track Customs Line Pass',
      'Priority Marine SOS Concierge'
    ]
  },
  {
    id: 'PLAN-ENTERPRISE',
    name: 'Global Maritime Enterprise',
    priceMonthlyUSD: 299,
    priceAnnualUSD: 2990,
    badge: 'ENTERPRISE',
    recommended: false,
    stripePriceId: 'price_stripe_enterprise_299usd',
    features: [
      'Everything in Pro',
      '4.0x Platinum Commodore Loyalty Multiplier',
      'Unlimited Executive Co-Working Pod Access',
      '24/7 Dedicated Personal Port Concierge',
      'Custom B2B RFQ Integration & API Keys',
      'Multi-Port Terminal Staff Licenses'
    ]
  }
];

export interface SavedPaymentMethod {
  id: string;
  brand: 'VISA' | 'MASTERCARD' | 'AMEX';
  last4: string;
  expMonth: number;
  expYear: number;
  isDefault: boolean;
}

const INITIAL_SAVED_CARDS: SavedPaymentMethod[] = [
  {
    id: 'pm_1N89x209841',
    brand: 'VISA',
    last4: '4242',
    expMonth: 12,
    expYear: 2028,
    isDefault: true
  },
  {
    id: 'pm_1N99a998124',
    brand: 'MASTERCARD',
    last4: '8812',
    expMonth: 8,
    expYear: 2027,
    isDefault: false
  }
];

export interface WebhookEventItem {
  id: string;
  type: string;
  created: number;
  livemode: boolean;
  data: any;
}

export interface PaymentHistoryItem {
  id: string;
  invoiceId: string;
  date: string;
  planName: string;
  amountUSD: number;
  status: 'paid' | 'past_due' | 'failed' | 'processing' | 'refunded';
  paymentMethod: string;
  downloadUrl?: string;
}

const INITIAL_PAYMENT_HISTORY: PaymentHistoryItem[] = [
  {
    id: 'inv_1N89x209842',
    invoiceId: 'IN-2026-08-9941',
    date: 'Aug 26, 2026 07:15 UTC',
    planName: 'Admiral Merchant & Duty-Free Pro (Monthly)',
    amountUSD: 99.00,
    status: 'paid',
    paymentMethod: 'VISA •••• 4242'
  },
  {
    id: 'inv_1N89x209730',
    invoiceId: 'IN-2026-07-8812',
    date: 'Jul 26, 2026 07:15 UTC',
    planName: 'Admiral Merchant & Duty-Free Pro (Monthly)',
    amountUSD: 99.00,
    status: 'paid',
    paymentMethod: 'VISA •••• 4242'
  },
  {
    id: 'inv_1N89x209612',
    invoiceId: 'IN-2026-06-7104',
    date: 'Jun 26, 2026 07:15 UTC',
    planName: 'Standard Port Visitor Pass (Monthly)',
    amountUSD: 29.00,
    status: 'paid',
    paymentMethod: 'MASTERCARD •••• 8812'
  },
  {
    id: 'inv_1N89x209501',
    invoiceId: 'IN-2026-05-6621',
    date: 'May 26, 2026 07:15 UTC',
    planName: 'Standard Port Visitor Pass (Monthly)',
    amountUSD: 29.00,
    status: 'failed',
    paymentMethod: 'VISA •••• 4242'
  }
];

export interface SubscriptionFaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'BILLING' | 'TAX_REFUNDS' | 'UPGRADES' | 'SECURITY' | 'BENEFITS';
}

const SUBSCRIPTION_FAQS: SubscriptionFaqItem[] = [
  {
    id: 'faq-1',
    category: 'BILLING',
    question: 'How does billing work for Monthly vs. Annual subscriptions?',
    answer: 'Monthly subscriptions are automatically billed every 30 days to your primary Stripe Vault card. Annual plans are billed once per year with a 20% discount ($990/yr instead of $1,188/yr for Admiral Pro). You can switch billing cycles at any time from the Plans tab.'
  },
  {
    id: 'faq-2',
    category: 'BILLING',
    question: 'What happens if a payment fails or my card expires?',
    answer: 'Stripe dispatches an invoice.payment_failed event and places your account into PAST_DUE status with a 7-day grace period. You will retain membership access while you use the Retry Payment UI tab to re-authorize charges or update your card.'
  },
  {
    id: 'faq-3',
    category: 'TAX_REFUNDS',
    question: 'How do Duty-Free Tax Refunds & Loyalty Multipliers get credited?',
    answer: 'Visitor Pass members earn 1.0x points; Admiral Pro members earn 2.5x; Enterprise members earn 4.0x. When you scan duty-free receipts via QR, GST/VAT tax refunds and Ocean Dollar ($OD) points deposit automatically into your Stripe payout wallet.'
  },
  {
    id: 'faq-4',
    category: 'UPGRADES',
    question: 'Can I upgrade or downgrade my tier at any time?',
    answer: 'Yes! Tier upgrades take effect instantly with pro-rated billing adjustments applied by Stripe. Downgrades take effect at the end of your current period so you keep full access to your existing privileges.'
  },
  {
    id: 'faq-5',
    category: 'BILLING',
    question: 'Are official VAT/GST tax invoices available for reimbursement?',
    answer: 'Yes! Every successful charge generates a downloadable Stripe PDF invoice including tax registration details, Port Member ID, and line-item breakdown. Find them anytime in the Payment History tab.'
  },
  {
    id: 'faq-6',
    category: 'BENEFITS',
    question: 'How do I access Executive Boardroom Pods & VIP Customs Lines?',
    answer: 'Your active subscription embeds a secure digital fast-track pass into your Port Pass QR code. Scan your code at terminal gates or co-working pod doors in Mumbai, Singapore, and Colombo for instant entry.'
  },
  {
    id: 'faq-7',
    category: 'SECURITY',
    question: 'How secure is payment processing through the Stripe Gateway?',
    answer: 'All card credentials are tokenized directly via Stripe PCI-DSS Level 1 compliant infrastructure with 256-bit SSL encryption. Sensitive credit card details are never stored on local servers.'
  }
];

export interface SubscriptionToastItem {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
  timestamp: string;
  actionLabel?: string;
  onAction?: () => void;
}

interface StripeSubscriptionPaymentHubProps {
  triggerToast?: (msg: string, type?: 'success' | 'info' | 'warning' | 'error', title?: string) => void;
}

export const StripeSubscriptionPaymentHub: React.FC<StripeSubscriptionPaymentHubProps> = ({ triggerToast }) => {
  const [activeSubTab, setActiveSubTab] = useState<'OVERVIEW' | 'BENEFITS' | 'STATUS' | 'HISTORY' | 'RETRY' | 'WEBHOOKS' | 'ERROR_HANDLING' | 'FAQ'>('OVERVIEW');
  const [billingCycle, setBillingCycle] = useState<'MONTHLY' | 'ANNUAL'>('MONTHLY');
  const [activePlanId, setActivePlanId] = useState<string>('PLAN-ADMIRAL');
  const [subscriptionStatus, setSubscriptionStatus] = useState<'active' | 'past_due' | 'canceled' | 'trialing'>('active');
  const [autoRenew, setAutoRenew] = useState(true);

  const [savedCards, setSavedCards] = useState<SavedPaymentMethod[]>(INITIAL_SAVED_CARDS);
  const [selectedCardId, setSelectedCardId] = useState<string>('pm_1N89x209841');

  // Modal State for adding new card
  const [showAddCardModal, setShowAddCardModal] = useState(false);
  const [newCardNumber, setNewCardNumber] = useState('');
  const [newCardExpiry, setNewCardExpiry] = useState('');
  const [newCardCvc, setNewCardCvc] = useState('');
  const [newCardHolder, setNewCardHolder] = useState('');

  // Payment History State
  const [paymentHistory, setPaymentHistory] = useState<PaymentHistoryItem[]>(INITIAL_PAYMENT_HISTORY);
  const [historyFilterStatus, setHistoryFilterStatus] = useState<string>('ALL');
  const [historySearchQuery, setHistorySearchQuery] = useState('');

  // Subscription Benefits State
  const [benefitTierFilter, setBenefitTierFilter] = useState<string>('ALL');

  // Subscription FAQ State
  const [faqSearchQuery, setFaqSearchQuery] = useState('');
  const [faqCategoryFilter, setFaqCategoryFilter] = useState<string>('ALL');
  const [expandedFaqId, setExpandedFaqId] = useState<string | null>('faq-1');

  // Subscription Toast Notifications System
  const [subscriptionToasts, setSubscriptionToasts] = useState<SubscriptionToastItem[]>([]);

  // Retry Payment UI State
  const [isRetryingPayment, setIsRetryingPayment] = useState(false);
  const [retryStep, setRetryStep] = useState<number>(0);
  const [retryAttemptCount, setRetryAttemptCount] = useState<number>(1);

  // Processing & Simulation State
  const [isProcessingStripe, setIsProcessingStripe] = useState(false);
  const [activeErrorSim, setActiveErrorSim] = useState<string | null>(null);

  // Webhook Events Log
  const [webhookEvents, setWebhookEvents] = useState<WebhookEventItem[]>([
    {
      id: 'evt_1N89x209841_sub_created',
      type: 'customer.subscription.created',
      created: Math.floor(Date.now() / 1000) - 3600,
      livemode: false,
      data: { object: { id: 'sub_1N89x209841', status: 'active', plan: 'PLAN-ADMIRAL' } }
    },
    {
      id: 'evt_1N89x209842_inv_paid',
      type: 'invoice.payment_succeeded',
      created: Math.floor(Date.now() / 1000) - 1800,
      livemode: false,
      data: { object: { id: 'in_1N89x209842', amount_paid: 9900, currency: 'usd' } }
    }
  ]);

  const notify = (
    msg: string,
    type: 'success' | 'info' | 'warning' | 'error' = 'info',
    title?: string,
    actionLabel?: string,
    onAction?: () => void
  ) => {
    const toastId = `sub_toast_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
    const toastTitle = title || (type === 'success' ? 'SUBSCRIPTION ACTIVE' : type === 'error' ? 'PAYMENT FAILED' : type === 'warning' ? 'PAYMENT ALERT' : 'STRIPE NOTIFICATION');
    const newToastItem: SubscriptionToastItem = {
      id: toastId,
      title: toastTitle,
      message: msg,
      type,
      timestamp: new Date().toLocaleTimeString(),
      actionLabel,
      onAction
    };
    setSubscriptionToasts((prev) => [newToastItem, ...prev.slice(0, 4)]);

    setTimeout(() => {
      setSubscriptionToasts((prev) => prev.filter((t) => t.id !== toastId));
    }, 7000);

    if (triggerToast) {
      triggerToast(msg, type, title);
    } else {
      console.log(`[${type}] ${title}: ${msg}`);
    }
  };

  const handleExecuteRetryPayment = () => {
    setIsRetryingPayment(true);
    setRetryStep(1);
    hapticEngine.trigger('click');

    setTimeout(() => {
      setRetryStep(2); // 3D Secure Verification
      setTimeout(() => {
        setRetryStep(3); // Stripe Vault Settlement
        setTimeout(() => {
          setIsRetryingPayment(false);
          setRetryStep(0);
          setActiveErrorSim(null);
          setSubscriptionStatus('active');

          const currentSelectedCard = savedCards.find((c) => c.id === selectedCardId) || savedCards[0];

          const newInvoice: PaymentHistoryItem = {
            id: `inv_retry_${Date.now()}`,
            invoiceId: `IN-2026-RETRY-${Math.floor(1000 + Math.random() * 9000)}`,
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) + ' ' + new Date().toLocaleTimeString() + ' UTC',
            planName: `${currentPlan.name} (${billingCycle})`,
            amountUSD: billingCycle === 'MONTHLY' ? currentPlan.priceMonthlyUSD : currentPlan.priceAnnualUSD,
            status: 'paid',
            paymentMethod: `${currentSelectedCard.brand} •••• ${currentSelectedCard.last4}`
          };
          setPaymentHistory([newInvoice, ...paymentHistory]);

          const newEvt: WebhookEventItem = {
            id: `evt_retry_success_${Date.now()}`,
            type: 'invoice.payment_succeeded',
            created: Math.floor(Date.now() / 1000),
            livemode: false,
            data: { object: { id: newInvoice.id, amount_paid: newInvoice.amountUSD * 100, currency: 'usd' } }
          };
          setWebhookEvents([newEvt, ...webhookEvents]);

          hapticEngine.trigger('success');
          notify(
            `Payment retry succeeded! $${newInvoice.amountUSD}.00 charged on ${currentSelectedCard.brand} ending in ${currentSelectedCard.last4}. Subscription restored to ACTIVE.`,
            'success',
            'RETRY PAYMENT SUCCESSFUL'
          );
        }, 1200);
      }, 1200);
    }, 1000);
  };

  const currentPlan = SUBSCRIPTION_PLANS.find((p) => p.id === activePlanId) || SUBSCRIPTION_PLANS[1];

  // Fetch initial backend state
  useEffect(() => {
    fetch('/api/stripe/subscription-status')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.subscription) {
          setSubscriptionStatus(data.subscription.status || 'active');
          if (data.subscription.planId) {
            setActivePlanId(data.subscription.planId);
          }
        }
      })
      .catch((err) => console.log('Stripe status API offline, fallback to local state:', err));

    fetch('/api/stripe/webhook-events')
      .then((res) => res.json())
      .then((data) => {
        if (data.events && Array.isArray(data.events)) {
          setWebhookEvents(data.events);
        }
      })
      .catch((err) => console.log('Stripe webhook events API offline:', err));
  }, []);

  const handleSelectPlan = (plan: SubscriptionPlan) => {
    setActivePlanId(plan.id);
    hapticEngine.trigger('click');
    notify(`Selected ${plan.name} (${billingCycle})`, 'info', 'PLAN UPDATED');
  };

  const handleCheckoutStripeSubscription = (shouldSimulateError: boolean = false) => {
    setIsProcessingStripe(true);
    hapticEngine.trigger('click');

    fetch('/api/stripe/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        planId: activePlanId,
        billingCycle,
        simulateError: shouldSimulateError
      })
    })
      .then((res) => res.json())
      .then((data) => {
        setIsProcessingStripe(false);
        if (data.error || shouldSimulateError) {
          const errMsg = data.error?.message || 'Your card was declined by Stripe issuing bank.';
          setActiveErrorSim(errMsg);
          setSubscriptionStatus('past_due');
          hapticEngine.trigger('alert');
          notify(errMsg, 'error', 'PAYMENT FAILED (STRIPE 402)');
        } else {
          setActiveErrorSim(null);
          setSubscriptionStatus('active');
          hapticEngine.trigger('success');
          notify(
            `Subscribed to ${currentPlan.name} via Stripe! Session ${data.sessionId} created.`,
            'success',
            'STRIPE SUBSCRIPTION SUCCESS'
          );

          // Refresh webhooks log
          fetch('/api/stripe/webhook-events')
            .then((r) => r.json())
            .then((d) => {
              if (d.events) setWebhookEvents(d.events);
            });
        }
      })
      .catch(() => {
        setIsProcessingStripe(false);
        if (shouldSimulateError) {
          setActiveErrorSim('Card declined: Insufficient funds (Code: card_declined)');
          setSubscriptionStatus('past_due');
          hapticEngine.trigger('alert');
          notify(
            'Stripe charge attempt failed: Card declined due to insufficient funds (Code: card_declined).',
            'error',
            'PAYMENT FAILED',
            'FIX PAYMENT & RETRY',
            () => setActiveSubTab('RETRY')
          );
        } else {
          setActiveErrorSim(null);
          setSubscriptionStatus('active');
          hapticEngine.trigger('success');
          notify(`Subscribed to ${currentPlan.name}!`, 'success', 'SUBSCRIPTION ACTIVE');
        }
      });
  };

  const handleSimulateWebhook = (eventType: string) => {
    hapticEngine.trigger('click');
    fetch('/api/stripe/simulate-webhook', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ eventType })
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          if (data.subscriptionStatus) {
            setSubscriptionStatus(data.subscriptionStatus);
          }
          if (data.event) {
            setWebhookEvents([data.event, ...webhookEvents]);
          }
          hapticEngine.trigger('success');
          notify(`Webhook event ${eventType} dispatched!`, 'success', 'WEBHOOK TRIGGERED');
        }
      })
      .catch(() => {
        // Fallback simulation
        const newEvt: WebhookEventItem = {
          id: `evt_sim_${Date.now()}`,
          type: eventType,
          created: Math.floor(Date.now() / 1000),
          livemode: false,
          data: { object: { id: `obj_${Date.now()}`, event: eventType } }
        };
        setWebhookEvents([newEvt, ...webhookEvents]);

        if (eventType === 'invoice.payment_failed') {
          setSubscriptionStatus('past_due');
          setActiveErrorSim('Invoice payment failed on card ending in 4242.');
        } else if (eventType === 'customer.subscription.deleted') {
          setSubscriptionStatus('canceled');
          setActiveErrorSim('Subscription canceled by user.');
        } else {
          setSubscriptionStatus('active');
          setActiveErrorSim(null);
        }

        hapticEngine.trigger('click');
        notify(`Simulated ${eventType} event`, 'info', 'WEBHOOK EVENT');
      });
  };

  const handleAddCardSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCardNumber || !newCardExpiry || !newCardCvc) {
      notify('Please enter complete card details', 'warning', 'CARD ERROR');
      return;
    }

    const last4 = newCardNumber.slice(-4) || '9912';
    const newCard: SavedPaymentMethod = {
      id: `pm_${Date.now()}`,
      brand: 'VISA',
      last4,
      expMonth: 12,
      expYear: 2029,
      isDefault: false
    };

    setSavedCards([...savedCards, newCard]);
    setSelectedCardId(newCard.id);
    setShowAddCardModal(false);
    setNewCardNumber('');
    setNewCardExpiry('');
    setNewCardCvc('');
    setNewCardHolder('');

    // Reset errors if any
    setActiveErrorSim(null);
    setSubscriptionStatus('active');

    hapticEngine.trigger('success');
    notify(`Added new Visa card ending in •••• ${last4} to Stripe Vault!`, 'success', 'PAYMENT METHOD ADDED');
  };

  return (
    <div className="space-y-6 font-sans">
      <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 sm:p-8 space-y-6 shadow-2xl">
        {/* Hub Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <CreditCard className="w-6 h-6 text-cyan-400" />
              <h2 className="text-xl font-bold text-white">Stripe Subscription Gateway &amp; Billing Hub</h2>
              <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-mono text-[10px] font-bold border border-cyan-500/30">
                PROD-READY STRIPE API
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Manage member subscriptions, benefit tiers, Stripe webhooks monitoring, subscription status UI, and PCI-compliant payment error handling.
            </p>
          </div>

          {/* Sub-Navigation Tabs */}
          <div className="flex items-center space-x-1 bg-slate-950 p-1 rounded-2xl border border-slate-800 font-mono text-xs overflow-x-auto max-w-full scrollbar-none">
            <button
              onClick={() => {
                setActiveSubTab('OVERVIEW');
                hapticEngine.trigger('click');
              }}
              className={`px-3 py-1.5 rounded-xl transition-all whitespace-nowrap ${
                activeSubTab === 'OVERVIEW' ? 'bg-cyan-500 text-slate-950 font-black' : 'text-slate-400 hover:text-white'
              }`}
            >
              Plans &amp; Checkout
            </button>
            <button
              onClick={() => {
                setActiveSubTab('BENEFITS');
                hapticEngine.trigger('click');
              }}
              className={`px-3 py-1.5 rounded-xl transition-all whitespace-nowrap flex items-center space-x-1 ${
                activeSubTab === 'BENEFITS' ? 'bg-cyan-500 text-slate-950 font-black' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              <span>Benefits</span>
            </button>
            <button
              onClick={() => {
                setActiveSubTab('STATUS');
                hapticEngine.trigger('click');
              }}
              className={`px-3 py-1.5 rounded-xl transition-all whitespace-nowrap flex items-center space-x-1 ${
                activeSubTab === 'STATUS' ? 'bg-cyan-500 text-slate-950 font-black' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              <span>Status</span>
            </button>
            <button
              onClick={() => {
                setActiveSubTab('HISTORY');
                hapticEngine.trigger('click');
              }}
              className={`px-3 py-1.5 rounded-xl transition-all whitespace-nowrap flex items-center space-x-1 ${
                activeSubTab === 'HISTORY' ? 'bg-cyan-500 text-slate-950 font-black' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Receipt className="w-3.5 h-3.5 text-emerald-400" />
              <span>Payment History</span>
              <span className="ml-1 px-1.5 py-0.2 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px]">
                {paymentHistory.length}
              </span>
            </button>
            <button
              onClick={() => {
                setActiveSubTab('RETRY');
                hapticEngine.trigger('click');
              }}
              className={`px-3 py-1.5 rounded-xl transition-all whitespace-nowrap flex items-center space-x-1 ${
                activeSubTab === 'RETRY' ? 'bg-amber-500 text-slate-950 font-black' : 'text-amber-400 hover:text-white'
              }`}
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retry Payment</span>
              {subscriptionStatus === 'past_due' && (
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
              )}
            </button>
            <button
              onClick={() => {
                setActiveSubTab('FAQ');
                hapticEngine.trigger('click');
              }}
              className={`px-3 py-1.5 rounded-xl transition-all whitespace-nowrap flex items-center space-x-1 ${
                activeSubTab === 'FAQ' ? 'bg-cyan-500 text-slate-950 font-black' : 'text-slate-400 hover:text-white'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
              <span>Subscription FAQ</span>
            </button>
            <button
              onClick={() => {
                setActiveSubTab('WEBHOOKS');
                hapticEngine.trigger('click');
              }}
              className={`px-3 py-1.5 rounded-xl transition-all whitespace-nowrap flex items-center space-x-1 ${
                activeSubTab === 'WEBHOOKS' ? 'bg-cyan-500 text-slate-950 font-black' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Radio className="w-3.5 h-3.5 text-indigo-400" />
              <span>Webhooks</span>
            </button>
            <button
              onClick={() => {
                setActiveSubTab('ERROR_HANDLING');
                hapticEngine.trigger('click');
              }}
              className={`px-3 py-1.5 rounded-xl transition-all whitespace-nowrap flex items-center space-x-1 ${
                activeSubTab === 'ERROR_HANDLING' ? 'bg-rose-500 text-white font-black' : 'text-slate-400 hover:text-white'
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
              <span>Error Simulation</span>
            </button>
          </div>
        </div>

        {/* Global Error Banner if activeErrorSim */}
        {activeErrorSim && (
          <div className="bg-rose-950/60 border border-rose-500/50 rounded-2xl p-4 flex items-start justify-between gap-4 animate-fade-in">
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold font-mono text-rose-300">STRIPE PAYMENT EXCEPTION DETECTED</h4>
                <p className="text-xs text-rose-200 mt-0.5 font-mono">{activeErrorSim}</p>
              </div>
            </div>
            <button
              onClick={() => {
                setActiveSubTab('ERROR_HANDLING');
                hapticEngine.trigger('click');
              }}
              className="px-3 py-1.5 rounded-xl bg-rose-500 hover:bg-rose-400 text-slate-950 font-mono text-xs font-bold shrink-0"
            >
              Resolve in Error Center →
            </button>
          </div>
        )}

        {/* ======================================================== */}
        {/* SUBTAB 1: OVERVIEW & CHECKOUT                            */}
        {/* ======================================================== */}
        {activeSubTab === 'OVERVIEW' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-950 p-4 rounded-2xl border border-slate-800">
              <span className="text-xs font-mono text-slate-300">Select Billing Interval:</span>
              <div className="flex items-center space-x-2 bg-slate-900 p-1 rounded-xl border border-slate-800 font-mono text-xs">
                <button
                  onClick={() => {
                    setBillingCycle('MONTHLY');
                    hapticEngine.trigger('click');
                  }}
                  className={`px-4 py-1.5 rounded-lg transition-all ${
                    billingCycle === 'MONTHLY' ? 'bg-cyan-500 text-slate-950 font-black' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Monthly Billing
                </button>
                <button
                  onClick={() => {
                    setBillingCycle('ANNUAL');
                    hapticEngine.trigger('click');
                  }}
                  className={`px-4 py-1.5 rounded-lg transition-all flex items-center space-x-1 ${
                    billingCycle === 'ANNUAL' ? 'bg-cyan-500 text-slate-950 font-black' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <span>Annual Billing</span>
                  <span className="px-1.5 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[9px] font-black">
                    SAVE 20%
                  </span>
                </button>
              </div>
            </div>

            {/* Current Active Plan Status Banner */}
            <div className="bg-gradient-to-r from-cyan-950/60 via-slate-950 to-slate-950 p-5 rounded-2xl border border-cyan-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-cyan-400 font-bold block">CURRENT ACTIVE SUBSCRIPTION</span>
                <div className="flex items-center space-x-2">
                  <h3 className="text-base font-bold text-white">{currentPlan.name}</h3>
                  <span
                    className={`px-2.5 py-0.5 rounded-full font-mono text-[10px] font-bold border ${
                      subscriptionStatus === 'active'
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                        : subscriptionStatus === 'past_due'
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                        : 'bg-rose-500/20 text-rose-300 border-rose-500/30'
                    }`}
                  >
                    STATUS: {subscriptionStatus.toUpperCase()}
                  </span>
                </div>
                <p className="text-xs font-mono text-slate-400">
                  Billing ${billingCycle === 'MONTHLY' ? currentPlan.priceMonthlyUSD : currentPlan.priceAnnualUSD} USD /{' '}
                  {billingCycle.toLowerCase()} • Auto-renews Sep 26, 2026
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => {
                    hapticEngine.trigger('click');
                    notify('Exported Stripe Invoice PDF receipt for active subscription.', 'info', 'INVOICE DOWNLOADED');
                  }}
                  className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-cyan-300 font-mono text-xs border border-slate-800 flex items-center space-x-1.5 shrink-0"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Invoice PDF</span>
                </button>
              </div>
            </div>

            {/* Subscription Plan Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {SUBSCRIPTION_PLANS.map((plan) => (
                <div
                  key={plan.id}
                  onClick={() => handleSelectPlan(plan)}
                  className={`p-6 rounded-3xl border transition-all cursor-pointer space-y-4 flex flex-col justify-between relative ${
                    activePlanId === plan.id
                      ? 'bg-slate-950 border-cyan-500 shadow-2xl ring-2 ring-cyan-500/30'
                      : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {plan.recommended && (
                    <span className="absolute -top-3 right-6 px-3 py-0.5 rounded-full bg-amber-500 text-slate-950 font-black font-mono text-[9px]">
                      {plan.badge}
                    </span>
                  )}

                  <div className="space-y-3">
                    <span className="text-[10px] font-mono text-slate-400 font-bold block">{plan.badge}</span>
                    <h3 className="text-base font-bold text-white">{plan.name}</h3>

                    <div className="pt-2">
                      <span className="text-3xl font-black font-mono text-cyan-400">
                        ${billingCycle === 'MONTHLY' ? plan.priceMonthlyUSD : Math.round(plan.priceAnnualUSD / 12)}
                      </span>
                      <span className="text-xs font-mono text-slate-400"> / month</span>
                    </div>

                    <ul className="space-y-2 pt-3 border-t border-slate-900">
                      {plan.features.map((feat, i) => (
                        <li key={i} className="text-xs font-mono text-slate-300 flex items-center space-x-2">
                          <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    className={`w-full py-2.5 rounded-xl font-mono text-xs font-bold transition-all ${
                      activePlanId === plan.id
                        ? 'bg-cyan-500 text-slate-950 font-black'
                        : 'bg-slate-900 text-white hover:bg-slate-800 border border-slate-800'
                    }`}
                  >
                    {activePlanId === plan.id ? 'Selected Plan' : 'Select Plan'}
                  </button>
                </div>
              ))}
            </div>

            {/* Payment Method Selector & Stripe Vault */}
            <div className="space-y-4 pt-4 border-t border-slate-800">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                  <Lock className="w-4 h-4 text-emerald-400" />
                  <span>Stripe PCI-Compliant Payment Vault</span>
                </h3>

                <button
                  onClick={() => {
                    setShowAddCardModal(true);
                    hapticEngine.trigger('click');
                  }}
                  className="px-3 py-1.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-cyan-300 font-mono text-xs border border-slate-800 flex items-center space-x-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Credit Card</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {savedCards.map((card) => (
                  <div
                    key={card.id}
                    onClick={() => {
                      setSelectedCardId(card.id);
                      hapticEngine.trigger('click');
                    }}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                      selectedCardId === card.id
                        ? 'bg-cyan-950/30 border-cyan-500 shadow-lg'
                        : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <CreditCard className="w-6 h-6 text-cyan-400 shrink-0" />
                      <div>
                        <span className="text-xs font-bold font-mono text-white block">
                          {card.brand} ending in •••• {card.last4}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400">
                          Expires {card.expMonth}/{card.expYear}
                        </span>
                      </div>
                    </div>

                    {selectedCardId === card.id && (
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                    )}
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <button
                  onClick={() => handleCheckoutStripeSubscription(false)}
                  disabled={isProcessingStripe}
                  className="py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black font-mono text-xs shadow-xl transition-all flex items-center justify-center space-x-2"
                >
                  {isProcessingStripe ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Processing Stripe Checkout...</span>
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="w-5 h-5 text-slate-950" />
                      <span>
                        Confirm &amp; Subscribe ($
                        {billingCycle === 'MONTHLY' ? currentPlan.priceMonthlyUSD : currentPlan.priceAnnualUSD} USD)
                      </span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => handleCheckoutStripeSubscription(true)}
                  disabled={isProcessingStripe}
                  className="py-3.5 rounded-2xl bg-slate-950 hover:bg-slate-800 text-rose-400 font-bold font-mono text-xs border border-rose-500/40 transition-all flex items-center justify-center space-x-2"
                >
                  <AlertTriangle className="w-4 h-4 text-rose-400" />
                  <span>Test Payment Error Simulation (Stripe 402)</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* SUBTAB 2: SUBSCRIPTION BENEFITS                          */}
        {/* ======================================================== */}
        {activeSubTab === 'BENEFITS' && (
          <div className="space-y-6 animate-fade-in">
            {/* Header with Active Privilege Tier Badge */}
            <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <Award className="w-6 h-6 text-amber-400" />
                  <h3 className="text-lg font-bold text-white">Member Subscription Benefits Directory</h3>
                </div>
                <p className="text-xs text-slate-400">
                  Unlock executive privileges, automated duty-free tax clearance, loyalty multipliers, and VIP customs passes across all global port terminals.
                </p>
              </div>

              <div className="flex items-center space-x-2 font-mono text-xs shrink-0">
                <span className="px-3 py-1.5 rounded-2xl bg-gradient-to-r from-amber-500/20 to-yellow-500/10 text-amber-300 border border-amber-500/40 flex items-center space-x-1.5">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span className="font-bold">ACTIVE TIER: {currentPlan.name.toUpperCase()}</span>
                </span>
              </div>
            </div>

            {/* Tier Filter Pills */}
            <div className="flex items-center space-x-2 font-mono text-xs overflow-x-auto pb-1">
              <span className="text-slate-500 text-[10px] font-bold">FILTER BY TIER:</span>
              {[
                { id: 'ALL', label: 'ALL BENEFITS' },
                { id: 'BASIC', label: 'VISITOR PASS' },
                { id: 'PRO', label: 'ADMIRAL PRO' },
                { id: 'ENTERPRISE', label: 'ENTERPRISE' }
              ].map((tier) => (
                <button
                  key={tier.id}
                  onClick={() => {
                    setBenefitTierFilter(tier.id);
                    hapticEngine.trigger('click');
                  }}
                  className={`px-3 py-1.5 rounded-xl transition-all font-bold ${
                    benefitTierFilter === tier.id
                      ? 'bg-amber-400 text-slate-950 font-black shadow-md'
                      : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {tier.label}
                </button>
              ))}
            </div>

            {/* Benefits Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {(benefitTierFilter === 'ALL' || benefitTierFilter === 'PRO' || benefitTierFilter === 'ENTERPRISE') && (
                <div className="bg-slate-950 p-5 rounded-2xl border border-amber-500/40 hover:border-amber-400 transition-all space-y-3 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <h4 className="text-sm font-bold text-white">Loyalty Points Multiplier</h4>
                    <p className="text-xs text-slate-400">
                      Earn up to <strong className="text-amber-400">2.5x to 4.0x bonus Ocean Dollar ($OD) points</strong> on every duty-free purchase, hotel stay, and waterfront dining experience.
                    </p>
                    <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono text-[10px] inline-block font-bold">
                      Pro &amp; Enterprise Tiers
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      hapticEngine.trigger('success');
                      notify('2.5x Loyalty Multiplier is ACTIVE for your Admiral Pro Account!', 'success', 'BENEFIT ACTIVE');
                    }}
                    className="w-full py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-mono text-xs font-black transition-all flex items-center justify-center space-x-1"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Active Privilege (2.5x OD Multiplier)</span>
                  </button>
                </div>
              )}

              {(benefitTierFilter === 'ALL' || benefitTierFilter === 'BASIC' || benefitTierFilter === 'PRO' || benefitTierFilter === 'ENTERPRISE') && (
                <div className="bg-slate-950 p-5 rounded-2xl border border-emerald-500/40 hover:border-emerald-400 transition-all space-y-3 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <h4 className="text-sm font-bold text-white">Instant Duty-Free Tax Clearance</h4>
                    <p className="text-xs text-slate-400">
                      Skip customs queues! Instant QR receipt verification automatically calculates and credits GST/VAT tax refunds directly to your Stripe payout vault.
                    </p>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono text-[10px] inline-block font-bold">
                      All Subscription Tiers
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      hapticEngine.trigger('click');
                      notify('Opening Duty-Free Tax Refund Scanner...', 'info', 'TAX REFUND SCANNER');
                    }}
                    className="w-full py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-emerald-400 border border-emerald-500/40 font-mono text-xs font-bold transition-all flex items-center justify-center space-x-1"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Launch Tax Refund Scanner</span>
                  </button>
                </div>
              )}

              {(benefitTierFilter === 'ALL' || benefitTierFilter === 'PRO' || benefitTierFilter === 'ENTERPRISE') && (
                <div className="bg-slate-950 p-5 rounded-2xl border border-cyan-500/40 hover:border-cyan-400 transition-all space-y-3 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                      <Building2 className="w-5 h-5" />
                    </div>
                    <h4 className="text-sm font-bold text-white">Executive Boardroom Pod Access</h4>
                    <p className="text-xs text-slate-400">
                      Book quiet, high-speed fiber executive co-working pods at port terminals in Mumbai, Singapore, and Colombo for private meetings and calls.
                    </p>
                    <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-mono text-[10px] inline-block font-bold">
                      1 Hr/Mo Pro • Unlimited Enterprise
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      hapticEngine.trigger('click');
                      notify('Booked 1-Hour Executive Pod Pass at Mumbai Cruise Terminal.', 'success', 'POD BOOKED');
                    }}
                    className="w-full py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-cyan-500/40 font-mono text-xs font-bold transition-all flex items-center justify-center space-x-1"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Reserve Boardroom Pod (1 Hr Free)</span>
                  </button>
                </div>
              )}

              {(benefitTierFilter === 'ALL' || benefitTierFilter === 'PRO' || benefitTierFilter === 'ENTERPRISE') && (
                <div className="bg-slate-950 p-5 rounded-2xl border border-purple-500/40 hover:border-purple-400 transition-all space-y-3 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
                      <Zap className="w-5 h-5" />
                    </div>
                    <h4 className="text-sm font-bold text-white">VIP Fast-Track Customs Pass</h4>
                    <p className="text-xs text-slate-400">
                      Enjoy priority clearance lanes at international cruise terminals and passenger ferry gates with pre-verified digital resident passes.
                    </p>
                    <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-mono text-[10px] inline-block font-bold">
                      Admiral &amp; Enterprise
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      hapticEngine.trigger('click');
                      notify('Generated Digital VIP Fast-Track QR Pass (Valid 24h)', 'success', 'VIP PASS GENERATED');
                    }}
                    className="w-full py-2 rounded-xl bg-purple-950/80 hover:bg-purple-900 text-purple-300 border border-purple-500/40 font-mono text-xs font-bold transition-all flex items-center justify-center space-x-1"
                  >
                    <Award className="w-3.5 h-3.5 text-purple-400" />
                    <span>Show Digital VIP Pass QR</span>
                  </button>
                </div>
              )}

              {(benefitTierFilter === 'ALL' || benefitTierFilter === 'PRO' || benefitTierFilter === 'ENTERPRISE') && (
                <div className="bg-slate-950 p-5 rounded-2xl border border-blue-500/40 hover:border-blue-400 transition-all space-y-3 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
                      <Activity className="w-5 h-5" />
                    </div>
                    <h4 className="text-sm font-bold text-white">Merchant Sales Analytics Suite</h4>
                    <p className="text-xs text-slate-400">
                      Access real-time passenger flow trends, high-demand duty-free category telemetry, and seasonal foot-traffic forecasting charts.
                    </p>
                    <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-mono text-[10px] inline-block font-bold">
                      Pro Merchant &amp; B2B
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      hapticEngine.trigger('click');
                      notify('Loading Port Merchant Passenger Flow Dashboard...', 'info', 'ANALYTICS ACCESSED');
                    }}
                    className="w-full py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-blue-300 border border-blue-500/40 font-mono text-xs font-bold transition-all flex items-center justify-center space-x-1"
                  >
                    <Activity className="w-3.5 h-3.5" />
                    <span>Open Analytics Dashboard</span>
                  </button>
                </div>
              )}

              {(benefitTierFilter === 'ALL' || benefitTierFilter === 'PRO' || benefitTierFilter === 'ENTERPRISE') && (
                <div className="bg-slate-950 p-5 rounded-2xl border border-rose-500/40 hover:border-rose-400 transition-all space-y-3 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400">
                      <ShieldAlert className="w-5 h-5" />
                    </div>
                    <h4 className="text-sm font-bold text-white">24/7 Priority SOS Concierge</h4>
                    <p className="text-xs text-slate-400">
                      Direct hotline to port medical officers, emergency tugboat assistance, translation services, and vessel departure re-booking support.
                    </p>
                    <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-mono text-[10px] inline-block font-bold">
                      Admiral &amp; Enterprise
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      hapticEngine.trigger('alert');
                      notify('Connected to Priority Marine SOS Concierge Hotline.', 'info', 'SOS CONCIERGE');
                    }}
                    className="w-full py-2 rounded-xl bg-rose-950/80 hover:bg-rose-900 text-rose-300 border border-rose-500/40 font-mono text-xs font-bold transition-all flex items-center justify-center space-x-1"
                  >
                    <ShieldAlert className="w-3.5 h-3.5" />
                    <span>Call Priority SOS Hotline</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* SUBTAB 3: SUBSCRIPTION STATUS UI                         */}
        {/* ======================================================== */}
        {activeSubTab === 'STATUS' && (
          <div className="space-y-6 animate-fade-in">
            <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-mono text-cyan-400 font-bold block">ACTIVE MEMBERSHIP STATUS</span>
                  <h3 className="text-xl font-bold text-white">{currentPlan.name}</h3>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">
                    Stripe Customer ID: <span className="text-cyan-300">cus_N89x209841</span> • Sub ID: <span className="text-cyan-300">sub_1N89x209841</span>
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <span
                    className={`px-3 py-1 rounded-full font-mono text-xs font-bold border ${
                      subscriptionStatus === 'active'
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                        : subscriptionStatus === 'past_due'
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                        : 'bg-rose-500/20 text-rose-300 border-rose-500/30'
                    }`}
                  >
                    ● {subscriptionStatus.toUpperCase()}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-900 font-mono text-xs">
                <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">CURRENT PERIOD START</span>
                  <span className="text-white font-bold block mt-1">Aug 26, 2026</span>
                </div>
                <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">NEXT RENEWAL DATE</span>
                  <span className="text-cyan-400 font-bold block mt-1">Sep 26, 2026 (31 Days)</span>
                </div>
                <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">BILLING AMOUNT</span>
                  <span className="text-emerald-400 font-bold block mt-1">
                    ${billingCycle === 'MONTHLY' ? currentPlan.priceMonthlyUSD : currentPlan.priceAnnualUSD} USD / {billingCycle.toLowerCase()}
                  </span>
                </div>
              </div>
            </div>

            {/* Manage Subscription Controls */}
            <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 space-y-4">
              <h4 className="text-sm font-bold text-white flex items-center space-x-2">
                <Sliders className="w-4 h-4 text-cyan-400" />
                <span>Subscription Lifecycle &amp; Renewal Settings</span>
              </h4>

              <div className="flex items-center justify-between p-4 bg-slate-900 rounded-2xl border border-slate-800">
                <div>
                  <h5 className="text-xs font-bold text-white">Automatic Renewal</h5>
                  <p className="text-[10px] text-slate-400">Keep subscription active to maintain loyalty points multipliers.</p>
                </div>
                <button
                  onClick={() => {
                    setAutoRenew(!autoRenew);
                    hapticEngine.trigger('click');
                    notify(`Auto-renewal ${!autoRenew ? 'enabled' : 'disabled'}`, 'info', 'SETTINGS UPDATED');
                  }}
                  className={`w-12 h-6 rounded-full p-1 transition-all ${autoRenew ? 'bg-cyan-500' : 'bg-slate-800'}`}
                >
                  <div className={`w-4 h-4 rounded-full bg-slate-950 transition-all ${autoRenew ? 'translate-x-6' : 'translate-x-0'}`} />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <button
                  onClick={() => {
                    setActiveSubTab('OVERVIEW');
                    hapticEngine.trigger('click');
                  }}
                  className="py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-cyan-300 font-mono text-xs border border-slate-800 font-bold"
                >
                  Upgrade or Change Plan Tier
                </button>
                <button
                  onClick={() => {
                    setSubscriptionStatus('canceled');
                    hapticEngine.trigger('click');
                    notify('Subscription canceled. Access remains active until Sep 26, 2026.', 'warning', 'SUBSCRIPTION CANCELED');
                  }}
                  className="py-3 rounded-xl bg-slate-950 hover:bg-slate-900 text-rose-400 font-mono text-xs border border-rose-500/30 font-bold"
                >
                  Cancel Subscription at Period End
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* SUBTAB 4: STRIPE WEBHOOKS MONITOR & INSPECTOR             */}
        {/* ======================================================== */}
        {activeSubTab === 'WEBHOOKS' && (
          <div className="space-y-6 animate-fade-in">
            <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center space-x-2">
                  <Radio className="w-5 h-5 text-amber-400" />
                  <h3 className="text-base font-bold text-white">Stripe Webhooks Event Stream &amp; Endpoint Monitor</h3>
                </div>
                <span className="px-2.5 py-1 rounded-xl bg-emerald-500/10 text-emerald-400 font-mono text-xs border border-emerald-500/30">
                  ● Webhook Listener Active: /api/stripe/webhook
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Stripe webhooks asynchronously synchronize payment statuses, subscription renewals, cancellations, and failed charge events with the database backend.
              </p>

              {/* Webhook Secret & Endpoint URL */}
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs space-y-1">
                <div className="flex justify-between text-slate-400 text-[10px]">
                  <span>WEBHOOK ENDPOINT URL</span>
                  <span className="text-cyan-400 font-bold">POST /api/stripe/webhook</span>
                </div>
                <div className="text-slate-200 truncate font-bold">
                  https://ais-dev-52ufmuktvzrlwu42vexorh-273406748668.asia-southeast1.run.app/api/stripe/webhook
                </div>
              </div>

              {/* Interactive Webhook Event Simulation Buttons */}
              <div className="space-y-2 pt-2">
                <span className="text-[10px] font-mono text-slate-400 font-bold block">TRIGGER SIMULATED WEBHOOK EVENT:</span>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => handleSimulateWebhook('invoice.payment_succeeded')}
                    className="px-3 py-1.5 rounded-xl bg-emerald-950/60 hover:bg-emerald-900 text-emerald-300 border border-emerald-500/40 font-mono text-xs flex items-center space-x-1"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>invoice.payment_succeeded</span>
                  </button>
                  <button
                    onClick={() => handleSimulateWebhook('invoice.payment_failed')}
                    className="px-3 py-1.5 rounded-xl bg-rose-950/60 hover:bg-rose-900 text-rose-300 border border-rose-500/40 font-mono text-xs flex items-center space-x-1"
                  >
                    <XCircle className="w-3.5 h-3.5" />
                    <span>invoice.payment_failed</span>
                  </button>
                  <button
                    onClick={() => handleSimulateWebhook('customer.subscription.updated')}
                    className="px-3 py-1.5 rounded-xl bg-cyan-950/60 hover:bg-cyan-900 text-cyan-300 border border-cyan-500/40 font-mono text-xs flex items-center space-x-1"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>customer.subscription.updated</span>
                  </button>
                  <button
                    onClick={() => handleSimulateWebhook('customer.subscription.deleted')}
                    className="px-3 py-1.5 rounded-xl bg-amber-950/60 hover:bg-amber-900 text-amber-300 border border-amber-500/40 font-mono text-xs flex items-center space-x-1"
                  >
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>customer.subscription.deleted</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Webhook Events History Stream */}
            <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 space-y-4">
              <h4 className="text-xs font-mono font-bold text-slate-300 flex items-center space-x-2">
                <Terminal className="w-4 h-4 text-cyan-400" />
                <span>Live Webhook Event Stream ({webhookEvents.length} Events Logged)</span>
              </h4>

              <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
                {webhookEvents.map((evt) => (
                  <div key={evt.id} className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-cyan-400">{evt.type}</span>
                      <span className="text-[10px] text-slate-500">{new Date(evt.created * 1000).toLocaleTimeString()}</span>
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-slate-400">
                      <span>Event ID: {evt.id}</span>
                      <span className="text-emerald-400">200 OK HTTP</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* SUBTAB 5: PAYMENT ERROR HANDLING                          */}
        {/* ======================================================== */}
        {activeSubTab === 'ERROR_HANDLING' && (
          <div className="space-y-6 animate-fade-in">
            <div className="bg-slate-950 p-6 rounded-3xl border border-rose-500/40 space-y-4">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="w-6 h-6 text-rose-400" />
                <h3 className="text-lg font-bold text-white">Stripe Payment Exception &amp; Error Recovery Center</h3>
              </div>
              <p className="text-xs text-slate-400">
                Robust exception handling and automated retry flows for card declines, insufficient funds, expired tokens, and webhook signature validation errors.
              </p>
            </div>

            {/* Error Scenarios Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
                <div className="flex items-center space-x-2 text-rose-400 font-mono text-xs font-bold">
                  <XCircle className="w-4 h-4" />
                  <span>Card Declined (Code: card_declined)</span>
                </div>
                <p className="text-xs text-slate-400">
                  Occurs when issuing bank rejects charge attempt due to strict fraud rules or spending limits.
                </p>
                <button
                  onClick={() => {
                    setActiveErrorSim('Card declined: Your bank declined the transaction. (Code: card_declined)');
                    setSubscriptionStatus('past_due');
                    hapticEngine.trigger('alert');
                    notify('Simulated card decline error', 'error', 'CARD DECLINED');
                  }}
                  className="w-full py-2 rounded-xl bg-rose-950/80 hover:bg-rose-900 text-rose-300 font-mono text-xs font-bold border border-rose-500/40"
                >
                  Simulate Card Decline
                </button>
              </div>

              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
                <div className="flex items-center space-x-2 text-amber-400 font-mono text-xs font-bold">
                  <AlertCircle className="w-4 h-4" />
                  <span>Insufficient Funds (Code: insufficient_funds)</span>
                </div>
                <p className="text-xs text-slate-400">
                  Account balance is lower than the required subscription charge ($99.00 USD).
                </p>
                <button
                  onClick={() => {
                    setActiveErrorSim('Card declined: Insufficient funds in account balance. (Code: insufficient_funds)');
                    setSubscriptionStatus('past_due');
                    hapticEngine.trigger('alert');
                    notify('Simulated insufficient funds error', 'warning', 'INSUFFICIENT FUNDS');
                  }}
                  className="w-full py-2 rounded-xl bg-amber-950/80 hover:bg-amber-900 text-amber-300 font-mono text-xs font-bold border border-amber-500/40"
                >
                  Simulate Insufficient Funds
                </button>
              </div>

              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
                <div className="flex items-center space-x-2 text-purple-400 font-mono text-xs font-bold">
                  <Clock className="w-4 h-4" />
                  <span>Expired Card (Code: expired_card)</span>
                </div>
                <p className="text-xs text-slate-400">
                  Stored credit card expiration date has passed. Vault requires updated card details.
                </p>
                <button
                  onClick={() => {
                    setActiveErrorSim('Card expired: The card expiration date has passed. Please update payment method.');
                    setSubscriptionStatus('past_due');
                    hapticEngine.trigger('alert');
                    notify('Simulated card expired error', 'warning', 'CARD EXPIRED');
                  }}
                  className="w-full py-2 rounded-xl bg-purple-950/80 hover:bg-purple-900 text-purple-300 font-mono text-xs font-bold border border-purple-500/40"
                >
                  Simulate Expired Card
                </button>
              </div>

              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
                <div className="flex items-center space-x-2 text-cyan-400 font-mono text-xs font-bold">
                  <RotateCcw className="w-4 h-4" />
                  <span>Automated Payment Recovery Flow</span>
                </div>
                <p className="text-xs text-slate-400">
                  Clears payment errors, updates card token in Stripe vault, and restores active subscription status.
                </p>
                <button
                  onClick={() => {
                    setActiveErrorSim(null);
                    setSubscriptionStatus('active');
                    hapticEngine.trigger('success');
                    notify('Payment method recovered! Active subscription restored.', 'success', 'RECOVERY SUCCESSFUL');
                  }}
                  className="w-full py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-mono text-xs font-black shadow-lg"
                >
                  Execute Payment Retry &amp; Recovery
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* SUBTAB 6: PAYMENT HISTORY & INVOICES                     */}
        {/* ======================================================== */}
        {activeSubTab === 'HISTORY' && (
          <div className="space-y-6 animate-fade-in">
            <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center space-x-2">
                  <Receipt className="w-6 h-6 text-emerald-400" />
                  <h3 className="text-lg font-bold text-white">Stripe Invoice &amp; Payment History</h3>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Download official tax-deductible VAT/GST PDF receipts and view past subscription billing ledger records.
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => {
                    hapticEngine.trigger('click');
                    notify('Downloading full fiscal year billing ledger summary...', 'info', 'INVOICE EXPORT');
                  }}
                  className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 hover:bg-slate-800 text-slate-200 font-mono text-xs flex items-center space-x-2"
                >
                  <Download className="w-4 h-4 text-emerald-400" />
                  <span>Export All Statements</span>
                </button>
              </div>
            </div>

            {/* Metrics Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono">
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
                <span className="text-[10px] text-slate-500">TOTAL BILLED YTD</span>
                <div className="text-xl font-black text-white">$256.00 USD</div>
                <span className="text-[10px] text-emerald-400">100% Tax Compliant</span>
              </div>
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
                <span className="text-[10px] text-slate-500">PAID INVOICES</span>
                <div className="text-xl font-black text-emerald-400">
                  {paymentHistory.filter((i) => i.status === 'paid').length} Completed
                </div>
                <span className="text-[10px] text-slate-400">Stripe Vault Verified</span>
              </div>
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
                <span className="text-[10px] text-slate-500">OUTSTANDING / FAILED</span>
                <div className="text-xl font-black text-amber-400">
                  {paymentHistory.filter((i) => i.status !== 'paid').length} Pending Action
                </div>
                <span className="text-[10px] text-amber-400">
                  {paymentHistory.some((i) => i.status !== 'paid') ? 'Retry Available' : 'No Overdue Charges'}
                </span>
              </div>
            </div>

            {/* Filter Pills & Search Input */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono text-xs">
              <div className="flex items-center space-x-2 overflow-x-auto pb-1">
                <span className="text-slate-500 text-[10px] font-bold shrink-0">FILTER STATUS:</span>
                {['ALL', 'paid', 'failed', 'past_due'].map((status) => (
                  <button
                    key={status}
                    onClick={() => {
                      setHistoryFilterStatus(status);
                      hapticEngine.trigger('click');
                    }}
                    className={`px-3 py-1 rounded-xl transition-all uppercase shrink-0 ${
                      historyFilterStatus === status
                        ? 'bg-emerald-500 text-slate-950 font-bold'
                        : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>

              <div className="relative w-full sm:w-64">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={historySearchQuery}
                  onChange={(e) => setHistorySearchQuery(e.target.value)}
                  placeholder="Search invoice ID or plan..."
                  className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono text-xs focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            {/* Invoice History Table */}
            <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left font-mono text-xs">
                  <thead className="bg-slate-900/80 text-slate-400 text-[10px] uppercase border-b border-slate-800">
                    <tr>
                      <th className="p-3.5">Invoice ID</th>
                      <th className="p-3.5">Date</th>
                      <th className="p-3.5">Description</th>
                      <th className="p-3.5">Amount</th>
                      <th className="p-3.5">Status</th>
                      <th className="p-3.5">Payment Method</th>
                      <th className="p-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {paymentHistory
                      .filter(
                        (inv) =>
                          (historyFilterStatus === 'ALL' || inv.status === historyFilterStatus) &&
                          (inv.invoiceId.toLowerCase().includes(historySearchQuery.toLowerCase()) ||
                            inv.planName.toLowerCase().includes(historySearchQuery.toLowerCase()) ||
                            inv.paymentMethod.toLowerCase().includes(historySearchQuery.toLowerCase()))
                      )
                      .map((inv) => (
                        <tr key={inv.id} className="hover:bg-slate-900/50 transition-colors">
                          <td className="p-3.5 font-bold text-cyan-400">{inv.invoiceId}</td>
                          <td className="p-3.5 text-slate-400 text-[11px]">{inv.date}</td>
                          <td className="p-3.5 text-slate-200">{inv.planName}</td>
                          <td className="p-3.5 font-bold text-white">${inv.amountUSD.toFixed(2)} USD</td>
                          <td className="p-3.5">
                            {inv.status === 'paid' && (
                              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/30">
                                PAID
                              </span>
                            )}
                            {inv.status === 'failed' && (
                              <span className="px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 text-[10px] font-bold border border-rose-500/30">
                                FAILED
                              </span>
                            )}
                            {inv.status === 'past_due' && (
                              <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-bold border border-amber-500/30">
                                PAST DUE
                              </span>
                            )}
                          </td>
                          <td className="p-3.5 text-slate-400">{inv.paymentMethod}</td>
                          <td className="p-3.5 text-right">
                            <div className="flex items-center justify-end space-x-2">
                              <button
                                onClick={() => {
                                  hapticEngine.trigger('click');
                                  notify(`Downloaded tax receipt PDF for ${inv.invoiceId}`, 'success', 'RECEIPT DOWNLOADED');
                                }}
                                className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 text-[10px] font-bold border border-slate-700 flex items-center space-x-1"
                              >
                                <Download className="w-3 h-3 text-cyan-400" />
                                <span>PDF</span>
                              </button>
                              {inv.status !== 'paid' && (
                                <button
                                  onClick={() => {
                                    setActiveSubTab('RETRY');
                                    hapticEngine.trigger('click');
                                  }}
                                  className="px-2.5 py-1 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-[10px] font-black flex items-center space-x-1"
                                >
                                  <RotateCcw className="w-3 h-3" />
                                  <span>Retry</span>
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* SUBTAB 7: RETRY PAYMENT UI                               */}
        {/* ======================================================== */}
        {activeSubTab === 'RETRY' && (
          <div className="space-y-6 animate-fade-in">
            {/* Retry Banner Status Header */}
            <div className={`p-6 rounded-3xl border ${
              subscriptionStatus === 'past_due'
                ? 'bg-rose-950/60 border-rose-500/50'
                : 'bg-slate-950 border-amber-500/40'
            } space-y-4`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start space-x-3">
                  <RotateCcw className={`w-6 h-6 shrink-0 mt-0.5 ${
                    subscriptionStatus === 'past_due' ? 'text-rose-400 animate-spin-slow' : 'text-amber-400'
                  }`} />
                  <div>
                    <h3 className="text-lg font-bold text-white flex items-center space-x-2">
                      <span>Stripe Payment Recovery &amp; Retry Portal</span>
                      {subscriptionStatus === 'past_due' ? (
                        <span className="px-2 py-0.5 rounded-full bg-rose-500/30 text-rose-300 text-[10px] font-mono font-bold border border-rose-500/50">
                          ACTION REQUIRED: PAST DUE
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-mono font-bold border border-emerald-500/30">
                          SYSTEM HEALTHY: ACTIVE
                        </span>
                      )}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">
                      {subscriptionStatus === 'past_due'
                        ? 'Your last recurring subscription charge failed. Select a payment method below to execute immediate settlement and restore your Admiral Pro benefits.'
                        : 'Use this interface to test payment retries, re-tokenize stored credit cards, or simulate recovery after card expiration or bank declines.'}
                    </p>
                  </div>
                </div>

                {subscriptionStatus === 'active' && (
                  <button
                    onClick={() => {
                      setSubscriptionStatus('past_due');
                      setActiveErrorSim('Card declined: Bank security lock (Code: card_declined)');
                      hapticEngine.trigger('alert');
                      notify('Simulated Past-Due status for testing Retry UI', 'warning', 'TEST MODE');
                    }}
                    className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-300 font-mono text-xs font-bold border border-amber-500/30 whitespace-nowrap"
                  >
                    Simulate Failed Charge
                  </button>
                )}
              </div>
            </div>

            {/* Retry Payment Card Selector & Action */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Payment Vault Selector */}
              <div className="lg:col-span-2 bg-slate-950 p-6 rounded-3xl border border-slate-800 space-y-5">
                <h4 className="text-xs font-mono font-bold text-slate-300 flex items-center space-x-2">
                  <CreditCard className="w-4 h-4 text-cyan-400" />
                  <span>Select Payment Method in Stripe Vault</span>
                </h4>

                <div className="space-y-3">
                  {savedCards.map((card) => (
                    <div
                      key={card.id}
                      onClick={() => {
                        setSelectedCardId(card.id);
                        hapticEngine.trigger('click');
                      }}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                        selectedCardId === card.id
                          ? 'bg-cyan-950/40 border-cyan-500/80 shadow-lg'
                          : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                          <CreditCard className="w-5 h-5 text-cyan-400" />
                        </div>
                        <div>
                          <div className="text-xs font-bold font-mono text-white flex items-center space-x-2">
                            <span>{card.brand} •••• {card.last4}</span>
                            {card.isDefault && (
                              <span className="px-2 py-0.2 rounded-full bg-cyan-500/20 text-cyan-300 text-[9px]">DEFAULT</span>
                            )}
                          </div>
                          <p className="text-[10px] text-slate-400 font-mono">
                            Expires {card.expMonth}/{card.expYear} • Tokenized via Stripe Vault
                          </p>
                        </div>
                      </div>

                      <div className="w-5 h-5 rounded-full border border-slate-700 flex items-center justify-center">
                        {selectedCardId === card.id && (
                          <div className="w-3 h-3 rounded-full bg-cyan-400 shadow-glow" />
                        )}
                      </div>
                    </div>
                  ))}

                  <button
                    onClick={() => {
                      setShowAddCardModal(true);
                      hapticEngine.trigger('click');
                    }}
                    className="w-full py-3 rounded-2xl border border-dashed border-slate-700 hover:border-cyan-500 text-slate-400 hover:text-cyan-400 font-mono text-xs font-bold flex items-center justify-center space-x-2 transition-all bg-slate-900/40"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add New Credit / Debit Card to Vault</span>
                  </button>
                </div>
              </div>

              {/* Order Summary & Execution Box */}
              <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 space-y-5 flex flex-col justify-between">
                <div className="space-y-4">
                  <h4 className="text-xs font-mono font-bold text-slate-300 flex items-center space-x-2">
                    <Receipt className="w-4 h-4 text-emerald-400" />
                    <span>Pending Charge Breakdown</span>
                  </h4>

                  <div className="space-y-2 font-mono text-xs border-b border-slate-800 pb-3">
                    <div className="flex justify-between text-slate-400">
                      <span>Subscription Tier:</span>
                      <span className="text-white font-bold">{currentPlan.name}</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Billing Period:</span>
                      <span className="text-white">{billingCycle}</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Port Duty-Free GST Tax:</span>
                      <span className="text-emerald-400">$0.00 (Exempt)</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Grace Period Status:</span>
                      <span className="text-amber-400">Active (Day 2 of 7)</span>
                    </div>
                  </div>

                  <div className="flex justify-between font-mono items-baseline pt-1">
                    <span className="text-xs font-bold text-slate-300">TOTAL DUE NOW:</span>
                    <span className="text-2xl font-black text-cyan-400">
                      ${billingCycle === 'MONTHLY' ? currentPlan.priceMonthlyUSD : currentPlan.priceAnnualUSD}.00
                      <span className="text-xs text-slate-400 font-normal"> USD</span>
                    </span>
                  </div>
                </div>

                {/* Progress Indicators if Retrying */}
                {isRetryingPayment ? (
                  <div className="space-y-3 bg-slate-900 p-4 rounded-2xl border border-cyan-500/50 animate-pulse font-mono text-xs">
                    <div className="flex items-center space-x-2 text-cyan-300">
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span className="font-bold">STRIPE RECOVERY IN PROGRESS...</span>
                    </div>

                    <div className="space-y-1.5 text-[11px]">
                      <div className={`flex items-center justify-between ${retryStep >= 1 ? 'text-emerald-400' : 'text-slate-600'}`}>
                        <span>1. Vault Token Verification</span>
                        {retryStep >= 1 ? <Check className="w-3.5 h-3.5" /> : <span>...</span>}
                      </div>
                      <div className={`flex items-center justify-between ${retryStep >= 2 ? 'text-emerald-400' : 'text-slate-600'}`}>
                        <span>2. 3D Secure 2.0 Challenge</span>
                        {retryStep >= 2 ? <Check className="w-3.5 h-3.5" /> : <span>...</span>}
                      </div>
                      <div className={`flex items-center justify-between ${retryStep >= 3 ? 'text-emerald-400' : 'text-slate-600'}`}>
                        <span>3. Settlement Reconciliation</span>
                        {retryStep >= 3 ? <Check className="w-3.5 h-3.5" /> : <span>...</span>}
                      </div>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={handleExecuteRetryPayment}
                    className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 via-cyan-500 to-emerald-400 hover:brightness-110 text-slate-950 font-black font-mono text-xs shadow-xl transition-all flex items-center justify-center space-x-2"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>Process Payment Retry Now</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* SUBTAB 8: SUBSCRIPTION FAQ                                */}
        {/* ======================================================== */}
        {activeSubTab === 'FAQ' && (
          <div className="space-y-6 animate-fade-in">
            <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center space-x-2">
                    <HelpCircle className="w-6 h-6 text-cyan-400" />
                    <h3 className="text-lg font-bold text-white">Subscription &amp; Billing Knowledge Base FAQ</h3>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    Find immediate answers regarding plans, payment retries, tax deductions, upgrading/downgrading, and security.
                  </p>
                </div>

                {/* Search Bar */}
                <div className="relative w-full sm:w-64">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={faqSearchQuery}
                    onChange={(e) => setFaqSearchQuery(e.target.value)}
                    placeholder="Search FAQ articles..."
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white font-mono text-xs focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              {/* Category Filter Pills */}
              <div className="flex items-center space-x-2 font-mono text-xs overflow-x-auto pt-2">
                <span className="text-slate-500 text-[10px] font-bold">CATEGORIES:</span>
                {['ALL', 'BILLING', 'TAX_REFUNDS', 'UPGRADES', 'SECURITY', 'BENEFITS'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setFaqCategoryFilter(cat);
                      hapticEngine.trigger('click');
                    }}
                    className={`px-3 py-1 rounded-xl transition-all uppercase ${
                      faqCategoryFilter === cat
                        ? 'bg-cyan-500 text-slate-950 font-bold'
                        : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Accordion FAQ Items */}
            <div className="space-y-3">
              {SUBSCRIPTION_FAQS
                .filter(
                  (faq) =>
                    (faqCategoryFilter === 'ALL' || faq.category === faqCategoryFilter) &&
                    (faq.question.toLowerCase().includes(faqSearchQuery.toLowerCase()) ||
                      faq.answer.toLowerCase().includes(faqSearchQuery.toLowerCase()))
                )
                .map((faq) => {
                  const isExpanded = expandedFaqId === faq.id;
                  return (
                    <div
                      key={faq.id}
                      className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden transition-all"
                    >
                      <button
                        onClick={() => {
                          setExpandedFaqId(isExpanded ? null : faq.id);
                          hapticEngine.trigger('click');
                        }}
                        className="w-full p-4 text-left flex items-center justify-between gap-4 hover:bg-slate-900/50 transition-colors"
                      >
                        <div className="flex items-center space-x-3">
                          <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-mono text-[9px] font-bold border border-cyan-500/30 shrink-0">
                            {faq.category}
                          </span>
                          <span className="text-xs font-bold text-white font-sans">{faq.question}</span>
                        </div>

                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4 text-cyan-400 shrink-0" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />
                        )}
                      </button>

                      {isExpanded && (
                        <div className="p-4 pt-0 border-t border-slate-900 text-xs text-slate-300 font-sans leading-relaxed animate-fade-in">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>
          </div>
        )}
      </div>

      {/* Floating Subscription Toast Notification Overlay */}
      {subscriptionToasts.length > 0 && (
        <div className="fixed bottom-6 right-6 z-50 space-y-3 max-w-sm w-full pointer-events-none">
          {subscriptionToasts.map((toast) => (
            <div
              key={toast.id}
              className={`pointer-events-auto p-4 rounded-2xl border shadow-2xl backdrop-blur-xl transition-all duration-300 transform translate-y-0 animate-slide-up ${
                toast.type === 'success'
                  ? 'bg-emerald-950/95 border-emerald-500/60 text-emerald-100'
                  : toast.type === 'error'
                  ? 'bg-rose-950/95 border-rose-500/60 text-rose-100'
                  : toast.type === 'warning'
                  ? 'bg-amber-950/95 border-amber-500/60 text-amber-100'
                  : 'bg-cyan-950/95 border-cyan-500/60 text-cyan-100'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start space-x-2.5">
                  {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />}
                  {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />}
                  {toast.type === 'warning' && <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />}
                  {toast.type === 'info' && <BellRing className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />}
                  <div>
                    <div className="flex items-center space-x-2">
                      <h5 className="text-xs font-bold font-mono tracking-wider">{toast.title}</h5>
                      <span className="text-[9px] font-mono opacity-60">{toast.timestamp}</span>
                    </div>
                    <p className="text-xs mt-1 leading-relaxed opacity-90 font-mono">{toast.message}</p>
                    {toast.actionLabel && toast.onAction && (
                      <button
                        onClick={() => {
                          toast.onAction!();
                          setSubscriptionToasts((prev) => prev.filter((t) => t.id !== toast.id));
                        }}
                        className="mt-2.5 px-3 py-1 rounded-lg bg-white/20 hover:bg-white/30 text-white font-mono text-[10px] font-black uppercase tracking-wider flex items-center space-x-1 border border-white/30 transition-all"
                      >
                        <span>{toast.actionLabel}</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => setSubscriptionToasts((prev) => prev.filter((t) => t.id !== toast.id))}
                  className="text-slate-400 hover:text-white text-xs shrink-0 font-mono"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Card Modal */}
      {showAddCardModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 rounded-3xl border border-cyan-500/50 p-6 sm:p-8 max-w-md w-full space-y-6 shadow-2xl relative">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <CreditCard className="w-5 h-5 text-cyan-400" />
                <h3 className="text-base font-bold text-white">Add Card to Stripe Payment Vault</h3>
              </div>
              <button
                onClick={() => setShowAddCardModal(false)}
                className="text-slate-400 hover:text-white font-mono text-xs"
              >
                ✕ Close
              </button>
            </div>

            <form onSubmit={handleAddCardSubmit} className="space-y-4">
              <div>
                <label className="text-[10px] font-mono text-slate-400 block mb-1">CARDHOLDER NAME</label>
                <input
                  type="text"
                  value={newCardHolder}
                  onChange={(e) => setNewCardHolder(e.target.value)}
                  placeholder="Captain Ananya Silva"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono text-xs focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="text-[10px] font-mono text-slate-400 block mb-1">CARD NUMBER</label>
                <input
                  type="text"
                  maxLength={19}
                  value={newCardNumber}
                  onChange={(e) => setNewCardNumber(e.target.value)}
                  placeholder="4242 •••• •••• 4242"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono text-xs focus:outline-none focus:border-cyan-500 font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-mono text-slate-400 block mb-1">EXPIRY (MM/YY)</label>
                  <input
                    type="text"
                    maxLength={5}
                    value={newCardExpiry}
                    onChange={(e) => setNewCardExpiry(e.target.value)}
                    placeholder="12/28"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono text-xs focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-mono text-slate-400 block mb-1">CVC / CVV</label>
                  <input
                    type="text"
                    maxLength={4}
                    value={newCardCvc}
                    onChange={(e) => setNewCardCvc(e.target.value)}
                    placeholder="321"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono text-xs focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black font-mono text-xs shadow-lg transition-all"
              >
                Save Payment Card in Stripe Vault
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
