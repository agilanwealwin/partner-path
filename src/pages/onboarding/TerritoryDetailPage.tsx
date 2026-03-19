import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ChevronLeft, Zap, Sun, BarChart3, Shield, MapPinned, Signal,
  CheckCircle2, Plus, Clock, FileText, GitBranch
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { territories, statusConfig, riskConfig } from '@/data/mockData';
import { cn } from '@/lib/utils';

const monthlyIrradiance = [
  { month: 'Jan', value: 4.2 }, { month: 'Feb', value: 4.8 }, { month: 'Mar', value: 5.4 },
  { month: 'Apr', value: 5.9 }, { month: 'May', value: 6.4 }, { month: 'Jun', value: 6.8 },
  { month: 'Jul', value: 5.2 }, { month: 'Aug', value: 4.8 }, { month: 'Sep', value: 5.0 },
  { month: 'Oct', value: 5.1 }, { month: 'Nov', value: 4.6 }, { month: 'Dec', value: 4.0 },
];

const tabs = ['Overview', 'Solar Data', 'Regulatory', 'Projects', 'History'];

export default function TerritoryDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState('Overview');

  const territory = territories.find(t => t.id === id) || territories[0];
  const sc = statusConfig[territory.status];
  const rc = riskConfig[territory.risk];

  return (
    <div className="p-6 max-w-[1200px] mx-auto space-y-6">
      <Link to="/onboarding/infra-partner/territories" className="text-[11px] text-muted-foreground hover:text-foreground inline-flex items-center gap-1">
        <ChevronLeft size={12} /> Back to Territory Registry
      </Link>

      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="font-display font-bold text-2xl text-foreground">{territory.name}</h1>
            <span className={cn("inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px]", sc.bgClass, sc.textClass)}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: sc.color }} />
              {sc.label}
            </span>
          </div>
          <p className="text-sm text-muted-foreground mt-1">{territory.state} · India · {territory.id}</p>
        </div>
        {territory.status === 'available' && (
          <Button size="sm"><Plus size={14} /> Request This Territory</Button>
        )}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { icon: Zap, label: 'MW Potential', value: `${territory.mwPotential} MW` },
          { icon: Sun, label: 'Irradiation', value: `${territory.irradiance} kWh/m²/day` },
          { icon: BarChart3, label: 'Market Score', value: '74/100' },
          { icon: Shield, label: 'Risk', value: territory.risk },
        ].map(s => (
          <div key={s.label} className="rounded-card bg-surface p-4 shadow-surface">
            <s.icon size={16} className="text-muted-foreground mb-2" />
            <p className="text-[10px] text-muted-foreground uppercase">{s.label}</p>
            <p className="font-display font-bold text-lg text-foreground">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-border">
        {tabs.map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={cn(
            "px-4 py-2.5 text-[12px] transition-colors border-b-2 -mb-px",
            activeTab === tab ? 'border-primary text-foreground' : 'border-transparent text-muted-foreground hover:text-foreground'
          )}>{tab}</button>
        ))}
      </div>

      <div className="flex gap-6">
        {/* Main Content */}
        <div className="flex-1 min-w-0">
          {activeTab === 'Overview' && (
            <div className="space-y-4">
              <div className="rounded-card bg-surface p-5 shadow-surface">
                <div className="flex items-center gap-2 mb-3"><MapPinned size={14} className="text-muted-foreground" /><span className="text-sm font-medium text-foreground">Geographic Description</span></div>
                <div className="grid grid-cols-2 gap-3 text-[11px]">
                  <div><span className="text-muted-foreground">Region:</span> <span className="text-foreground">Western {territory.state}</span></div>
                  <div><span className="text-muted-foreground">Key Districts:</span> <span className="text-foreground">Agra, Mathura, Etawah, Mainpuri</span></div>
                  <div><span className="text-muted-foreground">District Coverage:</span> <span className="text-foreground">4 districts (approx. 22,000 km²)</span></div>
                  <div><span className="text-muted-foreground">Land Availability:</span> <span className="text-foreground">High (75% agricultural)</span></div>
                  <div className="flex items-center gap-1"><Signal size={12} className="text-status-green" /><span className="text-muted-foreground">Grid:</span> <span className="text-foreground">Good — Agra 400kV substation · 12 km</span></div>
                  <div><span className="text-muted-foreground">Infrastructure Score:</span> <span className="text-foreground">72/100</span></div>
                  <div><span className="text-muted-foreground">Transmission Losses:</span> <span className="text-foreground">4.2% avg (low)</span></div>
                </div>
              </div>
              {territory.status === 'available' && (
                <div className="rounded-card bg-green-soft border border-status-green/20 p-4">
                  <p className="text-[12px] text-status-green font-medium">This territory is open for subscription</p>
                  <p className="text-[10px] text-muted-foreground mt-1">Your tier (Pulse) allows up to 5 territory subscriptions · 2 subscribed · 3 remaining</p>
                  <Button variant="outline-green" size="sm" className="mt-3"><Plus size={12} /> Request This Territory</Button>
                </div>
              )}
            </div>
          )}

          {activeTab === 'Solar Data' && (
            <div className="space-y-4">
              <div className="rounded-card bg-surface p-5 shadow-surface">
                <span className="section-label mb-3 block">Solar Resource Data</span>
                <div className="grid grid-cols-2 gap-3 text-[11px]">
                  {[
                    ['Annual Avg Irradiance', `${territory.irradiance} kWh/m²/day`],
                    ['Peak Sun Hours (summer)', '6.2 hrs/day'],
                    ['Peak Sun Hours (winter)', '4.1 hrs/day'],
                    ['GHI Data Source', 'NREL / MNRE'],
                    ['Wind Speed (avg)', '4.2 m/s'],
                    ['Temperature Range', '8°C – 45°C'],
                    ['Cloud Cover (annual)', '28%'],
                    ['Dust Soiling Factor', '3.2% (semi-arid)'],
                    ['Humidity (avg)', '52%'],
                    ['Estimated CUF', '21–23%'],
                  ].map(([label, value]) => (
                    <div key={label} className="flex justify-between py-1.5 border-b border-border last:border-0">
                      <span className="text-muted-foreground">{label}</span>
                      <span className="text-foreground font-mono">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-card bg-surface p-5 shadow-surface">
                <span className="section-label mb-3 block">Monthly Irradiance (kWh/m²/day)</span>
                <div className="flex items-end gap-1.5 h-[140px]">
                  {monthlyIrradiance.map(m => (
                    <div key={m.month} className="flex-1 flex flex-col items-center gap-1">
                      <span className="text-[8px] text-foreground font-mono">{m.value}</span>
                      <div className="w-full rounded-t-sm bg-status-orange/70" style={{ height: `${((m.value - 3.5) / 3.3) * 100}%` }} />
                      <span className="text-[8px] text-muted-foreground">{m.month}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'Regulatory' && (
            <div className="rounded-card bg-surface p-5 shadow-surface">
              <span className="section-label mb-3 block">Regulatory Environment</span>
              <div className="space-y-2 text-[11px]">
                {[
                  ['State Electricity Board', 'UPPCL'],
                  ['DISCOM(s)', 'PVVNL · MVVNL'],
                  ['Net Metering Policy', 'Available (up to 1 MW)'],
                  ['Open Access Threshold', '> 1 MW'],
                  ['RPO Target (2025)', '21%'],
                  ['RPO Compliance (current)', '18.2%'],
                  ['Env. Clearance Required', '> 5 MW'],
                  ['Grid Interconnection Lead Time', '8–12 weeks'],
                  ['Subsidy Available', 'PM-KUSUM (agricultural)'],
                  ['Wheeling Charges', '₹0.42/kWh'],
                  ['Banking Charges', '₹0.12/kWh'],
                ].map(([label, value]) => (
                  <div key={label} className="flex justify-between py-2 border-b border-border last:border-0">
                    <span className="text-muted-foreground">{label}</span>
                    <span className="text-foreground">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'Projects' && (
            <div className="space-y-4">
              <div className="rounded-card bg-surface p-5 shadow-surface">
                <p className="text-sm text-foreground mb-2">112 MW of {territory.mwPotential} MW potential undeployed</p>
                <div className="w-full h-3 bg-surface-3 rounded-full overflow-hidden">
                  <div className="h-full bg-status-green rounded-full" style={{ width: '30%' }} />
                </div>
                <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
                  <span>49 MW deployed (30%)</span><span>112 MW remaining (70%)</span>
                </div>
              </div>
              <div className="rounded-card bg-surface p-5 shadow-surface">
                <span className="section-label mb-3 block">Existing Projects</span>
                <div className="text-[11px]">
                  <div className="flex items-center justify-between py-2 border-b border-border">
                    <span className="text-foreground">Agra Solar Park</span>
                    <span className="text-muted-foreground">NovaSun · Ground · 49 MW · Live</span>
                  </div>
                </div>
              </div>
              <div className="rounded-card bg-surface p-5 shadow-surface">
                <span className="section-label mb-3 block">Available Opportunities</span>
                <div className="space-y-2 text-[11px]">
                  <div className="flex justify-between py-1.5"><span className="text-muted-foreground">Rooftop (C&I)</span><span className="text-foreground">~35 MW potential</span></div>
                  <div className="flex justify-between py-1.5"><span className="text-muted-foreground">Ground Mount (utility)</span><span className="text-foreground">~42 MW potential</span></div>
                  <div className="flex justify-between py-1.5"><span className="text-muted-foreground">Agri-PV (PM-KUSUM)</span><span className="text-foreground">~35 MW potential</span></div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'History' && (
            <div className="rounded-card bg-surface p-5 shadow-surface">
              <span className="section-label mb-4 block">Territory Timeline</span>
              <div className="space-y-4">
                {[
                  { date: 'Apr 2024', text: 'Territory created · MW potential mapped from NREL data' },
                  { date: 'Jun 2024', text: 'NovaSun Systems submitted subscription request' },
                  { date: 'Jul 2024', text: 'Admin approved · Status changed to Subscribed' },
                  { date: 'Sep 2024', text: 'Agra Solar Park project created under this territory' },
                  { date: 'Jan 2025', text: 'Project commissioned · Status → Partially Allocated' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className="w-2 h-2 rounded-full bg-primary mt-1.5" />
                      {i < 4 && <div className="w-px flex-1 bg-border" />}
                    </div>
                    <div className="pb-2">
                      <p className="font-mono text-[10px] text-muted-foreground">{item.date}</p>
                      <p className="text-[11px] text-foreground mt-0.5">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Sidebar */}
        <div className="w-[260px] shrink-0 space-y-4">
          <div className="rounded-card bg-surface p-4 shadow-surface">
            <span className="text-xs font-medium text-foreground mb-3 block">Quick Stats</span>
            <div className="space-y-2 text-[11px]">
              <div className="flex justify-between"><span className="text-muted-foreground">Territory ID</span><span className="font-mono text-foreground">{territory.id}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">State</span><span className="text-foreground">{territory.state}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">MW Potential</span><span className="text-foreground">{territory.mwPotential} MW</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Irradiance</span><span className="text-foreground">{territory.irradiance}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Risk</span><span className={cn(rc.textClass)}>{territory.risk}</span></div>
            </div>
          </div>

          <div className="rounded-card bg-surface p-4 shadow-surface">
            <span className="text-xs font-medium text-foreground mb-3 block">Related Territories</span>
            <div className="space-y-2">
              {territories.filter(t => t.state === territory.state && t.id !== territory.id).slice(0, 4).map(t => (
                <Link key={t.id} to={`/onboarding/infra-partner/territories/${t.id}`} className="block p-2 rounded-lg bg-surface-2 hover:bg-surface-3 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] text-foreground">{t.id}</span>
                    <span className={cn("text-[9px] px-1 py-0.5 rounded", statusConfig[t.status].bgClass, statusConfig[t.status].textClass)}>{statusConfig[t.status].label}</span>
                  </div>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{t.name}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
