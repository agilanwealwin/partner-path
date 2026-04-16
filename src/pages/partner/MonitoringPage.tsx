import React from 'react';
import {
  CheckCircle2, AlertTriangle, XCircle, Clock, Activity, Wrench,
  Calendar, Bell, Globe
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const alerts = [
  { severity: 'Critical', title: 'Inverter Overcurrent — Nellore RE Park', desc: 'String inverter #3 reporting sustained overcurrent above rated capacity. Immediate dispatch required.', time: '2h ago', project: 'Nellore RE Park Ph.1' },
  { severity: 'High', title: 'Node Offline — NR-NODE-007', desc: 'Edge node offline since 06:14 IST. No heartbeat signal received. Possible connectivity or hardware failure.', time: '6h ago', project: 'Nellore RE Park Ph.1' },
  { severity: 'Medium', title: 'Panel Soiling — Thar Phase 2', desc: 'Quarterly panel cleaning due. PR degradation of 2.8% observed across modules M1–M48.', time: '1d ago', project: 'Thar Solar Farm Ph.2' },
  { severity: 'Low', title: 'Firmware Update Available', desc: 'Edge node firmware v3.2.1 available for 48 nodes. Includes improved weather data accuracy.', time: '3d ago', project: 'All Projects' },
];

const severityConfig: Record<string, { cls: string; bgCls: string; icon: React.ElementType }> = {
  Critical: { cls: 'text-status-red', bgCls: 'bg-red-soft', icon: XCircle },
  High: { cls: 'text-status-orange', bgCls: 'bg-orange-soft', icon: AlertTriangle },
  Medium: { cls: 'text-status-orange', bgCls: 'bg-orange-soft', icon: AlertTriangle },
  Low: { cls: 'text-muted-foreground', bgCls: 'bg-surface-3', icon: Bell },
};

const portfolioData = [
  { project: 'Thar Solar Farm Ph.2', capacity: '12.4 MW', pr: '82.4%', cuf: '22.1%', availability: '99.2%', status: 'Normal' },
  { project: 'Bikaner Solar Park', capacity: '8.0 MW', pr: '80.1%', cuf: '21.8%', availability: '99.5%', status: 'Normal' },
  { project: 'Anantapur Agri-PV', capacity: '3.0 MW', pr: '78.9%', cuf: '20.4%', availability: '98.1%', status: 'Normal' },
  { project: 'Nellore RE Park Ph.1', capacity: '15.0 MW', pr: '71.2%', cuf: '19.1%', availability: '95.4%', status: 'Alert' },
  { project: 'Pune Rooftop Portfolio', capacity: '2.1 MW', pr: '—', cuf: '—', availability: '—', status: 'Commissioning' },
];

const maintenanceSchedule = [
  { date: 'Mar 25', task: 'Panel Cleaning — Thar Phase 2', type: 'Preventive' },
  { date: 'Mar 28', task: 'Inverter Inspection — Nellore', type: 'Corrective' },
  { date: 'Apr 1', task: 'Annual Transformer Maintenance', type: 'Preventive' },
  { date: 'Apr 5', task: 'Module IV Testing — Bikaner', type: 'Preventive' },
];

export default function MonitoringPage() {
  const [territoryFilter, setTerritoryFilter] = React.useState('All');

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
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-display font-bold text-2xl text-foreground">O&M Monitoring</h1>
          <p className="text-sm text-muted-foreground mt-1">Operations and maintenance overview · All projects</p>
        </div>
        <div className="flex gap-2">
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
          <Button variant="outline" size="sm"><Calendar size={14} /> Date Range</Button>
        </div>
      </div>

      {/* Live Banner */}
      <div className="rounded-card p-3 bg-orange-soft border border-status-orange/20 flex items-center gap-2">
        <AlertTriangle size={14} className="text-status-orange" />
        <span className="text-[12px] text-status-orange font-medium">3 active alerts requiring attention</span>
      </div>

      {/* Portfolio Performance */}
      <div className="rounded-card bg-surface shadow-surface overflow-hidden">
        <div className="px-5 py-3 border-b border-border">
          <span className="section-label">Portfolio Performance</span>
        </div>
        <table className="w-full text-[12px]">
          <thead>
            <tr className="border-b border-border">
              {['Project', 'Capacity', 'PR', 'CUF', 'Availability', 'Status'].map(h => (
                <th key={h} className="text-left px-4 py-2.5 text-[10px] uppercase tracking-wider text-muted-foreground font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {portfolioData.map(p => (
              <tr key={p.project} className="border-b border-border last:border-0 hover:bg-[rgba(255,255,255,0.02)]">
                <td className="px-4 py-2.5 text-foreground font-medium">{p.project}</td>
                <td className="px-4 py-2.5 font-mono text-foreground">{p.capacity}</td>
                <td className="px-4 py-2.5 font-mono text-foreground">{p.pr}</td>
                <td className="px-4 py-2.5 font-mono text-foreground">{p.cuf}</td>
                <td className="px-4 py-2.5 font-mono text-foreground">{p.availability}</td>
                <td className="px-4 py-2.5">
                  <span className={cn("px-1.5 py-0.5 rounded-md text-[10px]",
                    p.status === 'Normal' ? 'bg-green-soft text-status-green' :
                      p.status === 'Alert' ? 'bg-orange-soft text-status-orange' : 'bg-surface-3 text-muted-foreground'
                  )}>{p.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Alerts + Maintenance side by side */}
      <div className="flex gap-4">
        <div className="flex-1 space-y-3">
          <span className="section-label">Active Alerts</span>
          {alerts.map((a, i) => {
            const sc = severityConfig[a.severity];
            return (
              <div key={i} className={cn("rounded-card bg-surface p-4 shadow-surface border-l-4", a.severity === 'Critical' ? 'border-l-status-red' : a.severity === 'High' ? 'border-l-status-orange' : 'border-l-border')}>
                <div className="flex items-center gap-2 mb-1">
                  <sc.icon size={12} className={sc.cls} />
                  <span className={cn("text-[10px] font-medium", sc.cls)}>{a.severity}</span>
                  <span className="text-[9px] text-muted-foreground ml-auto">{a.time}</span>
                </div>
                <p className="text-[12px] font-medium text-foreground">{a.title}</p>
                <p className="text-[10px] text-muted-foreground mt-1">{a.desc}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-[9px] text-muted-foreground font-mono">{a.project}</span>
                  <div className="flex gap-1 ml-auto">
                    <Button variant="outline" size="xs">Acknowledge</Button>
                    {a.severity === 'Critical' && <Button size="xs" variant="destructive">Dispatch</Button>}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="w-[300px] shrink-0">
          <span className="section-label mb-3 block">Maintenance Schedule</span>
          <div className="rounded-card bg-surface p-4 shadow-surface space-y-3">
            {maintenanceSchedule.map((m, i) => (
              <div key={i} className="flex gap-3 pb-3 border-b border-border last:border-0 last:pb-0">
                <div className="w-10 h-10 rounded-lg bg-surface-2 flex flex-col items-center justify-center shrink-0">
                  <span className="text-[8px] text-muted-foreground uppercase">{m.date.split(' ')[0]}</span>
                  <span className="text-[11px] font-bold text-foreground">{m.date.split(' ')[1]}</span>
                </div>
                <div>
                  <p className="text-[11px] text-foreground">{m.task}</p>
                  <span className={cn("text-[9px] px-1 py-0.5 rounded-md mt-0.5 inline-block",
                    m.type === 'Corrective' ? 'bg-orange-soft text-status-orange' : 'bg-blue-soft text-status-blue'
                  )}>{m.type}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
