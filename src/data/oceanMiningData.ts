export interface StudyModule {
  id: string;
  category: string;
  title: string;
  code: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Executive Master';
  durationHours: number;
  instructor: string;
  institution: string;
  description: string;
  topics: string[];
  offlineSizeMb: number;
  downloadStatus: 'NOT_DOWNLOADED' | 'DOWNLOADING' | 'DOWNLOADED';
  isCompleted?: boolean;
  isBookmarked?: boolean;
  quizQuestions: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }[];
}

export interface GlobalMiningZone {
  id: string;
  name: string;
  region: string;
  ocean: string;
  depthMeters: string;
  primaryCategory: string;
  keyMinerals: string[];
  estimatedReservesMt: string;
  isaContractHolders: string[];
  status: 'EXPLORATION' | 'TEST_MINING' | 'PROTECTED_RESERVE' | 'EEZ_NATIONAL';
  description: string;
  lat: number;
  lng: number;
  environmentalBuffer: string;
}

export interface DownloadableResource {
  id: string;
  title: string;
  fileType: 'CAD_3D' | 'PDF_MANUAL' | 'CSV_DATASET' | 'ISA_REGULATION' | 'VIDEO_LECTURE';
  fileFormat: string;
  fileSizeMb: number;
  category: string;
  downloadsCount: number;
  description: string;
  downloadStatus: 'NOT_DOWNLOADED' | 'DOWNLOADED';
  isBookmarked?: boolean;
  annotation?: string;
  annotationDate?: string;
}

export interface ForumReply {
  id: string;
  author: string;
  role: string;
  vesselOrInstitution: string;
  content: string;
  postedDate: string;
  likes: number;
}

export interface ForumThread {
  id: string;
  category: string;
  title: string;
  author: string;
  role: string;
  vesselOrInstitution: string;
  postedDate: string;
  likes: number;
  repliesCount: number;
  isPinned?: boolean;
  tags: string[];
  content: string;
  replies: ForumReply[];
}

export interface GamificationMilestone {
  id: string;
  title: string;
  category: string;
  description: string;
  xpReward: number;
  iconName: string;
  unlocked: boolean;
  progressCurrent: number;
  progressTarget: number;
  unlockedDate?: string;
}

export interface ResearchPaper {
  id: string;
  title: string;
  authors: string[];
  institution: string;
  journalOrConference: string;
  publishYear: number;
  doi: string;
  category: string;
  abstract: string;
  keyFindings: string[];
  citationCount: number;
  isBookmarked?: boolean;
  pdfUrl?: string;
  fullText: string;
}

export interface OceanMiningJob {
  id: string;
  title: string;
  category: string;
  company: string;
  location: string;
  rotationType: string; // e.g. 'Offshore 28/28 Rotation', 'Onshore HQ', 'Hybrid Field'
  salaryUSD: string;
  experienceLevel: 'Entry' | 'Mid-Level' | 'Senior Lead' | 'Executive Director';
  description: string;
  requirements: string[];
  postedDate: string;
  vesselName?: string;
  applyDeadline: string;
}

export interface OceanMiningInstitute {
  id: string;
  name: string;
  shortName: string;
  country: string;
  region: 'India' | 'Asia-Pacific' | 'Europe' | 'North America';
  cityState: string;
  fullAddress: string;
  postalCode: string;
  coordinates: { lat: number; lng: number };
  website: string;
  contactEmail: string;
  contactPhone: string;
  establishedYear: number;
  accreditation: string;
  rankingOrReputation: string;
  programsOffered: {
    degree: string;
    title: string;
    duration: string;
    mode: 'Full-time On-Campus' | 'Hybrid / Online Study' | 'Research Fellowship';
    description: string;
  }[];
  specializedLabsAndFacilities: string[];
  keyResearchAreas: string[];
  isaPartnershipStatus: 'ISA Training Co-Sponsor' | 'National EEZ Contractor' | 'Research Collaborator' | 'Academic Member';
  description: string;
  isBookmarked?: boolean;
}

export interface InstituteInquiry {
  id: string;
  instituteId: string;
  instituteName: string;
  applicantName: string;
  email: string;
  phone: string;
  country: string;
  qualification: string;
  programType: string;
  inquiryType: 'Admissions' | 'Research Collaboration' | 'ISA Fellowship' | 'Campus Visit';
  message: string;
  submissionDate: string;
}

export interface EngineeringStudyDetail {
  id: string;
  category: string;
  title: string;
  subtitle: string;
  keyFormulas: { name: string; formula: string; explanation: string }[];
  engineeringChallenges: string[];
  solutions: string[];
  diagramSummary: string;
}

export const INITIAL_STUDY_MODULES: StudyModule[] = [
  {
    id: 'mod-nodules-101',
    category: 'Polymetallic Nodules (CCZ & Indian Ocean)',
    title: 'Abyssal Plain Manganese Nodule Harvesting & Riser Hydraulics',
    code: 'OME-NOD-401',
    level: 'Advanced',
    durationHours: 36,
    instructor: 'Dr. Alistair Thorne, CEng, FIMarEST',
    institution: 'International Ocean Mining & Engineering Institute',
    description: 'In-depth engineering analysis of seafloor crawler collector vehicles, 4,000m hydraulic riser pipe slurry lift pumps, and nodule pickup efficiency in the Clarion-Clipperton Zone (CCZ).',
    topics: [
      'Seafloor Crawler Track Geotechnical Traction in Deep Hydrogel Pelagic Clays',
      'Hydraulic Lift vs Airlift Systems in 4,000m Vertical Risers',
      'Slurry Velocity Optimization & Pipe Internal Erosion Dynamics',
      'Nodule Abundance Density Mapping (kg/m²) & Spatial Kriging'
    ],
    offlineSizeMb: 142,
    downloadStatus: 'DOWNLOADED',
    isCompleted: true,
    isBookmarked: true,
    quizQuestions: [
      {
        question: 'What is the primary physical mechanism used to lift polymetallic nodules from 4,000m abyssal depth to a Surface Production Vessel (SPV)?',
        options: [
          'Mechanical Bucket Ladder Line System',
          'Vertical Subsea Slurry Centrifugal Lift Pump & Riser Pipe',
          'Pneumatic High-Pressure Buoyancy Bags',
          'Magnetically Levitated Underwater Conveyors'
        ],
        correctIndex: 1,
        explanation: 'Vertical subsea centrifugal slurry lift pumps (and airlift injection systems) are the industry-standard method for lifting nodule slurry up 4,000m riser pipes.'
      },
      {
        question: 'In geotechnical terms, what challenge do seabed collector crawlers face on CCZ abyssal plains?',
        options: [
          'Hard granite bedrock causing track fracture',
          'Ultra-low shear strength (~2-5 kPa) cohesive soft pelagic clays leading to sinkage',
          'Extreme volcanic lava flows melting rubber tracks',
          'High tidal currents above 10 knots'
        ],
        correctIndex: 1,
        explanation: 'CCZ seabed soils consist of extremely soft pelagic clays with shear strength often below 5 kPa, requiring specialized wide track pads to distribute ground bearing pressure.'
      }
    ]
  },
  {
    id: 'mod-sms-202',
    category: 'Seafloor Massive Sulfides (SMS)',
    title: 'Hydrothermal Vent Seafloor Mining & High-Grade Ore Cutting',
    code: 'OME-SMS-502',
    level: 'Advanced',
    durationHours: 42,
    instructor: 'Prof. Hiroshi Tanaka',
    institution: 'Global Subsea Mineral Technology Center',
    description: 'Engineering and environmental design for excavating copper-gold-zinc seafloor massive sulfide mounds around active and extinct hydrothermal vent fields.',
    topics: [
      'Heavy Auxiliary Cutter (HAC) & Bulk Cutter (BC) Mechanical Design',
      'Cutting Teeth Wear Rates in Polymetallic Chimney Rock Structures',
      'Hydrothermal Plume Mitigation & Benthic Thermal Shock Buffering',
      'ISA Environmental Impact Assessment (EIA) for Vent Ecosystem Protection'
    ],
    offlineSizeMb: 185,
    downloadStatus: 'NOT_DOWNLOADED',
    isCompleted: false,
    isBookmarked: false,
    quizQuestions: [
      {
        question: 'Which valuable metals are predominantly enriched in Seafloor Massive Sulfide (SMS) deposits?',
        options: [
          'Lithium & Sodium',
          'Copper, Gold, Silver, and Zinc',
          'Uranium & Thorium',
          'Platinum & Barium'
        ],
        correctIndex: 1,
        explanation: 'Hydrothermal SMS deposits precipitate high concentrations of copper, gold, silver, and zinc from superheated vent fluids.'
      }
    ]
  },
  {
    id: 'mod-cobalt-303',
    category: 'Cobalt-Rich Ferromanganese Crusts',
    title: 'Seamount Slope Subsea Excavation & Seamount Geotechnics',
    code: 'OME-COB-601',
    level: 'Executive Master',
    durationHours: 30,
    instructor: 'Dr. Elena Rostova',
    institution: 'Pacific Deep Sea Engineering Academy',
    description: 'Engineering methodologies for harvesting thin cobalt-rich iron-manganese crusts from guyots and steep seamount flanks without diluting ore with substrate rock.',
    topics: [
      'Micro-Precision Depth Cutter Drums for Crust Thickness Control',
      '3D Terrain Following Autopilot for Deep-Sea Crawlers on 30° Slopes',
      'Cobalt-Rich Crust Chemical Metallurgy (Co, Ni, Te, REE)',
      'Seamount Coral & Sponge Protection Buffer Regulations'
    ],
    offlineSizeMb: 98,
    downloadStatus: 'DOWNLOADED',
    isCompleted: true,
    isBookmarked: true,
    quizQuestions: [
      {
        question: 'Why is micro-precision cutter depth control critical during Cobalt crust harvesting on seamounts?',
        options: [
          'To prevent damaging the ROV camera lens',
          'To avoid cutting into the underlying substrate rock which dilutes ore grade',
          'To keep the crawler speed below 0.1 knots',
          'To avoid generating underwater acoustic noise'
        ],
        correctIndex: 1,
        explanation: 'Cobalt crusts are typically only 5 to 15 cm thick on basalt substrate; cutting deeper into barren basalt rock significantly dilutes the harvested ore grade.'
      }
    ]
  },
  {
    id: 'mod-ree-404',
    category: 'Seabed Heavy Mineral Sands & Rare Earth Muds',
    title: 'Deep-Sea Rare Earth Muds & Suction Dredging Mechanics',
    code: 'OME-REE-305',
    level: 'Intermediate',
    durationHours: 28,
    instructor: 'Dr. K. V. Ramanathan',
    institution: 'National Institute of Ocean Technology',
    description: 'Technologies for extracting Yttrium, Neodymium, and Dysprosium enriched deep-sea pelagic muds using subsea suction heads and closed-loop separation.',
    topics: [
      'Subsea Dredge Suction Nozzle Fluid Dynamics & Cavitation Prevention',
      'Onboard Centrifugal Hydrocyclone Separation of Heavy Minerals',
      'Leaching & Hydrometallurgical Processing of Subsea Rare Earth Muds',
      'Mid-Water Column Plume Dispersal Control & Flocculation Testing'
    ],
    offlineSizeMb: 110,
    downloadStatus: 'NOT_DOWNLOADED',
    isCompleted: false,
    isBookmarked: false,
    quizQuestions: [
      {
        question: 'Which key rare earth elements are heavily concentrated in deep ocean pelagic muds in the Pacific?',
        options: [
          'Helium & Argon',
          'Yttrium, Neodymium, Europium, and Dysprosium',
          'Mercury & Lead',
          'Silicon & Calcium'
        ],
        correctIndex: 1,
        explanation: 'Deep-sea muds contain critical heavy rare earth elements (REEs) including Yttrium, Neodymium, Europium, and Dysprosium required for high-tech electronics and green energy.'
      }
    ]
  },
  {
    id: 'mod-hydrates-505',
    category: 'Methane Gas Hydrates (Clathrates)',
    title: 'Subsea Gas Hydrate Reservoir Extraction & Stability',
    code: 'OME-HYD-510',
    level: 'Advanced',
    durationHours: 40,
    instructor: 'Prof. Marcus Vance',
    institution: 'Offshore Energy & Hydrates Research Center',
    description: 'Thermodynamics and geotechnical engineering for extracting methane gas from deep-water continental margin gas hydrate sediments.',
    topics: [
      'Depressurization vs Thermal Stimulation Extraction Methods',
      'CO2-CH4 Replacement Technologies in Hydrate Matrices',
      'Seabed Subsidence & Continental Slope Stability Risk Analysis',
      'Subsea Wellhead Gas Separation & Hydrate Dissociation Prevention'
    ],
    offlineSizeMb: 165,
    downloadStatus: 'NOT_DOWNLOADED',
    isCompleted: false,
    isBookmarked: false,
    quizQuestions: [
      {
        question: 'What is the most energy-efficient method currently tested for gas production from subsea methane hydrate reservoirs?',
        options: [
          'Direct explosives blasting',
          'Depressurization method (lowering wellbore pressure below hydrate stability curve)',
          'Injecting hot boiling water continuously for 50 miles',
          'Subsea laser drilling'
        ],
        correctIndex: 1,
        explanation: 'Depressurization lowers the reservoir pressure below the hydrate equilibrium phase boundary, causing methane gas dissociation without massive energy input.'
      }
    ]
  },
  {
    id: 'mod-robotics-606',
    category: 'Subsea Robotics & Hydraulics',
    title: 'Deep-Water ROV/AUV Hydraulics, Power & Telemetry at 6000m',
    code: 'OME-ROB-620',
    level: 'Advanced',
    durationHours: 38,
    instructor: 'Eng. Sarah Jenkins, PE',
    institution: 'Subsea Robotics & Mechatronics Lab',
    description: 'Design of high-pressure hydraulic power units (HPU), optical fiber umbilical telemetry, subsea motors, and autonomous vehicle swarm coordination.',
    topics: [
      'Subsea Oil-Filled Pressure-Compensated Enclosures at 600 bar',
      'Fiber-Optic High-Bandwidth Telemetry over 10km Umbilical Cables',
      'Subsea Hydraulic Fluid Viscosity under -1°C to 4°C Ambient Temps',
      'AUV Inertial Navigation System (INS) + Doppler Velocity Log (DVL) Integration'
    ],
    offlineSizeMb: 135,
    downloadStatus: 'DOWNLOADED',
    isCompleted: true,
    isBookmarked: true,
    quizQuestions: [
      {
        question: 'How do deep-water ROV electronics withstand hydrostatic pressures of 600 bar at 6,000m depth?',
        options: [
          'By using thick 10-inch glass spheres for every chip',
          'By housing components in pressure-compensated oil-filled enclosures',
          'By keeping all computers on the surface vessel with 6,000 wires',
          'By operating under vacuum'
        ],
        correctIndex: 1,
        explanation: 'Oil-filled, pressure-compensated enclosures equalize internal pressure with ambient hydrostatic seawater pressure, eliminating structural crushing forces.'
      }
    ]
  },
  {
    id: 'mod-eia-707',
    category: 'Environmental Impact & Plume Modeling',
    title: 'Benthic Plume Dispersion, Turbidity & ISA Environmental Compliance',
    code: 'OME-EIA-450',
    level: 'Intermediate',
    durationHours: 32,
    instructor: 'Dr. Maria Santos',
    institution: 'International Oceanographic Research Foundation',
    description: 'Hydrodynamic sediment plume modeling, turbidity sensor placement, acoustic noise monitoring, and compliance with ISA Regional Environmental Management Plans (REMP).',
    topics: [
      'Particle Size Distribution & Sedimentation Settling Velocity',
      'Mid-Water Discharge Pipe Depth Optimization (e.g. 1000m vs 2000m)',
      'Real-Time Autonomous Turbidity & Acoustic Monitoring Networks',
      'Benthic Biodiversity Impact Mitigation & Preservation Reference Zones (PRZs)'
    ],
    offlineSizeMb: 120,
    downloadStatus: 'NOT_DOWNLOADED',
    isCompleted: false,
    isBookmarked: false,
    quizQuestions: [
      {
        question: 'What is the purpose of establishing Preservation Reference Zones (PRZs) in deep-sea mining permit areas?',
        options: [
          'To anchor surface ships during storms',
          'To preserve representative benthic habitats untouched by mining for scientific baseline monitoring',
          'To dump excess collected sediments',
          'To store spare ROV crawler tracks'
        ],
        correctIndex: 1,
        explanation: 'PRZs are protected zones within contract areas where no mining occurs, serving as scientific baselines to assess biodiversity impact.'
      }
    ]
  },
  {
    id: 'mod-law-808',
    category: 'ISA Regulations & UNCLOS Legal Framework',
    title: 'International Seabed Authority (ISA) Mining Code & Contract Law',
    code: 'OME-LAW-300',
    level: 'Executive Master',
    durationHours: 24,
    instructor: 'Adv. Jonathan Sterling, LL.M',
    institution: 'Center for Maritime & Seabed Law',
    description: 'Comprehensive study of UNCLOS Part XI, ISA Mining Code exploitation regulations, sponsoring state liability, and commercial royalty structures.',
    topics: [
      'UNCLOS Article 137: Common Heritage of Mankind Principle',
      'ISA Exploration & Exploitation Contract Application Process',
      'Sponsoring State Responsibilities & Due Diligence Standards',
      'Financial Mechanism & Royalty Sharing System for Developing Nations'
    ],
    offlineSizeMb: 85,
    downloadStatus: 'NOT_DOWNLOADED',
    isCompleted: false,
    isBookmarked: false,
    quizQuestions: [
      {
        question: 'Under UNCLOS Article 137, who holds rights over the international seabed area (the Area) and its mineral resources?',
        options: [
          'The first country to land a robot on the seabed',
          'Mankind as a whole, managed on behalf of humanity by the International Seabed Authority (ISA)',
          'The United Nations Security Council',
          'Private commercial corporations'
        ],
        correctIndex: 1,
        explanation: 'UNCLOS declares the Area and its resources as the Common Heritage of Mankind, administered by the ISA.'
      }
    ]
  }
];

export const GLOBAL_MINING_ZONES: GlobalMiningZone[] = [
  {
    id: 'zone-ccz-pacific',
    name: 'Clarion-Clipperton Zone (CCZ)',
    region: 'Central Equatorial Pacific Ocean',
    ocean: 'Pacific Ocean',
    depthMeters: '3,800m - 4,300m',
    primaryCategory: 'Polymetallic Nodules',
    keyMinerals: ['Nickel (1.3%)', 'Copper (1.1%)', 'Cobalt (0.22%)', 'Manganese (27%)'],
    estimatedReservesMt: '21,000 Million MT',
    isaContractHolders: ['UK Seabed Resources', 'NORI / TMC (Nauru)', 'TOML (Tonga)', 'GSR (Belgium)', 'BGR (Germany)', 'JOGMEC (Japan)', 'KIOST (South Korea)', 'IOM'],
    status: 'TEST_MINING',
    description: 'The world’s largest deep-sea mineral deposit, stretching over 4.5 million km² between Hawaii and Mexico. Contains more Nickel and Cobalt than all known terrestrial reserves combined.',
    lat: 12.5,
    lng: -135.0,
    environmentalBuffer: '9 Areas of Particular Environmental Interest (APEIs) totaling 1.4M km² banned from mining.'
  },
  {
    id: 'zone-ciob-indian',
    name: 'Central Indian Ocean Basin (CIOB)',
    region: 'Southern Indian Ocean',
    ocean: 'Indian Ocean',
    depthMeters: '3,800m - 4,200m',
    primaryCategory: 'Polymetallic Nodules',
    keyMinerals: ['Manganese', 'Nickel', 'Copper', 'Cobalt'],
    estimatedReservesMt: '5,200 Million MT',
    isaContractHolders: ['Ministry of Earth Sciences (India)', 'Federal Institute for Geosciences (Germany)'],
    status: 'EXPLORATION',
    description: 'Extensive nodule fields in the international seabed area of the Indian Ocean, rich in high-grade battery minerals and rare earth elements.',
    lat: -12.0,
    lng: 78.0,
    environmentalBuffer: '3 Preservation Reference Zones established under ISA REMP guidelines.'
  },
  {
    id: 'zone-mar-atlantic',
    name: 'Mid-Atlantic Ridge Hydrothermal Vent Arc',
    region: 'North & South Atlantic Ocean',
    ocean: 'Atlantic Ocean',
    depthMeters: '2,200m - 3,600m',
    primaryCategory: 'Seafloor Massive Sulfides (SMS)',
    keyMinerals: ['Copper (8-12%)', 'Gold (10-25 g/t)', 'Zinc', 'Silver'],
    estimatedReservesMt: '1,400 Million MT',
    isaContractHolders: ['Ifremer (France)', 'Yuzhmorgeologiya (Russia)', 'Polish Geological Institute'],
    status: 'EXPLORATION',
    description: 'Polymetallic sulfide deposits formed along active and extinct hydrothermal vents along the Mid-Atlantic Ridge rift valley.',
    lat: 23.0,
    lng: -45.0,
    environmentalBuffer: 'Active vents protected; exploration restricted to extinct chimney fields.'
  },
  {
    id: 'zone-cook-islands',
    name: 'Cook Islands EEZ Nodule Basin',
    region: 'South Pacific Polynesian Triangle',
    ocean: 'Pacific Ocean',
    depthMeters: '3,500m - 4,000m',
    primaryCategory: 'Cobalt-Rich Nodules',
    keyMinerals: ['Cobalt (0.45% - 2x CCZ grade)', 'Nickel', 'Titanium', 'Rare Earths'],
    estimatedReservesMt: '6,700 Million MT',
    isaContractHolders: ['Moana Minerals', 'CIC Limited', 'Cobalt Sea Ltd (National EEZ Jurisdiction)'],
    status: 'EEZ_NATIONAL',
    description: 'Sovereign EEZ territory containing the highest-grade Cobalt nodule concentrations on Earth, managed directly by the Cook Islands Seabed Minerals Authority.',
    lat: -18.0,
    lng: -159.0,
    environmentalBuffer: 'Marae Moana Marine Park overlaying 50-mile coastal buffer zones.'
  },
  {
    id: 'zone-japan-minami',
    name: 'Minami-Torishima REE Mud & Crust Arc',
    region: 'Japanese Pacific EEZ',
    ocean: 'Pacific Ocean',
    depthMeters: '5,500m',
    primaryCategory: 'Rare Earth Muds & Cobalt Crusts',
    keyMinerals: ['Dysprosium', 'Yttrium', 'Europium', 'Terbium', 'Cobalt'],
    estimatedReservesMt: '16 Million MT REO Equivalent',
    isaContractHolders: ['JOGMEC', 'University of Tokyo Subsea Mineral Consortium'],
    status: 'TEST_MINING',
    description: 'Ultra-deep pelagic muds containing hundreds of years of global high-tech Rare Earth Element supply within Japan’s exclusive economic zone.',
    lat: 24.3,
    lng: 153.9,
    environmentalBuffer: 'Zero-discharge closed-loop surface separation test mandate.'
  },
  {
    id: 'zone-peru-basin',
    name: 'Peru Basin Abyssal Nodule Plain',
    region: 'Southeastern Pacific Ocean',
    ocean: 'Pacific Ocean',
    depthMeters: '4,100m - 4,300m',
    primaryCategory: 'Polymetallic Nodules',
    keyMinerals: ['Manganese', 'Nickel', 'Molybdenum', 'Lithium'],
    estimatedReservesMt: '3,800 Million MT',
    isaContractHolders: ['BGR (Germany)'],
    status: 'EXPLORATION',
    description: 'High-density nodule field in the South Pacific known for high nodule sizes (>10cm diameter) and high manganese content.',
    lat: -8.5,
    lng: -90.0,
    environmentalBuffer: 'Benthic ecological baseline survey monitoring ongoing since 1989 DISCOL project.'
  }
];

export const TECHNICAL_RESOURCES: DownloadableResource[] = [
  {
    id: 'res-cad-crawler-01',
    title: '4000m Subsea Collector Crawler 3D Assembly File',
    fileType: 'CAD_3D',
    fileFormat: '.STEP / .DWG',
    fileSizeMb: 145,
    category: 'Subsea Robotics',
    downloadsCount: 1420,
    description: 'Complete CAD 3D structural model of a 25-ton subsea collector vehicle with wide track drive, pickup head, and hydraulic manifold layout.',
    downloadStatus: 'NOT_DOWNLOADED',
    isBookmarked: true,
    annotation: 'Review track pad width ratios for soft pelagic clay shear strength (<3.5 kPa) before subsea trial deployment.',
    annotationDate: '2026-08-20'
  },
  {
    id: 'res-pdf-isa-code-02',
    title: 'ISA Mining Code Exploitation Regulations (2026 Official Edition)',
    fileType: 'ISA_REGULATION',
    fileFormat: '.PDF',
    fileSizeMb: 18,
    category: 'ISA Law',
    downloadsCount: 3890,
    description: 'Full legal text of International Seabed Authority exploitation regulations, royalty calculation models, and environmental monitoring standards.',
    downloadStatus: 'DOWNLOADED',
    isBookmarked: true,
    annotation: 'Critical section: Regulation 48 on Preservation Reference Zones (PRZ) boundary buffers in CCZ contracts.',
    annotationDate: '2026-08-21'
  },
  {
    id: 'res-csv-ccz-bathymetry-03',
    title: 'CCZ NORI-D Block High-Res Multibeam Bathymetry & Nodule Density Dataset',
    fileType: 'CSV_DATASET',
    fileFormat: '.CSV / .GEOJSON',
    fileSizeMb: 64,
    category: 'Geotechnical Datasets',
    downloadsCount: 980,
    description: 'Raw acoustic backscatter multibeam depth mapping and sampled nodule abundance data (kg/m²) for spatial interpolation modeling.',
    downloadStatus: 'NOT_DOWNLOADED',
    isBookmarked: false,
    annotation: 'Cross-reference lat -135.2° W backscatter anomalies with box corer sample #42 nodule grade results.',
    annotationDate: '2026-08-22'
  },
  {
    id: 'res-manual-riser-04',
    title: 'Subsea Slurry Riser Pipe Hydraulic Design & Wear Calculation Manual',
    fileType: 'PDF_MANUAL',
    fileFormat: '.PDF',
    fileSizeMb: 42,
    category: 'Riser Hydraulics',
    downloadsCount: 2150,
    description: 'Engineering formulas, pipe wall erosion rates, centrifugal slurry pump curves, and emergency discharge protocols.',
    downloadStatus: 'DOWNLOADED',
    isBookmarked: false,
    annotation: 'Use Formula 4.12 for Durand critical settling velocity check when slurry flow velocity drops under 3.8 m/s.',
    annotationDate: '2026-08-19'
  },
  {
    id: 'res-vid-vent-cutting-05',
    title: 'Seafloor Massive Sulfide Heavy Cutter Trial Video Lecture (1080p)',
    fileType: 'VIDEO_LECTURE',
    fileFormat: '.MP4',
    fileSizeMb: 320,
    category: 'SMS Excavation',
    downloadsCount: 1750,
    description: 'HD video footage of deep-sea heavy auxiliary cutter excavating high-grade sulfide rock in subsea trials.',
    downloadStatus: 'NOT_DOWNLOADED',
    isBookmarked: false
  }
];

export const OCEAN_MINING_JOBS: OceanMiningJob[] = [
  {
    id: 'job-rov-pilot-01',
    title: 'Senior Deep-Water ROV/AUV Pilot Engineer (6000m Class)',
    category: 'ROV Operations',
    company: 'Subsea Minerals International',
    location: 'Clarion-Clipperton Zone (SPV Vessel Deployment)',
    rotationType: 'Offshore 28/28 Days Rotation',
    salaryUSD: '$145,000 - $185,000 / year + Offshore Allowance',
    experienceLevel: 'Senior Lead',
    description: 'Lead pilot for 6000m-rated heavy work-class ROV systems operating subsea seabed crawler collectors, hydraulic umbilical winches, and multibeam sonar positioning.',
    requirements: [
      'Minimum 5 years experience piloting Work-Class ROVs below 2,000m',
      'STCW 2010 Basic Safety & High-Voltage Subsea Certification',
      'Expertise in hydraulic HPU repair, pressure-compensated oil systems, and optical fiber umbilicals',
      'Valid Offshore Survival (BOSIET / FOET with CA-EBS)'
    ],
    postedDate: '2026-08-18',
    vesselName: 'M/V Hidden Gem - Subsea Production Vessel',
    applyDeadline: '2026-09-30'
  },
  {
    id: 'job-riser-eng-02',
    title: 'Subsea Slurry Riser Pipe Hydraulics Lead Engineer',
    category: 'Riser Hydraulics',
    company: 'Oceanic Deep-Sea Mining Corp',
    location: 'Houston, TX / Offshore Field Expeditions',
    rotationType: 'Hybrid Onshore & Offshore Expeditions',
    salaryUSD: '$160,000 - $210,000 / year',
    experienceLevel: 'Senior Lead',
    description: 'Design and optimize 4,000m vertical flexible & rigid slurry riser pipes, subsea lift pumps, vortex shedding suppression strakes, and pipe erosion monitoring sensors.',
    requirements: [
      'B.Sc. or M.Sc. in Ocean Engineering, Mechanical Engineering, or Naval Architecture',
      '8+ years in deepwater riser pipe hydraulics or offshore slurry transport',
      'Proficiency in OrcaFlex, ANSYS Fluent CFD, and subsea pump fluid dynamics',
      'Experience with ISA offshore trial deployments'
    ],
    postedDate: '2026-08-20',
    vesselName: 'SPV Horizon Challenger',
    applyDeadline: '2026-10-15'
  },
  {
    id: 'job-isa-compliance-03',
    title: 'ISA Deep-Sea Regulatory Compliance & EIA Specialist',
    category: 'ISA Regulatory & EIA',
    company: 'Pacific Marine Resources Authority',
    location: 'Kingston, Jamaica / Remote Advisory',
    rotationType: 'Onshore HQ / Global Remote',
    salaryUSD: '$120,000 - $155,000 / year',
    experienceLevel: 'Mid-Level',
    description: 'Manage regulatory reporting to the International Seabed Authority (ISA), review Environmental Impact Statements (EIS), ensure compliance with REMP guidelines, and audit turbidity plume monitoring.',
    requirements: [
      'Master’s degree in Marine Environmental Law, Oceanography, or Maritime Policy',
      'Detailed working knowledge of UNCLOS Part XI and ISA Mining Code',
      'Experience drafting Environmental Management and Monitoring Plans (EMMP)',
      'Strong international stakeholder communication skills'
    ],
    postedDate: '2026-08-15',
    applyDeadline: '2026-09-25'
  },
  {
    id: 'job-geotech-04',
    title: 'Seafloor Geotechnical Crawler Vehicle Specialist',
    category: 'Subsea Geotechnics',
    company: 'Global Seabed Energy & Mining Ltd',
    location: 'Tokyo, Japan / Minami-Torishima Field Site',
    rotationType: 'Offshore Rotational',
    salaryUSD: '$135,000 - $170,000 / year',
    experienceLevel: 'Mid-Level',
    description: 'Optimize track ground bearing pressure for heavy subsea collector vehicles on soft pelagic hydrogel clays. Analyze soil shear strength, crawler sinkage, and traction mechanics.',
    requirements: [
      'Degree in Geotechnical Engineering, Mining Engineering, or Ocean Engineering',
      'Experience with soft marine clay triaxial testing and terramechanics',
      'Subsea crawler control systems programming experience',
      'Offshore medical fitness certificate'
    ],
    postedDate: '2026-08-19',
    vesselName: 'RV Hakuyo Maru',
    applyDeadline: '2026-10-01'
  },
  {
    id: 'job-biologist-05',
    title: 'Abyssal Benthic Oceanographer & Marine Ecosystem Researcher',
    category: 'Benthic Marine Biology',
    company: 'International Oceanographic Research Institute',
    location: 'San Diego, CA / CCZ Field Surveys',
    rotationType: 'Field Research Expeditions',
    salaryUSD: '$95,000 - $130,000 / year',
    experienceLevel: 'Entry',
    description: 'Conduct baseline biological sampling of meiofauna, megafauna, and microbial communities in CCZ Preservation Reference Zones (PRZs). Run eDNA analysis and turbidity shock assessments.',
    requirements: [
      'Ph.D. or M.Sc. in Deep-Sea Biology, Biological Oceanography, or Marine Ecology',
      'Experience with deep-sea box corer, multicorer, and ROV high-definition imagery annotation',
      'eDNA sequencing and statistical biodiversity metrics expertise'
    ],
    postedDate: '2026-08-10',
    applyDeadline: '2026-09-20'
  }
];

export const ENGINEERING_STUDY_DETAILS: EngineeringStudyDetail[] = [
  {
    id: 'detail-riser-01',
    category: '4,000m Riser Hydraulics',
    title: 'Vertical Slurry Transport & Subsea Pump Dynamics',
    subtitle: 'Hydrodynamics of Two-Phase Solid-Liquid Flow at 400 bar Pressure',
    keyFormulas: [
      {
        name: 'Durand Critical Velocity ($V_c$)',
        formula: 'V_c = F_L \\cdot \\sqrt{2g D (S - 1)}',
        explanation: 'Calculates minimum slurry velocity required in a vertical riser pipe to prevent nodule settling and pipe blockage.'
      },
      {
        name: 'Hydrostatic Pressure Head ($P_h$)',
        formula: 'P_h = \\rho_{seawater} \\cdot g \\cdot h',
        explanation: 'Determines pressure differential required for subsea centrifugal pumps at 4,000m depth (~40.2 MPa or 402 bar).'
      }
    ],
    engineeringChallenges: [
      'Severe internal pipe wall erosion caused by high-velocity nodule collisions (>4 m/s)',
      'High pressure drops over 4,000m vertical length requiring multi-stage centrifugal pumps',
      'Vortex Induced Vibration (VIV) caused by deep ocean currents acting on the flexible riser string'
    ],
    solutions: [
      'Rubber-lined or polyurethane internal pipe cladding to absorb particle impact energy',
      'Mid-water air injection or multi-stage subsea centrifugal pumps positioned at 1,500m depth',
      'Helical strakes along top 1,000m of riser pipe to suppress eddy vortex shedding'
    ],
    diagramSummary: 'Surface Ship (SPV) ➔ Flexible Riser Joint ➔ Multi-stage Subsea Slurry Pump at -1,500m ➔ Vertical Steel Riser Pipe ➔ Seafloor Buffer Hopper ➔ Crawler Collector Track Vehicle at -4,000m.'
  },
  {
    id: 'detail-cutter-02',
    category: 'Seafloor Massive Sulfides',
    title: 'Hydrothermal Vent Ore Excavation & Heavy Cutter Mechanics',
    subtitle: 'Mechanical Cutting of High-Grade Copper-Gold Chimney Rock Formations',
    keyFormulas: [
      {
        name: 'Specific Cutting Energy ($SE$)',
        formula: 'SE = \\frac{P_{cutter}}{\\dot{V}_{rock}} \\quad [MJ/m^3]',
        explanation: 'Measures electrical/hydraulic energy consumed per cubic meter of sulfide ore excavated.'
      }
    ],
    engineeringChallenges: [
      'Extreme rock hardness (Unconfined Compressive Strength up to 120 MPa)',
      'High ambient sea temperature spikes around active hydrothermal vents (>300°C)',
      'High pick wear rates on cutter drums requiring frequent underwater tool replacement'
    ],
    solutions: [
      'Tungsten-carbide reinforced heavy cutter pick teeth with internal water cooling',
      'Dual-vehicle strategy: Heavy Auxiliary Cutter (HAC) levels terrain, Bulk Cutter (BC) excavates high volume',
      'Thermal insulation and titanium pressure hulls for subsea robotic electronics'
    ],
    diagramSummary: 'Heavy Auxiliary Cutter ➔ Bulk Cutter ➔ Collecting Machine ➔ Subsea Riser Pump ➔ Surface Ship Onboard Ore Dewatering.'
  },
  {
    id: 'detail-geotech-03',
    category: 'Abyssal Terramechanics',
    title: 'Seafloor Crawler Track Traction in Ultra-Soft Pelagic Clays',
    subtitle: 'Geotechnical Bearing Capacity & Track Sinkage Control at -4,000m',
    keyFormulas: [
      {
        name: 'Bekker Track Bearing Capacity ($q_{ult}$)',
        formula: 'q_{ult} = c \\cdot N_c + \\gamma \\cdot z \\cdot N_q + 0.5 \\cdot \\gamma \\cdot B \\cdot N_r',
        explanation: 'Evaluates maximum weight a crawler track pad can apply without triggering catastrophic soil shear failure.'
      }
    ],
    engineeringChallenges: [
      'Pelagic clay shear strength is extremely low (2 to 5 kPa in top 20cm)',
      'Crawler vehicles weighing 20+ tons in air tend to sink over 0.5 meters into hydrogel sediment',
      'Sediment resuspension generates dense benthic turbidity plumes that obscure vision'
    ],
    solutions: [
      'Ultra-wide track pads made of lightweight synthetic composite materials (buoyant in seawater)',
      'Active track tensioning and ground pressure control algorithms (<4 kPa bearing pressure)',
      'Forward-looking 3D multibeam sonar navigation replacing optical cameras in turbid conditions'
    ],
    diagramSummary: 'Wide Track Pad ➔ Low Bearing Pressure (<4 kPa) ➔ Soft Pelagic Hydrogel Clay ➔ Acoustic Sonar Navigation.'
  }
];

export const INITIAL_FORUM_THREADS: ForumThread[] = [
  {
    id: 'thread-1',
    category: 'Riser Hydraulics & Slurry Transport',
    title: 'Optimizing Durand critical velocity in 4,000m vertical risers during high-wave sea states',
    author: 'Eng. Viktor Vance',
    role: 'Subsea Riser Lead',
    vesselOrInstitution: 'SPV Hidden Gem / Clarion-Clipperton Zone',
    postedDate: '2026-08-21 16:40 UTC',
    likes: 24,
    repliesCount: 3,
    isPinned: true,
    tags: ['Riser Pipe', 'Slurry Flow', 'Durand Formula', 'CFD'],
    content: 'When operating in CCZ sea state 5, heave motion on the surface ship causes vertical acceleration along the 4,000m riser string. Has anyone calibrated pressure drop compensation when nodule concentration spikes above 18% volumetric ratio?',
    replies: [
      {
        id: 'reply-1-1',
        author: 'Dr. Alistair Thorne',
        role: 'Chief Ocean Engineer',
        vesselOrInstitution: 'International Ocean Mining Institute',
        content: 'We observed that introducing variable frequency drive (VFD) speed control on the subsea centrifugal pump at -1,500m dampens pressure surges. Keep fluid velocity at least 15% above Durand critical threshold ($V_c$).',
        postedDate: '2026-08-21 18:10 UTC',
        likes: 12
      },
      {
        id: 'reply-1-2',
        author: 'Sarah Jenkins, PE',
        role: 'Robotics Specialist',
        vesselOrInstitution: 'Subsea Mechatronics Lab',
        content: 'Also check internal polyurethane liner erosion rates. We ran acoustic thickness sensors along the bottom elbow joint.',
        postedDate: '2026-08-22 02:15 UTC',
        likes: 8
      }
    ]
  },
  {
    id: 'thread-2',
    category: 'ISA Compliance & Environmental Plumes',
    title: 'Turbidity sensor calibration standards in CCZ Preservation Reference Zones (PRZs)',
    author: 'Maria Santos',
    role: 'Marine Biologist',
    vesselOrInstitution: 'Research Vessel Hakuyo Maru',
    postedDate: '2026-08-20 09:30 UTC',
    likes: 18,
    repliesCount: 2,
    isPinned: false,
    tags: ['ISA Regulations', 'Turbidity Plumes', 'PRZ', 'Benthic Impact'],
    content: 'We are deploying autonomous optical backscatter sensors (OBS) at 100m and 500m altitude above the seafloor. What ambient NTU baseline offset are teams applying for pelagic clay resuspension?',
    replies: [
      {
        id: 'reply-2-1',
        author: 'Jonathan Sterling, LL.M',
        role: 'ISA Legal Advisor',
        vesselOrInstitution: 'Center for Maritime Law',
        content: 'ISA REMP guidelines mandate a minimum 30-day baseline record prior to crawler operations. Ensure your turbidity threshold alerts trigger automated collector throttle reduction.',
        postedDate: '2026-08-20 14:22 UTC',
        likes: 9
      }
    ]
  },
  {
    id: 'thread-3',
    category: 'Abyssal Geotechnics & Crawler Traction',
    title: 'Mitigating track sinkage in ultra-soft pelagic hydrogel clays (<3 kPa shear strength)',
    author: 'Dr. Hiroshi Tanaka',
    role: 'Geotechnical Fellow',
    vesselOrInstitution: 'Tokyo Subsea Consortium',
    postedDate: '2026-08-19 11:05 UTC',
    likes: 31,
    repliesCount: 4,
    isPinned: false,
    tags: ['Terramechanics', 'Bekker Formula', 'Crawler Tracks', 'Soft Clay'],
    content: 'Testing composite hollow titanium-polyurethane track pads on our 20-ton crawler vehicle. Ground bearing pressure achieved is 3.2 kPa, preventing excessive sinkage on Minami-Torishima REE muds.',
    replies: [
      {
        id: 'reply-3-1',
        author: 'K. V. Ramanathan',
        role: 'Senior Oceanographer',
        vesselOrInstitution: 'National Institute of Ocean Technology',
        content: 'Impressive result! Did you notice any mud caking between track grousers during turn maneuvers?',
        postedDate: '2026-08-19 15:40 UTC',
        likes: 14
      }
    ]
  }
];

export const INITIAL_GAMIFICATION_MILESTONES: GamificationMilestone[] = [
  {
    id: 'badge-1',
    title: 'Abyssal Plain Cadet',
    category: 'Foundation',
    description: 'Complete 3 introductory modules & explore CCZ mining zones.',
    xpReward: 250,
    iconName: 'Compass',
    unlocked: true,
    progressCurrent: 3,
    progressTarget: 3,
    unlockedDate: '2026-08-18'
  },
  {
    id: 'badge-2',
    title: '4,000m Riser Specialist',
    category: 'Riser Hydraulics',
    description: 'Pass the Abyssal Nodule Harvesting & Riser Hydraulics exam with 100% score.',
    xpReward: 500,
    iconName: 'Zap',
    unlocked: true,
    progressCurrent: 1,
    progressTarget: 1,
    unlockedDate: '2026-08-21'
  },
  {
    id: 'badge-3',
    title: 'ISA Code Compliance Officer',
    category: 'Regulatory',
    description: 'Complete the International Seabed Authority (ISA) Mining Code curriculum.',
    xpReward: 400,
    iconName: 'ShieldCheck',
    unlocked: false,
    progressCurrent: 1,
    progressTarget: 2
  },
  {
    id: 'badge-4',
    title: 'Deep-Sea Robotics Master',
    category: 'Subsea Mechatronics',
    description: 'Download CAD crawler schematics and achieve 5 hours of logged study time.',
    xpReward: 600,
    iconName: 'Cpu',
    unlocked: true,
    progressCurrent: 5,
    progressTarget: 5,
    unlockedDate: '2026-08-22'
  },
  {
    id: 'badge-5',
    title: 'Seafloor Massive Sulfides Pioneer',
    category: 'SMS Ore Cutting',
    description: 'Complete the Seafloor Massive Sulfides module and pass the rock cutting quiz.',
    xpReward: 450,
    iconName: 'Pickaxe',
    unlocked: false,
    progressCurrent: 0,
    progressTarget: 1
  },
  {
    id: 'badge-6',
    title: '5-Day Study Streak Veteran',
    category: 'Consistency',
    description: 'Maintain an active daily study timer streak for 5 consecutive offshore shifts.',
    xpReward: 350,
    iconName: 'Flame',
    unlocked: true,
    progressCurrent: 5,
    progressTarget: 5,
    unlockedDate: '2026-08-22'
  }
];

export const INITIAL_RESEARCH_PAPERS: ResearchPaper[] = [
  {
    id: 'paper-1',
    title: 'CFD Simulation & Hydraulic Transport Dynamics of Polymetallic Slurry in 4,000m Vertical Risers',
    authors: ['Dr. Alistair Thorne', 'Eng. Viktor Vance', 'Prof. Marcus Vance'],
    institution: 'International Ocean Mining & Engineering Institute',
    journalOrConference: 'Journal of Subsea Engineering & Fluid Dynamics (2026)',
    publishYear: 2026,
    doi: '10.1016/j.subsea.2026.04.012',
    category: 'Riser Hydraulics',
    abstract: 'This research paper models the two-phase solid-liquid flow of CCZ manganese nodules in 4,000m rigid steel riser pipes under extreme hydrostatic pressure (~40 MPa). Using Eulerian-Eulerian CFD models, we establish optimal slurry velocity limits to eliminate pipe blockage risks.',
    keyFindings: [
      'Critical settling velocity $V_c$ is strictly bounded between 3.8 m/s and 4.6 m/s for nodule particle sizes 20-80mm.',
      'Internal polyurethane lining reduces pipe wall erosion by 68% compared to unclad steel.',
      'Centrifugal pump positioning at -1,500m depth optimizes power distribution and prevents subsea cavitation.'
    ],
    citationCount: 42,
    isBookmarked: true,
    pdfUrl: '/downloads/research_riser_hydraulics_2026.pdf',
    fullText: `1. INTRODUCTION
Deep-sea mining in the Clarion-Clipperton Zone (CCZ) requires lifting dense polymetallic nodules (specific gravity ~2.0 t/m³) from depths exceeding 4,000 meters to a surface production vessel (SPV). The vertical riser pipe serves as the primary artery for hydraulic slurry transport.

2. MATHEMATICAL GOVERNING EQUATIONS
Two-phase solid-liquid fluid flow is governed by the Navier-Stokes equations coupled with granular kinetic theory. The Durand critical velocity formulation:
V_c = F_L * sqrt(2 * g * D * (S - 1))
where F_L is the Durand concentration factor (~1.34), D is the pipe internal diameter (0.35m), g = 9.81 m/s², and S is the nodule-to-seawater relative density ratio (~1.92).

3. EXPERIMENTAL & NUMERICAL RESULTS
CFD simulations show that at slurry velocities below 3.6 m/s, particle deposition occurs near the lower flexible joint, causing local slurry density spikes above 1.45 t/m³ and risk of sudden riser clogging. At velocities above 5.2 m/s, friction loss increases exponentially with high wall wear rates.

4. CONCLUSION
Multi-stage subsea centrifugal lift pumps located at 1,500m depth maintain stable riser flow with an average hydraulic efficiency of 74.2%.`
  },
  {
    id: 'paper-2',
    title: 'Geotechnical Terramechanics & Track Sinkage Control of Subsea Collector Vehicles on Hydrogel Pelagic Clays',
    authors: ['Prof. Hiroshi Tanaka', 'Dr. Elena Rostova', 'Eng. Sarah Jenkins'],
    institution: 'Global Subsea Mineral Technology Center & Tokyo University',
    journalOrConference: 'IEEE Oceanic Engineering Society Transactions (2025)',
    publishYear: 2025,
    doi: '10.1109/JOE.2025.3210984',
    category: 'Abyssal Geotechnics',
    abstract: 'Investigates the bearing capacity and mobility of heavy crawler track vehicles on abyssal pelagic hydrogel clays characterized by extremely low shear strength (2 to 5 kPa). Presents Bekker terramechanics formulations modified for subsea buoyant weight.',
    keyFindings: [
      'Subsea composite track pads with hollow buoyancy cavities reduce effective ground bearing pressure to <3.5 kPa.',
      'Grouser height of 45mm provides optimal soil shear engagement without causing severe sediment resuspension.',
      'Forward-looking 3D multibeam sonar navigation enables accurate trajectory control in low visibility plumes.'
    ],
    citationCount: 68,
    isBookmarked: false,
    pdfUrl: '/downloads/research_geotechnics_crawlers.pdf',
    fullText: `1. INTRODUCTION
Abyssal plain soils in the CCZ consist of soft pelagic clays with high moisture content (>200%) and very low shear strength in the top 20cm sediment layer. Heavy mining vehicles weighing 25 tons in air risk immobilizing sinkage if ground pressure exceeds soil bearing capacity.

2. BEKKER SUBSEA MODIFICATION
The ultimate bearing capacity q_ult is expressed as:
q_ult = c * Nc + gamma * z * Nq + 0.5 * gamma * B * Nr
where c is the clay undrained shear strength (~3 kPa), Nc = 5.14, and gamma is the submerged sediment unit weight (~3.2 kN/m³).

3. TRACK DESIGN OPTIMIZATION
Wide composite tracks (width B = 1.2m per track) distribute vehicle weight effectively. Active track speed synchronisation reduces soil shear slip from 35% down to under 8%, preventing track trenching.`
  },
  {
    id: 'paper-3',
    title: 'Hydrodynamic Dispersion & Environmental Impact Modeling of Benthic Plumes from Deep-Sea Nodule Collection',
    authors: ['Dr. Maria Santos', 'Dr. K. V. Ramanathan', 'Jonathan Sterling, LL.M'],
    institution: 'International Oceanographic Research Foundation',
    journalOrConference: 'Ocean & Coastal Management Review (2026)',
    publishYear: 2026,
    doi: '10.1016/j.ocecoaman.2026.107211',
    category: 'ISA Compliance',
    abstract: 'Evaluates benthic sediment resuspension plumes generated by subsea crawler collectors and mid-water return water discharge pipes. Proposes optimal discharge depths and real-time turbidity monitoring frameworks compliant with ISA Mining Code requirements.',
    keyFindings: [
      'Discharging return seawater at depths >2,000m reduces plume transport into epipelagic and mesopelagic euphotic zones.',
      'Flocculant injection into collector vehicle exhaust reduces fine sediment settling time by 75%.',
      'Preservation Reference Zones (PRZs) must maintain a minimum 25km buffer from active collector transects.'
    ],
    citationCount: 54,
    isBookmarked: true,
    pdfUrl: '/downloads/research_environmental_plume_2026.pdf',
    fullText: `1. INTRODUCTION
Sediment plume dispersion represents one of the primary environmental concerns associated with deep-sea nodule harvesting. Uncontrolled mid-water plumes can affect deep-water pelagic ecosystems and organism filter-feeding mechanics.

2. PLUME DYNAMICS & SETTLING VELOCITY
Fine pelagic silt particles (<10 micrometers) exhibit slow Stokes settling velocities (<0.01 mm/s). Natural ocean currents in the CCZ (0.02 - 0.08 m/s) transport ambient plumes horizontally across tens of kilometers.

3. MITIGATION STRATEGIES
1) Direct seafloor discharge of heavy collector sediment back into the crawler track furrow.
2) Deep mid-water return pipe placement (>2,000m depth) below the main pycnocline.
3) Real-time autonomous turbidity sensor networks triggering automated collection pauses when NTU thresholds exceed 5.0.`
  }
];

export const INITIAL_OCEAN_MINING_INSTITUTES: OceanMiningInstitute[] = [
  {
    id: 'inst-niot-chennai',
    name: 'National Institute of Ocean Technology (NIOT)',
    shortName: 'NIOT Chennai',
    country: 'India',
    region: 'India',
    cityState: 'Chennai, Tamil Nadu',
    fullAddress: 'Velachery - Tambaram Main Road, Narayanapuram, Pallikaranai, Chennai, Tamil Nadu 600100, India',
    postalCode: '600100',
    coordinates: { lat: 12.9382, lng: 80.2078 },
    website: 'https://www.niot.res.in',
    contactEmail: 'admissions.deepocean@niot.res.in',
    contactPhone: '+91 44 6678 3300',
    establishedYear: 1993,
    accreditation: 'Autonomous R&D Institute under Ministry of Earth Sciences (MoES), Govt of India',
    rankingOrReputation: 'Lead Institute for India Deep Ocean Mission & ISA Co-Sponsor',
    programsOffered: [
      {
        degree: 'Ph.D. & Post-Doc Fellowships',
        title: 'Deep-Sea Mining Technology & Subsea Vehicle Robotics',
        duration: '3 - 5 Years',
        mode: 'Full-time On-Campus',
        description: 'Pioneering research on 6,000m abyssal nodule collector crawlers, riser slurry hydraulics, and underwater acoustics.'
      },
      {
        degree: 'M.Tech Thesis Research Program',
        title: 'Offshore Structures & Subsea Mining Hydraulics',
        duration: '1 - 2 Years',
        mode: 'Full-time On-Campus',
        description: 'Joint thesis program with IIT Madras and CUSAT focusing on slurry pump wear and hyperbaric pressure testing.'
      }
    ],
    specializedLabsAndFacilities: [
      '6,000m Hyperbaric Seawater Test Chamber (600 bar)',
      'Subsea Crawler Mining Vehicle Assembly & Prototyping Bay',
      'Acoustic Calibration & Transducer Test Tank',
      'RV Sagar Nidhi Expedition Vessel Base'
    ],
    keyResearchAreas: [
      'Polymetallic Nodule Collectors & Tracked Crawlers',
      'Vertical Riser Slurry Transport Hydraulics',
      'Benthic Sediment Resuspension Plume Containment'
    ],
    isaPartnershipStatus: 'ISA Training Co-Sponsor',
    description: 'NIOT is India premier ocean engineering institute spearheading the national Deep Ocean Mission ($500M budget). NIOT designed and successfully shallow-water tested the 5,000m Varaha deep-sea nodule collector and acoustic seabed mapper.',
    isBookmarked: true
  },
  {
    id: 'inst-iit-madras',
    name: 'Indian Institute of Technology Madras (IIT Madras) - Dept of Ocean Engineering',
    shortName: 'IIT Madras (Ocean Engg)',
    country: 'India',
    region: 'India',
    cityState: 'Chennai, Tamil Nadu',
    fullAddress: 'IIT P.O., Sardar Patel Road, Adyar, Chennai, Tamil Nadu 600036, India',
    postalCode: '600036',
    coordinates: { lat: 12.9915, lng: 80.2337 },
    website: 'https://oe.iitm.ac.in',
    contactEmail: 'dsoe@iitm.ac.in',
    contactPhone: '+91 44 2257 4800',
    establishedYear: 1977,
    accreditation: 'Institute of National Importance (NIRF #1 Engineering Category in India)',
    rankingOrReputation: 'Top Ocean Engineering Department in South Asia',
    programsOffered: [
      {
        degree: 'B.Tech / Dual Degree',
        title: 'Naval Architecture and Ocean Engineering',
        duration: '4 - 5 Years',
        mode: 'Full-time On-Campus',
        description: 'Comprehensive curriculum covering marine hydrodynamics, wave mechanics, and subsea pipeline design.'
      },
      {
        degree: 'M.Tech',
        title: 'Ocean Engineering & Subsea Technology',
        duration: '2 Years',
        mode: 'Full-time On-Campus',
        description: 'Specialization in deepwater riser dynamics, wave-structure interaction, and subsea robotics.'
      },
      {
        degree: 'Ph.D.',
        title: 'Hydrodynamic Slurry Transport & Deepwater Riser Mechanics',
        duration: '3 - 5 Years',
        mode: 'Full-time On-Campus',
        description: 'Advanced numerical modeling (CFD/DEM) of polymetallic nodule transport in 4,000m vertical pipes.'
      }
    ],
    specializedLabsAndFacilities: [
      '90m Towing Tank with Wave Generator',
      'Deepwater Wave Basin & Wave Flume',
      'Dynamic Slurry Pipeline Erosion Test Rig',
      'Marine Geomechanics Soil Testing Lab'
    ],
    keyResearchAreas: [
      'Deepwater Riser Pipe Dynamic Response',
      'Subsea Pipeline Scour & Geotechnics',
      'Wave Action on Surface Mining Support Vessels (SPVs)'
    ],
    isaPartnershipStatus: 'Research Collaborator',
    description: 'The Department of Ocean Engineering at IIT Madras is a global center of excellence in ocean hydrodynamics, offshore structure design, and deepwater riser mechanics, maintaining active research ties with NIOT and international offshore industries.',
    isBookmarked: true
  },
  {
    id: 'inst-iit-kgp',
    name: 'Indian Institute of Technology Kharagpur - Dept of Ocean Engineering & Naval Architecture',
    shortName: 'IIT Kharagpur (OENA)',
    country: 'India',
    region: 'India',
    cityState: 'Kharagpur, West Bengal',
    fullAddress: 'IIT Kharagpur Main Campus, Kharagpur, West Bengal 721302, India',
    postalCode: '721302',
    coordinates: { lat: 22.3149, lng: 87.3105 },
    website: 'https://www.iitkgp.ac.in/department/NA',
    contactEmail: 'head@na.iitkgp.ac.in',
    contactPhone: '+91 3222 282283',
    establishedYear: 1952,
    accreditation: 'Institute of National Importance (IoE)',
    rankingOrReputation: 'Oldest Naval Architecture & Ocean Engineering Department in India',
    programsOffered: [
      {
        degree: 'B.Tech',
        title: 'Ocean Engineering and Naval Architecture',
        duration: '4 Years',
        mode: 'Full-time On-Campus',
        description: 'Core marine engineering, ship resistance, computational fluid dynamics, and offshore platforms.'
      },
      {
        degree: 'M.Tech',
        title: 'Subsea Engineering & Offshore Structural Design',
        duration: '2 Years',
        mode: 'Full-time On-Campus',
        description: 'Advanced focus on deepwater production units, riser dynamics, and subsea mining equipment.'
      }
    ],
    specializedLabsAndFacilities: [
      '150m Ship Model Testing Tank & Cavitation Tunnel',
      'Computational Marine Hydrodynamics Supercomputing Cluster',
      'Subsea Material Fatigue & Corrosion Testing Facility'
    ],
    keyResearchAreas: [
      'Subsea Collector Vehicle Hydrodynamics',
      'Riser Clogging Prevention & Slurry Transport',
      'Offshore Mining Support Vessel Station-Keeping & DP'
    ],
    isaPartnershipStatus: 'Research Collaborator',
    description: 'IIT Kharagpur pioneered ocean engineering education in India. Its department works on cutting-edge CFD modeling of multi-phase nodule slurry flow, subsea crawler traction mechanics, and dynamic positioning for surface production ships.',
    isBookmarked: false
  },
  {
    id: 'inst-nio-goa',
    name: 'CSIR - National Institute of Oceanography (NIO)',
    shortName: 'CSIR-NIO Goa',
    country: 'India',
    region: 'India',
    cityState: 'Dona Paula, Panaji, Goa',
    fullAddress: 'CSIR-NIO Campus, Dona Paula, Panaji, Goa 403004, India',
    postalCode: '403004',
    coordinates: { lat: 15.4589, lng: 73.8037 },
    website: 'https://www.nio.org',
    contactEmail: 'oceanography@nio.org',
    contactPhone: '+91 832 2450 450',
    establishedYear: 1966,
    accreditation: 'Constituent Laboratory of Council of Scientific & Industrial Research (CSIR)',
    rankingOrReputation: 'India Premier Deep-Sea Marine Geological & Environmental Research Center',
    programsOffered: [
      {
        degree: 'Ph.D. & Postdoctoral Fellowships',
        title: 'Marine Geology, Geophysics & Deep-Sea Mineral Resource Mapping',
        duration: '3 - 5 Years',
        mode: 'Research Fellowship',
        description: 'Hands-on research on polymetallic nodule abundance, seabed bathymetry, and benthic ecosystem baseline monitoring.'
      }
    ],
    specializedLabsAndFacilities: [
      'RV Sindhu Sadhana Research Vessel Base',
      'Abyssal Sediment Coring & Geochemical Analytical Lab',
      'Deep Ocean Optical Backscatter & Plume Simulation Lab'
    ],
    keyResearchAreas: [
      'Central Indian Ocean Basin (CIOB) Nodule Grade Assessment',
      'Environmental Impact Assessment (EIA) of Deep-Sea Mining',
      'Acoustic Seabed Mapping & Hydrothermal Vent Biology'
    ],
    isaPartnershipStatus: 'National EEZ Contractor',
    description: 'CSIR-NIO led India initial exploration of polymetallic nodules in the Central Indian Ocean Basin, granting India pioneer investor status with the International Seabed Authority (ISA). NIO conducts crucial benthic environmental baseline studies.',
    isBookmarked: true
  },
  {
    id: 'inst-cusat-kochi',
    name: 'Cochin University of Science and Technology (CUSAT) - School of Ocean Engineering',
    shortName: 'CUSAT Kochi',
    country: 'India',
    region: 'India',
    cityState: 'Kochi, Kerala',
    fullAddress: 'University Road, South Kalamassery, Kalamassery, Kochi, Kerala 682022, India',
    postalCode: '682022',
    coordinates: { lat: 10.0452, lng: 76.3218 },
    website: 'https://cusat.ac.in',
    contactEmail: 'marinegeo@cusat.ac.in',
    contactPhone: '+91 484 257 2258',
    establishedYear: 1971,
    accreditation: 'NAAC A+ Accredited State University',
    rankingOrReputation: 'Leading Coastal & Marine Sciences University in South India',
    programsOffered: [
      {
        degree: 'M.Tech',
        title: 'Ocean Technology & Marine Geotechnics',
        duration: '2 Years',
        mode: 'Full-time On-Campus',
        description: 'Geotechnical soil mechanics, underwater acoustics, and subsea mining instrumentation.'
      },
      {
        degree: 'M.Sc',
        title: 'Marine Geology & Geophysics',
        duration: '2 Years',
        mode: 'Full-time On-Campus',
        description: 'Seafloor massive sulfide (SMS) ore genesis, Cobalt-rich crust sampling, and seismic reflection.'
      }
    ],
    specializedLabsAndFacilities: [
      'Marine Mineral Spectroscopy Analytics Unit',
      'Subsea Geotechnical Triaxial Shear Testing Chamber',
      'Coastal & Marine GIS Remote Sensing Lab'
    ],
    keyResearchAreas: [
      'Abyssal Hydrogel Soil Shear Strengths',
      'Marine Geophysics & High-Resolution Bathymetry',
      'Seafloor Mineral System Dynamics'
    ],
    isaPartnershipStatus: 'Academic Member',
    description: 'CUSAT is a major academic engine for ocean sciences in Kerala. Its School of Ocean Engineering and Department of Marine Geology provide specialised research candidates for NIOT, NIO, and global marine survey contractors.',
    isBookmarked: false
  },
  {
    id: 'inst-tu-delft',
    name: 'TU Delft - Department of Offshore & Dredging Engineering',
    shortName: 'TU Delft (Netherlands)',
    country: 'Netherlands',
    region: 'Europe',
    cityState: 'Delft, South Holland',
    fullAddress: 'Mekelweg 2, 2628 CD Delft, Netherlands',
    postalCode: '2628 CD',
    coordinates: { lat: 52.0026, lng: 4.3702 },
    website: 'https://www.tudelft.nl/en/3mbe/education/master-programmes/offshore-and-dredging-engineering',
    contactEmail: 'info-3mbe@tudelft.nl',
    contactPhone: '+31 15 27 89111',
    establishedYear: 1842,
    accreditation: 'QS World University Ranking #3 for Engineering & Technology in Europe',
    rankingOrReputation: 'Global #1 Authority in Deep-Sea Dredging & Offshore Mining Mechanics',
    programsOffered: [
      {
        degree: 'M.Sc',
        title: 'Offshore & Dredging Engineering (Deep-Sea Mining Specialization)',
        duration: '2 Years',
        mode: 'Full-time On-Campus',
        description: 'Curriculum focused on nodule pick-up mechanics, hydraulic slurry transport, and subsea vehicle terramechanics.'
      },
      {
        degree: 'Ph.D.',
        title: 'Deep Ocean Excavation Hydraulics & Plume Dynamics',
        duration: '4 Years',
        mode: 'Research Fellowship',
        description: 'Advanced research funded by European ocean mining consortia and ISA research grants.'
      }
    ],
    specializedLabsAndFacilities: [
      'Deep Sea Mining Pick-Up Flume & Soil Basin',
      'Slurry Transport Pipeline Recirculating Ring',
      'Subsea Rock & Nodule Excavation Cutter Head Test Rig'
    ],
    keyResearchAreas: [
      'Nodule Pick-Up Head Hydrodynamics',
      'Two-Phase Vertical Slurry Riser Flow',
      'Bekker Terramechanics on Pelagic Hydrogel Clay'
    ],
    isaPartnershipStatus: 'ISA Training Co-Sponsor',
    description: 'TU Delft is internationally renowned as the premier university for deep-sea mining technology and offshore dredging. Its researchers developed core excavation equations used worldwide for subsea nodule collectors and trenchers.',
    isBookmarked: true
  },
  {
    id: 'inst-ntnu-norway',
    name: 'NTNU Norwegian University of Science & Technology - Dept of Marine Technology',
    shortName: 'NTNU Trondheim',
    country: 'Norway',
    region: 'Europe',
    cityState: 'Trondheim, Trøndelag',
    fullAddress: 'Otto Nielsens veg 10, 7052 Trondheim, Norway',
    postalCode: '7052',
    coordinates: { lat: 63.4184, lng: 10.4019 },
    website: 'https://www.ntnu.edu/imt',
    contactEmail: 'studier@imt.ntnu.no',
    contactPhone: '+47 73 59 55 00',
    establishedYear: 1910,
    accreditation: 'Nordic Center of Excellence in Marine Systems',
    rankingOrReputation: 'Europe Premier Subsea Engineering & Deepwater Technology Center',
    programsOffered: [
      {
        degree: 'M.Sc',
        title: 'Marine Technology - Subsea Systems & Seafloor Minerals',
        duration: '2 Years',
        mode: 'Full-time On-Campus',
        description: 'Subsea production systems, seafloor mining vehicle control, and Norwegian EEZ seabed mineral exploration.'
      },
      {
        degree: 'Ph.D.',
        title: 'Seafloor Massive Sulfide (SMS) Ore Harvesting Robotics',
        duration: '3 - 4 Years',
        mode: 'Full-time On-Campus',
        description: 'Focusing on mid-Atlantic ridge hydrothermal vent rock cutting and riser system stability.'
      }
    ],
    specializedLabsAndFacilities: [
      'Marintek Ocean Basin & Towing Tank',
      'Subsea Autonomous Vehicle Testing Flume',
      'Extreme Pressure Hydraulic Test Bay'
    ],
    keyResearchAreas: [
      'Seafloor Massive Sulfides (SMS) Rock Cutting',
      'Subsea Electric Drive Crawler Locomotion',
      'Subsea Umbilical & Power Distribution Systems'
    ],
    isaPartnershipStatus: 'Research Collaborator',
    description: 'NTNU in Trondheim leads European research on seafloor mineral extraction in the Norwegian Extended Continental Shelf. Its marine technology center collaborates closely with Equinor, Loke Marine Minerals, and SINTEF.',
    isBookmarked: true
  },
  {
    id: 'inst-tokyo-uni',
    name: 'University of Tokyo - Department of Ocean Technology, Policy & Environment',
    shortName: 'UTokyo Ocean Technology',
    country: 'Japan',
    region: 'Asia-Pacific',
    cityState: 'Kashiwa, Chiba',
    fullAddress: '5-1-5 Kashiwanoha, Kashiwa-shi, Chiba 277-8561, Japan',
    postalCode: '277-8561',
    coordinates: { lat: 35.8928, lng: 139.9535 },
    website: 'https://www.otpe.k.u-tokyo.ac.jp/en',
    contactEmail: 'info@otpe.k.u-tokyo.ac.jp',
    contactPhone: '+81 4 7136 4700',
    establishedYear: 1877,
    accreditation: 'Top National University in Japan & Asia-Pacific',
    rankingOrReputation: 'Global Pioneer in Rare Earth Element (REE) Mud Mining Technology',
    programsOffered: [
      {
        degree: 'M.Sc / Ph.D.',
        title: 'Ocean Mineral Resources & Subsea Mechanical Systems',
        duration: '2 - 5 Years',
        mode: 'Full-time On-Campus',
        description: 'Advanced studies on Minami-Torishima REE mud extraction, acoustic positioning, and deep-sea riser dynamics.'
      }
    ],
    specializedLabsAndFacilities: [
      'JAMSTEC Deep Sea Simulation Pressure Test Chamber',
      'REE Subsea Mud Airlift & Hydrocyclone Test Facility',
      'Underwater Autonomous Crawler Navigation Lab'
    ],
    keyResearchAreas: [
      'Abyssal REE Mud Continuous Lift Systems',
      'Cobalt-Rich Manganese Crust Harvesting Cutters',
      'Deep Sea Benthic Ecosystem Protection Protocols'
    ],
    isaPartnershipStatus: 'National EEZ Contractor',
    description: 'University of Tokyo spearheads Japan deep-sea mineral resource technology for extracting high-grade Rare Earth Element (REE) mud at 5,700m depth near Minami-Torishima Island, working alongside JGMEC and JAMSTEC.',
    isBookmarked: false
  },
  {
    id: 'inst-colorado-mines',
    name: 'Colorado School of Mines - Center for Marine Resources & Subsea Mining',
    shortName: 'Colorado Mines (USA)',
    country: 'USA',
    region: 'North America',
    cityState: 'Golden, Colorado',
    fullAddress: '1500 Illinois St, Golden, CO 80401, United States',
    postalCode: '80401',
    coordinates: { lat: 39.7510, lng: -105.2226 },
    website: 'https://www.mines.edu',
    contactEmail: 'admissions@mines.edu',
    contactPhone: '+1 303 273 3000',
    establishedYear: 1874,
    accreditation: 'ABET Accredited & Top Mining Engineering University in the Americas',
    rankingOrReputation: 'World #1 QS Ranking for Mining & Minerals Engineering',
    programsOffered: [
      {
        degree: 'M.S. / Ph.D.',
        title: 'Marine Mining Systems & Deep Sea Excavation Engineering',
        duration: '2 - 4 Years',
        mode: 'Full-time On-Campus',
        description: 'Integrating classical terrestrial rock cutting mechanics with hyperbaric ocean environments and marine geotechnics.'
      }
    ],
    specializedLabsAndFacilities: [
      'Subsea Rock Cutting & Disc Cutter Test Rig',
      'Hyperbaric Soil Friction & Shear Simulator',
      'Mineral Processing & Metallurgical Extraction Lab'
    ],
    keyResearchAreas: [
      'Hyperbaric Rock Fragmentation Dynamics',
      'Seafloor Vehicle Terramechanics & Traction',
      'Marine Mineral Processing & Smelting Economics'
    ],
    isaPartnershipStatus: 'Academic Member',
    description: 'Colorado School of Mines applies over 150 years of top-tier mining engineering expertise to deep-sea mineral extraction, studying rock cutting mechanics under 400 bar hydrostatic seawater pressure.',
    isBookmarked: false
  },
  {
    id: 'inst-geomar-germany',
    name: 'GEOMAR Helmholtz Centre for Ocean Research Kiel / Kiel University',
    shortName: 'GEOMAR Kiel',
    country: 'Germany',
    region: 'Europe',
    cityState: 'Kiel, Schleswig-Holstein',
    fullAddress: 'Wischhofstraße 1-3, 24148 Kiel, Germany',
    postalCode: '24148',
    coordinates: { lat: 54.3283, lng: 10.1802 },
    website: 'https://www.geomar.de/en',
    contactEmail: 'info@geomar.de',
    contactPhone: '+49 431 600 0',
    establishedYear: 2004,
    accreditation: 'Member of the Helmholtz Association of German Research Centres',
    rankingOrReputation: 'Europe Lead Authority in Deep-Sea Plume Physics & Environmental Assessment',
    programsOffered: [
      {
        degree: 'M.Sc / Ph.D.',
        title: 'Deep Sea Biological Oceanography & Mineral Plume Physics',
        duration: '2 - 4 Years',
        mode: 'Full-time On-Campus',
        description: 'Specializing in acoustic backscatter sensor networks, plume dispersion modeling, and benthic ecosystem recovery.'
      }
    ],
    specializedLabsAndFacilities: [
      'ROV KIEL 6000 Deep Sea Vehicle Base',
      'Acoustic Particle Settling Test Tower',
      'Seafloor Benthic Chamber Respiration Lab'
    ],
    keyResearchAreas: [
      'Turbidity Plume Hydrodynamics in CCZ Contract Areas',
      'Preservation Reference Zone (PRZ) Boundary Buffers',
      'Deep Sea Microfauna Colonization Rates'
    ],
    isaPartnershipStatus: 'ISA Training Co-Sponsor',
    description: 'GEOMAR Kiel provides indispensable scientific research on environmental impact modeling for deep-sea nodule collection in the Clarion-Clipperton Zone (CCZ), co-sponsoring ISA environmental monitoring fellowships.',
    isBookmarked: true
  },
  {
    id: 'inst-nus-singapore',
    name: 'National University of Singapore (NUS) - Centre for Offshore Research & Engineering',
    shortName: 'NUS Singapore (CORE)',
    country: 'Singapore',
    region: 'Asia-Pacific',
    cityState: 'Singapore',
    fullAddress: '21 Lower Kent Ridge Rd, Singapore 119077',
    postalCode: '119077',
    coordinates: { lat: 1.2966, lng: 103.7764 },
    website: 'https://www.eng.nus.edu.sg',
    contactEmail: 'engcore@nus.edu.sg',
    contactPhone: '+65 6516 6666',
    establishedYear: 1905,
    accreditation: 'QS World University Ranking #8 Globally',
    rankingOrReputation: 'Asia Premier Hub for Offshore Structures & Subsea Hydraulics',
    programsOffered: [
      {
        degree: 'M.Sc',
        title: 'Offshore Technology & Subsea Pipeline Mechanics',
        duration: '1 - 2 Years',
        mode: 'Full-time On-Campus',
        description: 'Advanced dynamics of deepwater risers, subsea manifold hydraulics, and offshore mooring.'
      }
    ],
    specializedLabsAndFacilities: [
      'Deepwater Ocean Basin & Wave Flume Facility',
      'Subsea Flow Assurance & Hydrodynamic Lab'
    ],
    keyResearchAreas: [
      'Deepwater Riser Vortex-Induced Vibrations (VIV)',
      'Subsea Manifold Pressure Surges',
      'Dynamic Mooring of Offshore Production Ships'
    ],
    isaPartnershipStatus: 'Research Collaborator',
    description: 'NUS CORE combines top-ranked engineering faculties with Singapore maritime industry leaders, researching deepwater riser mechanics, fluid-structure interaction, and flow assurance.',
    isBookmarked: false
  },
  {
    id: 'inst-texas-am',
    name: 'Texas A&M University - Department of Ocean Engineering',
    shortName: 'Texas A&M (USA)',
    country: 'USA',
    region: 'North America',
    cityState: 'College Station, Texas',
    fullAddress: '727 Houston St, College Station, TX 77843, United States',
    postalCode: '77843',
    coordinates: { lat: 30.6187, lng: -96.3365 },
    website: 'https://engineering.tamu.edu/ocean',
    contactEmail: 'ocean-head@tamu.edu',
    contactPhone: '+1 979 845 4515',
    establishedYear: 1876,
    accreditation: 'ABET Accredited Ocean Engineering Program',
    rankingOrReputation: 'Leading Ocean Engineering & Dredging Center in North America',
    programsOffered: [
      {
        degree: 'B.S. / M.S. / Ph.D.',
        title: 'Ocean Engineering & Dredging Hydraulics',
        duration: '2 - 4 Years',
        mode: 'Full-time On-Campus',
        description: 'Focusing on hydraulic slurry transport, subsea trenching, and ocean wave dynamics.'
      }
    ],
    specializedLabsAndFacilities: [
      'Haynes Coastal & Ocean Engineering Towing Basin',
      'Dredging & Slurry Transport Test Flume'
    ],
    keyResearchAreas: [
      'Centrifugal Pump Slurry Wear Models',
      'Subsea Pipe Friction & Settlement Velocity',
      'Offshore DP Support Vessels'
    ],
    isaPartnershipStatus: 'Academic Member',
    description: 'Texas A&M Department of Ocean Engineering offers premier training in subsea dredging, slurry pipeline hydraulics, and deepwater riser dynamics, partnering with Gulf of Mexico offshore industry operators.',
    isBookmarked: false
  }
];


