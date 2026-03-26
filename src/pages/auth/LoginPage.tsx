import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { LayoutDashboard, Rocket, ShieldCheck, Globe2, ArrowRight } from 'lucide-react';

import { ThemeToggle } from '@/components/ThemeToggle';

export default function LoginPage() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex bg-background text-foreground selection:bg-primary/30 relative">
            {/* Theme Toggle Positioning */}
            <div className="absolute top-6 right-6 z-50">
                <ThemeToggle />
            </div>
            {/* Decorative Left Side - Hidden on Mobile */}
            <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-between p-12 overflow-hidden border-r border-border/20">                {/* Animated Background Gradients */}
                <div className="absolute top-[-10%] left-[-10%] w-[80%] h-[80%] rounded-full bg-primary/10 blur-[120px] animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-accent-glow/20 blur-[100px]" />

                <div className="relative z-10">
                    <img src="/delen-logo.webp" alt="DeLEN Logo" className="h-10 w-auto mb-16" />

                    <div className="space-y-6">
                        <h1 className="font-display font-bold text-5xl xl:text-6xl leading-[1.1] text-balance">
                            The Next Era of <br />
                            <span className="gradient-accent-text">DePIN Solar</span> Assets.
                        </h1>
                        <p className="text-lg text-muted-foreground max-w-md text-pretty leading-relaxed">
                            Connect to the world's first decentralized logistics emission network.
                            Onboard verified solar assets and earn protocol rewards.
                        </p>
                    </div>
                </div>

                <div className="relative z-10 grid grid-cols-2 gap-8">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 text-primary font-mono text-xs tracking-wider">
                            <ShieldCheck size={14} /> SECURITY FIRST
                        </div>
                        <p className="text-sm text-muted-foreground italic">Hardware-verified telemetry for every asset.</p>
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 text-status-cyan font-mono text-xs tracking-wider">
                            <Globe2 size={14} /> GLOBAL SCALE
                        </div>
                        <p className="text-sm text-muted-foreground italic">Over 450MW of solar capacity already registered.</p>
                    </div>
                </div>

                {/* Subtle Grid Pattern Overlay */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                    style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
            </div>

            {/* Login Right Side */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 relative">
                {/* Mobile Background Blobs */}
                <div className="lg:hidden absolute top-[10%] left-[10%] w-[60%] h-[60%] rounded-full bg-primary/5 blur-[100px]" />

                <div className="w-full max-w-sm space-y-8 relative z-10">
                    <div className="lg:hidden flex justify-center mb-8">
                        <img src="/delen-logo.webp" alt="DeLEN Logo" className="h-10 w-auto" />
                    </div>

                    <div className="space-y-2 text-center lg:text-left">
                        <h2 className="text-3xl font-display font-bold">Access Portal</h2>
                        <p className="text-sm text-muted-foreground">Select your destination and authenticate to continue.</p>
                    </div>

                    <div className="grid gap-4">
                        <button
                            className="w-full group relative overflow-hidden rounded-xl border border-border/50 bg-surface p-4 transition-all hover:border-primary/50 hover:bg-surface-2 hover:shadow-glow-accent text-left active:scale-[0.98]"
                            onClick={() => navigate('/onboarding/infra-partner/welcome')}
                        >
                            <div className="relative z-10 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                        <Rocket size={20} />
                                    </div>
                                    <div>
                                        <div className="text-sm font-bold">INFRASTRUCTURE PARTNER</div>
                                        <div className="text-[11px] text-muted-foreground">Join the protocol onboarding flow</div>
                                    </div>
                                </div>
                                <ArrowRight size={16} className="text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                            </div>
                        </button>

                        <button
                            className="w-full group relative overflow-hidden rounded-xl border border-border/50 bg-surface p-4 transition-all hover:border-accent-color/50 hover:bg-surface-2 hover:shadow-glow-accent text-left active:scale-[0.98]"
                            onClick={() => navigate('/partner/dashboard')}
                        >
                            <div className="relative z-10 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-glow/20 text-accent-color">
                                        <LayoutDashboard size={20} />
                                    </div>
                                    <div>
                                        <div className="text-sm font-bold">MANAGEMENT PORTAL</div>
                                        <div className="text-[11px] text-muted-foreground">Access your active dashboard</div>
                                    </div>
                                </div>
                                <ArrowRight size={16} className="text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-accent-color" />
                            </div>
                        </button>
                    </div>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-border/50" />
                        </div>
                        <div className="relative flex justify-center text-[10px] uppercase tracking-widest">
                            <span className="bg-background px-4 text-muted-foreground font-mono">Secure Authentication</span>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-1.5">
                            <Label htmlFor="email" className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground ml-1">Partner ID</Label>
                            <Input id="email" placeholder="DLN-2026-XXXX" className="h-11 bg-surface-2/50 border-border/50 focus:border-primary/50 transition-colors" />
                        </div>
                        <div className="space-y-1.5">
                            <div className="flex justify-between items-center px-1">
                                <Label htmlFor="key" className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground">Access Key</Label>
                                <button className="text-[10px] text-primary hover:underline transition-all">Forgot Key?</button>
                            </div>
                            <Input id="key" type="password" placeholder="••••••••••••••••" className="h-11 bg-surface-2/50 border-border/50 focus:border-primary/50 transition-colors" />
                        </div>
                        <Button className="w-full h-11 gradient-accent font-bold mt-2 shadow-lg shadow-primary/10">
                            Sign In to Protocol
                        </Button>
                    </div>

                    <footer className="pt-6 border-t border-border/30">
                        <div className="flex flex-col items-center gap-2 text-center">
                            <p className="text-[10px] text-muted-foreground font-mono uppercase tracking-widest">
                                Protected by DeLEN Protocol Guard v2.0
                            </p>
                            <div className="flex gap-4 text-[10px] text-muted-foreground/60">
                                <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
                                <a href="#" className="hover:text-foreground transition-colors">Partner Terms</a>
                            </div>
                        </div>
                    </footer>
                </div>
            </div>
        </div>
    );
}
