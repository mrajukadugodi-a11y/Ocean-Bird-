# 🚀 OCEAN BIRD - Comprehensive Deployment, CI/CD, PWA & SEO Guide

Welcome to the official deployment and operational guide for **OCEAN BIRD by Eastman Creation**, the full-stack Maritime Navigation, Fleet Command, Commercial License Issuer, Health Passport, and Digital Ocean Dollar ($OD) Platform.

---

## 📋 Table of Contents
1. [Architecture Overview](#1-architecture-overview)
2. [PWA & Offline Service Worker Setup](#2-pwa--offline-service-worker-setup)
3. [SEO Metadata & Social Sharing Integration](#3-seo-metadata--social-sharing-integration)
4. [CI/CD Automated Pipeline (GitHub Actions)](#4-cicd-automated-pipeline-github-actions)
5. [Docker Container Build & Deployment](#5-docker-container-build--deployment)
6. [Deploying to Google Cloud Run](#6-deploying-to-google-cloud-run)
7. [Deploying to Vercel & Netlify](#7-deploying-to-vercel--netlify)
8. [Environment Variables & Security Checklist](#8-environment-variables--security-checklist)

---

## 1. Architecture Overview
- **Frontend Framework**: React 18+ with TypeScript & Vite
- **Styling**: Tailwind CSS v3 with Lucide React Icons & Motion Animations
- **Production Server**: Node.js ESM server serving pre-compiled static assets and API proxies
- **Container Port**: `3000` (Required ingress port)
- **PWA Capabilities**: Service Worker (`/public/sw.js`), Web App Manifest (`/public/manifest.json`), Offline Caching Engine

---

## 2. PWA & Offline Service Worker Setup
The application is pre-configured as a **Progressive Web App (PWA)**:
- **Manifest File**: Located at `/public/manifest.json`.
- **Service Worker**: Located at `/public/sw.js`. Caches static shell assets (`/`, `/index.html`) and flight/telemetry data for offline maritime access at sea.
- **Auto-Registration**: Automatically registered in `index.html` via native `navigator.serviceWorker`.

### Installing as an App on Mobile / Desktop:
- **iOS Safari**: Tap *Share* -> *Add to Home Screen*.
- **Android Chrome / Edge / Brave**: Tap the top right menu -> *Install App* or *Add to Home Screen*.

---

## 3. SEO Metadata & Social Sharing Integration
High-performance SEO and Open Graph metadata are embedded directly inside `index.html`:
- **OpenGraph Tags**: `og:title`, `og:description`, `og:image`, `og:site_name`, `og:locale`.
- **Twitter / X Cards**: `summary_large_image`, `@EastmanCreation` creator tags.
- **Schema.org Structured Data**: JSON-LD `SoftwareApplication` schema for Google Search rich snippets.
- **Theme Color & Mobile Meta**: `#0284c7` primary theme color, viewport scaling disabled for native app feel.

---

## 4. CI/CD Automated Pipeline (GitHub Actions)
The repository includes a ready-to-use GitHub Actions workflow located at `.github/workflows/deploy.yml`.

### Workflow Stages:
1. **Lint & Typecheck**: Runs `npm run lint` (`tsc --noEmit`).
2. **Build**: Compiles production assets via `npm run build`.
3. **Docker Container Push**: Builds image tagged with commit SHA and pushes to Google Container Registry (GCR) or Docker Hub.
4. **Cloud Run Deployment**: Deploys container to Google Cloud Run automatically on every push to `main` branch.
5. **GitHub Pages Preview**: Automatically deploys compiled `/dist` directory to GitHub Pages.

### Required GitHub Secrets:
Add the following secrets under **Repository Settings -> Secrets and variables -> Actions**:
- `GCP_PROJECT_ID`: Your Google Cloud Project ID (e.g., `ocean-bird-42100`)
- `GCP_SA_KEY`: Google Cloud Service Account Key (JSON) with *Cloud Run Admin* and *Storage Admin* roles.

---

## 5. Docker Container Build & Deployment

### Building & Running Locally with Docker:
```bash
# 1. Build Docker image
docker build -t ocean-bird-app:latest .

# 2. Run container locally on port 3000
docker run -d -p 3000:3000 --name ocean-bird ocean-bird-app:latest

# 3. Test liveness check
curl http://localhost:3000/
```

---

## 6. Deploying to Google Cloud Run

### Step-by-Step CLI Deployment:
```bash
# 1. Login to Google Cloud
gcloud auth login

# 2. Set active GCP Project
gcloud config set project YOUR_GCP_PROJECT_ID

# 3. Submit container build to Cloud Build
gcloud builds submit --tag gcr.io/YOUR_GCP_PROJECT_ID/ocean-bird-app:latest .

# 4. Deploy to Cloud Run
gcloud run deploy ocean-bird-app \
  --image gcr.io/YOUR_GCP_PROJECT_ID/ocean-bird-app:latest \
  --region asia-southeast1 \
  --platform managed \
  --allow-unauthenticated \
  --port 3000 \
  --memory 1Gi \
  --cpu 1
```

---

## 7. Deploying to Vercel & Netlify

### Deploying to Vercel:
1. Push project to GitHub.
2. Import project into Vercel Dashboard.
3. **Framework Preset**: Select `Vite`.
4. **Build Command**: `npm run build`
5. **Output Directory**: `dist`
6. Click **Deploy**.

### Deploying to Netlify:
1. Connect Netlify to your GitHub repository.
2. Set Build Command: `npm run build`
3. Set Publish Directory: `dist`
4. Create `public/_redirects` file with content: `/* /index.html 200` to support SPA routing.

---

## 8. Environment Variables & Security Checklist

### Checklist for Production Readiness:
- [x] SSL / TLS HTTPS enabled
- [x] PWA Manifest and Service Worker configured
- [x] SEO meta tags and social share cards active
- [x] Port set strictly to `3000`
- [x] Container health check enabled
- [x] Build passes without TypeScript compilation or linter errors

For support or enterprise deployment customization, contact **Eastman Creation Maritime Systems**.
