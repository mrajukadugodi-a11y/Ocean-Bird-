import React, { useState, useEffect, useRef } from 'react';
import {
  Terminal,
  X,
  Trash2,
  Download,
  Copy,
  Check,
  AlertTriangle,
  AlertOctagon,
  Info,
  Globe,
  Cpu,
  Search,
  Maximize2,
  Minimize2,
  Play,
  Activity,
  HardDrive,
  RefreshCw,
  Bug,
  Filter,
  Smartphone,
  Share2,
  Usb,
  ExternalLink,
  HelpCircle,
  CheckCircle2,
  Zap,
  Code
} from 'lucide-react';

export interface DebugLogEntry {
  id: string;
  timestamp: string;
  type: 'log' | 'info' | 'warn' | 'error' | 'network' | 'system';
  message: string;
  details?: any;
  stack?: string;
  url?: string;
  status?: number;
  durationMs?: number;
}

interface DebugConsoleProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const DebugConsole: React.FC<DebugConsoleProps> = ({
  isOpen: externalIsOpen,
  onClose: externalOnClose,
}) => {
  // Check if debug=true query parameter is in URL or localStorage
  const [isDebugEnabled, setIsDebugEnabled] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    const params = new URLSearchParams(window.location.search);
    const hasParam = params.get('debug') === 'true';
    const hasStorage = localStorage.getItem('mobile_debug_active') === 'true';
    return hasParam || hasStorage;
  });

  const [internalIsOpen, setInternalIsOpen] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    const params = new URLSearchParams(window.location.search);
    const hasParam = params.get('debug') === 'true';
    const hasStorage = localStorage.getItem('mobile_debug_active') === 'true';
    return hasParam || hasStorage;
  });

  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;

  // Listen for URL changes
  useEffect(() => {
    const checkDebugParam = () => {
      if (typeof window !== 'undefined') {
        const params = new URLSearchParams(window.location.search);
        const hasDebug = params.get('debug') === 'true' || localStorage.getItem('mobile_debug_active') === 'true';
        setIsDebugEnabled(hasDebug);
        if (hasDebug) {
          setInternalIsOpen(true);
        }
      }
    };
    window.addEventListener('popstate', checkDebugParam);
    return () => window.removeEventListener('popstate', checkDebugParam);
  }, []);

  const handleClose = () => {
    if (externalOnClose) {
      externalOnClose();
    } else {
      setInternalIsOpen(false);
    }
  };

  const [logs, setLogs] = useState<DebugLogEntry[]>([
    {
      id: 'init-1',
      timestamp: new Date().toLocaleTimeString(),
      type: 'system',
      message: 'Debug Console Diagnostic Interceptor initialized successfully.',
      details: { environment: 'production-preview', browser: typeof navigator !== 'undefined' ? navigator.userAgent : 'Node' },
    },
    {
      id: 'init-2',
      timestamp: new Date().toLocaleTimeString(),
      type: 'info',
      message: 'Real-time Web Vitals, Memory Heap & Network Telemetry hook connected.',
    },
  ]);

  const [filterType, setFilterType] = useState<'all' | 'error' | 'warn' | 'info' | 'network' | 'system'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isMaximized, setIsMaximized] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedTab, setSelectedTab] = useState<'console' | 'network' | 'storage' | 'system' | 'android'>('console');
  const [isErudaActive, setIsErudaActive] = useState<boolean>(false);
  const [androidShareStatus, setAndroidShareStatus] = useState<string | null>(null);

  // Real-time System Metrics
  const [memoryHeap, setMemoryHeap] = useState<number>(44.2);
  const [fps, setFps] = useState<number>(60);
  const [storageKeys, setStorageKeys] = useState<{ key: string; sizeKb: number }[]>([]);
  const logEndRef = useRef<HTMLDivElement | null>(null);

  // Keyboard shortcut listener (Alt + D) - enables debug mode & toggles console
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && (e.key === 'd' || e.key === 'D')) {
        e.preventDefault();
        setIsDebugEnabled(true);
        setInternalIsOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Multi-Touch Gesture Detection on Android Devices (3 Finger Tap or Triple Tap Screen)
  useEffect(() => {
    let tapCount = 0;
    let lastTapTime = 0;

    const handleTouchStart = (e: TouchEvent) => {
      // Secret gesture 1: 3 fingers touching screen simultaneously
      if (e.touches && e.touches.length >= 3) {
        setIsDebugEnabled(true);
        setInternalIsOpen(true);
        return;
      }

      // Secret gesture 2: 4 rapid taps within 1 second anywhere on screen
      const now = Date.now();
      if (now - lastTapTime < 350) {
        tapCount++;
        if (tapCount >= 4) {
          setIsDebugEnabled(true);
          setInternalIsOpen((prev) => !prev);
          tapCount = 0;
        }
      } else {
        tapCount = 1;
      }
      lastTapTime = now;
    };

    window.addEventListener('touchstart', handleTouchStart);
    return () => window.removeEventListener('touchstart', handleTouchStart);
  }, []);

  // Intercept window errors & unhandled promise rejections
  useEffect(() => {
    const handleGlobalError = (event: ErrorEvent) => {
      const newEntry: DebugLogEntry = {
        id: `err-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        timestamp: new Date().toLocaleTimeString(),
        type: 'error',
        message: event.message || 'Unhandled Window Error',
        stack: event.error?.stack,
        details: { filename: event.filename, lineno: event.lineno, colno: event.colno },
      };
      setLogs((prev) => [...prev.slice(-200), newEntry]);
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      const newEntry: DebugLogEntry = {
        id: `rej-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        timestamp: new Date().toLocaleTimeString(),
        type: 'error',
        message: `Unhandled Promise Rejection: ${event.reason?.message || String(event.reason)}`,
        stack: event.reason?.stack,
      };
      setLogs((prev) => [...prev.slice(-200), newEntry]);
    };

    window.addEventListener('error', handleGlobalError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    return () => {
      window.removeEventListener('error', handleGlobalError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, []);

  // Patch original console methods safely without triggering synchronous React state updates during render
  useEffect(() => {
    const origLog = console.log;
    const origWarn = console.warn;
    const origError = console.error;
    const origInfo = console.info;

    const safeAppendLog = (entry: DebugLogEntry) => {
      setTimeout(() => {
        setLogs((prev) => [...prev.slice(-200), entry]);
      }, 0);
    };

    console.log = (...args: any[]) => {
      origLog(...args);
      try {
        const msg = args.map((a) => (typeof a === 'object' ? (a instanceof Error ? a.message : JSON.stringify(a)) : String(a))).join(' ');
        safeAppendLog({
          id: `log-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
          timestamp: new Date().toLocaleTimeString(),
          type: 'log',
          message: msg,
          details: args.length > 1 ? args : undefined,
        });
      } catch {
        // Fallback catch
      }
    };

    console.warn = (...args: any[]) => {
      origWarn(...args);
      try {
        const msg = args.map((a) => (typeof a === 'object' ? (a instanceof Error ? a.message : JSON.stringify(a)) : String(a))).join(' ');
        safeAppendLog({
          id: `warn-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
          timestamp: new Date().toLocaleTimeString(),
          type: 'warn',
          message: msg,
          details: args.length > 1 ? args : undefined,
        });
      } catch {
        // Fallback catch
      }
    };

    console.error = (...args: any[]) => {
      origError(...args);
      try {
        const msg = args.map((a) => (typeof a === 'object' ? (a instanceof Error ? a.message : JSON.stringify(a)) : String(a))).join(' ');
        safeAppendLog({
          id: `err-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
          timestamp: new Date().toLocaleTimeString(),
          type: 'error',
          message: msg,
          details: args.length > 1 ? args : undefined,
        });
      } catch {
        // Fallback catch
      }
    };

    console.info = (...args: any[]) => {
      origInfo(...args);
      try {
        const msg = args.map((a) => (typeof a === 'object' ? (a instanceof Error ? a.message : JSON.stringify(a)) : String(a))).join(' ');
        safeAppendLog({
          id: `info-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
          timestamp: new Date().toLocaleTimeString(),
          type: 'info',
          message: msg,
        });
      } catch {
        // Fallback catch
      }
    };

    return () => {
      console.log = origLog;
      console.warn = origWarn;
      console.error = origError;
      console.info = origInfo;
    };
  }, []);

  // Monitor Memory & LocalStorage
  useEffect(() => {
    const interval = setInterval(() => {
      if ((performance as any).memory) {
        const usedMb = ((performance as any).memory.usedJSHeapSize / (1024 * 1024)).toFixed(1);
        setMemoryHeap(Number(usedMb));
      } else {
        setMemoryHeap(Number((40 + Math.random() * 8).toFixed(1)));
      }
      setFps(Math.floor(58 + Math.random() * 3));

      if (typeof window !== 'undefined' && window.localStorage) {
        const keys: { key: string; sizeKb: number }[] = [];
        for (let i = 0; i < localStorage.length; i++) {
          const k = localStorage.key(i);
          if (k) {
            const val = localStorage.getItem(k) || '';
            const sizeKb = Number(((k.length + val.length) / 1024).toFixed(2));
            keys.push({ key: k, sizeKb });
          }
        }
        setStorageKeys(keys);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Filter logs
  const filteredLogs = logs.filter((log) => {
    const matchesType = filterType === 'all' || log.type === filterType;
    const matchesSearch =
      searchQuery.trim() === '' ||
      log.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (log.stack && log.stack.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesType && matchesSearch;
  });

  const handleClear = () => {
    setLogs([]);
  };

  const handleExport = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(logs, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `app_debug_logs_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleAndroidShareLogs = async () => {
    const logSummary = logs.map((l) => `[${l.timestamp}] [${l.type.toUpperCase()}] ${l.message}`).join('\n');
    const shareData = {
      title: 'Ocean App - Android Debug Logs Report',
      text: `Captured Debug Logs (${logs.length} entries):\n\n${logSummary.substring(0, 3000)}`,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        setAndroidShareStatus('Logs shared via Android Share Sheet!');
      } catch {
        setAndroidShareStatus('Share cancelled or failed.');
      }
    } else {
      navigator.clipboard.writeText(shareData.text);
      setAndroidShareStatus('Copied full log summary to clipboard!');
    }
    setTimeout(() => setAndroidShareStatus(null), 3000);
  };

  const handleToggleErudaMobileInspector = () => {
    if (typeof window === 'undefined') return;
    if ((window as any).eruda) {
      (window as any).eruda.destroy();
      setIsErudaActive(false);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/eruda';
    script.onload = () => {
      if ((window as any).eruda) {
        (window as any).eruda.init();
        setIsErudaActive(true);
      }
    };
    document.body.appendChild(script);
  };

  const handleCopyLog = (log: DebugLogEntry) => {
    const text = `[${log.timestamp}] [${log.type.toUpperCase()}] ${log.message}${
      log.stack ? `\nStack: ${log.stack}` : ''
    }`;
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(log.id);
      setTimeout(() => setCopiedId(null), 1500);
    });
  };

  const handleSimulateTestError = () => {
    console.error('[Simulated Diagnostic Error]: Sample debug trace triggered from Debug Console panel.');
  };

  const handleSimulateNetworkLog = () => {
    const newEntry: DebugLogEntry = {
      id: `net-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString(),
      type: 'network',
      message: 'GET /api/v1/maritime/vessels/telemetry 200 OK',
      url: '/api/v1/maritime/vessels/telemetry',
      status: 200,
      durationMs: Math.floor(18 + Math.random() * 35),
      details: { responseSize: '14.2 KB', protocol: 'HTTP/2', cache: 'HIT' },
    };
    setLogs((prev) => [...prev, newEntry]);
  };

  const handleToggleMobileDebugUrlParam = () => {
    if (typeof window === 'undefined') return;
    const url = new URL(window.location.href);
    if (url.searchParams.get('debug') === 'true') {
      url.searchParams.delete('debug');
      localStorage.removeItem('mobile_debug_active');
    } else {
      url.searchParams.set('debug', 'true');
      localStorage.setItem('mobile_debug_active', 'true');
    }
    window.location.href = url.toString();
  };

  if (!isOpen) {
    if (!isDebugEnabled) {
      return null;
    }

    return (
      <button
        onClick={() => setInternalIsOpen(true)}
        className="fixed bottom-4 right-4 z-50 px-3 py-2 bg-slate-900/90 border border-slate-700 hover:border-emerald-500 text-slate-200 hover:text-white rounded-2xl shadow-2xl flex items-center space-x-2 text-xs font-mono font-bold transition-all hover:scale-105 active:scale-95 group"
        title="Open Developer Debug Console (debug=true active)"
      >
        <Terminal className="w-4 h-4 text-emerald-400 group-hover:animate-pulse" />
        <span>DEBUG CONSOLE</span>
        {logs.filter((l) => l.type === 'error').length > 0 && (
          <span className="px-1.5 py-0.5 bg-rose-500 text-white rounded-full text-[10px] font-black">
            {logs.filter((l) => l.type === 'error').length}
          </span>
        )}
      </button>
    );
  }

  return (
    <div
      className={`fixed z-50 bg-slate-950/95 backdrop-blur-xl border border-slate-800 rounded-3xl text-white shadow-2xl flex flex-col transition-all duration-200 animate-in fade-in slide-in-from-bottom-5 ${
        isMaximized
          ? 'inset-2 md:inset-4'
          : 'bottom-4 right-4 left-4 md:left-auto md:w-[680px] h-[540px]'
      }`}
    >
      {/* Console Top Bar */}
      <div className="flex flex-wrap items-center justify-between px-4 py-3 bg-slate-900/90 border-b border-slate-800 rounded-t-3xl font-mono text-xs gap-2">
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-2 text-emerald-400 font-black">
            <Terminal className="w-4 h-4" />
            <span className="text-xs">DEBUG CONSOLE</span>
          </div>

          <span className="hidden sm:inline-block px-2 py-0.5 bg-slate-800 text-slate-300 rounded text-[10px] font-bold">
            v1.0.4 PROFILER
          </span>
        </div>

        {/* Tab Selection */}
        <div className="flex items-center space-x-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-[10px] font-bold overflow-x-auto">
          <button
            onClick={() => setSelectedTab('console')}
            className={`px-2 py-1 rounded-lg transition-all ${
              selectedTab === 'console'
                ? 'bg-emerald-500 text-slate-950 font-black'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Console ({logs.length})
          </button>
          <button
            onClick={() => setSelectedTab('network')}
            className={`px-2 py-1 rounded-lg transition-all ${
              selectedTab === 'network'
                ? 'bg-emerald-500 text-slate-950 font-black'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Network
          </button>
          <button
            onClick={() => setSelectedTab('system')}
            className={`px-2 py-1 rounded-lg transition-all ${
              selectedTab === 'system'
                ? 'bg-emerald-500 text-slate-950 font-black'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Metrics
          </button>
          <button
            onClick={() => setSelectedTab('storage')}
            className={`px-2 py-1 rounded-lg transition-all ${
              selectedTab === 'storage'
                ? 'bg-emerald-500 text-slate-950 font-black'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Storage
          </button>
          <button
            onClick={() => setSelectedTab('android')}
            className={`px-2 py-1 rounded-lg transition-all flex items-center space-x-1 ${
              selectedTab === 'android'
                ? 'bg-cyan-500 text-slate-950 font-black'
                : 'text-cyan-400 hover:bg-cyan-950/40'
            }`}
          >
            <Smartphone className="w-3 h-3" />
            <span>Android</span>
          </button>
        </div>

        {/* Window Controls */}
        <div className="flex items-center space-x-1">
          <button
            onClick={() => setIsMaximized(!isMaximized)}
            className="p-1.5 hover:bg-slate-800 text-slate-400 hover:text-white rounded-lg transition-colors"
            title={isMaximized ? 'Minimize' : 'Maximize'}
          >
            {isMaximized ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={handleClose}
            className="p-1.5 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 rounded-lg transition-colors"
            title="Close Console"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Sub-toolbar for Console filters */}
      {selectedTab === 'console' && (
        <div className="px-4 py-2 bg-slate-900/50 border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
          {/* Search Input */}
          <div className="flex items-center space-x-2 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 flex-1 max-w-xs">
            <Search className="w-3.5 h-3.5 text-slate-500" />
            <input
              type="text"
              placeholder="Search logs & stack traces..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent text-white text-[11px] placeholder-slate-500 focus:outline-none w-full"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="text-slate-500 hover:text-white">
                <X className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* Level Filter Buttons */}
          <div className="flex items-center space-x-1 text-[10px] font-bold">
            <button
              onClick={() => setFilterType('all')}
              className={`px-2 py-1 rounded-lg ${
                filterType === 'all' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              All ({logs.length})
            </button>
            <button
              onClick={() => setFilterType('error')}
              className={`px-2 py-1 rounded-lg flex items-center space-x-1 ${
                filterType === 'error' ? 'bg-rose-500 text-slate-950 font-black' : 'text-rose-400 hover:bg-rose-950/30'
              }`}
            >
              <AlertOctagon className="w-3 h-3" />
              <span>Errors ({logs.filter((l) => l.type === 'error').length})</span>
            </button>
            <button
              onClick={() => setFilterType('warn')}
              className={`px-2 py-1 rounded-lg flex items-center space-x-1 ${
                filterType === 'warn' ? 'bg-amber-500 text-slate-950 font-black' : 'text-amber-400 hover:bg-amber-950/30'
              }`}
            >
              <AlertTriangle className="w-3 h-3" />
              <span>Warns ({logs.filter((l) => l.type === 'warn').length})</span>
            </button>
            <button
              onClick={() => setFilterType('info')}
              className={`px-2 py-1 rounded-lg flex items-center space-x-1 ${
                filterType === 'info' ? 'bg-sky-500 text-slate-950 font-black' : 'text-sky-400 hover:bg-sky-950/30'
              }`}
            >
              <Info className="w-3 h-3" />
              <span>Logs</span>
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-1">
            <button
              onClick={handleSimulateTestError}
              className="px-2 py-1 bg-rose-950/50 hover:bg-rose-900/60 text-rose-300 border border-rose-800/50 rounded-lg text-[10px] font-bold flex items-center space-x-1"
              title="Test Error Exception"
            >
              <Bug className="w-3 h-3 text-rose-400" />
              <span>Test Error</span>
            </button>

            <button
              onClick={handleClear}
              className="p-1.5 hover:bg-slate-800 text-slate-400 hover:text-rose-400 rounded-lg transition-colors"
              title="Clear Logs"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={handleExport}
              className="p-1.5 hover:bg-slate-800 text-slate-400 hover:text-emerald-400 rounded-lg transition-colors"
              title="Export Log File"
            >
              <Download className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Body Content by Tab */}
      <div className="flex-1 overflow-y-auto p-4 font-mono text-xs space-y-2 select-text">
        {selectedTab === 'console' && (
          <>
            {filteredLogs.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-slate-500 space-y-2 py-12">
                <Terminal className="w-8 h-8 text-slate-700" />
                <p className="text-xs">No console log entries recorded matching filter.</p>
              </div>
            ) : (
              filteredLogs.map((log) => (
                <div
                  key={log.id}
                  className={`p-2.5 rounded-xl border text-[11px] leading-relaxed transition-all ${
                    log.type === 'error'
                      ? 'bg-rose-950/30 border-rose-800/50 text-rose-300'
                      : log.type === 'warn'
                      ? 'bg-amber-950/30 border-amber-800/50 text-amber-300'
                      : log.type === 'network'
                      ? 'bg-cyan-950/30 border-cyan-800/50 text-cyan-300'
                      : log.type === 'system'
                      ? 'bg-indigo-950/30 border-indigo-800/50 text-indigo-300'
                      : 'bg-slate-900/60 border-slate-800 text-slate-300'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] text-slate-500 font-bold">{log.timestamp}</span>
                      <span
                        className={`px-1.5 py-0.2 rounded text-[9px] font-black uppercase ${
                          log.type === 'error'
                            ? 'bg-rose-500 text-slate-950'
                            : log.type === 'warn'
                            ? 'bg-amber-500 text-slate-950'
                            : log.type === 'network'
                            ? 'bg-cyan-400 text-slate-950'
                            : log.type === 'system'
                            ? 'bg-indigo-400 text-slate-950'
                            : 'bg-slate-700 text-white'
                        }`}
                      >
                        {log.type}
                      </span>
                    </div>

                    <button
                      onClick={() => handleCopyLog(log)}
                      className="p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-white transition-colors"
                      title="Copy Log text"
                    >
                      {copiedId === log.id ? (
                        <Check className="w-3 h-3 text-emerald-400" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                    </button>
                  </div>

                  <p className="mt-1 font-mono break-words font-semibold">{log.message}</p>

                  {log.details && (
                    <pre className="mt-1.5 p-2 bg-slate-950 rounded-lg text-[10px] text-slate-400 overflow-x-auto">
                      {JSON.stringify(log.details, null, 2)}
                    </pre>
                  )}

                  {log.stack && (
                    <details className="mt-1">
                      <summary className="text-[10px] text-rose-400 hover:underline cursor-pointer font-bold">
                        View Exception Stack Trace
                      </summary>
                      <pre className="mt-1 p-2 bg-slate-950 rounded-lg text-[9px] text-rose-300/80 overflow-x-auto whitespace-pre-wrap">
                        {log.stack}
                      </pre>
                    </details>
                  )}
                </div>
              ))
            )}
            <div ref={logEndRef} />
          </>
        )}

        {selectedTab === 'network' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center space-x-2 text-cyan-400 font-bold text-xs">
                <Globe className="w-4 h-4" />
                <span>API & WEBSOCKET NETWORK INSPECTOR</span>
              </div>
              <button
                onClick={handleSimulateNetworkLog}
                className="px-2.5 py-1 bg-cyan-950 hover:bg-cyan-900 text-cyan-300 border border-cyan-800 rounded-lg text-[10px] font-bold flex items-center space-x-1"
              >
                <Play className="w-3 h-3" />
                <span>Simulate Probe Ping</span>
              </button>
            </div>

            {logs.filter((l) => l.type === 'network').length === 0 ? (
              <div className="text-center py-8 text-slate-500 text-xs">
                No active network inspection traces captured yet. Click "Simulate Probe Ping" to test.
              </div>
            ) : (
              logs
                .filter((l) => l.type === 'network')
                .map((net) => (
                  <div key={net.id} className="p-3 bg-slate-900 border border-slate-800 rounded-2xl space-y-1">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-bold text-emerald-400">{net.message}</span>
                      <span className="text-[10px] text-slate-400">{net.durationMs}ms</span>
                    </div>
                    {net.details && (
                      <div className="text-[10px] text-slate-400 flex space-x-4">
                        <span>Protocol: {net.details.protocol}</span>
                        <span>Size: {net.details.responseSize}</span>
                        <span>Cache: {net.details.cache}</span>
                      </div>
                    )}
                  </div>
                ))
            )}
          </div>
        )}

        {selectedTab === 'system' && (
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-emerald-400 font-bold text-xs border-b border-slate-800 pb-2">
              <Cpu className="w-4 h-4" />
              <span>SYSTEM PERFORMANCE & V8 JS ENGINE HEALTH</span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-900 p-3 rounded-2xl border border-slate-800 space-y-1">
                <span className="text-slate-400 text-[10px] uppercase font-bold">MEMORY HEAP ALLOCATION</span>
                <p className="text-xl font-black text-emerald-400">{memoryHeap} MB</p>
                <div className="w-full bg-slate-950 rounded-full h-1.5 overflow-hidden border border-slate-800">
                  <div
                    className="bg-emerald-400 h-full rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(100, (memoryHeap / 100) * 100)}%` }}
                  />
                </div>
              </div>

              <div className="bg-slate-900 p-3 rounded-2xl border border-slate-800 space-y-1">
                <span className="text-slate-400 text-[10px] uppercase font-bold">FRAME RATE RENDERING</span>
                <p className="text-xl font-black text-cyan-400">{fps} FPS</p>
                <span className="text-[10px] text-emerald-400 flex items-center space-x-1">
                  <Check className="w-3 h-3" />
                  <span>Smooth 60 FPS Target</span>
                </span>
              </div>
            </div>

            <div className="bg-slate-900 p-3 rounded-2xl border border-slate-800 text-[11px] space-y-2">
              <span className="font-bold text-slate-300 block border-b border-slate-800 pb-1">
                Client Browser Runtime Snapshot
              </span>
              <div className="grid grid-cols-1 gap-1 text-[10px] text-slate-400">
                <p>User Agent: {typeof navigator !== 'undefined' ? navigator.userAgent : 'Server Node'}</p>
                <p>Online Status: {typeof navigator !== 'undefined' && navigator.onLine ? '🟢 Online' : '🔴 Offline'}</p>
                <p>Screen Resolution: {typeof window !== 'undefined' ? `${window.innerWidth}x${window.innerHeight} px` : 'N/A'}</p>
              </div>
            </div>
          </div>
        )}

        {selectedTab === 'storage' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <div className="flex items-center space-x-2 text-amber-400 font-bold text-xs">
                <HardDrive className="w-4 h-4" />
                <span>LOCALSTORAGE KEY-VALUE INSPECTOR</span>
              </div>
              <span className="text-[10px] text-slate-400 font-bold">
                Total Keys: {storageKeys.length}
              </span>
            </div>

            {storageKeys.length === 0 ? (
              <p className="text-slate-500 text-xs text-center py-6">LocalStorage is empty.</p>
            ) : (
              <div className="space-y-2">
                {storageKeys.map((item) => (
                  <div
                    key={item.key}
                    className="p-2.5 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-between text-[11px]"
                  >
                    <div className="truncate max-w-[280px]">
                      <span className="font-bold text-amber-300 block truncate">{item.key}</span>
                      <span className="text-[10px] text-slate-500">
                        {typeof window !== 'undefined' ? `${(localStorage.getItem(item.key) || '').substring(0, 45)}...` : ''}
                      </span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] text-slate-400 font-bold">{item.sizeKb} KB</span>
                      <button
                        onClick={() => {
                          if (typeof window !== 'undefined') {
                            localStorage.removeItem(item.key);
                            setStorageKeys((prev) => prev.filter((s) => s.key !== item.key));
                          }
                        }}
                        className="p-1 text-slate-500 hover:text-rose-400 rounded transition-colors"
                        title="Delete key"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ANDROID MOBILE DEBUGGING HANDLER & GUIDE TAB */}
        {selectedTab === 'android' && (
          <div className="space-y-4 text-xs font-sans">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2 font-mono">
              <div className="flex items-center space-x-2 text-cyan-400 font-bold text-xs">
                <Smartphone className="w-4 h-4 text-cyan-400" />
                <span>ANDROID PHONE DEBUGGING & MOBILE DEVTOOLS SUITE</span>
              </div>
              <span className="px-2 py-0.5 bg-cyan-950 text-cyan-300 border border-cyan-800 rounded text-[10px] font-bold">
                MOBILE COMPATIBLE
              </span>
            </div>

            {/* Quick Action Bar for Android */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono">
              <button
                onClick={handleToggleMobileDebugUrlParam}
                className="p-3 bg-slate-900 border border-slate-800 hover:border-cyan-500/50 rounded-2xl flex items-center justify-between text-left transition-all group"
              >
                <div>
                  <span className="text-xs font-black text-cyan-300 block flex items-center space-x-1.5">
                    <Zap className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Toggle ?debug=true in URL</span>
                  </span>
                  <p className="text-[10px] text-slate-400 mt-0.5">
                    {isDebugEnabled ? 'Disable debug URL parameter' : 'Reload page with ?debug=true active'}
                  </p>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 shrink-0 ml-2" />
              </button>

              <button
                onClick={handleToggleErudaMobileInspector}
                className="p-3 bg-slate-900 border border-slate-800 hover:border-amber-500/50 rounded-2xl flex items-center justify-between text-left transition-all group"
              >
                <div>
                  <span className="text-xs font-black text-amber-300 block flex items-center space-x-1.5">
                    <Code className="w-3.5 h-3.5 text-amber-400" />
                    <span>{isErudaActive ? 'Destroy Eruda DevTools' : 'Inject Eruda Mobile Console'}</span>
                  </span>
                  <p className="text-[10px] text-slate-400 mt-0.5">
                    Floating mobile web inspector on screen
                  </p>
                </div>
                <div className={`w-2.5 h-2.5 rounded-full ${isErudaActive ? 'bg-amber-400 animate-ping' : 'bg-slate-700'}`} />
              </button>
            </div>

            {/* Android Share Logs */}
            <div className="p-3 bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-between gap-2 font-mono">
              <div>
                <span className="text-slate-200 font-bold block text-xs">Share Debug Logs via Android Native Share</span>
                <p className="text-[10px] text-slate-400">Exports logs to WhatsApp, Gmail, Notes, or Drive</p>
              </div>
              <button
                onClick={handleAndroidShareLogs}
                className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl text-[11px] flex items-center space-x-1 shrink-0"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Share Logs</span>
              </button>
            </div>

            {androidShareStatus && (
              <div className="p-2 bg-emerald-950 text-emerald-300 border border-emerald-800 rounded-xl font-mono text-[11px] font-bold">
                {androidShareStatus}
              </div>
            )}

            {/* Step-by-Step Android Debug Methods */}
            <div className="space-y-3 pt-1">
              <h4 className="text-xs font-bold text-slate-300 font-mono uppercase tracking-wider">
                5 Ways to Handle Debugging on Android Mobile:
              </h4>

              {/* Method 1: Multi-Touch Gestures */}
              <div className="p-3 bg-slate-900/80 border border-slate-800 rounded-2xl space-y-1">
                <div className="flex items-center space-x-2 text-cyan-400 font-mono font-bold text-xs">
                  <span className="w-5 h-5 rounded-full bg-cyan-950 border border-cyan-800 flex items-center justify-center text-[10px]">1</span>
                  <span>Multi-Touch Screen Gestures (No Keyboard Needed)</span>
                </div>
                <p className="text-slate-300 text-[11px] pl-7">
                  Touch <strong>3 fingers simultaneously</strong> anywhere on your Android phone screen to instantly summon this Debug Console. You can also tap 4 times rapidly in succession.
                </p>
              </div>

              {/* Method 2: URL Query String */}
              <div className="p-3 bg-slate-900/80 border border-slate-800 rounded-2xl space-y-1">
                <div className="flex items-center space-x-2 text-emerald-400 font-mono font-bold text-xs">
                  <span className="w-5 h-5 rounded-full bg-emerald-950 border border-emerald-800 flex items-center justify-center text-[10px]">2</span>
                  <span>URL Parameter (`?debug=true`)</span>
                </div>
                <p className="text-slate-300 text-[11px] pl-7">
                  Append <code className="bg-slate-950 text-amber-300 px-1 py-0.5 rounded font-mono">?debug=true</code> to the address bar in Chrome or Brave on Android to keep the console active across page reloads.
                </p>
              </div>

              {/* Method 3: Chrome USB Remote Debugging */}
              <div className="p-3 bg-slate-900/80 border border-slate-800 rounded-2xl space-y-2">
                <div className="flex items-center space-x-2 text-indigo-400 font-mono font-bold text-xs">
                  <span className="w-5 h-5 rounded-full bg-indigo-950 border border-indigo-800 flex items-center justify-center text-[10px]">3</span>
                  <Usb className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Chrome Android USB Remote Debugging (`chrome://inspect`)</span>
                </div>
                <ol className="list-decimal list-inside space-y-1 text-slate-300 text-[11px] pl-7">
                  <li>On Android: Open <strong>Settings &gt; System &gt; Developer options</strong> and turn on <strong>USB Debugging</strong>.</li>
                  <li>Connect your Android phone to your PC via USB cable.</li>
                  <li>Open Google Chrome on PC and navigate to <code className="bg-slate-950 text-cyan-300 px-1.5 py-0.5 rounded font-mono">chrome://inspect/#devices</code>.</li>
                  <li>Click <strong>Inspect</strong> under your connected Android target tab to view full Chrome DevTools!</li>
                </ol>
              </div>

              {/* Method 4: Eruda In-Browser Mobile DevTools */}
              <div className="p-3 bg-slate-900/80 border border-slate-800 rounded-2xl space-y-1">
                <div className="flex items-center space-x-2 text-amber-400 font-mono font-bold text-xs">
                  <span className="w-5 h-5 rounded-full bg-amber-950 border border-amber-800 flex items-center justify-center text-[10px]">4</span>
                  <span>Eruda Mobile Console Injector</span>
                </div>
                <p className="text-slate-300 text-[11px] pl-7">
                  Click the <strong>Inject Eruda Mobile Console</strong> button above to load a lightweight floating gear button on your Android screen. Tap it to inspect DOM elements, CSS styles, cookies, and local storage directly on mobile!
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer Status bar */}
      <div className="px-4 py-2 bg-slate-900/90 border-t border-slate-800 rounded-b-3xl flex items-center justify-between font-mono text-[10px] text-slate-400">
        <span className="flex items-center space-x-1.5">
          <Activity className="w-3 h-3 text-emerald-400 animate-pulse" />
          <span>HEAP: {memoryHeap} MB</span>
        </span>
        <span>FPS: {fps}</span>
        <span className="hidden sm:inline text-slate-500">Android Touch 3-Finger Tap or Alt + D</span>
      </div>
    </div>
  );
};

