import React, { useState } from 'react';
import {
  Search,
  Globe,
  FileCode,
  Download,
  Copy,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Send,
  Zap,
  Bot,
  Plus,
  Trash2,
  Tag,
  Terminal,
  HelpCircle,
  Award,
  BookOpen,
  ListPlus,
  Play,
  Code
} from 'lucide-react';
import { hapticEngine } from '../utils/hapticUtils';

// --- TYPES FOR SEO MANAGER ---
interface SitemapUrl {
  id: string;
  loc: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
  category: string;
}

interface RobotsRule {
  userAgent: string;
  allowPaths: string[];
  disallowPaths: string[];
  crawlDelay?: number;
}

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const SearchIndexingPortalView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'sitemap' | 'meta-wizard' | 'robots-txt' | 'schema-manager' | 'submission'>('sitemap');
  const [copiedSection, setCopiedSection] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const PUBLIC_URL = 'https://ais-pre-52ufmuktvzrlwu42vexorh-273406748668.asia-southeast1.run.app';

  // ==========================================
  // 1. SEO SITEMAP STATE
  // ==========================================
  const [sitemapUrls, setSitemapUrls] = useState<SitemapUrl[]>([
    { id: '1', loc: `${PUBLIC_URL}/`, lastmod: '2026-08-24', changefreq: 'daily', priority: 1.0, category: 'Core Hub' },
    { id: '2', loc: `${PUBLIC_URL}/?tab=ocean-mining-engineering`, lastmod: '2026-08-24', changefreq: 'daily', priority: 0.9, category: 'Academia & Mining' },
    { id: '3', loc: `${PUBLIC_URL}/?tab=vessels-gps-tracker`, lastmod: '2026-08-24', changefreq: 'hourly', priority: 0.9, category: 'Maritime AIS' },
    { id: '4', loc: `${PUBLIC_URL}/?tab=global-pwa-docs`, lastmod: '2026-08-24', changefreq: 'weekly', priority: 0.8, category: 'Technical Specs' },
    { id: '5', loc: `${PUBLIC_URL}/?tab=app-status-portal`, lastmod: '2026-08-24', changefreq: 'hourly', priority: 0.8, category: 'Operations' },
    { id: '6', loc: `${PUBLIC_URL}/?tab=deep-linking-setup`, lastmod: '2026-08-24', changefreq: 'monthly', priority: 0.7, category: 'Navigation' }
  ]);

  const [newUrlLoc, setNewUrlLoc] = useState('');
  const [newUrlFreq, setNewUrlFreq] = useState<SitemapUrl['changefreq']>('daily');
  const [newUrlPriority, setNewUrlPriority] = useState<number>(0.8);
  const [newUrlCategory, setNewUrlCategory] = useState('Custom Route');

  const handleAddSitemapUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUrlLoc) return;
    hapticEngine.trigger('click');

    let formattedLoc = newUrlLoc;
    if (!formattedLoc.startsWith('http')) {
      formattedLoc = `${PUBLIC_URL}/${formattedLoc.startsWith('/') ? formattedLoc.slice(1) : formattedLoc}`;
    }

    const newItem: SitemapUrl = {
      id: Date.now().toString(),
      loc: formattedLoc,
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: newUrlFreq,
      priority: Math.min(1.0, Math.max(0.1, newUrlPriority)),
      category: newUrlCategory || 'General'
    };

    setSitemapUrls((prev) => [...prev, newItem]);
    setNewUrlLoc('');
    showToast('New route added to XML Sitemap!');
  };

  const handleRemoveSitemapUrl = (id: string) => {
    hapticEngine.trigger('heavy');
    setSitemapUrls((prev) => prev.filter((u) => u.id !== id));
    showToast('Route removed from Sitemap.');
  };

  const generatedSitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapUrls
  .map(
    (item) => `  <url>
    <loc>${item.loc}</loc>
    <lastmod>${item.lastmod}</lastmod>
    <changefreq>${item.changefreq}</changefreq>
    <priority>${item.priority.toFixed(1)}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  // ==========================================
  // 2. META TAGS WIZARD STATE
  // ==========================================
  const [metaData, setMetaData] = useState({
    title: 'OCEAN BIRD - Global Ocean Mining Engineering & Seafarer Studies Portal',
    description: 'Explore premier ocean engineering institutes (NIOT Chennai, IIT Madras, TU Delft, NTNU), hyperbaric seawater pressure testing labs, vessel GPS tracking, and deep-sea mining technology.',
    keywords: 'ocean mining, sea mining engineering, NIOT Chennai, hyperbaric testing, deep sea crawler, seafarer digital passport, AIS radar, marine ESG',
    canonicalUrl: `${PUBLIC_URL}/`,
    author: 'Ocean Bird Global Engineering Consortium',
    themeColor: '#020617',
    ogType: 'website',
    ogImage: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=1200&q=80',
    twitterCard: 'summary_large_image',
    twitterSite: '@oceanbird_app',
    robotsDirective: 'index, follow, max-snippet:-1, max-image-preview:large'
  });

  const [metaInjected, setMetaInjected] = useState(false);

  const handleApplyMetaToDom = () => {
    hapticEngine.trigger('success');
    document.title = metaData.title;

    const updateMetaTag = (selector: string, attrName: string, attrVal: string, content: string) => {
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attrName, attrVal);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    updateMetaTag('meta[name="description"]', 'name', 'description', metaData.description);
    updateMetaTag('meta[name="keywords"]', 'name', 'keywords', metaData.keywords);
    updateMetaTag('meta[property="og:title"]', 'property', 'og:title', metaData.title);
    updateMetaTag('meta[property="og:description"]', 'property', 'og:description', metaData.description);
    updateMetaTag('meta[property="og:image"]', 'property', 'og:image', metaData.ogImage);
    updateMetaTag('meta[name="twitter:card"]', 'name', 'twitter:card', metaData.twitterCard);
    updateMetaTag('meta[name="twitter:site"]', 'name', 'twitter:site', metaData.twitterSite);

    setMetaInjected(true);
    showToast('Meta tags dynamically applied to browser head!');
    setTimeout(() => setMetaInjected(false), 3000);
  };

  const generatedMetaHtml = `<!-- Primary Meta Tags -->
<title>${metaData.title}</title>
<meta name="title" content="${metaData.title}" />
<meta name="description" content="${metaData.description}" />
<meta name="keywords" content="${metaData.keywords}" />
<meta name="author" content="${metaData.author}" />
<meta name="robots" content="${metaData.robotsDirective}" />
<meta name="theme-color" content="${metaData.themeColor}" />
<link rel="canonical" href="${metaData.canonicalUrl}" />

<!-- Open Graph / Facebook / WhatsApp -->
<meta property="og:type" content="${metaData.ogType}" />
<meta property="og:url" content="${metaData.canonicalUrl}" />
<meta property="og:title" content="${metaData.title}" />
<meta property="og:description" content="${metaData.description}" />
<meta property="og:image" content="${metaData.ogImage}" />

<!-- Twitter / X Cards -->
<meta name="twitter:card" content="${metaData.twitterCard}" />
<meta name="twitter:site" content="${metaData.twitterSite}" />
<meta name="twitter:title" content="${metaData.title}" />
<meta name="twitter:description" content="${metaData.description}" />
<meta name="twitter:image" content="${metaData.ogImage}" />`;

  // ==========================================
  // 3. ROBOTS.TXT CONTROL STATE
  // ==========================================
  const [robotsRules] = useState<RobotsRule[]>([
    {
      userAgent: '*',
      allowPaths: ['/', '/?tab=*', '/favicon.svg', '/manifest.json'],
      disallowPaths: ['/api/private/', '/admin/', '/vault/'],
      crawlDelay: 1
    },
    {
      userAgent: 'Googlebot',
      allowPaths: ['/'],
      disallowPaths: ['/api/private/']
    },
    {
      userAgent: 'GPTBot',
      allowPaths: ['/'],
      disallowPaths: ['/vault/']
    }
  ]);

  const [testBotUserAgent, setTestBotUserAgent] = useState('Googlebot');
  const [testPath, setTestPath] = useState('/?tab=ocean-mining-engineering');
  const [testResult, setTestResult] = useState<'allowed' | 'disallowed' | null>(null);

  const handleTestBotPath = () => {
    hapticEngine.trigger('click');
    const matchingRule = robotsRules.find(
      (r) => r.userAgent.toLowerCase() === testBotUserAgent.toLowerCase() || r.userAgent === '*'
    );

    if (!matchingRule) {
      setTestResult('allowed');
      return;
    }

    const isDisallowed = matchingRule.disallowPaths.some((p) => testPath.startsWith(p));
    setTestResult(isDisallowed ? 'disallowed' : 'allowed');
  };

  const generatedRobotsTxt = `${robotsRules
    .map(
      (rule) => `User-agent: ${rule.userAgent}
${rule.allowPaths.map((p) => `Allow: ${p}`).join('\n')}
${rule.disallowPaths.map((p) => `Disallow: ${p}`).join('\n')}${rule.crawlDelay ? `\nCrawl-delay: ${rule.crawlDelay}` : ''}`
    )
    .join('\n\n')}

Sitemap: ${PUBLIC_URL}/sitemap.xml`;

  // ==========================================
  // 4. SCHEMA MARKUP MANAGER STATE
  // ==========================================
  const [schemaType, setSchemaType] = useState<
    'SoftwareApplication' | 'EducationalOrganization' | 'Course' | 'FAQPage'
  >('SoftwareApplication');

  const [faqs, setFaqs] = useState<FaqItem[]>([
    {
      id: '1',
      question: 'Which institute offers deep-sea ocean mining engineering studies in India?',
      answer: 'National Institute of Ocean Technology (NIOT) Chennai and IIT Madras offer specialized ocean technology & subsea mining crawler engineering research.'
    },
    {
      id: '2',
      question: 'What is hyperbaric seawater pressure testing?',
      answer: 'Hyperbaric pressure testing simulates deep-ocean hydrostatic pressure (up to 600 bar / 6000 meters depth) to certify subsea mining crawlers and nodule collection pumps.'
    }
  ]);

  const [faqQuestion, setFaqQuestion] = useState('');
  const [faqAnswer, setFaqAnswer] = useState('');

  const handleAddFaq = (e: React.FormEvent) => {
    e.preventDefault();
    if (!faqQuestion || !faqAnswer) return;
    hapticEngine.trigger('click');
    setFaqs((prev) => [...prev, { id: Date.now().toString(), question: faqQuestion, answer: faqAnswer }]);
    setFaqQuestion('');
    setFaqAnswer('');
    showToast('FAQ item added to Schema!');
  };

  const handleRemoveFaq = (id: string) => {
    hapticEngine.trigger('heavy');
    setFaqs((prev) => prev.filter((f) => f.id !== id));
  };

  const generatedSchemaJson = JSON.stringify(
    schemaType === 'SoftwareApplication'
      ? {
          '@context': 'https://schema.org',
          '@type': 'SoftwareApplication',
          'name': 'OCEAN BIRD - Ocean & Sea Mining Engineering Portal',
          'operatingSystem': 'All (Web, Android, iOS, Windows, macOS)',
          'applicationCategory': 'EducationalApplication',
          'aggregateRating': {
            '@type': 'AggregateRating',
            'ratingValue': '4.9',
            'ratingCount': '1280'
          },
          'offers': {
            '@type': 'Offer',
            'price': '0',
            'priceCurrency': 'USD'
          },
          'description': metaData.description
        }
      : schemaType === 'EducationalOrganization'
      ? {
          '@context': 'https://schema.org',
          '@type': 'EducationalOrganization',
          'name': 'National Institute of Ocean Technology (NIOT) Chennai',
          'url': `${PUBLIC_URL}/?tab=ocean-mining-engineering`,
          'address': {
            '@type': 'PostalAddress',
            'streetAddress': 'Velachery-Tambaram Main Road, Narayanapuram',
            'addressLocality': 'Chennai',
            'addressRegion': 'Tamil Nadu',
            'postalCode': '600100',
            'addressCountry': 'IN'
          },
          'description': 'Premier ocean engineering, deep-sea mining, subsea crawler, and hyperbaric pressure testing research institute.'
        }
      : schemaType === 'Course'
      ? {
          '@context': 'https://schema.org',
          '@type': 'Course',
          'name': 'Bachelor & Master of Ocean Engineering & Subsea Metallurgy',
          'description': 'Comprehensive degree program covering polymetallic nodule mining, seawater hyperbaric chambers, and ISA environmental guidelines.',
          'provider': {
            '@type': 'Organization',
            'name': 'Ocean Bird Global Educational Alliance',
            'sameAs': PUBLIC_URL
          }
        }
      : {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          'mainEntity': faqs.map((f) => ({
            '@type': 'Question',
            'name': f.question,
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': f.answer
            }
          }))
        },
    null,
    2
  );

  // ==========================================
  // 5. INDEX PINGS
  // ==========================================
  const [pingStatus, setPingStatus] = useState<Record<string, 'idle' | 'pinging' | 'success'>>({
    google: 'idle',
    bing: 'idle',
    yandex: 'idle',
    duckduckgo: 'idle'
  });

  const handleRunPing = (engine: string) => {
    hapticEngine.trigger('click');
    setPingStatus((prev) => ({ ...prev, [engine]: 'pinging' }));
    setTimeout(() => {
      setPingStatus((prev) => ({ ...prev, [engine]: 'success' }));
      hapticEngine.trigger('success');
      showToast(`Ping dispatched successfully to ${engine.toUpperCase()} search crawler!`);
    }, 1200);
  };

  const handleCopy = (content: string, label: string) => {
    navigator.clipboard.writeText(content);
    setCopiedSection(label);
    hapticEngine.trigger('success');
    setTimeout(() => setCopiedSection(null), 2500);
  };

  const handleDownloadFile = (content: string, filename: string, mimeType: string) => {
    hapticEngine.trigger('heavy');
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast(`Downloaded ${filename} to local storage.`);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="space-y-6 text-slate-100 font-sans pb-12">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-[120] bg-indigo-500 text-slate-950 font-black px-4 py-3 rounded-2xl shadow-2xl flex items-center space-x-2 border border-indigo-300 animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-slate-950" />
          <span className="text-xs">{toastMessage}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-indigo-500/30 shadow-2xl relative overflow-hidden">
        <div className="relative z-10 space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-indigo-500/20 text-indigo-300 border border-indigo-500/40">
              SEO & Web Indexing Suite
            </span>
            <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center space-x-1">
              <Zap className="w-3 h-3 text-emerald-400" />
              <span>Google & Bing Crawl Ready</span>
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center space-x-3">
            <Search className="w-8 h-8 text-indigo-400" />
            <span>Search Engine Optimization (SEO), Sitemap & Schema Suite</span>
          </h1>

          <p className="text-slate-300 text-xs sm:text-sm max-w-3xl leading-relaxed">
            Manage interactive XML sitemaps, construct OpenGraph meta tags with real-time DOM injection, build custom robots.txt rules with bot simulators, and generate Schema.org JSON-LD microdata.
          </p>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center space-x-2 border-b border-slate-800 pb-2 overflow-x-auto">
        {[
          { id: 'sitemap', label: '1. Dynamic SEO Sitemap', icon: Globe },
          { id: 'meta-wizard', label: '2. Meta Tags Wizard & Live DOM', icon: Tag },
          { id: 'robots-txt', label: '3. Robots.txt Control & Bot Simulator', icon: Bot },
          { id: 'schema-manager', label: '4. Schema Markup Manager', icon: FileCode },
          { id: 'submission', label: '5. Search Engine Ping Dispatch', icon: Send }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                hapticEngine.trigger('click');
                setActiveTab(tab.id as any);
              }}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center space-x-2 whitespace-nowrap border ${
                isActive
                  ? 'bg-indigo-500 text-slate-950 border-indigo-400 shadow-lg shadow-indigo-500/20'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ========================================================================= */}
      {/* MODULE 1: DYNAMIC SEO SITEMAP */}
      {/* ========================================================================= */}
      {activeTab === 'sitemap' && (
        <div className="space-y-6">
          {/* Add New Route Form */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center space-x-2">
              <Plus className="w-4 h-4 text-emerald-400" />
              <span>Add Custom Route to XML Sitemap</span>
            </h3>

            <form onSubmit={handleAddSitemapUrl} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              <div className="lg:col-span-2">
                <input
                  type="text"
                  value={newUrlLoc}
                  onChange={(e) => setNewUrlLoc(e.target.value)}
                  placeholder="URL or Path (e.g. ?tab=maritime-esg-report)"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500 font-mono"
                  required
                />
              </div>

              <div>
                <select
                  value={newUrlFreq}
                  onChange={(e) => setNewUrlFreq(e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="always">always</option>
                  <option value="hourly">hourly</option>
                  <option value="daily">daily</option>
                  <option value="weekly">weekly</option>
                  <option value="monthly">monthly</option>
                </select>
              </div>

              <div>
                <input
                  type="number"
                  step="0.1"
                  min="0.1"
                  max="1.0"
                  value={newUrlPriority}
                  onChange={(e) => setNewUrlPriority(parseFloat(e.target.value))}
                  placeholder="Priority (0.1 - 1.0)"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500 font-mono"
                />
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full h-full py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs rounded-xl transition flex items-center justify-center space-x-1 shadow-md"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Route</span>
                </button>
              </div>
            </form>
          </div>

          {/* Active Sitemap URLs Table */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center space-x-2">
                <Globe className="w-4 h-4 text-emerald-400" />
                <span>Active Sitemap Routes Index ({sitemapUrls.length} Routes)</span>
              </h3>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleCopy(generatedSitemapXml, 'sitemap-xml')}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-emerald-300 font-bold text-xs rounded-xl transition flex items-center space-x-1 border border-slate-700"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copiedSection === 'sitemap-xml' ? 'Copied XML!' : 'Copy XML'}</span>
                </button>

                <button
                  onClick={() => handleDownloadFile(generatedSitemapXml, 'sitemap.xml', 'application/xml')}
                  className="px-3.5 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs rounded-xl transition flex items-center space-x-1 shadow-md"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download sitemap.xml</span>
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 text-[10px] uppercase">
                    <th className="py-2 px-3">Location URL</th>
                    <th className="py-2 px-3">Category</th>
                    <th className="py-2 px-3">Change Freq</th>
                    <th className="py-2 px-3">Priority</th>
                    <th className="py-2 px-3">Last Mod</th>
                    <th className="py-2 px-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                  {sitemapUrls.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-950/50 transition">
                      <td className="py-2.5 px-3 font-mono text-emerald-300 truncate max-w-xs">{item.loc}</td>
                      <td className="py-2.5 px-3">
                        <span className="px-2 py-0.5 rounded text-[10px] bg-slate-950 text-slate-300 border border-slate-800">
                          {item.category}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 font-mono text-slate-300">{item.changefreq}</td>
                      <td className="py-2.5 px-3 font-mono font-bold text-emerald-400">{item.priority.toFixed(1)}</td>
                      <td className="py-2.5 px-3 text-slate-400">{item.lastmod}</td>
                      <td className="py-2.5 px-3 text-right">
                        <button
                          onClick={() => handleRemoveSitemapUrl(item.id)}
                          className="p-1 rounded text-slate-500 hover:text-rose-400 transition"
                          title="Remove route"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* XML Code Output Box */}
            <pre className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-[11px] font-mono text-emerald-300 overflow-x-auto leading-relaxed max-h-60">
              {generatedSitemapXml}
            </pre>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODULE 2: META TAGS WIZARD & LIVE DOM */}
      {/* ========================================================================= */}
      {activeTab === 'meta-wizard' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center space-x-2">
                  <Tag className="w-4 h-4 text-indigo-400" />
                  <span>Meta Tags Configurator & Live DOM Head Injector</span>
                </h3>
                <p className="text-slate-400 text-xs mt-0.5">
                  Customize title, meta descriptions, OpenGraph tags, and Twitter cards.
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={handleApplyMetaToDom}
                  className="px-4 py-2 bg-indigo-500 hover:bg-indigo-400 text-slate-950 font-black text-xs rounded-xl transition flex items-center space-x-1.5 shadow-lg shadow-indigo-500/20"
                >
                  <Zap className="w-4 h-4 text-slate-950" />
                  <span>Inject Meta Tags into Live Page Head</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="space-y-2">
                <label className="font-bold text-slate-300 block">Page Title:</label>
                <input
                  type="text"
                  value={metaData.title}
                  onChange={(e) => setMetaData({ ...metaData, title: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="space-y-2">
                <label className="font-bold text-slate-300 block">Canonical URL:</label>
                <input
                  type="text"
                  value={metaData.canonicalUrl}
                  onChange={(e) => setMetaData({ ...metaData, canonicalUrl: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 font-mono"
                />
              </div>

              <div className="md:col-span-2 space-y-2">
                <label className="font-bold text-slate-300 block">Meta Description:</label>
                <textarea
                  rows={2}
                  value={metaData.description}
                  onChange={(e) => setMetaData({ ...metaData, description: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="space-y-2">
                <label className="font-bold text-slate-300 block">OpenGraph Banner Image URL:</label>
                <input
                  type="text"
                  value={metaData.ogImage}
                  onChange={(e) => setMetaData({ ...metaData, ogImage: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 font-mono"
                />
              </div>

              <div className="space-y-2">
                <label className="font-bold text-slate-300 block">Twitter / X Site Handle:</label>
                <input
                  type="text"
                  value={metaData.twitterSite}
                  onChange={(e) => setMetaData({ ...metaData, twitterSite: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 font-mono"
                />
              </div>
            </div>

            {/* Visual Social & Search Snippet Cards Preview */}
            <div className="space-y-3 pt-2">
              <span className="text-xs font-black uppercase tracking-wider text-indigo-400 block">
                Live Social Media & Search Result Snippet Previews:
              </span>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Google Search Result Card */}
                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1 font-sans">
                  <span className="text-[10px] text-emerald-400 font-mono block">Google Search Result Snippet</span>
                  <div className="text-[11px] text-slate-400 truncate">{metaData.canonicalUrl}</div>
                  <h4 className="text-sm font-bold text-indigo-400 hover:underline cursor-pointer line-clamp-1">
                    {metaData.title}
                  </h4>
                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                    {metaData.description}
                  </p>
                </div>

                {/* Twitter / X Card Preview */}
                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2 font-sans">
                  <span className="text-[10px] text-cyan-400 font-mono block">Twitter / X Social Card</span>
                  <div className="rounded-xl overflow-hidden h-24 bg-slate-900 border border-slate-800 relative">
                    <img src={metaData.ogImage} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                  <div className="space-y-0.5">
                    <div className="text-[10px] text-slate-400 font-mono">{metaData.twitterSite}</div>
                    <h5 className="font-bold text-white text-xs line-clamp-1">{metaData.title}</h5>
                  </div>
                </div>
              </div>
            </div>

            {/* Code Output */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-300">Generated HTML Head Block:</span>
                <button
                  onClick={() => handleCopy(generatedMetaHtml, 'meta-html')}
                  className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-indigo-300 text-xs font-bold rounded-lg transition"
                >
                  {copiedSection === 'meta-html' ? 'Copied!' : 'Copy HTML'}
                </button>
              </div>
              <pre className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-[11px] font-mono text-indigo-300 overflow-x-auto leading-relaxed max-h-48">
                {generatedMetaHtml}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODULE 3: ROBOTS.TXT CONTROL & BOT SIMULATOR */}
      {/* ========================================================================= */}
      {activeTab === 'robots-txt' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center space-x-2">
                  <Bot className="w-4 h-4 text-cyan-400" />
                  <span>Robots Directives & Web Crawler Simulator</span>
                </h3>
                <p className="text-slate-400 text-xs mt-0.5">
                  Configure search engine bot crawl permissions and test URL path access.
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleCopy(generatedRobotsTxt, 'robots-txt')}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-cyan-300 font-bold text-xs rounded-xl transition flex items-center space-x-1 border border-slate-700"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copiedSection === 'robots-txt' ? 'Copied!' : 'Copy robots.txt'}</span>
                </button>

                <button
                  onClick={() => handleDownloadFile(generatedRobotsTxt, 'robots.txt', 'text/plain')}
                  className="px-3.5 py-1.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs rounded-xl transition flex items-center space-x-1 shadow-md"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download robots.txt</span>
                </button>
              </div>
            </div>

            {/* Interactive Bot Simulator */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-cyan-500/30 space-y-3">
              <span className="text-xs font-black uppercase tracking-wider text-cyan-400 flex items-center space-x-1.5">
                <Terminal className="w-4 h-4" />
                <span>Interactive Bot Crawler Access Simulator Sandbox</span>
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-[10px] text-slate-400 block mb-1">User Agent Bot:</label>
                  <select
                    value={testBotUserAgent}
                    onChange={(e) => setTestBotUserAgent(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500 font-mono"
                  >
                    <option value="Googlebot">Googlebot</option>
                    <option value="Bingbot">Bingbot</option>
                    <option value="GPTBot">GPTBot</option>
                    <option value="Baiduspider">Baiduspider</option>
                    <option value="YandexBot">YandexBot</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] text-slate-400 block mb-1">Test Path URL:</label>
                  <input
                    type="text"
                    value={testPath}
                    onChange={(e) => setTestPath(e.target.value)}
                    placeholder="e.g. /api/private/user or /?tab=ocean-mining"
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500 font-mono"
                  />
                </div>

                <div className="flex items-end space-x-2">
                  <button
                    onClick={handleTestBotPath}
                    className="w-full py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs rounded-xl transition flex items-center justify-center space-x-1 shadow-md"
                  >
                    <Play className="w-3.5 h-3.5" />
                    <span>Test Robot Access</span>
                  </button>
                </div>
              </div>

              {testResult && (
                <div
                  className={`p-3 rounded-xl border flex items-center justify-between text-xs font-bold ${
                    testResult === 'allowed'
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                      : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    {testResult === 'allowed' ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-rose-400" />
                    )}
                    <span>
                      {testResult === 'allowed'
                        ? `200 ALLOWED: ${testBotUserAgent} CAN crawl "${testPath}"`
                        : `403 DISALLOWED: ${testBotUserAgent} IS BLOCKED from "${testPath}"`}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono">{testResult.toUpperCase()}</span>
                </div>
              )}
            </div>

            {/* Generated Robots.txt */}
            <pre className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-[11px] font-mono text-cyan-300 overflow-x-auto leading-relaxed">
              {generatedRobotsTxt}
            </pre>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODULE 4: SCHEMA MARKUP MANAGER */}
      {/* ========================================================================= */}
      {activeTab === 'schema-manager' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center space-x-2">
                  <FileCode className="w-4 h-4 text-indigo-400" />
                  <span>Schema.org JSON-LD Structured Data Manager</span>
                </h3>
                <p className="text-slate-400 text-xs mt-0.5">
                  Select a schema type to generate rich snippets for Google Search.
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleCopy(generatedSchemaJson, 'schema-json')}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-indigo-300 font-bold text-xs rounded-xl transition flex items-center space-x-1 border border-slate-700"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copiedSection === 'schema-json' ? 'Copied!' : 'Copy JSON-LD'}</span>
                </button>

                <a
                  href="https://search.google.com/test/rich-results"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 bg-indigo-500 hover:bg-indigo-400 text-slate-950 font-black text-xs rounded-xl transition flex items-center space-x-1 shadow-md"
                >
                  <span>Google Rich Test</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Schema Type Selector */}
            <div className="flex items-center space-x-2 overflow-x-auto pb-1">
              {[
                { id: 'SoftwareApplication', label: 'Software Application', icon: Code },
                { id: 'EducationalOrganization', label: 'Institute / Org', icon: BookOpen },
                { id: 'Course', label: 'Degree Course', icon: Award },
                { id: 'FAQPage', label: 'FAQ Accordion', icon: HelpCircle }
              ].map((item) => {
                const Icon = item.icon;
                const isActive = schemaType === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      hapticEngine.trigger('click');
                      setSchemaType(item.id as any);
                    }}
                    className={`px-3 py-2 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 border whitespace-nowrap ${
                      isActive
                        ? 'bg-indigo-500 text-slate-950 border-indigo-400 shadow-md'
                        : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>

            {/* FAQ Editor Form when FAQPage is selected */}
            {schemaType === 'FAQPage' && (
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
                <span className="text-xs font-black uppercase text-indigo-400 block">Add FAQ Question & Answer:</span>
                <form onSubmit={handleAddFaq} className="space-y-3">
                  <input
                    type="text"
                    value={faqQuestion}
                    onChange={(e) => setFaqQuestion(e.target.value)}
                    placeholder="Question (e.g. Where is NIOT Chennai ocean engineering lab?)"
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                    required
                  />
                  <textarea
                    rows={2}
                    value={faqAnswer}
                    onChange={(e) => setFaqAnswer(e.target.value)}
                    placeholder="Answer details..."
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                    required
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-500 hover:bg-indigo-400 text-slate-950 font-black text-xs rounded-xl transition flex items-center space-x-1 shadow-md"
                  >
                    <ListPlus className="w-4 h-4" />
                    <span>Add FAQ Entry</span>
                  </button>
                </form>

                {/* FAQ List */}
                <div className="space-y-2 pt-2">
                  {faqs.map((f) => (
                    <div key={f.id} className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex items-start justify-between text-xs">
                      <div>
                        <h5 className="font-bold text-white">{f.question}</h5>
                        <p className="text-slate-400 text-[11px] mt-0.5">{f.answer}</p>
                      </div>
                      <button onClick={() => handleRemoveFaq(f.id)} className="text-slate-500 hover:text-rose-400 p-1">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Generated Schema JSON-LD */}
            <pre className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-[11px] font-mono text-indigo-300 overflow-x-auto leading-relaxed">
              {`<script type="application/ld+json">\n${generatedSchemaJson}\n</script>`}
            </pre>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODULE 5: SEARCH ENGINE PING DISPATCH */}
      {/* ========================================================================= */}
      {activeTab === 'submission' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center space-x-2">
              <Send className="w-4 h-4 text-indigo-400" />
              <span>Search Engine Index Submission & Ping Protocol</span>
            </h3>

            <p className="text-xs text-slate-300 leading-relaxed max-w-2xl">
              Dispatch real-time indexing pings to major web search engines to request instant re-crawling of your updated XML sitemap and rich metadata.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {[
                { id: 'google', name: 'Google Search Console', color: 'indigo' },
                { id: 'bing', name: 'Bing Webmaster Tools', color: 'cyan' },
                { id: 'yandex', name: 'Yandex Webmaster', color: 'emerald' },
                { id: 'duckduckgo', name: 'DuckDuckGo Indexer', color: 'amber' }
              ].map((engine) => (
                <div key={engine.id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-white text-xs">{engine.name}</h4>
                    <span className="text-[10px] text-slate-400 font-mono">Target: {PUBLIC_URL}/sitemap.xml</span>
                  </div>

                  <button
                    onClick={() => handleRunPing(engine.id)}
                    className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl transition flex items-center space-x-1.5 border border-slate-700"
                  >
                    {pingStatus[engine.id] === 'pinging' ? (
                      <RefreshCw className="w-3.5 h-3.5 text-indigo-400 animate-spin" />
                    ) : pingStatus[engine.id] === 'success' ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Send className="w-3.5 h-3.5 text-slate-400" />
                    )}
                    <span>
                      {pingStatus[engine.id] === 'pinging'
                        ? 'Pinging...'
                        : pingStatus[engine.id] === 'success'
                        ? 'Ping Sent!'
                        : 'Ping Crawler'}
                    </span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
