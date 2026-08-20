import React, { useState, useEffect } from 'react';
import {
  Radio,
  Play,
  Pause,
  RefreshCw,
  Search,
  Volume2,
  VolumeX,
  AlertTriangle,
  Compass,
  Wind,
  Droplets,
  Thermometer,
  Waves,
  Activity,
  MapPin,
  Bot,
  Sparkles,
  Info,
  Ship,
  Anchor,
  Navigation,
  ShieldAlert,
  Crosshair,
  ArrowUpRight,
  PhoneCall,
  X,
  Layers,
  Phone
} from 'lucide-react';
import { SOUTH_ASIA_ROUTE_MAPS, RouteMapItem, RouteWaypoint } from '../data/routeMapData';
import { HARBOR_LOCATIONS, INITIAL_VESSELS, Vessel, HarborLocation } from '../data/vesselData';

interface LiveRouteRadarViewProps {
  initialSelectedId?: string;
  onOpenAiAnalyst?: (query: string) => void;
}

export const LiveRouteRadarView: React.FC<LiveRouteRadarViewProps> = ({
  initialSelectedId = 'india-national',
  onOpenAiAnalyst
}) => {
  // Main View Tab: Vessel AIS Tracker or Route Weather Radar
  const [activeSubTab, setActiveSubTab] = useState<'vessels' | 'weather-radar'>('vessels');

  // --- VESSEL TRACKER STATE ---
  const [selectedHarborId, setSelectedHarborId] = useState<string>('mumbai-jnpt');
  const [vessels, setVessels] = useState<Vessel[]>(INITIAL_VESSELS);
  const [selectedVesselId, setSelectedVesselId] = useState<string | null>('vessel-101');
  const [vesselTypeFilter, setVesselTypeFilter] = useState<string>('All');
  const [vesselSearch, setVesselSearch] = useState<string>('');
  const [vesselLogs, setVesselLogs] = useState<string[]>([
    `[${new Date().toISOString().substring(11, 19)} UTC] AIS Station JNPT-01 online. Signal lock on 42 marine targets.`,
    `[${new Date().toISOString().substring(11, 19)} UTC] MV Ocean Express (MMSI 419001234) transmitting SOG 11.4 kts, COG 075°.`
  ]);
  const [vhfModalVessel, setVhfModalVessel] = useState<Vessel | null>(null);
  const [vhfMessageSent, setVhfMessageSent] = useState<boolean>(false);
  const [vesselAiAnalysis, setVesselAiAnalysis] = useState<string | null>(null);
  const [isAnalyzingVessels, setIsAnalyzingVessels] = useState<boolean>(false);

  // --- ROUTE WEATHER RADAR STATE ---
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedRouteId, setSelectedRouteId] = useState<string>(initialSelectedId);
  const [selectedWaypointId, setSelectedWaypointId] = useState<string | null>(null);

  // Stream controls state
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [streamMode, setStreamMode] = useState<'doppler' | 'thermal' | 'sonar' | 'logs'>('doppler');

  // Live dynamic telemetry updates
  const [liveLogs, setLiveLogs] = useState<string[]>([]);
  const [sweepAngle, setSweepAngle] = useState<number>(0);
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);

  const selectedRoute: RouteMapItem =
    SOUTH_ASIA_ROUTE_MAPS.find((r) => r.id === selectedRouteId) || SOUTH_ASIA_ROUTE_MAPS[0];

  const selectedWaypoint: RouteWaypoint | undefined = selectedRoute.waypoints.find(
    (w) => w.id === selectedWaypointId
  ) || selectedRoute.waypoints[0];

  const selectedHarbor: HarborLocation =
    HARBOR_LOCATIONS.find((h) => h.id === selectedHarborId) || HARBOR_LOCATIONS[0];

  const selectedVessel: Vessel | undefined = vessels.find((v) => v.id === selectedVesselId) || vessels[0];

  // Initialize route weather radar logs
  useEffect(() => {
    if (selectedRoute) {
      setLiveLogs(selectedRoute.liveLogs);
      setSelectedWaypointId(selectedRoute.waypoints[0]?.id || null);
      setAiAnalysis(null);
    }
  }, [selectedRouteId]);

  // Radar sweep animation
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setSweepAngle((prev) => (prev + 3) % 360);
    }, 50);

    return () => clearInterval(interval);
  }, [isPlaying]);

  // Live Vessel AIS Coordinate Simulation Loop (Updates vessel positions in real-time)
  useEffect(() => {
    if (!isPlaying) return;

    const aisInterval = setInterval(() => {
      setVessels((prevVessels) =>
        prevVessels.map((v) => {
          if (v.status === 'Anchored' || v.status === 'Moored') {
            return { ...v, lastAisPingSecondsAgo: (v.lastAisPingSecondsAgo + 1) % 10 };
          }

          // Small lat/lng shift based on speed in knots and heading
          const speedFactor = (v.speedKnots / 3600) * 0.03; // scaled for simulation visibility
          const rad = (v.heading * Math.PI) / 180;
          const deltaLat = Math.cos(rad) * speedFactor;
          const deltaLng = Math.sin(rad) * speedFactor;

          const updatedLat = v.lat + deltaLat;
          const updatedLng = v.lng + deltaLng;
          const headingDrift = Math.round((v.heading + (Math.random() * 2 - 1) + 360) % 360);

          return {
            ...v,
            lat: updatedLat,
            lng: updatedLng,
            heading: headingDrift,
            lastAisPingSecondsAgo: 1
          };
        })
      );

      // Randomly log live AIS signal ping for a vessel
      const activeVessels = vessels.filter((v) => v.harborId === selectedHarborId);
      if (activeVessels.length > 0) {
        const randShip = activeVessels[Math.floor(Math.random() * activeVessels.length)];
        const timeNow = new Date().toISOString().substring(11, 19);
        const logMsg = `[${timeNow} UTC] AIS-Class A Ping MMSI ${randShip.mmsi} (${randShip.name}): ${randShip.lat.toFixed(4)}°N, ${randShip.lng.toFixed(4)}°E | SOG ${randShip.speedKnots} kts | COG ${randShip.heading}°`;
        
        setVesselLogs((prev) => [logMsg, ...prev.slice(0, 15)]);
      }
    }, 2500);

    return () => clearInterval(aisInterval);
  }, [isPlaying, selectedHarborId, vessels]);

  // Periodic route ticker logs
  useEffect(() => {
    if (!isPlaying) return;

    const tickerInterval = setInterval(() => {
      const now = new Date().toISOString().substring(11, 19);
      const randomNode =
        selectedRoute.waypoints[Math.floor(Math.random() * selectedRoute.waypoints.length)];
      const dbz = Math.floor(selectedRoute.radarReflectivityDbz + (Math.random() * 6 - 3));
      const windShift = Math.floor(randomNode.windKmH + (Math.random() * 4 - 2));

      const logTemplates = [
        `[${now} UTC] Doppler Radar Ping #${Math.floor(Math.random() * 900 + 100)} back from ${randomNode.name} (${randomNode.code}). Echo: ${dbz} dBZ.`,
        `[${now} UTC] Hydro-Telemetry Sensor Update: ${randomNode.name} wind speed ${windShift} km/h (${randomNode.windDirection}), humidity ${randomNode.humidity}%.`,
        `[${now} UTC] Live Stream Telemetry Packet Verified: Route ${selectedRoute.routeCode} channel ${selectedRoute.streamChannel} frame checksum OK.`
      ];

      const newLog = logTemplates[Math.floor(Math.random() * logTemplates.length)];
      setLiveLogs((prev) => [newLog, ...prev.slice(0, 15)]);
    }, 4500);

    return () => clearInterval(tickerInterval);
  }, [isPlaying, selectedRoute]);

  // Filter vessels by harbor, type, search
  const filteredVessels = vessels.filter((v) => {
    const matchesHarbor = v.harborId === selectedHarborId;
    const matchesType = vesselTypeFilter === 'All' ? true : v.vesselType === vesselTypeFilter;
    const matchesSearch =
      v.name.toLowerCase().includes(vesselSearch.toLowerCase()) ||
      v.mmsi.toString().includes(vesselSearch) ||
      v.callSign.toLowerCase().includes(vesselSearch.toLowerCase()) ||
      v.cargo.toLowerCase().includes(vesselSearch.toLowerCase());

    return matchesHarbor && matchesType && matchesSearch;
  });

  // Filter route weather radar
  const filteredRoutes = SOUTH_ASIA_ROUTE_MAPS.filter((route) => {
    const matchesCategory =
      selectedCategory === 'All'
        ? true
        : selectedCategory === 'SAARC'
        ? route.category === 'SAARC Country'
        : selectedCategory === 'Coastal States'
        ? route.category === 'Indian Coastal State'
        : selectedCategory === 'Inland States'
        ? route.category === 'Indian Inland State'
        : selectedCategory === 'Islands'
        ? route.category === 'Island Territory'
        : true;

    const matchesSearch =
      route.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      route.routeTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      route.officialName.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  // SVG route path calculation
  const getWaypointsSvgPath = (waypoints: RouteWaypoint[]) => {
    if (!waypoints || waypoints.length === 0) return { pathString: '', points: [] };

    const lats = waypoints.map((w) => w.lat);
    const lngs = waypoints.map((w) => w.lng);
    const minLat = Math.min(...lats);
    const maxLat = Math.max(...lats);
    const minLng = Math.min(...lngs);
    const maxLng = Math.max(...lngs);

    const latSpan = maxLat - minLat || 1;
    const lngSpan = maxLng - minLng || 1;

    const padding = 120;
    const width = 1000;
    const height = 550;

    const points = waypoints.map((w) => {
      const x = padding + ((w.lng - minLng) / lngSpan) * (width - 2 * padding);
      const y = height - padding - ((w.lat - minLat) / latSpan) * (height - 2 * padding);
      return { ...w, x, y };
    });

    const pathString = points.reduce((acc, pt, idx) => {
      return idx === 0 ? `M ${pt.x} ${pt.y}` : `${acc} L ${pt.x} ${pt.y}`;
    }, '');

    return { pathString, points };
  };

  const { pathString, points } = getWaypointsSvgPath(selectedRoute.waypoints);

  // Trigger AI Vessel Analysis
  const handleRunVesselAiAnalysis = async () => {
    setIsAnalyzingVessels(true);
    setVesselAiAnalysis(null);

    try {
      const response = await fetch('/api/ai-analyst', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: `Analyze live AIS vessel traffic for ${selectedHarbor.name} (${selectedHarbor.country}). Active vessels count: ${filteredVessels.length}. Weather: ${selectedHarbor.weatherSummary}. Congestion: ${selectedHarbor.congestionIndex}. Provide 3 short operational bullets covering channel clearance, CPA collision risks, and anchorage berth recommendations.`
        })
      });

      if (response.ok) {
        const data = await response.json();
        setVesselAiAnalysis(data.text || data.reply || 'Harbor AIS stream verified clear.');
      } else {
        setVesselAiAnalysis(
          `• Harbor Navigation Channel: ${selectedHarbor.name} current congestion is ${selectedHarbor.congestionIndex}. Maintain 0.5 NM minimum vessel buffer.\n• Collision Risk Assessment: 1 vessel operating at CPA < 1.0 NM. VHF Ch ${selectedHarbor.vhfPortControlChannel} broadcast recommended.\n• Anchorage Advisory: Pilot boarding station active. Draft clearance safe for deep hull cargo vessels.`
        );
      }
    } catch {
      setVesselAiAnalysis(
        `• Harbor Navigation Channel: ${selectedHarbor.name} current congestion is ${selectedHarbor.congestionIndex}. Maintain 0.5 NM minimum vessel buffer.\n• Collision Risk Assessment: 1 vessel operating at CPA < 1.0 NM. VHF Ch ${selectedHarbor.vhfPortControlChannel} broadcast recommended.\n• Anchorage Advisory: Pilot boarding station active. Draft clearance safe for deep hull cargo vessels.`
      );
    } finally {
      setIsAnalyzingVessels(false);
    }
  };

  // Trigger AI Route Analysis
  const handleRunAiAnalysis = async () => {
    setIsAnalyzing(true);
    setAiAnalysis(null);

    try {
      const response = await fetch('/api/ai-analyst', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: `Provide a quick 3-bullet live meteorology and maritime route risk analysis for ${selectedRoute.name} (${selectedRoute.routeTitle}). Key route data: Overall status: ${selectedRoute.overallStatus}, Doppler Frequency: ${selectedRoute.dopplerFrequency}, Reflectivity: ${selectedRoute.radarReflectivityDbz} dBZ.`
        })
      });

      if (response.ok) {
        const data = await response.json();
        setAiAnalysis(data.text || data.reply || 'Route climate stream verified normal.');
      } else {
        setAiAnalysis(
          `• Live Doppler scan confirms stable radar reflectivity (${selectedRoute.radarReflectivityDbz} dBZ) along ${selectedRoute.name} route.\n• Coastal wave heights across waypoints remain within safe vessel operational tolerances (${selectedRoute.waypoints[0]?.waveHeightM || 1.2}m avg).\n• Atmospheric barometric pressure reading baseline 1008 hPa with normal humidity levels.`
        );
      }
    } catch {
      setAiAnalysis(
        `• Live Doppler scan confirms stable radar reflectivity (${selectedRoute.radarReflectivityDbz} dBZ) along ${selectedRoute.name} route.\n• Coastal wave heights across waypoints remain within safe vessel operational tolerances (${selectedRoute.waypoints[0]?.waveHeightM || 1.2}m avg).\n• Atmospheric barometric pressure reading baseline 1008 hPa with normal humidity levels.`
      );
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div id="live-route-radar-view" className="space-y-6">
      {/* Top Main Mode Navigation Switcher */}
      <div className="bg-slate-900 border border-slate-800 p-2 rounded-2xl flex items-center justify-between shadow-xl flex-wrap gap-2">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setActiveSubTab('vessels')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center space-x-2 ${
              activeSubTab === 'vessels'
                ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-slate-950 shadow-lg shadow-teal-500/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Ship className="w-4 h-4" />
            <span>LIVE AIS VESSEL & HARBOR TRACKER</span>
            <span className="px-1.5 py-0.5 rounded-md bg-slate-950 text-teal-300 text-[10px] font-mono">
              REAL-TIME
            </span>
          </button>

          <button
            onClick={() => setActiveSubTab('weather-radar')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center space-x-2 ${
              activeSubTab === 'weather-radar'
                ? 'bg-gradient-to-r from-sky-500 to-indigo-500 text-white shadow-lg shadow-sky-500/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Radio className="w-4 h-4" />
            <span>ROUTE WEATHER & DOPPLER RADAR</span>
          </button>
        </div>

        <div className="flex items-center space-x-2 px-3 py-1 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="font-mono text-[11px]">AIS Class-A & Doppler Stream Active</span>
        </div>
      </div>

      {/* ==================== SUB-TAB 1: LIVE AIS VESSEL TRACKER ==================== */}
      {activeSubTab === 'vessels' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Header Banner */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10">
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-teal-500/20 text-teal-300 border border-teal-500/30 flex items-center space-x-1.5 animate-pulse">
                    <span className="w-2 h-2 rounded-full bg-teal-400" />
                    <span>SATELLITE AIS LIVE TELEMETRY</span>
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    PORT CONTROL VHF: CH {selectedHarbor.vhfPortControlChannel}
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center space-x-3">
                  <span>{selectedHarbor.countryFlag}</span>
                  <span>{selectedHarbor.name} Live Ships Tracker</span>
                </h1>
                <p className="text-slate-300 text-sm mt-1 max-w-3xl">
                  Simulated live coordinates, vessel velocity (SOG/COG), nearest collision hazards (CPA/TCPA), draft clearance meters, and VHF channel calling across major South Asian ports.
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className={`px-4 py-2 rounded-xl font-medium text-sm flex items-center space-x-2 transition-all ${
                    isPlaying
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                      : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  }`}
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-4 h-4" />
                      <span>Pause Live Simulation</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4" />
                      <span>Start Coordinates Sync</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Harbor Selector Bar */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
            <div className="text-xs text-slate-400 font-bold uppercase tracking-wider flex items-center justify-between">
              <span>Select International Harbor / Anchorage Channel:</span>
              <span className="text-teal-400 font-normal">
                {HARBOR_LOCATIONS.length} Strategic Sea Ports
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
              {HARBOR_LOCATIONS.map((harbor) => {
                const isSelected = harbor.id === selectedHarborId;
                return (
                  <button
                    key={harbor.id}
                    onClick={() => {
                      setSelectedHarborId(harbor.id);
                      setSelectedVesselId(
                        vessels.find((v) => v.harborId === harbor.id)?.id || null
                      );
                    }}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'bg-gradient-to-br from-teal-500/30 to-cyan-500/20 border-teal-400 text-white shadow-lg'
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-lg">{harbor.countryFlag}</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-900 text-teal-300 font-mono font-bold">
                        {harbor.activeShipsCount} Vessels
                      </span>
                    </div>
                    <div className="mt-1">
                      <p className="font-bold text-xs truncate text-white">{harbor.name}</p>
                      <p className="text-[10px] text-slate-400 truncate">{harbor.country}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Harbor Live Status & Search Filter */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-3 text-xs text-slate-300 w-full sm:w-auto overflow-x-auto">
              <div className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center space-x-2">
                <Anchor className="w-4 h-4 text-cyan-400" />
                <span>Harbor Weather: <strong className="text-white">{selectedHarbor.weatherSummary}</strong></span>
              </div>
              <div className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center space-x-2">
                <ShieldAlert className="w-4 h-4 text-amber-400" />
                <span>Traffic Congestion: <strong className="text-amber-300">{selectedHarbor.congestionIndex}</strong></span>
              </div>
            </div>

            <div className="flex items-center space-x-2 w-full sm:w-auto">
              {/* Type Filter */}
              <select
                value={vesselTypeFilter}
                onChange={(e) => setVesselTypeFilter(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-teal-500"
              >
                <option value="All">All Vessel Types</option>
                <option value="Container">Container Ships</option>
                <option value="Oil Tanker">Oil Tankers</option>
                <option value="Bulk Carrier">Bulk Carriers</option>
                <option value="LNG Carrier">LNG Carriers</option>
                <option value="Passenger Ferry">Passenger Ferries</option>
                <option value="Fishing Trawler">Fishing Trawlers</option>
                <option value="Tugboat / Patrol">Tugboats & Patrol</option>
              </select>

              {/* Search input */}
              <div className="relative w-full sm:w-48">
                <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search ship, MMSI, cargo..."
                  value={vesselSearch}
                  onChange={(e) => setVesselSearch(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
                />
              </div>
            </div>
          </div>

          {/* Main Layout: Harbor AIS Canvas + Vessel Details Drawer */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left 2 Cols: Interactive AIS Harbor Radar Canvas */}
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl relative">
                {/* Screen Top Bar */}
                <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-1.5">
                      <span className="w-3 h-3 rounded-full bg-teal-400 animate-pulse" />
                      <span className="text-xs font-bold text-white tracking-wider font-mono">
                        HARBOR AIS LIVE SCAN
                      </span>
                    </div>
                    <span className="text-slate-500 text-xs">|</span>
                    <span className="text-xs text-teal-300 font-mono">
                      CENTER: {selectedHarbor.centerLat.toFixed(4)}° N, {selectedHarbor.centerLng.toFixed(4)}° E
                    </span>
                  </div>

                  <span className="text-[11px] text-slate-400 font-mono">
                    SCALE: 0.05° LAT/LNG GRID
                  </span>
                </div>

                {/* Simulated Radar Canvas */}
                <div className="relative bg-slate-950 h-[480px] w-full overflow-hidden flex items-center justify-center border-b border-slate-800">
                  {/* Concentric AIS Radar Rings */}
                  <div className="absolute w-[440px] h-[440px] rounded-full border border-teal-500/20 pointer-events-none" />
                  <div className="absolute w-[280px] h-[280px] rounded-full border border-teal-500/30 pointer-events-none" />
                  <div className="absolute w-[140px] h-[140px] rounded-full border border-teal-500/40 pointer-events-none" />

                  {/* Crosshair Lines */}
                  <div className="absolute inset-x-0 h-[1px] bg-teal-500/20 pointer-events-none" />
                  <div className="absolute inset-y-0 w-[1px] bg-teal-500/20 pointer-events-none" />

                  {/* Rotating AIS Radar Sweep Beam */}
                  {isPlaying && (
                    <div
                      className="absolute w-[480px] h-[480px] rounded-full pointer-events-none transition-transform"
                      style={{
                        transform: `rotate(${sweepAngle}deg)`,
                        background:
                          'conic-gradient(from 0deg, transparent 0deg, transparent 300deg, rgba(20, 184, 166, 0.25) 360deg)'
                      }}
                    />
                  )}

                  {/* Render Ships on Radar Grid */}
                  <svg className="w-full h-full absolute inset-0 z-10" viewBox="0 0 600 480">
                    {filteredVessels.map((vessel) => {
                      // Map lat/lng relative to harbor center
                      const cx = 300;
                      const cy = 240;
                      const scale = 3200; // pixels per degree
                      const x = cx + (vessel.lng - selectedHarbor.centerLng) * scale;
                      const y = cy - (vessel.lat - selectedHarbor.centerLat) * scale;

                      const isSelected = vessel.id === selectedVesselId;
                      const isHighHazard = vessel.cpaNm < 1.0;

                      // Calculate speed leader vector
                      const vecLength = Math.max(12, vessel.speedKnots * 2);
                      const rad = (vessel.heading * Math.PI) / 180;
                      const vx = x + Math.sin(rad) * vecLength;
                      const vy = y - Math.cos(rad) * vecLength;

                      return (
                        <g
                          key={vessel.id}
                          className="cursor-pointer group"
                          onClick={() => setSelectedVesselId(vessel.id)}
                        >
                          {/* Collision Hazard Ring */}
                          {isHighHazard && (
                            <circle
                              cx={x}
                              cy={y}
                              r="20"
                              className="fill-rose-500/20 stroke-rose-500 stroke-1 animate-ping"
                            />
                          )}

                          {/* Selected Vessel Pulse Ring */}
                          {isSelected && (
                            <circle
                              cx={x}
                              cy={y}
                              r="18"
                              className="fill-teal-500/20 stroke-teal-400 stroke-2"
                            />
                          )}

                          {/* Velocity Vector Leader Line */}
                          <line
                            x1={x}
                            y1={y}
                            x2={vx}
                            y2={vy}
                            stroke={isSelected ? '#2dd4bf' : '#38bdf8'}
                            strokeWidth="2"
                            strokeDasharray={vessel.speedKnots === 0 ? '2 2' : 'none'}
                          />

                          {/* Ship Marker Icon (Rotated Triangle Shape) */}
                          <g transform={`translate(${x}, ${y}) rotate(${vessel.heading})`}>
                            <polygon
                              points="0,-10 6,8 -6,8"
                              className={
                                isSelected
                                  ? 'fill-teal-300 stroke-white stroke-2'
                                  : isHighHazard
                                  ? 'fill-rose-500 stroke-slate-950 stroke-1'
                                  : vessel.vesselType === 'Container'
                                  ? 'fill-cyan-400 stroke-slate-950 stroke-1'
                                  : vessel.vesselType === 'Oil Tanker'
                                  ? 'fill-amber-400 stroke-slate-950 stroke-1'
                                  : 'fill-emerald-400 stroke-slate-950 stroke-1'
                              }
                            />
                          </g>

                          {/* Ship Name Label Overlay */}
                          <g transform={`translate(${x}, ${y - 16})`}>
                            <rect
                              x="-40"
                              y="-12"
                              width="80"
                              height="16"
                              rx="4"
                              className={
                                isSelected
                                  ? 'fill-teal-950 stroke-teal-400'
                                  : 'fill-slate-950/80 stroke-slate-800'
                              }
                            />
                            <text
                              x="0"
                              y="-2"
                              textAnchor="middle"
                              className="fill-white text-[9px] font-mono font-bold"
                            >
                              {vessel.name.length > 12 ? `${vessel.name.substring(0, 10)}..` : vessel.name}
                            </text>
                          </g>

                          {/* Speed Badge */}
                          <g transform={`translate(${x}, ${y + 16})`}>
                            <text
                              x="0"
                              y="0"
                              textAnchor="middle"
                              className="fill-teal-300 text-[8px] font-mono"
                            >
                              {vessel.speedKnots} kts
                            </text>
                          </g>
                        </g>
                      );
                    })}
                  </svg>

                  {/* Bottom Left Telemetry Overlay */}
                  <div className="absolute bottom-3 left-3 bg-slate-900/90 backdrop-blur-md border border-slate-800 p-3 rounded-xl text-xs font-mono space-y-1 z-20 text-slate-300">
                    <div className="flex items-center space-x-2 text-white font-bold">
                      <Crosshair className="w-3.5 h-3.5 text-teal-400" />
                      <span>SATELLITE AIS SENSORS ONLINE</span>
                    </div>
                    <div>TRACKING TARGETS: <span className="text-teal-400 font-bold">{filteredVessels.length} Ships</span></div>
                    <div>NEAREST CPA HAZARD: <span className="text-rose-400 font-bold">0.3 NM (Ferry-Atoll)</span></div>
                  </div>

                  {/* Bottom Right Map Key */}
                  <div className="absolute bottom-3 right-3 bg-slate-900/90 backdrop-blur-md border border-slate-800 p-2.5 rounded-xl text-[10px] z-20 hidden sm:block">
                    <p className="text-slate-400 mb-1 font-mono">AIS Target Color Key</p>
                    <div className="flex items-center space-x-3 text-white">
                      <span className="flex items-center space-x-1">
                        <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                        <span>Container</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                        <span>Tanker/LNG</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                        <span>Trawler/Ferry</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Footer Telemetry Bar */}
                <div className="bg-slate-950 p-4 border-t border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800 flex items-center space-x-2">
                    <Ship className="w-4 h-4 text-teal-400" />
                    <div>
                      <p className="text-slate-400 text-[10px]">HARBOR ANCHORAGE</p>
                      <p className="font-semibold text-white">{selectedHarbor.name}</p>
                    </div>
                  </div>

                  <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800 flex items-center space-x-2">
                    <PhoneCall className="w-4 h-4 text-cyan-400" />
                    <div>
                      <p className="text-slate-400 text-[10px]">VHF CALL CHANNEL</p>
                      <p className="font-semibold text-teal-300 font-mono">CH {selectedHarbor.vhfPortControlChannel}</p>
                    </div>
                  </div>

                  <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800 flex items-center space-x-2">
                    <ShieldAlert className="w-4 h-4 text-amber-400" />
                    <div>
                      <p className="text-slate-400 text-[10px]">TRAFFIC DENSITY</p>
                      <p className="font-semibold text-amber-300">{selectedHarbor.congestionIndex} Congestion</p>
                    </div>
                  </div>

                  <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800 flex items-center space-x-2">
                    <Activity className="w-4 h-4 text-emerald-400" />
                    <div>
                      <p className="text-slate-400 text-[10px]">LIVE REFRESH</p>
                      <p className="font-semibold text-emerald-300 font-mono">2.5s Coordinates Sync</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* AI Vessel Traffic & Collision Risk Inspector */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="p-1.5 bg-teal-500/20 text-teal-300 rounded-lg border border-teal-500/30">
                      <Bot className="w-4 h-4" />
                    </div>
                    <h3 className="font-semibold text-sm text-white">
                      AI Harbor Traffic & Collision Risk Inspector
                    </h3>
                  </div>

                  <button
                    onClick={handleRunVesselAiAnalysis}
                    disabled={isAnalyzingVessels}
                    className="px-3 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-slate-950 font-bold text-xs flex items-center space-x-1.5 transition-all shadow-md shadow-teal-600/20 disabled:opacity-50"
                  >
                    {isAnalyzingVessels ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>Scanning Channel...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Run AI Traffic Scan</span>
                      </>
                    )}
                  </button>
                </div>

                {vesselAiAnalysis ? (
                  <div className="bg-slate-950 p-4 rounded-xl border border-teal-500/30 text-xs text-slate-300 space-y-2 whitespace-pre-line leading-relaxed font-sans">
                    {vesselAiAnalysis}
                  </div>
                ) : (
                  <p className="text-xs text-slate-400">
                    Click above to trigger an intelligent AI trajectory analysis of harbor vessel density, closest point of approach (CPA) hazards, and anchorage berth availability in {selectedHarbor.name}.
                  </p>
                )}
              </div>
            </div>

            {/* Right 1 Col: Selected Vessel Inspector & VHF Radio Control */}
            <div className="space-y-6">
              {/* Selected Vessel Inspector Box */}
              {selectedVessel ? (
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
                  <div className="flex items-start justify-between border-b border-slate-800 pb-3">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-bold text-teal-400 uppercase">{selectedVessel.vesselType}</span>
                        <span className="text-slate-500">•</span>
                        <span className="text-xs text-slate-300">{selectedVessel.flag}</span>
                      </div>
                      <h3 className="font-bold text-white text-lg mt-0.5">{selectedVessel.name}</h3>
                      <p className="text-slate-400 text-xs font-mono">
                        MMSI: {selectedVessel.mmsi} | IMO: {selectedVessel.imo} | CALL: {selectedVessel.callSign}
                      </p>
                    </div>

                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold border shrink-0 ${
                        selectedVessel.status === 'Underway'
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                          : selectedVessel.status === 'Anchored'
                          ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                          : 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30'
                      }`}
                    >
                      {selectedVessel.status}
                    </span>
                  </div>

                  {/* Live Coordinates Meter */}
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1 text-xs">
                    <div className="text-slate-400 text-[10px] font-mono">SIMULATED LIVE AIS COORDINATES:</div>
                    <div className="text-teal-300 font-mono font-bold text-sm flex items-center justify-between">
                      <span>{selectedVessel.lat.toFixed(5)}° N, {selectedVessel.lng.toFixed(5)}° E</span>
                      <span className="text-[10px] text-slate-400 font-normal">Ping: {selectedVessel.lastAisPingSecondsAgo}s ago</span>
                    </div>
                  </div>

                  {/* Navigation & Speed Metrics Grid */}
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
                      <div className="text-slate-400 text-[10px]">Speed (SOG)</div>
                      <div className="text-base font-bold text-white font-mono">{selectedVessel.speedKnots} Knots</div>
                      <div className="text-[10px] text-teal-400">Heading: {selectedVessel.heading}°</div>
                    </div>

                    <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
                      <div className="text-slate-400 text-[10px]">Draft Depth</div>
                      <div className="text-base font-bold text-amber-300 font-mono">{selectedVessel.draftM} Meters</div>
                      <div className="text-[10px] text-slate-400">Len: {selectedVessel.lengthM}m | Beam: {selectedVessel.beamM}m</div>
                    </div>

                    <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
                      <div className="text-slate-400 text-[10px]">Collision CPA</div>
                      <div className={`text-base font-bold font-mono ${selectedVessel.cpaNm < 1.0 ? 'text-rose-400' : 'text-emerald-400'}`}>
                        {selectedVessel.cpaNm} NM
                      </div>
                      <div className="text-[10px] text-slate-400">TCPA: {selectedVessel.tcpaMin} mins</div>
                    </div>

                    <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
                      <div className="text-slate-400 text-[10px]">Radio VHF</div>
                      <div className="text-base font-bold text-cyan-300 font-mono">CH {selectedVessel.vhfChannel}</div>
                      <div className="text-[10px] text-slate-400">DSC Bridge Call</div>
                    </div>
                  </div>

                  {/* Cargo & Destination */}
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1.5 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 text-[10px]">DESTINATION PORT:</span>
                      <span className="text-amber-300 font-bold">{selectedVessel.destinationEta}</span>
                    </div>
                    <div className="font-bold text-white">{selectedVessel.destination}</div>
                    <div className="text-slate-300 text-[11px] pt-1 border-t border-slate-900">
                      <strong>Cargo Manifest:</strong> {selectedVessel.cargo}
                    </div>
                  </div>

                  {/* VHF Call Action Button */}
                  <button
                    onClick={() => {
                      setVhfModalVessel(selectedVessel);
                      setVhfMessageSent(false);
                    }}
                    className="w-full py-2.5 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-slate-950 font-extrabold rounded-xl text-xs transition-all flex items-center justify-center space-x-2 shadow-lg shadow-teal-500/20"
                  >
                    <PhoneCall className="w-4 h-4" />
                    <span>CALL VESSEL ON VHF CHANNEL {selectedVessel.vhfChannel}</span>
                  </button>
                </div>
              ) : (
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center text-slate-400 text-xs">
                  Select a vessel from the radar grid or list to inspect live coordinates and cargo telemetry.
                </div>
              )}

              {/* Real-time AIS Telemetry Broadcast Feed */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-xl">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center space-x-2">
                    <Radio className="w-4 h-4 text-teal-400 animate-pulse" />
                    <h3 className="font-bold text-white text-sm">Real-time AIS Telemetry Log</h3>
                  </div>
                  <button
                    onClick={() => setVesselLogs([])}
                    className="text-[10px] text-slate-400 hover:text-white transition-colors"
                  >
                    Clear Feed
                  </button>
                </div>

                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 h-64 overflow-y-auto space-y-2 font-mono text-[11px] text-slate-300">
                  {vesselLogs.length > 0 ? (
                    vesselLogs.map((log, idx) => (
                      <div
                        key={idx}
                        className="p-2 rounded bg-slate-900/60 border border-slate-800 leading-relaxed text-teal-200"
                      >
                        {log}
                      </div>
                    ))
                  ) : (
                    <div className="h-full flex items-center justify-center text-slate-500 text-xs">
                      Waiting for incoming satellite AIS signals...
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================== SUB-TAB 2: ROUTE WEATHER & DOPPLER RADAR ==================== */}
      {activeSubTab === 'weather-radar' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Header */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10">
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-rose-500/20 text-rose-300 border border-rose-500/30 flex items-center space-x-1.5 animate-pulse">
                    <span className="w-2 h-2 rounded-full bg-rose-500" />
                    <span>LIVE DOPPLER WEATHER STREAM</span>
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    CHANNEL: {selectedRoute.streamChannel}
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-mono">
                    1080p Telemetry • 60 FPS
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center space-x-3">
                  <span>{selectedRoute.flagEmoji}</span>
                  <span>{selectedRoute.name} Route Weather Radar Map</span>
                </h1>
                <p className="text-slate-300 text-sm mt-1 max-w-3xl">
                  Watching live stream weather, marine wave swells, Doppler radar reflectivity, and climate telemetry separately for every South Asian country and Indian coastal/inland state.
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className={`px-4 py-2 rounded-xl font-medium text-sm flex items-center space-x-2 transition-all ${
                    isPlaying
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30'
                      : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30'
                  }`}
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-4 h-4" />
                      <span>Pause Stream</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4" />
                      <span>Resume Live Stream</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className={`p-2.5 rounded-xl border transition-all ${
                    isMuted
                      ? 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
                      : 'bg-sky-500/20 text-sky-300 border-sky-500/40'
                  }`}
                  title={isMuted ? 'Unmute Radar Beep Audio' : 'Mute Radar Beep Audio'}
                >
                  {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>

          {/* Region Filter Bar */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center space-x-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
                {[
                  { id: 'All', label: 'All Regions' },
                  { id: 'SAARC', label: '8 SAARC Nations' },
                  { id: 'Coastal States', label: 'Indian Coastal' },
                  { id: 'Inland States', label: 'Indian Inland' },
                  { id: 'Islands', label: 'Islands & Archipelagos' }
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                      selectedCategory === cat.id
                        ? 'bg-sky-500 text-slate-950 font-bold shadow-md shadow-sky-500/20'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search country or state..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-9 pr-4 py-1.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-sky-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2">
              {filteredRoutes.map((route) => {
                const isSelected = route.id === selectedRouteId;
                return (
                  <button
                    key={route.id}
                    onClick={() => setSelectedRouteId(route.id)}
                    className={`p-2.5 rounded-xl border text-left transition-all relative flex flex-col justify-between ${
                      isSelected
                        ? 'bg-sky-500/20 border-sky-400 text-white shadow-lg shadow-sky-500/10'
                        : 'bg-slate-800/80 border-slate-700/80 text-slate-300 hover:bg-slate-800 hover:border-slate-600'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="text-lg">{route.flagEmoji}</span>
                      {route.overallStatus === 'Alert' ? (
                        <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                      ) : route.overallStatus === 'Advisory' ? (
                        <span className="w-2 h-2 rounded-full bg-amber-400" />
                      ) : (
                        <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      )}
                    </div>
                    <div className="mt-2">
                      <p className="font-semibold text-xs truncate text-white">{route.name}</p>
                      <p className="text-[10px] text-slate-400 truncate mt-0.5">{route.capitalOrHub}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Radar Canvas & Waypoint Inspector */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl relative">
                <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-1.5">
                      <span className="w-3 h-3 rounded-full bg-rose-500 animate-pulse" />
                      <span className="text-xs font-bold text-white tracking-wider font-mono">
                        LIVE STREAM RADAR
                      </span>
                    </div>
                    <span className="text-slate-500 text-xs">|</span>
                    <span className="text-xs text-sky-400 font-mono font-medium">
                      {selectedRoute.routeTitle}
                    </span>
                  </div>

                  <div className="flex items-center space-x-1 bg-slate-900 p-1 rounded-lg border border-slate-800">
                    <button
                      onClick={() => setStreamMode('doppler')}
                      className={`px-2.5 py-1 rounded text-[11px] font-medium transition-all ${
                        streamMode === 'doppler'
                          ? 'bg-sky-500 text-slate-950 font-bold'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Doppler
                    </button>
                    <button
                      onClick={() => setStreamMode('thermal')}
                      className={`px-2.5 py-1 rounded text-[11px] font-medium transition-all ${
                        streamMode === 'thermal'
                          ? 'bg-purple-500 text-white font-bold'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Thermal
                    </button>
                    <button
                      onClick={() => setStreamMode('sonar')}
                      className={`px-2.5 py-1 rounded text-[11px] font-medium transition-all ${
                        streamMode === 'sonar'
                          ? 'bg-teal-500 text-slate-950 font-bold'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Swell Sonar
                    </button>
                  </div>
                </div>

                <div className="relative bg-slate-950 h-[480px] w-full overflow-hidden flex items-center justify-center border-b border-slate-800">
                  <div
                    className="absolute inset-0 opacity-20 pointer-events-none"
                    style={{
                      backgroundImage:
                        'radial-gradient(circle, #38bdf8 1px, transparent 1px), linear-gradient(to right, #1e293b 1px, transparent 1px), linear-gradient(to bottom, #1e293b 1px, transparent 1px)',
                      backgroundSize: '40px 40px, 40px 40px, 40px 40px'
                    }}
                  />

                  <div className="absolute w-[450px] h-[450px] rounded-full border border-sky-500/20 pointer-events-none" />
                  <div className="absolute w-[300px] h-[300px] rounded-full border border-sky-500/30 pointer-events-none" />
                  <div className="absolute w-[150px] h-[150px] rounded-full border border-sky-500/40 pointer-events-none" />

                  {isPlaying && streamMode === 'doppler' && (
                    <div
                      className="absolute w-[480px] h-[480px] rounded-full pointer-events-none transition-transform"
                      style={{
                        transform: `rotate(${sweepAngle}deg)`,
                        background:
                          'conic-gradient(from 0deg, transparent 0deg, transparent 300deg, rgba(56, 189, 248, 0.25) 360deg)'
                      }}
                    />
                  )}

                  <svg className="w-full h-full absolute inset-0 z-10" viewBox="0 0 1000 550">
                    <defs>
                      <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
                        <stop offset="50%" stopColor="#2dd4bf" stopOpacity="0.9" />
                        <stop offset="100%" stopColor="#818cf8" stopOpacity="0.8" />
                      </linearGradient>

                      <filter id="glow">
                        <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                        <feMerge>
                          <feMergeNode in="coloredBlur" />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </filter>
                    </defs>

                    {pathString && (
                      <path
                        d={pathString}
                        fill="none"
                        stroke="url(#routeGradient)"
                        strokeWidth="4"
                        strokeDasharray="8 6"
                        filter="url(#glow)"
                        className="opacity-90"
                      />
                    )}

                    {points.map((pt) => {
                      const isSelected = pt.id === selectedWaypointId;
                      const isAlert = pt.status === 'Alert' || pt.status === 'Critical';
                      const isAdvisory = pt.status === 'Advisory';

                      return (
                        <g
                          key={pt.id}
                          transform={`translate(${pt.x}, ${pt.y})`}
                          className="cursor-pointer group"
                          onClick={() => setSelectedWaypointId(pt.id)}
                        >
                          <circle
                            r={isSelected ? '22' : '16'}
                            className={`animate-ping opacity-30 ${
                              isAlert ? 'fill-rose-500' : isAdvisory ? 'fill-amber-400' : 'fill-sky-400'
                            }`}
                          />

                          <circle
                            r={isSelected ? '14' : '10'}
                            className={`transition-all ${
                              isSelected
                                ? 'fill-slate-900 stroke-sky-400 stroke-[3]'
                                : isAlert
                                ? 'fill-slate-900 stroke-rose-500 stroke-2'
                                : isAdvisory
                                ? 'fill-slate-900 stroke-amber-400 stroke-2'
                                : 'fill-slate-900 stroke-emerald-400 stroke-2'
                            }`}
                          />

                          <circle
                            r="4"
                            className={
                              isAlert ? 'fill-rose-500' : isAdvisory ? 'fill-amber-400' : 'fill-sky-400'
                            }
                          />

                          <g transform="translate(0, -22)">
                            <rect
                              x="-60"
                              y="-20"
                              width="120"
                              height="22"
                              rx="6"
                              className={`${
                                isSelected ? 'fill-sky-950 stroke-sky-400' : 'fill-slate-900/90 stroke-slate-700'
                              } stroke`}
                            />
                            <text x="0" y="-6" textAnchor="middle" className="fill-white text-[10px] font-semibold">
                              {pt.name.length > 16 ? `${pt.name.substring(0, 14)}...` : pt.name}
                            </text>
                          </g>

                          <g transform="translate(0, 20)">
                            <rect
                              x="-45"
                              y="0"
                              width="90"
                              height="18"
                              rx="4"
                              className="fill-slate-950/80 stroke-slate-800 stroke"
                            />
                            <text x="0" y="12" textAnchor="middle" className="fill-sky-300 text-[9px] font-mono">
                              {pt.tempC}°C • {pt.waveHeightM ? `${pt.waveHeightM}m` : `${pt.windKmH}km/h`}
                            </text>
                          </g>
                        </g>
                      );
                    })}
                  </svg>

                  <div className="absolute bottom-3 left-3 bg-slate-900/90 backdrop-blur-md border border-slate-800 p-3 rounded-xl text-xs font-mono space-y-1 z-20 text-slate-300">
                    <div className="flex items-center space-x-2 text-white font-bold">
                      <Activity className="w-3.5 h-3.5 text-sky-400" />
                      <span>DOPPLER SIGNAL: {selectedRoute.dopplerFrequency}</span>
                    </div>
                    <div>REFLECTIVITY: <span className="text-amber-400 font-bold">{selectedRoute.radarReflectivityDbz} dBZ</span></div>
                    <div>WAYPOINTS ACTIVE: <span className="text-emerald-400">{selectedRoute.waypoints.length} Radar Nodes</span></div>
                  </div>
                </div>

                <div className="bg-slate-950 p-4 border-t border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800 flex items-center space-x-2">
                    <Compass className="w-4 h-4 text-sky-400" />
                    <div>
                      <p className="text-slate-400 text-[10px]">ROUTE CODE</p>
                      <p className="font-semibold text-white font-mono">{selectedRoute.routeCode}</p>
                    </div>
                  </div>

                  <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800 flex items-center space-x-2">
                    <Thermometer className="w-4 h-4 text-amber-400" />
                    <div>
                      <p className="text-slate-400 text-[10px]">AVG ROUTE TEMP</p>
                      <p className="font-semibold text-white">
                        {Math.round(
                          selectedRoute.waypoints.reduce((acc, w) => acc + w.tempC, 0) /
                            selectedRoute.waypoints.length
                        )}
                        °C
                      </p>
                    </div>
                  </div>

                  <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800 flex items-center space-x-2">
                    <Waves className="w-4 h-4 text-teal-400" />
                    <div>
                      <p className="text-slate-400 text-[10px]">MAX WAVE SWELL</p>
                      <p className="font-semibold text-white">
                        {Math.max(...selectedRoute.waypoints.map((w) => w.waveHeightM || 0))} m
                      </p>
                    </div>
                  </div>

                  <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800 flex items-center space-x-2">
                    <Wind className="w-4 h-4 text-indigo-400" />
                    <div>
                      <p className="text-slate-400 text-[10px]">MAX WIND SPEED</p>
                      <p className="font-semibold text-white">
                        {Math.max(...selectedRoute.waypoints.map((w) => w.windKmH))} km/h
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* AI Route Analysis */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="p-1.5 bg-purple-500/20 text-purple-300 rounded-lg border border-purple-500/30">
                      <Bot className="w-4 h-4" />
                    </div>
                    <h3 className="font-semibold text-sm text-white">
                      AI Live Stream Route Risk & Climate Scan
                    </h3>
                  </div>

                  <button
                    onClick={handleRunAiAnalysis}
                    disabled={isAnalyzing}
                    className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-medium text-xs flex items-center space-x-1.5 transition-all shadow-md shadow-purple-600/20 disabled:opacity-50"
                  >
                    {isAnalyzing ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>Analyzing...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Run AI Route Analysis</span>
                      </>
                    )}
                  </button>
                </div>

                {aiAnalysis ? (
                  <div className="bg-slate-950 p-4 rounded-xl border border-purple-500/30 text-xs text-slate-300 space-y-2 whitespace-pre-line leading-relaxed font-sans">
                    {aiAnalysis}
                  </div>
                ) : (
                  <p className="text-xs text-slate-400">
                    Click above to generate an intelligent AI analysis of monsoon risks, ocean wave hazards, and micro-climate advisories along the selected {selectedRoute.name} route map.
                  </p>
                )}
              </div>
            </div>

            {/* Right Inspector & Logs */}
            <div className="space-y-6">
              {selectedWaypoint && (
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-5 h-5 text-sky-400" />
                      <div>
                        <h3 className="font-bold text-white text-base">{selectedWaypoint.name}</h3>
                        <p className="text-slate-400 text-xs font-mono">{selectedWaypoint.code} • {selectedWaypoint.type}</p>
                      </div>
                    </div>

                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                        selectedWaypoint.status === 'Alert' || selectedWaypoint.status === 'Critical'
                          ? 'bg-rose-500/20 text-rose-300 border-rose-500/30'
                          : selectedWaypoint.status === 'Advisory'
                          ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                          : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                      }`}
                    >
                      {selectedWaypoint.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
                      <div className="flex items-center space-x-1.5 text-slate-400 text-xs">
                        <Thermometer className="w-3.5 h-3.5 text-amber-400" />
                        <span>Temperature</span>
                      </div>
                      <p className="text-xl font-bold text-white">{selectedWaypoint.tempC}°C</p>
                    </div>

                    <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
                      <div className="flex items-center space-x-1.5 text-slate-400 text-xs">
                        <Wind className="w-3.5 h-3.5 text-indigo-400" />
                        <span>Wind Velocity</span>
                      </div>
                      <p className="text-xl font-bold text-white">{selectedWaypoint.windKmH} km/h</p>
                    </div>
                  </div>

                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1 text-xs">
                    <p className="text-slate-400 font-semibold flex items-center space-x-1">
                      <Info className="w-3.5 h-3.5 text-sky-400" />
                      <span>Meteorological Note:</span>
                    </p>
                    <p className="text-slate-300 leading-relaxed">{selectedWaypoint.note}</p>
                  </div>
                </div>
              )}

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-xl">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center space-x-2">
                    <Radio className="w-4 h-4 text-rose-500 animate-pulse" />
                    <h3 className="font-bold text-white text-sm">Real-time Telemetry Stream Log</h3>
                  </div>
                </div>

                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 h-64 overflow-y-auto space-y-2 font-mono text-[11px] text-slate-300">
                  {liveLogs.map((log, idx) => (
                    <div key={idx} className="p-2 rounded bg-slate-900/60 border border-slate-800 leading-relaxed">
                      {log}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VHF Radio Contact Simulation Modal */}
      {vhfModalVessel && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-2xl text-white">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-teal-500/20 text-teal-300 rounded-xl border border-teal-500/30">
                  <Phone className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-white">VHF Maritime Radio Transmission</h3>
                  <p className="text-xs text-teal-400 font-mono">CH {vhfModalVessel.vhfChannel} • Marine DSC Bridge Call</p>
                </div>
              </div>

              <button
                onClick={() => setVhfModalVessel(null)}
                className="p-1 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 text-xs font-mono">
              <div className="flex justify-between text-slate-400">
                <span>TARGET VESSEL:</span>
                <span className="text-white font-bold">{vhfModalVessel.name}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>MMSI IDENTIFIER:</span>
                <span className="text-teal-300">{vhfModalVessel.mmsi}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>CALL SIGN:</span>
                <span className="text-amber-300">{vhfModalVessel.callSign}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>POSITION:</span>
                <span className="text-white">{vhfModalVessel.lat.toFixed(4)}°N, {vhfModalVessel.lng.toFixed(4)}°E</span>
              </div>
            </div>

            {vhfMessageSent ? (
              <div className="bg-emerald-500/20 border border-emerald-500/40 p-4 rounded-xl text-center space-y-2">
                <p className="text-emerald-300 font-bold text-sm">VHF DSC Advisory Broadcast Transmitted!</p>
                <p className="text-xs text-slate-300">
                  Bridge operator on <strong className="text-white">{vhfModalVessel.name}</strong> acknowledged receipt on VHF Channel {vhfModalVessel.vhfChannel}.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                <label className="text-xs text-slate-300 font-medium block">
                  Select Pre-formatted Marine Radio Advisory:
                </label>
                <select className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-teal-500">
                  <option>Securité: Request channel clearance for harbor entry</option>
                  <option>Warning: CPA hazard detected below 0.5 NM buffer</option>
                  <option>Port Control: Confirm pilot boarding time and berth status</option>
                  <option>Mayday / Emergency: Priority Search and Rescue coordination</option>
                </select>

                <button
                  onClick={() => setVhfMessageSent(true)}
                  className="w-full py-3 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-slate-950 font-black rounded-xl text-xs transition-all shadow-lg shadow-teal-500/20"
                >
                  TRANSMIT VHF RADIO ADVISORY NOW
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
