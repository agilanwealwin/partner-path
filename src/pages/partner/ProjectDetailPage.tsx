import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ChevronLeft, Sun, MapPin, CheckCircle2, Activity, Zap, Radio,
  LayoutGrid, GitBranch, Wrench, BarChart3, FileText, Circle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { projects } from '@/data/mockData';
import { cn } from '@/lib/utils';

const lifecycleSteps = [
  { label: 'Project Discovery', date: 'Mar \'24', done: true },
  { label: 'Site Audit', date: 'Apr \'24', done: true },
  { label: 'Engineering Approval', date: 'Jun \'24', done: true },
  { label: 'Host Agreement', date: 'Jul \'24', done: true },
  { label: 'EPC Execution', date: 'Aug-Nov \'24', done: true },
  { label: 'Commissioning', date: 'Dec \'24', done: true },
  { label: 'Edge Node Install', date: 'Jan \'25', done: true },
  { label: 'Protocol Integration', date: 'Jan \'25', done: true },
  { label: 'Live Monitoring', date: 'Active', done: true, current: true },
];

const tabDefs = [
  { label: 'Overview', icon: LayoutGrid },
  { label: 'Engineering', icon: GitBranch },
  { label: 'EPC Progress', icon: Wrench },
  { label: 'Node Integration', icon: Radio },
  { label: 'Performance', icon: BarChart3 },
  { label: 'Documents', icon: FileText },
];

export default function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState('Overview');
  const project = projects.find(p => p.id === id) || projects[0];

  return (
    <div className="p-6 space-y-6">
      <Link to="/partner/projects" className="text-[11px] text-muted-foreground hover:text-foreground inline-flex items-center gap-1">
        <ChevronLeft size={12} /> Back to Projects
      </Link>

      {/* Hero Card */}
      <div className="rounded-card p-6 relative overflow-hidden border-l-4 border-l-status-green bg-surface shadow-surface border border-border">
        {/* Subtle decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-status-orange/5 rounded-full -ml-12 -mb-12 blur-2xl" />

        <div className="relative flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-orange-soft flex items-center justify-center border border-status-orange/10">
              <Sun size={24} className="text-status-orange" />
            </div>
            <div>
              <h1 className="font-display font-bold text-2xl text-foreground">
                <span className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">{project.name}</span>
              </h1>
              <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                <MapPin size={12} /> {project.location}, {project.state} · India
              </div>
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-green-soft text-status-green text-[11px]">
            <CheckCircle2 size={12} /> Live on Protocol
          </span>
        </div>
        <div className="flex items-center gap-6 mt-4 text-[11px]">
          {[
            { label: 'CAPACITY', value: project.capacity },
            { label: 'NODES', value: project.nodes.split('/')[0] + ' Active' },
            { label: 'YTD ENERGY', value: project.energyYTD },
            { label: 'DLN EARNED', value: project.dlnEarned },
          ].map(s => (
            <div key={s.label} className="px-3 py-1.5 rounded-lg bg-surface-2/50 border border-border">
              <span className="text-[9px] text-muted-foreground uppercase">{s.label}</span>
              <p className="font-mono text-foreground mt-0.5">{s.value}</p>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-4 mt-4 text-[10px] text-muted-foreground font-mono">
          <span>PROJECT ID: {project.id}</span>
          <span>EPC: SunVolt EPC Ltd.</span>
          <span>COMMISSIONED: Jan 15, 2025</span>
        </div>
      </div>

      <div className="rounded-card bg-surface p-6 shadow-surface border border-border/50">
        <div className="flex items-center justify-between mb-6">
          <div className="space-y-1">
            <span className="section-label">Project Lifecycle Tracker</span>
            <p className="text-[10px] text-muted-foreground">Detailed progress from discovery to post-commissioning operations</p>
          </div>
          <div className="flex items-center gap-3 text-[9px] text-muted-foreground bg-surface-2 px-3 py-1 rounded-full">
            <span className="flex items-center gap-1"><CheckCircle2 size={8} className="text-status-green" /> Completed</span>
            <span className="flex items-center gap-1"><Circle size={8} className="text-primary fill-primary/20" /> Current</span>
            <span className="flex items-center gap-1"><Circle size={8} /> Pending</span>
          </div>
        </div>

        <div className="relative flex items-start justify-between px-2">
          {/* Progress Line */}
          <div className="absolute top-[11px] left-0 w-full h-0.5 bg-surface-3 -z-0" />
          <div
            className="absolute top-[11px] left-0 h-0.5 bg-primary transition-all duration-1000 -z-0"
            style={{ width: `${(lifecycleSteps.filter(s => s.done).length - 1) * (100 / (lifecycleSteps.length - 1))}%` }}
          />

          {lifecycleSteps.map((step, i) => (
            <div key={i} className="flex-1 flex flex-col items-center group relative z-10">
              <div className={cn(
                "w-6 h-6 rounded-full flex items-center justify-center mb-2.5 transition-all duration-300",
                step.current ? 'bg-primary text-primary-foreground ring-4 ring-primary/20 scale-110' :
                  step.done ? 'bg-status-green text-white' : 'bg-surface-3 text-muted-foreground'
              )}>
                {step.done ? <CheckCircle2 size={12} /> : <Circle size={10} className={cn(step.current ? "fill-white" : "")} />}
              </div>
              <div className="px-1">
                <p className={cn(
                  "text-[9px] leading-tight font-medium transition-colors",
                  step.current ? "text-primary font-bold" : "text-foreground"
                )}>{step.label}</p>
                <p className="text-[8px] text-muted-foreground mt-1 font-mono">{step.date}</p>
              </div>

              {/* Tooltip-like shadow on hover */}
              <div className="absolute -top-1 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <div className="w-1 h-1 rounded-full bg-primary" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-border">
        {tabDefs.map(tab => (
          <button key={tab.label} onClick={() => setActiveTab(tab.label)} className={cn(
            "flex items-center gap-1.5 px-4 py-2.5 text-[12px] transition-colors border-b-2 -mb-px",
            activeTab === tab.label ? 'border-primary text-foreground' : 'border-transparent text-muted-foreground hover:text-foreground'
          )}><tab.icon size={13} /> {tab.label}</button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'Overview' && (
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-card bg-surface p-5 shadow-surface">
            <span className="section-label mb-3 block">Project Details</span>
            <div className="space-y-2 text-[11px]">
              {[['Type', project.type], ['Capacity', project.capacity], ['Location', `${project.location}, ${project.state}`], ['Nodes', project.nodes], ['Protocol', 'DeLEN v2.4 · Mainnet']].map(([l, v]) => (
                <div key={l} className="flex justify-between py-1.5 border-b border-border last:border-0">
                  <span className="text-muted-foreground">{l}</span><span className="text-foreground">{v}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-card bg-surface p-5 shadow-surface">
            <span className="section-label mb-3 block">Performance Summary</span>
            <div className="space-y-2 text-[11px]">
              {[['Energy YTD', project.energyYTD], ['DLN Earned', project.dlnEarned + ' DLN'], ['Avg CUF', '22.4%'], ['Uptime', '99.2%'], ['Availability', '98.8%']].map(([l, v]) => (
                <div key={l} className="flex justify-between py-1.5 border-b border-border last:border-0">
                  <span className="text-muted-foreground">{l}</span><span className="text-foreground font-mono">{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'Engineering' && (
        <div className="rounded-card bg-surface p-5 shadow-surface">
          <span className="section-label mb-3 block">Engineering Specifications</span>
          <div className="grid grid-cols-2 gap-3 text-[11px]">
            {[['Module Type', 'Bifacial 545W TOPCon'], ['Inverter', 'Huawei SUN2000-215KTL'], ['Mounting', 'Fixed-tilt ground mount'], ['Tilt Angle', '25° south-facing'], ['String Config', '28 modules × 172 strings'], ['DC/AC Ratio', '1.24'], ['Transformer', '2× 6.3 MVA 33/11kV'], ['Cable Type', 'Copper XLPE 240mm²']].map(([l, v]) => (
              <div key={l} className="flex justify-between py-1.5 border-b border-border last:border-0">
                <span className="text-muted-foreground">{l}</span><span className="text-foreground">{v}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'EPC Progress' && (
        <div className="rounded-card bg-surface p-5 shadow-surface">
          <span className="section-label mb-3 block">EPC Milestones</span>
          <div className="space-y-3">
            {[
              { name: 'Site Preparation', pct: 100 }, { name: 'Foundation & Mounting', pct: 100 },
              { name: 'Module Installation', pct: 100 }, { name: 'Electrical & Cabling', pct: 100 },
              { name: 'Inverter Commissioning', pct: 100 }, { name: 'Grid Synchronization', pct: 100 },
            ].map(m => (
              <div key={m.name}>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-muted-foreground">{m.name}</span>
                  <span className="text-status-green font-mono">{m.pct}%</span>
                </div>
                <div className="w-full h-1.5 bg-surface-3 rounded-full"><div className="h-full bg-status-green rounded-full" style={{ width: `${m.pct}%` }} /></div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'Node Integration' && (
        <div className="rounded-card bg-surface p-5 shadow-surface">
          <span className="section-label mb-3 block">Edge Node Fleet</span>
          <div className="grid grid-cols-4 gap-3 mb-4">
            {[['Total Nodes', '48'], ['Online', '48'], ['Offline', '0'], ['Firmware', 'v3.2.0']].map(([l, v]) => (
              <div key={l} className="p-3 rounded-lg bg-surface-2 border border-border">
                <span className="text-[9px] text-muted-foreground uppercase">{l}</span>
                <p className="text-sm font-mono text-foreground mt-0.5">{v}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'Performance' && (
        <div className="rounded-card bg-surface p-5 shadow-surface">
          <span className="section-label mb-3 block">Monthly Energy Generation (GWh)</span>
          <div className="flex items-end gap-2 h-[160px]">
            {[0.7, 0.8, 0.9, 1.0, 1.1, 1.2, 1.0, 0.9, 1.0, 0.8, 0.7, 0.7].map((v, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-[8px] text-foreground font-mono">{v}</span>
                <div className="w-full rounded-t-sm bg-primary/60" style={{ height: `${(v / 1.2) * 100}%` }} />
                <span className="text-[8px] text-muted-foreground">{['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i]}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'Documents' && (
        <div className="rounded-card bg-surface p-5 shadow-surface">
          <span className="section-label mb-3 block">Project Documents</span>
          <div className="space-y-2">
            {['DPR (Detailed Project Report)', 'Grid Interconnection Agreement', 'CEI Approval Certificate', 'Commissioning Report', 'O&M Contract'].map(doc => (
              <div key={doc} className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-surface-2 transition-colors">
                <div className="flex items-center gap-2"><FileText size={14} className="text-muted-foreground" /><span className="text-[11px] text-foreground">{doc}</span></div>
                <Button
                  variant="ghost"
                  size="xs"
                  onClick={() => toast.success(`Opening ${doc}...`)}
                >
                  View
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
