import React from 'react';
import { ScrollText, ThumbsUp, ThumbsDown, Clock, CheckCircle2, Download, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const proposals = [
  { id: 'DLN-GOV-012', title: 'Increase Minimum Node Uptime Requirement to 99%', status: 'Active', votesFor: 842, votesAgainst: 156, endsIn: '3 days', desc: 'Proposal to raise the minimum node uptime requirement from 95% to 99% for DLN reward eligibility.' },
  { id: 'DLN-GOV-011', title: 'Add BESS Integration as Tier Qualification Criterion', status: 'Active', votesFor: 1024, votesAgainst: 312, endsIn: '5 days', desc: 'Include battery energy storage experience as a scoring criterion for Prime tier qualification.' },
  { id: 'DLN-GOV-010', title: 'Reduce Vesting Cliff from 6 to 3 Months', status: 'Passed', votesFor: 2148, votesAgainst: 423, endsIn: '', desc: 'Reduce the initial cliff period for token vesting from 6 months to 3 months.' },
];

const documents = [
  { name: 'DeLEN Protocol Whitepaper v2.4', type: 'PDF', size: '2.4 MB' },
  { name: 'Partner Agreement Template', type: 'DOCX', size: '180 KB' },
  { name: 'Token Economics Overview', type: 'PDF', size: '1.1 MB' },
  { name: 'Territory Allocation Policy', type: 'PDF', size: '840 KB' },
  { name: 'Node Specification Requirements', type: 'PDF', size: '560 KB' },
];

export default function GovernancePage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="font-display font-bold text-2xl text-foreground">Governance</h1>
        <p className="text-sm text-muted-foreground mt-1">Protocol proposals and governance documents · Pulse/Prime voting</p>
      </div>

      {/* Proposals */}
      <div>
        <span className="section-label mb-3 block">Active & Recent Proposals</span>
        <div className="space-y-3">
          {proposals.map(p => (
            <div key={p.id} className="rounded-card bg-surface p-5 shadow-surface">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <ScrollText size={14} className="text-muted-foreground" />
                  <span className="font-mono text-[10px] text-muted-foreground">{p.id}</span>
                </div>
                <span className={cn("px-2 py-0.5 rounded-md text-[10px]",
                  p.status === 'Active' ? 'bg-green-soft text-status-green' : 'bg-accent-soft text-primary'
                )}>{p.status}</span>
              </div>
              <p className="text-sm font-medium text-foreground">{p.title}</p>
              <p className="text-[11px] text-muted-foreground mt-1">{p.desc}</p>
              <div className="flex items-center gap-4 mt-3">
                <div className="flex items-center gap-1 text-[11px] text-status-green"><ThumbsUp size={12} /> {p.votesFor}</div>
                <div className="flex items-center gap-1 text-[11px] text-status-red"><ThumbsDown size={12} /> {p.votesAgainst}</div>
                {p.endsIn && <span className="text-[10px] text-muted-foreground ml-auto flex items-center gap-1"><Clock size={10} /> Ends in {p.endsIn}</span>}
                {p.status === 'Active' && (
                  <div className="flex gap-1 ml-auto">
                    <Button variant="outline-green" size="xs"><ThumbsUp size={10} /> Vote For</Button>
                    <Button variant="outline" size="xs"><ThumbsDown size={10} /> Against</Button>
                  </div>
                )}
              </div>
              <div className="mt-3 h-1.5 bg-surface-3 rounded-full overflow-hidden">
                <div className="h-full bg-status-green rounded-full" style={{ width: `${(p.votesFor / (p.votesFor + p.votesAgainst)) * 100}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Documents */}
      <div>
        <span className="section-label mb-3 block">Protocol Documents</span>
        <div className="rounded-card bg-surface shadow-surface overflow-hidden">
          {documents.map((d, i) => (
            <div key={i} className={cn("flex items-center justify-between px-5 py-3 hover:bg-[rgba(255,255,255,0.02)]", i < documents.length - 1 && 'border-b border-border')}>
              <div className="flex items-center gap-2">
                <BookOpen size={14} className="text-muted-foreground" />
                <span className="text-[12px] text-foreground">{d.name}</span>
                <span className="text-[9px] text-muted-foreground font-mono">{d.type} · {d.size}</span>
              </div>
              <Button variant="ghost" size="xs"><Download size={12} /> Download</Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
