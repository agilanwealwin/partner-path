import React, { useState, useCallback, useRef, useMemo, memo } from 'react';
import {
    Search, Plus, Minus, Crosshair, ChevronLeft,
    Filter, Activity, Monitor, SignalHigh, Rocket,
    ArrowRight, Globe, Info, Send, CheckCircle2, X,
    Map as MapIcon, Database, Zap, Clock, User,
    Table2, LayoutGrid, Download, ExternalLink, ShieldCheck
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
    ComposableMap,
    Geographies,
    Geography,
    ZoomableGroup
} from 'react-simple-maps';
import { Button } from '@/components/ui/button';
import { territories, type Territory, statusConfig, riskConfig } from '@/data/mockData';
import { useOnboarding } from '@/hooks/use-onboarding';
import { toast } from 'sonner';
import TerritoryRequestModal from '@/components/TerritoryRequestModal';

const WORLD_GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';
const INDIA_GEO_URL = '/india-states-accurate.geojson';

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

const MapTooltip = memo(({
    visible,
    pos,
    stateName,
    countryName,
    data
}: {
    visible: boolean,
    pos: { x: number, y: number },
    stateName: string | null,
    countryName: string | null,
    data: typeof indiaStateData[string] | null
}) => {
    if (!visible) return null;

    return (
        <div
            className="absolute z-30 pointer-events-none transition-transform duration-75 ease-out"
            style={{ left: pos.x, top: pos.y, transform: 'translate(0, -100%)' }}
        >
            <div className="bg-white/95 backdrop-blur-md rounded-xl shadow-2xl border border-gray-200 p-4 min-w-[220px] animate-in fade-in duration-150">
                {stateName && data ? (
                    <>
                        <h4 className="font-display font-bold text-sm text-gray-900 mb-3">{stateName}</h4>
                        <div className="space-y-2">
                            <div className="flex justify-between text-[11px]">
                                <span className="text-gray-500 font-medium">Total Territories</span>
                                <span className="font-bold text-gray-900">{data.territories}</span>
                            </div>
                            <div className="flex justify-between text-[11px]">
                                <span className="text-emerald-600 flex items-center gap-1.5 font-medium">
                                    <span className="w-2 h-2 rounded-sm bg-emerald-500 inline-block" /> Available
                                </span>
                                <span className="font-bold text-gray-900">{data.available}</span>
                            </div>
                            <div className="flex justify-between text-[11px]">
                                <span className="text-amber-600 flex items-center gap-1.5 font-medium">
                                    <span className="w-2 h-2 rounded-sm bg-amber-500 inline-block" /> Reserved
                                </span>
                                <span className="font-bold text-gray-900">{data.reserved}</span>
                            </div>
                            <div className="pt-2 border-t border-gray-100 flex justify-between text-[11px]">
                                <span className="text-gray-500 font-medium">MW Potential</span>
                                <span className="font-bold text-primary">{data.mw.toLocaleString()} MW</span>
                            </div>
                        </div>
                    </>
                ) : countryName ? (
                    <p className="text-[11px] font-semibold text-gray-400 py-1">Coming Soon: {countryName}</p>
                ) : null}
            </div>
        </div>
    );
});

interface GeographyProps {
    geo: any;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
    onClick?: () => void;
    fill: string;
    isInteractive?: boolean;
}

const MemoizedGeography = memo(({
    geo,
    onMouseEnter,
    onMouseLeave,
    onClick,
    fill,
    isInteractive = true
}: GeographyProps) => {
    return (
        <Geography
            geography={geo}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onClick={onClick}
            className={cn(
                "transition-all duration-300 outline-none",
                isInteractive ? "cursor-pointer hover:opacity-80 active:opacity-100" : "cursor-default"
            )}
            style={{
                default: { fill, stroke: isInteractive ? 'hsl(253 91% 65%)' : '#ffffff', strokeWidth: 0.2 },
                hover: { fill: isInteractive ? 'hsl(253 91% 65%)' : fill, stroke: isInteractive ? '#8b5cf6' : '#ffffff', strokeWidth: isInteractive ? 0.5 : 0.2 },
                pressed: { fill: isInteractive ? 'hsl(253 91% 55%)' : fill, outline: 'none' },
            }}
        />
    );
}, (prev, next) => {
    return prev.fill === next.fill && prev.geo.rsmKey === next.geo.rsmKey;
});

export default function TerritoryExplorerPage() {
    const [viewMode, setViewMode] = useState<'map' | 'registry'>('map');
    const [hoveredState, setHoveredState] = useState<string | null>(null);
    const [selectedState, setSelectedState] = useState<string | null>(null);
    const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
    const [statusFilter, setStatusFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [center, setCenter] = useState<[number, number]>([82, 22]);
    const [requestTerritory, setRequestTerritory] = useState<Territory | null>(null);
    const mapContainerRef = useRef<HTMLDivElement>(null);

    const lastUpdate = useRef(0);
    const handleMouseMove = useCallback((e: React.MouseEvent) => {
        const now = Date.now();
        if (now - lastUpdate.current < 20) return;
        lastUpdate.current = now;

        if (mapContainerRef.current) {
            const rect = mapContainerRef.current.getBoundingClientRect();
            setTooltipPos({ x: e.clientX - rect.left + 16, y: e.clientY - rect.top - 10 });
        }
    }, []);

    const resolveStateName = useCallback((geoProperties: Record<string, unknown>) => {
        const rawName = String(
            geoProperties.st_nm ?? geoProperties.NAME_1 ?? geoProperties.name ?? ''
        ).trim();
        return nameMap[rawName] || rawName;
    }, []);

    const getIndiaStateColor = useCallback((geoProperties: Record<string, unknown>) => {
        const stateName = resolveStateName(geoProperties);
        const data = indiaStateData[stateName];
        if (!data) return 'hsl(220 60% 75% / 0.3)';

        if (selectedState === stateName) return 'hsl(253 91% 65% / 0.4)';

        const ratio = data.available / data.territories;
        if (ratio > 0.6) return 'hsl(220 60% 75% / 0.7)';
        if (ratio > 0.3) return 'hsl(220 60% 75% / 0.5)';
        return 'hsl(220 60% 75% / 0.35)';
    }, [resolveStateName, selectedState]);

    const handleZoomIn = useCallback(() => setZoom(z => Math.min(8, z * 1.5)), []);
    const handleZoomOut = useCallback(() => setZoom(z => Math.max(1, z / 1.5)), []);
    const handleReset = useCallback(() => { setZoom(1); setCenter([82, 22]); }, []);

    const stateData = useMemo(() => hoveredState ? indiaStateData[hoveredState] : (selectedState ? indiaStateData[selectedState] : null), [hoveredState, selectedState]);
    const territoriesInState = useMemo(() => {
        if (!selectedState) return [];
        return territories.filter(t => t.state === selectedState);
    }, [selectedState]);

    const filteredTerritories = useMemo(() => {
        const base = viewMode === 'registry' ? territories : territoriesInState;
        return base.filter(t => {
            if (statusFilter !== 'all' && t.status !== statusFilter) return false;
            if (searchQuery && !t.name.toLowerCase().includes(searchQuery.toLowerCase()) && !t.id.toLowerCase().includes(searchQuery.toLowerCase()) && !t.state.toLowerCase().includes(searchQuery.toLowerCase())) return false;
            return true;
        });
    }, [viewMode, territoriesInState, statusFilter, searchQuery]);

    const indiaGeographies = useMemo(() => (
        <Geographies geography={INDIA_GEO_URL}>
            {({ geographies }) =>
                geographies.map((geo) => {
                    const stateName = resolveStateName(geo.properties as Record<string, unknown>);
                    const stateCode = String(
                        (geo.properties as Record<string, unknown>).state_code ??
                        (geo.properties as Record<string, unknown>).id ??
                        geo.rsmKey
                    );
                    const fill = getIndiaStateColor(geo.properties as Record<string, unknown>);
                    return (
                        <MemoizedGeography
                            key={`${stateCode}-${geo.rsmKey}`}
                            geo={geo}
                            onMouseEnter={() => { setHoveredState(stateName); setHoveredCountry(null); }}
                            onMouseLeave={() => setHoveredState(null)}
                            onClick={() => {
                                setSelectedState(stateName);
                                setRequestTerritory(null);
                            }}
                            fill={fill}
                        />
                    );
                })
            }
        </Geographies>
    ), [resolveStateName, getIndiaStateColor]);

    return (
        <div className="h-[calc(100vh-64px)] flex flex-col bg-background">
            {/* Page Header with Tab Switcher */}
            <header className="h-16 shrink-0 border-b border-border bg-surface flex items-center justify-between px-6">
                <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Database size={20} className="text-primary" />
                    </div>
                    <div>
                        <h1 className="text-sm font-bold text-foreground">Infrastructure Registry</h1>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-mono">DeLEN Protocol · v1.4.2</p>
                    </div>
                </div>

                <div className="flex items-center gap-2 p-1 bg-surface-2 border border-border rounded-xl">
                    <button
                        onClick={() => setViewMode('map')}
                        className={cn(
                            "flex items-center gap-2 px-4 py-1.5 rounded-lg text-[11px] font-bold transition-all",
                            viewMode === 'map' ? "bg-surface shadow-md text-primary" : "text-muted-foreground hover:text-foreground"
                        )}
                    >
                        <MapIcon size={14} /> Explorer Map
                    </button>
                    <button
                        onClick={() => setViewMode('registry')}
                        className={cn(
                            "flex items-center gap-2 px-4 py-1.5 rounded-lg text-[11px] font-bold transition-all",
                            viewMode === 'registry' ? "bg-surface shadow-md text-primary" : "text-muted-foreground hover:text-foreground"
                        )}
                    >
                        <Table2 size={14} /> Registry Database
                    </button>
                </div>

                <div className="flex items-center gap-3">
                    <Button variant="outline" size="sm" className="h-9 text-[11px] font-bold">
                        <Download size={14} className="mr-2" /> Export
                    </Button>
                </div>
            </header>

            <div className="flex-1 flex overflow-hidden">
                {/* Conditional Sidebar (only for map mode or for registration) */}
                {viewMode === 'map' ? (
                    <aside className="w-[320px] shrink-0 border-r border-border bg-surface flex flex-col">
                        <div className="p-6 border-b border-border space-y-4">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={14} />
                                <input
                                    value={searchQuery}
                                    onChange={e => setSearchQuery(e.target.value)}
                                    placeholder="Search state or ID..."
                                    className="w-full h-9 bg-surface-2 border border-border rounded-lg pl-9 pr-4 text-xs focus:outline-none focus:ring-1 focus:ring-primary/40 transition-all"
                                />
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6 space-y-6">
                            {(selectedState || (hoveredState && !selectedState)) ? (
                                <div className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-300">
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <div className="flex flex-col">
                                                <p className="text-[10px] font-mono text-primary uppercase tracking-widest leading-none mb-1">
                                                    {selectedState ? 'Exploration Mode' : 'Preview Mode'}
                                                </p>
                                                <h3 className="font-display font-bold text-xl text-foreground">
                                                    {selectedState || hoveredState}
                                                </h3>
                                            </div>
                                            {selectedState && (
                                                <button
                                                    onClick={() => setSelectedState(null)}
                                                    className="p-1.5 rounded-lg hover:bg-surface-2 text-muted-foreground hover:text-foreground transition-all"
                                                >
                                                    <X size={14} />
                                                </button>
                                            )}
                                        </div>

                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="bg-surface-2 p-3 rounded-lg border border-border shadow-sm">
                                                <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">Available</p>
                                                <p className="text-xl font-bold text-emerald-500 mt-1">
                                                    {indiaStateData[selectedState || hoveredState!]?.available || 0}
                                                </p>
                                            </div>
                                            <div className="bg-surface-2 p-3 rounded-lg border border-border shadow-sm">
                                                <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">Potential</p>
                                                <p className="text-xl font-bold text-foreground mt-1">
                                                    {indiaStateData[selectedState || hoveredState!]?.mw || 0} <small className="text-[10px] text-muted-foreground">MW</small>
                                                </p>
                                            </div>
                                        </div>

                                        {!selectedState && (
                                            <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                                                    <Info size={16} className="text-primary" />
                                                </div>
                                                <p className="text-[11px] text-muted-foreground leading-snug">
                                                    Click on <span className="text-primary font-bold">{hoveredState}</span> to view available registration slots and district-wise potential.
                                                </p>
                                            </div>
                                        )}

                                        {selectedState && (
                                            <div className="space-y-2">
                                                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Status Filter</p>
                                                <div className="flex flex-wrap gap-1.5">
                                                    {['all', 'available', 'subscribed', 'reserved'].map(f => (
                                                        <button
                                                            key={f}
                                                            onClick={() => setStatusFilter(f)}
                                                            className={cn(
                                                                "px-2.5 py-1 rounded-full text-[10px] font-bold uppercase transition-all tracking-wide",
                                                                statusFilter === f ? "bg-primary text-primary-foreground" : "bg-surface-3 text-muted-foreground hover:bg-surface-2"
                                                            )}
                                                        >
                                                            {f}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {selectedState && (
                                        <div className="space-y-3 pt-4 border-t border-border">
                                            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">{filteredTerritories.length} Territories Found</p>
                                            {filteredTerritories.map(t => (
                                                <div key={t.id} className="group p-3 rounded-xl bg-surface-2 border border-border hover:border-primary/50 transition-all space-y-3">
                                                    <div className="flex items-start justify-between">
                                                        <div>
                                                            <p className="text-[9px] font-mono text-muted-foreground group-hover:text-primary transition-colors">{t.id}</p>
                                                            <h5 className="text-xs font-bold text-foreground mt-0.5">{t.name}</h5>
                                                        </div>
                                                        <span className={cn("px-1.5 py-0.5 rounded text-[8px] font-black uppercase tracking-tight", statusConfig[t.status].bgClass, statusConfig[t.status].textClass)}>
                                                            {t.status}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center justify-between text-[10px]">
                                                        <span className="text-muted-foreground">{t.mwPotential} MW · {t.adoption} Adoption</span>
                                                        {t.status === 'available' && (
                                                            <Button size="xs" variant="outline" className="h-6 text-[10px]" onClick={() => setRequestTerritory(t)}>Request</Button>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-4 opacity-70 animate-in fade-in duration-500">
                                    <div className="w-16 h-16 rounded-full bg-surface-2 flex items-center justify-center border border-border/50">
                                        <MapIcon size={32} className="text-muted-foreground/40" />
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-xs font-bold text-foreground uppercase tracking-wider">Select a State</p>
                                        <p className="text-[10px] text-muted-foreground leading-relaxed">Hover over the map to preview data or click to explore detailed territory registrations.</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </aside>
                ) : null}

                {/* Main Content Area */}
                <main className="flex-1 relative bg-[#eef2f8] overflow-hidden flex flex-col">
                    {viewMode === 'map' ? (
                        <div ref={mapContainerRef} className="w-full h-full relative" onMouseMove={handleMouseMove}>
                            {/* Map Status Legend Overlay */}
                            <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20 flex gap-5 px-6 py-2.5 bg-white/90 border border-black/5 backdrop-blur-md rounded-full shadow-lg">
                                {statusLegend.map(l => (
                                    <div key={l.label} className="flex items-center gap-2">
                                        <div className={cn("w-2 h-2 rounded-full", l.color)} />
                                        <span className="text-[9px] font-bold text-gray-700 uppercase tracking-widest opacity-70">{l.label}</span>
                                    </div>
                                ))}
                            </div>

                            <MapTooltip
                                visible={!!(hoveredState || hoveredCountry)}
                                pos={tooltipPos}
                                stateName={hoveredState}
                                countryName={hoveredCountry}
                                data={stateData}
                            />

                            <div className="w-full h-full flex items-center justify-center p-8">
                                <ComposableMap
                                    projection="geoMercator"
                                    projectionConfig={{ center: [82, 22], scale: 800 }}
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
                                        <Geographies geography={WORLD_GEO_URL}>
                                            {({ geographies }) =>
                                                geographies.map((geo) => {
                                                    const countryName = geo.properties.name;
                                                    if (countryName === 'India') return null;
                                                    return (
                                                        <MemoizedGeography
                                                            key={geo.rsmKey}
                                                            geo={geo}
                                                            onMouseEnter={() => setHoveredCountry(countryName)}
                                                            onMouseLeave={() => setHoveredCountry(null)}
                                                            fill="#d1d5db"
                                                            isInteractive={false}
                                                        />
                                                    );
                                                })
                                            }
                                        </Geographies>
                                        {indiaGeographies}
                                    </ZoomableGroup>
                                </ComposableMap>
                            </div>

                            {/* Map Controls */}
                            <div className="absolute bottom-6 right-6 z-20 flex flex-col gap-2">
                                <div className="flex flex-col bg-white/90 backdrop-blur-md border border-black/5 rounded-xl overflow-hidden shadow-lg">
                                    <button onClick={handleZoomIn} className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors">
                                        <Plus size={16} />
                                    </button>
                                    <div className="h-px bg-gray-200 mx-2" />
                                    <button onClick={handleZoomOut} className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors">
                                        <Minus size={16} />
                                    </button>
                                </div>
                                <button onClick={handleReset} className="w-10 h-10 rounded-xl bg-white/90 backdrop-blur-md border border-black/5 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors shadow-lg">
                                    <Crosshair size={16} />
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="w-full h-full flex flex-col p-6 animate-in slide-in-from-bottom-4 duration-500 overflow-hidden bg-background">
                            {/* Registry Table Toolbar */}
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-4">
                                    <div className="relative w-72">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={14} />
                                        <input
                                            value={searchQuery}
                                            onChange={e => setSearchQuery(e.target.value)}
                                            placeholder="Search by ID, Name or State..."
                                            className="w-full h-9 bg-surface border border-border rounded-lg pl-9 pr-4 text-[11px] focus:outline-none"
                                        />
                                    </div>
                                    <div className="flex items-center gap-1.5 p-1 bg-surface-2 rounded-lg border border-border">
                                        {['all', 'available', 'subscribed', 'reserved'].map(f => (
                                            <button
                                                key={f}
                                                onClick={() => setStatusFilter(f)}
                                                className={cn(
                                                    "px-3 py-1 rounded-md text-[10px] font-bold uppercase transition-all tracking-wide",
                                                    statusFilter === f ? "bg-surface text-primary shadow-sm" : "text-muted-foreground hover:text-foreground"
                                                )}
                                            >
                                                {f}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className="text-[11px] font-bold text-muted-foreground">
                                    Showing <span className="text-foreground">{filteredTerritories.length}</span> of {territories.length} territories
                                </div>
                            </div>

                            {/* Registry Table Content */}
                            <div className="flex-1 bg-surface border border-border rounded-xl shadow-sm overflow-hidden flex flex-col">
                                <div className="overflow-y-auto flex-1">
                                    <table className="w-full text-left border-collapse">
                                        <thead className="sticky top-0 bg-surface-2 border-b border-border z-10">
                                            <tr className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                                                <th className="px-6 py-4">Territory ID</th>
                                                <th className="px-6 py-4">Information</th>
                                                <th className="px-6 py-4">Status</th>
                                                <th className="px-6 py-4">Protocol Data</th>
                                                <th className="px-6 py-4">Risk Profile</th>
                                                <th className="px-6 py-4 text-right">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-border/50">
                                            {filteredTerritories.map(t => (
                                                <tr key={t.id} className="group hover:bg-surface-2/50 transition-all">
                                                    <td className="px-6 py-4">
                                                        <span className="font-mono text-[10px] font-bold text-muted-foreground group-hover:text-primary transition-colors">#{t.id}</span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex flex-col">
                                                            <span className="text-xs font-bold text-foreground">{t.name}</span>
                                                            <span className="text-[10px] text-muted-foreground flex items-center gap-1"><Globe size={10} /> {t.state}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className={cn("inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-tight", statusConfig[t.status].bgClass, statusConfig[t.status].textClass)}>
                                                            <div className={cn("w-1 h-1 rounded-full", statusConfig[t.status].textClass.replace('text-', 'bg-'))} />
                                                            {t.status}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-6">
                                                            <div>
                                                                <p className="text-[10px] font-bold text-foreground">{t.mwPotential} MW</p>
                                                                <p className="text-[8px] font-bold text-muted-foreground uppercase tracking-widest leading-none mt-0.5">Capacity</p>
                                                            </div>
                                                            <div>
                                                                <p className="text-[10px] font-bold text-foreground">{t.adoption}</p>
                                                                <p className="text-[8px] font-bold text-muted-foreground uppercase tracking-widest leading-none mt-0.5">Adoption</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className={cn("px-2 py-0.5 rounded text-[9px] font-bold uppercase", riskConfig[t.risk].textClass, riskConfig[t.risk].bgClass.replace('bg-', 'bg-opacity-20 bg-'))}>
                                                            {t.risk} Risk
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 text-right">
                                                        {t.status === 'available' ? (
                                                            <Button
                                                                size="sm"
                                                                className="h-8 px-4 text-[10px] font-bold uppercase"
                                                                onClick={() => {
                                                                    setRequestTerritory(t);
                                                                }}
                                                            >
                                                                <Plus size={14} className="mr-1.5" /> Request
                                                            </Button>
                                                        ) : (
                                                            <Button size="sm" variant="ghost" className="h-8 px-4 text-[10px] font-bold uppercase text-muted-foreground" disabled>
                                                                <ShieldCheck size={14} className="mr-1.5" /> Locked
                                                            </Button>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}
                </main>

                {/* Territory Request Modal Overlay */}
                <TerritoryRequestModal
                    open={!!requestTerritory}
                    onClose={() => setRequestTerritory(null)}
                    territory={requestTerritory}
                />
            </div>
        </div>
    );
}
