import React, { useState } from 'react';
import {
  Search, Plus, Minus, Crosshair, ChevronLeft, Bell, MapPinned,
  CheckCircle2, Clock, Lock, Zap, Filter
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { territories, statusConfig } from '@/data/mockData';
import { cn } from '@/lib/utils';

const stateData: Record<string, { territories: number; available: number; subscribed: number; reserved: number; mw: number; irr: number }> = {
  'Uttar Pradesh': { territories: 15, available: 10, subscribed: 1, reserved: 3, mw: 1830, irr: 5.1 },
  'Rajasthan': { territories: 5, available: 3, subscribed: 1, reserved: 1, mw: 1223, irr: 5.6 },
  'Gujarat': { territories: 4, available: 2, subscribed: 2, reserved: 0, mw: 707, irr: 5.3 },
  'Tamil Nadu': { territories: 3, available: 2, subscribed: 0, reserved: 1, mw: 528, irr: 5.2 },
  'Andhra Pradesh': { territories: 2, available: 1, subscribed: 1, reserved: 0, mw: 386, irr: 5.3 },
  'Karnataka': { territories: 1, available: 1, subscribed: 0, reserved: 0, mw: 187, irr: 5.3 },
  'Haryana': { territories: 1, available: 1, subscribed: 0, reserved: 0, mw: 82, irr: 5.3 },
};

const statePositions: Record<string, { x: number; y: number }> = {
  'Rajasthan': { x: 25, y: 30 },
  'Gujarat': { x: 18, y: 45 },
  'Uttar Pradesh': { x: 48, y: 28 },
  'Tamil Nadu': { x: 48, y: 78 },
  'Andhra Pradesh': { x: 50, y: 62 },
  'Karnataka': { x: 40, y: 70 },
  'Haryana': { x: 40, y: 20 },
  'Maharashtra': { x: 35, y: 55 },
  'Madhya Pradesh': { x: 42, y: 40 },
  'Bihar': { x: 60, y: 30 },
  'West Bengal': { x: 65, y: 38 },
  'Odisha': { x: 58, y: 48 },
  'Kerala': { x: 42, y: 82 },
  'Punjab': { x: 37, y: 15 },
  'Jharkhand': { x: 58, y: 36 },
  'Chhattisgarh': { x: 52, y: 45 },
  'Telangana': { x: 48, y: 56 },
  'Assam': { x: 78, y: 28 },
};

const statusLegend = [
  { label: 'Available', color: 'bg-status-green' },
  { label: 'Subscribed', color: 'bg-primary' },
  { label: 'Reserved', color: 'bg-status-orange' },
  { label: 'Allocated', color: 'bg-status-blue' },
  { label: 'Unassigned', color: 'bg-surface-3' },
];

const myRequests = [
  { id: 'TRQ-0047', territory: 'Haryana T6', status: 'Pending' },
  { id: 'TRQ-0031', territory: 'Rajasthan T1', status: 'Approved' },
  { id: 'TRQ-0019', territory: 'Gujarat T4', status: 'Approved' },
];

export default function TerritoryMapPage() {
  const [hoveredState, setHoveredState] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const [showRequests, setShowRequests] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const getStateColor = (state: string) => {
    const data = stateData[state];
    if (!data) return 'rgba(255,255,255,0.05)';
    if (statusFilter !== 'all') {
      const count = statusFilter === 'available' ? data.available : statusFilter === 'subscribed' ? data.subscribed : statusFilter === 'reserved' ? data.reserved : 0;
      if (count === 0) return 'rgba(255,255,255,0.05)';
    }
    if (data.available > 15) return 'rgba(124,92,252,0.7)';
    if (data.available > 5) return 'rgba(124,92,252,0.45)';
    if (data.available > 0) return 'rgba(124,92,252,0.25)';
    return 'rgba(255,255,255,0.08)';
  };

  return (
    <div className="p-6 max-w-[1400px] mx-auto space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Link to="/onboarding/infra-partner/territories" className="text-[11px] text-muted-foreground hover:text-foreground inline-flex items-center gap-1 mb-2">
            <ChevronLeft size={12} /> Back to Territory Registry
          </Link>
          <h1 className="font-display font-bold text-2xl text-foreground">Territory Allocation Map — India</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant={showRequests ? 'default' : 'outline'} size="sm" onClick={() => setShowRequests(!showRequests)}>
            <MapPinned size={14} /> My Requests
            <span className="ml-1 px-1.5 py-0.5 rounded-full bg-primary/20 text-[10px]">{myRequests.length}</span>
          </Button>
        </div>
      </div>

      {/* Top Metrics */}
      <div className="flex items-center gap-4 text-[11px] font-mono px-4 py-2.5 rounded-lg bg-surface border border-border">
        <span className="text-muted-foreground">50 DISTRICTS</span>
        <span className="text-border">|</span>
        <span className="text-status-green">34 AVAILABLE</span>
        <span className="text-border">|</span>
        <span className="text-primary">8 SUBSCRIBED</span>
        <span className="text-border">|</span>
        <span className="text-status-orange">5 RESERVED</span>
        <span className="text-border">|</span>
        <span className="text-status-blue">3 ALLOCATED</span>
        <span className="text-border">|</span>
        <span className="text-foreground">18,718 MW POTENTIAL</span>
      </div>

      <div className="flex gap-4" style={{ height: 'calc(100vh - 240px)' }}>
        {/* Left Filter Panel */}
        <div className="w-[280px] shrink-0 rounded-card bg-surface border border-border p-4 overflow-y-auto space-y-4">
          <span className="section-label">Filter Territories</span>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-2 border border-border">
            <Search size={14} className="text-muted-foreground" />
            <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search district or state..." className="bg-transparent text-sm text-foreground outline-none w-full placeholder:text-muted-foreground" />
          </div>

          <div>
            <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Status</span>
            <div className="mt-2 space-y-1.5">
              {['all', 'available', 'subscribed', 'reserved', 'allocated'].map(s => (
                <button key={s} onClick={() => setStatusFilter(s)} className={cn(
                  "w-full text-left px-3 py-1.5 rounded-md text-[11px] transition-colors capitalize",
                  statusFilter === s ? 'bg-accent-soft text-primary' : 'text-muted-foreground hover:bg-surface-2'
                )}>
                  {s === 'all' ? 'All Statuses' : s}
                </button>
              ))}
            </div>
          </div>

          {/* My Requests */}
          {showRequests && (
            <div>
              <span className="section-label">My Territory Requests</span>
              <div className="mt-2 space-y-2">
                {myRequests.map(r => (
                  <div key={r.id} className="p-2.5 rounded-lg bg-surface-2 border border-border">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] text-foreground">{r.id}</span>
                      <span className={cn("text-[9px] px-1.5 py-0.5 rounded-md",
                        r.status === 'Approved' ? 'bg-green-soft text-status-green' : 'bg-orange-soft text-status-orange'
                      )}>{r.status}</span>
                    </div>
                    <p className="text-[10px] text-muted-foreground mt-0.5">{r.territory}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Legend */}
          <div>
            <span className="section-label">Territory Status</span>
            <div className="mt-2 space-y-1.5">
              {statusLegend.map(l => (
                <div key={l.label} className="flex items-center gap-2">
                  <span className={cn("w-2.5 h-2.5 rounded-full", l.color)} />
                  <span className="text-[10px] text-muted-foreground">{l.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Map Area */}
        <div className="flex-1 rounded-card bg-surface border border-border relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center" style={{ transform: `scale(${zoom})`, transition: 'transform 0.3s ease' }}>
            {/* SVG-based stylized India map */}
            <svg viewBox="0 0 100 100" className="w-full h-full max-w-[600px] max-h-[600px]">
              {/* Background */}
              <rect width="100" height="100" fill="transparent" />

              {/* State circles representing territories */}
              {Object.entries(statePositions).map(([state, pos]) => {
                const data = stateData[state];
                const radius = data ? Math.max(3, Math.min(8, data.territories * 0.6)) : 2;
                return (
                  <g key={state}
                    onMouseEnter={() => setHoveredState(state)}
                    onMouseLeave={() => setHoveredState(null)}
                    className="cursor-pointer"
                  >
                    <circle
                      cx={pos.x} cy={pos.y} r={radius}
                      fill={getStateColor(state)}
                      stroke={hoveredState === state ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.1)'}
                      strokeWidth={hoveredState === state ? 0.8 : 0.3}
                      className="transition-all duration-200"
                    />
                    {data && (
                      <circle cx={pos.x} cy={pos.y} r={radius + 1.5} fill="none"
                        stroke={getStateColor(state)} strokeWidth="0.3" opacity="0.4" />
                    )}
                    <text x={pos.x} y={pos.y + radius + 3} textAnchor="middle" className="text-[2px] fill-current text-muted-foreground" style={{ fontSize: '2.5px' }}>
                      {state.length > 12 ? state.slice(0, 10) + '...' : state}
                    </text>
                  </g>
                );
              })}

              {/* India outline hint */}
              <path d="M 30 5 Q 45 3 60 8 L 75 15 Q 82 22 80 32 L 78 40 Q 72 45 68 50 L 60 55 Q 55 65 52 72 L 48 82 Q 45 88 42 85 L 38 78 Q 32 70 28 60 L 22 50 Q 15 45 15 38 L 18 25 Q 22 15 30 5 Z"
                fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
            </svg>
          </div>

          {/* Hover Tooltip */}
          {hoveredState && stateData[hoveredState] && (
            <div className="absolute top-4 right-4 w-[220px] rounded-card bg-surface-2 border border-border p-3 shadow-surface-hover z-10">
              <p className="text-sm font-medium text-foreground mb-2">{hoveredState}</p>
              <div className="h-px bg-border mb-2" />
              <div className="space-y-1 text-[10px]">
                <div className="flex justify-between"><span className="text-muted-foreground">Total Territories</span><span className="text-foreground">{stateData[hoveredState].territories}</span></div>
                <div className="flex justify-between"><span className="text-status-green">Available</span><span className="text-foreground">{stateData[hoveredState].available}</span></div>
                <div className="flex justify-between"><span className="text-primary">Subscribed</span><span className="text-foreground">{stateData[hoveredState].subscribed}</span></div>
                <div className="flex justify-between"><span className="text-status-orange">Reserved</span><span className="text-foreground">{stateData[hoveredState].reserved}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">MW Potential</span><span className="text-foreground">{stateData[hoveredState].mw.toLocaleString()} MW</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Avg Irradiance</span><span className="text-foreground">{stateData[hoveredState].irr} kWh/m²</span></div>
              </div>
            </div>
          )}

          {/* Zoom Controls */}
          <div className="absolute bottom-4 right-4 flex flex-col gap-1">
            <button onClick={() => setZoom(z => Math.min(2, z + 0.2))} className="w-8 h-8 rounded-lg bg-surface-2 border border-border flex items-center justify-center hover:bg-surface-3 transition-colors">
              <Plus size={14} className="text-foreground" />
            </button>
            <button onClick={() => setZoom(z => Math.max(0.5, z - 0.2))} className="w-8 h-8 rounded-lg bg-surface-2 border border-border flex items-center justify-center hover:bg-surface-3 transition-colors">
              <Minus size={14} className="text-foreground" />
            </button>
            <button onClick={() => setZoom(1)} className="w-8 h-8 rounded-lg bg-surface-2 border border-border flex items-center justify-center hover:bg-surface-3 transition-colors">
              <Crosshair size={14} className="text-foreground" />
            </button>
          </div>

          {/* Map Legend */}
          <div className="absolute bottom-4 left-4 space-y-1">
            <span className="text-[9px] text-muted-foreground uppercase tracking-wider">Territory Status</span>
            {statusLegend.slice(0, 4).map(l => (
              <div key={l.label} className="flex items-center gap-1.5">
                <span className={cn("w-2 h-2 rounded-full", l.color)} />
                <span className="text-[9px] text-muted-foreground">{l.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
