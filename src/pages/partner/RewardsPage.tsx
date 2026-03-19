import React from 'react';
import { Coins, TrendingUp, Clock, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

const rewardsByProject = [
  { project: 'Thar Solar Farm Ph.2', mw: '12.4', uptime: '99.2%', monthly: '6,200', ytd: '34,200', pct: '24.0%' },
  { project: 'Bikaner Solar Park', mw: '8.0', uptime: '99.5%', monthly: '4,100', ytd: '16,800', pct: '11.8%' },
  { project: 'Nellore RE Park Ph.1', mw: '15.0', uptime: '95.4%', monthly: '4,800', ytd: '18,400', pct: '12.9%' },
  { project: 'Anantapur Agri-PV', mw: '3.0', uptime: '98.1%', monthly: '1,200', ytd: '5,200', pct: '3.6%' },
  { project: 'Pune Rooftop Portfolio', mw: '2.1', uptime: '—', monthly: '200', ytd: '200', pct: '0.1%' },
];

const monthlyEarnings = [
  { month: 'Apr', value: 10200 }, { month: 'May', value: 11400 }, { month: 'Jun', value: 12800 },
  { month: 'Jul', value: 11200 }, { month: 'Aug', value: 10800 }, { month: 'Sep', value: 11600 },
  { month: 'Oct', value: 12400 }, { month: 'Nov', value: 13800 }, { month: 'Dec', value: 14200 },
  { month: 'Jan', value: 15600 }, { month: 'Feb', value: 16800 }, { month: 'Mar', value: 18400 },
];

const distributions = [
  { date: 'Mar 1, 2025', amount: '18,400', txHash: '0x7a2f...c31b', status: 'Completed' },
  { date: 'Feb 1, 2025', amount: '16,800', txHash: '0x4e1d...a92f', status: 'Completed' },
  { date: 'Jan 1, 2025', amount: '15,600', txHash: '0x9b3c...d47e', status: 'Completed' },
  { date: 'Dec 1, 2024', amount: '14,200', txHash: '0x2f8a...b16c', status: 'Completed' },
];

const maxEarning = Math.max(...monthlyEarnings.map(m => m.value));

export default function RewardsPage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="font-display font-bold text-2xl text-foreground">Rewards</h1>
        <p className="text-sm text-muted-foreground mt-1">$DLN token rewards and distribution history</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-card bg-surface p-5 shadow-surface border border-status-orange/10">
          <div className="flex items-center gap-2 mb-2"><Coins size={18} className="text-status-orange" /><span className="section-label text-status-orange">YTD EARNED</span></div>
          <p className="font-display font-bold text-3xl text-status-orange">142,800 DLN</p>
          <p className="text-[10px] text-muted-foreground mt-1">≈ $284,600 USD</p>
        </div>
        <div className="rounded-card bg-surface p-5 shadow-surface">
          <div className="flex items-center gap-2 mb-2"><TrendingUp size={18} className="text-status-green" /><span className="section-label">THIS MONTH</span></div>
          <p className="font-display font-bold text-3xl text-foreground">18,400 DLN</p>
          <p className="text-[10px] text-muted-foreground mt-1">≈ $36,720 USD</p>
        </div>
        <div className="rounded-card bg-surface p-5 shadow-surface">
          <div className="flex items-center gap-2 mb-2"><Clock size={18} className="text-muted-foreground" /><span className="section-label">PENDING</span></div>
          <p className="font-display font-bold text-3xl text-foreground">3,200 DLN</p>
          <p className="text-[10px] text-muted-foreground mt-1">Next distribution: Apr 1, 2025</p>
        </div>
      </div>

      {/* Formula */}
      <div className="rounded-card bg-accent-soft border border-primary/10 p-4">
        <div className="flex items-center gap-2 mb-2"><Info size={14} className="text-primary" /><span className="text-xs font-medium text-primary">Distribution Formula</span></div>
        <p className="text-[11px] text-muted-foreground font-mono">DLN_reward = (MW_deployed × uptime% × energy_factor) × protocol_multiplier × tier_bonus</p>
      </div>

      {/* Rewards by Project */}
      <div className="rounded-card bg-surface shadow-surface overflow-hidden">
        <div className="px-5 py-3 border-b border-border"><span className="section-label">Rewards by Project</span></div>
        <table className="w-full text-[12px]">
          <thead>
            <tr className="border-b border-border">
              {['Project', 'MW', 'Uptime', 'Monthly DLN', 'YTD DLN', '% Total'].map(h => (
                <th key={h} className="text-left px-4 py-2.5 text-[10px] uppercase tracking-wider text-muted-foreground font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rewardsByProject.map(r => (
              <tr key={r.project} className="border-b border-border last:border-0 hover:bg-[rgba(255,255,255,0.02)]">
                <td className="px-4 py-2.5 text-foreground font-medium">{r.project}</td>
                <td className="px-4 py-2.5 font-mono text-foreground">{r.mw}</td>
                <td className="px-4 py-2.5 font-mono text-foreground">{r.uptime}</td>
                <td className="px-4 py-2.5 font-mono text-status-orange">{r.monthly}</td>
                <td className="px-4 py-2.5 font-mono text-status-orange">{r.ytd}</td>
                <td className="px-4 py-2.5 font-mono text-muted-foreground">{r.pct}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Monthly Chart */}
      <div className="rounded-card bg-surface p-5 shadow-surface">
        <span className="section-label mb-3 block">Monthly Earnings (DLN)</span>
        <div className="flex items-end gap-2 h-[160px]">
          {monthlyEarnings.map(m => (
            <div key={m.month} className="flex-1 flex flex-col items-center gap-1">
              <span className="text-[7px] text-foreground font-mono">{(m.value / 1000).toFixed(1)}K</span>
              <div className="w-full rounded-t-sm bg-status-orange/60" style={{ height: `${(m.value / maxEarning) * 100}%` }} />
              <span className="text-[8px] text-muted-foreground">{m.month}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Distribution History */}
      <div className="rounded-card bg-surface shadow-surface overflow-hidden">
        <div className="px-5 py-3 border-b border-border"><span className="section-label">Distribution History</span></div>
        <table className="w-full text-[12px]">
          <thead>
            <tr className="border-b border-border">
              {['Date', 'Amount', 'TX Hash', 'Status'].map(h => (
                <th key={h} className="text-left px-4 py-2.5 text-[10px] uppercase tracking-wider text-muted-foreground font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {distributions.map(d => (
              <tr key={d.txHash} className="border-b border-border last:border-0 hover:bg-[rgba(255,255,255,0.02)]">
                <td className="px-4 py-2.5 text-muted-foreground">{d.date}</td>
                <td className="px-4 py-2.5 font-mono text-status-orange">{d.amount} DLN</td>
                <td className="px-4 py-2.5 font-mono text-primary">{d.txHash}</td>
                <td className="px-4 py-2.5"><span className="px-1.5 py-0.5 rounded-md bg-green-soft text-status-green text-[10px]">{d.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
