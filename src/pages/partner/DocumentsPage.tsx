import React, { useState } from 'react';
import { FileText, FilePlus, Search, Eye, Download, CheckCircle2, Clock, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const tabDefs = ['Company Docs', 'Project Docs', 'Node Certificates', 'Agreements', 'Compliance'];

const docs: Record<string, { name: string; status: string; date: string; type: string }[]> = {
  'Company Docs': [
    { name: 'Certificate of Incorporation', status: 'Verified', date: 'Jan 2024', type: 'PDF' },
    { name: 'GST Registration Certificate', status: 'Verified', date: 'Jan 2024', type: 'PDF' },
    { name: 'PAN Card (Company)', status: 'Verified', date: 'Jan 2024', type: 'PDF' },
    { name: 'MOA / AOA', status: 'Verified', date: 'Jan 2024', type: 'PDF' },
  ],
  'Project Docs': [
    { name: 'DPR — Thar Solar Farm Ph.2', status: 'Active', date: 'Mar 2024', type: 'PDF' },
    { name: 'Grid Interconnection Agreement — Thar', status: 'Active', date: 'Jul 2024', type: 'PDF' },
    { name: 'CEI Approval — Bikaner Solar Park', status: 'Active', date: 'Jun 2024', type: 'PDF' },
    { name: 'Commissioning Report — Nellore RE Park', status: 'Active', date: 'Dec 2024', type: 'PDF' },
  ],
  'Node Certificates': [
    { name: 'Node Fleet Certificate — Thar Cluster', status: 'Active', date: 'Jan 2025', type: 'PDF' },
    { name: 'Calibration Certificate — Weather Nodes', status: 'Expiring', date: 'Mar 2025', type: 'PDF' },
  ],
  'Agreements': [
    { name: 'DeLEN Partner Agreement', status: 'Signed', date: 'Jan 2024', type: 'PDF' },
    { name: 'O&M Service Contract', status: 'Signed', date: 'Feb 2024', type: 'PDF' },
    { name: 'Host Entity MoU — Rajasthan RE Corp', status: 'Signed', date: 'Mar 2024', type: 'PDF' },
  ],
  'Compliance': [
    { name: 'Annual Compliance Report 2024', status: 'Submitted', date: 'Feb 2025', type: 'PDF' },
    { name: 'Safety Audit Report', status: 'Under Review', date: 'Mar 2025', type: 'PDF' },
  ],
};

export default function DocumentsPage() {
  const [activeTab, setActiveTab] = useState('Company Docs');
  const [search, setSearch] = useState('');

  const currentDocs = (docs[activeTab] || []).filter(d => !search || d.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-display font-bold text-2xl text-foreground">Documents</h1>
          <p className="text-sm text-muted-foreground mt-1">Document management and compliance tracking</p>
        </div>
        <Button size="sm"><FilePlus size={14} /> Upload Document</Button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-border">
        {tabDefs.map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={cn(
            "px-4 py-2.5 text-[12px] transition-colors border-b-2 -mb-px",
            activeTab === tab ? 'border-primary text-foreground' : 'border-transparent text-muted-foreground hover:text-foreground'
          )}>{tab}</button>
        ))}
      </div>

      {/* Search */}
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface border border-border max-w-sm">
        <Search size={14} className="text-muted-foreground" />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search documents..." className="bg-transparent text-sm text-foreground outline-none w-full placeholder:text-muted-foreground" />
      </div>

      {/* Table */}
      <div className="rounded-card border border-border overflow-hidden">
        <table className="w-full text-[12px]">
          <thead>
            <tr className="border-b border-border bg-surface">
              {['Document', 'Type', 'Status', 'Date', 'Actions'].map(h => (
                <th key={h} className="text-left px-4 py-3 text-[10px] uppercase tracking-wider text-muted-foreground font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentDocs.map((d, i) => (
              <tr key={i} className="border-b border-border last:border-0 hover:bg-[rgba(255,255,255,0.02)]">
                <td className="px-4 py-2.5 text-foreground flex items-center gap-2"><FileText size={14} className="text-muted-foreground" /> {d.name}</td>
                <td className="px-4 py-2.5 font-mono text-muted-foreground">{d.type}</td>
                <td className="px-4 py-2.5">
                  <span className={cn("px-1.5 py-0.5 rounded-md text-[10px]",
                    d.status === 'Verified' || d.status === 'Active' || d.status === 'Signed' ? 'bg-green-soft text-status-green' :
                    d.status === 'Expiring' ? 'bg-orange-soft text-status-orange' :
                    d.status === 'Under Review' ? 'bg-accent-soft text-primary' : 'bg-blue-soft text-status-blue'
                  )}>{d.status}</span>
                </td>
                <td className="px-4 py-2.5 text-muted-foreground">{d.date}</td>
                <td className="px-4 py-2.5">
                  <div className="flex gap-1">
                    <button className="p-1 rounded hover:bg-surface-2"><Eye size={14} className="text-muted-foreground" /></button>
                    <button className="p-1 rounded hover:bg-surface-2"><Download size={14} className="text-muted-foreground" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
