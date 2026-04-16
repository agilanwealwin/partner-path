import React, { useState } from 'react';
import {
    Search, Plus, Globe, Eye, Check, Lock, Info,
    Activity, Table2, LayoutGrid, X, ChevronRight, ShieldCheck
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { territories, statusConfig, riskConfig, type Territory } from '@/data/mockData';
import TerritoryRequestModal from '@/components/TerritoryRequestModal';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import { useOnboarding } from '@/hooks/use-onboarding';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export default function TerritorySelectionStage() {
    const navigate = useNavigate();
    const { onboardingData, updateData } = useOnboarding();

    // Filters & View State
    const [view, setView] = useState<'cards' | 'table'>('cards');
    const [search, setSearch] = useState('');
    const [stateFilter, setStateFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');
    const [riskFilter, setRiskFilter] = useState('all');
    const [capacityFilter, setCapacityFilter] = useState('all');
    const [irradianceFilter, setIrradianceFilter] = useState('all');

    // Modal State
    const [requestModalOpen, setRequestModalOpen] = useState(false);
    const [selectedTerritory, setSelectedTerritory] = useState<Territory | null>(null);

    const selectedIds = onboardingData.selectedTerritories || [];
    const states = ['all', ...Array.from(new Set(territories.map(t => t.state))).sort()];

    const filtered = territories.filter(t => {
        const searchMatch = !search ||
            t.name.toLowerCase().includes(search.toLowerCase()) ||
            t.id.toLowerCase().includes(search.toLowerCase());
        if (!searchMatch) return false;

        if (statusFilter !== 'all' && t.status !== statusFilter) return false;
        if (stateFilter !== 'all' && t.state !== stateFilter) return false;
        if (riskFilter !== 'all' && t.risk !== riskFilter) return false;

        if (capacityFilter !== 'all') {
            const mw = t.mwPotential;
            if (capacityFilter === 'small' && mw >= 100) return false;
            if (capacityFilter === 'medium' && (mw < 100 || mw > 200)) return false;
            if (capacityFilter === 'large' && mw <= 200) return false;
        }

        if (irradianceFilter !== 'all') {
            if (irradianceFilter === 'low' && t.irradiance >= 5.0) return false;
            if (irradianceFilter === 'high' && t.irradiance < 5.0) return false;
        }

        return true;
    });

    const toggleSelection = (id: string) => {
        const isQualified = onboardingData.qualifiedTerritoryIds?.includes(id);
        if (!isQualified) return;

        const newSelected = selectedIds.includes(id)
            ? selectedIds.filter((sid: string) => sid !== id)
            : [...selectedIds, id];
        updateData({ selectedTerritories: newSelected });
    };

    const handleConfirm = () => {
        navigate('/onboarding/infra-partner/status');
    };

    const resetFilters = () => {
        setSearch('');
        setStateFilter('all');
        setStatusFilter('all');
        setRiskFilter('all');
        setCapacityFilter('all');
        setIrradianceFilter('all');
    };

    return (
        <TooltipProvider>
            <div className="w-full min-h-screen bg-slate-50/30 font-sans selection:bg-indigo-100 animate-in fade-in duration-700">
                {/* Institutional Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 px-2">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2 mb-1">
                            <span className="h-1.5 w-8 bg-indigo-600 rounded-full" />
                            <span className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em]">Institutional Access</span>
                        </div>
                        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Territory Hub</h1>
                        <p className="text-sm text-slate-500 font-medium">Configure and reserve network nodes for infrastructure deployment.</p>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="flex bg-white shadow-sm border border-slate-200 p-1 rounded-xl">
                            <button
                                onClick={() => setView('cards')}
                                className={cn("p-2 rounded-lg transition-all", view === 'cards' ? "bg-slate-100 text-slate-900 shadow-inner" : "text-slate-400 hover:text-slate-600")}
                            >
                                <LayoutGrid size={18} />
                            </button>
                            <button
                                onClick={() => setView('table')}
                                className={cn("p-2 rounded-lg transition-all", view === 'table' ? "bg-slate-100 text-slate-900 shadow-inner" : "text-slate-400 hover:text-slate-600")}
                            >
                                <Table2 size={18} />
                            </button>
                        </div>

                        <Button
                            disabled={selectedIds.length === 0}
                            onClick={handleConfirm}
                            className={cn(
                                "h-11 px-6 rounded-xl font-bold text-sm transition-all duration-300 shadow-sm",
                                selectedIds.length > 0
                                    ? "bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-200"
                                    : "bg-white text-slate-400 border border-slate-200"
                            )}
                        >
                            Confirm {selectedIds.length} Assets <ChevronRight size={16} className="ml-2" />
                        </Button>
                    </div>
                </div>

                {/* Minimalist Professional Filter Bar */}
                <div className="bg-white border border-slate-200 rounded-2xl shadow-sm mb-10 overflow-hidden">
                    <div className="p-1 flex flex-wrap items-center">
                        <div className="relative flex-1 min-w-[200px] border-r border-slate-100">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                            <input
                                type="text"
                                placeholder="Search by region or ID..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full h-12 pl-12 pr-4 bg-transparent outline-none text-sm font-medium placeholder:text-slate-300"
                            />
                        </div>

                        <div className="flex flex-wrap items-center divide-x divide-slate-100">
                            {[
                                { label: 'State', val: stateFilter, set: setStateFilter, opt: states },
                                { label: 'Status', val: statusFilter, set: setStatusFilter, opt: ['all', 'available', 'subscribed', 'reserved', 'allocated'] },
                                { label: 'Risk', val: riskFilter, set: setRiskFilter, opt: ['all', 'Low', 'Medium', 'High'] },
                                { label: 'Capacity', val: capacityFilter, set: setCapacityFilter, opt: ['all', 'small', 'medium', 'large'] }
                            ].map((f, i) => (
                                <div key={i} className="px-4 py-2 group cursor-pointer hover:bg-slate-50/50 transition-colors">
                                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-tighter mb-0.5">{f.label}</label>
                                    <select
                                        value={f.val}
                                        onChange={(e) => f.set(e.target.value)}
                                        className="bg-transparent text-xs font-bold text-slate-700 outline-none cursor-pointer appearance-none pr-4"
                                    >
                                        {f.opt.map(o => <option key={o} value={o}>{o === 'all' ? `All ${f.label}` : o}</option>)}
                                    </select>
                                </div>
                            ))}

                            <div className="px-6 py-2 flex items-center">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={resetFilters}
                                    className="h-9 text-[10px] font-black uppercase text-indigo-600 hover:bg-indigo-50"
                                >
                                    Reset
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="px-1">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-2">
                            <h3 className="text-sm font-bold text-slate-700 uppercase tracking-widest">Inventory List</h3>
                            <span className="px-2 py-0.5 rounded-full bg-slate-100 text-[10px] font-bold text-slate-500">{filtered.length} results</span>
                        </div>
                        <div className="flex items-center gap-4 text-[11px] text-slate-400 font-medium">
                            <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-indigo-500" /> Selected</span>
                            <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-slate-200" /> Pending</span>
                        </div>
                    </div>

                    {view === 'cards' ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
                            {filtered.map((t) => {
                                const isSelected = selectedIds.includes(t.id);
                                const isQualified = onboardingData.qualifiedTerritoryIds?.includes(t.id);
                                const sc = (statusConfig as any)[t.status];
                                const rc = (riskConfig as any)[t.risk];

                                return (
                                    <div
                                        key={t.id}
                                        onClick={() => isQualified && toggleSelection(t.id)}
                                        className={cn(
                                            "group bg-white rounded-2xl border transition-all duration-300 flex flex-col relative overflow-hidden",
                                            isSelected
                                                ? "border-indigo-600 shadow-lg shadow-indigo-100 -translate-y-1"
                                                : isQualified
                                                    ? "border-slate-200 hover:border-indigo-300 hover:shadow-md cursor-pointer hover:-translate-y-1"
                                                    : "border-slate-100 opacity-80"
                                        )}
                                    >
                                        {/* Elegant Thin Status Indicator */}
                                        <div className={cn("h-1 w-full", sc.bgClass)} />

                                        <div className="p-5 flex-1 flex flex-col">
                                            {/* Top Info Bar */}
                                            <div className="flex items-center justify-between mb-4">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-[10px] font-bold text-slate-400 tracking-wider font-mono">#{t.id.split('-')[1]}</span>
                                                    {isQualified ? (
                                                        <span className={cn("px-2 py-0.5 rounded text-[9px] font-bold uppercase", sc.bgClass.replace('bg-', 'bg-').replace('soft', '20'), sc.textClass)}>
                                                            {sc.label}
                                                        </span>
                                                    ) : (
                                                        <Tooltip>
                                                            <TooltipTrigger asChild>
                                                                <span className="px-2 py-0.5 rounded bg-slate-50 text-slate-400 text-[9px] font-bold uppercase flex items-center gap-1">
                                                                    Gated <Lock size={8} />
                                                                </span>
                                                            </TooltipTrigger>
                                                            <TooltipContent>
                                                                <p className="text-[10px]">Registration Request Required</p>
                                                            </TooltipContent>
                                                        </Tooltip>
                                                    )}
                                                </div>
                                                <Checkbox
                                                    checked={isSelected}
                                                    disabled={!isQualified}
                                                    onCheckedChange={() => toggleSelection(t.id)}
                                                    className={cn(
                                                        "h-5 w-5 rounded-md border-slate-200 transition-all",
                                                        isSelected ? "bg-indigo-600 border-indigo-600" : "group-hover:border-indigo-300"
                                                    )}
                                                />
                                            </div>

                                            {/* Core Identity */}
                                            <div className="mb-6">
                                                <h3 className={cn(
                                                    "text-lg font-bold tracking-tight mb-1 transition-colors",
                                                    isSelected ? "text-indigo-600" : "text-slate-900 group-hover:text-indigo-600"
                                                )}>
                                                    {t.name}
                                                </h3>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1 uppercase tracking-wider">
                                                        <Globe size={11} className="text-slate-300" /> {t.state}
                                                    </span>
                                                    <div className="w-1 h-1 rounded-full bg-slate-200" />
                                                    <span className={cn("text-[10px] font-bold uppercase tracking-tighter", rc.textClass)}>
                                                        {t.risk} Risk
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Sophisticated Metrics */}
                                            <div className="flex flex-col gap-2.5 mb-8">
                                                <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-slate-50 border border-slate-100">
                                                    <div className="flex items-center gap-2">
                                                        <Activity size={14} className="text-slate-400" />
                                                        <span className="text-[11px] font-bold text-slate-500 uppercase">Capacity</span>
                                                    </div>
                                                    <span className="text-xs font-black text-slate-900">{t.mwPotential} MW</span>
                                                </div>
                                                <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-slate-50 border border-slate-100">
                                                    <div className="flex items-center gap-2">
                                                        <X size={14} className="text-slate-400 rotate-45" />
                                                        <span className="text-[11px] font-bold text-slate-500 uppercase">Irradiance</span>
                                                    </div>
                                                    <span className="text-xs font-black text-slate-900">{t.irradiance} kWh/m²</span>
                                                </div>
                                            </div>

                                            {/* Refined Action Area - Clear and Professional */}
                                            <div className="mt-auto pt-6 border-t border-slate-100 flex flex-col gap-4">
                                                {!isQualified && (
                                                    <div className="flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-slate-50 border border-slate-100 animate-pulse-slow">
                                                        <Lock size={12} className="text-slate-400" />
                                                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none">
                                                            Protocol Requirement Pending
                                                        </span>
                                                    </div>
                                                )}

                                                <div className="flex items-center gap-2">
                                                    <Button
                                                        variant={isQualified ? "ghost" : "default"}
                                                        size="sm"
                                                        className={cn(
                                                            "h-11 flex-1 rounded-2xl font-black text-[10px] uppercase transition-all shadow-sm",
                                                            isQualified
                                                                ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-100"
                                                                : "bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-100"
                                                        )}
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setSelectedTerritory(t);
                                                            setRequestModalOpen(true);
                                                        }}
                                                    >
                                                        {isQualified ? <ShieldCheck size={14} className="mr-2" /> : <Eye size={14} className="mr-2" />}
                                                        {isQualified ? 'Validated' : 'Register Now'}
                                                    </Button>

                                                    {isQualified && (
                                                        <Button
                                                            variant={isSelected ? "default" : "outline"}
                                                            size="sm"
                                                            className={cn(
                                                                "h-11 px-4 rounded-xl font-black text-[10px] uppercase transition-all shadow-md group/btn",
                                                                isSelected
                                                                    ? "bg-indigo-600 text-white hover:bg-indigo-700 border-transparent"
                                                                    : "border-slate-200 text-slate-400 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200"
                                                            )}
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                toggleSelection(t.id);
                                                            }}
                                                        >
                                                            {isSelected ? <Check size={16} /> : <Plus size={16} />}
                                                        </Button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Minimal Status Strip for Visual Grouping */}
                                        <div className={cn("h-0.5 w-full bg-slate-100", isSelected && "bg-indigo-600")} />
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                            <table className="w-full text-left">
                                <thead className="border-b border-slate-100">
                                    <tr className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                        <th className="px-6 py-4">Node ID</th>
                                        <th className="px-6 py-4">Territory Identity</th>
                                        <th className="px-6 py-4">Operational Status</th>
                                        <th className="px-6 py-4">Technicals</th>
                                        <th className="px-6 py-4 text-right">Commitment</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {filtered.map((t) => {
                                        const isSelected = selectedIds.includes(t.id);
                                        const isQualified = onboardingData.qualifiedTerritoryIds?.includes(t.id);
                                        return (
                                            <tr key={t.id} className={cn("group transition-colors", isSelected ? "bg-indigo-50/30" : "hover:bg-slate-50/50")}>
                                                <td className="px-6 py-4 font-mono text-[11px] font-bold text-slate-400">#{t.id}</td>
                                                <td className="px-6 py-4">
                                                    <div className="flex flex-col">
                                                        <span className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{t.name}</span>
                                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">{t.state}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={cn("px-2 py-0.5 rounded text-[9px] font-bold uppercase", (statusConfig as any)[t.status].textClass)}>
                                                        {t.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-4 text-[11px] font-black text-slate-700">
                                                        <span className="flex items-center gap-1"><Activity size={10} className="text-slate-300" /> {t.mwPotential} MW</span>
                                                        <span className="flex items-center gap-1"><X size={10} className="text-slate-300 rotate-45" /> {t.irradiance}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <Button
                                                        variant={isSelected ? "default" : "outline"}
                                                        size="sm"
                                                        disabled={!isQualified}
                                                        className={cn(
                                                            "h-8 px-4 rounded-lg font-bold text-[10px] uppercase transition-all",
                                                            isSelected ? "bg-indigo-600 text-white" : "border-slate-200 text-slate-600"
                                                        )}
                                                        onClick={() => toggleSelection(t.id)}
                                                    >
                                                        {isSelected ? 'Committed' : (isQualified ? 'Add to Scope' : 'Restricted')}
                                                    </Button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                {/* Footer Selection Summary (Sticky) */}
                {selectedIds.length > 0 && (
                    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-bottom-5">
                        <div className="bg-slate-900 text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-6 border border-white/10 backdrop-blur-md">
                            <div className="flex items-center gap-3 pr-6 border-r border-white/10">
                                <div className="h-8 w-8 rounded-lg bg-indigo-500 flex items-center justify-center">
                                    <Check size={18} />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs font-bold leading-none">{selectedIds.length} Assets Identified</span>
                                    <span className="text-[10px] text-white/50 font-medium mt-1">Ready for protocol commit</span>
                                </div>
                            </div>
                            <Button
                                onClick={handleConfirm}
                                className="bg-indigo-500 hover:bg-indigo-400 text-white font-bold h-10 px-6 rounded-xl transition-all"
                            >
                                Finalize Selections
                            </Button>
                        </div>
                    </div>
                )}

                <TerritoryRequestModal
                    open={requestModalOpen}
                    onClose={() => setRequestModalOpen(false)}
                    territory={selectedTerritory}
                />
            </div>
        </TooltipProvider>
    );
}
