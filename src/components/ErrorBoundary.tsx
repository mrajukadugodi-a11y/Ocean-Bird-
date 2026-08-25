import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertOctagon, RefreshCw, Trash2, Copy, Check, ChevronDown, ChevronUp, Terminal } from 'lucide-react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onReset?: () => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  copied: boolean;
  showDetails: boolean;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = {
    hasError: false,
    error: null,
    errorInfo: null,
    copied: false,
    showDetails: false,
  };

  public static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('[Application ErrorBoundary Caught Error]:', error, errorInfo);
    this.setState({ errorInfo });

    // Store error log in window context for debug console
    if (typeof window !== 'undefined') {
      const existingLogs = JSON.parse(localStorage.getItem('app_error_logs') || '[]');
      existingLogs.unshift({
        timestamp: new Date().toISOString(),
        message: error.message || 'Unknown Runtime Error',
        stack: error.stack || '',
        componentStack: errorInfo.componentStack || '',
      });
      localStorage.setItem('app_error_logs', JSON.stringify(existingLogs.slice(0, 20)));
    }
  }

  private handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      copied: false,
      showDetails: false,
    });
    if (this.props.onReset) {
      this.props.onReset();
    }
  };

  private handleClearCacheAndReload = () => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.removeItem('app_error_logs');
      }
      window.location.reload();
    } catch {
      window.location.reload();
    }
  };

  private handleCopyStack = () => {
    const { error, errorInfo } = this.state;
    const text = `Error: ${error?.message || 'Unknown'}\nStack: ${error?.stack || ''}\nComponent Stack: ${errorInfo?.componentStack || ''}`;
    navigator.clipboard.writeText(text).then(() => {
      this.setState({ copied: true });
      setTimeout(() => this.setState({ copied: false }), 2000);
    });
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-[450px] w-full bg-slate-950 border-2 border-rose-500/50 rounded-3xl p-6 md:p-8 text-white shadow-2xl flex flex-col justify-between my-6 animate-in fade-in zoom-in-95 duration-200">
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-start justify-between border-b border-rose-900/50 pb-4">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-2xl text-rose-400">
                  <AlertOctagon className="w-8 h-8 animate-pulse" />
                </div>
                <div>
                  <div className="text-xs font-mono font-bold text-rose-400 uppercase tracking-widest flex items-center space-x-2">
                    <span>APPLICATION RUNTIME SAFEGUARD ACTIVE</span>
                  </div>
                  <h2 className="text-xl md:text-2xl font-black text-white">
                    Component Recovery Mode
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    An unexpected runtime error was caught safely. The rest of the portal remains stable.
                  </p>
                </div>
              </div>

              <span className="hidden sm:inline-flex px-3 py-1 bg-rose-950 text-rose-300 border border-rose-800 rounded-full text-[10px] font-mono font-bold">
                ERR_SAFE_RESTORE
              </span>
            </div>

            {/* Main Error Box */}
            <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl font-mono text-xs text-rose-300 space-y-2">
              <div className="flex items-center justify-between text-slate-400 text-[11px] font-bold">
                <span className="flex items-center space-x-1.5">
                  <Terminal className="w-4 h-4 text-rose-400" />
                  <span>Captured Exception Message</span>
                </span>
                <button
                  onClick={this.handleCopyStack}
                  className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-[10px] flex items-center space-x-1 transition-colors"
                >
                  {this.state.copied ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-400 font-bold">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy Diagnostics</span>
                    </>
                  )}
                </button>
              </div>

              <p className="text-sm font-bold text-rose-200 break-words leading-relaxed">
                {this.state.error?.message || 'An unknown React component error occurred.'}
              </p>

              {/* Collapsible Details */}
              <button
                onClick={() => this.setState({ showDetails: !this.state.showDetails })}
                className="pt-2 text-slate-400 hover:text-slate-200 text-[10px] font-bold flex items-center space-x-1 transition-colors"
              >
                {this.state.showDetails ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                <span>{this.state.showDetails ? 'Hide Stack Trace' : 'View Component Call Stack'}</span>
              </button>

              {this.state.showDetails && (
                <div className="mt-2 p-3 bg-slate-950 rounded-xl border border-slate-800 text-[10px] text-slate-400 overflow-x-auto max-h-48 whitespace-pre-wrap font-mono">
                  <p className="font-bold text-amber-300 mb-1">Component Stack:</p>
                  {this.state.errorInfo?.componentStack || 'No component stack trace captured.'}
                  <p className="font-bold text-amber-300 mt-2 mb-1">Error Stack:</p>
                  {this.state.error?.stack || 'No stack trace captured.'}
                </div>
              )}
            </div>
          </div>

          {/* Action Footer */}
          <div className="mt-6 pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
            <button
              onClick={this.handleReset}
              className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl shadow-lg shadow-emerald-500/20 flex items-center space-x-2 transition-all active:scale-95"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Retry Component Mount</span>
            </button>

            <button
              onClick={this.handleClearCacheAndReload}
              className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-xl flex items-center space-x-2 transition-all"
            >
              <Trash2 className="w-4 h-4 text-rose-400" />
              <span>Clear State & Hard Reload</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
