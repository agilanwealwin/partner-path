import React, { useState } from 'react';
import { Coins, TrendingUp, Clock, Info, Zap, Radio, BarChart3, CheckCircle2, AlertCircle, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer
} from 'recharts';

// ─── Data ──────────────────────────────────────────────────────────────────
const rewardsByProject = [
  { project: 'Thar Solar Farm Ph.2',      nodes: 18, uptime: '99.2%', dataQuality: '98.4%', energyScore: '97.1%', weekly: '1,550', ytd: '34,200', share: '24.0%' },
  { project: 'Bikaner Solar Park',         nodes: 12, uptime: '99.5%', dataQuality: '99.1%', energyScore: '98.0%', weekly: '1,025', ytd: '16,800', share: '11.8%' },
  { project: 'Nellore RE Park Ph.1',       nodes: 22, uptime: '95.4%', dataQuality: '93.7%', energyScore: '91.2%', weekly: '1,200', ytd: '18,400', share: '12.9%' },
  { project: 'Anantapur Agri-PV',          nodes: 6,  uptime: '98.1%', dataQuality: '97.0%', energyScore: '96.3%', weekly: '300',  ytd: '5,200',  share: '3.6%' },
  { project: 'Pune Rooftop Portfolio',     nodes: 4,  uptime: '—',     dataQuality: '—',     energyScore: '—',     weekly: '50',   ytd: '200',    share: '0.1%' },
];

const weeklyEarnings = [
  { wk: 'W1', value: 3800 }, { wk: 'W2', value: 4100 }, { wk: 'W3', value: 4400 },
  { wk: 'W4', value: 4200 }, { wk: 'W5', value: 4600 }, { wk: 'W6', value: 4900 },
  { wk: 'W7', value: 4700 }, { wk: 'W8', value: 5200 }, { wk: 'W9', value: 5500 },
  { wk: 'W10', value: 5400 }, { wk: 'W11', value: 5800 }, { wk: 'W12', value: 6100 },
];

const distributions = [
  { date: 'Mar 31, 2025', amount: '4,600', txHash: '0x7a2f...c31b', status: 'Completed', basis: 'Wk 52 · Uptime 99.1%' },
  { date: 'Mar 24, 2025', amount: '4,400', txHash: '0x4e1d...a92f', status: 'Completed', basis: 'Wk 51 · Uptime 98.8%' },
  { date: 'Mar 17, 2025', amount: '4,250', txHash: '0x9b3c...d47e', status: 'Completed', basis: 'Wk 50 · Uptime 98.5%' },
  { date: 'Mar 10, 2025', amount: '4,100', txHash: '0x2f8a...b16c', status: 'Completed', basis: 'Wk 49 · Uptime 97.9%' },
  { date: 'Apr 7, 2025',  amount: '4,800', txHash: '—',             status: 'Pending',   basis: 'Wk 53 · Calculating…' },
];

// score colour helper
function scoreColor(score: string) {
  if (score === '—') return 'text-muted-foreground';
  const n = parseFloat(score);
  if (n >= 98) return 'text-status-green';
  if (n >= 94) return 'text-status-orange';
  return 'text-status-red';
}

// ─── Page ──────────────────────────────────────────────────────────────────
export default function RewardsPage() {
  const [tab, setTab] = useState<'overview' | 'history'>('overview');

  return (
    <div className="p-4 md:p-6 space-y-4 md:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
        <div>
          <h1 className="font-display font-bold text-2xl text-foreground">Rewards</h1>
          <p className="text-sm text-muted-foreground mt-1">
            DePIN Infra Partner rewards · $DLN weekly emissions · 208-week staking period
          </p>
        </div>
        {/* Infra Partner badge */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-accent-soft border border-primary/20 text-xs text-primary font-semibold">
          <Radio size={13} /> Infra Partner — 15% Reward Pool
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="rounded-card bg-surface p-5 shadow-surface border border-status-orange/10 col-span-1">
          <div className="flex items-center gap-2 mb-2">
            <Coins size={16} className="text-status-orange" />
            <span className="section-label text-status-orange">YTD EARNED</span>
          </div>
          <p className="font-display font-bold text-2xl text-status-orange">142,800 DLN</p>
          <p className="text-xs text-muted-foreground mt-1">≈ $284,600 USD</p>
        </div>
        <div className="rounded-card bg-surface p-5 shadow-surface">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp size={16} className="text-status-green" />
            <span className="section-label">THIS WEEK</span>
          </div>
          <p className="font-display font-bold text-2xl text-foreground">4,600 DLN</p>
          <p className="text-xs text-muted-foreground mt-1">≈ $9,200 USD · Wk 52</p>
        </div>
        <div className="rounded-card bg-surface p-5 shadow-surface">
          <div className="flex items-center gap-2 mb-2">
            <Clock size={16} className="text-muted-foreground" />
            <span className="section-label">PENDING</span>
          </div>
          <p className="font-display font-bold text-2xl text-foreground">4,800 DLN</p>
          <p className="text-xs text-muted-foreground mt-1">Next: Apr 7, 2025</p>
        </div>
        <div className="rounded-card bg-surface p-5 shadow-surface">
          <div className="flex items-center gap-2 mb-2">
            <BarChart3 size={16} className="text-primary" />
            <span className="section-label">WEEKS ACTIVE</span>
          </div>
          <p className="font-display font-bold text-2xl text-foreground">52 / 208</p>
          <p className="text-xs text-muted-foreground mt-1">≈ 25% of staking period</p>
          {/* mini progress */}
          <div className="mt-2 h-1 rounded-full bg-surface-3 overflow-hidden">
            <div className="h-full bg-primary rounded-full" style={{ width: `${(52 / 208) * 100}%` }} />
          </div>
        </div>
      </div>

      {/* ── Distribution Formula — Condensed ── */}
      <div className="rounded-xl border border-primary/15 bg-surface overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-2 border-b border-primary/10 bg-accent-soft/30">
          <Info size={14} className="text-primary" />
          <span className="text-xs font-semibold text-primary">DePIN Reward Distribution Formula</span>
          <span className="ml-auto text-[10px] text-muted-foreground font-mono">208-Week Protocol Period</span>
        </div>
        <div className="p-4 grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Left Col: Formula & Weights */}
          <div className="space-y-4">
            <div className="rounded-lg bg-surface-2 border border-border px-3 py-2">
              <p className="text-[9px] text-muted-foreground uppercase tracking-wider mb-1">Weekly Emission Formula</p>
              <code className="text-xs text-primary font-mono block">
                DLN_wk = TotalPool × 15% × (UpTime × 0.4 + DataQual × 0.35 + Energy × 0.25)
              </code>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[
                { icon: Radio,   label: 'Uptime',        value: '40%', color: 'text-status-green',  bg: 'bg-green-soft' },
                { icon: Zap,     label: 'Data Quality',  value: '35%', color: 'text-primary',      bg: 'bg-accent-soft' },
                { icon: BarChart3,label: 'Energy Score', value: '25%', color: 'text-status-orange', bg: 'bg-orange-soft' },
              ].map(({ icon: Icon, label, value, color, bg }) => (
                <div key={label} className={cn('rounded pl-2 py-1.5 border-l-2', bg, color.replace('text', 'border'))}>
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <Icon size={12} className={color} />
                    <span className={cn('text-sm font-bold', color)}>{value}</span>
                  </div>
                  <p className="text-[10px] font-medium text-foreground">{label}</p>
                </div>
              ))}
            </div>
            <div className="space-y-1 mt-2">
              {[
                { icon: CheckCircle2, text: 'Emitted WEEKLY — better performance = higher share', color: 'text-status-green' },
                { icon: AlertCircle,  text: 'Reward range: 17–22% of deposit over full 208 weeks', color: 'text-status-orange' },
              ].map(({ icon: Icon, text, color }, i) => (
                <div key={i} className="flex items-start gap-1.5 text-[10px] text-muted-foreground">
                  <Icon size={12} className={cn('mt-0.5 shrink-0', color)} />
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Col: Parameters Grid instead of table */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-3 content-start">
            {[
              { param: 'Role', value: 'Infra Partner (install & maintain)' },
              { param: 'Commitment', value: 'Security deposit only (no stake)' },
              { param: 'Sub-Pool Share', value: '15% of total protocol emissions' },
              { param: 'Period', value: '208 weeks (4 years)' },
              { param: 'Distribution', value: 'Weekly (performance weighted)' },
              { param: 'Expected Range', value: '17% – 22% of vault deposit' },
            ].map((row, i) => (
              <div key={i} className="border-b border-border/50 pb-2">
                <span className="block text-[9px] uppercase tracking-wider text-muted-foreground mb-0.5">{row.param}</span>
                <span className="block text-[11px] text-foreground font-medium">{row.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Rewards by Project — updated columns */}
      <div className="rounded-card bg-surface shadow-surface overflow-x-auto">
        <div className="px-5 py-3 border-b border-border flex items-center justify-between">
          <span className="section-label">Rewards by Node Cluster</span>
          <span className="text-[10px] text-muted-foreground">Performance-weighted · weekly emission</span>
        </div>
        <table className="w-full text-[12px] min-w-[700px]">
          <thead>
            <tr className="border-b border-border bg-surface/50">
              {['Project / Site', 'Nodes', 'Uptime', 'Data Quality', 'Energy Score', 'Weekly DLN', 'YTD DLN', '% Pool'].map(h => (
                <th key={h} className="text-left px-4 py-2.5 text-[10px] uppercase tracking-wider text-muted-foreground font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rewardsByProject.map(r => (
              <tr key={r.project} className="border-b border-border last:border-0 hover:bg-[rgba(255,255,255,0.02)]">
                <td className="px-4 py-2.5 text-foreground font-medium">{r.project}</td>
                <td className="px-4 py-2.5 font-mono text-muted-foreground">{r.nodes}</td>
                <td className={cn('px-4 py-2.5 font-mono font-semibold', scoreColor(r.uptime))}>{r.uptime}</td>
                <td className={cn('px-4 py-2.5 font-mono font-semibold', scoreColor(r.dataQuality))}>{r.dataQuality}</td>
                <td className={cn('px-4 py-2.5 font-mono font-semibold', scoreColor(r.energyScore))}>{r.energyScore}</td>
                <td className="px-4 py-2.5 font-mono text-status-orange font-semibold">{r.weekly}</td>
                <td className="px-4 py-2.5 font-mono text-status-orange">{r.ytd}</td>
                <td className="px-4 py-2.5 font-mono text-muted-foreground">{r.share}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Weekly chart — Recharts AreaChart */}
      <div className="rounded-card bg-surface p-5 shadow-surface">
        <div className="flex items-center justify-between mb-5">
          <span className="section-label">Weekly Earnings (DLN) — Last 12 Weeks</span>
          <span className="text-[10px] text-muted-foreground">Emitted every Monday 00:00 UTC</span>
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={weeklyEarnings} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="dlnGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#f97316" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#f97316" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis
              dataKey="wk"
              axisLine={false}
              tickLine={false}
              tick={({ x, y, payload }) => (
                <text x={x} y={y + 12} fontSize={10} className="fill-muted-foreground" textAnchor="middle">
                  {payload.value}
                </text>
              )}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              width={40}
              tick={({ x, y, payload }) => (
                <text x={x} y={y + 4} fontSize={10} className="fill-muted-foreground" textAnchor="end">
                  {(payload.value / 1000).toFixed(1)}K
                </text>
              )}
            />
            <Tooltip
              contentStyle={{
                background: 'var(--surface, #1a1a1a)',
                border: '1px solid var(--border, #2a2a2a)',
                borderRadius: '8px',
                fontSize: '12px',
                color: 'var(--foreground, #fff)',
              }}
              formatter={(value: number) => [`${value.toLocaleString()} DLN`, 'Earned']}
              labelStyle={{ color: 'var(--muted-foreground, #6b7280)', marginBottom: 2 }}
              cursor={{ stroke: '#f97316', strokeWidth: 1, strokeDasharray: '4 2' }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#f97316"
              strokeWidth={2}
              fill="url(#dlnGrad)"
              dot={{ fill: '#f97316', r: 3, strokeWidth: 0 }}
              activeDot={{ r: 5, fill: '#f97316', stroke: '#fff', strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Distribution History — weekly */}
      <div className="rounded-card bg-surface shadow-surface overflow-x-auto">
        <div className="px-5 py-3 border-b border-border flex items-center justify-between">
          <span className="section-label">Distribution History</span>
          <span className="text-[10px] text-muted-foreground">Weekly on-chain distribution · $DLN token</span>
        </div>
        <table className="w-full text-[12px] min-w-[600px]">
          <thead>
            <tr className="border-b border-border bg-surface/50">
              {['Date', 'Amount (DLN)', 'Basis', 'TX Hash', 'Status'].map(h => (
                <th key={h} className="text-left px-4 py-2.5 text-[10px] uppercase tracking-wider text-muted-foreground font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {distributions.map((d, i) => (
              <tr key={i} className="border-b border-border last:border-0 hover:bg-[rgba(255,255,255,0.02)]">
                <td className="px-4 py-2.5 text-muted-foreground">{d.date}</td>
                <td className="px-4 py-2.5 font-mono text-status-orange font-semibold">{d.amount} DLN</td>
                <td className="px-4 py-2.5 text-[11px] text-muted-foreground">{d.basis}</td>
                <td className="px-4 py-2.5">
                  {d.txHash !== '—'
                    ? <span className="font-mono text-primary flex items-center gap-1">{d.txHash} <ExternalLink size={10} /></span>
                    : <span className="text-muted-foreground">—</span>
                  }
                </td>
                <td className="px-4 py-2.5">
                  <span className={cn(
                    'px-2 py-0.5 rounded-full text-[10px] font-medium',
                    d.status === 'Completed' ? 'bg-green-soft text-status-green' : 'bg-orange-soft text-status-orange'
                  )}>{d.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
