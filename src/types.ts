export interface SouthAsianCountry {
  id: string;
  name: string;
  officialName: string;
  flagEmoji: string;
  capital: string;
  population: string;
  areaKm2: string;
  saarcMemberYear: number;
  isCoastal: boolean;
  coastlineKm: string;
  majorPorts: string[];
  climateZone: string;
  climateVulnerabilityIndex: number; // 1-100 (higher = more vulnerable)
  primaryMonsoon: string;
  avgTemperatureRange: string;
  keyHazards: string[];
  description: string;
  economicMaritmeRole: string;
  climateImpactSummary: string;
}

export interface WeatherData {
  city: string;
  country: string;
  tempC: number;
  feelsLikeC: number;
  condition: string;
  humidity: number;
  windKmH: number;
  windDirection: string;
  aqi: number;
  aqiStatus: 'Good' | 'Moderate' | 'Unhealthy' | 'Severe';
  seaSurfaceTempC?: number;
  waveHeightM?: number;
  status: 'Normal' | 'Advisory' | 'Alert';
  extremeAlert?: string;
  updatedAt: string;
}

export interface CruiseSchedule {
  id: string;
  vesselName: string;
  cruiseLine: string; // Operator / Shipping Line
  vesselCategory: 'Cruise Ship' | 'Cargo Ship' | 'Passenger Ferry';
  vesselType: 'Luxury Cruise Liner' | 'Inter-Island Passenger Ferry' | 'Coastal Expedition Vessel' | 'Regional Ocean Ferry' | 'Container Ship' | 'Oil Tanker' | 'Bulk Carrier' | 'LNG Carrier' | 'RO-RO Cargo Vessel';
  originPort: string;
  originCountry: string;
  destinationPort: string;
  destinationCountry: string;
  departureTime: string;
  arrivalTime: string;
  frequency: string;
  durationHours: number;
  distanceNM: number; // Nautical miles
  seawayRouteName: string; // Traveling Seaway Route Name
  seawayWaypoints?: string[]; // Transit channels, straits, or waypoints
  status: 'On Time' | 'Sailing' | 'Monsoon Watch' | 'Swell Warning' | 'Delayed' | 'Berthing';
  seaCondition: {
    waveHeightM: number;
    swellPeriodSec: number;
    windKnots: number;
    visibilityNM: number;
    safetyLevel: 'Safe' | 'Moderate Swells' | 'Rough Seas' | 'Hazardous';
  };
  capacityPassengers?: number;
  cargoCapacity?: string; // e.g. "18,200 TEU" or "150,000 DWT"
  cargoType?: string; // e.g. "Container Freight", "Crude Petroleum", "Bulk Grain"
  priceEstimateUSD?: number;
  highlights: string[];
  description: string;
}

export interface ClimateAlert {
  id: string;
  region: string;
  severity: 'Critical' | 'Warning' | 'Advisory' | 'Notice' | string;
  category: 'Monsoon' | 'Cyclone' | 'Heatwave' | 'Marine Swell' | 'Flood Alert' | 'Gale' | 'Tsunami' | 'Pressure' | 'Visibility' | 'Storm Surge' | string;
  title: string;
  description: string;
  timestamp: string;
  affectedPorts: string[];
}

export interface PortInfo {
  id: string;
  name: string;
  cityName: string;
  country: string;
  countryFlag?: string;
  provinceOrState?: string;
  seaBody?: 'Arabian Sea' | 'Bay of Bengal' | 'Laccadive Sea' | 'Indian Ocean' | 'Palk Strait' | 'Gulf of Oman' | 'Andaman Sea' | 'Inland River Corridor';
  code: string; // UN/LOCODE
  lat: number;
  lng: number;
  portType?: 'Deep Water Seaport' | 'Transshipment Hub' | 'Passenger & Cruise Terminal' | 'Inland / River Port' | 'Island Ferry Gateway' | 'Dry Port / Inland Gateway';
  activeSchedulesCount: number;
  currentWaveHeight: number;
  weatherCondition: string;
  majorImportsExports?: string[];
  operatingSeaways?: string[];
  description: string;
}

export interface RouteWaypoint {
  id: string;
  name: string;
  code: string;
  lat: number;
  lng: number;
  type: 'Doppler Radar' | 'Coastal Observatory' | 'Deep Sea Buoy' | 'Alpine Hydro Station' | 'Harbour Telemetry';
  tempC: number;
  feelsLikeC: number;
  condition: string;
  humidity: number;
  windKmH: number;
  windDirection: string;
  waveHeightM?: number;
  seaTempC?: number;
  rainRateMmH: number;
  pressureHpa: number;
  status: 'Normal' | 'Advisory' | 'Alert' | 'Critical';
  lastPingTime: string;
  note: string;
}

export interface RouteMapItem {
  id: string;
  name: string;
  officialName: string;
  category: 'SAARC Country' | 'Indian Coastal State' | 'Indian Inland State' | 'Island Territory';
  flagEmoji: string;
  capitalOrHub: string;
  routeTitle: string;
  routeCode: string;
  streamChannel: string;
  description: string;
  overallStatus: 'Normal' | 'Advisory' | 'Alert' | 'Critical';
  activeAlert?: string;
  dopplerFrequency: string;
  radarReflectivityDbz: number;
  waypoints: RouteWaypoint[];
  liveLogs: string[];
}

export interface SatelliteTrack {
  id: string;
  name: string;
  agency: string; // e.g. ISRO, NOAA, ESA, NASA
  orbitType: 'Geostationary' | 'Sun-Synchronous' | 'Polar Low-Earth Orbit';
  altitudeKm: number;
  inclinationDeg: number;
  sensorType: string;
  status: 'Active Scanning' | 'Calibrating' | 'Transmitting Telemetry';
  lat: number;
  lng: number;
  resolutionM: number;
  spectralChannels: string[];
  swathWidthKm: number;
  lastPassUTC: string;
  description: string;
  primaryOutput: string;
}

export interface DailyWeatherAlert {
  id: string;
  date: string;
  timeIssued: string;
  title: string;
  severity: 'Critical' | 'Warning' | 'Advisory';
  category: 'Cyclone Watch' | 'Monsoon Surge' | 'Extreme Rainfall' | 'High Swell & Gale' | 'Marine Swell' | 'Heatwave Advisory' | 'River Inundation';
  region: string;
  country: string;
  countryFlag: string;
  headline: string;
  detailedAdvisory: string;
  mitigationProtocol: string;
  affectedPorts: string[];
  maxWindGustsKnots: number;
  expectedRainfallMm: number;
  maxWaveHeightM: number;
  satelliteSource: string;
  issuingAuthority: string;
}

export interface DailyForecastPeriod {
  tempC: number;
  condition: string;
  rainProbabilityPct: number;
  windKmH: number;
  humidityPct: number;
}

export interface DailyForecastHub {
  city: string;
  country: string;
  countryFlag: string;
  date: string;
  uvIndex: number;
  uvLevel: 'Low' | 'Moderate' | 'High' | 'Very High' | 'Extreme';
  cloudCoverPct: number;
  seaWarning: string;
  periods: {
    morning: DailyForecastPeriod;
    afternoon: DailyForecastPeriod;
    evening: DailyForecastPeriod;
    night: DailyForecastPeriod;
  };
}

export interface CoastGuardRescueUnit {
  id: string;
  country: string;
  countryFlag: string;
  agencyName: string;
  mrccCenter: string;
  hotline24x7: string;
  vhfChannel: string;
  inmarsatId: string;
  email: string;
  baseLocation: string;
  operatingJurisdiction: string;
  rescueAssetsAvailable: string[];
  avgResponseTimeMin: number;
}

export interface EmergencySosSignal {
  id: string;
  vesselName: string;
  vesselType: string;
  mmsiNumber: string;
  flagNation: string;
  currentLat: number;
  currentLng: number;
  distressType: 'Collision / Stranding' | 'Medical Emergency' | 'Engine Failure in Swell' | 'Man Overboard (MOB)' | 'Fire / Explosion' | 'Adverse Weather / Capsizing';
  personsOnBoard: number;
  status: 'BROADCASTING DISTRESS' | 'RESCUE VESSEL EN ROUTE' | 'HELICOPTER DISPATCHED' | 'STANDBY / ASSISTED';
  timestamp: string;
  seaBody: string;
  nearestPort: string;
}

export interface TelecomRoomSession {
  id: string;
  channelName: string;
  frequency: string;
  hostType: 'MRCC Dispatch' | 'Tele-Medicine Doctor' | 'Coast Guard Vessel' | 'Port Captain';
  hostName: string;
  activeParticipants: number;
  satelliteProvider: 'Inmarsat FleetBroadband' | 'Starlink Maritime' | 'Iridium Certus' | 'VHF Marine Radio';
  latencyMs: number;
  status: 'Live Connected' | 'Connecting...' | 'Muted';
}

export interface MaritimeJob {
  id: string;
  title: string;
  department: 'Deck & Navigation' | 'Engine & Electrical' | 'Cruise Hospitality & Service' | 'Catering & Galley' | 'Medical & Wellness' | 'Port & Logistics' | 'Maritime Security & IT';
  vesselType: string;
  genderEligibility: 'Male & Female (All)' | 'Female Preferred' | 'Male Preferred';
  minAge: number;
  maxAge: number;
  monthlySalaryUSD: number;
  monthlySalaryINR: number;
  contractDurationMonths: number;
  experienceRequired: string;
  qualificationRequired: string;
  benefits: string[];
  keyDuties: string[];
  recruitmentAgency: string;
  locationCountry: string;
  workEnvironment: 'Onboard Vessel' | 'Coastal & Shore-based' | 'Port Terminal';
  vacanciesCount: number;
  postedDate: string;
}

export interface MaritimeTrainingCenter {
  id: string;
  name: string;
  country: string;
  countryFlag: string;
  cityLocation: string;
  accreditation: string; // e.g. "DG Shipping Approved / IMO STCW 2010"
  coursesOffered: {
    courseName: string;
    durationWeeks: number;
    feeUSD: number;
    eligibilityAge: string;
    targetGender: 'All Genders' | 'Women in Maritime Training Program' | 'Open';
  }[];
  placementAssistanceRatePct: number;
  contactPhone: string;
  contactEmail: string;
  websiteUrl: string;
}

export interface MaritimeRecruitmentAgency {
  id: string;
  agencyName: string;
  licenseNumber: string; // e.g. RPSL-MUM-102
  country: string;
  countryFlag: string;
  city: string;
  specialization: string[];
  verifiedGovtApproved: boolean;
  contactPerson: string;
  phone: string;
  email: string;
  activeJobsCount: number;
}

export interface PotentialFishingZone {
  id: string;
  zoneName: string;
  lat: number;
  lng: number;
  seaSurfaceTempC: number;
  chlorophyllMgM3: number;
  depthMeters: number;
  distanceFromCoastKm: number;
  targetSpecies: string[];
  validityHours: number;
  advisoryConfidence: 'High Probability' | 'Moderate' | 'Favorable Swell';
  nearestHarbor: string;
}

export interface FishMarketRate {
  id: string;
  speciesName: string;
  localName: string;
  harborPort: string;
  country: string;
  countryFlag: string;
  pricePerKgLocalCurrency: number;
  currencySymbol: string;
  pricePerKgUSD: number;
  priceTrend: 'Up' | 'Down' | 'Stable';
  qualityGrade: 'Export Grade A' | 'Domestic Wholesale' | 'Fresh Landing';
}

export interface FishermenSafetyAdvisory {
  id: string;
  region: string;
  countryFlag: string;
  alertLevel: 'WARNING - DO NOT VENTURE TO SEA' | 'CAUTION - ROUGH SEA' | 'NORMAL - SAFE FOR TRIPS' | 'MONSOON TRAWLING BAN ACTIVE';
  waveHeightMeters: string;
  windSpeedKnots: string;
  description: string;
  eezBoundaryWarning: string;
}

export interface MarineTourismPackage {
  id: string;
  title: string;
  country: string;
  countryFlag: string;
  regionLocation: string;
  vesselName: string;
  vesselType: string;
  durationDays: number;
  departurePort: string;
  stops: string[];
  priceUSD: number;
  priceLocal: string;
  rating: number;
  category: 'Luxury Cruise' | 'Island Hopping' | 'Eco Mangrove Safari' | 'Reef & Diving Expedition' | 'Coastal Heritage Voyage';
  highlights: string[];
  includedServices: string[];
  bestSeason: string;
  description: string;
  availableSeats: number;
}

export interface PassengerDetail {
  fullName: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  passportOrGovtId: string;
  nationality: string;
}

export interface TicketBooking {
  bookingId: string;
  pnr: string;
  passengerName: string;
  passportOrGovtId: string;
  nationality: string;
  email: string;
  phone: string;
  packageOrVesselTitle: string;
  packageId?: string;
  departurePort: string;
  destinationPort: string;
  travelDate: string;
  passengerCount: number;
  cabinClass: 'Economy Deck' | 'Business Ocean View' | 'Royal Deluxe Suite';
  passengersList?: PassengerDetail[];
  totalFareUSD: number;
  baseFareUSD?: number;
  discountUSD?: number;
  agentCode?: string;
  paymentMethod: 'Credit / Debit Card' | 'UPI / NetBanking' | 'Wire Transfer' | 'Marine Digital Wallet' | 'Terminal Cash Counter';
  paymentStatus: 'COMPLETED' | 'PENDING' | 'PROCESSING';
  transactionRef: string;
  qrToken?: string;
  seatNumbers?: string[];
  insuranceAdded: boolean;
  insurancePolicyId?: string;
  bookingTimestamp: string;
  bookingType?: 'passenger' | 'cargo';
}

export interface CargoBooking {
  bookingId: string;
  billOfLading: string;
  consignorName: string;
  consignorCompany: string;
  consigneeName: string;
  consigneeCompany: string;
  contactEmail: string;
  contactPhone: string;
  cargoCategory: 'Dry Container (20ft/40ft TEU)' | 'Reefer Cold Chain Container' | 'Hazardous Chemicals (IMO Class)' | 'Heavy Machinery & Breakbulk' | 'Automobile RoRo' | 'Express Marine Freight Parcel';
  cargoWeightTons: number;
  cargoVolumeCbm: number;
  originPort: string;
  destinationPort: string;
  vesselName: string;
  departureDate: string;
  totalFreightFeeUSD: number;
  paymentMethod: 'Credit / Debit Card' | 'Wire Transfer' | 'Marine Digital Wallet' | 'Letter of Credit (L/C)';
  paymentStatus: 'COMPLETED' | 'PENDING' | 'PROCESSING';
  customsDeclarationCode?: string;
  hazmatClass?: string;
  temperatureSettingC?: number;
  trackingStatus: 'MANIFESTED' | 'PORT_GATE_IN' | 'ONBOARD_VESSEL' | 'IN_TRANSIT' | 'CUSTOMS_CLEARANCE' | 'DELIVERED';
  bookingTimestamp: string;
}

export interface AgentInquiry {
  inquiryId: string;
  agentCode: string;
  agencyName: string;
  agencyType: 'Tour Operator' | 'Travel Agency' | 'Cruise Aggregator' | 'Charter Fleet Operator' | 'Hotel & Resort Group';
  contactPerson: string;
  email: string;
  phone: string;
  country: string;
  monthlyPassengerVolume: string;
  preferredTieUpType: 'B2B Commission Agent' | 'GDS API Integration' | 'Bulk Allotment Purchase' | 'White Label Booking Portal';
  status: 'APPROVED' | 'UNDER_REVIEW' | 'ACTIVE_PARTNER';
  apiKey: string;
  commissionRatePercent: number;
  notes?: string;
  submittedAt: string;
}

export interface MaritimeInsurancePlan {
  id: string;
  planName: string;
  targetCategory: 'Cruise Tourist Travel' | 'Inter-Island Ferry Passenger' | 'Deep-Sea Seafarer & Crew' | 'Fisherman High-Risk Shield';
  coverageLimitUSD: number;
  dailyPremiumUSD: number;
  keyBenefits: string[];
  medicalEvacuationLimitUSD: number;
  baggageAndGearLimitUSD: number;
  emergencyHelicopterCover: boolean;
  accidentalDeathCoverUSD: number;
  description: string;
  recommendedFor: string;
}

export interface IssuedInsurancePolicy {
  policyNumber: string;
  insuredPersonName: string;
  govtIdPassport: string;
  planName: string;
  coverageLimitUSD: number;
  startDate: string;
  endDate: string;
  premiumPaidUSD: number;
  status: 'ACTIVE' | 'PROCESSING' | 'EXPIRED';
  issuedTimestamp: string;
  issuingUnderwriter: string;
}

export interface MultiModalBooking {
  id: string;
  pnr: string;
  passengerName: string;
  passportId: string;
  email: string;
  phone: string;
  cruiseLeg: {
    vesselName: string;
    route: string;
    travelDate: string;
    cabinClass: string;
    fareUSD: number;
  };
  flightLeg: {
    carrier: string;
    flightNo: string;
    route: string;
    flightDate: string;
    flightClass: string;
    fareUSD: number;
  };
  shuttleLeg: {
    provider: string;
    transferRoute: string;
    transferTime: string;
    fareUSD: number;
  };
  totalFareUSD: number;
  discountUSD: number;
  baggageCheckThrough: boolean;
  paymentMethod: string;
  paymentStatus: 'COMPLETED' | 'PENDING';
  qrToken: string;
  timestamp: string;
}

export interface LoyaltyMember {
  memberId: string;
  name: string;
  email: string;
  tier: 'Silver Mariner' | 'Gold Captain' | 'Platinum Voyager' | 'Mariner Elite';
  pointsBalance: number;
  totalMilesSailedFlown: number;
  tripsCompleted: number;
  freeLoungePasses: number;
  upgradeVouchers: number;
  nextTierProgressPct: number;
  joinedDate: string;
}

export interface CargoManifestItem {
  itemId: string;
  billOfLadingOrAwb: string;
  description: string;
  consignor: string;
  consignee: string;
  packageType: string;
  weightKg: number;
  volumeCbm: number;
  hazmatClass?: string;
  customsStatus: 'CLEARED' | 'INSPECTION_HOLD' | 'MANIFESTED';
}

export interface CargoManifestRecord {
  manifestId: string;
  transportType: 'Ocean Vessel' | 'Air Cargo Flight';
  carrierOrVessel: string;
  voyageOrFlightNo: string;
  originHub: string;
  destinationHub: string;
  departureDate: string;
  totalContainersOrParcels: number;
  totalWeightKg: number;
  totalVolumeCbm: number;
  customsSealCode: string;
  hazmatComplianceCode: string;
  captainPilotName: string;
  manifestStatus: 'VERIFIED_OFFICIAL' | 'DRAFT' | 'PORT_SUBMITTED';
  generatedTimestamp: string;
  items: CargoManifestItem[];
}

export interface VaccinationCentre {
  id: string;
  name: string;
  category: 'Domestic' | 'International';
  type: 'WHO Accredited Travel Clinic' | 'Government Quarantine Station' | 'International Airport Medical Center' | 'Seaport Health Terminal' | 'General Hospital Travel Dept';
  country: string;
  countryFlag: string;
  city: string;
  address: string;
  coordinates: { lat: number; lng: number };
  phone: string;
  email: string;
  operatingHours: string;
  rating: number;
  reviewsCount: number;
  accreditation: string; // e.g. "WHO Yellow Fever Authorized", "CDC Certified"
  availableVaccines: {
    name: string;
    code: string;
    priceUSD: number;
    inStock: boolean;
    requiredForTravelTo?: string[];
  }[];
  services: string[]; // e.g. ["ICVP Yellow Card Issuance", "PCR & Serology", "Fit-to-Fly Certificate", "Doctor Consultation"]
  emergencyContact: string;
  walkInAllowed: boolean;
}

export interface LabTestReport {
  id: string;
  testName: string;
  category: 'Blood Work' | 'Serology & Antibodies' | 'EKG & Cardiac' | 'Respiratory & Lung' | 'Toxicology & Drug Screen';
  dateSampled: string;
  resultSummary: string;
  normalRange: string;
  status: 'NORMAL' | 'ATTENTION' | 'CRITICAL';
  performingLab: string;
  verifiedByDoctor: string;
}

export interface MedicationPrescription {
  id: string;
  medicineName: string;
  dosage: string;
  frequency: string;
  prescribingDoctor: string;
  startDate: string;
  endDate: string;
  refillReminders: boolean;
  purpose: string;
}

export interface InternationalInsurancePlan {
  id: string;
  providerName: string;
  planName: string;
  maxCoverageUSD: number;
  monthlyPremiumUSD: number;
  deductibleUSD: number;
  keyBenefits: string[];
  recommendedForPorts: string[];
  rating: number;
  emergencyRepatriationIncluded: boolean;
  telemedicine24_7: boolean;
  badgeTag: string;
}

export interface EmergencyMedicalContact {
  id: string;
  name: string;
  relation: 'Spouse / Next of Kin' | 'Fleet Medical Officer' | 'Port Health Liaison' | 'Embassy / Consulate Officer' | 'Personal Physician';
  phone: string;
  email: string;
  isPrimarySOS: boolean;
  location: string;
}

export interface MedicalHealthRecord {
  id: string;
  patientName: string;
  patientId: string;
  passportNo: string;
  nationalId: string;
  dateOfBirth: string;
  gender: string;
  bloodType: string;
  allergies: string[];
  chronicConditions: string[];
  vaccinations: {
    vaccineName: string;
    dose: string;
    administeredDate: string;
    expiryDate?: string;
    clinicName: string;
    batchNo: string;
    icvpVerified: boolean;
  }[];
  labReports: LabTestReport[];
  medications: MedicationPrescription[];
  fitForDutyCertificates: {
    certificateId: string;
    issuedBy: string;
    issueDate: string;
    validityYears: number;
    fitStatus: 'FIT_UNRESTRICTED' | 'FIT_WITH_LIMITATIONS' | 'TEMPORARY_UNFIT';
  }[];
  emergencyContacts: EmergencyMedicalContact[];
  insurancePolicy: {
    providerName: string;
    policyNumber: string;
    coverageType: string;
    maxCoverageUSD: number;
    validUntil: string;
    emergencyAssistanceHelpline: string;
    isActive: boolean;
  };
  insuranceAlerts: {
    id: string;
    severity: 'WARNING' | 'CRITICAL' | 'RECOMMENDATION';
    title: string;
    message: string;
    actionRequired: string;
  }[];
  travelHealthClearance: 'CLEARED_GLOBAL' | 'REQUIRES_BOOSTER' | 'QUARANTINE_ADVISORY';
  qrHealthPassHash: string;
}

export interface HealthLedgerBlock {
  blockIndex: number;
  timestamp: string;
  eventType: 'ICVP_VACCINE_STAMP' | 'LAB_EHR_RECORD' | 'FIT_FOR_DUTY_CERT' | 'INSURANCE_POLICY_VERIFICATION' | 'SATELLITE_SOS_AUDIT';
  actionTitle: string;
  issuerAuthority: string;
  previousHash: string;
  blockHash: string;
  isCryptographicallyVerified: boolean;
  metadata: string;
}

export interface HealthTrendMetric {
  date: string;
  systolicBP: number;
  diastolicBP: number;
  heartRateBPM: number;
  oxygenSatSpO2: number;
  hydrationPercent: number;
  spirometryFEV1Percent: number;
  stressIndexLevel: 'LOW' | 'OPTIMAL' | 'MODERATE' | 'HIGH';
}

export interface InsuranceCoverageZone {
  id: string;
  zoneName: string;
  regionCategory: 'Indo-Pacific Transit' | 'European Union & Baltic' | 'Suez & Middle East Maritime' | 'Americas Coastal Zone';
  guaranteedHospitalsCount: number;
  cashlessDirectPayActive: boolean;
  searchAndRescueHelicopterRadiusKM: number;
  primaryPartnerNetwork: string;
  coverageStatus: 'FULL_COVERAGE_100%' | 'STANDARD_80%' | 'ACTION_REQUIRED_750K_MANDATE';
  coordinates: { lat: number; lng: number };
}

export interface MedicalSyncInfo {
  syncStatus: 'SYNCED_CLOUD' | 'SYNCING_SATELLITE' | 'OFFLINE_CACHED';
  lastSyncedAt: string;
  offlineQueueCount: number;
  encryptedDeviceHash: string;
  satelliteSignalStrengthPercent: number;
  storageAllocatedMB: number;
}

export interface SeismicVolcanoAlert {
  id: string;
  eventType: 'UNDERSEA_EARTHQUAKE' | 'SUBMARINE_VOLCANO_ERUPTION' | 'TSUNAMI_WAVE_GENERATED' | 'TECTONIC_PLATE_TREMOR';
  severityLevel: 'RED_EVACUATE' | 'ORANGE_HIGH_ALERT' | 'YELLOW_ADVISORY' | 'GREEN_MONITORING';
  title: string;
  locationRegion: string;
  epicenterCoordinates: { lat: number; lng: number };
  depthKM: number;
  magnitudeRichter?: number;
  volcanicVEIIndex?: number;
  waveHeightMeters?: number;
  distanceToNearestPortKM: number;
  nearestPortName: string;
  estimatedTsunamiETA: string;
  recommendedNavAction: string;
  timestamp: string;
  isActiveWarning: boolean;
}

export interface EmergencyNotification {
  id: string;
  timestamp: string;
  senderRole: 'NOAA_PACIFIC_TSUNAMI_CENTER' | 'PORT_HEALTH_AUTHORITY' | 'FLEET_MEDICAL_OFFICER' | 'WHO_DISASTER_DESK' | 'INMARSAT_EARTHQUAKE_BEACON';
  urgency: 'IMMEDIATE_LIFE_SAFETY' | 'CRITICAL_DISASTER_WARNING' | 'PORT_EVACUATION_NOTICE' | 'HEALTH_SYSTEM_ALERT';
  headline: string;
  messageBody: string;
  affectedRegions: string[];
  broadcastChannels: ('SATELLITE_PUSH' | 'CELLULAR_CB' | 'VHF_RADIO' | 'APP_HUD_BANNER')[];
  isAcknowledgedByOfficer: boolean;
}

export interface MarineRescueDrone {
  id: string;
  droneName: string;
  droneModel: 'AeroSea MedEvac-X4' | 'HydroBuoy Rescue-V2' | 'OceanLifesaver Heavy-Duty' | string;
  batteryPercent: number;
  status: 'READY_STANDBY' | 'IN_FLIGHT_DISPATCHED' | 'PAYLOAD_DROPPED' | 'RETURNING_TO_BASE' | 'CHARGING';
  payloadType: string;
  maxSpeedKmh: number;
  flightRangeKm: number;
  currentLocation: { lat: number; lng: number; altitudeMeters: number };
  targetCoordinates: { lat: number; lng: number };
  estimatedFlightETA: string;
  cameraFeedActive?: boolean;
}

export interface GeoHazardSimulation {
  id: string;
  scenarioName: string;
  hazardType: 'TSUNAMI_MEGAWAVE' | 'SUBSEA_LANDSLIDE' | 'VOLCANIC_ASH_PLUME' | 'PORT_INUNDATION';
  intensityScale: number; // 1 to 10
  impactedRadiusKm: number;
  simulationStatus: 'IDLE' | 'RUNNING_SIMULATION' | 'COMPLETED';
  predictedInundationDepthMeters: number;
  affectedPopulationEst: number;
  recommendedEvacuationRoute: string;
  waveSpeedKmh: number;
}

export interface TsunamiEvacuationZone {
  id: string;
  zoneName: string;
  elevationMeters: number;
  isSafeZone: boolean;
  capacityMax: number;
  currentOccupancy: number;
  distanceFromShoreM: number;
  assemblyPointAddress: string;
  evacuationRouteDescription: string;
  coordinates: { lat: number; lng: number };
  hasHelipad: boolean;
  medicalFirstAidStation: boolean;
}

export interface EmergencyBroadcastLog {
  logId: string;
  timestamp: string;
  broadcastChannel: 'INMARSAT_SATELLITE' | 'VHF_RADIO_CH16' | 'CELLULAR_CB' | 'HUD_OVERLAY';
  transmitterStation: string;
  targetAudience: string;
  messageSummary: string;
  deliveryStatus: 'DELIVERED_100%' | 'PARTIAL_ACK' | 'TRANSMITTING';
  ackCount: number;
  checksumHash: string;
}


export interface VaccineBookingRecord {
  bookingId: string;
  patientName: string;
  passportOrId: string;
  phone: string;
  email: string;
  centreId: string;
  centreName: string;
  centreAddress: string;
  city: string;
  country: string;
  vaccineName: string;
  appointmentDate: string;
  appointmentSlot: string;
  consultationType: 'In-Clinic' | 'Express Drive-Thru' | 'Port / Airport On-Site';
  totalPriceUSD: number;
  insuranceApplied: boolean;
  paymentStatus: 'PAID_CONFIRMED' | 'PENDING_AT_CLINIC';
  bookingStatus: 'CONFIRMED' | 'COMPLETED' | 'CANCELLED';
  qrBookingCode: string;
  createdAt: string;
}

export interface WorldwideFisheriesPort {
  id: string;
  portName: string;
  cityName: string;
  country: string;
  countryFlag: string;
  continent: 'Asia' | 'Europe' | 'North America' | 'South America' | 'Africa' | 'Oceania' | 'Middle East' | 'Antarctica';
  oceanBasin: string;
  lat: number;
  lng: number;
  unLocode: string;
  annualCatchVolumeMT: number;
  annualSeafoodTradeUSD: number;
  registeredVesselsCount: number;
  coldStorageCapacityMT: number;
  primarySpecies: string[];
  processingPlantsCount: number;
  keyExportDestinations: string[];
  auctionType: 'Automated Digital Auction' | 'Live Open Cry Bidding' | 'Direct Processor Contract' | 'Cooperative Wholesale Market';
  sustainabilityCertifications: string[];
  facilities: string[];
  description: string;
}

export interface GlobalSeafoodMarketAndTrade {
  id: string;
  speciesName: string;
  scientificName: string;
  category: 'Pelagic Fish' | 'Demersal Fish' | 'Crustacean' | 'Mollusks & Cephalopods' | 'Aquaculture / Farmed' | 'Fishmeal & Oil';
  primaryExportingCountries: string[];
  primaryImportingCountries: string[];
  globalWholesalePricePerKgUSD: number;
  priceTrendPct30d: number;
  marketDemandLevel: 'Very High Demand' | 'High Demand' | 'Stable' | 'Moderate';
  primaryMarketingChannels: string[];
  seasonalPeakMonths: string;
  tariffAndTradeNotes: string;
  marketCapOrVolumeUSD: string;
}

export interface GlobalFisheriesTradeReport {
  id: string;
  reportTitle: string;
  reportingPeriod: string;
  regionScope: 'Global' | 'Asia-Pacific' | 'Europe & North Atlantic' | 'Americas (North & South)' | 'Africa & Indian Ocean' | 'Middle East & Red Sea';
  exportVolumeMT: number;
  exportValueUSD: number;
  importVolumeMT: number;
  importValueUSD: number;
  topExporters: { country: string; flag: string; sharePct: number; valueUSD: number }[];
  topImporters: { country: string; flag: string; sharePct: number; valueUSD: number }[];
  majorTradedSpecies: { species: string; volumeMT: number; avgPricePerKgUSD: number }[];
  iuuComplianceRating: 'Tier 1 (Fully Compliant)' | 'Tier 2 (Monitored)' | 'High Risk Warning';
  sustainabilityOverview: string;
  tradeTariffAndPolicyInsight: string;
}

export interface PortInventoryStock {
  id: string;
  portId: string;
  portName: string;
  cityName: string;
  country: string;
  countryFlag: string;
  unLocode: string;
  totalCapacityMT: number;
  currentOccupiedMT: number;
  utilizationPct: number;
  frozenStockMT: number;
  freshChilledStockMT: number;
  reeferContainersOnSite: number;
  incomingShipmentsMT: number;
  outgoingShipmentsMT: number;
  speciesBreakdown: { species: string; volumeMT: number; tempStorageC: number; expiryAlertDays: number }[];
  lastAuditTimestamp: string;
  warehouseStatus: 'OPERATIONAL_NORMAL' | 'NEAR_CAPACITY_ALERT' | 'HIGH_DEMAND_VACANCY' | 'MAINTENANCE_FREEZE';
}

export interface AutomatedTradeReportConfig {
  id: string;
  reportName: string;
  frequency: 'Daily Market Intelligence' | 'Weekly FAO Dispatches' | 'Monthly IMO Trade Balance' | 'Real-Time Price Spike Alert';
  regionScope: string;
  autoRecipients: string[];
  lastGeneratedTimestamp: string;
  nextScheduledRun: string;
  status: 'ACTIVE' | 'PAUSED';
  generatedReportCount: number;
  deliveryChannel: 'Email API + Webhook' | 'Satellite Maritime Dispatch' | 'B2B FTP / Cloud Sync';
}

export interface GlobalMarketSyncFeed {
  exchangeName: string;
  location: string;
  countryFlag: string;
  status: 'ONLINE_LIVE_FEED' | 'AUCTION_IN_PROGRESS' | 'SYNCED_RECENTLY';
  lastSyncedAt: string;
  latencyMs: number;
  activeListingsCount: number;
  primaryTradedCommodity: string;
}

export interface TradeComplianceCheckRequest {
  consignmentId: string;
  exporterCountry: string;
  importerCountry: string;
  speciesName: string;
  hsCode: string;
  vesselNameIMO: string;
  catchAreaFAO: string;
  quantityMT: number;
  declaringValueUSD: number;
  hasSimpApproval: boolean;
  hasEuCatchCert: boolean;
  hasCitesPermit: boolean;
  hasHealthCertificate: boolean;
  catchDate: string;
}

export interface TradeComplianceResult {
  overallRiskLevel: 'LOW_RISK_APPROVED' | 'MODERATE_RISK_AUDIT' | 'HIGH_RISK_REJECTED';
  complianceScorePct: number;
  iuuStatus: string;
  simpStatus: string;
  euCertStatus: string;
  tariffEstimatePct: number;
  estimatedTariffUSD: number;
  spsHealthCheck: string;
  flaggedRisks: string[];
  recommendedActions: string[];
  auditRefCode: string;
  generatedAt: string;
}

export interface B2bSeafoodContract {
  contractId: string;
  sellerCompany: string;
  sellerCountry: string;
  buyerCompany: string;
  buyerCountry: string;
  incoterm: 'FOB (Free on Board)' | 'CIF (Cost, Insurance & Freight)' | 'CFR (Cost & Freight)' | 'DDP (Delivered Duty Paid)';
  portOfLoading: string;
  portOfDischarge: string;
  speciesGrade: string;
  processingFormat: 'IQF Fillets' | 'Super-Frozen (-60°C) Whole' | 'H&G Frozen Blocks' | 'Fresh Chilled Whole' | 'Refined Fishmeal Drums';
  quantityMT: number;
  pricePerKgUSD: number;
  totalContractValueUSD: number;
  storageTempReqC: number;
  shipmentWindowStart: string;
  shipmentWindowEnd: string;
  paymentTerms: 'Letter of Credit (L/C 100% Sight)' | 'Telegraphic Transfer (T/T 30% Advance / 70% BL)' | 'CAD (Cash Against Documents)';
  governingLaw: string;
  createdDate: string;
  status: 'DRAFT' | 'EXECUTED_PENDING_SHIPMENT' | 'VERIFIED_CUSTOMS';
}






