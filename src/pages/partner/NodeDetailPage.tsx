import React from 'react';
import { useParams, Link } from 'react-router-dom';
import {
    ArrowLeft, RefreshCw, Cpu, Activity, Signal, Clock,
    MapPin, CheckCircle2, AlertTriangle, XCircle, Shield,
    Settings, History, AlertCircle, Terminal, HardDrive, Download
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

// Mock data for the node detail
const nodeMetadata = {
    id: 'TH2-NODE-001',
    project: 'Thar Solar Farm Ph.2',
    location: 'Jaisalmer, RJ',
    coords: '26.9124° N, 70.9126° E',
    status: 'Online',
    type: 'DeLEN Pi-Gateway V4',
    installDate: 'Oct 12, 2023',
    firmware: 'v3.2.0 (Stable)',
    ip: '10.0.12.84',
    mac: '00:1A:2B:3C:4D:5E',
    uptime: '142d 6h 12m',
    health: 98,
    latency: '42ms',
    signal: -64,
    cpu: 24,
    memory: 42
};

const activeAlerts = [
    { id: 'AL-924', type: 'Warning', msg: 'Ambient temperature exceeding 45°C threshold', time: '12 min ago', priority: 'Medium' },
    { id: 'AL-921', type: 'Info', msg: 'Scheduled diagnostic scan in progress', time: '4h ago', priority: 'Low' },
];

const workLogs = [
    { id: 'LOG-882', action: 'Firmware Update', actor: 'System Auto-Update', date: 'Mar 24, 2024', status: 'Success' },
    { id: 'LOG-876', action: 'Manual Reboot', actor: 'Arjun K. (Site Eng)', date: 'Mar 18, 2024', status: 'Success' },
    { id: 'LOG-864', action: 'Hardware Validation', actor: 'Site Maintenance', date: 'Feb 12, 2024', status: 'Completed' },
    { id: 'LOG-852', action: 'Initial Provisioning', actor: 'DeLEN Core', date: 'Oct 12, 2023', status: 'Success' },
];

const statusCfg: Record<string, { icon: React.ElementType; cls: string; bgCls: string }> = {
    Online: { icon: CheckCircle2, cls: 'text-status-green', bgCls: 'bg-green-soft' },
    Degraded: { icon: AlertTriangle, cls: 'text-status-orange', bgCls: 'bg-orange-soft' },
    Offline: { icon: XCircle, cls: 'text-status-red', bgCls: 'bg-red-soft' },
};

export default function NodeDetailPage() {
    const { id } = useParams();
    const node = nodeMetadata; // Using mock for now, can be fetched via id

    const handleAction = (action: string) => {
        if (action === 'reboot') {
            toast.warning(`Reboot command sent to ${id}.`, {
                icon: <RefreshCw size={14} className="animate-spin text-status-orange" />
            });
        } else {
            toast.info(`${action} initiated for node ${id}`);
        }
    };

    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link to="/partner/nodes">
                        <Button variant="ghost" size="icon" className="rounded-full w-8 h-8">
                            <ArrowLeft size={16} />
                        </Button>
                    </Link>
                    <div>
                        <div className="flex items-center gap-3">
                            <h1 className="font-display font-bold text-2xl text-foreground font-mono">{node.id}</h1>
                            <span className={cn("inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium border border-border/50 shadow-sm", statusCfg[node.status].bgCls, statusCfg[node.status].cls)}>
                                <CheckCircle2 size={10} /> {node.status}
                            </span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-0.5">{node.project} · {node.location}</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleAction('firmware_check')}>
                        <Shield size={14} className="mr-2 text-primary" /> Check Updates
                    </Button>
                    <Button size="sm" onClick={() => handleAction('reboot')} variant="outline">
                        <RefreshCw size={14} className="mr-2" /> Reboot
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-4 gap-4">
                {[
                    { label: 'Uptime', value: node.uptime, icon: Clock, color: 'text-primary' },
                    { label: 'Latency', value: node.latency, icon: Activity, color: 'text-status-green' },
                    { label: 'Signal Strength', value: `${node.signal} dBm`, icon: Signal, color: 'text-status-green' },
                    { label: 'Hardware Health', value: `${node.health}%`, icon: Cpu, color: 'text-status-green' },
                ].map(kpi => (
                    <div key={kpi.label} className="rounded-card bg-surface p-4 border border-border shadow-surface transition-all hover:border-primary/20 group">
                        <div className="flex justify-between items-start mb-2">
                            <span className="section-label group-hover:text-primary transition-colors">{kpi.label}</span>
                            <kpi.icon size={14} className="text-muted-foreground" />
                        </div>
                        <p className={cn("font-display font-bold text-xl", kpi.color)}>{kpi.value}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-3 gap-6">
                <div className="col-span-2 space-y-6">
                    {/* Real-time Telemetry (Simulation) */}
                    <div className="rounded-card bg-surface p-5 border border-border shadow-surface">
                        <div className="flex items-center justify-between mb-6">
                            <span className="section-label">Real-time Node Telemetry</span>
                            <div className="flex items-center gap-2 text-[10px] text-muted-foreground font-mono">
                                <span className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-status-green animate-pulse" /> Live Stream</span>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <div className="flex justify-between items-end">
                                    <div className="space-y-1">
                                        <p className="text-[10px] text-muted-foreground uppercase font-medium">CPU Utilization</p>
                                        <p className="text-2xl font-display font-bold text-foreground">{node.cpu}%</p>
                                    </div>
                                    <div className="flex items-end gap-0.5 h-8">
                                        {[4, 7, 5, 8, 4, 6, 9, 11, 8, 4, 5, 6].map((v, i) => (
                                            <div key={i} className="w-2 bg-primary/20 rounded-t-sm" style={{ height: `${v * 8}%` }} />
                                        ))}
                                    </div>
                                </div>
                                <div className="w-full h-1.5 bg-surface-3 rounded-full overflow-hidden">
                                    <div className="h-full bg-primary rounded-full" style={{ width: `${node.cpu}%` }} />
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="flex justify-between items-end">
                                    <div className="space-y-1">
                                        <p className="text-[10px] text-muted-foreground uppercase font-medium">Memory Usage</p>
                                        <p className="text-2xl font-display font-bold text-foreground">{node.memory}%</p>
                                    </div>
                                    <div className="flex items-end gap-0.5 h-8">
                                        {[6, 6, 7, 5, 8, 9, 7, 6, 8, 7, 6, 7].map((v, i) => (
                                            <div key={i} className="w-2 bg-status-orange/20 rounded-t-sm" style={{ height: `${v * 8}%` }} />
                                        ))}
                                    </div>
                                </div>
                                <div className="w-full h-1.5 bg-surface-3 rounded-full overflow-hidden">
                                    <div className="h-full bg-status-orange rounded-full" style={{ width: `${node.memory}%` }} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Pending Alerts */}
                    <div className="rounded-card bg-surface p-5 border border-border shadow-surface">
                        <div className="flex items-center justify-between mb-4">
                            <span className="section-label flex items-center gap-2">
                                Active System Alerts <span className="bg-red-soft text-status-red px-1.5 py-0.5 rounded text-[9px]">{activeAlerts.length}</span>
                            </span>
                            <Button variant="ghost" size="xs">Clear All</Button>
                        </div>
                        <div className="space-y-3">
                            {activeAlerts.map(alert => (
                                <div key={alert.id} className="flex items-start justify-between p-3 rounded-lg border border-border bg-surface-2 transition-all hover:bg-surface-3">
                                    <div className="flex gap-3">
                                        <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center shrink-0", alert.type === 'Warning' ? 'bg-orange-soft text-status-orange' : 'bg-accent-soft text-primary')}>
                                            <AlertCircle size={14} />
                                        </div>
                                        <div>
                                            <p className="text-xs font-medium text-foreground">{alert.msg}</p>
                                            <div className="flex items-center gap-2 mt-1">
                                                <span className="text-[10px] text-muted-foreground font-mono">{alert.id}</span>
                                                <span className="text-[10px] text-muted-foreground/60">·</span>
                                                <span className="text-[10px] text-muted-foreground">{alert.time}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <span className={cn("text-[9px] px-2 py-0.5 rounded uppercase font-bold", alert.priority === 'High' ? 'text-status-red' : alert.priority === 'Medium' ? 'text-status-orange' : 'text-primary')}>
                                        {alert.priority}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Maintenance / Work Logs */}
                    <div className="rounded-card bg-surface p-5 border border-border shadow-surface">
                        <div className="flex items-center justify-between mb-4">
                            <span className="section-label flex items-center gap-2"><History size={14} /> Node Operation Logs</span>
                            <Button variant="outline" size="xs"><Download size={12} className="mr-1" /> Export Logs</Button>
                        </div>
                        <div className="relative space-y-4">
                            <div className="absolute top-0 left-[15px] bottom-0 w-px bg-border -z-0" />
                            {workLogs.map((log, i) => (
                                <div key={log.id} className="relative z-10 flex gap-4 group">
                                    <div className={cn("w-8 h-8 rounded-full flex items-center justify-center shrink-0 border border-border bg-surface transition-colors group-hover:border-primary/50")}>
                                        <Terminal size={12} className="text-muted-foreground group-hover:text-primary transition-colors" />
                                    </div>
                                    <div className="flex-1 pb-4">
                                        <div className="flex justify-between">
                                            <div>
                                                <p className="text-xs font-semibold text-foreground">{log.action}</p>
                                                <p className="text-[10px] text-muted-foreground mt-0.5">Initiated by {log.actor}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-[10px] text-muted-foreground">{log.date}</p>
                                                <span className="text-[9px] text-status-green font-medium">{log.status}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    {/* Metadata Card */}
                    <div className="rounded-card bg-surface p-5 border border-border shadow-surface">
                        <span className="section-label mb-4 block">Hardware Specifications</span>
                        <div className="space-y-4">
                            {[
                                { label: 'Type', value: 'Raspberry Pi 4 Model B', icon: Cpu },
                                { label: 'Firmware', value: node.firmware, icon: Shield },
                                { label: 'Install Date', value: node.installDate, icon: Clock },
                                { label: 'Storage', value: '64GB MicroSD Class 10', icon: HardDrive },
                                { label: 'Architecture', value: 'ARMv8 (64-bit)', icon: Signal },
                            ].map(item => (
                                <div key={item.label} className="flex gap-3">
                                    <div className="w-8 h-8 rounded bg-surface-2 flex items-center justify-center shrink-0">
                                        <item.icon size={14} className="text-muted-foreground" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] uppercase text-muted-foreground font-medium">{item.label}</p>
                                        <p className="text-xs text-foreground font-semibold mt-0.5">{item.value}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Network Metadata */}
                    <div className="rounded-card bg-surface p-5 border border-border shadow-surface overflow-hidden">
                        <span className="section-label mb-4 block">Network Identity</span>
                        <div className="space-y-3 font-mono">
                            <div className="p-2.5 rounded bg-surface-2 border border-border">
                                <p className="text-[9px] uppercase text-muted-foreground mb-1">Local IP Address</p>
                                <div className="flex justify-between items-center text-xs text-foreground">
                                    {node.ip}
                                    <Button variant="ghost" size="icon" className="h-4 w-4 opacity-50"><Settings size={8} /></Button>
                                </div>
                            </div>
                            <div className="p-2.5 rounded bg-surface-2 border border-border">
                                <p className="text-[9px] uppercase text-muted-foreground mb-1">MAC Identifier</p>
                                <div className="flex justify-between items-center text-xs text-foreground">
                                    {node.mac}
                                    <Button variant="ghost" size="icon" className="h-4 w-4 opacity-50"><Settings size={8} /></Button>
                                </div>
                            </div>
                        </div>

                        <div className="mt-4 p-2.5 rounded bg-surface-2 border border-border">
                            <div className="flex items-center gap-2 mb-2">
                                <MapPin size={12} className="text-muted-foreground" />
                                <span className="text-[10px] text-muted-foreground uppercase font-medium">GPS Coordinates</span>
                            </div>
                            <p className="text-xs font-mono text-foreground">{node.coords}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
