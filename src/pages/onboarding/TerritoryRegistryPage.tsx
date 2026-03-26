import React, { useState, useEffect } from 'react';
import {
    Search, Download, Map, Plus, SquareStack, CheckCircle2,
    Clock, Lock, Zap, Table2, LayoutGrid, Eye, Check,
    Filter, BarChart3, Activity, Globe, ArrowUpRight, ChevronDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { territories, statusConfig, riskConfig, type Territory } from '@/data/mockData';
import TerritoryRequestModal from '@/components/TerritoryRequestModal';
import { cn } from '@/lib/utils';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useOnboarding } from '@/hooks/use-onboarding';

const kpis = [
    { icon: Globe, label: 'TOTAL ASSETS', value: '234', sub: '36 Strategic Regions', color: 'text-primary' },
    { icon: CheckCircle2, label: 'MARKET READY', value: '162', sub: 'Verified Infrastructure', color: 'text-status-green' },
    { icon: Activity, label: 'ACTIVE QUEUE', value: '40', sub: 'Processing review', color: 'text-sky-400' },
    { icon: Lock, label: 'INSTITUTIONAL', value: '22', sub: 'Governance Hold', color: 'text-status-orange' },
    { icon: Zap, label: 'CAPACITY POTENTIAL', value: '43.2 GW', sub: 'Estimated Annual Yield', color: 'text-status-green' },
];

const quickFilters = [
    { id: 'all', label: 'All Territories' },
    { id: 'high-yield', label: 'High Yield (>150 MW)' },
    { id: 'verified', label: 'Verified Partners' },
    { id: 'critical', label: 'Critical Infrastructure' },
];

export default function TerritoryRegistryPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const { onboardingData, updateData } = useOnboarding();
    const selectionMode = location.state?.selectionMode;
    const fromSidebar = location.state?.fromSidebar;

    const [view, setView] = useState<'cards' | 'table'>('cards');
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [quickFilter, setQuickFilter] = useState('all');
    const [requestModalOpen, setRequestModalOpen] = useState(false);
    const [selectedTerritory, setSelectedTerritory] = useState<Territory | null>(null);
    const [liveStatus, setLiveStatus] = useState<'connecting' | 'live'>('connecting');

    const selectedIds = onboardingData.selectedTerritories || [];

    useEffect(() => {
        const t = setTimeout(() => setLiveStatus('live'), 1000);
        return () => clearTimeout(t);
    }, []);

    const filtered = territories.filter(t => {
        // Search
        const searchMatch = !search ||
            t.name.toLowerCase().includes(search.toLowerCase()) ||
            t.id.toLowerCase().includes(search.toLowerCase()) ||
            t.state.toLowerCase().includes(search.toLowerCase());
        if (!searchMatch) return false;

        // Status Filter
        if (statusFilter !== 'all' && t.status !== statusFilter) return false;

        // Quick Filters (Mock logic)
        if (quickFilter === 'high-yield') {
            const mwValue = parseFloat(t.mwPotential.toString());
            if (mwValue < 150) return false;
        }

        return true;
    });

    const toggleSelection = (id: string) => {
        if (!selectionMode) return;
        const newSelected = selectedIds.includes(id)
            ? selectedIds.filter((sid: string) => sid !== id)
            : [...selectedIds, id];
        updateData({ selectedTerritories: newSelected });
    };

    const confirmSelection = () => {
        navigate('/onboarding/infra-partner/pre-qualification');
    };

    const handleRequest = (territory: Territory) => {
        if (selectionMode) {
            toggleSelection(territory.id);
            return;
        }
        setSelectedTerritory(territory);
        setRequestModalOpen(true);
    };

    return (
        <div className="p-8 max-w-[1600px] mx-auto space-y-8 bg-background pb-24">
            {/* Enterprise Header */}
            <div className="flex items-end justify-between border-b border-border pb-8">
                <div className="space-y-3">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-primary/10 border border-primary/20">
                            <Globe size={24} className="text-primary" />
                        </div>
                        <div>
                            <h1 className="font-display font-black text-3xl text-foreground tracking-tight uppercase">
                                {selectionMode ? 'Territory Selection' : 'Asset Registry'}
                            </h1>
                            <div className="flex items-center gap-3 mt-1">
                                <div className={cn(
                                    "flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest transition-all",
                                    liveStatus === 'connecting' ? 'bg-orange-soft text-status-orange' : 'bg-green-soft text-status-green shadow-sm'
                                )}>
                                    <div className={cn("w-1.5 h-1.5 rounded-full", liveStatus === 'connecting' ? 'bg-status-orange' : 'bg-status-green animate-pulse')} />
                                    {liveStatus === 'connecting' ? 'Syncing...' : 'Network Live'}
                                </div>
                                <p className="text-[11px] text-muted-foreground font-bold opacity-60 uppercase tracking-tighter">System ID: DLN-CORE-v2.4</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    {selectionMode ? (
                        <Button size="lg" className="h-12 px-8 bg-status-green hover:bg-status-green/90 text-white rounded-2xl font-black shadow-xl shadow-status-green/20 group" onClick={confirmSelection}>
                            <Check size={18} className="mr-2 group-hover:scale-125 transition-transform" /> Confirm {selectedIds.length} Assets
                        </Button>
                    ) : (
                        <div className="flex items-center gap-3">
                            <Button variant="outline" size="sm" className="h-10 rounded-xl border-border bg-surface-2 hover:bg-surface-3 transition-colors text-xs font-bold">
                                <Download size={14} className="mr-2" /> Export
                            </Button>
                            <Link to="/onboarding/infra-partner/territory-map">
                                <Button variant="outline" size="sm" className="h-10 rounded-xl border-border bg-surface-2 hover:bg-surface-3 transition-colors text-xs font-bold">
                                    <Map size={14} className="mr-2" /> Geo-Viz
                                </Button>
                            </Link>
                            <Button size="sm" className="h-10 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold px-6 shadow-lg shadow-primary/10" onClick={() => { setSelectedTerritory(null); setRequestModalOpen(true); }}>
                                <Plus size={14} className="mr-2" /> Provision New
                            </Button>
                        </div>
                    )}
                </div>
            </div>

            {/* KPI Stats Bar */}
            <div className="grid grid-cols-5 gap-4">
                {kpis.map((k, i) => (
                    <div key={k.label} className="rounded-3xl bg-surface p-6 border-2 border-border shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1 group relative overflow-hidden">
                        {/* Decorative Background Number */}
                        <div className="absolute -bottom-6 -right-2 text-6xl font-display font-black text-foreground/[0.02] pointer-events-none group-hover:text-foreground/[0.04] transition-all duration-700 select-none">
                            0{i + 1}
                        </div>

                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-8 h-8 rounded-lg bg-surface-2 flex items-center justify-center border border-border group-hover:bg-primary/5 group-hover:border-primary/20 transition-all">
                                <k.icon size={16} className={cn("transition-colors", k.color.includes('text') ? k.color : 'text-foreground')} />
                            </div>
                            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground opacity-60 group-hover:opacity-100 transition-opacity">{k.label}</span>
                        </div>
                        <div className="space-y-1">
                            <p className={cn("font-display font-black text-2xl tracking-tighter", k.color.includes('text') ? k.color : 'text-foreground')}>{k.value}</p>
                            <p className="text-[10px] text-muted-foreground font-medium opacity-70 group-hover:opacity-100 transition-all">{k.sub}</p>
                        </div>
                        {i === 4 && <div className="absolute top-0 right-0 p-4 opacity-5"><BarChart3 size={40} /></div>}
                    </div>
                ))}
            </div>

            {/* Advanced Filtering & View Controls */}
            <div className="flex items-center gap-4 py-2 border-b border-border/50">
                <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-surface border border-border flex-1 max-w-md shadow-sm group focus-within:ring-2 ring-primary/20 transition-all">
                    <Search size={16} className="text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Global search by asset serial, name, or region..."
                        className="bg-transparent text-[13px] text-foreground outline-none w-full placeholder:text-muted-foreground font-medium"
                    />
                </div>

                <div className="flex items-center gap-2">
                    {quickFilters.map(f => (
                        <button
                            key={f.id}
                            onClick={() => setQuickFilter(f.id)}
                            className={cn(
                                "px-4 py-2 rounded-xl text-[11px] font-black uppercase tracking-widest border transition-all",
                                quickFilter === f.id
                                    ? "bg-primary text-white border-primary shadow-lg shadow-primary/20 translate-y-[-1px]"
                                    : "bg-surface text-muted-foreground border-border hover:border-border-strong hover:bg-surface-2"
                            )}
                        >
                            {f.label}
                        </button>
                    ))}
                </div>

                <div className="h-8 w-px bg-border/50 mx-2" />

                <div className="flex items-center gap-3 ml-auto">
                    <div className="flex items-center gap-2 text-[11px] text-muted-foreground font-black uppercase tracking-widest mr-4">
                        <Filter size={14} className="opacity-50" />
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="bg-transparent border-none outline-none text-foreground cursor-pointer"
                        >
                            <option value="all">Status: All Access</option>
                            <option value="available">Status: Available</option>
                            <option value="subscribed">Status: Under Review</option>
                            <option value="allocated">Status: Allocated</option>
                        </select>
                    </div>

                    <div className="flex bg-surface-2 rounded-xl p-1 border border-border shadow-inner">
                        <button onClick={() => setView('table')} className={cn("p-2 rounded-lg transition-all", view === 'table' ? 'bg-surface shadow-sm text-primary' : 'text-muted-foreground hover:text-foreground')}>
                            <Table2 size={18} />
                        </button>
                        <button onClick={() => setView('cards')} className={cn("p-2 rounded-lg transition-all", view === 'cards' ? 'bg-surface shadow-sm text-primary' : 'text-muted-foreground hover:text-foreground')}>
                            <LayoutGrid size={18} />
                        </button>
                    </div>
                </div>
            </div>

            {/* High-Density Card View */}
            {view === 'cards' && (
                <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))' }}>
                    {filtered.map((t) => {
                        const sc = statusConfig[t.status];
                        const rc = riskConfig[t.risk];
                        const isSelected = selectedIds.includes(t.id);
                        return (
                            <div
                                key={t.id}
                                onClick={() => selectionMode ? toggleSelection(t.id) : navigate(`/onboarding/infra-partner/territories/${t.id}`, { state: { fromSidebar } })}
                                className={cn(
                                    "rounded-2xl bg-surface border-2 p-5 shadow-sm hover:shadow-2xl transition-all duration-300 cursor-pointer flex flex-col group relative overflow-hidden",
                                    isSelected
                                        ? "border-primary ring-4 ring-primary/5 -translate-y-1.5"
                                        : "border-border hover:border-border-strong"
                                )}
                            >
                                {/* Visual Accent */}
                                <div className={cn("absolute top-0 left-0 w-1 h-full opacity-60", isSelected ? "bg-primary" : "bg-transparent")} />

                                {isSelected && (
                                    <div className="absolute top-4 right-4 text-primary animate-in zoom-in duration-300">
                                        <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center shadow-lg shadow-primary/30">
                                            <Check size={14} className="text-white" strokeWidth={4} />
                                        </div>
                                    </div>
                                )}

                                <div className="flex items-center justify-between mb-4">
                                    <span className="font-mono text-[9px] font-black text-muted-foreground opacity-50 group-hover:opacity-100 transition-opacity">{t.id}</span>
                                    <div className={cn(
                                        "flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest transition-all",
                                        t.status === 'available' ? 'bg-sky-50 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400' :
                                            t.status === 'subscribed' ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400' :
                                                t.status === 'reserved' ? 'bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400' :
                                                    'bg-zinc-100 dark:bg-zinc-800/50 text-zinc-600 dark:text-zinc-400'
                                    )}>
                                        <div className={cn(
                                            "w-1.5 h-1.5 rounded-full",
                                            t.status === 'available' ? 'bg-sky-500' :
                                                t.status === 'subscribed' ? 'bg-indigo-500' :
                                                    t.status === 'reserved' ? 'bg-orange-500' :
                                                        'bg-zinc-500'
                                        )} />
                                        {sc.label}
                                    </div>
                                </div>

                                <div className="space-y-1 mb-6">
                                    <p className="text-[14px] font-black text-foreground leading-tight tracking-tight group-hover:text-primary transition-colors">{t.name}</p>
                                    <p className="text-[10px] text-muted-foreground font-bold opacity-60 uppercase flex items-center gap-1.5">
                                        <Globe size={10} className="shrink-0" /> {t.state}
                                    </p>
                                </div>

                                <div className="bg-surface-2 dark:bg-white/[0.03] rounded-2xl p-4 flex items-end justify-between border border-border/50">
                                    <div className="space-y-0.5">
                                        <p className="font-display font-black text-2xl text-foreground tracking-tighter leading-none">{t.mwPotential}</p>
                                        <p className="text-[9px] text-muted-foreground font-black tracking-widest uppercase opacity-60">MW POTENTIAL</p>
                                    </div>
                                    <div className="text-right space-y-0.5">
                                        <p className="font-display font-black text-xl text-primary/80 tracking-tighter leading-none">{t.irradiance}</p>
                                        <p className="text-[9px] text-muted-foreground font-black tracking-widest uppercase opacity-60">kWh/m²</p>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between mt-6">
                                    <span className={cn(
                                        "px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest",
                                        t.risk === 'Low' ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400' :
                                            t.risk === 'Medium' ? 'bg-violet-50 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400' :
                                                'bg-rose-50 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400'
                                    )}>
                                        {t.risk}
                                    </span>
                                    {selectionMode ? (
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className={cn("h-8 px-3 rounded-full font-bold text-[10px] uppercase transition-all shadow-md active:scale-95", isSelected ? "bg-primary text-white hover:bg-primary/90" : "bg-primary/10 text-primary hover:bg-primary hover:text-white")}
                                        >
                                            {isSelected ? 'Selected' : '+ Select'}
                                        </Button>
                                    ) : (
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="h-8 px-3.5 rounded-full bg-primary hover:bg-primary/90 text-white font-bold text-[10px] shadow-lg shadow-primary/20 transition-all active:scale-95"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleRequest(t);
                                            }}
                                        >
                                            + Request
                                        </Button>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Table View Overhaul */}
            {view === 'table' && (
                <div className="rounded-3xl border-2 border-border bg-surface overflow-hidden shadow-xl">
                    <table className="w-full text-left border-separate border-spacing-0">
                        <thead>
                            <tr className="bg-surface-2">
                                <th className="px-6 py-5 text-[10px] uppercase tracking-widest font-black text-muted-foreground border-b border-border">System ID</th>
                                <th className="px-6 py-5 text-[10px] uppercase tracking-widest font-black text-muted-foreground border-b border-border">Resource Name</th>
                                <th className="px-6 py-5 text-[10px] uppercase tracking-widest font-black text-muted-foreground border-b border-border text-center">Operational Zone</th>
                                <th className="px-6 py-5 text-[10px] uppercase tracking-widest font-black text-muted-foreground border-b border-border text-center">Infrastructure Class</th>
                                <th className="px-6 py-5 text-[10px] uppercase tracking-widest font-black text-muted-foreground border-b border-border text-center">Registry Status</th>
                                <th className="px-6 py-5 text-[10px] uppercase tracking-widest font-black text-muted-foreground border-b border-border text-right">MW Pot.</th>
                                <th className="px-6 py-5 text-[10px] uppercase tracking-widest font-black text-muted-foreground border-b border-border text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border/20">
                            {filtered.map((t) => {
                                const sc = statusConfig[t.status];
                                const rc = riskConfig[t.risk];
                                const isSelected = selectedIds.includes(t.id);
                                return (
                                    <tr
                                        key={t.id}
                                        onClick={() => selectionMode ? toggleSelection(t.id) : navigate(`/onboarding/infra-partner/territories/${t.id}`, { state: { fromSidebar } })}
                                        className={cn(
                                            "group cursor-pointer transition-all",
                                            isSelected ? "bg-primary/[0.03] hover:bg-primary/[0.05]" : "hover:bg-accent-soft/[0.02]"
                                        )}
                                    >
                                        <td className={cn("px-6 py-4 font-mono text-[11px] font-black", isSelected ? "text-primary" : "text-muted-foreground opacity-60")}>
                                            <div className="flex items-center gap-2">
                                                {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-primary" />}
                                                {t.id}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={cn("text-[13px] font-black", isSelected ? "text-foreground" : "text-foreground/90")}>{t.name}</span>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className="text-[11px] font-bold text-muted-foreground group-hover:text-foreground transition-colors">{t.state}</span>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className={cn(
                                                "inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest",
                                                t.risk === 'Low' ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' :
                                                    t.risk === 'Medium' ? 'bg-violet-50 dark:bg-violet-500/10 text-violet-600 dark:text-violet-400' :
                                                        'bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400'
                                            )}>
                                                {t.risk}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <div className="inline-flex items-center gap-1.5">
                                                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: sc.color }} />
                                                <span className={cn("text-[10px] font-black uppercase tracking-widest", sc.textClass)}>{sc.label}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <span className="font-display font-black text-sm text-foreground">{t.mwPotential}</span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="inline-flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-lg hover:bg-primary/10 hover:text-primary">
                                                    <Eye size={14} />
                                                </Button>
                                                {selectionMode ? (
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className={cn("h-8 px-3 rounded-lg text-[10px] font-black uppercase transition-all", isSelected ? "bg-primary text-white" : "bg-surface-3 text-muted-foreground")}
                                                    >
                                                        {isSelected ? 'Selected' : 'Add'}
                                                    </Button>
                                                ) : (
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="h-8 w-8 p-0 rounded-lg hover:bg-primary/10 hover:text-primary"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleRequest(t);
                                                        }}
                                                    >
                                                        <Plus size={14} />
                                                    </Button>
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

// Custom ArrowRight icon component
function ArrowRight({ size, className }: { size: number, className: string }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
    );
}
