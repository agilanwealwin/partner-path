import React, { useState } from 'react';
import {
  Download, Plus, Search, Radio, CheckCircle2, AlertTriangle,
  XCircle, Clock, Cpu, Signal, Activity
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const fleetKpis = [
  { label: 'TOTAL', value: '316', color: '' },
  { label: 'ACTIVE', value: '308', sub: '97.5%', color: 'text-status-green' },
  { label: 'OFFLINE', value: '4', sub: '+2 yesterday', color: 'text-status-red' },
  { label: 'MAINTENANCE REQ.', value: '3', color: 'text-status-orange' },
  { label: 'PENDING ACTIVATION', value: '1', color: 'text-muted-foreground' },
];

const nodes = [
  { id: 'TH2-NODE-001', project: 'Thar Solar Farm Ph.2', location: 'Jaisalmer, RJ', type: 'Energy', status: 'Online', firmware: 'v3.2.0', lastSync: '2 min ago', health: 98 },
  { id: 'TH2-NODE-002', project: 'Thar Solar Farm Ph.2', location: 'Jaisalmer, RJ', type: 'Energy', status: 'Online', firmware: 'v3.2.0', lastSync: '2 min ago', health: 97 },
  { id: 'TH2-NODE-022', project: 'Thar Solar Farm Ph.2', location: 'Jaisalmer, RJ', type: 'Weather', status: 'Online', firmware: 'v3.2.0', lastSync: '3 min ago', health: 96 },
  { id: 'NR-NODE-003', project: 'Nellore RE Park', location: 'Nellore, AP', type: 'Energy', status: 'Degraded', firmware: 'v3.1.8', lastSync: '15 min ago', health: 62 },
  { id: 'NR-NODE-007', project: 'Nellore RE Park', location: 'Nellore, AP', type: 'Energy', status: 'Offline', firmware: 'v3.1.8', lastSync: '4h ago', health: 0 },
  { id: 'KW-NODE-001', project: 'Kutch Hybrid', location: 'Bhuj, GJ', type: 'Energy', status: 'Pending', firmware: 'v3.2.0', lastSync: '—', health: 0 },
  { id: 'BK-NODE-001', project: 'Bikaner Solar Park', location: 'Bikaner, RJ', type: 'Energy', status: 'Online', firmware: 'v3.2.0', lastSync: '1 min ago', health: 99 },
  { id: 'BK-NODE-015', project: 'Bikaner Solar Park', location: 'Bikaner, RJ', type: 'Energy', status: 'Maintenance', firmware: 'v3.1.9', lastSync: '1h ago', health: 45 },
];

const statusCfg: Record<string, { icon: React.ElementType; cls: string; bgCls: string }> = {
  Online: { icon: CheckCircle2, cls: 'text-status-green', bgCls: 'bg-green-soft' },
  Degraded: { icon: AlertTriangle, cls: 'text-status-orange', bgCls: 'bg-orange-soft' },
  Offline: { icon: XCircle, cls: 'text-status-red', bgCls: 'bg-red-soft' },
  Pending: { icon: Clock, cls: 'text-muted-foreground', bgCls: 'bg-surface-3' },
  Maintenance: { icon: AlertTriangle, cls: 'text-status-orange', bgCls: 'bg-orange-soft' },
};

export default function NodeManagementPage() {
  const [search, setSearch] = useState('');

  const filtered = nodes.filter(n =>
    !search || n.id.toLowerCase().includes(search.toLowerCase()) || n.project.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-display font-bold text-2xl text-foreground">Node Management</h1>
          <p className="text-sm text-muted-foreground mt-1">Edge node registry across all projects · DeLEN Protocol v2.4 · Last sync 2 min ago</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm"><Download size={14} /> Export CSV</Button>
          <Button size="sm"><Plus size={14} /> Register Node</Button>
        </div>
      </div>

      {/* Fleet KPIs */}
      <div className="grid grid-cols-5 gap-3">
        {fleetKpis.map(k => (
          <div key={k.label} className="rounded-card bg-surface p-4 shadow-surface">
            <span className="section-label">{k.label}</span>
            <p className={cn("font-display font-bold text-xl mt-1", k.color || 'text-foreground')}>{k.value}</p>
            {k.sub && <p className="text-[10px] text-muted-foreground">{k.sub}</p>}
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface border border-border flex-1 max-w-sm">
          <Search size={14} className="text-muted-foreground" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search node ID or project..." className="bg-transparent text-sm text-foreground outline-none w-full placeholder:text-muted-foreground" />
        </div>
        <span className="text-xs text-muted-foreground ml-auto">{filtered.length} of 316 shown</span>
      </div>

      {/* Table */}
      <div className="rounded-card border border-border overflow-hidden">
        <table className="w-full text-[12px]">
          <thead>
            <tr className="border-b border-border bg-surface">
              {['Node ID', 'Project', 'Location', 'Type', 'Status', 'Firmware', 'Last Sync', 'Health', 'Actions'].map(h => (
                <th key={h} className="text-left px-4 py-3 text-[10px] uppercase tracking-wider text-muted-foreground font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(n => {
              const sc = statusCfg[n.status];
              return (
                <tr key={n.id} className="border-b border-border last:border-0 hover:bg-[rgba(255,255,255,0.02)] group">
                  <td className="px-4 py-2.5 font-mono text-foreground">{n.id}</td>
                  <td className="px-4 py-2.5 text-muted-foreground">{n.project}</td>
                  <td className="px-4 py-2.5 text-muted-foreground">{n.location}</td>
                  <td className="px-4 py-2.5"><span className="px-1.5 py-0.5 rounded-md bg-surface-3 text-[10px] text-muted-foreground">{n.type}</span></td>
                  <td className="px-4 py-2.5">
                    <span className={cn("inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[10px]", sc.bgCls, sc.cls)}>
                      <sc.icon size={10} /> {n.status}
                    </span>
                  </td>
                  <td className="px-4 py-2.5 font-mono text-muted-foreground">{n.firmware}</td>
                  <td className="px-4 py-2.5 text-muted-foreground">{n.lastSync}</td>
                  <td className="px-4 py-2.5">
                    {n.health > 0 ? (
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-surface-3 rounded-full">
                          <div className={cn("h-full rounded-full", n.health > 80 ? 'bg-status-green' : n.health > 50 ? 'bg-status-orange' : 'bg-status-red')} style={{ width: `${n.health}%` }} />
                        </div>
                        <span className="text-[10px] font-mono text-muted-foreground">{n.health}%</span>
                      </div>
                    ) : <span className="text-[10px] text-muted-foreground">—</span>}
                  </td>
                  <td className="px-4 py-2.5">
                    <div className="flex gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
                      <button className="p-1 rounded hover:bg-surface-2"><Activity size={14} className="text-muted-foreground" /></button>
                      <button className="p-1 rounded hover:bg-surface-2"><Cpu size={14} className="text-muted-foreground" /></button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Fleet Health */}
      <div className="flex gap-4">
        <div className="rounded-card bg-surface p-5 shadow-surface flex-1">
          <span className="section-label mb-3 block">Fleet Health Score</span>
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 relative">
              <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                <circle cx="50" cy="50" r="42" fill="none" stroke="hsl(var(--surface3))" strokeWidth="8" />
                <circle cx="50" cy="50" r="42" fill="none" stroke="hsl(var(--status-green))" strokeWidth="8"
                  strokeDasharray={2 * Math.PI * 42} strokeDashoffset={2 * Math.PI * 42 * 0.025} strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-display font-bold text-lg text-foreground">97.5</span>
                <span className="text-[8px] text-status-green">Healthy</span>
              </div>
            </div>
            <div className="space-y-1.5 text-[11px]">
              <div className="flex justify-between gap-8"><span className="text-muted-foreground">Active</span><span className="text-foreground">308/316</span></div>
              <div className="flex justify-between gap-8"><span className="text-muted-foreground">Avg Uptime</span><span className="text-foreground">99.6%</span></div>
              <div className="flex justify-between gap-8"><span className="text-muted-foreground">Avg Latency</span><span className="text-foreground">84ms</span></div>
              <div className="flex justify-between gap-8"><span className="text-muted-foreground">Energy Nodes</span><span className="text-foreground">248</span></div>
              <div className="flex justify-between gap-8"><span className="text-muted-foreground">Weather Nodes</span><span className="text-foreground">42</span></div>
            </div>
          </div>
        </div>
        <div className="rounded-card bg-surface p-5 shadow-surface flex-1">
          <span className="section-label mb-3 block">Nodes by Region</span>
          <div className="space-y-3">
            {[
              { region: 'Rajasthan', count: 248, total: 316 },
              { region: 'Gujarat', count: 32, total: 316 },
              { region: 'Andhra Pradesh', count: 22, total: 316 },
              { region: 'Maharashtra', count: 1, total: 316 },
            ].map(r => (
              <div key={r.region}>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-muted-foreground">{r.region}</span>
                  <span className="text-foreground font-mono">{r.count}</span>
                </div>
                <div className="w-full h-1.5 bg-surface-3 rounded-full">
                  <div className="h-full bg-primary rounded-full" style={{ width: `${(r.count / r.total) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
