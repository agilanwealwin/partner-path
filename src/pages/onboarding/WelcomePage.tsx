import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Upload, Sparkles, CheckCircle2, Info, ChevronRight, ArrowRight, ArrowUpRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useOnboarding } from '@/hooks/use-onboarding';
import { cn } from '@/lib/utils';

const tiers = [
  {
    id: 'spark',
    name: 'SPARK PARTNER',
    color: 'text-orange-500',
    accentBg: 'bg-orange-500/5',
    fee: '₹5 Lakhs',
    capacity: 'Up to 5 MW / year · 10 projects Limit',
    tokens: '75,000 $DLN at TGE',
  },
  {
    id: 'pulse',
    name: 'PULSE PARTNER',
    color: 'text-primary',
    accentBg: 'bg-primary/5',
    fee: '₹10 Lakhs',
    capacity: 'Up to 10 MW / year · 20 projects Limit',
    tokens: '150,000 $DLN at TGE',
    recommended: true,
  },
  {
    id: 'prime',
    name: 'PRIME PARTNER',
    color: 'text-amber-500',
    accentBg: 'bg-amber-500/5',
    fee: '₹20 Lakhs',
    capacity: 'Unlimited capacity · Voting rights',
    tokens: '450,000 $DLN at TGE',
  },
];

const comparisonData = [
  { param: 'Partnership Fee', spark: '₹5 Lakhs', pulse: '₹10 Lakhs', prime: '₹20 Lakhs' },
  { param: 'Min. Solar EPC Experience', spark: '≥ 2 years', pulse: '≥ 4 years', prime: '≥ 7 years' },
  { param: 'Min. Projects Completed', spark: '5', pulse: '15', prime: '30' },
  { param: 'Min. MW Deployed', spark: '1 MW', pulse: '5 MW', prime: '20 MW' },
  { param: 'Annual Capacity Limit', spark: '5 MW', pulse: '10 MW', prime: 'Unlimited' },
  { param: 'Token Allocation at TGE', spark: '75,000 DLN', pulse: '150,000 DLN', prime: '450,000 DLN' },
  { param: 'Governance Voting Rights', spark: 'No', pulse: 'Advisory', prime: 'Full' },
  { param: 'Priority Project Assignment', spark: 'No', pulse: 'Yes', prime: 'Yes + First Pick' },
  { param: 'Protocol Revenue Share', spark: 'Standard', pulse: 'Enhanced', prime: 'Maximum' },
  { param: 'Territory Subscription Limit', spark: '2', pulse: '5', prime: 'Unlimited' },
];

export default function WelcomePage() {
  const navigate = useNavigate();
  const { nextStep, updateData } = useOnboarding();
  const [selectedTier, setSelectedTier] = React.useState(1); // Pulse default

  const handleBegin = () => {
    updateData({ tier: tiers[selectedTier].name });
    nextStep();
  };

  return (
    <div className="p-10 max-w-[1200px] mx-auto space-y-16 bg-background">
      {/* Top Header Utilities */}
      <div className="flex items-end justify-between border-b border-border pb-8">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-surface-3 text-[10px] font-mono text-muted-foreground border border-border tracking-tighter">v1.2 // PROD</span>
            <h1 className="font-display font-bold text-3xl text-foreground tracking-tight">Infrastructure Partner Programme</h1>
          </div>
          <p className="text-sm text-muted-foreground flex items-center gap-2 font-medium">
            Protocol Guideline DLN/PQ/2026/001
            <span className="w-1 h-1 rounded-full bg-border" />
            <span className="flex items-center gap-1.5 text-status-orange"><Sparkles size={14} /> Early Access Enrollment</span>
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" className="h-10 px-6 rounded-xl border-border bg-surface-2 hover:bg-surface-3 transition-colors" onClick={() => navigate('/onboarding/infra-partner/scoring')}>
            Scoring Matrix <ArrowUpRight size={14} className="ml-2 opacity-50" />
          </Button>
          <Button size="sm" className="h-10 px-6 bg-primary hover:bg-primary/90 text-white rounded-xl font-bold shadow-lg shadow-primary/10" onClick={handleBegin}>
            <Upload size={14} className="mr-2" /> Start Application
          </Button>
        </div>
      </div>

      {/* Welcome Hero Banner */}
      <div className="rounded-[2.5rem] p-12 relative overflow-hidden hero-gradient border border-border shadow-2xl shadow-primary/5 group">
        <div className="absolute inset-0 hero-glow-accent opacity-40 group-hover:opacity-60 transition-opacity duration-1000" />
        <div className="relative z-10 grid grid-cols-[1fr,auto] gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-3">
              <p className="text-[11px] font-black tracking-[0.3em] text-primary uppercase animate-in slide-in-from-left-4 duration-500">DePIN SOLAR ECOSYSTEM</p>
              <h2 className="font-display font-black text-6xl text-foreground leading-[1.05] tracking-tight">
                Certified Energy<br />
                <span className="gradient-accent-text">Service Providers</span>
              </h2>
            </div>
            <p className="text-lg text-muted-foreground max-w-xl leading-relaxed opacity-90">
              Direct participation in the $DLN infrastructure network. Deploy renewable assets at scale and contribute to the next generation of decentralised energy services.
            </p>
            <div className="flex items-center gap-6 pt-4 animate-in fade-in zoom-in duration-700 delay-300">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-background-2 bg-surface-3 ring-2 ring-background flex items-center justify-center text-[10px] font-black text-muted-foreground">
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <div className="h-8 w-px bg-border/50 mx-2" />
              <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider">
                <span className="text-foreground text-sm font-black mr-1">140+</span>
                Partners Verified
              </p>
            </div>
          </div>

          <div className="w-72 hidden lg:block animate-in slide-in-from-right-8 duration-700">
            <div className="p-8 rounded-[2rem] bg-surface/40 backdrop-blur-xl border border-white/5 space-y-6 shadow-2xl">
              <div className="flex items-center justify-between pb-4 border-b border-border/20">
                <span className="text-[10px] font-black tracking-widest text-foreground uppercase">Live Status</span>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-status-green animate-pulse" />
                  <span className="text-[10px] font-black text-status-green uppercase">Accepting</span>
                </div>
              </div>
              <div className="space-y-5">
                {[
                  { label: 'Enrollment', value: 'Open Q2 2026' },
                  { label: 'Review Latency', value: '4-6 Days' },
                  { label: 'Global Rank', value: 'Tier 1' }
                ].map(item => (
                  <div key={item.label} className="space-y-1">
                    <p className="text-[9px] text-muted-foreground uppercase font-black tracking-widest opacity-60">{item.label}</p>
                    <p className="text-sm font-black text-foreground">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tier Selection Section */}
      <div className="space-y-10 pt-8">
        <div className="flex items-end justify-between px-2">
          <div className="space-y-2">
            <h3 className="font-display font-bold text-xl text-foreground tracking-tight">Select Partnership Pathway</h3>
            <p className="text-sm text-muted-foreground">Choose the level that aligns with your operational deployment capacity.</p>
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-surface-2 border border-border text-[11px] text-muted-foreground font-bold shadow-sm">
            <Info size={14} className="text-primary" /> Click to select
          </div>
        </div>

        <div className="grid grid-cols-3 gap-8">
          {tiers.map((tier, i) => {
            const isSelected = selectedTier === i;
            return (
              <div
                key={tier.id}
                onClick={() => setSelectedTier(i)}
                className={cn(
                  "relative rounded-3xl p-10 border-2 transition-all duration-500 cursor-pointer flex flex-col group overflow-hidden",
                  isSelected
                    ? "bg-surface border-primary shadow-2xl shadow-primary/10 -translate-y-2 scale-[1.02]"
                    : "bg-surface-2/30 border-border hover:border-border-strong shadow-sm hover:shadow-md hover:-translate-y-1"
                )}
              >
                {/* Decorative Background Number */}
                <div className="absolute -bottom-12 -right-6 text-[12rem] font-display font-black text-foreground/[0.03] pointer-events-none group-hover:text-foreground/[0.06] transition-all duration-700 select-none">
                  {i + 1}
                </div>

                {tier.recommended && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-5 py-2 rounded-full bg-primary text-white text-[10px] font-bold tracking-[0.2em] shadow-lg shadow-primary/20 z-20 uppercase">
                    RECOMMENDED
                  </div>
                )}

                {isSelected && (
                  <div className="absolute top-6 right-6 text-primary">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-lg shadow-primary/30 rotate-0 group-hover:rotate-12 transition-transform">
                      <CheckCircle2 size={18} className="text-white" strokeWidth={3} />
                    </div>
                  </div>
                )}

                <div className={cn(
                  "text-[10px] font-bold tracking-[0.25em] px-3.5 py-2 rounded-lg border-2 uppercase mb-12 w-fit transition-all text-center",
                  isSelected
                    ? "border-primary text-primary bg-primary/5 shadow-[0_0_15px_rgba(var(--primary),0.05)]"
                    : "border-border text-muted-foreground opacity-70"
                )}>
                  Level 0{i + 1}
                </div>

                <div className="space-y-1 mb-10">
                  <p className={cn("text-[11px] font-black tracking-[0.25em] uppercase mb-4", tier.color)}>{tier.name}</p>
                  <div className="h-0.5 w-12 bg-border group-hover:w-full transition-all duration-700 my-8" />
                  <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest opacity-60 mb-2">One-Time Partnership Fee</p>
                  <p className={cn("text-4xl font-display font-black tracking-tight", isSelected ? "text-foreground" : "text-foreground/80")}>{tier.fee}</p>
                </div>

                <div className="space-y-5 flex-1 relative z-10">
                  {[
                    { label: 'OP. CAPACITY', value: tier.capacity },
                    { label: 'TOKEN REWARDS', value: tier.tokens }
                  ].map(feat => (
                    <div key={feat.label} className="flex gap-4 items-start">
                      <CheckCircle2 size={18} className={cn("mt-0.5 shrink-0 transition-colors", isSelected ? "text-primary" : "text-status-green opacity-50")} />
                      <div className="space-y-1">
                        <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest opacity-70 group-hover:opacity-100 transition-opacity">{feat.label}</p>
                        <p className="text-xs text-foreground font-semibold leading-relaxed shrink-0">{feat.value}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <Button
                  variant={isSelected ? "default" : "outline"}
                  className={cn(
                    "w-full mt-12 rounded-2xl h-14 font-bold text-xs tracking-widest uppercase transition-all z-10",
                    isSelected
                      ? "bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/20 border-none"
                      : "bg-background text-foreground border-border hover:bg-surface-2"
                  )}
                  onClick={(e) => { e.stopPropagation(); setSelectedTier(i); }}
                >
                  {isSelected ? "Current Selection" : "Identify As Level " + (i + 1)}
                </Button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Comparison Matrix Section */}
      <div className="space-y-8 pt-16">
        <div className="flex items-center justify-between px-2">
          <h3 className="text-[11px] font-bold uppercase tracking-[0.3em] text-muted-foreground">Programme Comparison Matrix</h3>
          <p className="text-[10px] text-muted-foreground font-mono italic tracking-[0.1em] opacity-60">REF: DLN / SEC / 004 / MATRIX</p>
        </div>

        <div className="rounded-[1.5rem] border border-border bg-surface shadow-2xl shadow-primary/[0.02] relative overflow-hidden">
          <table className="w-full text-left border-separate border-spacing-0">
            <thead>
              <tr className="bg-surface-2/40">
                <th className="px-8 py-8 text-[10px] uppercase tracking-widest font-black text-muted-foreground border-b border-border">Parameter</th>
                {[0, 1, 2].map((idx) => {
                  const isSelected = selectedTier === idx;
                  const label = ['Spark', 'Pulse', 'Prime'][idx];
                  return (
                    <th
                      key={idx}
                      className={cn(
                        "px-8 py-8 text-[11px] uppercase tracking-[0.2em] text-center border-b transition-all relative",
                        isSelected
                          ? "text-primary font-black border-l-2 border-r-2 border-primary bg-primary/[0.04]"
                          : "text-muted-foreground border-border font-bold"
                      )}
                    >
                      {label}
                      {isSelected && <div className="absolute top-0 left-0 right-0 h-1.5 bg-primary shadow-[0_0_10px_rgba(var(--primary),0.5)]" />}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody className="divide-y divide-border/20">
              {comparisonData.map((row, i) => {
                const isLast = i === comparisonData.length - 1;
                return (
                  <tr key={i} className="hover:bg-accent-soft/[0.02] transition-colors group">
                    <td className="px-8 py-5 text-[13px] font-semibold text-muted-foreground group-hover:text-foreground border-r border-border/10">{row.param}</td>
                    {[0, 1, 2].map((idx) => {
                      const isSelected = selectedTier === idx;
                      const val = [row.spark, row.pulse, row.prime][idx];
                      return (
                        <td
                          key={idx}
                          className={cn(
                            "px-8 py-5 text-[13px] text-center transition-all",
                            isSelected
                              ? cn(
                                "border-l-2 border-r-2 border-primary bg-primary/[0.04] text-foreground font-black",
                                isLast ? "border-b-2 rounded-b-xl" : ""
                              )
                              : "text-muted-foreground/60"
                          )}
                        >
                          {val}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Final Action Bar */}
      <div className="flex flex-col items-center gap-8 pt-16 border-t border-border mt-16 animate-in fade-in slide-in-from-bottom-8">
        <div className="text-center space-y-3">
          <h4 className="font-display font-black text-2xl text-foreground">Ready to start your application?</h4>
          <p className="text-muted-foreground text-sm">Proceeding will initiate the digital verification of your technical profile.</p>
        </div>
        <div className="flex items-center gap-6">
          <Button size="lg" className="h-16 px-14 bg-primary hover:bg-primary/90 text-white rounded-2xl text-base font-black shadow-2xl shadow-primary/30 group transition-all hover:scale-[1.05]" onClick={handleBegin}>
            Begin Pathway Assessment <ArrowRight size={20} className="ml-3 group-hover:translate-x-2 transition-transform" />
          </Button>
          <Button variant="outline" size="lg" className="h-16 px-10 border-2 border-border text-foreground hover:bg-surface-2 rounded-2xl text-base font-black transition-all" onClick={() => navigate('/onboarding/infra-partner/support')}>
            View T&Cs
          </Button>
        </div>
        <p className="text-[11px] text-muted-foreground italic flex items-center gap-2 opacity-60 font-medium">
          <Info size={16} className="opacity-50" /> Secure digital ID required. DLN Infrastructure Review v2.4 applies.
        </p>
      </div>
    </div>
  );
}
