import React, { useState } from 'react';
import {
  FileText,
  Terminal,
  Server,
  Cloud,
  Globe,
  Lock,
  Copy,
  CheckCircle2,
  ExternalLink,
  Code2,
  Cpu,
  ShieldCheck,
  Download,
  BookOpen
} from 'lucide-react';
import { hapticEngine } from '../../utils/hapticUtils';

interface DeploymentDocsHubProps {
  triggerToast?: (msg: string, type?: 'success' | 'info' | 'warning' | 'error', title?: string) => void;
}

export const DeploymentDocsHub: React.FC<DeploymentDocsHubProps> = ({ triggerToast }) => {
  const [copiedSnippet, setCopiedSnippet] = useState<string | null>(null);

  const notify = (msg: string, type: 'success' | 'info' | 'warning' | 'error' = 'info', title?: string) => {
    if (triggerToast) {
      triggerToast(msg, type, title);
    } else {
      console.log(`[${type}] ${title}: ${msg}`);
    }
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSnippet(label);
    hapticEngine.trigger('success');
    notify(`Copied ${label} to clipboard!`, 'success', 'COPIED');

    setTimeout(() => {
      setCopiedSnippet(null);
    }, 2000);
  };

  const dockerfileSnippet = `FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
RUN npm ci --only=production
EXPOSE 3000
CMD ["node", "dist/server.cjs"]`;

  const firestoreRulesSnippet = `rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    match /receipts/{receiptId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null;
    }
  }
}`;

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 sm:p-8 space-y-6 shadow-2xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <BookOpen className="w-6 h-6 text-amber-400" />
              <h2 className="text-xl font-bold text-white">Production Deployment &amp; Publishing Documentation</h2>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Step-by-step guide to hosting, publishing, Firebase rule deployment, and Cloud Run custom domain setup.
            </p>
          </div>

          <button
            onClick={() => {
              copyToClipboard(dockerfileSnippet, 'Dockerfile & Cloud Run Bundle');
            }}
            className="px-3.5 py-2 rounded-xl bg-amber-500 text-slate-950 font-black font-mono text-xs shadow-lg flex items-center space-x-1.5"
          >
            <Copy className="w-3.5 h-3.5" />
            <span>Copy Dockerfile</span>
          </button>
        </div>

        {/* Deployment Steps Guide */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
            <div className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 flex items-center justify-center font-mono font-black text-sm">
              01
            </div>
            <h3 className="text-sm font-bold text-white">Google Cloud Run Deployment</h3>
            <p className="text-xs font-mono text-slate-400 leading-relaxed">
              Open AI Studio Settings &gt; Click <strong>Deploy to Cloud Run</strong>. Your express server will build into a single CommonJS bundle (`dist/server.cjs`) listening on port 3000.
            </p>
          </div>

          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center justify-center font-mono font-black text-sm">
              02
            </div>
            <h3 className="text-sm font-bold text-white">Stripe &amp; Firebase Env Keys</h3>
            <p className="text-xs font-mono text-slate-400 leading-relaxed">
              Declare environment variables in `.env.example`:
              <br />• `STRIPE_SECRET_KEY` (Server-side)
              <br />• `VITE_STRIPE_PUBLIC_KEY` (Client-side)
              <br />• `GEMINI_API_KEY` (Server-side)
            </p>
          </div>

          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center justify-center font-mono font-black text-sm">
              03
            </div>
            <h3 className="text-sm font-bold text-white">Custom Domain &amp; SSL</h3>
            <p className="text-xs font-mono text-slate-400 leading-relaxed">
              Map your custom port domain (e.g. `dutyfree.mumbaiport.gov.in`) in Cloud Run Domain Mappings. Managed SSL certificates are automatically provisioned.
            </p>
          </div>
        </div>

        {/* Code Snippet: Firestore Security Rules */}
        <div className="space-y-3 pt-2">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold text-white flex items-center space-x-2">
              <Lock className="w-4 h-4 text-emerald-400" />
              <span>Firebase Firestore Security Rules (`firestore.rules`)</span>
            </h3>

            <button
              onClick={() => copyToClipboard(firestoreRulesSnippet, 'Firestore Security Rules')}
              className="px-3 py-1 rounded-xl bg-slate-950 hover:bg-slate-800 text-cyan-300 font-mono text-xs border border-slate-800 flex items-center space-x-1"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>{copiedSnippet === 'Firestore Security Rules' ? 'Copied!' : 'Copy Rules'}</span>
            </button>
          </div>

          <pre className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-emerald-400 font-mono text-xs overflow-x-auto">
            {firestoreRulesSnippet}
          </pre>
        </div>

        {/* Code Snippet: Production Container Dockerfile */}
        <div className="space-y-3 pt-2">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold text-white flex items-center space-x-2">
              <Terminal className="w-4 h-4 text-cyan-400" />
              <span>Production Multi-Stage Dockerfile</span>
            </h3>

            <button
              onClick={() => copyToClipboard(dockerfileSnippet, 'Dockerfile')}
              className="px-3 py-1 rounded-xl bg-slate-950 hover:bg-slate-800 text-cyan-300 font-mono text-xs border border-slate-800 flex items-center space-x-1"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>{copiedSnippet === 'Dockerfile' ? 'Copied!' : 'Copy Dockerfile'}</span>
            </button>
          </div>

          <pre className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-cyan-300 font-mono text-xs overflow-x-auto">
            {dockerfileSnippet}
          </pre>
        </div>
      </div>
    </div>
  );
};
