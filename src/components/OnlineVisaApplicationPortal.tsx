import React, { useState } from 'react';
import {
  FileText,
  Globe,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ShieldCheck,
  Plane,
  Ship,
  Upload,
  Download,
  Search,
  DollarSign,
  QrCode,
  User,
  CreditCard,
  Building2,
  Calendar,
  Sparkles,
  ArrowRight,
  Printer,
  FileCheck,
  Check,
  RefreshCw,
  Eye,
  Info
} from 'lucide-react';
import { useCurrency } from '../utils/currencyUtils';
import { useLanguage } from '../utils/languageUtils';
import { generateAndDownloadPdf } from '../utils/pdfExporter';
import { OnlinePaymentGatewayModal } from './OnlinePaymentGatewayModal';

export interface VisaApplicationData {
  referenceId: string;
  visaType: 'e-Tourist (30 Days)' | 'Seafarer C1/D Transit' | 'Flight Deck Crew Transit' | 'Emergency Port eVisa';
  destinationCountry: string;
  applicantName: string;
  passportNumber: string;
  nationality: string;
  dob: string;
  gender: string;
  flightOrVesselDetails: string;
  portOfEntry: string;
  arrivalDate: string;
  email: string;
  phone: string;
  totalFeeUSD: number;
  status: 'APPROVED' | 'IN_PROCESSING' | 'DOCUMENTS_REQUIRED';
  issueDate: string;
  expiryDate: string;
  qrHash: string;
}

const SAMPLE_EXISTING_VISAS: VisaApplicationData[] = [
  {
    referenceId: 'VISA-2026-88491',
    visaType: 'Seafarer C1/D Transit',
    destinationCountry: 'India (Mumbai Port / VABB Airport)',
    applicantName: 'Capt. Alexander Vance',
    passportNumber: 'Z-8102931',
    nationality: 'Indian / Maritime Flag State',
    dob: '1984-06-12',
    gender: 'Male',
    flightOrVesselDetails: 'M/V Icon of the Seas (IMO 982012)',
    portOfEntry: 'Mumbai Sea Port Terminal 2',
    arrivalDate: '2026-08-10',
    email: 'captain.vance@oceanbird-maritime.com',
    phone: '+91 98765 43210',
    totalFeeUSD: 60,
    status: 'APPROVED',
    issueDate: '2026-08-01',
    expiryDate: '2026-11-01',
    qrHash: '0x99a818e7c2201bfa'
  },
  {
    referenceId: 'VISA-2026-77102',
    visaType: 'e-Tourist (30 Days)',
    destinationCountry: 'United Arab Emirates (Dubai - DXB)',
    applicantName: 'Elena Rostova',
    passportNumber: 'N-4819022',
    nationality: 'Singapore',
    dob: '1992-09-24',
    gender: 'Female',
    flightOrVesselDetails: 'Emirates Flight EK-501',
    portOfEntry: 'Dubai International Airport T3',
    arrivalDate: '2026-08-15',
    email: 'elena.r@global-travelers.org',
    phone: '+65 9123 4567',
    totalFeeUSD: 80,
    status: 'APPROVED',
    issueDate: '2026-08-02',
    expiryDate: '2026-09-02',
    qrHash: '0x33e91024b8192a'
  }
];

export const OnlineVisaApplicationPortal: React.FC = () => {
  const { currency, formatPrice } = useCurrency();
  const { t } = useLanguage();

  const [activeTab, setActiveTab] = useState<'NEW_APPLICATION' | 'PHYSICAL_VISA_APPLICATION' | 'STATUS_TRACKER' | 'REQUIREMENTS_GUIDE'>('NEW_APPLICATION');

  // Physical Visa Form State
  const [consulateLocation, setConsulateLocation] = useState('Embassy of India / VFS Global Center (Mumbai / Delhi)');
  const [appointmentDate, setAppointmentDate] = useState('2026-08-25');
  const [appointmentSlot, setAppointmentSlot] = useState('10:30 AM - Biometric & Interview');
  const [courierAddress, setCourierAddress] = useState('12 Maritime Boulevard, Fort District, Mumbai, India');
  const [physicalVisaSuccess, setPhysicalVisaSuccess] = useState<any | null>(null);

  // Visa Application Form State
  const [visaType, setVisaType] = useState<'e-Tourist (30 Days)' | 'Seafarer C1/D Transit' | 'Flight Deck Crew Transit' | 'Emergency Port eVisa'>('e-Tourist (30 Days)');
  const [destinationCountry, setDestinationCountry] = useState('India (E-Visa / Port Clearance)');
  const [applicantName, setApplicantName] = useState('');
  const [passportNumber, setPassportNumber] = useState('');
  const [nationality, setNationality] = useState('India');
  const [dob, setDob] = useState('1990-01-15');
  const [gender, setGender] = useState('Male');
  const [flightOrVessel, setFlightOrVessel] = useState('');
  const [portOfEntry, setPortOfEntry] = useState('');
  const [arrivalDate, setArrivalDate] = useState('2026-08-20');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isExpressProcessing, setIsExpressProcessing] = useState(true);

  // Document upload simulation state
  const [passportUploaded, setPassportUploaded] = useState(false);
  const [photoUploaded, setPhotoUploaded] = useState(false);
  const [licenseUploaded, setLicenseUploaded] = useState(false);

  // Payment Gateway Modal State
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [pendingApplication, setPendingApplication] = useState<VisaApplicationData | null>(null);

  // Application Success State
  const [createdVisa, setCreatedVisa] = useState<VisaApplicationData | null>(null);

  // Search Tracker State
  const [searchRefInput, setSearchRefInput] = useState('');
  const [searchedVisa, setSearchedVisa] = useState<VisaApplicationData | null>(SAMPLE_EXISTING_VISAS[0]);

  // Pricing Calculation
  const getBaseFee = () => {
    switch (visaType) {
      case 'e-Tourist (30 Days)': return 80;
      case 'Seafarer C1/D Transit': return 60;
      case 'Flight Deck Crew Transit': return 75;
      case 'Emergency Port eVisa': return 110;
      default: return 80;
    }
  };

  const totalFeeUSD = getBaseFee() + (isExpressProcessing ? 25 : 0);

  const handleStartPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applicantName || !passportNumber || !email) {
      alert('Please fill in all mandatory applicant information fields.');
      return;
    }

    const refId = `VISA-2026-${Math.floor(10000 + Math.random() * 90000)}`;
    const newVisa: VisaApplicationData = {
      referenceId: refId,
      visaType,
      destinationCountry,
      applicantName,
      passportNumber,
      nationality,
      dob,
      gender,
      flightOrVesselDetails: flightOrVessel || 'N/A Commercial Flight / Vessel',
      portOfEntry: portOfEntry || 'International Port of Entry',
      arrivalDate,
      email,
      phone,
      totalFeeUSD,
      status: 'APPROVED',
      issueDate: new Date().toISOString().split('T')[0],
      expiryDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      qrHash: `0x${Math.random().toString(16).substring(2)}${Math.random().toString(16).substring(2)}`
    };

    setPendingApplication(newVisa);
    setIsPaymentModalOpen(true);
  };

  const handlePaymentSuccess = (paymentDetails: { paymentMethod: string; txHash: string }) => {
    if (pendingApplication) {
      setCreatedVisa(pendingApplication);
      setSearchedVisa(pendingApplication);
      setIsPaymentModalOpen(false);
    }
  };

  const handleSearchVisa = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchRefInput.trim()) return;
    const found = SAMPLE_EXISTING_VISAS.find(
      (v) => v.referenceId.toLowerCase() === searchRefInput.trim().toLowerCase() || v.passportNumber.toLowerCase() === searchRefInput.trim().toLowerCase()
    );
    if (found) {
      setSearchedVisa(found);
    } else if (createdVisa && createdVisa.referenceId.toLowerCase() === searchRefInput.trim().toLowerCase()) {
      setSearchedVisa(createdVisa);
    } else {
      alert('No matching eVisa application found for that Reference ID or Passport number.');
    }
  };

  const handleDownloadVisaPdf = (visaData: VisaApplicationData) => {
    generateAndDownloadPdf({
      documentType: 'TAX_INVOICE',
      bookingId: visaData.referenceId,
      title: `OFFICIAL e-VISA (${visaData.visaType.toUpperCase()})`,
      operatorName: visaData.destinationCountry,
      passengerOrCargoName: visaData.applicantName,
      passportOrCustomsCode: visaData.passportNumber,
      origin: visaData.nationality,
      destination: visaData.destinationCountry,
      departureDate: visaData.arrivalDate,
      allocatedSpace: `Visa Type: ${visaData.visaType} (Valid to: ${visaData.expiryDate})`,
      paymentMethod: 'Online Payment Gateway (256-Bit SSL)',
      paymentTxHash: visaData.qrHash,
      basePriceUSD: visaData.totalFeeUSD,
      totalPriceUSD: visaData.totalFeeUSD,
      currencyCode: currency,
      formattedTotalPrice: formatPrice(visaData.totalFeeUSD),
      issueTimestamp: visaData.issueDate,
      qrPayload: `EVISA:${visaData.referenceId}:${visaData.passportNumber}:${visaData.qrHash}`
    });
  };

  return (
    <div id="online-visa-portal" className="space-y-8 animate-fadeIn text-white font-sans pb-12">
      {/* HEADER BANNER */}
      <div className="bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 rounded-3xl p-6 sm:p-8 border border-sky-500/30 shadow-2xl space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-800">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-sky-500/20 text-sky-300 border border-sky-500/30 uppercase flex items-center space-x-1">
                <Globe className="w-3.5 h-3.5 text-sky-400" />
                <span>GLOBAL IMMIGRATION & PORT CLEARANCE</span>
              </span>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-teal-500/20 text-teal-300 border border-teal-500/30 uppercase flex items-center space-x-1">
                <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
                <span>ICAO DOC 9303 & IMO STCW VERIFIED</span>
              </span>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 uppercase flex items-center space-x-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>EXPRESS 2-HOUR e-VISA APPROVAL</span>
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white flex items-center space-x-3">
              <FileText className="w-8 h-8 text-amber-400 shrink-0" />
              <span>Online Visa Application & e-Visa Portal</span>
            </h1>

            <p className="text-slate-300 text-xs sm:text-sm max-w-4xl font-sans leading-relaxed">
              Official online portal for international airways passengers, cruise tourists, flight deck crew, seafarer C1/D transit, and emergency port clearance visas. Apply online, complete document validation, pay via encrypted gateway, and download verified e-Visa certificates.
            </p>
          </div>

          <div className="flex items-center space-x-3 shrink-0">
            <button
              onClick={() => setActiveTab('STATUS_TRACKER')}
              className="px-5 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-sky-300 border border-sky-500/40 font-bold text-xs uppercase transition-all shadow-lg flex items-center space-x-2"
            >
              <Search className="w-4 h-4 text-sky-400" />
              <span>TRACK e-VISA STATUS</span>
            </button>
          </div>
        </div>

        {/* TOP TABS */}
        <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
          <button
            onClick={() => setActiveTab('NEW_APPLICATION')}
            className={`px-4 py-2.5 rounded-2xl font-bold transition-all flex items-center space-x-2 ${
              activeTab === 'NEW_APPLICATION'
                ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20 font-black'
                : 'bg-slate-950 text-slate-300 hover:bg-slate-800 border border-slate-800'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>1. e-VISA ONLINE PORTAL</span>
          </button>

          <button
            onClick={() => setActiveTab('PHYSICAL_VISA_APPLICATION')}
            className={`px-4 py-2.5 rounded-2xl font-bold transition-all flex items-center space-x-2 ${
              activeTab === 'PHYSICAL_VISA_APPLICATION'
                ? 'bg-rose-500 text-slate-950 shadow-lg shadow-rose-500/20 font-black'
                : 'bg-slate-950 text-slate-300 hover:bg-slate-800 border border-slate-800'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>2. PHYSICAL VISA PORTAL (CONSULATE & APPOINTMENT)</span>
          </button>

          <button
            onClick={() => setActiveTab('STATUS_TRACKER')}
            className={`px-4 py-2.5 rounded-2xl font-bold transition-all flex items-center space-x-2 ${
              activeTab === 'STATUS_TRACKER'
                ? 'bg-sky-500 text-slate-950 shadow-lg shadow-sky-500/20 font-black'
                : 'bg-slate-950 text-slate-300 hover:bg-slate-800 border border-slate-800'
            }`}
          >
            <QrCode className="w-4 h-4" />
            <span>3. TRACK VISA STATUS & STAMPED PASSPORT</span>
          </button>

          <button
            onClick={() => setActiveTab('REQUIREMENTS_GUIDE')}
            className={`px-4 py-2.5 rounded-2xl font-bold transition-all flex items-center space-x-2 ${
              activeTab === 'REQUIREMENTS_GUIDE'
                ? 'bg-teal-500 text-slate-950 shadow-lg shadow-teal-500/20 font-black'
                : 'bg-slate-950 text-slate-300 hover:bg-slate-800 border border-slate-800'
            }`}
          >
            <Info className="w-4 h-4" />
            <span>4. PORT & VISA REQUIREMENTS GUIDE</span>
          </button>
        </div>
      </div>

      {/* ================= TAB 1: NEW APPLICATION FORM ================= */}
      {activeTab === 'NEW_APPLICATION' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fadeIn">
          {/* Main Application Form */}
          <div className="lg:col-span-2 space-y-6 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
            <div className="border-b border-slate-800 pb-4 space-y-1">
              <h2 className="text-xl font-bold text-white flex items-center space-x-2">
                <FileCheck className="w-5 h-5 text-amber-400" />
                <span>e-Visa Application & Port Clearance Form</span>
              </h2>
              <p className="text-slate-400 text-xs">
                Fill in applicant passport information and arrival details for fast-track immigration approval.
              </p>
            </div>

            <form onSubmit={handleStartPayment} className="space-y-6 text-xs font-mono">
              {/* Category & Destination */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-slate-400 font-bold uppercase text-[10px]">Visa Category</label>
                  <select
                    value={visaType}
                    onChange={(e) => setVisaType(e.target.value as any)}
                    className="w-full bg-slate-950 text-white font-bold p-3 rounded-2xl border border-slate-800 focus:outline-none focus:border-amber-400"
                  >
                    <option value="e-Tourist (30 Days)">🏖️ e-Tourist (30 Days - Airways & Cruise)</option>
                    <option value="Seafarer C1/D Transit">🚢 Seafarer / Crew C1/D Transit & Shore Pass</option>
                    <option value="Flight Deck Crew Transit">✈️ Flight Deck & Aviator Transit eVisa</option>
                    <option value="Emergency Port eVisa">🚨 Emergency Port Clearance & Arrival eVisa</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-slate-400 font-bold uppercase text-[10px]">Destination Country / Port Authority</label>
                  <select
                    value={destinationCountry}
                    onChange={(e) => setDestinationCountry(e.target.value)}
                    className="w-full bg-slate-950 text-white font-bold p-3 rounded-2xl border border-slate-800 focus:outline-none focus:border-amber-400"
                  >
                    <option value="India (E-Visa / Port Clearance)">🇮🇳 India (Mumbai, Delhi, Chennai, Goa)</option>
                    <option value="United Arab Emirates (Dubai / GCAA)">🇦🇪 UAE (Dubai DXB, Abu Dhabi AUH)</option>
                    <option value="United States (C1/D Seaman / Flight)">🇺🇸 USA (Miami, New York, Los Angeles)</option>
                    <option value="Singapore (ICA Arrival Card)">🇸🇬 Singapore (Changi Airport / Cruise Center)</option>
                    <option value="European Union (Schengen Maritime Transit)">🇪🇺 Schengen Zone (Rotterdam, Hamburg)</option>
                    <option value="Qatar (Hamad Intl / Doha Port)">🇶🇦 Qatar (Doha Hamad Airport / Port)</option>
                  </select>
                </div>
              </div>

              {/* Applicant Personal Info */}
              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
                <h3 className="text-xs font-bold text-sky-400 uppercase tracking-wider flex items-center space-x-2">
                  <User className="w-4 h-4" />
                  <span>Applicant Passport Information</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-slate-400 text-[10px]">Full Name (As in Passport) *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Captain Alexander Vance"
                      value={applicantName}
                      onChange={(e) => setApplicantName(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-white font-bold focus:outline-none focus:border-sky-400"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-400 text-[10px]">Passport Number *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Z-8102931"
                      value={passportNumber}
                      onChange={(e) => setPassportNumber(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-white font-bold focus:outline-none focus:border-sky-400"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-400 text-[10px]">Nationality / Flag State</label>
                    <input
                      type="text"
                      placeholder="e.g. India / Singapore / USA"
                      value={nationality}
                      onChange={(e) => setNationality(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-white font-bold focus:outline-none focus:border-sky-400"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-400 text-[10px]">Date of Birth</label>
                    <input
                      type="date"
                      value={dob}
                      onChange={(e) => setDob(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-white font-bold focus:outline-none focus:border-sky-400"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-400 text-[10px]">Email Address (For eVisa Receipt) *</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. captain.vance@oceanbird.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-white font-bold focus:outline-none focus:border-sky-400"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-400 text-[10px]">Phone Number (With Country Code)</label>
                    <input
                      type="text"
                      placeholder="e.g. +91 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-white font-bold focus:outline-none focus:border-sky-400"
                    />
                  </div>
                </div>
              </div>

              {/* Arrival & Vessel/Flight Details */}
              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
                <h3 className="text-xs font-bold text-teal-400 uppercase tracking-wider flex items-center space-x-2">
                  <Plane className="w-4 h-4" />
                  <span>Flight / Vessel Arrival & Port Details</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-slate-400 text-[10px]">Flight PNR or Ship IMO Name</label>
                    <input
                      type="text"
                      placeholder="e.g. EK-501 or M/V Icon of the Seas (IMO 982012)"
                      value={flightOrVessel}
                      onChange={(e) => setFlightOrVessel(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-white font-bold focus:outline-none focus:border-teal-400"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-400 text-[10px]">Port of Arrival / Immigration Terminal</label>
                    <input
                      type="text"
                      placeholder="e.g. Mumbai Port Terminal 2 / DXB Airport T3"
                      value={portOfEntry}
                      onChange={(e) => setPortOfEntry(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-white font-bold focus:outline-none focus:border-teal-400"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-400 text-[10px]">Estimated Arrival Date</label>
                    <input
                      type="date"
                      value={arrivalDate}
                      onChange={(e) => setArrivalDate(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-white font-bold focus:outline-none focus:border-teal-400"
                    />
                  </div>

                  <div className="flex items-center space-x-3 pt-4">
                    <input
                      type="checkbox"
                      id="express-check"
                      checked={isExpressProcessing}
                      onChange={(e) => setIsExpressProcessing(e.target.checked)}
                      className="w-4 h-4 rounded accent-amber-400 cursor-pointer"
                    />
                    <label htmlFor="express-check" className="text-amber-300 font-bold text-xs cursor-pointer">
                      ⚡ Express 2-Hour VIP Priority Processing (+$25 USD)
                    </label>
                  </div>
                </div>
              </div>

              {/* Document Upload Simulation */}
              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
                <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center space-x-2">
                  <Upload className="w-4 h-4" />
                  <span>Passport & License Document Upload Verification</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setPassportUploaded(!passportUploaded)}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      passportUploaded
                        ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <FileText className="w-5 h-5 mx-auto mb-1" />
                    <span className="text-[11px] font-bold block">1. Passport Bio Page</span>
                    <span className="text-[9px] text-slate-400 block">{passportUploaded ? '✓ Verified OCR' : 'Click to Upload'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPhotoUploaded(!photoUploaded)}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      photoUploaded
                        ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <User className="w-5 h-5 mx-auto mb-1" />
                    <span className="text-[11px] font-bold block">2. Passport Size Photo</span>
                    <span className="text-[9px] text-slate-400 block">{photoUploaded ? '✓ Biometric OK' : 'Click to Upload'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setLicenseUploaded(!licenseUploaded)}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      licenseUploaded
                        ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <ShieldCheck className="w-5 h-5 mx-auto mb-1" />
                    <span className="text-[11px] font-bold block">3. STCW / ICAO License</span>
                    <span className="text-[9px] text-slate-400 block">{licenseUploaded ? '✓ Validated' : 'Click to Upload'}</span>
                  </button>
                </div>
              </div>

              {/* Submit & Fee Action */}
              <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-slate-800">
                <div className="space-y-0.5">
                  <span className="text-slate-400 text-[10px] block">TOTAL VISA & CLEARANCE FEE</span>
                  <div className="text-2xl font-black text-amber-400">
                    {formatPrice(totalFeeUSD)} <span className="text-xs text-slate-400 font-normal">({totalFeeUSD} USD)</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="px-6 py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-black text-xs uppercase transition-all shadow-xl shadow-amber-500/20 flex items-center justify-center space-x-2 border border-amber-300/40"
                >
                  <CreditCard className="w-4 h-4 fill-slate-950" />
                  <span>PROCEED TO ONLINE PAYMENT GATEWAY</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>

          {/* Sidebar Summary & Live Benefits */}
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl font-mono text-xs">
              <h3 className="text-sm font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-3">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>e-Visa Fee Breakdown</span>
              </h3>

              <div className="space-y-2.5">
                <div className="flex justify-between text-slate-300">
                  <span>Base Visa Processing:</span>
                  <span className="font-bold text-white">${getBaseFee()} USD</span>
                </div>
                {isExpressProcessing && (
                  <div className="flex justify-between text-amber-300">
                    <span>⚡ VIP Express 2-Hour Fee:</span>
                    <span className="font-bold">$25 USD</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-400 text-[11px]">
                  <span>Customs & Embassy Stamp Fee:</span>
                  <span>INCLUDED</span>
                </div>
                <div className="border-t border-slate-800 pt-2 flex justify-between text-white font-bold">
                  <span>Total Payable:</span>
                  <span className="text-amber-400">{formatPrice(totalFeeUSD)}</span>
                </div>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2 text-[11px] text-slate-300 font-sans">
                <div className="flex items-center space-x-2 text-emerald-400 font-bold font-mono">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>100% Guaranteed Approval Refund</span>
                </div>
                <p className="leading-relaxed">
                  If your e-Visa application is rejected by government border immigration, full fees are instantly refunded to your original payment account.
                </p>
              </div>
            </div>

            {/* Quick Sample Visa Card */}
            {createdVisa && (
              <div className="bg-gradient-to-b from-slate-900 to-slate-950 border border-emerald-500/50 rounded-3xl p-6 space-y-4 shadow-2xl font-mono text-xs">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-[10px]">
                    ✓ e-VISA ISSUED & PAID
                  </span>
                  <span className="text-slate-400 text-[10px]">{createdVisa.referenceId}</span>
                </div>

                <div className="space-y-2">
                  <h4 className="font-bold text-white text-sm">{createdVisa.applicantName}</h4>
                  <p className="text-sky-300 text-[11px]">{createdVisa.visaType} ({createdVisa.destinationCountry})</p>
                  <p className="text-slate-400 text-[10px]">Passport: {createdVisa.passportNumber}</p>
                </div>

                <button
                  onClick={() => handleDownloadVisaPdf(createdVisa)}
                  className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase transition-all shadow-md flex items-center justify-center space-x-2"
                >
                  <Download className="w-4 h-4" />
                  <span>DOWNLOAD OFFICIAL e-VISA PDF</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ================= TAB 2: PHYSICAL VISA APPLICATION PORTAL ================= */}
      {activeTab === 'PHYSICAL_VISA_APPLICATION' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fadeIn font-mono text-xs">
          <div className="lg:col-span-2 space-y-6 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
            <div className="border-b border-slate-800 pb-4 space-y-1">
              <h2 className="text-xl font-bold text-white flex items-center space-x-2">
                <Building2 className="w-5 h-5 text-rose-400" />
                <span>Physical Stamped Visa Consulate & Appointment Booking Portal</span>
              </h2>
              <p className="text-slate-400 text-xs font-sans">
                Book physical consulate / embassy appointments, schedule biometric interview slots, arrange secure passport courier pick-up, and track physical stamped passport delivery.
              </p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const ref = `PHYS-VISA-${Math.floor(100000 + Math.random() * 900000)}`;
                setPhysicalVisaSuccess({
                  ref,
                  consulateLocation,
                  appointmentDate,
                  appointmentSlot,
                  courierAddress,
                  status: 'APPOINTMENT_CONFIRMED'
                });
              }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-slate-400 font-bold uppercase text-[10px]">Select Embassy / Consulate / VFS Center *</label>
                  <select
                    value={consulateLocation}
                    onChange={(e) => setConsulateLocation(e.target.value)}
                    className="w-full bg-slate-950 text-white font-bold p-3 rounded-2xl border border-slate-800 focus:outline-none focus:border-rose-400"
                  >
                    <option value="Embassy of India / VFS Global Center (Mumbai / Delhi)">🇮🇳 Embassy of India / VFS Center (Mumbai / Delhi)</option>
                    <option value="US Embassy & Consulate General (Mumbai BKC / New Delhi)">🇺🇸 US Embassy & Consulate (C1/D Seaman & Tourist Visa)</option>
                    <option value="UAE Embassy & Visa Application Center (Delhi / Dubai)">🇦🇪 UAE Embassy & Visa Center (Work & Maritime Crew)</option>
                    <option value="Schengen Joint Consulate Center (Mumbai / Hamburg / Rotterdam)">🇪🇺 Schengen Joint Consulate (Maritime Transit Visa)</option>
                    <option value="High Commission of Singapore (New Delhi / Mumbai)">🇸🇬 High Commission of Singapore (Passenger & Seaman Visa)</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-slate-400 font-bold uppercase text-[10px]">Physical Interview & Biometric Date *</label>
                  <input
                    type="date"
                    value={appointmentDate}
                    onChange={(e) => setAppointmentDate(e.target.value)}
                    className="w-full bg-slate-950 text-white font-bold p-3 rounded-2xl border border-slate-800 focus:outline-none focus:border-rose-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-slate-400 font-bold uppercase text-[10px]">Biometric Time Slot *</label>
                  <select
                    value={appointmentSlot}
                    onChange={(e) => setAppointmentSlot(e.target.value)}
                    className="w-full bg-slate-950 text-white font-bold p-3 rounded-2xl border border-slate-800 focus:outline-none focus:border-rose-400"
                  >
                    <option value="09:00 AM - Morning VIP Batch">09:00 AM - Morning VIP Batch</option>
                    <option value="10:30 AM - Biometric & Interview">10:30 AM - Biometric & Interview</option>
                    <option value="02:00 PM - Afternoon Seafarer Express">02:00 PM - Afternoon Seafarer Express</option>
                    <option value="04:30 PM - Evening Courier Handover Slot">04:30 PM - Evening Courier Handover Slot</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-slate-400 font-bold uppercase text-[10px]">Passport Return Courier Address *</label>
                  <input
                    type="text"
                    required
                    value={courierAddress}
                    onChange={(e) => setCourierAddress(e.target.value)}
                    placeholder="e.g. 12 Maritime Boulevard, Fort District, Mumbai"
                    className="w-full bg-slate-950 text-white font-bold p-3 rounded-2xl border border-slate-800 focus:outline-none focus:border-rose-400"
                  />
                </div>
              </div>

              {/* Physical Requirements Checklist */}
              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
                <h3 className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center space-x-2">
                  <FileCheck className="w-4 h-4" />
                  <span>Physical Submission Documents Checklist</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-slate-300">
                  <div className="flex items-center space-x-2 bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Original Passport (Min 6 months validity)</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>2 Physical Passport Photos (35x45mm)</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Confirmed Flight PNR or Vessel Cruise Ticket</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Seaman CDC Book or Employer Guarantee</span>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-400 hover:to-amber-400 text-slate-950 font-black text-sm uppercase tracking-wider transition-all shadow-xl shadow-rose-500/20 flex items-center justify-center space-x-2"
              >
                <Building2 className="w-5 h-5" />
                <span>CONFIRM CONSULATE APPOINTMENT & GENERATE PASSPORT COURIER SLIP</span>
              </button>
            </form>
          </div>

          {/* Physical Visa Side Summary & Slip */}
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
              <h3 className="text-sm font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-3">
                <ShieldCheck className="w-4 h-4 text-rose-400" />
                <span>Physical Stamped Visa Workflow</span>
              </h3>
              <div className="space-y-3 text-[11px] text-slate-300 font-sans">
                <div className="flex items-start space-x-3">
                  <span className="w-6 h-6 rounded-full bg-rose-500/20 text-rose-300 font-bold flex items-center justify-center shrink-0">1</span>
                  <p><strong className="text-white">Book Appointment:</strong> Select consulate and pick biometric time slot.</p>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="w-6 h-6 rounded-full bg-rose-500/20 text-rose-300 font-bold flex items-center justify-center shrink-0">2</span>
                  <p><strong className="text-white">Courier Pick-up:</strong> BlueDart / DHL collects passport from your address.</p>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="w-6 h-6 rounded-full bg-rose-500/20 text-rose-300 font-bold flex items-center justify-center shrink-0">3</span>
                  <p><strong className="text-white">Consulate Stamping:</strong> Embassy stamps physical visa foil in passport.</p>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="w-6 h-6 rounded-full bg-rose-500/20 text-rose-300 font-bold flex items-center justify-center shrink-0">4</span>
                  <p><strong className="text-white">Secure Delivery:</strong> Stamped passport delivered to your doorstep with tracking.</p>
                </div>
              </div>
            </div>

            {physicalVisaSuccess && (
              <div className="bg-gradient-to-b from-slate-900 to-slate-950 border border-rose-500/50 rounded-3xl p-6 space-y-4 shadow-2xl">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <span className="px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 font-bold text-[10px]">
                    ✓ APPOINTMENT CONFIRMED
                  </span>
                  <span className="text-slate-400 text-[10px]">{physicalVisaSuccess.ref}</span>
                </div>

                <div className="space-y-2 text-[11px] text-slate-300">
                  <p><strong className="text-white">Consulate:</strong> {physicalVisaSuccess.consulateLocation}</p>
                  <p><strong className="text-white">Date & Slot:</strong> {physicalVisaSuccess.appointmentDate} @ {physicalVisaSuccess.appointmentSlot}</p>
                  <p><strong className="text-white">Passport Dispatch Courier:</strong> DHL / BlueDart Express Priority</p>
                </div>

                <button
                  onClick={() => alert(`Official Physical Visa Appointment Slip (${physicalVisaSuccess.ref}) printed!`)}
                  className="w-full py-3 rounded-xl bg-rose-500 hover:bg-rose-400 text-slate-950 font-bold text-xs uppercase transition-all shadow-md flex items-center justify-center space-x-2"
                >
                  <Printer className="w-4 h-4" />
                  <span>PRINT APPOINTMENT SLIP & COURIER TAG</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ================= TAB 3: STATUS TRACKER & DOWNLOAD ================= */}
      {activeTab === 'STATUS_TRACKER' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Search Box */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xl font-mono">
            <h2 className="text-lg font-bold text-white flex items-center space-x-2">
              <Search className="w-5 h-5 text-sky-400" />
              <span>Track Existing e-Visa Application & Download Certificate</span>
            </h2>

            <form onSubmit={handleSearchVisa} className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                placeholder="Enter Reference ID (e.g. VISA-2026-88491) or Passport Number..."
                value={searchRefInput}
                onChange={(e) => setSearchRefInput(e.target.value)}
                className="flex-1 bg-slate-950 border border-slate-800 rounded-2xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-400 font-bold"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-2xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs uppercase transition-all shadow-lg flex items-center justify-center space-x-2 shrink-0"
              >
                <Search className="w-4 h-4" />
                <span>FIND e-VISA</span>
              </button>
            </form>
          </div>

          {/* Searched Result Display */}
          {searchedVisa ? (
            <div className="bg-gradient-to-b from-slate-900 to-slate-950 border border-sky-500/40 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl font-mono text-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-xs border border-emerald-500/30">
                      ✓ OFFICIAL e-VISA APPROVED
                    </span>
                    <span className="text-slate-400 text-xs">Ref: {searchedVisa.referenceId}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white">{searchedVisa.applicantName}</h3>
                </div>

                <button
                  onClick={() => handleDownloadVisaPdf(searchedVisa)}
                  className="px-5 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs uppercase transition-all shadow-lg flex items-center space-x-2 shrink-0"
                >
                  <Download className="w-4 h-4" />
                  <span>DOWNLOAD e-VISA CERTIFICATE PDF</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-slate-950 p-5 rounded-2xl border border-slate-800">
                <div>
                  <span className="text-slate-500 text-[10px] block uppercase">VISA CATEGORY</span>
                  <span className="text-amber-400 font-bold text-xs">{searchedVisa.visaType}</span>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] block uppercase">DESTINATION PORT</span>
                  <span className="text-white font-bold text-xs">{searchedVisa.destinationCountry}</span>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] block uppercase">PASSPORT NO</span>
                  <span className="text-sky-300 font-bold text-xs">{searchedVisa.passportNumber}</span>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] block uppercase">VALID UNTIL</span>
                  <span className="text-emerald-400 font-bold text-xs">{searchedVisa.expiryDate}</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between text-slate-400 text-[11px]">
                <div className="flex items-center space-x-2">
                  <QrCode className="w-5 h-5 text-sky-400" />
                  <span>Biometric Barcode Hash: <code className="text-sky-300 font-mono">{searchedVisa.qrHash}</code></span>
                </div>
                <span className="text-emerald-400 font-bold">● Valid for Port Entry</span>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center text-slate-400 font-mono text-xs bg-slate-900 rounded-3xl border border-slate-800">
              No visa record currently selected. Search using a Reference ID above.
            </div>
          )}
        </div>
      )}

      {/* ================= TAB 3: REQUIREMENTS GUIDE ================= */}
      {activeTab === 'REQUIREMENTS_GUIDE' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn font-mono text-xs">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
            <h3 className="text-base font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-3">
              <Plane className="w-5 h-5 text-sky-400" />
              <span>Airways & Airline Passenger e-Visa Rules</span>
            </h3>
            <ul className="space-y-2.5 text-slate-300 text-xs list-disc pl-4 font-sans leading-relaxed">
              <li>Passport must have a minimum of 6 months validity from estimated date of arrival.</li>
              <li>Requires confirmed round-trip or onward airline ticket booking PNR.</li>
              <li>Proof of sufficient financial funds for length of stay (minimum $1,000 USD).</li>
              <li>Color passport photo with white background (JPEG/PNG format under 2MB).</li>
            </ul>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
            <h3 className="text-base font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-3">
              <Ship className="w-5 h-5 text-teal-400" />
              <span>Seafarer C1/D Transit & Cruise Shore Pass Rules</span>
            </h3>
            <ul className="space-y-2.5 text-slate-300 text-xs list-disc pl-4 font-sans leading-relaxed">
              <li>Must hold valid Seaman Book (CDC) and IMO STCW Basic Safety Certificates.</li>
              <li>Official Guarantee Letter from Shipping Agent or Cruise Operator with IMO vessel details.</li>
              <li>C1/D Transit allows up to 29 days shore leave and crew change transit.</li>
              <li>Port Customs & Health clearance form must be submitted 24 hours prior to docking.</li>
            </ul>
          </div>
        </div>
      )}

      {/* ONLINE PAYMENT GATEWAY MODAL INTEGRATION */}
      {pendingApplication && (
        <OnlinePaymentGatewayModal
          isOpen={isPaymentModalOpen}
          onClose={() => setIsPaymentModalOpen(false)}
          bookingData={{
            id: pendingApplication.referenceId,
            title: `e-Visa Application (${pendingApplication.visaType})`,
            operatorName: pendingApplication.destinationCountry,
            amountUSD: pendingApplication.totalFeeUSD,
            passengerOrShipper: pendingApplication.applicantName,
            passportOrCustoms: pendingApplication.passportNumber,
            origin: 'Global Online Portal',
            destination: pendingApplication.destinationCountry,
            departureDate: pendingApplication.arrivalDate,
            allocatedSpace: 'e-Visa Digital Document',
            documentType: 'TAX_INVOICE'
          }}
          onPaymentSuccess={handlePaymentSuccess}
        />
      )}
    </div>
  );
};
