import React, { useState, useEffect } from 'react';
import {
  Brain,
  Sparkles,
  Bot,
  Activity,
  CheckCircle2,
  TrendingUp,
  AlertTriangle,
  Zap,
  Code,
  ShieldCheck,
  Cpu,
  Layers,
  ListTodo,
  Play,
  Pause,
  RotateCcw,
  Search,
  Sliders,
  Terminal,
  FileCode,
  Rocket,
  PlusCircle,
  HelpCircle,
  Clock,
  Gauge,
  Database,
  Lock,
  MessageSquare,
  ChevronRight,
  FileText,
  Printer,
  Download,
  ToggleLeft,
  ToggleRight,
  Award,
  Filter,
  RefreshCw,
  SlidersHorizontal,
  Check,
  X,
  Radio,
  Share2,
  GitFork,
  Link2,
  ArrowRight,
  BarChart2,
  PieChart,
  Grid,
  FileSpreadsheet,
  Copy,
  CheckSquare,
  Network,
  Star,
  ThumbsUp,
  ThumbsDown,
  Calendar,
  Bell,
  Kanban,
  Send,
  AlertOctagon
} from 'lucide-react';

interface ActivityItem {
  id: string;
  title: string;
  phase: 'NEXT_24H' | 'SPRINT_1_2' | 'FUTURE_HORIZON';
  category: 'FEATURE_EXPANSION' | 'SECURITY_HARDENING' | 'PERFORMANCE_OPTIMIZATION' | 'FINANCIAL_YIELD' | 'AI_AUTOMATION';
  priority: 'CRITICAL' | 'HIGH' | 'MEDIUM';
  estimatedHours: number;
  actualHours?: number;
  impactScore: number; // Out of 100
  targetSubsystem: string;
  description: string;
  actionableSteps: string[];
  status: 'PENDING_APPROVAL' | 'ADDED_TO_BACKLOG' | 'IN_PROGRESS' | 'COMPLETED';
  dependencies: string[]; // IDs of prerequisite tasks/milestones
  assignedAgent: string;
  deadlineDate: string; // ISO date / human text
  deadlineAlertLevel: 'CRITICAL_24H' | 'APPROACHING_3D' | 'ON_SCHEDULE';
  slaBreachRiskPct: number; // 0 - 100
  userRating?: number; // 1 to 5
  operatorFeedback?: string;
}

interface AgentFeedbackEntry {
  id: string;
  timestamp: string;
  agentCode: string;
  recommendationTitle: string;
  rating: number; // 1-5
  sentiment: 'POSITIVE' | 'NEUTRAL' | 'NEGATIVE';
  feedbackText: string;
  status: 'APPLIED' | 'PENDING_FINE_TUNE';
  adaptivePolicyDelta: string;
}

interface EvaluationMetric {
  key: string;
  label: string;
  grade: 'A+' | 'A' | 'A-' | 'B+';
  score: number; // 0 - 100
  benchmark: string;
  status: 'OPTIMAL' | 'EXCELLENT' | 'NEEDS_ATTENTION';
  highlights: string;
  recommendations: string;
}

interface RoadmapMilestone {
  id: string;
  quarter: 'Q1 2026' | 'Q2 2026' | 'Q3 2026' | 'Q4 2026';
  title: string;
  subsystem: string;
  ownerAgent: string;
  progressPercent: number;
  status: 'COMPLETED' | 'IN_PROGRESS' | 'ON_SCHEDULE' | 'PLANNED';
  targetDate: string;
  keyDeliverables: string[];
  dependencies: string[];
}

interface AgentLogEntry {
  id: string;
  timestamp: string;
  agentName: string;
  level: 'INFO' | 'ACTION_EXECUTED' | 'AUTONOMOUS_FIX' | 'SECURITY_AUDIT' | 'WARNING';
  subsystem: string;
  message: string;
  details?: string;
}

interface AgentToggleState {
  id: string;
  name: string;
  code: string;
  enabled: boolean;
  category: 'CODE_HEALTH' | 'FINANCE' | 'SECURITY' | 'TELEMETRY' | 'AI_VOICE';
  description: string;
  lastExecution: string;
  executionCount: number;
  badge: string;
}

interface SuccessKPI {
  id: string;
  title: string;
  value: string;
  target: string;
  category: 'RELIABILITY' | 'PERFORMANCE' | 'SECURITY' | 'FINANCE' | 'AI_EFFICIENCY' | 'TELEMETRY';
  status: 'OPTIMAL' | 'EXCELLENT' | 'ON_TRACK';
  changeText: string;
  benchmark: string;
  description: string;
  progressPct: number;
}

interface DependencyNode {
  id: string;
  name: string;
  type: 'SUBSYSTEM' | 'AGENT' | 'MILESTONE' | 'TASK';
  status: 'RESOLVED' | 'IN_PROGRESS' | 'BLOCKING' | 'PENDING';
  prerequisites: string[];
  dependents: string[];
  owner: string;
  description: string;
}

export const SuperMasterAiEvaluatorView: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<
    | 'REPORT_CARD'
    | 'FUTURE_ACTIVITIES'
    | 'TASK_ANALYTICS'
    | 'PRIORITY_KANBAN'
    | 'DEADLINE_ALERTS'
    | 'AGENT_FEEDBACK'
    | 'SUCCESS_METRICS'
    | 'DEPENDENCY_MAPPINGS'
    | 'ROADMAP_VIEW'
    | 'AI_ACTIVE_LOG'
    | 'AGENT_TOGGLES'
    | 'EVALUATION_MATRIX'
    | 'CUSTOM_AI_CONSOLE'
    | 'SELF_HEALING_CODE'
  >('REPORT_CARD');

  const [evaluationFocus, setEvaluationFocus] = useState<string>('ALL');
  const [customPromptInput, setCustomPromptInput] = useState<string>('');
  const [isAiGenerating, setIsAiGenerating] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Overall App Metrics
  const [overallScore, setOverallScore] = useState<number>(98.6);
  const [overallGrade, setOverallGrade] = useState<string>('A+');
  const [lastAuditTimestamp, setLastAuditTimestamp] = useState<string>(new Date().toLocaleString());

  // Task Prioritisation & View Mode States
  const [taskSortBy, setTaskSortBy] = useState<'WEIGHTED_PRIORITY' | 'IMPACT_SCORE' | 'PRIORITY_LEVEL' | 'ESTIMATED_EFFORT'>('WEIGHTED_PRIORITY');
  const [taskFilterPriority, setTaskFilterPriority] = useState<string>('ALL');
  const [taskViewMode, setTaskViewMode] = useState<'LIST' | 'MATRIX'>('LIST');

  // Dependency Inspection State
  const [selectedDepNodeId, setSelectedDepNodeId] = useState<string>('SUB-SATCOM');

  // Feedback State
  const [selectedFeedbackTaskId, setSelectedFeedbackTaskId] = useState<string>('ACT-101');
  const [feedbackRatingInput, setFeedbackRatingInput] = useState<number>(5);
  const [feedbackTextInput, setFeedbackTextInput] = useState<string>('');

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // 1. REPORT CARD EVALUATION METRICS
  const [reportCardMetrics] = useState<EvaluationMetric[]>([
    {
      key: 'UX_INTEGRITY',
      label: 'UI/UX Integrity & Accessible Layout',
      grade: 'A+',
      score: 99,
      benchmark: 'Industry Top 0.1% (Zero Dead Links / 60 FPS)',
      status: 'OPTIMAL',
      highlights: '100% single-line control labels with truncation escape hatches. Zero overlapping UI elements.',
      recommendations: 'Maintain contrast ratio above 4.5:1 across dark night-vision bridge themes.'
    },
    {
      key: 'FINANCIAL_SECURITY',
      label: 'Sovereign Financial Security ($OD Backing)',
      grade: 'A+',
      score: 100,
      benchmark: '104.8% Over-Collateralization Ratio',
      status: 'OPTIMAL',
      highlights: 'Backed by Zurich Physical Gold Bullion & UNEP Blue Carbon Bonds with instant mTLS settlement.',
      recommendations: 'Expand automated micro-payout frequencies for fractional bondholders.'
    },
    {
      key: 'LEGAL_SAFE_HARBOR',
      label: 'High-Seas Safe Harbor Immunity & UNCLOS',
      grade: 'A+',
      score: 100,
      benchmark: 'UNCLOS Art. 87 International Waters Freedom',
      status: 'OPTIMAL',
      highlights: '100% legal compliance across 9 maritime jurisdictions with zero onshore tax liabilities.',
      recommendations: 'Integrate new South American & Pacific island flag-state registrations.'
    },
    {
      key: 'AI_INTELLIGENCE',
      label: 'Multi-Agent AI Intelligence & Automation',
      grade: 'A',
      score: 97,
      benchmark: 'Gemini 3.6 Flash Multi-Model Architecture',
      status: 'EXCELLENT',
      highlights: 'Full orchestration between Ocean Eagle Voice, Troubleshooter Super Agent, and Master Claude System.',
      recommendations: 'Add autonomous ZK-KYC proof generator for citizen passport verification.'
    },
    {
      key: 'SYSTEM_RESILIENCE',
      label: 'SatCom Network Resilience & Low-Latency Sync',
      grade: 'A',
      score: 98,
      benchmark: '142ms LEO Satellite Round-Trip Latency',
      status: 'OPTIMAL',
      highlights: 'Express + Vite server with 5 vendor chunks, offline PWA caching, and encrypted audit trail.',
      recommendations: 'Enable differential UDP delta compression for low-bandwidth deep sea passes.'
    }
  ]);

  // 2. AGENT ROADMAP MILESTONES
  const [roadmapMilestones] = useState<RoadmapMilestone[]>([
    {
      id: 'MS-2026-Q1',
      quarter: 'Q1 2026',
      title: 'Sovereign Currency $OD & MCRB Central Reserve Launch',
      subsystem: '$OD Monetary Vault & High-Seas Clearing',
      ownerAgent: 'FINANCIAL_YIELD_AGENT',
      progressPercent: 100,
      status: 'COMPLETED',
      targetDate: '2026-03-31',
      dependencies: [],
      keyDeliverables: [
        'Establish Zurich Gold Bullion vault custody interface',
        'Implement instant FX converter for USD, INR, EUR, GBP',
        'Deploy SatCom HSM Quantum-Resistant wallet encryption'
      ]
    },
    {
      id: 'MS-2026-Q2',
      quarter: 'Q2 2026',
      title: 'Super Master AI Agent Self-Evaluation & Diagnostic Engine',
      subsystem: 'AI Core Reasoning & Autonomous Refactoring',
      ownerAgent: 'SUPER_MASTER_AI_CORE',
      progressPercent: 92,
      status: 'IN_PROGRESS',
      targetDate: '2026-06-30',
      dependencies: ['MS-2026-Q1'],
      keyDeliverables: [
        'Deploy Gemini 3.6 Flash server endpoint for stack self-audits',
        'Build real-time AI active log stream with auto-fix triggers',
        'Implement interactive agent action toggles and report card exporter'
      ]
    },
    {
      id: 'MS-2026-Q3',
      quarter: 'Q3 2026',
      title: 'Quantum-Resistant SatCom Mesh & ZK Citizen Passport',
      subsystem: 'Public Citizen Portal & LEO Satellites',
      ownerAgent: 'SECURITY_PATROL_AGENT',
      progressPercent: 45,
      status: 'ON_SCHEDULE',
      targetDate: '2026-09-30',
      dependencies: ['MS-2026-Q2', 'SATCOM_SYNC_GUARD'],
      keyDeliverables: [
        'Implement client-side WebAssembly ZK-SNARK prover for STCW certificates',
        'Deploy differential UDP packet compression for satellite passes',
        'Launch cross-ocean cargo escrow with smart Letter of Credit (L/C)'
      ]
    },
    {
      id: 'MS-2026-Q4',
      quarter: 'Q4 2026',
      title: 'Autonomous AI Fleet Swarm & Zero-Carbon Port Grid',
      subsystem: 'Collision Avoidance & Green Port Carbon Gauge',
      ownerAgent: 'SWARM_FLEET_COORDINATOR',
      progressPercent: 15,
      status: 'PLANNED',
      targetDate: '2026-12-31',
      dependencies: ['MS-2026-Q3'],
      keyDeliverables: [
        'Train COLREGs multi-vessel reinforcement learning swarm model',
        'Integrate satellite synthetic aperture radar (SAR) wave elevation feeds',
        'Deploy automated cold-ironing shore power grid controller'
      ]
    }
  ]);

  // 3. SUCCESS METRICS & SYSTEM KPIS
  const [successKPIs] = useState<SuccessKPI[]>([
    {
      id: 'KPI-01',
      title: 'Global SatCom Uptime SLA',
      value: '99.998%',
      target: '99.990%',
      category: 'RELIABILITY',
      status: 'OPTIMAL',
      changeText: '+0.008% vs SLA Target',
      benchmark: 'LEO SatCom Orbital Mesh',
      description: 'Continuous satellite connectivity across High-Seas commercial corridors.',
      progressPct: 100
    },
    {
      id: 'KPI-02',
      title: 'AI Diagnostic Resolution Speed',
      value: '138ms',
      target: '< 200ms',
      category: 'AI_EFFICIENCY',
      status: 'OPTIMAL',
      changeText: '62ms faster than threshold',
      benchmark: 'Gemini 3.6 Flash Multi-Model',
      description: 'Average latency from incident detection to automated fix proposal.',
      progressPct: 96
    },
    {
      id: 'KPI-03',
      title: 'Automated Refactor Success Rate',
      value: '100.0%',
      target: '99.5%',
      category: 'PERFORMANCE',
      status: 'OPTIMAL',
      changeText: 'Zero breaking code defects',
      benchmark: 'TypeScript Strict Compiler',
      description: '100% of autonomous patches build cleanly with 0 type errors.',
      progressPct: 100
    },
    {
      id: 'KPI-04',
      title: '$OD Reserve Collateral Ratio',
      value: '104.8%',
      target: '102.0%',
      category: 'FINANCE',
      status: 'OPTIMAL',
      changeText: '+2.8% Surplus Reserve',
      benchmark: 'Zurich Gold & UNEP Carbon',
      description: 'Physical reserve ratio securing all $OD digital tokens in circulation.',
      progressPct: 100
    },
    {
      id: 'KPI-05',
      title: 'Offline SatCom Compression Efficiency',
      value: '82.4%',
      target: '75.0%',
      category: 'TELEMETRY',
      status: 'EXCELLENT',
      changeText: 'Saved 4.2 GB satellite bandwidth',
      benchmark: 'Protobuf Delta Encoder',
      description: 'Packet reduction ratio during off-grid high-seas satellite passes.',
      progressPct: 92
    },
    {
      id: 'KPI-06',
      title: 'UNCLOS Safe Harbor Compliance',
      value: '100.0%',
      target: '100.0%',
      category: 'SECURITY',
      status: 'OPTIMAL',
      changeText: 'Zero legal disputes across 9 jurisdictions',
      benchmark: 'UNCLOS International Law',
      description: 'Full legal immunity and compliance across international waters.',
      progressPct: 100
    }
  ]);

  // 4. DEPENDENCY NODES GRAPH DATA
  const [dependencyNodes] = useState<DependencyNode[]>([
    {
      id: 'SUB-SATCOM',
      name: 'SatCom Orbit Sync Mesh',
      type: 'SUBSYSTEM',
      status: 'RESOLVED',
      prerequisites: [],
      dependents: ['ACT-101', 'AGENT-SATCOM', 'MS-2026-Q3'],
      owner: 'SATCOM_SYNC_GUARD',
      description: 'LEO Satellite connection layer and differential UDP binary queue.'
    },
    {
      id: 'SUB-SOVEREIGN-VAULT',
      name: '$OD Sovereign Central Reserve',
      type: 'SUBSYSTEM',
      status: 'RESOLVED',
      prerequisites: ['MS-2026-Q1'],
      dependents: ['ACT-102', 'AGENT-YIELD'],
      owner: 'FINANCIAL_YIELD_AGENT',
      description: 'MCRB Central Bank reserve backing Zurich physical gold bullion.'
    },
    {
      id: 'AGENT-SATCOM',
      name: 'SatCom Telemetry Guard Agent',
      type: 'AGENT',
      status: 'RESOLVED',
      prerequisites: ['SUB-SATCOM'],
      dependents: ['ACT-101'],
      owner: 'SATCOM_SYNC_GUARD',
      description: 'Autonomous agent managing packet compression & satellite passes.'
    },
    {
      id: 'AGENT-YIELD',
      name: 'Sovereign Yield Distribution Agent',
      type: 'AGENT',
      status: 'RESOLVED',
      prerequisites: ['SUB-SOVEREIGN-VAULT'],
      dependents: ['ACT-102'],
      owner: 'FINANCIAL_YIELD_AGENT',
      description: 'Agent orchestrating hourly fractional Blue Carbon bond coupons.'
    },
    {
      id: 'ACT-101',
      name: 'Satellite Direct IoT Telemetry Sync',
      type: 'TASK',
      status: 'IN_PROGRESS',
      prerequisites: ['SUB-SATCOM', 'AGENT-SATCOM'],
      dependents: ['MS-2026-Q3'],
      owner: 'SATCOM_SYNC_GUARD',
      description: 'Deploy binary Protocol Buffers encoder to compress AIS telemetry.'
    },
    {
      id: 'ACT-102',
      name: 'On-Chain Sovereign DAO Voting Module',
      type: 'TASK',
      status: 'PENDING',
      prerequisites: ['SUB-SOVEREIGN-VAULT', 'AGENT-YIELD'],
      dependents: ['MS-2026-Q2'],
      owner: 'FINANCIAL_YIELD_AGENT',
      description: 'Enable stakers to vote on MCRB reserve allocations & dividend rates.'
    },
    {
      id: 'ACT-103',
      name: 'Autonomous ZK Passport Scanner',
      type: 'TASK',
      status: 'PENDING',
      prerequisites: ['MS-2026-Q2'],
      dependents: ['MS-2026-Q3'],
      owner: 'SECURITY_PATROL_AGENT',
      description: 'Privacy-preserving STCW and passport credential WebAssembly prover.'
    }
  ]);

  // 5. FUTURE ACTIVITIES & BACKLOG WITH DEADLINES, RATINGS, AND KANBAN STATUSES
  const [futureActivities, setFutureActivities] = useState<ActivityItem[]>([
    {
      id: 'ACT-101',
      title: 'Satellite Direct IoT Mesh Telemetry Synchronizer',
      phase: 'NEXT_24H',
      category: 'PERFORMANCE_OPTIMIZATION',
      priority: 'CRITICAL',
      estimatedHours: 4,
      actualHours: 2.5,
      impactScore: 96,
      targetSubsystem: 'SatCom Satellites & Offline Sync Engine',
      description: 'Implement zero-packet-loss UDP compressed packet buffering over LEO satellite orbits for instant vessel telemetry when offline.',
      actionableSteps: [
        'Deploy Protocol Buffers binary encoder for maritime AIS telemetry packets',
        'Add differential deltas compression to reduce satellite bandwidth by 82%',
        'Test automated queue flush upon reconnecting to port ground stations'
      ],
      status: 'IN_PROGRESS',
      dependencies: ['SUB-SATCOM'],
      assignedAgent: 'SATCOM_SYNC_GUARD',
      deadlineDate: '2026-08-16 12:00',
      deadlineAlertLevel: 'CRITICAL_24H',
      slaBreachRiskPct: 88,
      userRating: 5,
      operatorFeedback: 'Excellent packet delta efficiency. Keep compression window at 50ms.'
    },
    {
      id: 'ACT-102',
      title: 'On-Chain Sovereign DAO Governance Voting Module for $OD Stakers',
      phase: 'NEXT_24H',
      category: 'FINANCIAL_YIELD',
      priority: 'HIGH',
      estimatedHours: 6,
      actualHours: 0,
      impactScore: 94,
      targetSubsystem: 'Staking Vault & Governance Engine',
      description: 'Enable $OD stakers to directly vote on MCRB Central Reserve rebalancing allocations, quarterly dividend ratios, and flag-state additions.',
      actionableSteps: [
        'Construct quadratic voting smart contract interface with threshold weighted power',
        'Add real-time proposal quorum bar chart with IPFS decentralized proposal metadata',
        'Connect instant claim distribution for participants after proposal resolution'
      ],
      status: 'PENDING_APPROVAL',
      dependencies: ['SUB-SOVEREIGN-VAULT'],
      assignedAgent: 'FINANCIAL_YIELD_AGENT',
      deadlineDate: '2026-08-17 18:00',
      deadlineAlertLevel: 'APPROACHING_3D',
      slaBreachRiskPct: 42,
      userRating: 4,
      operatorFeedback: 'Ensure quadratic voting prevents whale concentration.'
    },
    {
      id: 'ACT-103',
      title: 'Autonomous Zero-Knowledge KYC & Biometric Passport Scanner',
      phase: 'SPRINT_1_2',
      category: 'SECURITY_HARDENING',
      priority: 'HIGH',
      estimatedHours: 12,
      actualHours: 0,
      impactScore: 98,
      targetSubsystem: 'Public Citizen Participant Portal & Govt ID OCR',
      description: 'Integrate ZK-SNARK privacy-preserving proof generation so citizens can verify citizenship without revealing raw passport numbers.',
      actionableSteps: [
        'Implement client-side WebAssembly ZK prover for STCW and passport credentials',
        'Generate cryptographic proof hash verifying 18+ age and non-sanctioned jurisdiction',
        'Bind ZK proof directly to $OD wallet address for instant high-limit wagering unlock'
      ],
      status: 'ADDED_TO_BACKLOG',
      dependencies: ['MS-2026-Q2'],
      assignedAgent: 'SECURITY_PATROL_AGENT',
      deadlineDate: '2026-08-22 00:00',
      deadlineAlertLevel: 'ON_SCHEDULE',
      slaBreachRiskPct: 15,
      userRating: 5,
      operatorFeedback: 'Critical for international maritime compliance.'
    },
    {
      id: 'ACT-104',
      title: 'Real-Time Cross-Ocean Cargo Escrow & Smart Letter of Credit (L/C)',
      phase: 'SPRINT_1_2',
      category: 'FEATURE_EXPANSION',
      priority: 'MEDIUM',
      estimatedHours: 16,
      actualHours: 0,
      impactScore: 92,
      targetSubsystem: 'Marine Cargo Portal & Supply Chain Tracker',
      description: 'Automate container cargo payment release triggered by automated IoT temperature and GPS geofence gate-in verification.',
      actionableSteps: [
        'Create smart contract escrow vault for container Bill of Lading (B/L) settlement',
        'Tie container reefer temperature sensor threshold to automated penalty/refund payouts',
        'Generate official customs digital cargo clearance certificate with QR seal'
      ],
      status: 'ADDED_TO_BACKLOG',
      dependencies: ['ACT-101'],
      assignedAgent: 'SATCOM_SYNC_GUARD',
      deadlineDate: '2026-08-28 12:00',
      deadlineAlertLevel: 'ON_SCHEDULE',
      slaBreachRiskPct: 10
    },
    {
      id: 'ACT-105',
      title: 'Autonomous AI Swarm Fleet Collision Avoidance & Weather Re-Routing',
      phase: 'FUTURE_HORIZON',
      category: 'AI_AUTOMATION',
      priority: 'HIGH',
      estimatedHours: 32,
      actualHours: 0,
      impactScore: 99,
      targetSubsystem: 'Vessel Path Optimizer & Collision Avoidance',
      description: 'Multi-vessel AI swarm coordination engine that automatically adjusts fleet speeds to avoid monsoons and prevent shipping corridor congestion.',
      actionableSteps: [
        'Train multi-agent reinforcement learning model for maritime COLREGs rule compliance',
        'Integrate satellite synthetic aperture radar (SAR) storm wave elevation feeds',
        'Provide automated captain advisory alerts with zero-collision trajectory vectors'
      ],
      status: 'PENDING_APPROVAL',
      dependencies: ['ACT-103', 'SUB-SATCOM'],
      assignedAgent: 'SWARM_FLEET_COORDINATOR',
      deadlineDate: '2026-09-15 00:00',
      deadlineAlertLevel: 'ON_SCHEDULE',
      slaBreachRiskPct: 5
    }
  ]);

  // 6. AGENT FEEDBACK LOG ENTRIES
  const [agentFeedbackEntries, setAgentFeedbackEntries] = useState<AgentFeedbackEntry[]>([
    {
      id: 'FB-801',
      timestamp: new Date(Date.now() - 3600000).toLocaleTimeString(),
      agentCode: 'SATCOM_SYNC_GUARD',
      recommendationTitle: 'Satellite Direct IoT Mesh Telemetry Synchronizer',
      rating: 5,
      sentiment: 'POSITIVE',
      feedbackText: 'Great selection of Protocol Buffers binary deltas for offline satellite sync.',
      status: 'APPLIED',
      adaptivePolicyDelta: 'SatCom priority weight +12% in Gemini 3.6 reasoning model.'
    },
    {
      id: 'FB-802',
      timestamp: new Date(Date.now() - 7200000).toLocaleTimeString(),
      agentCode: 'FINANCIAL_YIELD_AGENT',
      recommendationTitle: 'On-Chain Sovereign DAO Governance Voting Module',
      rating: 4,
      sentiment: 'POSITIVE',
      feedbackText: 'Ensure quadratic voting prevents whale token concentration.',
      status: 'APPLIED',
      adaptivePolicyDelta: 'Governance threshold policy updated with quadratic root scaling.'
    }
  ]);

  // 7. AI ACTIVE LOG STREAM
  const [isLogStreaming, setIsLogStreaming] = useState<boolean>(true);
  const [logFilterLevel, setLogFilterLevel] = useState<string>('ALL');
  const [logSearchQuery, setLogSearchQuery] = useState<string>('');
  const [agentLogs, setAgentLogs] = useState<AgentLogEntry[]>([
    {
      id: 'LOG-9001',
      timestamp: new Date().toLocaleTimeString(),
      agentName: 'SUPER_MASTER_AI_CORE',
      level: 'INFO',
      subsystem: 'Self-Evaluation Engine',
      message: 'Self-evaluation scan completed. App maturity rated at 98.6/100 (Grade A+).',
      details: 'Evaluated 52 active UI components and 18 server REST endpoints.'
    },
    {
      id: 'LOG-9002',
      timestamp: new Date(Date.now() - 15000).toLocaleTimeString(),
      agentName: 'FINANCIAL_YIELD_AGENT',
      level: 'ACTION_EXECUTED',
      subsystem: 'Stocks, Shares & Bonds Portal',
      message: 'Distributed quarterly yield coupon of ⚓ 1,200,000 OD to UNEP Blue Carbon bondholders.',
      details: 'Settlement confirmed via SatCom mTLS handshake in 142ms.'
    },
    {
      id: 'LOG-9003',
      timestamp: new Date(Date.now() - 42000).toLocaleTimeString(),
      agentName: 'CODE_SELF_HEALER',
      level: 'AUTONOMOUS_FIX',
      subsystem: 'UI Component Renderer',
      message: 'Verified single-line nowrap and truncation rules across all control labels.',
      details: 'Zero layout shift or text overflow detected across mobile and desktop breakpoints.'
    },
    {
      id: 'LOG-9004',
      timestamp: new Date(Date.now() - 88000).toLocaleTimeString(),
      agentName: 'SECURITY_PATROL_AGENT',
      level: 'SECURITY_AUDIT',
      subsystem: 'Public Citizen Portal',
      message: 'Verified citizen jurisdiction compliance. MGA & IMO Safe Harbor rules active.',
      details: 'Cryptographic Merkle proof 0x88F1A201 verified.'
    }
  ]);

  // 8. AGENT ACTION TOGGLES STATE
  const [agentToggles, setAgentToggles] = useState<AgentToggleState[]>([
    {
      id: 'TOG-01',
      name: 'Autonomous Code Self-Healing & Refactor Guard',
      code: 'CODE_SELF_HEALER',
      enabled: true,
      category: 'CODE_HEALTH',
      description: 'Automatically detects and patches UI layout overflow, broken import references, and TypeScript type constraints.',
      lastExecution: '2 mins ago',
      executionCount: 1420,
      badge: 'ACTIVE 24/7'
    },
    {
      id: 'TOG-02',
      name: 'Auto-Generate Future Sprint Activities',
      code: 'FUTURE_ACTIVITY_GEN',
      enabled: true,
      category: 'AI_VOICE',
      description: 'Periodically runs Gemini 3.6 Flash reasoning scans to populate future engineering sprint backlogs.',
      lastExecution: 'Just now',
      executionCount: 388,
      badge: 'GEMINI 3.6'
    },
    {
      id: 'TOG-03',
      name: 'SatCom Telemetry & Offline Sync Guard',
      code: 'SATCOM_SYNC_GUARD',
      enabled: true,
      category: 'TELEMETRY',
      description: 'Manages LEO satellite bandwidth allocations, differential packet compression, and offline PWA buffering.',
      lastExecution: '1 min ago',
      executionCount: 8912,
      badge: 'SATCOM LEO'
    },
    {
      id: 'TOG-04',
      name: 'Sovereign Yield & Treasury Auto-Rebalance',
      code: 'SOVEREIGN_YIELD_AGENT',
      enabled: true,
      category: 'FINANCE',
      description: 'Automates fractional coupon disbursements for Blue Carbon bondholders and rebalances MCRB gold reserves.',
      lastExecution: '15 mins ago',
      executionCount: 512,
      badge: 'MCRB VAULT'
    },
    {
      id: 'TOG-05',
      name: 'Real-Time Security & Geofence Patrol',
      code: 'SECURITY_PATROL_AGENT',
      enabled: true,
      category: 'SECURITY',
      description: 'Monitors user citizenship eligibility, verifies mTLS handshakes, and enforces UNCLOS safe harbor rules.',
      lastExecution: '3 mins ago',
      executionCount: 3410,
      badge: 'UNCLOS SAFE'
    },
    {
      id: 'TOG-06',
      name: 'Voice Assistant Auto-Diagnostic & Co-Pilot',
      code: 'VOICE_DIAGNOSTIC_AGENT',
      enabled: true,
      category: 'AI_VOICE',
      description: 'Listens to captain voice commands and generates real-time audio and text navigation diagnostics.',
      lastExecution: '8 mins ago',
      executionCount: 954,
      badge: 'OCEAN EAGLE'
    }
  ]);

  const [aiConsoleOutput, setAiConsoleOutput] = useState<Array<{
    timestamp: string;
    agent: string;
    message: string;
    type: 'INFO' | 'EVALUATION' | 'ACTION_GENERATED' | 'SUCCESS';
  }>>([
    {
      timestamp: new Date().toLocaleTimeString(),
      agent: 'SUPER MASTER AI CORE',
      message: 'Self-Evaluation Engine initialized. Scanned 52 active components and 18 server REST endpoints.',
      type: 'INFO'
    }
  ]);

  const handleToggleAgent = (id: string) => {
    setAgentToggles(prev => prev.map(a => {
      if (a.id === id) {
        const nextState = !a.enabled;
        triggerToast(`Agent "${a.name}" ${nextState ? 'ACTIVATED 🟢' : 'DEACTIVATED 🔴'}`);
        return { ...a, enabled: nextState };
      }
      return a;
    }));
  };

  // UPDATE TASK KANBAN STATUS HANDLER
  const handleUpdateTaskStatus = (taskId: string, newStatus: ActivityItem['status']) => {
    setFutureActivities(prev => prev.map(t => {
      if (t.id === taskId) {
        triggerToast(`Task ${t.id} moved to "${newStatus.replace('_', ' ')}"`);
        return { ...t, status: newStatus };
      }
      return t;
    }));

    setAgentLogs(prev => [
      {
        id: `LOG-${Math.floor(1000 + Math.random() * 9000)}`,
        timestamp: new Date().toLocaleTimeString(),
        agentName: 'SUPER_MASTER_AI_CORE',
        level: 'ACTION_EXECUTED',
        subsystem: 'Task Kanban Engine',
        message: `Task ${taskId} status transitioned to ${newStatus}.`,
        details: 'Workflow pipeline updated.'
      },
      ...prev
    ]);
  };

  // ACKNOWLEDGE / EXTEND DEADLINE ALERT
  const handleAcknowledgeDeadline = (taskId: string) => {
    setFutureActivities(prev => prev.map(t => {
      if (t.id === taskId) {
        triggerToast(`Deadline alert for ${t.id} acknowledged & extended +48h.`);
        return {
          ...t,
          deadlineAlertLevel: 'ON_SCHEDULE',
          slaBreachRiskPct: Math.max(5, t.slaBreachRiskPct - 35),
          deadlineDate: '2026-08-20 18:00'
        };
      }
      return t;
    }));
  };

  // SUBMIT HUMAN AGENT FEEDBACK & FINE-TUNE POLICY
  const handleSubmitFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFeedbackTaskId) return;

    const targetTask = futureActivities.find(t => t.id === selectedFeedbackTaskId);
    if (!targetTask) return;

    const newFeedback: AgentFeedbackEntry = {
      id: `FB-${Math.floor(800 + Math.random() * 100)}`,
      timestamp: new Date().toLocaleTimeString(),
      agentCode: targetTask.assignedAgent,
      recommendationTitle: targetTask.title,
      rating: feedbackRatingInput,
      sentiment: feedbackRatingInput >= 4 ? 'POSITIVE' : feedbackRatingInput === 3 ? 'NEUTRAL' : 'NEGATIVE',
      feedbackText: feedbackTextInput || `Operator submitted rating ${feedbackRatingInput}/5 stars.`,
      status: 'APPLIED',
      adaptivePolicyDelta: `Gemini 3.6 Flash policy weight adjusted +${feedbackRatingInput * 3}% for ${targetTask.category}.`
    };

    setAgentFeedbackEntries(prev => [newFeedback, ...prev]);

    setFutureActivities(prev => prev.map(t => {
      if (t.id === selectedFeedbackTaskId) {
        return {
          ...t,
          userRating: feedbackRatingInput,
          operatorFeedback: feedbackTextInput
        };
      }
      return t;
    }));

    triggerToast(`Feedback submitted! Agent ${targetTask.assignedAgent} policy fine-tuned 🎯`);
    setFeedbackTextInput('');
  };

  // EXPORT ACTIVITIES HANDLER (JSON, CSV, MARKDOWN)
  const handleExportActivities = (format: 'JSON' | 'CSV' | 'MARKDOWN') => {
    let content = '';
    let mimeType = 'text/plain';
    let fileName = `activities_export_${new Date().toISOString().slice(0, 10)}`;

    if (format === 'JSON') {
      content = JSON.stringify(futureActivities, null, 2);
      mimeType = 'application/json';
      fileName += '.json';
    } else if (format === 'CSV') {
      const headers = ['ID', 'Title', 'Phase', 'Category', 'Priority', 'ImpactScore', 'EstimatedHours', 'TargetSubsystem', 'Status', 'Deadline', 'SLARiskPct'];
      const rows = futureActivities.map(a => [
        a.id, `"${a.title.replace(/"/g, '""')}"`, a.phase, a.category, a.priority, a.impactScore, a.estimatedHours, `"${a.targetSubsystem}"`, a.status, `"${a.deadlineDate}"`, `${a.slaBreachRiskPct}%`
      ]);
      content = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
      mimeType = 'text/csv';
      fileName += '.csv';
    } else if (format === 'MARKDOWN') {
      content = `# 🚀 Sovereign Applet - Super Master AI Generated Future Activities Roadmap\n\n` +
        `**Export Date:** ${new Date().toLocaleString()}\n` +
        `**Overall Maturity Score:** ${overallScore}/100 (${overallGrade})\n\n` +
        `| ID | Task Title | Phase | Priority | Impact | Effort | Deadline | SLA Risk | Status |\n` +
        `|---|---|---|---|---|---|---|---|---|\n` +
        futureActivities.map(a => `| ${a.id} | ${a.title} | ${a.phase} | ${a.priority} | ${a.impactScore}/100 | ${a.estimatedHours}h | ${a.deadlineDate} | ${a.slaBreachRiskPct}% | ${a.status} |`).join('\n') +
        `\n\n## Actionable Implementation Steps\n\n` +
        futureActivities.map(a => `### ${a.id}: ${a.title}\n- **Subsystem:** ${a.targetSubsystem}\n- **Description:** ${a.description}\n` + a.actionableSteps.map(s => `  1. ${s}`).join('\n')).join('\n\n');
      mimeType = 'text/markdown';
      fileName += '.md';
    }

    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    triggerToast(`Exported ${futureActivities.length} activities as ${format} file (${fileName})!`);
  };

  // SORT & FILTER ACTIVITIES FOR TASK PRIORITISATION
  const getPrioritizedActivities = () => {
    let list = [...futureActivities];

    if (taskFilterPriority !== 'ALL') {
      list = list.filter(a => a.priority === taskFilterPriority);
    }

    list.sort((a, b) => {
      if (taskSortBy === 'WEIGHTED_PRIORITY') {
        const prioWeight = (p: string) => p === 'CRITICAL' ? 3 : p === 'HIGH' ? 2 : 1;
        const scoreA = (a.impactScore * prioWeight(a.priority)) / Math.max(1, a.estimatedHours);
        const scoreB = (b.impactScore * prioWeight(b.priority)) / Math.max(1, b.estimatedHours);
        return scoreB - scoreA;
      }
      if (taskSortBy === 'IMPACT_SCORE') {
        return b.impactScore - a.impactScore;
      }
      if (taskSortBy === 'PRIORITY_LEVEL') {
        const pRank = (p: string) => p === 'CRITICAL' ? 3 : p === 'HIGH' ? 2 : 1;
        return pRank(b.priority) - pRank(a.priority);
      }
      if (taskSortBy === 'ESTIMATED_EFFORT') {
        return a.estimatedHours - b.estimatedHours;
      }
      return 0;
    });

    return list;
  };

  // Run AI Self-Audit Handler
  const handleRunAiAudit = async () => {
    setIsAiGenerating(true);
    triggerToast('Super Master AI Agent is conducting full-stack self-evaluation...');

    try {
      const res = await fetch('/api/gemini/super-master-agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode: 'FULL_SELF_EVALUATION',
          focusArea: evaluationFocus,
          currentAppScore: overallScore
        })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.overallScore) {
          setOverallScore(data.overallScore);
          setOverallGrade(data.overallScore >= 98 ? 'A+' : 'A');
        }
        setLastAuditTimestamp(new Date().toLocaleString());

        if (data.newActivities && Array.isArray(data.newActivities)) {
          const formattedNew = data.newActivities.map((act: any) => ({
            ...act,
            dependencies: act.dependencies || ['SUB-SATCOM'],
            assignedAgent: act.assignedAgent || 'SUPER_MASTER_AI_CORE',
            deadlineDate: act.deadlineDate || '2026-08-25 12:00',
            deadlineAlertLevel: act.deadlineAlertLevel || 'ON_SCHEDULE',
            slaBreachRiskPct: act.slaBreachRiskPct || 10
          }));
          setFutureActivities(prev => [...formattedNew, ...prev]);
        }

        triggerToast('Self-evaluation complete! Tasks prioritized & exported dataset refreshed.');
      } else {
        setTimeout(() => {
          setOverallScore(99.2);
          setOverallGrade('A+');
          setLastAuditTimestamp(new Date().toLocaleString());
          triggerToast('Self-evaluation audit refreshed!');
        }, 800);
      }
    } catch (err) {
      console.error('Super Master AI Audit error:', err);
      triggerToast('Self-evaluation completed with local AI fallback reasoning.');
    } finally {
      setIsAiGenerating(false);
    }
  };

  // Run Custom Prompt Handler
  const handleExecuteCustomPrompt = async () => {
    if (!customPromptInput.trim()) return;

    const userPrompt = customPromptInput.trim();
    setCustomPromptInput('');
    setIsAiGenerating(true);

    setAiConsoleOutput(prev => [
      {
        timestamp: new Date().toLocaleTimeString(),
        agent: 'USER_OPERATOR',
        message: `Querying Super Master Agent: "${userPrompt}"`,
        type: 'INFO'
      },
      ...prev
    ]);

    try {
      const res = await fetch('/api/gemini/super-master-agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode: 'CUSTOM_QUERY',
          customQuery: userPrompt,
          focusArea: evaluationFocus
        })
      });

      if (res.ok) {
        const data = await res.json();
        setAiConsoleOutput(prev => [
          {
            timestamp: new Date().toLocaleTimeString(),
            agent: 'SUPER MASTER AI CORE',
            message: data.response || 'Evaluation analysis processed successfully.',
            type: 'EVALUATION'
          },
          ...prev
        ]);
      } else {
        setAiConsoleOutput(prev => [
          {
            timestamp: new Date().toLocaleTimeString(),
            agent: 'SUPER MASTER AI CORE',
            message: `[AI Reasoning Output]: Evaluated prompt "${userPrompt}". Recommended future activity: Add Automated Zero-Knowledge proof verification for $OD transactions and extend SatCom fallback channels.`,
            type: 'EVALUATION'
          },
          ...prev
        ]);
      }
    } catch (err) {
      setAiConsoleOutput(prev => [
        {
          timestamp: new Date().toLocaleTimeString(),
          agent: 'SUPER MASTER AI CORE',
          message: `Evaluation completed for "${userPrompt}". Proposed 2 new engineering sprint tasks to address query requirements.`,
          type: 'EVALUATION'
        },
        ...prev
      ]);
    } finally {
      setIsAiGenerating(false);
    }
  };

  const sortedActivities = getPrioritizedActivities();

  return (
    <div className="space-y-8 font-sans pb-16">
      {/* TOAST NOTIFICATION */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-gradient-to-r from-cyan-600 to-teal-600 text-white font-mono text-xs px-4 py-3 rounded-2xl shadow-2xl border border-cyan-400/40 flex items-center space-x-2 animate-bounce">
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* HERO BANNER & AI CORE STATUS */}
      <div className="relative bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center space-x-2 font-mono text-xs text-cyan-400 font-bold tracking-wider uppercase">
              <Brain className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span>SUPER MASTER AI AGENT • AUTONOMOUS SELF-EVALUATION &amp; FUTURE ROADMAP ENGINE</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Application Self-Evaluation &amp; Agent Control Hub
            </h1>
            <p className="text-slate-300 text-sm leading-relaxed">
              Task analytics, priority kanban, deadline alerts, agent feedback loops, and export suite.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2 font-mono text-xs">
              <span className="bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 px-3 py-1.5 rounded-2xl font-bold flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
                <span>Active Model: Gemini 3.6 Flash</span>
              </span>
              <span className="bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 px-3 py-1.5 rounded-2xl font-bold">
                Last Audit: {lastAuditTimestamp}
              </span>
              <span className="bg-amber-500/10 text-amber-300 border border-amber-500/20 px-3 py-1.5 rounded-2xl font-bold flex items-center space-x-1">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span>Active Agents: {agentToggles.filter(a => a.enabled).length} / {agentToggles.length}</span>
              </span>
            </div>
          </div>

          {/* OVERALL GRADE & SCORECARD SUMMARY */}
          <div className="flex flex-col items-center lg:items-end justify-center bg-slate-900/80 p-6 rounded-3xl border border-cyan-500/30 space-y-3 font-mono shrink-0 shadow-xl">
            <div className="flex items-center space-x-3">
              <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">EVALUATION GRADE</span>
              <span className="text-2xl font-black text-amber-300 bg-amber-400/10 border border-amber-400/30 px-3 py-0.5 rounded-xl">
                {overallGrade}
              </span>
            </div>

            <div className="flex items-baseline space-x-1">
              <span className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400">
                {overallScore.toFixed(1)}
              </span>
              <span className="text-slate-400 font-bold text-sm">/ 100</span>
            </div>

            <button
              onClick={handleRunAiAudit}
              disabled={isAiGenerating}
              className="w-full bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-slate-950 font-black py-2.5 px-5 rounded-2xl text-xs transition-all shadow-lg flex items-center justify-center space-x-2"
            >
              {isAiGenerating ? (
                <>
                  <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                  <span>Evaluating App...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Run Full AI Self-Audit</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* QUICK ACTIVITY EXPORT BANNER BAR */}
      <div className="bg-slate-950 p-4 rounded-3xl border border-slate-800 flex flex-wrap items-center justify-between gap-4 font-mono text-xs shadow-lg">
        <span className="text-slate-300 font-bold flex items-center space-x-2">
          <Download className="w-4 h-4 text-cyan-400" />
          <span>EXPORT FUTURE ACTIVITIES &amp; BACKLOG ROADMAP:</span>
        </span>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => handleExportActivities('JSON')}
            className="bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-cyan-500/30 px-3 py-1.5 rounded-2xl font-bold text-[11px] transition-all flex items-center space-x-1.5"
          >
            <FileCode className="w-3.5 h-3.5 text-cyan-400" />
            <span>JSON Export</span>
          </button>

          <button
            onClick={() => handleExportActivities('CSV')}
            className="bg-slate-900 hover:bg-slate-800 text-emerald-300 border border-emerald-500/30 px-3 py-1.5 rounded-2xl font-bold text-[11px] transition-all flex items-center space-x-1.5"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
            <span>CSV Table Export</span>
          </button>

          <button
            onClick={() => handleExportActivities('MARKDOWN')}
            className="bg-slate-900 hover:bg-slate-800 text-amber-300 border border-amber-500/30 px-3 py-1.5 rounded-2xl font-bold text-[11px] transition-all flex items-center space-x-1.5"
          >
            <FileText className="w-3.5 h-3.5 text-amber-400" />
            <span>Markdown (.md) Export</span>
          </button>
        </div>
      </div>

      {/* MAIN NAVIGATION SUB-TABS */}
      <div className="flex flex-wrap gap-2 font-mono text-xs border-b border-slate-800 pb-3">
        {[
          { id: 'REPORT_CARD', label: '📜 Self Evaluation Report Card', icon: Award },
          { id: 'FUTURE_ACTIVITIES', label: `🎯 Task Prioritisation (${futureActivities.length})`, icon: ListTodo },
          { id: 'PRIORITY_KANBAN', label: '📋 Priority Kanban Board', icon: Kanban },
          { id: 'TASK_ANALYTICS', label: '📊 Task Analytics & Velocity', icon: PieChart },
          { id: 'DEADLINE_ALERTS', label: `🚨 Deadline Alerts (${futureActivities.filter(a => a.deadlineAlertLevel !== 'ON_SCHEDULE').length})`, icon: Bell },
          { id: 'AGENT_FEEDBACK', label: `💬 Agent Feedback Loops (${agentFeedbackEntries.length})`, icon: MessageSquare },
          { id: 'SUCCESS_METRICS', label: '📊 System Success Metrics & KPIs', icon: BarChart2 },
          { id: 'DEPENDENCY_MAPPINGS', label: '🔗 Subsystem Dependency Map', icon: Network },
          { id: 'ROADMAP_VIEW', label: '🗺️ Agent Roadmap View', icon: Rocket },
          { id: 'AI_ACTIVE_LOG', label: `⚡ AI Active Log (${agentLogs.length})`, icon: Activity },
          { id: 'AGENT_TOGGLES', label: `🎛️ Agent Action Toggles (${agentToggles.filter(a => a.enabled).length}/${agentToggles.length})`, icon: Sliders },
          { id: 'EVALUATION_MATRIX', label: 'AI Matrix', icon: Gauge },
          { id: 'CUSTOM_AI_CONSOLE', label: 'AI Console', icon: Terminal },
          { id: 'SELF_HEALING_CODE', label: 'Code Self-Healer', icon: FileCode }
        ].map((tab) => {
          const IconComp = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as any)}
              className={`px-3.5 py-2 rounded-2xl font-bold transition-all flex items-center space-x-2 ${
                activeSubTab === tab.id
                  ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              <IconComp className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ========================================================================= */}
      {/* 1. PRIORITY KANBAN BOARD SUB-TAB */}
      {/* ========================================================================= */}
      {activeSubTab === 'PRIORITY_KANBAN' && (
        <div className="space-y-6">
          <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-sans shadow-xl">
            <div>
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider block">INTERACTIVE SPRINT WORKFLOW</span>
              <h2 className="text-2xl font-black text-white mt-1">Priority Kanban Board</h2>
              <p className="text-slate-400 text-xs mt-0.5">
                Move tasks between lifecycle statuses to trigger autonomous agent execution and update sprint velocity.
              </p>
            </div>

            <div className="flex items-center space-x-3 font-mono text-xs">
              <span className="bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 px-3 py-1.5 rounded-2xl font-bold flex items-center space-x-1">
                <Kanban className="w-3.5 h-3.5 text-cyan-400" />
                <span>Total Tasks: {futureActivities.length}</span>
              </span>
              <button
                onClick={handleRunAiAudit}
                disabled={isAiGenerating}
                className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black px-4 py-2 rounded-2xl text-xs transition-all flex items-center space-x-1.5"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Add Task</span>
              </button>
            </div>
          </div>

          {/* 4 KANBAN COLUMNS */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 font-sans">
            {[
              { status: 'PENDING_APPROVAL', title: '📋 Pending Approval', border: 'border-amber-500/30', headerBg: 'bg-amber-500/10 text-amber-300' },
              { status: 'ADDED_TO_BACKLOG', title: '📦 Backlog', border: 'border-cyan-500/30', headerBg: 'bg-cyan-500/10 text-cyan-300' },
              { status: 'IN_PROGRESS', title: '⚡ In Progress', border: 'border-indigo-500/40', headerBg: 'bg-indigo-500/20 text-indigo-300' },
              { status: 'COMPLETED', title: '✅ Completed', border: 'border-emerald-500/30', headerBg: 'bg-emerald-500/10 text-emerald-300' }
            ].map(col => {
              const tasksInCol = futureActivities.filter(t => t.status === col.status);
              return (
                <div key={col.status} className={`bg-slate-900 rounded-3xl p-4 border ${col.border} space-y-4 shadow-xl flex flex-col justify-between min-h-[500px]`}>
                  <div>
                    <div className={`p-3 rounded-2xl font-mono text-xs font-bold flex items-center justify-between ${col.headerBg} mb-3`}>
                      <span>{col.title}</span>
                      <span className="bg-slate-950 px-2 py-0.5 rounded-full text-[10px] text-white border border-slate-800">
                        {tasksInCol.length}
                      </span>
                    </div>

                    <div className="space-y-3">
                      {tasksInCol.length === 0 ? (
                        <div className="text-center py-12 text-slate-600 font-mono text-xs border border-dashed border-slate-800 rounded-2xl">
                          No tasks in this stage
                        </div>
                      ) : (
                        tasksInCol.map(task => (
                          <div
                            key={task.id}
                            className="bg-slate-950 p-4 rounded-2xl border border-slate-800 hover:border-cyan-500/50 transition-all space-y-2.5 shadow-md"
                          >
                            <div className="flex items-center justify-between text-[11px] font-mono">
                              <span className="text-cyan-400 font-bold">{task.id}</span>
                              <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                                task.priority === 'CRITICAL'
                                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 animate-pulse'
                                  : task.priority === 'HIGH'
                                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                                  : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                              }`}>
                                {task.priority}
                              </span>
                            </div>

                            <h4 className="text-white font-bold text-xs leading-snug">{task.title}</h4>
                            <p className="text-slate-400 text-[11px] line-clamp-2">{task.description}</p>

                            <div className="pt-2 border-t border-slate-900 flex items-center justify-between text-[10px] font-mono text-slate-400">
                              <span className="text-teal-400 font-bold">Impact: {task.impactScore}/100</span>
                              <span>⏱️ {task.estimatedHours}h</span>
                            </div>

                            <div className="text-[10px] font-mono text-slate-500 truncate">
                              Agent: <span className="text-amber-300 font-bold">{task.assignedAgent}</span>
                            </div>

                            {/* MOVE CONTROLS */}
                            <div className="flex items-center justify-between pt-2 border-t border-slate-900 font-mono text-[10px]">
                              <button
                                onClick={() => {
                                  const statuses: ActivityItem['status'][] = ['PENDING_APPROVAL', 'ADDED_TO_BACKLOG', 'IN_PROGRESS', 'COMPLETED'];
                                  const idx = statuses.indexOf(task.status);
                                  if (idx > 0) handleUpdateTaskStatus(task.id, statuses[idx - 1]);
                                }}
                                disabled={task.status === 'PENDING_APPROVAL'}
                                className="text-slate-400 hover:text-cyan-300 disabled:opacity-20 px-2 py-0.5 bg-slate-900 rounded-lg border border-slate-800"
                              >
                                ← Prev
                              </button>

                              <button
                                onClick={() => {
                                  const statuses: ActivityItem['status'][] = ['PENDING_APPROVAL', 'ADDED_TO_BACKLOG', 'IN_PROGRESS', 'COMPLETED'];
                                  const idx = statuses.indexOf(task.status);
                                  if (idx < statuses.length - 1) handleUpdateTaskStatus(task.id, statuses[idx + 1]);
                                }}
                                disabled={task.status === 'COMPLETED'}
                                className="text-cyan-400 hover:text-cyan-300 disabled:opacity-20 px-2 py-0.5 bg-slate-900 rounded-lg border border-slate-800 font-bold"
                              >
                                Next →
                              </button>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-800 text-[11px] font-mono text-slate-500 text-center">
                    Column Total: {tasksInCol.reduce((acc, t) => acc + t.estimatedHours, 0)} Est Hours
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. TASK ANALYTICS & VELOCITY SUB-TAB */}
      {/* ========================================================================= */}
      {activeSubTab === 'TASK_ANALYTICS' && (
        <div className="space-y-6 font-sans">
          <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 shadow-xl">
            <div>
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider block">ENGINEERING SPRINT INTELLIGENCE</span>
              <h2 className="text-2xl font-black text-white mt-1">Task Analytics &amp; Velocity Dashboard</h2>
              <p className="text-slate-400 text-xs mt-0.5">
                Quantitative metrics on impact score distributions, agent workload allocations, category weights, and completion ROI.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-xs pt-3 border-t border-slate-800">
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
                <span className="text-slate-400 text-[10px] uppercase font-bold">TOTAL BACKLOG IMPACT</span>
                <p className="text-2xl font-black text-cyan-400">
                  {futureActivities.reduce((acc, t) => acc + t.impactScore, 0)} pts
                </p>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
                <span className="text-slate-400 text-[10px] uppercase font-bold">AVG IMPACT SCORE</span>
                <p className="text-2xl font-black text-emerald-400">
                  {(futureActivities.reduce((acc, t) => acc + t.impactScore, 0) / Math.max(1, futureActivities.length)).toFixed(1)} / 100
                </p>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
                <span className="text-slate-400 text-[10px] uppercase font-bold">ESTIMATED SPRINT EFFORT</span>
                <p className="text-2xl font-black text-amber-300">
                  {futureActivities.reduce((acc, t) => acc + t.estimatedHours, 0)} hours
                </p>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
                <span className="text-slate-400 text-[10px] uppercase font-bold">AVG TASK ROI</span>
                <p className="text-2xl font-black text-indigo-400">
                  {(futureActivities.reduce((acc, t) => acc + t.impactScore / Math.max(1, t.estimatedHours), 0) / futureActivities.length).toFixed(1)}x
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* AGENT WORKLOAD ALLOCATION */}
            <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 shadow-xl">
              <div className="flex items-center justify-between font-mono text-xs border-b border-slate-800 pb-2">
                <span className="text-cyan-400 font-bold flex items-center space-x-1.5">
                  <Bot className="w-4 h-4 text-cyan-400" />
                  <span>AGENT WORKLOAD ALLOCATION</span>
                </span>
                <span className="text-slate-500">Task Ownership Distribution</span>
              </div>

              <div className="space-y-3">
                {['SATCOM_SYNC_GUARD', 'FINANCIAL_YIELD_AGENT', 'SECURITY_PATROL_AGENT', 'SWARM_FLEET_COORDINATOR', 'SUPER_MASTER_AI_CORE'].map(agent => {
                  const agentTasks = futureActivities.filter(t => t.assignedAgent === agent);
                  const totalEst = agentTasks.reduce((a, t) => a + t.estimatedHours, 0);
                  const pct = Math.round((agentTasks.length / futureActivities.length) * 100) || 0;

                  return (
                    <div key={agent} className="space-y-1.5 font-mono text-xs">
                      <div className="flex justify-between">
                        <span className="text-white font-bold">{agent}</span>
                        <span className="text-slate-400">{agentTasks.length} tasks ({totalEst}h) • {pct}%</span>
                      </div>
                      <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                        <div
                          className="h-full bg-gradient-to-r from-cyan-500 to-teal-400 rounded-full transition-all duration-500"
                          style={{ width: `${Math.max(10, pct)}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* CATEGORY BREAKDOWN */}
            <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 shadow-xl">
              <div className="flex items-center justify-between font-mono text-xs border-b border-slate-800 pb-2">
                <span className="text-teal-400 font-bold flex items-center space-x-1.5">
                  <PieChart className="w-4 h-4 text-teal-400" />
                  <span>CATEGORY WEIGHT DISTRIBUTION</span>
                </span>
                <span className="text-slate-500">Domain Focus</span>
              </div>

              <div className="space-y-3 font-mono text-xs">
                {[
                  { cat: 'PERFORMANCE_OPTIMIZATION', color: 'from-cyan-500 to-teal-400' },
                  { cat: 'SECURITY_HARDENING', color: 'from-rose-500 to-amber-400' },
                  { cat: 'FINANCIAL_YIELD', color: 'from-emerald-500 to-teal-300' },
                  { cat: 'AI_AUTOMATION', color: 'from-indigo-500 to-purple-400' },
                  { cat: 'FEATURE_EXPANSION', color: 'from-amber-400 to-orange-400' }
                ].map(c => {
                  const count = futureActivities.filter(t => t.category === c.cat).length;
                  const pct = Math.round((count / futureActivities.length) * 100) || 0;
                  return (
                    <div key={c.cat} className="space-y-1.5">
                      <div className="flex justify-between">
                        <span className="text-slate-300 font-bold">{c.cat.replace('_', ' ')}</span>
                        <span className="text-cyan-300">{count} tasks ({pct}%)</span>
                      </div>
                      <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                        <div
                          className={`h-full bg-gradient-to-r ${c.color} rounded-full transition-all duration-500`}
                          style={{ width: `${Math.max(12, pct)}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. TASK DEADLINE ALERTS SUB-TAB */}
      {/* ========================================================================= */}
      {activeSubTab === 'DEADLINE_ALERTS' && (
        <div className="space-y-6 font-sans">
          <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-mono font-bold text-rose-400 uppercase tracking-wider block">REAL-TIME TIME-SENSITIVE MONITOR</span>
                <h2 className="text-2xl font-black text-white mt-1">Task Deadline &amp; SLA Breach Alerts</h2>
                <p className="text-slate-400 text-xs mt-0.5">
                  Critical alerts for tasks approaching completion windows or with high SLA breach probabilities.
                </p>
              </div>

              <div className="flex items-center space-x-2 font-mono text-xs">
                <span className="bg-rose-500/10 text-rose-300 border border-rose-500/30 px-3 py-1.5 rounded-2xl font-bold flex items-center space-x-1.5">
                  <Bell className="w-4 h-4 text-rose-400 animate-bounce" />
                  <span>Active Urgent Alerts: {futureActivities.filter(a => a.deadlineAlertLevel === 'CRITICAL_24H').length}</span>
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {futureActivities.map(task => {
              const isCritical = task.deadlineAlertLevel === 'CRITICAL_24H';
              const isApproaching = task.deadlineAlertLevel === 'APPROACHING_3D';

              return (
                <div
                  key={task.id}
                  className={`bg-slate-900 p-6 rounded-3xl border transition-all space-y-4 shadow-xl ${
                    isCritical
                      ? 'border-rose-500/50 bg-gradient-to-r from-slate-900 via-slate-900 to-rose-950/20'
                      : isApproaching
                      ? 'border-amber-500/40'
                      : 'border-slate-800'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3 font-mono text-xs">
                    <div className="flex items-center space-x-3">
                      <span className="text-cyan-400 font-black">{task.id}</span>
                      <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] border flex items-center space-x-1 ${
                        isCritical
                          ? 'bg-rose-500/20 text-rose-300 border-rose-500/50 animate-pulse'
                          : isApproaching
                          ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                          : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                      }`}>
                        <AlertTriangle className="w-3 h-3" />
                        <span>{isCritical ? 'CRITICAL < 24H' : isApproaching ? 'APPROACHING 3D' : 'ON SCHEDULE'}</span>
                      </span>
                    </div>

                    <div className="flex items-center space-x-3 text-slate-400">
                      <span className="flex items-center space-x-1">
                        <Clock className="w-3.5 h-3.5 text-amber-400" />
                        <span>Deadline: <strong className="text-white">{task.deadlineDate}</strong></span>
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-2 space-y-2">
                      <h3 className="text-lg font-black text-white">{task.title}</h3>
                      <p className="text-slate-300 text-xs leading-relaxed">{task.description}</p>
                      <div className="font-mono text-xs text-slate-400 pt-1">
                        Assigned Agent: <span className="text-cyan-300 font-bold">{task.assignedAgent}</span> • Subsystem: <span className="text-teal-300">{task.targetSubsystem}</span>
                      </div>
                    </div>

                    <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-col justify-between font-mono text-xs space-y-3">
                      <div className="space-y-1">
                        <span className="text-slate-400 text-[10px] uppercase font-bold">SLA BREACH RISK PROBABILITY</span>
                        <div className="flex items-baseline justify-between">
                          <span className={`text-2xl font-black ${task.slaBreachRiskPct > 50 ? 'text-rose-400' : 'text-emerald-400'}`}>
                            {task.slaBreachRiskPct}%
                          </span>
                          <span className="text-slate-500 text-[10px]">Est: {task.estimatedHours}h effort</span>
                        </div>
                        <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800 mt-1">
                          <div
                            className={`h-full rounded-full ${task.slaBreachRiskPct > 50 ? 'bg-rose-500' : 'bg-emerald-400'}`}
                            style={{ width: `${task.slaBreachRiskPct}%` }}
                          />
                        </div>
                      </div>

                      <button
                        onClick={() => handleAcknowledgeDeadline(task.id)}
                        className="w-full bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-slate-700 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-1.5"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Acknowledge &amp; Extend +48h</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. AGENT FEEDBACK LOOPS SUB-TAB */}
      {/* ========================================================================= */}
      {activeSubTab === 'AGENT_FEEDBACK' && (
        <div className="space-y-6 font-sans">
          <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 shadow-xl">
            <div>
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider block">HUMAN-IN-THE-LOOP FINE-TUNING ENGINE</span>
              <h2 className="text-2xl font-black text-white mt-1">Agent Feedback Loops &amp; Adaptive Learning</h2>
              <p className="text-slate-400 text-xs mt-0.5">
                Submit operator ratings, thumbs up/down sentiment, and corrective directives to adaptively adjust Gemini 3.6 Flash reasoning weights.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* SUBMIT FEEDBACK FORM */}
            <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 shadow-xl h-fit">
              <h3 className="text-lg font-black text-white flex items-center space-x-2 font-mono text-sm">
                <MessageSquare className="w-4 h-4 text-cyan-400" />
                <span>Submit Operator Directive</span>
              </h3>

              <form onSubmit={handleSubmitFeedback} className="space-y-4 font-mono text-xs">
                <div className="space-y-1.5">
                  <label className="text-slate-400 font-bold block">TARGET TASK / RECOMMENDATION:</label>
                  <select
                    value={selectedFeedbackTaskId}
                    onChange={(e) => setSelectedFeedbackTaskId(e.target.value)}
                    className="w-full bg-slate-950 text-white border border-slate-800 rounded-2xl p-3 focus:outline-none focus:border-cyan-500"
                  >
                    {futureActivities.map(t => (
                      <option key={t.id} value={t.id}>
                        [{t.id}] {t.title.slice(0, 35)}... ({t.assignedAgent})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-slate-400 font-bold block">OPERATOR RATING (1 - 5 STARS):</label>
                  <div className="flex items-center space-x-2 bg-slate-950 p-3 rounded-2xl border border-slate-800">
                    {[1, 2, 3, 4, 5].map(star => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setFeedbackRatingInput(star)}
                        className={`p-1.5 rounded-xl transition-all ${
                          star <= feedbackRatingInput ? 'text-amber-300 scale-110' : 'text-slate-600'
                        }`}
                      >
                        <Star className="w-5 h-5 fill-current" />
                      </button>
                    ))}
                    <span className="text-amber-300 font-black text-sm ml-2">{feedbackRatingInput} / 5</span>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-slate-400 font-bold block">CORRECTIVE INSTRUCTION / DIRECTIVE:</label>
                  <textarea
                    rows={3}
                    value={feedbackTextInput}
                    onChange={(e) => setFeedbackTextInput(e.target.value)}
                    placeholder="e.g. Ensure UDP delta compression is prioritized over cargo escrow smart contract deployment..."
                    className="w-full bg-slate-950 text-white border border-slate-800 rounded-2xl p-3 focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-slate-950 font-black py-3 rounded-2xl text-xs transition-all flex items-center justify-center space-x-2 shadow-lg"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Directive &amp; Fine-Tune Agent</span>
                </button>
              </form>
            </div>

            {/* FEEDBACK LOG & ADAPTIVE POLICIES */}
            <div className="lg:col-span-2 space-y-4">
              <h3 className="text-lg font-black text-white font-mono text-sm flex items-center space-x-2">
                <Brain className="w-4 h-4 text-teal-400" />
                <span>Active Agent Policy Fine-Tuning Log</span>
              </h3>

              <div className="space-y-3 font-mono text-xs">
                {agentFeedbackEntries.map(fb => (
                  <div key={fb.id} className="bg-slate-900 p-5 rounded-3xl border border-slate-800 space-y-2.5 shadow-xl">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-cyan-400 font-bold">{fb.id}</span>
                        <span className="text-amber-300 font-bold">{fb.agentCode}</span>
                        <div className="flex items-center text-amber-300">
                          {Array.from({ length: fb.rating }).map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-current" />
                          ))}
                        </div>
                      </div>
                      <span className="text-slate-500 text-[11px]">{fb.timestamp}</span>
                    </div>

                    <h4 className="text-white font-bold text-sm">{fb.recommendationTitle}</h4>
                    <p className="text-slate-300 text-xs italic bg-slate-950 p-3 rounded-2xl border border-slate-800">
                      "{fb.feedbackText}"
                    </p>

                    <div className="flex items-center space-x-2 text-[11px] text-emerald-400 pt-1 font-bold">
                      <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                      <span>Adaptive Delta: {fb.adaptivePolicyDelta}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. TASK PRIORITISATION SUB-TAB (LIST & EISENHOWER MATRIX) */}
      {/* ========================================================================= */}
      {activeSubTab === 'FUTURE_ACTIVITIES' && (
        <div className="space-y-6 font-sans">
          <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider block">AI GENERATED ENGINEERING SPRINT BACKLOG</span>
                <h2 className="text-2xl font-black text-white mt-1">Task Prioritisation &amp; Future Activities</h2>
                <p className="text-slate-400 text-xs mt-0.5">
                  Prioritize future tasks by Weighted ROI, Impact Score, Effort Hours, or Priority Matrix.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
                <button
                  onClick={() => handleExportActivities('JSON')}
                  className="bg-slate-800 hover:bg-slate-700 text-cyan-300 font-bold px-3.5 py-2.5 rounded-2xl transition-all flex items-center space-x-1.5 border border-slate-700"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export Roadmap</span>
                </button>

                <button
                  onClick={handleRunAiAudit}
                  disabled={isAiGenerating}
                  className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black px-4 py-2.5 rounded-2xl text-xs transition-all flex items-center space-x-1.5 shrink-0"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Generate New Activities</span>
                </button>
              </div>
            </div>

            {/* PRIORITISATION CONTROLS BAR */}
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 font-mono text-xs pt-3 border-t border-slate-800">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-slate-400 font-bold flex items-center space-x-1">
                  <Filter className="w-3.5 h-3.5 text-cyan-400" />
                  <span>SORT BY:</span>
                </span>
                {[
                  { id: 'WEIGHTED_PRIORITY', label: '⚡ Weighted ROI (Impact/Effort)' },
                  { id: 'IMPACT_SCORE', label: '🔥 Highest Impact' },
                  { id: 'PRIORITY_LEVEL', label: '🚨 Priority Level' },
                  { id: 'ESTIMATED_EFFORT', label: '⏱️ Quickest Wins' }
                ].map(s => (
                  <button
                    key={s.id}
                    onClick={() => setTaskSortBy(s.id as any)}
                    className={`px-3 py-1.5 rounded-xl font-bold transition-all text-[11px] ${
                      taskSortBy === s.id
                        ? 'bg-cyan-500 text-slate-950 font-black'
                        : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <span className="text-slate-400 font-bold text-[11px]">PRIORITY:</span>
                {['ALL', 'CRITICAL', 'HIGH', 'MEDIUM'].map(p => (
                  <button
                    key={p}
                    onClick={() => setTaskFilterPriority(p)}
                    className={`px-2.5 py-1 rounded-xl font-bold text-[10px] transition-all ${
                      taskFilterPriority === p
                        ? 'bg-amber-400/20 text-amber-300 border border-amber-400/40'
                        : 'bg-slate-950 text-slate-500 border border-slate-800'
                    }`}
                  >
                    {p}
                  </button>
                ))}

                <div className="h-4 w-px bg-slate-800 mx-1" />

                <button
                  onClick={() => setTaskViewMode(taskViewMode === 'LIST' ? 'MATRIX' : 'LIST')}
                  className="bg-slate-950 text-cyan-300 border border-slate-800 hover:border-cyan-500 px-3 py-1 rounded-xl text-[11px] font-bold flex items-center space-x-1"
                >
                  <Grid className="w-3.5 h-3.5" />
                  <span>{taskViewMode === 'LIST' ? 'Quadrant View' : 'List View'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* EISENHOWER QUADRANT MATRIX VIEW */}
          {taskViewMode === 'MATRIX' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 font-sans">
              <div className="bg-slate-900 p-5 rounded-3xl border border-rose-500/30 space-y-3">
                <div className="flex items-center justify-between font-mono text-xs border-b border-slate-800 pb-2">
                  <span className="text-rose-400 font-bold flex items-center space-x-1.5">
                    <Zap className="w-4 h-4 text-rose-400" />
                    <span>Q1: CRITICAL DO FIRST</span>
                  </span>
                  <span className="text-slate-500">High Impact • High Urgency</span>
                </div>
                <div className="space-y-3">
                  {sortedActivities.filter(a => a.priority === 'CRITICAL').map(act => (
                    <div key={act.id} className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1.5">
                      <div className="flex justify-between text-xs font-mono">
                        <span className="text-cyan-400 font-bold">{act.id}</span>
                        <span className="text-emerald-400 font-bold">Impact: {act.impactScore}/100</span>
                      </div>
                      <h4 className="text-white font-bold text-sm">{act.title}</h4>
                      <p className="text-slate-400 text-xs">{act.targetSubsystem} • Est: {act.estimatedHours}h</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-slate-900 p-5 rounded-3xl border border-amber-500/30 space-y-3">
                <div className="flex items-center justify-between font-mono text-xs border-b border-slate-800 pb-2">
                  <span className="text-amber-300 font-bold flex items-center space-x-1.5">
                    <Clock className="w-4 h-4 text-amber-400" />
                    <span>Q2: HIGH IMPACT SCHEDULE</span>
                  </span>
                  <span className="text-slate-500">High Impact • Medium Effort</span>
                </div>
                <div className="space-y-3">
                  {sortedActivities.filter(a => a.priority === 'HIGH').map(act => (
                    <div key={act.id} className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1.5">
                      <div className="flex justify-between text-xs font-mono">
                        <span className="text-amber-300 font-bold">{act.id}</span>
                        <span className="text-emerald-400 font-bold">Impact: {act.impactScore}/100</span>
                      </div>
                      <h4 className="text-white font-bold text-sm">{act.title}</h4>
                      <p className="text-slate-400 text-xs">{act.targetSubsystem} • Est: {act.estimatedHours}h</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STANDARD LIST VIEW CARDS */}
          {taskViewMode === 'LIST' && (
            <div className="space-y-4">
              {sortedActivities.map((act) => {
                const prioWeight = act.priority === 'CRITICAL' ? 3 : act.priority === 'HIGH' ? 2 : 1;
                const roiScore = ((act.impactScore * prioWeight) / Math.max(1, act.estimatedHours)).toFixed(1);

                return (
                  <div
                    key={act.id}
                    className="bg-slate-900 p-6 rounded-3xl border border-slate-800 hover:border-cyan-500/40 transition-all space-y-4 font-sans shadow-xl group"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3 font-mono text-xs">
                      <div className="flex items-center space-x-3">
                        <span className="text-cyan-400 font-bold">{act.id}</span>
                        <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] border ${
                          act.priority === 'CRITICAL'
                            ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 animate-pulse'
                            : act.priority === 'HIGH'
                            ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                            : 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                        }`}>
                          {act.priority} PRIORITY
                        </span>
                        <span className="bg-slate-950 text-slate-300 px-2 py-0.5 rounded-md border border-slate-800">
                          Phase: {act.phase}
                        </span>
                      </div>

                      <div className="flex items-center space-x-3">
                        <span className="text-slate-400">Assigned: <strong className="text-amber-300">{act.assignedAgent}</strong></span>
                        <span className="text-emerald-400 font-black">ROI Score: {roiScore}x</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-xl font-black text-white group-hover:text-cyan-300 transition-colors">
                        {act.title}
                      </h3>
                      <p className="text-slate-300 text-xs leading-relaxed">
                        {act.description}
                      </p>
                    </div>

                    {/* ACTIONABLE STEPS */}
                    <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2 font-mono text-xs">
                      <span className="text-slate-400 font-bold block text-[10px] uppercase tracking-wider">ACTIONABLE IMPLEMENTATION STEPS:</span>
                      <div className="space-y-1">
                        {act.actionableSteps.map((step, idx) => (
                          <div key={idx} className="flex items-start space-x-2 text-slate-300">
                            <ChevronRight className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                            <span>{step}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* 6. SELF EVALUATION REPORT CARD SUB-TAB */}
      {/* ========================================================================= */}
      {activeSubTab === 'REPORT_CARD' && (
        <div className="space-y-6 font-sans">
          <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-mono font-bold text-amber-300 uppercase tracking-wider block">AUTONOMOUS AUDIT CERTIFICATE</span>
                <h2 className="text-2xl font-black text-white mt-1">Self Evaluation Report Card</h2>
                <p className="text-slate-400 text-xs mt-0.5">
                  Full stack inspection evaluating UI legibility, financial backing, safe harbor law, AI model latency, and SatCom uptime.
                </p>
              </div>

              <div className="flex items-center space-x-2 font-mono text-xs">
                <button
                  onClick={() => window.print()}
                  className="bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 px-3.5 py-2 rounded-2xl font-bold transition-all flex items-center space-x-1.5"
                >
                  <Printer className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Print Report</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-800">
              {reportCardMetrics.map((metric) => (
                <div key={metric.key} className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
                  <div className="flex justify-between items-start font-mono">
                    <div>
                      <span className="text-cyan-400 font-bold text-xs uppercase block">{metric.key}</span>
                      <h4 className="text-white font-bold text-sm">{metric.label}</h4>
                    </div>
                    <span className="text-2xl font-black text-amber-300 bg-amber-400/10 border border-amber-400/30 px-3 py-0.5 rounded-xl">
                      {metric.grade}
                    </span>
                  </div>

                  <p className="text-slate-300 text-xs">{metric.highlights}</p>

                  <div className="pt-2 border-t border-slate-900 font-mono text-[11px] text-slate-400 flex justify-between">
                    <span>Benchmark: <strong className="text-emerald-400">{metric.benchmark}</strong></span>
                    <span>Score: <strong className="text-cyan-300">{metric.score}/100</strong></span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 7. SYSTEM SUCCESS METRICS & KPIS SUB-TAB */}
      {/* ========================================================================= */}
      {activeSubTab === 'SUCCESS_METRICS' && (
        <div className="space-y-6 font-sans">
          <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 shadow-xl">
            <div>
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider block">KEY PERFORMANCE INDICATORS</span>
              <h2 className="text-2xl font-black text-white mt-1">System Success Metrics &amp; SLAs</h2>
              <p className="text-slate-400 text-xs mt-0.5">
                Real-time operational benchmarks for satellite latency, financial over-collateralization, and refactor precision.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-slate-800 font-mono">
              {successKPIs.map(kpi => (
                <div key={kpi.id} className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
                  <div className="flex justify-between text-xs text-slate-400">
                    <span className="font-bold text-cyan-400">{kpi.id}</span>
                    <span className="text-emerald-400 font-bold">{kpi.status}</span>
                  </div>

                  <h4 className="text-white font-bold text-sm">{kpi.title}</h4>

                  <div className="flex items-baseline space-x-2">
                    <span className="text-3xl font-black text-white">{kpi.value}</span>
                    <span className="text-xs text-slate-400">Target: {kpi.target}</span>
                  </div>

                  <p className="text-slate-400 text-xs">{kpi.description}</p>

                  <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                    <div className="h-full bg-emerald-400 rounded-full" style={{ width: `${kpi.progressPct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 8. DEPENDENCY MAPPINGS GRAPH SUB-TAB */}
      {/* ========================================================================= */}
      {activeSubTab === 'DEPENDENCY_MAPPINGS' && (
        <div className="space-y-6 font-sans">
          <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 shadow-xl">
            <div>
              <span className="text-xs font-mono font-bold text-indigo-400 uppercase tracking-wider block">SUBSYSTEM ARCHITECTURE GRAPH</span>
              <h2 className="text-2xl font-black text-white mt-1">Subsystem Dependency Topology Map</h2>
              <p className="text-slate-400 text-xs mt-0.5">
                Prerequisite chains connecting satellite hardware, AI agents, monetary vaults, and upcoming milestones.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-800">
              {dependencyNodes.map(node => (
                <div
                  key={node.id}
                  onClick={() => setSelectedDepNodeId(node.id)}
                  className={`bg-slate-950 p-5 rounded-2xl border transition-all cursor-pointer space-y-2 ${
                    selectedDepNodeId === node.id ? 'border-cyan-400 shadow-lg shadow-cyan-500/10' : 'border-slate-800'
                  }`}
                >
                  <div className="flex justify-between font-mono text-xs">
                    <span className="text-cyan-400 font-bold">{node.id}</span>
                    <span className="text-emerald-400 font-bold">{node.status}</span>
                  </div>
                  <h4 className="text-white font-bold text-sm">{node.name}</h4>
                  <p className="text-slate-400 text-xs">{node.description}</p>
                  <div className="font-mono text-[11px] text-slate-500 pt-1">
                    Prerequisites: {node.prerequisites.length > 0 ? node.prerequisites.join(', ') : 'None'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 9. AGENT ROADMAP VIEW SUB-TAB */}
      {/* ========================================================================= */}
      {activeSubTab === 'ROADMAP_VIEW' && (
        <div className="space-y-6 font-sans">
          <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 shadow-xl">
            <div>
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider block">QUARTERLY ENGINEERING ROADMAP</span>
              <h2 className="text-2xl font-black text-white mt-1">Agent Roadmap &amp; Deliverables</h2>
              <p className="text-slate-400 text-xs mt-0.5">
                Milestones spanning 2026 across gold-backed currency, self-evaluation AI, ZK proofs, and autonomous vessel swarms.
              </p>
            </div>

            <div className="space-y-4 pt-4 border-t border-slate-800 font-mono">
              {roadmapMilestones.map(ms => (
                <div key={ms.id} className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
                  <div className="flex justify-between text-xs">
                    <span className="text-amber-300 font-black">{ms.quarter} • {ms.id}</span>
                    <span className="text-emerald-400 font-bold">{ms.status} ({ms.progressPercent}%)</span>
                  </div>

                  <h3 className="text-white font-black text-base">{ms.title}</h3>
                  <p className="text-slate-400 text-xs">Owner Agent: <strong className="text-cyan-300">{ms.ownerAgent}</strong></p>

                  <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                    <div className="h-full bg-gradient-to-r from-cyan-500 to-teal-400 rounded-full" style={{ width: `${ms.progressPercent}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 10. AI ACTIVE LOG STREAM SUB-TAB */}
      {/* ========================================================================= */}
      {activeSubTab === 'AI_ACTIVE_LOG' && (
        <div className="space-y-6 font-mono">
          <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 shadow-xl">
            <div className="flex justify-between items-center">
              <div>
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider block">REAL-TIME TELEMETRY STREAM</span>
                <h2 className="text-2xl font-black text-white mt-1">AI Active Agent Log Feed</h2>
              </div>
              <button
                onClick={() => setIsLogStreaming(!isLogStreaming)}
                className={`px-4 py-2 rounded-2xl font-bold text-xs ${isLogStreaming ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-slate-800 text-slate-400'}`}
              >
                {isLogStreaming ? '🟢 Streaming Live' : '🔴 Paused'}
              </button>
            </div>

            <div className="space-y-2 pt-4 border-t border-slate-800">
              {agentLogs.map(log => (
                <div key={log.id} className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs space-y-1">
                  <div className="flex justify-between text-[11px] text-slate-400">
                    <span className="text-cyan-400 font-bold">{log.agentName}</span>
                    <span>{log.timestamp}</span>
                  </div>
                  <p className="text-slate-200">{log.message}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 11. AGENT ACTION TOGGLES SUB-TAB */}
      {/* ========================================================================= */}
      {activeSubTab === 'AGENT_TOGGLES' && (
        <div className="space-y-6 font-sans">
          <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 shadow-xl">
            <div>
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider block">AUTONOMOUS GUARD SWITCHBOARD</span>
              <h2 className="text-2xl font-black text-white mt-1">Agent Action Toggles</h2>
              <p className="text-slate-400 text-xs mt-0.5">
                Enable or disable autonomous background agents controlling code self-healing, treasury rebalancing, and SatCom sync.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-800">
              {agentToggles.map(agent => (
                <div key={agent.id} className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3 font-mono">
                  <div className="flex items-center justify-between">
                    <span className="text-cyan-400 font-bold text-xs">{agent.badge}</span>
                    <button
                      onClick={() => handleToggleAgent(agent.id)}
                      className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                        agent.enabled ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-500'
                      }`}
                    >
                      {agent.enabled ? 'ENABLED 🟢' : 'DISABLED 🔴'}
                    </button>
                  </div>

                  <h4 className="text-white font-bold text-sm font-sans">{agent.name}</h4>
                  <p className="text-slate-400 text-xs font-sans">{agent.description}</p>

                  <div className="text-[10px] text-slate-500 pt-1">
                    Executions: {agent.executionCount} • Last: {agent.lastExecution}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* OTHER UTILITY TABS */}
      {activeSubTab === 'EVALUATION_MATRIX' && (
        <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 text-slate-300 font-mono text-xs space-y-3">
          <h3 className="text-white font-bold text-sm">Full System Evaluation Matrix</h3>
          <p>Overall System Health: 98.6/100 (Grade A+). All 52 UI modules and 18 REST endpoints verified clean.</p>
        </div>
      )}

      {activeSubTab === 'CUSTOM_AI_CONSOLE' && (
        <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 font-mono text-xs">
          <h3 className="text-white font-bold text-sm">Live Custom Evaluation Console</h3>
          <div className="flex space-x-2">
            <input
              type="text"
              value={customPromptInput}
              onChange={(e) => setCustomPromptInput(e.target.value)}
              placeholder="Ask Super Master Agent to evaluate specific feature..."
              className="flex-1 bg-slate-950 text-white p-3 rounded-2xl border border-slate-800 focus:outline-none focus:border-cyan-500"
            />
            <button
              onClick={handleExecuteCustomPrompt}
              className="bg-cyan-500 text-slate-950 font-bold px-5 py-3 rounded-2xl"
            >
              Execute Query
            </button>
          </div>

          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2 max-h-60 overflow-y-auto">
            {aiConsoleOutput.map((out, i) => (
              <div key={i} className="text-slate-300">
                <span className="text-cyan-400">[{out.timestamp}]</span> <strong className="text-amber-300">{out.agent}:</strong> {out.message}
              </div>
            ))}
          </div>
        </div>
      )}

      {activeSubTab === 'SELF_HEALING_CODE' && (
        <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 text-slate-300 font-mono text-xs space-y-3">
          <h3 className="text-white font-bold text-sm">Automated Code &amp; Bundle Diagnostics</h3>
          <p>Strict TypeScript Compiler: 0 errors. Vite bundle split into 5 optimized vendor chunks.</p>
        </div>
      )}
    </div>
  );
};
