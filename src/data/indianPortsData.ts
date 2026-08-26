export interface IndianPort {
  id: string;
  name: string;
  code: string;
  type: 'MAJOR_PORT' | 'NON_MAJOR_PORT' | 'DEEP_WATER_HUB' | 'PRIVATE_TERMINAL';
  state: string;
  coast: 'WEST_COAST' | 'EAST_COAST' | 'ISLAND_TERRITORY';
  latitude: number;
  longitude: number;
  latLngStr: string;
  cargoHandled: string;
  dutyFreeStatus: 'OPERATIONAL' | 'EXPANDING' | 'PLANNED';
  commercialArcade: boolean;
  keyFeatures: string[];
}

export const indianPortsData: IndianPort[] = [
  // WEST COAST MAJOR & KEY PORTS
  {
    id: 'IN-KDL',
    name: 'Deendayal Port (Kandla)',
    code: 'IN KDL',
    type: 'MAJOR_PORT',
    state: 'Gujarat',
    coast: 'WEST_COAST',
    latitude: 23.01,
    longitude: 70.22,
    latLngStr: '23.0100° N, 70.2200° E',
    cargoHandled: 'Dry Bulk, Liquid Crude & Chemicals',
    dutyFreeStatus: 'OPERATIONAL',
    commercialArcade: true,
    keyFeatures: ['Gulf of Kutch Maritime Hub', 'Special Economic Zone', 'High Capacity Oil Jetty']
  },
  {
    id: 'IN-MUN',
    name: 'Mundra Port',
    code: 'IN MUN',
    type: 'PRIVATE_TERMINAL',
    state: 'Gujarat',
    coast: 'WEST_COAST',
    latitude: 22.74,
    longitude: 69.7,
    latLngStr: '22.7400° N, 69.7000° E',
    cargoHandled: 'Container, Automobiles, Liquid & Coal',
    dutyFreeStatus: 'OPERATIONAL',
    commercialArcade: true,
    keyFeatures: ["India's Largest Commercial Private Port", 'Deep Draft Berths', 'Automated Logistics']
  },
  {
    id: 'IN-BOM',
    name: 'Mumbai Port (MbPT)',
    code: 'IN BOM',
    type: 'MAJOR_PORT',
    state: 'Maharashtra',
    coast: 'WEST_COAST',
    latitude: 18.94,
    longitude: 72.84,
    latLngStr: '18.9400° N, 72.8400° E',
    cargoHandled: 'POL, Passenger Cruise, Breakbulk',
    dutyFreeStatus: 'OPERATIONAL',
    commercialArcade: true,
    keyFeatures: ['Historic Natural Harbor', 'International Cruise Terminal', 'Waterfront Heritage Complex']
  },
  {
    id: 'IN-NSA',
    name: 'Jawaharlal Nehru Port (JNPT / Nhava Sheva)',
    code: 'IN NSA',
    type: 'MAJOR_PORT',
    state: 'Maharashtra',
    coast: 'WEST_COAST',
    latitude: 18.95,
    longitude: 72.95,
    latLngStr: '18.9500° N, 72.9500° E',
    cargoHandled: 'Containerized Cargo (Over 50% India Total)',
    dutyFreeStatus: 'OPERATIONAL',
    commercialArcade: true,
    keyFeatures: ['Automated Container Terminals', 'Direct Port Delivery (DPD)', 'Specialized Freight Corridors']
  },
  {
    id: 'IN-MRG',
    name: 'Mormugao Port',
    code: 'IN MRG',
    type: 'MAJOR_PORT',
    state: 'Goa',
    coast: 'WEST_COAST',
    latitude: 15.41,
    longitude: 73.8,
    latLngStr: '15.4100° N, 73.8000° E',
    cargoHandled: 'Iron Ore, Coal & Luxury Cruise Liners',
    dutyFreeStatus: 'OPERATIONAL',
    commercialArcade: true,
    keyFeatures: ['Natural Ore Harbor', 'Goa International Cruise Terminal', 'Coastal Tourism Hub']
  },
  {
    id: 'IN-NML',
    name: 'New Mangalore Port',
    code: 'IN NML',
    type: 'MAJOR_PORT',
    state: 'Karnataka',
    coast: 'WEST_COAST',
    latitude: 12.92,
    longitude: 74.81,
    latLngStr: '12.9200° N, 74.8100° E',
    cargoHandled: 'Crude Oil, LPG, Coffee & Cashew Imports',
    dutyFreeStatus: 'OPERATIONAL',
    commercialArcade: true,
    keyFeatures: ['Deep Water Lagoon Port', 'Polythene & Petrochem Jetty', 'Eco-Port Green Certified']
  },
  {
    id: 'IN-COK',
    name: 'Cochin Port & Vallarpadam ICTT',
    code: 'IN COK',
    type: 'MAJOR_PORT',
    state: 'Kerala',
    coast: 'WEST_COAST',
    latitude: 9.96,
    longitude: 76.27,
    latLngStr: '9.9600° N, 76.2700° E',
    cargoHandled: 'Transshipment Container, Bunkering, Spices',
    dutyFreeStatus: 'OPERATIONAL',
    commercialArcade: true,
    keyFeatures: ["India's First International Transshipment Hub", 'Willingdon Island Heritage', 'LNG Re-gasification']
  },
  {
    id: 'IN-VZH',
    name: 'Vizhinjam International Transshipment Port',
    code: 'IN VZH',
    type: 'DEEP_WATER_HUB',
    state: 'Kerala',
    coast: 'WEST_COAST',
    latitude: 8.37,
    longitude: 76.98,
    latLngStr: '8.3700° N, 76.9800° E',
    cargoHandled: 'Mega Container Ocean Liners (24,000 TEU)',
    dutyFreeStatus: 'OPERATIONAL',
    commercialArcade: true,
    keyFeatures: ['Natural 20m Deep Draft', 'Proximity to East-West Shipping Route', 'Automated Cranes']
  },

  // EAST COAST MAJOR & KEY PORTS
  {
    id: 'IN-TUT',
    name: 'V.O. Chidambaranar Port (Tuticorin)',
    code: 'IN TUT',
    type: 'MAJOR_PORT',
    state: 'Tamil Nadu',
    coast: 'EAST_COAST',
    latitude: 8.75,
    longitude: 78.18,
    latLngStr: '8.7500° N, 78.1800° E',
    cargoHandled: 'Coal, Timber, Fertilizer, Containers',
    dutyFreeStatus: 'OPERATIONAL',
    commercialArcade: true,
    keyFeatures: ['Artificial Deep Sea Port', 'Green Hydrogen Hub', 'Gulf of Mannar Gateway']
  },
  {
    id: 'IN-MAA',
    name: 'Chennai Port',
    code: 'IN MAA',
    type: 'MAJOR_PORT',
    state: 'Tamil Nadu',
    coast: 'EAST_COAST',
    latitude: 13.08,
    longitude: 80.29,
    latLngStr: '13.0800° N, 80.2900° E',
    cargoHandled: 'Automobiles, Containers, Machinery',
    dutyFreeStatus: 'OPERATIONAL',
    commercialArcade: true,
    keyFeatures: ["Coromandel Coast's Largest Port", 'Ro-Ro Car Export Terminal', 'Maritime Museum Plaza']
  },
  {
    id: 'IN-ENR',
    name: 'Kamarajar Port (Ennore)',
    code: 'IN ENR',
    type: 'MAJOR_PORT',
    state: 'Tamil Nadu',
    coast: 'EAST_COAST',
    latitude: 13.26,
    longitude: 80.33,
    latLngStr: '13.2600° N, 80.3300° E',
    cargoHandled: 'Thermal Coal, Automobiles, LNG',
    dutyFreeStatus: 'EXPANDING',
    commercialArcade: true,
    keyFeatures: ["India's First Corporatized Major Port", 'Dedicated Coal & Energy Wharves']
  },
  {
    id: 'IN-VTZ',
    name: 'Visakhapatnam Port (Vizag)',
    code: 'IN VTZ',
    type: 'MAJOR_PORT',
    state: 'Andhra Pradesh',
    coast: 'EAST_COAST',
    latitude: 17.68,
    longitude: 83.29,
    latLngStr: '17.6800° N, 83.2900° E',
    cargoHandled: 'Iron Ore, Petroleum, Coking Coal',
    dutyFreeStatus: 'OPERATIONAL',
    commercialArcade: true,
    keyFeatures: ["Dolphin's Nose Natural Entrance", 'Outer & Inner Deep Harbors', 'Submarine Museum Bay']
  },
  {
    id: 'IN-KRP',
    name: 'Krishnapatnam Port',
    code: 'IN KRP',
    type: 'PRIVATE_TERMINAL',
    state: 'Andhra Pradesh',
    coast: 'EAST_COAST',
    latitude: 14.25,
    longitude: 80.12,
    latLngStr: '14.2500° N, 80.1200° E',
    cargoHandled: 'Containers, Edible Oil, Thermal Coal',
    dutyFreeStatus: 'OPERATIONAL',
    commercialArcade: true,
    keyFeatures: ['Deep Draft East Coast Terminal', 'Direct Rail Cargo Connectivity']
  },
  {
    id: 'IN-PDP',
    name: 'Paradip Port',
    code: 'IN PDP',
    type: 'MAJOR_PORT',
    state: 'Odisha',
    coast: 'EAST_COAST',
    latitude: 20.26,
    longitude: 86.67,
    latLngStr: '20.2600° N, 86.6700° E',
    cargoHandled: 'Coal, Crude Oil, Iron Ore Pellets',
    dutyFreeStatus: 'OPERATIONAL',
    commercialArcade: true,
    keyFeatures: ['Deep Water Artificial Port', 'Clean Cargo Mechanization', 'Mahanadi Delta Gateway']
  },
  {
    id: 'IN-CCU',
    name: 'Syama Prasad Mookerjee Port (Kolkata & Haldia)',
    code: 'IN CCU',
    type: 'MAJOR_PORT',
    state: 'West Bengal',
    coast: 'EAST_COAST',
    latitude: 22.54,
    longitude: 88.31,
    latLngStr: '22.5400° N, 88.3100° E',
    cargoHandled: 'Riverine Cargo, Jute, Steel, Containers',
    dutyFreeStatus: 'OPERATIONAL',
    commercialArcade: true,
    keyFeatures: ["India's Premier Riverine Major Port", 'Twin Dock System (Kolkata & Haldia)', 'Bay of Bengal Gateway']
  },
  {
    id: 'IN-DHM',
    name: 'Dhamra Port',
    code: 'IN DHM',
    type: 'PRIVATE_TERMINAL',
    state: 'Odisha',
    coast: 'EAST_COAST',
    latitude: 20.8,
    longitude: 86.97,
    latLngStr: '20.8000° N, 86.9700° E',
    cargoHandled: 'Bulk Coal, Mineral Ores & LNG',
    dutyFreeStatus: 'EXPANDING',
    commercialArcade: false,
    keyFeatures: ['Deep Draft All-Weather Port', 'LNG Terminal']
  },
  {
    id: 'IN-IXZ',
    name: 'Port Blair Port (Andaman & Nicobar)',
    code: 'IN IXZ',
    type: 'MAJOR_PORT',
    state: 'Andaman & Nicobar Islands',
    coast: 'ISLAND_TERRITORY',
    latitude: 11.67,
    longitude: 92.74,
    latLngStr: '11.6700° N, 92.7400° E',
    cargoHandled: 'Island Passenger Shipping, Timber, Fuel',
    dutyFreeStatus: 'OPERATIONAL',
    commercialArcade: true,
    keyFeatures: ['Strategic Island Hub', 'Coral Sea Protection Zone', 'International Cruise Port']
  },
  {
    id: 'IN-PNY',
    name: 'Puducherry Port & Harbour',
    code: 'IN PNY',
    type: 'NON_MAJOR_PORT',
    state: 'Puducherry',
    coast: 'EAST_COAST',
    latitude: 11.93,
    longitude: 79.83,
    latLngStr: '11.9300° N, 79.8300° E',
    cargoHandled: 'Coastal Cargo, Handicrafts, Passenger Ferry & Tourism',
    dutyFreeStatus: 'OPERATIONAL',
    commercialArcade: true,
    keyFeatures: ['Heritage French Promenade Harbour', 'Indo-French Duty-Free Arcade', 'Coastal Passenger Ferry Terminal']
  }
];
