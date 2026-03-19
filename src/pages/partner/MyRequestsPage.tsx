import React, { useState } from 'react';
import { Plus, CheckCircle2, Clock, XCircle, Eye, Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

const tabDefs = ['Subscribed (2)', 'Pending Requests (1)', 'All Requests'];

const subscribedTerritories = [
  {
    id: 'DLN-016', name: 'Rajasthan Territory 1', state: 'Rajasthan',
    mw: 248, irradiance: 5.6, risk: 'Low',
    projects: [
      { name: 'Thar Solar Farm Phase 2', capacity: '12.4 MW', status: 'Live' },
      { name: 'Bikaner North Portfolio', capacity: '8.0 MW', status: 'EPC Phase' },
    ],
  },
  {
    id: 'DLN-024', name: 'Gujarat Territory 4', state: 'Gujarat',
    mw: 167, irradiance: 5.4, risk: 'Low',
    projects: [
      { name: 'Kutch Wind-Solar Hybrid', capacity: '8.2 MW', status: 'EPC Phase' },
    ],
  },
];

const pendingRequests = [
  { id: 'TRQ-2026-0047', territory: 'DLN-182', name: 'Haryana Territory 6', state: 'Haryana', mw: 82, submitted: '14 Mar 2025', message: 'Interested in rooftop deployment across Haryana industrial zones...' },
];

const allRequests = [
  { reqId: 'TRQ-0047', territory: 'Haryana T6', state: 'Haryana', submitted: '14 Mar', status: 'Pending' },
  { reqId: 'TRQ-0031', territory: 'Rajasthan T1', state: 'Rajasthan', submitted: 'Jan \'24', status: 'Approved' },
  { reqId: 'TRQ-0019', territory: 'Gujarat T4', state: 'Gujarat', submitted: 'Dec \'23', status: 'Approved' },
  { reqId: 'TRQ-0012', territory: 'UP T3', state: 'UP', submitted: 'Oct \'23', status: 'Rejected' },
];

export default function MyRequestsPage() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-display font-bold text-2xl text-foreground">My Territory Requests</h1>
          <p className="text-sm text-muted-foreground mt-1">Pulse Partner · 5 territories max · 2 subscribed · 3 remaining</p>
          <div className="flex gap-1 mt-2">
            {[0, 1, 2, 3, 4].map(i => (
              <div key={i} className={cn("w-6 h-2 rounded-sm", i < 2 ? 'bg-primary' : 'bg-surface-3')} />
            ))}
            <span className="text-[10px] text-muted-foreground ml-2">2/5 used</span>
          </div>
        </div>
        <Button size="sm"><Plus size={14} /> Request New Territory</Button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-border">
        {tabDefs.map((tab, i) => (
          <button key={tab} onClick={() => setActiveTab(i)} className={cn(
            "px-4 py-2.5 text-[12px] transition-colors border-b-2 -mb-px",
            activeTab === i ? 'border-primary text-foreground' : 'border-transparent text-muted-foreground hover:text-foreground'
          )}>{tab}</button>
        ))}
      </div>

      {/* Subscribed */}
      {activeTab === 0 && (
        <div className="space-y-3">
          {subscribedTerritories.map(t => (
            <div key={t.id} className="rounded-card bg-surface p-5 shadow-surface">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] text-muted-foreground">{t.id}</span>
                    <span className="text-sm font-medium text-foreground">{t.name}</span>
                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-accent-soft text-primary text-[10px]">
                      <CheckCircle2 size={10} /> Subscribed
                    </span>
                  </div>
                  <p className="text-[11px] text-muted-foreground mt-0.5">{t.state} · {t.mw} MW · {t.irradiance} kWh/m² · Risk: {t.risk}</p>
                </div>
              </div>
              <div className="pl-4 border-l-2 border-border space-y-2">
                <span className="text-[10px] text-muted-foreground">Projects in this territory:</span>
                {t.projects.map(p => (
                  <div key={p.name} className="flex items-center gap-2 text-[11px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-status-green" />
                    <span className="text-foreground">{p.name}</span>
                    <span className="text-muted-foreground">— {p.capacity} — {p.status}</span>
                  </div>
                ))}
              </div>
              <div className="flex gap-2 mt-3">
                <Link to={`/partner/territories/${t.id}`}><Button variant="outline" size="xs">View Territory Detail</Button></Link>
                <Button variant="outline" size="xs">View Projects</Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pending */}
      {activeTab === 1 && (
        <div className="space-y-3">
          {pendingRequests.map(r => (
            <div key={r.id} className="rounded-card bg-surface p-5 shadow-surface">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] text-muted-foreground">{r.territory}</span>
                  <span className="text-sm font-medium text-foreground">{r.name}</span>
                  <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-orange-soft text-status-orange text-[10px]">
                    <Clock size={10} /> Pending Review
                  </span>
                </div>
              </div>
              <p className="text-[11px] text-muted-foreground">{r.state} · {r.mw} MW potential</p>
              <p className="text-[10px] text-muted-foreground mt-1 font-mono">Submitted: {r.submitted} · {r.id}</p>
              <p className="text-[11px] text-muted-foreground mt-2 italic">"{r.message}"</p>
              <div className="flex gap-2 mt-3">
                <Button variant="outline" size="xs"><Eye size={12} /> View Request</Button>
                <Button variant="outline" size="xs"><Pencil size={12} /> Edit Request</Button>
                <Button variant="outline" size="xs" className="text-status-red"><Trash2 size={12} /> Withdraw</Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* All Requests */}
      {activeTab === 2 && (
        <div className="rounded-card border border-border overflow-hidden">
          <table className="w-full text-[12px]">
            <thead>
              <tr className="border-b border-border bg-surface">
                {['Req ID', 'Territory', 'State', 'Submitted', 'Status', 'Action'].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-[10px] uppercase tracking-wider text-muted-foreground font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {allRequests.map(r => (
                <tr key={r.reqId} className="border-b border-border last:border-0 hover:bg-[rgba(255,255,255,0.02)]">
                  <td className="px-4 py-2.5 font-mono text-foreground">{r.reqId}</td>
                  <td className="px-4 py-2.5 text-foreground">{r.territory}</td>
                  <td className="px-4 py-2.5 text-muted-foreground">{r.state}</td>
                  <td className="px-4 py-2.5 text-muted-foreground">{r.submitted}</td>
                  <td className="px-4 py-2.5">
                    <span className={cn("px-1.5 py-0.5 rounded-md text-[10px]",
                      r.status === 'Approved' ? 'bg-green-soft text-status-green' :
                      r.status === 'Rejected' ? 'bg-red-soft text-status-red' : 'bg-orange-soft text-status-orange'
                    )}>{r.status}</span>
                  </td>
                  <td className="px-4 py-2.5"><Button variant="ghost" size="xs">View</Button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
