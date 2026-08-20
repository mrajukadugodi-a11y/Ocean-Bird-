// Geographic Sea Routes, Port Stations, Maritime Banks & Utilities Data

export interface SeaRouteGeographic {
  id: string;
  name: string;
  code: string;
  category: 'International Shipping TSS' | 'Coastal Trade Route' | 'Island Inter-Atoll Pass' | 'Deep Water Freight Corridor';
  lengthNm: number;
  avgTransitDays: number;
  totalVesselsActive: number;
  riskLevel: 'Low' | 'Moderate' | 'High' | 'Severe';
  connectedPorts: string[];
  primaryCargo: string;
  description: string;
  pathPoints: { name: string; lat: number; lng: number }[];
}

export interface PortStation {
  id: string;
  name: string;
  country: string;
  countryFlag: string;
  stationType: 'Port Control Center' | 'Coast Guard Station' | 'Pilot Station' | 'Maritime Police' | 'Customs & Immigration';
  lat: number;
  lng: number;
  vhfChannel: number;
  phone: string;
  servicesOffered: string[];
  operationalStatus: '24/7 Active' | 'High Alert' | 'Normal Operations';
}

export interface MaritimeBank {
  id: string;
  name: string;
  bankType: 'Maritime Bank Branch' | 'Port ATM & Currency Kiosk' | 'Seafarer Remittance Center';
  country: string;
  countryFlag: string;
  portLocation: string;
  lat: number;
  lng: number;
  swiftCode: string;
  exchangeCurrencies: string[];
  workingHours: string;
  phone: string;
  specialServices: string[];
}

export interface MaritimeUtility {
  id: string;
  name: string;
  utilityType: 'Bunkering / Fuel Dock' | 'Drydock & Ship Repair' | 'Customs & Immigration' | 'Ship Chandler & Provisions' | 'Port Health & Telemedicine' | 'Fresh Water & Waste Discharge';
  country: string;
  countryFlag: string;
  portName: string;
  lat: number;
  lng: number;
  vhfChannel?: number;
  phone: string;
  capacityDetails: string;
  availability: '24/7 Active' | 'Operational' | 'On Call';
}

export interface VesselAlertItem {
  id: string;
  vesselId: string;
  vesselName: string;
  mmsi: number;
  harborName: string;
  alertType: 'Collision CPA' | 'EEZ Intrusion' | 'Cyclonic Weather' | 'Shallow Depth' | 'Distress SOS';
  severity: 'Critical' | 'High' | 'Warning' | 'Info';
  lat: number;
  lng: number;
  timestamp: string;
  description: string;
  actionRequired: string;
  acknowledged: boolean;
}

// 1. GEOGRAPHIC SEA ROUTES
export const GEOGRAPHIC_SEA_ROUTES: SeaRouteGeographic[] = [
  {
    id: 'route-singapore-mumbai',
    name: 'Singapore Strait to Mumbai JNPT Deep Sea Corridor',
    code: 'TSS-IND-SGP-01',
    category: 'International Shipping TSS',
    lengthNm: 2240,
    avgTransitDays: 5.2,
    totalVesselsActive: 142,
    riskLevel: 'Moderate',
    connectedPorts: ['Singapore TSS', 'Colombo Port', 'JNPT Mumbai'],
    primaryCargo: 'Containers, Crude Oil, Electronics',
    description: 'Major arterial sea lane connecting Southeast Asia to South Asia across the Bay of Bengal and southern tip of Sri Lanka.',
    pathPoints: [
      { name: 'Singapore Strait TSS', lat: 1.25, lng: 103.85 },
      { name: 'Malacca South Exit', lat: 2.50, lng: 101.80 },
      { name: 'Andaman Sea Channel', lat: 8.20, lng: 94.50 },
      { name: 'Dondra Head (Sri Lanka)', lat: 5.80, lng: 80.60 },
      { name: 'Cape Comorin Sea Pass', lat: 7.80, lng: 77.20 },
      { name: 'Mumbai JNPT Anchorage', lat: 18.95, lng: 72.82 }
    ]
  },
  {
    id: 'route-colombo-chittagong',
    name: 'Colombo to Chittagong Bay of Bengal Coastal Route',
    code: 'BOB-COL-CTG-02',
    category: 'Coastal Trade Route',
    lengthNm: 1180,
    avgTransitDays: 3.1,
    totalVesselsActive: 89,
    riskLevel: 'High',
    connectedPorts: ['Colombo Port', 'Chennai Port', 'Visakhapatnam', 'Chittagong Outer Anchorage'],
    primaryCargo: 'Bulk Grain, Garments, Coal, Steel',
    description: 'High-traffic Bay of Bengal coastal highway prone to monsoonal squalls and high sea swells.',
    pathPoints: [
      { name: 'Colombo Port Exit', lat: 6.94, lng: 79.84 },
      { name: 'Palk Strait Approach', lat: 9.80, lng: 80.20 },
      { name: 'Chennai Outer Buoy', lat: 13.08, lng: 80.30 },
      { name: 'Visakhapatnam Sea Grid', lat: 17.68, lng: 83.30 },
      { name: 'Chittagong River Mouth', lat: 22.28, lng: 91.80 }
    ]
  },
  {
    id: 'route-male-colombo-express',
    name: 'Malé Atoll to Colombo Indian Ocean Ferry & Feeder Line',
    code: 'IOC-MLE-COL-03',
    category: 'Island Inter-Atoll Pass',
    lengthNm: 430,
    avgTransitDays: 1.2,
    totalVesselsActive: 34,
    riskLevel: 'Low',
    connectedPorts: ['Malé Commercial Atoll', 'Galle Harbour', 'Colombo Port'],
    primaryCargo: 'Passengers, Fresh Seafood, Resort Supplies',
    description: 'Direct deep-ocean link connecting the Maldivian coral atolls with Sri Lankan transshipment hubs.',
    pathPoints: [
      { name: 'Malé Lagoon Exit', lat: 4.17, lng: 73.51 },
      { name: 'Nine Degree Channel', lat: 5.20, lng: 76.00 },
      { name: 'Galle Harbour Approach', lat: 6.02, lng: 80.21 },
      { name: 'Colombo South Terminal', lat: 6.94, lng: 79.84 }
    ]
  },
  {
    id: 'route-karachi-mumbai-trade',
    name: 'Karachi Port to Mumbai Gulf of Kutch Sea Lane',
    code: 'ARS-KHI-BOM-04',
    category: 'Deep Water Freight Corridor',
    lengthNm: 510,
    avgTransitDays: 1.5,
    totalVesselsActive: 58,
    riskLevel: 'Moderate',
    connectedPorts: ['Karachi Port', 'Gwadar Port', 'Kandla / Mundra', 'JNPT Mumbai'],
    primaryCargo: 'Chemicals, Petroleum, Fertilizers, Rice',
    description: 'North Arabian Sea corridor serving major energy and container terminals along the Indus Delta and Gulf of Kutch.',
    pathPoints: [
      { name: 'Karachi Channel Fairway', lat: 24.80, lng: 66.97 },
      { name: 'Indus Canyon Deep Water', lat: 23.10, lng: 68.20 },
      { name: 'Mundra Outer Anchorage', lat: 22.70, lng: 69.70 },
      { name: 'Mumbai Harbor Station', lat: 18.95, lng: 72.82 }
    ]
  }
];

// 2. PORT STATIONS & COAST GUARD OUTPOSTS
export const PORT_STATIONS: PortStation[] = [
  {
    id: 'station-jnpt-control',
    name: 'JNPT VTS Port Control Station',
    country: 'India',
    countryFlag: '🇮🇳',
    stationType: 'Port Control Center',
    lat: 18.9510,
    lng: 72.8210,
    vhfChannel: 12,
    phone: '+91 22 2724 4000',
    servicesOffered: ['Vessel Traffic Service (VTS)', 'Pilotage Request', 'Berth Allocation', 'Radio Advisory'],
    operationalStatus: '24/7 Active'
  },
  {
    id: 'station-icg-mumbai',
    name: 'Indian Coast Guard Regional HQ (West)',
    country: 'India',
    countryFlag: '🇮🇳',
    stationType: 'Coast Guard Station',
    lat: 18.9300,
    lng: 72.8350,
    vhfChannel: 16,
    phone: '+91 22 2437 1932',
    servicesOffered: ['Search & Rescue (SAR)', 'Maritime Security Patrol', 'Pollution Control Response', 'Medical Evacuation'],
    operationalStatus: 'High Alert'
  },
  {
    id: 'station-colombo-vts',
    name: 'Colombo Harbor Master & VTS Center',
    country: 'Sri Lanka',
    countryFlag: '🇱🇰',
    stationType: 'Port Control Center',
    lat: 6.9410,
    lng: 79.8420,
    vhfChannel: 16,
    phone: '+94 11 242 1201',
    servicesOffered: ['Harbor Navigation Control', 'Deep Draft Pilotage', 'Anchor Watch Control', 'Tugboat Assistance'],
    operationalStatus: '24/7 Active'
  },
  {
    id: 'station-slcg-galle',
    name: 'Sri Lanka Coast Guard Base Galle',
    country: 'Sri Lanka',
    countryFlag: '🇱🇰',
    stationType: 'Coast Guard Station',
    lat: 6.0300,
    lng: 80.2180,
    vhfChannel: 16,
    phone: '+94 91 222 2580',
    servicesOffered: ['Offshore SAR Patrol', 'Fishermen Distress Assist', 'Anti-Smuggling Monitoring'],
    operationalStatus: 'Normal Operations'
  },
  {
    id: 'station-ctg-port-control',
    name: 'Chittagong Port Authority VTS',
    country: 'Bangladesh',
    countryFlag: '🇧🇩',
    stationType: 'Port Control Center',
    lat: 22.2810,
    lng: 91.8020,
    vhfChannel: 14,
    phone: '+880 31 2510870',
    servicesOffered: ['Karnaphuli River Pilotage', 'Tidal River Channel Guide', 'Lighterage Coordination'],
    operationalStatus: '24/7 Active'
  },
  {
    id: 'station-mndf-male',
    name: 'Maldives Coast Guard Maritime Rescue Center (MRCC)',
    country: 'Maldives',
    countryFlag: '🇲🇻',
    stationType: 'Coast Guard Station',
    lat: 4.1720,
    lng: 73.5110,
    vhfChannel: 10,
    phone: '+960 339 8888',
    servicesOffered: ['Atoll Emergency Evacuation', 'Reef Grounding Assist', 'Inter-Island SAR Helipad'],
    operationalStatus: '24/7 Active'
  },
  {
    id: 'station-khi-port-trust',
    name: 'Karachi Port Trust Signal Station',
    country: 'Pakistan',
    countryFlag: '🇵🇰',
    stationType: 'Port Control Center',
    lat: 24.8020,
    lng: 66.9720,
    vhfChannel: 16,
    phone: '+92 21 9921 4530',
    servicesOffered: ['Manora Channel Clearance', 'Oil Terminal Security', 'Deep Sea Pilotage'],
    operationalStatus: '24/7 Active'
  },
  {
    id: 'station-mpa-singapore',
    name: 'Maritime & Port Authority of Singapore POCC',
    country: 'Singapore',
    countryFlag: '🇸🇬',
    stationType: 'Port Control Center',
    lat: 1.2520,
    lng: 103.8520,
    vhfChannel: 73,
    phone: '+65 6325 2488',
    servicesOffered: ['Strait TSS Traffic separation', 'Collision Prevention VTS', 'Mandatory Reporting Systems'],
    operationalStatus: '24/7 Active'
  }
];

// 3. MARITIME BANK LOCATIONS & CURRENCY EXCHANGES
export const MARITIME_BANKS: MaritimeBank[] = [
  {
    id: 'bank-sbi-jnpt',
    name: 'State Bank of India - JNPT Port Specialized Branch',
    bankType: 'Maritime Bank Branch',
    country: 'India',
    countryFlag: '🇮🇳',
    portLocation: 'JNPT Commercial Complex, Sheva, Navi Mumbai',
    lat: 18.9520,
    lng: 72.8240,
    swiftCode: 'SBININBB450',
    exchangeCurrencies: ['USD', 'EUR', 'GBP', 'INR', 'AED', 'SGD'],
    workingHours: '09:30 - 17:30 (ATM 24/7)',
    phone: '+91 22 2724 2100',
    specialServices: ['Seafarer NRI Remittance', 'Shipping LC & Bill of Lading Clearance', 'Vessel Freight Wire', 'Multi-currency Cash Exchange']
  },
  {
    id: 'bank-com-colombo',
    name: 'Commercial Bank of Ceylon - Colombo Port City Counter',
    bankType: 'Maritime Bank Branch',
    country: 'Sri Lanka',
    countryFlag: '🇱🇰',
    portLocation: 'Port Authority Gate 1, Fort, Colombo 01',
    lat: 6.9380,
    lng: 79.8410,
    swiftCode: 'CCEYLKAX',
    exchangeCurrencies: ['USD', 'EUR', 'LKR', 'INR', 'SGD', 'JPY'],
    workingHours: '08:30 - 18:00 (Kiosk 24/7)',
    phone: '+94 11 233 4400',
    specialServices: ['Seafarer Payroll Distribution', 'Instant Currency Swap', 'International Travel Cards', 'Customs Duty Payment']
  },
  {
    id: 'bank-stanchart-ctg',
    name: 'Standard Chartered Bank - Chittagong Agrabad Port Branch',
    bankType: 'Maritime Bank Branch',
    country: 'Bangladesh',
    countryFlag: '🇧🇩',
    portLocation: 'Agrabad Commercial Area, Chittagong Port Road',
    lat: 22.2850,
    lng: 91.8050,
    swiftCode: 'SCBLBDDD',
    exchangeCurrencies: ['USD', 'EUR', 'BDT', 'INR', 'SGD'],
    workingHours: '09:00 - 16:00',
    phone: '+880 31 716111',
    specialServices: ['Trade Finance Guarantee', 'Crew Salary Dispenser', 'Port Tax Clearance Wire']
  },
  {
    id: 'bank-bml-male',
    name: 'Bank of Maldives - Hulhumalé Harbor Counter',
    bankType: 'Port ATM & Currency Kiosk',
    country: 'Maldives',
    countryFlag: '🇲🇻',
    portLocation: 'Main Commercial Jetty, Hulhumalé Phase 1',
    lat: 4.1780,
    lng: 73.5210,
    swiftCode: 'MALDMVMV',
    exchangeCurrencies: ['USD', 'MVR', 'EUR'],
    workingHours: '24/7 Automated Kiosk',
    phone: '+960 333 0200',
    specialServices: ['24/7 Foreign Currency ATM', 'Tourist & Seafarer Cash Swap', 'Contactless Wire']
  },
  {
    id: 'bank-hbl-karachi',
    name: 'Habib Bank Limited - Karachi Port Trust Building',
    bankType: 'Maritime Bank Branch',
    country: 'Pakistan',
    countryFlag: '🇵🇰',
    portLocation: 'KPT Head Office Building, Eduljee Dinshaw Road',
    lat: 24.8050,
    lng: 66.9750,
    swiftCode: 'HABBPKKA',
    exchangeCurrencies: ['USD', 'PKR', 'EUR', 'AED', 'SAR'],
    workingHours: '09:00 - 17:00',
    phone: '+92 21 3231 4000',
    specialServices: ['Port Tariff Collection', 'Crew Cash Advance', 'Vessel Repair Escrow']
  },
  {
    id: 'bank-hsbc-singapore',
    name: 'HSBC Marine Banking - Pasir Panjang Terminal',
    bankType: 'Seafarer Remittance Center',
    country: 'Singapore',
    countryFlag: '🇸🇬',
    portLocation: 'Pasir Panjang Terminal Hub Level 2',
    lat: 1.2600,
    lng: 103.8550,
    swiftCode: 'HSBCSGSG',
    exchangeCurrencies: ['USD', 'SGD', 'EUR', 'GBP', 'AUD', 'CNY', 'INR', 'PHP'],
    workingHours: '08:00 - 20:00 (24/7 Remittance App)',
    phone: '+65 6216 9000',
    specialServices: ['Global Crew Payroll Management', 'Instant SWIFT Express Transfer', 'Maritime Insurance Escrow']
  }
];

// 4. OTHER MARITIME UTILITIES
export const MARITIME_UTILITIES: MaritimeUtility[] = [
  {
    id: 'util-jnpt-bunker',
    name: 'Indian Oil Marine Fueling & Bunkering Pier',
    utilityType: 'Bunkering / Fuel Dock',
    country: 'India',
    countryFlag: '🇮🇳',
    portName: 'JNPT Mumbai',
    lat: 18.9550,
    lng: 72.8270,
    vhfChannel: 68,
    phone: '+91 22 2724 8811',
    capacityDetails: 'Low Sulfur Marine Gasoil (VLSFO) 500 cSt & MGO. Barge delivery available 2,500 MT/hr.',
    availability: '24/7 Active'
  },
  {
    id: 'util-dockyard-mumbai',
    name: 'Mazagon Dock Shipbuilders Drydock & Repair Yard',
    utilityType: 'Drydock & Ship Repair',
    country: 'India',
    countryFlag: '🇮🇳',
    portName: 'Mumbai Port',
    lat: 18.9620,
    lng: 72.8410,
    vhfChannel: 13,
    phone: '+91 22 2376 2000',
    capacityDetails: 'Drydock capacity up to 30,000 DWT. Hull welding, engine overhaul, propeller alignment.',
    availability: 'Operational'
  },
  {
    id: 'util-colombo-bunker',
    name: 'Lanka IOC Offshore Bunkering Barge Service',
    utilityType: 'Bunkering / Fuel Dock',
    country: 'Sri Lanka',
    countryFlag: '🇱🇰',
    portName: 'Colombo Harbor',
    lat: 6.9450,
    lng: 79.8480,
    vhfChannel: 16,
    phone: '+94 11 247 5700',
    capacityDetails: 'ISO 8217 compliant VLSFO & MFO. Offshore anchorage barge pumping available.',
    availability: '24/7 Active'
  },
  {
    id: 'util-colombo-clinic',
    name: 'Colombo Port Health & International Seafarers Clinic',
    utilityType: 'Port Health & Telemedicine',
    country: 'Sri Lanka',
    countryFlag: '🇱🇰',
    portName: 'Colombo Harbor',
    lat: 6.9390,
    lng: 79.8430,
    phone: '+94 11 242 2211',
    capacityDetails: 'Yellow fever certification, emergency trauma suite, crew tele-medical health check.',
    availability: '24/7 Active'
  },
  {
    id: 'util-ctg-chandler',
    name: 'Bengal Marine Ship Chandler & Fresh Provisions',
    utilityType: 'Ship Chandler & Provisions',
    country: 'Bangladesh',
    countryFlag: '🇧🇩',
    portName: 'Chittagong Port',
    lat: 22.2840,
    lng: 91.8080,
    phone: '+880 31 252 4410',
    capacityDetails: 'Fresh deck stores, engine spare parts, frozen poultry, fresh water supply barge 500 tons.',
    availability: '24/7 Active'
  },
  {
    id: 'util-male-desal',
    name: 'Malé Commercial Port Fresh Water Desalination Station',
    utilityType: 'Fresh Water & Waste Discharge',
    country: 'Maldives',
    countryFlag: '🇲🇻',
    portName: 'Malé Commercial Atoll',
    lat: 4.1730,
    lng: 73.5130,
    phone: '+960 332 3209',
    capacityDetails: 'Ultra-pure potable drinking water piping for ferries and yachts. Bilge water discharge reception.',
    availability: 'Operational'
  },
  {
    id: 'util-khi-customs',
    name: 'Karachi Port Maritime Customs & Immigration Terminal',
    utilityType: 'Customs & Immigration',
    country: 'Pakistan',
    countryFlag: '🇵🇰',
    portName: 'Karachi Port',
    lat: 24.8010,
    lng: 66.9710,
    phone: '+92 21 9921 4010',
    capacityDetails: 'Shore pass issuance for crew, customs cargo manifest clearance, dangerous goods inspect.',
    availability: 'Operational'
  }
];

// 5. INITIAL VESSEL ALERT SYSTEM ITEMS
export const INITIAL_VESSEL_ALERTS: VesselAlertItem[] = [
  {
    id: 'alert-101',
    vesselId: 'vessel-101',
    vesselName: 'MV Ocean Express',
    mmsi: 419001234,
    harborName: 'JNPT Mumbai',
    alertType: 'Collision CPA',
    severity: 'High',
    lat: 18.9580,
    lng: 72.8250,
    timestamp: 'Just now',
    description: 'Closest Point of Approach (CPA) with Matsya Sagar 09 calculated at 0.4 NM in 6 minutes.',
    actionRequired: 'Broadcast course adjustment request on VHF Ch 12 to maintain 1.0 NM clearance.',
    acknowledged: false
  },
  {
    id: 'alert-102',
    vesselId: 'vessel-201',
    vesselName: 'CMA CGM Pearl of Lanka',
    mmsi: 417112009,
    harborName: 'Colombo Port',
    alertType: 'Cyclonic Weather',
    severity: 'Warning',
    lat: 6.9480,
    lng: 79.8450,
    timestamp: '12 mins ago',
    description: 'Approach channel squall front approaching from WSW with gusting winds 28 knots and 1.8m sea swells.',
    actionRequired: 'Pilot on board advised to maintain tugboat escort during terminal mooring.',
    acknowledged: false
  },
  {
    id: 'alert-103',
    vesselId: 'vessel-301',
    vesselName: 'MV Bengal Fortune',
    mmsi: 405334112,
    harborName: 'Chittagong Port',
    alertType: 'Shallow Depth',
    severity: 'Warning',
    lat: 22.2880,
    lng: 91.8100,
    timestamp: '25 mins ago',
    description: 'Under-keel clearance (UKC) reduced to 1.4m during low tide maneuver in Karnaphuli estuary.',
    actionRequired: 'Reduce speed to 4 knots and await high tide swell before berth entrance.',
    acknowledged: true
  },
  {
    id: 'alert-104',
    vesselId: 'vessel-801',
    vesselName: 'EVER GIVEN II',
    mmsi: 563001920,
    harborName: 'Singapore Strait',
    alertType: 'EEZ Intrusion',
    severity: 'Info',
    lat: 1.2580,
    lng: 103.8620,
    timestamp: '40 mins ago',
    description: 'Entering Singapore Port Limit & Traffic Separation Scheme Lane 2 eastbound.',
    actionRequired: 'Maintain mandatory VTIS reporting protocol on VHF Ch 73.',
    acknowledged: true
  }
];
