import { useState, useEffect } from 'react';

export interface OfflineFlightBooking {
  pnr: string;
  passengerName?: string;
  flightNumber?: string;
  airline?: string;
  flightType?: 'International' | 'Domestic' | string;
  origin?: string;
  destination?: string;
  departureTime?: string;
  arrivalTime?: string;
  seatNumber?: string;
  cabinClass?: string;
  gate?: string;
  status?: string;
  gateChangeAlert?: string | null;
  baggageAllowance?: string;
  ticketAmountUSD?: number;
  cachedAt?: string;
  [key: string]: any;
}

export interface OfflineFlightSearch {
  id: string;
  route: string;
  date: string;
  passengerCount: number;
  type: string;
  cachedFlightsCount: number;
  cachedAt?: string;
  flights: Array<{
    flightNo: string;
    airline: string;
    priceUSD: number;
    dep: string;
    arr: string;
    seats: string;
  }>;
}

export interface OfflineTrackedFlight {
  flightNumber: string;
  airline: string;
  route: string;
  status: string;
  altitudeFt: number;
  speedKnots: number;
  estimatedArrival: string;
  gate: string;
  delayMinutes: number;
  lastUpdated?: string;
}

export interface OfflineFlightStoreData {
  bookings: OfflineFlightBooking[];
  searches: OfflineFlightSearch[];
  trackedFlights: OfflineTrackedFlight[];
}

const LOCAL_STORAGE_KEY_BOOKINGS = 'oceanbird_offline_flight_bookings';
const LOCAL_STORAGE_KEY_SEARCHES = 'oceanbird_offline_flight_searches';
const LOCAL_STORAGE_KEY_TRACKER = 'oceanbird_offline_flight_tracker';

let swRegistration: ServiceWorkerRegistration | null = null;

// Register Service Worker
export const registerFlightServiceWorker = async (): Promise<boolean> => {
  if ('serviceWorker' in navigator) {
    try {
      const reg = await navigator.serviceWorker.register('/sw.js', { scope: '/' });
      swRegistration = reg;
      console.log('Flight Service Worker registered successfully:', reg.scope);
      return true;
    } catch (err) {
      console.warn('Flight Service Worker registration failed (falling back to LocalStorage caching):', err);
      return false;
    }
  }
  return false;
};

// Send message to Service Worker with MessageChannel response handling
const postSwMessage = (type: string, payload?: any): Promise<any> => {
  return new Promise((resolve) => {
    if (navigator.serviceWorker && navigator.serviceWorker.controller) {
      const messageChannel = new MessageChannel();
      messageChannel.port1.onmessage = (event) => {
        resolve(event.data);
      };
      navigator.serviceWorker.controller.postMessage({ type, payload }, [messageChannel.port2]);
    } else {
      resolve(null);
    }
  });
};

// LocalStorage Fallback getters/setters
export const getStoredBookingsLocalStorage = (): OfflineFlightBooking[] => {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY_BOOKINGS);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const setStoredBookingsLocalStorage = (bookings: OfflineFlightBooking[]) => {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY_BOOKINGS, JSON.stringify(bookings));
  } catch (e) {
    console.error('Failed to save flight bookings to LocalStorage:', e);
  }
};

export const getStoredSearchesLocalStorage = (): OfflineFlightSearch[] => {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY_SEARCHES);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const setStoredSearchesLocalStorage = (searches: OfflineFlightSearch[]) => {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY_SEARCHES, JSON.stringify(searches));
  } catch (e) {
    console.error('Failed to save flight searches to LocalStorage:', e);
  }
};

export const getStoredTrackerLocalStorage = (): OfflineTrackedFlight[] => {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY_TRACKER);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const setStoredTrackerLocalStorage = (tracked: OfflineTrackedFlight[]) => {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY_TRACKER, JSON.stringify(tracked));
  } catch (e) {
    console.error('Failed to save tracked flights to LocalStorage:', e);
  }
};

// Public helper functions to save flight data to Service Worker + LocalStorage
export const cacheFlightBooking = async (booking: OfflineFlightBooking) => {
  const currentLS = getStoredBookingsLocalStorage();
  const updated = [booking, ...currentLS.filter((b) => b.pnr !== booking.pnr)];
  setStoredBookingsLocalStorage(updated);

  await postSwMessage('CACHE_FLIGHT_BOOKING', booking);
  return updated;
};

export const cacheFlightSearchResult = async (search: OfflineFlightSearch) => {
  const currentLS = getStoredSearchesLocalStorage();
  const updated = [search, ...currentLS.filter((s) => s.id !== search.id)];
  setStoredSearchesLocalStorage(updated);

  await postSwMessage('CACHE_FLIGHT_SEARCH', search);
  return updated;
};

export const cacheTrackedFlightStatus = async (tracked: OfflineTrackedFlight) => {
  const currentLS = getStoredTrackerLocalStorage();
  const updated = [tracked, ...currentLS.filter((t) => t.flightNumber !== tracked.flightNumber)];
  setStoredTrackerLocalStorage(updated);

  await postSwMessage('CACHE_TRACKED_FLIGHT', tracked);
  return updated;
};

// Get composite offline flight data (Merging SW response with LocalStorage)
export const fetchAllOfflineFlightData = async (): Promise<OfflineFlightStoreData> => {
  const swResult = await postSwMessage('GET_OFFLINE_FLIGHT_DATA');
  
  const lsBookings = getStoredBookingsLocalStorage();
  const lsSearches = getStoredSearchesLocalStorage();
  const lsTracker = getStoredTrackerLocalStorage();

  if (swResult && swResult.data) {
    const swData: OfflineFlightStoreData = swResult.data;
    
    // Deduplicate merged items
    const mergedBookings = [...swData.bookings];
    lsBookings.forEach((b) => {
      if (!mergedBookings.some((mb) => mb.pnr === b.pnr)) {
        mergedBookings.push(b);
      }
    });

    const mergedSearches = [...swData.searches];
    lsSearches.forEach((s) => {
      if (!mergedSearches.some((ms) => ms.id === s.id)) {
        mergedSearches.push(s);
      }
    });

    const mergedTracker = [...swData.trackedFlights];
    lsTracker.forEach((t) => {
      if (!mergedTracker.some((mt) => mt.flightNumber === t.flightNumber)) {
        mergedTracker.push(t);
      }
    });

    return {
      bookings: mergedBookings,
      searches: mergedSearches,
      trackedFlights: mergedTracker,
    };
  }

  return {
    bookings: lsBookings,
    searches: lsSearches,
    trackedFlights: lsTracker,
  };
};

export const clearAllOfflineFlightCache = async () => {
  localStorage.removeItem(LOCAL_STORAGE_KEY_BOOKINGS);
  localStorage.removeItem(LOCAL_STORAGE_KEY_SEARCHES);
  localStorage.removeItem(LOCAL_STORAGE_KEY_TRACKER);
  await postSwMessage('CLEAR_FLIGHT_CACHE');
};

// React Hook for Offline & Service Worker status
export const useOfflineFlightStatus = () => {
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  const [swActive, setSwActive] = useState<boolean>(false);
  const [offlineData, setOfflineData] = useState<OfflineFlightStoreData>({
    bookings: [],
    searches: [],
    trackedFlights: [],
  });

  const reloadOfflineData = async () => {
    const data = await fetchAllOfflineFlightData();
    setOfflineData(data);
  };

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
      setSwActive(true);
    }

    reloadOfflineData();

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return {
    isOnline,
    swActive,
    offlineData,
    reloadOfflineData,
  };
};
