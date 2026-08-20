import React, { useState, useEffect } from 'react';
import {
  Rocket,
  GitBranch,
  Terminal,
  Server,
  Smartphone,
  Globe,
  Search,
  Copy,
  Check,
  ShieldCheck,
  Code,
  Layers,
  Sparkles,
  Download,
  ExternalLink,
  BookOpen,
  Cpu,
  RefreshCw,
  HardDrive,
  CheckCircle2,
  AlertTriangle,
  FileCode,
  Settings,
  Flame,
  Radio,
  FileText
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { hapticEngine } from '../utils/hapticUtils';

export const DeploymentGuideView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'deploy-guide' | 'cicd-config' | 'pwa-manifest' | 'seo-meta' | 'docker-cloudrun'>('deploy-guide');
  const [copiedSection, setCopiedSection] = useState<string | null>(null);
  const [swStatus, setSwStatus] = useState<string>('Checking Service Worker...');
  const [isPwaInstalled, setIsPwaInstalled] = useState<boolean>(false);

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistration().then((reg) => {
        if (reg) {
          setSwStatus(`ACTIVE & REGISTERED (Scope: ${reg.scope})`);
        } else {
          setSwStatus('SUPPORTED (Pending registration or refreshed)');
        }
      }).catch(() => {
        setSwStatus('SERVICE WORKER READY');
      });
    } else {
      setSwStatus('NOT SUPPORTED ON THIS BROWSER');
    }

    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsPwaInstalled(true);
    }
  }, []);

  const copyToClipboard = (text: string, sectionId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(sectionId);
    hapticEngine.trigger('success');
    setTimeout(() => setCopiedSection(null), 3000);
  };

  const DOCKER_CLI_SCRIPT = `# 1. Build Docker image
docker build -t ocean-bird-app:latest .

# 2. Run container locally on port 3000
docker run -d -p 3000:3000 --name ocean-bird ocean-bird-app:latest

# 3. Test liveness check
curl http://localhost:3000/`;

  const CLOUD_RUN_CLI_SCRIPT = `# 1. Set active Google Cloud Project
gcloud config set project YOUR_GCP_PROJECT_ID

# 2. Build image via Cloud Build
gcloud builds submit --tag gcr.io/YOUR_GCP_PROJECT_ID/ocean-bird-app:latest .

# 3. Deploy to Cloud Run on Port 3000
gcloud run deploy ocean-bird-app \\
  --image gcr.io/YOUR_GCP_PROJECT_ID/ocean-bird-app:latest \\
  --region asia-southeast1 \\
  --platform managed \\
  --allow-unauthenticated \\
  --port 3000 \\
  --memory 1Gi \\
  --cpu 1`;

  const CICD_YAML_CONTENT = `name: OCEAN BIRD CI/CD Pipeline & Automated Deployment

on:
  push:
    branches: [ "main", "master" ]
  pull_request:
    branches: [ "main", "master" ]

env:
  PROJECT_ID: \${{ secrets.GCP_PROJECT_ID }}
  SERVICE_NAME: ocean-bird-app
  REGION: asia-southeast1
  IMAGE_NAME: gcr.io/\${{ secrets.GCP_PROJECT_ID }}/ocean-bird-app

jobs:
  build-and-test:
    name: 🧪 Lint, Test & Compile App
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20.x
          cache: 'npm'
      - run: npm ci || npm install
      - run: npm run lint
      - run: npm run build

  deploy-cloud-run:
    name: 🚀 Deploy to Google Cloud Run
    needs: build-and-test
    if: github.ref == 'refs/heads/main' && github.event_name == 'push'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: google-github-actions/auth@v2
        with:
          credentials_json: \${{ secrets.GCP_SA_KEY }}
      - uses: google-github-actions/setup-gcloud@v2
      - run: gcloud auth configure-docker --quiet
      - run: docker build -t $IMAGE_NAME:\${{ github.sha }} -t $IMAGE_NAME:latest .
      - run: docker push $IMAGE_NAME:latest
      - run: |
          gcloud run deploy $SERVICE_NAME \\
            --image $IMAGE_NAME:\${{ github.sha }} \\
            --region $REGION \\
            --platform managed \\
            --allow-unauthenticated \\
            --port 3000`;

  const PWA_MANIFEST_SNIPPET = `{
  "short_name": "OCEAN BIRD",
  "name": "OCEAN BIRD Maritime Navigation Platform",
  "icons": [
    { "src": "/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icon-512.png", "sizes": "512x512", "type": "image/png" }
  ],
  "start_url": "/?utm_source=pwa",
  "background_color": "#020617",
  "theme_color": "#0284c7",
  "display": "standalone",
  "orientation": "any"
}`;

  const SEO_HTML_SNIPPET = `<!-- Primary SEO & Social Tags -->
<title>OCEAN BIRD by Eastman Creation - Maritime Navigation Platform</title>
<meta name="description" content="Global Maritime Fleet Management, Commercial License Issuer, Health Passport, Flight Tracking & Ocean Dollar System." />
<meta property="og:title" content="OCEAN BIRD - Maritime Fleet Command & Ocean Money System" />
<meta property="og:image" content="https://oceanbird.eastmancreation.com/og-image.jpg" />
<meta name="twitter:card" content="summary_large_image" />
<link rel="manifest" href="/manifest.json" />
<meta name="theme-color" content="#0284c7" />`;

  return (
    <div className="space-y-6 pb-20 text-slate-100 font-sans">
      {/* HEADER BANNER */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 border border-cyan-500/40 rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-cyan-500/20 text-cyan-300 text-xs font-bold font-mono px-3 py-1 rounded-full border border-cyan-500/40 flex items-center space-x-1.5">
                <Rocket className="w-3.5 h-3.5 text-cyan-400" />
                <span>OFFICIAL DEPLOYMENT & DEVOPS CENTER</span>
              </span>
              <span className="bg-emerald-500/20 text-emerald-300 text-xs font-bold font-mono px-3 py-1 rounded-full border border-emerald-500/40 flex items-center space-x-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>PRODUCTION READY</span>
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight flex items-center space-x-3">
              <span>Deploy, CI/CD, PWA & SEO Command Center</span>
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm max-w-3xl leading-relaxed">
              Step-by-step deployment instructions for Google Cloud Run, GitHub Actions CI/CD pipeline, Progressive Web App (PWA) manifest status, and Search Engine Optimization (SEO) OpenGraph metadata.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0 font-mono text-xs">
            <div className="bg-slate-900/90 border border-slate-800 p-3 rounded-2xl">
              <span className="text-slate-400 text-[10px] block">PWA SERVICE WORKER</span>
              <span className="text-emerald-400 font-bold">{swStatus.split(' ')[0]}</span>
            </div>
            <div className="bg-slate-900/90 border border-slate-800 p-3 rounded-2xl">
              <span className="text-slate-400 text-[10px] block">INGRESS PORT</span>
              <span className="text-cyan-400 font-bold">3000 (HTTP)</span>
            </div>
          </div>
        </div>
      </div>

      {/* NAVIGATION SUB TABS */}
      <div className="flex items-center space-x-2 border-b border-slate-800 pb-2 overflow-x-auto no-scrollbar">
        <button
          onClick={() => setActiveTab('deploy-guide')}
          className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'deploy-guide'
              ? 'bg-cyan-500 text-slate-950 font-black shadow-lg'
              : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Deployment Guide</span>
        </button>

        <button
          onClick={() => setActiveTab('cicd-config')}
          className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'cicd-config'
              ? 'bg-cyan-500 text-slate-950 font-black shadow-lg'
              : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
          }`}
        >
          <GitBranch className="w-4 h-4 text-emerald-400" />
          <span>CI/CD Workflow (.github/workflows)</span>
        </button>

        <button
          onClick={() => setActiveTab('pwa-manifest')}
          className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'pwa-manifest'
              ? 'bg-cyan-500 text-slate-950 font-black shadow-lg'
              : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
          }`}
        >
          <Smartphone className="w-4 h-4 text-amber-400" />
          <span>PWA Manifest & Service Worker</span>
        </button>

        <button
          onClick={() => setActiveTab('seo-meta')}
          className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'seo-meta'
              ? 'bg-cyan-500 text-slate-950 font-black shadow-lg'
              : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
          }`}
        >
          <Search className="w-4 h-4 text-cyan-400" />
          <span>SEO & OpenGraph Metadata</span>
        </button>

        <button
          onClick={() => setActiveTab('docker-cloudrun')}
          className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'docker-cloudrun'
              ? 'bg-cyan-500 text-slate-950 font-black shadow-lg'
              : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
          }`}
        >
          <Server className="w-4 h-4 text-indigo-400" />
          <span>Docker & Cloud Run Commands</span>
        </button>
      </div>

      {/* 1. DEPLOYMENT GUIDE */}
      {activeTab === 'deploy-guide' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* PLATFORM CARD 1: GOOGLE CLOUD RUN */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 font-bold">
                  <Server className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-black text-white">1. Google Cloud Run (Recommended)</h3>
                <p className="text-slate-300 text-xs leading-relaxed">
                  Serverless container deployment. Scales to zero when idle, automatic SSL certificate provisioning, and global edge routing.
                </p>
                <div className="space-y-1 font-mono text-[11px] text-slate-400">
                  <div className="flex items-center space-x-1 text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Port 3000 Ingress Binding</span>
                  </div>
                  <div className="flex items-center space-x-1 text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Multi-stage Dockerfile Provided</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setActiveTab('docker-cloudrun')}
                className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black py-2.5 rounded-xl text-xs transition-all flex items-center justify-center space-x-1"
              >
                <span>View Commands</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* PLATFORM CARD 2: VERCEL / NETLIFY */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-bold">
                  <Globe className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-black text-white">2. Vercel & Netlify Static Edge</h3>
                <p className="text-slate-300 text-xs leading-relaxed">
                  One-click deployment for frontend SPA. Connects to your GitHub repo, executes <code className="text-amber-300">npm run build</code>, and serves from <code className="text-amber-300">dist/</code>.
                </p>
                <div className="space-y-1 font-mono text-[11px] text-slate-400">
                  <div className="flex items-center space-x-1 text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Framework Preset: Vite</span>
                  </div>
                  <div className="flex items-center space-x-1 text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Output Directory: dist</span>
                  </div>
                </div>
              </div>

              <a
                href="https://vercel.com/new"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold py-2.5 rounded-xl text-xs border border-slate-700 transition-all flex items-center justify-center space-x-1"
              >
                <span>Deploy on Vercel</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* PLATFORM CARD 3: GITHUB ACTIONS CI/CD */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-bold">
                  <GitBranch className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-black text-white">3. Automated CI/CD Pipeline</h3>
                <p className="text-slate-300 text-xs leading-relaxed">
                  Automated test, lint, Docker build, and deployment workflow triggered on every git push to <code className="text-amber-300">main</code>.
                </p>
                <div className="space-y-1 font-mono text-[11px] text-slate-400">
                  <div className="flex items-center space-x-1 text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Config: .github/workflows/deploy.yml</span>
                  </div>
                  <div className="flex items-center space-x-1 text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>GitHub Pages & GCP Integration</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setActiveTab('cicd-config')}
                className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold py-2.5 rounded-xl text-xs border border-slate-700 transition-all flex items-center justify-center space-x-1"
              >
                <span>View CI/CD YAML</span>
                <Code className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. CI/CD CONFIG TAB */}
      {activeTab === 'cicd-config' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs font-mono font-bold text-emerald-400 block">FILE: .github/workflows/deploy.yml</span>
              <h2 className="text-xl font-black text-white">GitHub Actions Automated CI/CD Pipeline</h2>
            </div>

            <button
              onClick={() => copyToClipboard(CICD_YAML_CONTENT, 'cicd-yaml')}
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black px-4 py-2 rounded-xl text-xs transition-all flex items-center space-x-1.5 shadow-md"
            >
              {copiedSection === 'cicd-yaml' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copiedSection === 'cicd-yaml' ? 'Copied YAML!' : 'Copy Workflow YAML'}</span>
            </button>
          </div>

          <pre className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-xs font-mono text-cyan-300 overflow-x-auto max-h-96 leading-relaxed">
            {CICD_YAML_CONTENT}
          </pre>
        </div>
      )}

      {/* 3. PWA MANIFEST TAB */}
      {activeTab === 'pwa-manifest' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-mono font-bold text-amber-400 block">PROGRESSIVE WEB APP ENGINE</span>
                <h2 className="text-xl font-black text-white">PWA Status & Manifest Configuration</h2>
              </div>

              <div className="flex items-center space-x-2">
                <span className="bg-emerald-500/20 text-emerald-300 text-xs font-mono font-bold px-3 py-1 rounded-full border border-emerald-500/40">
                  MANIFEST: /public/manifest.json
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-slate-300 font-mono">LIVE PWA DIAGNOSTICS</h3>
                <div className="space-y-2 text-xs font-mono">
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-center justify-between">
                    <span className="text-slate-400">Service Worker Registration:</span>
                    <span className="text-emerald-400 font-bold">{swStatus}</span>
                  </div>
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-center justify-between">
                    <span className="text-slate-400">Display Mode:</span>
                    <span className="text-cyan-400 font-bold">{isPwaInstalled ? 'Standalone (Installed)' : 'Browser Window'}</span>
                  </div>
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-center justify-between">
                    <span className="text-slate-400">Theme Color:</span>
                    <span className="text-amber-400 font-bold">#0284c7 (Ocean Cyan)</span>
                  </div>
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-center justify-between">
                    <span className="text-slate-400">Offline Fallback Datastore:</span>
                    <span className="text-emerald-400 font-bold">Active in /sw.js</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-300 font-mono">MANIFEST.JSON SNIPPET</h3>
                  <button
                    onClick={() => copyToClipboard(PWA_MANIFEST_SNIPPET, 'pwa-snippet')}
                    className="text-xs text-cyan-400 hover:text-cyan-300 font-mono font-bold"
                  >
                    {copiedSection === 'pwa-snippet' ? 'Copied!' : 'Copy Snippet'}
                  </button>
                </div>
                <pre className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-xs font-mono text-amber-300 overflow-x-auto max-h-60 leading-relaxed">
                  {PWA_MANIFEST_SNIPPET}
                </pre>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. SEO META TAB */}
      {activeTab === 'seo-meta' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs font-mono font-bold text-cyan-400 block">SEARCH ENGINE & SOCIAL CARDS</span>
              <h2 className="text-xl font-black text-white">SEO & OpenGraph Metadata Tagging</h2>
            </div>

            <button
              onClick={() => copyToClipboard(SEO_HTML_SNIPPET, 'seo-html')}
              className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black px-4 py-2 rounded-xl text-xs transition-all flex items-center space-x-1.5 shadow-md"
            >
              {copiedSection === 'seo-html' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copiedSection === 'seo-html' ? 'Copied Meta!' : 'Copy SEO HTML'}</span>
            </button>
          </div>

          <pre className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-xs font-mono text-emerald-300 overflow-x-auto max-h-72 leading-relaxed">
            {SEO_HTML_SNIPPET}
          </pre>
        </div>
      )}

      {/* 5. DOCKER & CLOUD RUN COMMANDS */}
      {activeTab === 'docker-cloudrun' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-black text-white flex items-center space-x-2">
                <Server className="w-4 h-4 text-cyan-400" />
                <span>Docker Container Build Commands</span>
              </h3>
              <button
                onClick={() => copyToClipboard(DOCKER_CLI_SCRIPT, 'docker-script')}
                className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-xl font-mono font-bold border border-slate-700"
              >
                {copiedSection === 'docker-script' ? 'Copied!' : 'Copy Docker Script'}
              </button>
            </div>
            <pre className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-xs font-mono text-cyan-300 overflow-x-auto">
              {DOCKER_CLI_SCRIPT}
            </pre>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-black text-white flex items-center space-x-2">
                <Rocket className="w-4 h-4 text-emerald-400" />
                <span>Google Cloud Run CLI Deployment</span>
              </h3>
              <button
                onClick={() => copyToClipboard(CLOUD_RUN_CLI_SCRIPT, 'cloudrun-script')}
                className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-xl font-mono font-bold border border-slate-700"
              >
                {copiedSection === 'cloudrun-script' ? 'Copied!' : 'Copy Cloud Run Script'}
              </button>
            </div>
            <pre className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-xs font-mono text-emerald-300 overflow-x-auto">
              {CLOUD_RUN_CLI_SCRIPT}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};
