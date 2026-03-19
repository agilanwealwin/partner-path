import React, { useState, useEffect } from 'react';
import { Search, Download, Map, Plus, SquareStack, CheckCircle2, Clock, Lock, Zap, Table2, LayoutGrid, Eye, ChevronUp, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { territories, statusConfig, riskConfig, type Territory } from '@/data/mockData';
import TerritoryRequestModal from '@/components/TerritoryRequestModal';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

const stats = [
  { icon: SquareStack, label: 'TOTAL TERRITORIES', value: '234', sub: '36 states & UTs', color: '' },
  { icon: CheckCircle2, label: 'AVAILABLE', value: '162', sub: 'Open for subscription', color: 'text-status-green' },
  { icon: Clock, label: 'SUBSCRIBED', value: '40', sub: 'Pending review', color: 'text-primary' },
  { icon: Lock, label: 'RESERVED', value: '22', sub: 'Admin hold', color: 'text-status-orange' },
  { icon: Zap, label: 'TOTAL MW POTENTIAL', value: '43.2 GW', sub: 'Across all territories', color: 'text-status-green' },
];

export default function TerritoryRegistryPage() {
  const [view, setView] = useState<'cards' | 'table'>('cards');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [requestModalOpen, setRequestModalOpen] = useState(false);
  const [selectedTerritory, setSelectedTerritory] = useState<Territory | null>(null);
  const [liveStatus, setLiveStatus] = useState<'connecting' | 'live'>('connecting');

  useEffect(() => {
    const t = setTimeout(() => setLiveStatus('live'), 1500);
    return () => clearTimeout(t);
  }, []);

  const filtered = territories.filter(t => {
    if (search && !t.name.toLowerCase().includes(search.toLowerCase()) && !t.id.toLowerCase().includes(search.toLowerCase()) && !t.state.toLowerCase().includes(search.toLowerCase())) return false;
    if (statusFilter !== 'all' && t.status !== statusFilter) return false;
    return true;
  });

  const handleRequest = (territory: Territory) => {
    setSelectedTerritory(territory);
    setRequestModalOpen(true);
  };

  return (
    <div className="p-6 max-w-[1400px] mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-display font-bold text-2xl text-foreground">Territory Registry</h1>
          <div className="flex items-center gap-2 mt-1.5">
            <span className={cn(
              "inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[10px] font-mono transition-all",
              liveStatus === 'connecting' ? 'bg-orange-soft text-status-orange' : 'bg-green-soft text-status-green'
            )}>
              {liveStatus === 'connecting' ? (
                <><Clock size={10} className="animate-spin" /> Connecting to database...</>
              ) : (
                <><CheckCircle2 size={10} /> Live · Last updated 2 min ago</>
              )}
            </span>
            <p className="text-sm text-muted-foreground">234 territories across 36 states & UTs</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm"><Download size={14} /> Export CSV</Button>
          <Link to="/onboarding/infra-partner/territory-map">
            <Button variant="outline" size="sm"><Map size={14} /> View on Map</Button>
          </Link>
          <Button size="sm" onClick={() => { setSelectedTerritory(null); setRequestModalOpen(true); }}>
            <Plus size={14} /> Request Territory
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-5 gap-3">
        {stats.map((s) => (
          <div key={s.label} className="rounded-card bg-surface p-4 shadow-surface border-t-2" style={{ borderTopColor: s.color ? undefined : 'hsl(var(--surface3))' }}>
            <div className="flex items-center gap-2 mb-2">
              <s.icon size={16} className={s.color || 'text-muted-foreground'} />
              <span className="section-label">{s.label}</span>
            </div>
            <p className={cn("font-display font-bold text-xl", s.color || 'text-foreground')}>{s.value}</p>
            <p className="text-[10px] text-muted-foreground mt-0.5">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface border border-border flex-1 max-w-sm">
          <Search size={14} className="text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by territory ID, name, state..."
            className="bg-transparent text-sm text-foreground outline-none w-full placeholder:text-muted-foreground"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-1.5 rounded-lg bg-surface border border-border text-sm text-foreground outline-none"
        >
          <option value="all">All Statuses</option>
          <option value="available">Available</option>
          <option value="subscribed">Subscribed</option>
          <option value="reserved">Reserved</option>
          <option value="allocated">Allocated</option>
        </select>
        <span className="text-xs text-muted-foreground ml-auto">{filtered.length} of 234</span>
        <div className="flex rounded-lg border border-border overflow-hidden">
          <button onClick={() => setView('table')} className={cn("px-2.5 py-1.5 transition-colors", view === 'table' ? 'bg-surface-3 text-foreground' : 'bg-surface text-muted-foreground hover:bg-surface-2')}>
            <Table2 size={16} />
          </button>
          <button onClick={() => setView('cards')} className={cn("px-2.5 py-1.5 transition-colors", view === 'cards' ? 'bg-surface-3 text-foreground' : 'bg-surface text-muted-foreground hover:bg-surface-2')}>
            <LayoutGrid size={16} />
          </button>
        </div>
      </div>

      {/* Cards View */}
      {view === 'cards' && (
        <div className="grid gap-3" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(188px, 1fr))' }}>
          {filtered.map((t) => {
            const sc = statusConfig[t.status];
            const rc = riskConfig[t.risk];
            return (
              <div key={t.id} className="rounded-card bg-surface border border-border p-4 shadow-surface hover:shadow-surface-hover hover:-translate-y-0.5 transition-all duration-150 cursor-pointer group">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-[10px] text-muted-foreground">{t.id}</span>
                  <span className={cn("inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[10px]", sc.bgClass, sc.textClass)}>
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: sc.color }} />
                    {sc.label}
                  </span>
                </div>
                <p className="text-[13px] font-medium text-foreground leading-tight">{t.name}</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">{t.state}</p>
                <div className="flex items-center gap-4 mt-3">
                  <div>
                    <p className="font-display font-bold text-sm text-foreground">{t.mwPotential}</p>
                    <p className="text-[9px] text-muted-foreground uppercase">MW Potential</p>
                  </div>
                  <div>
                    <p className="font-display font-bold text-sm text-foreground">{t.irradiance}</p>
                    <p className="text-[9px] text-muted-foreground uppercase">kWh/kWp</p>
                  </div>
                </div>
                <div className="h-px bg-border my-3" />
                <div className="flex items-center justify-between">
                  <span className={cn("px-1.5 py-0.5 rounded-md text-[10px]", rc.bgClass, rc.textClass)}>{t.risk}</span>
                  {t.status === 'available' ? (
                    <button onClick={() => handleRequest(t)} className="inline-flex items-center gap-1 px-2 py-1 rounded-md border border-status-green/30 text-status-green text-[10px] hover:bg-green-soft transition-colors">
                      <Plus size={10} /> Request
                    </button>
                  ) : (
                    <span className={cn("px-2 py-1 rounded-md text-[10px]", sc.bgClass, sc.textClass)}>{sc.label}</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Table View */}
      {view === 'table' && (
        <div className="rounded-card border border-border overflow-hidden">
          <table className="w-full text-[12px]">
            <thead>
              <tr className="border-b border-border bg-surface">
                <th className="text-left px-4 py-3 text-[10px] uppercase tracking-wider text-muted-foreground font-medium">#</th>
                <th className="text-left px-4 py-3 text-[10px] uppercase tracking-wider text-muted-foreground font-medium">Territory Name</th>
                <th className="text-left px-4 py-3 text-[10px] uppercase tracking-wider text-muted-foreground font-medium">State / UT</th>
                <th className="text-left px-4 py-3 text-[10px] uppercase tracking-wider text-muted-foreground font-medium">Adoption</th>
                <th className="text-left px-4 py-3 text-[10px] uppercase tracking-wider text-muted-foreground font-medium">Status</th>
                <th className="text-right px-4 py-3 text-[10px] uppercase tracking-wider text-muted-foreground font-medium">MW Potential</th>
                <th className="text-right px-4 py-3 text-[10px] uppercase tracking-wider text-muted-foreground font-medium">Irradiation</th>
                <th className="text-left px-4 py-3 text-[10px] uppercase tracking-wider text-muted-foreground font-medium">Assigned Partner</th>
                <th className="text-right px-4 py-3 text-[10px] uppercase tracking-wider text-muted-foreground font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((t) => {
                const sc = statusConfig[t.status];
                const rc = riskConfig[t.risk];
                return (
                  <tr key={t.id} className="border-b border-border last:border-0 hover:bg-[rgba(255,255,255,0.02)] group">
                    <td className="px-4 py-2.5 font-mono text-muted-foreground">{t.id}</td>
                    <td className="px-4 py-2.5 text-foreground font-medium">{t.name}</td>
                    <td className="px-4 py-2.5 text-muted-foreground">{t.state}</td>
                    <td className="px-4 py-2.5">
                      <span className={cn("px-1.5 py-0.5 rounded-md text-[10px]", rc.bgClass, rc.textClass)}>{t.adoption}</span>
                    </td>
                    <td className="px-4 py-2.5">
                      <span className={cn("inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[10px]", sc.bgClass, sc.textClass)}>
                        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: sc.color }} />
                        {sc.label}
                      </span>
                    </td>
                    <td className="px-4 py-2.5 text-right font-mono text-foreground">{t.mwPotential} MW</td>
                    <td className="px-4 py-2.5 text-right font-mono text-foreground">{t.irradiance} kWh/m²</td>
                    <td className="px-4 py-2.5 font-mono text-muted-foreground">{t.assignedPartner || '—'}</td>
                    <td className="px-4 py-2.5 text-right">
                      <div className="flex items-center gap-1 justify-end opacity-60 group-hover:opacity-100 transition-opacity">
                        <button className="p-1 rounded hover:bg-surface-2"><Eye size={14} className="text-muted-foreground" /></button>
                        {t.status === 'available' && (
                          <button onClick={() => handleRequest(t)} className="p-1 rounded hover:bg-surface-2"><Plus size={14} className="text-status-green" /></button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      <TerritoryRequestModal
        open={requestModalOpen}
        onClose={() => setRequestModalOpen(false)}
        territory={selectedTerritory}
      />
    </div>
  );
}
