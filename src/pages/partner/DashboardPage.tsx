import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import type { LucideIcon } from 'lucide-react';
import {
  FolderKanban, Zap, Radio, Activity, Coins, TrendingUp, TrendingDown,
  SlidersHorizontal, Plus, Sun, Wind, CheckCircle2, AlertTriangle,
  Clock, Eye, Globe
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { projects, partnerInfo, type Project } from '@/data/mockData';
import { cn } from '@/lib/utils';

const projectStatusConfig: Record<string, { textClass: string; bgClass: string; icon: LucideIcon }> = {
  Live: { textClass: 'text-status-green', bgClass: 'bg-green-soft', icon: CheckCircle2 },
  'EPC Phase': { textClass: 'text-primary', bgClass: 'bg-accent-soft', icon: Clock },
  Commissioning: { textClass: 'text-primary', bgClass: 'bg-accent-soft', icon: Clock },
  Maintenance: { textClass: 'text-status-orange', bgClass: 'bg-orange-soft', icon: AlertTriangle },
  Prospect: { textClass: 'text-muted-foreground', bgClass: 'bg-surface-3', icon: Eye },
};

const iconMap = { sun: Sun, wind: Wind, zap: Zap };

const kpis = [
  { icon: FolderKanban, label: 'TOTAL PROJECTS', value: partnerInfo.totalProjects, sub: '+3 vs last quarter', subIcon: TrendingUp, subColor: 'text-status-green' },
  { icon: Zap, label: 'TOTAL MW DEPLOYED', value: `${partnerInfo.totalMW} MW`, sub: '+12.4 MW added this year', subIcon: TrendingUp, subColor: 'text-status-green' },
  { icon: Radio, label: 'ACTIVE EDGE NODES', value: partnerInfo.activeNodes, sub: `${partnerInfo.offlineNodes} offline nodes`, subIcon: TrendingDown, subColor: 'text-status-red' },
  { icon: Activity, label: 'ENERGY GENERATED YTD', value: partnerInfo.energyYTD, sub: '+8.2% vs same period last year', subIcon: TrendingUp, subColor: 'text-status-green' },
];

const nodeHealthItems = [
  { id: 'TH2-NODE-001', project: 'Thar Phase 2', value: '12.1 kWh', status: 'green' },
  { id: 'TH2-NODE-022', project: 'Thar Phase 2', value: '11.8 kWh', status: 'green' },
  { id: 'NR-NODE-003', project: 'Nellore RT', value: 'Degraded', status: 'amber' },
  { id: 'NR-NODE-007', project: 'Offline since 06:14 IST', value: 'Offline', status: 'red' },
];

export default function DashboardPage() {
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [territoryFilter, setTerritoryFilter] = useState<string>('All');

  const territories = [
    'All',
    'Uttar Pradesh Territory 1',
    'Uttar Pradesh Territory 2',
    'Rajasthan Territory 4',
    'Gujarat Territory 3',
    'Andhra Pradesh Territory 5',
    'Karnataka Territory 1',
    'Tamil Nadu Territory 2'
  ];

  const filteredProjects = projects.filter(p =>
    statusFilter === 'All' ? true : p.status === statusFilter
  );

  const statuses = ['All', ...Object.keys(projectStatusConfig)];

  return (
    <div className="p-4 md:p-6 space-y-4 md:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="font-display font-bold text-xl md:text-2xl text-foreground">Partner Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-1">Portfolio overview — Q1 2025 · Synced with DeLEN Protocol v2.4</p>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2 bg-surface shadow-sm border-border/50 hover:border-primary/30 transition-all">
              <Globe size={14} className="text-primary" />
              <span className="text-xs font-medium">{territoryFilter === 'All' ? 'Global View' : territoryFilter}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <div className="px-2 py-1.5 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Select Territory</div>
            {territories.map(t => (
              <DropdownMenuItem
                key={t}
                onClick={() => setTerritoryFilter(t)}
                className={cn(territoryFilter === t && "bg-accent text-accent-foreground")}
              >
                {t === 'All' ? 'All Territories' : t}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex flex-col xl:flex-row gap-4 xl:gap-6">
        {/* Main Content */}
        <div className="flex-1 space-y-6 min-w-0">
          {/* KPIs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {kpis.map((kpi) => (
              <div key={kpi.label} className="rounded-card bg-surface p-4 shadow-surface">
                <div className="flex items-center gap-2 mb-2">
                  <kpi.icon size={16} className="text-muted-foreground" />
                  <span className="section-label">{kpi.label}</span>
                </div>
                <p className="font-display font-bold text-2xl text-foreground animate-count-up">{kpi.value}</p>
                <div className="flex items-center gap-1 mt-1">
                  <kpi.subIcon size={12} className={kpi.subColor} />
                  <span className={cn("text-[11px]", kpi.subColor)}>{kpi.sub}</span>
                </div>
              </div>
            ))}
          </div>

          {/* DLN Rewards Card */}
          <div className="rounded-card bg-surface p-5 shadow-surface border border-status-orange/10">
            <div className="flex items-center gap-2 mb-2">
              <Coins size={20} className="text-status-orange" />
              <span className="section-label text-status-orange">DLN REWARDS EARNED YTD</span>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
              <div>
                <p className="font-display font-bold text-3xl text-status-orange animate-count-up">{partnerInfo.dlnEarnedYTD} DLN</p>
                <p className="text-xs text-muted-foreground mt-1">+{partnerInfo.dlnThisMonth} DLN this month · ≈ $284,600 USD</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-status-orange">Next distribution: Apr 1, 2025</p>
                <p className="text-[10px] text-muted-foreground">15 days</p>
              </div>
            </div>
          </div>

          {/* Project Portfolio */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <p className="section-label">Project Portfolio</p>
              <div className="flex gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="xs">
                      <SlidersHorizontal size={12} /> {statusFilter === 'All' ? 'Filter' : statusFilter}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-40">
                    {statuses.map(status => (
                      <DropdownMenuItem
                        key={status}
                        onClick={() => setStatusFilter(status)}
                        className={cn(statusFilter === status && "bg-accent text-accent-foreground")}
                      >
                        {status}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button variant="link" size="xs" onClick={() => navigate('/partner/projects')} className="text-primary hover:text-primary/80">View All</Button>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {filteredProjects.slice(0, 4).map((p) => {
                const sc = projectStatusConfig[p.status];
                const Icon = iconMap[p.icon];
                return (
                  <div key={p.id} className="rounded-card bg-surface p-4 shadow-surface hover:shadow-surface-hover transition-all cursor-pointer group">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-accent-soft flex items-center justify-center">
                          <Icon size={16} className="text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">{p.name}</p>
                          <p className="text-[10px] text-muted-foreground">{p.location}, {p.state} · {p.type}</p>
                        </div>
                      </div>
                      <span className={cn("inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[10px]", sc.bgClass, sc.textClass)}>
                        <sc.icon size={10} /> {p.status}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-3 text-[11px]">
                      <div><span className="text-muted-foreground">Capacity:</span> <span className="text-foreground font-mono">{p.capacity}</span></div>
                      <div><span className="text-muted-foreground">Nodes:</span> <span className="text-foreground font-mono">{p.nodes}</span></div>
                      <div><span className="text-muted-foreground">Energy:</span> <span className="text-foreground font-mono">{p.energyYTD}</span></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-full xl:w-[280px] shrink-0 space-y-4">
          {/* Protocol Status */}
          <div className="rounded-card bg-surface p-4 shadow-surface">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-foreground">DeLEN Protocol Status</span>
              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-green-soft text-status-green text-[10px]">
                <span className="w-1.5 h-1.5 rounded-full bg-status-green" /> Mainnet
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-[10px] text-muted-foreground uppercase">Network Nodes</p>
                <p className="font-display font-bold text-foreground">12,481</p>
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground uppercase">Protocol Uptime</p>
                <p className="font-display font-bold text-foreground">99.97%</p>
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground uppercase">Total MW Online</p>
                <p className="font-display font-bold text-foreground">2,840</p>
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground uppercase">DLN Price</p>
                <p className="font-display font-bold text-foreground">$1.996</p>
              </div>
            </div>
            <p className="text-[9px] text-muted-foreground mt-3">Last sync: 2 min ago</p>
          </div>

          {/* Node Health */}
          <div className="rounded-card bg-surface p-4 shadow-surface">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-foreground">Node Health Summary</span>
              <span className="font-mono text-[10px] px-1.5 py-0.5 rounded-md bg-surface-3 text-muted-foreground">312</span>
            </div>
            <div className="space-y-2.5">
              {nodeHealthItems.map((n) => (
                <div key={n.id} className="flex items-center gap-2.5">
                  <span className={cn("w-2 h-2 rounded-full shrink-0",
                    n.status === 'green' ? 'bg-status-green' : n.status === 'amber' ? 'bg-status-orange' : 'bg-status-red'
                  )} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[11px] text-foreground">{n.id}</span>
                      <span className={cn("text-[10px] font-mono",
                        n.status === 'green' ? 'text-status-green' : n.status === 'amber' ? 'text-status-orange' : 'text-status-red'
                      )}>{n.value}</span>
                    </div>
                    <p className="text-[9px] text-muted-foreground">{n.project}</p>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={() => navigate('/partner/nodes')}
              className="text-[11px] text-primary hover:underline mt-3 block"
            >
              View All Nodes →
            </button>
          </div>

          {/* Maintenance Alerts */}
          <div className="rounded-card bg-surface p-4 shadow-surface">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-foreground">Maintenance Alerts</span>
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] px-1.5 py-0.5 rounded-md bg-red-soft text-status-red">3</span>
                <Button
                  variant="link"
                  size="xs"
                  onClick={() => navigate('/partner/monitoring')}
                  className="text-primary p-0 h-auto text-[10px]"
                >
                  view all
                </Button>
              </div>
            </div>
            <div className="space-y-2.5">
              {[
                { title: 'Inverter Fault Detected', desc: 'String inverter #3 at Nellore RE Park reporting overcurrent...', time: '2h ago' },
                { title: 'Panel Cleaning Due', desc: 'Thar Solar Farm Phase 2 — quarterly maintenance schedule...', time: '1d ago' },
                { title: 'Firmware Update Available', desc: 'Edge nodes v3.2.1 available for 48 nodes at Thar cluster...', time: '3d ago' },
              ].map((a, i) => (
                <div key={i} className="p-2.5 rounded-lg bg-surface-2 border-l-2 border-l-status-orange">
                  <p className="text-[11px] font-medium text-foreground">{a.title}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5 line-clamp-2">{a.desc}</p>
                  <p className="text-[9px] text-muted-foreground mt-1">{a.time}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
