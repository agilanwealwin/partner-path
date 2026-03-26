import React from 'react';
import {
    BarChart3, ShieldCheck, CheckCircle2,
    Info, Scale, Target, TrendingUp, Cpu, Globe2, Briefcase, ArrowLeft, ArrowUpRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

const scoringCategories = [
    {
        title: 'Technical Capacity (45 Points)',
        icon: Cpu,
        items: [
            { label: 'Total MW Deployed', max: 25, desc: 'Proven track record of utility-scale or C&I solar deployments.' },
            { label: 'IoT & SCADA Experience', max: 10, desc: 'Familiarity with remote monitoring and automated control systems.' },
            { label: 'Asset Maintenance (O&M)', max: 10, desc: 'In-house capability to provide operations and maintenance support.' },
        ]
    },
    {
        title: 'Financial & Compliance (30 Points)',
        icon: Scale,
        items: [
            { label: 'Annual Turnover', max: 15, desc: 'Financial stability as evidenced by audited balance sheets.' },
            { label: 'Bank Solvency', max: 10, desc: 'Reference from a Category-A bank confirming creditworthiness.' },
            { label: 'GST & Statutory Compliance', max: 5, desc: 'Clean record with tax and regulatory authorities.' },
        ]
    },
    {
        title: 'Operational Excellence (25 Points)',
        icon: Globe2,
        items: [
            { label: 'Years of Experience', max: 10, desc: 'Continuous operation in the renewable energy sector.' },
            { label: 'Geographic Presence', max: 8, desc: 'Ability to service projects across multiple states/territories.' },
            { label: 'Reference Portfolio', max: 7, desc: 'Verification of past project quality and client satisfaction.' },
        ]
    }
];

const tiers = [
    {
        id: 'spark',
        name: 'SPARK PARTNER',
        score: '40–59',
        color: 'text-orange-500',
        accentBg: 'bg-orange-500/5',
        benefits: ['5 MW / year capacity', '75,000 $DLN Allocation', '2 Territory Subscriptions']
    },
    {
        id: 'pulse',
        name: 'PULSE PARTNER',
        score: '60–79',
        color: 'text-primary',
        accentBg: 'bg-primary/5',
        recommended: true,
        benefits: ['10 MW / year capacity', '150,000 $DLN Allocation', '5 Territory Subscriptions', 'Dedicated Account Manager']
    },
    {
        id: 'prime',
        name: 'PRIME PARTNER',
        score: '80+',
        color: 'text-amber-500',
        accentBg: 'bg-amber-500/5',
        benefits: ['Unlimited capacity', '450,000 $DLN Allocation', 'Unlimited Territories', 'Protocol Voting Rights']
    }
];

export default function ScoringFrameworkPage() {
    const navigate = useNavigate();

    return (
        <div className="p-10 max-w-[1200px] mx-auto space-y-16 bg-background">
            {/* Header */}
            <div className="flex items-end justify-between border-b border-border pb-8">
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-surface-3 text-[10px] font-mono text-muted-foreground border border-border tracking-tighter">REF: DLN / PQ / 2026</span>
                        <h1 className="font-display font-bold text-3xl text-foreground tracking-tight">Scoring Framework</h1>
                    </div>
                    <p className="text-sm text-muted-foreground font-medium">Transparency in How DeLEN Evaluates Infrastructure Partners</p>
                </div>
                <Button variant="outline" size="sm" className="h-10 px-6 rounded-xl border-border bg-surface-2 hover:bg-surface-3 transition-colors font-bold" onClick={() => navigate(-1)}>
                    <ArrowLeft size={14} className="mr-2 opacity-50" /> Back to Assessment
                </Button>
            </div>

            {/* Hero */}
            <div className="rounded-[2.5rem] p-12 relative overflow-hidden hero-gradient border border-border shadow-2xl shadow-primary/5 group">
                <div className="absolute inset-0 hero-glow-accent opacity-40 group-hover:opacity-60 transition-opacity duration-1000" />
                <div className="absolute top-0 right-0 p-12 opacity-[0.03] select-none pointer-events-none">
                    <Scale size={320} className="text-foreground" />
                </div>

                <div className="relative z-10 max-w-2xl space-y-8">
                    <div className="space-y-3">
                        <p className="text-[11px] font-black tracking-[0.3em] text-primary uppercase">EVALUATION METHODOLOGY</p>
                        <h2 className="font-display font-black text-5xl text-foreground leading-[1.1] tracking-tight">The 100-Point<br />Infrastructure Audit</h2>
                    </div>

                    <p className="text-lg text-muted-foreground leading-relaxed opacity-90 max-w-xl">
                        A multi-dimensional scoring engine ensures the highest quality of physical grid infrastructure. Scores are algorithmically weighted based on your submissions.
                    </p>

                    <div className="flex items-center gap-8 pt-4">
                        {[
                            { label: 'Technical Capacity', val: '45%' },
                            { label: 'Financial Health', val: '30%' },
                            { label: 'Operational Scale', val: '25%' }
                        ].map(item => (
                            <div key={item.label} className="space-y-1">
                                <p className="text-4xl font-display font-black text-foreground">{item.val}</p>
                                <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest opacity-60">{item.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Scoring Matrix Categories */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {scoringCategories.map((cat) => (
                    <div key={cat.title} className="rounded-3xl bg-surface p-8 border border-border shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1 flex flex-col h-full group">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 rounded-xl bg-accent-soft flex items-center justify-center border border-primary/10 group-hover:bg-primary/10 transition-colors">
                                <cat.icon size={22} className="text-primary" />
                            </div>
                            <h3 className="text-sm font-black text-foreground uppercase tracking-widest leading-normal">{cat.title}</h3>
                        </div>
                        <div className="space-y-8 flex-1">
                            {cat.items.map((item) => (
                                <div key={item.label} className="group/item">
                                    <div className="flex justify-between items-baseline mb-2">
                                        <span className="text-[14px] text-foreground font-bold tracking-tight">{item.label}</span>
                                        <span className="text-[11px] font-black font-mono text-primary px-2 py-0.5 rounded-md bg-primary/5">{item.max} PTS</span>
                                    </div>
                                    <p className="text-[12px] text-muted-foreground leading-relaxed group-hover/item:text-foreground/90 transition-colors opacity-80">
                                        {item.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Tier Thresholds - Professional Redesign */}
            <div className="space-y-10">
                <div className="flex items-end justify-between px-2">
                    <div className="space-y-2">
                        <h3 className="font-display font-bold text-xl text-foreground tracking-tight flex items-center gap-3">
                            <Target size={24} className="text-primary" /> Qualification Thresholds
                        </h3>
                        <p className="text-sm text-muted-foreground">Benchmarks required to unlock corresponding partnership levels.</p>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-8">
                    {tiers.map((tier, i) => {
                        return (
                            <div
                                key={tier.name}
                                className={cn(
                                    "relative rounded-3xl p-10 border-2 transition-all duration-500 flex flex-col group overflow-hidden",
                                    tier.recommended
                                        ? "bg-surface border-primary shadow-2xl shadow-primary/10 -translate-y-2"
                                        : "bg-surface-2/30 border-border shadow-sm"
                                )}
                            >
                                {/* Background Number */}
                                <div className="absolute -bottom-12 -right-6 text-[12rem] font-display font-black text-foreground/[0.03] pointer-events-none group-hover:text-foreground/[0.06] transition-all duration-700 select-none">
                                    {i + 1}
                                </div>

                                {tier.recommended && (
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-5 py-2 rounded-full bg-primary text-white text-[10px] font-bold tracking-[0.2em] shadow-lg shadow-primary/20 z-20 uppercase">
                                        MOST COMMON
                                    </div>
                                )}

                                <div className={cn(
                                    "text-[10px] font-bold tracking-[0.25em] px-3.5 py-2 rounded-lg border-2 uppercase mb-12 w-fit transition-all text-center",
                                    tier.recommended
                                        ? "border-primary text-primary bg-primary/5 shadow-[0_0_15px_rgba(var(--primary),0.05)]"
                                        : "border-border text-muted-foreground opacity-70"
                                )}>
                                    Level 0{i + 1}
                                </div>

                                <div className="space-y-1 mb-10">
                                    <p className={cn("text-[11px] font-black tracking-[0.25em] uppercase mb-4", tier.color)}>{tier.name}</p>
                                    <div className="h-0.5 w-12 bg-border group-hover:w-full transition-all duration-700 my-8" />
                                    <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest opacity-60 mb-2">Benchmark Score</p>
                                    <p className={cn("text-4xl font-display font-black tracking-tight", tier.recommended ? "text-foreground" : "text-foreground/80")}>{tier.score} PTS</p>
                                </div>

                                <div className="space-y-4 flex-1 relative z-10">
                                    {tier.benefits.map((benefit, j) => (
                                        <div key={j} className="flex gap-3 items-center">
                                            <CheckCircle2 size={16} className={cn("shrink-0 transition-colors", tier.recommended ? "text-primary" : "text-status-green opacity-50")} />
                                            <p className="text-xs text-foreground font-semibold leading-relaxed shrink-0">{benefit}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Footer Alert Card */}
            <div className="rounded-[2rem] p-8 bg-surface-2 border border-border flex items-start gap-6 shadow-sm">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Info size={24} className="text-primary" />
                </div>
                <div className="space-y-2">
                    <h4 className="text-sm font-black text-foreground uppercase tracking-widest">Protocol Governance Note</h4>
                    <p className="text-[13px] text-muted-foreground leading-relaxed italic opacity-80">
                        The scoring framework is audited quarterly by the DeLEN Governance Council to ensure fairness and alignment with the protocol's infrastructure requirements.
                        Existing partners can request a re-evaluation once per year to qualify for a higher tier.
                    </p>
                </div>
            </div>

            {/* Action Footer */}
            <div className="flex flex-col items-center gap-8 pt-12 border-t border-border mt-16 pb-20">
                <Button size="lg" className="h-16 px-14 bg-primary hover:bg-primary/90 text-white rounded-2xl text-base font-black shadow-2xl shadow-primary/30 group transition-all hover:scale-[1.05]" onClick={() => navigate(-1)}>
                    Return to Assessment <ArrowUpRight size={20} className="ml-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </Button>
            </div>
        </div>
    );
}
