import React from 'react';
import {
    LifeBuoy, Cpu, Coins, Globe2, MessageSquare, BookOpen,
    Zap, ShieldCheck, Headphones, Megaphone, Terminal, FileCode
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const Headphone = Headphones;

const supportSections = [
    {
        title: 'Technical Support',
        icon: Cpu,
        color: 'text-status-cyan',
        bgColor: 'bg-accent-soft',
        items: [
            {
                icon: Terminal,
                label: 'DeLEN SDK & API',
                desc: 'Comprehensive developer tools for integrating your solar assets with the DeLEN blockchain.'
            },
            {
                icon: Cpu,
                label: 'IoT Node Provisioning',
                desc: 'Assistance with configuring and deploying DeLEN-certified IoT edge gateways for real-time telemetry.'
            },
            {
                icon: FileCode,
                label: 'Smart Contract Templates',
                desc: 'Pre-audited templates for automated revenue sharing and project-specific tokenomics.'
            }
        ]
    },
    {
        title: 'Financial & Growth',
        icon: Coins,
        color: 'text-status-green',
        bgColor: 'bg-green-soft',
        items: [
            {
                icon: Zap,
                label: 'Protocol Grants',
                desc: 'Direct funding opportunities for innovative DePIN projects and high-impact infrastructure deployments.'
            },
            {
                icon: Coins,
                label: '$DLN Token Rewards',
                desc: 'Earn protocol-level rewards based on the uptime, performance, and generated energy of your assets.'
            },
            {
                icon: Megaphone,
                label: 'Project Matching',
                desc: 'Connect with capital providers and green investors through the DeLEN project marketplace.'
            }
        ]
    },
    {
        title: 'Operational & Compliance',
        icon: Globe2,
        color: 'text-status-orange',
        bgColor: 'bg-orange-soft',
        items: [
            {
                icon: ShieldCheck,
                label: 'Regulatory Guidance',
                desc: 'Expert support navigating MNRE, state-level solar policies, and grid connectivity requirements.'
            },
            {
                icon: Headphone,
                label: 'Dedicated Support',
                desc: '24/7 technical helpdesk and a dedicated Partner Success Manager for Prime and Pulse tiers.'
            },
            {
                icon: BookOpen,
                label: 'Knowledge Hub',
                desc: 'Access to the DeLEN Academy for best practices in decentralized infrastructure management.'
            }
        ]
    }
];

export default function ProtocolSupportPage() {
    return (
        <div className="p-6 max-w-[1100px] mx-auto space-y-8">
            {/* Header */}
            <div>
                <h1 className="font-display font-bold text-2xl text-foreground">Protocol Support</h1>
                <p className="text-sm text-muted-foreground mt-1">Empowering Partners through Technology, Capital, and Community</p>
            </div>

            {/* Hero Banner */}
            <div className="rounded-card bg-surface p-8 border border-border relative overflow-hidden flex items-center justify-between">
                <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ background: 'radial-gradient(circle at 100% 0%, var(--primary), transparent 50%)' }} />
                <div className="max-w-xl relative shrink-0">
                    <h2 className="font-display font-bold text-xl text-foreground mb-4">You build the infrastructure. We build the support.</h2>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        DeLEN Protocol is more than just a layer-1 for DePIN; it's a partner-first ecosystem.
                        We provide the tools, liquidity, and expertise needed to scale your renewable energy business globally.
                    </p>
                    <div className="flex gap-3 mt-6">
                        <Button size="sm">Schedule a Tech Call</Button>
                        <Button variant="outline" size="sm">Download Partner Handbook</Button>
                    </div>
                </div>
                <div className="hidden lg:block shrink-0 px-8">
                    <div className="w-32 h-32 rounded-full border-4 border-primary/20 flex items-center justify-center p-4 bg-accent-soft text-primary animate-pulse">
                        <LifeBuoy size={48} />
                    </div>
                </div>
            </div>

            {/* Support Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {supportSections.map((section) => (
                    <div key={section.title} className="space-y-4">
                        <div className="flex items-center gap-2 px-1">
                            <div className={cn("p-1.5 rounded-md", section.bgColor)}>
                                <section.icon size={16} className={section.color} />
                            </div>
                            <h3 className="text-sm font-bold text-foreground uppercase tracking-wide">{section.title}</h3>
                        </div>
                        <div className="space-y-4">
                            {section.items.map((item) => (
                                <div key={item.label} className="rounded-card bg-surface p-5 border border-border group hover:border-primary/30 transition-all hover:bg-surface-2">
                                    <div className="flex items-start gap-3">
                                        <div className="mt-1 p-1 rounded bg-surface-3 group-hover:bg-primary/20 transition-colors">
                                            <item.icon size={14} className="text-muted-foreground group-hover:text-primary transition-colors" />
                                        </div>
                                        <div>
                                            <h4 className="text-[13px] font-semibold text-foreground group-hover:text-primary transition-colors">{item.label}</h4>
                                            <p className="text-[11px] text-muted-foreground mt-1.5 leading-relaxed">
                                                {item.desc}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Community / FAQ */}
            <div className="grid grid-cols-2 gap-6">
                <div className="rounded-card p-6 bg-surface border border-border flex items-center gap-5">
                    <div className="w-12 h-12 shrink-0 rounded-full bg-accent-soft flex items-center justify-center text-primary">
                        <MessageSquare size={24} />
                    </div>
                    <div>
                        <h4 className="text-sm font-bold text-foreground">Join the Partner Discord</h4>
                        <p className="text-[11px] text-muted-foreground mt-1">Connect with 500+ active infrastructure partners globally for collaboration and support.</p>
                        <Button variant="link" size="sm" className="px-0 h-auto text-primary text-[11px] mt-1 font-bold">Join Now ↗</Button>
                    </div>
                </div>
                <div className="rounded-card p-6 bg-surface border border-border flex items-center gap-5">
                    <div className="w-12 h-12 shrink-0 rounded-full bg-orange-soft flex items-center justify-center text-status-orange">
                        <BookOpen size={24} />
                    </div>
                    <div>
                        <h4 className="text-sm font-bold text-foreground">Documentation Portal</h4>
                        <p className="text-[11px] text-muted-foreground mt-1">Detailed guides on hardware requirements, staking mechanics, and token reward distribution.</p>
                        <Button variant="link" size="sm" className="px-0 h-auto text-status-orange text-[11px] mt-1 font-bold">Read Docs ↗</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Utility to handle conditional classes
function cn(...inputs: any[]) {
    return inputs.filter(Boolean).join(' ');
}
