import React, { useState } from 'react';
import {
  CheckCircle2, AlertTriangle, XCircle, Clock,
  Calendar, Bell, ChevronDown, User, MapPin, Zap, CheckCheck, Truck, CircleCheck, Globe
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { toast } from '@/components/ui/sonner';

// ─── Types ─────────────────────────────────────────────────────────────────
type AlertStatus = 'Open' | 'Acknowledged' | 'Dispatched' | 'Completed';

interface Alert {
  id: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  title: string;
  desc: string;
  time: string;
  project: string;
  location: string;
  assignee: string;
  category: string;
  status: AlertStatus;
  log: { time: string; msg: string }[];
}

// ─── Data ──────────────────────────────────────────────────────────────────
const initialAlerts: Alert[] = [
  {
    id: 'ALT-0041', severity: 'Critical',
    title: 'Inverter Overcurrent — Nellore RE Park',
    desc: 'String inverter #3 reporting sustained overcurrent above rated capacity. Immediate dispatch required.',
    time: '2h ago', project: 'Nellore RE Park Ph.1', location: 'Inverter Hall B, Row 3',
    assignee: 'Arjun Verma', category: 'Electrical Fault', status: 'Open',
    log: [{ time: '08:12 IST', msg: 'Alert triggered automatically by SCADA' }],
  },
  {
    id: 'ALT-0040', severity: 'High',
    title: 'Node Offline — NR-NODE-007',
    desc: 'Edge node offline since 06:14 IST. No heartbeat signal received. Possible connectivity or hardware failure.',
    time: '6h ago', project: 'Nellore RE Park Ph.1', location: 'Node Cabinet C7',
    assignee: 'Priya Patel', category: 'Connectivity', status: 'Open',
    log: [{ time: '06:14 IST', msg: 'Last heartbeat received' }],
  },
  {
    id: 'ALT-0039', severity: 'Medium',
    title: 'Panel Soiling — Thar Phase 2',
    desc: 'Quarterly panel cleaning due. PR degradation of 2.8% observed across modules M1–M48.',
    time: '1d ago', project: 'Thar Solar Farm Ph.2', location: 'Block A, Rows M1–M48',
    assignee: 'Field Team Thar', category: 'Maintenance', status: 'Acknowledged',
    log: [
      { time: 'Yesterday 09:00', msg: 'Alert triggered by PR analysis' },
      { time: 'Yesterday 10:30', msg: 'Acknowledged by Rahul Sharma' },
    ],
  },
  {
    id: 'ALT-0038', severity: 'Low',
    title: 'Firmware Update Available',
    desc: 'Edge node firmware v3.2.1 available for 48 nodes. Includes improved weather data accuracy.',
    time: '3d ago', project: 'All Projects', location: 'All Sites',
    assignee: 'DevOps Team', category: 'Software', status: 'Acknowledged',
    log: [
      { time: '3 days ago', msg: 'Firmware update released by vendor' },
      { time: '2 days ago', msg: 'Acknowledged by Priya Patel' },
    ],
  },
];

const severityConfig: Record<string, { cls: string; bgCls: string; borderCls: string; icon: React.ElementType }> = {
  Critical: { cls: 'text-status-red', bgCls: 'bg-red-soft', borderCls: 'border-l-status-red', icon: XCircle },
  High: { cls: 'text-status-orange', bgCls: 'bg-orange-soft', borderCls: 'border-l-status-orange', icon: AlertTriangle },
  Medium: { cls: 'text-status-orange', bgCls: 'bg-orange-soft', borderCls: 'border-l-yellow-400/60', icon: AlertTriangle },
  Low: { cls: 'text-muted-foreground', bgCls: 'bg-surface-3', borderCls: 'border-l-border', icon: Bell },
};

const statusConfig: Record<AlertStatus, { label: string; cls: string }> = {
  Open: { label: 'Open', cls: 'bg-red-soft text-status-red' },
  Acknowledged: { label: 'Acknowledged', cls: 'bg-orange-soft text-status-orange' },
  Dispatched: { label: 'Dispatched', cls: 'bg-blue-soft text-status-blue' },
  Completed: { label: 'Completed', cls: 'bg-green-soft text-status-green' },
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

// ─── Helpers ───────────────────────────────────────────────────────────────
function now() {
  return new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: false }) + ' IST';
}

// ─── Alert Ticket Card ─────────────────────────────────────────────────────
const severityGlow: Record<string, string> = {
  Critical: 'from-red-500/10 to-transparent',
  High: 'from-orange-500/10 to-transparent',
  Medium: 'from-yellow-500/8 to-transparent',
  Low: 'from-muted/10 to-transparent',
};

function AlertTicket({
  alert, expanded, onToggle, onAction,
}: {
  alert: Alert; expanded: boolean; onToggle: () => void;
  onAction: (id: string, action: 'acknowledge' | 'dispatch' | 'complete') => void;
}) {
  const sc = severityConfig[alert.severity];
  const st = statusConfig[alert.status];

  return (
    <div className={cn(
      'rounded-xl bg-surface overflow-hidden transition-shadow duration-200',
      'border border-border',
      expanded ? 'shadow-lg ring-1 ring-primary/10' : 'shadow-surface hover:shadow-lg'
    )}>
      {/* Severity colour bar + header */}
      <button
        onClick={onToggle}
        className={cn(
          'w-full text-left px-5 py-4 transition-colors',
          `bg-gradient-to-r ${severityGlow[alert.severity]}`,
          'hover:brightness-110'
        )}
      >
        {/* Top row: icon · severity · ticket id · status · time · chevron */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className={cn('flex items-center justify-center w-7 h-7 rounded-lg', sc.bgCls)}>
            <sc.icon size={15} className={sc.cls} />
          </div>
          <span className={cn('text-[13px] font-bold tracking-wide', sc.cls)}>{alert.severity}</span>
          <span className="text-xs font-mono text-muted-foreground bg-surface-2 px-2 py-0.5 rounded">{alert.id}</span>
          <span className={cn('px-2.5 py-0.5 rounded-full text-xs font-semibold', st.cls)}>{st.label}</span>
          <div className="ml-auto flex items-center gap-1.5">
            <Clock size={12} className="text-muted-foreground" />
            <span className="text-xs text-muted-foreground">{alert.time}</span>
            <div className={cn('ml-1 p-0.5 rounded transition-transform duration-200', expanded && 'rotate-180')}>
              <ChevronDown size={16} className="text-muted-foreground" />
            </div>
          </div>
        </div>

        {/* Title + project */}
        <div className="mt-3 flex items-start justify-between gap-4">
          <p className="text-[15px] font-semibold text-foreground leading-snug">{alert.title}</p>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <MapPin size={12} className="text-muted-foreground" />
          <span className="text-xs text-muted-foreground">{alert.project}</span>
          <span className="text-muted-foreground/30">·</span>
          <User size={12} className="text-muted-foreground" />
          <span className="text-xs text-muted-foreground">{alert.assignee}</span>
        </div>
      </button>

      {/* ── Expanded detail panel ── */}
      {expanded && (
        <div className="border-t border-border bg-surface/60 px-5 pb-5 pt-4 space-y-4">
          {/* Description */}
          <p className="text-sm text-muted-foreground leading-relaxed border-l-2 border-primary/30 pl-3">{alert.desc}</p>

          {/* Meta chips */}
          <div className="flex flex-wrap gap-2">
            {[
              { icon: MapPin, label: 'Location', value: alert.location, color: 'text-status-blue' },
              { icon: Zap, label: 'Category', value: alert.category, color: 'text-status-orange' },
              { icon: User, label: 'Assignee', value: alert.assignee, color: 'text-primary' },
            ].map(({ icon: Icon, label, value, color }) => (
              <div key={label} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-surface-2 border border-border text-xs">
                <Icon size={13} className={color} />
                <span className="text-muted-foreground">{label}:</span>
                <span className="text-foreground font-medium">{value}</span>
              </div>
            ))}
          </div>

          {/* Vertical timeline activity log */}
          <div className="space-y-0">
            <p className="text-xs text-muted-foreground uppercase tracking-widest mb-3">Activity Log</p>
            <div className="relative pl-5">
              {/* vertical line */}
              <div className="absolute left-[6px] top-0 bottom-0 w-px bg-border" />
              <div className="space-y-3">
                {alert.log.map((entry, i) => (
                  <div key={i} className="flex items-start gap-3 relative">
                    <div className={cn(
                      'absolute -left-[12px] mt-1 w-3.5 h-3.5 rounded-full border-2 shrink-0',
                      i === alert.log.length - 1
                        ? 'bg-primary border-primary'
                        : 'bg-surface border-border'
                    )} />
                    <div className="pl-1">
                      <p className="text-[11px] font-mono text-muted-foreground/70">{entry.time}</p>
                      <p className="text-[13px] text-foreground mt-0.5">{entry.msg}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Action buttons based on current status */}
          <div className="flex items-center gap-2 pt-2 border-t border-border">
            {alert.status === 'Open' && (
              <>
                <Button size="xs" variant="outline" onClick={() => onAction(alert.id, 'acknowledge')}>
                  <CheckCircle2 size={11} /> Acknowledge
                </Button>
                {(alert.severity === 'Critical' || alert.severity === 'High') && (
                  <Button size="xs" variant="destructive" onClick={() => onAction(alert.id, 'dispatch')}>
                    <Truck size={11} /> Dispatch
                  </Button>
                )}
              </>
            )}
            {alert.status === 'Acknowledged' && (
              <>
                <Button size="xs" variant="outline" onClick={() => onAction(alert.id, 'dispatch')}>
                  <Truck size={11} /> Dispatch Team
                </Button>
                <Button size="xs" onClick={() => onAction(alert.id, 'complete')}>
                  <CheckCheck size={11} /> Mark Completed
                </Button>
              </>
            )}
            {alert.status === 'Dispatched' && (
              <Button size="xs" onClick={() => onAction(alert.id, 'complete')}>
                <CircleCheck size={11} /> Mark as Completed
              </Button>
            )}
            {alert.status === 'Completed' && (
              <span className="flex items-center gap-1.5 text-sm text-status-green font-medium">
                <CheckCircle2 size={15} /> Resolved — No further action required
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────
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
  const [alerts, setAlerts] = useState<Alert[]>(initialAlerts);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<AlertStatus | 'All'>('All');

  const handleToggle = (id: string) => setExpandedId(prev => prev === id ? null : id);

  const handleAction = (id: string, action: 'acknowledge' | 'dispatch' | 'complete') => {
    const nextStatus: Record<string, AlertStatus> = {
      acknowledge: 'Acknowledged',
      dispatch: 'Dispatched',
      complete: 'Completed',
    };
    const logMsg: Record<string, string> = {
      acknowledge: 'Acknowledged by you',
      dispatch: 'Field team dispatched',
      complete: 'Marked as completed',
    };
    const toastMsg: Record<string, string> = {
      acknowledge: 'Alert Acknowledged',
      dispatch: 'Team Dispatched',
      complete: 'Alert Resolved',
    };
    const toastDesc: Record<string, string> = {
      acknowledge: 'The alert has been acknowledged and is under review.',
      dispatch: 'Field team has been dispatched to the site.',
      complete: 'Alert marked as completed and closed.',
    };

    setAlerts(prev => prev.map(a => {
      if (a.id !== id) return a;
      return {
        ...a,
        status: nextStatus[action],
        log: [...a.log, { time: now(), msg: logMsg[action] }],
      };
    }));

    if (action === 'complete') {
      toast.success(toastMsg[action], { description: toastDesc[action] });
    } else if (action === 'dispatch') {
      toast(toastMsg[action], { description: toastDesc[action], icon: '🚐' });
    } else {
      toast(toastMsg[action], { description: toastDesc[action], icon: '✅' });
    }
  };

  const openCount = alerts.filter(a => a.status === 'Open').length;
  const filteredAlerts = statusFilter === 'All' ? alerts : alerts.filter(a => a.status === statusFilter);

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
      {openCount > 0 && (
        <div className="rounded-card p-3 bg-orange-soft border border-status-orange/20 flex items-center gap-2">
          <AlertTriangle size={14} className="text-status-orange" />
          <span className="text-[12px] text-status-orange font-medium">{openCount} active alert{openCount > 1 ? 's' : ''} requiring attention</span>
        </div>
      )}

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
                  <span className={cn('px-1.5 py-0.5 rounded-md text-[10px]',
                    p.status === 'Normal' ? 'bg-green-soft text-status-green' :
                      p.status === 'Alert' ? 'bg-orange-soft text-status-orange' : 'bg-surface-3 text-muted-foreground'
                  )}>{p.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Alerts + Maintenance */}
      <div className="flex gap-4">
        {/* Alerts */}
        <div className="flex-1 space-y-3 min-w-0">
          <div className="flex items-center justify-between">
            <span className="section-label">Active Alerts</span>
            {/* Status filter pills */}
            <div className="flex gap-1">
              {(['All', 'Open', 'Acknowledged', 'Dispatched', 'Completed'] as const).map(f => (
                <button
                  key={f}
                  onClick={() => setStatusFilter(f)}
                  className={cn(
                    'px-3 py-1 rounded-lg text-xs font-medium transition-colors',
                    statusFilter === f ? 'bg-accent-soft text-primary' : 'text-muted-foreground hover:bg-surface-2 hover:text-foreground'
                  )}
                >{f}</button>
              ))}
            </div>
          </div>

          {filteredAlerts.length === 0 && (
            <div className="rounded-card bg-surface p-6 text-center text-[12px] text-muted-foreground">
              No alerts with status "{statusFilter}"
            </div>
          )}

          {filteredAlerts.map(a => (
            <AlertTicket
              key={a.id}
              alert={a}
              expanded={expandedId === a.id}
              onToggle={() => handleToggle(a.id)}
              onAction={handleAction}
            />
          ))}
        </div>

        {/* Maintenance Schedule */}
        <div className="w-[280px] shrink-0">
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
                  <span className={cn('text-[9px] px-1 py-0.5 rounded-md mt-0.5 inline-block',
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
