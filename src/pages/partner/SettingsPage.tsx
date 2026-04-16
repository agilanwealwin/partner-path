import React, { useState } from 'react';
import { Building2, Users, DollarSign, Wallet, Bell, Shield, UserPlus, X, ChevronDown, ChevronUp, KeyRound, Lock, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { toast } from '@/components/ui/sonner';
import { partnerInfo } from '@/data/mockData';

const tabDefs = [
  { label: 'Company Profile', icon: Building2 },
  { label: 'Team', icon: Users },
  { label: 'Bank Details', icon: DollarSign },
  { label: 'Wallet', icon: Wallet },
  { label: 'Notifications', icon: Bell },
  { label: 'Security', icon: Shield },
];

const NOTIFICATION_ITEMS = [
  'Node offline alerts',
  'Maintenance reminders',
  'DLN distribution notifications',
  'Governance proposal updates',
  'Territory status changes',
  'Document review updates',
];

const INITIAL_MEMBERS = [
  { name: 'Rahul Sharma', role: 'Admin', email: 'rahul@sunvolt.in' },
  { name: 'Priya Patel', role: 'Project Manager', email: 'priya@sunvolt.in' },
  { name: 'Arjun Verma', role: 'Field Engineer', email: 'arjun@sunvolt.in' },
];

// ─── Reusable labelled field ───────────────────────────────────────────────
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-[11px] text-muted-foreground">{label}</label>
      <div className="mt-1">{children}</div>
    </div>
  );
}

// ─── Toggle switch ─────────────────────────────────────────────────────────
function Toggle({ on, onToggle }: { on: boolean; onToggle: () => void }) {
  return (
    <button
      role="switch"
      aria-checked={on}
      onClick={onToggle}
      className={cn(
        'w-10 h-5 rounded-full relative transition-colors duration-200',
        on ? 'bg-status-green/60' : 'bg-surface-3'
      )}
    >
      <span className={cn(
        'absolute top-0.5 w-4 h-4 rounded-full shadow transition-all duration-200',
        on ? 'right-0.5 bg-status-green' : 'left-0.5 bg-muted-foreground/50'
      )} />
    </button>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────
export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('Company Profile');

  // ── Company Profile state ──
  const [profile, setProfile] = useState({
    name: partnerInfo.name,
    email: 'contact@sunvolt.in',
    phone: '+91 98765 43210',
    website: 'https://sunvolt.in',
  });

  // ── Bank Details state ──
  const [bank, setBank] = useState({
    accountName: '',
    accountNumber: '',
    ifsc: '',
    bankName: '',
    branch: '',
    upi: '',
  });

  // ── Security forms state ──
  const [secOpen, setSecOpen] = useState<string | null>(null);
  const [tfa, setTfa] = useState({ phone: '' });
  const [pwd, setPwd] = useState({ current: '', next: '', confirm: '' });
  const [apiKey, setApiKey] = useState({ name: '', permission: 'Read Only' });

  const toggleSec = (key: string) => setSecOpen(prev => prev === key ? null : key);

  // ── Notifications state ──
  const [notifs, setNotifs] = useState<Record<string, boolean>>(
    Object.fromEntries(NOTIFICATION_ITEMS.map(n => [n, true]))
  );

  // ── Team state ──
  const [members, setMembers] = useState(INITIAL_MEMBERS);
  const [showInvite, setShowInvite] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('');
  const [inviteError, setInviteError] = useState('');

  // ── Handlers ──
  const saveProfile = () => {
    toast.success('Company profile saved', { description: 'Your changes have been updated successfully.' });
  };

  const saveBank = () => {
    if (!bank.accountName || !bank.accountNumber || !bank.ifsc || !bank.bankName) {
      toast.error('Missing required fields', { description: 'Please fill all required bank details.' });
      return;
    }
    toast.success('Bank details saved', { description: 'Your bank account information has been updated.' });
  };

  const toggleNotif = (key: string) => {
    setNotifs(prev => {
      const next = { ...prev, [key]: !prev[key] };
      toast(next[key] ? 'Notification enabled' : 'Notification disabled', {
        description: key,
        icon: next[key] ? '🔔' : '🔕',
      });
      return next;
    });
  };

  const sendInvite = () => {
    if (!inviteEmail.trim()) { setInviteError('Email is required.'); return; }
    if (!inviteEmail.includes('@')) { setInviteError('Enter a valid email address.'); return; }
    if (!inviteRole.trim()) { setInviteError('Role is required.'); return; }
    const name = inviteEmail.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
    setMembers(m => [...m, { name, role: inviteRole, email: inviteEmail }]);
    toast.success('Invite sent!', { description: `${inviteEmail} has been invited as ${inviteRole}.` });
    setInviteEmail(''); setInviteRole(''); setInviteError(''); setShowInvite(false);
  };

  return (
    <div className="p-4 md:p-6 space-y-4 md:space-y-6">
      <div>
        <h1 className="font-display font-bold text-2xl text-foreground">Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage your partner account and preferences</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 md:gap-6">
        {/* Sidebar */}
        <div className="w-full md:w-[200px] shrink-0 flex md:flex-col gap-1 overflow-x-auto">
          {tabDefs.map(tab => (
            <button key={tab.label} onClick={() => setActiveTab(tab.label)} className={cn(
              'w-full md:w-full flex items-center gap-2 px-3 py-2 rounded-lg text-[12px] transition-colors text-left whitespace-nowrap',
              activeTab === tab.label ? 'bg-accent-soft text-primary' : 'text-muted-foreground hover:bg-surface-2 hover:text-foreground'
            )}><tab.icon size={14} /> {tab.label}</button>
          ))}
        </div>

        {/* Panel */}
        <div className="flex-1 min-w-0">

          {/* ── Company Profile ── */}
          {activeTab === 'Company Profile' && (
            <div className="rounded-card bg-surface p-6 shadow-surface space-y-4">
              <span className="section-label">Company Information</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Company Name">
                  <Input className="h-9 text-sm bg-surface-2 border-border" value={profile.name} onChange={e => setProfile(p => ({ ...p, name: e.target.value }))} />
                </Field>
                <Field label="Partner ID">
                  <Input className="h-9 text-sm bg-surface-2 border-border font-mono" value={partnerInfo.partnerId} readOnly />
                </Field>
                <Field label="Tier">
                  <Input className="h-9 text-sm bg-surface-2 border-border" value={partnerInfo.tier} readOnly />
                </Field>
                <Field label="Email">
                  <Input className="h-9 text-sm bg-surface-2 border-border" type="email" value={profile.email} onChange={e => setProfile(p => ({ ...p, email: e.target.value }))} />
                </Field>
                <Field label="Phone">
                  <Input className="h-9 text-sm bg-surface-2 border-border" value={profile.phone} onChange={e => setProfile(p => ({ ...p, phone: e.target.value }))} />
                </Field>
                <Field label="Website">
                  <Input className="h-9 text-sm bg-surface-2 border-border" value={profile.website} onChange={e => setProfile(p => ({ ...p, website: e.target.value }))} />
                </Field>
              </div>
              <Button size="sm" onClick={saveProfile}>Save Changes</Button>
            </div>
          )}

          {/* ── Team ── */}
          {activeTab === 'Team' && (
            <div className="rounded-card bg-surface p-6 shadow-surface space-y-4">
              <div className="flex items-center justify-between">
                <span className="section-label">Team Members</span>
                <Button size="xs" onClick={() => setShowInvite(true)}><UserPlus size={12} /> Invite Member</Button>
              </div>

              <div className="space-y-2">
                {members.map(m => (
                  <div key={m.email} className="flex items-center justify-between p-3 rounded-lg bg-surface-2 border border-border">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-accent-soft flex items-center justify-center text-xs font-bold text-primary">
                        {m.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="text-[12px] text-foreground font-medium">{m.name}</p>
                        <p className="text-[10px] text-muted-foreground">{m.email}</p>
                      </div>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-md bg-surface-3 text-muted-foreground">{m.role}</span>
                  </div>
                ))}
              </div>

              {/* Invite Modal */}
              {showInvite && (
                <div
                  className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
                  onClick={e => { if (e.target === e.currentTarget) { setShowInvite(false); setInviteError(''); } }}
                >
                  <div className="bg-background border border-border rounded-2xl shadow-2xl w-full max-w-sm mx-4 p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="font-display font-semibold text-base text-foreground">Invite Team Member</h2>
                        <p className="text-xs text-muted-foreground mt-0.5">Send an invitation email</p>
                      </div>
                      <button onClick={() => { setShowInvite(false); setInviteError(''); }} className="p-1.5 rounded-lg hover:bg-surface-2 text-muted-foreground hover:text-foreground transition-colors">
                        <X size={16} />
                      </button>
                    </div>

                    <div className="space-y-3">
                      <Field label="Email Address *">
                        <Input
                          type="email"
                          placeholder="colleague@company.com"
                          className="h-9 text-sm bg-surface-2 border-border"
                          value={inviteEmail}
                          onChange={e => { setInviteEmail(e.target.value); setInviteError(''); }}
                        />
                      </Field>
                      <Field label="Role *">
                        <select
                          value={inviteRole}
                          onChange={e => { setInviteRole(e.target.value); setInviteError(''); }}
                          className="w-full bg-surface-2 border border-border rounded-lg px-3 py-2 text-sm text-foreground outline-none focus:border-primary transition-colors"
                        >
                          <option value="" disabled>Select a role…</option>
                          {['Admin', 'Project Manager', 'Field Engineer', 'Finance', 'Viewer'].map(r => (
                            <option key={r} value={r}>{r}</option>
                          ))}
                        </select>
                      </Field>
                      {inviteError && <p className="text-xs text-red-400 bg-red-500/10 rounded-lg px-3 py-2">{inviteError}</p>}
                    </div>

                    <div className="flex gap-2 pt-1">
                      <Button type="button" variant="outline" size="sm" className="flex-1" onClick={() => { setShowInvite(false); setInviteError(''); }}>Cancel</Button>
                      <Button type="button" size="sm" className="flex-1" onClick={sendInvite}><UserPlus size={13} /> Send Invite</Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ── Bank Details ── */}
          {activeTab === 'Bank Details' && (
            <div className="rounded-card bg-surface p-6 shadow-surface space-y-4">
              <span className="section-label">Bank Account Details</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Account Holder Name *">
                  <Input className="h-9 text-sm bg-surface-2 border-border" placeholder="As per bank records" value={bank.accountName} onChange={e => setBank(b => ({ ...b, accountName: e.target.value }))} />
                </Field>
                <Field label="Account Number *">
                  <Input className="h-9 text-sm bg-surface-2 border-border font-mono" placeholder="XXXXXXXXXXXX" value={bank.accountNumber} onChange={e => setBank(b => ({ ...b, accountNumber: e.target.value }))} />
                </Field>
                <Field label="IFSC Code *">
                  <Input className="h-9 text-sm bg-surface-2 border-border font-mono uppercase" placeholder="e.g. HDFC0001234" value={bank.ifsc} onChange={e => setBank(b => ({ ...b, ifsc: e.target.value.toUpperCase() }))} />
                </Field>
                <Field label="Bank Name *">
                  <Input className="h-9 text-sm bg-surface-2 border-border" placeholder="e.g. HDFC Bank" value={bank.bankName} onChange={e => setBank(b => ({ ...b, bankName: e.target.value }))} />
                </Field>
                <Field label="Branch">
                  <Input className="h-9 text-sm bg-surface-2 border-border" placeholder="Branch name or city" value={bank.branch} onChange={e => setBank(b => ({ ...b, branch: e.target.value }))} />
                </Field>
                <Field label="UPI ID (optional)">
                  <Input className="h-9 text-sm bg-surface-2 border-border" placeholder="yourname@upi" value={bank.upi} onChange={e => setBank(b => ({ ...b, upi: e.target.value }))} />
                </Field>
              </div>
              <Button size="sm" onClick={saveBank}>Save Changes</Button>
            </div>
          )}

          {/* ── Wallet ── */}
          {activeTab === 'Wallet' && (
            <div className="rounded-card bg-surface p-6 shadow-surface space-y-4">
              <span className="section-label">Wallet Configuration</span>
              <div className="p-4 rounded-lg bg-surface-2 border border-border">
                <span className="text-[10px] text-muted-foreground uppercase">Connected Wallet</span>
                <p className="font-mono text-sm text-foreground mt-1">{partnerInfo.wallet}</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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

          {/* ── Notifications ── */}
          {activeTab === 'Notifications' && (
            <div className="rounded-card bg-surface p-6 shadow-surface space-y-4">
              <div className="flex items-center justify-between">
                <span className="section-label">Notification Preferences</span>
                <span className="text-[10px] text-muted-foreground">
                  {Object.values(notifs).filter(Boolean).length}/{NOTIFICATION_ITEMS.length} enabled
                </span>
              </div>
              {NOTIFICATION_ITEMS.map(n => (
                <div key={n} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <div>
                    <span className="text-[12px] text-foreground">{n}</span>
                    {notifs[n]
                      ? <span className="ml-2 text-[10px] text-status-green">On</span>
                      : <span className="ml-2 text-[10px] text-muted-foreground">Off</span>
                    }
                  </div>
                  <Toggle on={notifs[n]} onToggle={() => toggleNotif(n)} />
                </div>
              ))}
            </div>
          )}

          {/* ── Security ── */}
          {activeTab === 'Security' && (
            <div className="rounded-card bg-surface p-6 shadow-surface space-y-3">
              <span className="section-label">Security Settings</span>

              {/* 2FA */}
              <div className="rounded-lg bg-surface-2 border border-border overflow-hidden">
                <button
                  onClick={() => toggleSec('2fa')}
                  className="w-full flex items-center justify-between px-4 py-3 hover:bg-surface-3 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Smartphone size={15} className="text-primary" />
                    <div className="text-left">
                      <p className="text-[12px] text-foreground font-medium">Two-Factor Authentication</p>
                      <p className="text-[10px] text-muted-foreground">Add extra security to your account</p>
                    </div>
                  </div>
                  {secOpen === '2fa' ? <ChevronUp size={14} className="text-muted-foreground" /> : <ChevronDown size={14} className="text-muted-foreground" />}
                </button>
                {secOpen === '2fa' && (
                  <div className="px-4 pb-4 pt-1 space-y-3 border-t border-border">
                    <Field label="Mobile Number">
                      <Input className="h-9 text-sm bg-surface border-border" placeholder="+91 9876543210" value={tfa.phone} onChange={e => setTfa({ phone: e.target.value })} />
                    </Field>
                    <Button size="sm" onClick={() => { toast.success('2FA Enabled', { description: 'Two-factor authentication has been set up.' }); setSecOpen(null); }}>
                      Enable 2FA
                    </Button>
                  </div>
                )}
              </div>

              {/* Change Password */}
              <div className="rounded-lg bg-surface-2 border border-border overflow-hidden">
                <button
                  onClick={() => toggleSec('pwd')}
                  className="w-full flex items-center justify-between px-4 py-3 hover:bg-surface-3 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Lock size={15} className="text-primary" />
                    <div className="text-left">
                      <p className="text-[12px] text-foreground font-medium">Change Password</p>
                      <p className="text-[10px] text-muted-foreground">Last changed 45 days ago</p>
                    </div>
                  </div>
                  {secOpen === 'pwd' ? <ChevronUp size={14} className="text-muted-foreground" /> : <ChevronDown size={14} className="text-muted-foreground" />}
                </button>
                {secOpen === 'pwd' && (
                  <div className="px-4 pb-4 pt-1 space-y-3 border-t border-border">
                    <Field label="Current Password">
                      <Input type="password" className="h-9 text-sm bg-surface border-border" placeholder="••••••••" value={pwd.current} onChange={e => setPwd(p => ({ ...p, current: e.target.value }))} />
                    </Field>
                    <Field label="New Password">
                      <Input type="password" className="h-9 text-sm bg-surface border-border" placeholder="••••••••" value={pwd.next} onChange={e => setPwd(p => ({ ...p, next: e.target.value }))} />
                    </Field>
                    <Field label="Confirm New Password">
                      <Input type="password" className="h-9 text-sm bg-surface border-border" placeholder="••••••••" value={pwd.confirm} onChange={e => setPwd(p => ({ ...p, confirm: e.target.value }))} />
                    </Field>
                    <Button size="sm" onClick={() => { toast.success('Password Updated', { description: 'Your password has been changed successfully.' }); setPwd({ current: '', next: '', confirm: '' }); setSecOpen(null); }}>
                      Update Password
                    </Button>
                  </div>
                )}
              </div>

              {/* API Keys */}
              <div className="rounded-lg bg-surface-2 border border-border overflow-hidden">
                <button
                  onClick={() => toggleSec('api')}
                  className="w-full flex items-center justify-between px-4 py-3 hover:bg-surface-3 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <KeyRound size={15} className="text-primary" />
                    <div className="text-left">
                      <p className="text-[12px] text-foreground font-medium">API Keys</p>
                      <p className="text-[10px] text-muted-foreground">Generate and manage API access keys</p>
                    </div>
                  </div>
                  {secOpen === 'api' ? <ChevronUp size={14} className="text-muted-foreground" /> : <ChevronDown size={14} className="text-muted-foreground" />}
                </button>
                {secOpen === 'api' && (
                  <div className="px-4 pb-4 pt-1 space-y-3 border-t border-border">
                    <Field label="Key Name">
                      <Input className="h-9 text-sm bg-surface border-border" placeholder="e.g. Production Key" value={apiKey.name} onChange={e => setApiKey(k => ({ ...k, name: e.target.value }))} />
                    </Field>
                    <Field label="Permission">
                      <select
                        value={apiKey.permission}
                        onChange={e => setApiKey(k => ({ ...k, permission: e.target.value }))}
                        className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-sm text-foreground outline-none focus:border-primary transition-colors"
                      >
                        {['Read Only', 'Read & Write', 'Full Access'].map(opt => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    </Field>
                    <Button size="sm" onClick={() => { toast.success('API Key Generated', { description: `Key "${apiKey.name || 'Unnamed'}" (${apiKey.permission}) has been created.` }); setApiKey({ name: '', permission: 'Read Only' }); setSecOpen(null); }}>
                      Generate Key
                    </Button>
                  </div>
                )}
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}
