import React, { useState } from 'react';
import { Bell, CheckCircle2, AlertTriangle, Coins, Globe2, FileText, Radio } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const notifications = [
  { icon: AlertTriangle, type: 'Alert', title: 'Node NR-NODE-007 went offline', desc: 'Nellore RE Park — No heartbeat since 06:14 IST', time: '2h ago', read: false },
  { icon: Coins, type: 'Reward', title: 'DLN Distribution Completed', desc: '18,400 DLN credited to your wallet · TX: 0x7a2f...c31b', time: '1d ago', read: false },
  { icon: Globe2, type: 'Territory', title: 'Territory request TRQ-0047 submitted', desc: 'Haryana Territory 6 — Pending admin review', time: '3d ago', read: true },
  { icon: FileText, type: 'Document', title: 'Electrical Contractor License rejected', desc: 'Please re-upload a valid, current license', time: '5d ago', read: true },
  { icon: Radio, type: 'Node', title: 'Firmware v3.2.1 available', desc: '48 nodes eligible for update at Thar cluster', time: '1w ago', read: true },
  { icon: CheckCircle2, type: 'System', title: 'Protocol sync completed', desc: 'All nodes synced with DeLEN Protocol v2.4', time: '1w ago', read: true },
];

export default function NotificationsPage() {
  const [filter, setFilter] = useState('all');
  const unread = notifications.filter(n => !n.read).length;

  const filtered = filter === 'all' ? notifications : filter === 'unread' ? notifications.filter(n => !n.read) : notifications.filter(n => n.type === filter);

  return (
    <div className="p-4 md:p-6 max-w-[800px] mx-auto space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
        <div>
          <h1 className="font-display font-bold text-2xl text-foreground">Notifications</h1>
          <p className="text-sm text-muted-foreground mt-1">{unread} unread notifications</p>
        </div>
        <Button variant="outline" size="sm">Mark All as Read</Button>
      </div>

      <div className="flex gap-2 flex-wrap">
        {['all', 'unread', 'Alert', 'Reward', 'Territory', 'Node'].map(f => (
          <button key={f} onClick={() => setFilter(f)} className={cn(
            "px-3 py-1.5 rounded-lg text-[11px] capitalize transition-colors",
            filter === f ? 'bg-accent-soft text-primary' : 'bg-surface text-muted-foreground hover:bg-surface-2'
          )}>{f}</button>
        ))}
      </div>

      <div className="space-y-2">
        {filtered.map((n, i) => (
          <div key={i} className={cn(
            "rounded-card bg-surface p-4 shadow-surface flex gap-3 transition-all hover:shadow-surface-hover cursor-pointer",
            !n.read && 'border-l-2 border-l-primary'
          )}>
            <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
              n.type === 'Alert' ? 'bg-orange-soft' : n.type === 'Reward' ? 'bg-green-soft' : 'bg-accent-soft'
            )}>
              <n.icon size={14} className={cn(
                n.type === 'Alert' ? 'text-status-orange' : n.type === 'Reward' ? 'text-status-green' : 'text-primary'
              )} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className={cn("text-[12px] font-medium", n.read ? 'text-muted-foreground' : 'text-foreground')}>{n.title}</p>
                <span className="text-[9px] text-muted-foreground shrink-0">{n.time}</span>
              </div>
              <p className="text-[10px] text-muted-foreground mt-0.5">{n.desc}</p>
            </div>
            {!n.read && <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />}
          </div>
        ))}
      </div>
    </div>
  );
}
