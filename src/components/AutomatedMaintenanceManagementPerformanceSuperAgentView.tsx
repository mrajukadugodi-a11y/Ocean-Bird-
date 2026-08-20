import React, { useState, useEffect } from 'react';
import { PredictiveEfficiencyDashboard } from './PredictiveEfficiencyDashboard';
import {
  Wrench,
  Bot,
  Sparkles,
  Zap,
  Activity,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ShieldCheck,
  Cpu,
  BarChart3,
  Gauge,
  RefreshCw,
  Sliders,
  Database,
  Layers,
  Settings,
  Flame,
  FileText,
  Printer,
  Download,
  Calendar,
  Box,
  Truck,
  TrendingUp,
  SlidersHorizontal,
  Search,
  Filter,
  ArrowUpRight,
  RotateCcw,
  Plus,
  Send,
  HelpCircle,
  HardDrive,
  Users,
  CheckSquare,
  Bell,
  BellRing,
  PieChart,
  Trash2,
  XCircle,
  Info,
  Wifi,
  Radio,
  Volume2,
  VolumeX,
  ListFilter,
  Sliders as SlidersIcon
} from 'lucide-react';
import { hapticEngine } from '../utils/hapticUtils';

export interface MaintenanceTask {
  id: string;
  subsystem: string;
  vessel: string;
  title: string;
  dueInDays: number;
  priority: 'CRITICAL' | 'HIGH' | 'ROUTINE';
  status: 'PENDING_AI_APPROVAL' | 'IN_PROGRESS' | 'SCHEDULED' | 'COMPLETED';
  healthScore: number;
  partsRequired: string[];
  estimatedCostUSD: number;
  aiRecommendation: string;
}

export interface PerformanceMetric {
  id: string;
  metricName: string;
  currentValue: string;
  targetValue: string;
  unit: string;
  efficiencyPercent: number;
  status: 'OPTIMAL' | 'WARNING' | 'NEEDS_TUNING';
  aiAction: string;
}

export interface SystemLogItem {
  id: string;
  time: string;
  subsystem: 'ENGINE' | 'SATCOM' | 'AI_AGENT' | 'HULL' | 'SAFETY' | 'POWER';
  severity: 'INFO' | 'SUCCESS' | 'WARNING' | 'ERROR' | 'CRITICAL';
  message: string;
  sourceNode: string;
}

export interface StatusNotificationItem {
  id: string;
  time: string;
  title: string;
  subsystem: string;
  severity: 'CRITICAL' | 'WARNING' | 'INFO' | 'SUCCESS';
  description: string;
  isRead: boolean;
  actionUrlRequired?: string;
}

const INITIAL_TASKS: MaintenanceTask[] = [
  {
    id: 'MNT-8801',
    subsystem: 'Main Engine Cylinder #4',
    vessel: 'ULCV Ocean Titan',
    title: 'Exhaust Valve Ultrasonic Cleaning & Seat Grinding',
    dueInDays: 2,
    priority: 'CRITICAL',
    status: 'PENDING_AI_APPROVAL',
    healthScore: 68,
    partsRequired: ['O-Ring Set #4', 'Valve Stem Seal GT-8'],
    estimatedCostUSD: 1450,
    aiRecommendation: 'Execute automated cleaning protocol during next 8-hour anchorage at Singapore Eastern Working Anchorage.'
  },
  {
    id: 'MNT-8802',
    subsystem: 'Hull Hydrodynamics',
    vessel: 'Container Carrier Sea Voyager',
    title: 'Hull Fouling Hydro-Cleaning & Biofilm Inspection',
    dueInDays: 5,
    priority: 'HIGH',
    status: 'SCHEDULED',
    healthScore: 79,
    partsRequired: ['Silicone Anti-Fouling Touch-up Kit'],
    estimatedCostUSD: 3800,
    aiRecommendation: 'Schedule ROV hull grooming at Port of Colombo. Projected fuel consumption reduction: -4.2%.'
  },
  {
    id: 'MNT-8803',
    subsystem: 'Auxiliary GenSet #2',
    vessel: 'Bunker Hub Malacca Pioneer',
    title: 'Lube Oil Filter Replacement & Bearing Vibration Audit',
    dueInDays: 12,
    priority: 'ROUTINE',
    status: 'IN_PROGRESS',
    healthScore: 92,
    partsRequired: ['Mann Lube Element X4', 'Synthetic ISO VG 100 Oil (200L)'],
    estimatedCostUSD: 850,
    aiRecommendation: 'Routine 2500-hour service. Vibration levels nominal (1.2 mm/s).'
  },
  {
    id: 'MNT-8804',
    subsystem: 'Purifier Room #1',
    vessel: 'ULCV Ocean Titan',
    title: 'Heavy Fuel Oil Purifier Bowl Maintenance & Disc Stack Descaling',
    dueInDays: 18,
    priority: 'ROUTINE',
    status: 'COMPLETED',
    healthScore: 98,
    partsRequired: ['Gasket Repair Kit Alfa-Laval S821'],
    estimatedCostUSD: 620,
    aiRecommendation: 'Completed by Chief Engineer team. Separator efficiency restored to 99.8%.'
  }
];

const INITIAL_PERFORMANCE: PerformanceMetric[] = [
  {
    id: 'PRF-01',
    metricName: 'Specific Fuel Oil Consumption (SFOC)',
    currentValue: '168.4',
    targetValue: '165.0',
    unit: 'g/kWh',
    efficiencyPercent: 96.2,
    status: 'OPTIMAL',
    aiAction: 'AI auto-adjusted fuel injection timing offset (+0.8° BTDC) to optimize peak combustion pressure.'
  },
  {
    id: 'PRF-02',
    metricName: 'Propeller Slip Rate',
    currentValue: '2.1',
    targetValue: '< 3.0',
    unit: '%',
    efficiencyPercent: 98.0,
    status: 'OPTIMAL',
    aiAction: 'Pitch ratio dynamic control synchronized with shaft RPM (102 RPM at 19.4 knots).'
  },
  {
    id: 'PRF-03',
    metricName: 'Thermal Efficiency Ratio (EEDI)',
    currentValue: '48.2',
    targetValue: '> 50.0',
    unit: '%',
    efficiencyPercent: 88.5,
    status: 'WARNING',
    aiAction: 'Waste Heat Recovery System (WHRS) steam turbine bypass engaged to boost auxiliary electrical output.'
  },
  {
    id: 'PRF-04',
    metricName: 'Cold-Ironing Shore Power Grid Load',
    currentValue: '2.4',
    targetValue: '2.5',
    unit: 'MW',
    efficiencyPercent: 99.1,
    status: 'OPTIMAL',
    aiAction: 'Zero-emission port power connection synchronized at Mumbai JNPT Terminal Berth #3.'
  }
];

const INITIAL_SYSTEM_LOGS: SystemLogItem[] = [
  { id: 'LOG-1000', time: '22:49:02', subsystem: 'AI_AGENT', severity: 'SUCCESS', message: 'Super Master AI Anti-Piracy Sensor Node: 360° MMW doppler radar & FLIR optical thermal skiff scanner nominal.', sourceNode: 'Piracy-Detector-Sensor-Node' },
  { id: 'LOG-1001', time: '22:48:10', subsystem: 'ENGINE', severity: 'INFO', message: 'Main Engine Cylinder #4 temperature sampled: 382°C (Nominal range).', sourceNode: 'EngineRoom-Node-1' },
  { id: 'LOG-1002', time: '22:47:35', subsystem: 'SATCOM', severity: 'SUCCESS', message: 'Starlink Maritime Ku-Band link upgraded to 220 Mbps low-latency uplink.', sourceNode: 'SatCom-Dome-Alpha' },
  { id: 'LOG-1003', time: '22:46:12', subsystem: 'AI_AGENT', severity: 'SUCCESS', message: 'Super Master AI completed 10,000-state propulsion optimization matrix run.', sourceNode: 'Core-AI-Server' },
  { id: 'LOG-1004', time: '22:45:00', subsystem: 'HULL', severity: 'WARNING', message: 'Hydrodynamic drag coefficient increased +1.4% due to localized bio-fouling near rudder stock.', sourceNode: 'Sonar-Hull-Array' },
  { id: 'LOG-1005', time: '22:42:19', subsystem: 'POWER', severity: 'INFO', message: 'Auxiliary GenSet #2 synchronized with main switchboard at 440V 60Hz.', sourceNode: 'PowerGrid-Master' },
  { id: 'LOG-1006', time: '22:38:50', subsystem: 'SAFETY', severity: 'CRITICAL', message: 'Fire damper #3 auto-test pinged warning: Solenoid response time 1.8s (>1.5s threshold). Scheduled maintenance order created.', sourceNode: 'Safety-PLC-03' }
];

const INITIAL_NOTIFICATIONS: StatusNotificationItem[] = [
  {
    id: 'NOTIF-900',
    time: 'Just now',
    title: 'Super Master AI Anti-Piracy Sensor Guard Armed',
    subsystem: 'Security & Anti-Piracy',
    severity: 'SUCCESS',
    description: 'Autonomous multi-spectral radar & hydro-acoustic hull sensors active for High Risk Area (HRA) transit.',
    isRead: false
  },
  {
    id: 'NOTIF-901',
    time: '2 mins ago',
    title: 'Main Engine Cylinder #4 Pre-emptive Service Warning',
    subsystem: 'Main Propulsion',
    severity: 'WARNING',
    description: 'Exhaust gas delta pressure reached 0.14 bar. AI recommends valve cleaning at next port call.',
    isRead: false
  },
  {
    id: 'NOTIF-902',
    time: '8 mins ago',
    title: 'Starlink Maritime High-Speed Telemetry Online',
    subsystem: 'SatCom Navigation',
    severity: 'SUCCESS',
    description: 'Bandwidth auto-routed to active vessel AI logs. Latency reduced to 38ms.',
    isRead: false
  },
  {
    id: 'NOTIF-903',
    time: '15 mins ago',
    title: 'SOLAS Safety Drill Compliance Automated Certification',
    subsystem: 'Safety & Compliance',
    severity: 'INFO',
    description: 'Quarterly abandon ship & fire drill logs validated with zero discrepancies.',
    isRead: true
  },
  {
    id: 'NOTIF-904',
    time: '32 mins ago',
    title: 'Reefer Bay #14 Temperature Stabilization',
    subsystem: 'Cargo Cold Chain',
    severity: 'SUCCESS',
    description: 'AI Super Master Agent automatically adjusted chilled water flow valve +12%. Temp fixed at -22.0°C.',
    isRead: true
  }
];

export interface PerformanceAlertItem {
  id: string;
  timestamp: string;
  vessel: string;
  subsystem: string;
  metricName: string;
  currentValue: string;
  thresholdLimit: string;
  severity: 'CRITICAL' | 'WARNING' | 'NEEDS_MITIGATION';
  status: 'ACTIVE_ALERT' | 'AUTO_MITIGATED' | 'RESOLVED';
  aiMitigationPlan: string;
  rootCause: string;
}

export interface UsageMetricCategory {
  category: string;
  usedAmount: string;
  quotaLimit: string;
  percentageUsed: number;
  costEfficiencyGain: string;
  status: 'OPTIMAL' | 'EFFICIENT' | 'NEAR_LIMIT';
  description: string;
}

const INITIAL_PERFORMANCE_ALERTS: PerformanceAlertItem[] = [
  {
    id: 'ALT-501',
    timestamp: '22:52:14',
    vessel: 'ULCV Ocean Titan',
    subsystem: 'Main Engine Cylinder #4',
    metricName: 'SFOC Variance Delta',
    currentValue: '172.8 g/kWh (+3.5%)',
    thresholdLimit: '168.0 g/kWh',
    severity: 'CRITICAL',
    status: 'ACTIVE_ALERT',
    aiMitigationPlan: 'Auto-adjust fuel injection timing offset to +0.9° BTDC & recalculate exhaust valve clearance.',
    rootCause: 'Exhaust valve seat fouling inducing minor backpressure resistance.'
  },
  {
    id: 'ALT-502',
    timestamp: '22:45:30',
    vessel: 'Container Carrier Sea Voyager',
    subsystem: 'Propeller & Shafting',
    metricName: 'Propeller Hydrodynamic Slip Spike',
    currentValue: '3.6%',
    thresholdLimit: '3.0%',
    severity: 'WARNING',
    status: 'ACTIVE_ALERT',
    aiMitigationPlan: 'Recalibrate controllable pitch propeller angle (-0.4°) to match current swell direction.',
    rootCause: 'Head sea wave resistance encountering 24-knot headwinds in Malacca Strait.'
  },
  {
    id: 'ALT-503',
    timestamp: '22:30:10',
    vessel: 'Bunker Hub Malacca Pioneer',
    subsystem: 'Auxiliary GenSet #2',
    metricName: 'Lube Oil Pressure Fluctuation',
    currentValue: '4.1 bar',
    thresholdLimit: '4.5 bar',
    severity: 'NEEDS_MITIGATION',
    status: 'AUTO_MITIGATED',
    aiMitigationPlan: 'AI Super Master Agent automatically switched auxiliary lube pump #2 into parallel mode.',
    rootCause: 'Filter element clogging (resolved automatically by valve crossover).'
  }
];

const INITIAL_USAGE_METRICS: UsageMetricCategory[] = [
  {
    category: 'Super Master AI Inference Tokens',
    usedAmount: '1.84M Tokens',
    quotaLimit: '10.0M Tokens',
    percentageUsed: 18.4,
    costEfficiencyGain: '+98.2% vs Manual Chief Engineer Hours',
    status: 'OPTIMAL',
    description: 'Autonomous neural sub-agents processing 24/7 predictive maintenance & route optimization.'
  },
  {
    category: 'SatCom Ku-Band Bandwidth Consumption',
    usedAmount: '18.6 GB',
    quotaLimit: '100.0 GB',
    percentageUsed: 18.6,
    costEfficiencyGain: '4.2x Data Compression Ratio',
    status: 'OPTIMAL',
    description: 'Starlink Maritime Ku-Band telemetry streaming encrypted BlackBox telemetry.'
  },
  {
    category: 'Vessel Fuel & Energy Consumption',
    usedAmount: '142.8 MT',
    quotaLimit: '200.0 MT Voyage Quota',
    percentageUsed: 71.4,
    costEfficiencyGain: '14.8 MT Fuel Saved ($11,200 USD)',
    status: 'EFFICIENT',
    description: 'Main engine SFOC dynamic tuning saving 1.8 MT VLSFO per 24 hours.'
  },
  {
    category: 'NVMe BlackBox & Vector Log Storage',
    usedAmount: '28.4 GB',
    quotaLimit: '128.0 GB',
    percentageUsed: 22.1,
    costEfficiencyGain: 'SOLAS 365-Day Log Vault Retention',
    status: 'OPTIMAL',
    description: 'Encrypted local SSD partition storing high-frequency 10Hz engine sensor logs.'
  }
];

export const AutomatedMaintenanceManagementPerformanceSuperAgentView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'SUPER_AI' | 'RESOURCE_MONITOR' | 'SMART_METRICS' | 'PERFORMANCE_OPTIMIZER' | 'PREDICTIVE_INSIGHTS' | 'EFFICIENCY_REPORT' | 'LOG_VISUALIZATION' | 'STATUS_NOTIFICATIONS' | 'PERFORMANCE_ALERTS' | 'MAINTENANCE' | 'PERFORMANCE' | 'MANAGEMENT'>('SUPER_AI');
  const [tasks, setTasks] = useState<MaintenanceTask[]>(INITIAL_TASKS);
  const [performanceData, setPerformanceData] = useState<PerformanceMetric[]>(INITIAL_PERFORMANCE);
  const [systemLogs, setSystemLogs] = useState<SystemLogItem[]>(INITIAL_SYSTEM_LOGS);
  const [notifications, setNotifications] = useState<StatusNotificationItem[]>(INITIAL_NOTIFICATIONS);

  // Auto Scale UI Density State
  const [uiDensity, setUiDensity] = useState<'COMPACT' | 'BALANCED' | 'COMFORTABLE'>('BALANCED');

  // Smart Performance Optimizer State
  const [optimizerPreset, setOptimizerPreset] = useState<'ECO_SAILING' | 'EXPRESS_TRANSIT' | 'PORT_APPROACH' | 'AI_AUTO_DYNAMIC'>('AI_AUTO_DYNAMIC');
  const [optimizerParams, setOptimizerParams] = useState({
    sfocBiasDegree: 0.8,
    propellerPitchTrimDegree: -0.4,
    turbochargerBypassPct: 12,
    auxPowerSheddingPct: 8
  });

  // Predictive Usage Insight State
  const [predictiveHorizon, setPredictiveHorizon] = useState<'7D' | '30D' | '90D'>('30D');

  // Operational Efficiency Report State
  const [reportVesselFilter, setReportVesselFilter] = useState<string>('ALL');
  const [reportDateRange, setReportDateRange] = useState<string>('YTD_2026');

  // Performance Alerts State
  const [performanceAlerts, setPerformanceAlerts] = useState<PerformanceAlertItem[]>(INITIAL_PERFORMANCE_ALERTS);
  const [alertThresholds, setAlertThresholds] = useState({
    sfocVariancePercent: 2.5,
    propellerSlipPercent: 3.0,
    vibrationLimitMms: 2.0,
    satcomLatencyMs: 120
  });

  // Smart Usage Metrics State
  const [usageTimeframe, setUsageTimeframe] = useState<'24H' | '7D' | '30D' | 'VOYAGE'>('24H');
  const [usageCategories, setUsageCategories] = useState<UsageMetricCategory[]>(INITIAL_USAGE_METRICS);

  // Resource Monitor State
  const [resources, setResources] = useState({
    cpuUsage: 22,
    ramUsageMb: 312,
    ramTotalMb: 1024,
    diskIoKbps: 1840,
    networkKbpS: 4200,
    npuLoadPercent: 48,
    powerGridLoadKw: 2450,
    lubeOilPressureBar: 4.8
  });

  // Log Filter State
  const [logSeverityFilter, setLogSeverityFilter] = useState<string>('ALL');
  const [logSubsystemFilter, setLogSubsystemFilter] = useState<string>('ALL');
  const [logSearchQuery, setLogSearchQuery] = useState<string>('');

  // Notification Filter State
  const [notifFilter, setNotifFilter] = useState<'ALL' | 'UNREAD' | 'CRITICAL'>('ALL');

  // Super Master AI System Telemetry State
  const [aiSystemHealth, setAiSystemHealth] = useState({
    cpuLoadPercent: 18,
    memoryUsedMb: 284,
    decisionConfidence: 99.4,
    activeSubAgents: 12,
    autoTuneActive: true,
    lastScanTime: 'Just now'
  });

  const [isScanning, setIsScanning] = useState(false);
  const [aiConsoleInput, setAiConsoleInput] = useState('');
  const [aiLogs, setAiLogs] = useState<Array<{ time: string; text: string; type: 'INFO' | 'SUCCESS' | 'WARN' }>>([
    { time: '22:40:12', text: 'Super Master AI Agent initialized with 12 neural decision sub-agents.', type: 'INFO' },
    { time: '22:41:05', text: 'Automated predictive maintenance scan completed for ULCV Ocean Titan.', type: 'SUCCESS' },
    { time: '22:42:18', text: 'Main engine combustion timing optimized: Saved 1.8 MT fuel/day.', type: 'SUCCESS' }
  ]);

  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    hapticEngine.trigger('success');
    setTimeout(() => setToastMsg(null), 3000);
  };

  // Live telemetry interval simulator for Resource Monitor
  useEffect(() => {
    const timer = setInterval(() => {
      setResources((prev) => ({
        ...prev,
        cpuUsage: Math.min(98, Math.max(12, prev.cpuUsage + Math.floor(Math.random() * 7 - 3))),
        diskIoKbps: Math.min(5000, Math.max(800, prev.diskIoKbps + Math.floor(Math.random() * 200 - 100))),
        networkKbpS: Math.min(10000, Math.max(1200, prev.networkKbpS + Math.floor(Math.random() * 400 - 200))),
        npuLoadPercent: Math.min(95, Math.max(20, prev.npuLoadPercent + Math.floor(Math.random() * 5 - 2)))
      }));
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const handleRunFullSelfScan = () => {
    setIsScanning(true);
    hapticEngine.trigger('scan');

    setTimeout(() => {
      setIsScanning(false);
      setAiSystemHealth((prev) => ({
        ...prev,
        cpuLoadPercent: Math.floor(Math.random() * 10) + 12,
        decisionConfidence: 99.8,
        lastScanTime: new Date().toLocaleTimeString()
      }));

      // Update task health scores
      setTasks((prev) =>
        prev.map((t) => ({
          ...t,
          healthScore: Math.min(100, t.healthScore + 2)
        }))
      );

      const newLog = {
        time: new Date().toLocaleTimeString(),
        text: 'Automated Self-Maintenance & Performance Tuning Cycle complete! All vessel sub-systems cleared.',
        type: 'SUCCESS' as const
      };
      setAiLogs((prev) => [newLog, ...prev]);

      // Add to main system logs
      setSystemLogs((prev) => [
        {
          id: `LOG-${Date.now()}`,
          time: new Date().toLocaleTimeString(),
          subsystem: 'AI_AGENT',
          severity: 'SUCCESS',
          message: 'Autonomous vessel self-scan complete. All neural agents synchronized.',
          sourceNode: 'Super-Master-Node-1'
        },
        ...prev
      ]);

      showToast('Super Master AI Agent full system self-maintenance complete!');
    }, 2500);
  };

  const handleApproveTask = (taskId: string) => {
    hapticEngine.trigger('click');
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId) {
          return { ...t, status: 'IN_PROGRESS' as const, healthScore: 90 };
        }
        return t;
      })
    );
    showToast(`Work order ${taskId} approved for automated execution!`);
  };

  const handleSendAiPrompt = () => {
    if (!aiConsoleInput.trim()) return;
    hapticEngine.trigger('click');
    const promptText = aiConsoleInput;
    setAiConsoleInput('');

    const userLog = {
      time: new Date().toLocaleTimeString(),
      text: `User Command: "${promptText}"`,
      type: 'INFO' as const
    };

    setAiLogs((prev) => [userLog, ...prev]);

    setTimeout(() => {
      const responseLog = {
        time: new Date().toLocaleTimeString(),
        text: `Super Master AI Response: Executed automated analysis for "${promptText}". System parameter adjustments applied across fleet network.`,
        type: 'SUCCESS' as const
      };
      setAiLogs((prev) => [responseLog, ...prev]);
      showToast('Super Master AI processed prompt & executed command!');
    }, 1000);
  };

  // Resource Action Handlers
  const handlePurgeMemoryCache = () => {
    hapticEngine.trigger('click');
    setResources((prev) => ({ ...prev, ramUsageMb: 198, cpuUsage: 14 }));
    showToast('Purged non-essential telemetry cache! RAM Usage freed to 198 MB.');
  };

  const handleSimulateWorkloadSpike = () => {
    hapticEngine.trigger('click');
    setResources((prev) => ({ ...prev, cpuUsage: 88, npuLoadPercent: 92, networkKbpS: 8400 }));
    showToast('Simulated heavy weather route recalculation load spike!');
  };

  // Notification Action Handlers
  const handleEmitTestNotif = () => {
    hapticEngine.trigger('click');
    const testTitles = [
      'Main Engine Fuel Pressure Regulator Auto-Tuned',
      'Auxiliary Power Grid Load Balancing Optimal',
      'SatCom Uplink Switched to Backup O3b MPOWER Beam',
      'Reefer Container #82 Air Circulation Warning'
    ];
    const testSubsystems = ['Propulsion', 'Power Grid', 'SatCom', 'Cargo Operations'];
    const testSeverities: Array<'CRITICAL' | 'WARNING' | 'INFO' | 'SUCCESS'> = ['WARNING', 'SUCCESS', 'INFO', 'CRITICAL'];

    const idx = Math.floor(Math.random() * testTitles.length);

    const newNotif: StatusNotificationItem = {
      id: `NOTIF-${Date.now()}`,
      time: 'Just now',
      title: testTitles[idx],
      subsystem: testSubsystems[idx],
      severity: testSeverities[idx],
      description: 'Super Master AI Agent continuously monitors and logs all maritime status triggers.',
      isRead: false
    };

    setNotifications((prev) => [newNotif, ...prev]);
    showToast('New status notification emitted by AI Engine!');
  };

  const handleMarkAllNotifsRead = () => {
    hapticEngine.trigger('click');
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    showToast('All status notifications marked as read.');
  };

  const handleDismissNotif = (id: string) => {
    hapticEngine.trigger('click');
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    showToast('Notification dismissed.');
  };

  // Performance Alert Mitigation Handler
  const handleMitigatePerformanceAlert = (alertId: string) => {
    hapticEngine.trigger('success');
    setPerformanceAlerts((prev) =>
      prev.map((alt) => {
        if (alt.id === alertId) {
          return {
            ...alt,
            status: 'AUTO_MITIGATED',
            severity: 'NEEDS_MITIGATION',
            currentValue: 'Optimized (Nominal)'
          };
        }
        return alt;
      })
    );

    // Add log to system logs
    const logItem: SystemLogItem = {
      id: `LOG-${Date.now()}`,
      time: new Date().toLocaleTimeString(),
      subsystem: 'AI_AGENT',
      severity: 'SUCCESS',
      message: `Performance Alert ${alertId} auto-mitigated by Super Master AI Agent. System parameters tuned.`,
      sourceNode: 'Super-Master-Node-1'
    };
    setSystemLogs((prev) => [logItem, ...prev]);

    showToast(`Super Master AI successfully auto-mitigated Performance Alert ${alertId}!`);
  };

  // Filtered Logs Calculation
  const filteredLogs = systemLogs.filter((log) => {
    const matchesSev = logSeverityFilter === 'ALL' || log.severity === logSeverityFilter;
    const matchesSub = logSubsystemFilter === 'ALL' || log.subsystem === logSubsystemFilter;
    const matchesSearch = logSearchQuery.trim() === '' ||
      log.message.toLowerCase().includes(logSearchQuery.toLowerCase()) ||
      log.sourceNode.toLowerCase().includes(logSearchQuery.toLowerCase());
    return matchesSev && matchesSub && matchesSearch;
  });

  // Filtered Notifications Calculation
  const filteredNotifs = notifications.filter((n) => {
    if (notifFilter === 'UNREAD') return !n.isRead;
    if (notifFilter === 'CRITICAL') return n.severity === 'CRITICAL';
    return true;
  });

  const unreadNotifCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div className={`font-mono animate-fadeIn pb-12 transition-all ${
      uiDensity === 'COMPACT' ? 'space-y-3 text-[11px]' :
      uiDensity === 'COMFORTABLE' ? 'space-y-7 text-sm' : 'space-y-5 text-xs'
    }`}>
      {toastMsg && (
        <div className="fixed top-20 right-6 z-50 bg-cyan-950 border border-cyan-400 text-cyan-200 px-4 py-2.5 rounded-2xl shadow-2xl text-xs font-bold flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4 text-cyan-400" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* HEADER BANNER */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div className="space-y-1">
            <div className="flex items-center space-x-2 text-cyan-400 text-xs font-bold uppercase tracking-wider">
              <Bot className="w-5 h-5 text-cyan-400 animate-pulse" />
              <span>Super Master AI Engine • 24/7 Autonomous Vessel Governance</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Automated Maintenance, Management & Performance Super Master AI Agent
            </h1>
            <p className="text-xs text-slate-400 max-w-2xl">
              Real-time predictive maintenance, fleet operations management, automated parts procurement, live resource monitoring, log visualization, and status notifications.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* UI DENSITY TOGGLE */}
            <div className="flex items-center space-x-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
              <span className="text-[9px] font-bold text-slate-400 uppercase px-2 flex items-center space-x-1">
                <Sliders className="w-3 h-3 text-cyan-400" />
                <span>Density</span>
              </span>
              {(['COMPACT', 'BALANCED', 'COMFORTABLE'] as const).map((d) => (
                <button
                  key={d}
                  onClick={() => {
                    setUiDensity(d);
                    hapticEngine.trigger('click');
                    showToast(`UI Density set to ${d}`);
                  }}
                  className={`px-2.5 py-1 rounded-lg text-[9px] font-bold transition-all ${
                    uiDensity === d
                      ? 'bg-cyan-500 text-slate-950 shadow font-black'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {d[0]}
                </button>
              ))}
            </div>

            <button
              onClick={handleRunFullSelfScan}
              disabled={isScanning}
              className={`px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-slate-950 font-black rounded-xl text-xs flex items-center space-x-2 shadow-xl transition-all ${
                isScanning ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <RefreshCw className={`w-4 h-4 ${isScanning ? 'animate-spin text-slate-950' : 'text-slate-950'}`} />
              <span>{isScanning ? 'RUNNING AI SELF-SCAN...' : 'RUN FULL AI SELF-MAINTENANCE'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* SUPER MASTER AI SYSTEM TELEMETRY STRIP */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-[10px]">
            <span>AI NEURAL ENGINE CONFIDENCE</span>
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          </div>
          <p className="text-xl font-extrabold text-cyan-300">{aiSystemHealth.decisionConfidence}%</p>
          <span className="text-[9px] text-emerald-400">Zero Hallucination Guard Active</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-[10px]">
            <span>RESOURCE MONITOR</span>
            <Cpu className="w-3.5 h-3.5 text-indigo-400" />
          </div>
          <p className="text-xl font-extrabold text-indigo-300">{resources.cpuUsage}% CPU • {resources.npuLoadPercent}% NPU</p>
          <span className="text-[9px] text-slate-400">{resources.ramUsageMb} / {resources.ramTotalMb} MB RAM</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-[10px]">
            <span>LOG VISUALIZATION</span>
            <BarChart3 className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <p className="text-xl font-extrabold text-emerald-300">{systemLogs.length} Events Logged</p>
          <span className="text-[9px] text-slate-400">Structured Stream Sync Active</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-[10px]">
            <span>STATUS NOTIFICATIONS</span>
            <Bell className="w-3.5 h-3.5 text-amber-400" />
          </div>
          <p className="text-xl font-extrabold text-amber-300">{unreadNotifCount} Unread Alerts</p>
          <span className="text-[9px] text-cyan-400">Live Haptic Engine Ready</span>
        </div>
      </div>

      {/* NAVIGATION TABS */}
      <div className="flex items-center space-x-2 border-b border-slate-800 pb-2 overflow-x-auto no-scrollbar">
        <button
          onClick={() => {
            setActiveTab('SUPER_AI');
            hapticEngine.trigger('click');
          }}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'SUPER_AI'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-lg'
              : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
          }`}
        >
          <Bot className="w-4 h-4" />
          <span>SUPER MASTER AI CONSOLE</span>
        </button>

        <button
          onClick={() => {
            setActiveTab('PERFORMANCE_OPTIMIZER');
            hapticEngine.trigger('click');
          }}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'PERFORMANCE_OPTIMIZER'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-lg'
              : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
          }`}
        >
          <SlidersHorizontal className="w-4 h-4 text-cyan-400" />
          <span>SMART OPTIMIZER</span>
        </button>

        <button
          onClick={() => {
            setActiveTab('PREDICTIVE_INSIGHTS');
            hapticEngine.trigger('click');
          }}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'PREDICTIVE_INSIGHTS'
              ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/50 shadow-lg'
              : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
          }`}
        >
          <TrendingUp className="w-4 h-4 text-indigo-400" />
          <span>PREDICTIVE INSIGHTS</span>
        </button>

        <button
          onClick={() => {
            setActiveTab('EFFICIENCY_REPORT');
            hapticEngine.trigger('click');
          }}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'EFFICIENCY_REPORT'
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 shadow-lg'
              : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
          }`}
        >
          <FileText className="w-4 h-4 text-emerald-400" />
          <span>EFFICIENCY REPORT</span>
        </button>

        <button
          onClick={() => {
            setActiveTab('RESOURCE_MONITOR');
            hapticEngine.trigger('click');
          }}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'RESOURCE_MONITOR'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-lg'
              : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
          }`}
        >
          <Cpu className="w-4 h-4 text-indigo-400" />
          <span>RESOURCE MONITOR</span>
        </button>

        <button
          onClick={() => {
            setActiveTab('SMART_METRICS');
            hapticEngine.trigger('click');
          }}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'SMART_METRICS'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-lg'
              : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
          }`}
        >
          <PieChart className="w-4 h-4 text-cyan-400" />
          <span>SMART USAGE METRICS</span>
        </button>

        <button
          onClick={() => {
            setActiveTab('LOG_VISUALIZATION');
            hapticEngine.trigger('click');
          }}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'LOG_VISUALIZATION'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-lg'
              : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
          }`}
        >
          <BarChart3 className="w-4 h-4 text-emerald-400" />
          <span>LOG VISUALIZATION</span>
        </button>

        <button
          onClick={() => {
            setActiveTab('PERFORMANCE_ALERTS');
            hapticEngine.trigger('click');
          }}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 shrink-0 relative ${
            activeTab === 'PERFORMANCE_ALERTS'
              ? 'bg-rose-500/20 text-rose-300 border border-rose-500/50 shadow-lg'
              : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
          }`}
        >
          <AlertTriangle className="w-4 h-4 text-rose-400" />
          <span>PERFORMANCE ALERTS</span>
          {performanceAlerts.filter(a => a.status === 'ACTIVE_ALERT').length > 0 && (
            <span className="bg-rose-500 text-white text-[9px] font-black px-1.5 py-0.2 rounded-full animate-pulse">
              {performanceAlerts.filter(a => a.status === 'ACTIVE_ALERT').length}
            </span>
          )}
        </button>

        <button
          onClick={() => {
            setActiveTab('STATUS_NOTIFICATIONS');
            hapticEngine.trigger('click');
          }}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 shrink-0 relative ${
            activeTab === 'STATUS_NOTIFICATIONS'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-lg'
              : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
          }`}
        >
          <Bell className="w-4 h-4 text-amber-400" />
          <span>STATUS NOTIFICATIONS</span>
          {unreadNotifCount > 0 && (
            <span className="bg-rose-500 text-white text-[9px] font-black px-1.5 py-0.2 rounded-full">
              {unreadNotifCount}
            </span>
          )}
        </button>

        <button
          onClick={() => {
            setActiveTab('MAINTENANCE');
            hapticEngine.trigger('click');
          }}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'MAINTENANCE'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-lg'
              : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
          }`}
        >
          <Wrench className="w-4 h-4" />
          <span>AUTOMATED MAINTENANCE</span>
        </button>

        <button
          onClick={() => {
            setActiveTab('PERFORMANCE');
            hapticEngine.trigger('click');
          }}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'PERFORMANCE'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-lg'
              : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
          }`}
        >
          <Gauge className="w-4 h-4" />
          <span>PERFORMANCE TUNING</span>
        </button>

        <button
          onClick={() => {
            setActiveTab('MANAGEMENT');
            hapticEngine.trigger('click');
          }}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'MANAGEMENT'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-lg'
              : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
          }`}
        >
          <Database className="w-4 h-4" />
          <span>FLEET OPERATIONS MANAGEMENT</span>
        </button>
      </div>

      {/* TAB 1: SUPER MASTER AI CONSOLE */}
      {activeTab === 'SUPER_AI' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2 text-xs font-bold text-cyan-400 uppercase">
                <Bot className="w-4 h-4 text-cyan-400" />
                <span>Super Master AI Agent Prompt & Command Console</span>
              </div>
              <span className="text-[10px] text-emerald-400 bg-emerald-950 px-2.5 py-1 rounded-full border border-emerald-800">
                AI Autonomous Mode: ACTIVE
              </span>
            </div>

            {/* Prompt Input Bar */}
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={aiConsoleInput}
                onChange={(e) => setAiConsoleInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendAiPrompt()}
                placeholder="Ask Super Master AI Agent to optimize engine timing, schedule maintenance, or generate fleet performance audit..."
                className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-cyan-500"
              />
              <button
                onClick={handleSendAiPrompt}
                className="px-5 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black rounded-xl text-xs flex items-center space-x-1.5 shadow-lg"
              >
                <Send className="w-4 h-4 text-slate-950" />
                <span>EXECUTE</span>
              </button>
            </div>

            {/* Quick Action Presets */}
            <div className="flex items-center space-x-2 pt-1 overflow-x-auto no-scrollbar">
              <span className="text-[10px] text-slate-400 font-bold shrink-0">QUICK COMMANDS:</span>
              <button
                onClick={() => {
                  setAiConsoleInput('Optimize main engine combustion timing for low sulfur fuel');
                  showToast('Preset command loaded into console!');
                }}
                className="px-3 py-1 bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800 rounded-lg text-[10px] shrink-0"
              >
                ⚡ Main Engine Timing
              </button>
              <button
                onClick={() => {
                  setAiConsoleInput('Audit Reefer Bay 14 temperature anomaly & generate repair plan');
                  showToast('Preset command loaded into console!');
                }}
                className="px-3 py-1 bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800 rounded-lg text-[10px] shrink-0"
              >
                ❄️ Reefer Temperature Audit
              </button>
              <button
                onClick={() => {
                  setAiConsoleInput('Auto-generate 30-day SOLAS compliance maintenance schedule');
                  showToast('Preset command loaded into console!');
                }}
                className="px-3 py-1 bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800 rounded-lg text-[10px] shrink-0"
              >
                📋 SOLAS Maintenance Schedule
              </button>
            </div>

            {/* AI Console Output Log */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 h-64 overflow-y-auto space-y-2 font-mono text-xs">
              {aiLogs.map((log, idx) => (
                <div key={idx} className="flex items-start space-x-2">
                  <span className="text-slate-500 text-[10px] shrink-0">{log.time}</span>
                  <span className={`leading-relaxed ${
                    log.type === 'SUCCESS' ? 'text-emerald-300' : log.type === 'WARN' ? 'text-amber-300' : 'text-slate-300'
                  }`}>
                    {log.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: RESOURCE MONITOR */}
      {activeTab === 'RESOURCE_MONITOR' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-xs font-bold text-white uppercase flex items-center space-x-2">
                  <Cpu className="w-4 h-4 text-indigo-400" />
                  <span>Real-Time Maritime Hardware & System Resource Monitor</span>
                </h3>
                <p className="text-[10px] text-slate-400">Live telemetry across AI neural accelerator, onboard server cluster, and vessel power grid</p>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={handlePurgeMemoryCache}
                  className="px-3 py-1.5 bg-slate-950 hover:bg-slate-800 text-cyan-300 border border-slate-800 rounded-xl text-xs font-bold flex items-center space-x-1"
                >
                  <Trash2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>PURGE CACHE</span>
                </button>
                <button
                  onClick={handleSimulateWorkloadSpike}
                  className="px-3 py-1.5 bg-indigo-500 hover:bg-indigo-400 text-slate-950 font-bold rounded-xl text-xs flex items-center space-x-1"
                >
                  <Zap className="w-3.5 h-3.5 text-slate-950" />
                  <span>SIMULATE SPIKE</span>
                </button>
              </div>
            </div>

            {/* Resource Gauges & Progress Meters */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Gauge 1: CPU Load */}
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400 font-bold flex items-center space-x-1">
                    <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Host CPU Load</span>
                  </span>
                  <span className="text-cyan-300 font-black">{resources.cpuUsage}%</span>
                </div>
                <div className="w-full bg-slate-900 h-2.5 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-cyan-500 to-indigo-500 h-full transition-all duration-500"
                    style={{ width: `${resources.cpuUsage}%` }}
                  />
                </div>
                <span className="text-[9px] text-slate-500 block">8 Cores Active • 3.4 GHz Clock</span>
              </div>

              {/* Gauge 2: NPU Neural Acceleration Load */}
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400 font-bold flex items-center space-x-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>Neural NPU Acceleration</span>
                  </span>
                  <span className="text-amber-300 font-black">{resources.npuLoadPercent}%</span>
                </div>
                <div className="w-full bg-slate-900 h-2.5 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-amber-500 to-rose-500 h-full transition-all duration-500"
                    style={{ width: `${resources.npuLoadPercent}%` }}
                  />
                </div>
                <span className="text-[9px] text-slate-500 block">32 TOPS Machine Learning Throughput</span>
              </div>

              {/* Gauge 3: System RAM Memory */}
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400 font-bold flex items-center space-x-1">
                    <HardDrive className="w-3.5 h-3.5 text-emerald-400" />
                    <span>RAM Footprint</span>
                  </span>
                  <span className="text-emerald-300 font-black">{resources.ramUsageMb} / {resources.ramTotalMb} MB</span>
                </div>
                <div className="w-full bg-slate-900 h-2.5 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full transition-all duration-500"
                    style={{ width: `${(resources.ramUsageMb / resources.ramTotalMb) * 100}%` }}
                  />
                </div>
                <span className="text-[9px] text-slate-500 block">DDR5 ECC Maritime Server Grade</span>
              </div>

              {/* Gauge 4: NVMe Disk I/O */}
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400 font-bold flex items-center space-x-1">
                    <Database className="w-3.5 h-3.5 text-cyan-400" />
                    <span>NVMe Disk Storage I/O</span>
                  </span>
                  <span className="text-cyan-300 font-black">{resources.diskIoKbps} KB/s</span>
                </div>
                <div className="w-full bg-slate-900 h-2.5 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-cyan-400 to-blue-500 h-full transition-all duration-500"
                    style={{ width: `${Math.min(100, (resources.diskIoKbps / 5000) * 100)}%` }}
                  />
                </div>
                <span className="text-[9px] text-slate-500 block">Encrypted BlackBox Log Partition</span>
              </div>

              {/* Gauge 5: SatCom Network Bandwidth */}
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400 font-bold flex items-center space-x-1">
                    <Wifi className="w-3.5 h-3.5 text-indigo-400" />
                    <span>SatCom Link Throughput</span>
                  </span>
                  <span className="text-indigo-300 font-black">{(resources.networkKbpS / 1000).toFixed(1)} Mbps</span>
                </div>
                <div className="w-full bg-slate-900 h-2.5 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full transition-all duration-500"
                    style={{ width: `${Math.min(100, (resources.networkKbpS / 10000) * 100)}%` }}
                  />
                </div>
                <span className="text-[9px] text-slate-500 block">Starlink Maritime Ku-Band Direct Link</span>
              </div>

              {/* Gauge 6: Vessel Auxiliary Power Grid */}
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400 font-bold flex items-center space-x-1">
                    <Zap className="w-3.5 h-3.5 text-amber-400" />
                    <span>Auxiliary Power Load</span>
                  </span>
                  <span className="text-amber-300 font-black">{resources.powerGridLoadKw} kW</span>
                </div>
                <div className="w-full bg-slate-900 h-2.5 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-amber-400 to-orange-500 h-full transition-all duration-500"
                    style={{ width: '65%' }}
                  />
                </div>
                <span className="text-[9px] text-slate-500 block">Auxiliary GenSet #1 & #2 Active</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB: SMART PERFORMANCE OPTIMIZER */}
      {activeTab === 'PERFORMANCE_OPTIMIZER' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-xs font-bold text-white uppercase flex items-center space-x-2">
                  <SlidersHorizontal className="w-4 h-4 text-cyan-400" />
                  <span>Smart Performance Optimizer & Neural Propulsion Tuner</span>
                </h3>
                <p className="text-[10px] text-slate-400">Closed-loop neural engine micro-tuning, propeller pitch trim, and dynamic thermal load shedding</p>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-[10px] text-emerald-300 bg-emerald-950 border border-emerald-800 px-3 py-1 rounded-xl font-bold flex items-center space-x-1">
                  <Zap className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                  <span>AI Dynamic Tuner Active</span>
                </span>
              </div>
            </div>

            {/* Presets Selector */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Optimization Profile Presets</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  {
                    id: 'AI_AUTO_DYNAMIC',
                    title: '🤖 AI Dynamic Neural Auto',
                    desc: '24/7 continuous neural adaptation to swell & engine load',
                    params: { sfocBiasDegree: 0.8, propellerPitchTrimDegree: -0.4, turbochargerBypassPct: 12, auxPowerSheddingPct: 8 }
                  },
                  {
                    id: 'ECO_SAILING',
                    title: '🌿 Eco Voyage Profile',
                    desc: 'Maximum fuel conservation & minimum SFOC (-3.2% VLSFO)',
                    params: { sfocBiasDegree: -1.2, propellerPitchTrimDegree: -0.8, turbochargerBypassPct: 18, auxPowerSheddingPct: 15 }
                  },
                  {
                    id: 'EXPRESS_TRANSIT',
                    title: '⚡ Express Transit Mode',
                    desc: 'Maximum speed (23.8 kts) for urgent port schedules',
                    params: { sfocBiasDegree: 1.5, propellerPitchTrimDegree: 1.0, turbochargerBypassPct: 5, auxPowerSheddingPct: 0 }
                  },
                  {
                    id: 'PORT_APPROACH',
                    title: '⚓ Port Approach & Quiet',
                    desc: 'Low noise, zero direct auxiliary emissions maneuvering',
                    params: { sfocBiasDegree: -0.5, propellerPitchTrimDegree: -1.5, turbochargerBypassPct: 22, auxPowerSheddingPct: 20 }
                  }
                ].map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => {
                      setOptimizerPreset(preset.id as any);
                      setOptimizerParams(preset.params);
                      hapticEngine.trigger('click');
                      showToast(`Optimization Preset loaded: ${preset.title}`);
                    }}
                    className={`p-4 rounded-2xl border text-left transition-all space-y-2 ${
                      optimizerPreset === preset.id
                        ? 'bg-cyan-950/60 border-cyan-500 shadow-lg shadow-cyan-950/50'
                        : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <h5 className="text-xs font-bold text-white">{preset.title}</h5>
                    <p className="text-[10px] text-slate-400">{preset.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Fine Tuning Sliders */}
            <div className="bg-slate-950 border border-slate-800 p-5 rounded-2xl space-y-5">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center space-x-2">
                <Sliders className="w-4 h-4 text-cyan-400" />
                <span>Engine & Subsystem Fine Tuning Parameters</span>
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                <div className="space-y-2">
                  <div className="flex justify-between text-slate-300">
                    <span>Fuel Injection Timing Angle Offset (BTDC)</span>
                    <strong className="text-cyan-400">{optimizerParams.sfocBiasDegree}°</strong>
                  </div>
                  <input
                    type="range"
                    min="-2.0"
                    max="+2.0"
                    step="0.1"
                    value={optimizerParams.sfocBiasDegree}
                    onChange={(e) => setOptimizerParams(p => ({ ...p, sfocBiasDegree: parseFloat(e.target.value) }))}
                    className="w-full accent-cyan-500"
                  />
                  <span className="text-[9px] text-slate-500 block">Controls cylinder peak combustion pressure timing.</span>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-slate-300">
                    <span>Controllable Pitch Propeller Trim Offset</span>
                    <strong className="text-indigo-400">{optimizerParams.propellerPitchTrimDegree}°</strong>
                  </div>
                  <input
                    type="range"
                    min="-2.0"
                    max="+2.0"
                    step="0.1"
                    value={optimizerParams.propellerPitchTrimDegree}
                    onChange={(e) => setOptimizerParams(p => ({ ...p, propellerPitchTrimDegree: parseFloat(e.target.value) }))}
                    className="w-full accent-indigo-500"
                  />
                  <span className="text-[9px] text-slate-500 block">Adjusts blade angle to match swell hydrodynamic resistance.</span>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-slate-300">
                    <span>Turbocharger Exhaust Bypass Valve Ratio</span>
                    <strong className="text-amber-400">{optimizerParams.turbochargerBypassPct}%</strong>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="30"
                    step="1"
                    value={optimizerParams.turbochargerBypassPct}
                    onChange={(e) => setOptimizerParams(p => ({ ...p, turbochargerBypassPct: parseInt(e.target.value) }))}
                    className="w-full accent-amber-500"
                  />
                  <span className="text-[9px] text-slate-500 block">Maintains scavenge air pressure balance during part-load.</span>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-slate-300">
                    <span>Auxiliary Grid Non-Essential Load Shedding</span>
                    <strong className="text-emerald-400">{optimizerParams.auxPowerSheddingPct}%</strong>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="25"
                    step="1"
                    value={optimizerParams.auxPowerSheddingPct}
                    onChange={(e) => setOptimizerParams(p => ({ ...p, auxPowerSheddingPct: parseInt(e.target.value) }))}
                    className="w-full accent-emerald-500"
                  />
                  <span className="text-[9px] text-slate-500 block">Sheds non-essential HVAC & watermaker load to auxiliary generators.</span>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-3 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="text-[10px] text-slate-400">
                  Calculated Net ROI: <strong className="text-emerald-400 font-bold">1.82 MT VLSFO Saved / 24h (~$1,380 USD/day)</strong>
                </div>

                <button
                  onClick={() => {
                    hapticEngine.trigger('success');
                    const logItem: SystemLogItem = {
                      id: `LOG-${Date.now()}`,
                      time: new Date().toLocaleTimeString(),
                      subsystem: 'ENGINE',
                      severity: 'SUCCESS',
                      message: `Smart Performance Optimizer parameters applied: SFOC offset ${optimizerParams.sfocBiasDegree}°, Pitch trim ${optimizerParams.propellerPitchTrimDegree}°.`,
                      sourceNode: 'Opti-Node-1'
                    };
                    setSystemLogs(prev => [logItem, ...prev]);
                    showToast('Smart Performance Optimization parameters successfully applied to Main Engine Control Unit!');
                  }}
                  className="px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 font-black rounded-xl text-xs flex items-center space-x-2 shadow-xl shrink-0"
                >
                  <Zap className="w-4 h-4 text-slate-950" />
                  <span>APPLY SMART OPTIMIZATION TUNING</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB: PREDICTIVE USAGE INSIGHT */}
      {activeTab === 'PREDICTIVE_INSIGHTS' && (
        <PredictiveEfficiencyDashboard />
      )}

      {/* TAB: OPERATIONAL EFFICIENCY REPORT */}
      {activeTab === 'EFFICIENCY_REPORT' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-xs font-bold text-white uppercase flex items-center space-x-2">
                  <FileText className="w-4 h-4 text-emerald-400" />
                  <span>Vessel & Fleet Operational Efficiency Executive Audit Report</span>
                </h3>
                <p className="text-[10px] text-slate-400">Official SOLAS-compliant audit documentation, overall equipment effectiveness (OEE), and carbon offset ROI</p>
              </div>

              {/* Action Toolbar */}
              <div className="flex items-center space-x-2 flex-wrap gap-1">
                <button
                  onClick={() => {
                    hapticEngine.trigger('success');
                    showToast('SOLAS Audit PDF Report compiled and saved to local download vault!');
                  }}
                  className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl text-xs flex items-center space-x-1.5 shadow"
                >
                  <Download className="w-3.5 h-3.5 text-slate-950" />
                  <span>EXPORT SOLAS AUDIT PDF</span>
                </button>

                <button
                  onClick={() => {
                    hapticEngine.trigger('click');
                    if (typeof window !== 'undefined' && window.print) {
                      try { window.print(); } catch (e) { showToast('Printing summary...'); }
                    } else {
                      showToast('Print command initiated.');
                    }
                  }}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl text-xs flex items-center space-x-1.5 border border-slate-700"
                >
                  <Printer className="w-3.5 h-3.5 text-slate-300" />
                  <span>PRINT SUMMARY</span>
                </button>
              </div>
            </div>

            {/* Filter bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-950 p-3 rounded-2xl border border-slate-800 text-xs">
              <div className="flex items-center space-x-2 w-full sm:w-auto">
                <span className="text-slate-400 font-bold text-[10px] uppercase">Vessel Selection:</span>
                <select
                  value={reportVesselFilter}
                  onChange={(e) => setReportVesselFilter(e.target.value)}
                  className="bg-slate-900 border border-slate-800 text-white text-xs rounded-xl px-3 py-1 font-bold"
                >
                  <option value="ALL">All Fleet Vessels (3 Active)</option>
                  <option value="ULCV Ocean Titan">ULCV Ocean Titan</option>
                  <option value="Container Carrier Sea Voyager">Container Carrier Sea Voyager</option>
                  <option value="Bunker Hub Malacca Pioneer">Bunker Hub Malacca Pioneer</option>
                </select>
              </div>

              <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
                <span className="text-slate-400 font-bold text-[10px] uppercase">Report Window:</span>
                <select
                  value={reportDateRange}
                  onChange={(e) => setReportDateRange(e.target.value)}
                  className="bg-slate-900 border border-slate-800 text-white text-xs rounded-xl px-3 py-1 font-bold"
                >
                  <option value="YTD_2026">Year-To-Date (2026)</option>
                  <option value="Q3_2026">Q3 2026 Audit</option>
                  <option value="VOYAGE_99">Voyage #99 (Singapore - Rotterdam)</option>
                </select>
              </div>
            </div>

            {/* Executive KPIs */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl space-y-1">
                <span className="text-[10px] text-slate-400 uppercase font-bold">Overall Equipment Effectiveness</span>
                <p className="text-2xl font-black text-emerald-400">98.4%</p>
                <span className="text-[9px] text-emerald-400 font-bold block">+1.2% World Class Benchmark</span>
              </div>

              <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl space-y-1">
                <span className="text-[10px] text-slate-400 uppercase font-bold">SFOC Engine Efficiency</span>
                <p className="text-2xl font-black text-cyan-300">168.2 g/kWh</p>
                <span className="text-[9px] text-cyan-400 font-bold block">-2.8% vs Baseline Engine Spec</span>
              </div>

              <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl space-y-1">
                <span className="text-[10px] text-slate-400 uppercase font-bold">SOLAS Maritime Safety Index</span>
                <p className="text-2xl font-black text-indigo-300">100.0%</p>
                <span className="text-[9px] text-indigo-400 font-bold block">Zero Critical Defect Findings</span>
              </div>

              <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl space-y-1">
                <span className="text-[10px] text-slate-400 uppercase font-bold">Net Financial Savings (ROI)</span>
                <p className="text-2xl font-black text-amber-300">+$142,500</p>
                <span className="text-[9px] text-emerald-400 font-bold block">412 MT CO2 Emissions Offset</span>
              </div>
            </div>

            {/* Department Breakdown Matrix */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Departmental Governance Audit Breakdown</h4>
              <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden text-xs">
                <div className="grid grid-cols-4 bg-slate-900 p-3 font-bold text-slate-400 text-[10px] border-b border-slate-800">
                  <span>SUBSYSTEM DEPARTMENT</span>
                  <span>PERFORMANCE RATING</span>
                  <span>AUTONOMOUS CORRECTIONS</span>
                  <span>SOLAS AUDIT STATUS</span>
                </div>

                {[
                  { dept: 'Main Engine & Cylinder Fuel Injection', rating: '99.2% Nominal', corrections: '1,420 Micro-Adjustments', status: 'PASSED (0 DEFECTS)' },
                  { dept: 'Hull Friction & Propeller Hydrodynamics', rating: '97.8% Optimal', corrections: 'Pitch Trim Angle Offset -0.4°', status: 'PASSED (0 DEFECTS)' },
                  { dept: 'SatCom Ku-Band Telemetry & BlackBox Vault', rating: '99.9% Uptime', corrections: '10Hz Telemetry Neural Stream', status: 'PASSED (VERIFIED)' },
                  { dept: 'Super Master AI Autonomous Governance', rating: '99.4% Decision Confidence', corrections: 'Zero Hallucination Guard', status: 'AUDITED (PASSED)' }
                ].map((row, idx) => (
                  <div key={idx} className="grid grid-cols-4 p-3 border-b border-slate-800/60 items-center text-[11px] hover:bg-slate-900/50">
                    <span className="font-bold text-white">{row.dept}</span>
                    <span className="text-emerald-400 font-bold">{row.rating}</span>
                    <span className="text-slate-300">{row.corrections}</span>
                    <span className="text-indigo-400 font-bold">{row.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB: SMART USAGE METRICS */}
      {activeTab === 'SMART_METRICS' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-xs font-bold text-white uppercase flex items-center space-x-2">
                  <PieChart className="w-4 h-4 text-cyan-400" />
                  <span>Autonomous Super Master AI Smart Usage & Resource Allocation Metrics</span>
                </h3>
                <p className="text-[10px] text-slate-400">Tracking AI inference compute, SatCom bandwidth compression, fuel savings, and NVMe log vault storage</p>
              </div>

              {/* Timeframe selector */}
              <div className="flex items-center space-x-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800">
                {(['24H', '7D', '30D', 'VOYAGE'] as const).map((tf) => (
                  <button
                    key={tf}
                    onClick={() => {
                      setUsageTimeframe(tf);
                      hapticEngine.trigger('click');
                    }}
                    className={`px-3 py-1 rounded-lg text-[10px] font-bold transition-all ${
                      usageTimeframe === tf
                        ? 'bg-cyan-500 text-slate-950 shadow'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {tf}
                  </button>
                ))}
              </div>
            </div>

            {/* Top Metric Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl space-y-1">
                <span className="text-[10px] text-slate-400 uppercase font-bold flex items-center space-x-1">
                  <Bot className="w-3.5 h-3.5 text-cyan-400" />
                  <span>AI Inference Tokens</span>
                </span>
                <p className="text-xl font-extrabold text-cyan-300">1.84M Tokens</p>
                <span className="text-[9px] text-emerald-400 font-bold block">+98.2% Cost Saved</span>
              </div>

              <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl space-y-1">
                <span className="text-[10px] text-slate-400 uppercase font-bold flex items-center space-x-1">
                  <Wifi className="w-3.5 h-3.5 text-indigo-400" />
                  <span>SatCom Telemetry Stream</span>
                </span>
                <p className="text-xl font-extrabold text-indigo-300">18.6 GB</p>
                <span className="text-[9px] text-indigo-400 font-bold block">4.2x Compressed</span>
              </div>

              <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl space-y-1">
                <span className="text-[10px] text-slate-400 uppercase font-bold flex items-center space-x-1">
                  <Flame className="w-3.5 h-3.5 text-amber-400" />
                  <span>Voyage Fuel Optimization</span>
                </span>
                <p className="text-xl font-extrabold text-amber-300">14.8 MT Saved</p>
                <span className="text-[9px] text-emerald-400 font-bold block">~$11,200 USD ROI</span>
              </div>

              <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl space-y-1">
                <span className="text-[10px] text-slate-400 uppercase font-bold flex items-center space-x-1">
                  <HardDrive className="w-3.5 h-3.5 text-emerald-400" />
                  <span>NVMe BlackBox Storage</span>
                </span>
                <p className="text-xl font-extrabold text-emerald-300">28.4 GB / 128 GB</p>
                <span className="text-[9px] text-slate-400 block">365-Day SOLAS Audit Log</span>
              </div>
            </div>

            {/* Smart Usage Category Progress Bars */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Quota Allocation & Resource Efficiency Breakdown</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {usageCategories.map((cat, idx) => (
                  <div key={idx} className="bg-slate-950 border border-slate-800 p-4 rounded-2xl space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h5 className="text-xs font-bold text-white">{cat.category}</h5>
                        <p className="text-[10px] text-slate-400">{cat.description}</p>
                      </div>
                      <span className={`px-2 py-0.5 rounded text-[9px] font-bold border ${
                        cat.status === 'OPTIMAL' ? 'bg-emerald-950 text-emerald-300 border-emerald-800' : 'bg-amber-950 text-amber-300 border-amber-800'
                      }`}>
                        {cat.status}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] text-slate-400">
                        <span>Usage: <strong className="text-white">{cat.usedAmount}</strong> / {cat.quotaLimit}</span>
                        <span className="text-cyan-400 font-bold">{cat.percentageUsed}%</span>
                      </div>
                      <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-cyan-500 to-indigo-500 h-full transition-all duration-500"
                          style={{ width: `${cat.percentageUsed}%` }}
                        />
                      </div>
                    </div>

                    <div className="pt-1 border-t border-slate-800/60 flex justify-between items-center text-[10px]">
                      <span className="text-slate-400">Efficiency Gain:</span>
                      <span className="text-emerald-400 font-bold flex items-center space-x-1">
                        <TrendingUp className="w-3 h-3 text-emerald-400" />
                        <span>{cat.costEfficiencyGain}</span>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: LOG VISUALIZATION */}
      {activeTab === 'LOG_VISUALIZATION' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-xs font-bold text-white uppercase flex items-center space-x-2">
                  <BarChart3 className="w-4 h-4 text-emerald-400" />
                  <span>Structured Maritime System Log Visualizer & Stream</span>
                </h3>
                <p className="text-[10px] text-slate-400">Filter, search, and audit system events across engine, satcom, AI agent, and safety PLCs</p>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => {
                    const csvContent = "data:text/csv;charset=utf-8," + systemLogs.map(l => `${l.id},${l.time},${l.subsystem},${l.severity},"${l.message}"`).join("\n");
                    const encodedUri = encodeURI(csvContent);
                    const link = document.createElement("a");
                    link.setAttribute("href", encodedUri);
                    link.setAttribute("download", `maritime_system_logs_${Date.now()}.csv`);
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    showToast('Exported system logs to CSV!');
                  }}
                  className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs flex items-center space-x-1"
                >
                  <Download className="w-3.5 h-3.5 text-slate-950" />
                  <span>EXPORT LOGS</span>
                </button>
              </div>
            </div>

            {/* LOG EVENT VISUALIZATION CHARTS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-950 border border-slate-800 p-4 rounded-2xl">
              {/* Chart 1: Severity Distribution */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-300">
                  <span className="flex items-center space-x-1.5">
                    <BarChart3 className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Log Severity Event Distribution</span>
                  </span>
                  <span className="text-[10px] text-slate-500">{systemLogs.length} Total Logs</span>
                </div>
                
                <div className="space-y-1.5 pt-1">
                  {(['INFO', 'SUCCESS', 'WARNING', 'CRITICAL'] as const).map((sev) => {
                    const count = systemLogs.filter((l) => l.severity === sev).length;
                    const pct = Math.round((count / (systemLogs.length || 1)) * 100);
                    const colorClass =
                      sev === 'CRITICAL' ? 'from-rose-500 to-red-600' :
                      sev === 'WARNING' ? 'from-amber-400 to-orange-500' :
                      sev === 'SUCCESS' ? 'from-emerald-400 to-teal-500' : 'from-cyan-400 to-blue-500';
                    return (
                      <div key={sev} className="space-y-1">
                        <div className="flex justify-between text-[10px]">
                          <span className="text-slate-400 font-bold">{sev}</span>
                          <span className="text-slate-300 font-bold">{count} ({pct}%)</span>
                        </div>
                        <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                          <div
                            className={`bg-gradient-to-r ${colorClass} h-full transition-all duration-500`}
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Chart 2: Subsystem Event Volume Breakdown */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-300">
                  <span className="flex items-center space-x-1.5">
                    <PieChart className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Subsystem Event Volume Distribution</span>
                  </span>
                  <span className="text-[10px] text-slate-500">Node Sync Active</span>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  {(['ENGINE', 'SATCOM', 'AI_AGENT', 'HULL', 'SAFETY', 'POWER'] as const).map((sub) => {
                    const count = systemLogs.filter((l) => l.subsystem === sub).length;
                    return (
                      <button
                        key={sub}
                        onClick={() => {
                          setLogSubsystemFilter(sub);
                          hapticEngine.trigger('click');
                        }}
                        className={`p-2 rounded-xl border text-left transition-all ${
                          logSubsystemFilter === sub
                            ? 'bg-cyan-950 border-cyan-500 text-cyan-200'
                            : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        <div className="text-[10px] text-slate-400 font-bold">{sub}</div>
                        <div className="text-sm font-black text-white">{count} <span className="text-[9px] font-normal text-slate-500">events</span></div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Filter & Search Toolbar */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-3" />
                <input
                  type="text"
                  value={logSearchQuery}
                  onChange={(e) => setLogSearchQuery(e.target.value)}
                  placeholder="Search log messages..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <select
                  value={logSeverityFilter}
                  onChange={(e) => setLogSeverityFilter(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                >
                  <option value="ALL">All Severities</option>
                  <option value="INFO">INFO</option>
                  <option value="SUCCESS">SUCCESS</option>
                  <option value="WARNING">WARNING</option>
                  <option value="CRITICAL">CRITICAL</option>
                </select>
              </div>

              <div className="flex items-center space-x-2">
                <ListFilter className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <select
                  value={logSubsystemFilter}
                  onChange={(e) => setLogSubsystemFilter(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                >
                  <option value="ALL">All Subsystems</option>
                  <option value="ENGINE">ENGINE</option>
                  <option value="SATCOM">SATCOM</option>
                  <option value="AI_AGENT">AI_AGENT</option>
                  <option value="HULL">HULL</option>
                  <option value="SAFETY">SAFETY</option>
                  <option value="POWER">POWER</option>
                </select>
              </div>
            </div>

            {/* Logs Table Output */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-slate-900 border-b border-slate-800 text-slate-400 text-[10px] uppercase">
                    <tr>
                      <th className="p-3">TIME</th>
                      <th className="p-3">ID</th>
                      <th className="p-3">SUBSYSTEM</th>
                      <th className="p-3">SEVERITY</th>
                      <th className="p-3">SOURCE NODE</th>
                      <th className="p-3">MESSAGE</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {filteredLogs.map((log) => (
                      <tr key={log.id} className="hover:bg-slate-900/50 transition-all">
                        <td className="p-3 text-slate-500 text-[10px] whitespace-nowrap">{log.time}</td>
                        <td className="p-3 text-cyan-400 font-bold whitespace-nowrap">{log.id}</td>
                        <td className="p-3 text-slate-300 font-bold whitespace-nowrap">{log.subsystem}</td>
                        <td className="p-3 whitespace-nowrap">
                          <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                            log.severity === 'CRITICAL' ? 'bg-rose-950 text-rose-300 border border-rose-800' :
                            log.severity === 'WARNING' ? 'bg-amber-950 text-amber-300 border border-amber-800' :
                            log.severity === 'SUCCESS' ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' :
                            'bg-slate-800 text-slate-300'
                          }`}>
                            {log.severity}
                          </span>
                        </td>
                        <td className="p-3 text-slate-400 text-[10px] whitespace-nowrap">{log.sourceNode}</td>
                        <td className="p-3 text-slate-200 leading-relaxed">{log.message}</td>
                      </tr>
                    ))}
                    {filteredLogs.length === 0 && (
                      <tr>
                        <td colSpan={6} className="p-6 text-center text-slate-500 text-xs">
                          No matching logs found for active filters.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB: PERFORMANCE ALERTS */}
      {activeTab === 'PERFORMANCE_ALERTS' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-xs font-bold text-white uppercase flex items-center space-x-2">
                  <AlertTriangle className="w-4 h-4 text-rose-400 animate-pulse" />
                  <span>Real-Time Performance Anomaly & Alert Engine</span>
                </h3>
                <p className="text-[10px] text-slate-400">Autonomous alert detection for SFOC exceedances, hydrodynamic slip surges, and engine thermal deltas</p>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-[10px] text-rose-300 bg-rose-950 border border-rose-800 px-3 py-1 rounded-xl font-bold">
                  {performanceAlerts.filter(a => a.status === 'ACTIVE_ALERT').length} Active Alerts
                </span>
              </div>
            </div>

            {/* Active Performance Alerts List */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Active & Historical Performance Alerts</h4>
              <div className="space-y-3">
                {performanceAlerts.map((alert) => (
                  <div
                    key={alert.id}
                    className={`bg-slate-950 border rounded-2xl p-5 space-y-4 transition-all ${
                      alert.status === 'ACTIVE_ALERT'
                        ? 'border-rose-500/50 shadow-rose-950/20 shadow-lg'
                        : 'border-slate-800'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                      <div className="flex items-center space-x-2 flex-wrap gap-1">
                        <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black border ${
                          alert.severity === 'CRITICAL' ? 'bg-rose-950 text-rose-300 border-rose-800' :
                          alert.severity === 'WARNING' ? 'bg-amber-950 text-amber-300 border-amber-800' :
                          'bg-emerald-950 text-emerald-300 border-emerald-800'
                        }`}>
                          {alert.severity}
                        </span>
                        <span className="text-xs font-bold text-white">{alert.id}</span>
                        <span className="text-slate-500 text-xs">•</span>
                        <span className="text-xs text-cyan-400 font-bold">{alert.vessel}</span>
                        <span className="text-slate-500 text-xs">•</span>
                        <span className="text-xs text-slate-300">{alert.subsystem}</span>
                      </div>

                      <div className="flex items-center space-x-2 text-[10px] text-slate-400">
                        <Clock className="w-3 h-3 text-slate-500" />
                        <span>{alert.timestamp}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                      <div className="space-y-1">
                        <span className="text-[10px] text-slate-400 uppercase font-bold">Metric Variance</span>
                        <p className="text-sm font-bold text-white">{alert.metricName}</p>
                        <p className="text-xs text-slate-300">
                          Current: <strong className="text-rose-400">{alert.currentValue}</strong> (Threshold: {alert.thresholdLimit})
                        </p>
                      </div>

                      <div className="space-y-1">
                        <span className="text-[10px] text-slate-400 uppercase font-bold">Root Cause Analysis</span>
                        <p className="text-xs text-slate-300">{alert.rootCause}</p>
                      </div>
                    </div>

                    {/* AI Mitigation Action Box */}
                    <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="space-y-0.5">
                        <span className="text-[9px] text-cyan-400 font-bold uppercase flex items-center space-x-1">
                          <Bot className="w-3 h-3 text-cyan-400" />
                          <span>AI Super Master Mitigation Recommendation</span>
                        </span>
                        <p className="text-xs text-slate-200">{alert.aiMitigationPlan}</p>
                      </div>

                      {alert.status === 'ACTIVE_ALERT' ? (
                        <button
                          onClick={() => handleMitigatePerformanceAlert(alert.id)}
                          className="px-4 py-2 bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-400 hover:to-amber-400 text-slate-950 font-black rounded-xl text-xs shrink-0 flex items-center space-x-1 shadow-lg"
                        >
                          <Zap className="w-3.5 h-3.5 text-slate-950" />
                          <span>AUTO-MITIGATE</span>
                        </button>
                      ) : (
                        <span className="text-emerald-400 text-[10px] font-bold bg-emerald-950 border border-emerald-800 px-3 py-1 rounded-xl shrink-0 flex items-center space-x-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          <span>AUTO-MITIGATED</span>
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Performance Threshold Rule Configurator */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <h4 className="text-xs font-bold text-white uppercase flex items-center space-x-2">
                  <SlidersHorizontal className="w-4 h-4 text-indigo-400" />
                  <span>Performance Sensitivity Threshold Rules</span>
                </h4>
                <button
                  onClick={() => {
                    setAlertThresholds({
                      sfocVariancePercent: 2.5,
                      propellerSlipPercent: 3.0,
                      vibrationLimitMms: 2.0,
                      satcomLatencyMs: 120
                    });
                    showToast('Performance alert sensitivity reset to defaults!');
                  }}
                  className="text-[10px] text-cyan-400 hover:underline font-bold"
                >
                  Reset Defaults
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1.5">
                  <div className="flex justify-between text-slate-300">
                    <span>SFOC Exceedance Limit</span>
                    <strong className="text-cyan-400">{alertThresholds.sfocVariancePercent}%</strong>
                  </div>
                  <input
                    type="range"
                    min="1.0"
                    max="5.0"
                    step="0.1"
                    value={alertThresholds.sfocVariancePercent}
                    onChange={(e) => setAlertThresholds(p => ({ ...p, sfocVariancePercent: parseFloat(e.target.value) }))}
                    className="w-full accent-cyan-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-slate-300">
                    <span>Propeller Slip Surge Limit</span>
                    <strong className="text-amber-400">{alertThresholds.propellerSlipPercent}%</strong>
                  </div>
                  <input
                    type="range"
                    min="1.5"
                    max="6.0"
                    step="0.1"
                    value={alertThresholds.propellerSlipPercent}
                    onChange={(e) => setAlertThresholds(p => ({ ...p, propellerSlipPercent: parseFloat(e.target.value) }))}
                    className="w-full accent-amber-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: STATUS NOTIFICATIONS */}
      {activeTab === 'STATUS_NOTIFICATIONS' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-xs font-bold text-white uppercase flex items-center space-x-2">
                  <Bell className="w-4 h-4 text-amber-400 animate-pulse" />
                  <span>Real-Time Maritime Status Notification Hub</span>
                </h3>
                <p className="text-[10px] text-slate-400">Live operational alerts & AI advisory status updates for bridge watchkeepers</p>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={handleEmitTestNotif}
                  className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs flex items-center space-x-1"
                >
                  <BellRing className="w-3.5 h-3.5 text-slate-950" />
                  <span>EMIT TEST ALERT</span>
                </button>

                <button
                  onClick={handleMarkAllNotifsRead}
                  className="px-3 py-1.5 bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800 rounded-xl text-xs flex items-center space-x-1"
                >
                  <CheckSquare className="w-3.5 h-3.5 text-emerald-400" />
                  <span>MARK ALL READ</span>
                </button>
              </div>
            </div>

            {/* Notification Filter Chips */}
            <div className="flex items-center space-x-2">
              <span className="text-[10px] text-slate-400 font-bold">FILTER:</span>
              <button
                onClick={() => setNotifFilter('ALL')}
                className={`px-3 py-1 rounded-lg text-xs font-bold ${
                  notifFilter === 'ALL' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'bg-slate-950 text-slate-400 border border-slate-800'
                }`}
              >
                All ({notifications.length})
              </button>
              <button
                onClick={() => setNotifFilter('UNREAD')}
                className={`px-3 py-1 rounded-lg text-xs font-bold ${
                  notifFilter === 'UNREAD' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'bg-slate-950 text-slate-400 border border-slate-800'
                }`}
              >
                Unread ({unreadNotifCount})
              </button>
              <button
                onClick={() => setNotifFilter('CRITICAL')}
                className={`px-3 py-1 rounded-lg text-xs font-bold ${
                  notifFilter === 'CRITICAL' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40' : 'bg-slate-950 text-slate-400 border border-slate-800'
                }`}
              >
                Critical
              </button>
            </div>

            {/* Notification Stream List */}
            <div className="space-y-3">
              {filteredNotifs.map((item) => (
                <div
                  key={item.id}
                  className={`border rounded-2xl p-4 transition-all space-y-2 ${
                    !item.isRead
                      ? 'bg-slate-950 border-cyan-500/50 shadow-lg'
                      : 'bg-slate-900/60 border-slate-800 opacity-80'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                        item.severity === 'CRITICAL' ? 'bg-rose-950 text-rose-300 border border-rose-800' :
                        item.severity === 'WARNING' ? 'bg-amber-950 text-amber-300 border border-amber-800' :
                        item.severity === 'SUCCESS' ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' :
                        'bg-slate-800 text-slate-300'
                      }`}>
                        {item.severity}
                      </span>
                      <span className="text-[10px] text-slate-400 font-bold uppercase">{item.subsystem}</span>
                      {!item.isRead && (
                        <span className="bg-cyan-400 w-2 h-2 rounded-full animate-ping" />
                      )}
                    </div>

                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] text-slate-500">{item.time}</span>
                      <button
                        onClick={() => handleDismissNotif(item.id)}
                        className="p-1 text-slate-500 hover:text-white"
                        title="Dismiss"
                      >
                        <XCircle className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <h4 className="text-xs font-bold text-white">{item.title}</h4>
                  <p className="text-[11px] text-slate-300 leading-relaxed font-sans">{item.description}</p>
                </div>
              ))}

              {filteredNotifs.length === 0 && (
                <div className="p-8 text-center text-slate-500 text-xs border border-dashed border-slate-800 rounded-2xl">
                  No status notifications found for selected filter.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: AUTOMATED MAINTENANCE */}
      {activeTab === 'MAINTENANCE' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-slate-900 p-4 rounded-2xl border border-slate-800">
            <div>
              <h3 className="text-xs font-bold text-white uppercase">Automated Predictive Work Orders</h3>
              <p className="text-[10px] text-slate-400">AI auto-diagnoses component wear & generates SOLAS work orders</p>
            </div>
            <button
              onClick={() => showToast('Generated new AI predictive maintenance work order!')}
              className="px-3 py-1.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl text-xs flex items-center space-x-1"
            >
              <Plus className="w-3.5 h-3.5 text-slate-950" />
              <span>NEW WORK ORDER</span>
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {tasks.map((task) => (
              <div key={task.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-black text-cyan-400">{task.id}</span>
                      <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                        task.priority === 'CRITICAL' ? 'bg-rose-950 text-rose-300 border border-rose-800' :
                        task.priority === 'HIGH' ? 'bg-amber-950 text-amber-300 border border-amber-800' :
                        'bg-slate-800 text-slate-300'
                      }`}>
                        {task.priority}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-white mt-1">{task.title}</h4>
                    <p className="text-[10px] text-slate-400">{task.subsystem} • {task.vessel}</p>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 block">DUE IN:</span>
                    <span className="text-xs font-bold text-amber-300">{task.dueInDays} Days</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                    <span className="text-slate-400 text-[10px] block">HEALTH SCORE:</span>
                    <span className={`text-sm font-black ${task.healthScore < 70 ? 'text-rose-400' : 'text-emerald-400'}`}>
                      {task.healthScore}%
                    </span>
                  </div>

                  <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                    <span className="text-slate-400 text-[10px] block">PARTS REQUIRED:</span>
                    <span className="text-slate-200 text-[10px] font-bold truncate block">{task.partsRequired.join(', ')}</span>
                  </div>

                  <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                    <span className="text-slate-400 text-[10px] block">EST. COST:</span>
                    <span className="text-sm font-black text-cyan-300">${task.estimatedCostUSD}</span>
                  </div>
                </div>

                <div className="bg-cyan-950/30 border border-cyan-800/50 p-3 rounded-xl text-xs text-cyan-200 flex items-start space-x-2">
                  <Bot className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-cyan-400 block text-[10px]">AI AGENT RECOMMENDATION:</span>
                    <p className="text-[11px] leading-relaxed">{task.aiRecommendation}</p>
                  </div>
                </div>

                {task.status === 'PENDING_AI_APPROVAL' && (
                  <div className="flex justify-end pt-1">
                    <button
                      onClick={() => handleApproveTask(task.id)}
                      className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl text-xs flex items-center space-x-1.5 shadow-lg"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-slate-950" />
                      <span>APPROVE WORK ORDER</span>
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 6: PERFORMANCE TUNING */}
      {activeTab === 'PERFORMANCE' && (
        <div className="space-y-4">
          <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800">
            <h3 className="text-xs font-bold text-white uppercase">Real-Time Propulsion & Energy Efficiency Tuning</h3>
            <p className="text-[10px] text-slate-400">Continuous AI parameter feedback loop optimizing main engine SFOC & hull hydrodynamics</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {performanceData.map((item) => (
              <div key={item.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-xl">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <h4 className="text-xs font-bold text-white">{item.metricName}</h4>
                  <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                    item.status === 'OPTIMAL' ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' :
                    'bg-amber-950 text-amber-300 border border-amber-800'
                  }`}>
                    {item.status}
                  </span>
                </div>

                <div className="flex items-baseline space-x-3">
                  <span className="text-2xl font-black text-cyan-300">{item.currentValue}</span>
                  <span className="text-xs text-slate-400">{item.unit}</span>
                  <span className="text-[10px] text-slate-500 ml-auto">Target: {item.targetValue} {item.unit}</span>
                </div>

                <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                  <div
                    className="bg-gradient-to-r from-cyan-500 to-indigo-500 h-full"
                    style={{ width: `${item.efficiencyPercent}%` }}
                  />
                </div>

                <p className="text-[11px] text-slate-300 bg-slate-950 p-2.5 rounded-xl border border-slate-800 leading-relaxed font-sans">
                  💡 <span className="font-bold text-cyan-400">AI Optimization:</span> {item.aiAction}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 7: FLEET OPERATIONS MANAGEMENT */}
      {activeTab === 'MANAGEMENT' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center space-x-2 text-xs font-bold text-cyan-400 uppercase">
              <Database className="w-4 h-4 text-cyan-400" />
              <span>Fleet Operations & Automated Resource Procurement</span>
            </div>
            <span className="text-[10px] text-cyan-300 font-bold">4 Active Vessels Under AI Governance</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
              <h4 className="text-xs font-bold text-white flex items-center space-x-1.5">
                <Box className="w-4 h-4 text-amber-400" />
                <span>Automated Parts Inventory & Reorder</span>
              </h4>
              <p className="text-[10px] text-slate-400">AI automatically orders spare parts when stock reaches reorder point.</p>
              <div className="text-xs space-y-1.5 pt-2">
                <div className="flex justify-between text-slate-300">
                  <span>Main Engine Fuel Injectors</span>
                  <span className="font-bold text-emerald-400">12 units (In Stock)</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Reefer Compressor Gas R134a</span>
                  <span className="font-bold text-amber-400">4 Cylinders (Reorder Triggered)</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
              <h4 className="text-xs font-bold text-white flex items-center space-x-1.5">
                <Users className="w-4 h-4 text-cyan-400" />
                <span>Crew Rest Hours & STCW 2010 Audit</span>
              </h4>
              <p className="text-[10px] text-slate-400">AI monitors watchkeeper shifts to prevent fatigue violations.</p>
              <div className="text-xs space-y-1.5 pt-2">
                <div className="flex justify-between text-slate-300">
                  <span>Deck Watch Compliance</span>
                  <span className="font-bold text-emerald-400">100% Compliant</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Engine Watch Compliance</span>
                  <span className="font-bold text-emerald-400">100% Compliant</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

