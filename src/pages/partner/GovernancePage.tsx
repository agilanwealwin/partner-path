import React, { useState } from 'react';
import { ScrollText, ThumbsUp, ThumbsDown, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/sonner';
import { cn } from '@/lib/utils';

const initialProposals = [
  { id: 'DLN-GOV-012', title: 'Increase Minimum Node Uptime Requirement to 99%', status: 'Active', votesFor: 842, votesAgainst: 156, endsIn: '3 days', desc: 'Proposal to raise the minimum node uptime requirement from 95% to 99% for DLN reward eligibility.' },
  { id: 'DLN-GOV-011', title: 'Add BESS Integration as Tier Qualification Criterion', status: 'Active', votesFor: 1024, votesAgainst: 312, endsIn: '5 days', desc: 'Include battery energy storage experience as a scoring criterion for Prime tier qualification.' },
  { id: 'DLN-GOV-010', title: 'Reduce Vesting Cliff from 6 to 3 Months', status: 'Passed', votesFor: 2148, votesAgainst: 423, endsIn: '', desc: 'Reduce the initial cliff period for token vesting from 6 months to 3 months.' },
];

type Vote = 'for' | 'against' | null;

export default function GovernancePage() {
  const [proposals, setProposals] = useState(initialProposals);
  // track each proposal's user vote: id -> 'for' | 'against' | null
  const [votes, setVotes] = useState<Record<string, Vote>>({});

  const handleVote = (id: string, direction: 'for' | 'against') => {
    const prev = votes[id];
    if (prev === direction) return; // already voted this way

    setProposals(ps =>
      ps.map(p => {
        if (p.id !== id) return p;
        let { votesFor, votesAgainst } = p;
        // undo previous vote
        if (prev === 'for') votesFor -= 1;
        if (prev === 'against') votesAgainst -= 1;
        // apply new vote
        if (direction === 'for') votesFor += 1;
        if (direction === 'against') votesAgainst += 1;
        return { ...p, votesFor, votesAgainst };
      })
    );

    setVotes(v => ({ ...v, [id]: direction }));
    toast.success(direction === 'for' ? 'Voted For ✓' : 'Voted Against ✗', {
      description: `Your vote has been recorded for ${id}.`,
    });
  };

  return (
    <div className="p-4 md:p-6 space-y-4 md:space-y-6">
      <div>
        <h1 className="font-display font-bold text-2xl text-foreground">Governance</h1>
        <p className="text-sm text-muted-foreground mt-1">Protocol proposals and governance documents · Pulse/Prime voting</p>
      </div>

      {/* Proposals */}
      <div>
        <span className="section-label mb-3 block">Active &amp; Recent Proposals</span>
        <div className="space-y-3">
          {proposals.map(p => {
            const myVote = votes[p.id] ?? null;
            const total = p.votesFor + p.votesAgainst;
            const forPct = total > 0 ? (p.votesFor / total) * 100 : 0;

            return (
              <div key={p.id} className="rounded-card bg-surface p-5 shadow-surface">
                {/* Header */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <ScrollText size={14} className="text-muted-foreground" />
                    <span className="font-mono text-[10px] text-muted-foreground">{p.id}</span>
                  </div>
                  <span className={cn(
                    "px-2 py-0.5 rounded-md text-[10px]",
                    p.status === 'Active' ? 'bg-green-soft text-status-green' : 'bg-accent-soft text-primary'
                  )}>{p.status}</span>
                </div>

                {/* Title & desc */}
                <p className="text-sm font-medium text-foreground">{p.title}</p>
                <p className="text-[11px] text-muted-foreground mt-1">{p.desc}</p>

                {/* Vote counts + action buttons */}
                <div className="flex items-center gap-4 mt-3 flex-wrap">
                  {/* Clickable thumbs-up count */}
                  <button
                    onClick={() => p.status === 'Active' && handleVote(p.id, 'for')}
                    disabled={p.status !== 'Active'}
                    className={cn(
                      "flex items-center gap-1 text-[11px] rounded-md px-2 py-1 transition-colors",
                      myVote === 'for'
                        ? "bg-green-soft text-status-green font-semibold"
                        : "text-status-green hover:bg-green-soft",
                      p.status !== 'Active' && "opacity-50 cursor-default"
                    )}
                  >
                    <ThumbsUp size={12} />
                    {p.votesFor.toLocaleString()}
                  </button>

                  {/* Clickable thumbs-down count */}
                  <button
                    onClick={() => p.status === 'Active' && handleVote(p.id, 'against')}
                    disabled={p.status !== 'Active'}
                    className={cn(
                      "flex items-center gap-1 text-[11px] rounded-md px-2 py-1 transition-colors",
                      myVote === 'against'
                        ? "bg-red-500/10 text-status-red font-semibold"
                        : "text-status-red hover:bg-red-500/10",
                      p.status !== 'Active' && "opacity-50 cursor-default"
                    )}
                  >
                    <ThumbsDown size={12} />
                    {p.votesAgainst.toLocaleString()}
                  </button>

                  {/* Timer */}
                  {p.endsIn && (
                    <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                      <Clock size={10} /> Ends in {p.endsIn}
                    </span>
                  )}

                  {/* Vote For / Against buttons */}
                  {p.status === 'Active' && (
                    <div className="flex gap-1 ml-auto">
                      <Button
                        variant={myVote === 'for' ? 'default' : 'outline-green'}
                        size="xs"
                        onClick={() => handleVote(p.id, 'for')}
                        className={cn(
                          "transition-all",
                          myVote === 'for' && "ring-2 ring-status-green/40"
                        )}
                      >
                        <ThumbsUp size={10} />
                        {myVote === 'for' ? 'Voted For ✓' : 'Vote For'}
                      </Button>
                      <Button
                        variant={myVote === 'against' ? 'destructive' : 'outline'}
                        size="xs"
                        onClick={() => handleVote(p.id, 'against')}
                        className={cn(
                          "transition-all",
                          myVote === 'against' && "ring-2 ring-status-red/40"
                        )}
                      >
                        <ThumbsDown size={10} />
                        {myVote === 'against' ? 'Voted Against ✗' : 'Against'}
                      </Button>
                    </div>
                  )}
                </div>

                {/* Progress bar */}
                <div className="mt-3 h-1.5 bg-surface-3 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-status-green rounded-full transition-all duration-500"
                    style={{ width: `${forPct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
