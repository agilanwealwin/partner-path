import React, { useState, useMemo } from 'react';
import {
    Search, Plus, Globe, Eye, Check, Lock, Info,
    Activity, Table2, LayoutGrid, X, ChevronRight, Filter, Download,
    Database, Users, Clock, Zap, Map as MapIcon, MoreHorizontal, ExternalLink
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { territories, statusConfig, riskConfig, type Territory } from '@/data/mockData';
import TerritoryRequestModal from '@/components/TerritoryRequestModal';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export default function TerritoryRegistryPage() {
    const navigate = useNavigate();

    // Filters & View State
    const [view, setView] = useState<'cards' | 'table'>('cards');
    const [search, setSearch] = useState('');
    const [stateFilter, setStateFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');
    const [riskFilter, setRiskFilter] = useState('all');
    const [adoptionFilter, setAdoptionFilter] = useState('all');

    // Modal State
    const [requestModalOpen, setRequestModalOpen] = useState(false);
    const [selectedTerritory, setSelectedTerritory] = useState<Territory | null>(null);

    const states = useMemo(() => ['all', ...Array.from(new Set(territories.map(t => t.state))).sort()], []);

    const filtered = useMemo(() => {
        return territories.filter(t => {
            const searchMatch = !search ||
                t.name.toLowerCase().includes(search.toLowerCase()) ||
                t.id.toLowerCase().includes(search.toLowerCase());
            if (!searchMatch) return false;

            if (statusFilter !== 'all' && t.status !== statusFilter) return false;
            if (stateFilter !== 'all' && t.state !== stateFilter) return false;
            if (riskFilter !== 'all' && t.risk !== riskFilter) return false;
            if (adoptionFilter !== 'all' && t.adoption !== adoptionFilter) return false;

            return true;
        });
    }, [search, stateFilter, statusFilter, riskFilter, adoptionFilter]);

    const stats = [
        { label: 'Total Territories', value: '234', sub: '36 states & UTs', icon: Database, color: 'text-indigo-600', bg: 'bg-indigo-50' },
        { label: 'Available', value: '162', sub: 'Open for subscription', icon: MapIcon, color: 'text-blue-600', bg: 'bg-blue-50' },
        { label: 'Subscribed', value: '40', sub: 'Pending review', icon: Clock, color: 'text-purple-600', bg: 'bg-purple-50' },
        { label: 'Reserved', value: '22', sub: 'Admin hold', icon: Info, color: 'text-orange-600', bg: 'bg-orange-50' },
        { label: 'Total MW Potential', value: '43.2 GW', sub: 'Across all territories', icon: Zap, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    ];

    const resetFilters = () => {
        setSearch('');
        setStateFilter('all');
        setStatusFilter('all');
        setRiskFilter('all');
        setAdoptionFilter('all');
    };

    return (
        <TooltipProvider>
            <div className="w-full min-h-screen bg-slate-50/50 p-4 md:p-8 pt-4 md:pt-6 font-sans selection:bg-indigo-100 animate-in fade-in duration-700">
                {/* Institutional Header with Navigation */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-6 mb-6 md:mb-8 px-2">
                    <div className="space-y-1">
                        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Territory Registry</h1>
                        <p className="text-[12px] text-slate-500 font-medium">
                            234 territories across 36 states & UTs · DeLEN Protocol Infrastructure Network
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                            <div className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
                            <span className="text-[10px] font-bold text-orange-500 uppercase tracking-widest">Connecting to database...</span>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                        <Button variant="outline" size="sm" className="h-9 px-4 rounded-lg font-bold text-[11px] bg-white border-slate-200 text-slate-600 shadow-sm">
                            <Download size={14} className="mr-2" /> Export CSV
                        </Button>
                        <Button variant="outline" size="sm" className="h-9 px-4 rounded-lg font-bold text-[11px] bg-white border-slate-200 text-slate-600 shadow-sm" onClick={() => navigate('/onboarding/infra-partner/territory-map')}>
                            <MapIcon size={14} className="mr-2" /> View on Map
                        </Button>
                        <Button variant="default" size="sm" className="h-9 px-4 rounded-lg font-bold text-[11px] bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm">
                            <Plus size={14} className="mr-2" /> Request Territory
                        </Button>
                    </div>
                </div>

                {/* Summary Statistics Grid (Figma Style) */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4 mb-6 md:mb-8">
                    {stats.map((s, i) => (
                        <div key={i} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow group relative overflow-hidden">
                            <div className="flex items-start justify-between relative z-10">
                                <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{s.label}</p>
                                    <h3 className="text-2xl font-black text-slate-900 tracking-tighter">{s.value}</h3>
                                    <p className="text-[10px] text-slate-400 font-medium mt-0.5">{s.sub}</p>
                                </div>
                                <div className={cn("p-2 rounded-lg", s.bg)}>
                                    <s.icon size={18} className={s.color} />
                                </div>
                            </div>
                            <div className="absolute top-0 right-0 p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <MoreHorizontal size={14} className="text-slate-300" />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Advanced Filter Bar (Figma Style) */}
                <div className="bg-white border border-slate-200 rounded-xl shadow-sm mb-4 md:mb-6 overflow-hidden">
                    <div className="p-2 flex flex-wrap items-center gap-2">
                        <div className="relative flex-1 min-w-[200px]">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                            <input
                                type="text"
                                placeholder="Search by territory ID, name, state..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full h-10 pl-12 pr-4 bg-slate-50/50 border border-slate-100 rounded-lg outline-none text-xs font-medium placeholder:text-slate-400"
                            />
                        </div>

                        <div className="flex items-center gap-2">
                            <select
                                value={stateFilter}
                                onChange={(e) => setStateFilter(e.target.value)}
                                className="h-10 px-4 bg-slate-50 border border-slate-200 rounded-lg text-[11px] font-bold text-slate-600 outline-none hover:bg-white transition-colors"
                            >
                                <option value="all">States & UTs</option>
                                {states.filter(s => s !== 'all').map(o => <option key={o} value={o}>{o}</option>)}
                            </select>

                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="h-10 px-4 bg-slate-50 border border-slate-200 rounded-lg text-[11px] font-bold text-slate-600 outline-none hover:bg-white transition-colors"
                            >
                                <option value="all">Statuses</option>
                                {['available', 'subscribed', 'reserved', 'allocated'].map(o => <option key={o} value={o}>{o.charAt(0).toUpperCase() + o.slice(1)}</option>)}
                            </select>

                            <select
                                value={adoptionFilter}
                                onChange={(e) => setAdoptionFilter(e.target.value)}
                                className="h-10 px-4 bg-slate-50 border border-slate-200 rounded-lg text-[11px] font-bold text-slate-600 outline-none hover:bg-white transition-colors"
                            >
                                <option value="all">Adoption Levels</option>
                                {['Low', 'Medium', 'High'].map(o => <option key={o} value={o}>{o}</option>)}
                            </select>

                            <select
                                value={riskFilter}
                                onChange={(e) => setRiskFilter(e.target.value)}
                                className="h-10 px-4 bg-slate-50 border border-slate-200 rounded-lg text-[11px] font-bold text-slate-600 outline-none hover:bg-white transition-colors"
                            >
                                <option value="all">Risk Profiles</option>
                                {['Low', 'Medium', 'High'].map(o => <option key={o} value={o}>{o}</option>)}
                            </select>
                        </div>

                        <div className="flex bg-slate-100 p-1 rounded-lg ml-auto">
                            <button
                                onClick={() => setView('table')}
                                className={cn("px-3 py-1.5 rounded-md text-[10px] font-bold transition-all", view === 'table' ? "bg-white text-slate-900 shadow-sm" : "text-slate-400")}
                            >
                                <Table2 size={12} className="inline mr-1.5" /> Table
                            </button>
                            <button
                                onClick={() => setView('cards')}
                                className={cn("px-3 py-1.5 rounded-md text-[10px] font-bold transition-all", view === 'cards' ? "bg-white text-slate-900 shadow-sm" : "text-slate-400")}
                            >
                                <LayoutGrid size={12} className="inline mr-1.5" /> Cards
                            </button>
                        </div>

                        <div className="px-3 border-l border-slate-200 ml-2">
                            <span className="text-[11px] font-bold text-slate-400"><span className="text-slate-900">{filtered.length}</span> of <span className="text-slate-900">{territories.length}</span> territories</span>
                        </div>
                    </div>
                </div>

                {/* Conservative Figma Registry Cards */}
                {view === 'cards' ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
                        {filtered.map((t) => {
                            const sc = (statusConfig as any)[t.status];
                            const rc = (riskConfig as any)[t.risk];

                            return (
                                <div
                                    key={t.id}
                                    className="group bg-white rounded-xl border border-slate-200 hover:border-indigo-600 transition-all duration-300 flex flex-col relative overflow-hidden shadow-sm hover:shadow-xl"
                                >
                                    <div className="p-4 flex-1 flex flex-col">
                                        {/* Top ID & Status Badge */}
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="text-[9px] font-bold text-indigo-400 tracking-wider font-mono uppercase">#{t.id}</span>
                                            <span className={cn("px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-tight border flex items-center gap-1", sc.bgClass, sc.textClass, sc.textClass.replace('text-', 'border-').replace('600', '200'))}>
                                                <div className={cn("w-1 h-1 rounded-full", sc.textClass.replace('text-', 'bg-'))} />
                                                {sc.label}
                                            </span>
                                        </div>

                                        {/* Identity Section */}
                                        <div className="mb-4">
                                            <h3 className="text-[13px] font-bold text-slate-900 group-hover:text-indigo-600 leading-tight mb-0.5 transition-colors truncate">
                                                {t.name}
                                            </h3>
                                            <div className="flex items-center gap-1.5">
                                                <Globe size={10} className="text-slate-300" />
                                                <span className="text-[10px] font-medium text-slate-400 truncate">{t.state}</span>
                                            </div>
                                        </div>

                                        {/* Dual Metric Columns (Figma Style) */}
                                        <div className="grid grid-cols-2 gap-2 mb-4 border-y border-slate-50 py-3">
                                            <div className="flex flex-col">
                                                <span className="text-[16px] font-black text-slate-900 leading-none">{t.mwPotential}</span>
                                                <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-1">MW POTENTIAL</span>
                                            </div>
                                            <div className="flex flex-col text-right">
                                                <span className="text-[16px] font-black text-slate-900 leading-none">{t.irradiance}</span>
                                                <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-1 text-right">kWh/m² Day</span>
                                            </div>
                                        </div>

                                        {/* Action Area (Figma Refined) */}
                                        <div className="mt-auto flex items-center justify-between">
                                            <div className={cn("px-2 py-1 rounded bg-slate-50 border border-slate-100 text-[8px] font-bold uppercase", rc.textClass)}>
                                                {t.risk} Risk
                                            </div>

                                            <div className="flex items-center gap-1.5">
                                                {/* <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="h-7 w-7 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-slate-50 border border-transparent hover:border-slate-100"
                                                            onClick={() => navigate(`/onboarding/infra-partner/territory/${t.id}`)}
                                                        >
                                                            <Eye size={12} />
                                                        </Button>
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        <p className="text-[10px]">View Detail Dossier</p>
                                                    </TooltipContent>
                                                </Tooltip> */}

                                                <Button
                                                    className={cn(
                                                        "h-7 px-3 rounded-lg text-[9px] font-black uppercase transition-all shadow-sm",
                                                        "bg-indigo-600 text-white hover:bg-indigo-700"
                                                    )}
                                                    onClick={() => navigate(`/onboarding/infra-partner/territories/${t.id}`)}
                                                >
                                                    <span className="flex items-center gap-1"><Plus size={10} /> View</span>
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden animate-in slide-in-from-bottom-2 duration-500">
                        <table className="w-full text-left">
                            <thead className="bg-slate-50 border-b border-slate-100">
                                <tr className="text-[10px] font-black text-slate-400 uppercase tracking-[0.1em]">
                                    <th className="px-8 py-4">Node ID</th>
                                    <th className="px-8 py-4">Identity & Location</th>
                                    <th className="px-8 py-4">Protocol Status</th>
                                    <th className="px-8 py-4">Performance Metrics</th>
                                    <th className="px-8 py-4 text-right">Registry Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {filtered.map((t) => (
                                    <tr key={t.id} className="group hover:bg-slate-50/50 transition-colors">
                                        <td className="px-8 py-4 font-mono text-[10px] font-bold text-slate-400 uppercase">#{t.id}</td>
                                        <td className="px-8 py-4">
                                            <div className="flex flex-col">
                                                <span className="font-bold text-slate-800 text-[13px]">{t.name}</span>
                                                <span className="text-[10px] font-medium text-slate-400 flex items-center gap-1 tracking-tight">
                                                    <Globe size={10} className="text-slate-200" /> {t.state}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-4">
                                            <span className={cn("px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-tight flex items-center w-fit gap-1", (statusConfig as any)[t.status].textClass)}>
                                                <div className={cn("w-1 h-1 rounded-full", (statusConfig as any)[t.status].textClass.replace('text-', 'bg-'))} />
                                                {(statusConfig as any)[t.status].label}
                                            </span>
                                        </td>
                                        <td className="px-8 py-4">
                                            <div className="flex items-center gap-6">
                                                <div className="flex flex-col">
                                                    <span className="text-xs font-black text-slate-900">{t.mwPotential} MW</span>
                                                    <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest leading-tight">POTENTIAL</span>
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-xs font-black text-slate-900">{t.irradiance} kWh</span>
                                                    <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest leading-tight">IRRADIANCE</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="h-8 px-4 rounded-lg font-bold text-[10px] uppercase border-slate-200 text-slate-600 hover:bg-slate-50"
                                                    onClick={() => navigate(`/onboarding/infra-partner/territories/${t.id}`)}
                                                >
                                                    View Profile
                                                </Button>
                                                <Button
                                                    variant="default"
                                                    size="sm"
                                                    disabled={t.status !== 'available'}
                                                    className="h-8 px-4 rounded-lg font-bold text-[10px] uppercase bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm"
                                                    onClick={() => t.status === 'available' && setRequestModalOpen(true)}
                                                >
                                                    {t.status === 'available' ? 'Request' : t.status}
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            <TerritoryRequestModal
                open={requestModalOpen}
                onClose={() => setRequestModalOpen(false)}
                territory={selectedTerritory}
            />
        </TooltipProvider>
    );
}
