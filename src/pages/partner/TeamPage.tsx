import React from 'react';
import { Users, UserPlus, Mail, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const members = [
  { name: 'Rahul Sharma', role: 'Admin', email: 'rahul@sunvolt.in', status: 'Active', lastActive: '2 min ago' },
  { name: 'Priya Patel', role: 'Project Manager', email: 'priya@sunvolt.in', status: 'Active', lastActive: '1h ago' },
  { name: 'Arjun Verma', role: 'Field Engineer', email: 'arjun@sunvolt.in', status: 'Active', lastActive: '3h ago' },
  { name: 'Sneha Reddy', role: 'Compliance Officer', email: 'sneha@sunvolt.in', status: 'Active', lastActive: '1d ago' },
  { name: 'Vikram Singh', role: 'Site Engineer', email: 'vikram@sunvolt.in', status: 'Invited', lastActive: '—' },
];

export default function TeamPage() {
  return (
    <div className="p-4 md:p-6 max-w-[900px] mx-auto space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
        <div>
          <h1 className="font-display font-bold text-2xl text-foreground">Team Management</h1>
          <p className="text-sm text-muted-foreground mt-1">{members.length} team members · SunVolt EPC Ltd.</p>
        </div>
        <Button size="sm"><UserPlus size={14} /> Invite Member</Button>
      </div>

      <div className="rounded-card border border-border overflow-x-auto">
        <table className="w-full text-[12px]">
          <thead>
            <tr className="border-b border-border bg-surface">
              {['Member', 'Role', 'Email', 'Status', 'Last Active', 'Actions'].map(h => (
                <th key={h} className="text-left px-4 py-3 text-[10px] uppercase tracking-wider text-muted-foreground font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {members.map(m => (
              <tr key={m.email} className="border-b border-border last:border-0 hover:bg-[rgba(255,255,255,0.02)]">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-accent-soft flex items-center justify-center text-[10px] font-bold text-primary">
                      {m.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <span className="text-foreground font-medium">{m.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className={cn("px-1.5 py-0.5 rounded-md text-[10px]",
                    m.role === 'Admin' ? 'bg-accent-soft text-primary' : 'bg-surface-3 text-muted-foreground'
                  )}>{m.role}</span>
                </td>
                <td className="px-4 py-3 text-muted-foreground font-mono">{m.email}</td>
                <td className="px-4 py-3">
                  <span className={cn("px-1.5 py-0.5 rounded-md text-[10px]",
                    m.status === 'Active' ? 'bg-green-soft text-status-green' : 'bg-orange-soft text-status-orange'
                  )}>{m.status}</span>
                </td>
                <td className="px-4 py-3 text-muted-foreground">{m.lastActive}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-1">
                    <button className="p-1 rounded hover:bg-surface-2"><Mail size={14} className="text-muted-foreground" /></button>
                    <button className="p-1 rounded hover:bg-surface-2"><Shield size={14} className="text-muted-foreground" /></button>
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
