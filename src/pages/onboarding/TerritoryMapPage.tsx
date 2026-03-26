import React, { useState, useCallback, useRef } from 'react';
import {
  Search, Plus, Minus, Crosshair, ChevronLeft, MapPinned,
  Filter, Activity, Monitor, SignalHigh, Network, Rocket,
  ArrowRight, Maximize2
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup
} from 'react-simple-maps';
const WORLD_GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';
const INDIA_GEO_URL = '/india-states-accurate.geojson';

// Map GeoJSON names to our territory data keys
const nameMap: Record<string, string> = {
  'Jammu and Kashmir': 'Jammu & Kashmir',
  'Orissa': 'Odisha',
  'Uttaranchal': 'Uttarakhand',
  'NCT of Delhi': 'Delhi',
};

const indiaStateData: Record<string, { territories: number; available: number; subscribed: number; reserved: number; allocated: number; mw: number }> = {
  'Jammu & Kashmir': { territories: 20, available: 10, subscribed: 2, reserved: 5, allocated: 3, mw: 700 },
  'Himachal Pradesh': { territories: 12, available: 6, subscribed: 1, reserved: 3, allocated: 2, mw: 500 },
  'Punjab': { territories: 23, available: 12, subscribed: 5, reserved: 3, allocated: 3, mw: 1300 },
  'Uttarakhand': { territories: 13, available: 7, subscribed: 1, reserved: 3, allocated: 2, mw: 600 },
  'Haryana': { territories: 22, available: 10, subscribed: 6, reserved: 4, allocated: 2, mw: 1100 },
  'Rajasthan': { territories: 33, available: 18, subscribed: 5, reserved: 6, allocated: 4, mw: 4200 },
  'Gujarat': { territories: 33, available: 14, subscribed: 10, reserved: 5, allocated: 4, mw: 3800 },
  'Maharashtra': { territories: 36, available: 18, subscribed: 8, reserved: 6, allocated: 4, mw: 3500 },
  'Karnataka': { territories: 31, available: 15, subscribed: 7, reserved: 5, allocated: 4, mw: 3100 },
  'Tamil Nadu': { territories: 38, available: 16, subscribed: 12, reserved: 6, allocated: 4, mw: 3300 },
  'Kerala': { territories: 14, available: 6, subscribed: 4, reserved: 2, allocated: 2, mw: 900 },
  'Andhra Pradesh': { territories: 26, available: 12, subscribed: 6, reserved: 4, allocated: 4, mw: 2800 },
  'Telangana': { territories: 33, available: 15, subscribed: 8, reserved: 6, allocated: 4, mw: 2500 },
  'Madhya Pradesh': { territories: 52, available: 30, subscribed: 7, reserved: 10, allocated: 5, mw: 2900 },
  'Chhattisgarh': { territories: 28, available: 18, subscribed: 3, reserved: 4, allocated: 3, mw: 1400 },
  'Odisha': { territories: 30, available: 18, subscribed: 4, reserved: 5, allocated: 3, mw: 1700 },
  'Uttar Pradesh': { territories: 75, available: 42, subscribed: 10, reserved: 15, allocated: 8, mw: 4500 },
  'Bihar': { territories: 38, available: 22, subscribed: 3, reserved: 8, allocated: 5, mw: 1800 },
  'Jharkhand': { territories: 24, available: 15, subscribed: 2, reserved: 4, allocated: 3, mw: 1200 },
  'West Bengal': { territories: 23, available: 12, subscribed: 5, reserved: 3, allocated: 3, mw: 1500 },
  'Assam': { territories: 35, available: 25, subscribed: 2, reserved: 5, allocated: 3, mw: 800 },
};

const statusLegend = [
  { label: 'Available', color: 'bg-emerald-500', textClass: 'text-emerald-500' },
  { label: 'Subscribed', color: 'bg-primary', textClass: 'text-primary' },
  { label: 'Reserved', color: 'bg-amber-500', textClass: 'text-amber-500' },
  { label: 'Allocated', color: 'bg-destructive', textClass: 'text-destructive' },
];

export default function TerritoryMapPage() {
  const [hoveredState, setHoveredState] = useState<string | null>(null);
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [center, setCenter] = useState<[number, number]>([82, 22]);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (mapContainerRef.current) {
      const rect = mapContainerRef.current.getBoundingClientRect();
      setTooltipPos({ x: e.clientX - rect.left + 16, y: e.clientY - rect.top - 10 });
    }
  }, []);

  // Resolve GeoJSON state label from multiple dataset schemas to our data key
  const resolveStateName = useCallback((geoProperties: Record<string, unknown>) => {
    const rawName = String(
      geoProperties.st_nm ?? geoProperties.NAME_1 ?? geoProperties.name ?? ''
    ).trim();
    return nameMap[rawName] || rawName;
  }, []);

  const getIndiaStateColor = (geoProperties: Record<string, unknown>) => {
    const stateName = resolveStateName(geoProperties);
    const data = indiaStateData[stateName];
    if (!data) return 'hsl(220 60% 75% / 0.3)';
    const isHovered = hoveredState === stateName;
    if (isHovered) return 'hsl(220 70% 55%)';
    const ratio = data.available / data.territories;
    if (ratio > 0.6) return 'hsl(220 60% 75% / 0.7)';
    if (ratio > 0.3) return 'hsl(220 60% 75% / 0.5)';
    return 'hsl(220 60% 75% / 0.35)';
  };

  const handleZoomIn = () => setZoom(z => Math.min(8, z * 1.5));
  const handleZoomOut = () => setZoom(z => Math.max(1, z / 1.5));
  const handleReset = () => { setZoom(1); setCenter([82, 22]); };

  const stateData = hoveredState ? indiaStateData[hoveredState] : null;
  const showTooltip = hoveredState || hoveredCountry;

  return (
    <div className="p-0 h-screen flex flex-col bg-background overflow-hidden relative">
      {/* Header */}
      <div className="relative shrink-0 border-b border-border px-8 py-5 flex items-center justify-between bg-surface">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <Link to="/onboarding/infra-partner/territories" className="h-7 px-2.5 rounded-lg bg-muted border border-border flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-all">
              <ChevronLeft size={12} /> Registry
            </Link>
            <div className="h-3.5 w-px bg-border" />
            <div className="flex items-center gap-2 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[9px] text-emerald-500 font-bold tracking-widest uppercase">
              <Activity size={10} className="animate-pulse" /> Live
            </div>
          </div>
          <h1 className="font-display font-extrabold text-2xl text-foreground tracking-tight">
            Territory Allocation Map — <span className="text-primary">India Districts</span>
          </h1>
          <p className="text-[10px] font-mono tracking-widest text-muted-foreground uppercase">Protocol Infrastructure · Real-time Network View</p>
        </div>
        <div className="flex items-center gap-6 bg-surface-2 border border-border px-5 py-4 rounded-2xl">
          <div className="text-right">
            <p className="text-[8px] font-bold tracking-widest text-muted-foreground uppercase mb-0.5">Capacity</p>
            <p className="font-display font-extrabold text-2xl text-foreground leading-none">18.7 <span className="text-[9px] text-primary opacity-60">GW</span></p>
          </div>
          <div className="h-8 w-px bg-border" />
          <div className="text-right">
            <p className="text-[8px] font-bold tracking-widest text-muted-foreground uppercase mb-0.5">Active Nodes</p>
            <p className="font-display font-extrabold text-2xl text-primary leading-none">12,840</p>
          </div>
        </div>
      </div>

      <div className="flex-1 flex min-h-0">
        {/* Sidebar */}
        <div className="w-[320px] shrink-0 flex flex-col border-r border-border bg-surface p-6 overflow-y-auto">
          <div className="space-y-6">
            {/* Search */}
            <div className="space-y-2">
              <span className="text-[9px] font-bold tracking-widest text-muted-foreground uppercase">Search</span>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={14} />
                <input
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="District or state name..."
                  className="w-full h-10 bg-surface-2 border border-border rounded-xl pl-9 pr-4 text-xs placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary/40 transition-all"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-bold tracking-widest text-muted-foreground uppercase">Filter Territories</span>
                <Filter size={10} className="text-muted-foreground opacity-40" />
              </div>
              <div className="grid gap-1.5">
                {['all', 'available', 'subscribed', 'reserved', 'allocated'].map(s => {
                  const legend = statusLegend.find(l => l.label.toLowerCase() === s);
                  return (
                    <button
                      key={s}
                      onClick={() => setStatusFilter(s)}
                      className={cn(
                        "w-full flex items-center gap-3 px-4 py-2.5 rounded-xl border transition-all text-[10px] font-bold uppercase tracking-widest",
                        statusFilter === s
                          ? 'bg-primary/10 border-primary/30 text-primary'
                          : 'bg-surface-2/50 border-transparent text-muted-foreground hover:bg-surface-2 hover:text-foreground'
                      )}
                    >
                      <div className={cn("w-2 h-2 rounded-full", s === 'all' ? 'bg-foreground' : legend?.color)} />
                      {s === 'all' ? 'All Statuses' : s}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* State Info Card */}
            <div className={cn(
              "p-5 rounded-2xl border transition-all min-h-[160px] flex flex-col justify-center",
              hoveredState ? 'bg-primary/5 border-primary/30' : 'bg-surface-2 border-border'
            )}>
              {hoveredState && stateData ? (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div>
                    <p className="text-[8px] font-mono tracking-widest text-primary uppercase">State Detail</p>
                    <h3 className="font-display font-extrabold text-xl text-foreground">{hoveredState}</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-3 py-3 border-y border-border/30">
                    <div>
                      <p className="text-[8px] font-bold tracking-widest text-muted-foreground uppercase">MW Potential</p>
                      <p className="font-display font-extrabold text-lg text-foreground">{stateData.mw.toLocaleString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[8px] font-bold tracking-widest text-muted-foreground uppercase">Territories</p>
                      <p className="font-display font-extrabold text-lg text-primary">{stateData.territories}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between cursor-pointer group">
                    <span className="text-[9px] font-bold tracking-widest uppercase text-muted-foreground group-hover:text-primary transition-colors">View Details</span>
                    <ArrowRight size={12} className="text-primary group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center text-center gap-3">
                  <Rocket size={24} className="text-primary/40" />
                  <p className="text-[9px] font-bold tracking-widest uppercase text-muted-foreground/50">Hover a state to see details</p>
                </div>
              )}
            </div>

            {/* Network Stats */}
            <div className="grid grid-cols-2 gap-2.5">
              <div className="p-3.5 rounded-xl bg-surface-2 border border-border space-y-1">
                <Monitor size={12} className="text-primary opacity-50" />
                <p className="text-[8px] font-bold tracking-widest text-muted-foreground uppercase">Uptime</p>
                <p className="font-display font-extrabold text-lg text-foreground">99.9%</p>
              </div>
              <div className="p-3.5 rounded-xl bg-surface-2 border border-border space-y-1 text-right">
                <SignalHigh size={12} className="text-emerald-500 opacity-50 ml-auto" />
                <p className="text-[8px] font-bold tracking-widest text-muted-foreground uppercase">Ping</p>
                <p className="font-display font-extrabold text-lg text-foreground">14ms</p>
              </div>
            </div>
          </div>
        </div>

        {/* Map Area */}
        <div
          ref={mapContainerRef}
          className="flex-1 relative overflow-hidden bg-[#e8ecf4]"
          onMouseMove={handleMouseMove}
        >
          {/* Top Legend */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 flex gap-5 px-6 py-2.5 bg-white/90 border border-black/10 backdrop-blur-md rounded-full shadow-lg">
            {statusLegend.map(l => (
              <div key={l.label} className="flex items-center gap-2">
                <div className={cn("w-2.5 h-2.5 rounded-sm", l.color)} />
                <span className="text-[10px] font-semibold text-gray-700">{l.label}</span>
              </div>
            ))}
          </div>

          {/* Zoom Controls */}
          <div className="absolute bottom-6 right-6 z-20 flex flex-col gap-2">
            <div className="flex flex-col bg-white/90 backdrop-blur-md border border-black/10 rounded-xl overflow-hidden shadow-lg">
              <button onClick={handleZoomIn} className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors">
                <Plus size={16} />
              </button>
              <div className="h-px bg-gray-200 mx-2" />
              <button onClick={handleZoomOut} className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors">
                <Minus size={16} />
              </button>
            </div>
            <button onClick={handleReset} className="w-10 h-10 rounded-xl bg-white/90 backdrop-blur-md border border-black/10 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors shadow-lg">
              <Crosshair size={16} />
            </button>
          </div>

          {/* Tooltip */}
          {showTooltip && (
            <div
              className="absolute z-30 pointer-events-none animate-in fade-in duration-150"
              style={{ left: tooltipPos.x, top: tooltipPos.y, transform: 'translate(0, -100%)' }}
            >
              {hoveredState && stateData ? (
                <div className="bg-white rounded-xl shadow-2xl border border-gray-200 p-4 min-w-[220px]">
                  <h4 className="font-display font-bold text-sm text-gray-900 mb-3">{hoveredState}</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-500">Total Territories</span>
                      <span className="font-semibold text-gray-900">{stateData.territories}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-emerald-600 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-sm bg-emerald-500 inline-block" /> Available
                      </span>
                      <span className="font-semibold text-gray-900">{stateData.available}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-amber-600 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-sm bg-amber-500 inline-block" /> Reserved
                      </span>
                      <span className="font-semibold text-gray-900">{stateData.reserved}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-red-600 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-sm bg-red-500 inline-block" /> Allocated
                      </span>
                      <span className="font-semibold text-gray-900">{stateData.allocated}</span>
                    </div>
                    <div className="pt-2 border-t border-gray-100 flex justify-between text-xs">
                      <span className="text-gray-500">MW Potential</span>
                      <span className="font-bold text-primary">{stateData.mw.toLocaleString()} MW</span>
                    </div>
                  </div>
                </div>
              ) : hoveredCountry ? (
                <div className="bg-white rounded-lg shadow-xl border border-gray-200 px-4 py-2.5">
                  <p className="text-xs font-semibold text-gray-400">Coming Soon</p>
                </div>
              ) : null}
            </div>
          )}

          {/* Map */}
          <ComposableMap
            projection="geoMercator"
            projectionConfig={{ center: [82, 22], scale: 140 }}
            width={800}
            height={600}
            className="w-full h-full"
          >
            <ZoomableGroup
              zoom={zoom}
              center={center}
              onMoveEnd={({ coordinates, zoom: z }) => {
                setCenter(coordinates as [number, number]);
                setZoom(z);
              }}
              minZoom={0.8}
              maxZoom={8}
            >
              {/* World countries (grey, non-interactive except tooltip) */}
              <Geographies geography={WORLD_GEO_URL}>
                {({ geographies }) =>
                  geographies.map((geo) => {
                    const countryName = geo.properties.name;
                    const isIndia = countryName === 'India';
                    if (isIndia) return null; // Render India separately with states
                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        onMouseEnter={() => setHoveredCountry(countryName)}
                        onMouseLeave={() => setHoveredCountry(null)}
                        style={{
                          default: {
                            fill: '#d1d5db',
                            stroke: '#ffffff',
                            strokeWidth: 0.5,
                            outline: 'none',
                          },
                          hover: {
                            fill: '#bfc5cf',
                            stroke: '#ffffff',
                            strokeWidth: 0.5,
                            outline: 'none',
                            cursor: 'default',
                          },
                          pressed: { fill: '#d1d5db', outline: 'none' },
                        }}
                      />
                    );
                  })
                }
              </Geographies>

              {/* India states (interactive, blue shades) — accurate boundaries */}
              <Geographies geography={INDIA_GEO_URL}>
                {({ geographies }) =>
                  geographies.map((geo) => {
                    const stateName = resolveStateName(geo.properties as Record<string, unknown>);
                    const stateCode = String(
                      (geo.properties as Record<string, unknown>).state_code ??
                      (geo.properties as Record<string, unknown>).id ??
                      geo.rsmKey
                    );
                    return (
                      <Geography
                        key={`${stateCode}-${geo.rsmKey}`}
                        geography={geo}
                        onMouseEnter={() => { setHoveredState(stateName); setHoveredCountry(null); }}
                        onMouseLeave={() => setHoveredState(null)}
                        style={{
                          default: {
                            fill: getIndiaStateColor(geo.properties as Record<string, unknown>),
                            stroke: '#3b5998',
                            strokeWidth: 0.6,
                            outline: 'none',
                            transition: 'fill 300ms ease',
                          },
                          hover: {
                            fill: 'hsl(220 70% 55%)',
                            stroke: '#1e3a6e',
                            strokeWidth: 1,
                            outline: 'none',
                            cursor: 'pointer',
                          },
                          pressed: {
                            fill: 'hsl(220 70% 45%)',
                            outline: 'none',
                          },
                        }}
                      />
                    );
                  })
                }
              </Geographies>
            </ZoomableGroup>
          </ComposableMap>
        </div>
      </div>
    </div>
  );
}
