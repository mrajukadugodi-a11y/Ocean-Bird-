import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import {
  MapPin,
  Search,
  Bookmark,
  BookmarkCheck,
  Mail,
  Building2,
  Globe,
  Navigation,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  RotateCcw
} from 'lucide-react';
import { OceanMiningInstitute } from '../data/oceanMiningData';

interface GlobalInstitutesMapProps {
  institutes: OceanMiningInstitute[];
  onToggleBookmark: (instId: string) => void;
  onOpenInquiry: (inst: OceanMiningInstitute) => void;
  onSelectDetails: (inst: OceanMiningInstitute) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  regionFilter: string;
  setRegionFilter: (r: string) => void;
  onlyBookmarked: boolean;
  setOnlyBookmarked: (b: boolean) => void;
}

export const GlobalInstitutesMap: React.FC<GlobalInstitutesMapProps> = ({
  institutes,
  onToggleBookmark,
  onOpenInquiry,
  onSelectDetails,
  searchQuery,
  setSearchQuery,
  regionFilter,
  setRegionFilter,
  onlyBookmarked,
  setOnlyBookmarked
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersGroupRef = useRef<L.LayerGroup | null>(null);
  const [activeInstituteId, setActiveInstituteId] = useState<string | null>(null);

  // Region fly-to coordinates
  const REGION_BOUNDS: Record<string, { center: [number, number]; zoom: number }> = {
    India: { center: [19.0, 79.0], zoom: 5 },
    Europe: { center: [54.5, 12.0], zoom: 4 },
    'North America': { center: [37.5, -96.0], zoom: 4 },
    'Asia-Pacific': { center: [20.0, 125.0], zoom: 4 },
    WORLD: { center: [20.0, 15.0], zoom: 2 }
  };

  // Color helper by region
  const getRegionColor = (region: string) => {
    switch (region) {
      case 'India':
        return '#f59e0b'; // Amber
      case 'Europe':
        return '#10b981'; // Emerald
      case 'North America':
        return '#6366f1'; // Indigo
      case 'Asia-Pacific':
        return '#06b6d4'; // Cyan
      default:
        return '#38bdf8'; // Sky blue
    }
  };

  // Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [20.0, 15.0],
        zoom: 2,
        zoomControl: false,
        attributionControl: false
      });

      // Add dark-themed tile layer (CartoDB Dark Matter)
      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        maxZoom: 18,
        subdomains: 'abcd'
      }).addTo(map);

      // Add custom zoom control in bottom right
      L.control.zoom({ position: 'bottomright' }).addTo(map);

      markersGroupRef.current = L.layerGroup().addTo(map);
      mapInstanceRef.current = map;
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update Markers whenever institutes or search/filters change
  useEffect(() => {
    const map = mapInstanceRef.current;
    const markersGroup = markersGroupRef.current;
    if (!map || !markersGroup) return;

    markersGroup.clearLayers();

    // Filter institutes
    const filtered = institutes.filter((inst) => {
      const matchesRegion = regionFilter === 'ALL' || inst.region === regionFilter;
      const matchesSearch =
        searchQuery === '' ||
        inst.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inst.shortName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inst.cityState.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inst.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inst.fullAddress.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inst.specializedLabsAndFacilities.some((lab) => lab.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesBookmark = !onlyBookmarked || inst.isBookmarked;
      return matchesRegion && matchesSearch && matchesBookmark;
    });

    filtered.forEach((inst) => {
      const color = getRegionColor(inst.region);
      const isIndia = inst.country === 'India';

      // DivIcon HTML
      const customHtml = `
        <div style="
          background-color: ${color};
          width: ${inst.id === activeInstituteId ? '28px' : '22px'};
          height: ${inst.id === activeInstituteId ? '28px' : '22px'};
          border-radius: 50%;
          border: 3px solid #0f172a;
          box-shadow: 0 0 15px ${color}80, 0 4px 8px rgba(0,0,0,0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
        ">
          <div style="
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background-color: #0f172a;
          "></div>
        </div>
      `;

      const customIcon = L.divIcon({
        html: customHtml,
        className: 'custom-map-marker',
        iconSize: [28, 28],
        iconAnchor: [14, 14],
        popupAnchor: [0, -14]
      });

      const marker = L.marker([inst.coordinates.lat, inst.coordinates.lng], { icon: customIcon });

      // Popup content
      const popupContent = document.createElement('div');
      popupContent.className = 'p-1 font-sans text-xs space-y-2';

      popupContent.innerHTML = `
        <div style="display:flex; align-items:center; justify-between; gap:6px; border-bottom:1px solid #334155; padding-bottom:6px;">
          <span style="font-size:10px; font-weight:800; text-transform:uppercase; color:${color}; border:1px solid ${color}60; padding:2px 6px; border-radius:6px; background:${color}15;">
            ${isIndia ? '🇮🇳 ' : ''}${inst.region}
          </span>
          <span style="font-size:10px; color:#94a3b8; font-weight:700;">Estd. ${inst.establishedYear}</span>
        </div>

        <div>
          <h4 style="font-size:13px; font-weight:900; color:#f8fafc; margin:2px 0;">${inst.name}</h4>
          <p style="font-size:10px; font-weight:700; color:${color}; margin:0;">${inst.rankingOrReputation}</p>
        </div>

        <div style="background:#020617; padding:8px; border-radius:8px; border:1px solid #1e293b;">
          <div style="font-size:11px; font-weight:700; color:#cbd5e1; display:flex; align-items:center; gap:4px;">
            <span>📍 ${inst.cityState}, ${inst.country}</span>
          </div>
          <p style="font-size:10px; color:#94a3b8; margin-top:3px; line-height:1.3;">${inst.fullAddress}</p>
        </div>

        <div style="font-size:10px; color:#cbd5e1;">
          <strong style="color:#f8fafc;">Key Facility:</strong> ${inst.specializedLabsAndFacilities[0] || 'Hyperbaric Testing'}
        </div>

        <div style="display:flex; items-center; justify-content:space-between; gap:6px; padding-top:6px; border-top:1px solid #1e293b;">
          <button id="btn-details-${inst.id}" style="background:#1e293b; color:#38bdf8; border:1px solid #334155; font-size:10px; font-weight:800; padding:4px 8px; border-radius:6px; cursor:pointer;">
            Details
          </button>
          <button id="btn-inquire-${inst.id}" style="background:${color}; color:#020617; border:none; font-size:10px; font-weight:900; padding:4px 10px; border-radius:6px; cursor:pointer;">
            Inquire Now
          </button>
        </div>
      `;

      marker.bindPopup(popupContent, { maxWidth: 280 });

      marker.on('click', () => {
        setActiveInstituteId(inst.id);
      });

      marker.on('popupopen', () => {
        // Attach click listeners to popup buttons
        const detailsBtn = popupContent.querySelector(`#btn-details-${inst.id}`);
        if (detailsBtn) {
          detailsBtn.addEventListener('click', () => {
            onSelectDetails(inst);
          });
        }

        const inquireBtn = popupContent.querySelector(`#btn-inquire-${inst.id}`);
        if (inquireBtn) {
          inquireBtn.addEventListener('click', () => {
            onOpenInquiry(inst);
          });
        }
      });

      markersGroup.addLayer(marker);
    });
  }, [institutes, regionFilter, searchQuery, onlyBookmarked, activeInstituteId]);

  // Fly to region helper
  const handleFlyToRegion = (regionKey: string) => {
    const config = REGION_BOUNDS[regionKey] || REGION_BOUNDS['WORLD'];
    setRegionFilter(regionKey === 'WORLD' ? 'ALL' : regionKey);
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo(config.center, config.zoom, { duration: 1.5 });
    }
  };

  return (
    <div className="space-y-4">
      {/* Map Control Toolbar */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          {/* Map Search Bar */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Live Map Search: institute name, city, address, or facility (e.g. 'NIOT', 'Chennai', 'Delft')..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white focus:outline-none focus:border-teal-500 font-sans"
            />
          </div>

          {/* Quick Region Fly-To Buttons */}
          <div className="flex flex-wrap items-center gap-1.5 shrink-0">
            <span className="text-[11px] font-bold text-slate-400 mr-1 flex items-center space-x-1">
              <Navigation className="w-3.5 h-3.5 text-teal-400" />
              <span>Jump To:</span>
            </span>

            <button
              onClick={() => handleFlyToRegion('India')}
              className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                regionFilter === 'India'
                  ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md'
                  : 'bg-slate-950 text-amber-300 border-amber-500/40 hover:bg-slate-800'
              }`}
            >
              🇮🇳 India Focus
            </button>

            <button
              onClick={() => handleFlyToRegion('Europe')}
              className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                regionFilter === 'Europe'
                  ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-md'
                  : 'bg-slate-950 text-emerald-300 border-emerald-500/40 hover:bg-slate-800'
              }`}
            >
              🇪🇺 Europe Focus
            </button>

            <button
              onClick={() => handleFlyToRegion('North America')}
              className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                regionFilter === 'North America'
                  ? 'bg-indigo-500 text-slate-950 border-indigo-400 shadow-md'
                  : 'bg-slate-950 text-indigo-300 border-indigo-500/40 hover:bg-slate-800'
              }`}
            >
              🇺🇸 N. America
            </button>

            <button
              onClick={() => handleFlyToRegion('Asia-Pacific')}
              className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                regionFilter === 'Asia-Pacific'
                  ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-md'
                  : 'bg-slate-950 text-cyan-300 border-cyan-500/40 hover:bg-slate-800'
              }`}
            >
              🌏 Asia-Pacific
            </button>

            <button
              onClick={() => handleFlyToRegion('WORLD')}
              className="px-2.5 py-1.5 rounded-xl text-xs font-bold bg-slate-950 text-slate-300 border border-slate-800 hover:text-white flex items-center space-x-1"
            >
              <RotateCcw className="w-3 h-3 text-slate-400" />
              <span>World View</span>
            </button>

            <button
              onClick={() => setOnlyBookmarked(!onlyBookmarked)}
              className={`px-2.5 py-1.5 rounded-xl text-xs font-bold border transition-all flex items-center space-x-1 ${
                onlyBookmarked
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/50'
                  : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
              }`}
            >
              {onlyBookmarked ? <BookmarkCheck className="w-3.5 h-3.5 text-amber-400" /> : <Bookmark className="w-3.5 h-3.5" />}
              <span>Bookmarked</span>
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Leaflet Map Render Canvas */}
      <div className="relative rounded-3xl border border-slate-800 overflow-hidden shadow-2xl bg-slate-950">
        <div ref={mapContainerRef} className="w-full h-[520px] z-0" />

        {/* Floating Map Legend Overlay */}
        <div className="absolute top-4 left-4 z-[400] p-3 rounded-2xl bg-slate-950/90 backdrop-blur-md border border-slate-800 text-[11px] text-slate-300 space-y-1.5 shadow-xl hidden sm:block">
          <span className="font-extrabold text-white text-[10px] uppercase tracking-wider block border-b border-slate-800 pb-1">
            Global Location Marker Legend
          </span>
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shadow-sm shadow-amber-500/50 inline-block" />
            <span className="font-bold text-amber-300">India Institutes (NIOT, IITs, NIO)</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/50 inline-block" />
            <span>Europe (TU Delft, NTNU, GEOMAR)</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 shadow-sm shadow-indigo-500/50 inline-block" />
            <span>North America (Colorado Mines, TAMU)</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 shadow-sm shadow-cyan-500/50 inline-block" />
            <span>Asia-Pacific (UTokyo, NUS)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
