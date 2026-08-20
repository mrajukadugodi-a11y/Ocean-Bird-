import React, { useState, useEffect } from 'react';
import {
  Plane,
  PlaneTakeoff,
  PlaneLanding,
  Search,
  Calendar,
  User,
  Users,
  MapPin,
  Clock,
  Ticket,
  QrCode,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Download,
  Filter,
  ArrowRight,
  Zap,
  Globe,
  Radio,
  Luggage,
  ShieldCheck,
  Building2,
  Navigation,
  Compass,
  Maximize2,
  Bell,
  BellRing,
  Volume2,
  VolumeX,
  CreditCard,
  Printer,
  Sparkles,
  ArrowUpRight,
  Plus
} from 'lucide-react';
import {
  cacheFlightBooking,
  cacheTrackedFlightStatus,
  cacheFlightSearchResult,
  useOfflineFlightStatus
} from '../utils/offlineFlightCache';

// ALL INDIAN CITIES & AIRPORTS DATASET (Comprehensive Domestic + Major Hubs)
export interface AirportLocation {
  code: string;
  city: string;
  name: string;
  state: string;
  region: 'North' | 'South' | 'East' | 'West' | 'Central' | 'Northeast' | 'Islands' | 'International';
  isInternational: boolean;
}

export const ALL_INDIAN_AIRPORTS: AirportLocation[] = [
  // West India
  { code: 'BOM', city: 'Mumbai', name: 'Chhatrapati Shivaji Maharaj International Airport', state: 'Maharashtra', region: 'West', isInternational: true },
  { code: 'PNQ', city: 'Pune', name: 'Pune International Airport (Lohegaon)', state: 'Maharashtra', region: 'West', isInternational: true },
  { code: 'NAG', city: 'Nagpur', name: 'Dr. Babasaheb Ambedkar International Airport', state: 'Maharashtra', region: 'West', isInternational: true },
  { code: 'GOI', city: 'Goa (Dabolim)', name: 'Goa International Airport', state: 'Goa', region: 'West', isInternational: true },
  { code: 'GOX', city: 'Goa (Mopa)', name: 'Manohar International Airport', state: 'Goa', region: 'West', isInternational: true },
  { code: 'AMD', city: 'Ahmedabad', name: 'Sardar Vallabhbhai Patel International Airport', state: 'Gujarat', region: 'West', isInternational: true },
  { code: 'STV', city: 'Surat', name: 'Surat International Airport', state: 'Gujarat', region: 'West', isInternational: true },
  { code: 'BDQ', city: 'Vadodara', name: 'Vadodara Airport (Harni)', state: 'Gujarat', region: 'West', isInternational: false },
  { code: 'RAJ', city: 'Rajkot', name: 'Rajkot International Airport (Hirasar)', state: 'Gujarat', region: 'West', isInternational: true },
  { code: 'SAG', city: 'Shirdi', name: 'Shirdi Airport', state: 'Maharashtra', region: 'West', isInternational: false },
  { code: 'KLH', city: 'Kolhapur', name: 'Chhatrapati Rajaram Maharaj Airport', state: 'Maharashtra', region: 'West', isInternational: false },
  { code: 'ISK', city: 'Nashik', name: 'Nashik Airport (Ozar)', state: 'Maharashtra', region: 'West', isInternational: false },
  { code: 'CWK', city: 'Sindhudurg', name: 'Sindhudurg Airport (Chipi)', state: 'Maharashtra', region: 'West', isInternational: false },

  // North India
  { code: 'DEL', city: 'New Delhi', name: 'Indira Gandhi International Airport', state: 'Delhi NCR', region: 'North', isInternational: true },
  { code: 'JAI', city: 'Jaipur', name: 'Jaipur International Airport', state: 'Rajasthan', region: 'North', isInternational: true },
  { code: 'UDR', city: 'Udaipur', name: 'Maharana Pratap Airport (Dabok)', state: 'Rajasthan', region: 'North', isInternational: false },
  { code: 'JDH', city: 'Jodhpur', name: 'Jodhpur Airport', state: 'Rajasthan', region: 'North', isInternational: false },
  { code: 'JSA', city: 'Jaisalmer', name: 'Jaisalmer Airport', state: 'Rajasthan', region: 'North', isInternational: false },
  { code: 'LKO', city: 'Lucknow', name: 'Chaudhary Charan Singh International Airport', state: 'Uttar Pradesh', region: 'North', isInternational: true },
  { code: 'VNS', city: 'Varanasi', name: 'Lal Bahadur Shastri International Airport', state: 'Uttar Pradesh', region: 'North', isInternational: true },
  { code: 'AYJ', city: 'Ayodhya', name: 'Maharishi Valmiki International Airport', state: 'Uttar Pradesh', region: 'North', isInternational: true },
  { code: 'IXD', city: 'Prayagraj / Allahabad', name: 'Prayagraj Airport (Bamrauli)', state: 'Uttar Pradesh', region: 'North', isInternational: false },
  { code: 'GOP', city: 'Gorakhpur', name: 'Gorakhpur Airport', state: 'Uttar Pradesh', region: 'North', isInternational: false },
  { code: 'ATQ', city: 'Amritsar', name: 'Sri Guru Ram Dass Jee International Airport', state: 'Punjab', region: 'North', isInternational: true },
  { code: 'IXC', city: 'Chandigarh', name: 'Shaheed Bhagat Singh International Airport', state: 'Punjab / Haryana', region: 'North', isInternational: true },
  { code: 'SXR', city: 'Srinagar', name: 'Sheikh ul-Alam International Airport', state: 'Jammu & Kashmir', region: 'North', isInternational: true },
  { code: 'IXJ', city: 'Jammu', name: 'Jammu Airport (Satwari)', state: 'Jammu & Kashmir', region: 'North', isInternational: false },
  { code: 'IXL', city: 'Leh', name: 'Kushok Bakula Rimpoche Airport', state: 'Ladakh', region: 'North', isInternational: false },
  { code: 'DED', city: 'Dehradun', name: 'Jolly Grant Airport', state: 'Uttarakhand', region: 'North', isInternational: false },
  { code: 'SLV', city: 'Shimla', name: 'Shimla Airport (Jubarhatti)', state: 'Himachal Pradesh', region: 'North', isInternational: false },

  // South India
  { code: 'BLR', city: 'Bengaluru', name: 'Kempegowda International Airport', state: 'Karnataka', region: 'South', isInternational: true },
  { code: 'HYD', city: 'Hyderabad', name: 'Rajiv Gandhi International Airport', state: 'Telangana', region: 'South', isInternational: true },
  { code: 'MAA', city: 'Chennai', name: 'Chennai International Airport', state: 'Tamil Nadu', region: 'South', isInternational: true },
  { code: 'COK', city: 'Kochi / Cochin', name: 'Cochin International Airport (Nedumbassery)', state: 'Kerala', region: 'South', isInternational: true },
  { code: 'TRV', city: 'Thiruvananthapuram', name: 'Trivandrum International Airport', state: 'Kerala', region: 'South', isInternational: true },
  { code: 'CCJ', city: 'Kozhikode / Calicut', name: 'Calicut International Airport (Karipur)', state: 'Kerala', region: 'South', isInternational: true },
  { code: 'CNN', city: 'Kannur', name: 'Kannur International Airport', state: 'Kerala', region: 'South', isInternational: true },
  { code: 'CJB', city: 'Coimbatore', name: 'Coimbatore International Airport', state: 'Tamil Nadu', region: 'South', isInternational: true },
  { code: 'IXM', city: 'Madurai', name: 'Madurai Airport', state: 'Tamil Nadu', region: 'South', isInternational: true },
  { code: 'TRZ', city: 'Tiruchirappalli', name: 'Tiruchirappalli International Airport', state: 'Tamil Nadu', region: 'South', isInternational: true },
  { code: 'IXE', city: 'Mangaluru / Mangalore', name: 'Mangaluru International Airport', state: 'Karnataka', region: 'South', isInternational: true },
  { code: 'MYQ', city: 'Mysuru / Mysore', name: 'Mysore Airport (Mandakalli)', state: 'Karnataka', region: 'South', isInternational: false },
  { code: 'HBX', city: 'Hubballi / Hubli', name: 'Hubballi Airport', state: 'Karnataka', region: 'South', isInternational: false },
  { code: 'VTZ', city: 'Visakhapatnam', name: 'Visakhapatnam International Airport', state: 'Andhra Pradesh', region: 'South', isInternational: true },
  { code: 'VGA', city: 'Vijayawada', name: 'Vijayawada International Airport (Gannavaram)', state: 'Andhra Pradesh', region: 'South', isInternational: true },
  { code: 'TIR', city: 'Tirupati', name: 'Tirupati Airport (Renigunta)', state: 'Andhra Pradesh', region: 'South', isInternational: false },
  { code: 'PNY', city: 'Puducherry', name: 'Puducherry Airport', state: 'Puducherry', region: 'South', isInternational: false },

  // East & Central India
  { code: 'CCU', city: 'Kolkata', name: 'Netaji Subhash Chandra Bose International Airport', state: 'West Bengal', region: 'East', isInternational: true },
  { code: 'IXB', city: 'Bagdogra / Siliguri', name: 'Bagdogra International Airport', state: 'West Bengal', region: 'East', isInternational: true },
  { code: 'PAT', city: 'Patna', name: 'Jayprakash Narayan International Airport', state: 'Bihar', region: 'East', isInternational: true },
  { code: 'GAY', city: 'Gaya', name: 'Gaya Airport', state: 'Bihar', region: 'East', isInternational: true },
  { code: 'IXR', city: 'Ranchi', name: 'Birsa Munda Airport', state: 'Jharkhand', region: 'East', isInternational: false },
  { code: 'BBI', city: 'Bhubaneswar', name: 'Biju Patnaik International Airport', state: 'Odisha', region: 'East', isInternational: true },
  { code: 'IDR', city: 'Indore', name: 'Devi Ahilya Bai Holkar Airport', state: 'Madhya Pradesh', region: 'Central', isInternational: true },
  { code: 'BHO', city: 'Bhopal', name: 'Raja Bhoj Airport', state: 'Madhya Pradesh', region: 'Central', isInternational: false },
  { code: 'GWL', city: 'Gwalior', name: 'Rajmata Vijaya Raje Scindia Airport', state: 'Madhya Pradesh', region: 'Central', isInternational: false },
  { code: 'RPR', city: 'Raipur', name: 'Swami Vivekananda Airport', state: 'Chhattisgarh', region: 'Central', isInternational: false },

  // Northeast & Islands India
  { code: 'GAU', city: 'Guwahati', name: 'Lokpriya Gopinath Bordoloi International Airport', state: 'Assam', region: 'Northeast', isInternational: true },
  { code: 'IXA', city: 'Agartala', name: 'Maharaja Bir Bikram Airport', state: 'Tripura', region: 'Northeast', isInternational: false },
  { code: 'IMF', city: 'Imphal', name: 'Bir Tikendrajit International Airport', state: 'Manipur', region: 'Northeast', isInternational: true },
  { code: 'SHL', city: 'Shillong', name: 'Shillong Airport (Umroi)', state: 'Meghalaya', region: 'Northeast', isInternational: false },
  { code: 'DBR', city: 'Dibrugarh', name: 'Dibrugarh Airport (Mohanbari)', state: 'Assam', region: 'Northeast', isInternational: false },
  { code: 'PYG', city: 'Pakyong / Gangtok', name: 'Pakyong Airport', state: 'Sikkim', region: 'Northeast', isInternational: false },
  { code: 'IXZ', city: 'Port Blair', name: 'Veer Savarkar International Airport', state: 'Andaman & Nicobar', region: 'Islands', isInternational: true },
  { code: 'AGX', city: 'Agatti Island', name: 'Agatti Airport', state: 'Lakshadweep', region: 'Islands', isInternational: false }
];

// INTERNATIONAL DESTINATIONS CONNECTED WORLDWIDE
export const INTERNATIONAL_AIRPORTS: AirportLocation[] = [
  { code: 'MLE', city: 'Malé', name: 'Velana International Airport', state: 'Maldives', region: 'International', isInternational: true },
  { code: 'DXB', city: 'Dubai', name: 'Dubai International Airport', state: 'United Arab Emirates', region: 'International', isInternational: true },
  { code: 'AUH', city: 'Abu Dhabi', name: 'Zayed International Airport', state: 'United Arab Emirates', region: 'International', isInternational: true },
  { code: 'DOH', city: 'Doha', name: 'Hamad International Airport', state: 'Qatar', region: 'International', isInternational: true },
  { code: 'SIN', city: 'Singapore', name: 'Singapore Changi Airport', state: 'Singapore', region: 'International', isInternational: true },
  { code: 'BKK', city: 'Bangkok', name: 'Suvarnabhumi Airport', state: 'Thailand', region: 'International', isInternational: true },
  { code: 'KUL', city: 'Kuala Lumpur', name: 'Kuala Lumpur International Airport', state: 'Malaysia', region: 'International', isInternational: true },
  { code: 'HKG', city: 'Hong Kong', name: 'Hong Kong International Airport', state: 'Hong Kong SAR', region: 'International', isInternational: true },
  { code: 'HND', city: 'Tokyo (Haneda)', name: 'Haneda Airport', state: 'Japan', region: 'International', isInternational: true },
  { code: 'ICN', city: 'Seoul (Incheon)', name: 'Incheon International Airport', state: 'South Korea', region: 'International', isInternational: true },
  { code: 'CMB', city: 'Colombo', name: 'Bandaranaike International Airport', state: 'Sri Lanka', region: 'International', isInternational: true },
  { code: 'KTM', city: 'Kathmandu', name: 'Tribhuvan International Airport', state: 'Nepal', region: 'International', isInternational: true },
  { code: 'DAC', city: 'Dhaka', name: 'Hazrat Shahjalal International Airport', state: 'Bangladesh', region: 'International', isInternational: true },
  { code: 'MCT', city: 'Muscat', name: 'Muscat International Airport', state: 'Oman', region: 'International', isInternational: true },
  { code: 'LHR', city: 'London (Heathrow)', name: 'Heathrow Airport', state: 'United Kingdom', region: 'International', isInternational: true },
  { code: 'CDG', city: 'Paris (Charles de Gaulle)', name: 'Charles de Gaulle Airport', state: 'France', region: 'International', isInternational: true },
  { code: 'FRA', city: 'Frankfurt', name: 'Frankfurt Airport', state: 'Germany', region: 'International', isInternational: true },
  { code: 'AMS', city: 'Amsterdam', name: 'Schiphol Airport', state: 'Netherlands', region: 'International', isInternational: true },
  { code: 'ZRH', city: 'Zurich', name: 'Zurich Airport', state: 'Switzerland', region: 'International', isInternational: true },
  { code: 'JFK', city: 'New York (JFK)', name: 'John F. Kennedy International Airport', state: 'United States', region: 'International', isInternational: true },
  { code: 'LAX', city: 'Los Angeles (LAX)', name: 'Los Angeles International Airport', state: 'United States', region: 'International', isInternational: true },
  { code: 'YVR', city: 'Vancouver', name: 'Vancouver International Airport', state: 'Canada', region: 'International', isInternational: true },
  { code: 'GRU', city: 'São Paulo', name: 'Guarulhos International Airport', state: 'Brazil', region: 'International', isInternational: true },
  { code: 'JNB', city: 'Johannesburg', name: 'O. R. Tambo International Airport', state: 'South Africa', region: 'International', isInternational: true },
  { code: 'CAI', city: 'Cairo', name: 'Cairo International Airport', state: 'Egypt', region: 'International', isInternational: true },
  { code: 'SYD', city: 'Sydney', name: 'Sydney Kingsford Smith Airport', state: 'Australia', region: 'International', isInternational: true },
  { code: 'AKL', city: 'Auckland', name: 'Auckland Airport', state: 'New Zealand', region: 'International', isInternational: true }
];

// SAMPLE LIVE TRACKED FLIGHTS DATASET
export interface TrackedFlightDetail {
  flightNumber: string;
  airline: string;
  aircraftType: string;
  originCode: string;
  originCity: string;
  destCode: string;
  destCity: string;
  departureTime: string;
  estimatedArrival: string;
  status: 'IN AIR' | 'ON TIME' | 'BOARDING' | 'DELAYED' | 'LANDED' | 'GATE CHANGE';
  delayMinutes: number;
  altitudeFt: number;
  speedKnots: number;
  progressPercent: number;
  lat: number;
  lng: number;
  headingDeg: number;
  gateOrigin: string;
  gateDest: string;
  baggageCarousel: string;
  serviceType: 'Domestic India' | 'International';
  notifications: string[];
}

export const INITIAL_TRACKED_FLIGHTS: TrackedFlightDetail[] = [
  {
    flightNumber: '6E-204',
    airline: 'IndiGo Airways',
    aircraftType: 'Airbus A321neo',
    originCode: 'BOM',
    originCity: 'Mumbai',
    destCode: 'DEL',
    destCity: 'New Delhi',
    departureTime: '02:15 PM',
    estimatedArrival: '04:25 PM',
    status: 'IN AIR',
    delayMinutes: 0,
    altitudeFt: 35000,
    speedKnots: 470,
    progressPercent: 68,
    lat: 23.12,
    lng: 75.8,
    headingDeg: 15,
    gateOrigin: 'T2 - Gate 42',
    gateDest: 'T3 - Gate 18B',
    baggageCarousel: 'Carousel 06',
    serviceType: 'Domestic India',
    notifications: ['Departed on time from Mumbai T2', 'Cruising altitude 35,000 ft reached', 'Expected on time landing in New Delhi']
  },
  {
    flightNumber: 'AI-102',
    airline: 'Air India Express',
    aircraftType: 'Boeing 787-9 Dreamliner',
    originCode: 'BOM',
    originCity: 'Mumbai',
    destCode: 'MLE',
    destCity: 'Malé, Maldives',
    departureTime: '08:30 AM',
    estimatedArrival: '11:15 AM',
    status: 'ON TIME',
    delayMinutes: 0,
    altitudeFt: 38000,
    speedKnots: 495,
    progressPercent: 88,
    lat: 5.2,
    lng: 73.1,
    headingDeg: 185,
    gateOrigin: 'T2 - Gate B14',
    gateDest: 'Gate 03',
    baggageCarousel: 'Carousel 02',
    serviceType: 'International',
    notifications: ['Gate assignment confirmed: T2-B14', 'Descending towards Velana International Airport']
  },
  {
    flightNumber: 'UK-815',
    airline: 'Vistara Airlines',
    aircraftType: 'Airbus A320neo',
    originCode: 'DEL',
    originCity: 'New Delhi',
    destCode: 'BLR',
    destCity: 'Bengaluru',
    departureTime: '05:40 PM',
    estimatedArrival: '08:25 PM',
    status: 'IN AIR',
    delayMinutes: 12,
    altitudeFt: 33000,
    speedKnots: 450,
    progressPercent: 42,
    lat: 18.5,
    lng: 77.2,
    headingDeg: 175,
    gateOrigin: 'T3 - Gate 21',
    gateDest: 'T2 - Gate 104',
    baggageCarousel: 'Carousel 08',
    serviceType: 'Domestic India',
    notifications: ['12 min weather delay at departure', 'Direct route navigation approved over Hyderabad FIR']
  },
  {
    flightNumber: 'QP-1102',
    airline: 'Akasa Air',
    aircraftType: 'Boeing 737 MAX 8',
    originCode: 'BLR',
    originCity: 'Bengaluru',
    destCode: 'COK',
    destCity: 'Kochi',
    departureTime: '06:10 PM',
    estimatedArrival: '07:15 PM',
    status: 'BOARDING',
    delayMinutes: 0,
    altitudeFt: 0,
    speedKnots: 0,
    progressPercent: 5,
    lat: 13.19,
    lng: 77.7,
    headingDeg: 210,
    gateOrigin: 'T1 - Gate 12',
    gateDest: 'Gate 05',
    baggageCarousel: 'Carousel 03',
    serviceType: 'Domestic India',
    notifications: ['Final boarding call initiated at Gate 12']
  },
  {
    flightNumber: 'IX-342',
    airline: 'Air India Express',
    aircraftType: 'Boeing 737-800',
    originCode: 'CCU',
    originCity: 'Kolkata',
    destCode: 'IXZ',
    destCity: 'Port Blair, Andaman',
    departureTime: '10:00 AM',
    estimatedArrival: '12:20 PM',
    status: 'IN AIR',
    delayMinutes: 0,
    altitudeFt: 36000,
    speedKnots: 480,
    progressPercent: 75,
    lat: 14.8,
    lng: 91.2,
    headingDeg: 160,
    gateOrigin: 'Gate 08',
    gateDest: 'Gate 02',
    baggageCarousel: 'Carousel 01',
    serviceType: 'Domestic India',
    notifications: ['Cruising over Bay of Bengal', 'Clear weather at Veer Savarkar International Airport']
  },
  {
    flightNumber: '9I-805',
    airline: 'Alliance Air Island Hopper',
    aircraftType: 'ATR 72-600',
    originCode: 'COK',
    originCity: 'Kochi',
    destCode: 'AGX',
    destCity: 'Agatti, Lakshadweep',
    departureTime: '09:15 AM',
    estimatedArrival: '10:40 AM',
    status: 'LANDED',
    delayMinutes: 0,
    altitudeFt: 0,
    speedKnots: 0,
    progressPercent: 100,
    lat: 10.82,
    lng: 72.17,
    headingDeg: 270,
    gateOrigin: 'Gate 02',
    gateDest: 'Airstrip Stand 01',
    baggageCarousel: 'Main Arrival Hall',
    serviceType: 'Domestic India',
    notifications: ['Landed safely at Agatti Island runway', 'Baggage claim active in main hall']
  },
  {
    flightNumber: 'EK-501',
    airline: 'Emirates Airways',
    aircraftType: 'Boeing 777-300ER',
    originCode: 'BOM',
    originCity: 'Mumbai',
    destCode: 'DXB',
    destCity: 'Dubai',
    departureTime: '04:30 AM',
    estimatedArrival: '06:15 AM',
    status: 'IN AIR',
    delayMinutes: 0,
    altitudeFt: 39000,
    speedKnots: 510,
    progressPercent: 55,
    lat: 22.4,
    lng: 63.5,
    headingDeg: 285,
    gateOrigin: 'T2 - Gate 70',
    gateDest: 'T3 - Gate B22',
    baggageCarousel: 'Carousel 14',
    serviceType: 'International',
    notifications: ['Cruising over Arabian Sea', 'On schedule for Dubai International Airport']
  }
];

export const AirwaysBookingAndFlightTracker: React.FC = () => {
  const { isOnline, swActive, reloadOfflineData } = useOfflineFlightStatus();

  // Active Main Sub-Tab: 'booking' or 'tracker' or 'airports-db'
  const [activeTab, setActiveTab] = useState<'booking' | 'tracker' | 'airports-db'>('booking');

  // BOOKING ENGINE STATE
  const [flightServiceType, setFlightServiceType] = useState<'Domestic India' | 'International'>('Domestic India');
  const [tripType, setTripType] = useState<'One Way' | 'Round Trip'>('One Way');

  const [originCity, setOriginCity] = useState<string>('BOM - Mumbai');
  const [destCity, setDestCity] = useState<string>('DEL - New Delhi');
  const [departDate, setDepartDate] = useState<string>('2026-08-15');
  const [returnDate, setReturnDate] = useState<string>('2026-08-22');
  const [passengersCount, setPassengersCount] = useState<number>(1);
  const [cabinClass, setCabinClass] = useState<'Economy' | 'Premium Economy' | 'Business Class' | 'First Class'>('Economy');
  const [passengerName, setPassengerName] = useState<string>('Capt. Rajesh Kumar');

  // Search Results State
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<Array<{
    flightNo: string;
    airline: string;
    depTime: string;
    arrTime: string;
    duration: string;
    priceINR: number;
    seatsLeft: number;
    type: string;
  }>>([]);

  // Issued Boarding Pass Modal
  const [issuedPass, setIssuedPass] = useState<any | null>(null);

  // FLIGHT TRACKER STATE
  const [trackedFlightsList, setTrackedFlightsList] = useState<TrackedFlightDetail[]>(INITIAL_TRACKED_FLIGHTS);
  const [searchFlightNo, setSearchFlightNo] = useState<string>('');
  const [selectedFlightDetail, setSelectedFlightDetail] = useState<TrackedFlightDetail | null>(INITIAL_TRACKED_FLIGHTS[0]);
  const [selectedRegionFilter, setSelectedRegionFilter] = useState<string>('ALL');

  // Live Radar Auto Simulation Interval
  useEffect(() => {
    const timer = setInterval(() => {
      setTrackedFlightsList((prev) =>
        prev.map((f) => {
          if (f.status === 'IN AIR' && f.progressPercent < 98) {
            return {
              ...f,
              progressPercent: Math.min(100, f.progressPercent + 1),
              altitudeFt: Math.min(39000, f.altitudeFt + Math.floor(Math.random() * 50 - 25)),
              speedKnots: Math.min(520, f.speedKnots + Math.floor(Math.random() * 6 - 3))
            };
          }
          return f;
        })
      );
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // Filter Airports dropdowns
  const availableOrigins = flightServiceType === 'Domestic India' ? ALL_INDIAN_AIRPORTS : ALL_INDIAN_AIRPORTS;
  const availableDests = flightServiceType === 'Domestic India' ? ALL_INDIAN_AIRPORTS : [...INTERNATIONAL_AIRPORTS, ...ALL_INDIAN_AIRPORTS];

  // Handle Flight Search
  const handleExecuteSearch = () => {
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);

      const generated = [
        {
          flightNo: `${flightServiceType === 'Domestic India' ? '6E' : 'AI'}-${Math.floor(100 + Math.random() * 800)}`,
          airline: flightServiceType === 'Domestic India' ? 'IndiGo Airways' : 'Air India Express',
          depTime: '08:30 AM',
          arrTime: '11:00 AM',
          duration: '2h 30m',
          priceINR: flightServiceType === 'Domestic India' ? 4850 : 18500,
          seatsLeft: 7,
          type: flightServiceType
        },
        {
          flightNo: `${flightServiceType === 'Domestic India' ? 'UK' : 'EK'}-${Math.floor(100 + Math.random() * 800)}`,
          airline: flightServiceType === 'Domestic India' ? 'Vistara Airlines' : 'Emirates Airways',
          depTime: '01:15 PM',
          arrTime: '03:45 PM',
          duration: '2h 30m',
          priceINR: flightServiceType === 'Domestic India' ? 6200 : 28900,
          seatsLeft: 3,
          type: flightServiceType
        },
        {
          flightNo: `${flightServiceType === 'Domestic India' ? 'QP' : 'SQ'}-${Math.floor(100 + Math.random() * 800)}`,
          airline: flightServiceType === 'Domestic India' ? 'Akasa Air' : 'Singapore Airlines',
          depTime: '06:00 PM',
          arrTime: '08:30 PM',
          duration: '2h 30m',
          priceINR: flightServiceType === 'Domestic India' ? 4400 : 34500,
          seatsLeft: 12,
          type: flightServiceType
        }
      ];

      setSearchResults(generated);

      // Cache search to Service Worker
      cacheFlightSearchResult({
        id: `SRCH-${Date.now()}`,
        route: `${originCity} ✈️ ${destCity}`,
        date: departDate,
        passengerCount: passengersCount,
        type: flightServiceType,
        cachedFlightsCount: generated.length,
        flights: generated.map((g) => ({
          flightNo: g.flightNo,
          airline: g.airline,
          priceUSD: Math.round(g.priceINR / 83),
          dep: g.depTime,
          arr: g.arrTime,
          seats: `${g.seatsLeft} Seats Left`
        }))
      });
      reloadOfflineData();
    }, 600);
  };

  // Handle Instant Ticket Booking & Boarding Pass Issuance
  const handleConfirmTicketBooking = async (flightItem: any) => {
    const pnrGenerated = `AIRWAYS-IN-${Math.floor(100000 + Math.random() * 900000)}`;
    const seatGenerated = `${Math.floor(1 + Math.random() * 25)}${['A', 'B', 'C', 'D', 'E', 'F'][Math.floor(Math.random() * 6)]}`;
    const gateGenerated = `G-${Math.floor(1 + Math.random() * 20)}`;

    const newTicket = {
      pnr: pnrGenerated,
      passengerName,
      flightNumber: flightItem.flightNo,
      airline: flightItem.airline,
      flightType: flightServiceType,
      origin: originCity,
      destination: destCity,
      departureTime: `${departDate} ${flightItem.depTime}`,
      arrivalTime: `${departDate} ${flightItem.arrTime}`,
      seatNumber: `${seatGenerated} (${cabinClass})`,
      cabinClass,
      gate: gateGenerated,
      status: 'CONFIRMED - BOARDING PASS ISSUED',
      baggageAllowance: flightServiceType === 'Domestic India' ? '15 KG Check-in + 7 KG Cabin' : '30 KG Check-in + 7 KG Cabin',
      ticketAmountUSD: Math.round(flightItem.priceINR / 83),
      ticketAmountINR: flightItem.priceINR
    };

    // Cache to Service Worker
    await cacheFlightBooking(newTicket);
    await reloadOfflineData();

    setIssuedPass(newTicket);
  };

  // Filter Tracked Flights
  const filteredTrackedList = trackedFlightsList.filter((f) => {
    const matchQuery = `${f.flightNumber} ${f.airline} ${f.originCity} ${f.destCity}`
      .toLowerCase()
      .includes(searchFlightNo.toLowerCase());

    if (selectedRegionFilter === 'DOMESTIC') return matchQuery && f.serviceType === 'Domestic India';
    if (selectedRegionFilter === 'INTERNATIONAL') return matchQuery && f.serviceType === 'International';
    return matchQuery;
  });

  return (
    <div id="airways-booking-flight-tracker" className="space-y-6 font-mono text-slate-100">
      {/* Top Banner */}
      <div className="bg-slate-900 border border-sky-500/40 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center space-x-2 text-sky-400 font-bold text-xs uppercase tracking-widest mb-1">
              <Zap className="w-4 h-4 text-sky-400 animate-pulse" />
              <span>INDIAN DOMESTIC & INTERNATIONAL AIRWAYS HUB</span>
            </div>
            <h2 className="text-2xl font-black text-white tracking-tight flex items-center space-x-2">
              <Plane className="w-7 h-7 text-sky-400" />
              <span>Airways Flight Booking & Live Radar Flight Tracker</span>
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-3xl font-sans">
              Book domestic flights across all Indian cities & international routes, track real-time flight position radar, gate assignment, and receive Service Worker offline cached e-tickets.
            </p>
          </div>

          <div className="flex items-center space-x-2 shrink-0 overflow-x-auto pb-1 lg:pb-0">
            <button
              onClick={() => setActiveTab('booking')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 ${
                activeTab === 'booking'
                  ? 'bg-sky-500 text-slate-950 font-black shadow-lg shadow-sky-500/20'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              <Ticket className="w-4 h-4" />
              <span>FLIGHT BOOKING ENGINE</span>
            </button>

            <button
              onClick={() => setActiveTab('tracker')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 ${
                activeTab === 'tracker'
                  ? 'bg-sky-500 text-slate-950 font-black shadow-lg shadow-sky-500/20'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
              <span>LIVE FLIGHT RADAR TRACKER</span>
            </button>

            <button
              onClick={() => setActiveTab('airports-db')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 ${
                activeTab === 'airports-db'
                  ? 'bg-sky-500 text-slate-950 font-black shadow-lg shadow-sky-500/20'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>ALL INDIA AIRPORTS ({ALL_INDIAN_AIRPORTS.length})</span>
            </button>
          </div>
        </div>
      </div>

      {/* TAB 1: FLIGHT BOOKING ENGINE */}
      {activeTab === 'booking' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setFlightServiceType('Domestic India')}
                  className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all ${
                    flightServiceType === 'Domestic India'
                      ? 'bg-sky-500 text-slate-950 shadow-md'
                      : 'bg-slate-950 text-slate-400 border border-slate-800'
                  }`}
                >
                  🇮🇳 INDIAN DOMESTIC FLIGHTS
                </button>

                <button
                  onClick={() => setFlightServiceType('International')}
                  className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all ${
                    flightServiceType === 'International'
                      ? 'bg-sky-500 text-slate-950 shadow-md'
                      : 'bg-slate-950 text-slate-400 border border-slate-800'
                  }`}
                >
                  ✈️ INTERNATIONAL FLIGHTS
                </button>
              </div>

              <div className="flex items-center space-x-3 text-xs">
                <label className="flex items-center space-x-1 cursor-pointer">
                  <input
                    type="radio"
                    name="triptype"
                    checked={tripType === 'One Way'}
                    onChange={() => setTripType('One Way')}
                    className="accent-sky-500"
                  />
                  <span>One Way</span>
                </label>
                <label className="flex items-center space-x-1 cursor-pointer">
                  <input
                    type="radio"
                    name="triptype"
                    checked={tripType === 'Round Trip'}
                    onChange={() => setTripType('Round Trip')}
                    className="accent-sky-500"
                  />
                  <span>Round Trip</span>
                </label>
              </div>
            </div>

            {/* Form Inputs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
              <div>
                <label className="text-slate-400 block mb-1 text-[10px] font-bold">FROM (ORIGIN AIRPORT)</label>
                <select
                  value={originCity}
                  onChange={(e) => setOriginCity(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:border-sky-500"
                >
                  {availableOrigins.map((ap) => (
                    <option key={ap.code} value={`${ap.code} - ${ap.city}`}>
                      {ap.code} - {ap.city} ({ap.name})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-slate-400 block mb-1 text-[10px] font-bold">TO (DESTINATION AIRPORT)</label>
                <select
                  value={destCity}
                  onChange={(e) => setDestCity(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:border-sky-500"
                >
                  {availableDests.map((ap) => (
                    <option key={ap.code} value={`${ap.code} - ${ap.city}`}>
                      {ap.code} - {ap.city} ({ap.name})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-slate-400 block mb-1 text-[10px] font-bold">DEPARTURE DATE</label>
                <input
                  type="date"
                  value={departDate}
                  onChange={(e) => setDepartDate(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:border-sky-500"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1 text-[10px] font-bold">CABIN CLASS</label>
                <select
                  value={cabinClass}
                  onChange={(e) => setCabinClass(e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:border-sky-500"
                >
                  <option value="Economy">Economy Class</option>
                  <option value="Premium Economy">Premium Economy</option>
                  <option value="Business Class">Business Class</option>
                  <option value="First Class">First Class</option>
                </select>
              </div>

              <div>
                <label className="text-slate-400 block mb-1 text-[10px] font-bold">PASSENGER NAME</label>
                <input
                  type="text"
                  value={passengerName}
                  onChange={(e) => setPassengerName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:border-sky-500"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1 text-[10px] font-bold">PASSENGERS COUNT</label>
                <input
                  type="number"
                  min="1"
                  max="9"
                  value={passengersCount}
                  onChange={(e) => setPassengersCount(parseInt(e.target.value) || 1)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:border-sky-500"
                />
              </div>

              <div className="sm:col-span-2 flex items-end">
                <button
                  onClick={handleExecuteSearch}
                  disabled={isSearching}
                  className="w-full py-3 bg-sky-500 hover:bg-sky-400 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center space-x-2 shadow-lg shadow-sky-500/20 transition-all"
                >
                  {isSearching ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <Search className="w-4 h-4" />
                  )}
                  <span>SEARCH AVAILABLE AIRWAYS FLIGHTS</span>
                </button>
              </div>
            </div>

            {/* Flight Search Results */}
            {searchResults.length > 0 && (
              <div className="space-y-4 pt-4 border-t border-slate-800">
                <h3 className="text-xs font-black text-white uppercase tracking-wider flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-sky-400" />
                  <span>Available Airways Flights ({originCity} ✈️ {destCity})</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {searchResults.map((flight) => (
                    <div
                      key={flight.flightNo}
                      className="p-5 bg-slate-950 border border-slate-800 hover:border-sky-500/50 rounded-2xl space-y-4 transition-all flex flex-col justify-between"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                          <span className="text-xs font-black text-sky-400">{flight.flightNo}</span>
                          <span className="text-[10px] text-amber-400 font-bold bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                            {flight.seatsLeft} Seats Left
                          </span>
                        </div>

                        <div className="text-sm font-extrabold text-white">{flight.airline}</div>

                        <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-2 text-xs">
                          <div className="flex items-center justify-between text-slate-300 font-bold">
                            <span>{flight.depTime}</span>
                            <ArrowRight className="w-4 h-4 text-sky-400 shrink-0 mx-2" />
                            <span>{flight.arrTime}</span>
                          </div>
                          <div className="text-[10px] text-slate-400 text-center font-mono">
                            Duration: {flight.duration} • Non-stop
                          </div>
                        </div>

                        <div className="text-lg font-black text-emerald-400">
                          ₹{flight.priceINR.toLocaleString()} <span className="text-xs text-slate-400 font-normal">/ passenger</span>
                        </div>
                      </div>

                      <button
                        onClick={() => handleConfirmTicketBooking(flight)}
                        className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl text-xs transition-all flex items-center justify-center space-x-1.5 shadow-lg shadow-emerald-500/20"
                      >
                        <Ticket className="w-4 h-4" />
                        <span>BOOK TICKET & ISSUE BOARDING PASS</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: LIVE FLIGHT RADAR TRACKER */}
      {activeTab === 'tracker' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-2xl space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                <input
                  type="text"
                  placeholder="Search flight number (e.g. 6E-204, AI-102, UK-815, QP-1102) or city..."
                  value={searchFlightNo}
                  onChange={(e) => setSearchFlightNo(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
                />
              </div>

              <div className="flex items-center space-x-2 shrink-0">
                <button
                  onClick={() => setSelectedRegionFilter('ALL')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                    selectedRegionFilter === 'ALL'
                      ? 'bg-sky-500 text-slate-950'
                      : 'bg-slate-950 text-slate-400 border border-slate-800'
                  }`}
                >
                  ALL FLIGHTS
                </button>

                <button
                  onClick={() => setSelectedRegionFilter('DOMESTIC')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                    selectedRegionFilter === 'DOMESTIC'
                      ? 'bg-sky-500 text-slate-950'
                      : 'bg-slate-950 text-slate-400 border border-slate-800'
                  }`}
                >
                  🇮🇳 INDIA DOMESTIC
                </button>

                <button
                  onClick={() => setSelectedRegionFilter('INTERNATIONAL')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                    selectedRegionFilter === 'INTERNATIONAL'
                      ? 'bg-sky-500 text-slate-950'
                      : 'bg-slate-950 text-slate-400 border border-slate-800'
                  }`}
                >
                  ✈️ INTERNATIONAL
                </button>
              </div>
            </div>

            {/* Main Tracker Interactive Split View */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Flight List Column */}
              <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
                {filteredTrackedList.map((flt) => (
                  <div
                    key={flt.flightNumber}
                    onClick={() => setSelectedFlightDetail(flt)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all space-y-2 ${
                      selectedFlightDetail?.flightNumber === flt.flightNumber
                        ? 'bg-slate-950 border-sky-500 shadow-xl shadow-sky-500/10 ring-1 ring-sky-500'
                        : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <strong className="text-sm font-black text-white">{flt.flightNumber}</strong>
                      <span className={`px-2 py-0.5 text-[10px] font-extrabold rounded border ${
                        flt.status === 'IN AIR'
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30 animate-pulse'
                          : flt.status === 'DELAYED'
                          ? 'bg-rose-500/20 text-rose-300 border-rose-500/30'
                          : 'bg-sky-500/20 text-sky-300 border-sky-500/30'
                      }`}>
                        {flt.status}
                      </span>
                    </div>

                    <div className="text-xs text-slate-300 font-bold">{flt.airline}</div>

                    <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                      <span>{flt.originCode} ({flt.originCity})</span>
                      <ArrowRight className="w-3.5 h-3.5 text-sky-400" />
                      <span>{flt.destCode} ({flt.destCity})</span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="bg-sky-400 h-1.5 rounded-full transition-all duration-500"
                        style={{ width: `${flt.progressPercent}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Selected Flight Radar Screen Detail Column */}
              {selectedFlightDetail && (
                <div className="lg:col-span-2 space-y-6">
                  {/* Radar Visual Display Container */}
                  <div className="p-6 bg-slate-950 border border-sky-500/30 rounded-2xl relative overflow-hidden space-y-6">
                    <div className="absolute top-4 right-4 flex items-center space-x-2 text-[10px] text-emerald-400 font-mono">
                      <Radio className="w-4 h-4 text-emerald-400 animate-spin" />
                      <span>LIVE RADAR SWEEP ACTIVE</span>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase font-bold block">FLIGHT NUMBER</span>
                        <h3 className="text-2xl font-black text-white">{selectedFlightDetail.flightNumber}</h3>
                        <p className="text-xs text-sky-400 font-bold">{selectedFlightDetail.airline} • {selectedFlightDetail.aircraftType}</p>
                      </div>

                      <div className="text-right">
                        <span className="text-[10px] text-slate-400 uppercase font-bold block">SERVICE CLASSIFICATION</span>
                        <span className="px-3 py-1 bg-sky-500/20 text-sky-300 border border-sky-500/30 rounded-lg text-xs font-bold">
                          {selectedFlightDetail.serviceType}
                        </span>
                      </div>
                    </div>

                    {/* Live Flight Altitude, Speed, Coordinates Radar Box */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono bg-slate-900/80 p-4 rounded-xl border border-slate-800">
                      <div>
                        <span className="text-slate-500 block text-[10px]">ALTITUDE</span>
                        <strong className="text-sky-300 text-sm">{selectedFlightDetail.altitudeFt.toLocaleString()} FT</strong>
                      </div>

                      <div>
                        <span className="text-slate-500 block text-[10px]">GROUND SPEED</span>
                        <strong className="text-sky-300 text-sm">{selectedFlightDetail.speedKnots} KTS</strong>
                      </div>

                      <div>
                        <span className="text-slate-500 block text-[10px]">CURRENT GATE</span>
                        <strong className="text-emerald-400 text-sm">{selectedFlightDetail.gateOrigin}</strong>
                      </div>

                      <div>
                        <span className="text-slate-500 block text-[10px]">DEST. CAROUSEL</span>
                        <strong className="text-amber-400 text-sm">{selectedFlightDetail.baggageCarousel}</strong>
                      </div>
                    </div>

                    {/* Flight Route Timeline Progress */}
                    <div className="p-4 bg-slate-900/90 rounded-xl border border-slate-800 space-y-3 font-mono">
                      <div className="flex justify-between text-xs font-bold">
                        <div>
                          <span className="text-slate-400 block text-[10px]">DEPARTURE</span>
                          <span className="text-white text-sm">{selectedFlightDetail.originCode} - {selectedFlightDetail.originCity}</span>
                          <span className="text-sky-400 block text-[10px]">{selectedFlightDetail.departureTime}</span>
                        </div>

                        <div className="text-right">
                          <span className="text-slate-400 block text-[10px]">ARRIVAL</span>
                          <span className="text-white text-sm">{selectedFlightDetail.destCode} - {selectedFlightDetail.destCity}</span>
                          <span className="text-emerald-400 block text-[10px]">ETA {selectedFlightDetail.estimatedArrival}</span>
                        </div>
                      </div>

                      <div className="relative pt-2">
                        <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden">
                          <div
                            className="bg-gradient-to-r from-sky-500 to-emerald-400 h-3 rounded-full transition-all duration-500"
                            style={{ width: `${selectedFlightDetail.progressPercent}%` }}
                          />
                        </div>
                        <div
                          className="absolute -top-1 transform -translate-x-1/2"
                          style={{ left: `${selectedFlightDetail.progressPercent}%` }}
                        >
                          <Plane className="w-5 h-5 text-sky-300 rotate-90 filter drop-shadow-md" />
                        </div>
                      </div>
                    </div>

                    {/* Flight Notifications Stream */}
                    <div className="space-y-2">
                      <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center space-x-1">
                        <Bell className="w-4 h-4 text-amber-400" />
                        <span>Real-Time Flight Notifications & Gate Updates</span>
                      </h4>

                      <div className="space-y-1.5">
                        {selectedFlightDetail.notifications.map((note, idx) => (
                          <div key={idx} className="p-2.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-300 flex items-center space-x-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                            <span>{note}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: ALL INDIA AIRPORTS DATABASE */}
      {activeTab === 'airports-db' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h3 className="text-base font-extrabold text-white">ALL INDIAN CITIES & AIRPORTS DIRECTORY</h3>
              <p className="text-xs text-slate-400 font-sans">
                Comprehensive airport database covering all Indian States, Union Territories, Islands (Andaman & Lakshadweep), and Tier-1/2/3 regional hubs.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-[600px] overflow-y-auto pr-1">
            {ALL_INDIAN_AIRPORTS.map((ap) => (
              <div key={ap.code} className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
                <div className="flex items-center justify-between">
                  <strong className="text-sm font-black text-sky-400">{ap.code}</strong>
                  <span className={`px-2 py-0.5 text-[9px] font-extrabold rounded ${
                    ap.isInternational ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {ap.isInternational ? 'INTERNATIONAL HUB' : 'DOMESTIC REGIONAL'}
                  </span>
                </div>
                <div className="text-xs font-bold text-white">{ap.city}, {ap.state}</div>
                <div className="text-[10px] text-slate-400 font-sans">{ap.name}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODAL: ISSUED BOARDING PASS */}
      {issuedPass && (
        <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-slate-900 border border-sky-500/50 rounded-2xl max-w-lg w-full p-6 text-white space-y-6 shadow-2xl font-mono">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <Plane className="w-5 h-5 text-sky-400" />
                <h3 className="font-extrabold text-base text-white">ISSUED E-TICKET & BOARDING PASS</h3>
              </div>
              <button
                onClick={() => setIssuedPass(null)}
                className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white text-xs font-bold"
              >
                ✕ Close
              </button>
            </div>

            <div className="p-5 bg-gradient-to-br from-slate-950 via-slate-900 to-sky-950 rounded-2xl border border-sky-500/30 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <span className="text-[10px] text-slate-400 block">PASSENGER NAME</span>
                  <strong className="text-base text-white">{issuedPass.passengerName}</strong>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 block">FLIGHT NO</span>
                  <strong className="text-base text-sky-400">{issuedPass.flightNumber}</strong>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 block">PNR CODE</span>
                  <span className="text-amber-400 font-bold">{issuedPass.pnr}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">AIRLINE</span>
                  <span className="text-slate-300">{issuedPass.airline}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">ORIGIN</span>
                  <span className="text-white font-bold">{issuedPass.origin}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">DESTINATION</span>
                  <span className="text-white font-bold">{issuedPass.destination}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">ASSIGNED SEAT</span>
                  <span className="text-emerald-400 font-bold">{issuedPass.seatNumber}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">BOARDING GATE</span>
                  <span className="text-emerald-400 font-bold">Gate {issuedPass.gate}</span>
                </div>
              </div>

              <div className="bg-white p-3 rounded-xl flex items-center justify-center space-x-4">
                <QrCode className="w-16 h-16 text-slate-950 shrink-0" />
                <div className="text-[10px] font-mono text-slate-900 space-y-1">
                  <div className="font-bold border-b border-slate-200 pb-1">SERVICE WORKER CACHED VERIFIED PASS</div>
                  <div>PASSENGER: {issuedPass.passengerName}</div>
                  <div>PNR: {issuedPass.pnr} • SEAT: {issuedPass.seatNumber}</div>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={() => window.print()}
                className="flex-1 py-3 bg-sky-500 hover:bg-sky-400 text-slate-950 font-black rounded-xl text-xs transition-all flex items-center justify-center space-x-2"
              >
                <Printer className="w-4 h-4" />
                <span>PRINT BOARDING PASS</span>
              </button>
              <button
                onClick={() => setIssuedPass(null)}
                className="px-5 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-xl text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
