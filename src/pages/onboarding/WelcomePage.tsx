import React from 'react';
import { Link } from 'react-router-dom';
import { Upload, Sparkles, Zap, Gem, Award, FileText, ShieldCheck, Coins, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const tiers = [
  {
    name: 'SPARK PARTNER',
    icon: Zap,
    color: 'text-status-orange',
    borderColor: 'border-l-status-orange',
    fee: '₹5 Lakhs',
    capacity: 'Up to 5 MW / year · 10 projects onboarding Limit',
    tokens: '75,000 $DLN at TGE · credited to partners wallet **',
    btnVariant: 'outline-amber' as const,
  },
  {
    name: 'PULSE PARTNER',
    icon: Gem,
    color: 'text-status-cyan',
    borderColor: 'border-l-primary',
    fee: '₹10 Lakhs',
    capacity: 'Up to 10 MW / year · 20 projects onboarding Limit',
    tokens: '150,000 $DLN at TGE · credited to partners wallet **',
    btnVariant: 'default' as const,
    recommended: true,
  },
  {
    name: 'PRIME PARTNER',
    icon: Award,
    color: 'text-[hsl(45,93%,60%)]',
    borderColor: 'border-l-[hsl(45,93%,50%)]',
    fee: '₹20 Lakhs',
    capacity: 'Unlimited capacity · Voting rights',
    tokens: '450,000 $DLN at TGE · credited to partners wallet **',
    btnVariant: 'outline-gold' as const,
  },
];

const comparisonData = [
  { param: 'Partnership Fee', spark: '₹5 Lakhs', pulse: '₹10 Lakhs', prime: '₹20 Lakhs' },
  { param: 'Min. Solar EPC Experience', spark: '≥ 2 years', pulse: '≥ 4 years', prime: '≥ 7 years' },
  { param: 'Min. Projects Completed', spark: '5', pulse: '15', prime: '30' },
  { param: 'Min. MW Deployed', spark: '1 MW', pulse: '5 MW', prime: '20 MW' },
  { param: 'Annual Capacity Limit', spark: '5 MW', pulse: '10 MW', prime: 'Unlimited' },
  { param: 'Project Onboarding Limit', spark: '10/year', pulse: '20/year', prime: 'Unlimited' },
  { param: 'Token Allocation at TGE', spark: '75,000 DLN', pulse: '150,000 DLN', prime: '450,000 DLN' },
  { param: 'Vesting Period', spark: '208 weeks', pulse: '208 weeks', prime: '208 weeks' },
  { param: 'Governance Voting Rights', spark: 'No', pulse: 'Advisory', prime: 'Full' },
  { param: 'Priority Project Assignment', spark: 'No', pulse: 'Yes', prime: 'Yes + First Pick' },
  { param: 'Dedicated Account Manager', spark: 'No', pulse: 'Yes', prime: 'Yes' },
  { param: 'Protocol Revenue Share', spark: 'Standard', pulse: 'Enhanced', prime: 'Maximum' },
  { param: 'Territory Subscription Limit', spark: '2', pulse: '5', prime: 'Unlimited' },
];

const steps = [
  { icon: FileText, label: 'Select Tier & Apply' },
  { icon: Upload, label: 'Upload Documents' },
  { icon: ShieldCheck, label: 'Pre-Qualification Review', sub: '5–7 days' },
  { icon: Coins, label: 'Pay Fee & Activate' },
];

export default function WelcomePage() {
  const [selectedTier, setSelectedTier] = React.useState(1); // Pulse default

  return (
    <div className="p-6 max-w-[1200px] mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-display font-bold text-2xl text-foreground text-balance">Infrastructure Partner Programme</h1>
          <div className="flex items-center gap-3 mt-2">
            <p className="text-sm text-muted-foreground font-mono">DeLEN Protocol · DLN/PQ/2026/001 · v1.0</p>
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-orange-soft text-status-orange text-[11px]">
              <Sparkles size={10} /> Pre-Launch
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">Scoring Framework</Button>
          <Link to="/onboarding/infra-partner/documents">
            <Button size="sm"><Upload size={14} /> Begin Document Upload</Button>
          </Link>
        </div>
      </div>

      {/* Hero Banner */}
      <div className="rounded-card p-8 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0d1525, #111827)' }}>
        <div className="absolute inset-0 opacity-20" style={{ background: 'radial-gradient(ellipse at 80% 20%, hsl(253 97% 67% / 0.3), transparent 60%)' }} />
        <p className="font-mono text-[10px] tracking-[0.1em] text-muted-foreground relative">
          DELEN PROTOCOL · INFRA PARTNER PROGRAMME · DLN/PQ/2026/001
        </p>
        <div className="mt-4 relative flex justify-between items-start">
          <div>
            <h2 className="font-display font-extrabold text-4xl text-foreground text-balance leading-tight">
              Become an Authorised<br />
              <span className="gradient-accent-text">Infrastructure Partner</span>
            </h2>
            <p className="mt-4 text-sm text-muted-foreground max-w-xl text-pretty leading-relaxed">
              Join the DeLEN DePIN ecosystem as a Solar EPC partner. Deploy verified solar assets, earn $DLN token rewards, and participate in shaping India's decentralised renewable energy infrastructure.
            </p>
          </div>
          {/* Progress Ring */}
          <div className="shrink-0 w-24 h-24 relative">
            <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
              <circle cx="50" cy="50" r="42" fill="none" stroke="hsl(var(--surface3))" strokeWidth="6" />
              <circle cx="50" cy="50" r="42" fill="none" stroke="hsl(var(--accent-color))" strokeWidth="6" strokeDasharray={2 * Math.PI * 42} strokeDashoffset={2 * Math.PI * 42} strokeLinecap="round" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-display font-bold text-lg text-foreground">0%</span>
              <span className="text-[8px] text-muted-foreground uppercase tracking-wider">Application</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tier Cards */}
      <div className="grid grid-cols-3 gap-4">
        {tiers.map((tier, i) => (
          <div
            key={tier.name}
            onClick={() => setSelectedTier(i)}
            className={`relative rounded-card p-5 bg-surface border-l-4 ${tier.borderColor} cursor-pointer transition-all duration-150 ${
              selectedTier === i
                ? 'shadow-glow-accent border border-primary/20'
                : 'shadow-surface border border-transparent hover:shadow-surface-hover hover:-translate-y-0.5'
            }`}
          >
            {tier.recommended && (
              <span className="absolute top-3 right-3 px-2 py-0.5 rounded-md bg-accent-soft text-primary text-[10px] font-medium">
                RECOMMENDED
              </span>
            )}
            <tier.icon size={20} className={tier.color} />
            <p className={`section-label mt-3 ${tier.color}`}>{tier.name}</p>
            <p className="font-display font-bold text-xl text-foreground mt-2">{tier.fee}</p>
            <p className="text-[11px] text-muted-foreground">Partnership Fee</p>
            <p className="text-xs text-muted-foreground mt-3">{tier.capacity}</p>
            <div className="mt-3 px-2.5 py-1.5 rounded-md bg-surface-2 text-[11px] text-muted-foreground">
              {tier.tokens}
            </div>
            <Button variant={tier.btnVariant} size="sm" className="w-full mt-4" onClick={() => setSelectedTier(i)}>
              {selectedTier === i ? 'Selected' : 'Select Tier'}
            </Button>
          </div>
        ))}
      </div>

      <p className="text-[11px] text-muted-foreground italic">
        ** Tokens are vested over 208 weeks, with monthly releases starting after a 6-month cliff period.
      </p>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <Link to="/onboarding/infra-partner/documents">
          <Button size="lg"><Upload size={14} /> Begin Document Upload</Button>
        </Link>
        <Button variant="outline" size="lg">View Protocol Support</Button>
      </div>

      {/* Comparison Table */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <p className="section-label">01 · Tier Comparison Matrix</p>
          <p className="text-[10px] text-muted-foreground font-mono">Section 2 & 4 · DLN/PQ/2026/001</p>
        </div>
        <div className="rounded-card border border-border overflow-hidden">
          <table className="w-full text-[12px]">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left px-4 py-3 text-muted-foreground font-medium uppercase tracking-wider text-[10px]">Parameter</th>
                <th className={`text-center px-4 py-3 text-[10px] uppercase tracking-wider font-medium ${selectedTier === 0 ? 'bg-accent-soft text-primary' : 'text-muted-foreground'}`}>Spark</th>
                <th className={`text-center px-4 py-3 text-[10px] uppercase tracking-wider font-medium ${selectedTier === 1 ? 'bg-accent-soft text-primary' : 'text-muted-foreground'}`}>Pulse</th>
                <th className={`text-center px-4 py-3 text-[10px] uppercase tracking-wider font-medium ${selectedTier === 2 ? 'bg-accent-soft text-primary' : 'text-muted-foreground'}`}>Prime</th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((row, i) => (
                <tr key={i} className="border-b border-border last:border-0 hover:bg-[rgba(255,255,255,0.02)]">
                  <td className="px-4 py-2.5 text-muted-foreground">{row.param}</td>
                  <td className={`text-center px-4 py-2.5 ${selectedTier === 0 ? 'bg-accent-soft/50 text-foreground' : 'text-muted-foreground'}`}>{row.spark}</td>
                  <td className={`text-center px-4 py-2.5 ${selectedTier === 1 ? 'bg-accent-soft/50 text-foreground' : 'text-muted-foreground'}`}>{row.pulse}</td>
                  <td className={`text-center px-4 py-2.5 ${selectedTier === 2 ? 'bg-accent-soft/50 text-foreground' : 'text-muted-foreground'}`}>{row.prime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* How It Works */}
      <div>
        <p className="section-label mb-4">02 · How It Works</p>
        <div className="grid grid-cols-4 gap-4">
          {steps.map((step, i) => (
            <div key={i} className="rounded-card bg-surface p-5 shadow-surface text-center">
              <div className="w-10 h-10 rounded-lg bg-accent-soft mx-auto flex items-center justify-center mb-3">
                <step.icon size={18} className="text-primary" />
              </div>
              <p className="font-mono text-[10px] text-muted-foreground mb-1">Step {i + 1}</p>
              <p className="text-sm font-medium text-foreground">{step.label}</p>
              {step.sub && <p className="text-[10px] text-muted-foreground mt-1">{step.sub}</p>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
