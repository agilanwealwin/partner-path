import React, { useState } from 'react';
import { Building2, Users, DollarSign, Wallet, Bell, Settings, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { partnerInfo } from '@/data/mockData';

const tabDefs = [
  { label: 'Company Profile', icon: Building2 },
  { label: 'Team', icon: Users },
  { label: 'Bank Details', icon: DollarSign },
  { label: 'Wallet', icon: Wallet },
  { label: 'Notifications', icon: Bell },
  { label: 'API & Webhooks', icon: Settings },
  { label: 'Security', icon: Shield },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('Company Profile');

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="font-display font-bold text-2xl text-foreground">Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage your partner account and preferences</p>
      </div>

      <div className="flex gap-6">
        {/* Tab Sidebar */}
        <div className="w-[200px] shrink-0 space-y-1">
          {tabDefs.map(tab => (
            <button key={tab.label} onClick={() => setActiveTab(tab.label)} className={cn(
              "w-full flex items-center gap-2 px-3 py-2 rounded-lg text-[12px] transition-colors text-left",
              activeTab === tab.label ? 'bg-accent-soft text-primary' : 'text-muted-foreground hover:bg-surface-2 hover:text-foreground'
            )}><tab.icon size={14} /> {tab.label}</button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {activeTab === 'Company Profile' && (
            <div className="rounded-card bg-surface p-6 shadow-surface space-y-4">
              <span className="section-label">Company Information</span>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="text-[11px] text-muted-foreground">Company Name</label><Input className="mt-1 h-9 text-sm bg-surface-2 border-border" defaultValue={partnerInfo.name} /></div>
                <div><label className="text-[11px] text-muted-foreground">Partner ID</label><Input className="mt-1 h-9 text-sm bg-surface-2 border-border font-mono" defaultValue={partnerInfo.partnerId} readOnly /></div>
                <div><label className="text-[11px] text-muted-foreground">Tier</label><Input className="mt-1 h-9 text-sm bg-surface-2 border-border" defaultValue={partnerInfo.tier} readOnly /></div>
                <div><label className="text-[11px] text-muted-foreground">Email</label><Input className="mt-1 h-9 text-sm bg-surface-2 border-border" defaultValue="contact@sunvolt.in" /></div>
                <div><label className="text-[11px] text-muted-foreground">Phone</label><Input className="mt-1 h-9 text-sm bg-surface-2 border-border" defaultValue="+91 98765 43210" /></div>
                <div><label className="text-[11px] text-muted-foreground">Website</label><Input className="mt-1 h-9 text-sm bg-surface-2 border-border" defaultValue="https://sunvolt.in" /></div>
              </div>
              <Button size="sm">Save Changes</Button>
            </div>
          )}

          {activeTab === 'Team' && (
            <div className="rounded-card bg-surface p-6 shadow-surface space-y-4">
              <div className="flex items-center justify-between">
                <span className="section-label">Team Members</span>
                <Button size="xs"><Users size={12} /> Invite Member</Button>
              </div>
              <div className="space-y-2">
                {[
                  { name: 'Rahul Sharma', role: 'Admin', email: 'rahul@sunvolt.in' },
                  { name: 'Priya Patel', role: 'Project Manager', email: 'priya@sunvolt.in' },
                  { name: 'Arjun Verma', role: 'Field Engineer', email: 'arjun@sunvolt.in' },
                ].map(m => (
                  <div key={m.email} className="flex items-center justify-between p-3 rounded-lg bg-surface-2 border border-border">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-accent-soft flex items-center justify-center text-xs font-bold text-primary">{m.name.split(' ').map(n => n[0]).join('')}</div>
                      <div><p className="text-[12px] text-foreground font-medium">{m.name}</p><p className="text-[10px] text-muted-foreground">{m.email}</p></div>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-md bg-surface-3 text-muted-foreground">{m.role}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'Wallet' && (
            <div className="rounded-card bg-surface p-6 shadow-surface space-y-4">
              <span className="section-label">Wallet Configuration</span>
              <div className="p-4 rounded-lg bg-surface-2 border border-border">
                <span className="text-[10px] text-muted-foreground uppercase">Connected Wallet</span>
                <p className="font-mono text-sm text-foreground mt-1">{partnerInfo.wallet}</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-lg bg-surface-2 border border-border">
                  <span className="text-[10px] text-muted-foreground uppercase">DLN Balance</span>
                  <p className="font-display font-bold text-lg text-status-orange">142,800 DLN</p>
                </div>
                <div className="p-3 rounded-lg bg-surface-2 border border-border">
                  <span className="text-[10px] text-muted-foreground uppercase">Vested (Locked)</span>
                  <p className="font-display font-bold text-lg text-foreground">7,200 DLN</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'Notifications' && (
            <div className="rounded-card bg-surface p-6 shadow-surface space-y-4">
              <span className="section-label">Notification Preferences</span>
              {[
                'Node offline alerts', 'Maintenance reminders', 'DLN distribution notifications',
                'Governance proposal updates', 'Territory status changes', 'Document review updates',
              ].map(n => (
                <div key={n} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <span className="text-[12px] text-foreground">{n}</span>
                  <button className="w-10 h-5 rounded-full bg-status-green/30 relative">
                    <span className="absolute right-0.5 top-0.5 w-4 h-4 rounded-full bg-status-green transition-transform" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'Security' && (
            <div className="rounded-card bg-surface p-6 shadow-surface space-y-4">
              <span className="section-label">Security Settings</span>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-lg bg-surface-2 border border-border">
                  <div><p className="text-[12px] text-foreground">Two-Factor Authentication</p><p className="text-[10px] text-muted-foreground">Add extra security to your account</p></div>
                  <Button variant="outline" size="xs">Enable</Button>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-surface-2 border border-border">
                  <div><p className="text-[12px] text-foreground">Change Password</p><p className="text-[10px] text-muted-foreground">Last changed 45 days ago</p></div>
                  <Button variant="outline" size="xs">Update</Button>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-surface-2 border border-border">
                  <div><p className="text-[12px] text-foreground">API Keys</p><p className="text-[10px] text-muted-foreground">Manage API access keys</p></div>
                  <Button variant="outline" size="xs">Manage</Button>
                </div>
              </div>
            </div>
          )}

          {(activeTab === 'Bank Details' || activeTab === 'API & Webhooks') && (
            <div className="rounded-card bg-surface p-6 shadow-surface">
              <span className="section-label">{activeTab}</span>
              <p className="text-sm text-muted-foreground mt-3">Configuration for {activeTab.toLowerCase()} will be available here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
