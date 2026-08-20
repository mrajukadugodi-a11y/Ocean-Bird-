import React, { useState } from 'react';
import officialLogoImg from '../assets/images/official_logo_1786649303542.jpg';
import headerBannerImg from '../assets/images/header_banner_1786649316919.jpg';
import { motion, AnimatePresence } from 'motion/react';
import {
  Activity,
  Heart,
  ShieldCheck,
  QrCode,
  MapPin,
  Calendar,
  Clock,
  Search,
  Filter,
  Syringe,
  Building2,
  Globe,
  Phone,
  Mail,
  UserCheck,
  FileText,
  AlertTriangle,
  Plus,
  CheckCircle2,
  Download,
  Share2,
  Sparkles,
  Award,
  CreditCard,
  Navigation,
  ExternalLink,
  ChevronRight,
  ShieldAlert,
  Info,
  Check,
  X,
  Stethoscope,
  RefreshCw,
  Compass,
  Zap,
  Radio,
  Bell,
  Siren,
  Sliders,
  CheckSquare,
  Lock,
  Printer,
  FileCheck,
  AlertCircle,
  Plane,
  Layers,
  Flame,
  Waves,
  Terminal,
  Crosshair,
  Volume2
} from 'lucide-react';
import {
  VACCINATION_CENTRES,
  INITIAL_USER_HEALTH_RECORD,
  INITIAL_BOOKINGS,
  TOP_INTERNATIONAL_INSURANCE_PLANS,
  INITIAL_HEALTH_LEDGER,
  INITIAL_HEALTH_TRENDS,
  INSURANCE_COVERAGE_ZONES,
  INITIAL_MEDICAL_SYNC_INFO,
  INITIAL_SEISMIC_VOLCANO_ALERTS,
  INITIAL_EMERGENCY_NOTIFICATIONS,
  INITIAL_RESCUE_DRONES,
  INITIAL_GEO_SIMULATIONS,
  INITIAL_TSUNAMI_ZONES,
  INITIAL_BROADCAST_LOGS
} from '../data/vaccinationCentres';
import {
  VaccinationCentre,
  MedicalHealthRecord,
  VaccineBookingRecord,
  LabTestReport,
  MedicationPrescription,
  EmergencyMedicalContact,
  InternationalInsurancePlan,
  HealthLedgerBlock,
  HealthTrendMetric,
  InsuranceCoverageZone,
  MedicalSyncInfo,
  SeismicVolcanoAlert,
  EmergencyNotification,
  MarineRescueDrone,
  GeoHazardSimulation,
  TsunamiEvacuationZone,
  EmergencyBroadcastLog
} from '../types';

export interface HealthHubProps {
  initialTab?: 'dashboard' | 'passport' | 'records' | 'contacts' | 'insurance-alerts' | 'map' | 'centres' | 'bookings' | 'ledger' | 'trends' | 'coverage-map' | 'tsunami-warning' | 'emergency-notify' | 'rescue-drone' | 'geo-simulation' | 'tsunami-evac-map' | 'broadcast-logs';
}

export const HealthHubAndVaccinationPortal: React.FC<HealthHubProps> = ({ initialTab = 'dashboard' }) => {
  const [activeSubTab, setActiveSubTab] = useState<'dashboard' | 'passport' | 'records' | 'contacts' | 'insurance-alerts' | 'map' | 'centres' | 'bookings' | 'ledger' | 'trends' | 'coverage-map' | 'tsunami-warning' | 'emergency-notify' | 'rescue-drone' | 'geo-simulation' | 'tsunami-evac-map' | 'broadcast-logs'>(initialTab);

  // Core Data States
  const [healthRecord, setHealthRecord] = useState<MedicalHealthRecord>(INITIAL_USER_HEALTH_RECORD);
  const [centresList] = useState<VaccinationCentre[]>(VACCINATION_CENTRES);
  const [bookings, setBookings] = useState<VaccineBookingRecord[]>(INITIAL_BOOKINGS);
  const [insurancePlans] = useState<InternationalInsurancePlan[]>(TOP_INTERNATIONAL_INSURANCE_PLANS);

  // New Requested Core Capabilities Data States
  const [ledgerBlocks, setLedgerBlocks] = useState<HealthLedgerBlock[]>(INITIAL_HEALTH_LEDGER);
  const [healthTrends, setHealthTrends] = useState<HealthTrendMetric[]>(INITIAL_HEALTH_TRENDS);
  const [coverageZones] = useState<InsuranceCoverageZone[]>(INSURANCE_COVERAGE_ZONES);
  const [selectedCoverageZone, setSelectedCoverageZone] = useState<InsuranceCoverageZone>(INSURANCE_COVERAGE_ZONES[0]);
  const [syncInfo, setSyncInfo] = useState<MedicalSyncInfo>(INITIAL_MEDICAL_SYNC_INFO);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [showSyncModal, setShowSyncModal] = useState<boolean>(false);

  // Add Vitals Modal State
  const [showAddVitalsModal, setShowAddVitalsModal] = useState<boolean>(false);
  const [newSystolic, setNewSystolic] = useState<string>('120');
  const [newDiastolic, setNewDiastolic] = useState<string>('80');
  const [newHR, setNewHR] = useState<string>('68');
  const [newSpO2, setNewSpO2] = useState<string>('99');
  const [newHydration, setNewHydration] = useState<string>('94');

  // Add Ledger Entry Modal State
  const [showAddLedgerModal, setShowAddLedgerModal] = useState<boolean>(false);
  const [newLedgerTitle, setNewLedgerTitle] = useState<string>('');
  const [newLedgerType, setNewLedgerType] = useState<HealthLedgerBlock['eventType']>('ICVP_VACCINE_STAMP');
  const [newLedgerAuthority, setNewLedgerAuthority] = useState<string>('');
  const [newLedgerMetadata, setNewLedgerMetadata] = useState<string>('');

  // Emergency Notify & Seismic Volcano Tsunami States
  const [seismicAlerts, setSeismicAlerts] = useState<SeismicVolcanoAlert[]>(INITIAL_SEISMIC_VOLCANO_ALERTS);
  const [selectedSeismicAlert, setSelectedSeismicAlert] = useState<SeismicVolcanoAlert>(INITIAL_SEISMIC_VOLCANO_ALERTS[0]);
  const [emergencyNotifications, setEmergencyNotifications] = useState<EmergencyNotification[]>(INITIAL_EMERGENCY_NOTIFICATIONS);

  // Broadcast Emergency Notify Modal State
  const [showBroadcastModal, setShowBroadcastModal] = useState<boolean>(false);
  const [broadcastHeadline, setBroadcastHeadline] = useState<string>('');
  const [broadcastBody, setBroadcastBody] = useState<string>('');
  const [broadcastRole, setBroadcastRole] = useState<EmergencyNotification['senderRole']>('NOAA_PACIFIC_TSUNAMI_CENTER');
  const [broadcastUrgency, setBroadcastUrgency] = useState<EmergencyNotification['urgency']>('IMMEDIATE_LIFE_SAFETY');

  // Simulate Quake/Volcano Alert Modal State
  const [showSimulateQuakeModal, setShowSimulateQuakeModal] = useState<boolean>(false);
  const [simTitle, setSimTitle] = useState<string>('M8.1 Deep Trench Subduction Megathrust');
  const [simRegion, setSimRegion] = useState<string>('Sunda Trench & Strait of Malacca');
  const [simMag, setSimMag] = useState<string>('8.1');
  const [simWaveHeight, setSimWaveHeight] = useState<string>('5.2');
  const [simETA, setSimETA] = useState<string>('22 Minutes');

  // Marine Rescue Drones State
  const [rescueDrones, setRescueDrones] = useState<MarineRescueDrone[]>(INITIAL_RESCUE_DRONES);
  const [selectedDrone, setSelectedDrone] = useState<MarineRescueDrone>(INITIAL_RESCUE_DRONES[0]);
  const [showLaunchDroneModal, setShowLaunchDroneModal] = useState<boolean>(false);
  const [droneMissionName, setDroneMissionName] = useState<string>('');
  const [droneMissionPayload, setDroneMissionPayload] = useState<string>('AED Defibrillator & Emergency Plasma');
  const [droneTargetLat, setDroneTargetLat] = useState<string>('1.3644');
  const [droneTargetLng, setDroneTargetLng] = useState<string>('103.9915');

  // GEO Hazard Simulation State
  const [geoSimulations] = useState<GeoHazardSimulation[]>(INITIAL_GEO_SIMULATIONS);
  const [selectedGeoSim, setSelectedGeoSim] = useState<GeoHazardSimulation>(INITIAL_GEO_SIMULATIONS[0]);
  const [isSimulatingRun, setIsSimulatingRun] = useState<boolean>(false);
  const [simProgress, setSimProgress] = useState<number>(0);

  // Tsunami Evacuation Route Map State
  const [tsunamiEvacZones] = useState<TsunamiEvacuationZone[]>(INITIAL_TSUNAMI_ZONES);
  const [selectedEvacZone, setSelectedEvacZone] = useState<TsunamiEvacuationZone>(INITIAL_TSUNAMI_ZONES[0]);

  // Emergency Broadcast Logs State
  const [broadcastLogs] = useState<EmergencyBroadcastLog[]>(INITIAL_BROADCAST_LOGS);

  // SOS Haptic Feedback Visual Pulse State
  const [sosHapticActive, setSosHapticActive] = useState<boolean>(false);

  // Haptic Feedback Helper
  const triggerHapticSOS = () => {
    if (typeof window !== 'undefined' && 'navigator' in window && 'vibrate' in navigator) {
      try {
        navigator.vibrate([200, 100, 200, 100, 500, 100, 300]);
      } catch (e) {
        // Fallback gracefully if vibration not supported or permissions blocked
      }
    }
    setSosHapticActive(true);
    setTimeout(() => setSosHapticActive(false), 2000);
  };

  // Search & Filter state for Vaccination Centres
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'ALL' | 'Domestic' | 'International'>('ALL');
  const [selectedVaccineFilter, setSelectedVaccineFilter] = useState<string>('ALL');

  // Map Filter State
  const [selectedMapCentre, setSelectedMapCentre] = useState<VaccinationCentre>(VACCINATION_CENTRES[0]);

  // Booking Modal State
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [targetCentreForBooking, setTargetCentreForBooking] = useState<VaccinationCentre | null>(null);
  const [selectedVaccineForBooking, setSelectedVaccineForBooking] = useState<string>('');
  const [bookingDate, setBookingDate] = useState('2026-08-25');
  const [bookingTimeSlot, setBookingTimeSlot] = useState('10:00 AM - 10:30 AM');
  const [consultationType, setConsultationType] = useState<'In-Clinic' | 'Express Drive-Thru' | 'Port / Airport On-Site'>('In-Clinic');
  const [useInsurance, setUseInsurance] = useState(true);
  const [bookingSuccessCode, setBookingSuccessCode] = useState<string | null>(null);

  // Insurance Claim Modal
  const [showInsuranceModal, setShowInsuranceModal] = useState(false);
  const [claimAmount, setClaimAmount] = useState<string>('150');
  const [claimReason, setClaimReason] = useState('Pre-Departure Yellow Fever & Dengue Immunization');
  const [claimStatus, setClaimStatus] = useState<'IDLE' | 'PROCESSING' | 'APPROVED'>('IDLE');

  // Add Medical Record Modal
  const [showAddRecordModal, setShowAddRecordModal] = useState(false);
  const [newLabName, setNewLabName] = useState('');
  const [newLabCategory, setNewLabCategory] = useState<LabTestReport['category']>('Blood Work');
  const [newLabSummary, setNewLabSummary] = useState('');
  const [newLabPerforming, setNewLabPerforming] = useState('');

  // Add Emergency Contact Modal
  const [showAddContactModal, setShowAddContactModal] = useState(false);
  const [newContactName, setNewContactName] = useState('');
  const [newContactRelation, setNewContactRelation] = useState<EmergencyMedicalContact['relation']>('Personal Physician');
  const [newContactPhone, setNewContactPhone] = useState('');
  const [newContactEmail, setNewContactEmail] = useState('');
  const [newContactLocation, setNewContactLocation] = useState('');

  // SOS Satellite Dispatch Modal
  const [showSosModal, setShowSosModal] = useState(false);
  const [sosStatus, setSosStatus] = useState<'IDLE' | 'COUNTDOWN' | 'DISPATCHED'>('IDLE');
  const [sosCountdown, setSosCountdown] = useState(5);

  // Toast notice
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Keyboard shortcut listener for SOS Emergency Quick-key (Alt + S)
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.altKey || e.metaKey) && (e.key === 's' || e.key === 'S')) {
        e.preventDefault();
        triggerSosDispatch();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Trigger Sync Handler
  const handleSyncNow = () => {
    setIsSyncing(true);
    triggerToast('Initiating Inmarsat Satellite & Cloud Encryption Sync...');
    setTimeout(() => {
      setIsSyncing(false);
      const nowIso = new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC';
      setSyncInfo((prev) => ({
        ...prev,
        syncStatus: 'SYNCED_CLOUD',
        lastSyncedAt: nowIso,
        offlineQueueCount: 0,
        satelliteSignalStrengthPercent: 99
      }));

      // Append sync event block to Ledger
      const newBlock: HealthLedgerBlock = {
        blockIndex: ledgerBlocks.length + 1,
        timestamp: new Date().toISOString(),
        eventType: 'SATELLITE_SOS_AUDIT',
        actionTitle: 'Manual Medical Vault & Ledger Cloud Sync',
        issuerAuthority: 'Inmarsat Satellite Gateway & WHO Encrypted Health Node',
        previousHash: ledgerBlocks[ledgerBlocks.length - 1]?.blockHash || '00000000000000000000',
        blockHash: `hash-sync-${Date.now()}-${Math.floor(Math.random() * 100000)}`,
        isCryptographicallyVerified: true,
        metadata: 'Synced 100% EHR Medical Records, ICVP Health Pass, and Active Insurance Credentials'
      };
      setLedgerBlocks((prev) => [...prev, newBlock]);
      triggerToast('Medical EHR & Digital Health Passport Fully Synced with Global Node!');
    }, 1800);
  };

  // Filter centres
  const filteredCentres = centresList.filter((c) => {
    const matchesCategory = selectedCategory === 'ALL' || c.category === selectedCategory;
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.availableVaccines.some((v) => v.name.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesVaccine =
      selectedVaccineFilter === 'ALL' ||
      c.availableVaccines.some((v) => v.name.toLowerCase().includes(selectedVaccineFilter.toLowerCase()));

    return matchesCategory && matchesSearch && matchesVaccine;
  });

  // Open booking modal
  const handleOpenBooking = (centre: VaccinationCentre, defaultVaccine?: string) => {
    setTargetCentreForBooking(centre);
    setSelectedVaccineForBooking(defaultVaccine || centre.availableVaccines[0]?.name || 'Yellow Fever (Stamaril)');
    setShowBookingModal(true);
    setBookingSuccessCode(null);
  };

  // Submit appointment booking
  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetCentreForBooking) return;

    const vaccineObj = targetCentreForBooking.availableVaccines.find(v => v.name === selectedVaccineForBooking);
    const basePrice = vaccineObj ? vaccineObj.priceUSD : 50;
    const finalPrice = useInsurance ? Math.round(basePrice * 0.2) : basePrice;

    const newBookingId = `VBK-2026-${Math.floor(100 + Math.random() * 900)}`;
    const newBooking: VaccineBookingRecord = {
      bookingId: newBookingId,
      patientName: healthRecord.patientName,
      passportOrId: healthRecord.passportNo,
      phone: '+91 98200 11223',
      email: 'alexander.vance@oceanmaritime.org',
      centreId: targetCentreForBooking.id,
      centreName: targetCentreForBooking.name,
      centreAddress: targetCentreForBooking.address,
      city: targetCentreForBooking.city,
      country: targetCentreForBooking.country,
      vaccineName: selectedVaccineForBooking,
      appointmentDate: bookingDate,
      appointmentSlot: bookingTimeSlot,
      consultationType: consultationType,
      totalPriceUSD: finalPrice,
      insuranceApplied: useInsurance,
      paymentStatus: 'PAID_CONFIRMED',
      bookingStatus: 'CONFIRMED',
      qrBookingCode: `QR-SLOT-${newBookingId}-${targetCentreForBooking.city.toUpperCase()}`,
      createdAt: new Date().toISOString()
    };

    setBookings([newBooking, ...bookings]);
    setBookingSuccessCode(newBookingId);
    triggerToast(`Appointment Confirmed! Booking ID: ${newBookingId}`);
  };

  // Add Lab Record Handler
  const handleAddLabRecord = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLabName) return;

    const newLab: LabTestReport = {
      id: `LAB-2026-${Math.floor(100 + Math.random() * 900)}`,
      testName: newLabName,
      category: newLabCategory,
      dateSampled: new Date().toISOString().split('T')[0],
      resultSummary: newLabSummary || 'Normal / Unremarkable Findings',
      normalRange: 'Standard Clinical Range',
      status: 'NORMAL',
      performingLab: newLabPerforming || 'Port Medical Laboratory Facility',
      verifiedByDoctor: 'Dr. On-Duty Officer, MD'
    };

    setHealthRecord({
      ...healthRecord,
      labReports: [newLab, ...healthRecord.labReports]
    });
    setShowAddRecordModal(false);
    setNewLabName('');
    setNewLabSummary('');
    setNewLabPerforming('');
    triggerToast('Digital Lab Record Successfully Added to Medical EHR!');
  };

  // Add Emergency Contact Handler
  const handleAddEmergencyContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newContactName || !newContactPhone) return;

    const newContact: EmergencyMedicalContact = {
      id: `EMG-${Math.floor(100 + Math.random() * 900)}`,
      name: newContactName,
      relation: newContactRelation,
      phone: newContactPhone,
      email: newContactEmail || 'contact@emergency.org',
      isPrimarySOS: false,
      location: newContactLocation || 'Global Dispatch'
    };

    setHealthRecord({
      ...healthRecord,
      emergencyContacts: [...healthRecord.emergencyContacts, newContact]
    });
    setShowAddContactModal(false);
    setNewContactName('');
    setNewContactPhone('');
    setNewContactEmail('');
    setNewContactLocation('');
    triggerToast('New Emergency Medical Contact Linked to Health Passport!');
  };

  // SOS Trigger Countdown
  const triggerSosDispatch = () => {
    triggerHapticSOS();
    setShowSosModal(true);
    setSosStatus('COUNTDOWN');
    setSosCountdown(5);

    const interval = setInterval(() => {
      setSosCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setSosStatus('DISPATCHED');
          triggerHapticSOS();
          triggerToast('EMERGENCY SATELLITE SOS DISPATCHED TO COAST GUARD & FLEET MEDICAL!');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Insurance Plan Upgrade Handler
  const handleSelectInsurancePlan = (plan: InternationalInsurancePlan) => {
    setHealthRecord({
      ...healthRecord,
      insurancePolicy: {
        providerName: `${plan.providerName} - ${plan.planName}`,
        policyNumber: `POL-${plan.id}-${Math.floor(100000 + Math.random() * 900000)}`,
        coverageType: plan.keyBenefits.join(' | '),
        maxCoverageUSD: plan.maxCoverageUSD,
        validUntil: '2028-12-31',
        emergencyAssistanceHelpline: '+1 800 555 9900 / Global 24/7 Hotline',
        isActive: true
      },
      insuranceAlerts: [] // clears warning alerts upon upgrading
    });
    triggerToast(`Upgraded to ${plan.providerName} ($${plan.maxCoverageUSD.toLocaleString()} Coverage)!`);
  };

  return (
    <div id="health-hub-and-vaccination-portal" className="min-h-screen bg-slate-950 text-slate-100 font-sans p-4 sm:p-6 lg:p-8 space-y-6">
      {/* TOAST ALERT */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-6 right-6 z-50 bg-emerald-600 text-white font-semibold px-5 py-3 rounded-2xl shadow-2xl flex items-center space-x-3 border border-emerald-400/40"
          >
            <CheckCircle2 className="w-5 h-5 text-emerald-200 animate-bounce" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HEADER BANNER */}
      <div className="bg-gradient-to-r from-slate-900 via-emerald-950/70 to-slate-900 border border-emerald-500/30 rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
        <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay">
          <img src={headerBannerImg} alt="Official Header Banner" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        </div>
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="flex items-start space-x-4">
            <img
              src={officialLogoImg}
              alt="Official Logo Mark"
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border-2 border-emerald-400 shadow-xl object-cover shrink-0"
              referrerPolicy="no-referrer"
            />
            <div className="space-y-2">
              <div className="inline-flex items-center space-x-2 bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase">
                <Activity className="w-4 h-4 animate-pulse text-emerald-400" />
                <span>WHO & MARITIME DIGITAL HEALTH PASSPORT PLATFORM</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white flex items-center space-x-3">
                <span>Medical Hub & Digital Health Passport</span>
              </h1>
              <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
                Aggregated digital health passport, real-time EHR medical records, satellite emergency contacts, international medical insurance gap alerts, and WHO clinic booking.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setShowSyncModal(true)}
              className="bg-slate-800/90 hover:bg-slate-800 text-slate-200 font-bold px-4 py-2.5 rounded-2xl transition-all shadow-md flex items-center space-x-2 text-xs border border-slate-700/80"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-emerald-400 ${isSyncing ? 'animate-spin' : ''}`} />
              <span>Sync Status:</span>
              <span className="text-emerald-400 font-mono">🟢 SYNCED</span>
            </button>
            <button
              onClick={triggerSosDispatch}
              className="bg-rose-600 hover:bg-rose-500 text-white font-bold px-5 py-2.5 rounded-2xl transition-all shadow-lg hover:shadow-rose-500/20 flex items-center space-x-2 text-sm border border-rose-400/30"
            >
              <Siren className="w-4 h-4 animate-pulse text-rose-200" />
              <span>Satellite Emergency SOS</span>
              <span className="bg-rose-950 text-rose-200 text-[10px] font-mono px-1.5 py-0.5 rounded border border-rose-500/30">Alt+S</span>
            </button>
            <button
              onClick={() => setActiveSubTab('bookings')}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-5 py-2.5 rounded-2xl transition-all shadow-lg hover:shadow-emerald-500/20 flex items-center space-x-2 text-sm"
            >
              <Calendar className="w-4 h-4" />
              <span>Appointments ({bookings.length})</span>
            </button>
          </div>
        </div>

        {/* MEDICAL SYNC STATUS QUICK STRIP */}
        <div className="mt-5 p-3 rounded-2xl bg-slate-950/80 border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1.5 text-emerald-400 font-mono font-bold">
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
              <span>SATELLITE & CLOUD VAULT ACTIVE</span>
            </div>
            <span className="text-slate-600">|</span>
            <span className="text-slate-400">Last Synced: <strong className="text-slate-200">{syncInfo.lastSyncedAt}</strong></span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-400">Inmarsat Signal: <strong className="text-emerald-400 font-mono">{syncInfo.satelliteSignalStrengthPercent}%</strong></span>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleSyncNow}
              disabled={isSyncing}
              className="bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 font-bold px-3 py-1 rounded-xl transition-all border border-emerald-500/30 flex items-center space-x-1.5 text-xs"
            >
              <RefreshCw className={`w-3 h-3 ${isSyncing ? 'animate-spin' : ''}`} />
              <span>{isSyncing ? 'Syncing Vault...' : 'Sync Medical Data Now'}</span>
            </button>
          </div>
        </div>

        {/* SUB NAVIGATION TABS */}
        <div className="mt-6 pt-5 border-t border-slate-800/80 flex flex-wrap gap-2 sm:gap-2.5">
          <button
            onClick={() => setActiveSubTab('dashboard')}
            className={`px-3.5 py-2 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center space-x-2 ${
              activeSubTab === 'dashboard'
                ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20'
                : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-800'
            }`}
          >
            <Activity className="w-4 h-4" />
            <span>Overview</span>
          </button>

          <button
            onClick={() => setActiveSubTab('passport')}
            className={`px-3.5 py-2 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center space-x-2 ${
              activeSubTab === 'passport'
                ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20'
                : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-800'
            }`}
          >
            <QrCode className="w-4 h-4" />
            <span>Health Pass</span>
          </button>

          <button
            onClick={() => setActiveSubTab('records')}
            className={`px-3.5 py-2 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center space-x-2 ${
              activeSubTab === 'records'
                ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20'
                : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-800'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>EHR Records</span>
          </button>

          <button
            onClick={() => setActiveSubTab('ledger')}
            className={`px-3.5 py-2 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center space-x-2 ${
              activeSubTab === 'ledger'
                ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20'
                : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-800'
            }`}
          >
            <Lock className="w-4 h-4 text-emerald-400" />
            <span>Digital Ledger</span>
            <span className="bg-emerald-950 text-emerald-300 text-[10px] font-mono px-1.5 py-0.5 rounded-full border border-emerald-500/30">
              {ledgerBlocks.length}
            </span>
          </button>

          <button
            onClick={() => setActiveSubTab('trends')}
            className={`px-3.5 py-2 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center space-x-2 ${
              activeSubTab === 'trends'
                ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20'
                : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-800'
            }`}
          >
            <Activity className="w-4 h-4 text-cyan-400" />
            <span>Health Trends</span>
          </button>

          <button
            onClick={() => setActiveSubTab('coverage-map')}
            className={`px-3.5 py-2 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center space-x-2 ${
              activeSubTab === 'coverage-map'
                ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20'
                : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-800'
            }`}
          >
            <Compass className="w-4 h-4 text-indigo-400" />
            <span>Coverage Map</span>
          </button>

          <button
            onClick={() => setActiveSubTab('tsunami-warning')}
            className={`px-3.5 py-2 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center space-x-2 ${
              activeSubTab === 'tsunami-warning'
                ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/30'
                : 'bg-rose-950/60 hover:bg-rose-900/80 text-rose-200 border border-rose-500/40'
            }`}
          >
            <Radio className="w-4 h-4 text-rose-400 animate-pulse" />
            <span>Tsunami & Quake Warning</span>
            {seismicAlerts.filter(a => a.isActiveWarning).length > 0 && (
              <span className="bg-rose-600 text-white text-[10px] font-black px-1.5 py-0.5 rounded-full animate-bounce">
                {seismicAlerts.filter(a => a.isActiveWarning).length} ACTIVE
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveSubTab('rescue-drone')}
            className={`px-3.5 py-2 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center space-x-2 ${
              activeSubTab === 'rescue-drone'
                ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/30 font-black'
                : 'bg-slate-900/80 hover:bg-slate-800 text-cyan-300 border border-cyan-500/30'
            }`}
          >
            <Plane className="w-4 h-4 text-cyan-400" />
            <span>Rescue Drones</span>
            <span className="bg-cyan-950 text-cyan-300 text-[10px] font-mono px-1.5 py-0.5 rounded-full border border-cyan-500/40">
              {rescueDrones.filter(d => d.status === 'IN_FLIGHT_DISPATCHED').length} DISPATCHED
            </span>
          </button>

          <button
            onClick={() => setActiveSubTab('geo-simulation')}
            className={`px-3.5 py-2 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center space-x-2 ${
              activeSubTab === 'geo-simulation'
                ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/30 font-black'
                : 'bg-slate-900/80 hover:bg-slate-800 text-amber-300 border border-amber-500/30'
            }`}
          >
            <Flame className="w-4 h-4 text-amber-400" />
            <span>GEO Hazard Sim</span>
          </button>

          <button
            onClick={() => setActiveSubTab('tsunami-evac-map')}
            className={`px-3.5 py-2 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center space-x-2 ${
              activeSubTab === 'tsunami-evac-map'
                ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/30 font-black'
                : 'bg-slate-900/80 hover:bg-slate-800 text-rose-300 border border-rose-500/30'
            }`}
          >
            <Waves className="w-4 h-4 text-rose-400" />
            <span>Tsunami Evac Map</span>
          </button>

          <button
            onClick={() => setActiveSubTab('emergency-notify')}
            className={`px-3.5 py-2 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center space-x-2 ${
              activeSubTab === 'emergency-notify'
                ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/30'
                : 'bg-slate-900/80 hover:bg-slate-800 text-amber-300 border border-amber-500/30'
            }`}
          >
            <Bell className="w-4 h-4 text-amber-400" />
            <span>Emergency Notify</span>
            {emergencyNotifications.filter(n => !n.isAcknowledgedByOfficer).length > 0 && (
              <span className="bg-amber-500 text-slate-950 text-[10px] font-black px-1.5 py-0.5 rounded-full">
                {emergencyNotifications.filter(n => !n.isAcknowledgedByOfficer).length} UNACK
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveSubTab('broadcast-logs')}
            className={`px-3.5 py-2 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center space-x-2 ${
              activeSubTab === 'broadcast-logs'
                ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/30 font-black'
                : 'bg-slate-900/80 hover:bg-slate-800 text-indigo-300 border border-indigo-500/30'
            }`}
          >
            <Terminal className="w-4 h-4 text-indigo-400" />
            <span>Broadcast Logs</span>
          </button>

          <button
            onClick={() => setActiveSubTab('contacts')}
            className={`px-3.5 py-2 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center space-x-2 ${
              activeSubTab === 'contacts'
                ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20'
                : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-800'
            }`}
          >
            <Phone className="w-4 h-4" />
            <span>Emergency Contacts</span>
          </button>

          <button
            onClick={() => setActiveSubTab('insurance-alerts')}
            className={`px-3.5 py-2 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center space-x-2 ${
              activeSubTab === 'insurance-alerts'
                ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20'
                : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-800'
            }`}
          >
            <ShieldAlert className="w-4 h-4 text-amber-400" />
            <span>Insurance & Port Alerts</span>
            {healthRecord.insuranceAlerts.length > 0 && (
              <span className="bg-rose-500 text-white text-[10px] font-black px-1.5 py-0.5 rounded-full">
                {healthRecord.insuranceAlerts.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveSubTab('map')}
            className={`px-4 py-2 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center space-x-2 ${
              activeSubTab === 'map'
                ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20'
                : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-800'
            }`}
          >
            <Globe className="w-4 h-4" />
            <span>Smart Health Map</span>
          </button>

          <button
            onClick={() => setActiveSubTab('centres')}
            className={`px-4 py-2 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center space-x-2 ${
              activeSubTab === 'centres'
                ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20'
                : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-800'
            }`}
          >
            <Syringe className="w-4 h-4" />
            <span>Vaccine Clinics ({centresList.length})</span>
          </button>

          <button
            onClick={() => setActiveSubTab('bookings')}
            className={`px-4 py-2 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center space-x-2 ${
              activeSubTab === 'bookings'
                ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20'
                : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-800'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>Bookings</span>
          </button>
        </div>
      </div>

      {/* VIEW SUB-TABS CONTENT */}

      {/* 1. HEALTH OVERVIEW DASHBOARD */}
      {activeSubTab === 'dashboard' && (
        <div className="space-y-6">
          {/* Quick Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2">
              <div className="flex items-center justify-between text-slate-400 text-xs uppercase font-semibold">
                <span>Clearance Status</span>
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
              </div>
              <div className="text-xl font-black text-emerald-400 flex items-center space-x-2">
                <span>WHO ICVP CLEARED</span>
              </div>
              <p className="text-xs text-slate-400">Compliant for air & sea port entry globally</p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2">
              <div className="flex items-center justify-between text-slate-400 text-xs uppercase font-semibold">
                <span>Active Vaccinations</span>
                <Syringe className="w-5 h-5 text-cyan-400" />
              </div>
              <div className="text-2xl font-black text-white">
                {healthRecord.vaccinations.length} Recorded
              </div>
              <p className="text-xs text-emerald-400 font-medium">Yellow Fever + Meningococcal Active</p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2">
              <div className="flex items-center justify-between text-slate-400 text-xs uppercase font-semibold">
                <span>Insurance Coverage</span>
                <CreditCard className="w-5 h-5 text-indigo-400" />
              </div>
              <div className="text-2xl font-black text-indigo-300">
                ${healthRecord.insurancePolicy.maxCoverageUSD.toLocaleString()}
              </div>
              <p className="text-xs text-slate-400">{healthRecord.insurancePolicy.providerName}</p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2">
              <div className="flex items-center justify-between text-slate-400 text-xs uppercase font-semibold">
                <span>Emergency Contacts</span>
                <Phone className="w-5 h-5 text-rose-400" />
              </div>
              <div className="text-2xl font-black text-rose-300">
                {healthRecord.emergencyContacts.length} Linked
              </div>
              <p className="text-xs text-slate-400">Primary: {healthRecord.emergencyContacts[0]?.name}</p>
            </div>
          </div>

          {/* Insurance Alerts Warning Banner if any */}
          {healthRecord.insuranceAlerts.length > 0 && (
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-3xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-6 h-6 text-amber-400 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-extrabold text-amber-300 text-base">Port Insurance Mandate Alert Detected</h4>
                  <p className="text-xs text-slate-300">{healthRecord.insuranceAlerts[0].message}</p>
                </div>
              </div>
              <button
                onClick={() => setActiveSubTab('insurance-alerts')}
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black px-4 py-2 rounded-xl text-xs transition-all flex items-center space-x-1 self-start md:self-auto"
              >
                <span>Compare & Upgrade Coverage</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Health Passport Quick Preview */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="font-extrabold text-base text-white flex items-center space-x-2">
                  <QrCode className="w-5 h-5 text-emerald-400" />
                  <span>Digital Passport QR</span>
                </h3>
                <button
                  onClick={() => setActiveSubTab('passport')}
                  className="text-xs text-emerald-400 font-bold hover:underline"
                >
                  Full View
                </button>
              </div>

              <div className="bg-white p-4 rounded-2xl flex flex-col items-center justify-center space-y-2">
                <div className="w-36 h-36 bg-slate-950 p-2 rounded-xl flex items-center justify-center relative">
                  <div className="grid grid-cols-5 gap-1 w-full h-full p-1">
                    {Array.from({ length: 25 }).map((_, i) => (
                      <div
                        key={i}
                        className={`rounded-sm ${
                          (i * 3) % 2 === 0 ? 'bg-emerald-400' : 'bg-slate-800'
                        }`}
                      />
                    ))}
                  </div>
                  <ShieldCheck className="w-8 h-8 text-emerald-400 absolute" />
                </div>
                <span className="text-[10px] font-mono font-bold text-slate-800">
                  {healthRecord.qrHealthPassHash}
                </span>
              </div>

              <div className="space-y-2 text-xs text-slate-300">
                <div className="flex justify-between border-b border-slate-800/80 pb-1.5">
                  <span className="text-slate-400">Name:</span>
                  <span className="font-bold text-white">{healthRecord.patientName}</span>
                </div>
                <div className="flex justify-between border-b border-slate-800/80 pb-1.5">
                  <span className="text-slate-400">Passport:</span>
                  <span className="font-mono font-bold text-indigo-300">{healthRecord.passportNo}</span>
                </div>
                <div className="flex justify-between border-b border-slate-800/80 pb-1.5">
                  <span className="text-slate-400">Blood Type:</span>
                  <span className="font-bold text-rose-300">{healthRecord.bloodType}</span>
                </div>
              </div>
            </div>

            {/* Recent Medical EHR Logs */}
            <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="font-extrabold text-base text-white flex items-center space-x-2">
                  <FileText className="w-5 h-5 text-emerald-400" />
                  <span>Recent Lab & Diagnostic Reports</span>
                </h3>
                <button
                  onClick={() => setActiveSubTab('records')}
                  className="text-xs text-emerald-400 font-bold hover:underline"
                >
                  View All EHR ({healthRecord.labReports.length})
                </button>
              </div>

              <div className="space-y-3">
                {healthRecord.labReports.slice(0, 3).map((lab) => (
                  <div
                    key={lab.id}
                    className="bg-slate-950 p-4 rounded-2xl border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-white text-sm">{lab.testName}</span>
                        <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-500/30">
                          {lab.category}
                        </span>
                      </div>
                      <p className="text-xs text-slate-300">{lab.resultSummary}</p>
                      <p className="text-[10px] text-slate-500">{lab.performingLab} • {lab.dateSampled}</p>
                    </div>

                    <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-xl self-start sm:self-center">
                      {lab.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. DIGITAL HEALTH PASSPORT (FULL VIEW) */}
      {activeSubTab === 'passport' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <span className="bg-emerald-500/20 text-emerald-400 text-xs font-bold px-3 py-1 rounded-full border border-emerald-500/30">
                  ICAO & WHO OFFICIAL STANDARDS COMPLIANT
                </span>
                <h2 className="text-2xl font-black text-white mt-1 flex items-center space-x-2">
                  <QrCode className="w-6 h-6 text-emerald-400" />
                  <span>Digital Health Passport & Travel Clearance</span>
                </h2>
                <p className="text-xs sm:text-sm text-slate-400">
                  Universal scannable QR code aggregating vaccination certificates, fit-for-duty status, and emergency medical contacts for immigration & port control.
                </p>
              </div>

              <button
                onClick={() => triggerToast('Digital Health Passport Printable PDF Exported!')}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-5 py-2.5 rounded-2xl transition-all text-xs flex items-center space-x-2 self-start sm:self-auto"
              >
                <Download className="w-4 h-4" />
                <span>Export Official PDF</span>
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Official Scannable Card */}
              <div className="bg-gradient-to-b from-slate-950 via-indigo-950/60 to-slate-950 border border-emerald-500/40 rounded-3xl p-6 space-y-6 shadow-2xl relative overflow-hidden">
                <div className="flex items-center justify-between border-b border-emerald-500/20 pb-4">
                  <div>
                    <h3 className="font-extrabold text-white text-base">INTERNATIONAL HEALTH CARD</h3>
                    <p className="text-xs text-indigo-300">Carte Internationale de Vaccination</p>
                  </div>
                  <Award className="w-8 h-8 text-amber-400" />
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-2xl flex flex-col items-center justify-center space-y-3">
                  <div className="w-52 h-52 bg-slate-950 p-3 rounded-2xl flex items-center justify-center relative">
                    <div className="grid grid-cols-6 gap-1 w-full h-full p-2">
                      {Array.from({ length: 36 }).map((_, i) => (
                        <div
                          key={i}
                          className={`rounded-sm ${
                            (i * 7) % 3 === 0 || i % 5 === 0 ? 'bg-emerald-400' : 'bg-slate-800'
                          }`}
                        />
                      ))}
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-slate-900 p-2.5 rounded-2xl border border-emerald-400 shadow-xl">
                        <ShieldCheck className="w-10 h-10 text-emerald-400" />
                      </div>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-800">
                    {healthRecord.qrHealthPassHash}
                  </span>
                </div>

                <div className="text-center space-y-1">
                  <span className="bg-emerald-500/20 text-emerald-400 text-xs font-bold px-3 py-1 rounded-full border border-emerald-500/30 inline-block">
                    ✓ WHO ICVP CLEARED GLOBAL PASS
                  </span>
                  <p className="text-[10px] text-slate-400 pt-1">Validated across 194 Maritime & Aviation Port Authorities</p>
                </div>
              </div>

              {/* Aggregated Patient & Travel Info */}
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 space-y-4">
                  <h4 className="font-extrabold text-lg text-white border-b border-slate-800 pb-3 flex items-center space-x-2">
                    <UserCheck className="w-5 h-5 text-emerald-400" />
                    <span>Identity & Medical Telemetry</span>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="bg-slate-900 p-3.5 rounded-2xl border border-slate-800 space-y-1">
                      <span className="text-slate-400 block">Full Legal Name</span>
                      <span className="font-extrabold text-white text-sm">{healthRecord.patientName}</span>
                    </div>
                    <div className="bg-slate-900 p-3.5 rounded-2xl border border-slate-800 space-y-1">
                      <span className="text-slate-400 block">Passport / Seaman CDC No.</span>
                      <span className="font-mono font-extrabold text-indigo-300 text-sm">{healthRecord.passportNo}</span>
                    </div>
                    <div className="bg-slate-900 p-3.5 rounded-2xl border border-slate-800 space-y-1">
                      <span className="text-slate-400 block">National ID / Resident Reg</span>
                      <span className="font-mono font-bold text-slate-200">{healthRecord.nationalId}</span>
                    </div>
                      <div className="bg-slate-900 p-3.5 rounded-2xl border border-slate-800 space-y-1">
                      <span className="text-slate-400 block">Date of Birth & Gender</span>
                      <span className="font-bold text-white">{healthRecord.dateOfBirth} • {healthRecord.gender}</span>
                    </div>
                    <div className="bg-slate-900 p-3.5 rounded-2xl border border-slate-800 space-y-1">
                      <span className="text-slate-400 block">Blood Group</span>
                      <span className="font-black text-rose-300 text-sm">{healthRecord.bloodType}</span>
                    </div>
                    <div className="bg-slate-900 p-3.5 rounded-2xl border border-slate-800 space-y-1">
                      <span className="text-slate-400 block">Medical Allergies</span>
                      <span className="font-bold text-rose-400">{healthRecord.allergies.join(', ')}</span>
                    </div>
                  </div>
                </div>

                {/* Fit for Duty Certificate */}
                <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 space-y-3">
                  <h4 className="font-extrabold text-base text-white flex items-center space-x-2">
                    <Award className="w-5 h-5 text-amber-400" />
                    <span>STCW Medical Fitness & Travel Clearance Certificate</span>
                  </h4>

                  {healthRecord.fitForDutyCertificates.map((cert) => (
                    <div
                      key={cert.certificateId}
                      className="bg-slate-900 p-4 rounded-2xl border border-slate-800 flex items-center justify-between"
                    >
                      <div>
                        <span className="font-mono text-xs text-indigo-300 font-bold">{cert.certificateId}</span>
                        <h5 className="font-bold text-white text-sm">{cert.issuedBy}</h5>
                        <span className="text-xs text-slate-400">Issued: {cert.issueDate} • Valid {cert.validityYears} Years</span>
                      </div>
                      <span className="bg-emerald-500/20 text-emerald-400 text-xs font-bold px-3 py-1 rounded-full border border-emerald-500/30">
                        {cert.fitStatus}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. DIGITAL MEDICAL RECORDS (EHR) */}
      {activeSubTab === 'records' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h2 className="text-2xl font-black text-white flex items-center space-x-2">
                  <FileText className="w-6 h-6 text-emerald-400" />
                  <span>Digital EHR Medical Records & Prescriptions</span>
                </h2>
                <p className="text-xs sm:text-sm text-slate-400">
                  Comprehensive clinical history, pathology lab reports, EKG cardiac screenings, and ongoing prescription medication logs.
                </p>
              </div>

              <button
                onClick={() => setShowAddRecordModal(true)}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-5 py-2.5 rounded-2xl transition-all text-xs flex items-center space-x-2 self-start sm:self-auto shadow-lg hover:shadow-emerald-500/20"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Lab Report</span>
              </button>
            </div>

            {/* EHR Tabs: Lab Reports & Prescriptions */}
            <div className="space-y-6">
              {/* Lab Reports Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-black text-white flex items-center space-x-2">
                  <Stethoscope className="w-5 h-5 text-cyan-400" />
                  <span>Pathology & Diagnostic Laboratory Reports</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {healthRecord.labReports.map((report) => (
                    <div
                      key={report.id}
                      className="bg-slate-950 border border-slate-800 hover:border-emerald-500/30 rounded-2xl p-5 space-y-3 transition-all"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="bg-indigo-500/20 text-indigo-300 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-indigo-500/30">
                            {report.category}
                          </span>
                          <h4 className="font-bold text-white text-base mt-1">{report.testName}</h4>
                        </div>
                        <span className="bg-emerald-500/20 text-emerald-400 text-xs font-bold px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                          {report.status}
                        </span>
                      </div>

                      <div className="bg-slate-900 p-3 rounded-xl text-xs space-y-1 text-slate-300">
                        <span className="text-slate-400 block font-semibold">Summary & Values:</span>
                        <p className="font-mono text-emerald-300">{report.resultSummary}</p>
                      </div>

                      <div className="flex justify-between items-center text-[11px] text-slate-400 pt-1">
                        <span>{report.performingLab}</span>
                        <span className="font-semibold text-slate-300">{report.dateSampled}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Active Prescriptions Section */}
              <div className="space-y-4 pt-4 border-t border-slate-800">
                <h3 className="text-lg font-black text-white flex items-center space-x-2">
                  <Syringe className="w-5 h-5 text-rose-400" />
                  <span>Active Prescriptions & Refill Schedule</span>
                </h3>

                <div className="space-y-3">
                  {healthRecord.medications.map((med) => (
                    <div
                      key={med.id}
                      className="bg-slate-950 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-white text-base">{med.medicineName}</span>
                          <span className="bg-rose-500/20 text-rose-300 text-xs px-2.5 py-0.5 rounded-full font-semibold border border-rose-500/30">
                            {med.dosage}
                          </span>
                        </div>
                        <p className="text-xs text-slate-300">Purpose: {med.purpose}</p>
                        <p className="text-[11px] text-slate-400">
                          Prescribed by: {med.prescribingDoctor} • Schedule: {med.frequency}
                        </p>
                      </div>

                      <button
                        onClick={() => triggerToast(`Refill Reminder set for ${med.medicineName}!`)}
                        className="bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-bold px-4 py-2 rounded-xl text-xs transition-all flex items-center space-x-1 self-start sm:self-center"
                      >
                        <Bell className="w-3.5 h-3.5 text-amber-400" />
                        <span>Refill Reminder Active</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. EMERGENCY CONTACT INTEGRATION */}
      {activeSubTab === 'contacts' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h2 className="text-2xl font-black text-white flex items-center space-x-2">
                  <Phone className="w-6 h-6 text-rose-400" />
                  <span>Emergency Contacts & Satellite SOS Integration</span>
                </h2>
                <p className="text-xs sm:text-sm text-slate-400">
                  Linked next-of-kin, fleet medical officers, port health liaisons, and 24/7 consular desks for immediate crisis response.
                </p>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  onClick={triggerSosDispatch}
                  className="bg-rose-600 hover:bg-rose-500 text-white font-bold px-4 py-2.5 rounded-2xl transition-all text-xs flex items-center space-x-2"
                >
                  <Siren className="w-4 h-4 text-white animate-pulse" />
                  <span>Trigger SOS Dispatch</span>
                </button>
                <button
                  onClick={() => setShowAddContactModal(true)}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2.5 rounded-2xl transition-all text-xs flex items-center space-x-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Emergency Contact</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {healthRecord.emergencyContacts.map((contact) => (
                <div
                  key={contact.id}
                  className="bg-slate-950 border border-slate-800 hover:border-rose-500/30 rounded-2xl p-5 space-y-4 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="bg-rose-500/20 text-rose-300 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-rose-500/30">
                          {contact.relation}
                        </span>
                        <h4 className="font-extrabold text-white text-lg mt-1">{contact.name}</h4>
                        <p className="text-xs text-slate-400 flex items-center space-x-1">
                          <MapPin className="w-3.5 h-3.5 text-slate-500" />
                          <span>{contact.location}</span>
                        </p>
                      </div>

                      {contact.isPrimarySOS && (
                        <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-500/30">
                          PRIMARY SOS
                        </span>
                      )}
                    </div>

                    <div className="bg-slate-900 p-3 rounded-xl text-xs space-y-1.5 border border-slate-800">
                      <div className="flex items-center space-x-2 text-slate-300 font-mono">
                        <Phone className="w-3.5 h-3.5 text-rose-400" />
                        <span className="font-bold">{contact.phone}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-slate-400 text-[11px]">
                        <Mail className="w-3.5 h-3.5 text-slate-500" />
                        <span>{contact.email}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end pt-2">
                    <button
                      onClick={() => triggerToast(`Emergency Alert SMS Sent to ${contact.name} (${contact.phone})`)}
                      className="bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-bold px-3 py-1.5 rounded-xl text-xs transition-all flex items-center space-x-1"
                    >
                      <Radio className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Send Quick Alert SMS</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 14. MARINE RESCUE DRONE COMMAND & DISPATCH MONITOR */}
      {activeSubTab === 'rescue-drone' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-cyan-500/40 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
              <div>
                <div className="inline-flex items-center space-x-2 bg-cyan-500/15 text-cyan-300 text-xs font-bold px-3 py-1 rounded-full border border-cyan-500/30 mb-2">
                  <Plane className="w-3.5 h-3.5 text-cyan-400" />
                  <span>AUTONOMOUS MARITIME MEDEVAC & RESCUE FLEET</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-white flex items-center space-x-3">
                  <span>Marine Rescue Drone Command Portal</span>
                </h2>
                <p className="text-slate-300 text-xs sm:text-sm max-w-2xl mt-1">
                  Long-range autonomous heavy-lift rescue drones equipped with AED defibrillators, blood plasma, self-inflating liferafts, and real-time HD thermal video links.
                </p>
              </div>

              <button
                onClick={() => setShowLaunchDroneModal(true)}
                className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black px-5 py-2.5 rounded-2xl text-xs transition-all shadow-lg flex items-center space-x-2"
              >
                <Crosshair className="w-4 h-4" />
                <span>Launch Rescue Drone</span>
              </button>
            </div>

            {/* DRONES FLEET CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {rescueDrones.map((drone) => (
                <div
                  key={drone.id}
                  onClick={() => setSelectedDrone(drone)}
                  className={`cursor-pointer rounded-3xl p-5 space-y-4 border transition-all relative overflow-hidden ${
                    selectedDrone.id === drone.id
                      ? 'bg-slate-950 border-cyan-500 shadow-2xl ring-2 ring-cyan-500/40'
                      : 'bg-slate-950/80 border-slate-800 hover:border-cyan-500/40'
                  }`}
                >
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <span className="text-[10px] font-mono text-cyan-400 font-bold">{drone.droneModel}</span>
                    <span className={`text-[10px] font-black font-mono px-2.5 py-0.5 rounded-full border ${
                      drone.status === 'IN_FLIGHT_DISPATCHED'
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 animate-pulse'
                        : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                    }`}>
                      {drone.status.replace('_', ' ')}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-black text-white">{drone.droneName}</h3>
                    <p className="text-xs text-slate-400 mt-1 flex items-center space-x-1">
                      <Zap className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Battery Charge: {drone.batteryPercent}%</span>
                    </p>
                  </div>

                  <div className="bg-slate-900 p-3 rounded-2xl space-y-1 border border-slate-800 text-xs">
                    <span className="text-slate-400 block font-bold text-[10px]">CURRENT PAYLOAD</span>
                    <span className="font-bold text-white block">{drone.payloadType}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                    <div className="bg-slate-900/80 p-2 rounded-xl text-center">
                      <span className="text-slate-400 block text-[9px]">MAX SPEED</span>
                      <span className="font-bold text-cyan-300">{drone.maxSpeedKmh} KM/H</span>
                    </div>
                    <div className="bg-slate-900/80 p-2 rounded-xl text-center">
                      <span className="text-slate-400 block text-[9px]">ETA</span>
                      <span className="font-bold text-amber-300">{drone.estimatedFlightETA}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* DRONE LIVE TELEMETRY & CAMERA FEED MONITOR */}
            <div className="bg-slate-950 border border-cyan-500/40 rounded-3xl p-6 space-y-5 shadow-2xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-cyan-500/20 text-cyan-400 rounded-2xl border border-cyan-500/30">
                    <Plane className="w-6 h-6 animate-pulse" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-cyan-400 font-bold">ACTIVE DRONE TELEMETRY HUD</span>
                    <h3 className="text-xl font-black text-white">{selectedDrone.droneName}</h3>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setRescueDrones(rescueDrones.map(d => d.id === selectedDrone.id ? { ...d, status: 'IN_FLIGHT_DISPATCHED', estimatedFlightETA: '4 Minutes' } : d));
                    triggerToast(`Emergency Dispatch Triggered for ${selectedDrone.droneName}!`);
                  }}
                  className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black px-4 py-2 rounded-xl text-xs transition-all shadow-md flex items-center space-x-1.5"
                >
                  <Crosshair className="w-3.5 h-3.5" />
                  <span>Dispatch To Target GPS</span>
                </button>
              </div>

              {/* SIMULATED CAMERA FEED CANVAS */}
              <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 relative overflow-hidden min-h-[220px] flex flex-col justify-between">
                <div className="absolute top-3 left-3 flex items-center space-x-2 bg-slate-950/80 px-3 py-1 rounded-full border border-cyan-500/30 text-[10px] font-mono text-cyan-300">
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
                  <span>LIVE THERMAL HD OPTICAL LINK 1080P</span>
                </div>

                <div className="absolute top-3 right-3 text-[10px] font-mono text-slate-400 bg-slate-950/80 px-3 py-1 rounded-full border border-slate-800">
                  ALTITUDE: {selectedDrone.currentLocation.altitudeMeters}M
                </div>

                <div className="my-auto text-center space-y-2">
                  <Crosshair className="w-12 h-12 text-cyan-400/40 mx-auto animate-spin" />
                  <p className="text-xs font-mono text-slate-400">
                    TARGET LOCK: {selectedDrone.targetCoordinates.lat}° N, {selectedDrone.targetCoordinates.lng}° E
                  </p>
                  <span className="inline-block bg-cyan-950 text-cyan-300 font-mono text-[11px] px-3 py-1 rounded-full border border-cyan-500/30">
                    Payload Air-Drop Sensor Operational
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-400 border-t border-slate-800/80 pt-3 font-mono">
                  <span>GPS LAT/LNG: {selectedDrone.currentLocation.lat}, {selectedDrone.currentLocation.lng}</span>
                  <span>MAX RANGE: {selectedDrone.flightRangeKm} KM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 15. GEO HAZARD SIMULATION ENGINE */}
      {activeSubTab === 'geo-simulation' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-amber-500/40 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
              <div>
                <div className="inline-flex items-center space-x-2 bg-amber-500/15 text-amber-300 text-xs font-bold px-3 py-1 rounded-full border border-amber-500/30 mb-2">
                  <Flame className="w-3.5 h-3.5 text-amber-400" />
                  <span>PREDICTIVE HYDRO-DYNAMIC & SEISMIC MODELING</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-white flex items-center space-x-3">
                  <span>GEO Hazard Simulation Engine</span>
                </h2>
                <p className="text-slate-300 text-xs sm:text-sm max-w-2xl mt-1">
                  Run scenario simulations for subsea megathrust fault ruptures, underwater landslide tsunami impulses, volcanic ash plume dispersal, and coastal port inundation depth.
                </p>
              </div>
            </div>

            {/* SIMULATION CARDS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {geoSimulations.map((sim) => (
                <div
                  key={sim.id}
                  onClick={() => setSelectedGeoSim(sim)}
                  className={`cursor-pointer rounded-3xl p-5 space-y-4 border transition-all ${
                    selectedGeoSim.id === sim.id
                      ? 'bg-slate-950 border-amber-500 shadow-2xl ring-2 ring-amber-500/40'
                      : 'bg-slate-950/80 border-slate-800 hover:border-amber-500/40'
                  }`}
                >
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <span className="text-[10px] font-mono text-amber-400 font-bold">{sim.hazardType.replace('_', ' ')}</span>
                    <span className="bg-amber-500/20 text-amber-300 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border border-amber-500/30">
                      INTENSITY {sim.intensityScale}/10
                    </span>
                  </div>

                  <h3 className="text-base font-black text-white">{sim.scenarioName}</h3>

                  <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                    <div className="bg-slate-900 p-2.5 rounded-xl text-center border border-slate-800">
                      <span className="text-slate-400 block text-[9px]">INUNDATION DEPTH</span>
                      <span className="font-black text-rose-400 text-sm">{sim.predictedInundationDepthMeters}M</span>
                    </div>
                    <div className="bg-slate-900 p-2.5 rounded-xl text-center border border-slate-800">
                      <span className="text-slate-400 block text-[9px]">WAVE SPEED</span>
                      <span className="font-black text-cyan-300 text-sm">{sim.waveSpeedKmh} KM/H</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* SIMULATION CONTROL & COMPUTATION HUD */}
            <div className="bg-slate-950 border border-amber-500/40 rounded-3xl p-6 space-y-6 shadow-2xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div>
                  <span className="text-xs font-mono text-amber-400 font-bold">HYDRO-DYNAMIC SIMULATION ENGINE</span>
                  <h3 className="text-xl font-black text-white">{selectedGeoSim.scenarioName}</h3>
                </div>

                <button
                  disabled={isSimulatingRun}
                  onClick={() => {
                    setIsSimulatingRun(true);
                    setSimProgress(0);
                    const timer = setInterval(() => {
                      setSimProgress((prev) => {
                        if (prev >= 100) {
                          clearInterval(timer);
                          setIsSimulatingRun(false);
                          triggerToast('GEO Hazard Hydro-Dynamic Simulation Completed!');
                          return 100;
                        }
                        return prev + 25;
                      });
                    }, 400);
                  }}
                  className="bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-black px-6 py-2.5 rounded-2xl text-xs transition-all shadow-lg flex items-center space-x-2"
                >
                  <Flame className="w-4 h-4" />
                  <span>{isSimulatingRun ? 'Computing Wave Dynamics...' : 'Run Hydro-Dynamic Simulation'}</span>
                </button>
              </div>

              {/* SIMULATION PROGRESS BAR */}
              {isSimulatingRun && (
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-mono text-amber-300">
                    <span>Simulating Wave Propagation & Coastal Flooding...</span>
                    <span>{simProgress}%</span>
                  </div>
                  <div className="w-full bg-slate-900 rounded-full h-3 border border-amber-500/30 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-amber-500 to-rose-500 h-full transition-all duration-300"
                      style={{ width: `${simProgress}%` }}
                    ></div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div className="bg-slate-900 p-4 rounded-2xl space-y-1 border border-slate-800">
                  <span className="text-slate-400 block font-bold">Estimated Impacted Radius</span>
                  <span className="font-bold text-white text-base font-mono">{selectedGeoSim.impactedRadiusKm} KM</span>
                </div>
                <div className="bg-slate-900 p-4 rounded-2xl space-y-1 border border-slate-800">
                  <span className="text-slate-400 block font-bold">Affected Population Est.</span>
                  <span className="font-bold text-rose-400 text-base font-mono">{selectedGeoSim.affectedPopulationEst.toLocaleString()} Persons</span>
                </div>
                <div className="bg-slate-900 p-4 rounded-2xl space-y-1 border border-slate-800">
                  <span className="text-slate-400 block font-bold">Recommended Evacuation Route</span>
                  <span className="font-bold text-cyan-300 text-xs leading-relaxed block">{selectedGeoSim.recommendedEvacuationRoute}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 16. TSUNAMI EVACUATION ROUTE MAP & SAFE ZONE SHELTER CITADEL */}
      {activeSubTab === 'tsunami-evac-map' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-rose-500/40 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
              <div>
                <div className="inline-flex items-center space-x-2 bg-rose-500/15 text-rose-300 text-xs font-bold px-3 py-1 rounded-full border border-rose-500/30 mb-2">
                  <Waves className="w-3.5 h-3.5 text-rose-400" />
                  <span>HIGH-ELEVATION REFUGE & EVACUATION NAVIGATION</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-white flex items-center space-x-3">
                  <span>Tsunami Evacuation Route Map</span>
                </h2>
                <p className="text-slate-300 text-xs sm:text-sm max-w-2xl mt-1">
                  High-elevation safe zones (&gt;30m elevation), emergency assembly point addresses, capacity shelters, and step-by-step coastal evacuation routes.
                </p>
              </div>
            </div>

            {/* EVACUATION ZONES CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {tsunamiEvacZones.map((zone) => (
                <div
                  key={zone.id}
                  onClick={() => setSelectedEvacZone(zone)}
                  className={`cursor-pointer rounded-3xl p-5 space-y-4 border transition-all ${
                    selectedEvacZone.id === zone.id
                      ? 'bg-slate-950 border-rose-500 shadow-2xl ring-2 ring-rose-500/40'
                      : 'bg-slate-950/80 border-slate-800 hover:border-rose-500/40'
                  }`}
                >
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <span className={`text-[10px] font-black font-mono px-2.5 py-0.5 rounded-full border ${
                      zone.isSafeZone
                        ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                        : 'bg-rose-500/20 text-rose-400 border-rose-500/40 animate-pulse'
                    }`}>
                      {zone.isSafeZone ? 'SAFE ZONE (>30M)' : 'CRITICAL DANGER ZONE (<10M)'}
                    </span>
                    <span className="text-xs font-mono font-bold text-cyan-300">{zone.elevationMeters}M ELEVATION</span>
                  </div>

                  <h3 className="text-base font-black text-white">{zone.zoneName}</h3>

                  <p className="text-xs text-slate-400 flex items-center space-x-1">
                    <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                    <span>{zone.assemblyPointAddress}</span>
                  </p>

                  <div className="bg-slate-900 p-3 rounded-2xl border border-slate-800 space-y-1 text-xs">
                    <span className="text-slate-400 block font-bold text-[10px]">EVACUATION ROUTE</span>
                    <p className="text-slate-200 text-[11px] leading-relaxed">{zone.evacuationRouteDescription}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* SELECTED SAFE ZONE DETAILED MAP HUD */}
            <div className="bg-slate-950 border border-rose-500/40 rounded-3xl p-6 space-y-5 shadow-2xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-rose-500/20 text-rose-400 rounded-2xl border border-rose-500/30">
                    <Navigation className="w-6 h-6 animate-pulse" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-rose-400 font-bold">SELECTED SHELTER DETAILS</span>
                    <h3 className="text-xl font-black text-white">{selectedEvacZone.zoneName}</h3>
                  </div>
                </div>

                <button
                  onClick={() => triggerToast(`Evacuation route mapped to ${selectedEvacZone.zoneName}! Ascend to elevation >${selectedEvacZone.elevationMeters}m.`)}
                  className="bg-rose-600 hover:bg-rose-500 text-white font-black px-4 py-2 rounded-xl text-xs transition-all shadow-md flex items-center space-x-1.5"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Start Step-by-Step Evacuation Nav</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
                <div className="bg-slate-900 p-4 rounded-2xl space-y-1 border border-slate-800">
                  <span className="text-slate-400 block font-bold">ELEVATION</span>
                  <span className="font-bold text-emerald-400 text-lg font-mono">{selectedEvacZone.elevationMeters} Meters</span>
                </div>
                <div className="bg-slate-900 p-4 rounded-2xl space-y-1 border border-slate-800">
                  <span className="text-slate-400 block font-bold">DISTANCE FROM SHORE</span>
                  <span className="font-bold text-cyan-300 text-lg font-mono">{selectedEvacZone.distanceFromShoreM} Meters</span>
                </div>
                <div className="bg-slate-900 p-4 rounded-2xl space-y-1 border border-slate-800">
                  <span className="text-slate-400 block font-bold">SHELTER HELIPAD</span>
                  <span className="font-bold text-white text-sm">{selectedEvacZone.hasHelipad ? '✅ AVAILABLE' : '❌ NONE'}</span>
                </div>
                <div className="bg-slate-900 p-4 rounded-2xl space-y-1 border border-slate-800">
                  <span className="text-slate-400 block font-bold">FIRST AID STATION</span>
                  <span className="font-bold text-white text-sm">{selectedEvacZone.medicalFirstAidStation ? '✅ FULLY STOCKED' : '❌ NONE'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 17. EMERGENCY BROADCAST AUDIT LOGS */}
      {activeSubTab === 'broadcast-logs' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-indigo-500/40 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
              <div>
                <div className="inline-flex items-center space-x-2 bg-indigo-500/15 text-indigo-300 text-xs font-bold px-3 py-1 rounded-full border border-indigo-500/30 mb-2">
                  <Terminal className="w-3.5 h-3.5 text-indigo-400" />
                  <span>SATELLITE & MARITIME TRANSMISSION AUDIT TRAIL</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-white flex items-center space-x-3">
                  <span>Emergency Broadcast Logs</span>
                </h2>
                <p className="text-slate-300 text-xs sm:text-sm max-w-2xl mt-1">
                  Cryptographically verified broadcast logs for all dispatched satellite emergency pushes, VHF radio broadcasts, cellular CB alerts, and officer acknowledgments.
                </p>
              </div>

              <button
                onClick={() => triggerToast('Emergency Broadcast Audit Logs Exported as Verified PDF / JSON!')}
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-black px-5 py-2.5 rounded-2xl text-xs transition-all shadow-lg flex items-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>Export Audit Logs</span>
              </button>
            </div>

            {/* LOGS TABLE */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-mono">
                    <th className="py-3 px-4">LOG ID</th>
                    <th className="py-3 px-4">TIMESTAMP</th>
                    <th className="py-3 px-4">CHANNEL</th>
                    <th className="py-3 px-4">TRANSMITTER</th>
                    <th className="py-3 px-4">SUMMARY</th>
                    <th className="py-3 px-4">STATUS</th>
                    <th className="py-3 px-4">ACKS</th>
                    <th className="py-3 px-4">CHECKSUM</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-sans text-slate-200">
                  {broadcastLogs.map((log) => (
                    <tr key={log.logId} className="hover:bg-slate-950/60 transition-colors">
                      <td className="py-3.5 px-4 font-mono text-indigo-300 font-bold">{log.logId}</td>
                      <td className="py-3.5 px-4 font-mono text-slate-400">{new Date(log.timestamp).toLocaleString()}</td>
                      <td className="py-3.5 px-4">
                        <span className="bg-indigo-500/20 text-indigo-300 text-[10px] font-mono px-2.5 py-0.5 rounded-full border border-indigo-500/30">
                          {log.broadcastChannel}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-white font-bold">{log.transmitterStation}</td>
                      <td className="py-3.5 px-4 max-w-xs truncate text-slate-300">{log.messageSummary}</td>
                      <td className="py-3.5 px-4">
                        <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border border-emerald-500/30">
                          {log.deliveryStatus}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-mono text-amber-300 font-bold">{log.ackCount}</td>
                      <td className="py-3.5 px-4 font-mono text-slate-400 text-[10px]">{log.checksumHash}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 14. MARINE RESCUE DRONE COMMAND & DISPATCH MONITOR */}
      {activeSubTab === 'rescue-drone' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-cyan-500/40 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
              <div>
                <div className="inline-flex items-center space-x-2 bg-cyan-500/15 text-cyan-300 text-xs font-bold px-3 py-1 rounded-full border border-cyan-500/30 mb-2">
                  <Plane className="w-3.5 h-3.5 text-cyan-400" />
                  <span>AUTONOMOUS MARITIME MEDEVAC & RESCUE FLEET</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-white flex items-center space-x-3">
                  <span>Marine Rescue Drone Command Portal</span>
                </h2>
                <p className="text-slate-300 text-xs sm:text-sm max-w-2xl mt-1">
                  Long-range autonomous heavy-lift rescue drones equipped with AED defibrillators, blood plasma, self-inflating liferafts, and real-time HD thermal video links.
                </p>
              </div>

              <button
                onClick={() => setShowLaunchDroneModal(true)}
                className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black px-5 py-2.5 rounded-2xl text-xs transition-all shadow-lg flex items-center space-x-2"
              >
                <Crosshair className="w-4 h-4" />
                <span>Launch Rescue Drone</span>
              </button>
            </div>

            {/* DRONES FLEET CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {rescueDrones.map((drone) => (
                <div
                  key={drone.id}
                  onClick={() => setSelectedDrone(drone)}
                  className={`cursor-pointer rounded-3xl p-5 space-y-4 border transition-all relative overflow-hidden ${
                    selectedDrone.id === drone.id
                      ? 'bg-slate-950 border-cyan-500 shadow-2xl ring-2 ring-cyan-500/40'
                      : 'bg-slate-950/80 border-slate-800 hover:border-cyan-500/40'
                  }`}
                >
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <span className="text-[10px] font-mono text-cyan-400 font-bold">{drone.droneModel}</span>
                    <span className={`text-[10px] font-black font-mono px-2.5 py-0.5 rounded-full border ${
                      drone.status === 'IN_FLIGHT_DISPATCHED'
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 animate-pulse'
                        : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                    }`}>
                      {drone.status.replace('_', ' ')}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-black text-white">{drone.droneName}</h3>
                    <p className="text-xs text-slate-400 mt-1 flex items-center space-x-1">
                      <Zap className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Battery Charge: {drone.batteryPercent}%</span>
                    </p>
                  </div>

                  <div className="bg-slate-900 p-3 rounded-2xl space-y-1 border border-slate-800 text-xs">
                    <span className="text-slate-400 block font-bold text-[10px]">CURRENT PAYLOAD</span>
                    <span className="font-bold text-white block">{drone.payloadType}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                    <div className="bg-slate-900/80 p-2 rounded-xl text-center">
                      <span className="text-slate-400 block text-[9px]">MAX SPEED</span>
                      <span className="font-bold text-cyan-300">{drone.maxSpeedKmh} KM/H</span>
                    </div>
                    <div className="bg-slate-900/80 p-2 rounded-xl text-center">
                      <span className="text-slate-400 block text-[9px]">ETA</span>
                      <span className="font-bold text-amber-300">{drone.estimatedFlightETA}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* DRONE LIVE TELEMETRY & CAMERA FEED MONITOR */}
            <div className="bg-slate-950 border border-cyan-500/40 rounded-3xl p-6 space-y-5 shadow-2xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-cyan-500/20 text-cyan-400 rounded-2xl border border-cyan-500/30">
                    <Plane className="w-6 h-6 animate-pulse" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-cyan-400 font-bold">ACTIVE DRONE TELEMETRY HUD</span>
                    <h3 className="text-xl font-black text-white">{selectedDrone.droneName}</h3>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setRescueDrones(rescueDrones.map(d => d.id === selectedDrone.id ? { ...d, status: 'IN_FLIGHT_DISPATCHED', estimatedFlightETA: '4 Minutes' } : d));
                    triggerToast(`Emergency Dispatch Triggered for ${selectedDrone.droneName}!`);
                  }}
                  className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black px-4 py-2 rounded-xl text-xs transition-all shadow-md flex items-center space-x-1.5"
                >
                  <Crosshair className="w-3.5 h-3.5" />
                  <span>Dispatch To Target GPS</span>
                </button>
              </div>

              {/* SIMULATED CAMERA FEED CANVAS */}
              <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 relative overflow-hidden min-h-[220px] flex flex-col justify-between">
                <div className="absolute top-3 left-3 flex items-center space-x-2 bg-slate-950/80 px-3 py-1 rounded-full border border-cyan-500/30 text-[10px] font-mono text-cyan-300">
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
                  <span>LIVE THERMAL HD OPTICAL LINK 1080P</span>
                </div>

                <div className="absolute top-3 right-3 text-[10px] font-mono text-slate-400 bg-slate-950/80 px-3 py-1 rounded-full border border-slate-800">
                  ALTITUDE: {selectedDrone.currentLocation.altitudeMeters}M
                </div>

                <div className="my-auto text-center space-y-2">
                  <Crosshair className="w-12 h-12 text-cyan-400/40 mx-auto animate-spin" />
                  <p className="text-xs font-mono text-slate-400">
                    TARGET LOCK: {selectedDrone.targetCoordinates.lat}° N, {selectedDrone.targetCoordinates.lng}° E
                  </p>
                  <span className="inline-block bg-cyan-950 text-cyan-300 font-mono text-[11px] px-3 py-1 rounded-full border border-cyan-500/30">
                    Payload Air-Drop Sensor Operational
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-400 border-t border-slate-800/80 pt-3 font-mono">
                  <span>GPS LAT/LNG: {selectedDrone.currentLocation.lat}, {selectedDrone.currentLocation.lng}</span>
                  <span>MAX RANGE: {selectedDrone.flightRangeKm} KM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 15. GEO HAZARD SIMULATION ENGINE */}
      {activeSubTab === 'geo-simulation' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-amber-500/40 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
              <div>
                <div className="inline-flex items-center space-x-2 bg-amber-500/15 text-amber-300 text-xs font-bold px-3 py-1 rounded-full border border-amber-500/30 mb-2">
                  <Flame className="w-3.5 h-3.5 text-amber-400" />
                  <span>PREDICTIVE HYDRO-DYNAMIC & SEISMIC MODELING</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-white flex items-center space-x-3">
                  <span>GEO Hazard Simulation Engine</span>
                </h2>
                <p className="text-slate-300 text-xs sm:text-sm max-w-2xl mt-1">
                  Run scenario simulations for subsea megathrust fault ruptures, underwater landslide tsunami impulses, volcanic ash plume dispersal, and coastal port inundation depth.
                </p>
              </div>
            </div>

            {/* SIMULATION CARDS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {geoSimulations.map((sim) => (
                <div
                  key={sim.id}
                  onClick={() => setSelectedGeoSim(sim)}
                  className={`cursor-pointer rounded-3xl p-5 space-y-4 border transition-all ${
                    selectedGeoSim.id === sim.id
                      ? 'bg-slate-950 border-amber-500 shadow-2xl ring-2 ring-amber-500/40'
                      : 'bg-slate-950/80 border-slate-800 hover:border-amber-500/40'
                  }`}
                >
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <span className="text-[10px] font-mono text-amber-400 font-bold">{sim.hazardType.replace('_', ' ')}</span>
                    <span className="bg-amber-500/20 text-amber-300 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border border-amber-500/30">
                      INTENSITY {sim.intensityScale}/10
                    </span>
                  </div>

                  <h3 className="text-base font-black text-white">{sim.scenarioName}</h3>

                  <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                    <div className="bg-slate-900 p-2.5 rounded-xl text-center border border-slate-800">
                      <span className="text-slate-400 block text-[9px]">INUNDATION DEPTH</span>
                      <span className="font-black text-rose-400 text-sm">{sim.predictedInundationDepthMeters}M</span>
                    </div>
                    <div className="bg-slate-900 p-2.5 rounded-xl text-center border border-slate-800">
                      <span className="text-slate-400 block text-[9px]">WAVE SPEED</span>
                      <span className="font-black text-cyan-300 text-sm">{sim.waveSpeedKmh} KM/H</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* SIMULATION CONTROL & COMPUTATION HUD */}
            <div className="bg-slate-950 border border-amber-500/40 rounded-3xl p-6 space-y-6 shadow-2xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div>
                  <span className="text-xs font-mono text-amber-400 font-bold">HYDRO-DYNAMIC SIMULATION ENGINE</span>
                  <h3 className="text-xl font-black text-white">{selectedGeoSim.scenarioName}</h3>
                </div>

                <button
                  disabled={isSimulatingRun}
                  onClick={() => {
                    setIsSimulatingRun(true);
                    setSimProgress(0);
                    const timer = setInterval(() => {
                      setSimProgress((prev) => {
                        if (prev >= 100) {
                          clearInterval(timer);
                          setIsSimulatingRun(false);
                          triggerToast('GEO Hazard Hydro-Dynamic Simulation Completed!');
                          return 100;
                        }
                        return prev + 25;
                      });
                    }, 400);
                  }}
                  className="bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-black px-6 py-2.5 rounded-2xl text-xs transition-all shadow-lg flex items-center space-x-2"
                >
                  <Flame className="w-4 h-4" />
                  <span>{isSimulatingRun ? 'Computing Wave Dynamics...' : 'Run Hydro-Dynamic Simulation'}</span>
                </button>
              </div>

              {/* SIMULATION PROGRESS BAR */}
              {isSimulatingRun && (
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-mono text-amber-300">
                    <span>Simulating Wave Propagation & Coastal Flooding...</span>
                    <span>{simProgress}%</span>
                  </div>
                  <div className="w-full bg-slate-900 rounded-full h-3 border border-amber-500/30 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-amber-500 to-rose-500 h-full transition-all duration-300"
                      style={{ width: `${simProgress}%` }}
                    ></div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div className="bg-slate-900 p-4 rounded-2xl space-y-1 border border-slate-800">
                  <span className="text-slate-400 block font-bold">Estimated Impacted Radius</span>
                  <span className="font-bold text-white text-base font-mono">{selectedGeoSim.impactedRadiusKm} KM</span>
                </div>
                <div className="bg-slate-900 p-4 rounded-2xl space-y-1 border border-slate-800">
                  <span className="text-slate-400 block font-bold">Affected Population Est.</span>
                  <span className="font-bold text-rose-400 text-base font-mono">{selectedGeoSim.affectedPopulationEst.toLocaleString()} Persons</span>
                </div>
                <div className="bg-slate-900 p-4 rounded-2xl space-y-1 border border-slate-800">
                  <span className="text-slate-400 block font-bold">Recommended Evacuation Route</span>
                  <span className="font-bold text-cyan-300 text-xs leading-relaxed block">{selectedGeoSim.recommendedEvacuationRoute}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 16. TSUNAMI EVACUATION ROUTE MAP & SAFE ZONE SHELTER CITADEL */}
      {activeSubTab === 'tsunami-evac-map' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-rose-500/40 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
              <div>
                <div className="inline-flex items-center space-x-2 bg-rose-500/15 text-rose-300 text-xs font-bold px-3 py-1 rounded-full border border-rose-500/30 mb-2">
                  <Waves className="w-3.5 h-3.5 text-rose-400" />
                  <span>HIGH-ELEVATION REFUGE & EVACUATION NAVIGATION</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-white flex items-center space-x-3">
                  <span>Tsunami Evacuation Route Map</span>
                </h2>
                <p className="text-slate-300 text-xs sm:text-sm max-w-2xl mt-1">
                  High-elevation safe zones (&gt;30m elevation), emergency assembly point addresses, capacity shelters, and step-by-step coastal evacuation routes.
                </p>
              </div>
            </div>

            {/* EVACUATION ZONES CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {tsunamiEvacZones.map((zone) => (
                <div
                  key={zone.id}
                  onClick={() => setSelectedEvacZone(zone)}
                  className={`cursor-pointer rounded-3xl p-5 space-y-4 border transition-all ${
                    selectedEvacZone.id === zone.id
                      ? 'bg-slate-950 border-rose-500 shadow-2xl ring-2 ring-rose-500/40'
                      : 'bg-slate-950/80 border-slate-800 hover:border-rose-500/40'
                  }`}
                >
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <span className={`text-[10px] font-black font-mono px-2.5 py-0.5 rounded-full border ${
                      zone.isSafeZone
                        ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                        : 'bg-rose-500/20 text-rose-400 border-rose-500/40 animate-pulse'
                    }`}>
                      {zone.isSafeZone ? 'SAFE ZONE (>30M)' : 'CRITICAL DANGER ZONE (<10M)'}
                    </span>
                    <span className="text-xs font-mono font-bold text-cyan-300">{zone.elevationMeters}M ELEVATION</span>
                  </div>

                  <h3 className="text-base font-black text-white">{zone.zoneName}</h3>

                  <p className="text-xs text-slate-400 flex items-center space-x-1">
                    <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                    <span>{zone.assemblyPointAddress}</span>
                  </p>

                  <div className="bg-slate-900 p-3 rounded-2xl border border-slate-800 space-y-1 text-xs">
                    <span className="text-slate-400 block font-bold text-[10px]">EVACUATION ROUTE</span>
                    <p className="text-slate-200 text-[11px] leading-relaxed">{zone.evacuationRouteDescription}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* SELECTED SAFE ZONE DETAILED MAP HUD */}
            <div className="bg-slate-950 border border-rose-500/40 rounded-3xl p-6 space-y-5 shadow-2xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-rose-500/20 text-rose-400 rounded-2xl border border-rose-500/30">
                    <Navigation className="w-6 h-6 animate-pulse" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-rose-400 font-bold">SELECTED SHELTER DETAILS</span>
                    <h3 className="text-xl font-black text-white">{selectedEvacZone.zoneName}</h3>
                  </div>
                </div>

                <button
                  onClick={() => triggerToast(`Evacuation route mapped to ${selectedEvacZone.zoneName}! Ascend to elevation >${selectedEvacZone.elevationMeters}m.`)}
                  className="bg-rose-600 hover:bg-rose-500 text-white font-black px-4 py-2 rounded-xl text-xs transition-all shadow-md flex items-center space-x-1.5"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Start Step-by-Step Evacuation Nav</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
                <div className="bg-slate-900 p-4 rounded-2xl space-y-1 border border-slate-800">
                  <span className="text-slate-400 block font-bold">ELEVATION</span>
                  <span className="font-bold text-emerald-400 text-lg font-mono">{selectedEvacZone.elevationMeters} Meters</span>
                </div>
                <div className="bg-slate-900 p-4 rounded-2xl space-y-1 border border-slate-800">
                  <span className="text-slate-400 block font-bold">DISTANCE FROM SHORE</span>
                  <span className="font-bold text-cyan-300 text-lg font-mono">{selectedEvacZone.distanceFromShoreM} Meters</span>
                </div>
                <div className="bg-slate-900 p-4 rounded-2xl space-y-1 border border-slate-800">
                  <span className="text-slate-400 block font-bold">SHELTER HELIPAD</span>
                  <span className="font-bold text-white text-sm">{selectedEvacZone.hasHelipad ? '✅ AVAILABLE' : '❌ NONE'}</span>
                </div>
                <div className="bg-slate-900 p-4 rounded-2xl space-y-1 border border-slate-800">
                  <span className="text-slate-400 block font-bold">FIRST AID STATION</span>
                  <span className="font-bold text-white text-sm">{selectedEvacZone.medicalFirstAidStation ? '✅ FULLY STOCKED' : '❌ NONE'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 17. EMERGENCY BROADCAST AUDIT LOGS */}
      {activeSubTab === 'broadcast-logs' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-indigo-500/40 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
              <div>
                <div className="inline-flex items-center space-x-2 bg-indigo-500/15 text-indigo-300 text-xs font-bold px-3 py-1 rounded-full border border-indigo-500/30 mb-2">
                  <Terminal className="w-3.5 h-3.5 text-indigo-400" />
                  <span>SATELLITE & MARITIME TRANSMISSION AUDIT TRAIL</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-white flex items-center space-x-3">
                  <span>Emergency Broadcast Logs</span>
                </h2>
                <p className="text-slate-300 text-xs sm:text-sm max-w-2xl mt-1">
                  Cryptographically verified broadcast logs for all dispatched satellite emergency pushes, VHF radio broadcasts, cellular CB alerts, and officer acknowledgments.
                </p>
              </div>

              <button
                onClick={() => triggerToast('Emergency Broadcast Audit Logs Exported as Verified PDF / JSON!')}
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-black px-5 py-2.5 rounded-2xl text-xs transition-all shadow-lg flex items-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>Export Audit Logs</span>
              </button>
            </div>

            {/* LOGS TABLE */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-mono">
                    <th className="py-3 px-4">LOG ID</th>
                    <th className="py-3 px-4">TIMESTAMP</th>
                    <th className="py-3 px-4">CHANNEL</th>
                    <th className="py-3 px-4">TRANSMITTER</th>
                    <th className="py-3 px-4">SUMMARY</th>
                    <th className="py-3 px-4">STATUS</th>
                    <th className="py-3 px-4">ACKS</th>
                    <th className="py-3 px-4">CHECKSUM</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-sans text-slate-200">
                  {broadcastLogs.map((log) => (
                    <tr key={log.logId} className="hover:bg-slate-950/60 transition-colors">
                      <td className="py-3.5 px-4 font-mono text-indigo-300 font-bold">{log.logId}</td>
                      <td className="py-3.5 px-4 font-mono text-slate-400">{new Date(log.timestamp).toLocaleString()}</td>
                      <td className="py-3.5 px-4">
                        <span className="bg-indigo-500/20 text-indigo-300 text-[10px] font-mono px-2.5 py-0.5 rounded-full border border-indigo-500/30">
                          {log.broadcastChannel}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-white font-bold">{log.transmitterStation}</td>
                      <td className="py-3.5 px-4 max-w-xs truncate text-slate-300">{log.messageSummary}</td>
                      <td className="py-3.5 px-4">
                        <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border border-emerald-500/30">
                          {log.deliveryStatus}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-mono text-amber-300 font-bold">{log.ackCount}</td>
                      <td className="py-3.5 px-4 font-mono text-slate-400 text-[10px]">{log.checksumHash}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 5. BEST INTERNATIONAL MEDICAL INSURANCE ALERT & COMPARISON */}
      {activeSubTab === 'insurance-alerts' && (
        <div className="space-y-6">
          {/* Active Alert Banners */}
          <div className="space-y-3">
            {healthRecord.insuranceAlerts.map((alt) => (
              <div
                key={alt.id}
                className="bg-amber-500/10 border border-amber-500/40 rounded-3xl p-6 space-y-2 shadow-xl"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <ShieldAlert className="w-6 h-6 text-amber-400 flex-shrink-0 animate-bounce" />
                    <h4 className="font-extrabold text-amber-300 text-lg">{alt.title}</h4>
                  </div>
                  <span className="bg-amber-400/20 text-amber-300 text-xs font-bold px-3 py-1 rounded-full border border-amber-400/30">
                    {alt.severity}
                  </span>
                </div>
                <p className="text-sm text-slate-200 pl-9">{alt.message}</p>
                <p className="text-xs text-emerald-400 font-bold pl-9">Action: {alt.actionRequired}</p>
              </div>
            ))}
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h2 className="text-2xl font-black text-white flex items-center space-x-2">
                  <Award className="w-6 h-6 text-indigo-400" />
                  <span>Top International Maritime Health Insurance Plans</span>
                </h2>
                <p className="text-xs sm:text-sm text-slate-400">
                  Compare coverages, direct-pay hospital networks, search-and-rescue air-lift riders, and port compliance mandates.
                </p>
              </div>
            </div>

            {/* Insurance Comparison Matrix */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {insurancePlans.map((plan) => {
                const isCurrent = healthRecord.insurancePolicy.providerName.includes(plan.providerName);

                return (
                  <div
                    key={plan.id}
                    className={`bg-slate-950 border rounded-3xl p-6 space-y-5 transition-all flex flex-col justify-between ${
                      isCurrent
                        ? 'border-emerald-500/60 shadow-xl shadow-emerald-500/10'
                        : 'border-slate-800 hover:border-indigo-500/40'
                    }`}
                  >
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <span className="bg-indigo-500/20 text-indigo-300 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border border-indigo-500/30">
                          {plan.badgeTag}
                        </span>
                        <span className="text-xs font-bold text-amber-400">★ {plan.rating}</span>
                      </div>

                      <div>
                        <h3 className="font-extrabold text-white text-lg leading-snug">{plan.providerName}</h3>
                        <p className="text-xs text-slate-400">{plan.planName}</p>
                      </div>

                      <div className="bg-slate-900 p-3 rounded-2xl border border-slate-800 space-y-1">
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-slate-400">Max Limit:</span>
                          <span className="font-black text-emerald-400 text-sm">${plan.maxCoverageUSD.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-slate-400">Monthly Premium:</span>
                          <span className="font-mono font-bold text-white">${plan.monthlyPremiumUSD}/mo</span>
                        </div>
                      </div>

                      <div className="space-y-1.5 pt-1">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                          Key Plan Highlights:
                        </span>
                        <ul className="space-y-1 text-xs text-slate-300">
                          {plan.keyBenefits.map((b, idx) => (
                            <li key={idx} className="flex items-start space-x-1.5">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-800">
                      {isCurrent ? (
                        <button
                          disabled
                          className="w-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-bold py-2.5 rounded-2xl text-xs cursor-default flex items-center justify-center space-x-1"
                        >
                          <Check className="w-4 h-4" />
                          <span>CURRENT ACTIVE POLICY</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => handleSelectInsurancePlan(plan)}
                          className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2.5 rounded-2xl text-xs transition-all shadow-lg flex items-center justify-center space-x-1"
                        >
                          <span>Switch / Upgrade Policy</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* 6. SMART HEALTH MAP */}
      {activeSubTab === 'map' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-black text-white flex items-center space-x-2">
                  <Globe className="w-6 h-6 text-emerald-400" />
                  <span>Smart Health & Vaccination GIS Radar</span>
                </h2>
                <p className="text-slate-400 text-xs sm:text-sm">
                  Interactive real-time map displaying WHO accredited clinics, airport medical bays, and quarantine stations.
                </p>
              </div>

              <div className="flex items-center space-x-2 text-xs bg-slate-950 p-2 rounded-2xl border border-slate-800">
                <span className="w-3 h-3 rounded-full bg-emerald-400" />
                <span className="text-slate-300 font-semibold">Open 24/7 Hubs</span>
                <span className="w-3 h-3 rounded-full bg-amber-400 ml-2" />
                <span className="text-slate-300 font-semibold">Daytime Clinics</span>
              </div>
            </div>

            {/* SIMULATED MAP CANVAS */}
            <div className="relative w-full h-[450px] bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl flex flex-col justify-between p-6">
              <div
                className="absolute inset-0 opacity-20 pointer-events-none"
                style={{
                  backgroundImage: `radial-gradient(#10b981 1px, transparent 1px)`,
                  backgroundSize: '24px 24px'
                }}
              />

              {centresList.map((centre) => {
                const isSelected = selectedMapCentre.id === centre.id;
                const leftPct = ((centre.coordinates.lng + 180) / 360) * 100;
                const topPct = ((90 - centre.coordinates.lat) / 180) * 100;

                return (
                  <button
                    key={centre.id}
                    onClick={() => setSelectedMapCentre(centre)}
                    style={{ left: `${Math.max(10, Math.min(85, leftPct))}%`, top: `${Math.max(15, Math.min(80, topPct))}%` }}
                    className={`absolute transform -translate-x-1/2 -translate-y-1/2 group transition-all ${
                      isSelected ? 'z-30 scale-125' : 'z-10 hover:scale-110'
                    }`}
                  >
                    <div className="relative flex flex-col items-center">
                      {isSelected && (
                        <span className="absolute -inset-2 rounded-full bg-emerald-500/40 animate-ping" />
                      )}
                      <div
                        className={`p-2 rounded-2xl border shadow-xl flex items-center space-x-1 ${
                          isSelected
                            ? 'bg-emerald-500 text-slate-950 border-white'
                            : centre.operatingHours.includes('24/7')
                            ? 'bg-emerald-600 text-white border-emerald-400'
                            : 'bg-slate-800 text-slate-200 border-slate-700'
                        }`}
                      >
                        <MapPin className="w-4 h-4" />
                        <span className="text-[10px] font-bold uppercase tracking-wider hidden sm:inline">
                          {centre.city}
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })}

              <div className="relative z-20 bg-slate-900/90 backdrop-blur-md border border-slate-800 rounded-2xl p-4 max-w-md shadow-2xl space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-extrabold px-2 py-0.5 rounded-full border border-emerald-500/30">
                      {selectedMapCentre.countryFlag} {selectedMapCentre.category} • {selectedMapCentre.type}
                    </span>
                    <h4 className="text-base font-extrabold text-white mt-1">{selectedMapCentre.name}</h4>
                    <p className="text-xs text-slate-400">{selectedMapCentre.address}</p>
                  </div>
                  <span className="text-xs font-bold text-amber-400 bg-amber-400/10 px-2 py-1 rounded-lg">
                    ★ {selectedMapCentre.rating}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-300 pt-1 border-t border-slate-800">
                  <span className="flex items-center space-x-1 text-slate-400">
                    <Clock className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{selectedMapCentre.operatingHours}</span>
                  </span>
                  <span className="font-semibold text-emerald-300">
                    {selectedMapCentre.availableVaccines.length} Vaccine Types In Stock
                  </span>
                </div>

                <button
                  onClick={() => handleOpenBooking(selectedMapCentre)}
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2 rounded-xl text-xs transition-all flex items-center justify-center space-x-2"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Book Appointment Here</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 7. VACCINATION CENTRES DIRECTORY */}
      {activeSubTab === 'centres' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-4 shadow-xl">
            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="relative flex-1 w-full">
                <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
                <input
                  type="text"
                  placeholder="Search by centre name, city, country, or vaccine..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-2xl pl-12 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/60"
                />
              </div>

              <div className="flex items-center space-x-2 w-full md:w-auto">
                {(['ALL', 'Domestic', 'International'] as const).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                      selectedCategory === cat
                        ? 'bg-emerald-500 text-slate-950 shadow-md'
                        : 'bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800'
                    }`}
                  >
                    {cat === 'ALL' ? 'All Centres' : cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredCentres.map((centre) => (
              <div
                key={centre.id}
                className="bg-slate-900 border border-slate-800 hover:border-emerald-500/40 rounded-3xl p-6 space-y-5 shadow-xl transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-xl">{centre.countryFlag}</span>
                        <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                          {centre.category}
                        </span>
                        <span className="bg-slate-800 text-slate-300 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                          {centre.city}
                        </span>
                      </div>
                      <h3 className="font-extrabold text-lg text-white leading-snug">{centre.name}</h3>
                      <p className="text-xs text-slate-400 flex items-center space-x-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" />
                        <span>{centre.address}</span>
                      </p>
                    </div>

                    <div className="text-right flex-shrink-0">
                      <div className="bg-amber-400/10 text-amber-400 px-2.5 py-1 rounded-xl text-xs font-bold inline-flex items-center space-x-1">
                        <span>★ {centre.rating}</span>
                        <span className="text-slate-500">({centre.reviewsCount})</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-950 p-2.5 rounded-2xl border border-slate-800 text-xs text-slate-300 flex items-center space-x-2">
                    <Award className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span className="font-semibold">{centre.accreditation}</span>
                  </div>

                  <div className="space-y-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                      Available Vaccines & Prices
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      {centre.availableVaccines.slice(0, 4).map((vac, idx) => (
                        <div
                          key={idx}
                          className="bg-slate-950 p-2 rounded-xl border border-slate-800 text-xs flex items-center justify-between"
                        >
                          <span className="font-semibold text-white truncate">{vac.name}</span>
                          <span className="font-mono font-bold text-emerald-400 ml-1">${vac.priceUSD}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
                  <div className="text-xs text-slate-400">
                    <Clock className="w-3.5 h-3.5 text-emerald-400 inline mr-1" />
                    <span>{centre.operatingHours}</span>
                  </div>

                  <button
                    onClick={() => handleOpenBooking(centre)}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2.5 rounded-2xl text-xs transition-all flex items-center space-x-2 shadow-lg hover:shadow-emerald-500/20"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Book Vaccine</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 8. BOOKINGS */}
      {activeSubTab === 'bookings' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h2 className="text-2xl font-black text-white flex items-center space-x-2">
                  <Clock className="w-6 h-6 text-emerald-400" />
                  <span>My Appointment Bookings</span>
                </h2>
                <p className="text-slate-400 text-xs sm:text-sm">
                  Active vaccination clinic appointments, instant QR passes, and insurance billing receipts.
                </p>
              </div>

              <button
                onClick={() => setActiveSubTab('centres')}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-5 py-2.5 rounded-2xl text-xs transition-all flex items-center space-x-2 self-start sm:self-auto"
              >
                <Plus className="w-4 h-4" />
                <span>Book New Appointment</span>
              </button>
            </div>

            {bookings.length === 0 ? (
              <div className="text-center py-12 text-slate-500 space-y-3">
                <Calendar className="w-12 h-12 mx-auto text-slate-600" />
                <p className="font-bold text-lg text-slate-400">No active bookings yet.</p>
                <p className="text-xs">Select a domestic or international centre from the list to schedule an appointment.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {bookings.map((bk) => (
                  <div
                    key={bk.bookingId}
                    className="bg-slate-950 border border-slate-800 hover:border-emerald-500/30 rounded-3xl p-6 space-y-4 transition-all"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
                      <div className="flex items-center space-x-3">
                        <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-2xl border border-emerald-500/20">
                          <Syringe className="w-6 h-6" />
                        </div>
                        <div>
                          <span className="text-xs font-mono font-bold text-indigo-300">{bk.bookingId}</span>
                          <h4 className="text-lg font-black text-white">{bk.vaccineName}</h4>
                          <p className="text-xs text-slate-400">{bk.centreName} • {bk.city}, {bk.country}</p>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="bg-emerald-500/20 text-emerald-400 text-xs font-bold px-3 py-1 rounded-full border border-emerald-500/30">
                          {bk.bookingStatus}
                        </span>
                        <span className="text-xs text-slate-400 block mt-1">
                          Price: ${bk.totalPriceUSD} {bk.insuranceApplied ? '(Insurance Direct Copay)' : ''}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                      <div className="bg-slate-900 p-3 rounded-2xl space-y-1">
                        <span className="text-slate-400 block">Appointment Date & Slot</span>
                        <span className="font-bold text-white">{bk.appointmentDate} • {bk.appointmentSlot}</span>
                      </div>
                      <div className="bg-slate-900 p-3 rounded-2xl space-y-1">
                        <span className="text-slate-400 block">Consultation Mode</span>
                        <span className="font-bold text-emerald-400">{bk.consultationType}</span>
                      </div>
                      <div className="bg-slate-900 p-3 rounded-2xl space-y-1">
                        <span className="text-slate-400 block">QR Gate Pass Code</span>
                        <span className="font-mono font-bold text-indigo-300">{bk.qrBookingCode}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
                      <button
                        onClick={() => triggerToast(`QR Pass ${bk.qrBookingCode} saved!`)}
                        className="bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-bold px-4 py-2 rounded-xl text-xs transition-all flex items-center space-x-1"
                      >
                        <QrCode className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Show QR Gate Pass</span>
                      </button>

                      <button
                        onClick={() => triggerToast(`Receipt for ${bk.bookingId} downloaded!`)}
                        className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2 rounded-xl text-xs transition-all flex items-center space-x-1"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download Confirmation</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* 9. DIGITAL HEALTH LEDGER */}
      {activeSubTab === 'ledger' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-emerald-500/30 rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
              <div>
                <div className="inline-flex items-center space-x-2 bg-emerald-500/15 text-emerald-400 text-xs font-bold px-3 py-1 rounded-full border border-emerald-500/30 mb-2">
                  <Lock className="w-3.5 h-3.5" />
                  <span>IMMUTABLE HEALTH BLOCKCHAIN AUDIT TRAIL</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-white flex items-center space-x-3">
                  <span>Cryptographic Digital Health Ledger</span>
                </h2>
                <p className="text-slate-300 text-xs sm:text-sm max-w-2xl mt-1">
                  Tamper-evident cryptographic ledger recording every ICVP vaccine stamp, pathology lab report, fitness certificate, and satellite SOS audit.
                </p>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  onClick={() => triggerToast('Ledger Integrity Check: 100% Valid (0 Tampered Blocks)')}
                  className="bg-slate-800 hover:bg-slate-700 text-emerald-400 font-bold px-4 py-2.5 rounded-2xl text-xs transition-all border border-emerald-500/30 flex items-center space-x-2"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Verify Integrity</span>
                </button>
                <button
                  onClick={() => setShowAddLedgerModal(true)}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2.5 rounded-2xl text-xs transition-all shadow-lg flex items-center space-x-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Append Ledger Entry</span>
                </button>
              </div>
            </div>

            {/* LEDGER BLOCK CHAIN TIMELINE */}
            <div className="relative space-y-6 before:absolute before:inset-0 before:left-6 sm:before:left-8 before:w-0.5 before:bg-gradient-to-b before:from-emerald-500 before:via-indigo-500 before:to-slate-800">
              {ledgerBlocks.map((block) => (
                <div key={block.blockIndex} className="relative flex items-start space-x-4 sm:space-x-6 pl-2">
                  <div className="z-10 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-slate-950 border-2 border-emerald-500 text-emerald-400 font-black text-xs sm:text-sm shadow-xl shrink-0">
                    #{block.blockIndex}
                  </div>

                  <div className="flex-1 bg-slate-950 border border-slate-800 hover:border-emerald-500/40 rounded-3xl p-5 space-y-3 transition-all shadow-xl">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                            {block.eventType}
                          </span>
                          <span className="text-slate-400 text-xs">{new Date(block.timestamp).toLocaleString()}</span>
                        </div>
                        <h4 className="text-base sm:text-lg font-black text-white mt-1">{block.actionTitle}</h4>
                      </div>

                      <div className="flex items-center space-x-2">
                        <span className="bg-emerald-500/10 text-emerald-400 text-xs font-bold px-3 py-1 rounded-full border border-emerald-500/20 flex items-center space-x-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>CRYPTOGRAPHICALLY VERIFIED</span>
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed font-sans">
                      <strong className="text-slate-200">Issuer Authority:</strong> {block.issuerAuthority}
                    </p>

                    <div className="bg-slate-900/90 p-3 rounded-2xl border border-slate-800/80 space-y-1 font-mono text-[11px]">
                      <div className="flex flex-col sm:flex-row justify-between text-slate-400 gap-1">
                        <span>Block Hash: <strong className="text-emerald-400 break-all">{block.blockHash}</strong></span>
                        <span className="text-slate-500">Prev: {block.previousHash.substring(0, 16)}...</span>
                      </div>
                      <div className="text-slate-300 pt-1 text-xs font-sans">
                        <strong className="text-slate-400 font-mono">Payload Metadata:</strong> {block.metadata}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 10. HEALTH TRENDS ANALYTICS */}
      {activeSubTab === 'trends' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-cyan-500/30 rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
              <div>
                <div className="inline-flex items-center space-x-2 bg-cyan-500/15 text-cyan-300 text-xs font-bold px-3 py-1 rounded-full border border-cyan-500/30 mb-2">
                  <Activity className="w-3.5 h-3.5 animate-pulse" />
                  <span>REAL-TIME PATIENT VITALS TELEMETRY</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-white flex items-center space-x-3">
                  <span>Health Trends & Vitals Analytics</span>
                </h2>
                <p className="text-slate-300 text-xs sm:text-sm max-w-2xl mt-1">
                  Historical telemetry tracking blood pressure, resting heart rate, oxygen saturation ($SpO_2$), hydration level, and lung spirometry FEV1 values over voyage routes.
                </p>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setShowAddVitalsModal(true)}
                  className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold px-5 py-2.5 rounded-2xl text-xs transition-all shadow-lg flex items-center space-x-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Log New Daily Vitals</span>
                </button>
              </div>
            </div>

            {/* KEY METRICS SUMMARY STRIP */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-1 text-center">
                <span className="text-slate-400 text-[11px] font-bold uppercase block">Blood Pressure</span>
                <span className="text-xl font-black text-emerald-400">120/80</span>
                <span className="text-[10px] text-slate-500 block">mmHg • Normal</span>
              </div>
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-1 text-center">
                <span className="text-slate-400 text-[11px] font-bold uppercase block">Resting HR</span>
                <span className="text-xl font-black text-rose-400">67 BPM</span>
                <span className="text-[10px] text-slate-500 block">Optimal Range</span>
              </div>
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-1 text-center">
                <span className="text-slate-400 text-[11px] font-bold uppercase block">Oxygen Sat ($SpO_2$)</span>
                <span className="text-xl font-black text-cyan-400">99%</span>
                <span className="text-[10px] text-slate-500 block">High Oxygenation</span>
              </div>
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-1 text-center">
                <span className="text-slate-400 text-[11px] font-bold uppercase block">Hydration</span>
                <span className="text-xl font-black text-indigo-400">93%</span>
                <span className="text-[10px] text-slate-500 block">Well Hydrated</span>
              </div>
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-1 text-center">
                <span className="text-slate-400 text-[11px] font-bold uppercase block">Spirometry ($FEV_1$)</span>
                <span className="text-xl font-black text-amber-400">88%</span>
                <span className="text-[10px] text-slate-500 block">Asthma Controlled</span>
              </div>
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-1 text-center">
                <span className="text-slate-400 text-[11px] font-bold uppercase block">Stress Index</span>
                <span className="text-xl font-black text-emerald-400">OPTIMAL</span>
                <span className="text-[10px] text-slate-500 block">Fit for Duty</span>
              </div>
            </div>

            {/* VISUAL CHART BARS & TELEMETRY */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* BLOOD PRESSURE & HEART RATE GRAPH */}
              <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-base font-black text-white flex items-center space-x-2">
                    <Heart className="w-4 h-4 text-rose-400" />
                    <span>Blood Pressure & Heart Rate (7-Week Trend)</span>
                  </h4>
                  <span className="text-xs text-slate-400 font-mono">mmHg / BPM</span>
                </div>

                <div className="h-48 flex items-end justify-between gap-3 pt-6 pb-2 border-b border-slate-800 px-2">
                  {healthTrends.map((point, idx) => (
                    <div key={idx} className="flex-1 flex flex-col items-center gap-2 group relative">
                      <div className="w-full flex justify-center items-end gap-1 h-36">
                        {/* Systolic Bar */}
                        <div
                          style={{ height: `${(point.systolicBP / 150) * 100}%` }}
                          className="w-3 bg-emerald-500 rounded-t-md group-hover:bg-emerald-400 transition-all"
                        />
                        {/* Heart Rate Bar */}
                        <div
                          style={{ height: `${(point.heartRateBPM / 100) * 100}%` }}
                          className="w-2 bg-rose-500/80 rounded-t-md group-hover:bg-rose-400 transition-all"
                        />
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono">{point.date}</span>

                      {/* Tooltip */}
                      <div className="absolute bottom-full mb-2 hidden group-hover:block z-30 bg-slate-900 border border-slate-700 text-white text-[10px] p-2 rounded-xl shadow-2xl whitespace-nowrap pointer-events-none">
                        <div>BP: {point.systolicBP}/{point.diastolicBP} mmHg</div>
                        <div>HR: {point.heartRateBPM} BPM</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-center space-x-6 text-xs text-slate-400 pt-1">
                  <div className="flex items-center space-x-2">
                    <span className="w-3 h-3 bg-emerald-500 rounded-sm" />
                    <span>Systolic BP (mmHg)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-3 h-3 bg-rose-500 rounded-sm" />
                    <span>Resting HR (BPM)</span>
                  </div>
                </div>
              </div>

              {/* OXYGEN & HYDRATION TREND */}
              <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-base font-black text-white flex items-center space-x-2">
                    <Activity className="w-4 h-4 text-cyan-400" />
                    <span>Oxygen Saturation ($SpO_2$) & Hydration %</span>
                  </h4>
                  <span className="text-xs text-slate-400 font-mono">Percentage %</span>
                </div>

                <div className="h-48 flex items-end justify-between gap-3 pt-6 pb-2 border-b border-slate-800 px-2">
                  {healthTrends.map((point, idx) => (
                    <div key={idx} className="flex-1 flex flex-col items-center gap-2 group relative">
                      <div className="w-full flex justify-center items-end gap-1 h-36">
                        {/* SpO2 Bar */}
                        <div
                          style={{ height: `${point.oxygenSatSpO2}%` }}
                          className="w-3 bg-cyan-500 rounded-t-md group-hover:bg-cyan-400 transition-all"
                        />
                        {/* Hydration Bar */}
                        <div
                          style={{ height: `${point.hydrationPercent}%` }}
                          className="w-2 bg-indigo-500/80 rounded-t-md group-hover:bg-indigo-400 transition-all"
                        />
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono">{point.date}</span>

                      {/* Tooltip */}
                      <div className="absolute bottom-full mb-2 hidden group-hover:block z-30 bg-slate-900 border border-slate-700 text-white text-[10px] p-2 rounded-xl shadow-2xl whitespace-nowrap pointer-events-none">
                        <div>$SpO_2$: {point.oxygenSatSpO2}%</div>
                        <div>Hydration: {point.hydrationPercent}%</div>
                        <div>Spirometry: {point.spirometryFEV1Percent}%</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-center space-x-6 text-xs text-slate-400 pt-1">
                  <div className="flex items-center space-x-2">
                    <span className="w-3 h-3 bg-cyan-500 rounded-sm" />
                    <span>Oxygen Saturation ($SpO_2$)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-3 h-3 bg-indigo-500 rounded-sm" />
                    <span>Hydration Level %</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 11. INSURANCE COVERAGE MAP */}
      {activeSubTab === 'coverage-map' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-indigo-500/30 rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
              <div>
                <div className="inline-flex items-center space-x-2 bg-indigo-500/15 text-indigo-300 text-xs font-bold px-3 py-1 rounded-full border border-indigo-500/30 mb-2">
                  <Compass className="w-3.5 h-3.5" />
                  <span>MARITIME INSURANCE CASHLESS HOSPITAL NETWORK</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-white flex items-center space-x-3">
                  <span>Global Insurance Direct-Pay Coverage Map</span>
                </h2>
                <p className="text-slate-300 text-xs sm:text-sm max-w-2xl mt-1">
                  GIS map overlays showing cashless direct-pay hospital networks, helicopter Search-and-Rescue evacuation radii, and regional port compliance status.
                </p>
              </div>

              <button
                onClick={() => setActiveSubTab('insurance-alerts')}
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-5 py-2.5 rounded-2xl text-xs transition-all shadow-lg flex items-center space-x-2"
              >
                <ShieldAlert className="w-4 h-4" />
                <span>View Port Policy Mandates</span>
              </button>
            </div>

            {/* MAP ZONES CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {coverageZones.map((zone) => (
                <div
                  key={zone.id}
                  onClick={() => setSelectedCoverageZone(zone)}
                  className={`cursor-pointer rounded-3xl p-5 space-y-4 border transition-all ${
                    selectedCoverageZone.id === zone.id
                      ? 'bg-slate-950 border-indigo-500 shadow-2xl ring-2 ring-indigo-500/30'
                      : 'bg-slate-950/70 border-slate-800 hover:border-indigo-500/40'
                  }`}
                >
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <span className="text-[10px] font-mono font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-full border border-indigo-500/20">
                      {zone.regionCategory}
                    </span>
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                      zone.coverageStatus === 'FULL_COVERAGE_100%'
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : zone.coverageStatus === 'ACTION_REQUIRED_750K_MANDATE'
                        ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                        : 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                    }`}>
                      {zone.coverageStatus.replace('_', ' ')}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-base font-black text-white">{zone.zoneName}</h4>
                    <p className="text-xs text-slate-400 mt-1">{zone.primaryPartnerNetwork}</p>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-slate-800 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Cashless Hospitals:</span>
                      <strong className="text-white font-mono">{zone.guaranteedHospitalsCount} Facilities</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Air SAR Evac Radius:</span>
                      <strong className="text-emerald-400 font-mono">{zone.searchAndRescueHelicopterRadiusKM} KM</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Direct Pay GOP:</span>
                      <strong className="text-emerald-400">Instant Digital Guarantee</strong>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* SELECTED ZONE DETAILS PANEL */}
            <div className="bg-slate-950 border border-indigo-500/40 rounded-3xl p-6 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-indigo-500/20 text-indigo-300 rounded-2xl border border-indigo-500/30">
                    <MapPin className="w-6 h-6 animate-bounce" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-indigo-400 font-bold">SELECTED COVERAGE ZONE</span>
                    <h3 className="text-xl font-black text-white">{selectedCoverageZone.zoneName}</h3>
                  </div>
                </div>

                <button
                  onClick={() => triggerToast(`Cashless hospital directory for ${selectedCoverageZone.zoneName} loaded!`)}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2 rounded-xl text-xs transition-all shadow-md"
                >
                  Download Regional Hospital Directory (PDF)
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div className="bg-slate-900 p-4 rounded-2xl space-y-1">
                  <span className="text-slate-400 block">Primary Network Partner</span>
                  <span className="font-bold text-white text-sm">{selectedCoverageZone.primaryPartnerNetwork}</span>
                </div>
                <div className="bg-slate-900 p-4 rounded-2xl space-y-1">
                  <span className="text-slate-400 block">Helicopter Rescue Coverage</span>
                  <span className="font-bold text-emerald-400 text-sm">{selectedCoverageZone.searchAndRescueHelicopterRadiusKM} KM Offshore Radius</span>
                </div>
                <div className="bg-slate-900 p-4 rounded-2xl space-y-1">
                  <span className="text-slate-400 block">Guaranteed Hospital Facilities</span>
                  <span className="font-bold text-indigo-300 text-sm">{selectedCoverageZone.guaranteedHospitalsCount} Port Hospitals Direct-Pay</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 12. TSUNAMI & UNDERSEA EARTHQUAKE & SUBMARINE VOLCANO WARNING DASHBOARD */}
      {activeSubTab === 'tsunami-warning' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-rose-500/40 rounded-3xl p-6 sm:p-8 space-y-6 relative overflow-hidden shadow-2xl">
            {/* Top Warning Ribbon */}
            <div className="bg-rose-950/90 border border-rose-500/50 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 bg-rose-600/30 text-rose-400 rounded-xl border border-rose-500/40 animate-pulse">
                  <Radio className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-mono text-[10px] text-rose-400 font-bold uppercase tracking-wider block">
                    GLOBAL HYDRO-ACOUSTIC & SEISMIC MONITORING NETWORK ACTIVE
                  </span>
                  <span className="text-white font-bold text-sm">
                    NOAA Pacific Tsunami Warning Center & Inmarsat Buoy Telemetry
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setShowSimulateQuakeModal(true)}
                  className="bg-slate-800 hover:bg-slate-700 text-rose-300 font-bold px-4 py-2 rounded-xl border border-rose-500/30 transition-all flex items-center space-x-1.5"
                >
                  <AlertCircle className="w-4 h-4 text-rose-400" />
                  <span>Simulate Seismic Event</span>
                </button>
                <button
                  onClick={() => {
                    setShowBroadcastModal(true);
                    setBroadcastHeadline('🚨 EVACUATION MANDATE: Tsunami Wave Warning Issued');
                    setBroadcastBody('Immediate vessel deep-water maneuver ordered. Coastal port medical clinics execute immediate high-elevation evacuation.');
                  }}
                  className="bg-rose-600 hover:bg-rose-500 text-white font-bold px-4 py-2 rounded-xl transition-all shadow-lg flex items-center space-x-1.5"
                >
                  <Siren className="w-4 h-4" />
                  <span>Broadcast Evacuation Siren</span>
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
              <div>
                <div className="inline-flex items-center space-x-2 bg-rose-500/20 text-rose-300 text-xs font-bold px-3 py-1 rounded-full border border-rose-500/40 mb-2">
                  <Activity className="w-3.5 h-3.5 text-rose-400 animate-ping" />
                  <span>DEEP-SEA SUBMARINE SEISMIC & VOLCANIC MONITOR</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-white flex items-center space-x-3">
                  <span>Undersea Earthquake & Volcano Warning Dashboard</span>
                </h2>
                <p className="text-slate-300 text-xs sm:text-sm max-w-2xl mt-1">
                  Real-time hydro-acoustic sea-floor pressure sensor telemetry, submarine volcano eruption VEI indices, tsunami wave height predictions, and vessel deep-water evasion guidelines.
                </p>
              </div>
            </div>

            {/* SEISMIC & VOLCANIC EVENT CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {seismicAlerts.map((alert) => (
                <div
                  key={alert.id}
                  onClick={() => setSelectedSeismicAlert(alert)}
                  className={`cursor-pointer rounded-3xl p-6 space-y-4 border transition-all relative overflow-hidden ${
                    selectedSeismicAlert.id === alert.id
                      ? 'bg-slate-950 border-rose-500 shadow-2xl ring-2 ring-rose-500/40'
                      : 'bg-slate-950/80 border-slate-800 hover:border-rose-500/40'
                  }`}
                >
                  <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                    <div className="flex items-center space-x-2">
                      <span className={`text-[10px] font-black font-mono px-2.5 py-0.5 rounded-full border ${
                        alert.severityLevel === 'RED_EVACUATE'
                          ? 'bg-rose-500/20 text-rose-400 border-rose-500/40 animate-pulse'
                          : alert.severityLevel === 'ORANGE_HIGH_ALERT'
                          ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                          : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                      }`}>
                        {alert.severityLevel.replace('_', ' ')}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">{alert.id}</span>
                    </div>

                    <span className="text-xs font-mono font-bold text-rose-400 flex items-center space-x-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>ETA: {alert.estimatedTsunamiETA}</span>
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-black text-white">{alert.title}</h3>
                    <p className="text-xs text-slate-400 mt-1 flex items-center space-x-1">
                      <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                      <span>{alert.locationRegion}</span>
                    </p>
                  </div>

                  {/* METRICS GRID */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs pt-1">
                    <div className="bg-slate-900 p-2.5 rounded-2xl text-center space-y-0.5 border border-slate-800">
                      <span className="text-[10px] text-slate-400 block font-bold">MAGNITUDE</span>
                      <span className="text-base font-black text-rose-400 font-mono">
                        {alert.magnitudeRichter ? `M${alert.magnitudeRichter}` : `VEI ${alert.volcanicVEIIndex}`}
                      </span>
                    </div>

                    <div className="bg-slate-900 p-2.5 rounded-2xl text-center space-y-0.5 border border-slate-800">
                      <span className="text-[10px] text-slate-400 block font-bold">WAVE HEIGHT</span>
                      <span className="text-base font-black text-cyan-400 font-mono">
                        {alert.waveHeightMeters ? `${alert.waveHeightMeters}m` : 'N/A'}
                      </span>
                    </div>

                    <div className="bg-slate-900 p-2.5 rounded-2xl text-center space-y-0.5 border border-slate-800">
                      <span className="text-[10px] text-slate-400 block font-bold">EPICENTER DEPTH</span>
                      <span className="text-base font-black text-indigo-300 font-mono">
                        {alert.depthKM} KM
                      </span>
                    </div>

                    <div className="bg-slate-900 p-2.5 rounded-2xl text-center space-y-0.5 border border-slate-800">
                      <span className="text-[10px] text-slate-400 block font-bold">PORT DISTANCE</span>
                      <span className="text-base font-black text-amber-400 font-mono">
                        {alert.distanceToNearestPortKM} KM
                      </span>
                    </div>
                  </div>

                  <div className="bg-slate-900/90 p-3 rounded-2xl border border-rose-500/20 text-xs text-rose-200 space-y-1">
                    <span className="font-bold block text-rose-400">RECOMMENDED ACTION:</span>
                    <p className="text-[11px] leading-relaxed">{alert.recommendedNavAction}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* SELECTED SEISMIC DETAILED EVACUATION PANEL */}
            <div className="bg-slate-950 border border-rose-500/40 rounded-3xl p-6 space-y-5 shadow-2xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-rose-500/20 text-rose-400 rounded-2xl border border-rose-500/30">
                    <Radio className="w-6 h-6 animate-pulse" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-rose-400 font-bold">SELECTED WARNING DETAILS</span>
                    <h3 className="text-xl font-black text-white">{selectedSeismicAlert.title}</h3>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => triggerToast(`Vessel course updated to deep-water evasion (>200m depth) for ${selectedSeismicAlert.nearestPortName}`)}
                    className="bg-rose-600 hover:bg-rose-500 text-white font-bold px-4 py-2 rounded-xl text-xs transition-all shadow-md flex items-center space-x-1.5"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>Engage Deep-Water Nav Protocol</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div className="bg-slate-900 p-4 rounded-2xl space-y-1">
                  <span className="text-slate-400 block">Nearest Seaport / Maritime Hub</span>
                  <span className="font-bold text-white text-sm">{selectedSeismicAlert.nearestPortName}</span>
                </div>
                <div className="bg-slate-900 p-4 rounded-2xl space-y-1">
                  <span className="text-slate-400 block">Epicenter Coordinates</span>
                  <span className="font-mono font-bold text-indigo-300 text-sm">
                    {selectedSeismicAlert.epicenterCoordinates.lat}° N, {selectedSeismicAlert.epicenterCoordinates.lng}° E
                  </span>
                </div>
                <div className="bg-slate-900 p-4 rounded-2xl space-y-1">
                  <span className="text-slate-400 block">Estimated Tsunami Wave ETA</span>
                  <span className="font-bold text-rose-400 text-sm">{selectedSeismicAlert.estimatedTsunamiETA}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 13. EMERGENCY NOTIFY BROADCAST CONSOLE */}
      {activeSubTab === 'emergency-notify' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-amber-500/40 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
              <div>
                <div className="inline-flex items-center space-x-2 bg-amber-500/15 text-amber-300 text-xs font-bold px-3 py-1 rounded-full border border-amber-500/30 mb-2">
                  <Bell className="w-3.5 h-3.5 text-amber-400" />
                  <span>MULTI-CHANNEL SATELLITE BROADCAST CONSOLE</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-white flex items-center space-x-3">
                  <span>Emergency Notify Broadcast System</span>
                </h2>
                <p className="text-slate-300 text-xs sm:text-sm max-w-2xl mt-1">
                  Instant Emergency Broadcast Push System reaching all fleet vessels, port health directors, and coastal medical clinics across Satellite Push, Cellular CB, and VHF Radio.
                </p>
              </div>

              <button
                onClick={() => {
                  setShowBroadcastModal(true);
                  setBroadcastHeadline('');
                  setBroadcastBody('');
                }}
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black px-5 py-2.5 rounded-2xl text-xs transition-all shadow-lg flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>New Emergency Broadcast</span>
              </button>
            </div>

            {/* BROADCAST CHANNELS BADGES */}
            <div className="flex flex-wrap items-center gap-3 bg-slate-950 p-4 rounded-2xl border border-slate-800 text-xs">
              <span className="text-slate-400 font-bold">Active Transmitters:</span>
              <span className="bg-indigo-500/20 text-indigo-300 font-mono px-3 py-1 rounded-full border border-indigo-500/30 flex items-center space-x-1">
                <Radio className="w-3 h-3" />
                <span>INMARSAT SATELLITE PUSH (ONLINE)</span>
              </span>
              <span className="bg-emerald-500/20 text-emerald-300 font-mono px-3 py-1 rounded-full border border-emerald-500/30 flex items-center space-x-1">
                <Phone className="w-3 h-3" />
                <span>CELLULAR BROADCAST CB (ACTIVE)</span>
              </span>
              <span className="bg-rose-500/20 text-rose-300 font-mono px-3 py-1 rounded-full border border-rose-500/30 flex items-center space-x-1">
                <Zap className="w-3 h-3" />
                <span>MARITIME VHF CH-16 RADIO (LISTENING)</span>
              </span>
            </div>

            {/* EMERGENCY NOTIFICATIONS FEED */}
            <div className="space-y-4">
              {emergencyNotifications.map((notif) => (
                <div
                  key={notif.id}
                  className={`bg-slate-950 border rounded-3xl p-6 space-y-4 transition-all ${
                    notif.urgency === 'IMMEDIATE_LIFE_SAFETY'
                      ? 'border-rose-500/60 shadow-rose-500/10 shadow-xl ring-1 ring-rose-500/30'
                      : 'border-slate-800 hover:border-amber-500/30'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
                    <div className="flex items-center space-x-2">
                      <span className={`text-[10px] font-black font-mono px-2.5 py-0.5 rounded-full border ${
                        notif.urgency === 'IMMEDIATE_LIFE_SAFETY'
                          ? 'bg-rose-500/20 text-rose-400 border-rose-500/40 animate-pulse'
                          : notif.urgency === 'CRITICAL_DISASTER_WARNING'
                          ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                          : 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40'
                      }`}>
                        {notif.urgency.replace('_', ' ')}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">{notif.senderRole.replace('_', ' ')}</span>
                    </div>

                    <div className="flex items-center space-x-2">
                      {notif.isAcknowledgedByOfficer ? (
                        <span className="bg-emerald-500/20 text-emerald-400 text-xs font-bold px-3 py-1 rounded-full border border-emerald-500/30 flex items-center space-x-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>ACKNOWLEDGED BY OFFICER</span>
                        </span>
                      ) : (
                        <button
                          onClick={() => {
                            setEmergencyNotifications(emergencyNotifications.map(n => n.id === notif.id ? { ...n, isAcknowledgedByOfficer: true } : n));
                            triggerToast(`Emergency Notification ${notif.id} Acknowledged!`);
                          }}
                          className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-3.5 py-1 rounded-full text-xs transition-all shadow-md flex items-center space-x-1"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Acknowledge Notification</span>
                        </button>
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-black text-white">{notif.headline}</h3>
                    <p className="text-xs text-slate-300 mt-2 leading-relaxed font-sans">{notif.messageBody}</p>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 text-xs pt-2 border-t border-slate-800/80">
                    <div className="flex items-center space-x-2 text-slate-400">
                      <span>Affected Regions:</span>
                      <span className="font-bold text-white">{notif.affectedRegions.join(', ')}</span>
                    </div>

                    <div className="flex items-center space-x-1 text-slate-500 font-mono text-[11px]">
                      <Clock className="w-3 h-3" />
                      <span>{new Date(notif.timestamp).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* PERSISTENT FLOATING SOS EMERGENCY QUICK-KEY BUTTON */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={triggerSosDispatch}
          className="relative group bg-rose-600 hover:bg-rose-500 text-white font-black px-5 py-3.5 rounded-full shadow-2xl flex items-center space-x-3 border-2 border-rose-400/50 transition-all transform hover:scale-105 active:scale-95"
        >
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-rose-500"></span>
          </span>
          <Siren className="w-5 h-5 text-white animate-pulse" />
          <span className="text-sm tracking-wide">SOS QUICK-KEY</span>
          <span className="bg-rose-950 text-rose-200 text-[10px] font-mono px-2 py-0.5 rounded-full border border-rose-400/30">
            Alt+S
          </span>
        </button>
      </div>

      {/* NEW EMERGENCY NOTIFY & SEISMIC MODALS */}

      {/* BROADCAST EMERGENCY NOTIFY MODAL */}
      <AnimatePresence>
        {showBroadcastModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-900 border border-amber-500/50 rounded-3xl max-w-lg w-full p-6 space-y-6 shadow-2xl relative overflow-hidden"
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-amber-500/20 text-amber-400 rounded-2xl border border-amber-500/30">
                    <Bell className="w-6 h-6 animate-pulse" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-white">Broadcast Emergency Notify</h3>
                    <p className="text-xs text-slate-400">Multi-Channel Satellite Push & VHF Alert</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowBroadcastModal(false)}
                  className="p-2 bg-slate-800 hover:bg-slate-700 rounded-xl text-slate-300"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!broadcastHeadline || !broadcastBody) return;

                  const newNotif: EmergencyNotification = {
                    id: `NOTIF-LIVE-${Date.now()}`,
                    timestamp: new Date().toISOString(),
                    senderRole: broadcastRole,
                    urgency: broadcastUrgency,
                    headline: broadcastHeadline,
                    messageBody: broadcastBody,
                    affectedRegions: ['Indo-Pacific Basin', 'Global Fleet Network'],
                    broadcastChannels: ['SATELLITE_PUSH', 'CELLULAR_CB', 'APP_HUD_BANNER'],
                    isAcknowledgedByOfficer: false
                  };

                  setEmergencyNotifications([newNotif, ...emergencyNotifications]);
                  setShowBroadcastModal(false);
                  setBroadcastHeadline('');
                  setBroadcastBody('');
                  triggerToast('🚨 EMERGENCY NOTIFY BROADCASTED TO ALL FLEET & PORT CHANNELS!');
                }}
                className="space-y-4 text-xs"
              >
                <div className="space-y-1">
                  <label className="font-bold text-slate-300 block">Sender Authority</label>
                  <select
                    value={broadcastRole}
                    onChange={(e) => setBroadcastRole(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="NOAA_PACIFIC_TSUNAMI_CENTER">NOAA Pacific Tsunami Warning Center</option>
                    <option value="PORT_HEALTH_AUTHORITY">Port Health Authority</option>
                    <option value="FLEET_MEDICAL_OFFICER">Fleet Medical Officer</option>
                    <option value="WHO_DISASTER_DESK">WHO Disaster Response Desk</option>
                    <option value="INMARSAT_EARTHQUAKE_BEACON">Inmarsat Earthquake Subsea Beacon</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-300 block">Urgency Level</label>
                  <select
                    value={broadcastUrgency}
                    onChange={(e) => setBroadcastUrgency(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="IMMEDIATE_LIFE_SAFETY">🔴 IMMEDIATE LIFE SAFETY (EVACUATE NOW)</option>
                    <option value="CRITICAL_DISASTER_WARNING">🟠 CRITICAL DISASTER WARNING</option>
                    <option value="PORT_EVACUATION_NOTICE">🟡 PORT EVACUATION NOTICE</option>
                    <option value="HEALTH_SYSTEM_ALERT">🔵 HEALTH SYSTEM ALERT</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-300 block">Broadcast Headline</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 🚨 RED ALERT: Submarine Earthquake M7.8 Tsunami Wave Warning"
                    value={broadcastHeadline}
                    onChange={(e) => setBroadcastHeadline(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-300 block">Detailed Emergency Instructions</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Provide detailed instructions for vessel captains and coastal medical teams..."
                    value={broadcastBody}
                    onChange={(e) => setBroadcastBody(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-black py-3 rounded-2xl text-sm transition-all shadow-xl flex items-center justify-center space-x-2"
                >
                  <Radio className="w-4 h-4" />
                  <span>Transmit Satellite & VHF Broadcast Now</span>
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* SIMULATE QUAKE / SUBMARINE VOLCANO MODAL */}
      <AnimatePresence>
        {showSimulateQuakeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-900 border border-rose-500/50 rounded-3xl max-w-lg w-full p-6 space-y-6 shadow-2xl relative overflow-hidden"
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-rose-500/20 text-rose-400 rounded-2xl border border-rose-500/30">
                    <Radio className="w-6 h-6 animate-pulse" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-white">Simulate Undersea Seismic Event</h3>
                    <p className="text-xs text-slate-400">Trigger Submarine Earthquake & Tsunami Telemetry</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowSimulateQuakeModal(false)}
                  className="p-2 bg-slate-800 hover:bg-slate-700 rounded-xl text-slate-300"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const newAlert: SeismicVolcanoAlert = {
                    id: `ALRT-LIVE-${Date.now().toString().slice(-4)}`,
                    eventType: 'UNDERSEA_EARTHQUAKE',
                    severityLevel: 'RED_EVACUATE',
                    title: simTitle || 'M8.1 Submarine Megathrust Seismic Event',
                    locationRegion: simRegion || 'Sunda Trench & Straits',
                    epicenterCoordinates: { lat: 5.12, lng: 94.20 },
                    depthKM: 12,
                    magnitudeRichter: parseFloat(simMag) || 8.1,
                    waveHeightMeters: parseFloat(simWaveHeight) || 5.2,
                    distanceToNearestPortKM: 140,
                    nearestPortName: 'Port Blair & Malacca Strait Corridor',
                    estimatedTsunamiETA: simETA || '18 Minutes',
                    recommendedNavAction: 'IMMEDIATE DEEP-WATER MANEUVER: Steer vessel to >200m depth water immediately. Activate coastal hospital evacuation.',
                    timestamp: new Date().toISOString(),
                    isActiveWarning: true
                  };

                  setSeismicAlerts([newAlert, ...seismicAlerts]);
                  setSelectedSeismicAlert(newAlert);
                  setShowSimulateQuakeModal(false);
                  triggerToast('🚨 SIMULATED UNDERSEA EARTHQUAKE & TSUNAMI WARNING CREATED!');
                }}
                className="space-y-4 text-xs"
              >
                <div className="space-y-1">
                  <label className="font-bold text-slate-300 block">Seismic Title</label>
                  <input
                    type="text"
                    required
                    value={simTitle}
                    onChange={(e) => setSimTitle(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-rose-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-300 block">Maritime Region / Trench Zone</label>
                  <input
                    type="text"
                    required
                    value={simRegion}
                    onChange={(e) => setSimRegion(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-rose-500"
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-300 block">Richter Mag (M)</label>
                    <input
                      type="text"
                      value={simMag}
                      onChange={(e) => setSimMag(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-rose-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-slate-300 block">Wave Height ($m$)</label>
                    <input
                      type="text"
                      value={simWaveHeight}
                      onChange={(e) => setSimWaveHeight(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-rose-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-slate-300 block">Wave ETA</label>
                    <input
                      type="text"
                      value={simETA}
                      onChange={(e) => setSimETA(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-rose-500"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-rose-600 hover:bg-rose-500 text-white font-black py-3 rounded-2xl text-sm transition-all shadow-xl flex items-center justify-center space-x-2"
                >
                  <Siren className="w-4 h-4" />
                  <span>Inject Undersea Seismic Alert</span>
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* NEW MODALS */}

      {/* MEDICAL SYNC STATUS MODAL */}
      <AnimatePresence>
        {showSyncModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 space-y-6 shadow-2xl relative overflow-hidden"
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-emerald-500/20 text-emerald-400 rounded-2xl border border-emerald-500/30">
                    <RefreshCw className={`w-6 h-6 ${isSyncing ? 'animate-spin' : ''}`} />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-white">Medical Vault Sync Telemetry</h3>
                    <p className="text-xs text-slate-400">Offline Cached Records & Satellite Gateway Link</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowSyncModal(false)}
                  className="p-2 bg-slate-800 hover:bg-slate-700 rounded-xl text-slate-300"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 text-xs">
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
                  <div className="flex justify-between border-b border-slate-800/80 pb-2">
                    <span className="text-slate-400">Connection Mode:</span>
                    <strong className="text-emerald-400 font-mono">🟢 INMARSAT FLEETBROADBAND ACTIVE</strong>
                  </div>
                  <div className="flex justify-between border-b border-slate-800/80 pb-2">
                    <span className="text-slate-400">Last Synced Timestamp:</span>
                    <strong className="text-white font-mono">{syncInfo.lastSyncedAt}</strong>
                  </div>
                  <div className="flex justify-between border-b border-slate-800/80 pb-2">
                    <span className="text-slate-400">Encrypted Device Vault Hash:</span>
                    <strong className="text-indigo-300 font-mono">{syncInfo.encryptedDeviceHash}</strong>
                  </div>
                  <div className="flex justify-between border-b border-slate-800/80 pb-2">
                    <span className="text-slate-400">Pending Local Changes:</span>
                    <strong className="text-emerald-400 font-mono">{syncInfo.offlineQueueCount} (Fully Up-to-Date)</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Local EHR Encrypted Storage:</span>
                    <strong className="text-white font-mono">{syncInfo.storageAllocatedMB} MB Allocated</strong>
                  </div>
                </div>

                <button
                  onClick={handleSyncNow}
                  disabled={isSyncing}
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-2xl text-sm transition-all shadow-xl flex items-center justify-center space-x-2"
                >
                  <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
                  <span>{isSyncing ? 'Synchronizing Medical Records...' : 'Trigger Satellite Sync Now'}</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* LOG DAILY VITALS MODAL */}
      <AnimatePresence>
        {showAddVitalsModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 space-y-6 shadow-2xl relative overflow-hidden"
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <h3 className="text-xl font-black text-white flex items-center space-x-2">
                  <Activity className="w-5 h-5 text-cyan-400" />
                  <span>Log Daily Patient Vitals</span>
                </h3>
                <button
                  onClick={() => setShowAddVitalsModal(false)}
                  className="p-2 bg-slate-800 hover:bg-slate-700 rounded-xl text-slate-300"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const newPoint: HealthTrendMetric = {
                    date: 'Today',
                    systolicBP: parseInt(newSystolic) || 120,
                    diastolicBP: parseInt(newDiastolic) || 80,
                    heartRateBPM: parseInt(newHR) || 68,
                    oxygenSatSpO2: parseInt(newSpO2) || 99,
                    hydrationPercent: parseInt(newHydration) || 94,
                    spirometryFEV1Percent: 89,
                    stressIndexLevel: 'OPTIMAL'
                  };
                  setHealthTrends([...healthTrends, newPoint]);
                  setShowAddVitalsModal(false);
                  triggerToast('Daily Vitals Logged to Patient Telemetry!');
                }}
                className="space-y-4 text-xs"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-300 block">Systolic BP (mmHg)</label>
                    <input
                      type="number"
                      value={newSystolic}
                      onChange={(e) => setNewSystolic(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-slate-300 block">Diastolic BP (mmHg)</label>
                    <input
                      type="number"
                      value={newDiastolic}
                      onChange={(e) => setNewDiastolic(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-300 block">Heart Rate (BPM)</label>
                    <input
                      type="number"
                      value={newHR}
                      onChange={(e) => setNewHR(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-slate-300 block">$SpO_2$ (%)</label>
                    <input
                      type="number"
                      value={newSpO2}
                      onChange={(e) => setNewSpO2(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-slate-300 block">Hydration (%)</label>
                    <input
                      type="number"
                      value={newHydration}
                      onChange={(e) => setNewHydration(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 rounded-2xl text-sm transition-all shadow-xl"
                >
                  Save Vitals Log
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ADD LEDGER ENTRY MODAL */}
      <AnimatePresence>
        {showAddLedgerModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 space-y-6 shadow-2xl relative overflow-hidden"
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <h3 className="text-xl font-black text-white flex items-center space-x-2">
                  <Lock className="w-5 h-5 text-emerald-400" />
                  <span>Append Cryptographic Ledger Entry</span>
                </h3>
                <button
                  onClick={() => setShowAddLedgerModal(false)}
                  className="p-2 bg-slate-800 hover:bg-slate-700 rounded-xl text-slate-300"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!newLedgerTitle) return;

                  const newBlock: HealthLedgerBlock = {
                    blockIndex: ledgerBlocks.length + 1,
                    timestamp: new Date().toISOString(),
                    eventType: newLedgerType,
                    actionTitle: newLedgerTitle,
                    issuerAuthority: newLedgerAuthority || 'Port Health Medical Office',
                    previousHash: ledgerBlocks[ledgerBlocks.length - 1]?.blockHash || '00000000000000000000',
                    blockHash: `hash-block-${Date.now()}-${Math.floor(Math.random() * 100000)}`,
                    isCryptographicallyVerified: true,
                    metadata: newLedgerMetadata || 'Verified Medical Event Entry'
                  };

                  setLedgerBlocks([...ledgerBlocks, newBlock]);
                  setShowAddLedgerModal(false);
                  setNewLedgerTitle('');
                  setNewLedgerAuthority('');
                  setNewLedgerMetadata('');
                  triggerToast('New Event Block Cryptographically Appended to Digital Health Ledger!');
                }}
                className="space-y-4 text-xs"
              >
                <div className="space-y-1">
                  <label className="font-bold text-slate-300 block">Event Type</label>
                  <select
                    value={newLedgerType}
                    onChange={(e) => setNewLedgerType(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="ICVP_VACCINE_STAMP">ICVP Vaccine Stamp</option>
                    <option value="LAB_EHR_RECORD">Lab EHR Record</option>
                    <option value="FIT_FOR_DUTY_CERT">Fit for Duty Certificate</option>
                    <option value="INSURANCE_POLICY_VERIFICATION">Insurance Policy Verification</option>
                    <option value="SATELLITE_SOS_AUDIT">Satellite SOS Audit</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-300 block">Event / Certificate Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. PCR Serology Test & Fit-to-Fly Stamp"
                    value={newLedgerTitle}
                    onChange={(e) => setNewLedgerTitle(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-300 block">Issuing Authority</label>
                  <input
                    type="text"
                    placeholder="e.g., Port Quarantine Health Desk / Raffles Lab"
                    value={newLedgerAuthority}
                    onChange={(e) => setNewLedgerAuthority(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-300 block">Payload Metadata</label>
                  <input
                    type="text"
                    placeholder="e.g., Result: NEGATIVE | Doctor Signed"
                    value={newLedgerMetadata}
                    onChange={(e) => setNewLedgerMetadata(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-2xl text-sm transition-all shadow-xl"
                >
                  Append Block to Ledger
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODALS */}

      {/* 1. BOOKING MODAL */}
      <AnimatePresence>
        {showBookingModal && targetCentreForBooking && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-900 border border-slate-800 rounded-3xl max-w-xl w-full p-6 space-y-6 shadow-2xl relative overflow-hidden"
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                    APPOINTMENT BOOKING
                  </span>
                  <h3 className="text-xl font-black text-white mt-1">{targetCentreForBooking.name}</h3>
                  <p className="text-xs text-slate-400">{targetCentreForBooking.address}</p>
                </div>
                <button
                  onClick={() => setShowBookingModal(false)}
                  className="p-2 bg-slate-800 hover:bg-slate-700 rounded-xl text-slate-300"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {bookingSuccessCode ? (
                <div className="text-center py-6 space-y-4">
                  <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto text-emerald-400 border border-emerald-500/30">
                    <CheckCircle2 className="w-10 h-10 animate-bounce" />
                  </div>
                  <h4 className="text-2xl font-black text-white">Booking Confirmed!</h4>
                  <p className="text-xs text-slate-300 max-w-md mx-auto">
                    Your appointment has been registered with the WHO-certified travel clinic. Present your QR code upon arrival for express priority entry.
                  </p>

                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-left text-xs space-y-2">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Booking Reference:</span>
                      <span className="font-mono font-bold text-indigo-300">{bookingSuccessCode}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Vaccine:</span>
                      <span className="font-bold text-white">{selectedVaccineForBooking}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Date & Slot:</span>
                      <span className="font-bold text-emerald-400">{bookingDate} @ {bookingTimeSlot}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setShowBookingModal(false);
                      setActiveSubTab('bookings');
                    }}
                    className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-2xl text-sm transition-all shadow-lg"
                  >
                    View in My Appointments
                  </button>
                </div>
              ) : (
                <form onSubmit={handleConfirmBooking} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-300 block">Select Required Vaccine</label>
                    <select
                      value={selectedVaccineForBooking}
                      onChange={(e) => setSelectedVaccineForBooking(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-3 text-sm text-white focus:outline-none focus:border-emerald-500"
                    >
                      {targetCentreForBooking.availableVaccines.map((v, i) => (
                        <option key={i} value={v.name}>
                          {v.name} (${v.priceUSD}) {v.inStock ? '• In Stock' : ''}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-300 block">Date</label>
                      <input
                        type="date"
                        value={bookingDate}
                        onChange={(e) => setBookingDate(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-3 text-sm text-white focus:outline-none focus:border-emerald-500"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-300 block">Time Slot</label>
                      <select
                        value={bookingTimeSlot}
                        onChange={(e) => setBookingTimeSlot(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-3 text-sm text-white focus:outline-none focus:border-emerald-500"
                      >
                        <option value="09:00 AM - 09:30 AM">09:00 AM - 09:30 AM</option>
                        <option value="10:00 AM - 10:30 AM">10:00 AM - 10:30 AM</option>
                        <option value="02:00 PM - 02:30 PM">02:00 PM - 02:30 PM</option>
                        <option value="05:00 PM - 05:30 PM">05:00 PM - 05:30 PM</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-300 block">Consultation Type</label>
                    <div className="grid grid-cols-3 gap-2">
                      {(['In-Clinic', 'Express Drive-Thru', 'Port / Airport On-Site'] as const).map((mode) => (
                        <button
                          type="button"
                          key={mode}
                          onClick={() => setConsultationType(mode)}
                          className={`p-2.5 rounded-xl text-xs font-bold border transition-all ${
                            consultationType === mode
                              ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500'
                              : 'bg-slate-950 text-slate-400 border-slate-800'
                          }`}
                        >
                          {mode}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-xs text-white block">Apply Allianz Maritime Insurance</span>
                      <span className="text-[10px] text-emerald-400">80% Copay Auto-Covered by Active Policy</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setUseInsurance(!useInsurance)}
                      className={`w-12 h-6 rounded-full transition-colors p-1 flex items-center ${
                        useInsurance ? 'bg-emerald-500 justify-end' : 'bg-slate-800 justify-start'
                      }`}
                    >
                      <span className="w-4 h-4 rounded-full bg-white shadow-md" />
                    </button>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 rounded-2xl text-sm transition-all shadow-xl"
                  >
                    Confirm & Reserve Appointment
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 2. ADD LAB REPORT MODAL */}
      <AnimatePresence>
        {showAddRecordModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 space-y-5 shadow-2xl relative"
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-xl font-black text-white flex items-center space-x-2">
                  <FileText className="w-5 h-5 text-emerald-400" />
                  <span>Add Digital EHR Record</span>
                </h3>
                <button
                  onClick={() => setShowAddRecordModal(false)}
                  className="p-2 bg-slate-800 hover:bg-slate-700 rounded-xl text-slate-300"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAddLabRecord} className="space-y-4 text-xs">
                <div className="space-y-1">
                  <label className="font-bold text-slate-300 block">Test / Diagnostic Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Dengue NS1 Antigen or Cardiac Stress Test"
                    value={newLabName}
                    onChange={(e) => setNewLabName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-300 block">Category</label>
                  <select
                    value={newLabCategory}
                    onChange={(e) => setNewLabCategory(e.target.value as LabTestReport['category'])}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Blood Work">Blood Work</option>
                    <option value="Serology & Antibodies">Serology & Antibodies</option>
                    <option value="EKG & Cardiac">EKG & Cardiac</option>
                    <option value="Respiratory & Lung">Respiratory & Lung</option>
                    <option value="Toxicology & Drug Screen">Toxicology & Drug Screen</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-300 block">Result Summary & Clinical Parameters</label>
                  <textarea
                    rows={3}
                    placeholder="e.g., Negative for NS1 antigen. Platelets 220,000. All normal."
                    value={newLabSummary}
                    onChange={(e) => setNewLabSummary(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-300 block">Performing Laboratory / Clinic Facility</label>
                  <input
                    type="text"
                    placeholder="e.g., Singapore Port Health Pathology Wing"
                    value={newLabPerforming}
                    onChange={(e) => setNewLabPerforming(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-2xl text-sm transition-all shadow-xl"
                >
                  Save to Electronic Health Record
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 3. ADD EMERGENCY CONTACT MODAL */}
      <AnimatePresence>
        {showAddContactModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 space-y-5 shadow-2xl relative"
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-xl font-black text-white flex items-center space-x-2">
                  <Phone className="w-5 h-5 text-rose-400" />
                  <span>Link New Emergency Contact</span>
                </h3>
                <button
                  onClick={() => setShowAddContactModal(false)}
                  className="p-2 bg-slate-800 hover:bg-slate-700 rounded-xl text-slate-300"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAddEmergencyContact} className="space-y-4 text-xs">
                <div className="space-y-1">
                  <label className="font-bold text-slate-300 block">Contact Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Dr. Marcus Vance"
                    value={newContactName}
                    onChange={(e) => setNewContactName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-rose-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-300 block">Relationship Role</label>
                  <select
                    value={newContactRelation}
                    onChange={(e) => setNewContactRelation(e.target.value as EmergencyMedicalContact['relation'])}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-rose-500"
                  >
                    <option value="Spouse / Next of Kin">Spouse / Next of Kin</option>
                    <option value="Fleet Medical Officer">Fleet Medical Officer</option>
                    <option value="Port Health Liaison">Port Health Liaison</option>
                    <option value="Embassy / Consulate Officer">Embassy / Consulate Officer</option>
                    <option value="Personal Physician">Personal Physician</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-300 block">Phone Number</label>
                    <input
                      type="text"
                      required
                      placeholder="+1 800 555 0199"
                      value={newContactPhone}
                      onChange={(e) => setNewContactPhone(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-rose-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-300 block">Email Address</label>
                    <input
                      type="email"
                      placeholder="medical@support.org"
                      value={newContactEmail}
                      onChange={(e) => setNewContactEmail(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-rose-500"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-300 block">Station / City Location</label>
                  <input
                    type="text"
                    placeholder="e.g., London HQ / Singapore Port Desk"
                    value={newContactLocation}
                    onChange={(e) => setNewContactLocation(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-rose-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-rose-600 hover:bg-rose-500 text-white font-bold py-3 rounded-2xl text-sm transition-all shadow-xl"
                >
                  Link Emergency Contact
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 4. SOS SATELLITE DISPATCH MODAL */}
      <AnimatePresence>
        {showSosModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-900 border border-rose-500/50 rounded-3xl max-w-md w-full p-6 text-center space-y-6 shadow-2xl relative overflow-hidden"
            >
              <div className="w-20 h-20 bg-rose-500/20 rounded-full flex items-center justify-center mx-auto text-rose-400 border border-rose-500/40">
                <Siren className="w-12 h-12 animate-pulse" />
              </div>

              {sosStatus === 'COUNTDOWN' ? (
                <div className="space-y-4">
                  <h3 className="text-2xl font-black text-white">Emergency Satellite SOS</h3>
                  <p className="text-xs text-slate-300">
                    Transmitting encrypted GPS coordinates, blood group, medical allergies, and health passport telemetry to Maritime Search & Rescue and linked contacts.
                  </p>

                  <div className="text-5xl font-black text-rose-400 animate-bounce">
                    {sosCountdown}
                  </div>

                  <button
                    onClick={() => setShowSosModal(false)}
                    className="w-full bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold py-3 rounded-2xl text-xs transition-all border border-slate-700"
                  >
                    Cancel SOS Dispatch
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <h3 className="text-2xl font-black text-emerald-400">SOS DISPATCH BROADCASTED!</h3>
                  <p className="text-xs text-slate-200">
                    Satellite distress packet successfully routed to Coast Guard Medical Desk, Captain Robert Sterling, and Dr. Sarah Vance.
                  </p>

                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-left text-xs space-y-2">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Telemetry Hash:</span>
                      <span className="font-mono text-emerald-400 font-bold">SOS-SAT-99210-GPS</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Current Position:</span>
                      <span className="font-bold text-white">Lat 1.3644, Lng 103.9915</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setShowSosModal(false)}
                    className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-2xl text-xs transition-all shadow-xl"
                  >
                    Close SOS Monitor
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* LAUNCH RESCUE DRONE MODAL */}
      <AnimatePresence>
        {showLaunchDroneModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-900 border border-cyan-500/40 rounded-3xl max-w-md w-full p-6 space-y-6 shadow-2xl relative overflow-hidden"
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <h3 className="text-xl font-black text-white flex items-center space-x-2">
                  <Plane className="w-5 h-5 text-cyan-400" />
                  <span>Launch Rescue Drone Mission</span>
                </h3>
                <button
                  onClick={() => setShowLaunchDroneModal(false)}
                  className="p-2 bg-slate-800 hover:bg-slate-700 rounded-xl text-slate-300"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const newDroneId = `DRN-${Math.floor(100 + Math.random() * 900)}`;
                  const newDrone: MarineRescueDrone = {
                    id: newDroneId,
                    droneName: droneMissionName || 'AeroSea Emergency Scout',
                    droneModel: 'OceanHover Med-X9',
                    status: 'IN_FLIGHT_DISPATCHED',
                    batteryPercent: 100,
                    payloadType: droneMissionPayload,
                    currentLocation: { lat: 1.3521, lng: 103.8198, altitudeMeters: 120 },
                    targetCoordinates: { lat: parseFloat(droneTargetLat) || 1.3644, lng: parseFloat(droneTargetLng) || 103.9915 },
                    estimatedFlightETA: '6 Minutes',
                    maxSpeedKmh: 140,
                    flightRangeKm: 85
                  };

                  setRescueDrones([newDrone, ...rescueDrones]);
                  setSelectedDrone(newDrone);
                  setShowLaunchDroneModal(false);
                  triggerToast(`Autonomous Rescue Drone ${newDrone.droneName} Launched Successfully!`);
                }}
                className="space-y-4 text-xs"
              >
                <div className="space-y-1">
                  <label className="font-bold text-slate-300 block">Mission / Drone Designation</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. AeroSea Emergency Scout Bravo"
                    value={droneMissionName}
                    onChange={(e) => setDroneMissionName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-300 block">Emergency Payload</label>
                  <select
                    value={droneMissionPayload}
                    onChange={(e) => setDroneMissionPayload(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value="AED Defibrillator & Emergency Plasma">AED Defibrillator & Emergency Plasma</option>
                    <option value="Self-Inflating Liferaft & GPS Beacon">Self-Inflating Liferaft & GPS Beacon</option>
                    <option value="Snake & Marine Antivenom Kit">Snake & Marine Antivenom Kit</option>
                    <option value="Thermal Survival Rations & Comm Transceiver">Thermal Survival Rations & Comm Transceiver</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-300 block">Target Latitude</label>
                    <input
                      type="text"
                      value={droneTargetLat}
                      onChange={(e) => setDroneTargetLat(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm font-mono text-cyan-300 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-slate-300 block">Target Longitude</label>
                    <input
                      type="text"
                      value={droneTargetLng}
                      onChange={(e) => setDroneTargetLng(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm font-mono text-cyan-300 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black py-3 rounded-2xl text-xs transition-all shadow-xl flex items-center justify-center space-x-2"
                >
                  <Crosshair className="w-4 h-4" />
                  <span>Launch Drone Mission</span>
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* SOS HAPTIC FEEDBACK VISUAL PULSE OVERLAY */}
      <AnimatePresence>
        {sosHapticActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center border-8 border-rose-500/80 bg-rose-600/10 backdrop-blur-[2px]"
          >
            <div className="bg-rose-950/90 border-2 border-rose-400 text-white font-black px-8 py-5 rounded-3xl shadow-2xl flex items-center space-x-4 animate-bounce">
              <Siren className="w-8 h-8 text-rose-400 animate-spin" />
              <div>
                <span className="block text-xs font-mono text-rose-300 uppercase tracking-widest">HAPTIC SENSORY SOS TRIGGERED</span>
                <span className="text-xl">Vibrating & Transmitting Satellite Pulse...</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
