import React, { useState, useEffect } from 'react';
import { useParams, Link, useLocation, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, MapPin, Zap, Sun, Wind, Battery, Shield, Info,
  LineChart, Users, Building2, Globe, Clock, CheckCircle2,
  Lock, Share2, Download, ExternalLink, ChevronRight, Play,
  BarChart3, FileText, AlertTriangle, Activity, Satellite, Layers,
  Database, ShieldCheck, ArrowUpRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { territories, statusConfig, riskConfig, type Territory } from '@/data/mockData';
import { cn } from '@/lib/utils';
import TerritoryRequestModal from '@/components/TerritoryRequestModal';

export default function TerritoryDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const fromSidebar = location.state?.fromSidebar;
  const territory = territories.find(t => t.id === id);
  const [activeTab, setActiveTab] = useState<'overview' | 'technical' | 'financial' | 'projects'>('overview');
  const [requestModalOpen, setRequestModalOpen] = useState(false);
  const [scanStatus, setScanStatus] = useState('IDLE');

  useEffect(() => {
    const t = setTimeout(() => setScanStatus('OPTIMAL'), 1200);
    return () => clearTimeout(t);
  }, []);

  if (!territory) return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
      <AlertTriangle size={48} className="text-status-red opacity-20" />
      <p className="font-display font-black text-xl text-muted-foreground uppercase tracking-widest text-center">Reference ID {id}<br />Null/Undefined</p>
      <Button onClick={() => navigate(-1)}>Back to Registry</Button>
    </div>
  );

  // Type-safe config access
  const sc = statusConfig[territory.status as keyof typeof statusConfig];
  const rc = riskConfig[territory.risk as keyof typeof riskConfig];

  return (
    <div className="px-4 py-6 md:p-10 max-w-[1400px] mx-auto space-y-8 md:space-y-10 bg-background pb-32">
      {/* Enterprise Header / Breadcrumbs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-border pb-6 gap-4">
        <div className="flex items-center gap-3 sm:gap-4">
          <Button variant="ghost" size="sm" className="h-9 w-9 sm:h-10 sm:w-10 p-0 rounded-xl hover:bg-surface-2" onClick={() => navigate(-1)}>
            <ArrowLeft size={18} />
          </Button>
          <div className="h-6 w-px bg-border/50 mx-1 sm:mx-2" />
          <div className="flex items-center gap-2 text-[10px] sm:text-[11px] font-black uppercase tracking-widest overflow-hidden">
            <Link to="/onboarding/infra-partner/territories" className="text-muted-foreground hover:text-primary transition-colors shrink-0">Registry</Link>
            <ChevronRight size={14} className="text-muted-foreground/30 shrink-0" />
            <span className="text-foreground truncate max-w-[150px] sm:max-w-none">{territory.name}</span>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-2 border border-border text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-60">
            <Satellite size={12} className={cn("transition-colors", scanStatus === 'OPTIMAL' ? 'text-status-green' : 'text-status-orange')} />
            LIDAR SCAN: <span className="hidden xs:inline">{scanStatus}</span>
          </div>
          <Button variant="outline" size="sm" className="h-9 sm:h-10 px-3 sm:px-6 rounded-xl border-border bg-surface-2 hover:bg-surface-3 transition-colors font-bold text-[10px] sm:text-xs">
            <Share2 size={14} className="sm:mr-2 opacity-50" /> <span className="hidden sm:inline">Dossier</span>
          </Button>
          <Button variant="outline" size="sm" className="h-9 sm:h-10 px-3 sm:px-6 rounded-xl border-border bg-surface-2 hover:bg-surface-3 transition-colors font-bold text-[10px] sm:text-xs text-status-green">
            <Download size={14} className="sm:mr-2" /> <span className="hidden sm:inline">Export JSON</span>
          </Button>
        </div>
      </div>

      {/* Hero Profile Design */}
      <div className="rounded-3xl lg:rounded-[2.5rem] p-6 sm:p-12 relative overflow-hidden hero-gradient border border-border shadow-2xl group">
        <div className="absolute inset-0 hero-glow-accent opacity-20" />
        <div className="absolute top-0 right-0 p-12 opacity-[0.03] select-none pointer-events-none hidden lg:block">
          <Globe size={400} className="text-foreground" />
        </div>

        <div className="relative z-10 flex flex-col lg:flex-row justify-between gap-8 lg:gap-12 items-start lg:items-end">
          <div className="space-y-4 sm:space-y-6 w-full lg:w-auto">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <div className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-widest",
                territory.status === 'available' ? 'bg-sky-50 dark:bg-sky-900/40 text-sky-600 dark:text-sky-400' :
                  territory.status === 'subscribed' ? 'bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400' :
                    territory.status === 'reserved' ? 'bg-orange-50 dark:bg-orange-900/40 text-orange-600 dark:text-orange-400' :
                      'bg-zinc-100 dark:bg-zinc-800/60 text-zinc-600 dark:text-zinc-400'
              )}>
                <div className={cn(
                  "w-1.5 h-1.5 rounded-full",
                  territory.status === 'available' ? 'bg-sky-500' :
                    territory.status === 'subscribed' ? 'bg-indigo-500' :
                      territory.status === 'reserved' ? 'bg-orange-500' :
                        'bg-zinc-500'
                )} />
                {sc.label}
              </div>
              <div className={cn(
                "px-3 py-1.5 rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-widest",
                territory.risk === 'Low' ? 'bg-emerald-50 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400' :
                  territory.risk === 'Medium' ? 'bg-violet-50 dark:bg-violet-900/40 text-violet-600 dark:text-violet-400' :
                    'bg-rose-50 dark:bg-rose-900/40 text-rose-600 dark:text-rose-400'
              )}>
                {territory.risk} RISK FACTOR
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-[10px] sm:text-[11px] font-black tracking-[0.3em] sm:tracking-[0.4em] text-primary uppercase ml-1">TERRITORY PROFILE // {territory.id}</p>
              <h1 className="font-display font-black text-3xl sm:text-5xl md:text-6xl text-foreground leading-[1.1] tracking-tighter">
                {territory.name}
              </h1>
              <p className="text-sm sm:text-lg text-muted-foreground font-medium flex items-center gap-2 sm:gap-3 mt-2 sm:mt-4 opacity-80">
                <MapPin size={18} className="text-primary shrink-0" /> {territory.state}, Republic of India
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-10 bg-surface/30 backdrop-blur-3xl border border-white/5 p-6 sm:p-10 rounded-[2rem] lg:rounded-[2.5rem] shadow-2xl w-full lg:min-w-[500px]">
            {[
              { label: 'ENERGY POTENTIAL', val: territory.mwPotential, unit: 'MW', icon: Zap, color: 'text-primary' },
              { label: 'SOLAR IRRADIANCE', val: territory.irradiance, unit: 'kWh/m²', icon: Sun, color: 'text-sky-400' },
              { label: 'SUBSCRIBER SLOTS', val: `${territory.assignedPartner ? '1' : '0'} / 3`, icon: Users, color: 'text-status-green' }
            ].map(item => (
              <div key={item.label} className="space-y-2 group/stat">
                <div className="flex items-center gap-2 mb-3">
                  <item.icon size={16} className={cn("opacity-60 group-hover:opacity-100 transition-opacity", item.color)} />
                  <p className="text-[9px] text-muted-foreground font-black tracking-[0.2em] uppercase opacity-60">{item.label}</p>
                </div>
                <p className="font-display font-black text-2xl sm:text-3xl text-foreground tracking-tighter">
                  {item.val} <span className="text-[10px] sm:text-xs font-bold text-muted-foreground opacity-50">{item.unit}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr,380px] gap-12">
        {/* Left: Detailed Analysis */}
        <div className="space-y-10">
          <div className="flex items-center gap-2 p-1 rounded-[1.25rem] bg-surface border border-border w-full sm:w-fit shadow-inner overflow-x-auto no-scrollbar">
            {(['overview', 'technical', 'financial', 'projects'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "px-4 sm:px-8 py-2.5 rounded-xl text-[10px] sm:text-[11px] font-black uppercase tracking-widest transition-all shrink-0",
                  activeTab === tab
                    ? 'bg-primary text-white shadow-xl shadow-primary/20 scale-105'
                    : 'text-muted-foreground hover:text-foreground hover:bg-surface-2'
                )}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="rounded-[1.5rem] lg:rounded-[2.5rem] bg-surface border border-border p-6 sm:p-12 shadow-2xl relative overflow-hidden min-h-[400px] sm:min-h-[500px]">
            {/* Decorative grid pattern */}
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

            {activeTab === 'overview' && (
              <div className="space-y-12 relative z-10">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-1.5 h-6 bg-primary rounded-full" />
                    <h3 className="text-xl font-black text-foreground uppercase tracking-tight">Geomorphological Assessment</h3>
                  </div>
                  <p className="text-[15px] text-muted-foreground leading-[1.8] font-medium opacity-90">
                    This territory in central {territory.state} exhibits prime geomorphological stability for utility-scale deployments.
                    Advanced topographical LIDAR analysis confirms {'>'}95% contiguous land availability with minimal shading coefficients.
                    The region is strategically positioned within the high-irradiance corridor of India, ensuring optimized performance for PV trackers.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
                  <div className="space-y-6 p-8 rounded-3xl bg-surface-2 border border-border/50 group hover:border-primary/20 transition-all">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-status-green/10 flex items-center justify-center">
                        <Layers size={20} className="text-status-green" />
                      </div>
                      <h4 className="text-[11px] font-black text-foreground uppercase tracking-widest">Protocol Advantages</h4>
                    </div>
                    <ul className="space-y-4">
                      {[
                        'Tier-1 Grid Connectivity (220kV Hub)',
                        'Optimized Shading Ratio (<0.4%)',
                        'Direct Protocol Yield Multiplier (1.2x)',
                        'Priority PPA Clearing Zone'
                      ].map((item, i) => (
                        <li key={i} className="flex items-center gap-4 text-xs text-foreground font-bold">
                          <CheckCircle2 size={16} className="text-status-green shrink-0" strokeWidth={3} /> {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-col justify-between">
                    <div className="p-8 rounded-3xl bg-surface-3 border border-border/50 space-y-4 relative overflow-hidden">
                      <Activity size={80} className="absolute -bottom-4 -right-4 text-primary opacity-5" />
                      <div className="flex items-center gap-3">
                        <Zap size={18} className="text-status-orange" />
                        <span className="text-[10px] font-black text-foreground uppercase tracking-widest italic">Live Telemetry</span>
                      </div>
                      <p className="text-[12px] text-muted-foreground font-medium leading-relaxed">
                        Infrastructure Review: {territory.status === 'available' ? 'OPEN' : 'LOCKED'}
                      </p>
                      <p className="text-[11px] text-muted-foreground/60 italic">
                        Subscription clearance window: 14 Business Days
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-4 mt-8">
                      {!fromSidebar && territory.status === 'available' && (
                        <Button size="lg" className="w-full sm:flex-1 h-14 bg-primary hover:bg-primary/90 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-primary/20 group" onClick={() => setRequestModalOpen(true)}>
                          Request Deployment <ArrowUpRight size={18} className="ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </Button>
                      )}
                      <Button variant="outline" size="lg" className="h-14 w-full sm:w-auto px-8 border-2 border-border text-foreground hover:bg-surface-2 rounded-2xl">
                        <Share2 size={18} />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {(['technical', 'financial', 'projects'] as string[]).includes(activeTab) && (
              <div className="py-24 text-center space-y-8 animate-in fade-in zoom-in duration-500">
                <div className="w-24 h-24 rounded-full bg-surface-2 border-2 border-dashed border-border flex items-center justify-center mx-auto">
                  <Database size={40} className="text-muted-foreground/20" />
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-black text-foreground uppercase tracking-tight">Accessing Secure Vault</h3>
                  <p className="text-sm text-muted-foreground max-w-md mx-auto font-medium leading-[1.6]">
                    High-resolution LIDAR models, legal land dossiers, and grid stability logs are under cryptographic seal.
                    <br /><span className="text-primary">Upgrade to Prime Account</span> or complete PQ assessment to unlock technical insights.
                  </p>
                </div>
                <Button variant="outline" className="h-12 border-2 rounded-xl text-[11px] font-black uppercase tracking-widest">
                  View Access Requirements
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Right: Technical Dossier Sidecard */}
        <div className="space-y-6 sm:space-y-8">
          <div className="rounded-[1.5rem] lg:rounded-[2rem] bg-surface-2 border-2 border-border p-6 sm:p-8 shadow-2xl space-y-6 sm:space-y-8 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <FileText size={48} />
            </div>

            <h3 className="text-[11px] font-black text-foreground uppercase tracking-[0.3em] flex items-center gap-3">
              <BarChart3 size={18} className="text-primary" /> Technical Metrics
            </h3>

            <div className="space-y-4">
              {[
                { label: 'Cloud Cover Index', value: '4.2%', sub: 'Optimized Yield' },
                { label: 'Transmission Efficiency', value: '98.4%', sub: 'Tier-1 Reliability' },
                { label: 'Grid Latency', value: '18ms', sub: 'High Stability' },
                { label: 'Surface Roughness', value: 'Low', sub: 'Flat Terrain' }
              ].map((metric, i) => (
                <div key={i} className="p-4 rounded-2xl bg-surface border border-border group-hover:border-primary/10 transition-colors">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] text-muted-foreground font-black uppercase tracking-widest opacity-60">{metric.label}</span>
                    <span className="text-sm font-black text-foreground">{metric.value}</span>
                  </div>
                  <p className="text-[10px] text-muted-foreground/60 italic">{metric.sub}</p>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-2xl bg-orange-soft/30 border border-status-orange/20 flex gap-4">
              <AlertTriangle size={20} className="text-status-orange shrink-0 mt-0.5" />
              <p className="text-[11px] text-status-orange/90 leading-[1.6] font-medium italic">
                Annual high-speed wind factor detected in Q2 (Apr-Jun). Automated PV protection protocols recommended for this sector.
              </p>
            </div>
          </div>

          <div className="rounded-[1.5rem] lg:rounded-[2rem] bg-primary/5 border border-primary/20 p-6 sm:p-8 space-y-6">
            <div className="flex items-center gap-3">
              <ShieldCheck size={20} className="text-primary" />
              <h4 className="text-[11px] font-black text-foreground uppercase tracking-widest">DeLEN Compliance</h4>
            </div>
            <p className="text-[11px] text-muted-foreground leading-relaxed font-medium">
              This territory is fully compliant with DeLEN Protocol v2.4 environmental and social safeguard standards.
            </p>
            <div className="h-0.5 w-full bg-primary/20 rounded-full" />
            <div className="flex justify-between items-center">
              <span className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">Trust Score</span>
              <span className="text-sm font-black text-primary uppercase">AAA Verified</span>
            </div>
          </div>
        </div>
      </div>

      <TerritoryRequestModal
        open={requestModalOpen}
        onClose={() => setRequestModalOpen(false)}
        territory={territory}
      />
    </div>
  );
}
