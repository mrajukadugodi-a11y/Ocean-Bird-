import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { registerFlightServiceWorker } from './utils/offlineFlightCache';
import { ErrorBoundary } from './components/ErrorBoundary';

// Register Service Worker for flight booking & tracking offline cache
registerFlightServiceWorker();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
);


