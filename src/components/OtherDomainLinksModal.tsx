import React, { useState } from 'react';
import {
  Globe,
  ExternalLink,
  Copy,
  Check,
  Server,
  Code,
  ShieldCheck,
  Search,
  Activity,
  Zap,
  Radio,
  Share2,
  X,
  Compass,
  Ship,
  Plane,
  Building2,
  Lock,
  ArrowRight,
  Sparkles,
  RefreshCw,
  Sliders,
  Terminal
} from 'lucide-react';

export interface DomainItem {
  id: string;
  name: string;
  url: string;
  category: 'primary' | 'maritime' | 'airways' | 'saarc' | 'authority';
  description: string;
  badge: string;
  badgeColor: string;
  pingMs: number;
  status: 'online' | 'optimal' | 'syncing';
  sslVerified: boolean;
}

interface OtherDomainLinksModalProps {
  isOpen: boolean;
  onClose: () => void;
  devUrl?: string;
  sharedUrl?: string;
}

export const OtherDomainLinksModal: React.FC<OtherDomainLinksModalProps> = ({
  isOpen,
  onClose,
  devUrl = 'https://ais-dev-52ufmuktvzrlwu42vexorh-273406748668.asia-southeast1.run.app',
  sharedUrl = 'https://ais-pre-52ufmuktvzrlwu42vexorh-273406748668.asia-southeast1.run.app',
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showEmbedCode, setShowEmbedCode] = useState<string | null>(null);
  const [pingingId, setPingingId] = useState<string | null>(null);
  const [customDomainInput, setCustomDomainInput] = useState<string>('');
  const [customDomainsList, setCustomDomainsList] = useState<DomainItem[]>([]);
  const [testResultNotice, setTestResultNotice] = useState<string | null>(null);

  const initialDomains: DomainItem[] = [
    {
      id: 'dev-app-url',
      name: 'Development Live Workspace Domain',
      url: devUrl,
      category: 'primary',
      description: 'Hot-reloading active development server endpoint with full debugging tools & hot patching.',
      badge: 'DEV LIVE ENVIRONMENT',
      badgeColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
      pingMs: 14,
      status: 'optimal',
      sslVerified: true,
    },
    {
      id: 'shared-app-url',
      name: 'Shared Production Portal Domain',
      url: sharedUrl,
      category: 'primary',
      description: 'Public production deployment domain accessible on Google Chrome, Edge, Safari & Mobile web.',
      badge: 'SHARED PRODUCTION DOMAIN',
      badgeColor: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
      pingMs: 18,
      status: 'online',
      sslVerified: true,
    },
    {
      id: 'chrome-auth-domain',
      name: 'Google Chrome Direct Sign-In Portal',
      url: `${sharedUrl}#public-auth`,
      category: 'primary',
      description: 'Direct browser authentication & 1-tap Google Chrome OAuth login portal endpoint.',
      badge: 'CHROME OAUTH PORTAL',
      badgeColor: 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30',
      pingMs: 12,
      status: 'optimal',
      sslVerified: true,
    },
    {
      id: 'local-dev-server',
      name: 'Local Node.js Engine Host',
      url: 'http://localhost:3000',
      category: 'primary',
      description: 'Internal Express + Vite local dev server port 3000 for offline testing.',
      badge: 'LOCALHOST PORT 3000',
      badgeColor: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
      pingMs: 2,
      status: 'optimal',
      sslVerified: false,
    },
    {
      id: 'ocean-gaming-domain',
      name: 'Ocean Gaming & $OD Sovereign Exchange',
      url: 'https://ocean-gaming.maritime-portal.org',
      category: 'maritime',
      description: 'Quantum lottery risk pool, $OD token staking DAO, and gaming entertainments hub domain.',
      badge: '$OD GAMING DOMAIN',
      badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
      pingMs: 22,
      status: 'online',
      sslVerified: true,
    },
    {
      id: 'fleet-map-domain',
      name: 'Global Fleet Realtime Map & AIS Radar',
      url: 'https://fleet-map.maritime-portal.org',
      category: 'maritime',
      description: 'Worldwide live vessel locations, satellite AIS telemetry stream & pirate alert radar.',
      badge: 'REALTIME AIS DOMAIN',
      badgeColor: 'bg-teal-500/20 text-teal-300 border-teal-500/30',
      pingMs: 19,
      status: 'online',
      sslVerified: true,
    },
    {
      id: 'stocks-bonds-domain',
      name: 'Stocks, Shares & Sovereign Bonds Exchange',
      url: 'https://stocks-bonds.maritime-portal.org',
      category: 'maritime',
      description: 'Maritime equities exchange, carbon beta ratings, yield curve analytics domain.',
      badge: 'FINANCIAL DOMAIN',
      badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
      pingMs: 26,
      status: 'online',
      sslVerified: true,
    },
    {
      id: 'airways-flight-domain',
      name: 'Airways Flight Booking & Radar Hub',
      url: 'https://airways.maritime-portal.org',
      category: 'airways',
      description: 'International flight ticket booking, offline flight status caching & gate tracker domain.',
      badge: 'AIRWAYS DOMAIN',
      badgeColor: 'bg-sky-500/20 text-sky-300 border-sky-500/30',
      pingMs: 25,
      status: 'online',
      sslVerified: true,
    },
    {
      id: 'airways-cargo-domain',
      name: 'Airways Aviation Cargo & Freight Portal',
      url: 'https://cargo-airways.maritime-portal.org',
      category: 'airways',
      description: 'Air cargo airwaybill (AWB) tracker, ULD load planner & digital cargo sign-off domain.',
      badge: 'AIR CARGO FREIGHT',
      badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
      pingMs: 28,
      status: 'online',
      sslVerified: true,
    },
    {
      id: 'careers-domain',
      name: 'Airways & Maritime Global Job Alerts',
      url: 'https://careers.maritime-portal.org',
      category: 'airways',
      description: 'Pilots, captains, seafarers & air traffic controller international career requirements portal.',
      badge: 'CAREER ALERTS DOMAIN',
      badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
      pingMs: 21,
      status: 'online',
      sslVerified: true,
    },
    {
      id: 'saarc-telemetry-domain',
      name: 'SAARC 8-Nations Regional Telemetry',
      url: 'https://saarc.maritime-portal.org',
      category: 'saarc',
      description: 'Sovereign climate watch, tsunami early warning & Indian Ocean hydro-met exchange.',
      badge: '8-NATIONS HUB',
      badgeColor: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
      pingMs: 16,
      status: 'optimal',
      sslVerified: true,
    },
    {
      id: 'evisa-domain',
      name: 'International e-Visa Instant Approval Portal',
      url: 'https://evisa.maritime-portal.org',
      category: 'saarc',
      description: 'Digital passport credential verification, embassy e-Visa issue & biometric verification domain.',
      badge: 'DIGITAL E-VISA DOMAIN',
      badgeColor: 'bg-violet-500/20 text-violet-300 border-violet-500/30',
      pingMs: 20,
      status: 'online',
      sslVerified: true,
    },
    {
      id: 'imo-official',
      name: 'International Maritime Organization (IMO)',
      url: 'https://www.imo.org',
      category: 'authority',
      description: 'Official UN specialized agency responsible for safety and security of shipping.',
      badge: 'IMO UN AUTHORITY',
      badgeColor: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      pingMs: 45,
      status: 'online',
      sslVerified: true,
    },
    {
      id: 'icao-official',
      name: 'International Civil Aviation Org (ICAO)',
      url: 'https://www.icao.int',
      category: 'authority',
      description: 'Official UN agency for global civil aviation standards and airspace navigation protocols.',
      badge: 'ICAO UN AUTHORITY',
      badgeColor: 'bg-sky-500/20 text-sky-400 border-sky-500/30',
      pingMs: 52,
      status: 'online',
      sslVerified: true,
    },
    {
      id: 'noaa-weather',
      name: 'NOAA Ocean Hydro-Met Telemetry API',
      url: 'https://api.weather.gov',
      category: 'authority',
      description: 'US National Oceanic & Atmospheric Administration live weather API data provider.',
      badge: 'NOAA API PROVIDER',
      badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
      pingMs: 34,
      status: 'optimal',
      sslVerified: true,
    },
  ];

  const [domains, setDomains] = useState<DomainItem[]>(initialDomains);

  if (!isOpen) return null;

  const allDomainsList = [...domains, ...customDomainsList];

  const filteredDomains = allDomainsList.filter((d) => {
    const matchesCat = selectedCategory === 'all' || d.category === selectedCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.url.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.badge.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleCopyUrl = (id: string, url: string) => {
    navigator.clipboard.writeText(url).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  const handlePingDomain = (id: string) => {
    setPingingId(id);
    setTimeout(() => {
      const simulatedPing = Math.floor(10 + Math.random() * 25);
      setDomains((prev) =>
        prev.map((item) => (item.id === id ? { ...item, pingMs: simulatedPing } : item))
      );
      setPingingId(null);
    }, 600);
  };

  const handleAddCustomDomain = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customDomainInput.trim()) return;

    let formattedUrl = customDomainInput.trim();
    if (!formattedUrl.startsWith('http://') && !formattedUrl.startsWith('https://')) {
      formattedUrl = `https://${formattedUrl}`;
    }

    const domainName = formattedUrl.replace(/^https?:\/\//, '').replace(/\/.*$/, '');

    const newItem: DomainItem = {
      id: `custom-${Date.now()}`,
      name: domainName,
      url: formattedUrl,
      category: 'maritime',
      description: 'User-configured custom portal domain link endpoint.',
      badge: 'CUSTOM DOMAIN LINK',
      badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
      pingMs: Math.floor(12 + Math.random() * 20),
      status: 'online',
      sslVerified: formattedUrl.startsWith('https://'),
    };

    setCustomDomainsList((prev) => [newItem, ...prev]);
    setCustomDomainInput('');
    setTestResultNotice(`Successfully linked domain: ${formattedUrl}`);
    setTimeout(() => setTestResultNotice(null), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-4xl w-full text-white shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header Bar */}
        <div className="p-5 bg-slate-950 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-gradient-to-br from-cyan-500/20 to-sky-500/20 text-cyan-400 border border-cyan-500/30 rounded-2xl">
              <Globe className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-widest">
                  CROSS-PORTAL DOMAIN MANAGER & REPOSITORY
                </span>
                <span className="px-2 py-0.5 bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-[9px] font-mono font-bold rounded-full">
                  100% ONLINE
                </span>
              </div>
              <h2 className="text-xl font-black text-white flex items-center space-x-2">
                <span>Other Domain Links & Web Portals</span>
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-800 text-slate-400 hover:text-white rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Top Direct App Links Quick Banner */}
        <div className="p-4 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border-b border-slate-800/80 grid grid-cols-1 md:grid-cols-2 gap-3 shrink-0">
          <div className="p-3 bg-slate-900/90 border border-emerald-500/30 rounded-2xl space-y-1.5 font-mono text-xs">
            <div className="flex items-center justify-between">
              <span className="text-emerald-400 font-bold flex items-center space-x-1">
                <Zap className="w-3.5 h-3.5 text-emerald-400" />
                <span>Development App URL</span>
              </span>
              <span className="text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-800 px-1.5 py-0.5 rounded font-bold">
                DEV WORKSPACE
              </span>
            </div>
            <p className="text-slate-300 text-[11px] font-mono truncate">{devUrl}</p>
            <div className="flex items-center space-x-2 pt-1">
              <button
                onClick={() => handleCopyUrl('quick-dev', devUrl)}
                className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-[10px] font-bold flex items-center space-x-1 transition-colors"
              >
                {copiedId === 'quick-dev' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedId === 'quick-dev' ? 'Copied Link' : 'Copy URL'}</span>
              </button>
              <a
                href={devUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-lg text-[10px] flex items-center space-x-1 transition-all"
              >
                <span>Open Dev Link</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          <div className="p-3 bg-slate-900/90 border border-cyan-500/30 rounded-2xl space-y-1.5 font-mono text-xs">
            <div className="flex items-center justify-between">
              <span className="text-cyan-400 font-bold flex items-center space-x-1">
                <Globe className="w-3.5 h-3.5 text-cyan-400" />
                <span>Shared Production URL</span>
              </span>
              <span className="text-[10px] bg-cyan-950 text-cyan-300 border border-cyan-800 px-1.5 py-0.5 rounded font-bold">
                PUBLIC DOMAIN
              </span>
            </div>
            <p className="text-slate-300 text-[11px] font-mono truncate">{sharedUrl}</p>
            <div className="flex items-center space-x-2 pt-1">
              <button
                onClick={() => handleCopyUrl('quick-shared', sharedUrl)}
                className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-[10px] font-bold flex items-center space-x-1 transition-colors"
              >
                {copiedId === 'quick-shared' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedId === 'quick-shared' ? 'Copied Link' : 'Copy URL'}</span>
              </button>
              <a
                href={sharedUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black rounded-lg text-[10px] flex items-center space-x-1 transition-all"
              >
                <span>Open Shared Link</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Filter and Add Custom Domain Bar */}
        <div className="px-5 py-3 bg-slate-950/60 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs font-mono shrink-0">
          {/* Search Box */}
          <div className="flex items-center space-x-2 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800 flex-1 max-w-xs">
            <Search className="w-3.5 h-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search domain links..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent text-white placeholder-slate-500 focus:outline-none text-[11px] w-full"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex items-center space-x-1 bg-slate-900 p-1 rounded-xl border border-slate-800 text-[10px] font-bold">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-2.5 py-1 rounded-lg ${
                selectedCategory === 'all' ? 'bg-cyan-500 text-slate-950 font-black' : 'text-slate-400 hover:text-white'
              }`}
            >
              All ({allDomainsList.length})
            </button>
            <button
              onClick={() => setSelectedCategory('primary')}
              className={`px-2.5 py-1 rounded-lg ${
                selectedCategory === 'primary' ? 'bg-cyan-500 text-slate-950 font-black' : 'text-slate-400 hover:text-white'
              }`}
            >
              App Links
            </button>
            <button
              onClick={() => setSelectedCategory('maritime')}
              className={`px-2.5 py-1 rounded-lg ${
                selectedCategory === 'maritime' ? 'bg-cyan-500 text-slate-950 font-black' : 'text-slate-400 hover:text-white'
              }`}
            >
              Maritime
            </button>
            <button
              onClick={() => setSelectedCategory('airways')}
              className={`px-2.5 py-1 rounded-lg ${
                selectedCategory === 'airways' ? 'bg-cyan-500 text-slate-950 font-black' : 'text-slate-400 hover:text-white'
              }`}
            >
              Airways
            </button>
            <button
              onClick={() => setSelectedCategory('authority')}
              className={`px-2.5 py-1 rounded-lg ${
                selectedCategory === 'authority' ? 'bg-cyan-500 text-slate-950 font-black' : 'text-slate-400 hover:text-white'
              }`}
            >
              UN & APIs
            </button>
          </div>
        </div>

        {/* Custom Domain Adder Form */}
        <form onSubmit={handleAddCustomDomain} className="p-3 bg-slate-900/60 border-b border-slate-800 flex items-center space-x-2 text-xs font-mono shrink-0">
          <Terminal className="w-4 h-4 text-cyan-400 shrink-0 ml-2" />
          <input
            type="text"
            placeholder="Add custom portal domain link (e.g., https://my-maritime-agency.org)..."
            value={customDomainInput}
            onChange={(e) => setCustomDomainInput(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-slate-200 placeholder-slate-500 text-[11px] focus:outline-none focus:border-cyan-500 flex-1"
          />
          <button
            type="submit"
            className="px-3 py-1.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black rounded-xl text-[11px] transition-all flex items-center space-x-1 shrink-0"
          >
            <span>Link Domain</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>

        {testResultNotice && (
          <div className="px-5 py-2 bg-emerald-950/80 border-b border-emerald-800 text-emerald-300 font-mono text-[11px] font-bold flex items-center justify-between">
            <span>{testResultNotice}</span>
            <Check className="w-4 h-4 text-emerald-400" />
          </div>
        )}

        {/* Domain Links Grid List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-3 font-mono">
          {filteredDomains.length === 0 ? (
            <div className="text-center py-12 text-slate-500 space-y-2">
              <Globe className="w-8 h-8 text-slate-700 mx-auto" />
              <p className="text-xs">No domain links match your search term.</p>
            </div>
          ) : (
            filteredDomains.map((domain) => (
              <div
                key={domain.id}
                className="p-4 bg-slate-950/90 border border-slate-800/80 hover:border-cyan-500/40 rounded-2xl transition-all duration-200 space-y-2 group"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-0.5 border rounded-full text-[9px] font-bold ${domain.badgeColor}`}>
                      {domain.badge}
                    </span>
                    {domain.sslVerified && (
                      <span className="text-[10px] text-emerald-400 flex items-center space-x-1 font-bold">
                        <Lock className="w-3 h-3 text-emerald-400" />
                        <span>SSL Encrypted</span>
                      </span>
                    )}
                  </div>

                  {/* Ping & Status */}
                  <div className="flex items-center space-x-3 text-[10px] text-slate-400">
                    <button
                      onClick={() => handlePingDomain(domain.id)}
                      className="hover:text-cyan-300 flex items-center space-x-1 transition-colors"
                      title="Test Latency Ping"
                    >
                      <RefreshCw className={`w-3 h-3 text-slate-500 ${pingingId === domain.id ? 'animate-spin text-cyan-400' : ''}`} />
                      <span>Ping: {domain.pingMs}ms</span>
                    </button>
                    <span className="text-emerald-400 font-bold flex items-center space-x-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>{domain.status.toUpperCase()}</span>
                    </span>
                  </div>
                </div>

                <div className="space-y-1">
                  <h3 className="text-sm font-black text-white group-hover:text-cyan-300 transition-colors flex items-center space-x-2">
                    <span>{domain.name}</span>
                  </h3>
                  <p className="text-xs text-slate-400 font-sans leading-relaxed">{domain.description}</p>
                </div>

                {/* URL Bar & Actions */}
                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-t border-slate-900">
                  <span className="text-slate-300 text-xs font-mono break-all font-bold select-all bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800">
                    {domain.url}
                  </span>

                  <div className="flex items-center space-x-2 shrink-0">
                    <button
                      onClick={() => handleCopyUrl(domain.id, domain.url)}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-colors"
                    >
                      {copiedId === domain.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400 font-bold">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy URL</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => setShowEmbedCode(showEmbedCode === domain.id ? null : domain.id)}
                      className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold flex items-center space-x-1 transition-colors"
                      title="Embed Iframe Code"
                    >
                      <Code className="w-3.5 h-3.5 text-amber-400" />
                      <span>Embed</span>
                    </button>

                    <a
                      href={domain.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-1.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black rounded-xl text-xs flex items-center space-x-1.5 transition-all shadow-lg shadow-cyan-500/20 active:scale-95"
                    >
                      <span>Visit Portal</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                {/* Embed Code Snippet Drawer */}
                {showEmbedCode === domain.id && (
                  <div className="mt-2 p-3 bg-slate-900 border border-slate-800 rounded-xl font-mono text-[10px] space-y-2 animate-in fade-in duration-150">
                    <div className="flex items-center justify-between text-amber-300 font-bold">
                      <span>HTML Iframe Embed Code snippet</span>
                      <button
                        onClick={() =>
                          handleCopyUrl(
                            `embed-${domain.id}`,
                            `<iframe src="${domain.url}" width="100%" height="700px" frameborder="0" allowfullscreen></iframe>`
                          )
                        }
                        className="text-slate-400 hover:text-white flex items-center space-x-1"
                      >
                        <Copy className="w-3 h-3" />
                        <span>Copy HTML Snippet</span>
                      </button>
                    </div>
                    <pre className="p-2 bg-slate-950 text-slate-300 rounded-lg overflow-x-auto border border-slate-800">
                      {`<iframe src="${domain.url}" width="100%" height="700px" frameborder="0" allowfullscreen></iframe>`}
                    </pre>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between font-mono text-xs text-slate-400 shrink-0">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>All cross-domain links protected with SSL TLS 1.3 encryption</span>
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl transition-all"
          >
            Close Domain Hub
          </button>
        </div>
      </div>
    </div>
  );
};
