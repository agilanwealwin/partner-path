import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Download, Plus, Search, SlidersHorizontal, Sun, Wind, Zap,
  CheckCircle2, Clock, AlertTriangle, Eye, Radio, FileBarChart
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { projects, type Project } from '@/data/mockData';
import { cn } from '@/lib/utils';

const statusCfg: Record<string, { textClass: string; bgClass: string; icon: React.ElementType }> = {
  Live: { textClass: 'text-status-green', bgClass: 'bg-green-soft', icon: CheckCircle2 },
  'EPC Phase': { textClass: 'text-primary', bgClass: 'bg-accent-soft', icon: Clock },
  Commissioning: { textClass: 'text-primary', bgClass: 'bg-accent-soft', icon: Clock },
  Maintenance: { textClass: 'text-status-orange', bgClass: 'bg-orange-soft', icon: AlertTriangle },
  Prospect: { textClass: 'text-muted-foreground', bgClass: 'bg-surface-3', icon: Eye },
};

const iconMap: Record<string, React.ElementType> = { sun: Sun, wind: Wind, zap: Zap };

export default function ProjectsListPage() {
  const [search, setSearch] = useState('');

  const filtered = projects.filter(p =>
    !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-display font-bold text-2xl text-foreground">Projects</h1>
          <p className="text-sm text-muted-foreground mt-1">14 projects across 6 states · DeLEN Protocol v2.4</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm"><Download size={14} /> Export</Button>
          <Button size="sm"><Plus size={14} /> Add Project</Button>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface border border-border flex-1 max-w-sm">
          <Search size={14} className="text-muted-foreground" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search projects..." className="bg-transparent text-sm text-foreground outline-none w-full placeholder:text-muted-foreground" />
        </div>
        <Button variant="outline" size="sm"><SlidersHorizontal size={12} /> Filter</Button>
      </div>

      <div className="rounded-card border border-border overflow-hidden">
        <table className="w-full text-[12px]">
          <thead>
            <tr className="border-b border-border bg-surface">
              {['Project', 'Location', 'Type', 'Capacity', 'Status', 'Nodes', 'Energy (YTD)', 'DLN Earned', 'Actions'].map(h => (
                <th key={h} className="text-left px-4 py-3 text-[10px] uppercase tracking-wider text-muted-foreground font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(p => {
              const sc = statusCfg[p.status];
              const Icon = iconMap[p.icon];
              return (
                <tr key={p.id} className="border-b border-border last:border-0 hover:bg-[rgba(255,255,255,0.02)] group">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-accent-soft flex items-center justify-center"><Icon size={14} className="text-primary" /></div>
                      <div><p className="text-foreground font-medium">{p.name}</p><p className="text-[9px] text-muted-foreground font-mono">{p.id}</p></div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{p.location}, {p.state}</td>
                  <td className="px-4 py-3 text-muted-foreground">{p.type}</td>
                  <td className="px-4 py-3 font-mono text-foreground">{p.capacity}</td>
                  <td className="px-4 py-3">
                    <span className={cn("inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[10px]", sc.bgClass, sc.textClass)}>
                      <sc.icon size={10} /> {p.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-mono text-foreground">{p.nodes}</td>
                  <td className="px-4 py-3 font-mono text-foreground">{p.energyYTD}</td>
                  <td className="px-4 py-3 font-mono text-status-orange">{p.dlnEarned}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
                      <Link to={`/partner/projects/${p.id}`}><button className="p-1 rounded hover:bg-surface-2"><Eye size={14} className="text-muted-foreground" /></button></Link>
                      <button className="p-1 rounded hover:bg-surface-2"><Radio size={14} className="text-muted-foreground" /></button>
                      <button className="p-1 rounded hover:bg-surface-2"><FileBarChart size={14} className="text-muted-foreground" /></button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
