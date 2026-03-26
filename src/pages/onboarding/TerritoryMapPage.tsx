import React, { useState, useMemo } from 'react';
import {
  Search, Plus, Minus, Crosshair, ChevronLeft, MapPinned,
  ShieldCheck, Globe2, ArrowRight, Zap, Filter, LayoutDashboard, Rocket,
  Info, BarChart3, Radio, Layers, Maximize2, Activity, Satellite, Monitor,
  Cpu, Network, SignalHigh
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import indiaGeo from "@/data/india-states.json";

// Accurate simulation data for all Indian States & UTs
const indiaStateData: Record<string, { territories: number; available: number; subscribed: number; reserved: number; mw: number; nodes: number }> = {
  'Rajasthan': { territories: 33, available: 20, subscribed: 5, reserved: 8, mw: 4200, nodes: 1240 },
  'Gujarat': { territories: 33, available: 15, subscribed: 10, reserved: 8, mw: 3800, nodes: 1150 },
  'Maharashtra': { territories: 36, available: 22, subscribed: 8, reserved: 6, mw: 3500, nodes: 980 },
  'Karnataka': { territories: 31, available: 18, subscribed: 7, reserved: 6, mw: 3100, nodes: 850 },
  'Tamil Nadu': { territories: 38, available: 20, subscribed: 12, reserved: 6, mw: 3300, nodes: 1100 },
  'Andhra Pradesh': { territories: 26, available: 15, subscribed: 6, reserved: 5, mw: 2800, nodes: 720 },
  'Telangana': { territories: 33, available: 18, subscribed: 8, reserved: 7, mw: 2500, nodes: 680 },
  'Madhya Pradesh': { territories: 52, available: 35, subscribed: 7, reserved: 10, mw: 2900, nodes: 540 },
  'Uttar Pradesh': { territories: 75, available: 50, subscribed: 10, reserved: 15, mw: 4500, nodes: 1400 },
  'Bihar': { territories: 38, available: 25, subscribed: 3, reserved: 10, mw: 1800, nodes: 320 },
  'West Bengal': { territories: 23, available: 15, subscribed: 5, reserved: 3, mw: 1500, nodes: 410 },
  'Odisha': { territories: 30, available: 20, subscribed: 4, reserved: 6, mw: 1700, nodes: 280 },
  'Chhattisgarh': { territories: 28, available: 20, subscribed: 3, reserved: 5, mw: 1400, nodes: 150 },
  'Jharkhand': { territories: 24, available: 18, subscribed: 2, reserved: 4, mw: 1200, nodes: 120 },
  'Haryana': { territories: 22, available: 12, subscribed: 6, reserved: 4, mw: 1100, nodes: 450 },
  'Punjab': { territories: 23, available: 15, subscribed: 5, reserved: 3, mw: 1300, nodes: 500 },
  'Kerala': { territories: 14, available: 8, subscribed: 4, reserved: 2, mw: 900, nodes: 380 },
  'Assam': { territories: 35, available: 30, subscribed: 2, reserved: 3, mw: 800, nodes: 110 },
  'Uttarakhand': { territories: 13, available: 10, subscribed: 1, reserved: 2, mw: 600, nodes: 80 },
  'Himachal Pradesh': { territories: 12, available: 9, subscribed: 1, reserved: 2, mw: 500, nodes: 90 },
  'Jammu & Kashmir': { territories: 20, available: 15, subscribed: 2, reserved: 3, mw: 700, nodes: 140 },
};

const statusLegend = [
  { label: 'Available', color: 'bg-sky-500', dot: 'bg-sky-500', textClass: 'text-sky-500' },
  { label: 'Subscribed', color: 'bg-indigo-500', dot: 'bg-indigo-500', textClass: 'text-indigo-500' },
  { label: 'Reserved', color: 'bg-orange-500', dot: 'bg-orange-500', textClass: 'text-orange-500' },
  { label: 'Allocated', color: 'bg-zinc-500', dot: 'bg-zinc-500', textClass: 'text-zinc-500' },
];

export default function TerritoryMapPage() {
  const [hoveredState, setHoveredState] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const [zoom, setZoom] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const getStateColor = (state: string) => {
    const data = indiaStateData[state];
    if (!data) return 'hsl(var(--surface3))';

    const isHovered = hoveredState === state;

    if (statusFilter !== 'all') {
      const count = statusFilter === 'available' ? data.available : statusFilter === 'subscribed' ? data.subscribed : statusFilter === 'reserved' ? data.reserved : 0;
      if (count === 0) return 'hsl(var(--primary) / 0.02)';
    }

    if (isHovered) return 'hsl(var(--primary) / 0.85)';

    // Density based shades
    if (data.available > 30) return 'hsl(var(--primary) / 0.55)';
    if (data.available > 15) return 'hsl(var(--primary) / 0.35)';
    if (data.available > 5) return 'hsl(var(--primary) / 0.15)';
    return 'hsl(var(--primary) / 0.08)';
  };

  return (
    <div className="p-0 h-screen flex flex-col bg-background overflow-hidden relative theme-transition">
      {/* PERFECT COMPACT UI Header Section */}
      <div className="relative shrink-0 hero-gradient border-b border-border px-8 py-5 flex items-center justify-between overflow-hidden group">
        <div className="absolute inset-0 hero-glow-accent opacity-[0.08]" />

        <div className="relative z-10 space-y-1">
          <div className="flex items-center gap-3">
            <Link to="/onboarding/infra-partner/territories" className="h-7 px-2.5 rounded-lg bg-foreground/5 border border-foreground/10 flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-muted-foreground hover:text-foreground hover:bg-foreground/10 transition-all">
              <ChevronLeft size={12} /> Registry
            </Link>
            <div className="h-3.5 w-px bg-border/40" />
            <div className="flex items-center gap-2 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[9px] text-emerald-500 font-black tracking-widest uppercase">
              <Activity size={10} className="animate-pulse" /> Live Telemetry
            </div>
          </div>
          <h1 className="font-display font-black text-2xl text-foreground tracking-tighter uppercase leading-none">
            Network Intelligence <span className="text-primary">Map</span>
          </h1>
          <p className="text-[9px] font-mono tracking-[0.3em] text-muted-foreground/60 uppercase">Protocol Infrastructure · IND-GRID-001</p>
        </div>

        <div className="relative z-10 flex items-center gap-6 bg-surface/50 backdrop-blur-2xl border border-border/40 px-5 py-4 rounded-2xl shadow-xl">
          <div className="text-right">
            <p className="text-[8px] font-black tracking-widest text-muted-foreground uppercase mb-0.5 opacity-60">Capacity</p>
            <p className="font-display font-black text-2xl text-foreground leading-none tracking-tighter">18.7 <span className="text-[9px] text-primary opacity-60">GW</span></p>
          </div>
          <div className="h-8 w-px bg-border/40" />
          <div className="text-right">
            <p className="text-[8px] font-black tracking-widest text-muted-foreground uppercase mb-0.5 opacity-60">Active Nodes</p>
            <p className="font-display font-black text-2xl text-sky-500 leading-none tracking-tighter">12,840</p>
          </div>
        </div>
      </div>

      <div className="flex-1 flex gap-0 min-h-0">
        {/* Network Intelligence Sidebar: Compact Edition */}
        <div className="w-[340px] shrink-0 flex flex-col border-r border-border bg-surface/40 backdrop-blur-3xl p-6 overflow-y-auto scrollbar-hide relative z-20">
          <div className="space-y-6">
            {/* Search Module */}
            <div className="space-y-2.5">
              <span className="text-[9px] font-black tracking-[0.2em] text-muted-foreground uppercase pl-1 opacity-70">Target Origin</span>
              <div className="relative group">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-all" size={14} />
                <input
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Scan state or node cluster..."
                  className="w-full h-11 bg-surface-2/50 border border-border/50 rounded-xl pl-10 pr-4 text-[12px] font-mono placeholder:text-muted-foreground/40 focus:outline-none focus:ring-1 focus:ring-primary/30 transition-all"
                />
              </div>
            </div>

            {/* Asset Intelligence Filters */}
            <div className="space-y-3">
              <div className="flex items-center justify-between px-1">
                <span className="text-[9px] font-black tracking-[0.2em] text-muted-foreground uppercase opacity-70">Grid Segments</span>
                <Filter size={10} className="text-muted-foreground opacity-30" />
              </div>
              <div className="grid grid-cols-1 gap-1.5">
                {['all', 'available', 'subscribed', 'reserved'].map(s => {
                  const legend = statusLegend.find(l => l.label.toLowerCase() === s);
                  return (
                    <button
                      key={s}
                      onClick={() => setStatusFilter(s)}
                      className={cn(
                        "w-full group flex items-center justify-between px-4 py-3 rounded-xl border transition-all text-[10px] font-black uppercase tracking-widest",
                        statusFilter === s
                          ? 'bg-primary/5 border-primary/30 text-primary'
                          : 'bg-surface-2/30 border-transparent text-muted-foreground/70 hover:bg-surface-2 hover:border-border-strong hover:text-foreground'
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          "w-1.5 h-1.5 rounded-full",
                          s === 'all' ? 'bg-foreground' : legend?.dot
                        )} />
                        {s}
                      </div>
                      <span className="font-mono text-[9px] opacity-40 group-hover:opacity-100">{s === 'all' ? '1.2k' : '348'}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Local Telemetry Card: Perfectly Compact */}
            <div className={cn(
              "p-5 rounded-3xl border transition-all duration-500 relative overflow-hidden group/card min-h-[160px] flex flex-col justify-center",
              hoveredState ? 'bg-primary/5 border-primary/30 shadow-lg shadow-primary/5' : 'bg-surface-2/40 border-border/40'
            )}>
              <div className="absolute -bottom-4 -right-4 opacity-[0.04] pointer-events-none group-hover/card:scale-110 transition-transform duration-700">
                <Network size={100} className="text-primary" />
              </div>

              <div className="relative z-10">
                {hoveredState ? (
                  <div className="space-y-4 animate-in fade-in zoom-in-95 duration-400">
                    <div className="space-y-0.5">
                      <p className="text-[8px] font-mono tracking-[0.4em] text-primary uppercase leading-none opacity-80">Origin IND-01</p>
                      <h3 className="font-display font-black text-2xl text-foreground tracking-tighter leading-tight">{hoveredState}</h3>
                    </div>

                    <div className="grid grid-cols-2 gap-4 py-3 border-y border-border/20">
                      <div className="space-y-0.5">
                        <p className="text-[8px] font-black tracking-widest text-muted-foreground uppercase opacity-60">Cap</p>
                        <p className="font-display font-black text-lg text-foreground leading-none">{indiaStateData[hoveredState].mw} <span className="text-[8px] font-normal opacity-40">MW</span></p>
                      </div>
                      <div className="space-y-0.5 text-right">
                        <p className="text-[8px] font-black tracking-widest text-muted-foreground uppercase opacity-60">Nodes</p>
                        <p className="font-display font-black text-lg text-sky-500 leading-none">{indiaStateData[hoveredState].nodes}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between group/btn cursor-pointer pt-1">
                      <span className="text-[9px] font-black tracking-widest uppercase text-foreground/80 group-hover/btn:text-primary transition-colors">Technical Data</span>
                      <ArrowRight size={12} className="text-primary group-hover/btn:translate-x-1 transition-transform" />
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center text-center gap-3">
                    <div className="relative">
                      <div className="absolute inset-0 bg-primary/20 blur-lg rounded-full animate-pulse" />
                      <Rocket size={24} className="text-primary/60 relative" />
                    </div>
                    <p className="text-[9px] leading-relaxed font-black tracking-[0.2em] uppercase text-muted-foreground/50 max-w-[140px]">Target state to scan telemetry</p>
                  </div>
                )}
              </div>
            </div>

            {/* Network Health: Compact HUD */}
            <div className="grid grid-cols-2 gap-2.5 pt-4">
              <div className="p-3.5 rounded-2xl bg-surface-2/50 border border-border/40 space-y-1">
                <div className="flex items-center justify-between mb-1">
                  <Monitor size={12} className="text-sky-500 opacity-40" />
                  <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                </div>
                <p className="text-[8px] font-black tracking-widest text-muted-foreground uppercase opacity-60">Uptime</p>
                <p className="font-display font-black text-lg text-foreground tracking-tighter">99.9%</p>
              </div>
              <div className="p-3.5 rounded-2xl bg-surface-2/50 border border-border/40 space-y-1 text-right">
                <div className="flex items-center justify-between flex-row-reverse mb-1">
                  <SignalHigh size={12} className="text-emerald-500 opacity-40" />
                  <div className="flex gap-0.5">
                    {[1, 2, 3].map(i => <div key={i} className="w-0.5 h-1.5 bg-emerald-500/30 rounded-full" />)}
                  </div>
                </div>
                <p className="text-[8px] font-black tracking-widest text-muted-foreground uppercase opacity-60">Ping</p>
                <p className="font-display font-black text-lg text-foreground tracking-tighter">14ms</p>
              </div>
            </div>
          </div>
        </div>

        {/* Map Viewport: Themed Integration */}
        <div className="flex-1 relative overflow-hidden bg-background/50 shadow-[inset_0_0_80px_rgba(0,0,0,0.05)] border-l border-border/30 z-10 transition-colors">
          {/* Subtle Technical Patterns */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 0.5px, transparent 0)', backgroundSize: '32px 32px' }} />
          <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-background to-transparent pointer-events-none z-10 opactiy-60" />
          <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none z-10 opacity-60" />

          {/* Mission Control HUD Legend */}
          <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20 flex gap-6 px-7 py-3 bg-surface/80 border border-border/60 backdrop-blur-xl rounded-full shadow-lg">
            {statusLegend.map(l => (
              <div key={l.label} className="flex items-center gap-2.5">
                <div className={cn("w-1.5 h-1.5 rounded-full shadow-[0_0_8px_currentColor]", l.textClass)} />
                <span className="text-[9px] font-black tracking-widest text-muted-foreground uppercase select-none">{l.label}</span>
              </div>
            ))}
          </div>

          {/* Floating Map Intelligence Controls */}
          <div className="absolute bottom-6 right-6 z-20 flex flex-col gap-3">
            <div className="flex flex-col bg-surface/80 backdrop-blur-xl border border-border rounded-2xl p-1.5 shadow-xl transition-all hover:border-primary/30">
              <button
                onClick={() => setZoom(z => Math.min(6, z + 0.5))}
                className="w-11 h-11 rounded-xl flex items-center justify-center text-muted-foreground hover:bg-primary/10 hover:text-primary transition-all active:scale-90"
              >
                <Plus size={18} strokeWidth={2.5} />
              </button>
              <div className="h-px w-6 bg-border/40 mx-auto my-1" />
              <button
                onClick={() => setZoom(z => Math.max(0.4, z - 0.5))}
                className="w-11 h-11 rounded-xl flex items-center justify-center text-muted-foreground hover:bg-primary/10 hover:text-primary transition-all active:scale-90"
              >
                <Minus size={18} strokeWidth={2.5} />
              </button>
            </div>
            <button
              onClick={() => setZoom(1)}
              className="w-11 h-11 rounded-2xl bg-surface/80 backdrop-blur-xl border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 transition-all active:scale-90 shadow-lg group"
            >
              <Crosshair size={18} strokeWidth={2.5} className="group-hover:rotate-90 transition-transform duration-500" />
            </button>
            <button
              className="w-11 h-11 rounded-2xl bg-surface/80 backdrop-blur-xl border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 transition-all active:scale-90 shadow-lg"
            >
              <Maximize2 size={18} strokeWidth={2.5} />
            </button>
          </div>

          {/* Map Layer: Fully Themed */}
          <div className="absolute inset-0 flex items-center justify-center transition-all duration-1000 ease-[cubic-bezier(0.19, 1, 0.22, 1)]" style={{ transform: `scale(${zoom})` }}>
            <ComposableMap
              projection="geoMercator"
              projectionConfig={{
                center: [82, 22],
                scale: 1300
              }}
              className="w-full h-full p-20"
            >
              <Geographies geography={indiaGeo}>
                {({ geographies }) =>
                  geographies.map((geo) => {
                    const stateName = geo.properties.name;
                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        onMouseEnter={() => setHoveredState(stateName)}
                        onMouseLeave={() => setHoveredState(null)}
                        style={{
                          default: {
                            fill: getStateColor(stateName),
                            stroke: "hsl(var(--border))",
                            strokeWidth: 0.5,
                            outline: "none",
                            transition: "all 400ms cubic-bezier(0.4, 0, 0.2, 1)"
                          },
                          hover: {
                            fill: "hsl(var(--primary) / 0.9)",
                            stroke: "hsl(var(--primary))",
                            strokeWidth: 1.2,
                            outline: "none",
                            cursor: "pointer",
                            filter: "drop-shadow(0 0 12px hsl(var(--primary) / 0.4))"
                          },
                          pressed: {
                            fill: "hsl(var(--primary))",
                            outline: "none"
                          }
                        }}
                      />
                    );
                  })
                }
              </Geographies>
            </ComposableMap>
          </div>

          {/* Technical Grid Overlay Info */}
          <div className="absolute inset-6 border border-foreground/[0.03] pointer-events-none rounded-[2.5rem] flex flex-col justify-between p-6 opacity-40">
            <div className="flex justify-between items-start">
              <div className="flex flex-col gap-0.5">
                <span className="font-mono text-[8px] text-muted-foreground uppercase opacity-40">Grid_Reference</span>
                <span className="font-mono text-[9px] text-foreground/30">28.6° N, 77.2° E</span>
              </div>
              <div className="flex flex-col gap-0.5 text-right">
                <span className="font-mono text-[8px] text-muted-foreground uppercase opacity-40">System_Status</span>
                <span className="font-mono text-[9px] text-emerald-500/50">SECURE_SYNC</span>
              </div>
            </div>

            <div className="flex justify-between items-end">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-emerald-500/40" />
                  <span className="font-mono text-[8px] text-muted-foreground/40 uppercase tracking-widest">Core_Active</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-sky-500/40" />
                  <span className="font-mono text-[8px] text-muted-foreground/40 uppercase tracking-widest">Stream_1.0</span>
                </div>
              </div>
              <div className="text-right flex flex-col items-end gap-1.5">
                <span className="font-mono text-[9px] text-primary/30 tracking-[0.8em] uppercase">Scanning...</span>
                <div className="h-0.5 w-24 bg-foreground/[0.03] rounded-full overflow-hidden">
                  <div className="h-full bg-primary/20 w-1/4 animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
