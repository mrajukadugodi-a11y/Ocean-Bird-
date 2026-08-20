// Service Worker for Flight Booking & Tracking Data Offline Caching
// Cache Names
const STATIC_CACHE_NAME = 'oceanbird-static-v1';
const FLIGHT_CACHE_NAME = 'flight-data-cache-v1';

// Static Shell Assets to Pre-cache
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json'
];

// Default Mock / Fallback Flight Offline Datastore
let offlineFlightStore = {
  bookings: [
    {
      pnr: 'AI-OB-88219',
      passengerName: 'Capt. Rajesh Kumar',
      flightNumber: 'AI-102',
      airline: 'Air India Express',
      flightType: 'International',
      origin: 'BOM - Mumbai Airport',
      destination: 'MLE - Velana Int. Airport, Malé',
      departureTime: '2026-08-15 08:30 AM',
      arrivalTime: '2026-08-15 11:15 AM',
      seatNumber: '12A (Window)',
      cabinClass: 'Business Class',
      gate: 'B14',
      status: 'ON TIME - SCHEDULED',
      gateChangeAlert: 'Gate assigned to Terminal 2, Gate B14',
      baggageAllowance: '30 KG Check-in + 7 KG Cabin',
      ticketAmountUSD: 280,
      cachedAt: new Date().toISOString()
    },
    {
      pnr: '6E-OB-33910',
      passengerName: 'First Officer Ananya Sharma',
      flightNumber: '6E-204',
      airline: 'IndiGo Airways',
      flightType: 'Domestic',
      origin: 'COK - Cochin Airport',
      destination: 'GOI - Goa Dabolim Airport',
      departureTime: '2026-08-18 02:45 PM',
      arrivalTime: '2026-08-18 04:00 PM',
      seatNumber: '05F (Extra Legroom)',
      cabinClass: 'Economy Prime',
      gate: 'A03',
      status: 'BOARDING SOON',
      gateChangeAlert: null,
      baggageAllowance: '20 KG Check-in + 7 KG Cabin',
      ticketAmountUSD: 95,
      cachedAt: new Date().toISOString()
    }
  ],
  searches: [
    {
      id: 'SEARCH-01',
      route: 'Mumbai (BOM) -> Male, Maldives (MLE)',
      date: '2026-08-15',
      passengerCount: 2,
      type: 'International',
      cachedFlightsCount: 4,
      cachedAt: new Date().toISOString(),
      flights: [
        { flightNo: 'AI-102', airline: 'Air India Express', priceUSD: 280, dep: '08:30 AM', arr: '11:15 AM', seats: '6 Seats Left' },
        { flightNo: '6E-501', airline: 'IndiGo Airways', priceUSD: 220, dep: '10:15 AM', arr: '01:00 PM', seats: '12 Seats Left' },
        { flightNo: 'UL-102', airline: 'SriLankan Airlines', priceUSD: 310, dep: '01:45 PM', arr: '04:30 PM', seats: '4 Seats Left' },
        { flightNo: 'EK-501', airline: 'Emirates Airways', priceUSD: 450, dep: '06:00 PM', arr: '08:40 PM', seats: '2 Seats Left' }
      ]
    },
    {
      id: 'SEARCH-02',
      route: 'Kochi (COK) -> Lakshadweep Agatti (AGX)',
      date: '2026-08-20',
      passengerCount: 1,
      type: 'Domestic',
      cachedFlightsCount: 2,
      cachedAt: new Date().toISOString(),
      flights: [
        { flightNo: '9I-805', airline: 'Alliance Air Island Hopper', priceUSD: 140, dep: '09:00 AM', arr: '10:30 AM', seats: '8 Seats Left' },
        { flightNo: '6E-402', airline: 'IndiGo ATR Connect', priceUSD: 165, dep: '02:00 PM', arr: '03:25 PM', seats: '5 Seats Left' }
      ]
    }
  ],
  trackedFlights: [
    {
      flightNumber: 'AI-102',
      airline: 'Air India Express',
      route: 'Mumbai (BOM) ✈️ Male (MLE)',
      status: 'ON TIME',
      altitudeFt: 36000,
      speedKnots: 460,
      estimatedArrival: '11:15 AM',
      gate: 'B14',
      delayMinutes: 0,
      lastUpdated: new Date().toISOString()
    },
    {
      flightNumber: '6E-204',
      airline: 'IndiGo Airways',
      route: 'Kochi (COK) ✈️ Goa (GOI)',
      status: 'SCHEDULED - ON TIME',
      altitudeFt: 0,
      speedKnots: 0,
      estimatedArrival: '04:00 PM',
      gate: 'A03',
      delayMinutes: 0,
      lastUpdated: new Date().toISOString()
    },
    {
      flightNumber: 'EK-501',
      airline: 'Emirates Airways',
      route: 'Dubai (DXB) ✈️ Male (MLE)',
      status: 'EN ROUTE - ON TIME',
      altitudeFt: 38000,
      speedKnots: 490,
      estimatedArrival: '08:40 PM',
      gate: 'C08',
      delayMinutes: 0,
      lastUpdated: new Date().toISOString()
    }
  ]
};

// Install Event
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS).catch(() => {
        // Fallback gracefully if static asset missing
      });
    }).then(() => self.skipWaiting())
  );
});

// Activate Event
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== STATIC_CACHE_NAME && cacheName !== FLIGHT_CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch Interception with Network-First & Cache Fallback Strategy
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Intercept Flight API endpoints if queried
  if (url.pathname.includes('/api/flights') || url.pathname.includes('/api/flight-tracker')) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          if (response.status === 200) {
            const responseClone = response.clone();
            caches.open(FLIGHT_CACHE_NAME).then((cache) => {
              cache.put(event.request, responseClone);
            });
          }
          return response;
        })
        .catch(() => {
          // Offline Fallback for Flight APIs
          return caches.match(event.request).then((cachedResponse) => {
            if (cachedResponse) return cachedResponse;

            // Generate synthetic offline response from in-memory offline store
            return new Response(
              JSON.stringify({
                offline: true,
                source: 'ServiceWorkerCache',
                timestamp: new Date().toISOString(),
                data: offlineFlightStore
              }),
              {
                headers: { 'Content-Type': 'application/json' }
              }
            );
          });
        })
    );
    return;
  }

  // Standard Stale-While-Revalidate for app assets
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      const fetchPromise = fetch(event.request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200 && event.request.method === 'GET') {
            const responseClone = networkResponse.clone();
            caches.open(STATIC_CACHE_NAME).then((cache) => {
              cache.put(event.request, responseClone);
            });
          }
          return networkResponse;
        })
        .catch(() => cachedResponse);

      return cachedResponse || fetchPromise;
    })
  );
});

// Message Event Handler for Client Sync Commands
self.addEventListener('message', (event) => {
  if (!event.data) return;

  const { type, payload } = event.data;

  if (type === 'CACHE_FLIGHT_BOOKING') {
    if (payload) {
      offlineFlightStore.bookings.unshift({
        ...payload,
        cachedAt: new Date().toISOString()
      });
      // Store in SW Cache Storage
      caches.open(FLIGHT_CACHE_NAME).then((cache) => {
        const dummyReq = new Request('/api/offline-flight-bookings');
        const resp = new Response(JSON.stringify(offlineFlightStore.bookings), {
          headers: { 'Content-Type': 'application/json' }
        });
        cache.put(dummyReq, resp);
      });
    }

    event.ports[0]?.postMessage({
      success: true,
      count: offlineFlightStore.bookings.length,
      message: 'Flight booking saved to Service Worker Offline Cache'
    });
  }

  if (type === 'CACHE_FLIGHT_SEARCH') {
    if (payload) {
      offlineFlightStore.searches.unshift({
        ...payload,
        cachedAt: new Date().toISOString()
      });
    }
    event.ports[0]?.postMessage({
      success: true,
      count: offlineFlightStore.searches.length
    });
  }

  if (type === 'CACHE_TRACKED_FLIGHT') {
    if (payload) {
      const existingIdx = offlineFlightStore.trackedFlights.findIndex(
        (f) => f.flightNumber === payload.flightNumber
      );
      if (existingIdx >= 0) {
        offlineFlightStore.trackedFlights[existingIdx] = {
          ...payload,
          lastUpdated: new Date().toISOString()
        };
      } else {
        offlineFlightStore.trackedFlights.unshift({
          ...payload,
          lastUpdated: new Date().toISOString()
        });
      }
    }
    event.ports[0]?.postMessage({
      success: true,
      trackedCount: offlineFlightStore.trackedFlights.length
    });
  }

  if (type === 'GET_OFFLINE_FLIGHT_DATA') {
    event.ports[0]?.postMessage({
      success: true,
      data: offlineFlightStore
    });
  }

  if (type === 'CLEAR_FLIGHT_CACHE') {
    offlineFlightStore.bookings = [];
    offlineFlightStore.searches = [];
    offlineFlightStore.trackedFlights = [];
    caches.delete(FLIGHT_CACHE_NAME);
    event.ports[0]?.postMessage({
      success: true,
      message: 'Service Worker Flight Cache Cleared'
    });
  }
});
