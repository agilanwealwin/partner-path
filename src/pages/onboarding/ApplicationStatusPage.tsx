import React from 'react';
import {
  CheckCircle2, Clock, AlertTriangle, RefreshCw, Upload, Zap, Award,
  DollarSign, Wallet, Globe2, LifeBuoy, MessageSquare, Mail, Phone,
  ArrowRight, MapPinned, ShieldCheck, Activity
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useOnboarding } from '@/hooks/use-onboarding';
import { Link, useNavigate } from 'react-router-dom';

export default function ApplicationStatusPage() {
  const { onboardingData } = useOnboarding();
  const navigate = useNavigate();
  const selectedTier = onboardingData.tier || 'Pulse Partner';
  const isSubmitted = onboardingData.isSubmitted;
  const isTerritoryRequested = onboardingData.isTerritoryRequested;

  const steps = [
    {
      id: 'pre-qual',
      icon: CheckCircle2,
      status: isSubmitted ? 'done' : 'pending',
      title: 'Pre-Qualification Submitted',
      date: isSubmitted ? 'Today' : 'Step 1',
      desc: isSubmitted ? 'ID IFP-2026-0087 generated and assigned' : 'Initial assessment of technical & financial standing'
    },
    {
      id: 'territory',
      icon: Globe2,
      status: isTerritoryRequested ? 'done' : (isSubmitted ? 'action' : 'pending'),
      title: 'Territory Request',
      date: isTerritoryRequested ? 'Today' : (isSubmitted ? 'ACTION REQUIRED' : 'Step 2'),
      desc: isTerritoryRequested ? 'Request for state/cluster assets submitted' : 'Select and request territories for infrastructure deployment',
      action: !isTerritoryRequested && isSubmitted ? 'Request Now' : null,
      actionPath: '/onboarding/infra-partner/territories'
    },
    {
      icon: ShieldCheck,
      status: 'pending',
      title: 'Compliance & Verification',
      date: 'Est: 3-5 Days',
      desc: 'Admin review of project portfolio and licenses'
    },
    {
      icon: DollarSign,
      status: 'pending',
      title: 'Partnership Fee & Activation',
      date: 'Step 4',
      desc: 'DLN token allocation and full portal access'
    },
  ];

  return (
    <div className="p-8 max-w-[1000px] mx-auto space-y-8 pb-24">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-display font-black text-3xl text-foreground tracking-tighter uppercase">Application <span className="text-primary">Status</span></h1>
          <p className="text-[11px] text-muted-foreground mt-1 font-mono uppercase tracking-widest opacity-60">Partner Lifecycle Tracking · VERSION 2.0</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm" className="rounded-xl" onClick={() => navigate('/onboarding/infra-partner/territory-map')}>
            <Globe2 size={14} className="mr-2" /> Global Map
          </Button>
          <Button variant="outline" size="sm" className="rounded-xl border-primary/20 text-primary hover:bg-primary/5">
            Support Hub
          </Button>
        </div>
      </div>

      {/* Optimistic Simple Banner */}
      <div className="relative rounded-[2.5rem] bg-gradient-to-br from-primary/5 via-primary/[0.02] to-transparent p-10 border border-primary/10 overflow-hidden shadow-sm">
        {/* Subtle Soft Background Glows */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 blur-[100px] rounded-full" />
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-status-orange/5 blur-[100px] rounded-full" />

        <div className="relative z-10 grid grid-cols-12 gap-10 items-center">

          {/* Left: Friendly Status Info */}
          <div className="col-span-12 md:col-span-7 space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 mb-1">
                <span className="flex items-baseline gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest border border-primary/20">
                  Current Application
                </span>
                <span className="text-[10px] font-bold text-muted-foreground uppercase opacity-60">
                  {isTerritoryRequested ? 'Evaluation Ongoing' : 'Onboarding Pipeline'}
                </span>
              </div>
              <h2 className="text-4xl font-display font-black text-foreground tracking-tight leading-tight">
                Your application is <span className="text-primary italic">under review.</span>
              </h2>
              <p className="text-sm text-muted-foreground font-medium max-w-md">Our team is reviewing your project portfolio and technical capacity. This stage usually takes 3 to 5 business days.</p>
            </div>

            {/* Simple, Clean Progress Bar */}
            <div className="space-y-2 max-w-sm">
              <div className="flex justify-between items-end mb-1">
                <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">Onboarding Progress</span>
                <span className="text-sm font-black text-primary">{isTerritoryRequested ? '65%' : '35%'}</span>
              </div>
              <div className="h-2 w-full bg-muted/20 rounded-full overflow-hidden border border-border/10">
                <div
                  className="h-full bg-primary transition-all duration-[2000ms] shadow-[0_0_15px_rgba(124,92,252,0.3)]"
                  style={{ width: isTerritoryRequested ? '65%' : '35%' }}
                />
              </div>
            </div>
          </div>

          {/* Right: Key Credentials (Structured and Clean) */}
          <div className="col-span-12 md:col-span-5 grid grid-cols-2 gap-4 h-full items-center">
            <div className="p-5 rounded-3xl bg-surface border border-border/60 space-y-3 shadow-inner group hover:border-primary/30 transition-all duration-500 hover:shadow-xl hover:shadow-primary/5">
              <p className="text-[10px] font-black tracking-widest text-muted-foreground uppercase">Assigned Tier</p>
              <p className="text-lg font-display font-black text-foreground truncate">{selectedTier}</p>
            </div>

            <div className="p-5 rounded-3xl bg-surface border border-border/60 space-y-3 shadow-inner group hover:border-primary/30 transition-all duration-500 hover:shadow-xl hover:shadow-primary/5">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-surface-3 flex items-center justify-center">
                  <ShieldCheck size={14} className="text-muted-foreground opacity-60" />
                </div>
                <p className="text-[10px] font-black tracking-widest text-muted-foreground uppercase">Reference ID</p>
              </div>
              <p className="text-lg font-mono font-black text-foreground truncate tracking-tighter">IFP-26-0087</p>
            </div>
          </div>

        </div>
      </div>

      {/* New Professional Timeline */}
      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-8 space-y-4">
          <div className="rounded-[2rem] bg-surface p-8 shadow-sm border border-border">
            <h3 className="section-label mb-8">Onboarding Milestones</h3>
            <div className="space-y-0 relative ml-4">
              <div className="absolute left-0 top-0 bottom-0 w-px bg-border/60 ml-[15px]" />

              {steps.map((step, i) => {
                const isDone = step.status === 'done';
                const isAction = step.status === 'action';
                const isLast = i === steps.length - 1;

                return (
                  <div key={i} className="flex gap-8 group/item relative pb-10 last:pb-0">
                    <div className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10 transition-all duration-500",
                      isDone ? "bg-status-green shadow-[0_0_15px_rgba(34,197,94,0.3)]" : (isAction ? "bg-status-orange shadow-[0_0_15px_rgba(249,115,22,0.3)]" : "bg-surface-3 border border-border")
                    )}>
                      <step.icon size={14} className={cn(
                        isDone || isAction ? "text-white" : "text-muted-foreground"
                      )} />
                    </div>

                    <div className="flex-1 space-y-1 pt-1">
                      <div className="flex items-center justify-between">
                        <h4 className={cn("text-base font-bold transition-colors", isDone ? "text-foreground" : "text-muted-foreground")}>{step.title}</h4>
                        <span className={cn("text-[9px] font-black font-mono tracking-widest uppercase", isAction ? "text-status-orange" : "text-muted-foreground/40")}>{step.date}</span>
                      </div>
                      <p className="text-[12px] text-muted-foreground font-medium leading-relaxed max-w-md">{step.desc}</p>

                      {step.action && (
                        <div className="pt-3">
                          <Button
                            onClick={() => navigate(step.actionPath || '')}
                            className="h-9 px-5 rounded-xl bg-status-orange hover:bg-status-orange/90 text-white font-bold text-[11px] uppercase tracking-widest group/btn"
                          >
                            {step.action}
                            <ArrowRight size={14} className="ml-2 group-hover/btn:translate-x-1 transition-transform" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="col-span-4 space-y-4">
          {/* Quick Actions / Info */}
          <div className="rounded-[2rem] bg-surface p-6 shadow-sm border border-border space-y-6">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Guidelines</h3>

            <div className="space-y-5">
              {[
                { icon: Wallet, title: 'Fee Structure', desc: 'Secure the allocated DLN tokens by completing the payment.' },
                { icon: MapPinned, title: 'Infrastructure Info', desc: 'Verify project readiness for the selected territories.' },
              ].map(item => (
                <div key={item.title} className="flex gap-4 group cursor-pointer">
                  <div className="w-10 h-10 rounded-xl bg-surface-2 flex items-center justify-center border border-border group-hover:border-primary/30 transition-all">
                    <item.icon size={18} className="text-primary opacity-60 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-xs font-bold text-foreground">{item.title}</p>
                    <p className="text-[10px] text-muted-foreground leading-tight">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-border/50">
              <div className="p-4 rounded-2xl bg-surface-2 border border-border space-y-3">
                <div className="flex items-center gap-2">
                  <MessageSquare size={14} className="text-primary" />
                  <span className="text-[11px] font-bold text-foreground">Need Support?</span>
                </div>
                <p className="text-[10px] text-muted-foreground leading-relaxed">Our infrastructure team is available for technical queries 9AM - 6PM IST.</p>
                <Button variant="outline" size="xs" className="w-full text-[10px] font-black uppercase tracking-widest">Open Session</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
