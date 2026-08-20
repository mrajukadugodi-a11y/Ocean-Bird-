// Live AIS Vessel Tracking & Harbor Traffic Data for South Asia & Indo-Pacific

export interface Vessel {
  id: string;
  mmsi: number;
  imo: number;
  name: string;
  flag: string;
  vesselType: 'Container' | 'Oil Tanker' | 'Bulk Carrier' | 'LNG Carrier' | 'Passenger Ferry' | 'Fishing Trawler' | 'Tugboat / Patrol' | 'Research Ship';
  harborId: string;
  harborName: string;
  lat: number;
  lng: number;
  destination: string;
  speedKnots: number;
  heading: number; // 0 to 360 degrees
  status: 'Underway' | 'Anchored' | 'Moored' | 'Maneuvering' | 'Pilot On Board';
  lengthM: number;
  beamM: number;
  draftM: number;
  cpaNm: number; // Closest Point of Approach in nautical miles
  tcpaMin: number; // Time to CPA in minutes
  vhfChannel: number;
  destinationEta: string;
  cargo: string;
  callSign: string;
  lastAisPingSecondsAgo: number;
}

export interface HarborLocation {
  id: string;
  name: string;
  country: string;
  countryFlag: string;
  centerLat: number;
  centerLng: number;
  activeShipsCount: number;
  congestionIndex: 'Low' | 'Moderate' | 'High' | 'Severe';
  weatherSummary: string;
  vhfPortControlChannel: number;
}

export const HARBOR_LOCATIONS: HarborLocation[] = [
  {
    id: 'mumbai-jnpt',
    name: 'JNPT & Mumbai Port Anchorage',
    country: 'India',
    countryFlag: '🇮🇳',
    centerLat: 18.9500,
    centerLng: 72.8200,
    activeShipsCount: 42,
    congestionIndex: 'High',
    weatherSummary: 'SW Wind 14 kts, Visibility 8 NM, Sea Swell 1.2m',
    vhfPortControlChannel: 12
  },
  {
    id: 'colombo-harbor',
    name: 'Colombo International Container Terminal',
    country: 'Sri Lanka',
    countryFlag: '🇱🇰',
    centerLat: 6.9400,
    centerLng: 79.8400,
    activeShipsCount: 38,
    congestionIndex: 'Moderate',
    weatherSummary: 'W Wind 11 kts, Clear Skies, Sea Swell 0.9m',
    vhfPortControlChannel: 16
  },
  {
    id: 'chittagong-port',
    name: 'Chittagong Outer Anchorage & River',
    country: 'Bangladesh',
    countryFlag: '🇧🇩',
    centerLat: 22.2800,
    centerLng: 91.8000,
    activeShipsCount: 51,
    congestionIndex: 'High',
    weatherSummary: 'SE Wind 18 kts, Light Haze, Sea Swell 1.5m',
    vhfPortControlChannel: 14
  },
  {
    id: 'male-atoll',
    name: 'Malé Commercial Atoll & Lagoon',
    country: 'Maldives',
    countryFlag: '🇲🇻',
    centerLat: 4.1700,
    centerLng: 73.5100,
    activeShipsCount: 19,
    congestionIndex: 'Low',
    weatherSummary: 'E Wind 8 kts, Tropical Sunlight, Calm Seas 0.4m',
    vhfPortControlChannel: 10
  },
  {
    id: 'vizag-port',
    name: 'Visakhapatnam Deep Water Outer Harbor',
    country: 'India',
    countryFlag: '🇮🇳',
    centerLat: 17.6800,
    centerLng: 83.3000,
    activeShipsCount: 29,
    congestionIndex: 'Moderate',
    weatherSummary: 'NE Wind 12 kts, Scattered Clouds, Sea Swell 1.1m',
    vhfPortControlChannel: 13
  },
  {
    id: 'chennai-port',
    name: 'Chennai Port & Katupalli Anchorage',
    country: 'India',
    countryFlag: '🇮🇳',
    centerLat: 13.0800,
    centerLng: 80.3000,
    activeShipsCount: 31,
    congestionIndex: 'Moderate',
    weatherSummary: 'E Wind 10 kts, Fair, Sea Swell 0.8m',
    vhfPortControlChannel: 11
  },
  {
    id: 'karachi-port',
    name: 'Karachi Port & Port Qasim Channel',
    country: 'Pakistan',
    countryFlag: '🇵🇰',
    centerLat: 24.8000,
    centerLng: 66.9700,
    activeShipsCount: 27,
    congestionIndex: 'Moderate',
    weatherSummary: 'NW Wind 15 kts, Sunny, Sea Swell 1.0m',
    vhfPortControlChannel: 16
  },
  {
    id: 'singapore-strait',
    name: 'Singapore Strait Traffic Separation Scheme',
    country: 'Singapore',
    countryFlag: '🇸🇬',
    centerLat: 1.2500,
    centerLng: 103.8500,
    activeShipsCount: 88,
    congestionIndex: 'Severe',
    weatherSummary: 'Variable Wind 6 kts, Passing Squall, Sea Swell 0.5m',
    vhfPortControlChannel: 73
  }
];

export const INITIAL_VESSELS: Vessel[] = [
  // JNPT & Mumbai Port
  {
    id: 'vessel-101',
    mmsi: 419001234,
    imo: 9876543,
    name: 'MV Ocean Express',
    flag: '🇮🇳 India',
    vesselType: 'Container',
    harborId: 'mumbai-jnpt',
    harborName: 'JNPT Mumbai',
    lat: 18.9580,
    lng: 72.8250,
    destination: 'Jawaharlal Nehru Port Terminal 2',
    speedKnots: 11.4,
    heading: 75,
    status: 'Underway',
    lengthM: 334,
    beamM: 48,
    draftM: 13.8,
    cpaNm: 1.2,
    tcpaMin: 18,
    vhfChannel: 12,
    destinationEta: 'Today 14:30 UTC',
    cargo: '8,400 TEU Manufactured Goods & Electronics',
    callSign: 'VTIN2',
    lastAisPingSecondsAgo: 3
  },
  {
    id: 'vessel-102',
    mmsi: 419008821,
    imo: 9432109,
    name: 'MT Malabar Trader',
    flag: '🇮🇳 India',
    vesselType: 'Oil Tanker',
    harborId: 'mumbai-jnpt',
    harborName: 'JNPT Mumbai',
    lat: 18.9320,
    lng: 72.8050,
    destination: 'Mumbai High Anchorage Berth 4',
    speedKnots: 0.2,
    heading: 210,
    status: 'Anchored',
    lengthM: 274,
    beamM: 48,
    draftM: 15.2,
    cpaNm: 2.8,
    tcpaMin: 95,
    vhfChannel: 12,
    destinationEta: 'Tomorrow 08:00 UTC',
    cargo: '105,000 MT Crude Oil',
    callSign: 'VTML8',
    lastAisPingSecondsAgo: 1
  },
  {
    id: 'vessel-103',
    mmsi: 419005112,
    imo: 9112233,
    name: 'Matsya Sagar 09',
    flag: '🇮🇳 India',
    vesselType: 'Fishing Trawler',
    harborId: 'mumbai-jnpt',
    harborName: 'JNPT Mumbai',
    lat: 18.9650,
    lng: 72.8420,
    destination: 'Sassoon Docks Fish Landing Wharf',
    speedKnots: 7.8,
    heading: 110,
    status: 'Underway',
    lengthM: 28,
    beamM: 8,
    draftM: 3.2,
    cpaNm: 0.4,
    tcpaMin: 6,
    vhfChannel: 16,
    destinationEta: 'Today 12:15 UTC',
    cargo: '18 Tons Fresh Tuna & Pomfret Catch',
    callSign: 'VTMS9',
    lastAisPingSecondsAgo: 5
  },

  // Colombo Harbor
  {
    id: 'vessel-201',
    mmsi: 417112009,
    imo: 9911224,
    name: 'CMA CGM Pearl of Lanka',
    flag: '🇱🇰 Sri Lanka',
    vesselType: 'Container',
    harborId: 'colombo-harbor',
    harborName: 'Colombo Port',
    lat: 6.9480,
    lng: 79.8450,
    destination: 'Colombo South Container Terminal',
    speedKnots: 14.2,
    heading: 135,
    status: 'Pilot On Board',
    lengthM: 398,
    beamM: 54,
    draftM: 16.0,
    cpaNm: 0.9,
    tcpaMin: 12,
    vhfChannel: 16,
    destinationEta: 'Today 13:00 UTC',
    cargo: '14,200 TEU Transshipment Containers',
    callSign: '4PXB',
    lastAisPingSecondsAgo: 2
  },
  {
    id: 'vessel-202',
    mmsi: 417209311,
    imo: 9345678,
    name: 'Serendib Pioneer',
    flag: '🇱🇰 Sri Lanka',
    vesselType: 'LNG Carrier',
    harborId: 'colombo-harbor',
    harborName: 'Colombo Port',
    lat: 6.9250,
    lng: 79.8210,
    destination: 'Kerawalapitiya Offshore Buoy',
    speedKnots: 0.0,
    heading: 45,
    status: 'Moored',
    lengthM: 290,
    beamM: 45,
    draftM: 11.5,
    cpaNm: 3.5,
    tcpaMin: 120,
    vhfChannel: 16,
    destinationEta: 'Discharging in progress',
    cargo: '145,000 cu.m Liquefied Natural Gas',
    callSign: '4PXA',
    lastAisPingSecondsAgo: 4
  },

  // Chittagong Port
  {
    id: 'vessel-301',
    mmsi: 405334112,
    imo: 9234567,
    name: 'MV Bengal Fortune',
    flag: '🇧🇩 Bangladesh',
    vesselType: 'Bulk Carrier',
    harborId: 'chittagong-port',
    harborName: 'Chittagong Port',
    lat: 22.2880,
    lng: 91.8100,
    destination: 'Karnaphuli Jetty 5',
    speedKnots: 5.6,
    heading: 340,
    status: 'Maneuvering',
    lengthM: 190,
    beamM: 32,
    draftM: 9.2,
    cpaNm: 0.6,
    tcpaMin: 9,
    vhfChannel: 14,
    destinationEta: 'Today 15:00 UTC',
    cargo: '45,000 MT Wheat Grain Bulk',
    callSign: 'S2AB',
    lastAisPingSecondsAgo: 2
  },
  {
    id: 'vessel-302',
    mmsi: 405102998,
    imo: 9882233,
    name: 'Surma Guardian',
    flag: '🇧🇩 Bangladesh',
    vesselType: 'Tugboat / Patrol',
    harborId: 'chittagong-port',
    harborName: 'Chittagong Port',
    lat: 22.2750,
    lng: 91.7920,
    destination: 'Coast Guard Patrol Sector B',
    speedKnots: 16.5,
    heading: 195,
    status: 'Underway',
    lengthM: 45,
    beamM: 10,
    draftM: 2.8,
    cpaNm: 1.5,
    tcpaMin: 22,
    vhfChannel: 14,
    destinationEta: 'Patrol Duty Active',
    cargo: 'Coastal Rescue & Firefighting Gear',
    callSign: 'S2CG',
    lastAisPingSecondsAgo: 1
  },

  // Malé Commercial Atoll
  {
    id: 'vessel-401',
    mmsi: 455001290,
    imo: 9678901,
    name: 'Atoll Princess Ferry',
    flag: '🇲🇻 Maldives',
    vesselType: 'Passenger Ferry',
    harborId: 'male-atoll',
    harborName: 'Malé Commercial Atoll',
    lat: 4.1750,
    lng: 73.5180,
    destination: 'Hulhumalé Ferry Terminal',
    speedKnots: 18.2,
    heading: 40,
    status: 'Underway',
    lengthM: 42,
    beamM: 11,
    draftM: 1.8,
    cpaNm: 0.3,
    tcpaMin: 4,
    vhfChannel: 10,
    destinationEta: 'Today 11:45 UTC',
    cargo: '240 Inter-Island Passengers',
    callSign: '8QMA',
    lastAisPingSecondsAgo: 2
  },
  {
    id: 'vessel-402',
    mmsi: 455909210,
    imo: 9123456,
    name: 'RV Dhivehi Explorer',
    flag: '🇲🇻 Maldives',
    vesselType: 'Research Ship',
    harborId: 'male-atoll',
    harborName: 'Malé Commercial Atoll',
    lat: 4.1620,
    lng: 73.4980,
    destination: 'North Malé Coral Survey Grid',
    speedKnots: 4.1,
    heading: 280,
    status: 'Underway',
    lengthM: 65,
    beamM: 14,
    draftM: 4.2,
    cpaNm: 2.1,
    tcpaMin: 40,
    vhfChannel: 10,
    destinationEta: 'Surveying Reef Sanctuary',
    cargo: 'UNESCO Marine Biology Labs',
    callSign: '8QRE',
    lastAisPingSecondsAgo: 6
  },

  // Visakhapatnam Port
  {
    id: 'vessel-501',
    mmsi: 419003445,
    imo: 9556677,
    name: 'MV Coromandel Giant',
    flag: '🇮🇳 India',
    vesselType: 'Bulk Carrier',
    harborId: 'vizag-port',
    harborName: 'Vizag Outer Harbor',
    lat: 17.6850,
    lng: 83.3080,
    destination: 'Vizag Port Iron Ore Berth 2',
    speedKnots: 2.1,
    heading: 300,
    status: 'Pilot On Board',
    lengthM: 292,
    beamM: 45,
    draftM: 14.5,
    cpaNm: 0.8,
    tcpaMin: 15,
    vhfChannel: 13,
    destinationEta: 'Today 16:00 UTC',
    cargo: '120,000 MT High Grade Iron Ore Pellets',
    callSign: 'VTVZ1',
    lastAisPingSecondsAgo: 3
  },

  // Singapore Strait
  {
    id: 'vessel-801',
    mmsi: 563001920,
    imo: 9988776,
    name: 'EVER GIVEN II',
    flag: '🇸🇬 Singapore',
    vesselType: 'Container',
    harborId: 'singapore-strait',
    harborName: 'Singapore Strait',
    lat: 1.2580,
    lng: 103.8620,
    destination: 'Pasir Panjang Terminal Berth 6',
    speedKnots: 18.9,
    heading: 82,
    status: 'Underway',
    lengthM: 400,
    beamM: 59,
    draftM: 15.8,
    cpaNm: 0.5,
    tcpaMin: 5,
    vhfChannel: 73,
    destinationEta: 'Today 18:20 UTC',
    cargo: '20,100 TEU Global Freight',
    callSign: '9V881',
    lastAisPingSecondsAgo: 1
  }
];
